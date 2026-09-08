import { AIConfigInfo, DetectedDependency, FileSystemAdapter, MCPServerConfig } from './types';
import { resolveDependency } from './taxonomy';

export interface RawScanData {
  projectName: string;
  manifestsFound: string[];
  dependencies: DetectedDependency[];
  aiConfig: AIConfigInfo;
  allFilePaths: string[];
  rawConfigFiles: Record<string, string>;
}

/**
 * Memory Adapter for in-memory virtual file systems or sample presets
 */
export class MemoryFileSystemAdapter implements FileSystemAdapter {
  constructor(private files: Record<string, string>) {}

  async listFiles(): Promise<string[]> {
    return Object.keys(this.files);
  }

  async readFile(path: string): Promise<string | null> {
    const normalized = path.replace(/^\.?\/+/, '');
    for (const [key, val] of Object.entries(this.files)) {
      const keyNorm = key.replace(/^\.?\/+/, '');
      if (keyNorm === normalized) return val;
    }
    return null;
  }
}

/**
 * Browser HTML5 DirectoryPicker Adapter (for live user folder inspection)
 */
export class BrowserDirectoryAdapter implements FileSystemAdapter {
  private fileMap: Map<string, File> = new Map();

  constructor(private rootHandle?: any) {}

  getRootHandle(): any {
    return this.rootHandle;
  }

  static async fromPicker(): Promise<BrowserDirectoryAdapter> {
    if (typeof window === 'undefined' || !(window as any).showDirectoryPicker) {
      throw new Error('Directory Picker API is not supported in this environment');
    }
    const dirHandle = await (window as any).showDirectoryPicker();
    const adapter = new BrowserDirectoryAdapter(dirHandle);
    await adapter.indexDirectory(dirHandle, '');
    return adapter;
  }

  private async indexDirectory(dirHandle: any, prefix: string) {
    for await (const [name, handle] of dirHandle.entries()) {
      if (name === 'node_modules' || name === '.git' || name === 'dist' || name === 'build') {
        continue;
      }
      const fullPath = prefix ? `${prefix}/${name}` : name;
      if (handle.kind === 'file') {
        const file = await handle.getFile();
        this.fileMap.set(fullPath, file);
      } else if (handle.kind === 'directory') {
        await this.indexDirectory(handle, fullPath);
      }
    }
  }

  async listFiles(): Promise<string[]> {
    return Array.from(this.fileMap.keys());
  }

  async readFile(path: string): Promise<string | null> {
    const clean = path.replace(/^\.?\/+/, '');
    const file = this.fileMap.get(clean);
    if (!file) return null;
    return file.text();
  }
}

/**
 * Core Scanner & Manifest Parser
 */
export class WorkspaceScanner {
  constructor(private fs: FileSystemAdapter) {}

  async scan(): Promise<RawScanData> {
    const allFiles = await this.fs.listFiles();
    const manifestsFound: string[] = [];
    const dependencies: DetectedDependency[] = [];
    const rawConfigFiles: Record<string, string> = {};
    let projectName = 'Unnamed Project';

    // 1. Scan package.json
    const packageJsonContent = await this.fs.readFile('package.json');
    if (packageJsonContent) {
      manifestsFound.push('package.json');
      rawConfigFiles['package.json'] = packageJsonContent;
      try {
        const pkg = JSON.parse(packageJsonContent);
        if (pkg.name) projectName = pkg.name;

        if (pkg.dependencies && typeof pkg.dependencies === 'object') {
          for (const [dep, version] of Object.entries(pkg.dependencies)) {
            dependencies.push(resolveDependency(dep, String(version), false));
          }
        }

        if (pkg.devDependencies && typeof pkg.devDependencies === 'object') {
          for (const [dep, version] of Object.entries(pkg.devDependencies)) {
            dependencies.push(resolveDependency(dep, String(version), true));
          }
        }
      } catch (err) {
        console.warn('Failed to parse package.json:', err);
      }
    }

    // 2. Scan Python manifests (pyproject.toml / requirements.txt)
    const pyprojectContent = await this.fs.readFile('pyproject.toml');
    if (pyprojectContent) {
      manifestsFound.push('pyproject.toml');
      rawConfigFiles['pyproject.toml'] = pyprojectContent;
      this.parsePyproject(pyprojectContent, dependencies);
    }

    const reqsContent = await this.fs.readFile('requirements.txt');
    if (reqsContent) {
      manifestsFound.push('requirements.txt');
      rawConfigFiles['requirements.txt'] = reqsContent;
      this.parseRequirements(reqsContent, dependencies);
    }

    // 3. Scan Rust Cargo.toml
    const cargoContent = await this.fs.readFile('Cargo.toml');
    if (cargoContent) {
      manifestsFound.push('Cargo.toml');
      rawConfigFiles['Cargo.toml'] = cargoContent;
      this.parseCargo(cargoContent, dependencies);
    }

    // 4. Scan Go go.mod
    const goModContent = await this.fs.readFile('go.mod');
    if (goModContent) {
      manifestsFound.push('go.mod');
      rawConfigFiles['go.mod'] = goModContent;
      this.parseGoMod(goModContent, dependencies);
    }

    // 5. Check other structural configs
    const additionalConfigs = [
      'tsconfig.json',
      'vite.config.ts',
      'vite.config.js',
      'next.config.js',
      'next.config.mjs',
      'docker-compose.yml',
      'docker-compose.yaml',
      'Dockerfile',
      'tailwind.config.js',
      'tailwind.config.ts'
    ];

    for (const cfg of additionalConfigs) {
      const content = await this.fs.readFile(cfg);
      if (content) {
        manifestsFound.push(cfg);
        rawConfigFiles[cfg] = content;
      }
    }

    // 6. Scan AI and Workspace Configurations
    const aiConfig = await this.scanAIConfigs(allFiles, rawConfigFiles);

    return {
      projectName,
      manifestsFound,
      dependencies,
      aiConfig,
      allFilePaths: allFiles,
      rawConfigFiles
    };
  }

  private parsePyproject(content: string, dependencies: DetectedDependency[]) {
    const lines = content.split('\n');
    let inDepsSection = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('[project.dependencies]') || trimmed.startsWith('[tool.poetry.dependencies]')) {
        inDepsSection = true;
        continue;
      }
      if (trimmed.startsWith('[') && inDepsSection) {
        inDepsSection = false;
      }
      if (inDepsSection && trimmed && !trimmed.startsWith('#')) {
        const match = trimmed.match(/^["']?([a-zA-Z0-9_\-]+)["']?\s*[=<>~!]*\s*["']?([^"']*)?["']?/);
        if (match && match[1]) {
          dependencies.push(resolveDependency(match[1], match[2] || 'latest', false));
        }
      }
    }
  }

  private parseRequirements(content: string, dependencies: DetectedDependency[]) {
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const match = trimmed.match(/^([a-zA-Z0-9_\-]+)(?:[=<>~]+(.*))?$/);
      if (match && match[1]) {
        dependencies.push(resolveDependency(match[1], match[2] || 'latest', false));
      }
    }
  }

  private parseCargo(content: string, dependencies: DetectedDependency[]) {
    const lines = content.split('\n');
    let inDeps = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === '[dependencies]') {
        inDeps = true;
        continue;
      }
      if (trimmed.startsWith('[') && inDeps) {
        inDeps = false;
      }
      if (inDeps && trimmed && !trimmed.startsWith('#')) {
        const match = trimmed.match(/^([a-zA-Z0-9_\-]+)\s*=\s*(.*)$/);
        if (match && match[1]) {
          dependencies.push(resolveDependency(match[1], match[2] || '*', false));
        }
      }
    }
  }

  private parseGoMod(content: string, dependencies: DetectedDependency[]) {
    const lines = content.split('\n');
    let inRequire = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('require (')) {
        inRequire = true;
        continue;
      }
      if (inRequire && trimmed === ')') {
        inRequire = false;
        continue;
      }
      if (inRequire || trimmed.startsWith('require ')) {
        const parts = trimmed.replace('require ', '').split(/\s+/);
        if (parts[0]) {
          const name = parts[0].split('/').pop() || parts[0];
          dependencies.push(resolveDependency(name, parts[1] || 'latest', false));
        }
      }
    }
  }

  private async scanAIConfigs(allFiles: string[], _rawConfigFiles: Record<string, string>): Promise<AIConfigInfo> {
    let hasCursorRules = false;
    let cursorRulesContent: string | undefined;
    let hasClaudeInstructions = false;
    let claudeInstructionsContent: string | undefined;
    let hasAntigravityConfig = false;
    let antigravityConfigContent: string | undefined;
    const mcpServers: MCPServerConfig[] = [];
    const environmentKeys: string[] = [];
    const activeGuidelines: string[] = [];
    const recommendations: string[] = [];

    // Cursor rules
    const cursorFile = allFiles.find(f => f === '.cursorrules' || f.endsWith('/.cursorrules'));
    if (cursorFile) {
      hasCursorRules = true;
      cursorRulesContent = (await this.fs.readFile(cursorFile)) || undefined;
      if (cursorRulesContent) {
        activeGuidelines.push('Active .cursorrules configuration');
      }
    }

    // Also check .cursor/rules directory
    const cursorRuleDirFiles = allFiles.filter(f => f.startsWith('.cursor/rules/') || f.includes('/.cursor/rules/'));
    if (cursorRuleDirFiles.length > 0) {
      hasCursorRules = true;
      activeGuidelines.push(`Found ${cursorRuleDirFiles.length} modular Cursor rule files in .cursor/rules/`);
    }

    // Claude instructions
    const claudeFile = allFiles.find(f => f.toLowerCase() === 'claude.md' || f === '.claude/instructions.md');
    if (claudeFile) {
      hasClaudeInstructions = true;
      claudeInstructionsContent = (await this.fs.readFile(claudeFile)) || undefined;
      activeGuidelines.push('Active CLAUDE.md / instructions');
    }

    // Antigravity & Agent instructions
    const agyFile = allFiles.find(f => f === 'antigravity.json' || f === '.antigravity/config.json' || f === 'AGENT.md');
    if (agyFile) {
      hasAntigravityConfig = true;
      antigravityConfigContent = (await this.fs.readFile(agyFile)) || undefined;
      activeGuidelines.push('Active Antigravity workspace integration');
    }

    // MCP configs
    const mcpCandidates = ['mcp.json', '.mcp.json', 'claude_desktop_config.json', '.cursor/mcp.json'];
    for (const mcpPath of mcpCandidates) {
      const content = await this.fs.readFile(mcpPath);
      if (content) {
        try {
          const parsed = JSON.parse(content);
          const servers = parsed.mcpServers || parsed.servers || {};
          for (const [name, val] of Object.entries(servers)) {
            const server = val as any;
            mcpServers.push({
              name,
              command: server.command || server.url,
              args: server.args,
              type: server.type || 'stdio',
              description: server.description || `Configured in ${mcpPath}`,
              tools: server.tools || []
            });
          }
          activeGuidelines.push(`Loaded ${Object.keys(servers).length} MCP server definitions from ${mcpPath}`);
        } catch (e) {
          console.warn('Failed parsing MCP config:', e);
        }
      }
    }

    // Environment keys (.env.example or .env.template)
    const envExample = await this.fs.readFile('.env.example') || await this.fs.readFile('.env.template');
    if (envExample) {
      const lines = envExample.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const key = trimmed.split('=')[0]?.trim();
          if (key) environmentKeys.push(key);
        }
      }
    }

    // Compute Readiness Score & Recommendations
    let readinessScore = 40; // baseline
    if (hasCursorRules || cursorRuleDirFiles.length > 0) {
      readinessScore += 25;
    } else {
      recommendations.push('Add a `.cursorrules` or `.cursor/rules/` directory to guide AI code generation with codebase conventions.');
    }

    if (hasClaudeInstructions || hasAntigravityConfig) {
      readinessScore += 20;
    } else {
      recommendations.push('Create a `CLAUDE.md` or `AGENT.md` defining project architecture, testing commands, and style constraints.');
    }

    if (mcpServers.length > 0) {
      readinessScore += 15;
    } else {
      recommendations.push('Configure MCP (Model Context Protocol) servers in `mcp.json` to empower AI agents with live tool integrations.');
    }

    if (environmentKeys.length > 0) {
      readinessScore = Math.min(100, readinessScore + 10);
    } else {
      recommendations.push('Provide a `.env.example` file so AI assistants know which API keys and backend endpoints are required.');
    }

    readinessScore = Math.min(100, Math.max(20, readinessScore));

    return {
      hasCursorRules,
      cursorRulesContent,
      hasClaudeInstructions,
      claudeInstructionsContent,
      hasAntigravityConfig,
      antigravityConfigContent,
      mcpServers,
      environmentKeys,
      activeGuidelines,
      readinessScore,
      recommendations
    };
  }
}

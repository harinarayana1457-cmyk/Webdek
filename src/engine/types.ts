export type TechCategory =
  | 'ui'
  | 'state'
  | 'api'
  | 'ai'
  | 'tooling'
  | 'database'
  | 'runtime'
  | 'styling'
  | 'testing'
  | 'build';

export type TechSignificance = 'critical' | 'high' | 'medium' | 'utility';

export interface CatalogItem {
  name: string;
  category: TechCategory;
  purpose: string;
  significance: string;
  level: TechSignificance;
  docsUrl?: string;
  tags?: string[];
}

export interface DetectedDependency extends CatalogItem {
  version: string;
  isDev: boolean;
  isHeuristic: boolean;
  source: string;
}

export interface MCPServerConfig {
  name: string;
  command?: string;
  args?: string[];
  type?: string;
  description?: string;
  tools?: string[];
}

export interface AIConfigInfo {
  hasCursorRules: boolean;
  cursorRulesContent?: string;
  hasClaudeInstructions: boolean;
  claudeInstructionsContent?: string;
  hasAntigravityConfig: boolean;
  antigravityConfigContent?: string;
  mcpServers: MCPServerConfig[];
  environmentKeys: string[];
  activeGuidelines: string[];
  readinessScore: number; // 0 to 100
  recommendations: string[];
}

export type ArchitecturePattern =
  | 'Next.js App Router Monolith'
  | 'Client-Heavy SPA'
  | 'Clean / Hexagonal Architecture'
  | 'Layered MVC'
  | 'Micro-frontend / Monorepo'
  | 'Serverless / API-First'
  | 'Rust / Systems Agent'
  | 'Standard Fullstack';

export interface ArchitectureLayer {
  name: string;
  role: string;
  description: string;
  filePaths: string[];
}

export interface ArchitectureReport {
  pattern: ArchitecturePattern;
  confidence: number; // 0 - 100
  summary: string;
  entryPoints: string[];
  lifecycleSequence: string[];
  dataFlowSummary: string;
  layers: ArchitectureLayer[];
}

export type GraphNodeType =
  | 'entry'
  | 'route'
  | 'ui'
  | 'state'
  | 'service'
  | 'data'
  | 'ai'
  | 'external';

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  layer: string;
  filesCount: number;
  tech: string[];
  description: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  label: string;
  animated?: boolean;
}

export interface ArchitectureGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface FileTreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  children?: FileTreeNode[];
  role?: string;
}

export interface WorkspaceFile {
  path: string;
  content: string;
  size?: number;
}

export interface FileSystemAdapter {
  listFiles(): Promise<string[]>;
  readFile(path: string): Promise<string | null>;
  getFileTree?(): Promise<FileTreeNode>;
}

export interface ProjectAnalysisResult {
  projectName: string;
  rootPath: string;
  primaryFramework: string;
  primaryRuntime: string;
  stylingEngine: string;
  stateLayer: string;
  aiLayer: string;
  dependencies: DetectedDependency[];
  aiConfig: AIConfigInfo;
  architecture: ArchitectureReport;
  graph: ArchitectureGraph;
  manifestsFound: string[];
  totalFiles: number;
  timestamp: string;
}

# ProjectLens 🔍
**Embedded Workspace Inspector & Architecture Visualizer for Antigravity & VS Code**

ProjectLens is a zero-runtime-overhead workspace inspector designed to run directly inside Antigravity as an interactive web panel and exportable as a VS Code/Cursor webview extension.

---

## 🌟 Key Capabilities

### 1. AST & Manifest Parser (`src/engine/scanner.ts`)
- Scans root configuration files across ecosystems:
  - **JavaScript / TypeScript:** `package.json`, `tsconfig.json`, `vite.config.ts`, `next.config.js`
  - **Python:** `pyproject.toml`, `requirements.txt`
  - **Rust:** `Cargo.toml`
  - **Go:** `go.mod`
  - **DevOps / Containers:** `docker-compose.yml`, `Dockerfile`
- Extracts runtime dependencies, dev tooling (bundlers, linters, test runners), styling engines, and state layers.
- Inspects AI agent configurations:
  - `.cursorrules` and `.cursor/rules/`
  - `CLAUDE.md` / `.claude/` instructions
  - `mcp.json` / Claude Desktop / Cursor Model Context Protocol servers
  - Environment variable constraints (`.env.example`)

### 2. Deterministic Taxonomy & Decision Engine (`src/engine/taxonomy.ts`)
- Deterministic catalog mapping **100+ modern tools and libraries** with:
  - **Plain English purpose:** Clear explanation of what each package does.
  - **Architectural significance:** Why the team chose this package over alternatives and its exact role in the project.
  - **Impact levels:** `critical`, `high`, `medium`, `utility`.
- **Heuristic Fallback Engine:** Automatically infers the category and role of uncataloged packages based on package prefixes, scopes (`@tanstack/*`, `@types/*`), and naming patterns.

### 3. Architecture Heuristic Classifier (`src/engine/architecture.ts`)
- Evaluates directory hierarchies and dependency patterns to classify the application pattern:
  - **Next.js App Router Monolith** (RSC, Server Actions, Nested Routes)
  - **Client-Heavy SPA** (Vite + React/Vue + Zustand/Redux + Query)
  - **Clean / Hexagonal Architecture** (Controllers -> Services -> Domain -> Repositories)
  - **Layered MVC** (Models -> Views -> Controllers)
  - **Rust / Systems Agent** (Tokio Async Runtime)
  - **Serverless / Edge**
- Generates execution lifecycles and interactive directed module relationship graphs.

### 4. Interactive Antigravity Web Panel (`src/ui/`)
- **Overview Bar:** High-density badges displaying Framework, Runtime, Styling, State, and AI stack.
- **Architecture Flow Graph:** Layered visual node map showing component connectivity, directed flow lines, and interactive node inspector.
- **Why This Stack? Drawer:** Categorized, searchable, and sortable decision drawer explaining every library's architectural significance.
- **AI Context Inspector:** Visualizes prompt rules, MCP servers, expected environment variables, and calculates an **AI Alignment & Readiness Score** (0-100).
- **Directory Explorer:** Groups files by their architectural layer.
- **Report Exporter:** Generates full GitHub Flavored Markdown and JSON architecture reports for easy sharing in PRs and documentation.
- **Sample Presets & Live Workspace Picker:** Seamlessly switch between rich built-in presets (Next.js 14 AI E-Commerce, Vite SPA, Fastify Clean Architecture) or open any local directory via the HTML5 File System Access API.

---

## 🚀 Quickstart

### Development Server
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```
The production bundle is built into `dist/` and is ready to be embedded into Antigravity or bundled as a VS Code Webview extension.

---

## 🔌 VS Code / Antigravity Webview Bridge
ProjectLens provides a decoupled communication bridge (`src/vscode-webview.ts`). When mounted inside a VS Code webview panel:
```typescript
import { postToHost, subscribeToHost } from './vscode-webview';

// Notify host that the webview is ready
postToHost({ type: 'READY' });

// Listen for workspace file payloads from the extension host
subscribeToHost((event) => {
  if (event.data.type === 'WORKSPACE_FILES') {
    // Process files...
  }
});
```

import {
  ArchitectureGraph,
  ArchitectureLayer,
  ArchitecturePattern,
  ArchitectureReport,
  DetectedDependency,
  GraphEdge,
  GraphNode,
  ProjectAnalysisResult
} from './types';
import { RawScanData } from './scanner';

export class ArchitectureClassifier {
  constructor(private scanData: RawScanData) {}

  classify(): ProjectAnalysisResult {
    const { allFilePaths, dependencies, manifestsFound, projectName, aiConfig } = this.scanData;

    // Detect primary stacks
    const primaryFramework = this.detectPrimaryFramework(dependencies, allFilePaths);
    const primaryRuntime = this.detectPrimaryRuntime(dependencies, manifestsFound);
    const stylingEngine = this.detectStyling(dependencies);
    const stateLayer = this.detectState(dependencies);
    const aiLayer = this.detectAILayer(dependencies);

    // Architectural pattern classification
    const report = this.classifyPattern(dependencies, allFilePaths, primaryFramework);

    // Build interactive node & edge graph
    const graph = this.buildArchitectureGraph(report, dependencies, allFilePaths);

    return {
      projectName,
      rootPath: '/',
      primaryFramework,
      primaryRuntime,
      stylingEngine,
      stateLayer,
      aiLayer,
      dependencies,
      aiConfig,
      architecture: report,
      graph,
      manifestsFound,
      totalFiles: allFilePaths.length,
      timestamp: new Date().toISOString()
    };
  }

  private detectPrimaryFramework(deps: DetectedDependency[], files: string[]): string {
    const depNames = deps.map(d => d.name.toLowerCase());
    if (depNames.includes('next')) return 'Next.js';
    if (depNames.includes('nuxt')) return 'Nuxt.js';
    if (depNames.includes('@sveltejs/kit') || depNames.includes('svelte')) return 'Svelte';
    if (depNames.includes('astro')) return 'Astro';
    if (depNames.includes('@angular/core')) return 'Angular';
    if (depNames.includes('vue')) return 'Vue.js';
    if (depNames.includes('react')) return 'React';
    if (depNames.includes('hono')) return 'Hono (Edge)';
    if (depNames.includes('fastify')) return 'Fastify';
    if (depNames.includes('@nestjs/core')) return 'NestJS';
    if (depNames.includes('express')) return 'Express';
    if (files.some(f => f.endsWith('.rs') || f === 'Cargo.toml')) return 'Rust Native';
    if (files.some(f => f.endsWith('.go') || f === 'go.mod')) return 'Go Native';
    if (files.some(f => f.endsWith('.py') || f === 'pyproject.toml')) return 'Python';
    return 'Vanilla Web';
  }

  private detectPrimaryRuntime(deps: DetectedDependency[], manifests: string[]): string {
    const depNames = deps.map(d => d.name.toLowerCase());
    if (manifests.includes('Cargo.toml')) return 'Rust Cargo';
    if (manifests.includes('go.mod')) return 'Go Runtime';
    if (manifests.includes('pyproject.toml') || manifests.includes('requirements.txt')) return 'Python 3.x';
    if (depNames.includes('elysia')) return 'Bun';
    if (manifests.includes('deno.json')) return 'Deno';
    return 'Node.js (V8)';
  }

  private detectStyling(deps: DetectedDependency[]): string {
    const depNames = deps.map(d => d.name.toLowerCase());
    if (depNames.includes('tailwindcss')) return 'Tailwind CSS';
    if (depNames.includes('styled-components')) return 'Styled Components';
    if (depNames.includes('@emotion/react')) return 'Emotion CSS-in-JS';
    if (depNames.includes('@vanilla-extract/css')) return 'Vanilla Extract';
    if (depNames.includes('sass')) return 'Sass / SCSS';
    return 'Standard CSS';
  }

  private detectState(deps: DetectedDependency[]): string {
    const depNames = deps.map(d => d.name.toLowerCase());
    if (depNames.includes('zustand')) return 'Zustand';
    if (depNames.includes('@reduxjs/toolkit') || depNames.includes('redux')) return 'Redux Toolkit';
    if (depNames.includes('jotai')) return 'Jotai';
    if (depNames.includes('recoil')) return 'Recoil';
    if (depNames.includes('pinia')) return 'Pinia';
    if (depNames.includes('mobx')) return 'MobX';
    if (depNames.includes('xstate')) return 'XState';
    if (depNames.includes('@tanstack/react-query')) return 'TanStack Query (Server State)';
    return 'Component Local State';
  }

  private detectAILayer(deps: DetectedDependency[]): string {
    const depNames = deps.map(d => d.name.toLowerCase());
    const aiTools: string[] = [];
    if (depNames.includes('ai')) aiTools.push('Vercel AI SDK');
    if (depNames.includes('openai')) aiTools.push('OpenAI');
    if (depNames.includes('@anthropic-ai/sdk')) aiTools.push('Claude');
    if (depNames.includes('langchain') || depNames.includes('@langchain/core')) aiTools.push('LangChain');
    if (depNames.includes('@modelcontextprotocol/sdk')) aiTools.push('MCP');
    if (depNames.includes('chromadb') || depNames.includes('@pinecone-database/pinecone')) aiTools.push('Vector DB');

    return aiTools.length > 0 ? aiTools.join(', ') : 'None Configured';
  }

  private classifyPattern(deps: DetectedDependency[], files: string[], _framework: string): ArchitectureReport {
    const depNames = deps.map(d => d.name.toLowerCase());
    const hasAppDir = files.some(f => f.startsWith('app/') || f.startsWith('src/app/'));
    const hasPagesDir = files.some(f => f.startsWith('pages/') || f.startsWith('src/pages/'));
    const hasComponents = files.some(f => f.includes('components/'));
    const hasStore = files.some(f => f.includes('store/') || f.includes('stores/'));
    const hasControllers = files.some(f => f.includes('controllers/') || f.includes('controller/'));
    const hasServices = files.some(f => f.includes('services/') || f.includes('service/'));
    const hasRepositories = files.some(f => f.includes('repositories/') || f.includes('domain/'));
    const hasCargo = files.includes('Cargo.toml');

    let pattern: ArchitecturePattern = 'Standard Fullstack';
    let confidence = 85;
    let summary = '';
    let entryPoints: string[] = [];
    let lifecycleSequence: string[] = [];
    let dataFlowSummary = '';
    const layers: ArchitectureLayer[] = [];

    if (depNames.includes('next') && (hasAppDir || hasPagesDir)) {
      pattern = 'Next.js App Router Monolith';
      confidence = 95;
      summary = 'Modern fullstack React Server Components (RSC) architecture. Combines server streaming, nested filesystem layouts, and zero-bundle Server Actions.';
      entryPoints = ['app/layout.tsx', 'app/page.tsx'];
      lifecycleSequence = [
        '1. Edge / Node Server parses incoming HTTP request',
        '2. Root layout loads server environment and fonts',
        '3. Server Component renders async data tree into RSC payload',
        '4. Client boundary (use client) hydrates interactive UI islands',
        '5. User actions trigger direct Server Actions with revalidatePath'
      ];
      dataFlowSummary = 'Server Fetch -> RSC Payload -> Client Hydration -> Server Action -> DB Mutation';
      layers.push(
        { name: 'App Router', role: 'Routing & RSC Shell', description: 'Server components and page route segments', filePaths: files.filter(f => f.includes('app/')) },
        { name: 'UI Components', role: 'Interactive View', description: 'Client widgets and reusable design elements', filePaths: files.filter(f => f.includes('components/')) },
        { name: 'Data / Actions', role: 'Server Actions & DB', description: 'Prisma queries, Server Actions, and DB clients', filePaths: files.filter(f => f.includes('actions') || f.includes('lib/db') || f.includes('prisma')) }
      );
    } else if (hasServices && (hasControllers || hasRepositories)) {
      pattern = 'Clean / Hexagonal Architecture';
      confidence = 90;
      summary = 'Decoupled domain-centric design separating business rules, application services, and external driving adapters (HTTP/DB).';
      entryPoints = ['src/index.ts', 'src/server.ts'];
      lifecycleSequence = [
        '1. Server bootstrap initializes dependency injection container',
        '2. HTTP Adapter / Router dispatches route to Controller',
        '3. Controller validates DTO request schema',
        '4. Application Service executes business rules using Domain Entities',
        '5. Repository interface communicates with DB persistence adapter'
      ];
      dataFlowSummary = 'HTTP Request -> Controller -> Application Service -> Domain Entity -> Repository -> DB';
      layers.push(
        { name: 'Adapters (Inbound)', role: 'Controllers & Routes', description: 'HTTP endpoints, validation schemas, and middlewares', filePaths: files.filter(f => f.includes('controller') || f.includes('route')) },
        { name: 'Application Core', role: 'Business Services', description: 'Use cases, workflows, and domain rules', filePaths: files.filter(f => f.includes('service') || f.includes('domain')) },
        { name: 'Adapters (Outbound)', role: 'Persistence & External APIs', description: 'DB repositories, Redis cache, and external SDKs', filePaths: files.filter(f => f.includes('repository') || f.includes('lib') || f.includes('db')) }
      );
    } else if (hasControllers && files.some(f => f.includes('models/'))) {
      pattern = 'Layered MVC';
      confidence = 88;
      summary = 'Classic Model-View-Controller structure separating data schemas, endpoint routing logic, and presentation views.';
      entryPoints = ['src/app.ts', 'server.js'];
      lifecycleSequence = [
        '1. Request enters router middleware',
        '2. Controller handles route action and parses parameters',
        '3. Model queries underlying database',
        '4. Response formatted and returned to client'
      ];
      dataFlowSummary = 'Router -> Controller -> Model -> DB Response -> View / JSON';
      layers.push(
        { name: 'Controllers', role: 'HTTP Handling', description: 'Request dispatch and validation', filePaths: files.filter(f => f.includes('controller')) },
        { name: 'Models', role: 'Data Representation', description: 'Schemas and ORM models', filePaths: files.filter(f => f.includes('model')) },
        { name: 'Routes', role: 'Endpoint Definitions', description: 'URL route mapping', filePaths: files.filter(f => f.includes('route')) }
      );
    } else if (hasCargo) {
      pattern = 'Rust / Systems Agent';
      confidence = 92;
      summary = 'High-concurrency systems architecture featuring memory safety, Tokio async task runtime, and strict type boundaries.';
      entryPoints = ['src/main.rs', 'src/lib.rs'];
      lifecycleSequence = [
        '1. Main starts Tokio multi-threaded async runtime',
        '2. System actors and channels are initialized',
        '3. Request or event queue dispatches async task',
        '4. Memory-safe computation finishes and delivers message'
      ];
      dataFlowSummary = 'Tokio Reactor -> Async Actor Channel -> Domain Engine -> Storage';
      layers.push(
        { name: 'Core Engine', role: 'Tokio Async Runtime', description: 'Native binary execution and event loops', filePaths: files.filter(f => f.endsWith('.rs')) }
      );
    } else if ((depNames.includes('react') || depNames.includes('vue') || depNames.includes('svelte')) && (hasComponents || hasStore || depNames.includes('vite'))) {
      pattern = 'Client-Heavy SPA';
      confidence = 90;
      summary = 'Single Page Application (SPA) driven by client-side router, centralized state stores, and asynchronous REST/GraphQL queries.';
      entryPoints = ['src/main.tsx', 'index.html'];
      lifecycleSequence = [
        '1. Static index.html loads bundled JS script tag',
        '2. Client router initializes in-memory history',
        '3. Global store (Zustand/Redux) and QueryClient hydrate',
        '4. Root component tree mounts into DOM #root',
        '5. Hooks fetch remote API data asynchronously with reactive re-render'
      ];
      dataFlowSummary = 'View Component -> Custom Hook -> Global Store / Query Client -> REST API -> Reactive UI';
      layers.push(
        { name: 'Presentation Layer', role: 'UI Components & Pages', description: 'Interactive React/Vue component tree', filePaths: files.filter(f => f.includes('component') || f.includes('pages')) },
        { name: 'State & Logic Layer', role: 'Hooks & Stores', description: 'Zustand stores, custom hooks, and reactive state', filePaths: files.filter(f => f.includes('store') || f.includes('hook')) },
        { name: 'Network Layer', role: 'API Clients & SDKs', description: 'Axios/Fetch utilities and service connectors', filePaths: files.filter(f => f.includes('api') || f.includes('lib') || f.includes('services')) }
      );
    } else {
      pattern = 'Standard Fullstack';
      confidence = 75;
      summary = 'Standard full-stack project combining frontend views, backend endpoints, and utility scripts.';
      entryPoints = files.filter(f => f.includes('index') || f.includes('main'));
      lifecycleSequence = [
        '1. Application entry point starts',
        '2. Dependencies configure runtime environment',
        '3. Request/event lifecycle begins execution'
      ];
      dataFlowSummary = 'Client -> Server -> Database';
      layers.push(
        { name: 'Application Code', role: 'Source Files', description: 'General project modules', filePaths: files.slice(0, 10) }
      );
    }

    return {
      pattern,
      confidence,
      summary,
      entryPoints,
      lifecycleSequence,
      dataFlowSummary,
      layers
    };
  }

  private buildArchitectureGraph(report: ArchitectureReport, deps: DetectedDependency[], files: string[]): ArchitectureGraph {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const depNames = deps.map(d => d.name.toLowerCase());

    if (report.pattern === 'Next.js App Router Monolith') {
      nodes.push(
        { id: 'client', label: 'Web Browser / Client', type: 'external', layer: 'Client', filesCount: 1, tech: ['HTTP/2', 'Fetch'], description: 'Browser client requesting pages and firing Server Actions', x: 50, y: 150 },
        { id: 'router', label: 'App Router (/app)', type: 'entry', layer: 'Routing', filesCount: files.filter(f => f.includes('app/')).length || 4, tech: ['Next.js App Router', 'RSC'], description: 'Nested layouts, route segments, and dynamic server rendering', x: 250, y: 150 },
        { id: 'components', label: 'UI Components', type: 'ui', layer: 'Presentation', filesCount: files.filter(f => f.includes('components/')).length || 8, tech: ['React 18', 'Tailwind CSS'], description: 'Interactive client and server component tree', x: 450, y: 70 },
        { id: 'actions', label: 'Server Actions & API', type: 'service', layer: 'Backend', filesCount: files.filter(f => f.includes('actions') || f.includes('api')).length || 5, tech: ['Server Actions', 'Zod'], description: 'Secure server-side mutations and API route handlers', x: 450, y: 230 },
        { id: 'ai', label: 'AI & Inference Engine', type: 'ai', layer: 'Intelligence', filesCount: 2, tech: ['Vercel AI SDK', 'OpenAI/Claude'], description: 'Streaming LLM text generation and agentic tool calls', x: 650, y: 70 },
        { id: 'db', label: 'Database & ORM', type: 'data', layer: 'Persistence', filesCount: 3, tech: depNames.includes('prisma') ? ['Prisma ORM', 'PostgreSQL'] : ['Database Client'], description: 'Type-safe SQL queries, schema migrations, and storage', x: 650, y: 230 }
      );

      edges.push(
        { id: 'e1', from: 'client', to: 'router', label: 'HTTP GET / RSC Request', animated: true },
        { id: 'e2', from: 'router', to: 'components', label: 'Hydrates UI Islands' },
        { id: 'e3', from: 'client', to: 'actions', label: 'Form POST / Server Action', animated: true },
        { id: 'e4', from: 'components', to: 'ai', label: 'useChat Streaming' },
        { id: 'e5', from: 'actions', to: 'db', label: 'Prisma Client Query' },
        { id: 'e6', from: 'ai', to: 'db', label: 'Vector Similarity Search' }
      );
    } else if (report.pattern === 'Clean / Hexagonal Architecture') {
      nodes.push(
        { id: 'client', label: 'External Clients / HTTP', type: 'external', layer: 'External', filesCount: 1, tech: ['HTTP/JSON', 'gRPC'], description: 'Mobile, Web, and third-party callers', x: 50, y: 150 },
        { id: 'controllers', label: 'Inbound Controllers', type: 'entry', layer: 'Adapters (In)', filesCount: files.filter(f => f.includes('controller')).length || 4, tech: ['Fastify/Express', 'Zod DTO'], description: 'Request routing, parameter validation, and auth guards', x: 250, y: 150 },
        { id: 'services', label: 'Application Services', type: 'service', layer: 'Core Domain', filesCount: files.filter(f => f.includes('service')).length || 6, tech: ['TypeScript Core', 'Business Rules'], description: 'Orchestrates use cases and domain workflow rules', x: 450, y: 150 },
        { id: 'repo', label: 'Repository Ports', type: 'data', layer: 'Adapters (Out)', filesCount: files.filter(f => f.includes('repo')).length || 4, tech: ['Prisma / Drizzle'], description: 'Decoupled data persistence interfaces', x: 650, y: 80 },
        { id: 'cache', label: 'Cache / Message Bus', type: 'data', layer: 'Adapters (Out)', filesCount: 2, tech: ['Redis', 'Kafka'], description: 'Distributed caching and event pub/sub', x: 650, y: 220 }
      );

      edges.push(
        { id: 'e1', from: 'client', to: 'controllers', label: 'REST Request', animated: true },
        { id: 'e2', from: 'controllers', to: 'services', label: 'Execute Use Case' },
        { id: 'e3', from: 'services', to: 'repo', label: 'Query / Persist' },
        { id: 'e4', from: 'services', to: 'cache', label: 'Invalidate / Cache Hit' }
      );
    } else {
      // Client-Heavy SPA default
      nodes.push(
        { id: 'entry', label: 'index.html & main.tsx', type: 'entry', layer: 'Bootstrap', filesCount: 2, tech: ['Vite', 'TypeScript'], description: 'Application mounting root and module bundles', x: 50, y: 150 },
        { id: 'views', label: 'Views & Components', type: 'ui', layer: 'Presentation', filesCount: files.filter(f => f.includes('component') || f.includes('pages')).length || 6, tech: ['React', 'Tailwind'], description: 'Declarative UI components and interactive views', x: 250, y: 150 },
        { id: 'hooks', label: 'Custom Hooks', type: 'service', layer: 'Logic', filesCount: files.filter(f => f.includes('hook')).length || 3, tech: ['React Hooks'], description: 'Encapsulated business logic and lifecycle bindings', x: 450, y: 70 },
        { id: 'store', label: 'State Store', type: 'state', layer: 'State', filesCount: files.filter(f => f.includes('store')).length || 2, tech: [report.pattern === 'Client-Heavy SPA' ? 'Zustand / Redux' : 'State Engine'], description: 'Centralized reactive client data store', x: 450, y: 230 },
        { id: 'api', label: 'API Client / Server', type: 'data', layer: 'Network', filesCount: files.filter(f => f.includes('api') || f.includes('lib')).length || 3, tech: ['Axios / TanStack Query', 'REST'], description: 'Remote data synchronization, caching, and mutations', x: 650, y: 150 }
      );

      edges.push(
        { id: 'e1', from: 'entry', to: 'views', label: 'Mounts DOM' },
        { id: 'e2', from: 'views', to: 'hooks', label: 'Invokes Logic' },
        { id: 'e3', from: 'views', to: 'store', label: 'Dispatches Action' },
        { id: 'e4', from: 'hooks', to: 'api', label: 'Queries Data', animated: true },
        { id: 'e5', from: 'api', to: 'store', label: 'Caches Response' }
      );
    }

    return { nodes, edges };
  }
}

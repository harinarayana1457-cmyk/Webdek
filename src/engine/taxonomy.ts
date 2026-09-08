import { CatalogItem, DetectedDependency, TechCategory, TechSignificance } from './types';

export const TECH_CATALOG: Record<string, CatalogItem> = {
  // === UI FRAMEWORKS & VIEW ENGINES ===
  react: {
    name: 'React',
    category: 'ui',
    purpose: 'Declarative, component-based user interface library using a virtual DOM.',
    significance: 'Core view engine. Dictates functional component patterns, hooks lifecycle, and unidirectional data flow.',
    level: 'critical',
    docsUrl: 'https://react.dev',
    tags: ['ui', 'components', 'vdom']
  },
  'react-dom': {
    name: 'React DOM',
    category: 'ui',
    purpose: 'DOM-specific rendering bindings for React components.',
    significance: 'Bridges abstract React component trees directly to browser HTML DOM elements.',
    level: 'critical',
    docsUrl: 'https://react.dev',
    tags: ['dom', 'renderer']
  },
  next: {
    name: 'Next.js',
    category: 'ui',
    purpose: 'Fullstack React meta-framework providing App Router, SSR, SSG, Server Actions, and automatic routing.',
    significance: 'Unifies frontend and backend in one codebase; drives React Server Components (RSC) architecture and zero-bundle server logic.',
    level: 'critical',
    docsUrl: 'https://nextjs.org',
    tags: ['meta-framework', 'ssr', 'rsc']
  },
  vue: {
    name: 'Vue.js',
    category: 'ui',
    purpose: 'Progressive framework for building reactive UIs using template syntax and Composition API.',
    significance: 'Provides deep fine-grained reactivity out of the box with intuitive single-file components (.vue).',
    level: 'critical',
    docsUrl: 'https://vuejs.org',
    tags: ['vue', 'reactivity']
  },
  nuxt: {
    name: 'Nuxt',
    category: 'ui',
    purpose: 'Fullstack Vue meta-framework offering auto-imports, SSR, file-system routing, and server engines (Nitro).',
    significance: 'Enterprise foundation for Vue applications; standardizes SSR, caching, and server routes.',
    level: 'critical',
    docsUrl: 'https://nuxt.com'
  },
  svelte: {
    name: 'Svelte',
    category: 'ui',
    purpose: 'Compiler-based UI framework that converts declarative components into surgical vanilla JavaScript at build time.',
    significance: 'Eliminates virtual DOM overhead; offers ultra-fast runtime performance and minimal memory footprint.',
    level: 'critical',
    docsUrl: 'https://svelte.dev'
  },
  '@sveltejs/kit': {
    name: 'SvelteKit',
    category: 'ui',
    purpose: 'Fullstack application framework for Svelte with filesystem routing, adapters, and server endpoints.',
    significance: 'Production architecture standard for Svelte with universal rendering and edge deployment support.',
    level: 'critical',
    docsUrl: 'https://kit.svelte.dev'
  },
  astro: {
    name: 'Astro',
    category: 'ui',
    purpose: 'Content-driven web framework using Islands Architecture to ship zero client-side JavaScript by default.',
    significance: 'Ideal for content sites and documentation; delivers maximum Lighthouse scores via selective component hydration.',
    level: 'critical',
    docsUrl: 'https://astro.build'
  },
  'solid-js': {
    name: 'SolidJS',
    category: 'ui',
    purpose: 'Declarative UI library with fine-grained reactivity and JSX, compiling without a Virtual DOM.',
    significance: 'Delivers raw performance rivaling vanilla JS while maintaining ergonomic React-like JSX syntax.',
    level: 'high',
    docsUrl: 'https://www.solidjs.com'
  },
  '@angular/core': {
    name: 'Angular',
    category: 'ui',
    purpose: 'Opinionated enterprise platform providing dependency injection, two-way binding, and RxJS-driven reactivity.',
    significance: 'Establishes strict enterprise structure with CLI generators, TypeScript decorators, and integrated services.',
    level: 'critical',
    docsUrl: 'https://angular.dev'
  },

  // === STATE MANAGEMENT ===
  zustand: {
    name: 'Zustand',
    category: 'state',
    purpose: 'Minimalist, unopinionated client state management using hooks and transient update subscriptions.',
    significance: 'Replaces verbose Redux boilerplate with simple hook closures; prevents unnecessary component re-renders.',
    level: 'high',
    docsUrl: 'https://zustand.docs.pmnd.rs',
    tags: ['state', 'hooks', 'flux']
  },
  '@reduxjs/toolkit': {
    name: 'Redux Toolkit (RTK)',
    category: 'state',
    purpose: 'Standard, opinionated toolset for efficient Redux development with Immer-powered immutable state slices.',
    significance: 'Industry benchmark for enterprise-scale deterministic state machines, action dispatching, and devtools replayability.',
    level: 'high',
    docsUrl: 'https://redux-toolkit.js.org'
  },
  redux: {
    name: 'Redux',
    category: 'state',
    purpose: 'Predictable state container for JavaScript apps based on pure reducers and single source of truth.',
    significance: 'Centralizes global application state with strict unidirectional action dispatches.',
    level: 'medium',
    docsUrl: 'https://redux.js.org'
  },
  jotai: {
    name: 'Jotai',
    category: 'state',
    purpose: 'Atomic state management for React inspired by Recoil, based on composable atom primitives.',
    significance: 'Allows granular, bottom-up state dependency tracking without top-level provider wrapping.',
    level: 'medium',
    docsUrl: 'https://jotai.org'
  },
  recoil: {
    name: 'Recoil',
    category: 'state',
    purpose: 'Experimental atomic state library for React enabling derived state selectors and concurrent mode compatibility.',
    significance: 'Fine-grained atom reactivity designed specifically for complex graph-like UI state relationships.',
    level: 'medium',
    docsUrl: 'https://recoiljs.org'
  },
  pinia: {
    name: 'Pinia',
    category: 'state',
    purpose: 'Official intuitive store library for Vue 3 with modular stores and TypeScript inference.',
    significance: 'Replaces Vuex; removes mutations in favor of composable reactive actions and direct state mutations.',
    level: 'high',
    docsUrl: 'https://pinia.vuejs.org'
  },
  mobx: {
    name: 'MobX',
    category: 'state',
    purpose: 'Transparent functional reactive state management using observable properties and automatic tracking.',
    significance: 'Enables imperative object mutation while maintaining declarative, automatic UI sync.',
    level: 'medium',
    docsUrl: 'https://mobx.js.org'
  },
  xstate: {
    name: 'XState',
    category: 'state',
    purpose: 'Actor model and finite state machine (FSM) engine for modeling robust UI and business logic lifecycles.',
    significance: 'Eliminates impossible UI states and race conditions through mathematically formal state transition charts.',
    level: 'high',
    docsUrl: 'https://stately.ai/docs'
  },

  // === DATA FETCHING, APIS & NETWORKING ===
  '@tanstack/react-query': {
    name: 'TanStack Query (React Query)',
    category: 'api',
    purpose: 'Powerful asynchronous server-state manager offering caching, background refetching, and optimistic mutations.',
    significance: 'Separates server cache from client UI state; drastically reduces network requests and custom useEffect data-fetching bugs.',
    level: 'critical',
    docsUrl: 'https://tanstack.com/query',
    tags: ['caching', 'server-state', 'http']
  },
  swr: {
    name: 'SWR',
    category: 'api',
    purpose: 'Stale-While-Revalidate data fetching library from Vercel for lightweight HTTP caching.',
    significance: 'Ensures instantaneous UI rendering from memory cache while quietly syncing fresh data in the background.',
    level: 'high',
    docsUrl: 'https://swr.vercel.app'
  },
  axios: {
    name: 'Axios',
    category: 'api',
    purpose: 'Promise-based HTTP client for browser and node.js with interceptors, cancellation, and auto JSON parsing.',
    significance: 'Standardized REST transport layer; allows universal request authorization injection and uniform error interceptors.',
    level: 'medium',
    docsUrl: 'https://axios-http.com'
  },
  '@trpc/server': {
    name: 'tRPC',
    category: 'api',
    purpose: 'End-to-end typesafe API framework creating compile-time synchronized RPC routers without schema codegen.',
    significance: 'Guarantees 100% type safety between frontend and backend without OpenAPI or GraphQL build steps.',
    level: 'critical',
    docsUrl: 'https://trpc.io'
  },
  graphql: {
    name: 'GraphQL',
    category: 'api',
    purpose: 'Query language and server execution runtime for declarative, self-documenting graph APIs.',
    significance: 'Prevents over-fetching and under-fetching by allowing clients to request exact required fields.',
    level: 'high',
    docsUrl: 'https://graphql.org'
  },
  '@apollo/client': {
    name: 'Apollo Client',
    category: 'api',
    purpose: 'Comprehensive GraphQL client featuring normalized caching, optimistic UI, and local state management.',
    significance: 'Enterprise standard for GraphQL-driven frontend architectures with automated normalized entity caching.',
    level: 'high',
    docsUrl: 'https://www.apollographql.com'
  },
  urql: {
    name: 'urql',
    category: 'api',
    purpose: 'Lightweight, modular GraphQL client for React, Vue, Svelte, and vanilla JS.',
    significance: 'Smaller bundle alternative to Apollo Client with extensible exchanges architecture.',
    level: 'medium',
    docsUrl: 'https://commerce.nearform.com/open-source/urql'
  },

  // === AI, LLM & AGENTIC STACK ===
  ai: {
    name: 'Vercel AI SDK',
    category: 'ai',
    purpose: 'Universal TypeScript toolkit for streaming text/generative UI, prompt engineering, and structured outputs.',
    significance: 'Primary modern standard for web AI apps; seamlessly handles RSC streaming and provider-agnostic model routing.',
    level: 'critical',
    docsUrl: 'https://sdk.vercel.ai/docs',
    tags: ['ai', 'streaming', 'llm']
  },
  openai: {
    name: 'OpenAI SDK',
    category: 'ai',
    purpose: 'Official client library for OpenAI APIs (GPT-4o, o1, Whisper, Embeddings, DALL-E, Assistant API).',
    significance: 'Direct integration with OpenAI foundation models, function calling, and structured JSON output generation.',
    level: 'high',
    docsUrl: 'https://platform.openai.com/docs'
  },
  '@anthropic-ai/sdk': {
    name: 'Anthropic SDK',
    category: 'ai',
    purpose: 'Official client for Claude models (Claude 3.5 Sonnet, Haiku, Opus) and computer-use agent interfaces.',
    significance: 'Enables reasoning-heavy agentic workflows, long-context code analysis, and prompt caching.',
    level: 'high',
    docsUrl: 'https://docs.anthropic.com'
  },
  langchain: {
    name: 'LangChain',
    category: 'ai',
    purpose: 'Composability framework for developing LLM applications with chains, document loaders, and memory.',
    significance: 'Orchestrates multi-step retrieval-augmented generation (RAG) pipelines and conversational memory.',
    level: 'high',
    docsUrl: 'https://js.langchain.com'
  },
  '@langchain/core': {
    name: 'LangChain Core',
    category: 'ai',
    purpose: 'Base abstractions, runnables (LCEL), and schemas for LangChain components.',
    significance: 'Standardized LCEL pipeline execution with built-in async streaming and tracing.',
    level: 'high',
    docsUrl: 'https://js.langchain.com'
  },
  llamaindex: {
    name: 'LlamaIndex',
    category: 'ai',
    purpose: 'Data framework for ingesting, structuring, and accessing private/custom enterprise data for LLMs.',
    significance: 'Specialized for advanced RAG indexing, query engines, and agent data retrieval connectors.',
    level: 'high',
    docsUrl: 'https://ts.llamaindex.ai'
  },
  chromadb: {
    name: 'ChromaDB Client',
    category: 'ai',
    purpose: 'Client for open-source AI vector database designed for storing embeddings and semantic similarity searches.',
    significance: 'Provides embedded/local semantic memory for RAG agents and context retrieval.',
    level: 'high',
    docsUrl: 'https://www.trychroma.com'
  },
  '@pinecone-database/pinecone': {
    name: 'Pinecone SDK',
    category: 'ai',
    purpose: 'Managed cloud vector database client for scalable low-latency vector similarity search.',
    significance: 'Enterprise vector index layer for high-throughput AI retrieval architectures.',
    level: 'high',
    docsUrl: 'https://www.pinecone.io'
  },
  ollama: {
    name: 'Ollama JS',
    category: 'ai',
    purpose: 'Client for running and querying local open-weight LLMs (Llama 3, Mistral, Gemma, DeepSeek).',
    significance: 'Enables private, offline, zero-cloud-cost local AI agent execution.',
    level: 'medium',
    docsUrl: 'https://ollama.com'
  },
  '@modelcontextprotocol/sdk': {
    name: 'Model Context Protocol (MCP) SDK',
    category: 'ai',
    purpose: 'Open standard SDK connecting AI models to external tools, databases, and context servers.',
    significance: 'Architectural backbone for interoperable agent tool-calling across Claude, Cursor, and Antigravity.',
    level: 'critical',
    docsUrl: 'https://modelcontextprotocol.io'
  },

  // === STYLING & DESIGN SYSTEMS ===
  tailwindcss: {
    name: 'Tailwind CSS',
    category: 'styling',
    purpose: 'Utility-first CSS framework with just-in-time (JIT) compilation directly from source code.',
    significance: 'Dominant styling engine. Enforces rapid consistent design tokens and eliminates dead CSS bundles.',
    level: 'critical',
    docsUrl: 'https://tailwindcss.com',
    tags: ['css', 'utility', 'jit']
  },
  postcss: {
    name: 'PostCSS',
    category: 'styling',
    purpose: 'CSS transformation tool operating with JavaScript plugins like Autoprefixer and Tailwind.',
    significance: 'Underlying build pipeline processing custom syntax, vendor prefixes, and future CSS standards.',
    level: 'utility',
    docsUrl: 'https://postcss.org'
  },
  autoprefixer: {
    name: 'Autoprefixer',
    category: 'styling',
    purpose: 'PostCSS plugin to parse CSS and add vendor prefixes using values from Can I Use.',
    significance: 'Guarantees cross-browser compatibility for modern CSS properties automatically.',
    level: 'utility',
    docsUrl: 'https://github.com/postcss/autoprefixer'
  },
  sass: {
    name: 'Sass / SCSS',
    category: 'styling',
    purpose: 'Mature CSS preprocessor adding variables, nested rules, mixins, and functions.',
    significance: 'Legacy and enterprise styling foundation for modular stylesheet architectures.',
    level: 'medium',
    docsUrl: 'https://sass-lang.com'
  },
  'styled-components': {
    name: 'Styled Components',
    category: 'styling',
    purpose: 'CSS-in-JS library utilizing tagged template literals to style React components with scoped styles.',
    significance: 'Pioneered dynamic component-bound styling; adds runtime styling logic tied to React props.',
    level: 'medium',
    docsUrl: 'https://styled-components.com'
  },
  '@emotion/react': {
    name: 'Emotion CSS-in-JS',
    category: 'styling',
    purpose: 'Flexible and performant CSS-in-JS library supporting source maps, labels, and SSR.',
    significance: 'Common foundation for UI kits like Material UI (MUI); allows runtime dynamic styling interpolation.',
    level: 'medium',
    docsUrl: 'https://emotion.sh'
  },
  '@vanilla-extract/css': {
    name: 'Vanilla Extract',
    category: 'styling',
    purpose: 'Zero-runtime TypeScript-first CSS preprocessor generating static CSS at build time.',
    significance: 'Combines type-safe design tokens and CSS variables with zero client-side JS runtime cost.',
    level: 'high',
    docsUrl: 'https://vanilla-extract.style'
  },
  clsx: {
    name: 'clsx',
    category: 'styling',
    purpose: 'Ultra-tiny (228B) utility for conditionally combining class names.',
    significance: 'Essential helper for dynamic conditional class concatenation without messy template strings.',
    level: 'utility',
    docsUrl: 'https://github.com/lukeed/clsx'
  },
  'tailwind-merge': {
    name: 'Tailwind Merge',
    category: 'styling',
    purpose: 'Utility function to efficiently merge Tailwind CSS classes without stylesheet specificity conflicts.',
    significance: 'Core primitive for shadcn/ui and reusable component design systems with override support.',
    level: 'medium',
    docsUrl: 'https://github.com/dcastil/tailwind-merge'
  },
  'lucide-react': {
    name: 'Lucide Icons',
    category: 'ui',
    purpose: 'Beautiful & consistent open-source icon set customized for React applications.',
    significance: 'Modern fork of Feather Icons; lightweight SVG icons with tree-shaking support.',
    level: 'medium',
    docsUrl: 'https://lucide.dev'
  },

  // === BACKENDS, RUNTIMES & WEB SERVERS ===
  express: {
    name: 'Express',
    category: 'runtime',
    purpose: 'Fast, unopinionated, minimalist web framework for Node.js using middleware pipelines.',
    significance: 'Foundational standard for Node HTTP services; vast ecosystem of middleware and routing conventions.',
    level: 'critical',
    docsUrl: 'https://expressjs.com'
  },
  fastify: {
    name: 'Fastify',
    category: 'runtime',
    purpose: 'High-performance, low-overhead web framework for Node.js focused on speed and JSON schema validation.',
    significance: 'Modern successor to Express with up to 4x higher throughput and native TypeScript schema decorators.',
    level: 'critical',
    docsUrl: 'https://fastify.dev'
  },
  '@nestjs/core': {
    name: 'NestJS',
    category: 'runtime',
    purpose: 'Progressive Node.js framework for building efficient, reliable, enterprise-grade server-side applications.',
    significance: 'Enforces strict Angular-style architecture with dependency injection, modules, and controller decorators.',
    level: 'critical',
    docsUrl: 'https://nestjs.com'
  },
  hono: {
    name: 'Hono',
    category: 'runtime',
    purpose: 'Ultra-fast, lightweight Web Standards-based router designed for Edge runtimes (Cloudflare, Deno, Bun).',
    significance: 'Leading serverless/edge framework; zero dependencies, minimal cold-starts, and end-to-end RPC client.',
    level: 'critical',
    docsUrl: 'https://hono.dev'
  },
  elysia: {
    name: 'ElysiaJS',
    category: 'runtime',
    purpose: 'Ergonomic web framework for Bun with end-to-end type safety and extreme micro-benchmark performance.',
    significance: 'Optimized specifically for the Bun runtime with strict TypeBox validation and Eden RPC.',
    level: 'high',
    docsUrl: 'https://elysiajs.com'
  },
  koa: {
    name: 'Koa',
    category: 'runtime',
    purpose: 'Expressive HTTP middleware framework for Node.js created by the team behind Express.',
    significance: 'Pioneered async/await middleware cascading (onion model) without bundled routing or templating.',
    level: 'medium',
    docsUrl: 'https://koajs.com'
  },

  // === DATABASES & ORMS ===
  prisma: {
    name: 'Prisma ORM',
    category: 'database',
    purpose: 'Next-generation TypeScript ORM featuring declarative schema modeling, migrations, and type-safe query engine.',
    significance: 'Sets the gold standard for fullstack TypeScript data access; generates complete TypeScript client types directly from schema.',
    level: 'critical',
    docsUrl: 'https://www.prisma.io',
    tags: ['orm', 'database', 'schema']
  },
  '@prisma/client': {
    name: 'Prisma Client',
    category: 'database',
    purpose: 'Auto-generated, typesafe database client tailored to the project schema definition.',
    significance: 'Primary data persistence layer; guarantees runtime query safety against SQL injections and schema drift.',
    level: 'critical',
    docsUrl: 'https://www.prisma.io'
  },
  'drizzle-orm': {
    name: 'Drizzle ORM',
    category: 'database',
    purpose: 'Lightweight TypeScript ORM with zero dependencies and SQL-like syntax that compiles directly to raw queries.',
    significance: 'Maximum performance alternative to Prisma; operates with zero engine binary overhead and native serverless cold-start speed.',
    level: 'critical',
    docsUrl: 'https://orm.drizzle.team'
  },
  mongoose: {
    name: 'Mongoose',
    category: 'database',
    purpose: 'MongoDB object modeling tool designed to work in an asynchronous environment with schema validation.',
    significance: 'Standard document-database ODM for Node.js; handles validation, casting, business logic hooks, and population.',
    level: 'high',
    docsUrl: 'https://mongoosejs.com'
  },
  typeorm: {
    name: 'TypeORM',
    category: 'database',
    purpose: 'ORM that can run in NodeJS, Browser, Cordova, and Electron with Active Record and Data Mapper patterns.',
    significance: 'Classic enterprise ORM heavily used in NestJS architectures with decorator-driven table definitions.',
    level: 'high',
    docsUrl: 'https://typeorm.io'
  },
  '@supabase/supabase-js': {
    name: 'Supabase Client',
    category: 'database',
    purpose: 'Universal JavaScript client for Supabase: Postgres database, Auth, Storage, and Realtime subscriptions.',
    significance: 'Replaces custom backend CRUD APIs with direct client-to-Postgres Row Level Security (RLS) policies.',
    level: 'critical',
    docsUrl: 'https://supabase.com/docs'
  },
  firebase: {
    name: 'Firebase SDK',
    category: 'database',
    purpose: 'Google backend-as-a-service suite including Firestore, Realtime Database, Authentication, and Cloud Functions.',
    significance: 'Enables serverless real-time data sync and rapid prototyping with managed identity and storage.',
    level: 'high',
    docsUrl: 'https://firebase.google.com'
  },
  ioredis: {
    name: 'ioredis',
    category: 'database',
    purpose: 'Robust, full-featured Redis client for Node.js supporting Cluster, Sentinel, Pipelining, and Lua scripts.',
    significance: 'High-speed in-memory cache and pub/sub message broker for session storage and rate limiting.',
    level: 'high',
    docsUrl: 'https://github.com/redis/ioredis'
  },
  pg: {
    name: 'node-postgres (pg)',
    category: 'database',
    purpose: 'Non-blocking PostgreSQL client for Node.js with connection pooling and pure JavaScript implementation.',
    significance: 'Low-level driver powering many higher-level query builders and ORMs.',
    level: 'medium',
    docsUrl: 'https://node-postgres.com'
  },

  // === BUILD TOOLS & BUNDLERS ===
  vite: {
    name: 'Vite',
    category: 'build',
    purpose: 'Next-generation frontend tooling powered by native ES modules in development and Rollup for production.',
    significance: 'Provides lightning-fast instant server start and hot module replacement (HMR) independent of app size.',
    level: 'critical',
    docsUrl: 'https://vitejs.dev',
    tags: ['bundler', 'hmr', 'esm']
  },
  webpack: {
    name: 'Webpack',
    category: 'build',
    purpose: 'Configurable static module bundler for modern JavaScript applications with deep plugin architecture.',
    significance: 'Foundational build engine powering complex enterprise pipelines, code-splitting, and legacy asset loaders.',
    level: 'high',
    docsUrl: 'https://webpack.js.org'
  },
  rollup: {
    name: 'Rollup',
    category: 'build',
    purpose: 'Module bundler for JavaScript which compiles small pieces of code into something larger and more complex.',
    significance: 'Pioneer of ES6 tree-shaking; widely used as the production packaging engine for libraries and Vite.',
    level: 'medium',
    docsUrl: 'https://rollupjs.org'
  },
  esbuild: {
    name: 'esbuild',
    category: 'build',
    purpose: 'Extremely fast JavaScript/TypeScript bundler and minifier written in Go.',
    significance: '10-100x faster than traditional JS bundlers; powers Vite dependency pre-bundling and fast transforms.',
    level: 'high',
    docsUrl: 'https://esbuild.github.io'
  },
  turbo: {
    name: 'Turborepo',
    category: 'build',
    purpose: 'High-performance build system for JavaScript and TypeScript monorepos with remote computation caching.',
    significance: 'Accelerates CI/CD by never executing the same build or test task twice across monorepo packages.',
    level: 'high',
    docsUrl: 'https://turbo.build/repo'
  },
  tsup: {
    name: 'tsup',
    category: 'build',
    purpose: 'Zero-config TypeScript bundler powered by esbuild to bundle TS libraries into ESM and CJS.',
    significance: 'De facto standard for modern TypeScript packages and CLI tools with instant compilation and .d.ts generation.',
    level: 'medium',
    docsUrl: 'https://tsup.egoist.dev'
  },

  // === TESTING & QUALITY ASSURANCE ===
  vitest: {
    name: 'Vitest',
    category: 'testing',
    purpose: 'Blazing fast unit test framework powered by Vite, sharing configuration and transform pipeline.',
    significance: 'Modern Jest replacement with instant watch mode, native ESM, and TypeScript support out of the box.',
    level: 'high',
    docsUrl: 'https://vitest.dev'
  },
  jest: {
    name: 'Jest',
    category: 'testing',
    purpose: 'Delightful JavaScript testing framework with a focus on simplicity, snapshots, and isolated sandboxing.',
    significance: 'Long-standing industry baseline for automated unit testing and mock assertions in Node/React.',
    level: 'high',
    docsUrl: 'https://jestjs.io'
  },
  '@playwright/test': {
    name: 'Playwright',
    category: 'testing',
    purpose: 'Cross-browser end-to-end (E2E) testing framework for modern web apps with auto-waiting and tracing.',
    significance: 'State-of-the-art E2E automation; reliable multi-tab tests against Chromium, Firefox, and WebKit.',
    level: 'high',
    docsUrl: 'https://playwright.dev'
  },
  cypress: {
    name: 'Cypress',
    category: 'testing',
    purpose: 'Front-end testing tool built for the modern web with time-travel debugging and real-browser runner.',
    significance: 'Visual interactive E2E testing standard with real-time DOM snapshots.',
    level: 'high',
    docsUrl: 'https://www.cypress.io'
  },
  '@testing-library/react': {
    name: 'React Testing Library',
    category: 'testing',
    purpose: 'Simple and complete testing utilities that encourage good testing practices reflecting user interactions.',
    significance: 'Enforces behavior-driven testing over implementation details (queries by role/text rather than component state).',
    level: 'medium',
    docsUrl: 'https://testing-library.com'
  },

  // === TOOLING & CODE QUALITY ===
  typescript: {
    name: 'TypeScript',
    category: 'tooling',
    purpose: 'Typed superset of JavaScript that compiles to plain JavaScript, catching syntax and type errors at compile-time.',
    significance: 'Universal bedrock of modern web development; enables self-documenting codebases, refactoring, and autocomplete.',
    level: 'critical',
    docsUrl: 'https://www.typescriptlang.org'
  },
  eslint: {
    name: 'ESLint',
    category: 'tooling',
    purpose: 'Pluggable static analysis linter identifying programmatic errors and enforcing coding standards.',
    significance: 'Guarantees code hygiene, prevents bug patterns, and aligns cross-team architectural conventions.',
    level: 'high',
    docsUrl: 'https://eslint.org'
  },
  prettier: {
    name: 'Prettier',
    category: 'tooling',
    purpose: 'Opinionated code formatter supporting JavaScript, TypeScript, CSS, JSON, and Markdown.',
    significance: 'Eliminates all formatting debates in code reviews by automatically parsing code into standard AST format.',
    level: 'medium',
    docsUrl: 'https://prettier.io'
  },
  '@biomejs/biome': {
    name: 'Biome',
    category: 'tooling',
    purpose: 'Ultra-fast toolchain for web projects providing formatting, linting, and more in a single Rust binary.',
    significance: 'Modern high-speed Rust-based replacement for both ESLint and Prettier.',
    level: 'high',
    docsUrl: 'https://biomejs.dev'
  },
  husky: {
    name: 'Husky',
    category: 'tooling',
    purpose: 'Modern native Git hooks made easy to prevent bad commits and push accidents.',
    significance: 'Enforces lint-staged and commitlint checks automatically before commits reach remote repositories.',
    level: 'utility',
    docsUrl: 'https://typicode.github.io/husky'
  },
  zod: {
    name: 'Zod',
    category: 'tooling',
    purpose: 'TypeScript-first schema declaration and validation library with static type inference.',
    significance: 'Standard runtime validation boundary; guarantees incoming API payloads and environment variables match declared types.',
    level: 'critical',
    docsUrl: 'https://zod.dev'
  },
  dotenv: {
    name: 'dotenv',
    category: 'tooling',
    purpose: 'Zero-dependency module that loads environment variables from a .env file into process.env.',
    significance: 'Standard Twelve-Factor App convention for decoupling configuration secrets from source code.',
    level: 'utility',
    docsUrl: 'https://github.com/motdotla/dotenv'
  }
};

/**
 * Heuristic Inference Engine for uncataloged libraries
 */
export function inferUncatalogedPackage(pkgName: string, version: string, isDev: boolean): DetectedDependency {
  const cleanName = pkgName.toLowerCase();

  let category: TechCategory = 'tooling';
  let level: TechSignificance = 'medium';
  let purpose = `Third-party package (${pkgName})`;
  let significance = 'Contributes supporting functionality to the project runtime or build pipeline.';

  // Scope and prefix heuristics
  if (cleanName.startsWith('@types/')) {
    category = 'tooling';
    level = 'utility';
    purpose = `TypeScript type definitions for ${cleanName.replace('@types/', '')}`;
    significance = 'Enables static type safety, autocomplete, and compile-time verification.';
  } else if (cleanName.includes('eslint') || cleanName.includes('prettier') || cleanName.includes('lint')) {
    category = 'tooling';
    level = 'utility';
    purpose = 'Linting or code formatting utility';
    significance = 'Enforces project style and architectural correctness guidelines.';
  } else if (cleanName.includes('test') || cleanName.includes('mock') || cleanName.includes('spec') || cleanName.includes('coverage')) {
    category = 'testing';
    level = 'medium';
    purpose = 'Testing, mocking, or coverage analysis library';
    significance = 'Supports automated verification and quality assurance.';
  } else if (cleanName.includes('tailwind') || cleanName.includes('css') || cleanName.includes('style') || cleanName.includes('font') || cleanName.includes('color')) {
    category = 'styling';
    level = 'medium';
    purpose = 'Styling or visual design system utility';
    significance = 'Controls component aesthetics, layout rules, or visual theming.';
  } else if (cleanName.includes('ai') || cleanName.includes('gpt') || cleanName.includes('llm') || cleanName.includes('agent') || cleanName.includes('embedding') || cleanName.includes('vector')) {
    category = 'ai';
    level = 'high';
    purpose = 'AI/LLM or agentic workflow integration';
    significance = 'Provides machine intelligence, prompt execution, or vector context retrieval.';
  } else if (cleanName.includes('store') || cleanName.includes('state') || cleanName.includes('redux') || cleanName.includes('atom')) {
    category = 'state';
    level = 'high';
    purpose = 'Client-side state management layer';
    significance = 'Manages reactive state variables and application data flow.';
  } else if (cleanName.includes('query') || cleanName.includes('fetch') || cleanName.includes('http') || cleanName.includes('request') || cleanName.includes('api') || cleanName.includes('rpc') || cleanName.includes('client')) {
    category = 'api';
    level = 'high';
    purpose = 'Data fetching, HTTP client, or network transport layer';
    significance = 'Coordinates communication between frontend clients and backend APIs.';
  } else if (cleanName.includes('db') || cleanName.includes('sql') || cleanName.includes('orm') || cleanName.includes('mongo') || cleanName.includes('redis') || cleanName.includes('postgres')) {
    category = 'database';
    level = 'high';
    purpose = 'Database client, driver, or Object-Relational Mapper';
    significance = 'Handles data persistence, querying, and storage transactions.';
  } else if (cleanName.includes('react') || cleanName.includes('vue') || cleanName.includes('svelte') || cleanName.includes('ui') || cleanName.includes('component') || cleanName.includes('modal') || cleanName.includes('dialog')) {
    category = 'ui';
    level = 'medium';
    purpose = 'UI component or interface building block';
    significance = 'Provides reusable visual controls and interactive screen elements.';
  } else if (cleanName.includes('vite') || cleanName.includes('webpack') || cleanName.includes('rollup') || cleanName.includes('plugin') || cleanName.includes('bundl') || cleanName.includes('build')) {
    category = 'build';
    level = 'medium';
    purpose = 'Build pipeline plugin or compilation tool';
    significance = 'Transforms, bundles, and optimizes source assets for deployment.';
  }

  return {
    name: pkgName,
    category,
    purpose,
    significance,
    level,
    version,
    isDev,
    isHeuristic: true,
    source: isDev ? 'devDependencies' : 'dependencies'
  };
}

/**
 * Resolves a dependency name to either its catalog entry or an inferred heuristic
 */
export function resolveDependency(pkgName: string, version: string, isDev: boolean): DetectedDependency {
  const catalogMatch = TECH_CATALOG[pkgName.toLowerCase()];
  if (catalogMatch) {
    return {
      ...catalogMatch,
      version,
      isDev,
      isHeuristic: false,
      source: isDev ? 'devDependencies' : 'dependencies'
    };
  }

  return inferUncatalogedPackage(pkgName, version, isDev);
}

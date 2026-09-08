import { MemoryFileSystemAdapter } from '../../engine/scanner';

export interface PresetOption {
  id: string;
  name: string;
  badge: string;
  description: string;
  files: Record<string, string>;
}

export const SAMPLE_PROJECTS: PresetOption[] = [
  {
    id: 'nextjs-ai-store',
    name: 'NexusAI Commerce (Next.js 14 App Router)',
    badge: 'Next.js RSC + AI',
    description: 'Fullstack Next.js 14 App Router with Vercel AI SDK streaming, Prisma ORM, Tailwind CSS, and MCP servers.',
    files: {
      'package.json': JSON.stringify({
        name: 'nexus-ai-commerce',
        version: '1.0.0',
        dependencies: {
          next: '^14.2.5',
          react: '^18.3.1',
          'react-dom': '^18.3.1',
          ai: '^3.3.0',
          openai: '^4.52.0',
          '@anthropic-ai/sdk': '^0.24.0',
          '@prisma/client': '^5.17.0',
          '@modelcontextprotocol/sdk': '^0.6.0',
          zustand: '^4.5.4',
          tailwindcss: '^3.4.6',
          'lucide-react': '^0.417.0',
          zod: '^3.23.8'
        },
        devDependencies: {
          typescript: '^5.5.3',
          prisma: '^5.17.0',
          '@types/react': '^18.3.3',
          eslint: '^8.57.0',
          prettier: '^3.3.3',
          postcss: '^8.4.39',
          autoprefixer: '^10.4.19'
        }
      }, null, 2),
      'tsconfig.json': '{\n  "compilerOptions": { "target": "es5", "lib": ["dom", "dom.iterable", "esnext"] }\n}',
      'next.config.js': '/** @type {import("next").NextConfig} */\nmodule.exports = { experimental: { serverActions: true } };',
      'app/layout.tsx': 'export default function RootLayout({ children }) { return <html><body>{children}</body></html>; }',
      'app/page.tsx': 'import { ProductGrid } from "@/components/ProductGrid";\nexport default async function HomePage() { return <main><ProductGrid /></main>; }',
      'app/api/chat/route.ts': 'import { OpenAIStream, StreamingTextResponse } from "ai";\nexport async function POST(req: Request) { return new Response("AI stream"); }',
      'app/actions/checkout.ts': '"use server";\nimport { prisma } from "@/lib/db";\nexport async function createCheckoutSession() { return { ok: true }; }',
      'components/ProductGrid.tsx': '"use client";\nimport { useCartStore } from "@/store/cartStore";\nexport function ProductGrid() { return <div>Grid</div>; }',
      'components/AIChatDrawer.tsx': '"use client";\nimport { useChat } from "ai/react";\nexport function AIChatDrawer() { return <div>Chat</div>; }',
      'store/cartStore.ts': 'import { create } from "zustand";\nexport const useCartStore = create((set) => ({ items: [] }));',
      'lib/db.ts': 'import { PrismaClient } from "@prisma/client";\nexport const prisma = new PrismaClient();',
      'prisma/schema.prisma': 'datasource db { provider = "postgresql", url = env("DATABASE_URL") }\nmodel Product { id String @id }',
      '.cursorrules': `# NexusAI Workspace Rules
1. Always use React Server Components by default; add 'use client' only when state/events are needed.
2. Ensure Server Actions are validated using Zod schemas before database queries.
3. Use Tailwind utility classes; do not write custom CSS rules.
4. AI streaming routes must use Vercel AI SDK protocol with streaming response headers.`,
      'CLAUDE.md': `# Claude Agent Directives
- Coding Style: Strict TypeScript with no implicit 'any'.
- ORM: Prisma schema is the single source of truth for database models.
- Tests: Run 'pnpm test' prior to suggesting git commit commands.`,
      'mcp.json': JSON.stringify({
        mcpServers: {
          'postgres-mcp': { command: 'npx', args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://localhost:5432/nexus'], description: 'Direct database inspection server' },
          'stripe-mcp': { command: 'npx', args: ['-y', '@stripe/mcp-server'], description: 'Stripe payments and product catalog sync' }
        }
      }, null, 2),
      '.env.example': `DATABASE_URL="postgresql://user:pass@localhost:5432/nexus"
OPENAI_API_KEY="sk-proj-..."
ANTHROPIC_API_KEY="sk-ant-..."
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"`
    }
  },
  {
    id: 'vite-react-spa',
    name: 'CanvasFlow Studio (Vite + React SPA)',
    badge: 'Vite SPA + Zustand',
    description: 'High-performance interactive Single Page App featuring Zustand state machines, TanStack Query, and Vitest.',
    files: {
      'package.json': JSON.stringify({
        name: 'canvasflow-studio',
        version: '2.1.0',
        dependencies: {
          react: '^18.3.1',
          'react-dom': '^18.3.1',
          zustand: '^4.5.4',
          '@tanstack/react-query': '^5.51.1',
          axios: '^1.7.2',
          tailwindcss: '^3.4.6',
          'lucide-react': '^0.417.0',
          clsx: '^2.1.1',
          'tailwind-merge': '^2.4.0'
        },
        devDependencies: {
          vite: '^5.3.4',
          '@vitejs/plugin-react': '^4.3.1',
          typescript: '^5.5.3',
          vitest: '^2.0.4',
          '@testing-library/react': '^16.0.0',
          eslint: '^9.7.0',
          prettier: '^3.3.3'
        }
      }, null, 2),
      'index.html': '<!DOCTYPE html><html><div id="root"></div><script type="module" src="/src/main.tsx"></script></html>',
      'vite.config.ts': 'import { defineConfig } from "vite";\nexport default defineConfig({ plugins: [] });',
      'src/main.tsx': 'import React from "react";\nimport ReactDOM from "react-dom/client";\nReactDOM.createRoot(document.getElementById("root")).render(<App />);',
      'src/App.tsx': 'import { Canvas } from "./components/Canvas";\nexport function App() { return <Canvas />; }',
      'src/components/Canvas.tsx': 'import { useCanvasStore } from "../store/canvasStore";\nexport function Canvas() { return <canvas />; }',
      'src/components/Toolbar.tsx': 'export function Toolbar() { return <div>Tools</div>; }',
      'src/store/canvasStore.ts': 'import { create } from "zustand";\nexport const useCanvasStore = create((set) => ({ nodes: [] }));',
      'src/hooks/useAutoSave.ts': 'import { useEffect } from "react";\nexport function useAutoSave() {}',
      'src/api/client.ts': 'import axios from "axios";\nexport const apiClient = axios.create({ baseURL: "/api" });',
      '.cursorrules': `# CanvasFlow Studio Rules
- Maintain pure functional components in /src/components.
- Isolate all mutable canvas coordinates and undo/redo stacks within /src/store/canvasStore.ts.
- Tests must be colocated using Vitest (.test.tsx files).`,
      '.env.example': `VITE_API_BASE_URL="https://api.canvasflow.dev"
VITE_ANALYTICS_ID="cf-analytics-99"`
    }
  },
  {
    id: 'fastify-hexagonal',
    name: 'KitePay Core (Fastify Hexagonal Microservice)',
    badge: 'Clean / Hexagonal',
    description: 'Decoupled domain-driven financial microservice using Fastify, Prisma ORM, Redis ioredis, and Docker.',
    files: {
      'package.json': JSON.stringify({
        name: 'kitepay-core',
        version: '3.0.0',
        dependencies: {
          fastify: '^4.28.1',
          '@prisma/client': '^5.17.0',
          ioredis: '^5.4.1',
          zod: '^3.23.8',
          dotenv: '^16.4.5'
        },
        devDependencies: {
          typescript: '^5.5.3',
          prisma: '^5.17.0',
          tsup: '^8.1.0',
          vitest: '^2.0.4',
          '@biomejs/biome': '^1.8.3'
        }
      }, null, 2),
      'src/server.ts': 'import Fastify from "fastify";\nconst app = Fastify();\napp.listen({ port: 8080 });',
      'src/controllers/paymentController.ts': 'export class PaymentController { async handleCharge(req, reply) {} }',
      'src/controllers/walletController.ts': 'export class WalletController {}',
      'src/services/paymentService.ts': 'export class PaymentService { async processPayment(cmd) {} }',
      'src/services/fraudDetectionService.ts': 'export class FraudDetectionService {}',
      'src/repositories/paymentRepository.ts': 'import { prisma } from "../lib/prisma";\nexport class PaymentRepository {}',
      'src/repositories/walletRepository.ts': 'export class WalletRepository {}',
      'src/domain/paymentEntity.ts': 'export interface PaymentEntity { id: string; amount: number; }',
      'src/lib/redis.ts': 'import Redis from "ioredis";\nexport const redis = new Redis();',
      'src/lib/prisma.ts': 'import { PrismaClient } from "@prisma/client";\nexport const prisma = new PrismaClient();',
      'docker-compose.yml': 'version: "3.8"\nservices:\n  db:\n    image: postgres:16\n  cache:\n    image: redis:7',
      'CLAUDE.md': `# KitePay Core Architecture Guidelines
- Strict Hexagonal Architecture: Controllers MUST NOT call Repositories directly; they invoke Application Services.
- Idempotency keys are mandatory for all POST endpoints.
- Database queries must execute within managed Prisma transactions.`,
      'mcp.json': JSON.stringify({
        mcpServers: {
          'redis-inspector': { command: 'npx', args: ['-y', 'redis-mcp'], description: 'Inspect cache keys and session states' }
        }
      }, null, 2),
      '.env.example': `PORT=8080
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kitepay"
REDIS_URL="redis://localhost:6379"
PAYMENT_GATEWAY_TOKEN="live_sec_..."`
    }
  }
];

export function getPresetFileSystem(presetId: string): MemoryFileSystemAdapter {
  const preset = SAMPLE_PROJECTS.find(p => p.id === presetId) || SAMPLE_PROJECTS[0];
  return new MemoryFileSystemAdapter(preset.files);
}

import React, { useState } from 'react';
import {
  BookOpen,
  Car,
  Utensils,
  Lightbulb,
  Cpu,
  Layers,
  Database,
  Palette,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Zap,
  Box,
  Bot
} from 'lucide-react';
import { animate, spring, stagger } from 'animejs';
import { useAnimeScope } from '../hooks/useAnimeScope';
import { ProjectAnalysisResult } from '../../engine/types';

interface SimpleConceptsExplainerProps {
  data: ProjectAnalysisResult;
}

type AnalogyMode = 'restaurant' | 'plain' | 'racing';

export const SimpleConceptsExplainer: React.FC<SimpleConceptsExplainerProps> = ({ data }) => {
  const [analogyMode, setAnalogyMode] = useState<AnalogyMode>('restaurant');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { architecture, primaryFramework, primaryRuntime, stylingEngine, stateLayer, aiConfig } = data;

  const { root } = useAnimeScope(() => {
    // 1. Staggered card entrance
    animate('.concept-card', {
      opacity: [0, 1],
      translateY: [16, 0],
      scale: [0.97, 1],
      duration: 450,
      delay: stagger(35),
      ease: spring({ bounce: 0.35 })
    });

    // 2. FAQ rows
    animate('.faq-card', {
      opacity: [0, 1],
      translateX: [-8, 0],
      duration: 350,
      delay: stagger(25, { start: 150 }),
      ease: 'out(3)'
    });
  }, [analogyMode, data.projectName]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div ref={root} className="p-4 lg:p-8 space-y-8 max-w-[1780px] mx-auto">
      {/* Hero Explainer Header */}
      <div className="rb-widget p-6 lg:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                  PLAIN ENGLISH GUIDE
                </span>
                <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
                  How This Project Works — Explained Simply
                </h2>
              </div>
            </div>
            <p className="text-xs lg:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Software engineering can feel full of confusing buzzwords. Here is what every part of this codebase
              actually does, translated into clear, everyday language with relatable real-world analogies.
            </p>
          </div>

          {/* Analogy Style Switcher */}
          <div className="flex flex-col gap-1.5 self-stretch md:self-auto bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shrink-0">
            <span className="text-[10px] font-mono text-slate-400 font-bold px-2">CHOOSE EXPLANATION STYLE:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setAnalogyMode('restaurant')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  analogyMode === 'restaurant'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-300 hover:text-white bg-white/[0.04]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                <span>Restaurant 🍽️</span>
              </button>

              <button
                onClick={() => setAnalogyMode('plain')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  analogyMode === 'plain'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-300 hover:text-white bg-white/[0.04]'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Plain English 💡</span>
              </button>

              <button
                onClick={() => setAnalogyMode('racing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  analogyMode === 'racing'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-300 hover:text-white bg-white/[0.04]'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>Formula 1 🏎️</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Concept 1: Architecture Pattern */}
      <div className="concept-card rb-widget p-6 lg:p-7 rounded-3xl space-y-4">
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                CONCEPT 1: ARCHITECTURE PATTERN
              </span>
              <h3 className="text-base font-bold text-white font-sans">
                What is an "Architecture Pattern"?
              </h3>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
            DETECTED: {architecture.pattern}
          </span>
        </div>

        {/* Dynamic Explanation based on Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="bg-[#090f1d] p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="text-indigo-400 font-mono font-bold flex items-center gap-1.5 uppercase text-[11px]">
              <HelpCircle className="w-3.5 h-3.5" />
              In Simple Everyday Words:
            </span>
            <p className="text-slate-200">
              Architecture is simply the <strong>overall floor plan of a building</strong>. It decides which room
              is the kitchen, where the plumbing runs, and makes sure the walls don't collapse when lots of people visit.
            </p>
            <p className="text-slate-400">
              Without architecture, everyone would dump their clothes, cooking pans, and tools into one giant pile in the hallway.
            </p>
          </div>

          <div className="bg-[#0e172a] p-4 rounded-2xl border border-indigo-500/25 space-y-2">
            <span className="text-indigo-300 font-mono font-bold flex items-center gap-1.5 uppercase text-[11px]">
              {analogyMode === 'racing' && <Car className="w-3.5 h-3.5" />}
              {analogyMode === 'restaurant' && <Utensils className="w-3.5 h-3.5" />}
              {analogyMode === 'plain' && <Lightbulb className="w-3.5 h-3.5" />}
              {analogyMode === 'racing' ? 'The Racecar Analogy:' : analogyMode === 'restaurant' ? 'The Restaurant Analogy:' : 'The Core Rule:'}
            </span>
            {analogyMode === 'racing' && (
              <p className="text-slate-200">
                It's like designing the <strong>carbon-fiber chassis of a racecar</strong>. The engine sits in the back,
                the driver sits in the cockpit, and aerodynamics route cooling air over the sidepods. Everything has an exact place
                so the vehicle operates reliably under high load.
              </p>
            )}
            {analogyMode === 'restaurant' && (
              <p className="text-slate-200">
                It's the separation between the <strong>Dining Room (where customers sit)</strong>, the <strong>Waiter (who carries orders)</strong>,
                and the <strong>Kitchen (where the chef cooks)</strong>. Customers never enter the kitchen directly, preventing chaos and accidents.
              </p>
            )}
            {analogyMode === 'plain' && (
              <p className="text-slate-200">
                In this project (<strong>{architecture.pattern}</strong>), code is divided into separate, specialized files:
                pages display buttons, routers direct traffic, and backend functions safely talk to the database.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Concept 2: The Tech Stack */}
      <div className="concept-card rb-widget p-6 lg:p-7 rounded-3xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
            <Box className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
              CONCEPT 2: THE TECH STACK
            </span>
            <h3 className="text-base font-bold text-white font-sans">
              What are Frameworks, Runtimes, State, and Styling?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Framework */}
          <div className="p-4 rounded-2xl bg-[#090f1d] border border-slate-800/80 space-y-2 group hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">1. Framework</span>
              <Cpu className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-white font-bold text-sm">{primaryFramework}</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong>{analogyMode === 'racing' ? 'The Engine Block' : analogyMode === 'restaurant' ? 'The Head Chef' : 'The Main Platform'}:</strong>{' '}
              The core platform that renders your web pages, provides building blocks, and manages how the app starts.
            </p>
          </div>

          {/* Runtime */}
          <div className="p-4 rounded-2xl bg-[#090f1d] border border-slate-800/80 space-y-2 group hover:border-sky-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400">2. Runtime</span>
              <Zap className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-white font-bold text-sm">{primaryRuntime}</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong>{analogyMode === 'racing' ? 'The Fuel & Ignition' : analogyMode === 'restaurant' ? 'The Stove & Electricity' : 'The Execution Environment'}:</strong>{' '}
              The environment that executes your code on a computer or server so it can run.
            </p>
          </div>

          {/* State Layer */}
          <div className="p-4 rounded-2xl bg-[#090f1d] border border-slate-800/80 space-y-2 group hover:border-purple-400/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">3. State Management</span>
              <Database className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-white font-bold text-sm">{stateLayer}</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong>{analogyMode === 'racing' ? "Driver's Short-Term Memory" : analogyMode === 'restaurant' ? "Waiter's Notepad" : 'Live Session Memory'}:</strong>{' '}
              Remembers what screen you are on, items inside your shopping cart, and whether you are logged in right now.
            </p>
          </div>

          {/* Styling */}
          <div className="p-4 rounded-2xl bg-[#090f1d] border border-slate-800/80 space-y-2 group hover:border-emerald-400/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">4. Styling System</span>
              <Palette className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-white font-bold text-sm">{stylingEngine}</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong>{analogyMode === 'racing' ? 'Bodywork & Livery' : analogyMode === 'restaurant' ? 'Interior Decor & Lighting' : 'Visual Design & Layout'}:</strong>{' '}
              Governs colors, rounded corners, spacing, fonts, and responsive layouts across phones and computers.
            </p>
          </div>
        </div>
      </div>

      {/* Concept 3: Data Flow (Step-by-Step) */}
      <div className="concept-card rb-widget p-6 lg:p-7 rounded-3xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <ArrowRight className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
              CONCEPT 3: DATA FLOW
            </span>
            <h3 className="text-base font-bold text-white font-sans">
              What Happens When a User Clicks Something?
            </h3>
          </div>
        </div>

        <div className="p-4 bg-[#090f1d] rounded-2xl border border-slate-800/80 space-y-3">
          <div className="text-xs font-mono font-bold text-indigo-300">
            The Journey of a Single Click:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="bg-[#0e172a] p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-indigo-400 block">STEP 1</span>
              <div className="font-bold text-white">User Interaction</div>
              <p className="text-[11px] text-slate-300">You click "Buy Now" or press Enter in a search box.</p>
            </div>

            <div className="bg-[#0e172a] p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-sky-400 block">STEP 2</span>
              <div className="font-bold text-white">Frontend UI Component</div>
              <p className="text-[11px] text-slate-300">The button triggers an event and validates the input.</p>
            </div>

            <div className="bg-[#0e172a] p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-teal-400 block">STEP 3</span>
              <div className="font-bold text-white">Server / API Route</div>
              <p className="text-[11px] text-slate-300">Sends a secure message to the server to check permissions.</p>
            </div>

            <div className="bg-[#0e172a] p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-purple-400 block">STEP 4</span>
              <div className="font-bold text-white">Database Warehouse</div>
              <p className="text-[11px] text-slate-300">The database saves your order or retrieves search results.</p>
            </div>

            <div className="bg-[#0e172a] p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 block">STEP 5</span>
              <div className="font-bold text-white">Screen Updates</div>
              <p className="text-[11px] text-slate-300">A green confirmation banner displays on your screen.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Concept 4: AI Assistants & MCP */}
      <div className="concept-card rb-widget p-6 lg:p-7 rounded-3xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
              CONCEPT 4: AI WORKSPACE & MCP SERVERS
            </span>
            <h3 className="text-base font-bold text-white font-sans">
              How Do AI Coding Assistants Know What To Do?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Rules */}
          <div className="bg-[#090f1d] p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="text-indigo-400 font-mono font-bold flex items-center gap-1.5 uppercase text-[11px]">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Rules (`.cursorrules` & `CLAUDE.md`)
            </span>
            <p className="text-slate-200">
              Think of these as the <strong>Rulebook & Guardrails</strong> given to an AI.
            </p>
            <p className="text-slate-400">
              They tell the AI: "Always use Tailwind CSS", "Never delete the database folder", or "Follow Clean Architecture conventions".
              Without rules, an AI might rewrite your code in an incompatible language or structure.
            </p>
          </div>

          {/* MCP */}
          <div className="bg-[#090f1d] p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="text-sky-400 font-mono font-bold flex items-center gap-1.5 uppercase text-[11px]">
              <Zap className="w-4 h-4 text-sky-400" />
              MCP (Model Context Protocol)
            </span>
            <p className="text-slate-200">
              Think of MCP as a <strong>Swiss Army Toolbelt for the AI</strong>.
            </p>
            <p className="text-slate-400">
              Normally, an AI can only generate text. An MCP server gives it tools to test code, inspect database schemas,
              fetch documentation, or run scripts directly inside your workspace.
            </p>
          </div>

          {/* Readiness */}
          <div className="bg-[#090f1d] p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5 uppercase text-[11px]">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              AI Readiness Score ({aiConfig.readinessScore}%)
            </span>
            <p className="text-slate-200">
              Think of this as a <strong>Safety & Quality Check</strong>.
            </p>
            <p className="text-slate-400">
              It evaluates how well-prepared the codebase is for AI pair programming. If rules, environment keys, and tool servers
              are all verified, the score is high (80%+), meaning the assistant can reliably build features without confusion.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions in Plain English */}
      <div className="rb-widget p-6 lg:p-7 rounded-3xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
              QUICK ANSWERS
            </span>
            <h3 className="text-base font-bold text-white font-sans">
              Frequently Asked Questions (No Jargon)
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Why can’t developers just put all their code in one single file?',
              a: 'Imagine putting your bed, shower, cooking stove, and garage tools all inside one 10x10 room. If a small grease fire starts on the stove, your bed burns down. In software, separating code into different folders prevents one small bug from breaking the entire application.'
            },
            {
              q: 'What is a "dependency"?',
              a: 'When building a car, you don’t build the tires, spark plugs, and windshield wipers from raw chemicals yourself—you buy tested parts from specialized manufacturers (like Michelin or Bosch). In software, dependencies are pre-built, tested packages you import so you don’t have to reinvent the wheel.'
            },
            {
              q: 'What does "Confidence Match: 98%" mean in the top bar?',
              a: 'Our ProjectLens scanner inspected every folder and config file in your workspace. It is 98% confident that your project strictly follows the industry standard conventions for this architecture pattern, making it clean, maintainable, and predictable.'
            },
            {
              q: 'What is a "Single Page App (SPA)" vs a "Fullstack Monolith"?',
              a: 'A Single Page App is like a mobile app: it loads once in your browser and smoothly swaps screens without reloading the whole web page. A Monolith is a complete house where both the website you see and the backend server live in the exact same codebase.'
            }
          ].map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="faq-card bg-[#090f1d] rounded-2xl border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors text-xs font-semibold text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>{item.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 bg-slate-900/60 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Cpu,
  Boxes,
  Palette,
  Layers,
  ArrowRight,
  Database,
  ShieldCheck,
  GitBranch,
  ChevronDown,
  ChevronUp,
  FileCode,
  Sparkles
} from 'lucide-react';
import { animate, spring, stagger } from 'animejs';
import { useAnimeScope } from '../hooks/useAnimeScope';
import { ProjectAnalysisResult } from '../../engine/types';

interface OverviewBarProps {
  data: ProjectAnalysisResult;
}

export const OverviewBar: React.FC<OverviewBarProps> = ({ data }) => {
  const {
    projectName,
    primaryFramework,
    primaryRuntime,
    stylingEngine,
    stateLayer,
    aiLayer,
    architecture,
    manifestsFound,
    dependencies,
    aiConfig
  } = data;

  const primaryLanguage = dependencies.some(
    (d) => d.name.toLowerCase() === 'typescript' || d.name.includes('@types/')
  )
    ? 'TypeScript'
    : 'JavaScript';

  const flowSteps = architecture.dataFlowSummary.split('->').map((s) => s.trim());
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayConfidence, setDisplayConfidence] = useState(0);

  const { root } = useAnimeScope(() => {
    // 1. Confidence counter
    const confObj = { val: 0 };
    animate(confObj, {
      val: architecture.confidence,
      duration: 800,
      ease: 'out(3)',
      round: 1,
      onUpdate: () => setDisplayConfidence(confObj.val)
    });

    // 2. Chip entrance
    animate('.dna-chip', {
      opacity: [0, 1],
      translateY: [-6, 0],
      duration: 350,
      delay: stagger(25),
      ease: 'out(3)'
    });

    // 3. Expand drawer
    if (isExpanded) {
      animate('.expand-drawer', {
        opacity: [0, 1],
        translateY: [-8, 0],
        duration: 350,
        ease: spring({ bounce: 0.2 })
      });
    }
  }, [data.projectName, isExpanded, architecture.confidence]);

  return (
    <div ref={root} className="border-b border-white/[0.08] bg-[#070c18] px-4 lg:px-8 py-3.5 relative transition-all">
      <div className="max-w-[1780px] mx-auto space-y-3">
        {/* Main Line: Project Title, Architecture Badge, Tech DNA, and Details Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Project & Architecture */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm lg:text-base font-extrabold text-white tracking-tight">
                {projectName}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-sm">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>{architecture.pattern}</span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{displayConfidence}% Match</span>
            </div>
          </div>

          {/* Center: Tech DNA Chips (What is it made of?) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {/* Language */}
            <div className="dna-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0e1626] border border-white/[0.08] text-slate-200">
              <FileCode className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-400 text-[10px]">Lang:</span>
              <span className="font-bold text-white font-mono text-[11px]">{primaryLanguage || 'TypeScript'}</span>
            </div>

            {/* Framework */}
            <div className="dna-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0e1626] border border-white/[0.08] text-slate-200">
              <Boxes className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400 text-[10px]">Framework:</span>
              <span className="font-bold text-white font-mono text-[11px]">{primaryFramework}</span>
            </div>

            {/* Runtime */}
            <div className="dna-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0e1626] border border-white/[0.08] text-slate-200">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400 text-[10px]">Runtime:</span>
              <span className="font-bold text-white font-mono text-[11px]">{primaryRuntime}</span>
            </div>

            {/* State */}
            <div className="dna-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0e1626] border border-white/[0.08] text-slate-200">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-400 text-[10px]">State:</span>
              <span className="font-bold text-white font-mono text-[11px]">{stateLayer}</span>
            </div>

            {/* Styling */}
            <div className="dna-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0e1626] border border-white/[0.08] text-slate-200">
              <Palette className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-400 text-[10px]">Styling:</span>
              <span className="font-bold text-white font-mono text-[11px]">{stylingEngine}</span>
            </div>

            {/* AI */}
            {aiLayer && aiLayer !== 'None Configured' && (
              <div className="dna-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-bold font-mono text-[11px]">{aiLayer}</span>
              </div>
            )}
          </div>

          {/* Right: Quick Stats & Details Toggle */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-mono text-slate-400 bg-[#0e1626] px-2.5 py-1 rounded-lg border border-white/[0.08]">
              <strong className="text-white">{dependencies.length}</strong> packages
            </span>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg border transition-all ${
                isExpanded
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-[#0e1626] hover:bg-[#141f36] text-slate-300 hover:text-white border-white/[0.08]'
              }`}
            >
              <span>{isExpanded ? 'Hide Architecture Flow' : 'Architecture Flow'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Architecture Flow & Data Journey Drawer */}
        {isExpanded && (
          <div className="expand-drawer grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-white/[0.08]">
            {/* System Overview & Data Flow */}
            <div className="lg:col-span-8 p-4 rounded-2xl bg-[#0b1220] border border-white/[0.08] space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block mb-1">
                  HOW THIS ARCHITECTURE WORKS
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {architecture.summary}
                </p>
              </div>

              {/* Data Flow Pipeline */}
              <div className="space-y-2 pt-2.5 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                    Request & Data Flow Journey
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Step-by-step Execution</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-1">
                  {flowSteps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070c18] border border-white/[0.08] text-[11px] font-mono text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span className="text-indigo-300 font-bold">Step {idx + 1}:</span>
                        <span>{step}</span>
                      </div>
                      {idx < flowSteps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Entry Points & Manifests */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-[#0b1220] border border-white/[0.08] space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  PROJECT ENTRY & CONFIGS
                </span>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-400">Entry:</span>
                    <strong className="text-white">{architecture.entryPoints[0] || 'src/main.tsx'}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span className="text-slate-400">Manifests:</span>
                    <span className="text-slate-200">{manifestsFound.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span className="text-slate-400">AI Readiness:</span>
                    <strong className="text-indigo-300">{aiConfig.readinessScore}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OverviewBar;

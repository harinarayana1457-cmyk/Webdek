import React, { useState } from 'react';
import {
  Cpu,
  Boxes,
  Palette,
  Layers,
  ArrowRight,
  Database,
  ShieldCheck,
  Zap,
  GitBranch,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { animate, spring, stagger } from 'animejs';
import { useAnimeScope } from '../hooks/useAnimeScope';
import { ProjectAnalysisResult } from '../../engine/types';

interface OverviewBarProps {
  data: ProjectAnalysisResult;
}

export const OverviewBar: React.FC<OverviewBarProps> = ({ data }) => {
  const {
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

  const flowSteps = architecture.dataFlowSummary.split('->').map((s) => s.trim());
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [displayConfidence, setDisplayConfidence] = useState(0);

  const { root } = useAnimeScope(() => {
    // 1. Telemetry numerical counters
    const scoreObj = { val: 0 };
    animate(scoreObj, {
      val: aiConfig.readinessScore,
      duration: 1000,
      ease: 'out(3)',
      round: 1,
      onUpdate: () => setDisplayScore(scoreObj.val)
    });

    const confObj = { val: 0 };
    animate(confObj, {
      val: architecture.confidence,
      duration: 900,
      ease: 'out(3)',
      round: 1,
      onUpdate: () => setDisplayConfidence(confObj.val)
    });

    // 2. Power capsules staggered entrance
    animate('.power-capsule', {
      opacity: [0, 1],
      translateY: [-6, 0],
      duration: 400,
      delay: stagger(30),
      ease: 'out(3)'
    });

    // 3. Dial stroke animation when expanded
    if (isExpanded) {
      const circumference = 2 * Math.PI * 26;
      const targetOffset = circumference - (aiConfig.readinessScore / 100) * circumference;
      animate('.dial-ring', {
        strokeDashoffset: [circumference, targetOffset],
        duration: 800,
        ease: 'out(4)'
      });

      animate('.expand-drawer', {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 400,
        ease: spring({ bounce: 0.25 })
      });
    }
  }, [data.projectName, isExpanded, aiConfig.readinessScore, architecture.confidence]);

  return (
    <div ref={root} className="border-b border-white/[0.08] bg-[#051329] px-4 lg:px-8 py-3 relative transition-all">
      <div className="max-w-[1780px] mx-auto space-y-3">
        {/* Compact Summary Bar: Single Clean Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Architecture Pattern Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#e00034] to-[#c7002e] text-white shadow-rb-red shadow-sm">
              <Layers className="w-4 h-4 text-[#ffd100]" />
              <span className="text-xs font-black tracking-wide font-sans">{architecture.pattern}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{displayConfidence}% Match</span>
            </div>

            <span className="hidden xl:inline text-xs text-slate-300 truncate max-w-md font-medium">
              {architecture.summary}
            </span>
          </div>

          {/* Center: Key Tech Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="power-capsule flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#081a38] border border-white/[0.08] text-xs text-slate-200">
              <Boxes className="w-3.5 h-3.5 text-[#ffd100]" />
              <span className="text-slate-400 text-[10px]">Framework:</span>
              <span className="font-bold text-white font-mono">{primaryFramework}</span>
            </div>

            <div className="power-capsule flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#081a38] border border-white/[0.08] text-xs text-slate-200">
              <Cpu className="w-3.5 h-3.5 text-[#00a3ff]" />
              <span className="text-slate-400 text-[10px]">Runtime:</span>
              <span className="font-bold text-white font-mono">{primaryRuntime}</span>
            </div>

            <div className="power-capsule flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#081a38] border border-white/[0.08] text-xs text-slate-200">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-400 text-[10px]">State:</span>
              <span className="font-bold text-white font-mono">{stateLayer}</span>
            </div>

            <div className="power-capsule flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#081a38] border border-white/[0.08] text-xs text-slate-200">
              <Palette className="w-3.5 h-3.5 text-[#e00034]" />
              <span className="text-slate-400 text-[10px]">Styling:</span>
              <span className="font-bold text-white font-mono">{stylingEngine}</span>
            </div>

            <div className="power-capsule flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#081a38] border border-white/[0.08] text-xs text-slate-200">
              <Flame className="w-3.5 h-3.5 text-[#ffd100]" />
              <span className="text-slate-400 text-[10px]">AI:</span>
              <span className="font-bold text-[#ffd100] font-mono">{aiLayer}</span>
            </div>
          </div>

          {/* Right: Expand Details Toggle & Quick Counts */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-[#081a38] px-2.5 py-1 rounded-lg border border-white/[0.08]">
              <Zap className="w-3.5 h-3.5 text-[#ffd100]" />
              <span>{dependencies.length} Packages</span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all ${
                isExpanded
                  ? 'bg-[#e00034] text-white border-[#e00034] shadow-rb-red'
                  : 'bg-[#092247] hover:bg-[#0c2a57] text-[#ffd100] border-[#ffd100]/30 hover:border-[#ffd100]'
              }`}
            >
              <span>{isExpanded ? 'Hide Architecture Details' : 'Architecture Details'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Architecture Details Drawer */}
        {isExpanded && (
          <div className="expand-drawer grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-white/[0.08]">
            {/* Full Summary & Data Flow Pipeline */}
            <div className="lg:col-span-8 p-5 rounded-2xl bg-[#061630] border border-white/[0.08] space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffd100] font-bold block mb-1">
                  SYSTEM ARCHITECTURE OVERVIEW
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {architecture.summary}
                </p>
              </div>

              {/* Data Flow Pipeline */}
              <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-[#ffd100]" />
                    Data Flow Sequence
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Step-by-step Execution</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-1">
                  {flowSteps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#040e1f] border border-white/[0.08] text-[11px] font-mono text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e00034]" />
                        <span className="text-[#ffd100] font-bold">Step {idx + 1}:</span>
                        <span>{step}</span>
                      </div>
                      {idx < flowSteps.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Readiness & Startup Lifecycle */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-[#061630] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffd100] font-bold block">
                    AI AGENT READINESS
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5">Rules, MCP & Environment</h4>
                </div>

                {/* Dial */}
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="19"
                      className="text-white/[0.08]"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="19"
                      stroke={aiConfig.readinessScore >= 80 ? '#e00034' : '#ffd100'}
                      strokeWidth="4"
                      strokeDasharray={2 * Math.PI * 19}
                      strokeDashoffset={2 * Math.PI * 19 * (1 - displayScore / 100)}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-mono font-black text-white">
                    {displayScore}%
                  </span>
                </div>
              </div>

              {/* Startup Lifecycle */}
              <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Startup Lifecycle:
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Entry point: <strong className="text-white font-mono">src/main.tsx</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Verified manifests: <strong className="text-white font-mono">{manifestsFound.join(', ')}</strong></span>
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

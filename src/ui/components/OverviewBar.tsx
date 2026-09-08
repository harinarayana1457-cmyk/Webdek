import React from 'react';
import {
  Cpu,
  Boxes,
  Palette,
  Sparkles,
  Layers,
  ArrowRight,
  Database,
  FileCode2,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
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

  return (
    <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#090e1e] to-[#070b16] px-4 lg:px-6 py-4">
      <div className="max-w-[1700px] mx-auto space-y-4">
        {/* Top Tech Stack Pills Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Framework Pill */}
            <div className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/40 text-xs font-medium text-sky-300 transition-all shadow-sm">
              <Boxes className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 font-normal">Framework:</span>
              <span className="font-semibold text-white tracking-tight">{primaryFramework}</span>
            </div>

            {/* Runtime Pill */}
            <div className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 text-xs font-medium text-emerald-300 transition-all shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 font-normal">Runtime:</span>
              <span className="font-semibold text-white tracking-tight">{primaryRuntime}</span>
            </div>

            {/* Styling Pill */}
            <div className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 text-xs font-medium text-purple-300 transition-all shadow-sm">
              <Palette className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 font-normal">Styling:</span>
              <span className="font-semibold text-white tracking-tight">{stylingEngine}</span>
            </div>

            {/* State Layer Pill */}
            <div className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 text-xs font-medium text-amber-300 transition-all shadow-sm">
              <Database className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 font-normal">State:</span>
              <span className="font-semibold text-white tracking-tight">{stateLayer}</span>
            </div>

            {/* AI Layer Pill */}
            <div className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 text-xs font-medium text-rose-300 transition-all shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 font-normal">AI Layer:</span>
              <span className="font-semibold text-white tracking-tight">{aiLayer}</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
              <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">{manifestsFound.length} Configs</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-white font-semibold">{dependencies.length}</span>
              <span className="text-slate-400">Libraries</span>
            </div>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-bold ${
                aiConfig.readinessScore >= 80
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>AI Readiness: {aiConfig.readinessScore}%</span>
            </div>
          </div>
        </div>

        {/* Hero Architectural Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Pattern Description */}
          <div className="lg:col-span-8 p-4 rounded-xl bg-[#0e1628]/90 border border-white/[0.08] shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-40 bg-sky-500/5 blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-sky-400" />
                  </div>
                  <h2 className="text-base font-bold text-white tracking-tight">{architecture.pattern}</h2>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                    {architecture.confidence}% Pattern Match
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Deterministic AST Classifier</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">{architecture.summary}</p>
            </div>

            {/* Interactive Data Flow Pipeline Chips */}
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                Active Architecture Pipeline
              </span>
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
                {flowSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#070b16] border border-white/[0.08] text-[11px] font-mono text-sky-300 shadow-sm whitespace-nowrap hover:border-sky-500/40 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
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

          {/* Execution Lifecycle Timeline */}
          <div className="lg:col-span-4 p-4 rounded-xl bg-[#0e1628]/90 border border-white/[0.08] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Execution Lifecycle
                </span>
                <span className="text-[10px] font-mono text-slate-400">Entry to Hydration</span>
              </div>

              <div className="space-y-2">
                {architecture.lifecycleSequence.slice(0, 4).map((phase, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="text-[11px] font-mono font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-500/20 shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300 text-[11px] leading-snug">
                      {phase.replace(/^\d+\.\s*/, '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {architecture.entryPoints.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Entry Points:</span>
                <span className="text-sky-300 truncate max-w-[200px]">
                  {architecture.entryPoints.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

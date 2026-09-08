import React from 'react';
import {
  Cpu,
  Boxes,
  Palette,
  Sparkles,
  Layers,
  Activity,
  ArrowRight,
  Database,
  FileCode2
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

  return (
    <div className="bg-[#0e1526] border-b border-slate-800/80 px-4 py-3 text-slate-200">
      {/* Top Stack Badges Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/50">
        <div className="flex flex-wrap items-center gap-2">
          {/* Framework Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 font-medium">
            <Boxes className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-400">Framework:</span>
            <span className="font-semibold text-white">{primaryFramework}</span>
          </div>

          {/* Runtime Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Runtime:</span>
            <span className="font-semibold text-white">{primaryRuntime}</span>
          </div>

          {/* Styling Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-medium">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Styling:</span>
            <span className="font-semibold text-white">{stylingEngine}</span>
          </div>

          {/* State Layer */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-medium">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">State:</span>
            <span className="font-semibold text-white">{stateLayer}</span>
          </div>

          {/* AI Layer */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-400">AI:</span>
            <span className="font-semibold text-white">{aiLayer}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1">
            <FileCode2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{manifestsFound.length} configs</span>
          </div>
          <div>
            <span className="text-sky-400 font-semibold">{dependencies.length}</span> libs
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">AI Alignment:</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                aiConfig.readinessScore >= 80
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {aiConfig.readinessScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Architecture Pattern Summary Card */}
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        <div className="lg:col-span-8 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <span className="font-semibold text-sm text-white">{architecture.pattern}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-medium">
                  {architecture.confidence}% Pattern Match
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Deterministic AST Heuristics</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{architecture.summary}</p>
          </div>

          {/* Data Flow summary line */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center gap-2 text-xs overflow-x-auto">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-mono flex items-center gap-1 shrink-0">
              <ArrowRight className="w-3 h-3 text-sky-400" />
              Data Flow:
            </span>
            <span className="font-mono text-sky-300/90 text-[11px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/60 truncate">
              {architecture.dataFlowSummary}
            </span>
          </div>
        </div>

        {/* Lifecycle Sequence */}
        <div className="lg:col-span-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Execution Lifecycle
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Entry to Hydration</span>
          </div>
          <div className="space-y-1">
            {architecture.lifecycleSequence.slice(0, 3).map((step, idx) => (
              <div key={idx} className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                <span className="text-sky-400 font-mono text-[10px]">{idx + 1}.</span>
                <span className="truncate">{step.replace(/^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>
          {architecture.lifecycleSequence.length > 3 && (
            <div className="text-[10px] text-slate-500 mt-1 font-mono">
              + {architecture.lifecycleSequence.length - 3} more lifecycle phases
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
  GitBranch,
  Radio
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
    <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#050917]/90 via-[#040713]/95 to-[#030712] px-4 lg:px-8 py-5">
      <div className="max-w-[1780px] mx-auto space-y-4">
        {/* Top Tech Stack Capsules */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            {/* Framework */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/30 border border-cyan-500/25 text-xs text-cyan-300 font-medium shadow-sm hover:border-cyan-400/50 transition-colors">
              <Boxes className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400 text-[11px] font-sans">Framework:</span>
              <span className="font-bold text-white tracking-tight font-mono">{primaryFramework}</span>
            </div>

            {/* Runtime */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-xs text-emerald-300 font-medium shadow-sm hover:border-emerald-400/50 transition-colors">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400 text-[11px] font-sans">Runtime:</span>
              <span className="font-bold text-white tracking-tight font-mono">{primaryRuntime}</span>
            </div>

            {/* Styling */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/30 border border-purple-500/25 text-xs text-purple-300 font-medium shadow-sm hover:border-purple-400/50 transition-colors">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-400 text-[11px] font-sans">Styling:</span>
              <span className="font-bold text-white tracking-tight font-mono">{stylingEngine}</span>
            </div>

            {/* State Management */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/30 border border-amber-500/25 text-xs text-amber-300 font-medium shadow-sm hover:border-amber-400/50 transition-colors">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400 text-[11px] font-sans">State:</span>
              <span className="font-bold text-white tracking-tight font-mono">{stateLayer}</span>
            </div>

            {/* AI Layer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-950/30 border border-rose-500/25 text-xs text-rose-300 font-medium shadow-sm hover:border-rose-400/50 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-400 text-[11px] font-sans">AI Layer:</span>
              <span className="font-bold text-white tracking-tight font-mono">{aiLayer}</span>
            </div>
          </div>

          {/* Micro HUD Metrics */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 bg-[#091124] px-3 py-1.5 rounded-xl border border-white/[0.08]">
              <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{manifestsFound.length} Configs Scanned</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#091124] px-3 py-1.5 rounded-xl border border-white/[0.08]">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-white font-bold">{dependencies.length}</span>
              <span>Dependencies</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#091124] px-3 py-1.5 rounded-xl border border-white/[0.08]">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Parser Synchronized</span>
            </div>
          </div>
        </div>

        {/* Bento Hero Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Architecture Card */}
          <div className="lg:col-span-8 p-5 rounded-2xl bg-gradient-to-br from-[#091126]/90 via-[#070d1e]/90 to-[#040814]/90 border border-white/[0.1] shadow-2xl relative overflow-hidden flex flex-col justify-between group">
            {/* Top right ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-500" />

            <div>
              {/* Pattern Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center shadow-glow-cyan">
                    <Layers className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold block">
                      ARCHITECTURAL PATTERN SIGNATURE
                    </span>
                    <h2 className="text-lg font-black text-white tracking-tight font-sans">
                      {architecture.pattern}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    {architecture.confidence}% Confidence Match
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-4xl font-normal mt-1">
                {architecture.summary}
              </p>
            </div>

            {/* Pipeline Step Tracker */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                  <GitBranch className="w-3 h-3 text-cyan-400" />
                  Architectural Runtime Data Flow
                </span>
                <span className="text-[10px] font-mono text-slate-500">Unidirectional Reactive Stream</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
                {flowSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060b18] border border-white/[0.09] text-[11px] font-mono text-slate-200 shadow-inner hover:border-cyan-500/50 hover:text-cyan-300 transition-all cursor-default">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow-cyan" />
                      <span className="font-semibold">{step}</span>
                    </div>
                    {idx < flowSteps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-500/50 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* AI Readiness & Lifecycle Bento Card */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-[#0c142c]/90 via-[#080e22]/90 to-[#050918]/90 border border-white/[0.1] shadow-2xl flex flex-col justify-between">
            {/* Top Score Section */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                  AI AGENT READINESS HUD
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight mt-0.5">
                  Alignment & Context Index
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Cursor rules, MCP & instructions</p>
              </div>

              {/* Radial Gauge */}
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="text-white/[0.08]"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke={aiConfig.readinessScore >= 80 ? '#10b981' : aiConfig.readinessScore >= 50 ? '#00f0ff' : '#f43f5e'}
                    strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 - (aiConfig.readinessScore / 100) * (2 * Math.PI * 26)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute font-mono text-xs font-black text-white">
                  {aiConfig.readinessScore}%
                </span>
              </div>
            </div>

            {/* Lifecycle Stages */}
            <div className="my-3 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>Execution Phases</span>
                <span className="text-cyan-400">Deterministic Order</span>
              </div>

              {architecture.lifecycleSequence.slice(0, 3).map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20 shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="text-slate-300 text-[11px] leading-tight truncate">
                    {step.replace(/^\d+\.\s*/, '')}
                  </span>
                </div>
              ))}
            </div>

            {/* Entry Points Footer */}
            {architecture.entryPoints.length > 0 && (
              <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Boot Entry:</span>
                <span className="text-cyan-300 truncate max-w-[180px] bg-black/40 px-2 py-0.5 rounded border border-white/[0.06]">
                  {architecture.entryPoints[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

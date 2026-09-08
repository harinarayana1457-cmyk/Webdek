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
    <div className="border-b border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/50 px-4 lg:px-8 py-5">
      <div className="max-w-[1780px] mx-auto space-y-4">
        {/* Top Tech Stack Capsules */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {/* Framework */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50/90 border border-blue-200 text-xs text-blue-900 font-medium shadow-soft-sm hover:border-blue-400 transition-colors">
              <Boxes className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-slate-500 text-[11px] font-sans">Framework:</span>
              <span className="font-bold text-slate-900 tracking-tight font-mono">{primaryFramework}</span>
            </div>

            {/* Runtime */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-900 font-medium shadow-soft-sm hover:border-emerald-400 transition-colors">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-slate-500 text-[11px] font-sans">Runtime:</span>
              <span className="font-bold text-slate-900 tracking-tight font-mono">{primaryRuntime}</span>
            </div>

            {/* Styling */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50/90 border border-purple-200 text-xs text-purple-900 font-medium shadow-soft-sm hover:border-purple-400 transition-colors">
              <Palette className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-slate-500 text-[11px] font-sans">Styling:</span>
              <span className="font-bold text-slate-900 tracking-tight font-mono">{stylingEngine}</span>
            </div>

            {/* State Management */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 font-medium shadow-soft-sm hover:border-amber-400 transition-colors">
              <Database className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-slate-500 text-[11px] font-sans">State:</span>
              <span className="font-bold text-slate-900 tracking-tight font-mono">{stateLayer}</span>
            </div>

            {/* AI Layer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50/90 border border-rose-200 text-xs text-rose-900 font-medium shadow-soft-sm hover:border-rose-400 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-slate-500 text-[11px] font-sans">AI Layer:</span>
              <span className="font-bold text-slate-900 tracking-tight font-mono">{aiLayer}</span>
            </div>
          </div>

          {/* Micro HUD Metrics */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-soft-sm">
              <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{manifestsFound.length} Configs Scanned</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-soft-sm">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-slate-900 font-bold">{dependencies.length}</span>
              <span>Dependencies</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-soft-sm">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span className="text-emerald-700 font-semibold">Parser Synchronized</span>
            </div>
          </div>
        </div>

        {/* Bento Hero Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Architecture Card */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft-md relative overflow-hidden flex flex-col justify-between group">
            <div>
              {/* Pattern Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-sm">
                    <Layers className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-blue-600 font-bold block">
                      ARCHITECTURAL PATTERN SIGNATURE
                    </span>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight font-sans">
                      {architecture.pattern}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5 shadow-soft-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    {architecture.confidence}% Confidence Match
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-4xl font-normal mt-1">
                {architecture.summary}
              </p>
            </div>

            {/* Pipeline Step Tracker */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-blue-600" />
                  Architectural Runtime Data Flow
                </span>
                <span className="text-[10px] font-mono text-slate-400">Unidirectional Reactive Stream</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
                {flowSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-800 shadow-soft-sm hover:border-blue-400 hover:text-blue-700 transition-all cursor-default">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span className="font-semibold">{step}</span>
                    </div>
                    {idx < flowSteps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* AI Readiness & Lifecycle Bento Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft-md flex flex-col justify-between">
            {/* Top Score Section */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-600 font-bold block">
                  AI AGENT READINESS HUD
                </span>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-0.5">
                  Alignment & Context Index
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Cursor rules, MCP & instructions</p>
              </div>

              {/* Radial Gauge */}
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="text-slate-100"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke={aiConfig.readinessScore >= 80 ? '#059669' : aiConfig.readinessScore >= 50 ? '#2563eb' : '#e11d48'}
                    strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 - (aiConfig.readinessScore / 100) * (2 * Math.PI * 26)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute font-mono text-xs font-black text-slate-900">
                  {aiConfig.readinessScore}%
                </span>
              </div>
            </div>

            {/* Lifecycle Stages */}
            <div className="my-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                <span>Execution Phases</span>
                <span className="text-blue-600 font-medium">Deterministic Order</span>
              </div>

              {architecture.lifecycleSequence.slice(0, 3).map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="text-slate-700 text-[11px] leading-tight truncate">
                    {step.replace(/^\d+\.\s*/, '')}
                  </span>
                </div>
              ))}
            </div>

            {/* Entry Points Footer */}
            {architecture.entryPoints.length > 0 && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Boot Entry:</span>
                <span className="text-blue-700 font-semibold truncate max-w-[180px] bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
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

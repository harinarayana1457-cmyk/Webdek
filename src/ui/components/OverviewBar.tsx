import React from 'react';
import {
  Cpu,
  Boxes,
  Palette,
  Layers,
  ArrowRight,
  Database,
  FileCode2,
  ShieldCheck,
  Zap,
  GitBranch,
  Radio,
  Flame
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
    <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#051329] via-[#040f21] to-[#030b17] px-4 lg:px-8 py-5 relative">
      <div className="max-w-[1780px] mx-auto space-y-4">
        {/* Top Power-Unit Capsules */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Framework */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#091d3d] border border-white/[0.1] hover:border-[#ffd100] text-xs font-semibold text-white shadow-sm transition-all group">
              <Boxes className="w-4 h-4 text-[#ffd100] group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 text-[11px] font-sans">Framework:</span>
              <span className="font-extrabold text-white tracking-tight font-mono">{primaryFramework}</span>
            </div>

            {/* Runtime */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#091d3d] border border-white/[0.1] hover:border-[#ffd100] text-xs font-semibold text-white shadow-sm transition-all group">
              <Cpu className="w-4 h-4 text-[#00a3ff] group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 text-[11px] font-sans">Runtime:</span>
              <span className="font-extrabold text-white tracking-tight font-mono">{primaryRuntime}</span>
            </div>

            {/* Styling */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#091d3d] border border-white/[0.1] hover:border-[#ffd100] text-xs font-semibold text-white shadow-sm transition-all group">
              <Palette className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 text-[11px] font-sans">Styling:</span>
              <span className="font-extrabold text-white tracking-tight font-mono">{stylingEngine}</span>
            </div>

            {/* State Management */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#091d3d] border border-white/[0.1] hover:border-[#ffd100] text-xs font-semibold text-white shadow-sm transition-all group">
              <Database className="w-4 h-4 text-[#ffd100] group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 text-[11px] font-sans">State:</span>
              <span className="font-extrabold text-white tracking-tight font-mono">{stateLayer}</span>
            </div>

            {/* AI Layer */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#091d3d] border border-[#e00034]/40 hover:border-[#e00034] text-xs font-semibold text-white shadow-sm transition-all group">
              <Flame className="w-4 h-4 text-[#e00034] group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 text-[11px] font-sans">AI Layer:</span>
              <span className="font-extrabold text-[#ffd100] tracking-tight font-mono">{aiLayer}</span>
            </div>
          </div>

          {/* Telemetry Micro HUD */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-[#091d3d] px-3 py-1.5 rounded-xl border border-white/[0.08]">
              <FileCode2 className="w-3.5 h-3.5 text-[#ffd100]" />
              <span>{manifestsFound.length} Configs Verified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#091d3d] px-3 py-1.5 rounded-xl border border-white/[0.08]">
              <Zap className="w-3.5 h-3.5 text-[#e00034]" />
              <span className="text-white font-extrabold">{dependencies.length}</span>
              <span>Power Components</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#091d3d] px-3 py-1.5 rounded-xl border border-white/[0.08]">
              <Radio className="w-3 h-3 text-[#ffd100] animate-pulse" />
              <span className="text-[#ffd100] font-bold">Pit Wall Online</span>
            </div>
          </div>
        </div>

        {/* Bento Hero Telemetry Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Chassis Architecture Card */}
          <div className="lg:col-span-8 p-6 rounded-3xl rb-widget flex flex-col justify-between group overflow-hidden">
            {/* Background Red Bull sun glow */}
            <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-[#e00034]/15 via-[#ffd100]/10 to-transparent blur-3xl pointer-events-none" />

            <div>
              {/* Pattern Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#e00034] to-[#ffd100] p-[2px] shadow-rb-red">
                    <div className="w-full h-full bg-[#051329] rounded-[14px] flex items-center justify-center">
                      <Layers className="w-5 h-5 text-[#ffd100]" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#ffd100] font-extrabold block">
                      POWER UNIT & CHASSIS SPECIFICATION
                    </span>
                    <h2 className="text-xl font-black text-white tracking-tight font-sans italic">
                      {architecture.pattern}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rb-racing-badge text-xs font-mono font-black px-3.5 py-1 rounded bg-[#e00034] text-white shadow-rb-red flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{architecture.confidence}% TELEMETRY MATCH</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-4xl font-normal mt-1">
                {architecture.summary}
              </p>
            </div>

            {/* Circuit Telemetry Pipeline Track */}
            <div className="mt-6 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-[#ffd100]" />
                  Telemetry Flow Pipeline (Lap Sectors)
                </span>
                <span className="text-[10px] font-mono text-slate-400">High-Speed Execution Sequence</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-1">
                {flowSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#06142a] border border-white/[0.1] text-[11px] font-mono text-slate-200 shadow-inner hover:border-[#ffd100] hover:text-white transition-all cursor-default group/sector">
                      <span className="w-2 h-2 rounded-full bg-[#e00034] group-hover/sector:bg-[#ffd100] transition-colors shadow-rb-red" />
                      <span className="font-bold">Sector {idx + 1}:</span>
                      <span>{step}</span>
                    </div>
                    {idx < flowSteps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#ffd100]/60 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Pit Wall AI Speedometer Dial Widget */}
          <div className="lg:col-span-4 p-6 rounded-3xl rb-widget flex flex-col justify-between">
            {/* Speedometer Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#ffd100] font-black block">
                  PIT WALL AI HUD
                </span>
                <h3 className="text-sm font-extrabold text-white tracking-tight mt-0.5 italic">
                  Agent Telemetry & Alignment
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Rules, MCP telemetry & directives</p>
              </div>

              {/* Speedometer Dial */}
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
                    stroke={aiConfig.readinessScore >= 80 ? '#e00034' : '#ffd100'}
                    strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 - (aiConfig.readinessScore / 100) * (2 * Math.PI * 26)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out shadow-rb-red"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-mono text-xs font-black text-white">
                    {aiConfig.readinessScore}%
                  </span>
                  <span className="text-[8px] font-mono text-[#ffd100] uppercase font-bold">RPM</span>
                </div>
              </div>
            </div>

            {/* Circuit Phases */}
            <div className="my-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>Execution Checkpoints</span>
                <span className="text-[#ffd100] font-bold">Optimal Path</span>
              </div>

              {architecture.lifecycleSequence.slice(0, 3).map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <span className="text-[10px] font-mono font-extrabold text-white bg-[#e00034] px-1.5 py-0.2 rounded shrink-0 mt-0.5 shadow-sm">
                    P{idx + 1}
                  </span>
                  <span className="text-slate-300 text-[11px] leading-tight truncate">
                    {step.replace(/^\d+\.\s*/, '')}
                  </span>
                </div>
              ))}
            </div>

            {/* Paddock Boot Entry */}
            {architecture.entryPoints.length > 0 && (
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Paddock Entry:</span>
                <span className="text-[#ffd100] font-bold truncate max-w-[180px] bg-[#06142a] px-2.5 py-1 rounded-lg border border-white/[0.1]">
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

import React, { useState } from 'react';
import {
  Server,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Bot,
  Terminal,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { AIConfigInfo } from '../../engine/types';

interface AIContextInspectorProps {
  aiConfig: AIConfigInfo;
}

export const AIContextInspector: React.FC<AIContextInspectorProps> = ({ aiConfig }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeRuleTab, setActiveRuleTab] = useState<'cursor' | 'claude'>('cursor');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Top Pit Wall Hero Banner */}
      <div className="rb-widget p-6 lg:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        {/* Ambient Red Bull glow */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-gradient-to-r from-[#e00034]/20 via-[#ffd100]/15 to-transparent blur-3xl pointer-events-none" />

        <div className="space-y-2.5 z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#e00034] to-[#ffd100] p-[2px] shadow-rb-red">
              <div className="w-full h-full bg-[#051329] rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#ffd100]" />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ffd100] font-black block">
                F1 PIT WALL AUTONOMOUS AGENT CONSOLE
              </span>
              <h2 className="text-xl font-black text-white tracking-tight font-sans italic">
                Paddock AI Telemetry & Context Directives
              </h2>
            </div>
            <span
              className={`rb-racing-badge px-3.5 py-1 rounded text-xs font-mono font-black border shadow-rb-red ${
                aiConfig.readinessScore >= 80
                  ? 'bg-[#e00034] text-white border-[#ff003c]'
                  : 'bg-[#ffd100] text-black border-[#ffb800]'
              }`}
            >
              <span>{aiConfig.readinessScore}% RPM READINESS</span>
            </span>
          </div>

          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed font-medium">
            Evaluates how thoroughly this codebase equips autonomous agents (Antigravity, Cursor, Claude Code)
            with architectural constraints, Model Context Protocol (MCP) telemetry tools, and environment variables.
          </p>
        </div>

        {/* Readiness Metric Hub */}
        <div className="w-full md:w-72 bg-[#040e1f] p-5 rounded-2xl border border-white/[0.1] shrink-0 z-10 shadow-inner">
          <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
            <span className="font-bold">Agent Horsepower</span>
            <span className="font-black text-[#ffd100]">{aiConfig.readinessScore}%</span>
          </div>

          <div className="w-full h-2.5 bg-white/[0.1] rounded-full overflow-hidden mb-3.5">
            <div
              className={`h-full transition-all duration-1000 ${
                aiConfig.readinessScore >= 80
                  ? 'bg-gradient-to-r from-[#ffd100] to-[#e00034]'
                  : 'bg-gradient-to-r from-[#ffb800] to-[#ffd100]'
              }`}
              style={{ width: `${aiConfig.readinessScore}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-[#081b3a] p-2 rounded-xl border border-white/[0.08]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffd100]" />
              <span>Rules: {aiConfig.hasCursorRules ? 'Active' : 'None'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#081b3a] p-2 rounded-xl border border-white/[0.08]">
              <Server className="w-3.5 h-3.5 text-[#00a3ff]" />
              <span>MCP: {aiConfig.mcpServers.length} Feeds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: MCP Servers & Environment Keys */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MCP Servers Card */}
        <div className="rb-widget rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#ffd100]/20 border border-[#ffd100]/40 flex items-center justify-center">
                  <Server className="w-4 h-4 text-[#ffd100]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white italic">Active MCP Telemetry Tool Servers</h3>
                  <p className="text-[11px] text-slate-400">Model Context Protocol Interfaces</p>
                </div>
              </div>
              <span className="rb-racing-badge text-[10px] font-mono px-3 py-1 rounded bg-[#e00034] text-white font-black shadow-sm">
                <span>{aiConfig.mcpServers.length} Online</span>
              </span>
            </div>

            {aiConfig.mcpServers.length > 0 ? (
              <div className="space-y-3">
                {aiConfig.mcpServers.map((server, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#040e1f] border border-white/[0.08] space-y-2 hover:border-[#ffd100] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#ffd100] font-mono flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-[#e00034]" />
                        {server.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.08] text-slate-300">
                        {server.type || 'stdio'}
                      </span>
                    </div>
                    {server.description && (
                      <p className="text-xs text-slate-300 leading-relaxed">{server.description}</p>
                    )}
                    {server.command && (
                      <div className="text-[11px] font-mono bg-[#020712] p-2.5 rounded-xl text-slate-200 border border-white/[0.08] overflow-x-auto shadow-inner">
                        <span className="text-[#ffd100]">$ </span>
                        <span>{server.command} </span>
                        <span className="text-[#e00034] font-bold">{server.args?.join(' ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-[#040e1f] rounded-2xl border border-dashed border-white/[0.1] text-slate-400 text-xs text-center font-mono">
                No MCP tool servers detected in <code>mcp.json</code> or workspace configs.
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/[0.08] text-[11px] text-slate-400 font-mono">
            Direct tool protocol connecting Antigravity, Claude Code, and Cursor
          </div>
        </div>

        {/* Expected Environment Keys Card */}
        <div className="rb-widget rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#e00034]/20 border border-[#e00034]/40 flex items-center justify-center">
                  <KeyRound className="w-4 h-4 text-[#e00034]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white italic">Environment Telemetry Secrets</h3>
                  <p className="text-[11px] text-slate-400">Required Secret Variable Keys</p>
                </div>
              </div>
              <span className="rb-racing-badge text-[10px] font-mono px-3 py-1 rounded bg-[#ffd100] text-black font-black">
                <span>{aiConfig.environmentKeys.length} Variables</span>
              </span>
            </div>

            {aiConfig.environmentKeys.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {aiConfig.environmentKeys.map((key, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#040e1f] border border-white/[0.08] text-xs font-mono group hover:border-[#ffd100] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Lock className="w-3.5 h-3.5 text-[#ffd100] shrink-0" />
                      <span className="text-slate-200 font-bold truncate">{key}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(key, `key-${i}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white"
                      title="Copy variable name"
                    >
                      {copiedKey === `key-${i}` ? (
                        <Check className="w-3.5 h-3.5 text-[#ffd100]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-[#040e1f] rounded-2xl border border-dashed border-white/[0.1] text-slate-400 text-xs text-center font-mono">
                No <code>.env.example</code> detected in the repository paddock.
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/[0.08] text-[11px] text-slate-400 font-mono">
            Supplies agent context with variable requirements without exposing live secrets
          </div>
        </div>
      </div>

      {/* Rules & Guidelines Terminal Viewer */}
      <div className="rb-widget rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-[#ffd100]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white italic">Active Pit Wall Directives & Rule Files</h3>
              <p className="text-[11px] text-slate-400">Rules governing autonomous race engineer code generation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {aiConfig.cursorRulesContent && (
              <button
                onClick={() => setActiveRuleTab('cursor')}
                className={`rb-racing-badge px-4 py-1.5 rounded-xl text-xs font-mono font-black transition-all ${
                  activeRuleTab === 'cursor'
                    ? 'bg-[#e00034] text-white shadow-rb-red'
                    : 'bg-[#040e1f] text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                <span>.cursorrules</span>
              </button>
            )}
            {aiConfig.claudeInstructionsContent && (
              <button
                onClick={() => setActiveRuleTab('claude')}
                className={`rb-racing-badge px-4 py-1.5 rounded-xl text-xs font-mono font-black transition-all ${
                  activeRuleTab === 'claude'
                    ? 'bg-[#e00034] text-white shadow-rb-red'
                    : 'bg-[#040e1f] text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                <span>CLAUDE.md</span>
              </button>
            )}
          </div>
        </div>

        {/* Code Content */}
        {activeRuleTab === 'cursor' && aiConfig.cursorRulesContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd100]" />
                Active .cursorrules configuration:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.cursorRulesContent || '', 'cursor')}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#ffd100] bg-white/[0.08] hover:bg-white/[0.15] px-3 py-1.5 rounded-xl border border-white/[0.1] transition"
              >
                {copiedKey === 'cursor' ? (
                  <Check className="w-3.5 h-3.5 text-[#ffd100]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Directives</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-[#020712] text-slate-200 p-5 rounded-2xl border border-white/[0.08] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 shadow-inner">
              {aiConfig.cursorRulesContent}
            </pre>
          </div>
        )}

        {activeRuleTab === 'claude' && aiConfig.claudeInstructionsContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e00034]" />
                Active CLAUDE.md guidelines:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.claudeInstructionsContent || '', 'claude')}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#ffd100] bg-white/[0.08] hover:bg-white/[0.15] px-3 py-1.5 rounded-xl border border-white/[0.1] transition"
              >
                {copiedKey === 'claude' ? (
                  <Check className="w-3.5 h-3.5 text-[#ffd100]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Directives</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-[#020712] text-slate-200 p-5 rounded-2xl border border-white/[0.08] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 shadow-inner">
              {aiConfig.claudeInstructionsContent}
            </pre>
          </div>
        )}
      </div>

      {/* Actionable Recommendations */}
      {aiConfig.recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-[#21090f]/90 via-[#180a10]/90 to-[#08142b]/90 border border-[#e00034]/40 rounded-3xl p-6 space-y-3.5 shadow-rb-red">
          <div className="flex items-center gap-2.5 text-[#ffd100] text-xs font-black uppercase tracking-widest font-mono">
            <AlertTriangle className="w-4 h-4 text-[#e00034]" />
            <span>Pit Wall Optimization Recommendations</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiConfig.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-200 flex items-start gap-3 bg-[#040e1f] p-4 rounded-2xl border border-white/[0.08] shadow-sm font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-[#e00034] shrink-0 mt-1 shadow-rb-red" />
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

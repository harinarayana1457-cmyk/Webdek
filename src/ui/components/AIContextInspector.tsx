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
      {/* Top Mission Control Hero Banner */}
      <div className="bg-gradient-to-r from-[#091126]/95 via-[#0c1635]/95 to-[#160c2b]/95 p-6 lg:p-8 rounded-3xl border border-white/[0.1] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2.5 z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                AUTONOMOUS AGENT COMMAND CENTER
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                AI Alignment & Workspace Context Index
              </h2>
            </div>
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold border shadow-sm ${
                aiConfig.readinessScore >= 80
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {aiConfig.readinessScore}/100 Readiness Score
            </span>
          </div>

          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Measures how well this repository equips autonomous coding agents (Antigravity, Cursor, Claude Code)
            with architecture constraints, tool servers (Model Context Protocol), and environment variables.
          </p>
        </div>

        {/* Readiness Metric Hub */}
        <div className="w-full md:w-72 bg-[#040814]/90 p-4 rounded-2xl border border-white/[0.08] shrink-0 z-10 shadow-inner">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Alignment Metric</span>
            <span className="font-bold text-cyan-400">{aiConfig.readinessScore}%</span>
          </div>

          <div className="w-full h-2.5 bg-white/[0.08] rounded-full overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-1000 ${
                aiConfig.readinessScore >= 80
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500'
              }`}
              style={{ width: `${aiConfig.readinessScore}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 bg-[#070d1e] p-2 rounded-lg border border-white/[0.04]">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rules: {aiConfig.hasCursorRules ? 'Active' : 'None'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#070d1e] p-2 rounded-lg border border-white/[0.04]">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>MCP: {aiConfig.mcpServers.length} Servers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: MCP Servers & Environment Keys */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MCP Servers Card */}
        <div className="bg-gradient-to-br from-[#091126]/90 via-[#070d1e]/90 to-[#040814]/90 border border-white/[0.09] rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <Server className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Active MCP Tool Servers</h3>
                  <p className="text-[11px] text-slate-400">Model Context Protocol Interfaces</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                {aiConfig.mcpServers.length} Running
              </span>
            </div>

            {aiConfig.mcpServers.length > 0 ? (
              <div className="space-y-3">
                {aiConfig.mcpServers.map((server, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#040814] border border-white/[0.07] space-y-2.5 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        {server.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-400">
                        {server.type || 'stdio'}
                      </span>
                    </div>
                    {server.description && (
                      <p className="text-xs text-slate-300 leading-relaxed">{server.description}</p>
                    )}
                    {server.command && (
                      <div className="text-[11px] font-mono bg-[#02040a] p-2.5 rounded-xl text-slate-300 border border-white/[0.04] overflow-x-auto">
                        <span className="text-slate-500">$ </span>
                        <span>{server.command} </span>
                        <span className="text-amber-300">{server.args?.join(' ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-[#040814]/60 rounded-2xl border border-dashed border-white/[0.08] text-slate-400 text-xs text-center font-mono">
                No MCP servers configured. Add an <code>mcp.json</code> to register tool servers.
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/[0.08] text-[11px] text-slate-500 font-mono">
            Supported by Antigravity, Claude Code, and Cursor AI Agents
          </div>
        </div>

        {/* Expected Environment Keys Card */}
        <div className="bg-gradient-to-br from-[#091126]/90 via-[#070d1e]/90 to-[#040814]/90 border border-white/[0.09] rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Environment Configuration</h3>
                  <p className="text-[11px] text-slate-400">Required Secret Variable Keys</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                {aiConfig.environmentKeys.length} Variables Declared
              </span>
            </div>

            {aiConfig.environmentKeys.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {aiConfig.environmentKeys.map((key, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#040814] border border-white/[0.06] text-xs font-mono group hover:border-white/[0.14] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-slate-200 font-bold truncate">{key}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(key, `key-${i}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white"
                      title="Copy variable name"
                    >
                      {copiedKey === `key-${i}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-[#040814]/60 rounded-2xl border border-dashed border-white/[0.08] text-slate-400 text-xs text-center font-mono">
                No <code>.env.example</code> detected. AI models may not infer required backend secrets.
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/[0.08] text-[11px] text-slate-500 font-mono">
            Supplies agent context with variable requirements without exposing live secrets
          </div>
        </div>
      </div>

      {/* Rules & Guidelines Terminal Viewer */}
      <div className="bg-gradient-to-br from-[#091126]/90 via-[#070d1e]/90 to-[#040814]/90 border border-white/[0.09] rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Active Prompt Directives & Instructions</h3>
              <p className="text-[11px] text-slate-400">Rules governing autonomous code generation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {aiConfig.cursorRulesContent && (
              <button
                onClick={() => setActiveRuleTab('cursor')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeRuleTab === 'cursor'
                    ? 'bg-cyan-500 text-white shadow-glow-cyan'
                    : 'bg-[#040814] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                .cursorrules
              </button>
            )}
            {aiConfig.claudeInstructionsContent && (
              <button
                onClick={() => setActiveRuleTab('claude')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeRuleTab === 'claude'
                    ? 'bg-purple-500 text-white shadow-glow-violet'
                    : 'bg-[#040814] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                CLAUDE.md
              </button>
            )}
          </div>
        </div>

        {/* Terminal Content */}
        {activeRuleTab === 'cursor' && aiConfig.cursorRulesContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Active .cursorrules configuration:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.cursorRulesContent || '', 'cursor')}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1.5 rounded-xl border border-white/[0.08] transition"
              >
                {copiedKey === 'cursor' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Rules</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-[#030611] p-5 rounded-2xl border border-white/[0.07] text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 shadow-inner">
              {aiConfig.cursorRulesContent}
            </pre>
          </div>
        )}

        {activeRuleTab === 'claude' && aiConfig.claudeInstructionsContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                Active CLAUDE.md guidelines:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.claudeInstructionsContent || '', 'claude')}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1.5 rounded-xl border border-white/[0.08] transition"
              >
                {copiedKey === 'claude' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Instructions</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-[#030611] p-5 rounded-2xl border border-white/[0.07] text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 shadow-inner">
              {aiConfig.claudeInstructionsContent}
            </pre>
          </div>
        )}
      </div>

      {/* Actionable Recommendations */}
      {aiConfig.recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-[#1c1208]/80 to-[#120a06]/80 border border-amber-500/25 rounded-3xl p-6 space-y-3.5 shadow-xl">
          <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
            <AlertTriangle className="w-4 h-4" />
            <span>Actionable Agent Alignment Recommendations</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiConfig.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-200 flex items-start gap-3 bg-[#080503]/70 p-4 rounded-2xl border border-amber-500/15"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1" />
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

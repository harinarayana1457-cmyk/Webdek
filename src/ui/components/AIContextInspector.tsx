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
  Terminal
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
    <div className="p-4 lg:p-6 space-y-5 max-w-[1700px] mx-auto">
      {/* Top AI Health & Alignment Hero Banner */}
      <div className="bg-gradient-to-r from-[#0b1429] via-[#0e162d] to-[#170e2b] p-6 rounded-2xl border border-white/[0.08] shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-amber-400" />
            </div>
            <h2 className="font-extrabold text-lg text-white tracking-tight">
              AI Agent Alignment & Context Health
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                aiConfig.readinessScore >= 80
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {aiConfig.readinessScore}/100 Readiness
            </span>
          </div>

          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Evaluates how thoroughly this codebase equips autonomous agents (Antigravity, Cursor, Claude Code)
            with architectural rules, tool servers via Model Context Protocol (MCP), and environment definitions.
          </p>
        </div>

        {/* Alignment Progress Gauge Card */}
        <div className="w-full md:w-64 bg-[#070b16] p-4 rounded-xl border border-white/[0.08] shrink-0 z-10 shadow-inner">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Agent Readiness</span>
            <span className="font-bold text-sky-400">{aiConfig.readinessScore}%</span>
          </div>
          <div className="w-full h-2.5 bg-white/[0.08] rounded-full overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-700 ${
                aiConfig.readinessScore >= 80
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-300'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500'
              }`}
              style={{ width: `${aiConfig.readinessScore}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
            <div>
              Rules: {aiConfig.hasCursorRules || aiConfig.hasClaudeInstructions ? '✅ Active' : '❌ None'}
            </div>
            <div>
              MCP Tools: {aiConfig.mcpServers.length > 0 ? `✅ ${aiConfig.mcpServers.length}` : '❌ 0'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: MCP Servers & Environment Keys */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* MCP Servers Card */}
        <div className="bg-[#0b1220]/90 border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <Server className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Active MCP Tool Servers</h3>
                  <p className="text-[11px] text-slate-400">Model Context Protocol Connections</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                {aiConfig.mcpServers.length} Configured
              </span>
            </div>

            {aiConfig.mcpServers.length > 0 ? (
              <div className="space-y-3">
                {aiConfig.mcpServers.map((server, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#070b16] border border-white/[0.06] space-y-2 hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-300 font-mono flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-sky-400" />
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
                      <div className="text-[11px] font-mono bg-[#04060c] p-2 rounded-lg text-slate-300 border border-white/[0.04] overflow-x-auto">
                        <span className="text-slate-500">$ </span>
                        <span>{server.command} </span>
                        <span className="text-amber-300">{server.args?.join(' ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#070b16]/60 rounded-xl border border-dashed border-white/[0.08] text-slate-400 text-xs text-center">
                No MCP servers detected in <code>mcp.json</code> or agent configurations.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-slate-500 font-mono">
            Interoperable tool protocol supported by Antigravity, Claude, and Cursor
          </div>
        </div>

        {/* Expected Environment Keys Card */}
        <div className="bg-[#0b1220]/90 border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Environment Configuration</h3>
                  <p className="text-[11px] text-slate-400">Required Secret Variables</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                {aiConfig.environmentKeys.length} Declared
              </span>
            </div>

            {aiConfig.environmentKeys.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {aiConfig.environmentKeys.map((key, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#070b16] border border-white/[0.06] text-xs font-mono group hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span className="text-slate-200 font-semibold truncate">{key}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(key, `key-${i}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white"
                      title="Copy key name"
                    >
                      {copiedKey === `key-${i}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#070b16]/60 rounded-xl border border-dashed border-white/[0.08] text-slate-400 text-xs text-center">
                No <code>.env.example</code> detected. AI agents cannot anticipate required API keys.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-slate-500 font-mono">
            Supplies agent context with variable requirements without exposing live secrets
          </div>
        </div>
      </div>

      {/* Rules & Guidelines Terminal Viewer */}
      <div className="bg-[#0b1220]/90 border border-white/[0.08] rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Active Prompt Directives & Instructions</h3>
              <p className="text-[11px] text-slate-400">Rules guiding autonomous code generation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {aiConfig.cursorRulesContent && (
              <button
                onClick={() => setActiveRuleTab('cursor')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                  activeRuleTab === 'cursor'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                .cursorrules
              </button>
            )}
            {aiConfig.claudeInstructionsContent && (
              <button
                onClick={() => setActiveRuleTab('claude')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                  activeRuleTab === 'claude'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                CLAUDE.md
              </button>
            )}
          </div>
        </div>

        {/* Tab content */}
        {activeRuleTab === 'cursor' && aiConfig.cursorRulesContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                Active .cursorrules configuration:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.cursorRulesContent || '', 'cursor')}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] px-2.5 py-1 rounded-lg border border-white/[0.08] transition"
              >
                {copiedKey === 'cursor' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Rules</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-[#060913] p-4 rounded-xl border border-white/[0.06] text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 shadow-inner">
              {aiConfig.cursorRulesContent}
            </pre>
          </div>
        )}

        {activeRuleTab === 'claude' && aiConfig.claudeInstructionsContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                Active CLAUDE.md guidelines:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.claudeInstructionsContent || '', 'claude')}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] px-2.5 py-1 rounded-lg border border-white/[0.08] transition"
              >
                {copiedKey === 'claude' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Instructions</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-[#060913] p-4 rounded-xl border border-white/[0.06] text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 shadow-inner">
              {aiConfig.claudeInstructionsContent}
            </pre>
          </div>
        )}
      </div>

      {/* Actionable Recommendations Card */}
      {aiConfig.recommendations.length > 0 && (
        <div className="bg-[#1c120c]/70 border border-amber-500/25 rounded-2xl p-5 space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
            <AlertTriangle className="w-4 h-4" />
            <span>Actionable Agent Alignment Recommendations</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {aiConfig.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-300 flex items-start gap-2.5 bg-[#090604]/60 p-3 rounded-xl border border-amber-500/15"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

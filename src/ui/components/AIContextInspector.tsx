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
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-slate-50/90 p-6 lg:p-8 rounded-3xl border border-blue-200 shadow-soft-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2.5 z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 font-bold block">
                AUTONOMOUS AGENT COMMAND CENTER
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
                AI Alignment & Workspace Context Index
              </h2>
            </div>
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold border shadow-sm ${
                aiConfig.readinessScore >= 80
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}
            >
              {aiConfig.readinessScore}/100 Readiness Score
            </span>
          </div>

          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            Measures how thoroughly this repository equips autonomous coding agents (Antigravity, Cursor, Claude Code)
            with architecture constraints, tool servers (Model Context Protocol), and environment variables.
          </p>
        </div>

        {/* Readiness Metric Hub */}
        <div className="w-full md:w-72 bg-white p-5 rounded-2xl border border-slate-200 shrink-0 z-10 shadow-soft-sm">
          <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
            <span>Alignment Metric</span>
            <span className="font-bold text-blue-600">{aiConfig.readinessScore}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3.5">
            <div
              className={`h-full transition-all duration-1000 ${
                aiConfig.readinessScore >= 80
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500'
              }`}
              style={{ width: `${aiConfig.readinessScore}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Rules: {aiConfig.hasCursorRules ? 'Active' : 'None'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              <span>MCP: {aiConfig.mcpServers.length} Servers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: MCP Servers & Environment Keys */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MCP Servers Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-soft-md">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <Server className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Active MCP Tool Servers</h3>
                  <p className="text-[11px] text-slate-500">Model Context Protocol Interfaces</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                {aiConfig.mcpServers.length} Configured
              </span>
            </div>

            {aiConfig.mcpServers.length > 0 ? (
              <div className="space-y-3">
                {aiConfig.mcpServers.map((server, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 font-mono flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                        {server.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200">
                        {server.type || 'stdio'}
                      </span>
                    </div>
                    {server.description && (
                      <p className="text-xs text-slate-600 leading-relaxed">{server.description}</p>
                    )}
                    {server.command && (
                      <div className="text-[11px] font-mono bg-white p-2.5 rounded-xl text-slate-800 border border-slate-200 overflow-x-auto shadow-sm">
                        <span className="text-slate-400">$ </span>
                        <span>{server.command} </span>
                        <span className="text-amber-700 font-semibold">{server.args?.join(' ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs text-center font-mono">
                No MCP servers configured. Add an <code>mcp.json</code> to register tool servers.
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
            Supported by Antigravity, Claude Code, and Cursor AI Agents
          </div>
        </div>

        {/* Expected Environment Keys Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-soft-md">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Environment Configuration</h3>
                  <p className="text-[11px] text-slate-500">Required Secret Variable Keys</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                {aiConfig.environmentKeys.length} Variables Declared
              </span>
            </div>

            {aiConfig.environmentKeys.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {aiConfig.environmentKeys.map((key, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono group hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-slate-800 font-bold truncate">{key}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(key, `key-${i}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-slate-700"
                      title="Copy variable name"
                    >
                      {copiedKey === `key-${i}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs text-center font-mono">
                No <code>.env.example</code> detected. AI models may not infer required backend secrets.
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
            Supplies agent context with variable requirements without exposing live secrets
          </div>
        </div>
      </div>

      {/* Rules & Guidelines Terminal Viewer */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Active Prompt Directives & Instructions</h3>
              <p className="text-[11px] text-slate-500">Rules governing autonomous code generation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {aiConfig.cursorRulesContent && (
              <button
                onClick={() => setActiveRuleTab('cursor')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeRuleTab === 'cursor'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
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
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                CLAUDE.md
              </button>
            )}
          </div>
        </div>

        {/* Code Content */}
        {activeRuleTab === 'cursor' && aiConfig.cursorRulesContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Active .cursorrules configuration:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.cursorRulesContent || '', 'cursor')}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 transition"
              >
                {copiedKey === 'cursor' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Rules</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 shadow-inner">
              {aiConfig.cursorRulesContent}
            </pre>
          </div>
        )}

        {activeRuleTab === 'claude' && aiConfig.claudeInstructionsContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                Active CLAUDE.md guidelines:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.claudeInstructionsContent || '', 'claude')}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 transition"
              >
                {copiedKey === 'claude' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Instructions</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64 shadow-inner">
              {aiConfig.claudeInstructionsContent}
            </pre>
          </div>
        )}
      </div>

      {/* Actionable Recommendations */}
      {aiConfig.recommendations.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 space-y-3.5 shadow-soft-sm">
          <div className="flex items-center gap-2.5 text-amber-800 text-xs font-bold uppercase tracking-widest font-mono">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Actionable Agent Alignment Recommendations</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiConfig.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-800 flex items-start gap-3 bg-white p-4 rounded-2xl border border-amber-200/80 shadow-soft-sm"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" />
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

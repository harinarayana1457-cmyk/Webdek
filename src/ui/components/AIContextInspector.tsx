import React, { useState } from 'react';
import {
  Sparkles,
  Server,
  FileCode,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { AIConfigInfo } from '../../engine/types';

interface AIContextInspectorProps {
  aiConfig: AIConfigInfo;
}

export const AIContextInspector: React.FC<AIContextInspectorProps> = ({ aiConfig }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top AI Health & Readiness Banner */}
      <div className="bg-gradient-to-r from-sky-950/40 via-slate-900/60 to-purple-950/40 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-white">AI Workspace Alignment & Context Health</h2>
            <span
              className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                aiConfig.readinessScore >= 80
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {aiConfig.readinessScore}/100 Readiness Score
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Measures how well this repository equips autonomous AI coding agents (Antigravity, Cursor, Claude Code)
            with architecture guidelines, tool connections (MCP), and environment constraints.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-56 bg-slate-950 p-2 rounded-lg border border-slate-800 shrink-0">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span>Alignment Index</span>
            <span className="font-bold text-sky-400">{aiConfig.readinessScore}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                aiConfig.readinessScore >= 80
                  ? 'bg-emerald-400'
                  : aiConfig.readinessScore >= 50
                  ? 'bg-amber-400'
                  : 'bg-rose-400'
              }`}
              style={{ width: `${aiConfig.readinessScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid: MCP Servers & Environment Keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MCP Servers Card */}
        <div className="bg-[#0e1628] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <h3 className="font-semibold text-sm text-white">Active MCP Tool Servers</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {aiConfig.mcpServers.length} Servers Connected
              </span>
            </div>

            {aiConfig.mcpServers.length > 0 ? (
              <div className="space-y-2.5">
                {aiConfig.mcpServers.map((server, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-sky-300 font-mono">{server.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {server.type || 'stdio'}
                      </span>
                    </div>
                    {server.description && (
                      <p className="text-[11px] text-slate-400 leading-normal">{server.description}</p>
                    )}
                    {server.command && (
                      <div className="text-[11px] font-mono bg-slate-950 px-2 py-1 rounded text-slate-300 truncate border border-slate-800/80">
                        {server.command} {server.args?.join(' ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-900/40 rounded-lg border border-dashed border-slate-800 text-slate-400 text-xs text-center space-y-2">
                <p>No Model Context Protocol (MCP) servers detected in <code>mcp.json</code> or workspace configs.</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
            Standard: Model Context Protocol (Anthropic / Cursor / Antigravity)
          </div>
        </div>

        {/* Environment Templates Card */}
        <div className="bg-[#0e1628] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-sm text-white">Expected Environment Keys</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {aiConfig.environmentKeys.length} Variables Declared
              </span>
            </div>

            {aiConfig.environmentKeys.length > 0 ? (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {aiConfig.environmentKeys.map((key, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded bg-slate-900/70 border border-slate-800 text-xs font-mono"
                  >
                    <span className="text-slate-300 font-semibold">{key}</span>
                    <span className="text-[10px] text-slate-500">Declared in .env.example</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-900/40 rounded-lg border border-dashed border-slate-800 text-slate-400 text-xs text-center">
                No <code>.env.example</code> detected. AI agents may fail to identify required backend keys.
              </div>
            )}
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
            Allows agents to anticipate secrets without exposing live credentials
          </div>
        </div>
      </div>

      {/* Rules & Guidelines Viewers */}
      <div className="bg-[#0e1628] border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-sky-400" />
            <h3 className="font-semibold text-sm text-white">Detected AI Rule Files & Prompts</h3>
          </div>
          <div className="flex items-center gap-2">
            {aiConfig.hasCursorRules && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                .cursorrules
              </span>
            )}
            {aiConfig.hasClaudeInstructions && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                CLAUDE.md
              </span>
            )}
          </div>
        </div>

        {/* Display active guidelines */}
        {aiConfig.cursorRulesContent && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                Active .cursorrules Directives:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.cursorRulesContent || '', 'cursor')}
                className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
              >
                {copiedKey === 'cursor' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
              {aiConfig.cursorRulesContent}
            </pre>
          </div>
        )}

        {aiConfig.claudeInstructionsContent && (
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                Active CLAUDE.md Instructions:
              </span>
              <button
                onClick={() => handleCopy(aiConfig.claudeInstructionsContent || '', 'claude')}
                className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
              >
                {copiedKey === 'claude' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
              {aiConfig.claudeInstructionsContent}
            </pre>
          </div>
        )}
      </div>

      {/* Recommendations & Actionable Next Steps */}
      {aiConfig.recommendations.length > 0 && (
        <div className="bg-amber-950/15 border border-amber-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <AlertTriangle className="w-4 h-4" />
            <span>Actionable Agent Alignment Recommendations</span>
          </div>
          <ul className="space-y-1.5">
            {aiConfig.recommendations.map((rec, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

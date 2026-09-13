import React, { useState } from 'react';
import {
  Server,
  KeyRound,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Bot,
  Terminal,
  ShieldCheck,
  Lock,
  Sparkles
} from 'lucide-react';
import { animate, spring, stagger } from 'animejs';
import { useAnimeScope } from '../hooks/useAnimeScope';
import { AIConfigInfo } from '../../engine/types';

interface AIContextInspectorProps {
  aiConfig: AIConfigInfo;
}

export const AIContextInspector: React.FC<AIContextInspectorProps> = ({ aiConfig }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeRuleTab, setActiveRuleTab] = useState<'cursor' | 'claude'>('cursor');
  const [displayScore, setDisplayScore] = useState(0);

  const { root } = useAnimeScope(() => {
    // 1. Numerical readiness counter
    const scoreObj = { val: 0 };
    animate(scoreObj, {
      val: aiConfig.readinessScore,
      duration: 800,
      ease: 'out(3)',
      round: 1,
      onUpdate: () => setDisplayScore(scoreObj.val)
    });

    // 2. Bar fill
    animate('.readiness-bar-fill', {
      width: ['0%', `${aiConfig.readinessScore}%`],
      duration: 900,
      ease: 'out(4)'
    });

    // 3. Staggered cards
    animate('.mcp-card', {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      delay: stagger(35),
      ease: spring({ bounce: 0.3 })
    });

    // 4. Staggered environment keys
    animate('.env-key-item', {
      opacity: [0, 1],
      translateX: [-8, 0],
      duration: 350,
      delay: stagger(20),
      ease: 'out(3)'
    });
  }, [aiConfig.readinessScore, aiConfig.mcpServers.length]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);

    animate(`#copy-${id}`, {
      scale: [1, 1.25, 1],
      duration: 300,
      ease: spring({ bounce: 0.5 })
    });
  };

  return (
    <div ref={root} className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Hero Banner: AI Readiness */}
      <div className="rb-widget p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold block">
                DEVELOPER DIRECTIVES & AI READINESS
              </span>
              <h2 className="text-lg lg:text-xl font-extrabold text-white tracking-tight font-sans">
                Coding Agent Context & Tool Integration
              </h2>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
                aiConfig.readinessScore >= 80
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              }`}
            >
              <span>{displayScore}% Readiness Score</span>
            </span>
          </div>

          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed font-normal">
            Evaluates how prepared this repository is for autonomous AI coding agents (Antigravity, Cursor, Claude Code)
            with explicit project rules (`.cursorrules`), Model Context Protocol (MCP) tool servers, and environment configuration.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="w-full md:w-64 bg-[#070c18] p-4 rounded-2xl border border-white/[0.08] shrink-0 z-10 shadow-inner">
          <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
            <span className="font-semibold">AI Pair Readiness</span>
            <span className="font-bold text-indigo-400">{displayScore}%</span>
          </div>

          <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden mb-3">
            <div
              className={`readiness-bar-fill h-full ${
                aiConfig.readinessScore >= 80
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 to-indigo-500'
              }`}
              style={{ width: '0%' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-[#0e1626] p-2 rounded-xl border border-white/[0.06]">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Rules: {aiConfig.hasCursorRules ? 'Active' : 'None'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0e1626] p-2 rounded-xl border border-white/[0.06]">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>MCP: {aiConfig.mcpServers.length} Tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: MCP Tool Servers & Environment Variables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* MCP Tool Servers */}
        <div className="rb-widget rounded-3xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                  <Server className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Model Context Protocol (MCP) Tools</h3>
                  <p className="text-[11px] text-slate-400">Connected database and CLI tools for AI</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/30">
                {aiConfig.mcpServers.length} Detected
              </span>
            </div>

            {aiConfig.mcpServers.length > 0 ? (
              <div className="space-y-3">
                {aiConfig.mcpServers.map((server, i) => (
                  <div
                    key={i}
                    className="mcp-card p-3.5 rounded-2xl bg-[#070c18] border border-white/[0.08] space-y-2 hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-indigo-400" />
                        {server.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300">
                        {server.type || 'stdio'}
                      </span>
                    </div>
                    {server.description && (
                      <p className="text-xs text-slate-300 leading-relaxed">{server.description}</p>
                    )}
                    {server.command && (
                      <div className="text-[11px] font-mono bg-[#050812] p-2.5 rounded-xl text-slate-200 border border-white/[0.06] overflow-x-auto">
                        <span className="text-indigo-400">$ </span>
                        <span>{server.command} </span>
                        <span className="text-emerald-400 font-medium">{server.args?.join(' ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#070c18] rounded-2xl border border-dashed border-white/[0.08] text-slate-400 text-xs text-center font-mono">
                No custom MCP tool servers detected in workspace configuration.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400 font-mono">
            Gives AI agents safe tools to test code, query databases, or execute builds
          </div>
        </div>

        {/* Environment Variables & Secrets */}
        <div className="rb-widget rounded-3xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Environment Configuration</h3>
                  <p className="text-[11px] text-slate-400">Required environment keys & secrets</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30">
                {aiConfig.environmentKeys.length} Variables
              </span>
            </div>

            {aiConfig.environmentKeys.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {aiConfig.environmentKeys.map((key, i) => (
                  <div
                    key={i}
                    className="env-key-item flex items-center justify-between p-2.5 rounded-xl bg-[#070c18] border border-white/[0.08] text-xs font-mono group hover:border-amber-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-slate-200 font-semibold truncate">{key}</span>
                    </div>
                    <button
                      id={`copy-key-${i}`}
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
              <div className="p-8 bg-[#070c18] rounded-2xl border border-dashed border-white/[0.08] text-slate-400 text-xs text-center font-mono">
                No <code>.env.example</code> detected in the workspace root.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-slate-400 font-mono">
            Documents required keys without exposing actual private credentials
          </div>
        </div>
      </div>

      {/* Rules & Directives Viewer */}
      <div className="rb-widget rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Project Directives & AI Guardrails</h3>
              <p className="text-[11px] text-slate-400">Rules defining how coding assistants should structure code</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {aiConfig.cursorRulesContent && (
              <button
                onClick={() => setActiveRuleTab('cursor')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeRuleTab === 'cursor'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-[#070c18] text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                .cursorrules
              </button>
            )}
            {aiConfig.claudeInstructionsContent && (
              <button
                onClick={() => setActiveRuleTab('claude')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeRuleTab === 'claude'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-[#070c18] text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                CLAUDE.md
              </button>
            )}
          </div>
        </div>

        {/* Content Viewer */}
        {activeRuleTab === 'cursor' && aiConfig.cursorRulesContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Active .cursorrules configuration:
              </span>
              <button
                id="copy-cursor"
                onClick={() => handleCopy(aiConfig.cursorRulesContent || '', 'cursor')}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-indigo-300 bg-white/[0.08] hover:bg-white/[0.12] px-3 py-1.5 rounded-xl border border-white/[0.08] transition"
              >
                {copiedKey === 'cursor' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Rules</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-[#050812] text-slate-200 p-4 rounded-2xl border border-white/[0.08] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64">
              {aiConfig.cursorRulesContent}
            </pre>
          </div>
        )}

        {activeRuleTab === 'claude' && aiConfig.claudeInstructionsContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Active CLAUDE.md guidelines:
              </span>
              <button
                id="copy-claude"
                onClick={() => handleCopy(aiConfig.claudeInstructionsContent || '', 'claude')}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-indigo-300 bg-white/[0.08] hover:bg-white/[0.12] px-3 py-1.5 rounded-xl border border-white/[0.08] transition"
              >
                {copiedKey === 'claude' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Guidelines</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-[#050812] text-slate-200 p-4 rounded-2xl border border-white/[0.08] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-64">
              {aiConfig.claudeInstructionsContent}
            </pre>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {aiConfig.recommendations.length > 0 && (
        <div className="bg-[#0e1626] border border-indigo-500/20 rounded-3xl p-5 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Recommended Project Improvements</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiConfig.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-200 flex items-start gap-2.5 bg-[#070c18] p-3 rounded-xl border border-white/[0.06] font-normal"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default AIContextInspector;

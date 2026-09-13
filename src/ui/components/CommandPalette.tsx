import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Layers,
  Box,
  FileCode,
  ArrowRight,
  CornerDownLeft,
  Tag,
  Zap,
  BookOpen
} from 'lucide-react';
import { animate, spring, stagger } from 'animejs';
import { useAnimeScope } from '../hooks/useAnimeScope';
import { ProjectAnalysisResult } from '../../engine/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProjectAnalysisResult;
  onNavigateTab: (tab: 'graph' | 'stack' | 'ai' | 'files' | 'explain') => void;
  onSelectStackItem?: (name: string) => void;
  onSelectNode?: (nodeId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  data,
  onNavigateTab,
  onSelectStackItem,
  onSelectNode
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { root } = useAnimeScope(() => {
    if (!isOpen) return;

    // 1. Spring modal tray entrance
    animate('.command-palette-card', {
      scale: [0.94, 1],
      opacity: [0, 1],
      translateY: [-14, 0],
      duration: 400,
      ease: spring({ bounce: 0.35 })
    });

    // 2. Staggered search results
    animate('.palette-item', {
      opacity: [0, 1],
      translateX: [-6, 0],
      duration: 250,
      delay: stagger(15),
      ease: 'out(3)'
    });
  }, [isOpen, query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Quick navigation shortcuts
  const navShortcuts = [
    {
      id: 'graph' as const,
      label: 'Architecture Map',
      desc: 'Interactive visual component diagram and connections',
      icon: Layers,
      badge: 'TAB 1',
      keywords: 'architecture map graph diagram flow visual components'
    },
    {
      id: 'stack' as const,
      label: 'What It\'s Made Of',
      desc: 'Inspect dependencies, frameworks, and package specifications',
      icon: Box,
      badge: 'TAB 2',
      keywords: 'stack dependencies packages libraries framework runtime'
    },
    {
      id: 'ai' as const,
      label: 'AI Assistant Setup',
      desc: 'Inspect AI readiness score, .cursorrules, and MCP tools',
      icon: Zap,
      badge: 'TAB 3',
      keywords: 'ai assistant mcp rules cursor prompt agent tools'
    },
    {
      id: 'files' as const,
      label: 'File Structure',
      desc: 'Directory structure organized by architectural layers',
      icon: FileCode,
      badge: 'TAB 4',
      keywords: 'files folders project tree directory code'
    },
    {
      id: 'explain' as const,
      label: 'Plain English Guide',
      desc: 'Relatable analogies (Restaurant, Plain English) and concepts',
      icon: BookOpen,
      badge: 'TAB 5',
      keywords: 'explain guide plain english simple beginner faq help concepts analogy'
    }
  ].filter(
    (item) =>
      !q ||
      item.label.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q)
  );

  // 1. Filter dependencies
  const matchedDeps = data.dependencies
    .filter((d) => !q || d.name.toLowerCase().includes(q) || d.purpose.toLowerCase().includes(q) || d.category.toLowerCase().includes(q))
    .slice(0, 6);

  // 2. Filter graph nodes
  const matchedNodes = data.graph.nodes
    .filter((n) => !q || n.label.toLowerCase().includes(q) || n.description.toLowerCase().includes(q) || n.tech.some(t => t.toLowerCase().includes(q)))
    .slice(0, 4);

  // 3. Filter files
  const matchedFiles = data.architecture.layers
    .flatMap((l) => l.filePaths)
    .filter((f) => !q || f.toLowerCase().includes(q))
    .slice(0, 5);

  return (
    <div ref={root} className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="command-palette-card w-full max-w-2xl bg-[#0c1427] rounded-2xl border border-slate-750 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] relative">
        {/* Top Accent Stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-600" />

        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search components, packages, files, guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-1 rounded-lg border border-white/15 hover:bg-white/20 transition font-bold"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Navigation Destinations */}
          {navShortcuts.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono uppercase font-bold text-indigo-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Jump To View ({navShortcuts.length})</span>
              </div>
              {navShortcuts.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onNavigateTab(item.id);
                      onClose();
                    }}
                    className="palette-item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/70 cursor-pointer border border-transparent hover:border-indigo-500/30 transition group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold shrink-0">
                        <Icon className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white group-hover:text-indigo-300 transition truncate font-sans">
                            {item.label}
                          </span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                            {item.badge}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 truncate block">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-indigo-400 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition">
                      <span>Jump</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Architecture Modules */}
          {matchedNodes.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono uppercase font-bold text-indigo-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Architecture Components ({matchedNodes.length})</span>
              </div>
              {matchedNodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => {
                    onNavigateTab('graph');
                    if (onSelectNode) onSelectNode(node.id);
                    onClose();
                  }}
                  className="palette-item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/70 cursor-pointer border border-transparent hover:border-indigo-500/40 transition group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-[11px] shrink-0 font-mono">
                      {node.layer[0]}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-white group-hover:text-indigo-300 transition truncate block font-sans">
                        {node.label}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate block">
                        {node.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 text-indigo-400 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stack Items */}
          {matchedDeps.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono uppercase font-bold text-sky-400 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-sky-400" />
                <span>Tech Stack & Packages ({matchedDeps.length})</span>
              </div>
              {matchedDeps.map((dep) => (
                <div
                  key={dep.name}
                  onClick={() => {
                    onNavigateTab('stack');
                    if (onSelectStackItem) onSelectStackItem(dep.name);
                    onClose();
                  }}
                  className="palette-item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/70 cursor-pointer border border-transparent hover:border-sky-500/40 transition group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                      <Tag className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white group-hover:text-sky-300 transition font-mono">
                          {dep.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10 font-bold">
                          {dep.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 truncate block">
                        {dep.purpose}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 text-sky-400 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Source Files */}
          {matchedFiles.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>Project Files ({matchedFiles.length})</span>
              </div>
              {matchedFiles.map((file, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigateTab('files');
                    onClose();
                  }}
                  className="palette-item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/70 cursor-pointer border border-transparent hover:border-emerald-500/40 transition group font-mono"
                >
                  <div className="flex items-center gap-2 truncate text-slate-300 group-hover:text-emerald-300">
                    <FileCode className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                    <span className="truncate">{file}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-emerald-400 text-[11px] font-sans font-semibold opacity-0 group-hover:opacity-100 transition">
                    <span>View in Tree</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {matchedNodes.length === 0 && matchedDeps.length === 0 && matchedFiles.length === 0 && navShortcuts.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              <p className="text-xs font-mono">No matching items found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3 text-indigo-400" /> to navigate
            </span>
            <span>ESC to close</span>
          </div>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" /> ProjectLens Workspace Engine
          </span>
        </div>
      </div>
    </div>
  );
};

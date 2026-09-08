import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Layers,
  Box,
  FileCode,
  ArrowRight,
  CornerDownLeft,
  Tag
} from 'lucide-react';
import { ProjectAnalysisResult } from '../../engine/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProjectAnalysisResult;
  onNavigateTab: (tab: 'graph' | 'stack' | 'ai' | 'files') => void;
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search stack, modules, architecture layers, files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] font-mono text-slate-500 bg-slate-200/60 px-2 py-1 rounded border border-slate-300/50 hover:bg-slate-200 transition"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Architecture Modules */}
          {matchedNodes.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-blue-600" />
                <span>Architecture Modules ({matchedNodes.length})</span>
              </div>
              {matchedNodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => {
                    onNavigateTab('graph');
                    if (onSelectNode) onSelectNode(node.id);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 cursor-pointer border border-transparent hover:border-blue-100 transition group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-7 h-7 rounded-lg bg-blue-100/60 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                      {node.layer[0]}
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition truncate block">
                        {node.label}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate block">
                        {node.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 text-blue-600 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition">
                    <span>View in Flow</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stack Items */}
          {matchedDeps.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Box className="w-3 h-3 text-indigo-600" />
                <span>Stack & Libraries ({matchedDeps.length})</span>
              </div>
              {matchedDeps.map((dep) => (
                <div
                  key={dep.name}
                  onClick={() => {
                    onNavigateTab('stack');
                    if (onSelectStackItem) onSelectStackItem(dep.name);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 cursor-pointer border border-transparent hover:border-indigo-100 transition group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100/60 text-indigo-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                      <Tag className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition font-mono">
                          {dep.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {dep.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 truncate block">
                        {dep.purpose}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 text-indigo-600 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition">
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
              <div className="px-2 text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-emerald-600" />
                <span>Source Files ({matchedFiles.length})</span>
              </div>
              {matchedFiles.map((file, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigateTab('files');
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 cursor-pointer border border-transparent hover:border-emerald-100 transition group font-mono"
                >
                  <div className="flex items-center gap-2 truncate text-slate-700 group-hover:text-emerald-700">
                    <FileCode className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                    <span className="truncate">{file}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-emerald-600 text-[11px] opacity-0 group-hover:opacity-100 transition font-sans">
                    <span>View in Tree</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {matchedNodes.length === 0 && matchedDeps.length === 0 && matchedFiles.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              <p className="text-xs">No results found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> to navigate
            </span>
            <span>ESC to close</span>
          </div>
          <span>ProjectLens Intelligence Search</span>
        </div>
      </div>
    </div>
  );
};

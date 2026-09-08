import React, { useState } from 'react';
import {
  File,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  FileCode,
  FileJson,
  FolderTree
} from 'lucide-react';
import { ArchitectureLayer } from '../../engine/types';

interface DirectoryExplorerProps {
  layers: ArchitectureLayer[];
  allFiles: string[];
}

export const DirectoryExplorer: React.FC<DirectoryExplorerProps> = ({ layers, allFiles }) => {
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({
    [layers[0]?.name || '']: true
  });
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const toggleLayer = (name: string) => {
    setExpandedLayers((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedFile(path);
    setTimeout(() => setCopiedFile(null), 1500);
  };

  const getFileIcon = (path: string) => {
    if (path.endsWith('.json')) return <FileJson className="w-3.5 h-3.5 text-amber-400" />;
    if (path.endsWith('.tsx') || path.endsWith('.jsx')) return <FileCode className="w-3.5 h-3.5 text-sky-400" />;
    if (path.endsWith('.ts') || path.endsWith('.js')) return <FileCode className="w-3.5 h-3.5 text-blue-400" />;
    if (path.endsWith('.css')) return <File className="w-3.5 h-3.5 text-pink-400" />;
    if (path.endsWith('.md')) return <File className="w-3.5 h-3.5 text-purple-400" />;
    return <File className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1700px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#0d1424]/80 p-3.5 rounded-xl border border-white/[0.08] backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
            <FolderTree className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight">Architectural Layer & File Distribution</h3>
            <p className="text-[11px] text-slate-400">Directory boundaries classified by AST heuristics</p>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-300 bg-white/[0.05] px-3 py-1 rounded-lg border border-white/[0.08]">
          {allFiles.length} Mapped Source Files
        </span>
      </div>

      {/* Layers Accordion List */}
      <div className="space-y-3">
        {layers.map((layer) => {
          const isExpanded = !!expandedLayers[layer.name];
          return (
            <div
              key={layer.name}
              className="bg-[#0b1220]/90 border border-white/[0.08] hover:border-white/[0.14] rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              {/* Header Trigger */}
              <button
                onClick={() => toggleLayer(layer.name)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-md bg-white/[0.05]">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-sky-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-bold text-white tracking-tight">{layer.name}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 font-semibold">
                        {layer.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{layer.description}</p>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-300 bg-[#070b16] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                  {layer.filePaths.length} {layer.filePaths.length === 1 ? 'file' : 'files'}
                </div>
              </button>

              {/* Collapsible Files List */}
              {isExpanded && (
                <div className="p-4 bg-[#070b16] border-t border-white/[0.06] space-y-1.5 max-h-72 overflow-y-auto font-mono text-xs">
                  {layer.filePaths.length > 0 ? (
                    layer.filePaths.map((filePath, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-white/[0.04] text-slate-300 group transition-colors"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {getFileIcon(filePath)}
                          <span className="truncate group-hover:text-white transition-colors">{filePath}</span>
                        </div>

                        <button
                          onClick={() => handleCopy(filePath)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white"
                          title="Copy file path"
                        >
                          {copiedFile === filePath ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic p-3 text-center">
                      No files directly assigned to this layer.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

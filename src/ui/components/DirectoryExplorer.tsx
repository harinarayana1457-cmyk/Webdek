import React, { useState } from 'react';
import { File, Layers, ChevronRight, ChevronDown } from 'lucide-react';
import { ArchitectureLayer } from '../../engine/types';

interface DirectoryExplorerProps {
  layers: ArchitectureLayer[];
  allFiles: string[];
}

export const DirectoryExplorer: React.FC<DirectoryExplorerProps> = ({ layers, allFiles }) => {
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({
    [layers[0]?.name || '']: true
  });

  const toggleLayer = (name: string) => {
    setExpandedLayers((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>Architectural Layer Distribution & Source Files</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Total Mapped Files: {allFiles.length}
        </span>
      </div>

      <div className="space-y-3">
        {layers.map((layer) => {
          const isExpanded = !!expandedLayers[layer.name];
          return (
            <div
              key={layer.name}
              className="bg-[#0e1628] border border-slate-800 rounded-xl overflow-hidden transition-colors"
            >
              {/* Header */}
              <button
                onClick={() => toggleLayer(layer.name)}
                className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-sky-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{layer.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                        {layer.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{layer.description}</p>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  {layer.filePaths.length} files
                </div>
              </button>

              {/* Files inside layer */}
              {isExpanded && (
                <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 space-y-1.5 max-h-64 overflow-y-auto font-mono text-xs">
                  {layer.filePaths.length > 0 ? (
                    layer.filePaths.map((filePath, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-800/50 text-slate-300 group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <File className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                          <span className="truncate">{filePath}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Layer Member
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic p-2">
                      No files directly mapped to this layer.
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

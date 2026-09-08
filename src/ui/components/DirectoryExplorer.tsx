import React, { useState } from 'react';
import {
  File,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  FileCode,
  FileJson,
  FolderTree,
  Zap
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
    if (path.endsWith('.json')) return <FileJson className="w-4 h-4 text-[#ffd100]" />;
    if (path.endsWith('.tsx') || path.endsWith('.jsx')) return <FileCode className="w-4 h-4 text-sky-400" />;
    if (path.endsWith('.ts') || path.endsWith('.js')) return <FileCode className="w-4 h-4 text-[#0066cc]" />;
    if (path.endsWith('.css')) return <File className="w-4 h-4 text-[#e00034]" />;
    if (path.endsWith('.md')) return <File className="w-4 h-4 text-amber-400" />;
    return <File className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Header Hub */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rb-widget p-5 rounded-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e00034] to-[#091c38] border border-[#e00034]/40 flex items-center justify-center shadow-rb-red">
            <FolderTree className="w-5 h-5 text-[#ffd100]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-white tracking-tight uppercase font-sans italic">
                PADDOCK DIRECTORY & SECTOR HIERARCHY
              </h3>
              <span className="rb-racing-badge text-[10px] font-mono px-2 py-0.5 rounded bg-[#ffd100] text-[#051329] font-black">
                <span>INDEXED</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Source files partitioned across decoupled aerodynamic architecture boundaries</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-white bg-[#0e2447] px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-[#ffd100] fill-[#ffd100]" />
            <span>{allFiles.length} Source Files Indexed</span>
          </span>
        </div>
      </div>

      {/* Layers Accordion List */}
      <div className="space-y-4">
        {layers.map((layer) => {
          const isExpanded = !!expandedLayers[layer.name];
          return (
            <div
              key={layer.name}
              className="rb-widget rounded-2xl overflow-hidden transition-all duration-200"
            >
              {/* Header Trigger */}
              <button
                onClick={() => toggleLayer(layer.name)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-[#0e2447] border border-white/10">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#ffd100]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-white tracking-tight font-sans">
                        {layer.name}
                      </span>
                      <span className="rb-racing-badge text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#e00034]/20 text-[#ffd100] border border-[#e00034]/50 font-black">
                        <span>{layer.role}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{layer.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-300 bg-[#0e2447] px-3.5 py-1.5 rounded-xl border border-white/10">
                    {layer.filePaths.length} {layer.filePaths.length === 1 ? 'file' : 'files'}
                  </span>
                </div>
              </button>

              {/* Collapsible Files List */}
              {isExpanded && (
                <div className="p-5 bg-[#051329]/90 border-t border-white/10 space-y-2 max-h-80 overflow-y-auto font-mono text-xs">
                  {layer.filePaths.length > 0 ? (
                    layer.filePaths.map((filePath, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 px-3.5 rounded-xl hover:bg-[#0e2447] text-slate-300 hover:text-white group transition-all border border-transparent hover:border-[#e00034]/40"
                      >
                        <div className="flex items-center gap-3 truncate">
                          {getFileIcon(filePath)}
                          <span className="truncate transition-colors font-medium">
                            {filePath}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopy(filePath)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-400 hover:text-[#ffd100] rounded-lg hover:bg-white/10"
                          title="Copy file path"
                        >
                          {copiedFile === filePath ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400 italic p-4 text-center">
                      No files directly assigned to this sector.
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

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
    if (path.endsWith('.json')) return <FileJson className="w-4 h-4 text-amber-600" />;
    if (path.endsWith('.tsx') || path.endsWith('.jsx')) return <FileCode className="w-4 h-4 text-blue-600" />;
    if (path.endsWith('.ts') || path.endsWith('.js')) return <FileCode className="w-4 h-4 text-indigo-600" />;
    if (path.endsWith('.css')) return <File className="w-4 h-4 text-pink-600" />;
    if (path.endsWith('.md')) return <File className="w-4 h-4 text-purple-600" />;
    return <File className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Header Hub */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-soft-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
            <FolderTree className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Architectural Directory & File Hierarchy</h3>
            <p className="text-[11px] text-slate-500">File distribution classified into decoupled architectural responsibility boundaries</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-200">
          {allFiles.length} Indexed Source Files
        </span>
      </div>

      {/* Layers Accordion List */}
      <div className="space-y-4">
        {layers.map((layer) => {
          const isExpanded = !!expandedLayers[layer.name];
          return (
            <div
              key={layer.name}
              className="bg-white border border-slate-200 hover:border-blue-300 rounded-3xl overflow-hidden transition-all duration-200 shadow-soft-md"
            >
              {/* Header Trigger */}
              <button
                onClick={() => toggleLayer(layer.name)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-extrabold text-slate-900 tracking-tight font-sans">
                        {layer.name}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                        {layer.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{layer.description}</p>
                  </div>
                </div>

                <div className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200">
                  {layer.filePaths.length} {layer.filePaths.length === 1 ? 'file' : 'files'}
                </div>
              </button>

              {/* Collapsible Files List */}
              {isExpanded && (
                <div className="p-5 bg-slate-50/70 border-t border-slate-100 space-y-2 max-h-80 overflow-y-auto font-mono text-xs">
                  {layer.filePaths.length > 0 ? (
                    layer.filePaths.map((filePath, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 px-3.5 rounded-xl hover:bg-white text-slate-700 hover:text-blue-700 group transition-all border border-transparent hover:border-slate-200 hover:shadow-soft-sm"
                      >
                        <div className="flex items-center gap-3 truncate">
                          {getFileIcon(filePath)}
                          <span className="truncate transition-colors font-medium">
                            {filePath}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopy(filePath)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                          title="Copy file path"
                        >
                          {copiedFile === filePath ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400 italic p-4 text-center">
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

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
import { animate, spring, stagger } from 'animejs';
import { useAnimeScope } from '../hooks/useAnimeScope';
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

  const { root } = useAnimeScope(() => {
    // Staggered layer card entrances
    animate('.layer-card', {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 400,
      delay: stagger(30),
      ease: spring({ bounce: 0.25 })
    });

    // Staggered file rows
    animate('.file-row', {
      opacity: [0, 1],
      translateX: [-6, 0],
      duration: 250,
      delay: stagger(15),
      ease: 'out(3)'
    });
  }, [layers.length, expandedLayers]);

  const toggleLayer = (name: string) => {
    setExpandedLayers((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedFile(path);
    setTimeout(() => setCopiedFile(null), 1500);

    animate(`#copy-file-${path.replace(/[^a-zA-Z0-9]/g, '-')}`, {
      scale: [1, 1.25, 1],
      duration: 300,
      ease: spring({ bounce: 0.5 })
    });
  };

  const getFileIcon = (path: string) => {
    if (path.endsWith('.json')) return <FileJson className="w-4 h-4 text-amber-400" />;
    if (path.endsWith('.tsx') || path.endsWith('.jsx')) return <FileCode className="w-4 h-4 text-sky-400" />;
    if (path.endsWith('.ts') || path.endsWith('.js')) return <FileCode className="w-4 h-4 text-indigo-400" />;
    if (path.endsWith('.css')) return <File className="w-4 h-4 text-rose-400" />;
    if (path.endsWith('.md')) return <File className="w-4 h-4 text-emerald-400" />;
    return <File className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div ref={root} className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Header Hub */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0b1220] p-5 rounded-2xl border border-white/[0.08] shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
            <FolderTree className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white tracking-tight font-sans">
                PROJECT FILES BY ARCHITECTURAL LAYER
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
                INDEXED
              </span>
            </div>
            <p className="text-xs text-slate-400 font-normal">Source files organized across clean architectural layer boundaries</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-slate-300 bg-[#070c18] px-3.5 py-1.5 rounded-xl border border-white/[0.08]">
            <strong className="text-white">{allFiles.length}</strong> source files
          </span>
        </div>
      </div>

      {/* Layers Accordion List */}
      <div className="space-y-3.5">
        {layers.map((layer) => {
          const isExpanded = !!expandedLayers[layer.name];
          return (
            <div
              key={layer.name}
              className="layer-card rb-widget rounded-2xl overflow-hidden transition-all duration-200"
            >
              {/* Header Trigger */}
              <button
                onClick={() => toggleLayer(layer.name)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 rounded-xl bg-[#070c18] border border-white/[0.08]">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm sm:text-base font-extrabold text-white tracking-tight font-sans">
                        {layer.name}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-bold">
                        {layer.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{layer.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-slate-400 bg-[#070c18] px-3 py-1 rounded-lg border border-white/[0.08]">
                    {layer.filePaths.length} {layer.filePaths.length === 1 ? 'file' : 'files'}
                  </span>
                </div>
              </button>

              {/* Collapsible File List */}
              {isExpanded && (
                <div className="p-4 pt-1 border-t border-white/[0.06] bg-[#070c18]/80 space-y-1.5">
                  {layer.filePaths.map((filePath, idx) => (
                    <div
                      key={idx}
                      className="file-row flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04] transition-colors font-mono text-xs group"
                    >
                      <div className="flex items-center gap-2.5 text-slate-300 group-hover:text-white truncate">
                        {getFileIcon(filePath)}
                        <span className="truncate">{filePath}</span>
                      </div>
                      <button
                        id={`copy-file-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`}
                        onClick={() => handleCopy(filePath)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white"
                        title="Copy file path"
                      >
                        {copiedFile === filePath ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DirectoryExplorer;

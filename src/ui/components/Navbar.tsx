import React from 'react';
import {
  Compass,
  FolderOpen,
  RefreshCw,
  Download,
  Search,
  Sparkles,
  Layers,
  ChevronDown,
  Box,
  FolderTree,
  X
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '../presets/sampleProjects';

interface NavbarProps {
  currentPresetId: string;
  onSelectPreset: (presetId: string) => void;
  onOpenLocalFolder: () => void;
  onRefresh: () => void;
  onExport: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isScanning: boolean;
  activeTab: 'graph' | 'stack' | 'ai' | 'files';
  onTabChange: (tab: 'graph' | 'stack' | 'ai' | 'files') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPresetId,
  onSelectPreset,
  onOpenLocalFolder,
  onRefresh,
  onExport,
  searchQuery,
  onSearchChange,
  isScanning,
  activeTab,
  onTabChange
}) => {
  return (
    <header className="border-b border-white/[0.08] bg-[#070b16]/80 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-6 py-2.5 transition-all">
      <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Brand & Workspace Picker */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-sky-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-[#090e1f] rounded-[11px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-[#070b16]"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white">ProjectLens</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold tracking-wider">
                  v1.2
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Workspace Architecture & AI Inspector</p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/[0.08] hidden sm:block mx-1" />

          {/* Workspace Preset Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={currentPresetId}
                onChange={(e) => onSelectPreset(e.target.value)}
                className="appearance-none bg-[#0e1628]/90 border border-white/[0.1] rounded-lg text-xs font-medium text-slate-200 py-1.5 pl-3 pr-8 hover:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all cursor-pointer shadow-sm"
              >
                {SAMPLE_PROJECTS.map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-[#0b1220] text-slate-200">
                    {preset.name}
                  </option>
                ))}
                {currentPresetId === 'custom' && (
                  <option value="custom" className="bg-[#0b1220] text-sky-400">
                    📁 Custom Local Workspace
                  </option>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Folder trigger */}
            <button
              onClick={onOpenLocalFolder}
              className="flex items-center gap-1.5 text-xs font-medium bg-white/[0.05] hover:bg-white/[0.09] text-slate-200 px-2.5 py-1.5 rounded-lg border border-white/[0.1] hover:border-white/[0.2] transition-all shadow-sm group"
              title="Inspect any local project folder on your machine"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Open Folder</span>
            </button>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="flex items-center bg-[#0d1424]/90 p-1 rounded-xl border border-white/[0.08] shadow-inner text-xs">
          <button
            onClick={() => onTabChange('graph')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-medium ${
              activeTab === 'graph'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Flow</span>
          </button>
          <button
            onClick={() => onTabChange('stack')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-medium ${
              activeTab === 'stack'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Why This Stack?</span>
          </button>
          <button
            onClick={() => onTabChange('ai')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-medium ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Context</span>
          </button>
          <button
            onClick={() => onTabChange('files')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-medium ${
              activeTab === 'files'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Files & Layers</span>
          </button>
        </nav>

        {/* Right Actions: Search & Export */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack, files, APIs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#0a101f]/80 border border-white/[0.08] rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/80 focus:ring-1 focus:ring-sky-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={onRefresh}
            disabled={isScanning}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 border border-white/[0.08] hover:border-white/[0.16] transition-all disabled:opacity-50"
            title="Re-analyze repository"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-sky-400' : ''}`} />
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-sky-500/15 to-indigo-500/15 hover:from-sky-500/25 hover:to-indigo-500/25 text-sky-300 border border-sky-500/30 hover:border-sky-400/50 px-3 py-1.5 rounded-lg transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

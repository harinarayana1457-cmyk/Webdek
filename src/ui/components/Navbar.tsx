import React from 'react';
import {
  Compass,
  FolderOpen,
  RefreshCw,
  Download,
  Search,
  Sparkles,
  Layers,
  ChevronDown
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
    <header className="border-b border-slate-800 bg-[#0d1322]/90 backdrop-blur sticky top-0 z-40 px-4 py-2.5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Workspace Switcher */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-bold">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white">ProjectLens</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Antigravity Inspector
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Workspace Architecture & AI Inspector</p>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-[1px] bg-slate-800 mx-1" />

          {/* Preset Selector Dropdown */}
          <div className="relative group">
            <select
              value={currentPresetId}
              onChange={(e) => onSelectPreset(e.target.value)}
              className="appearance-none bg-slate-900/90 border border-slate-700/80 rounded-lg text-xs text-slate-200 py-1.5 pl-2.5 pr-8 hover:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors cursor-pointer"
            >
              {SAMPLE_PROJECTS.map((preset) => (
                <option key={preset.id} value={preset.id} className="bg-slate-900 text-slate-200">
                  {preset.name}
                </option>
              ))}
              {currentPresetId === 'custom' && (
                <option value="custom" className="bg-slate-900 text-sky-400">
                  📁 Custom Local Workspace
                </option>
              )}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Local Folder Trigger */}
          <button
            onClick={onOpenLocalFolder}
            className="flex items-center gap-1.5 text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            title="Inspect any local folder via browser directory picker"
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Open Folder</span>
          </button>
        </div>

        {/* Center Tabs Navigation */}
        <div className="flex items-center bg-slate-900/80 p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => onTabChange('graph')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
              activeTab === 'graph'
                ? 'bg-sky-500 text-white font-medium shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Architecture Flow
          </button>
          <button
            onClick={() => onTabChange('stack')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
              activeTab === 'stack'
                ? 'bg-sky-500 text-white font-medium shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Why This Stack?</span>
          </button>
          <button
            onClick={() => onTabChange('ai')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
              activeTab === 'ai'
                ? 'bg-sky-500 text-white font-medium shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI Context
          </button>
          <button
            onClick={() => onTabChange('files')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
              activeTab === 'files'
                ? 'bg-sky-500 text-white font-medium shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Files & Layers
          </button>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack, tech, files..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          <button
            onClick={onRefresh}
            disabled={isScanning}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Re-run analysis"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-sky-400' : ''}`} />
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-1 text-xs bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2.5 py-1.5 rounded-lg transition"
            title="Export architecture report as Markdown / JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

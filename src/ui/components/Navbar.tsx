import React from 'react';
import {
  Layers,
  Sparkles,
  Box,
  FolderTree,
  FolderOpen,
  RefreshCw,
  Download,
  Search,
  ChevronDown,
  X,
  Command,
  Flame
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
  onOpenCommandPalette: () => void;
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
  onOpenCommandPalette,
  isScanning,
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'graph', label: 'Architecture Flow', icon: Layers, hotkey: '1' },
    { id: 'stack', label: 'Why This Stack?', icon: Box, hotkey: '2' },
    { id: 'ai', label: 'AI Intelligence', icon: Sparkles, hotkey: '3' },
    { id: 'files', label: 'Files & Layers', icon: FolderTree, hotkey: '4' }
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full px-4 lg:px-8 py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-[1780px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand & Workspace Selector */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Logo Mark */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-[1.5px] shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 font-sans">
                  PROJECT<span className="text-blue-600">LENS</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold tracking-wider">
                  STUDIO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Workspace Architecture & AI Inspector</p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block mx-1" />

          {/* Workspace Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={currentPresetId}
                onChange={(e) => onSelectPreset(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-xl text-xs font-semibold text-slate-800 py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm"
              >
                {SAMPLE_PROJECTS.map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-white text-slate-800">
                    {preset.name}
                  </option>
                ))}
                {currentPresetId === 'custom' && (
                  <option value="custom" className="bg-white text-blue-600">
                    ⚡ Custom Local Workspace
                  </option>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Folder Picker button */}
            <button
              onClick={onOpenLocalFolder}
              className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm group"
              title="Inspect local folder from disk via HTML5 File System API"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Open Folder</span>
            </button>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 shadow-inner text-xs order-last lg:order-none w-full lg:w-auto justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-white shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span className="hidden xl:inline text-[9px] font-mono px-1 py-0.2 rounded bg-slate-200/60 text-slate-500">
                  {tab.hotkey}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Refresh, Export */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search Input */}
          <div className="relative w-44 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack, files..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Search Button (Command Palette Trigger) */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all"
            title="Open universal search palette (⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] font-mono bg-slate-100 text-slate-500 px-1 rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={isScanning}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm transition-all disabled:opacity-50"
            title="Re-run AST scanner and classification"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          {/* Export Report */}
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-1.5 rounded-xl transition-all shadow-sm shadow-blue-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

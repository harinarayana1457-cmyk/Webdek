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
  const tabs = [
    { id: 'graph', label: 'Architecture Flow', icon: Layers, hotkey: '1' },
    { id: 'stack', label: 'Why This Stack?', icon: Box, hotkey: '2' },
    { id: 'ai', label: 'AI Intelligence', icon: Sparkles, hotkey: '3' },
    { id: 'files', label: 'Files & Layers', icon: FolderTree, hotkey: '4' }
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full px-4 lg:px-8 py-3 bg-[#030712]/75 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="max-w-[1780px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Brand & Workspace Hub */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            {/* Logo Icon Mark */}
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[1.5px] shadow-glow-cyan shadow-sm transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#070c1b] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-50" />
                  <Flame className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 ring-2 ring-[#030712]"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-sans">
                  PROJECT<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">LENS</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 font-semibold tracking-wider">
                  STUDIO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Deep Workspace & Architecture Intelligence</p>
            </div>
          </div>

          <div className="h-7 w-[1px] bg-white/[0.08] hidden sm:block mx-1" />

          {/* Workspace Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={currentPresetId}
                onChange={(e) => onSelectPreset(e.target.value)}
                className="appearance-none bg-[#091124] border border-white/[0.12] hover:border-cyan-500/50 rounded-xl text-xs font-semibold text-slate-200 py-2 pl-3.5 pr-8 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all cursor-pointer shadow-inner"
              >
                {SAMPLE_PROJECTS.map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-[#070d1e] text-slate-200">
                    {preset.name}
                  </option>
                ))}
                {currentPresetId === 'custom' && (
                  <option value="custom" className="bg-[#070d1e] text-cyan-400">
                    ⚡ Live Local Workspace
                  </option>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Folder Picker button */}
            <button
              onClick={onOpenLocalFolder}
              className="flex items-center gap-1.5 text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-white/[0.09] hover:border-white/[0.2] transition-all shadow-sm group"
              title="Inspect local folder from disk via HTML5 File System API"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Open Folder</span>
            </button>
          </div>
        </div>

        {/* Center Navigation Capsule */}
        <nav className="flex items-center bg-[#070c1a]/90 p-1.5 rounded-2xl border border-white/[0.08] shadow-2xl backdrop-blur-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-indigo-500/20 border border-cyan-500/40 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className="hidden xl:inline text-[9px] font-mono px-1 py-0.2 rounded bg-black/40 text-slate-500 border border-white/[0.04]">
                  {tab.hotkey}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Search & Actions */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stack, modules, APIs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#070d1e] border border-white/[0.09] rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            ) : (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-slate-500 pointer-events-none bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.04]">
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </div>
            )}
          </div>

          {/* Refresh Analysis */}
          <button
            onClick={onRefresh}
            disabled={isScanning}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/[0.18] transition-all disabled:opacity-50 group shadow-sm"
            title="Re-run AST scanner and classification"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-cyan-400' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          </button>

          {/* Export Report */}
          <button
            onClick={onExport}
            className="flex items-center gap-2 text-xs font-bold bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:brightness-110 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};

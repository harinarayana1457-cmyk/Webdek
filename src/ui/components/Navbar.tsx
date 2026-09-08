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
  Zap
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
    { id: 'graph', label: 'Telemetry Flow', icon: Layers, hotkey: '1' },
    { id: 'stack', label: 'Power Unit & Stack', icon: Box, hotkey: '2' },
    { id: 'ai', label: 'Pit Wall AI', icon: Sparkles, hotkey: '3' },
    { id: 'files', label: 'Paddock Files', icon: FolderTree, hotkey: '4' }
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#051329]/95 backdrop-blur-2xl border-b-2 border-[#e00034] shadow-2xl transition-all">
      <div className="max-w-[1780px] mx-auto px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Workspace Hub */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Red Bull Style Emblem */}
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e00034] via-[#ff003c] to-[#ffd100] p-[1.5px] shadow-rb-red shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#051329] rounded-[9px] flex items-center justify-center relative overflow-hidden">
                  <Zap className="w-5 h-5 text-[#ffd100] fill-[#ffd100] drop-shadow-[0_0_8px_rgba(255,209,0,0.8)]" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd100] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffd100] ring-2 ring-[#051329]"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-sans italic">
                  PROJECT<span className="text-[#e00034]">LENS</span>
                </span>
                <span className="rb-racing-badge text-[10px] uppercase font-mono px-2.5 py-0.5 rounded bg-[#e00034] text-white font-black tracking-wider shadow-sm">
                  <span>RACING HUD</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Deep Architectural Telemetry & Paddock AI</p>
            </div>
          </div>

          <div className="h-7 w-[1px] bg-white/[0.12] hidden md:block mx-1" />

          {/* Preset Selector */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={currentPresetId}
                onChange={(e) => onSelectPreset(e.target.value)}
                className="appearance-none bg-[#091d3d] border border-white/[0.12] hover:border-[#ffd100] rounded-xl text-xs font-bold text-slate-100 py-2 pl-3.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#e00034]/50 transition-all cursor-pointer shadow-inner"
              >
                {SAMPLE_PROJECTS.map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-[#051329] text-white">
                    {preset.name}
                  </option>
                ))}
                {currentPresetId === 'custom' && (
                  <option value="custom" className="bg-[#051329] text-[#ffd100]">
                    ⚡ Custom Paddock Workspace
                  </option>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Folder Picker button */}
            <button
              onClick={onOpenLocalFolder}
              className="flex items-center gap-1.5 text-xs font-bold bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 px-3 py-2 rounded-xl border border-white/[0.1] hover:border-[#ffd100] transition-all shadow-sm group"
              title="Inspect local folder from disk via HTML5 File System API"
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#ffd100] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Open Folder</span>
            </button>
          </div>
        </div>

        {/* Center: Red Bull Racing Nav Tabs */}
        <nav className="flex items-center bg-[#071733] p-1.5 rounded-2xl border border-white/[0.1] shadow-inner text-xs order-last lg:order-none w-full lg:w-auto justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`rb-racing-badge relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#e00034] via-[#ff003c] to-[#c7002e] shadow-rb-red font-extrabold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffd100]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`hidden xl:inline text-[9px] font-mono px-1 py-0.2 rounded font-bold ${isActive ? 'bg-black/30 text-[#ffd100]' : 'bg-white/[0.08] text-slate-400'}`}>
                  {tab.hotkey}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search, Refresh, Export */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Inline Quick Search */}
          <div className="relative w-44 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search telemetry, stack..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#081b3a] hover:bg-[#0a2145] focus:bg-[#0a2145] border border-white/[0.12] rounded-xl pl-9 pr-7 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#ffd100] focus:ring-1 focus:ring-[#ffd100]/50 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Search Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 text-xs font-bold bg-[#091d3d] hover:bg-[#0e2752] text-slate-200 px-3.5 py-2 rounded-xl border border-white/[0.12] hover:border-[#ffd100] transition-all shadow-sm"
            title="Open universal search palette (⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-[#ffd100]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] font-mono bg-black/40 text-[#ffd100] px-1.5 py-0.5 rounded border border-white/[0.08]">
              ⌘K
            </kbd>
          </button>

          {/* Refresh Analysis */}
          <button
            onClick={onRefresh}
            disabled={isScanning}
            className="p-2 rounded-xl bg-[#091d3d] hover:bg-[#0e2752] text-slate-200 hover:text-white border border-white/[0.12] hover:border-[#ffd100] transition-all disabled:opacity-50"
            title="Re-run telemetry scanner"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin text-[#ffd100]' : ''}`} />
          </button>

          {/* Export Report in Red Bull Crimson */}
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#e00034] to-[#ff003c] hover:brightness-110 text-white px-4 py-2 rounded-xl transition-all shadow-rb-red shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

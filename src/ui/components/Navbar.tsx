import React from 'react';
import {
  Layers,
  Sparkles,
  Box,
  FolderTree,
  FolderOpen,
  RefreshCw,
  Download,
  ChevronDown,
  Command,
  Zap,
  BookOpen
} from 'lucide-react';
import { animate, spring } from 'animejs';
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
  activeTab: 'graph' | 'stack' | 'ai' | 'files' | 'explain';
  onTabChange: (tab: 'graph' | 'stack' | 'ai' | 'files' | 'explain') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPresetId,
  onSelectPreset,
  onOpenLocalFolder,
  onRefresh,
  onExport,
  onOpenCommandPalette,
  isScanning,
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'graph', label: 'Architecture Map', icon: Layers, hotkey: '1', desc: 'Visual component graph' },
    { id: 'stack', label: 'Tech Stack & Libraries', icon: Box, hotkey: '2', desc: 'Packages and engines' },
    { id: 'ai', label: 'AI Assistant Setup', icon: Sparkles, hotkey: '3', desc: 'Rules and MCP tools' },
    { id: 'files', label: 'Project Files', icon: FolderTree, hotkey: '4', desc: 'Directory structure' },
    { id: 'explain', label: 'Simple Guide & FAQ', icon: BookOpen, hotkey: '5', desc: 'Everyday analogies' }
  ] as const;

  const handleEmblemClick = () => {
    animate('#rb-emblem', {
      rotate: [-12, 12, -6, 6, 0],
      scale: [1, 1.15, 1],
      duration: 500,
      ease: spring({ bounce: 0.6 })
    });
  };

  const handleTabClick = (tabId: 'graph' | 'stack' | 'ai' | 'files' | 'explain') => {
    onTabChange(tabId);
    animate(`#tab-${tabId}`, {
      scale: [0.95, 1],
      duration: 350,
      ease: spring({ bounce: 0.5 })
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#051329]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl transition-all">
      {/* Top Utility Bar: Brand, Project Switcher, Quick Actions */}
      <div className="border-b border-white/[0.06] bg-[#040e1f]/90">
        <div className="max-w-[1780px] mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <div id="rb-emblem" onClick={handleEmblemClick} className="relative group cursor-pointer" title="ProjectLens">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#e00034] via-[#ff003c] to-[#ffd100] p-[1.5px] shadow-rb-red shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#051329] rounded-[9px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#ffd100] fill-[#ffd100] drop-shadow-[0_0_6px_rgba(255,209,0,0.8)]" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-sans italic">
                  PROJECT<span className="text-[#e00034]">LENS</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#e00034]/20 border border-[#e00034]/40 text-[#ff4d6d] font-bold">
                  WORKSPACE INSPECTOR
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Software Architecture Visualizer & AI Readiness</p>
            </div>
          </div>

          {/* Center: Clean Workspace / Project Picker */}
          <div className="flex items-center gap-2 bg-[#06142a] p-1 rounded-xl border border-white/[0.1] shadow-inner">
            <span className="text-[11px] font-mono text-slate-400 font-bold pl-2.5 hidden md:inline">
              Project:
            </span>
            <div className="relative">
              <select
                value={currentPresetId}
                onChange={(e) => onSelectPreset(e.target.value)}
                className="appearance-none bg-[#091d3d] hover:bg-[#0e2752] border border-white/[0.08] hover:border-[#ffd100] rounded-lg text-xs font-bold text-slate-100 py-1.5 pl-3 pr-7 focus:outline-none focus:ring-1 focus:ring-[#ffd100] transition-all cursor-pointer"
              >
                {SAMPLE_PROJECTS.map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-[#051329] text-white">
                    {preset.name}
                  </option>
                ))}
                {currentPresetId === 'custom' && (
                  <option value="custom" className="bg-[#051329] text-[#ffd100]">
                    📁 Custom Local Project
                  </option>
                )}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Folder Picker button */}
            <button
              onClick={onOpenLocalFolder}
              className="flex items-center gap-1.5 text-xs font-bold bg-[#091d3d] hover:bg-[#0e2752] text-slate-200 px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-[#ffd100] transition-all group"
              title="Inspect local project folder from your computer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#ffd100] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Open Folder</span>
            </button>
          </div>

          {/* Right: Universal Search, Refresh, Export */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 text-xs font-semibold bg-[#091d3d] hover:bg-[#0e2752] text-slate-200 px-3 py-1.5 rounded-lg border border-white/[0.1] hover:border-[#ffd100] transition-all shadow-sm"
              title="Quick Search (⌘K / Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-[#ffd100]" />
              <span className="hidden md:inline">Search Everything</span>
              <kbd className="text-[10px] font-mono bg-black/40 text-[#ffd100] px-1.5 py-0.2 rounded border border-white/[0.08]">
                ⌘K
              </kbd>
            </button>

            {/* Refresh Analysis */}
            <button
              onClick={onRefresh}
              disabled={isScanning}
              className="p-1.5 rounded-lg bg-[#091d3d] hover:bg-[#0e2752] text-slate-300 hover:text-white border border-white/[0.1] hover:border-[#ffd100] transition-all disabled:opacity-50"
              title="Re-scan project"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin text-[#ffd100]' : ''}`} />
            </button>

            {/* Export Report in Red Bull Crimson */}
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#e00034] to-[#ff003c] hover:brightness-110 text-white px-3.5 py-1.5 rounded-lg transition-all shadow-rb-red shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar: Clean, uncluttered tabs */}
      <div className="max-w-[1780px] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between">
        <nav className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none w-full sm:w-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#e00034] via-[#ff003c] to-[#c7002e] shadow-rb-red font-extrabold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
                title={tab.desc}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#ffd100]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  isActive ? 'bg-black/30 text-[#ffd100]' : 'bg-white/[0.08] text-slate-400'
                }`}>
                  {tab.hotkey}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Quick Hint */}
        <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-200 border border-white/[0.08] font-bold">1</kbd>
          <span>-</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-200 border border-white/[0.08] font-bold">5</kbd>
          <span>to switch views</span>
        </div>
      </div>
    </header>
  );
};

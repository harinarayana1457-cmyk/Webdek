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
  BookOpen,
  Compass
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
    { id: 'graph', label: 'Architecture & Flow', icon: Layers, hotkey: '1', desc: 'Visual component map and data flow' },
    { id: 'stack', label: "What It's Made Of", icon: Box, hotkey: '2', desc: 'Frameworks, packages, and libraries' },
    { id: 'ai', label: 'AI Setup & Configs', icon: Sparkles, hotkey: '3', desc: 'Coding agent rules, MCP tools & secrets' },
    { id: 'files', label: 'File Structure', icon: FolderTree, hotkey: '4', desc: 'Layered directory explorer' },
    { id: 'explain', label: 'Plain English Guide', icon: BookOpen, hotkey: '5', desc: 'Everyday analogies and simple FAQ' }
  ] as const;

  const handleEmblemClick = () => {
    animate('#brand-logo', {
      rotate: [-8, 8, -4, 4, 0],
      scale: [1, 1.12, 1],
      duration: 450,
      ease: spring({ bounce: 0.5 })
    });
  };

  const handleTabClick = (tabId: 'graph' | 'stack' | 'ai' | 'files' | 'explain') => {
    onTabChange(tabId);
    animate(`#tab-${tabId}`, {
      scale: [0.96, 1],
      duration: 300,
      ease: spring({ bounce: 0.4 })
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080d1a]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl transition-all">
      {/* Top Level: Brand, Prominent Folder Picker, and Actions */}
      <div className="border-b border-white/[0.06] bg-[#070b16]/90">
        <div className="max-w-[1780px] mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          {/* Brand Logo & Description */}
          <div className="flex items-center gap-3 shrink-0">
            <div id="brand-logo" onClick={handleEmblemClick} className="cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#080d1a] rounded-[9px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-indigo-400 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-sans">
                  Project<span className="text-indigo-400">Lens</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold">
                  Codebase Inspector
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Instant Architecture & Tech Stack Intelligence
              </p>
            </div>
          </div>

          {/* Center: Prominent Local Folder Picker & Demo Select */}
          <div className="flex items-center gap-2.5">
            {/* Primary Action: Open Local Folder Button */}
            <button
              onClick={onOpenLocalFolder}
              className="flex items-center gap-2 text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] group cursor-pointer border border-indigo-400/30"
              title="Inspect any folder on your computer with 100% browser privacy"
            >
              <FolderOpen className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition-transform" />
              <span>Scan Local Folder</span>
            </button>

            {/* Demo Project Selector */}
            <div className="flex items-center gap-1.5 bg-[#0e1626] px-2 py-1 rounded-xl border border-white/[0.08]">
              <span className="text-[11px] font-mono text-slate-400 pl-1.5 hidden md:inline">
                Demo:
              </span>
              <div className="relative">
                <select
                  value={currentPresetId}
                  onChange={(e) => onSelectPreset(e.target.value)}
                  className="appearance-none bg-[#131d31] hover:bg-[#18243c] border border-white/[0.08] hover:border-indigo-400/50 rounded-lg text-xs font-semibold text-slate-200 py-1.5 pl-2.5 pr-7 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-all cursor-pointer"
                >
                  {SAMPLE_PROJECTS.map((preset) => (
                    <option key={preset.id} value={preset.id} className="bg-[#0b1220] text-white">
                      {preset.name}
                    </option>
                  ))}
                  {currentPresetId === 'custom' && (
                    <option value="custom" className="bg-[#0b1220] text-indigo-300">
                      📁 Custom Folder
                    </option>
                  )}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right: Quick Search, Re-scan, Export */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 text-xs font-medium bg-[#0e1626] hover:bg-[#141f36] text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-indigo-400/40 transition-all shadow-sm"
              title="Search components, dependencies, or files (⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Search</span>
              <kbd className="text-[10px] font-mono bg-black/40 text-indigo-300 px-1.5 py-0.2 rounded border border-white/[0.08]">
                ⌘K
              </kbd>
            </button>

            {/* Refresh Scanner */}
            <button
              onClick={onRefresh}
              disabled={isScanning}
              className="p-2 rounded-lg bg-[#0e1626] hover:bg-[#141f36] text-slate-300 hover:text-white border border-white/[0.08] hover:border-indigo-400/40 transition-all disabled:opacity-50"
              title="Re-scan current project"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            {/* Export Report */}
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 text-xs font-bold bg-[#131d31] hover:bg-[#192742] text-slate-200 hover:text-white px-3.5 py-1.5 rounded-lg border border-white/[0.1] hover:border-white/20 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-[1780px] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between">
        <nav className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none w-full sm:w-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'text-white bg-indigo-600 shadow-md shadow-indigo-500/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
                title={tab.desc}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-black/30 text-indigo-200' : 'bg-white/[0.08] text-slate-400'
                }`}>
                  {tab.hotkey}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Subtle Hotkey Tip */}
        <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-200 border border-white/[0.08] font-bold">1</kbd>
          <span>-</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-200 border border-white/[0.08] font-bold">5</kbd>
          <span>for quick navigation</span>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

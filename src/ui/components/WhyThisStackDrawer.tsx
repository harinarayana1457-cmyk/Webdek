import React, { useState } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Tag,
  ArrowUpDown,
  Copy,
  Check,
  Sparkles,
  Search
} from 'lucide-react';
import { animate, spring, stagger } from 'animejs';
import { useAnimeScope } from '../hooks/useAnimeScope';
import { DetectedDependency, TechCategory } from '../../engine/types';

interface WhyThisStackDrawerProps {
  dependencies: DetectedDependency[];
  searchQuery: string;
}

const CATEGORY_TABS: { label: string; value: TechCategory | 'all'; color: string }[] = [
  { label: 'All Packages', value: 'all', color: 'bg-white' },
  { label: 'UI & Frameworks', value: 'ui', color: 'bg-indigo-400' },
  { label: 'State & Logic', value: 'state', color: 'bg-sky-400' },
  { label: 'APIs & Network', value: 'api', color: 'bg-emerald-400' },
  { label: 'AI & LLMs', value: 'ai', color: 'bg-rose-400' },
  { label: 'Databases & ORMs', value: 'database', color: 'bg-purple-400' },
  { label: 'Styling & CSS', value: 'styling', color: 'bg-pink-400' },
  { label: 'Build & Tooling', value: 'build', color: 'bg-amber-400' },
  { label: 'Testing & QA', value: 'testing', color: 'bg-teal-400' }
];

export const WhyThisStackDrawer: React.FC<WhyThisStackDrawerProps> = ({
  dependencies,
  searchQuery: initialSearch
}) => {
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'all'>('all');
  const [localSearch, setLocalSearch] = useState(initialSearch || '');
  const [sortBy, setSortBy] = useState<'significance' | 'name'>('significance');
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);

  const filtered = dependencies.filter((dep) => {
    const matchesCategory = activeCategory === 'all' || dep.category === activeCategory;
    const q = localSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      dep.name.toLowerCase().includes(q) ||
      dep.purpose.toLowerCase().includes(q) ||
      dep.significance.toLowerCase().includes(q) ||
      dep.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const significanceOrder: Record<string, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    utility: 1
  };

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'significance') {
      const diff = (significanceOrder[b.level] || 0) - (significanceOrder[a.level] || 0);
      if (diff !== 0) return diff;
    }
    return a.name.localeCompare(b.name);
  });

  const { root } = useAnimeScope(() => {
    animate('.stack-card', {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 400,
      delay: stagger(30),
      ease: 'out(3)'
    });
  }, [activeCategory, sortBy, localSearch, dependencies.length]);

  const handleCopy = (pkgName: string) => {
    navigator.clipboard.writeText(pkgName);
    setCopiedPkg(pkgName);
    setTimeout(() => setCopiedPkg(null), 1500);

    animate(`#copy-${pkgName.replace(/[^a-zA-Z0-9]/g, '-')}`, {
      scale: [1, 1.25, 1],
      duration: 300,
      ease: spring({ bounce: 0.5 })
    });
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-rose-500/15 text-rose-300 border border-rose-500/30';
      case 'high':
        return 'bg-amber-500/15 text-amber-300 border border-amber-500/30';
      case 'medium':
        return 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border border-slate-500/30';
    }
  };

  return (
    <div ref={root} className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Category Pills & Quick Filter Hub */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0b1220] p-4 rounded-2xl border border-white/[0.08] shadow-lg">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {CATEGORY_TABS.map((tab) => {
            const count =
              tab.value === 'all'
                ? dependencies.length
                : dependencies.filter((d) => d.category === tab.value).length;
            if (count === 0 && tab.value !== 'all') return null;

            const isActive = activeCategory === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 font-bold'
                    : 'bg-[#070c18] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : tab.color}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/30 text-indigo-200' : 'bg-white/[0.08] text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Inline Search & Sort */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Quick Search Input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter packages..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#070c18] border border-white/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300 shrink-0 font-mono">
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400 text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#070c18] border border-white/[0.08] hover:border-indigo-400 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none cursor-pointer font-medium"
            >
              <option value="significance">Impact / Significance</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((dep, index) => (
          <div
            key={`${dep.name}-${index}`}
            className="stack-card rb-widget rounded-2xl p-5 flex flex-col justify-between group overflow-hidden"
          >
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-white group-hover:text-indigo-300 transition-colors font-mono tracking-tight">
                      {dep.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {dep.version || 'installed'}
                    </span>
                    <button
                      id={`copy-${dep.name.replace(/[^a-zA-Z0-9]/g, '-')}`}
                      onClick={() => handleCopy(dep.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/[0.08] rounded text-slate-400 hover:text-white"
                      title="Copy package name"
                    >
                      {copiedPkg === dep.name ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 border border-white/[0.06] font-medium">
                      {dep.category}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-bold ${getLevelBadge(dep.level)}`}>
                      {dep.level} impact
                    </span>
                  </div>
                </div>

                <div>
                  {dep.isHeuristic ? (
                    <span
                      className="flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-medium"
                      title="Inferred package"
                    >
                      <HelpCircle className="w-3 h-3" />
                      Inferred
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium"
                      title="Directly verified in project manifest"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Functional Purpose Box */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                  What this does in this project:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#070c18] p-3 rounded-xl border border-white/[0.06] font-normal">
                  {dep.purpose}
                </p>
              </div>

              {/* Architectural Significance Box */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 font-bold block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Why it matters & Architectural Role:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#070c18] p-3 rounded-xl border border-white/[0.06] font-normal">
                  {dep.significance}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Tag className="w-3 h-3 text-slate-400" />
                {dep.source}
              </span>

              {dep.docsUrl && (
                <a
                  href={dep.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  <span>Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="p-12 text-center text-slate-400 bg-[#0b1220] rounded-2xl border border-white/[0.08]">
          <p className="text-xs font-mono">No packages found matching your filter criteria.</p>
        </div>
      )}
    </div>
  );
};
export default WhyThisStackDrawer;

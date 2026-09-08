import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Tag,
  ArrowUpDown,
  Copy,
  Check
} from 'lucide-react';
import { DetectedDependency, TechCategory } from '../../engine/types';

interface WhyThisStackDrawerProps {
  dependencies: DetectedDependency[];
  searchQuery: string;
}

const CATEGORY_TABS: { label: string; value: TechCategory | 'all'; color: string }[] = [
  { label: 'All Items', value: 'all', color: 'bg-slate-800 text-slate-200' },
  { label: 'UI Frameworks', value: 'ui', color: 'bg-sky-500/10 text-sky-400' },
  { label: 'State & Store', value: 'state', color: 'bg-cyan-500/10 text-cyan-400' },
  { label: 'APIs & Data', value: 'api', color: 'bg-indigo-500/10 text-indigo-400' },
  { label: 'AI & Agents', value: 'ai', color: 'bg-rose-500/10 text-rose-400' },
  { label: 'Databases & ORMs', value: 'database', color: 'bg-purple-500/10 text-purple-400' },
  { label: 'Styling & Design', value: 'styling', color: 'bg-pink-500/10 text-pink-400' },
  { label: 'Build & Tooling', value: 'build', color: 'bg-amber-500/10 text-amber-400' },
  { label: 'Testing & QA', value: 'testing', color: 'bg-emerald-500/10 text-emerald-400' }
];

export const WhyThisStackDrawer: React.FC<WhyThisStackDrawerProps> = ({
  dependencies,
  searchQuery
}) => {
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'significance' | 'name'>('significance');
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);

  const filtered = dependencies.filter((dep) => {
    const matchesCategory = activeCategory === 'all' || dep.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
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

  const handleCopy = (pkgName: string) => {
    navigator.clipboard.writeText(pkgName);
    setCopiedPkg(pkgName);
    setTimeout(() => setCopiedPkg(null), 1500);
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'medium':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      default:
        return 'bg-slate-700/30 text-slate-400 border-slate-700/50';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1700px] mx-auto">
      {/* Category Pills & Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#0d1424]/80 p-3.5 rounded-xl border border-white/[0.08] backdrop-blur-md">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {CATEGORY_TABS.map((tab) => {
            const count =
              tab.value === 'all'
                ? dependencies.length
                : dependencies.filter((d) => d.category === tab.value).length;
            if (count === 0 && tab.value !== 'all') return null;

            return (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                  activeCategory === tab.value
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeCategory === tab.value ? 'bg-black/30 text-white font-bold' : 'bg-white/[0.08] text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs text-slate-400 self-end md:self-auto shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0a101f] border border-white/[0.1] rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
          >
            <option value="significance">Architectural Significance</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((dep, index) => (
          <div
            key={`${dep.name}-${index}`}
            className="bg-[#0b1220]/90 border border-white/[0.08] hover:border-sky-500/40 rounded-2xl p-5 transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/[0.03] rounded-full blur-2xl group-hover:bg-sky-500/[0.08] transition-all" />

            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors font-mono">
                      {dep.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">
                      {dep.version || 'installed'}
                    </span>
                    <button
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
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] font-semibold">
                      {dep.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold ${getLevelBadge(
                        dep.level
                      )}`}
                    >
                      {dep.level} impact
                    </span>
                  </div>
                </div>

                <div>
                  {dep.isHeuristic ? (
                    <span
                      className="flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20"
                      title="Heuristically inferred package"
                    >
                      <HelpCircle className="w-3 h-3" />
                      Heuristic
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium"
                      title="Deterministic Verified Catalog Match"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Functional Purpose */}
              <div className="mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Functional Role
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#070b16] p-3 rounded-xl border border-white/[0.06]">
                  {dep.purpose}
                </p>
              </div>

              {/* Architectural Significance */}
              <div className="mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  Why This Tool & Architectural Impact
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-sky-950/20 p-3 rounded-xl border border-sky-500/20">
                  {dep.significance}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <Tag className="w-3 h-3 text-slate-500" />
                {dep.source}
              </span>

              {dep.docsUrl && (
                <a
                  href={dep.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium"
                >
                  <span>Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="col-span-full p-12 text-center bg-[#0d1424]/40 rounded-2xl border border-white/[0.08] text-slate-400 text-xs">
            No stack items match the selected category or search filter.
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { DetectedDependency, TechCategory } from '../../engine/types';

interface WhyThisStackDrawerProps {
  dependencies: DetectedDependency[];
  searchQuery: string;
}

const CATEGORY_TABS: { label: string; value: TechCategory | 'all' }[] = [
  { label: 'All Stack Items', value: 'all' },
  { label: 'UI Frameworks', value: 'ui' },
  { label: 'State & Store', value: 'state' },
  { label: 'APIs & Data', value: 'api' },
  { label: 'AI & Agents', value: 'ai' },
  { label: 'Databases & ORMs', value: 'database' },
  { label: 'Styling & Design', value: 'styling' },
  { label: 'Build & Tooling', value: 'build' },
  { label: 'Testing & QA', value: 'testing' }
];

export const WhyThisStackDrawer: React.FC<WhyThisStackDrawerProps> = ({
  dependencies,
  searchQuery
}) => {
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'significance' | 'name'>('significance');

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

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'medium':
        return 'bg-sky-500/10 text-sky-300 border-sky-500/30';
      default:
        return 'bg-slate-700/30 text-slate-400 border-slate-700/50';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
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
                className={`px-2.5 py-1 rounded-md text-xs transition flex items-center gap-1.5 ${
                  activeCategory === tab.value
                    ? 'bg-sky-500 text-white font-medium shadow-sm shadow-sky-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    activeCategory === tab.value ? 'bg-sky-700 text-sky-100' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort Trigger */}
        <div className="flex items-center gap-2 text-xs text-slate-400 self-end md:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-sky-500"
          >
            <option value="significance">Architectural Significance</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {sorted.map((dep, index) => (
          <div
            key={`${dep.name}-${index}`}
            className="bg-[#0e1628] border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition-all duration-200 shadow-sm flex flex-col justify-between group"
          >
            <div>
              {/* Header: Title, Category, Level, Verification Tag */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-white group-hover:text-sky-300 transition-colors">
                      {dep.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {dep.version || 'installed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {dep.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border font-semibold ${getLevelBadgeClass(
                        dep.level
                      )}`}
                    >
                      {dep.level} impact
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {dep.isHeuristic ? (
                    <span
                      className="flex items-center gap-1 text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
                      title="Heuristically inferred package"
                    >
                      <HelpCircle className="w-3 h-3" />
                      Heuristic
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-1 text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                      title="Deterministic Verified Catalog Match"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      Catalog Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Functional Purpose */}
              <div className="mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                  Functional Role
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
                  {dep.purpose}
                </p>
              </div>

              {/* Architectural Significance */}
              <div className="mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400/90 font-semibold block mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  Why This Tool & Architectural Impact
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-sky-950/15 p-2.5 rounded-lg border border-sky-900/30">
                  {dep.significance}
                </p>
              </div>
            </div>

            {/* Footer: Source file, tags, docs */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <Tag className="w-3 h-3 text-slate-400" />
                {dep.source}
              </span>

              {dep.docsUrl && (
                <a
                  href={dep.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline transition"
                >
                  <span>Docs</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="col-span-full p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-xs">
            No stack items match the current filter or search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

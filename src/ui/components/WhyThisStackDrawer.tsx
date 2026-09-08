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

const CATEGORY_TABS: { label: string; value: TechCategory | 'all'; dotColor: string }[] = [
  { label: 'All Stack Items', value: 'all', dotColor: 'bg-slate-800' },
  { label: 'UI & Meta-Frameworks', value: 'ui', dotColor: 'bg-blue-600' },
  { label: 'State & Store', value: 'state', dotColor: 'bg-indigo-600' },
  { label: 'APIs & Networking', value: 'api', dotColor: 'bg-cyan-600' },
  { label: 'AI & Agentic SDKs', value: 'ai', dotColor: 'bg-rose-600' },
  { label: 'Databases & ORMs', value: 'database', dotColor: 'bg-purple-600' },
  { label: 'Styling Systems', value: 'styling', dotColor: 'bg-pink-600' },
  { label: 'Build & Bundlers', value: 'build', dotColor: 'bg-amber-600' },
  { label: 'Testing & QA', value: 'testing', dotColor: 'bg-emerald-600' }
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
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'high':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Category Pills & Filter Hub */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-soft-sm">
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
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-bold scale-[1.02]'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : tab.dotColor}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-blue-800 text-white' : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs text-slate-500 self-end md:self-auto shrink-0 font-mono">
          <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-xl px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="significance">Architectural Significance</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sorted.map((dep, index) => (
          <div
            key={`${dep.name}-${index}`}
            className="bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-6 transition-all duration-200 shadow-soft-md hover:shadow-soft-lg flex flex-col justify-between group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors font-mono tracking-tight">
                      {dep.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {dep.version || 'installed'}
                    </span>
                    <button
                      onClick={() => handleCopy(dep.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700"
                      title="Copy package name"
                    >
                      {copiedPkg === dep.name ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                      {dep.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border font-bold ${getLevelBadge(
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
                      className="flex items-center gap-1.5 text-[10px] font-mono text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-semibold"
                      title="Heuristically inferred package"
                    >
                      <HelpCircle className="w-3 h-3" />
                      Heuristic
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-1.5 text-[10px] font-mono text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-semibold shadow-soft-sm"
                      title="Deterministic Verified Catalog Match"
                    >
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      Catalog Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Functional Purpose Box */}
              <div className="mb-3.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1.5">
                  Functional Purpose in Project
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {dep.purpose}
                </p>
              </div>

              {/* Architectural Significance Box */}
              <div className="mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 font-bold block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Why This Tool & Architectural Impact
                </span>
                <p className="text-xs text-blue-950 leading-relaxed bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200/80">
                  {dep.significance}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                {dep.source}
              </span>

              {dep.docsUrl && (
                <a
                  href={dep.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline transition-all font-semibold"
                >
                  <span>Official Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="col-span-full p-16 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs font-mono">
            No stack items match the selected category or search filter.
          </div>
        )}
      </div>
    </div>
  );
};

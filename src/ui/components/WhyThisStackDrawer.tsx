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
  { label: 'All Stack Items', value: 'all', dotColor: 'bg-white' },
  { label: 'UI & Meta-Frameworks', value: 'ui', dotColor: 'bg-cyan-400' },
  { label: 'State & Store', value: 'state', dotColor: 'bg-indigo-400' },
  { label: 'APIs & Networking', value: 'api', dotColor: 'bg-blue-400' },
  { label: 'AI & Agentic SDKs', value: 'ai', dotColor: 'bg-rose-400' },
  { label: 'Databases & ORMs', value: 'database', dotColor: 'bg-purple-400' },
  { label: 'Styling Systems', value: 'styling', dotColor: 'bg-pink-400' },
  { label: 'Build & Bundlers', value: 'build', dotColor: 'bg-amber-400' },
  { label: 'Testing & QA', value: 'testing', dotColor: 'bg-emerald-400' }
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
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-sm';
      case 'high':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-sm';
      case 'medium':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-sm';
      default:
        return 'bg-slate-700/25 text-slate-400 border-slate-700/50';
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Category Pills & Filter Hub */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#070c1a]/90 p-4 rounded-2xl border border-white/[0.08] shadow-2xl backdrop-blur-xl">
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
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-glow-cyan font-bold scale-[1.02]'
                    : 'bg-[#050917] text-slate-300 hover:bg-white/[0.06] border border-white/[0.07] hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tab.dotColor}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/[0.08] text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs text-slate-400 self-end md:self-auto shrink-0 font-mono">
          <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#050917] border border-white/[0.1] hover:border-cyan-500/50 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
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
            className="bg-gradient-to-br from-[#091126]/90 via-[#070d1e]/90 to-[#040814]/90 border border-white/[0.09] hover:border-cyan-500/40 rounded-3xl p-6 transition-all duration-300 shadow-2xl hover:shadow-glow-cyan flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/[0.03] rounded-full blur-3xl group-hover:bg-cyan-500/[0.09] transition-all duration-500 pointer-events-none" />

            <div>
              {/* Header: Title, Category, Level, Verification Tag */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors font-mono tracking-tight">
                      {dep.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-500">
                      {dep.version || 'installed'}
                    </span>
                    <button
                      onClick={() => handleCopy(dep.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/[0.08] rounded-md text-slate-400 hover:text-white"
                      title="Copy package name"
                    >
                      {copiedPkg === dep.name ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] font-bold">
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
                      className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25 font-semibold"
                      title="Heuristically inferred package"
                    >
                      <HelpCircle className="w-3 h-3" />
                      Heuristic
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/25 font-semibold shadow-sm"
                      title="Deterministic Verified Catalog Match"
                    >
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
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
                <p className="text-xs text-slate-200 leading-relaxed bg-[#040814] p-3.5 rounded-2xl border border-white/[0.06]">
                  {dep.purpose}
                </p>
              </div>

              {/* Architectural Significance Box */}
              <div className="mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Why This Tool & Architectural Impact
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-cyan-950/25 p-3.5 rounded-2xl border border-cyan-500/20">
                  {dep.significance}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                {dep.source}
              </span>

              {dep.docsUrl && (
                <a
                  href={dep.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline transition-all font-semibold"
                >
                  <span>Official Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="col-span-full p-16 text-center bg-[#070c1a]/60 rounded-3xl border border-white/[0.08] text-slate-400 text-xs font-mono">
            No stack items match the selected category or search filter.
          </div>
        )}
      </div>
    </div>
  );
};

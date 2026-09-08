import React, { useState } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Tag,
  ArrowUpDown,
  Copy,
  Check,
  Flame
} from 'lucide-react';
import { DetectedDependency, TechCategory } from '../../engine/types';

interface WhyThisStackDrawerProps {
  dependencies: DetectedDependency[];
  searchQuery: string;
}

const CATEGORY_TABS: { label: string; value: TechCategory | 'all'; dotColor: string }[] = [
  { label: 'All Components', value: 'all', dotColor: 'bg-white' },
  { label: 'UI & Meta-Frameworks', value: 'ui', dotColor: 'bg-[#ffd100]' },
  { label: 'State & Store', value: 'state', dotColor: 'bg-[#00a3ff]' },
  { label: 'APIs & Networking', value: 'api', dotColor: 'bg-[#10b981]' },
  { label: 'AI & Agentic SDKs', value: 'ai', dotColor: 'bg-[#e00034]' },
  { label: 'Databases & ORMs', value: 'database', dotColor: 'bg-[#a855f7]' },
  { label: 'Styling Systems', value: 'styling', dotColor: 'bg-[#f43f5e]' },
  { label: 'Build & Tooling', value: 'build', dotColor: 'bg-[#ffd100]' },
  { label: 'Testing & QA', value: 'testing', dotColor: 'bg-[#059669]' }
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
        return 'bg-[#e00034] text-white border-[#ff003c] shadow-rb-red';
      case 'high':
        return 'bg-[#ffd100] text-black border-[#ffb800] font-black';
      case 'medium':
        return 'bg-[#092247] text-[#00a3ff] border-[#00a3ff]/40';
      default:
        return 'bg-white/[0.08] text-slate-300 border-white/[0.1]';
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1780px] mx-auto">
      {/* Category Pills & Filter Hub */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#081b3a] p-4 rounded-2xl border border-white/[0.1] shadow-2xl backdrop-blur-xl">
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
                className={`rb-racing-badge px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#e00034] via-[#ff003c] to-[#c7002e] text-white shadow-rb-red font-black scale-[1.02]'
                    : 'bg-[#051329] text-slate-200 hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#ffd100]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#ffd100]' : tab.dotColor}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/40 text-[#ffd100]' : 'bg-white/[0.08] text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs text-slate-300 self-end md:self-auto shrink-0 font-mono">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#ffd100]" />
          <span className="font-bold">Sort Spec:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#051329] border border-white/[0.12] hover:border-[#ffd100] rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#ffd100] transition-colors cursor-pointer font-bold"
          >
            <option value="significance">Horsepower & Significance</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sorted.map((dep, index) => (
          <div
            key={`${dep.name}-${index}`}
            className="rb-widget rounded-3xl p-6 flex flex-col justify-between group overflow-hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-black text-base text-white group-hover:text-[#ffd100] transition-colors font-mono tracking-tight italic">
                      {dep.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 font-bold">
                      {dep.version || 'installed'}
                    </span>
                    <button
                      onClick={() => handleCopy(dep.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/[0.1] rounded-md text-slate-300 hover:text-white"
                      title="Copy package name"
                    >
                      {copiedPkg === dep.name ? (
                        <Check className="w-3.5 h-3.5 text-[#ffd100]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/[0.08] text-slate-200 border border-white/[0.1] font-extrabold">
                      {dep.category}
                    </span>
                    <span
                      className={`rb-racing-badge text-[10px] font-mono uppercase px-2.5 py-0.5 rounded border font-black ${getLevelBadge(
                        dep.level
                      )}`}
                    >
                      <span>{dep.level} impact</span>
                    </span>
                  </div>
                </div>

                <div>
                  {dep.isHeuristic ? (
                    <span
                      className="flex items-center gap-1.5 text-[10px] font-mono text-[#ffd100] bg-[#ffd100]/10 px-3 py-1 rounded-full border border-[#ffd100]/30 font-bold"
                      title="Heuristically inferred package"
                    >
                      <HelpCircle className="w-3 h-3" />
                      Heuristic
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-1.5 text-[10px] font-mono text-white bg-[#e00034] px-3 py-1 rounded-full border border-[#ff003c] font-black shadow-rb-red"
                      title="Deterministic Verified Catalog Match"
                    >
                      <ShieldCheck className="w-3 h-3 text-[#ffd100]" />
                      Telemetry Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Functional Purpose Box */}
              <div className="mb-3.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffd100] font-black block mb-1.5">
                  Component Purpose & Role
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#040e1f] p-3.5 rounded-2xl border border-white/[0.08] font-medium">
                  {dep.purpose}
                </p>
              </div>

              {/* Architectural Significance Box */}
              <div className="mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white font-black block mb-1.5 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#e00034]" />
                  Why Chosen & Architectural Impact
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#091a38] p-3.5 rounded-2xl border border-[#e00034]/30 font-medium">
                  {dep.significance}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Tag className="w-3.5 h-3.5 text-[#ffd100]" />
                {dep.source}
              </span>

              {dep.docsUrl && (
                <a
                  href={dep.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#ffd100] hover:text-white hover:underline transition-all font-bold"
                >
                  <span>Component Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="col-span-full p-16 text-center rb-widget rounded-3xl text-slate-400 text-xs font-mono">
            No components match the selected telemetry category or search filter.
          </div>
        )}
      </div>
    </div>
  );
};

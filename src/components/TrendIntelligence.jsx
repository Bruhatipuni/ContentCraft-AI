import React, { useState } from 'react';
import { 
  TrendingUp, 
  Hash, 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Lightbulb, 
  BookOpen, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { trendingTopics, viralHookFormulas } from '../data/trendData';

export function TrendIntelligence({ activeBrand, onUseTrendInRepurposer }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedTag, setCopiedTag] = useState(null);
  const [copiedHookId, setCopiedHookId] = useState(null);

  const categories = ['All', 'AI & Tech', 'D2C & Consumer', 'Fintech & Economy', 'Creator Economy'];

  const filteredTrends = selectedCategory === 'All'
    ? trendingTopics
    : trendingTopics.filter(t => t.category.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 4)));

  const handleCopyTag = (tag) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  };

  const handleCopyHook = (hook) => {
    navigator.clipboard.writeText(hook.structure);
    setCopiedHookId(hook.id);
    setTimeout(() => setCopiedHookId(null), 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Feature 6 · Real-Time Intel
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Trend & Hashtag Intelligence</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            Trending Topics & Viral Hook Radar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Real-time viral momentum signals, category-specific hashtags, and high-retention hook formulas to boost distribution.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shadow-xs'
                  : 'bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Topics Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
          <Flame className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Active Surge Topics (Last 24 Hours)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTrends.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800/90 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.momentum}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100 leading-snug">
                  {item.topic}
                </h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Suggested Content Angles */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/70 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                    High-Converting Angles:
                  </span>
                  {item.suggestedAngles.map((angle, i) => (
                    <div key={i} className="text-xs text-slate-800 dark:text-neutral-300 flex items-start space-x-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{angle}</span>
                    </div>
                  ))}
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.hashtags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleCopyTag(tag)}
                      className="px-2 py-0.5 rounded bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 hover:border-emerald-500/40 text-[11px] text-slate-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors flex items-center space-x-1 shadow-2xs"
                    >
                      <Hash className="w-2.5 h-2.5 text-slate-400 dark:text-neutral-500" />
                      <span>{tag.replace('#', '')}</span>
                      {copiedTag === tag && <Check className="w-2.5 h-2.5 text-emerald-500 dark:text-emerald-400 ml-0.5" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-neutral-500">
                  Target: <strong className="text-slate-800 dark:text-neutral-300">{activeBrand?.name || 'Your Brand'}</strong>
                </span>
                <button
                  onClick={() => onUseTrendInRepurposer(item.suggestedAngles[0] || item.topic)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <span>Build Campaign</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viral Hook Formulas Library */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Proven Viral Hook Formulas (A/B Tested)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-neutral-500">
              Plug your product or niche into these battle-tested opening structures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {viralHookFormulas.map((hook) => (
            <div
              key={hook.id}
              className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-2.5 flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {hook.name}
                  </span>
                  <button
                    onClick={() => handleCopyHook(hook)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200 flex items-center space-x-1 font-semibold"
                  >
                    {copiedHookId === hook.id ? <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHookId === hook.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-800 dark:text-neutral-200 bg-slate-50 dark:bg-neutral-950 p-2.5 rounded-lg border border-slate-200 dark:border-neutral-800/80 font-mono leading-relaxed">
                  "{hook.structure}"
                </p>

                <div>
                  <span className="text-[10px] text-slate-500 dark:text-neutral-500 font-bold uppercase block">Example:</span>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400 italic">"{hook.example}"</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onUseTrendInRepurposer(hook.example)}
                  className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                  <span>Use in Repurposer</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

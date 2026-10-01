import React, { useState } from 'react';
import { 
  CopyCheck, 
  Sparkles, 
  Copy, 
  Check, 
  CalendarPlus, 
  Gauge, 
  ArrowRight, 
  FlaskConical, 
  Share2,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { geminiService } from '../services/geminiService';

export function VariationsStudio({ activeBrand, onSendToCalendar, onSendToRepurposer }) {
  const [coreIdea, setCoreIdea] = useState(
    'Why traditional content creation is broken and how our unified studio saves 14 hours every week.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState([]);
  const [copiedIdx, setCopiedIdx] = useState(null);

  React.useEffect(() => {
    loadVariations();
  }, [activeBrand]);

  const loadVariations = async () => {
    setIsGenerating(true);
    const data = await geminiService.generateVariations(coreIdea, activeBrand);
    setVariations(data);
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const data = await geminiService.generateVariations(coreIdea, activeBrand);
    setVariations(data);
    setIsGenerating(false);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleCopy = (v, idx) => {
    const fullText = `${v.hook}\n\n${v.body}\n\n${v.cta}`;
    navigator.clipboard.writeText(fullText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
              Feature 9 · A/B Testing
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">One-Click Content Variations</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            Psychological Angle Generator (A/B Matrix)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Generate 6 distinct psychological marketing angles from 1 idea to A/B test hooks, resonance, and conversion rates.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !coreIdea.trim()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02] disabled:opacity-50 self-start sm:self-auto"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating 6 Angles...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate 6 Angles</span>
            </>
          )}
        </button>
      </div>

      {/* Input Brief Bar */}
      <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
          <FlaskConical className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span>Core Campaign Message / Value Proposition</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={coreIdea}
            onChange={(e) => setCoreIdea(e.target.value)}
            placeholder="Enter the core thesis, product feature, or marketing angle..."
            className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-neutral-200 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs font-bold shrink-0 transition-colors"
          >
            Update Matrix
          </button>
        </div>
      </div>

      {/* 6 Variations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {variations.map((v, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover rounded-xl p-5 border border-slate-200 dark:border-neutral-800/80 flex flex-col justify-between space-y-4 shadow-2xs"
          >
            <div className="space-y-3">
              {/* Card Top: Angle Name and AI Score */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                  {v.angle}
                </span>
                <div className="flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{v.score}/100</span>
                </div>
              </div>

              {/* Tag */}
              <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400/90 flex items-center space-x-1">
                <span>🎯 Best For:</span>
                <span className="text-slate-800 dark:text-neutral-300">{v.tag}</span>
              </div>

              {/* Hook */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800/70">
                <span className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase font-bold block mb-0.5">Opening Hook:</span>
                <p className="text-xs text-slate-900 dark:text-neutral-100 font-bold leading-relaxed">
                  "{v.hook}"
                </p>
              </div>

              {/* Body */}
              <div className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line font-sans">
                {v.body}
              </div>

              {/* CTA */}
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/60 text-xs text-slate-600 dark:text-neutral-400">
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase block">Call to Action:</span>
                <p className="text-slate-900 dark:text-neutral-200 font-medium mt-0.5">👉 {v.cta}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <button
                onClick={() => handleCopy(v, idx)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIdx === idx ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={() => onSendToCalendar({
                  title: `${v.angle} Variation: ${coreIdea.slice(0, 30)}...`,
                  platform: 'linkedin',
                  content: `${v.hook}\n\n${v.body}\n\n${v.cta}`,
                  aiScore: v.score
                })}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1 transition-colors"
                title="Schedule this angle into calendar"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Schedule</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

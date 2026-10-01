import React, { useState, useEffect } from 'react';
import { 
  Gauge, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Wand2, 
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { contentScorer } from '../services/contentScorer';

export function ContentScoreModal({ isOpen, onClose, initialText = '', platform = 'linkedin', activeBrand, onApplyOptimized }) {
  if (!isOpen) return null;

  const [text, setText] = useState(initialText);
  const [scoreData, setScoreData] = useState(() => 
    contentScorer.analyzeContent(initialText, platform, activeBrand)
  );

  // Sync state whenever modal is opened or inputs change
  useEffect(() => {
    setText(initialText);
    setScoreData(contentScorer.analyzeContent(initialText, platform, activeBrand));
  }, [isOpen, initialText, platform, activeBrand]);

  const handleTextChange = (val) => {
    setText(val);
    setScoreData(contentScorer.analyzeContent(val, platform, activeBrand));
  };

  const handleApplyFix = (type) => {
    const updated = contentScorer.optimizeWithAI(text, type, activeBrand);
    setText(updated);
    setScoreData(contentScorer.analyzeContent(updated, platform, activeBrand));
    if (onApplyOptimized) {
      onApplyOptimized(updated);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 75) return 'text-amber-500 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-500 border-rose-500/40 bg-rose-500/10';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between bg-slate-50 dark:bg-neutral-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 dark:text-yellow-400">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-neutral-100 flex items-center space-x-2">
                <span>AI Content Score & Diagnostic Optimizer</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-mono font-bold">
                  {platform.toUpperCase()}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Measurable quality score and 1-click algorithmic improvements for <span className="text-amber-600 dark:text-amber-400 font-semibold">{activeBrand?.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-neutral-100 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top Score Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Big Overall Gauge */}
            <div className="sm:col-span-1 p-5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Overall Score</span>
              <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center ${getScoreColor(scoreData.overall)}`}>
                <span className="text-3xl font-black">{scoreData.overall}</span>
                <span className="text-[10px] text-slate-400 dark:text-neutral-400 font-mono">/ 100</span>
              </div>
              <p className="text-[11px] text-slate-700 dark:text-neutral-300 mt-2 font-medium">
                {scoreData.overall >= 90 ? '🌟 Viral Ready' : scoreData.overall >= 75 ? '⚡ Strong Copy' : '🔧 Needs Polish'}
              </p>
            </div>

            {/* Sub-Score Bars (2 cols) */}
            <div className="sm:col-span-2 p-5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                Quality Sub-Scores
              </span>

              {[
                { label: 'Hook Momentum', score: scoreData.hook, desc: 'First 8 words stopping power' },
                { label: 'Readability & Whitespace', score: scoreData.readability, desc: 'Sentence length & scannability' },
                { label: 'Call to Action (CTA)', score: scoreData.cta, desc: 'High-intent conversion trigger' },
                { label: 'Brand Voice Alignment', score: scoreData.brandAlignment, desc: 'Keywords and stylistic rhythm' },
                { label: 'Platform Fit', score: scoreData.platformFit, desc: 'Ideal characters & formatting' }
              ].map((sub, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-neutral-300 font-medium">{sub.label}</span>
                    <span className="font-mono text-slate-500 dark:text-neutral-400 font-semibold">{sub.score}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        sub.score >= 80 ? 'bg-emerald-500' : sub.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Actionable Suggestions & 1-Click Fixes */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Recommended 1-Click AI Optimizations</span>
            </h3>

            <div className="space-y-2.5">
              {scoreData.suggestions.map((sug, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-800 dark:text-neutral-200 flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{sug.title}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400">{sug.desc}</p>
                  </div>

                  {sug.type !== 'perfect' && (
                    <button
                      onClick={() => handleApplyFix(sug.type)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold text-xs shrink-0 flex items-center space-x-1 transition-colors self-start sm:self-auto"
                    >
                      <Wand2 className="w-3 h-3" />
                      <span>Apply Fix</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Editable Text Preview */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-neutral-400 block">
              Live Content Text (Edits will recalculate score in real-time)
            </label>
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              rows={6}
              className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl p-3 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none focus:border-amber-500 font-sans leading-relaxed transition-colors"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between bg-slate-50 dark:bg-neutral-950/60">
          <span className="text-[11px] text-slate-500 dark:text-neutral-400">
            Algorithmic score calibrated to 2026 engagement benchmarks.
          </span>
          <button
            onClick={() => {
              if (onApplyOptimized) onApplyOptimized(text);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-colors"
          >
            Confirm & Update Content
          </button>
        </div>

      </div>
    </div>
  );
}

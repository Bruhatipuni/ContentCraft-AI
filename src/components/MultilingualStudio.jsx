import React, { useState } from 'react';
import { 
  Languages, 
  Sparkles, 
  Copy, 
  Check, 
  Volume2, 
  CalendarPlus, 
  Globe2, 
  RefreshCw,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { geminiService } from '../services/geminiService';
import { voiceService } from '../services/voiceService';

export function MultilingualStudio({ activeBrand, onSendToCalendar, onSendToVoiceover }) {
  const [inputText, setInputText] = useState(
    `Most skincare brands promise overnight miracles. At ${activeBrand?.name || 'GlowSkin'}, we formulate with active Ayurvedic botanicals and skin-identical ceramides to restore your natural barrier safely in 7 nights.`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [translations, setTranslations] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  React.useEffect(() => {
    loadLanguages();
  }, [activeBrand]);

  const loadLanguages = async () => {
    setIsGenerating(true);
    const data = await geminiService.generateMultilingual(inputText, activeBrand);
    setTranslations(data);
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const data = await geminiService.generateMultilingual(inputText, activeBrand);
    setTranslations(data);
    setIsGenerating(false);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleCopy = (item, key) => {
    const fullText = `${item.headline}\n\n${item.body}\n\n${item.cta}`;
    navigator.clipboard.writeText(fullText);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSpeak = (text) => {
    voiceService.speak({ text });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Feature 12 · Regional Reach
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Multilingual Indic Campaign Studio</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            Indic & Regional Multilingual Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Generate culturally nuanced campaigns across Hindi, Hinglish, Telugu, Tamil, and Marathi while preserving <span className="text-amber-600 dark:text-amber-400 font-semibold">{activeBrand?.name}</span>'s voice.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !inputText.trim()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02] disabled:opacity-50 self-start sm:self-auto"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
              <span>Translating Regional Nuances...</span>
            </>
          ) : (
            <>
              <Globe2 className="w-4 h-4 text-neutral-950" />
              <span>Localize Campaign Now</span>
            </>
          )}
        </button>
      </div>

      {/* Input Message Card */}
      <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
          <Languages className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Master Campaign Message to Localize</span>
        </label>
        <div className="flex gap-2">
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter the core campaign message or product announcement..."
            className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg p-3 text-xs sm:text-sm text-slate-900 dark:text-neutral-200 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans transition-colors"
          />
        </div>
      </div>

      {/* Language Cards Grid */}
      {translations && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(translations).map(([key, item]) => (
            <div
              key={key}
              className="glass-panel glass-panel-hover rounded-xl p-5 border border-slate-200 dark:border-neutral-800/80 flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div className="space-y-3">
                {/* Top: Language & Flag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{item.flag}</span>
                    <span className="font-bold text-xs text-slate-900 dark:text-neutral-100">{item.lang}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 font-mono font-medium">
                    Tone Preserved
                  </span>
                </div>

                {/* Headline Hook */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800/70">
                  <span className="text-[10px] text-slate-500 dark:text-neutral-500 uppercase font-bold block mb-0.5">
                    Localized Headline:
                  </span>
                  <p className="text-xs text-slate-900 dark:text-neutral-100 font-bold leading-relaxed">
                    "{item.headline}"
                  </p>
                </div>

                {/* Body */}
                <div className="text-xs text-slate-800 dark:text-neutral-300 leading-relaxed font-sans">
                  {item.body}
                </div>

                {/* CTA */}
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/60 text-xs text-slate-700 dark:text-neutral-400">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">Call to Action:</span>
                  <p className="text-slate-900 dark:text-neutral-200 mt-0.5 font-medium">{item.cta}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleCopy(item, key)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    {copiedKey === key ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === key ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => handleSpeak(`${item.headline}. ${item.body}`)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-rose-500 border border-slate-200 dark:border-neutral-800 transition-colors"
                    title="Audition voice pronunciation"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => onSendToCalendar({
                    title: `${item.lang} Campaign: ${item.headline.slice(0, 24)}...`,
                    platform: 'instagram',
                    content: `${item.headline}\n\n${item.body}\n\n${item.cta}`,
                    aiScore: 95
                  })}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1 transition-colors"
                  title="Schedule regional post into calendar"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

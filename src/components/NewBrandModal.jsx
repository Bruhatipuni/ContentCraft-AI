import React, { useState } from 'react';
import { Plus, X, Sparkles, Palette } from 'lucide-react';
import { storageService } from '../services/storageService';

export function NewBrandModal({ isOpen, onClose, onBrandCreated }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [tagline, setTagline] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#f59e0b');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [tone, setTone] = useState('Bold, Insightful, and Visionary');
  const [targetAudience, setTargetAudience] = useState('');
  const [keywords, setKeywords] = useState('modern, authentic, high-impact');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newBrand = {
      id: `brand-${Date.now()}`,
      name: name.trim(),
      industry: industry.trim() || 'General Business',
      tagline: tagline.trim() || 'Crafting the future with intelligence',
      website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: '#eab308',
        background: '#09090b'
      },
      voice: {
        tone: tone.trim(),
        keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
        avoidWords: ['cheap', 'miracle cure'],
        targetAudience: targetAudience.trim() || 'Modern creators, founders, and consumers'
      },
      guidelines: `Keep communication crisp and aligned with ${name}'s core values.`,
      samplePosts: [
        `Excited to introduce what we've been building at ${name}. Here is what changed for our customers...`
      ]
    };

    const currentBrands = storageService.getBrands();
    const updated = [newBrand, ...currentBrands];
    storageService.saveBrands(updated);
    storageService.setActiveBrandId(newBrand.id);
    onBrandCreated(newBrand, updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Plus className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-neutral-100">
              Create New Brand Profile
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Brand Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme Studio"
              className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. SaaS / D2C"
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Brand Color</label>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-1">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="font-mono text-slate-700 dark:text-neutral-300 text-[11px] font-semibold">{primaryColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Brand Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Smarter commerce for modern retail"
              className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Tone Description</label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="e.g. Witty, technical, and empathetic"
              className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Keywords (comma separated)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="clean beauty, clinical, organic"
              className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-colors"
            >
              Create & Activate
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

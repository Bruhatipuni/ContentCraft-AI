import React, { useState } from 'react';
import { 
  FolderKanban, 
  Palette, 
  ShieldCheck, 
  Plus, 
  Check, 
  Copy, 
  FileText, 
  Sparkles, 
  Trash2, 
  Sliders, 
  Download,
  CheckCircle2
} from 'lucide-react';
import { storageService } from '../services/storageService';

export function BrandAssetLibrary({ brands, activeBrand, onSelectBrand, onUpdateBrands }) {
  const [editingBrand, setEditingBrand] = useState({ ...activeBrand });
  const [newKeyword, setNewKeyword] = useState('');
  const [newAvoidWord, setNewAvoidWord] = useState('');
  const [newSamplePost, setNewSamplePost] = useState('');
  const [copiedHex, setCopiedHex] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync when activeBrand changes
  React.useEffect(() => {
    setEditingBrand({ ...activeBrand });
  }, [activeBrand]);

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const handleSaveBrand = () => {
    const updated = brands.map(b => b.id === editingBrand.id ? editingBrand : b);
    onUpdateBrands(updated);
    storageService.saveBrands(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    const current = editingBrand.voice?.keywords || [];
    setEditingBrand({
      ...editingBrand,
      voice: {
        ...editingBrand.voice,
        keywords: [...current, newKeyword.trim()]
      }
    });
    setNewKeyword('');
  };

  const handleRemoveKeyword = (index) => {
    const current = [...(editingBrand.voice?.keywords || [])];
    current.splice(index, 1);
    setEditingBrand({
      ...editingBrand,
      voice: { ...editingBrand.voice, keywords: current }
    });
  };

  const handleAddAvoidWord = () => {
    if (!newAvoidWord.trim()) return;
    const current = editingBrand.voice?.avoidWords || [];
    setEditingBrand({
      ...editingBrand,
      voice: {
        ...editingBrand.voice,
        avoidWords: [...current, newAvoidWord.trim()]
      }
    });
    setNewAvoidWord('');
  };

  const handleRemoveAvoidWord = (index) => {
    const current = [...(editingBrand.voice?.avoidWords || [])];
    current.splice(index, 1);
    setEditingBrand({
      ...editingBrand,
      voice: { ...editingBrand.voice, avoidWords: current }
    });
  };

  const handleAddSamplePost = () => {
    if (!newSamplePost.trim()) return;
    const current = editingBrand.samplePosts || [];
    setEditingBrand({
      ...editingBrand,
      samplePosts: [...current, newSamplePost.trim()]
    });
    setNewSamplePost('');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 uppercase tracking-wider">
              Feature 7 · Consistency Hub
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Brand Asset Library & Guidelines</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            Brand Voice & Identity Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Define tone, color codes, disallowed buzzwords, and reference posts to enforce 100% brand consistency.
          </p>
        </div>

        <button
          onClick={handleSaveBrand}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          {saveSuccess ? (
            <>
              <Check className="w-4 h-4 text-neutral-950" />
              <span>Saved Brand Profile!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Save Guidelines</span>
            </>
          )}
        </button>
      </div>

      {/* Brand Profiles Carousel / Selector Bar */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
          Select Brand Profile to Manage
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {brands.map((b) => (
            <div
              key={b.id}
              onClick={() => {
                onSelectBrand(b.id);
                setEditingBrand({ ...b });
              }}
              className={`glass-panel rounded-xl p-4 border cursor-pointer transition-all flex items-center justify-between shadow-2xs ${
                activeBrand?.id === b.id
                  ? 'border-amber-500 bg-amber-500/10 shadow-md shadow-amber-500/10'
                  : 'border-slate-200 dark:border-neutral-800/80 hover:border-slate-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <span 
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-slate-300 dark:ring-neutral-700 shrink-0" 
                  style={{ backgroundColor: b.colors.primary }}
                />
                <div className="truncate">
                  <p className="font-bold text-xs text-slate-900 dark:text-neutral-200 truncate">{b.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-neutral-400 truncate">{b.industry}</p>
                </div>
              </div>
              {activeBrand?.id === b.id && (
                <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Brand Attributes & Colors (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Identity & Basic Info */}
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-3.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Core Brand Attributes</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Brand Name</label>
                <input
                  type="text"
                  value={editingBrand.name || ''}
                  onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Industry / Niche</label>
                <input
                  type="text"
                  value={editingBrand.industry || ''}
                  onChange={(e) => setEditingBrand({ ...editingBrand, industry: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Brand Tagline</label>
              <input
                type="text"
                value={editingBrand.tagline || ''}
                onChange={(e) => setEditingBrand({ ...editingBrand, tagline: e.target.value })}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Target Audience Persona</label>
              <textarea
                value={editingBrand.voice?.targetAudience || ''}
                onChange={(e) => setEditingBrand({
                  ...editingBrand,
                  voice: { ...editingBrand.voice, targetAudience: e.target.value }
                })}
                rows={2}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Palette className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>Color Hex Palette</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Primary', key: 'primary' },
                { label: 'Secondary', key: 'secondary' },
                { label: 'Accent', key: 'accent' },
                { label: 'Background', key: 'background' }
              ].map((c) => {
                const hex = editingBrand.colors?.[c.key] || '#f59e0b';
                return (
                  <div key={c.key} className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-2">
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-semibold block">{c.label}</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={hex}
                        onChange={(e) => setEditingBrand({
                          ...editingBrand,
                          colors: { ...editingBrand.colors, [c.key]: e.target.value }
                        })}
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      />
                      <button
                        onClick={() => handleCopyColor(hex)}
                        className="font-mono text-xs text-slate-800 dark:text-neutral-300 hover:text-amber-500 transition-colors flex items-center space-x-1"
                        title="Click to copy hex"
                      >
                        <span>{hex}</span>
                        {copiedHex === hex && <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Voice Guidelines & Sample Posts (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Tone & Keywords */}
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Voice Tone & Lexicon Rules</span>
            </h2>

            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Brand Tone Descriptor</label>
              <input
                type="text"
                value={editingBrand.voice?.tone || ''}
                onChange={(e) => setEditingBrand({
                  ...editingBrand,
                  voice: { ...editingBrand.voice, tone: e.target.value }
                })}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Mandatory Keywords */}
            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Encouraged Brand Keywords</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="e.g. clean beauty, micro-routine..."
                  className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleAddKeyword}
                  className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 dark:hover:bg-neutral-700 text-xs font-semibold text-slate-800 dark:text-neutral-200 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(editingBrand.voice?.keywords || []).map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium flex items-center space-x-1">
                    <span>+{kw}</span>
                    <button onClick={() => handleRemoveKeyword(i)} className="text-emerald-500 hover:text-red-500 ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Forbidden Words */}
            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Avoid / Forbidden Words (Off-Brand)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newAvoidWord}
                  onChange={(e) => setNewAvoidWord(e.target.value)}
                  placeholder="e.g. cheap, miracle cure, magic AI..."
                  className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={handleAddAvoidWord}
                  className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 dark:hover:bg-neutral-700 text-xs font-semibold text-slate-800 dark:text-neutral-200 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(editingBrand.voice?.avoidWords || []).map((aw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-[11px] font-medium flex items-center space-x-1">
                    <span>-{aw}</span>
                    <button onClick={() => handleRemoveAvoidWord(i)} className="text-red-400 hover:text-red-600 ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Guidelines Doc */}
            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block font-medium">Brand Guidelines Document</label>
              <textarea
                value={editingBrand.guidelines || ''}
                onChange={(e) => setEditingBrand({ ...editingBrand, guidelines: e.target.value })}
                rows={3}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

          </div>

          {/* Reference Sample Posts */}
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span>Reference Sample Posts (Few-Shot Rhythm)</span>
            </h2>

            <div className="space-y-2">
              {(editingBrand.samplePosts || []).map((post, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-slate-800 dark:text-neutral-300 leading-relaxed font-serif italic">
                  "{post}"
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newSamplePost}
                onChange={(e) => setNewSamplePost(e.target.value)}
                placeholder="Add a proven high-performing post for stylistic training..."
                className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddSamplePost}
                className="px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 dark:hover:bg-neutral-700 text-xs font-semibold text-slate-800 dark:text-neutral-200 transition-colors"
              >
                Add Post
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

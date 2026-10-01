import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Sparkles, 
  Heart, 
  MessageCircle, 
  Repeat, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  ThumbsUp, 
  MessageSquare,
  Wand2
} from 'lucide-react';
import { platformSpecs } from '../data/templateData';

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export function PlatformAdapter({ initialContent = '', initialPlatform = 'linkedin', activeBrand }) {
  const [platform, setPlatform] = useState(initialPlatform);
  const [content, setContent] = useState(
    initialContent ||
    `Most people treat content as disposable entertainment.\n\nHere is what our data across ${activeBrand?.name || 'ContentCraft'} taught us: Utility > Attention.\n\n3 key takeaways for teams scaling in 2026:\n\n1. Stop optimizing for passive vanity likes. Focus on High-Intent Saves and Direct Message shares.\n2. When your frameworks solve an immediate problem, your distribution compounds over weeks.\n3. Brand consistency isn't repeating a logo—it's maintaining a recognizable perspective.\n\nWhat is your team prioritizing this quarter: reach or retention?\n\n#ContentStrategy #Growth #ThoughtLeadership`
  );

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  useEffect(() => {
    if (initialPlatform) {
      setPlatform(initialPlatform);
    }
  }, [initialPlatform]);

  const [seeMore, setSeeMore] = useState(false);
  const [copied, setCopied] = useState(false);

  const charCount = content.length;
  const currentSpec = platformSpecs[platform] || platformSpecs.linkedin;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1-Click auto-format logic for platform
  const handleAutoFormat = () => {
    if (platform === 'twitter') {
      const tweets = content.split('\n\n').slice(0, 3);
      setContent(`1/3 ${tweets[0] || 'The 2026 content playbook changed completely 🧵👇'}\n\n2/3 ${tweets[1] || 'Utility-first posts get 10x more bookmarks than passive likes.'}\n\n3/3 Follow @${(activeBrand?.name || 'contentcraft').toLowerCase().replace(/\s+/g, '')} for weekly breakdown frameworks 🚀`);
    } else if (platform === 'instagram') {
      setContent(`${content.split('\n')[0] || 'The truth nobody tells you 💡👇'}\n\n${content.slice(0, 350)}...\n\nSave this checklist for your next campaign! ✨\n\n.\n.\n#${(activeBrand?.name || 'ContentCraft').replace(/\s+/g, '')} #CreatorTips #GrowthHacks #InstaGrowth #SmartMarketing #BrandIdentity #Strategy2026`);
    } else if (platform === 'linkedin') {
      setContent(`${content.split('\n')[0] || 'Here is what our data revealed:'}\n\n${content}\n\nAgree or disagree? Drop your thoughts below 👇\n\n#${(activeBrand?.name || 'ContentCraft').replace(/\s+/g, '')} #Growth #Leadership`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
              Feature 5 · Native Simulation
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Platform Format Adapter</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            Native Platform Feed Adapter
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Preview and automatically adapt content to match authentic UI layouts, character limits, and engagement patterns across platforms.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleAutoFormat}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-200 dark:border-neutral-700"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Auto-Format for {platform.toUpperCase()}</span>
          </button>
          
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-200 dark:border-neutral-800"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Platform Selector Buttons */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {[
          { id: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, color: 'text-blue-500' },
          { id: 'instagram', label: 'Instagram', icon: InstagramIcon, color: 'text-pink-500' },
          { id: 'twitter', label: 'X (Twitter)', icon: TwitterIcon, color: 'text-slate-900 dark:text-neutral-100' },
          { id: 'reel', label: 'YouTube Shorts', icon: YoutubeIcon, color: 'text-red-500' }
        ].map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => { setPlatform(p.id); setSeeMore(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                platform === p.id
                  ? 'bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-neutral-100 border border-amber-500 shadow-xs'
                  : 'bg-white dark:bg-neutral-900/80 text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-800 hover:text-slate-900 dark:hover:text-neutral-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${p.color}`} />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Text Input & Format Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-neutral-300">Draft Content</span>
              <span className={`font-mono ${charCount > currentSpec.charLimit ? 'text-red-500 font-bold' : 'text-slate-500 dark:text-neutral-400'}`}>
                {charCount} / {currentSpec.charLimit} chars
              </span>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-neutral-200 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans transition-colors"
            />
          </div>

          {/* Platform Compliance Checklist */}
          <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-2.5 text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 block">
              {currentSpec.name} Format Checklist
            </span>
            
            <div className="space-y-1.5">
              <div className="flex items-start space-x-2 text-slate-700 dark:text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Ideal Length:</strong> {currentSpec.idealLength}</span>
              </div>
              <div className="flex items-start space-x-2 text-slate-700 dark:text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Recommended Media:</strong> {currentSpec.aspectRatio}</span>
              </div>
              <div className="flex items-start space-x-2 text-slate-700 dark:text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Hashtags Rule:</strong> {currentSpec.hashtagsRule}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Native Feed Mockup (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          
          {/* LinkedIn Native Card */}
          {platform === 'linkedin' && (
            <div className="w-full max-w-[500px] bg-[#1b1f23] rounded-xl border border-neutral-700/80 shadow-2xl p-4 text-neutral-100 font-sans space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-neutral-950 text-sm shadow"
                    style={{ backgroundColor: activeBrand?.colors?.primary || '#f59e0b' }}
                  >
                    {activeBrand?.name?.slice(0, 2) || 'CC'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-xs text-white hover:underline cursor-pointer">{activeBrand?.name || 'ContentCraft AI'}</span>
                      <span className="text-[10px] text-neutral-400">• 1st</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-tight">{activeBrand?.tagline || 'AI Content Studio'}</p>
                    <p className="text-[10px] text-neutral-500">1d • Edited • 🌐</p>
                  </div>
                </div>
                <button className="text-neutral-400 hover:text-white p-1">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* LinkedIn Post Text with Truncation */}
              <div className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed">
                {seeMore ? content : content.slice(0, 190) + (content.length > 190 ? '...' : '')}
                {content.length > 190 && !seeMore && (
                  <button 
                    onClick={() => setSeeMore(true)} 
                    className="text-neutral-400 hover:text-blue-400 font-semibold ml-1 cursor-pointer"
                  >
                    ...see more
                  </button>
                )}
              </div>

              {/* Reaction Bar */}
              <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center space-x-1">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">👍</span>
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px]">💡</span>
                  <span>142</span>
                </span>
                <span>28 comments • 16 reposts</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 border-t border-neutral-700/60 grid grid-cols-4 text-center text-xs text-neutral-300 font-medium">
                <button className="py-2 hover:bg-neutral-800 rounded flex items-center justify-center space-x-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Like</span>
                </button>
                <button className="py-2 hover:bg-neutral-800 rounded flex items-center justify-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Comment</span>
                </button>
                <button className="py-2 hover:bg-neutral-800 rounded flex items-center justify-center space-x-1">
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Repost</span>
                </button>
                <button className="py-2 hover:bg-neutral-800 rounded flex items-center justify-center space-x-1">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          )}

          {/* Instagram Native Card */}
          {platform === 'instagram' && (
            <div className="w-full max-w-[420px] bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden font-sans text-xs">
              <div className="p-3 flex items-center justify-between border-b border-neutral-900">
                <div className="flex items-center space-x-2.5">
                  <div 
                    className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-pink-500"
                  >
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-bold text-[10px] text-white">
                      {activeBrand?.name?.slice(0, 1) || 'C'}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs">{activeBrand?.name?.toLowerCase().replace(/\s+/g, '') || 'contentcraft'}</span>
                    <p className="text-[10px] text-neutral-400">Bangalore, India</p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-neutral-400" />
              </div>

              {/* Visual Placeholder (4:5 Post) */}
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-neutral-900 via-neutral-950 to-amber-950/20 relative flex items-center justify-center p-6 text-center border-y border-neutral-900">
                <div className="space-y-2">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                    {activeBrand?.name || 'ContentCraft'}
                  </span>
                  <h3 className="serif-headline text-lg font-bold text-white leading-tight">
                    {content.split('\n')[0] || 'Modern Brand Playbook'}
                  </h3>
                  <p className="text-[11px] text-neutral-400 max-w-xs">
                    Swipe for full framework breakdown ➡️
                  </p>
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-[10px] text-white">
                  1/4
                </div>
              </div>

              {/* IG Engagement Bar */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-white">
                    <Heart className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                    <MessageCircle className="w-5 h-5 cursor-pointer" />
                    <Share2 className="w-5 h-5 cursor-pointer" />
                  </div>
                  <Bookmark className="w-5 h-5 text-white cursor-pointer" />
                </div>

                <p className="font-bold text-white text-[11px]">842 likes</p>

                {/* Caption */}
                <div className="text-neutral-200 text-xs leading-relaxed whitespace-pre-line">
                  <span className="font-bold text-white mr-1.5">{activeBrand?.name?.toLowerCase().replace(/\s+/g, '') || 'contentcraft'}</span>
                  {content.slice(0, 240)}...
                </div>

                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">2 HOURS AGO</p>
              </div>
            </div>
          )}

          {/* X (Twitter) Native Card */}
          {platform === 'twitter' && (
            <div className="w-full max-w-[480px] bg-black rounded-2xl border border-neutral-800 shadow-2xl p-4 font-sans text-neutral-100 text-xs space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black text-xs"
                    style={{ backgroundColor: activeBrand?.colors?.primary || '#f59e0b' }}
                  >
                    {activeBrand?.name?.slice(0, 2) || 'CC'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-white text-xs hover:underline cursor-pointer">{activeBrand?.name || 'ContentCraft AI'}</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px] font-bold">✓</span>
                      <span className="text-neutral-500 text-xs">@{activeBrand?.name?.toLowerCase().replace(/\s+/g, '') || 'contentcraft'}</span>
                      <span className="text-neutral-500">• 3h</span>
                    </div>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-neutral-500" />
              </div>

              {/* Tweet Text */}
              <div className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed font-sans">
                {content}
              </div>

              {/* Metrics */}
              <div className="pt-2 border-t border-neutral-900 text-[11px] text-neutral-500 flex items-center space-x-4">
                <span><strong>28</strong> Reposts</span>
                <span><strong>14</strong> Quotes</span>
                <span><strong>412</strong> Likes</span>
                <span><strong>89</strong> Bookmarks</span>
              </div>

              {/* Tweet Icons */}
              <div className="pt-1 border-t border-neutral-900 flex items-center justify-between text-neutral-500 text-xs px-2">
                <button className="flex items-center space-x-1 hover:text-blue-400">
                  <MessageCircle className="w-4 h-4" />
                  <span>24</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-emerald-400">
                  <Repeat className="w-4 h-4" />
                  <span>28</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-pink-500">
                  <Heart className="w-4 h-4" />
                  <span>412</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-400">
                  <Bookmark className="w-4 h-4" />
                  <span>89</span>
                </button>
                <Share2 className="w-4 h-4 hover:text-blue-400" />
              </div>
            </div>
          )}

          {/* YouTube Shorts Native Card */}
          {platform === 'reel' && (
            <div className="w-[300px] h-[540px] bg-neutral-950 rounded-3xl border-2 border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none"></div>

              {/* Top Icons */}
              <div className="relative z-20 flex items-center justify-between text-white text-xs">
                <span className="font-bold flex items-center space-x-1 text-red-500">
                  <YoutubeIcon className="w-4 h-4" />
                  <span className="text-white">Shorts</span>
                </span>
                <MoreHorizontal className="w-4 h-4 text-white" />
              </div>

              {/* Center Caption */}
              <div className="relative z-20 text-center px-2 my-auto">
                <p className="text-white text-xs font-semibold leading-relaxed drop-shadow-md bg-black/60 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  "{content.slice(0, 160)}..."
                </p>
              </div>

              {/* Right Side Shorts Floating Buttons */}
              <div className="absolute right-3 bottom-16 z-20 space-y-4 text-center text-white text-[10px]">
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-black/50 backdrop-blur-md">
                    <ThumbsUp className="w-4 h-4" />
                  </div>
                  <span>14k</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-black/50 backdrop-blur-md">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span>342</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-black/50 backdrop-blur-md">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span>Share</span>
                </div>
              </div>

              {/* Bottom Channel Details */}
              <div className="relative z-20 space-y-2 pr-12">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-xs">@{activeBrand?.name?.toLowerCase().replace(/\s+/g, '') || 'contentcraft'}</span>
                  <button className="px-2 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px]">
                    Subscribe
                  </button>
                </div>
                <p className="text-white text-[11px] line-clamp-1">
                  {content.split('\n')[0] || 'Shorts Hook Title'}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

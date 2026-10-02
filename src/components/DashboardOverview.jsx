import React from 'react';
import { 
  Sparkles, 
  Palette, 
  Video, 
  Mic, 
  Smartphone, 
  TrendingUp, 
  FolderKanban, 
  Gauge, 
  CopyCheck, 
  Calendar, 
  BrainCircuit, 
  Languages, 
  ArrowRight, 
  BarChart3, 
  Flame, 
  Award,
  Zap
} from 'lucide-react';

export function DashboardOverview({ activeBrand, onNavigateTab, calendarPosts, onOpenScoreModal }) {
  const features = [
    {
      id: 'all-in-one',
      title: '1-Click Campaign Studio',
      badge: 'Easy Mode ✨',
      icon: Zap,
      accentBorder: 'accent-border-purple',
      color: 'from-purple-500/20 via-pink-500/10 to-purple-600/20 border-purple-500/30 text-purple-400',
      description: 'Generate Social Copy, Visual Graphic, Reel Script, and Indic Translations simultaneously with 1-click scheduling.'
    },
    {
      id: 'repurposer',
      title: '1. AI Content Repurposer',
      badge: 'Core Hero ⭐',
      icon: Sparkles,
      accentBorder: 'accent-border-indigo',
      color: 'from-indigo-500/20 via-purple-500/10 to-indigo-600/20 border-indigo-500/30 text-indigo-400',
      description: 'Upload 1 article, video transcript, or note and generate LinkedIn, Instagram, X threads, Reel scripts, & emails instantly.'
    },
    {
      id: 'visuals',
      title: '2. Visual & Creative Studio',
      badge: 'Core Hero ⭐',
      icon: Palette,
      accentBorder: 'accent-border-blue',
      color: 'from-sky-500/20 via-blue-500/10 to-cyan-600/20 border-sky-500/30 text-sky-400',
      description: 'Generate high-impact post designs, banners, and thumbnails with custom aspect ratios (1:1, 4:5, 16:9, 9:16) & brand styling.'
    },
    {
      id: 'video-reel',
      title: '3. Video & Reel Generator',
      badge: 'Core Hero ⭐',
      icon: Video,
      accentBorder: 'accent-border-rose',
      color: 'from-pink-500/20 via-rose-500/10 to-pink-600/20 border-pink-500/30 text-pink-400',
      description: 'Convert scripts into short-form video storyboards with B-roll cues, captions, and an interactive 9:16 mobile simulator.'
    },
    {
      id: 'voiceover',
      title: '4. AI Voiceover Studio',
      badge: 'Audio Engine',
      icon: Mic,
      accentBorder: 'accent-border-rose',
      color: 'from-rose-500/20 via-purple-500/10 to-rose-600/20 border-rose-500/30 text-rose-400',
      description: 'Synthesize natural voiceovers with tone presets (Viral, Executive, Storyteller), speech speed control, and live playback.'
    },
    {
      id: 'platform-adapter',
      title: '5. Platform Format Adapter',
      badge: 'Native UI Feeds',
      icon: Smartphone,
      accentBorder: 'accent-border-blue',
      color: 'from-cyan-500/20 via-sky-500/10 to-cyan-600/20 border-cyan-500/30 text-cyan-400',
      description: 'Preview exactly how your posts look in authentic native LinkedIn, Instagram, X (Twitter), and YouTube Shorts interfaces.'
    },
    {
      id: 'trends',
      title: '6. Trend & Hashtag Radar',
      badge: 'Real-Time Intel',
      icon: TrendingUp,
      accentBorder: 'accent-border-emerald',
      color: 'from-emerald-500/20 via-teal-500/10 to-emerald-600/20 border-emerald-500/30 text-emerald-400',
      description: 'Discover trending topics with momentum metrics (+310%), viral hook formulas, and curated hashtag clouds.'
    },
    {
      id: 'brand-assets',
      title: '7. Brand Asset Library',
      badge: 'Consistency Hub',
      icon: FolderKanban,
      accentBorder: 'accent-border-blue',
      color: 'from-sky-500/20 via-indigo-500/10 to-sky-600/20 border-sky-500/30 text-sky-400',
      description: 'Store brand guidelines, hex color palettes, tone rules, avoid-words, and reference posts to enforce voice consistency.'
    },
    {
      id: 'content-score',
      title: '8. AI Content Score & Fixer',
      badge: 'Quality Meter',
      icon: Gauge,
      accentBorder: 'accent-border-emerald',
      color: 'from-teal-500/20 via-emerald-500/10 to-teal-600/20 border-teal-500/30 text-teal-400',
      description: 'Score hooks, readability, whitespace, CTA strength, and brand voice from 0-100 with 1-Click AI Optimizations.'
    },
    {
      id: 'variations',
      title: '9. One-Click Variations',
      badge: 'A/B Testing',
      icon: CopyCheck,
      accentBorder: 'accent-border-purple',
      color: 'from-indigo-500/20 via-purple-500/10 to-indigo-600/20 border-indigo-500/30 text-indigo-400',
      description: 'Generate 6 psychological angles (Curiosity Gap, Problem-Agitate-Solve, Contrarian, Story, Data, FOMO) for rapid testing.'
    },
    {
      id: 'calendar',
      title: '10. Content Calendar & Auto-Scheduler',
      badge: 'Workflow Pipeline',
      icon: Calendar,
      accentBorder: 'accent-border-purple',
      color: 'from-violet-500/20 via-purple-500/10 to-violet-600/20 border-violet-500/30 text-violet-400',
      description: 'Schedule, review, and plan cross-platform campaigns across visual weekly and monthly timeline calendars.'
    },
    {
      id: 'feedback-loop',
      title: '11. AI Feedback Loop & Simulator',
      badge: 'Self-Learning AI',
      icon: BrainCircuit,
      accentBorder: 'accent-border-rose',
      color: 'from-pink-500/20 via-purple-500/10 to-rose-600/20 border-pink-500/30 text-pink-400',
      description: 'Predict reach & engagement rates; feed past winners into prompt memory to continuously sharpen future generations.'
    },
    {
      id: 'multilingual',
      title: '12. Multilingual Indic Studio',
      badge: 'Regional Reach',
      icon: Languages,
      accentBorder: 'accent-border-emerald',
      color: 'from-emerald-500/20 via-teal-500/10 to-emerald-600/20 border-emerald-500/30 text-emerald-400',
      description: 'Craft culturally nuanced campaigns in English, Hindi, Hinglish, Telugu, Tamil, and Marathi while preserving brand tone.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-400/30 dark:border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/10 via-sky-500/10 to-emerald-500/10 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-black shadow-md">
              <Flame className="w-4 h-4 fill-current" />
              <span>BFWAI/HACK 26 · Team AI Verse</span>
            </div>
            
            <h1 className="serif-headline text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Crafting smarter content, campaigns, & creative ideas with AI.
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed font-medium">
              Active Studio Brand: <span className="text-purple-400 font-extrabold underline">{activeBrand?.name}</span> ({activeBrand?.industry}). 
              Turn 1 idea into high-converting, platform-tailored social assets in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('all-in-one')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-purple-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] border border-purple-400/30"
            >
              <Zap className="w-4 h-4 text-purple-200 fill-current" />
              <span>1-Click Campaign Studio</span>
            </button>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="px-5 py-3.5 rounded-2xl bg-white dark:bg-neutral-800/90 hover:bg-slate-50 dark:hover:bg-neutral-700 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md"
            >
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Publishing Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Row - Soft Pastel Themes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel accent-border-purple rounded-2xl p-5 border flex items-center space-x-4 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-wider">Assets Repurposed</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">128</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center mt-0.5">
              <span>+34 this week 🚀</span>
            </p>
          </div>
        </div>

        <div className="glass-panel accent-border-emerald rounded-2xl p-5 border flex items-center space-x-4 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-xs">
            <Gauge className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-wider">Avg Quality Score</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">94<span className="text-sm opacity-60">/100</span></p>
            <p className="text-[11px] text-purple-400 font-extrabold flex items-center mt-0.5">
              <span>Top 5% Viral Benchmark</span>
            </p>
          </div>
        </div>

        <div className="glass-panel accent-border-indigo rounded-2xl p-5 border flex items-center space-x-4 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-xs">
            <Calendar className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-wider">Scheduled Posts</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{calendarPosts.length}</p>
            <p className="text-[11px] text-indigo-400 font-extrabold flex items-center mt-0.5">
              <span>Across 4 platforms</span>
            </p>
          </div>
        </div>

        <div className="glass-panel accent-border-blue rounded-2xl p-5 border flex items-center space-x-4 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0 shadow-xs">
            <Award className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-wider">Brand Tone Match</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">98.2%</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center mt-0.5">
              <span>Zero tone violations</span>
            </p>
          </div>
        </div>
      </div>

      {/* 12 Core Features Grid */}
      <div className="space-y-5">
        <div>
          <h2 className="serif-headline text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            The AI Content Studios
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400">
            Select any studio below to start generating platform-ready, branded content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => {
                  if (feat.id === 'content-score') {
                    if (onOpenScoreModal) {
                      onOpenScoreModal(
                        `Most people treat content as disposable entertainment.\n\nHere is what our data across ${activeBrand?.name || 'ContentCraft'} taught us: Utility > Attention.\n\n3 key takeaways for teams scaling in 2026:\n1. Stop optimizing for passive vanity likes. Focus on High-Intent Saves and Direct Message shares.\n2. When your frameworks solve an immediate problem, your distribution compounds over weeks.\n3. Brand consistency isn't repeating a logo—it's maintaining a recognizable perspective.\n\nWhat is your team prioritizing this quarter: reach or retention?`,
                        'linkedin'
                      );
                    } else {
                      onNavigateTab('repurposer');
                    }
                  } else {
                    onNavigateTab(feat.id);
                  }
                }}
                className={`glass-panel glass-panel-hover ${feat.accentBorder || 'accent-border-purple'} rounded-3xl p-6 cursor-pointer border group flex flex-col justify-between shadow-lg transition-all`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border bg-gradient-to-br ${feat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 shadow-2xs">
                      {feat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors flex items-center space-x-1.5">
                      <span>{feat.title}</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1.5 line-clamp-3 leading-relaxed font-medium">
                      {feat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/80 dark:border-neutral-800/80 flex items-center justify-between text-xs font-extrabold text-slate-500 dark:text-neutral-400 group-hover:text-purple-400 transition-colors">
                  <span>Open Studio</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hackathon Problem & Solution Card + Upcoming Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hackathon Problem & Solution Card */}
        <div className="lg:col-span-1 glass-panel accent-border-purple rounded-3xl p-6 border space-y-3 shadow-lg">
          <div className="flex items-center space-x-2 text-purple-400 font-extrabold">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Problem Statement PS 02</span>
          </div>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
            Why ContentCraft AI Wins
          </h4>
          <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed font-medium">
            Creators waste 14+ hours rewriting posts for different platforms and maintaining disjointed brand guidelines. ContentCraft AI solves this through a unified prompt engine that synchronizes text, audio, visuals, and scheduling into one seamless studio.
          </p>
          <div className="pt-3 border-t border-slate-200/80 dark:border-neutral-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 font-bold">
            <span>Team Verse: Bruhati, Shashank, Dayakar</span>
            <span className="text-purple-400">v1.0 Hackathon Ready</span>
          </div>
        </div>

        {/* Recent Scheduled Posts */}
        <div className="lg:col-span-2 glass-panel accent-border-indigo rounded-3xl p-6 border space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span className="text-base font-extrabold">Upcoming Scheduled Queue</span>
            </div>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-xs text-purple-400 hover:underline flex items-center space-x-1 font-extrabold"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {calendarPosts.slice(0, 3).map((post) => (
              <div 
                key={post.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-3 text-xs hover:border-purple-400 transition-colors shadow-2xs"
              >
                <div className="flex items-center space-x-3 truncate">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                    post.platform === 'linkedin' ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' :
                    post.platform === 'instagram' ? 'bg-pink-500/15 text-pink-400 border border-pink-500/30' :
                    post.platform === 'twitter' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                    'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                  }`}>
                    {post.platform}
                  </span>
                  <div className="truncate">
                    <p className="font-extrabold text-slate-900 dark:text-white truncate">{post.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 truncate">{post.content}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-neutral-300">{post.date}</p>
                    <p className="text-[10px] text-slate-400 dark:text-neutral-500 font-mono">{post.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                    post.status === 'Scheduled' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                    post.status === 'Approved' ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' :
                    'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

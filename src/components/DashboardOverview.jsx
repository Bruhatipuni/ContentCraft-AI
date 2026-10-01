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
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-500',
      description: 'Generate Social Copy, Visual Graphic, Reel Script, and Indic Translations simultaneously with 1-click scheduling.'
    },
    {
      id: 'repurposer',
      title: '1. AI Content Repurposer',
      badge: 'Core Hero ⭐',
      icon: Sparkles,
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-500',
      description: 'Upload 1 article, video transcript, or note and generate LinkedIn, Instagram, X threads, Reel scripts, & emails instantly.'
    },
    {
      id: 'visuals',
      title: '2. Visual & Creative Studio',
      badge: 'Core Hero ⭐',
      icon: Palette,
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-500',
      description: 'Generate high-impact post designs, banners, and thumbnails with custom aspect ratios (1:1, 4:5, 16:9, 9:16) & brand styling.'
    },
    {
      id: 'video-reel',
      title: '3. Video & Reel Generator',
      badge: 'Core Hero ⭐',
      icon: Video,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-500',
      description: 'Convert scripts into short-form video storyboards with B-roll cues, captions, and an interactive 9:16 mobile simulator.'
    },
    {
      id: 'voiceover',
      title: '4. AI Voiceover Studio',
      badge: 'Audio Engine',
      icon: Mic,
      color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-500',
      description: 'Synthesize natural voiceovers with tone presets (Viral, Executive, Storyteller), speech speed control, and live playback.'
    },
    {
      id: 'platform-adapter',
      title: '5. Platform Format Adapter',
      badge: 'Native UI Feeds',
      icon: Smartphone,
      color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-500',
      description: 'Preview exactly how your posts look in authentic native LinkedIn, Instagram, X (Twitter), and YouTube Shorts interfaces.'
    },
    {
      id: 'trends',
      title: '6. Trend & Hashtag Radar',
      badge: 'Real-Time Intel',
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-500',
      description: 'Discover trending topics with momentum metrics (+310%), viral hook formulas, and curated hashtag clouds.'
    },
    {
      id: 'brand-assets',
      title: '7. Brand Asset Library',
      badge: 'Consistency Hub',
      icon: FolderKanban,
      color: 'from-amber-500/20 to-orange-600/10 border-amber-500/30 text-amber-500',
      description: 'Store brand guidelines, hex color palettes, tone rules, avoid-words, and reference posts to enforce voice consistency.'
    },
    {
      id: 'content-score',
      title: '8. AI Content Score & Fixer',
      badge: 'Quality Meter',
      icon: Gauge,
      color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-600',
      description: 'Score hooks, readability, whitespace, CTA strength, and brand voice from 0-100 with 1-Click AI Optimizations.'
    },
    {
      id: 'variations',
      title: '9. One-Click Variations',
      badge: 'A/B Testing',
      icon: CopyCheck,
      color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-500',
      description: 'Generate 6 psychological angles (Curiosity Gap, Problem-Agitate-Solve, Contrarian, Story, Data, FOMO) for rapid testing.'
    },
    {
      id: 'calendar',
      title: '10. Content Calendar & Auto-Scheduler',
      badge: 'Workflow Pipeline',
      icon: Calendar,
      color: 'from-violet-500/20 to-purple-600/10 border-violet-500/30 text-violet-500',
      description: 'Schedule, review, and plan cross-platform campaigns across visual weekly and monthly timeline calendars.'
    },
    {
      id: 'feedback-loop',
      title: '11. AI Feedback Loop & Simulator',
      badge: 'Self-Learning AI',
      icon: BrainCircuit,
      color: 'from-pink-500/20 to-rose-600/10 border-pink-500/30 text-pink-500',
      description: 'Predict reach & engagement rates; feed past winners into prompt memory to continuously sharpen future generations.'
    },
    {
      id: 'multilingual',
      title: '12. Multilingual Indic Studio',
      badge: 'Regional Reach',
      icon: Languages,
      color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-500',
      description: 'Craft culturally nuanced campaigns in English, Hindi, Hinglish, Telugu, Tamil, and Marathi while preserving brand tone.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-neutral-950 p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>BFWAI/HACK 26 · Team AI Verse</span>
            </div>
            
            <h1 className="serif-headline text-2xl sm:text-4xl font-bold text-slate-900 dark:text-neutral-100 tracking-tight leading-tight">
              Crafting smarter content, campaigns, & creative ideas with AI.
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed">
              Active Studio Brand: <span className="text-amber-600 dark:text-amber-400 font-bold">{activeBrand?.name}</span> ({activeBrand?.industry}). 
              Turn 1 idea into high-converting, platform-tailored social assets in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigateTab('all-in-one')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>1-Click Campaign Studio</span>
            </button>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="px-4 py-3 rounded-xl bg-white dark:bg-neutral-800/80 hover:bg-slate-50 dark:hover:bg-neutral-700/80 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Publishing Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">Assets Repurposed</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-neutral-100">128</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center mt-0.5 font-semibold">
              <span>+34 this week</span>
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 sm:p-5 border flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
            <Gauge className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">Avg Quality Score</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-neutral-100">94<span className="text-sm opacity-60">/100</span></p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center mt-0.5 font-semibold">
              <span>Top 5% Viral Benchmark</span>
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 sm:p-5 border flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">Scheduled Posts</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-neutral-100">{calendarPosts.length}</p>
            <p className="text-[11px] text-slate-500 dark:text-neutral-400 flex items-center mt-0.5 font-medium">
              <span>Across 4 platforms</span>
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 sm:p-5 border flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">Brand Tone Match</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-neutral-100">98.2%</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center mt-0.5 font-semibold">
              <span>Zero tone violations</span>
            </p>
          </div>
        </div>
      </div>

      {/* 12 Core Features Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="serif-headline text-xl sm:text-2xl font-bold text-slate-900 dark:text-neutral-100">
              The AI Content Studios
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400">
              Select any studio to start generating platform-ready, branded content.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="glass-panel glass-panel-hover rounded-2xl p-5 cursor-pointer border group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${feat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700/50">
                      {feat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100 group-hover:text-amber-500 transition-colors flex items-center space-x-1.5">
                      <span>{feat.title}</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1.5 line-clamp-3 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-neutral-800/60 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-neutral-400 group-hover:text-amber-500 transition-colors">
                  <span>Open Studio</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide Context & Upcoming Schedule Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hackathon Problem & Solution Card */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-5 border space-y-3">
          <div className="flex items-center space-x-2 text-amber-500 font-bold">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Problem Statement S 02</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-neutral-100">
            Why ContentCraft AI Wins
          </h4>
          <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
            Creators waste 14+ hours rewriting posts for different platforms and maintaining disjointed brand guidelines. ContentCraft AI solves this through a unified prompt engine that synchronizes text, audio, visuals, and scheduling into one seamless studio.
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-neutral-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
            <span>Team Members: Bruhati, Shashank, Dayakar</span>
            <span className="text-amber-500 font-bold">v1.0 Ready</span>
          </div>
        </div>

        {/* Recent Scheduled Posts */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-800 dark:text-neutral-200">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-bold">Upcoming Scheduled Queue</span>
            </div>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-xs text-amber-500 hover:underline flex items-center space-x-1 font-bold"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {calendarPosts.slice(0, 3).map((post) => (
              <div 
                key={post.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-3 text-xs hover:border-slate-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center space-x-3 truncate">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                    post.platform === 'linkedin' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
                    post.platform === 'instagram' ? 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20' :
                    post.platform === 'twitter' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20' :
                    'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                  }`}>
                    {post.platform}
                  </span>
                  <div className="truncate">
                    <p className="font-bold text-slate-900 dark:text-neutral-200 truncate">{post.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 truncate">{post.content}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-neutral-300">{post.date}</p>
                    <p className="text-[10px] text-slate-400 dark:text-neutral-500">{post.time}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    post.status === 'Scheduled' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                    post.status === 'Approved' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
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

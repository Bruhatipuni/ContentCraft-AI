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
  LayoutDashboard,
  Zap,
  ChevronRight,
  X
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  onNavigateTab, 
  activeBrand, 
  onOpenNewBrandModal, 
  isMobileOpen,
  onCloseMobile,
  themeMode = 'dark'
}) {
  const isLight = themeMode === 'light';

  const navigationGroups = [
    {
      title: 'WORKSPACE',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      items: [
        { id: 'overview', label: 'Dashboard & Metrics', icon: LayoutDashboard, color: 'text-indigo-400', activeBg: 'from-indigo-600 to-violet-600 text-white' },
      ]
    },
    {
      title: 'CREATION ENGINE',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      items: [
        { id: 'repurposer', label: 'Content Repurposer', icon: Sparkles, color: 'text-purple-400', activeBg: 'from-purple-600 to-pink-600 text-white' },
        { id: 'variations', label: 'A/B Angle Generator', icon: CopyCheck, color: 'text-violet-400', activeBg: 'from-violet-600 to-indigo-600 text-white' },
        { id: 'multilingual', label: 'Indic Multilingual Studio', icon: Languages, color: 'text-teal-400', activeBg: 'from-teal-600 to-emerald-600 text-white' },
      ]
    },
    {
      title: 'MEDIA & FORMATS',
      badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
      items: [
        { id: 'visuals', label: 'Visual & Ad Designer', icon: Palette, color: 'text-sky-400', activeBg: 'from-sky-600 to-blue-600 text-white' },
        { id: 'video-reel', label: 'Video & Reel Storyboard', icon: Video, color: 'text-rose-400', activeBg: 'from-pink-600 to-rose-600 text-white' },
        { id: 'voiceover', label: 'AI Voiceover Studio', icon: Mic, color: 'text-purple-400', activeBg: 'from-purple-600 to-violet-600 text-white' },
        { id: 'platform-adapter', label: 'Native Feed Previews', icon: Smartphone, color: 'text-cyan-400', activeBg: 'from-cyan-600 to-blue-600 text-white' },
      ]
    },
    {
      title: 'PLANNING & GROWTH',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      items: [
        { id: 'calendar', label: 'Publishing Calendar', icon: Calendar, color: 'text-emerald-400', activeBg: 'from-emerald-600 to-teal-600 text-white' },
        { id: 'trends', label: 'Trend & Viral Radar', icon: TrendingUp, color: 'text-teal-400', activeBg: 'from-teal-600 to-cyan-600 text-white' },
        { id: 'feedback-loop', label: 'AI Feedback & Simulator', icon: BrainCircuit, color: 'text-violet-400', activeBg: 'from-violet-600 to-purple-600 text-white' },
      ]
    },
    {
      title: 'BRAND & SETTINGS',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      items: [
        { id: 'brand-assets', label: 'Brand Voice & Assets', icon: FolderKanban, color: 'text-sky-400', activeBg: 'from-sky-600 to-indigo-600 text-white' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-40 lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r flex flex-col transition-all duration-300 lg:translate-x-0 ${
        isLight 
          ? 'bg-gradient-to-b from-white via-slate-50 to-purple-50/20 border-slate-200/90 text-slate-800 shadow-xl' 
          : 'bg-gradient-to-b from-[#0b0d14] via-[#0f121e] to-[#151224] border-neutral-800/80 text-neutral-100 shadow-2xl'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Top Soft Rainbow Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-violet-400 via-pink-400 via-sky-400 to-emerald-400"></div>

        {/* Brand Logo Header */}
        <div className={`p-4 border-b flex items-center justify-between ${isLight ? 'border-slate-200/80' : 'border-neutral-800/80'}`}>
          <div 
            onClick={() => { onNavigateTab('overview'); onCloseMobile?.(); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
              </div>
            </div>
            <div>
              <span className={`serif-headline text-lg font-extrabold tracking-tight group-hover:text-purple-400 transition-colors block leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                ContentCraft <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent italic">AI</span>
              </span>
              <span className={`text-[10px] font-semibold tracking-wide ${isLight ? 'text-slate-500' : 'text-purple-300/80'}`}>
                AI Studio for Brands & Creators
              </span>
            </div>
          </div>

          <button 
            onClick={onCloseMobile}
            className={`p-1.5 rounded-xl lg:hidden transition-colors ${
              isLight ? 'text-slate-400 hover:bg-slate-200 text-slate-700' : 'text-neutral-400 hover:bg-neutral-800 text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Launch CTA Button */}
        <div className="p-3">
          <button
            onClick={() => { onNavigateTab('all-in-one'); onCloseMobile?.(); }}
            className="w-full py-3 px-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] border border-purple-400/30"
          >
            <Zap className="w-4 h-4 text-purple-200 fill-current" />
            <span>1-Click Campaign Studio</span>
          </button>
        </div>

        {/* Active Brand Card Pill in Sidebar */}
        <div className="px-3 pb-2">
          <div 
            onClick={() => { onNavigateTab('brand-assets'); onCloseMobile?.(); }}
            className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-xs group shadow-xs ${
              isLight 
                ? 'bg-white/80 border-slate-200 hover:border-purple-400 hover:bg-purple-50/40' 
                : 'bg-neutral-900/90 border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-800/80'
            }`}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <span 
                className="w-3 h-3 rounded-full ring-2 ring-purple-400/50 shadow-xs shrink-0" 
                style={{ backgroundColor: activeBrand?.colors?.primary === '#f59e0b' ? '#a855f7' : (activeBrand?.colors?.primary || '#a855f7') }}
              />
              <div className="truncate">
                <p className={`font-bold truncate group-hover:text-purple-400 transition-colors ${isLight ? 'text-slate-900' : 'text-neutral-100'}`}>
                  {activeBrand?.name}
                </p>
                <p className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  {activeBrand?.industry}
                </p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${isLight ? 'text-slate-400' : 'text-neutral-500'}`} />
          </div>
        </div>

        {/* Clean Navigation Groups (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {navigationGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="flex items-center space-x-1.5 px-2 py-0.5">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                  isLight 
                    ? 'text-slate-600 bg-slate-100 border-slate-200' 
                    : group.badgeColor
                }`}>
                  {group.title}
                </span>
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onNavigateTab(item.id); onCloseMobile?.(); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? `bg-gradient-to-r ${item.activeBg} shadow-md`
                          : isLight 
                            ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70 border border-transparent hover:border-slate-200' 
                            : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70 border border-transparent hover:border-neutral-700/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <div className={`p-1 rounded-lg ${
                          isActive 
                            ? 'bg-black/20 text-white' 
                            : isLight ? 'bg-slate-100 text-slate-600' : 'bg-neutral-800/80 ' + item.color
                        }`}>
                          <Icon className="w-4 h-4 shrink-0" />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </aside>
    </>
  );
}

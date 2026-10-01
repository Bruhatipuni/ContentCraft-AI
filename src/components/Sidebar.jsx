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
  Plus,
  ChevronRight,
  ShieldCheck,
  Key,
  X,
  Compass
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  onNavigateTab, 
  activeBrand, 
  onOpenNewBrandModal, 
  onOpenApiKeyModal,
  isMobileOpen,
  onCloseMobile,
  themeMode = 'dark'
}) {
  const isLight = themeMode === 'light';

  const navigationGroups = [
    {
      title: 'WORKSPACE',
      items: [
        { id: 'overview', label: 'Dashboard & Metrics', icon: LayoutDashboard },
        { id: 'all-in-one', label: '1-Click Campaign Studio', icon: Zap, badge: 'Easy Mode ✨', highlight: true },
      ]
    },
    {
      title: 'CREATION ENGINE',
      items: [
        { id: 'repurposer', label: 'Content Repurposer', icon: Sparkles, badge: 'Core ⭐' },
        { id: 'variations', label: 'A/B Angle Generator', icon: CopyCheck },
        { id: 'multilingual', label: 'Indic Multilingual Studio', icon: Languages },
      ]
    },
    {
      title: 'MEDIA & FORMATS',
      items: [
        { id: 'visuals', label: 'Visual & Ad Designer', icon: Palette, badge: 'Core ⭐' },
        { id: 'video-reel', label: 'Video & Reel Storyboard', icon: Video, badge: 'Core ⭐' },
        { id: 'voiceover', label: 'AI Voiceover Studio', icon: Mic },
        { id: 'platform-adapter', label: 'Native Feed Previews', icon: Smartphone },
      ]
    },
    {
      title: 'PLANNING & GROWTH',
      items: [
        { id: 'calendar', label: 'Publishing Calendar', icon: Calendar },
        { id: 'trends', label: 'Trend & Viral Radar', icon: TrendingUp },
        { id: 'feedback-loop', label: 'AI Feedback & Simulator', icon: BrainCircuit },
      ]
    },
    {
      title: 'BRAND & SETTINGS',
      items: [
        { id: 'brand-assets', label: 'Brand Voice & Assets', icon: FolderKanban },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r flex flex-col transition-all duration-200 lg:translate-x-0 ${
        isLight 
          ? 'bg-white border-slate-200 text-slate-800 shadow-sm' 
          : 'bg-[#0c0d12] border-neutral-800/80 text-neutral-100'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Top Hackathon Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-blue-500 to-amber-400 opacity-90 flex">
          <div className="w-12 h-full bg-amber-400"></div>
          <div className="w-6 h-full bg-blue-500"></div>
          <div className="w-8 h-full bg-neutral-200"></div>
          <div className="w-16 h-full bg-amber-600"></div>
          <div className="flex-1 h-full bg-neutral-900"></div>
        </div>

        {/* Brand Header */}
        <div className={`p-4 border-b flex items-center justify-between ${isLight ? 'border-slate-100' : 'border-neutral-800/80'}`}>
          <div 
            onClick={() => { onNavigateTab('overview'); onCloseMobile?.(); }}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <span className={`serif-headline text-lg font-bold tracking-tight group-hover:text-amber-500 transition-colors block leading-tight ${
                isLight ? 'text-slate-900' : 'text-neutral-100'
              }`}>
                ContentCraft <span className="text-amber-500 italic">AI</span>
              </span>
              <span className={`text-[10px] font-medium font-mono ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>
                Team AI Verse · BFWAI 26
              </span>
            </div>
          </div>

          <button 
            onClick={onCloseMobile}
            className={`p-1 rounded-lg lg:hidden ${isLight ? 'text-slate-400 hover:text-slate-800' : 'text-neutral-400 hover:text-white'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Launch CTA Button */}
        <div className="p-3">
          <button
            onClick={() => { onNavigateTab('all-in-one'); onCloseMobile?.(); }}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>1-Click Campaign Studio</span>
          </button>
        </div>

        {/* Active Brand Card Pill in Sidebar */}
        <div className="px-3 pb-2">
          <div 
            onClick={() => { onNavigateTab('brand-assets'); onCloseMobile?.(); }}
            className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
              isLight 
                ? 'bg-slate-50 border-slate-200 hover:border-amber-400' 
                : 'bg-neutral-900/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center space-x-2 truncate">
              <span 
                className="w-2.5 h-2.5 rounded-full ring-2 ring-slate-400/40 shrink-0" 
                style={{ backgroundColor: activeBrand?.colors?.primary || '#f59e0b' }}
              />
              <div className="truncate">
                <p className={`font-semibold truncate ${isLight ? 'text-slate-900' : 'text-neutral-200'}`}>
                  {activeBrand?.name}
                </p>
                <p className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  {activeBrand?.industry}
                </p>
              </div>
            </div>
            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-slate-400' : 'text-neutral-500'}`} />
          </div>
        </div>

        {/* Navigation Groups (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {navigationGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <h3 className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${
                isLight ? 'text-slate-400 font-semibold' : 'text-neutral-500'
              }`}>
                {group.title}
              </h3>

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onNavigateTab(item.id); onCloseMobile?.(); }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? isLight 
                            ? 'bg-amber-500/15 text-amber-700 font-bold border border-amber-300/80 shadow-xs' 
                            : 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-xs'
                          : item.highlight
                          ? isLight 
                            ? 'text-amber-600 hover:bg-slate-100 font-semibold' 
                            : 'text-amber-400 hover:bg-neutral-900 font-medium'
                          : isLight 
                            ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                            : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${
                          isActive 
                            ? isLight ? 'text-amber-600' : 'text-amber-400' 
                            : item.highlight 
                            ? isLight ? 'text-amber-600' : 'text-amber-400' 
                            : isLight ? 'text-slate-500' : 'text-neutral-400'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isActive 
                            ? isLight ? 'bg-amber-200 text-amber-800' : 'bg-amber-500/20 text-amber-300' 
                            : item.highlight
                            ? isLight ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/20 text-amber-400'
                            : isLight ? 'bg-slate-100 text-slate-600' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & API Key button */}
        <div className={`p-3 border-t space-y-2 ${isLight ? 'border-slate-100 bg-slate-50' : 'border-neutral-800/80 bg-neutral-950/60'}`}>
          <button
            onClick={onOpenApiKeyModal}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-xs transition-colors ${
              isLight 
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200' 
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
            }`}
          >
            <span className="flex items-center space-x-1.5 font-medium">
              <Key className="w-3.5 h-3.5 text-amber-500" />
              <span>Gemini API Key</span>
            </span>
            <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>Settings</span>
          </button>

          <div className={`text-[10px] text-center py-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            <span>BFWAI/HACK 26 · PS 02 Studio</span>
          </div>
        </div>

      </aside>
    </>
  );
}

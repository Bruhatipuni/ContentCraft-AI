import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  ChevronDown, 
  CheckCircle2, 
  Plus, 
  Cpu, 
  Sun,
  Moon,
  ExternalLink 
} from 'lucide-react';
import { storageService } from '../services/storageService';

export function Header({ 
  activeBrand, 
  brands, 
  onSelectBrand, 
  onOpenApiKeyModal, 
  onOpenNewBrandModal,
  onOpenMobileSidebar,
  activeTabTitle = 'Studio',
  themeMode = 'dark',
  onToggleTheme
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hasGeminiKey = Boolean(storageService.getGeminiKey());
  const isLight = themeMode === 'light';

  return (
    <header className={`border-b transition-colors duration-200 sticky top-0 z-30 ${
      isLight 
        ? 'bg-white/90 border-slate-200/90 text-slate-900 shadow-sm backdrop-blur-md' 
        : 'bg-[#0b0c10]/90 border-neutral-800/80 text-neutral-100 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Mobile Toggle & Page Breadcrumbs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenMobileSidebar}
              className={`p-2 rounded-xl border transition-colors lg:hidden ${
                isLight 
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
              }`}
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className={`flex items-center space-x-2 text-xs ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                <span className="hidden sm:inline">Workspace</span>
                <span className="hidden sm:inline">/</span>
                <span className="text-amber-500 font-bold">{activeTabTitle}</span>
              </div>
            </div>
          </div>

          {/* Right Controls: Theme Switcher, Brand Dropdown, Engine Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Theme Toggle (🌞 Light / 🌙 Dark) */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800'
              }`}
              title={`Switch to ${isLight ? 'Midnight Studio (Dark)' : 'Clean Daylight (Light)'}`}
            >
              {isLight ? (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden md:inline text-xs">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline text-xs">Light Mode</span>
                </>
              )}
            </button>

            {/* Active Brand Switcher */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs transition-all shadow-sm ${
                  isLight
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800 hover:border-amber-500/40'
                }`}
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full ring-2 ring-slate-400/40 shrink-0" 
                  style={{ backgroundColor: activeBrand?.colors?.primary || '#f59e0b' }}
                />
                <span className="font-semibold max-w-[110px] sm:max-w-[150px] truncate">
                  {activeBrand?.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl py-2 z-50 animate-in fade-in ${
                  isLight 
                    ? 'bg-white border-slate-200 text-slate-800' 
                    : 'bg-neutral-900 border-neutral-800 text-neutral-100'
                }`}>
                  <div className={`px-3 py-1.5 border-b flex items-center justify-between text-[11px] ${
                    isLight ? 'border-slate-100 text-slate-500' : 'border-neutral-800 text-neutral-400'
                  }`}>
                    <span className="font-semibold uppercase tracking-wider">Switch Brand Voice</span>
                    <button 
                      onClick={() => { setDropdownOpen(false); onOpenNewBrandModal(); }}
                      className="text-amber-500 hover:underline font-semibold"
                    >
                      + New
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto py-1">
                    {brands.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          onSelectBrand(b.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                          activeBrand?.id === b.id 
                            ? isLight ? 'bg-amber-50 text-amber-700' : 'bg-amber-500/10 text-amber-300' 
                            : isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: b.colors.primary }}
                          />
                          <div className="truncate text-xs">
                            <p className="font-semibold truncate">{b.name}</p>
                            <p className="text-[10px] opacity-70 truncate">{b.industry}</p>
                          </div>
                        </div>
                        {activeBrand?.id === b.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Engine Status Badge */}
            <button
              onClick={onOpenApiKeyModal}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                hasGeminiKey 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300' 
                  : isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:border-amber-400'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-amber-500/30'
              }`}
              title={hasGeminiKey ? 'Gemini 1.5 Flash Connected' : 'Smart Engine Active'}
            >
              <Cpu className={`w-3.5 h-3.5 ${hasGeminiKey ? 'text-emerald-500' : 'text-amber-500'}`} />
              <span className="hidden md:inline">
                {hasGeminiKey ? 'Gemini Live' : 'Smart Engine'}
              </span>
            </button>

            {/* Hackathon Mini Pill */}
            <div className={`hidden lg:inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-medium ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}>
              <span>BFWAI 26 · Team AI Verse</span>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

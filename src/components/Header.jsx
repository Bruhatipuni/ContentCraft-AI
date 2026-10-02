import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  ChevronDown, 
  CheckCircle2, 
  Sun,
  Moon
} from 'lucide-react';

export function Header({ 
  activeBrand, 
  brands, 
  onSelectBrand, 
  onOpenNewBrandModal,
  onOpenMobileSidebar,
  activeTabTitle = 'Studio',
  themeMode = 'dark',
  onToggleTheme
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLight = themeMode === 'light';

  return (
    <header className={`border-b transition-colors duration-200 sticky top-0 z-30 ${
      isLight 
        ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-sm backdrop-blur-md' 
        : 'bg-[#0b0d14]/95 border-neutral-800/90 text-neutral-100 backdrop-blur-md'
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

            <div className="flex items-center space-x-2">
              <span className={`text-xs font-semibold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                Workspace
              </span>
              <span className={`text-xs hidden sm:inline ${isLight ? 'text-slate-300' : 'text-neutral-600'}`}>/</span>
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-sky-500/15 border border-purple-500/30 text-purple-400 text-xs font-extrabold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{activeTabTitle}</span>
              </div>
            </div>
          </div>

          {/* Right Controls: Theme Switcher & Brand Dropdown */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Theme Toggle (🌞 Light / 🌙 Dark) */}
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-2 transition-all shadow-xs ${
                isLight
                  ? 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-purple-300 border-neutral-800 hover:border-purple-500/40'
              }`}
              title={`Switch to ${isLight ? 'Midnight Studio (Dark)' : 'Clean Daylight (Light)'}`}
            >
              {isLight ? (
                <>
                  <Sun className="w-4 h-4 text-purple-600" />
                  <span className="hidden md:inline text-xs font-bold">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden md:inline text-xs font-bold">Dark Mode</span>
                </>
              )}
            </button>

            {/* Active Brand Switcher */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                  isLight
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800 hover:border-purple-500/40'
                }`}
              >
                <span 
                  className="w-3 h-3 rounded-full ring-2 ring-purple-400/60 shadow-xs shrink-0" 
                  style={{ backgroundColor: activeBrand?.colors?.primary === '#f59e0b' ? '#a855f7' : (activeBrand?.colors?.primary || '#a855f7') }}
                />
                <span className="max-w-[110px] sm:max-w-[150px] truncate">
                  {activeBrand?.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
              </button>

              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 ${
                  isLight 
                    ? 'bg-white border-slate-200 text-slate-800' 
                    : 'bg-[#11131f] border-neutral-800 text-neutral-100'
                }`}>
                  <div className={`px-3 py-1.5 border-b flex items-center justify-between text-[11px] ${
                    isLight ? 'border-slate-100 text-slate-500' : 'border-neutral-800 text-neutral-400'
                  }`}>
                    <span className="font-extrabold uppercase tracking-wider text-purple-400">Switch Brand Voice</span>
                    <button 
                      onClick={() => { setDropdownOpen(false); onOpenNewBrandModal(); }}
                      className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 font-bold transition-colors"
                    >
                      + New Brand
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
                            ? isLight ? 'bg-purple-50 text-purple-800 font-bold' : 'bg-purple-500/15 text-purple-300 font-bold' 
                            : isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-neutral-800/70 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <span 
                            className="w-3 h-3 rounded-full shrink-0 ring-1 ring-black/20" 
                            style={{ backgroundColor: b.colors.primary === '#f59e0b' ? '#a855f7' : b.colors.primary }}
                          />
                          <div className="truncate text-xs">
                            <p className="font-bold truncate">{b.name}</p>
                            <p className="text-[10px] opacity-75 truncate">{b.industry}</p>
                          </div>
                        </div>
                        {activeBrand?.id === b.id && (
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { AllInOneStudio } from './components/AllInOneStudio';
import { RepurposerStudio } from './components/RepurposerStudio';
import { VisualGenerator } from './components/VisualGenerator';
import { VideoReelStudio } from './components/VideoReelStudio';
import { VoiceoverStudio } from './components/VoiceoverStudio';
import { PlatformAdapter } from './components/PlatformAdapter';
import { TrendIntelligence } from './components/TrendIntelligence';
import { BrandAssetLibrary } from './components/BrandAssetLibrary';
import { ContentScoreModal } from './components/ContentScoreModal';
import { VariationsStudio } from './components/VariationsStudio';
import { ContentCalendar } from './components/ContentCalendar';
import { FeedbackLoopStudio } from './components/FeedbackLoopStudio';
import { MultilingualStudio } from './components/MultilingualStudio';
import { ApiKeyModal } from './components/ApiKeyModal';
import { NewBrandModal } from './components/NewBrandModal';

import { storageService } from './services/storageService';

export function App() {
  const [activeTab, setActiveTab] = useState('all-in-one'); // Defaults to the easy-to-use 1-click studio
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Theme State: 'light' or 'dark'
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('contentcraft_theme_mode') || 'light';
  });

  const [brands, setBrands] = useState(() => storageService.getBrands());
  const [activeBrandId, setActiveBrandId] = useState(() => storageService.getActiveBrandId());
  const [calendarPosts, setCalendarPosts] = useState(() => storageService.getCalendarPosts());

  // Cross-Studio Shared States
  const [voiceoverScript, setVoiceoverScript] = useState('');
  const [platformAdapterData, setPlatformAdapterData] = useState({ content: '', platform: 'linkedin' });
  const [repurposerSeedContent, setRepurposerSeedContent] = useState('');

  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isNewBrandModalOpen, setIsNewBrandModalOpen] = useState(false);
  const [scoreModalState, setScoreModalState] = useState({
    isOpen: false,
    text: '',
    platform: 'linkedin'
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Sync theme with document element
  useEffect(() => {
    localStorage.setItem('contentcraft_theme_mode', themeMode);
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextTheme);
    showToast(`Switched to ${nextTheme === 'light' ? 'Clean Daylight (Light)' : 'Midnight Studio (Dark)'}`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeBrand = brands.find(b => b.id === activeBrandId) || brands[0];

  const handleSelectBrand = (id) => {
    setActiveBrandId(id);
    storageService.setActiveBrandId(id);
    showToast(`Switched active brand to ${brands.find(b => b.id === id)?.name}`);
  };

  const handleBrandCreated = (newBrand, updatedList) => {
    setBrands(updatedList);
    setActiveBrandId(newBrand.id);
    showToast(`Created & activated brand: ${newBrand.name}!`);
  };

  // Cross-Studio Navigation Handlers
  const handleSendToCalendar = (post) => {
    const created = storageService.addCalendarPost({
      ...post,
      brandId: activeBrand?.id || 'glowskin',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '18:00',
      status: 'Scheduled'
    });
    setCalendarPosts([created, ...calendarPosts]);
    showToast(`Scheduled "${post.title}" to Calendar!`);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const handleSendToVoiceover = (script) => {
    setVoiceoverScript(script);
    setActiveTab('voiceover');
    showToast('Transferred script to AI Voiceover Studio');
  };

  const handleSendToPlatformAdapter = (content, platform) => {
    setPlatformAdapterData({ content, platform });
    setActiveTab('platform-adapter');
    showToast(`Loaded into ${platform.toUpperCase()} Native Previewer`);
  };

  const handleUseTrendInRepurposer = (angleOrTopic) => {
    setRepurposerSeedContent(angleOrTopic);
    setActiveTab('repurposer');
    showToast(`Transferred trend angle to Repurposer`);
  };

  const handleOpenScoreModal = (text, platform, onApply) => {
    setScoreModalState({
      isOpen: true,
      text,
      platform,
      onApply: onApply || null
    });
  };

  const tabTitles = {
    'overview': 'Dashboard & KPIs',
    'all-in-one': '1-Click Campaign Studio (Easy Mode)',
    'repurposer': 'Content Repurposer (5-in-1)',
    'visuals': 'Visual & Ad Creative Studio',
    'video-reel': 'Video & Reel Storyboard',
    'voiceover': 'AI Voiceover Synthesizer',
    'platform-adapter': 'Native Feed Previewer',
    'trends': 'Trend & Viral Hook Radar',
    'brand-assets': 'Brand Voice & Guidelines',
    'variations': 'A/B Angle Generator',
    'calendar': 'Publishing Calendar',
    'feedback-loop': 'AI Reach Simulator & Memory Loop',
    'multilingual': 'Indic Multilingual Studio'
  };

  const isLight = themeMode === 'light';

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-200 ${
      isLight 
        ? 'light-theme bg-[#f8fafc] text-slate-900 selection:bg-amber-500/20 selection:text-amber-800' 
        : 'dark-theme bg-[#09090c] text-neutral-100 selection:bg-amber-500/30 selection:text-amber-200'
    }`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 border ${
          isLight ? 'bg-white border-amber-300 text-slate-900' : 'bg-neutral-900 border-amber-500/50 text-neutral-100'
        }`}>
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Left Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onNavigateTab={setActiveTab}
        activeBrand={activeBrand}
        onOpenNewBrandModal={() => setIsNewBrandModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        themeMode={themeMode}
      />

      {/* Main Content Area (Offset by sidebar width on desktop: lg:pl-64) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        
        {/* Top Header Bar with Theme Switcher */}
        <Header
          activeBrand={activeBrand}
          brands={brands}
          onSelectBrand={handleSelectBrand}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          onOpenNewBrandModal={() => setIsNewBrandModalOpen(true)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          activeTabTitle={tabTitles[activeTab] || 'Studio'}
          themeMode={themeMode}
          onToggleTheme={toggleTheme}
        />

        {/* Dynamic Studio Workspace */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {activeTab === 'overview' && (
            <DashboardOverview
              activeBrand={activeBrand}
              onNavigateTab={setActiveTab}
              calendarPosts={calendarPosts}
              onOpenScoreModal={handleOpenScoreModal}
            />
          )}

          {activeTab === 'all-in-one' && (
            <AllInOneStudio
              activeBrand={activeBrand}
              onSendToCalendar={handleSendToCalendar}
              onSendToVoiceover={handleSendToVoiceover}
              onOpenScoreModal={handleOpenScoreModal}
            />
          )}

          {activeTab === 'repurposer' && (
            <RepurposerStudio
              activeBrand={activeBrand}
              initialSeed={repurposerSeedContent}
              onSendToCalendar={handleSendToCalendar}
              onSendToVoiceover={handleSendToVoiceover}
              onSendToPlatformAdapter={handleSendToPlatformAdapter}
              onOpenScoreModal={handleOpenScoreModal}
            />
          )}

          {activeTab === 'visuals' && (
            <VisualGenerator
              activeBrand={activeBrand}
            />
          )}

          {activeTab === 'video-reel' && (
            <VideoReelStudio
              activeBrand={activeBrand}
              onSendToVoiceover={handleSendToVoiceover}
            />
          )}

          {activeTab === 'voiceover' && (
            <VoiceoverStudio
              initialScript={voiceoverScript}
              activeBrand={activeBrand}
            />
          )}

          {activeTab === 'platform-adapter' && (
            <PlatformAdapter
              initialContent={platformAdapterData.content}
              initialPlatform={platformAdapterData.platform}
              activeBrand={activeBrand}
            />
          )}

          {activeTab === 'trends' && (
            <TrendIntelligence
              activeBrand={activeBrand}
              onUseTrendInRepurposer={handleUseTrendInRepurposer}
            />
          )}

          {activeTab === 'brand-assets' && (
            <BrandAssetLibrary
              brands={brands}
              activeBrand={activeBrand}
              onSelectBrand={handleSelectBrand}
              onUpdateBrands={setBrands}
            />
          )}

          {activeTab === 'variations' && (
            <VariationsStudio
              activeBrand={activeBrand}
              onSendToCalendar={handleSendToCalendar}
              onSendToRepurposer={(text) => {
                setRepurposerSeedContent(text);
                setActiveTab('repurposer');
              }}
            />
          )}

          {activeTab === 'calendar' && (
            <ContentCalendar
              calendarPosts={calendarPosts}
              onUpdatePosts={setCalendarPosts}
              activeBrand={activeBrand}
            />
          )}

          {activeTab === 'feedback-loop' && (
            <FeedbackLoopStudio
              activeBrand={activeBrand}
            />
          )}

          {activeTab === 'multilingual' && (
            <MultilingualStudio
              activeBrand={activeBrand}
              onSendToCalendar={handleSendToCalendar}
              onSendToVoiceover={handleSendToVoiceover}
            />
          )}

        </main>

        {/* Footer */}
        <footer className={`border-t py-6 text-xs transition-colors mt-auto ${
          isLight ? 'border-slate-200 bg-white text-slate-500' : 'border-neutral-900 bg-neutral-950 text-neutral-400'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className={`serif-headline font-bold ${isLight ? 'text-slate-800' : 'text-neutral-200'}`}>ContentCraft AI</span>
              <span>·</span>
              <span>BFWAI/HACK 26 Hackathon</span>
              <span>·</span>
              <span className="text-amber-500 font-semibold">Team AI Verse</span>
            </div>

            <div className="text-center sm:text-right text-[11px] opacity-80">
              <span>Bruhati, Shashank, Dayakar</span>
              <span className="mx-2">•</span>
              <span>PS 02 AI Content Studio for Brands & Creators</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Global Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      <NewBrandModal
        isOpen={isNewBrandModalOpen}
        onClose={() => setIsNewBrandModalOpen(false)}
        onBrandCreated={handleBrandCreated}
      />

      <ContentScoreModal
        isOpen={scoreModalState.isOpen}
        onClose={() => setScoreModalState({ ...scoreModalState, isOpen: false })}
        initialText={scoreModalState.text}
        platform={scoreModalState.platform}
        activeBrand={activeBrand}
        onApplyOptimized={(updated) => {
          if (typeof scoreModalState.onApply === 'function') {
            scoreModalState.onApply(updated);
          }
        }}
      />

    </div>
  );
}

export default App;

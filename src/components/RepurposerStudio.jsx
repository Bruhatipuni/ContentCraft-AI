import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  CalendarPlus, 
  Volume2, 
  ExternalLink, 
  FileText, 
  Wand2, 
  Share2, 
  Send,
  RefreshCw,
  Gauge,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sampleRepurposeInputs, platformSpecs } from '../data/templateData';
import { geminiService } from '../services/geminiService';
import { contentScorer } from '../services/contentScorer';

export function RepurposerStudio({ 
  activeBrand, 
  initialSeed = '',
  onSendToCalendar, 
  onSendToVoiceover, 
  onSendToPlatformAdapter,
  onOpenScoreModal 
}) {
  const [inputText, setInputText] = useState(initialSeed || sampleRepurposeInputs[0].content);
  const [contentType, setContentType] = useState('Blog Post');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTab, setActiveTab] = useState('linkedin');

  React.useEffect(() => {
    if (initialSeed) {
      setInputText(initialSeed);
    }
  }, [initialSeed]);

  const [generatedOutputs, setGeneratedOutputs] = useState({
    linkedin: `Most people treat content as disposable entertainment.\n\nHere is what our data across ${activeBrand?.name || 'ContentCraft'} taught us: Utility > Attention.\n\n3 key takeaways for teams scaling in 2026:\n\n1. Stop optimizing for passive vanity likes. Focus on High-Intent Saves and Direct Message shares.\n2. When your frameworks solve an immediate problem, your distribution compounds over weeks.\n3. Brand consistency isn't repeating a logo—it's maintaining a recognizable perspective.\n\nWhat is your team prioritizing this quarter: reach or retention?\n\n#ContentStrategy #Growth #ThoughtLeadership #${(activeBrand?.name || 'ContentCraft').replace(/\s+/g, '')}`,
    instagram: `The truth about modern content strategy nobody tells you 💡👇\n\nA post with 500 views that gets saved 80 times will receive 10x more continuous distribution than a post with 5,000 views that gets zero saves.\n\nSave this checklist before your next sprint: ✨\n\n📌 Pillar 1: High-signal frameworks over vague opinions\n📌 Pillar 2: Proprietary case studies & real numbers\n📌 Pillar 3: Saveable swipe carousels that work as digital cheat sheets\n\nDrop a "🚀" in the comments if you want our full framework checklist sent to your DMs!\n\n.\n.\n#${(activeBrand?.name || 'ContentCraft').replace(/\s+/g, '')} #ContentCraft #CreatorTips #GrowthHacks #InstaGrowth #SmartMarketing #BrandIdentity #SocialMediaStrategy #Marketing2026 #OrganicGrowth`,
    twitter: `1/5 The content playbook completely changed in 2026.\n\nIf you're still chasing surface-level metrics, you are leaving 80% of distribution on the table 🧵👇\n\n2/5 Algorithms now prioritize SAVES and DM SHARES over passive likes. A post saved 50 times gets 10x more continuous life than one liked 500 times.\n\n3/5 Transition from "Attention Entertainment" to "Utility Creation". Ask: "Would someone bookmark this to use next Tuesday?"\n\n4/5 The 3 pillars: 1. Frameworks over opinions 2. Proprietary data 3. Visual cheat sheets.\n\n5/5 If you found this valuable:\n1. Retweet the first tweet to help another creator\n2. Follow @${(activeBrand?.name || 'contentcraft').toLowerCase().replace(/\s+/g, '')} for weekly breakdown frameworks 🚀`,
    reel: `[HOOK - 0:00 to 0:03]\n(Visual: Fast zoom-in, holding up phone screen)\n"Stop making this classic content mistake if you want actual inbound clients in 2026."\n\n[PROBLEM - 0:03 to 0:12]\n(Visual: Screen recording showing 10k views with 0 saves)\n"Everyone chases likes. But likes don't build businesses. Saves and DM shares do."\n\n[SOLUTION - 0:12 to 0:30]\n(Visual: 3 crisp text overlays popping up with sound effects)\n"Here are the 3 utility pillars we use at ${activeBrand?.name || 'ContentCraft'}:\nFirst: Share frameworks, not vague opinions.\nSecond: Use your own test data.\nThird: Create visual cheat sheets."\n\n[CTA - 0:30 to 0:40]\n(Visual: Direct eye contact, pointing down)\n"Comment 'FRAMEWORK' below and I'll send you our exact template for free!"`,
    email: `Subject: Why vanity metrics are killing your pipeline (and what to do instead)\nPreview: The single metric that predicts 10x continuous distribution...\n\nHey friend,\n\nQuick question: when was the last time you bought from someone just because you liked their tweet?\n\nProbably never.\n\nHere is what we observed this month at ${activeBrand?.name || 'ContentCraft'}:\n\nA post with 500 views that gets saved 80 times will receive 10x more continuous distribution than a post with 5,000 views that gets zero saves.\n\nWhen you build utility-first content, your audience bookmarks your work and shares it with their team. That is how real compounding happens.\n\n👉 [Click here to download our free 2026 Utility Content Playbook]\n\nWarmly,\nThe ${activeBrand?.name || 'ContentCraft'} Team\n\nP.S. Reply to this email with your biggest marketing roadblock this week—I read and reply to every note.`
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const results = await geminiService.repurposeContent({
        rawContent: inputText,
        contentType,
        brand: activeBrand
      });
      setGeneratedOutputs(results);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentContent = generatedOutputs[activeTab] || '';
  const scoreData = contentScorer.analyzeContent(currentContent, activeTab, activeBrand);

  const tabs = [
    { id: 'linkedin', label: 'LinkedIn', icon: '💼', desc: 'Thought Leadership Post' },
    { id: 'instagram', label: 'Instagram', icon: '📸', desc: 'Caption & 20 Tags' },
    { id: 'twitter', label: 'X (Twitter)', icon: '🧵', desc: '5-Tweet Thread' },
    { id: 'reel', label: 'Reel Script', icon: '🎬', desc: '30-45s Spoken Script' },
    { id: 'email', label: 'Newsletter', icon: '✉️', desc: 'Subject + Body + CTA' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 uppercase tracking-wider">
              Feature 1 ⭐ Core Hero
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Multi-Channel Adaptation Engine</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            AI Content Repurposer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Paste one piece of content to generate 5 synchronized, platform-specific outputs aligned with <span className="text-amber-500 font-bold">{activeBrand?.name}</span>'s voice.
          </p>
        </div>

        {/* Preset Sample Picker */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 dark:text-neutral-400 hidden sm:inline">Try Sample Brief:</span>
          {sampleRepurposeInputs.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(sample.content);
                setContentType(sample.type);
              }}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 transition-colors font-semibold"
            >
              {sample.type}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Input Source on Left, Repurposed Outputs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Source Input (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Source Material</span>
              </label>
              
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg text-xs text-slate-800 dark:text-neutral-200 px-2.5 py-1 focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Blog Post">Blog / Long Article</option>
                <option value="Video Transcript">Video / Podcast Transcript</option>
                <option value="Product Launch Brief">Product Launch Brief</option>
                <option value="Quick Raw Notes">Raw Notes / Bullet Points</option>
              </select>
            </div>

            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your blog article, video transcript, YouTube link summary, or raw thought brief here..."
                rows={14}
                className="w-full rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800/80 p-3.5 text-xs sm:text-sm text-slate-900 dark:text-neutral-200 placeholder-slate-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 leading-relaxed font-sans"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 pt-1">
                <span>{inputText.split(/\s+/).filter(Boolean).length} words · {inputText.length} characters</span>
                <span className="text-amber-500 font-mono font-medium">Brand: {activeBrand?.voice?.tone?.split(',')[0]}</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !inputText.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group transition-all hover:scale-[1.01]"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                  <span>Synthesizing 5 Platforms...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                  <span>Repurpose into 5 Platforms Now</span>
                </>
              )}
            </button>
          </div>

          {/* Brand Voice Injection Reminder */}
          <div className="glass-panel rounded-2xl p-4 border text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-800 dark:text-neutral-200">
              <span className="font-bold">Active Voice Persona</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">Enforced</span>
            </div>
            <p className="text-slate-600 dark:text-neutral-400 leading-relaxed">
              "{activeBrand?.voice?.tone}" with target audience: <span className="text-slate-900 dark:text-neutral-200 font-medium">{activeBrand?.voice?.targetAudience}</span>
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(activeBrand?.voice?.keywords || []).map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-700 dark:text-amber-300 font-medium">
                  +{kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Repurposed Outputs Tabbed Studio (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Platform Tab Navigation */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-neutral-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-400/40 shadow-xs'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active Platform Card */}
          <div className="glass-panel rounded-2xl p-5 border space-y-4">
            
            {/* Top Bar for Platform Output */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-neutral-800">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-900 dark:text-neutral-100">
                  {platformSpecs[activeTab]?.name} Format
                </span>
                
                {/* AI Score Badge (Feature 8 Integration) */}
                <div 
                  onClick={() => onOpenScoreModal(currentContent, activeTab, (newText) => {
                    setOutputs(prev => ({ ...prev, [activeTab]: newText }));
                  })}
                  className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-amber-500 text-xs transition-colors"
                  title="Click to view detailed AI Quality Score breakdown and apply 1-click fixes"
                >
                  <Gauge className={`w-3.5 h-3.5 ${scoreData.overall >= 90 ? 'text-emerald-500' : 'text-amber-500'}`} />
                  <span className="font-bold text-slate-900 dark:text-neutral-200">{scoreData.overall}</span>
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400">/100 AI Score</span>
                </div>
              </div>

              {/* Action Buttons: Copy, Native Preview, Push to Calendar */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(currentContent, activeTab)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  {copiedKey === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSendToCalendar({
                    title: `${platformSpecs[activeTab]?.name}: ${inputText.slice(0, 32)}...`,
                    platform: activeTab,
                    content: currentContent,
                    aiScore: scoreData.overall
                  })}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  title="Schedule this post into Content Calendar"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-purple-500" />
                  <span className="hidden sm:inline">Schedule</span>
                </button>

                <button
                  onClick={() => onSendToPlatformAdapter(currentContent, activeTab)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  title="Preview in authentic native platform UI"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="hidden sm:inline">Native Feed</span>
                </button>

                {activeTab === 'reel' && (
                  <button
                    onClick={() => onSendToVoiceover(currentContent)}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Voiceover</span>
                  </button>
                )}
              </div>
            </div>

            {/* Editable Content Area */}
            <div className="relative">
              <textarea
                value={currentContent}
                onChange={(e) => setGeneratedOutputs({ ...generatedOutputs, [activeTab]: e.target.value })}
                rows={12}
                className="w-full rounded-xl bg-slate-50 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 p-4 text-xs sm:text-sm text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 leading-relaxed font-sans"
              />
            </div>

            {/* Platform Formatting Specs Bar */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/80 text-[11px] text-slate-600 dark:text-neutral-400 space-y-1">
              <div className="flex items-center justify-between text-slate-800 dark:text-neutral-300">
                <span className="font-bold">Platform Blueprint</span>
                <span>Ideal: {platformSpecs[activeTab]?.idealLength}</span>
              </div>
              <p className="text-slate-600 dark:text-neutral-400 leading-relaxed">
                <strong className="text-slate-800 dark:text-neutral-300">Structure:</strong> {platformSpecs[activeTab]?.structure}
              </p>
            </div>

            {/* Quick 1-Click AI Fix Suggestion */}
            {scoreData.suggestions && scoreData.suggestions[0] && scoreData.suggestions[0].type !== 'perfect' && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-700 dark:text-amber-300 flex items-center space-x-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI Content Optimizer: {scoreData.suggestions[0].title}</span>
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400">{scoreData.suggestions[0].desc}</p>
                </div>
                <button
                  onClick={() => {
                    const optimized = contentScorer.optimizeWithAI(currentContent, scoreData.suggestions[0].type, activeBrand);
                    setGeneratedOutputs({ ...generatedOutputs, [activeTab]: optimized });
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shrink-0 transition-colors shadow-xs"
                >
                  Apply 1-Click Fix
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

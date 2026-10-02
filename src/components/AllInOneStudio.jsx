import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  CalendarPlus, 
  Download, 
  Volume2, 
  ArrowRight, 
  Palette, 
  Video, 
  FileText, 
  Languages, 
  CheckCircle2, 
  RefreshCw,
  Share2,
  Sliders,
  Flame,
  Rocket,
  BookOpen,
  Lightbulb,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { geminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';

export function AllInOneStudio({ activeBrand, onSendToCalendar, onSendToVoiceover, onOpenScoreModal }) {
  const [topic, setTopic] = useState('Why utility-first content beats vanity metrics in 2026');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePlatformTab, setActivePlatformTab] = useState('linkedin');
  const [activeLangTab, setActiveLangTab] = useState('hindi');
  const [copiedKey, setCopiedKey] = useState(null);
  const [scheduledAll, setScheduledAll] = useState(false);

  // Deliverable B Interactive Carousel State
  const [visualSlideIndex, setVisualSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Quick 1-Click Templates with soft pastel colors & icons
  const quickTemplates = [
    {
      icon: Rocket,
      title: 'Product Launch',
      color: 'from-pink-500/15 via-rose-500/10 to-purple-500/15 border-pink-400/40 text-pink-400',
      badge: '🚀 Launch',
      prompt: `Introducing the new breakthrough from ${activeBrand?.name || 'ContentCraft'}: science-backed, natural formulation designed for real results in 7 days.`
    },
    {
      icon: BookOpen,
      title: '3-Step Framework',
      color: 'from-sky-500/15 via-blue-500/10 to-indigo-500/15 border-sky-400/40 text-sky-400',
      badge: '📚 Guide',
      prompt: `Stop making this classic mistake in 2026. Here are the 3 utility pillars our team uses to 10x organic retention.`
    },
    {
      icon: Flame,
      title: 'Contrarian Hot Take',
      color: 'from-purple-500/15 via-violet-500/10 to-indigo-500/15 border-purple-400/40 text-purple-400',
      badge: '🔥 Hot Take',
      prompt: `Unpopular opinion: Traditional content creation is dead. Here is why agentic multi-format workflows are winning.`
    },
    {
      icon: Lightbulb,
      title: 'Customer Story',
      color: 'from-emerald-500/15 via-teal-500/10 to-cyan-500/15 border-emerald-400/40 text-emerald-400',
      badge: '💡 Story',
      prompt: `How our community went from spending 14 hours a week on social media to launching 5 campaigns in 10 minutes.`
    }
  ];

  // Generated All-in-One Data
  const [campaignData, setCampaignData] = useState({
    copy: {
      linkedin: `Most people treat content as disposable entertainment.\n\nHere is what our data across ${activeBrand?.name || 'ContentCraft'} taught us: Utility > Attention.\n\n3 key takeaways for teams scaling in 2026:\n\n1. Stop optimizing for passive vanity likes. Focus on High-Intent Saves and Direct Message shares.\n2. When your frameworks solve an immediate problem, your distribution compounds over weeks.\n3. Brand consistency isn't repeating a logo—it's maintaining a recognizable perspective.\n\nWhat is your team prioritizing this quarter: reach or retention?\n\n#ContentStrategy #Growth #ThoughtLeadership #${(activeBrand?.name || 'ContentCraft').replace(/\s+/g, '')}`,
      instagram: `The truth about modern content strategy nobody tells you 💡👇\n\nA post with 500 views that gets saved 80 times will receive 10x more continuous distribution than a post with 5,000 views that gets zero saves.\n\nSave this checklist before your next sprint: ✨\n\n📌 Pillar 1: High-signal frameworks over vague opinions\n📌 Pillar 2: Proprietary case studies & real numbers\n📌 Pillar 3: Saveable swipe carousels that work as digital cheat sheets\n\nDrop a "🚀" in the comments if you want our full framework checklist sent to your DMs!\n\n.\n.\n#${(activeBrand?.name || 'ContentCraft').replace(/\s+/g, '')} #CreatorTips #GrowthHacks #InstaGrowth #SmartMarketing #BrandIdentity`,
      twitter: `1/5 The content playbook completely changed in 2026.\n\nIf you're still chasing surface-level metrics, you are leaving 80% of distribution on the table 🧵👇\n\n2/5 Algorithms now prioritize SAVES and DM SHARES over passive likes.\n\n3/5 Transition from "Attention Entertainment" to "Utility Creation". Ask: "Would someone bookmark this to use next Tuesday?"\n\n4/5 The 3 pillars: Frameworks over opinions, proprietary test data, and saveable cheat sheets.\n\n5/5 Retweet to help another creator and follow @${(activeBrand?.name || 'contentcraft').toLowerCase().replace(/\s+/g, '')} for weekly breakdown frameworks 🚀`
    },
    visual: {
      headline: 'Why Utility Content Beats Vanity Metrics Every Time',
      badge: '2026 PLAYBOOK',
      subtext: '3 frameworks for scaling authentic brand reach without ad spend.',
      cta: 'Swipe to Read ➡️'
    },
    reel: {
      hook: 'Stop doing this one thing if you care about your audience retention in 2026.',
      problem: 'Everyone chases vanity likes. But likes don\'t build businesses. Saves and DM shares do.',
      solution: `Here are the 3 utility pillars we use at ${activeBrand?.name || 'ContentCraft'}: frameworks over opinions, your own test data, and visual cheat sheets.`,
      cta: 'Comment "PLAYBOOK" below and I will send you our exact template for free!'
    },
    multilingual: {
      hindi: {
        headline: 'खोखले दावों से दूर, विज्ञान और काम का असली संगम।',
        body: `रातों-रात चमत्कार का दावा करने वाले कंटेंट को छोड़िए। ${activeBrand?.name || 'हम'} लेकर आए हैं वो नियम जो आपके काम को असल में उपयोगी बनाते हैं।`,
        cta: 'पूरा फ्रेमवर्क जानने के लिए नीचे टैप करें ✨'
      },
      hinglish: {
        headline: 'Vanity likes ka jhootha game nahi, real utility ka compounding effect.',
        body: `Stop wasting 14 hours every week on random posts. ${activeBrand?.name || 'ContentCraft'} ke saath 1 idea se banao platform-ready campaigns sirf 10 seconds mein.`,
        cta: 'Abhi test karein aur apne workflow ko upgrade karein! 🚀'
      },
      telugu: {
        headline: 'వ్యర్థమైన లైక్‌లు కాదు, నిజమైన విలువనిచ్చే కంటెంట్.',
        body: `సోషల్ మీడియాలో ఎక్కువ మంది చేసే పొరపాట్లను ఆపండి. ${activeBrand?.name || 'కంటెంట్ క్రాఫ్ట్'} ద్వారా మీ ఆలోచనలను శక్తివంతమైన ప్రచారాలుగా మార్చుకోండి.`,
        cta: 'మరిన్ని వివరాల కోసం ఇప్పుడే క్లిక్ చేయండి ✨'
      },
      tamil: {
        headline: 'வெற்று விளம்பரங்கள் இல்லை, உண்மையான பலன் தரும் உத்திகள்.',
        body: `நேரத்தை வீணடிக்கும் வழக்கமான பதிவுகளை நிறுத்துங்கள். ${activeBrand?.name || 'எங்களுடன்'} இணைந்து 1 யோசனையை அனைத்து தளங்களுக்கும் ஏற்றவாறு மாற்றுங்கள்.`,
        cta: 'முழு விவரங்களை அறிய கீழே தொடவும் 🌿'
      }
    }
  });

  // Carousel Slides for Deliverable B
  const visualSlides = [
    {
      badge: campaignData.visual.badge,
      headline: campaignData.visual.headline,
      subtext: campaignData.visual.subtext,
      cta: 'Swipe to Read ➡️'
    },
    {
      badge: 'SLIDE 2 OF 3 · FRAMEWORK',
      headline: 'Pillar 1 & 2: High-Signal Utility Over Vanity Likes',
      subtext: 'High-intent saves & DM shares compound organic reach far beyond surface-level metrics.',
      cta: 'Next Slide ➡️'
    },
    {
      badge: 'SLIDE 3 OF 3 · PLAYBOOK',
      headline: 'Pillar 3: Saveable Cheat Sheets & Real Case Data',
      subtext: 'Build swipeable carousels that serve as digital reference guides for your target audience.',
      cta: '↺ Back to Cover'
    }
  ];

  const currentVisualSlide = visualSlides[visualSlideIndex] || visualSlides[0];

  const handleNextSlide = () => {
    setVisualSlideIndex((prev) => (prev + 1) % visualSlides.length);
  };

  const handlePrevSlide = () => {
    setVisualSlideIndex((prev) => (prev - 1 + visualSlides.length) % visualSlides.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    if (diffX > 40) {
      handleNextSlide();
    } else if (diffX < -40) {
      handlePrevSlide();
    }
    setTouchStartX(null);
  };

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    try {
      const [repurposed, variations, multilingual] = await Promise.all([
        geminiService.repurposeContent({ rawContent: topic, brand: activeBrand }),
        geminiService.generateVariations(topic, activeBrand),
        geminiService.generateMultilingual(topic, activeBrand)
      ]);

      setCampaignData({
        copy: {
          linkedin: repurposed.linkedin,
          instagram: repurposed.instagram,
          twitter: repurposed.twitter
        },
        visual: {
          headline: variations[0]?.hook?.slice(0, 60) || 'Why Utility Content Beats Vanity Metrics',
          badge: '2026 PLAYBOOK',
          subtext: variations[0]?.body?.slice(0, 90) || '3 frameworks for scaling authentic brand reach without ad spend.',
          cta: 'Swipe to Read ➡️'
        },
        reel: {
          hook: variations[0]?.hook || 'Stop doing this one thing in 2026.',
          problem: 'Most creators spend hours writing long posts that vanish into the algorithm.',
          solution: `Here is the shift: we turn ONE core idea into LinkedIn carousels, reels, and tweets simultaneously.`,
          cta: 'Comment "STUDIO" below and I will send you our exact AI workflow for free!'
        },
        multilingual: {
          hindi: multilingual.hindi,
          hinglish: multilingual.hinglish,
          telugu: multilingual.telugu,
          tamil: multilingual.tamil
        }
      });
      setVisualSlideIndex(0);

      confetti({
        particleCount: 120,
        spread: 90,
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

  const handleScheduleAllToCalendar = () => {
    const days = [1, 2, 3, 4];
    const items = [
      { title: `LinkedIn: ${campaignData.visual.headline.slice(0, 30)}...`, platform: 'linkedin', content: campaignData.copy.linkedin },
      { title: `Instagram Visual: ${campaignData.visual.badge}`, platform: 'instagram', content: campaignData.copy.instagram },
      { title: `Reel Script: ${campaignData.reel.hook.slice(0, 30)}...`, platform: 'reel', content: `${campaignData.reel.hook}\n\n${campaignData.reel.solution}\n\n${campaignData.reel.cta}` },
      { title: `Hindi/Regional Post: ${campaignData.multilingual.hindi.headline.slice(0, 25)}...`, platform: 'instagram', content: `${campaignData.multilingual.hindi.headline}\n\n${campaignData.multilingual.hindi.body}` }
    ];

    items.forEach((item, idx) => {
      const targetDate = new Date(Date.now() + (days[idx] * 86400000)).toISOString().split('T')[0];
      storageService.addCalendarPost({
        ...item,
        brandId: activeBrand?.id || 'glowskin',
        date: targetDate,
        time: idx % 2 === 0 ? '11:00' : '18:30',
        status: 'Scheduled',
        aiScore: 95
      });
    });

    setScheduledAll(true);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => setScheduledAll(false), 3500);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner - Soft Pastel Theme */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-400/30 dark:border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/10 via-sky-500/10 to-emerald-500/10 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-black shadow-md">
              <Zap className="w-4 h-4 fill-current" />
              <span>Easy Mode: 1-Click All-in-One Generator</span>
            </div>
            
            <h1 className="serif-headline text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Turn 1 Idea into a Complete Cross-Platform Campaign
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed font-medium">
              No need to click through multiple tabs. Enter your topic or click a ready template below, and ContentCraft AI automatically builds your <strong className="text-purple-400 font-extrabold">Social Copy</strong>, <strong className="text-sky-400 font-extrabold">Visual Ad Card</strong>, <strong className="text-pink-400 font-extrabold">Reel Script</strong>, and <strong className="text-emerald-400 font-extrabold">Indic Translations</strong> simultaneously.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={handleScheduleAllToCalendar}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-purple-500/30 flex items-center justify-center space-x-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] border border-purple-400/30"
            >
              {scheduledAll ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>All 4 Assets Scheduled! 🎉</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-4 h-4 text-purple-200" />
                  <span>Schedule Entire Campaign (4 Posts)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Step 1: Input Brief & Soft Pastel Templates */}
      <div className="glass-panel rounded-3xl p-6 border space-y-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-200/80 dark:border-neutral-800">
          <div className="flex items-center space-x-3">
            <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-purple-500/25">
              1
            </span>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Enter Your Idea or Click a Ready-to-Use Template
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400">Pick a quick starter prompt below or write your own</p>
            </div>
          </div>
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-400">
            <span>Brand Voice:</span>
            <span className="font-extrabold underline">{activeBrand?.name}</span>
          </div>
        </div>

        {/* 1-Click Template Pills - Soft Pastel Styles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickTemplates.map((t, idx) => {
            const Icon = t.icon;
            const isSelected = selectedTemplateIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setTopic(t.prompt);
                  setSelectedTemplateIndex(idx);
                }}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group shadow-xs ${
                  isSelected 
                    ? 'ring-2 ring-purple-500 border-purple-500 bg-purple-500/15 shadow-md shadow-purple-500/20 scale-[1.02]' 
                    : `bg-gradient-to-br ${t.color} hover:scale-[1.01]`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-black/10 dark:bg-white/10">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 dark:bg-black/40 text-slate-900 dark:text-white border border-black/10">
                      {t.badge}
                    </span>
                  </div>
                </div>

                <p className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                  {t.title}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-neutral-300 line-clamp-2 mt-1 leading-snug">
                  {t.prompt}
                </p>
              </button>
            );
          })}
        </div>

        {/* Input Textarea & Pastel Generate CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setSelectedTemplateIndex(null);
              }}
              placeholder="Type your product feature, blog idea, or topic..."
              className="w-full bg-slate-50 dark:bg-neutral-950 border-2 border-slate-200 dark:border-neutral-800 rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all shadow-inner"
            />
          </div>

          <button
            onClick={handleGenerateAll}
            disabled={isGenerating || !topic.trim()}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-purple-500/25 flex items-center justify-center space-x-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shrink-0 border border-purple-400/30"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Crafting Campaign...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-current text-white" />
                <span>Generate Campaign Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step 2: The 4 Unified Campaign Output Cards */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-purple-500/25">
              2
            </span>
            <div>
              <h2 className="text-base font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Generated Campaign Deliverables (Synchronized)
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">All 4 assets crafted instantly from your idea</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card A: Multi-Platform Social Copy */}
          <div className="glass-panel accent-border-purple rounded-3xl p-6 border space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Deliverable A: Social Post Copy</h3>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400">Tailored length, formatting & hashtags</p>
                  </div>
                </div>

                {/* Sub-tabs for LinkedIn, Instagram, X */}
                <div className="flex items-center space-x-1 bg-slate-200/70 dark:bg-neutral-950 p-1 rounded-2xl border border-slate-300/80 dark:border-neutral-800">
                  {['linkedin', 'instagram', 'twitter'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePlatformTab(p)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                        activePlatformTab === p
                          ? p === 'linkedin' ? 'bg-sky-600 text-white shadow-md' : p === 'instagram' ? 'bg-pink-600 text-white shadow-md' : 'bg-slate-900 dark:bg-neutral-800 text-white shadow-md'
                          : 'text-slate-700 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      {p === 'twitter' ? 'X (Twitter)' : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy Content Area */}
              <div className="relative">
                <textarea
                  rows={9}
                  value={campaignData.copy[activePlatformTab]}
                  onChange={(e) => setCampaignData({
                    ...campaignData,
                    copy: { ...campaignData.copy, [activePlatformTab]: e.target.value }
                  })}
                  className="w-full bg-slate-50 dark:bg-neutral-950/90 border border-slate-300 dark:border-neutral-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 dark:text-neutral-200 leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-200/80 dark:border-neutral-800/80">
              <button
                onClick={() => {
                  if (onOpenScoreModal) {
                    onOpenScoreModal(
                      campaignData.copy[activePlatformTab],
                      activePlatformTab,
                      (optimizedText) => {
                        setCampaignData(prev => ({
                          ...prev,
                          copy: { ...prev.copy, [activePlatformTab]: optimizedText }
                        }));
                      }
                    );
                  }
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-xs font-extrabold transition-all cursor-pointer shadow-xs"
                title="Click to view detailed AI Quality Score breakdown & 1-Click AI Fixes"
              >
                <span>⚡ AI Score & Optimizer (95/100)</span>
              </button>
              <button
                onClick={() => handleCopy(campaignData.copy[activePlatformTab], activePlatformTab)}
                className="px-4 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-900 dark:text-white border border-slate-300 dark:border-neutral-700 text-xs font-extrabold flex items-center space-x-1.5 transition-all active:scale-95 shadow-xs"
              >
                {copiedKey === activePlatformTab ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === activePlatformTab ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          {/* Card B: Visual Ad Creative (Interactive Multi-Slide Carousel) */}
          <div className="glass-panel accent-border-rose rounded-3xl p-6 border space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-rose-500/15 text-pink-400 border border-rose-500/30">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Deliverable B: Visual Ad Creative</h3>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400">Interactive 3-Slide Carousel Card (Swipe / Click)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-extrabold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-xs">
                    Slide {visualSlideIndex + 1} of {visualSlides.length}
                  </span>
                </div>
              </div>

              {/* Interactive Visual Preview Card with Touch & Click Swipe Support */}
              <div 
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="w-full aspect-[16/9] rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between border-2 border-purple-500/30 group cursor-grab active:cursor-grabbing"
                style={{ background: 'linear-gradient(135deg, #0f111a 0%, #1e152a 50%, #291838 100%)' }}
              >
                {/* Left / Right Carousel Controls Overlay */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-purple-600/80 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100 hover:scale-110"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-purple-600/80 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100 hover:scale-110"
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Top Brand Name & Slide Badge */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
                    <span className="text-xs font-black text-white tracking-wide uppercase">
                      {activeBrand?.name || 'ContentCraft'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-500/30 text-purple-200 border border-purple-400/40">
                    {currentVisualSlide.badge}
                  </span>
                </div>

                {/* Dynamic Slide Content */}
                <div className="z-10 my-auto py-2">
                  <h4 className="serif-headline text-lg sm:text-xl font-bold text-white leading-tight">
                    {currentVisualSlide.headline}
                  </h4>
                  <p className="text-xs text-purple-200/80 mt-1.5 line-clamp-2 leading-relaxed">
                    {currentVisualSlide.subtext}
                  </p>
                </div>

                {/* Bottom Bar: Action CTA & Slide Dots */}
                <div className="flex items-center justify-between z-10">
                  <button
                    onClick={handleNextSlide}
                    className="px-4 py-1.5 rounded-full text-[11px] font-black bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center space-x-1"
                  >
                    <span>{currentVisualSlide.cta}</span>
                  </button>

                  {/* Slide Dots Indicator */}
                  <div className="flex items-center space-x-1.5">
                    {visualSlides.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setVisualSlideIndex(sIdx)}
                        className={`h-2 rounded-full transition-all ${
                          visualSlideIndex === sIdx ? 'w-5 bg-purple-400' : 'w-2 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-purple-300/70 font-mono font-bold hidden sm:inline">
                    {activeBrand?.website?.replace('https://', '') || 'contentcraft.ai'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-200/80 dark:border-neutral-800/80">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-neutral-400">
                👉 Click arrows or swipe card to flip slides
              </span>
              <button
                onClick={() => {
                  alert('For custom high-res rendering and multiple aspect ratios (1:1, 4:5, 16:9, 9:16), visit the Visual Studio tab in the sidebar!');
                }}
                className="px-4 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-700 dark:text-sky-300 border border-sky-500/30 text-xs font-extrabold flex items-center space-x-1.5 transition-all active:scale-95 shadow-xs"
              >
                <Palette className="w-4 h-4 text-sky-400" />
                <span>Customize in Studio</span>
              </button>
            </div>
          </div>

          {/* Card C: Video Reel Script & Storyboard */}
          <div className="glass-panel accent-border-rose rounded-3xl p-6 border space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-pink-500/15 text-rose-400 border border-pink-500/30">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Deliverable C: 30s Reel Storyboard</h3>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400">Hook, Problem, Solution, CTA timing</p>
                  </div>
                </div>

                <button
                  onClick={() => onSendToVoiceover(`${campaignData.reel.hook} ${campaignData.reel.solution} ${campaignData.reel.cta}`)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-extrabold flex items-center space-x-1.5 transition-all shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Audition Audio</span>
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                  <span className="text-[10px] text-purple-400 font-black uppercase tracking-wider block">0-3s Hook:</span>
                  <p className="text-slate-900 dark:text-white font-extrabold italic mt-0.5">"{campaignData.reel.hook}"</p>
                </div>

                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30">
                  <span className="text-[10px] text-sky-400 font-black uppercase tracking-wider block">12-25s Solution:</span>
                  <p className="text-slate-800 dark:text-neutral-200 font-medium mt-0.5">{campaignData.reel.solution}</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider block">25-30s CTA:</span>
                  <p className="text-slate-900 dark:text-white font-bold mt-0.5">"{campaignData.reel.cta}"</p>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-200/80 dark:border-neutral-800/80">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-neutral-400">
                Ready for TikTok, Reels & YouTube Shorts
              </span>
              <button
                onClick={() => handleCopy(`${campaignData.reel.hook}\n\n${campaignData.reel.solution}\n\n${campaignData.reel.cta}`, 'reel-script')}
                className="px-4 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-900 dark:text-white border border-slate-300 dark:border-neutral-700 text-xs font-extrabold flex items-center space-x-1.5 transition-all active:scale-95 shadow-xs"
              >
                {copiedKey === 'reel-script' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'reel-script' ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>
          </div>

          {/* Card D: Indic Multilingual Localization */}
          <div className="glass-panel accent-border-emerald rounded-3xl p-6 border space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <Languages className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Deliverable D: Indic Regional Campaigns</h3>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400">Cultural nuances & brand tone match</p>
                  </div>
                </div>

                {/* Language switcher */}
                <div className="flex items-center space-x-1 bg-slate-200/70 dark:bg-neutral-950 p-1 rounded-2xl border border-slate-300/80 dark:border-neutral-800">
                  {['hindi', 'hinglish', 'telugu', 'tamil'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setActiveLangTab(l)}
                      className={`px-3 py-1 rounded-xl text-xs font-extrabold capitalize transition-all ${
                        activeLangTab === l
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'text-slate-700 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Language Content */}
              {campaignData.multilingual[activeLangTab] && (
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider block">Headline Hook:</span>
                    <p className="text-slate-900 dark:text-white font-extrabold text-sm leading-snug mt-0.5">
                      "{campaignData.multilingual[activeLangTab].headline}"
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold uppercase block">Body:</span>
                    <p className="text-slate-800 dark:text-neutral-300 leading-relaxed font-medium mt-0.5">
                      {campaignData.multilingual[activeLangTab].body}
                    </p>
                  </div>

                  <div className="pt-1 border-t border-emerald-500/20">
                    <span className="text-[10px] text-emerald-400 font-black uppercase block">Call to Action:</span>
                    <p className="text-slate-900 dark:text-white font-bold mt-0.5">
                      👉 {campaignData.multilingual[activeLangTab].cta}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 flex items-center justify-between text-xs border-t border-slate-200/80 dark:border-neutral-800/80">
              <span className="text-[11px] font-extrabold text-emerald-400">
                ✓ Colloquial Indian Regional Tone
              </span>
              <button
                onClick={() => {
                  const item = campaignData.multilingual[activeLangTab];
                  handleCopy(`${item.headline}\n\n${item.body}\n\n${item.cta}`, activeLangTab);
                }}
                className="px-4 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-900 dark:text-white border border-slate-300 dark:border-neutral-700 text-xs font-extrabold flex items-center space-x-1.5 transition-all active:scale-95 shadow-xs"
              >
                {copiedKey === activeLangTab ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === activeLangTab ? 'Copied!' : 'Copy Localized'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

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
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { geminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';

export function AllInOneStudio({ activeBrand, onSendToCalendar, onSendToVoiceover, onOpenScoreModal }) {
  const [topic, setTopic] = useState('Why utility-first content beats vanity metrics in 2026');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePlatformTab, setActivePlatformTab] = useState('linkedin');
  const [activeLangTab, setActiveLangTab] = useState('hindi');
  const [copiedKey, setCopiedKey] = useState(null);
  const [scheduledAll, setScheduledAll] = useState(false);

  // Quick 1-Click Templates
  const quickTemplates = [
    {
      title: '🚀 Product Launch Announcement',
      prompt: `Introducing the new breakthrough from ${activeBrand?.name || 'ContentCraft'}: science-backed, natural formulation designed for real results in 7 days.`
    },
    {
      title: '📚 3-Step Educational Framework',
      prompt: `Stop making this classic mistake in 2026. Here are the 3 utility pillars our team uses to 10x organic retention.`
    },
    {
      title: '🔥 Contrarian Industry Hot Take',
      prompt: `Unpopular opinion: Traditional content creation is dead. Here is why agentic multi-format workflows are winning.`
    },
    {
      title: '💡 Customer Transformation Story',
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

      confetti({
        particleCount: 100,
        spread: 80,
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
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setScheduledAll(false), 3000);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Easy Mode: 1-Click All-in-One Generator</span>
            </div>
            
            <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 tracking-tight">
              Turn 1 Idea into a Complete Cross-Platform Campaign
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
              No need to click through multiple tabs. Enter your topic or click a quick template, and ContentCraft AI automatically builds your <strong className="text-slate-900 dark:text-neutral-200">Social Copy</strong>, <strong className="text-slate-900 dark:text-neutral-200">Visual Ad Card</strong>, <strong className="text-slate-900 dark:text-neutral-200">Reel Script</strong>, and <strong className="text-slate-900 dark:text-neutral-200">Indic Translations</strong> simultaneously.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={handleScheduleAllToCalendar}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
            >
              {scheduledAll ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>All 4 Assets Scheduled!</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-4 h-4" />
                  <span>Schedule Entire Campaign (4 Posts)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Step 1: Input Brief & Quick Templates */}
      <div className="glass-panel rounded-2xl p-5 border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200 flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-[11px]">1</span>
            <span>Enter Your Idea or Click a Ready-to-Use Template</span>
          </label>
          <span className="text-[11px] text-slate-500 dark:text-neutral-400">
            Brand Voice: <strong className="text-amber-500">{activeBrand?.name}</strong>
          </span>
        </div>

        {/* 1-Click Template Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {quickTemplates.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setTopic(t.prompt)}
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900/80 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800/80 hover:border-amber-400 text-left transition-all text-xs group shadow-2xs"
            >
              <p className="font-bold text-slate-800 dark:text-neutral-200 group-hover:text-amber-500 transition-colors line-clamp-1">
                {t.title}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                {t.prompt}
              </p>
            </button>
          ))}
        </div>

        {/* Input Textarea & Big Generate CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Type your product feature, blog idea, or topic..."
            className="flex-1 bg-white dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-sans shadow-2xs"
          />

          <button
            onClick={handleGenerateAll}
            disabled={isGenerating || !topic.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] disabled:opacity-50 shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                <span>Crafting Campaign...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Generate Campaign Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step 2: The 4 Unified Campaign Output Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-[11px]">2</span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200">
              Generated Campaign Deliverables (Synchronized)
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-neutral-400">Review & customize below</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card A: Multi-Platform Social Copy */}
          <div className="glass-panel rounded-2xl p-5 border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-neutral-100">Deliverable A: Social Post Copy</h3>
                    <p className="text-[10px] text-slate-500 dark:text-neutral-400">Platform-tailored length & hooks</p>
                  </div>
                </div>

                {/* Sub-tabs for LinkedIn, Instagram, X */}
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-neutral-950 p-1 rounded-xl border border-slate-200 dark:border-neutral-800">
                  {['linkedin', 'instagram', 'twitter'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePlatformTab(p)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                        activePlatformTab === p
                          ? 'bg-amber-500 text-neutral-950 shadow-xs'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
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
                  className="w-full bg-slate-50 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-neutral-200 leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
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
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-all cursor-pointer"
                title="Click to view detailed AI Quality Score breakdown & 1-Click AI Fixes"
              >
                <span>⚡ AI Score & Optimizer</span>
              </button>
              <button
                onClick={() => handleCopy(campaignData.copy[activePlatformTab], activePlatformTab)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                {copiedKey === activePlatformTab ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === activePlatformTab ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          {/* Card B: Visual Ad Creative (Live Canvas Card) */}
          <div className="glass-panel rounded-2xl p-5 border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-neutral-100">Deliverable B: Visual Ad Creative</h3>
                    <p className="text-[10px] text-slate-500 dark:text-neutral-400">Branded social graphic card (1:1 / 4:5)</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Ready to Export
                </span>
              </div>

              {/* Mini Visual Preview Card */}
              <div 
                className="w-full aspect-[16/9] rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between border border-black/10"
                style={{ background: 'linear-gradient(135deg, #09090b 0%, #17120a 50%, #241604 100%)' }}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {activeBrand?.name || 'ContentCraft'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {campaignData.visual.badge}
                  </span>
                </div>

                <div className="z-10 my-auto py-2">
                  <h4 className="serif-headline text-base sm:text-lg font-bold text-white leading-tight">
                    {campaignData.visual.headline}
                  </h4>
                  <p className="text-[11px] text-neutral-300 mt-1 line-clamp-2">
                    {campaignData.visual.subtext}
                  </p>
                </div>

                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-neutral-950">
                    {campaignData.visual.cta}
                  </span>
                  <span className="text-[9px] text-neutral-400 font-mono">
                    {activeBrand?.website?.replace('https://', '') || 'contentcraft.ai'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 dark:text-neutral-400">
                Rendered with {activeBrand?.name}'s brand colors
              </span>
              <button
                onClick={() => {
                  alert('For custom high-res rendering and multiple aspect ratios (1:1, 4:5, 16:9, 9:16), visit the Visual Studio tab in the sidebar!');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Palette className="w-3.5 h-3.5 text-blue-500" />
                <span>Customize in Studio</span>
              </button>
            </div>
          </div>

          {/* Card C: Video Reel Script & Storyboard */}
          <div className="glass-panel rounded-2xl p-5 border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-neutral-100">Deliverable C: 30s Reel Storyboard</h3>
                    <p className="text-[10px] text-slate-500 dark:text-neutral-400">Hook, Problem, Solution, Call to action</p>
                  </div>
                </div>

                <button
                  onClick={() => onSendToVoiceover(`${campaignData.reel.hook} ${campaignData.reel.solution} ${campaignData.reel.cta}`)}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-[11px] font-bold flex items-center space-x-1"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Audition Audio</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block">0-3s Hook:</span>
                  <p className="text-slate-900 dark:text-neutral-100 font-semibold italic">"{campaignData.reel.hook}"</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase block">12-25s Solution:</span>
                  <p className="text-slate-700 dark:text-neutral-300">{campaignData.reel.solution}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">25-30s CTA:</span>
                  <p className="text-slate-800 dark:text-neutral-200">"{campaignData.reel.cta}"</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 dark:text-neutral-400">
                Ready for TikTok, Reels & YouTube Shorts
              </span>
              <button
                onClick={() => handleCopy(`${campaignData.reel.hook}\n\n${campaignData.reel.solution}\n\n${campaignData.reel.cta}`, 'reel-script')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                {copiedKey === 'reel-script' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'reel-script' ? 'Copied' : 'Copy Script'}</span>
              </button>
            </div>
          </div>

          {/* Card D: Indic Multilingual Localization */}
          <div className="glass-panel rounded-2xl p-5 border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Languages className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-neutral-100">Deliverable D: Indic Regional Campaigns</h3>
                    <p className="text-[10px] text-slate-500 dark:text-neutral-400">Preserves cultural nuances & brand tone</p>
                  </div>
                </div>

                {/* Language switcher */}
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-neutral-950 p-1 rounded-xl border border-slate-200 dark:border-neutral-800">
                  {['hindi', 'hinglish', 'telugu', 'tamil'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setActiveLangTab(l)}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold capitalize transition-all ${
                        activeLangTab === l
                          ? 'bg-emerald-500 text-neutral-950 shadow-xs'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Language Content */}
              {campaignData.multilingual[activeLangTab] && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-bold block">Headline Hook:</span>
                    <p className="text-slate-900 dark:text-neutral-100 font-bold leading-relaxed">
                      "{campaignData.multilingual[activeLangTab].headline}"
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-bold block">Body:</span>
                    <p className="text-slate-700 dark:text-neutral-300 leading-relaxed">
                      {campaignData.multilingual[activeLangTab].body}
                    </p>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold block">Call to Action:</span>
                    <p className="text-slate-800 dark:text-neutral-200 font-medium">
                      👉 {campaignData.multilingual[activeLangTab].cta}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                ✓ Colloquial Indian Adaptation
              </span>
              <button
                onClick={() => {
                  const item = campaignData.multilingual[activeLangTab];
                  handleCopy(`${item.headline}\n\n${item.body}\n\n${item.cta}`, activeLangTab);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                {copiedKey === activeLangTab ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === activeLangTab ? 'Copied' : 'Copy Localized'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

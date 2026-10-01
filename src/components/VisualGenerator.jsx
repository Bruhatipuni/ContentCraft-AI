import React, { useState, useRef } from 'react';
import { 
  Palette, 
  Download, 
  Sparkles, 
  Sliders, 
  Ratio, 
  Type, 
  Wand2, 
  Check, 
  Copy,
  Layers
} from 'lucide-react';

export function VisualGenerator({ activeBrand }) {
  const [aspectRatio, setAspectRatio] = useState('1:1'); // '1:1', '4:5', '16:9', '9:16'
  const [theme, setTheme] = useState('modern-dark'); // 'modern-dark', 'clean-light', 'bold-gradient', 'brand-accent'
  const [headline, setHeadline] = useState('5 Signs You Need an Agentic Content Studio');
  const [subtext, setSubtext] = useState('How modern brands repurpose 1 piece of content into 50+ assets.');
  const [badgeText, setBadgeText] = useState('2026 Strategy Guide');
  const [ctaText, setCtaText] = useState('Save for Later');
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Hidden canvas for high-res direct PNG rendering
  const canvasRef = useRef(null);

  // Brand preset themes
  const brandPrimary = activeBrand?.colors?.primary || '#f59e0b';
  const brandSecondary = activeBrand?.colors?.secondary || '#0f172a';

  const themes = {
    'modern-dark': {
      name: 'Midnight Modern',
      bg: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
      accentColor: brandPrimary,
      textColor: '#ffffff',
      subtextColor: '#a1a1aa',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.4)',
      badgeText: brandPrimary,
      ctaBg: brandPrimary,
      ctaText: '#09090b'
    },
    'clean-light': {
      name: 'Studio Minimalist',
      bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      accentColor: brandSecondary,
      textColor: '#0f172a',
      subtextColor: '#475569',
      badgeBg: '#ffffff',
      badgeBorder: '#cbd5e1',
      badgeText: '#0f172a',
      ctaBg: '#0f172a',
      ctaText: '#ffffff'
    },
    'bold-gradient': {
      name: 'Sunset Neon',
      bg: 'linear-gradient(135deg, #4338ca 0%, #7e22ce 50%, #be185d 100%)',
      accentColor: '#fbbf24',
      textColor: '#ffffff',
      subtextColor: '#f1f5f9',
      badgeBg: 'rgba(255, 255, 255, 0.2)',
      badgeBorder: 'rgba(255, 255, 255, 0.4)',
      badgeText: '#ffffff',
      ctaBg: '#ffffff',
      ctaText: '#4338ca'
    },
    'brand-accent': {
      name: `${activeBrand?.name || 'Brand'} Custom`,
      bg: `linear-gradient(135deg, ${brandSecondary} 0%, #1e293b 100%)`,
      accentColor: brandPrimary,
      textColor: '#ffffff',
      subtextColor: '#cbd5e1',
      badgeBg: `${brandPrimary}22`,
      badgeBorder: `${brandPrimary}66`,
      badgeText: brandPrimary,
      ctaBg: brandPrimary,
      ctaText: '#000000'
    }
  };

  const currentTheme = themes[theme] || themes['modern-dark'];

  // AI Prompt generated for external tools (Midjourney, DALL-E)
  const generatedImagePrompt = `Editorial social media marketing banner, ultra-clean aesthetic, ${activeBrand?.voice?.tone || 'professional'} tone, minimalist typography reading "${headline}", abstract 3D geometric glass prisms reflecting ${currentTheme.accentColor} light, 8k resolution, cinematic studio lighting --ar ${aspectRatio.replace(':', ':')}`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedImagePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '1:1':
        return 'aspect-square max-w-[420px] w-full';
      case '4:5':
        return 'aspect-[4/5] max-w-[380px] w-full';
      case '16:9':
        return 'aspect-[16/9] max-w-[560px] w-full';
      case '9:16':
        return 'aspect-[9/16] max-w-[280px] w-full';
      default:
        return 'aspect-square max-w-[420px] w-full';
    }
  };

  // Direct HTML5 Canvas PNG Exporter with fallback for older browsers
  const handleDownload = () => {
    setIsDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsDownloading(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    let width = 1200;
    let height = 1200;

    if (aspectRatio === '4:5') {
      width = 1080;
      height = 1350;
    } else if (aspectRatio === '16:9') {
      width = 1920;
      height = 1080;
    } else if (aspectRatio === '9:16') {
      width = 1080;
      height = 1920;
    }

    canvas.width = width;
    canvas.height = height;

    // Fill Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    if (theme === 'clean-light') {
      gradient.addColorStop(0, '#f8fafc');
      gradient.addColorStop(1, '#e2e8f0');
    } else if (theme === 'bold-gradient') {
      gradient.addColorStop(0, '#4338ca');
      gradient.addColorStop(0.5, '#7e22ce');
      gradient.addColorStop(1, '#be185d');
    } else if (theme === 'brand-accent') {
      gradient.addColorStop(0, brandSecondary);
      gradient.addColorStop(1, '#1e293b');
    } else {
      gradient.addColorStop(0, '#09090b');
      gradient.addColorStop(1, '#18181b');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative Blur Glow
    const radGlow = ctx.createRadialGradient(width * 0.8, height * 0.2, 50, width * 0.8, height * 0.2, 400);
    radGlow.addColorStop(0, `${currentTheme.accentColor}55`);
    radGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radGlow;
    ctx.fillRect(0, 0, width, height);

    // Grid dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let x = 40; x < width; x += 40) {
      for (let y = 40; y < height; y += 40) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Brand Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText((activeBrand?.name || 'ContentCraft AI').toUpperCase(), 80, 120);

    // Pill Badge
    ctx.fillStyle = currentTheme.badgeBg;
    ctx.fillRect(80, 180, 260, 48);
    ctx.fillStyle = currentTheme.badgeText;
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(badgeText.toUpperCase(), 105, 212);

    // Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px Georgia, serif';
    const words = headline.split(' ');
    let line = '';
    let y = 340;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > width - 160 && n > 0) {
        ctx.fillText(line, 80, y);
        line = words[n] + ' ';
        y += 80;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 80, y);

    // Subtext
    y += 40;
    ctx.fillStyle = currentTheme.subtextColor;
    ctx.font = '32px sans-serif';
    ctx.fillText(subtext, 80, y);

    // Call to Action Pill with safe rounded-rect fallback
    ctx.fillStyle = currentTheme.ctaBg;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(80, height - 160, 320, 64, [32]);
    } else {
      const rx = 80, ry = height - 160, rw = 320, rh = 64, rad = 32;
      ctx.moveTo(rx + rad, ry);
      ctx.lineTo(rx + rw - rad, ry);
      ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + rad);
      ctx.lineTo(rx + rw, ry + rh - rad);
      ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - rad, ry + rh);
      ctx.lineTo(rx + rad, ry + rh);
      ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - rad);
      ctx.lineTo(rx, ry + rad);
      ctx.quadraticCurveTo(rx, ry, rx + rad, ry);
    }
    ctx.fill();
    ctx.fillStyle = currentTheme.ctaText;
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(ctaText, 120, height - 118);

    // Trigger download
    const link = document.createElement('a');
    link.download = `contentcraft-${activeBrand?.id || 'creative'}-${aspectRatio.replace(':', 'x')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsDownloading(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wider">
              Feature 2 ⭐ Core Hero
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">AI Visual & Creative Generator</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            Visual & Ad Creative Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Generate high-converting social designs, thumbnails, and banners rendered with <span className="text-amber-600 dark:text-amber-400 font-semibold">{activeBrand?.name}</span>'s aesthetic.
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Exporting PNG...' : 'Download High-Res PNG'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Aspect Ratio Selector */}
          <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Ratio className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>1. Aspect Ratio Format</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: '1:1', label: '1:1 Square', sub: 'IG / LinkedIn' },
                { id: '4:5', label: '4:5 Portrait', sub: 'IG Feed' },
                { id: '16:9', label: '16:9 Banner', sub: 'YouTube / X' },
                { id: '9:16', label: '9:16 Story', sub: 'Reels / Shorts' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setAspectRatio(r.id)}
                  className={`p-2 rounded-lg text-center border text-xs transition-all ${
                    aspectRatio === r.id
                      ? 'bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200'
                  }`}
                >
                  <div className="font-bold">{r.id}</div>
                  <div className="text-[10px] opacity-75">{r.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Palette Presets */}
          <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Palette className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>2. Visual Theme & Mood</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(themes).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`p-2.5 rounded-lg text-left border text-xs flex items-center space-x-2.5 transition-all ${
                    theme === key
                      ? 'bg-slate-100 dark:bg-neutral-800 border-amber-500/60 text-slate-900 dark:text-neutral-100 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.accentColor }} />
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editable Creative Content Fields */}
          <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-3.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span>3. Copy & Overlay Elements</span>
            </label>

            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block">Badge Pill</label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block">Headline Hook</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block">Supporting Subtext</label>
              <input
                type="text"
                value={subtext}
                onChange={(e) => setSubtext(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block">Call to Action Pill</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* AI Image Prompt Card */}
          <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-neutral-300 flex items-center space-x-1.5">
                <Wand2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>AI Prompt for Midjourney / DALL-E</span>
              </span>
              <button
                onClick={handleCopyPrompt}
                className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1 font-semibold"
              >
                {copiedPrompt ? <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-950 p-2.5 rounded-lg border border-slate-200 dark:border-neutral-800 font-mono leading-relaxed line-clamp-3">
              {generatedImagePrompt}
            </p>
          </div>

        </div>

        {/* Live Canvas Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 glass-panel rounded-xl border border-slate-200 dark:border-neutral-800 min-h-[500px]">
          
          <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 mb-4 pb-2 border-b border-slate-200 dark:border-neutral-800">
            <span>Live Card Preview ({aspectRatio})</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">Real-time Canvas Render</span>
          </div>

          {/* Interactive Responsive Card Frame */}
          <div 
            className={`${getAspectRatioClasses()} rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 border border-black/10 dark:border-white/10`}
            style={{ background: currentTheme.bg }}
          >
            {/* Subtle Grid overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Glowing Accent Ring */}
            <div 
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: currentTheme.accentColor }}
            ></div>

            {/* Top Bar: Brand and Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow">
                {activeBrand?.name || 'ContentCraft AI'}
              </span>
              <span 
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm"
                style={{ 
                  backgroundColor: currentTheme.badgeBg, 
                  borderColor: currentTheme.badgeBorder,
                  color: currentTheme.badgeText 
                }}
              >
                {badgeText}
              </span>
            </div>

            {/* Middle: Headline and Subtext */}
            <div className="relative z-10 space-y-3 my-auto py-4">
              <h2 className="serif-headline text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-md">
                {headline}
              </h2>
              <p 
                className="text-xs sm:text-sm leading-relaxed max-w-sm drop-shadow"
                style={{ color: currentTheme.subtextColor }}
              >
                {subtext}
              </p>
            </div>

            {/* Bottom Bar: Call to Action Pill */}
            <div className="relative z-10 flex items-center justify-between pt-2">
              <div 
                className="px-4 py-2 rounded-full text-xs font-bold shadow-lg transition-transform hover:scale-105"
                style={{ 
                  backgroundColor: currentTheme.ctaBg, 
                  color: currentTheme.ctaText 
                }}
              >
                {ctaText}
              </div>
              <span className="text-[10px] text-slate-300 dark:text-neutral-400 font-mono">
                {activeBrand?.website?.replace('https://', '') || 'contentcraft.ai'}
              </span>
            </div>

          </div>

          <p className="text-[11px] text-slate-500 dark:text-neutral-500 mt-4 text-center">
            Click "Download High-Res PNG" above to export at 1200+ DPI suitable for social media advertising.
          </p>

        </div>

      </div>

      {/* Hidden canvas for PNG export rendering */}
      <canvas ref={canvasRef} className="hidden" />

    </div>
  );
}

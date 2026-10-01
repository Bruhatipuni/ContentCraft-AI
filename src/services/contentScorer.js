export const contentScorer = {
  analyzeContent: (text = '', platform = 'linkedin', brand = null) => {
    if (!text || text.trim().length === 0) {
      return {
        overall: 0,
        hook: 0,
        readability: 0,
        cta: 0,
        brandAlignment: 0,
        platformFit: 0,
        feedback: ['Start typing or generating content to view real-time AI scoring.']
      };
    }

    const cleanText = text.trim();
    const lines = cleanText.split('\n').filter(l => l.trim().length > 0);
    const firstLine = lines[0] || '';
    const wordCount = cleanText.split(/\s+/).length;
    const charCount = cleanText.length;

    // 1. Hook Strength (0-100)
    let hookScore = 40;
    const curiosityWords = ['why', 'how', 'stop', 'secret', 'truth', 'mistake', 'never', 'analyzed', 'revealed', 'data', 'behind', 'rule'];
    const hasCuriosity = curiosityWords.some(w => firstLine.toLowerCase().includes(w));
    if (hasCuriosity) hookScore += 25;
    if (/\d+/.test(firstLine)) hookScore += 15; // Numbers in hook
    if (firstLine.includes('?') || firstLine.includes('👇') || firstLine.includes(':') || firstLine.includes('🧵')) hookScore += 15;
    if (firstLine.length > 15 && firstLine.length < 120) hookScore += 10;
    hookScore = Math.min(100, Math.max(25, hookScore));

    // 2. Readability & Whitespace (0-100)
    let readabilityScore = 50;
    const avgLineLength = cleanText.length / Math.max(1, lines.length);
    if (lines.length >= 3) readabilityScore += 15;
    if (avgLineLength < 90) readabilityScore += 15; // good whitespace
    if (/[\u{1F300}-\u{1F6FF}|✨|💡|👉|👇|🔥|🚀|📈|🌿|⚡]/u.test(cleanText)) readabilityScore += 10; // visual anchors
    if (/[•\-\*\d\.]\s+/.test(cleanText)) readabilityScore += 15; // bulleted or numbered
    readabilityScore = Math.min(100, Math.max(30, readabilityScore));

    // 3. CTA Clarity (0-100)
    let ctaScore = 30;
    const ctaKeywords = ['comment', 'save', 'share', 'link in bio', 'subscribe', 'dm me', 'click', 'read more', 'try now', 'thoughts?', 'what do you think', 'tap below'];
    const lower = cleanText.toLowerCase();
    const foundCta = ctaKeywords.filter(k => lower.includes(k));
    if (foundCta.length >= 1) ctaScore += 45;
    if (foundCta.length >= 2) ctaScore += 15;
    if (lines[lines.length - 1] && ctaKeywords.some(k => lines[lines.length - 1].toLowerCase().includes(k))) ctaScore += 10;
    ctaScore = Math.min(100, Math.max(20, ctaScore));

    // 4. Brand Alignment (0-100)
    let brandScore = 70;
    if (brand) {
      const brandWords = brand.voice?.keywords || [];
      const avoidWords = brand.voice?.avoidWords || [];
      const matchedBrandWords = brandWords.filter(bw => lower.includes(bw.toLowerCase()));
      const matchedAvoidWords = avoidWords.filter(aw => lower.includes(aw.toLowerCase()));
      brandScore += (matchedBrandWords.length * 10);
      brandScore -= (matchedAvoidWords.length * 20);
      if (lower.includes(brand.name.toLowerCase())) brandScore += 10;
    }
    brandScore = Math.min(100, Math.max(35, brandScore));

    // 5. Platform Fit (0-100)
    let platformScore = 65;
    const hashtagCount = (cleanText.match(/#[a-zA-Z0-9_]+/g) || []).length;
    if (platform === 'linkedin') {
      if (charCount >= 400 && charCount <= 2200) platformScore += 20;
      if (hashtagCount >= 2 && hashtagCount <= 6) platformScore += 15;
    } else if (platform === 'instagram') {
      if (charCount >= 200 && charCount <= 1800) platformScore += 15;
      if (hashtagCount >= 8 && hashtagCount <= 25) platformScore += 20;
    } else if (platform === 'twitter') {
      if (charCount <= 280 || cleanText.includes('1/') || cleanText.includes('🧵')) platformScore += 25;
      if (hashtagCount <= 2) platformScore += 10;
    } else if (platform === 'reel') {
      if (wordCount >= 60 && wordCount <= 160) platformScore += 25; // 30-60 sec script
      if (lower.includes('b-roll') || lower.includes('hook') || lower.includes('[scene')) platformScore += 10;
    } else {
      platformScore += 15;
    }
    platformScore = Math.min(100, Math.max(30, platformScore));

    // Weighted Overall Score
    const overall = Math.round(
      (hookScore * 0.25) +
      (readabilityScore * 0.20) +
      (ctaScore * 0.20) +
      (brandAlignmentScore(brandScore) * 0.15) +
      (platformScore * 0.20)
    );

    // Dynamic Actionable Suggestions
    const suggestions = [];
    if (hookScore < 75) {
      suggestions.push({
        type: 'hook',
        title: 'Sharpen Opening Hook',
        desc: 'Add a numeric proof point or open curiosity gap in the first 8 words to prevent readers from scrolling past.'
      });
    }
    if (readabilityScore < 75) {
      suggestions.push({
        type: 'whitespace',
        title: 'Improve Visual Whitespace',
        desc: 'Break dense blocks into 1-2 sentence paragraphs and introduce bullet points for scan-ability.'
      });
    }
    if (ctaScore < 70) {
      suggestions.push({
        type: 'cta',
        title: 'Clarify Call to Action',
        desc: `Prompt high-intent behavior with a direct trigger (e.g. "Save this for your next sprint" or "Drop your thoughts below").`
      });
    }
    if (brand && brandScore < 80) {
      suggestions.push({
        type: 'brand',
        title: `Inject ${brand.name} Brand Voice`,
        desc: `Incorporate brand keywords such as "${(brand.voice?.keywords || []).slice(0, 3).join(', ')}".`
      });
    }

    return {
      overall,
      hook: hookScore,
      readability: readabilityScore,
      cta: ctaScore,
      brandAlignment: brandScore,
      platformFit: platformScore,
      suggestions: suggestions.length ? suggestions : [{
        type: 'perfect',
        title: 'Excellent Content Composition',
        desc: 'This copy scores in the top 5% for viral hook momentum and platform suitability.'
      }]
    };
  },

  // 1-Click Optimization Transformation
  optimizeWithAI: (text, type, brand) => {
    let result = text;
    if (type === 'hook') {
      const viralHooks = [
        "90% of people get this wrong, but here is what the data actually reveals: 👇\n\n",
        "Stop making this classic mistake in 2026. Here is the modern approach:\n\n",
        "We tested this over 90 days so you don't have to waste time. Key breakdown: 🧵\n\n"
      ];
      const randomHook = viralHooks[Math.floor(Math.random() * viralHooks.length)];
      result = randomHook + result.replace(/^([^\n]+)(\n*)/, '');
    } else if (type === 'whitespace') {
      result = result
        .replace(/\. /g, '.\n\n')
        .replace(/\n{3,}/g, '\n\n');
    } else if (type === 'cta') {
      result = result.trim() + "\n\n💡 Save this post for later and share your perspective in the comments below! 👇";
    } else if (type === 'brand' && brand) {
      const keyword = brand.voice?.keywords?.[0] || 'our core standard';
      result = result.trim() + `\n\n✨ At ${brand.name}, we believe in ${keyword} over short-lived trends.`;
    }
    return result;
  }
};

function brandAlignmentScore(score) {
  return score;
}

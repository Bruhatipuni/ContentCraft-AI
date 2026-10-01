export const initialBrands = [
  {
    id: 'glowskin',
    name: 'GlowSkin Organics',
    tagline: 'Clean, Science-Backed Ayurveda for Modern Skin',
    industry: 'D2C Beauty & Wellness',
    website: 'https://glowskinorganics.com',
    colors: {
      primary: '#d97706',
      secondary: '#059669',
      accent: '#f59e0b',
      background: '#0c0a09'
    },
    voice: {
      tone: 'Empathetic, Educative, Chic, and Science-Backed',
      keywords: ['clean beauty', 'non-toxic', 'dermatologist-tested', 'glow naturally', 'ayurvedic science'],
      avoidWords: ['miracle cure', 'cheap', 'overnight magic', 'guaranteed fix'],
      targetAudience: 'Urban professionals aged 22-38 seeking clean skincare rooted in Indian botanicals and modern dermatology.'
    },
    guidelines: 'Always highlight active ingredient percentages (e.g. 5% Niacinamide, Kumkumadi). Maintain warm, encouraging tone. Emphasize cruelty-free, gentle skincare.',
    samplePosts: [
      "Skin barrier damaged from too many harsh exfoliants? Here's how our Saffron-Ceramide complex restores lipid harmony in 7 nights. ✨",
      "Why 'instant glow' claims are a red flag for your skin health — and what dermatologists actually recommend instead. 👇"
    ]
  },
  {
    id: 'devpulse',
    name: 'DevPulse AI',
    tagline: 'Next-Gen Autonomous Agent Orchestration for Engineers',
    industry: 'B2B SaaS / Developer Tools',
    website: 'https://devpulse.ai',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#090d16'
    },
    voice: {
      tone: 'Authoritative, Insightful, Witty, and Deeply Technical',
      keywords: ['agentic loops', 'low-latency', 'multi-model orchestration', 'developer velocity', 'subagents'],
      avoidWords: ['revolutionary synergy', 'magic AI', 'no-code magic', 'revolutionary paradigm'],
      targetAudience: 'Software engineers, AI founders, tech leads, and technical product managers.'
    },
    guidelines: 'Speak developer-to-developer. Use concise code snippets and architectural diagrams. Zero fluff, high signal-to-noise ratio.',
    samplePosts: [
      "Why we ditched synchronous subagent polling for reactive event streaming (and saved 420ms per tool invocation) 🧵",
      "The unspoken truth about LLM context degradation: more tokens != better reasoning. Here's our benchmark on 50k prompt vectors."
    ]
  },
  {
    id: 'finlit',
    name: 'FinLit Bharat',
    tagline: 'Making Wealth Creation & Tax Planning Effortless for Young India',
    industry: 'Fintech & Education',
    website: 'https://finlitbharat.in',
    colors: {
      primary: '#10b981',
      secondary: '#f59e0b',
      accent: '#6366f1',
      background: '#06140e'
    },
    voice: {
      tone: 'Relatable, Actionable, Story-Driven, and Jargon-Free',
      keywords: ['SIP compounding', 'tax alpha', 'NPS', 'financial freedom', 'smart investing'],
      avoidWords: ['guaranteed returns', 'penny stocks', 'get rich quick', 'multibagger crypto'],
      targetAudience: 'Gen Z and Millennials in India entering the workforce, aiming to invest smartly and understand taxes without boring finance jargon.'
    },
    guidelines: 'Break down complex financial rules into step-by-step reels and carousel slides. Always provide real rupee examples (e.g. ₹5,000/month). Include disclaimer at bottom.',
    samplePosts: [
      "If you are 24 and earning ₹45,000/month, doing this ONE thing with ₹3,000 saves you ₹46,800 in taxes this March 💡",
      "The 'Old vs New Tax Regime' calculator broken down into 3 simple rules for salaried professionals."
    ]
  }
];

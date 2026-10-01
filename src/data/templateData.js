export const platformSpecs = {
  linkedin: {
    name: 'LinkedIn',
    idealLength: '1,200 - 1,800 characters',
    charLimit: 3000,
    aspectRatio: '1:1 or 4:5 document',
    tone: 'Thought leadership, authentic professional journey, key takeaways, debate hook',
    hashtagsRule: '3-5 targeted niche hashtags at the bottom',
    structure: 'Punchy 1-2 line hook > Double line break > Context/Agitation > 3-5 bullet insights > Reflective takeaway > Discussion CTA question'
  },
  instagram: {
    name: 'Instagram',
    idealLength: '150 - 300 words caption',
    charLimit: 2200,
    aspectRatio: '4:5 (Post) or 9:16 (Reel/Story)',
    tone: 'Visually engaging, emotional, relatable, aesthetic formatting with emojis',
    hashtagsRule: '15-25 high-relevance hashtags grouped at bottom',
    structure: 'First sentence curiosity hook (visible before "more") > Story / Quick Tips > Engaging CTA (Save for later / Comment below) > Hashtags'
  },
  twitter: {
    name: 'X (Twitter)',
    idealLength: 'Thread of 3-6 tweets (250 chars per tweet)',
    charLimit: 280,
    aspectRatio: '16:9 or 1:1',
    tone: 'Crisp, punchy, contrarian, no corporate filler, high signal',
    hashtagsRule: '1-2 hashtags maximum or none',
    structure: 'Tweet 1: Bold statement + "A quick breakdown 🧵" > Tweets 2-4: Core takeaways > Final Tweet: Recap + Retweet/Follow CTA'
  },
  reel: {
    name: 'Reel / YouTube Shorts',
    idealLength: '30-45 seconds (90-120 spoken words)',
    charLimit: 150,
    aspectRatio: '9:16 Vertical video',
    tone: 'Fast-paced, spoken conversational, energetic, clear verbal transitions',
    hashtagsRule: '5-8 viral tags in caption',
    structure: '0-3s: Visual & Verbal Hook > 3-15s: Problem/Curiosity > 15-35s: 2-3 High impact steps > 35-45s: Clear CTA to comment a keyword'
  },
  email: {
    name: 'Email Newsletter',
    idealLength: '350 - 600 words',
    charLimit: 5000,
    aspectRatio: 'Responsive Desktop/Mobile email',
    tone: 'Personal, warm, 1-on-1 inbox connection, clear primary action',
    hashtagsRule: 'No hashtags used in email',
    structure: 'Subject Line (A/B) > Preview Snippet > Personal greeting > Story lead > Body breakdown > Single bold CTA button > P.S. hook'
  }
};

export const sampleRepurposeInputs = [
  {
    title: 'The Death of Vanity Metrics in 2026',
    type: 'Blog Article',
    content: `For years, brands and creators chased follower counts and surface-level likes. But in 2026, algorithmic shifts across Instagram, LinkedIn, and YouTube have completely rewritten the playbook.

Platforms now prioritize two primary signals above all else: Saves/Bookmarks and Meaningful Shares via Direct Messages (DMs). 

A post with 500 views that gets saved 80 times will receive 10x more continuous distribution than a post with 5,000 views that gets zero saves. Why? Because algorithms consider saves as a declaration of "enduring value", whereas likes are simply passive taps while doomscrolling.

To thrive this year, brands must transition from "Attention Entertainment" to "Utility Creation". Every single piece of content should answer one question: "Would someone want to refer back to this next Tuesday?"

Here are the 3 pillars of utility content:
1. Frameworks over Opinions: Give people a tangible step-by-step checklist rather than vague philosophies.
2. Proprietary Data: Share actual numbers, tests, and case studies from your own experience.
3. Saveable Visuals: Infographics and carousel summaries that serve as digital cheat sheets.`
  },
  {
    title: 'Kumkumadi & Ceramide: The Ancient Modern Skincare Fusion',
    type: 'Product Launch Brief',
    content: `Introducing our latest breakthrough at GlowSkin Organics: The Restorative Saffron Ceramide Nectar.

We observed that 64% of women in Indian metros suffer from compromised skin barriers caused by harsh pollution, heavy air conditioning, and over-exfoliation with concentrated AHA/BHA chemical peels.

Instead of introducing another chemical acid, we fused 100% pure Kashmiri Kumkumadi Tailam (rich in red saffron stigmas and lotus pollen) with a 3:1:1 biomimetic Ceramide complex. The clinical results: 94% recorded deep moisture retention in 72 hours, without clogged pores or sticky residue.

Key USPs:
- 100% Ayurvedic botanical infusion certified cruelty-free
- 5 skin-identical ceramides that repair barrier micro-tears
- Lightweight, fast-absorbing golden elixir
- Zero artificial fragrance, parabens, or mineral oil.`
  }
];

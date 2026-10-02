import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # Blank slide

    # Color Palette Constants
    BG_DARK = RGBColor(15, 23, 42)       # #0f172a (Slate 900)
    CARD_BG = RGBColor(30, 41, 59)       # #1e293b (Slate 800)
    CARD_BORDER = RGBColor(71, 85, 105)  # #475569
    ACCENT_INDIGO = RGBColor(99, 102, 241) # #6366f1
    ACCENT_PURPLE = RGBColor(168, 85, 247) # #a855f7
    ACCENT_CYAN = RGBColor(6, 182, 212)    # #06b6d4
    ACCENT_GREEN = RGBColor(34, 197, 94)   # #22c55e
    TEXT_LIGHT = RGBColor(248, 250, 252)   # #f8fafc
    TEXT_MUTED = RGBColor(148, 163, 184)   # #94a3b8
    TEXT_GOLD = RGBColor(251, 191, 36)     # #fbbf24
    ACCENT_GOLD = RGBColor(251, 191, 36)   # #fbbf24

    def add_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background() # No border
        return bg

    def add_header(slide, title_text, category_text="CONTENTCRAFT AI"):
        # Category Tag
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.4))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ACCENT_PURPLE
        p_cat.font.name = "Calibri"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.7), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(26)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_LIGHT
        p_title.font.name = "Calibri"

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1)
        else:
            card.line.fill.background()
        return card

    # ==========================================
    # SLIDE 1: Title Slide
    # ==========================================
    slide1 = prs.slides.add_slide(blank_layout)
    add_background(slide1)

    # Decorative Card Box behind title
    add_card(slide1, 1.0, 1.2, 11.333, 5.1, bg_color=RGBColor(24, 32, 53), border_color=ACCENT_INDIGO)

    # Title & Subtitle inside frame
    title_box = slide1.shapes.add_textbox(Inches(1.5), Inches(1.6), Inches(10.333), Inches(2.2))
    tf = title_box.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = "CONTENTCRAFT AI 🚀"
    p0.font.size = Pt(44)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_LIGHT
    p0.alignment = PP_ALIGN.CENTER
    
    p1 = tf.add_paragraph()
    p1.text = "Intelligent AI Content Studio for Brands & Creators"
    p1.font.size = Pt(22)
    p1.font.bold = True
    p1.font.color.rgb = ACCENT_CYAN
    p1.alignment = PP_ALIGN.CENTER
    p1.space_before = Pt(10)

    p2 = tf.add_paragraph()
    p2.text = "Transform 1 brief into multi-platform copy, visual ad creatives, 9:16 video storyboards, voiceovers & Indic translations."
    p2.font.size = Pt(14)
    p2.font.color.rgb = TEXT_MUTED
    p2.alignment = PP_ALIGN.CENTER
    p2.space_before = Pt(14)

    # Key Metrics / Highlights Badges
    badges = [
        ("5-in-1 Repurposer", "Blog ➔ Social Suite"),
        ("Indic AI Studio", "6 Regional Languages"),
        ("1-Click Studio", "Full Campaign Engine"),
        ("HTML5 Canvas Engine", "PNG Graphic Export")
    ]
    for i, (head, sub) in enumerate(badges):
        x = 1.5 + i * 2.6
        add_card(slide1, x, 4.2, 2.4, 1.0, bg_color=CARD_BG, border_color=ACCENT_PURPLE)
        tb = slide1.shapes.add_textbox(Inches(x), Inches(4.25), Inches(2.4), Inches(0.9))
        tf_b = tb.text_frame
        tf_b.word_wrap = True
        pb1 = tf_b.paragraphs[0]
        pb1.text = head
        pb1.font.size = Pt(12)
        pb1.font.bold = True
        pb1.font.color.rgb = TEXT_GOLD
        pb1.alignment = PP_ALIGN.CENTER
        
        pb2 = tf_b.add_paragraph()
        pb2.text = sub
        pb2.font.size = Pt(10)
        pb2.font.color.rgb = TEXT_MUTED
        pb2.alignment = PP_ALIGN.CENTER

    # Footer Hackathon Info
    foot_box = slide1.shapes.add_textbox(Inches(1.5), Inches(5.5), Inches(10.333), Inches(0.5))
    tf_f = foot_box.text_frame
    pf = tf_f.paragraphs[0]
    pf.text = "BFWAI / HACK 26 · Problem Statement 02 (PS 02)  |  Team AI Verse: Bruhati, Shashank, Dayakar"
    pf.font.size = Pt(12)
    pf.font.bold = True
    pf.font.color.rgb = ACCENT_INDIGO
    pf.alignment = PP_ALIGN.CENTER

    slide1.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 1):\n"
        "Good morning judges and team! We are Team AI Verse, presenting ContentCraft AI — the ultimate Intelligent AI Content Studio built for BFWAI/HACK 26, Problem Statement 02.\n"
        "Today, brands and creators struggle with content fatigue. ContentCraft AI solves this by taking just one single brief or article and turning it into a complete, ready-to-publish campaign across social channels, visual cards, video reels, and Indic regional languages."
    )

    # ==========================================
    # SLIDE 2: Problem Statement & Market Friction
    # ==========================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_background(slide2)
    add_header(slide2, "The Problem: 14+ Hours Lost Every Week in Content Repurposing")

    # 3 Column Cards for Problems
    problems = [
        ("⏱️ Manual Repurposing Friction", 
         "Creators spend 14+ hours weekly copying, editing, and manually reformatting a single article into LinkedIn posts, X threads, newsletters, and Reels scripts.",
         "High Fatigue & Slow Output"),
        ("🎨 Format & Design Bottlenecks", 
         "Adapting designs across multiple aspect ratios (1:1, 4:5, 16:9, 9:16) while keeping strict brand guideline compliance requires expensive design software and skills.",
         "Inconsistent Brand Visuals"),
        ("🌐 Indic Market Exclusion", 
         "Over 500 Million users consume content in Indic regional languages (Hindi, Telugu, Tamil, Marathi), but translating colloquial brand tones is complex and slow.",
         "Lost Regional Audience Reach")
    ]

    for i, (title, desc, impact) in enumerate(problems):
        x = 0.8 + i * 3.95
        add_card(slide2, x, 1.7, 3.75, 4.8, bg_color=CARD_BG, border_color=CARD_BORDER)
        
        # Header inside card
        tb = slide2.shapes.add_textbox(Inches(x + 0.2), Inches(1.9), Inches(3.35), Inches(4.4))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = ACCENT_CYAN
        
        p_body = tf.add_paragraph()
        p_body.text = desc
        p_body.font.size = Pt(13)
        p_body.font.color.rgb = TEXT_LIGHT
        p_body.space_before = Pt(14)
        
        p_imp_label = tf.add_paragraph()
        p_imp_label.text = "CORE IMPACT:"
        p_imp_label.font.size = Pt(11)
        p_imp_label.font.bold = True
        p_imp_label.font.color.rgb = ACCENT_PURPLE
        p_imp_label.space_before = Pt(20)

        p_imp = tf.add_paragraph()
        p_imp.text = "❌ " + impact
        p_imp.font.size = Pt(13)
        p_imp.font.bold = True
        p_imp.font.color.rgb = TEXT_GOLD
        p_imp.space_before = Pt(4)

    slide2.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 2):\n"
        "Let's look at the reality creators face today. It takes over 14 hours every single week just to format and repurpose existing content.\n"
        "First, formatting copy for LinkedIn vs X vs Instagram takes hours of rewriting. Second, creating visual cards in 1:1, 4:5, 16:9, and 9:16 requires dedicated graphic design effort. Third, missing out on Indic languages means locking out over 500 million regional creators and consumers in India."
    )

    # ==========================================
    # SLIDE 3: The Solution: ContentCraft AI
    # ==========================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_background(slide3)
    add_header(slide3, "The Solution: A Unified, Agentic AI Content Studio")

    # Left Hero Box
    add_card(slide3, 0.8, 1.7, 4.8, 4.8, bg_color=RGBColor(24, 32, 53), border_color=ACCENT_INDIGO)
    tb_hero = slide3.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(4.4), Inches(4.4))
    tf_h = tb_hero.text_frame
    tf_h.word_wrap = True
    
    ph1 = tf_h.paragraphs[0]
    ph1.text = "Single Brief ➔ Multi-Asset Campaign"
    ph1.font.size = Pt(20)
    ph1.font.bold = True
    ph1.font.color.rgb = ACCENT_CYAN
    
    ph2 = tf_h.add_paragraph()
    ph2.text = "ContentCraft AI bridges the gap between raw ideas and platform-native execution."
    ph2.font.size = Pt(13)
    ph2.font.color.rgb = TEXT_LIGHT
    ph2.space_before = Pt(12)

    features_list = [
        "🤖 Google Gemini 1.5 Flash Integration",
        "⚡ 1-Click All-in-One Studio ('Easy Mode')",
        "🎨 Dynamic HTML5 Visual Canvas Export",
        "📱 9:16 Vertical Reel Storyboard Engine",
        "🗣️ Web Speech Native Voiceover Synthesizer",
        "🇮🇳 Multilingual Indic Studio (6 Languages)"
    ]
    for feat in features_list:
        pf = tf_h.add_paragraph()
        pf.text = feat
        pf.font.size = Pt(12)
        pf.font.bold = True
        pf.font.color.rgb = TEXT_GOLD
        pf.space_before = Pt(8)

    # Right side 4 pillars
    pillars = [
        ("1. Multi-Platform Repurposing", "Generates LinkedIn posts, IG captions, X threads, Reels scripts & newsletters simultaneously.", ACCENT_INDIGO),
        ("2. Visual & Reel Studio", "Multi-aspect ratio design cards (1:1, 4:5, 16:9, 9:16) with direct PNG canvas download.", ACCENT_PURPLE),
        ("3. Indic Localization & Audio", "Translates & pronounces copy across Hindi, Hinglish, Telugu, Tamil, Marathi with nuances.", ACCENT_CYAN),
        ("4. Diagnostic & Memory Engine", "0-100 Content Quality score, 6 A/B hook variations, and persistent AI Prompt Memory.", ACCENT_GREEN)
    ]
    for i, (p_title, p_desc, col) in enumerate(pillars):
        y = 1.7 + i * 1.25
        add_card(slide3, 5.9, y, 6.6, 1.1, bg_color=CARD_BG, border_color=col)
        tb_p = slide3.shapes.add_textbox(Inches(6.1), Inches(y + 0.1), Inches(6.2), Inches(0.9))
        tf_p = tb_p.text_frame
        tf_p.word_wrap = True
        
        pp1 = tf_p.paragraphs[0]
        pp1.text = p_title
        pp1.font.size = Pt(14)
        pp1.font.bold = True
        pp1.font.color.rgb = col
        
        pp2 = tf_p.add_paragraph()
        pp2.text = p_desc
        pp2.font.size = Pt(11)
        pp2.font.color.rgb = TEXT_LIGHT
        pp2.space_before = Pt(3)

    slide3.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 3):\n"
        "Here is ContentCraft AI. It acts as an end-to-end studio. With Google Gemini 1.5 Flash under the hood and an intelligent offline fallback engine, users can input any blog, video transcript, or simple concept.\n"
        "Our platform converts it into 5 social formats, visual graphic cards with custom branding, an interactive 9:16 reel player with voiceover synthesis, and Indic regional translations."
    )

    # ==========================================
    # SLIDE 4: Core Features (Part 1 - Design & Creation)
    # ==========================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_background(slide4)
    add_header(slide4, "Core Studio Capabilities: Repurposer, Visual Canvas & Reel Engine")

    cards_f1 = [
        ("⭐ 5-in-1 Content Repurposer",
         "• One Brief ➔ LinkedIn, IG, X, Reel, Newsletter\n"
         "• Auto 20+ viral hashtag recommendation\n"
         "• Character counters & character-limit compliance\n"
         "• Side-by-side platform previews with feed UI",
         ACCENT_INDIGO),
        
        ("⭐ Visual & Ad Creative Studio",
         "• Multi-aspect ratios: 1:1, 4:5, 16:9, 9:16\n"
         "• Custom typography, hex colors & presets\n"
         "• Live HTML5 Canvas rendering engine\n"
         "• Direct 1-Click High-Res PNG Export",
         ACCENT_PURPLE),

        ("⭐ Video / Reel Generator",
         "• 4-scene video storyboard generation\n"
         "• Scene timing cues & B-roll image suggestions\n"
         "• Interactive 9:16 Vertical Smartphone Player\n"
         "• Live transition simulator & subtitle overlay",
         ACCENT_CYAN),

        ("⭐ Voiceover Synthesizer",
         "• Browser-native Web Speech API audio engine\n"
         "• 4 Tone Personas (Viral, Executive, Story, Hook)\n"
         "• Vocal pitch & speed sliders modulation\n"
         "• Animated live visual waveform audio indicator",
         ACCENT_GREEN)
    ]

    for i, (title, bullets, col) in enumerate(cards_f1):
        row = i // 2
        col_idx = i % 2
        x = 0.8 + col_idx * 5.95
        y = 1.7 + row * 2.5
        add_card(slide4, x, y, 5.7, 2.3, bg_color=CARD_BG, border_color=col)

        tb = slide4.shapes.add_textbox(Inches(x + 0.2), Inches(y + 0.15), Inches(5.3), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = bullets
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_LIGHT
        p2.space_before = Pt(6)

    slide4.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 4):\n"
        "Let's unpack our studio tools. First, the 5-in-1 Repurposer generates platform-tailored copy for all 5 major channels.\n"
        "Second, our Visual Studio renders real HTML5 Canvas graphics in all social aspect ratios (1:1, 4:5, 16:9, 9:16) with 1-click PNG export.\n"
        "Third, our Reel Generator gives creators a 4-scene storyboard with an interactive 9:16 vertical smartphone simulator.\n"
        "Fourth, the Web Speech Voiceover synthesizer generates speech natively in the browser with live visual waveforms!"
    )

    # ==========================================
    # SLIDE 5: Core Features (Part 2 - Intelligence & Indic Studio)
    # ==========================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_background(slide5)
    add_header(slide5, "Intelligence Engine: Indic Studio, Brand Memory & Trend Radar")

    cards_f2 = [
        ("🇮🇳 Multilingual Indic Studio",
         "• Native support: English, Hindi, Hinglish, Telugu, Tamil, Marathi\n"
         "• Preserves colloquial punchlines & brand nuances\n"
         "• Speech synthesis voice playback for Indic regional copy\n"
         "• Unlocks 500M+ regional content consumers in India",
         ACCENT_PURPLE),

        ("📈 Trend & Hashtag Intelligence",
         "• Real-time viral momentum radar (+310% surge signals)\n"
         "• Categorized hashtag clouds across Tech, Consumer, Creator\n"
         "• 5 Proven Hook Formulas (Curiosity Gap, PAS, Contrarian, etc.)\n"
         "• Dynamic trend topic auto-injection",
         ACCENT_CYAN),

        ("🎯 Brand Guidelines & AI Prompt Memory",
         "• Multi-brand guidelines manager (Hex palettes, voice tones)\n"
         "• Approved keywords & forbidden buzzword guardrails\n"
         "• Dynamic AI Prompt Memory injects user-taught rules into Gemini\n"
         "• Persistent storage with LocalStorage schema versioning",
         ACCENT_INDIGO),

        ("⚡ 1-Click Campaign Studio ('Easy Mode')",
         "• Instant generation of entire multi-platform campaign from 1 topic\n"
         "• Generates Copy + Visual Card + Reel Storyboard + Indic translation\n"
         "• 1-Click 'Schedule Entire Campaign (4 Posts)' direct queueing\n"
         "• Built for high-speed creator & agency workflows",
         ACCENT_GOLD)
    ]

    for i, (title, bullets, col) in enumerate(cards_f2):
        row = i // 2
        col_idx = i % 2
        x = 0.8 + col_idx * 5.95
        y = 1.7 + row * 2.5
        add_card(slide5, x, y, 5.7, 2.3, bg_color=CARD_BG, border_color=col)

        tb = slide5.shapes.add_textbox(Inches(x + 0.2), Inches(y + 0.15), Inches(5.3), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = bullets
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_LIGHT
        p2.space_before = Pt(6)

    slide5.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 5):\n"
        "On the intelligence side, our Multilingual Indic Studio translates brand messaging into 6 Indian languages with audio pronunciation.\n"
        "Our Trend Intelligence radar tracks surging viral topics (+310% momentum).\n"
        "Our Brand Asset Library stores color palettes and forbidden words, while our Dynamic Prompt Memory automatically injects user preferences into future AI prompts.\n"
        "And for maximum speed, our 1-Click Campaign Studio allows creators to generate copy, graphics, reel script, and Indic translation in just ONE click."
    )

    # ==========================================
    # SLIDE 6: Optimization, Feed Simulator & Calendar
    # ==========================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_background(slide6)
    add_header(slide6, "Optimization & Publishing: Content Diagnostics, Feed Simulator & Calendar")

    cards_f3 = [
        ("📊 AI Content Score Diagnostic",
         "• Measurable 0-100 copy quality meter\n"
         "• Scores Hook Momentum, Readability, CTA, Brand Alignment & Platform Fit\n"
         "• 1-Click 'AI Optimize Copy' instant auto-enhancement",
         ACCENT_CYAN),

        ("🔄 1-Click Variations (A/B Testing)",
         "• Generates 6 psychological marketing angles from 1 thesis\n"
         "• Curiosity Gap, Problem-Agitate-Solve, Contrarian, Story, Data, Urgency\n"
         "• Quick copy comparison for max engagement",
         ACCENT_PURPLE),

        ("📱 Native Feed Simulator",
         "• Side-by-side feed rendering for LinkedIn, IG, X, YouTube Shorts\n"
         "• Interactive truncated view toggles ('...see more')\n"
         "• Like/Comment/Share bar simulation for realistic visual check",
         ACCENT_INDIGO),

        ("📅 Content Calendar & Queue",
         "• Full drag & drop visual publishing pipeline\n"
         "• Status tracking: Draft ➔ In Review ➔ Approved ➔ Scheduled\n"
         "• Optimal time slot recommendations & JSON calendar export",
         ACCENT_GREEN)
    ]

    for i, (title, bullets, col) in enumerate(cards_f3):
        row = i // 2
        col_idx = i % 2
        x = 0.8 + col_idx * 5.95
        y = 1.7 + row * 2.5
        add_card(slide6, x, y, 5.7, 2.3, bg_color=CARD_BG, border_color=col)

        tb = slide6.shapes.add_textbox(Inches(x + 0.2), Inches(y + 0.15), Inches(5.3), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = bullets
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_LIGHT
        p2.space_before = Pt(6)

    slide6.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 6):\n"
        "Quality assurance is key before publishing. Our Content Score diagnostic evaluates copy from 0 to 100 on readability, hook strength, and brand alignment with a 1-click auto-fix.\n"
        "We also offer 6 marketing variation angles for A/B testing, a native feed simulator so creators see exactly how their post looks on LinkedIn or Instagram before publishing, and an interactive Content Calendar to schedule posts."
    )

    # ==========================================
    # SLIDE 7: Technical Architecture & Tech Stack
    # ==========================================
    slide7 = prs.slides.add_slide(blank_layout)
    add_background(slide7)
    add_header(slide7, "Technical Architecture & Engineering Excellence")

    # Stack columns
    tech_boxes = [
        ("⚛️ Frontend Architecture",
         "• React 18 & Vite 6 for ultra-fast HMR\n"
         "• Tailwind CSS 3.4 + Custom CSS Glassmorphism\n"
         "• Lucide React Icons & Canvas Confetti\n"
         "• Dual Theme: Clean Daylight Pro & Midnight Studio",
         ACCENT_CYAN),

        ("🧠 AI & Logic Engine",
         "• Google Gemini 1.5 Flash API integration\n"
         "• Intelligent Offline Fallback Engine (Zero downtime)\n"
         "• Heuristic Rule-Based Scorer for Content Audit\n"
         "• Dynamic Prompt Memory Rule Injection",
         ACCENT_PURPLE),

        ("🔊 Audio & Canvas Exporter",
         "• Native Web Speech API Audio Synthesizer\n"
         "• Pitch, Speed & Persona vocal modulation\n"
         "• HTML5 Canvas 2D Graphic Renderer\n"
         "• Client-side high-resolution PNG export",
         ACCENT_GREEN),

        ("💾 Persistence & State",
         "• Client-Side LocalStorage with schema versioning\n"
         "• Centralized Multi-Brand Asset Management\n"
         "• Offline-first publishing queue & schedule store\n"
         "• JSON Backup & Export capabilities",
         ACCENT_GOLD)
    ]

    for i, (title, desc, col) in enumerate(tech_boxes):
        row = i // 2
        col_idx = i % 2
        x = 0.8 + col_idx * 5.95
        y = 1.7 + row * 2.5
        add_card(slide7, x, y, 5.7, 2.3, bg_color=CARD_BG, border_color=col)

        tb = slide7.shapes.add_textbox(Inches(x + 0.2), Inches(y + 0.15), Inches(5.3), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_LIGHT
        p2.space_before = Pt(6)

    slide7.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 7):\n"
        "Under the hood, ContentCraft AI is built with modern, production-grade web technologies.\n"
        "Frontend: React 18, Vite 6, Tailwind CSS with dual themes.\n"
        "AI: Google Gemini 1.5 Flash API backed by an intelligent offline fallback engine so the app works seamlessly even without an API key or internet connection.\n"
        "Graphics & Speech: HTML5 Canvas for real-time graphics rendering and Web Speech API for client-side audio generation without external server overhead."
    )

    # ==========================================
    # SLIDE 8: Impact & Value Proposition
    # ==========================================
    slide8 = prs.slides.add_slide(blank_layout)
    add_background(slide8)
    add_header(slide8, "Market Impact & Quantifiable Value")

    metrics = [
        ("90%", "Time Saved", "From 14 hours down to < 10 minutes per campaign", ACCENT_CYAN),
        ("5x", "Multi-Channel Reach", "Simultaneous output for LinkedIn, IG, X, Shorts & Email", ACCENT_PURPLE),
        ("500M+", "Indic Audience", "Unlocks regional markets across 6 Indian languages", ACCENT_GOLD),
        ("100%", "Brand Consistency", "Enforces brand colors, tones, and prompt memory rules", ACCENT_GREEN)
    ]

    for i, (val, title, desc, col) in enumerate(metrics):
        x = 0.8 + i * 2.95
        add_card(slide8, x, 1.7, 2.8, 4.8, bg_color=CARD_BG, border_color=col)

        tb = slide8.shapes.add_textbox(Inches(x + 0.15), Inches(1.9), Inches(2.5), Inches(4.4))
        tf = tb.text_frame
        tf.word_wrap = True

        pv = tf.paragraphs[0]
        pv.text = val
        pv.font.size = Pt(40)
        pv.font.bold = True
        pv.font.color.rgb = col
        pv.alignment = PP_ALIGN.CENTER

        pt = tf.add_paragraph()
        pt.text = title
        pt.font.size = Pt(16)
        pt.font.bold = True
        pt.font.color.rgb = TEXT_LIGHT
        pt.alignment = PP_ALIGN.CENTER
        pt.space_before = Pt(10)

        pd = tf.add_paragraph()
        pd.text = desc
        pd.font.size = Pt(12)
        pd.font.color.rgb = TEXT_MUTED
        pd.alignment = PP_ALIGN.CENTER
        pd.space_before = Pt(14)

    slide8.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 8):\n"
        "Let's look at the quantifiable impact of ContentCraft AI.\n"
        "1. 90% Time Savings: Content repurposing drops from 14 hours to under 10 minutes.\n"
        "2. 5x Reach: Every piece of content scales across 5 distinct social channels.\n"
        "3. 500M+ Indic Market: Seamless localization across Hindi, Telugu, Tamil, Marathi.\n"
        "4. 100% Brand Consistency: AI prompt memory ensures strict brand voice compliance."
    )

    # ==========================================
    # SLIDE 9: Roadmap & Future Expansion
    # ==========================================
    slide9 = prs.slides.add_slide(blank_layout)
    add_background(slide9)
    add_header(slide9, "Future Roadmap: Scaling ContentCraft AI")

    phases = [
        ("Phase 1: Present (Hackathon MVP)",
         "• 12 Core Features fully working\n"
         "• Gemini 1.5 Flash + Offline Fallback Engine\n"
         "• Multi-aspect Visual Canvas & Web Speech API\n"
         "• Multilingual Indic Studio & Content Calendar",
         ACCENT_INDIGO),

        ("Phase 2: Direct API Social Publishing",
         "• OAuth integration with LinkedIn, X (Twitter), Meta APIs\n"
         "• 1-Click direct automated posting & scheduling\n"
         "• Analytics webhooks for real-time post performance tracking\n"
         "• Automatic best-time auto-poster background cron",
         ACCENT_PURPLE),

        ("Phase 3: AI Video Generation & Team Suite",
         "• Integration with Runway / Sora / Luma video generation APIs\n"
         "• Multi-user agency workspaces with role permissions\n"
         "• Client approval portal & collaborative comment threads\n"
         "• Enterprise custom LLM fine-tuning on brand history",
         ACCENT_CYAN)
    ]

    for i, (title, desc, col) in enumerate(phases):
        y = 1.7 + i * 1.65
        add_card(slide9, 0.8, y, 11.733, 1.45, bg_color=CARD_BG, border_color=col)

        tb = slide9.shapes.add_textbox(Inches(1.0), Inches(y + 0.15), Inches(11.333), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(16)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_LIGHT
        p2.space_before = Pt(4)

    slide9.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 9):\n"
        "Looking forward, our expansion plan has three clear phases:\n"
        "Phase 1 is our complete working MVP today with 12 studio tools.\n"
        "Phase 2 will integrate direct OAuth publishing to LinkedIn, Twitter, and Meta APIs.\n"
        "Phase 3 will add generative video rendering APIs and enterprise agency team collaboration features."
    )

    # ==========================================
    # SLIDE 10: Conclusion & Team AI Verse
    # ==========================================
    slide10 = prs.slides.add_slide(blank_layout)
    add_background(slide10)

    # Large Center Card
    add_card(slide10, 1.0, 1.0, 11.333, 5.5, bg_color=RGBColor(24, 32, 53), border_color=ACCENT_CYAN)

    tb = slide10.shapes.add_textbox(Inches(1.5), Inches(1.3), Inches(10.333), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "Thank You! 🚀"
    p0.font.size = Pt(42)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_LIGHT
    p0.alignment = PP_ALIGN.CENTER

    p1 = tf.add_paragraph()
    p1.text = "ContentCraft AI — Empowering Brands & Creators Everywhere"
    p1.font.size = Pt(20)
    p1.font.bold = True
    p1.font.color.rgb = ACCENT_PURPLE
    p1.alignment = PP_ALIGN.CENTER
    p1.space_before = Pt(8)

    p_team = tf.add_paragraph()
    p_team.text = "Team AI Verse"
    p_team.font.size = Pt(18)
    p_team.font.bold = True
    p_team.font.color.rgb = ACCENT_GOLD
    p_team.alignment = PP_ALIGN.CENTER
    p_team.space_before = Pt(24)

    p_names = tf.add_paragraph()
    p_names.text = "Bruhati  •  Shashank  •  Dayakar"
    p_names.font.size = Pt(16)
    p_names.font.bold = True
    p_names.font.color.rgb = TEXT_LIGHT
    p_names.alignment = PP_ALIGN.CENTER
    p_names.space_before = Pt(6)

    p_ps = tf.add_paragraph()
    p_ps.text = "BFWAI / HACK 26 · Problem Statement 02 (PS 02)"
    p_ps.font.size = Pt(14)
    p_ps.font.color.rgb = ACCENT_CYAN
    p_ps.alignment = PP_ALIGN.CENTER
    p_ps.space_before = Pt(16)

    p_demo = tf.add_paragraph()
    p_demo.text = "✨ Ready for Live Demonstration & Q&A ✨"
    p_demo.font.size = Pt(16)
    p_demo.font.bold = True
    p_demo.font.color.rgb = ACCENT_GREEN
    p_demo.alignment = PP_ALIGN.CENTER
    p_demo.space_before = Pt(20)

    slide10.notes_slide.notes_text_frame.text = (
        "SPEAKER NOTES (Slide 10):\n"
        "Thank you so much! ContentCraft AI represents a major step forward for content creators and brands.\n"
        "We are Team AI Verse — Bruhati, Shashank, and Dayakar. We would now love to walk you through a live demonstration of ContentCraft AI and answer any questions!"
    )

    output_path = "ContentCraft_AI_Pitch_Deck.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {os.path.abspath(output_path)}")

if __name__ == "__main__":
    create_deck()

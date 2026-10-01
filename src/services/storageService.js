import { initialBrands } from '../data/initialBrands';
import { initialCalendarPosts } from '../data/scheduleData';

const STORAGE_KEYS = {
  BRANDS: 'contentcraft_brands_v1',
  ACTIVE_BRAND_ID: 'contentcraft_active_brand_id_v1',
  CALENDAR_POSTS: 'contentcraft_calendar_posts_v1',
  GEMINI_KEY: 'contentcraft_gemini_api_key_v1',
  SAVED_CREATIVES: 'contentcraft_saved_creatives_v1',
  FEEDBACK_LOGS: 'contentcraft_feedback_logs_v1',
  LEARNING_RULES: 'contentcraft_learning_rules_v1'
};

const initialFeedbackLogs = [
  {
    id: 'fb-1',
    title: '3 Mistakes damaging skin barrier (Reel)',
    platform: 'reel',
    format: 'Contrarian Hook + 3 Quick Tips',
    postedDate: '2026-09-24',
    actualViews: 48500,
    actualSaves: 3200,
    actualShares: 1450,
    engagementRate: '9.6%',
    verdict: 'High Viral Winner',
    keyTakeaway: 'Videos starting with "Stop doing this" earned 3.8x more saves than informative tips.'
  },
  {
    id: 'fb-2',
    title: 'Why we ditched synchronous polling (LinkedIn)',
    platform: 'linkedin',
    format: 'Data Architecture Breakdown',
    postedDate: '2026-09-27',
    actualViews: 14200,
    actualSaves: 480,
    actualShares: 190,
    engagementRate: '5.2%',
    verdict: 'Solid Inbound Driver',
    keyTakeaway: 'Including an explicit benchmark chart in the post body led to 14 direct founder inquiries.'
  }
];

const initialLearningRules = [
  'Rule #1: Contrarian hooks ("Stop doing X in 2026") generate 3.4x higher bookmark rates.',
  'Rule #2: Formatted carousels with maximum 4 lines per slide yield 42% longer completion times.',
  'Rule #3: Closing posts with an open discussion question rather than a sales link doubles comment volume.'
];

export const storageService = {
  // Brands
  getBrands: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BRANDS);
      return data ? JSON.parse(data) : initialBrands;
    } catch {
      return initialBrands;
    }
  },

  saveBrands: (brands) => {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
  },

  getActiveBrandId: () => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_BRAND_ID) || 'glowskin';
  },

  setActiveBrandId: (id) => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_BRAND_ID, id);
  },

  getActiveBrand: () => {
    const brands = storageService.getBrands();
    const activeId = storageService.getActiveBrandId();
    return brands.find(b => b.id === activeId) || brands[0] || initialBrands[0];
  },

  // Calendar
  getCalendarPosts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CALENDAR_POSTS);
      return data ? JSON.parse(data) : initialCalendarPosts;
    } catch {
      return initialCalendarPosts;
    }
  },

  saveCalendarPosts: (posts) => {
    localStorage.setItem(STORAGE_KEYS.CALENDAR_POSTS, JSON.stringify(posts));
  },

  addCalendarPost: (post) => {
    const posts = storageService.getCalendarPosts();
    const newPost = {
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...post
    };
    posts.unshift(newPost);
    storageService.saveCalendarPosts(posts);
    return newPost;
  },

  updateCalendarPost: (updatedPost) => {
    const posts = storageService.getCalendarPosts();
    const idx = posts.findIndex(p => p.id === updatedPost.id);
    if (idx !== -1) {
      posts[idx] = updatedPost;
      storageService.saveCalendarPosts(posts);
    }
  },

  deleteCalendarPost: (postId) => {
    const posts = storageService.getCalendarPosts().filter(p => p.id !== postId);
    storageService.saveCalendarPosts(posts);
  },

  // Gemini API Key
  getGeminiKey: () => {
    return localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || '';
  },

  saveGeminiKey: (key) => {
    localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key.trim());
  },

  // Feedback & AI Learning Memory
  getFeedbackLogs: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK_LOGS);
      return data ? JSON.parse(data) : initialFeedbackLogs;
    } catch {
      return initialFeedbackLogs;
    }
  },

  addFeedbackLog: (log) => {
    const logs = storageService.getFeedbackLogs();
    const newLog = {
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...log
    };
    logs.unshift(newLog);
    localStorage.setItem(STORAGE_KEYS.FEEDBACK_LOGS, JSON.stringify(logs));
    return newLog;
  },

  getLearningRules: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEARNING_RULES);
      return data ? JSON.parse(data) : initialLearningRules;
    } catch {
      return initialLearningRules;
    }
  },

  addLearningRule: (rule) => {
    const rules = storageService.getLearningRules();
    rules.unshift(rule);
    localStorage.setItem(STORAGE_KEYS.LEARNING_RULES, JSON.stringify(rules));
    return rules;
  }
};

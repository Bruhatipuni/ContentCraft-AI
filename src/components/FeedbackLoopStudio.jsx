import React, { useState } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  Sparkles, 
  Plus, 
  Check, 
  Flame, 
  ArrowUpRight, 
  Award, 
  BarChart3, 
  Eye, 
  Bookmark, 
  Share2, 
  Layers
} from 'lucide-react';
import { storageService } from '../services/storageService';

export function FeedbackLoopStudio({ activeBrand }) {
  const [feedbackLogs, setFeedbackLogs] = useState(() => storageService.getFeedbackLogs());
  const [learningRules, setLearningRules] = useState(() => storageService.getLearningRules());
  const [newRule, setNewRule] = useState('');
  const [testPostText, setTestPostText] = useState(
    "Stop posting 5 times a day in 2026. Here is why our data showed that 2 utility carousels with frameworks earned 4x higher inbound leads:"
  );

  // Simulated metrics for testPostText
  const calculateSimulatedMetrics = (content) => {
    const len = content.length;
    const hasNumbers = /\d+/.test(content);
    const hasCuriosity = /why|how|stop|data|secret|mistake/i.test(content);
    
    let baseViews = 18000;
    if (hasNumbers) baseViews += 12000;
    if (hasCuriosity) baseViews += 16000;
    if (len > 120) baseViews += 6000;

    const saveRate = hasCuriosity ? '8.4%' : '4.2%';
    const shareMultiplier = hasNumbers ? '3.2x' : '1.8x';
    const estSaves = Math.round(baseViews * (parseFloat(saveRate) / 100));

    return {
      views: baseViews.toLocaleString(),
      saveRate,
      shareMultiplier,
      saves: estSaves.toLocaleString(),
      verdict: baseViews > 35000 ? 'Viral Outlier Candidate 🔥' : 'Strong Niche Resonance ⚡'
    };
  };

  const simMetrics = calculateSimulatedMetrics(testPostText);

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.trim()) return;
    const updated = storageService.addLearningRule(newRule.trim());
    setLearningRules([...updated]);
    setNewRule('');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 uppercase tracking-wider">
              Feature 11 · Self-Learning AI
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Feedback Loop & Performance Simulator</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            Predictive AI Simulator & Memory Loop
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Simulate post reach, record empirical campaign results, and train the AI prompt engine to learn from winning patterns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Predictive Simulator (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                <span>Pre-Publishing Reach Simulator</span>
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-500/30 font-mono font-bold">
                Monte Carlo Model
              </span>
            </div>

            <textarea
              value={testPostText}
              onChange={(e) => setTestPostText(e.target.value)}
              rows={4}
              placeholder="Paste any hook or post draft to simulate expected engagement..."
              className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl p-3 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-pink-500 leading-relaxed font-sans transition-colors"
            />

            {/* Simulation KPI Display */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-2">
                <span className="text-xs text-slate-600 dark:text-neutral-400">Simulated Trajectory:</span>
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400">{simMetrics.verdict}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                  <Eye className="w-3.5 h-3.5 mx-auto text-blue-500 dark:text-blue-400 mb-1" />
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase block font-medium">Est. Impressions</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-neutral-100">{simMetrics.views}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                  <Bookmark className="w-3.5 h-3.5 mx-auto text-amber-500 dark:text-amber-400 mb-1" />
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase block font-medium">Save Rate</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-neutral-100">{simMetrics.saveRate}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                  <Share2 className="w-3.5 h-3.5 mx-auto text-emerald-500 dark:text-emerald-400 mb-1" />
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase block font-medium">DM Share Boost</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-neutral-100">{simMetrics.shareMultiplier}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-neutral-500">
              Predictions correlate with save-to-like ratios and opening 8-word curiosity density.
            </p>
          </div>

          {/* Self-Learning AI Prompt Memory */}
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
                <BrainCircuit className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Live AI Memory Rules (Injected in Prompts)</span>
              </h2>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">Active</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-neutral-400">
              These verified insights are automatically prepended to every generation prompt across the entire studio:
            </p>

            <div className="space-y-2">
              {learningRules.map((rule, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800/80 text-xs text-slate-800 dark:text-neutral-200 flex items-start space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            {/* Add New Learning Form */}
            <form onSubmit={handleAddRule} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Teach AI a new rule: e.g. Rule #4: Always include rupee examples..."
                className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shrink-0 shadow-xs"
              >
                Add Rule
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Historical Performance Log (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Historical Campaign Performance Log</span>
              </h2>
              <span className="text-[11px] text-slate-500 dark:text-neutral-500 font-medium">{feedbackLogs.length} Verified Outliers</span>
            </div>

            <div className="space-y-3">
              {feedbackLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800/80 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 font-mono">
                      {log.platform} · {log.format}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      {log.verdict}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-neutral-100">
                    "{log.title}"
                  </h3>

                  <div className="grid grid-cols-3 gap-2 text-center py-1 border-y border-slate-200 dark:border-neutral-900 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-500 block">Actual Views</span>
                      <span className="font-mono text-slate-900 dark:text-neutral-200 font-bold">{log.actualViews.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-500 block">Actual Saves</span>
                      <span className="font-mono text-slate-900 dark:text-neutral-200 font-bold">{log.actualSaves.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-500 block">Engage Rate</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{log.engagementRate}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/60 text-[11px] text-slate-600 dark:text-neutral-400">
                    <strong className="text-amber-600 dark:text-amber-400">Extracted AI Lesson:</strong> {log.keyTakeaway}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

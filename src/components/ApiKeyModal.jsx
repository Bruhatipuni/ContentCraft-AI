import React, { useState } from 'react';
import { 
  Key, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';

export function ApiKeyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [apiKey, setApiKey] = useState(() => storageService.getGeminiKey());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, error: 'Please enter a Gemini API Key first.' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    const result = await geminiService.testApiKey(apiKey.trim());
    setTesting(false);
    setTestResult(result);
  };

  const handleSave = () => {
    storageService.saveGeminiKey(apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    storageService.saveGeminiKey('');
    setApiKey('');
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-100 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-neutral-100">
                Google Gemini API Configuration
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Dual AI Engine: Gemini 1.5 Flash + Intelligent Fallback
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-700 dark:text-neutral-300 font-semibold block mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-mono transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1 font-semibold"
            >
              <span>Get a free key from Google AI Studio</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>

            {apiKey && (
              <button
                onClick={handleClear}
                className="text-slate-500 dark:text-neutral-400 hover:text-red-500 transition-colors"
              >
                Clear Key
              </button>
            )}
          </div>

          {/* Test Status feedback */}
          {testResult && (
            <div className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${
              testResult.success 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300' 
                : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-300'
            }`}>
              {testResult.success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Success! Connected to Google Gemini 1.5 Flash.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0" />
                  <span className="truncate">Connection failed: {testResult.error}</span>
                </>
              )}
            </div>
          )}

          {/* Info Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200 dark:border-neutral-800 text-[11px] text-slate-600 dark:text-neutral-400 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-slate-800 dark:text-neutral-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Offline & Demo Resilience Guaranteed</span>
            </div>
            <p className="leading-relaxed">
              If an API key is not provided, ContentCraft AI seamlessly runs using its high-speed built-in intelligence engine with rich persona contextualization. Your pitch and live demos will never fail.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-neutral-800">
          <button
            onClick={handleTestKey}
            disabled={testing || !apiKey.trim()}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
          >
            {testing && <RefreshCw className="w-3 h-3 animate-spin text-slate-500" />}
            <span>{testing ? 'Testing...' : 'Test Connection'}</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-colors"
            >
              {savedSuccess ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

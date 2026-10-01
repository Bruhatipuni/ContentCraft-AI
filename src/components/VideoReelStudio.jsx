import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Mic, 
  Copy, 
  Check, 
  Volume2, 
  Clapperboard, 
  Layers, 
  Clock, 
  Music, 
  Camera, 
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { geminiService } from '../services/geminiService';

export function VideoReelStudio({ activeBrand, onSendToVoiceover }) {
  const [ideaInput, setIdeaInput] = useState(
    'How to turn 1 piece of content into 5 viral platform assets in under 30 seconds.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenes, setScenes] = useState([]);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);

  // Video Simulator State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 40 seconds
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    // Load initial scenes
    loadScenes();
  }, [activeBrand]);

  const loadScenes = async () => {
    setIsGenerating(true);
    const generated = await geminiService.generateReelStoryboard(ideaInput, activeBrand);
    setScenes(generated);
    setIsGenerating(false);
  };

  // Video playback timer loop
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 40) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          // Sync scene based on time
          if (next < 3) setActiveSceneIdx(0);
          else if (next < 12) setActiveSceneIdx(1);
          else if (next < 26) setActiveSceneIdx(2);
          else setActiveSceneIdx(3);
          return next;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (currentTime >= 40) setCurrentTime(0);
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveSceneIdx(0);
  };

  const fullSpokenScript = scenes.map(s => s.script).join(' ');

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullSpokenScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const currentScene = scenes[activeSceneIdx] || scenes[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
              Feature 3 ⭐ Core Hero
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Short-Form Video & Storyboard Engine</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            AI Video / Reel Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Convert an idea into a high-retention 9:16 short-form video storyboard with scene timing, B-roll cues, and live simulation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSendToVoiceover(fullSpokenScript)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-200 dark:border-neutral-700"
          >
            <Mic className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
            <span>Open Voiceover Studio</span>
          </button>
          
          <button
            onClick={handleCopyScript}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-200 dark:border-neutral-800"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript ? 'Copied' : 'Copy Script'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Storyboard Scenes on Left, Interactive 9:16 Player on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Prompt & Scene Storyboard (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Idea Input Card */}
          <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Clapperboard className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span>Reel / Shorts Video Concept</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder="Enter a video idea, hook, or product topic..."
                className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={loadScenes}
                disabled={isGenerating || !ideaInput.trim()}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'Drafting...' : 'Generate Scenes'}</span>
              </button>
            </div>
          </div>

          {/* Scene Storyboard Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
              <span className="font-semibold text-slate-800 dark:text-neutral-300 uppercase tracking-wider">
                Scene Storyboard Breakdown ({scenes.length} Scenes · 40s Total)
              </span>
              <span>Click a scene to preview in simulator</span>
            </div>

            {scenes.map((scene, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveSceneIdx(idx);
                  if (idx === 0) setCurrentTime(0);
                  else if (idx === 1) setCurrentTime(4);
                  else if (idx === 2) setCurrentTime(15);
                  else setCurrentTime(30);
                }}
                className={`glass-panel rounded-xl p-4 border cursor-pointer transition-all ${
                  activeSceneIdx === idx
                    ? 'border-purple-500 bg-purple-500/5 shadow-md shadow-purple-500/10'
                    : 'border-slate-200 dark:border-neutral-800/80 hover:border-purple-400 dark:hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800/60 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-[10px]">
                      {scene.sceneNumber}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-neutral-200">{scene.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-[10px] text-slate-600 dark:text-neutral-400 font-mono font-medium">
                    {scene.timeCode}
                  </span>
                </div>

                <div className="pt-2.5 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-neutral-500 font-semibold uppercase tracking-wider block">
                      Spoken Narration:
                    </span>
                    <p className="text-slate-800 dark:text-neutral-200 italic font-serif">"{scene.script}"</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/60">
                      <span className="text-slate-500 dark:text-neutral-500 flex items-center space-x-1 mb-0.5 font-medium">
                        <Camera className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                        <span>B-Roll Visual:</span>
                      </span>
                      <p className="text-slate-700 dark:text-neutral-300 leading-snug">{scene.bRoll}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/60">
                      <span className="text-slate-500 dark:text-neutral-500 flex items-center space-x-1 mb-0.5 font-medium">
                        <Music className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                        <span>Music & Audio Vibe:</span>
                      </span>
                      <p className="text-slate-700 dark:text-neutral-300 leading-snug">{scene.musicVibe}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Interactive 9:16 Video Player Simulator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 mb-3 px-2">
            <span className="flex items-center space-x-1.5 font-medium text-slate-800 dark:text-neutral-300">
              <Smartphone className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span>Interactive 9:16 Mobile Player</span>
            </span>
            <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{currentTime}s / 40s</span>
          </div>

          {/* iPhone Frame */}
          <div className="w-[300px] h-[580px] bg-neutral-950 rounded-[40px] border-4 border-slate-800 dark:border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 ring-1 ring-black/10 dark:ring-neutral-700/50">
            
            {/* Top Phone Notch */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-full z-30 flex items-center justify-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-950"></div>
              <div className="w-2 h-2 rounded-full bg-blue-900/50"></div>
            </div>

            {/* Dynamic Simulated Background based on Active Scene */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-neutral-950 to-neutral-900 transition-colors duration-700"></div>
            
            {/* Animated scene visual pulse */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${isPlaying ? 'opacity-40' : 'opacity-20'}`}>
              <div className="w-full h-full bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:20px_20px] animate-pulse"></div>
            </div>

            {/* Overlay Scene Badge */}
            <div className="relative z-20 pt-6 flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-mono border border-white/10">
                Scene {currentScene?.sceneNumber || 1}: {currentScene?.timeCode}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/80 text-[10px] text-white font-bold uppercase">
                {activeBrand?.name || 'Reel'}
              </span>
            </div>

            {/* Center: Dynamic Pop-in Caption & B-Roll Preview */}
            <div className="relative z-20 text-center space-y-4 my-auto px-2">
              
              {/* Animated Text Overlay (Like Viral Reels) */}
              <div className="inline-block transform transition-transform duration-300 scale-100 hover:scale-105">
                <span className="px-3 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-black text-xs sm:text-sm tracking-wide shadow-xl uppercase inline-block">
                  {currentScene?.overlayText || 'HOOK TEXT'}
                </span>
              </div>

              {/* Synchronized Spoken Caption */}
              <p className="text-white text-xs sm:text-sm font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                "{currentScene?.script}"
              </p>

              <div className="text-[10px] text-purple-300/80 font-mono bg-purple-950/40 py-1 px-2 rounded-md border border-purple-800/40">
                📷 {currentScene?.cameraAngle}
              </div>
            </div>

            {/* Bottom Controls & Scrub Bar inside Phone */}
            <div className="relative z-20 space-y-3 pb-2">
              
              {/* Progress Bar */}
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-500 h-full transition-all duration-300"
                  style={{ width: `${(currentTime / 40) * 100}%` }}
                ></div>
              </div>

              {/* Player Button Bar */}
              <div className="flex items-center justify-between px-2">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Reset to 0s"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-400 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <div className="text-[10px] text-white/80 font-mono">
                  {currentTime}s
                </div>
              </div>

            </div>

          </div>

          <p className="text-[11px] text-slate-500 dark:text-neutral-500 mt-3 text-center">
            Click Play to simulate scene transitions, synchronized captions, and timeline progress.
          </p>

        </div>

      </div>

    </div>
  );
}

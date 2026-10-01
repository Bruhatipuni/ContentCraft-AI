import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Copy,
  Radio,
  FileAudio
} from 'lucide-react';
import { voiceService } from '../services/voiceService';

export function VoiceoverStudio({ initialScript = '', activeBrand }) {
  const [script, setScript] = useState(
    initialScript ||
    `Stop making this classic content mistake if you want actual inbound clients in 2026. Everyone chases likes, but likes don't build businesses. Saves and direct message shares do. Here are the three utility pillars we use at ${activeBrand?.name || 'ContentCraft'}: first, share frameworks over vague opinions. Second, use your own test data. Third, create visual cheat sheets. Drop a comment below and I'll send you our exact template for free!`
  );

  const [persona, setPersona] = useState('energetic');
  const [speed, setSpeed] = useState(1.1);
  const [pitch, setPitch] = useState(1.05);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIdx, setSelectedVoiceIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialScript) {
      setScript(initialScript);
    }
  }, [initialScript]);

  useEffect(() => {
    // Load voices
    const available = voiceService.getVoices();
    setVoices(available);

    const unsubscribe = voiceService.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });

    return () => {
      unsubscribe();
      voiceService.stop();
    };
  }, []);

  const handlePersonaChange = (type) => {
    setPersona(type);
    if (type === 'energetic') {
      setSpeed(1.15);
      setPitch(1.1);
    } else if (type === 'executive') {
      setSpeed(0.95);
      setPitch(0.95);
    } else if (type === 'storyteller') {
      setSpeed(0.9);
      setPitch(1.0);
    } else if (type === 'rapid') {
      setSpeed(1.3);
      setPitch(1.15);
    }
  };

  const handlePlay = () => {
    if (isPlaying) {
      voiceService.pause();
    } else {
      voiceService.speak({
        text: script,
        voiceIndex: selectedVoiceIdx,
        rate: speed,
        pitch: pitch,
        onEnd: () => setIsPlaying(false),
        onError: (err) => {
          console.error(err);
          setIsPlaying(false);
        }
      });
    }
  };

  const handleStop = () => {
    voiceService.stop();
    setIsPlaying(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 uppercase tracking-wider">
              Feature 4 · Audio Engine
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Natural Voiceover Synthesizer</span>
          </div>
          <h1 className="serif-headline text-2xl sm:text-3xl font-bold text-slate-900 dark:text-neutral-100 mt-1">
            AI Voiceover Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            Turn social scripts, captions, and reel storyboards into natural, expressive voiceovers with tone and pacing control.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-200 dark:border-neutral-800 self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Clean Script' : 'Copy Clean Script'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Script Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
                <FileAudio className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                <span>Voiceover Script</span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-neutral-500 font-mono font-medium">
                {script.split(/\s+/).filter(Boolean).length} words · ~{Math.round(script.split(/\s+/).filter(Boolean).length / (2.5 * speed))} sec
              </span>
            </div>

            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={10}
              placeholder="Paste or type script for speech synthesis..."
              className="w-full rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-4 text-xs sm:text-sm text-slate-800 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-600 focus:outline-none focus:border-rose-500 leading-relaxed font-sans transition-colors"
            />

            {/* Quick Sample Script Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500 dark:text-neutral-500 text-[11px]">Quick presets:</span>
              <button
                onClick={() => setScript(`Tired of spending 14 hours every week rewriting posts? With ContentCraft AI, you enter one brief and generate LinkedIn carousels, reels, and tweets in 10 seconds. Try it free today!`)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 border border-slate-200 dark:border-neutral-800 text-[11px] font-medium transition-colors"
              >
                15s Teaser Ad
              </button>
              <button
                onClick={() => setScript(`3 reasons your skin barrier is acting up this month: over-exfoliation with strong acids, dry air conditioning, and skipping ceramides. Here is the gentle 3-step solution from ${activeBrand?.name || 'GlowSkin'}.`)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 border border-slate-200 dark:border-neutral-800 text-[11px] font-medium transition-colors"
              >
                30s Educational Reel
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Audio Controls & Visualizer (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Tone Persona Selector */}
          <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Radio className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <span>Voice Tone Persona</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'energetic', name: 'Viral Creator', desc: 'Punchy & Engaging (1.15x)' },
                { id: 'executive', name: 'Executive Leader', desc: 'Calm & Authoritative (0.95x)' },
                { id: 'storyteller', name: 'Warm Storyteller', desc: 'Deep & Empathetic (0.9x)' },
                { id: 'rapid', name: 'Rapid-Fire Hook', desc: 'High Energy Shorts (1.3x)' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePersonaChange(p.id)}
                  className={`p-2.5 rounded-lg text-left border text-xs transition-all ${
                    persona === p.id
                      ? 'bg-rose-500/10 border-rose-500/60 text-rose-600 dark:text-rose-300 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200'
                  }`}
                >
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-[10px] opacity-75">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Engine & Sliders */}
          <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-neutral-800 space-y-3.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Acoustic Modulation</span>
            </label>

            {/* Voice dropdown */}
            {voices.length > 0 && (
              <div>
                <label className="text-[11px] text-slate-600 dark:text-neutral-400 mb-1 block">Synthesizer Voice</label>
                <select
                  value={selectedVoiceIdx}
                  onChange={(e) => setSelectedVoiceIdx(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none focus:border-rose-500"
                >
                  {voices.map((v, i) => (
                    <option key={i} value={i}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Speed slider */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-neutral-400 mb-1">
                <span>Playback Speed</span>
                <span className="font-mono text-slate-800 dark:text-neutral-200 font-bold">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.6"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Pitch slider */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-neutral-400 mb-1">
                <span>Vocal Pitch</span>
                <span className="font-mono text-slate-800 dark:text-neutral-200 font-bold">{pitch}x</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.4"
                step="0.05"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Player & Waveform Visualizer */}
          <div className="glass-panel rounded-xl p-5 border border-slate-200 dark:border-neutral-800 space-y-4 text-center">
            
            {/* Animated Waveform Visualizer */}
            <div className="h-16 flex items-center justify-center space-x-1.5 px-4 bg-slate-100 dark:bg-neutral-950/80 rounded-xl border border-slate-200 dark:border-neutral-800">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-rose-500 transition-all ${
                    isPlaying 
                      ? i % 5 === 0 ? 'animate-wave-1' :
                        i % 5 === 1 ? 'animate-wave-2' :
                        i % 5 === 2 ? 'animate-wave-3' :
                        i % 5 === 3 ? 'animate-wave-4' : 'animate-wave-5'
                      : 'h-2 bg-slate-300 dark:bg-neutral-700'
                  }`}
                  style={{
                    height: isPlaying ? undefined : '6px'
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={handleStop}
                className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 transition-colors"
                title="Stop playback"
              >
                <Square className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlay}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-500/20 flex items-center space-x-2 transition-all hover:scale-105"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                <span>{isPlaying ? 'Pause Voiceover' : 'Play Voiceover Now'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-neutral-500">
              Audio is rendered using native browser speech synthesis with zero external latency.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

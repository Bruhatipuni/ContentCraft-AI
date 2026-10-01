class VoiceService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.currentUtterance = null;
    this.isPlaying = false;
    this.onStateChangeCallbacks = [];

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return [];
    this.voices = this.synth.getVoices();
    return this.voices;
  }

  getVoices() {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }
    return this.voices;
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.push(callback);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter(c => c !== callback);
    };
  }

  notifyState(state) {
    this.isPlaying = state;
    this.onStateChangeCallbacks.forEach(cb => cb({ isPlaying: state }));
  }

  speak({ text, voiceIndex = 0, rate = 1.0, pitch = 1.0, onEnd, onError }) {
    if (!this.synth) {
      if (onError) onError('Speech synthesis not supported in this browser environment.');
      return;
    }

    this.stop();

    if (!text || text.trim().length === 0) return;

    // Clean text of markdown, emojis, asterisks for natural speech
    const cleanText = text
      .replace(/[\u{1F300}-\u{1F6FF}|✨|💡|👉|👇|🔥|🚀|📈|🌿|⚡|🧵|📊|🎯]/gu, '')
      .replace(/[*_#`[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const available = this.getVoices();

    if (available.length > 0 && available[voiceIndex]) {
      utterance.voice = available[voiceIndex];
    }

    utterance.rate = Math.max(0.5, Math.min(2.0, rate));
    utterance.pitch = Math.max(0.5, Math.min(2.0, pitch));

    utterance.onstart = () => {
      this.notifyState(true);
    };

    utterance.onend = () => {
      this.notifyState(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.notifyState(false);
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
      this.notifyState(false);
    }
  }

  resume() {
    if (this.synth) {
      this.synth.resume();
      this.notifyState(true);
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notifyState(false);
    }
  }
}

export const voiceService = new VoiceService();

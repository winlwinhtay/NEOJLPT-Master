// Web Speech API Voice and Recognition Service

export interface SpeechPlaybackOptions {
  rate?: number; // 0.75, 1.0, 1.25, 1.5
  pitch?: number;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export interface ContinuousRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  maxDurationSeconds?: number; // 0 for unlimited, or e.g. 15, 30, 60, 120
  silenceTimeoutMs?: number; // 0 for manual stop only, or e.g. 3500ms
  onInterim?: (interimText: string, fullText: string) => void;
  onFinalResult?: (finalText: string) => void;
  onTimeTick?: (elapsedSeconds: number, remainingSeconds: number) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export interface RecognitionSessionHandle {
  start: () => void;
  stop: () => void;
  abort: () => void;
  isSupported: boolean;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private japaneseVoice: SpeechSynthesisVoice | null = null;
  private isVoiceLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize high-quality Japanese voice
    const jaVoice =
      voices.find((v) => v.lang.startsWith('ja') && (v.name.includes('Google') || v.name.includes('Kyoko') || v.name.includes('Otoya') || v.name.includes('Natural'))) ||
      voices.find((v) => v.lang.startsWith('ja')) ||
      null;

    if (jaVoice) {
      this.japaneseVoice = jaVoice;
      this.isVoiceLoaded = true;
    }
  }

  public speakJapanese(text: string, options?: SpeechPlaybackOptions): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth || typeof window === 'undefined') {
        resolve();
        return;
      }

      // Stop any ongoing speech
      this.synth.cancel();

      // Clean furigana or ruby brackets if present (e.g., [漢字]{かんじ} -> かんじ or 漢字)
      const cleanText = text.replace(/\[([^\]]+)\]\{([^}]+)\}/g, '$1');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = options?.rate || 1.0;
      utterance.pitch = options?.pitch || 1.0;

      if (this.japaneseVoice) {
        utterance.voice = this.japaneseVoice;
      }

      utterance.onend = () => {
        options?.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        options?.onError?.(e);
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Speech Recognition (Speech-to-Text) - Backward-compatible helper
  public createRecognitionSession(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void,
    options?: { continuous?: boolean; lang?: string }
  ): RecognitionSessionHandle {
    if (typeof window === 'undefined') {
      return { start: () => {}, stop: () => {}, abort: () => {}, isSupported: false };
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return { start: () => {}, stop: () => {}, abort: () => {}, isSupported: false };
    }

    const recognition = new SpeechRecognition();
    recognition.lang = options?.lang || 'ja-JP';
    recognition.continuous = options?.continuous ?? false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const resultText = final || interim;
      onResult(resultText, Boolean(final));
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      onError(event.error || 'Recognition error occurred');
    };

    recognition.onend = () => {
      onEnd();
    };

    return {
      start: () => {
        try {
          recognition.start();
        } catch (e) {
          // Ignore if already started
        }
      },
      stop: () => {
        try {
          recognition.stop();
        } catch (e) {
          // Ignore
        }
      },
      abort: () => {
        try {
          recognition.abort();
        } catch (e) {}
      },
      isSupported: true,
    };
  }

  // Continuous Speech Recognition with Duration Limits, Silence Detector, and Interim Callbacks
  public createContinuousRecognitionSession(
    options: ContinuousRecognitionOptions
  ): RecognitionSessionHandle {
    if (typeof window === 'undefined') {
      return { start: () => {}, stop: () => {}, abort: () => {}, isSupported: false };
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return { start: () => {}, stop: () => {}, abort: () => {}, isSupported: false };
    }

    const recognition = new SpeechRecognition();
    recognition.lang = options.lang || 'ja-JP';
    recognition.continuous = options.continuous !== false; // true by default!
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let isManuallyStopped = false;
    let isAborted = false;
    let latestFullTranscript = '';
    let silenceTimer: any = null;
    let tickInterval: any = null;
    let elapsedSeconds = 0;
    const maxDuration = options.maxDurationSeconds ?? 30;
    const silenceMs = options.silenceTimeoutMs ?? 0;

    const resetSilenceTimer = () => {
      if (silenceMs <= 0) return;
      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        finishSession(false);
      }, silenceMs);
    };

    const cleanupTimers = () => {
      if (silenceTimer) {
        clearTimeout(silenceTimer);
        silenceTimer = null;
      }
      if (tickInterval) {
        clearInterval(tickInterval);
        tickInterval = null;
      }
    };

    const finishSession = (aborted: boolean = false) => {
      if (isManuallyStopped || isAborted) return;
      cleanupTimers();

      if (aborted) {
        isAborted = true;
        try {
          recognition.abort();
        } catch (e) {}
        options.onEnd?.();
      } else {
        isManuallyStopped = true;
        try {
          recognition.stop();
        } catch (e) {}
        options.onFinalResult?.(latestFullTranscript);
        options.onEnd?.();
      }
    };

    recognition.onresult = (event: any) => {
      if (isManuallyStopped || isAborted) return;

      let final = '';
      let interim = '';

      for (let i = 0; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          final += item[0].transcript;
        } else {
          interim += item[0].transcript;
        }
      }

      const total = (final + interim).trim();
      latestFullTranscript = total;
      options.onInterim?.(interim, total);

      if (total.length > 0) {
        resetSilenceTimer();
      }
    };

    recognition.onerror = (event: any) => {
      const err = event.error;
      if (err === 'no-speech' || err === 'aborted') {
        return;
      }
      cleanupTimers();
      options.onError?.(err || 'Recognition error occurred');
    };

    recognition.onend = () => {
      cleanupTimers();
      if (!isManuallyStopped && !isAborted) {
        options.onFinalResult?.(latestFullTranscript);
        options.onEnd?.();
      }
    };

    return {
      start: () => {
        isManuallyStopped = false;
        isAborted = false;
        latestFullTranscript = '';
        elapsedSeconds = 0;
        cleanupTimers();

        try {
          recognition.start();

          tickInterval = setInterval(() => {
            elapsedSeconds += 1;
            const remaining = maxDuration > 0 ? Math.max(0, maxDuration - elapsedSeconds) : 999;
            options.onTimeTick?.(elapsedSeconds, remaining);

            if (maxDuration > 0 && elapsedSeconds >= maxDuration) {
              finishSession(false);
            }
          }, 1000);

          if (silenceMs > 0) {
            resetSilenceTimer();
          }
        } catch (e) {
          console.warn('Speech recognition start failed or already active', e);
        }
      },
      stop: () => {
        finishSession(false);
      },
      abort: () => {
        finishSession(true);
      },
      isSupported: true,
    };
  }

  // Pronunciation similarity evaluator
  public evaluatePronunciation(spoken: string, target: string): {
    score: number;
    status: 'excellent' | 'good' | 'needs_work' | 'try_again';
    feedback: string;
  } {
    const s1 = spoken.trim().replace(/[、。！？\s]/g, '');
    const s2 = target.trim().replace(/[、。！？\s]/g, '');

    if (!s1) {
      return {
        score: 0,
        status: 'try_again',
        feedback: 'No voice detected. Please try speaking clearly into your microphone.',
      };
    }

    // Levenshtein distance
    const dist = this.levenshtein(s1, s2);
    const maxLen = Math.max(s1.length, s2.length);
    const similarity = Math.max(0, 1 - dist / maxLen);
    const score = Math.round(similarity * 100);

    if (score >= 85) {
      return {
        score,
        status: 'excellent',
        feedback: 'Subarashii! (Excellent!) Your pronunciation is clear and accurate.',
      };
    } else if (score >= 65) {
      return {
        score,
        status: 'good',
        feedback: 'Good attempt! You were understood well. Try matching the pitch accent slightly closer.',
      };
    } else if (score >= 40) {
      return {
        score,
        status: 'needs_work',
        feedback: 'Almost there. Listen to the native audio again and repeat slowly.',
      };
    } else {
      return {
        score,
        status: 'try_again',
        feedback: 'Review the sentence breakdown and try speaking the syllables clearly.',
      };
    }
  }

  private levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }
}

export const speechService = new SpeechService();

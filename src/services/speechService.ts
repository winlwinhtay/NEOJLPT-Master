// Web Speech API Voice and Recognition Service

export interface SpeechPlaybackOptions {
  rate?: number; // 0.75, 1.0, 1.25, 1.5
  pitch?: number;
  onEnd?: () => void;
  onError?: (err: any) => void;
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

  // Speech Recognition (Speech-to-Text)
  public createRecognitionSession(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): { start: () => void; stop: () => void; isSupported: boolean } {
    if (typeof window === 'undefined') {
      return { start: () => {}, stop: () => {}, isSupported: false };
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return { start: () => {}, stop: () => {}, isSupported: false };
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.continuous = false;
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

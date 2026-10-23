import { JLPTLevel } from '../types';
import {
  SpeakingMode,
  SpeakingFeedback,
  SavedLearningItem,
  SpeakingSessionRecord,
  GrammarCorrectionItem,
  VocabularyEnhancementItem,
  NaturalAlternativeItem,
} from '../types/speakingCoach';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { AIService } from './aiService';

const STORAGE_SAVED_ITEMS_KEY = 'jlpt_speaking_saved_items';
const STORAGE_SESSIONS_KEY = 'jlpt_speaking_sessions_history';

export class SpeakingCoachService {
  /**
   * Analyzes user's spoken sentence and returns structured, schema-validated feedback.
   */
  public static async analyzeSpokenSpeech(params: {
    userText: string;
    conversationHistory: { sender: 'user' | 'ai' | 'system'; text: string }[];
    topic: string;
    mode: SpeakingMode;
    level: JLPTLevel;
    explanationLang: 'en' | 'my' | 'ja';
  }): Promise<SpeakingFeedback> {
    const trimmed = params.userText.trim();
    if (!trimmed) {
      return this.getEmptyFallback(params.level, params.mode);
    }

    // Try live Gemini API analysis if configured
    const apiKey = (AIService as any).getEffectiveApiKey?.();
    if (apiKey) {
      try {
        const liveFeedback = await this.callGeminiCoachAnalysis(params, apiKey);
        if (liveFeedback) return liveFeedback;
      } catch (err) {
        console.warn('SpeakingCoachService: Direct Gemini analysis error, using intelligent offline coach:', err);
      }
    }

    // Fallback: Intelligent rule-based linguistic coach (offline-resilient)
    return this.generateIntelligentContextualCoachFeedback(params);
  }

  /**
   * Direct Gemini API Call with Structured JSON Schema
   */
  private static async callGeminiCoachAnalysis(
    params: {
      userText: string;
      conversationHistory: { sender: 'user' | 'ai' | 'system'; text: string }[];
      topic: string;
      mode: SpeakingMode;
      level: JLPTLevel;
      explanationLang: 'en' | 'my' | 'ja';
    },
    apiKey: string
  ): Promise<SpeakingFeedback | null> {
    const recentDialogue = params.conversationHistory
      .slice(-4)
      .map((m) => `${m.sender === 'user' ? 'Learner' : 'Yuki'}: ${m.text}`)
      .join('\n');

    const modeInstructions = {
      natural_conversation:
        'Focus on natural conversational flow and fluency. Keep corrections concise, encourage natural aizuchi, and suggest spontaneous spoken alternatives.',
      learning_mode:
        'Provide thorough grammar instruction: explain particle usage (は vs が, に vs で, を, へ), verb conjugations, and common errors at JLPT ' +
        params.level +
        ' level with clear examples.',
      professional_speaking:
        'Focus on Japanese workplace etiquette (ビジネス日本語), polite expressions (丁寧語・尊敬語・謙譲語), business phone/meeting vocabulary, and professional nuance.',
    };

    const prompt = `You are Yuki, an expert Japanese Speaking Coach & Tutor.
The user just spoke Japanese in a conversation. Analyze their speech and provide constructive, encouraging tutoring.

Context / Scenario: "${params.topic}"
Coaching Mode: "${params.mode}" (${modeInstructions[params.mode]})
Learner Target Level: JLPT ${params.level}
Explanation Language Requested: ${params.explanationLang === 'my' ? 'Burmese (Myanmar Unicode script) with English summary' : 'English'}

Recent conversation turns:
${recentDialogue || '(Beginning of dialogue)'}

Learner's confirmed spoken transcript:
"${params.userText}"

CRITICAL INSTRUCTIONS:
1. "correctedTranscript": The grammatically correct version of what the user attempted, preserving their exact intended meaning. If the sentence was already completely correct, return the same text.
2. "overallSummary": A 1-2 sentence warm encouraging summary of their spoken attempt.
3. "grammarCorrections": Array of specific grammar mistakes (particles, verb tense/form, adjective endings). If no grammar mistakes, return empty array [].
4. "vocabularyEnhancements": Array of 1-3 suggested word upgrades. Give the original word, a more expressive/accurate alternative, its meaning, an example sentence, and register ("casual" | "neutral" | "formal" | "professional").
5. "naturalAlternatives": Array of 1-2 natural alternatives fluent native Japanese speakers would use in this exact conversational context.
6. "learningPoints": Exactly 3 actionable bullet-point takeaways from this turn.
7. "retryPrompt": A friendly challenge inviting the user to speak again (e.g., "もう一度、丁寧な形で言ってみましょう！").

Return STRICT JSON adhering to this schema:
{
  "originalTranscript": "${params.userText}",
  "correctedTranscript": "corrected sentence in Japanese",
  "overallSummary": "warm summary in ${params.explanationLang === 'my' ? 'Burmese/English' : 'English'}",
  "overallSummaryMy": "Burmese translation of summary in Myanmar Unicode",
  "grammarCorrections": [
    {
      "original": "error phrase in user speech",
      "correction": "corrected phrase",
      "explanation": "explanation in English",
      "explanationMy": "explanation in Burmese (Myanmar Unicode)",
      "category": "particles / verbs / tense / politeness",
      "severity": "high / medium / low"
    }
  ],
  "vocabularyEnhancements": [
    {
      "originalExpression": "word user used",
      "suggestedExpression": "improved word",
      "meaning": "meaning in English and Burmese",
      "example": "example Japanese sentence",
      "register": "neutral",
      "reason": "why this word is more suitable"
    }
  ],
  "naturalAlternatives": [
    {
      "expression": "natural Japanese sentence",
      "reading": "kana reading",
      "explanation": "why native speakers say it this way",
      "explanationMy": "Burmese explanation"
    }
  ],
  "learningPoints": [
    "Point 1",
    "Point 2",
    "Point 3"
  ],
  "learningPointsMy": [
    "အချက် ၁",
    "အချက် ၂",
    "အချက် ၃"
  ],
  "retryPrompt": "challenge prompt in Japanese/English",
  "retryPromptMy": "challenge prompt in Burmese"
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 1200,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini Coach error HTTP ${res.status}`);
    }

    const data = await res.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) return null;

    const parsed = JSON.parse(rawJson);

    return {
      id: `fb-${Date.now()}`,
      originalTranscript: params.userText,
      correctedTranscript: parsed.correctedTranscript || params.userText,
      overallSummary: parsed.overallSummary || 'Good effort speaking Japanese!',
      overallSummaryMy: parsed.overallSummaryMy,
      grammarCorrections: Array.isArray(parsed.grammarCorrections) ? parsed.grammarCorrections : [],
      vocabularyEnhancements: Array.isArray(parsed.vocabularyEnhancements)
        ? parsed.vocabularyEnhancements
        : [],
      naturalAlternatives: Array.isArray(parsed.naturalAlternatives)
        ? parsed.naturalAlternatives
        : [],
      learningPoints: Array.isArray(parsed.learningPoints) ? parsed.learningPoints : [],
      learningPointsMy: parsed.learningPointsMy,
      retryPrompt: parsed.retryPrompt || 'Try saying the sentence once more with the correction!',
      retryPromptMy: parsed.retryPromptMy,
      level: params.level,
      mode: params.mode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  /**
   * Intelligent Contextual Rule-Based Fallback Engine
   */
  private static generateIntelligentContextualCoachFeedback(params: {
    userText: string;
    topic: string;
    mode: SpeakingMode;
    level: JLPTLevel;
    explanationLang: 'en' | 'my' | 'ja';
  }): SpeakingFeedback {
    const text = params.userText;
    const corrections: GrammarCorrectionItem[] = [];
    const vocabUpgrades: VocabularyEnhancementItem[] = [];
    let corrected = text;

    // Rule 1: Particle check (e.g. 日本に行く vs 日本へ行く)
    if (text.includes('日本に行く') || text.includes('学校に行く')) {
      vocabUpgrades.push({
        originalExpression: '行く',
        suggestedExpression: '向かう (むかう) / 訪れる (おとずれる)',
        meaning: 'to head towards / to visit (ဦးတည်သွားသည်)',
        example: '来週、東京へ向かいます。',
        register: params.mode === 'professional_speaking' ? 'formal' : 'neutral',
        reason: 'Adds dynamic direction and polish beyond standard 行く.',
      });
    }

    // Rule 2: Polite vs Casual (です / だ)
    if (params.mode === 'professional_speaking') {
      if (text.endsWith('だ') || text.endsWith('だよ')) {
        corrections.push({
          original: 'だ',
          correction: 'でございます / です',
          explanation: 'In professional workplace conversations, use です or でございます instead of casual だ.',
          explanationMy: 'လုပ်ငန်းခွင်သုံး စကားပြောတွင် ရင်းနှီးသော 「だ」အစား ယဉ်ကျေးသော 「です / でございます」ကို သုံးသင့်ပါသည်။',
          category: 'politeness',
          severity: 'high',
        });
        corrected = text.replace(/だ(よ)?$/, 'です');
      }

      vocabUpgrades.push({
        originalExpression: 'すみません',
        suggestedExpression: '恐れ入ります (おそれいります) / 申し訳ございません',
        meaning: 'Excuse me / I am terribly sorry (အားနာပါသည်/ခွင့်လွှတ်ပါ)',
        example: '恐れ入りますが、少々お待ちいただけますでしょうか。',
        register: 'professional',
        reason: 'Elevates politeness to formal business standard (敬語).',
      });
    }

    // Rule 3: Past tense checking (〜た vs 〜ている)
    if (text.includes('昨日') && text.includes('行く')) {
      corrections.push({
        original: '行く',
        correction: '行きました / 行った',
        explanation: 'Time word "yesterday" (昨日) requires the past tense form (行きました).',
        explanationMy: 'မနေ့က (昨日) ဟူသော အတိတ်ကာလပြ စကားလုံးပါဝင်သဖြင့် အတိတ်ကာလကြိယာ 「行きました」 ကို သုံးရပါမည်။',
        category: 'tense',
        severity: 'high',
      });
      corrected = text.replace(/行く/g, '行きました');
    }

    // Default natural alternative
    const naturalAlt: NaturalAlternativeItem = {
      expression: corrected.endsWith('。') ? corrected : `${corrected}ね。`,
      reading: '',
      explanation:
        params.mode === 'professional_speaking'
          ? 'Professional business Japanese phrasing suited for workplace communication.'
          : 'Natural conversational phrasing used by native speakers in casual and standard dialogue.',
      explanationMy:
        params.mode === 'professional_speaking'
          ? 'လုပ်ငန်းခွင်တွင် ဂျပန်လူမျိုးများ သုံးစွဲသော ယဉ်ကျေးသည့် အသုံးအနှုန်း ဖြစ်ပါသည်။'
          : 'ဂျပန်စကားပြောတွင် ပိုမိုသဘာဝကျစွာ အသုံးပြုနိုင်သော စကားစု ဖြစ်ပါသည်။',
    };

    return {
      id: `fb-${Date.now()}`,
      originalTranscript: text,
      correctedTranscript: corrected,
      overallSummary:
        corrections.length > 0
          ? `You conveyed your thought well! We made ${corrections.length} key grammatical adjustment to polish your speech.`
          : 'Excellent speaking! Your grammar and phrasing are natural and clear.',
      overallSummaryMy:
        corrections.length > 0
          ? `ပြောဆိုလိုသော အဓိပ္ပာယ်ကို ရှင်းလင်းစွာ ဖော်ပြနိုင်ခဲ့ပါသည်။ ပိုမိုတိကျစေရန် သဒ္ဒါပြင်ဆင်ချက် ${corrections.length} ချက် ပြုလုပ်ပေးထားပါသည်။`
          : 'အလွန်ကောင်းမွန်ပါသည်။ သင်၏ ဂျပန်စကားပြော သဒ္ဒါနှင့် ဝါကျဖွဲ့စည်းပုံမှာ သဘာဝကျပြီး ရှင်းလင်းပါသည်။',
      grammarCorrections: corrections,
      vocabularyEnhancements: vocabUpgrades,
      naturalAlternatives: [naturalAlt],
      learningPoints: [
        corrections.length > 0
          ? `Pay attention to verb tense consistency when talking about events.`
          : 'Great confidence speaking in natural rhythm.',
        `In ${params.mode === 'professional_speaking' ? 'business' : 'daily'} speaking, choose register matching your listener.`,
        'Repeat the corrected sentence aloud to build muscle memory.',
      ],
      learningPointsMy: [
        'အချိန်ကာလပြ စကားလုံးများနှင့် ကြိယာကာလ ကိုက်ညီမှုကို သတိပြုပါ။',
        'စကားပြောသည့် အခြေအနေနှင့် လိုက်လျောညီထွေရှိသော ယဉ်ကျေးမှုအဆင့်ကို ရွေးချယ်ပါ။',
        'ပြင်ဆင်ထားသော ဝါကျကို နှုတ်မှ အသံထွက်၍ အကြိမ်ကြိမ် လေ့ကျင့်ပါ။',
      ],
      retryPrompt: 'もう一度、より自然な発音と表現で言ってみましょう！ (Try saying the sentence once more!)',
      retryPromptMy: 'ပြင်ဆင်ထားသော ဝါကျကို အသံထွက်၍ နောက်တစ်ကြိမ် ထပ်မံပြောဆိုကြည့်ပါခင်ဗျာ။',
      level: params.level,
      mode: params.mode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  private static getEmptyFallback(level: JLPTLevel, mode: SpeakingMode): SpeakingFeedback {
    return {
      id: `fb-${Date.now()}`,
      originalTranscript: '',
      correctedTranscript: '',
      overallSummary: 'No spoken input detected. Please speak clearly into the microphone.',
      overallSummaryMy: 'အသံဖမ်းယူမှု မရရှိသေးပါ။ ကျေးဇူးပြု၍ မိုက်ခရိုဖုန်းသို့ ရှင်းလင်းစွာ ပြောဆိုပါ။',
      grammarCorrections: [],
      vocabularyEnhancements: [],
      naturalAlternatives: [],
      learningPoints: ['Press the microphone button and speak a complete sentence.'],
      learningPointsMy: ['မိုက်ခရိုဖုန်းခလုတ်ကို နှိပ်၍ ဝါကျအပြည့်အစုံ ပြောဆိုလေ့ကျင့်ပါ။'],
      retryPrompt: 'マイクを押して、もう一度話してください。',
      retryPromptMy: 'မိုက်ခရိုဖုန်းကို နှိပ်ပြီး ထပ်မံပြောဆိုပါ။',
      level,
      mode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  // =========================================================================
  // PERSISTENCE & LEARNING DASHBOARD STORE
  // =========================================================================

  /**
   * Save a vocabulary or grammar item to user's personal learning list.
   */
  public static saveLearningItem(item: Omit<SavedLearningItem, 'id' | 'date' | 'known'>): SavedLearningItem {
    const list = this.loadSavedLearningItems();
    // Prevent duplicate entries
    const existing = list.find(
      (i) => i.original === item.original && i.enhanced === item.enhanced
    );
    if (existing) return existing;

    const newItem: SavedLearningItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toISOString(),
      known: false,
    };

    const updated = [newItem, ...list];
    try {
      localStorage.setItem(STORAGE_SAVED_ITEMS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving learning item:', e);
    }

    // Background sync to Supabase if available
    if (isSupabaseConfigured()) {
      void Promise.resolve(
        supabase
          .from('speaking_saved_items')
          .insert({
            id: newItem.id,
            type: newItem.type,
            original_text: newItem.original,
            enhanced_text: newItem.enhanced,
            meaning: newItem.meaning,
            example_sentence: newItem.example,
            register_style: newItem.register,
            explanation: newItem.explanation,
            jlpt_level: newItem.level,
            known_status: false,
          })
      ).catch(() => {});
    }

    return newItem;
  }

  /**
   * Load saved vocabulary and grammar learning items.
   */
  public static loadSavedLearningItems(): SavedLearningItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_ITEMS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading saved learning items:', e);
    }
    return [];
  }

  /**
   * Remove a saved learning item.
   */
  public static removeSavedLearningItem(id: string): void {
    const list = this.loadSavedLearningItems().filter((i) => i.id !== id);
    try {
      localStorage.setItem(STORAGE_SAVED_ITEMS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error removing learning item:', e);
    }

    if (isSupabaseConfigured()) {
      void Promise.resolve(supabase.from('speaking_saved_items').delete().eq('id', id)).catch(() => {});
    }
  }

  /**
   * Toggle known status on a saved learning item.
   */
  public static toggleItemKnown(id: string): void {
    const list = this.loadSavedLearningItems().map((i) =>
      i.id === id ? { ...i, known: !i.known } : i
    );
    try {
      localStorage.setItem(STORAGE_SAVED_ITEMS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error updating known status:', e);
    }
  }

  /**
   * Record a speaking turn and feedback into the session history.
   */
  public static recordSpeakingSession(
    topic: string,
    mode: SpeakingMode,
    level: JLPTLevel,
    feedback: SpeakingFeedback
  ): void {
    const sessions = this.loadSessionHistory();
    const today = new Date().toDateString();

    let todaySession = sessions.find(
      (s) => s.topic === topic && s.mode === mode && new Date(s.createdAt).toDateString() === today
    );

    if (todaySession) {
      todaySession.turnCount += 1;
      todaySession.feedbacks.unshift(feedback);
    } else {
      todaySession = {
        id: `sess-${Date.now()}`,
        topic,
        mode,
        level,
        learningLanguage: 'ja',
        explanationLanguage: 'en',
        createdAt: new Date().toISOString(),
        turnCount: 1,
        feedbacks: [feedback],
      };
      sessions.unshift(todaySession);
    }

    try {
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions.slice(0, 30)));
    } catch (e) {
      console.error('Error recording speaking session:', e);
    }
  }

  /**
   * Load previous speaking session records.
   */
  public static loadSessionHistory(): SpeakingSessionRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_SESSIONS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading session history:', e);
    }
    return [];
  }
}

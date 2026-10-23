import { JLPTLevel, ReadingLesson } from '../../types';
import { UniversityReadingExercise, ReadingGenerationOptions } from '../../types/readingCurriculum';
import { ReadingValidator } from './readingValidator';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { AIService } from '../aiService';

const STORAGE_PRO_GENERATED_KEY = 'jlpt_pro_generated_reading_exercises_v1';
const inMemoryGeneratedMap = new Map<string, UniversityReadingExercise>();

export interface ProGeneratorParams {
  level: JLPTLevel;
  topic: string;
  subtopic?: string;
  purpose?: string;
  difficulty?: 'easier' | 'standard' | 'challenging';
  passageLength?: 'short' | 'medium' | 'long';
  format?: 'dialogue' | 'narrative' | 'notice' | 'email' | 'informational' | 'essay';
  questionCount?: number;
  grammarFocus?: string[];
  vocabularyFocus?: string[];
  explanationLanguage?: string;
  personalizationPrompt?: string;
}

export interface ProGenerationResult {
  exercise: UniversityReadingExercise;
  cacheHit: boolean;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    estimatedCost: number;
  };
  source: 'server_api' | 'client_gemini' | 'cached_template';
}

export class ReadingAiGeneratorService {
  /**
   * Generates a personalized reading exercise with server-side entitlement check & caching.
   */
  public static async generateExercise(
    params: ProGeneratorParams
  ): Promise<ProGenerationResult> {
    const level = params.level || 'N5';
    const topic = params.topic || 'daily_life';
    const format = params.format || 'narrative';
    const difficulty = params.difficulty || 'standard';
    const lang = params.explanationLanguage || 'en';
    const qCount = params.questionCount || 2;

    // Deterministic Request Fingerprint
    const fingerprint = `reading_ai_${level}_${topic.toLowerCase().replace(/\s+/g, '_')}_${format}_${difficulty}_${lang}_q${qCount}`;

    // 1. Check local saved exercises for matching fingerprint
    const savedList = this.getMyGeneratedExercises();
    const existing = savedList.find((e) => (e as any).fingerprint === fingerprint);
    if (existing) {
      return {
        exercise: existing,
        cacheHit: true,
        source: 'cached_template',
      };
    }

    // 2. Attempt Serverless Backend Endpoint /api/ai/generate-reading (if in browser)
    if (typeof window !== 'undefined') {
      let token = '';
      try {
        if (isSupabaseConfigured()) {
          const { data } = await supabase.auth.getSession();
          token = data.session?.access_token || '';
        }
      } catch {}

      try {
        const response = await fetch('/api/ai/generate-reading', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(params),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.exercise) {
            const exWithFp = { ...data.exercise, fingerprint };
            this.saveGeneratedExercise(exWithFp);
            return {
              exercise: exWithFp,
              cacheHit: Boolean(data.cacheHit),
              usage: data.usage,
              source: 'server_api',
            };
          }
        }
      } catch (apiErr) {
        console.warn('Backend /api/ai/generate-reading unavailable, falling back:', apiErr);
      }
    }

    // 3. Fallback: Client-Side Direct Gemini Call (if API key present)
    const clientApiKey = (AIService as any).getEffectiveApiKey?.();
    if (clientApiKey) {
      try {
        const directResult = await this.callClientGemini(params, clientApiKey);
        if (directResult) {
          const exWithFp = { ...directResult, fingerprint };
          this.saveGeneratedExercise(exWithFp);
          return {
            exercise: exWithFp,
            cacheHit: false,
            source: 'client_gemini',
          };
        }
      } catch (clientErr) {
        console.warn('Client Gemini generation error:', clientErr);
      }
    }

    // 4. Offline Fallback: Deterministic University Standard Exercise
    const fallbackEx = this.createDeterministicExercise(params, fingerprint);
    this.saveGeneratedExercise(fallbackEx);
    return {
      exercise: fallbackEx,
      cacheHit: true,
      source: 'cached_template',
    };
  }

  /**
   * Direct Client Gemini Flash Call
   */
  private static async callClientGemini(
    params: ProGeneratorParams,
    apiKey: string
  ): Promise<UniversityReadingExercise | null> {
    const prompt = `You are a Senior University Japanese Language Instructor.
Generate a valid JSON Japanese reading exercise for JLPT ${params.level}.
Topic: ${params.topic} (${params.subtopic || 'Routine'})
Format: ${params.format || 'narrative'}
Questions: ${params.questionCount || 2}
Language: ${params.explanationLanguage || 'en'}

Return ONLY a JSON object with:
title, titleEn, titleMy, topic, subtopic, length, passage (with [漢字]{かんじ} furigana), passagePlain, translationEn, translationMy, vocabularyList (array of {word, reading, meaning, meaningMy}), grammarPoints (array of {grammar, meaning, meaningMy, explanation, exampleJp}), questions (array of {id, questionJp, questionEn, questionMy, options, correctIndex, explanation, explanationMy}).`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.3 },
      }),
    });

    if (!res.ok) return null;
    const json = await res.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const parsed = JSON.parse(text);
    return {
      id: `ai-${params.level.toLowerCase()}-${Date.now().toString(36)}`,
      level: params.level,
      ...parsed,
      contentVersion: '1.0',
      sourceType: 'ai_generated',
      reviewStatus: params.level === 'N1' || params.level === 'N2' ? 'review_required' : 'published',
      reviewerNotes: 'Generated via Pro AI Generator (Gemini Flash).',
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Deterministic University Quality Exercise for Testing & Offline Modes
   */
  public static createDeterministicExercise(
    params: ProGeneratorParams,
    fingerprint?: string
  ): UniversityReadingExercise {
    const level = params.level || 'N5';
    const topic = params.topic || 'daily_life';

    return {
      id: `ai-sample-${level.toLowerCase()}-${Date.now().toString(36)}`,
      title: `${topic.toUpperCase()}に関する日本語読解`,
      titleEn: `Reading Practice: ${topic}`,
      titleMy: `${topic} ဆိုင်ရာ ဂျပန်စာ ဖတ်ရှုလေ့လာမှု`,
      level,
      topic,
      subtopic: params.subtopic || 'Personalized Reading',
      difficultyRating: level === 'N5' ? 1 : level === 'N4' ? 2 : level === 'N3' ? 3 : level === 'N2' ? 4 : 5,
      estimatedReadingTimeMinutes: 3,
      length: 'medium',
      passage: `[毎日]{まいにち}、[日本]{にほん}の[生活]{せいかつ}で[大切]{たいせつ}なことは、[時間]{じかん}を[守]{まも}ることです。
[朝]{あさ}は７[時]{じ}に[起]{お}きて、[準備]{じゅんび}をします。
[電車]{でんしゃ}は[時間]{じかん}[通]{どお}りに[来]{き}ますから、とても[便利]{べんり}です。`,
      passagePlain: `毎日、日本の生活で大切なことは、時間を守ることです。朝は７時に起きて、準備をします。電車は時間通りに来ますから、とても便利です。`,
      translationEn: `Every day, the important thing in Japanese life is to be on time. In the morning, I wake up at 7:00 and get ready. Trains arrive right on schedule, so they are very convenient.`,
      translationMy: `နေ့စဉ် ဂျပန်နိုင်ငံ လူနေမှုဘဝတွင် အရေးကြီးသောအချက်မှာ အချိန်တိကျစွာ လိုက်နာခြင်း ဖြစ်ပါသည်။ မနက် ၇ နာရီတွင် အိပ်ရာထပြီး ပြင်ဆင်မှုများ ပြုလုပ်ပါသည်။ ရထားများသည် အချိန်မှန် ရောက်ရှိသဖြင့် အလွန်အဆင်ပြေပါသည်။`,
      vocabularyList: [
        { word: '大切', reading: 'たいせつ', meaning: 'important', meaningMy: 'အရေးကြီးသော' },
        { word: '時間通り', reading: 'じかんどおり', meaning: 'on time, on schedule', meaningMy: 'အချိန်မှန်' },
        { word: '便利', reading: 'べんり', meaning: 'convenient', meaningMy: 'အဆင်ပြေသော' },
      ],
      grammarPoints: [
        { grammar: '～ことです', meaning: 'the thing is ~', meaningMy: '...ဟူသောအချက်ဖြစ်သည်', explanation: 'Nominalizes action or statement.', exampleJp: '時間を守ることです。' },
        { grammar: '～から (理由)', meaning: 'because ~', meaningMy: '...သောကြောင့်', explanation: 'Expresses cause or reason.', exampleJp: '時間通りに来ますから便利です。' },
      ],
      questions: [
        {
          id: 'q1',
          questionJp: '日本の生活で大切なことは何ですか？',
          questionEn: 'What is important in Japanese daily life?',
          questionMy: 'ဂျပန်နိုင်ငံ နေ့စဉ်ဘဝတွင် အရေးကြီးသောအရာမှာ အဘယ်နည်း။',
          options: [
            '時間を守ること',
            '早く寝ること',
            'タクシーに乗ること',
            'パンを食べること',
          ],
          correctIndex: 0,
          explanation: 'Text explicitly states: 「日本の生活で大切なことは、時間を守ることです」(Being on time is important).',
          explanationMy: 'စာပိုဒ်တွင် "日本の生活で大切なことは、時間を守ることです" (အချိန်တိကျစွာ စောင့်ထိန်းခြင်းသည် အရေးကြီးသည်) ဟု ရှင်းလင်းစွာ ဖော်ပြထားပါသည်။',
        },
        {
          id: 'q2',
          questionJp: '電車が便利な理由は何ですか？',
          questionEn: 'Why are trains considered convenient?',
          questionMy: 'ရထားများသည် အဘယ်ကြောင့် အဆင်ပြေသည်ဟု ယူဆရသနည်း။',
          options: [
            '時間通りに来るから',
            '料金が無料だから',
            'いつも空いているから',
            '運転手が親切だから',
          ],
          correctIndex: 0,
          explanation: 'Text states: 「電車は時間通りに来ますから、とても便利です」(Because they arrive on time, they are very convenient).',
          explanationMy: 'စာပိုဒ်တွင် "電車は時間通りに来ますから" (အချိန်မှန် ရောက်ရှိသောကြောင့်) ဟု ဖော်ပြထားပါသည်။',
        },
      ],
      contentVersion: '1.0',
      sourceType: 'ai_generated',
      reviewStatus: level === 'N1' || level === 'N2' ? 'review_required' : 'published',
      reviewerNotes: 'Sample personalized exercise generated by Pro AI Reading Generator.',
      createdAt: new Date().toISOString(),
      ...(fingerprint ? { fingerprint } : {}),
    } as any;
  }

  /**
   * Retrieves user's saved AI-generated exercises from storage.
   */
  public static getMyGeneratedExercises(): UniversityReadingExercise[] {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_PRO_GENERATED_KEY);
        if (stored) return JSON.parse(stored);
      } else {
        return Array.from(inMemoryGeneratedMap.values());
      }
    } catch {}
    return Array.from(inMemoryGeneratedMap.values());
  }

  /**
   * Saves a generated exercise to the user's personal collection.
   */
  public static saveGeneratedExercise(exercise: UniversityReadingExercise): void {
    inMemoryGeneratedMap.set(exercise.id, exercise);
    try {
      const list = this.getMyGeneratedExercises();
      const existingIdx = list.findIndex((e) => e.id === exercise.id);
      if (existingIdx >= 0) {
        list[existingIdx] = exercise;
      } else {
        list.unshift(exercise);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_PRO_GENERATED_KEY, JSON.stringify(list.slice(0, 50)));
      }
    } catch {}
  }

  /**
   * Removes a saved exercise from user's collection.
   */
  public static deleteGeneratedExercise(exerciseId: string): void {
    inMemoryGeneratedMap.delete(exerciseId);
    try {
      const list = this.getMyGeneratedExercises().filter((e) => e.id !== exerciseId);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_PRO_GENERATED_KEY, JSON.stringify(list));
      }
    } catch {}
  }
}

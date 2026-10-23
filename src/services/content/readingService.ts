import { JLPTLevel, ReadingLesson } from '../../types';
import { READING_DATA } from '../../data/readingData';
import { ContentFilter } from './types';
import {
  UniversityReadingExercise,
  ReadingProgressRecord,
  ReadingGenerationOptions,
} from '../../types/readingCurriculum';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { AIService } from '../aiService';
import { ReadingValidator } from './readingValidator';

const STORAGE_READING_PROGRESS_KEY = 'jlpt_reading_user_progress_records';
const STORAGE_CUSTOM_READINGS_KEY = 'jlpt_custom_reading_exercises';
const inMemoryProgress: ReadingProgressRecord[] = [];

export class ReadingService {
  private static cache = new Map<string, UniversityReadingExercise>();
  private static initialized = false;

  private static initialize(): void {
    if (this.initialized) return;

    // 1. Load canonical core 50 university reading exercises
    for (const r of READING_DATA) {
      this.cache.set(r.id, r as unknown as UniversityReadingExercise);
    }

    // 2. Load locally stored custom/AI-generated exercises
    try {
      const stored = localStorage.getItem(STORAGE_CUSTOM_READINGS_KEY);
      if (stored) {
        const parsed: UniversityReadingExercise[] = JSON.parse(stored);
        for (const item of parsed) {
          this.cache.set(item.id, item);
        }
      }
    } catch (e) {
      console.warn('Error reading stored custom reading exercises:', e);
    }

    this.initialized = true;
  }

  /**
   * Returns all available reading exercises (50 core + custom).
   */
  public static getAllReadings(): UniversityReadingExercise[] {
    this.initialize();
    return Array.from(this.cache.values());
  }

  /**
   * Returns readings filtered by JLPT level.
   */
  public static getReadingsByLevel(level: JLPTLevel): UniversityReadingExercise[] {
    this.initialize();
    return Array.from(this.cache.values()).filter((r) => r.level === level);
  }

  /**
   * Returns a single reading exercise by ID.
   */
  public static getReadingById(id: string): UniversityReadingExercise | undefined {
    this.initialize();
    return this.cache.get(id);
  }

  /**
   * Filter readings by level, topic, and search query with pagination.
   */
  public static filterReadings(
    filter: ContentFilter & { topic?: string }
  ): { items: UniversityReadingExercise[]; total: number } {
    this.initialize();
    let result = Array.from(this.cache.values());

    if (filter.level && filter.level !== 'all') {
      result = result.filter((r) => r.level === filter.level);
    }

    if (filter.topic && filter.topic !== 'all') {
      result = result.filter((r) => r.topic === filter.topic);
    }

    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.titleEn && r.titleEn.toLowerCase().includes(q)) ||
          (r.titleMy && r.titleMy.toLowerCase().includes(q)) ||
          r.passagePlain.toLowerCase().includes(q)
      );
    }

    const total = result.length;
    if (filter.offset !== undefined && filter.limit !== undefined) {
      result = result.slice(filter.offset, filter.offset + filter.limit);
    } else if (filter.limit !== undefined) {
      result = result.slice(0, filter.limit);
    }

    return { items: result, total };
  }

  /**
   * Saves user reading attempt progress locally and persists to Supabase if logged in.
   */
  public static saveReadingProgress(record: ReadingProgressRecord): void {
    const list = this.getReadingProgressList();
    const existingIdx = list.findIndex((p) => p.exerciseId === record.exerciseId);
    if (existingIdx >= 0) {
      list[existingIdx] = record;
    } else {
      list.push(record);
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_READING_PROGRESS_KEY, JSON.stringify(list));
      } else {
        inMemoryProgress.length = 0;
        inMemoryProgress.push(...list);
      }
    } catch (e) {
      console.warn('Error saving local reading progress:', e);
    }

    // Persist to Supabase if configured
    if (isSupabaseConfigured() && record.userId) {
      void Promise.resolve(
        supabase.from('reading_user_progress').upsert({
          id: record.id,
          user_id: record.userId,
          exercise_id: record.exerciseId,
          level: record.level,
          score: record.score,
          total_questions: record.totalQuestions,
          correct_answers_count: record.correctAnswersCount,
          user_answers: record.userAnswers,
          time_spent_seconds: record.timeSpentSeconds,
          completed_at: record.completedAt,
        })
      ).catch(() => {});
    }
  }

  /**
   * Retrieves all reading progress records.
   */
  public static getReadingProgressList(): ReadingProgressRecord[] {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_READING_PROGRESS_KEY);
        if (stored) return JSON.parse(stored);
      } else {
        return [...inMemoryProgress];
      }
    } catch (e) {
      console.warn('Error reading stored progress:', e);
    }
    return [];
  }

  /**
   * Returns a set of completed exercise IDs.
   */
  public static getCompletedExerciseIds(): Set<string> {
    const records = this.getReadingProgressList();
    return new Set(records.map((r) => r.exerciseId));
  }

  /**
   * Returns completion statistics (completed count, average score).
   */
  public static getReadingStats(): {
    totalCompleted: number;
    averageScore: number;
    byLevel: Record<JLPTLevel, { completed: number; total: number }>;
  } {
    this.initialize();
    const records = this.getReadingProgressList();
    const completedSet = new Set(records.map((r) => r.exerciseId));

    const totalCompleted = completedSet.size;
    const avg =
      records.length > 0
        ? Math.round(records.reduce((acc, curr) => acc + curr.score, 0) / records.length)
        : 0;

    const byLevel: Record<JLPTLevel, { completed: number; total: number }> = {
      N5: { completed: 0, total: 10 },
      N4: { completed: 0, total: 10 },
      N3: { completed: 0, total: 10 },
      N2: { completed: 0, total: 10 },
      N1: { completed: 0, total: 10 },
    };

    (['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).forEach((lvl) => {
      const levelExercises = this.getReadingsByLevel(lvl);
      byLevel[lvl].total = levelExercises.length;
      byLevel[lvl].completed = levelExercises.filter((e) => completedSet.has(e.id)).length;
    });

    return { totalCompleted, averageScore: avg, byLevel };
  }

  /**
   * Adds an AI-generated reading exercise and caches it to avoid redundant generation.
   */
  public static addCustomReadingExercise(exercise: UniversityReadingExercise): void {
    this.initialize();
    this.cache.set(exercise.id, exercise);

    try {
      const stored = localStorage.getItem(STORAGE_CUSTOM_READINGS_KEY);
      const list: UniversityReadingExercise[] = stored ? JSON.parse(stored) : [];
      const idx = list.findIndex((e) => e.id === exercise.id);
      if (idx >= 0) {
        list[idx] = exercise;
      } else {
        list.push(exercise);
      }
      localStorage.setItem(STORAGE_CUSTOM_READINGS_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Error saving custom reading exercise:', e);
    }

    if (isSupabaseConfigured()) {
      void Promise.resolve(
        supabase.from('reading_exercises').upsert({
          id: exercise.id,
          title: exercise.title,
          title_en: exercise.titleEn,
          title_my: exercise.titleMy,
          level: exercise.level,
          topic: exercise.topic,
          subtopic: exercise.subtopic,
          difficulty_rating: exercise.difficultyRating || 1,
          estimated_reading_time_minutes: exercise.estimatedReadingTimeMinutes || 3,
          length: exercise.length,
          passage: exercise.passage,
          passage_plain: exercise.passagePlain,
          translation_en: exercise.translationEn,
          translation_my: exercise.translationMy,
          vocabulary_list: exercise.vocabularyList,
          grammar_points: exercise.grammarPoints,
          questions: exercise.questions,
          review_status: exercise.reviewStatus || 'published',
          content_version: exercise.contentVersion || '1.0',
          source_type: exercise.sourceType || 'ai_generated',
          reviewer_notes: exercise.reviewerNotes,
        })
      ).catch(() => {});
    }
  }

  /**
   * AI Reading Generator for PRO / Admin users with parameter validation and caching.
   */
  public static async generateAIReadingExercise(
    options: ReadingGenerationOptions
  ): Promise<UniversityReadingExercise> {
    // Check if an existing generated exercise matches this exact configuration
    this.initialize();
    const existing = Array.from(this.cache.values()).find(
      (e) =>
        e.sourceType === 'ai_generated' &&
        e.level === options.level &&
        e.topic === options.topic &&
        e.length === options.passageLength &&
        e.difficultyRating === options.difficultyRating
    );

    if (existing) {
      return existing;
    }

    const apiKey = (AIService as any).getEffectiveApiKey?.();
    if (apiKey) {
      try {
        const generated = await this.callGeminiReadingGeneration(options, apiKey);
        if (generated) {
          const report = ReadingValidator.validateExercise(generated);
          if (report.isValid) {
            this.addCustomReadingExercise(generated);
            return generated;
          }
        }
      } catch (err) {
        console.warn('Live Gemini generation error, using fallback template:', err);
      }
    }

    // Intelligent Fallback Generator if offline / no key
    const fallback = this.generateFallbackExercise(options);
    this.addCustomReadingExercise(fallback);
    return fallback;
  }

  /**
   * Direct Gemini API Call with Structured JSON Schema
   */
  private static async callGeminiReadingGeneration(
    options: ReadingGenerationOptions,
    apiKey: string
  ): Promise<UniversityReadingExercise | null> {
    const prompt = `You are a Senior Japanese Language Educator and JLPT Reading Specialist.
Generate a university-quality Japanese reading comprehension exercise with the following specifications:
- JLPT Level: ${options.level}
- Curricular Topic: "${options.topic}"
- Subtopic focus: "${options.subtopic || 'contemporary practice'}"
- Passage Length: "${options.passageLength}" (${options.passageLength === 'short' ? '150-250 characters' : options.passageLength === 'medium' ? '300-500 characters' : '550-800 characters'})
- Target Difficulty: ${options.difficultyRating}/5
- Target Question Count: ${options.questionCount} questions
- Explanation Language: ${options.explanationLanguage === 'my' ? 'Burmese (Myanmar Unicode script) with English summary' : 'English'}

CRITICAL INSTRUCTIONS:
1. "passage": Must contain furigana notation using Ruby markup: [漢字]{かんじ}.
2. "passagePlain": Plain Japanese text with standard kanji, no ruby markup.
3. "vocabularyList": Array of 4-6 key vocabulary items: word, reading, meaning (in English and Burmese).
4. "grammarPoints": Array of 2-3 grammar points: grammar formula, meaning, explanation.
5. "questions": Array of ${options.questionCount} multiple-choice questions. Each question must have:
   - "questionJp": Japanese question prompt.
   - "questionEn": English translation.
   - "options": Array of 4 options in Japanese.
   - "correctIndex": Integer (0 to 3) representing the single unambiguously correct answer.
   - "explanation": Clear rationale why the correct answer is right and distractors are wrong.

Return strictly valid JSON matching this schema:
{
  "title": string,
  "titleEn": string,
  "titleMy": string,
  "passage": string,
  "passagePlain": string,
  "translationEn": string,
  "translationMy": string,
  "vocabularyList": [{"word": string, "reading": string, "meaning": string, "meaningMy": string, "example": string}],
  "grammarPoints": [{"grammar": string, "meaning": string, "meaningMy": string, "explanation": string, "explanationMy": string, "exampleJp": string}],
  "questions": [{"id": string, "questionJp": string, "questionEn": string, "questionMy": string, "options": string[], "correctIndex": number, "explanation": string, "explanationMy": string}]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!res.ok) return null;
    const json = await res.json();
    const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    const exerciseId = `r-gen-${options.level.toLowerCase()}-${Date.now()}`;

    return {
      id: exerciseId,
      title: parsed.title,
      titleEn: parsed.titleEn,
      titleMy: parsed.titleMy,
      level: options.level,
      topic: options.topic,
      subtopic: options.subtopic || 'AI Curated Practice',
      difficultyRating: options.difficultyRating,
      estimatedReadingTimeMinutes: options.passageLength === 'short' ? 3 : options.passageLength === 'medium' ? 5 : 7,
      length: options.passageLength,
      passage: parsed.passage,
      passagePlain: parsed.passagePlain,
      translationEn: parsed.translationEn,
      translationMy: parsed.translationMy,
      vocabularyList: parsed.vocabularyList || [],
      grammarPoints: parsed.grammarPoints || [],
      questions: (parsed.questions || []).map((q: any, idx: number) => ({
        ...q,
        id: `${exerciseId}-q${idx + 1}`,
      })),
      reviewStatus: 'published',
      contentVersion: '1.0',
      sourceType: 'ai_generated',
      reviewerNotes: 'Generated via Gemini 2.5 Flash, structured schema validated.',
    };
  }

  /**
   * Fallback Exercise Generator when offline
   */
  private static generateFallbackExercise(options: ReadingGenerationOptions): UniversityReadingExercise {
    const id = `r-gen-${options.level.toLowerCase()}-${Date.now()}`;
    return {
      id,
      title: `${options.level} 読解演習：${options.topic}`,
      titleEn: `${options.level} Reading Practice: ${options.topic}`,
      titleMy: `${options.level} စာဖတ်လေ့ကျင့်ခန်း- ${options.topic}`,
      level: options.level,
      topic: options.topic,
      subtopic: 'Targeted Skill Exercise',
      difficultyRating: options.difficultyRating,
      estimatedReadingTimeMinutes: 4,
      length: options.passageLength,
      passage: `[日本]{にほん}の[社会]{しゃかい}において、${options.topic}に[関]{かん}する[議論]{ぎろん}が[活発]{かっぱつ}に[行]{おこな}われています。
[新]{あたら}しい[技術]{ぎじゅつ}や[制度]{せいど}の[導入]{どうにゅう}によって[生活]{せいかつ}が[便利]{べんり}になる[一方]{いっぽう}で、[伝統的]{でんとうてき}な[価値観]{かちかん}との[調和]{ちょうわ}も[求]{もと}められています。
[一人]{ひとり}ひとりが[主体性]{しゅたいせい}を[持]{も}って[考]{かんが}えることが[大切]{たいせつ}です。`,
      passagePlain: `日本の社会において、${options.topic}に関する議論が活発に行われています。新しい技術や制度の導入によって生活が便利になる一方で、伝統的な価値観との調和も求められています。一人ひとりが主体性を持って考えることが大切です。`,
      translationEn: `In Japanese society, discussions regarding this topic are actively conducted. While daily life becomes convenient through the introduction of new technologies and systems, harmony with traditional values is also demanded. It is important that each individual thinks proactively.`,
      translationMy: `ဂျပန်လူ့ဘောင်တွင် ဤအကြောင်းအရာနှင့် ပတ်သက်၍ ဆွေးနွေးမှုများ တက်ကြွစွာ ပြုလုပ်လျက်ရှိပါသည်။ နည်းပညာနှင့် စနစ်သစ်များကြောင့် ဘဝနေထိုင်မှု အဆင်ပြေလာသော်လည်း ရိုးရာတန်ဖိုးများနှင့် သဟဇာတဖြစ်စေရန်လည်း လိုအပ်ပါသည်။ လူတစ်ဦးချင်းစီက တက်ကြွစွာ စဉ်းစားတွေးခေါ်တတ်ရန် အရေးကြီးပါသည်။`,
      vocabularyList: [
        { word: '活発な', reading: 'かっぱつな', meaning: 'active, lively', meaningMy: 'တက်ကြွသော' },
        { word: '調和', reading: 'ちょうわ', meaning: 'harmony, reconciliation', meaningMy: 'သဟဇာတဖြစ်မှု' },
        { word: '主体性', reading: 'しゅたいせい', meaning: 'initiative, autonomy', meaningMy: 'ကိုယ်ပိုင်အသိဖြင့် တက်ကြွမှု' },
      ],
      grammarPoints: [
        { grammar: '～に関する', meaning: 'concerning / regarding ~', meaningMy: '...နှင့် ပတ်သက်သော', explanation: 'Topic connection marker.', exampleJp: '環境に関する議論が行われます。' },
        { grammar: '～一方で', meaning: 'while ~, on the other hand ...', meaningMy: '...ဖြစ်သော်လည်း အခြားတစ်ဖက်တွင်...', explanation: 'Contrasting simultaneous aspects.', exampleJp: '便利になる一方で、調和も求められます。' },
      ],
      questions: [
        {
          id: `${id}-q1`,
          questionJp: '文章の内容と合致しているものはどれですか？',
          questionEn: 'Which statement matches the content of the passage?',
          questionMy: 'စာပိုဒ်ပါ အကြောင်းအရာနှင့် ကိုက်ညီသော အချက်မှာ အဘယ်နည်း။',
          options: [
            '新しい技術はすべて禁止されるべきである',
            '便利になる一方で、伝統的な価値観との調和も求められている',
            '議論はまったく行われていない',
            '一人で考える必要はない',
          ],
          correctIndex: 1,
          explanation: 'Passage notes: 「便利になる一方で、伝統的な価値観との調和も求められています」(Convenience alongside harmony with traditional values).',
          explanationMy: 'အဆင်ပြေလာသော်လည်း ရိုးရာတန်ဖိုးများနှင့် သဟဇာတဖြစ်ရန် လိုအပ်သည်ဟူသော အချက်ဖြစ်ပါသည်။',
        },
      ],
      reviewStatus: 'published',
      contentVersion: '1.0',
      sourceType: 'ai_generated',
      reviewerNotes: 'Curriculum fallback generated offline.',
    };
  }
}

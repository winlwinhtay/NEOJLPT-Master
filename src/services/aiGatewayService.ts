import { JLPTLevel } from '../types';
import { AICacheItem, AICacheTelemetryStats, AICostMetric } from '../types/aiCache';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { CANONICAL_GRAMMAR } from '../data/canonicalGrammarData';
import { VOCABULARY_DATA } from '../data/vocabularySeed';
import { KANJI_DATA } from '../data/kanjiSeed';
import { CONFUSION_PAIRS_DATA } from '../data/confusionPairsData';

export interface ExplanationResponse {
  title: string;
  explanation: string;
  structure?: string;
  examples: { jp: string; reading: string; meaning: string }[];
  commonMistakes?: string;
  studyTip: string;
  _source?: 'cache' | 'gemini_ai' | 'deterministic_fallback' | 'cache_inflight_dedup';
  _cacheKey?: string;
  _usageCount?: number;
}

export interface PracticeQuestionItem {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  correctAnswer: string;
  explanation: string;
  _source?: string;
}

export class AIGatewayService {
  private static inFlightExplanations = new Map<string, Promise<ExplanationResponse>>();
  private static inFlightPractice = new Map<string, Promise<PracticeQuestionItem[]>>();

  /**
   * Deterministic SHA-256 in browser for client-side cache key preview
   */
  public static async generateClientKey(
    contentType: string,
    level: string,
    contentId: string,
    lang: string = 'en'
  ): Promise<string> {
    const raw = `${contentType.toLowerCase()}:${level.toUpperCase()}::${contentId}:intermediate:${lang.toLowerCase()}:v2:gemini-3.8-flash`;
    const encoder = new TextEncoder();
    const data = encoder.encode(raw);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Get an adaptive explanation with Cache-First Guarantee
   */
  public static async getAdaptiveExplanation(
    contentId: string,
    level: JLPTLevel = 'N5',
    supportLanguage: string = 'en',
    forceRefresh: boolean = false
  ): Promise<ExplanationResponse> {
    const dedupKey = `${contentId}-${level}-${supportLanguage}-${forceRefresh}`;

    if (!forceRefresh && this.inFlightExplanations.has(dedupKey)) {
      return this.inFlightExplanations.get(dedupKey)!;
    }

    const promise = (async () => {
      // 1. Invoke Supabase Edge Function Gateway (checks Supabase ai_content_cache first!)
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase.functions.invoke('active-learning', {
            body: {
              action: 'explain',
              contentId,
              contentType: 'grammar_explanation',
              level,
              supportLanguage,
              forceRefresh,
            },
          });

          if (!error && data?.explanation) {
            return {
              title: data.title || `Grammar: ${contentId}`,
              explanation: data.explanation,
              structure: data.structure || '',
              examples: data.examples || [],
              commonMistakes: data.commonMistakes || '',
              studyTip: data.studyTip || 'Master this pattern in your daily review.',
              _source: data._source || 'gemini_ai',
              _cacheKey: data._cacheKey,
              _usageCount: data._usageCount,
            };
          }
        } catch (e) {
          console.warn('AIGateway: Edge Function unavailable, using curriculum fallback:', e);
        }
      }

      // 2. Local Deterministic Curriculum Fallback
      return this.getLocalCurriculumExplanation(contentId, level);
    })();

    this.inFlightExplanations.set(dedupKey, promise);
    try {
      return await promise;
    } finally {
      this.inFlightExplanations.delete(dedupKey);
    }
  }

  /**
   * Get batch practice questions from reusable Question Bank Pool or Gemini Batch
   */
  public static async getPracticeQuestions(
    contentId: string,
    level: JLPTLevel = 'N5',
    skill: string = 'grammar',
    count: number = 3,
    supportLanguage: string = 'en'
  ): Promise<PracticeQuestionItem[]> {
    const dedupKey = `${contentId}-${level}-${skill}-${count}-${supportLanguage}`;
    if (this.inFlightPractice.has(dedupKey)) {
      return this.inFlightPractice.get(dedupKey)!;
    }

    const promise = (async () => {
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase.functions.invoke('active-learning', {
            body: {
              action: 'generate-practice',
              contentId,
              level,
              skill,
              count,
              supportLanguage,
            },
          });

          if (!error && Array.isArray(data?.questions) && data.questions.length > 0) {
            return data.questions.map((q: any) => ({
              id: q.id || `q-${Math.random()}`,
              prompt: q.prompt,
              options: q.options || [],
              correctIndex: q.correctIndex ?? 0,
              correctAnswer: q.correctAnswer || (q.options ? q.options[0] : ''),
              explanation: q.explanation || 'Correct usage matching JLPT grammar standard.',
              _source: q._source || 'ai_question_bank',
            }));
          }
        } catch (e) {
          console.warn('AIGateway: Practice generation fallback:', e);
        }
      }

      // Fallback: Local Curriculum Practice Generator
      return this.getLocalPracticeQuestions(contentId, level, count);
    })();

    this.inFlightPractice.set(dedupKey, promise);
    try {
      return await promise;
    } finally {
      this.inFlightPractice.delete(dedupKey);
    }
  }

  /**
   * Request multi-language translation from Cache or Gemini
   */
  public static async getTranslation(
    contentId: string,
    targetLanguage: string,
    sourceContent: any
  ): Promise<any> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'translation',
            contentId,
            targetLanguage,
            sourceContent,
          },
        });
        if (!error && data?.translated) {
          return data.translated;
        }
      } catch (e) {
        console.warn('AIGateway: Translation error:', e);
      }
    }
    return sourceContent;
  }

  /**
   * Fetch AI Cache Telemetry & Cost Statistics for Admin Panel
   */
  public static async getCacheTelemetry(): Promise<{
    stats: AICacheTelemetryStats;
    recentEntries: any[];
    costHistory: AICostMetric[];
  }> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: { action: 'cache-stats' },
        });

        if (!error && data?.stats) {
          return data;
        }
      } catch (e) {
        console.warn('AIGateway: Error loading cache telemetry:', e);
      }
    }

    // Baseline offline telemetry data
    return {
      stats: {
        totalCached: 86,
        totalQuestions: 240,
        cacheHits: 412,
        cacheMisses: 86,
        geminiCalls: 86,
        hitRatePercent: 82.7,
        tokensSaved: 350200,
        costSavedUsd: 0.0525,
      },
      recentEntries: [
        {
          id: 'mock-1',
          cache_key: '9a8f...3e21',
          content_type: 'grammar_explanation',
          jlpt_level: 'N3',
          source_content_id: 'g-n3-041',
          quality_status: 'published',
          usage_count: 28,
          last_used_at: new Date().toISOString(),
        },
        {
          id: 'mock-2',
          cache_key: 'b14c...5a90',
          content_type: 'grammar_explanation',
          jlpt_level: 'N5',
          source_content_id: 'g-n5-001',
          quality_status: 'published',
          usage_count: 54,
          last_used_at: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
      costHistory: [],
    };
  }

  /**
   * Seed core canonical curriculum items into the cache
   */
  public static async preSeedCoreCurriculum(): Promise<{ seededCount: number }> {
    if (!isSupabaseConfigured()) {
      return { seededCount: 0 };
    }

    const itemsToSeed = [
      // N5 Grammar
      {
        id: 'g-n5-001',
        level: 'N5',
        type: 'grammar_explanation',
        data: {
          title: 'Grammar Guide: 〜は〜です (A is B)',
          explanation: 'The fundamental sentence pattern in Japanese. 「は」 marks the topic of the sentence, and 「です」 is the polite copula indicating identity or state of being.',
          structure: '[Noun A] は [Noun B / Adjective] です',
          examples: [
            { jp: '私は学生です。', reading: 'わたしは がくせいです。', meaning: 'I am a student.' },
            { jp: 'これは本です。', reading: 'これは ほんです。', meaning: 'This is a book.' }
          ],
          commonMistakes: 'Writing 「わ」 instead of the topic particle 「は」 (pronounced "wa").',
          studyTip: 'Master this pattern first. It forms the backbone of 80% of introductory Japanese sentences.'
        }
      },
      {
        id: 'g-n5-002',
        level: 'N5',
        type: 'grammar_explanation',
        data: {
          title: 'Grammar Guide: 〜てください (Please do)',
          explanation: 'Used to make polite requests. Formed by attaching 「ください」 to the Te-form of any verb.',
          structure: 'Verb [て-form] + ください',
          examples: [
            { jp: 'ここに名前を書いてください。', reading: 'ここになまえを かいてください。', meaning: 'Please write your name here.' },
            { jp: '日本語で話してください。', reading: 'にほんごで はなしてください。', meaning: 'Please speak in Japanese.' }
          ],
          commonMistakes: 'Using with plain dictionary form instead of te-form.',
          studyTip: 'Essential for daily life in Japan (stores, train stations, offices).'
        }
      },
      // N4 Grammar
      {
        id: 'g-n4-001',
        level: 'N4',
        type: 'grammar_explanation',
        data: {
          title: 'Grammar Guide: 〜てはいけない (Must not do)',
          explanation: 'Expresses strong prohibition or rules. Formed by verb te-form + は + いけない / いけません.',
          structure: 'Verb [て-form] + は + いけません',
          examples: [
            { jp: 'ここで写真を撮ってはいけません。', reading: 'ここでしゃしんを とってはいけません。', meaning: 'You must not take photos here.' },
            { jp: '教室で走ってはいけない。', reading: 'きょうしつで はしってはいけない。', meaning: 'You must not run in the classroom.' }
          ],
          commonMistakes: 'Confusing with 〜なくてもいい (need not do).',
          studyTip: 'Often seen on warning signs and instructional posters in Japan.'
        }
      },
      // N3 Grammar
      {
        id: 'g-n3-041',
        level: 'N3',
        type: 'grammar_explanation',
        data: {
          title: 'Grammar Guide: 〜わけではない (It does not mean that...)',
          explanation: 'Used to provide a partial denial. It clarifies that while a certain assumption might seem logical, it is not entirely true.',
          structure: 'Verb / Adj [Plain form] + わけではない',
          examples: [
            { jp: '嫌いなわけではないが、辛いものが苦手です。', reading: 'きらいなわけではないが、からいものが にがてです。', meaning: 'It does not mean I dislike it, but I am not good with spicy food.' },
            { jp: '時間がないわけではないが、今日は休みたい。', reading: 'じかんがないわけではないが、きょうは やすみたい。', meaning: 'It does not mean I have no time, but I want to rest today.' }
          ],
          commonMistakes: 'Confusing with 〜わけがない (absolute impossibility: "there is no way that...").',
          studyTip: 'High-frequency pattern in JLPT N3 reading comprehension passages.'
        }
      }
    ];

    let seededCount = 0;
    for (const item of itemsToSeed) {
      const cacheKey = await this.generateClientKey(item.type, item.level, item.id, 'en');
      const { error } = await supabase.from('ai_content_cache').upsert(
        {
          cache_key: cacheKey,
          content_type: item.type,
          jlpt_level: item.level,
          source_content_id: item.id,
          difficulty: 'intermediate',
          support_language: 'en',
          prompt_version: 'v2',
          model: 'gemini-3.8-flash',
          response_json: item.data,
          quality_status: 'published',
          usage_count: 5,
        },
        { onConflict: 'cache_key' }
      );
      if (!error) seededCount++;
    }

    return { seededCount };
  }

  // =========================================================================
  // LOCAL DETERMINISTIC CURRICULUM FALLBACKS (Zero-Latency, Always Available)
  // =========================================================================
  private static getLocalCurriculumExplanation(contentId: string, level: JLPTLevel): ExplanationResponse {
    // 1. Check Canonical Grammar
    const grammar = CANONICAL_GRAMMAR.find((g) => g.id === contentId || g.pattern.includes(contentId));
    if (grammar) {
      return {
        title: `Grammar Guide: ${grammar.pattern}`,
        explanation: grammar.explanation,
        structure: grammar.structure,
        examples: grammar.examples.map((ex) => ({
          jp: ex.jp,
          reading: ex.reading,
          meaning: ex.en,
        })),
        commonMistakes: 'Pay careful attention to verb conjugations preceding this pattern.',
        studyTip: 'Review daily for 3 days to cement pattern recognition.',
        _source: 'deterministic_fallback',
      };
    }

    // 2. Check Confusion Pairs
    const conf = CONFUSION_PAIRS_DATA.find((c) => c.id === contentId);
    if (conf) {
      return {
        title: `Confusion Contrast: ${conf.title}`,
        explanation: conf.differenceExplanation,
        structure: conf.contrastRule,
        examples: conf.examplesA.map((ex) => ({
          jp: ex.jp,
          reading: ex.reading,
          meaning: ex.en,
        })),
        commonMistakes: `Mistaking ${conf.conceptA} for ${conf.conceptB}.`,
        studyTip: conf.contrastRule,
        _source: 'deterministic_fallback',
      };
    }

    // 3. Check Kanji
    const kanji = KANJI_DATA.find((k) => k.id === contentId || k.kanji === contentId);
    if (kanji) {
      return {
        title: `Kanji Guide: ${kanji.kanji} (${kanji.meaning})`,
        explanation: `JLPT ${level} Kanji meaning "${kanji.meaning}". Onyomi: ${kanji.onyomi.join(', ')} | Kunyomi: ${kanji.kunyomi.join(', ')}.`,
        structure: `Radicals: ${kanji.radicals?.join(', ') || 'N/A'} • Strokes: ${kanji.strokeCount}`,
        examples: [
          {
            jp: `${kanji.kanji} (${kanji.kunyomi[0] || kanji.onyomi[0] || ''})`,
            reading: kanji.kunyomi[0] || kanji.onyomi[0] || '',
            meaning: kanji.meaning,
          },
        ],
        studyTip: 'Practice stroke order to internalize radical proportions.',
        _source: 'deterministic_fallback',
      };
    }

    // 4. Check Vocabulary
    const vocab = VOCABULARY_DATA.find((v) => v.id === contentId || v.word === contentId);
    if (vocab) {
      return {
        title: `Vocabulary Tip: ${vocab.word} (${vocab.hiragana})`,
        explanation: `Meaning: ${vocab.meaning}. Part of speech: ${vocab.partOfSpeech || 'Noun'}. JLPT ${level} core word.`,
        structure: `${vocab.word} (${vocab.hiragana})`,
        examples: [
          {
            jp: vocab.exampleJp || `${vocab.word}を使います。`,
            reading: vocab.exampleReading || `${vocab.hiragana}をつかいます。`,
            meaning: vocab.exampleEn || `Using ${vocab.word}.`,
          },
        ],
        studyTip: 'Use in a sentence today to reinforce retention.',
        _source: 'deterministic_fallback',
      };
    }

    // Generic Fallback
    return {
      title: `Curriculum Guide for ${level}`,
      explanation: `Mastering this Japanese pattern requires understanding structural placement and conversational formality.`,
      examples: [
        {
          jp: '毎日日本語を勉強しています。',
          reading: 'まいにち にほんごを べんきょうしています。',
          meaning: 'I study Japanese every single day.',
        },
      ],
      studyTip: 'Spaced repetition transfers concepts into active memory.',
      _source: 'deterministic_fallback',
    };
  }

  private static getLocalPracticeQuestions(
    contentId: string,
    level: JLPTLevel,
    count: number
  ): PracticeQuestionItem[] {
    const grammar = CANONICAL_GRAMMAR.find((g) => g.id === contentId);
    if (grammar && grammar.examples && grammar.examples.length > 0) {
      return grammar.examples.slice(0, count).map((ex, idx) => ({
        id: `q-fallback-${idx}`,
        prompt: `Complete the sentence: ${ex.jp.replace(grammar.pattern, '【　？　】')}`,
        options: [grammar.pattern, '〜ないで', '〜ながら', '〜そうだ'],
        correctIndex: 0,
        correctAnswer: grammar.pattern,
        explanation: `The sentence requires 「${grammar.pattern}」 (${grammar.meaning}).`,
        _source: 'curriculum_fallback',
      }));
    }

    return [
      {
        id: 'q-fallback-gen',
        prompt: `Choose the correct form to complete the sentence for JLPT ${level}:`,
        options: ['適切な表現', '違和感のある表現', '間違い', '不完全'],
        correctIndex: 0,
        correctAnswer: '適切な表現',
        explanation: 'Select the natural Japanese grammatical structure for this context.',
        _source: 'curriculum_fallback',
      },
    ];
  }
}

import { JLPTLevel } from '../types';
import { AICacheItem, AICacheTelemetryStats, AICostMetric } from '../types/aiCache';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { CANONICAL_GRAMMAR } from '../data/canonicalGrammarData';
import { VOCABULARY_DATA } from '../data/vocabularySeed';
import { KANJI_DATA } from '../data/kanjiSeed';
import { CONFUSION_PAIRS_DATA } from '../data/confusionPairsData';
import { translateExampleSentence } from '../data/translations/multilingualEngine';
import { SupportedLanguage } from '../types/i18n';

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
      return this.getLocalCurriculumExplanation(contentId, level, supportLanguage);
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
      return this.getLocalPracticeQuestions(contentId, level, count, supportLanguage);
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
  private static getLocalCurriculumExplanation(
    contentId: string,
    level: JLPTLevel,
    supportLanguage: string = 'en'
  ): ExplanationResponse {
    const isMy = supportLanguage === 'my';
    const activeLang = supportLanguage as SupportedLanguage;

    // 1. Check Canonical Grammar
    const grammar = CANONICAL_GRAMMAR.find((g) => g.id === contentId || g.pattern === contentId || g.pattern.includes(contentId));
    if (grammar) {
      const expl = (grammar.explanationsByLang as any)?.[supportLanguage] || grammar.explanation;
      const meaning = (grammar.meaningsByLang as any)?.[supportLanguage] || grammar.meaning;
      return {
        title: isMy ? `သဒ္ဒါလမ်းညွှန်: ${grammar.pattern}` : `Grammar Guide: ${grammar.pattern}`,
        explanation: expl,
        structure: grammar.structure,
        examples: grammar.examples.map((ex) => ({
          jp: ex.jp,
          reading: ex.reading,
          meaning:
            (ex.translationsByLang as any)?.[supportLanguage] ||
            translateExampleSentence(ex.jp, ex.en, activeLang) ||
            ex.en,
        })),
        commonMistakes: isMy
          ? 'ဤသဒ္ဒါပုံစံရှေ့တွင် ကပ်လိုက်ရမည့် ကြိယာပုံစံ (verb conjugation) ပြောင်းလဲပုံကို အထူးဂရုပြုပါ။'
          : 'Pay careful attention to verb conjugations preceding this pattern.',
        studyTip: isMy
          ? 'မှတ်ဉာဏ်ထဲတွင် စွဲမြဲသွားစေရန် ၃ ရက်ဆက်တိုက် နေ့စဉ် ပြန်လှန်လေ့ကျင့်ပါ။'
          : 'Review daily for 3 days to cement pattern recognition.',
        _source: 'deterministic_fallback',
      };
    }

    // 2. Check Confusion Pairs
    const conf = CONFUSION_PAIRS_DATA.find((c) => c.id === contentId);
    if (conf) {
      return {
        title: isMy ? `ခွဲခြားလေ့လာခြင်း: ${conf.title}` : `Confusion Contrast: ${conf.title}`,
        explanation: conf.differenceExplanation,
        structure: conf.contrastRule,
        examples: conf.examplesA.map((ex) => ({
          jp: ex.jp,
          reading: ex.reading,
          meaning: translateExampleSentence(ex.jp, ex.en, activeLang),
        })),
        commonMistakes: `Mistaking ${conf.conceptA} for ${conf.conceptB}.`,
        studyTip: conf.contrastRule,
        _source: 'deterministic_fallback',
      };
    }

    // 3. Check Kanji
    const kanji = KANJI_DATA.find((k) => k.id === contentId || k.kanji === contentId);
    if (kanji) {
      const meaning = (kanji.meaningsByLang as any)?.[supportLanguage] || kanji.meaning;
      return {
        title: isMy ? `ကန်ဂျီလမ်းညွှန်: ${kanji.kanji} (${meaning})` : `Kanji Guide: ${kanji.kanji} (${meaning})`,
        explanation: isMy
          ? `JLPT ${level} အဆင့် ကန်ဂျီဖြစ်ပြီး အဓိပ္ပာယ်မှာ "${meaning}" ဖြစ်သည်။ Onyomi: ${kanji.onyomi.join(', ')} | Kunyomi: ${kanji.kunyomi.join(', ')}.`
          : `JLPT ${level} Kanji meaning "${kanji.meaning}". Onyomi: ${kanji.onyomi.join(', ')} | Kunyomi: ${kanji.kunyomi.join(', ')}.`,
        structure: `Radicals: ${kanji.radicals?.join(', ') || 'N/A'} • Strokes: ${kanji.strokeCount}`,
        examples: [
          {
            jp: `${kanji.kanji} (${kanji.kunyomi[0] || kanji.onyomi[0] || ''})`,
            reading: kanji.kunyomi[0] || kanji.onyomi[0] || '',
            meaning,
          },
        ],
        studyTip: isMy ? 'ရေးဆွဲပုံအစဉ် (stroke order) အတိုင်း လေ့ကျင့်ရေးသားပါ။' : 'Practice stroke order to internalize radical proportions.',
        _source: 'deterministic_fallback',
      };
    }

    // 4. Check Vocabulary
    const vocab = VOCABULARY_DATA.find((v) => v.id === contentId || v.word === contentId);
    if (vocab) {
      const meaning = (vocab.meaningsByLang as any)?.[supportLanguage] || vocab.meaning;
      return {
        title: isMy ? `ဝေါဟာရလမ်းညွှန်: ${vocab.word} (${vocab.hiragana})` : `Vocabulary Tip: ${vocab.word} (${vocab.hiragana})`,
        explanation: isMy
          ? `အဓိပ္ပာယ်: ${meaning}။ ဝါစင်္ဂ: ${vocab.partOfSpeech || 'နာမ်'}။ JLPT ${level} အဓိကဝေါဟာရ။`
          : `Meaning: ${vocab.meaning}. Part of speech: ${vocab.partOfSpeech || 'Noun'}. JLPT ${level} core word.`,
        structure: `${vocab.word} (${vocab.hiragana})`,
        examples: [
          {
            jp: vocab.exampleJp || `${vocab.word}を使います。`,
            reading: vocab.exampleReading || `${vocab.hiragana}をつかいます。`,
            meaning: translateExampleSentence(vocab.exampleJp || `${vocab.word}を使います。`, vocab.exampleEn || `Using ${vocab.word}.`, activeLang),
          },
        ],
        studyTip: isMy ? 'မှတ်ဉာဏ်ခိုင်မာစေရန် ယနေ့ ဝါကျဖွဲ့လေ့ကျင့်ကြည့်ပါ။' : 'Use in a sentence today to reinforce retention.',
        _source: 'deterministic_fallback',
      };
    }

    // Generic Fallback
    return {
      title: isMy ? `JLPT ${level} သင်ရိုးညွှန်းတမ်း လမ်းညွှန်` : `Curriculum Guide for ${level}`,
      explanation: isMy
        ? 'ဤဂျပန်ဘာသာ သဒ္ဒါပုံစံကို တတ်ကျွမ်းရန် ဝါကျတည်ဆောက်ပုံနှင့် အခြေအနေအလိုက် ယဉ်ကျေးမှုအဆင့်အတန်းကို နားလည်ရန် လိုအပ်ပါသည်။'
        : `Mastering this Japanese pattern requires understanding structural placement and conversational formality.`,
      examples: [
        {
          jp: '毎日日本語を勉強しています。',
          reading: 'まいにち にほんごを べんきょうしています。',
          meaning: isMy ? 'နေ့တိုင်း ဂျပန်စာ လေ့လာနေပါသည်။' : 'I study Japanese every single day.',
        },
      ],
      studyTip: isMy
        ? 'Spaced Repetition စနစ်ဖြင့် ပြန်လှန်လေ့ကျင့်ခြင်းသည် မှတ်ဉာဏ်ကို ရေရှည်ခိုင်မာစေသည်။'
        : 'Spaced repetition transfers concepts into active memory.',
      _source: 'deterministic_fallback',
    };
  }

  private static getLocalPracticeQuestions(
    contentId: string,
    level: JLPTLevel,
    count: number,
    supportLanguage: string = 'en'
  ): PracticeQuestionItem[] {
    const isMy = supportLanguage === 'my';
    const grammar = CANONICAL_GRAMMAR.find((g) => g.id === contentId || g.pattern === contentId || g.pattern.includes(contentId));
    if (grammar && grammar.examples && grammar.examples.length > 0) {
      const gMeaning = (grammar.meaningsByLang as any)?.[supportLanguage] || grammar.meaning;
      return grammar.examples.slice(0, count).map((ex, idx) => ({
        id: `q-fallback-${idx}`,
        prompt: isMy
          ? `ဝါကျကို ပြီးပြည့်စုံအောင် ဖြည့်ပါ: ${ex.jp.replace(grammar.pattern, '【　？　】')}`
          : `Complete the sentence: ${ex.jp.replace(grammar.pattern, '【　？　】')}`,
        options: [grammar.pattern, '〜ないで', '〜ながら', '〜そうだ'],
        correctIndex: 0,
        correctAnswer: grammar.pattern,
        explanation: isMy
          ? `ဤဝါကျတွင် 「${grammar.pattern}」 (${gMeaning}) လိုအပ်ပါသည်။`
          : `The sentence requires 「${grammar.pattern}」 (${grammar.meaning}).`,
        _source: 'curriculum_fallback',
      }));
    }

    return [
      {
        id: 'q-fallback-gen',
        prompt: isMy
          ? `JLPT ${level} အတွက် ဝါကျကို ပြီးပြည့်စုံစေမည့် မှန်ကန်သော ပုံစံကို ရွေးချယ်ပါ:`
          : `Choose the correct form to complete the sentence for JLPT ${level}:`,
        options: ['適切な表現', '違和感のある表現', '間違い', '不完全'],
        correctIndex: 0,
        correctAnswer: '適切な表現',
        explanation: isMy
          ? 'ဤအခြေအနေအတွက် သဘာဝကျသော ဂျပန်သဒ္ဒါတည်ဆောက်ပုံကို ရွေးချယ်ပါ။'
          : 'Select the natural Japanese grammatical structure for this context.',
        _source: 'curriculum_fallback',
      },
    ];
  }

  /**
   * Evaluate a Job Interview candidate answer using STAR Method and Corporate Japanese standards
   */
  public static async evaluateInterviewResponse(
    questionJp: string,
    questionEn: string,
    candidateResponse: string,
    modeId: string = 'basic_entry'
  ): Promise<any> {
    if (isSupabaseConfigured() && candidateResponse.trim().length >= 5) {
      try {
        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'interview-eval',
            questionJp,
            questionEn,
            candidateResponse,
            modeId,
          },
        });
        if (!error && data?.overallScore !== undefined) {
          return data;
        }
      } catch (e) {
        console.warn('AIGateway: Interview eval error, using local fallback:', e);
      }
    }

    // Local deterministic fallback
    const length = candidateResponse.trim().length;
    const hasNumbers = /\d+/.test(candidateResponse);
    const hasPoliteForm = /いたします|存じます|参ります|申しあげます/.test(candidateResponse);
    const hasCasualVerbs = /やりました|頑張りました|思うので/.test(candidateResponse);

    let baseScore = 75;
    if (length > 100) baseScore += 8;
    if (hasNumbers) baseScore += 7;
    if (hasPoliteForm) baseScore += 5;
    if (hasCasualVerbs) baseScore -= 10;
    baseScore = Math.max(50, Math.min(95, baseScore));

    const polished = candidateResponse
      .replace(/やりました/g, 'に従事いたしました')
      .replace(/頑張りました/g, '尽力いたしました')
      .replace(/思うので/g, 'と考えておりますので')
      .replace(/作りました/g, 'を構築いたしました');

    return {
      overallScore: baseScore,
      starScore: Math.min(100, baseScore + 2),
      keigoScore: hasPoliteForm ? 88 : 74,
      clarityScore: length > 80 ? 85 : 70,
      intentAlignmentScore: 80,
      strengths: [
        '質問に対して自身の経験と問題意識を明確に伝えている点',
        hasNumbers ? '定量的指標（数値）を用いて説得力を高めている点' : '前向きな挑戦意欲と熱意が感じられる点',
      ],
      areasToImprove: [
        hasCasualVerbs
          ? '「やりました」「頑張りました」等の口語を謙譲語・改まった表現へ格上げしましょう'
          : 'STAR法（状況・課題・行動・成果）の「自発的な工夫と行動」をさらに具体化しましょう',
        !hasNumbers ? '具体的な数字（期間、人数、達成率%など）を1点盛り込むと説得力が増します' : '結論ファースト（PREP法）の冒頭一言を強調しましょう',
      ],
      polishedJapaneseVersion: polished.startsWith('本日は') ? polished : `本日はお時間をいただき誠にありがとうございます。${polished}`,
      interviewerCommentary:
        '面接官の視点：熱意と誠実さが十分に伝わってまいります。さらに「自分が自発的に起こした行動」と「具体的な成果（数値）」を明確に対比させることで、より高い評価を得られます。',
    };
  }

  /**
   * Polish raw resume phrasing into high-impact Japanese corporate expressions
   */
  public static async coachResumePhrase(
    rawPhrase: string,
    targetRole: string = 'エンジニア / ビジネス職'
  ): Promise<{ original: string; polished: string; advice: string; impactScore: number }> {
    if (isSupabaseConfigured() && rawPhrase.trim().length >= 4) {
      try {
        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'resume-coach',
            rawPhrase,
            targetRole,
          },
        });
        if (!error && data?.polished) {
          return data;
        }
      } catch (e) {
        console.warn('AIGateway: Resume coach error, using local fallback:', e);
      }
    }

    // Local deterministic fallback
    let polished = rawPhrase
      .replace(/作りました/g, 'の設計および開発に従事いたしました')
      .replace(/やりました/g, 'を担当し、推進いたしました')
      .replace(/頑張りました/g, 'に尽力し、成果を創出いたしました')
      .replace(/話しました/g, 'との緊密な連携と合意形成を図りました');

    if (!polished.endsWith('。') && !polished.endsWith('いたしました')) {
      polished += 'に従事いたしました。';
    }

    return {
      original: rawPhrase,
      polished,
      advice:
        '能動的な動詞（「主導」「推進」「構築」「寄与」）と、具体的な役割の範囲を明示することで、採用担当者の目に留まりやすくなります。',
      impactScore: 86,
    };
  }

  /**
   * Review business email draft against 7-part Japanese standard and keigo rules
   */
  public static async reviewBusinessEmail(
    draft: string,
    category: string = 'business_inquiry',
    audience: string = 'external'
  ): Promise<{
    overallScore: number;
    politenessScore: number;
    structureScore: number;
    feedback: string;
    suggestedImprovements: string[];
    professionalRewrite: string;
  }> {
    if (isSupabaseConfigured() && draft.trim().length >= 10) {
      try {
        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'business-email-review',
            draft,
            category,
            audience,
          },
        });
        if (!error && data?.overallScore !== undefined) {
          return data;
        }
      } catch (e) {
        console.warn('AIGateway: Business email review error, using fallback:', e);
      }
    }

    // Local deterministic rule-based evaluation
    const hasSubject = /件名|【.*】/.test(draft);
    const hasGreeting = /お世話になっております|拝啓|平素は/.test(draft);
    const hasSignoff = /よろしくお願い申し上げます|よろしくお願いいたします/.test(draft);
    const hasSignature = /TEL|〒|Email|株式会社|署名/.test(draft);
    const hasCushion = /恐縮ですが|恐れ入りますが|幸いに存じます|ご教示/.test(draft);

    let score = 70;
    if (hasSubject) score += 6;
    if (hasGreeting) score += 6;
    if (hasSignoff) score += 6;
    if (hasSignature) score += 6;
    if (hasCushion) score += 6;

    const improvements: string[] = [];
    if (!hasSubject) improvements.push('件名に【用件】と会社名・氏名を明記すると相手が優先度を判断しやすくなります。');
    if (!hasCushion) improvements.push('「お忙しいところ恐縮ですが」「幸甚に存じます」などのクッション言葉を添えましょう。');
    if (!hasSignature) improvements.push('メール末尾に会社名・部署名・氏名・連絡先を記載した正式な署名ブロックを追加しましょう。');
    if (improvements.length === 0) {
      improvements.push('全体の改行と箇条書きを活用し、スマートフォンでの視認性をさらに向上させましょう。');
    }

    return {
      overallScore: Math.min(95, score),
      politenessScore: hasCushion ? 88 : 76,
      structureScore: hasSubject && hasGreeting && hasSignoff ? 90 : 75,
      feedback:
        '日本のビジネスメールの標準的なマナーが適切に反映されています。クッション言葉の活用と箇条書きによる視認性の確保を意識することで、よりスマートで信頼感のあるメールになります。',
      suggestedImprovements: improvements,
      professionalRewrite: draft.includes('平素は')
        ? draft
        : `いつも大変お世話になっております。\n\n${draft}\n\nお忙しいところ誠に恐れ入りますが、何卒よろしくお願い申し上げます。`,
    };
  }
}


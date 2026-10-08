import { JLPTLevel, UserSRSProgress } from '../types';
import {
  ActiveDailyPlan,
  ActiveLearningConfig,
  ConfusionPair,
  LearnerActiveProfile,
  LearningErrorRecord,
  LearningMasteryRecord,
  LearningPlanItem,
} from '../types/activeLearning';
import { ActiveLearningEngine } from './activeLearningEngine';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { VOCABULARY_DATA } from '../data/vocabularySeed';
import { KANJI_DATA } from '../data/kanjiSeed';
import { CANONICAL_GRAMMAR } from '../data/canonicalGrammarData';
import { READING_DATA } from '../data/readingData';
import { LISTENING_DATA } from '../data/listeningData';
import { CONFUSION_PAIRS_DATA } from '../data/confusionPairsData';
import { AIGatewayService } from './aiGatewayService';

const STORAGE_KEYS = {
  DAILY_PLAN: 'jlpt_active_daily_plan',
  LEARNER_PROFILE: 'jlpt_active_learner_profile',
  LEARNING_MASTERY: 'jlpt_active_learning_mastery',
  LEARNING_ERRORS: 'jlpt_active_learning_errors',
  CONFIG: 'jlpt_active_learning_config',
};

const DEFAULT_CONFIG: ActiveLearningConfig = {
  aiEnabled: true,
  geminiModel: 'gemini-2.5-flash',
  dailyRequestLimitFree: 10,
  dailyRequestLimitPro: 50,
  dailyRequestLimitPremium: 200,
  fallbackEnabled: true,
  cacheTtlHours: 12,
};

export class ActiveLearningService {
  /**
   * Load active learner profile or generate standard default
   */
  public static loadLearnerProfile(userId: string = 'user-default-1', level: JLPTLevel = 'N5'): LearnerActiveProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LEARNER_PROFILE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading active learner profile', e);
    }

    const defaultProfile: LearnerActiveProfile = {
      userId,
      currentLevel: level,
      targetLevel: level,
      studyDaysPerWeek: 5,
      minutesPerDay: 60,
      preferredStudyTime: 'evening',
      learningGoal: 'pass_jlpt',
      businessGoal: 'none',
      skillScores: {
        vocabulary: 80,
        kanji: 75,
        grammar: 65,
        reading: 60,
        listening: 50,
        speaking: 60,
        writing: 55,
      },
      completedContent: [],
      masteredContent: [],
      weakContent: [],
      recentErrors: [],
      recentScores: [],
      retentionScores: {},
      lastStudyDate: new Date().toISOString().split('T')[0],
      streak: 4,
      learningConsistency: 0.88,
    };

    this.saveLearnerProfile(defaultProfile);
    return defaultProfile;
  }

  public static saveLearnerProfile(profile: LearnerActiveProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LEARNER_PROFILE, JSON.stringify(profile));
      if (isSupabaseConfigured()) {
        supabase
          .from('learner_profiles')
          .upsert({
            user_id: profile.userId,
            current_level: profile.currentLevel,
            target_level: profile.targetLevel,
            target_date: profile.targetDate || null,
            study_days_per_week: profile.studyDaysPerWeek,
            minutes_per_day: profile.minutesPerDay,
            preferred_study_time: profile.preferredStudyTime,
            learning_goal: profile.learningGoal,
            exam_date: profile.examDate || null,
            business_goal: profile.businessGoal || 'none',
            skill_scores: profile.skillScores,
            completed_content: profile.completedContent,
            mastered_content: profile.masteredContent,
            weak_content: profile.weakContent,
            recent_errors: profile.recentErrors,
            recent_scores: profile.recentScores,
            retention_scores: profile.retentionScores,
            last_study_date: profile.lastStudyDate,
            streak: profile.streak,
            learning_consistency: profile.learningConsistency,
          })
          .then(({ error }) => {
            if (error) console.warn('Supabase sync profile notice:', error.message);
          });
      }
    } catch (e) {
      console.error('Error saving active learner profile', e);
    }
  }

  /**
   * Load all tracked mastery records
   */
  public static loadMasteryRecords(): LearningMasteryRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LEARNING_MASTERY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading mastery records', e);
    }
    return [];
  }

  public static updateMastery(
    userId: string,
    contentId: string,
    contentType: 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing',
    isCorrect: boolean
  ): void {
    const existing = this.loadMasteryRecords();
    const index = existing.findIndex((m) => m.contentId === contentId);
    let record: LearningMasteryRecord;

    if (index >= 0) {
      record = existing[index];
      record.attempts += 1;
      if (isCorrect) {
        record.correctAttempts += 1;
        record.masteryScore = Math.min(5, (record.masteryScore + 1) as any) as any;
        record.confidence = Math.min(1.0, +(record.confidence + 0.15).toFixed(2));
      } else {
        record.masteryScore = Math.max(1, (record.masteryScore - 1) as any) as any;
        record.confidence = Math.max(0.1, +(record.confidence - 0.2).toFixed(2));
      }
      record.lastReviewedAt = new Date().toISOString();
      existing[index] = record;
    } else {
      record = {
        userId,
        contentId,
        contentType,
        masteryScore: isCorrect ? 2 : 1,
        confidence: isCorrect ? 0.6 : 0.3,
        attempts: 1,
        correctAttempts: isCorrect ? 1 : 0,
        lastReviewedAt: new Date().toISOString(),
      };
      existing.push(record);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.LEARNING_MASTERY, JSON.stringify(existing));
      if (isSupabaseConfigured()) {
        supabase
          .from('learning_mastery')
          .upsert({
            user_id: userId,
            content_id: contentId,
            content_type: contentType,
            mastery_score: record.masteryScore,
            confidence: record.confidence,
            attempts: record.attempts,
            correct_attempts: record.correctAttempts,
            last_reviewed_at: record.lastReviewedAt,
          })
          .then(({ error }) => {
            if (error) console.warn('Supabase sync mastery error:', error.message);
          });
      }
    } catch (e) {
      console.error('Error saving mastery', e);
    }
  }

  /**
   * Record a fine-grained learning mistake
   */
  public static recordError(error: Omit<LearningErrorRecord, 'id' | 'createdAt'>): void {
    const newRecord: LearningErrorRecord = {
      ...error,
      id: `err-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LEARNING_ERRORS);
      const existing: LearningErrorRecord[] = stored ? JSON.parse(stored) : [];
      const updated = [newRecord, ...existing].slice(0, 100);
      localStorage.setItem(STORAGE_KEYS.LEARNING_ERRORS, JSON.stringify(updated));

      // Also update learner profile recent errors
      const profile = this.loadLearnerProfile(error.userId);
      profile.recentErrors = [newRecord, ...(profile.recentErrors || [])].slice(0, 20);
      this.saveLearnerProfile(profile);

      if (isSupabaseConfigured()) {
        supabase.from('learning_errors').insert({
          user_id: error.userId,
          content_id: error.contentId,
          content_type: error.contentType,
          question_id: error.questionId || null,
          error_type: error.errorType,
          incorrect_answer: error.incorrectAnswer,
          correct_answer: error.correctAnswer,
          explanation: error.explanation || null,
        }).then(({ error: syncErr }) => {
          if (syncErr) console.warn('Supabase sync error log:', syncErr.message);
        });
      }
    } catch (e) {
      console.error('Error recording learning error', e);
    }
  }

  /**
   * Get Active Learning Configuration
   */
  public static getConfig(): ActiveLearningConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (stored) return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    } catch (e) {
      console.error('Error loading active learning config', e);
    }
    return DEFAULT_CONFIG;
  }

  public static saveConfig(config: ActiveLearningConfig): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Error saving active learning config', e);
    }
  }

  /**
   * Fetch today's Active Daily Plan (with Gemini AI & seamless deterministic fallback)
   */
  public static async getDailyPlan(
    profile: LearnerActiveProfile,
    srsProgress: UserSRSProgress[] = [],
    forceRefresh: boolean = false
  ): Promise<ActiveDailyPlan> {
    const today = new Date().toISOString().split('T')[0];

    // 1. Check local cache first if not forceRefresh
    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(STORAGE_KEYS.DAILY_PLAN);
        if (cached) {
          const parsed: ActiveDailyPlan = JSON.parse(cached);
          if (parsed.planDate === today && parsed.userId === profile.userId) {
            // Re-hydrate items to ensure fresh localized data from CANONICAL_GRAMMAR
            parsed.items = this.hydratePlanItems(parsed.items, profile.currentLevel);
            return parsed;
          }
        }
      } catch (e) {
        console.error('Error reading plan cache', e);
      }
    }

    const config = this.getConfig();

    // 2. If Supabase and AI are configured, try calling the Supabase Edge Function
    if (config.aiEnabled && isSupabaseConfigured()) {
      try {
        // Collect candidate curriculum items for this level
        const candidates = [
          ...CANONICAL_GRAMMAR.filter((g) => g.level === profile.currentLevel).map((g) => ({
            id: g.id,
            type: 'grammar',
            title: g.pattern,
            level: g.level,
          })),
          ...VOCABULARY_DATA.filter((v) => v.level === profile.currentLevel).map((v) => ({
            id: v.id,
            type: 'vocab',
            title: v.word,
            level: v.level,
          })),
          ...KANJI_DATA.filter((k) => k.level === profile.currentLevel).map((k) => ({
            id: k.id,
            type: 'kanji',
            title: k.kanji,
            level: k.level,
          })),
          ...LISTENING_DATA.filter((l) => l.level === profile.currentLevel).map((l) => ({
            id: l.id,
            type: 'listening',
            title: l.title,
            level: l.level,
          })),
          ...READING_DATA.filter((r) => r.level === profile.currentLevel).map((r) => ({
            id: r.id,
            type: 'reading',
            title: r.title,
            level: r.level,
          })),
        ];

        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'daily-plan',
            date: today,
            forceRefresh,
            level: profile.currentLevel,
            learnerProfile: profile,
            candidates,
          },
        });

        if (!error && data?.plan?.items?.length > 0) {
          const geminiPlan: ActiveDailyPlan = {
            ...data.plan,
            source: 'gemini_ai',
            items: this.hydratePlanItems(data.plan.items, profile.currentLevel),
          };
          localStorage.setItem(STORAGE_KEYS.DAILY_PLAN, JSON.stringify(geminiPlan));
          return geminiPlan;
        }
      } catch (e) {
        console.warn('Edge function invoke fallback triggering:', e);
      }
    }

    // 3. Deterministic Active Learning Engine Fallback
    const fallbackPlan = ActiveLearningEngine.generateDailyPlan(
      profile,
      srsProgress,
      this.loadMasteryRecords()
    );

    localStorage.setItem(STORAGE_KEYS.DAILY_PLAN, JSON.stringify(fallbackPlan));
    return fallbackPlan;
  }

  /**
   * Mark a plan item as completed and award XP
   */
  public static markItemCompleted(planId: string, itemId: string, minutes: number = 10): ActiveDailyPlan | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DAILY_PLAN);
      if (!stored) return null;
      const plan: ActiveDailyPlan = JSON.parse(stored);

      const item = plan.items.find((i) => i.id === itemId);
      if (item && item.status !== 'completed') {
        item.status = 'completed';
        plan.completedMinutes = Math.min(plan.estimatedMinutes, plan.completedMinutes + (item.minutes || minutes));
        plan.isCompleted = plan.items.every((i) => i.status === 'completed' || i.status === 'skipped');
        localStorage.setItem(STORAGE_KEYS.DAILY_PLAN, JSON.stringify(plan));

        // Sync to Supabase if configured
        if (isSupabaseConfigured() && item.planId) {
          supabase
            .from('learning_plan_items')
            .update({ status: 'completed' })
            .eq('id', item.id)
            .then(() => {});
        }
        return plan;
      }
    } catch (e) {
      console.error('Error updating plan item', e);
    }
    return null;
  }

  /**
   * Hydrate raw item IDs with preloaded curriculum data
   */
  private static hydratePlanItems(items: LearningPlanItem[], level: JLPTLevel): LearningPlanItem[] {
    return items.map((item) => {
      let contentData = null;
      let title = item.title || item.contentId;
      let subtitle = item.subtitle;

      if (item.contentType === 'grammar' || item.skill === 'grammar') {
        const cleanPattern = (item.title || '').replace(/^Grammar:\s*/, '').replace(/^Grammar Focus:\s*/, '').trim();
        const g = CANONICAL_GRAMMAR.find((x) => x.id === item.contentId || x.pattern === item.contentId || x.pattern === cleanPattern);
        if (g) {
          contentData = g;
          title = `Grammar: ${g.pattern}`;
          subtitle = g.meaning;
        }
      } else if (item.contentType === 'vocab' || item.skill === 'vocabulary') {
        const cleanWord = (item.title || '').replace(/^Vocab:\s*/, '').replace(/^Vocab Study:\s*/, '').trim();
        const v = VOCABULARY_DATA.find((x) => x.id === item.contentId || x.word === item.contentId || x.word === cleanWord);
        if (v) {
          contentData = v;
          title = `Vocab: ${v.word}`;
          subtitle = `${v.hiragana} (${v.meaning})`;
        }
      } else if (item.contentType === 'kanji' || item.skill === 'kanji') {
        const cleanKanji = (item.title || '').replace(/^Kanji:\s*/, '').replace(/^Kanji Study:\s*/, '').trim();
        const k = KANJI_DATA.find((x) => x.id === item.contentId || x.kanji === item.contentId || x.kanji === cleanKanji);
        if (k) {
          contentData = k;
          title = `Kanji: ${k.kanji}`;
          subtitle = `${k.meaning} • On: ${k.onyomi.join(', ')}`;
        }
      } else if (item.contentType === 'listening' || item.skill === 'listening') {
        const l = LISTENING_DATA.find((x) => x.id === item.contentId);
        if (l) {
          contentData = l;
          title = `Listening: ${l.title}`;
          subtitle = l.situation;
        }
      } else if (item.contentType === 'reading' || item.skill === 'reading') {
        const r = READING_DATA.find((x) => x.id === item.contentId);
        if (r) {
          contentData = r;
          title = `Reading: ${r.title}`;
          subtitle = r.titleEn;
        }
      } else if (item.contentType === 'confusion') {
        const conf = CONFUSION_PAIRS_DATA.find((x) => x.id === item.contentId);
        if (conf) {
          contentData = conf;
          title = `Confusion Review: ${conf.title}`;
          subtitle = 'Contrast & Practice';
        }
      }

      return {
        ...item,
        title,
        subtitle,
        contentData,
      };
    });
  }

  /**
   * Request an adaptive explanation from Cache-First AI Gateway
   */
  public static async getAdaptiveExplanation(
    contentId: string,
    level: JLPTLevel,
    supportLanguage: string = 'en'
  ): Promise<{
    title: string;
    explanation: string;
    structure?: string;
    examples?: { jp: string; reading: string; meaning: string }[];
    studyTip: string;
    _source?: string;
    _cacheKey?: string;
  }> {
    return AIGatewayService.getAdaptiveExplanation(contentId, level, supportLanguage);
  }

  /**
   * Evaluate learner's speaking response
   */
  public static async evaluateSpeaking(
    userInput: string,
    scenario: string,
    level: JLPTLevel
  ): Promise<{
    overallScore: number;
    grammarScore: number;
    vocabScore: number;
    appropriatenessScore: number;
    fluencyScore: number;
    feedback: string;
    betterAlternative: string;
    reading: string;
    explanation: string;
  }> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'speaking-session',
            userInput,
            scenario,
            level,
          },
        });
        if (!error && data?.overallScore !== undefined) {
          return data;
        }
      } catch (e) {
        console.warn('Fallback for speaking evaluation:', e);
      }
    }

    // Deterministic fallback evaluation based on linguistic heuristics
    const cleanInput = userInput.trim().replace(/[。！!？?]$/, '');
    const len = cleanInput.length;
    const hasPoliteEnding =
      cleanInput.endsWith('です') ||
      cleanInput.endsWith('ます') ||
      cleanInput.endsWith('でした') ||
      cleanInput.endsWith('ました') ||
      cleanInput.endsWith('ございます') ||
      cleanInput.endsWith('いたします');
    const grammarScore = hasPoliteEnding ? 88 : 74;
    const vocabScore = len > 10 ? 86 : 82;
    const appropriatenessScore = hasPoliteEnding ? 90 : 70;
    const fluencyScore = Math.min(95, 75 + Math.min(20, len * 2));
    const overallScore = Math.round((grammarScore + vocabScore + appropriatenessScore + fluencyScore) / 4);

    return {
      overallScore,
      grammarScore,
      vocabScore,
      appropriatenessScore,
      fluencyScore,
      feedback: hasPoliteEnding
        ? 'Well structured with appropriate polite desu/masu register! Good conversational response.'
        : 'Good attempt! Remember to use polite forms (〜です / 〜ます) in standard conversational situations.',
      betterAlternative: userInput.endsWith('。') ? userInput : `${userInput}。`,
      reading: '',
      explanation: 'Native speakers value smooth sentence endings and clear particles (は, が, を).',
    };
  }
}

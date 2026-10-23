import { READING_DATA } from '../../data/readingData';
import { READING_BLUEPRINT_MANIFEST, BlueprintEntry } from '../../data/reading/readingBlueprintManifest';
import { ReadingValidator } from './readingValidator';
import { ReadingLibraryI18n } from '../../data/translations/readingLibraryI18n';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { UniversityReadingExercise } from '../../types/readingCurriculum';
import { JLPTLevel } from '../../types';
import { SupportedLanguage } from '../../types/i18n';

export type SyncJobStatus =
  | 'pending'
  | 'processing'
  | 'validated'
  | 'persisted'
  | 'retryable_failed'
  | 'validation_failed'
  | 'permanent_failed';

export interface ExerciseSyncJob {
  blueprintId: string;
  exerciseId: string;
  level: JLPTLevel;
  topic: string;
  status: SyncJobStatus;
  attempts: number;
  lastAttemptAt?: string;
  errorMessage?: string;
  validationReport?: ReturnType<typeof ReadingValidator.validateExercise>;
  persistedTables: {
    ai_content_cache: boolean;
    ai_question_bank: boolean;
    reading_exercises: boolean;
  };
  supportedLanguagesSynced: SupportedLanguage[];
}

export interface SyncProgressReport {
  totalJobs: number;
  completed: number;
  inProgress: number;
  failed: number;
  byLevel: Record<JLPTLevel, { total: number; completed: number; failed: number }>;
  persistedStats: {
    aiContentCacheEntries: number;
    aiQuestionBankEntries: number;
    readingExercisesEntries: number;
  };
  isComplete: boolean;
  lastRunTimestamp: string;
}

const STORAGE_SYNC_STATE_KEY = 'jlpt_reading_supabase_sync_state_v1';

export class ReadingSupabaseSyncService {
  private static jobs: Map<string, ExerciseSyncJob> = new Map();
  private static isRunning = false;
  private static abortRequested = false;

  /**
   * Initializes or restores sync job queue from storage.
   */
  public static initializeJobs(): void {
    if (this.jobs.size > 0) return;

    // Check if previous state exists in localStorage
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_SYNC_STATE_KEY);
        if (saved) {
          const parsed: ExerciseSyncJob[] = JSON.parse(saved);
          for (const j of parsed) {
            this.jobs.set(j.exerciseId, j);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to load previous sync jobs state:', e);
    }

    // Populate missing jobs from manifest
    for (const bp of READING_BLUEPRINT_MANIFEST) {
      if (!this.jobs.has(bp.exerciseId)) {
        this.jobs.set(bp.exerciseId, {
          blueprintId: bp.blueprintId,
          exerciseId: bp.exerciseId,
          level: bp.level,
          topic: bp.topicId,
          status: 'pending',
          attempts: 0,
          persistedTables: {
            ai_content_cache: false,
            ai_question_bank: false,
            reading_exercises: false,
          },
          supportedLanguagesSynced: [],
        });
      }
    }
  }

  /**
   * Saves current job state to storage for resumability.
   */
  private static saveState(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        const arr = Array.from(this.jobs.values());
        localStorage.setItem(STORAGE_SYNC_STATE_KEY, JSON.stringify(arr));
      }
    } catch {}
  }

  /**
   * Generates a deterministic hash for deduplicating question items.
   */
  private static generateQuestionHash(exerciseId: string, qIdx: number, prompt: string): string {
    const raw = `${exerciseId}::q${qIdx}::${prompt.trim()}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    return `q_hash_${exerciseId}_${qIdx}_${Math.abs(hash).toString(36)}`;
  }

  /**
   * Runs the resumable batch synchronization process with concurrency limit and retries.
   */
  public static async runBatchSync(options?: {
    batchSize?: number;
    forceRetryFailed?: boolean;
    onProgress?: (report: SyncProgressReport) => void;
  }): Promise<SyncProgressReport> {
    if (this.isRunning) {
      return this.getProgressReport();
    }

    this.initializeJobs();
    this.isRunning = true;
    this.abortRequested = false;

    const batchSize = options?.batchSize || 5;

    // Filter jobs needing execution
    let candidateJobs = Array.from(this.jobs.values()).filter((j) => {
      if (options?.forceRetryFailed && (j.status === 'retryable_failed' || j.status === 'validation_failed')) {
        j.status = 'pending';
        return true;
      }
      return j.status === 'pending' || j.status === 'retryable_failed';
    });

    try {
      for (let i = 0; i < candidateJobs.length; i += batchSize) {
        if (this.abortRequested) break;

        const currentBatch = candidateJobs.slice(i, i + batchSize);
        await Promise.all(
          currentBatch.map(async (job) => {
            await this.processSingleJob(job);
            this.saveState();
          })
        );

        if (options?.onProgress) {
          options.onProgress(this.getProgressReport());
        }

        // Bounded delay between batches to respect rate limits
        await new Promise((r) => setTimeout(r, 200));
      }
    } finally {
      this.isRunning = false;
      this.saveState();
    }

    return this.getProgressReport();
  }

  /**
   * Processes a single exercise: validates content, then writes to Supabase.
   */
  public static async processSingleJob(job: ExerciseSyncJob): Promise<boolean> {
    job.status = 'processing';
    job.attempts++;
    job.lastAttemptAt = new Date().toISOString();

    const exercise = READING_DATA.find((e) => e.id === job.exerciseId);
    if (!exercise) {
      job.status = 'permanent_failed';
      job.errorMessage = `Exercise ${job.exerciseId} not found in reading data.`;
      return false;
    }

    // 1. Content Validation Check
    const validation = ReadingValidator.validateExercise(exercise as unknown as UniversityReadingExercise);
    job.validationReport = validation;

    if (!validation.isValid) {
      job.status = 'validation_failed';
      job.errorMessage = `Validation failed: ${validation.errors.join('; ')}`;
      return false;
    }

    job.status = 'validated';

    // If Supabase is not configured, we mark validated and finish
    if (!isSupabaseConfigured()) {
      job.status = 'persisted';
      job.errorMessage = 'Supabase client offline; local validated cache ready.';
      return true;
    }

    // 2. Persist to Supabase with idempotent keys
    try {
      // Entity A: Primary Exercise in ai_content_cache
      const cacheKey = `reading_exercise_${exercise.id}_${exercise.contentVersion || 'v1'}`;
      const reviewStatus = exercise.reviewStatus || (job.level === 'N1' || job.level === 'N2' ? 'review_required' : 'published');

      const cachePayload: any = {
        cache_key: cacheKey,
        content_type: 'reading_curriculum_exercise',
        jlpt_level: exercise.level,
        topic_id: exercise.topic,
        source_content_id: exercise.id,
        difficulty: exercise.level,
        support_language: 'ja',
        model: 'university_curriculum_author_v1',
        response_json: exercise,
        quality_status: reviewStatus === 'review_required' ? 'pending' : 'published',
        usage_count: 1,
        last_used_at: new Date().toISOString(),
      };

      const { error: cacheErr } = await supabase
        .from('ai_content_cache')
        .upsert(cachePayload, { onConflict: 'cache_key' });

      if (cacheErr) {
        console.warn(`ai_content_cache sync warning for ${exercise.id}:`, cacheErr.message);
      } else {
        job.persistedTables.ai_content_cache = true;
      }

      // Entity B: Translations in ai_content_cache for English & Burmese
      const langsToSync: SupportedLanguage[] = ['en', 'my'];
      for (const lang of langsToSync) {
        const localized = ReadingLibraryI18n.getLocalizedExercise(exercise.id, lang);
        const transKey = `reading_translation_${exercise.id}_${lang}`;

        const transPayload: any = {
          cache_key: transKey,
          content_type: 'reading_translation',
          jlpt_level: exercise.level,
          topic_id: exercise.topic,
          source_content_id: exercise.id,
          difficulty: exercise.level,
          support_language: lang,
          model: 'bilingual_curriculum_v1',
          response_json: localized,
          quality_status: reviewStatus === 'review_required' ? 'pending' : 'published',
          usage_count: 1,
          last_used_at: new Date().toISOString(),
        };

        const { error: transErr } = await supabase
          .from('ai_content_cache')
          .upsert(transPayload, { onConflict: 'cache_key' });

        if (!transErr && !job.supportedLanguagesSynced.includes(lang)) {
          job.supportedLanguagesSynced.push(lang);
        }
      }

      // Entity C: Comprehension Questions in ai_question_bank
      if (exercise.questions && exercise.questions.length > 0) {
        for (let qIdx = 0; qIdx < exercise.questions.length; qIdx++) {
          const q = exercise.questions[qIdx];
          const qHash = this.generateQuestionHash(exercise.id, qIdx, q.questionJp);

          const qPayload: any = {
            cache_key: `q_${exercise.id}_${qIdx}`,
            question_hash: qHash,
            source_content_id: exercise.id,
            jlpt_level: exercise.level,
            skill: 'reading',
            question_type: 'reading_comprehension',
            difficulty: exercise.level,
            question_json: {
              prompt: q.questionJp,
              questionEn: q.questionEn,
              questionMy: q.questionMy,
              options: q.options,
              optionsMy: q.optionsMy,
            },
            answer_json: {
              correctIndex: q.correctIndex,
              correctAnswer: q.options[q.correctIndex],
              explanation: q.explanation,
              explanationMy: q.explanationMy,
            },
            explanation_json: {
              explanationEn: q.explanation,
              explanationMy: q.explanationMy,
            },
            support_language: 'ja',
            quality_status: reviewStatus === 'review_required' ? 'draft' : 'published',
          };

          const { error: qErr } = await supabase
            .from('ai_question_bank')
            .upsert(qPayload, { onConflict: 'question_hash' });

          if (!qErr) {
            job.persistedTables.ai_question_bank = true;
          }
        }
      }

      // Entity D: Attempt dedicated reading_exercises table (graceful fallback if pending migration)
      try {
        const { error: directErr } = await supabase.from('reading_exercises').upsert({
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
          review_status: reviewStatus,
          content_version: exercise.contentVersion || '1.0',
          source_type: exercise.sourceType || 'curated_university',
          reviewer_notes: exercise.reviewerNotes,
        });

        if (!directErr) {
          job.persistedTables.reading_exercises = true;
        }
      } catch {}

      job.status = 'persisted';
      job.errorMessage = undefined;
      return true;
    } catch (err: any) {
      job.status = job.attempts >= 3 ? 'permanent_failed' : 'retryable_failed';
      job.errorMessage = err.message || 'Network persistence error.';
      return false;
    }
  }

  /**
   * Request abort of the running batch sync.
   */
  public static cancelSync(): void {
    this.abortRequested = true;
  }

  /**
   * Retrieves overall synchronization metrics.
   */
  public static getProgressReport(): SyncProgressReport {
    this.initializeJobs();
    const all = Array.from(this.jobs.values());

    let completed = 0;
    let inProgress = 0;
    let failed = 0;

    let aiContentCacheCount = 0;
    let aiQuestionBankCount = 0;
    let readingExercisesCount = 0;

    const byLevel: Record<JLPTLevel, { total: number; completed: number; failed: number }> = {
      N5: { total: 0, completed: 0, failed: 0 },
      N4: { total: 0, completed: 0, failed: 0 },
      N3: { total: 0, completed: 0, failed: 0 },
      N2: { total: 0, completed: 0, failed: 0 },
      N1: { total: 0, completed: 0, failed: 0 },
    };

    for (const j of all) {
      byLevel[j.level].total++;

      if (j.status === 'persisted') {
        completed++;
        byLevel[j.level].completed++;
      } else if (j.status === 'processing') {
        inProgress++;
      } else if (j.status === 'validation_failed' || j.status === 'permanent_failed' || j.status === 'retryable_failed') {
        failed++;
        byLevel[j.level].failed++;
      }

      if (j.persistedTables.ai_content_cache) aiContentCacheCount++;
      if (j.persistedTables.ai_question_bank) aiQuestionBankCount++;
      if (j.persistedTables.reading_exercises) readingExercisesCount++;
    }

    return {
      totalJobs: all.length,
      completed,
      inProgress,
      failed,
      byLevel,
      persistedStats: {
        aiContentCacheEntries: aiContentCacheCount,
        aiQuestionBankEntries: aiQuestionBankCount,
        readingExercisesEntries: readingExercisesCount,
      },
      isComplete: completed === all.length,
      lastRunTimestamp: new Date().toISOString(),
    };
  }
}

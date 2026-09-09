import { supabase, isSupabaseConfigured } from './supabaseClient';
import { UserProfile, UserSRSProgress } from '../types';
import { MockTestAttempt } from '../types/practice';

export class SupabaseSyncService {
  /**
   * Syncs user profile to Supabase `profiles` table
   */
  public static async syncProfile(profile: UserProfile): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const payload = {
        id: profile.id,
        email: profile.email || null,
        name: profile.name,
        avatar: profile.avatar,
        target_level: profile.targetLevel,
        current_level: profile.currentLevel,
        daily_goal_minutes: profile.dailyGoalMinutes,
        daily_goal_vocab: profile.dailyGoalVocab,
        daily_goal_kanji: profile.dailyGoalKanji,
        daily_goal_grammar: profile.dailyGoalGrammar,
        daily_goal_reading: profile.dailyGoalReading,
        daily_goal_listening: profile.dailyGoalListening,
        native_language: profile.nativeLanguage,
        learning_goal: profile.learningGoal,
        streak_days: profile.streakDays,
        last_active_date: profile.lastActiveDate,
        xp: profile.xp,
        level: profile.level,
        is_premium: profile.isPremium,
        theme: profile.theme,
        font_size: profile.fontSize,
        show_furigana: profile.showFurigana,
        speech_speed: profile.speechSpeed,
        audio_auto_play: profile.audioAutoPlay,
        sound_effects: profile.soundEffects,
        notifications_enabled: profile.notificationsEnabled,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(payload);
      if (error) {
        console.warn('Supabase profile sync warning:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Failed to sync profile to Supabase:', err);
      return false;
    }
  }

  /**
   * Fetches user profile from Supabase
   */
  public static async fetchProfile(userId: string): Promise<Partial<UserProfile> | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error || !data) return null;

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        targetLevel: data.target_level,
        currentLevel: data.current_level,
        dailyGoalMinutes: data.daily_goal_minutes,
        dailyGoalVocab: data.daily_goal_vocab,
        dailyGoalKanji: data.daily_goal_kanji,
        dailyGoalGrammar: data.daily_goal_grammar,
        dailyGoalReading: data.daily_goal_reading,
        dailyGoalListening: data.daily_goal_listening,
        nativeLanguage: data.native_language,
        learningGoal: data.learning_goal,
        streakDays: data.streak_days,
        lastActiveDate: data.last_active_date,
        xp: data.xp,
        level: data.level,
        isPremium: data.is_premium,
        theme: data.theme,
        fontSize: data.font_size,
        showFurigana: data.show_furigana,
        speechSpeed: Number(data.speech_speed) || 1.0,
        audioAutoPlay: data.audio_auto_play,
        soundEffects: data.sound_effects,
        notificationsEnabled: data.notifications_enabled,
      };
    } catch (err) {
      console.warn('Failed to fetch profile from Supabase:', err);
      return null;
    }
  }

  /**
   * Syncs SRS flashcard progress batch to Supabase `srs_items` table
   */
  public static async syncSRSProgress(userId: string, items: UserSRSProgress[]): Promise<boolean> {
    if (!isSupabaseConfigured() || !items || items.length === 0) return false;
    try {
      const rows = items.map((item) => ({
        user_id: userId,
        item_id: item.itemId,
        item_type: item.itemType,
        stage: item.status === 'mastered' ? 5 : item.status === 'review' ? 3 : item.status === 'learning' ? 1 : 0,
        ease_factor: item.easeFactor || 2.5,
        interval_days: item.interval || 0,
        repetitions: item.repetitionCount || 0,
        due_date: item.dueDate || new Date().toISOString(),
        last_reviewed: item.lastReviewed || new Date().toISOString(),
        history: {
          wrongCount: item.wrongCount,
          correctCount: item.correctCount,
          isFavorite: item.isFavorite,
          level: item.level,
          status: item.status,
        },
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('srs_items')
        .upsert(rows, { onConflict: 'user_id,item_id' });

      if (error) {
        console.warn('Supabase SRS sync warning:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Failed to sync SRS items to Supabase:', err);
      return false;
    }
  }

  /**
   * Fetches SRS progress from Supabase
   */
  public static async fetchSRSProgress(userId: string): Promise<UserSRSProgress[] | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await supabase
        .from('srs_items')
        .select('*')
        .eq('user_id', userId);

      if (error || !data) return null;

      return data.map((row: any) => {
        const hist = row.history || {};
        return {
          itemId: row.item_id,
          itemType: row.item_type as 'vocab' | 'kanji' | 'grammar',
          level: hist.level || 'N5',
          status: hist.status || 'learning',
          interval: row.interval_days || 0,
          easeFactor: Number(row.ease_factor) || 2.5,
          repetitionCount: row.repetitions || 0,
          dueDate: row.due_date,
          lastReviewed: row.last_reviewed,
          wrongCount: hist.wrongCount || 0,
          correctCount: hist.correctCount || 0,
          isFavorite: Boolean(hist.isFavorite),
        };
      });
    } catch (err) {
      console.warn('Failed to fetch SRS items from Supabase:', err);
      return null;
    }
  }

  /**
   * Records a mock test attempt in Supabase
   */
  public static async recordMockAttempt(userId: string, attempt: MockTestAttempt): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const percentage = Math.round((attempt.totalScore / (attempt.totalMaxScore || 1)) * 100);
      const { error } = await supabase.from('mock_test_attempts').insert({
        id: attempt.id,
        user_id: userId,
        level: attempt.level,
        score: attempt.totalScore,
        max_score: attempt.totalMaxScore,
        percentage,
        passed: attempt.passed,
        time_spent_seconds: attempt.timeSpentSeconds,
        section_scores: attempt.sectionScores,
        completed_at: attempt.date || new Date().toISOString(),
      });

      if (error) {
        console.warn('Supabase mock test attempt error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Failed to record mock test in Supabase:', err);
      return false;
    }
  }

  /**
   * Records a mistake in Supabase
   */
  public static async recordMistake(
    userId: string,
    mistake: {
      id: string;
      question: string;
      yourAnswer: string;
      correctAnswer: string;
      explanation: string;
      category: string;
    }
  ): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const { error } = await supabase.from('mistake_logs').upsert({
        id: mistake.id,
        user_id: userId,
        question: mistake.question,
        your_answer: mistake.yourAnswer,
        correct_answer: mistake.correctAnswer,
        explanation: mistake.explanation,
        category: mistake.category,
        date: new Date().toISOString(),
      });

      if (error) {
        console.warn('Supabase mistake sync warning:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Failed to save mistake to Supabase:', err);
      return false;
    }
  }
}


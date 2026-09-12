import { UserProfile, UserSRSProgress, StudyPlan, CurriculumPlannerConfig } from '../types';
import { MockTestAttempt } from '../types/practice';
import { SupabaseSyncService } from './supabaseSyncService';

const KEYS = {
  PROFILE: 'jlpt_user_profile',
  SRS_PROGRESS: 'jlpt_srs_progress',
  MOCK_ATTEMPTS: 'jlpt_mock_attempts',
  RECENT_MISTAKES: 'jlpt_recent_mistakes',
  COMPLETED_LESSONS: 'jlpt_completed_lessons',
  CUSTOM_VOCAB: 'jlpt_custom_vocab',
  CUSTOM_KANJI: 'jlpt_custom_kanji',
  CUSTOM_GRAMMAR: 'jlpt_custom_grammar',
  DAILY_LOGS: 'jlpt_daily_logs',
  STUDY_PLAN: 'jlpt_study_plan',
  CURRICULUM_CONFIG: 'jlpt_curriculum_config',
};

export const defaultProfile: UserProfile = {
  id: 'user-default-1',
  name: 'Takeshi Learner',
  avatar: '⛩️',
  targetLevel: 'N5',
  currentLevel: 'N5',
  dailyGoalMinutes: 25,
  dailyGoalVocab: 20,
  dailyGoalKanji: 5,
  dailyGoalGrammar: 2,
  dailyGoalReading: 1,
  dailyGoalListening: 10,
  nativeLanguage: 'English',
  learningGoal: 'pass_jlpt',
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 1450,
  level: 5,
  isPremium: false,
  theme: 'light',
  fontSize: 'medium',
  showFurigana: true,
  speechSpeed: 1.0,
  audioAutoPlay: true,
  soundEffects: true,
  notificationsEnabled: true,
};

export class StorageService {
  public static loadProfile(): UserProfile {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      if (data) {
        return { ...defaultProfile, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Error loading profile', e);
    }
    return defaultProfile;
  }

  public static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
      // Asynchronously sync to Supabase in background
      SupabaseSyncService.syncProfile(profile).catch(() => {});
    } catch (e) {
      console.error('Error saving profile', e);
    }
  }

  public static loadSRSProgress(): UserSRSProgress[] {
    try {
      const data = localStorage.getItem(KEYS.SRS_PROGRESS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading SRS progress', e);
    }
    return [];
  }

  public static saveSRSProgress(progress: UserSRSProgress[]): void {
    try {
      localStorage.setItem(KEYS.SRS_PROGRESS, JSON.stringify(progress));
      const profile = this.loadProfile();
      if (profile?.id) {
        SupabaseSyncService.syncSRSProgress(profile.id, progress).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving SRS progress', e);
    }
  }

  public static loadCompletedLessons(): string[] {
    try {
      const data = localStorage.getItem(KEYS.COMPLETED_LESSONS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading completed lessons', e);
    }
    return ['n5-u1-l1'];
  }

  public static saveCompletedLessons(lessonIds: string[]): void {
    try {
      localStorage.setItem(KEYS.COMPLETED_LESSONS, JSON.stringify(lessonIds));
    } catch (e) {
      console.error('Error saving completed lessons', e);
    }
  }

  public static loadMockAttempts(): MockTestAttempt[] {
    try {
      const data = localStorage.getItem(KEYS.MOCK_ATTEMPTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading mock attempts', e);
    }
    return [];
  }

  public static saveMockAttempt(attempt: MockTestAttempt): void {
    try {
      const existing = this.loadMockAttempts();
      const updated = [attempt, ...existing];
      localStorage.setItem(KEYS.MOCK_ATTEMPTS, JSON.stringify(updated));
      const profile = this.loadProfile();
      if (profile?.id) {
        SupabaseSyncService.recordMockAttempt(profile.id, attempt).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving mock attempt', e);
    }
  }

  public static loadRecentMistakes(): Array<{
    id: string;
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    explanation: string;
    category: string;
    date: string;
  }> {
    try {
      const data = localStorage.getItem(KEYS.RECENT_MISTAKES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading mistakes', e);
    }
    return [];
  }

  public static addMistake(mistake: {
    id: string;
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    explanation: string;
    category: string;
  }): void {
    try {
      const existing = this.loadRecentMistakes();
      const filtered = existing.filter((m) => m.id !== mistake.id);
      const updated = [{ ...mistake, date: new Date().toISOString() }, ...filtered].slice(0, 50);
      localStorage.setItem(KEYS.RECENT_MISTAKES, JSON.stringify(updated));
      const profile = this.loadProfile();
      if (profile?.id) {
        SupabaseSyncService.recordMistake(profile.id, mistake).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving mistake', e);
    }
  }

  public static clearMistake(id: string): void {
    try {
      const existing = this.loadRecentMistakes();
      const updated = existing.filter((m) => m.id !== id);
      localStorage.setItem(KEYS.RECENT_MISTAKES, JSON.stringify(updated));
    } catch (e) {
      console.error('Error clearing mistake', e);
    }
  }

  public static loadStudyPlan(): StudyPlan | null {
    try {
      const data = localStorage.getItem(KEYS.STUDY_PLAN);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading study plan', e);
    }
    return null;
  }

  public static saveStudyPlan(plan: StudyPlan): void {
    try {
      localStorage.setItem(KEYS.STUDY_PLAN, JSON.stringify(plan));
    } catch (e) {
      console.error('Error saving study plan', e);
    }
  }

  public static loadCurriculumConfig(): CurriculumPlannerConfig | null {
    try {
      const data = localStorage.getItem(KEYS.CURRICULUM_CONFIG);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error loading curriculum config', e);
    }
    return null;
  }

  public static saveCurriculumConfig(config: CurriculumPlannerConfig): void {
    try {
      localStorage.setItem(KEYS.CURRICULUM_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Error saving curriculum config', e);
    }
  }
}


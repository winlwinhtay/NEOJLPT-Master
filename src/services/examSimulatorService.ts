import { JLPTLevel, PracticeQuestion, MockTestAttempt } from '../types/practice';
import {
  ExamMode,
  ExamSectionId,
  SimulationSessionState,
  ActiveSectionSession,
} from '../types/examSimulator';
import { getOfficialBlueprint } from '../data/examBlueprints';
import { StorageService } from './storageService';
import { SupabaseSyncService } from './supabaseSyncService';

const STORAGE_SESSION_KEY = 'jlpt_active_simulation_session';

export class ExamSimulatorService {
  /**
   * Loads the current active simulation session from local storage.
   */
  public static loadActiveSession(): SimulationSessionState | null {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!raw) return null;
      const parsed: SimulationSessionState = JSON.parse(raw);
      return parsed;
    } catch (e) {
      console.warn('Failed to parse active simulation session:', e);
      return null;
    }
  }

  /**
   * Saves the current active simulation session to local storage.
   */
  public static saveActiveSession(session: SimulationSessionState): void {
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save simulation session:', e);
    }
  }

  /**
   * Clears the active simulation session.
   */
  public static clearActiveSession(): void {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    } catch (e) {
      console.error('Failed to clear simulation session:', e);
    }
  }

  /**
   * Initializes a brand-new simulation session for a level and test.
   */
  public static initializeSession(
    testId: string,
    level: JLPTLevel,
    mode: ExamMode,
    sectionsData: { sectionId: ExamSectionId; durationMinutes: number }[]
  ): SimulationSessionState {
    const now = Date.now();
    const initialSections: ActiveSectionSession[] = sectionsData.map((s, idx) => ({
      sectionIndex: idx,
      sectionId: s.sectionId,
      startedAt: idx === 0 ? now : 0,
      deadlineTimestamp: idx === 0 ? now + s.durationMinutes * 60 * 1000 : 0,
      isSubmitted: false,
      isLocked: false,
      timeSpentSeconds: 0,
      answers: {},
    }));

    const session: SimulationSessionState = {
      id: `sim-${level}-${Date.now()}`,
      testId,
      level,
      mode,
      createdAt: now,
      currentSectionIndex: 0,
      isTransitioning: false,
      isCompleted: false,
      sections: initialSections,
    };

    this.saveActiveSession(session);
    return session;
  }

  /**
   * Calculates the remaining seconds for the active section, preventing refresh-based cheat.
   */
  public static getRemainingSeconds(section: ActiveSectionSession): number {
    if (section.isSubmitted || section.isLocked) return 0;
    if (!section.deadlineTimestamp) return 0;

    const remainingMs = section.deadlineTimestamp - Date.now();
    return Math.max(0, Math.floor(remainingMs / 1000));
  }

  /**
   * Starts a specific section (e.g., after transition).
   */
  public static startSection(
    session: SimulationSessionState,
    sectionIndex: number,
    durationMinutes: number
  ): SimulationSessionState {
    const now = Date.now();
    const updatedSections = [...session.sections];

    if (updatedSections[sectionIndex]) {
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        startedAt: now,
        deadlineTimestamp: now + durationMinutes * 60 * 1000,
        isSubmitted: false,
        isLocked: false,
      };
    }

    const updatedSession: SimulationSessionState = {
      ...session,
      currentSectionIndex: sectionIndex,
      isTransitioning: false,
      sections: updatedSections,
    };

    this.saveActiveSession(updatedSession);
    return updatedSession;
  }

  /**
   * Records an answer in the active section session.
   */
  public static recordAnswer(
    session: SimulationSessionState,
    questionId: string,
    answerIndex: number
  ): SimulationSessionState {
    const secIdx = session.currentSectionIndex;
    const currentSec = session.sections[secIdx];
    if (!currentSec || currentSec.isLocked) return session;

    const updatedSections = [...session.sections];
    updatedSections[secIdx] = {
      ...currentSec,
      answers: {
        ...currentSec.answers,
        [questionId]: answerIndex,
      },
    };

    const updatedSession = {
      ...session,
      sections: updatedSections,
    };

    this.saveActiveSession(updatedSession);
    return updatedSession;
  }

  /**
   * Submits and locks the current section.
   */
  public static submitSection(
    session: SimulationSessionState,
    sectionIndex: number,
    totalDurationMinutes: number
  ): SimulationSessionState {
    const sec = session.sections[sectionIndex];
    if (!sec) return session;

    const now = Date.now();
    const timeSpent = sec.startedAt
      ? Math.min(totalDurationMinutes * 60, Math.max(0, Math.floor((now - sec.startedAt) / 1000)))
      : totalDurationMinutes * 60;

    const updatedSections = [...session.sections];
    updatedSections[sectionIndex] = {
      ...sec,
      isSubmitted: true,
      isLocked: true,
      timeSpentSeconds: timeSpent,
    };

    const hasNextSection = sectionIndex < session.sections.length - 1;

    const updatedSession: SimulationSessionState = {
      ...session,
      isTransitioning: hasNextSection,
      isCompleted: !hasNextSection,
      sections: updatedSections,
    };

    this.saveActiveSession(updatedSession);
    return updatedSession;
  }

  /**
   * Evaluates final examination results with official JLPT sectional hurdle.
   */
  public static evaluateFinalResults(
    session: SimulationSessionState,
    level: JLPTLevel,
    sectionsData: {
      id: string;
      title: string;
      questions: PracticeQuestion[];
    }[]
  ): MockTestAttempt {
    const blueprint = getOfficialBlueprint(level);
    const SECTIONAL_HURDLE = blueprint.sectionalHurdle; // 19 / 60
    let anySectionFailedHurdle = false;
    let totalCorrectCount = 0;
    let totalQuestionCount = 0;
    let totalTimeSpent = 0;

    const sectionScores = sectionsData.map((sec, secIdx) => {
      const userAnswers = session.sections[secIdx]?.answers || {};
      let secCorrect = 0;

      sec.questions.forEach((q) => {
        totalQuestionCount += 1;
        if (userAnswers[q.id] === q.correctAnswer) {
          secCorrect += 1;
          totalCorrectCount += 1;
        }
      });

      const secMaxScore = 60;
      const scaledScore = Math.round(
        (secCorrect / Math.max(1, sec.questions.length)) * secMaxScore
      );

      if (scaledScore < SECTIONAL_HURDLE) {
        anySectionFailedHurdle = true;
      }

      totalTimeSpent += session.sections[secIdx]?.timeSpentSeconds || 0;

      return {
        sectionId: sec.id,
        sectionTitle: sec.title,
        score: scaledScore,
        maxScore: secMaxScore,
        correctCount: secCorrect,
        totalCount: sec.questions.length,
      };
    });

    const scaledTotal = Math.round(
      (totalCorrectCount / Math.max(1, totalQuestionCount)) * blueprint.totalMaxScore
    );
    const passed = scaledTotal >= blueprint.passingScore && !anySectionFailedHurdle;

    // Aggregate answers for persistence
    const combinedAnswers: Record<string, number> = {};
    session.sections.forEach((sec) => {
      Object.assign(combinedAnswers, sec.answers);
    });

    const attempt: MockTestAttempt = {
      id: `attempt-${Date.now()}`,
      testId: session.testId,
      level,
      date: new Date().toISOString(),
      timeSpentSeconds: totalTimeSpent,
      sectionScores,
      totalScore: totalCorrectCount,
      totalMaxScore: totalQuestionCount,
      passed,
      estimatedScaledScore: scaledTotal,
      answers: combinedAnswers,
      flaggedQuestionIds: [],
      weakCategories: sectionScores
        .filter((s) => s.score < SECTIONAL_HURDLE)
        .map((s) => s.sectionId),
      recommendedLessonIds: [`${level.toLowerCase()}-u1-l2`],
    };

    // Persist attempt locally & via Supabase
    StorageService.saveMockAttempt(attempt);

    // Clear active simulation session since exam has concluded
    this.clearActiveSession();

    return attempt;
  }
}

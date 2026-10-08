import { SessionState, SessionResult, SessionQuestion } from '../types';
import { StorageService } from '../../services/storageService';

const ACTIVE_SESSION_PREFIX = 'jlpt_active_session_';

export class SessionPersistenceService {
  /**
   * Persists an in-flight session to local storage for crash/tab-refresh recovery.
   */
  public static saveActiveSession(state: SessionState): void {
    if (!state.sessionId || state.isCompleted) {
      this.clearActiveSession(state.sessionId);
      return;
    }

    try {
      const serialized = {
        sessionId: state.sessionId,
        mode: state.mode,
        status: state.status,
        currentIndex: state.currentIndex,
        currentSelectedAnswer: state.currentSelectedAnswer,
        answers: state.answers,
        score: state.score,
        startedAt: state.startedAt,
        flaggedQuestionIds: state.flaggedQuestionIds,
        activeSectionId: state.activeSectionId,
        metadata: state.metadata,
      };
      localStorage.setItem(`${ACTIVE_SESSION_PREFIX}${state.sessionId}`, JSON.stringify(serialized));
    } catch (e) {
      console.warn('[SessionPersistenceService] Failed to save active session', e);
    }
  }

  /**
   * Restores an in-flight session if available.
   */
  public static loadActiveSession(sessionId: string): Partial<SessionState> | null {
    try {
      const data = localStorage.getItem(`${ACTIVE_SESSION_PREFIX}${sessionId}`);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('[SessionPersistenceService] Failed to load active session', e);
    }
    return null;
  }

  /**
   * Clears saved in-flight session upon completion or manual reset.
   */
  public static clearActiveSession(sessionId: string): void {
    try {
      localStorage.removeItem(`${ACTIVE_SESSION_PREFIX}${sessionId}`);
    } catch (e) {
      // Ignore cleanup error
    }
  }

  /**
   * Records a learning mistake to the system's SRS & mistakes database.
   */
  public static recordMistake(question: SessionQuestion, userAnswerFormatted: string, correctAnswerFormatted: string): void {
    try {
      StorageService.addMistake({
        id: question.id,
        question: question.prompt,
        yourAnswer: userAnswerFormatted,
        correctAnswer: correctAnswerFormatted,
        explanation: question.explanation || '',
        category: question.category || 'practice',
      });
    } catch (e) {
      console.warn('[SessionPersistenceService] Failed to record mistake', e);
    }
  }

  /**
   * Persists session analytics upon session completion.
   */
  public static recordSessionResult(result: SessionResult): void {
    try {
      const historyKey = 'jlpt_session_history';
      const raw = localStorage.getItem(historyKey);
      const history: SessionResult[] = raw ? JSON.parse(raw) : [];
      const updated = [result, ...history].slice(0, 100);
      localStorage.setItem(historyKey, JSON.stringify(updated));
    } catch (e) {
      console.warn('[SessionPersistenceService] Failed to record session result', e);
    }
  }
}

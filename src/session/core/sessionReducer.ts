import {
  SessionState,
  SessionQuestion,
  SessionMode,
  UserAnswerRecord,
  SessionLifecycleStatus,
} from '../types';

export type SessionAction =
  | { type: 'INIT_SESSION'; payload: { sessionId: string; mode: SessionMode; questions: SessionQuestion[]; metadata?: Record<string, any> } }
  | { type: 'SELECT_ANSWER'; payload: { rawAnswer: any } }
  | { type: 'SUBMIT_ANSWER_START' }
  | { type: 'SUBMIT_ANSWER_SUCCESS'; payload: { questionId: string; record: UserAnswerRecord; instantFeedback: boolean } }
  | { type: 'SUBMIT_ANSWER_ERROR'; payload: { error: string } }
  | { type: 'ADVANCE_START' }
  | { type: 'ADVANCE_SUCCESS'; payload?: { targetIndex?: number } }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'JUMP_TO_QUESTION'; payload: { index: number } }
  | { type: 'TOGGLE_FLAG'; payload: { questionId: string } }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'RECOVER_ERROR' }
  | { type: 'RESET_SESSION' };

export const initialSessionState: SessionState = {
  sessionId: 'default-session',
  mode: 'practice',
  status: 'IDLE',
  questions: [],
  currentIndex: 0,
  currentSelectedAnswer: null,
  answers: {},
  score: 0,
  maxScore: 0,
  isSubmitting: false,
  isAdvancing: false,
  isCompleted: false,
  errorMessage: null,
  startedAt: Date.now(),
  flaggedQuestionIds: {},
};

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'INIT_SESSION': {
      const { sessionId, mode, questions, metadata } = action.payload;
      const initialQ = questions[0];
      const maxScore = questions.length * 10;

      return {
        ...initialSessionState,
        sessionId,
        mode,
        questions,
        maxScore,
        status: 'ACTIVE',
        currentIndex: 0,
        currentSelectedAnswer: null,
        answers: {},
        startedAt: Date.now(),
        metadata: metadata || {},
        activeSectionId: initialQ?.sectionId,
      };
    }

    case 'SELECT_ANSWER': {
      // Guard against modifications while submitting, advancing, or completed
      if (state.isSubmitting || state.isAdvancing || state.isCompleted) {
        return state;
      }

      return {
        ...state,
        currentSelectedAnswer: action.payload.rawAnswer,
        status: action.payload.rawAnswer !== null ? 'ANSWER_SELECTED' : 'ACTIVE',
      };
    }

    case 'SUBMIT_ANSWER_START': {
      // Mutex: Prevent duplicate submissions
      if (state.isSubmitting || state.isAdvancing || state.isCompleted) {
        return state;
      }

      return {
        ...state,
        isSubmitting: true,
        status: 'SUBMITTING',
        errorMessage: null,
      };
    }

    case 'SUBMIT_ANSWER_SUCCESS': {
      const { questionId, record, instantFeedback } = action.payload;
      const updatedAnswers = {
        ...state.answers,
        [questionId]: record,
      };

      // Recalculate total score
      const newScore = Object.values(updatedAnswers).reduce((acc, curr) => acc + curr.scoreAwarded, 0);

      // Check if this was the last question
      const isLast = state.currentIndex >= state.questions.length - 1;

      return {
        ...state,
        isSubmitting: false,
        answers: updatedAnswers,
        score: newScore,
        status: instantFeedback ? 'FEEDBACK' : isLast ? 'COMPLETING' : 'READY_FOR_NEXT',
      };
    }

    case 'SUBMIT_ANSWER_ERROR': {
      return {
        ...state,
        isSubmitting: false,
        status: 'ERROR',
        errorMessage: action.payload.error,
      };
    }

    case 'ADVANCE_START': {
      // Mutex: Prevent double-click race conditions during transitions
      if (state.isAdvancing || state.isSubmitting || state.isCompleted) {
        return state;
      }

      return {
        ...state,
        isAdvancing: true,
      };
    }

    case 'ADVANCE_SUCCESS': {
      const nextIndex =
        action.payload?.targetIndex !== undefined
          ? action.payload.targetIndex
          : state.currentIndex + 1;

      // Completion check: If advancing past the final question, smoothly complete the session
      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          isAdvancing: false,
          isCompleted: true,
          status: 'COMPLETED',
          completedAt: Date.now(),
        };
      }

      const nextQuestion = state.questions[nextIndex];
      const existingAnswer = state.answers[nextQuestion?.id];

      return {
        ...state,
        currentIndex: nextIndex,
        isAdvancing: false,
        currentSelectedAnswer: existingAnswer ? existingAnswer.rawAnswer : null,
        status: existingAnswer ? 'FEEDBACK' : 'ACTIVE',
        activeSectionId: nextQuestion?.sectionId,
      };
    }

    case 'PREVIOUS_QUESTION': {
      if (state.currentIndex <= 0 || state.isSubmitting || state.isAdvancing) {
        return state;
      }

      const prevIndex = state.currentIndex - 1;
      const prevQuestion = state.questions[prevIndex];
      const existingAnswer = state.answers[prevQuestion?.id];

      return {
        ...state,
        currentIndex: prevIndex,
        currentSelectedAnswer: existingAnswer ? existingAnswer.rawAnswer : null,
        status: existingAnswer ? 'FEEDBACK' : 'ACTIVE',
        activeSectionId: prevQuestion?.sectionId,
      };
    }

    case 'JUMP_TO_QUESTION': {
      const { index } = action.payload;
      if (index < 0 || index >= state.questions.length || state.isSubmitting || state.isAdvancing) {
        return state;
      }

      const targetQuestion = state.questions[index];
      const existingAnswer = state.answers[targetQuestion?.id];

      return {
        ...state,
        currentIndex: index,
        currentSelectedAnswer: existingAnswer ? existingAnswer.rawAnswer : null,
        status: existingAnswer ? 'FEEDBACK' : 'ACTIVE',
        activeSectionId: targetQuestion?.sectionId,
      };
    }

    case 'TOGGLE_FLAG': {
      const { questionId } = action.payload;
      const currentFlag = !!state.flaggedQuestionIds[questionId];

      return {
        ...state,
        flaggedQuestionIds: {
          ...state.flaggedQuestionIds,
          [questionId]: !currentFlag,
        },
      };
    }

    case 'COMPLETE_SESSION': {
      return {
        ...state,
        isAdvancing: false,
        isSubmitting: false,
        isCompleted: true,
        status: 'COMPLETED',
        completedAt: Date.now(),
      };
    }

    case 'RECOVER_ERROR': {
      // Safe recovery path: resets locks, restores ACTIVE status, clears error message
      return {
        ...state,
        isSubmitting: false,
        isAdvancing: false,
        status: 'ACTIVE',
        errorMessage: null,
      };
    }

    case 'RESET_SESSION': {
      const initialQ = state.questions[0];
      return {
        ...state,
        currentIndex: 0,
        currentSelectedAnswer: null,
        answers: {},
        score: 0,
        isSubmitting: false,
        isAdvancing: false,
        isCompleted: false,
        status: 'ACTIVE',
        errorMessage: null,
        startedAt: Date.now(),
        completedAt: undefined,
        flaggedQuestionIds: {},
        activeSectionId: initialQ?.sectionId,
      };
    }

    default:
      return state;
  }
}

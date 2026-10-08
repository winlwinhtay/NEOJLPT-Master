import { useReducer, useEffect, useCallback, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  SessionConfig,
  SessionResult,
  SessionQuestion,
  UserAnswerRecord,
} from '../types';
import { sessionReducer, initialSessionState } from '../core/sessionReducer';
import { QuestionValidator } from '../validation/QuestionValidator';
import { AnswerEvaluator } from '../evaluation/AnswerEvaluator';
import { SessionPersistenceService } from '../persistence/SessionPersistenceService';
import { useUser } from '../../context/UserContext';

export function useLearningSession(config: SessionConfig) {
  const { addXP, logActivity } = useUser();

  const validatedQuestions = useMemo(() => {
    return QuestionValidator.validateQuestions(config.questions);
  }, [config.questions]);

  const [state, dispatch] = useReducer(sessionReducer, initialSessionState, () => {
    const qList = QuestionValidator.validateQuestions(config.questions);
    return sessionReducer(initialSessionState, {
      type: 'INIT_SESSION',
      payload: {
        sessionId: config.sessionId || `session-${Date.now()}`,
        mode: config.mode,
        questions: qList,
      },
    });
  });

  // Track the current questions identity to avoid unintended re-inits
  const lastQuestionsHashRef = useRef<string>('');

  useEffect(() => {
    const currentHash = validatedQuestions.map((q) => q.id).join(',');
    if (currentHash !== lastQuestionsHashRef.current) {
      lastQuestionsHashRef.current = currentHash;
      dispatch({
        type: 'INIT_SESSION',
        payload: {
          sessionId: config.sessionId || `session-${Date.now()}`,
          mode: config.mode,
          questions: validatedQuestions,
        },
      });
    }
  }, [validatedQuestions, config.sessionId, config.mode]);

  const currentQuestion: SessionQuestion =
    state.questions[state.currentIndex] ||
    state.questions[0] ||
    QuestionValidator.sanitizeQuestion({}, 0);

  const currentAnswerRecord: UserAnswerRecord | undefined = state.answers[currentQuestion.id];
  const isAnswered = !!currentAnswerRecord;
  const isLastQuestion = state.currentIndex >= state.questions.length - 1;
  const isFirstQuestion = state.currentIndex === 0;

  // Track mutex to prevent async double-clicks
  const isProcessingRef = useRef(false);

  /**
   * Select an option or update live answer tokens.
   */
  const selectAnswer = useCallback(
    (rawAnswer: any) => {
      if (state.isSubmitting || state.isAdvancing || state.isCompleted) return;

      dispatch({
        type: 'SELECT_ANSWER',
        payload: { rawAnswer },
      });

      // If configured for auto-submit upon selection (e.g. fast drill)
      if (config.autoSubmitOnSelect && !isAnswered) {
        setTimeout(() => {
          submitAnswerInternal(rawAnswer);
        }, 50);
      }
    },
    [state.isSubmitting, state.isAdvancing, state.isCompleted, config.autoSubmitOnSelect, isAnswered]
  );

  /**
   * Internal submit answer function.
   */
  const submitAnswerInternal = useCallback(
    (pendingAnswer?: any) => {
      if (isProcessingRef.current || state.isSubmitting || state.isAdvancing || state.isCompleted) {
        return;
      }

      const answerToEvaluate =
        pendingAnswer !== undefined ? pendingAnswer : state.currentSelectedAnswer;

      if (answerToEvaluate === null || answerToEvaluate === undefined) {
        return;
      }

      isProcessingRef.current = true;
      dispatch({ type: 'SUBMIT_ANSWER_START' });

      try {
        const evalResult = AnswerEvaluator.evaluate(currentQuestion, answerToEvaluate);

        const record: UserAnswerRecord = {
          questionId: currentQuestion.id,
          rawAnswer: answerToEvaluate,
          isCorrect: evalResult.isCorrect,
          scoreAwarded: evalResult.score,
          submittedAt: Date.now(),
          explanation: currentQuestion.explanation,
        };

        const instantFeedback = config.instantFeedback ?? true;

        dispatch({
          type: 'SUBMIT_ANSWER_SUCCESS',
          payload: {
            questionId: currentQuestion.id,
            record,
            instantFeedback,
          },
        });

        // Award XP and log activity
        if (evalResult.isCorrect) {
          const xp = config.xpPerCorrect ?? 15;
          addXP(xp, `Correct ${currentQuestion.category || config.mode} answer`);
        } else {
          // Record mistake for SRS review
          SessionPersistenceService.recordMistake(
            currentQuestion,
            evalResult.normalizedUserAnswer,
            evalResult.normalizedCorrectAnswer
          );
          config.onMistake?.({
            question: currentQuestion,
            userAnswer: evalResult.normalizedUserAnswer,
            correctAnswer: evalResult.normalizedCorrectAnswer,
          });
        }

        const actCat = config.activityCategory || 'practice';
        logActivity(actCat as any, 1);
      } catch (err: any) {
        console.error('[SessionEngine] Answer evaluation error:', err);
        dispatch({
          type: 'SUBMIT_ANSWER_ERROR',
          payload: { error: err?.message || 'Error evaluating answer' },
        });
      } finally {
        isProcessingRef.current = false;
      }
    },
    [state.isSubmitting, state.isAdvancing, state.isCompleted, state.currentSelectedAnswer, currentQuestion, config, addXP, logActivity]
  );

  /**
   * Explicit submit handler.
   */
  const submitAnswer = useCallback(() => {
    submitAnswerInternal();
  }, [submitAnswerInternal]);

  /**
   * Advance to the next question or complete the session if at the end.
   */
  const nextQuestion = useCallback(() => {
    if (isProcessingRef.current || state.isAdvancing || state.isSubmitting || state.isCompleted) {
      return;
    }

    // If current question is selected but not submitted yet, auto submit first
    if (!isAnswered && state.currentSelectedAnswer !== null) {
      submitAnswerInternal();
    }

    isProcessingRef.current = true;
    dispatch({ type: 'ADVANCE_START' });

    setTimeout(() => {
      dispatch({ type: 'ADVANCE_SUCCESS' });
      isProcessingRef.current = false;
    }, 20);
  }, [state.isAdvancing, state.isSubmitting, state.isCompleted, isAnswered, state.currentSelectedAnswer, submitAnswerInternal]);

  /**
   * Go back to the previous question.
   */
  const previousQuestion = useCallback(() => {
    if (isProcessingRef.current || state.isAdvancing || state.isSubmitting || state.currentIndex <= 0) {
      return;
    }
    dispatch({ type: 'PREVIOUS_QUESTION' });
  }, [state.isAdvancing, state.isSubmitting, state.currentIndex]);

  /**
   * Jump directly to a question by index.
   */
  const jumpToQuestion = useCallback((index: number) => {
    if (isProcessingRef.current || state.isAdvancing || state.isSubmitting) return;
    dispatch({ type: 'JUMP_TO_QUESTION', payload: { index } });
  }, [state.isAdvancing, state.isSubmitting]);

  /**
   * Toggle flag/bookmark for current question.
   */
  const toggleFlag = useCallback(() => {
    if (!currentQuestion?.id) return;
    dispatch({ type: 'TOGGLE_FLAG', payload: { questionId: currentQuestion.id } });
  }, [currentQuestion]);

  /**
   * Complete the session manually or upon finish button.
   */
  const completeSession = useCallback(() => {
    dispatch({ type: 'COMPLETE_SESSION' });
  }, []);

  /**
   * Restart the current session.
   */
  const restartSession = useCallback(() => {
    dispatch({ type: 'RESET_SESSION' });
  }, []);

  /**
   * Recover from any temporary error state.
   */
  const recoverError = useCallback(() => {
    dispatch({ type: 'RECOVER_ERROR' });
  }, []);

  // Compute calculated metrics
  const answeredCount = Object.keys(state.answers).length;
  const correctCount = Object.values(state.answers).filter((a) => a.isCorrect).length;
  const accuracyPercentage =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const totalQuestions = state.questions.length;
  const isFlagged = !!state.flaggedQuestionIds[currentQuestion.id];

  // Produce final SessionResult when completed
  const result: SessionResult | null = useMemo(() => {
    if (!state.isCompleted) return null;

    const threshold = config.passingThresholdPercentage ?? 70;
    const isPassed = accuracyPercentage >= threshold;
    const duration = Math.max(1, Math.round((Date.now() - state.startedAt) / 1000));

    const mistakes = state.questions
      .filter((q) => state.answers[q.id] && !state.answers[q.id].isCorrect)
      .map((q) => {
        const ans = state.answers[q.id];
        return {
          questionId: q.id,
          prompt: q.prompt,
          userAnswer: AnswerEvaluator.formatAnswer(q, ans?.rawAnswer),
          correctAnswer: AnswerEvaluator.formatAnswer(q, q.correctAnswer),
          explanation: q.explanation,
          category: q.category,
          level: q.level,
        };
      });

    return {
      sessionId: state.sessionId,
      mode: state.mode,
      totalQuestions,
      answeredQuestions: answeredCount,
      correctAnswers: correctCount,
      accuracyPercentage,
      score: state.score,
      maxScore: state.maxScore,
      isPassed,
      durationSeconds: duration,
      answers: state.answers,
      mistakes,
      completedAt: state.completedAt || Date.now(),
    };
  }, [
    state.isCompleted,
    state.sessionId,
    state.mode,
    totalQuestions,
    answeredCount,
    correctCount,
    accuracyPercentage,
    state.score,
    state.maxScore,
    state.startedAt,
    state.completedAt,
    state.questions,
    state.answers,
    config.passingThresholdPercentage,
  ]);

  // Handle completion side-effects
  const completionTriggeredRef = useRef(false);
  useEffect(() => {
    if (state.isCompleted && result && !completionTriggeredRef.current) {
      completionTriggeredRef.current = true;

      // Bonus XP
      const bonusXP = config.completionBonusXP ?? 25;
      if (bonusXP > 0) {
        addXP(bonusXP, `Completed ${config.mode} session!`);
      }

      // Celebratory Confetti if passed
      if (result.isPassed) {
        try {
          confetti({
            particleCount: 65,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore in environments without canvas
        }
      }

      // Record to history
      SessionPersistenceService.recordSessionResult(result);
      config.onComplete?.(result);
    } else if (!state.isCompleted) {
      completionTriggeredRef.current = false;
    }
  }, [state.isCompleted, result, config, addXP]);

  return {
    // Lifecycle & State
    status: state.status,
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions,
    isFirstQuestion,
    isLastQuestion,
    isAnswered,
    isCompleted: state.isCompleted,
    isSubmitting: state.isSubmitting,
    isAdvancing: state.isAdvancing,
    errorMessage: state.errorMessage,

    // Selection & Answers
    selectedAnswer: state.currentSelectedAnswer,
    currentAnswerRecord,
    answers: state.answers,

    // Actions
    selectAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    toggleFlag,
    completeSession,
    restartSession,
    recoverError,

    // Flags & Metrics
    isFlagged,
    flaggedQuestionIds: state.flaggedQuestionIds,
    score: state.score,
    maxScore: state.maxScore,
    correctCount,
    answeredCount,
    accuracyPercentage,
    result,
  };
}

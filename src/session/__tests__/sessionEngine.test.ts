import { sessionReducer, initialSessionState } from '../core/sessionReducer';
import { QuestionValidator } from '../validation/QuestionValidator';
import { AnswerEvaluator } from '../evaluation/AnswerEvaluator';
import { SessionQuestion } from '../types';

/**
 * Automated Verification Test Suite for the Shared Learning Session Engine.
 * Tests:
 * 1. Question validation against malformed and empty data
 * 2. Deterministic answer evaluation (Multiple Choice & Sentence Order)
 * 3. Lifecycle progression & mutex protection against rapid double clicks
 * 4. Final question advancement smoothly transitioning to COMPLETED (no dead buttons)
 * 5. Error recovery path
 */
export function runSessionEngineSelfTest(): { passed: boolean; results: string[] } {
  const results: string[] = [];
  let allPassed = true;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      results.push(`✅ PASS: ${testName}`);
    } else {
      results.push(`❌ FAIL: ${testName}`);
      allPassed = false;
    }
  }

  // --- Test 1: QuestionValidator defensive handling ---
  const malformedInput = [
    null,
    undefined,
    {},
    { id: 'q1', prompt: 'Valid Prompt', options: ['A', 'B'], correctAnswer: 1 },
    { id: 'q2', options: 'invalid_options', correctAnswer: 999 },
  ];
  const validated = QuestionValidator.validateQuestions(malformedInput);
  assert(validated.length >= 2, 'QuestionValidator filters nulls and sanitizes questions');
  assert(validated[0].options.length === 2, 'QuestionValidator keeps valid options');
  assert(typeof validated[1].correctAnswer === 'number', 'QuestionValidator normalizes invalid correctAnswer');

  // Empty questions fallback
  const emptyValidated = QuestionValidator.validateQuestions([]);
  assert(emptyValidated.length === 1 && emptyValidated[0].id.includes('fallback'), 'QuestionValidator produces safe fallback for empty input');

  // --- Test 2: Deterministic AnswerEvaluator (Zero AI Cost) ---
  const mcQuestion: SessionQuestion = {
    id: 'mc-1',
    type: 'multiple_choice',
    prompt: 'これは何ですか？',
    options: ['本', '犬', '猫'],
    correctAnswer: 0,
  };
  const correctEval = AnswerEvaluator.evaluate(mcQuestion, 0);
  assert(correctEval.isCorrect === true && correctEval.score === 10, 'AnswerEvaluator correctly identifies multiple choice correct answer');
  const wrongEval = AnswerEvaluator.evaluate(mcQuestion, 1);
  assert(wrongEval.isCorrect === false && wrongEval.score === 0, 'AnswerEvaluator correctly identifies multiple choice incorrect answer');

  // Sentence ordering
  const orderQuestion: SessionQuestion = {
    id: 'so-1',
    type: 'sentence_order',
    prompt: 'Arrange tokens',
    options: ['わたし', 'は', 'がくせい', 'です'],
    correctAnswer: [0, 1, 2, 3],
  };
  const orderEvalCorrect = AnswerEvaluator.evaluate(orderQuestion, [0, 1, 2, 3]);
  assert(orderEvalCorrect.isCorrect === true, 'AnswerEvaluator evaluates token sentence order correctly');
  const orderEvalWrong = AnswerEvaluator.evaluate(orderQuestion, [1, 0, 2, 3]);
  assert(orderEvalWrong.isCorrect === false, 'AnswerEvaluator detects incorrect sentence order');

  // --- Test 3: Session State Machine & Double-Click Mutex ---
  let state = sessionReducer(initialSessionState, {
    type: 'INIT_SESSION',
    payload: {
      sessionId: 'test-session-1',
      mode: 'practice',
      questions: [mcQuestion, orderQuestion],
    },
  });
  assert(state.status === 'ACTIVE' && state.currentIndex === 0, 'INIT_SESSION sets status to ACTIVE at index 0');

  // Select answer
  state = sessionReducer(state, { type: 'SELECT_ANSWER', payload: { rawAnswer: 0 } });
  assert(state.status === 'ANSWER_SELECTED' && state.currentSelectedAnswer === 0, 'SELECT_ANSWER updates selection and status');

  // Submit Answer Start
  state = sessionReducer(state, { type: 'SUBMIT_ANSWER_START' });
  assert(state.isSubmitting === true && state.status === 'SUBMITTING', 'SUBMIT_ANSWER_START locks isSubmitting');

  // Attempt duplicate selection during submitting (must be ignored)
  const duplicateSelectState = sessionReducer(state, { type: 'SELECT_ANSWER', payload: { rawAnswer: 2 } });
  assert(duplicateSelectState.currentSelectedAnswer === 0, 'Mutex prevents selection mutation while submitting');

  // Submit Answer Success
  state = sessionReducer(state, {
    type: 'SUBMIT_ANSWER_SUCCESS',
    payload: {
      questionId: mcQuestion.id,
      record: {
        questionId: mcQuestion.id,
        rawAnswer: 0,
        isCorrect: true,
        scoreAwarded: 10,
        submittedAt: Date.now(),
      },
      instantFeedback: true,
    },
  });
  assert(state.isSubmitting === false && state.status === 'FEEDBACK', 'SUBMIT_ANSWER_SUCCESS unlocks mutex and shows FEEDBACK');
  assert(state.score === 10, 'Score is properly accumulated in session state');

  // Advance question (Question 0 -> Question 1)
  state = sessionReducer(state, { type: 'ADVANCE_START' });
  assert(state.isAdvancing === true, 'ADVANCE_START sets mutex lock isAdvancing');
  state = sessionReducer(state, { type: 'ADVANCE_SUCCESS' });
  assert(state.currentIndex === 1 && state.isAdvancing === false, 'ADVANCE_SUCCESS moves to next question');

  // --- Test 4: Final Question Advancement (Smooth Completion, No Stuck State) ---
  // We are at question index 1 (last question of 2).
  // Advance again: should smoothly transition to COMPLETED, not hang or wrap to -1
  state = sessionReducer(state, { type: 'ADVANCE_START' });
  state = sessionReducer(state, { type: 'ADVANCE_SUCCESS' });
  assert(state.isCompleted === true && state.status === 'COMPLETED', 'Advancing past the last question safely marks session COMPLETED');

  // --- Test 5: Error and Safe Recovery Path ---
  let errorState = sessionReducer(initialSessionState, {
    type: 'SUBMIT_ANSWER_ERROR',
    payload: { error: 'Network error simulated' },
  });
  assert(errorState.status === 'ERROR' && errorState.errorMessage !== null, 'SUBMIT_ANSWER_ERROR transitions to ERROR');
  const recoveredState = sessionReducer(errorState, { type: 'RECOVER_ERROR' });
  assert(recoveredState.status === 'ACTIVE' && recoveredState.errorMessage === null, 'RECOVER_ERROR safely restores ACTIVE state');

  return { passed: allPassed, results };
}

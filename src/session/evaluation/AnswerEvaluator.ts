import { SessionQuestion, EvaluationResult } from '../types';

export class AnswerEvaluator {
  /**
   * Deterministically evaluates an answer without calling external AI APIs.
   * Guarantees 0-latency, 100% deterministic, zero-cost scoring.
   */
  public static evaluate(question: SessionQuestion, rawAnswer: any): EvaluationResult {
    if (rawAnswer === null || rawAnswer === undefined) {
      return {
        isCorrect: false,
        score: 0,
        maxScore: 10,
        feedback: 'No answer provided.',
        normalizedUserAnswer: '(No answer)',
        normalizedCorrectAnswer: this.formatAnswer(question, question.correctAnswer),
      };
    }

    switch (question.type) {
      case 'sentence_order':
        return this.evaluateSentenceOrder(question, rawAnswer);

      case 'multiple_select':
        return this.evaluateMultipleSelect(question, rawAnswer);

      case 'fill_blank':
        return this.evaluateFillBlank(question, rawAnswer);

      case 'multiple_choice':
      case 'kanji':
      case 'reading':
      case 'listening':
      case 'business':
      default:
        return this.evaluateMultipleChoice(question, rawAnswer);
    }
  }

  /**
   * Multiple choice evaluation (by option index or text matching).
   */
  private static evaluateMultipleChoice(question: SessionQuestion, rawAnswer: any): EvaluationResult {
    let isCorrect = false;

    if (typeof question.correctAnswer === 'number' && typeof rawAnswer === 'number') {
      isCorrect = rawAnswer === question.correctAnswer;
    } else if (typeof question.correctAnswer === 'string' && typeof rawAnswer === 'string') {
      isCorrect = rawAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
    } else if (typeof question.correctAnswer === 'number' && typeof rawAnswer === 'string') {
      const correctText = question.options[question.correctAnswer] || '';
      isCorrect = rawAnswer.trim() === correctText.trim();
    } else {
      isCorrect = String(rawAnswer) === String(question.correctAnswer);
    }

    const normalizedUser = this.formatAnswer(question, rawAnswer);
    const normalizedCorrect = this.formatAnswer(question, question.correctAnswer);

    return {
      isCorrect,
      score: isCorrect ? 10 : 0,
      maxScore: 10,
      feedback: isCorrect ? 'Correct!' : 'Incorrect.',
      normalizedUserAnswer: normalizedUser,
      normalizedCorrectAnswer: normalizedCorrect,
    };
  }

  /**
   * Sentence order evaluation (e.g. [2, 0, 1, 3]).
   */
  private static evaluateSentenceOrder(question: SessionQuestion, rawAnswer: any): EvaluationResult {
    const correctArr = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
    const userArr = Array.isArray(rawAnswer) ? rawAnswer : [];

    const isCorrect =
      userArr.length === correctArr.length &&
      userArr.every((val, idx) => Number(val) === Number(correctArr[idx]));

    const userText = userArr.map((i) => question.options[Number(i)] || '').join(' ');
    const correctText = correctArr.map((i) => question.options[Number(i)] || '').join(' ');

    return {
      isCorrect,
      score: isCorrect ? 15 : 0,
      maxScore: 15,
      feedback: isCorrect ? 'Perfect sentence structure!' : 'Sentence arrangement is incorrect.',
      normalizedUserAnswer: userText || JSON.stringify(userArr),
      normalizedCorrectAnswer: correctText || JSON.stringify(correctArr),
    };
  }

  /**
   * Multiple select evaluation.
   */
  private static evaluateMultipleSelect(question: SessionQuestion, rawAnswer: any): EvaluationResult {
    const correctSet = new Set(Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]);
    const userSet = new Set(Array.isArray(rawAnswer) ? rawAnswer : [rawAnswer]);

    let matches = 0;
    for (const item of userSet) {
      if (correctSet.has(item)) matches++;
    }

    const isCorrect = userSet.size === correctSet.size && matches === correctSet.size;

    return {
      isCorrect,
      score: isCorrect ? 10 : 0,
      maxScore: 10,
      feedback: isCorrect ? 'All correct options selected!' : 'Selection does not match all correct choices.',
      normalizedUserAnswer: Array.from(userSet).join(', '),
      normalizedCorrectAnswer: Array.from(correctSet).join(', '),
    };
  }

  /**
   * Fill-in-the-blank text matching.
   */
  private static evaluateFillBlank(question: SessionQuestion, rawAnswer: any): EvaluationResult {
    const userClean = String(rawAnswer).replace(/[\s\u3000]+/g, '').trim().toLowerCase();
    const correctAnswers = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.map((a) => String(a).replace(/[\s\u3000]+/g, '').trim().toLowerCase())
      : [String(question.correctAnswer).replace(/[\s\u3000]+/g, '').trim().toLowerCase()];

    const isCorrect = correctAnswers.includes(userClean);

    return {
      isCorrect,
      score: isCorrect ? 10 : 0,
      maxScore: 10,
      feedback: isCorrect ? 'Correct text input!' : 'Input does not match expected answer.',
      normalizedUserAnswer: String(rawAnswer),
      normalizedCorrectAnswer: Array.isArray(question.correctAnswer)
        ? question.correctAnswer.join(' / ')
        : String(question.correctAnswer),
    };
  }

  /**
   * Human-readable formatting of answers.
   */
  public static formatAnswer(question: SessionQuestion, answer: any): string {
    if (answer === null || answer === undefined) return '(None)';

    if (question.type === 'sentence_order' && Array.isArray(answer)) {
      return answer.map((idx) => question.options[Number(idx)] || String(idx)).join(' ');
    }

    if (typeof answer === 'number' && question.options[answer] !== undefined) {
      return question.options[answer];
    }

    if (Array.isArray(answer)) {
      return answer
        .map((a) => (typeof a === 'number' && question.options[a] ? question.options[a] : String(a)))
        .join(', ');
    }

    return String(answer);
  }
}

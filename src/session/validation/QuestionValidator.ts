import { SessionQuestion, SessionQuestionType } from '../types';

export class QuestionValidator {
  /**
   * Sanitizes and validates a question list, ensuring it is never empty
   * and contains strictly valid SessionQuestion items.
   */
  public static validateQuestions(rawQuestions: any[]): SessionQuestion[] {
    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
      return [this.createFallbackQuestion('empty-session-fallback')];
    }

    const validated: SessionQuestion[] = [];

    for (let i = 0; i < rawQuestions.length; i++) {
      const q = rawQuestions[i];
      if (!q || typeof q !== 'object') {
        continue;
      }

      // Skip completely blank objects that lack id, prompt, or options
      const hasContent = q.id || q.prompt || q.promptJp || q.question || q.text || q.options || q.choices;
      if (!hasContent) {
        continue;
      }

      try {
        const sanitized = this.sanitizeQuestion(q, i);
        if (sanitized) {
          validated.push(sanitized);
        }
      } catch (err) {
        console.warn(`[SessionEngine] Question index ${i} failed validation, skipped.`, err);
      }
    }

    if (validated.length === 0) {
      return [this.createFallbackQuestion('all-invalid-fallback')];
    }

    return validated;
  }

  /**
   * Defensive sanitizer for a single question object.
   */
  public static sanitizeQuestion(q: any, index: number): SessionQuestion {
    const id = String(q.id || `q-${index}-${Date.now()}`);
    const type: SessionQuestionType = this.resolveQuestionType(q.type);
    
    // Normalize prompt
    const prompt = String(q.prompt || q.promptJp || q.question || q.text || `Question ${index + 1}`);
    const promptSub = q.promptSub || q.promptEn || q.subPrompt || undefined;
    const passage = q.passage || q.context || undefined;

    // Normalize options
    let options: string[] = [];
    if (Array.isArray(q.options)) {
      options = q.options.map((opt: any) => String(opt ?? ''));
    } else if (Array.isArray(q.choices)) {
      options = q.choices.map((opt: any) => String(opt ?? ''));
    }

    // Normalize correctAnswer
    let correctAnswer = q.correctAnswer;
    if (correctAnswer === undefined || correctAnswer === null) {
      if (typeof q.answer === 'number' || typeof q.answer === 'string' || Array.isArray(q.answer)) {
        correctAnswer = q.answer;
      } else {
        correctAnswer = 0; // Default to option 0
      }
    }

    // For multiple choice, ensure correctAnswer is within bounds of options
    if (type === 'multiple_choice' && typeof correctAnswer === 'number') {
      if (options.length > 0 && (correctAnswer < 0 || correctAnswer >= options.length)) {
        correctAnswer = 0;
      }
    }

    const explanation = q.explanation ? String(q.explanation) : undefined;
    const audioText = q.audioText ? String(q.audioText) : undefined;
    const level = q.level || undefined;
    const category = q.category ? String(q.category) : undefined;
    const sectionId = q.sectionId ? String(q.sectionId) : undefined;
    const sectionTitle = q.sectionTitle ? String(q.sectionTitle) : undefined;

    return {
      id,
      type,
      prompt,
      promptSub,
      passage,
      options,
      correctAnswer,
      explanation,
      audioText,
      level,
      category,
      sectionId,
      sectionTitle,
      metadata: q.metadata || {},
    };
  }

  private static resolveQuestionType(rawType: any): SessionQuestionType {
    if (!rawType || typeof rawType !== 'string') return 'multiple_choice';
    const lower = rawType.toLowerCase();
    if (lower.includes('sentence_order') || lower.includes('ordering')) return 'sentence_order';
    if (lower.includes('multi_select') || lower.includes('multiple_select')) return 'multiple_select';
    if (lower.includes('fill') || lower.includes('blank')) return 'fill_blank';
    if (lower.includes('kanji')) return 'kanji';
    if (lower.includes('reading')) return 'reading';
    if (lower.includes('listening')) return 'listening';
    if (lower.includes('speaking')) return 'speaking';
    if (lower.includes('business')) return 'business';
    return 'multiple_choice';
  }

  private static createFallbackQuestion(id: string): SessionQuestion {
    return {
      id,
      type: 'multiple_choice',
      prompt: '問題の読み込みを確認してください (Sample / Confirmation Question)',
      promptSub: 'Please confirm to continue.',
      options: ['次へ進む (Continue)', 'やり直す (Retry)'],
      correctAnswer: 0,
      explanation: 'セッションが安全に初期化されました。(Session initialized safely)',
    };
  }
}

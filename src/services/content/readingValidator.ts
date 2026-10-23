import { UniversityReadingExercise, ReadingValidationReport } from '../../types/readingCurriculum';

export class ReadingValidator {
  /**
   * Validates a reading exercise against university curriculum and JLPT standards.
   */
  public static validateExercise(exercise: UniversityReadingExercise): ReadingValidationReport {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Mandatory Fields
    if (!exercise.id || !exercise.id.trim()) {
      errors.push('Exercise ID is required.');
    }
    if (!exercise.title || !exercise.title.trim()) {
      errors.push('Japanese title is required.');
    }
    if (!exercise.titleEn || !exercise.titleEn.trim()) {
      errors.push('English title translation is required.');
    }
    if (!exercise.level) {
      errors.push('JLPT Level is required.');
    }
    if (!exercise.passage || !exercise.passage.trim()) {
      errors.push('Japanese passage is required.');
    }
    if (!exercise.passagePlain || !exercise.passagePlain.trim()) {
      errors.push('Plain Japanese passage is required.');
    }
    if (!exercise.translationEn || !exercise.translationEn.trim()) {
      errors.push('English translation of the passage is required.');
    }

    // 2. Length and Word Counts
    const plainLength = exercise.passagePlain ? exercise.passagePlain.length : 0;
    if (plainLength < 50) {
      errors.push(`Passage is too short (${plainLength} characters). Minimum is 50 characters.`);
    }

    // Level-specific length guidelines
    if (exercise.level === 'N5' && plainLength > 500) {
      warnings.push(`N5 passage might be too long (${plainLength} characters, typical is 100-300).`);
    } else if (exercise.level === 'N1' && plainLength < 250) {
      warnings.push(`N1 passage is relatively short (${plainLength} characters, typical is 350-900).`);
    }

    // 3. Furigana Notation Check
    const hasRubyFormat = /\[.+?\]\{.+?\}/.test(exercise.passage);
    if (!hasRubyFormat && (exercise.level === 'N5' || exercise.level === 'N4')) {
      warnings.push('Beginner reading passage (N5/N4) lacks [漢字]{かんじ} furigana markup.');
    }

    // 4. Questions & Answer Validation
    if (!exercise.questions || exercise.questions.length === 0) {
      errors.push('At least one comprehension question is required.');
    } else {
      exercise.questions.forEach((q, idx) => {
        if (!q.questionJp || !q.questionJp.trim()) {
          errors.push(`Question #${idx + 1} has no Japanese question text.`);
        }
        if (!q.options || q.options.length < 2) {
          errors.push(`Question #${idx + 1} must have at least 2 answer choices.`);
        }
        if (q.correctIndex < 0 || q.correctIndex >= (q.options ? q.options.length : 0)) {
          errors.push(`Question #${idx + 1} has invalid correctIndex (${q.correctIndex}). Must be within range 0-${(q.options?.length || 1) - 1}.`);
        }
        if (!q.explanation || !q.explanation.trim()) {
          warnings.push(`Question #${idx + 1} lacks an explanatory answer rationale.`);
        }
      });
    }

    // 5. Vocabulary and Grammar Matching
    const vocabCount = exercise.vocabularyList ? exercise.vocabularyList.length : 0;
    if (vocabCount === 0) {
      warnings.push('Exercise has no vocabulary items defined.');
    }

    // Check if vocabulary words actually appear in plain passage
    if (exercise.vocabularyList && exercise.passagePlain) {
      exercise.vocabularyList.forEach((v) => {
        if (!exercise.passagePlain.includes(v.word) && !exercise.passagePlain.includes(v.reading)) {
          warnings.push(`Vocabulary word "${v.word}" does not appear explicitly in the passage text.`);
        }
      });
    }

    // 6. Translation Completeness
    const hasTranslations = Boolean(
      exercise.translationEn &&
      exercise.translationEn.trim().length > 0 &&
      exercise.translationMy &&
      exercise.translationMy.trim().length > 0
    );

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      wordCount: plainLength,
      questionCount: exercise.questions ? exercise.questions.length : 0,
      vocabCount,
      grammarCount: exercise.grammarPoints ? exercise.grammarPoints.length : 0,
      hasFurigana: hasRubyFormat,
      hasTranslations,
    };
  }

  /**
   * Checks for duplicate or near-duplicate passages across an array of exercises.
   */
  public static checkDuplicates(exercises: UniversityReadingExercise[]): { duplicatePairs: [string, string][] } {
    const duplicatePairs: [string, string][] = [];
    for (let i = 0; i < exercises.length; i++) {
      for (let j = i + 1; j < exercises.length; j++) {
        const p1 = exercises[i].passagePlain.replace(/\s+/g, '');
        const p2 = exercises[j].passagePlain.replace(/\s+/g, '');
        if (p1 === p2 || p1.includes(p2) || p2.includes(p1)) {
          duplicatePairs.push([exercises[i].id, exercises[j].id]);
        }
      }
    }
    return { duplicatePairs };
  }
}

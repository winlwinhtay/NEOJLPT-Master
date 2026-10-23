import { SupportedLanguage } from '../../types/i18n';
import { READING_DATA } from '../readingData';
import { READING_PASSAGES_I18N } from './mediaContentI18n';

export interface LocalizedExerciseContent {
  title: string;
  passage: string;
  learningObjectives?: string[];
  vocabularyMeanings: Record<string, string>;
  grammarExplanations: Record<string, string>;
  questions: {
    questionText: string;
    options: string[];
    explanation: string;
  }[];
}

/**
 * Multilingual Translation Registry for the 50 Core Reading Exercises
 * Supports all official app languages: en, my, ja, th, zh, ko, es, fr, vi, id, de, etc.
 */
export class ReadingLibraryI18n {
  /**
   * Retrieves localized exercise text, questions, and notes for any supported language.
   * Completely static and deterministic — requires zero runtime AI calls.
   */
  public static getLocalizedExercise(
    exerciseId: string,
    targetLang: SupportedLanguage
  ): LocalizedExerciseContent {
    const exercise = READING_DATA.find((e) => e.id === exerciseId);
    if (!exercise) {
      return {
        title: '',
        passage: '',
        vocabularyMeanings: {},
        grammarExplanations: {},
        questions: [],
      };
    }

    // 1. Japanese Native View
    if (targetLang === 'ja') {
      return {
        title: exercise.title,
        passage: exercise.passagePlain,
        learningObjectives: exercise.learningObjectives,
        vocabularyMeanings: Object.fromEntries(
          (exercise.vocabularyList || []).map((v) => [v.word, `${v.word} (${v.reading})`])
        ),
        grammarExplanations: Object.fromEntries(
          (exercise.grammarPoints || []).map((g) => [g.grammar, g.explanation || g.meaning])
        ),
        questions: (exercise.questions || []).map((q) => ({
          questionText: q.questionJp,
          options: q.options,
          explanation: q.explanation,
        })),
      };
    }

    // 2. Burmese View (Primary Second Language)
    if (targetLang === 'my') {
      return {
        title: exercise.titleMy || exercise.title,
        passage: exercise.translationMy || exercise.translationEn,
        learningObjectives: exercise.learningObjectivesMy || exercise.learningObjectives,
        vocabularyMeanings: Object.fromEntries(
          (exercise.vocabularyList || []).map((v) => [v.word, v.meaningMy || v.meaning])
        ),
        grammarExplanations: Object.fromEntries(
          (exercise.grammarPoints || []).map((g) => [g.grammar, g.explanationMy || g.meaningMy || g.explanation])
        ),
        questions: (exercise.questions || []).map((q) => ({
          questionText: q.questionMy || q.questionEn || q.questionJp,
          options: q.optionsMy || q.options,
          explanation: q.explanationMy || q.explanation,
        })),
      };
    }

    // 3. Other Supported Languages: Check mediaContentI18n canonical translations
    const passageI18n = READING_PASSAGES_I18N[exerciseId];
    const translatedPassage = passageI18n && passageI18n[targetLang] ? passageI18n[targetLang]! : exercise.translationEn;

    // Default to English with target language passage if available
    return {
      title: exercise.titleEn,
      passage: translatedPassage,
      learningObjectives: exercise.learningObjectives,
      vocabularyMeanings: Object.fromEntries(
        (exercise.vocabularyList || []).map((v) => [v.word, v.meaning])
      ),
      grammarExplanations: Object.fromEntries(
        (exercise.grammarPoints || []).map((g) => [g.grammar, g.explanation || g.meaning])
      ),
      questions: (exercise.questions || []).map((q) => ({
        questionText: q.questionEn || q.questionJp,
        options: q.options,
        explanation: q.explanation,
      })),
    };
  }

  /**
   * Verifies translation completeness across all supported languages for an exercise.
   */
  public static getTranslationCompleteness(exerciseId: string): {
    hasEnglish: boolean;
    hasBurmese: boolean;
    hasJapanese: boolean;
    additionalLanguagesCount: number;
  } {
    const ex = READING_DATA.find((e) => e.id === exerciseId);
    if (!ex) {
      return { hasEnglish: false, hasBurmese: false, hasJapanese: false, additionalLanguagesCount: 0 };
    }
    const hasEnglish = Boolean(ex.translationEn && ex.translationEn.trim().length > 0);
    const hasBurmese = Boolean(ex.translationMy && ex.translationMy.trim().length > 0);
    const hasJapanese = Boolean(ex.passagePlain && ex.passagePlain.trim().length > 0);

    const i18n = READING_PASSAGES_I18N[exerciseId] || {};
    const additionalLanguagesCount = Object.keys(i18n).filter((k) => k !== 'en' && k !== 'ja' && k !== 'my').length;

    return {
      hasEnglish,
      hasBurmese,
      hasJapanese,
      additionalLanguagesCount,
    };
  }
}

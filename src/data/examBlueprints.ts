import { JLPTLevel, PracticeQuestion } from '../types/practice';
import {
  ExamBlueprint,
  QuestionBankReadiness,
  ExamSectionId,
} from '../types/examSimulator';

/**
 * Official JLPT Examination Blueprints (Official Guideline Standards 2020–2025)
 * Source Reference: https://www.jlpt.jp/e/guideline/testsections.html
 */
export const OFFICIAL_JLPT_BLUEPRINTS: Record<JLPTLevel, ExamBlueprint> = {
  // =========================================================================
  // N1 OFFICIAL BLUEPRINT
  // =========================================================================
  N1: {
    level: 'N1',
    version: '2020–2025 Official Standard',
    title: 'JLPT N1 Official Examination Format',
    description:
      'Official 2-section examination consisting of Language Knowledge (Vocabulary/Grammar) & Reading (110 min) followed by Listening (55 min). Minimum 19/60 sectional hurdle applies.',
    totalTimeMinutes: 165,
    totalMaxScore: 180,
    passingScore: 100,
    sectionalHurdle: 19,
    sections: [
      {
        sectionId: 'language_knowledge_reading',
        title: 'Section 1: Language Knowledge (Vocabulary/Grammar) & Reading',
        titleJp: '言語知識（文字・語彙・文法）・読解',
        timeLimitMinutes: 110,
        targetQuestionCount: 71,
        order: 1,
        questionTypes: [
          { type: 'kanji_reading', targetCount: 6, labelEn: 'Kanji Reading', labelJp: '漢字読み' },
          { type: 'vocab_meaning', targetCount: 19, labelEn: 'Contextual Expressions & Paraphrases', labelJp: '文脈規定・言い換え類義' },
          { type: 'vocab_usage', targetCount: 6, labelEn: 'Usage', labelJp: '用法' },
          { type: 'grammar_select', targetCount: 10, labelEn: 'Grammar Forms', labelJp: '文法形式の判断' },
          { type: 'sentence_order', targetCount: 5, labelEn: 'Sentence Composition (★)', labelJp: '文の組み立て' },
          { type: 'reading_comprehension', targetCount: 25, labelEn: 'Reading Comprehension (Short, Med, Long, Thematic, Info Retrieval)', labelJp: '文章読解' },
        ],
      },
      {
        sectionId: 'listening',
        title: 'Section 2: Listening Comprehension',
        titleJp: '聴解',
        timeLimitMinutes: 55,
        targetQuestionCount: 36,
        order: 2,
        questionTypes: [
          { type: 'listening_comprehension', targetCount: 36, labelEn: 'Listening Comprehension (Task, Key-Point, General, Quick Response, Integrated)', labelJp: '聴解問題' },
        ],
      },
    ],
  },

  // =========================================================================
  // N2 OFFICIAL BLUEPRINT
  // =========================================================================
  N2: {
    level: 'N2',
    version: '2020–2025 Official Standard',
    title: 'JLPT N2 Official Examination Format',
    description:
      'Official 2-section examination consisting of Language Knowledge (Vocabulary/Grammar) & Reading (105 min) followed by Listening (50 min). Minimum 19/60 sectional hurdle applies.',
    totalTimeMinutes: 155,
    totalMaxScore: 180,
    passingScore: 90,
    sectionalHurdle: 19,
    sections: [
      {
        sectionId: 'language_knowledge_reading',
        title: 'Section 1: Language Knowledge (Vocabulary/Grammar) & Reading',
        titleJp: '言語知識（文字・語彙・文法）・読解',
        timeLimitMinutes: 105,
        targetQuestionCount: 74,
        order: 1,
        questionTypes: [
          { type: 'kanji_reading', targetCount: 5, labelEn: 'Kanji Reading', labelJp: '漢字読み' },
          { type: 'vocab_meaning', targetCount: 22, labelEn: 'Orthography, Word Formation & Context', labelJp: '表記・語形成・文脈規定' },
          { type: 'vocab_usage', targetCount: 5, labelEn: 'Usage', labelJp: '用法' },
          { type: 'grammar_select', targetCount: 12, labelEn: 'Grammar Forms', labelJp: '文法形式の判断' },
          { type: 'sentence_order', targetCount: 5, labelEn: 'Sentence Composition (★)', labelJp: '文の組み立て' },
          { type: 'reading_comprehension', targetCount: 25, labelEn: 'Reading Comprehension (Short, Med, Integrated, Thematic, Info Retrieval)', labelJp: '文章読解' },
        ],
      },
      {
        sectionId: 'listening',
        title: 'Section 2: Listening Comprehension',
        titleJp: '聴解',
        timeLimitMinutes: 50,
        targetQuestionCount: 31,
        order: 2,
        questionTypes: [
          { type: 'listening_comprehension', targetCount: 31, labelEn: 'Listening Comprehension (Task, Key-Point, General, Quick Response, Integrated)', labelJp: '聴解問題' },
        ],
      },
    ],
  },

  // =========================================================================
  // N3 OFFICIAL BLUEPRINT
  // =========================================================================
  N3: {
    level: 'N3',
    version: '2020–2025 Official Standard',
    title: 'JLPT N3 Official Examination Format',
    description:
      'Official 3-section examination: Vocabulary (30 min), Grammar & Reading (70 min), and Listening (40 min). Minimum 19/60 sectional hurdle applies.',
    totalTimeMinutes: 140,
    totalMaxScore: 180,
    passingScore: 95,
    sectionalHurdle: 19,
    sections: [
      {
        sectionId: 'vocabulary',
        title: 'Section 1: Language Knowledge (Vocabulary)',
        titleJp: '言語知識（文字・語彙）',
        timeLimitMinutes: 30,
        targetQuestionCount: 35,
        order: 1,
        questionTypes: [
          { type: 'kanji_reading', targetCount: 8, labelEn: 'Kanji Reading', labelJp: '漢字読み' },
          { type: 'vocab_meaning', targetCount: 22, labelEn: 'Orthography & Contextual Selection', labelJp: '表記・文脈規定' },
          { type: 'vocab_usage', targetCount: 5, labelEn: 'Usage', labelJp: '用法' },
        ],
      },
      {
        sectionId: 'grammar_reading',
        title: 'Section 2: Language Knowledge (Grammar) & Reading',
        titleJp: '言語知識（文法）・読解',
        timeLimitMinutes: 70,
        targetQuestionCount: 38,
        order: 2,
        questionTypes: [
          { type: 'grammar_select', targetCount: 13, labelEn: 'Grammar Forms', labelJp: '文法形式の判断' },
          { type: 'sentence_order', targetCount: 5, labelEn: 'Sentence Composition (★)', labelJp: '文の組み立て' },
          { type: 'reading_comprehension', targetCount: 20, labelEn: 'Reading (Short, Medium, Long, Info Retrieval)', labelJp: '文章読解' },
        ],
      },
      {
        sectionId: 'listening',
        title: 'Section 3: Listening Comprehension',
        titleJp: '聴解',
        timeLimitMinutes: 40,
        targetQuestionCount: 28,
        order: 3,
        questionTypes: [
          { type: 'listening_comprehension', targetCount: 28, labelEn: 'Listening (Task, Key-Point, General, Verbal, Quick Response)', labelJp: '聴解問題' },
        ],
      },
    ],
  },

  // =========================================================================
  // N4 OFFICIAL BLUEPRINT
  // =========================================================================
  N4: {
    level: 'N4',
    version: '2020–2025 Official Standard',
    title: 'JLPT N4 Official Examination Format',
    description:
      'Official 3-section examination: Vocabulary (25 min), Grammar & Reading (55 min), and Listening (35 min). Minimum 19/60 sectional hurdle applies.',
    totalTimeMinutes: 115,
    totalMaxScore: 180,
    passingScore: 90,
    sectionalHurdle: 19,
    sections: [
      {
        sectionId: 'vocabulary',
        title: 'Section 1: Language Knowledge (Vocabulary)',
        titleJp: '言語知識（文字・語彙）',
        timeLimitMinutes: 25,
        targetQuestionCount: 33,
        order: 1,
        questionTypes: [
          { type: 'kanji_reading', targetCount: 7, labelEn: 'Kanji Reading', labelJp: '漢字読み' },
          { type: 'vocab_meaning', targetCount: 21, labelEn: 'Orthography & Contextual Selection', labelJp: '表記・文脈規定' },
          { type: 'vocab_usage', targetCount: 5, labelEn: 'Usage', labelJp: '用法' },
        ],
      },
      {
        sectionId: 'grammar_reading',
        title: 'Section 2: Language Knowledge (Grammar) & Reading',
        titleJp: '言語知識（文法）・読解',
        timeLimitMinutes: 55,
        targetQuestionCount: 34,
        order: 2,
        questionTypes: [
          { type: 'grammar_select', targetCount: 13, labelEn: 'Grammar Forms', labelJp: '文法形式の判断' },
          { type: 'sentence_order', targetCount: 5, labelEn: 'Sentence Composition (★)', labelJp: '文の組み立て' },
          { type: 'reading_comprehension', targetCount: 16, labelEn: 'Reading (Short, Medium, Info Retrieval)', labelJp: '文章読解' },
        ],
      },
      {
        sectionId: 'listening',
        title: 'Section 3: Listening Comprehension',
        titleJp: '聴解',
        timeLimitMinutes: 35,
        targetQuestionCount: 26,
        order: 3,
        questionTypes: [
          { type: 'listening_comprehension', targetCount: 26, labelEn: 'Listening (Task, Key-Point, Verbal, Quick Response)', labelJp: '聴解問題' },
        ],
      },
    ],
  },

  // =========================================================================
  // N5 OFFICIAL BLUEPRINT
  // =========================================================================
  N5: {
    level: 'N5',
    version: '2020–2025 Official Standard',
    title: 'JLPT N5 Official Examination Format',
    description:
      'Official 3-section examination: Vocabulary (20 min), Grammar & Reading (40 min), and Listening (30 min). Minimum 19/60 sectional hurdle applies.',
    totalTimeMinutes: 90,
    totalMaxScore: 180,
    passingScore: 80,
    sectionalHurdle: 19,
    sections: [
      {
        sectionId: 'vocabulary',
        title: 'Section 1: Language Knowledge (Vocabulary)',
        titleJp: '言語知識（文字・語彙）',
        timeLimitMinutes: 20,
        targetQuestionCount: 30,
        order: 1,
        questionTypes: [
          { type: 'kanji_reading', targetCount: 10, labelEn: 'Kanji Reading', labelJp: '漢字読み' },
          { type: 'vocab_meaning', targetCount: 15, labelEn: 'Orthography & Contextual Selection', labelJp: '表記・文脈規定' },
          { type: 'vocab_usage', targetCount: 5, labelEn: 'Usage / Paraphrases', labelJp: '用法・言い換え' },
        ],
      },
      {
        sectionId: 'grammar_reading',
        title: 'Section 2: Language Knowledge (Grammar) & Reading',
        titleJp: '言語知識（文法）・読解',
        timeLimitMinutes: 40,
        targetQuestionCount: 30,
        order: 2,
        questionTypes: [
          { type: 'grammar_select', targetCount: 14, labelEn: 'Grammar Forms', labelJp: '文法形式の判断' },
          { type: 'sentence_order', targetCount: 5, labelEn: 'Sentence Composition (★)', labelJp: '文の組み立て' },
          { type: 'reading_comprehension', targetCount: 11, labelEn: 'Reading (Short, Medium, Info Retrieval)', labelJp: '文章読解' },
        ],
      },
      {
        sectionId: 'listening',
        title: 'Section 3: Listening Comprehension',
        titleJp: '聴解',
        timeLimitMinutes: 30,
        targetQuestionCount: 24,
        order: 3,
        questionTypes: [
          { type: 'listening_comprehension', targetCount: 24, labelEn: 'Listening (Task, Key-Point, Verbal, Quick Response)', labelJp: '聴解問題' },
        ],
      },
    ],
  },
};

export function getOfficialBlueprint(level: JLPTLevel): ExamBlueprint {
  return OFFICIAL_JLPT_BLUEPRINTS[level] || OFFICIAL_JLPT_BLUEPRINTS['N5'];
}

/**
 * Calculates question bank readiness comparing target counts against available validated questions.
 */
export function calculateQuestionBankReadiness(
  level: JLPTLevel,
  availableQuestions: PracticeQuestion[]
): QuestionBankReadiness[] {
  const bp = getOfficialBlueprint(level);

  return bp.sections.map((sec) => {
    // Match questions belonging to this section
    const matching = availableQuestions.filter((q) => {
      if (q.level !== level) return false;
      if (sec.sectionId === 'vocabulary' || sec.sectionId === 'vocab_kanji') {
        return q.category === 'vocabulary' || q.category === 'kanji';
      }
      if (sec.sectionId === 'grammar_reading') {
        return q.category === 'grammar' || q.category === 'reading';
      }
      if (sec.sectionId === 'language_knowledge_reading') {
        return (
          q.category === 'vocabulary' ||
          q.category === 'kanji' ||
          q.category === 'grammar' ||
          q.category === 'reading'
        );
      }
      if (sec.sectionId === 'listening') {
        return q.category === 'listening' || !!q.audioText;
      }
      return false;
    });

    const qualityDist: Record<string, number> = {};
    matching.forEach((q) => {
      const st = q.qualityStatus || 'published';
      qualityDist[st] = (qualityDist[st] || 0) + 1;
    });

    const available = matching.length;
    const target = sec.targetQuestionCount;
    const selected = Math.min(available, target);
    const pct = Math.min(100, Math.round((available / Math.max(1, target)) * 100));

    return {
      level,
      sectionId: sec.sectionId,
      sectionTitle: sec.title,
      targetCount: target,
      availableCount: available,
      selectedCount: selected,
      isComplete: available >= target,
      readinessPercentage: pct,
      qualityStatusDistribution: qualityDist,
    };
  });
}

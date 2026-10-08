import { BusinessQuizQuestion } from '../../types/business';
import { SessionQuestion } from '../types';

export function adaptBusinessQuizQuestion(bq: BusinessQuizQuestion): SessionQuestion {
  return {
    id: bq.id,
    type: 'business',
    prompt: bq.questionJp,
    promptSub: bq.questionEn,
    passage: bq.scenarioContext,
    options: [...bq.options],
    correctAnswer: bq.correctAnswer,
    explanation: `${bq.explanationJp}\n\n${bq.explanationEn}`,
    audioText: bq.questionJp,
    category: bq.section,
    sectionId: bq.section,
    metadata: {
      businessLevel: bq.level,
      explanationJp: bq.explanationJp,
      explanationEn: bq.explanationEn,
      scenarioContext: bq.scenarioContext,
    },
  };
}

export function adaptBusinessQuizQuestions(questions: BusinessQuizQuestion[]): SessionQuestion[] {
  return questions.map(adaptBusinessQuizQuestion);
}

export function adaptBusinessLessonQuizItem(item: {
  id: string;
  promptJp: string;
  promptEn: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}): SessionQuestion {
  return {
    id: item.id,
    type: 'business',
    prompt: item.promptJp,
    promptSub: item.promptEn,
    options: [...item.options],
    correctAnswer: item.correctAnswer,
    explanation: item.explanation,
    audioText: item.promptJp,
    category: 'business',
  };
}

export function adaptBusinessLessonQuizQuestions(
  items: Array<{
    id: string;
    promptJp: string;
    promptEn: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>
): SessionQuestion[] {
  return items.map(adaptBusinessLessonQuizItem);
}

export function adaptKeigoConfusionExercises(
  exercises: Array<{
    id: string;
    prompt: string;
    situation?: string;
    options: Array<{ text: string; explanation?: string }>;
    correctIndex: number;
    explanation?: string;
  }>
): SessionQuestion[] {
  return exercises.map((ex) => {
    const correctOpt = ex.options[ex.correctIndex];
    return {
      id: ex.id,
      type: 'business',
      prompt: ex.prompt,
      passage: ex.situation,
      options: ex.options.map((o) => o.text),
      correctAnswer: ex.correctIndex,
      explanation: ex.explanation || correctOpt?.explanation || 'Keigo relationship evaluation.',
      audioText: ex.prompt,
      category: 'keigo',
    };
  });
}



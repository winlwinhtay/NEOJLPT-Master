import { PracticeQuestion } from '../../types/practice';
import { SessionQuestion } from '../types';

export function adaptPracticeQuestion(pq: PracticeQuestion): SessionQuestion {
  return {
    id: pq.id,
    type: pq.type === 'sentence_order' ? 'sentence_order' : 'multiple_choice',
    prompt: pq.promptJp,
    promptSub: pq.promptEn,
    passage: pq.passage,
    options: [...pq.options],
    correctAnswer: pq.correctAnswer,
    explanation: pq.explanation,
    audioText: pq.audioText || pq.promptJp,
    level: pq.level,
    category: pq.category,
    metadata: {
      originalCategory: pq.category,
      isSentenceOrder: pq.type === 'sentence_order',
    },
  };
}

export function adaptPracticeQuestions(questions: PracticeQuestion[]): SessionQuestion[] {
  return questions.map(adaptPracticeQuestion);
}

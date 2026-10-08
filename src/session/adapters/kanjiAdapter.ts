import { KanjiQuizQuestion } from '../../types/kanjiStroke';
import { SessionQuestion } from '../types';

export function adaptKanjiQuizQuestion(kq: KanjiQuizQuestion): SessionQuestion {
  return {
    id: kq.id,
    type: 'kanji',
    prompt: kq.question,
    options: [...kq.options],
    correctAnswer: kq.correctAnswer,
    explanation: kq.explanation,
    category: 'kanji',
    metadata: {
      kanjiQuizType: kq.type,
    },
  };
}

export function adaptKanjiQuizQuestions(questions: KanjiQuizQuestion[]): SessionQuestion[] {
  return questions.map(adaptKanjiQuizQuestion);
}

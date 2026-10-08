import { MockTest, MockTestSection } from '../../types/practice';
import { SessionQuestion } from '../types';

export function adaptMockTestQuestions(mockTest: MockTest): SessionQuestion[] {
  const allQuestions: SessionQuestion[] = [];

  mockTest.sections.forEach((section: MockTestSection) => {
    section.questions.forEach((q) => {
      allQuestions.push({
        id: q.id,
        type: 'multiple_choice',
        prompt: q.promptJp,
        passage: q.passage,
        options: [...q.options],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        audioText: (q as any).audioScript || (q as any).audioPrompt || q.promptJp,
        level: q.level,
        category: q.category,
        sectionId: section.id,
        sectionTitle: section.title,
        metadata: {
          testId: mockTest.id,
          testLevel: mockTest.level,
          sectionId: section.id,
          sectionTitle: section.title,
          tags: (q as any).tags,
          readingPrompt: (q as any).readingPrompt,
        },
      });
    });
  });

  return allQuestions;
}

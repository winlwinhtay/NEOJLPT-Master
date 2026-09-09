import { JLPTLevel, UserProfile, UserSRSProgress } from '../types';

export interface StudyRecommendation {
  id: string;
  type: 'vocab_review' | 'weak_area' | 'next_lesson' | 'mock_test' | 'conversation';
  title: string;
  subtitle: string;
  actionView: string;
  actionPayload?: any;
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  reason: string;
}

export class RecommendationService {
  public static generateRecommendations(
    profile: UserProfile,
    srsProgress: UserSRSProgress[],
    categoryAccuracy: Record<string, number>, // e.g. { vocabulary: 85, grammar: 60, reading: 75, listening: 50 }
    nextUnfinishedLessonTitle?: string
  ): StudyRecommendation[] {
    const recommendations: StudyRecommendation[] = [];
    const now = new Date().toISOString();

    // 1. Check overdue SRS reviews
    const dueReviews = srsProgress.filter((item) => item.status !== 'new' && item.dueDate <= now);
    if (dueReviews.length > 0) {
      recommendations.push({
        id: 'rec-srs',
        type: 'vocab_review',
        title: `Spaced Repetition Review (${dueReviews.length} items)`,
        subtitle: 'Review memory items before they fade from long-term memory.',
        actionView: 'vocabulary',
        actionPayload: { filter: 'review' },
        priority: 'high',
        estimatedMinutes: Math.max(5, Math.ceil(dueReviews.length * 0.5)),
        reason: `${dueReviews.length} vocabulary & kanji cards are due today.`,
      });
    }

    // 2. Identify weakest skill area
    let lowestSkill = 'listening';
    let lowestAccuracy = 100;
    Object.entries(categoryAccuracy).forEach(([skill, acc]) => {
      if (acc < lowestAccuracy) {
        lowestAccuracy = acc;
        lowestSkill = skill;
      }
    });

    if (lowestAccuracy < 70) {
      recommendations.push({
        id: 'rec-weak-skill',
        type: 'weak_area',
        title: `Strengthen ${lowestSkill.toUpperCase()} (${lowestAccuracy}% accuracy)`,
        subtitle: `Boost your score with targeted ${profile.currentLevel} ${lowestSkill} practice drills.`,
        actionView: lowestSkill === 'listening' ? 'listening' : lowestSkill === 'reading' ? 'reading' : lowestSkill === 'grammar' ? 'grammar' : 'practice',
        priority: 'high',
        estimatedMinutes: 10,
        reason: `Your ${lowestSkill} accuracy is currently your lowest performance metric.`,
      });
    }

    // 3. Continue learning next lesson in roadmap
    if (nextUnfinishedLessonTitle) {
      recommendations.push({
        id: 'rec-next-lesson',
        type: 'next_lesson',
        title: `Next Up: ${nextUnfinishedLessonTitle}`,
        subtitle: 'Continue your structured step-by-step curriculum.',
        actionView: 'learn',
        priority: 'medium',
        estimatedMinutes: 15,
        reason: 'Keep your forward momentum towards passing your JLPT level.',
      });
    }

    // 4. Conversation practice suggestion
    recommendations.push({
      id: 'rec-ai-chat',
      type: 'conversation',
      title: `AI Japanese Conversation: Restaurant / Daily Life`,
      subtitle: 'Practice outputting sentences with AI instant grammar feedback.',
      actionView: 'ai-conversation',
      priority: 'medium',
      estimatedMinutes: 8,
      reason: 'Active sentence production solidifies grammar comprehension.',
    });

    return recommendations;
  }
}

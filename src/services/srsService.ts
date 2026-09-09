import { JLPTLevel, MasteryStatus, UserSRSProgress } from '../types';

export type SRSRating = 'again' | 'hard' | 'good' | 'easy'; // 1 (difficult), 2 (review), 3 (know), 4 (mastered)

export class SRSService {
  /**
   * Calculates the next review date, interval, and ease factor based on user rating.
   */
  public static calculateNextReview(
    currentProgress: UserSRSProgress,
    rating: SRSRating
  ): UserSRSProgress {
    const now = new Date();
    let { interval, easeFactor, repetitionCount, wrongCount, correctCount } = currentProgress;

    let quality = 3;
    switch (rating) {
      case 'again':
        quality = 1;
        break;
      case 'hard':
        quality = 2;
        break;
      case 'good':
        quality = 4;
        break;
      case 'easy':
        quality = 5;
        break;
    }

    if (quality < 3) {
      // Failed / Difficult
      repetitionCount = 0;
      interval = 1; // review tomorrow or same day
      wrongCount += 1;
    } else {
      // Successful recall
      correctCount += 1;
      if (repetitionCount === 0) {
        interval = 1;
      } else if (repetitionCount === 1) {
        interval = 3;
      } else if (repetitionCount === 2) {
        interval = 7;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitionCount += 1;
    }

    // Update Ease Factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;
    if (easeFactor > 2.8) easeFactor = 2.8;

    // Determine status
    let status: MasteryStatus = 'learning';
    if (repetitionCount >= 5 && interval >= 21) {
      status = 'mastered';
    } else if (repetitionCount >= 2) {
      status = 'review';
    } else if (quality < 3) {
      status = 'learning';
    }

    // Calculate due date
    const dueDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

    return {
      ...currentProgress,
      interval,
      easeFactor,
      repetitionCount,
      wrongCount,
      correctCount,
      status,
      lastReviewed: now.toISOString(),
      dueDate: dueDate.toISOString(),
    };
  }

  /**
   * Creates initial progress state for a new learning item
   */
  public static createInitialProgress(
    itemId: string,
    itemType: 'vocab' | 'kanji' | 'grammar',
    level: JLPTLevel
  ): UserSRSProgress {
    return {
      itemId,
      itemType,
      level,
      status: 'new',
      interval: 0,
      easeFactor: 2.5,
      repetitionCount: 0,
      dueDate: new Date().toISOString(),
      lastReviewed: '',
      wrongCount: 0,
      correctCount: 0,
      isFavorite: false,
    };
  }

  /**
   * Filters items that are due for review today
   */
  public static getDueItems(progressList: UserSRSProgress[]): UserSRSProgress[] {
    const now = new Date().toISOString();
    return progressList.filter((item) => item.status !== 'new' && item.dueDate <= now);
  }

  /**
   * Filters items marked as difficult or with high error rates
   */
  public static getDifficultItems(progressList: UserSRSProgress[]): UserSRSProgress[] {
    return progressList.filter((item) => item.wrongCount > 1 || item.easeFactor < 1.8);
  }
}

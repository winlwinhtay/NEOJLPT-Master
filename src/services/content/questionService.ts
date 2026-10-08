import { JLPTLevel } from '../../types';
import { PracticeQuestion, MockTest } from '../../types/practice';
import { PRACTICE_QUESTIONS } from '../../data/practiceData';
import { MOCK_TESTS } from '../../data/mockTestData';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { ContentValidationService } from './contentValidationService';
import { ContentFilter } from './types';

export class QuestionService {
  private static questionCache = new Map<string, PracticeQuestion>();
  private static initialized = false;

  private static initialize(): void {
    if (this.initialized) return;

    for (const q of PRACTICE_QUESTIONS) {
      this.questionCache.set(q.id, q);
    }

    this.initialized = true;
  }

  /**
   * Get practice questions for a specific level & category
   */
  public static async getPracticeQuestions(
    level: JLPTLevel,
    category: string = 'all',
    count?: number
  ): Promise<PracticeQuestion[]> {
    this.initialize();

    // 1. Check Supabase question bank if online
    if (isSupabaseConfigured()) {
      try {
        let query = supabase
          .from('ai_question_bank')
          .select('*')
          .eq('jlpt_level', level)
          .in('quality_status', ['validated', 'published']);

        if (category !== 'all') {
          query = query.eq('skill', category);
        }

        const { data, error } = await query.limit(count || 50);

        if (!error && data && data.length > 0) {
          const supabaseQuestions: PracticeQuestion[] = data.map((d: any) => ({
            id: d.id,
            type: d.question_type as any,
            level: d.jlpt_level as JLPTLevel,
            category: d.skill,
            promptJp: d.question_json?.prompt || '',
            readingPrompt: d.question_json?.readingPrompt,
            options: d.question_json?.options || [],
            correctAnswer: d.answer_json?.correctIndex ?? 0,
            explanation: d.answer_json?.explanation || d.explanation_json?.explanation || '',
            tags: [d.skill, d.difficulty],
          }));

          return count ? supabaseQuestions.slice(0, count) : supabaseQuestions;
        }
      } catch (e) {
        console.warn('QuestionService: Supabase query fallback to local pool:', e);
      }
    }

    // 2. Deterministic local question pool
    let list = Array.from(this.questionCache.values()).filter((q) => {
      if (q.level !== level) return false;
      if (category !== 'all' && q.category !== category) return false;
      return true;
    });

    if (count && count < list.length) {
      // Deterministic slice
      list = list.slice(0, count);
    }

    return list;
  }

  /**
   * Get mock test by key (e.g. 'mock-n5-01')
   */
  public static getMockTest(testKey: string): MockTest | undefined {
    return MOCK_TESTS[testKey] || MOCK_TESTS['mock-n5-01'];
  }

  /**
   * Filter practice questions for Admin panel
   */
  public static filterQuestions(filter: ContentFilter): { items: PracticeQuestion[]; total: number } {
    this.initialize();
    let result = Array.from(this.questionCache.values());

    if (filter.level && filter.level !== 'all') {
      result = result.filter((q) => q.level === filter.level);
    }
    if (filter.category && filter.category !== 'all') {
      result = result.filter((q) => q.category === filter.category);
    }
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.promptJp.toLowerCase().includes(q) ||
          item.explanation.toLowerCase().includes(q) ||
          item.options.some((o) => o.toLowerCase().includes(q))
      );
    }

    const total = result.length;
    if (filter.offset !== undefined && filter.limit !== undefined) {
      result = result.slice(filter.offset, filter.offset + filter.limit);
    } else if (filter.limit !== undefined) {
      result = result.slice(0, filter.limit);
    }

    return { items: result, total };
  }
}

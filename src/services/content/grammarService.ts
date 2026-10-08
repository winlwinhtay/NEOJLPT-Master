import { JLPTLevel, GrammarItem } from '../../types';
import { CurriculumGrammar, ContentFilter } from './types';
import { CANONICAL_GRAMMAR } from '../../data/canonicalGrammarData';
import { GRAMMAR_DATA as FULL_GRAMMAR } from '../../data/grammarData';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { ContentRelationshipService } from './contentRelationshipService';

export class GrammarService {
  private static cache = new Map<string, CurriculumGrammar>();
  private static patternIndex = new Map<string, string>(); // pattern -> id
  private static initialized = false;

  private static initialize(): void {
    if (this.initialized) return;

    // Load authentic CANONICAL_GRAMMAR items first
    for (const g of CANONICAL_GRAMMAR) {
      const item: CurriculumGrammar = {
        ...g,
        contentSource: 'verified_reference',
        qualityStatus: 'published',
        qualityScore: 99.0,
        contentVersion: 1,
        exampleSentenceIds: ContentRelationshipService.getExampleSentenceIdsForContent(g.id),
      };

      this.cache.set(g.id, item);
      this.patternIndex.set(g.pattern, g.id);
    }

    // Load full grammar dataset as fallback
    for (const g of FULL_GRAMMAR) {
      if (!this.cache.has(g.id) && !this.patternIndex.has(g.pattern)) {
        const item: CurriculumGrammar = {
          ...g,
          contentSource: 'legacy',
          qualityStatus: 'published',
          qualityScore: 93.0,
          contentVersion: 1,
          exampleSentenceIds: [],
        };
        this.cache.set(g.id, item);
        this.patternIndex.set(g.pattern, g.id);
      }
    }

    this.initialized = true;
  }

  /**
   * Get all Grammar points for a specific JLPT level
   */
  public static async getGrammarByLevel(level: JLPTLevel): Promise<CurriculumGrammar[]> {
    this.initialize();

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('curriculum_grammar')
          .select('*')
          .eq('jlpt_level', level)
          .in('quality_status', ['validated', 'published'])
          .order('id');

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            pattern: d.pattern,
            meaning: d.meaning,
            meaningsByLang: d.meanings_by_lang || {},
            structure: d.structure,
            explanation: d.explanation,
            explanationsByLang: d.explanations_by_lang || {},
            formalLevel: d.formal_level || 'polite',
            level: d.jlpt_level as JLPTLevel,
            difficulty: d.difficulty || 1,
            unitId: d.unit_id,
            contentSource: d.content_source,
            qualityStatus: d.quality_status,
            qualityScore: Number(d.quality_score) || 95.0,
            contentVersion: d.content_version || 1,
            exampleSentenceIds: d.example_sentence_ids || [],
            examples: Array.isArray(d.examples) ? d.examples : [],
            commonMistakes: Array.isArray(d.common_mistakes) ? d.common_mistakes : (d.common_mistakes ? [d.common_mistakes] : []),
            studyTip: d.study_tip,
          }));
        }
      } catch (e) {
        console.warn('GrammarService: Supabase query failed, using local validated data:', e);
      }
    }

    return Array.from(this.cache.values()).filter((g) => g.level === level);
  }

  /**
   * Get Grammar by ID
   */
  public static getGrammarById(id: string): CurriculumGrammar | undefined {
    this.initialize();
    return this.cache.get(id);
  }

  /**
   * Find Grammar by pattern (e.g. '〜ている' or '〜わけだ')
   */
  public static getGrammarByPattern(pattern: string): CurriculumGrammar | undefined {
    this.initialize();
    const id = this.patternIndex.get(pattern);
    if (id) return this.cache.get(id);

    // Fuzzy clean search
    const clean = pattern.replace(/^Grammar:\s*/i, '').replace(/^[〜~]/, '').trim();
    return Array.from(this.cache.values()).find(
      (g) =>
        g.pattern === pattern ||
        g.pattern.replace(/^[〜~]/, '').trim() === clean ||
        g.pattern.split('/')[0].replace(/^[〜~]/, '').trim() === clean ||
        g.pattern.split('/')[1]?.replace(/^[〜~]/, '').trim() === clean
    );
  }

  /**
   * Filter Grammar with advanced criteria (used by Admin & Grammar View)
   */
  public static filterGrammar(filter: ContentFilter): { items: CurriculumGrammar[]; total: number } {
    this.initialize();
    let result = Array.from(this.cache.values());

    if (filter.level && filter.level !== 'all') {
      result = result.filter((g) => g.level === filter.level);
    }
    if (filter.qualityStatus && filter.qualityStatus !== 'all') {
      result = result.filter((g) => g.qualityStatus === filter.qualityStatus);
    }
    if (filter.source && filter.source !== 'all') {
      result = result.filter((g) => g.contentSource === filter.source);
    }
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter(
        (g) =>
          g.pattern.toLowerCase().includes(q) ||
          g.meaning.toLowerCase().includes(q) ||
          g.structure.toLowerCase().includes(q)
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

  /**
   * Update Grammar quality/content (Admin)
   */
  public static updateGrammar(id: string, updates: Partial<CurriculumGrammar>): CurriculumGrammar | undefined {
    this.initialize();
    const item = this.cache.get(id);
    if (!item) return undefined;

    const updated: CurriculumGrammar = {
      ...item,
      ...updates,
      contentVersion: item.contentVersion + 1,
    };
    this.cache.set(id, updated);

    if (isSupabaseConfigured()) {
      supabase.from('curriculum_grammar').upsert({
        id: updated.id,
        pattern: updated.pattern,
        meaning: updated.meaning,
        meanings_by_lang: updated.meaningsByLang,
        structure: updated.structure,
        explanation: updated.explanation,
        explanations_by_lang: updated.explanationsByLang,
        formal_level: updated.formalLevel,
        jlpt_level: updated.level,
        difficulty: updated.difficulty,
        content_source: updated.contentSource,
        quality_status: updated.qualityStatus,
        quality_score: updated.qualityScore,
        content_version: updated.contentVersion,
        common_mistakes: updated.commonMistakes,
        study_tip: updated.studyTip,
      }).then(() => {});
    }

    return updated;
  }
}

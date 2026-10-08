import { JLPTLevel, VocabularyItem } from '../../types';
import { CurriculumVocabulary, ContentFilter } from './types';
import { VOCABULARY_DATA as FULL_VOCAB } from '../../data/vocabularyData';
import { VOCABULARY_DATA as SEED_VOCAB } from '../../data/vocabularySeed';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { ContentRelationshipService } from './contentRelationshipService';

export class VocabularyService {
  private static cache = new Map<string, CurriculumVocabulary>();
  private static initialized = false;

  private static initialize(): void {
    if (this.initialized) return;

    // Load curated seed data first (highest quality verified_reference)
    for (const v of SEED_VOCAB) {
      const item: CurriculumVocabulary = {
        ...v,
        contentSource: 'verified_reference',
        qualityStatus: 'published',
        qualityScore: 98.0,
        contentVersion: 1,
        exampleSentenceIds: ContentRelationshipService.getExampleSentenceIdsForContent(v.id),
        relatedKanjiIds: ContentRelationshipService.getRelatedKanjiIdsForVocab(v.id),
      };
      this.cache.set(v.id, item);
    }

    // Load full generated vocabulary as legacy / validated reference
    for (const v of FULL_VOCAB) {
      if (!this.cache.has(v.id)) {
        const item: CurriculumVocabulary = {
          ...v,
          contentSource: 'legacy',
          qualityStatus: 'published',
          qualityScore: 92.0,
          contentVersion: 1,
          exampleSentenceIds: [],
          relatedKanjiIds: [],
        };
        this.cache.set(v.id, item);
      }
    }

    this.initialized = true;
  }

  /**
   * Get all vocabulary for a specific JLPT level
   */
  public static async getVocabularyByLevel(level: JLPTLevel): Promise<CurriculumVocabulary[]> {
    this.initialize();

    // 1. Try Supabase first if configured
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('curriculum_vocabulary')
          .select('*')
          .eq('jlpt_level', level)
          .in('quality_status', ['validated', 'published'])
          .order('id');

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            word: d.word,
            kanji: d.kanji || d.word,
            hiragana: d.hiragana,
            romaji: d.romaji || '',
            meaning: d.meaning,
            meaningsByLang: d.meanings_by_lang || {},
            partOfSpeech: d.part_of_speech || 'Noun',
            level: d.jlpt_level as JLPTLevel,
            difficulty: d.difficulty || 1,
            exampleJp: '',
            exampleReading: '',
            exampleEn: '',
            tags: d.tags || [],
            unitId: d.unit_id,
            lessonId: d.lesson_id,
            contentSource: d.content_source,
            qualityStatus: d.quality_status,
            qualityScore: Number(d.quality_score) || 95.0,
            contentVersion: d.content_version || 1,
            exampleSentenceIds: d.example_sentence_ids || [],
          }));
        }
      } catch (e) {
        console.warn('VocabularyService: Supabase query failed, using local validated data:', e);
      }
    }

    // 2. Return validated in-memory curriculum
    return Array.from(this.cache.values()).filter((v) => v.level === level);
  }

  /**
   * Get vocabulary item by ID
   */
  public static getVocabularyById(id: string): CurriculumVocabulary | undefined {
    this.initialize();
    return this.cache.get(id);
  }

  /**
   * Search vocabulary
   */
  public static searchVocabulary(query: string, level?: JLPTLevel): CurriculumVocabulary[] {
    this.initialize();
    const q = query.trim().toLowerCase();
    if (!q) return level ? Array.from(this.cache.values()).filter((v) => v.level === level) : Array.from(this.cache.values());

    return Array.from(this.cache.values()).filter((v) => {
      if (level && v.level !== level) return false;
      return (
        v.word.toLowerCase().includes(q) ||
        v.hiragana.toLowerCase().includes(q) ||
        (v.romaji && v.romaji.toLowerCase().includes(q)) ||
        v.meaning.toLowerCase().includes(q)
      );
    });
  }

  /**
   * Filter vocabulary with advanced criteria (used by Admin & Study Modules)
   */
  public static filterVocabulary(filter: ContentFilter): { items: CurriculumVocabulary[]; total: number } {
    this.initialize();
    let result = Array.from(this.cache.values());

    if (filter.level && filter.level !== 'all') {
      result = result.filter((v) => v.level === filter.level);
    }
    if (filter.qualityStatus && filter.qualityStatus !== 'all') {
      result = result.filter((v) => v.qualityStatus === filter.qualityStatus);
    }
    if (filter.source && filter.source !== 'all') {
      result = result.filter((v) => v.contentSource === filter.source);
    }
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter(
        (v) =>
          v.word.toLowerCase().includes(q) ||
          v.hiragana.toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q)
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
   * Update vocabulary item quality/content (Admin)
   */
  public static updateVocabulary(id: string, updates: Partial<CurriculumVocabulary>): CurriculumVocabulary | undefined {
    this.initialize();
    const item = this.cache.get(id);
    if (!item) return undefined;

    const updated: CurriculumVocabulary = {
      ...item,
      ...updates,
      contentVersion: item.contentVersion + 1,
    };
    this.cache.set(id, updated);

    // Sync to Supabase if available
    if (isSupabaseConfigured()) {
      supabase.from('curriculum_vocabulary').upsert({
        id: updated.id,
        word: updated.word,
        kanji: updated.kanji,
        hiragana: updated.hiragana,
        romaji: updated.romaji,
        meaning: updated.meaning,
        meanings_by_lang: updated.meaningsByLang,
        part_of_speech: updated.partOfSpeech,
        jlpt_level: updated.level,
        difficulty: updated.difficulty,
        content_source: updated.contentSource,
        quality_status: updated.qualityStatus,
        quality_score: updated.qualityScore,
        content_version: updated.contentVersion,
      }).then(() => {});
    }

    return updated;
  }
}

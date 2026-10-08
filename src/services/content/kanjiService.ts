import { JLPTLevel, KanjiItem } from '../../types';
import { CurriculumKanji, ContentFilter } from './types';
import { KANJI_DATA as FULL_KANJI } from '../../data/kanjiData';
import { KANJI_DATA as SEED_KANJI } from '../../data/kanjiSeed';
import { getKanjiStrokeData } from '../../data/kanjiStrokeData';
import { getKanjiEducationalDetail } from '../../data/kanjiEducationalData';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { ContentRelationshipService } from './contentRelationshipService';

export class KanjiService {
  private static cache = new Map<string, CurriculumKanji>();
  private static kanjiCharIndex = new Map<string, string>(); // character -> id
  private static initialized = false;

  private static initialize(): void {
    if (this.initialized) return;

    // Load curated seed kanji first
    for (const k of SEED_KANJI) {
      const strokeData = getKanjiStrokeData(k.kanji);
      const eduDetail = getKanjiEducationalDetail(k.kanji, k.meaning, k.radicals?.[0] || k.kanji);

      const item: CurriculumKanji = {
        ...k,
        strokeSvgPaths: strokeData ? strokeData.strokes.map(s => s.d) : k.strokeSvgPaths,
        strokeCoordinates: k.strokeCoordinates || [],
        mnemonic: eduDetail?.mnemonic || k.mnemonic,
        componentsBreakdown: eduDetail?.components || k.componentsBreakdown,
        similarKanji: eduDetail?.similarKanji || k.similarKanji,
        contentSource: 'verified_reference',
        qualityStatus: 'published',
        qualityScore: 99.0,
        contentVersion: 1,
        exampleSentenceIds: ContentRelationshipService.getExampleSentenceIdsForContent(k.id),
        relatedVocabIds: ContentRelationshipService.getRelatedVocabIdsForKanji(k.id),
      };

      this.cache.set(k.id, item);
      this.kanjiCharIndex.set(k.kanji, k.id);
    }

    // Load full generated kanji as validated/legacy reference
    for (const k of FULL_KANJI) {
      if (!this.cache.has(k.id) && !this.kanjiCharIndex.has(k.kanji)) {
        const item: CurriculumKanji = {
          ...k,
          contentSource: 'legacy',
          qualityStatus: 'published',
          qualityScore: 94.0,
          contentVersion: 1,
          exampleSentenceIds: [],
          relatedVocabIds: [],
        };
        this.cache.set(k.id, item);
        this.kanjiCharIndex.set(k.kanji, k.id);
      }
    }

    this.initialized = true;
  }

  /**
   * Get all Kanji for a specific JLPT level
   */
  public static async getKanjiByLevel(level: JLPTLevel): Promise<CurriculumKanji[]> {
    this.initialize();

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('curriculum_kanji')
          .select('*')
          .eq('jlpt_level', level)
          .in('quality_status', ['validated', 'published'])
          .order('id');

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            kanji: d.kanji,
            meaning: d.meaning,
            meaningsByLang: d.meanings_by_lang || {},
            onyomi: d.onyomi || [],
            kunyomi: d.kunyomi || [],
            romajiOnyomi: d.romaji_onyomi || [],
            romajiKunyomi: d.romaji_kunyomi || [],
            strokeCount: d.stroke_count || 1,
            level: d.jlpt_level as JLPTLevel,
            radicals: d.radicals || [],
            strokeCoordinates: d.stroke_coordinates || [],
            exampleVocab: d.example_vocab || [],
            similarKanji: d.similar_kanji || [],
            confusingKanji: d.confusing_kanji || [],
            mnemonic: d.mnemonic,
            unitId: d.unit_id,
            contentSource: d.content_source,
            qualityStatus: d.quality_status,
            qualityScore: Number(d.quality_score) || 95.0,
            contentVersion: d.content_version || 1,
            exampleSentenceIds: d.example_sentence_ids || [],
          }));
        }
      } catch (e) {
        console.warn('KanjiService: Supabase query failed, using local validated data:', e);
      }
    }

    return Array.from(this.cache.values()).filter((k) => k.level === level);
  }

  /**
   * Get Kanji by ID
   */
  public static getKanjiById(id: string): CurriculumKanji | undefined {
    this.initialize();
    return this.cache.get(id);
  }

  /**
   * Get Kanji by character (e.g. '日')
   */
  public static getKanjiByChar(char: string): CurriculumKanji | undefined {
    this.initialize();
    const id = this.kanjiCharIndex.get(char);
    return id ? this.cache.get(id) : undefined;
  }

  /**
   * Filter Kanji with advanced criteria (used by Admin & Kanji View)
   */
  public static filterKanji(filter: ContentFilter): { items: CurriculumKanji[]; total: number } {
    this.initialize();
    let result = Array.from(this.cache.values());

    if (filter.level && filter.level !== 'all') {
      result = result.filter((k) => k.level === filter.level);
    }
    if (filter.qualityStatus && filter.qualityStatus !== 'all') {
      result = result.filter((k) => k.qualityStatus === filter.qualityStatus);
    }
    if (filter.source && filter.source !== 'all') {
      result = result.filter((k) => k.contentSource === filter.source);
    }
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter(
        (k) =>
          k.kanji.toLowerCase().includes(q) ||
          k.meaning.toLowerCase().includes(q) ||
          k.onyomi.some((o) => o.toLowerCase().includes(q)) ||
          k.kunyomi.some((u) => u.toLowerCase().includes(q))
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
   * Update Kanji quality/content (Admin)
   */
  public static updateKanji(id: string, updates: Partial<CurriculumKanji>): CurriculumKanji | undefined {
    this.initialize();
    const item = this.cache.get(id);
    if (!item) return undefined;

    const updated: CurriculumKanji = {
      ...item,
      ...updates,
      contentVersion: item.contentVersion + 1,
    };
    this.cache.set(id, updated);

    if (isSupabaseConfigured()) {
      supabase.from('curriculum_kanji').upsert({
        id: updated.id,
        kanji: updated.kanji,
        meaning: updated.meaning,
        meanings_by_lang: updated.meaningsByLang,
        onyomi: updated.onyomi,
        kunyomi: updated.kunyomi,
        stroke_count: updated.strokeCount,
        jlpt_level: updated.level,
        content_source: updated.contentSource,
        quality_status: updated.qualityStatus,
        quality_score: updated.qualityScore,
        content_version: updated.contentVersion,
      }).then(() => {});
    }

    return updated;
  }
}

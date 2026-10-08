import { CurriculumExampleSentence } from './types';
import { CANONICAL_GRAMMAR } from '../../data/canonicalGrammarData';
import { KANJI_DATA as SEED_KANJI } from '../../data/kanjiSeed';
import { VOCABULARY_DATA as SEED_VOCAB } from '../../data/vocabularySeed';
import { BESPOKE_SENTENCES } from '../../data/generators/kanjiGenerator';
import { translateExampleSentence } from '../../data/translations/multilingualEngine';
import { speechService } from '../speechService';
import { SupportedLanguage } from '../../types/i18n';
import { ContentValidationService } from './contentValidationService';

export class ExampleSentenceService {
  private static sentences: CurriculumExampleSentence[] = [];
  private static sentenceMap = new Map<string, CurriculumExampleSentence>();
  private static normalizedIndex = new Map<string, string>(); // normText -> id
  private static grammarIndex = new Map<string, string[]>();  // grammarId -> sentenceIds[]
  private static vocabIndex = new Map<string, string[]>();    // vocabId -> sentenceIds[]
  private static kanjiIndex = new Map<string, string[]>();    // kanjiId -> sentenceIds[]
  private static initialized = false;

  public static initialize(): void {
    if (this.initialized) return;

    let autoId = 1;

    // 1. Ingest Canonical Grammar Example Sentences
    for (const g of CANONICAL_GRAMMAR) {
      if (Array.isArray(g.examples)) {
        for (const ex of g.examples) {
          if (!ex.jp) continue;
          const id = `ex-g-${g.id}-${autoId++}`;
          const cleanNorm = ex.jp.replace(/[。、！？\s]/g, '');

          // Check if already registered
          if (this.normalizedIndex.has(cleanNorm)) {
            const existingId = this.normalizedIndex.get(cleanNorm)!;
            const existing = this.sentenceMap.get(existingId);
            if (existing && g.id) {
              if (!existing.grammarIds?.includes(g.id)) {
                existing.grammarIds = [...(existing.grammarIds || []), g.id];
              }
              const gList = this.grammarIndex.get(g.id) || [];
              if (!gList.includes(existingId)) gList.push(existingId);
              this.grammarIndex.set(g.id, gList);
            }
            continue;
          }

          const translations: Partial<Record<SupportedLanguage, string>> = {
            ...((ex.translationsByLang as any) || {}),
            en: ex.en || 'Example sentence',
            ja: ex.jp,
            my: ex.translationsByLang?.my || translateExampleSentence(ex.jp, ex.en || '', 'my'),
          };

          const item: CurriculumExampleSentence = {
            id,
            japanese: ex.jp,
            reading: ex.reading || ex.jp,
            translationEn: ex.en || '',
            translationsByLang: translations,
            jlptLevel: g.level,
            difficulty: g.difficulty || 1,
            context: 'grammar_concept',
            register: (g.formalLevel as any) || 'polite',
            grammarIds: [g.id],
            vocabularyIds: [],
            kanjiIds: [],
            contentSource: 'verified_reference',
            qualityStatus: 'published',
            qualityScore: 98.0,
            contentVersion: 1,
          };

          this.registerSentence(item);
        }
      }
    }

    // 2. Ingest Seed Kanji Example Sentences
    for (const k of SEED_KANJI) {
      if (k.exampleSentence?.jp) {
        const ex = k.exampleSentence;
        const cleanNorm = ex.jp.replace(/[。、！？\s]/g, '');

        if (this.normalizedIndex.has(cleanNorm)) {
          const existingId = this.normalizedIndex.get(cleanNorm)!;
          const existing = this.sentenceMap.get(existingId);
          if (existing && k.id) {
            if (!existing.kanjiIds?.includes(k.id)) {
              existing.kanjiIds = [...(existing.kanjiIds || []), k.id];
            }
            const kList = this.kanjiIndex.get(k.id) || [];
            if (!kList.includes(existingId)) kList.push(existingId);
            this.kanjiIndex.set(k.id, kList);
          }
          continue;
        }

        const id = `ex-k-${k.id}-${autoId++}`;
        const bespoke = BESPOKE_SENTENCES[ex.jp] || {};
        const translations: Partial<Record<SupportedLanguage, string>> = {
          ...bespoke,
          en: ex.en || 'Example sentence',
          ja: ex.jp,
          my: bespoke.my || translateExampleSentence(ex.jp, ex.en || '', 'my'),
        };

        const item: CurriculumExampleSentence = {
          id,
          japanese: ex.jp,
          reading: ex.reading || ex.jp,
          translationEn: ex.en || '',
          translationsByLang: translations,
          jlptLevel: k.level,
          difficulty: 1,
          context: 'kanji_usage',
          register: 'polite',
          grammarIds: [],
          vocabularyIds: [],
          kanjiIds: [k.id],
          contentSource: 'verified_reference',
          qualityStatus: 'published',
          qualityScore: 98.0,
          contentVersion: 1,
        };

        this.registerSentence(item);
      }
    }

    // 3. Ingest Seed Vocabulary Example Sentences
    for (const v of SEED_VOCAB) {
      if (v.exampleJp) {
        const cleanNorm = v.exampleJp.replace(/[。、！？\s]/g, '');

        if (this.normalizedIndex.has(cleanNorm)) {
          const existingId = this.normalizedIndex.get(cleanNorm)!;
          const existing = this.sentenceMap.get(existingId);
          if (existing && v.id) {
            if (!existing.vocabularyIds?.includes(v.id)) {
              existing.vocabularyIds = [...(existing.vocabularyIds || []), v.id];
            }
            const vList = this.vocabIndex.get(v.id) || [];
            if (!vList.includes(existingId)) vList.push(existingId);
            this.vocabIndex.set(v.id, vList);
          }
          continue;
        }

        const id = `ex-v-${v.id}-${autoId++}`;
        const bespoke = BESPOKE_SENTENCES[v.exampleJp] || {};
        const translations: Partial<Record<SupportedLanguage, string>> = {
          ...bespoke,
          en: v.exampleEn || 'Example sentence',
          ja: v.exampleJp,
          my: bespoke.my || translateExampleSentence(v.exampleJp, v.exampleEn || '', 'my'),
        };

        const item: CurriculumExampleSentence = {
          id,
          japanese: v.exampleJp,
          reading: v.exampleReading || v.exampleJp,
          translationEn: v.exampleEn || '',
          translationsByLang: translations,
          jlptLevel: v.level,
          difficulty: v.difficulty || 1,
          context: 'daily_conversation',
          register: 'polite',
          grammarIds: [],
          vocabularyIds: [v.id],
          kanjiIds: [],
          contentSource: 'verified_reference',
          qualityStatus: 'published',
          qualityScore: 98.0,
          contentVersion: 1,
        };

        this.registerSentence(item);
      }
    }

    this.initialized = true;
  }

  private static registerSentence(sentence: CurriculumExampleSentence): void {
    this.sentences.push(sentence);
    this.sentenceMap.set(sentence.id, sentence);
    const cleanNorm = sentence.japanese.replace(/[。、！？\s]/g, '');
    this.normalizedIndex.set(cleanNorm, sentence.id);

    if (sentence.grammarIds) {
      for (const gid of sentence.grammarIds) {
        const list = this.grammarIndex.get(gid) || [];
        if (!list.includes(sentence.id)) list.push(sentence.id);
        this.grammarIndex.set(gid, list);
      }
    }
    if (sentence.vocabularyIds) {
      for (const vid of sentence.vocabularyIds) {
        const list = this.vocabIndex.get(vid) || [];
        if (!list.includes(sentence.id)) list.push(sentence.id);
        this.vocabIndex.set(vid, list);
      }
    }
    if (sentence.kanjiIds) {
      for (const kid of sentence.kanjiIds) {
        const list = this.kanjiIndex.get(kid) || [];
        if (!list.includes(sentence.id)) list.push(sentence.id);
        this.kanjiIndex.set(kid, list);
      }
    }
  }

  /**
   * Get all sentences
   */
  public static getAllSentences(): CurriculumExampleSentence[] {
    this.initialize();
    return this.sentences;
  }

  /**
   * Get sentence by ID
   */
  public static getSentenceById(id: string): CurriculumExampleSentence | undefined {
    this.initialize();
    return this.sentenceMap.get(id);
  }

  /**
   * Find sentence by Japanese text (exact or normalized)
   */
  public static findByJapanese(jpText: string): CurriculumExampleSentence | undefined {
    this.initialize();
    const cleanNorm = jpText.replace(/[。、！？\s]/g, '');
    const id = this.normalizedIndex.get(cleanNorm);
    if (id) return this.sentenceMap.get(id);
    return this.sentences.find((s) => s.japanese === jpText);
  }

  /**
   * Find sentences related to a grammar point
   */
  public static getSentencesForGrammar(grammarId: string): CurriculumExampleSentence[] {
    this.initialize();
    const ids = this.grammarIndex.get(grammarId) || [];
    return ids.map((id) => this.sentenceMap.get(id)!).filter(Boolean);
  }

  /**
   * Find sentences related to a vocabulary item
   */
  public static getSentencesForVocab(vocabId: string): CurriculumExampleSentence[] {
    this.initialize();
    const ids = this.vocabIndex.get(vocabId) || [];
    return ids.map((id) => this.sentenceMap.get(id)!).filter(Boolean);
  }

  /**
   * Find sentences related to a Kanji character
   */
  public static getSentencesForKanji(kanjiId: string): CurriculumExampleSentence[] {
    this.initialize();
    const ids = this.kanjiIndex.get(kanjiId) || [];
    return ids.map((id) => this.sentenceMap.get(id)!).filter(Boolean);
  }

  /**
   * Translate a sentence into the learner's preferred support language
   */
  public static getSentenceTranslation(sentence: CurriculumExampleSentence, lang: SupportedLanguage): string {
    if (sentence.translationsByLang?.[lang]) {
      return sentence.translationsByLang[lang]!;
    }
    // Fallback to multilingual translation engine
    return translateExampleSentence(sentence.japanese, sentence.translationEn, lang) || sentence.translationEn;
  }

  /**
   * Play high-quality speech for sentence
   */
  public static playAudio(sentence: CurriculumExampleSentence): void {
    speechService.speakJapanese(sentence.japanese);
  }
}

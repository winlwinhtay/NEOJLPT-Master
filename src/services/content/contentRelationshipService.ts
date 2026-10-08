import { ContentRelation } from './types';
import { KANJI_DATA as SEED_KANJI } from '../../data/kanjiSeed';
import { VOCABULARY_DATA as SEED_VOCAB } from '../../data/vocabularySeed';
import { CANONICAL_GRAMMAR } from '../../data/canonicalGrammarData';
import { READING_DATA } from '../../data/readingData';
import { LISTENING_DATA } from '../../data/listeningData';
import { ExampleSentenceService } from './exampleSentenceService';

export class ContentRelationshipService {
  private static relations: ContentRelation[] = [];
  private static relationsBySource = new Map<string, ContentRelation[]>();
  private static relationsByTarget = new Map<string, ContentRelation[]>();
  private static initialized = false;

  public static initialize(): void {
    if (this.initialized) return;

    ExampleSentenceService.initialize();

    // 1. Build Kanji <-> Vocabulary Relations
    for (const k of SEED_KANJI) {
      if (Array.isArray(k.exampleVocab)) {
        for (const ev of k.exampleVocab) {
          // Find matching vocab in seed
          const matchedVocab = SEED_VOCAB.find((v) => v.word === ev.word || v.kanji === ev.word);
          if (matchedVocab) {
            this.addRelation({
              sourceId: k.id,
              sourceType: 'kanji',
              targetId: matchedVocab.id,
              targetType: 'vocabulary',
              relationType: 'uses_kanji',
              confidence: 1.0,
            });
            this.addRelation({
              sourceId: matchedVocab.id,
              sourceType: 'vocabulary',
              targetId: k.id,
              targetType: 'kanji',
              relationType: 'uses_kanji',
              confidence: 1.0,
            });
          }
        }
      }

      // Link Kanji to its example sentences
      const sentences = ExampleSentenceService.getSentencesForKanji(k.id);
      for (const s of sentences) {
        this.addRelation({
          sourceId: k.id,
          sourceType: 'kanji',
          targetId: s.id,
          targetType: 'example_sentence',
          relationType: 'example_of',
          confidence: 1.0,
        });
      }
    }

    // 2. Build Vocabulary <-> Example Sentences & Grammar Relations
    for (const v of SEED_VOCAB) {
      const sentences = ExampleSentenceService.getSentencesForVocab(v.id);
      for (const s of sentences) {
        this.addRelation({
          sourceId: v.id,
          sourceType: 'vocabulary',
          targetId: s.id,
          targetType: 'example_sentence',
          relationType: 'example_of',
          confidence: 1.0,
        });
      }
    }

    // 3. Build Grammar <-> Example Sentences Relations
    for (const g of CANONICAL_GRAMMAR) {
      const sentences = ExampleSentenceService.getSentencesForGrammar(g.id);
      for (const s of sentences) {
        this.addRelation({
          sourceId: g.id,
          sourceType: 'grammar',
          targetId: s.id,
          targetType: 'example_sentence',
          relationType: 'example_of',
          confidence: 1.0,
        });
      }
    }

    // 4. Build Reading <-> Vocabulary Relations
    for (const r of READING_DATA) {
      if (Array.isArray(r.vocabularyList)) {
        for (const vl of r.vocabularyList) {
          const matched = SEED_VOCAB.find((v) => v.word === vl.word || v.kanji === vl.word);
          if (matched) {
            this.addRelation({
              sourceId: r.id,
              sourceType: 'reading',
              targetId: matched.id,
              targetType: 'vocabulary',
              relationType: 'uses_vocab',
              confidence: 1.0,
            });
          }
        }
      }
    }

    // 5. Build Listening <-> Vocabulary Relations
    for (const l of LISTENING_DATA) {
      if (Array.isArray(l.vocabNotes)) {
        for (const vn of l.vocabNotes) {
          const matched = SEED_VOCAB.find((v) => v.word === vn.word || v.kanji === vn.word);
          if (matched) {
            this.addRelation({
              sourceId: l.id,
              sourceType: 'listening',
              targetId: matched.id,
              targetType: 'vocabulary',
              relationType: 'uses_vocab',
              confidence: 1.0,
            });
          }
        }
      }
    }

    this.initialized = true;
  }

  private static addRelation(rel: ContentRelation): void {
    this.relations.push(rel);

    const sList = this.relationsBySource.get(rel.sourceId) || [];
    sList.push(rel);
    this.relationsBySource.set(rel.sourceId, sList);

    const tList = this.relationsByTarget.get(rel.targetId) || [];
    tList.push(rel);
    this.relationsByTarget.set(rel.targetId, tList);
  }

  /**
   * Get all relations where source is ID
   */
  public static getOutboundRelations(sourceId: string): ContentRelation[] {
    this.initialize();
    return this.relationsBySource.get(sourceId) || [];
  }

  /**
   * Get all relations where target is ID
   */
  public static getInboundRelations(targetId: string): ContentRelation[] {
    this.initialize();
    return this.relationsByTarget.get(targetId) || [];
  }

  /**
   * Get related vocabulary IDs for a given Kanji ID
   */
  public static getRelatedVocabIdsForKanji(kanjiId: string): string[] {
    return this.getOutboundRelations(kanjiId)
      .filter((r) => r.targetType === 'vocabulary')
      .map((r) => r.targetId);
  }

  /**
   * Get related Kanji IDs for a given Vocabulary ID
   */
  public static getRelatedKanjiIdsForVocab(vocabId: string): string[] {
    return this.getOutboundRelations(vocabId)
      .filter((r) => r.targetType === 'kanji')
      .map((r) => r.targetId);
  }

  /**
   * Get example sentence IDs for a given content ID
   */
  public static getExampleSentenceIdsForContent(contentId: string): string[] {
    return this.getOutboundRelations(contentId)
      .filter((r) => r.targetType === 'example_sentence')
      .map((r) => r.targetId);
  }
}

import { VocabularyService } from './vocabularyService';
import { KanjiService } from './kanjiService';
import { GrammarService } from './grammarService';
import { ExampleSentenceService } from './exampleSentenceService';
import { ReadingService } from './readingService';
import { ListeningService } from './listeningService';
import { QuestionService } from './questionService';
import { ContentValidationService } from './contentValidationService';
import { ContentRelationshipService } from './contentRelationshipService';
import { JLPTLevel } from '../../types';

export class ContentService {
  public static readonly vocabulary = VocabularyService;
  public static readonly kanji = KanjiService;
  public static readonly grammar = GrammarService;
  public static readonly sentences = ExampleSentenceService;
  public static readonly reading = ReadingService;
  public static readonly listening = ListeningService;
  public static readonly questions = QuestionService;
  public static readonly validation = ContentValidationService;
  public static readonly relations = ContentRelationshipService;

  private static initialized = false;

  /**
   * Initialize all content services and preload verified relationships
   */
  public static initialize(): void {
    if (this.initialized) return;

    ExampleSentenceService.initialize();
    ContentRelationshipService.initialize();
    // Warm up in-memory caches
    VocabularyService.searchVocabulary('');
    KanjiService.filterKanji({ limit: 1 });
    GrammarService.filterGrammar({ limit: 1 });

    this.initialized = true;
  }

  /**
   * Get total inventory statistics across all curriculum items
   */
  public static getInventoryStats(): {
    vocabularyCount: number;
    kanjiCount: number;
    grammarCount: number;
    sentenceCount: number;
    readingCount: number;
    listeningCount: number;
    questionCount: number;
  } {
    this.initialize();

    return {
      vocabularyCount: VocabularyService.filterVocabulary({}).total,
      kanjiCount: KanjiService.filterKanji({}).total,
      grammarCount: GrammarService.filterGrammar({}).total,
      sentenceCount: ExampleSentenceService.getAllSentences().length,
      readingCount: ReadingService.filterReadings({}).total,
      listeningCount: ListeningService.filterListening({}).total,
      questionCount: QuestionService.filterQuestions({}).total,
    };
  }
}

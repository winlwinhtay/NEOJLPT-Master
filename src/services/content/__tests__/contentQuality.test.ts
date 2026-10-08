import { ContentService } from '../contentService';
import { ContentValidationService } from '../contentValidationService';

/**
 * Quality Verification Suite for JLPT Core Canonical Items
 * Covers Section 51 & 60 of Master Implementation Prompt
 */
export function runContentQualityAudit(): {
  allPassed: boolean;
  results: { name: string; type: string; passed: boolean; details: any }[];
} {
  ContentService.initialize();
  const results: { name: string; type: string; passed: boolean; details: any }[] = [];

  // 1. Vocabulary Test Cases
  const targetVocab = [
    { word: '食べる', reading: 'たべる', level: 'N5', expectedMeaning: 'eat' },
    { word: '飲む', reading: 'のむ', level: 'N5', expectedMeaning: 'drink' },
    { word: '働く', reading: 'はたらく', level: 'N5', expectedMeaning: 'work' },
    { word: '勉強する', reading: 'べんきょうする', level: 'N5', expectedMeaning: 'study' },
    { word: '経験', reading: 'けいけん', level: 'N3', expectedMeaning: 'experience' },
    { word: '必要', reading: 'ひつよう', level: 'N4', expectedMeaning: 'necessary' },
  ];

  for (const t of targetVocab) {
    const vocabList = ContentService.vocabulary.searchVocabulary(t.word);
    const match = vocabList.find((v) => v.word === t.word || v.kanji === t.word);
    if (!match) {
      results.push({
        name: t.word,
        type: 'vocabulary',
        passed: false,
        details: `Vocabulary 「${t.word}」 not found in curriculum catalog.`,
      });
      continue;
    }

    const validation = ContentValidationService.validateVocabulary(match);
    const readingMatch = match.hiragana === t.reading;
    const meaningMatch = match.meaning.toLowerCase().includes(t.expectedMeaning.toLowerCase());

    const passed = validation.isValid && readingMatch && meaningMatch;
    results.push({
      name: t.word,
      type: 'vocabulary',
      passed,
      details: {
        hiragana: match.hiragana,
        expectedReading: t.reading,
        meaning: match.meaning,
        level: match.level,
        validationScore: validation.score,
        errors: validation.errors,
      },
    });
  }

  // 2. Kanji Test Cases
  const targetKanji = [
    { char: '学', level: 'N5', expectedMeaning: 'study' },
    { char: '生', level: 'N5', expectedMeaning: 'life' },
    { char: '日', level: 'N5', expectedMeaning: 'day' },
    { char: '本', level: 'N5', expectedMeaning: 'book' },
    { char: '語', level: 'N5', expectedMeaning: 'language' },
    { char: '時', level: 'N5', expectedMeaning: 'time' },
  ];

  for (const t of targetKanji) {
    const match = ContentService.kanji.getKanjiByChar(t.char);
    if (!match) {
      results.push({
        name: t.char,
        type: 'kanji',
        passed: false,
        details: `Kanji 「${t.char}」 not found in curriculum catalog.`,
      });
      continue;
    }

    const validation = ContentValidationService.validateKanji(match);
    const strokeValid = Array.isArray(match.strokeCoordinates) && match.strokeCoordinates.length > 0;
    const meaningValid = match.meaning.toLowerCase().includes(t.expectedMeaning.toLowerCase());

    const passed = validation.isValid && strokeValid && meaningValid;
    results.push({
      name: t.char,
      type: 'kanji',
      passed,
      details: {
        kanji: match.kanji,
        strokeCount: match.strokeCount,
        hasStrokes: strokeValid,
        onyomi: match.onyomi,
        kunyomi: match.kunyomi,
        meaning: match.meaning,
        level: match.level,
        score: validation.score,
      },
    });
  }

  // 3. Grammar Test Cases
  const targetGrammar = [
    { pattern: '〜ている', level: 'N5', search: 'ている' },
    { pattern: '〜たことがある', level: 'N5', search: 'たことがある' },
    { pattern: '〜ながら', level: 'N5', search: 'ながら' },
    { pattern: '〜そうだ', level: 'N4', search: 'そうだ' },
    { pattern: '〜ようになる', level: 'N4', search: 'ようになる' },
  ];

  for (const t of targetGrammar) {
    const match = ContentService.grammar.getGrammarByPattern(t.pattern) ||
                  ContentService.grammar.filterGrammar({ searchQuery: t.search }).items[0];

    if (!match) {
      results.push({
        name: t.pattern,
        type: 'grammar',
        passed: false,
        details: `Grammar 「${t.pattern}」 not found in curriculum catalog.`,
      });
      continue;
    }

    const validation = ContentValidationService.validateGrammar(match);
    const hasStructure = Boolean(match.structure && match.structure.length > 0);
    const hasExplanation = Boolean(match.explanation && match.explanation.length > 0);
    const hasExamples = Array.isArray(match.examples) && match.examples.length > 0;

    const passed = validation.isValid && hasStructure && hasExplanation && hasExamples;
    results.push({
      name: t.pattern,
      type: 'grammar',
      passed,
      details: {
        pattern: match.pattern,
        structure: match.structure,
        meaning: match.meaning,
        level: match.level,
        exampleCount: match.examples?.length || 0,
        score: validation.score,
        errors: validation.errors,
      },
    });
  }

  const allPassed = results.every((r) => r.passed);
  return { allPassed, results };
}

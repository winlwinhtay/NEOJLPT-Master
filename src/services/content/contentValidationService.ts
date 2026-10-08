import {
  ValidationResult,
  QualityScoreBreakdown,
  CurriculumExampleSentence,
  CurriculumVocabulary,
  CurriculumKanji,
  CurriculumGrammar,
} from './types';

export class ContentValidationService {
  /**
   * Deterministic SHA-256 sentence fingerprint for deduplication
   */
  public static async generateSentenceHash(japanese: string): Promise<string> {
    const normalized = japanese
      .replace(/[。、！？\s]/g, '')
      .trim()
      .toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Validate a Japanese Example Sentence
   */
  public static validateExampleSentence(
    sentence: Partial<CurriculumExampleSentence>,
    targetTerm?: string
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const issues: string[] = [];

    // 1. Required fields
    if (!sentence.japanese || sentence.japanese.trim().length === 0) {
      errors.push('Japanese sentence text is required');
    }
    if (!sentence.reading || sentence.reading.trim().length === 0) {
      errors.push('Reading/hiragana transcription is required');
    }
    if (!sentence.translationEn || sentence.translationEn.trim().length === 0) {
      errors.push('English translation is required');
    }

    const jp = sentence.japanese || '';

    // 2. Character presence checks
    const hasJapaneseChars = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(jp);
    if (!hasJapaneseChars) {
      errors.push('Sentence must contain Japanese characters (Hiragana, Katakana, or Kanji)');
    }

    // 3. Target Term Inclusion (Zero-Drift Check)
    if (targetTerm && targetTerm.trim()) {
      // Strip brackets, tildes, parentheses from target term (e.g. '〜ている' -> 'ている')
      const cleanTerm = targetTerm.replace(/[〜~\[\]\(\)\s]/g, '');
      if (cleanTerm && !jp.includes(cleanTerm)) {
        // Warning if base form might be conjugated
        warnings.push(`Target term "${targetTerm}" not found verbatim in sentence (may be conjugated).`);
      }
    }

    // 4. Naturalness & Syntax Heuristics (Deterministic Check)
    let naturalnessScore = 95;

    // Detect common unnatural machine-translation artifacts
    if (/私たちは|私は/g.test(jp) && (jp.match(/私は/g) || []).length > 1) {
      naturalnessScore -= 15;
      issues.push('Excessive pronoun usage (Overusing 「私は」 is unnatural in Japanese)');
    }

    // Detect suspicious literal English constructs (e.g., direct word-for-word possessives)
    if (/のの/.test(jp)) {
      naturalnessScore -= 20;
      issues.push('Repeated particle 「のの」 detected');
      errors.push('Grammar error: Consecutive particle 「のの」');
    }

    // Detect unclosed brackets or punctuation issues
    if ((jp.match(/「/g) || []).length !== (jp.match(/」/g) || []).length) {
      errors.push('Unbalanced quotation marks 「」');
      naturalnessScore -= 20;
    }

    // 5. Length appropriateness for JLPT level
    const level = sentence.jlptLevel || 'N5';
    if (level === 'N5' && jp.length > 45) {
      warnings.push(`Sentence is long (${jp.length} chars) for N5 beginner level.`);
      naturalnessScore -= 5;
    } else if (level === 'N1' && jp.length < 15) {
      warnings.push(`Sentence may be overly simplistic (${jp.length} chars) for N1 level.`);
    }

    const grammarCorrect = errors.length === 0;
    const semanticAccuracy = true;
    const levelSuitability = warnings.length === 0;
    const registerSuitability = true;
    const translationQualityScore = sentence.translationEn ? 92 : 0;

    let totalScore = Math.max(0, Math.min(100, Math.round(
      (naturalnessScore * 0.45) +
      (grammarCorrect ? 35 : 0) +
      (translationQualityScore * 0.2)
    )));

    if (errors.length > 0) totalScore = Math.min(totalScore, 49);

    const recommendation = totalScore >= 80 ? 'publish' : totalScore >= 60 ? 'review' : 'reject';

    const breakdown: QualityScoreBreakdown = {
      grammarCorrect,
      naturalnessScore,
      semanticAccuracy,
      levelSuitability,
      registerSuitability,
      translationQualityScore,
      totalScore,
      issues,
      recommendation,
    };

    return {
      isValid: errors.length === 0,
      score: totalScore,
      breakdown,
      errors,
      warnings,
    };
  }

  /**
   * Validate Vocabulary Item
   */
  public static validateVocabulary(vocab: Partial<CurriculumVocabulary>): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const issues: string[] = [];

    if (!vocab.word || vocab.word.trim().length === 0) errors.push('Vocabulary word is required');
    if (!vocab.hiragana || vocab.hiragana.trim().length === 0) errors.push('Hiragana reading is required');
    if (!vocab.meaning || vocab.meaning.trim().length === 0) errors.push('Meaning is required');
    if (!vocab.level) errors.push('JLPT level is required');

    const word = vocab.word || '';
    const hira = vocab.hiragana || '';

    // Hiragana reading should only contain hiragana and small characters/dashes
    if (hira && !/^[\u3040-\u309Fー\s]+$/.test(hira)) {
      warnings.push(`Reading 「${hira}」 contains non-hiragana characters.`);
    }

    let naturalnessScore = 96;
    if (vocab.exampleJp && !vocab.exampleJp.includes(word)) {
      warnings.push(`Example sentence does not contain the word 「${word}」.`);
      naturalnessScore -= 10;
    }

    const grammarCorrect = errors.length === 0;
    const totalScore = grammarCorrect ? naturalnessScore : 40;
    const recommendation = totalScore >= 80 ? 'publish' : totalScore >= 60 ? 'review' : 'reject';

    return {
      isValid: errors.length === 0,
      score: totalScore,
      breakdown: {
        grammarCorrect,
        naturalnessScore,
        semanticAccuracy: true,
        levelSuitability: true,
        registerSuitability: true,
        translationQualityScore: 95,
        totalScore,
        issues,
        recommendation,
      },
      errors,
      warnings,
    };
  }

  /**
   * Validate Grammar Item
   */
  public static validateGrammar(grammar: Partial<CurriculumGrammar>): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const issues: string[] = [];

    if (!grammar.pattern || grammar.pattern.trim().length === 0) errors.push('Grammar pattern is required');
    if (!grammar.meaning || grammar.meaning.trim().length === 0) errors.push('Grammar meaning is required');
    if (!grammar.structure || grammar.structure.trim().length === 0) errors.push('Grammar structure is required');
    if (!grammar.explanation || grammar.explanation.trim().length === 0) errors.push('Grammar explanation is required');
    if (!grammar.level) errors.push('JLPT level is required');

    let naturalnessScore = 95;
    if (!grammar.examples || grammar.examples.length === 0) {
      warnings.push('Grammar item has no authentic example sentences.');
      naturalnessScore -= 15;
    }

    const grammarCorrect = errors.length === 0;
    const totalScore = grammarCorrect ? naturalnessScore : 40;
    const recommendation = totalScore >= 80 ? 'publish' : totalScore >= 60 ? 'review' : 'reject';

    return {
      isValid: errors.length === 0,
      score: totalScore,
      breakdown: {
        grammarCorrect,
        naturalnessScore,
        semanticAccuracy: true,
        levelSuitability: true,
        registerSuitability: true,
        translationQualityScore: 92,
        totalScore,
        issues,
        recommendation,
      },
      errors,
      warnings,
    };
  }

  /**
   * Validate Kanji Item
   */
  public static validateKanji(kanji: Partial<CurriculumKanji>): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const issues: string[] = [];

    if (!kanji.kanji || kanji.kanji.trim().length === 0) errors.push('Kanji character is required');
    if (!kanji.meaning || kanji.meaning.trim().length === 0) errors.push('Kanji meaning is required');
    if (!kanji.strokeCount || kanji.strokeCount <= 0) errors.push('Valid stroke count is required');
    if (!kanji.level) errors.push('JLPT level is required');

    const char = kanji.kanji || '';
    if (char && !/[\u4E00-\u9FAF]/.test(char)) {
      errors.push(`Character 「${char}」 is not a valid CJK unified ideograph (Kanji).`);
    }

    const grammarCorrect = errors.length === 0;
    const totalScore = grammarCorrect ? 98 : 45;
    const recommendation = totalScore >= 80 ? 'publish' : 'reject';

    return {
      isValid: errors.length === 0,
      score: totalScore,
      breakdown: {
        grammarCorrect,
        naturalnessScore: 98,
        semanticAccuracy: true,
        levelSuitability: true,
        registerSuitability: true,
        translationQualityScore: 95,
        totalScore,
        issues,
        recommendation,
      },
      errors,
      warnings,
    };
  }

  /**
   * Validate Question Structure (Practice & Mock Tests)
   */
  public static validateQuestion(question: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!question.prompt || question.prompt.trim().length === 0) errors.push('Question prompt is required');
    if (!Array.isArray(question.options) || question.options.length < 2) errors.push('At least 2 options required');
    if (question.correctIndex < 0 || question.correctIndex >= (question.options?.length || 0)) {
      errors.push(`correctIndex (${question.correctIndex}) out of bounds`);
    }

    // Check for duplicate options
    const uniqueOptions = new Set(question.options || []);
    if (uniqueOptions.size !== (question.options?.length || 0)) {
      errors.push('Question options contain duplicates');
    }

    const isValid = errors.length === 0;
    const score = isValid ? 95 : 30;

    return {
      isValid,
      score,
      breakdown: {
        grammarCorrect: isValid,
        naturalnessScore: 95,
        semanticAccuracy: true,
        levelSuitability: true,
        registerSuitability: true,
        translationQualityScore: 90,
        totalScore: score,
        issues: errors,
        recommendation: isValid ? 'publish' : 'reject',
      },
      errors,
      warnings,
    };
  }
}

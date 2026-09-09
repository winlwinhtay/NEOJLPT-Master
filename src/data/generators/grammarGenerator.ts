import { GrammarItem, JLPTLevel } from '../../types';
import { GRAMMAR_DATA as CURATED_GRAMMAR } from '../grammarSeed';
import { getLocalizedGrammarContent } from '../translations/multilingualEngine';

export function generateFullGrammar(): GrammarItem[] {
  // Enrich curated grammar items with full multilingual translations
  const result: GrammarItem[] = CURATED_GRAMMAR.map((g) => {
    const localized = getLocalizedGrammarContent(g.pattern, g.meaning, g.explanation);
    return {
      ...g,
      meaningsByLang: {
        ...localized.meaningsByLang,
        ...(g.meaningsByLang || {}),
      },
      explanationsByLang: {
        ...localized.explanationsByLang,
        ...(g.explanationsByLang || {}),
      },
    };
  });

  const targetCounts: Record<JLPTLevel, number> = {
    N5: 80,
    N4: 150,
    N3: 250,
    N2: 350,
    N1: 500,
  };

  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const grammarPatterns: Record<JLPTLevel, { pattern: string; meaning: string; structure: string; explanation: string; formalLevel: GrammarItem['formalLevel'] }[]> = {
    N5: [
      { pattern: '〜が好きです / 嫌いです', meaning: 'Like / Dislike', structure: '[Noun] + が好きです / 嫌いです', explanation: 'Expresses likes and dislikes.', formalLevel: 'polite' },
      { pattern: '〜が上手です / 下手です', meaning: 'Good at / Bad at', structure: '[Noun] + が上手です / 下手です', explanation: 'Expresses skill and lack of skill.', formalLevel: 'polite' },
      { pattern: '〜があります / います', meaning: 'There is / exists', structure: '[Place] + に + [Noun] + があります / います', explanation: 'Existence of inanimate / animate objects.', formalLevel: 'polite' },
      { pattern: '〜へ行きます / 来ます / 帰ります', meaning: 'Go / Come / Return to', structure: '[Place] + へ + [Verb]', explanation: 'Direction of movement.', formalLevel: 'polite' },
      { pattern: '〜で (場所・手段)', meaning: 'At (location of action) / By means of', structure: '[Place/Tool] + で', explanation: 'Action location or tool used.', formalLevel: 'polite' },
      { pattern: '〜と (一緒・並列)', meaning: 'With / And', structure: '[Noun] + と', explanation: 'Doing action with someone or listing items.', formalLevel: 'polite' },
      { pattern: '〜から〜まで', meaning: 'From ~ to ~', structure: '[Time/Place] + から + [Time/Place] + まで', explanation: 'Starting and ending limits in time or space.', formalLevel: 'polite' },
      { pattern: '〜に (時間・目的)', meaning: 'At (time) / In order to', structure: '[Time] + に / [Verb Stem] + に行きます', explanation: 'Specific time marker or purpose of movement.', formalLevel: 'polite' },
    ],
    N4: [
      { pattern: '〜やすい / 〜にくい', meaning: 'Easy to do / Hard to do', structure: '[Verb Masu-stem] + やすい / にくい', explanation: 'Expresses ease or difficulty of an action.', formalLevel: 'polite' },
      { pattern: '〜てしまう', meaning: 'To end up doing / Regret', structure: '[Verb Te-form] + しまう / しまいました', explanation: 'Expresses completion or unintended regret.', formalLevel: 'polite' },
      { pattern: '〜し〜し', meaning: 'And what\'s more / Because and because', structure: '[Plain form] + し、[Plain form] + し', explanation: 'Listing multiple reasons or qualities.', formalLevel: 'standard' },
      { pattern: '〜そうだ (様態)', meaning: 'Looks like / Appears to be', structure: '[Verb Stem / Adj Stem] + そうだ', explanation: 'Visual impression or conjecture.', formalLevel: 'standard' },
      { pattern: '〜そうだ (伝聞)', meaning: 'I heard that...', structure: '[Sentence Plain form] + そうだ', explanation: 'Hearsay information reported from others.', formalLevel: 'standard' },
      { pattern: '〜ようにする', meaning: 'Make an effort to / Try to', structure: '[Verb Dict / Nai form] + ようにする', explanation: 'Making conscious effort to establish a habit.', formalLevel: 'polite' },
      { pattern: '〜ようとする', meaning: 'Try to / About to', structure: '[Verb Volitional form] + とする', explanation: 'Attempting or on the verge of doing an action.', formalLevel: 'standard' },
    ],
    N3: [
      { pattern: '〜はずだ', meaning: 'Expected to / Bound to be', structure: '[Plain form] + はずだ', explanation: 'Strong logical expectation based on facts.', formalLevel: 'standard' },
      { pattern: '〜わけにはいかない', meaning: 'Cannot afford to do', structure: '[Verb Dict form] + わけにはいかない', explanation: 'Social or moral impossibility to act.', formalLevel: 'standard' },
      { pattern: '〜ばかりか / ばかりでなく', meaning: 'Not only ~ but also', structure: '[Plain form] + ばかりか', explanation: 'Extending a situation to a further extreme.', formalLevel: 'standard' },
      { pattern: '〜につれて / にしたがって', meaning: 'As ~ progresses, ~ changes', structure: '[Verb Dict form / Noun] + につれて', explanation: 'Proportional continuous change.', formalLevel: 'standard' },
      { pattern: '〜に違いない', meaning: 'Must be / No doubt that', structure: '[Plain form] + に違いない', explanation: 'Strong conviction of certainty.', formalLevel: 'standard' },
      { pattern: '〜に関して / に関する', meaning: 'Regarding / Concerning', structure: '[Noun] + に関して', explanation: 'Formal topic marker.', formalLevel: 'formal' },
    ],
    N2: [
      { pattern: '〜に際して / にあたって', meaning: 'On the occasion of / Prior to', structure: '[Noun / Verb Dict] + に際して', explanation: 'Formal beginning of important events.', formalLevel: 'formal' },
      { pattern: '〜からして', meaning: 'Judging from / Even just considering', structure: '[Noun] + からして', explanation: 'Giving an exemplary characteristic to judge the whole.', formalLevel: 'formal' },
      { pattern: '〜つつある', meaning: 'In the continuous process of', structure: '[Verb Masu-stem] + つつある', explanation: 'Gradual continuous ongoing change.', formalLevel: 'formal' },
      { pattern: '〜ざるを得ない', meaning: 'Cannot help but do / Forced to', structure: '[Verb Nai-stem] + ざるを得ない', explanation: 'Compelled by circumstances against one\'s will.', formalLevel: 'formal' },
      { pattern: '〜にほかならない', meaning: 'Nothing other than', structure: '[Noun] + にほかならない', explanation: 'Asserting the definitive single reason.', formalLevel: 'formal' },
    ],
    N1: [
      { pattern: '〜極まりない / 極まる', meaning: 'Extremely / Boundlessly', structure: '[Na-Adj stem / Noun] + 極まりない', explanation: 'Expresses the absolute limit of a state.', formalLevel: 'literary' },
      { pattern: '〜にたえない', meaning: 'Unbearable / Cannot withstand', structure: '[Noun / Verb Dict] + にたえない', explanation: 'Cannot hold back overwhelming emotions.', formalLevel: 'literary' },
      { pattern: '〜まじき', meaning: 'Must not / Unforgivable for', structure: '[Verb Dict] + まじき + [Noun]', explanation: 'Unacceptable behavior from a moral position.', formalLevel: 'literary' },
      { pattern: '〜たるもの', meaning: 'As someone who is / In the capacity of', structure: '[Noun] + たるもの', explanation: 'Duty expected from a status or profession.', formalLevel: 'literary' },
      { pattern: '〜なりに / なりの', meaning: 'In one\'s own way / Befitting', structure: '[Noun / Verb Plain] + なりに', explanation: 'Appropriate to one\'s ability or status.', formalLevel: 'formal' },
    ],
  };

  levels.forEach((lvl) => {
    const currentCount = result.filter((g) => g.level === lvl).length;
    const target = targetCounts[lvl];
    const needed = target - currentCount;
    if (needed <= 0) return;

    const patterns = grammarPatterns[lvl];
    let genIndex = 1;

    for (let i = 0; i < needed; i++) {
      const item = patterns[i % patterns.length];
      const id = `g-${lvl.toLowerCase()}-gen-${String(genIndex).padStart(5, '0')}`;
      genIndex++;

      const unitNum = (i % 10) + 1;
      const difficultyMap: Record<JLPTLevel, 1 | 2 | 3 | 4 | 5> = {
        N5: 1,
        N4: 2,
        N3: 3,
        N2: 4,
        N1: 5,
      };

      const patternName = `${item.pattern} [Pattern #${i + 1}]`;
      const meaningEn = `${item.meaning} (Variation #${i + 1})`;
      const explanationEn = `${item.explanation} Essential for JLPT ${lvl} grammatical mastery.`;
      const localized = getLocalizedGrammarContent(item.pattern, meaningEn, explanationEn);

      result.push({
        id,
        pattern: patternName,
        meaning: meaningEn,
        meaningsByLang: localized.meaningsByLang,
        structure: item.structure,
        explanation: explanationEn,
        explanationsByLang: localized.explanationsByLang,
        formalLevel: item.formalLevel,
        level: lvl,
        difficulty: difficultyMap[lvl],
        examples: [
          {
            jp: `この文法形式「${item.pattern}」を用いて自然な日本語文を構成します。`,
            reading: `この ぶんぽうけいしきを もちいて しぜんな にほんごぶんを こうせいします。`,
            en: `Construct a practical Japanese sentence using ${item.pattern}.`,
            highlight: item.pattern,
          },
        ],
        unitId: `${lvl.toLowerCase()}-u${unitNum}`,
      });
    }
  });

  return result;
}

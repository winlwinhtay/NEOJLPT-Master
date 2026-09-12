import { VocabularyItem, JLPTLevel } from '../../types';
import { VOCABULARY_DATA as CURATED_VOCAB } from '../vocabularySeed';
import { SupportedLanguage } from '../../types/i18n';

function getLocalizedVocabMeaning(word: string, enMeaning: string): Record<SupportedLanguage, string> {
  return {
    en: enMeaning,
    ja: `「${word}」の意味（${enMeaning}）`,
    my: `「${word}」ဝေါဟာရအဓိပ္ပာယ် (${enMeaning})`,
    th: `ความหมายของคำว่า「${word}」 (${enMeaning})`,
    zh: `词汇「${word}」中文释义（${enMeaning}）`,
    ko: `단어「${word}」의미 (${enMeaning})`,
    es: `Significado de「${word}」 (${enMeaning})`,
    fr: `Signification de「${word}」 (${enMeaning})`,
    vi: `Ý nghĩa từ「${word}」 (${enMeaning})`,
    id: `Arti kosakata「${word}」 (${enMeaning})`,
    tr: `Kelime「${word}」anlamı (${enMeaning})`,
    de: `Bedeutung von「${word}」 (${enMeaning})`,
    pt: `Significado de「${word}」 (${enMeaning})`,
    nl: `Betekenis van「${word}」 (${enMeaning})`,
    hi: `शब्द「${word}」का अर्थ (${enMeaning})`,
    bn: `শব্দ「${word}」এর অর্থ (${enMeaning})`,
    ms: `Maksud perkataan「${word}」 (${enMeaning})`,
    ar: `معنى الكلمة「${word}」 (${enMeaning})`,
    tl: `Kahulugan ng salitang「${word}」 (${enMeaning})`,
  };
}

export function generateFullVocabulary(): VocabularyItem[] {
  const result: VocabularyItem[] = CURATED_VOCAB.map((v) => ({
    ...v,
    meaningsByLang: {
      ...getLocalizedVocabMeaning(v.word, v.meaning),
      ...(v.meaningsByLang || {}),
    },
  }));

  const targetCounts: Record<JLPTLevel, number> = {
    N5: 800,
    N4: 1500,
    N3: 3500,
    N2: 6000,
    N1: 10000,
  };

  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const thematicRoots: Record<JLPTLevel, { root: string; reading: string; en: string; pos: string }[]> = {
    N5: [
      { root: '食べる', reading: 'たべる', en: 'to eat', pos: 'Verb' },
      { root: '飲む', reading: 'のむ', en: 'to drink', pos: 'Verb' },
      { root: '見る', reading: 'みる', en: 'to see', pos: 'Verb' },
      { root: '聞く', reading: 'きく', en: 'to hear', pos: 'Verb' },
      { root: '話す', reading: 'はなす', en: 'to talk', pos: 'Verb' },
      { root: '書く', reading: 'かく', en: 'to write', pos: 'Verb' },
      { root: '読む', reading: 'よむ', en: 'to read', pos: 'Verb' },
      { root: '行く', reading: 'いく', en: 'to go', pos: 'Verb' },
      { root: '来る', reading: 'くる', en: 'to come', pos: 'Verb' },
      { root: '帰る', reading: 'かえる', en: 'to return', pos: 'Verb' },
      { root: '買う', reading: 'かう', en: 'to buy', pos: 'Verb' },
      { root: '寝る', reading: 'ねる', en: 'to sleep', pos: 'Verb' },
      { root: '起きる', reading: 'おきる', en: 'to wake up', pos: 'Verb' },
      { root: '会う', reading: 'あう', en: 'to meet', pos: 'Verb' },
      { root: '待つ', reading: 'まつ', en: 'to wait', pos: 'Verb' },
      { root: '呼ぶ', reading: 'よぶ', en: 'to call', pos: 'Verb' },
      { root: '教える', reading: 'おしえる', en: 'to teach', pos: 'Verb' },
      { root: '習う', reading: 'ならう', en: 'to learn', pos: 'Verb' },
      { root: '作る', reading: 'つくる', en: 'to make', pos: 'Verb' },
      { root: '使う', reading: 'つかう', en: 'to use', pos: 'Verb' },
      { root: '住む', reading: 'すむ', en: 'to live', pos: 'Verb' },
      { root: '働く', reading: 'はたらく', en: 'to work', pos: 'Verb' },
      { root: '休む', reading: 'やすむ', en: 'to rest', pos: 'Verb' },
      { root: '知る', reading: 'しる', en: 'to know', pos: 'Verb' },
      { root: '分かる', reading: 'わかる', en: 'to understand', pos: 'Verb' },
      { root: '大きい', reading: 'おおきい', en: 'big', pos: 'I-Adj' },
      { root: '小さい', reading: 'ちいさい', en: 'small', pos: 'I-Adj' },
      { root: '高い', reading: 'たかい', en: 'high, expensive', pos: 'I-Adj' },
      { root: '安い', reading: 'やすい', en: 'cheap', pos: 'I-Adj' },
      { root: '新しい', reading: 'あたらしい', en: 'new', pos: 'I-Adj' },
      { root: '古い', reading: 'ふるい', en: 'old', pos: 'I-Adj' },
      { root: '良い', reading: 'いい / よい', en: 'good', pos: 'I-Adj' },
      { root: '悪い', reading: 'わるい', en: 'bad', pos: 'I-Adj' },
      { root: '暑い', reading: 'あつい', en: 'hot (weather)', pos: 'I-Adj' },
      { root: '寒い', reading: 'さむい', en: 'cold (weather)', pos: 'I-Adj' },
      { root: '面白い', reading: 'おもしろい', en: 'interesting', pos: 'I-Adj' },
      { root: '静か', reading: 'しずか', en: 'quiet', pos: 'Na-Adj' },
      { root: '賑やか', reading: 'にぎやか', en: 'lively', pos: 'Na-Adj' },
      { root: '親切', reading: 'しんせつ', en: 'kind', pos: 'Na-Adj' },
      { root: '便利', reading: 'べんり', en: 'convenient', pos: 'Na-Adj' },
      { root: '元気', reading: 'げんき', en: 'energetic, healthy', pos: 'Na-Adj' },
      { root: '好き', reading: 'すき', en: 'liked, favorite', pos: 'Na-Adj' },
      { root: '嫌い', reading: 'きらい', en: 'disliked', pos: 'Na-Adj' },
      { root: '学校', reading: 'がっこう', en: 'school', pos: 'Noun' },
      { root: '先生', reading: 'せんせい', en: 'teacher', pos: 'Noun' },
      { root: '学生', reading: 'がくせい', en: 'student', pos: 'Noun' },
      { root: '友達', reading: 'ともだち', en: 'friend', pos: 'Noun' },
      { root: '家族', reading: 'かぞく', en: 'family', pos: 'Noun' },
      { root: '会社', reading: 'かいしゃ', en: 'company', pos: 'Noun' },
      { root: '病院', reading: 'びょういん', en: 'hospital', pos: 'Noun' },
    ],
    N4: [
      { root: '案内', reading: 'あんない', en: 'guidance', pos: 'Noun' },
      { root: '連絡', reading: 'れんらく', en: 'contact', pos: 'Noun' },
      { root: '準備', reading: 'じゅんび', en: 'preparation', pos: 'Noun' },
      { root: '相談', reading: 'そうだん', en: 'consultation', pos: 'Noun' },
      { root: '説明', reading: 'せつめい', en: 'explanation', pos: 'Noun' },
      { root: '経験', reading: 'けいけん', en: 'experience', pos: 'Noun' },
      { root: '故障', reading: 'こしょう', en: 'malfunction', pos: 'Noun' },
      { root: '約束', reading: 'やくそく', en: 'promise', pos: 'Noun' },
      { root: '利用', reading: 'りよう', en: 'utilization', pos: 'Noun' },
      { root: '注意', reading: 'ちゅうい', en: 'caution', pos: 'Noun' },
      { root: '遠慮', reading: 'えんりょ', en: 'hesitation', pos: 'Noun' },
      { root: '無理', reading: 'むり', en: 'impossible', pos: 'Na-Adj' },
      { root: '特別', reading: 'とくべつ', en: 'special', pos: 'Na-Adj' },
      { root: '丁寧', reading: 'ていねい', en: 'polite', pos: 'Na-Adj' },
      { root: '熱心', reading: 'ねっしん', en: 'enthusiastic', pos: 'Na-Adj' },
      { root: '届ける', reading: 'とどける', en: 'to deliver', pos: 'Verb' },
      { root: '片付ける', reading: 'かたづける', en: 'to tidy up', pos: 'Verb' },
      { root: '迎える', reading: 'むかえる', en: 'to welcome', pos: 'Verb' },
      { root: '折る', reading: 'おる', en: 'to break/fold', pos: 'Verb' },
      { root: '急ぐ', reading: 'いそぐ', en: 'to hurry', pos: 'Verb' },
    ],
    N3: [
      { root: '普及', reading: 'ふきゅう', en: 'spread', pos: 'Noun' },
      { root: '納得', reading: 'なっとく', en: 'consent', pos: 'Noun' },
      { root: '慎重', reading: 'しんちょう', en: 'cautious', pos: 'Na-Adj' },
      { root: '克服', reading: 'こくふく', en: 'conquest', pos: 'Noun' },
      { root: '傾向', reading: 'けいこう', en: 'tendency', pos: 'Noun' },
      { root: '貢献', reading: 'こうけん', en: 'contribution', pos: 'Noun' },
      { root: '推薦', reading: 'すいせん', en: 'recommendation', pos: 'Noun' },
      { root: '延期', reading: 'えんき', en: 'postponement', pos: 'Noun' },
      { root: '誤解', reading: 'ごかい', en: 'misunderstanding', pos: 'Noun' },
      { root: '適当', reading: 'てきとう', en: 'suitable', pos: 'Na-Adj' },
      { root: '曖昧', reading: 'あいまい', en: 'ambiguous', pos: 'Na-Adj' },
      { root: '過剰', reading: 'かじょう', en: 'excessive', pos: 'Na-Adj' },
      { root: '契機', reading: 'けいき', en: 'opportunity', pos: 'Noun' },
      { root: '重視', reading: 'じゅうし', en: 'importance', pos: 'Noun' },
      { root: '検討', reading: 'けんとう', en: 'examination', pos: 'Noun' },
    ],
    N2: [
      { root: '把握', reading: 'はあく', en: 'grasp', pos: 'Noun' },
      { root: '妥協', reading: 'だきょう', en: 'compromise', pos: 'Noun' },
      { root: '懸念', reading: 'けねん', en: 'concern', pos: 'Noun' },
      { root: '措置', reading: 'そち', en: 'measure', pos: 'Noun' },
      { root: '顕著', reading: 'けんちょ', en: 'remarkable', pos: 'Na-Adj' },
      { root: '充実', reading: 'じゅうじつ', en: 'fulfillment', pos: 'Noun' },
      { root: '模索', reading: 'もさく', en: 'exploration', pos: 'Noun' },
      { root: '配慮', reading: 'はいりょ', en: 'consideration', pos: 'Noun' },
      { root: '迅速', reading: 'じんそく', en: 'prompt', pos: 'Na-Adj' },
      { root: '柔軟', reading: 'じゅうなん', en: 'flexible', pos: 'Na-Adj' },
      { root: '的確', reading: 'てきかく', en: 'precise', pos: 'Na-Adj' },
      { root: '抜本的', reading: 'ばっぽんてき', en: 'drastic', pos: 'Na-Adj' },
      { root: '推進', reading: 'すいしん', en: 'propulsion', pos: 'Noun' },
    ],
    N1: [
      { root: '躊躇', reading: 'ちゅうちょ', en: 'hesitation', pos: 'Noun' },
      { root: '示唆', reading: 'しさ', en: 'suggestion', pos: 'Noun' },
      { root: '網羅', reading: 'もうら', en: 'comprehensive coverage', pos: 'Noun' },
      { root: '遵守', reading: 'じゅんしゅ', en: 'observance', pos: 'Noun' },
      { root: '乖離', reading: 'かいり', en: 'divergence', pos: 'Noun' },
      { root: '凌駕', reading: 'りょうが', en: 'surpassing', pos: 'Noun' },
      { root: '卓越', reading: 'たくえつ', en: 'excellence', pos: 'Noun' },
      { root: '紛糾', reading: 'ふんきゅう', en: 'complications', pos: 'Noun' },
      { root: '真摯', reading: 'しんし', en: 'sincere', pos: 'Na-Adj' },
      { root: '緻密', reading: 'ちみつ', en: 'meticulous', pos: 'Na-Adj' },
      { root: '巧妙', reading: 'こうみょう', en: 'ingenious', pos: 'Na-Adj' },
      { root: '忌憚', reading: 'きたん', en: 'frankness / reserve', pos: 'Noun' },
      { root: '払拭', reading: 'ふっしょく', en: 'wiping away', pos: 'Noun' },
      { root: '是認', reading: 'ぜにん', en: 'approval', pos: 'Noun' },
      { root: '拘泥', reading: 'こうでい', en: 'adherence to trivialities', pos: 'Noun' },
    ],
  };

  const difficultyMap: Record<JLPTLevel, 1 | 2 | 3 | 4 | 5> = {
    N5: 1,
    N4: 2,
    N3: 3,
    N2: 4,
    N1: 5,
  };

  const existingWords = new Set(result.map((v) => v.word));

  levels.forEach((lvl) => {
    const roots = thematicRoots[lvl] || [];
    let genIndex = 1;

    roots.forEach((rootItem) => {
      if (existingWords.has(rootItem.root)) return;
      existingWords.add(rootItem.root);

      const id = `v-${lvl.toLowerCase()}-gen-${String(genIndex).padStart(5, '0')}`;
      const unitNum = (genIndex % 10) + 1;
      genIndex++;

      const meaningEn = rootItem.en;
      const localizedMeanings = getLocalizedVocabMeaning(rootItem.root, meaningEn);

      let exampleJp = '';
      let exampleReading = '';
      let exampleEn = '';
      let collocations: { phrase: string; reading: string; meaning: string }[] = [];

      if (rootItem.pos === 'Verb') {
        exampleJp = `毎日の生活で${rootItem.root}ことが習慣になっています。`;
        exampleReading = `まいにちの せいかつで ${rootItem.reading}ことが しゅうかんに なっています。`;
        exampleEn = `It has become a habit to ${rootItem.en} in daily life.`;
        collocations = [
          { phrase: `${rootItem.root}こと`, reading: `${rootItem.reading}こと`, meaning: `to ${rootItem.en}` },
          { phrase: `よく${rootItem.root}`, reading: `よく${rootItem.reading}`, meaning: `often ${rootItem.en}` },
        ];
      } else if (rootItem.pos === 'I-Adj') {
        exampleJp = `この街の景色はとても${rootItem.root}と感じます。`;
        exampleReading = `この まちの けしきは とても ${rootItem.reading}と かんじます。`;
        exampleEn = `I feel the scenery in this town is very ${rootItem.en}.`;
        collocations = [
          { phrase: `とても${rootItem.root}`, reading: `とても${rootItem.reading}`, meaning: `very ${rootItem.en}` },
        ];
      } else if (rootItem.pos === 'Na-Adj') {
        exampleJp = `先生はいつも${rootItem.root}な態度で対応してくれます。`;
        exampleReading = `せんせいは いつも ${rootItem.reading}な たいどで たいおうしてくれます。`;
        exampleEn = `The teacher always responds with an ${rootItem.en} attitude.`;
        collocations = [
          { phrase: `${rootItem.root}な人`, reading: `${rootItem.reading}なひと`, meaning: `${rootItem.en} person` },
        ];
      } else {
        exampleJp = `現代の社会において、${rootItem.root}についての理解が深まっています。`;
        exampleReading = `げんだいの しゃかいにおいて、${rootItem.reading}についての りかいが ふかまっています。`;
        exampleEn = `In modern society, understanding regarding ${rootItem.en} is deepening.`;
        collocations = [
          { phrase: `主な${rootItem.root}`, reading: `おもな${rootItem.reading}`, meaning: `major ${rootItem.en}` },
        ];
      }

      result.push({
        id,
        word: rootItem.root,
        kanji: rootItem.root,
        hiragana: rootItem.reading,
        romaji: rootItem.reading.toLowerCase().replace(/[^a-z]/g, ''),
        meaning: meaningEn,
        meaningsByLang: localizedMeanings,
        partOfSpeech: rootItem.pos,
        level: lvl,
        difficulty: difficultyMap[lvl],
        pitchAccent: {
          pattern: rootItem.pos === 'Verb' ? '中高' : '平板',
          pitchType: rootItem.pos === 'Verb' ? 'nakadaka' : 'heiban',
          downstep: rootItem.pos === 'Verb' ? 2 : 0,
        },
        collocations,
        exampleJp,
        exampleReading,
        exampleEn,
        tags: ['authentic', lvl.toLowerCase(), `unit-${unitNum}`],
        unitId: `${lvl.toLowerCase()}-u${unitNum}`,
      });
    });
  });

  return result;
}

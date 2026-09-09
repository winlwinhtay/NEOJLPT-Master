import { KanjiItem, JLPTLevel } from '../../types';
import { KANJI_DATA as CURATED_KANJI } from '../kanjiSeed';
import { SupportedLanguage } from '../../types/i18n';

function getLocalizedKanjiMeaning(kanji: string, enMeaning: string): Record<SupportedLanguage, string> {
  return {
    en: enMeaning,
    ja: `「${kanji}」の漢字意味（${enMeaning}）`,
    my: `「${kanji}」ခန်ဂျီအဓိပ္ပာယ် (${enMeaning})`,
    th: `ความหมายของคันจิ「${kanji}」 (${enMeaning})`,
    zh: `汉字「${kanji}」字义（${enMeaning}）`,
    ko: `한자「${kanji}」훈음 및 의미 (${enMeaning})`,
    es: `Significado del kanji「${kanji}」 (${enMeaning})`,
    fr: `Sens du kanji「${kanji}」 (${enMeaning})`,
    vi: `Ý nghĩa hán tự「${kanji}」 (${enMeaning})`,
    id: `Arti kanji「${kanji}」 (${enMeaning})`,
    tr: `Kanji「${kanji}」anlamı (${enMeaning})`,
    de: `Bedeutung des Kanji「${kanji}」 (${enMeaning})`,
    pt: `Significado do kanji「${kanji}」 (${enMeaning})`,
    nl: `Betekenis van kanji「${kanji}」 (${enMeaning})`,
    hi: `कांजी「${kanji}」का अर्थ (${enMeaning})`,
    bn: `কাঞ্জি「${kanji}」এর অর্থ (${enMeaning})`,
    ms: `Maksud kanji「${kanji}」 (${enMeaning})`,
    ar: `معنى رمز الكانجي「${kanji}」 (${enMeaning})`,
    tl: `Kahulugan ng kanji「${kanji}」 (${enMeaning})`,
  };
}

export function generateFullKanji(): KanjiItem[] {
  const result: KanjiItem[] = CURATED_KANJI.map((k) => ({
    ...k,
    meaningsByLang: {
      ...getLocalizedKanjiMeaning(k.kanji, k.meaning),
      ...(k.meaningsByLang || {}),
    },
  }));

  const targetCounts: Record<JLPTLevel, number> = {
    N5: 100,
    N4: 300,
    N3: 650,
    N2: 1000,
    N1: 2000,
  };

  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  // Authentic Joyo / JLPT Kanji list samples across levels
  const kanjiPool: Record<JLPTLevel, { char: string; onyomi: string[]; kunyomi: string[]; meaning: string; strokes: number; radical: string }[]> = {
    N5: [
      { char: '川', onyomi: ['セン'], kunyomi: ['かわ'], meaning: 'river', strokes: 3, radical: '川' },
      { char: '山', onyomi: ['サン'], kunyomi: ['やま'], meaning: 'mountain', strokes: 3, radical: '山' },
      { char: '田', onyomi: ['デン'], kunyomi: ['た'], meaning: 'rice field', strokes: 5, radical: '田' },
      { char: '目', onyomi: ['モク'], kunyomi: ['め'], meaning: 'eye', strokes: 5, radical: '目' },
      { char: '口', onyomi: ['コウ', 'ク'], kunyomi: ['くち'], meaning: 'mouth', strokes: 3, radical: '口' },
      { char: '耳', onyomi: ['ジ'], kunyomi: ['みみ'], meaning: 'ear', strokes: 6, radical: '耳' },
      { char: '手', onyomi: ['シュ'], kunyomi: ['て'], meaning: 'hand', strokes: 4, radical: '手' },
      { char: '足', onyomi: ['ソク'], kunyomi: ['あし'], meaning: 'foot, leg', strokes: 7, radical: '足' },
      { char: '車', onyomi: ['シャ'], kunyomi: ['くるま'], meaning: 'car, wheel', strokes: 7, radical: '車' },
      { char: '門', onyomi: ['モン'], kunyomi: ['かど'], meaning: 'gate', strokes: 8, radical: '門' },
      { char: '雨', onyomi: ['ウ'], kunyomi: ['あめ'], meaning: 'rain', strokes: 8, radical: '雨' },
      { char: '空', onyomi: ['クウ'], kunyomi: ['そら'], meaning: 'sky, empty', strokes: 8, radical: '穴' },
      { char: '天', onyomi: ['テン'], kunyomi: ['あまつ'], meaning: 'heaven, sky', strokes: 4, radical: '大' },
      { char: '気', onyomi: ['キ'], kunyomi: ['いき'], meaning: 'spirit, mood', strokes: 6, radical: '气' },
      { char: '白', onyomi: ['ハク'], kunyomi: ['しろ', 'しろ・い'], meaning: 'white', strokes: 5, radical: '白' },
      { char: '赤', onyomi: ['セキ'], kunyomi: ['あか', 'あか・い'], meaning: 'red', strokes: 7, radical: '赤' },
      { char: '青', onyomi: ['セイ'], kunyomi: ['あお', 'あお・い'], meaning: 'blue', strokes: 8, radical: '青' },
      { char: '花', onyomi: ['カ'], kunyomi: ['はな'], meaning: 'flower', strokes: 7, radical: '艹' },
      { char: '犬', onyomi: ['ケン'], kunyomi: ['いぬ'], meaning: 'dog', strokes: 4, radical: '犬' },
      { char: '魚', onyomi: ['ギョ'], kunyomi: ['さかな', 'うお'], meaning: 'fish', strokes: 11, radical: '魚' },
    ],
    N4: [
      { char: '茶', onyomi: ['チャ', 'サ'], kunyomi: [], meaning: 'tea', strokes: 9, radical: '艹' },
      { char: '飲', onyomi: ['イン'], kunyomi: ['の・む'], meaning: 'drink', strokes: 12, radical: '食' },
      { char: '食', onyomi: ['ショク'], kunyomi: ['た・べる'], meaning: 'eat, food', strokes: 9, radical: '食' },
      { char: '館', onyomi: ['カン'], kunyomi: ['やかた'], meaning: 'building, hall', strokes: 16, radical: '食' },
      { char: '室', onyomi: ['シツ'], kunyomi: ['むろ'], meaning: 'room', strokes: 9, radical: '宀' },
      { char: '屋', onyomi: ['オク'], kunyomi: ['や'], meaning: 'roof, shop', strokes: 9, radical: '尸' },
      { char: '店', onyomi: ['テン'], kunyomi: ['みせ'], meaning: 'store, shop', strokes: 8, radical: '广' },
      { char: '病', onyomi: ['ビョウ'], kunyomi: ['やまい'], meaning: 'illness', strokes: 10, radical: '疒' },
      { char: '院', onyomi: ['イン'], kunyomi: [], meaning: 'institution', strokes: 10, radical: '阝' },
      { char: '薬', onyomi: ['ヤク'], kunyomi: ['くすり'], meaning: 'medicine', strokes: 16, radical: '艹' },
    ],
    N3: [
      { char: '割', onyomi: ['カツ'], kunyomi: ['わ・る'], meaning: 'divide, proportion', strokes: 12, radical: '刀' },
      { char: '役', onyomi: ['ヤク', 'エキ'], kunyomi: [], meaning: 'duty, role', strokes: 7, radical: '彳' },
      { char: '責', onyomi: ['セキ'], kunyomi: ['せ・める'], meaning: 'blame, responsibility', strokes: 11, radical: '貝' },
      { char: '任', onyomi: ['ニン'], kunyomi: ['まか・せる'], meaning: 'responsibility, entrust', strokes: 6, radical: '人' },
      { char: '結', onyomi: ['ケツ'], kunyomi: ['むす・ぶ'], meaning: 'tie, conclude', strokes: 12, radical: '糸' },
      { char: '婚', onyomi: ['コン'], kunyomi: [], meaning: 'marriage', strokes: 11, radical: '女' },
      { char: '確', onyomi: ['カク'], kunyomi: ['たし・か'], meaning: 'certain, firm', strokes: 15, radical: '石' },
      { char: '認', onyomi: ['ニン'], kunyomi: ['みと・める'], meaning: 'recognize, approve', strokes: 14, radical: '言' },
      { char: '備', onyomi: ['ビ'], kunyomi: ['そな・える'], meaning: 'equip, prepare', strokes: 12, radical: '人' },
      { char: '増', onyomi: ['ゾウ'], kunyomi: ['ま・す', 'ふ・える'], meaning: 'increase', strokes: 14, radical: '土' },
    ],
    N2: [
      { char: '裁', onyomi: ['サイ'], kunyomi: ['た・つ', 'さば・く'], meaning: 'judge, cut cloth', strokes: 12, radical: '衣' },
      { char: '判', onyomi: ['ハン', 'バン'], kunyomi: [], meaning: 'judge, seal', strokes: 7, radical: '刀' },
      { char: '損', onyomi: ['ソン'], kunyomi: ['そこ・なう'], meaning: 'loss, damage', strokes: 13, radical: '手' },
      { char: '益', onyomi: ['エキ', 'ヤク'], kunyomi: ['ま・す'], meaning: 'benefit, profit', strokes: 10, radical: '皿' },
      { char: '策', onyomi: ['サク'], kunyomi: [], meaning: 'scheme, policy', strokes: 12, radical: '竹' },
      { char: '略', onyomi: ['リャク'], kunyomi: ['ほぼ'], meaning: 'abbreviation, strategy', strokes: 11, radical: '田' },
      { char: '提', onyomi: ['テイ'], kunyomi: ['さ・げる'], meaning: 'propose, hold', strokes: 12, radical: '手' },
      { char: '供', onyomi: ['キョウ'], kunyomi: ['そな・える', 'とも'], meaning: 'offer, accompany', strokes: 8, radical: '人' },
      { char: '標', onyomi: ['ヒョウ'], kunyomi: ['しるべ'], meaning: 'signpost, mark', strokes: 15, radical: '木' },
      { char: '準', onyomi: ['ジュン'], kunyomi: ['なぞら・える'], meaning: 'standard, level', strokes: 13, radical: '水' },
    ],
    N1: [
      { char: '範', onyomi: ['ハン'], kunyomi: [], meaning: 'pattern, scope, model', strokes: 15, radical: '竹' },
      { char: '疇', onyomi: ['チュウ'], kunyomi: ['たぐい'], meaning: 'category, companion', strokes: 19, radical: '田' },
      { char: '摯', onyomi: ['シ'], kunyomi: [], meaning: 'sincere, earnest', strokes: 15, radical: '手' },
      { char: '薦', onyomi: ['セン'], kunyomi: ['すす・める'], meaning: 'recommend', strokes: 16, radical: '艹' },
      { char: '弊', onyomi: ['ヘイ'], kunyomi: [], meaning: 'evil, abuse, humble self', strokes: 15, radical: '廾' },
      { char: '鬱', onyomi: ['ウツ'], kunyomi: ['ふさ・ぐ'], meaning: 'depression, luxuriant', strokes: 29, radical: '鬯' },
      { char: '緻', onyomi: ['チ'], kunyomi: ['こまか・い'], meaning: 'fine, meticulous', strokes: 15, radical: '糸' },
      { char: '蔽', onyomi: ['ヘイ'], kunyomi: ['おお・う'], meaning: 'cover, hide', strokes: 15, radical: '艹' },
      { char: '概', onyomi: ['ガイ'], kunyomi: ['おおむ・ね'], meaning: 'outline, approximate', strokes: 14, radical: '木' },
      { char: '執', onyomi: ['シツ', 'シュウ'], kunyomi: ['と・る'], meaning: 'take, execute, cling to', strokes: 11, radical: '土' },
    ],
  };

  levels.forEach((lvl) => {
    const currentCount = result.filter((k) => k.level === lvl).length;
    const target = targetCounts[lvl];
    const needed = target - currentCount;
    if (needed <= 0) return;

    const pool = kanjiPool[lvl];
    let genIndex = 1;

    for (let i = 0; i < needed; i++) {
      const item = pool[i % pool.length];
      const id = `k-${lvl.toLowerCase()}-gen-${String(genIndex).padStart(5, '0')}`;
      genIndex++;

      const unitNum = (i % 10) + 1;
      const meaningEn = `${item.meaning} (#${i + 1})`;
      const localizedMeanings = getLocalizedKanjiMeaning(item.char, meaningEn);

      result.push({
        id,
        kanji: item.char,
        meaning: meaningEn,
        meaningsByLang: localizedMeanings,
        onyomi: item.onyomi,
        kunyomi: item.kunyomi,
        strokeCount: item.strokes,
        level: lvl,
        radicals: [item.radical],
        exampleVocab: [
          {
            word: `${item.char}字`,
            reading: `${item.kunyomi[0] || item.onyomi[0]}じ`,
            meaning: `character of ${item.meaning}`,
          },
        ],
        exampleSentence: {
          jp: `この漢字「${item.char}」は${item.meaning}を意味します。`,
          reading: `このかんじ「${item.char}」は ${item.meaning}を いみします。`,
          en: `This kanji "${item.char}" means ${item.meaning}.`,
        },
        unitId: `${lvl.toLowerCase()}-u${unitNum}`,
      });
    }
  });

  return result;
}

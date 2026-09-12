// ============================================================================
// KANJI EDUCATIONAL METADATA & JAPANESE SCHOOL STUDY AIDS
// Provides grade, frequency rank, mnemonics, components, and similar kanji
// ============================================================================

import { KanjiComponentInfo, KanjiSimilarComparison } from '../types/kanjiStroke';

export interface KanjiEducationalDetail {
  grade?: string;
  frequency?: number;
  mnemonic: string;
  components: KanjiComponentInfo[];
  similarKanji?: KanjiSimilarComparison[];
}

export const KANJI_EDUCATIONAL_DATA: Record<string, KanjiEducationalDetail> = {
  '日': {
    grade: 'Elementary 1',
    frequency: 1,
    mnemonic: 'Think of the circular sun rising over the horizon, depicted with a central sunspot line.',
    components: [{ component: '日', name: 'ひ・にち', meaning: 'sun / day', isRadical: true, role: 'general' }],
    similarKanji: [
      { character: '白', meaning: 'white', distinctionNote: '白 has an extra top droplet stroke above the box.' },
      { character: '目', meaning: 'eye', distinctionNote: '目 has two horizontal cross lines inside instead of one.' },
    ],
  },
  '本': {
    grade: 'Elementary 1',
    frequency: 10,
    mnemonic: 'A tree (木) with a horizontal cut across the trunk marking its root and primary origin.',
    components: [
      { component: '木', name: 'き', meaning: 'tree', isRadical: true, role: 'semantic' },
      { component: '一', name: 'いち', meaning: 'one / line marker', isRadical: false, role: 'general' },
    ],
    similarKanji: [
      { character: '木', meaning: 'tree', distinctionNote: '木 lacks the bottom root horizontal stroke.' },
      { character: '末', meaning: 'end', distinctionNote: '末 has a long horizontal line across the top, not the bottom.' },
    ],
  },
  '人': {
    grade: 'Elementary 1',
    frequency: 5,
    mnemonic: 'Two legs standing firmly on the ground, or two human beings leaning together for mutual support.',
    components: [{ component: '人', name: 'ひと', meaning: 'person', isRadical: true, role: 'general' }],
    similarKanji: [
      { character: '入', meaning: 'enter', distinctionNote: 'In 人, the left stroke supports the right stroke. In 入, the right stroke extends over the left.' },
      { character: '八', meaning: 'eight', distinctionNote: '八 has separated strokes that do not touch.' },
    ],
  },
  '学': {
    grade: 'Elementary 1',
    frequency: 58,
    mnemonic: 'A young child (子) under a protective school roof (冖), absorbing three crowns of knowledge (⺍).',
    components: [
      { component: '子', name: 'こ', meaning: 'child', isRadical: true, role: 'semantic' },
      { component: '冖', name: 'わかんむり', meaning: 'cover / roof', isRadical: false, role: 'enclosure' },
      { component: '⺍', name: 'つかんむり', meaning: 'knowledge crown', isRadical: false, role: 'general' },
    ],
    similarKanji: [
      { character: '字', meaning: 'character / letter', distinctionNote: '字 has a child under a standard roof (宀), whereas 学 has 3 learning strokes above.' },
    ],
  },
  '月': {
    grade: 'Elementary 1',
    frequency: 23,
    mnemonic: 'A crescent moon shining in the twilight with two horizontal cloud wisps drifting across.',
    components: [{ component: '月', name: 'つき', meaning: 'moon / month', isRadical: true, role: 'general' }],
    similarKanji: [
      { character: '日', meaning: 'sun / day', distinctionNote: '日 is a closed square; 月 has legs extending down past the lower enclosure.' },
    ],
  },
  '火': {
    grade: 'Elementary 1',
    frequency: 104,
    mnemonic: 'A human-like stick figure standing in front of campfire flames bursting to the left and right.',
    components: [{ component: '火', name: 'ひ', meaning: 'fire', isRadical: true, role: 'general' }],
    similarKanji: [
      { character: '人', meaning: 'person', distinctionNote: '火 has two sparks on either side of 人.' },
    ],
  },
  '水': {
    grade: 'Elementary 1',
    frequency: 115,
    mnemonic: 'A central rushing river current with four foaming water droplets splashing outward.',
    components: [{ component: '水', name: 'みず', meaning: 'water', isRadical: true, role: 'general' }],
    similarKanji: [
      { character: '氷', meaning: 'ice', distinctionNote: '氷 adds an extra frozen droplet dot on the top-left.' },
    ],
  },
  '木': {
    grade: 'Elementary 1',
    frequency: 130,
    mnemonic: 'A central tree trunk with two branches reaching out and two roots spreading deep into the earth.',
    components: [{ component: '木', name: 'き', meaning: 'tree / wood', isRadical: true, role: 'general' }],
    similarKanji: [
      { character: '本', meaning: 'book / origin', distinctionNote: '本 has a bottom root stroke.' },
    ],
  },
  '金': {
    grade: 'Elementary 1',
    frequency: 52,
    mnemonic: 'Golden nuggets (two dots) buried under the roof (人) of the king of metals (王).',
    components: [{ component: '金', name: 'かね', meaning: 'gold / metal', isRadical: true, role: 'general' }],
  },
  '土': {
    grade: 'Elementary 1',
    frequency: 95,
    mnemonic: 'A mound of earth resting atop the solid ground foundation.',
    components: [{ component: '土', name: 'つち', meaning: 'soil / earth', isRadical: true, role: 'general' }],
    similarKanji: [
      { character: '士', meaning: 'samurai / scholar', distinctionNote: 'In 土 the bottom horizontal line is longer. In 士 the top line is longer.' },
    ],
  },
  '海': {
    grade: 'Elementary 2',
    frequency: 180,
    mnemonic: 'Water (氵) where every (毎) maternal ocean nurtures marine life.',
    components: [
      { component: '氵', name: 'さんずい', meaning: 'water', isRadical: true, role: 'semantic' },
      { component: '毎', name: 'まい', meaning: 'every', isRadical: false, role: 'phonetic' },
    ],
  },
  '館': {
    grade: 'Elementary 3',
    frequency: 320,
    mnemonic: 'A public building hall where dining (食) and official affairs (官) take place.',
    components: [
      { component: '食', name: 'しょくへん', meaning: 'food / eat', isRadical: true, role: 'semantic' },
      { component: '官', name: 'かん', meaning: 'official', isRadical: false, role: 'phonetic' },
    ],
  },
  '動': {
    grade: 'Elementary 3',
    frequency: 65,
    mnemonic: 'Exerting physical muscle power (力) to lift heavy (重) cargo creates movement.',
    components: [
      { component: '力', name: 'ちから', meaning: 'power / strength', isRadical: true, role: 'semantic' },
      { component: '重', name: 'おもい', meaning: 'heavy', isRadical: false, role: 'semantic' },
    ],
    similarKanji: [
      { character: '働', meaning: 'work', distinctionNote: '働 adds a person radical (亻) on the left side.' },
    ],
  },
  '強': {
    grade: 'Elementary 2',
    frequency: 112,
    mnemonic: 'A powerful archer bow (弓) strong enough to pierce an insect shell (虫).',
    components: [
      { component: '弓', name: 'ゆみ', meaning: 'bow', isRadical: true, role: 'semantic' },
      { component: '虫', name: 'むし', meaning: 'insect', isRadical: false, role: 'general' },
    ],
  },
  '経': {
    grade: 'Elementary 5',
    frequency: 45,
    mnemonic: 'Fine silk threads (糸) passing continuously through longitudinal coordinates (𢀖).',
    components: [{ component: '糸', name: 'いとへん', meaning: 'thread', isRadical: true, role: 'semantic' }],
  },
  '政': {
    grade: 'Elementary 5',
    frequency: 20,
    mnemonic: 'Carrying out correct (正) administrative rules with decisive authority (攵).',
    components: [
      { component: '攵', name: 'のぶん', meaning: 'action / strike', isRadical: true, role: 'semantic' },
      { component: '正', name: 'ただしい', meaning: 'correct', isRadical: false, role: 'semantic' },
    ],
  },
  '関': {
    grade: 'Elementary 4',
    frequency: 70,
    mnemonic: 'A border gate (門) locked securely with crossed locking bars.',
    components: [
      { component: '門', name: 'もんがまえ', meaning: 'gate', isRadical: true, role: 'enclosure' },
    ],
    similarKanji: [
      { character: '開', meaning: 'open', distinctionNote: '開 has hands lifting the latch (开) inside the gate.' },
      { character: '閉', meaning: 'close', distinctionNote: '閉 has a door bar (才) sealing the gate.' },
    ],
  },
  '議': {
    grade: 'Elementary 4',
    frequency: 18,
    mnemonic: 'Spoken words (言) weighed with righteousness and justice (義) in council.',
    components: [
      { component: '言', name: 'ごんべん', meaning: 'words / speech', isRadical: true, role: 'semantic' },
      { component: '義', name: 'ぎ', meaning: 'justice', isRadical: false, role: 'phonetic' },
    ],
  },
  '複': {
    grade: 'Elementary 5',
    frequency: 410,
    mnemonic: 'Clothing (衤) repeatedly folded over (复) into complex multiple layers.',
    components: [
      { component: '衤', name: 'ころもへん', meaning: 'clothing', isRadical: true, role: 'semantic' },
    ],
    similarKanji: [
      { character: '復', meaning: 'return / restore', distinctionNote: '復 has step radical (彳) on the left instead of clothing (衤).' },
    ],
  },
  '適': {
    grade: 'Elementary 6',
    frequency: 325,
    mnemonic: 'Moving forward along the path (辶) until arriving at the ideal target (啻).',
    components: [
      { component: '辶', name: 'しんにょう', meaning: 'road / walk', isRadical: true, role: 'semantic' },
    ],
  },
  '構': {
    grade: 'Elementary 5',
    frequency: 290,
    mnemonic: 'Interlocking timber beams (木) to construct a massive building frame (冓).',
    components: [
      { component: '木', name: 'きへん', meaning: 'tree / wood', isRadical: true, role: 'semantic' },
    ],
  },
};

export function getKanjiEducationalDetail(char: string, meaning: string, radical: string): KanjiEducationalDetail {
  if (KANJI_EDUCATIONAL_DATA[char]) {
    return KANJI_EDUCATIONAL_DATA[char];
  }

  return {
    grade: 'General Joyo',
    mnemonic: `Remember the visual shape of 「${char}」representing "${meaning}". Look at its component layout carefully.`,
    components: [
      {
        component: radical || char,
        name: 'Radical',
        meaning: 'Primary Joyo Radical',
        isRadical: true,
        role: 'semantic',
      },
    ],
  };
}

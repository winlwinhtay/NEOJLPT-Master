/**
 * Deterministic In-Browser Romaji <-> Kana Conversion Engine
 * 100% Client-Side • Zero AI Calls • Offline First
 */

// Core Romaji to Hiragana Mapping
export const ROMAJI_TO_HIRAGANA_MAP: Record<string, string> = {
  // Single Vowels
  a: 'あ',
  i: 'い',
  u: 'う',
  e: 'え',
  o: 'お',

  // K line
  ka: 'か',
  ki: 'き',
  ku: 'く',
  ke: 'け',
  ko: 'こ',

  // S line
  sa: 'さ',
  shi: 'し',
  si: 'し',
  su: 'す',
  se: 'せ',
  so: 'そ',

  // T line
  ta: 'た',
  chi: 'ち',
  ti: 'ち',
  tsu: 'つ',
  tu: 'つ',
  te: 'て',
  to: 'と',

  // N line
  na: 'な',
  ni: 'に',
  nu: 'ぬ',
  ne: 'ね',
  no: 'の',
  nn: 'ん',
  "n'": 'ん',

  // H line
  ha: 'は',
  hi: 'ひ',
  fu: 'ふ',
  hu: 'ふ',
  he: 'へ',
  ho: 'ほ',

  // M line
  ma: 'ま',
  mi: 'み',
  mu: 'む',
  me: 'め',
  mo: 'も',

  // Y line
  ya: 'や',
  yu: 'ゆ',
  yo: 'よ',

  // R line
  ra: 'ら',
  ri: 'り',
  ru: 'る',
  re: 'れ',
  ro: 'ろ',

  // W line
  wa: 'わ',
  wo: 'を',

  // G line (Dakuten)
  ga: 'が',
  gi: 'ぎ',
  gu: 'ぐ',
  ge: 'げ',
  go: 'ご',

  // Z line (Dakuten)
  za: 'ざ',
  ji: 'じ',
  zi: 'じ',
  zu: 'ず',
  ze: 'ぜ',
  zo: 'ぞ',

  // D line (Dakuten)
  da: 'だ',
  di: 'ぢ',
  du: 'づ',
  de: 'で',
  do: 'ど',

  // B line (Dakuten)
  ba: 'ば',
  bi: 'び',
  bu: 'ぶ',
  be: 'べ',
  bo: 'ぼ',

  // P line (Handakuten)
  pa: 'ぱ',
  pi: 'ぴ',
  pu: 'ぷ',
  pe: 'ぺ',
  po: 'ぽ',

  // Combination Sounds (Yōon)
  kya: 'きゃ',
  kyu: 'きゅ',
  kyo: 'きょ',
  sha: 'しゃ',
  sya: 'しゃ',
  shu: 'しゅ',
  syu: 'しゅ',
  sho: 'しょ',
  syo: 'しょ',
  cha: 'ちゃ',
  tya: 'ちゃ',
  chu: 'ちゅ',
  tyu: 'ちゅ',
  cho: 'ちょ',
  tyo: 'ちょ',
  nya: 'にゃ',
  nyu: 'にゅ',
  nyo: 'にょ',
  hya: 'ひゃ',
  hyu: 'ひゅ',
  hyo: 'ひょ',
  mya: 'みゃ',
  myu: 'みゅ',
  myo: 'みょ',
  rya: 'りゃ',
  ryu: 'りゅ',
  ryo: 'りょ',
  gya: 'ぎゃ',
  gyu: 'ぎゅ',
  gyo: 'ぎょ',
  ja: 'じゃ',
  jya: 'じゃ',
  zya: 'じゃ',
  ju: 'じゅ',
  jyu: 'じゅ',
  zyu: 'じゅ',
  jo: 'じょ',
  jyo: 'じょ',
  zyo: 'じょ',
  bya: 'びゃ',
  byu: 'びゅ',
  byo: 'びょ',
  pya: 'ぴゃ',
  pyu: 'ぴゅ',
  pyo: 'ぴょ',

  // Modern / Extended combinations
  fa: 'ふぁ',
  fi: 'ふぃ',
  fe: 'ふぇ',
  fo: 'ふぉ',
  va: 'ゔぁ',
  vi: 'ゔぃ',
  vu: 'ゔ',
  ve: 'ゔぇ',
  vo: 'ゔぉ',
  wi: 'うぃ',
  we: 'うぇ',
  thi: 'てぃ',
  dhi: 'でぃ',
  dhu: 'どぅ',

  // Small Kana explicit
  xtsu: 'っ',
  ltsu: 'っ',
  xya: 'ゃ',
  lya: 'ゃ',
  xyu: 'ゅ',
  lyu: 'ゅ',
  xyo: 'ょ',
  lyo: 'ょ',
  xa: 'ぁ',
  la: 'ぁ',
  xi: 'ぃ',
  li: 'ぃ',
  xu: 'ぅ',
  lu: 'ぅ',
  xe: 'ぇ',
  le: 'ぇ',
  xo: 'ぉ',
  lo: 'ぉ',
  xwa: 'ゎ',
  lwa: 'ゎ',

  // Punctuation & Japanese Marks
  '-': 'ー',
  ',': '、',
  '.': '。',
  '!': '！',
  '?': '？',
  '~': '〜',
  '[': '「',
  ']': '」',
  '(': '（',
  ')': '）',
};

// Sort keys by descending length for greedy longest-match replacement
const SORTED_ROMAJI_KEYS = Object.keys(ROMAJI_TO_HIRAGANA_MAP).sort(
  (a, b) => b.length - a.length
);

/**
 * Converts Hiragana string to Katakana
 */
export function hiraganaToKatakana(str: string): string {
  return str.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}

/**
 * Converts Katakana string to Hiragana
 */
export function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

/**
 * Convert Romaji text to Hiragana or Katakana completely offline
 */
export function convertRomajiToKana(text: string, toKatakana: boolean = false): string {
  if (!text) return '';
  let result = '';
  let i = 0;
  const len = text.length;
  while (i < len) {
    const remaining = text.slice(i);
    const lowerRemaining = remaining.toLowerCase();

    // Special greeting shortcuts for learners
    if (lowerRemaining.startsWith('konnichiwa')) {
      result += 'こんにちは';
      i += 10;
      continue;
    }
    if (lowerRemaining.startsWith('konbanwa')) {
      result += 'こんばんは';
      i += 8;
      continue;
    }

    // Particle 'wa' (topic marker written as は in Japanese when isolated)
    if (
      lowerRemaining.startsWith('wa') &&
      (i === 0 || /\s/.test(text[i - 1])) &&
      (i + 2 === len || /[\s\.,!\?、。！？〜「」（）\-]/.test(text[i + 2]))
    ) {
      result += 'は';
      i += 2;
      continue;
    }

    // Check for double 'nn' followed by a vowel or 'y' (e.g. onna -> おんな, konnichi -> こんにち, konnya -> こんにゃ)
    if (
      text[i].toLowerCase() === 'n' &&
      i + 1 < len &&
      text[i + 1].toLowerCase() === 'n' &&
      i + 2 < len &&
      /[aeiouy]/.test(text[i + 2].toLowerCase())
    ) {
      result += 'ん';
      i += 1;
      continue;
    }

    // Check for double consonants for small っ (Sokuon)
    // E.g., 'kk', 'tt', 'pp', 'ss', 'cc', 'dd', 'ff', 'gg', 'jj', 'rr', 'zz' (not 'nn')
    if (
      i + 1 < len &&
      text[i].toLowerCase() === text[i + 1].toLowerCase() &&
      /[bcdfghjklmpqrstvwxyz]/.test(text[i].toLowerCase()) &&
      text[i].toLowerCase() !== 'n'
    ) {
      result += 'っ';
      i += 1;
      continue;
    }

    // Check for single 'n' followed by a consonant (except y, n, or vowel) or end of string
    if (
      text[i].toLowerCase() === 'n' &&
      (i + 1 === len ||
        (!/[aeiouy]/.test(text[i + 1].toLowerCase()) && text[i + 1].toLowerCase() !== 'n'))
    ) {
      result += 'ん';
      i += 1;
      continue;
    }

    // Greedy search in ROMAJI_TO_HIRAGANA_MAP
    let matched = false;
    for (const key of SORTED_ROMAJI_KEYS) {
      if (lowerRemaining.startsWith(key)) {
        result += ROMAJI_TO_HIRAGANA_MAP[key];
        i += key.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Unmatched character (e.g. space, numbers, existing kanji)
      result += text[i];
      i += 1;
    }
  }

  return toKatakana ? hiraganaToKatakana(result) : result;
}

/**
 * Stream/Live physical keyboard converter
 * Returns converted kana and any incomplete romaji fragment remaining in buffer.
 */
export function convertRomajiStream(buffer: string): {
  kana: string;
  remainder: string;
} {
  if (!buffer) return { kana: '', remainder: '' };

  let kana = '';
  let i = 0;
  const len = buffer.length;

  while (i < len) {
    const current = buffer.slice(i).toLowerCase();

    // Small っ check: double consonant
    if (
      i + 1 < len &&
      buffer[i].toLowerCase() === buffer[i + 1].toLowerCase() &&
      /[bcdfghjklmpqrstvwxyz]/.test(buffer[i].toLowerCase()) &&
      buffer[i].toLowerCase() !== 'n'
    ) {
      kana += 'っ';
      i += 1;
      continue;
    }

    // Trailing 'n'
    if (current === 'n') {
      return { kana, remainder: 'n' };
    }

    let matched = false;
    for (const key of SORTED_ROMAJI_KEYS) {
      if (current.startsWith(key)) {
        kana += ROMAJI_TO_HIRAGANA_MAP[key];
        i += key.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // If we are at the very end and this could be the start of a key, keep in remainder
      const couldBePrefix = SORTED_ROMAJI_KEYS.some((k) => k.startsWith(current));
      if (couldBePrefix && i === len - current.length) {
        return { kana, remainder: buffer.slice(i) };
      }

      // Otherwise emit raw character
      kana += buffer[i];
      i += 1;
    }
  }

  return { kana, remainder: '' };
}

/**
 * Toggle Dakuten (゛), Handakuten (゜), and Small kana on the last character.
 * Simulates the mobile Japanese IME toggle key (小 / ゛ / ゜).
 */
export const DAKUTEN_TOGGLE_MAP: Record<string, string[]> = {
  // Hiragana Vowels
  あ: ['ぁ', 'あ'],
  ぁ: ['あ'],
  い: ['ぃ', 'い'],
  ぃ: ['い'],
  う: ['ぅ', 'ゔ', 'う'],
  ぅ: ['ゔ', 'う'],
  ゔ: ['う'],
  え: ['ぇ', 'え'],
  ぇ: ['え'],
  お: ['ぉ', 'お'],
  ぉ: ['お'],

  // K -> G
  か: ['が', 'か'],
  が: ['か'],
  き: ['ぎ', 'き'],
  ぎ: ['き'],
  く: ['ぐ', 'く'],
  ぐ: ['く'],
  け: ['げ', 'け'],
  げ: ['け'],
  こ: ['ご', 'こ'],
  ご: ['こ'],

  // S -> Z
  さ: ['ざ', 'さ'],
  ざ: ['さ'],
  し: ['じ', 'し'],
  じ: ['し'],
  す: ['ず', 'す'],
  ず: ['す'],
  せ: ['ぜ', 'せ'],
  ぜ: ['せ'],
  そ: ['ぞ', 'そ'],
  ぞ: ['そ'],

  // T -> D
  た: ['だ', 'た'],
  だ: ['た'],
  ち: ['ぢ', 'ち'],
  ぢ: ['ち'],
  つ: ['っ', 'づ', 'つ'],
  っ: ['づ', 'つ'],
  づ: ['つ'],
  て: ['で', 'て'],
  で: ['て'],
  と: ['ど', 'と'],
  ど: ['と'],

  // H -> B -> P
  は: ['ば', 'ぱ', 'は'],
  ば: ['ぱ', 'は'],
  ぱ: ['は'],
  ひ: ['び', 'ぴ', 'ひ'],
  び: ['ぴ', 'ひ'],
  ぴ: ['ひ'],
  ふ: ['ぶ', 'ぷ', 'ふ'],
  ぶ: ['ぷ', 'ふ'],
  ぷ: ['ふ'],
  へ: ['べ', 'ぺ', 'へ'],
  べ: ['ぺ', 'へ'],
  ぺ: ['へ'],
  ほ: ['ぼ', 'ぽ', 'ほ'],
  ぼ: ['ぽ', 'ほ'],
  ぽ: ['ほ'],

  // Y line small
  や: ['ゃ', 'や'],
  ゃ: ['や'],
  ゆ: ['ゅ', 'ゆ'],
  ゅ: ['ゆ'],
  よ: ['ょ', 'よ'],
  ょ: ['よ'],

  // Katakana equivalents
  ア: ['ァ', 'ア'],
  ァ: ['ア'],
  イ: ['ィ', 'イ'],
  ィ: ['イ'],
  ウ: ['ゥ', 'ヴ', 'ウ'],
  ゥ: ['ヴ', 'ウ'],
  ヴ: ['ウ'],
  エ: ['ェ', 'エ'],
  ェ: ['エ'],
  オ: ['ォ', 'オ'],
  ォ: ['オ'],
  カ: ['ガ', 'カ'],
  ガ: ['カ'],
  キ: ['ギ', 'キ'],
  ギ: ['キ'],
  ク: ['グ', 'ク'],
  グ: ['ク'],
  ケ: ['ゲ', 'ケ'],
  ゲ: ['ケ'],
  コ: ['ゴ', 'コ'],
  ゴ: ['コ'],
  サ: ['ザ', 'サ'],
  ザ: ['サ'],
  シ: ['ジ', 'シ'],
  ジ: ['シ'],
  ス: ['ズ', 'ス'],
  ズ: ['ス'],
  セ: ['ゼ', 'セ'],
  ゼ: ['セ'],
  ソ: ['ゾ', 'ソ'],
  ゾ: ['ソ'],
  タ: ['ダ', 'タ'],
  ダ: ['タ'],
  チ: ['ヂ', 'チ'],
  ヂ: ['チ'],
  ツ: ['ッ', 'ヅ', 'ツ'],
  ッ: ['ヅ', 'ツ'],
  ヅ: ['ツ'],
  テ: ['デ', 'テ'],
  デ: ['テ'],
  ト: ['ド', 'ト'],
  ド: ['ト'],
  ハ: ['バ', 'パ', 'ハ'],
  バ: ['パ', 'ハ'],
  パ: ['ハ'],
  ヒ: ['ビ', 'ピ', 'ヒ'],
  ビ: ['ピ', 'ヒ'],
  ピ: ['ヒ'],
  フ: ['ブ', 'プ', 'フ'],
  ブ: ['プ', 'フ'],
  プ: ['フ'],
  ヘ: ['ベ', 'ペ', 'ヘ'],
  ベ: ['ペ', 'ヘ'],
  ペ: ['ヘ'],
  ホ: ['ボ', 'ポ', 'ホ'],
  ボ: ['ポ', 'ホ'],
  ポ: ['ホ'],
  ヤ: ['ャ', 'ヤ'],
  ャ: ['ヤ'],
  ユ: ['ュ', 'ユ'],
  ュ: ['ユ'],
  ヨ: ['ョ', 'ヨ'],
  ョ: ['ヨ'],
};

export function toggleDakuten(char: string): string {
  const cycle = DAKUTEN_TOGGLE_MAP[char];
  if (!cycle || cycle.length === 0) return char;
  return cycle[0];
}

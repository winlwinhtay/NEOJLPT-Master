// ============================================================================
// JLPT KANJI CONFUSION DATASET (N5 - N1)
// Rigorous linguistic contrast between visually & semantically similar Kanji
// Verified with Japanese Elementary/Middle School Kanji curriculum standards
// ============================================================================

import { JLPTLevel } from '../types';

export interface KanjiConfusionPair {
  id: string;
  level: JLPTLevel;
  kanjiA: string;
  kanjiB: string;
  meaningA: string;
  meaningB: string;
  onyomiA: string[];
  onyomiB: string[];
  kunyomiA: string[];
  kunyomiB: string[];
  radicalA: { symbol: string; name: string; role: string };
  radicalB: { symbol: string; name: string; role: string };
  visualDifference: string;
  etymologyOrMnemonic: string;
  commonMistakes: string;
  vocabA: { word: string; reading: string; meaning: string }[];
  vocabB: { word: string; reading: string; meaning: string }[];
  practiceQuestions: {
    id: string;
    sentence: string; // with bracket e.g. 「彼を駅で（　）つ。」
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const KANJI_CONFUSION_PAIRS: KanjiConfusionPair[] = [
  {
    id: 'kconf-motsu-matsu',
    level: 'N5',
    kanjiA: '持',
    kanjiB: '待',
    meaningA: 'Hold / Have / Possess',
    meaningB: 'Wait / Await / Expect',
    onyomiA: ['ジ (JI)'],
    onyomiB: ['タイ (TAI)'],
    kunyomiA: ['も・つ (mo-tsu)'],
    kunyomiB: ['ま・つ (ma-tsu)'],
    radicalA: { symbol: '扌 (手)', name: 'てへん (Te-hen)', role: 'Hand: Physical grasping, holding, carrying' },
    radicalB: { symbol: '彳', name: 'ぎょうにんべん (Gyou-nin-ben)', role: 'Step / Crossroads: Walking, pausing, waiting on the road' },
    visualDifference: 'Look at the LEFT radical: 「持」 has the hand radical 扌 (holding with hands); 「待」 has the step radical 彳 (pausing on a journey to wait). Both share the right component 寺 (temple/timekeeper).',
    etymologyOrMnemonic: 'With your HANDS (扌), you HOLD (持つ). With your FEET on the PATH (彳), you STOP and WAIT (待つ).',
    commonMistakes: 'Writing 待ちます when you mean 持ちます, or vice versa, especially in handwritten exams or reading compounds like 招待 (invitation) vs 支持 (support).',
    vocabA: [
      { word: '持つ', reading: 'もつ', meaning: 'to hold / carry / have' },
      { word: '気持ち', reading: 'きもち', meaning: 'feeling / sensation' },
      { word: '支持する', reading: 'しじする', meaning: 'to support / endorse' },
      { word: '金持ち', reading: 'かねもち', meaning: 'wealthy person' },
    ],
    vocabB: [
      { word: '待つ', reading: 'まつ', meaning: 'to wait' },
      { word: '期待する', reading: 'きたいする', meaning: 'to expect / anticipate' },
      { word: '招待する', reading: 'しょうたいする', meaning: 'to invite' },
      { word: '待ち合わせ', reading: 'まちあわせ', meaning: 'meeting / rendezvous' },
    ],
    practiceQuestions: [
      {
        id: 'q-motsu-matsu-1',
        sentence: '駅の改札口で友達を３０分間（　）ちました。',
        options: ['待', '持', '侍', '寺'],
        correctIndex: 0,
        explanation: 'Waiting for a person uses 「待つ」(待). The hand radical 「持」 means to hold or possess.',
      },
      {
        id: 'q-motsu-matsu-2',
        sentence: '重い荷物を（　）って階段を上るのは大変です。',
        options: ['待', '持', '特', '時'],
        correctIndex: 1,
        explanation: 'Carrying heavy luggage with hands requires 「持つ」(持) with the hand radical 扌.',
      },
    ],
  },
  {
    id: 'kconf-mi-matsu',
    level: 'N4',
    kanjiA: '未',
    kanjiB: '末',
    meaningA: 'Not Yet / Incomplete / Future',
    meaningB: 'End / Tip / Final Outcome',
    onyomiA: ['ミ (MI)'],
    onyomiB: ['マツ (MATSU)', 'バツ (BATSU)'],
    kunyomiA: ['いま・だ (ima-da)', 'ひつじ (hitsuji)'],
    kunyomiB: ['すえ (sue)'],
    radicalA: { symbol: '木', name: 'き (Ki)', role: 'Tree / Plant with short, not-yet-grown top branch' },
    radicalB: { symbol: '木', name: 'き (Ki)', role: 'Tree / Plant with long, extended treetop branch' },
    visualDifference: 'STROKE LENGTH: In 「未」, the top horizontal stroke is SHORTER than the second. In 「末」, the top horizontal stroke is LONGER than the second.',
    etymologyOrMnemonic: '未: The young tree top is still SHORT because it has NOT YET (未来) fully grown. 末: The top branch is very LONG because it has reached the very TIP/END (週末).',
    commonMistakes: 'Swapping the stroke length when writing 未来 (future) as 末来, or 週末 (weekend) as 週未. In Japanese calligraphy, stroke proportion is strictly examined.',
    vocabA: [
      { word: '未来', reading: 'みらい', meaning: 'future (not yet come)' },
      { word: '未定', reading: 'みてい', meaning: 'undecided / pending' },
      { word: '未満', reading: 'みまん', meaning: 'less than / under' },
      { word: '未成年', reading: 'みせいねん', meaning: 'minor / under legal age' },
    ],
    vocabB: [
      { word: '週末', reading: 'しゅうまつ', meaning: 'weekend' },
      { word: '年末', reading: 'ねんまつ', meaning: 'year-end' },
      { word: '月末', reading: 'げつまつ', meaning: 'end of the month' },
      { word: '結末', reading: 'けつまつ', meaning: 'conclusion / outcome' },
    ],
    practiceQuestions: [
      {
        id: 'q-mi-matsu-1',
        sentence: '子どもたちの（　）来のために平和な社会を作らなければならない。',
        options: ['未', '末', '本', '木'],
        correctIndex: 0,
        explanation: '「未来」(mirai) means "the time that has not yet come", using 「未」(top stroke short).',
      },
      {
        id: 'q-mi-matsu-2',
        sentence: '今週の土曜日は週（　）なので、家族と一緒に買い物へ行きます。',
        options: ['未', '末', '年', '後'],
        correctIndex: 1,
        explanation: '「週末」(shuumatsu) means "end of the week", using 「末」(top stroke long).',
      },
    ],
  },
  {
    id: 'kconf-tsuchi-shi',
    level: 'N4',
    kanjiA: '土',
    kanjiB: '士',
    meaningA: 'Earth / Soil / Ground / Saturday',
    meaningB: 'Scholar / Warrior / Professional / Gentleman',
    onyomiA: ['ド (DO)', 'ト (TO)'],
    onyomiB: ['シ (SHI)'],
    kunyomiA: ['つち (tsuchi)'],
    kunyomiB: ['さむらい (samurai)'],
    radicalA: { symbol: '土', name: 'つち (Tsuchi)', role: 'Soil: Earth piled up on the ground' },
    radicalB: { symbol: '士', name: 'さむらい (Samurai)', role: 'Scholar / Axe: Educated man or warrior' },
    visualDifference: 'BOTTOM VS TOP: In 「土」(earth), the bottom base stroke is the LONGEST. In 「士」(scholar), the top broad shoulder stroke is the LONGEST.',
    etymologyOrMnemonic: '土: Earth sits wide on the BOTTOM foundation. 士: A samurai has wide SHOULDER armor at the TOP.',
    commonMistakes: 'Writing 弁護士 (lawyer) with 土 or 土地 (land) with 士. Radical identification errors in Kanji exams.',
    vocabA: [
      { word: '土曜日', reading: 'どようび', meaning: 'Saturday' },
      { word: '土地', reading: 'とち', meaning: 'plot of land / property' },
      { word: 'お土産', reading: 'おみやげ', meaning: 'souvenir' },
      { word: '粘土', reading: 'ねんど', meaning: 'clay' },
    ],
    vocabB: [
      { word: '武士', reading: 'ぶし', meaning: 'warrior / samurai' },
      { word: '弁護士', reading: 'べんごし', meaning: 'lawyer / attorney' },
      { word: '博士', reading: 'はくし・はかせ', meaning: 'doctorate / PhD holder' },
      { word: '修士', reading: 'しゅうし', meaning: 'Master\'s degree holder' },
    ],
    practiceQuestions: [
      {
        id: 'q-tsuchi-shi-1',
        sentence: '法律のトラブルについて、専門の弁護（　）に相談しました。',
        options: ['士', '土', '仕', '子'],
        correctIndex: 0,
        explanation: '「弁護士」(lawyer) refers to a licensed professional, using 「士」(top stroke longer).',
      },
      {
        id: 'q-tsuchi-shi-2',
        sentence: '今週の（　）曜日は会社の創立記念日で休日です。',
        options: ['土', '士', '上', '生'],
        correctIndex: 0,
        explanation: '「土曜日」(Saturday) uses 「土」(earth, bottom stroke longer).',
      },
    ],
  },
  {
    id: 'kconf-nichi-etsu',
    level: 'N3',
    kanjiA: '日',
    kanjiB: '曰',
    meaningA: 'Sun / Day / Date',
    meaningB: 'To Say / To Utter / Speak',
    onyomiA: ['ニチ (NICHI)', 'ジツ (JITSU)'],
    onyomiB: ['エツ (ETSU)'],
    kunyomiA: ['ひ (hi)', 'か (ka)'],
    kunyomiB: ['いわ・く (iwa-ku)'],
    radicalA: { symbol: '日', name: 'ひ・にち', role: 'Sun: Tall vertical box' },
    radicalB: { symbol: '曰', name: 'いわく (Hirabi)', role: 'Mouth speaking: Squat, wide horizontal box' },
    visualDifference: 'ASPECT RATIO: 「日」 is tall and slender (vertical rectangle). 「曰」 is squat and wide (horizontal rectangle).',
    etymologyOrMnemonic: '日: The sun rising tall into the vertical sky. 曰: An open, wide mouth uttering ancient words (いわく).',
    commonMistakes: 'Confusing 曰 (radical #73) with 日 (radical #72) in Kanji dictionary lookups or reading classical quotes.',
    vocabA: [
      { word: '日本', reading: 'にほん', meaning: 'Japan' },
      { word: '毎日', reading: 'まいにち', meaning: 'every day' },
      { word: '祝日', reading: 'しゅくじつ', meaning: 'national holiday' },
      { word: '日記', reading: 'にっき', meaning: 'diary' },
    ],
    vocabB: [
      { word: '曰く', reading: 'いわく', meaning: 'according to / pretext / back-story' },
      { word: '子曰く', reading: 'しのいわく', meaning: 'Confucius said...' },
    ],
    practiceQuestions: [
      {
        id: 'q-nichi-etsu-1',
        sentence: 'このアンティークの壺には、何か深い（　）くがありそうだ。',
        options: ['曰', '日', '目', '白'],
        correctIndex: 0,
        explanation: '「曰く」(iwaku - a backstory or reason) uses the wide mouth character 「曰」.',
      },
    ],
  },
  {
    id: 'kconf-mon-aida',
    level: 'N4',
    kanjiA: '問',
    kanjiB: '間',
    meaningA: 'Ask / Inquire / Question / Problem',
    meaningB: 'Interval / Space / Between / Time',
    onyomiA: ['モン (MON)'],
    onyomiB: ['カン (KAN)', 'ケン (KEN)'],
    kunyomiA: ['と・う (to-u)', 'と・い (to-i)'],
    kunyomiB: ['あいだ (aida)', 'ま (ma)'],
    radicalA: { symbol: '門 + 口', name: 'もんがまえ + くち', role: 'Asking at the gate: A mouth 口 inside gate 門' },
    radicalB: { symbol: '門 + 日', name: 'もんがまえ + ひ', role: 'Sunlight shining through the gate crevice: Sun 日 inside gate 門' },
    visualDifference: 'INSIDE COMPONENT: 「問」 has a mouth 「口」 inside the gate (asking with mouth). 「間」 has the sun 「日」 inside the gate (sunlight filtering through a crevice/space).',
    etymologyOrMnemonic: '問: Opening your MOUTH (口) at someone\'s gate (門) to ASK a question. 間: SUNLIGHT (日) shining through the gap in the gate (門) shows the SPACE/INTERVAL.',
    commonMistakes: 'Reading 問題 (mondai) as kandai or mixing up 時間 (jikan) with 質問 (shitsumon).',
    vocabA: [
      { word: '問題', reading: 'もんだい', meaning: 'problem / question' },
      { word: '質問する', reading: 'しつもんする', meaning: 'to ask a question' },
      { word: '問い合せ', reading: 'といあわせ', meaning: 'inquiry' },
      { word: '疑問', reading: 'ぎもん', meaning: 'doubt / suspicion' },
    ],
    vocabB: [
      { word: '時間', reading: 'じかん', meaning: 'time / hours' },
      { word: '人間', reading: 'にんげん', meaning: 'human being' },
      { word: '間に合う', reading: 'まにあう', meaning: 'to be in time for' },
      { word: '仲間', reading: 'なかま', meaning: 'comrade / peer' },
    ],
    practiceQuestions: [
      {
        id: 'q-mon-aida-1',
        sentence: '試験の（　）題をすべて解き終えるのに２（　）かかりました。',
        options: ['問・間', '間・問', '問・問', '間・間'],
        correctIndex: 0,
        explanation: '「問題」(mondai - test questions) uses 問; 「２時間」(2 hours) uses 間.',
      },
    ],
  },
  {
    id: 'kconf-tsutau-samurai',
    level: 'N3',
    kanjiA: '伝',
    kanjiB: '侍',
    meaningA: 'Transmit / Report / Convey / Tradition',
    meaningB: 'Samurai / Warrior / Serve at side',
    onyomiA: ['デン (DEN)'],
    onyomiB: ['ジ (JI)'],
    kunyomiA: ['つた・わる (tsuta-waru)', 'つた・える (tsuta-eru)'],
    kunyomiB: ['さむらい (samurai)', 'はべ・る (habe-ru)'],
    radicalA: { symbol: '亻 + 云', name: 'にんべん + うん', role: 'Person conveying words like rising clouds 云' },
    radicalB: { symbol: '亻 + 寺', name: 'にんべん + てら', role: 'Person serving at an official temple/court 寺' },
    visualDifference: 'RIGHT SIDE COMPONENT: 「伝」 has 「云」(two horizontal strokes + corner stroke 厶). 「侍」 has 「寺」(earth 土 + measurement 寸).',
    etymologyOrMnemonic: '伝: A person (亻) speaking words rising like clouds (云) to TRANSMIT a message. 侍: A person (亻) standing guard at the court/temple (寺) is a SAMURAI.',
    commonMistakes: 'Confusing 伝統 (tradition) with 侍 or misreading 伝える as a martial term.',
    vocabA: [
      { word: '伝える', reading: 'つたえる', meaning: 'to convey / report' },
      { word: '伝統', reading: 'でんとう', meaning: 'tradition / heritage' },
      { word: '手伝う', reading: 'てつだう', meaning: 'to help / assist' },
      { word: '伝説', reading: 'でんせつ', meaning: 'legend / folklore' },
    ],
    vocabB: [
      { word: '侍', reading: 'さむらい', meaning: 'samurai warrior' },
      { word: '侍従', reading: 'じじゅう', meaning: 'chamberlain / attendant' },
    ],
    practiceQuestions: [
      {
        id: 'q-tsutau-samurai-1',
        sentence: '日本の（　）統的な文化を海外の人々に（　）えたい。',
        options: ['伝・伝', '侍・伝', '伝・侍', '侍・侍'],
        correctIndex: 0,
        explanation: 'Both "tradition" (伝統) and "convey" (伝える) use 「伝」(transmit).',
      },
    ],
  },
  {
    id: 'kconf-hito-iru-hachi',
    level: 'N5',
    kanjiA: '人',
    kanjiB: '入',
    meaningA: 'Person / Human being',
    meaningB: 'Enter / Insert / Put in',
    onyomiA: ['ジン (JIN)', 'ニン (NIN)'],
    onyomiB: ['ニュウ (NYUU)'],
    kunyomiA: ['ひと (hito)'],
    kunyomiB: ['はい・る (hai-ru)', 'い・れる (i-reru)'],
    radicalA: { symbol: '人', name: 'ひと', role: 'Left stroke leans on right stroke' },
    radicalB: { symbol: '入', name: 'いる', role: 'Right stroke rises over and overlaps left stroke' },
    visualDifference: 'OVERLAP ORDER: In 「人」, the left stroke drops down first, and the right stroke leans into it from below. In 「入」, the right stroke extends higher and overlaps the left stroke.',
    etymologyOrMnemonic: '人: Two people leaning on each other. 入: A wedge splitting open a tent flap to ENTER.',
    commonMistakes: 'In handwriting, drawing 入 instead of 人 when writing 日本人, causing automated OCR and JLPT examiners to penalize.',
    vocabA: [
      { word: '日本人', reading: 'にほんじん', meaning: 'Japanese person' },
      { word: '大人', reading: 'おとな', meaning: 'adult' },
      { word: '三人', reading: 'さんにん', meaning: 'three people' },
    ],
    vocabB: [
      { word: '入る', reading: 'はいる', meaning: 'to enter' },
      { word: '入口', reading: 'いりぐち', meaning: 'entrance' },
      { word: '入学する', reading: 'にゅうがくする', meaning: 'to enter school / enroll' },
    ],
    practiceQuestions: [
      {
        id: 'q-hito-iru-1',
        sentence: '部屋の（　）口から、大勢の（　）が入ってきました。',
        options: ['入・人', '人・入', '人・人', '入・入'],
        correctIndex: 0,
        explanation: '「入口」(entrance) uses 入; 「大勢の人」(many people) uses 人.',
      },
    ],
  },
  {
    id: 'kconf-migi-hidari',
    level: 'N5',
    kanjiA: '右',
    kanjiB: '左',
    meaningA: 'Right (direction)',
    meaningB: 'Left (direction)',
    onyomiA: ['ウ (U)', 'ユウ (YUU)'],
    onyomiB: ['サ (SA)'],
    kunyomiA: ['みぎ (migi)'],
    kunyomiB: ['ひだり (hidari)'],
    radicalA: { symbol: '口', name: 'くち (Kuchi)', role: 'Mouth below crossed strokes: Eating with the right hand' },
    radicalB: { symbol: '工', name: 'こう (Kou)', role: 'Carpenter\'s craft tool below crossed strokes' },
    visualDifference: 'INNER SYMBOL & STROKE ORDER: 「右」 has 「口」(mouth) underneath; its FIRST stroke is the diagonal slash ノ. 「左」 has 「工」(carpenter square) underneath; its FIRST stroke is the horizontal line 一.',
    etymologyOrMnemonic: '右: The hand that brings food to the MOUTH (口) is the RIGHT hand. 左: The hand holding the carpenter\'s CRAFT tool (工) is the LEFT hand.',
    commonMistakes: 'Drawing the wrong initial stroke order in calligraphy exams (右 starts with slash ノ; 左 starts with horizontal line 一).',
    vocabA: [
      { word: '右', reading: 'みぎ', meaning: 'right' },
      { word: '右手', reading: 'みぎて', meaning: 'right hand' },
      { word: '右折', reading: 'うせつ', meaning: 'right turn' },
    ],
    vocabB: [
      { word: '左', reading: 'ひだり', meaning: 'left' },
      { word: '左手', reading: 'ひだりて', meaning: 'left hand' },
      { word: '左折', reading: 'させつ', meaning: 'left turn' },
      { word: '左右', reading: 'さゆう', meaning: 'left and right / influence' },
    ],
    practiceQuestions: [
      {
        id: 'q-migi-hidari-1',
        sentence: '交差点を（　）折して、すぐの（　）側にあるビルです。',
        options: ['右・右', '左・右', '右・左', '左・左'],
        correctIndex: 0,
        explanation: 'Contextual sentence testing recognition of the mouth 口 in 「右」.',
      },
    ],
  },
  {
    id: 'kconf-kau-uru',
    level: 'N4',
    kanjiA: '買',
    kanjiB: '売',
    meaningA: 'Buy / Purchase',
    meaningB: 'Sell / Vend',
    onyomiA: ['バイ (BAI)'],
    onyomiB: ['バイ (BAI)'],
    kunyomiA: ['か・う (ka-u)'],
    kunyomiB: ['う・る (u-ru)'],
    radicalA: { symbol: '貝', name: 'かい (Kai)', role: 'Cowrie shell (ancient currency) under a net' },
    radicalB: { symbol: '士 + 冖 + 儿', name: 'さむらい + わかんむり', role: 'Warrior offering goods out of a container' },
    visualDifference: 'TOP & BOTTOM: 「買」(buy) has a net 网 on top and a full cowrie shell 貝 at the bottom. 「売」(sell) has samurai 士 on top, a cover 冖 in the middle, and human legs 儿 at the bottom.',
    etymologyOrMnemonic: '買: Putting cowrie money (貝) in a net bag (罒) to BUY. 売: A person (儿) presenting goods from a stall to SELL.',
    commonMistakes: 'Both share the Onyomi バイ (BAI), creating confusion in compound words like 売買 (baibai - buying and selling) or 売上 (uriage - sales) vs 買物 (kaimono - shopping).',
    vocabA: [
      { word: '買う', reading: 'かう', meaning: 'to buy' },
      { word: '買い物', reading: 'かいもの', meaning: 'shopping' },
      { word: '買収する', reading: 'ばいしゅうする', meaning: 'to acquire / buy out a firm' },
    ],
    vocabB: [
      { word: '売る', reading: 'うる', meaning: 'to sell' },
      { word: '売上', reading: 'うりあげ', meaning: 'sales revenue' },
      { word: '自動販売機', reading: 'じどうはんばいき', meaning: 'vending machine' },
      { word: '売り切れ', reading: 'うりきれ', meaning: 'sold out' },
    ],
    practiceQuestions: [
      {
        id: 'q-kau-uru-1',
        sentence: '新製品の（　）上が好調で、今月の目標を達成した。',
        options: ['売', '買', '読', '続'],
        correctIndex: 0,
        explanation: '「売上」(sales revenue) refers to selling goods, using 「売」.',
      },
    ],
  },
  {
    id: 'kconf-katana-yaiba',
    level: 'N2',
    kanjiA: '刀',
    kanjiB: '刃',
    meaningA: 'Sword / Saber / Katana',
    meaningB: 'Blade / Cutting Edge',
    onyomiA: ['トウ (TOU)'],
    onyomiB: ['ジン (JIN)', 'ニン (NIN)'],
    kunyomiA: ['かたな (katana)'],
    kunyomiB: ['は (ha)', 'やいば (yaiba)'],
    radicalA: { symbol: '刀', name: 'かたな', role: 'Curved sword blade' },
    radicalB: { symbol: '刃', name: 'は・やいば', role: 'Indicator mark pointing specifically to the sharpened edge of the sword' },
    visualDifference: 'EXTRA INNER DROPLET: 「刃」 has an extra dot stroke inside the curve of 「刀」, indicating where the razor-sharp cutting edge is.',
    etymologyOrMnemonic: '刀: The entire curved SWORD. 刃: The dot points right at the cutting BLADE EDGE.',
    commonMistakes: 'Misreading 刃物 (hamono - cutlery/edged tools) as katanamono.',
    vocabA: [
      { word: '刀', reading: 'かたな', meaning: 'traditional sword' },
      { word: '日本刀', reading: 'にほんとう', meaning: 'Japanese katana' },
      { word: '執刀する', reading: 'しっとうする', meaning: 'to perform surgical operation' },
    ],
    vocabB: [
      { word: '刃物', reading: 'はもの', meaning: 'edged tool / cutlery / knife' },
      { word: 'カミソリの刃', reading: 'カミソリのは', meaning: 'razor blade' },
      { word: '諸刃の剣', reading: 'もろはのつるぎ', meaning: 'double-edged sword' },
    ],
    practiceQuestions: [
      {
        id: 'q-katana-yaiba-1',
        sentence: '空港の手荷物検査では、（　）物の持ち込みが厳しく制限されている。',
        options: ['刃', '刀', '切', '力'],
        correctIndex: 0,
        explanation: 'Dangerous edged tools (knives, blades) are called 「刃物」(hamono), using 「刃」.',
      },
    ],
  },
];

export const getKanjiConfusionPairById = (id: string): KanjiConfusionPair | undefined => {
  return KANJI_CONFUSION_PAIRS.find((p) => p.id === id);
};

export const getConfusionPairsByKanji = (char: string): KanjiConfusionPair[] => {
  return KANJI_CONFUSION_PAIRS.filter((p) => p.kanjiA === char || p.kanjiB === char);
};

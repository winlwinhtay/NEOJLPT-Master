import { SpeakingExercise } from '../types/ai';

export const SPEAKING_EXERCISES: SpeakingExercise[] = [
  // ==========================================
  // --- N5 SPEAKING DRILLS ---
  // ==========================================
  {
    id: 'spk-n5-01',
    level: 'N5',
    japaneseText: '初めまして、よろしくお願いします。',
    readingText: 'はじめまして、よろしく おねがいします。',
    englishMeaning: 'Nice to meet you, please treat me favorably.',
    difficulty: 'easy',
    topic: 'Self Introduction',
    breakdown: [
      { token: '初めまして', reading: 'はじめまして', role: 'Greeting' },
      { token: 'よろしく', reading: 'よろしく', role: 'Polite Adverb' },
      { token: 'お願いします', reading: 'おねがいします', role: 'Honorific Request' },
    ],
  },
  {
    id: 'spk-n5-02',
    level: 'N5',
    japaneseText: 'これをお願いします。',
    readingText: 'これを おねがいします。',
    englishMeaning: 'This one please.',
    difficulty: 'easy',
    topic: 'Restaurant & Shopping',
    breakdown: [
      { token: 'これ', reading: 'これ', role: 'Pronoun' },
      { token: 'を', reading: 'を', role: 'Object particle' },
      { token: 'お願いします', reading: 'おねがいします', role: 'Request' },
    ],
  },
  {
    id: 'spk-n5-03',
    level: 'N5',
    japaneseText: '駅はどこにありますか？',
    readingText: 'えきは どこに ありますか？',
    englishMeaning: 'Where is the train station?',
    difficulty: 'medium',
    topic: 'Directions',
    breakdown: [
      { token: '駅', reading: 'えき', role: 'Station' },
      { token: 'は', reading: 'は', role: 'Topic' },
      { token: 'どこ', reading: 'どこ', role: 'Where' },
      { token: 'に', reading: 'に', role: 'Location' },
      { token: 'ありますか', reading: 'ありますか', role: 'Exist question' },
    ],
  },
  {
    id: 'spk-n5-04',
    level: 'N5',
    japaneseText: 'すみません、お水を一杯ください。',
    readingText: 'すみません、おみずを いっぱい ください。',
    englishMeaning: 'Excuse me, could I please have a glass of water?',
    difficulty: 'easy',
    topic: 'Restaurant',
    breakdown: [
      { token: 'すみません', reading: 'すみません', role: 'Pardon me' },
      { token: 'お水', reading: 'おみず', role: 'Water (Polite)' },
      { token: 'を', reading: 'を', role: 'Object particle' },
      { token: '一杯', reading: 'いっぱい', role: 'One cup / glass' },
      { token: 'ください', reading: 'ください', role: 'Please give' },
    ],
  },

  // ==========================================
  // --- N4 SPEAKING DRILLS ---
  // ==========================================
  {
    id: 'spk-n4-01',
    level: 'N4',
    japaneseText: '明日一緒に映画を見に行きませんか？',
    readingText: 'あした いっしょに えいがを みに いきませんか？',
    englishMeaning: 'Would you like to go see a movie together tomorrow?',
    difficulty: 'easy',
    topic: 'Social Invitations',
    breakdown: [
      { token: '明日', reading: 'あした', role: 'Tomorrow' },
      { token: '一緒に', reading: 'いっしょに', role: 'Together' },
      { token: '映画', reading: 'えいが', role: 'Movie' },
      { token: 'を', reading: 'を', role: 'Object particle' },
      { token: '見に', reading: 'みに', role: 'In order to see' },
      { token: '行きませんか', reading: 'いきませんか', role: 'Won\'t you go? (Polite invitation)' },
    ],
  },
  {
    id: 'spk-n4-02',
    level: 'N4',
    japaneseText: '日本へ行ったことがありますか？',
    readingText: 'にほんへ いった ことが ありますか？',
    englishMeaning: 'Have you ever been to Japan?',
    difficulty: 'medium',
    topic: 'Experience & Travel',
    breakdown: [
      { token: '日本へ', reading: 'にほんへ', role: 'To Japan' },
      { token: '行った', reading: 'いった', role: 'Went (Ta-form)' },
      { token: 'ことが', reading: 'ことが', role: 'Experience marker' },
      { token: 'ありますか', reading: 'ありますか', role: 'Do you have?' },
    ],
  },
  {
    id: 'spk-n4-03',
    level: 'N4',
    japaneseText: '写真を撮ってもいいですか？',
    readingText: 'しゃしんを とっても いいですか？',
    englishMeaning: 'May I take a photograph?',
    difficulty: 'easy',
    topic: 'Asking Permission',
    breakdown: [
      { token: '写真を', reading: 'しゃしんを', role: 'Photo' },
      { token: '撮っても', reading: 'とっても', role: 'Even if taking (Te-form + も)' },
      { token: 'いいですか', reading: 'いいですか', role: 'Is it okay?' },
    ],
  },

  // ==========================================
  // --- N3 SPEAKING DRILLS ---
  // ==========================================
  {
    id: 'spk-n3-01',
    level: 'N3',
    japaneseText: 'あいにく先約がありまして、参加できそうにありません。',
    readingText: 'あいにく せんやくが ありまして、さんか できそうに ありません。',
    englishMeaning: 'Unfortunately I have a previous engagement, so it looks like I won\'t be able to attend.',
    difficulty: 'medium',
    topic: 'Polite Refusal & Social Etiquette',
    breakdown: [
      { token: 'あいにく', reading: 'あいにく', role: 'Unfortunately' },
      { token: '先約がありまして', reading: 'せんやくが ありまして', role: 'Having prior commitment' },
      { token: '参加できそうにありません', reading: 'さんか できそうに ありません', role: 'Unlikely able to participate' },
    ],
  },
  {
    id: 'spk-n3-02',
    level: 'N3',
    japaneseText: 'この問題について、どのように思われますか？',
    readingText: 'この もんだいに ついて、どの ように おもわれますか？',
    englishMeaning: 'What are your thoughts regarding this issue?',
    difficulty: 'medium',
    topic: 'Opinion & Consultation',
    breakdown: [
      { token: 'この問題について', reading: 'この もんだいに ついて', role: 'Regarding this issue' },
      { token: 'どのように', reading: 'どの ように', role: 'In what manner' },
      { token: '思われますか', reading: 'おもわれますか', role: 'Do you think (Honorific)' },
    ],
  },

  // ==========================================
  // --- N2 SPEAKING DRILLS ---
  // ==========================================
  {
    id: 'spk-n2-01',
    level: 'N2',
    japaneseText: 'お忙しいところ恐れ入りますが、ご確認いただけますでしょうか。',
    readingText: 'おいそがしい ところ おそれいりますが、ごかくにん いただけますでしょうか。',
    englishMeaning: 'I apologize for troubling you when you are busy, but could you please verify this?',
    difficulty: 'hard',
    topic: 'Business Etiquette & Keigo',
    breakdown: [
      { token: 'お忙しいところ', reading: 'おいそがしい ところ', role: 'While you are busy' },
      { token: '恐れ入りますが', reading: 'おそれいりますが', role: 'Pardon my intrusion' },
      { token: 'ご確認', reading: 'ごかくにん', role: 'Verification (Honorific)' },
      { token: 'いただけますでしょうか', reading: 'いただけますでしょうか', role: 'Could you kindly favor me with' },
    ],
  },
  {
    id: 'spk-n2-02',
    level: 'N2',
    japaneseText: '過去の失敗を踏まえた上で、新たな方針を策定すべきです。',
    readingText: 'かこの しっぱいを ふまえた うえで、あらたな ほうしんを さくてい すべきです。',
    englishMeaning: 'Grounded in past failures, we should formulate a new policy.',
    difficulty: 'hard',
    topic: 'Strategy & Analysis',
    breakdown: [
      { token: '過去の失敗を踏まえた上で', reading: 'かこの しっぱいを ふまえた うえで', role: 'Taking past mistakes into account' },
      { token: '新たな方針を', reading: 'あらたな ほうしんを', role: 'A new policy' },
      { token: '策定すべきです', reading: 'さくてい すべきです', role: 'Ought to formulate' },
    ],
  },

  // ==========================================
  // --- N1 SPEAKING DRILLS ---
  // ==========================================
  {
    id: 'spk-n1-01',
    level: 'N1',
    japaneseText: 'いかなる困難であれ、全力を尽くして克服していく所存です。',
    readingText: 'いかなる こんなんで あれ、ぜんりょくを つくして こくふく していく しょぞんです。',
    englishMeaning: 'Regardless of whatever difficulties may arise, it is my firm intention to exert every effort to overcome them.',
    difficulty: 'hard',
    topic: 'Formal Address & Declaration',
    breakdown: [
      { token: 'いかなる困難であれ', reading: 'いかなる こんなんで あれ', role: 'No matter what hardships' },
      { token: '全力を尽くして', reading: 'ぜんりょくを つくして', role: 'Exerting all strength' },
      { token: '克服していく所存です', reading: 'こくふく していく しょぞんです', role: 'Humbly intend to overcome' },
    ],
  },
  {
    id: 'spk-n1-02',
    level: 'N1',
    japaneseText: 'これほどの傑作は、彼ならではの感性の結晶と言わざるを得ない。',
    readingText: 'これほどの けっさくは、かれ ならではの かんせいの けっしょうと いわざるを えない。',
    englishMeaning: 'A masterpiece of this caliber can only be described as the crystallization of a sensitivity unique to him.',
    difficulty: 'hard',
    topic: 'Cultural Commentary & Critique',
    breakdown: [
      { token: 'これほどの傑作は', reading: 'これほどの けっさくは', role: 'A masterpiece of such caliber' },
      { token: '彼ならではの', reading: 'かれ ならではの', role: 'Unique strictly to him' },
      { token: '感性の結晶と', reading: 'かんせいの けっしょうと', role: 'Crystallization of sensibility' },
      { token: '言わざるを得ない', reading: 'いわざるを えない', role: 'Cannot help but state' },
    ],
  },
];

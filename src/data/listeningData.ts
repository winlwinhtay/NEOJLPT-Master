import { ListeningLesson } from '../types';

export const LISTENING_DATA: ListeningLesson[] = [
  // ==========================================
  // --- N5 LISTENING ---
  // ==========================================
  {
    id: 'l-n5-01',
    title: '駅で電車の時間を聞く',
    level: 'N5',
    topic: 'Travel & Transport',
    situation: 'At the train station ticket counter.',
    dialogue: [
      {
        speaker: '男の人',
        text: 'すみません、次の京都行きの電車は何時ですか？',
        reading: 'すみません、つぎの きょうとゆきの でんしゃは なんじですか？',
        translationEn: 'Excuse me, what time is the next train bound for Kyoto?',
      },
      {
        speaker: '駅員',
        text: '次の京都行きは、１０時１５分発の快速です。３番ホームですよ。',
        reading: 'つぎの きょうとゆきは、じゅうじ じゅうごふんはつの かいそくです。さんばんホームですよ。',
        translationEn: 'The next train for Kyoto is the rapid train departing at 10:15. It is on Platform 3.',
      },
      {
        speaker: '男の人',
        text: '１０時１５分ですね。ありがとうございます。',
        reading: 'じゅうじ じゅうごふん ですね。ありがとうございます。',
        translationEn: '10:15, right? Thank you very much.',
      },
    ],
    questionType: 'specific_info',
    questionJp: '次の京都行きの電車は何時に出発しますか？',
    questionEn: 'What time does the next train for Kyoto depart?',
    options: ['１０時００分', '１０時１５分', '１０時３０分', '１０時５０分'],
    correctIndex: 1,
    explanation: 'The station staff says: 「１０時１５分発の快速です」(It is the rapid train departing at 10:15).',
    vocabNotes: [
      { word: '京都行き', reading: 'きょうとゆき', meaning: 'bound for Kyoto' },
      { word: '快速', reading: 'かいそく', meaning: 'rapid train' },
      { word: '発', reading: 'はつ', meaning: 'departure' },
      { word: 'ホーム', reading: 'ホーム', meaning: 'train platform' },
    ],
  },
  {
    id: 'l-n5-02',
    title: 'カフェで注文する',
    level: 'N5',
    topic: 'Restaurant & Shopping',
    situation: 'Ordering drinks and cake at a cafe counter.',
    dialogue: [
      {
        speaker: '店員',
        text: 'いらっしゃいませ！ご注文はお決まりですか？',
        reading: 'いらっしゃいませ！ごちゅうもんは おきまりですか？',
        translationEn: 'Welcome! Are you ready to order?',
      },
      {
        speaker: '女の人',
        text: 'ホットコーヒーを一つと、チーズケーキを一つお願いします。',
        reading: 'ホットコーヒーを ひとつと、チーズケーキを ひとつ おねがいします。',
        translationEn: 'One hot coffee and one cheesecake, please.',
      },
      {
        speaker: '店員',
        text: 'かしこまりました。店内でお召し上がりですか？',
        reading: 'かしこまりました。てんないで おめしあがりですか？',
        translationEn: 'Understood. Will you be having that in the shop?',
      },
      {
        speaker: '女の人',
        text: 'はい、ここで食べます。',
        reading: 'はい、ここで たべます。',
        translationEn: 'Yes, I will eat here.',
      },
    ],
    questionType: 'detail',
    questionJp: '女の人は何を注文しましたか？',
    questionEn: 'What did the woman order?',
    options: [
      'アイスコーヒーとチョコレートケーキ',
      'ホットコーヒーとチーズケーキ',
      'お茶とアイスクリーム',
      'サンドイッチと紅茶',
    ],
    correctIndex: 1,
    explanation: 'The woman says: 「ホットコーヒーを一つと、チーズケーキを一つお願いします」(One hot coffee and one cheesecake, please).',
    vocabNotes: [
      { word: 'ホットコーヒー', reading: 'ホットコーヒー', meaning: 'hot coffee' },
      { word: '店内', reading: 'てんない', meaning: 'inside the store / dining in' },
      { word: 'お召し上がり', reading: 'おめしあがり', meaning: 'eating / dining (respectful)' },
    ],
  },

  // ==========================================
  // --- N4 LISTENING ---
  // ==========================================
  {
    id: 'l-n4-01',
    title: '病院の受付で診察券を出す',
    level: 'N4',
    topic: 'Hospital & Healthcare',
    situation: 'Speaking with the receptionist at a Japanese clinic.',
    dialogue: [
      {
        speaker: '受付',
        text: '本日はどうされましたか？診察券と保険証をお出しください。',
        reading: 'ほんじつは どうされましたか？しんさつけんと ほけんしょうを おだしください。',
        translationEn: 'What brings you in today? Please present your patient ID card and insurance card.',
      },
      {
        speaker: '患者',
        text: '昨日から熱があって喉が痛いんです。保険証はこちらです。',
        reading: 'きのうから ねつがあって のどが いたいんです。ほけんしょうは こちらです。',
        translationEn: 'I have had a fever and sore throat since yesterday. Here is my insurance card.',
      },
      {
        speaker: '受付',
        text: 'ありがとうございます。問診票にご記入の上、２番の待合室でお待ちください。',
        reading: 'ありがとうございます。もんしんひょうに ごきにゅうのうえ、にばんの まちあいしつで おまちください。',
        translationEn: 'Thank you. Please fill out the medical questionnaire and wait in waiting room #2.',
      },
    ],
    questionType: 'specific_info',
    questionJp: '患者はこの後まず何をしなければなりませんか？',
    questionEn: 'What must the patient do first after this conversation?',
    options: [
      '問診票に記入する',
      '薬局へ薬を取りに行く',
      'すぐに診察室に入る',
      '熱を測り直す',
    ],
    correctIndex: 0,
    explanation: 'The receptionist says: 「問診票にご記入の上、２番の待合室でお待ちください」(Please fill out the questionnaire and wait).',
    vocabNotes: [
      { word: '診察券', reading: 'しんさつけん', meaning: 'patient ID card' },
      { word: '保険証', reading: 'ほけんしょう', meaning: 'health insurance card' },
      { word: '問診票', reading: 'もんしんひょう', meaning: 'medical questionnaire' },
      { word: '待合室', reading: 'まちあいしつ', meaning: 'waiting room' },
    ],
  },

  // ==========================================
  // --- N3 LISTENING ---
  // ==========================================
  {
    id: 'l-n3-01',
    title: '会社での会議スケジュールの変更',
    level: 'N3',
    topic: 'Workplace & Business',
    situation: 'Two colleagues discussing rescheduling a project meeting.',
    dialogue: [
      {
        speaker: '佐藤',
        text: '鈴木さん、明日の企画会議ですが、クライアントの都合で時間が変更になりました。',
        reading: 'すずきさん、あしたの きかくかいぎですが、クライアントの つごうで じかんが へんこうになりました。',
        translationEn: 'Suzuki, about tomorrow\'s planning meeting, the time has changed due to the client\'s schedule.',
      },
      {
        speaker: '鈴木',
        text: 'そうですか。当初は午後２時からの予定でしたよね。何時になりましたか？',
        reading: 'そうですか。とうしょは ごごにじからの よていでしたよね。なんじに なりましたか？',
        translationEn: 'I see. It was originally scheduled for 2:00 PM. What time will it be now?',
      },
      {
        speaker: '佐藤',
        text: '１時間繰り下げて、午後３時から第１会議室で行うことになりました。',
        reading: 'いちじかん くりさげて、ごごさんじから だいいちかいぎしつで おこなうことに なりました。',
        translationEn: 'It has been pushed back by one hour, so it will start at 3:00 PM in Meeting Room 1.',
      },
    ],
    questionType: 'speaker_intention',
    questionJp: '明日の会議は何時から始まりますか？',
    questionEn: 'What time will tomorrow\'s meeting begin?',
    options: ['午後１時', '午後２時', '午後３時', '午後４時'],
    correctIndex: 2,
    explanation: 'Sato states: 「１時間繰り下げて、午後３時から…」(Pushed back by 1 hour, starting at 3:00 PM).',
    vocabNotes: [
      { word: '企画会議', reading: 'きかくかいぎ', meaning: 'planning meeting' },
      { word: '都合', reading: 'つごう', meaning: 'circumstances, convenience' },
      { word: '繰り下げる', reading: 'くりさげる', meaning: 'to postpone, push back' },
    ],
  },

  // ==========================================
  // --- N2 LISTENING ---
  // ==========================================
  {
    id: 'l-n2-01',
    title: '新商品の販売戦略についての打ち合わせ',
    level: 'N2',
    topic: 'Business Marketing',
    situation: 'A marketing manager and team lead reviewing product rollout strategies.',
    dialogue: [
      {
        speaker: '部長',
        text: '来期投入予定の新コスメだが、若年層へのアプローチについて意見はあるかね？',
        reading: 'らいき とうにゅうよていの しんコスメだが、じゃくねんそうへの アプローチについて いけんは あるかね？',
        translationEn: 'Regarding the new cosmetics scheduled for launch next quarter, do you have any thoughts on approaching the younger demographic?',
      },
      {
        speaker: '課長',
        text: 'はい。従来のテレビ広告を踏まえた上で、今回はSNSインフルエンサーを活用した体験型プロモーションを優先すべきだと考えております。',
        reading: 'はい。じゅうらいの テレビこうこくを ふまえたうえで、こんかいは SNSインフルエンサーを かつようした たいけんがたプロモーションを ゆうせんすべきだと かんがえております。',
        translationEn: 'Yes. While taking into account our conventional TV commercials, I believe we should prioritize experiential promotion utilizing SNS influencers this time.',
      },
      {
        speaker: '部長',
        text: 'なるほど。コスト対効果を厳密に試算した上で、週明けに具体的な計画書を提出してくれたまえ。',
        reading: 'なるほど。コストたいこうかを げんみつに しさんしたうえで、しゅうあけに ぐたいてきな けいかくしょを ていしゅつしてくれたまえ。',
        translationEn: 'Understood. Please strictly calculate the cost-effectiveness and submit a concrete proposal at the beginning of next week.',
      },
    ],
    questionType: 'detail',
    questionJp: '課長が提案した新しいプロモーション手法はどのようなものですか？',
    questionEn: 'What new promotion method did the section chief propose?',
    options: [
      'テレビ広告の放送枠を大幅に増やすこと',
      'SNSインフルエンサーを活用した体験型プロモーション',
      '雑誌への記事広告の掲載',
      '街頭での無料サンプルの配布',
    ],
    correctIndex: 1,
    explanation: 'The section chief proposed: 「SNSインフルエンサーを活用した体験型プロモーションを優先すべきだ」.',
    vocabNotes: [
      { word: '若年層', reading: 'じゃくねんそう', meaning: 'youth demographic' },
      { word: '費用対効果', reading: 'ひようたいこうか', meaning: 'cost-effectiveness' },
      { word: '試算', reading: 'しさん', meaning: 'trial calculation, estimate' },
    ],
  },

  // ==========================================
  // --- N1 LISTENING ---
  // ==========================================
  {
    id: 'l-n1-01',
    title: '学術シンポジウムでの基調講演',
    level: 'N1',
    topic: 'Academic Keynote',
    situation: 'A university professor delivering a keynote address on urban sustainability.',
    dialogue: [
      {
        speaker: '教授',
        text: '持続可能な都市基盤の構築において、従来の中央集権的なインフラ整備には限界が生じております。',
        reading: 'じぞくかのうな としきばんの こうちくにおいて、じゅうらいの ちゅうおうしゅうけんてきな インフラせいびには げんかいが しょうじております。',
        translationEn: 'In constructing sustainable urban foundations, limitations have arisen in conventional centralized infrastructure development.',
      },
      {
        speaker: '教授',
        text: '地域コミュニティの主体的な参画を促し、分散型エネルギーシステムを導入することをおいて、真の強靭性を獲得する途は他にありません。',
        reading: 'ちいきコミュニティの しゅたいてきな さんかくを うながし、ぶんさんがたエネルギーシステムを どうにゅうすることを おいて、しんの きょうじんせいを かくとくする みちは ほかにありません。',
        translationEn: 'There is no path to achieving true resilience other than encouraging proactive participation from local communities and introducing distributed energy systems.',
      },
    ],
    questionType: 'summary',
    questionJp: '教授が都市の強靭性獲得のために最も重要だと主張している点は何か？',
    questionEn: 'What point does the professor argue is most crucial for achieving urban resilience?',
    options: [
      '地域コミュニティの主体的参画と分散型エネルギーシステムの導入',
      '中央集権的な巨大インフラの大規模な拡張',
      '都市部から地方への人口の強制的な移住',
      '従来のエネルギー消費量をそのまま維持すること',
    ],
    correctIndex: 0,
    explanation: 'The professor states: 「地域コミュニティの主体的な参画を促し、分散型エネルギーシステムを導入することをおいて、真の強靭性を獲得する途は他にありません」.',
    vocabNotes: [
      { word: '持続可能', reading: 'じぞくかのう', meaning: 'sustainable' },
      { word: '強靭性', reading: 'きょうじんせい', meaning: 'resilience, toughness' },
      { word: '中央集権的', reading: 'ちゅうおうしゅうけんてき', meaning: 'centralized' },
    ],
  },
];

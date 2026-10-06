import { ConfusionPair } from '../types/activeLearning';

export const CONFUSION_PAIRS_DATA: ConfusionPair[] = [
  {
    id: 'conf-ha-ga',
    title: 'は (Topic) vs が (Subject / Identification)',
    conceptA: 'は (Wa - Topic Marker)',
    conceptB: 'が (Ga - Subject / Exhaustive Listing Marker)',
    category: 'particle',
    level: 'N5',
    differenceExplanation:
      '「は」 marks the known topic of the conversation ("Speaking of X..."), while 「が」 introduces new information or marks the specific subject ("It is X that does it / X and only X").',
    contrastRule:
      'Rule 1: In questions with question words (誰, 何, どこ), always use 「が」: 誰が来ましたか？ (Who came?)\nRule 2: For answers to question words, mark the answered subject with 「が」: 田中さんが来ました。(Tanaka-san came).\nRule 3: In subordinate clauses, the subject takes 「が」: 私が買った本 (The book I bought).',
    examplesA: [
      {
        jp: '私は学生です。',
        reading: 'わたしは がくせいです。',
        en: 'As for me, I am a student. (Topic is known; predicate provides new information)',
      },
      {
        jp: '象は鼻が長いです。',
        reading: 'ぞうは はなが ながいです。',
        en: 'As for elephants, their trunks are long. (Elephant = Topic, Trunk = Specific Subject)',
      },
    ],
    examplesB: [
      {
        jp: '誰が来ましたか？ — 田中さんが来ました。',
        reading: 'だれが きましたか？ — たなかさんが きました。',
        en: 'Who came? — Mr. Tanaka came. (Identifying the specific person)',
      },
      {
        jp: '雨が降っています。',
        reading: 'あめが ふっています。',
        en: 'It is raining. (Neutral description of an observed phenomenon)',
      },
    ],
    practiceQuestions: [
      {
        question: 'Q: 「だれ（　）社長ですか？」「私が社長です。」',
        options: ['は', 'が', 'を', 'に'],
        answer: 1,
        explanation: 'Question words like 「だれ」(who) cannot take 「は」; they must take 「が」.',
      },
      {
        question: 'Q: 私（　）昨日買った本はこれです。',
        options: ['は', 'が', 'も', 'で'],
        answer: 1,
        explanation: 'In a relative clause modifying a noun (本), the subject takes 「が」.',
      },
      {
        question: 'Q: 今日（　）いい天気ですね。',
        options: ['は', 'が', 'を', 'に'],
        answer: 0,
        explanation: '「今日は」 sets "today" as the overarching conversational topic.',
      },
    ],
  },
  {
    id: 'conf-ni-de',
    title: 'に (Target / Point in Time) vs で (Location of Action / Means)',
    conceptA: 'に (Ni - Target / Specific Time / Destination)',
    conceptB: 'で (De - Location of Action / Means / Instrument)',
    category: 'particle',
    level: 'N5',
    differenceExplanation:
      '「に」 marks a target destination, static existence, or specific numerical time point. 「で」 marks the location where an active dynamic event occurs, or the tool/method used.',
    contrastRule:
      'Static presence: 部屋にいます (Inside the room - existence → に)\nActive action: 部屋で勉強します (Study in the room - action → で)\nMeans/Method: バスで行きます (Go by bus - means → で)',
    examplesA: [
      {
        jp: '７時に起きます。',
        reading: 'しちじに おきます。',
        en: 'I wake up at 7:00. (Specific clock time takes に)',
      },
      {
        jp: '日本に行きます。',
        reading: 'にほんに いきます。',
        en: 'I will go to Japan. (Destination takes に)',
      },
      {
        jp: '机の上に本があります。',
        reading: 'つくえの うえに ほんが あります。',
        en: 'There is a book on the desk. (Static location takes に)',
      },
    ],
    examplesB: [
      {
        jp: '図書館で本を読みます。',
        reading: 'としょかんで ほんを よみます。',
        en: 'I read books at the library. (Active event location takes で)',
      },
      {
        jp: '箸でご飯を食べます。',
        reading: 'はしで ごはんを たべます。',
        en: 'I eat rice with chopsticks. (Tool/instrument takes で)',
      },
      {
        jp: '電車で会社へ通います。',
        reading: 'でんしゃで かいしゃへ かよいます。',
        en: 'I commute to company by train. (Transportation means takes で)',
      },
    ],
    practiceQuestions: [
      {
        question: 'Q: レストラン（　）友達と夕食を食べました。',
        options: ['に', 'で', 'へ', 'を'],
        answer: 1,
        explanation: 'Eating dinner is an active event, so the location takes 「で」.',
      },
      {
        question: 'Q: 明日の会議は９時（　）始まります。',
        options: ['で', 'に', 'を', 'から'],
        answer: 1,
        explanation: 'Specific clock time points take 「に」.',
      },
      {
        question: 'Q: この手紙を日本語（　）書いてください。',
        options: ['に', 'で', 'へ', 'が'],
        answer: 1,
        explanation: 'Language as a means/tool takes 「で」 (日本語で = in Japanese).',
      },
    ],
  },
  {
    id: 'conf-kara-node',
    title: 'から (Subjective Reason) vs ので (Objective / Polite Cause)',
    conceptA: 'から (Kara - Reason / Personal Opinion)',
    conceptB: 'ので (Node - Objective Cause / Natural Result)',
    category: 'grammar',
    level: 'N4',
    differenceExplanation:
      '「から」 expresses the speaker’s subjective reason, justification, or personal intent. 「ので」 presents an objective, matter-of-fact circumstance gently and politely.',
    contrastRule:
      'Requests & Commands: For direct requests, suggestions, or commands (〜てください, 〜ましょう), prefer 「から」.\nPolite business reasons: When apologizing or stating facts to superiors/clients, use 「ので」.',
    examplesA: [
      {
        jp: '危ないですから、触らないでください。',
        reading: 'あぶないですから、さわらないで ください。',
        en: 'It is dangerous, so please do not touch it. (Direct instruction following personal warning)',
      },
      {
        jp: '美味しいから、もっと食べよう。',
        reading: 'おいしいから、もっと たべよう。',
        en: 'Because it is delicious, let us eat more. (Personal feeling/suggestion)',
      },
    ],
    examplesB: [
      {
        jp: '電車が遅れましたので、遅刻いたしました。',
        reading: 'でんしゃが おくれましたので、ちこく いたしました。',
        en: 'Because the train was delayed, I arrived late. (Objective polite explanation)',
      },
      {
        jp: '頭が痛いので、今日は早く帰ります。',
        reading: 'あたまが いたいので、きょうは はやく かえります。',
        en: 'Because my head hurts, I will return early today. (Polite and non-assertive)',
      },
    ],
    practiceQuestions: [
      {
        question: 'Q: 申し訳ございません。道路が混雑していた（　）、遅刻いたしました。',
        options: ['から', 'ので', 'のに', 'けど'],
        answer: 1,
        explanation: 'In polite business/formal apologies, 「ので」 is the appropriate objective cause.',
      },
      {
        question: 'Q: 時間がない（　）、急いでください！',
        options: ['ので', 'から', 'のに', 'なら'],
        answer: 1,
        explanation: 'Direct commands/requests (急いでください) naturally pair with subjective 「から」.',
      },
    ],
  },
  {
    id: 'conf-souda-youda-rashii',
    title: 'そうだ (Appearance/Hearsay) vs ようだ (Sensory Resemblance) vs らしい (Typical / Indirect Evidence)',
    conceptA: '〜そうだ (Visual Impression: Looks like / Hearsay: I heard that)',
    conceptB: '〜ようだ (Sensory Evidence / Metaphorical Simile: Appears to be)',
    conceptC: '〜らしい (Indirect Evidence / Typical Prototypical Quality)',
    category: 'grammar',
    level: 'N3',
    differenceExplanation:
      'Stem + そうだ = instant visual impression ("looks about to fall/delicious"). Plain form + そうだ = hearsay ("I heard that..."). ようだ = deduction based on personal senses/evidence. らしい = conclusion based on rumors/reports, or behaving truly like its definition (男らしい).',
    contrastRule:
      '美味【しそう】(Stem): Looks delicious (Visual glance)\n美味【しいそうだ】(Plain): I heard it is delicious (Hearsay)\n雨が降りそうだ (Immediate visual imminent event: It looks about to rain)\n雨が降っているようだ (Sensory reasoning: Hearing drops, people with umbrellas)',
    examplesA: [
      {
        jp: '雨が今にも降りそうです。',
        reading: 'あめが いまにも ふりそうです。',
        en: 'It looks as if it will rain any moment. (Imminent visual sign)',
      },
      {
        jp: '天気予報によると、明日は晴れるそうです。',
        reading: 'てんきよほうによると、あしたは はれるそうです。',
        en: 'According to the weather forecast, I heard it will be clear tomorrow. (Hearsay)',
      },
    ],
    examplesB: [
      {
        jp: '外は寒いようです。みんな厚いコートを着ています。',
        reading: 'そとは さむいようです。みんな あつい コートを きています。',
        en: 'It seems to be cold outside. Everyone is wearing thick coats. (Deduction from evidence)',
      },
    ],
    examplesC: [
      {
        jp: '噂では、田中さんは転職するらしいですよ。',
        reading: 'うわさでは、たなかさんは てんしょくする らしいですよ。',
        en: 'According to rumors, it seems Tanaka-san is changing jobs. (Reported evidence)',
      },
    ],
    practiceQuestions: [
      {
        question: 'Q: あのケーキ、とても美味し（　）ですね！',
        options: ['そう', 'よう', 'らしい', 'みたい'],
        answer: 0,
        explanation: 'Visual impression from looking directly at the cake: 美味し + そう = 美味しそう.',
      },
      {
        question: 'Q: ニュースによると、昨日大きな地震が起きた（　）。',
        options: ['そうだ', 'ようだ', 'そうに', 'ように'],
        answer: 0,
        explanation: 'News report citation (ニュースによると) indicates hearsay: Plain form + そうだ.',
      },
    ],
  },
  {
    id: 'conf-kotoninaru-kotonisuru',
    title: 'ことになる (Decided by Outside Circumstance) vs ことにする (Personal Decision)',
    conceptA: '〜ことになる (Decided by rule, company, or circumstances)',
    conceptB: '〜ことにする (Decided by speaker’s conscious will)',
    category: 'grammar',
    level: 'N3',
    differenceExplanation:
      '「ことになる」 expresses that a situation or outcome has been decided by organization, rules, or fate, regardless of personal will. 「ことにする」 emphasizes personal resolution or self-determined choice.',
    contrastRule:
      'Company transfers: 転勤することになりました (Company decided)\nPersonal resolve: 毎日３０分ジョギングすることにしました (I personally decided)',
    examplesA: [
      {
        jp: '来月から大阪支社へ転勤することになりました。',
        reading: 'らいげつから おおさかししゃへ てんきんすることに なりました。',
        en: 'It has been decided that I will transfer to Osaka branch next month. (Company decision)',
      },
    ],
    examplesB: [
      {
        jp: '健康のために、毎朝野菜ジュースを飲むことにしました。',
        reading: 'けんこうのために、まいあさ やさいジュースを のむことに しました。',
        en: 'For my health, I decided to drink vegetable juice every morning. (Personal choice)',
      },
    ],
    practiceQuestions: [
      {
        question: 'Q: 会社の規則で、オフィスでは禁煙という（　）。',
        options: ['ことになった', 'ことにした', 'ことだった', 'ことにある'],
        answer: 0,
        explanation: 'Company rule (会社の規則) is an official regulation, so 「ことになった」 is correct.',
      },
    ],
  },
  {
    id: 'conf-sonkeigo-kenjougo',
    title: '尊敬語 (Honorific - Elevating Superiors) vs 謙譲語 (Humble - Lowering Self)',
    conceptA: '尊敬語 (Sonkeigo - Elevating the client / partner / superior)',
    conceptB: '謙譲語 (Kenjougo - Lowering myself / my in-group)',
    category: 'keigo',
    level: 'N3',
    differenceExplanation:
      '尊敬語 (Sonkeigo) is used when the SUPERIOR or CLIENT is performing the action (いらっしゃる, おっしゃる, ご覧になる). 謙譲語 (Kenjougo) is used when YOU or YOUR COMPANY is performing the action directed toward the client (参る, 申す, 拝見する).',
    contrastRule:
      'CRITICAL GOLDEN RULE:\nNever use Sonkeigo for your own action: ✖ 私がいらっしゃいました → 〇 私が参りました\nNever use Kenjougo for the client: ✖ 部長が申しました → 〇 部長がおっしゃいました',
    examplesA: [
      {
        jp: '社長はもう資料をご覧になりましたか？',
        reading: 'しゃちょうは もう しりょうを ごらんになりましたか？',
        en: 'Has the company president already viewed the documents? (Elevating president: ご覧になる)',
      },
      {
        jp: '田中様、何とおっしゃいましたか？',
        reading: 'たなかさま、なんとおっしゃいましたか？',
        en: 'Tanaka-sama, what did you say? (Elevating client: おっしゃる)',
      },
    ],
    examplesB: [
      {
        jp: '私がお送りいただいた企画書を拝見いたしました。',
        reading: 'わたしが おおくりいただいた きかくしょを はいけんいたしました。',
        en: 'I had the honor of reading the proposal you sent. (Humble self: 拝見する)',
      },
      {
        jp: '明日１０時に御社へ伺います。',
        reading: 'あした じゅうじに おんしゃへ うかがいます。',
        en: 'I will humbly visit your company tomorrow at 10:00. (Humble visit: 伺う)',
      },
    ],
    practiceQuestions: [
      {
        question: 'Q: （お客様に向かって）「明日の午後、ご都合はいかが（　）でしょうか。」',
        options: ['よろしい', '申し上げ', '伺い', '参り'],
        answer: 0,
        explanation: 'Polite honorific inquiry to client: 「よろしいでしょうか」.',
      },
      {
        question: 'Q: 私がその企画書を（　）いたしました。',
        options: ['拝見', 'ご覧', 'おっしゃい', 'いらっしゃい'],
        answer: 0,
        explanation: 'Action performed by "I" (私) toward client documents requires humble Kenjougo: 「拝見いたしました」.',
      },
    ],
  },
  {
    id: 'conf-kanji-mi-matsu',
    title: '未 (Not Yet - Top stroke shorter) vs 末 (End - Top stroke longer)',
    conceptA: '未 (MI / hitsuji / ima-da - Not yet / incomplete)',
    conceptB: '末 (MATSU, BATSU / sue - End / tip / posterity)',
    category: 'kanji',
    level: 'N3',
    differenceExplanation:
      '「未」 has a SHORTER top horizontal stroke and a longer second stroke (representing a tree whose branches have not fully grown yet: 未定, 未来). 「末」 has a LONGER top horizontal stroke and shorter second stroke (representing the high tip/end of a tree branch: 年末, 週末).',
    contrastRule:
      '未: Top is SHORT (未熟, 未定, 未来)\n末: Top is LONG (月末, 結末, 末っ子)',
    examplesA: [
      {
        jp: '未来（みらい）の計画はまだ未定（みてい）です。',
        reading: 'みらいの けいかくは まだ みていです。',
        en: 'Future plans are not yet decided. (未 = not yet)',
      },
    ],
    examplesB: [
      {
        jp: '今週末（こんしゅうまつ）に月末（げつまつ）の報告書を提出します。',
        reading: 'こんしゅうまつに げつまつの ほうこくしょを ていしゅつします。',
        en: 'I will submit the end-of-month report this weekend. (末 = end)',
      },
    ],
    practiceQuestions: [
      {
        question: 'Q: 「みらい」の漢字はどれですか？',
        options: ['未来', '末来', '本来', '未末'],
        answer: 0,
        explanation: '「未来」(Future) means "not yet arrived", using 「未」(top stroke shorter).',
      },
      {
        question: 'Q: 「しゅうまつ」の漢字はどれですか？',
        options: ['週末', '週未', '週本', '週休'],
        answer: 0,
        explanation: '「週末」(Weekend) means "end of the week", using 「末」(top stroke longer).',
      },
    ],
  },
];

// ============================================================================
// HORENSO, TELEPHONE, MEETING & NEGOTIATION DATA
// Authentic Workplace Dialogue Scripts, Scenarios & Roleplay Training
// ============================================================================

export interface WorkplaceDialogueItem {
  id: string;
  category: 'telephone' | 'meeting' | 'horenso' | 'negotiation';
  titleJp: string;
  titleEn: string;
  situation: string;
  keyRule: string;
  dialogueLines: {
    speaker: string;
    speakerRole: 'internal' | 'client' | 'boss' | 'you';
    japanese: string;
    reading?: string;
    english: string;
    keyLearningPoint?: string;
  }[];
  essentialPhrases: { phrase: string; reading?: string; meaning: string; situation: string }[];
}

export const WORKPLACE_SCRIPTS_DATA: WorkplaceDialogueItem[] = [
  // 1. TELEPHONE: Taking Call & Taking Message when Person in Charge is Absent
  {
    id: 'phone-01-absent-message',
    category: 'telephone',
    titleJp: '不在時の電話対応と伝言（折り返し依頼）',
    titleEn: 'Taking a Phone Message When Colleague is Absent',
    situation: 'An external client calls asking to speak with your manager (Yamada), but Yamada is currently out at a client visit until 16:00.',
    keyRule: 'Never say "山田課長は外出しています". In Japanese business, strip internal titles when talking to outsiders: say "山田は外出しております".',
    dialogueLines: [
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'お電話ありがとうございます。株式会社テックリード、営業企画部でございます。',
        reading: 'おでんわありがとうございます。かぶしきがいしゃ テックリード、えいぎょうきかくぶで ございます。',
        english: 'Thank you for calling. This is the Sales Planning Department at TechLead Co., Ltd.',
        keyLearningPoint: 'Answer within 2 rings. If more than 3 rings, open with 「大変お待たせいたしました」.',
      },
      {
        speaker: '相手（顧客）',
        speakerRole: 'client',
        japanese: 'いつもお世話になっております。グローバル商事の伊藤と申しますが、山田課長はいらっしゃいますでしょうか。',
        reading: 'いつも おせわになっております。グローバルしょうじの いとうと もうしますが、やまだかちょうは いらっしゃいますでしょうか。',
        english: 'Thank you as always. This is Ito from Global Trading. Is Section Chief Yamada available?',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'グローバル商事の伊藤様、いつも大変お世話になっております。申し訳ございません、あいにく山田は外出しておりまして、16時頃の帰社を予定しております。',
        reading: 'グローバルしょうじの いとうさま、いつも たいへんおせわになっております。もうしわけございません、あいにく やまだは がいしゅつしておりまして、じゅうろくじごろの きしゃを よていしております。',
        english: 'Mr. Ito of Global Trading, thank you very much as always. I am very sorry, but unfortunately Yamada is currently out of the office and is scheduled to return around 16:00.',
        keyLearningPoint: 'Note: No "課長" or "さん" attached to Yamada! Yamada is an in-group member (ウチ) relative to the client (ソト).',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'よろしければ、戻り次第、山田よりお電話を差し上げるよう申し伝えましょうか。',
        reading: 'よろしければ、もどりしだい、やまだより おでんわを さしあげるよう もうしつたえましょうか。',
        english: 'If you would like, shall I convey to him to give you a call back as soon as he returns?',
        keyLearningPoint: 'Use Kenjougo 「お電話を差し上げる」 (humble for making a call) and 「申し伝える」 (humble for telling internal staff).',
      },
      {
        speaker: '相手（顧客）',
        speakerRole: 'client',
        japanese: '助かります。では恐れ入りますが、折り返しのお電話をお願いできますでしょうか。',
        reading: 'たすかります。では おそれいりますが、おりかえしの おでんわを おねがいできますでしょうか。',
        english: 'That would be very helpful. Then excuse me, but could you please ask him to call me back?',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'かしこまりました。念のため、伊藤様のお電話番号をお伺いしてもよろしいでしょうか。',
        reading: 'かしこまりました。ねんのため、いとうさまの おでんわばんごうを おうかがいしても よろしいでしょうか。',
        english: 'Understood. Just to be completely certain, may I ask for your phone number, Mr. Ito?',
        keyLearningPoint: 'Always verify call-back phone numbers and repeat back (復唱確認).',
      },
    ],
    essentialPhrases: [
      { phrase: 'あいにく山田は外出しております', reading: 'あいにく やまだは がいしゅつしております', meaning: 'Unfortunately Yamada is out of the office right now', situation: 'Handling outside callers' },
      { phrase: '戻り次第、お電話を差し上げるよう申し伝えます', reading: 'もどりしだい、おでんわを さしあげるよう もうしつたえます', meaning: 'I will inform him to call you back as soon as he returns', situation: 'Promising a call-back' },
      { phrase: '私、営業企画部の〇〇が承りました', reading: 'わたくし、えいぎょうきかくぶの 〇〇が うけたまわりました', meaning: 'I, [Name] of the Sales Planning Dept, have taken your message', situation: 'Closing reassurance' },
    ],
  },

  // 2. MEETING: Facilitating & Respectfully Disagreeing
  {
    id: 'meet-01-disagree-cushion',
    category: 'meeting',
    titleJp: '会議での建設的な反対意見と合意形成',
    titleEn: 'Respectful Disagreement & Constructive Consensus in Meetings',
    situation: 'In an internal cross-functional meeting, another department manager proposes rushing a product release by cutting security testing.',
    keyRule: 'Never say "それは間違っています" (That is wrong). Acknowledge their intention first (クッション肯定), then introduce risks and an alternative solution.',
    dialogueLines: [
      {
        speaker: '他部署マネージャー',
        speakerRole: 'internal',
        japanese: '競合が新機能を出してきたので、我が社も来週初旬にリリースを前倒しすべきだと思います。セキュリティ試験は後回しにしましょう。',
        reading: 'きょうごうが しんきのうを だしてきたので、わがしゃも らいしゅうしょじゅんに リリースを まえだおしすべきだと おもいます。セキュリティしけんは あとまわしに しましょう。',
        english: 'Competitors have launched their new feature, so I believe our company should push forward the launch to early next week. Let’s defer security testing until later.',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: '佐藤マネージャー、市場の先手を打ちたいというスピード感の重要性は重々承知しておりますし、おっしゃる趣旨には大変共感いたします。',
        reading: 'さとうマネージャー、しじょうの せんてを うちたいという スピードかんの じゅうようせいは じゅうじゅう しょうちしておりますし、おっしゃる しゅしには たいへん きょうかんいたします。',
        english: 'Manager Sato, I fully understand the crucial importance of speed in taking the market initiative, and I deeply empathize with your intention.',
        keyLearningPoint: 'Step 1: Complete psychological affirmation before raising counterpoints (受容と共感).',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'ただ、大変申し上げにくいのですが、過去の事例を鑑みますと、決済周りのセキュリティ試験を省略した場合、万一の障害発生時にブランド棄損リスクが極めて高くなります。',
        reading: 'ただ、たいへん もうしあげにくいのですが、かこの じれいを かんがみますと、けっさいまわりの セキュリティしけんを しょうりゃくした ばあい、まんいちの しょうがいはっせいじに ブランドきそんリスクが きわめて たかくなります。',
        english: 'However, while it is very difficult for me to say this, reflecting upon past precedents, if we bypass security testing around payments, the risk to our brand reputation should an incident occur would be exceedingly high.',
        keyLearningPoint: 'Step 2: Cushion phrase 「大変申し上げにくいのですが」 + Focus on objective systemic risk rather than attacking the person.',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'そこで折衷案として、コアの認証機能のみ3日間で集中検証した上で、ベータテスター限定で先行公開するフェーズ分割リリースをご提案したいのですが、いかがでしょうか。',
        reading: 'そこで せっちゅうあんとして、コアの にんしょうきのうのみ みっかかんで しゅうちゅうけんしょうした うえで、ベータテスターげんていで せんこうこうかいする フェーズぶんかつリリースを ごていあんしたいのですが、いかがでしょうか。',
        english: 'Therefore, as a compromise solution, I would like to propose a phased release where we run concentrated 3-day tests on core authentication only, and do an early rollout restricted to beta testers. How would you view this?',
        keyLearningPoint: 'Step 3: Constructive alternative solution (代替案の提示).',
      },
    ],
    essentialPhrases: [
      { phrase: 'おっしゃる趣旨は重々理解できるのですが', reading: 'おっしゃる しゅしは じゅうじゅう りかいできるのですが', meaning: 'I fully grasp the intent of what you are saying, however...', situation: 'Soft disagreement cushion' },
      { phrase: '大変申し上げにくいのですが', reading: 'たいへん もうしあげにくいのですが', meaning: 'It is very awkward/difficult for me to mention this, but...', situation: 'Highlighting unpleasant facts' },
      { phrase: '折衷案といたしましては', reading: 'せっちゅうあんと いたしましては', meaning: 'As a mutually agreeable compromise proposal...', situation: 'Bridging deadlock' },
    ],
  },

  // 3. HORENSO: The 3 Modes (Houkoku, Renraku, Soudan)
  {
    id: 'horenso-01-incident-escalation',
    category: 'horenso',
    titleJp: 'トラブル発生時の緊急「報告・連絡・相談」',
    titleEn: 'Emergency HORENSO: Problem Escalation & Consultation',
    situation: 'A vendor API delivery is delayed by 3 days, jeopardizing the client demo scheduled for Friday.',
    keyRule: 'Bad news must be escalated at light speed (バッドニュース・ファースト). Separate Facts (事実) from Opinions/Speculations (意見・推測).',
    dialogueLines: [
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: '課長、今お時間3分ほどよろしいでしょうか。金曜日のクライアントデモに関わる至急のご相談がございます。',
        reading: 'かちょう、いま おじかん さんぷんほど よろしいでしょうか。きんようびの クライアントデモに かかわる しきゅうの ごそうだんが ございます。',
        english: 'Section Chief, do you have about 3 minutes right now? I have an urgent consultation regarding Friday’s client demo.',
        keyLearningPoint: 'Announce time duration ("3分ほど") and urgency level immediately.',
      },
      {
        speaker: '上司（課長）',
        speakerRole: 'boss',
        japanese: 'どうした？手短に聞こう。',
        reading: 'どうした？てみじかに きこう。',
        english: 'What happened? Keep it concise.',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: '結論から申し上げますと、提携先APIの納品が3日遅延する見込みとなり、このままでは金曜日のリアルタイム決済デモが動作いたしません。',
        reading: 'けつろんから もうしあげますと、ていけいさき エーピーアイの のうひんが みっか ちえんする みこみとなり、このままでは きんようびの リアルタイムけっさいデモが どうさいたしません。',
        english: 'To state the conclusion first: the partner API delivery is projected to be delayed by 3 days, meaning at this rate the real-time payment demo will not function this Friday.',
        keyLearningPoint: 'Conclusion first (結論ファースト). No beating around the bush.',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'つきましては、私の方で以下の2つの対応策を検討いたしました。\nA案：モックデータを用いたシミュレーション環境で金曜日に予定通り実施する\nB案：クライアントへ本日中に正直にお詫びと理由を説明し、デモを来週火曜日に延期いただく\nリスクを鑑みますと、私はA案で進行したく存じますが、課長のご判断を仰げますでしょうか。',
        reading: 'つきましては、わたしのほうで いかの ふたつの たいおうさくを けんとういたしました。...かちょうの ごはんだんを あおげますでしょうか。',
        english: 'Therefore, I have evaluated the following two countermeasures:\nOption A: Proceed as scheduled on Friday using a mock simulation environment\nOption B: Sincerely apologize and explain to the client today, postponing the demo to next Tuesday\nConsidering the risks, I recommend proceeding with Option A, but may I seek your decision, Chief?',
        keyLearningPoint: 'Never consult empty-handed! Always bring 2 concrete options with your personal recommendation (A案・B案と自分の見解).',
      },
    ],
    essentialPhrases: [
      { phrase: '結論から申し上げますと', reading: 'けつろんから もうしあげますと', meaning: 'To state the conclusion first...', situation: 'Standard business report opening' },
      { phrase: '〇〇についてご相談がございます。今お時間よろしいでしょうか', reading: '〇〇について ごそうだんが ございます。いま おじかん よろしいでしょうか', meaning: 'I have a consultation regarding [Topic]. Do you have a moment right now?', situation: 'Initiating Soudan with superior' },
      { phrase: '私としてはA案を推奨いたしますが、ご判断を仰ぎたく存じます', reading: 'わたしとしては エーあんを すいしょういたしますが、ごはんだんを あおぎたくぞんじます', meaning: 'Personally I recommend Option A, but I would like to seek your judgment', situation: 'Presenting solutions to manager' },
    ],
  },

  // 4. NEGOTIATION: Deadline Adjustment with Preserved Trust
  {
    id: 'nego-01-deadline-adjustment',
    category: 'negotiation',
    titleJp: '納期調整・仕様変更のタフネゴシエーション',
    titleEn: 'Commercial Negotiation: Deadline Extension with Trust Preservation',
    situation: 'Negotiating a 1-week timeline adjustment with a key client without incurring penalties or losing relationship goodwill.',
    keyRule: 'Give-and-Take trade-off logic. When asking for time, offer additional value (free extra testing, priority support) so the client feels they gained.',
    dialogueLines: [
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: '木村部長、先日ご要望いただきました追加の多言語対応機能につきまして、チームで精査いたしました。',
        reading: 'きむらぶちょう、せんじつ ごようぼういただきました ついかの たげんごたいおうきのうにつきまして、チームで せいさいたしました。',
        english: 'Director Kimura, our team has carefully examined the additional multilingual support features you requested the other day.',
      },
      {
        speaker: '相手（顧客部長）',
        speakerRole: 'client',
        japanese: 'どうですか？予定通り今月末で全て納品できそうでしょうか。',
        reading: 'どうですか？よていどおり こんげつまつで すべて のうひんできそうでしょうか。',
        english: 'How is it looking? Can you deliver everything by the end of this month as planned?',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'ご期待に添いたい気持ちは山々なのですが、品質を一切妥協せず本番のセキュリティ試験を完遂するため、大変恐縮ながら【1週間の納期の猶予】を頂戴したくご相談に上がりました。',
        reading: 'ごきたいに そいたい きもちは やまやまなのですが、ひんしつを いっさい だきょうせず ほんばんの セキュリティしけんを かんすいするため、たいへん きょうしゅくながら【いっしゅうかんの のうきの ゆうよ】を ちょうだいしたく ごそうだんに あがりました。',
        english: 'We desire wholeheartedly to meet your expectations; however, in order to complete rigorous production security testing without compromising quality whatsoever, I have come to humbly request a 1-week timeline extension.',
        keyLearningPoint: 'Frame the extension as protection for THE CLIENT’s quality, not your own laziness.',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'その代わりといたしまして、本来は有償オプションである「導入後3ヶ月間の24時間監視サポート」を弊社負担にて無償提供させていただきたく存じます。いかがでしょうか。',
        reading: 'そのかわりと いたしまして、ほんらいは ゆうしょうオプションである「どうにゅうご さんかげつかんの にじゅうよじかん かんしサポート」を へいしゃふたんにて むしょうていきょうさせていただきたくぞんじます。いかがでしょうか。',
        english: 'In return, we would like to provide "3 months of 24-hour monitoring support" post-launch—normally a paid option—entirely free of charge at our expense. How would that be?',
        keyLearningPoint: 'Offer a compensatory concession (見返りの付加価値) so the client does not feel disadvantaged.',
      },
    ],
    essentialPhrases: [
      { phrase: 'ご期待に添いたい気持ちは山々なのですが', reading: 'ごきたいに そいたい きもちは やまやまなのですが', meaning: 'We desire wholeheartedly to meet your expectations, however...', situation: 'Empathetic lead-in to tough negotiation' },
      { phrase: '品質を一切妥協しないため', reading: 'ひんしつを いっさい だきょうしないため', meaning: 'In order not to compromise on quality whatsoever', situation: 'Framing timeline for client benefit' },
      { phrase: 'その代わりといたしまして、〜を提供させていただきます', reading: 'そのかわりと いたしまして、〜を ていきょうさせていただきます', meaning: 'In return as compensation, allow us to offer...', situation: 'Trade-off deal sweetening' },
    ],
  },
];

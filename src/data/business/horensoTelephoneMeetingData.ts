// ============================================================================
// HORENSO, TELEPHONE, MEETING & NEGOTIATION DATA
// Authentic Workplace Dialogue Scripts, Scenarios & Roleplay Training
// ============================================================================

export interface WorkplaceDialogueItem {
  id: string;
  category: 'telephone' | 'meeting' | 'horenso' | 'negotiation';
  titleJp: string;
  titleEn: string;
  titleMy?: string;
  situation: string;
  situationMy?: string;
  keyRule: string;
  keyRuleMy?: string;
  dialogueLines: {
    speaker: string;
    speakerRole: 'internal' | 'client' | 'boss' | 'you';
    japanese: string;
    reading?: string;
    english: string;
    myanmar?: string;
    keyLearningPoint?: string;
    keyLearningPointMy?: string;
  }[];
  essentialPhrases: {
    phrase: string;
    reading?: string;
    meaning: string;
    meaningMy?: string;
    situation: string;
    situationMy?: string;
  }[];
}

export const WORKPLACE_SCRIPTS_DATA: WorkplaceDialogueItem[] = [
  // 1. TELEPHONE: Taking Call & Taking Message when Person in Charge is Absent
  {
    id: 'phone-01-absent-message',
    category: 'telephone',
    titleJp: '不在時の電話対応と伝言（折り返し依頼）',
    titleEn: 'Taking a Phone Message When Colleague is Absent',
    titleMy: 'လုပ်ဖော်ကိုင်ဖက်မရှိချိန်တွင် ဖုန်းလက်ခံပြောဆိုခြင်းနှင့် ပြန်ခေါ်ပေးရန် မှာကြားချက်လက်ခံခြင်း',
    situation: 'An external client calls asking to speak with your manager (Yamada), but Yamada is currently out at a client visit until 16:00.',
    situationMy: 'ပြင်ပဖောက်သည်တစ်ဦးမှ မန်နေဂျာ (ယမဒ) နှင့် စကားပြောရန် ဖုန်းဆက်လာသော်လည်း ယမဒသည် ညနေ ၄:၀၀ နာရီအထိ ဖောက်သည်ထံ သွားရောက်နေပါသည်။',
    keyRule: 'Never say "山田課長は外出しています". In Japanese business, strip internal titles when talking to outsiders: say "山田は外出しております".',
    keyRuleMy: '"山田課長は外出しています" ဟု ဘယ်တော့မှ မပြောရပါ။ ပြင်ပဧည့်သည်နှင့် ပြောဆိုရာတွင် ရာထူးဘွဲ့ထူးကို ဖြုတ်၍ "山田は外出しております" ဟုသာ ယဉ်ကျေးစွာ ပြောရမည်။',
    dialogueLines: [
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'お電話ありがとうございます。株式会社テックリード、営業企画部でございます。',
        reading: 'おでんわありがとうございます。かぶしきがいしゃ テックリード、えいぎょうきかくぶで ございます。',
        english: 'Thank you for calling. This is the Sales Planning Department at TechLead Co., Ltd.',
        myanmar: 'ဖုန်းခေါ်ဆိုမှုအတွက် ကျေးဇူးတင်ပါသည်။ TechLead Co., Ltd. ၏ အရောင်းစီမံကိန်းဌာနမှ ဖြစ်ပါသည်ခင်ဗျာ။',
        keyLearningPoint: 'Answer within 2 rings. If more than 3 rings, open with 「大変お待たせいたしました」.',
        keyLearningPointMy: 'ဖုန်းမြည်သံ ၂ ချက်အတွင်း ဖြေဆိုပါ။ အကယ်၍ ၃ ချက်ထက်ကျော်ပါက 「大変お待たせいたしました」(အကြာကြီးစောင့်ဆိုင်းစေမိသည့်အတွက် အားနာပါသည်) ဖြင့် စတင်ပါ။',
      },
      {
        speaker: '相手（顧客）',
        speakerRole: 'client',
        japanese: 'いつもお世話になっております。グローバル商事の伊藤と申しますが、山田課長はいらっしゃいますでしょうか。',
        reading: 'いつも おせわになっております。グローバルしょうじの いとうと もうしますが、やまだかちょうは いらっしゃいますでしょうか。',
        english: 'Thank you as always. This is Ito from Global Trading. Is Section Chief Yamada available?',
        myanmar: 'အစဉ်အမြဲ ကျေးဇူးတင်ရှိပါသည်။ Global Trading မှ Ito ဖြစ်ပါသည်။ ဌာနမှူး ယမဒ ရှိပါသလားခင်ဗျာ။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'グローバル商事の伊藤様、いつも大変お世話になっております。申し訳ございません、あいにく山田は外出しておりまして、16時頃の帰社を予定しております。',
        reading: 'グローバルしょうじの いとうさま、いつも たいへんおせわになっております。もうしわけございません、あいにく やまだは がいしゅつしておりまして、じゅうろくじごろの きしゃを よていしております。',
        english: 'Mr. Ito of Global Trading, thank you very much as always. I am very sorry, but unfortunately Yamada is currently out of the office and is scheduled to return around 16:00.',
        myanmar: 'Global Trading မှ Mr. Ito ခင်ဗျာ၊ အစဉ်အမြဲ အထူးကျေးဇူးတင်ပါသည်။ အားနာရပါသည်၊ ယမဒမှာ အပြင်သို့ ခေတ္တထွက်သွားပါသဖြင့် ညနေ ၄ နာရီခန့်တွင် ကုမ္ပဏီသို့ ပြန်ရောက်မည်ဟု ခန့်မှန်းရပါသည်။',
        keyLearningPoint: 'Note: No "課長" or "さん" attached to Yamada! Yamada is an in-group member (ウチ) relative to the client (ソト).',
        keyLearningPointMy: 'မှတ်ချက် - ယမဒ ၏ နောက်တွင် "課長" သို့မဟုတ် "さん" မထည့်ရပါ! ယမဒသည် ပြင်ပဖောက်သည်ရှေ့တွင် မိမိဘက်သား (ウチ) ဖြစ်သောကြောင့် ဖြစ်သည်။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'よろしければ、戻り次第、山田よりお電話を差し上げるよう申し伝えましょうか。',
        reading: 'よろしければ、もどりしだい、やまだより おでんわを さしあげるよう もうしつたえましょうか。',
        english: 'If you would like, shall I convey to him to give you a call back as soon as he returns?',
        myanmar: 'အဆင်ပြေမည်ဆိုပါက ယမဒ ပြန်ရောက်သည်နှင့် တစ်ပြိုင်နက် လူကြီးမင်းထံ ပြန်လည်ဖုန်းခေါ်ဆိုပေးရန် ပြောကြားပေးရမလားခင်ဗျာ။',
        keyLearningPoint: 'Use Kenjougo 「お電話を差し上げる」 (humble for making a call) and 「申し伝える」 (humble for telling internal staff).',
        keyLearningPointMy: 'နှိမ့်ချစကား (Kenjougo) ဖြစ်သော 「お電話を差し上げる」(ဖုန်းဆက်ပေးသည်) နှင့် 「申し伝える」(အသိပေးပြောကြားသည်) ကို သုံးပါ။',
      },
      {
        speaker: '相手（顧客）',
        speakerRole: 'client',
        japanese: '助かります。では恐れ入りますが、折り返しのお電話をお願いできますでしょうか。',
        reading: 'たすかります。では おそれいりますが、おりかえしの おでんわを おねがいできますでしょうか。',
        english: 'That would be very helpful. Then excuse me, but could you please ask him to call me back?',
        myanmar: 'ကျေးဇူးတင်လိုက်တာခင်ဗျာ။ ဒါဆိုရင် အားနာပေမယ့် ပြန်လည်ဖုန်းခေါ်ဆိုပေးရန် မေတ္တာရပ်ခံပါရစေ။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'かしこまりました。念のため、伊藤様のお電話番号をお伺いしてもよろしいでしょうか。',
        reading: 'かしこまりました。ねんのため、いとうさまの おでんわばんごうを おうかがいしても よろしいでしょうか。',
        english: 'Understood. Just to be completely certain, may I ask for your phone number, Mr. Ito?',
        myanmar: 'သဘောပေါက်နားလည်ပါပြီခင်ဗျာ။ သေချာစေရန်အတွက် Mr. Ito ၏ ဖုန်းနံပါတ်ကို မေးမြန်းခွင့်ပြုပါခင်ဗျာ။',
        keyLearningPoint: 'Always verify call-back phone numbers and repeat back (復唱確認).',
        keyLearningPointMy: 'ပြန်ခေါ်ရမည့် ဖုန်းနံပါတ်ကို သေချာစစ်ဆေးပြီး ပြန်လည်ရွတ်ဆို အတည်ပြုပါ (復唱確認)။',
      },
    ],
    essentialPhrases: [
      {
        phrase: 'あいにく山田は外出しております',
        reading: 'あいにく やまだは がいしゅつしております',
        meaning: 'Unfortunately Yamada is out of the office right now',
        meaningMy: 'အားနာရပါသည်၊ ယမဒမှာ လောလောဆယ် အပြင်သို့ ထွက်သွားပါသည်',
        situation: 'Handling outside callers',
        situationMy: 'ပြင်ပမှ ဖုန်းဆက်သူများကို ဧည့်ခံပြောဆိုခြင်း',
      },
      {
        phrase: '戻り次第、お電話を差し上げるよう申し伝えます',
        reading: 'もどりしだい、おでんわを さしあげるよう もうしつたえます',
        meaning: 'I will inform him to call you back as soon as he returns',
        meaningMy: 'ပြန်ရောက်သည်နှင့် တစ်ပြိုင်နက် ဖုန်းပြန်ခေါ်ပေးရန် ပြောကြားပေးပါမည်',
        situation: 'Promising a call-back',
        situationMy: 'ဖုန်းပြန်ဆက်ပေးမည်ဟု ကတိပေးပြောဆိုခြင်း',
      },
      {
        phrase: '私、営業企画部の〇〇が承りました',
        reading: 'わたくし、えいぎょうきかくぶの 〇〇が うけたまわりました',
        meaning: 'I, [Name] of the Sales Planning Dept, have taken your message',
        meaningMy: 'ကျွန်တော် အရောင်းစီမံကိန်းဌာနမှ [အမည်] က သတင်းစကားကို မှတ်သားထားလိုက်ပါပြီ',
        situation: 'Closing reassurance',
        situationMy: 'စိတ်ချစေရန် သတင်းစကားမှတ်ယူကြောင်း အတည်ပြုခြင်း',
      },
    ],
  },

  // 2. MEETING: Facilitating & Respectfully Disagreeing
  {
    id: 'meet-01-disagree-cushion',
    category: 'meeting',
    titleJp: '会議での建設的な反対意見と合意形成',
    titleEn: 'Respectful Disagreement & Constructive Consensus in Meetings',
    titleMy: 'အစည်းအဝေးများတွင် လေးစားမှုရှိစွာ သဘောထားကွဲလွဲခြင်းနှင့် အပြုသဘောဆောင်သော သဘောတူညီမှု ရယူခြင်း',
    situation: 'In an internal cross-functional meeting, another department manager proposes rushing a product release by cutting security testing.',
    situationMy: 'ဌာနစုံအစည်းအဝေးတစ်ခုတွင် အခြားဌာနမန်နေဂျာတစ်ဦးမှ လုံခြုံရေးစမ်းသပ်မှုကို လျှော့ချပြီး ထုတ်ကုန်ကို လာမည့်အပတ်တွင် စောစီးစွာ ဖြန့်ချိရန် အဆိုပြုလာသည်။',
    keyRule: 'Never say "それは間違っています" (That is wrong). Acknowledge their intention first (クッション肯定), then introduce risks and an alternative solution.',
    keyRuleMy: '"それは間違っています" (ဒါမှားနေတယ်) ဟု တိုက်ရိုက် မငြင်းပယ်ရပါ။ ၎င်းတို့၏ ရည်ရွယ်ချက်ကို အရင်ဆုံး အသိအမှတ်ပြု လက်ခံပြပြီးမှ (クッション肯定)၊ အန္တရာယ်များနှင့် အစားထိုး ဖြေရှင်းနည်းကို တင်ပြရမည်။',
    dialogueLines: [
      {
        speaker: '他部署マネージャー',
        speakerRole: 'internal',
        japanese: '競合が新機能を出してきたので、我が社も来週初旬にリリースを前倒しすべきだと思います。セキュリティ試験は後回しにしましょう。',
        reading: 'きょうごうが しんきのうを だしてきたので、わがしゃも らいしゅうしょじゅんに リリースを まえだおしすべきだと おもいます。セキュリティしけんは あとまわしに しましょう。',
        english: 'Competitors have launched their new feature, so I believe our company should push forward the launch to early next week. Let’s defer security testing until later.',
        myanmar: 'ပြိုင်ဘက်တွေက Feature အသစ်တွေ ထုတ်လာတဲ့အတွက် ကျွန်တော်တို့ကုမ္ပဏီလည်း လာမယ့်အပတ် အစောပိုင်းမှာ Product Launch ကို အချိန်စောထုတ်သင့်တယ်လို့ ထင်ပါတယ်။ လုံခြုံရေးစမ်းသပ်မှုကို နောက်မှ ဆက်လုပ်ကြတာပေါ့။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: '佐藤マネージャー、市場の先手を打ちたいというスピード感の重要性は重々承知しておりますし、おっしゃる趣旨には大変共感いたします。',
        reading: 'さとうマネージャー、しじょうの せんてを うちたいという スピードかんの じゅうようせいは じゅうじゅう しょうちしておりますし、おっしゃる しゅしには たいへん きょうかんいたします。',
        english: 'Manager Sato, I fully understand the crucial importance of speed in taking the market initiative, and I deeply empathize with your intention.',
        myanmar: 'မန်နေဂျာ ဆာတိုခင်ဗျာ၊ ဈေးကွက်မှာ ဦးဦးဖျားဖျား ဦးဆောင်လိုတဲ့ အလျင်အမြန်ဆောင်ရွက်မှုရဲ့ အရေးပါပုံကို အပြည့်အဝ နားလည်သဘောပေါက်ပြီး၊ ပြောကြားချက် ရည်ရွယ်ချက်ကိုလည်း အထူးပဲ စာနာနားလည်ပါသည်ခင်ဗျာ။',
        keyLearningPoint: 'Step 1: Complete psychological affirmation before raising counterpoints (受容と共感).',
        keyLearningPointMy: 'အဆင့် ၁ - ကန့်ကွက်ချက်မတင်ပြမီ တစ်ဖက်လူ၏ စိတ်ဆန္ဒကို အပြည့်အဝ အသိအမှတ်ပြု လက်ခံပြခြင်း (受容と共感)။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'ただ、大変申し上げにくいのですが、過去の事例を鑑みますと、決済周りのセキュリティ試験を省略した場合、万一の障害発生時にブランド棄損リスクが極めて高くなります。',
        reading: 'ただ、たいへん もうしあげにくいのですが、かこの じれいを かんがみますと、けっさいまわりの セキュリティしけんを しょうりゃくした ばあい、まんいちの しょうがいはっせいじに ブランドきそんリスクが きわめて たかくなります。',
        english: 'However, while it is very difficult for me to say this, reflecting upon past precedents, if we bypass security testing around payments, the risk to our brand reputation should an incident occur would be exceedingly high.',
        myanmar: 'ဒါပေမဲ့ အလွန်ပဲ ပြောရခက်ခဲပါသော်လည်း၊ ယခင်ဖြစ်ရပ် အတွေ့အကြုံများကို ပြန်လည်သုံးသပ်ကြည့်ပါက ငွေပေးချေမှုဆိုင်ရာ လုံခြုံရေးစမ်းသပ်မှုကို ကျော်သွားပါက မတော်တဆ ချို့ယွင်းချက်ဖြစ်ပွားချိန်တွင် အမှတ်တံဆိပ်ဂုဏ်သိက္ခာ ထိခိုက်မှုအန္တရာယ် အလွန်မြင့်မားသွားပါလိမ့်မည်။',
        keyLearningPoint: 'Step 2: Cushion phrase 「大変申し上げにくいのですが」 + Focus on objective systemic risk rather than attacking the person.',
        keyLearningPointMy: 'အဆင့် ၂ - ကူရှင်စကားလုံး 「大変申し上げにくいのですが」 (ပြောရခက်ခဲပါသော်လည်း) + လူပုဂ္ဂိုလ်ကို မတိုက်ခိုက်ဘဲ စနစ်ဆိုင်ရာ အန္တရာယ်ကိုသာ အဓိကထား တင်ပြခြင်း။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'そこで折衷案として、コアの認証機能のみ3日間で集中検証した上で、ベータテスター限定で先行公開するフェーズ分割リリースをご提案したいのですが、いかがでしょうか。',
        reading: 'そこで せっちゅうあんとして、コアの にんしょうきのうのみ みっかかんで しゅうちゅうけんしょうした うえで、ベータテスターげんていで せんこうこうかいする フェーズぶんかつリリースを ごていあんしたいのですが、いかがでしょうか。',
        english: 'Therefore, as a compromise solution, I would like to propose a phased release where we run concentrated 3-day tests on core authentication only, and do an early rollout restricted to beta testers. How would you view this?',
        myanmar: 'ထို့ကြောင့် ကြားခံဖြေရှင်းချက်အနေဖြင့် အဓိက လုံခြုံရေး စစ်ဆေးမှု (Authentication) ကိုသာ ၃ ရက်အတွင်း အာရုံစိုက်စစ်ဆေးပြီးနောက် Beta Tester များအတွက်သာ ကန့်သတ်ဖြန့်ချိမည့် အဆင့်လိုက်ထုတ်ဝေမှုကို အကြံပြုလိုပါသည်၊ မည်သို့သဘောရပါသလဲခင်ဗျာ။',
        keyLearningPoint: 'Step 3: Constructive alternative solution (代替案の提示).',
        keyLearningPointMy: 'အဆင့် ၃ - အပြုသဘောဆောင်သော အစားထိုးဖြေရှင်းနည်းကို တင်ပြခြင်း (代替案の提示)။',
      },
    ],
    essentialPhrases: [
      {
        phrase: 'おっしゃる趣旨は重々理解できるのですが',
        reading: 'おっしゃる しゅしは じゅうじゅう りかいできるのですが',
        meaning: 'I fully grasp the intent of what you are saying, however...',
        meaningMy: 'ပြောကြားချက် ရည်ရွယ်ချက်ကို အပြည့်အဝ နားလည်ပါသော်လည်း...',
        situation: 'Soft disagreement cushion',
        situationMy: 'သဘောထားကွဲလွဲမှုကို နူးညံ့စွာ စတင်ဖွင့်ဟခြင်း',
      },
      {
        phrase: '大変申し上げにくいのですが',
        reading: 'たいへん もうしあげにくいのですが',
        meaning: 'It is very awkward/difficult for me to mention this, but...',
        meaningMy: 'အလွန်ပဲ ပြောရခက်ခဲပါသော်လည်း...',
        situation: 'Highlighting unpleasant facts',
        situationMy: 'မလိုလားအပ်သော အချက်အလက် သို့မဟုတ် အန္တရာယ်များကို ထောက်ပြခြင်း',
      },
      {
        phrase: '折衷案といたしましては',
        reading: 'せっちゅうあんと いたしましては',
        meaning: 'As a mutually agreeable compromise proposal...',
        meaningMy: 'ကြားခံအပေးအယူ ဖြေရှင်းချက်အနေဖြင့်...',
        situation: 'Bridging deadlock',
        situationMy: 'အကျပ်အတည်းကို ကျော်လွှားရန် ညှိနှိုင်းဖြေရှင်းချက် တင်ပြခြင်း',
      },
    ],
  },

  // 3. HORENSO: The 3 Modes (Houkoku, Renraku, Soudan)
  {
    id: 'horenso-01-incident-escalation',
    category: 'horenso',
    titleJp: 'トラブル発生時の緊急「報告・連絡・相談」',
    titleEn: 'Emergency HORENSO: Problem Escalation & Consultation',
    titleMy: 'ပြဿနာဖြစ်ပွားချိန်တွင် အရေးပေါ်「အစီရင်ခံခြင်း・အဆက်အသွယ်ပြုခြင်း・တိုင်ပင်ဆွေးနွေးခြင်း」',
    situation: 'A vendor API delivery is delayed by 3 days, jeopardizing the client demo scheduled for Friday.',
    situationMy: 'မိတ်ဖက် API ပေးပို့မှု ၃ ရက် နောက်ကျမည်ဖြစ်သဖြင့် သောကြာနေ့တွင် ပြုလုပ်မည့် ဖောက်သည် Demo သရုပ်ပြပွဲ ထိခိုက်မည့် အရေးပေါ်အခြေအနေ။',
    keyRule: 'Bad news must be escalated at light speed (バッドニュース・ファースト). Separate Facts (事実) from Opinions/Speculations (意見・推測).',
    keyRuleMy: 'မကောင်းသောသတင်းကို အလင်းအလျင်ကဲ့သို့ အမြန်ဆုံး အစီရင်ခံရမည် (Bad News First)။ ဖြစ်ရပ်အချက်အလက်အစစ်အမှန် (事実) နှင့် ကိုယ်ပိုင်ထင်မြင်ချက် (意見・推測) ကို သဲသဲကွဲကွဲ ခွဲခြားတင်ပြရမည်။',
    dialogueLines: [
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: '課長、今お時間3分ほどよろしいでしょうか。金曜日のクライアントデモに関わる至急のご相談がございます。',
        reading: 'かちょう、いま おじかん さんぷんほど よろしいでしょうか。きんようびの クライアントデモに かかわる しきゅうの ごそうだんが ございます。',
        english: 'Section Chief, do you have about 3 minutes right now? I have an urgent consultation regarding Friday’s client demo.',
        myanmar: 'ဌာနမှူးခင်ဗျာ၊ အခု ၃ မိနစ်ခန့် အချိန်ရနိုင်မလားခင်ဗျာ။ သောကြာနေ့မှာ ပြုလုပ်မယ့် Client Demo နဲ့ ပတ်သက်ပြီး အရေးတကြီး တိုင်ပင်ဆွေးနွေးစရာ ရှိလို့ပါခင်ဗျာ။',
        keyLearningPoint: 'Announce time duration ("3分ほど") and urgency level immediately.',
        keyLearningPointMy: 'ကြာချိန် ("၃ မိနစ်ခန့်") နှင့် အရေးတကြီးအခြေအနေကို ချက်ချင်း အသိပေးဖော်ပြခြင်း။',
      },
      {
        speaker: '上司（課長）',
        speakerRole: 'boss',
        japanese: 'どうした？手短に聞こう。',
        reading: 'どうした？てみじかに きこう。',
        english: 'What happened? Keep it concise.',
        myanmar: 'ဘာဖြစ်လို့လဲ။ တိုတိုတုတ်တုတ် ပြောပြပါဦး။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: '結論から申し上げますと、提携先APIの納品が3日遅延する見込みとなり、このままでは金曜日のリアルタイム決済デモが動作いたしません。',
        reading: 'けつろんから もうしあげますと、ていけいさき エーピーアイの のうひんが みっか ちえんする みこみとなり、このままでは きんようびの リアルタイムけっさいデモが どうさいたしません。',
        english: 'To state the conclusion first: the partner API delivery is projected to be delayed by 3 days, meaning at this rate the real-time payment demo will not function this Friday.',
        myanmar: 'အဓိကကောက်ချက်ကို အရင်ဆုံး တင်ပြရမည်ဆိုလျှင် မိတ်ဖက် API ပေးပို့မှု ၃ ရက် နောက်ကျမည့် အလားအလာရှိနေပြီး၊ ဤအတိုင်းဆိုပါက သောကြာနေ့ Real-time ငွေပေးချေမှု Demo သရုပ်ပြမှုမှာ အလုပ်လုပ်မည် မဟုတ်ပါခင်ဗျာ။',
        keyLearningPoint: 'Conclusion first (結論ファースト). No beating around the bush.',
        keyLearningPointMy: 'ကောက်ချက်ကို အရင်ဆုံးပြောပါ (結論ファースト)။ စကားအပိုများ မသုံးရပါ။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'つきましては、私の方で以下の2つの対応策を検討いたしました。\nA案：モックデータを用いたシミュレーション環境で金曜日に予定通り実施する\nB案：クライアントへ本日中に正直にお詫びと理由を説明し、デモを来週火曜日に延期いただく\nリスクを鑑みますと、私はA案で進行したく存じますが、課長のご判断を仰げますでしょうか。',
        reading: 'つきましては、わたしのほうで いかの ふたつの たいおうさくを けんとういたしました。...かちょうの ごはんだんを あおげますでしょうか。',
        english: 'Therefore, I have evaluated the following two countermeasures:\nOption A: Proceed as scheduled on Friday using a mock simulation environment\nOption B: Sincerely apologize and explain to the client today, postponing the demo to next Tuesday\nConsidering the risks, I recommend proceeding with Option A, but may I seek your decision, Chief?',
        myanmar: 'ထို့ကြောင့် ကျွန်တော့်ဘက်မှ အောက်ပါ ဖြေရှင်းနည်း ၂ ခုကို သုံးသပ်ပြင်ဆင်ထားပါသည် -\nအစီအစဉ် A: Mock Data ကို အသုံးပြုထားသော Simulation စနစ်ဖြင့် သောကြာနေ့တွင် အစီအစဉ်အတိုင်း ဆက်လက်ပြုလုပ်မည်။\nအစီအစဉ် B: Client ထံ ယနေ့အတွင်း အမှန်အတိုင်း တောင်းပန်ရှင်းပြပြီး Demo ကို လာမည့် အင်္ဂါနေ့သို့ ရက်ရွှေ့ဆိုင်းခွင့် တောင်းခံမည်။\nအန္တရာယ်များကို သုံးသပ်ကြည့်ပါက ကျွန်တော့်အနေဖြင့် အစီအစဉ် A ဖြင့် ဆက်လက်ဆောင်ရွက်လိုပါသည်၊ ဌာနမှူး၏ ဆုံးဖြတ်ချက်ကို ခံယူပါရစေခင်ဗျာ။',
        keyLearningPoint: 'Never consult empty-handed! Always bring 2 concrete options with your personal recommendation (A案・B案と自分の見解).',
        keyLearningPointMy: 'လက်ဗလာဖြင့် ဘယ်တော့မှ မတိုင်ပင်ရပါ! ခိုင်မာသော ရွေးချယ်စရာ ၂ ခုနှင့်အတူ မိမိ၏ အကြံပြုချက်ကို အမြဲတမ်း ယူဆောင်သွားပါ (A案・B案と自分の見解)။',
      },
    ],
    essentialPhrases: [
      {
        phrase: '結論から申し上げますと',
        reading: 'けつろんから もうしあげますと',
        meaning: 'To state the conclusion first...',
        meaningMy: 'အဓိကကောက်ချက်ကို အရင်ဆုံး တင်ပြရမည်ဆိုလျှင်...',
        situation: 'Standard business report opening',
        situationMy: 'စီးပွားရေး အစီရင်ခံစာများ စတင်ရာတွင် အသုံးပြုသော စံနှုန်း',
      },
      {
        phrase: '〇〇についてご相談がございます。今お時間よろしいでしょうか',
        reading: '〇〇について ごそうだんが ございます。いま おじかん よろしいでしょうか',
        meaning: 'I have a consultation regarding [Topic]. Do you have a moment right now?',
        meaningMy: '[အကြောင်းအရာ] နှင့် ပတ်သက်ပြီး တိုင်ပင်ဆွေးနွေးစရာ ရှိလို့ပါခင်ဗျာ။ အခု အချိန်ခဏလောက် ရနိုင်မလားခင်ဗျာ။',
        situation: 'Initiating Soudan with superior',
        situationMy: 'အထက်လူကြီးနှင့် တိုင်ပင်ဆွေးနွေးမှု (Soudan) စတင်ခြင်း',
      },
      {
        phrase: '私としてはA案を推奨いたしますが、ご判断を仰ぎたく存じます',
        reading: 'わたしとしては エーあんを すいしょういたしますが、ごはんだんを あおぎたくぞんじます',
        meaning: 'Personally I recommend Option A, but I would like to seek your judgment',
        meaningMy: 'ကျွန်တော့်အနေဖြင့် အစီအစဉ် A ကို အကြံပြုလိုပါသည်၊ ဌာနမှူး၏ ဆုံးဖြတ်ချက်ကို ခံယူပါရစေခင်ဗျာ။',
        situation: 'Presenting solutions to manager',
        situationMy: 'မန်နေဂျာထံသို့ ဖြေရှင်းနည်းများကို တင်ပြဆုံးဖြတ်စေခြင်း',
      },
    ],
  },

  // 4. NEGOTIATION: Deadline Adjustment with Preserved Trust
  {
    id: 'nego-01-deadline-adjustment',
    category: 'negotiation',
    titleJp: '納期調整・仕様変更のタフネゴシエーション',
    titleEn: 'Commercial Negotiation: Deadline Extension with Trust Preservation',
    titleMy: 'လုပ်ငန်းဆိုင်ရာ ညှိနှိုင်းမှု - ယုံကြည်မှုကို မထိခိုက်စေဘဲ သတ်မှတ်ရက် ရွှေ့ဆိုင်းညှိနှိုင်းခြင်း',
    situation: 'Negotiating a 1-week timeline adjustment with a key client without incurring penalties or losing relationship goodwill.',
    situationMy: 'အဓိက Client တစ်ခုနှင့် ဒဏ်ကြေးမကျစေဘဲ ဆက်ဆံရေးကောင်းမွန်မှုကို ထိန်းသိမ်းရင်း ၁ ပတ် သတ်မှတ်ရက် ရွှေ့ဆိုင်းရန် ညှိနှိုင်းခြင်း။',
    keyRule: 'Give-and-Take trade-off logic. When asking for time, offer additional value (free extra testing, priority support) so the client feels they gained.',
    keyRuleMy: 'အပေးအယူ အပြန်အလှန် မျှခြေမူဝါဒ။ အချိန်တောင်းခံသည့်အခါ အပိုတန်ဖိုး (အခမဲ့ ထပ်ဆောင်း စစ်ဆေးပေးခြင်း၊ ဦးစားပေး ပံ့ပိုးမှု) ကို ကမ်းလှမ်းခြင်းဖြင့် ဖောက်သည်အနေဖြင့် အကျိုးအမြတ်ရရှိသည်ဟု ခံစားရစေရမည်။',
    dialogueLines: [
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: '木村部長、先日ご要望いただきました追加の多言語対応機能につきまして、チームで精査いたしました。',
        reading: 'きむらぶちょう、せんじつ ごようぼういただきました ついかの たげんごたいおうきのうにつきまして、チームで せいさいたしました。',
        english: 'Director Kimura, our team has carefully examined the additional multilingual support features you requested the other day.',
        myanmar: 'ဒါရိုက်တာ ခိမုရခင်ဗျာ၊ ပြီးခဲ့တဲ့ရက်က လူကြီးမင်း တောင်းဆိုထားတဲ့ ဘာသာစကားစုံ ထောက်ပံ့မှု Feature အသစ်နဲ့ ပတ်သက်ပြီး ကျွန်တော်တို့အဖွဲ့က သေချာစိစစ်လေ့လာပြီး ဖြစ်ပါသည်ခင်ဗျာ။',
      },
      {
        speaker: '相手（顧客部長）',
        speakerRole: 'client',
        japanese: 'どうですか？予定通り今月末で全て納品できそうでしょうか。',
        reading: 'どうですか？よていどおり こんげつまつで すべて のうひんできそうでしょうか。',
        english: 'How is it looking? Can you deliver everything by the end of this month as planned?',
        myanmar: 'ဘယ်လိုအခြေအနေရှိလဲ။ အစီအစဉ်အတိုင်း ဒီလကုန်မှာ အကုန်လုံး အပ်နှံနိုင်မလား။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'ご期待に添いたい気持ちは山々なのですが、品質を一切妥協せず本番のセキュリティ試験を完遂するため、大変恐縮ながら【1週間の納期の猶予】を頂戴したくご相談に上がりました。',
        reading: 'ごきたいに そいたい きもちは やまやまなのですが、ひんしつを いっさい だきょうせず ほんばんの セキュリティしけんを かんすいするため、たいへん きょうしゅくながら【いっしゅうかんの のうきの ゆうよ】を ちょうだいしたく ごそうだんに あがりました。',
        english: 'We desire wholeheartedly to meet your expectations; however, in order to complete rigorous production security testing without compromising quality whatsoever, I have come to humbly request a 1-week timeline extension.',
        myanmar: 'လူကြီးမင်း၏ မျှော်လင့်ချက်ကို ပြည့်မီစေလိုသော ဆန္ဒ အပြည့်အဝ ရှိပါသော်လည်း၊ အရည်အသွေးကို လုံးဝ အလျှော့မပေးဘဲ အမှန်တကယ် လုံခြုံရေး စမ်းသပ်မှုကို ပြီးပြည့်စုံအောင် ဆောင်ရွက်နိုင်ရန်အတွက် အလွန်ပင် အားနာစွာဖြင့် 【၁ ပတ်ခန့် သတ်မှတ်ရက် အချိန်ရွှေ့ဆိုင်းခွင့်】 ကို တောင်းခံတိုင်ပင်လိုပါသည်ခင်ဗျာ။',
        keyLearningPoint: 'Frame the extension as protection for THE CLIENT’s quality, not your own laziness.',
        keyLearningPointMy: 'ရက်ရွှေ့ဆိုင်းမှုကို မိမိ၏ ပျင်းရိမှုကြောင့်မဟုတ်ဘဲ "ဖောက်သည်၏ အရည်အသွေးကို ကာကွယ်ရန်" ဟု တင်ပြပါ။',
      },
      {
        speaker: '自分（あなた）',
        speakerRole: 'you',
        japanese: 'その代わりといたしまして、本来は有償オプションである「導入後3ヶ月間の24時間監視サポート」を弊社負担にて無償提供させていただきたく存じます。いかがでしょうか。',
        reading: 'そのかわりと いたしまして、ほんらいは ゆうしょうオプションである「どうにゅうご さんかげつかんの にじゅうよじかん かんしサポート」を へいしゃふたんにて むしょうていきょうさせていただきたくぞんじます。いかがでしょうか。',
        english: 'In return, we would like to provide "3 months of 24-hour monitoring support" post-launch—normally a paid option—entirely free of charge at our expense. How would that be?',
        myanmar: 'ထိုအစား ထပ်ဆောင်းဝန်ဆောင်မှုအနေဖြင့် မူလက ဝန်ဆောင်ခပေးဆောင်ရမည့် "စနစ်စတင်ပြီး ၃ လကြာ ၂၄ နာရီ စောင့်ကြည့်ထောက်ပံ့မှု" ကို ကျွန်တော်တို့ကုမ္ပဏီဘက်မှ အခမဲ့ ပံ့ပိုးပေးပါရစေခင်ဗျာ။ မည်သို့ သဘောရပါသလဲခင်ဗျာ။',
        keyLearningPoint: 'Offer a compensatory concession (見返りの付加価値) so the client does not feel disadvantaged.',
        keyLearningPointMy: 'ဖောက်သည်အနေဖြင့် နစ်နာသည်ဟု မခံစားရစေရန် အပိုတန်ဖိုး (見返りの付加価値) ကို ကမ်းလှမ်းပါ။',
      },
    ],
    essentialPhrases: [
      {
        phrase: 'ご期待に添いたい気持ちは山々なのですが',
        reading: 'ごきたいに そいたい きもちは やまやまなのですが',
        meaning: 'We desire wholeheartedly to meet your expectations, however...',
        meaningMy: 'လူကြီးမင်း၏ မျှော်လင့်ချက်ကို ပြည့်မီစေလိုသော ဆန္ဒ အပြည့်အဝ ရှိပါသော်လည်း...',
        situation: 'Empathetic lead-in to tough negotiation',
        situationMy: 'ခက်ခဲသော စီးပွားရေး ညှိနှိုင်းမှုမစတင်မီ စာနာနားလည်မှုဖြင့် စကားစတင်ခြင်း',
      },
      {
        phrase: '品質を一切妥協しないため',
        reading: 'ひんしつを いっさい だきょうしないため',
        meaning: 'In order not to compromise on quality whatsoever',
        meaningMy: 'အရည်အသွေးကို လုံးဝ အလျှော့မပေးစေရန်အတွက်...',
        situation: 'Framing timeline for client benefit',
        situationMy: 'အချိန်ဇယား ရွှေ့ဆိုင်းမှုကို ဖောက်သည်၏ အကျိုးစီးပွားအဖြစ် တင်ပြခြင်း',
      },
      {
        phrase: 'その代わりといたしまして、〜を提供させていただきます',
        reading: 'そのかわりと いたしまして、〜を ていきょうさせていただきます',
        meaning: 'In return as compensation, allow us to offer...',
        meaningMy: 'ထိုအစား အစားထိုးအနေဖြင့် ... ကို ပံ့ပိုးပေးပါရစေ',
        situation: 'Trade-off deal sweetening',
        situationMy: 'ညှိနှိုင်းမှု အောင်မြင်စေရန် အပြန်အလှန် အကျိုးအမြတ် ကမ်းလှမ်းခြင်း',
      },
    ],
  },
];

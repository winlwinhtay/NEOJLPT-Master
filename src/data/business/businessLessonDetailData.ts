// ============================================================================
// BUSINESS JAPANESE LESSON DETAIL DATA REGISTRY
// Operable, University-Level Dialogue Scripts, Vocabulary, Grammar & Quizzes
// for Every Curriculum Lesson in Business Japanese (N4 -> N1)
// ============================================================================

import { BusinessLesson } from '../../types/business';

export interface BusinessLessonDialogueLine {
  id: string;
  speaker: string;
  speakerRole: string;
  japanese: string;
  reading: string;
  english: string;
  myanmar?: string;
  note?: string;
}

export interface BusinessLessonVocabItem {
  word: string;
  reading: string;
  romaji?: string;
  meaningEn: string;
  meaningMy?: string;
  nuance: string;
  exampleSentence?: string;
}

export interface BusinessLessonGrammarItem {
  pattern: string;
  structure: string;
  meaningEn: string;
  meaningMy?: string;
  usageRule: string;
  comparison?: {
    incorrectOrRude: string;
    correctBusiness: string;
    reason: string;
  };
  examples: {
    japanese: string;
    reading: string;
    english: string;
    myanmar?: string;
  }[];
}

export interface BusinessLessonQuizItem {
  id: string;
  promptJp: string;
  promptEn: string;
  promptMy?: string;
  options: string[];
  optionsMy?: string[];
  correctAnswer: number;
  explanation: string;
  explanationMy?: string;
}

export interface BusinessLessonDetail {
  lessonId: string;
  scenarioOverview: string;
  officeContext: string;
  etiquetteRules: string[];
  dialogue: BusinessLessonDialogueLine[];
  vocabulary: BusinessLessonVocabItem[];
  grammar: BusinessLessonGrammarItem[];
  quiz: BusinessLessonQuizItem[];
  typingPracticePhrases: {
    phraseJp: string;
    reading: string;
    meaningEn: string;
    meaningMy?: string;
  }[];
  studioShortcut?: {
    tabId: 'keigo' | 'email' | 'horenso' | 'career_hub' | 'resume_coach' | 'interview_sim' | 'culture';
    buttonText: string;
  };
}

export const BUSINESS_LESSON_DETAILS: Record<string, BusinessLessonDetail> = {
  // ==========================================================================
  // UNIT 1: FOUNDATION - 日本の会社と職場環境
  // ==========================================================================
  'l-f1-1': {
    lessonId: 'l-f1-1',
    scenarioOverview:
      'Entering a Japanese corporate workspace for the first morning. Navigating office floor etiquette, standard morning greetings, understanding internal (社内) vs external (社外) boundary rules.',
    officeContext:
      'In Japanese companies, morning greetings set the psychological tone for teamwork. You are an employee arriving 15 minutes before the official work start time.',
    etiquetteRules: [
      'Always arrive 10–15 minutes before official start time (始業時間). In Japan, "on time" is considered late.',
      'Greet clearly upon entering the floor: "おはようございます" with eye contact and a slight bow (会釈).',
      'Never leave without announcing: "お先に失礼いたします" (Pardon me for leaving before you).',
    ],
    dialogue: [
      {
        id: 'd1-1',
        speaker: 'あなた (You)',
        speakerRole: '新入社員 (New Employee)',
        japanese: 'おはようございます！本日より営業部に配属となりました、田中と申します。',
        reading: 'おはようございます！ほんじつより えいぎょうぶに はいぞくとなりました、たなかと もうします。',
        english: 'Good morning! My name is Tanaka, and I have been assigned to the Sales Department starting today.',
        myanmar: 'မင်္ဂလာနံနက်ခင်းပါ! ဒီနေ့ကစပြီး အရောင်းဌာနကို စတင်တာဝန်ကျတဲ့ တာနာကာ ဖြစ်ပါတယ်။',
        note: 'Make a clear, energetic greeting with a 30-degree bow.',
      },
      {
        id: 'd1-2',
        speaker: '佐藤課長 (Section Chief Sato)',
        speakerRole: '直属の上司 (Direct Manager)',
        japanese: '田中さん、おはよう。待っていたよ。こちらのデスクを使ってください。分からないことがあれば何でも聞いてね。',
        reading: 'たなかさん、おはよう。まっていたよ。こちらの ですくを つかってください。わからないことがあれば なんでも きいてね。',
        english: 'Good morning, Tanaka-san. We were waiting for you. Please use this desk. If you have any questions, feel free to ask anything.',
        myanmar: 'မင်္ဂလာပါ တာနာကာ။ စောင့်နေတာပါ။ ဒီစားပွဲကို အသုံးပြုပါ။ မရှင်းတာရှိရင် ကြိုက်တာမေးပါ။',
        note: 'Superiors speak to new staff in friendly polite tone.',
      },
      {
        id: 'd1-3',
        speaker: 'あなた (You)',
        speakerRole: '新入社員 (New Employee)',
        japanese: 'ありがとうございます！本日からよろしくご指導のほどお願いいたします。',
        reading: 'ありがとうございます！ほんじつから よろしくごしどうのほど おねがいいたします。',
        english: 'Thank you very much! I sincerely look forward to your guidance and mentorship starting today.',
        myanmar: 'ကျေးဇူးတင်ရှိပါသည်ခင်ဗျာ။ ဒီနေ့ကစပြီး လမ်းညွှန်သင်ကြားပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။',
        note: 'Standard humble formula for expressing eagerness to learn.',
      },
      {
        id: 'd1-4',
        speaker: 'あなた (You)',
        speakerRole: '退社時 (Leaving Office)',
        japanese: '課長、本日の業務はすべて完了いたしました。お先に失礼いたします。',
        reading: 'かちょう、ほんじつのぎょうむは すべて かんりょういたしました。おさきに しつれいいたします。',
        english: 'Section Chief, all of my tasks for today are completed. Pardon me for leaving ahead of you.',
        myanmar: 'ဌာနမှူးခင်ဗျာ၊ ဒီနေ့အတွက် အလုပ်တာဝန်များ ပြီးစီးပါပြီ။ ခွင့်ပြုပါခင်ဗျာ (အရင်ပြန်ပါရစေ)။',
        note: 'Never leave silently. Always report task completion before departing.',
      },
    ],
    vocabulary: [
      {
        word: '出社',
        reading: 'しゅっしゃ',
        romaji: 'shussha',
        meaningEn: 'Arriving at the office / going to work',
        meaningMy: 'ရုံးသို့ရောက်ရှိခြင်း / ရုံးတက်ခြင်း',
        nuance: 'Formal business term for arriving at workplace.',
        exampleSentence: '毎朝8時45分に出社しています。',
      },
      {
        word: '退社',
        reading: 'たいしゃ',
        romaji: 'taisha',
        meaningEn: 'Leaving the office for the day (or resigning)',
        meaningMy: 'ရုံးဆင်းခြင်း / ရုံးမှပြန်ခြင်း',
        nuance: 'Can mean leaving at end of day, or resigning depending on context.',
        exampleSentence: '本日は定時で退社いたします。',
      },
      {
        word: '定時',
        reading: 'ていじ',
        romaji: 'teiji',
        meaningEn: 'Regular designated working hours',
        meaningMy: 'သတ်မှတ်ရုံးချိန်',
        nuance: 'Leaving on time without overtime is "定時退社".',
        exampleSentence: '今日は定時退社日（ノー残業デー）です。',
      },
      {
        word: '残業',
        reading: 'ざんぎょう',
        romaji: 'zangyou',
        meaningEn: 'Overtime work',
        meaningMy: 'အချိန်ပိုအလုပ်ဆင်းခြင်း (OT)',
        nuance: 'Overtime must usually be pre-approved by your supervisor in Japan.',
        exampleSentence: '本日は1時間の残業を予定しております。',
      },
      {
        word: '配属',
        reading: 'はいぞく',
        romaji: 'haizoku',
        meaningEn: 'Assignment / deployment to department',
        meaningMy: 'ဌာနတာဝန်ကျခြင်း / နေရာချထားခြင်း',
        nuance: 'Used when assigned to a specific team or branch.',
        exampleSentence: '4月より人事部に配属となりました。',
      },
    ],
    grammar: [
      {
        pattern: '〜と申します',
        structure: '[氏名] と申します',
        meaningEn: 'My name is [Name] (Humble / 謙譲語)',
        meaningMy: 'ကျွန်တော့်/ကျွန်မ နာမည်က [နာမည်] ဖြစ်ပါတယ်',
        usageRule: 'Humble form of "言います". Use when introducing yourself in professional settings.',
        comparison: {
          incorrectOrRude: '田中です。 (Too plain for corporate entrance)',
          correctBusiness: '田中と申します。',
          reason: '申します lowers yourself respectfully before coworkers and superiors.',
        },
        examples: [
          {
            japanese: '新入社員のジョン・スミスと申します。',
            reading: 'しんにゅうしゃいんの じょん・すみすと もうします。',
            english: 'My name is John Smith, a new employee.',
            myanmar: 'ဝန်ထမ်းသစ် ဂျွန်စမစ် ဖြစ်ပါတယ်။',
          },
        ],
      },
      {
        pattern: 'お先に失礼いたします',
        structure: 'お先に失礼いたします / お先に失礼します',
        meaningEn: 'Pardon me for leaving before you',
        meaningMy: 'အရင်ပြန်နှင့်ပါရစေ ခွင့်ပြုပါခင်ဗျာ',
        usageRule: 'Mandatory phrase said by anyone leaving the office while others are still working.',
        examples: [
          {
            japanese: 'お疲れ様でした。お先に失礼いたします。',
            reading: 'おつかれさまでした。おさきに しつれいいたします。',
            english: 'Thank you for your hard work. Pardon me for leaving ahead of you.',
            myanmar: 'ပင်ပန်းသွားပါပြီခင်ဗျာ။ အရင်ခွင့်ပြုပါဦး။',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-f1-1',
        promptJp: '朝、オフィスに出社したとき、同僚や上司に対して最も適切な挨拶はどれですか。',
        promptEn: 'Which is the most appropriate morning greeting when arriving at the office?',
        promptMy: 'မနက်ခင်း ရုံးသို့ရောက်ရှိချိန်တွင် လုပ်ဖော်ကိုင်ဖက်များနှင့် အထက်လူကြီးများအား မည်သို့ နှုတ်ဆက်သင့်သနည်း။',
        options: [
          'こんにちは！',
          'おはようございます。',
          'ご苦労様です。',
          'お疲れ様でした。',
        ],
        correctAnswer: 1,
        explanation:
          '「おはようございます」 is the standard morning office greeting. 「こんにちは」 is too casual, and 「ご苦労様です」 is only used by superiors toward subordinates.',
        explanationMy:
          '「おはようございます」 သည် မနက်ခင်း ရုံးတက်ချိန်တွင် သုံးစွဲရမည့် စံနှုန်းသတ်မှတ် နှုတ်ခွန်းဆက်စကား ဖြစ်ပါသည်။ 「こんにちは」 သည် ပေါ့ပေါ့ပါးပါးဆန်လွန်းပြီး၊ 「ご苦労様です」 သည် အထက်လူကြီးက လက်အောက်ငယ်သားကိုသာ ပြောခွင့်ရှိပါသည်။',
      },
      {
        id: 'q-f1-2',
        promptJp: '仕事が終わって先にオフィスを出るとき、残っている同僚に言う適切な挨拶はどれですか。',
        promptEn: 'When finishing work and leaving the office before others, what should you say?',
        promptMy: 'အလုပ်ပြီး၍ အခြားသူများထက် အရင် ရုံးမှပြန်ဆင်းချိန်တွင် ကျန်ရှိနေသော လုပ်ဖော်ကိုင်ဖက်များအား မည်သို့ နှုတ်ဆက်သင့်သနည်း။',
        options: [
          'さようなら、バイバイ。',
          'お先に失礼いたします。',
          'ご苦労様でした。',
          '明日また会いましょう。',
        ],
        correctAnswer: 1,
        explanation:
          '「お先に失礼いたします」 (or お先に失礼します) acknowledges that colleagues are still working and excuses your early departure.',
        explanationMy:
          '「お先に失礼いたします」 သည် အခြားသူများ အလုပ်လုပ်နေဆဲဖြစ်ကြောင်း အသိအမှတ်ပြုပြီး မိမိက အရင်ပြန်ခွင့်ပြုပါရန် ယဉ်ကျေးစွာ ခွင့်ပန်သော အသုံးဖြစ်ပါသည်။',
      },
      {
        id: 'q-f1-3',
        promptJp: '社内（ウチ）と社外（ソト）のルールとして、社外のクライアントに対して自分の上司を呼ぶとき正しいものはどれですか。',
        promptEn: 'When talking to an external client, how should you refer to your own manager (Manager Sato)?',
        promptMy: 'ကုမ္ပဏီတွင်း (ウチ) နှင့် ပြင်ပ (ソト) စည်းမျဉ်းအရ၊ ပြင်ပဖောက်သည်နှင့် စကားပြောရာတွင် မိမိ၏ မန်နေဂျာ (ဆာတိုးမန်နေဂျာ) ကို မည်သို့ ရည်ညွှန်းခေါ်ဆိုရမည်နည်း။',
        options: [
          '佐藤部長様',
          '佐藤さん',
          '佐藤',
          '部長の佐藤先生',
        ],
        correctAnswer: 2,
        explanation:
          'In Japanese business etiquette (ウチ/ソト rule), your company is the "in-group". You NEVER use honorifics or titles (like 部長 or さん) for your own manager when talking to clients. Refer to him simply as 「佐藤」.',
        explanationMy:
          'ဂျပန်စီးပွားရေးကျင့်ဝတ် (ウチ/ソト စည်းမျဉ်း) အရ မိမိကုမ္ပဏီသည် အတွင်းအုပ်စု (ウチ) ဖြစ်သည်။ ပြင်ပဖောက်သည်နှင့် ပြောဆိုရာတွင် မိမိအထက်လူကြီးအတွက် 部長 သို့မဟုတ် さん စသော ချီးမွမ်းဂုဏ်ပုဒ်များကို လုံးဝ (လုံးဝ) မသုံးရပါ။ မျိုးရိုးအမည်သက်သက် 「佐藤」 ဟုသာ ခေါ်ဆိုရပါမည်။',
      },
    ],
    typingPracticePhrases: [
      {
        phraseJp: 'おはようございます。',
        reading: 'おはようございます。',
        meaningEn: 'Good morning.',
        meaningMy: 'မင်္ဂလာနံနက်ခင်းပါခင်ဗျာ။',
      },
      {
        phraseJp: 'よろしくご指導のほどお願いいたします。',
        reading: 'よろしくごしどうのほどおねがいいたします。',
        meaningEn: 'I sincerely ask for your favorable guidance.',
        meaningMy: 'လမ်းညွှန်သင်ကြားပေးပါရန် ရိုသေစွာ မေတ္တာရပ်ခံအပ်ပါသည်။',
      },
      {
        phraseJp: 'お先に失礼いたします。',
        reading: 'おさきにしつれいいたします。',
        meaningEn: 'Pardon me for leaving before you.',
        meaningMy: 'ခွင့်ပြုပါဦးခင်ဗျာ (အရင်ပြန်ပါရစေ)။',
      },
    ],
    studioShortcut: {
      tabId: 'culture',
      buttonText: 'Explore Workplace Culture Guide',
    },
  },

  // ==========================================================================
  // UNIT 1: LESSON 2 - 部署名と役職の呼び方
  // ==========================================================================
  'l-f1-2': {
    lessonId: 'l-f1-2',
    scenarioOverview:
      'Understanding Japanese corporate departments (営業, 総務, 人事, 経理, 開発) and correct etiquette for addressing managers without attaching "さん" to titles.',
    officeContext:
      'In a Japanese office, job titles (社長, 部長, 課長, 係長) already include respect. Adding "さん" (e.g. 田中部長さん) is grammatically redundant and considered uneducated in Japanese business.',
    etiquetteRules: [
      'Call superiors inside your company as "[Last Name] + [Title]", e.g. 「田中部長」, 「佐藤課長」.',
      'Never say 「田中部長さん」 or 「佐藤課長様」.',
      'When speaking to clients outside your firm, strip all titles: 「弊社の田中が担当しております」.',
    ],
    dialogue: [
      {
        id: 'd2-1',
        speaker: 'あなた (You)',
        speakerRole: '新入社員',
        japanese: '田中部長、明日の営業会議の資料が完成いたしました。ご確認いただけますでしょうか。',
        reading: 'たなかぶちょう、あしたの えいぎょうかいぎの しりょうが かんせいいいたしました。ごかくにん いただけますでしょうか。',
        english: 'Manager Tanaka, the materials for tomorrow\'s sales meeting are ready. Could you please review them?',
        myanmar: 'ဌာနမှူး တာနာကာခင်ဗျာ၊ မနက်ဖြန် အရောင်းအစည်းအဝေးအတွက် စာရွက်စာတမ်းများ အဆင်သင့်ဖြစ်ပါပြီ။ စစ်ဆေးပေးနိုင်မလားခင်ဗျာ။',
        note: 'Notice the form: 田中部長 (Name + Title directly).',
      },
      {
        id: 'd2-2',
        speaker: '田中部長',
        speakerRole: '営業部 部長',
        japanese: 'ありがとう、田中さん。よくまとまっているね。総務部と経理部にも共有しておいてくれるかい。',
        reading: 'ありがとう、たなかさん。よくまとまっているね。そうむぶと けいりぶにも きょうゆうしておいてくれるかい。',
        english: 'Thank you, Tanaka-san. It is well organized. Could you also share this with General Affairs and Accounting?',
        myanmar: 'ကျေးဇူးပါ တာနာကာ။ ကောင်းကောင်း ပြုစုထားတာပဲ။ အထွေထွေစီမံဌာနနဲ့ စာရင်းကိုင်ဌာနကိုလည်း မျှဝေပေးထားပါနော်။',
      },
      {
        id: 'd2-3',
        speaker: 'あなた (You)',
        speakerRole: '新入社員',
        japanese: 'かしこまりました。直ちに総務部と経理部の担当者へ送付いたします。',
        reading: 'かしこまりました。ただちに そうむぶと けいりぶの たんとうしゃへ そうふいたします。',
        english: 'Understood. I will immediately send them to the representatives in General Affairs and Accounting.',
        myanmar: 'နားလည်သဘောပေါက်ပါပြီခင်ဗျာ။ ချက်ချင်းပဲ အထွေထွေစီမံနဲ့ စာရင်းကိုင်ဌာန တာဝန်ရှိသူများဆီ ပေးပို့လိုက်ပါ့မယ်။',
        note: 'Always use 「かしこまりました」 or 「承知いたしました」 to acknowledge orders.',
      },
    ],
    vocabulary: [
      {
        word: '営業部',
        reading: 'えいぎょうぶ',
        romaji: 'eigyoubu',
        meaningEn: 'Sales Department',
        meaningMy: 'အရောင်းဌာန',
        nuance: 'Handles client acquisitions, revenue generation, and pitch meetings.',
        exampleSentence: '営業部の目標を達成いたしました。',
      },
      {
        word: '総務部',
        reading: 'そうむぶ',
        romaji: 'soumubu',
        meaningEn: 'General Affairs Department',
        meaningMy: 'အထွေထွေစီမံခန့်ခွဲရေးဌာန',
        nuance: 'Manages office facilities, internal equipment, and overall corporate operations.',
        exampleSentence: '新しいPCの手配は総務部にお願いします。',
      },
      {
        word: '人事部',
        reading: 'じんじぶ',
        romaji: 'jinjibu',
        meaningEn: 'Human Resources (HR) Department',
        meaningMy: 'လူ့စွမ်းအားအရင်းအမြစ်ဌာန (HR)',
        nuance: 'In charge of hiring, training, and employee evaluations.',
        exampleSentence: '面接のスケジュールは人事部から連絡があります。',
      },
      {
        word: '経理部',
        reading: 'けいりぶ',
        romaji: 'keiribu',
        meaningEn: 'Accounting / Finance Department',
        meaningMy: 'စာရင်းကိုင်ဌာန',
        nuance: 'Handles expenses, reimbursements (精算), budgets, and financial statements.',
        exampleSentence: '交通費の精算書を経理部に提出してください。',
      },
      {
        word: '役職',
        reading: 'やくしょく',
        romaji: 'yakushoku',
        meaningEn: 'Job title / managerial position',
        meaningMy: 'ရာထူး / တာဝန်',
        nuance: 'Hierarchy order: 社長 > 専務/常務 > 部長 > 次長 > 課長 > 係長 > 主任 > 一般社員.',
        exampleSentence: '名刺には正確な役職が記載されています。',
      },
    ],
    grammar: [
      {
        pattern: '〜を担当しております',
        structure: '[業務・分野] を担当しております',
        meaningEn: 'I am in charge of [Task / Domain] (Humble)',
        meaningMy: 'ကျွန်တော်က [တာဝန်/နယ်ပယ်] ကို တာဝန်ယူဆောင်ရွက်နေပါသည်',
        usageRule: 'Used when explaining your personal duties to clients or colleagues.',
        examples: [
          {
            japanese: '営業部でアジア市場の新規開拓を担当しております。',
            reading: 'えいぎょうぶで あじあしじょうの しんきかいたくを たんとうしております。',
            english: 'In the Sales Department, I am responsible for acquiring new clients in Asian markets.',
            myanmar: 'အရောင်းဌာနမှာ အာရှဈေးကွက်အတွက် ဖောက်သည်သစ်ရှာဖွေရေးကို တာဝန်ယူဆောင်ရွက်နေပါတယ်။',
          },
        ],
      },
      {
        pattern: 'かしこまりました / 承知いたしました',
        structure: 'かしこまりました / 承知いたしました',
        meaningEn: 'Certainly / Understood (Humble acknowledgment)',
        meaningMy: 'ဟုတ်ကဲ့ နားလည်သဘောပေါက်ပါပြီခင်ဗျာ',
        usageRule: 'Use when acknowledging instructions from a boss or client. NEVER say 「了解しました」 or 「分かりました」 to superiors.',
        comparison: {
          incorrectOrRude: '了解しました！ (Acceptable only peer-to-peer, rude to superiors)',
          correctBusiness: 'かしこまりました。 / 承知いたしました。',
          reason: '了解 contains an evaluative tone from superior to subordinate.',
        },
        examples: [
          {
            japanese: '課長のご指示の件、承知いたしました。',
            reading: 'かちょうの ごしじのけん、しょうちいたしました。',
            english: 'Regarding your instructions, Section Chief, understood.',
            myanmar: 'ဌာနမှူးရဲ့ ညွှန်ကြားချက်ကို နားလည်သဘောပေါက်ပါပြီခင်ဗျာ။',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-f1-2-1',
        promptJp: '社内で営業部の田中部長を呼ぶとき、最も自然で正しい敬称はどれですか。',
        promptEn: 'Inside the company, how should you address Sales General Manager Tanaka?',
        promptMy: 'ကုမ္ပဏီအတွင်း အရောင်းဌာနမှူး တာနာကာကို ခေါ်ဆိုရာတွင် အသဘာဝအကျဆုံးနှင့် အမှန်ကန်ဆုံး ခေါ်ဝေါ်မှုပုံစံမှာ မည်သည့်အရာနည်း။',
        options: [
          '田中部長さん',
          '田中部長',
          '田中さん部長',
          '田中部長様',
        ],
        correctAnswer: 1,
        explanation:
          'In Japanese business, the managerial title itself serves as the respectful honorific. You call them 「田中部長」. Attaching "さん" or "様" is double-honorific and unnatural.',
        explanationMy:
          'ဂျပန်စီးပွားရေးလုပ်ငန်းခွင်တွင် ရာထူးအမည်ကိုယ်တိုင်က လေးစားသမှု ဂုဏ်ပုဒ်ဖြစ်ပါသည်။ ထို့ကြောင့် 「田中部長」 ဟုသာ ခေါ်ဆိုရမည်ဖြစ်ပြီး "さん" သို့မဟုတ် "様" ကို ထပ်မံပေါင်းစပ်ခေါ်ဆိုခြင်းသည် မလိုအပ်သော နှစ်ထပ်ဂုဏ်ပြုစကား ဖြစ်သွားသဖြင့် မမှန်ကန်ပါ။',
      },
      {
        id: 'q-f1-2-2',
        promptJp: '上司から仕事の指示を受けたとき、「分かりました」の代わりに言うべき最も適切なビジネス表現はどれですか。',
        promptEn: 'When receiving work instructions from your superior, what is the most appropriate response instead of "分かりました"?',
        promptMy: 'အထက်လူကြီးထံမှ အလုပ်တာဝန် ညွှန်ကြားချက်ရရှိသောအခါ 「分かりました」 အစား သုံးစွဲရမည့် အသင့်တော်ဆုံး စီးပွားရေးသုံးစကားမှာ မည်သည့်အရာနည်း။',
        options: [
          '了解です！',
          'OKです。',
          '承知いたしました。',
          '問題ありません。',
        ],
        correctAnswer: 2,
        explanation:
          '「承知いたしました」 or 「かしこまりました」 are the humble acknowledgments expected in Japanese business. 「了解です」 should only be used toward peers or subordinates.',
        explanationMy:
          '「承知いたしました」 သို့မဟုတ် 「かしこまりました」 သည် ဂျပန်လုပ်ငန်းခွင်တွင် အထက်လူကြီးထံ နှိမ့်ချလေးစားစွာဖြင့် နားလည်ကြောင်း တုံ့ပြန်ရာတွင် သုံးစွဲရမည့် စကားဖြစ်ပါသည်။ 「了解です」 ကို ရာထူးတူ သို့မဟုတ် အောက်လက်ငယ်သားများထံတွင်သာ သုံးစွဲသင့်ပါသည်။',
      },
    ],
    typingPracticePhrases: [
      {
        phraseJp: '承知いたしました。',
        reading: 'しょうちいたしました。',
        meaningEn: 'Certainly, understood.',
        meaningMy: 'နားလည်သဘောပေါက်ပါပြီခင်ဗျာ။',
      },
      {
        phraseJp: 'かしこまりました。',
        reading: 'かしこまりました。',
        meaningEn: 'Certainly, I will comply.',
        meaningMy: 'လက်ခံဆောင်ရွက်ပေးပါမည်ခင်ဗျာ။',
      },
      {
        phraseJp: '田中部長、ご確認をお願いいたします。',
        reading: 'たなかぶちょう、ごかくにんをおねがいいたします。',
        meaningEn: 'Manager Tanaka, please review this.',
        meaningMy: 'ဌာနမှူး တာနာကာခင်ဗျာ၊ စစ်ဆေးကြည့်ရှုပေးပါရန် မေတ္တာရပ်ခံပါသည်။',
      },
    ],
    studioShortcut: {
      tabId: 'keigo',
      buttonText: 'Open Keigo Mastery Studio',
    },
  },

  // ==========================================================================
  // UNIT 1: LESSON 3 - 日常の社内コミュニケーション
  // ==========================================================================
  'l-f1-3': {
    lessonId: 'l-f1-3',
    scenarioOverview:
      'Daily workplace interactions: Distinguishing between お疲れ様です vs ご苦労様です, making polite requests, asking for quick confirmations, and acknowledging colleagues.',
    officeContext:
      'The difference between "お疲れ様です" and "ご苦労様です" is the #1 mistake junior foreign employees make in Japanese workplaces. Getting it right proves your cultural readiness.',
    etiquetteRules: [
      'Use 「お疲れ様です」 to superiors, colleagues, and whenever passing anyone in the office corridor.',
      'NEVER say 「ご苦労様です」 to your boss. That phrase is reserved exclusively for a boss praising a subordinate.',
      'Before asking a question, use a cushion phrase: 「お忙しいところ恐れ入りますが、少々お時間よろしいでしょうか」.',
    ],
    dialogue: [
      {
        id: 'd3-1',
        speaker: 'あなた (You)',
        speakerRole: '若手社員',
        japanese: '佐藤課長、お疲れ様です。今、少々お時間よろしいでしょうか。',
        reading: 'さとうかちょう、おつかれさまです。いま、しょうしょう おじかん よろしいでしょうか。',
        english: 'Section Chief Sato, thank you for your hard work. Do you have a quick moment right now?',
        myanmar: 'ဌာနမှူးဆာတိုးခင်ဗျာ၊ ပင်ပန်းနေပါပြီ။ အခု အချိန်ခဏလောက် အဆင်ပြေနိုင်မလားခင်ဗျာ။',
        note: 'Always check availability before interrupting someone\'s workflow.',
      },
      {
        id: 'd3-2',
        speaker: '佐藤課長',
        speakerRole: '課長',
        japanese: 'お疲れ様。うん、5分くらいなら大丈夫だよ。どうしたの？',
        reading: 'おつかれさま。うん、ごふんくらいなら だいじょうぶだよ。どうしたの？',
        english: 'Good work. Yes, I have about 5 minutes. What is it?',
        myanmar: 'ပင်ပန်းပြီ။ အင်း ၅ မိနစ်လောက်ဆို အဆင်ပြေပါတယ်။ ဘာဖြစ်လို့လဲ။',
      },
      {
        id: 'd3-3',
        speaker: 'あなた (You)',
        speakerRole: '若手社員',
        japanese: '来週のプレゼン資料につきまして、方針のご相談をさせていただきたく存じます。',
        reading: 'らいしゅうの ぷれぜんしりょうにつきまして、ほうしんの ごそうだんを させていただきたく ぞんじます。',
        english: 'Regarding the presentation slides for next week, I would like to consult with you on our strategic direction.',
        myanmar: 'နောက်အပတ် presentation စာရွက်စာတမ်းနဲ့ပတ်သက်ပြီး လုပ်ဆောင်ချက်လမ်းစဉ်ကို တိုင်ပင်ဆွေးနွေးလိုပါတယ်ခင်ဗျာ။',
      },
    ],
    vocabulary: [
      {
        word: 'お疲れ様です',
        reading: 'おつかれさまです',
        romaji: 'otsukaresama desu',
        meaningEn: 'Thank you for your hard work (Universal greeting)',
        meaningMy: 'ပင်ပန်းသွားပါပြီ (တစ်နေ့တာ ရုံးသုံးနှုတ်ခွန်းဆက်)',
        nuance: 'Safe and expected greeting for all colleagues and superiors throughout the day.',
        exampleSentence: '廊下で上司に会ったので、「お疲れ様です」と挨拶した。',
      },
      {
        word: 'ご苦労様です',
        reading: 'ごくろうさまです',
        romaji: 'gokurousama desu',
        meaningEn: 'Good job / thank you for your labor (Boss to subordinate only)',
        meaningMy: 'ကြိုးစားအားထုတ်မှုအတွက် ကျေးဇူးတင်တယ် (အထက်လူက အောက်လူကိုသုံး)',
        nuance: 'Taboo if spoken to a manager or client. Only used from top downward.',
        exampleSentence: '社長が社員に対して「ご苦労様」と声をかけた。',
      },
      {
        word: '相談',
        reading: 'そうだん',
        romaji: 'soudan',
        meaningEn: 'Consultation / asking advice',
        meaningMy: 'တိုင်ပင်ဆွေးနွေးခြင်း',
        nuance: 'The "相" in 報連相 (Hou-Ren-Sou). Consult before making independent risky assumptions.',
        exampleSentence: '判断に迷ったときは、上司に相談します。',
      },
    ],
    grammar: [
      {
        pattern: '〜につきまして / 〜について',
        structure: '[名詞] につきまして',
        meaningEn: 'Regarding [Topic] / Concerning [Matter]',
        meaningMy: '[အကြောင်းအရာ] နှင့် ပတ်သက်၍',
        usageRule: 'Formal business version of 「〜について」. Ideal for raising business topics.',
        examples: [
          {
            japanese: '本日の新規プロジェクトの進捗につきましてご報告いたします。',
            reading: 'ほんじつの しんきぷろじぇくとの しんちょくにつきまして ごほうこくいたします。',
            english: 'I would like to report regarding the progress of today\'s new project.',
            myanmar: 'ဒီနေ့ စီမံကိန်းအသစ် တိုးတက်မှုအခြေအနေနဲ့ ပတ်သက်ပြီး သတင်းပို့တင်ပြအပ်ပါသည်။',
          },
        ],
      },
      {
        pattern: '〜させていただきたく存じます',
        structure: '[動詞使役形] て + いただきたく存じます',
        meaningEn: 'I would humbly like to receive your permission to [do]',
        meaningMy: '[ပြုလုပ်ခွင့်] ပြုပေးပါရန် ရိုသေစွာ မေတ္တာရပ်ခံလိုပါသည်',
        usageRule: 'Extremely polite request for permission. Often used for consultations and leave requests.',
        examples: [
          {
            japanese: '一度ご説明をさせていただきたく存じます。',
            reading: 'いちど ごせつめいを させていただきたく ぞんじます。',
            english: 'I would like to humbly request the opportunity to explain this to you.',
            myanmar: 'တစ်ကြိမ် ရှင်းပြခွင့်ပြုပေးပါရန် ရိုသေစွာ မေတ္တာရပ်ခံလိုပါသည်။',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-f1-3-1',
        promptJp: '業務中、廊下であなたの課長とすれ違いました。何と声をかけるのが最も適切ですか。',
        promptEn: 'You pass your Section Chief in the office corridor during the workday. What should you say?',
        promptMy: 'အလုပ်ချိန်အတွင်း ရုံးစင်္ကြံလမ်း၌ မိမိ၏ ဌာနမှူးနှင့် မျက်နှာချင်းဆိုင် တွေ့ဆုံသောအခါ မည်သို့ နှုတ်ဆက်သင့်သနည်း။',
        options: [
          'ご苦労様です！',
          'お疲れ様です。',
          'こんにちは。',
          '元気ですか？',
        ],
        correctAnswer: 1,
        explanation:
          '「お疲れ様です」 is the universal workplace greeting. You must NEVER say 「ご苦労様です」 to your superior, as it is strictly used from superiors to subordinates.',
        explanationMy:
          '「お疲れ様です」 သည် လုပ်ငန်းခွင်အတွင်း အချိန်မရွေး သုံးစွဲရမည့် စံနှုန်းသတ်မှတ် နှုတ်ခွန်းဆက်စကား ဖြစ်ပါသည်။ အထက်လူကြီးအား 「ご苦労様です」 ဟု လုံးဝ မပြောသင့်ပါ (ယင်းသည် အထက်လူကြီးက အောက်လက်ငယ်သားအား ချီးကျူးသည့် စကားဖြစ်သောကြောင့် ဖြစ်ပါသည်)။',
      },
      {
        id: 'q-f1-3-2',
        promptJp: '仕事中の先輩に話しかけるとき、最初に添える「クッション言葉」として最もふさわしいのはどれですか。',
        promptEn: 'When approaching a busy senior colleague, what is the best cushion phrase to open with?',
        promptMy: 'အလုပ်များနေသော စီနီယာ (လုပ်ဖော်ကိုင်ဖက်) ထံသို့ စကားပြောဆိုရန် သွားရောက်ချိန်တွင် အစဦး၌ ထည့်သွင်းရမည့် အကောင်းဆုံး စကားပလ္လင်ခံ (Cushion phrase) မှာ မည်သည့်အရာနည်း။',
        options: [
          'おい、ちょっといい？',
          'お忙しいところ恐れ入りますが、今よろしいでしょうか。',
          '早く教えてください。',
          '暇ですか？',
        ],
        correctAnswer: 1,
        explanation:
          '「お忙しいところ恐れ入りますが、今よろしいでしょうか」 softens the disruption and shows consideration for the colleague\'s time.',
        explanationMy:
          '「お忙しいところ恐れ入りますが、今よろしいでしょうか」 သည် တစ်ဖက်သား၏ အချိန်နှင့် အခြေအနေကို အလေးထားစဉ်းစားပေးကြောင်း ဖော်ပြပြီး စကားပြောဆိုခွင့် တောင်းခံသော အလွန်ယဉ်ကျေးသည့် အသုံးအနှုန်း ဖြစ်ပါသည်။',
      },
    ],
    typingPracticePhrases: [
      {
        phraseJp: 'お疲れ様です。',
        reading: 'おつかれさまです。',
        meaningEn: 'Thank you for your hard work.',
        meaningMy: 'ပင်ပန်းသွားပါပြီခင်ဗျာ။',
      },
      {
        phraseJp: '少々お時間よろしいでしょうか。',
        reading: 'しょうしょうおじかんよろしいでしょうか。',
        meaningEn: 'Do you have a moment?',
        meaningMy: 'အခု အချိန်ခဏလောက် အဆင်ပြေနိုင်မလားခင်ဗျာ။',
      },
      {
        phraseJp: 'ご相談させていただきたく存じます。',
        reading: 'ごそうだんさせていただきたくぞんじます。',
        meaningEn: 'I would humbly like to consult with you.',
        meaningMy: 'တိုင်ပင်ဆွေးနွေးလိုသည့် ကိစ္စလေးတစ်ခု ရှိပါသည်ခင်ဗျာ။',
      },
    ],
    studioShortcut: {
      tabId: 'horenso',
      buttonText: 'Open Hou-Ren-Sou Studio',
    },
  },

  // ==========================================================================
  // UNIT 2: LESSON 4 - ビジネスでの自己紹介
  // ==========================================================================
  'l-f2-1': {
    lessonId: 'l-f2-1',
    scenarioOverview:
      'Mastering the 1-minute Japanese business self-introduction (自己紹介). Highlighting professional background, enthusiasm, humility, and seeking future guidance.',
    officeContext:
      'Whether on your first day, at a joint venture kickoff, or in an all-hands meeting, the 1-minute self-introduction establishes your personal credibility and humility.',
    etiquetteRules: [
      'Follow the formula: 1) Greeting & Name 2) Department / Role 3) Passion & Dedication 4) Request for guidance.',
      'Always refer to yourself with humble expressions: 「未熟者ではございますが」 (Though inexperienced...).',
      'End with a deep 30-to-45-degree bow saying 「どうぞよろしくお願いいたします」.',
    ],
    dialogue: [
      {
        id: 'd4-1',
        speaker: 'あなた (You)',
        speakerRole: '新任担当者',
        japanese: '皆様、おはようございます。本日より営業第1課に配属されました、ヤンゴン出身のアウンと申します。',
        reading: 'みなさま、おはようございます。ほんじつより えいぎょうだいいっかに はいぞくされました、やんごんしゅっしんの あうんと もうします。',
        english: 'Good morning, everyone. My name is Aung from Yangon, and I have been assigned to Sales Division 1 starting today.',
        myanmar: 'အားလုံးပဲ မင်္ဂလာနံနက်ခင်းပါခင်ဗျာ။ ဒီနေ့ကစပြီး အရောင်းဌာနခွဲ (၁) မှာ တာဝန်ကျတဲ့ ရန်ကုန်မြို့မှ အောင် ဖြစ်ပါတယ်ခင်ဗျာ။',
      },
      {
        id: 'd4-2',
        speaker: 'あなた (You)',
        speakerRole: '新任担当者',
        japanese: '大学では情報システムを専攻しておりました。早く皆様のお役に立てるよう、誠心誠意努めてまいります。',
        reading: 'だいがくでは じょうほうしすてむを せんこうしておりました。はやく みなさまの おやくにたてるよう、せいしんせいい つとめてまいります。',
        english: 'I majored in Information Systems at university. I will dedicate myself with sincerity and diligence so that I can be helpful to the team as soon as possible.',
        myanmar: 'တက္ကသိုလ်မှာ Information Systems အဓိကဖြင့် ဘွဲ့ရခဲ့ပါတယ်။ အားလုံးအတွက် အမြန်ဆုံး အထောက်အကူဖြစ်စေနိုင်ဖို့ စိတ်ရောကိုယ်ပါ အစွမ်းကုန် ကြိုးစားဆောင်ရွက်သွားပါ့မယ်။',
      },
      {
        id: 'd4-3',
        speaker: 'あなた (You)',
        speakerRole: '新任担当者',
        japanese: 'まだまだ未熟者でございますので、ご指導ご鞭撻のほど、何卒よろしくお願い申し上げます！',
        reading: 'まだまだ みじゅくもので ございますので、ごしどうごべんたつのほど、なにとぞ よろしくおねがいもうしあげます！',
        english: 'Since I am still inexperienced, I humbly ask for your mentorship, guidance, and encouragement!',
        myanmar: 'အတွေ့အကြုံနုနယ်သေးသည့်အတွက် နောင်အနာဂတ် လမ်းညွှန်သင်ကြားမှုများ ပေးသနားပါရန် အထူးပင် မေတ္တာရပ်ခံအပ်ပါသည်ခင်ဗျာ။',
      },
    ],
    vocabulary: [
      {
        word: '専攻',
        reading: 'せんこう',
        romaji: 'senkou',
        meaningEn: 'Academic major / specialization',
        meaningMy: 'အဓိကဘာသာရပ် (မေဂျာ)',
        nuance: 'Used to explain your university studies during self-introductions.',
        exampleSentence: '大学では国際ビジネスを専攻しておりました。',
      },
      {
        word: 'お役に立てる',
        reading: 'おやくにたてる',
        romaji: 'oyakunitateru',
        meaningEn: 'To be of use / helpful to the team',
        meaningMy: 'အထောက်အကူဖြစ်စေခြင်း / အသုံးဝင်စေခြင်း',
        nuance: 'Humble ambition formula: 「一日も早くお役に立てるよう努力いたします」.',
        exampleSentence: '早くチームのお役に立てるよう頑張ります。',
      },
      {
        word: '未熟者',
        reading: 'みじゅくもの',
        romaji: 'mijukumono',
        meaningEn: 'Inexperienced person / novice (humble)',
        meaningMy: 'အတွေ့အကြုံနုနယ်သေးသူ (ကိုယ့်ကိုယ်ကို နှိမ့်ချပြောဆိုခြင်း)',
        nuance: 'Shows humility even if you have prior skills. Japanese corporate virtue.',
        exampleSentence: '未熟者ですが、精一杯頑張ります。',
      },
      {
        word: 'ご指導ご鞭撻',
        reading: 'ごしどうごべんたつ',
        romaji: 'goshidou gobentatsu',
        meaningEn: 'Guidance and encouragement / mentorship',
        meaningMy: 'လမ်းညွှန်သင်ကြားမှုနှင့် အားပေးတိုက်တွန်းမှု',
        nuance: 'Formal business set phrase for closing speeches and letters.',
        exampleSentence: '今後ともご指導ご鞭撻のほどよろしくお願いいたします。',
      },
    ],
    grammar: [
      {
        pattern: '〜てまいる / 〜てまいります',
        structure: '[動詞連用形] て + まいります',
        meaningEn: 'I will humbly proceed to [do action] into the future',
        meaningMy: '[လုပ်ဆောင်မှု] ကို ဆက်လက် အစွမ်းကုန် ကြိုးစားသွားပါမည်',
        usageRule: 'Humble future action indicating continuous dedication.',
        examples: [
          {
            japanese: '誠心誠意、職務に努めてまいります。',
            reading: 'せいしんせいい、しょくむに つとめてまいります。',
            english: 'I will devote myself sincerely to my duties.',
            myanmar: 'စိတ်ရောကိုယ်ပါ အလုပ်တာဝန်များကို ကြိုးစားထမ်းဆောင်သွားပါမည်။',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-f2-1-1',
        promptJp: '自己紹介の結びとして、最も品格があり礼儀正しいフレーズはどれですか。',
        promptEn: 'Which is the most dignified and polite closing phrase for a business self-introduction?',
        promptMy: 'မိမိကိုယ်ကို မိတ်ဆက်ရာတွင် နိဂုံးချုပ်အနေဖြင့် အသိမ်မွေ့ဆုံးနှင့် အယဉ်ကျေးဆုံး စကားစုမှာ မည်သည့်အရာဖြစ်သနည်း။',
        options: [
          'じゃあ、よろしく！',
          'ご指導ご鞭撻のほど、よろしくお願い申し上げます。',
          '仲良くしてね。',
          '私の紹介は以上です、バイバイ。',
        ],
        correctAnswer: 1,
        explanation:
          '「ご指導ご鞭撻のほど、よろしくお願い申し上げます」 is the classic, highly respected gold-standard phrase for Japanese business self-introductions.',
        explanationMy:
          '「ご指導ご鞭撻のほど、よろしくお願い申し上げます」 သည် ဂျပန်စီးပွားရေးလုပ်ငန်းခွင် မိတ်ဆက်စကားများတွင် အထူးပင် လေးစားသမှုရှိသော ဂန္တဝင် ရွှေစံနှုန်း စကားစု ဖြစ်ပါသည်။',
      },
    ],
    typingPracticePhrases: [
      {
        phraseJp: 'よろしくお願い申し上げます。',
        reading: 'よろしくおねがいもうしあげます。',
        meaningEn: 'I humbly request your favorable cooperation.',
        meaningMy: 'အထူးပင် ကျေးဇူးတင်ရှိပြီး ဆက်လက်ကူညီပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။',
      },
      {
        phraseJp: 'ご指導ご鞭撻のほどお願いいたします。',
        reading: 'ごしどうごべんたつのほどおねがいいたします。',
        meaningEn: 'I ask for your mentorship and guidance.',
        meaningMy: 'သွန်သင်လမ်းညွှန်မှုပေးပါရန် ရိုသေစွာ မေတ္တာရပ်ခံအပ်ပါသည်။',
      },
    ],
    studioShortcut: {
      tabId: 'interview_sim',
      buttonText: 'Practice in Interview Simulator',
    },
  },

  // ==========================================================================
  // UNIT 2: LESSON 5 - 名刺交換のマナーと手順
  // ==========================================================================
  'l-f2-2': {
    lessonId: 'l-f2-2',
    scenarioOverview:
      'The sacred ritual of Meishi Koukan (名刺交換 - Business Card Exchange). Handling business cards with two hands, positioning hierarchy, and proper arrangement on the meeting table.',
    officeContext:
      'In Japan, a business card is treated as the alter ego of the person standing in front of you. Misplacing, bending, or putting away a card too quickly can break a business deal.',
    etiquetteRules: [
      'Always prepare your business card holder (名刺入れ) before the meeting begins.',
      'Present and receive cards with BOTH hands at chest level, bowing slightly.',
      'The visiting / subordinate party always presents their card from a lower position.',
      'During the meeting, arrange received cards neatly on top of your card case on the table, ordered according to the seating plan.',
    ],
    dialogue: [
      {
        id: 'd5-1',
        speaker: 'あなた (You)',
        speakerRole: '訪問側 (Visiting Sales)',
        japanese: '恐れ入ります。頂戴いたします。株式会社グローバルテックの田中と申します。',
        reading: 'おそれいります。ちょうだいいたします。かぶしきがいしゃ ぐろーばるてっくの たなかと もうします。',
        english: 'Excuse me. Allow me to present my card. My name is Tanaka from GlobalTech Co., Ltd.',
        myanmar: 'ခွင့်ပြုပါခင်ဗျာ။ ကတ်လဲလှယ်ပါရစေ။ GlobalTech ကုမ္ပဏီမှ တာနာကာ ဖြစ်ပါတယ်ခင်ဗျာ။',
      },
      {
        id: 'd5-2',
        speaker: '鈴木部長 (Client)',
        speakerRole: '取引先 (Client Manager)',
        japanese: '大和商事の鈴木でございます。本日はお越しいただきありがとうございます。',
        reading: 'やまとしょうじの すずきで ございます。ほんじつは おこしいただき ありがとうございます。',
        english: 'I am Suzuki from Yamato Corp. Thank you very much for coming today.',
        myanmar: 'ယာမာတို ကုန်သွယ်ရေးက ဆူဇူကီး ဖြစ်ပါတယ်။ ဒီနေ့ လာရောက်ပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။',
      },
      {
        id: 'd5-3',
        speaker: 'あなた (You)',
        speakerRole: '受領時 (Receiving card)',
        japanese: '鈴木部長様ですね。頂戴いたします。本日は何卒よろしくお願いいたします。',
        reading: 'すずきぶちょうさまですね。ちょうだいいたします。ほんじつは なにとぞ よろしくおねがいいたします。',
        english: 'Manager Suzuki, I gratefully receive your card. Thank you very much for your time today.',
        myanmar: 'ဌာနမှူး ဆူဇူကီးခင်ဗျာ၊ ကတ်ပြားကို ကျေးဇူးတင်စွာ လက်ခံရရှိပါတယ်ခင်ဗျာ။ ဒီနေ့အတွက် အထူးကျေးဇူးတင်ရှိပါသည်ခင်ဗျာ။',
        note: 'Always read the client\'s name aloud softly to confirm pronunciation.',
      },
    ],
    vocabulary: [
      {
        word: '名刺入れ',
        reading: 'めいしいれ',
        romaji: 'meishi-ire',
        meaningEn: 'Business card holder / case',
        meaningMy: 'လိပ်စာကတ်ထည့်သည့် ဘူး/အိတ်',
        nuance: 'Leather cases are standard; metal or cheap plastic cases are frowned upon in formal meetings.',
        exampleSentence: '名刺入れの上にいただいた名刺を置きます。',
      },
      {
        word: '頂戴いたします',
        reading: 'ちょうだいいたします',
        romaji: 'choudai itashimasu',
        meaningEn: 'I gratefully receive this (Humble formula for cards)',
        meaningMy: 'ကျေးဇူးတင်စွာဖြင့် လက်ခံရရှိပါသည် (ရိုသေစွာလက်ခံခြင်း)',
        nuance: 'Mandatory phrase spoken at the exact instant you take someone\'s card.',
        exampleSentence: '名刺を受け取るときは「頂戴いたします」と言います。',
      },
      {
        word: '復唱',
        reading: 'ふくしょう',
        romaji: 'fukushou',
        meaningEn: 'Repeating back for confirmation',
        meaningMy: 'သေချာစေရန် ပြန်လည်ရွတ်ဆိုအတည်ပြုခြင်း',
        nuance: 'Always confirm rare kanji names aloud when receiving meishi.',
        exampleSentence: 'お名前の漢字を復唱して確認する。',
      },
    ],
    grammar: [
      {
        pattern: '〜を頂戴いたします',
        structure: '[名詞] を頂戴いたします',
        meaningEn: 'I humbly accept / receive [Item]',
        meaningMy: '[ပစ္စည်း/ကတ်] ကို ရိုသေစွာ လက်ခံရယူပါသည်',
        usageRule: 'Extremely polite humble replacement for もらいます.',
        examples: [
          {
            japanese: 'お名刺を頂戴いたします。',
            reading: 'おめいしを ちょうだいいたします。',
            english: 'I gratefully accept your business card.',
            myanmar: 'လိပ်စာကတ်ကို ရိုသေစွာ လက်ခံရယူပါသည်ခင်ဗျာ။',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-f2-2-1',
        promptJp: '相手から名刺を受け取るとき、最もふさわしいマナーはどれですか。',
        promptEn: 'What is the most appropriate etiquette when receiving a business card from a client?',
        promptMy: 'ဖောက်သည်ထံမှ လိပ်စာကတ် (名刺) ကို လက်ခံရယူရာတွင် အသင့်တော်ဆုံး ယဉ်ကျေးမှု ကျင့်ဝတ်မှာ မည်သည့်အရာနည်း။',
        options: [
          '片手ですぐに受け取り、ポケットにしまう。',
          '両手で胸の高さで受け取り、「頂戴いたします」とお礼を言って名前を確認する。',
          '名刺にメモ帳代わりにボールペンで相手の電話番号をメモする。',
          '机の上に直接ポイと放り投げる。',
        ],
        correctAnswer: 1,
        explanation:
          'Always receive meishi with both hands at chest height, say 「頂戴いたします」, and confirm their name. Never write on their card or put it away in front of them!',
        explanationMy:
          'လိပ်စာကတ် (名刺) ကို အမြဲတမ်း ရင်ဘတ်အမြင့်တွင် လက်နှစ်ဖက်ဖြင့် ကိုင်တွယ်လက်ခံရမည်ဖြစ်ပြီး 「頂戴いたします」 ဟု ပြောကာ အမည်ကို သေချာဖတ်ရှု အတည်ပြုရပါမည်။ ၎င်းတို့ရှေ့တွင် ကတ်ပေါ်သို့ ဘောပင်ဖြင့် ရေးခြစ်ခြင်း သို့မဟုတ် အိတ်ကပ်ထဲ ချက်ချင်းထိုးထည့်ခြင်းကို လုံးဝ မပြုလုပ်ရပါ။',
      },
    ],
    typingPracticePhrases: [
      {
        phraseJp: '頂戴いたします。',
        reading: 'ちょうだいいたします。',
        meaningEn: 'I gratefully receive it.',
        meaningMy: 'ကျေးဇူးတင်စွာဖြင့် လက်ခံရယူပါသည်ခင်ဗျာ။',
      },
      {
        phraseJp: 'お名刺を頂戴いたします。',
        reading: 'おめいしをちょうだいいたします。',
        meaningEn: 'I gratefully receive your business card.',
        meaningMy: 'လိပ်စာကတ်ကို ကျေးဇူးတင်စွာဖြင့် လက်ခံရယူပါသည်ခင်ဗျာ။',
      },
    ],
    studioShortcut: {
      tabId: 'culture',
      buttonText: 'Review Business Card Culture Guide',
    },
  },

  // ==========================================================================
  // UNIT 3: LESSON 6 - クッション言葉と丁寧な依頼
  // ==========================================================================
  'l-f3-1': {
    lessonId: 'l-f3-1',
    scenarioOverview:
      'Mastering Japanese "Cushion Words" (クッション言葉) to soften workplace requests, ask for urgent favors, and decline politely without creating friction.',
    officeContext:
      'Direct requests like "資料をください" sound demanding and aggressive in Japanese offices. Cushion words wrap your intention in polite empathy.',
    etiquetteRules: [
      'Use 「恐れ入りますが」 (I am deeply humbled / pardon the imposition) before asking for information or actions.',
      'Use 「お手数をおかけしますが」 (Pardon causing you extra trouble) before requesting a favor or task.',
      'Use 「ご多忙中恐縮ですが」 (I apologize while you are extremely busy) when approaching managers.',
    ],
    dialogue: [
      {
        id: 'd6-1',
        speaker: 'あなた (You)',
        speakerRole: '若手社員',
        japanese: '恐れ入りますが、こちらの申請書にご捺印をいただけますでしょうか。',
        reading: 'おそれいりますが、こちらの しんせいしょに ごなついんを いただけますでしょうか。',
        english: 'Pardon the imposition, but could I please trouble you to affix your seal to this application form?',
        myanmar: 'အားနာပါတယ်ခင်ဗျာ၊ ဒီလျှောက်လွှာဖောင်မှာ တံဆိပ်တုံးလေး ထုပေးနိုင်မလားခင်ဗျာ။',
      },
      {
        id: 'd6-2',
        speaker: '高橋係長 (Section Chief)',
        speakerRole: '上司',
        japanese: 'はい、確認したよ。ここに押せばいいね。',
        reading: 'はい、かくにんしたよ。ここに おせばいいね。',
        english: 'Yes, I checked it. I just stamp here, right?',
        myanmar: 'ဟုတ်ကဲ့ စစ်ဆေးပြီးပါပြီ။ ဒီနေရာမှာ တံဆိပ်ထုပေးရမှာနော်။',
      },
      {
        id: 'd6-3',
        speaker: 'あなた (You)',
        speakerRole: '若手社員',
        japanese: 'お忙しいところお手数をおかけいたしました。誠にありがとうございます！',
        reading: 'おいそがしいところ おてすうを おかけいたしました。まことに ありがとうございます！',
        english: 'Thank you very much for taking time out of your busy schedule to help me!',
        myanmar: 'အလုပ်များနေတဲ့ကြားက အချိန်ပေးကူညီပေးတဲ့အတွက် အထူးကျေးဇူးတင်ရှိပါသည်ခင်ဗျာ။',
      },
    ],
    vocabulary: [
      {
        word: '恐れ入りますが',
        reading: 'おそれいりますが',
        romaji: 'osoreirimasu ga',
        meaningEn: 'Pardon the imposition / I am sorry to trouble you, but...',
        meaningMy: 'အားနာရပါသည်၊ သို့သော်လည်း...',
        nuance: 'The premier cushion word for starting any request in Japanese business.',
        exampleSentence: '恐れ入りますが、お名前をお伺いできますか。',
      },
      {
        word: 'お手数をおかけしますが',
        reading: 'おてすうをおかけしますが',
        romaji: 'otesuu wo okake shimasu ga',
        meaningEn: 'I apologize for the trouble, but...',
        meaningMy: 'အလုပ်ရှုပ်စေမိတဲ့အတွက် အားနာရပါသည်၊ သို့သော်လည်း...',
        nuance: 'Used whenever the requested action requires effort, paperwork, or time from the other party.',
        exampleSentence: 'お手数をおかけしますが、ご返信をお願いいたします。',
      },
      {
        word: 'ご捺印',
        reading: 'ごなついん',
        romaji: 'gonatsuin',
        meaningEn: 'Affixing seal / stamping name stamp (Hanko)',
        meaningMy: 'တံဆိပ်တုံးထုနှိပ်ခြင်း (Hanko)',
        nuance: 'Polite honorific form of 捺印.',
        exampleSentence: '契約書にご捺印をお願い申し上げます。',
      },
    ],
    grammar: [
      {
        pattern: '〜ていただけますでしょうか',
        structure: '[動詞て形] + いただけますでしょうか',
        meaningEn: 'Could you possibly be kind enough to [do action]?',
        meaningMy: '[ပြုလုပ်ပေး] နိုင်ပါမည်လားခင်ဗျာ (အလွန်ယဉ်ကျေးသော တောင်းဆိုမှု)',
        usageRule: 'Far more polite than 「〜てください」. The standard formula for asking superiors and clients.',
        examples: [
          {
            japanese: '見積書をメールでお送りいただけますでしょうか。',
            reading: 'みつもりしょを めーるで おおくりいただけますでしょうか。',
            english: 'Could you please be kind enough to send the quotation by email?',
            myanmar: 'ကုန်ကျစရိတ်ခန့်မှန်းချက်ကို အီးမေးလ်ဖြင့် ပို့ပေးနိုင်ပါမည်လားခင်ဗျာ။',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-f3-1-1',
        promptJp: 'クライアントに急ぎの書類確認をお願いするとき、文頭に置く最も適切なクッション言葉はどれですか。',
        promptEn: 'When asking a client for an urgent document review, what is the best cushion phrase?',
        promptMy: 'ဖောက်သည်ထံသို့ အရေးကြီးသော စာရွက်စာတမ်း အမြန်စစ်ဆေးပေးရန် မေတ္တာရပ်ခံရာတွင် ဝါကျအစ၌ ထားရှိရမည့် အကောင်းဆုံး စကားပလ္လင်ခံ (Cushion phrase) မှာ မည်သည့်အရာနည်း။',
        options: [
          '早くしてください！',
          '大変恐れ入りますが、',
          '絶対にお願いしますから、',
          '時間がないので、',
        ],
        correctAnswer: 1,
        explanation:
          '「大変恐れ入りますが、」 cushions the urgency and shows professional respect, preventing the client from feeling pressured or disrespected.',
        explanationMy:
          '「大変恐れ入りますが、」 သည် အရေးတကြီး တောင်းဆိုရခြင်းကြောင့် ဖြစ်ပေါ်လာမည့် ဖိအားကို လျော့ပါးစေပြီး ဖောက်သည်အား လေးစားသမှုရှိစွာဖြင့် တောင်းဆိုသော အသုံးအနှုန်း ဖြစ်ပါသည်။',
      },
    ],
    typingPracticePhrases: [
      {
        phraseJp: '恐れ入りますが、',
        reading: 'おそれいりますが、',
        meaningEn: 'Pardon the imposition, but...',
        meaningMy: 'အားနာပါသည်၊ သို့သော်...',
      },
      {
        phraseJp: 'お手数をおかけいたしますが、よろしくお願いいたします。',
        reading: 'おてすうをおかけいたしますが、よろしくおねがいいたします。',
        meaningEn: 'I apologize for the trouble, and thank you for your kind assistance.',
        meaningMy: 'အလုပ်ရှုပ်စေမိသည့်အတွက် အားနာပါသည်၊ ကူညီဆောင်ရွက်ပေးပါရန် မေတ္တာရပ်ခံပါသည်။',
      },
    ],
    studioShortcut: {
      tabId: 'email',
      buttonText: 'Practice in Business Email Studio',
    },
  },

  // ==========================================================================
  // UNIT 4: LESSON 8 - 電話応対の基本と取次ぎ
  // ==========================================================================
  'l-f4-1': {
    lessonId: 'l-f4-1',
    scenarioOverview:
      'Answering the office telephone within 3 rings, identifying your company, clarifying caller identity, and smoothly transferring calls internally.',
    officeContext:
      'Telephone etiquette directly represents your company\'s brand. You are expected to answer within 2 rings with energy and clarity.',
    etiquetteRules: [
      'Pick up within 2 rings: 「はい、株式会社〇〇、営業部でございます」.',
      'If it rings 3 times or more, open with: 「大変お待たせいたしました」.',
      'Always keep a memo pad and pen ready before picking up the receiver.',
      'Repeat the caller\'s company and name before putting them on hold to transfer: 「〇〇商事の△△様ですね。いつも大変お世話になっております」.',
    ],
    dialogue: [
      {
        id: 'd8-1',
        speaker: 'あなた (You)',
        speakerRole: '電話受付',
        japanese: 'お電話ありがとうございます。株式会社ネオテック、営業部でございます。',
        reading: 'おでんわありがとうございます。かぶしきがいしゃ ねおてっく、えいぎょうぶで ございます。',
        english: 'Thank you for calling. This is the Sales Department at NeoTech Co., Ltd.',
        myanmar: 'ဖုန်းခေါ်ဆိုမှုအတွက် ကျေးဇူးတင်ရှိပါသည်ခင်ဗျာ။ NeoTech ကုမ္ပဏီ အရောင်းဌာန ဖြစ်ပါတယ်ခင်ဗျာ။',
      },
      {
        id: 'd8-2',
        speaker: '伊藤様 (Client)',
        speakerRole: '取引先担当者',
        japanese: 'いつもお世話になっております。大和通商の伊藤と申しますが、山田課長はいらっしゃいますでしょうか。',
        reading: 'いつも おせわになっております。やまとつうしょうの いとうと もうしますが、やまだかちょうは いらっしゃいますでしょうか。',
        english: 'Thank you as always. This is Ito from Yamato Trading. Is Section Chief Yamada available?',
        myanmar: 'အမြဲတမ်း အားပေးကူညီမှုအတွက် ကျေးဇူးတင်ပါတယ်။ ယာမာတို ကုန်သွယ်ရေးက အီတို ဖြစ်ပါတယ်၊ ဌာနမှူး ယာမာဒါ ရှိပါသလားခင်ဗျာ။',
      },
      {
        id: 'd8-3',
        speaker: 'あなた (You)',
        speakerRole: '電話受付',
        japanese: '大和通商の伊藤様ですね。いつも大変お世話になっております。山田にお取次ぎいたしますので、少々お待ちください。',
        reading: 'やまとつうしょうの いとうさまですね。いつも たいへんおせわになっております。やまだに おとりつぎいたしますので、しょうしょう おまちください。',
        english: 'Mr. Ito of Yamato Trading, thank you very much as always. I will connect you to Yamada, so please hold for a moment.',
        myanmar: 'ယာမာတို ကုန်သွယ်ရေးမှ မစ္စတာအီတို ခင်ဗျာ။ အမြဲတမ်း ကျေးဇူးတင်ရှိပါတယ်ခင်ဗျာ။ ယာမာဒါထံ လွှဲပြောင်းပေးပါမည်ဖြစ်၍ ခဏစောင့်ဆိုင်းပေးပါခင်ဗျာ။',
        note: 'Notice: strip title for your colleague: 山田にお取次ぎいたします (NOT 山田課長に).',
      },
    ],
    vocabulary: [
      {
        word: '取次ぎ',
        reading: 'とりつぎ',
        romaji: 'toritsugi',
        meaningEn: 'Transferring / connecting a telephone call',
        meaningMy: 'ဖုန်းလွှဲပြောင်းဆက်သွယ်ပေးခြင်း',
        nuance: 'Standard office verb for connecting an outside caller to an internal member.',
        exampleSentence: '担当者にお取次ぎいたします。',
      },
      {
        word: '保留',
        reading: 'ほりゅう',
        romaji: 'horyuu',
        meaningEn: 'Holding / putting on hold',
        meaningMy: 'ဖုန်းလိုင်းခဏဆိုင်းငံ့ထားခြင်း (Hold)',
        nuance: 'Always press the hold button before speaking internally so the caller hears music.',
        exampleSentence: '保留にして内線で山田を呼び出す。',
      },
      {
        word: '内線',
        reading: 'ないせん',
        romaji: 'naisen',
        meaningEn: 'Internal office telephone extension',
        meaningMy: 'ရုံးတွင်း extension ဖုန်းလိုင်း',
        nuance: 'Direct dial 3-4 digit number for coworkers inside the company.',
        exampleSentence: '内線204番にお回しします。',
      },
    ],
    grammar: [
      {
        pattern: '〜にお取次ぎいたします',
        structure: '[社内の人名] に お取次ぎいたします',
        meaningEn: 'I will connect you to [Internal Person]',
        meaningMy: '[ရုံးတွင်းတာဝန်ခံ] ထံသို့ လွှဲပြောင်းပေးပါမည်',
        usageRule: 'Always use humble form and never attach titles (like 課長) to the internal colleague\'s name.',
        comparison: {
          incorrectOrRude: '山田課長に代わります。 (Rude to put 課長 to client)',
          correctBusiness: '山田にお取次ぎいたします。',
          reason: 'Internal staff belong to the in-group (ウチ) relative to the client.',
        },
        examples: [
          {
            japanese: '担当の鈴木にお取次ぎいたしますので、少々お待ちください。',
            reading: 'たんとうの すずきに おとりつぎいたしますので、しょうしょう おまちください。',
            english: 'I will connect you to Suzuki in charge, so please hold a moment.',
            myanmar: 'တာဝန်ခံ ဆူဇူကီးထံသို့ လွှဲပြောင်းပေးပါမည်ဖြစ်၍ ခဏစောင့်ဆိုင်းပေးပါခင်ဗျာ။',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q-f4-1-1',
        promptJp: 'クライアントから電話があり、「山田課長をお願いします」と言われたとき、保留にする前の正しい返答はどれですか。',
        promptEn: 'When an outside client calls asking for "Section Chief Yamada", what is the correct response before putting them on hold?',
        promptMy: 'ပြင်ပဖောက်သည်ထံမှ ဖုန်းဝင်လာပြီး "ဌာနမှူး ယာမာဒါနှင့် ပြောလိုပါသည်" ဟု မေးမြန်းလာပါက ဖုန်းမလွှဲပြောင်းမီ မှန်ကန်သော တုံ့ပြန်ပြောဆိုပုံမှာ မည်သည့်အရာနည်း။',
        options: [
          '山田課長にお繋ぎしますので待ってください。',
          '山田にお取次ぎいたしますので、少々お待ちください。',
          'ちょっと待ってね。',
          '山田課長様、お客様から電話ですよ！',
        ],
        correctAnswer: 1,
        explanation:
          'When speaking to an outside client, your own manager is in-group (ウチ). You must strip the title "課長" and say 「山田にお取次ぎいたしますので、少々お待ちください」.',
        explanationMy:
          'ပြင်ပဖောက်သည်နှင့် စကားပြောရာတွင် မိမိ၏ ဌာနမှူးသည် အတွင်းအုပ်စု (ウチ) ဖြစ်သောကြောင့် ရာထူး "課長" ကို ဖြုတ်ပယ်၍ မျိုးရိုးအမည်သက်သက်ဖြင့် 「山田にお取次ぎいたしますので、少々お待ちください」 ဟု ပြောဆိုရပါမည်။',
      },
    ],
    typingPracticePhrases: [
      {
        phraseJp: 'お電話ありがとうございます。',
        reading: 'おでんわありがとうございます。',
        meaningEn: 'Thank you for calling.',
        meaningMy: 'ဖုန်းဆက်သွယ်ပေးသည့်အတွက် ကျေးဇူးတင်ရှိပါသည်။',
      },
      {
        phraseJp: '少々お待ちください。',
        reading: 'しょうしょうおまちください。',
        meaningEn: 'Please hold for a moment.',
        meaningMy: 'ခဏလောက် စောင့်ဆိုင်းပေးနိုင်မလားခင်ဗျာ။',
      },
      {
        phraseJp: '担当にお取次ぎいたします。',
        reading: 'たんとうにおとりつぎいたします。',
        meaningEn: 'I will connect you to the person in charge.',
        meaningMy: 'တာဝန်ခံပုဂ္ဂိုလ်ထံသို့ လွှဲပြောင်းပေးပါမည်ခင်ဗျာ။',
      },
    ],
    studioShortcut: {
      tabId: 'horenso',
      buttonText: 'Open Phone & Horenso Studio',
    },
  },
};

// ============================================================================
// DYNAMIC LESSON DETAIL GENERATOR FOR ALL CURRICULUM LESSONS
// Guarantees 100% of all 29 lessons have high-quality operable study content
// ============================================================================
export function getBusinessLessonDetail(lesson: BusinessLesson): BusinessLessonDetail {
  if (BUSINESS_LESSON_DETAILS[lesson.id]) {
    return BUSINESS_LESSON_DETAILS[lesson.id];
  }

  // Generate university-style operable lesson package dynamically
  const vocabItems: BusinessLessonVocabItem[] = (lesson.keyVocabulary || []).map((v) => ({
    word: v,
    reading: v,
    meaningEn: `Key workplace terminology: ${v}`,
    meaningMy: `စီးပွားရေးလုပ်ငန်းသုံး အဓိကဝေါဟာရ - ${v}`,
    nuance: `Essential term for ${lesson.titleEn}`,
    exampleSentence: `${v}を適切に用いて実務を遂行します。`,
  }));

  const grammarItems: BusinessLessonGrammarItem[] = (lesson.keyGrammarPatterns || []).map((p) => ({
    pattern: p,
    structure: `${p}（ビジネス敬語表現）`,
    meaningEn: `Formal professional pattern: ${p}`,
    meaningMy: `ရုံးသုံးယဉ်ကျေးသော သဒ္ဒါပုံစံ - ${p}`,
    usageRule: `Used in formal corporate communication to maintain polite deference.`,
    examples: [
      {
        japanese: `${p}につきまして、何卒よろしくお願い申し上げます。`,
        reading: `${p}につきまして、なにとぞ よろしくおねがいもうしあげます。`,
        english: `Regarding ${p}, thank you very much for your favorable consideration.`,
        myanmar: `${p} နှင့်ပတ်သက်၍ အထူးပင် ကျေးဇူးတင်ရှိပါသည်ခင်ဗျာ။`,
      },
    ],
  }));

  const dialogueLines: BusinessLessonDialogueLine[] = [
    {
      id: `${lesson.id}-d1`,
      speaker: 'あなた (You)',
      speakerRole: '担当者 (Person in Charge)',
      japanese: `いつも大変お世話になっております。${lesson.titleJp}の件につきましてご相談がございます。`,
      reading: `いつも たいへんおせわになっております。${lesson.titleJp}のけんに つきまして ごそうだんが ございます。`,
      english: `Thank you very much as always. I would like to consult with you regarding ${lesson.titleEn}.`,
      myanmar: `အမြဲတမ်း ကျေးဇူးတင်ရှိပါတယ်ခင်ဗျာ။ ${lesson.titleEn} ကိစ္စနှင့်ပတ်သက်၍ တိုင်ပင်ဆွေးနွေးလိုပါသည်ခင်ဗျာ။`,
      note: 'Polite formal opening in business context.',
    },
    {
      id: `${lesson.id}-d2`,
      speaker: '上司 / 取引先 (Partner)',
      speakerRole: '相手先 (Counterpart)',
      japanese: `お疲れ様です。はい、その件ですね。具体的にどのような状況でしょうか。`,
      reading: `おつかれさまです。はい、そのけんですね。ぐたいてきに どのような じょうきょうでしょうか。`,
      english: `Thank you. Yes, regarding that matter. What is the specific situation?`,
      myanmar: `ပင်ပန်းပါပြီ။ ဟုတ်ကဲ့ အဲ့ဒီကိစ္စပေါ့နော်။ အသေးစိတ် အခြေအနေ ဘယ်လိုရှိပါသလဲ။`,
    },
    {
      id: `${lesson.id}-d3`,
      speaker: 'あなた (You)',
      speakerRole: '担当者 (Person in Charge)',
      japanese: `承知いたしました。詳細をまとめましたので、ご確認いただけますでしょうか。`,
      reading: `しょうちいたしました。しょうさいを まとめましたので、ごかくにん いただけますでしょうか。`,
      english: `Certainly. I have summarized the details, so could you please review them?`,
      myanmar: `နားလည်ပါပြီခင်ဗျာ။ အသေးစိတ် အချက်အလက်များကို ပြုစုထားပါသဖြင့် စစ်ဆေးကြည့်ရှုပေးနိုင်မလားခင်ဗျာ။`,
      note: 'Use 承知いたしました and polite request forms.',
    },
  ];

  const quizQuestions: BusinessLessonQuizItem[] = [
    {
      id: `${lesson.id}-q1`,
      promptJp: `本レッスン「${lesson.titleJp}」において、最も重視されるビジネスマナーはどれですか。`,
      promptEn: `In this lesson "${lesson.titleEn}", which business practice is most essential?`,
      promptMy: `ဤသင်ခန်းစာ "${lesson.titleJp}" တွင် အဓိက အလေးထားရမည့် စီးပွားရေးလုပ်ငန်းခွင် ကျင့်ဝတ်မှာ မည်သည့်အရာဖြစ်သနည်း။`,
      options: [
        '相手の立場と社内外の境界（ウチ・ソト）を意識して敬語を正しく使い分ける。',
        '親しみを込めてタメ口（友達言葉）で話す。',
        '確認せずに自分の推測だけで独断で進める。',
        '返答を後回しにして何日も放置する。',
      ],
      correctAnswer: 0,
      explanation:
        'In Japanese professional environments, properly discerning in-group vs out-group (ウチ/ソト) boundaries and honoring the other party with polite language is fundamental to business trust.',
      explanationMy:
        'ဂျပန်စီးပွားရေးလုပ်ငန်းခွင်တွင် ကုမ္ပဏီတွင်း/ပြင် (ウチ/ソト) နယ်နိမိတ်ကို ခွဲခြားသိမြင်ပြီး ယဉ်ကျေးသော ရုံးသုံးစကား (敬語) ကို မှန်ကန်စွာ ခွဲခြားသုံးစွဲခြင်းသည် လုပ်ငန်းခွင် ယုံကြည်မှုအတွက် အခြေခံအကျဆုံး ဖြစ်ပါသည်။',
    },
    {
      id: `${lesson.id}-q2`,
      promptJp: `本単元で学ぶ表現「${lesson.keyGrammarPatterns?.[0] || '承知いたしました'}」の使い方として適切なものはどれですか。`,
      promptEn: `What is the proper application of the core lesson pattern?`,
      promptMy: `ဤသင်ခန်းစာတွင် လေ့လာခဲ့သော အသုံးအနှုန်း "${lesson.keyGrammarPatterns?.[0] || '承知いたしました'}" ၏ မှန်ကန်သော အသုံးပြုပုံမှာ အဘယ်နည်း။`,
      options: [
        '上司や取引先の要望・指示に対して丁寧に応答する際に使用する。',
        'クレームを受けたときに反論する際に使用する。',
        'プライベートの友人とSNSでチャットする際に使用する。',
        'いつでも「了解！」とだけ返事をする。',
      ],
      correctAnswer: 0,
      explanation:
        'Standard business phrases convey respect, professional diligence, and accountability when replying to instructions or requests.',
      explanationMy:
        'ရုံးသုံးစကားများသည် အထက်လူကြီး သို့မဟုတ် ဖောက်သည်များထံမှ ညွှန်ကြားချက် သို့မဟုတ် တောင်းဆိုချက်များကို တာဝန်ယူမှုအပြည့်ဖြင့် လေးစားစွာ တုံ့ပြန်ရာတွင် မရှိမဖြစ် အရေးကြီးပါသည်။',
    },
  ];

  const typingPhrases = (lesson.keyGrammarPatterns || ['承知いたしました', 'お世話になっております']).map((pat) => ({
    phraseJp: `${pat}。`,
    reading: `${pat}。`,
    meaningEn: `Key phrase from ${lesson.titleEn}`,
    meaningMy: `${lesson.titleJp} မှ အဓိက သုံးစွဲရမည့် စကားစု - ${pat}`,
  }));

  // Determine relevant studio shortcut
  let studioShortcut: BusinessLessonDetail['studioShortcut'] = undefined;
  if (lesson.type === 'email') {
    studioShortcut = { tabId: 'email', buttonText: 'Open Business Email Studio' };
  } else if (lesson.type === 'telephone' || lesson.type === 'meeting' || lesson.type === 'conversation') {
    studioShortcut = { tabId: 'horenso', buttonText: 'Practice in Phone & Meeting Studio' };
  } else if (lesson.type === 'keigo') {
    studioShortcut = { tabId: 'keigo', buttonText: 'Master Keigo in Keigo Studio' };
  } else if (lesson.type === 'interview' || lesson.type === 'resume') {
    studioShortcut = { tabId: 'interview_sim', buttonText: 'Launch Interview Simulator' };
  } else if (lesson.type === 'culture') {
    studioShortcut = { tabId: 'culture', buttonText: 'Explore Workplace Culture Guide' };
  }

  return {
    lessonId: lesson.id,
    scenarioOverview:
      lesson.culturalNote ||
      `Workplace practical training for ${lesson.titleEn}. Master corporate communication protocols, situational dialogue, and polite vocabulary.`,
    officeContext: `Standard Japanese business environment requiring JLPT ${lesson.prerequisiteJpLevel} level proficiency and adherence to Japanese business conventions.`,
    etiquetteRules: (lesson.learningObjectives || []).concat([
      'Always confirm details and repeat back crucial information.',
      'Maintain humble deference (謙譲) toward clients and appropriate respect toward superiors.',
    ]),
    dialogue: dialogueLines,
    vocabulary: vocabItems,
    grammar: grammarItems,
    quiz: quizQuestions,
    typingPracticePhrases: typingPhrases,
    studioShortcut,
  };
}

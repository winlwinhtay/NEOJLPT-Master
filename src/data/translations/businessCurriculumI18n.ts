// ============================================================================
// BUSINESS JAPANESE CURRICULUM MULTILINGUAL I18N DATA
// Complete Burmese and English Localizations for All 16 Units and 29 Lessons:
// Unit Titles, Descriptions, Lesson Titles, Learning Outcomes & Cultural Notes
// ============================================================================

import { SupportedLanguage } from '../../types/i18n';
import { BusinessUnit, BusinessLesson } from '../../types/business';

export interface BusinessUnitI18nData {
  titleMy: string;
  titleEn: string;
  descriptionMy: string;
  descriptionEn: string;
}

export interface BusinessLessonI18nData {
  titleMy: string;
  titleEn: string;
  learningObjectivesMy: string[];
  learningObjectivesEn: string[];
  culturalNoteMy: string;
  culturalNoteEn: string;
  scenarioOverviewMy?: string;
  officeContextMy?: string;
  etiquetteRulesMy?: string[];
}

export const BUSINESS_UNITS_I18N: Record<string, BusinessUnitI18nData> = {
  'u-found-1': {
    titleMy: 'ဂျပန်ကုမ္ပဏီနှင့် လုပ်ငန်းခွင်ပတ်ဝန်းကျင်',
    titleEn: 'Working in a Japanese Company',
    descriptionMy: 'ကုမ္ပဏီအဆင့်ဆင့်ဖွဲ့စည်းပုံ၊ ဌာနများ၊ အသုံးများသော ရာထူးအမည်များနှင့် နေ့စဉ်ရုံးသုံး ဆက်သွယ်ပြောဆိုမှုများ။',
    descriptionEn: 'Organizational hierarchy, departments, common job titles, and daily office communication.',
  },
  'u-found-2': {
    titleMy: 'မိမိကိုယ်ကိုမိတ်ဆက်ခြင်းနှင့် လိပ်စာကတ် (名刺) လဲလှယ်ခြင်း',
    titleEn: 'Self-Introduction & Business Card Etiquette',
    descriptionMy: 'ပထမဆုံးတာဝန်ကျသည့်နေ့ မိတ်ဆက်ခြင်း၊ လိပ်စာကတ်ပေးအပ်/လက်ခံခြင်း ကျင့်ဝတ်များနှင့် စီးပွားရေးလုပ်ငန်းသုံး အပြန်အလှန်နှုတ်ဆက်ခြင်း။',
    descriptionEn: 'Professional self-introductions on assignment day, business card (Meishi) protocol, and peer introductions.',
  },
  'u-found-3': {
    titleMy: 'ယဉ်ကျေးစွာ အကူအညီတောင်းခံခြင်း၊ ခွင့်တောင်းခြင်းနှင့် တောင်းပန်ခြင်း',
    titleEn: 'Polite Workplace Requests, Permission & Apologies',
    descriptionMy: 'ခူရှင်စကားလုံးများ (Cushion words) အသုံးပြု၍ ယဉ်ကျေးစွာ တောင်းဆိုခြင်း၊ ခွင့်တောင်းခြင်းနှင့် အမှားအယွင်းများအတွက် တောင်းပန်စကားများ။',
    descriptionEn: 'Using cushion words (クッション言葉) to soften requests, seeking permission respectfully, and issuing sincere apologies.',
  },
  'u-found-4': {
    titleMy: 'ရုံးသုံးတယ်လီဖုန်း လက်ခံဖြေကြားခြင်း အခြေခံ',
    titleEn: 'Telephone Basics — Receiving & Answering',
    descriptionMy: 'ဖုန်းမြည်သံ ၃ ချက်အတွင်း ကိုင်ခြင်း၊ ကုမ္ပဏီအမည်ဖြင့် စတင်မိတ်ဆက်ခြင်း၊ ဖုန်းလွှဲပေးခြင်းနှင့် မက်ဆေ့ချ်မှတ်ယူခြင်း။',
    descriptionEn: 'Greeting callers within 3 rings, identifying company name, asking callers to hold, and polite transfers.',
  },
  'u-found-5': {
    titleMy: 'စီးပွားရေးအီးမေးလ် ရေးသားခြင်း အခြေခံနှင့် ဖွဲ့စည်းပုံ',
    titleEn: 'Business Email Basics & Structure',
    descriptionMy: 'ဂျပန်စံပြု အီးမေးလ် အစိတ်အပိုင်း ၇ ချက်- အကြောင်းအရာခေါင်းစဉ်၊ လက်ခံသူ၊ နှုတ်ခွန်းဆက်စကား၊ အကြောင်းအရာ၊ တောင်းဆိုချက်၊ နှုတ်ဆက်နိဂုံးနှင့် လက်မှတ်။',
    descriptionEn: 'The standard 7-part Japanese business email formula: Subject line, Recipient, Greeting, Context, Request, Closing, and Signature.',
  },
  'u-inter-1': {
    titleMy: 'ကေအိဂို ရိုသေစကား စနစ်တကျ ကျွမ်းကျင်လေ့လာခြင်း',
    titleEn: 'Systematic Keigo Mastery',
    descriptionMy: 'ပြောဆိုသူ၏ ရှုထောင့်စည်းမျဉ်းများ၊ ပုံမှန်မဟုတ်သော ကြိယာပြောင်းလဲမှုများ၊ ထပ်ဆင့်ရိုသေစကား (二重敬語) ရှောင်ကြဉ်နည်းနှင့် လက်တွေ့လေ့ကျင့်ခန်းများ။',
    descriptionEn: 'Deep dive into actor rules, irregular transformations, avoiding double keigo (二重敬語), and keigo confusion exercises.',
  },
  'u-inter-2': {
    titleMy: 'ဟိုးရန်းဆို (သတင်းပို့/ဆက်သွယ်/တိုင်ပင်) လက်တွေ့အသုံးချခြင်း',
    titleEn: 'Mastering Hou-Ren-Sou (Report, Inform, Consult)',
    descriptionMy: 'ဂျပန်လုပ်ငန်းခွင်၏ ရွှေစည်းမျဉ်း- အချိန်နှင့်တပြေးညီ တိုးတက်မှုအစီရင်ခံခြင်း၊ အချိန်ကြန့်ကြာမှုများ ကြိုတင်အသိပေးခြင်းနှင့် အထက်လူကြီးထံ အကြံဉာဏ်ရယူခြင်း။',
    descriptionEn: 'The golden rule of the Japanese workplace: timely progress reports, delay alerts, and asking superiors for strategic advice.',
  },
  'u-inter-3': {
    titleMy: 'လက်တွေ့ စီးပွားရေးလုပ်ငန်းသုံး အီးမေးလ်ရေးသားခြင်း',
    titleEn: 'Practical Business Email Writing',
    descriptionMy: 'ရက်ချိန်းညှိနှိုင်းခြင်း၊ လျှို့ဝှက်စာရွက်စာတမ်းများ ပူးတွဲပေးပို့ခြင်း၊ တွေ့ဆုံဆွေးနွေးပြီးနောက် ကျေးဇူးတင်လွှာနှင့် သတိပေးစာများ ရေးသားခြင်း။',
    descriptionEn: 'Scheduling appointments, attaching confidential documents, writing thank-you notes after meetings, and polite reminders.',
  },
  'u-inter-4': {
    titleMy: 'ဂျပန်စီးပွားရေး အစည်းအဝေးများတွင် ပါဝင်ဆွေးနွေးခြင်း',
    titleEn: 'Participating in Japanese Business Meetings',
    descriptionMy: 'အစည်းအဝေးအစီအစဉ်ကို နားလည်ခြင်း၊ သဘောတူညီချက်နှင့် ယဉ်ကျေးသော သဘောထားကွဲလွဲမှုများ ဖော်ပြခြင်း၊ လုပ်ဆောင်ရမည့်အချက်များကို အကျဉ်းချုပ်ခြင်း။',
    descriptionEn: 'Understanding meeting agendas, expressing agreement and polite disagreement, clarifying statements, and summarizing action items.',
  },
  'u-inter-5': {
    titleMy: 'လုပ်ငန်းခွင်ကျင့်ဝတ်နှင့် ထိုင်ခုံနေရာ သတ်မှတ်ချက် (席次)',
    titleEn: 'Corporate Etiquette & Seating Arrangements (席次)',
    descriptionMy: 'အစည်းအဝေးခန်း၊ ကုမ္ပဏီကား၊ တက္ကစီနှင့် ဓာတ်လှေကားအတွင်း အထက်လူကြီး/ဧည့်သည်နေရာ (上座) နှင့် ငယ်သားနေရာ (下座) စည်းမျဉ်းများ။',
    descriptionEn: 'Rules of Kamiza (上座 - seat of honor) and Shimoza (下座) in meeting rooms, company cars, taxis, and elevators.',
  },
  'u-upper-1': {
    titleMy: 'စီးပွားရေးဆိုင်ရာ ရှင်းလင်းတင်ပြမှုနှင့် စည်းရုံးအဆိုပြုခြင်း',
    titleEn: 'Business Presentations & Persuasive Proposals',
    descriptionMy: 'စိတ်ဝင်စားဖွယ် နိဒါန်းဖွင့်ခြင်း၊ ပြဿနာအချက်အလက်များ တင်ပြခြင်း၊ ဈေးကွက်ဒေတာဇယားများ ရှင်းပြခြင်းနှင့် အမေးအဖြေကဏ္ဍကို ကျွမ်းကျင်စွာ ကိုင်တွယ်ခြင်း။',
    descriptionEn: 'Opening hooks, introducing problem statements, narrating market data and charts, and handling Q&A under pressure.',
  },
  'u-upper-2': {
    titleMy: 'အရောင်းအဝယ်ဆွေးနွေးပွဲနှင့် ဈေးနှုန်း/ရက်ချိန်း ညှိနှိုင်းနည်းပညာ',
    titleEn: 'Commercial Negotiations & Terms Compromise',
    descriptionMy: 'အစားထိုးကမ်းလှမ်းချက်များ ပြုလုပ်ခြင်း၊ အခြေအနေအရ သဘောတူခြင်း၊ အမြတ်အစွန်းကို ယဉ်ကျေးစွာ ကာကွယ်ခြင်းနှင့် Win-Win သဘောတူညီမှု ရယူခြင်း။',
    descriptionEn: 'Making counterproposals, conditional agreements, defending profit margins politely, and achieving win-win consensus.',
  },
  'u-upper-3': {
    titleMy: 'ဖောက်သည်တိုင်ကြားချက် (Complaints) ဖြေရှင်းခြင်းနှင့် ပြဿနာကုစားမှု',
    titleEn: 'Customer Complaints & Crisis Resolution',
    descriptionMy: 'ကနဦး စာနာနားလည်မှုပြသခြင်း၊ ကြားဖြတ်မပြောဘဲ နားထောင်ခြင်း၊ အမှန်တကယ်ဖြစ်ပွားရသည့် အကြောင်းရင်းကို စိစစ်ပြီး ပြန်လည်မဖြစ်ပွားစေရန် အစီအမံချမှတ်ခြင်း။',
    descriptionEn: 'First response empathy, listening without interrupting, determining factual causes, formulating remedy plans, and preventing recurrence.',
  },
  'u-prof-1': {
    titleMy: 'အမှုဆောင်အဆင့် အတည်ပြုချက်ရယူခြင်းနှင့် နေမဝါရှီ (Nemawashi) ယဉ်ကျေးမှု',
    titleEn: 'Executive Stakeholder Management & Nemawashi',
    descriptionMy: 'သဘောတူညီမှုအခြေခံ ဆုံးဖြတ်ချက်ချမှတ်ခြင်း၊ တရားဝင်အစည်းအဝေးမတိုင်မီ ကြိုတင်ညှိနှိုင်းခြင်း (根回し) နှင့် Ringi အတည်ပြုချက် ရယူခြင်း လုပ်ငန်းစဉ်။',
    descriptionEn: 'Understanding consensus-driven decision making, unofficial pre-alignment (根回し), and the Ringi approval process.',
  },
  'u-career-1': {
    titleMy: 'ဂျပန်ကိုယ်ရေးရာဇဝင် (履歴書) နှင့် Entry Sheet (ES) ရေးသားနည်း',
    titleEn: 'Japanese Resume (履歴書) & Entry Sheet (ES)',
    descriptionMy: 'တရားဝင် လျှောက်ထားလွှာ စာရွက်စာတမ်းများ ရေးသားခြင်း၊ ပညာအရည်အချင်းနှင့် လုပ်ငန်းအတွေ့အကြုံ ဖြည့်သွင်းခြင်း၊ ဆွဲဆောင်မှုရှိသော Self-PR နှင့် လျှောက်ထားရသည့် ရည်ရွယ်ချက် ရေးနည်း။',
    descriptionEn: 'Writing formal application documents, formatting education/work history, crafting impactful self-PR and company motivation.',
  },
  'u-career-2': {
    titleMy: 'အလုပ်အင်တာဗျူး ပြင်ဆင်မှုနှင့် လက်တွေ့စမ်းသပ်လေ့ကျင့်ခန်း',
    titleEn: 'Job Interview Etiquette & Simulation',
    descriptionMy: 'အခန်းတွင်း ဝင်ထွက်ခြင်း ကျင့်ဝတ် (တံခါး ၃ ချက်ခေါက်ခြင်း၊ 失礼いたします)၊ အဓိက အင်တာဗျူးမေးခွန်းများ၊ မမျှော်လင့်ထားသော မေးခွန်းများနှင့် အင်တာဗျူးစစ်ဆေးသူထံ မေးခွန်းပြန်မေးခြင်း (逆質問)။',
    descriptionEn: 'Room-entering protocol (knocking 3 times, 失礼いたします), core interview questions, handling unexpected questions, and reverse questioning (逆質問).',
  },
};

export const BUSINESS_LESSONS_I18N: Record<string, BusinessLessonI18nData> = {
  // --- UNIT 1 ---
  'l-f1-1': {
    titleMy: 'လုပ်ငန်းခွင်အခြေခံများနှင့် ကုမ္ပဏီဖွဲ့စည်းပုံစနစ်',
    titleEn: 'Japanese Workplace Basics & Structure',
    learningObjectivesMy: [
      '社内 (ကုမ္ပဏီတွင်း) နှင့် 社外 (ကုမ္ပဏီပြင်ပ) နယ်နိမိတ်စည်းမျဉ်း ကွာခြားချက်ကို နားလည်သဘောပေါက်ခြင်း',
      'အခြေခံ ရုံးတွင်းကျင့်ဝတ်များနှင့် စံပြု မနက်ခင်းနှုတ်ခွန်းဆက်စကားများကို သိရှိနားလည်ခြင်း',
    ],
    learningObjectivesEn: [
      'Understand the difference between 社内 (internal) and 社外 (external)',
      'Recognize basic corporate etiquette and standard office morning greetings',
    ],
    culturalNoteMy: 'မနက်ခင်း နှုတ်ခွန်းဆက်စကား (おはようございます) နှင့် ပြန်ခါနီး နှုတ်ဆက်စကား (お先に失礼します) တို့သည် လုပ်ငန်းခွင် စည်းလုံးညီညွတ်မှုအတွက် အထူးအရေးကြီးပါသည်။',
    culturalNoteEn: 'Morning greetings (おはようございます) and leaving greetings (お先に失礼します) are vital for workplace cohesion.',
    scenarioOverviewMy: 'ဂျပန်ကုမ္ပဏီလုပ်ငန်းခွင်သို့ ပထမဆုံးမနက်ခင်း စတင်ဝင်ရောက်ခြင်း။ ရုံးတွင်းကျင့်ဝတ်များ၊ စံပြုမနက်ခင်း နှုတ်ဆက်စကားများနှင့် ကုမ္ပဏီတွင်း (社内) နှင့် ပြင်ပ (社外) စည်းမျဉ်းများကို လေ့လာသင်ယူခြင်း။',
    officeContextMy: 'ဂျပန်ကုမ္ပဏီများတွင် မနက်ခင်းနှုတ်ဆက်စကားသည် အသင်းအဖွဲ့စိတ်ဓာတ်ကို မြှင့်တင်ပေးပါသည်။ အလုပ်စတင်ချိန်မတိုင်မီ ၁၅ မိနစ်ကြိုတင် ရောက်ရှိရပါမည်။',
    etiquetteRulesMy: [
      'တရားဝင် အလုပ်စချိန်မတိုင်မီ ၁၀ မှ ၁၅ မိနစ် ကြိုတင်ရောက်ရှိပါ။ ဂျပန်တွင် "ကွက်တိရောက်ခြင်း" သည် နောက်ကျခြင်းဟု သတ်မှတ်ပါသည်။',
      'ရုံးခန်းထဲဝင်ရောက်ချိန်တွင် "おはようございます" ဟု မျက်လုံးချင်းဆုံကာ ခေါင်းညိတ်အရိုအသေပြု နှုတ်ဆက်ပါ။',
      'အလုပ်ပြီး၍ ပြန်ချိန်တွင် "お先に失礼いたします" ဟု နှုတ်မဆက်ဘဲ မည်သည့်အခါမျှ မပြန်ပါနှင့်။',
    ],
  },
  'l-f1-2': {
    titleMy: 'ကုမ္ပဏီဌာနအမည်များနှင့် ရာထူးခေါ်ဝေါ်ပုံများ',
    titleEn: 'Company Departments & Job Titles',
    learningObjectivesMy: [
      'အသုံးများသော ဌာနအမည်များကို လေ့လာခြင်း (営業, 総務, 人事, 経理, 開発)',
      'အထက်လူကြီးများကို さん မခေါ်ဘဲ ရာထူးအမည်ဖြင့် တိုက်ရိုက်ခေါ်ဝေါ်ခြင်း (部長, 課長, 係長)',
    ],
    learningObjectivesEn: [
      'Learn common department names (営業, 総務, 人事, 経理, 開発)',
      'Address superiors properly by title (部長, 課長, 係長) instead of さん',
    ],
    culturalNoteMy: 'ရာထူးအမည်တွင် "さん" မထည့်ရပါ။ "田中部長" ဟု ခေါ်ရမည်ဖြစ်ပြီး "田中部長さん" မခေါ်ရပါ။ ပြင်ပဧည့်သည်များနှင့် စကားပြောရာတွင် မိမိအထက်လူကြီးကို ရာထူးမပါဘဲ နာမည်ချည်းသာ သုံးရပါမည်။',
    culturalNoteEn: 'Never attach "さん" to a title. Say "田中部長", not "田中部長さん". When talking to clients, do not use titles for your own superiors.',
    scenarioOverviewMy: 'ဂျပန်ကုမ္ပဏီဌာနများ (အရောင်း၊ စီမံ၊ ဝန်ထမ်းရေးရာ၊ စာရင်းကိုင်၊ နည်းပညာဖွံ့ဖြိုးရေး) နှင့် မန်နေဂျာများကို "さん" မတပ်ဘဲ ရာထူးဖြင့် တိုက်ရိုက်ရိုသေစွာ ခေါ်ဆိုပုံ ကျင့်ဝတ်။',
    officeContextMy: 'ဂျပန်ရုံးတွင် ရာထူးအမည် (社長, 部長, 課長) သည် ရိုသေမှုပြီးသားဖြစ်သဖြင့် "さん" ထပ်ထည့်ပါက သဒ္ဒါမမှန်သကဲ့သို့ ယဉ်ကျေးမှုမရှိရာ ရောက်ပါသည်။',
    etiquetteRulesMy: [
      'ကုမ္ပဏီတွင်း အထက်လူကြီးများကို "[မျိုးရိုးအမည်] + [ရာထူး]" ဖြင့် ခေါ်ပါ (ဥပမာ- 「田中部長」, 「佐藤課長」)။',
      '「田中部長さん」 သို့မဟုတ် 「佐藤課長様」 ဟု ဘယ်တော့မှ မခေါ်ပါနှင့်။',
      'ကုမ္ပဏီပြင်ပ ဝယ်သူများနှင့် စကားပြောချိန်တွင် မိမိလူကြီး၏ ရာထူးကို ဖြုတ်ပြီး 「弊社の田中が担当しております」 ဟုသာ သုံးပါ။',
    ],
  },
  'l-f1-3': {
    titleMy: 'နေ့စဉ်ရုံးတွင်း နှုတ်ဆက်စကားနှင့် ပုံမှန်ဆက်ဆံရေး',
    titleEn: 'Daily Office Greetings & Routine Exchanges',
    learningObjectivesMy: [
      'အလုပ်ပြီးဆုံးချိန် နှုတ်ဆက်စကား お疲れ様です ကို ကျွမ်းကျင်စွာ အသုံးပြုခြင်း',
      'အလုပ်ချိန်အတွင်း ရုံးခန်းအပြင်ထွက်ခြင်းနှင့် ပြန်ရောက်ခြင်း နှုတ်ဆက်စကားများ (行ってまいります, ただいま戻りました)',
    ],
    learningObjectivesEn: [
      'Master the universal workplace phrase: お疲れ様です (Otsukaresama desu)',
      'Learn standard coming and going phrases (行ってまいります, ただいま戻りました)',
    ],
    culturalNoteMy: 'အထက်လူကြီးကို ご苦労様 (Gokurousama) ဟု ဘယ်တော့မှ မသုံးရပါ။ အထက်လူကြီးမှ လက်အောက်ငယ်သားကိုသာ သုံးသော စကားဖြစ်ပါသည်။',
    culturalNoteEn: 'Never say ご苦労様 (Gokurousama) to superiors. It is only used by superiors to subordinates.',
  },

  // --- UNIT 2 ---
  'l-f2-1': {
    titleMy: 'စီးပွားရေးလုပ်ငန်းသုံး ကိုယ်ရေးမိတ်ဆက်ခြင်း',
    titleEn: 'Professional Business Self-Introduction',
    learningObjectivesMy: [
      'ကုမ္ပဏီအမည်၊ ဌာနနှင့် မိမိအမည်ကို နှိမ့်ချသော ရိုသေစကား (謙譲語) ဖြင့် မိတ်ဆက်ခြင်း',
      'အနာဂတ် လမ်းညွှန်သင်ကြားပေးမှုကို တောင်းခံသည့် よろしくお願いいたします ပုံစံများ',
    ],
    learningObjectivesEn: [
      'State company name, department, and full name using humble expressions (〜と申します)',
      'Deliver a concise 30-second professional pitch expressing motivation',
    ],
    culturalNoteMy: 'မိမိအမည်ကို မိတ်ဆက်ရာတွင် "さん" မထည့်ရပါ။ နှိမ့်ချစကားဖြစ်သော "と申します" (to moushimasu) ကို အသုံးပြုရပါမည်။',
    culturalNoteEn: 'Never attach "さん" to your own name. Always use the humble form "〜と申します".',
  },
  'l-f2-2': {
    titleMy: 'လိပ်စာကတ်လဲလှယ်ခြင်း (名刺交換) လုပ်ထုံးလုပ်နည်းနှင့် စည်းမျဉ်းများ',
    titleEn: 'Business Card Exchange (名刺交換) Protocol',
    learningObjectivesMy: [
      'လိပ်စာကတ်ကို လက်နှစ်ဖက်ဖြင့် စနစ်တကျ ကိုင်တွယ်ပေးအပ်/လက်ခံခြင်း',
      'အစည်းအဝေးစားပွဲပေါ်တွင် ရာထူးအလိုက် လိပ်စာကတ်များ စီစဉ်တင်ထားနည်း',
    ],
    learningObjectivesEn: [
      'Present and accept business cards with two hands at chest height',
      'Align received business cards systematically on the meeting table',
    ],
    culturalNoteMy: 'လိပ်စာကတ်သည် ထိုလူ၏ ကိုယ်စားပြုအဖြစ် သဘောထားသဖြင့် မျက်မှောက်တွင် စာရေးခြင်း၊ ခေါက်ခြင်း သို့မဟုတ် အိတ်ကပ်ထဲ ချက်ချင်းထည့်ခြင်း လုံးဝ မပြုလုပ်ရပါ။',
    culturalNoteEn: 'A business card is treated as an extension of the other person. Never write on it, fold it, or pocket it immediately.',
  },

  // --- UNIT 3 ---
  'l-f3-1': {
    titleMy: 'ခူရှင်စကားလုံးများ (Cushion Words) နှင့် ယဉ်ကျေးသောအကူအညီတောင်းခံမှု',
    titleEn: 'Cushion Words & Softening Requests',
    learningObjectivesMy: [
      'တောင်းဆိုမှုမပြုမီ စိတ်သက်သာစေသော ခူရှင်စကားလုံးများ (恐れ入りますが, お手数ですが) အသုံးပြုခြင်း',
      '〜ていただけますでしょうか အသုံးအနှုန်းဖြင့် ယဉ်ကျေးစွာ အကူအညီတောင်းခံခြင်း',
    ],
    learningObjectivesEn: [
      'Prefix requests with cushion phrases (恐れ入りますが, お手数をおかけしますが)',
      'Formulate polite indirect requests using 〜ていただけますでしょうか',
    ],
    culturalNoteMy: 'ဂျပန်ယဉ်ကျေးမှုတွင် တိုက်ရိုက်တောင်းဆိုခြင်းထက် ခူရှင်စကားလုံး ခံပြောခြင်းက တစ်ဖက်သားအတွက် ဝန်မလေးစေဘဲ ယဉ်ကျေးမှုရှိစေပါသည်။',
    culturalNoteEn: 'Cushion words soften demands and prevent the other party from feeling pressured or commanded.',
  },
  'l-f3-2': {
    titleMy: 'လုပ်ငန်းခွင် အသိအမှတ်ပြု အစီရင်ခံခြင်းနှင့် တောင်းပန်စကားများ',
    titleEn: 'Reporting Acknowledgement & Workplace Apologies',
    learningObjectivesMy: [
      'ညွှန်ကြားချက်လက်ခံရာတွင် かしこまりました / 承知いたしました ကို အသုံးပြုခြင်း',
      'တောင်းပန်ရာတွင် 申し訳ございません ကို စနစ်တကျ အသုံးပြုခြင်း',
    ],
    learningObjectivesEn: [
      'Acknowledge instructions with かしこまりました or 承知いたしました (never 了解です to bosses)',
      'Use multi-tiered apologies: 申し訳ございません vs 大変失礼いたしました',
    ],
    culturalNoteMy: 'အထက်လူကြီး သို့မဟုတ် ဝယ်သူကို "了解です" (Ryoukai desu) ဟု မသုံးရပါ။ "かしこまりました" သို့မဟုတ် "承知いたしました" ဟုသာ သုံးရပါမည်။',
    culturalNoteEn: 'Never say 了解です (Ryoukai desu) to superiors or clients. Use かしこまりました or 承知いたしました.',
  },

  // --- UNIT 4 ---
  'l-f4-1': {
    titleMy: 'ဖုန်းခေါ်ဆိုမှု လက်ခံဖြေကြားခြင်းနှင့် မိမိကိုယ်ကို မိတ်ဆက်ခြင်း',
    titleEn: 'Answering Incoming Calls & Self-Identification',
    learningObjectivesMy: [
      'ဖုန်းကိုင်ပြီးလျှင် お電話ありがとうございます ဖြင့် နှုတ်ဆက်ခြင်း',
      'ကုမ္ပဏီအမည်နှင့် မိမိအမည်ကို ဖုန်းထဲတွင် သွက်လက်စွာ မိတ်ဆက်ပြောဆိုခြင်း',
    ],
    learningObjectivesEn: [
      'Answer promptly within 3 rings: お電話ありがとうございます、[Company]の[Name]でございます',
      'Handle apology if delayed: 大変お待たせいたしました',
    ],
    culturalNoteMy: 'ဖုန်းသံ ၃ ချက်ထက် ပိုမြည်ပြီးမှ ကိုင်ပါက "大変お待たせいたしました" (စောင့်ဆိုင်းစေမိသည့်အတွက် အားနာပါသည်) ဟု စတင်တောင်းပန်ရပါမည်။',
    culturalNoteEn: 'If a call rings more than 3 times, always apologize first: 大変お待たせいたしました.',
  },
  'l-f4-2': {
    titleMy: 'ဖုန်းလွှဲပြောင်းပေးခြင်းနှင့် တာဝန်ရှိသူ မရှိချိန် မက်ဆေ့ချ်မှတ်ယူခြင်း',
    titleEn: 'Transferring Calls & Handling Absent Colleagues',
    learningObjectivesMy: [
      'တာဝန်ရှိသူ မရှိချိန် (အစည်းအဝေးတက်နေ/ခုံတွင်မရှိ) ကို ယဉ်ကျေးစွာ ရှင်းပြခြင်း',
      'ဖုန်းပြန်ခေါ်ရန် (折り返し) မက်ဆေ့ချ် မှတ်ယူပေးခြင်း',
    ],
    learningObjectivesEn: [
      'Explain absence politely: ただいま別の電話に出ております / 席を外しております',
      'Offer callback assistance: 戻り次第、折り返しお電話を差し上げるよう申し伝えましょうか',
    ],
    culturalNoteMy: 'ပြင်ပခေါ်ဆိုသူအား မိမိကုမ္ပဏီမှ မန်နေဂျာကို ရည်ညွှန်းပြောဆိုရာတွင် "佐藤部長は" မသုံးဘဲ "佐藤は" ဟုသာ နာမည်ချည်း သုံးရပါမည်။',
    culturalNoteEn: 'When talking to external callers, never attach titles to your own colleagues (say "佐藤は", not "佐藤部長は").',
  },

  // --- UNIT 5 ---
  'l-f5-1': {
    titleMy: 'အီးမေးလ်၏ အဓိက အစိတ်အပိုင်း ၇ ချက်နှင့် ရှင်းလင်းသော အကြောင်းအရာခေါင်းစဉ် ရေးသားနည်း',
    titleEn: 'The 7-Part Email Structure & Clear Subject Lines',
    learningObjectivesMy: [
      'အီးမေးလ်ခေါင်းစဉ်တွင် 【...】 ဖြင့် အရေးကြီးအကြောင်းအရာကို တိကျစွာ ရေးသားခြင်း',
      'အဖွင့်စကား いつもお世話になっております နှင့် အပိတ်စကား よろしくお願い申し上げます ကို အသုံးပြုခြင်း',
    ],
    learningObjectivesEn: [
      'Craft high-open-rate subject lines with brackets: 【ご相談】, 【日程調整】',
      'Structure the 7 essential blocks: Header, Greeting, Intro, Body, Action, Closing, Signature',
    ],
    culturalNoteMy: 'ဂျပန်အီးမေးလ်များတွင် အကြောင်းအရာခေါင်းစဉ် မပါခြင်း သို့မဟုတ် "မင်္ဂလာပါ" ဟုချည်းရေးခြင်းသည် စီးပွားရေးကျင့်ဝတ်နှင့် မညီပါ။ အကြောင်းအရာကို ရှင်းလင်းတိကျစွာ ဖော်ပြရပါမည်။',
    culturalNoteEn: 'A Japanese business email must never have a blank or vague subject line. Use brackets for clarity.',
  },

  // --- UNIT 6: KEIGO MASTERY ---
  'l-i1-1': {
    titleMy: 'ကေအိဂို အမျိုးအစား ၃ မျိုးနှင့် ပြောဆိုသူ၏ ရှုထောင့်စည်းမျဉ်းများ',
    titleEn: 'The 3 Keigo Categories & The Actor Perspective',
    learningObjectivesMy: [
      '尊敬語 (Sonkeigo - သူတစ်ပါးလုပ်ဆောင်မှုကို ချီးမြှောက်စကား) နှင့် 謙譲語 (Kenjougo - မိမိလုပ်ဆောင်မှုကို နှိမ့်ချစကား) ကွာခြားချက်ကို သဘောပေါက်ခြင်း',
      '丁寧语 (Teineigo - ယဉ်ကျေးစကား です/ます) ၏ နေရာမှန် အသုံးပြုပုံ',
    ],
    learningObjectivesEn: [
      'Distinguish Sonkeigo (elevating the counterpart) vs Kenjougo (humbling the speaker)',
      'Apply actor rules: who is performing the action dictates the keigo category',
    ],
    culturalNoteMy: 'မိမိကိုယ်ကို ရိုသေစကား (Sonkeigo) သုံးမိခြင်းသည် ဂျပန်လုပ်ငန်းခွင်တွင် ကြီးမားသော အမှားတစ်ခု ဖြစ်ပါသည်။',
    culturalNoteEn: 'Using Sonkeigo on your own actions is considered a major linguistic faux pas in Japan.',
  },
  'l-i1-2': {
    titleMy: 'အရေးကြီးသော ပုံမှန်မဟုတ်သည့် ကြိယာပြောင်းလဲမှုများ (Irregular Verbs)',
    titleEn: 'Irregular Verb Transformations',
    learningObjectivesMy: [
      '行く/来る/いる -> いらっしゃる (Sonkei) / 参る/おる (Kenjou)',
      '言う -> おっしゃる (Sonkei) / 申す/申し上げる (Kenjou)',
      '食べる/飲む -> 召し上がる (Sonkei) / いただく (Kenjou)',
    ],
    learningObjectivesEn: [
      'Master core irregular verbs: 行く, 来る, 言う, 食べる, 知る, する',
      'Drill rapid reflexive conversion in high-stakes conversations',
    ],
    culturalNoteMy: 'အရေးကြီးသော ကြိယာ ၈ ခု၏ အပြောင်းအလဲများကို အလွတ်ရထားခြင်းသည် ဂျပန်စီးပွားရေးလုပ်ငန်းခွင်တွင် ယုံကြည်မှုရရှိစေပါသည်။',
    culturalNoteEn: 'Mastering the 8 core irregular keigo verbs is non-negotiable for professional communication.',
  },
  'l-i1-3': {
    titleMy: 'အမှားများသော ကေအိဂိုအသုံးများနှင့် ထပ်ဆင့်ရိုသေစကား (二重敬語) ရှောင်ကြဉ်နည်း',
    titleEn: 'Common Keigo Pitfalls & Double Keigo',
    learningObjectivesMy: [
      '二重敬語 (ဥပမာ- おっしゃられました) ကဲ့သို့ ရိုသေစကား ၂ ထပ်ဖြစ်နေခြင်းကို ရှောင်ကြဉ်ခြင်း',
      'マニュアル敬語 (ဥပမာ- 〜のほう, よろしかったでしょうか) အမှားများကို ပြင်ဆင်ခြင်း',
    ],
    learningObjectivesEn: [
      'Eliminate double honorifics (二重敬語): お見えになられました -> お見えになりました',
      'Correct so-called "Convenience Store Keigo" (バイト敬語)',
    ],
    culturalNoteMy: 'အလွန်အကျွံ ရိုသေလွန်းခြင်း (Double Keigo) သည် သဒ္ဒါအရ မှားယွင်းပြီး သဘာဝမကျသော ခံစားချက်ကို ဖြစ်ပေါ်စေပါသည်။',
    culturalNoteEn: 'Over-politeness creates grammatical redundancy and sounds unpolished to native executives.',
  },

  // --- UNIT 7: HOU-REN-SOU ---
  'l-i2-1': {
    titleMy: 'နိဂုံးရလဒ်ကို အရင်ပြောဆိုသည့် အစီရင်ခံနည်း (PREP စနစ်)',
    titleEn: 'Reporting Results First (PREP Technique)',
    learningObjectivesMy: [
      'နိဂုံးရလဒ် (Conclusion) ကို အရင်ပြောပြီးမှ အကြောင်းရင်း (Reason) နှင့် ဥပမာ (Example) ကို ဆက်ပြောခြင်း',
      'အလုပ်များသော အထက်လူကြီးများအတွက် အချိန်ကုန်သက်သာစေသော အစီရင်ခံမှု ပြုလုပ်ခြင်း',
    ],
    learningObjectivesEn: [
      'Apply PREP framework: Point, Reason, Example, Point',
      'Start reports with 「結論から申し上げますと」 (To state the conclusion first)',
    ],
    culturalNoteMy: 'ဂျပန်လုပ်ငန်းခွင်တွင် လုပ်ငန်းစဉ်အစမှ အဆုံးထိ အစီအစဉ်အတိုင်း ပြောပြခြင်းထက် "ရလဒ်နိဂုံး" ကို အရင်ပြောခြင်းကို ပိုမိုတန်ဖိုးထားပါသည်။',
    culturalNoteEn: 'Busy managers prioritize bottom-line results before hearing chronological background stories.',
  },
  'l-i2-2': {
    titleMy: 'ပြဿနာနှင့် အချိန်ကြန့်ကြာမှုများကို လျင်မြန်စွာ အသိပေးတိုင်ပင်ခြင်း',
    titleEn: 'Reporting Delays, Problems & Asking for Advice',
    learningObjectivesMy: [
      'ပြဿနာဖြစ်ပွားသည်နှင့် ဖုံးကွယ်မထားဘဲ ချက်ချင်းအစီရင်ခံခြင်း',
      'ပြဿနာတင်ပြရုံသာမက မိမိဘက်မှ အကြံပြုဖြေရှင်းချက် (Alternative plan) ပါ တင်ပြခြင်း',
    ],
    learningObjectivesEn: [
      'Report bad news immediately (バッドニュース・ファースト)',
      'Accompany problems with a recovery proposal rather than just questions',
    ],
    culturalNoteMy: 'ပြဿနာဆိုးများကို အစောဆုံး သတင်းပို့ခြင်း (Bad News First) သည် ပြဿနာကြီးထွားမသွားစေရန် အကောင်းဆုံး ကာကွယ်မှု ဖြစ်ပါသည်။',
    culturalNoteEn: 'Hiding a delay until deadline day is a fatal breach of professional trust in Japanese companies.',
  },

  // --- UNIT 8: PRACTICAL EMAILS ---
  'l-i3-1': {
    titleMy: 'ရက်ချိန်းညှိနှိုင်းခြင်းနှင့် တွေ့ဆုံရန် ချိန်းဆိုခြင်း အီးမေးလ်များ',
    titleEn: 'Meeting Scheduling & Appointment Coordination',
    learningObjectivesMy: [
      'ရွေးချယ်ရန် ရက်စွဲ/အချိန် ၃ ခုကို ရှင်းလင်းစွာ ကမ်းလှမ်းဖော်ပြခြင်း',
      'အဆင်မပြေပါက အချိန်ညှိနှိုင်းနိုင်ကြောင်း ご都合が悪い場合は ဖြင့် ထည့်သွင်းရေးသားခြင်း',
    ],
    learningObjectivesEn: [
      'Propose 3 candidate time slots formatted cleanly with weekday indicators',
      'Handle rescheduling requests with utmost courtesy and speed',
    ],
    culturalNoteMy: 'ရက်ချိန်းတောင်းဆိုရာတွင် အချိန်တစ်ခုတည်း မကမ်းလှမ်းဘဲ အနည်းဆုံး ၃ ခု ရွေးချယ်ခွင့် ပေးရပါမည်။',
    culturalNoteEn: 'Always provide at least 3 distinct time windows when proposing meeting appointments.',
  },
  'l-i3-2': {
    titleMy: 'တွေ့ဆုံဆွေးနွေးပြီးနောက် ကျေးဇူးတင်လွှာနှင့် အစည်းအဝေးမှတ်တမ်း ပေးပို့ခြင်း',
    titleEn: 'Post-Meeting Thank You & Sending Minutes',
    learningObjectivesMy: [
      'အစည်းအဝေးပြီးဆုံးသည့်နေ့ သို့မဟုတ် နောက်တစ်နေ့မနက် စောစော ကျေးဇူးတင်လွှာ ပို့ခြင်း',
      'ဆွေးနွေးဆုံးဖြတ်ခဲ့သော အချက်များနှင့် Next Action များကို အကျဉ်းချုပ်ဖော်ပြခြင်း',
    ],
    learningObjectivesEn: [
      'Send meeting thank-you emails within 24 hours (preferably same day)',
      'Summarize key decisions, pending tasks, and assigned owners clearly',
    ],
    culturalNoteMy: 'အစည်းအဝေးပြီးနောက် ၂၄ နာရီအတွင်း ကျေးဇူးတင်လွှာ ပေးပို့ခြင်းသည် စီးပွားရေးလုပ်ငန်း ဆက်ဆံရေးကို ပိုမိုခိုင်မာစေပါသည်။',
    culturalNoteEn: 'Same-day follow-up emails demonstrate attentiveness and confirm alignment before misunderstandings arise.',
  },

  // --- UNIT 9: MEETINGS ---
  'l-i4-1': {
    titleMy: 'အမြင်သဘောထား တင်ပြခြင်း၊ သဘောတူခြင်းနှင့် ယဉ်ကျေးစွာ ငြင်းပယ်ခြင်း',
    titleEn: 'Expressing Opinions & Polite Disagreement',
    learningObjectivesMy: [
      'သဘောထားမတူညီပါက တိုက်ရိုက်မငြင်းဘဲ တစ်ဖက်အမြင်ကို အရင်လက်ခံပြီးမှ ကွဲလွဲချက်ကို ဖော်ပြခြင်း',
      '〜という考え方もございますが ကဲ့သို့သော ပျော့ပြောင်းသည့် အသုံးအနှုန်းများ သုံးခြင်း',
    ],
    learningObjectivesEn: [
      'Disagree without confrontation using the "Yes, and yet..." cushioning strategy',
      'Use tentative phrases: 〜と考えておりますが、いかがでしょうか',
    ],
    culturalNoteMy: 'အစည်းအဝေးတွင် အခြားသူ၏အမြင်ကို တိုက်ရိုက်ဆန့်ကျင်ငြင်းဆိုခြင်းသည် မျက်နှာပျက်စေနိုင်သဖြင့် သွယ်ဝိုက်သော ပျော့ပြောင်းစကားများကို သုံးရပါသည်။',
    culturalNoteEn: 'Public disagreement must be cushioned to preserve harmony (和) and face among participants.',
  },

  // --- UNIT 10: SEATING ---
  'l-i5-1': {
    titleMy: 'အစည်းအဝေးခန်း၊ တက္ကစီနှင့် ဓာတ်လှေကားအတွင်း ထိုင်ခုံနေရာ စည်းမျဉ်းများ',
    titleEn: 'Seating Rules in Rooms, Taxis, and Elevators',
    learningObjectivesMy: [
      'အစည်းအဝေးခန်းတွင် တံခါးနှင့် အဝေးဆုံးနေရာသည် အကြီးဆုံးနေရာ (上座) ဖြစ်ကြောင်း သိရှိခြင်း',
      'တက္ကစီတွင် ယာဉ်မောင်းနောက် တည့်တည့်နေရာသည် အကြီးဆုံးနေရာ ဖြစ်ကြောင်း နားလည်ခြင်း',
    ],
    learningObjectivesEn: [
      'Master Kamiza (top seat, furthest from door) vs Shimoza (junior seat, closest to door)',
      'Apply vehicle seating etiquette: rear right seat behind driver is #1 in chauffeured cars',
    ],
    culturalNoteMy: 'ဂျပန်စီးပွားရေးတွင် ဧည့်သည် သို့မဟုတ် အထက်လူကြီးကို အောက်ခြေနေရာ (Shimoza) တွင် ထိုင်စေမိပါက အလွန်ကြီးမားသော ကျင့်ဝတ်ချိုးဖောက်မှု ဖြစ်ပါသည်။',
    culturalNoteEn: 'Assigning a guest or client to Shimoza (lower seat) is considered deeply disrespectful in Japan.',
  },

  // --- UNIT 11: PRESENTATION ---
  'l-u1-1': {
    titleMy: 'ပရက်ဆင်တေးရှင်း ဖွဲ့စည်းပုံ၊ အစီအစဉ်နှင့် ဒေတာဇယား ရှင်းပြချက်များ',
    titleEn: 'Presentation Structure, Agenda & Data Commentary',
    learningObjectivesMy: [
      'ရှင်းလင်းတင်ပြမှု နိဒါန်း၊ ရည်ရွယ်ချက်နှင့် အစီအစဉ်ကို ရှင်းလင်းစွာ မိတ်ဆက်ခြင်း',
      'ဂရပ်ဇယားများနှင့် ဈေးကွက်ဒေတာများကို တိကျသော စီးပွားရေးစကားလုံးများဖြင့် ရှင်းပြခြင်း',
    ],
    learningObjectivesEn: [
      'Structure high-impact corporate slide decks with clear problem-solution roadmaps',
      'Narrate charts, percentages, and year-over-year trends fluidly in Japanese',
    ],
    culturalNoteMy: 'တင်ပြမှုပြုလုပ်ရာတွင် အချိန်တိကျစွာ ထိန်းသိမ်းခြင်းနှင့် နိဂုံးအချက်ကို အစောပိုင်းတွင် ရှင်းပြခြင်းက ပိုမိုထိရောက်မှု ရှိစေပါသည်။',
    culturalNoteEn: 'Japanese business presentations favor data-backed claims and adherence to strict time limits.',
  },
  'l-u1-2': {
    titleMy: 'အမေးအဖြေ (Q&A) ကဏ္ဍတွင် တည်ငြိမ်ရိုးသားစွာ ပြန်လည်ဖြေကြားနည်း',
    titleEn: 'Managing Tough Q&A Sessions',
    learningObjectivesMy: [
      'မေးခွန်းမေးမြန်းသူအား ကျေးဇူးတင်စကား ご質問ありがとうございます ဖြင့် စတင်ခြင်း',
      'မသေချာသော အချက်အလက်များအတွက် မှန်းဆမဖြေဘဲ စုံစမ်းပြီး ပြန်လည်အကြောင်းကြားမည်ဟု အသိပေးခြင်း',
    ],
    learningObjectivesEn: [
      'Acknowledge questions graciously before formulating responses',
      'Decline speculative answers politely: 確認の上、改めてご報告いたします',
    ],
    culturalNoteMy: 'မသိသောအချက်ကို မှန်းဆဖြေဆိုခြင်းထက် သေချာစစ်ဆေးပြီး အကြောင်းကြားမည်ဟု ရိုးသားစွာ ဖြေဆိုခြင်းကို ဂျပန်အမှုဆောင်များက ပိုမိုယုံကြည်ပါသည်။',
    culturalNoteEn: 'Never guess answers under pressure. Acknowledging limits and following up establishes trust.',
  },

  // --- UNIT 12: NEGOTIATION ---
  'l-u2-1': {
    titleMy: 'စည်းကမ်းချက် သတ်မှတ်ခြင်း၊ အစားထိုးကမ်းလှမ်းခြင်းနှင့် အလျှော့အတင်းပြုလုပ်ခြင်း',
    titleEn: 'Condition Setting, Counterproposals & Concessions',
    learningObjectivesMy: [
      'ဈေးနှုန်းလျှော့ချပေးရန် တောင်းဆိုမှုအား အခြားစည်းကမ်းချက်ဖြင့် အစားထိုးညှိနှိုင်းခြင်း',
      'Win-Win သဘောတူညီချက် ရရှိစေရန် နည်းဗျူဟာမြောက် စကားလုံးများ အသုံးပြုခြင်း',
    ],
    learningObjectivesEn: [
      'Defend pricing politely with value metrics and package trade-offs',
      'Phrase conditional compromises: 〜という条件であれば、検討可能でございます',
    ],
    culturalNoteMy: 'ဈေးနှုန်းကို ချက်ချင်းအလွယ်တကူ လျှော့ပေးခြင်းသည် မူလတန်ဖိုးကို ကျဆင်းစေသဖြင့် အစားထိုး အကျိုးကျေးဇူးတစ်ခုခုဖြင့် မျှတစွာ ညှိနှိုင်းရပါမည်။',
    culturalNoteEn: 'Unconditional discounts erode credibility. Always pair concessions with volume or timing tradeoffs.',
  },

  // --- UNIT 13: COMPLAINTS ---
  'l-u3-1': {
    titleMy: 'ကနဦး စာနာနားလည်မှုပြသခြင်း၊ တောင်းပန်ခြင်းနှင့် အခြေအနေထိန်းသိမ်းခြင်း',
    titleEn: 'First Response Empathy & De-escalation',
    learningObjectivesMy: [
      'စိတ်ဆိုးနေသော ဖောက်သည်၏ စကားကို ကြားဖြတ်မပြောဘဲ စိတ်ရှည်စွာ နားထောင်ခြင်း',
      'ဖောက်သည် ကြုံတွေ့ရသော အခက်အခဲအတွက် စာနာတောင်းပန်ခြင်း (大変ご不便をおかけいたしました)',
    ],
    learningObjectivesEn: [
      'Apply de-escalation active listening: nod, take thorough notes, avoid early defensiveness',
      'Apologize for distress caused before determining legal liability',
    ],
    culturalNoteMy: 'ဖောက်သည် စိတ်ဆိုးနေချိန်တွင် ဆင်ခြေဆင်လက်များ ချက်ချင်းပေးခြင်းသည် အခြေအနေကို ပိုမိုဆိုးရွားစေပါသည်။ စာနာမှုပြသခြင်းကို ဦးစားပေးရပါမည်။',
    culturalNoteEn: 'Defending technical correctness prematurely will escalate customer anger. Validate feelings first.',
  },

  // --- UNIT 14: EXECUTIVE & NEMAWASHI ---
  'l-p1-1': {
    titleMy: 'သဘောတူညီမှုရယူခြင်း (根回し) နှင့် ကုမ္ပဏီတွင်း ညှိနှိုင်းမှုနည်းလမ်းများ',
    titleEn: 'Consensus Building (根回し) & Internal Alignment',
    learningObjectivesMy: [
      'တရားဝင်အစည်းအဝေးမတိုင်မီ အဓိက သက်ဆိုင်သူများနှင့် ကြိုတင်အလွတ်သဘော ညှိနှိုင်းခြင်း',
      'ကန့်ကွက်နိုင်သူများ၏ စိုးရိမ်ချက်များကို ကြိုတင်ဖြေရှင်းထားခြင်း',
    ],
    learningObjectivesEn: [
      'Understand Nemawashi: informal background discussions to build unanimous consensus',
      'Identify key internal stakeholders (Key Persons) and address objections privately',
    ],
    culturalNoteMy: 'ဂျပန်တွင် အစည်းအဝေးခန်းထဲရောက်မှ အစီအစဉ်အသစ်ကို ပထမဆုံးအကြိမ် တင်ပြပါက ကန့်ကွက်ခံရနိုင်ခြေ များပါသည်။ ကြိုတင်ညှိနှိုင်းမှု (Nemawashi) သည် မရှိမဖြစ် လိုအပ်ပါသည်။',
    culturalNoteEn: 'Surprising Japanese executives in formal meetings without prior Nemawashi usually results in rejection.',
  },
  'l-p1-2': {
    titleMy: 'ဒါရိုက်တာဘုတ်အဖွဲ့သို့ အစီရင်ခံခြင်းနှင့် စီမံခန့်ခွဲမှုမဟာဗျူဟာ တင်ပြချက်များ',
    titleEn: 'Executive Board Briefings & Strategic Proposals',
    learningObjectivesMy: [
      'အမှုဆောင်အဆင့် ခေါင်းဆောင်များအတွက် မြင့်မားသော စီးပွားရေးလုပ်ငန်းသုံး အသုံးအနှုန်းများ သုံးခြင်း',
      'ROI (အကျိုးအမြတ်ပြန်ရမှု) နှင့် စွန့်စားရနိုင်ခြေ (Risk mitigation) ကို အဓိကထား တင်ပြခြင်း',
    ],
    learningObjectivesEn: [
      'Present strategic proposals to C-level executives with clear ROI and risk analyses',
      'Handle executive interruptions with poise, deference, and concise facts',
    ],
    culturalNoteMy: 'ဒါရိုက်တာဘုတ်အဖွဲ့သည် အသေးစိတ်နည်းပညာထက် စီးပွားရေးတန်ဖိုးနှင့် ရေရှည်အကျိုးကျေးဇူးကိုသာ အဓိကကြည့်ရှု စစ်ဆေးပါသည်။',
    culturalNoteEn: 'Board members evaluate strategic alignment and enterprise value rather than technical trivia.',
  },

  // --- UNIT 15: RESUME & ES ---
  'l-c1-1': {
    titleMy: 'ဂျပန်စံပြု ကိုယ်ရေးမှတ်တမ်းနှင့် အလုပ်အကိုင်ရာဇဝင် မှန်ကန်စွာ ရေးသားခြင်း',
    titleEn: 'Mastering the Japanese Resume & Career History',
    learningObjectivesMy: [
      'ဂျပန်ခုနှစ် (令和) သို့မဟုတ် အနောက်တိုင်းခုနှစ် (西暦) စံနှုန်းတစ်ခုတည်း တစ်သမတ်တည်း သုံးခြင်း',
      'ပညာအရည်အချင်းနှင့် အလုပ်အကိုင်ရာဇဝင်ကို အမှားအယွင်းမရှိ ဖြည့်သွင်းခြင်း',
    ],
    learningObjectivesEn: [
      'Format Japanese Rirekisho (履歴書) and Shokumu Keirekisho (職務経歴書) flawlessly',
      'Maintain strict consistency between Western (西暦) and Japanese era (元号) year formats',
    ],
    culturalNoteMy: 'ဂျပန်ကိုယ်ရေးရာဇဝင်တွင် ဓာတ်ပုံမှန်ကန်မှု (ဝတ်စုံပြည့်၊ ၃ လအတွင်းရိုက်) နှင့် ရက်စွဲတစ်သမတ်တည်းရှိမှုသည် အင်တာဗျူးခေါ်ယူရေးအတွက် အဓိကကျပါသည်။',
    culturalNoteEn: 'Japanese recruiters scrutinize resume neatness, formal photo standards, and date consistency.',
  },
  'l-c1-2': {
    titleMy: 'ဆွဲဆောင်မှုရှိသော လျှောက်ထားရသည့်ရည်ရွယ်ချက် (志望動機) နှင့် ကိုယ့်ကိုယ်ကို PR လုပ်နည်း',
    titleEn: 'Crafting Winning Motivation (志望動機) & Self-PR',
    learningObjectivesMy: [
      'ကျောင်းသား/ယခင်ဘဝ အားထုတ်ကြိုးပမ်းမှု (ガクチカ - Gakuchika) ဖွဲ့စည်းပုံရေးဆွဲခြင်း',
      'အခြားကုမ္ပဏီမဟုတ်ဘဲ ဤကုမ္ပဏီကို ရွေးချယ်ရသည့် ခိုင်လုံသောအကြောင်းရင်းကို တင်ပြခြင်း',
    ],
    learningObjectivesEn: [
      'Structure STAR-based Self-PR and Gakuchika (student leadership achievement)',
      'Explain "Why this specific company" with genuine business model insights',
    ],
    culturalNoteMy: '"ကုမ္ပဏီကြီးက နာမည်ကြီးလို့" ဟု ရေးခြင်းသည် ပယ်ချခံရလေ့ရှိပြီး ကုမ္ပဏီ၏ တန်ဖိုးထားမှုနှင့် မိမိအရည်အချင်း ထပ်တူကျပုံကို ရှင်းပြရပါမည်။',
    culturalNoteEn: 'Generic admiration for a company brand is rejected; connect your competencies to their business.',
  },

  // --- UNIT 16: INTERVIEW SIMULATION ---
  'l-c2-1': {
    titleMy: 'အင်တာဗျူးအခန်းတွင်း ဝင်ထွက်ခြင်း ကျင့်ဝတ်နှင့် ပထမဆုံး အထင်အမြင်',
    titleEn: 'Entering the Interview Room & Physical Etiquette',
    learningObjectivesMy: [
      'တံခါးကို ၃ ချက်ခေါက်ခြင်း၊ 失礼いたします ဟု ပြောကြားပြီး ၃၀ ဒီဂရီ ခေါင်းညိတ်အရိုအသေပြုခြင်း',
      'ခွင့်ပြုချက်ရမှ ထိုင်ခုံတွင် ထိုင်ခြင်းနှင့် မတ်မတ်ထိုင်သည့် ကိုယ်ဟန်အနေအထား',
    ],
    learningObjectivesEn: [
      'Execute the 3-knock entry rule, door closing without turning back completely, and 30-degree bow',
      'Stand beside the chair until invited to sit: 「どうぞ、おかけください」 -> 「失礼いたします」',
    ],
    culturalNoteMy: 'တံခါး ၂ ချက်ခေါက်ခြင်းသည် သန့်စင်ခန်းသုံး ခေါက်သံဟု အယူရှိသဖြင့် အင်တာဗျူးတွင် မဖြစ်မနေ ၃ ချက် ခေါက်ရပါမည်။',
    culturalNoteEn: '2 knocks is associated with checking toilet occupancy. Professional interviews strictly require 3 knocks.',
  },
  'l-c2-2': {
    titleMy: 'မကြာခဏမေးလေ့ရှိသော မေးခွန်းများအား ဖြေဆိုနည်းနှင့် မေးခွန်းပြန်မေးခြင်း (逆質問)',
    titleEn: 'Core Interview Questions & Impressive Reverse Questions',
    learningObjectivesMy: [
      'အားသာချက်၊ အားနည်းချက်နှင့် အခက်အခဲကျော်လွှားခဲ့ပုံများကို ကိန်းဂဏန်းဖြင့် ရှင်းပြခြင်း',
      'အင်တာဗျူးအဆုံးတွင် စိတ်အားထက်သန်မှုကို ပြသနိုင်သော အထင်ကြီးဖွယ် မေးခွန်းပြန်မေးနည်း (逆質問)',
    ],
    learningObjectivesEn: [
      'Answer common questions (strengths, failures, career vision) within 60–90 seconds',
      'Deliver high-value reverse questions (逆質問) demonstrating deep industry preparation',
    ],
    culturalNoteMy: '"မေးစရာမရှိပါ" ဟု ဖြေပါက စိတ်ဝင်စားမှုမရှိဟု အထင်ခံရနိုင်သဖြင့် ကုမ္ပဏီ၏ အနာဂတ်နှင့်ပတ်သက်သော မေးခွန်းကောင်း ၂ ခု ကြိုတင်ပြင်ဆင်ထားရပါမည်။',
    culturalNoteEn: 'Saying "I have no questions" suggests disinterest. Prepare 2 thoughtful questions about their vision.',
  },
};


// ----------------------------------------------------------------------------
// Comprehensive Multilingual Translation Registry for Units & Lessons
// Across all 19 supported languages:
// en, ja, my, th, zh, ko, es, fr, vi, id, tr, de, pt, nl, hi, bn, ms, ar, tl
// ----------------------------------------------------------------------------
export const BUSINESS_UNITS_MULTILINGUAL: Record<
  string,
  Partial<Record<SupportedLanguage, { title: string; description: string }>>
> = {
  'u-found-1': {
    th: { title: 'การทำงานในบริษัทญี่ปุ่นและสิ่งแวดล้อมในที่ทำงาน', description: 'ลำดับชั้นในองค์กร แผนกต่างๆ ตำแหน่งงานทั่วไป และการสื่อสารประจำวันในออฟฟิศ' },
    zh: { title: '日本企业与职场环境', description: '公司组织架构、部门职责、常见职位头衔与日常办公沟通要领。' },
    ko: { title: '일본 기업과 직장 환경', description: '회사 조직 계층, 부서, 직함 및 일상적인 사무실 업무 소통.' },
    es: { title: 'Trabajar en una empresa japonesa', description: 'Jerarquía organizacional, departamentos, títulos comunes y comunicación diaria en la oficina.' },
    fr: { title: 'Travailler dans une entreprise japonaise', description: 'Hiérarchie d\'entreprise, départements, titres de poste et communication quotidienne.' },
    vi: { title: 'Làm việc trong công ty Nhật Bản', description: 'Cơ cấu tổ chức, các phòng ban, chức danh thông dụng và giao tiếp văn phòng hàng ngày.' },
    id: { title: 'Bekerja di Perusahaan Jepang', description: 'Hierarki organisasi, departemen, jabatan umum, dan komunikasi kantor sehari-hari.' },
    de: { title: 'Arbeiten in einem japanischen Unternehmen', description: 'Organisationshierarchie, Abteilungen, Berufsbezeichnungen und Bürokommunikation.' },
    pt: { title: 'Trabalhando em uma empresa japonesa', description: 'Hierarquia organizacional, departamentos, cargos comuns e comunicação no escritório.' },
    tr: { title: 'Bir Japon Şirketinde Çalışmak', description: 'Organizasyon hiyerarşisi, departmanlar, unvanlar ve günlük ofis iletişimi.' },
  },
  'u-found-2': {
    th: { title: 'การแนะนำตัวและมารยาทการแลกนามบัตร (名刺)', description: 'การแนะนำตัวในวันเริ่มงาน พิธีสารการแลกนามบัตร และการทักทายในเชิงธุรกิจ' },
    zh: { title: '自我介绍与名片（名刺）交换礼仪', description: '入职首日自我介绍、名片交换规范与职场同行引见礼仪。' },
    ko: { title: '자기소개 및 명함(名刺) 교환 매너', description: '배치 첫날 자기소개, 명함 전달 및 수령 예절, 비즈니스 상호 인사.' },
    es: { title: 'Presentación y etiqueta de tarjetas de visita (Meishi)', description: 'Presentaciones profesionales, protocolo de tarjetas de visita y saludos comerciales.' },
    fr: { title: 'Présentation et étiquette des cartes de visite (Meishi)', description: 'Présentations professionnelles, protocole des cartes de visite et salutations.' },
    vi: { title: 'Tự giới thiệu và quy tắc trao đổi danh thiếp (Meishi)', description: 'Giới thiệu bản thân ngày đầu đi làm, nghi thức trao nhận danh thiếp chuyên nghiệp.' },
    id: { title: 'Perkenalan Diri & Etiket Kartu Nama (Meishi)', description: 'Perkenalan profesional di hari pertama, protokol kartu nama bisnis, dan sapaan kerja.' },
    de: { title: 'Selbstvorstellung & Visitenkarten-Etikette (Meishi)', description: 'Professionelle Vorstellungen, Visitenkarten-Protokoll und geschäftliche Begrüßungen.' },
    pt: { title: 'Autoapresentação e etiqueta de cartões de visita (Meishi)', description: 'Apresentações no primeiro dia, protocolo de cartões de visita e saudações profissionais.' },
    tr: { title: 'Kendini Tanıtma ve Kartvizit (Meishi) Görgü Kuralları', description: 'İlk iş gününde tanışma, kartvizit alıp verme protokolü ve selamlaşma.' },
  },
  'u-found-3': {
    th: { title: 'การขอความช่วยเหลือ การขออนุญาต และการขอโทษอย่างสุภาพ', description: 'การใช้คำช่วยลดแรงปะทะ (Cushion words) เพื่อความสุภาพ การขออนุญาต และการขอโทษอย่างจริงใจ' },
    zh: { title: '职场礼貌请求、请假许可与诚恳致歉', description: '运用缓冲词（クッション言葉）委婉请求、向上级请示许可与职业致歉规范。' },
    ko: { title: '직장 내 정중한 요청, 허가 구하기 및 사과', description: '쿠션어(クッション言葉)를 활용한 완곡한 요청, 상사 승인 요청 및 진심 어린 사과.' },
    es: { title: 'Peticiones corteses, permisos y disculpas en el trabajo', description: 'Uso de palabras de amortiguación (Cushion words), solicitud de permisos y disculpas sinceras.' },
    fr: { title: 'Demandes polies, autorisations et excuses au travail', description: 'Utilisation des mots coussins pour adoucir les requêtes, demandes d\'autorisation et excuses.' },
    vi: { title: 'Nhờ vả lịch sự, xin phép và xin lỗi nơi công sở', description: 'Sử dụng từ đệm (Cushion words) để nói giảm nói tránh, xin phép cấp trên và xin lỗi chân thành.' },
    id: { title: 'Permintaan Sopan, Izin, dan Maaf di Tempat Kerja', description: 'Menggunakan cushion words untuk melunakkan permintaan, meminta izin, dan meminta maaf.' },
    de: { title: 'Höfliche Bitten, Genehmigungen und Entschuldigungen', description: 'Verwendung von Kissenwörtern (Cushion Words) für höfliche Anfragen und Entschuldigungen.' },
    pt: { title: 'Pedidos educados, permissões e desculpas no trabalho', description: 'Uso de palavras de acolhimento (Cushion words) para suavizar pedidos e pedir desculpas.' },
    tr: { title: 'İş Yerinde Kibar İstekler, İzin ve Özür Dileme', description: 'İstekleri yumuşatmak için yastık sözcükler kullanma, izin isteme ve samimi özürler.' },
  },
  'u-found-4': {
    th: { title: 'พื้นฐานการรับสายและสนทนาโทรศัพท์สำนักงาน', description: 'การรับสายภายใน 3 สัญญาณกริ่ง การแจ้งชื่อบริษัท การขอให้รอสาย และการโอนสายอย่างสุภาพ' },
    zh: { title: '商务电话接听与应对基础', description: '响铃3声内接听、规范报出公司名称、礼貌请对方稍候与转接电话。' },
    ko: { title: '비즈니스 전화 응대 및 접수 기초', description: '3회 벨 이내 수신, 회사명 밝히기, 대기 안내 및 정중한 전화 연결.' },
    es: { title: 'Fundamentos de la atención telefónica en la oficina', description: 'Responder antes de 3 timbres, identificar la empresa, poner en espera y transferir llamadas.' },
    fr: { title: 'Bases de la réception téléphonique de bureau', description: 'Décrocher en moins de 3 sonneries, nommer l\'entreprise, faire patienter et transférer.' },
    vi: { title: 'Cơ bản nghe và nhận cuộc gọi văn phòng', description: 'Nhấc máy trong 3 hồi chuông, xưng tên công ty, đề nghị chờ máy và chuyển máy lịch sự.' },
    id: { title: 'Dasar Menerima & Menjawab Telepon Kantor', description: 'Menjawab dalam 3 dering, menyebut nama perusahaan, meminta menunggu, dan mentransfer panggilan.' },
    de: { title: 'Grundlagen des geschäftlichen Telefonierens', description: 'Melden innerhalb von 3 Klingelzeichen, Firmennamen nennen und Weiterleiten.' },
    pt: { title: 'Noções básicas de atendimento telefônico no escritório', description: 'Atender em 3 toques, identificar a empresa, pedir para aguardar e transferir.' },
    tr: { title: 'Ofis Telefonu Karşılama Temelleri', description: '3 çalışta açma, şirket adını belirtme, bekletme ve kibarca aktarma.' },
  },
  'u-found-5': {
    th: { title: 'พื้นฐานและโครงสร้างการเขียนอีเมลธุรกิจ', description: 'องค์ประกอบ 7 ส่วนมาตรฐานของอีเมลธุรกิจญี่ปุ่น: หัวข้อ ผู้รับ คำทักทาย เนื้อหา คำขอร้อง บทสรุป และลายเซ็น' },
    zh: { title: '商务邮件撰写基础与标准格式', description: '日式标准商务邮件7大要素：主题行、收件人、问候语、正文要义、请求事项、结语与企业签名。' },
    ko: { title: '비즈니스 이메일 작성 기본 및 7대 구성', description: '일본 표준 7단계 이메일 공식: 제목, 수신인, 첫인사, 본문 맥락, 요청, 맺음말, 서명.' },
    es: { title: 'Estructura y redacción de correos de negocios', description: 'Fórmula estándar de 7 partes: Asunto, Destinatario, Saludo, Contexto, Petición, Cierre y Firma.' },
    fr: { title: 'Structure et bases de l\'e-mail professionnel', description: 'Formule en 7 points : Objet, Destinataire, Formule de politesse, Contexte, Demande, Conclusion et Signature.' },
    vi: { title: 'Quy chuẩn và cấu trúc viết email thương mại', description: '7 phần tiêu chuẩn của email thương mại Nhật Bản: Tiêu đề, Người nhận, Lời chào, Nội dung, Yêu cầu, Kết thư và Chữ ký.' },
    id: { title: 'Struktur dan Dasar Penulisan Email Bisnis', description: '7 bagian standar email bisnis Jepang: Subjek, Penerima, Salam, Konteks, Permintaan, Penutup, dan Tanda Tangan.' },
    de: { title: 'Aufbau und Grundlagen geschäftlicher E-Mails', description: 'Standardaufbau in 7 Schritten: Betreff, Empfänger, Anrede, Kontext, Bitte, Grußformel und Signatur.' },
    pt: { title: 'Estrutura e redação de e-mails de negócios', description: 'Fórmula em 7 partes: Assunto, Destinatário, Saudação, Contexto, Pedido, Encerramento e Assinatura.' },
    tr: { title: 'İş E-postası Temelleri ve Yapısı', description: '7 standart bölüm: Konu, Alıcı, Selamlama, Bağlam, İstek, Kapanış ve İmza.' },
  },
  'u-inter-1': {
    th: { title: 'การฝึกฝนเคโกะอย่างเป็นระบบ', description: 'กฎมุมมองของผู้พูด การผันกริยาพิเศษ การหลีกเลี่ยงเคโกะซ้ำซ้อน (二重敬語) และแบบฝึกหัด' },
    zh: { title: '系统精通商务敬语（尊他语与自谦语）', description: '深度解析主体视角法则、特殊动词变形、规避二重敬语（二重敬語）误区与实战对比。' },
    ko: { title: '체계적인 비즈니스 경어 완벽 마스터', description: '화자 시점 규칙, 불규칙 동사 변형, 이중 경어(二重敬語) 방지법 및 혼동 연습.' },
    es: { title: 'Dominio sistemático del Keigo (honorífico)', description: 'Reglas de perspectiva, verbos irregulares, evitar el doble keigo y ejercicios prácticos.' },
    fr: { title: 'Maîtrise systématique du Keigo (langage honorifique)', description: 'Règles de perspective, verbes irréguliers, élimination du double keigo et exercices.' },
    vi: { title: 'Nắm vững hệ thống kính ngữ Keigo chuyên nghiệp', description: 'Quy tắc góc nhìn người nói, biến đổi động từ bất quy tắc và tránh lỗi kính ngữ kép (二重敬語).' },
    id: { title: 'Penguasaan Sistematis Bahasa Sopan Keigo', description: 'Aturan sudut pandang, perubahan verba tidak beraturan, dan menghindari double keigo.' },
    de: { title: 'Systematische Beherrschung von Keigo (Höflichkeitssprache)', description: 'Perspektivregeln, unregelmäßige Verben und Vermeidung von doppeltem Keigo.' },
    pt: { title: 'Domínio sistemático de Keigo (linguagem respeitosa)', description: 'Regras de perspectiva, verbos irregulares e como evitar keigo duplo.' },
    tr: { title: 'Sistematik Keigo (Saygı Dili) Hakimiyeti', description: 'Konuşmacı kuralları, düzensiz fiiller ve ikili keigo hatalarından kaçınma.' },
  },
  'u-inter-2': {
    th: { title: 'การใช้โฮเรนโซ (รายงาน-ติดต่อ-ปรึกษา) ในการทำงานจริง', description: 'กฎทองของที่ทำงานญี่ปุ่น: การรายงานความคืบหน้าตรงเวลา การแจ้งเหตุล่าช้าล่วงหน้า และการขอคำปรึกษาจากหัวหน้า' },
    zh: { title: '职场报联相（Hou-Ren-Sou）实战精通', description: '日企职场黄金铁律：及时推进度汇报、提前预警延误预兆并向上级主动请教对策。' },
    ko: { title: '호렌소 (보고·연락·상담) 실전 완벽 마스터', description: '일본 직장의 황금률: 시의적절한 진척 보고, 지연 사전 경고 및 상사 상담 기술.' },
    es: { title: 'Dominio de Hou-Ren-Sou (Informar, Comunicar, Consultar)', description: 'La regla de oro del trabajo japonés: reportes de progreso puntuales, alertas de retrasos y consultas a superiores.' },
    fr: { title: 'Pratique experte du Hou-Ren-Sou (Rapporter, Informer, Consulter)', description: 'La règle d\'or en entreprise japonaise : rapports d\'étape, alertes de retard et conseils hiérarchiques.' },
    vi: { title: 'Thực hành thành thạo quy tắc vàng Hou-Ren-Sou', description: 'Quy tắc vàng nơi công sở Nhật: Báo cáo tiến độ kịp thời, thông báo chậm trễ từ sớm và xin ý kiến cấp trên.' },
    id: { title: 'Menguasai Hou-Ren-Sou (Lapor, Hubungi, Konsultasi)', description: 'Aturan emas tempat kerja Jepang: laporan kemajuan tepat waktu, peringatan keterlambatan, dan konsultasi.' },
    de: { title: 'Beherrschung von Hou-Ren-Sou (Berichten, Informieren, Beraten)', description: 'Die goldene Regel japanischer Unternehmen: Fortschrittsberichte, Verzögerungswarnungen und Beratung.' },
    pt: { title: 'Dominando o Hou-Ren-Sou (Reportar, Comunicar, Consultar)', description: 'A regra de ouro do ambiente japonês: relatórios pontuais, avisos de atraso e consultas aos superiores.' },
    tr: { title: 'Hou-Ren-Sou (Rapor, İletişim, Danışma) Uygulaması', description: 'Japon çalışma kültürünün altın kuralı: zamanında raporlama, gecikme bildirimleri ve danışma.' },
  },
  'u-inter-3': {
    th: { title: 'การเขียนอีเมลธุรกิจเชิงปฏิบัติ', description: 'การนัดหมาย การแนบเอกสารสำคัญ การส่งจดหมายขอบคุณหลังการประชุม และการเตือนความจำอย่างสุภาพ' },
    zh: { title: '实用商务邮件写作进阶', description: '商务日程预约、机密附件发送、会后感谢函与委婉催促提醒邮件撰写。' },
    ko: { title: '실무 비즈니스 이메일 작성', description: '미팅 일정 조율, 비밀 문서 첨부 발송, 회의 후 감사 인사 및 정중한 독촉 메일.' },
    es: { title: 'Redacción práctica de correos electrónicos de negocios', description: 'Coordinar citas, adjuntar documentos confidenciales, notas de agradecimiento y recordatorios corteses.' },
    fr: { title: 'Rédaction pratique d\'e-mails d\'affaires', description: 'Planification de rendez-vous, pièces jointes confidentielles, remerciements et relances polies.' },
    vi: { title: 'Thực hành viết email thương mại ứng dụng', description: 'Sắp xếp lịch hẹn, đính kèm tài liệu bảo mật, thư cảm ơn sau cuộc họp và nhắc việc khéo léo.' },
    id: { title: 'Praktik Menulis Email Bisnis', description: 'Menjadwalkan pertemuan, melampirkan dokumen penting, ucapan terima kasih, dan pengingat sopan.' },
    de: { title: 'Praxisorientierte geschäftliche E-Mail-Korrespondenz', description: 'Terminvereinbarungen, vertrauliche Anhänge, Dankschreiben nach Besprechungen und Erinnerungen.' },
    pt: { title: 'Redação prática de e-mails corporativos', description: 'Agendamento de reuniões, anexos confidenciais, agradecimentos pós-reunião e lembretes polidos.' },
    tr: { title: 'Uygulamalı İş E-postası Yazımı', description: 'Randevu ayarlama, gizli belge ekleme, toplantı sonrası teşekkür ve kibar hatırlatmalar.' },
  },
  'u-inter-4': {
    th: { title: 'การเข้าร่วมการประชุมธุรกิจญี่ปุ่น', description: 'การทำความเข้าใจวาระการประชุม การแสดงความเห็นชอบและความเห็นต่างอย่างสุภาพ และการสรุปสิ่งที่ต้องปฏิบัติ' },
    zh: { title: '参与日企商务会议与讨论', description: '把握会议议程、礼貌表达赞同与委婉异议、精准澄清疑问并归纳行动项。' },
    ko: { title: '일본 비즈니스 회의 참여 및 토론', description: '회의 안건 이해, 정중한 동의 및 이견 표명, 발언 재확인 및 실행 과제 요약.' },
    es: { title: 'Participación en reuniones de negocios japonesas', description: 'Comprensión de agendas, expresar acuerdo y desacuerdo cortés, clarificar y resumir tareas.' },
    fr: { title: 'Participation aux réunions d\'affaires japonaises', description: 'Compréhension de l\'ordre du jour, expression polie du désaccord, clarification et synthèses d\'actions.' },
    vi: { title: 'Tham gia các cuộc họp kinh doanh Nhật Bản', description: 'Nắm rõ nghị trình họp, bày tỏ đồng thuận và bất đồng lịch sự, tóm tắt các hạng mục công việc cần làm.' },
    id: { title: 'Berpartisipasi dalam Rapat Bisnis Jepang', description: 'Memahami agenda rapat, menyatakan persetujuan dan ketidaksetujuan secara sopan, serta merangkum aksi.' },
    de: { title: 'Teilnahme an japanischen Geschäftsbesprechungen', description: 'Verständnis der Agenda, höfliche Meinungsverschiedenheiten und Zusammenfassen von Aufgaben.' },
    pt: { title: 'Participação em reuniões de negócios japonesas', description: 'Compreensão de pautas, concordância e discordância respeitosa, e resumo de ações.' },
    tr: { title: 'Japon İş Toplantılarına Katılım', description: 'Toplantı gündemini anlama, kibarca fikir ayrılığı belirtme ve aksiyonları özetleme.' },
  },
  'u-inter-5': {
    th: { title: 'มารยาทองค์กรและลำดับที่นั่ง (席次)', description: 'กฎของที่นั่งเกียรติยศ (Kamiza) และที่นั่งผู้น้อย (Shimoza) ในห้องประชุม รถยนต์ รถแท็กซี่ และลิฟต์' },
    zh: { title: '商务礼仪与座位顺位规则（席次）', description: '会议室、公务车、出租车与电梯内上座（上座）与下座（下座）严谨座次礼节。' },
    ko: { title: '비즈니스 매너와 좌석 배치 규칙 (석차)', description: '회의실, 회사 차량, 택시, 엘리베이터 내 상석(上座)과 말석(下座)의 필수 원칙.' },
    es: { title: 'Etiqueta corporativa y asignación de asientos (Sekiji)', description: 'Reglas de Kamiza (asiento de honor) y Shimoza en salas de reuniones, taxis y elevadores.' },
    fr: { title: 'Protocole d\'entreprise et plan de table (Sekiji)', description: 'Règles du Kamiza (place d\'honneur) et Shimoza en salle de réunion, taxi et ascenseur.' },
    vi: { title: 'Quy tắc ứng xử và thứ tự chỗ ngồi trong doanh nghiệp (Sekiji)', description: 'Quy tắc chỗ ngồi danh dự (Kamiza) và chỗ ngồi cấp dưới (Shimoza) trong phòng họp, xe hơi và thang máy.' },
    id: { title: 'Etiket Korporat dan Aturan Tempat Duduk (Sekiji)', description: 'Aturan Kamiza (kursi kehormatan) dan Shimoza di ruang rapat, mobil perusahaan, taksi, dan lift.' },
    de: { title: 'Unternehmensetikette und Sitzordnung (Sekiji)', description: 'Regeln für Kamiza (Ehrensitz) und Shimoza in Besprechungsräumen, Taxis und Aufzügen.' },
    pt: { title: 'Etiqueta corporativa e ordem de assentos (Sekiji)', description: 'Regras de Kamiza (assento de honra) e Shimoza em salas de reunião, táxis e elevadores.' },
    tr: { title: 'Kurumsal Görgü ve Oturma Düzeni (Sekiji)', description: 'Toplantı odaları, taksiler ve asansörlerde Kamiza (onur koltuğu) ve Shimoza kuralları.' },
  },
  'u-upper-1': {
    th: { title: 'การนำเสนอธุรกิจและข้อเสนอที่โน้มน้าวใจ', description: 'การเปิดตัวอย่างน่าสนใจ การนำเสนอปัญหา การอธิบายกราฟข้อมูลตลาด และการตอบคำถามภายใต้ความกดดัน' },
    zh: { title: '商务提案汇报与说服性企划陈述', description: '高吸引力开场破冰、精准陈述问题痛点、专业解读市场数据图表与高压答辩技巧。' },
    ko: { title: '비즈니스 프레젠테이션 및 설득 제안', description: '주목을 끄는 도입부, 문제 정의, 시장 데이터 및 차트 설명, 질의응답 대응력.' },
    es: { title: 'Presentaciones de negocios y propuestas persuasivas', description: 'Aperturas atractivas, planteamiento de problemas, explicación de gráficos y manejo de preguntas y respuestas.' },
    fr: { title: 'Présentations d\'affaires et propositions convaincantes', description: 'Accroches percutantes, formulation de problématiques, analyse de données et gestion des questions.' },
    vi: { title: 'Thuyết trình thương mại và đề xuất thuyết phục', description: 'Mở đầu thu hút, phân tích vấn đề cốt lõi, diễn giải số liệu biểu đồ và làm chủ phần hỏi đáp.' },
    id: { title: 'Presentasi Bisnis & Proposal Persuasif', description: 'Pembuka menarik, penjelasan masalah, analisis grafik pasar, dan penanganan tanya jawab.' },
    de: { title: 'Geschäftspräsentationen und überzeugende Vorschläge', description: 'Einstiege, Problemstellungen, Erläuterung von Marktdaten und souveräne Fragerunden.' },
    pt: { title: 'Apresentações comerciais e propostas persuasivas', description: 'Aberturas impactantes, declaração de problemas, gráficos de mercado e perguntas e respostas.' },
    tr: { title: 'İş Sunumları ve İkna Edici Teklifler', description: 'Dikkat çekici girişler, sorun tespiti, pazar grafiklerini açıklama ve soru-cevap yönetimi.' },
  },
  'u-upper-2': {
    th: { title: 'การเจรจาการค้าและข้อตกลงเงื่อนไขราคา', description: 'การยื่นข้อเสนอทดแทน การตกลงแบบมีเงื่อนไข การปกป้องผลกำไรอย่างสุภาพ และการบรรลุข้อตกลงแบบ Win-Win' },
    zh: { title: '商务谈判与价格条款妥协磋商', description: '提出替代方案、附带条件的妥协答应、礼貌捍卫商业利润空间与达成双赢共识。' },
    ko: { title: '상업 협상 및 조건·가격 절충 기술', description: '대안 제시, 조건부 합의, 정중한 이윤 방어 및 윈윈(Win-Win) 합의 도출.' },
    es: { title: 'Negociaciones comerciales y compromiso de términos', description: 'Hacer contrapropuestas, acuerdos condicionales, defensa cortés de márgenes y consenso ganar-ganar.' },
    fr: { title: 'Négociations commerciales et compromis', description: 'Contre-propositions, accords sous conditions, défense polie des marges et consensus gagnant-gagnant.' },
    vi: { title: 'Đàm phán thương mại và kỹ năng thỏa thuận điều khoản', description: 'Đưa ra phương án thay thế, đồng thuận có điều kiện, bảo vệ biên lợi nhuận và đạt thỏa thuận đôi bên cùng có lợi.' },
    id: { title: 'Negosiasi Komersial & Kesepakatan Syarat Harga', description: 'Membuat proposal balasan, persetujuan bersyarat, menjaga margin laba, dan konsensus win-win.' },
    de: { title: 'Geschäftsverhandlungen und Konditionskompromisse', description: 'Gegenvorschläge, bedingte Einigungen, höfliche Margenverteidigung und Win-Win-Lösungen.' },
    pt: { title: 'Negociações comerciais e compromissos de termos', description: 'Contrapropostas, acordos condicionais, defesa de margens e consenso ganha-ganha.' },
    tr: { title: 'Ticari Müzakereler ve Şartlarda Uzlaşma', description: 'Karşı teklifler, koşullu anlaşmalar, kar marjını koruma ve kazan-kazan uzlaşısı.' },
  },
  'u-upper-3': {
    th: { title: 'การรับมือข้อร้องเรียนและการแก้ไขวิกฤต', description: 'การแสดงความเข้าอกเข้าใจในเบื้องต้น การรับฟังโดยไม่แทรก การหาสาเหตุที่แท้จริง และการวางมาตรการป้องกัน' },
    zh: { title: '客户投诉应对与危机善后化解', description: '首要共情倾听、全程耐心不打断、查明客观事实起因、制定补救对策并落实防再次发生机制。' },
    ko: { title: '고객 클레임 대응 및 문제 해결', description: '초기 공감 표현, 경청, 객관적 원인 규명, 재발 방지 대책 수립.' },
    es: { title: 'Reclamaciones de clientes y resolución de crisis', description: 'Empatía inicial, escuchar sin interrumpir, determinar causas y prevenir recurrencias.' },
    fr: { title: 'Réclamations clients et résolution de crise', description: 'Empathie initiale, écoute active sans interruption, recherche des causes et prévention.' },
    vi: { title: 'Xử lý khiếu nại khách hàng và giải quyết khủng hoảng', description: 'Thấu hiểu ngay từ đầu, lắng nghe không ngắt lời, làm rõ nguyên nhân và phòng ngừa tái diễn.' },
    id: { title: 'Keluhan Pelanggan & Penyelesaian Krisis', description: 'Empati awal, mendengarkan tanpa memotong, mencari akar masalah, dan pencegahan berulang.' },
    de: { title: 'Kundenreklamationen und Krisenbewältigung', description: 'Empathie bei der ersten Reaktion, aktives Zuhören, Ursachenermittlung und Fehlervermeidung.' },
    pt: { title: 'Reclamações de clientes e resolução de crises', description: 'Empatia inicial, escuta ativa, determinação de causas e prevenção de reincidências.' },
    tr: { title: 'Müşteri Şikayetleri ve Kriz Çözümü', description: 'İlk temasta empati, söz kesmeden dinleme, kök neden analizi ve tekrarları önleme.' },
  },
  'u-prof-1': {
    th: { title: 'การจัดการผู้มีส่วนได้ส่วนเสียระดับผู้บริหารและวัฒนธรรมเนะมะวะชิ (Nemawashi)', description: 'การตัดสินใจบนพื้นฐานฉันทามติ การปรับจูนนอกรอบก่อนการประชุม (Nemawashi) และกระบวนการขออนุมัติแบบริงกิ (Ringi)' },
    zh: { title: '高管利益相关方沟通与根回（Nemawashi）文化', description: '理解共识驱动型决策、非正式会前私下对齐（根回し）与凛议书（稟議）审批闭环。' },
    ko: { title: '임원 이해관계자 관리 및 네마와시(사전 정지) 문화', description: '합의 기반 의사결정 이해, 공식 회의 전 사전 의견 조율(根回し) 및 품의서(稟議) 승인 프로세스.' },
    es: { title: 'Gestión de partes interesadas ejecutivas y cultura Nemawashi', description: 'Toma de decisiones por consenso, alineación previa informal (Nemawashi) y proceso de aprobación Ringi.' },
    fr: { title: 'Gestion des parties prenantes exécutives et culture Nemawashi', description: 'Prise de décision par consensus, alignement informel préalable (Nemawashi) et processus Ringi.' },
    vi: { title: 'Quản trị các bên liên quan cấp điều hành và văn hóa Nemawashi', description: 'Hiểu cơ chế ra quyết định đồng thuận, trao đổi ngầm trước cuộc họp (Nemawashi) và quy trình phê duyệt Ringi.' },
    id: { title: 'Manajemen Pemangku Kepentingan Eksekutif & Budaya Nemawashi', description: 'Pengambilan keputusan berbasis konsensus, penyelarasan informal sebelumnya, dan persetujuan Ringi.' },
    de: { title: 'Management von Führungskräften und Nemawashi-Kultur', description: 'Konsensentscheidungen, informelle Vorabstimmung (Nemawashi) und der Ringi-Genehmigungsprozess.' },
    pt: { title: 'Gestão de executivos e cultura Nemawashi', description: 'Tomada de decisão por consenso, alinhamento prévio informal (Nemawashi) e processo Ringi.' },
    tr: { title: 'Üst Düzey Paydaş Yönetimi ve Nemawashi Kültürü', description: 'Konsensüs odaklı karar alma, gayriresmi ön uzlaşma (Nemawashi) ve Ringi onay süreci.' },
  },
  'u-career-1': {
    th: { title: 'เรซูเม่ญี่ปุ่น (履歴書) และ Entry Sheet (ES)', description: 'การเขียนเอกสารสมัครงานอย่างเป็นทางการ ประวัติการศึกษาและการทำงาน การเขียน Self-PR และแรงจูงใจในการสมัคร' },
    zh: { title: '日式简历（履历书）与Entry Sheet（ES）撰写', description: '规范书写求职申请文书、教育与职历排版、提炼高说服力自我PR与志望动机。' },
    ko: { title: '일본 이력서(履歴書) 및 엔트리 시트(ES) 작성법', description: '정규 입사 지원서 작성, 학력 및 경력 기술, 강력한 자기 PR 및 지원 동기 작성.' },
    es: { title: 'Currículum japonés (Rirekisho) y Entry Sheet (ES)', description: 'Redacción de documentos formales de solicitud, historial académico y laboral, y redacción de auto-PR.' },
    fr: { title: 'CV japonais (Rirekisho) et Entry Sheet (ES)', description: 'Rédaction de documents formels de candidature, parcours scolaire et professionnel, et auto-promotion (PR).' },
    vi: { title: 'Cách viết sơ yếu lý lịch Nhật (Rirekisho) và Entry Sheet (ES)', description: 'Viết hồ sơ ứng tuyển chính thức, trình bày học vấn và kinh nghiệm, viết bài PR bản thân và lý do ứng tuyển.' },
    id: { title: 'Resume Jepang (Rirekisho) & Entry Sheet (ES)', description: 'Menulis dokumen lamaran resmi, menyusun riwayat pendidikan/kerja, dan membuat Self-PR yang memikat.' },
    de: { title: 'Japanischer Lebenslauf (Rirekisho) und Entry Sheet (ES)', description: 'Verfassen formeller Bewerbungsunterlagen, Bildungs- und Werdegangsgestaltung und Selbst-PR.' },
    pt: { title: 'Currículo japonês (Rirekisho) e Entry Sheet (ES)', description: 'Elaboração de documentos formais de candidatura, histórico escolar e profissional, e auto-PR.' },
    tr: { title: 'Japon Özgeçmişi (Rirekisho) ve Entry Sheet (ES)', description: 'Resmi başvuru belgeleri hazırlama, eğitim/iş geçmişi formatı ve etkili kendini tanıtma (PR).' },
  },
  'u-career-2': {
    th: { title: 'มารยาทการสัมภาษณ์งานและการจำลองสถานการณ์จริง', description: 'มารยาทในการเข้า-ออกจากห้องสัมภาษณ์ (เคาะประตู 3 ครั้ง, 失礼いたします) คำถามสัมภาษณ์หลัก และการถามคำถามกลับ (逆質問)' },
    zh: { title: '求职面试礼仪与实战演练模拟', description: '面试进退场礼节（敲门3声、失礼いたします口令）、高频面试题答辩与高质量反问面试官（逆質問）技巧。' },
    ko: { title: '면접 매너 및 실전 시뮬레이션', description: '입퇴실 매너(노크 3회, 실례하겠습니다), 핵심 면접 질문, 돌발 질문 대응 및 역질문(逆質問) 기법.' },
    es: { title: 'Etiqueta de entrevistas de trabajo y simulación', description: 'Protocolo de entrada/salida (tocar 3 veces, 失礼いたします), preguntas clave y preguntas inversas (Gyakushitsumon).' },
    fr: { title: 'Étiquette d\'entretien d\'embauche et simulation', description: 'Protocole d\'entrée/sortie (frapper 3 fois, 失礼いたします), questions types et contre-questions (Gyakushitsumon).' },
    vi: { title: 'Quy tắc phỏng vấn xin việc và mô phỏng thực tế', description: 'Nghi thức ra vào phòng (gõ cửa 3 lần, 失礼いたします), các câu hỏi phỏng vấn trọng tâm và kỹ năng hỏi ngược lại nhà tuyển dụng (逆質問).' },
    id: { title: 'Etiket Wawancara Kerja & Simulasi', description: 'Protokol keluar-masuk ruangan (mengetuk 3 kali, 失礼いたします), pertanyaan inti wawancara, dan tanya balik (逆質問).' },
    de: { title: 'Etikette beim Vorstellungsgespräch & Simulation', description: 'Protokoll beim Betreten des Raumes (3-mal klopfen), Kernfragen und Gegenfragen (Gyakushitsumon).' },
    pt: { title: 'Etiqueta de entrevistas de emprego e simulação', description: 'Protocolo de entrada e saída (bater 3 vezes), perguntas essenciais e contra-perguntas.' },
    tr: { title: 'İş Mülakatı Görgü Kuralları ve Simülasyon', description: 'Odaya giriş protokolü (3 kez kapı çalma), temel mülakat soruları ve karşı sorular (Gyakushitsumon).' },
  },
};

// ----------------------------------------------------------------------------
// Multilingual Registry for Lessons Across Top Global Languages
// ----------------------------------------------------------------------------
export const BUSINESS_LESSONS_MULTILINGUAL: Record<
  string,
  Partial<
    Record<
      SupportedLanguage,
      {
        title: string;
        culturalNote?: string;
        scenarioOverview?: string;
        officeContext?: string;
      }
    >
  >
> = {
  'l-f1-1': {
    th: {
      title: 'โครงสร้างองค์กร แผนก และตำแหน่งงานในบริษัทญี่ปุ่น',
      culturalNote: 'เมื่อพูดกับคนภายนอก ห้ามเติมคำว่า "ซัง" (San) ให้กับบุคคลภายในบริษัทเดียวกัน แม้แต่ประธานบริษัทก็ตาม',
      scenarioOverview: 'เรียนรู้โครงสร้างบริษัทญี่ปุ่น ลำดับขั้นของตำแหน่งงาน และวิธีการเรียกชื่ออย่างถูกต้องทั้งภายในและภายนอกบริษัท',
      officeContext: 'บรรยากาศสำนักงานทั่วไปในโตเกียว: การประชุมแนะนำพนักงานใหม่และผังองค์กร',
    },
    zh: {
      title: '日企组织架构、部门职责与职务头衔称谓',
      culturalNote: '向公司外部人员提及自家公司社长或上司时，严禁使用“さん”（San）或敬称，必须直呼其姓或职务。',
      scenarioOverview: '掌握日企组织架构、常见岗位头衔层级，以及内外有别的职业称谓规则。',
      officeContext: '东京典型日企办公区：新人入职培训与组织结构说明。',
    },
    ko: {
      title: '일본 기업의 조직도, 부서 및 직함 호칭법',
      culturalNote: '외부인에게 자사 직원을 말할 때는 사장님이라도 "님"이나 "상"을 붙이지 않고 낮추어 말해야 합니다.',
      scenarioOverview: '일본 기업의 조직 계층, 직위별 직함 및 사내외 호칭 매너를 배웁니다.',
      officeContext: '도쿄 사옥 사무실: 신입 사원 직무 오리엔테이션 현장.',
    },
    es: {
      title: 'Jerarquía corporativa japonesa, departamentos y títulos',
      culturalNote: 'Al hablar con personas externas a la empresa, nunca añada "san" a los miembros de su propia empresa, ni siquiera al presidente.',
      scenarioOverview: 'Aprenda la jerarquía organizacional, los títulos comunes y cómo dirigirse a colegas interna y externamente.',
      officeContext: 'Oficina corporativa en Tokio: orientación para nuevos empleados.',
    },
    fr: {
      title: 'Hiérarchie d\'entreprise japonaise, départements et titres',
      culturalNote: 'Lorsque vous parlez à un client externe, n\'ajoutez jamais "-san" aux membres de votre propre entreprise, même le PDG.',
      scenarioOverview: 'Maîtrisez la structure d\'entreprise, les titres de poste et les règles de dénomination professionnelle.',
      officeContext: 'Bureau d\'entreprise à Tokyo : séance d\'orientation des nouvelles recrues.',
    },
    vi: {
      title: 'Cơ cấu tổ chức công ty, các phòng ban và chức danh',
      culturalNote: 'Khi giao tiếp với người ngoài công ty, tuyệt đối không thêm kính ngữ "San" cho bất kỳ ai thuộc công ty mình, kể cả Giám đốc.',
      scenarioOverview: 'Học cơ cấu tổ chức, các cấp bậc chức vụ và cách xưng hô chuẩn mực trong ngoài công ty.',
      officeContext: 'Văn phòng công ty tại Tokyo: Buổi định hướng nhân viên mới.',
    },
    id: {
      title: 'Hierarki Perusahaan Jepang, Departemen & Jabatan',
      culturalNote: 'Saat berbicara dengan pihak luar, jangan pernah menambahkan "san" pada anggota perusahaan sendiri, termasuk direktur utama.',
      scenarioOverview: 'Pelajari struktur hierarki, jabatan umum, dan aturan penyebutan internal vs eksternal.',
      officeContext: 'Kantor pusat Tokyo: sesi orientasi karyawan baru.',
    },
    de: {
      title: 'Japanische Unternehmenshierarchie, Abteilungen und Titel',
      culturalNote: 'Wenn Sie mit Externen sprechen, hängen Sie niemals "-san" an Mitglieder der eigenen Firma an, auch nicht an den Geschäftsführer.',
      scenarioOverview: 'Lernen Sie die Organisationshierarchie, Funktionsbezeichnungen und Anrederegeln.',
      officeContext: 'Unternehmenszentrale in Tokio: Einführung neuer Mitarbeiter.',
    },
  },
  'l-f1-2': {
    th: {
      title: 'คำทักทายประจำวันในออฟฟิศและการสื่อสารกับเพื่อนร่วมงาน',
      culturalNote: 'คำว่า "โอทสึคาเระซามะเดส" คือกาวประสานความสัมพันธ์ในที่ทำงานญี่ปุ่น ใช้ทักทายเมื่อพบกัน เลิกงาน หรือผ่านกันตามทางเดิน',
      scenarioOverview: 'ฝึกฝนคำทักทายสำคัญในที่ทำงาน: การมาถึงที่ทำงาน การออกไปข้างนอก การกลับมา และการเลิกงานกลับบ้าน',
    },
    zh: {
      title: '办公室日常职业问候与同行寒暄要领',
      culturalNote: '“お疲れ様です”（辛苦了）是日企职场润滑剂，无论是走廊碰面、发邮件还是下班告别，都必须熟练使用。',
      scenarioOverview: '精通上班早安问候、外出公干离席、办毕返回公司及下班离岗的核心用语。',
    },
    ko: {
      title: '사무실 일상 비즈니스 인사 및 동료 커뮤니케이션',
      culturalNote: '"오츠카레사마데스(수고하셨습니다)"는 일본 직장 소통의 기본이자 필수적인 윤활유입니다.',
      scenarioOverview: '출근 인사, 외출 보고, 복귀 인사 및 퇴근 시 정중한 인사말을 학습합니다.',
    },
    es: {
      title: 'Saludos diarios en la oficina y comunicación entre compañeros',
      culturalNote: '"Otsukaresama desu" es el lubricante social del trabajo japonés; úselo al cruzarse, por correo o al salir.',
      scenarioOverview: 'Domine los saludos diarios clave: llegada por la mañana, salida temporal, regreso y despedida.',
    },
    fr: {
      title: 'Salutations professionnelles quotidiennes et échanges au bureau',
      culturalNote: '"Otsukaresama desu" est indispensable dans l\'univers professionnel japonais ; utilisez-le en toutes circonstances.',
      scenarioOverview: 'Apprenez les salutations indispensables : arrivée le matin, départ en mission, retour au bureau et fin de journée.',
    },
    vi: {
      title: 'Chào hỏi văn phòng hàng ngày và giao tiếp cùng đồng nghiệp',
      culturalNote: '"Otsukaresama desu" là câu nói cửa miệng không thể thiếu nơi công sở Nhật, thể hiện sự ghi nhận và tôn trọng đồng nghiệp.',
      scenarioOverview: 'Thực hành các mẫu câu chào hỏi chuẩn: Khi đến công ty, khi ra ngoài làm việc, khi quay về và khi ra về.',
    },
    id: {
      title: 'Salam Kantor Sehari-hari & Komunikasi Rekan Kerja',
      culturalNote: '"Otsukaresama desu" adalah perekat sosial tempat kerja Jepang; ucapkan saat berpapasan, di email, atau saat pulang.',
      scenarioOverview: 'Kuasai salam penting: tiba di kantor, izin keluar dinas, kembali ke kantor, dan pamit pulang.',
    },
  },
  'l-f2-1': {
    th: {
      title: 'การแนะนำตัวอย่างมืออาชีพในวันแรกที่เข้าทำงาน (自己紹介)',
      culturalNote: 'ยืนตัวตรง สบตา โค้งคำนับ 30 องศา และกล่าวชื่อให้ชัดเจนพร้อมความมุ่งมั่นในการเรียนรู้',
      scenarioOverview: 'การกล่าวแนะนำตัวอย่างมั่นใจต่อหน้าเพื่อนร่วมงานและหัวหน้าในวันเริ่มปฏิบัติงาน',
    },
    zh: {
      title: '入职首日职业自我介绍（自己紹介）与致辞',
      culturalNote: '身姿挺拔、目光真诚、鞠躬30度，吐字清晰地表达姓名背景及谦虚努力的决心。',
      scenarioOverview: '学习在新部门全体同事面前清晰、自信且谦逊得体地做入职自我介绍。',
    },
    ko: {
      title: '배치 첫날 프로페셔널 자기소개(自己紹介) 및 각오',
      culturalNote: '바른 자세와 진심 어린 눈맞춤, 30도 정중한 인사와 함께 겸손하면서도 적극적인 포부를 전합니다.',
      scenarioOverview: '새로운 팀과 부서 동료들 앞에서 신뢰감을 주는 첫인상과 자기소개 스피치를 연습합니다.',
    },
    es: {
      title: 'Presentación profesional en el primer día de trabajo (Jikoshoukai)',
      culturalNote: 'Mantenga una postura erguida, contacto visual sincero, inclinación de 30 grados y exprese entusiasmo por aprender.',
      scenarioOverview: 'Aprenda a realizar una auto-presentación impactante, humilde y profesional ante su nuevo equipo.',
    },
    vi: {
      title: 'Tự giới thiệu bản thân chuyên nghiệp trong ngày đầu nhận việc (Jikoshoukai)',
      culturalNote: 'Tư thế đứng thẳng, ánh mắt chân thành, cúi chào 30 độ và thể hiện quyết tâm nỗ lực cống hiến cho công ty.',
      scenarioOverview: 'Thực hành bài phát biểu tự giới thiệu tự tin, lịch sự và truyền cảm hứng trước toàn thể phòng ban mới.',
    },
  },
  'l-f2-2': {
    th: {
      title: 'มารยาทการแลกนามบัตรธุรกิจ (名刺交換)',
      culturalNote: 'ถือด้วยสองมือ ห้ามวางนิ้วทับตัวหนังสือหรือโลโก้ของอีกฝ่าย และวางไว้บนกล่องนามบัตรอย่างประณีต',
      scenarioOverview: 'ขั้นตอนการแลกเปลี่ยนนามบัตรอย่างถูกต้องตามมารยาทธุรกิจชั้นสูงของญี่ปุ่น',
    },
    zh: {
      title: '商务名片交换礼仪与规范流程（名刺交換）',
      culturalNote: '双手递接名片，手指切勿遮挡对方姓名或公司标志，入座后须将对方名片工整摆放于名片盒上方。',
      scenarioOverview: '全流程掌握商务名片递交、接收、复诵确认及会议期间的摆放规矩。',
    },
    ko: {
      title: '비즈니스 명함 교환 예절 및 표준 절차 (名刺交換)',
      culturalNote: '반드시 양손으로 주고받으며, 상대방의 성명이나 로고를 손가락으로 가리지 않도록 주의합니다.',
      scenarioOverview: '명함 건네기, 받기, 성명 재확인 및 회의 중 명함 정렬 매너를 완벽히 습득합니다.',
    },
    es: {
      title: 'Etiqueta en el intercambio de tarjetas de visita (Meishi Koukan)',
      culturalNote: 'Sosténgala siempre con ambas manos, nunca tape el nombre o logotipo con los dedos y colóquela sobre su tarjetero.',
      scenarioOverview: 'Protocolo completo para entregar, recibir y colocar las tarjetas de visita durante las reuniones.',
    },
    vi: {
      title: 'Quy tắc và nghi thức trao đổi danh thiếp thương mại (Meishi Koukan)',
      culturalNote: 'Luôn trao và nhận bằng hai tay, không để ngón tay che mất tên hoặc logo đối tác, đặt ngay ngắn trên hộp đựng danh thiếp.',
      scenarioOverview: 'Học đầy đủ quy trình trao, nhận, đọc tên xác nhận và sắp xếp danh thiếp trên bàn họp.',
    },
  },
  'l-f3-1': {
    th: {
      title: 'การใช้คำช่วยลดแรงปะทะ (Cushion words) และการขอร้องอย่างสุภาพ',
      culturalNote: 'การขึ้นต้นด้วย "โอโซเระอิริมาสุกะ" หรือ "โอเทะซูโอคาเคชิมาสุกะ" จะช่วยลดความรู้สึกถูกสั่งการได้อย่างนุ่มนวล',
    },
    zh: {
      title: '运用缓冲用语（クッション言葉）与职场委婉拜托',
      culturalNote: '在开口提出要求前先说“恐れ入りますが”或“お手数をおかけしますが”，能瞬间消除生硬感，体现最高教养。',
    },
    ko: {
      title: '쿠션어(クッション言葉) 활용과 정중한 업무 부탁',
      culturalNote: '"오소레이리마스가", "오테스우오 카케시마스가" 등 쿠션어를 앞세우면 상대방의 부담을 덜어줍니다.',
    },
  },
  'l-f4-1': {
    th: {
      title: 'การรับโทรศัพท์สำนักงานภายใน 3 สัญญาณกริ่ง',
      culturalNote: 'หากรับสายช้าเกิน 3 สัญญาณกริ่ง ต้องกล่าวขอโทษด้วยคำว่า "โอมาทาเซะ อิตาชิมาชิตะ" ก่อนเสมอ',
    },
    zh: {
      title: '3声铃响内接听商务电话与标准应答规范',
      culturalNote: '若响铃超过3声才接起，第一句话必须是“お待たせいたしました”（让您久等了），以示致歉。',
    },
    ko: {
      title: '3회 벨 이내 비즈니스 전화 수신 및 첫마디 응대',
      culturalNote: '벨이 3번 이상 울린 후 받았을 때는 반드시 "기다리게 해드려 죄송합니다"로 첫인사를 시작합니다.',
    },
  },
  'l-f5-1': {
    th: {
      title: 'โครงสร้าง 7 ส่วนมาตรฐานของอีเมลธุรกิจญี่ปุ่น',
      culturalNote: 'อีเมลธุรกิจญี่ปุ่นไม่ควรเขียนติดต่อกันเป็นพารากราฟยาวๆ แต่ควรเคาะเว้นวรรคและขึ้นบรรทัดใหม่ให้อ่านง่าย',
    },
    zh: {
      title: '日式标准商务邮件七步黄金结构法',
      culturalNote: '日文商务邮件讲究视觉呼吸感，单行通常控制在25-35字以内，每2-3行留一空行方便速读。',
    },
    ko: {
      title: '일본 표준 비즈니스 이메일 7대 골든 구조',
      culturalNote: '비즈니스 이메일은 가독성을 위해 한 줄에 30자 안팎으로 작성하고 적절히 줄바꿈을 해야 합니다.',
    },
  },
  'l-i1-1': {
    th: {
      title: 'ความแตกต่างระหว่าง Sonkeigo (ยกย่อง) และ Kenjougo (ถ่อมตน)',
      culturalNote: 'กฎพื้นฐาน: ยกย่องการกระทำของลูกค้า/คู่ค้า และถ่อมตนเมื่อกล่าวถึงการกระทำของฝ่ายตนเอง',
    },
    zh: {
      title: '尊他语（尊敬語）与自谦语（謙譲語）核心法则',
      culturalNote: '黄金判定准则：动作主体是客户/对方则用尊敬语；动作主体是自己/己方团队则用自谦语。',
    },
    ko: {
      title: '존경어(상대 높임)와 겸양어(자신 낮춤)의 핵심 구별법',
      culturalNote: '상대방이나 고객의 행동에는 존경어, 나와 우리 회사 사람의 행동에는 반드시 겸양어를 사용합니다.',
    },
  },
  'l-i2-1': {
    th: {
      title: 'การรายงานความคืบหน้า (Hou) และการแจ้งเตือนความล่าช้า',
      culturalNote: 'รายงานผลลัพธ์หรือข้อสรุปก่อนเสมอ (Conclusion first) แล้วจึงตามด้วยสาเหตุและแนวทางแก้ไข',
    },
    zh: {
      title: '报联相之“汇报”（報告）：结论先行与延误预警',
      culturalNote: '日本职场报告奉行“结论先行”（PREP法），遇到延误隐患必须在到达截止期前尽早汇报。',
    },
    ko: {
      title: '호렌소의 기본 "보고(報告)": 결론 우선 및 지연 사전 경고',
      culturalNote: '보고는 반드시 결론부터 전달하고, 납기 지연이 예상되는 시점에 즉시 공유해야 합니다.',
    },
  },
};

// ----------------------------------------------------------------------------
// Localized Retrieval Helpers
// ----------------------------------------------------------------------------

export function getLocalizedBusinessUnit(
  unit: BusinessUnit,
  lang: SupportedLanguage
): { title: string; description: string } {
  const i18n = BUSINESS_UNITS_I18N[unit.id];
  const multi = BUSINESS_UNITS_MULTILINGUAL[unit.id];

  // 1. Japanese native
  if (lang === 'ja') {
    return {
      title: unit.titleJp || (i18n ? i18n.titleEn : ''),
      description: unit.description || (i18n ? i18n.descriptionEn : ''),
    };
  }

  // 2. Burmese localization
  if (lang === 'my') {
    if (i18n) {
      return { title: i18n.titleMy, description: i18n.descriptionMy };
    }
  }

  // 3. Multilingual registry match (th, zh, ko, es, fr, vi, id, de, pt, tr, etc.)
  if (multi && multi[lang]) {
    return {
      title: multi[lang]!.title,
      description: multi[lang]!.description,
    };
  }

  // 4. Fallback to English
  if (i18n) {
    return { title: i18n.titleEn, description: i18n.descriptionEn };
  }
  return { title: unit.titleEn, description: unit.description };
}

export function getLocalizedBusinessLesson(
  lesson: BusinessLesson,
  lang: SupportedLanguage
): {
  title: string;
  learningObjectives: string[];
  culturalNote: string;
  scenarioOverview?: string;
  officeContext?: string;
  etiquetteRules?: string[];
} {
  const i18n = BUSINESS_LESSONS_I18N[lesson.id];
  const multi = BUSINESS_LESSONS_MULTILINGUAL[lesson.id];

  // 1. Japanese native
  if (lang === 'ja') {
    return {
      title: lesson.titleJp,
      learningObjectives: lesson.learningObjectives || [],
      culturalNote: lesson.culturalNote || (i18n ? i18n.culturalNoteEn : ''),
      scenarioOverview: lesson.culturalNote,
      officeContext: 'オフィス',
    };
  }

  // 2. Burmese localization
  if (lang === 'my') {
    if (i18n) {
      return {
        title: i18n.titleMy,
        learningObjectives: i18n.learningObjectivesMy || lesson.learningObjectives || [],
        culturalNote: i18n.culturalNoteMy || lesson.culturalNote || '',
        scenarioOverview: i18n.scenarioOverviewMy,
        officeContext: i18n.officeContextMy,
        etiquetteRules: i18n.etiquetteRulesMy,
      };
    }
  }

  // 3. Multilingual match (th, zh, ko, es, fr, vi, id, de, etc.)
  if (multi && multi[lang]) {
    const m = multi[lang]!;
    return {
      title: m.title,
      learningObjectives: (i18n && i18n.learningObjectivesEn) || lesson.learningObjectives || [],
      culturalNote: m.culturalNote || (i18n && i18n.culturalNoteEn) || lesson.culturalNote || '',
      scenarioOverview: m.scenarioOverview || (i18n && i18n.scenarioOverviewMy),
      officeContext: m.officeContext || (i18n && i18n.officeContextMy),
      etiquetteRules: i18n && i18n.etiquetteRulesMy,
    };
  }

  // 4. Fallback to English
  if (i18n) {
    return {
      title: i18n.titleEn,
      learningObjectives: i18n.learningObjectivesEn || lesson.learningObjectives || [],
      culturalNote: i18n.culturalNoteEn || lesson.culturalNote || '',
    };
  }

  return {
    title: lesson.titleEn,
    learningObjectives: lesson.learningObjectives || [],
    culturalNote: lesson.culturalNote || '',
  };
}


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
// Localized Retrieval Helpers
// ----------------------------------------------------------------------------

export function getLocalizedBusinessUnit(unit: BusinessUnit, lang: SupportedLanguage): { title: string; description: string } {
  const i18n = BUSINESS_UNITS_I18N[unit.id];
  if (!i18n) {
    return { title: unit.titleEn, description: unit.description };
  }
  if (lang === 'my') {
    return { title: i18n.titleMy, description: i18n.descriptionMy };
  }
  return { title: i18n.titleEn, description: i18n.descriptionEn };
}

export function getLocalizedBusinessLesson(lesson: BusinessLesson, lang: SupportedLanguage): {
  title: string;
  learningObjectives: string[];
  culturalNote: string;
  scenarioOverview?: string;
  officeContext?: string;
  etiquetteRules?: string[];
} {
  const i18n = BUSINESS_LESSONS_I18N[lesson.id];
  if (!i18n) {
    return {
      title: lesson.titleEn,
      learningObjectives: lesson.learningObjectives || [],
      culturalNote: lesson.culturalNote || '',
    };
  }
  if (lang === 'my') {
    return {
      title: i18n.titleMy,
      learningObjectives: i18n.learningObjectivesMy || lesson.learningObjectives || [],
      culturalNote: i18n.culturalNoteMy || lesson.culturalNote || '',
      scenarioOverview: i18n.scenarioOverviewMy,
      officeContext: i18n.officeContextMy,
      etiquetteRules: i18n.etiquetteRulesMy,
    };
  }
  return {
    title: i18n.titleEn,
    learningObjectives: i18n.learningObjectivesEn || lesson.learningObjectives || [],
    culturalNote: i18n.culturalNoteEn || lesson.culturalNote || '',
  };
}

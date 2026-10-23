import { UniversityReadingExercise } from '../../types/readingCurriculum';

export const READING_N4_EXERCISES: UniversityReadingExercise[] = [
  // 1. Daily Life
  {
    id: 'r-n4-01',
    title: '日本のゴミの分別ルール',
    titleEn: 'Garbage Sorting Rules in Japan',
    titleMy: 'ဂျပန်နိုင်ငံ၏ အမှိုက်ခွဲခြားစွန့်ပစ်မှု စည်းမျဉ်းများ',
    level: 'N4',
    topic: 'daily_life',
    subtopic: 'Municipal waste categories and schedule',
    learningObjectives: ['Understand complex conditional rules with ～なければなりません', 'Distinguish types of municipal waste'],
    learningObjectivesMy: ['～なければなりません ဖြင့် စည်းကမ်းချက်များကို ဖတ်ရှုနားလည်စေရန်', 'အမှိုက်အမျိုးအစား ခွဲခြားမှုဆိုင်ရာ ဂျပန်စကားလုံးများကို ကျွမ်းကျင်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `[日本]{にほん}では、ゴミの[出]{だ}し[方]{かた}に[細]{こま}かいルールがあります。
[地域]{ちいき}によって[違]{ちが}いますが、[普通]{ふつう}は「[燃]{も}えるゴミ」「[燃]{も}えないゴミ」「[資源]{しげん}ゴミ」に[分]{わ}けなければなりません。
ペットボトルはキャップとラベルを[外]{はず}して、[中]{なか}を[水]{みず}で[洗]{あら}ってから[出]{だ}します。
また、[曜日]{ようび}によって[出]{だ}せるゴミの[種類]{しゅるい}が[決]{き}まっています。
たとえば、[月曜日]{げつようび}と[木曜日]{もくようび}は[燃]{も}えるゴミの[日]{ひ}です。
[決]{き}められた[時間]{じかん}までに[指定]{してい}の[場所]{ばしょ}に[出]{だ}さないと、ゴミを[回収]{かいしゅう}してもらえないことがありますから[注意]{ちゅうい}が[必要]{ひつよう}です。`,
    passagePlain: `日本では、ゴミの出し方に細かいルールがあります。
地域によって違いますが、普通は「燃えるゴミ」「燃えないゴミ」「資源ゴミ」に分けなければなりません。
ペットボトルはキャップとラベルを外して、中を水で洗ってから出します。
また、曜日によって出せるゴミの種類が決まっています。
たとえば、月曜日と木曜日は燃えるゴミの日です。
決められた時間までに指定の場所に出さないと、ゴミを回収してもらえないことがありますから注意が必要です。`,
    translationEn: `In Japan, there are detailed rules for disposing of garbage. Although it varies depending on the region, trash must usually be separated into "burnable trash," "non-burnable trash," and "recyclable resources." When throwing away plastic bottles, you must remove the cap and label and rinse the inside with water before disposal. In addition, the types of garbage that can be disposed of are decided according to the day of the week. For example, Mondays and Thursdays are burnable trash days. If you do not put it out at the designated spot by the designated time, it might not be collected, so care is needed.`,
    translationMy: `ဂျပန်နိုင်ငံတွင် အမှိုက်စွန့်ပစ်မှုနှင့် ပတ်သက်၍ အသေးစိတ်ကျသော စည်းမျဉ်းများ ရှိပါသည်။ ဒေသအလိုက် ကွဲပြားသော်လည်း ယေဘုယျအားဖြင့် "မီးရှို့နိုင်သောအမှိုက်"၊ "မီးရှို့၍မရသောအမှိုက်" နှင့် "ပြန်လည်အသုံးပြုနိုင်သော သယံဇာတအမှိုက်" ဟူ၍ မဖြစ်မနေ ခွဲခြားရပါမည်။ ပလတ်စတစ်ရေသန့်ဘူးများကို စွန့်ပစ်ရာတွင် အဖုံးနှင့် တံဆိပ်ကပ်စက္ကူကို ခွာထုတ်ပြီး အတွင်းပိုင်းကို ရေဖြင့် ဆေးကြောပြီးမှ စွန့်ပစ်ရပါသည်။ ထို့အပြင် နေ့ရက်အလိုက် စွန့်ပစ်နိုင်သော အမှိုက်အမျိုးအစားကို သတ်မှတ်ထားပါသည်။ ဥပမာအားဖြင့် တနင်္လာနေ့နှင့် ကြာသပတေးနေ့တို့သည် မီးရှို့နိုင်သောအမှိုက် နေ့များ ဖြစ်ပါသည်။ သတ်မှတ်ထားသော အချိန်မတိုင်မီ သတ်မှတ်နေရာသို့ စွန့်ပစ်မထားပါက အမှိုက်သိမ်းကားမှ သိမ်းဆည်းမပေးဘဲ ထားခဲ့နိုင်သဖြင့် အထူးသတိထားရန် လိုအပ်ပါသည်။`,
    vocabularyList: [
      { word: '分別', reading: 'ぶんべつ', meaning: 'sorting, separation', meaningMy: 'ခွဲခြားသတ်မှတ်ခြင်း' },
      { word: '地域', reading: 'ちいき', meaning: 'region, locality', meaningMy: 'ဒေသ၊ ရပ်ကွက်' },
      { word: '資源', reading: 'しげん', meaning: 'resources, recyclables', meaningMy: 'သယံဇာတ' },
      { word: '回収', reading: 'かいしゅう', meaning: 'collection, gathering', meaningMy: 'သိမ်းဆည်းကောက်ယူခြင်း' },
    ],
    grammarPoints: [
      { grammar: '～なければなりません', meaning: 'must do ~', meaningMy: '...မဖြစ်မနေ ပြုလုပ်ရမည်', explanation: 'Expresses mandatory obligation.', exampleJp: '資源ゴミに分けなければなりません。' },
      { grammar: '～ないと、... (条件)', meaning: 'if not doing ~, then ...', meaningMy: '...မလုပ်ပါက (ဆိုးကျိုးဖြစ်ပေါ်ခြင်း)', explanation: 'Conditional negative clause predicting negative result.', exampleJp: '出さないと、回収してもらえません。' },
    ],
    audioScript: '日本では、ゴミの出し方に細かいルールがあります。「燃えるゴミ」「燃えないゴミ」「資源ゴミ」に分けなければなりません。ペットボトルはキャップとラベルを外して洗ってから出します。',
    questions: [
      {
        id: 'rq-n4-01-1',
        questionJp: 'ペットボトルを捨てるとき、最初に何をしなければなりませんか？',
        questionEn: 'What must you do first when disposing of plastic bottles?',
        questionMy: 'ပလတ်စတစ်ရေသန့်ဘူးများကို စွန့်ပစ်ရာတွင် ပထမဆုံး မည်သို့ပြုလုပ်ရမည်နည်း။',
        options: [
          'そのまま大きな袋に入れる',
          'キャップとラベルを外して中を洗う',
          '燃えないゴミの日に出す',
          'ハサミで小さく切る',
        ],
        correctIndex: 1,
        explanation: 'The passage explicitly says: 「キャップとラベルを外して、中を水で洗ってから出します」(Remove cap/label, wash inside).',
        explanationMy: 'စာပိုဒ်တွင် "キャップとラベルを外して、中を水で洗ってから出します" (အဖုံးနှင့်တံဆိပ်ခွာပြီး ရေဆေးရမည်) ဟု ဖော်ပြထားပါသည်။',
      },
      {
        id: 'rq-n4-01-2',
        questionJp: '文章の内容と合っているものはどれですか？',
        questionEn: 'Which statement matches the content of the passage?',
        questionMy: 'စာပိုဒ်ပါ အကြောင်းအရာနှင့် ကိုက်ညီသော အချက်မှာ အဘယ်နည်း။',
        options: [
          '日本中どこでもゴミのルールは全く同じである',
          '指定の時間や場所を守らなくても必ず回収してくれる',
          '曜日によって出せるゴミの種類が決まっている',
          'ペットボトルは燃えるゴミと一緒に出す',
        ],
        correctIndex: 2,
        explanation: 'Text states: 「曜日によって出せるゴミの種類が決まっています」(Types of trash differ by weekday).',
        explanationMy: '"曜日によって出せるゴミの種類が決まっています" (နေ့ရက်အလိုက် စွန့်ပစ်နိုင်သော အမှိုက်သတ်မှတ်ထားသည်) ဟူသော အချက်သည် အမှန်ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 2. School & Education
  {
    id: 'r-n4-02',
    title: '留学生のための奨学金案内',
    titleEn: 'Scholarship Guide for International Students',
    titleMy: 'နိုင်ငံတကာကျောင်းသားများအတွက် ပညာသင်ဆု လမ်းညွှန်',
    level: 'N4',
    topic: 'school',
    subtopic: 'Scholarship qualifications and application deadline',
    learningObjectives: ['Read institutional notices regarding scholarships', 'Identify eligibility criteria and deadlines using ～までに'],
    learningObjectivesMy: ['ပညာသင်ဆု လျှောက်ထားခြင်းဆိုင်ရာ အချက်အလက်များကို နားလည်စေရန်', '～までに ဖြင့် နောက်ဆုံးရက်သတ်မှတ်ချက်ကို ခွဲခြားသိမြင်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `【[国際][交流][協会]の[奨学金][募集]】
[私][達]の[協会]では、[日本]の[大学]で[勉強]している[留学生]を[支援]するために、[奨学金]を[支給]します。
・[応募][資格]：[私立][大学]または[国立][大学]の２[年生][以上]で、[出席率]が９０％[以上]の[学生]。
・[支給][金額]：[月額]５０,０００[円]（１[年間]）
・[募集][人数]：２０[名]
・[必要][書類]：[願書]、[成績][証明書]、[指導][教員]の[推薦状]
・[締切]：１１[月]３０[日]（[必着]）
[希望]する[人]は、[留学生][課]の[窓口]で[願書]を[受]け[取]り、[期限]までに[提出]してください。
[書類][選考]の[後]、[面接]を[行]います。`,
    passagePlain: `【国際交流協会の奨学金募集】
私達の協会では、日本の大学で勉強している留学生を支援するために、奨学金を支給します。
・応募資格：私立大学または国立大学の２年生以上で、出席率が９０％以上の学生。
・支給金額：月額５０,０００円（１年間）
・募集人数：２０名
・必要書類：願書、成績証明書、指導教員の推薦状
・締切：１１月３0日（必着）
希望する人は、留学生課の窓口で願書を受け取り、期限までに提出してください。
書類選考の後、面接を行います。`,
    translationEn: `[International Exchange Association Scholarship Notice]
Our association provides scholarships to support international students studying at universities in Japan.
- Eligibility: 2nd-year students or higher at private or national universities, with an attendance rate of 90% or higher.
- Grant Amount: 50,000 yen per month (for 1 year)
- Number of Recipients: 20 students
- Required Documents: Application form, academic transcript, recommendation letter from supervising professor
- Deadline: November 30th (must arrive by this date)
Interested applicants should pick up the application at the International Student Section counter and submit it by the deadline. An interview will be conducted following document screening.`,
    translationMy: `【နိုင်ငံတကာဆက်ဆံရေးအသင်း ပညာသင်ဆု လျှောက်လွှာခေါ်ယူခြင်း】
ကျွန်ုပ်တို့အသင်းသည် ဂျပန်တက္ကသိုလ်များတွင် ပညာသင်ကြားနေသော နိုင်ငံတကာကျောင်းသားများကို ထောက်ပံ့ရန်အတွက် ပညာသင်ဆု ချီးမြှင့်ပါမည်။
・လျှောက်ထားနိုင်သူအရည်အချင်း- ပုဂ္ဂလိက သို့မဟုတ် နိုင်ငံပိုင်တက္ကသိုလ်များတွင် ဒုတိယနှစ်နှင့်အထက် တက်ရောက်နေပြီး ကျောင်းခေါ်ချိန် ၉၀% နှင့်အထက်ရှိသော ကျောင်းသားများ။
・ချီးမြှင့်ငွေပမာဏ- တစ်လလျှင် ယန်း ၅၀,၀၀၀ (၁ နှစ်တာ)
・လက်ခံမည့်ဦးရေ- ၂၀ ဦး
・လိုအပ်သောစာရွက်စာတမ်းများ- လျှောက်လွှာ၊ အမှတ်စာရင်း၊ ကြီးကြပ်ဆရာ၏ ထောက်ခံစာ
・နောက်ဆုံးရက်- နိုဝင်ဘာ ၃၀ ရက် (အရောက်ပို့ရမည်)
လျှောက်ထားလိုသူများသည် နိုင်ငံတကာကျောင်းသားရေးရာဌာန ကောင်တာတွင် လျှောက်လွှာထုတ်ယူပြီး သတ်မှတ်ရက်မတိုင်မီ တင်သွင်းပါ။ စာရွက်စာတမ်းစိစစ်ပြီးပါက လူတွေ့စစ်ဆေးခြင်း ပြုလုပ်ပါမည်။`,
    vocabularyList: [
      { word: '奨学金', reading: 'しょうがくきん', meaning: 'scholarship', meaningMy: 'ပညာသင်ဆု' },
      { word: '出席率', reading: 'しゅっせきりつ', meaning: 'attendance rate', meaningMy: 'ကျောင်းခေါ်ချိန်ရာခိုင်နှုန်း' },
      { word: '推薦状', reading: 'すいせんじょう', meaning: 'letter of recommendation', meaningMy: 'ထောက်ခံစာ' },
      { word: '締切', reading: 'しめきり', meaning: 'deadline', meaningMy: 'နောက်ဆုံးတင်သွင်းရမည့်ရက်' },
    ],
    grammarPoints: [
      { grammar: '～のために', meaning: 'for the purpose of / in order to ~', meaningMy: '...အတွက် / ...ရန်အလို့ငှာ', explanation: 'Expresses goal or beneficiary.', exampleJp: '留学生を支援するために支給します。' },
      { grammar: '～以上', meaning: '~ or more', meaningMy: '...နှင့်အထက်', explanation: 'Indicates quantity or threshold including the base number.', exampleJp: '２年生以上、９０％以上。' },
    ],
    audioScript: '国際交流協会では日本の大学で勉強している留学生に奨学金を支給します。月額５万円で１年間です。応募資格は大学２年生以上です。締め切りは１１月３０日です。',
    questions: [
      {
        id: 'rq-n4-02-1',
        questionJp: '奨学金を申し込むことができるのはどんな学生ですか？',
        questionEn: 'Which student is eligible to apply for the scholarship?',
        questionMy: 'ပညာသင်ဆုကို မည်သည့်ကျောင်းသား လျှောက်ထားနိုင်သနည်း။',
        options: [
          '日本語学校の１年生',
          '大学の１年生で成績が良い人',
          '大学２年生以上で出席率が９０％以上の人',
          '大学を卒業した人',
        ],
        correctIndex: 2,
        explanation: 'Eligibility requirement: 「大学の２年生以上で、出席率が９０％以上の学生」(2nd year or above, attendance >=90%).',
        explanationMy: 'အရည်အချင်းသတ်မှတ်ချက်တွင် တက္ကသိုလ် ၂ နှစ်နှင့်အထက်၊ ကျောင်းခေါ်ချိန် ၉၀% အထက်ဟု အတိအလင်း ပါရှိပါသည်။',
      },
      {
        id: 'rq-n4-02-2',
        questionJp: '奨学金は１年間に全部でいくらもらえますか？',
        questionEn: 'How much total scholarship money is received in one year?',
        questionMy: 'တစ်နှစ်တာအတွင်း ပညာသင်ဆု စုစုပေါင်း မည်မျှရရှိမည်နည်း။',
        options: ['５０,０００円', '３００,０００円', '６００,０００円', '１,၂００,０００円'],
        correctIndex: 2,
        explanation: '50,000 yen per month multiplied by 12 months = 600,000 yen (「月額５万円（１年間）」).',
        explanationMy: 'တစ်လ ယန်း ၅၀,၀၀၀ ဖြင့် ၁ နှစ် (၁၂ လ) ဖြစ်သောကြောင့် စုစုပေါင်း ယန်း ၆၀၀,၀၀၀ ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 3. Culture & Traditions
  {
    id: 'r-n4-03',
    title: 'お盆の習慣とお墓参り',
    titleEn: 'Obon Customs and Gravesite Visits',
    titleMy: 'အိုဘွန်းရိုးရာဓလေ့နှင့် ဘိုးဘွားသင်္ချိုင်းဂါရဝပြုခြင်း',
    level: 'N4',
    topic: 'culture',
    subtopic: 'Ancestral veneration and Bon Odori',
    learningObjectives: ['Understand Japanese traditional summer customs', 'Comprehend temporal clauses with ～頃 (around the time of)'],
    learningObjectivesMy: ['ဂျပန်နွေရာသီ အိုဘွန်းဓလေ့များကို နားလည်စေရန်', '～頃 ဖြင့် အချိန်ကာလဖော်ပြချက်များကို သုံးတတ်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `[日本]{にほん}には、８[月]{がつ}の[中旬]{ちゅうじゅん}に「お[盆]{ぼん}」という[伝統的]{でんとうてき}な[行事]{ぎょうじ}があります。
ご[先祖]{せんぞ}さまの[魂]{たましい}が[家]{いえ}に[帰]{かえ}ってくると[信]{しん}じられています。
この[時期]{じき}になると、[多]{おお}くの[人]{ひと}が[会社]{かいしゃ}を[休]{やす}んで、[田舎]{いなか}の[実家]{じっか}に[帰省]{きせい}します。
[家族]{かぞく}みんなでご[先祖]{せんぞ}さまのお[墓]{はか}を[綺麗]{きれい}に[掃除]{そうじ}して、[花]{はな}や[線香]{せんこう}をあげてお[参]{まい}りします。
また、[夜]{よる}になると[広場]{ひろば}で「[盆踊]{ぼんおど}り」を[踊]{おど}ったり、[花火]{はなび}を[見]{み}たりします。
お[盆]{ぼん}は、[家族]{かぞく}や[親戚]{しんせき}が[集]{あつ}まる[大切]{たいせつ}な[時間]{じかん}です。`,
    passagePlain: `日本には、８月の中旬に「お盆」という伝統的な行事があります。
ご先祖さまの魂が家に帰ってくると信じられています。
この時期になると、多くの人が会社を休んで、田舎の実家に帰省します。
家族みんなでご先祖さまのお墓を綺麗に掃除して、花や線香をあげてお参りします。
また、夜になると広場で「盆踊り」を踊ったり、花火を見たりします。
お盆は、家族や親戚が集まる大切な時間です。`,
    translationEn: `In Japan, in mid-August, there is a traditional event called "Obon." It is believed that the spirits of ancestors return to their homes. Around this time, many people take time off from work and return to their hometown family homes. Together, families thoroughly clean their ancestral graves, offer flowers and incense, and pray. Also, when night falls, they dance the "Bon Odori" in plazas and watch fireworks. Obon is an important time for families and relatives to gather.`,
    translationMy: `ဂျပန်နိုင်ငံတွင် သြဂုတ်လလယ်ခန့်၌ "အိုဘွန်း" ဟုခေါ်သော ရှေးရိုးရာပွဲတော်တစ်ခု ရှိပါသည်။ ဘိုးဘွားမိဘများ၏ ဝိညာဉ်များသည် မိမိတို့နေအိမ်သို့ ပြန်လည်ရောက်ရှိလာကြသည်ဟု ယုံကြည်ကြပါသည်။ ဤကာလတွင် လူအများအပြားသည် အလုပ်မှခွင့်ယူပြီး နယ်ရှိ မိဘနေအိမ်များသို့ ပြန်လည်စုဝေးကြပါသည်။ မိသားစုအားလုံး စုပေါင်း၍ ဘိုးဘွားသင်္ချိုင်းဂူများကို သန့်ရှင်းရေးပြုလုပ်ကာ ပန်းနှင့် အမွှေးတိုင်များ ပူဇော်ဂါရဝပြုကြပါသည်။ ညဘက်တွင်လည်း ရပ်ကွက်ကွင်းပြင်၌ "ဘွန်းအိုဒိုရိ" ရိုးရာအကကို ကကြပြီး မီးရှူးမီးပန်းများကို ကြည့်ရှုကြပါသည်။ အိုဘွန်းသည် မိသားစုနှင့် ဆွေမျိုးများ ပြန်လည်ဆုံဆည်းကြသော အရေးပါသည့် အချိန်ကာလ ဖြစ်ပါသည်။`,
    vocabularyList: [
      { word: '先祖', reading: 'せんぞ', meaning: 'ancestors', meaningMy: 'ဘိုးဘွားဘီဘင်' },
      { word: '帰省', reading: 'きせい', meaning: 'homecoming to hometown', meaningMy: 'ဇာတိမြေသို့ အလည်ပြန်ခြင်း' },
      { word: '線香', reading: 'せんこう', meaning: 'incense stick', meaningMy: 'အမွှေးတိုင်' },
      { word: '親戚', reading: 'しんせき', meaning: 'relatives', meaningMy: 'ဆွေမျိုးသားချင်း' },
    ],
    grammarPoints: [
      { grammar: '～と信じられている', meaning: 'it is believed that ~', meaningMy: '...ဟု ယုံကြည်ကြသည်', explanation: 'Passive-stative expression reporting shared cultural beliefs.', exampleJp: '魂が帰ってくると信じられています。' },
      { grammar: '～になると', meaning: 'when it becomes ~', meaningMy: '...ရောက်ရှိလာသောအခါ', explanation: 'Natural temporal consequence.', exampleJp: 'この時期になると、多くの人が帰省します。' },
    ],
    audioScript: '８月の中旬にお盆という伝統的な行事があります。ご先祖さまの魂が家に帰ってくると信じられています。多くの人が実家に帰省してお墓参りをします。',
    questions: [
      {
        id: 'rq-n4-03-1',
        questionJp: 'お盆の時期に多くの人が何のために実家へ帰りますか？',
        questionEn: 'Why do many people return to their hometowns during Obon?',
        questionMy: 'အိုဘွန်းကာလတွင် လူအများစုသည် အဘယ်ကြောင့် ဇာတိအိမ်သို့ ပြန်ကြသနည်း။',
        options: [
          '新しい仕事を探すため',
          'お墓参りをして家族と過ごすため',
          '大学の入学試験を受けるため',
          'スキーをするため',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「ご先祖さまのお墓を綺麗に掃除して...お参りします」「家族や親戚が集まる」(Cleaning graves, gathering with family).',
        explanationMy: 'ဘိုးဘွားသင်္ချိုင်းတွင် ဂါရဝပြုရန်နှင့် မိသားစုနှင့် ပြန်လည်ဆုံဆည်းရန် ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n4-03-2',
        questionJp: '夜に広場でどんなことを楽しむと書かれていますか？',
        questionEn: 'What is mentioned as an activity people enjoy in plazas at night?',
        questionMy: 'ညဘက်တွင် ကွင်းပြင်၌ မည်သည့်အရာကို ပျော်ရွှင်စွာ ပြုလုပ်ကြသည်ဟု ရေးထားသလဲ။',
        options: ['盆踊りや花火', 'サッカーの試合', '勉強会', 'スキー'],
        correctIndex: 0,
        explanation: 'Text notes: 「広場で『盆踊り』を踊ったり、花火を見たりします」(Bon Odori and fireworks).',
        explanationMy: '"盆踊りを踊ったり、花火を見たりします" (ဘွန်းအိုဒိုရိကခုန်ခြင်းနှင့် မီးရှူးမီးပန်းကြည့်ခြင်း) ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 4. Food & Dining
  {
    id: 'r-n4-04',
    title: '日本の弁当文化とキャラ弁',
    titleEn: 'Japanese Bento Culture and Charaben',
    titleMy: 'ဂျပန်ထမင်းဘူးယဉ်ကျေးမှုနှင့် အရုပ်ပုံဖော်ထမင်းဘူး',
    level: 'N4',
    topic: 'food',
    subtopic: 'Nutritional balance and visual creativity in lunchboxes',
    learningObjectives: ['Understand descriptions of culinary aesthetics and nutrition', 'Use ～だけでなく...も (not only... but also)'],
    learningObjectivesMy: ['ဂျပန်ထမင်းဘူး၏ အာဟာရနှင့် အလှအပဆိုင်ရာ ဖော်ပြချက်များကို နားလည်စေရန်', '～だけでなく...も ကို သုံးတတ်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `[日本]{にほん}の「お[弁当]{べんとう}」は、[栄養]{えいよう}だけでなく[見]{み}た[目]{め}の[美]{うつく}しさもとても[大切]{たいせつ}にされています。
ごはんの[白]{しろ}、[卵]{たまご}の[黄]{き}[色]{いろ}、トマトの[赤]{あか}、ブロッコリーの[緑]{みどり}など、いろいろな[色]{いろ}の[食材]{しょくざい}を[使]{つか}って、バランスよく[作]{つく}ります。
[最近]{さいきん}では、アニメのキャラクターやかわいい[動物]{どうぶつ}の[形]{かたち}にした「キャラ[弁]{べん}」が[子]{こ}どもたちに[大人気]{だいにんき}です。
のりを[切]{き}って[目]{め}や[口]{くち}を[作]{つく}ったり、チーズやハムで[飾]{かざ}ったりします。
お[弁当]{べんとう}を[開]{あ}けたときに[喜]{よろこ}んでもらえるように、[親]{おや}たちは[朝早]{あさはや}く[起]{お}きて[愛情]{あいじょう}を[込]{こ}めて[作]{つく}っています。`,
    passagePlain: `日本の「お弁当」は、栄養だけでなく見た目の美しさもとても大切にされています。
ごはんの白、卵の黄色、トマトの赤、ブロッコリーの緑など、いろいろな色の食材を使って、バランスよく作ります。
最近では、アニメのキャラクターやかわいい動物の形にした「キャラ弁」が子どもたちに大人気です。
のりを切って目や口を作ったり、チーズやハムで飾ったりします。
お弁当を開けたときに喜んでもらえるように、親たちは朝早く起きて愛情を込めて作っています。`,
    translationEn: `In Japanese "Bento" (boxed lunches), not only nutrition but also visual beauty is considered very important. Using ingredients of various colors—such as white rice, yellow eggs, red tomatoes, and green broccoli—bentos are made with good nutritional balance. Recently, "Charaben" (character bentos) shaped like anime characters or cute animals have become hugely popular among children. Seaweed is cut to make eyes and mouths, and cheese and ham are used for decoration. Parents wake up early in the morning and prepare them with great love so that their children will be delighted when they open the lunchbox.`,
    translationMy: `ဂျပန်နိုင်ငံ၏ "ထမင်းဘူး" (အိုဘန်းတိုး) တွင် အာဟာရပြည့်ဝမှုသာမက အမြင်အရ လှပတင့်တယ်မှုကိုလည်း အလွန်အလေးထားကြပါသည်။ ထမင်းဖြူ၊ ကြက်ဥအနှစ်ဝါ၊ ခရမ်းချဉ်သီးနီ၊ ပန်းဂေါ်ဖီစိမ်း စသည့် အရောင်အသွေးစုံလင်သော အသီးအရွက်အသားများကို သုံး၍ ညီညွတ်မျှတစွာ ပြင်ဆင်ကြပါသည်။ မကြာသေးမီက အန်နီမေးကာတွန်းဇာတ်ကောင်များနှင့် ချစ်စဖွယ်တိရစ္ဆာန်ရုပ်များ ဖန်တီးထားသော "ချာရာဘန်" (ကာတွန်းထမင်းဘူး) သည် ကလေးများအကြား အလွန်ရေပန်းစားလှပါသည်။ ရေညှိကို ကပ်ကြေးဖြင့်ညှပ်၍ မျက်စိ၊ နှုတ်ခမ်းများပြုလုပ်ခြင်း၊ ဒိန်ခဲနှင့် ဝက်ပေါင်ခြောက်များဖြင့် အလှဆင်ခြင်းများ ပြုလုပ်ကြပါသည်။ ကလေးငယ်များ ထမင်းဘူးဖွင့်လိုက်ချိန်တွင် ဝမ်းသာပျော်ရွှင်စေရန်အတွက် မိဘများသည် မနက်စောစောထကာ ချစ်ခြင်းမေတ္တာအပြည့်ဖြင့် ပြုလုပ်ပေးကြခြင်း ဖြစ်ပါသည်။`,
    vocabularyList: [
      { word: '栄養', reading: 'えいよう', meaning: 'nutrition', meaningMy: 'အာဟာရ' },
      { word: '食材', reading: 'しょくざい', meaning: 'food ingredients', meaningMy: 'အစားအစာကုန်ကြမ်း' },
      { word: '愛情', reading: 'あいじょう', meaning: 'love, affection', meaningMy: 'ချစ်ခြင်းမေတ္တာ' },
      { word: '込める', reading: 'こめる', meaning: 'to put into (heart/feeling)', meaningMy: '(မေတ္တာ၊ စေတနာ) ထည့်သွင်းသည်' },
    ],
    grammarPoints: [
      { grammar: 'A だけでなく B も', meaning: 'not only A, but also B', meaningMy: 'A သာမက B လည်း', explanation: 'Correlative conjunction adding another quality.', exampleJp: '栄養だけでなく見た目の美しさも大切です。' },
      { grammar: '～ように (目的)', meaning: 'so that ~ / in order that ~', meaningMy: '...ဖြစ်စေရန်အတွက် (ရည်ရွယ်ချက်)', explanation: 'Expresses goal or desired state.', exampleJp: '喜んでもらえるように作っています。' },
    ],
    audioScript: '日本のお弁当は栄養だけでなく見た目も大切にされています。最近ではアニメのキャラクターにしたキャラ弁が子どもたちに大人気です。',
    questions: [
      {
        id: 'rq-n4-04-1',
        questionJp: '「キャラ弁」とはどのようなお弁当ですか？',
        questionEn: 'What kind of lunchbox is a "Charaben"?',
        questionMy: '"ချာရာဘန်" ဆိုသည်မှာ မည်သို့သော ထမင်းဘူးမျိုး ဖြစ်သနည်း။',
        options: [
          '辛いスパイスがたくさん入ったお弁当',
          'アニメのキャラクターなどの形にしたお弁当',
          'パンだけが入っている簡単なお弁当',
          '夜ご飯の残りを詰めたお弁当',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「アニメのキャラクターやかわいい動物の形にした『キャラ弁』」(Shaped like anime characters or cute animals).',
        explanationMy: 'ကာတွန်းဇာတ်ကောင် သို့မဟုတ် ချစ်စဖွယ်တိရစ္ဆာန်ရုပ်များ ဖန်တီးထားသော ထမင်းဘူး ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n4-04-2',
        questionJp: '親たちはなぜ朝早く起きてキャラ弁を作りますか？',
        questionEn: 'Why do parents wake up early to make Charaben?',
        questionMy: 'မိဘများသည် အဘယ်ကြောင့် မနက်စောစောထ၍ ချာရာဘန်ကို ပြုလုပ်ကြသနည်း။',
        options: [
          'お弁当コンテストに出場するため',
          '子どもが開けたときに喜んでもらうため',
          '先生に褒められるため',
          '店で売ってお金を稼ぐため',
        ],
        correctIndex: 1,
        explanation: 'Sentence says: 「お弁当を開けたときに喜んでもらえるように」(So that the child is happy when opening it).',
        explanationMy: '"子どもが開けたときに喜んでもらえるように" (ကလေးငယ် ဖွင့်ကြည့်ချိန်တွင် ဝမ်းသာစေရန်အတွက်) ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 5. Travel & Transport
  {
    id: 'r-n4-05',
    title: '富士山登山の計画とアドバイス',
    titleEn: 'Mount Fuji Climbing Plan and Advice',
    titleMy: 'ဖူဂျီတောင်တက် အစီအစဉ်နှင့် အကြံပြုချက်များ',
    level: 'N4',
    topic: 'travel',
    subtopic: 'Climbing season, equipment, and mountain safety',
    learningObjectives: ['Comprehend travel safety instructions and gear requirements', 'Understand advisory expressions like ～ほうがいいです and ～てはいけません'],
    learningObjectivesMy: ['တောင်တက်ခြင်းဆိုင်ရာ ဘေးကင်းရေးနှင့် လိုအပ်သောပစ္စည်းများကို နားလည်စေရန်', '～ほうがいいです ဖြင့် အကြံပြုစကားများကို သုံးတတ်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `[富士山]{ふじさん}は[日本]{にほん}で[一番]{いちばん}[高]{たか}い[山]{やま}で、[標高]{ひょうこう}は３,７７６メートルあります。
[毎年]{まいとし}７[月]{がつ}の[初]{はじ}めから９[月]{がつ}の[上旬]{じょうじゅん}まで[登山]{とざん}することができます。
この[時期]{じき}は[多]{おお}くの[観光客]{かんこうきゃく}が[山頂]{さんちょう}からの「ご[来光]{らいこう}（[日]{ひ}の[出]{で}）」を[見]{み}に[登]{のぼ}ります。
しかし、[夏]{なつ}でも[山頂]{さんちょう}の[気温]{きおん}は０[度]{ど}[近]{ちか}くまで[下]{さ}がりますから、[防寒着]{ぼうかんぎ}を[必]{かなら}ず[持]{も}って[行]{い}かなければなりません。
また、[無理]{むり}なスケジュールで[夜通]{よどお}し[登]{のぼ}る「[弾丸]{だんがん}[登山]{とざん}」は[高山病]{こうざんびょう}になりやすいので、[山小屋]{やまごや}に[泊]{と}まってゆっくり[登]{のぼ}るほうがいいです。`,
    passagePlain: `富士山は日本で一番高い山で、標高は３,７７６メートルあります。
毎年７月の初めから９月の上旬まで登山することができます。
この時期は多くの観光客が山頂からの「ご来光（日の出）」を見に登ります。
しかし、夏でも山頂の気温は０度近くまで下がりますから、防寒着を必ず持って行かなければなりません。
また、無理なスケジュールで夜通し登る「弾丸登山」は高山病になりやすいので、山小屋に泊まってゆっくり登るほうがいいです。`,
    translationEn: `Mount Fuji is the highest mountain in Japan, with an elevation of 3,776 meters. It can be climbed every year from early July to early September. During this period, many tourists climb to see "Goraiko" (sunrise) from the summit. However, even in summer, the temperature at the summit drops to near 0 degrees Celsius, so you must bring warm clothing. In addition, "bullet climbing"—climbing through the night on an unreasonable schedule—easily leads to altitude sickness, so it is better to stay overnight in a mountain lodge and climb slowly.`,
    translationMy: `ဖူဂျီတောင်သည် ဂျပန်နိုင်ငံတွင် အမြင့်ဆုံးတောင်ဖြစ်ပြီး အမြင့်ပေ ၃,၇၇၆ မီတာ ရှိပါသည်။ နှစ်စဉ် ဇူလိုင်လဆန်းမှ စက်တင်ဘာလဆန်းအထိ တောင်တက်ခွင့်ရှိပါသည်။ ဤကာလတွင် ခရီးသွားအများအပြားသည် တောင်ထိပ်မှ "နေထွက်ချိန်ရှုခင်း" ကို ကြည့်ရှုရန် တက်ရောက်ကြပါသည်။ သို့သော် နွေရာသီဖြစ်သော်လည်း တောင်ထိပ်၏ အပူချိန်သည် ၀ ဒီဂရီစင်တီဂရိတ်နီးပါးအထိ ကျဆင်းသဖြင့် အအေးဒဏ်ခံအဝတ်အထည်များကို မဖြစ်မနေ ယူဆောင်သွားရပါမည်။ ထို့အပြင် အနားမယူဘဲ တစ်ညလုံး အပြင်းတက်သော "ကျည်ဆန်တောင်တက်ခြင်း" သည် တောင်တက်မူးဝေဖျားနာခြင်းကို ဖြစ်စေနိုင်သဖြင့် တောင်ပေါ်တည်းခိုခန်း၌ တစ်ညအိပ်ပြီး ဖြည်းဖြည်းချင်း တက်ရောက်ခြင်းက ပို၍ကောင်းမွန်ပါသည်။`,
    vocabularyList: [
      { word: '標高', reading: 'ひょうこう', meaning: 'elevation, altitude', meaningMy: 'ပင်လယ်ရေမျက်နှာပြင်အထက် အမြင့်' },
      { word: '山頂', reading: 'さんちょう', meaning: 'mountain summit', meaningMy: 'တောင်ထိပ်' },
      { word: '防寒着', reading: 'ぼうかんぎ', meaning: 'warm winter clothing', meaningMy: 'အအေးဒဏ်ခံ အဝတ်အထည်' },
      { word: '高山病', reading: 'こうざんびょう', meaning: 'altitude sickness', meaningMy: 'တောင်တက်မူးဝေဖျားနာခြင်း' },
    ],
    grammarPoints: [
      { grammar: '～ほうがいいです', meaning: 'it is better to do ~ (advice)', meaningMy: '...လုပ်ခြင်းက ပိုကောင်းသည် (အကြံပြုချက်)', explanation: 'Used to give friendly strong advice.', exampleJp: '山小屋に泊まってゆっくり登るほうがいいです。' },
      { grammar: '～やすい', meaning: 'easy to / prone to ~', meaningMy: '...ဖြစ်လွယ်သည်', explanation: 'Verb stem + やすい indicates likelihood of occurrence.', exampleJp: '高山病になりやすいです。' },
    ],
    audioScript: '富士山は日本で一番高い山です。毎年７月から９月まで登山することができます。山頂は夏でも寒いので、防寒着を必ず持って行かなければなりません。',
    questions: [
      {
        id: 'rq-n4-05-1',
        questionJp: '富士山に登ることができる期間はいつですか？',
        questionEn: 'What is the period during which Mount Fuji can be climbed?',
        questionMy: 'ဖူဂျီတောင်သို့ တက်ရောက်နိုင်သော ကာလမှာ မည်သည့်အချိန်ဖြစ်သနည်း။',
        options: [
          '１年中いつでも',
          '４月から６月まで',
          '７月初めから９月上旬まで',
          '１０月から１２月まで',
        ],
        correctIndex: 2,
        explanation: 'Passage states: 「毎年７月の初めから９月の上旬まで登山することができます」(Early July to early Sept).',
        explanationMy: 'စာပိုဒ်တွင် "７月の初めから９月の上旬まで" (ဇူလိုင်လဆန်းမှ စက်တင်ဘာလဆန်းအထိ) ဟု ပါရှိပါသည်။',
      },
      {
        id: 'rq-n4-05-2',
        questionJp: 'なぜ山小屋に泊まったほうがいいですか？',
        questionEn: 'Why is it better to stay at a mountain lodge?',
        questionMy: 'အဘယ်ကြောင့် တောင်ပေါ်တည်းခိုခန်းတွင် အိပ်သင့်သနည်း။',
        options: [
          '山小屋の料理が一番おいしいから',
          'ホテル代が無料になるから',
          '夜通し登ると高山病になりやすいから',
          '昼間は登山禁止だから',
        ],
        correctIndex: 2,
        explanation: 'Text explains: 「夜通し登る『弾丸登山』は高山病になりやすいので...」(Bullet climbing easily causes altitude sickness).',
        explanationMy: 'တစ်ညလုံးအပြင်းတက်ပါက တောင်တက်မူးဝေဖျားနာခြင်း ဖြစ်လွယ်သောကြောင့် ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 6. Work & Professional
  {
    id: 'r-n4-06',
    title: '日本のビジネスマナー：電話の受け方',
    titleEn: 'Japanese Business Manners: Answering the Phone',
    titleMy: 'ဂျပန်ရုံးသုံးလုပ်ငန်းခွင် စည်းမျဉ်း- တယ်လီဖုန်းလက်ခံပြောဆိုနည်း',
    level: 'N4',
    topic: 'work',
    subtopic: 'Telephone etiquette, polite keigo phrasing, and message taking',
    learningObjectives: ['Learn fundamental business phone expressions in Japanese', 'Understand polite humble expressions like お電話ありがとうございます'],
    learningObjectivesMy: ['ရုံးသုံးဖုန်းပြောဆိုရာတွင် အသုံးပြုသော ယဉ်ကျေးစကားများကို နားလည်စေရန်', 'အလုပ်ခွင်ဆက်ဆံရေး ယဉ်ကျေးမှုများကို သိရှိစေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `[日本]{にほん}の[会社]{かいしゃ}で働くとき、[電話]{でんわ}の[対応]{たいおう}はとても[大切]{たいせつ}な[業務]{ぎょうむ}の１つです。
ベルが鳴ったら、できるだけ３[回]{かい}[以内]{いない}に「お[電話]{でんわ}ありがとうございます、〇〇[株式会社]{かぶしきがいしゃ}でございます」と[元気]{げんき}よく[出]{で}ます。
もし[相手]{あいて}の[声]{こえ}が[小]{ちい}さくて[聞]{き}こえにくいときは、「[恐]{おそ}れ[入]{い}りますが、お[電話]{でんわ}が[少]{すこ}し[遠]{とお}いようでございます」と[丁寧]{ていねい}に[伝]{つた}えます。
[担当者]{たんとうしゃ}が[席]{せき}を[外]{はず}しているときは、「あいにく〇〇はただいま[外出]{がいしゅつ}しております。[戻]{もど}りましたら、折り返しお電話させましょうか」と[確認]{かくにん}します。
メモを[取]{と}りながら[聞]{き}くことが[大切]{たいせつ}です。`,
    passagePlain: `日本の会社で働くとき、電話の対応はとても大切な業務の１つです。
ベルが鳴ったら、できるだけ３回以内に「お電話ありがとうございます、〇〇株式会社でございます」と元気よく出ます。
もし相手の声が小さくて聞こえにくいときは、「恐れ入りますが、お電話が少し遠いようでございます」と丁寧に伝えます。
担当者が席を外しているときは、「あいにく〇〇はただいま外出しております。戻りましたら、折り返しお電話させましょうか」と確認します。
メモを取りながら聞くことが大切です。`,
    translationEn: `When working at a Japanese company, handling telephone calls is one of the most important duties. When the phone rings, you should answer cheerfully within three rings whenever possible, saying "Thank you for calling, this is XX Corporation." If the other person's voice is faint and hard to hear, politely convey: "Pardon me, but the line seems a bit faint." If the person in charge is away from their desk, confirm by saying: "Unfortunately, XX is currently out of the office. Shall I have them call you back once they return?" Taking notes while listening is essential.`,
    translationMy: `ဂျပန်ကုမ္ပဏီတွင် အလုပ်လုပ်ကိုင်ရာတွင် တယ်လီဖုန်းကိုင်တွယ်ပြောဆိုခြင်းသည် အလွန်အရေးပါသော လုပ်ငန်းတာဝန်တစ်ခု ဖြစ်ပါသည်။ ဖုန်းမြည်သံ ၃ ချက်မကျော်မီ အမြန်ဆုံးကိုင်ကာ "ဖုန်းခေါ်ဆိုမှုအတွက် ကျေးဇူးတင်ရှိပါသည်၊ ဤသည်မှာ 〇〇 ကော်ပိုရေးရှင်းမှ ဖြစ်ပါသည်" ဟု ရွှင်လန်းတက်ကြွစွာ နှုတ်ဆက်ရပါမည်။ တစ်ဖက်လူ၏အသံ တိုးလွန်း၍ မကြားရပါက "အားနာပါသည်ခင်ဗျာ၊ လိုင်းနည်းနည်းဝေးနေသလို ဖြစ်နေပါသည်" ဟု ယဉ်ကျေးစွာ ပြောဆိုရပါမည်။ တာဝန်ခံသည် နေရာတွင်မရှိပါက "စိတ်မကောင်းပါဘူးခင်ဗျာ၊ 〇〇 သည် ယခုအပြင်သို့ ခေတ္တထွက်သွားပါသည်၊ ပြန်ရောက်ပါက ဖုန်းပြန်ခေါ်ခိုင်းရမလားခင်ဗျာ" ဟု အတည်ပြုမေးမြန်းရပါမည်။ ဖုန်းပြောနေစဉ် စာရွက်ပေါ်တွင် မှတ်စုရေးမှတ်ထားရန် အထူးအရေးကြီးပါသည်။`,
    vocabularyList: [
      { word: '対応', reading: 'たいおう', meaning: 'handling, dealing with', meaningMy: 'ကိုင်တွယ်ဖြေရှင်းခြင်း' },
      { word: '恐れ入ります', reading: 'おそれいります', meaning: 'excuse me / I am sorry to trouble you', meaningMy: 'အားနာပါသည် (ယဉ်ကျေးစကား)' },
      { word: '外出', reading: 'がいしゅつ', meaning: 'going out, out of office', meaningMy: 'အပြင်ထွက်ခြင်း' },
      { word: '折り返し', reading: 'おりかえし', meaning: 'calling back, returning a call', meaningMy: 'ဖုန်းပြန်ခေါ်ပေးခြင်း' },
    ],
    grammarPoints: [
      { grammar: '～でございます', meaning: 'polite form of です (丁寧語)', meaningMy: '...ဖြစ်ပါသည် (အလွန်ယဉ်ကျေးသောအသုံး)', explanation: 'Used in business phone reception.', exampleJp: '〇〇株式会社でございます。' },
      { grammar: '～ながら', meaning: 'while doing ~', meaningMy: '...လုပ်ရင်းဖြင့်', explanation: 'Two simultaneous actions performed by the same subject.', exampleJp: 'メモを取りながら聞きます。' },
    ],
    audioScript: '日本の会社では電話対応が大切です。ベルが鳴ったら３回以内に元気よく出ます。担当者がいないときは折り返しの電話を確認します。',
    questions: [
      {
        id: 'rq-n4-06-1',
        questionJp: '電話のベルが鳴ったら、普通は何回以内に取るべきですか？',
        questionEn: 'Normally, within how many rings should you answer the phone?',
        questionMy: 'ပုံမှန်အားဖြင့် ဖုန်းမြည်သံ မည်မျှမကျော်မီ ဖုန်းကိုင်သင့်သနည်း။',
        options: ['１回だけ', '３回以内', '５回以内', '１０回以内'],
        correctIndex: 1,
        explanation: 'The text specifies: 「できるだけ３回以内に」(Within 3 rings whenever possible).',
        explanationMy: 'စာပိုဒ်တွင် "３回以内に" (၃ ကြိမ်အတွင်း) ဟု ဖော်ပြထားပါသည်။',
      },
      {
        id: 'rq-n4-06-2',
        questionJp: '担当者が外出しているとき、どのように対応しますか？',
        questionEn: 'How do you handle a situation where the person in charge is out?',
        questionMy: 'တာဝန်ခံသည် အပြင်ထွက်နေပါက မည်သို့ကိုင်တွယ်ဖြေရှင်းမည်နည်း။',
        options: [
          'すぐに電話を切る',
          '携帯電話の番号を勝手に教える',
          '戻ったら折り返し電話するか確認する',
          '明日もう一度かけるように怒る',
        ],
        correctIndex: 2,
        explanation: 'Rule says: 「戻りましたら、折り返しお電話させましょうかと確認します」(Ask if they want a callback).',
        explanationMy: 'ပြန်ရောက်ပါက ဖုန်းပြန်ခေါ်ခိုင်းရမလားဟု အတည်ပြုမေးမြန်းရပါမည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 7. Technology & Digital Society
  {
    id: 'r-n4-07',
    title: '日本のキャッシュレス社会と電子マネー',
    titleEn: 'Cashless Society and E-Money in Japan',
    titleMy: 'ဂျပန်နိုင်ငံ၏ ငွေသားမဲ့လူ့ဘောင်နှင့် အီလက်ထရွန်းနစ်ငွေကြေး',
    level: 'N4',
    topic: 'technology',
    subtopic: 'IC cards, QR payments, and digital convenience',
    learningObjectives: ['Read about financial technology and modern payment methods', 'Understand comparative sentences with ～より and ～のほうが'],
    learningObjectivesMy: ['ခေတ်မီငွေပေးချေမှုနည်းပညာဆိုင်ရာ အသုံးအနှုန်းများကို နားလည်စေရန်', 'နှိုင်းယှဉ်ပြဝါကျ ～より နှင့် ～のほうが ကို သုံးတတ်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `これまで[日本]{にほん}は「[現金]{げんきん}[社会]{しゃかい}」と[言]{い}われ、[多]{おお}くの[人]{ひと}が[現金]{げんきん}で[買]{か}い[物]{もの}をしていました。
しかし、[最近]{さいきん}は「Suica」や「PASMO」などの[交通系]{こうつうけい}ＩＣカードだけでなく、スマートフォンのＱＲコード[決済]{けっさい}を[利用]{りよう}する[人]{ひと}が[急激]{きゅうげき}に[増]{ふ}えています。
キャッシュレス[決済]{けっさい}を[使]{つか}うと、[財布]{さいふ}から[小銭]{こぜに}を[出]{だ}す[必要]{ひつよう}がありませんし、[支払]{しはら}いも[一瞬]{いっしゅん}で[終]{お}わります。
さらに、[買]{か}い[物]{もの}をするたびにポイントが[貯]{た}まるので、[現金]{げんきん}よりもお[得]{とく}です。
しかし、[充電]{じゅうでん}が[切]{き}れたり[電波]{でんぱ}がない[場所]{ばしょ}では[使]{つか}えないことがあるため、[少]{すこ}しの[現金]{げんきん}を[持]{も}っておくと[安心]{あんしん}です。`,
    passagePlain: `これまで日本は「現金社会」と言われ、多くの人が現金で買い物をしていました。
しかし、最近は「Suica」や「PASMO」などの交通系ＩＣカードだけでなく、スマートフォンのＱＲコード決済を利用する人が急激に増えています。
キャッシュレス決済を使うと、財布から小銭を出す必要がありませんし、支払いも一瞬で終わります。
さらに、買い物をするたびにポイントが貯まるので、現金よりもお得です。
しかし、充電が切れたり電波がない場所では使えないことがあるため、少しの現金を持っておくと安心です。`,
    translationEn: `Until recently, Japan was called a "cash society," and most people shopped using physical cash. However, lately, not only transportation IC cards like "Suica" and "PASMO" but also people using smartphone QR code payments are increasing rapidly. Using cashless payments eliminates the need to pull small coins from your wallet, and payments are completed in an instant. Furthermore, because reward points accumulate every time you shop, it is more advantageous than cash. However, because you might not be able to use it when your battery runs out or in places without reception, keeping a small amount of cash on hand provides peace of mind.`,
    translationMy: `ယခင်က ဂျပန်နိုင်ငံသည် "ငွေသားအဓိကလူ့ဘောင်" ဟု ခေါ်ဆိုကြပြီး လူအများစုသည် ငွေသားဖြင့်သာ ဈေးဝယ်လေ့ရှိကြပါသည်။ သို့သော် မကြာသေးမီက "Suica" နှင့် "PASMO" ကဲ့သို့သော ရထား/ဘတ်စ်ကားသုံး IC ကတ်များသာမက စမတ်ဖုန်း၏ QR ကုဒ်ဖြင့် ငွေပေးချေမှုကို အသုံးပြုသူဦးရေသည် အလွန်လျင်မြန်စွာ တိုးပွားလာနေပါသည်။ ငွေသားမဲ့ငွေချေစနစ်ကို အသုံးပြုပါက ပိုက်ဆံအိတ်ထဲမှ အကြွေစေ့များ ထုတ်စရာမလိုသလို ငွေပေးချေမှုသည်လည်း ချက်ချင်းပြီးမြောက်ပါသည်။ ထို့အပြင် ဈေးဝယ်တိုင်း အမှတ် (Points) များ စုဆောင်းရရှိသဖြင့် ငွေသားထက် ပို၍ အကျိုးရှိလှပါသည်။ သို့သော် ဘက်ထရီအားကုန်သွားခြင်း သို့မဟုတ် ဖုန်းလိုင်းမမိသောနေရာများတွင် သုံး၍မရနိုင်သောကြောင့် ငွေသားအနည်းငယ် ဆောင်ထားခြင်းက ပို၍ စိတ်ချရစေပါသည်။`,
    vocabularyList: [
      { word: '現金', reading: 'げんきん', meaning: 'cash', meaningMy: 'ငွေသား' },
      { word: '決済', reading: 'けっさい', meaning: 'settlement, payment', meaningMy: 'ငွေပေးချေမှု' },
      { word: 'お得', reading: 'おとく', meaning: 'good deal, profitable', meaningMy: 'အကျိုးရှိသက်သာသော' },
      { word: '充電', reading: 'じゅうでん', meaning: 'charging (battery)', meaningMy: 'ဘက်ထရီအားသွင်းခြင်း' },
    ],
    grammarPoints: [
      { grammar: '～たびに', meaning: 'every time ~ happens', meaningMy: '...တိုင်း (အကြိမ်တိုင်း)', explanation: 'Indicates repeated recurring occurrences.', exampleJp: '買い物をするたびにポイントが貯まります。' },
      { grammar: 'A より B のほうが ～', meaning: 'B is more ~ than A', meaningMy: 'A ထက် B က ပို၍...', explanation: 'Comparative statement.', exampleJp: '現金よりもお得です。' },
    ],
    audioScript: '最近、日本ではキャッシュレス決済を利用する人が増えています。小銭を出す必要がなく、ポイントが貯まるのでお得です。少しの現金を持っておくと安心です。',
    questions: [
      {
        id: 'rq-n4-07-1',
        questionJp: 'キャッシュレス決済のメリットとして書かれているものはどれですか？',
        questionEn: 'Which is listed as a benefit of cashless payments?',
        questionMy: 'ငွေသားမဲ့စနစ်၏ အကျိုးကျေးဇူးအဖြစ် ရေးသားထားသောအချက်မှာ အဘယ်နည်း။',
        options: [
          'スマートフォンの充電が長持ちすること',
          '小銭を出す必要がなくポイントが貯まること',
          'どんな場所でも必ず使えること',
          '現金が自動的に増えること',
        ],
        correctIndex: 1,
        explanation: 'Text cites: 「小銭を出す必要がありませんし...ポイントが貯まるのでお得」(No coins needed, points accumulate).',
        explanationMy: 'အကြွေစေ့ထုတ်စရာမလိုဘဲ အမှတ်များစုဆောင်းနိုင်သဖြင့် အကျိုးရှိသည်ဟူသော အချက်ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n4-07-2',
        questionJp: 'なぜ少しの現金を持っておくと安心ですか？',
        questionEn: 'Why is it reassuring to keep a little cash?',
        questionMy: 'အဘယ်ကြောင့် ငွေသားအနည်းငယ် ဆောင်ထားသင့်သနည်း။',
        options: [
          '充電が切れたり電波がない場所では使えないことがあるから',
          'お店で現金しか使えない法律があるから',
          '現金を使うと給料が増えるから',
          '銀行が休みになるから',
        ],
        correctIndex: 0,
        explanation: 'Reason given: 「充電が切れたり電波がない場所では使えないことがあるため」(Might not work if battery dies or no signal).',
        explanationMy: 'ဖုန်းအားကုန်သွားခြင်း သို့မဟုတ် လိုင်းမမိသောနေရာများတွင် သုံး၍မရနိုင်သောကြောင့် ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 8. Community & Society
  {
    id: 'r-n4-08',
    title: '地域の防災訓練と避難所マップ',
    titleEn: 'Community Disaster Drill and Evacuation Map',
    titleMy: 'ရပ်ရွာသဘာဝဘေးအန္တရာယ်ကာကွယ်ရေး လေ့ကျင့်မှုနှင့် ဘေးလွတ်ရာနေရာမြေပုံ',
    level: 'N4',
    topic: 'community',
    subtopic: 'Earthquake preparedness and evacuation shelters',
    learningObjectives: ['Read municipal disaster preparedness notices', 'Understand imperative and preparedness forms like ～ておく'],
    learningObjectivesMy: ['သဘာဝဘေးအန္တရာယ် ကြိုတင်ကာကွယ်ရေးဆိုင်ရာ ညွှန်ကြားချက်များကို ဖတ်တတ်စေရန်', 'ကြိုတင်ပြင်ဆင်မှုပြကြိယာ ～ておく ကို နားလည်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `[日本]{にほん}は[地震]{じしん}や[台風]{たいふう}などの[自然]{しぜん}[災害]{さいがい}が[多]{おお}い[国]{くに}です。
そのため、それぞれの[町]{まち}では[定期的]{ていきてき}に「[防災]{ぼうさい}[訓練]{くんれん}」を[実施]{じっし}しています。
今週の日曜日、午前９時から第一中学校の体育館で防災訓練を行います。
訓練では、地震が起きたときの初期消火や、ＡＥＤ（心肺蘇生装置）の使い方を学びます。
また、災害時にどこへ逃げればよいか「避難場所」を確認することも重要です。
家庭でも、３日分の水や食料、懐中電灯などをあらかじめ準備しておきましょう。
外国人住民の方も通訳スタッフがいますので、安心してご参加ください。`,
    passagePlain: `日本は地震や台風などの自然災害が多い国です。
そのため、それぞれの町では定期的に「防災訓練」を実施しています。
今週の日曜日、午前９時から第一中学校の体育館で防災訓練を行います。
訓練では、地震が起きたときの初期消火や、ＡＥＤ（心肺蘇生装置）の使い方を学びます。
また、災害時にどこへ逃げればよいか「避難場所」を確認することも重要です。
家庭でも、３日分の水や食料、懐中電灯などをあらかじめ準備しておきましょう。
外国人住民の方も通訳スタッフがいますので、安心してご参加ください。`,
    translationEn: `Japan is a country with many natural disasters such as earthquakes and typhoons. Therefore, each municipality regularly conducts "disaster prevention drills." This Sunday from 9:00 AM, a drill will be held in the gymnasium of Daiichi Junior High School. In the drill, participants will learn initial fire extinguishing when an earthquake occurs and how to use an AED (defibrillator). In addition, confirming "evacuation shelters" where one should escape during a disaster is also crucial. At home, please prepare three days' worth of water, food, and flashlights in advance. Interpreters will be available, so foreign residents can participate with peace of mind.`,
    translationMy: `ဂျပန်နိုင်ငံသည် ငလျင်နှင့် တိုင်ဖွန်းမုန်တိုင်းကဲ့သို့သော သဘာဝဘေးအန္တရာယ်များ မကြာခဏ ဖြစ်ပွားလေ့ရှိသော နိုင်ငံတစ်ခု ဖြစ်ပါသည်။ ထို့ကြောင့် မြို့နယ်တိုင်းတွင် "သဘာဝဘေးအန္တရာယ် ကာကွယ်ရေးလေ့ကျင့်မှု" များကို ပုံမှန်ပြုလုပ်လေ့ရှိပါသည်။ ယခုတစ်ပတ် တနင်္ဂနွေနေ့ နံနက် ၉ နာရီမှစတင်၍ အမှတ် (၁) အလယ်တန်းကျောင်း မိုးလုံလေလုံအားကစားရုံတွင် လေ့ကျင့်မှု ပြုလုပ်ပါမည်။ လေ့ကျင့်မှုတွင် ငလျင်လှုပ်ခတ်စဉ် မီးစတင်ငြှိမ်းသတ်နည်းနှင့် AED (နှလုံးပြန်လည်နှိုးဆွကိရိယာ) အသုံးပြုနည်းများကို သင်ယူရပါမည်။ ထို့အပြင် ဘေးဒုက္ခကြုံတွေ့ချိန်တွင် မည်သည့်နေရာသို့ ဘေးလွတ်ရာ ထွက်ပြေးခိုလှုံရမည်ဟူသော "ကယ်ဆယ်ရေးစခန်း" ကို ကြိုတင်သိရှိထားရန်လည်း အရေးကြီးပါသည်။ အိမ်တိုင်းတွင်လည်း ၃ ရက်စာ ရေသန့်၊ အစားအစာနှင့် လက်ကိုင်ဓာတ်မီးများကို ကြိုတင်ပြင်ဆင်ထားကြပါစို့။ နိုင်ငံခြားသားများအတွက်လည်း စကားပြန်များ ရှိပါသဖြင့် စိတ်ချလက်ချ ပါဝင်ဆင်နွှဲနိုင်ပါသည်။`,
    vocabularyList: [
      { word: '災害', reading: 'さいがい', meaning: 'disaster', meaningMy: 'သဘာဝဘေးအန္တရာယ်' },
      { word: '訓練', reading: 'くんれん', meaning: 'drill, training', meaningMy: 'လေ့ကျင့်မှု' },
      { word: '避難', reading: 'ひなん', meaning: 'evacuation', meaningMy: 'ဘေးလွတ်ရာ ရှောင်တိမ်းခြင်း' },
      { word: '準備', reading: 'じゅんび', meaning: 'preparation', meaningMy: 'ကြိုတင်ပြင်ဆင်မှု' },
    ],
    grammarPoints: [
      { grammar: '～ておく', meaning: 'do something in advance', meaningMy: 'ကြိုတင်၍ ...ထားသည်', explanation: 'Indicates preparatory action.', exampleJp: 'あらかじめ準備しておきましょう。' },
      { grammar: '～ため（原因・理由）', meaning: 'because of ~ / due to ~', meaningMy: '...ကြောင့်မို့ (အကြောင်းပြချက်)', explanation: 'Explains cause or rationale.', exampleJp: '自然災害が多いため、訓練を実施します。' },
    ],
    audioScript: '今週の日曜日に第一中学校で防災訓練を行います。地震が起きたときの初期消火や避難場所を確認します。３日分の水や食料を準備しておきましょう。',
    questions: [
      {
        id: 'rq-n4-08-1',
        questionJp: '防災訓練では何を学ぶことができますか？',
        questionEn: 'What can participants learn in the disaster drill?',
        questionMy: 'သဘာဝဘေးအန္တရာယ် လေ့ကျင့်မှုတွင် ဘာကို သင်ယူနိုင်သနည်း။',
        options: [
          '日本語の文法テストの解き方',
          '初期消火やＡＥＤの使い方',
          '外国語の歌を歌うこと',
          '美味しい料理の作り方',
        ],
        correctIndex: 1,
        explanation: 'The passage specifies: 「初期消火や、ＡＥＤの使い方を学びます」(Initial firefighting and AED usage).',
        explanationMy: 'စာပိုဒ်တွင် မီးစတင်ငြှိမ်းသတ်နည်းနှင့် AED အသုံးပြုနည်းဟု ဖော်ပြထားပါသည်။',
      },
      {
        id: 'rq-n4-08-2',
        questionJp: '家庭では何日分の水や食料を準備するべきですか？',
        questionEn: 'For how many days should families prepare food and water in advance?',
        questionMy: 'အိမ်တွင် အနည်းဆုံး ရက်မည်မျှစာ ရေနှင့် အစားအစာကို ကြိုတင်ပြင်ဆင်ထားသင့်သနည်း။',
        options: ['１日分', '３日分', '１週間分', '１か月分'],
        correctIndex: 1,
        explanation: 'Notice states: 「３日分の水や食料...を準備しておきましょう」(Prepare 3 days of water and food).',
        explanationMy: '"３日分の水や食料" အရ ၃ ရက်စာ ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 9. Environment & Sustainability
  {
    id: 'r-n4-09',
    title: 'レジ袋有料化とエコバッグ',
    titleEn: 'Plastic Bag Fees and Eco-Bags',
    titleMy: 'ပလတ်စတစ်အိတ် အခကြေးငွေကောက်ခံခြင်းနှင့် သဘာဝပတ်ဝန်းကျင်ထိန်း အိတ်',
    level: 'N4',
    topic: 'environment',
    subtopic: 'Marine pollution reduction and sustainability efforts',
    learningObjectives: ['Comprehend environmental policy texts on plastic waste', 'Understand cause-and-effect connectors like その結果'],
    learningObjectivesMy: ['ပလတ်စတစ်လျှော့ချရေး သဘာဝပတ်ဝန်းကျင်ထိန်းသိမ်းမှုဆိုင်ရာ စာများကို နားလည်စေရန်', 'အကျိုးဆက်ဖော်ပြချက် その結果 ကို သုံးတတ်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `２０２０[年]{ねん}から、[日本]{にほん}のスーパーやコンビニではプラスチックのレジ[袋]{ぶくろ}が[有料]{ゆうりょう}になりました。
プラスチックゴミが[海]{うみ}を[汚]{よご}し、[魚]{さかな}や[鳥]{とり}などの[生]{い}き[物]{もの}に[悪]{わる}い[影響]{えいきょう}を[与]{あた}えているからです。
[有料化]{ゆうりょうか}されたことによって、[買]{か}い[物]{もの}に[行]{い}くときに「エコバッグ」を[持参]{じさん}する[人]{ひと}が[大]{おお}きく[増]{ふ}えました。
その[結果]{けっか}、レジ[袋]{ぶくろ}を[辞退]{じたい}する[割合]{わりあい}は７０％を[超]{こ}えたと言われています。
一人ひとりの小さな行動が、地球の美しい自然を守ることにつながっています。`,
    passagePlain: `２０２０年から、日本のスーパーやコンビニではプラスチックのレジ袋が有料になりました。
プラスチックゴミが海を汚し、魚や鳥などの生き物に悪い影響を与えているからです。
有料化されたことによって、買い物に行くときに「エコバッグ」を持参する人が大きく増えました。
その結果、レジ袋を辞退する割合は７０％を超えたと言われています。
一人ひとりの小さな行動が、地球の美しい自然を守ることにつながっています。`,
    translationEn: `Since 2020, plastic shopping bags at Japanese supermarkets and convenience stores have been charged a fee. This is because plastic waste pollutes the ocean and exerts a harmful effect on creatures such as fish and birds. As a result of this fee policy, the number of people who bring their own "eco-bags" when shopping has increased substantially. Consequently, it is said that the percentage of people declining plastic bags has exceeded 70%. The small actions of each individual lead to protecting the Earth's beautiful nature.`,
    translationMy: `၂၀၂၀ ပြည့်နှစ်မှစတင်၍ ဂျပန်နိုင်ငံ၏ စူပါမားကတ်များနှင့် ကွန်ဗီးနီးယန့်စတိုးများတွင် ပလတ်စတစ်ဈေးဝယ်အိတ်များကို အခကြေးငွေ ကောက်ခံခဲ့ပါသည်။ ပလတ်စတစ်အမှိုက်များသည် သမုဒ္ဒရာပင်လယ်ကို ညစ်ညမ်းစေပြီး ငါးများနှင့် ငှက်များကဲ့သို့သော သက်ရှိသတ္တဝါများအပေါ် ဆိုးကျိုးသက်ရောက်စေသောကြောင့် ဖြစ်ပါသည်။ အခကြေးငွေသတ်မှတ်လိုက်ခြင်းကြောင့် ဈေးဝယ်သွားသည့်အခါ ကိုယ်ပိုင် "အီကိုအိတ်" (Eco-bag) ကို ယူဆောင်လာသူဦးရေသည် အလွန်များပြားလာခဲ့ပါသည်။ ထိုရလဒ်ကြောင့် စတိုးဆိုင်များတွင် ပလတ်စတစ်အိတ်မယူဘဲ ငြင်းပယ်သည့် ရာခိုင်နှုန်းသည် ၇၀% ကျော်လွန်သွားပြီဟု ဆိုကြပါသည်။ လူတစ်ဦးချင်းစီ၏ သေးငယ်သော လုပ်ဆောင်ချက်သည် ကမ္ဘာမြေ၏ သာယာလှပသော သဘာဝပတ်ဝန်းကျင်ကို ကာကွယ်စောင့်ရှောက်ခြင်းဆီသို့ ဦးတည်စေပါသည်။`,
    vocabularyList: [
      { word: '有料', reading: 'ゆうりょう', meaning: 'fee-charging, not free', meaningMy: 'အခကြေးငွေရှိသော' },
      { word: '影響', reading: 'えいきょう', meaning: 'influence, impact', meaningMy: 'လွှမ်းမိုးမှု၊ သက်ရောက်မှု' },
      { word: '持参', reading: 'じさん', meaning: 'bringing along', meaningMy: 'ယူဆောင်လာခြင်း' },
      { word: '辞退', reading: 'じたい', meaning: 'declining, refusing', meaningMy: 'ငြင်းပယ်ခြင်း' },
    ],
    grammarPoints: [
      { grammar: '～ことによって', meaning: 'through ~ / as a result of ~', meaningMy: '...ပြုလုပ်ခြင်းအားဖြင့် / ...ကြောင့်', explanation: 'Expresses cause, method, or agency.', exampleJp: '有料化されたことによって、エコバッグを持つ人が増えました。' },
      { grammar: '～と言われている', meaning: 'it is said that ~', meaningMy: '...ဟု ပြောစမှတ်ပြုကြသည်', explanation: 'Passive reporting expression.', exampleJp: '７０％を超えたと言われています。' },
    ],
    audioScript: '２０２０年からレジ袋が有料になりました。エコバッグを持参する人が増え、レジ袋を辞退する割合は７０％を超えました。小さな行動が自然を守ることにつながります。',
    questions: [
      {
        id: 'rq-n4-09-1',
        questionJp: 'なぜレジ袋を有料にしたのですか？',
        questionEn: 'Why was a fee placed on plastic bags?',
        questionMy: 'အဘယ်ကြောင့် ပလတ်စတစ်အိတ်ကို အခကြေးငွေ ကောက်ခံခဲ့သနည်း။',
        options: [
          'プラスチックの値段が高騰したから',
          'プラスチックゴミが海や生き物に悪い影響を与えるから',
          'お店の利益を増やすためだけのため',
          '紙袋をたくさん売りたいから',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「プラスチックゴミが海を汚し、生き物に悪い影響を与えているからです」(Pollutes ocean, harms creatures).',
        explanationMy: 'ပလတ်စတစ်အမှိုက်များသည် ပင်လယ်ကို ညစ်ညမ်းစေပြီး သက်ရှိများကို ဆိုးကျိုးဖြစ်စေသောကြောင့် ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n4-09-2',
        questionJp: 'レジ袋の有料化によって何が変わりましたか？',
        questionEn: 'What changed as a result of charging for plastic bags?',
        questionMy: 'ပလတ်စတစ်အိတ် အခကြေးငွေ ကောက်ခံမှုကြောင့် မည်သည့်အရာ ပြောင်းလဲသွားသနည်း။',
        options: [
          '買い物をやめる人が増えた',
          'エコバッグを持つ人が増え、レジ袋を断る人が７０％を超えた',
          '海に魚がいなくなった',
          'すべてのスーパーが閉店した',
        ],
        correctIndex: 1,
        explanation: 'Sentence says: 「エコバッグを持参する人が大きく増え...７０％を超えた」(Eco-bags increased, declining exceeded 70%).',
        explanationMy: 'အီကိုအိတ် ဆောင်သူများပြားလာပြီး အိတ်ငြင်းပယ်သူ ၇၀% ကျော်လာခဲ့ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 10. News & Current Events
  {
    id: 'r-n4-10',
    title: '地方移住と新しい働き方',
    titleEn: 'Relocating to Regional Areas and New Ways of Working',
    titleMy: 'နယ်မြို့များသို့ ပြောင်းရွှေ့နေထိုင်ခြင်းနှင့် အလုပ်လုပ်ပုံပုံစံသစ်',
    level: 'N4',
    topic: 'news',
    subtopic: 'Telework and escaping metropolitan congestion',
    learningObjectives: ['Read news articles discussing telecommuting and lifestyle shifts', 'Understand contrasting ideas with 一方で (on the other hand)'],
    learningObjectivesMy: ['အွန်လိုင်းမှ အဝေးရောက်အလုပ်လုပ်ခြင်းဆိုင်ရာ သတင်းများကို နားလည်စေရန်', 'ဆန့်ကျင်ဘက်ဖော်ပြချက် 一方で ကို သုံးတတ်စေရန်'],
    difficultyRating: 2,
    estimatedReadingTimeMinutes: 4,
    length: 'medium',
    passage: `[最近]{さいきん}、[東京]{とうきょう}などの[大都市]{だいとし}から[自然]{しぜん}が[豊]{ゆた}かな[地方]{ちほう}へ[引]{ひ}っ[越]{こ}す[若]{わか}い[世代]{せだい}が[増]{ふ}えています。
インターネットを[使]{つか}って[自宅]{じたく}で[仕事]{しごと}ができる「テレワーク（[在宅]{ざいたく}[勤務]{きんむ}）」が[広]{ひろ}まったため、[満員]{まんいん}[電車]{でんしゃ}に乗って[会社]{かいしゃ}へ[通勤]{つうきん}しなくてもよくなったからです。
[地方]{ちほう}では[家賃]{やちん}が[安]{やす}く、[広]{ひろ}い[家]{いえ}に[住]{す}むことができます。また、[新鮮]{しんせん}な[野菜]{やさい}や[空気]{くうき}を[楽]{たの}しむことができます。
[一方]{いっぽう}で、[車]{くるま}がないと[生活]{せいかつ}が[不便]{ふべん}だったり、[病院]{びょういん}が[遠]{とお}かったりする[課題]{かだい}もあります。
[自分]{じぶん}のライフスタイルに[合]{あ}った[暮]{く}らし[方]{かた}を[選]{えら}ぶことが[大切]{たいせつ}です。`,
    passagePlain: `最近、東京などの大都市から自然が豊かな地方へ引っ越す若い世代が増えています。
インターネットを使って自宅で仕事ができる「テレワーク（在宅勤務）」が広まったため、満員電車に乗って会社へ通勤しなくてもよくなったからです。
地方では家賃が安く、広い家に住むことができます。また、新鮮な野菜や空気を楽しむことができます。
一方で、車がないと生活が不便だったり、病院が遠かったりする課題もあります。
自分のライフスタイルに合った暮らし方を選ぶことが大切です。`,
    translationEn: `Recently, younger generations relocating from big cities like Tokyo to regional areas rich in nature are increasing. This is because "telework" (working from home) using the internet has become widespread, meaning people no longer need to commute to the office on packed trains. In the countryside, rent is cheap, and one can live in a spacious house. Furthermore, one can enjoy fresh vegetables and clean air. On the other hand, there are also challenges, such as life being inconvenient without a car and hospitals being far away. Choosing a way of living that matches one's own lifestyle is important.`,
    translationMy: `မကြာသေးမီက တိုကျိုကဲ့သို့သော မြို့ကြီးများမှ သဘာဝတရားဖြင့် ပြည့်စုံသော နယ်မြို့လေးများသို့ ပြောင်းရွှေ့နေထိုင်ကြသည့် လူငယ်မျိုးဆက်သစ်များ တိုးပွားလာနေပါသည်။ အင်တာနက်ကို အသုံးပြု၍ နေအိမ်မှ အလုပ်လုပ်နိုင်သော "တယ်လီဝပ်ခ်" (အိမ်မှအလုပ်လုပ်ခြင်းစနစ်) ကျယ်ပြန့်လာသောကြောင့် လူကြပ်သောရထားကြီးများ စီးကာ ရုံးသို့ အလုပ်သွားစရာမလိုတော့သောကြောင့် ဖြစ်ပါသည်။ နယ်မြို့များတွင် အိမ်ငှားခ သက်သာပြီး ကျယ်ဝန်းသော အိမ်များတွင် နေထိုင်နိုင်ပါသည်။ ထို့အပြင် လတ်ဆတ်သော ဟင်းသီးဟင်းရွက်များနှင့် သန့်ရှင်းသော လေကောင်းလေသန့်ကို ခံစားရရှိနိုင်ပါသည်။ အခြားတစ်ဖက်တွင်လည်း ကားမရှိပါက နေထိုင်ရ ခက်ခဲခြင်းနှင့် ဆေးရုံဆေးခန်းများ အလှမ်းဝေးခြင်း စသည့် စိန်ခေါ်မှုများလည်း ရှိပါသည်။ မိမိ၏ ဘဝနေထိုင်မှုပုံစံနှင့် ကိုက်ညီသော လူနေမှုဘဝကို ရွေးချယ်တတ်ရန် အလွန်အရေးကြီးပါသည်။`,
    vocabularyList: [
      { word: '移住', reading: 'いじゅう', meaning: 'migration, relocation', meaningMy: 'ပြောင်းရွှေ့အခြေချခြင်း' },
      { word: '在宅勤務', reading: 'ざいたくきんむ', meaning: 'working from home, telework', meaningMy: 'နေအိမ်မှ အလုပ်လုပ်ခြင်း' },
      { word: '満員電車', reading: 'まんいんでんしゃ', meaning: 'packed/crowded train', meaningMy: 'လူပြည့်ကျပ်နေသောရထား' },
      { word: '課題', reading: 'かだい', meaning: 'challenge, problem to solve', meaningMy: 'စိန်ခေါ်မှု၊ ဖြေရှင်းရန်ပြဿနာ' },
    ],
    grammarPoints: [
      { grammar: '～なくてもよくなった', meaning: 'no longer have to do ~', meaningMy: '...လုပ်စရာ မလိုတော့ပါ', explanation: 'Expresses relief from a previous obligation.', exampleJp: '満員電車で通勤しなくてもよくなりました。' },
      { grammar: '～一方で', meaning: 'on the other hand ~', meaningMy: 'အခြားတစ်ဖက်တွင်လည်း...', explanation: 'Presents contrasting aspects of a situation.', exampleJp: '新鮮な空気を楽しめる一方で、車がないと不便です。' },
    ],
    audioScript: '大都市から地方へ移住する若者が増えています。テレワークで満員電車に乗らなくてもよくなりました。地方は家賃が安く広い家に住めますが、車が必要な場合もあります。',
    questions: [
      {
        id: 'rq-n4-10-1',
        questionJp: 'なぜ若い人たちが地方へ引っ越すことができるようになりましたか？',
        questionEn: 'Why have young people become able to move to regional areas?',
        questionMy: 'လူငယ်များသည် အဘယ်ကြောင့် နယ်မြို့များသို့ ပြောင်းရွှေ့နိုင်လာကြသနည်း။',
        options: [
          '大都市の会社がすべて倒産したから',
          'テレワークが広まり満員電車で通勤しなくてよくなったから',
          '地方のほうが給料が２倍高いから',
          '電車の切符が無料になったから',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「テレワークが広まったため、満員電車に乗って...通勤しなくてもよくなったからです」(Telework expanded, no commuting).',
        explanationMy: 'တယ်လီဝပ်ခ်စနစ် ကျယ်ပြန့်လာပြီး လူကြပ်သောရထားများ စီးစရာမလိုတော့သောကြောင့် ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n4-10-2',
        questionJp: '地方で暮らすときの課題として何が挙げられていますか？',
        questionEn: 'What is listed as a challenge when living in regional areas?',
        questionMy: 'နယ်တွင် နေထိုင်ရာတွင် ကြုံတွေ့ရသော စိန်ခေါ်မှုအဖြစ် မည်သည့်အရာကို ဖော်ပြထားသနည်း။',
        options: [
          '野菜が不味いこと',
          '家賃が東京より高いこと',
          '車がないと不便だったり病院が遠かったりすること',
          'インターネットが一切使えないこと',
        ],
        correctIndex: 2,
        explanation: 'Passage mentions: 「車がないと生活が不便だったり、病院が遠かったりする課題もあります」(Inconvenient without car, distant hospitals).',
        explanationMy: 'ကားမရှိပါက သွားလာရခက်ခဲခြင်းနှင့် ဆေးရုံဆေးခန်းများ ဝေးကွာခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },
];

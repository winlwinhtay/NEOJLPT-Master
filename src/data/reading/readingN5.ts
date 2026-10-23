import { UniversityReadingExercise } from '../../types/readingCurriculum';

export const READING_N5_EXERCISES: UniversityReadingExercise[] = [
  // 1. Daily Life
  {
    id: 'r-n5-01',
    title: '田中さんの一日',
    titleEn: "Mr. Tanaka's Daily Routine",
    titleMy: 'တနခဆန်၏ တစ်နေ့တာ အလုပ်လုပ်ပုံနှင့် ဘဝ',
    level: 'N5',
    topic: 'daily_life',
    subtopic: 'Morning routine and commute',
    learningObjectives: ['Describe daily schedules using time particles に and から...まで', 'Identify sequence using ～てから'],
    learningObjectivesMy: ['အချိန်ပြဝိဘတ် に နှင့် から...まで ကို သုံးတတ်စေရန်', '～てから ဖြင့် အစီအစဉ်ဖော်ပြတတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `[田中]{たなか}さんは[毎朝]{まいあさ}６[時]{じ}に[起]{お}きます。
[顔]{かお}を[洗]{あら}ってから、パンと[卵]{たまご}を[食]{た}べます。
そして、コーヒーを[飲]{の}みます。[朝]{あさ}７[時]{じ}[半]{はん}に[電車]{でんしゃ}で[会社]{かいしゃ}へ[行]{い}きます。
[会社]{かいしゃ}は８[時]{じ}から５[時]{じ}までです。
[夜]{よる}は[家]{いえ}で[本]{ほん}を[読]{よ}んだり、テレビを[見]{み}たりします。
１１[時]{じ}に[寝]{ね}ます。`,
    passagePlain: `田中さんは毎朝６時に起きます。
顔を洗ってから、パンと卵を食べます。
そして、コーヒーを飲みます。朝７時半に電車で会社へ行きます。
会社は８時から５時までです。
夜は家で本を読んだり、テレビを見たりします。
１１時に寝ます。`,
    translationEn: `Mr. Tanaka wakes up at 6:00 every morning. After washing his face, he eats bread and eggs. Then, he drinks coffee. At 7:30 in the morning, he goes to his company by train. Work is from 8:00 to 5:00. In the evening, he reads books and watches TV at home. He goes to bed at 11:00.`,
    translationMy: `တနခဆန်သည် နေ့တိုင်း မနက် ၆ နာရီတွင် အိပ်ရာထပါသည်။ မျက်နှာသစ်ပြီးနောက် ပေါင်မုန့်နှင့် ကြက်ဥကို စားပါသည်။ ထို့နောက် ကော်ဖီသောက်ပါသည်။ မနက် ၇ နာရီခွဲတွင် ရထားဖြင့် ကုမ္ပဏီသို့ သွားပါသည်။ အလုပ်ချိန်မှာ မနက် ၈ နာရီမှ ညနေ ၅ နာရီအထိ ဖြစ်ပါသည်။ ညဘက်တွင် အိမ်၌ စာအုပ်ဖတ်ခြင်း၊ တီဗီကြည့်ခြင်းများ ပြုလုပ်ပါသည်။ ည ၁၁ နာရီတွင် အိပ်ပါသည်။`,
    vocabularyList: [
      { word: '毎朝', reading: 'まいあさ', meaning: 'every morning', meaningMy: 'မနက်တိုင်း' },
      { word: '洗う', reading: 'あらう', meaning: 'to wash', meaningMy: 'ဆေးကြောသည်' },
      { word: '会社', reading: 'かいしゃ', meaning: 'company, office', meaningMy: 'ကုမ္ပဏီ' },
      { word: '寝る', reading: 'ねる', meaning: 'to go to bed, sleep', meaningMy: 'အိပ်စက်သည်' },
    ],
    grammarPoints: [
      { grammar: '～てから', meaning: 'after doing ~', meaningMy: '...ပြီးနောက်', explanation: 'Indicates the chronological order of two actions.', exampleJp: '顔を洗ってから、ご飯を食べます。' },
      { grammar: '～から～まで', meaning: 'from ~ to ~', meaningMy: '...မှ ...အထိ', explanation: 'Marks start and end times or locations.', exampleJp: '８時から５時までです。' },
    ],
    audioScript: '田中さんは毎朝６時に起きます。顔を洗ってから、パンと卵を食べます。そして、コーヒーを飲みます。朝７時半に電車で会社へ行きます。会社は８時から５時までです。夜は家で本を読んだり、テレビを見たりします。１１時に寝ます。',
    questions: [
      {
        id: 'rq-n5-01-1',
        questionJp: '田中さんは朝ご飯に何を食べますか？',
        questionEn: 'What does Mr. Tanaka eat for breakfast?',
        questionMy: 'တနခဆန်သည် မနက်စာအတွက် ဘာစားသလဲ။',
        options: ['ご飯と魚', 'パンと卵', 'ラーメン', '何も食べない'],
        correctIndex: 1,
        explanation: 'The passage explicitly states: 「パンと卵を食べます」(He eats bread and eggs).',
        explanationMy: 'စာပိုဒ်တွင် "パンと卵を食べます" (ပေါင်မုန့်နှင့် ကြက်ဥစားသည်) ဟု ရှင်းလင်းစွာ ဖော်ပြထားပါသည်။',
      },
      {
        id: 'rq-n5-01-2',
        questionJp: '田中さんはどうやって会社へ行きますか？',
        questionEn: 'How does Mr. Tanaka go to the company?',
        questionMy: 'တနခဆန်သည် ကုမ္ပဏီသို့ မည်သို့သွားသလဲ။',
        options: ['バスで', '歩いて', '電車で', '車で'],
        correctIndex: 2,
        explanation: 'The passage states: 「電車で会社へ行きます」(He goes to the company by train).',
        explanationMy: 'စာပိုဒ်တွင် "電車で会社へ行きます" (ရထားဖြင့် သွားသည်) ဟု ပါရှိပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 2. School & Education
  {
    id: 'r-n5-02',
    title: '日本語の教室',
    titleEn: 'Japanese Language Classroom',
    titleMy: 'ဂျပန်စာသင်ခန်း',
    level: 'N5',
    topic: 'school',
    subtopic: 'Classroom rules and classmates',
    learningObjectives: ['Understand classroom instructions and descriptions of classmates', 'Use location words and existential verbs います/あります'],
    learningObjectivesMy: ['စာသင်ခန်းသုံးစကားများနှင့် အတန်းဖော်များအကြောင်း နားလည်စေရန်', 'တည်ရှိမှုပြကြိယာ います/あります ကို သုံးတတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `ここはさくら[日本語学校]{にほんごがっこう}の[教室]{きょうしつ}です。
[教室]{きょうしつ}の中に[学生]{がくせい}が１０[人]{にん}います。
アメリカの[人]{ひと}やベトナムの[人]{ひと}やミャンマーの[人]{ひと}がいます。
[先生]{せんせい}は[前]{まえ}に[立]{た}って、ひらがなを[教]{おし}えます。
[学生]{がくせい}はノートに[漢字]{かんじ}を[書]{か}きます。
[授業]{じゅぎょう}は９[時]{じ}から１２[時]{じ}[半]{はん}までです。みんな[真面目]{まじめ}に[勉強]{べんきょう}しています。`,
    passagePlain: `ここはさくら日本語学校の教室です。
教室の中に学生が１０人います。
アメリカの人やベトナムの人やミャンマーの人がいます。
先生は前に立って、ひらがなを教えます。
学生はノートに漢字を書きます。
授業は９時から１２時半までです。みんな真面目に勉強しています。`,
    translationEn: `This is a classroom at Sakura Japanese Language School. There are 10 students inside the classroom. There are people from America, Vietnam, and Myanmar. The teacher stands in front and teaches hiragana. The students write kanji in their notebooks. Class is from 9:00 to 12:30. Everyone is studying earnestly.`,
    translationMy: `ဤနေရာသည် ဆာကူရာဂျပန်စာသင်ကျောင်း၏ စာသင်ခန်းဖြစ်ပါသည်။ စာသင်ခန်းထဲတွင် ကျောင်းသား ၁၀ ယောက်ရှိပါသည်။ အမေရိကန်လူမျိုး၊ ဗီယက်နမ်လူမျိုးနှင့် မြန်မာလူမျိုးများ ရှိကြပါသည်။ ဆရာမသည် ရှေ့တွင်ရပ်၍ ဟိရဂနကို သင်ကြားပေးပါသည်။ ကျောင်းသားများသည် ဗလာစာအုပ်ထဲတွင် ခန်းဂျီးကို ရေးကြပါသည်။ သင်ခန်းစာသည် မနက် ၉ နာရီမှ နေ့လယ် ၁၂ နာရီခွဲအထိ ဖြစ်ပါသည်။ အားလုံး ကြိုးကြိုးစားစား စာသင်ယူနေကြပါသည်။`,
    vocabularyList: [
      { word: '教室', reading: 'きょうしつ', meaning: 'classroom', meaningMy: 'စာသင်ခန်း' },
      { word: '教える', reading: 'おしえる', meaning: 'to teach', meaningMy: 'သင်ကြားပေးသည်' },
      { word: '授業', reading: 'じゅぎょう', meaning: 'class, lesson', meaningMy: 'အတန်း၊ စာသင်ချိန်' },
      { word: '真面目', reading: 'まじめ', meaning: 'serious, earnest', meaningMy: 'ရိုးသားကြိုးစားသော' },
    ],
    grammarPoints: [
      { grammar: '場所 + に + 人/物 + がいます/あります', meaning: 'there is/are ~ at [place]', meaningMy: '[နေရာ] တွင် ... ရှိသည်', explanation: 'Expresses the presence of living beings (います) or inanimate items (あります).', exampleJp: '教室の中に学生が１０人います。' },
      { grammar: '～ています', meaning: 'currently doing ~', meaningMy: '...နေသည် (လက်ရှိပြုလုပ်ဆဲ)', explanation: 'Present continuous action.', exampleJp: '真面目に勉強しています。' },
    ],
    audioScript: 'ここはさくら日本語学校の教室です。教室の中に学生が１０人います。先生は前に立って、ひらがなを教えます。学生はノートに漢字を書きます。授業は９時から１２時半までです。',
    questions: [
      {
        id: 'rq-n5-02-1',
        questionJp: '教室には何人の学生がいますか？',
        questionEn: 'How many students are in the classroom?',
        questionMy: 'စာသင်ခန်းထဲတွင် ကျောင်းသား မည်မျှရှိသလဲ။',
        options: ['５人', '８人', '１０人', '１２人'],
        correctIndex: 2,
        explanation: 'The text clearly states: 「学生が１０人います」(There are 10 students).',
        explanationMy: 'စာပိုဒ်တွင် "学生が１０人います" (ကျောင်းသား ၁၀ ယောက်ရှိသည်) ဟု အတိအလင်း ပါရှိပါသည်။',
      },
      {
        id: 'rq-n5-02-2',
        questionJp: '授業は何時に終わりますか？',
        questionEn: 'What time does the class end?',
        questionMy: 'စာသင်ချိန်သည် မည်သည့်အချိန်တွင် ပြီးသလဲ။',
        options: ['９時', '１２時', '１２時半', '１時'],
        correctIndex: 2,
        explanation: 'The sentence says: 「授業は９時から１２時半までです」(Class is from 9:00 to 12:30).',
        explanationMy: '"１２時半までです" အရ နေ့လယ် ၁၂ နာရီခွဲတွင် ပြီးဆုံးပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 3. Culture & Traditions
  {
    id: 'r-n5-03',
    title: '日本のお正月',
    titleEn: 'Japanese New Year',
    titleMy: 'ဂျပန်နှစ်သစ်ကူးပွဲတော်',
    level: 'N5',
    topic: 'culture',
    subtopic: 'New Year traditions and food',
    learningObjectives: ['Learn cultural vocabulary about Oshogatsu', 'Understand calendar time markers (１月１日)'],
    learningObjectivesMy: ['ဂျပန်နှစ်သစ်ကူးဆိုင်ရာ ဝေါဟာရများကို နားလည်စေရန်', 'ရက်စွဲပြဝေါဟာရများကို သုံးတတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `１[月]{がつ}１[日]{ついたち}は「お[正月]{しょうがつ}」です。[日本]{にほん}でとても[大切]{たいせつ}な[日]{ひ}です。
[家族]{かぞく}みんなで「おせち[料理]{りょうり}」という[特別]{とくべつ}な[料理]{りょうり}を[食]{た}べます。
そして、[神社]{じんじゃ}やお[寺]{てら}へ「[初詣]{はつもうで}」に[行]{い}きます。
[新]{あたら}しい[年]{とし}の[健康]{けんこう}と[幸福]{しあわせ}を[祈]{いの}ります。
[子]{こ}どもたちは大人から「お[年玉]{としだま}」というお金をもらいます。とてもうれしいです。`,
    passagePlain: `１月１日は「お正月」です。日本でとても大切な日です。
家族みんなでおせち料理という特別な料理を食べます。
そして、神社やお寺へ「初詣」に行きます。
新しい年の健康と幸福を祈ります。
子どもたちは大人から「お年玉」というお金をもらいます。とてもうれしいです。`,
    translationEn: `January 1st is "Oshogatsu" (New Year). It is a very important day in Japan. The entire family eats a special meal called "Osechi ryori." Then, they go to shrines or temples for "Hatsumode" (the first shrine visit of the year). They pray for health and happiness in the new year. Children receive money called "Otoshidama" from adults. They are very happy.`,
    translationMy: `ဇန်နဝါရီလ ၁ ရက်နေ့သည် "အိုရှောဂဆွတ်" (နှစ်သစ်ကူးနေ့) ဖြစ်ပါသည်။ ဂျပန်နိုင်ငံတွင် အလွန်အရေးပါသော နေ့တစ်နေ့ဖြစ်ပါသည်။ မိသားစုအားလုံး စုဝေးပြီး "အိုဆဲချိရိုးရိ" ဟုခေါ်သော အထူးရိုးရာဟင်းလျာများကို စားကြပါသည်။ ထို့နောက် ဘုရားကျောင်း သို့မဟုတ် ဘုန်းကြီးကျောင်းသို့ "ဟဆွတ်မောဒဲ" (နှစ်ဦးဘုရားဖူး) သွားကြပါသည်။ နှစ်သစ်တွင် ကျန်းမာပျော်ရွှင်စေရန် ဆုတောင်းကြပါသည်။ ကလေးများသည် လူကြီးများထံမှ "အိုသိုရှိဒမ" ဟုခေါ်သော မုန့်ဖိုးငွေ ရရှိကြသဖြင့် အလွန်ပျော်ရွှင်ကြပါသည်။`,
    vocabularyList: [
      { word: 'お正月', reading: 'おしょうがつ', meaning: 'New Year', meaningMy: 'ဂျပန်နှစ်သစ်ကူး' },
      { word: '大切', reading: 'たいせつ', meaning: 'important', meaningMy: 'အရေးကြီးသော' },
      { word: '神社', reading: 'じんじゃ', meaning: 'Shinto shrine', meaningMy: 'ရှင်တိုဘုရားကျောင်း' },
      { word: '祈る', reading: 'いのる', meaning: 'to pray', meaningMy: 'ဆုတောင်းသည်' },
    ],
    grammarPoints: [
      { grammar: '～という + 名詞', meaning: 'called / named ~', meaningMy: '...ဟုခေါ်သော [နာမ်]', explanation: 'Introduces a name or definition.', exampleJp: 'おせち料理という特別な料理を食べます。' },
      { grammar: '～に 行く', meaning: 'go in order to ~', meaningMy: '...ပြုလုပ်ရန် သွားသည်', explanation: 'Indicates the purpose of movement.', exampleJp: '初詣に行きます。' },
    ],
    audioScript: '１月１日はお正月です。日本でとても大切な日です。家族みんなでおせち料理という特別な料理を食べます。そして、神社やお寺へ初詣に行きます。',
    questions: [
      {
        id: 'rq-n5-03-1',
        questionJp: 'お正月に家族で何をしますか？',
        questionEn: 'What does the family do during New Year?',
        questionMy: 'နှစ်သစ်ကူးတွင် မိသားစုနှင့်အတူ ဘာလုပ်ကြသလဲ။',
        options: ['おせち料理を食べる', '海へ泳ぎに行く', '学校でテストを受ける', '仕事をする'],
        correctIndex: 0,
        explanation: 'The text notes: 「おせち料理という特別な料理を食べます」(They eat a special meal called osechi).',
        explanationMy: 'စာပိုဒ်တွင် "おせち料理を食べます" (အိုဆဲချိဟင်းလျာစားသည်) ဟု ဖော်ပြထားပါသည်။',
      },
      {
        id: 'rq-n5-03-2',
        questionJp: '子どもたちは大人から何をもらいますか？',
        questionEn: 'What do children receive from adults?',
        questionMy: 'ကလေးများသည် လူကြီးများထံမှ ဘာလက်ခံရရှိသလဲ။',
        options: ['お菓子', '新しい本', 'お年玉というお金', '洋服'],
        correctIndex: 2,
        explanation: 'Children receive money called "Otoshidama" (「お年玉というお金」).',
        explanationMy: '"お年玉というお金をもらいます" အရ မုန့်ဖိုးငွေ ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 4. Food & Dining
  {
    id: 'r-n5-04',
    title: '私の好きな日本食',
    titleEn: 'My Favorite Japanese Food',
    titleMy: 'ကျွန်တော် အကြိုက်ဆုံး ဂျပန်အစားအစာ',
    level: 'N5',
    topic: 'food',
    subtopic: 'Ramen and restaurant ordering',
    learningObjectives: ['Express likes and preferences using ～が好きです', 'Describe taste and price with basic i-adjectives'],
    learningObjectivesMy: ['～が好きです ဖြင့် နှစ်သက်မှုကို ဖော်ပြတတ်စေရန်', 'အရသာနှင့် ဈေးနှုန်းပြ နာမဝိသေသနများကို သုံးတတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `私は[日本料理]{にほんりょうり}が[大好]{だいす}きです。特にラーメンが一番好きです。
[駅]{えき}の[近]{ちか}くに小さくておいしいラーメン[屋]{や}があります。
そこのラーメンは[一杯]{いっぱい}７００[円]{えん}で、とても[安]{やす}いです。
スープは温かくて、[肉]{にく}と[野菜]{やさい}がたくさん入っています。
[毎週]{まいしゅう}[金曜日]{きんようび}の[夜]{よる}、[友達]{ともだち}と[一緒]{いっしょ}に食べに行きます。
[店員]{てんいん}さんもいつも親切です。`,
    passagePlain: `私は日本料理が大好きです。特にラーメンが一番好きです。
駅の近くに小さくておいしいラーメン屋があります。
そこのラーメンは一杯７００円で、とても安いです。
スープは温かくて、肉と野菜がたくさん入っています。
毎週金曜日の夜、友達緒に食べに行きます。
店員さんもいつも親切です。`,
    translationEn: `I love Japanese food. In particular, ramen is my favorite. Near the station, there is a small and delicious ramen shop. The ramen there is 700 yen per bowl and very cheap. The soup is warm, and it has plenty of meat and vegetables. Every Friday night, I go to eat there together with my friend. The staff are always kind too.`,
    translationMy: `ကျွန်တော်သည် ဂျပန်အစားအစာကို အလွန်ကြိုက်ပါသည်။ အထူးသဖြင့် ခေါက်ဆွဲပြုတ် (ရာမင်) ကို အကြိုက်ဆုံးဖြစ်ပါသည်။ ဘူတာအနီးတွင် သေးငယ်ပြီး အရသာရှိသော ရာမင်ဆိုင်လေးတစ်ဆိုင် ရှိပါသည်။ ထိုဆိုင်၏ ရာမင်တစ်ပွဲလျှင် ယန်း ၇၀၀ မျှသာရှိပြီး အလွန်သက်သာပါသည်။ ဟင်းရည်သည် ပူပူနွေးနွေးရှိပြီး အသားနှင့် အသီးအရွက်များစွာ ပါဝင်ပါသည်။ သောကြာနေ့ညတိုင်း သူငယ်ချင်းနှင့်အတူ သွားစားလေ့ရှိပါသည်။ ဆိုင်ဝန်ထမ်းများလည်း အမြဲတမ်းဖော်ရွေကြပါသည်။`,
    vocabularyList: [
      { word: '特に', reading: 'とくに', meaning: 'especially, in particular', meaningMy: 'အထူးသဖြင့်' },
      { word: '温かい', reading: 'あたたかい', meaning: 'warm', meaningMy: 'နွေးထွေးသော' },
      { word: '一緒', reading: 'いっしょ', meaning: 'together', meaningMy: 'အတူတူ' },
      { word: '親切', reading: 'しんせつ', meaning: 'kind, polite', meaningMy: 'ကြင်နာဖော်ရွေသော' },
    ],
    grammarPoints: [
      { grammar: '～が 一番 好きです', meaning: 'like ~ best of all', meaningMy: '...ကို အကြိုက်ဆုံးဖြစ်သည်', explanation: 'Expresses superlatives in preference.', exampleJp: 'ラーメンが一番好きです。' },
      { grammar: '～くて (形容詞の接続)', meaning: 'and (connecting i-adjectives)', meaningMy: '...ပြီး (...ပါသည်)', explanation: 'Joins adjectives: 温かい → 温かくて.', exampleJp: 'スープは温かくて、おいしいです。' },
    ],
    audioScript: '私は日本料理が大好きです。特にラーメンが一番好きです。駅の近くに小さくておいしいラーメン屋があります。そこのラーメンは一杯７００円で、とても安いです。',
    questions: [
      {
        id: 'rq-n5-04-1',
        questionJp: 'ラーメンは一杯いくらですか？',
        questionEn: 'How much is one bowl of ramen?',
        questionMy: 'ရာမင်တစ်ပွဲလျှင် မည်မျှကျသင့်သလဲ။',
        options: ['５００円', '７００円', '９００円', '１０００円'],
        correctIndex: 1,
        explanation: 'The passage explicitly says: 「一杯７００円で」(700 yen per bowl).',
        explanationMy: 'စာပိုဒ်တွင် "一杯７００円で" (တစ်ပွဲ ယန်း ၇၀၀) ဟု ဖော်ပြထားပါသည်။',
      },
      {
        id: 'rq-n5-04-2',
        questionJp: 'いつ友達と食べに行きますか？',
        questionEn: 'When does the author go to eat with friends?',
        questionMy: 'စာရေးသူသည် မည်သည့်အချိန်တွင် သူငယ်ချင်းနှင့် သွားစားသလဲ။',
        options: ['日曜日の朝', '水曜日の昼', '金曜日の夜', '毎日の夜'],
        correctIndex: 2,
        explanation: 'Sentence says: 「毎週金曜日の夜、友達と一緒に食べに行きます」(Every Friday night).',
        explanationMy: '"毎週金曜日の夜" အရ သောကြာနေ့ညတိုင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 5. Travel & Transport
  {
    id: 'r-n5-05',
    title: '京都への旅行',
    titleEn: 'Trip to Kyoto',
    titleMy: 'ကျိုတိုမြို့သို့ အလည်အပတ်ခရီး',
    level: 'N5',
    topic: 'travel',
    subtopic: 'Shinkansen and sightseeing',
    learningObjectives: ['Describe past travel experiences using past tense ～ました', 'Use transport means particle で'],
    learningObjectivesMy: ['အတိတ်ကာလပြကြိယာ ～ました ဖြင့် ခရီးသွားအတွေ့အကြုံဖော်ပြတတ်စေရန်', 'သယ်ယူပို့ဆောင်ရေးပြဝိဘတ် で ကို သုံးတတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `[先週]{せんしゅう}の[土曜日]{どようび}、[私]{わたし}は[新幹線]{しんかんせん}で[京都]{きょうと}へ[行]{い}きました。
[東京]{とうきょう}から[京都]{きょうと}まで２[時間]{じかん}[半]{はん}かかりました。
とても[速]{はや}かったです。
[京都]{きょうと}で[有名]{ゆうめい}な「[金閣寺]{きんかくじ}」を[見]{み}ました。[金色]{きんいろ}でとてもきれいで、たくさん[写真]{しゃしん}を[撮]{と}りました。
お[昼]{ひる}はそばを[食]{た}べました。
お[土産]{みやげ}に[抹茶]{まっちゃ}のお[菓子]{かし}を[買]{か}いました。とても[楽]{たの}しい[旅行]{りょこう}でした。`,
    passagePlain: `先週の土曜日、私は新幹線で京都へ行きました。
東京から京都まで２時間半かかりました。
とても速かったです。
京都で有名な「金閣寺」を見ました。金色でとてもきれいで、たくさん写真を撮りました。
お昼はそばを食べました。
お土産に抹茶のお菓子を買いました。とても楽しい旅行でした。`,
    translationEn: `Last Saturday, I went to Kyoto by Shinkansen (bullet train). It took two and a half hours from Tokyo to Kyoto. It was very fast. In Kyoto, I saw the famous Kinkaku-ji (Golden Pavilion). It was golden and very beautiful, and I took many photos. For lunch, I ate soba noodles. I bought matcha sweets as a souvenir. It was a very enjoyable trip.`,
    translationMy: `ပြီးခဲ့သော စနေနေ့က ကျွန်တော်သည် ကျည်ဆန်ရထား (ရှင်းခန်းဆန်) ဖြင့် ကျိုတိုမြို့သို့ သွားခဲ့ပါသည်။ တိုကျိုမှ ကျိုတိုသို့ ၂ နာရီခွဲ ကြာမြင့်ခဲ့ပါသည်။ အလွန်မြန်ဆန်ခဲ့ပါသည်။ ကျိုတိုမြို့တွင် ကျော်ကြားသော ရွှေရောင်ဘုရားကျောင်း (ကင်းခခုဂျိ) ကို ကြည့်ရှုခဲ့ပါသည်။ ရွှေရောင်တဝင်းဝင်းဖြင့် အလွန်လှပသောကြောင့် ဓာတ်ပုံများစွာ ရိုက်ခဲ့ပါသည်။ နေ့လယ်စာအဖြစ် ဂျပန်ခေါက်ဆွဲ (ဆိုဘ) ကို စားခဲ့ပါသည်။ အမှတ်တရလက်ဆောင်အဖြစ် မချာလက်ဖက်စိမ်းမုန့်ကို ဝယ်ယူခဲ့ပါသည်။ အလွန်ပျော်စရာကောင်းသော ခရီးတစ်ခု ဖြစ်ခဲ့ပါသည်။`,
    vocabularyList: [
      { word: '新幹線', reading: 'しんかんせん', meaning: 'bullet train', meaningMy: 'ကျည်ဆန်ရထား' },
      { word: '有名', reading: 'ゆうめい', meaning: 'famous', meaningMy: 'နာမည်ကျော်ကြားသော' },
      { word: '写真', reading: 'しゃしん', meaning: 'photograph', meaningMy: 'ဓာတ်ပုံ' },
      { word: 'お土産', reading: 'おみやげ', meaning: 'souvenir', meaningMy: 'လက်ဆောင်ပစ္စည်း' },
    ],
    grammarPoints: [
      { grammar: '乗り物 + で', meaning: 'by means of [transport]', meaningMy: '[ယာဉ်] ဖြင့်', explanation: 'Particle で indicates means of movement.', exampleJp: '新幹線で京都へ行きました。' },
      { grammar: '時間 + かかります', meaning: 'it takes [time]', meaningMy: '[အချိန်] ကြာမြင့်သည်', explanation: 'Expresses duration.', exampleJp: '２時間半かかりました。' },
    ],
    audioScript: '先週の土曜日、私は新幹線で京都へ行きました。東京から京都まで２時間半かかりました。とても速かったです。京都で有名な金閣寺を見ました。',
    questions: [
      {
        id: 'rq-n5-05-1',
        questionJp: '東京から京都まで何時間かかりましたか？',
        questionEn: 'How many hours did it take from Tokyo to Kyoto?',
        questionMy: 'တိုကျိုမှ ကျိုတိုသို့ မည်မျှကြာမြင့်ခဲ့သလဲ။',
        options: ['１時間', '２時間半', '３時間', '５時間'],
        correctIndex: 1,
        explanation: 'The passage explicitly says: 「２時間半かかりました」(It took 2.5 hours).',
        explanationMy: 'စာပိုဒ်တွင် "２時間半かかりました" (၂ နာရီခွဲကြာခဲ့သည်) ဟု ပါရှိပါသည်။',
      },
      {
        id: 'rq-n5-05-2',
        questionJp: 'お土産に何を買いましたか？',
        questionEn: 'What did the author buy as a souvenir?',
        questionMy: 'အမှတ်တရလက်ဆောင်အဖြစ် ဘာဝယ်ခဲ့သလဲ။',
        options: ['カメラ', '新幹線の切符', '抹茶のお菓子', '本'],
        correctIndex: 2,
        explanation: 'Author states: 「お土産に抹茶のお菓子を買いました」(bought matcha sweets).',
        explanationMy: '"抹茶のお菓子を買いました" အရ မချာမုန့် ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 6. Work & Professional
  {
    id: 'r-n5-06',
    title: 'コンビニのアルバイト募集',
    titleEn: 'Convenience Store Part-time Notice',
    titleMy: 'ကွန်ဗီးနီးယန့်စတိုး အချိန်ပိုင်းအလုပ်ကြော်ငြာ',
    level: 'N5',
    topic: 'work',
    subtopic: 'Job notice and wage details',
    learningObjectives: ['Read and understand simple job notices and hourly wages', 'Identify requirements and contact phone numbers'],
    learningObjectivesMy: ['အလုပ်ခေါ်စာနှင့် နာရီအလိုက်လုပ်ခလစာကို ဖတ်ရှုနားလည်စေရန်', 'ဆက်သွယ်ရမည့်ဖုန်းနံပါတ်နှင့် စည်းကမ်းချက်များကို ဖော်ထုတ်တတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `【アルバイト[募集]{ぼしゅう}】
[駅前]{えきまえ}のファミリーマートでスタッフを[募集]{ぼしゅう}しています。
・[仕事]{しごと}：レジ、[品出]{しなだ}し、お[店]{みせ}の[掃除]{そうじ}
・[時間]{じかん}：[朝]{あさ}６[時]{じ}～９[時]{じ}、または[夕方]{ゆうがた}５[時]{じ}～[夜]{よる}１０[時]{じ}
・[時給]{じきゅう}：１,１００[円]{えん}（[土日]{どにち}は５０[円]{えん}アップ）
・[条件]{じょうけん}：[週]{しゅう}２[日]{にち}からＯＫ。[日本語]{にほんご}が[話]{はな}せる[方]{かた}。
[電話]{でんわ}：03-1234-5678（[担当]{たんとう}：[佐藤]{さとう}）
ぜひお[気軽]{きがる}にお[電話]{でんわ}ください！`,
    passagePlain: `【アルバイト募集】
駅前のファミリーマートでスタッフを募集しています。
・仕事：レジ、品出し、お店の掃除
・時間：朝６時～９時、または夕方５時～夜１０時
・時給：１,１００円（土日は５０円アップ）
・条件：週２日からＯＫ。日本語が話せる方。
電話：03-1234-5678（担当：佐藤）
ぜひお気軽にお電話ください！`,
    translationEn: `[Part-Time Job Notice]
FamilyMart in front of the station is hiring staff!
- Duties: Cashier, stocking shelves, store cleaning
- Hours: 6:00 AM - 9:00 AM, or 5:00 PM - 10:00 PM
- Hourly Wage: 1,100 yen (+50 yen on Saturdays and Sundays)
- Requirements: Available from 2 days a week. Those who can speak Japanese.
Phone: 03-1234-5678 (Contact: Sato)
Please feel free to call us!`,
    translationMy: `【အချိန်ပိုင်းအလုပ် ခေါ်ယူခြင်း】
ဘူတာရှေ့ FamilyMart တွင် ဆိုင်ဝန်ထမ်း အလိုရှိပါသည်။
・အလုပ်တာဝန်- ငွေရှင်းကောင်တာ၊ ပစ္စည်းတင်ခြင်း၊ ဆိုင်သန့်ရှင်းရေး
・အချိန်- မနက် ၆ နာရီမှ ၉ နာရီ၊ သို့မဟုတ် ညနေ ၅ နာရီမှ ည ၁၀ နာရီ
・နာရီလုပ်ခ- ၁,၁၀၀ ယန်း (စနေ၊ တနင်္ဂနွေတွင် ၅၀ ယန်း ပိုတိုးပေးပါသည်)
・သတ်မှတ်ချက်- တစ်ပတ် ၂ ရက်မှစ၍ လုပ်ကိုင်နိုင်သူ။ ဂျပန်စကား ပြောဆိုနိုင်သူ။
ဖုန်းနံပါတ်- 03-1234-5678 (တာဝန်ခံ- ဆာတို)
စိတ်အားထက်သန်စွာဖြင့် လွတ်လပ်စွာ ဖုန်းဆက်စုံစမ်းနိုင်ပါသည်!`,
    vocabularyList: [
      { word: '募集', reading: 'ぼしゅう', meaning: 'recruitment', meaningMy: 'ခေါ်ယူခြင်း' },
      { word: '時給', reading: 'じきゅう', meaning: 'hourly wage', meaningMy: 'တစ်နာရီလုပ်ခ' },
      { word: '条件', reading: 'じょうけん', meaning: 'condition, requirement', meaningMy: 'သတ်မှတ်ချက်' },
      { word: '担当', reading: 'たんとう', meaning: 'person in charge', meaningMy: 'တာဝန်ခံ' },
    ],
    grammarPoints: [
      { grammar: '～ことができる / ～せる方', meaning: 'people who can do ~', meaningMy: '...လုပ်နိုင်သောသူ', explanation: 'Expresses capability or qualification.', exampleJp: '日本語が話せる方。' },
      { grammar: '～から', meaning: 'starting from ~', meaningMy: '...မှ စတင်၍', explanation: 'Indicates the minimum starting point.', exampleJp: '週２日からＯＫ。' },
    ],
    audioScript: '駅前のファミリーマートでスタッフを募集しています。仕事はレジ、品出し、お店の掃除です。時給は千百円です。週２日から働くことができます。',
    questions: [
      {
        id: 'rq-n5-06-1',
        questionJp: '日曜日の時給はいくらになりますか？',
        questionEn: 'How much is the hourly wage on Sunday?',
        questionMy: 'တနင်္ဂနွေနေ့တွင် တစ်နာရီလုပ်ခ မည်မျှရရှိမည်နည်း။',
        options: ['１,０００円', '１,１００円', '１,၁၅၀円', '１,၂００円'],
        correctIndex: 2,
        explanation: 'Standard wage is 1,100 yen, plus 50 yen on weekends = 1,150 yen (「土日は５０円アップ」).',
        explanationMy: 'ပုံမှန်လုပ်ခမှာ ၁,၁၀၀ ယန်းဖြစ်ပြီး စနေ/တနင်္ဂနွေတွင် ၅၀ ယန်းတိုးသဖြင့် ၁,၁၅၀ ယန်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n5-06-2',
        questionJp: '一週間に何日から働くことができますか？',
        questionEn: 'How many days per week can you start working from?',
        questionMy: 'တစ်ပတ်လျှင် အနည်းဆုံး ရက်မည်မျှ စတင်လုပ်ကိုင်နိုင်သလဲ။',
        options: ['１日', '２日', '４日', '毎日'],
        correctIndex: 1,
        explanation: 'The condition says: 「週２日からＯＫ」(from 2 days a week is OK).',
        explanationMy: '"週２日からＯＫ" ဟု ဖော်ပြထားသောကြောင့် ၂ ရက်မှ စတင်နိုင်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 7. Technology & Digital Society
  {
    id: 'r-n5-07',
    title: 'スマートフォンの便利なアプリ',
    titleEn: 'Convenient Smartphone Apps',
    titleMy: 'အသုံးဝင်သော စမတ်ဖုန်းအက်ပ်များ',
    level: 'N5',
    topic: 'technology',
    subtopic: 'Digital maps and translation tools',
    learningObjectives: ['Identify digital technology vocabulary in Japanese', 'Understand purpose sentences using ～のに便利です'],
    learningObjectivesMy: ['ဒစ်ဂျစ်တယ်နည်းပညာသုံး ဝေါဟာရများကို နားလည်စေရန်', '～のに便利です ဖြင့် ရည်ရွယ်ချက်ဖော်ပြတတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `[最近]{さいきん}、ほとんどの[人]{ひと}がスマートフォンを[持]{も}っています。
スマートフォンのアプリはとても[便利]{べんり}です。
[道]{みち}がわからないとき、[地図]{ちず}アプリを[使]{つか}います。
[今]{いま}どこにいるか、すぐにわかります。
また、[外国語]{がいこくご}を[勉強]{べんきょう}するアプリもあります。
[電車]{でんしゃ}の[中]{なか}で[単語]{たんご}を[覚]{おぼ}えることができます。
スマートフォンの[使]{つか}いすぎには[気]{き}をつけましょう。`,
    passagePlain: `最近、ほとんどの人がスマートフォンを持っています。
スマートフォンのアプリはとても便利です。
道がわからないとき、地図アプリを使います。
今どこにいるか、すぐにわかります。
また、外国語を勉強するアプリもあります。
電車の中で単語を覚えることができます。
スマートフォンの使いすぎには気をつけましょう。`,
    translationEn: `Recently, almost everyone has a smartphone. Smartphone apps are very convenient. When you do not know the way, you can use a map app. You can immediately know where you currently are. Also, there are apps for studying foreign languages. You can memorize words inside the train. Let us be careful not to overuse smartphones.`,
    translationMy: `မကြာသေးမီက လူအများစုသည် စမတ်ဖုန်းကို ကိုင်ဆောင်ကြပါသည်။ စမတ်ဖုန်း၏ အက်ပ်များသည် အလွန်အသုံးဝင်လှပါသည်။ လမ်းမသိသောအခါ မြေပုံအက်ပ်ကို အသုံးပြုနိုင်ပါသည်။ ယခု မည်သည့်နေရာတွင် ရောက်နေသည်ကို ချက်ချင်း သိရှိနိုင်ပါသည်။ ထို့အပြင် နိုင်ငံခြားဘာသာစကား လေ့လာနိုင်သော အက်ပ်များလည်း ရှိပါသည်။ ရထားပေါ်တွင် စကားလုံးအသစ်များကို ကျက်မှတ်နိုင်ပါသည်။ သို့သော် စမတ်ဖုန်းကို အလွန်အကျွံ အသုံးမပြုမိစေရန် သတိထားကြပါစို့။`,
    vocabularyList: [
      { word: '最近', reading: 'さいきん', meaning: 'recently', meaningMy: 'မကြာသေးမီက' },
      { word: '便利', reading: 'べんり', meaning: 'convenient', meaningMy: 'အဆင်ပြေအသုံးဝင်သော' },
      { word: '地図', reading: 'ちず', meaning: 'map', meaningMy: 'မြေပုံ' },
      { word: '覚える', reading: 'おぼえる', meaning: 'to memorize, remember', meaningMy: 'ကျက်မှတ်သည်၊ မှတ်မိသည်' },
    ],
    grammarPoints: [
      { grammar: '動詞辞書形 + ことができる', meaning: 'can do ~', meaningMy: '...ပြုလုပ်နိုင်သည်', explanation: 'Expresses potential capability.', exampleJp: '単語を覚えることができます。' },
      { grammar: '～とき', meaning: 'when ~', meaningMy: '...သောအခါ', explanation: 'Indicates the time or occasion of an event.', exampleJp: '道がわからないとき、地図アプリを使います。' },
    ],
    audioScript: '最近、ほとんどの人がスマートフォンを持っています。道がわからないとき、地図アプリを使います。外国語を勉強するアプリもあります。電車の中で単語を覚えることができます。',
    questions: [
      {
        id: 'rq-n5-07-1',
        questionJp: '道がわからないとき、何をしますか？',
        questionEn: 'What do you do when you do not know the way?',
        questionMy: 'လမ်းမသိသောအခါ ဘာလုပ်ကြသလဲ။',
        options: ['本屋へ行く', '地図アプリを使う', '寝る', 'テレビを見る'],
        correctIndex: 1,
        explanation: 'Passage says: 「道がわからないとき、地図アプリを使います」(Use map app).',
        explanationMy: 'စာပိုဒ်တွင် "地図アプリを使います" (မြေပုံအက်ပ်ကို သုံးသည်) ဟု ပါရှိပါသည်။',
      },
      {
        id: 'rq-n5-07-2',
        questionJp: '電車の中で何ができると書いてありますか？',
        questionEn: 'What does the passage say you can do inside the train?',
        questionMy: 'ရထားထဲတွင် ဘာလုပ်နိုင်သည်ဟု ရေးထားသလဲ။',
        options: ['料理を作ること', '単語を覚えること', '車を運転すること', '映画を撮ること'],
        correctIndex: 1,
        explanation: 'Sentence notes: 「電車の中で単語を覚えることができます」(Memorize words).',
        explanationMy: '"単語を覚えることができます" (စကားလုံးများ ကျက်မှတ်နိုင်သည်) ဟု ရေးသားထားပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 8. Community & Society
  {
    id: 'r-n5-08',
    title: '町の図書館の利用案内',
    titleEn: 'Town Library User Guide',
    titleMy: 'မြို့နယ်စာကြည့်တိုက် အသုံးပြုနည်း လမ်းညွှန်',
    level: 'N5',
    topic: 'community',
    subtopic: 'Public facilities and rules',
    learningObjectives: ['Understand public facility notices and prohibitions (～てはいけません)', 'Count books using counters (～冊)'],
    learningObjectivesMy: ['အများသုံးအဆောက်အအုံဆိုင်ရာ တားမြစ်ချက် (～てはいけません) ကို နားလည်စေရန်', 'စာအုပ်ရေတွက်ပုဒ် (～冊) ကို သုံးတတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `【みどり[町]{まち}[図書館]{としょかん}の[使]{つか}い[方]{かた}】
・[開館]{かいかん}[時間]{じかん}：[火曜日]{かようび}から[日曜日]{にちようび}の[朝]{あさ}９[時]{じ}～[夜]{よる}７[時]{じ}
・[休館日]{きゅうかんび}：[毎週]{まいしゅう}[月曜日]{げつようび}
・[本]{ほん}の[借]{か}り[方]{かた}：[一人]{ひとり}５[冊]{さつ}まで、２[週間]{しゅうかん}[借]{か}りることができます。
・お[願]{ねが}い：
　１．[館内]{かんない}で[静]{しず}かにしてください。
　２．[飲食]{いんしょく}はできません（水やお茶は飲んでもいいです）。
　３．スマートフォンの[通話]{つうわ}はしてはいけません。`,
    passagePlain: `【みどり町図書館の使い方】
・開館時間：火曜日から日曜日の朝９時～夜７時
・休館日：毎週月曜日
・本の借り方：一人５冊まで、２週間借りることができます。
・お願い：
　１．館内で静かにしてください。
　２．飲食はできません（水やお茶は飲んでもいいです）。
　３．スマートフォンの通話はしてはいけません。`,
    translationEn: `[How to Use Midori Town Library]
- Open Hours: Tuesday through Sunday, 9:00 AM - 7:00 PM
- Closed Days: Every Monday
- Borrowing Books: Up to 5 books per person, for up to 2 weeks.
- Requests:
  1. Please keep quiet inside the library.
  2. Eating and drinking are prohibited (water and green tea are allowed).
  3. Phone calls on smartphones must not be made.`,
    translationMy: `【မိဒိုရိမြို့နယ် စာကြည့်တိုက် အသုံးပြုနည်း】
・ဖွင့်ချိန်- အင်္ဂါနေ့မှ တနင်္ဂနွေနေ့အထိ မနက် ၉ နာရီမှ ည ၇ နာရီ
・ပိတ်ရက်- အပတ်စဉ် တနင်္လာနေ့တိုင်း
・စာအုပ်ငှားရမ်းခြင်း- တစ်ဦးလျှင် ၅ အုပ်အထိ၊ ၂ ပတ်ကြာ ငှားရမ်းနိုင်ပါသည်။
・မေတ္တာရပ်ခံချက်-
  ၁။ စာကြည့်တိုက်အတွင်း တိတ်ဆိတ်စွာ နေထိုင်ပါ။
  ၂။ အစားအသောက် စားသောက်ခွင့်မရှိပါ (ရေနှင့် လက်ဖက်ရည် သောက်သုံးခွင့်ရှိပါသည်)။
  ၃။ စမတ်ဖုန်းဖြင့် အသံထွက်ဖုန်းပြောခြင်း လုံးဝမပြုလုပ်ရပါ။`,
    vocabularyList: [
      { word: '図書館', reading: 'としょかん', meaning: 'library', meaningMy: 'စာကြည့်တိုက်' },
      { word: '借りる', reading: 'かりる', meaning: 'to borrow', meaningMy: 'ငှားရမ်းသည်' },
      { word: '静か', reading: 'しずか', meaning: 'quiet', meaningMy: 'တိတ်ဆိတ်သော' },
      { word: '通話', reading: 'つうわ', meaning: 'phone call', meaningMy: 'ဖုန်းပြောဆိုခြင်း' },
    ],
    grammarPoints: [
      { grammar: '～てはいけません', meaning: 'must not do ~ (prohibition)', meaningMy: '...မပြုလုပ်ရ (တားမြစ်ချက်)', explanation: 'Used to state strict rules or prohibitions.', exampleJp: '通話はしてはいけません。' },
      { grammar: '～てもいいです', meaning: 'may do ~ (permission)', meaningMy: '...ပြုလုပ်ခွင့်ရှိသည်', explanation: 'Gives permission to perform an action.', exampleJp: '水やお茶は飲んでもいいです。' },
    ],
    audioScript: 'みどり町図書館は火曜日から日曜日の朝９時から夜７時まで開いています。毎週月曜日は休みです。本は一人５冊まで２週間借りることができます。',
    questions: [
      {
        id: 'rq-n5-08-1',
        questionJp: '図書館は何曜日に休みですか？',
        questionEn: 'Which day is the library closed?',
        questionMy: 'စာကြည့်တိုက်သည် မည်သည့်နေ့တွင် ပိတ်သလဲ။',
        options: ['日曜日', '月曜日', '水曜日', '金曜日'],
        correctIndex: 1,
        explanation: 'Notice says: 「休館日：毎週月曜日」(Closed every Monday).',
        explanationMy: 'စာပိုဒ်တွင် "休館日：毎週月曜日" (တနင်္လာနေ့တိုင်းပိတ်သည်) ဟု ပါရှိပါသည်။',
      },
      {
        id: 'rq-n5-08-2',
        questionJp: '本は何冊まで借りることができますか？',
        questionEn: 'How many books can you borrow at once?',
        questionMy: 'စာအုပ်ကို တစ်ကြိမ်လျှင် အများဆုံး မည်မျှငှားနိုင်သလဲ။',
        options: ['２冊', '３冊', '５冊', '１０冊'],
        correctIndex: 2,
        explanation: 'Rule states: 「一人５冊まで」(Up to 5 books per person).',
        explanationMy: '"一人５冊まで" အရ ၅ အုပ် ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 9. Environment & Sustainability
  {
    id: 'r-n5-09',
    title: '公園のクリーン作戦',
    titleEn: 'Park Clean-up Activity',
    titleMy: 'ပန်းခြံ သန့်ရှင်းရေး လှုပ်ရှားမှု',
    level: 'N5',
    topic: 'environment',
    subtopic: 'Community volunteer cleaning and eco-awareness',
    learningObjectives: ['Understand community volunteer invitations and schedules', 'Use invitation forms ～ましょう'],
    learningObjectivesMy: ['ရပ်ရွာလူထု စုပေါင်းလှုပ်ရှားမှု ဖိတ်ခေါ်ချက်ကို နားလည်စေရန်', 'ဖိတ်ခေါ်တိုက်တွန်းစကား ～ましょう ကို သုံးတတ်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `【[公園]{こうえん}をきれいにしましょう！】
[私]{わたし}たちの[町]{まち}の「さくら[公園]{こうえん}」でゴミ[拾]{ひろ}いをします。
[綺麗]{きれい}な[公園]{こうえん}で[気持]{きも}ちよく[遊]{あそ}びましょう。
・[日時]{にちじ}：１０[月]{がつ}１５[日]{にち}（[日]{にち}）[朝]{あさ}８[時]{じ}～９[時]{じ}[半]{はん}
・[場所]{ばしょ}：さくら[公園]{こうえん}の[時計]{とけい}の[前]{まえ}
・[持]{も}ち[物]{もの}：[軍手]{ぐんて}（[手袋]{てぶくろ}）、タオル
※ゴミ[袋]{ぶくろ}とお[茶]{ちゃ}は[町内会]{ちょうないかい}が[準備]{じゅんび}します。
[雨]{あめ}のときは[中止]{ちゅうし}です。
みんなの[参加]{さんか}を[待]{ま}っています！`,
    passagePlain: `【公園をきれいにしましょう！】
私たちの町の「さくら公園」でゴミ拾いをします。
綺麗な公園で気持ちよく遊びましょう。
・日時：１０月１５日（日）朝８時～９時半
・場所：さくら公園の時計の前
・持ち物：軍手（手袋）、タオル
※ゴミ袋とお茶は町内会が準備します。
雨のときは中止です。
みんなの参加を待っています！`,
    translationEn: `[Let's Make Our Park Clean!]
We are holding a trash pickup at "Sakura Park" in our town. Let's make the park beautiful and enjoy playing comfortably!
- Date & Time: October 15th (Sunday), 8:00 AM - 9:30 AM
- Location: In front of the clock at Sakura Park
- What to bring: Cotton work gloves, towel
*Trash bags and tea will be prepared by the neighborhood association.
In case of rain, the event is canceled. We look forward to everyone's participation!`,
    translationMy: `【ပန်းခြံကို သန့်ရှင်းအောင် ပြုလုပ်ကြစို့！】
ကျွန်ုပ်တို့မြို့နယ်ရှိ "ဆာကူရာပန်းခြံ" တွင် အမှိုက်ကောက် လှုပ်ရှားမှု ပြုလုပ်ပါမည်။ လှပသန့်ရှင်းသော ပန်းခြံတွင် စိတ်ချမ်းမြေ့စွာ ဆော့ကစားကြပါစို့။
・ရက်စွဲနှင့် အချိန်- အောက်တိုဘာလ ၁၅ ရက် (တနင်္ဂနွေနေ့) မနက် ၈ နာရီမှ ၉ နာရီခွဲ
・နေရာ- ဆာကူရာပန်းခြံ နာရီစင်ရှေ့
・ယူဆောင်လာရမည့်ပစ္စည်း- လက်အိတ်၊ မျက်နှာသုတ်ပဝါ
※ အမှိုက်အိတ်နှင့် ရေနွေးကြမ်းကို ရပ်ကွက်အသင်းမှ စီစဉ်ပေးပါမည်။
မိုးရွာပါက ဖျက်သိမ်းပါမည်။ အားလုံး ပါဝင်ကြရန် စောင့်မျှော်နေပါသည်!`,
    vocabularyList: [
      { word: '拾う', reading: 'ひろう', meaning: 'to pick up', meaningMy: 'ကောက်ယူသည်' },
      { word: '準備', reading: 'じゅんび', meaning: 'preparation', meaningMy: 'ပြင်ဆင်မှု' },
      { word: '中止', reading: 'ちゅうし', meaning: 'cancellation', meaningMy: 'ဖျက်သိမ်းခြင်း' },
      { word: '参加', reading: 'さんか', meaning: 'participation', meaningMy: 'ပါဝင်ဆင်နွှဲခြင်း' },
    ],
    grammarPoints: [
      { grammar: '～ましょう', meaning: 'let us do ~', meaningMy: '...ကြပါစို့ (တိုက်တွန်းဖိတ်ခေါ်ချက်)', explanation: 'Used to propose an action together.', exampleJp: '公園をきれいにしましょう！' },
      { grammar: '～のとき', meaning: 'in the event of / when ~', meaningMy: '...ဖြစ်သောအခါ', explanation: 'Condition marker: 雨のときは中止です。', exampleJp: '雨のときは中止です。' },
    ],
    audioScript: 'さくら公園でゴミ拾いをします。日時は１０月１５日日曜日の朝８時から９時半までです。持ち物は軍手とタオルです。雨のときは中止です。',
    questions: [
      {
        id: 'rq-n5-09-1',
        questionJp: 'ゴミ拾いは何時に始まりますか？',
        questionEn: 'What time does the trash pick-up start?',
        questionMy: 'အမှိုက်ကောက်လှုပ်ရှားမှုသည် မည်သည့်အချိန်တွင် စတင်သလဲ။',
        options: ['朝７時', '朝８時', '朝９時半', '昼１２時'],
        correctIndex: 1,
        explanation: 'The notice states: 「朝８時～９時半」(Starts at 8:00 AM).',
        explanationMy: 'ကြော်ငြာတွင် "朝８時～" (မနက် ၈ နာရီမှ) ဟု ဖော်ပြထားပါသည်။',
      },
      {
        id: 'rq-n5-09-2',
        questionJp: '雨が降ったらどうなりますか？',
        questionEn: 'What happens if it rains?',
        questionMy: 'မိုးရွာပါက မည်သို့ဖြစ်မည်နည်း။',
        options: ['午後から行う', '室内で行う', '中止になる', '月曜日になる'],
        correctIndex: 2,
        explanation: 'Explicit rule: 「雨のときは中止です」(In case of rain, it is canceled).',
        explanationMy: '"雨のときは中止です" ဟု ပါရှိသဖြင့် ပွဲကို ဖျက်သိမ်းမည် ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },

  // 10. News & Current Events
  {
    id: 'r-n5-10',
    title: '新しいデパートのオープン',
    titleEn: 'Opening of a New Department Store',
    titleMy: 'ကုန်တိုက်အသစ် ဖွင့်လှစ်ခြင်း သတင်း',
    level: 'N5',
    topic: 'news',
    subtopic: 'Store opening and special discounts',
    learningObjectives: ['Read announcements about commercial openings and sales', 'Understand percentage discounts and dates'],
    learningObjectivesMy: ['အရောင်းမြှင့်တင်ရေးသတင်းနှင့် လျှော့ဈေးကြေညာချက်များကို ဖတ်တတ်စေရန်', 'ရာခိုင်နှုန်းလျှော့ဈေးဆိုင်ရာ ဝေါဟာရများကို နားလည်စေရန်'],
    difficultyRating: 1,
    estimatedReadingTimeMinutes: 3,
    length: 'short',
    passage: `【ニュース：[新]{あたら}しいデパートができました】
[昨日]{きのう}、[東駅]{ひがしえき}の[前]{まえ}に大きなデパートがオープンしました。
[地下]{ちか}１[階]{かい}から[地上]{ちじょう}７[階]{かい}まであります。
[地下]{ちか}にはおいしいお[菓子]{かし}やパンの[売]{う}り[場]{ば}があります。
１[階]{かい}と２[階]{かい}は[服]{ふく}や[靴]{くつ}のフロアです。
７[階]{かい}にはいろいろなレストランがあります。
今週末はオープンセールで、洋服が２０％[引]{び}きになります。
ぜひ[家族]{かぞく}や[友達]{ともだち}と[行]{い}ってみてください。`,
    passagePlain: `【ニュース：新しいデパートができました】
昨日、東駅の前に大きなデパートがオープンしました。
地下１階から地上７階まであります。
地下にはおいしいお菓子やパンの売り場があります。
１階と２階は服や靴のフロアです。
７階にはいろいろなレストランがあります。
今週末はオープンセールで、洋服が２０％引きになります。
ぜひ家族や友達と行ってみてください。`,
    translationEn: `[News: A New Department Store Has Opened]
Yesterday, a large department store opened in front of Higashi Station. It has floors from basement level 1 to the 7th floor above ground. In the basement, there are shops selling delicious sweets and bakery bread. The 1st and 2nd floors are for clothes and shoes. On the 7th floor, there are various restaurants. This weekend, there is an opening sale where clothing will be 20% off. Please try visiting with your family and friends!`,
    translationMy: `【သတင်း- ကုန်တိုက်အသစ် ဖွင့်လှစ်ခြင်း】
မနေ့က အရှေ့ဘူတာရုံရှေ့တွင် ကြီးမားသော ကုန်တိုက်ကြီးတစ်ခု ဖွင့်လှစ်ခဲ့ပါသည်။ မြေအောက် ၁ ထပ်မှ မြေပေါ် ၇ ထပ်အထိ ပါဝင်ပါသည်။ မြေအောက်ထပ်တွင် အရသာရှိသော မုန့်နှင့် ပေါင်မုန့်အရောင်းဆိုင်များ ရှိပါသည်။ ၁ ထပ်နှင့် ၂ ထပ်တို့သည် အဝတ်အထည်နှင့် ဖိနပ်အရောင်းဌာန ဖြစ်ပါသည်။ ၇ ထပ်တွင် အမျိုးစုံသော စားသောက်ဆိုင်များ ရှိပါသည်။ ယခုသီတင်းပတ်ကုန်တွင် ဖွင့်ပွဲအထူးအရောင်းအဖြစ် အဝတ်အထည်များကို ၂၀% လျှော့ဈေးဖြင့် ရောင်းချပေးမည် ဖြစ်ပါသည်။ မိသားစု သို့မဟုတ် သူငယ်ချင်းများနှင့်အတူ သွားရောက်လေ့လာကြည့်ပါ!`,
    vocabularyList: [
      { word: '地下', reading: 'ちか', meaning: 'basement, underground', meaningMy: 'မြေအောက်ထပ်' },
      { word: '売り場', reading: 'うりば', meaning: 'sales counter, department', meaningMy: 'အရောင်းဌာန' },
      { word: '割引', reading: 'わりびき', meaning: 'discount', meaningMy: 'လျှော့ဈေး' },
      { word: '今週末', reading: 'こんしゅうまつ', meaning: 'this weekend', meaningMy: 'ဒီသီတင်းပတ်ကုန်' },
    ],
    grammarPoints: [
      { grammar: '～て みてください', meaning: 'please try doing ~', meaningMy: '...စမ်းကြည့်ပါ', explanation: 'Polite suggestion to try an experience.', exampleJp: 'ぜひ行ってみてください。' },
      { grammar: '～割引 / ～引き', meaning: '~ percent off', meaningMy: '...ရာခိုင်နှုန်း လျှော့ဈေး', explanation: 'Indicates discounted prices: ２０％引き.', exampleJp: '洋服が２０％引きになります。' },
    ],
    audioScript: '昨日、東駅の前に大きなデパートがオープンしました。地下にはおいしいお菓子やパンの売り場があります。７階にはいろいろなレストランがあります。今週末はオープンセールです。',
    questions: [
      {
        id: 'rq-n5-10-1',
        questionJp: 'レストランは何階にありますか？',
        questionEn: 'Which floor are the restaurants on?',
        questionMy: 'စားသောက်ဆိုင်များသည် မည်သည့်အထပ်တွင် ရှိသလဲ။',
        options: ['地下１階', '１階', '５階', '７階'],
        correctIndex: 3,
        explanation: 'The passage mentions: 「７階にはいろいろなレストランがあります」(Restaurants are on the 7th floor).',
        explanationMy: 'စာပိုဒ်တွင် "７階にはいろいろなレストランがあります" (၇ ထပ်တွင် စားသောက်ဆိုင်များရှိသည်) ဟု ပါရှိပါသည်။',
      },
      {
        id: 'rq-n5-10-2',
        questionJp: '今週末のオープンセールで何が安くなりますか？',
        questionEn: 'What will be discounted during this weekend’s opening sale?',
        questionMy: 'ယခုသီတင်းပတ်ကုန် ဖွင့်ပွဲတွင် မည်သည့်ပစ္စည်းများ ဈေးလျှော့မည်နည်း။',
        options: ['パンやお菓子', '洋服', 'レストランの料理', '靴'],
        correctIndex: 1,
        explanation: 'Notice states: 「洋服が２０％引きになります」(Western clothes will be 20% off).',
        explanationMy: '"洋服が２０％引きになります" (အဝတ်အထည်များ ၂၀% လျှော့မည်) ဟု ဖော်ပြထားပါသည်။',
      },
    ],
    reviewStatus: 'published',
    contentVersion: '1.0',
    sourceType: 'curated_university',
  },
];

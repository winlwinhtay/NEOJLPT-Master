import { UniversityReadingExercise } from '../../types/readingCurriculum';

export const READING_N2_EXERCISES: UniversityReadingExercise[] = [
  // 1. Daily Life
  {
    id: 'r-n2-01',
    title: '睡眠の質と現代人の生体リズム',
    titleEn: 'Sleep Quality and Modern Biological Rhythms',
    titleMy: 'အိပ်စက်မှု အရည်အသွေးနှင့် ခေတ်သစ်လူသားတို့၏ ဇီဝနာရီစနစ်',
    level: 'N2',
    topic: 'daily_life',
    subtopic: 'Circadian rhythms, blue light exposure, and sleep architecture',
    learningObjectives: ['Comprehend scientific exposition on health psychology and physiology', 'Understand academic transitions like ～にもかかわらず and ～を余儀なくされる'],
    learningObjectivesMy: ['ကျန်းမာရေးနှင့် ဇီဝကမ္မဗေဒဆိုင်ရာ အဆင့်မြင့်ရှင်းလင်းချက်များကို နားလည်စေရန်', '～にもかかわらず (ဖြစ်လင့်ကစား) စသည့် သဒ္ဒါများကို သုံးတတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `[現代社会]{げんだいしゃかい}において、[多]{おお}くの[人]{ひと}が[慢性的な睡眠不足]{まんせいてきなすいみんぶそく}や[睡眠]{すいみん}の[質]{しつ}の[低下]{ていか}に[悩]{なや}まされています。
[夜遅]{よるおそ}くまでパソコンやスマートフォンの[画面]{がめん}を[凝視]{ぎょうし}し[続]{つづ}けることによって、[画面]{がめん}から[放射]{ほうしゃ}されるブルーライトが[脳]{のう}を[刺激]{しげき}し、[眠気]{ねむけ}を[誘引]{ゆういん}するホルモンである「メラトニン」の[分泌]{ぶんぴつ}が[著]{いちじる}しく[抑制]{よくせい}されてしまうからです。
その[結果]{けっか}、[就寝]{しゅうしん}[時刻]{じこく}が[後]{うし}ろ[倒]{だお}しになり、[体内時計]{たいないどけい}（[概日]{がいじつ}リズム）が[狂]{くる}ってしまうのです。
[単]{たん}に[睡眠]{すいみん}[時間]{じかん}の[長]{なが}さだけを[確保]{かくほ}すれば[良]{よ}いというわけではありません。
[深]{ふか}いノンレム[睡眠]{すいみん}が[十分]{じゅうぶん}に[得]{え}られなければ、[脳]{のう}の[疲労]{ひろう}[回復]{かいふく}や[記憶]{きおく}の[定着]{ていちゃく}は[果]{は}たされないのです。
[朝日]{あさひ}をしっかりと[浴]{あ}びて[体内時計]{たいないどけい}をリセットし、[入浴]{にゅうよく}によって[深部]{しんぶ}[体温]{たいおん}をいったん[上]{あ}げてから[下]{さ}げるなどの[工夫]{くふう}が、[健]{すこ}やかな[日常]{にちじょう}を[維持]{いじ}する[上]{うえ}で[不可欠]{ふかけつ}といえます。`,
    passagePlain: `現代社会において、多くの人が慢性的な睡眠不足や睡眠の質の低下に悩まされています。
夜遅くまでパソコンやスマートフォンの画面を凝視し続けることによって、画面から放射されるブルーライトが脳を刺激し、眠気を誘引するホルモンである「メラトニン」の分泌が著しく抑制されてしまうからです。
その結果、就寝時刻が後ろ倒しになり、体内時計（概日リズム）が狂ってしまうのです。
単に睡眠時間の長さだけを確保すれば良いというわけではありません。
深いノンレム睡眠が十分に得られなければ、脳の疲労回復や記憶の定着は果たされないのです。
朝日をしっかりと浴びて体内時計をリセットし、入浴によって深部体温をいったん上げてから下げるなどの工夫が、健やかな日常を維持する上で不可欠といえます。`,
    translationEn: `In modern society, many individuals suffer from chronic sleep deprivation and deterioration in sleep quality. This is because continuously staring at computer and smartphone screens late into the night stimulates the brain with emitted blue light, remarkably suppressing the secretion of melatonin, the hormone that induces drowsiness. Consequently, bedtimes are pushed back and the biological clock (circadian rhythm) is disrupted. Merely securing a long duration of sleep is not enough. Unless deep non-REM sleep is sufficiently obtained, brain fatigue recovery and memory consolidation cannot be achieved. Measures such as exposing oneself thoroughly to morning sunlight to reset the internal clock and taking a bath to temporarily raise core body temperature before allowing it to drop are indispensable for maintaining a healthy daily routine.`,
    translationMy: `ယနေ့ခေတ်လူ့ဘောင်တွင် လူအများအပြားသည် နာတာရှည်အိပ်ရေးပျက်ခြင်းနှင့် အိပ်စက်မှုအရည်အသွေး ကျဆင်းခြင်းတို့ကြောင့် စိတ်ဒုက္ခကြုံတွေ့နေကြရပါသည်။ ညဉ့်နက်သည်အထိ ကွန်ပျူတာနှင့် စမတ်ဖုန်းမျက်နှာပြင်များကို စိုက်ကြည့်နေခြင်းအားဖြင့် ထွက်ပေါ်လာသော အပြာရောင်အလင်း (Blue light) သည် ဦးနှောက်ကို လှုံ့ဆော်ပေးကာ အိပ်ငိုက်စေသည့် မယ်လာတိုနင် (Melatonin) ဟော်မုန်းထုတ်လွှတ်မှုကို သိသိသာသာ လျော့နည်းစေသောကြောင့် ဖြစ်ပါသည်။ ရလဒ်အနေဖြင့် အိပ်ရာဝင်ချိန် နောက်ကျလာကာ ခန္ဓာကိုယ်တွင်း ဇီဝနာရီစနစ် (Circadian rhythm) ချို့ယွင်းသွားရပါသည်။ အိပ်ချိန်ကြာမြင့်ရုံမျှဖြင့် လုံလောက်သည် မဟုတ်ပေ။ နက်ရှိုင်းစွာ အိပ်ပျော်ခြင်း (Non-REM sleep) ကို ပြည့်ဝစွာ မရရှိပါက ဦးနှောက်၏ ပင်ပန်းနွမ်းနယ်မှုကို ပြေပျောက်စေခြင်းနှင့် မှတ်ဉာဏ်ခိုင်မာစေခြင်းတို့ကို မစွမ်းဆောင်နိုင်ပါ။ နံနက်ခင်းနေရောင်ခြည်ကို ခံယူ၍ ဇီဝနာရီကို ပြန်လည်ချိန်ညှိခြင်း၊ ရေနွေးချိုးခြင်းဖြင့် ခန္ဓာကိုယ်အပူချိန်ကို မြှင့်တင်ပြီးမှ တဖြည်းဖြည်း လျှော့ချခြင်း စသည့် ကြိုးပမ်းချက်များသည် ကျန်းမာသော နေ့စဉ်ဘဝကို ထိန်းသိမ်းရန်အတွက် မရှိမဖြစ် လိုအပ်လှပါသည်။`,
    vocabularyList: [
      { word: '慢性的な', reading: 'まんせいてきな', meaning: 'chronic', meaningMy: 'နာတာရှည်ဖြစ်သော' },
      { word: '分泌', reading: 'ぶんぴつ', meaning: 'secretion (hormonal)', meaningMy: 'ဟော်မုန်းစစ်ထုတ်ခြင်း' },
      { word: '体内時計', reading: 'たいないどけい', meaning: 'internal biological clock, circadian rhythm', meaningMy: 'ခန္ဓာကိုယ်တွင်း ဇီဝနာရီ' },
      { word: '不可欠', reading: 'ふかけつ', meaning: 'indispensable, essential', meaningMy: 'မရှိမဖြစ် လိုအပ်သော' },
    ],
    grammarPoints: [
      { grammar: '～というわけではない', meaning: 'it does not mean that ~', meaningMy: '...ဟု မဆိုလိုပါ (လုံးဝဥဿုံ မဟုတ်ပါ)', explanation: 'Partial negation countering simplistic assumptions.', exampleJp: '長さを確保すれば良いというわけではありません。' },
      { grammar: '～なければ、～果たすことはできない', meaning: 'unless ~, cannot fulfill ...', meaningMy: '...မလုပ်ပါက မစွမ်းဆောင်နိုင်ပါ', explanation: 'Conditional prerequisite structure.', exampleJp: '得られなければ、回復は果たされません。' },
    ],
    audioScript: 'ブルーライトを浴びるとメラトニンの分泌が抑制され、体内時計が狂います。単に時間を確保するだけでなく、深い眠りを得る工夫が不可欠です。',
    questions: [
      {
        id: 'rq-n2-01-1',
        questionJp: '夜遅くに画面を見続けることが睡眠に及ぼす影響として、最も適切なものはどれですか？',
        questionEn: 'Which is the most appropriate effect on sleep caused by looking at screens late at night?',
        questionMy: 'ညဉ့်နက်ချိန်အထိ စခရင်မျက်နှာပြင် ကြည့်ရှုခြင်းကြောင့် အိပ်စက်မှုအပေါ် သက်ရောက်သည့်ဆိုးကျိုးမှာ အဘယ်နည်း။',
        options: [
          '体温が急激に上昇して汗が止まらなくなること',
          'ブルーライトによってメラトニンの分泌が抑制され体内時計が狂うこと',
          '睡眠時間が自動的に１０時間以上に増えること',
          '記憶力が劇的に向上すること',
        ],
        correctIndex: 1,
        explanation: 'Text states: 「ブルーライトが脳を刺激し、メラトニンの分泌が著しく抑制されてしまう...体内時計が狂ってしまう」(Suppresses melatonin, disrupts body clock).',
        explanationMy: 'အပြာရောင်အလင်းကြောင့် မယ်လာတိုနင်ဟော်မုန်း ထုတ်လွှတ်မှုနည်းသွားကာ ဇီဝနာရီစနစ် ချို့ယွင်းသွားခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-01-2',
        questionJp: '筆者が述べる「良質な睡眠と健康維持のための工夫」に合致しないものはどれですか？',
        questionEn: 'Which does NOT match the author’s advice for quality sleep and health maintenance?',
        questionMy: 'အရည်အသွေးမြင့်မားသော အိပ်စက်မှုရရှိရေးအတွက် စာရေးသူ၏ အကြံပြုချက်နှင့် မကိုက်ညီသော အချက်မှာ အဘယ်နည်း။',
        options: [
          '朝日をしっかり浴びて体内時計をリセットすること',
          '入浴によって深部体温をコントロールすること',
          '睡眠時間の長ささえ確保できれば、時間帯や光の刺激は無視してよいと考えること',
          '深いノンレム睡眠が得られるように生活習慣を整えること',
        ],
        correctIndex: 2,
        explanation: 'The author explicitly refutes Option 3: 「単に睡眠時間の長さだけを確保すれば良いというわけではありません」(Merely securing length is not enough).',
        explanationMy: 'အိပ်ချိန်ကြာရုံဖြင့် လုံလောက်သည်ဟူသော အချက်သည် စာရေးသူ၏ အကြံပြုချက်နှင့် ဆန့်ကျင်နေပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'N2 level academic prose verified for medical vocabulary and natural Japanese phrasing.',
  },

  // 2. School & Education
  {
    id: 'r-n2-02',
    title: '大学教育における「探究型学習」の意義',
    titleEn: 'Significance of "Inquiry-Based Learning" in Higher Education',
    titleMy: 'တက္ကသိုလ်ပညာရေးတွင် "စူးစမ်းလေ့လာရေးအခြေပြု သင်ယူမှု" ၏ အရေးပါပုံ',
    level: 'N2',
    topic: 'school',
    subtopic: 'Active learning, critical thinking, and transition from passive reception',
    learningObjectives: ['Comprehend academic pedagogical discourses on higher education', 'Analyze contrastive and causal conjunctions: ～にとどまらず and ～にほかならない'],
    learningObjectivesMy: ['တက္ကသိုလ်ပညာသင်ကြားရေးဆိုင်ရာ စာတမ်းငယ်များကို နားလည်စေရန်', '～にほかならない (မှလွဲ၍ အခြားမဟုတ်ပါ) ကို သုံးတတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `[従来]{じゅうらい}の[大学]{だいがく}[教育]{きょういく}は、[教授]{きょうじゅ}が[蓄積]{ちくせき}された[知識]{ちしき}を[一方的]{いっぽうてき}に[伝達]{でんたつ}し、[学生]{がくせい}がそれを[受動的]{じゅどうてき}に[記憶]{きおく}する[講義]{こうぎ}[形式]{けいしき}が[主流]{しゅりゅう}でした。
しかし、[情報技術]{じょうほうぎじゅつ}の[進展]{しんてん}によって[知識]{ちしき}そのものの[検索]{けんさく}が[容易]{ようい}になった[現代]{げんだい}においては、[単]{たん}なる[知識]{ちしき}の[暗記]{あんき}はさほど[価値]{かち}を[持]{も}ちません。
そこで[近年]{きんねん}、[自]{みずか}ら[課題]{かだい}を[発見]{はっけん}し、[仮説]{かせつ}を[立]{た}てて[検証]{けんしょう}していく「[探究型学習]{たんきゅうがたがくしゅう}（アクティブ・ラーニング）」の[導入]{どうにゅう}が[急速]{きゅうそく}に[進]{すす}んでいます。
学生たちはグループディスカッションやフィールドワークを通して、正解が一つではない複雑な社会問題に挑みます。
他者と協働しながら論理的に思考し、批判的な視点を持って結論を導き出す能力こそが、不確実な未来を生き抜く力にほかなりません。
大学はもはや「知識を授かる場」ではなく、「思考力を鍛え上げる場」へと本質的な変革を遂げつつあるのです。`,
    passagePlain: `従来の大学教育は、教授が蓄積された知識を一方的に伝達し、学生がそれを受動的に記憶する講義形式が主流でした。
しかし、情報技術の進展によって知識そのものの検索が容易になった現代においては、単なる知識の暗記はさほど価値を持ちません。
そこで近年、自ら課題を発見し、仮説を立てて検証していく「探究型学習（アクティブ・ラーニング）」の導入が急速に進んでいます。
学生たちはグループディスカッションやフィールドワークを通して、正解が一つではない複雑な社会問題に挑みます。
他者と協働しながら論理的に思考し、批判的な視点を持って結論を導き出す能力こそが、不確実な未来を生き抜く力にほかなりません。
大学はもはや「知識を授かる場」ではなく、「思考力を鍛え上げる場」へと本質的な変革を遂げつつあるのです。`,
    translationEn: `Traditional university education was dominated by a lecture style in which professors unilaterally transmitted accumulated knowledge and students passively memorized it. However, in modern times, where the retrieval of knowledge itself has become effortless through IT advancements, mere rote memorization carries little value. Therefore, in recent years, the implementation of "Inquiry-Based Learning" (Active Learning)—where students discover problems themselves, formulate hypotheses, and test them—is advancing rapidly. Through group discussions and fieldwork, students tackle complex social problems that do not have a single correct answer. The ability to think logically while collaborating with others and derive conclusions from a critical perspective is none other than the power needed to survive an uncertain future. Universities are undergoing an essential transformation: they are no longer places to "receive knowledge," but places to "forge critical thinking."`,
    translationMy: `ယခင်ရိုးရာ တက္ကသိုလ်ပညာရေးသည် ပါမောက္ခက စုဆောင်းထားသော အသိပညာများကို တစ်ဖက်သတ် ပို့ချပြီး ကျောင်းသားများက ယင်းကို နာခံကျက်မှတ်ရသည့် တရားဟောပုံစံ ပို့ချချက်များက အဓိက ဖြစ်ခဲ့ပါသည်။ သို့သော် သတင်းအချက်အလက်နည်းပညာ တိုးတက်လာမှုကြောင့် အသိပညာများကိုယ်တိုင် အလွယ်တကူ ရှာဖွေနိုင်လာသော ယနေ့ခေတ်တွင် အချက်အလက်များကို အလွတ်ကျက်မှတ်နေရုံမျှဖြင့် တန်ဖိုးမရှိတော့ပေ။ ထို့ကြောင့် မကြာသေးမီနှစ်များအတွင်း မိမိကိုယ်တိုင် ပြဿနာကို ရှာဖွေဖော်ထုတ်ပြီး ယူဆချက်သီအိုရီများ ထူထောင်ကာ လက်တွေ့စမ်းသပ်သည့် "စူးစမ်းလေ့လာရေးအခြေပြု သင်ယူမှု" (Active Learning) ကို အလျင်အမြန် စတင်ကျင့်သုံးလာကြပါသည်။ ကျောင်းသားများသည် အုပ်စုလိုက် ဆွေးနွေးခြင်းနှင့် ကွင်းဆင်းလေ့လာခြင်းများမှတစ်ဆင့် အဖြေတစ်ခုတည်း မရှိသော ရှုပ်ထွေးသည့် လူမှုရေးပြဿနာများကို စိန်ခေါ်ဖြေရှင်းကြပါသည်။ အခြားသူများနှင့် ပူးပေါင်းဆောင်ရွက်ရင်း ယုတ္တိတန်စွာ စဉ်းစားတွေးခေါ်ကာ ဝေဖန်ဆန်းစစ်သော ရှုထောင့်မှ အဖြေထုတ်နိုင်စွမ်းသည် မသေချာမရေရာသော အနာဂတ်တွင် ရပ်တည်ရှင်သန်နိုင်မည့် စွမ်းအားမှလွဲ၍ အခြားမဟုတ်ပေ။ တက္ကသိုလ်များသည် "အသိပညာများကို ခံယူရာနေရာ" မဟုတ်တော့ဘဲ "တွေးခေါ်နိုင်စွမ်းကို လေ့ကျင့်ပျိုးထောင်ရာနေရာ" အဖြစ်သို့ အခြေခံကျကျ ပြောင်းလဲလျက် ရှိနေပါသည်။`,
    vocabularyList: [
      { word: '受動的', reading: 'じゅどうてき', meaning: 'passive', meaningMy: 'ဆန္ဒမပါ နာခံလက်ခံသော' },
      { word: '仮説', reading: 'かせつ', meaning: 'hypothesis', meaningMy: 'ယူဆချက်သီအိုရီ' },
      { word: '批判的', reading: 'ひはんてき', meaning: 'critical (perspective)', meaningMy: 'ဝေဖန်ဆန်းစစ်တတ်သော' },
      { word: '変革を遂げる', reading: 'へんかくをとげる', meaning: 'to accomplish a transformation', meaningMy: 'အပြောင်းအလဲကို ဖော်ဆောင်သည်' },
    ],
    grammarPoints: [
      { grammar: '～にほかならない', meaning: 'none other than ~ / nothing but ~', meaningMy: '...မှလွဲ၍ အခြားမဟုတ်ပါ', explanation: 'Strong conclusive assertion of core truth.', exampleJp: '未来を生き抜く力にほかなりません。' },
      { grammar: 'もはや～ではない', meaning: 'no longer ~', meaningMy: 'ယခုအခါ ...မဟုတ်တော့ပါ', explanation: 'Emphasizes that past conditions no longer apply.', exampleJp: 'もはや知識を授かる場ではありません。' },
    ],
    audioScript: '現代の大学では単なる知識の暗記ではなく、自ら課題を発見して検証する探究型学習が重視されています。他者と協働し思考力を鍛える場へと変革しています。',
    questions: [
      {
        id: 'rq-n2-02-1',
        questionJp: '現代において「単なる知識の暗記」の価値が低下した理由として書かれているものはどれですか？',
        questionEn: 'Why has the value of rote memorization decreased in modern times?',
        questionMy: 'ယနေ့ခေတ်တွင် "အလွတ်ကျက်မှတ်ခြင်း" ၏ တန်ဖိုး ကျဆင်းသွားရသည့် အကြောင်းရင်းမှာ အဘယ်နည်း။',
        options: [
          '教授の数が減少したから',
          '情報技術の進展によって知識の検索が容易になったから',
          '大学の学費が高騰したから',
          '学生が文字を読めなくなったから',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「情報技術の進展によって知識そのものの検索が容易になった現代においては...」(IT makes retrieval easy).',
        explanationMy: 'နည်းပညာတိုးတက်လာသဖြင့် အသိပညာများကို အလွယ်တကူ ရှာဖွေနိုင်လာသောကြောင့် ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-02-2',
        questionJp: '文章全体から読み取れる、現代の大学に求められている本質的な役割は何ですか？',
        questionEn: 'What is the essential role demanded of modern universities according to the text?',
        questionMy: 'စာပိုဒ်အရ ယနေ့ခေတ် တက္ကသိုလ်များထံမှ တောင်းဆိုထားသော အဓိကအခန်းကဏ္ဍမှာ အဘယ်နည်း။',
        options: [
          '過去の教科書を忠実に丸暗記させること',
          '学生を一人だけで静かに勉強させること',
          '他者と協働し正解のない課題に挑む思考力を鍛え上げること',
          '就職活動のテクニックだけを教えること',
        ],
        correctIndex: 2,
        explanation: 'Concluding thought: 「『思考力を鍛え上げる場』へと本質的な変革を遂げつつある」(Forging the power of critical thinking through collaboration).',
        explanationMy: 'အခြားသူများနှင့် ပူးပေါင်း၍ အဖြေမရှိသော ပြဿနာများကို ဖြေရှင်းနိုင်မည့် တွေးခေါ်နိုင်စွမ်းကို လေ့ကျင့်ပေးခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Validated for N2 discourse structure and educational pedagogy vocabulary.',
  },

  // 3. Culture & Traditions
  {
    id: 'r-n2-03',
    title: '「わび・さび」に見る日本古来の不完全の美学',
    titleEn: 'The Traditional Japanese Aesthetics of Imperfection in "Wabi-Sabi"',
    titleMy: '"ဝါဘိ-ဆာဘိ" တွင် တွေ့ရသော ဂျပန်ရှေးရိုးရာ မပြည့်စုံခြင်း၏ အလှတရား',
    level: 'N2',
    topic: 'culture',
    subtopic: 'Aesthetic philosophy of transience, asymmetry, and aged patina',
    learningObjectives: ['Appreciate abstract cultural and philosophical aesthetics', 'Understand nuanced grammar like ～にみられる and ～てやまない'],
    learningObjectivesMy: ['ဂျပန်ရိုးရာ အလှဗေဒနှင့် အတွေးအခေါ်များကို နားလည်စေရန်', '～にみられる (တွင်တွေ့ရှိရသော) စသည့် သဒ္ဒါများကို သုံးတတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `[日本]{にほん}の[美意識]{びいしき}の[根底]{こんてい}には、「わび・さび（[侘]{わび}・[寂]{さび}）」という[独特]{どくとく}の[美学]{びがく}が[存在]{そんざい}します。
西洋の伝統的な美意識が、左右対称の均整美や永遠不滅の完璧さを追求してきたのに対し、日本の「わび・さび」は、むしろ不完全さや無常感、時間経過に伴う風化や劣化のなかに深い趣を見出そうとします。
「わび」とは、物質的な貧しさや不足を受け入れ、質素で簡素な生活のなかに精神的な豊かさを見出す心を意味します。
一方の「さび」は、長い年月を経て表面が錆びたり色あせたりした佇まいに宿る、枯淡な美しさを表します。
たとえば、割れた陶器を漆と金粉で美しく修復する「金継ぎ」の技法は、傷を隠すのではなく、その損傷の歴史こそを独自の美として愛でる精神の表れといえます。
完璧さを追い求めがちな現代社会において、不完全なものを受け入れ、移ろいゆく時を慈しむこの思想は、世界中の人々を魅了してやみません。`,
    passagePlain: `日本の美意識の根底には、「わび・さび（侘・寂）」という独特の美学が存在します。
西洋の伝統的な美意識が、左右対称の均整美や永遠不滅の完璧さを追求してきたのに対し、日本の「わび・さび」は、むしろ不完全さや無常感、時間経過に伴う風化や劣化のなかに深い趣を見出そうとします。
「わび」とは、物質的な貧しさや不足を受け入れ、質素で簡素な生活のなかに精神的な豊かさを見出す心を意味します。
一方の「さび」は、長い年月を経て表面が錆びたり色あせたりした佇まいに宿る、枯淡な美しさを表します。
たとえば、割れた陶器を漆と金粉で美しく修復する「金継ぎ」の技法は、傷を隠すのではなく、その損傷の歴史こそを独自の美として愛でる精神の表れといえます。
完璧さを追い求めがちな現代社会において、不完全なものを受け入れ、移ろいゆく時を慈しむこの思想は、世界中の人々を魅了してやみません。`,
    translationEn: `At the foundation of Japanese aesthetic sensibility exists the unique philosophy of "Wabi-Sabi." In contrast to traditional Western aesthetics that pursued symmetrical proportion and eternal, indestructible perfection, Japan's "Wabi-Sabi" discovers profound refinement precisely within imperfection, transience, and the weathering and aging that accompany the passage of time. "Wabi" means accepting material austerity and insufficiency, finding spiritual richness within a simple, frugal life. On the other hand, "Sabi" expresses an understated, withered beauty residing in the atmosphere of an object whose surface has rusted or faded over long years. For example, the technique of "Kintsugi"—restoring broken ceramics with lacquer and gold dust—does not conceal flaws, but rather embodies the spirit of revering the history of that very damage as unique beauty. In a modern society prone to chasing perfection, this philosophy of embracing the incomplete and cherishing transient time never ceases to fascinate people worldwide.`,
    translationMy: `ဂျပန်အလှဗေဒ၏ အခြေခံအုတ်မြစ်တွင် "ဝါဘိ-ဆာဘိ" (Wabi-Sabi) ဟူသော ထူးခြားသည့် အလှတရားအတွေးအခေါ်တစ်ခု ရှိနေပါသည်။ အနောက်တိုင်းရိုးရာ အလှအပဆိုင်ရာ ရှုထောင့်က ဘယ်ညာညီညာသော အချိုးအစားနှင့် ထာဝစဉ်မပြောင်းလဲသည့် ပြီးပြည့်စုံမှုကို ရှာဖွေခဲ့ကြသည်နှင့် ဆန့်ကျင်ဘက်အနေဖြင့်၊ ဂျပန်တို့၏ "ဝါဘိ-ဆာဘိ" သည် မပြည့်စုံမှု၊ မမြဲခြင်းတရားနှင့် အချိန်ကာလကြာမြင့်လာမှုကြောင့် ဖြစ်ပေါ်လာသည့် ရင့်ရော်ယိုယွင်းမှုများအတွင်းမှပင် နက်နဲသော အလှတရားကို ရှာဖွေတွေ့ရှိရန် ကြိုးပမ်းပါသည်။ "ဝါဘိ" ဆိုသည်မှာ ရုပ်ဝတ္ထုပိုင်းဆိုင်ရာ ချို့တဲ့မှုကို လက်ခံပြီး ရိုးရှင်းအေးချမ်းသော ဘဝနေထိုင်မှုအတွင်းမှ စိတ်ပိုင်းဆိုင်ရာ ကြွယ်ဝမှုကို ရှာဖွေတွေ့ရှိသည့် စိတ်ထားကို ဆိုလိုပါသည်။ တစ်ဖက်တွင်လည်း "ဆာဘိ" ဆိုသည်မှာ ကာလကြာမြင့်လာမှုကြောင့် မျက်နှာပြင်တွင် သံချေးတက်ခြင်း သို့မဟုတ် အရောင်မှိန်ပြယ်သွားသည့် အသွင်အပြင်တွင် ကိန်းအောင်းနေသော ရိုးသားငြိမ်သက်သည့် အလှတရားကို ဖော်ပြပါသည်။ ဥပမာအားဖြင့် ကွဲအက်သွားသော ကြွေထည်များကို သစ်စေးနှင့် ရွှေမှုန့်များဖြင့် လှပစွာ ပြန်လည်ပြင်ဆင်သည့် "ကင်းဆွတ်ဂိ" (Kintsugi) အနုပညာသည် အက်ကွဲရာများကို ဖုံးကွယ်မထားဘဲ ထိုထိခိုက်ပျက်စီးမှု၏ သမိုင်းကြောင်းကိုပင် သီးသန့်အလှတရားအဖြစ် မြတ်နိုးတန်ဖိုးထားသည့် စိတ်ဓာတ်၏ ပြယုဂ်ဖြစ်ပါသည်။ ပြီးပြည့်စုံမှုကိုသာ အလွန်အမင်း တောင့်တနေကြသော ယနေ့ခေတ်လူ့ဘောင်တွင် မပြည့်စုံသောအရာများကို လက်ခံနိုင်ပြီး ပြောင်းလဲနေသော အချိန်ကာလကို ချစ်မြတ်နိုးတတ်သည့် ဤအတွေးအခေါ်သည် ကမ္ဘာတစ်ဝှမ်းရှိ လူသားများကို အစဉ်မပြတ် ဆွဲဆောင်လျက် ရှိနေပါသည်။`,
    vocabularyList: [
      { word: '無常感', reading: 'むじょうかん', meaning: 'sense of transience/impermanence', meaningMy: 'မမြဲခြင်းတရားကို ခံစားသိရှိမှု' },
      { word: '風化', reading: 'ふうか', meaning: 'weathering, natural fading over time', meaningMy: 'ရာသီဥတုနှင့် အချိန်ကြောင့် ယိုယွင်းမှု' },
      { word: '金継ぎ', reading: 'きんつぎ', meaning: 'Kintsugi (repairing pottery with gold lacquer)', meaningMy: 'ရွှေမှုန့်သစ်စေးဖြင့် ကြွေထည်ပြင်ဆင်သည့်အနုပညာ' },
      { word: '魅了してやまない', reading: 'みりょうしてやまない', meaning: 'never ceases to fascinate', meaningMy: 'အစဉ်မပြတ် ဆွဲဆောင်လျက်ရှိသည်' },
    ],
    grammarPoints: [
      { grammar: '～のに対して', meaning: 'in contrast to ~', meaningMy: '...နှင့် ဆန့်ကျင်ဘက်အနေဖြင့်', explanation: 'Contrasts opposing philosophical perspectives.', exampleJp: '完璧さを追求したのに対し、不完全さに趣を見出します。' },
      { grammar: '～てやまない', meaning: 'cannot stop doing ~ / endlessly ~', meaningMy: 'အစဉ်မပြတ် ...လျက်ရှိသည် (အဆုံးမရှိ)', explanation: 'Formal literary expression of endless feeling: 魅了してやまない。', exampleJp: '世界中の人々を魅了してやみません。' },
    ],
    audioScript: '日本のわびさびは不完全さや無常感の中に美を見出します。金継ぎのように傷を隠さず愛でる精神は、世界中の人々を魅了してやみません。',
    questions: [
      {
        id: 'rq-n2-03-1',
        questionJp: '「わび・さび」の美意識と西洋の伝統的美意識の相違点として、最も適切なものはどれですか？',
        questionEn: 'What is the most appropriate difference between Wabi-Sabi and traditional Western aesthetics?',
        questionMy: '"ဝါဘိ-ဆာဘိ" နှင့် အနောက်တိုင်းရိုးရာ အလှဗေဒတို့၏ ခြားနားချက်မှာ အဘယ်နည်း။',
        options: [
          '西洋が不完全さを尊ぶのに対し、日本は完全な左右対称を追求する点',
          '西洋が永遠の完璧さを求めたのに対し、日本は風化や不完全さの中に美を見出す点',
          '日本は金粉だけを使い、西洋は木だけを使う点',
          '両者ともに全く同じ美しさを目指している点',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「西洋が...完璧さを追求してきたのに対し、日本の『わび・さび』は、むしろ不完全さや無常感...の中に深い趣を見出そうとします」(Western perfection vs Japanese beauty in imperfection).',
        explanationMy: 'အနောက်တိုင်းက ပြီးပြည့်စုံမှုကို ရှာဖွေချိန်တွင် ဂျပန်တို့က မပြည့်စုံမှုနှင့် အိုမင်းရင့်ရော်မှုထဲမှ အလှကို ရှာဖွေခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-03-2',
        questionJp: '「金継ぎ」の技法が象徴している精神とはどのようなものですか？',
        questionEn: 'What spirit is symbolized by the technique of "Kintsugi"?',
        questionMy: '"ကင်းဆွတ်ဂိ" အနုပညာက ကိုယ်စားပြုသော စိတ်ဓာတ်မှာ အဘယ်နည်း။',
        options: [
          '壊れた器をゴミとして素早く処分する冷徹さ',
          '傷を隠すのではなく、その損傷の歴史そのものを固有の美として慈しむ精神',
          '新品の器をわざと割って金粉を売る商業主義',
          '西洋の技術をそのまま真似する態度',
        ],
        correctIndex: 1,
        explanation: 'The passage notes: 「傷を隠すのではなく、その損傷の歴史こそを独自の美として愛でる精神の表れ」(Embracing the history of damage as unique beauty).',
        explanationMy: 'အက်ကွဲရာကို ဖုံးကွယ်မထားဘဲ ထိုပျက်စီးမှု၏ သမိုင်းကြောင်းကိုပင် သီးခြားအလှတရားအဖြစ် မြတ်နိုးတန်ဖိုးထားခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'N2 aesthetic philosophical discourse confirmed for nuanced cultural concepts.',
  },

  // 4. Food & Dining
  {
    id: 'r-n2-04',
    title: '発酵食品の知恵と微生物の力',
    titleEn: 'Wisdom of Fermented Foods and Microbial Power',
    titleMy: 'အချဉ်ဖောက် အစားအစာများ၏ ဉာဏ်ပညာနှင့် အဏုဇီဝပိုးတို့၏ စွမ်းအား',
    level: 'N2',
    topic: 'food',
    subtopic: 'Koji mold, miso, soy sauce, and gut microbiome longevity',
    learningObjectives: ['Comprehend food science and microbiology in cultural contexts', 'Understand functional grammatical structures: ～を機に and ～に伴う'],
    learningObjectivesMy: ['အစာအာဟာရသိပ္ပံဆိုင်ရာ ရှင်းလင်းချက်များကို နားလည်စေရန်', 'အဏုဇီဝပိုးမွှားများ၏ အကျိုးပြုပုံကို ဂျပန်ဘာသာဖြင့် သုံးသပ်တတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `[日本]{にほん}の[伝統的]{でんとうてき}な[食生活]{しょくせいかつ}は、みそ、しょうゆ、[納豆]{なっとう}、[漬物]{つけもの}、[日本酒]{にほんしゅ}といった「[発酵]{はっこう}[食品]{しょくひん}」に[支]{ささ}えられてきました。
[高温多湿]{こうおんたしつ}な[気候]{きこう}を[逆手]{さかて}にとり、[目]{め}に[見]{み}えない[微生物]{びせいぶつ}の[働]{はたら}きを[巧]{たく}みにコントロールしてきた[先人]{せんじん}たちの[知恵]{ちえ}の[結晶]{けっしょう}です。
その[中核]{ちゅうかく}をなすのが、[日本]{にほん}の「[国菌]{こっきん}」とも[呼]{よ}ばれる「[麹菌]{こうじきん}」です。
麹菌が[穀物]{こくもつ}に[繁殖]{はんしょく}する[際]{さい}に[生]{う}み[出]{だ}す[酵素]{こうそ}は、デンプンをブドウ[糖]{とう}に、タンパク[質]{しつ}をアミノ[酸]{さん}に[分解]{ぶんかい}します。
これによって、[食材]{しょくざい}の[保存性]{ほぞんせい}が[劇的]{げきてき}に[高]{たか}まるだけでなく、[深]{ふか}い「うま[味]{み}」や[芳醇]{ほうじゅん}な[香]{かお}りが[生]{う}み[出]{だ}されるのです。
さらに近年の腸内細菌叢（マイクロバイオーム）研究によって、発酵食品が免疫力の活性化や生活習慣病予防に寄与することが科学的にも実証されつつあります。
古来の伝統知と最先端の生命科学が共鳴し、発酵文化の価値が世界的に再評価されています。`,
    passagePlain: `日本の伝統的な食生活は、みそ、しょうゆ、納豆、漬物、日本酒といった「発酵食品」に支えられてきました。
高温多湿な気候を逆手にとり、目に見えない微生物の働きを巧みにコントロールしてきた先人たちの知恵の結晶です。
その中核をなすのが、日本の「国菌」とも呼ばれる「麹菌」です。
麹菌が穀物に繁殖する際に生み出す酵素は、デンプンをブドウ糖に、タンパク質をアミノ酸に分解します。
これによって、食材の保存性が劇的に高まるだけでなく、深い「うま味」や芳醇な香りが生み出されるのです。
さらに近年の腸内細菌叢（マイクロバイオーム）研究によって、発酵食品が免疫力の活性化や生活習慣病予防に寄与することが科学的にも実証されつつあります。
古来の伝統知と最先端の生命科学が共鳴し、発酵文化の価値が世界的に再評価されています。`,
    translationEn: `Traditional Japanese dietary life has long been supported by "fermented foods" such as miso, soy sauce, natto, pickles, and sake. Taking clever advantage of a hot and humid climate, these are the crystal of our ancestors' wisdom in deftly controlling the actions of invisible microorganisms. At the core lies "Koji mold" (Aspergillus oryzae), often referred to as Japan's "national fungus." Enzymes produced when koji mold propagates on grains break down starches into glucose and proteins into amino acids. Through this, not only is the preservability of ingredients dramatically heightened, but profound "umami" and mellow aromas are generated. Furthermore, recent research on gut microbiota (microbiome) is scientifically demonstrating that fermented foods contribute to immune activation and lifestyle disease prevention. Ancient traditional wisdom and cutting-edge life science resonate, leading to a worldwide re-evaluation of fermentation culture.`,
    translationMy: `ဂျပန်တို့၏ ရိုးရာစားသောက်မှုဘဝသည် မီဆို၊ ပဲငံပြာရည်၊ နတ်တိုး၊ ချဉ်ဖတ်နှင့် ဂျပန်အရက် (ဆာကေး) ကဲ့သို့သော "အချဉ်ဖောက်အစားအစာများ" အပေါ်တွင် အခြေခံထားခဲ့ပါသည်။ ပူအိုက်စွတ်စိုသော ရာသီဥတုကို အခွင့်ကောင်းယူကာ မျက်စိဖြင့် မမြင်နိုင်သော အဏုဇီဝပိုးမွှားများ၏ လုပ်ဆောင်ချက်များကို ကျွမ်းကျင်စွာ ထိန်းချုပ်အသုံးချခဲ့ကြသည့် ရှေးဘိုးဘွားတို့၏ ဉာဏ်ပညာရလဒ် ဖြစ်ပါသည်။ ယင်း၏ အဓိကဗဟိုချက်မှာ ဂျပန်နိုင်ငံ၏ "အမျိုးသားမှိုပိုး" ဟု တင်စားကြသည့် "ခိုဂျိမှိုပိုး" (Koji-kin) ဖြစ်ပါသည်။ ကောက်ပဲသီးနှံများပေါ်တွင် ခိုဂျိမှိုပိုး ပေါက်ဖွားချိန်၌ ထွက်ပေါ်လာသော အင်ဇိုင်းများသည် ကစီဓာတ်ကို ဂလူးကို့စ်အဖြစ်သို့ လည်းကောင်း၊ ပရိုတင်းဓာတ်ကို အမိုင်နိုအက်ဆစ်အဖြစ်သို့ လည်းကောင်း ဖြိုခွဲပေးပါသည်။ ယင်းကြောင့် အစားအစာများကို တာရှည်ခံစေရုံသာမက နက်ရှိုင်းသော "အိုမာမိအရသာ" (Umami) နှင့် သင်းပျံ့သောရနံ့များကို ထွက်ပေါ်စေပါသည်။ ထို့အပြင် မကြာသေးမီက အူလမ်းကြောင်း ဘက်တီးရီးယားစနစ် (Microbiome) ဆိုင်ရာ သုတေသနများအရ အချဉ်ဖောက်အစားအစာများသည် ကိုယ်ခံစွမ်းအားကို မြှင့်တင်ပေးပြီး လူနေမှုပုံစံရောဂါများကို ကာကွယ်ပေးနိုင်ကြောင်း သိပ္ပံနည်းကျ သက်သေပြလာနိုင်ပြီ ဖြစ်ပါသည်။ ရှေးရိုးရာဉာဏ်ပညာနှင့် ခေတ်မီဇီဝသိပ္ပံတို့ ပေါင်းစပ်လာပြီး အချဉ်ဖောက်ယဉ်ကျေးမှု၏ တန်ဖိုးကို တစ်ကမ္ဘာလုံးက ပြန်လည်အသိအမှတ်ပြုလာကြပါသည်။`,
    vocabularyList: [
      { word: '逆手にとる', reading: 'さかてにとる', meaning: 'to turn a disadvantage into an advantage', meaningMy: 'အားနည်းချက်ကို အခွင့်ကောင်းယူသည်' },
      { word: '麹菌', reading: 'こうじきん', meaning: 'Aspergillus oryzae (koji mold)', meaningMy: 'ခိုဂျိမှိုပိုး (ဂျပန်ရိုးရာအချဉ်ဖောက်မှို)' },
      { word: '芳醇な', reading: 'ほうじゅんな', meaning: 'mellow, rich and fragrant', meaningMy: 'သင်းပျံ့ကြွယ်ဝသော' },
      { word: '実証される', reading: 'じっしょうされる', meaning: 'to be empirically/scientifically proven', meaningMy: 'လက်တွေ့သက်သေပြခံရသည်' },
    ],
    grammarPoints: [
      { grammar: '～を逆手にとって', meaning: 'turning ~ to one’s advantage', meaningMy: '...ကို အခွင့်ကောင်းယူပြီး', explanation: 'Idiomatic expression of strategic adaptation.', exampleJp: '高温多湿な気候を逆手にとります。' },
      { grammar: '～だけでなく、～も', meaning: 'not only ~, but also ...', meaningMy: '...သာမက ...လည်း', explanation: 'Cumulative expansion of benefits.', exampleJp: '保存性が高まるだけでなく、うま味も生まれます。' },
    ],
    audioScript: '日本の発酵食品は高温多湿な気候を逆手にとった先人の知恵です。麹菌が生み出す酵素がうま味を作り、腸内環境を整えて免疫力を高めます。',
    questions: [
      {
        id: 'rq-n2-04-1',
        questionJp: '麹菌が食材にもたらす具体的な科学的変化として書かれているものはどれですか？',
        questionEn: 'What specific chemical change brought by Koji mold is described?',
        questionMy: 'ခိုဂျိမှိုပိုးကြောင့် အစားအစာများတွင် ဖြစ်ပေါ်လာသည့် သိပ္ပံနည်းကျပြောင်းလဲမှုမှာ အဘယ်နည်း။',
        options: [
          '水分を完全に蒸発させて乾燥させること',
          '酵素がデンプンを糖に、タンパク質をアミノ酸に分解してうま味を作ること',
          'すべての細菌を完全に死滅させて無菌状態にすること',
          '食材のカロリーをゼロにすること',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「デンプンをブドウ糖に、タンパク質をアミノ酸に分解します...うま味や芳醇な香りが生み出される」(Breaks down starches and proteins into sugars and amino acids).',
        explanationMy: 'ကစီဓာတ်ကို သကြားအဖြစ်၊ ပရိုတင်းကို အမိုင်နိုအက်ဆစ်အဖြစ် ဖြိုခွဲကာ အိုမာမိအရသာကို ဖန်တီးပေးခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-04-2',
        questionJp: '近年の研究で科学的に実証されつつある発酵食品の健康効果は何ですか？',
        questionEn: 'What health benefit of fermented foods is being scientifically demonstrated recently?',
        questionMy: 'မကြာသေးမီက သုတေသနများအရ သိပ္ပံနည်းကျ သက်သေပြလာသော ကျန်းမာရေးအကျိုးကျေးဇူးမှာ အဘယ်နည်း။',
        options: [
          '骨折が１秒で治ること',
          '視力が２倍になること',
          '免疫力の活性化や生活習慣病の予防に寄与すること',
          '睡眠が全く不要になること',
        ],
        correctIndex: 2,
        explanation: 'Sentence says: 「免疫力の活性化や生活習慣病予防に寄与することが科学的にも実証されつつあります」(Immune activation and lifestyle disease prevention).',
        explanationMy: 'ကိုယ်ခံစွမ်းအားကို တက်ကြွစေပြီး လူနေမှုပုံစံရောဂါများကို ကာကွယ်ပေးနိုင်ခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Biochemical terminology and historical context reviewed for N2 benchmark level.',
  },

  // 5. Travel & Transport
  {
    id: 'r-n2-05',
    title: 'オーバーツーリズムの深刻化と持続可能な観光',
    titleEn: 'Escalating Overtourism and Sustainable Tourism',
    titleMy: 'ခရီးသွားလွန်ကဲမှုပြဿနာ ဆိုးရွားလာခြင်းနှင့် ရေရှည်တည်တံ့သော ခရီးသွားလုပ်ငန်း',
    level: 'N2',
    topic: 'travel',
    subtopic: 'Tourism pollution, local resident disruption, and congestion management',
    learningObjectives: ['Comprehend policy arguments concerning socio-economic dilemmas', 'Understand critical transitional expressions: ～をめぐって and ～を余儀なくされる'],
    learningObjectivesMy: ['ခရီးသွားလုပ်ငန်းဆိုင်ရာ လူမှုရေးပြဿနာဆောင်းပါးများကို နားလည်စေရန်', '～をめぐって (နှင့်ပတ်သက်၍ အငြင်းပွားမှု) ကို သုံးတတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `[円安]{えんやす}やビザ[緩和]{かんわ}の[影響]{えいきょう}もあり、[訪日]{ほうにち}[外国人]{がいこくじん}[観光客]{かんこうきゃく}の[数]{かず}は[記録的]{きろくてき}な[水準]{すいじゅん}に[達]{たっ}しています。
インバウンド消費が地域経済を潤すという大きな経済効果がある一方で、特定の観光地に旅行者が過剰に集中する「オーバーツーリズム（観光公害）」が各地で深刻な摩擦を引き起こしています。
京都などの歴史都市では、路線バスが観光客で満杯になり、地元住民が通勤や通院に利用できない事態が発生しています。
さらに、ごみのポイ捨て、深夜の騒音、私有地への無断立ち入りなど、マナー違反をめぐる住民と観光客のトラブルも後を絶ちません。
観光公害への対策として、二重価格制の導入や、人気エリアへの入場規制、観光税の徴収など、多面的な施策が検討され始めています。
観光業の発展と地域住民の平穏な生活をいかに両立させるかという課題は、日本社会全体が直面する喫緊の命題なのです。`,
    passagePlain: `円安やビザ緩和の影響もあり、訪日外国人観光客の数は記録的な水準に達しています。
インバウンド消費が地域経済を潤すという大きな経済効果がある一方で、特定の観光地に旅行者が過剰に集中する「オーバーツーリズム（観光公害）」が各地で深刻な摩擦を引き起こしています。
京都などの歴史都市では、路線バスが観光客で満杯になり、地元住民が通勤や通院に利用できない事態が発生しています。
さらに、ごみのポイ捨て、深夜の騒音、私有地への無断立ち入りなど、マナー違反をめぐる住民と観光客のトラブルも後を絶ちません。
観光公害への対策として、二重価格制の導入や、人気エリアへの入場規制、観光税の徴収など、多面的な施策が検討され始めています。
観光業の発展と地域住民の平穏な生活をいかに両立させるかという課題は、日本社会全体が直面する喫緊の命題なのです。`,
    translationEn: `Influenced by the depreciating yen and eased visa requirements, the number of inbound foreign tourists to Japan has reached record levels. While inbound consumption yields immense economic benefits that enrich regional economies, "overtourism" (tourism pollution)—where travelers excessively concentrate in specific sightseeing locales—is triggering severe friction across the country. In historic cities like Kyoto, regular route buses become packed with tourists, causing situations where local residents cannot utilize them for commuting or hospital visits. Furthermore, littering, late-night noise, and unauthorized trespassing on private property result in unending disputes between residents and tourists over etiquette violations. As countermeasures, multifaceted policies such as introducing dual-pricing systems, entry restrictions to popular zones, and tourism taxes have begun to be examined. Balancing the advancement of the tourism industry with the tranquil lives of local residents is an urgent proposition facing Japanese society as a whole.`,
    translationMy: `ယန်းငွေတန်ဖိုးကျဆင်းခြင်းနှင့် ဗီဇာဖြေလျှော့ပေးမှုတို့ကြောင့် ဂျပန်သို့လာရောက်သည့် နိုင်ငံခြားသားခရီးသွားဦးရေသည် စံချိန်တင်အဆင့်သို့ ရောက်ရှိလာခဲ့ပါသည်။ နိုင်ငံခြားခရီးသွားများ၏ သုံးစွဲငွေသည် ဒေသတွင်းစီးပွားရေးကို အထောက်အကူပြုသည့် ကြီးမားသော စီးပွားရေးအကျိုးအမြတ်ရှိသော်လည်း သတ်မှတ်ခရီးသွားနေရာများသို့ ခရီးသည်များ အလွန်အမင်း စုပြုံရောက်ရှိလာသည့် "ခရီးသွားလွန်ကဲမှုပြဿနာ" (Overtourism) သည် နေရာအနှံ့အပြားတွင် ပြင်းထန်သော ပဋိပက္ခများကို ဖြစ်ပေါ်စေလျက် ရှိပါသည်။ ကျိုတိုကဲ့သို့သော သမိုင်းဝင်မြို့များတွင် လိုင်းဘတ်စ်ကားများမှာ ခရီးသွားများဖြင့် ပြည့်ကျပ်နေသဖြင့် ဒေသခံပြည်သူများသည် အလုပ်သွားခြင်းနှင့် ဆေးရုံပြသခြင်းများအတွက် စီးနင်းနိုင်ခြင်းမရှိသည့် အခြေအနေများ ဖြစ်ပေါ်နေပါသည်။ ထို့အပြင် အမှိုက်စည်းကမ်းမဲ့စွန့်ပစ်ခြင်း၊ ညဉ့်နက်သန်းခေါင် ဆူညံခြင်း၊ ပုဂ္ဂလိကမြေအတွင်း ခွင့်ပြုချက်မရှိဘဲ ဝင်ရောက်ခြင်း စသည့် စည်းကမ်းဖောက်ဖျက်မှုများကို အကြောင်းပြု၍ ဒေသခံများနှင့် ခရီးသွားများအကြား ပြဿနာများ မပြတ်ဖြစ်ပွားနေပါသည်။ ဤပြဿနာကို ဖြေရှင်းရန်အတွက် ဒေသခံနှင့် ခရီးသွားများအကြား ဈေးနှုန်းနှစ်မျိုးသတ်မှတ်ခြင်း၊ နာမည်ကြီးနေရာများသို့ ဝင်ရောက်ခွင့်ကန့်သတ်ခြင်းနှင့် ခရီးသွားအခွန်ကောက်ခံခြင်း စသည့် ဘက်စုံမူဝါဒများကို စတင်စဉ်းစားလာကြပြီ ဖြစ်ပါသည်။ ခရီးသွားလုပ်ငန်း ဖွံ့ဖြိုးတိုးတက်ရေးနှင့် ဒေသခံပြည်သူတို့၏ အေးချမ်းသာယာသော ဘဝနေထိုင်မှုတို့ကို မည်သို့မျှတစွာ ဟန်ချက်ညီစေမည်နည်းဟူသော ပြဿနာသည် ဂျပန်လူ့ဘောင်တစ်ခုလုံး ရင်ဆိုင်နေရသည့် အရေးတကြီး ဖြေရှင်းရမည့် ပုစ္ဆာတစ်ရပ် ဖြစ်ပါသည်။`,
    vocabularyList: [
      { word: '摩擦', reading: 'まさつ', meaning: 'friction, conflict', meaningMy: 'ပွတ်တိုက်မှု၊ ပဋိပက္ခ' },
      { word: '後を絶たない', reading: 'あとをたたない', meaning: 'never-ending, continuous', meaningMy: 'မပြတ်ဖြစ်ပွားနေသည်' },
      { word: '両立させる', reading: 'りょうりつさせる', meaning: 'to achieve both, balance simultaneously', meaningMy: 'နှစ်ဖက်စလုံးကို မျှတအောင် ပြုလုပ်သည်' },
      { word: '喫緊の命題', reading: 'きっきんのめいだい', meaning: 'urgent proposition/issue', meaningMy: 'အရေးတကြီး ဖြေရှင်းရမည့် အဓိကကိစ္စ' },
    ],
    grammarPoints: [
      { grammar: '～をめぐって', meaning: 'concerning / centering around (disputes)', meaningMy: '...ကို အကြောင်းပြု၍ (အငြင်းပွားခြင်း)', explanation: 'Used with conflict, debate, or controversies.', exampleJp: 'マナー違反をめぐるトラブルが後を絶ちません。' },
      { grammar: 'いかに～か', meaning: 'how / to what extent ~', meaningMy: 'မည်သို့မည်ပုံ ...မည်နည်း', explanation: 'Interrogative clause introducing complex deliberation.', exampleJp: 'いかに両立させるかという課題です。' },
    ],
    audioScript: '訪日観光客が増加する一方、混雑やマナー違反によるオーバーツーリズムが深刻化しています。経済効果と地域住民の平穏な生活の両立が求められています。',
    questions: [
      {
        id: 'rq-n2-05-1',
        questionJp: 'オーバーツーリズムによって京都などの歴史都市で生じている具体的な問題は何ですか？',
        questionEn: 'What specific problem is occurring in historical cities like Kyoto due to overtourism?',
        questionMy: 'ခရီးသွားလွန်ကဲမှုကြောင့် ကျိုတိုကဲ့သို့သော မြို့များတွင် ဖြစ်ပေါ်နေသည့် တိကျသော ပြဿနာမှာ အဘယ်နည်း။',
        options: [
          'お寺や神社がすべて取り壊されたこと',
          '路線バスが観光客で満杯になり、地元住民が通勤や通院に利用できないこと',
          '外国人観光客が一人も来なくなったこと',
          '新幹線が廃止されて電車が走らなくなったこと',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「路線バスが観光客で満杯になり、地元住民が通勤や通院に利用できない事態が発生しています」(Local residents cannot board crowded buses).',
        explanationMy: 'လိုင်းဘတ်စ်ကားများမှာ ခရီးသွားများဖြင့် ပြည့်ကျပ်နေသဖြင့် ဒေသခံများ အလုပ်သွားဆေးရုံသွား စီးမရခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-05-2',
        questionJp: '日本社会全体が直面している「喫緊の命題」として筆者が結論づけているのはどれですか？',
        questionEn: 'What does the author conclude as the "urgent proposition" facing Japanese society?',
        questionMy: 'ဂျပန်လူ့ဘောင်တစ်ခုလုံး ရင်ဆိုင်နေရသော အရေးတကြီးပြဿနာအဖြစ် စာရေးသူက နိဂုံးချုပ်ထားသော အချက်မှာ အဘယ်နည်း။',
        options: [
          '観光客を全員強制的に国外退去させること',
          '観光業の発展と地域住民の平穏な生活をいかに両立させるかということ',
          'すべての道路を有料化すること',
          '住民票を持たない人のバス乗車を禁止すること',
        ],
        correctIndex: 1,
        explanation: 'The final sentence asserts: 「観光業の発展と地域住民の平穏な生活をいかに両立させるかという課題」(Balancing tourism growth with residents’ peaceful lives).',
        explanationMy: 'ခရီးသွားလုပ်ငန်း တိုးတက်ရေးနှင့် ဒေသခံတို့၏ အေးချမ်းသောဘဝကို မည်သို့ ဟန်ချက်ညီစေမည်နည်းဟူသော အချက်ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Validated for N2 social-issues reading and accurate economic vocabulary.',
  },

  // 6. Work & Professional
  {
    id: 'r-n2-06',
    title: '成果主義の導入と日本的雇用慣行の揺らぎ',
    titleEn: 'Performance-Based Pay and the Shaking of Traditional Japanese Employment',
    titleMy: 'စွမ်းဆောင်ရည်အခြေပြုစနစ်နှင့် ဂျပန်ရိုးရာ အလုပ်အကိုင်စနစ်၏ ပြောင်းလဲမှုများ',
    level: 'N2',
    topic: 'work',
    subtopic: 'Seniority-wage system, lifetime employment, and job-based hiring',
    learningObjectives: ['Analyze economic journalism texts on corporate HR reforms', 'Understand complex comparative constructions: ～を契機として and ～にほかならない'],
    learningObjectivesMy: ['ကုမ္ပဏီဝန်ထမ်းခန့်ထားမှုစနစ် ပြုပြင်ပြောင်းလဲရေးဆောင်းပါးများကို နားလည်စေရန်', '～を契機として (ကို အကြောင်းပြု၍) ကို သုံးတတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `[戦後]{せんご}の[日本]{にほん}の[高度]{こうど}[経済]{けいざい}[成長]{せいちょう}を[支]{ささ}えてきたのは、「[終身]{しゅうしん}[雇用]{こよう}」と「[年功序列]{ねんこうじょれつ}」を[二本]{にほん}の[柱]{はしら}とする[日本型]{にほんがた}[雇用]{こよう}[慣行]{かんこう}でした。
[新卒]{しんそつ}で[入社]{にゅうしゃ}した[会社]{かいしゃ}に[定年]{ていねん}まで[勤]{つと}め[上]{あ}げ、[年齢]{ねんれい}や[勤続]{きんぞく}[年数]{ねんすう}が[上]{あ}がるにつれて[役職]{やくしょく}と[給与]{きゅうよ}が[自動的]{じどうてき}に[上昇]{じょうしょう}するシステムは、[従業員]{じゅうぎょういん}の[帰属]{きぞく}[意識]{いしき}を[高]{たか}め、[長期的]{ちょうきてき}な[人材]{じんざい}[育成]{いくせい}を[可能]{かのう}にしてきました。
しかし、[少子高齢化]{しょうしこうれいか}に伴う[人件費]{じんけんひ}の[増大]{ぞうだい}や、グローバルな[市場]{しじょう}[競争]{きょうそう}の[激化]{げきか}、さらにはデジタル[変革]{へんかく}（ＤＸ）の[波]{なみ}が[押]{お}し[寄]{よ}せる[中]{なか}で、このモデルは[維持]{いじ}が[困難]{こんなん}になりつつあります。
年齢に関係なく個人の専門性や業績を評価する「ジョブ型雇用」や「成果主義」へ舵を切る企業が相次いでいます。
一方で、成果主義の行き過ぎは短期的利益への偏重やチームワークの崩壊を招きかねないという懸念もあり、伝統と革新の調和が模索されています。`,
    passagePlain: `戦後の日本の高度経済成長を支えてきたのは、「終身雇用」と「年功序列」を二本の柱とする日本型雇用慣行でした。
新卒で入社した会社に定年まで勤め上げ、年齢や勤続年数が上がるにつれて役職と給与が自動的に上昇するシステムは、従業員の帰属意識を高め、長期的な人材育成を可能にしてきました。
しかし、少子高齢化に伴う人件費の増大や、グローバルな市場競争の激化、さらにはデジタル変革（ＤＸ）の波が押し寄せる中で、このモデルは維持が困難になりつつあります。
年齢に関係なく個人の専門性や業績を評価する「ジョブ型雇用」や「成果主義」へ舵を切る企業が相次いでいます。
一方で、成果主義の行き過ぎは短期的利益への偏重やチームワークの崩壊を招きかねないという懸念もあり、伝統と革新の調和が模索されています。`,
    translationEn: `What supported Japan's rapid postwar economic growth were traditional employment practices founded on the twin pillars of "lifetime employment" and the "seniority wage system." Serving at the company joined upon graduation until retirement, with positions and salaries rising automatically as age and years of service increased, elevated employees' sense of loyalty and enabled long-term human resource development. However, amidst expanding labor costs accompanying an aging society, intensifying global market competition, and the surging tide of digital transformation (DX), sustaining this model has become increasingly difficult. Successive enterprises are steering toward "job-based hiring" and "performance-based systems" that evaluate individual specialization and achievements regardless of age. On the other hand, concerns persist that excessive performance orientation could lead to disproportionate emphasis on short-term profits and the disintegration of teamwork, prompting a search for harmony between tradition and innovation.`,
    translationMy: `ဒုတိယကမ္ဘာစစ်အပြီး ဂျပန်နိုင်ငံ၏ စီးပွားရေးအရှိန်အဟုန်ဖြင့် ဖွံ့ဖြိုးတိုးတက်မှုကို အထောက်အကူပြုခဲ့သည်မှာ "တစ်သက်တာအလုပ်အကိုင်အာမခံချက်" (Lifetime Employment) နှင့် "လုပ်သက်ဦးစားပေးစနစ်" (Seniority System) ဟူသော မဏ္ဍိုင်ကြီးနှစ်ရပ်ပေါ်တွင် တည်ဆောက်ထားသည့် ဂျပန်ရိုးရာအလုပ်အကိုင်စနစ် ဖြစ်ပါသည်။ ကျောင်းပြီးစတွင် ဝင်ရောက်ခဲ့သော ကုမ္ပဏီ၌ ပင်စင်ယူသည်အထိ လုပ်ကိုင်ပြီး အသက်အရွယ်နှင့် လုပ်သက်ကြာမြင့်လာသည်နှင့်အမျှ ရာထူးနှင့် လစာသည် အလိုအလျောက် တိုးတက်လာသည့် ဤစနစ်သည် ဝန်ထမ်းများ၏ သစ္စာစောင့်သိမှုကို မြှင့်တင်ပေးခဲ့ပြီး ရေရှည်လူ့စွမ်းအားအရင်းအမြစ် ဖွံ့ဖြိုးမှုကို ဖြစ်ထွန်းစေခဲ့ပါသည်။ သို့သော် သက်ကြီးရွယ်အိုဦးရေ များပြားလာမှုကြောင့် လုပ်ခလစာစရိတ် ကြီးမားလာခြင်း၊ တစ်ကမ္ဘာလုံးဆိုင်ရာ ဈေးကွက်ပြိုင်ဆိုင်မှု ပြင်းထန်လာခြင်းနှင့် ဒစ်ဂျစ်တယ်အသွင်ကူးပြောင်းမှု (DX) လှိုင်းလုံးကြီးများ ရောက်ရှိလာခြင်းတို့ကြောင့် ဤစနစ်ကို ဆက်လက်ထိန်းသိမ်းရန် ခက်ခဲလာနေပြီ ဖြစ်ပါသည်။ အသက်အရွယ်နှင့် မသက်ဆိုင်ဘဲ တစ်ဦးချင်းစီ၏ ကျွမ်းကျင်မှုနှင့် စွမ်းဆောင်ရည်အပေါ် အကဲဖြတ်သည့် "စွမ်းဆောင်ရည်အခြေပြုစနစ်" ဘက်သို့ ဦးတည်ပြောင်းလဲလာသော ကုမ္ပဏီများ တစ်ခုပြီးတစ်ခု ပေါ်ပေါက်လာနေပါသည်။ အခြားတစ်ဖက်တွင်လည်း စွမ်းဆောင်ရည်ကိုသာ အလွန်အမင်း အလေးပေးလွန်းပါက ရေတိုအမြတ်အစွန်းကိုသာ ဦးစားပေးမိခြင်းနှင့် အဖွဲ့လိုက်လက်တွဲလုပ်ဆောင်မှု ပျက်ပြားသွားစေနိုင်သည်ဟူသော စိုးရိမ်မှုများလည်း ရှိနေသဖြင့် ရိုးရာနှင့် တီထွင်ဆန်းသစ်မှုအကြား ဟန်ချက်ညီစေရန် ရှာဖွေဖော်ထုတ်နေကြပါသည်။`,
    vocabularyList: [
      { word: '終身雇用', reading: 'しゅうしんこよう', meaning: 'lifetime employment', meaningMy: 'တစ်သက်တာအလုပ်အကိုင်စနစ်' },
      { word: '年功序列', reading: 'ねんこうじょれつ', meaning: 'seniority-by-length-of-service system', meaningMy: 'လုပ်သက်အရ အဆင့်သတ်မှတ်စနစ်' },
      { word: '帰属意識', reading: 'きぞくいしき', meaning: 'sense of belonging, corporate loyalty', meaningMy: 'အဖွဲ့အစည်းအပေါ် သစ္စာစောင့်သိမှု' },
      { word: '招きかねない', reading: 'まねきかねない', meaning: 'could invite / risk causing (negative)', meaningMy: 'ဖြစ်ပေါ်စေနိုင်သည် (ဆိုးကျိုး)' },
    ],
    grammarPoints: [
      { grammar: '～につれて', meaning: 'as ~ increases, proportionally ...', meaningMy: '...နှင့်အမျှ အချိုးကျ ပြောင်းလဲလာသည်', explanation: 'Proportional progression with natural momentum.', exampleJp: '勤続年数が上がるにつれて給与が上昇します。' },
      { grammar: '動詞連用形 + かねない', meaning: 'might / capable of causing (undesirable result)', meaningMy: '...ဖြစ်သွားနိုင်သည် (ဆိုးကျိုးကို သတိပေးချက်)', explanation: 'Expresses risk of a negative outcome.', exampleJp: '崩壊を招きかねません。' },
    ],
    audioScript: '終身雇用と年功序列という日本型雇用が揺らぎ、成果主義へと舵を切る企業が増えています。一方でチームワーク崩壊への懸念もあり、調和が模索されています。',
    questions: [
      {
        id: 'rq-n2-06-1',
        questionJp: '従来の日本型雇用慣行の二大特徴として書かれているものはどれですか？',
        questionEn: 'What are stated as the two main pillars of traditional Japanese employment practices?',
        questionMy: 'ဂျပန်ရိုးရာ အလုပ်အကိုင်စနစ်၏ မဏ္ဍိုင်ကြီးနှစ်ရပ်အဖြစ် ဖော်ပြထားသောအချက်မှာ အဘယ်နည်း။',
        options: [
          '成果主義とフリーランス契約',
          '終身雇用と年功序列',
          '完全歩合制と在宅勤務',
          '早期退職と副業奨励',
        ],
        correctIndex: 1,
        explanation: 'Text opens: 「『終身雇用』と『年功序列』を二本の柱とする日本型雇用慣行」(Lifetime employment and seniority).',
        explanationMy: 'တစ်သက်တာအလုပ်အကိုင်အာမခံချက်နှင့် လုပ်သက်ဦးစားပေးစနစ် ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-06-2',
        questionJp: '成果主義を行き過ぎて導入することの懸念点として何が挙げられていますか？',
        questionEn: 'What concern is raised regarding the excessive introduction of performance-based systems?',
        questionMy: 'စွမ်းဆောင်ရည်အခြေပြုစနစ်ကို အလွန်အမင်းကျင့်သုံးပါက ဖြစ်ပေါ်နိုင်သည့် စိုးရိမ်ဖွယ်ရာအချက်မှာ အဘယ်နည်း။',
        options: [
          '会社の税金がゼロになること',
          '短期的利益への偏重やチームワークの崩壊を招く恐れがあること',
          '給料が全国民一律で同じになること',
          'パソコンが使えなくなること',
        ],
        correctIndex: 1,
        explanation: 'Passage warns: 「短期的利益への偏重やチームワークの崩壊を招きかねないという懸念」(Risking short-term bias and teamwork collapse).',
        explanationMy: 'ရေတိုအမြတ်အစွန်းကိုသာ ဦးစားပေးမိခြင်းနှင့် အဖွဲ့လိုက် ပူးပေါင်းဆောင်ရွက်မှု ပျက်ပြားနိုင်ခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Corporate governance and Japanese labor economics checked for N2 reading standards.',
  },

  // 7. Technology & Digital Society
  {
    id: 'r-n2-07',
    title: '自動運転技術の実用化と法的・倫理的責任',
    titleEn: 'Practical Implementation of Autonomous Driving and Legal/Ethical Responsibility',
    titleMy: 'ယာဉ်မောင်းမဲ့ အလိုအလျောက်မောင်းနှင်မှုနည်းပညာနှင့် ဥပဒေ၊ ကျင့်ဝတ်ဆိုင်ရာ တာဝန်ယူမှု',
    level: 'N2',
    topic: 'technology',
    subtopic: 'Autonomous vehicles Level 4, trolley problem, and liability dilemmas',
    learningObjectives: ['Comprehend high-level debates on engineering ethics and legal liability', 'Master structures like ～に際して and ～を余儀なくされる'],
    learningObjectivesMy: ['အင်ဂျင်နီယာကျင့်ဝတ်နှင့် ဥပဒေဆိုင်ရာ အငြင်းပွားမှုများကို နားလည်စေရန်', '～に際して (ပြုလုပ်ရာတွင်) စသည့် သဒ္ဒါများကို သုံးတတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `ＡＩやセンサー[技術]{ぎじゅつ}の[目覚]{めざ}ましい[進歩]{しんぽ}により、[運転手]{うんてんしゅ}が[搭乗]{とうじょう}しない「レベル４」の[完全]{かんぜん}[自動]{じどう}[運転]{うんてん}バスの実用化が、[過疎地]{かそち}の[移動]{いどう}[支援]{しえん}を中心に始まっています。
高齢ドライバーによる交通事故の撲滅や、深刻なバス運転手不足の解消につながる画期的なテクノロジーとして大きな期待が寄せられています。
しかし、技術的な安全性向上の一方で、法制度や倫理面での課題の解決は決して容易ではありません。
万が一、自動運転車が歩行者と衝突事故を起こした場合、その刑事責任や賠償責任は車両の所有者にあるのか、それともシステムを開発した自動車メーカーにあるのかという法解釈は定まっていません。
さらに、「トロッコ問題」に代表されるように、回避不可能な危険に直面した際、ＡＩが歩行者と乗客のどちらの生命を優先して防護すべきかという究極の倫理判断も突きつけられています。
技術の進化に社会の法規範と合意形成が追いつくかどうかが、普及への真の試金石となります。`,
    passagePlain: `ＡＩやセンサー技術の目覚ましい進歩により、運転手が搭乗しない「レベル４」の完全自動運転バスの実用化が、過疎地の移動支援を中心に始まっています。
高齢ドライバーによる交通事故の撲滅や、深刻なバス運転手不足の解消につながる画期的なテクノロジーとして大きな期待が寄せられています。
しかし、技術的な安全性向上の一方で、法制度や倫理面での課題の解決は決して容易ではありません。
万が一、自動運転車が歩行者と衝突事故を起こした場合、その刑事責任や賠償責任は車両の所有者にあるのか、それともシステムを開発した自動車メーカーにあるのかという法解釈は定まっていません。
さらに、「トロッコ問題」に代表されるように、回避不可能な危険に直面した際、ＡＩが歩行者と乗客のどちらの生命を優先して防護すべきかという究極の倫理判断も突きつけられています。
技術の進化に社会の法規範と合意形成が追いつくかどうかが、普及への真の試金石となります。`,
    translationEn: `Owing to remarkable advances in AI and sensor technologies, the practical implementation of "Level 4" fully automated driving buses without drivers onboard has begun, centered on mobility support in depopulated regions. Enormous expectations are placed upon it as a breakthrough technology that can eliminate traffic accidents caused by elderly drivers and resolve severe shortages of bus drivers. However, alongside technical safety improvements, resolving legal and ethical dilemmas is by no means easy. In the unlikely event that an autonomous vehicle collides with a pedestrian, legal interpretations remain unsettled regarding whether criminal liability and compensation responsibility lie with the vehicle owner or the software developer and automaker. Furthermore, as epitomized by the "trolley problem," when confronting an unavoidable hazard, AI is confronted with the ultimate ethical dilemma of whether to prioritize protecting the lives of pedestrians or passengers. Whether societal legal norms and consensus-building can keep pace with technological evolution will be the true touchstone for widespread adoption.`,
    translationMy: `AI နှင့် အာရုံခံနည်းပညာများ၏ ထူးခြားသော တိုးတက်မှုများကြောင့် ယာဉ်မောင်းမပါရှိသော "အဆင့် ၄" အပြည့်အဝ အလိုအလျောက်မောင်းနှင်သည့် ဘတ်စ်ကားများကို လူဦးရေနည်းပါးသော ဒေသများတွင် စတင်အသုံးပြုလာနေပြီ ဖြစ်ပါသည်။ သက်ကြီးယာဉ်မောင်းများကြောင့် ဖြစ်ပွားသော ယာဉ်တိုက်မှုများကို ချေမှုန်းနိုင်ခြင်းနှင့် ပြင်းထန်သော ဘတ်စ်ကားယာဉ်မောင်း ရှားပါးမှုပြဿနာကို ဖြေရှင်းနိုင်မည့် တော်လှန်သော နည်းပညာတစ်ခုအဖြစ် အလွန်မျှော်လင့်ထားကြပါသည်။ သို့သော် နည်းပညာပိုင်းဆိုင်ရာ ဘေးကင်းမှု တိုးတက်လာသည့်တိုင် ဥပဒေနှင့် ကျင့်ဝတ်ဆိုင်ရာ စိန်ခေါ်မှုများကို ဖြေရှင်းရန်မှာ လုံးဝမလွယ်ကူလှပါ။ အကယ်၍ အလိုအလျောက်မောင်းယာဉ်သည် လမ်းလျှောက်သူနှင့် တိုက်မိပါက ပြစ်မှုဆိုင်ရာတာဝန်နှင့် လျော်ကြေးပေးရမည့်တာဝန်သည် ယာဉ်ပိုင်ရှင်ထံတွင် ရှိသလော သို့မဟုတ် စနစ်ကို တီထွင်ဖန်တီးခဲ့သည့် မော်တော်ကားကုမ္ပဏီထံတွင် ရှိသလောဟူသော ဥပဒေအဓိပ္ပာယ်ဖွင့်ဆိုချက်မှာ ရှင်းလင်းစွာ မရှိသေးပါ။ ထို့အပြင် "ရထားတွန်းလှည်းပြဿနာ" (Trolley problem) ကဲ့သို့ပင် မလွှဲမရှောင်သာသော အန္တရာယ်နှင့် ရင်ဆိုင်ရချိန်တွင် AI သည် လမ်းလျှောက်သူ သို့မဟုတ် ယာဉ်စီးခရီးသည် မည်သူ၏ အသက်ကို ဦးစားပေးကာကွယ်ရမည်နည်းဟူသော အဆုံးစွန်ကျင့်ဝတ်ဆိုင်ရာ ဆုံးဖြတ်ချက်ကိုလည်း ရင်ဆိုင်နေရပါသည်။ နည်းပညာတိုးတက်မှုနောက်သို့ လူ့ဘောင်၏ ဥပဒေစည်းမျဉ်းများနှင့် သဘောတူညီမှုများ အမီလိုက်နိုင်မည်လောဟူသည့် အချက်သည် ဤနည်းပညာ အောင်မြင်ပျံ့နှံ့ရေးအတွက် စစ်မှန်သော ကျောက်စမ်းတုံး ဖြစ်ပါသည်။`,
    vocabularyList: [
      { word: '過疎地', reading: 'かそち', meaning: 'depopulated rural area', meaningMy: 'လူဦးရေနည်းပါးသော ကျေးလက်ဒေသ' },
      { word: '撲滅', reading: 'ぼくめつ', meaning: 'eradication, extermination', meaningMy: 'အမြစ်ပြတ် ချေမှုန်းခြင်း' },
      { word: '賠償責任', reading: 'ばいしょうせきにん', meaning: 'liability for compensation/damages', meaningMy: 'လျော်ကြေးပေးရန် တာဝန်ရှိမှု' },
      { word: '試金石', reading: 'しきんせき', meaning: 'touchstone, proving test', meaningMy: 'ကျောက်စမ်းတုံး (အဆုံးအဖြတ်စစ်ဆေးမှု)' },
    ],
    grammarPoints: [
      { grammar: '～に際して', meaning: 'on the occasion of / when doing ~', meaningMy: '...ပြုလုပ်ရာတွင် / ...နှင့် ရင်ဆိုင်ရစဉ်', explanation: 'Formal juncture marker: 危険に直面した際。', exampleJp: '危険に直面した際にどう判断するかです。' },
      { grammar: '～かどうか', meaning: 'whether or not ~', meaningMy: '...ဖြစ်မည် မဖြစ်မည်', explanation: 'Noun clause exploring indeterminate outcomes.', exampleJp: '追いつくかどうかが試金石となります。' },
    ],
    audioScript: '自動運転バスの実用化が進む一方、事故が起きた際の刑事責任の所在やトロッコ問題のような倫理的判断をどうすべきかという課題が残されています。',
    questions: [
      {
        id: 'rq-n2-07-1',
        questionJp: '自動運転技術の実用化に寄せられている期待として合致するものはどれですか？',
        questionEn: 'Which matches the expectation placed on the practical application of autonomous driving?',
        questionMy: 'အလိုအလျောက်မောင်းနှင်မှုနည်းပညာအပေါ် မျှော်လင့်ထားသည့် အချက်အဖြစ် မှန်ကန်သောအချက်မှာ အဘယ်နည်း။',
        options: [
          '飛行機が不要になること',
          '高齢ドライバーの事故撲滅や運転手不足の解消',
          '道路の建設費がゼロになること',
          'すべての車が空を飛べるようになること',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「高齢ドライバーによる交通事故の撲滅や、深刻なバス運転手不足の解消につながる」(Eradicating elderly driver crashes, resolving driver shortages).',
        explanationMy: 'သက်ကြီးယာဉ်မောင်းတို့၏ ယာဉ်တိုက်မှုကို ချေမှုန်းနိုင်ခြင်းနှင့် ယာဉ်မောင်းရှားပါးမှုကို ဖြေရှင်းနိုင်ခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-07-2',
        questionJp: '自動運転車の事故に際して解決されていない課題は何ですか？',
        questionEn: 'What unresolved issue remains when an autonomous vehicle crashes?',
        questionMy: 'အလိုအလျောက်မောင်းယာဉ် မတော်တဆမှုဖြစ်ပွားပါက မဖြေရှင်းနိုင်သေးသော ပြဿနာမှာ အဘယ်နည်း။',
        options: [
          'ガソリンが爆発するかどうか',
          '刑事責任や賠償責任が車両所有者とメーカーのどちらにあるか未定なこと',
          '車を洗車する責任者がいないこと',
          '信号機がすべて赤になること',
        ],
        correctIndex: 1,
        explanation: 'Sentence notes: 「刑事責任や賠償責任は車両の所有者にあるのか...自動車メーカーにあるのかという法解釈は定まっていません」(Unsettled liability between owner and manufacturer).',
        explanationMy: 'ပြစ်မှုဆိုင်ရာနှင့် လျော်ကြေးတာဝန်သည် ကားပိုင်ရှင်ထံတွင်ရှိသလော သို့မဟုတ် စနစ်ထုတ်လုပ်သူထံတွင် ရှိသလောဟူသော ဥပဒေအဆုံးအဖြတ် မရှိသေးခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Legal and technical terminology checked for N2 reading evaluation criteria.',
  },

  // 8. Community & Society
  {
    id: 'r-n2-08',
    title: '少子高齢化社会における「多世代共生」の試み',
    titleEn: 'Multi-Generational Co-Living Initiatives in an Aging Society',
    titleMy: 'ကလေးမွေးဖွားနှုန်းကျဆင်းပြီး သက်ကြီးရွယ်အိုများပြားသော လူ့ဘောင်တွင် "မျိုးဆက်စုံ အတူယှဉ်တွဲနေထိုင်ရေး" ကြိုးပမ်းချက်',
    level: 'N2',
    topic: 'community',
    subtopic: 'Combined nursery and nursing homes, mutual social care',
    learningObjectives: ['Comprehend sociological case studies on demographic decline', 'Analyze structural expressions: ～を契機として and ～にほかならない'],
    learningObjectivesMy: ['လူဦးရေအချိုးအစား ပြောင်းလဲမှုဆိုင်ရာ စာတမ်းများကို နားလည်စေရန်', 'အပြန်အလှန်အထောက်အကူပြု လူမှုရေးစနစ်များကို သုံးသပ်တတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `[世界]{せかい}で最も[少子]{しょうし}[高齢化]{こうれいか}が[進]{すす}む[日本]{にほん}では、[独居]{どっきょ}[高齢者]{こうれいしゃ}の[孤立]{こりつ}や[認知症]{にんちしょう}の[増加]{ぞうか}、[核家族化]{かくかぞくか}による[育児]{いくじ}の[孤立]{こりつ}が[深刻]{しんこく}な[社会]{しゃかい}[課題]{かだい}となっています。
こうした[世代間]{せだいかん}の[分断]{ぶんだん}を[乗り越え]{のりこえ}ようと、[近年]{きんねん}[注目]{ちゅうもく}を[集]{あつ}めているのが、[高齢者]{こうれいしゃ}[福祉]{ふくし}[施設]{しせつ}と[保育所]{ほいくしょ}を[同一]{どういつ}の[建物]{たてもの}に[併設]{へいせつ}した「[幼老]{ようろう}[複合]{ふくごう}[施設]{しせつ}」です。
ここでは、[園児]{えんじ}たちと[施設]{しせつ}の[お年寄り]{おとしより}が[日常的]{にちじょうてき}に[歌]{うた}を[歌]{うた}ったり[昔]{むかし}の[遊]{あそ}びをしたりして[交流]{こうりゅう}します。
子どもたちとの触れ合いは高齢者にとって生きがいや笑顔を取り戻すきっかけとなり、認知機能の維持にも好影響を与えています。
一方、子どもたちにとっても、核家族では経験できない多様な人々への思いやりや命の尊さを自然に学ぶ貴重な教育の場となっています。
世代を超えて支え合う新たなコミュニティの創造は、超高齢社会を豊かに生きるための希望の光といえます。`,
    passagePlain: `世界で最も少子高齢化が進む日本では、独居高齢者の孤立や認知症の増加、核家族化による育児の孤立が深刻な社会課題となっています。
こうした世代間の分断を乗り越えようと、近年注目を集めているのが、高齢者福祉施設と保育所を同一の建物に併設した「幼老複合施設」です。
ここでは、園児たちと施設のお年寄りが日常的に歌を歌ったり昔の遊びをしたりして交流します。
子どもたちとの触れ合いは高齢者にとって生きがいや笑顔を取り戻すきっかけとなり、認知機能の維持にも好影響を与えています。
一方、子どもたちにとっても、核家族では経験できない多様な人々への思いやりや命の尊さを自然に学ぶ貴重な教育の場となっています。
世代を超えて支え合う新たなコミュニティの創造は、超高齢社会を豊かに生きるための希望の光といえます。`,
    translationEn: `In Japan, where population aging and birthrate decline are the most advanced in the world, the isolation of elderly individuals living alone, the increase in dementia, and child-rearing isolation due to nuclear families have become acute social issues. Seeking to overcome this intergenerational division, "integrated elderly-child facilities"—which combine eldercare welfare homes and nursery schools within the same building—have attracted immense attention in recent years. Here, preschoolers and elderly residents interact daily by singing songs and playing traditional games together. Interacting with children serves as a catalyst for seniors to regain life purpose and smiles, exerting a positive effect on maintaining cognitive functions. On the other hand, for children as well, it serves as an invaluable educational environment where they naturally learn compassion toward diverse individuals and the sanctity of life—experiences difficult to attain in nuclear households. Creating new communities that support each other across generations represents a beacon of hope for living richly in a super-aged society.`,
    translationMy: `ကမ္ဘာပေါ်တွင် သက်ကြီးရွယ်အိုဦးရေ အများဆုံးနှင့် ကလေးမွေးဖွားနှုန်း အကျဆုံးဖြစ်သော ဂျပန်နိုင်ငံတွင် တစ်ကိုယ်တည်းနေ သက်ကြီးရွယ်အိုများ အထီးကျန်ဆန်ခြင်း၊ မှတ်ဉာဏ်ချို့ယွင်းမှု ဝေဒနာရှင်များ တိုးပွားလာခြင်းနှင့် မိဘကလေးမျှသာနေထိုင်သော မိသားစုငယ်များတွင် ကလေးထိန်းသိမ်းစောင့်ရှောက်ရေး အထီးကျန်ဖြစ်ခြင်းတို့သည် ပြင်းထန်သော လူမှုရေးစိန်ခေါ်မှုများ ဖြစ်လာနေပါသည်။ ဤမျိုးဆက်များအကြား ကွဲပြားမှုများကို ကျော်လွှားရန်အတွက် မကြာသေးမီက အထူးအာရုံစိုက်လာကြသည်မှာ သက်ကြီးရွယ်အိုဘိုးဘွားရိပ်သာနှင့် မူကြိုကျောင်းတို့ကို အဆောက်အအုံတစ်ခုတည်းတွင် တွဲဖက်ဖွင့်လှစ်ထားသည့် "ကလေးနှင့် သက်ကြီးရွယ်အို ပေါင်းစပ်ဂေဟာ" ဖြစ်ပါသည်။ ဤနေရာတွင် ကလေးငယ်များနှင့် ဘိုးဘွားများသည် နေ့စဉ် သီချင်းဆိုခြင်း၊ ရှေးရိုးရာကစားနည်းများ ကစားခြင်းတို့ဖြင့် ရင်းနှီးစွာ ဆက်ဆံကြပါသည်။ ကလေးများနှင့် ထိတွေ့ရခြင်းသည် သက်ကြီးရွယ်အိုများအတွက် ဘဝနေပျော်မှုနှင့် အပြုံးများကို ပြန်လည်ရရှိစေသည့် အခွင့်အရေးဖြစ်စေပြီး မှတ်ဉာဏ်စွမ်းရည်ကို ထိန်းသိမ်းရာတွင်လည်း ကောင်းမွန်သော သက်ရောက်မှုရှိစေပါသည်။ အခြားတစ်ဖက်တွင် ကလေးငယ်များအတွက်လည်း သီးသန့်မိသားစုငယ်များတွင် မရရှိနိုင်သော မတူကွဲပြားသည့် လူသားများအပေါ် စာနာထောက်ထားတတ်မှုနှင့် အသက်၏ တန်ဖိုးကို သဘာဝအတိုင်း သင်ယူနိုင်သည့် တန်ဖိုးမဖြတ်နိုင်သော ပညာရေးဝန်းကျင်တစ်ခု ဖြစ်စေပါသည်။ မျိုးဆက်များကို ကျော်လွန်၍ အပြန်အလှန်ဖေးမကူညီသော ရပ်ရွာလူထုအသစ်တစ်ခုကို ဖန်တီးတည်ဆောက်ခြင်းသည် သက်ကြီးလူ့ဘောင်တွင် အဓိပ္ပာယ်ရှိစွာ ရှင်သန်နိုင်ရေးအတွက် မျှော်လင့်ချက်ရောင်ခြည်တစ်ခု ဖြစ်ပါသည်။`,
    vocabularyList: [
      { word: '核家族化', reading: 'かくかぞくか', meaning: 'shift toward nuclear families', meaningMy: 'မိဘနှင့် သားသမီးမျှသာနေသော မိသားစုပုံစံသို့ ပြောင်းလဲခြင်း' },
      { word: '分断', reading: 'ぶんだん', meaning: 'division, severance', meaningMy: 'ကွဲပြားခြားနားမှု၊ အဆက်အသွယ်ပြတ်တောက်မှု' },
      { word: '認知機能', reading: 'にんちきのう', meaning: 'cognitive functions', meaningMy: 'မှတ်ဉာဏ်နှင့် သိမြင်နိုင်စွမ်း' },
      { word: '尊さ', reading: 'とうとさ', meaning: 'sanctity, preciousness', meaningMy: 'မွန်မြတ်တန်ဖိုးရှိမှု' },
    ],
    grammarPoints: [
      { grammar: '～をきっかけとして', meaning: 'taking ~ as a turning point / catalyst', meaningMy: '...ကို အခွင့်အလမ်းအဖြစ် အခြေပြု၍', explanation: 'Trigger for psychological or behavioural change.', exampleJp: '笑顔を取り戻すきっかけとなります。' },
      { grammar: '～にとっても', meaning: 'also for ~', meaningMy: '...အတွက်လည်းပဲ', explanation: 'Perspective-taking marker.', exampleJp: '子どもたちにとっても貴重な場です。' },
    ],
    audioScript: '幼老複合施設では園児とお年寄りが日常的に交流します。高齢者は生きがいを取り戻し、子どもたちは多様な人々への思いやりを学びます。',
    questions: [
      {
        id: 'rq-n2-08-1',
        questionJp: '「幼老複合施設」が高齢者にもたらす好影響として書かれているものはどれですか？',
        questionEn: 'Which is stated as a positive effect of integrated facilities on the elderly?',
        questionMy: 'ပေါင်းစပ်ဂေဟာက သက်ကြီးရွယ်အိုများအပေါ် ပေးစွမ်းသည့် ကောင်းကျိုးမှာ အဘယ်နည်း။',
        options: [
          '年齢が２０歳若返ること',
          '子どもとの触れ合いで生きがいを取り戻し、認知機能の維持につながること',
          '年金が自動的に２倍になること',
          '子どもたちのテストを代わりに解いてあげること',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「生きがいや笑顔を取り戻すきっかけとなり、認知機能の維持にも好影響を与えています」(Regaining life purpose, maintaining cognitive function).',
        explanationMy: 'ဘဝနေပျော်မှုနှင့် အပြုံးများ ပြန်ရရှိစေပြီး မှတ်ဉာဏ်ထိန်းသိမ်းမှုကို အကျိုးပြုခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-08-2',
        questionJp: '子どもたちにとって、この施設が持つ教育的価値は何ですか？',
        questionEn: 'What educational value does this facility have for the children?',
        questionMy: 'ကလေးငယ်များအတွက် ဤဂေဟာက ပေးစွမ်းသည့် ပညာရေးဆိုင်ရာ တန်ဖိုးမှာ အဘယ်နည်း။',
        options: [
          '核家族では学べない、多様な人々への思いやりや命の尊さを自然に学べること',
          '一日中スマートフォンでゲームができること',
          '小学校の勉強をすべて免除されること',
          '大人の仕事を代わりにやること',
        ],
        correctIndex: 0,
        explanation: 'Sentence says: 「核家族では経験できない多様な人々への思いやりや命の尊さを自然に学ぶ貴重な教育の場」(Learning compassion and the sanctity of life).',
        explanationMy: 'မိသားစုငယ်များတွင် မသင်ယူနိုင်သော အခြားသူများအပေါ် စာနာမှုနှင့် အသက်၏တန်ဖိုးကို သဘာဝအတိုင်း သင်ယူနိုင်ခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Sociological passage on community welfare reviewed for N2 syntactic complexity.',
  },

  // 9. Environment & Sustainability
  {
    id: 'r-n2-09',
    title: '再生可能エネルギーへの転換と電力供給の安定性',
    titleEn: 'Transition to Renewable Energy and Grid Power Stability',
    titleMy: 'ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင်သို့ ကူးပြောင်းခြင်းနှင့် လျှပ်စစ်ဓာတ်အား တည်ငြိမ်စွာ ဖြန့်ဖြူးရေး',
    level: 'N2',
    topic: 'environment',
    subtopic: 'Solar, wind power volatility, and energy storage batteries',
    learningObjectives: ['Comprehend scientific and industrial energy policy debates', 'Understand expressions like ～ざるを得ない and ～を念頭に置いて'],
    learningObjectivesMy: ['စွမ်းအင်မူဝါဒဆိုင်ရာ စာတမ်းများကို နားလည်စေရန်', '～ざるを得ない (မလွှဲမရှောင်သာ ပြုလုပ်ရသည်) စသည့် သဒ္ဒါများကို သုံးတတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `[地球温暖化]{ちきゅうおんだんか}を[食]{ partner}い[止]{と}めるため、[温室効果]{おんしつこうか}ガスの[排出]{はいしゅつ}を[実質]{じっしつ}ゼロにする「カーボンニュートラル」の[達成]{たっせい}が[国際的]{こくさいてき}な[責務]{せきむ}となっています。
日本においても、太陽光や風力といった「再生可能エネルギー」の導入拡大が急ピッチで進められています。
しかし、再生可能エネルギーには、天候や昼夜の別によって発電量が大きく左右されるという決定的な弱点が存在します。
電力を安定供給するためには、需要と供給のバランスを常に一致させなければならず、需給バランスが崩れると大規模な停電（ブラックアウト）を引き起こしかねません。
そのため、発電量が不安定な再生エネルギーを主力電源化するには、余剰電力を蓄える高性能な大型蓄電池の開発や、次世代送電網（スマートグリッド）の整備が不可欠です。
脱炭素社会の実現とエネルギーの安定供給という二つの要請を両立させる技術革新が強く求められています。`,
    passagePlain: `地球温暖化を食い止めるため、温室効果ガスの排出を実質ゼロにする「カーボンニュートラル」の達成が国際的な責務となっています。
日本においても、太陽光や風力といった「再生可能エネルギー」の導入拡大が急ピッチで進められています。
しかし、再生可能エネルギーには、天候や昼夜の別によって発電量が大きく左右されるという決定的な弱点が存在します。
電力を安定供給するためには、需要と供給のバランスを常に一致させなければならず、需給バランスが崩れると大規模な停電（ブラックアウト）を引き起こしかねません。
そのため、発電量が不安定な再生エネルギーを主力電源化するには、余剰電力を蓄える高性能な大型蓄電池の開発や、次世代送電網（スマートグリッド）の整備が不可欠です。
脱炭素社会の実現とエネルギーの安定供給という二つの要請を両立させる技術革新が強く求められています。`,
    translationEn: `To halt global warming, achieving "carbon neutrality"—reducing greenhouse gas emissions to net zero—has become an international obligation. In Japan as well, expanding the implementation of "renewable energy," such as solar and wind power, is advancing at a rapid pace. However, renewable energy possesses a decisive flaw: power generation volume is heavily influenced by weather conditions and the difference between day and night. To stably supply electric power, the balance between demand and supply must always be matched; if the supply-demand balance collapses, it risks triggering large-scale blackouts. Therefore, to make volatile renewable energy the main power source, developing high-performance, large-scale storage batteries to store surplus power and constructing next-generation smart grids are indispensable. Technological innovation that harmonizes the two demands of achieving a decarbonized society and ensuring stable energy supply is urgently sought.`,
    translationMy: `ကမ္ဘာကြီးပူနွေးလာမှုကို တားဆီးရန်အတွက် ဖန်လုံအိမ်ဓာတ်ငွေ့ထုတ်လွှတ်မှုကို အသားတင် သုညဖြစ်စေသည့် "ကာဗွန်ကင်းစင်ရေး" (Carbon Neutral) ရရှိရေးသည် နိုင်ငံတကာ၏ မဖြစ်မနေ တာဝန်တစ်ရပ် ဖြစ်လာနေပါသည်။ ဂျပန်နိုင်ငံတွင်လည်း နေရောင်ခြည်စွမ်းအင်နှင့် လေစွမ်းအင်ကဲ့သို့သော "ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင်" ကို တိုးချဲ့အသုံးပြုခြင်းကို အရှိန်အဟုန်ဖြင့် ဆောင်ရွက်လျက် ရှိပါသည်။ သို့သော် ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင်တွင် ရာသီဥတုအခြေအနေနှင့် နေ့/ည အချိန်ကာလအလိုက် လျှပ်စစ်ထုတ်လုပ်နိုင်သည့် ပမာဏမှာ ကြီးမားစွာ အပြောင်းအလဲရှိနေသည်ဟူသော အဓိကအားနည်းချက် ရှိနေပါသည်။ လျှပ်စစ်ဓာတ်အားကို တည်ငြိမ်စွာ ဖြန့်ဖြူးနိုင်ရန်အတွက် လိုအပ်ချက်နှင့် ထုတ်လုပ်မှုပမာဏ အမြဲတစေ ညီမျှနေရမည်ဖြစ်ပြီး၊ ထိုညီမျှမှု ပျက်ပြားသွားပါက နေရာအနှံ့ ဓာတ်အားပြတ်တောက်မှု (Blackout) ကြီးများ ဖြစ်ပေါ်စေနိုင်ပါသည်။ ထို့ကြောင့် ထုတ်လုပ်မှုမငြိမ်သက်သော ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင်ကို အဓိကစွမ်းအင်အဖြစ် အသုံးချနိုင်ရန်အတွက် ပိုလျှံသော လျှပ်စစ်ဓာတ်အားကို သိုလှောင်ထားနိုင်သည့် စွမ်းဆောင်ရည်မြင့် ဓာတ်ခဲကြီးများ တီထွင်ခြင်းနှင့် ခေတ်မီဓာတ်အားကွန်ရက် (Smart Grid) များကို တည်ဆောက်ခြင်းတို့သည် မရှိမဖြစ် လိုအပ်လှပါသည်။ ကာဗွန်ကင်းစင်သော လူ့ဘောင်ဖော်ဆောင်ရေးနှင့် စွမ်းအင်တည်ငြိမ်စွာ ဖြန့်ဖြူးရေးဟူသော လိုအပ်ချက်နှစ်ရပ်ကို ဟန်ချက်ညီစေမည့် နည်းပညာဆန်းသစ်တီထွင်မှုများကို အထူးလိုအပ်နေပါသည်။`,
    vocabularyList: [
      { word: '責務', reading: 'せきむ', meaning: 'obligation, duty', meaningMy: 'တာဝန်ဝတ္တရား' },
      { word: '左右される', reading: 'さゆうされる', meaning: 'to be swayed/dominated by', meaningMy: 'လွှမ်းမိုးခံရသည်' },
      { word: '蓄電池', reading: 'ちくでんち', meaning: 'storage battery', meaningMy: 'လျှပ်စစ်သိုလှောင်ဓာတ်ခဲ' },
      { word: '脱炭素', reading: 'だつたんそ', meaning: 'decarbonization', meaningMy: 'ကာဗွန်လျှော့ချကင်းစင်ရေး' },
    ],
    grammarPoints: [
      { grammar: '～かねない', meaning: 'could very well cause (negative risk)', meaningMy: '...ဖြစ်သွားစေနိုင်သည် (ဆိုးကျိုးအန္တရာယ်)', explanation: 'Points to potential disaster or systemic failure.', exampleJp: 'ブラックアウトを引き起こしかねません。' },
      { grammar: '～には、～が不可欠である', meaning: 'for ~, ... is indispensable', meaningMy: '...အတွက် ...သည် မရှိမဖြစ် လိုအပ်သည်', explanation: 'Identifies non-negotiable structural requirements.', exampleJp: '主力化には大型蓄電池の開発が不可欠です。' },
    ],
    audioScript: '再生可能エネルギーは天候に左右されるため、需給バランスが崩れると大規模停電の恐れがあります。大型蓄電池や送電網の整備が不可欠です。',
    questions: [
      {
        id: 'rq-n2-09-1',
        questionJp: '再生可能エネルギーが持つ「決定的な弱点」として書かれているものはどれですか？',
        questionEn: 'What is described as the "decisive flaw" of renewable energy?',
        questionMy: 'ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင်၏ အဓိကအားနည်းချက်အဖြစ် ရေးသားထားသောအချက်မှာ အဘယ်နည်း။',
        options: [
          '温室効果ガスを大量に排出すること',
          '天候や昼夜の別によって発電量が大きく左右されること',
          '設備を作るのに１００年かかること',
          '太陽光が熱すぎて人間が住めなくなること',
        ],
        correctIndex: 1,
        explanation: 'Text states: 「天候や昼夜の別によって発電量が大きく左右されるという決定的な弱点」(Generation fluctuates with weather and day/night).',
        explanationMy: 'ရာသီဥတုနှင့် နေ့/ည အလိုက် လျှပ်စစ်ထုတ်လုပ်မှု ပမာဏ အပြောင်းအလဲများခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-09-2',
        questionJp: '再生エネルギーを主力電源化するために不可欠とされる技術的対策は何ですか？',
        questionEn: 'What technical measure is indispensable to make renewable energy the main power source?',
        questionMy: 'ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင်ကို အဓိကစွမ်းအင်ဖြစ်စေရန် မရှိမဖြစ်လိုအပ်သော နည်းပညာပိုင်းဆိုင်ရာ ဖြေရှင်းနည်းမှာ အဘယ်နည်း။',
        options: [
          '夜間の電気の使用を法律で全面的に禁止すること',
          '余剰電力を蓄える高性能な大型蓄電池の開発やスマートグリッドの整備',
          'すべての工場を海外に移転させること',
          '電気代を１０倍に値上げすること',
        ],
        correctIndex: 1,
        explanation: 'The passage asserts: 「余剰電力を蓄える高性能な大型蓄電池の開発や、次世代送電網（スマートグリッド）の整備が不可欠」(Large batteries and smart grid).',
        explanationMy: 'ပိုလျှံဓာတ်အားကို သိုလှောင်နိုင်သည့် စွမ်းဆောင်ရည်မြင့် ဓာတ်ခဲကြီးများနှင့် စမတ်ဓာတ်အားလိုင်းများ တည်ဆောက်ခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Technical renewable energy terms and compound verbs verified for N2 level.',
  },

  // 10. News & Current Events
  {
    id: 'r-n2-10',
    title: 'インターネット上の「フィルターバブル」と情報格差',
    titleEn: 'The Internet "Filter Bubble" and Information Disparities',
    titleMy: 'အင်တာနက်ပေါ်ရှိ "အချက်အလက်ပူဖောင်း" နှင့် သတင်းအချက်အလက် ကွာဟချက်များ',
    level: 'N2',
    topic: 'news',
    subtopic: 'Algorithmic personalization, polarization, and media literacy',
    learningObjectives: ['Critique analytical editorial articles on digital media literacy', 'Understand logical discourse connectors: ～にすぎない and ～を余儀なくされる'],
    learningObjectivesMy: ['မီဒီယာနှင့် သတင်းအချက်အလက်ဆိုင်ရာ ဝေဖန်ဆန်းစစ်ချက်ဆောင်းပါးများကို နားလည်စေရန်', '～にすぎない (မျှသာဖြစ်သည်) စသည့် သဒ္ဒါများကို သုံးတတ်စေရန်'],
    difficultyRating: 4,
    estimatedReadingTimeMinutes: 6,
    length: 'long',
    passage: `インターネットやＳＮＳの[普及]{ふきゅう}により、[誰]{だれ}もが[瞬時]{しゅんじ}に[膨大]{ぼうだい}な[情報]{じょうほう}にアクセスできる[時代]{じだい}が[到来]{とうらい}しました。
しかし、その[背後]{はいご}では「フィルターバブル」と呼ばれる[見]{み}えない[壁]{かべ}が、私たちの[視野]{しや}を急速に狭めています。
検索エンジンやＳＮＳのアルゴリズムは、ユーザーの過去の閲覧履歴やクリック傾向を精密に分析し、その人が好む情報や同調しやすい意見ばかりを優先して表示します。
その結果、利用者は知らず知らずのうちに自分にとって都合の良い情報だけに囲まれ、異なる視点や対立する意見に触れる機会を奪われてしまうのです。
この現象は社会の分断を深刻化させ、過激な思考や偏見を増長させる温床ともなっています。
自分が見ている世界はアルゴリズムによって切り取られた一部にすぎないという自覚を持ち、多様な言論に能動的にアクセスするメディアリテラシーが、今こそ強く求められています。`,
    passagePlain: `インターネットやＳＮＳの普及により、誰もが瞬時に膨大な情報にアクセスできる時代が到来しました。
しかし、その背後では「フィルターバブル」と呼ばれる見えない壁が、私たちの視野を急速に狭めています。
検索エンジンやＳＮＳのアルゴリズムは、ユーザーの過去の閲覧履歴やクリック傾向を精密に分析し、その人が好む情報や同調しやすい意見ばかりを優先して表示します。
その結果、利用者は知らず知らずのうちに自分にとって都合の良い情報だけに囲まれ、異なる視点や対立する意見に触れる機会を奪われてしまうのです。
この現象は社会の分断を深刻化させ、過激な思考や偏見を増長させる温床ともなっています。
自分が見ている世界はアルゴリズムによって切り取られた一部にすぎないという自覚を持ち、多様な言論に能動的にアクセスするメディアリテラシーが、今こそ強く求められています。`,
    translationEn: `With the spread of the internet and social media, an era has arrived where anyone can access immense amounts of information instantaneously. However, behind this convenience, an invisible wall known as the "filter bubble" is rapidly narrowing our vision. Algorithms of search engines and social networks meticulously analyze users' past browsing histories and clicking tendencies, prioritizing only information the user prefers and opinions they easily agree with. Consequently, without even realizing it, users become surrounded solely by information convenient to themselves, deprived of opportunities to encounter differing perspectives and opposing viewpoints. This phenomenon exacerbates societal division and acts as a breeding ground for radicalized ideologies and prejudices. Possessing the awareness that the world one sees is nothing more than a fraction sliced out by algorithms, and proactively accessing diverse discourses through media literacy, is urgently demanded today.`,
    translationMy: `အင်တာနက်နှင့် လူမှုကွန်ရက်များ ကျယ်ပြန့်လာမှုကြောင့် မည်သူမဆို များပြားလှသောအချက်အလက်များကို ချက်ချင်းရှာဖွေကြည့်ရှုနိုင်သည့် ခေတ်ကာလတစ်ခုသို့ ရောက်ရှိလာခဲ့ပါသည်။ သို့သော် ၎င်း၏နောက်ကွယ်တွင် "အချက်အလက်ပူဖောင်း" (Filter Bubble) ဟုခေါ်သော မမြင်နိုင်သည့် တံတိုင်းကြီးတစ်ခုသည် ကျွန်ုပ်တို့၏ အမြင်အာရုံကို လျင်မြန်စွာ ကျဉ်းမြောင်းစေလျက် ရှိပါသည်။ ရှာဖွေရေးအင်ဂျင်များနှင့် ဆိုရှယ်မီဒီယာများ၏ အယ်လဂိုရီသမ် (Algorithm) များသည် အသုံးပြုသူများ ယခင်က ကြည့်ရှုခဲ့သည့် မှတ်တမ်းများနှင့် ကလစ်နှိပ်မှုများကို အသေးစိတ် ခွဲခြမ်းစိတ်ဖြာပြီး၊ ထိုလူနှစ်သက်သော သတင်းများနှင့် သဘောထားတူညီလွယ်သည့် အမြင်များကိုသာ ဦးစားပေးဖော်ပြကြပါသည်။ ရလဒ်အနေဖြင့် သုံးစွဲသူများသည် မိမိကိုယ်မိမိ မသိလိုက်ဘဲ မိမိအတွက် အဆင်ပြေသောအချက်အလက်များဖြင့်သာ ဝန်းရံခံထားရပြီး မတူကွဲပြားသော ရှုထောင့်များနှင့် ဆန့်ကျင်ဘက်အမြင်များကို ထိတွေ့ခွင့်များ ဆုံးရှုံးသွားရပါသည်။ ဤဖြစ်စဉ်သည် လူ့ဘောင်အဖွဲ့အစည်းကို သဘောထားကွဲလွဲစေကာ အစွန်းရောက်အတွေးအခေါ်များနှင့် ဘက်လိုက်မှုများကို ပိုမိုကြီးထွားစေသည့် ပျိုးခင်းတစ်ခု ဖြစ်လာစေပါသည်။ မိမိမြင်တွေ့နေရသော ကမ္ဘာသည် အယ်လဂိုရီသမ်က လှီးထုတ်ပြသထားသည့် အစိတ်အပိုင်းတစ်ခုမျှသာ ဖြစ်သည်ဟူသော အသိတရားကို ထားရှိကာ မတူကွဲပြားသော အယူအဆများကို မိမိကိုယ်တိုင် တက်ကြွစွာ ရှာဖွေဖတ်ရှုတတ်သည့် မီဒီယာဆန်းစစ်အသိဉာဏ် (Media Literacy) ကို ယခုအခါတွင် အထူးလိုအပ်နေပြီ ဖြစ်ပါသည်။`,
    vocabularyList: [
      { word: '膨大な', reading: 'ぼうだいな', meaning: 'immense, colossal', meaningMy: 'အလွန်များပြားလှသော' },
      { word: '同調する', reading: 'どうちょうする', meaning: 'to conform, agree with', meaningMy: 'သဘောထားတူညီသည်' },
      { word: '温床', reading: 'おんしょう', meaning: 'hotbed, breeding ground (figurative)', meaningMy: 'မကောင်းမှုများ မွေးဖွားရာ ပျိုးခင်း' },
      { word: '能動的に', reading: 'のうどうてきに', meaning: 'proactively, actively', meaningMy: 'မိမိစိတ်ဆန္ဒဖြင့် တက်ကြွစွာ' },
    ],
    grammarPoints: [
      { grammar: '～にすぎない', meaning: 'nothing more than ~ / merely ~', meaningMy: '...မျှသာ ဖြစ်သည်', explanation: 'Restricts significance or extent.', exampleJp: '切り取られた一部にすぎません。' },
      { grammar: '知らず知らずのうちに', meaning: 'unconsciously / without realizing it', meaningMy: 'မိမိကိုယ်မိမိ မသိလိုက်ဘဲ', explanation: 'Habitual or gradual change occurring beneath awareness.', exampleJp: '知らず知らずのうちに都合の良い情報に囲まれます。' },
    ],
    audioScript: 'ネットのアルゴリズムは好む情報ばかりを表示するため、異なる意見に触れにくくなる「フィルターバブル」が起きています。多様な言論に触れるメディアリテラシーが大切です。',
    questions: [
      {
        id: 'rq-n2-10-1',
        questionJp: '「フィルターバブル」とはどのような現象ですか？',
        questionEn: 'What kind of phenomenon is the "filter bubble"?',
        questionMy: '"အချက်အလက်ပူဖောင်း" ဆိုသည်မှာ မည်သို့သော ဖြစ်စဉ်မျိုး ဖြစ်သနည်း။',
        options: [
          'スマートフォンの画面に本物の泡がついて文字が読めなくなること',
          'アルゴリズムによって自分の好む情報ばかりに囲まれ、異なる視点に触れにくくなること',
          'インターネットが遅くなって全く通信できなくなること',
          'すべての個人情報が世界中に公開されること',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「アルゴリズムは...好む情報や同調しやすい意見ばかりを優先して表示...都合の良い情報だけに囲まれ、異なる視点...に触れる機会を奪われてしまう」(Surrounded by agreeable info, deprived of other views).',
        explanationMy: 'အယ်လဂိုရီသမ်ကြောင့် မိမိကြိုက်နှစ်သက်ရာ အချက်အလက်များဖြင့်သာ ဝန်းရံခံရပြီး အခြားရှုထောင့်များကို မတွေ့မြင်ရတော့ခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n2-10-2',
        questionJp: 'フィルターバブルの弊害を防ぐために、個人に求められている姿勢は何ですか？',
        questionEn: 'What attitude is demanded of individuals to prevent the harms of the filter bubble?',
        questionMy: 'အချက်အလက်ပူဖောင်း၏ ဆိုးကျိုးကို ကာကွယ်ရန် လူတစ်ဦးချင်းစီထံမှ တောင်းဆိုထားသော သဘောထားမှာ အဘယ်နည်း။',
        options: [
          'インターネットやスマホを二度と使わないこと',
          '検索結果の１番上に表示された情報だけを盲信すること',
          '自分が見ている世界は一部にすぎないと自覚し、多様な言論に能動的に触れること',
          '意見が異なる人をすべてＳＮＳでブロックすること',
        ],
        correctIndex: 2,
        explanation: 'The conclusion asserts: 「切り取られた一部にすぎないという自覚を持ち、多様な言論に能動的にアクセスするメディアリテラシーが...強く求められています」(Awareness of partiality, proactive access).',
        explanationMy: 'မိမိမြင်နေရသည်မှာ တစ်စိတ်တစ်ပိုင်းမျှသာဖြစ်သည်ဟု သတိပြုကာ မတူညီသောအမြင်များကို တက်ကြွစွာ ရှာဖွေဖတ်ရှုခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Media critique and algorithmic sociology discourse confirmed for N2 reading standards.',
  },
];

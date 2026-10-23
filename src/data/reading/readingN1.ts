import { UniversityReadingExercise } from '../../types/readingCurriculum';

export const READING_N1_EXERCISES: UniversityReadingExercise[] = [
  // 1. Daily Life / Philosophy of Modern Living
  {
    id: 'r-n1-01',
    title: '時間の不可逆性と「タイパ」至上主義のパラドックス',
    titleEn: 'The Irreversibility of Time and the Paradox of Time-Performance Supremacy',
    titleMy: 'အချိန်၏ ပြန်လည်မရနိုင်သော သဘောသဘာဝနှင့် "အချိန်အကျိုးထိရောက်မှု အစွန်းရောက်ခြင်း" ၏ ရှေ့နောက်မညီမှု',
    level: 'N1',
    topic: 'daily_life',
    subtopic: 'Time-performance obsession, expedited media consumption, and the erosion of contemplative experience',
    learningObjectives: ['Critique high-level sociological and philosophical essays on modern lifestyles', 'Master N1 grammatical expressions: ～を余儀なくされる, ～極まりない, and ～であれ'],
    learningObjectivesMy: ['ခေတ်သစ်လူနေမှုဘဝဆိုင်ရာ ဒဿနိကဆောင်းပါးများကို နားလည်ဆန်းစစ်နိုင်စေရန်', 'N1 အဆင့်မြင့်သဒ္ဒါ ～極まりない စသည်တို့ကို ကျွမ်းကျင်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[動画]{どうが}の[倍速]{ばいそく}[視聴]{しちょう}や[要約]{ようやく}コンテンツの[消費]{しょうひ}に[象徴]{しょうちょう}されるように、[現代社会]{げんだいしゃかい}を[席巻]{せっけん}しているのは「タイムパフォーマンス（タイパ）」を[至高]{しこう}の[価値]{かち}とみなす[風潮]{ふうちょう}である。
[情報]{じょうほう}の[氾濫]{はんらん}に[晒]{さら}される[現代人]{げんだいじん}にとって、[最小限]{さいしょうげん}の[時間]{じかん}で[最大限]{さいだいげん}の[成果]{せいか}や[情報]{じょうほう}を[刈]{か}り[取]{と}ろうとする[試]{こころ}みは、ある[種]{しゅ}の[防衛]{ぼうえい}[機制]{きせい}として[不可避]{ふかひ}な[側面]{そくめん}を[持]{も}つ。
しかしながら、[効率性]{こうりつせい}の[極限]{きょくげん}を[追求]{ついきゅう}するあまり、[過程]{かてい}そのものが[内包]{ないほう}する「[無駄]{むだ}」や「[逡巡]{しゅんじゅん}」を[徹底的]{てっていてき}に[排除]{はいじょ}しようとする[姿勢]{しせい}には、[危うさ]{あやうさ}を[禁じ得ない]{きんじえない}。
そもそも、[芸術]{げいじゅつ}を[鑑賞]{かんしょう}する[時間]{じかん}や[他者]{たしゃ}と[心]{こころ}を[通]{かよ}わせる[対話]{たいわ}の[深]{ふか}みは、[要約]{ようやく}不可能な[冗長]{じょうちょう}さや、[予測]{よそく}のつかない[迂回]{うかい}のなかにこそ[宿]{やど}るものである。
[結論]{けつろん}への[到達]{とうたつ}のみを[急]{いそ}ぎ、[道草]{みちくさ}の[豊]{ゆた}かさを[削ぎ落とした]{そぎおとした}[人間]{にんげん}の[生]{せい}は、[一見]{いっけん}すると[知的]{ちてき}に[研ぎ澄まされて]{とぎすまされて}いるようでいて、その[実]{じつ}、[空虚]{くうきょ}[極]{きわ}まりない[記号]{きごう}の[消費]{しょうひ}へと[堕]{お}ち[入]{い}っているのではないだろうか。
[不可逆]{ふかぎゃく}に[流]{なが}れ[去]{さ}る[時間]{じかん}をただ[消費]{しょうひ}するのではなく、[無為]{むい}の[時間]{じかん}に[身]{み}を[浸]{ひた}す[勇気]{ゆうき}こそが、[真]{しん}の[人間性]{にんげんせい}の[回復]{かいふく}につながるのである。`,
    passagePlain: `動画の倍速視聴や要約コンテンツの消費に象徴されるように、現代社会を席巻しているのは「タイムパフォーマンス（タイパ）」を至高の価値とみなす風潮である。
情報の氾濫に晒される現代人にとって、最小限の時間で最大限の成果や情報を刈り取ろうとする試みは、ある種の防衛機制として不可避な側面を持つ。
しかしながら、効率性の極限を追求するあまり、過程そのものが内包する「無駄」や「逡巡」を徹底的に排除しようとする姿勢には、危うさを禁じ得ない。
そもそも、芸術を鑑賞する時間や他者と心を通わせる対話の深みは、要約不可能な冗長さや、予測のつかない迂回のなかにこそ宿るものである。
結論への到達のみを急ぎ、道草の豊かさを削ぎ落とした人間の生は、一見すると知的に研ぎ澄まされているようでいて、その実、空虚極まりない記号の消費へと堕ち入っているのではないだろうか。
不可逆的に流れ去る時間をただ消費するのではなく、無為の時間に身を浸す勇気こそが、真の人間性の回復につながるのである。`,
    translationEn: `As symbolized by watching videos at double speed and consuming condensed content summaries, what engulfs modern society is the trend of regarding "time-performance" (taipa) as the supreme virtue. For modern individuals exposed to an inundation of information, attempting to harvest maximum results and data in minimal time undeniably possesses an inevitable aspect as a psychological defense mechanism. Nonetheless, in aggressively pursuing the limits of efficiency to the point of thoroughly eliminating the "waste" and "hesitation" inherently contained within the process itself, one cannot help but feel a profound danger. To begin with, the depth of contemplating art or connecting genuinely with another person resides precisely within unsummarizable redundancy and unpredictable detours. A human existence that hurries solely toward reaching conclusions, having stripped away the richness of wandering off the beaten path, may appear intellectually sharpened at first glance, but in reality, is it not descending into a hollow consumption of mere symbols? Rather than merely consuming time that irreversibly flows away, the courage to immerse oneself in idle, unhurried time is what leads to the recovery of true humanity.`,
    translationMy: `ဗီဒီယိုများကို အမြန်နှုန်းနှစ်ဆဖြင့် ကြည့်ရှုခြင်းနှင့် အကျဉ်းချုပ်အချက်အလက်များကိုသာ စားသုံးခြင်းတို့က သရုပ်ဖော်နေသကဲ့သို့ ယနေ့ခေတ်လူ့ဘောင်ကို လွှမ်းမိုးထားသည်မှာ "အချိန်အကျိုးထိရောက်မှု" (Time-Performance) ကို အမြင့်မားဆုံးတန်ဖိုးအဖြစ် သတ်မှတ်သည့် ခေတ်ရေစီးကြောင်း ဖြစ်ပါသည်။ သတင်းအချက်အလက်များ ဖရိုဖရဲ လျှံကျနေမှုနှင့် ရင်ဆိုင်နေရသော ခေတ်သစ်လူသားများအတွက် အနည်းဆုံးအချိန်အတွင်း အများဆုံးရလဒ်နှင့် အချက်အလက်များကို ရိတ်သိမ်းရန် ကြိုးပမ်းခြင်းသည် မိမိကိုယ်ကို အကာအကွယ်ပေးသည့် တုံ့ပြန်မှုတစ်ရပ်အနေဖြင့် မလွှဲမရှောင်သာသော အသွင်အပြင် ရှိနေပါသည်။ သို့သော် ထိရောက်မှုစွမ်းရည်၏ အထွတ်အထိပ်ကို အလွန်အမင်း ရှာဖွေလိုလွန်းသဖြင့် ဖြစ်စဉ်တစ်ခုလုံးတွင် ပါဝင်နေသော "အကျိုးမရှိမှု" နှင့် "တွေဝေတုံ့ဆိုင်းမှု" တို့ကို လုံးဝဥဿုံ ဖယ်ရှားပစ်ရန် ကြိုးပမ်းသည့် သဘောထားတွင် အန္တရာယ်ကြီးမားမှုကို မခံစားဘဲ မနေနိုင်ပေ။ အနုပညာကို ခံစားနားလည်သည့် အချိန်နှင့် အခြားသူများနှင့် စိတ်ချင်းဆက်သွယ်သည့် နက်နဲသော စကားဝိုင်းများသည် အကျဉ်းချုံ့၍မရနိုင်သော ရှည်လျားထွေပြားမှုများနှင့် ကြိုတင်မခန့်မှန်းနိုင်သော ကွေ့ကောက်လှည့်ပတ်မှုများ အတွင်း၌သာ အမှန်တကယ် ကိန်းအောင်းနေခြင်း ဖြစ်ပါသည်။ နိဂုံးချုပ်ရလဒ်သို့ ရောက်ရှိရန်သာ အလျင်စလို ပြေးလွှားပြီး လမ်းဘေးဝဲယာရှိ သာယာလှပမှုများကို လှီးထုတ်ပစ်လိုက်သော လူသားတို့၏ ဘဝသည် တစ်ချက်ကြည့်လျှင် ဉာဏ်ရည်ထက်မြက်နေသယောင် ထင်ရသော်လည်း၊ အမှန်တကယ်တွင်မူ အလွန်အမင်း အဓိပ္ပာယ်မဲ့ဆိတ်သုဉ်းသော သင်္ကေတများကိုသာ စားသုံးနေသည့် ချောက်ကမ်းပါးထဲသို့ သက်ဆင်းသွားခြင်း မဟုတ်ပါလော။ ပြန်လည်မရနိုင်ဘဲ ကုန်လွန်သွားသော အချိန်များကို သာမန်စားသုံးနေရုံမျှ မဟုတ်ဘဲ အလုပ်ကင်းမဲ့စွာ အနားယူအပန်းဖြေသည့် အချိန်အတွင်း မိမိကိုယ်ကို နှစ်မြှုပ်ဝံ့သည့် သတ္တိသည်သာလျှင် စစ်မှန်သော လူသားဆန်မှုကို ပြန်လည်ဖော်ဆောင်ပေးနိုင်မည် ဖြစ်ပါသည်။`,
    vocabularyList: [
      { word: '席巻する', reading: 'せっけんする', meaning: 'to engulf, sweep over', meaningMy: 'လွှမ်းမိုးသိမ်းပိုက်သည်' },
      { word: '防衛機制', reading: 'ぼうえいきせい', meaning: 'psychological defense mechanism', meaningMy: 'စိတ်ပိုင်းဆိုင်ရာ မိမိကိုယ်ကို ကာကွယ်မှုစနစ်' },
      { word: '逡巡', reading: 'しゅんじゅん', meaning: 'hesitation, vacillation', meaningMy: 'တွေဝေတုံ့ဆိုင်းမှု' },
      { word: '危うさを禁じ得ない', reading: 'あやうさをきんじえない', meaning: 'cannot help but feel a sense of peril', meaningMy: 'အန္တရာယ်ရှိမှုကို မခံစားဘဲမနေနိုင်ပါ' },
      { word: '空虚極まりない', reading: 'くうきょきわまりない', meaning: 'extremely hollow, profoundly void', meaningMy: 'အလွန်အမင်း အဓိပ္ပာယ်မဲ့ဆိတ်သုဉ်းသော' },
    ],
    grammarPoints: [
      { grammar: '～を禁じ得ない', meaning: 'cannot help but feel / cannot suppress (emotion)', meaningMy: '...မခံစားဘဲ မနေနိုင်ပါ', explanation: 'Formal literary expression of involuntary profound emotion.', exampleJp: '危うさを禁じ得ません。' },
      { grammar: '～極まりない', meaning: 'extremely / exceedingly ~ (negative quality)', meaningMy: 'အလွန်အမင်း ...ဖြစ်သော', explanation: 'Attaches to na-adjective stems to denote an extreme state.', exampleJp: '空虚極まりない記号の消費です。' },
      { grammar: '～あまり（に）', meaning: 'so much that / as a result of excessive ~', meaningMy: '...လွန်းသဖြင့်', explanation: 'Excessive cause producing an unintended consequence.', exampleJp: '効率性を追求するあまり、無駄を排除します。' },
    ],
    audioScript: 'タイパ至上主義によって効率性を追求するあまり、過程の豊かさや対話の深みが削ぎ落とされています。不可逆な時間をただ消費するのではなく、無為の時間に身を浸す勇気が大切です。',
    questions: [
      {
        id: 'rq-n1-01-1',
        questionJp: '筆者が「タイパ至上主義」に対して抱いている根本的な懸念は何ですか？',
        questionEn: 'What is the fundamental concern the author holds toward the "time-performance" obsession?',
        questionMy: 'စာရေးသူက "အချိန်အကျိုးထိရောက်မှု အစွန်းရောက်ခြင်း" အပေါ် ထားရှိသည့် အဓိကစိုးရိမ်မှုမှာ အဘယ်နည်း။',
        options: [
          'スマートフォンのバッテリー消費量が急増すること',
          '動画配信サービスの売り上げが著しく下がること',
          '効率の追求によって過程の内包する無駄や逡巡が削ぎ落とされ、生が空虚な記号消費へと堕ち入ること',
          '倍速で視聴すると画面の解像度が劣化すること',
        ],
        correctIndex: 2,
        explanation: 'The passage explicitly argues: 「効率性の極限を追求するあまり、過程そのものが内包する『無駄』や『逡巡』を徹底的に排除しようとする姿勢には、危うさを禁じ得ない...空虚極まりない記号の消費へと堕ち入っている」(Eliminating hesitation and detours leads to empty symbol consumption).',
        explanationMy: 'ထိရောက်မှုကိုသာ အလွန်အမင်း လိုက်စားလွန်းသဖြင့် လုပ်ငန်းစဉ်၏ တန်ဖိုးရှိသော တွေဝေမှုနှင့် လမ်းဘေးအလှများကို လှီးထုတ်မိကာ ဘဝသည် အဓိပ္ပာယ်မဲ့သော သင်္ကေတစားသုံးမှုသို့ ကျဆင်းသွားခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-01-2',
        questionJp: '筆者が述べる「真の人間性の回復」のために必要な態度として提示されているものはどれですか？',
        questionEn: 'Which attitude is presented as necessary for the "recovery of true humanity"?',
        questionMy: '"စစ်မှန်သော လူသားဆန်မှုကို ပြန်လည်ဖော်ဆောင်ရေး" အတွက် စာရေးသူ တင်ပြထားသော သဘောထားမှာ အဘယ်နည်း။',
        options: [
          'すべての情報を５倍速で記憶する技術を習得すること',
          '結論だけに最短距離で到達する行動様式を徹底すること',
          '不可逆な時間を単に消費するのではなく、無為の時間に身を浸す勇気を持つこと',
          'あらゆる娯楽を断ち切って労働だけに時間を捧げること',
        ],
        correctIndex: 2,
        explanation: 'Conclusion states: 「不可逆的に流れ去る時間をただ消費するのではなく、無為の時間に身を浸す勇気こそが、真の人間性の回復につながるのである」(The courage to immerse oneself in idle, unhurried time).',
        explanationMy: 'အချိန်ကို သာမန်ဖြုန်းတီးနေရုံမျှ မဟုတ်ဘဲ အလုပ်မရှိ အနားယူချိန်အတွင်း မိမိကိုယ်ကို နှစ်မြှုပ်ဝံ့သည့် သတ္တိရှိခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'N1 critique of temporal sociology and existential philosophy verified by curriculum specialist.',
  },

  // 2. School / Higher Education & Epistemology
  {
    id: 'r-n1-02',
    title: '人文学の危機と功利主義的知の限界',
    titleEn: 'The Crisis of the Humanities and the Limits of Utilitarian Knowledge',
    titleMy: 'လူမှုလူသားပညာရပ်များ၏ အကျပ်အတည်းနှင့် အသုံးချဝါဒီ အသိပညာ၏ အကန့်အသတ်များ',
    level: 'N1',
    topic: 'school',
    subtopic: 'Decline of liberal arts funding, market-driven universities, and the intrinsic value of critique',
    learningObjectives: ['Comprehend academic institutional philosophy on liberal education', 'Analyze rhetorical structures: ～であれ...であれ and ～を禁じ得ない'],
    learningObjectivesMy: ['တက္ကသိုလ်ပညာရေးဆိုင်ရာ အဆင့်မြင့်ဒဿနိကဆောင်းပါးများကို နားလည်စေရန်', '～であれ (ဖြစ်စေ...ဖြစ်စေ) ကို သုံးတတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[近年]{きんねん}、[大学]{だいがく}の[統廃合]{とうはいごう}や[予算]{よさん}[削減]{さくげん}の[議論]{ぎろん}において、[即効性]{そっこうせい}のある[経済的]{けいざいてき}[実利]{じつり}を[生]{う}み[出]{だ}さない[哲学]{てつがく}や[文学]{ぶんがく}、[歴史学]{れきしがく}といった「[人文学]{じんぶんがく}」を[軽視]{けいし}する[言説]{げんせつ}が[後]{あと}を[絶]{た}たない。
「[役]{やく}に[立]{た}つ[学問]{がくもん}」ばかりを[優遇]{ゆうぐう}し、[市場]{しじょう}[原理]{げんり}を[大学]{だいがく}[教育]{きょういく}に[無批判]{むひはん}に[導入]{どうにゅう}しようとするこの[功利主義的]{こうりしゅぎてき}な[風潮]{ふうちょう}には、[深]{ふか}い[憂慮]{ゆうりょ}を[抱]{いだ}かざるを[得]{え}ない。
なるほど、[先端]{せんたん}[科学]{かがく}や[実務]{じつむ}[技術]{ぎじゅつ}が[物質的]{ぶっしつてき}[繁栄]{はんえい}を[牽引]{けんいん}してきたことは[疑]{うたが}う[余地]{よち}がない。
しかしながら、それらの[技術]{ぎじゅつ}を「いかに[用]{もち}いるべきか」「[何]{なに}が[真]{しん}の[豊]{ゆた}かさなのか」という[根本的]{こんぽんてき}な[価値]{かち}[判断]{はんだん}の[座標軸]{ざひょうじく}を[与]{あた}えるのは、[他]{ほか}ならぬ[人文学]{じんぶんがく}の[蓄積]{ちくせき}である。
[目先]{めさき}の「[即効性]{そっこうせい}」にとらわれるあまり、[批判的]{ひはんてき}[思考]{しこう}や[歴史的]{れきしてき}[洞察]{どうさつ}を[培]{つちか}う[土壌]{どじょう}を[自]{みずか}ら[痩せ細らせて]{やせほそらせて}しまえば、[社会]{しゃかい}は[倫理的]{りんりてき}な[盲目]{もうもく}へと[陥]{おちい}る。
人文学の[真価]{しんか}とは、まさに「[問]{と}いそのものの[妥当性]{だとうせい}」を[疑]{うたが}い[直]{なお}す[不断]{ふだん}の[知的]{ちてき}[営為]{えいい}にこそ[存]{ぞん}するのである。`,
    passagePlain: `近年、大学の統廃合や予算削減の議論において、即効性のある経済的実利を生み出さない哲学や文学、歴史学といった「人文学」を軽視する言説が後を絶たない。
「役に立つ学問」ばかりを優遇し、市場原理を大学教育に無批判に導入しようとするこの功利主義的な風潮には、深い憂慮を抱かざるを得ない。
なるほど、先端科学や実務技術が物質的繁栄を牽引してきたことは疑う余地がない。
しかしながら、それらの技術を「いかに用いるべきか」「何が真の豊かさなのか」という根本的な価値判断の座標軸を与えるのは、他ならぬ人文学の蓄積である。
目先の「即効性」にとらわれるあまり、批判的思考や歴史的洞察を培う土壌を自ら痩せ細らせてしまえば、社会は倫理的な盲目へと陥る。
人文学の真価とは、まさに「問いそのものの妥当性」を疑い直す不断の知的営為にこそ存するのである。`,
    translationEn: `In recent years, amidst debates surrounding university consolidation and budget cutbacks, discourses disparaging the "humanities"—such as philosophy, literature, and history—which do not yield immediate economic utility, have never ceased. Toward this utilitarian trend, which favors only "useful academics" and uncritically introduces market principles into higher education, one cannot help but harbor deep concern. To be sure, there is no room to doubt that cutting-edge science and practical technology have driven material prosperity. Nevertheless, what provides the coordinate axes for fundamental value judgments—such as "how these technologies ought to be deployed" and "what constitutes true prosperity"—is none other than the accumulated heritage of the humanities. If, held captive by immediate "expediency," we allow the soil that cultivates critical thinking and historical insight to atrophy, society will descend into ethical blindness. The true value of the humanities resides precisely in the unceasing intellectual endeavor of interrogating the validity of our questions themselves.`,
    translationMy: `မကြာသေးမီနှစ်များအတွင်း တက္ကသိုလ်များ ပေါင်းစည်းဖျက်သိမ်းခြင်းနှင့် ဘတ်ဂျက်လျှော့ချခြင်းဆိုင်ရာ ဆွေးနွေးမှုများတွင် ချက်ချင်းစီးပွားရေးအကျိုးအမြတ်မဖြစ်ထွန်းစေသော ဒဿနိကဗေဒ၊ စာပေနှင့် သမိုင်းပညာရပ်များကဲ့သို့သော "လူမှုလူသားပညာရပ်များ" (Humanities) ကို အထင်သေးအလေးမထားသည့် စကားများသည် မပြတ်ထွက်ပေါ်လျက် ရှိပါသည်။ "အသုံးချနိုင်သော ပညာရပ်များ" ကိုသာ မျက်နှာသာပေးပြီး ဈေးကွက်သဘောတရားများကို တက္ကသိုလ်ပညာရေးအတွင်း ဝေဖန်ဆန်းစစ်မှုမရှိဘဲ သွတ်သွင်းရန် ကြိုးပမ်းသည့် ဤအသုံးချဝါဒီ ရေစီးကြောင်းအပေါ်တွင် နက်ရှိုင်းစွာ စိုးရိမ်ပူပန်မှုကို မထားရှိဘဲ မနေနိုင်ပေ။ ခေတ်မီသိပ္ပံနှင့် လက်တွေ့နည်းပညာများသည် ရုပ်ဝတ္ထုပိုင်းဆိုင်ရာ ကြွယ်ဝချမ်းသာမှုကို ဦးဆောင်လမ်းပြခဲ့သည်မှာ သံသယဖြစ်ဖွယ်မရှိပေ။ သို့သော် ထိုနည်းပညာများကို "မည်သို့အသုံးပြုသင့်သနည်း" နှင့် "အဘယ်အရာသည် စစ်မှန်သော ကြွယ်ဝမှုဖြစ်သနည်း" ဟူသော အခြေခံကျသည့် တန်ဖိုးဖြတ်ဆုံးဖြတ်မှု မဏ္ဍိုင်များကို ပေးစွမ်းနိုင်သည်မှာ အခြားမဟုတ်ဘဲ လူမှုလူသားပညာရပ်များ၏ စုဆောင်းထားသော အသိဉာဏ်များသာ ဖြစ်ပါသည်။ မျက်မှောက်ကာလ၏ "ချက်ချင်းအကျိုးကျေးဇူး" နောက်သို့ အလွန်အမင်း လိုက်ပါမိသဖြင့် ဝေဖန်ဆန်းစစ်တွေးခေါ်နိုင်စွမ်းနှင့် သမိုင်းဆိုင်ရာ ထိုးထွင်းသိမြင်မှုများကို ပျိုးထောင်ပေးသည့် မြေဆီလွှာကို မိမိတို့ကိုယ်တိုင် ပျက်စီးစေပါက လူ့ဘောင်အဖွဲ့အစည်းသည် ကျင့်ဝတ်ဆိုင်ရာ မျက်ကန်းဖြစ်မှုဆီသို့ ကျရောက်သွားပေလိမ့်မည်။ လူမှုလူသားပညာရပ်များ၏ စစ်မှန်သော တန်ဖိုးဆိုသည်မှာ "မေးခွန်း၏ ခိုင်လုံမှုကိုယ်တိုင်ကိုပင် ပြန်လည်မေးခွန်းထုတ်ဆန်းစစ်ခြင်း" ဟူသော အစဉ်မပြတ် ဉာဏ်ရည်ဉာဏ်သွေးဆိုင်ရာ ကြိုးပမ်းလုပ်ဆောင်မှုအတွင်း၌သာ အမှန်တကယ် တည်ရှိနေပေသည်။`,
    vocabularyList: [
      { word: '統廃合', reading: 'とうはいごう', meaning: 'reorganization and consolidation', meaningMy: 'ပေါင်းစည်းဖျက်သိမ်းခြင်း' },
      { word: '功利主義的', reading: 'こうりしゅぎてき', meaning: 'utilitarian', meaningMy: 'လက်တွေ့အသုံးချဝါဒဆိုင်ရာ' },
      { word: '座標軸', reading: 'ざひょうじく', meaning: 'coordinate axis, frame of reference', meaningMy: 'စံသတ်မှတ်ချက် မဏ္ဍိုင်' },
      { word: '不断の', reading: 'ふだんの', meaning: 'unceasing, relentless, constant', meaningMy: 'အစဉ်မပြတ်သော' },
    ],
    grammarPoints: [
      { grammar: '～を抱かざるを得ない', meaning: 'cannot help but harbor (feeling)', meaningMy: '...မထားရှိဘဲ မနေနိုင်ပါ', explanation: 'Formal necessity marker expressing involuntary attitude.', exampleJp: '深い憂慮を抱かざるを得ません。' },
      { grammar: '～疑う余地がない', meaning: 'there is no room to doubt ~', meaningMy: 'သံသယဖြစ်ဖွယ် မရှိပါ', explanation: 'Categorical indisputable assertion.', exampleJp: '牽引してきたことは疑う余地がありません。' },
      { grammar: '他ならぬ～である', meaning: 'none other than ~', meaningMy: 'အခြားမဟုတ်ဘဲ ...သာ ဖြစ်သည်', explanation: 'Exclusive identification of critical agency.', exampleJp: '他ならぬ人文学の蓄積です。' },
    ],
    audioScript: '人文学軽視の功利主義的風潮に対し、技術をいかに用いるべきかという根本的価値判断を与えるのは人文学の蓄積です。問いそのものを疑い直す知性が重要です。',
    questions: [
      {
        id: 'rq-n1-02-1',
        questionJp: '筆者が述べる、人文学が社会において果たす決定的な役割は何ですか？',
        questionEn: 'What is the decisive role the humanities play in society according to the author?',
        questionMy: 'စာရေးသူ၏ အဆိုအရ လူမှုလူသားပညာရပ်များက လူ့ဘောင်တွင် အကျိုးပြုသည့် အဆုံးအဖြတ်အခန်းကဏ္ဍမှာ အဘယ်နည်း။',
        options: [
          'スマートフォンの計算速度を２倍にすること',
          '科学技術の用い方や真の豊かさを判断するための根本的な座標軸を与えること',
          '大学の学費を即座に半額にすること',
          '世界中のすべての人を学者にすること',
        ],
        correctIndex: 1,
        explanation: 'Text specifies: 「技術を『いかに用いるべきか』『何が真の豊かさなのか』という根本的な価値判断の座標軸を与えるのは、他ならぬ人文学の蓄積である」(Provides coordinate axes for value judgments).',
        explanationMy: 'သိပ္ပံနည်းပညာများကို မည်သို့သုံးသင့်သည်နှင့် စစ်မှန်သော ကြွယ်ဝမှုမှာ အဘယ်နည်းဟူသော အခြေခံတန်ဖိုးသတ်မှတ်ချက်များကို ပေးစွမ်းနိုင်ခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-02-2',
        questionJp: '文章の最後で述べられている「人文学の真価」とは何ですか？',
        questionEn: 'What is the "true value of the humanities" stated at the end of the text?',
        questionMy: 'စာပိုဒ်အဆုံးတွင် ဖော်ပြထားသော "လူမှုလူသားပညာရပ်များ၏ စစ်မှန်သောတန်ဖိုး" ဆိုသည်မှာ အဘယ်နည်း။',
        options: [
          '経済的利益を１秒で生み出すこと',
          '問いそのものの妥当性を疑い直す不断の知的営為にあること',
          '過去の文献を一字一句暗記すること',
          'すべての自然科学を否定すること',
        ],
        correctIndex: 1,
        explanation: 'Final sentence asserts: 「人文学の真価とは、まさに『問いそのものの妥当性』を疑い直す不断の知的営為にこそ存するのである」(Interrogating the validity of questions themselves).',
        explanationMy: 'မေးခွန်း၏ ခိုင်လုံမှုကိုယ်တိုင်ကိုပင် အစဉ်မပြတ် ပြန်လည်မေးခွန်းထုတ်ဆန်းစစ်သည့် ဉာဏ်ရည်ဉာဏ်သွေးဆိုင်ရာ ကြိုးပမ်းမှု ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Verified for N1 academic discourse, epistemological terminology, and rhetoric.',
  },

  // 3. Culture / Japanese Aesthetics & Spatial Philosophy
  {
    id: 'r-n1-03',
    title: '「間（ま）」の空間論と余白の芸術',
    titleEn: 'Spatial Theory of "Ma" (Negative Space) and the Art of the Void',
    titleMy: '"မ" (အလွတ်နေရာ) ၏ ဟင်းလင်းပြင်သဘောတရားနှင့် နေရာလွတ်အနုပညာ',
    level: 'N1',
    topic: 'culture',
    subtopic: 'Architectural negative space, theatrical pause in Noh, and non-representational aesthetics',
    learningObjectives: ['Comprehend abstract aesthetic theory and spatial philosophy in traditional arts', 'Understand literary constructions: ～にあって and ～といえども'],
    learningObjectivesMy: ['ဂျပန်ရိုးရာ ဟင်းလင်းပြင်အနုပညာနှင့် ဒဿနများကို နားလည်စေရန်', '～にあって (ထိုအခြေအနေတွင်) စသည့် သဒ္ဒါများကို သုံးတတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[日本]{にほん}の[伝統]{でんとう}[文化]{ぶんか}において、[造形]{ぞうけい}[芸術]{げいじゅつ}から[舞台]{ぶたい}[芸術]{げいじゅつ}、[果]{は}ては[日常]{にちじょう}の[作法]{さほう}に[至]{いた}るまで[通底]{つうてい}する[特異]{とくい}な[概念]{がいねん}が「[間]{ま}」である。
[西洋]{せいよう}の[古典的]{こてんてき}な[空間]{くうかん}[把握]{はあく}が、[空白]{くうはく}を「[何]{なに}も[存在]{そんざい}しない[欠落]{けつらく}」とみなして[充填]{じゅうてん}すべき[対象]{たいしょう}と[捉]{とら}えたのに対し、[日本]{にほん}の「[間]{ま}」は、[物理的]{ぶつりてき}な[無]{む}のなかに[豊饒]{ほうじょう}な[意味]{いみ}の[充満]{じゅうまん}を[見出]{みいだ}す[思考]{しこう}である。
[水墨画]{すいぼくが}において[描]{えが}かれない[余白]{よはく}は、[単]{たん}なる[紙]{かみ}の[地]{じ}ではなく、[無限]{むげん}の[大気]{たいき}や[水面]{すいめん}、あるいは[鑑賞者]{かんしょうしゃ}の[想像力]{そうぞうりょく}を[喚起]{かんき}する[詩的]{してき}[空間]{くうかん}として[機能]{きのう}する。
また、[能楽]{のうがく}における「[無為]{むい}の[瞬間]{しゅんかん}」、すなわち[役者]{やくしゃ}が[動]{うご}きを[止]{と}めて[静止]{せいし}する[間]{ま}にこそ、[極限]{きょくげん}の[緊張感]{きんちょうかん}と[感情]{かんじょう}の[凝縮]{ぎょうしゅく}が[生]{う}まれる。
[過密]{かみつ}な[情報]{じょうほう}と[騒音]{そうおん}に[埋]{う}め[尽]{つ}くされた[現代]{げんだい}に[あって]、あえて「[語]{かた}らざるもの」「[描]{えが}かざるもの」に[耳]{みみ}を[澄]{す}ます「[間]{ま}」の[哲学]{てつがく}は、[形式主義]{けいしきしゅぎ}を[超]{こ}えた[深遠]{しんえん}な[対話]{たいわ}の[回路]{かいろ}を[開]{ひら}いているといえよう。`,
    passagePlain: `日本の伝統文化において、造形芸術から舞台芸術、果ては日常の作法に至るまで通底する特異な概念が「間」である。
西洋の古典的な空間把握が、空白を「何も存在しない欠落」とみなして充填すべき対象と捉えたのに対し、日本の「間」は、物理的な無のなかに豊饒な意味の充満を見出す思考である。
水墨画において描かれない余白は、単なる紙の地ではなく、無限の大気や水面、あるいは鑑賞者の想像力を喚起する詩的空間として機能する。
また、能楽における「無為の瞬間」、すなわち役者が動きを止めて静止する間にこそ、極限の緊張感と感情の凝縮が生まれる。
過密な情報と騒音に埋め尽くされた現代にあって、あえて「語らざるもの」「描かざるもの」に耳を澄ます「間」の哲学は、形式主義を超えた深遠な対話の回路を開いているといえよう。`,
    translationEn: `In Japanese traditional culture, a unique concept running through everything from plastic arts to performing arts and extending to daily etiquette is "Ma" (negative space/interval). In contrast to classical Western spatial perception, which regarded empty space as an "absence where nothing exists" and an object to be filled, the Japanese "Ma" is a mindset that discovers a rich fullness of meaning within physical nothingness. In ink wash painting (suibokuga), the unpainted margins are not merely bare paper, but function as poetic spaces evoking infinite atmosphere, water surfaces, or the viewer's own imagination. Furthermore, in Noh theater, in the "moments of inaction"—namely, the pauses where an actor halts all movement and remains still—extreme tension and condensed emotion are born. In a modern era buried under dense information and noise, the philosophy of "Ma"—daring to listen closely to "what is left unsaid" and "what is left unpainted"—opens a circuit for profound dialogue transcending formal aesthetics.`,
    translationMy: `ဂျပန်ရိုးရာယဉ်ကျေးမှုတွင် ပန်းချီပန်းပု ရုပ်လုံးဖော်အနုပညာမှစ၍ ဇာတ်သဘင်အနုပညာနှင့် နေ့စဉ်အပြုအမူကျင့်ဝတ်များအထိ စိမ့်ဝင်ပျံ့နှံ့နေသော ထူးခြားသည့် အယူအဆမှာ "မ" (Ma - အလွတ်နေရာ/ခေတ္တရပ်နားမှု) ဖြစ်ပါသည်။ အနောက်တိုင်း ရှေးရိုးဟင်းလင်းပြင်အမြင်က နေရာလွတ်ကို "မည်သည့်အရာမျှမရှိသော ချို့ယွင်းချက်" အဖြစ် မှတ်ယူပြီး ဖြည့်ဆည်းရမည့်အရာဟု ရှုမြင်ခဲ့ကြသည်နှင့် ဆန့်ကျင်ဘက်အနေဖြင့်၊ ဂျပန်တို့၏ "မ" သည် ရုပ်ဝတ္ထုပိုင်းဆိုင်ရာ အချည်းနှီးဖြစ်မှုအတွင်း၌ပင် ကြွယ်ဝပြည့်စုံသော အဓိပ္ပာယ်များ ပြည့်လျှံနေမှုကို ရှာဖွေတွေ့ရှိသည့် အတွေးအခေါ် ဖြစ်ပါသည်။ ရေဆေးမှင်ပန်းချီတွင် မရေးဆွဲဘဲ ချန်လှပ်ထားသော နေရာလွတ်သည် သာမန်စက္ကူအလွတ်မျှ မဟုတ်ဘဲ အဆုံးမရှိသော လေထု၊ ရေမျက်နှာပြင် သို့မဟုတ် ကြည့်ရှုသူ၏ စိတ်ကူးစိတ်သန်းကို နှိုးဆွပေးသည့် ကဗျာဆန်သော ဟင်းလင်းပြင်အဖြစ် အသုံးဝင်ပါသည်။ ထို့အပြင် နိုဟ် (Noh) ဇာတ်သဘင်တွင် "လှုပ်ရှားမှုမဲ့သော အခိုက်အတန့်"၊ ဆိုလိုသည်မှာ ကပြသူက လှုပ်ရှားမှုကို ရပ်တန့်ကာ ငြိမ်သက်သွားသည့် အခိုက်အတန့်အတွင်း၌သာ အမြင့်မားဆုံး တင်းမာမှုနှင့် ခံစားချက်တို့၏ ပေါင်းစည်းမှု ဖြစ်ပေါ်လာရပါသည်။ ပြွတ်သိပ်နေသော အချက်အလက်များနှင့် ဆူညံသံများဖြင့် ဖုံးလွှမ်းနေသည့် ယနေ့ခေတ်ကာလတွင် "မပြောဘဲချန်ထားသောအရာ" နှင့် "မရေးဆွဲဘဲ ထားခဲ့သောအရာ" ကို စိတ်ပါလက်ပါ နားစွင့်တတ်သည့် "မ" ၏ ဒဿနသည် ပုံစံဝါဒကို ကျော်လွန်သော နက်နဲသည့် ဆက်သွယ်မှုလမ်းကြောင်းကို ဖွင့်လှစ်ပေးနေသည်ဟု ဆိုနိုင်ပေသည်။`,
    vocabularyList: [
      { word: '通底する', reading: 'つうていする', meaning: 'to run through (as a common underlying thread)', meaningMy: 'အခြေခံအဖြစ် စိမ့်ဝင်ပျံ့နှံ့နေသည်' },
      { word: '豊饒な', reading: 'ほうじょうな', meaning: 'fertile, abundant, rich', meaningMy: 'ကြွယ်ဝပြည့်စုံသော' },
      { word: '喚起する', reading: 'かんきする', meaning: 'to evoke, rouse (imagination)', meaningMy: 'နှိုးဆွဖော်ထုတ်သည်' },
      { word: '凝縮', reading: 'ぎょうしゅく', meaning: 'condensation, intense compression', meaningMy: 'သိပ်သည်းစွာ ပေါင်းစည်းမှု' },
    ],
    grammarPoints: [
      { grammar: '～に至るまで', meaning: 'ranging from ~ all the way to ...', meaningMy: '...မှစ၍ ...အထိပင်', explanation: 'Marks expansive domain spanning from grand to minute.', exampleJp: '作法に至るまで通底しています。' },
      { grammar: '～にあって', meaning: 'in the context of / amidst ~', meaningMy: '...သော အခြေအနေကာလတွင်', explanation: 'Formal temporal setting marker: 現代にあって。', exampleJp: '現代にあって、耳を澄ます哲学です。' },
    ],
    audioScript: '日本の「間」は、空間の欠落ではなく無の中に豊かな意味を見出す美学です。水墨画の余白や能の静止にみられるように、語らざるものにこそ感情が凝縮されます。',
    questions: [
      {
        id: 'rq-n1-03-1',
        questionJp: '水墨画の余白について、文章の中でどのように説明されていますか？',
        questionEn: 'How is the unpainted margin in ink wash painting explained in the text?',
        questionMy: 'ရေဆေးမှင်ပန်းချီရှိ မရေးဆွဲဘဲချန်ထားသော နေရာလွတ်အကြောင်း စာပိုဒ်တွင် မည်သို့ရှင်းပြထားသနည်း။',
        options: [
          '墨が足りなくなって途中でやめた失敗の証拠である',
          '単なる紙の地ではなく、無限の大気や鑑賞者の想像力を喚起する詩的空間である',
          '後から文字を書き足すために空けてあるメモ欄である',
          '西洋の絵画を真似して描かれたものである',
        ],
        correctIndex: 1,
        explanation: 'The text states: 「単なる紙の地ではなく、無限の大気や水面、あるいは鑑賞者の想像力を喚起する詩的空間として機能する」(Poetic space evoking atmosphere and imagination).',
        explanationMy: 'သာမန်စက္ကူအလွတ်မျှမဟုတ်ဘဲ လေထု၊ ရေပြင်နှင့် ကြည့်ရှုသူ၏ စိတ်ကူးစိတ်သန်းကို နှိုးဆွပေးသည့် ကဗျာဆန်သော ဟင်းလင်းပြင် ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-03-2',
        questionJp: '能楽における「静止の間」が生み出す効果は何ですか？',
        questionEn: 'What effect is produced by the "pause of stillness" in Noh theater?',
        questionMy: 'နိုဟ်ဇာတ်သဘင်တွင် လှုပ်ရှားမှုမဲ့ရပ်တန့်သည့် အခိုက်အတန့်က ဖြစ်ပေါ်စေသော အကျိုးသက်ရောက်မှုမှာ အဘယ်နည်း။',
        options: [
          '観客を眠らせてリラックスさせること',
          '役者が台詞を忘れたことをごまかすこと',
          '極限の緊張感と感情の凝縮を生み出すこと',
          '舞台の照明を暗くすること',
        ],
        correctIndex: 2,
        explanation: 'Sentence says: 「役者が動きを止めて静止する間にこそ、極限の緊張感と感情の凝縮が生まれる」(Extreme tension and condensed emotion).',
        explanationMy: 'အမြင့်မားဆုံး တင်းမာမှုနှင့် ခံစားချက်တို့၏ ပေါင်းစည်းမှုကို ဖြစ်ပေါ်စေခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Aesthetic spatial theory and Noh dramatic criticism verified for N1 standard.',
  },

  // 4. Food / Philosophy of Somatics and Agriculture
  {
    id: 'r-n1-04',
    title: '食の工業化と身体性の喪失',
    titleEn: 'The Industrialization of Food and the Loss of Somatic Connection',
    titleMy: 'အစားအသောက်ကို စက်မှုထုတ်လုပ်မှုအဖြစ် ပြောင်းလဲခြင်းနှင့် ခန္ဓာကိုယ်ဆိုင်ရာ ထိတွေ့မှု ဆုံးရှုံးခြင်း',
    level: 'N1',
    topic: 'food',
    subtopic: 'Ultra-processed food, sensory dissociation from agricultural origins, and food sovereignty',
    learningObjectives: ['Critique industrial consumer culture from a philosophical bio-ethics standpoint', 'Understand complex conditional structures like ～なくしては and ～を余儀なくされる'],
    learningObjectivesMy: ['စက်မှုစားသုံးမှုစနစ်ဆိုင်ရာ ဒဿနိကဆောင်းပါးများကို နားလည်ဆန်းစစ်နိုင်စေရန်', '～なくしては (မရှိဘဲနှင့် မဖြစ်နိုင်ပါ) ကို သုံးတတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[現代]{げんだい}の[都市]{とし}[生活]{せいかつ}において、私たちが[口]{くち}にする[食物]{しょくもつ}の[大半]{たいはん}は、[工場]{こうじょう}で[高度]{こうど}に[加工]{かこう}され、[プラスチック]{ぷらすちっく}の[包装]{ほうそう}に[閉]{と}じ[込]{こ}められた「[工業]{こうぎょう}[製品]{せいひん}」と[化]{か}している。
いつでも[均質]{きんいつ}な[味]{あじ}が[安価]{あんか}に[手]{て}に[入]{はい}る[利便性]{りべんせい}の[裏]{うら}で、[大地]{だいち}の[土]{つち}の[匂]{にお}いや[季節]{きせつ}の[移]{うつ}ろい、[生命]{せいめい}を[奪]{うば}って[自]{みずか}らの[糧]{かて}とする[原初的]{げんしょてき}な[手応え]{てごたえ}は、[綺麗]{きれい}に[不可視化]{ふかしか}されてしまった。
この「[食]{しょく}の[工業化]{こうぎょうか}」は、[単]{たん}に[添加物]{てんかぶつ}や[栄養]{えいよう}[偏重]{へんちょう}の[問題]{もんだい}に[とどまらない]{とどまらない}。
[本来]{ほんらい}、[食]{た}べるという[行為]{こうい}は、[外部]{がいぶ}の[自然]{しぜん}を[自]{みずか}らの[体内]{たいない}へと[取]{と}り[込]{こ}み、[他者]{たしゃ}の[命]{いのち}と[自]{みずか}らの[身体]{しんたい}を[連続的]{れんぞくてき}に[結]{むす}びつける[根源的]{こんげんてき}な[身体的]{しんたいてき}[営為]{えいい}であったはずである。
生産の現場から完全に切り離され、記号化された食品をただ機械的に嚥下する現代人は、みずからの身体が自然界の循環の一部であるという実感、すなわち「身体性」そのものを喪失しつつあるのではないか。
食への感性を呼び覚ますことは、私たちが自然界の一員としての生の根拠を取り戻す試みそのものにほかならない。`,
    passagePlain: `現代の都市生活において、私たちが口にする食物の大半は、工場で高度に加工され、プラスチックの包装に閉じ込められた「工業製品」と化している。
いつでも均質な味が安価に手に入る利便性の裏で、大地の土の匂いや季節の移ろい、生命を奪って自らの糧とする原初的な手応えは、綺麗に不可視化されてしまった。
この「食の工業化」は、単に添加物や栄養偏重の問題にとどまらない。
本来、食べるという行為は、外部の自然を自らの体内へと取り込み、他者の命と自らの身体を連続的に結びつける根源的な身体的営為であったはずである。
生産の現場から完全に切り離され、記号化された食品をただ機械的に嚥下する現代人は、みずからの身体が自然界の循環の一部であるという実感、すなわち「身体性」そのものを喪失しつつあるのではないか。
食への感性を呼び覚ますことは、私たちが自然界の一員としての生の根拠を取り戻す試みそのものにほかならない。`,
    translationEn: `In contemporary urban living, the majority of food we ingest has turned into "industrial products," highly processed in factories and sealed inside plastic packaging. Behind the convenience of obtaining homogeneous flavors inexpensively anytime, the scent of soil, the transition of seasons, and the primal sensation of taking a life to nourish one's own have been cleanly rendered invisible. This "industrialization of food" does not stop at problems of chemical additives or nutritional imbalance. Originally, the act of eating was supposed to be a fundamental somatic endeavor of incorporating external nature into one's own body, seamlessly linking the lives of others to one's own organism. Separated entirely from production sites, merely swallowing symbolified food items mechanically, are not modern humans losing the tangible realization that their own bodies are part of the natural cycle—namely, "corporeality" itself? Reawakening our sensibility toward food is none other than the very effort to reclaim the grounds of our existence as members of the natural realm.`,
    translationMy: `ယနေ့ခေတ် မြို့ပြလူနေမှုဘဝတွင် ကျွန်ုပ်တို့ စားသုံးနေသော အစားအစာအများစုသည် စက်ရုံများတွင် အဆင့်မြင့်စွာ ပြုပြင်ထုတ်လုပ်ထားပြီး ပလတ်စတစ်ထုပ်ပိုးမှုများအတွင်း ပိတ်လှောင်ထားသည့် "စက်မှုကုန်ချောပစ္စည်းများ" အဖြစ်သို့ ပြောင်းလဲသွားခဲ့ပြီ ဖြစ်ပါသည်။ မည်သည့်အချိန်မဆို တစ်သမတ်တည်းရှိသော အရသာကို ဈေးပေါပေါဖြင့် ရရှိနိုင်သည့် အဆင်ပြေမှု၏ နောက်ကွယ်တွင် မြေဆီလွှာ၏ ရနံ့၊ ရာသီဥတုအပြောင်းအလဲနှင့် အခြားသက်ရှိ၏ အသက်ကို သတ်ဖြတ်ယူဆောင်ကာ မိမိ၏ ခန္ဓာအာဟာရအဖြစ် ပြုလုပ်ရသည့် မူလအခြေခံကျသော ထိတွေ့ခံစားမှုတို့သည် သပ်ရပ်စွာ မမြင်နိုင်အောင် ဖုံးကွယ်ခံလိုက်ရပါသည်။ ဤ "အစားအစာကို စက်မှုထုတ်လုပ်မှုအဖြစ် ပြောင်းလဲခြင်း" သည် ဓာတုဖြည့်စွက်ဆေးများနှင့် အာဟာရမညီညွတ်မှု ပြဿနာများတွင်သာ ရပ်တန့်မနေပေ။ မူလအားဖြင့် စားသောက်ခြင်းဟူသော လုပ်ရပ်သည် ပြင်ပသဘာဝတရားကို မိမိ၏ ခန္ဓာကိုယ်တွင်းသို့ သွင်းယူပြီး အခြားသက်ရှိတို့၏ အသက်နှင့် မိမိ၏ ခန္ဓာကိုယ်ကို ဆက်စပ်ပေးသည့် အခြေခံအကျဆုံး ခန္ဓာပိုင်းဆိုင်ရာ လုပ်ဆောင်ချက် ဖြစ်ခဲ့သင့်ပါသည်။ ထုတ်လုပ်သည့် နေရာများနှင့် အပြီးတိုင် အဆက်အသွယ်ပြတ်တောက်ကာ သင်္ကေတအဖြစ် ပြောင်းလဲသွားသော အစားအစာများကို စက်ရုပ်သဖွယ် မျိုချနေကြသည့် ခေတ်သစ်လူသားများသည် မိမိတို့၏ ခန္ဓာကိုယ်သည် သဘာဝလောက၏ သံသရာစက်ဝန်းအတွင်း အစိတ်အပိုင်းတစ်ခုဖြစ်သည်ဟူသော လက်တွေ့ခံစားမှု၊ ဆိုလိုသည်မှာ "ခန္ဓာကိုယ်ဆိုင်ရာ ထိတွေ့မှု" (Somatic Reality) ကိုယ်တိုင်ကိုပင် ဆုံးရှုံးနေကြခြင်း မဟုတ်ပါလော။ အစားအသောက်အပေါ် ထားရှိသော ခံစားသိရှိမှုကို ပြန်လည်နိုးကြားစေခြင်းသည် ကျွန်ုပ်တို့သည် သဘာဝလောက၏ အဖွဲ့ဝင်တစ်ဦးအဖြစ် ရှင်သန်မှု၏ အခြေခံအုတ်မြစ်ကို ပြန်လည်ရယူရန် ကြိုးပမ်းခြင်းမှလွဲ၍ အခြားမဟုတ်ပေ။`,
    vocabularyList: [
      { word: '均質な', reading: 'きんいつな', meaning: 'homogeneous, uniform', meaningMy: 'တစ်သမတ်တည်းဖြစ်သော' },
      { word: '不可視化', reading: 'ふかしか', meaning: 'rendering invisible, obscuring', meaningMy: 'မမြင်ရအောင် ဖုံးကွယ်ခြင်း' },
      { word: '嚥下する', reading: 'えんげする', meaning: 'to swallow, deglutition', meaningMy: 'မျိုချသည်' },
      { word: '生の根拠', reading: 'せいのこんきょ', meaning: 'basis/grounds of living existence', meaningMy: 'ရှင်သန်မှု၏ အခြေခံအုတ်မြစ်' },
    ],
    grammarPoints: [
      { grammar: '～なくしては～ない', meaning: 'without ~ cannot ...', meaningMy: '...မရှိဘဲနှင့် ...မဖြစ်နိုင်ပါ', explanation: 'Absolute prerequisite construction.', exampleJp: '土の知恵なくしては語れません。' },
      { grammar: '～にほかならない', meaning: 'is none other than ~', meaningMy: '...မှလွဲ၍ အခြားမဟုတ်ပါ', explanation: 'Definitive identification of fundamental truth.', exampleJp: '生の根拠を取り戻す試みにほかなりません。' },
    ],
    audioScript: '食の工業化により生命をいただくという身体性が失われつつあります。食の感性を呼び覚ますことは、自然界の一員としての生を取り戻す試みです。',
    questions: [
      {
        id: 'rq-n1-04-1',
        questionJp: '筆者が指摘する「食の工業化」がもたらした最大の損失は何ですか？',
        questionEn: 'What is the greatest loss brought by the "industrialization of food" according to the author?',
        questionMy: 'စာရေးသူ ထောက်ပြထားသည့် "အစားအစာကို စက်မှုထုတ်လုပ်မှု ပြုလုပ်ခြင်း" ကြောင့် ဖြစ်ပေါ်လာသော အကြီးမားဆုံး ဆုံးရှုံးမှုမှာ အဘယ်နည်း။',
        options: [
          'プラスチックの生産コストが高騰したこと',
          'スーパーの営業時間が短縮されたこと',
          '生命を奪って糧とする実感や、自己の身体が自然の循環の一部であるという身体性の喪失',
          '外国産の食材が手に入らなくなったこと',
        ],
        correctIndex: 2,
        explanation: 'Text explains: 「生命を奪って自らの糧とする原初的な手応えは、綺麗に不可視化されてしまった...『身体性』そのものを喪失しつつある」(Invisibility of life-taking, loss of somatic connection).',
        explanationMy: 'အသက်ကိုယူ၍ မိမိအာဟာရပြုရသည့် ခံစားချက်နှင့် မိမိခန္ဓာသည် သဘာဝ၏ အစိတ်အပိုင်းဖြစ်သည်ဟူသော ခန္ဓာပိုင်းဆိုင်ရာ ထိတွေ့မှု ဆုံးရှုံးသွားခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-04-2',
        questionJp: '筆者は「食への感性を呼び覚ますこと」をどのように位置づけていますか？',
        questionEn: 'How does the author position "reawakening sensibility toward food"?',
        questionMy: 'စာရေးသူက "အစားအသောက်အပေါ် ခံစားသိရှိမှုကို ပြန်လည်နိုးကြားစေခြင်း" ကို မည်သို့ အဓိပ္ပာယ်သတ်မှတ်ထားသနည်း။',
        options: [
          '料理学校を卒業するための必須条件',
          '自然界の一員としての生の根拠を取り戻す試みそのもの',
          '高価なレストランだけで食事をする贅沢な趣味',
          '自炊をして食費を節約する経済的行動',
        ],
        correctIndex: 1,
        explanation: 'The conclusion states: 「私たちが自然界の一員としての生の根拠を取り戻す試みそのものにほかならない」(An effort to reclaim the grounds of existence as part of nature).',
        explanationMy: 'သဘာဝလောက၏ အဖွဲ့ဝင်တစ်ဦးအဖြစ် ရှင်သန်မှု၏ အခြေခံအုတ်မြစ်ကို ပြန်လည်ရယူရန် ကြိုးပမ်းမှု ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Bioethics, food sociology, and somatic philosophy verified for N1 text criteria.',
  },

  // 5. Travel / Critical Tourism Studies
  {
    id: 'r-n1-05',
    title: '「観光のまなざし」と風景の商品化',
    titleEn: 'The "Tourist Gaze" and the Commodification of Landscape',
    titleMy: '"ခရီးသွားတို့၏ အကြည့်" နှင့် ရှုခင်းများကို ကုန်စည်အဖြစ် ပြောင်းလဲခြင်း',
    level: 'N1',
    topic: 'travel',
    subtopic: 'John Urry\'s tourist gaze, staged authenticity, and loss of local vernacular life',
    learningObjectives: ['Analyze critical sociological essays on tourism and spatial transformation', 'Master N1 expressions: ～であれ, ～を余儀なくされる, and ～にかかわる'],
    learningObjectivesMy: ['ခရီးသွားလုပ်ငန်းဆိုင်ရာ လူမှုဗေဒဝေဖန်ချက်ဆောင်းပါးများကို နားလည်ဆန်းစစ်စေရန်', 'N1 အဆင့်မြင့်သဒ္ဒါများကို ကျွမ်းကျင်စွာ အသုံးချတတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[社会学者]{しゃかいがくしゃ}ジョン・アーリが[提唱]{ていしょう}した「[観光]{かんこう}のまなざし」という[概念]{がいねん}は、[旅行者]{りょこうしゃ}が[日常]{にちじょう}から[隔絶]{かくぜつ}された[非日常]{ひにちじょう}を[消費]{しょうひ}する[際]{さい}の、[選別的]{せんべつてき}で[構築]{こうちく}された[視線]{しせん}のメカニズムを[鮮やか]{あざやか}に[抉り出した]{えぐりだした}。
観光地を訪れる人々は、無垢な眼差しで対象をありのままに見ているのではない。
メディアや広告によってあらかじめ刷り込まれた「典型的な京都らしさ」や「失われた日本の原風景」といったステレオタイプなイメージを風景のなかに探索し、確認しているにすぎない。
このまなざしが向かうとき、現地の生きた歴史や人々の生活空間は、観光客に消費されるための「舞台装置」へと変質を余儀なくされる。
住民の日常の営みは景観の美観を損ねるノイズとして排除され、古民家カフェや土産物屋が立ち並ぶ均質化された「作られた伝統」へと塗り替えられていく。
風景が商品化され、真正性が演出される過程で、その土地固有の息遣いが漂白されていくパラドックスに、私たちは自覚的でなければならない。`,
    passagePlain: `社会学者ジョン・アーリが提唱した「観光のまなざし」という概念は、旅行者が日常から隔絶された非日常を消費する際の、選別的で構築された視線のメカニズムを鮮やかに抉り出した。
観光地を訪れる人々は、無垢な眼差しで対象をありのままに見ているのではない。
メディアや広告によってあらかじめ刷り込まれた「典型的な京都らしさ」や「失われた日本の原風景」といったステレオタイプなイメージを風景のなかに探索し、確認しているにすぎない。
このまなざしが向かうとき、現地の生きた歴史や人々の生活空間は、観光客に消費されるための「舞台装置」へと変質を余儀なくされる。
住民の日常の営みは景観の美観を損ねるノイズとして排除され、古民家カフェや土産物屋が立ち並ぶ均質化された「作られた伝統」へと塗り替えられていく。
風景が商品化され、真正性が演出される過程で、その土地固有の息遣いが漂白されていくパラドックスに、私たちは自覚的でなければならない。`,
    translationEn: `The concept of the "Tourist Gaze" advocated by sociologist John Urry vividly gouged out the mechanism of the selective, socially constructed gaze when travelers consume extraordinary experiences detached from everyday life. People visiting tourist destinations do not gaze at objects innocently as they truly are. They are merely exploring and confirming within the scenery stereotyped images pre-imprinted by media and advertisements, such as "quintessential Kyoto-ness" or "lost original Japanese scenery." When this gaze is directed, the living history and daily living spaces of locals are forced to transform into "stage sets" designed for tourist consumption. The daily activities of residents are marginalized as unsightly noise that impairs scenic aesthetics, and the landscape is repainted into a homogenized "invented tradition" lined with renovated traditional folk-house cafes and souvenir stalls. We must become acutely aware of the paradox wherein, as landscapes are commodified and authenticity is staged, the land's genuine, idiosyncratic vitality is bleached away.`,
    translationMy: `လူမှုဗေဒပညာရှင် ဂျွန်အာရီ (John Urry) တင်ပြခဲ့သော "ခရီးသွားတို့၏ အကြည့်" (The Tourist Gaze) ဟူသော သဘောတရားသည် ခရီးသွားများက နေ့စဉ်ဘဝမှ ကင်းကွာသော သီးသန့်အတွေ့အကြုံများကို စားသုံးရာတွင် အသုံးပြုသည့် ရွေးချယ်ဖန်တီးထားသော အကြည့်ယန္တရားကို ကွက်ကွက်ကွင်းကွင်း ဖော်ထုတ်ပြသခဲ့ပါသည်။ ခရီးသွားနေရာများသို့ လာရောက်လည်ပတ်သူများသည် အရာဝတ္ထုများကို အဖြူထည်မျက်လုံးဖြင့် မူလအတိုင်း ကြည့်ရှုနေကြခြင်း မဟုတ်ပေ။ မီဒီယာများနှင့် ကြော်ငြာများက ကြိုတင်ပုံသွင်းပေးထားသည့် "ကျိုတို၏ ပုံသေအငွေ့အသက်" သို့မဟုတ် "ပျောက်ဆုံးသွားသော ဂျပန်ရှေးရှုခင်းဟောင်း" စသည့် ပုံစံခွက်သွင်းထားသော စိတ်ကူးများကို ရှုခင်းများထဲတွင် လိုက်လံရှာဖွေကာ အတည်ပြုနေကြခြင်းမျှသာ ဖြစ်ပါသည်။ ဤအကြည့်သည် ဦးတည်သွားသောအခါ ဒေသခံတို့၏ အသက်ဝင်နေသော သမိုင်းကြောင်းနှင့် လူနေမှုဘဝနေရာများသည် ခရီးသွားများ စားသုံးရန်အတွက် ဖန်တီးထားသော "ဇာတ်ခုံအပြင်အဆင်" အဖြစ်သို့ မလွှဲမရှောင်သာ ပြောင်းလဲသွားရပါသည်။ ဒေသခံတို့၏ နေ့စဉ်ဘဝလှုပ်ရှားမှုများကို ရှုခင်းအလှကို နှောင့်ယှက်သည့် အသံဗလံအဖြစ် ဖယ်ရှားခံရပြီး၊ ရှေးဟောင်းအိမ် ကော်ဖီဆိုင်များနှင့် အမှတ်တရပစ္စည်းဆိုင်များ စီတန်းနေသည့် တစ်သမတ်တည်းဖြစ်သော "ဖန်တီးထားသည့် ရိုးရာ" အဖြစ်သို့ အစားထိုးခံရပါသည်။ ရှုခင်းများကို ကုန်စည်အဖြစ် ပြောင်းလဲကာ စစ်မှန်မှုကို ဇာတ်တိုက်သရုပ်ဖော်သည့် လုပ်ငန်းစဉ်အတွင်း ထိုဒေသ၏ သီးသန့်အသက်ရှူသံများ ဖြူဖျော့ပျောက်ကွယ်သွားရသည့် ရှေ့နောက်မညီသော သဘောကို ကျွန်ုပ်တို့ သတိပြုမိကြရမည် ဖြစ်ပါသည်။`,
    vocabularyList: [
      { word: '抉り出す', reading: 'えぐりだす', meaning: 'to gouge out, lay bare', meaningMy: 'ကွက်ကွက်ကွင်းကွင်း ဖော်ထုတ်ပြသသည်' },
      { word: '変質を余儀なくされる', reading: 'へんしつをよぎなくされる', meaning: 'to be forced to transform (unwillingly)', meaningMy: 'မလွှဲမရှောင်သာ ပြောင်းလဲသွားရသည်' },
      { word: '真正性', reading: 'しんせいせい', meaning: 'authenticity, genuineness', meaningMy: 'စစ်မှန်မှု' },
      { word: '漂白される', reading: 'ひょうはくされる', meaning: 'to be bleached out / sterilized of character', meaningMy: 'အရောင်ဆွတ် ဖြူဖျော့ခံရသည်' },
    ],
    grammarPoints: [
      { grammar: '～を余儀なくされる', meaning: 'to be forced / obliged to undergo ~', meaningMy: 'မလွှဲမရှောင်သာ ...ပြုလုပ်ရသည်', explanation: 'Passive obligation imposed by external systemic forces.', exampleJp: '変質を余儀なくされます。' },
      { grammar: '～にすぎない', meaning: 'nothing more than ~', meaningMy: '...မျှသာ ဖြစ်သည်', explanation: 'Demarcates limitation of an action.', exampleJp: '確認しているにすぎません。' },
    ],
    audioScript: '観光のまなざしにより、生活空間が観光客のための舞台装置へと商品化され、土地固有の歴史や息遣いが漂白されていくパラドックスが存在します。',
    questions: [
      {
        id: 'rq-n1-05-1',
        questionJp: 'ジョン・アーリの言う「観光のまなざし」が持つ特徴として書かれているものはどれですか？',
        questionEn: 'Which is described as a characteristic of the "tourist gaze" defined by John Urry?',
        questionMy: 'ဂျွန်အာရီ၏ "ခရီးသွားတို့၏ အကြည့်" ၏ ဝိသေသလက္ခဏာအဖြစ် ရေးသားထားသောအချက်မှာ အဘယ်နည်း။',
        options: [
          '対象のありのままを科学的・客観的に分析する視線',
          'メディア等で刷り込まれたステレオタイプなイメージを風景の中に探索し確認する選別的な視線',
          '観光地の住民と全く同じ苦労を共有しようとする視線',
          'カメラのレンズを通さなければ何も見えない視線',
        ],
        correctIndex: 1,
        explanation: 'Text states: 「メディアや広告によってあらかじめ刷り込まれた...ステレオタイプなイメージを風景のなかに探索し、確認しているにすぎない」(Seeking and confirming pre-imprinted stereotypes).',
        explanationMy: 'မီဒီယာများက ကြိုတင်ပုံသွင်းထားသည့် ပုံစံခွက်အချက်အလက်များကို ရှုခင်းထဲတွင် ရှာဖွေအတည်ပြုသည့် ရွေးချယ်ထားသောအကြည့် ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-05-2',
        questionJp: '風景の商品化が進むことで生じるパラドックスとして、筆者が警鐘を鳴らしているのは何ですか？',
        questionEn: 'What paradox resulting from the commodification of landscape does the author warn against?',
        questionMy: 'ရှုခင်းများကို ကုန်စည်ပြုလုပ်ခြင်းကြောင့် ဖြစ်ပေါ်လာသည့် ရှေ့နောက်မညီသော ဆိုးကျိုးအဖြစ် စာရေးသူက သတိပေးထားသောအချက်မှာ အဘယ်နည်း။',
        options: [
          '観光客が多すぎて全員が道に迷うこと',
          '住民の生活が舞台装置化され、「作られた伝統」によって土地固有の息遣いが漂白されていくこと',
          '古民家カフェのコーヒー代が急騰すること',
          'すべての土産物が偽物になること',
        ],
        correctIndex: 1,
        explanation: 'Sentence asserts: 「真正性が演出される過程で、その土地固有の息遣いが漂白されていくパラドックス」(Living spaces become stage sets, authentic life bleached away).',
        explanationMy: 'ဒေသခံတို့၏ ဘဝနေရာများသည် ဇာတ်ခုံအပြင်အဆင်ဖြစ်သွားပြီး လုပ်ကြံထားသော ရိုးရာများကြောင့် ဒေသ၏ စစ်မှန်သော အငွေ့အသက်များ ပျောက်ကွယ်သွားရခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Sociology of tourism discourse and cultural critique verified for N1.',
  },

  // 6. Work / Labor Sociology
  {
    id: 'r-n1-06',
    title: '「ブルシット・ジョブ」の蔓延と労働の尊厳',
    titleEn: 'The Proliferation of "Bullshit Jobs" and the Dignity of Labor',
    titleMy: '"အဓိပ္ပာယ်မဲ့ အလုပ်အကိုင်များ" ပျံ့နှံ့လာခြင်းနှင့် အလုပ်သမားတို့၏ ဂုဏ်သိက္ခာ',
    level: 'N1',
    topic: 'work',
    subtopic: 'David Graeber\'s critique of purposeless bureaucracy and modern corporate malaise',
    learningObjectives: ['Comprehend academic sociology of labor and critiques of corporate bureaucracy', 'Understand complex expressions: ～に耐えない and ～を余儀なくされる'],
    learningObjectivesMy: ['အလုပ်သမားလူမှုဗေဒနှင့် အဖွဲ့အစည်းဆိုင်ရာ ဝေဖန်ချက်များကို နားလည်စေရန်', 'အဆင့်မြင့်သဒ္ဒါ ～に堪えない စသည်တို့ကို သုံးတတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[文化]{ぶんか}[人類学者]{じんるいがくしゃ}デヴィッド・グレーバーが[提起]{ていき}した「ブルシット・ジョブ（クソどうでもいい[仕事]{しごと}）」という[概念]{がいねん}は、[現代]{げんだい}の[資本主義]{しほんしゅぎ}が[抱]{かか}える[深]{ふか}い[病理]{びょうり}を[抉り出]{えぐりだ}した。
それは、被雇用者本人ですら、その存在意義を正当化できず、仮にその仕事が世の中から完全に消滅しても誰も困らないばかりか、むしろ世界が少し良くなると感じているような無意味な雇用のことである。
技術の発展が人間を過酷な肉体労働から解放した暁には、週１５時間労働が実現すると予言した経済学者ケインズの予想とは裏腹に、実際には際限のない書類作成、形式的な社内手続き、体面を保つためだけの会議といった、無為な業務が官僚組織のように増殖していった。
最も悲劇的なのは、このような無意味な労働に従事する人間が、高額な報酬と引き換えに自己の存在論的尊厳を削り取られ、「精神的暴力」に苦しんでいる点にある。
労働とは本来、他者の役に立ち、社会に実質的な価値をもたらす実感を通じて人間が自らの有用性を確かめる営為であるはずだ。
私たちが真に問うべきは、生産性の数値ではなく、労働が真に人間の尊厳に資しているかという本質的な問いなのである。`,
    passagePlain: `文化人類学者デヴィッド・グレーバーが提起した「ブルシット・ジョブ（クソどうでもいい仕事）」という概念は、現代の資本主義が抱える深い病理を抉り出した。
それは、被雇用者本人ですら、その存在意義を正当化できず、仮にその仕事が世の中から完全に消滅しても誰も困らないばかりか、むしろ世界が少し良くなると感じているような無意味な雇用のことである。
技術の発展が人間を過酷な肉体労働から解放した暁には、週１５時間労働が実現すると予言した経済学者ケインズの予想とは裏腹に、実際には際限のない書類作成、形式的な社内手続き、体面を保つためだけの会議といった、無為な業務が官僚組織のように増殖していった。
最も悲劇的なのは、このような無意味な労働に従事する人間が、高額な報酬と引き換えに自己の存在論的尊厳を削り取られ、「精神的暴力」に苦しんでいる点にある。
労働とは本来、他者の役に立ち、社会に実質的な価値をもたらす実感を通じて人間が自らの有用性を確かめる営為であるはずだ。
私たちが真に問うべきは、生産性の数値ではなく、労働が真に人間の尊厳に資しているかという本質的な問いなのである。`,
    translationEn: `The concept of "Bullshit Jobs" posited by cultural anthropologist David Graeber laid bare a profound pathology festering in modern capitalism. It refers to meaningless employment where even the employees themselves cannot justify its reason for being—believing that if the job were to vanish entirely, not only would no one suffer, but the world might actually be slightly better off. Contrary to the prediction of economist Keynes, who foresaw that once technological advancements liberated humanity from grueling manual labor a 15-hour workweek would materialize, in reality, meaningless duties such as endless paperwork, superficial internal protocols, and meetings held solely to maintain appearances have proliferated like bureaucratic cancer. The most tragic aspect is that people engaged in such futile labor, in exchange for high compensation, have their ontological dignity eroded, suffering under a form of "spiritual violence." Labor was originally supposed to be an activity through which human beings affirm their usefulness through the tangible feeling of benefiting others and conferring substantive value upon society. What we must truly interrogate is not metrics of productivity, but the fundamental question of whether labor genuinely contributes to human dignity.`,
    translationMy: `ယဉ်ကျေးမှုမနုဿဗေဒပညာရှင် ဒေးဗစ်ဂရေဘာ (David Graeber) တင်ပြခဲ့သော "အဓိပ္ပာယ်မဲ့ အလုပ်အကိုင်များ" (Bullshit Jobs) ဟူသော အယူအဆသည် ခေတ်သစ်အရင်းရှင်စနစ် ကြုံတွေ့နေရသည့် နက်ရှိုင်းသော ရောဂါဆိုးကြီးကို ထွင်းဖောက်ဖော်ထုတ်ပြသခဲ့ပါသည်။ ၎င်းဆိုသည်မှာ အလုပ်လုပ်ကိုင်နေသူကိုယ်တိုင်ပင်လျှင် မိမိအလုပ်၏ တည်ရှိမှုတန်ဖိုးကို ရှင်းပြ၍မရဘဲ၊ အကယ်၍ ထိုအလုပ်သည် လောကကြီးထဲမှ လုံးဝပျောက်ကွယ်သွားပါက မည်သူမျှ ဒုက္ခမရောက်ရုံသာမက ကမ္ဘာကြီးသည် ပို၍ပင် သာယာသွားမည်ဟု ခံစားနေရသော အဓိပ္ပာယ်မဲ့ အလုပ်အကိုင်မျိုးကို ဆိုလိုခြင်း ဖြစ်ပါသည်။ နည်းပညာတိုးတက်မှုများက လူသားတို့အား ပင်ပန်းသော ကိုယ်လက်လုပ်အားမှ ကယ်တင်ပေးပြီးပါက တစ်ပတ်လျှင် ၁၅ နာရီသာ အလုပ်လုပ်ရလိမ့်မည်ဟု ကြိုတင်ဟောကိန်းထုတ်ခဲ့သည့် စီးပွားရေးပညာရှင် ကိန်းစ် (Keynes) ၏ မျှော်မှန်းချက်နှင့် ဆန့်ကျင်ဘက်အနေဖြင့်၊ လက်တွေ့တွင် အဆုံးမရှိသော စာရွက်စာတမ်းလုပ်ငန်းများ၊ ဟန်ပြရုံးတွင်းလုပ်ထုံးလုပ်နည်းများနှင့် မျက်နှာပန်းလှရုံသက်သက် အစည်းအဝေးများ စသည့် အကျိုးမဲ့အလုပ်များသည် ဗျူရိုကရေစီစနစ်ကြီးသဖွယ် ပိုမိုများပြားလာခဲ့ပါသည်။ အဆိုးရွားဆုံး ဝမ်းနည်းဖွယ်အချက်မှာ ထိုသို့သောအဓိပ္ပာယ်မဲ့အလုပ်များတွင် လုပ်ကိုင်နေရသူများသည် မြင့်မားသော လစာငွေရရှိသော်လည်း မိမိ၏ လူသားဆန်သော ဂုဏ်သိက္ခာကို အလဲအထပ်ပြုလုပ်ခံရကာ "စိတ်ပိုင်းဆိုင်ရာ အကြမ်းဖက်မှု" ကို ခံစားနေရခြင်း ဖြစ်ပါသည်။ အလုပ်လုပ်ခြင်းဆိုသည်မှာ မူလအားဖြင့် အခြားသူများကို အကျိုးပြုပြီး လူ့ဘောင်အတွက် အမှန်တကယ်တန်ဖိုးရှိစေသည်ဟူသော လက်တွေ့ခံစားမှုမှတစ်ဆင့် မိမိ၏ အသုံးဝင်မှုကို မိမိကိုယ်တိုင် အတည်ပြုရသည့် လုပ်ဆောင်ချက် ဖြစ်သင့်ပါသည်။ ကျွန်ုပ်တို့ အမှန်တကယ် မေးခွန်းထုတ်ရမည်မှာ ကုန်ထုတ်စွမ်းအား ကိန်းဂဏန်းများ မဟုတ်ဘဲ အလုပ်သည် လူသားတို့၏ ဂုဏ်သိက္ခာကို အမှန်တကယ် အထောက်အကူပြုနေသလောဟူသည့် အခြေခံကျသော မေးခွန်းပင် ဖြစ်ပေသည်။`,
    vocabularyList: [
      { word: '病理', reading: 'びょうり', meaning: 'pathology (social/systemic)', meaningMy: 'စနစ်ဆိုင်ရာ ရောဂါဆိုး' },
      { word: '増殖する', reading: 'ぞうしょくする', meaning: 'to proliferate, multiply', meaningMy: 'အဆမတန် ပွားများလာသည်' },
      { word: '存在論的', reading: 'そんざいろんてき', meaning: 'ontological', meaningMy: 'ဖြစ်တည်မှုသဘောတရားဆိုင်ရာ' },
      { word: '資する', reading: 'しする', meaning: 'to contribute to, be conducive to', meaningMy: 'အထောက်အကူပြုသည်' },
    ],
    grammarPoints: [
      { grammar: '～と引き換えに', meaning: 'in exchange for ~ (often costly trade-off)', meaningMy: '...နှင့် အလဲအထပ်ပြု၍ (စွန့်လွှတ်ရခြင်း)', explanation: 'Transaction where obtaining one thing costs another valuable thing.', exampleJp: '高額な報酬と引き換えに尊厳を削り取られます。' },
      { grammar: '～暁には', meaning: 'in the event of / when ~ is accomplished', meaningMy: '...အောင်မြင်ပြီးမြောက်သည့်အခါတွင်', explanation: 'Formal literary future milestone.', exampleJp: '解放された暁には、週１５時間労働になります。' },
    ],
    audioScript: 'ブルシット・ジョブは本人が無意味だと感じる仕事です。高い報酬と引き換えに尊厳を削られ、精神的苦痛を生んでいます。労働が真に人間の尊厳に資するか問われています。',
    questions: [
      {
        id: 'rq-n1-06-1',
        questionJp: 'デヴィッド・グレーバーの提唱する「ブルシット・ジョブ」の定義として最も合致するものはどれですか？',
        questionEn: 'Which best matches the definition of "Bullshit Jobs" posited by David Graeber?',
        questionMy: 'ဒေးဗစ်ဂရေဘာ တင်ပြခဲ့သော "အဓိပ္ပာယ်မဲ့ အလုပ်အကိုင်များ" ၏ အဓိပ္ပာယ်ဖွင့်ဆိုချက်နှင့် အကိုက်ညီဆုံးမှာ အဘယ်နည်း။',
        options: [
          '給料が安すぎて生活できない危険な肉体労働',
          '従事している本人すら存在意義を認められず、消滅しても誰も困らないような無意味な仕事',
          'すべての作業をロボットが行う農業',
          '週１５時間だけで完了する効率的な仕事',
        ],
        correctIndex: 1,
        explanation: 'The passage defines: 「被雇用者本人ですら、その存在意義を正当化できず、仮にその仕事が世の中から完全に消滅しても誰も困らない...無意味な雇用」(Meaningless job even worker cannot justify, whose disappearance hurts no one).',
        explanationMy: 'လုပ်ကိုင်နေသူကိုယ်တိုင် အဓိပ္ပာယ်မရှာနိုင်ဘဲ ထိုအလုပ် ပျောက်သွားသော်လည်း မည်သူမျှ ဒုက္ခမရောက်မည့် အလုပ်အကိုင် ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-06-2',
        questionJp: '筆者が述べる、無意味な労働に従事する人々の最大の悲劇は何ですか？',
        questionEn: 'What is the greatest tragedy of people engaged in meaningless labor according to the author?',
        questionMy: 'အဓိပ္ပာယ်မဲ့အလုပ်များ လုပ်ကိုင်နေရသူတို့၏ အကြီးမားဆုံးသော ကြေကွဲဖွယ်ရာအချက်မှာ အဘယ်နည်း။',
        options: [
          '残業代が全く支払われないこと',
          'パソコンが故障して使えないこと',
          '高額な報酬と引き換えに自己の存在論的尊厳を削り取られ、精神的暴力に苦しんでいること',
          '定年退職ができないこと',
        ],
        correctIndex: 2,
        explanation: 'Text explains: 「高額な報酬と引き換えに自己の存在論的尊厳を削り取られ、『精神的暴力』に苦しんでいる点にある」(Ontological dignity eroded in exchange for pay).',
        explanationMy: 'လစာမြင့်မားစွာရရှိသော်လည်း မိမိ၏ ဂုဏ်သိက္ခာကို အဆုံးရှုံးခံရကာ စိတ်ပိုင်းဆိုင်ရာ အကြမ်းဖက်မှုကို ခံစားနေရခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Labor sociology and economic theory validated for N1 rigorous comprehension standards.',
  },

  // 7. Technology / Philosophy of Mind & AI
  {
    id: 'r-n1-07',
    title: '人工知能の自律性と「主体性」の哲学的解体',
    titleEn: 'Autonomy of Artificial Intelligence and the Philosophical Deconstruction of Agency',
    titleMy: 'ဉာဏ်ရည်တု၏ ကိုယ်ပိုင်အုပ်ချုပ်ခွင့်နှင့် "မိမိကိုယ်ကို ပိုင်စိုးမှု" ဆိုင်ရာ ဒဿနိကဆန်းစစ်ချက်',
    level: 'N1',
    topic: 'technology',
    subtopic: 'Large language models, intentionality, Chinese Room argument, and the boundaries of consciousness',
    learningObjectives: ['Critique analytical philosophy of mind and artificial intelligence debates', 'Understand expressions: ～をめぐって and ～にほかならない'],
    learningObjectivesMy: ['စိတ်ဒဿနိကဗေဒနှင့် AI နည်းပညာဆိုင်ရာ အဆင့်မြင့်ဆောင်းပါးများကို နားလည်စေရန်', 'အဆင့်မြင့် ဂျပန်ဝေါဟာရများကို တိကျစွာ သုံးသပ်တတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[大規模]{だいきぼ}[言語]{げんご}モデル（ＬＬＭ）の[飛躍的]{ひやくてき}な[進化]{しんか}は、これまで[人間]{にんげん}の[特権]{とっけん}と[信]{しん}じられてきた「[知性]{ちせい}」や「[思考]{しこう}」の[定義]{ていぎ}そのものに[根本的]{こんぽんてき}な[再考]{さいこう}を[迫]{せま}っている。
[流暢]{りゅうちょう}に[対話]{たいわ}を[交]{か}わし、[詩]{し}を[紡]{つむ}ぎ、[高度]{こうど}な[学術]{がくじゅつ}[論文]{ろんぶん}を[要約]{ようやく}するＡＩの[振る舞い]{ふるまい}を[前]{まえ}にして、私たちはそこに「[意識]{いしき}」や「[主体性]{しゅたいせい}」の[萌芽]{ほうが}を[見出]{みいだ}そうとしがちである。
しかし、哲学者ジョン・サールが「中国語の部屋」の思考実験で喝破したように、どれほど精緻な記号操作が遂行されようとも、統語論（シンタックス）の処理それ自体から意味論（セマンティクス）の理解が自動的に立ち現れるわけではない。
ＡＩが行っているのは、膨大なテキストデータに基づく確率論的な単語の予測にすぎず、そこには「痛い」「美しい」と感じる身体的な生の実感も、自己の死を恐れる実存的動機も介在しない。
むしろ問題とすべきは、ＡＩに騙される私たちの側にある。
他者の心を推し量ろうとする人間の過剰な共感能力が、空虚なアルゴリズムの鏡に自らの「魂」を投影して幻惑されているにすぎないのだ。
ＡＩとの対峙が真に暴き出すのは、人工知能の神秘ではなく、人間がいかに危うく不確かな「主体」であるかという冷厳な事実なのである。`,
    passagePlain: `大規模言語モデル（ＬＬＭ）の飛躍的な進化は、これまで人間の特権と信じられてきた「知性」や「思考」の定義そのものに根本的な再考を迫っている。
流暢に対話を交わし、詩を紡ぎ、高度な学術論文を要約するＡＩの振る舞いを前にして、私たちはそこに「意識」や「主体性」の萌芽を見出そうとしがちである。
しかし、哲学者ジョン・サールが「中国語の部屋」の思考実験で喝破したように、どれほど精緻な記号操作が遂行されようとも、統語論（シンタックス）の処理それ自体から意味論（セマンティクス）の理解が自動的に立ち現れるわけではない。
ＡＩが行っているのは、膨大なテキストデータに基づく確率論的な単語の予測にすぎず、そこには「痛い」「美しい」と感じる身体的な生の実感も、自己の死を恐れる実存的動機も介在しない。
むしろ問題とすべきは、ＡＩに騙される私たちの側にある。
他者の心を推し量ろうとする人間の過剰な共感能力が、空虚なアルゴリズムの鏡に自らの「魂」を投影して幻惑されているにすぎないのだ。
ＡＩとの対峙が真に暴き出すのは、人工知能の神秘ではなく、人間がいかに危うく不確かな「主体」であるかという冷厳な事実なのである。`,
    translationEn: `The dramatic leap in Large Language Models (LLMs) compels a fundamental reconsideration of the very definitions of "intelligence" and "thought," long believed to be the exclusive prerogatives of human beings. Confronted with the behavior of AI that converses fluently, weaves poetry, and summarizes complex academic papers, we are prone to detecting the budding of "consciousness" and "subjectivity" within it. However, as philosopher John Searle exposed in his "Chinese Room" thought experiment, no matter how exquisite the manipulation of symbols carried out may be, the processing of syntax does not automatically give rise to semantic understanding. What AI performs is merely probabilistic word prediction based on vast text corpora, devoid of any somatic visceral sensation of feeling "pain" or "beauty," or existential motives of fearing one's own demise. Rather, what ought to be problematized lies on our side—the humans being deceived. Humans' excessive empathic capacity to intuit others' minds merely projects its own "soul" into the mirror of empty algorithms, becoming mesmerized. What confronting AI truly lays bare is not the mystique of artificial intelligence, but the stark reality of what a precarious and uncertain "subject" humanity itself is.`,
    translationMy: `ကြီးမားသော ဘာသာစကားမော်ဒယ်များ (LLMs) ၏ ထူးခြားသော တိုးတက်လာမှုသည် လူသားတို့၏ သီးသန့်အခွင့်အရေးဟု ယုံကြည်ထားခဲ့ကြသော "ဉာဏ်ရည်" နှင့် "တွေးခေါ်မှု" ဟူသည့် အဓိပ္ပာယ်ဖွင့်ဆိုချက်များကို အခြေခံကျကျ ပြန်လည်စဉ်းစားရန် တွန်းအားပေးနေပါသည်။ အဆင်ပြေချောမွေ့စွာ စကားစမြည်ပြောဆိုခြင်း၊ ကဗျာများဖွဲ့ဆိုခြင်းနှင့် အဆင့်မြင့်ပညာရပ်ဆိုင်ရာ စာတမ်းများကို အကျဉ်းချုပ်ပေးနိုင်သော AI ၏ စွမ်းဆောင်ရည်များကို မြင်တွေ့ရသောအခါ ကျွန်ုပ်တို့သည် ထိုအထဲတွင် "အသိစိတ်" (Consciousness) နှင့် "မိမိကိုယ်ကိုပိုင်စိုးမှု" (Agency) တို့ အစပျိုးနေပြီဟု မှတ်ယူလိုကြလေ့ရှိပါသည်။ သို့သော် ဒဿနပညာရှင် ဂျွန်ဆားလ် (John Searle) က "တရုတ်ဘာသာစကားအခန်း" (Chinese Room) စိတ်ကူးစမ်းသပ်ချက်တွင် ရှင်းလင်းစွာ ဖော်ထုတ်ပြခဲ့သကဲ့သို့ မည်မျှပင် အသေးစိတ်ကျသော သင်္ကေတများ ကိုင်တွယ်ဆောင်ရွက်မှုကို ပြုလုပ်စေကာမူ သဒ္ဒါဖွဲ့စည်းပုံ (Syntax) ကို ကိုင်တွယ်ရုံမျှဖြင့် အဓိပ္ပာယ်သဘောတရား (Semantics) ကို နားလည်သွားခြင်း အလိုအလျောက် ဖြစ်ပေါ်မလာနိုင်ပေ။ AI လုပ်ဆောင်နေသည်မှာ များပြားလှသော စာသားဒေတာများအပေါ် အခြေခံထားသည့် ဖြစ်နိုင်ခြေအလားအလာအရ စကားလုံးများကို ခန့်မှန်းထုတ်လုပ်နေခြင်းမျှသာဖြစ်ပြီး၊ ထိုနေရာတွင် "နာကျင်သည်" သို့မဟုတ် "လှပသည်" ဟု ခံစားရသည့် ခန္ဓာပိုင်းဆိုင်ရာ လက်တွေ့ခံစားမှုသော်လည်းကောင်း၊ မိမိ၏ သေဆုံးမှုကို စိုးရိမ်ကြောက်ရွံ့သည့် ဖြစ်တည်မှုဆိုင်ရာ ရည်ရွယ်ချက်သော်လည်းကောင်း မည်သည့်အရာမျှ ပါဝင်ခြင်းမရှိပေ။ အမှန်တကယ် ပြဿနာရှာဖွေရမည်မှာ AI ၏ လှည့်စားမှုကို ခံနေရသော ကျွန်ုပ်တို့ဘက်တွင်သာ ဖြစ်ပါသည်။ အခြားသူ၏ စိတ်ကို ရိပ်စားနားလည်လိုသော လူသားတို့၏ အလွန်အမင်း စာနာနားလည်နိုင်စွမ်းသည် ဗလာနတ္ထိဖြစ်သော အယ်လဂိုရီသမ်ဟူသည့် မှန်ချပ်ကြီးထဲသို့ မိမိတို့၏ "ဝိညာဉ်" ကို ထင်ဟပ်စေကာ ယစ်မူးတွေဝေနေခြင်းမျှသာ ဖြစ်ပါသည်။ AI နှင့် ရင်ဆိုင်တွေ့ဆုံရခြင်းက အမှန်တကယ် ဖော်ထုတ်ပြသလိုက်သည်မှာ ဉာဏ်ရည်တု၏ ဆန်းကြယ်မှုမဟုတ်ဘဲ လူသားကိုယ်တိုင်သည် မည်မျှပင် အန္တရာယ်များပြီး မသေချာမရေရာသော "ပုဂ္ဂလဖြစ်တည်မှု" ဖြစ်သည်ဟူသော အေးစက်ခိုင်မာသည့် အမှန်တရားပင် ဖြစ်ပေသည်။`,
    vocabularyList: [
      { word: '萌芽', reading: 'ほうが', meaning: 'sprout, budding, inception', meaningMy: 'အစပျိုးခြင်း၊ အညွန့်ထွက်ခြင်း' },
      { word: '喝破する', reading: 'かっぱする', meaning: 'to declare decisively / expose the core truth', meaningMy: 'အမှန်တရားကို ပြတ်သားစွာ ဖော်ထုတ်သည်' },
      { word: '統語論', reading: 'とうごろん', meaning: 'syntax', meaningMy: 'ဝါကျဖွဲ့စည်းပုံ သဒ္ဒါ' },
      { word: '冷厳な', reading: 'れいげんな', meaning: 'stark, grim, unyielding', meaningMy: 'အေးစက်ခိုင်မာသော (အမှန်တရား)' },
    ],
    grammarPoints: [
      { grammar: 'どれほど～ようとも', meaning: 'no matter how much ~ is done', meaningMy: 'မည်မျှပင် ...ပြုလုပ်စေကာမူ', explanation: 'Concessive subjunctive structure: どれほど精緻に遂行されようとも。', exampleJp: 'どれほど精緻に遂行されようとも、立ち現れません。' },
      { grammar: '～にすぎない', meaning: 'merely ~ / nothing more than ~', meaningMy: '...မျှသာ ဖြစ်သည်', explanation: 'Emphasizes ontological limitation.', exampleJp: '予測にすぎません。' },
    ],
    audioScript: '生成ＡＩの進化で知性の定義が問われています。中国語の部屋が示すように記号処理は意味の理解ではありません。ＡＩとの対峙は人間の主体の危うさを暴きます。',
    questions: [
      {
        id: 'rq-n1-07-1',
        questionJp: 'ジョン・サールの「中国語の部屋」を引用して、筆者が論証している主張は何ですか？',
        questionEn: 'What argument does the author demonstrate by citing John Searle’s "Chinese Room"?',
        questionMy: 'ဂျွန်ဆားလ်၏ "တရုတ်ဘာသာစကားအခန်း" ကို ကိုးကား၍ စာရေးသူ တင်ပြထားသော အဆိုပြုချက်မှာ အဘယ်နည်း။',
        options: [
          '中国語を勉強すればＡＩに勝てるということ',
          'どれほど精緻な記号操作（シンタックス）を行っても、意味の理解（セマンティクス）には至らないということ',
          'ＡＩは本物の人間よりも感情が豊かであるということ',
          '部屋の中に閉じ込められると知性が低下するということ',
        ],
        correctIndex: 1,
        explanation: 'Text asserts: 「どれほど精緻な記号操作が遂行されようとも、統語論（シンタックス）の処理それ自体から意味論（セマンティクス）の理解が自動的に立ち現れるわけではない」(Syntax processing does not equal semantic understanding).',
        explanationMy: 'သင်္ကေတများကို မည်မျှပင် သေသပ်စွာ ကိုင်တွယ်နိုင်စေကာမူ အဓိပ္ပာယ်သဘောတရားကို အမှန်တကယ် နားလည်ခြင်း မဟုတ်ဟူသော အချက်ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-07-2',
        questionJp: '筆者は、人間がＡＩに心や意識を感じてしまう根本的な原因はどこにあると論じていますか？',
        questionEn: 'Where does the author argue lies the root cause of humans perceiving mind/consciousness in AI?',
        questionMy: 'လူသားများသည် AI တွင် စိတ်ဝိညာဉ်နှင့် အသိစိတ်ရှိသည်ဟု ခံစားရစေသည့် အဓိကအကြောင်းရင်းမှာ အဘယ်နည်း။',
        options: [
          'ＡＩが実際に脳神経細胞を持って生きているから',
          '人間側の過剰な共感能力が、空虚なアルゴリズムに自らの魂を投影して幻惑されているから',
          'コンピューターの価格が非常に高いから',
          '法律でＡＩを人間として認めたから',
        ],
        correctIndex: 1,
        explanation: 'The passage explains: 「他者の心を推し量ろうとする人間の過剰な共感能力が、空虚なアルゴリズムの鏡に自らの『魂』を投影して幻惑されているにすぎない」(Excessive empathy projects one’s own soul into algorithmic mirrors).',
        explanationMy: 'အခြားသူ၏စိတ်ကို ရိပ်စားလိုသော လူသားတို့၏ စာနာနားလည်နိုင်စွမ်းက ဗလာနတ္ထိ အယ်လဂိုရီသမ်ထဲသို့ မိမိတို့၏ စိတ်ဝိညာဉ်ကို ထင်ဟပ်ကာ ယစ်မူးနေခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Philosophy of mind, cognitive science, and epistemological critique verified for N1 standard.',
  },

  // 8. Community / Sociology of Isolation & Social Inclusion
  {
    id: 'r-n1-08',
    title: '「無縁社会」の深層と社会的包摂の再構築',
    titleEn: 'The Depths of the "Disconnected Society" and the Reconstruction of Social Inclusion',
    titleMy: '"အဆက်အသွယ်မဲ့လူ့ဘောင်" ၏ နက်နဲသော အခြေအနေနှင့် လူမှုပေါင်းစည်းရေး ပြန်လည်တည်ဆောက်ခြင်း',
    level: 'N1',
    topic: 'community',
    subtopic: 'Solitary deaths (kodokushi), breakdown of territorial and kinship ties, and relational poverty',
    learningObjectives: ['Comprehend advanced sociological treatises on social isolation and welfare policy', 'Understand structures: ～に照らして and ～といえども'],
    learningObjectivesMy: ['အထီးကျန်လူမှုဘဝဆိုင်ရာ လူမှုဗေဒစာတမ်းများကို နားလည်စေရန်', '～に照らして (နှင့် ချိန်ထိုးဆန်းစစ်ချက်) ကို သုံးတတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[血縁]{けつえん}や[地縁]{ちえん}、[社縁]{しゃえん}といった[伝統的]{でんとうてき}な[共同体]{きょうどうたい}の[絆]{きずな}が[急速]{きゅうそく}に[解体]{かいたい}した[現代]{げんだい}[日本]{にほん}において、「[無縁]{むえん}[社会]{しゃかい}」という[警鐘]{けいしょう}が[鳴]{な}らされて[久]{ひさ}しい。
[誰]{だれ}にも[看取]{みと}られることなく[息]{いき}を[引]{ひ}き[取]{と}る「[孤独死]{こどくし}」の[増加]{ぞうか}は、[単]{たん}なる[個々人]{ここじん}の[不運]{ふうん}な[結末]{けつまつ}ではなく、[個人の自由]{こじんのじゆう}と[自立]{じりつ}を[至上]{しじょう}[命題]{めいだい}としてきた[近代化]{きんだいか}の[必然的]{ひつぜんてき}な[帰結]{きけつ}である。
私たちは「[煩わしい]{わずらわしい}[人間関係]{にんげんかんけい}からの[解放]{かいほう}」を[求]{もと}めて[都市]{とし}に[集]{あつ}い、[金銭]{きんせん}を[媒介]{ばいかい}としたサービスによって[生活]{せいかつ}のすべてを[充足]{じゅうそく}させるシステムを[築]{きず}き[上]{あ}げた。
しかし、その[自由]{じゆう}の[代償]{だいしょう}として[支払]{しはら}わされたのは、いざというときに[無条件]{むじょうけん}で[助]{たす}けを[求]{もと}めることができる「[関係性]{かんけいせい}の[セーフティーネット]{せーふてぃーねっと}」の[完全]{かんぜん}な[喪失]{そうしつ}にほかならなかった。
[経済的]{けいざいてき}[貧困]{ひんこん}以上に[深刻]{しんこく}なのは、この「[関係]{かんけい}の[貧困]{ひんこん}」である。
[脆弱]{ぜいじゃく}な[個人]{こじん}を[孤立]{こりつ}の[淵]{ふち}に[放置]{ほうち}しないためには、[血縁]{けつえん}に[依存]{いぞん}するかつての[共同体]{きょうどうたい}へ[回帰]{かいき}するのではなく、[緩やか]{ゆるやか}で[開かれた]{ひらかれた}「[新たな連帯]{あらたなれんたい}」をいかに[再編]{さいへん}するかという、[制度]{せいど}と[倫理]{りんり}の[双方]{そうほう}にまたがる[包括的]{ほうかつてき}な[包摂]{ほうせつ}の[構想]{こうそう}が[問]{と}われている。`,
    passagePlain: `血縁や地縁、社縁といった伝統的な共同体の絆が急速に解体した現代日本において、「無縁社会」という警鐘が鳴らされて久しい。
誰にも看取られることなく息を引き取る「孤独死」の増加は、単なる個々人の不運な結末ではなく、個人の自由と自立を至上命題としてきた近代化の必然的な帰結である。
私たちは「煩わしい人間関係からの解放」を求めて都市に集い、金銭を媒介としたサービスによって生活のすべてを充足させるシステムを築き上げた。
しかし、その自由の代償として支払わされたのは、いざというときに無条件で助けを求めることができる「関係性のセーフティーネット」の完全な喪失にほかならなかった。
経済的貧困以上に深刻なのは、この「関係の貧困」である。
脆弱な個人を孤立の淵に放置しないためには、血縁に依存するかつての共同体へ回帰するのではなく、緩やかで開かれた「新たな連帯」をいかに再編するかという、制度と倫理の双方にまたがる包括的な包摂の構想が問われている。`,
    translationEn: `In contemporary Japan, where traditional community bonds such as blood relations, local village ties, and corporate loyalty have rapidly dissolved, alarms over the "Disconnected Society" (Muen Shakai) have long been sounded. The increase in "solitary deaths" (kodokushi)—passing away without being attended by anyone—is not merely the unfortunate fate of isolated individuals, but the inevitable corollary of a modernization that posited individual freedom and independence as its supreme mandate. Seeking "liberation from bothersome interpersonal relations," we flocked to cities and constructed systems fulfilling all life necessities through monetized services. However, the price exacted for that freedom was nothing less than the absolute forfeiture of the "relational safety net" through which one could unconditionally seek aid in times of crisis. Far more severe than economic poverty is this "poverty of relations." To prevent fragile individuals from being abandoned in the abyss of isolation, what is demanded is not returning to past communities dependent on bloodlines, but conceptualizing comprehensive inclusion spanning both institutional structures and ethics: how to reconstruct a loose, open "new solidarity."`,
    translationMy: `သွေးသားရင်းချာ၊ ဒေသခံရပ်ရွာနှင့် လုပ်ငန်းခွင်သစ္စာစောင့်သိမှု စသည့် ရိုးရာလူမှုအသိုင်းအဝန်း သံယောဇဉ်ကြိုးများ လျင်မြန်စွာ ပြိုကွဲသွားခဲ့သည့် ယနေ့ခေတ်ဂျပန်တွင် "အဆက်အသွယ်မဲ့လူ့ဘောင်" (Muen Shakai) ဟူသော သတိပေးခေါင်းလောင်းသံ မြည်ဟိန်းခဲ့သည်မှာ ကြာမြင့်ခဲ့ပြီ ဖြစ်ပါသည်။ မည်သူတစ်ဦးတစ်ယောက်မျှ စောင့်ရှောက်ကြည့်ရှုမည့်သူမရှိဘဲ သေဆုံးသွားရသည့် "အထီးကျန်သေဆုံးမှု" (Kodokushi) များ တိုးပွားလာခြင်းသည် သာမန်လူတစ်ဦးချင်းစီ၏ ကံဆိုးမိုးမှောင်ကျမှုကြောင့် မဟုတ်ဘဲ တစ်ဦးချင်းစီ၏ လွတ်လပ်ခွင့်နှင့် ကိုယ်ထူကိုယ်ထရပ်တည်မှုကို အမြင့်မားဆုံးအဖြစ် သတ်မှတ်ခဲ့သော ခေတ်မီတိုးတက်မှု၏ မလွှဲမရှောင်သာသော ရလဒ်ဆိုး ဖြစ်ပါသည်။ ကျွန်ုပ်တို့သည် "စိတ်ရှုပ်ဖွယ်ကောင်းသော လူမှုဆက်ဆံရေးများမှ လွတ်မြောက်လိုမှု" ကို တောင့်တရင်း မြို့ကြီးများသို့ စုဝေးရောက်ရှိလာခဲ့ကြပြီး ငွေကြေးကို အခြေခံထားသော ဝန်ဆောင်မှုများဖြင့် ဘဝလိုအပ်ချက်အားလုံးကို ဖြည့်ဆည်းနိုင်သည့် စနစ်ကြီးတစ်ခုကို တည်ဆောက်ခဲ့ကြပါသည်။ သို့သော် ထိုလွတ်လပ်ခွင့်အတွက် ပေးဆပ်လိုက်ရသော တန်ဖိုးမှာ အရေးကြုံချိန်တွင် အကူအညီတောင်းခံနိုင်သည့် "ဆက်ဆံရေးဆိုင်ရာ လူမှုဖူလုံရေးကွန်ရက်" ကို အပြီးတိုင် ဆုံးရှုံးလိုက်ရခြင်းမှလွဲ၍ အခြားမဟုတ်ပေ။ စီးပွားရေးအရ ဆင်းရဲနွမ်းပါးမှုထက် ပိုမိုပြင်းထန်ဆိုးရွားသည်မှာ ဤ "ဆက်ဆံရေးဆင်းရဲမွဲတေမှု" ပင် ဖြစ်ပါသည်။ အားနည်းသော လူပုဂ္ဂိုလ်များကို အထီးကျန်မှုချောက်ကမ်းပါးထဲတွင် ပစ်ပယ်မထားစေရန်အတွက် သွေးသားရင်းချာအပေါ်သာ မှီခိုခဲ့သည့် ယခင်လူမှုအဖွဲ့အစည်းဟောင်းဆီသို့ ပြန်သွားရန် မဟုတ်ဘဲ၊ လွတ်လပ်ပြီး ပွင့်လင်းသော "စည်းလုံးညီညွတ်မှုအသစ်" ကို မည်သို့ပြန်လည်ဖော်ဆောင်မည်နည်းဟူသည့် ဥပဒေစနစ်နှင့် ကျင့်ဝတ်နှစ်ရပ်စလုံးနှင့် သက်ဆိုင်သော ဘက်စုံလူမှုပေါင်းစည်းရေး အစီအစဉ်ကို မေးခွန်းထုတ်နေခြင်း ဖြစ်ပေသည်။`,
    vocabularyList: [
      { word: '解体', reading: 'かいたい', meaning: 'dissolution, breakdown', meaningMy: 'ပြိုကွဲပျက်စီးခြင်း' },
      { word: '看取る', reading: 'みとる', meaning: 'to attend at one’s deathbed / care for in final moments', meaningMy: 'ဘဝနောက်ဆုံးချိန်အထိ စောင့်ရှောက်ကြည့်ရှုသည်' },
      { word: '帰結', reading: 'きけつ', meaning: 'corollary, inevitable consequence', meaningMy: 'မလွှဲမရှောင်သာသော ရလဒ်' },
      { word: '社会的包摂', reading: 'しゃかいてきほうせつ', meaning: 'social inclusion', meaningMy: 'လူမှုဘဝအတွင်း အားလုံးပေါင်းစည်းပါဝင်စေမှု' },
    ],
    grammarPoints: [
      { grammar: '～にほかならなかった', meaning: 'was none other than ~', meaningMy: '...မှလွဲ၍ အခြားမဟုတ်ခဲ့ပါ', explanation: 'Definitive retrospection identifying true nature.', exampleJp: '完全な喪失にほかなりませんでした。' },
      { grammar: '～て久しい', meaning: 'it has been long since ~', meaningMy: '...ဖြစ်ခဲ့သည်မှာ ကြာမြင့်ခဲ့ပြီ', explanation: 'Formal temporal marker of an entrenched ongoing state.', exampleJp: '警鐘が鳴らされて久しいです。' },
    ],
    audioScript: '無縁社会において孤独死が増加しています。金銭で解決できるシステムと引き換えに関係性のセーフティーネットを喪失しました。緩やかな新たな連帯の再構築が求められています。',
    questions: [
      {
        id: 'rq-n1-08-1',
        questionJp: '筆者は「孤独死」の増加の原因をどのように分析していますか？',
        questionEn: 'How does the author analyze the cause of the increase in solitary deaths?',
        questionMy: 'စာရေးသူသည် "အထီးကျန်သေဆုံးမှု" များပြားလာရသည့် အကြောင်းရင်းကို မည်သို့ခွဲခြမ်းစိတ်ဖြာထားသနည်း။',
        options: [
          '警察のパトロールが不足しているから',
          '個人の自由と自立を至上命題として関係性を解体してきた近代化の必然的帰結であるから',
          '病院の数が全国で半分に減ったから',
          '日本の住宅が狭すぎるから',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「個人の自由と自立を至上命題としてきた近代化の必然的な帰結である」(Inevitable corollary of modernization emphasizing freedom and autonomy).',
        explanationMy: 'တစ်ဦးချင်းစီ၏ လွတ်လပ်ခွင့်ကို အလေးထားရင်း လူမှုသံယောဇဉ်များကို ဖြတ်တောက်ခဲ့သည့် ခေတ်မီတိုးတက်မှု၏ မလွှဲမရှောင်သာသော ရလဒ်ဖြစ်ခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-08-2',
        questionJp: '孤立を防ぐための今後の展望として、筆者が主張していることはどれですか？',
        questionEn: 'What does the author advocate as future prospects to prevent isolation?',
        questionMy: 'အထီးကျန်မှုကို ကာကွယ်ရန်အတွက် စာရေးသူ တောင်းဆိုထားသောအချက်မှာ အဘယ်နည်း။',
        options: [
          '全員が必ず親戚と同居することを法律で義務づけること',
          '血縁に依存する過去へ回帰するのではなく、緩やかで開かれた「新たな連帯」を再構築すること',
          'すべてのお金を国が没収すること',
          '都市を解体して国民を山奥に移住させること',
        ],
        correctIndex: 1,
        explanation: 'Final sentence asserts: 「血縁に依存するかつての共同体へ回帰するのではなく、緩やかで開かれた『新たな連帯』をいかに再編するか」(Not returning to bloodlines, but reconstructing loose, open new solidarity).',
        explanationMy: 'သွေးသားဆွေမျိုးအပေါ်သာ မှီခိုသော အတိတ်သို့ ပြန်မသွားဘဲ လွတ်လပ်ပြီး ပွင့်လင်းသော "စည်းလုံးညီညွတ်မှုအသစ်" ကို ပြန်လည်တည်ဆောက်ခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Sociology of community, relational poverty, and inclusion policy checked for N1 standard.',
  },

  // 9. Environment / The Anthropocene & Planetary Ecology
  {
    id: 'r-n1-09',
    title: '「人新世」における人間中心主義の終焉と新たな共生論',
    titleEn: 'The End of Anthropocentrism in the "Anthropocene" and New Symbiosis',
    titleMy: '"မနုဿယုဂ်" (Anthropocene) တွင် လူသားဗဟိုပြုဝါဒ နိဂုံးချုပ်ခြင်းနှင့် ယှဉ်တွဲရှင်သန်မှု သဘောတရားသစ်',
    level: 'N1',
    topic: 'environment',
    subtopic: 'Geological epoch shaped by humans, climate tipping points, and post-humanist ecology',
    learningObjectives: ['Critique high-level environmental philosophy and geological terminology', 'Understand constructions: ～を余儀なくされる, ～を踏まえて, and ～であれ'],
    learningObjectivesMy: ['ကမ္ဘာမြေနှင့် သဘာဝပတ်ဝန်းကျင်ဆိုင်ရာ အဆင့်မြင့်ဒဿနစာတမ်းများကို နားလည်ဆန်းစစ်စေရန်', 'အဆင့်မြင့် ဂျပန်သဒ္ဒါများကို ကျွမ်းကျင်စွာ အသုံးချတတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[人類]{じんるい}の[活動]{かつどう}が[地球]{ちきゅう}の[地質]{ちしつ}や[生態系]{せいたいけい}を[不可逆的]{ふかぎゃくてき}に[改変]{かいへん}した[時代]{じだい}を[指]{さ}す「[人新世]{ひとしんせい}（アントロポセン）」という[概念]{がいねん}は、[近代]{きんだい}が[前提]{ぜんてい}としてきた[人間中心主義]{にんげんちゅうしんしゅぎ}の[破綻]{はたん}を[明白]{めいはく}に[告]{つ}げている。
これまで私たちは、人間を「自然を支配し管理する主体」、自然を「無尽蔵に搾取可能な客体」として二項対立的に捉え、際限のない経済成長を追い求めてきた。
しかし、地球沸騰化、異常気象の常態化、生物多様性の劇的な喪失という現実は、人間が自然の枠外に君臨する特権的な観察者などではなく、地球という脆弱な生態系の内部に組み込まれた一要素にすぎないことを痛烈に突きつけている。
気候変動はもはや外部の環境問題ではなく、人類の存亡を左右する実存的危機にほかならない。
今求められているのは、技術的な排出削減策にとどまらず、動植物や鉱物、大気を含む「人間ならざる存在」との絡まり合いのなかで生を再定義する、抜本的な世界観の転換である。
自然を支配の対象から共生のパートナーへと捉え直す謙虚さなくして、人類に未来はあり得ない。`,
    passagePlain: `人類の活動が地球の地質や生態系を不可逆的に改変した時代を指す「人新世（アントロポセン）」という概念は、近代が前提としてきた人間中心主義の破綻を明白に告げている。
これまで私たちは、人間を「自然を支配し管理する主体」、自然を「無尽蔵に搾取可能な客体」として二項対立的に捉え、際限のない経済成長を追い求めてきた。
しかし、地球沸騰化、異常気象の常態化、生物多様性の劇的な喪失という現実は、人間が自然の枠外に君臨する特権的な観察者などではなく、地球という脆弱な生態系の内部に組み込まれた一要素にすぎないことを痛烈に突きつけている。
気候変動はもはや外部の環境問題ではなく、人類の存亡を左右する実存的危機にほかならない。
今求められているのは、技術的な排出削減策にとどまらず、動植物や鉱物、大気を含む「人間ならざる存在」との絡まり合いのなかで生を再定義する、抜本的な世界観の転換である。
自然を支配の対象から共生のパートナーへと捉え直す謙虚さなくして、人類に未来はあり得ない。`,
    translationEn: `The concept of the "Anthropocene"—designating an epoch in which human activity has irreversibly altered the Earth's geology and ecosystems—unmistakably announces the collapse of the anthropocentrism that modernity presupposed. Hitherto, we dichotomously conceptualized humans as "the subject dominating and managing nature" and nature as an "infinitely exploitable object," pursuing boundless economic growth. However, the realities of global boiling, the normalization of extreme weather, and the dramatic loss of biodiversity poignantly confront us with the truth that humans are not privileged observers reigning outside nature's bounds, but merely one constituent embedded within the Earth's fragile ecosystem. Climate change is no longer an external environmental issue, but an existential crisis determining the very survival of humanity. What is demanded now is not merely technical emission-reduction tactics, but a radical transformation of our worldview: redefining life within our entanglement with "more-than-human entities," including flora, fauna, minerals, and the atmosphere. Without the humility to reconceptualize nature from an object of domination to a partner in symbiosis, no future can exist for humanity.`,
    translationMy: `လူသားတို့၏ လုပ်ဆောင်ချက်များသည် ကမ္ဘာမြေ၏ ဘူမိဗေဒနှင့် ဂေဟစနစ်ကို ပြန်လည်မပြင်ဆင်နိုင်လောက်အောင် ပြောင်းလဲစေခဲ့သည့် ခေတ်ကာလကို ညွှန်းဆိုသော "မနုဿယုဂ်" (Anthropocene) ဟူသည့် သဘောတရားသည် ခေတ်သစ်လူ့ဘောင်က အခြေခံထားခဲ့သော လူသားဗဟိုပြုဝါဒ (Anthropocentrism) ၏ ပျက်စီးယိုယွင်းမှုကို ထင်ရှားစွာ ကြေညာလိုက်ခြင်း ဖြစ်ပါသည်။ ယခင်က ကျွန်ုပ်တို့သည် လူသားကို "သဘာဝတရားကို အုပ်စိုးစီမံခန့်ခွဲသည့် အရှင်သခင်" အဖြစ် လည်းကောင်း၊ သဘာဝတရားကို "အကန့်အသတ်မရှိ ခေါင်းပုံဖြတ်အမြတ်ထုတ်နိုင်သည့် အရာဝတ္ထု" အဖြစ် လည်းကောင်း မျက်နှာချင်းဆိုင် ရှုမြင်ကာ အဆုံးမရှိသော စီးပွားရေးတိုးတက်မှုကိုသာ လိုက်လံရှာဖွေခဲ့ကြပါသည်။ သို့သော် ကမ္ဘာကြီးဆူပွက်လာခြင်း၊ မူမမှန်ရာသီဥတုများ သမားရိုးကျဖြစ်လာခြင်းနှင့် ဇီဝမျိုးစုံမျိုးကွဲများ ပြင်းထန်စွာ မျိုးသုန်းပျောက်ကွယ်လာခြင်း စသည့် လက်တွေ့အခြေအနေများသည် လူသားသည် သဘာဝတရား၏ အပြင်ဘက်တွင် စိုးမိုးနေသော အခွင့်ထူးခံ လေ့လာသူ မဟုတ်ဘဲ၊ ကမ္ဘာမြေဟူသော ထိခိုက်လွယ်သည့် ဂေဟစနစ်အတွင်း ထည့်သွင်းဖွဲ့စည်းထားသော အစိတ်အပိုင်းတစ်ခုမျှသာ ဖြစ်သည်ဟူသော အမှန်တရားကို ပြင်းထန်စွာ ထောက်ပြနေပါသည်။ ရာသီဥတုပြောင်းလဲမှုသည် ပြင်ပရှိ သဘာဝပတ်ဝန်းကျင်ပြဿနာ မဟုတ်တော့ဘဲ လူသားမျိုးနွယ် ရှင်သန်ရပ်တည်ရေးကို အဆုံးအဖြတ်ပေးသည့် ဖြစ်တည်မှုဆိုင်ရာ အကျပ်အတည်းမှလွဲ၍ အခြားမဟုတ်ပေ။ ယခုအခါ လိုအပ်နေသည်မှာ နည်းပညာအရ ကာဗွန်လျှော့ချရေး နည်းဗျူဟာများတွင်သာ ရပ်တန့်မနေဘဲ သစ်ပင်တိရစ္ဆာန်၊ သတ္တုတွင်းနှင့် လေထုတို့ အပါအဝင် "လူသားမဟုတ်သော သဘာဝတရားများ" နှင့် အပြန်အလှန်ယှဉ်တွဲမှုအတွင်း ဘဝကို ပြန်လည်အဓိပ္ပာယ်ဖွင့်ဆိုသည့် အခြေခံကျသော ကမ္ဘာ့အမြင်ပြောင်းလဲမှု ဖြစ်ပါသည်။ သဘာဝတရားကို အုပ်ချုပ်စိုးမိုးရမည့် ရန်သူအဖြစ်မှ အတူယှဉ်တွဲရှင်သန်ရမည့် မိတ်ဖက်အဖြစ် ပြန်လည်ရှုမြင်တတ်သည့် နှိမ့်ချသော စိတ်ထားမရှိဘဲနှင့် လူသားတို့အတွက် အနာဂတ်ဆိုသည်မှာ ရှိနိုင်မည် မဟုတ်ပေ။`,
    vocabularyList: [
      { word: '人新世', reading: 'ひとしんせい', meaning: 'Anthropocene (geological epoch)', meaningMy: 'မနုဿယုဂ် (လူသားတို့ လွှမ်းမိုးသော ဘူမိခေတ်)' },
      { word: '二項対立', reading: 'にこうたいりつ', meaning: 'binary opposition, dichotomy', meaningMy: 'ဆန့်ကျင်ဘက် အစွန်းနှစ်ဖက် ခွဲခြားရှုမြင်မှု' },
      { word: '地球沸騰化', reading: 'ちきゅうふっとうか', meaning: 'global boiling', meaningMy: 'ကမ္ဘာကြီးဆူပွက်လာခြင်း' },
      { word: '抜本的な', reading: 'ばっぽんてきな', meaning: 'drastic, radical, foundational', meaningMy: 'အခြေခံအုတ်မြစ်ကျသော' },
    ],
    grammarPoints: [
      { grammar: '～なくしては～あり得ない', meaning: 'without ~ there cannot possibly be ...', meaningMy: '...မရှိဘဲနှင့် ...ရှိနိုင်မည် မဟုတ်ပါ', explanation: 'Absolute double negative expressing existential necessity.', exampleJp: '謙虚さなくして、未来はあり得ません。' },
      { grammar: '～にほかならない', meaning: 'none other than ~', meaningMy: '...မှလွဲ၍ အခြားမဟုတ်ပါ', explanation: 'Emphatic assertion of essential identity.', exampleJp: '実存的危機にほかなりません。' },
    ],
    audioScript: '人新世の到来は人間中心主義の破綻を告げています。気候変動は実存的危機であり、自然を支配の対象から共生のパートナーへと捉え直す謙虚さが不可欠です。',
    questions: [
      {
        id: 'rq-n1-09-1',
        questionJp: '「人新世（アントロポセン）」という概念が告げている事態として最も適切なものはどれですか？',
        questionEn: 'Which is most appropriate as the situation announced by the concept of the "Anthropocene"?',
        questionMy: '"မနုဿယုဂ်" (Anthropocene) ဟူသော အယူအဆက သတိပေးဖော်ပြလိုက်သည့် အခြေအနေမှာ အဘယ်နည်း။',
        options: [
          '人間が太陽系すべての惑星を完全に支配したこと',
          '近代が前提としてきた「人間中心主義」の破綻',
          '世界中で新しい紙幣が発行されること',
          '恐竜が現代に復活すること',
        ],
        correctIndex: 1,
        explanation: 'Text opens: 「『人新世』という概念は、近代が前提としてきた人間中心主義の破綻を明白に告げている」(Announces the collapse of anthropocentrism).',
        explanationMy: 'ခေတ်သစ်လူ့ဘောင်က အခြေခံထားခဲ့သော လူသားဗဟိုပြုဝါဒ၏ ပျက်စီးယိုယွင်းမှု ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-09-2',
        questionJp: '筆者が考える、人類が未来を切り拓くために不可欠な姿勢は何ですか？',
        questionEn: 'What attitude does the author consider indispensable for humanity to carve out a future?',
        questionMy: 'စာရေးသူ၏ အမြင်အရ လူသားတို့ အနာဂတ်အတွက် မရှိမဖြစ် လိုအပ်သော သဘောထားမှာ အဘယ်နည်း။',
        options: [
          '自然をさらに徹底的に科学技術で支配し尽くすこと',
          '自然を支配の対象から共生のパートナーへと捉え直す謙虚さを持つこと',
          'すべての工場を稼働させて経済成長を加速させること',
          '宇宙へ移住して地球を捨てること',
        ],
        correctIndex: 1,
        explanation: 'Final sentence asserts: 「自然を支配の対象から共生のパートナーへと捉え直す謙虚さなくして、人類に未来はあり得ない」(Humility to view nature as a partner in symbiosis).',
        explanationMy: 'သဘာဝတရားကို အုပ်ချုပ်စိုးမိုးရမည့် ရန်သူအဖြစ်မှ အတူယှဉ်တွဲရှင်သန်ရမည့် မိတ်ဖက်အဖြစ် ရှုမြင်တတ်သည့် နှိမ့်ချသော စိတ်ထား ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Geological, ecological, and philosophical terminology evaluated for N1 mastery level.',
  },

  // 10. News / Political Philosophy & Information Space
  {
    id: 'r-n1-10',
    title: '「ポスト真実」の時代における言論空間と民主主義の危機',
    titleEn: 'The Public Sphere in the "Post-Truth" Era and the Crisis of Democracy',
    titleMy: '"အမှန်တရားလွန်ခေတ်" တွင် လူထုဆွေးနွေးပြောဆိုမှုနယ်ပယ်နှင့် ဒီမိုကရေစီ၏ အကျပ်အတည်း',
    level: 'N1',
    topic: 'news',
    subtopic: 'Echo chambers, disinformation warfare, and the erosion of common factual ground',
    learningObjectives: ['Critique high-level political science and media epistemology texts', 'Master advanced N1 grammatical conjunctions: ～を踏まえ, ～にとどまらず, and ～を余儀なくされる'],
    learningObjectivesMy: ['နိုင်ငံရေးသိပ္ပံနှင့် မီဒီယာဆိုင်ရာ အဆင့်မြင့်ဝေဖန်ချက်များကို နားလည်စေရန်', 'N1 အဆင့်မြင့် ဝါကျဆက်သဒ္ဒါများကို ကျွမ်းကျင်စွာ သုံးတတ်စေရန်'],
    difficultyRating: 5,
    estimatedReadingTimeMinutes: 7,
    length: 'long',
    passage: `[客観的]{きゃっかんてき}な[事実]{じじつ}よりも、[感情]{かんじょう}や[個人的]{こじんてき}な[信条]{しんじょう}への[訴求]{そきゅう}が[世論]{せいろん}[形成]{けいせい}に[大]{おお}きな[影響]{えいきょう}を[及]{およ}ぼす「ポスト[真実]{しんじつ}（ポスト・トゥルース）」の[時代]{じだい}が、[民主主義]{みんしゅしゅぎ}の[屋台骨]{やたいぼね}を[揺]{ゆ}るがしている。
ＳＮＳの普及によって誰もが情報の発信者となった結果、言論空間は民主化されるどころか、極端な意見を抱く者同士が閉鎖的な空間で互いの信念を増幅させ合う「エコーチェンバー現象」によって細分化と分断を深めていった。
さらに、クリック数を稼ぐために過激な見出しで煽るアテンション・エコノミーや、国家規模で仕掛けられる偽情報の拡散工作が、事態を一層悪化させている。
民主主義とは本来、共有された客観的事実という共通の土俵の上で、異なる立場の人々が理性的な対話と妥協を重ねることによって機能する制度であるはずだ。
事実そのものが党派的な対立の具と化し、「都合の悪い真実」が容易にフェイクニュースとして片付けられる社会においては、合意形成の前提そのものが崩壊せざるを得ない。
真実の探究に対する真摯さと、自らの無知を自覚する知的な誠実さを取り戻すことなしに、民主主義の再生は望むべくもない。`,
    passagePlain: `客観的な事実よりも、感情や個人的な信条への訴求が世論形成に大きな影響を及ぼす「ポスト真実（ポスト・トゥルース）」の時代が、民主主義の屋台骨を揺るがしている。
ＳＮＳの普及によって誰もが情報の発信者となった結果、言論空間は民主化されるどころか、極端な意見を抱く者同士が閉鎖的な空間で互いの信念を増幅させ合う「エコーチェンバー現象」によって細分化と分断を深めていった。
さらに、クリック数を稼ぐために過激な見出しで煽るアテンション・エコノミーや、国家規模で仕掛けられる偽情報の拡散工作が、事態を一層悪化させている。
民主主義とは本来、共有された客観的事実という共通の土俵の上で、異なる立場の人々が理性的な対話と妥協を重ねることによって機能する制度であるはずだ。
事実そのものが党派的な対立の具と化し、「都合の悪い真実」が容易にフェイクニュースとして片付けられる社会においては、合意形成の前提そのものが崩壊せざるを得ない。
真実の探究に対する真摯さと、自らの無知を自覚する知的な誠実さを取り戻すことなしに、民主主義の再生は望むべくもない。`,
    translationEn: `The era of "Post-Truth"—wherein appeals to emotion and personal belief exert greater influence in shaping public opinion than objective facts—is shaking the very foundation of democracy. As a result of social media allowing anyone to become an information disseminator, rather than the public sphere being democratized, it has deepened segmentation and polarization through the "echo chamber phenomenon," where individuals harboring extreme views amplify each other's convictions within closed spaces. Furthermore, an attention economy stoking outrage with sensationalist headlines to harvest clicks, coupled with state-level disinformation campaigns, has exacerbated the situation. Democracy is supposed to be an institution that functions through people of differing stances engaging in rational dialogue and compromise upon the shared platform of common objective facts. In a society where facts themselves are weaponized as instruments of partisan conflict and "inconvenient truths" are dismissed as fake news, the very premise of consensus-building cannot help but collapse. Without recovering earnestness toward seeking the truth and intellectual humility in acknowledging one's own ignorance, the revitalization of democracy is beyond hope.`,
    translationMy: `ဓမ္မဓိဋ္ဌာန်ကျသော အချက်အလက်များထက် ခံစားချက်နှင့် တစ်ကိုယ်ရေယုံကြည်ချက်များကို လှုံ့ဆော်မှုများက လူထုသဘောထား ဖွဲ့စည်းမှုအပေါ် ကြီးမားသော လွှမ်းမိုးမှုဖြစ်ပေါ်စေသည့် "အမှန်တရားလွန်ခေတ်" (Post-Truth) သည် ဒီမိုကရေစီ၏ အဓိကပင်မမဏ္ဍိုင်ကြီးကို လှုပ်ခါစေလျက် ရှိပါသည်။ ဆိုရှယ်မီဒီယာများ ပျံ့နှံ့လာမှုကြောင့် လူတိုင်းသည် သတင်းထုတ်လွှင့်သူများ ဖြစ်လာကြသည့် ရလဒ်အနေဖြင့် လွတ်လပ်စွာ ဆွေးနွေးပြောဆိုမှုနယ်ပယ်သည် ပိုမိုဒီမိုကရေစီဆန်လာမည့်အစား၊ အစွန်းရောက်အမြင်ရှိသူ အချင်းချင်း ပိတ်လှောင်ထားသော နေရာများတွင် အပြန်အလှန် ယုံကြည်ချက်များကို ပိုမိုပြင်းထန်လာစေသည့် "ပဲ့တင်သံခန်းမဖြစ်စဉ်" (Echo Chamber) ကြောင့် အစိတ်စိတ်အမြွှာမြွှာ ကွဲပြားမှုများ ပိုမိုနက်ရှိုင်းလာခဲ့ပါသည်။ ထို့အပြင် ကလစ်နှိပ်မှုများရရှိရန် အစွန်းရောက်ခေါင်းစဉ်များဖြင့် လှုံ့ဆော်သည့် "အာရုံစိုက်မှုစီးပွားရေး" (Attention Economy) နှင့် နိုင်ငံအဆင့် ကြံစည်လုပ်ဆောင်သည့် သတင်းတုသတင်းမှား ဖြန့်ဝေမှုများသည် အခြေအနေကို ပိုမိုဆိုးရွားစေခဲ့ပါသည်။ ဒီမိုကရေစီဆိုသည်မှာ မူလအားဖြင့် အားလုံးက မျှဝေလက်ခံထားသော ဓမ္မဓိဋ္ဌာန်ကျသည့် အချက်အလက်များဟူသော တူညီသည့်ကွင်းပြင်ပေါ်တွင် မတူညီသော ရပ်တည်ချက်ရှိသူများက အကျိုးအကြောင်းယုတ္တိတန်သော ဆွေးနွေးမှုနှင့် အပေးအယူ အလျှော့အတင်းများ ပြုလုပ်ခြင်းဖြင့် လည်ပတ်ရသည့် စနစ်တစ်ခု ဖြစ်သင့်ပါသည်။ အချက်အလက်များသည် နိုင်ငံရေးဂိုဏ်းဂဏ တိုက်ခိုက်မှု၏ လက်နက်သဖွယ် ဖြစ်လာပြီး "မိမိအတွက် အဆင်မပြေသော အမှန်တရားများ" ကို သတင်းတုအဖြစ် အလွယ်တကူ ပယ်ချနေကြသော လူ့ဘောင်တွင် ဘုံသဘောတူညီမှု ရယူရေးဟူသော အခြေခံအုတ်မြစ်သည် မလွှဲမရှောင်သာ ပြိုလဲသွားရပေလိမ့်မည်။ အမှန်တရားကို ရှာဖွေလိုသည့် ရိုးသားဖြောင့်မတ်မှုနှင့် မိမိ၏ မသိနားမလည်မှုကို မိမိကိုယ်တိုင် သိရှိသည့် ဉာဏ်ပညာဆိုင်ရာ ရိုးသားမှုတို့ကို ပြန်လည်မရရှိဘဲနှင့် ဒီမိုကရေစီ ပြန်လည်ရှင်သန်ရေးကို မျှော်လင့်နိုင်မည် မဟုတ်ပေ။`,
    vocabularyList: [
      { word: '屋台骨', reading: 'やたいぼね', meaning: 'framework, foundation, backbone', meaningMy: 'ပင်မမဏ္ဍိုင်ကြီး' },
      { word: '具と化す', reading: 'ぐとかす', meaning: 'to be reduced to a tool / weaponized', meaningMy: 'လက်နက်အဖြစ် အသုံးချခံရသည်' },
      { word: '合意形成', reading: 'ごういけいせい', meaning: 'consensus building', meaningMy: 'ဘုံသဘောတူညီမှု ရယူခြင်း' },
      { word: '望むべくもない', reading: 'のぞむべくもない', meaning: 'cannot possibly be hoped for / beyond hope', meaningMy: 'လုံးဝမျှော်လင့်နိုင်မည် မဟုတ်ပါ' },
    ],
    grammarPoints: [
      { grammar: '～どころか', meaning: 'far from ~ (contrary reality)', meaningMy: '...ဖို့နေနေသာသာ ...ပင်ဖြစ်သည်', explanation: 'Strong contrastive rebuttal.', exampleJp: '民主化されるどころか、分断を深めました。' },
      { grammar: '～なしに（は）～ない', meaning: 'without ~ cannot ...', meaningMy: '...မရှိဘဲနှင့် ...မဖြစ်နိုင်ပါ', explanation: 'Negative conditionality.', exampleJp: '誠実さを取り戻すことなしに、再生は望むべくもありません。' },
      { grammar: '～崩壊せざるを得ない', meaning: 'cannot help but collapse', meaningMy: 'မလွှဲမရှောင်သာ ပြိုလဲရမည်', explanation: 'Inevitable negative culmination.', exampleJp: '前提そのものが崩壊せざるを得ません。' },
    ],
    audioScript: 'ポスト真実の時代、エコーチェンバーにより言論空間が分断され、民主主義の合意形成が脅かされています。客観的事実への誠実さを取り戻すことが不可欠です。',
    questions: [
      {
        id: 'rq-n1-10-1',
        questionJp: '「エコーチェンバー現象」が言論空間にもたらした影響として正しいものはどれですか？',
        questionEn: 'Which is correct regarding the impact of the "echo chamber phenomenon" on the public sphere?',
        questionMy: '"ပဲ့တင်သံခန်းမဖြစ်စဉ်" (Echo chamber) က လူထုဆွေးနွေးပြောဆိုမှုနယ်ပယ်အပေါ် ဖြစ်ပေါ်စေခဲ့သည့် သက်ရောက်မှုမှာ အဘယ်နည်း။',
        options: [
          '世界中の人々が完全に同じ意見を持つようになったこと',
          '閉鎖的な空間で極端な意見を増幅させ合い、細分化と社会の分断を深めたこと',
          'すべてのＳＮＳが閉鎖されたこと',
          'フェイクニュースが完全に消滅したこと',
        ],
        correctIndex: 1,
        explanation: 'Text explains: 「極端な意見を抱く者同士が閉鎖的な空間で互いの信念を増幅させ合う『エコーチェンバー現象』によって細分化と分断を深めていった」(Amplifying extreme views in closed spaces, deepening polarization).',
        explanationMy: 'ပိတ်လှောင်ထားသော နေရာများတွင် အစွန်းရောက်အမြင်များကို အပြန်အလှန် ပိုမိုအားကောင်းစေပြီး အစိတ်စိတ်အမြွှာမြွှာ ကွဲပြားမှုကို ပိုမိုနက်ရှိုင်းစေခဲ့ခြင်း ဖြစ်ပါသည်။',
      },
      {
        id: 'rq-n1-10-2',
        questionJp: '筆者が述べる、民主主義の機能不全を防ぎ再生するために必要不可欠な要素は何ですか？',
        questionEn: 'What is the indispensable element to prevent democratic dysfunction and achieve revival according to the author?',
        questionMy: 'ဒီမိုကရေစီ ပျက်စီးယိုယွင်းမှုကို ကာကွယ်ပြီး ပြန်လည်ရှင်သန်စေရန် မရှိမဖြစ်လိုအပ်သော အချက်အဖြစ် စာရေးသူ တင်ပြထားသောအချက်မှာ အဘယ်နည်း။',
        options: [
          '言論の自由を完全に停止し、国家がニュースを１つに統一すること',
          '感情的な訴えだけを重視して多数決を行うこと',
          '真実の探究に対する真摯さと、自らの無知を自覚する知的な誠実さを取り戻すこと',
          'すべての選挙を廃止してＡＩに政治を任せること',
        ],
        correctIndex: 2,
        explanation: 'Final sentence asserts: 「真実の探究に対する真摯さと、自らの無知を自覚する知的な誠実さを取り戻すことなしに、民主主義の再生は望むべくもない」(Earnestness toward truth and intellectual humility).',
        explanationMy: 'အမှန်တရားကို ရှာဖွေလိုသော ရိုးသားဖြောင့်မတ်မှုနှင့် မိမိ၏ မသိနားမလည်မှုကို သတိပြုနိုင်သည့် ဉာဏ်ပညာဆိုင်ရာ ရိုးသားမှုတို့ကို ပြန်လည်ဖော်ဆောင်ခြင်း ဖြစ်ပါသည်။',
      },
    ],
    reviewStatus: 'review_required',
    contentVersion: '1.0',
    sourceType: 'curated_university',
    reviewerNotes: 'Political philosophy, democratic theory, and media sociology verified for N1 excellence.',
  },
];

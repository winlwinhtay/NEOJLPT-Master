// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) KEIGO DATABASE
// Comprehensive Reference, Actor Rule Guides & Confusion Exercises
// ============================================================================

import { BusinessKeigoVerb, KeigoConfusionExercise } from '../../types/business';

export const BUSINESS_KEIGO_VERBS: BusinessKeigoVerb[] = [
  {
    id: 'k-iku-kuru',
    plain: '行く・来る',
    reading: 'いく・くる',
    meaning: 'to go / to come',
    teineigo: '行きます・来ます',
    sonkeigo: ['いらっしゃる', 'おいでになる', 'お越しになる', 'いら行かれる（一般的）'],
    kenjougo: ['参る（まいる）', '伺う（うかがう・相手の場所へ行く場合）'],
    bikaigo: 'お出かけ',
    actorRule: '相手（お客様・上司）の動作なら「いらっしゃる・お越しになる」。自分・自社の動作なら「参る・伺う」。',
    commonMistakes: [
      {
        incorrect: '明日、社長のオフィスにいらっしゃいます。',
        correct: '明日、社長のオフィスに伺います。',
        reason: '自分が相手のところへ行く動作なので、謙譲語の「伺う」または「参る」を使います。「いらっしゃる」は相手の動作を敬う言葉です。',
      },
      {
        incorrect: 'お客様が参りました。',
        correct: 'お客様がお見えになりました / いらっしゃいました。',
        reason: '「参る」は自分の動作をへりくだる謙譲語です。大切なお客様の来訪には尊敬語を使わなければ失礼になります。',
      },
    ],
    exampleSituations: [
      {
        context: '外部のお客様の来訪を同僚に伝える',
        speaker: '受付・社員',
        japanese: 'A社の田中様がお見えになりました。',
        translation: 'Mr. Tanaka from Company A has arrived.',
      },
      {
        context: '取引先のオフィスを訪問する約束をする',
        speaker: '自分（営業担当）',
        japanese: '明日14時に貴社へ伺ってもよろしいでしょうか。',
        translation: 'May I visit your office tomorrow at 2:00 PM?',
      },
    ],
  },
  {
    id: 'k-iru',
    plain: 'いる',
    reading: 'いる',
    meaning: 'to be / to exist (animate)',
    teineigo: 'います',
    sonkeigo: ['いらっしゃる', 'おいでになる'],
    kenjougo: ['おる'],
    actorRule: '上司や取引先が存在する場合は「いらっしゃる」。自分や自社の人間なら「おります」。',
    commonMistakes: [
      {
        incorrect: '（取引先に）山田部長はいらっしゃいますか？はい、山田部長はいらっしゃいます。',
        correct: 'はい、山田はお席におります。',
        reason: '社外の人に対して話す際、自社の人間（部長であっても）は身内（ウチ）なので、謙譲表現の「おります」を使います。',
      },
    ],
    exampleSituations: [
      {
        context: '取引先からの電話で自社の上司について答える',
        speaker: '自分',
        japanese: '課長の佐藤は、ただいま席を外しております。',
        translation: 'Section Chief Sato is away from his desk at the moment.',
      },
      {
        context: '取引先の担当者の在席を確認する',
        speaker: '自分',
        japanese: '山田様はいらっしゃいますでしょうか。',
        translation: 'Is Mr. Yamada in, please?',
      },
    ],
  },
  {
    id: 'k-miru',
    plain: '見る',
    reading: 'みる',
    meaning: 'to see / to look / to check',
    teineigo: '見ます',
    sonkeigo: ['ご覧になる（ごらんになる）'],
    kenjougo: ['拝見する（はいけんする）'],
    actorRule: 'お客様や上司が見るなら「ご覧になる」。自分が資料やメールを見るなら「拝見する」。',
    commonMistakes: [
      {
        incorrect: '先生、先ほど提出したレポートを拝見しましたか？',
        correct: '先生、先ほど提出したレポートをご覧になりましたか？',
        reason: '「拝見する」は謙譲語のため、先生（目上）の動作には使えません。尊敬語の「ご覧になる」が正しいです。',
      },
      {
        incorrect: '送っていただいた企画書、ご覧になりました。',
        correct: '送っていただいた企画書、拝見いたしました。',
        reason: '自分が資料を見る動作には、謙譲語の「拝見する」を用います。',
      },
    ],
    exampleSituations: [
      {
        context: '会議で資料の確認を促す',
        speaker: 'プレゼン担当',
        japanese: 'お手元の資料3ページをご覧ください。',
        translation: 'Please look at page 3 of the handout in your hands.',
      },
      {
        context: '取引先から送られた提案書を確認したと伝える',
        speaker: '自分',
        japanese: '先ほどメールでお送りいただいた見積書、拝見いたしました。',
        translation: 'I have reviewed the price estimate you sent via email earlier.',
      },
    ],
  },
  {
    id: 'k-iu',
    plain: '言う',
    reading: 'いう',
    meaning: 'to say / to tell',
    teineigo: '言います',
    sonkeigo: ['おっしゃる'],
    kenjougo: ['申す（もうす）', '申し上げる（もうしあげる）'],
    actorRule: '相手が言うなら「おっしゃる」。自分が名乗ったり話したりするなら「申す・申し上げる」。',
    commonMistakes: [
      {
        incorrect: '部長が申されたとおりです。',
        correct: '部長がおっしゃったとおりです。',
        reason: '「申される」は謙譲語の「申す」に受身・尊敬の「れる」を混ぜた誤用です。尊敬語は「おっしゃる」です。',
      },
      {
        incorrect: '部長がおっしゃられました。',
        correct: '部長がおっしゃいました。',
        reason: '「おっしゃる」自体が尊敬語なので「られる」をつけると不自然な二重敬語（おっしゃられる）になります。',
      },
    ],
    exampleSituations: [
      {
        context: '取引先に自分の社名と氏名を伝える',
        speaker: '自分',
        japanese: '私、株式会社山田商事の開発部に所属しております田中と申します。',
        translation: 'I am Tanaka from the R&D department of Yamada Trading Co.',
      },
      {
        context: '相手の発言を確認する',
        speaker: '自分',
        japanese: '今おっしゃった内容を復唱させていただきます。',
        translation: 'Allow me to repeat back what you have just said.',
      },
    ],
  },
  {
    id: 'k-taberu-nomu',
    plain: '食べる・飲む',
    reading: 'たべる・のむ',
    meaning: 'to eat / to drink',
    teineigo: '食べます・飲みます',
    sonkeigo: ['召し上がる（めしあがる）'],
    kenjougo: ['いただく', '頂戴する（ちょうだいする）'],
    actorRule: 'お客様や上司が飲食するなら「召し上がる」。自分が食べるなら「いただく」。',
    commonMistakes: [
      {
        incorrect: 'どうぞ、こちらのお菓子をいただいてください。',
        correct: 'どうぞ、こちらのお菓子をお召し上がりください。',
        reason: '「いただく」は謙譲語です。相手に飲食を勧める時は尊敬語の「お召し上がりください」を使います。',
      },
    ],
    exampleSituations: [
      {
        context: '会食でお客様に料理を勧める',
        speaker: 'ホスト側社員',
        japanese: 'どうぞ温かいうちにお召し上がりください。',
        translation: 'Please enjoy the food while it is still warm.',
      },
    ],
  },
  {
    id: 'k-suru',
    plain: 'する',
    reading: 'する',
    meaning: 'to do',
    teineigo: 'します',
    sonkeigo: ['なさる', 'される', 'お〜になる（お電話になる等）'],
    kenjougo: ['いたす', 'させていただく'],
    actorRule: '相手の行動は「なさる / される」。自分の行動は「いたす / させていただきます」。',
    commonMistakes: [
      {
        incorrect: '了解しました。',
        correct: '承知いたしました / かしこまりました。',
        reason: '「了解」は同僚や部下に「分かった、許可する」というニュアンスを含みます。目上・お客様には「承知いたしました」を使います。',
      },
    ],
    exampleSituations: [
      {
        context: '上司からの指示を承諾する',
        speaker: '自分',
        japanese: 'かしこまりました。至急対応いたします。',
        translation: 'Understood. I will handle it immediately.',
      },
      {
        context: '取引先の予定を尋ねる',
        speaker: '自分',
        japanese: '本日の打ち合わせはどのようになさいますか。',
        translation: 'How would you like to proceed with today\'s meeting?',
      },
    ],
  },
  {
    id: 'k-shiru',
    plain: '知る',
    reading: 'しる',
    meaning: 'to know',
    teineigo: '知っています / 知りません',
    sonkeigo: ['ご存じ（ごぞんじ）である', 'ご存じです'],
    kenjougo: ['存じる（ぞんじる）', '存じ上げる（ぞんじあげる）', '存じ上げておりません（知りません）'],
    actorRule: '相手が知っているか尋ねるなら「ご存じですか」。自分が知っているなら「存じております」、知らないなら「存じ上げません」。',
    commonMistakes: [
      {
        incorrect: 'その件は知っていらっしゃいますか。',
        correct: 'その件はご存じでしょうか。',
        reason: '「知っていらっしゃいますか」よりも、簡潔で洗練された「ご存じでしょうか」がビジネスでは標準です。',
      },
      {
        incorrect: 'そのお客様の連絡先は知りません。',
        correct: '恐れ入りますが、そのお客様の連絡先は存じ上げておりません。',
        reason: 'ビジネスの電話等で「知りません」と答えるのは非常にぶっきらぼうで不作法です。「存じ上げておりません」と答えます。',
      },
    ],
    exampleSituations: [
      {
        context: '業界のニュースを相手が知っているか尋ねる',
        speaker: '自分',
        japanese: '先日の法改正について、すでにご存じでしょうか。',
        translation: 'Are you already aware of the recent legal revisions?',
      },
    ],
  },
  {
    id: 'k-au',
    plain: '会う',
    reading: 'あう',
    meaning: 'to meet',
    teineigo: '会います',
    sonkeigo: ['お会いになる'],
    kenjougo: ['お目にかかる（おめにかかる）', 'お会いする'],
    actorRule: '自分が相手に会う時は「お目にかかる」。相手が誰かに会うなら「お会いになる」。',
    commonMistakes: [
      {
        incorrect: '昨日、社長がお目にかかりました。',
        correct: '昨日、社長がお会いになりました。',
        reason: '「お目にかかる」は謙譲語のため、目上の人の動作には使えません。',
      },
    ],
    exampleSituations: [
      {
        context: '初めて取引先と直接対面したとき',
        speaker: '自分',
        japanese: '本日、初めてお目にかかれて大変光栄に存じます。',
        translation: 'It is a great honor to meet you in person today for the first time.',
      },
    ],
  },
  {
    id: 'k-kiku',
    plain: '聞く・尋ねる',
    reading: 'きく・たずねる',
    meaning: 'to hear / to ask',
    teineigo: '聞きます',
    sonkeigo: ['お聞きになる', 'お尋ねになる'],
    kenjougo: ['伺う（うかがう）', '拝聴する（はいちょうする）'],
    actorRule: '自分が相手に質問したり聞くなら「伺う・拝聴する」。相手が聞くなら「お聞きになる」。',
    commonMistakes: [
      {
        incorrect: 'ちょっと聞いていいですか。',
        correct: '恐れ入りますが、1点お伺いしてもよろしいでしょうか。',
        reason: 'ビジネスシーンではクッション言葉を添え、謙譲表現の「伺う」を用います。',
      },
    ],
    exampleSituations: [
      {
        context: '先輩や上司に質問があるとき',
        speaker: '自分',
        japanese: '課長、今少々お時間よろしいでしょうか。先ほどの会議の件で1点伺いたいことがございます。',
        translation: 'Section Chief, do you have a brief moment now? There is one point I would like to ask regarding the earlier meeting.',
      },
    ],
  },
  {
    id: 'k-morau',
    plain: 'もらう・くれる',
    reading: 'もらう・くれる',
    meaning: 'to receive / to give to me',
    teineigo: 'もらいます・くれます',
    sonkeigo: ['くださる（お〜くださる）'],
    kenjougo: ['いただく（お〜いただく）', '頂戴する（ちょうだいする）'],
    actorRule: '相手が自分にしてくれるなら「〜してくださる」。自分が相手に〜してもらうなら「〜していただく」。',
    commonMistakes: [
      {
        incorrect: '部長が連絡をもらいました。',
        correct: '部長がご連絡をくださいました / 部長からご連絡をいただきました。',
        reason: '目上からの行為には「くださる」または「いただく」を用います。',
      },
    ],
    exampleSituations: [
      {
        context: '取引先が資料を送ってくれたとき',
        speaker: '自分',
        japanese: '早急に資料をご送付いただき、誠にありがとうございます。',
        translation: 'Thank you very much for promptly sending the materials.',
      },
    ],
  },
];

export const CUSHION_PHRASES = [
  {
    phrase: '恐れ入りますが',
    reading: 'おそれいりますが',
    meaning: 'Excuse me / I am terribly sorry to trouble you, but...',
    situation: 'General polite requests, asking questions, or asking for small favors.',
    example: '恐れ入りますが、こちらにお名前をご記入いただけますでしょうか。',
  },
  {
    phrase: 'お忙しいところ恐縮ですが',
    reading: 'おいそがしいところきょうしゅくですが',
    meaning: 'I know you are very busy, but...',
    situation: 'Reaching out to superiors, busy colleagues, or clients.',
    example: 'お忙しいところ恐縮ですが、添付の書類をご確認いただけますと幸いです。',
  },
  {
    phrase: 'お手数をおかけいたしますが',
    reading: 'おてすうをおかけいたしますが',
    meaning: 'I apologize for causing you extra trouble, but...',
    situation: 'Asking someone to do work or take action on your behalf.',
    example: 'お手数をおかけいたしますが、修正データを再送していただけますでしょうか。',
  },
  {
    phrase: '差し支えなければ',
    reading: 'さしつかえなければ',
    meaning: 'If you do not mind / If it is not inconvenient...',
    situation: 'Asking for contact info, preferences, or private details gently.',
    example: '差し支えなければ、貴社の導入予算についてお聞かせいただけますでしょうか。',
  },
  {
    phrase: 'ご教示いただけますと幸いです',
    reading: 'ごきょうじいただけますとさいわいです',
    meaning: 'I would be grateful if you could guide / instruct me on this.',
    situation: 'Seeking advice or technical instructions in emails.',
    example: '今後の進め方について、ご教示いただけますと幸いです。',
  },
  {
    phrase: 'あいにくではございますが',
    reading: 'あいにくではございますが',
    meaning: 'Unfortunately / Regrettably...',
    situation: 'Declining an invitation or stating unavailability.',
    example: 'あいにくではございますが、その日は終日出張の予定が入っておりまして。',
  },
];

export const KEIGO_CONFUSION_EXERCISES: KeigoConfusionExercise[] = [
  {
    id: 'kc-1',
    prompt: '取引先（お客様）に対して、自社の上司（田中部長）が社外へ出かけていることを電話で伝えるとき、どの表現が最も適切ですか？',
    situation: '電話対応・社外の取引先との会話',
    speaker: '自分（社員）',
    targetPerson: '自社の田中部長（身内・ウチ）',
    options: [
      {
        text: '田中部長は、ただいま外出していらっしゃいます。',
        type: 'incorrect_keigo',
        explanation: '社外の人に対して自分の上司を「部長」と肩書きで呼んだり、「いらっしゃる」（尊敬語）を使うのは失礼です。',
      },
      {
        text: '田中のほうは、ただいま外へ遊びに行きました。',
        type: 'plain',
        explanation: 'ビジネスシーンとして完全に不適切です。',
      },
      {
        text: '田中のほう、外出しております。',
        type: 'teineigo',
        explanation: '「田中のほう」は不自然な言葉遣い（バイト敬語）です。',
      },
      {
        text: '部長の田中は、あいにく外出中でございます。',
        type: 'kenjougo',
        explanation: '自社の上司を「部長の田中」と呼び捨てにし、丁寧・謙譲表現の「外出中でございます」を用いるのが正統なビジネス表現です。',
      },
    ],
    correctIndex: 3,
  },
  {
    id: 'kc-2',
    prompt: '上司から「明日の午前中までにこの資料をまとめておいてくれるか？」と頼まれた際、承諾の返事として最も適切なものはどれですか？',
    situation: '社内・上司からの業務依頼',
    speaker: '自分（部下）',
    targetPerson: '上司',
    options: [
      {
        text: '了解しました！すぐやります。',
        type: 'incorrect_keigo',
        explanation: '「了解」は同僚や目下に対して使う言葉であり、上司に使うのはマナー違反です。',
      },
      {
        text: 'かしこまりました。明日の午前中までに作成いたします。',
        type: 'kenjougo',
        explanation: '「かしこまりました」または「承知いたしました」が目上に対する正しい承諾の言葉です。',
      },
      {
        text: 'ご苦労様です。',
        type: 'incorrect_keigo',
        explanation: '「ご苦労様です」は目上の者が目下をねぎらう言葉です。目上に使ってはいけません（「お疲れ様です」が適切）。',
      },
      {
        text: 'はい、了解でございます。',
        type: 'incorrect_keigo',
        explanation: '了解に「でございます」を付けても、根本的に目上向きの言葉にはなりません。',
      },
    ],
    correctIndex: 1,
  },
  {
    id: 'kc-3',
    prompt: 'お客様が自社のオフィスに到着した際、受付から会議室に案内するときにかける言葉として適切なものはどれですか？',
    situation: '来客対応・オフィスの案内',
    speaker: '受付・社員',
    targetPerson: '来客（大切なお客様）',
    options: [
      {
        text: '会議室に参ってください。',
        type: 'incorrect_keigo',
        explanation: '「参る」は謙譲語なので、お客様に対して「参ってください」と言うのは誤用です。',
      },
      {
        text: 'こちらの第1会議室へどうぞお入りになってください。',
        type: 'incorrect_keigo',
        explanation: '「お〜になってください」は文法的に不自然で二重敬語気味です。',
      },
      {
        text: 'こちらの第1会議室へご案内いたします。どうぞお掛けになってお待ちください。',
        type: 'sonkeigo',
        explanation: '自分の案内には謙譲「ご案内いたします」、お客様の着席には尊敬「お掛けになってお待ちください」を使い分けた完璧な表現です。',
      },
      {
        text: '会議室で待っていていただけますか。',
        type: 'teineigo',
        explanation: '敬意が足りず、お客様に対してやや乱暴な印象を与えます。',
      },
    ],
    correctIndex: 2,
  },
  {
    id: 'kc-4',
    prompt: '取引先から送られてきた企画提案書の内容を「読んだ / 確認した」と報告する際、最も正しい表現はどれですか？',
    situation: '取引先とのメール・会話',
    speaker: '自分',
    targetPerson: '取引先',
    options: [
      {
        text: '送っていただいた提案書、ご覧になりました。',
        type: 'incorrect_keigo',
        explanation: '「ご覧になる」は尊敬語です。自分が資料を読む行為に尊敬語を使って自分を高めてしまっています。',
      },
      {
        text: '送っていただいた提案書、拝見いたしました。大変勉強になりました。',
        type: 'kenjougo',
        explanation: '「拝見する（拝見いたします）」は「見る」の謙譲語であり、相手の資料を敬って読む際に最も適しています。',
      },
      {
        text: '提案書、見させていただきました。',
        type: 'teineigo',
        explanation: '文法的に通じますが、ビジネスのプロフェッショナルとしては「拝見いたしました」が求められます。',
      },
      {
        text: '提案書を拝見されましたか？',
        type: 'incorrect_keigo',
        explanation: '「拝見される」は謙譲語と受身・尊敬の混同で、代表的な敬語の誤用です。',
      },
    ],
    correctIndex: 1,
  },
];

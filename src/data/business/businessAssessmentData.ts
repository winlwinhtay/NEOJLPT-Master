// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) ASSESSMENT & FINAL EXAM
// Comprehensive Multi-Section Test with Authentic Scoring & Explanations
// ============================================================================

import { BusinessQuizQuestion } from '../../types/business';

export const BUSINESS_FINAL_EXAM_QUESTIONS: BusinessQuizQuestion[] = [
  // Section 1: Keigo Transformations
  {
    id: 'fe-k-1',
    section: 'keigo',
    level: 'intermediate',
    questionJp: '取引先の社長が「今から会議室に行く」と話しているのを聞いた際、同僚にその行動を伝える言葉として正しいものはどれですか？',
    questionEn: 'Which sentence is appropriate to tell a colleague that the client company\'s president is currently going to the meeting room?',
    scenarioContext: '社内での情報共有・取引先の行動の敬語表現',
    options: [
      '社長が今から会議室に参られます。',
      '社長が今から会議室にいらっしゃいます。',
      '社長が今から会議室に伺います。',
      '社長が今から会議室に行かれます。',
    ],
    correctAnswer: 1,
    explanationJp: '社外の大切なお客様（社長）の動作を高めるため、尊敬語の最高表現である「いらっしゃる（いらっしゃいます）」を用います。「参る」や「伺う」は謙譲語のため相手の動作に使えません。',
    explanationEn: 'Because the client company president is an external VIP performing the action, the honorific (Sonkeigo) "いらっしゃる" must be used. "参る" and "伺う" are humble verbs reserved for the speaker\'s in-group.',
  },
  {
    id: 'fe-k-2',
    section: 'keigo',
    level: 'foundation',
    questionJp: '上司（課長）から指示を受けた際の返事として、ビジネスマナー上不適切なものはどれですか？',
    questionEn: 'Which response is considered improper etiquette when receiving instructions from your direct manager (Section Chief)?',
    options: [
      'かしこまりました。',
      '承知いたしました。',
      '了解しました。',
      'はい、ただちに対応いたします。',
    ],
    correctAnswer: 2,
    explanationJp: '「了解しました」は同僚や目下の者に対して使う言葉であり、上司や取引先に使うのは失礼にあたります。目上には「かしこまりました」や「承知いたしました」を使います。',
    explanationEn: '"了解しました (Ryōkai shimashita)" implies granting permission from a position of authority and is inappropriate toward superiors. Use "かしこまりました" or "承知いたしました".',
  },
  {
    id: 'fe-k-3',
    section: 'keigo',
    level: 'intermediate',
    questionJp: '取引先から送られてきた製品のサンプルや資料を「見ました」と報告する際、最も適切な敬語はどれですか？',
    questionEn: 'Which expression is most appropriate to report that you have inspected a product sample or document sent by a business partner?',
    options: [
      '送っていただいた資料、拝見いたしました。',
      '送っていただいた資料、ご覧になりました。',
      '送っていただいた資料、拝見されました。',
      '送っていただいた資料、見させていただきました。',
    ],
    correctAnswer: 0,
    explanationJp: '自分の「見る」動作をへりくだって相手に敬意を表すため、謙譲語の「拝見いたしました」を用います。「ご覧になる」は尊敬語、「拝見される」は誤った敬語です。',
    explanationEn: '"拝見いたしました (Haiken itashimashita)" is the humble verb for "to see/inspect". "ご覧になりました" is honorific (cannot be used for oneself), and "拝見されました" is a common grammatical error.',
  },

  // Section 2: Business Vocabulary
  {
    id: 'fe-v-1',
    section: 'vocabulary',
    level: 'foundation',
    questionJp: '取引先に対して自分の勤めている会社を指す際、最も適切な呼び方はどれですか？',
    questionEn: 'Which term is most appropriate when referring to your own company when speaking to a client?',
    options: ['我が社（わがしゃ）', '貴社（きしゃ）', '弊社（へいしゃ）', 'ウチの会社'],
    correctAnswer: 2,
    explanationJp: '社外の人に対して自分の会社を謙称するときは「弊社（へいしゃ）」または公式文書では「当社（とうしゃ）」を用います。「貴社」は相手の会社です。',
    explanationEn: '"弊社 (Heisha)" is the humble word used to refer to your own company in front of clients. "貴社 (Kisha)" refers to the other company.',
  },
  {
    id: 'fe-v-2',
    section: 'vocabulary',
    level: 'intermediate',
    questionJp: 'プロジェクトの進捗において、事前に重要人物や関係部署と非公式に合意形成を図る日本の商習慣を何と呼びますか？',
    questionEn: 'What is the Japanese business practice of informally sounding out stakeholders and building consensus before a formal meeting?',
    options: ['稟議（りんぎ）', '根回し（ねまわし）', '報連相（ほうれんそう）', '席次（せきじ）'],
    correctAnswer: 1,
    explanationJp: '会議の前に非公式に関係者の意見を聞き、根回しをしておくことで、本番の意思決定を円滑に進める日本独特の商習慣です。',
    explanationEn: '"根回し (Nemawashi)" is the practice of laying quiet groundwork and building consensus among stakeholders prior to formal decision-making meetings.',
  },

  // Section 3: Business Email
  {
    id: 'fe-e-1',
    section: 'email',
    level: 'intermediate',
    questionJp: '取引先にファイルを添付してメールを送る際、本文の添え書きとして最も標準的で丁寧な表現はどれですか？',
    questionEn: 'Which phrase is the standard and polite way to ask a recipient to check an attached file in a business email?',
    options: [
      '添付ファイルを見てください。',
      'ファイルを添付しましたので、ご査収くださいますようお願い申し上げます。',
      '添付ファイルを拝見してください。',
      'ファイルをご確認いただきます。',
    ],
    correctAnswer: 1,
    explanationJp: '「ご査収（さしゅう）ください」は「内容をよく確認してお受け取りください」という書類送付時の定型ビジネス敬語です。',
    explanationEn: '"ご査収くださいますようお願い申し上げます (Go-sashū kudasaimasu yō...)" is the classic formula meaning "Please inspect and accept the enclosed attachment".',
  },
  {
    id: 'fe-e-2',
    section: 'email',
    level: 'foundation',
    questionJp: '社内の同僚や上司へ送る業務連絡メールの冒頭の挨拶として、最も適切なものはどれですか？',
    questionEn: 'Which opening greeting is standard and appropriate for an internal email sent to colleagues or managers within the same company?',
    options: [
      'いつも大変お世話になっております。',
      'ご苦労様です。',
      'お疲れ様です。',
      'こんにちは。',
    ],
    correctAnswer: 2,
    explanationJp: '社内の人間に対しては、役職の上下を問わず「お疲れ様です」で始めるのが日本企業の普遍的なルールです。「お世話になっております」は社外向けです。',
    explanationEn: '"お疲れ様です (Otsukaresama desu)" is the universal internal email greeting for colleagues and superiors alike. "お世話になっております" is strictly reserved for external parties.',
  },

  // Section 4: Telephone Communication
  {
    id: 'fe-t-1',
    section: 'telephone',
    level: 'foundation',
    questionJp: '会社の代表電話を受け、相手が「〇〇社の木村です。田中課長をお願いします」と言った際、田中課長が不在だった時の正しい対応はどれですか？',
    questionEn: 'When answering an office call and the caller asks for Manager Tanaka who is currently out, what is the correct response?',
    options: [
      '田中課長はただいま外出していらっしゃいます。',
      'あいにく田中は席を外しております。戻り次第、折り返しお電話させましょうか。',
      '田中さんは今日は休みです。また明日かけてください。',
      '課長の田中様は今いません。',
    ],
    correctAnswer: 1,
    explanationJp: '社外のお客様に対して自社の上司（田中）を呼ぶときは、役職をつけず呼び捨て（田中）にし、へりくだった表現「席を外しております」を用います。',
    explanationEn: 'When speaking to external callers, refer to your own boss without title or honorific ("田中"), and state that he is away politely while offering a callback.',
  },

  // Section 5: Workplace Culture & Etiquette
  {
    id: 'fe-c-1',
    section: 'culture',
    level: 'intermediate',
    questionJp: '取引先と4人でタクシーに乗る際、お客様（一番目上の方）をご案内すべき「上座（かみざ・一番安全で快適な席）」はどこですか？',
    questionEn: 'When taking a 4-passenger chauffeured taxi with clients, which seat is the "Kamiza" (seat of honor) that the top client should be seated in?',
    options: [
      '助手席（運転手の隣の席）',
      '運転席の真後ろの席',
      '後部座席の中央の席',
      '後部座席の左側（歩道側・乗り降りしやすい席）',
    ],
    correctAnswer: 1,
    explanationJp: 'タクシー（運転手がプロの運転手の場合）の最上座は「運転席の真後ろ」です。最も安全で乗り心地が安定しているためです。最下座は助手席（料金支払いや道案内を担当）です。',
    explanationEn: 'In a chauffeured taxi, the seat of honor (#1 Kamiza) is directly behind the driver because it is statistically the safest and most comfortable. The lowest seat (#4) is the front passenger seat.',
  },
  {
    id: 'fe-c-2',
    section: 'culture',
    level: 'foundation',
    questionJp: '初対面の取引先と名刺交換をする際、ビジネスマナーとして正しい手順はどれですか？',
    questionEn: 'What is the correct business card (Meishi) exchange protocol when meeting a client for the first time?',
    options: [
      '机越しに座ったまま片手で素早く差し出す。',
      '立ち上がり、机の横へ回り込み、両手で胸の高さで差し出し「頂戴いたします」と受ける。',
      '受け取った名刺はすぐに手帳の中にしまい込む。',
      '相手の会社名やロゴの上に親指をしっかり置いて渡す。',
    ],
    correctAnswer: 1,
    explanationJp: '名刺交換は起立して机を挟まずに行い、両手で胸の高さで扱い、文字やロゴを指で隠さないのが絶対のルールです。受け取った名刺は会議中、机の上に並べておきます。',
    explanationEn: 'Stand up, step around the table, exchange using both hands at chest height without covering logos, and keep cards displayed on the table during the meeting.',
  },
];

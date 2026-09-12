// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) SCENARIO DATABASE
// 12 Authentic Workplace Scenarios with Dialogue Steps & Decision Points
// ============================================================================

import { BusinessScenario } from '../../types/business';

export const BUSINESS_SCENARIOS: BusinessScenario[] = [
  {
    id: 'sc-phone-absent',
    titleJp: '電話応対：上司が不在のときの伝言と折り返し',
    titleEn: 'Telephone: Handling Calls When Superior is Unavailable',
    category: 'telephone',
    level: 'foundation',
    situation:
      'You are at your desk in the Tokyo office. The office phone rings. An external client (Mr. Sasaki from Yamato Corp) asks to speak with your manager (Manager Sato), but Sato is currently in a 2-hour management meeting.',
    roles: [
      { name: '佐々木様 (Mr. Sasaki)', role: '大和商事 取引先担当者 (Client Partner)' },
      { name: 'あなた (You)', role: '営業部 アシスタント (Junior Staff Member)' },
    ],
    objective:
      'Greet properly, verify caller identity, explain Manager Sato is in a meeting without using titles for Sato, take a clear message, and offer a callback.',
    culturalTip:
      'When speaking to an external partner, never use honorifics or titles for your own superiors. Refer to your manager simply as "佐藤 (Sato)", not "佐藤部長" or "佐藤さん".',
    keyTakeaways: [
      'Say "あいにく佐藤はただいま会議に入っておりまして"',
      'Do not say "佐藤部長はいらっしゃいません"',
      'Repeat telephone numbers digit-by-digit: "念のためお電話番号を復唱させていただきます"',
    ],
    dialogue: [
      {
        id: 'd1-1',
        speaker: '佐々木様',
        speakerRole: '大和商事 取引先',
        japanese: 'お世話になっております。大和商事の佐々木と申しますが、佐藤部長はいらっしゃいますでしょうか。',
        english: 'Hello, this is Sasaki from Yamato Corp. Is Manager Sato in, please?',
      },
      {
        id: 'd1-2',
        speaker: 'あなた',
        speakerRole: '営業部',
        isUserTurn: true,
        japanese: '大和商事の佐々木様ですね。いつも大変お世話になっております。あいにく佐藤は、ただいま別の会議に入っておりまして、15時頃まで席を外しております。',
        english: 'Mr. Sasaki of Yamato Corp, thank you very much for always doing business with us. Regrettably, Sato is currently in another meeting and will be away from his desk until around 3:00 PM.',
        nuanceExplanation:
          'Calling him "佐藤" (no title, no san) treats him as "in-group" (ウチ) relative to the external client (ソト). Stating when the meeting ends (15時頃) is proactive and appreciated.',
        userOptions: [
          {
            text: '佐藤部長はいま会議でいらっしゃいません。あとで電話してください。',
            politenessScore: 20,
            isOptimal: false,
            feedback: 'Violates in-group rules (never honor own boss to client) and blunt tone.',
          },
          {
            text: '大和商事の佐々木様ですね。いつも大変お世話になっております。あいにく佐藤はただいま会議中でございまして、15時頃に戻る予定です。',
            politenessScore: 100,
            isOptimal: true,
            feedback: 'Perfect professional Japanese. In-group naming and polite explanation of status.',
          },
        ],
      },
      {
        id: 'd1-3',
        speaker: '佐々木様',
        speakerRole: '大和商事 取引先',
        japanese: 'そうですか。では、戻られましたら、私宛てに折り返しお電話をいただけますでしょうか。至急の件ではございません。',
        english: 'I see. When he returns, could you please have him call me back? It is not an emergency.',
      },
      {
        id: 'd1-4',
        speaker: 'あなた',
        speakerRole: '営業部',
        isUserTurn: true,
        japanese: 'かしこまりました。佐藤が戻り次第、至急佐々木様にお電話を差し上げるよう申し伝えます。念のため、お電話番号を伺ってもよろしいでしょうか。',
        english: 'Certainly. As soon as Sato returns, I will inform him to place a call to you promptly. To be certain, may I verify your telephone number?',
        userOptions: [
          {
            text: '分かりました。伝えておきますね。',
            politenessScore: 35,
            isOptimal: false,
            feedback: 'Too casual. Use "かしこまりました" and "申し伝えます".',
          },
          {
            text: 'かしこまりました。佐藤が戻り次第、佐々木様へ折り返しお電話するよう申し伝えます。念のため、お電話番号をお伺いしてもよろしいでしょうか。',
            politenessScore: 100,
            isOptimal: true,
            feedback: 'Excellent. "申し伝える" is the correct humble verb for passing messages internally.',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-hourensou-delay',
    titleJp: '報連相：納期の遅延を上司に報告・相談する',
    titleEn: 'Hou-Ren-Sou: Reporting a Project Delay to Section Chief',
    category: 'hourensou',
    level: 'intermediate',
    situation:
      'You are developing a software module due this Friday. A third-party API has critical bugs that make Friday launch impossible without crashing. You must report this delay to Section Chief Yamamoto immediately with a recovery plan.',
    roles: [
      { name: '山本課長 (Chief Yamamoto)', role: '直属の上司 (Direct Manager)' },
      { name: 'あなた (You)', role: 'システム開発担当 (Software Engineer)' },
    ],
    objective:
      'Approach manager using cushion phrase, state bad news immediately using conclusion-first (PREP), explain cause objectively, propose alternative timeline and solution, and ask for advice.',
    culturalTip:
      'Bad news must travel fastest in Japanese corporate culture (バッドニュース・ファースト). Never wait until the deadline day to report delays.',
    keyTakeaways: [
      'Open with: "課長、今少々お時間よろしいでしょうか。〇〇の件でご報告とご相談がございます"',
      'Conclusion first: "結論から申し上げますと、金曜日の納期が2日ほど遅れる見込みです"',
      'Propose solution: "リカバリー案として、〜を考えております"',
    ],
    dialogue: [
      {
        id: 'd2-1',
        speaker: 'あなた',
        speakerRole: '開発担当',
        isUserTurn: true,
        japanese: '山本課長、今少々お時間よろしいでしょうか。今週金曜日に予定しております決済システム改修の件で、ご報告とご相談がございます。',
        english: 'Section Chief Yamamoto, do you have a brief moment now? I have an urgent report and consultation regarding the payment system revision scheduled for this Friday.',
        userOptions: [
          {
            text: 'あのー、課長、ちょっといいですか？金曜日のやつ、間に合わないかもしれません。',
            politenessScore: 30,
            isOptimal: false,
            feedback: 'Vague and lacking professional structure. Use proper project names.',
          },
          {
            text: '山本課長、今少々お時間よろしいでしょうか。金曜納期の決済システム改修について、緊急のご報告とご相談がございます。',
            politenessScore: 100,
            isOptimal: true,
            feedback: 'Direct, respectful, and sets the agenda immediately.',
          },
        ],
      },
      {
        id: 'd2-2',
        speaker: '山本課長',
        speakerRole: '直属上司',
        japanese: 'うん、どうした？何かトラブルでもあったか？',
        english: 'Yes, what is it? Did some trouble occur?',
      },
      {
        id: 'd2-3',
        speaker: 'あなた',
        speakerRole: '開発担当',
        isUserTurn: true,
        japanese: '結論から申し上げますと、金曜日の納品が2営業日遅延する見込みです。外部APIの仕様不具合が原因で、修正とテストに追加入り日数を要します。私としては、来週火曜日の午前納品にリスケジュールし、本日中にクライアントへご連絡したく存じますが、いかがでしょうか。',
        english: 'To state the conclusion first, delivery on Friday is anticipated to be delayed by two business days. The cause is a specification bug in the third-party API, which requires additional days for fix and testing. As my proposed recovery plan, I would like to reschedule delivery to next Tuesday morning and notify the client today. What are your thoughts on this?',
        userOptions: [
          {
            text: '外部のAPIがバグだらけで、間に合いません。クライアントに延期を言ってください。',
            politenessScore: 25,
            isOptimal: false,
            feedback: 'Blames external factors without presenting an engineer\'s recovery plan.',
          },
          {
            text: '結論から申し上げますと、金曜納期が2日遅延する見込みです。原因は外部APIの不整合で、修正テストに月曜まで必要です。火曜朝納品への変更案でクライアントと交渉したく存じます。',
            politenessScore: 100,
            isOptimal: true,
            feedback: 'Exemplary Hou-Ren-Sou. Conclusion first, factual root cause, and concrete proposal.',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-complaint-handling',
    titleJp: 'クレーム対応：納期遅延による顧客の怒りへの対応',
    titleEn: 'Customer Service: Resolving an Angry Client Complaint',
    category: 'customer_complaint',
    level: 'upper_intermediate',
    situation:
      'A crucial corporate client (Director Kawamura) is furious because marketing brochures needed for their national trade show were delayed by the printing partner. He calls demanding an explanation.',
    roles: [
      { name: '川村部長 (Director Kawamura)', role: '取引先クライアント (Furious Client)' },
      { name: 'あなた (You)', role: 'アカウントマネージャー (Account Executive)' },
    ],
    objective:
      'Listen without interrupting, express sincere empathy for the anxiety and business impact, state facts without making defensive excuses, offer an immediate substitute solution, and commit to follow-up.',
    culturalTip:
      'In Japanese complaint handling, explaining the reason before apologizing sounds like an excuse (言い訳). Always validate customer frustration first.',
    keyTakeaways: [
      'Apologize for anxiety: "ご不安とご不快な思いをおかけし、誠に申し訳ございません"',
      'Do not interrupt: Wait until client finishes speaking completely',
      'Offer emergency relief: "本日夕方までに、サンプル200部をバイク便で会場へ直接お届けいたします"',
    ],
    dialogue: [
      {
        id: 'd3-1',
        speaker: '川村部長',
        speakerRole: 'クライアント',
        japanese: 'どういうことですか！明日の展示会で使うパンフレットがまだ届いていないと連絡がありました。明日の朝一番から来場者が来るのに、資料がないなんてあり得ないでしょう！',
        english: 'What is the meaning of this! I was just informed that the brochures for tomorrow\'s exhibition have not arrived yet. Visitors start arriving first thing tomorrow morning—how can we possibly have no materials!',
      },
      {
        id: 'd3-2',
        speaker: 'あなた',
        speakerRole: 'アカウント担当',
        isUserTurn: true,
        japanese: '川村部長、明日の大切な展示会を控えた極めて重要な時期に、多大なるご心配とご迷惑をおかけし、心より深くお詫び申し上げます。',
        english: 'Director Kawamura, at such a critically important moment right before tomorrow\'s major exhibition, I sincerely and deeply apologize for causing you tremendous anxiety and trouble.',
        userOptions: [
          {
            text: 'それは印刷工場の機械が壊れたからで、弊社のせいではありません！',
            politenessScore: 10,
            isOptimal: false,
            feedback: 'Catastrophic response. Shifting blame inflames the client\'s anger.',
          },
          {
            text: '川村部長、明日の大切な展示会を目前に控え、多大なるご不安とご迷惑をおかけしておりますことを、深くお詫び申し上げます。',
            politenessScore: 100,
            isOptimal: true,
            feedback: 'Acknowledges the specific business gravity and offers humble, sincere apology.',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-job-interview',
    titleJp: '採用面接：志望動機と強みの自己PR',
    titleEn: 'Job Interview: Articulating Motivation (志望動機) & Strengths',
    category: 'meeting',
    level: 'career_track',
    situation:
      'You are in the final interview round at a major Tokyo IT consulting firm. The Interviewer (Executive Director Takahashi) asks you to explain why you chose their company over competitors and how your international background adds value.',
    roles: [
      { name: '高橋常務 (Director Takahashi)', role: '最終面接官 (Executive Interviewer)' },
      { name: 'あなた (You)', role: '応募者 (Candidate)' },
    ],
    objective:
      'Deliver structured Japanese answers demonstrating company research, cultural adaptability, technical skills, and commitment to long-term career growth in Japan.',
    culturalTip:
      'Japanese interviewers assess not just technical ability, but "corporate fit" (企業文化への適性) and willingness to work collaboratively in a team.',
    keyTakeaways: [
      'Show specific knowledge of their proprietary products or philosophy',
      'Frame bilingual/international experience as an asset for cross-border projects',
      'End answers with: "〜という形で、貴社のグローバル事業に貢献したいと考えております"',
    ],
    dialogue: [
      {
        id: 'd4-1',
        speaker: '高橋常務',
        speakerRole: '面接官',
        japanese: '同業他社も多く存在する中で、なぜ弊社を第一志望として選ばれたのか、具体的な理由をお聞かせいただけますか。',
        english: 'With many competitors in the industry, could you share the specific reasons why you chose our company as your first choice?',
      },
      {
        id: 'd4-2',
        speaker: 'あなた',
        speakerRole: '応募者',
        isUserTurn: true,
        japanese: 'はい。貴社を志望した理由は大きく2点ございます。1点目は、単なるシステム開発にとどまらず、顧客の事業変革まで伴走する「顧客第一主義」の理念に深く共感したためです。2点目は、貴社が現在注力されているアジア市場への越境DX展開において、私のIT知識と多言語対応力を最大限に活かして貢献できると確信したからです。',
        english: 'Yes. There are two primary reasons why I aspire to join your company. First, I deeply resonate with your philosophy of "Customer-First", where you partner with clients through complete business transformation rather than just building systems. Second, in your current focus on cross-border DX expansion into Asian markets, I am confident that I can contribute significantly by leveraging my IT background and multilingual capabilities.',
        userOptions: [
          {
            text: '給料が良くて、有名な大企業だからです。あとオフィスが綺麗だからです。',
            politenessScore: 20,
            isOptimal: false,
            feedback: 'Superficial reasons that show zero company research or contribution mindset.',
          },
          {
            text: 'はい。貴社を第一志望とする理由は大きく2点ございます。1点目は貴社の顧客伴走型DXという理念への深い共感、2点目はグローバル展開における私の多言語力とITスキルの適合性です。',
            politenessScore: 100,
            isOptimal: true,
            feedback: 'Perfect structure: states number of reasons upfront (PREP formula) and aligns with company strategy.',
          },
        ],
      },
    ],
  },
];

// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) EMAIL DATABASE
// Authentic Templates, 7-Part Formula & Interactive Writing Prompts
// ============================================================================

import { BusinessEmailTemplate } from '../../types/business';

export const BUSINESS_EMAIL_TEMPLATES: BusinessEmailTemplate[] = [
  {
    id: 'em-scheduling',
    category: 'scheduling',
    titleJp: 'お打ち合わせの日程調整のご相談',
    titleEn: 'Meeting Scheduling & Appointment Request',
    audience: 'external_client',
    subject: '【日程調整のご相談】新規プロジェクトに関するお打ち合わせの件',
    recipient: '株式会社ABCソリューションズ\n営業本部 第一営業部\n部長 佐藤 健一 様',
    greeting: 'いつも大変お世話になっております。\n株式会社ネクストイノベーション 開発部の李（リ）でございます。',
    opening: '先日は展示会の弊社ブースにお立ち寄りいただき、誠にありがとうございました。\n貴社の業務効率化システムについて、より詳しいご提案の機会をいただきたく存じます。',
    body: `つきましては、一度30分〜1時間程度、オンラインまたは対面にてお打ち合わせのお時間を頂戴できないでしょうか。

誠に勝手ながら、私どもの希望候補日時を以下に挙げさせていただきます。

【候補日時】
1. 10月15日（火） 10:00〜12:00
2. 10月16日（水） 14:00〜17:00
3. 10月18日（金） 13:00〜15:00`,
    requestAction: '上記の日程でご都合のよろしい時間帯がございましたら、本メールへのご返信にてお知らせいただけますと幸いです。\nもし上記日程での調整が難しい場合は、佐藤様のご都合のよい日時をご教示いただけますと幸いに存じます。',
    closing: 'お忙しいところ大変恐縮ではございますが、何卒ご検討のほどよろしくお願い申し上げます。',
    signature: '--------------------------------------------------\n株式会社ネクストイノベーション\n開発部 エンジニアリング課\n李 承民 (Lee Seung-min)\n〒100-0005 東京都千代田区丸の内1-2-3\nTEL: 03-1234-5678 / FAX: 03-1234-5679\nEmail: lee.sm@next-innovation.co.jp\nHP: https://next-innovation.example.com\n--------------------------------------------------',
    keyPhrases: [
      {
        phrase: 'お時間を頂戴できないでしょうか',
        reading: 'おじかんをちょうだいできないでしょうか',
        meaning: 'Could you please spare some of your precious time?',
        usageNote: 'A refined humble request for scheduling.',
      },
      {
        phrase: 'ご都合のよろしい時間帯',
        reading: 'ごつごうのよろしいじかんたい',
        meaning: 'A time window that is convenient for you',
        usageNote: 'More respectful than "いい時間".',
      },
    ],
    cushionPhrases: [
      '誠に勝手ながら、私どもの希望候補日時を以下に...',
      'お忙しいところ大変恐縮ではございますが...',
    ],
    writingPrompt: {
      scenario: 'You want to schedule an online progress meeting with your client (Mr. Tanaka from Alpha Corp) next week.',
      requirements: [
        'Propose 3 distinct date and time slots with day of the week',
        'State meeting duration (approx 30 mins) and tool (Zoom)',
        'Include a polite closing request',
      ],
      modelSolution: `件名：【日程調整のお願い】次期システム開発に関する進捗ミーティングの件

アルファ株式会社
IT推進部　田中 課長

いつも大変お世話になっております。
株式会社テックフォースの山田でございます。

先週合意いたしました開発仕様書に基づき、現在の進捗状況のご報告と
今後のスケジュール確認のため、30分ほどオンラインミーティングのお時間をいただきたく存じます。

誠に勝手ながら、候補日時を以下に記載いたします。

【候補日時】
1. 11月12日（火） 11:00〜12:00
2. 11月13日（水） 14:00〜16:00
3. 11月15日（金） 10:00〜12:00
※ツールはZoomを想定しております（URLは決定次第ご送付いたします）。

田中様のご都合はいかがでしょうか。
お忙しい中恐れ入りますが、ご検討のほどよろしくお願い申し上げます。`,
      explanation: 'Notice how dates include both the day of the week and a flexible 1-2 hour window. The tool (Zoom) is stated in advance so the client is prepared.',
    },
  },
  {
    id: 'em-file-attachment',
    category: 'confirmation',
    titleJp: '資料・見積書の送付と確認依頼',
    titleEn: 'Document / Quotation Delivery & Verification',
    audience: 'external_client',
    subject: '【お見積書送付】クラウド移行支援サービスのお見積りの件',
    recipient: 'グローバルロジスティクス株式会社\nシステム管理部\n課長 鈴木 一郎 様',
    greeting: 'いつも大変お世話になっております。\nクラウドシステムズ株式会社のワンでございます。',
    opening: '過日は弊社サービスへのお問い合わせをいただき、重ねて御礼申し上げます。\n先ほどお電話にてご要望を伺いました、クラウド移行支援サービスに関するお見積書を作成いたしました。',
    body: `本メールにPDFファイルにて添付いたしましたので、ご査収くださいますようお願い申し上げます。

【添付ファイル】
・見積書_20261012_クラウド移行支援.pdf（パスワード保護）
※解凍用パスワードは、セキュリティ規定に基づき別メールにてお送りいたします。`,
    requestAction: '内容をご確認いただき、ご不明な点や追加のご要望などがございましたら、いつでもお気軽にお申し付けください。',
    closing: '今後とも何卒よろしくお願い申し上げます。',
    signature: '--------------------------------------------------\nクラウドシステムズ株式会社\nソリューション営業課\nワン・ウェイ (Wang Wei)\nEmail: wang@cloudsystems.example.com\nTEL: 03-9876-5432\n--------------------------------------------------',
    keyPhrases: [
      {
        phrase: 'ご査収くださいますよう',
        reading: 'ごさしゅうくださいますよう',
        meaning: 'Please check and accept the enclosed materials',
        usageNote: 'Standard formula when attaching business contracts or estimates.',
      },
    ],
    cushionPhrases: ['ご不明な点や追加のご要望などがございましたら、お気軽に...'],
  },
  {
    id: 'em-apology-delay',
    category: 'apology',
    titleJp: '納品遅延のお詫びと納期再設定',
    titleEn: 'Apology for Delivery Delay & Revised Timeline',
    audience: 'external_client',
    subject: '【お詫びとご報告】納品遅延および今後のスケジュールについて',
    recipient: '株式会社フューチャーネット\n制作部　ディレクター 高橋 様',
    greeting: '平素は格別のご高配を賜り、厚く御礼申し上げます。\n株式会社デザインワークスの加藤でございます。',
    opening: '本日10月12日に納品を予定しておりました「ウェブサイト改修デザインデータ」につきまして、大変重要なお詫びとご報告がございます。',
    body: `現在、最終検証段階におきまして一部のブラウザ表示に予期せぬ不具合が発見され、その修正および安全性の確認に時間を要しております。

期日通りのお届けができず、高橋様をはじめ貴社プロジェクト関係者の皆様に多大なるご迷惑をおかけいたしますことを、深くお詫び申し上げます。

早急にエンジニア総出で対応にあたっており、修正後の新納期を以下のように再設定させていただきたく存じます。

【変更後のお届け予定日時】
10月14日（水） 15:00まで`,
    requestAction: '今回の不手際を厳粛に受け止め、再発防止に向けて検証プロセスの見直しを徹底してまいります。\n大変恐縮ではございますが、上記日程まで今しばらくお待ちいただけますよう、切にお願い申し上げます。',
    closing: '取り急ぎ、納期の遅延のお詫びとご報告を申し上げます。',
    signature: '--------------------------------------------------\n株式会社デザインワークス\nクリエイティブ制作部\n加藤 雅也\nTEL: 03-5555-1111\n--------------------------------------------------',
    keyPhrases: [
      {
        phrase: '多大なるご迷惑をおかけいたしますことを、深くお詫び申し上げます',
        reading: 'ただいなるごめいわくをおかけいたしますことを、ふかくおわびもうしあげます',
        meaning: 'I sincerely and deeply apologize for the tremendous trouble caused.',
        usageNote: 'High-severity business apology phrase.',
      },
    ],
    cushionPhrases: ['大変恐縮ではございますが、今しばらくお待ちいただけますよう...'],
  },
  {
    id: 'em-thankyou-visit',
    category: 'thankyou',
    titleJp: '来社・面談のお礼メール',
    titleEn: 'Thank You for Visiting & Meeting Follow-up',
    audience: 'external_client',
    subject: '【ご来社の御礼】本日の新規事業に関するお打ち合わせについて',
    recipient: 'オリエント商事株式会社\n事業開発本部\n本部長 松本 誠一 様',
    greeting: 'いつも大変お世話になっております。\n株式会社フロンティアのキムでございます。',
    opening: '本日はお足元の悪い中、弊社のオフィスまでご足労いただき、誠にありがとうございました。',
    body: `松本様から頂戴いたしました貴重なご意見や市場ニーズに関する知見は、弊社にとって大変示唆に富むものでございました。

本日合意いたしましたネクストアクションにつきまして、以下の通り議事録を作成いたしましたのでご確認いただけますと幸いです。

【合意事項・宿題】
1. 弊社（担当：キム）
　・来週金曜日（10/20）までに、ご要望を反映した修正見積もりとシステム構成図を提出。
2. 貴社（担当：松本様）
　・社内セキュリティ要件チェックシートのご共有。`,
    requestAction: 'ご質問や修正点などがございましたら、ご遠慮なくご指摘ください。',
    closing: '松本様のご期待に沿えるよう、プロジェクトチーム一同尽力してまいります。\n引き続き何卒よろしくお願い申し上げます。',
    signature: '--------------------------------------------------\n株式会社フロンティア\n事業開発部\nキム・ジフン (Kim Ji-hoon)\nTEL: 03-7777-8888\n--------------------------------------------------',
    keyPhrases: [
      {
        phrase: 'ご足労いただき',
        reading: 'ごそくろういただき',
        meaning: 'Thank you for taking the trouble to travel and visit our office.',
        usageNote: 'Respectful expression specifically for someone visiting your location.',
      },
    ],
    cushionPhrases: ['お足元の悪い中...', '大変示唆に富むものでございました'],
  },
  {
    id: 'em-internal-approval',
    category: 'request',
    titleJp: '上司への企画書承認依頼（社内メール）',
    titleEn: 'Internal Approval Request for Project Proposal',
    audience: 'internal_manager',
    subject: '【承認依頼】第4四半期マーケティング施策企画書の件',
    recipient: 'マーケティング部\n部長　山本 様\n（CC: 佐藤課長）',
    greeting: 'お疲れ様です。マーケティング部のグエンです。',
    opening: '先日のチーム定例ミーティングで議論いたしました、第4四半期の新規リード獲得キャンペーンに関する企画書がまとまりましたので、ご報告ならびに承認の依頼を申し上げます。',
    body: `添付ファイルにて企画詳細および予算案をお送りいたします。

【企画概要】
・施策名：2026年春 オンラインテックカンファレンス協賛
・目的：BtoB見込み顧客の獲得（目標リード数：500件）
・想定予算：150万円（第4四半期プロモーション費の枠内）
・開催時期：2026年3月中旬

【添付ファイル】
・企画書_Q4マーケティング施策案_v1.0.pdf`,
    requestAction: 'お忙しいところ大変恐縮ですが、内容をご確認の上、今週木曜日（10/17）17時までに決裁・承認をいただけますと幸いでございます。\n修正や追加のご指示がございましたら、すぐに対応いたします。',
    closing: 'よろしくお願いいたします。',
    signature: '--------------------------------------------------\nグエン・ヴァン・ナム (Nguyen Van Nam)\nマーケティング部 デジタルマーケティング課\n内線: 1234 / 携帯: 090-1234-5678\n--------------------------------------------------',
    keyPhrases: [
      {
        phrase: 'お疲れ様です',
        reading: 'おつかれさまです',
        meaning: 'Standard internal greeting among employees of all levels.',
        usageNote: 'Never use "お世話になっております" or "ご苦労様です" to internal colleagues/bosses.',
      },
    ],
    cushionPhrases: ['お忙しいところ大変恐縮ですが、ご確認の上...'],
  },
];

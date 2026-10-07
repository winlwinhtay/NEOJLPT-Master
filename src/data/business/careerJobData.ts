// ============================================================================
// CAREER & JOB INTERVIEW DATA (キャリア・就職・転職面接マスター)
// 10 Interview Modes, 50+ Tagged Question Bank, STAR Framework & Resume Coach
// ============================================================================

import {
  InterviewModeId,
  InterviewModeInfo,
  InterviewQuestionExtended,
  CareerStepItem,
  ResumeWordingTransformation,
  RirekishoRecord,
  ShokumuKeirekishoRecord,
} from '../../types/business';

// ----------------------------------------------------------------------------
// 10 INTERVIEW SIMULATION MODES
// ----------------------------------------------------------------------------
export const INTERVIEW_MODES: InterviewModeInfo[] = [
  {
    id: 'basic_entry',
    titleJp: '新卒・未経験面接 (Basic Entry & New Graduate)',
    titleEn: 'Entry Level & Basic Behavioral',
    targetAudience: 'Students, New Grads, Career Starters',
    description: 'Master self-introduction, university achievements (ガクチカ), personality strengths, and entry motivation.',
    focusSkills: ['自己紹介', 'ガクチカ', '長所・短所', '基礎敬語'],
    questionsCount: 6,
  },
  {
    id: 'mid_career',
    titleJp: '中途採用・転職面接 (Mid-Career & Experienced Hire)',
    titleEn: 'Mid-Career & Experience Focus',
    targetAudience: 'Experienced Professionals changing jobs',
    description: 'Articulate previous business achievements, reason for leaving, immediate value contribution (即戦力), and career trajectory.',
    focusSkills: ['転職理由', '職務実績', '即戦力アピール', 'キャリアプラン'],
    questionsCount: 6,
  },
  {
    id: 'tech_dx',
    titleJp: 'エンジニア・DX技術職面接 (Technical & DX Engineer)',
    titleEn: 'IT, Software & DX Engineering',
    targetAudience: 'Developers, Data Scientists, PMs, Infrastructure',
    description: 'Explain system architecture, technical trade-offs, incident post-mortems, team collaboration, and DX delivery.',
    focusSkills: ['技術選定理由', 'システム障害対応', 'アジャイル開発', 'コード品質'],
    questionsCount: 6,
  },
  {
    id: 'sales_biz',
    titleJp: '営業・事業開発面接 (Sales & Business Development)',
    titleEn: 'Sales & Business Expansion',
    targetAudience: 'B2B/B2C Sales, Account Executives, Partnerships',
    description: 'Demonstrate quota achievement, client relationship building, complex negotiation, and trust-oriented consultative selling.',
    focusSkills: ['予算達成率', '顧客開拓手法', '関係構築力', '提案営業'],
    questionsCount: 5,
  },
  {
    id: 'management',
    titleJp: 'マネジメント・リーダーシップ面接 (Leadership & Management)',
    titleEn: 'Team Lead & Management',
    targetAudience: 'Project Managers, Team Leads, Department Heads',
    description: 'Demonstrate mentoring, conflict resolution between team members, resource allocation, and KPI delivery.',
    focusSkills: ['チーム鼓舞', 'コンフリクト解消', '部下育成', '目標管理'],
    questionsCount: 5,
  },
  {
    id: 'stress_adaptability',
    titleJp: 'ストレス耐性・異文化適応面接 (Resilience & Adaptability)',
    titleEn: 'Stress Tolerance & Cross-Cultural Agility',
    targetAudience: 'Foreign Talents working in Japan',
    description: 'Address tight deadlines, ambiguous requirements, unexpected setbacks, and thriving in traditional Japanese environments.',
    focusSkills: ['異文化適応', 'トラブル打開策', 'メンタルタフネス', '報連相徹底'],
    questionsCount: 5,
  },
  {
    id: 'reverse_question',
    titleJp: '逆質問マスター (Strategic Reverse Questions)',
    titleEn: 'Reverse Questioning for Interviewer',
    targetAudience: 'All Candidates seeking to impress interviewers',
    description: 'Show deep intellectual curiosity and business understanding by asking high-impact questions to recruiters and executives.',
    focusSkills: ['経営方針への深掘り', 'チーム期待役割', '企業文化確認', '熱意表明'],
    questionsCount: 5,
  },
  {
    id: 'casual_culture',
    titleJp: 'カジュアル面談・カルチャーマッチ (Casual Chat & Culture Fit)',
    titleEn: 'Informal Fireside & Culture Fit',
    targetAudience: 'Tech startups, modern firms doing preliminary talks',
    description: 'Strike the perfect balance between relaxed dialogue and courteous professional boundaries in casual 1-on-1s.',
    focusSkills: ['価値観の合致', '素直な自己開示', '双方向コミュニケーション', '柔軟性'],
    questionsCount: 5,
  },
  {
    id: 'case_study',
    titleJp: 'ケース面接・問題解決 (Case Study & Business Logic)',
    titleEn: 'Case Study & Problem Framing',
    targetAudience: 'Consultants, Corporate Planners, Analysts',
    description: 'Tackle structured hypothetical scenarios: market sizing, revenue decline diagnoses, and prioritized action plans.',
    focusSkills: ['仮説思考', 'MECE構造化', '論理的説得', '優先度付け'],
    questionsCount: 5,
  },
  {
    id: 'final_executive',
    titleJp: '役員・最終面接 (Executive & Final Round)',
    titleEn: 'Executive & Board Member Final Round',
    targetAudience: 'Candidates in the decisive final interview stage',
    description: 'Win over directors and CEO with long-term vision, cultural alignment, commitment to company mission, and executive presence.',
    focusSkills: ['理念への共感', '入社覚悟', '長期的貢献', '人間的魅力'],
    questionsCount: 5,
  },
];

// ----------------------------------------------------------------------------
// 50+ TAGGED INTERVIEW QUESTION BANK WITH STAR FRAMEWORK
// ----------------------------------------------------------------------------
export const INTERVIEW_QUESTION_BANK: InterviewQuestionExtended[] = [
  // --- MODE 1: BASIC ENTRY ---
  {
    id: 'iq-entry-01',
    modeId: 'basic_entry',
    category: '自己紹介 (Self-Introduction)',
    questionJp: '1分程度で簡単な自己紹介をお願いいたします。',
    questionReading: 'いちふんていどで かんたんな じこしょうかいを おねがいいたします。',
    questionEn: 'Please give a brief 1-minute self-introduction.',
    interviewerIntent: 'Checks first impression, poise, logical speech pacing (約300文字), and accurate Japanese honorifics under pressure.',
    starFramework: {
      situation: '氏名・所属（大学/前職）を簡潔に述べる',
      task: '学生時代またはこれまでの核となる専攻やテーマを特定',
      action: '自身の最大の強み（1点に絞る）を端的に説明',
      result: '本日の面接に対する意気込みと感謝で締める',
    },
    modelAnswerJp:
      '本日はお時間をいただき、誠にありがとうございます。李承民（リ・スンミン）と申します。\n大学では情報工学を専攻し、主に自然言語処理の研究に取り組んでまいりました。私の強みは、異文化の環境でも周囲を巻き込んで課題を解決する「主体的な対話力」です。\n本日は、これまで培った技術への探究心と、貴社のDX推進事業でどのように貢献できるかをお伝えできればと存じます。どうぞよろしくお願い申し上げます。',
    modelAnswerEn:
      'Thank you very much for your time today. My name is Seungmin Lee. At university, I majored in Information Engineering with a focus on Natural Language Processing. My greatest strength is proactive communication that brings diverse teammates together to solve complex problems. Today, I look forward to sharing my passion for technology and how I can contribute to your company’s DX initiatives. Thank you very much.',
    keyPhrases: ['お時間をいただき、誠にありがとうございます', '〜専攻してまいりました', '私の強みは〜です', 'どうぞよろしくお願い申し上げます'],
    commonPitfalls: ['Exceeding 1.5 minutes', 'Reciting entire resume chronology', 'Speaking too fast due to nervousness'],
    jlptMinLevel: 'N3',
  },
  {
    id: 'iq-entry-02',
    modeId: 'basic_entry',
    category: '志望動機 (Why this company)',
    questionJp: '数ある企業の中で、なぜ弊社を志望されたのですか。',
    questionReading: 'かずある きぎょうの なかで、なぜ へいしゃを しぼうされたのですか。',
    questionEn: 'Among many companies in this industry, why did you choose to apply to us?',
    interviewerIntent: 'Assesses whether the candidate did serious research into corporate mission, competitive moat, and unique culture.',
    starFramework: {
      situation: '業界への興味のきっかけ（原体験）',
      task: 'なぜ同業他社ではなく「貴社」でなければならないのか',
      action: '自身のスキルや価値観との合致点を示す',
      result: '入社後に実現したい具体的な貢献ビジョン',
    },
    modelAnswerJp:
      '貴社を第一志望とする理由は、単なるシステム開発にとどまらず、現場の業務変革まで伴走する「顧客第一のパートナーシップ」に強く共感したためです。\n大学の研究プロジェクトで中小企業のデータ分析を支援した際、最新技術の導入以上に「現場の使いやすさ」に寄り添うことの重要性を痛感いたしました。国内外の多様な現場に深く入り込む貴社の姿勢こそが私の理想であり、多言語コミュニケーション力と分析力を生かして貢献したいと考えております。',
    modelAnswerEn:
      'I chose your company as my first choice because I deeply resonate with your customer-first partnership ethos of walking alongside clients through real operational transformation. During my university project supporting local SMEs with data analysis, I realized that user empathy is far more vital than just introducing trendy tools. Your commitment to deep on-site engagement matches my ideals.',
    keyPhrases: ['〜に強く共感したためです', '貴社ならではの強み', '〜の重要性を痛感いたしました', '即戦力として貢献したい'],
    commonPitfalls: ['Giving a generic answer that fits any competitor', 'Mentioning benefits or working hours instead of business contribution'],
    jlptMinLevel: 'N2',
  },
  {
    id: 'iq-entry-03',
    modeId: 'basic_entry',
    category: 'ガクチカ (Student Achievement)',
    questionJp: '学生時代に最も情熱を注いだことと、そこから得た学びを教えてください。',
    questionReading: 'がくせいじだいに もっとも じょうねつを そそいだことと、そこから えた まなびを おしえてください。',
    questionEn: 'What did you dedicate the greatest passion to during your university years, and what did you learn?',
    interviewerIntent: 'Measures autonomous initiative, resilience when overcoming friction, and teamwork reproduction in corporate settings.',
    starFramework: {
      situation: '留学生と日本人学生の合同プロジェクトでリーダーを担当',
      task: '文化的背景や言語の違いによる意思疎通の遅延と士気の低下という課題',
      action: 'タスクの可視化ツールの導入と毎朝15分のスタンドアップ対話を徹底',
      result: '目標期限内にプロダクトを完成させ、コンテストで優秀賞を受賞',
    },
    modelAnswerJp:
      '留学生と日本人学生が協働する合同ハッカソンのチームリーダーとして、最優秀賞の獲得に挑んだ経験です。\n開発初期、言語や作業スタイルの違いから認識のズレが生じ、進捗が2週間遅延する危機に直面しました。そこで私は、タスクの進捗をカンバンボードで可視化するとともに、毎朝15分の振り返りミーティングを新設し、心理的安全性を高めました。結果としてチームの一体感が生まれ、期限内に完成させて30チーム中2位の優秀賞を受賞しました。この経験から、対話を重ねて共通ゴールを紡ぎ出すリーダーシップを学びました。',
    modelAnswerEn:
      'My greatest effort was leading a diverse team of international and Japanese students in a collaborative hackathon. When progress stalled due to communication gaps, I instituted a visual Kanban board and 15-minute daily standups to build psychological safety. We unified our efforts, finished on time, and won 2nd place among 30 teams.',
    keyPhrases: ['〜に直面いたしました', '自発的な工夫として〜を導入し', '結果として〜を達成いたしました', '〜の重要性を学びました'],
    commonPitfalls: ['Saying "we did this" without highlighting your personal action', 'No quantitative metrics'],
    jlptMinLevel: 'N2',
  },
  {
    id: 'iq-entry-04',
    modeId: 'basic_entry',
    category: '長所・短所 (Strengths & Weaknesses)',
    questionJp: 'ご自身の「長所」と「短所」について、客観的なエピソードを交えて教えてください。',
    questionReading: 'ごじしんの ちょうしょと たんしょについて、きゃっかんてきな エピソードを まじえて おしえてください。',
    questionEn: 'Please explain your strengths and weaknesses with concrete objective episodes.',
    interviewerIntent: 'Checks self-awareness, honesty, and whether the candidate has active self-regulation countermeasures for their weaknesses.',
    starFramework: {
      situation: '長所：粘り強い探究心と完遂力 / 短所：慎重すぎて決断に時間がかかる傾向',
      task: '研究やプロジェクトでの意思決定の場面',
      action: '短所への対策として「80%の完成度で一度上司に中間相談する」ルールを自らに課す',
      result: 'スピードと品質の両立ができるようになった',
    },
    modelAnswerJp:
      '私の長所は、困難な課題に対しても諦めずに解決策を模索し続ける「粘り強さ」です。\n一方で短所は、細部にこだわりすぎて意思決定に時間をかけてしまう点です。大学の研究でも、完璧なデータを求めるあまり分析の着手が遅れそうになったことがありました。現在はこの課題を克服するため、「全体の80%の段階で一度メンターに中間報告を行う」「作業ごとに期限をあらかじめ設ける」というルールを徹底し、スピード感を持った遂行を心がけております。',
    modelAnswerEn:
      'My strength is tenacity—not giving up when encountering difficult roadblocks. On the other hand, my weakness is a tendency to take too long to decide because I seek perfection. To counteract this, I now strictly adhere to checking in with mentors at the 80% mark and setting strict milestone deadlines.',
    keyPhrases: ['長所は〜です', '一方で短所といたしましては', '克服するための工夫として', '〜を心がけております'],
    commonPitfalls: ['Sharing a fatal red-flag weakness like "I cannot wake up on time"', 'Saying "I have no weaknesses"'],
    jlptMinLevel: 'N3',
  },
  {
    id: 'iq-entry-05',
    modeId: 'basic_entry',
    category: '日本で働く理由 (Why Work in Japan)',
    questionJp: '母国でもキャリアを築ける中で、なぜ日本で就職したいと考えたのですか。',
    questionReading: 'ぼこくでも キャリアを きずけるなかで、なぜ にほんで しゅうしょくしたいと かんがえたのですか。',
    questionEn: 'Given that you could build a career in your home country, why do you want to work in Japan?',
    interviewerIntent: 'Evaluates long-term stability, genuine cultural/professional respect, and commitment against early departure.',
    starFramework: {
      situation: '日本のものづくりやサービス精神への深い感銘',
      task: '国際的な視野と日本の緻密なビジネス手法の融合',
      action: 'JLPT N1取得や日本企業でのインターンシップに積極的に挑戦',
      result: '日本を拠点にグローバル市場へ価値を還元する決意',
    },
    modelAnswerJp:
      '日本で就職を志望する最大の理由は、徹底した「品質へのこだわり」と「相手の期待を超えるおもてなし精神」をビジネスの現場で深く学びたいためです。\n母国での大学時代に日本のクラウドサービスを利用した際、障害の少なさと細やかなサポート対応に感銘を受けました。私は単に日本に滞在したいのではなく、日本の高い技術力と組織規律を体得し、日本と海外を結ぶビジネスの架け橋として長期的に成長したいと強く望んでおります。',
    modelAnswerEn:
      'My primary reason is a desire to learn first-hand Japan’s extraordinary dedication to quality and service that exceeds client expectations. While using Japanese cloud services in my home country, I was deeply impressed by their reliability. I wish to internalize these organizational disciplines and serve as a long-term bridge between Japan and global markets.',
    keyPhrases: ['品質へのこだわり', '相手の期待を超える', '〜に感銘を受けました', '架け橋として貢献したい'],
    commonPitfalls: ['Answering solely based on anime/manga pop culture', 'Giving impression of a short 1-year stay'],
    jlptMinLevel: 'N2',
  },
  {
    id: 'iq-entry-06',
    modeId: 'basic_entry',
    category: '入社後のキャリアビジョン (Career Vision)',
    questionJp: '入社後、3年後および5年後にどのような人材になっていたいですか。',
    questionReading: 'にゅうしゃご、さんねんご および ごねんごに どのような じんざいになっていたいですか。',
    questionEn: 'What kind of professional do you aspire to become 3 and 5 years after joining?',
    interviewerIntent: 'Checks ambition, realistic understanding of onboarding progression, and long-term career drive.',
    starFramework: {
      situation: '入社1年目：基本業務の習得と自立した一人前への成長',
      task: '3年後：中核メンバーとして後輩指導とプロジェクト推進',
      action: '5年後：多国籍チームのリードまたは新規事業の推進',
      result: '会社にとって不可欠な牽引役となる',
    },
    modelAnswerJp:
      '入社後3年間は、まず現場の基礎業務と開発プロセスを徹底的にマスターし、「李に任せれば安心だ」とチームから信頼される一人前のプレイヤーを目指します。\nそして5年後には、持ち前の語学力と技術的知見を活かし、海外展開プロジェクトにおいて多国籍チームを束ねるプロジェクトリーダーとして、貴社の事業成長を牽引する中核人材になりたいと考えております。',
    modelAnswerEn:
      'In my first 3 years, I aim to master our operational and engineering processes completely, becoming a reliable team pillar whom colleagues trust without reservation. By year 5, leveraging my multilingual and technical skills, I aspire to lead multinational teams in global expansion projects, driving your corporate growth.',
    keyPhrases: ['一人前のプレイヤーを目指します', 'チームから信頼される', '中核人材として牽引したい', '〜に貢献したいと存じます'],
    commonPitfalls: ['Unrealistic jump like "I want to be executive in 2 years"', 'Vague statements with no milestones'],
    jlptMinLevel: 'N2',
  },

  // --- MODE 2: MID-CAREER ---
  {
    id: 'iq-mid-01',
    modeId: 'mid_career',
    category: '職務経歴の要約 (Professional Summary)',
    questionJp: 'これまでの職務経歴と、最も誇れる実績について要約してお話しください。',
    questionReading: 'これまでの しょくむけいれきと、もっとも ほこれる じっせきについて ようやくしておはなしください。',
    questionEn: 'Please summarize your career history and the accomplishment you are most proud of.',
    interviewerIntent: 'Evaluates concise communication of professional competence, quantifiable outcomes, and relevance to the new role.',
    starFramework: {
      situation: '前職での5年間のB2B SaaSエンジニア経験',
      task: '月間1,000万PVの大規模決済基盤のパフォーマンス改善',
      action: 'データベースインデックスの再設計とAPIレスポンスの非同期化を主導',
      result: 'レスポンス速度を40%改善し、年間解約率を前年比で2.5%削減',
    },
    modelAnswerJp:
      'これまで約5年間、B2B向けSaaS企業においてバックエンドエンジニアとして決済システムの開発・運用に従事してまいりました。\n最も誇れる実績は、システム負荷が急増した際のデータベース最適化プロジェクトをテックリードとして主導したことです。ボトルネックとなっていたクエリを精査し、非同期キャッシュ機構を導入した結果、APIの平均レスポンスタイムを40%短縮し、システムダウンタイムゼロを達成いたしました。この経験で培った大規模トラフィック耐性の知見を、貴社の新基盤開発に直ちに還元いたします。',
    modelAnswerEn:
      'For approximately 5 years, I served as a backend engineer developing payment systems at a B2B SaaS company. My proudest achievement was leading a DB optimization project as tech lead when traffic spiked. By revamping slow queries and introducing asynchronous caching, we reduced average API response time by 40% with zero downtime.',
    keyPhrases: ['〜に従事してまいりました', 'テックリードとして主導し', '〜を達成いたしました', '直ちに還元できると確信しております'],
    commonPitfalls: ['Listing technical jargon without explaining business impact', 'Omitting metrics (percentages, numbers)'],
    jlptMinLevel: 'N2',
  },
  {
    id: 'iq-mid-02',
    modeId: 'mid_career',
    category: '転職理由 (Reason for Changing Jobs)',
    questionJp: '現職（前職）でご活躍されている中で、今回転職を決意された理由は何ですか。',
    questionReading: 'げんしょくで ごかつやくされているなかで、こんかい てんしょくを けついされた りゆうは なんですか。',
    questionEn: 'While being successful in your current role, what motivated you to change jobs at this time?',
    interviewerIntent: 'Checks forward-looking motivation versus complaints about colleagues/salary, and alignment with target company mission.',
    starFramework: {
      situation: '現職での確かな実績と一定の達成感',
      task: '更なるキャリア拡大（よりグローバルで社会的影響力の大きいドメインへの挑戦）',
      action: '自身の培った強みをより大きなスケールで試したいという前向きな動機',
      result: '貴社こそがその挑戦に最適な環境であるという論理的帰結',
    },
    modelAnswerJp:
      '現職ではチームメンバーにも恵まれ、決済基盤の安定運用という重責を果たせたことに大変感謝しております。\n一方で、事業が国内市場に特化していたため、よりグローバルなスケーラビリティを求められる環境で自らの技術力を試したいという思いが強くなりました。貴社はアジア全域を視野に入れた大規模プラットフォームを展開されており、現職で培った高負荷分散の知見を活かしながら、よりダイナミックな社会課題の解決に挑みたいと考え、転職を決意いたしました。',
    modelAnswerEn:
      'I am very grateful for my current team and proud of maintaining our payment infrastructure reliably. However, as our business focused purely on the domestic market, I developed a strong desire to test my technical skills in a global scale environment. Your company operates across Asia, offering the exact dynamic platform where my distributed system experience can deliver maximum impact.',
    keyPhrases: ['大変感謝しております', '一方で、〜という思いが強くなりました', 'よりダイナミックな環境で', '挑戦したいと考え決意いたしました'],
    commonPitfalls: ['Criticizing previous company or boss', 'Focusing only on salary or remote work convenience'],
    jlptMinLevel: 'N1',
  },
  {
    id: 'iq-mid-03',
    modeId: 'mid_career',
    category: '即戦力としての貢献 (Immediate Value Contribution)',
    questionJp: 'もしご縁があって入社いただいた場合、最初の90日間でどのような貢献ができますか。',
    questionReading: 'もし ごえんがあって にゅうしゃいただいた ばあい、さいしょの きゅうじゅうにちかんで どのような こうけんが できますか。',
    questionEn: 'If selected, what concrete contribution can you make within your first 90 days?',
    interviewerIntent: 'Tests candidate pragmatism, onboarding humility, and clear comprehension of company current operational reality.',
    starFramework: {
      situation: '初月（1〜30日）：既存コードベース・業務フロー・チーム文化の徹底理解',
      task: '2ヶ月目（31〜60日）：小〜中規模タスクの迅速な消化とチームへの信頼構築',
      action: '3ヶ月目（61〜90日）：重要機能の実装を自律推進し、改善提案を実行',
      result: '最小のサポートで即座に生産性を生み出す',
    },
    modelAnswerJp:
      '最初の30日間は、既存のアーキテクチャと開発フロー、社内文化を徹底的にインプットし、チームメンバーとの信頼関係構築に専念いたします。\n続く60日目までには、小・中規模の課題解決やレビュー業務を通じて自律的にチケットを消化し、開発速度の向上に寄与します。そして90日目までには、前職で培った自動テスト自動化とCI/CDのノウハウを共有し、チーム全体のリリースサイクルの短縮に貢献する具体的なアウトプットをお出ししたいと考えております。',
    modelAnswerEn:
      'In the first 30 days, I will immerse myself in your architecture, workflows, and culture while building rapport. By day 60, I will independently resolve small-to-mid size tickets to accelerate team velocity. By day 90, I plan to introduce automated testing and CI/CD best practices to tangibly shorten our overall release cycle.',
    keyPhrases: ['信頼関係構築に専念いたします', '自律的に業務を消化し', '〜のノウハウを共有し', '具体的なアウトプットをお出しします'],
    commonPitfalls: ['Promising unrealistic overhauls before understanding the codebase', 'Passive stance ("I will wait for instructions")'],
    jlptMinLevel: 'N1',
  },

  // --- MODE 3: TECH & DX ENGINEER ---
  {
    id: 'iq-tech-01',
    modeId: 'tech_dx',
    category: '技術選定・アーキテクチャ (Architecture & Tech Selection)',
    questionJp: '過去のプロジェクトで、どのような基準で技術選定を行いましたか。トレードオフも含めて教えてください。',
    questionReading: 'かこの プロジェクトで、どのような きじゅんで ぎじゅつせんていを おこないましたか。トレードオフも ふくめて おしえてください。',
    questionEn: 'In past projects, what criteria guided your technology stack selection? Please explain the trade-offs involved.',
    interviewerIntent: 'Evaluates logical engineering judgment beyond chasing tech trends—considers team capability, maintenance costs, and SLA.',
    starFramework: {
      situation: 'リアルタイム通知基盤の刷新プロジェクト',
      task: 'ポーリング型からWebSocket/gRPCへの移行検討',
      action: '最新技術の魅力だけでなく運用保守コストとチームの学習曲線を比較検証',
      result: 'Go + WebSocketを採用し、レイテンシを80%削減しつつ安定稼働を実現',
    },
    modelAnswerJp:
      '技術選定においては、「流行」ではなく「ビジネス要件への適合性」「運用保守コスト」「チームの習熟度」の3軸で客観的に評価することを信条としております。\n以前、数万ユーザーへのリアルタイム配信基盤を構築した際、gRPCとWebSocketで比較検討を行いました。性能面ではgRPCが優位でしたが、社内フロントエンドチームの学習コストとデバッグ容易性を鑑み、今回はGoとWebSocketの組み合わせを採用いたしました。結果として開発工数を予定より2週間前倒しでき、公開後も障害ゼロで安定運用を継続できております。',
    modelAnswerEn:
      'My principle in technology selection is never choosing tools for hype, but balancing business requirements, maintenance overhead, and team learning curves. When redesigning real-time notifications, we evaluated gRPC vs. WebSocket. While gRPC had micro-benchmarks advantages, considering frontend team ramp-up speed and debugging ease, we chose Go + WebSocket. We finished 2 weeks early with zero incidents.',
    keyPhrases: ['流行ではなく〜を信条としております', '比較検討を行いました', 'トレードオフを鑑み', '安定運用を継続できております'],
    commonPitfalls: ['Saying "I chose it because it is popular/new"', 'Ignoring maintenance and team skills'],
    jlptMinLevel: 'N1',
  },
  {
    id: 'iq-tech-02',
    modeId: 'tech_dx',
    category: 'システム障害対応 (Incident Handling & Post-Mortem)',
    questionJp: 'これまで経験した重大なシステム障害と、その際の一次対応および再発防止策について教えてください。',
    questionReading: 'これまで けいけんした じゅうだいな システムしょうがいと、そのさいの いちじたいおう および さいはつぼうしさくについて おしえてください。',
    questionEn: 'Tell us about a critical system incident you experienced, your immediate response, and long-term countermeasures.',
    interviewerIntent: 'Measures calm crisis leadership, transparency in reporting (HORENSO), and rigorous blameless post-mortem methodology.',
    starFramework: {
      situation: 'セール初日のアクセス集中によるデータベースコネクション枯渇',
      task: '即時のサービス復旧と顧客データ保全',
      action: '一時的なリードレプリカ増強とコネクションプールのチューニングを30分で実施',
      result: '事後に根本原因（N+1クエリ）を解消し、負荷テストの自動化をCIに組み込み再発を根絶',
    },
    modelAnswerJp:
      '大規模セール開始直後、アクセス集中によりコネクションプールが枯渇し、API応答が途絶する障害が発生した際のことです。\n一次対応として、まずは経営陣およびカスタマーサポートへ状況を迅速に共有（報連相）した上で、リードレプリカの緊急プロビジョニングと流量制限を実施し、発生から35分で暫定復旧させました。その後、なぜコネクションが滞留したかを分析し、特定エンドポイントにおけるN+1クエリが主因であると特定いたしました。再発防止策として、クエリレビューの自動リントと、本番同等規模の負荷試験をCIパイプラインに義務付け、以後のセールでは同種の問題を完全に防止いたしました。',
    modelAnswerEn:
      'During a major sale launch, our connection pool exhausted due to sudden traffic spikes, causing API timeouts. As immediate triage, I reported status transparently to leadership and CS, provisioned read replicas, and rate-limited traffic to restore service within 35 minutes. Post-mortem revealed an N+1 query. We instituted automated query linting and mandatory load tests in CI, eliminating recurrence permanently.',
    keyPhrases: ['迅速に共有した上で', '一次対応として〜を実施し', '根本原因を特定いたしました', '再発防止策を義務付けました'],
    commonPitfalls: ['Blaming junior colleagues or third-party vendors', 'Lacking preventive systemic solutions'],
    jlptMinLevel: 'N1',
  },

  // --- MODE 4: SALES & BUSINESS DEV ---
  {
    id: 'iq-sales-01',
    modeId: 'sales_biz',
    category: '営業実績と行動量 (Sales Track Record & Activity)',
    questionJp: 'これまでの営業活動において、目標達成に向けた行動量や工夫について数字を用いて教えてください。',
    questionReading: 'これまでの えいぎょうかつどうにおいて、もくひょうたっせいに むけた こうどうりょうや くふうについて すうじを もちいて おしえてください。',
    questionEn: 'In your sales career, how did you manage activity volume and creative strategy to hit targets? Please use numbers.',
    interviewerIntent: 'Checks drive, pipeline discipline, customer empathy, and clear metrics orientation (KPIs, conversion rates).',
    starFramework: {
      situation: '年間売上目標1億2,000万円（前年比130%）の挑戦',
      task: '新規開拓におけるアポイント獲得率の低迷',
      action: '業種ごとの課題分析に基づくパーソナライズされた事例レポートを持参するアプローチに変更',
      result: '商談化率を15%から35%へ向上させ、年間達成率142%を記録',
    },
    modelAnswerJp:
      '前職での法人向けSaaS営業において、年間1億2,000万円の売上目標に対し、達成率142%を記録いたしました。\n単にテレアポの架電数を増やすのではなく、ターゲット企業のIR資料や有価証券報告書を読み込み、個別の経営課題に即した「3ページの改善提案レター」を自作して送付する手法を徹底しました。この工夫により、初回アポイント獲得率を従来の15%から35%へと倍増させ、大型契約の受注に繋げました。顧客の真の課題に寄り添う「提案型営業」こそが私の最大の強みです。',
    modelAnswerEn:
      'In B2B SaaS sales, I achieved 142% of my 120 million JPY annual quota. Rather than raw cold calling, I analyzed prospective client financial reports and crafted tailored 3-page executive briefs addressing their specific operational bottlenecks. This doubled appointment conversion from 15% to 35% and secured enterprise contracts.',
    keyPhrases: ['目標に対し達成率〜%を記録いたしました', '個別の経営課題に即した提案', '商談化率を倍増させ', '提案型営業こそが私の強みです'],
    commonPitfalls: ['Saying "I worked very hard" without exact numbers', 'Talking only about selling products rather than solving problems'],
    jlptMinLevel: 'N2',
  },

  // --- MODE 5: MANAGEMENT & LEADERSHIP ---
  {
    id: 'iq-mgmt-01',
    modeId: 'management',
    category: 'チームの意見対立の解消 (Conflict Resolution)',
    questionJp: 'チームメンバー間で方針の対立が生じた際、リーダーとしてどのように合意形成を図りましたか。',
    questionReading: 'チームメンバーかんで ほうしんの たいりつが しょうじたさい、リーダーとして どのように ごういけいせいを はかりましたか。',
    questionEn: 'When team members experienced sharp disagreements on direction, how did you facilitate consensus as a leader?',
    interviewerIntent: 'Assesses emotional intelligence, active listening, returning to shared customer objectives, and decisive leadership.',
    starFramework: {
      situation: '納期優先派と品質徹底派の間でリリース方針が対立',
      task: 'チームの人間関係を悪化させず、プロジェクト目標を守る合意形成',
      action: '双方の懸念事項を個別ヒアリングで傾聴し、「顧客価値」を共通の判断軸に設定してフェーズ分割リリースを提案',
      result: '全員が納得した上で予定納期に必須機能を公開し、次期版で品質改善を完遂',
    },
    modelAnswerJp:
      '新機能リリースの直前、納期優先を主張するビジネス側と、技術的負債解消を求めるエンジニア側で意見が鋭く対立したことがありました。\nリーダーとして私が最初に行ったのは、双方と1対1で対話し、感情的な反発の背後にある「真の懸念」を傾聴することでした。その上で全員を集め、「今月末の顧客にとっての最優先価値は何か」という共通の判断基準へ議論を引き戻しました。結果として、必須コア機能のみを期限通りにリリースし、リファクタリングを翌スプリントの最優先タスクとする折衷案で合意を形成し、チームの一体感を維持しながら目標を達成いたしました。',
    modelAnswerEn:
      'Right before a launch, our business side prioritizing the deadline clashed with engineers demanding debt cleanup. As leader, I conducted 1-on-1s to uncover underlying concerns, then brought everyone together anchored on one standard: "What creates the most urgent value for our customer this month?" We agreed on phased delivery, preserving team cohesion while protecting targets.',
    keyPhrases: ['真の懸念を傾聴することでした', '共通の判断基準へ議論を引き戻しました', '折衷案で合意を形成し', '一体感を維持しながら目標を達成'],
    commonPitfalls: ['Forcing your own opinion top-down without listening', 'Letting conflict linger passively without resolution'],
    jlptMinLevel: 'N1',
  },

  // --- MODE 6: STRESS & ADAPTABILITY ---
  {
    id: 'iq-stress-01',
    modeId: 'stress_adaptability',
    category: '予期せぬ困難への対処 (Handling Unexpected Setbacks)',
    questionJp: '計画通りに進まない突発的なトラブルに直面した際、どのようにストレスをコントロールし打開しましたか。',
    questionReading: 'けいかくとおりに すすまない とっぱつてきな トラブルに ちょくめんしたさい、どのように ストレスを コントロールし だかいしましたか。',
    questionEn: 'When facing sudden setbacks that disrupted your plan, how did you manage stress and navigate a breakthrough?',
    interviewerIntent: 'Checks emotional stability, proactive reporting to stakeholders, and methodical triage under severe pressure.',
    starFramework: {
      situation: '海外パートナー企業からの納品データ形式の重大な不整合が直前に発覚',
      task: '納期まで残り48時間でのリカバリー',
      action: 'パニックを防ぐため「コントロールできる要素」と「できない要素」を紙に書き出し、関係各所へ即時報連相',
      result: '代替変換スクリプトを夜間作成し、納期の遅延を回避',
    },
    modelAnswerJp:
      '予期せぬトラブルに直面した際は、まず「深呼吸をして事実と感情を切り離すこと」を徹底しております。\n以前、納品直前に外部APIの仕様変更が発覚し、連携がストップする危機がありました。焦りが生じそうになりましたが、即座に上司へ「現在の事実・影響範囲・考えられる3つの対策案」を簡潔に報連相いたしました。その上で、チームで手分けして変換パッチを迅速に開発し、納期遅延を最小限に食い止めました。プライベートでは週末のランニング等でオン・オフの切り替えを徹底しており、常に安定した精神状態で業務に臨むよう自己管理しております。',
    modelAnswerEn:
      'When sudden problems arise, my rule is to separate emotion from objective fact immediately. When a third-party API silently altered specs right before delivery, I suppressed panic and gave my manager a structured HORENSO report detailing the fact, impact, and 3 mitigation proposals. We developed an emergency conversion patch in time. I maintain strict mental fitness through weekend running.',
    keyPhrases: ['事実と感情を切り離すこと', '迅速に報連相いたしました', '考えられる対策案を提示し', 'オン・オフの切り替えを徹底し'],
    commonPitfalls: ['Saying "I never feel stress" (unrealistic)', 'Concealing problems until the last minute'],
    jlptMinLevel: 'N2',
  },

  // --- MODE 7: REVERSE QUESTIONING ---
  {
    id: 'iq-rev-01',
    modeId: 'reverse_question',
    category: '事業戦略への問い (Corporate Strategy & Global Vision)',
    questionJp: '面接官：「私からの質問は以上です。何かご質問はございますか？」',
    questionReading: 'めんせつかん：「わたしからの しつもんは いじょうです。なにか ごしつもんは ございますか？」',
    questionEn: 'Interviewer: "That concludes my questions. Do you have any questions for us?"',
    interviewerIntent: 'Measures intellectual curiosity, strategic understanding, and preparation. Saying "特にありません" is an automatic failure signal.',
    starFramework: {
      situation: '中期経営計画や直近のニュースリリースを事前調査済みであることを示す',
      task: '自らがその戦略の中で果たすべき役割への関心を示す',
      action: '敬意を込めたビジネス敬語で論理的に質問を提起',
      result: '面接官に「この候補者は真剣にうちの未来を考えている」と強く印象付ける',
    },
    modelAnswerJp:
      '貴重なご質問の機会をいただき、誠にありがとうございます。ぜひ1点お伺いしたいことがございます。\n貴社の中期経営計画を拝見し、今後3年間で海外売上比率を現在の20%から40%へ拡大する方針を拝読いたしました。このグローバル展開の加速において、現場のエンジニアリングチームに現在最も求められているケイパビリティや、カルチャー上の変革があれば教えていただけますでしょうか。',
    modelAnswerEn:
      'Thank you very much for this valuable opportunity to ask a question. I would love to ask one point. Having studied your mid-term management plan, I noted your goal to expand overseas revenue from 20% to 40% over the next 3 years. In accelerating this global expansion, what capabilities or cultural mindset are most urgently required from the engineering teams on the ground?',
    keyPhrases: ['貴重なご質問の機会をいただきありがとうございます', '中期経営計画を拝見し', '現場に最も求められている役割', 'お伺いできますと幸いです'],
    commonPitfalls: ['Asking easily googleable facts', 'Asking only about paid leave or remote work perks', 'Saying "特にありません"'],
    jlptMinLevel: 'N2',
  },
  {
    id: 'iq-rev-02',
    modeId: 'reverse_question',
    category: 'チームカルチャー・入社準備 (Team Culture & Preparation)',
    questionJp: '面接官：「最後に、業務や環境面で聞いておきたいことはありますか？」',
    questionReading: 'めんせつかん：「さいごに、ぎょうむや かんきょうめんで きいておきたいことは ありますか？」',
    questionEn: 'Interviewer: "Finally, is there anything you want to know about our daily work or environment?"',
    interviewerIntent: 'Tests eagerness to start contributing immediately and desire to integrate smoothly into team culture.',
    starFramework: {
      situation: '内定獲得後の入社前準備に対する意欲のアピール',
      task: '社内で現在最も成果を挙げている人物像の特徴を質問',
      action: 'プロアクティブな学習姿勢の提示',
      result: '意欲と謙虚さの両立をアピール',
    },
    modelAnswerJp:
      'ありがとうございます。もしご縁をいただけた場合、入社初日からスムーズにチームに貢献できるよう事前準備を進めたいと考えております。\n現在貴社のチームで特に高く評価されている方や活躍されている方に共通する「行動指針」や「マインドセット」があれば、ぜひご教示いただけますでしょうか。また、入社までに自習しておくべき推奨図書や技術スタックがございましたら併せてお伺いできますと幸いです。',
    modelAnswerEn:
      'Thank you. Should I be fortunate enough to receive an offer, I wish to prepare thoroughly to contribute smoothly from day one. Could you share the common mindsets or behavioral traits shared by team members who are currently thriving and most respected in your team? Also, are there recommended books or tech stacks I should study beforehand?',
    keyPhrases: ['初日からスムーズに貢献できるよう', '活躍されている方に共通するマインドセット', '自習しておくべき推奨事項', 'ご教示いただけますと幸いです'],
    commonPitfalls: ['Sounding arrogant', 'Displaying no interest in team culture'],
    jlptMinLevel: 'N2',
  },

  // --- MODE 8: CASUAL CULTURE FIT ---
  {
    id: 'iq-cas-01',
    modeId: 'casual_culture',
    category: '価値観・モチベーション (Work Values & Driver)',
    questionJp: '仕事をする上で、あなたが一番「楽しい」「やりがいがある」と感じる瞬間はどんな時ですか？',
    questionReading: 'しごとを するうえで、あなたが いちばん「たのしい」「やりがいがある」と かんじる しゅんかんは どんなときですか？',
    questionEn: 'In your work, at what moment do you feel the greatest enjoyment and sense of purpose?',
    interviewerIntent: 'Checks internal intrinsic motivation, team chemistry, and alignment with company daily operational culture.',
    starFramework: {
      situation: '自身の仕事観の核（顧客の課題解決やチームのブレイクスルー）',
      task: '過去の実体験に基づく具体的なエピソード',
      action: '仲間と知恵を出し合って困難を乗り越えた瞬間',
      result: '貴社の日々の業務でも同じ情熱を発揮できる確信',
    },
    modelAnswerJp:
      '私が最もやりがいを感じるのは、「自分が開発した仕組みによって、現場のユーザーから直接『作業が劇的に楽になった』と感謝の声をいただいた瞬間」です。\n以前の社内ツール刷新の際、最初は操作変更への戸惑いもありましたが、粘り強く現場の要望を取り入れて改善を重ねました。リリース後、業務時間が月20時間削減され、現場の方から笑顔でお礼を言われた時、技術で人の役に立つ喜びを心から実感いたしました。貴社のようにエンドユーザーとの距離が近いサービスで、その情熱を注ぎ込みたいです。',
    modelAnswerEn:
      'I feel the greatest purpose when users directly express gratitude saying "this system made our daily work dramatically easier." During an internal tool redesign, I listened patiently to on-site complaints and iterated relentlessly. When we saved 20 hours a month and users smiled with relief, I felt the true joy of technology serving humanity.',
    keyPhrases: ['最もやりがいを感じるのは', '感謝の声をいただいた瞬間です', '粘り強く改善を重ね', '心から実感いたしました'],
    commonPitfalls: ['Saying "when I get paid" or "when Friday comes"', 'Sounding cold or disconnected from human users'],
    jlptMinLevel: 'N3',
  },

  // --- MODE 9: CASE STUDY ---
  {
    id: 'iq-case-01',
    modeId: 'case_study',
    category: '売上低迷の要因分析 (Diagnosing Revenue Decline)',
    questionJp: 'あるB2Bクラウドサービスの月額解約率（チャーンレート）が過去3ヶ月で2%から5%に急増しました。あなたならどのようなステップで原因を特定し、施策を打ちますか？',
    questionReading: 'ある B2B クラウドサービスの げつがく かいやくりつが かこ さんかげつで にパーセントから ごパーセントに きゅうぞうしました。あなたなら どのような ステップで げんいんを とくていし、せさくを うちますか？',
    questionEn: 'A B2B cloud service monthly churn rate spiked from 2% to 5% over the last 3 months. How would you structure your diagnostic steps and formulate solutions?',
    interviewerIntent: 'Evaluates structured problem solving (MECE), data literacy, prioritization, and business acumen.',
    starFramework: {
      situation: '課題の定義と前提確認（顧客セグメント、直近のプロダクト変更）',
      task: '解約要因のMECEな分解（外部環境 vs 内部要因 / 価格 vs 品質 vs サポート）',
      action: '定量ログ分析と定性インタビューによる仮説検証',
      result: '短期の緊急止血策と中長期のオンボーディング改善策の提示',
    },
    modelAnswerJp:
      '論理的に原因を特定するため、以下の3つのステップでアプローチいたします。\nまず第1に「データのセグメント分解」です。解約が特定の大企業か中小企業か、あるいは利用期間（導入後90日以内か1年以上か）によって偏りがないかを定量分析します。\n第2に「定性的な解約理由のヒアリング」です。直近の解約企業10社へ即座にヒアリングを行い、価格競争の激化なのか、UI刷新に伴う不満なのか、サポート品質なのか仮説を絞り込みます。\n第3に「優先順位付けと施策実行」です。初期解約が多い場合はCSによるオンボーディング伴走を強化し、機能不満であればロードマップを見直します。このように事実に基づき最短で止血策を講じます。',
    modelAnswerEn:
      'I would approach this methodically in 3 structured phases. First: Segment breakdown—analyze quantitatively whether churn is concentrated in enterprise vs. SMEs, or cohort age (first 90 days vs. mature users). Second: Qualitative discovery—interview 10 recently churned accounts to test hypotheses (competitor price wars, UI friction, or support lag). Third: Prioritized remediation—if early churn dominates, reinforce CS onboarding; if feature gaps dominate, adjust product roadmap.',
    keyPhrases: ['以下の3つのステップでアプローチいたします', 'データのセグメント分解', '仮説を検証した上で', '最短で止血策を講じます'],
    commonPitfalls: ['Jumping immediately to a random solution without diagnosing data', 'Overlooking qualitative customer interviews'],
    jlptMinLevel: 'N1',
  },

  // --- MODE 10: FINAL EXECUTIVE ROUND ---
  {
    id: 'iq-exec-01',
    modeId: 'final_executive',
    category: '企業理念への共感と覚悟 (Corporate Philosophy & Commitment)',
    questionJp: '役員：「数ある選択肢の中で、なぜあなたの人生の貴重な時間を弊社の挑戦に捧げようと考えているのですか？」',
    questionReading: 'やくいん：「かずある せんたくしの なかで、なぜ あなたの じんせいの きちょうな じかんを へいしゃの ちょうせんに ささげようと かんがえているのですか？」',
    questionEn: 'Executive: "Among many career options, why are you committed to dedicating this precious chapter of your life to our company’s mission?"',
    interviewerIntent: 'Looks for profound integrity, passion, emotional resonance with corporate purpose, and unshakeable loyalty.',
    starFramework: {
      situation: '自身の人生哲学・価値観と企業の創業精神との運命的な合致',
      task: '単なる給与やスキルの交換ではない、魂のこもった熱意表明',
      action: '困難な状況にあっても逃げずに社運を共にする覚悟',
      result: '面接官の心を動かす決意表明',
    },
    modelAnswerJp:
      '私が貴社に人生を賭けたいと強く願うのは、創業時からの「技術の力で、情報格差のない公正な社会を創る」という企業理念が、私自身の人生の原点と完全に重なり合っているためです。\n私自身、母国で地方に生まれ育ち、テクノロジーに触れたことで人生の可能性が大きく広がったという原体験があります。貴社が展開されている事業は、単なるビジネスの枠を超えて、人々の未来を切り拓く社会インフラであると確信しております。たとえ今後どのような市場の逆風があろうとも、貴社の仲間と共に最後まで粘り強くやり抜き、次世代に誇れる価値を築き上げたいと固く決意しております。',
    modelAnswerEn:
      'Why I wish to dedicate my life to your mission is because your founding philosophy—"Empowering a fair society without information disparities through technology"—completely mirrors my own life story. Growing up in a rural region, discovering technology broadened my life possibilities. Your platforms are not merely commercial products; they are social infrastructure shaping human futures. Regardless of market headwinds, I am resolutely committed to persevering with your team to build generational value.',
    keyPhrases: ['企業理念に深く共鳴いたしました', '私の人生の原点と重なり合っております', 'どのような逆風があろうとも', '固く決意しております'],
    commonPitfalls: ['Giving a lukewarm, purely practical answer', 'Lack of emotional conviction and eye contact'],
    jlptMinLevel: 'N1',
  },
];

// ----------------------------------------------------------------------------
// 10-STEP CAREER COACHING ROADMAP
// ----------------------------------------------------------------------------
export const CAREER_10_STEPS: CareerStepItem[] = [
  {
    stepNumber: 1,
    titleJp: '自己分析と強みの言語化 (Self-Analysis & Strengths)',
    titleEn: 'Self-Analysis & Finding Core Value',
    summary: 'Identify your non-negotiable career anchors, transferable skills, and concrete episodes that highlight your unique value in Japan.',
    actionItems: [
      'List 3 peak achievements and 3 major setbacks with lessons learned',
      'Translate your technical/business skills into Japanese corporate equivalents',
      'Identify what separates you from native applicants (multilingual, global grit)',
    ],
    keyDeliverables: ['自己分析シート (Self-Analysis Matrix)', '強みエピソード集 (STAR Catalog)'],
    recommendedDuration: '1〜2 週間',
  },
  {
    stepNumber: 2,
    titleJp: '業界・企業研究と競争優位の把握 (Industry & Company Research)',
    titleEn: 'Market Research & Competitive Moats',
    summary: 'Analyze Japanese corporate tiers: Global enterprises, high-growth startups, traditional corporations, and DX consultancies.',
    actionItems: [
      'Read target company IR reports, Medium/Zenn engineering blogs, and Press Releases',
      'Understand their corporate philosophy (企業理念) and business model',
      'Map industry competitors to articulate "Why this company and not others"',
    ],
    keyDeliverables: ['企業分析ノート (Target Dossier)', '競合他社比較表 (Competitor Matrix)'],
    recommendedDuration: '1〜2 週間',
  },
  {
    stepNumber: 3,
    titleJp: '日本式履歴書の作成 (Japanese Rirekisho Mastery)',
    titleEn: 'Standard Japanese Resume (履歴書)',
    summary: 'Craft a flawless JIS-standard Rirekisho with proper photo etiquette, school/work chronologies, and precise Japanese phrasing.',
    actionItems: [
      'Format chronological history with proper 年 (Western vs Japanese calendar)',
      'Write polite, compelling 志望動機 (Motivation) and 本人希望欄',
      'Verify zero typographical errors (誤字脱字チェック)',
    ],
    keyDeliverables: ['JIS規格 履歴書 PDF / Word', '証明写真データ (Professional Photo)'],
    recommendedDuration: '3〜5 日',
  },
  {
    stepNumber: 4,
    titleJp: '職務経歴書の作成 (Shokumu Keirekisho Engineering)',
    titleEn: 'Professional Work History (職務経歴書)',
    summary: 'Structure your professional achievements into executive summary, project tables with metrics, and self-PR.',
    actionItems: [
      'Write a 3-line punchy 職務要約 (Executive Summary)',
      'Structure every project with: Duration, Scope, Team Size, Role, Technologies, and Quantifiable Achievements',
      'Ensure high-impact business Japanese phrasing (eliminate casual verbs)',
    ],
    keyDeliverables: ['職務経歴書 (2〜3 pages)', 'ポートフォリオ / GitHubリンク'],
    recommendedDuration: '1 週間',
  },
  {
    stepNumber: 5,
    titleJp: '求人票の読解と要件マッチング (Job Description Analysis)',
    titleEn: 'Job Description (JD) Deep-Dive',
    summary: 'Deconstruct Japanese JDs into 必須要件 (Must-haves), 歓迎要件 (Nice-to-haves), and 求める人物像 (Cultural Persona).',
    actionItems: [
      'Highlight keywords in JD and mirror them naturally in your application',
      'Identify JLPT level demand vs actual everyday workplace requirement',
      'Prepare concrete answers addressing every single 必須要件',
    ],
    keyDeliverables: ['求人要件適合チェックリスト (JD Match Sheet)'],
    recommendedDuration: '3 日',
  },
  {
    stepNumber: 6,
    titleJp: 'エントリーシート・書類選考対策 (Entry Sheet & Applications)',
    titleEn: 'Application Submission & ES Strategy',
    summary: 'Draft concise 300-to-800 character responses to common written essay prompts (ガクチカ, 志望動機, 困難克服).',
    actionItems: [
      'Adhere strictly to character count limits (90% to 98% filled)',
      'Follow conclusion-first PREP structure (Point, Reason, Example, Point)',
      'Proofread with native Japanese peer or AI Coach',
    ],
    keyDeliverables: ['完成版 ES テキスト一式 (ES Submissions)'],
    recommendedDuration: '1 週間',
  },
  {
    stepNumber: 7,
    titleJp: '1次・2次面接対策 (Behavioral & Technical Rounds)',
    titleEn: 'Initial & Technical Interview Rounds',
    summary: 'Simulate behavioral and role-specific interviews with structured STAR answers and fluent business honorifics.',
    actionItems: [
      'Practice 1-minute self-introduction until effortless delivery',
      'Prepare 10 core STAR stories adapting to any question',
      'Record your speaking practice to inspect posture, eye contact, and tone',
    ],
    keyDeliverables: ['模擬面接録音/録画レビュー (Mock Interview Review)'],
    recommendedDuration: '1〜2 週間',
  },
  {
    stepNumber: 8,
    titleJp: '役員面接・最終面接の突破 (Executive & Final Round)',
    titleEn: 'Final Round with Board Members',
    summary: 'Persuade company executives of your long-term loyalty, cultural fit, and deep resonance with their mission.',
    actionItems: [
      'Refine your commitment statement (覚悟と熱意)',
      'Prepare strategic reverse questions about corporate 5-year outlook',
      'Align personal growth trajectory with company revenue roadmap',
    ],
    keyDeliverables: ['役員面接想定問答集 (Executive Q&A Playbook)'],
    recommendedDuration: '3〜5 日',
  },
  {
    stepNumber: 9,
    titleJp: '内定獲得と条件交渉・入社承諾 (Offer, Negotiation & Acceptance)',
    titleEn: 'Offer Negotiation & Formal Acceptance',
    summary: 'Review 内定通知書 (Offer Letter), evaluate compensation packages, navigate polite start-date adjustments, and accept with grace.',
    actionItems: [
      'Verify base salary, bonuses, deemed overtime (固定残業代), and social insurance',
      'Draft formal acceptance letter in polished Japanese',
      'Politely decline other offers with maximum professional etiquette',
    ],
    keyDeliverables: ['入社承諾書 (Offer Acceptance)', '他社辞退連絡メール (Decline Notice)'],
    recommendedDuration: '1 週間',
  },
  {
    stepNumber: 10,
    titleJp: '入社前準備とオンボーディング (Pre-Boarding & First 90 Days)',
    titleEn: 'Visa Transition, Pre-Boarding & Onboarding',
    summary: 'Navigate work visa transition (在留資格変更), workplace greetings, and establishing initial credibility in Japan.',
    actionItems: [
      'Prepare Immigration Bureau documents (COE / 就労ビザ申請書類)',
      'Prepare first-day office greeting speech (着任の挨拶)',
      'Review Japanese business email, HORENSO, and seating rules before day one',
    ],
    keyDeliverables: ['就労ビザ取得 (Work Visa Issued)', '初日挨拶スピーチ原稿 (Day 1 Speech)'],
    recommendedDuration: '2〜4 週間',
  },
];

// ----------------------------------------------------------------------------
// RESUME PHRASING COACHING DICTIONARY (Casual ➔ Corporate Transformation)
// ----------------------------------------------------------------------------
export const RESUME_WORDING_TRANSFORMATIONS: ResumeWordingTransformation[] = [
  {
    casualPhrase: 'ウェブアプリを作りました。',
    casualReading: 'ウェブアプリを つくりました。',
    issue: 'Casual and amateurish. Lacks corporate ownership, scope, and technical depth.',
    polishedCorporatePhrase: 'BtoC向けWebアプリケーションの設計およびフルスタック開発に従事いたしました。',
    polishedReading: 'ビートゥーシーむけ ウェブアプリケーションの せっけい および フルスタックかいはつに じゅうじいたしました。',
    category: 'achievement',
    explanation: 'Using 「〜の設計および開発に従事いたしました」 demonstrates professional engineering rigor and formal humility.',
  },
  {
    casualPhrase: '一生懸命頑張って売上を伸ばしました。',
    casualReading: 'いっしょうけんめい がんばって うりあげを のばしました。',
    issue: 'Subjective emotional appeal with zero actionable metrics or strategy.',
    polishedCorporatePhrase: '顧客課題に基づく提案型営業を徹底し、年間売上目標に対して前年比125%の達成を記録いたしました。',
    polishedReading: 'こきゃくかだいに もとづく ていあんがたえいぎょうを てっていし、ねんかんうりあげもくひょうに たいして ぜんねんひ ひゃくにじゅうごパーセントの たっせいを きろくいたしました。',
    category: 'achievement',
    explanation: 'Replace vague emotional words like 「一生懸命」 with the concrete methodology and exact percentage achievements.',
  },
  {
    casualPhrase: 'リーダーをやりました。',
    casualReading: 'リーダーを やりました。',
    issue: 'Childish expression 「やりました」 diminishes perceived leadership gravitas.',
    polishedCorporatePhrase: '多国籍エンジニア5名からなる開発チームのスクラムマスターとして、プロジェクト進行を牽引いたしました。',
    polishedReading: 'たこくせきエンジニア ごめいからなる かいはつチームの スクラムマスターとして、プロジェクトしんこうを けんいんいたしました。',
    category: 'leadership',
    explanation: 'Specify team composition, modern agile methodology, and use 「進行を牽引いたしました (spearheaded progress)」.',
  },
  {
    casualPhrase: 'みんなと仲良く協力しました。',
    casualReading: 'みんなと なかよく きょうりょくしました。',
    issue: 'Sounds like elementary school friendship rather than cross-functional synergy.',
    polishedCorporatePhrase: '関係部署との緊密な連携と積極的な合意形成を主導し、円滑なプロジェクト推進に寄与いたしました。',
    polishedReading: 'かんけいぶしょとの きんみつな れんけいと せっきょくてきな ごういけいせいを しゅどうし、えんかつな プロジェクトすいしんに きよいたしました。',
    category: 'cooperation',
    explanation: 'Corporate synergy requires expressions like 「緊密な連携」「合意形成を主導」「円滑な推進に寄与」.',
  },
  {
    casualPhrase: 'バグが多くて大変だったけど直しました。',
    casualReading: 'バグが おおくて たいへんだったけど なおしました。',
    issue: 'Whining tone ("大変だった") without diagnostic structure.',
    polishedCorporatePhrase: '不具合の原因を静的解析により迅速に特定し、自動テストの導入を通じて品質安定化を実現いたしました。',
    polishedReading: 'ふぐあいの げんいんを せいてきかいせきにより じんそくに とくていし、じどうテストの どうにゅうを つうじて ひんしつあんていかを じつげんいたしました。',
    category: 'problem_solving',
    explanation: 'Focus on root-cause analysis (原因特定) and systematic prevention (品質安定化の実現).',
  },
  {
    casualPhrase: '日本語を勉強したいから御社に入りたいです。',
    casualReading: 'にほんごを べんきょうしたいから おんしゃに はいりたいです。',
    issue: 'Disastrous motivation. Companies hire to generate business value, not to run a subsidized language school for candidates.',
    polishedCorporatePhrase: '貴社が推進されるグローバル展開において、自身の多言語コミュニケーション力と技術知見を結集し、即戦力として事業貢献を果たしたいと考え志望いたしました。',
    polishedReading: 'きしゃが すいしんされる グローバルてんかいにおいて、じしんの たげんごコミュニケーションりょくと ぎじゅつちけんを けっしゅうし、そくせんりょくとして じぎょうこうけんを はたしたいと かんがえ しぼういたしました。',
    category: 'motivation',
    explanation: 'Never position yourself as a passive receiver ("I want to learn"). Position yourself as an active value contributor.',
  },
  {
    casualPhrase: '指示されたタスクをきちんとこなしました。',
    casualReading: 'しじされた タスクを きちんと こなしました。',
    issue: 'Passive "order-taker" mindset. Lacks autonomous ownership.',
    polishedCorporatePhrase: '業務フローの課題を能動的に発見・改善し、運用工数の20%削減を自律的に達成いたしました。',
    polishedReading: 'ぎょうむフローの かだいを のうどうてきに はっけん・かいぜんし、うんようこうすうの にじゅっパーセントさくげんを じりつてきに たっせいいいたしました。',
    category: 'achievement',
    explanation: 'Highlight proactivity (能動的), autonomous execution (自律的に達成), and efficiency metrics (工数削減).',
  },
];

// ----------------------------------------------------------------------------
// DEFAULT RIREKISHO & SHOKUMU KEIREKISHO TEMPLATES (For Interactive Workspace)
// ----------------------------------------------------------------------------
export const DEFAULT_RIREKISHO_TEMPLATE: RirekishoRecord = {
  personalInfo: {
    fullNameJp: '李 承民',
    furigana: 'リ スンミン',
    birthDate: '1998-05-15',
    gender: '男性',
    currentAddress: '東京都新宿区西新宿2丁目8-1 新宿タワー501',
    addressFurigana: 'とうきょうとしんじゅくく にししんじゅくにちょうめ はちのいち',
    email: 'seungmin.lee.japan@example.com',
    phone: '080-1234-5678',
  },
  educationHistory: [
    { year: 2017, month: 4, description: '韓国 延世大学校 工学部 コンピュータ工学科 入学' },
    { year: 2021, month: 3, description: '韓国 延世大学校 工学部 コンピュータ工学科 卒業' },
    { year: 2021, month: 4, description: '東京大学大学院 情報理工学系研究科 修士課程 入学' },
    { year: 2023, month: 3, description: '東京大学大学院 情報理工学系研究科 修士課程 修了' },
  ],
  workHistory: [
    { year: 2023, month: 4, description: 'グローバルネクスト株式会社 入社（ソフトウェアエンジニア）' },
    { year: 2026, month: 9, description: '一身上の都合により退職予定' },
  ],
  certifications: [
    { year: 2022, month: 12, name: '日本語能力試験 (JLPT) N1 合格 (168/180点)' },
    { year: 2023, month: 6, name: 'AWS Certified Solutions Architect – Associate 取得' },
    { year: 2024, month: 10, name: 'ビジネス日本語能力テスト (BJT) J1 取得' },
  ],
  motivationJp:
    '貴社が推進される次世代DX基盤事業において、私の技術力と多言語による合意形成力を活かし、グローバル市場への事業拡大に即戦力として貢献したいと考え志望いたしました。',
  specialSkillsJp: 'Python, TypeScript, Go言語による分散システム開発 / 英語・韓国語・日本語の3言語によるビジネス交渉',
  commuteHours: 0.75,
  dependentsCount: 0,
};

export const DEFAULT_SHOKUMU_KEIREKISHO_TEMPLATE: ShokumuKeirekishoRecord = {
  executiveSummary:
    '大学院修了後、ソフトウェアエンジニアとしてWebサービスおよび大規模データ処理基盤の設計・開発・運用に約3年間従事。直近ではテックリードとして5名のエンジニアチームを牽引し、高負荷分散決済システムのAPIレスポンス40%改善およびゼロダウンタイム運用を達成。多国籍チームにおける円滑な合意形成と、ビジネス指標（KPI）に直結する設計を強みとする。',
  coreCompetencies: [
    'バックエンド開発（Go, TypeScript, Python, Node.js）',
    'クラウドインフラ・CI/CD構築（AWS, Docker, Kubernetes, GitHub Actions）',
    'リレーショナル・NoSQLデータベース最適化（PostgreSQL, Redis）',
    'アジャイル・スクラム開発マネジメント（Jira, スクラムマスター経験）',
    '3言語による異文化コミュニケーション（日本語N1・英語ビジネス・韓国語母国語）',
  ],
  projects: [
    {
      id: 'proj-1',
      period: '2024年4月〜現在',
      projectName: '大規模B2B SaaS決済基盤のパフォーマンス最適化およびマイクロサービス化',
      role: 'テックリード / メインエンジニア',
      teamSize: '6名（自社開発）',
      description: '急激なトラフィック増大に伴うDB接続枯渇を解消するため、モノリス構成からマイクロサービスアーキテクチャへの段階的リプレイスを主導。',
      technologiesOrSkills: ['Go', 'PostgreSQL', 'Redis', 'AWS ECS', 'Docker', 'Terraform'],
      achievementsWithMetrics: 'API平均応答速度を450msから180msへ60%短縮。月間1,500万件のトランザクションを障害ゼロで処理し、年間システム運用コストを15%削減。',
    },
    {
      id: 'proj-2',
      period: '2023年4月〜2024年3月',
      projectName: '多言語カスタマーサポートプラットフォームの新規機能開発',
      role: 'バックエンドエンジニア',
      teamSize: '8名（グローバル混成チーム）',
      description: '日・英・韓の多言語対応チャットボット基盤およびFAQ自動推薦システムのAPI設計と実装を担当。',
      technologiesOrSkills: ['TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'OpenAI API'],
      achievementsWithMetrics: '社内CSチームの問い合わせ一次回答時間を平均30%短縮。多国籍メンバー間の技術仕様書を英語・日本語で整備し、開発手戻りを半減。',
    },
  ],
  selfPR:
    '私の最大の強みは、「技術的な探究心」と「関係者を巻き込んでゴールへ導く推進力」の両立です。国籍や職種の異なるステークホルダーと対話する際も、常に顧客にとっての価値を共通の判断軸に据え、粘り強く合意を形成してまいりました。貴社の挑戦的なプロダクト開発においても、チームの力を最大化しながら早期に事業成果をお届けいたします。',
};

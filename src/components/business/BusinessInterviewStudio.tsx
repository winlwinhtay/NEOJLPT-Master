// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) INTERVIEW & RESUME STUDIO
// Japanese Job Interview Simulation, Entry Sheet (ES) & Reverse Questions
// ============================================================================

import React, { useState } from 'react';
import {
  Users2,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { AudioButton } from '../common/AudioButton';

export const BusinessInterviewStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interview' | 'etiquette' | 'resume'>('interview');
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);

  const interviewQuestions = [
    {
      id: 'iq-1',
      category: '自己紹介 (Self-Introduction)',
      questionJp: 'まず最初に、1分程度で簡単な自己紹介をお願いいたします。',
      questionEn: 'First, please give a brief 1-minute self-introduction.',
      intent: 'Assess clarity, logical communication, posture, and natural Japanese delivery under initial tension.',
      formula: [
        '1. Name and University/Background (氏名・所属)',
        '2. Core specialization or project (専攻・専門分野)',
        '3. Key strength with brief context (強みの要約)',
        '4. Enthusiastic closing (本日の意気込み)',
      ],
      modelAnswer:
        '本日はお時間をいただき、誠にありがとうございます。李承民（リ・スンミン）と申します。\n大学では情報工学を専攻し、主に機械学習を用いた自然言語処理の研究に取り組んでまいりました。私の強みは、異文化のチームにおいて目標に向かって合意を形成する「対話力」です。\n本日は、これまで培った技術への情熱と貴社で貢献したいビジョンをお伝えできればと存じます。どうぞよろしくお願い申し上げます。',
      caution:
        'Do not exceed 1 minute (about 300 Japanese characters). Do not recite your entire resume history.',
    },
    {
      id: 'iq-2',
      category: '志望動機 (Why Our Company?)',
      questionJp: '多くの同業他社がある中で、なぜ特に弊社を志望されたのでしょうか。',
      questionEn: 'Among many competitors in this industry, why did you specifically choose to apply to our company?',
      intent: 'Verify company research, understanding of their business model, and long-term commitment to joining.',
      formula: [
        '1. Conclusion: Deep resonance with their corporate philosophy / specific service',
        '2. Concrete experience or observation that triggered this interest',
        '3. Alignment with candidate\'s career goal and specific contribution',
      ],
      modelAnswer:
        '貴社を第一志望とする理由は、単なる受託開発にとどまらず、顧客企業の経営課題に深く入り込み事業変革まで伴走する「パートナーシップ精神」に強く共感したためです。\n私自身、大学の産学連携プロジェクトで企業のDX推進を支援した際、技術そのもの以上に顧客の課題を深く理解することの重要性を痛感いたしました。貴社が推進されているアジア圏への越境DX展開において、私の技術力と多言語力を活かし、即戦力として貢献したいと考え志望いたしました。',
      caution:
        'Never give generic answers that could apply to any competitor. Mention their specific services, values, or market positioning.',
    },
    {
      id: 'iq-3',
      category: 'ガクチカ (Student Experience / Hard Work)',
      questionJp: '学生時代に最も力を入れて取り組んだことと、その成果について教えてください。',
      questionEn: 'Please tell us what you put the greatest effort into during your university years and the result.',
      intent: 'Evaluate problem-solving ability, resilience when facing difficulty, and reproducible teamwork habits.',
      formula: [
        '1. Objective & Challenge faced (目標と直面した壁)',
        '2. Candidate\'s own autonomous initiative (自発的な工夫・行動)',
        '3. Measurable result & takeaway (定量的な成果と学び)',
      ],
      modelAnswer:
        '留学生と日本人学生が協働する国際ハッカソンの企画・運営リーダーとして、参加者満足度を前年比150%に向上させたことです。\n当初、言語や文化の違いによる認識のズレが課題でした。そこで私は、タスクの可視化ボードを導入し、毎朝15分のスタンドアップミーティングを徹底することで、全員が対等に意見を言える環境を構築しました。この経験を通じ、困難な状況下でも粘り強く共通言語を紡ぎ出すリーダーシップを学びました。',
      caution:
        'Focus on what YOU personally did (自発的な行動), not just what the group achieved as a whole.',
    },
    {
      id: 'iq-4',
      category: '逆質問 (Reverse Questions for Interviewer)',
      questionJp: '弊社からの質問は以上となりますが、李様の方から何かご質問はございますか。',
      questionEn: 'That concludes our questions. Do you have any questions for us?',
      intent: 'Gauge candidate enthusiasm, intellectual curiosity, and business insight. Saying "特にありません" (I have nothing) is a major negative signal in Japan.',
      formula: [
        '1. Express thanks for the opportunity to ask',
        '2. High-value question demonstrating research into their strategy or corporate culture',
      ],
      modelAnswer:
        'ご質問の機会をいただきありがとうございます。ぜひ1点お伺いしたいことがございます。\n貴社の中期経営計画を拝見し、今後3年間で海外売上比率を30%まで引き上げる方針を掲げていらっしゃいますが、現場のプロジェクトにおいてグローバル人材に現在最も期待されている役割やマインドセットはどのようなものでしょうか。',
      caution:
        'Never ask about basic salary, vacation days, or easily googleable facts during reverse questioning.',
    },
  ];

  const currentQ = interviewQuestions[selectedQuestionIdx];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users2 className="text-indigo-600 dark:text-indigo-400" size={22} />
            <span>就活・面接対策スタジオ (Job Interview & Career Studio)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            From entering the room to answering core questions (志望動機, 自己PR) and high-impact reverse questions (逆質問).
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('interview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'interview'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            面接頻出質問 Questions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('etiquette')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'etiquette'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            入退室マナー Etiquette
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('resume')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'resume'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            履歴書・ES Guide
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CORE INTERVIEW QUESTIONS */}
      {/* ========================================================================= */}
      {activeTab === 'interview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question List (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Core Interview Questions
            </span>
            {interviewQuestions.map((q, idx) => {
              const isSelected = selectedQuestionIdx === idx;
              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuestionIdx(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block uppercase">
                    {q.category}
                  </span>
                  <h4 className="text-xs font-bold font-japanese text-slate-900 dark:text-white leading-snug">
                    {q.questionJp}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Question Detail & Answer Formula (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                {currentQ.category}
              </span>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black font-japanese text-slate-900 dark:text-white leading-relaxed">
                    「{currentQ.questionJp}」
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">{currentQ.questionEn}</div>
                </div>
                <AudioButton text={currentQ.questionJp} size="md" />
              </div>
            </div>

            {/* Interviewer Intent */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                🎯 面接官の質問意図 (Interviewer's Underlying Intent)
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {currentQ.intent}
              </p>
            </div>

            {/* Answer Structure Formula */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                構成のフレームワーク (Answer Formula)
              </span>
              <div className="space-y-1.5">
                {currentQ.formula.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Model Answer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>模範回答例 (Model Response)</span>
                </span>
                <AudioButton text={currentQ.modelAnswer} size="sm" />
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs font-japanese font-medium text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                {currentQ.modelAnswer}
              </div>
            </div>

            {/* Caution Point */}
            <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
              <span><strong>注意点 (Caution):</strong> {currentQ.caution}</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ROOM ENTRANCE & PHYSICAL ETIQUETTE */}
      {/* ========================================================================= */}
      {activeTab === 'etiquette' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              面接室の入退室マナー（完全手順）
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Japanese interviewers form their primary impression within the first 10 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                入室の手順 (Entering)
              </span>
              <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                <li><strong>ドアを3回ノックする:</strong> 「コン・コン・コン」と3回ノック（2回はトイレ確認とみなされます）。</li>
                <li><strong>「どうぞ」と聞こえたらドアを開ける:</strong> 「失礼いたします」とハキハキ声を出し、一礼して入室。</li>
                <li><strong>静かにドアを閉める:</strong> 後ろ手で閉めず、ドアの方に向き直って両手で静かに閉める。</li>
                <li><strong>椅子の横に立ち一礼:</strong> 「どうぞお掛けください」と言われるまで座らない。</li>
                <li><strong>荷物の置き場所:</strong> カバンは床の上、椅子の横（通路と反対側）に自立させて置く。</li>
              </ol>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                退室の手順 (Exiting)
              </span>
              <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                <li><strong>面接終了の合図:</strong> 座ったまま「本日は貴重なお時間をいただき、誠にありがとうございました」と深々と一礼。</li>
                <li><strong>起立して椅子の横で一礼:</strong> 荷物を持って立ち上がり、椅子の横で「失礼いたします」と30度のお辞儀。</li>
                <li><strong>ドアの手前で振り返る:</strong> ドアを開ける直前に面接官に向き直り、「失礼いたします」と再度45度のお辞儀をして退室。</li>
                <li><strong>会場を出るまでが面接:</strong> エレベーターやビルの敷地を出るまで、スマホを見たり気を抜かない。</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: RESUME & ENTRY SHEET (ES) GUIDE */}
      {/* ========================================================================= */}
      {activeTab === 'resume' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              履歴書・エントリーシート（ES）作成ガイド
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Guidelines for passing the Japanese document screening process.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                1. 年号の統一（西暦 vs 和暦）
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                書類全体で「2026年（西暦）」か「令和8年（和暦）」のどちらかに必ず統一してください。略称（「R8」や「\'26」）は厳禁です。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                2. 志望動機の3大構成
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ①なぜこの業界か ➔ ②なぜこの会社か（他社との決定的な違い） ➔ ③入社後どのように貢献したいか の3段構成で書くことが通過の鉄則です。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                3. 写真（証明写真）の重要性
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                スーツ着用、白・青・グレーの無地背景、3ヶ月以内に撮影された正面写真を使用します。清潔感のある髪型と自然な表情が求められます。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

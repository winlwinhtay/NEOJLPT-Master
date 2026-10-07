// ============================================================================
// CAREER COACH STUDIO (キャリアコーチング・求人票分析・レディネス診断)
// 10-Step Coaching Path, Job Description Analyzer & Corporate Readiness Scorecard
// ============================================================================

import React, { useState } from 'react';
import {
  Compass,
  Briefcase,
  Search,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  FileSearch,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { CAREER_10_STEPS } from '../../data/business/careerJobData';
import { CorporateReadinessScore } from '../../types/business';

export const CareerCoachStudio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'roadmap' | 'jd_analyzer' | 'readiness'>('roadmap');
  const [expandedStepIdx, setExpandedStepIdx] = useState<number | null>(0);

  // Job Description Analyzer state
  const [jdText, setJdText] = useState('');
  const [analyzedJd, setAnalyzedJd] = useState<{
    role: string;
    jlptRequirement: string;
    dailyJapaneseDemand: string;
    mustHaves: string[];
    niceToHaves: string[];
    cultureKeywords: string[];
    tailoredAdvice: string;
  } | null>(null);

  // Preset JDs
  const presetJDs = [
    {
      title: 'B2B SaaS バックエンドエンジニア（フルリモート可）',
      text: `【職種】バックエンドエンジニア（B2B SaaS）
【業務内容】自社SaaSプロダクトのマイクロサービス設計・開発・API保守。
【必須要件】
・Webアプリケーション開発経験3年以上（Go, Python, TypeScript等）
・RDBMSを用いたDB設計・パフォーマンスチューニング経験
・日本語能力：社内での円滑な意思疎通（JLPT N2相当以上。開発仕様の議論や報連相ができること）
【歓迎要件】
・AWS/GCPを用いたクラウドインフラ運用経験
・多国籍エンジニアとの協働経験、英語日常会話力
【求める人物像】
・指示待ちではなく自発的に課題を発見し、チームを巻き込んで解決できる方`,
    },
    {
      title: 'グローバル事業開発・法人営業（海外展開推進）',
      text: `【職種】グローバル事業開発・エンタープライズ営業
【業務内容】アジア圏クライアントへのDXコンサルティング提案、パートナーシップ開拓。
【必須要件】
・法人向けソリューション提案営業経験2年以上
・ビジネスレベルの日本語力（JLPT N1。顧客向けプレゼン、契約交渉、ビジネスメールが単独で完結できること）
・母国語（英語または中国語）ビジネスレベル
【歓迎要件】
・IT・ソフトウェア業界での営業実績、目標達成率120%以上の実績
【求める人物像】
・高い顧客志向とレジリエンスを持ち、異文化の架け橋となれる方`,
    },
  ];

  const handleAnalyzeJD = () => {
    if (!jdText.trim()) return;

    const isTech = /エンジニア|開発|API|コード|クラウド/.test(jdText);
    const requiresN1 = /N1|ビジネスレベル|交渉|契約/.test(jdText);

    setAnalyzedJd({
      role: isTech ? 'IT / DX 技術職 (Engineering)' : 'ビジネス / 営業 / 総合職 (Business & Sales)',
      jlptRequirement: requiresN1 ? 'JLPT N1 (必須または相当)' : 'JLPT N2以上 (実務コミュニケーション重視)',
      dailyJapaneseDemand: requiresN1
        ? '高度な敬語、顧客向けプレゼン、契約書読解、単独交渉が求められる最高水準。'
        : '日常的なスプリント会議、Slackテキストチャット、仕様確認、自律的な報連相が中心。',
      mustHaves: [
        '業務経験（2〜3年以上）と定量的な再現性のある成果',
        requiresN1 ? '敬語・ビジネスメールの単独完結能力' : 'チーム開発における円滑な報連相・仕様討議力',
      ],
      niceToHaves: [
        '異文化混成チームでのリード経験、多言語による合意形成',
        isTech ? 'クラウドインフラ構築・パフォーマンス改善実績' : '大型エンタープライズ顧客の開拓実績',
      ],
      cultureKeywords: ['自律駆動', '顧客ファースト', '心理的安全性', '合意形成', '継続的改善'],
      tailoredAdvice:
        '履歴書・職務経歴書では「指示された作業をこなした」ではなく、「課題を自発的に特定し、周囲と対話しながら解決したエピソード」を最前面に出してください。',
    });
  };

  // Readiness Scorecard (Calculated deterministic demo)
  const readinessMetrics: CorporateReadinessScore = {
    overallScore: 84,
    keigoProficiency: 82,
    emailBusinessStandard: 88,
    horensoReporting: 85,
    interviewReadiness: 78,
    vocabularyMastery: 86,
    jlptEstimatedFit: 'N2 Practical Office',
    personalizedRecommendations: [
      '面接の「志望動機」において、競合他社との差別化ポイントをもう1点掘り下げましょう。',
      '電話対応における「不在時の折り返し伝言（謙譲語の使い分け）」を重点復習してください。',
      '職務経歴書の実績欄に、具体的なパーセンテージや工数削減時間（定量指標）を追加しましょう。',
    ],
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none">
              <Compass size={20} />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              キャリアコーチング＆就職戦略ハブ (Career Coaching & Strategy Hub)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Navigate the 10-step Japanese hiring journey, analyze real job descriptions, and evaluate corporate readiness.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveSection('roadmap')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'roadmap'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass size={14} />
            <span>10ステップ就職ロードマップ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('jd_analyzer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'jd_analyzer'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileSearch size={14} />
            <span>求人票AIアナライザー</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('readiness')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'readiness'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award size={14} />
            <span>レディネス総合診断</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: 10-STEP CAREER ROADMAP */}
      {/* ========================================================================= */}
      {activeSection === 'roadmap' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                日本企業就職・転職 10段階完全ロードマップ
              </h3>
              <p className="text-xs text-slate-400">
                From self-analysis to visa change and your first 90 days. Click any step to inspect action items.
              </p>
            </div>

            <div className="space-y-3">
              {CAREER_10_STEPS.map((step, idx) => {
                const isExpanded = expandedStepIdx === idx;
                return (
                  <div
                    key={step.stepNumber}
                    className={`rounded-2xl border transition-all ${
                      isExpanded
                        ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-800 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div
                      onClick={() => setExpandedStepIdx(isExpanded ? null : idx)}
                      className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 ${
                            isExpanded
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold font-japanese text-slate-900 dark:text-white">
                            {step.titleJp}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            目安期間: {step.recommendedDuration}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-4 animate-fade-in">
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {step.summary}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              具体的なアクション項目 (Action Items)
                            </span>
                            <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                              {step.actionItems.map((act, aIdx) => (
                                <li key={aIdx}>{act}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 space-y-2">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                              作成・提出すべき成果物 (Key Deliverables)
                            </span>
                            <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                              {step.keyDeliverables.map((del, dIdx) => (
                                <li key={dIdx} className="font-semibold">
                                  {del}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: JOB DESCRIPTION ANALYZER */}
      {/* ========================================================================= */}
      {activeSection === 'jd_analyzer' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                日本企業求人票AI読解アナライザー (Job Description Deep-Dive)
              </h3>
              <p className="text-xs text-slate-400">
                Paste any Japanese job description or load a preset to decode real JLPT demands, must-haves, and culture cues.
              </p>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Sample Job Descriptions (サンプル求人を試す):
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {presetJDs.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setJdText(p.text);
                      setAnalyzedJd(null);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-400"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Textarea */}
            <div className="space-y-3">
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="ここに日本企業の求人票テキストを貼り付けてください（業務内容、応募資格、必須要件など）..."
                rows={6}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-japanese outline-none focus:border-indigo-500 leading-relaxed"
              />

              <button
                type="button"
                disabled={!jdText.trim()}
                onClick={handleAnalyzeJD}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-200 dark:shadow-none flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={15} />
                <span>求人票を分析・要件分解する</span>
              </button>
            </div>

            {/* Analysis Output Card */}
            {analyzedJd && (
              <div className="p-6 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-5 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-indigo-100 dark:border-indigo-900/40">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">
                      Analysis Report
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      {analyzedJd.role}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold font-mono">
                    {analyzedJd.jlptRequirement}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    現場で実際に求められる日本語運用レベル
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {analyzedJd.dailyJapaneseDemand}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-indigo-600" />
                      <span>突破のための必須要件 (Must-Haves)</span>
                    </span>
                    <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-600 dark:text-slate-300">
                      {analyzedJd.mustHaves.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-500" />
                      <span>差別化できる歓迎要件 (Nice-to-Haves)</span>
                    </span>
                    <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-600 dark:text-slate-300">
                      {analyzedJd.niceToHaves.map((n, idx) => (
                        <li key={idx}>{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    書類選考＆面接で盛り込むべき重要カルチャーキーワード:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {analyzedJd.cultureKeywords.map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2.5 py-1 rounded-lg bg-indigo-100/70 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <Lightbulb size={14} />
                    <span>合格に向けた戦略アドバイス</span>
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {analyzedJd.tailoredAdvice}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: READINESS SCORECARD */}
      {/* ========================================================================= */}
      {activeSection === 'readiness' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  日本企業就労レディネス総合診断 (Corporate Readiness Scorecard)
                </h3>
                <p className="text-xs text-slate-400">
                  Comprehensive 5-pillar assessment across Keigo, Business Email, Horenso, Interview, and Vocab.
                </p>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {readinessMetrics.overallScore}
                </span>
                <span className="text-xs text-slate-400 font-bold block">総合スコア / 100点</span>
              </div>
            </div>

            {/* 5 Pillar Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block">敬語・ビジネスマナー</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {readinessMetrics.keigoProficiency}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block">ビジネスメール作法</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {readinessMetrics.emailBusinessStandard}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block">職場報連相・会話力</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {readinessMetrics.horensoReporting}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block">面接対応力 (STAR法)</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {readinessMetrics.interviewReadiness}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block">専門・業界語彙力</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                  {readinessMetrics.vocabularyMastery}%
                </span>
              </div>
            </div>

            {/* Estimated Match */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">
                  Estimated Workplace Fit
                </span>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  {readinessMetrics.jlptEstimatedFit}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                実務即戦力レベル
              </span>
            </div>

            {/* Next Step Recommendations */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-600" />
                <span>採用合格率をさらに高めるための個別推奨アクション</span>
              </span>

              <ul className="space-y-2 pl-4 list-disc text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {readinessMetrics.personalizedRecommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

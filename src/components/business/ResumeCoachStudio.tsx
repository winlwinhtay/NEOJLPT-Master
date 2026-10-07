// ============================================================================
// RESUME COACH STUDIO (日本式履歴書・職務経歴書 作成＆添削スタジオ)
// Standard Rirekisho & Shokumu Keirekisho Builder with AI Phrasing Coach
// ============================================================================

import React, { useState } from 'react';
import {
  FileCheck,
  FileText,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Plus,
  Trash2,
  HelpCircle,
  Lightbulb,
  Award,
  Layers,
  Briefcase,
  User,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';
import {
  DEFAULT_RIREKISHO_TEMPLATE,
  DEFAULT_SHOKUMU_KEIREKISHO_TEMPLATE,
  RESUME_WORDING_TRANSFORMATIONS,
} from '../../data/business/careerJobData';
import { RirekishoRecord, ShokumuKeirekishoRecord } from '../../types/business';
import { AIGatewayService } from '../../services/aiGatewayService';

export const ResumeCoachStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rirekisho' | 'shokumu' | 'phrasing'>('rirekisho');
  const [copied, setCopied] = useState(false);

  // Editable Rirekisho state
  const [rirekisho, setRirekisho] = useState<RirekishoRecord>(DEFAULT_RIREKISHO_TEMPLATE);

  // Editable Shokumu Keirekisho state
  const [shokumu, setShokumu] = useState<ShokumuKeirekishoRecord>(DEFAULT_SHOKUMU_KEIREKISHO_TEMPLATE);

  // Phrasing Coach state
  const [rawInputPhrase, setRawInputPhrase] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedResult, setPolishedResult] = useState<{
    original: string;
    polished: string;
    advice: string;
    impactScore: number;
  } | null>(null);

  const handlePolishCustomPhrase = async () => {
    if (!rawInputPhrase.trim()) return;
    setIsPolishing(true);
    try {
      const res = await AIGatewayService.coachResumePhrase(rawInputPhrase);
      setPolishedResult(res);
    } catch (e) {
      console.error('Error coaching resume phrase:', e);
    } finally {
      setIsPolishing(false);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none">
              <FileCheck size={20} />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              履歴書・職務経歴書 作成＆表現コーチ (Japanese Resume & CV Coach)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build JIS-standard 履歴書 and 職務経歴書 with professional corporate Japanese phrasing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('rirekisho')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'rirekisho'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User size={14} />
            <span>履歴書 (Rirekisho)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shokumu')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'shokumu'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase size={14} />
            <span>職務経歴書 (CV)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('phrasing')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'phrasing'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>表現格上げコーチ</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 履歴書 (RIREKISHO) JIS STANDARD BUILDER */}
      {/* ========================================================================= */}
      {activeTab === 'rirekisho' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  JIS規格 日本式履歴書 (Rirekisho Format)
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in standard Japanese resume fields. Used by 95% of Japanese employers.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    `【履歴書】\n氏名: ${rirekisho.personalInfo.fullNameJp} (${rirekisho.personalInfo.furigana})\n生年月日: ${rirekisho.personalInfo.birthDate}\n現住所: ${rirekisho.personalInfo.currentAddress}\n電話: ${rirekisho.personalInfo.phone}\nEmail: ${rirekisho.personalInfo.email}\n\n■ 学歴・職歴\n${rirekisho.educationHistory.map((e) => `${e.year}年${e.month}月 ${e.description}`).join('\n')}\n${rirekisho.workHistory.map((w) => `${w.year}年${w.month}月 ${w.description}`).join('\n')}\n\n■ 免許・資格\n${rirekisho.certifications.map((c) => `${c.year}年${c.month}月 ${c.name}`).join('\n')}\n\n■ 志望動機\n${rirekisho.motivationJp}`
                  )
                }
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? 'コピー完了' : 'テキストをコピー'}</span>
              </button>
            </div>

            {/* Basic Personal Profile Section */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      氏名 (Full Name in Kanji / Roman)
                    </label>
                    <input
                      type="text"
                      value={rirekisho.personalInfo.fullNameJp}
                      onChange={(e) =>
                        setRirekisho({
                          ...rirekisho,
                          personalInfo: { ...rirekisho.personalInfo, fullNameJp: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      ふりがな (Furigana Reading)
                    </label>
                    <input
                      type="text"
                      value={rirekisho.personalInfo.furigana}
                      onChange={(e) =>
                        setRirekisho({
                          ...rirekisho,
                          personalInfo: { ...rirekisho.personalInfo, furigana: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      生年月日 (Birthdate)
                    </label>
                    <input
                      type="date"
                      value={rirekisho.personalInfo.birthDate}
                      onChange={(e) =>
                        setRirekisho({
                          ...rirekisho,
                          personalInfo: { ...rirekisho.personalInfo, birthDate: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      電話番号 (Phone Number)
                    </label>
                    <input
                      type="text"
                      value={rirekisho.personalInfo.phone}
                      onChange={(e) =>
                        setRirekisho({
                          ...rirekisho,
                          personalInfo: { ...rirekisho.personalInfo, phone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Eメール (Email)
                    </label>
                    <input
                      type="email"
                      value={rirekisho.personalInfo.email}
                      onChange={(e) =>
                        setRirekisho({
                          ...rirekisho,
                          personalInfo: { ...rirekisho.personalInfo, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    現住所 (Current Residence in Japan)
                  </label>
                  <input
                    type="text"
                    value={rirekisho.personalInfo.currentAddress}
                    onChange={(e) =>
                      setRirekisho({
                        ...rirekisho,
                        personalInfo: { ...rirekisho.personalInfo, currentAddress: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Photo Box Placeholder */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-center">
                <div className="w-24 h-32 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 mb-2 border border-slate-300 dark:border-slate-600">
                  <User size={36} />
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                  証明写真 (Photo 3cm × 4cm)
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  Professional suit, straight posture, taken within 3 months.
                </span>
              </div>
            </div>

            {/* Education & Work Chronology Table */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap size={16} className="text-indigo-600" />
                <span>学歴・職歴 (Education & Work History)</span>
              </span>

              <div className="space-y-2">
                {rirekisho.educationHistory.map((item, idx) => (
                  <div
                    key={`edu-${idx}`}
                    className="grid grid-cols-12 gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs items-center"
                  >
                    <span className="col-span-2 font-mono font-bold text-slate-500">
                      {item.year}年 {item.month}月
                    </span>
                    <span className="col-span-9 font-japanese text-slate-800 dark:text-slate-200 font-medium">
                      {item.description}
                    </span>
                    <span className="col-span-1 text-[10px] text-indigo-600 font-bold text-right">
                      学歴
                    </span>
                  </div>
                ))}

                {rirekisho.workHistory.map((item, idx) => (
                  <div
                    key={`work-${idx}`}
                    className="grid grid-cols-12 gap-2 p-2 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-xs items-center"
                  >
                    <span className="col-span-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {item.year}年 {item.month}月
                    </span>
                    <span className="col-span-9 font-japanese text-slate-800 dark:text-slate-200 font-medium">
                      {item.description}
                    </span>
                    <span className="col-span-1 text-[10px] text-indigo-600 font-bold text-right">
                      職歴
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Table */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award size={16} className="text-emerald-600" />
                <span>免許・資格 (Certifications & Official Qualifications)</span>
              </span>

              <div className="space-y-2">
                {rirekisho.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs items-center"
                  >
                    <span className="col-span-2 font-mono font-bold text-slate-500">
                      {cert.year}年 {cert.month}月
                    </span>
                    <span className="col-span-10 font-japanese text-slate-800 dark:text-slate-200 font-medium">
                      {cert.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivation Box */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                志望の動機・特技・自己PR (Motivation & Self-PR in Rirekisho)
              </label>
              <textarea
                value={rirekisho.motivationJp}
                onChange={(e) => setRirekisho({ ...rirekisho, motivationJp: e.target.value })}
                rows={4}
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-japanese text-slate-900 dark:text-white outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 職務経歴書 (SHOKUMU KEIREKISHO) BUILDER */}
      {/* ========================================================================= */}
      {activeTab === 'shokumu' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  職務経歴書 (Curriculum Vitae / Career Accomplishments)
                </h3>
                <p className="text-xs text-slate-400">
                  Detailed project scopes, technologies, and quantifiable achievements.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    `【職務経歴書】\n\n■ 職務要約\n${shokumu.executiveSummary}\n\n■ 活かせる経験・知識・技術\n${shokumu.coreCompetencies.map((c) => `・${c}`).join('\n')}\n\n■ 職務経歴詳細\n${shokumu.projects.map((p) => `【${p.projectName}】(${p.period})\n役割: ${p.role} (チーム規模: ${p.teamSize})\n業務内容: ${p.description}\n使用技術: ${p.technologiesOrSkills.join(', ')}\n実績・成果: ${p.achievementsWithMetrics}`).join('\n\n')}\n\n■ 自己PR\n${shokumu.selfPR}`
                  )
                }
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? 'コピー完了' : '職務経歴書をコピー'}</span>
              </button>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                1. 職務要約 (Executive Summary - 3 to 4 lines)
              </label>
              <textarea
                value={shokumu.executiveSummary}
                onChange={(e) => setShokumu({ ...shokumu, executiveSummary: e.target.value })}
                rows={3}
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-japanese text-slate-900 dark:text-white outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* Core Competencies */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                2. 活かせる経験・知識・技術 (Core Competencies & Key Strengths)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {shokumu.coreCompetencies.map((comp, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs font-japanese text-slate-800 dark:text-slate-200 flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} className="text-indigo-600 shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Table */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                3. 職務経歴詳細・プロジェクト実績 (Project History & Achievements)
              </label>

              <div className="space-y-4">
                {shokumu.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700 pb-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold block">
                          {proj.period}
                        </span>
                        <h4 className="text-sm font-bold font-japanese text-slate-900 dark:text-white">
                          {proj.projectName}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold">
                          {proj.role}
                        </span>
                        <span className="text-[11px] text-slate-400">規模: {proj.teamSize}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        担当業務・プロジェクト概要
                      </span>
                      <p className="text-xs font-japanese text-slate-700 dark:text-slate-300 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block flex items-center gap-1">
                        <Award size={13} />
                        <span>定量的な実績・成果 (Quantifiable Outcomes)</span>
                      </span>
                      <p className="text-xs font-japanese text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                        {proj.achievementsWithMetrics}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 表現ブラッシュアップ (PHRASING COACH & TRANSFORMATION) */}
      {/* ========================================================================= */}
      {activeTab === 'phrasing' && (
        <div className="space-y-8 animate-fade-in">
          {/* Custom Interactive Sandbox */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="text-indigo-600" size={18} />
                  <span>AI 日本語表現格上げサンドボックス (Instant Phrase Polish)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Type your casual or draft resume phrase below to transform it into corporate Japanese.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={rawInputPhrase}
                onChange={(e) => setRawInputPhrase(e.target.value)}
                placeholder="例：アプリを作りました / 売上を頑張って伸ばしました"
                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-japanese outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                disabled={isPolishing || !rawInputPhrase.trim()}
                onClick={handlePolishCustomPhrase}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Sparkles size={15} />
                <span>{isPolishing ? '格上げ分析中...' : 'プロ日本語に格上げ'}</span>
              </button>
            </div>

            {/* Polish Result Card */}
            {polishedResult && (
              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                    格上げ後のプロフェッショナル表現
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    インパクト度: {polishedResult.impactScore}/100
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 text-sm font-bold font-japanese text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  {polishedResult.polished}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  💡 <span className="font-bold">採用視点のアドバイス:</span> {polishedResult.advice}
                </p>
              </div>
            )}
          </div>

          {/* 20+ Curated Transformation Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                採用担当者に刺さる！表現ビフォーアフター ({RESUME_WORDING_TRANSFORMATIONS.length}選)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESUME_WORDING_TRANSFORMATIONS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(item.polishedCorporatePhrase)}
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded"
                      title="Copy polished phrase"
                    >
                      <Copy size={13} />
                    </button>
                  </div>

                  {/* Before (Casual) */}
                  <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                    <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
                      ❌ ダメな例（幼い・曖昧）
                    </span>
                    <p className="text-xs font-japanese text-slate-700 dark:text-slate-300 line-through decoration-rose-400">
                      {item.casualPhrase}
                    </p>
                  </div>

                  {/* After (Polished) */}
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
                    <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 block mb-0.5">
                      ⭕ プロフェッショナルの表現
                    </span>
                    <p className="text-xs font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                      {item.polishedCorporatePhrase}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

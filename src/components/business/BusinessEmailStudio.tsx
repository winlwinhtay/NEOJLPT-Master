// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) EMAIL STUDIO
// 4-Step Comparative Architecture, 7-Part Breakdown & Interactive AI Review
// ============================================================================

import React, { useState } from 'react';
import {
  Mail,
  FileText,
  Copy,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  PenTool,
  Send,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_EMAIL_TEMPLATES } from '../../data/business/businessEmailData';
import { BUSINESS_EMAIL_COMPARATIVE_DATA } from '../../data/business/businessEmailDetailedData';
import { AIGatewayService } from '../../services/aiGatewayService';
import { AudioButton } from '../common/AudioButton';
import { JapaneseInput } from '../keyboard/JapaneseInput';

export const BusinessEmailStudio: React.FC = () => {
  // Mode switcher: 'comparative' (4-step bad vs professional) | 'templates' (7-part library) | 'practice' (AI review)
  const [studioMode, setStudioMode] = useState<'comparative' | 'templates' | 'practice'>('comparative');

  // Comparative 4-Step state
  const [selectedCompId, setSelectedCompId] = useState<string>(
    BUSINESS_EMAIL_COMPARATIVE_DATA[0].id
  );
  const [activeCompStep, setActiveCompStep] = useState<1 | 2 | 3 | 4>(1);

  // Template Library state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    BUSINESS_EMAIL_TEMPLATES[0].id
  );
  const [copied, setCopied] = useState(false);

  // Practice & AI Review state
  const [userDraft, setUserDraft] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [aiReviewResult, setAiReviewResult] = useState<{
    overallScore: number;
    politenessScore: number;
    structureScore: number;
    feedback: string;
    suggestedImprovements: string[];
    professionalRewrite: string;
  } | null>(null);

  const selectedCompItem =
    BUSINESS_EMAIL_COMPARATIVE_DATA.find((c) => c.id === selectedCompId) ||
    BUSINESS_EMAIL_COMPARATIVE_DATA[0];

  const selectedTemplate =
    BUSINESS_EMAIL_TEMPLATES.find((t) => t.id === selectedTemplateId) ||
    BUSINESS_EMAIL_TEMPLATES[0];

  const fullEmailText = `${selectedTemplate.subject}\n\n${selectedTemplate.recipient}\n\n${selectedTemplate.greeting}\n\n${selectedTemplate.opening}\n\n${selectedTemplate.body}\n\n${selectedTemplate.requestAction}\n\n${selectedTemplate.closing}\n\n${selectedTemplate.signature}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReviewDraft = async () => {
    if (!userDraft.trim()) return;
    setIsReviewing(true);
    try {
      const res = await AIGatewayService.reviewBusinessEmail(userDraft, selectedCompItem.category);
      setAiReviewResult(res);
    } catch (e) {
      console.error('Error reviewing email draft:', e);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none">
              <Mail size={20} />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              ビジネスメール作成スタジオ (Business Email Studio)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            4-step comparative models (Bad ➔ Why ➔ Improved ➔ Professional), 7-part architecture, and AI review.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setStudioMode('comparative')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              studioMode === 'comparative'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>4段階比較モデル</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioMode('templates')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              studioMode === 'templates'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>7部構成テンプレート</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioMode('practice')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              studioMode === 'practice'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <PenTool size={14} />
            <span>AIメール添削</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: 4-STEP COMPARATIVE ARCHITECTURE */}
      {/* ========================================================================= */}
      {studioMode === 'comparative' && (
        <div className="space-y-6 animate-fade-in">
          {/* Scenario Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {BUSINESS_EMAIL_COMPARATIVE_DATA.map((item) => {
              const isSelected = item.id === selectedCompItem.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedCompId(item.id);
                    setActiveCompStep(1);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                  }`}
                >
                  {item.category.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Active Comparative Scenario Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Comparative Case Study
                </span>
                <h3 className="text-lg font-black font-japanese text-slate-900 dark:text-white">
                  {selectedCompItem.titleJp}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedCompItem.scenario}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold self-start sm:self-auto">
                {selectedCompItem.audience === 'external' ? '社外取引先向け' : '社内・上司向け'}
              </span>
            </div>

            {/* 4-Step Stepper Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveCompStep(1)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeCompStep === 1
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-700 dark:text-rose-300 font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-[10px] font-mono block">STEP 1</span>
                <span className="text-xs">❌ ダメな例</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCompStep(2)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeCompStep === 2
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-700 dark:text-amber-300 font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-[10px] font-mono block">STEP 2</span>
                <span className="text-xs">⚠️ なぜダメか分析</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCompStep(3)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeCompStep === 3
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-[10px] font-mono block">STEP 3</span>
                <span className="text-xs">🔷 改善例</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCompStep(4)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeCompStep === 4
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300 font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-[10px] font-mono block">STEP 4</span>
                <span className="text-xs">👑 プロ完成版</span>
              </button>
            </div>

            {/* Step Content Display */}
            {activeCompStep === 1 && (
              <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertCircle size={15} />
                    <span>ダメな例（よくある外国籍・新人の失敗パターン）</span>
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 font-japanese text-xs sm:text-sm space-y-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
                  <div className="font-bold pb-2 border-b border-rose-100 dark:border-rose-950">
                    件名: {selectedCompItem.step1Bad.subject}
                  </div>
                  <div>{selectedCompItem.step1Bad.body}</div>
                </div>
              </div>
            )}

            {activeCompStep === 2 && (
              <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <Lightbulb size={15} />
                    <span>なぜダメなのか？失礼・不十分なポイントの徹底解説</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      主なNG要因:
                    </span>
                    <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                      {selectedCompItem.step2WhyBad.reasons.map((r, rIdx) => (
                        <li key={rIdx}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/40 text-xs">
                      <span className="font-bold text-rose-600 block mb-1">致命的な欠陥</span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                        {selectedCompItem.step2WhyBad.criticalFlaws.map((f, fIdx) => (
                          <li key={fIdx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/40 text-xs">
                      <span className="font-bold text-indigo-600 block mb-1">敬語・作法の問題</span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                        {selectedCompItem.step2WhyBad.politenessIssues.map((p, pIdx) => (
                          <li key={pIdx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCompStep === 3 && (
              <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>改善例（標準的なビジネスマナー準拠）</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${selectedCompItem.step3Improved.subject}\n\n${selectedCompItem.step3Improved.body}`)}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    コピー
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 font-japanese text-xs sm:text-sm space-y-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
                  <div className="font-bold pb-2 border-b border-blue-100 dark:border-blue-950">
                    件名: {selectedCompItem.step3Improved.subject}
                  </div>
                  <div>{selectedCompItem.step3Improved.body}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    改善されたポイント:
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    {selectedCompItem.step3Improved.improvementsMade.map((imp, iIdx) => (
                      <li key={iIdx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeCompStep === 4 && (
              <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <Sparkles size={15} />
                    <span>プロフェッショナル完成版（最高峰のエグゼクティブ文章）</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${selectedCompItem.step4Professional.subject}\n\n${selectedCompItem.step4Professional.body}`)}
                    className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Copy size={13} />
                    <span>完成版をコピー</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 font-japanese text-xs sm:text-sm space-y-2 whitespace-pre-line text-slate-900 dark:text-white leading-relaxed">
                  <div className="font-bold pb-2 border-b border-emerald-100 dark:border-emerald-950 text-indigo-700 dark:text-indigo-400">
                    件名: {selectedCompItem.step4Professional.subject}
                  </div>
                  <div>{selectedCompItem.step4Professional.body}</div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    使用されたクッション言葉＆エグゼクティブ表現:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {selectedCompItem.step4Professional.cushionWordsUsed.map((cw, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-japanese"
                      >
                        {cw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: 7-PART BREAKDOWN TEMPLATE LIBRARY */}
      {/* ========================================================================= */}
      {studioMode === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Left: Template Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Email Templates ({BUSINESS_EMAIL_TEMPLATES.length})
            </span>
            <div className="space-y-2">
              {BUSINESS_EMAIL_TEMPLATES.map((tmpl) => {
                const isSelected = tmpl.id === selectedTemplate.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                        {tmpl.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {tmpl.audience === 'external_client' ? '社外 (External)' : '社内 (Internal)'}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold font-japanese text-slate-900 dark:text-white line-clamp-1">
                      {tmpl.titleJp}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: 7-Part Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                  Template Preview
                </span>
                <h3 className="text-lg font-black font-japanese text-slate-900 dark:text-white">
                  {selectedTemplate.titleJp}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(fullEmailText)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Full Email'}</span>
              </button>
            </div>

            {/* 7-Part Visual Blocks */}
            <div className="space-y-3 font-japanese text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
                <span className="text-[9px] font-mono font-bold text-indigo-600 uppercase block mb-0.5">1. 件名 (Subject Line)</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedTemplate.subject}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-0.5">2. 宛名 (Recipient)</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedTemplate.recipient}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-0.5">3. 挨拶 (Opening Greeting)</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedTemplate.greeting}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-0.5">4. 用件 (Opening Context)</span>
                <span className="text-slate-800 dark:text-slate-200 leading-relaxed">{selectedTemplate.opening}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-0.5">5. 本文・詳細 (Body Details)</span>
                <div className="text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">{selectedTemplate.body}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-0.5">6. 依頼・結び (Closing Action)</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedTemplate.requestAction}\n{selectedTemplate.closing}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-0.5">7. 署名 (Signature)</span>
                <div className="text-slate-600 dark:text-slate-400 font-mono text-xs whitespace-pre-line">{selectedTemplate.signature}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: INTERACTIVE AI EMAIL REVIEW */}
      {/* ========================================================================= */}
      {studioMode === 'practice' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <PenTool className="text-indigo-600" size={18} />
                <span>インタラクティブ AIメール添削 (AI Email Proofreader)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Draft a Japanese email below. AI evaluates against the 7-part architecture, Keigo correctness, and cushion words.
              </p>
            </div>

            <JapaneseInput
              multiline
              rows={8}
              value={userDraft}
              onChange={setUserDraft}
              placeholder="ここに作成したビジネスメールを入力してください（件名、宛名、挨拶、本文、署名）..."
              inputClassName="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-japanese outline-none focus:border-indigo-500 leading-relaxed"
            />

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setUserDraft('')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                クリア
              </button>

              <button
                type="button"
                disabled={isReviewing || userDraft.trim().length < 10}
                onClick={handleReviewDraft}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-200 dark:shadow-none flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={15} />
                <span>{isReviewing ? 'AI添削分析中...' : 'メールをAI添削・評価する'}</span>
              </button>
            </div>

            {/* AI Review Result Card */}
            {aiReviewResult && (
              <div className="p-6 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-5 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100 dark:border-indigo-900/40">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    添削結果レポート (Proofreading Report)
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {aiReviewResult.overallScore}点
                    </span>
                    <span className="text-xs text-slate-400">/ 100点</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900">
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5">敬語・丁寧度</span>
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {aiReviewResult.politenessScore}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900">
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5">7部構成・視認性</span>
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                      {aiReviewResult.structureScore}%
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    講師からのフィードバック
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-japanese">
                    {aiReviewResult.feedback}
                  </p>
                </div>

                {aiReviewResult.suggestedImprovements?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Lightbulb size={14} />
                      <span>改善のアドバイス</span>
                    </span>
                    <ul className="space-y-1 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                      {aiReviewResult.suggestedImprovements.map((sug, sIdx) => (
                        <li key={sIdx}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

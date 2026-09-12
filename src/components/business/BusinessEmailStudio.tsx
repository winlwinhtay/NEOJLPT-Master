// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) EMAIL STUDIO
// 7-Part Email Breakdown, Template Library & Interactive Writing Practice
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
} from 'lucide-react';
import { BUSINESS_EMAIL_TEMPLATES } from '../../data/business/businessEmailData';

export const BusinessEmailStudio: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    BUSINESS_EMAIL_TEMPLATES[0].id
  );
  const [copied, setCopied] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [userDraft, setUserDraft] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const selectedTemplate =
    BUSINESS_EMAIL_TEMPLATES.find((t) => t.id === selectedTemplateId) ||
    BUSINESS_EMAIL_TEMPLATES[0];

  const fullEmailText = `${selectedTemplate.subject}\n\n${selectedTemplate.recipient}\n\n${selectedTemplate.greeting}\n\n${selectedTemplate.opening}\n\n${selectedTemplate.body}\n\n${selectedTemplate.requestAction}\n\n${selectedTemplate.closing}\n\n${selectedTemplate.signature}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullEmailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="text-indigo-600 dark:text-indigo-400" size={22} />
            <span>ビジネスメール作成スタジオ (Business Email Studio)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Master the authentic 7-part Japanese email architecture: 件名・宛名・挨拶・用件・依頼・締め・署名.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPracticeMode(!practiceMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              practiceMode
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <PenTool size={14} />
            <span>{practiceMode ? 'View Templates' : 'Writing Practice Mode'}</span>
          </button>
        </div>
      </div>

      {!practiceMode ? (
        /* Template Library & 7-Part Viewer */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                    <h4 className="text-xs font-bold font-japanese text-slate-900 dark:text-white leading-snug">
                      {tmpl.titleJp}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {tmpl.titleEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: 7-Part Email Decomposition (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 flex-wrap gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                  Full Email Breakdown
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                  {selectedTemplate.titleJp}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? 'Copied Full Email' : 'Copy Full Text'}</span>
              </button>
            </div>

            {/* Structured Parts Display */}
            <div className="space-y-3 font-japanese text-xs leading-relaxed">
              {/* Part 1: 件名 */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                  1. 件名 (Subject Line)
                </span>
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {selectedTemplate.subject}
                </div>
              </div>

              {/* Part 2: 宛名 */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                  2. 宛名 (Recipient / Company & Title)
                </span>
                <div className="whitespace-pre-line text-slate-800 dark:text-slate-200 font-semibold">
                  {selectedTemplate.recipient}
                </div>
              </div>

              {/* Part 3: 挨拶 */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                  3. 挨拶と名乗り (Opening Greeting & Sender ID)
                </span>
                <div className="whitespace-pre-line text-slate-800 dark:text-slate-200">
                  {selectedTemplate.greeting}
                </div>
              </div>

              {/* Part 4: 本文・用件 */}
              <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                  4. 本文・用件 (Context & Main Proposal)
                </span>
                <div className="whitespace-pre-line text-slate-900 dark:text-white font-medium leading-relaxed">
                  {selectedTemplate.opening}
                  {'\n\n'}
                  {selectedTemplate.body}
                </div>
              </div>

              {/* Part 5: 依頼 */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                  5. お願い・アクション依頼 (Action Request)
                </span>
                <div className="whitespace-pre-line text-slate-800 dark:text-slate-200">
                  {selectedTemplate.requestAction}
                </div>
              </div>

              {/* Part 6: 結び */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                  6. 結びの言葉 (Closing Politeness Formula)
                </span>
                <div className="text-slate-800 dark:text-slate-200 font-bold">
                  {selectedTemplate.closing}
                </div>
              </div>

              {/* Part 7: 署名 */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  7. 署名 (Signature Block)
                </span>
                <div className="whitespace-pre-line font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {selectedTemplate.signature}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Writing Practice Mode */
        selectedTemplate.writingPrompt && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-3xl mx-auto">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                Writing Assignment
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {selectedTemplate.writingPrompt.scenario}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Required Elements:
              </span>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                {selectedTemplate.writingPrompt.requirements.map((req, rIdx) => (
                  <li key={rIdx}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Your Japanese Draft:
              </span>
              <textarea
                value={userDraft}
                onChange={(e) => setUserDraft(e.target.value)}
                placeholder="件名：\n\n〇〇株式会社\n〇〇様\n\nいつも大変お世話になっております..."
                rows={10}
                className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-japanese outline-none focus:border-indigo-500 shadow-inner"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {showModelAnswer ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{showModelAnswer ? 'Hide Model Answer' : 'Reveal Model Answer'}</span>
              </button>
            </div>

            {showModelAnswer && (
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <Sparkles size={16} />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    模範解答 (Model Answer)
                  </h4>
                </div>
                <div className="whitespace-pre-line text-xs font-japanese font-medium text-slate-900 dark:text-white leading-relaxed bg-white/80 dark:bg-slate-900/80 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                  {selectedTemplate.writingPrompt.modelSolution}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 italic pl-1">
                  💡 {selectedTemplate.writingPrompt.explanation}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

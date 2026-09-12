import React, { useState } from 'react';
import { Flag, X, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { JLPTLevel } from '../../types';
import { StorageService } from '../../services/storageService';

export interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
  module: 'vocabulary' | 'kanji' | 'grammar' | 'lessons' | 'questions' | 'mock-tests';
  level: JLPTLevel;
  currentText: string;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  contentId,
  module,
  level,
  currentText,
}) => {
  const [category, setCategory] = useState<
    'incorrect_grammar' | 'level_classification' | 'unnatural_japanese' | 'translation_issue' | 'typographical'
  >('translation_issue');
  const [proposedCorrection, setProposedCorrection] = useState('');
  const [rationale, setRationale] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedCorrection.trim() && !rationale.trim()) return;

    const reviewItem = {
      id: `rev-user-${Date.now()}`,
      module,
      contentId,
      level,
      category,
      severity: category === 'incorrect_grammar' ? ('high' as const) : ('medium' as const),
      currentText: currentText || contentId,
      proposedCorrection: proposedCorrection.trim() || 'Correction needed per user comments',
      rationale: rationale.trim() || 'Reported via student/user feedback widget',
      status: 'pending' as const,
      reviewedAt: new Date().toISOString(),
      reviewerNotes: 'Submitted by user from interactive study card',
    };

    StorageService.addReviewItem(reviewItem);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-900">
              <Flag size={20} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Report Content Mistake
              </h3>
              <p className="text-[11px] text-slate-400">
                {module.toUpperCase()} • Level {level} • ID: {contentId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={30} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Report Sent to Editorial Queue!
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thank you! Our Japanese language curriculum team and native proofreaders will review your suggestion in the Admin Review Queue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Context */}
            {currentText && (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Item Content:
                </span>
                <p className="font-japanese font-semibold text-slate-800 dark:text-slate-200 line-clamp-3">
                  {currentText}
                </p>
              </div>
            )}

            {/* Category Select */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Issue Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-amber-500"
              >
                <option value="translation_issue">🟡 Translation Error / Misleading Meaning</option>
                <option value="incorrect_grammar">🔴 Incorrect Grammar / Particle Usage</option>
                <option value="unnatural_japanese">🟡 Unnatural Japanese Expression</option>
                <option value="typographical">🔵 Typographical / Missing Furigana</option>
                <option value="level_classification">🟠 Incorrect JLPT Level</option>
              </select>
            </div>

            {/* Proposed Correction */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Suggested Correction <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={proposedCorrection}
                onChange={(e) => setProposedCorrection(e.target.value)}
                placeholder="e.g. Correct reading is かんじ, or natural sentence should be..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-amber-500 font-japanese"
              />
            </div>

            {/* Rationale / Note */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Reason or Details <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                placeholder="Briefly explain what looks incorrect..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-amber-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send size={14} /> Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

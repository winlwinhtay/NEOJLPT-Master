import React from 'react';
import { Sparkles, LogIn, CheckCircle2, ShieldCheck, X, BookOpen, Layers, Bot } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AIAccessGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle?: string;
  featureDescription?: string;
}

export const AIAccessGateModal: React.FC<AIAccessGateModalProps> = ({
  isOpen,
  onClose,
  featureTitle = 'AI Feature Access',
  featureDescription = 'Chat with the AI tutor and receive live linguistic analysis.',
}) => {
  const { setAuthModalOpen } = useApp();

  if (!isOpen) return null;

  const handleOpenLogin = () => {
    onClose();
    setAuthModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Bot size={22} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
                Supabase Email Authentication
              </span>
              <h3 className="text-lg font-black">{featureTitle}</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {featureDescription}
          </p>
        </div>

        {/* Value Comparison */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Free with No Login */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>ログイン不要 (Free No Login)</span>
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                <li>✓ JLPT N5–N1 Curriculum</li>
                <li>✓ Full Vocabulary & Kanji Lists</li>
                <li>✓ Grammar Points & Formulas</li>
                <li>✓ Listening Audio & Passages</li>
                <li>✓ Practice Quizzes & Mock Tests</li>
                <li>✓ Japanese Virtual Keyboard</li>
                <li>✓ Typing Practice Studio</li>
              </ul>
            </div>

            {/* Email Login Unlocks */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-2">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>メール登録で解放 (Supabase)</span>
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                <li>★ Live AI Conversation Tutor</li>
                <li>★ AI Personal Grammar Explainer</li>
                <li>★ AI Business Email Proofreader</li>
                <li>★ Cloud Multi-Device Sync</li>
                <li>★ Permanent Learning History</li>
                <li>★ Spaced Repetition Analytics</li>
              </ul>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
            Sign in with an email account registered in our Supabase database to start using full AI API features.
          </p>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleOpenLogin}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn size={16} />
              <span>メールでログイン / 新規登録 (Sign In with Email)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              ログインせずに無料学習を続ける (Continue Free Study)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

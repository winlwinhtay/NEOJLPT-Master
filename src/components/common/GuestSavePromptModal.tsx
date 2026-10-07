import React from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useApp } from '../../context/AppContext';

export const GuestSavePromptModal: React.FC = () => {
  const { guestSavePromptOpen, setGuestSavePromptOpen, completedLessons, profile } = useUser();
  const { setAuthModalOpen } = useApp();

  if (!guestSavePromptOpen) return null;

  const handleOpenAuth = () => {
    setGuestSavePromptOpen(false);
    setAuthModalOpen(true);
  };

  const handleDismiss = () => {
    setGuestSavePromptOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
        onClick={handleDismiss}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up">
        {/* Top Header Graphic */}
        <div className="relative p-6 sm:p-7 bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-700 text-white">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} className="text-amber-300" /> Great Milestone! 🎉
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Save Your Learning Progress
          </h3>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1">
            You&apos;ve completed {completedLessons.length} lesson{completedLessons.length !== 1 ? 's' : ''} and earned {profile.xp} XP!
          </p>
        </div>

        {/* Benefits List */}
        <div className="p-6 space-y-4">
          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={12} />
              </div>
              <span>Permanent cloud progress across all your devices</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={12} />
              </div>
              <span>Keep your daily study streak and unlock achievement badges</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={12} />
              </div>
              <span>Personalized JLPT Active Learning Path recommendations</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={12} />
              </div>
              <span>100% Free Forever — no credit card required</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={handleOpenAuth}
              className="w-full py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Save Progress (Create Free Account)</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleDismiss}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Continue as Guest for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

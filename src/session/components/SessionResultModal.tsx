import React from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { SessionResult } from '../types';

interface SessionResultModalProps {
  isOpen: boolean;
  result: SessionResult | null;
  onRetry: () => void;
  onClose: () => void;
  title?: string;
}

export const SessionResultModal: React.FC<SessionResultModalProps> = ({
  isOpen,
  result,
  onRetry,
  onClose,
  title = 'Session Complete!',
}) => {
  if (!isOpen || !result) return null;

  const isPassed = result.isPassed;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Banner */}
        <div
          className={`p-6 text-center text-white ${
            isPassed
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
              : 'bg-gradient-to-br from-amber-500 to-orange-600'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-lg">
            {isPassed ? <Trophy size={32} /> : <BookOpen size={32} />}
          </div>
          <h2 className="text-2xl font-black">{title}</h2>
          <p className="text-xs text-white/90 mt-1">
            {isPassed
              ? 'Great job! You achieved high accuracy.'
              : 'Keep practicing! Review your mistakes below to improve.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Accuracy
              </span>
              <span
                className={`text-xl font-black ${
                  isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {result.accuracyPercentage}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Score
              </span>
              <span className="text-xl font-black text-slate-800 dark:text-white">
                {result.correctAnswers}/{result.totalQuestions}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                XP Bonus
              </span>
              <span className="text-xl font-black text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                <Sparkles size={16} /> +{result.correctAnswers * 15 + 25}
              </span>
            </div>
          </div>

          {/* Mistakes Review (if any) */}
          {result.mistakes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <XCircle size={14} className="text-rose-500" />
                Review Mistakes ({result.mistakes.length})
              </h4>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {result.mistakes.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-xs space-y-1.5"
                  >
                    <div className="font-semibold text-slate-900 dark:text-white font-japanese">
                      {m.prompt}
                    </div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="text-rose-600 dark:text-rose-400 font-medium">
                        Your answer: <strong>{m.userAnswer}</strong>
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        Correct: <strong>{m.correctAnswer}</strong>
                      </span>
                    </div>
                    {m.explanation && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-0.5 border-t border-rose-200/40 dark:border-rose-900/40">
                        {m.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.mistakes.length === 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center gap-3">
              <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
              <div className="text-xs text-emerald-900 dark:text-emerald-300">
                <span className="font-bold block">Flawless Session!</span>
                All questions answered correctly. Added to your daily streak and mastery statistics.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw size={14} /> Retry Session
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            Continue <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

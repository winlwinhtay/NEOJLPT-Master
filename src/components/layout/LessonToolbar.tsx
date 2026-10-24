import React, { useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LessonToolbarProps {
  moduleTitle: string;
  lessonTitle: string;
  levelBadge?: string;
  onBack: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  progressPercent?: number;
  rightActions?: React.ReactNode;
}

export const LessonToolbar: React.FC<LessonToolbarProps> = ({
  moduleTitle,
  lessonTitle,
  levelBadge,
  onBack,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  progressPercent,
  rightActions,
}) => {
  // Listen for Escape key to exit lesson
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      } else if (e.key === '[' && onPrev && hasPrev) {
        onPrev();
      } else if (e.key === ']' && onNext && hasNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, onPrev, onNext, hasPrev, hasNext]);

  return (
    <header
      role="banner"
      aria-label="Lesson Toolbar"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs transition-colors"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Back to Module Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onBack}
            aria-label={`Back to ${moduleTitle}`}
            title={`Back to ${moduleTitle} (Esc)`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Back to {moduleTitle}</span>
            <span className="sm:hidden">Back</span>
          </button>

          {levelBadge && (
            <span
              className="px-2 py-0.5 rounded-lg bg-brand-500 text-white font-mono font-black text-xs shrink-0"
              title={`JLPT ${levelBadge}`}
            >
              {levelBadge}
            </span>
          )}
        </div>

        {/* Center: Lesson Title */}
        <div className="flex-1 min-w-0 text-center px-2">
          <h1
            className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate"
            title={lessonTitle}
          >
            {lessonTitle}
          </h1>
          {typeof progressPercent === 'number' && (
            <div className="w-24 sm:w-32 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mt-1 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>
          )}
        </div>

        {/* Right: Lesson Controls & Exit */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Prev / Next buttons */}
          {(onPrev || onNext) && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl">
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev}
                aria-label="Previous lesson"
                title="Previous lesson ([)"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  hasPrev
                    ? 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 cursor-pointer shadow-2xs'
                    : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                aria-label="Next lesson"
                title="Next lesson (])"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  hasNext
                    ? 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 cursor-pointer shadow-2xs'
                    : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Module-specific Right Actions (Audio, Furigana toggle, etc.) */}
          {rightActions}

          {/* Exit Lesson button */}
          <button
            type="button"
            onClick={onBack}
            aria-label="Exit distraction-free lesson mode"
            title="Exit Lesson (Esc)"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

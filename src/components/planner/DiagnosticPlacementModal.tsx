import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ArrowLeft,
  X,
  Sparkles,
  Award,
  BarChart3,
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../../data/practiceData';
import { PracticeQuestion } from '../../types/practice';
import { JLPTLevel } from '../../types';
import { StudyPlannerService } from '../../services/studyPlannerService';
import { AudioButton } from '../common/AudioButton';

interface DiagnosticPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyLevel: (level: JLPTLevel | 'beginner') => void;
}

export const DiagnosticPlacementModal: React.FC<DiagnosticPlacementModalProps> = ({
  isOpen,
  onClose,
  onApplyLevel,
}) => {
  // Select 2 representative questions from each level (N5, N4, N3, N2, N1) -> 10 questions total
  const questions = useMemo(() => {
    const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const selected: PracticeQuestion[] = [];
    levels.forEach((lvl) => {
      const pool = PRACTICE_QUESTIONS.filter((q) => q.level === lvl);
      if (pool.length >= 2) {
        selected.push(pool[0], pool[1]);
      } else if (pool.length > 0) {
        selected.push(...pool);
      }
    });
    return selected;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQ) return;
    const nextAnswers = { ...answers, [currentQ.id]: optionIndex };
    setAnswers(nextAnswers);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const evaluation = isFinished
    ? StudyPlannerService.evaluateDiagnosticTest(answers, questions)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <HelpCircle size={18} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                JLPT Diagnostic Placement Test
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                10 questions • Evaluates your baseline proficiency across N5–N1
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isFinished ? (
            <>
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-brand-600 dark:text-brand-400 uppercase">
                    Level {currentQ.level} Test
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-japanese leading-relaxed">
                    {currentQ.promptJp}
                  </h4>
                  {currentQ.audioText && <AudioButton text={currentQ.audioText} size="sm" />}
                </div>

                {currentQ.readingPrompt && (
                  <p className="text-xs text-slate-500 font-medium">
                    Target reading: <strong>{currentQ.readingPrompt}</strong>
                  </p>
                )}

                {/* Options list */}
                <div className="space-y-2 pt-2">
                  {currentQ.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-brand-500 hover:bg-brand-50/40 dark:hover:bg-brand-950/30 text-slate-800 dark:text-slate-100 text-sm font-semibold text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span>{opt}</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="space-y-6 text-center animate-fade-in py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <Award size={32} />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Diagnostic Result
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Recommended Baseline:{' '}
                  <span className="text-brand-600 dark:text-brand-400">
                    {evaluation?.recommendedLevel}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                  {evaluation?.summary}
                </p>
              </div>

              {/* Score Breakdown By Level */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-left space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Accuracy by Level:
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => {
                    const score = evaluation?.levelScores[lvl];
                    const isPassed = score && score.correct > 0;
                    return (
                      <div
                        key={lvl}
                        className={`p-2.5 rounded-xl border text-center ${
                          isPassed
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <span className="block text-xs font-bold text-slate-900 dark:text-white">
                          {lvl}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {score ? `${score.correct}/${score.total}` : '0/2'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIndex(0);
                    setAnswers({});
                    setIsFinished(false);
                  }}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
                >
                  Retake Test
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (evaluation?.recommendedLevel) {
                      onApplyLevel(evaluation.recommendedLevel);
                    }
                    onClose();
                  }}
                  className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  Apply {evaluation?.recommendedLevel} to Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

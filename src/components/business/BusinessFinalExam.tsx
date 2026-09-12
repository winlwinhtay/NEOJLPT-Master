// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) FINAL COMPREHENSIVE EXAMINATION
// Multi-Section Certification Exam with Automated Scoring & Certificate Trigger
// ============================================================================

import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUSINESS_FINAL_EXAM_QUESTIONS } from '../../data/business/businessAssessmentData';
import { BusinessCertificateRecord, BusinessCourseLevel } from '../../types/business';
import { useI18n } from '../../i18n/I18nContext';
import { getLocalizedExamQuestion } from '../../data/translations/businessContentI18n';

interface BusinessFinalExamProps {
  level: BusinessCourseLevel;
  studentName: string;
  onExamPassed?: (record: BusinessCertificateRecord) => void;
  onOpenCertificate?: () => void;
}

export const BusinessFinalExam: React.FC<BusinessFinalExamProps> = ({
  level,
  studentName,
  onExamPassed,
  onOpenCertificate,
}) => {
  const { language } = useI18n();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = BUSINESS_FINAL_EXAM_QUESTIONS;
  const currentQ = questions[currentIdx];
  const userChoice = currentQ ? selectedAnswers[currentQ.id] : undefined;

  const handleSelectOption = (idx: number) => {
    if (userChoice !== undefined) return;
    const nextAnswers = { ...selectedAnswers, [currentQ.id]: idx };
    setSelectedAnswers(nextAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);

      const correctCount = questions.filter(
        (q) => selectedAnswers[q.id] === q.correctAnswer
      ).length;
      const scorePct = Math.round((correctCount / questions.length) * 100);

      if (scorePct >= 80) {
        try {
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}

        const certRecord: BusinessCertificateRecord = {
          id: `cert-bj-${Date.now()}`,
          courseLevel: level,
          courseName: 'Business Japanese Comprehensive Course (ビジネス日本語総合講座)',
          studentName: studentName || 'Learner',
          issuedDate: new Date().toLocaleDateString('ja-JP'),
          scorePercentage: scorePct,
          sectionsBreakdown: [
            { section: '敬語 (Keigo)', score: 95 },
            { section: 'ビジネスメール (Email)', score: 90 },
            { section: '電話応対 (Telephone)', score: 85 },
            { section: 'ビジネスマナー (Culture & Etiquette)', score: 92 },
          ],
        };

        onExamPassed?.(certRecord);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length;
  const scorePct = Math.round((correctCount / questions.length) * 100);
  const isPassed = scorePct >= 80;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Award size={20} />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              ビジネス日本語 修了認定試験 (Final Comprehensive Exam)
            </h3>
            <p className="text-xs text-slate-400">
              80% or higher required to obtain the JLPTMaster Certificate of Completion.
            </p>
          </div>
        </div>

        {!isFinished && (
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {currentIdx + 1} / {questions.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        /* Active Question Display */
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
              Section: {currentQ.section.toUpperCase()}
            </span>
            <h4 className="text-base font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
              {currentQ.questionJp}
            </h4>
            <div className="text-xs text-slate-500 italic">
              {getLocalizedExamQuestion(currentQ, language).questionText}
            </div>
          </div>

          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = userChoice === idx;
              const isCorrect = idx === currentQ.correctAnswer;

              let style =
                'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-indigo-300';
              if (userChoice !== undefined) {
                if (isCorrect) {
                  style =
                    'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100';
                } else if (isSelected) {
                  style =
                    'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100';
                } else {
                  style = 'opacity-40 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={userChoice !== undefined}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${style}`}
                >
                  <span className="font-japanese font-medium text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed">
                    {opt}
                  </span>
                  {userChoice !== undefined && (
                    <span className="shrink-0 ml-2">
                      {isCorrect ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      ) : isSelected ? (
                        <XCircle size={16} className="text-rose-500" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5 animate-fade-in">
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                解説 (Explanation)
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-japanese leading-relaxed">
                {currentQ.explanationJp}
              </p>
              <p className="text-[11px] text-slate-500 italic leading-relaxed">
                {getLocalizedExamQuestion(currentQ, language).explanationText}
              </p>
            </div>
          )}

          {userChoice !== undefined && (
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Exam'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center space-y-6 py-4 animate-fade-in">
          <div
            className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-inner ${
              isPassed
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600'
            }`}
          >
            {isPassed ? <Award size={40} /> : <XCircle size={40} />}
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">
              {isPassed ? '合格！ Congratulations!' : '不合格 (Review Needed)'}
            </h4>
            <p className="text-xs text-slate-500">
              {isPassed
                ? 'You have demonstrated solid mastery of Japanese corporate communication standards.'
                : 'Score at least 80% to earn your Certificate of Completion. Review your weak areas and try again.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Your Exam Score
            </span>
            <div
              className={`text-4xl font-black font-mono ${
                isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {scorePct}%
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {correctCount} correct out of {questions.length} questions
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Retake Exam</span>
            </button>

            {isPassed && onOpenCertificate && (
              <button
                type="button"
                onClick={onOpenCertificate}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Award size={16} className="fill-slate-950" />
                <span>View Certificate</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

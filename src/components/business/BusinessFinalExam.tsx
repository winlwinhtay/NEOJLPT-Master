// BUSINESS JAPANESE (ビジネス日本語) FINAL COMPREHENSIVE EXAM
// Multi-Section Certification Exam with Authentic Professional Questions
// Powered by the Shared Learning Session Engine

import React, { useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUSINESS_FINAL_EXAM_QUESTIONS } from '../../data/business/businessAssessmentData';
import { BusinessCourseLevel, BusinessCertificateRecord } from '../../types/business';
import { useI18n } from '../../i18n/I18nContext';
import { getLocalizedExamQuestion } from '../../data/translations/businessContentI18n';
import { adaptBusinessQuizQuestions } from '../../session/adapters/businessAdapter';
import { useLearningSession } from '../../session/hooks/useLearningSession';

interface BusinessFinalExamProps {
  level: BusinessCourseLevel;
  studentName?: string;
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

  const sessionQuestions = useMemo(() => {
    return adaptBusinessQuizQuestions(BUSINESS_FINAL_EXAM_QUESTIONS);
  }, []);

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    isAnswered,
    isCompleted,
    isSubmitting,
    isAdvancing,
    selectedAnswer,
    currentAnswerRecord,
    correctCount,
    accuracyPercentage,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    restartSession,
    result,
  } = useLearningSession({
    sessionId: `business-exam-${level}`,
    mode: 'business_exam',
    questions: sessionQuestions,
    instantFeedback: true,
    autoSubmitOnSelect: false,
    xpPerCorrect: 20,
    completionBonusXP: 50,
    passingThresholdPercentage: 80,
    activityCategory: 'business',
    onComplete: (res) => {
      if (res.isPassed) {
        try {
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}

        const certRecord: BusinessCertificateRecord = {
          id: `cert-bj-${Date.now()}`,
          courseLevel: level,
          courseName: 'Business Japanese Comprehensive Course (ビジネス日本語総合講座)',
          studentName: studentName || 'Learner',
          issuedDate: new Date().toLocaleDateString('ja-JP'),
          scorePercentage: res.accuracyPercentage,
          sectionsBreakdown: [
            { section: '敬語 (Keigo)', score: 95 },
            { section: 'ビジネスメール (Email)', score: 90 },
            { section: '電話応対 (Telephone)', score: 85 },
            { section: 'ビジネスマナー (Culture & Etiquette)', score: 92 },
          ],
        };

        onExamPassed?.(certRecord);
      }
    },
  });

  const handleSelectOption = (idx: number) => {
    if (isAnswered || isSubmitting) return;
    selectAnswer(idx);
    submitAnswer();
  };

  const isPassed = accuracyPercentage >= 80;

  // Find original question for localization helper
  const rawQ = BUSINESS_FINAL_EXAM_QUESTIONS[currentIndex] || BUSINESS_FINAL_EXAM_QUESTIONS[0];
  const localized = getLocalizedExamQuestion(rawQ, language);

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

        {!isCompleted && (
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {totalQuestions}
          </span>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-5 animate-fade-in">
          {/* Section Indicator */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Section: {(currentQuestion.sectionId || 'keigo').toUpperCase()}
            </span>
            <span className="text-xs text-slate-400">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* Context scenario if any */}
          {rawQ.scenarioContext && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold mr-1 text-slate-900 dark:text-white">【状況・場面】:</span>
              {rawQ.scenarioContext}
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-1.5">
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-japanese leading-relaxed">
              {currentQuestion.prompt}
            </div>
            {rawQ.questionEn && (
              <p className="text-xs text-slate-400 italic">
                {localized.questionText}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              const isCorrectAnswer = optIdx === currentQuestion.correctAnswer;

              let btnStyle =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold';
                } else if (isSelected && !currentAnswerRecord?.isCorrect) {
                  btnStyle =
                    'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-bold';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isAnswered || isSubmitting}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-xs sm:text-sm text-left font-japanese transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {optIdx + 1}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && (
                    <span>
                      {isCorrectAnswer ? (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      ) : isSelected ? (
                        <XCircle size={18} className="text-rose-500" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5 animate-fade-in">
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                解説 (Explanation)
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-japanese leading-relaxed">
                {rawQ.explanationJp}
              </p>
              <p className="text-[11px] text-slate-500 italic leading-relaxed">
                {localized.explanationText}
              </p>
            </div>
          )}

          {isAnswered && (
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                disabled={isAdvancing}
                onClick={nextQuestion}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
              >
                <span>{currentIndex + 1 < totalQuestions ? 'Next Question' : 'Complete Exam'}</span>
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
              {accuracyPercentage}%
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {correctCount} correct out of {totalQuestions} questions
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={restartSession}
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

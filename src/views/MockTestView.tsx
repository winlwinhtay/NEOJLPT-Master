import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Volume2,
  Flag,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { useI18n } from '../i18n/I18nContext';
import { ContentService } from '../services/content';
import { AudioButton } from '../components/common/AudioButton';
import { ReportIssueModal } from '../components/common/ReportIssueModal';
import { StorageService } from '../services/storageService';
import { MockTestAttempt, PracticeQuestion } from '../types/practice';
import { adaptMockTestQuestions } from '../session/adapters/mockTestAdapter';
import { useLearningSession } from '../session/hooks/useLearningSession';

export const MockTestView: React.FC = () => {
  const { activeLevel } = useApp();
  const { addXP } = useUser();
  const { rateItem } = useSRS();
  const { t } = useI18n();

  const testKey = `mock-${activeLevel.toLowerCase()}-01`;
  const mockTest = ContentService.questions.getMockTest(testKey) || ContentService.questions.getMockTest('mock-n5-01')!;

  // Test state
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(mockTest.totalTimeMinutes * 60);
  const [srsQueued, setSrsQueued] = useState(false);
  const [reportingQuestion, setReportingQuestion] = useState<PracticeQuestion | null>(null);

  // Adapt all questions across mock test sections into normalized SessionQuestion[]
  const sessionQuestions = useMemo(() => {
    return adaptMockTestQuestions(mockTest);
  }, [mockTest]);

  // Shared Learning Session Engine
  const {
    currentIndex,
    totalQuestions,
    isCompleted,
    isSubmitting,
    isAdvancing,
    selectedAnswer,
    answers,
    selectAnswer,
    submitAnswer,
    jumpToQuestion,
    toggleFlag,
    flaggedQuestionIds,
    completeSession,
    restartSession,
  } = useLearningSession({
    sessionId: mockTest.id,
    mode: 'mock_test',
    questions: sessionQuestions,
    instantFeedback: false,
    autoSubmitOnSelect: false,
  });

  // Calculate current section and section-relative question index
  const { activeSectionIndex, activeQuestionIndex, sectionQuestionOffsetMap } = useMemo(() => {
    let cumulative = 0;
    let secIdx = 0;
    let qIdx = 0;
    const offsetMap: number[][] = [];

    mockTest.sections.forEach((sec, sIndex) => {
      const indices: number[] = [];
      sec.questions.forEach((_, qIndex) => {
        const absIdx = cumulative + qIndex;
        indices.push(absIdx);
        if (absIdx === currentIndex) {
          secIdx = sIndex;
          qIdx = qIndex;
        }
      });
      offsetMap.push(indices);
      cumulative += sec.questions.length;
    });

    return {
      activeSectionIndex: secIdx,
      activeQuestionIndex: qIdx,
      sectionQuestionOffsetMap: offsetMap,
    };
  }, [mockTest.sections, currentIndex]);

  const activeSection = mockTest.sections[activeSectionIndex] || mockTest.sections[0];
  const activeQuestion = activeSection?.questions[activeQuestionIndex] || activeSection?.questions[0];

  // Timer countdown
  useEffect(() => {
    if (!isStarted || isCompleted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isStarted, isCompleted]);

  const handleStartTest = () => {
    restartSession();
    setIsStarted(true);
    setSrsQueued(false);
    setTimeLeftSeconds(mockTest.totalTimeMinutes * 60);
  };

  const handleSelectAnswer = (optIndex: number) => {
    if (isCompleted || !activeQuestion) return;
    selectAnswer(optIndex);
    submitAnswer();
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      jumpToQuestion(currentIndex + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      jumpToQuestion(currentIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    completeSession();

    // Calculate score with official JLPT sectional hurdle (min 19/60 per section)
    const SECTIONAL_HURDLE = 19;
    let anySectionFailedHurdle = false;
    let totalCorrect = 0;
    let totalQCount = 0;

    const sectionScores = mockTest.sections.map((sec) => {
      let secCorrect = 0;
      sec.questions.forEach((q) => {
        totalQCount += 1;
        const userAns = answers[q.id]?.rawAnswer;
        if (userAns === q.correctAnswer) {
          secCorrect += 1;
          totalCorrect += 1;
        }
      });
      const score = Math.round((secCorrect / Math.max(1, sec.questions.length)) * 60);
      if (score < SECTIONAL_HURDLE) {
        anySectionFailedHurdle = true;
      }
      return {
        sectionId: sec.id,
        sectionTitle: sec.title,
        score,
        maxScore: 60,
        correctCount: secCorrect,
        totalCount: sec.questions.length,
      };
    });

    const scaledScore = Math.round((totalCorrect / Math.max(1, totalQCount)) * 180);
    const passed = scaledScore >= mockTest.passingScore && !anySectionFailedHurdle;

    if (passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {}
      addXP(100, 'Passed JLPT Mock Exam');
    }

    const simpleAnswers: Record<string, number> = {};
    Object.keys(answers).forEach((k) => {
      simpleAnswers[k] = answers[k].rawAnswer;
    });

    const attempt: MockTestAttempt = {
      id: 'attempt-' + Date.now(),
      testId: mockTest.id,
      level: mockTest.level,
      date: new Date().toISOString(),
      timeSpentSeconds: mockTest.totalTimeMinutes * 60 - timeLeftSeconds,
      sectionScores,
      totalScore: totalCorrect,
      totalMaxScore: totalQCount,
      passed,
      estimatedScaledScore: scaledScore,
      answers: simpleAnswers,
      flaggedQuestionIds: Object.keys(flaggedQuestionIds).filter((k) => flaggedQuestionIds[k]),
      weakCategories: ['listening'],
      recommendedLessonIds: ['n5-u1-l2'],
    };

    StorageService.saveMockAttempt(attempt);
  };

  const handleQueueMistakesToSRS = () => {
    mockTest.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        const userAns = answers[q.id]?.rawAnswer;
        if (userAns !== q.correctAnswer) {
          const itemType = q.category === 'kanji' ? 'kanji' : q.category === 'grammar' ? 'grammar' : 'vocab';
          rateItem(q.id, itemType, q.level, 'again');
          StorageService.addMistake({
            id: 'mstk-' + q.id,
            question: q.promptJp,
            yourAnswer: String(userAns !== undefined ? q.options[userAns] : 'No answer'),
            correctAnswer: String(q.options[q.correctAnswer as number] || q.correctAnswer),
            explanation: q.explanation || 'Reviewed from mock exam.',
            category: itemType,
          });
        }
      });
    });
    setSrsQueued(true);
  };

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const isLastQuestionOverall = currentIndex >= totalQuestions - 1;

  // Render Start Screen
  if (!isStarted) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Award size={40} />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
              {mockTest.level} {t('mock.badge')}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {mockTest.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              {t('mock.subtitle')}
            </p>
          </div>

          {/* Test Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Duration</span>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {mockTest.totalTimeMinutes} Mins
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Score</span>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {mockTest.totalMaxScore} pts
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Passing Score</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {mockTest.passingScore}+ pts
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Sections</span>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                {mockTest.sections.length} Parts
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleStartTest}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-rose-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-base shadow-xl shadow-brand-500/25 transition-all cursor-pointer"
            >
              {t('mock.startExam')}
            </button>
            <p className="text-[11px] text-slate-400 mt-3">
              {t('mock.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Result Screen
  if (isCompleted) {
    const SECTIONAL_HURDLE = 19;
    let anySectionFailedHurdle = false;
    let failedSectionTitles: string[] = [];
    let totalCorrect = 0;
    let totalQCount = 0;

    mockTest.sections.forEach((s) => {
      let secCorrect = 0;
      s.questions.forEach((q) => {
        totalQCount += 1;
        const userAns = answers[q.id]?.rawAnswer;
        if (userAns === q.correctAnswer) secCorrect += 1;
      });
      totalCorrect += secCorrect;
      const secScaled = Math.round((secCorrect / Math.max(1, s.questions.length)) * 60);
      if (secScaled < SECTIONAL_HURDLE) {
        anySectionFailedHurdle = true;
        failedSectionTitles.push(s.title);
      }
    });

    const scaledScore = Math.round((totalCorrect / Math.max(1, totalQCount)) * 180);
    const passed = scaledScore >= mockTest.passingScore && !anySectionFailedHurdle;

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Result Hero Banner */}
        <div
          className={`p-8 sm:p-12 rounded-3xl text-white shadow-xl relative overflow-hidden ${
            passed
              ? 'bg-gradient-to-br from-emerald-600 to-teal-700'
              : 'bg-gradient-to-br from-rose-600 to-amber-700'
          }`}
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                Official Simulated Result
              </span>
              <h1 className="text-3xl sm:text-5xl font-black">
                {passed ? '合格 (PASSED!)' : '不合格 (NOT PASSED)'}
              </h1>
              <p className="text-sm text-white/90 max-w-md">
                {passed
                  ? `Congratulations! You scored ${scaledScore}/180 and cleared all sectional minimum thresholds.`
                  : anySectionFailedHurdle
                  ? `Sectional Hurdle Failed (<19/60 in ${failedSectionTitles.join(', ')}). Even with a high total, JLPT requires clearing each section.`
                  : `Score: ${scaledScore}/180 (Passing: ${mockTest.passingScore}/180). Keep practicing to reach the passing standard.`}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[160px]">
              <span className="text-xs font-bold text-white/80 uppercase">Scaled Score</span>
              <div className="text-4xl sm:text-5xl font-black my-1">
                {scaledScore}
                <span className="text-lg font-normal text-white/60">/180</span>
              </div>
              <span className="text-[11px] font-bold text-white/90">
                Correct: {totalCorrect} / {totalQCount}
              </span>
            </div>
          </div>
        </div>

        {/* Section Score Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Official Sectional Score Breakdown
            </h2>
            <span className="text-xs text-slate-400 font-bold">
              Min Hurdle: 19/60 per section
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mockTest.sections.map((sec) => {
              let secCorrect = 0;
              sec.questions.forEach((q) => {
                if (answers[q.id]?.rawAnswer === q.correctAnswer) secCorrect += 1;
              });
              const secScore = Math.round((secCorrect / Math.max(1, sec.questions.length)) * 60);
              const hurdleMet = secScore >= SECTIONAL_HURDLE;

              return (
                <div
                  key={sec.id}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    hurdleMet
                      ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20'
                      : 'border-rose-300 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span className="truncate">{sec.title.split(':')[0]}</span>
                    {hurdleMet ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={14} /> Hurdle Cleared
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 font-bold">
                        <AlertTriangle size={14} /> Below 19 Hurdle
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {secScore} <span className="text-sm font-normal text-slate-400">/ 60</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {secCorrect} of {sec.questions.length} questions correct
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleQueueMistakesToSRS}
              disabled={srsQueued}
              className="px-5 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles size={16} />
              {srsQueued ? '✅ Mistakes Added to SRS Review!' : 'Queue Mistakes to SRS Review'}
            </button>

            <button
              onClick={handleStartTest}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw size={16} />
              Retake Mock Exam
            </button>
          </div>
        </div>

        {/* Question-by-Question Review */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            Comprehensive Question Review & Explanations
          </h3>

          <div className="space-y-6">
            {mockTest.sections.map((sec) => (
              <div key={sec.id} className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                  {sec.title}
                </h4>

                <div className="space-y-3">
                  {sec.questions.map((q, idx) => {
                    const userAns = answers[q.id]?.rawAnswer;
                    const isCorrect = userAns === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 sm:p-5 rounded-2xl border text-xs space-y-2 ${
                          isCorrect
                            ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10'
                            : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-400">Question {idx + 1}</span>
                          <span
                            className={`font-black flex items-center gap-1 ${
                              isCorrect
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>

                        <div className="text-sm font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                          {q.promptJp}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div>
                            <span className="text-slate-400">Your choice: </span>
                            <span className={isCorrect ? 'font-bold text-emerald-600' : 'font-bold text-rose-600'}>
                              {userAns !== undefined ? q.options[userAns] : 'No answer'}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Correct answer: </span>
                            <span className="font-bold text-emerald-600">
                              {q.options[q.correctAnswer as number] || q.correctAnswer}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Session Runner
  const isFlagged = !!flaggedQuestionIds[activeQuestion?.id];
  const currentAnswer = answers[activeQuestion?.id]?.rawAnswer;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Top Test Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-black uppercase">
            {mockTest.level} Mock Exam
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
            {activeSection.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Remaining */}
          <div
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-black ${
              timeLeftSeconds < 300
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white'
            }`}
          >
            <Clock size={14} />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSubmitTest}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Finish Test
          </button>
        </div>
      </div>

      {/* Main Grid: Question Content (8 cols) + Question Palette (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Question Area (8 cols) */}
        {activeQuestion && (
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Question Subheader */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {totalQuestions}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReportingQuestion(activeQuestion)}
                  className="p-2 rounded-xl text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                  title="Report question error"
                >
                  <Flag size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => toggleFlag()}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isFlagged
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                  title={isFlagged ? 'Remove flag' : 'Flag question for review'}
                >
                  <Bookmark size={16} fill={isFlagged ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Reading Passage Context if present */}
            {activeQuestion.passage && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-japanese text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                {activeQuestion.passage}
              </div>
            )}

            {/* Question Prompt */}
            <div className="space-y-3">
              <div className="text-xl sm:text-2xl font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                {activeQuestion.promptJp}
              </div>

              {activeQuestion.audioText && (
                <div className="pt-1">
                  <AudioButton text={activeQuestion.audioText} size="md" />
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {activeQuestion.options.map((opt, optIdx) => {
                const isSelected = currentAnswer === optIdx;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSelectAnswer(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-500'
                    }`}
                  >
                    <span>
                      <span className="font-bold mr-2 text-slate-400">{optIdx + 1}.</span>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={currentIndex === 0 || isAdvancing}
                onClick={handlePreviousQuestion}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {isLastQuestionOverall ? (
                <button
                  type="button"
                  onClick={handleSubmitTest}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold hover:opacity-95 flex items-center gap-1.5 shadow-md shadow-brand-500/20 cursor-pointer"
                >
                  <CheckCircle2 size={16} /> Submit & Finish Exam
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isAdvancing}
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Right Section & Question Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {mockTest.sections.map((sec, secIdx) => {
            const sectionIndices = sectionQuestionOffsetMap[secIdx] || [];

            return (
              <div
                key={sec.id}
                className={`p-5 rounded-3xl border-2 transition-all ${
                  activeSectionIndex === secIdx
                    ? 'border-brand-500 bg-white dark:bg-slate-900 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'
                }`}
              >
                <div
                  onClick={() => {
                    const firstSecIndex = sectionIndices[0] ?? 0;
                    jumpToQuestion(firstSecIndex);
                  }}
                  className="flex items-center justify-between cursor-pointer mb-3"
                >
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {sec.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">{sec.questions.length} Qs</span>
                </div>

                {/* Question Number Pills */}
                <div className="flex flex-wrap gap-2">
                  {sec.questions.map((q, qIdx) => {
                    const absIdx = sectionIndices[qIdx] ?? 0;
                    const isAns = answers[q.id] !== undefined;
                    const isFl = flaggedQuestionIds[q.id];
                    const isCurrent = currentIndex === absIdx;

                    let pillStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
                    if (isCurrent) {
                      pillStyle = 'ring-2 ring-brand-500 bg-brand-500 text-white font-black';
                    } else if (isFl) {
                      pillStyle = 'bg-amber-400 text-white font-bold';
                    } else if (isAns) {
                      pillStyle = 'bg-emerald-500 text-white font-bold';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => jumpToQuestion(absIdx)}
                        className={`w-8 h-8 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${pillStyle}`}
                      >
                        {qIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {reportingQuestion && (
        <ReportIssueModal
          isOpen={Boolean(reportingQuestion)}
          onClose={() => setReportingQuestion(null)}
          contentId={reportingQuestion.id}
          module="questions"
          level={reportingQuestion.level}
          currentText={reportingQuestion.promptJp}
        />
      )}
    </div>
  );
};

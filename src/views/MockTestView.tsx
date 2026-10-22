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
  Layers,
  Calendar,
  ShieldCheck,
  Headphones,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { useI18n } from '../i18n/I18nContext';
import { AudioButton } from '../components/common/AudioButton';
import { ReportIssueModal } from '../components/common/ReportIssueModal';
import { StorageService } from '../services/storageService';
import { MockTest, MockTestAttempt, PracticeQuestion, JLPTLevel } from '../types/practice';
import { adaptMockTestQuestions } from '../session/adapters/mockTestAdapter';
import { useLearningSession } from '../session/hooks/useLearningSession';
import { getMockTestsByLevel, getMockTestById, ALL_MOCK_TESTS } from '../data/mockTests';

export const MockTestView: React.FC = () => {
  const { activeLevel } = useApp();
  const { addXP } = useUser();
  const { rateItem } = useSRS();
  const { t } = useI18n();

  // Selected level for browsing sets (defaults to user's active level)
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(activeLevel as JLPTLevel);

  // Selected mock test ID (defaults to set 1 of selected level)
  const [activeTestId, setActiveTestId] = useState<string>(`mock-${activeLevel.toLowerCase()}-01`);

  // Active mock test object
  const currentMockTest: MockTest = useMemo(() => {
    return (
      getMockTestById(activeTestId) ||
      getMockTestById(`mock-${selectedLevel.toLowerCase()}-01`) ||
      ALL_MOCK_TESTS['mock-n5-01']
    );
  }, [activeTestId, selectedLevel]);

  // Load previous test attempts to show past scores on set cards
  const [attempts, setAttempts] = useState<MockTestAttempt[]>([]);
  useEffect(() => {
    setAttempts(StorageService.loadMockAttempts());
  }, []);

  const bestAttemptsByTestId = useMemo(() => {
    const map: Record<string, MockTestAttempt> = {};
    attempts.forEach((att) => {
      if (!map[att.testId] || att.estimatedScaledScore > map[att.testId].estimatedScaledScore) {
        map[att.testId] = att;
      }
    });
    return map;
  }, [attempts]);

  // Test session state
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(currentMockTest.totalTimeMinutes * 60);
  const [srsQueued, setSrsQueued] = useState(false);
  const [reportingQuestion, setReportingQuestion] = useState<PracticeQuestion | null>(null);

  // When changing mock test, reset time
  useEffect(() => {
    setTimeLeftSeconds(currentMockTest.totalTimeMinutes * 60);
  }, [currentMockTest]);

  // Adapt questions for learning session engine
  const sessionQuestions = useMemo(() => {
    return adaptMockTestQuestions(currentMockTest);
  }, [currentMockTest]);

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
    sessionId: currentMockTest.id,
    mode: 'mock_test',
    questions: sessionQuestions,
    instantFeedback: false,
    autoSubmitOnSelect: false,
  });

  // Calculate section indices
  const { activeSectionIndex, activeQuestionIndex, sectionQuestionOffsetMap } = useMemo(() => {
    let cumulative = 0;
    let secIdx = 0;
    let qIdx = 0;
    const offsetMap: number[][] = [];

    currentMockTest.sections.forEach((sec, sIndex) => {
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
  }, [currentMockTest.sections, currentIndex]);

  const activeSection = currentMockTest.sections[activeSectionIndex] || currentMockTest.sections[0];
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

  const handleStartTest = (testId?: string) => {
    if (testId && testId !== activeTestId) {
      setActiveTestId(testId);
    }
    restartSession();
    setIsStarted(true);
    setSrsQueued(false);
    const targetTest = testId ? getMockTestById(testId) || currentMockTest : currentMockTest;
    setTimeLeftSeconds(targetTest.totalTimeMinutes * 60);
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

    const sectionScores = currentMockTest.sections.map((sec) => {
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
    const passed = scaledScore >= currentMockTest.passingScore && !anySectionFailedHurdle;

    if (passed) {
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
        });
      } catch (e) {}
      addXP(100, `Passed ${currentMockTest.title}`);
    }

    const simpleAnswers: Record<string, number> = {};
    Object.keys(answers).forEach((k) => {
      simpleAnswers[k] = answers[k].rawAnswer;
    });

    const attempt: MockTestAttempt = {
      id: 'attempt-' + Date.now(),
      testId: currentMockTest.id,
      level: currentMockTest.level,
      date: new Date().toISOString(),
      timeSpentSeconds: currentMockTest.totalTimeMinutes * 60 - timeLeftSeconds,
      sectionScores,
      totalScore: totalCorrect,
      totalMaxScore: totalQCount,
      passed,
      estimatedScaledScore: scaledScore,
      answers: simpleAnswers,
      flaggedQuestionIds: Object.keys(flaggedQuestionIds).filter((k) => flaggedQuestionIds[k]),
      weakCategories: ['listening'],
      recommendedLessonIds: [`${currentMockTest.level.toLowerCase()}-u1-l2`],
    };

    StorageService.saveMockAttempt(attempt);
    setAttempts(StorageService.loadMockAttempts());
  };

  const handleQueueMistakesToSRS = () => {
    currentMockTest.sections.forEach((sec) => {
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

  const handleBackToSetList = () => {
    setIsStarted(false);
    restartSession();
    setTimeLeftSeconds(currentMockTest.totalTimeMinutes * 60);
  };

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const isLastQuestionOverall = currentIndex >= totalQuestions - 1;

  // Available levels
  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const setsForSelectedLevel = useMemo(() => {
    return getMockTestsByLevel(selectedLevel);
  }, [selectedLevel]);

  // =========================================================================
  // VIEW 1: Set Selection Hub (When test is not running)
  // =========================================================================
  if (!isStarted && !isCompleted) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-black uppercase tracking-wider">
                Historical Series (2020–2025)
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black">
                25 Complete Sets
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              JLPT Mock Examination Hub
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Master official JLPT formats with 5 independent practice sets per level. Each set covers
              Vocabulary & Kanji, Grammar & Reading, and native Japanese listening with standard
              19/60 sectional hurdles and comprehensive explanations in English and Burmese.
            </p>
          </div>
        </div>

        {/* Level Switcher Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            {levels.map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>5 Sets Available for {selectedLevel}</span>
          </div>
        </div>

        {/* 5 Set Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {setsForSelectedLevel.map((test) => {
            const bestAttempt = bestAttemptsByTestId[test.id];
            const isPassed = bestAttempt?.passed;

            return (
              <div
                key={test.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-brand-500 dark:hover:border-brand-500 transition-all shadow-sm group"
              >
                <div className="space-y-4">
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-black text-xs">
                      Set {test.setNumber}
                    </span>

                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {test.historicalYearStyle} Style
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {test.description}
                    </p>
                  </div>

                  {/* Provenance Label */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {test.sourceLabel}
                  </div>

                  {/* Test Specs Chips */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Time</span>
                      <div className="text-xs font-black text-slate-800 dark:text-slate-200 mt-0.5">
                        {test.totalTimeMinutes}m
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Passing</span>
                      <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {test.passingScore}+
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                      <span className="text-[9px] uppercase font-bold text-slate-400">Parts</span>
                      <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {test.sections.length} Sec
                      </div>
                    </div>
                  </div>

                  {/* Previous Attempt Summary if exists */}
                  {bestAttempt && (
                    <div
                      className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                        isPassed
                          ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20'
                          : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20'
                      }`}
                    >
                      <span className="font-bold text-slate-600 dark:text-slate-300">
                        Best Score: {bestAttempt.estimatedScaledScore}/180
                      </span>
                      <span
                        className={`font-black flex items-center gap-1 ${
                          isPassed ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isPassed ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                        {isPassed ? '合格 Passed' : '不合格 Failed'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Launch Button */}
                <div className="pt-6">
                  <button
                    onClick={() => handleStartTest(test.id)}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-brand-600 dark:bg-white dark:hover:bg-brand-500 text-white dark:text-slate-900 dark:hover:text-white font-black text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{bestAttempt ? 'Retake Exam' : 'Start Exam'}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: Examination Results & Question Review
  // =========================================================================
  if (isCompleted) {
    const SECTIONAL_HURDLE = 19;
    let anySectionFailedHurdle = false;
    const failedSectionTitles: string[] = [];
    let totalCorrect = 0;
    let totalQCount = 0;

    currentMockTest.sections.forEach((s) => {
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
    const passed = scaledScore >= currentMockTest.passingScore && !anySectionFailedHurdle;

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Navigation Bar back to Set list */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToSetList}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Test Sets</span>
          </button>
          <span className="text-xs font-black text-brand-600 uppercase tracking-wider">
            {currentMockTest.title}
          </span>
        </div>

        {/* Result Hero Banner */}
        <div
          className={`p-8 sm:p-12 rounded-3xl text-white shadow-xl relative overflow-hidden ${
            passed
              ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800'
              : 'bg-gradient-to-br from-rose-600 via-amber-700 to-rose-800'
          }`}
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                Official Simulated Result ({currentMockTest.historicalYearStyle})
              </span>
              <h1 className="text-3xl sm:text-5xl font-black">
                {passed ? '合格 (PASSED!)' : '不合格 (NOT PASSED)'}
              </h1>
              <p className="text-sm text-white/90 max-w-md leading-relaxed">
                {passed
                  ? `Congratulations! You scored ${scaledScore}/180 and cleared all sectional hurdles (≥19/60).`
                  : anySectionFailedHurdle
                  ? `Sectional Hurdle Failed (<19/60 in ${failedSectionTitles.join(
                      ', '
                    )}). Official JLPT rules require clearing each section.`
                  : `Score: ${scaledScore}/180 (Passing: ${currentMockTest.passingScore}/180). Keep practicing to reach the passing standard.`}
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
            {currentMockTest.sections.map((sec) => {
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
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 size={14} /> Cleared
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 font-bold">
                        <AlertTriangle size={14} /> Below 19
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

            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToSetList}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers size={16} />
                All Sets
              </button>

              <button
                onClick={() => handleStartTest(currentMockTest.id)}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-brand-500/20"
              >
                <RotateCcw size={16} />
                Retake Set {currentMockTest.setNumber}
              </button>
            </div>
          </div>
        </div>

        {/* Question-by-Question Review */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            Comprehensive Review & Explanations (EN + Myanmar)
          </h3>

          <div className="space-y-6">
            {currentMockTest.sections.map((sec) => (
              <div key={sec.id} className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                  {sec.title}
                </h4>

                <div className="space-y-4">
                  {sec.questions.map((q, idx) => {
                    const userAns = answers[q.id]?.rawAnswer;
                    const isCorrect = userAns === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border text-xs space-y-3 ${
                          isCorrect
                            ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                            : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10'
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

                        {/* Passage if reading */}
                        {q.passage && (
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-japanese text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                            {q.passage}
                          </div>
                        )}

                        {/* Prompt */}
                        <div className="text-sm font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                          {q.promptJp}
                        </div>

                        {/* Listening Revealed Audio & Transcript */}
                        {q.audioText && (
                          <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                                <Headphones size={13} /> Audio Transcript (聴解スクリプト)
                              </span>
                              <AudioButton text={q.audioText} size="sm" />
                            </div>
                            <p className="text-xs font-japanese text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                              {q.audioText}
                            </p>
                          </div>
                        )}

                        {/* Choices compare */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div>
                            <span className="text-slate-400">Your choice: </span>
                            <span
                              className={isCorrect ? 'font-bold text-emerald-600' : 'font-bold text-rose-600'}
                            >
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

                        {/* Explanations (EN + Myanmar) */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                          {q.explanationMy && (
                            <p className="text-[11px] text-indigo-900 dark:text-indigo-200 leading-relaxed">
                              <strong>ရှင်းလင်းချက်:</strong> {q.explanationMy}
                            </p>
                          )}
                        </div>
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

  // =========================================================================
  // VIEW 3: Active Examination Runner
  // =========================================================================
  const isFlagged = !!flaggedQuestionIds[activeQuestion?.id];
  const currentAnswer = answers[activeQuestion?.id]?.rawAnswer;
  const isListeningQuestion = activeQuestion?.category === 'listening' || !!activeQuestion?.audioText;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Top Test Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-black uppercase">
            {currentMockTest.level} Set {currentMockTest.setNumber}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline truncate max-w-md">
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
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-japanese text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                {activeQuestion.passage}
              </div>
            )}

            {/* Listening Audio Player Card (Active Exam: Strict Privacy, Transcript Hidden) */}
            {isListeningQuestion && activeQuestion.audioText && (
              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-black text-xs">
                    <Headphones size={18} />
                    <span>Japanese Listening Audio (聴解音声)</span>
                  </div>
                  <AudioButton text={activeQuestion.audioText} size="md" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tap the speaker to listen to the Japanese dialogue. In accordance with examination
                  standards, the dialogue transcript will be revealed during post-exam review.
                </p>
              </div>
            )}

            {/* Question Prompt */}
            <div className="space-y-3">
              <div className="text-xl sm:text-2xl font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                {activeQuestion.promptJp}
              </div>
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
          {currentMockTest.sections.map((sec, secIdx) => {
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

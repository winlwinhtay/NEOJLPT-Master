import React, { useState, useEffect } from 'react';
import {
  Award,
  Clock,
  Flag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Volume2,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { useI18n } from '../i18n/I18nContext';
import { MOCK_TESTS } from '../data/mockTestData';
import { AudioButton } from '../components/common/AudioButton';
import { ReportIssueModal } from '../components/common/ReportIssueModal';
import { StorageService } from '../services/storageService';
import { MockTestAttempt, PracticeQuestion } from '../types/practice';
import confetti from 'canvas-confetti';

export const MockTestView: React.FC = () => {
  const { activeLevel } = useApp();
  const { addXP } = useUser();
  const { rateItem } = useSRS();
  const { t, language } = useI18n();

  const testKey = `mock-${activeLevel.toLowerCase()}-01`;
  const mockTest = MOCK_TESTS[testKey] || MOCK_TESTS['mock-n5-01'];

  // Test state
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(mockTest.totalTimeMinutes * 60);
  const [srsQueued, setSrsQueued] = useState(false);
  const [reportingQuestion, setReportingQuestion] = useState<PracticeQuestion | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isStarted || isFinished) return;
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
  }, [isStarted, isFinished]);

  const activeSection = mockTest.sections[activeSectionIndex];
  const activeQuestion = activeSection?.questions[activeQuestionIndex];

  const handleStartTest = () => {
    setIsStarted(true);
    setIsFinished(false);
    setAnswers({});
    setFlagged({});
    setSrsQueued(false);
    setTimeLeftSeconds(mockTest.totalTimeMinutes * 60);
    setActiveSectionIndex(0);
    setActiveQuestionIndex(0);
  };

  const handleSelectAnswer = (optIndex: number) => {
    if (isFinished || !activeQuestion) return;
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: optIndex }));
  };

  const handleToggleFlag = () => {
    if (!activeQuestion) return;
    setFlagged((prev) => ({ ...prev, [activeQuestion.id]: !prev[activeQuestion.id] }));
  };

  const handleSubmitTest = () => {
    setIsFinished(true);

    // Calculate score with official JLPT sectional hurdle (min 19/60 per section)
    const SECTIONAL_HURDLE = 19;
    let anySectionFailedHurdle = false;
    let totalCorrect = 0;
    let totalQuestions = 0;
    const sectionScores = mockTest.sections.map((sec) => {
      let secCorrect = 0;
      sec.questions.forEach((q) => {
        totalQuestions += 1;
        if (answers[q.id] === q.correctAnswer) {
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

    const scaledScore = Math.round((totalCorrect / Math.max(1, totalQuestions)) * 180);
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

    const attempt: MockTestAttempt = {
      id: 'attempt-' + Date.now(),
      testId: mockTest.id,
      level: mockTest.level,
      date: new Date().toISOString(),
      timeSpentSeconds: mockTest.totalTimeMinutes * 60 - timeLeftSeconds,
      sectionScores,
      totalScore: totalCorrect,
      totalMaxScore: totalQuestions,
      passed,
      estimatedScaledScore: scaledScore,
      answers,
      flaggedQuestionIds: Object.keys(flagged).filter((k) => flagged[k]),
      weakCategories: ['listening'],
      recommendedLessonIds: ['n5-u1-l2'],
    };

    StorageService.saveMockAttempt(attempt);
  };

  const handleQueueMistakesToSRS = () => {
    let count = 0;
    mockTest.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        if (answers[q.id] !== q.correctAnswer) {
          const itemType = q.category === 'kanji' ? 'kanji' : q.category === 'grammar' ? 'grammar' : 'vocab';
          rateItem(q.id, itemType, q.level, 'again');
          StorageService.addMistake({
            id: 'mstk-' + q.id,
            question: q.promptJp,
            yourAnswer: String(answers[q.id] !== undefined ? q.options[answers[q.id]] : 'No answer'),
            correctAnswer: String(q.options[q.correctAnswer as number] || q.correctAnswer),
            explanation: q.explanation || 'Reviewed from mock exam.',
            category: itemType,
          });
          count++;
        }
      });
    });
    setSrsQueued(true);
  };

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;

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
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-rose-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-base shadow-xl shadow-brand-500/25 transition-all"
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
  if (isFinished) {
    const SECTIONAL_HURDLE = 19;
    let anySectionFailedHurdle = false;
    let failedSectionTitles: string[] = [];
    let totalCorrect = 0;
    let totalQuestions = 0;

    mockTest.sections.forEach((s) => {
      let secCorrect = 0;
      s.questions.forEach((q) => {
        totalQuestions += 1;
        if (answers[q.id] === q.correctAnswer) secCorrect += 1;
      });
      totalCorrect += secCorrect;
      const secScaled = Math.round((secCorrect / Math.max(1, s.questions.length)) * 60);
      if (secScaled < SECTIONAL_HURDLE) {
        anySectionFailedHurdle = true;
        failedSectionTitles.push(s.title);
      }
    });

    const scaledScore = Math.round((totalCorrect / Math.max(1, totalQuestions)) * 180);
    const passedTotal = scaledScore >= mockTest.passingScore;
    const passed = passedTotal && !anySectionFailedHurdle;
    const missedCount = totalQuestions - totalCorrect;

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg ${
              passed
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-rose-500 text-white shadow-rose-500/30'
            }`}
          >
            {passed ? <CheckCircle2 size={40} /> : <AlertCircle size={40} />}
          </div>

          <div className="space-y-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                passed
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : passedTotal && anySectionFailedHurdle
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              }`}
            >
              {passed
                ? 'PROBABLE PASS (合格見込み)'
                : passedTotal && anySectionFailedHurdle
                ? 'SECTIONAL HURDLE FAILED (基準点未達)'
                : 'NOT YET PASSED (要復習)'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-2">
              {scaledScore} <span className="text-xl font-normal text-slate-400">/ 180</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Estimated JLPT Scaled Score • Passing Threshold: {mockTest.passingScore} pts • Sectional Hurdle: ≥19/60 pts
            </p>

            {passedTotal && anySectionFailedHurdle && (
              <div className="p-3 mt-3 max-w-lg mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 text-left">
                ⚠️ <strong>Official JLPT Requirement:</strong> While your total scaled score ({scaledScore}/180) exceeds the passing mark ({mockTest.passingScore}), the official JLPT requires a minimum of 19 points in every section. You fell below the hurdle in: <em>{failedSectionTitles.join(', ')}</em>.
              </div>
            )}
          </div>

          {/* Section Score Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-left">
            {mockTest.sections.map((sec) => {
              let secCorrect = 0;
              sec.questions.forEach((q) => {
                if (answers[q.id] === q.correctAnswer) secCorrect += 1;
              });
              const secScaled = Math.round((secCorrect / Math.max(1, sec.questions.length)) * 60);
              const hurdleMet = secScaled >= SECTIONAL_HURDLE;

              return (
                <div
                  key={sec.id}
                  className={`p-4 rounded-2xl border space-y-1 ${
                    hurdleMet
                      ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                      : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase truncate">
                      {sec.title}
                    </span>
                    <span className={`text-[10px] font-bold ${hurdleMet ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {hurdleMet ? '≥19 Met' : '<19 Failed'}
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {secScaled} / 60
                  </div>
                  <div className="text-xs text-slate-500">
                    {secCorrect}/{sec.questions.length} correct
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions: Retake and SRS Tie-in */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <button
              onClick={handleStartTest}
              className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw size={16} /> Retake Exam
            </button>

            {missedCount > 0 && (
              <button
                type="button"
                disabled={srsQueued}
                onClick={handleQueueMistakesToSRS}
                className="px-6 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Layers size={16} />
                {srsQueued ? '✅ Added to Daily SRS Review Queue!' : `Add ${missedCount} Missed Questions to SRS`}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam In Progress
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Top Floating Exam Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            {mockTest.level} Mock Exam • {activeSection?.title}
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Question {activeQuestionIndex + 1} of {activeSection?.questions.length}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-black text-slate-900 dark:text-white">
            <Clock size={16} className="text-brand-500 animate-pulse" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={handleSubmitTest}
            className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Grid: Left Question, Right Question Navigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Question Box (8 cols) */}
        {activeQuestion && (
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase">
                {activeQuestion.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReportingQuestion(activeQuestion)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Report mistake or suggestion"
                >
                  <Flag size={13} />
                  <span>Report</span>
                </button>
                <button
                  type="button"
                  onClick={handleToggleFlag}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                    flagged[activeQuestion.id]
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Flag size={14} className={flagged[activeQuestion.id] ? 'fill-amber-500' : ''} />
                  {flagged[activeQuestion.id] ? 'Flagged for Review' : 'Flag Question'}
                </button>
              </div>
            </div>

            {/* Prompt */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                {activeQuestion.promptJp}
              </h3>
              {activeQuestion.audioText && (
                <div className="pt-2">
                  <AudioButton text={activeQuestion.audioText} size="md" showLabel />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeQuestion.options.map((opt, optIdx) => {
                const isSelected = answers[activeQuestion.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectAnswer(optIdx)}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{optIdx + 1}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={activeQuestionIndex === 0 && activeSectionIndex === 0}
                onClick={() => {
                  if (activeQuestionIndex > 0) {
                    setActiveQuestionIndex((prev) => prev - 1);
                  } else if (activeSectionIndex > 0) {
                    setActiveSectionIndex((prev) => prev - 1);
                    setActiveQuestionIndex(mockTest.sections[activeSectionIndex - 1].questions.length - 1);
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 flex items-center gap-1"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                type="button"
                onClick={() => {
                  if (activeQuestionIndex < activeSection.questions.length - 1) {
                    setActiveQuestionIndex((prev) => prev + 1);
                  } else if (activeSectionIndex < mockTest.sections.length - 1) {
                    setActiveSectionIndex((prev) => prev + 1);
                    setActiveQuestionIndex(0);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 flex items-center gap-1"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Right Section & Question Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {mockTest.sections.map((sec, secIdx) => (
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
                  setActiveSectionIndex(secIdx);
                  setActiveQuestionIndex(0);
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
                  const isAns = answers[q.id] !== undefined;
                  const isFl = flagged[q.id];
                  const isCurrent = activeSectionIndex === secIdx && activeQuestionIndex === qIdx;

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
                      onClick={() => {
                        setActiveSectionIndex(secIdx);
                        setActiveQuestionIndex(qIdx);
                      }}
                      className={`w-8 h-8 rounded-xl text-xs flex items-center justify-center transition-all ${pillStyle}`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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

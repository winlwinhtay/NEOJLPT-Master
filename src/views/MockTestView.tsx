import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Play,
  Pause,
  AlertCircle,
  Lock,
  Compass,
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
import { ExamMode, SimulationSessionState } from '../types/examSimulator';
import { getOfficialBlueprint } from '../data/examBlueprints';
import { ExamSimulatorService } from '../services/examSimulatorService';
import { getMockTestsByLevel, getMockTestById, ALL_MOCK_TESTS } from '../data/mockTests';

export const MockTestView: React.FC = () => {
  const { activeLevel } = useApp();
  const { addXP } = useUser();
  const { rateItem } = useSRS();
  const { t } = useI18n();

  // Mode Selection: 'full_simulation' | 'practice'
  const [examMode, setExamMode] = useState<ExamMode>('full_simulation');

  // Selected level for browsing
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>(activeLevel as JLPTLevel);

  // Selected test ID
  const [activeTestId, setActiveTestId] = useState<string>(`mock-${activeLevel.toLowerCase()}-01`);

  // Active mock test object
  const currentMockTest: MockTest = useMemo(() => {
    return (
      getMockTestById(activeTestId) ||
      getMockTestById(`mock-${selectedLevel.toLowerCase()}-01`) ||
      ALL_MOCK_TESTS['mock-n5-01']
    );
  }, [activeTestId, selectedLevel]);

  // Official blueprint for current level
  const officialBlueprint = useMemo(() => {
    return getOfficialBlueprint(currentMockTest.level);
  }, [currentMockTest.level]);

  // Historical attempt history for set cards
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

  // Briefing modal state (before starting strict simulation)
  const [showBriefingModal, setShowBriefingModal] = useState<boolean>(false);
  const [pendingTestToStart, setPendingTestToStart] = useState<MockTest | null>(null);

  // Simulation Session State
  const [sessionState, setSessionState] = useState<SimulationSessionState | null>(null);

  // Current active section questions and active question index within that section
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [flaggedIds, setFlaggedIds] = useState<Record<string, boolean>>({});
  const [audioPlayedMap, setAudioPlayedMap] = useState<Record<string, boolean>>({});
  const [srsQueued, setSrsQueued] = useState<boolean>(false);
  const [reportingQuestion, setReportingQuestion] = useState<PracticeQuestion | null>(null);

  // Completed Attempt Result State (for review screen)
  const [completedAttempt, setCompletedAttempt] = useState<MockTestAttempt | null>(null);

  // Remaining Seconds in the currently active section
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  // Rehydrate existing active simulation session on mount (survives browser refresh)
  useEffect(() => {
    const existing = ExamSimulatorService.loadActiveSession();
    if (existing && !existing.isCompleted) {
      setSessionState(existing);
      setActiveTestId(existing.testId);
      setSelectedLevel(existing.level);
      setExamMode(existing.mode);

      // Verify timer status
      const currentSec = existing.sections[existing.currentSectionIndex];
      if (currentSec) {
        const rem = ExamSimulatorService.getRemainingSeconds(currentSec);
        setRemainingSeconds(rem);
        if (rem <= 0 && !currentSec.isSubmitted && existing.mode === 'full_simulation') {
          // Timeout occurred while user was away
          handleAutoSectionTimeout(existing, existing.currentSectionIndex);
        }
      }
    }
  }, []);

  // Timer interval for the active section (authoritative deadline based)
  useEffect(() => {
    if (!sessionState || sessionState.isCompleted || sessionState.isTransitioning) return;

    const currentSec = sessionState.sections[sessionState.currentSectionIndex];
    if (!currentSec || currentSec.isSubmitted || currentSec.isLocked) return;

    const interval = setInterval(() => {
      const rem = ExamSimulatorService.getRemainingSeconds(currentSec);
      setRemainingSeconds(rem);

      if (rem <= 0) {
        clearInterval(interval);
        if (sessionState.mode === 'full_simulation') {
          handleAutoSectionTimeout(sessionState, sessionState.currentSectionIndex);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionState]);

  // Current section questions based on currentMockTest
  const currentSection = useMemo(() => {
    if (!sessionState) return currentMockTest.sections[0];
    return currentMockTest.sections[sessionState.currentSectionIndex] || currentMockTest.sections[0];
  }, [currentMockTest, sessionState]);

  const currentQuestions = useMemo(() => {
    return currentSection?.questions || [];
  }, [currentSection]);

  const activeQuestion = currentQuestions[activeQuestionIndex] || currentQuestions[0];

  // Auto-submit section on timeout
  const handleAutoSectionTimeout = (
    currentSession: SimulationSessionState,
    sectionIndex: number
  ) => {
    const secData = currentMockTest.sections[sectionIndex];
    const duration = secData?.timeLimitMinutes || 30;
    const updated = ExamSimulatorService.submitSection(currentSession, sectionIndex, duration);
    setSessionState(updated);

    if (updated.isCompleted) {
      finalizeExam(updated);
    }
  };

  // Launch test initiation
  const handleInitiateStart = (test: MockTest) => {
    if (examMode === 'full_simulation') {
      setPendingTestToStart(test);
      setShowBriefingModal(true);
    } else {
      startExamDirect(test, 'practice');
    }
  };

  const startExamDirect = (test: MockTest, mode: ExamMode) => {
    setActiveTestId(test.id);
    setSelectedLevel(test.level);
    setActiveQuestionIndex(0);
    setFlaggedIds({});
    setAudioPlayedMap({});
    setSrsQueued(false);
    setCompletedAttempt(null);
    setShowBriefingModal(false);

    const sectionsInfo = test.sections.map((s) => ({
      sectionId: s.id as any,
      durationMinutes: s.timeLimitMinutes,
    }));

    const session = ExamSimulatorService.initializeSession(test.id, test.level, mode, sectionsInfo);
    setSessionState(session);
    setRemainingSeconds(test.sections[0].timeLimitMinutes * 60);
  };

  // Transition to next section
  const handleProceedToNextSection = () => {
    if (!sessionState) return;
    const nextIdx = sessionState.currentSectionIndex + 1;
    const nextSec = currentMockTest.sections[nextIdx];
    if (!nextSec) return;

    setActiveQuestionIndex(0);
    const updated = ExamSimulatorService.startSection(
      sessionState,
      nextIdx,
      nextSec.timeLimitMinutes
    );
    setSessionState(updated);
    setRemainingSeconds(nextSec.timeLimitMinutes * 60);
  };

  // Answer selection in active section
  const handleSelectAnswer = (optIndex: number) => {
    if (!sessionState || !activeQuestion) return;
    const sec = sessionState.sections[sessionState.currentSectionIndex];
    if (sec?.isLocked || sec?.isSubmitted) return;

    const updated = ExamSimulatorService.recordAnswer(sessionState, activeQuestion.id, optIndex);
    setSessionState(updated);
  };

  // Section submission (manual)
  const handleManualSubmitSection = () => {
    if (!sessionState) return;
    const secIdx = sessionState.currentSectionIndex;
    const secData = currentMockTest.sections[secIdx];
    const duration = secData?.timeLimitMinutes || 30;

    const updated = ExamSimulatorService.submitSection(sessionState, secIdx, duration);
    setSessionState(updated);

    if (updated.isCompleted) {
      finalizeExam(updated);
    }
  };

  // Finalize exam results
  const finalizeExam = (session: SimulationSessionState) => {
    const attempt = ExamSimulatorService.evaluateFinalResults(
      session,
      currentMockTest.level,
      currentMockTest.sections
    );
    setCompletedAttempt(attempt);
    setAttempts(StorageService.loadMockAttempts());

    if (attempt.passed) {
      try {
        confetti({
          particleCount: 130,
          spread: 90,
          origin: { y: 0.5 },
        });
      } catch (e) {}
      addXP(150, `Passed ${currentMockTest.title} (${session.mode === 'full_simulation' ? 'Full Simulation' : 'Practice'})`);
    }
  };

  const handleQueueMistakesToSRS = () => {
    if (!completedAttempt) return;
    currentMockTest.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        const userAns = completedAttempt.answers[q.id];
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

  const handleReturnToHub = () => {
    ExamSimulatorService.clearActiveSession();
    setSessionState(null);
    setCompletedAttempt(null);
  };

  // Helper values
  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const setsForSelectedLevel = useMemo(() => {
    return getMockTestsByLevel(selectedLevel);
  }, [selectedLevel]);

  const activeSectionAnswers = sessionState?.sections[sessionState.currentSectionIndex]?.answers || {};
  const currentAnswer = activeQuestion ? activeSectionAnswers[activeQuestion.id] : undefined;
  const isFlagged = activeQuestion ? !!flaggedIds[activeQuestion.id] : false;
  const isListeningQuestion = activeQuestion?.category === 'listening' || !!activeQuestion?.audioText;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const isWarningTime = remainingSeconds < 300 && remainingSeconds > 0;

  // =========================================================================
  // VIEW 1: RESULTS & COMPREHENSIVE QUESTION REVIEW
  // =========================================================================
  if (completedAttempt) {
    const passed = completedAttempt.passed;
    const SECTIONAL_HURDLE = officialBlueprint.sectionalHurdle; // 19 / 60
    const failedHurdleSections = completedAttempt.sectionScores.filter(
      (s) => s.score < SECTIONAL_HURDLE
    );

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Navigation Bar back to Set list */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleReturnToHub}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Examination Hub</span>
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
                  ? `Congratulations! You scored ${completedAttempt.estimatedScaledScore}/180 and cleared all sectional hurdles (≥19/60).`
                  : failedHurdleSections.length > 0
                  ? `Sectional Hurdle Failed (<19/60 in ${failedHurdleSections
                      .map((s) => s.sectionTitle.split(':')[0])
                      .join(', ')}). Official JLPT rules require clearing each section.`
                  : `Score: ${completedAttempt.estimatedScaledScore}/180 (Passing: ${currentMockTest.passingScore}/180). Keep practicing to reach the passing standard.`}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[160px]">
              <span className="text-xs font-bold text-white/80 uppercase">Scaled Score</span>
              <div className="text-4xl sm:text-5xl font-black my-1">
                {completedAttempt.estimatedScaledScore}
                <span className="text-lg font-normal text-white/60">/180</span>
              </div>
              <span className="text-[11px] font-bold text-white/90">
                Correct: {completedAttempt.totalScore} / {completedAttempt.totalMaxScore}
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
            {completedAttempt.sectionScores.map((sec) => {
              const hurdleMet = sec.score >= SECTIONAL_HURDLE;

              return (
                <div
                  key={sec.sectionId}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    hurdleMet
                      ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20'
                      : 'border-rose-300 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span className="truncate">{sec.sectionTitle.split(':')[0]}</span>
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
                    {sec.score} <span className="text-sm font-normal text-slate-400">/ 60</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {sec.correctCount} of {sec.totalCount} questions correct
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
                onClick={handleReturnToHub}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers size={16} />
                All Sets
              </button>

              <button
                onClick={() => handleInitiateStart(currentMockTest)}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-brand-500/20"
              >
                <RotateCcw size={16} />
                Retake Examination
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Question Review */}
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
                    const userAns = completedAttempt.answers[q.id];
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

                        {/* Reading Passage */}
                        {q.passage && (
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-japanese text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                            {q.passage}
                          </div>
                        )}

                        {/* Prompt */}
                        <div className="text-sm font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                          {q.promptJp}
                        </div>

                        {/* Revealed Listening Audio & Transcript */}
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
  // VIEW 2: SECTION TRANSITION SCREEN (Between Sections)
  // =========================================================================
  if (sessionState && sessionState.isTransitioning) {
    const nextIdx = sessionState.currentSectionIndex + 1;
    const nextSection = currentMockTest.sections[nextIdx];

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-xl mx-auto space-y-6 animate-fade-in text-center my-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-brand-600 mx-auto flex items-center justify-center">
            <Lock size={32} />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-black uppercase">
              Section {sessionState.currentSectionIndex + 1} Locked & Submitted
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Ready for {nextSection?.title.split(':')[0] || 'Next Section'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Your previous section answers have been recorded securely. Take a short breather before
              initiating the next examination section.
            </p>
          </div>

          {nextSection && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">{nextSection.title}</div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Time Allowed:</span>
                <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                  {nextSection.timeLimitMinutes} minutes
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Questions:</span>
                <span className="font-mono font-bold">{nextSection.questions.length} questions</span>
              </div>
            </div>
          )}

          <button
            onClick={handleProceedToNextSection}
            className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm transition-all shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Begin Next Section</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: ACTIVE EXAMINATION RUNNER
  // =========================================================================
  if (sessionState && !sessionState.isCompleted) {
    const isLastQuestionInSection = activeQuestionIndex >= currentQuestions.length - 1;
    const isFinalSection = sessionState.currentSectionIndex >= currentMockTest.sections.length - 1;

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
        {/* Top Header Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-black uppercase">
              {currentMockTest.level} Set {currentMockTest.setNumber}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate max-w-md">
              {currentSection.title}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                sessionState.mode === 'full_simulation'
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
              }`}
            >
              {sessionState.mode === 'full_simulation' ? 'Strict Simulation' : 'Practice Mode'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Timer */}
            <div
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-black ${
                isWarningTime
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
              onClick={handleManualSubmitSection}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              {isFinalSection ? 'Finish Examination' : 'Submit Section'}
            </button>
          </div>
        </div>

        {/* Main Grid: Question (8 cols) + Section Question Palette (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Area */}
          {activeQuestion && (
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              {/* Question Subheader */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  Question {activeQuestionIndex + 1} of {currentQuestions.length}
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
                    onClick={() =>
                      setFlaggedIds((prev) => ({
                        ...prev,
                        [activeQuestion.id]: !prev[activeQuestion.id],
                      }))
                    }
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

              {/* Reading Passage if present */}
              {activeQuestion.passage && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-japanese text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                  {activeQuestion.passage}
                </div>
              )}

              {/* Listening Audio Control */}
              {isListeningQuestion && activeQuestion.audioText && (
                <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-black text-xs">
                      <Headphones size={18} />
                      <span>Japanese Listening Audio (聴解音声)</span>
                    </div>

                    <div
                      onClick={() =>
                        setAudioPlayedMap((prev) => ({ ...prev, [activeQuestion.id]: true }))
                      }
                    >
                      <AudioButton text={activeQuestion.audioText} size="md" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {sessionState.mode === 'full_simulation'
                      ? 'Official Simulation Mode: Tap the speaker to listen. In accordance with JLPT regulations, dialogue transcripts are disclosed during post-exam review.'
                      : 'Practice Mode: Tap to listen or replay as needed.'}
                  </p>
                </div>
              )}

              {/* Prompt */}
              <div className="space-y-3">
                <div className="text-xl sm:text-2xl font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                  {activeQuestion.promptJp}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {activeQuestion.options.map((opt, optIdx) => {
                  const isSelected = currentAnswer === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
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

              {/* Navigation Controls within Active Section */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {isLastQuestionInSection ? (
                  <button
                    type="button"
                    onClick={handleManualSubmitSection}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold hover:opacity-95 flex items-center gap-1.5 shadow-md shadow-brand-500/20 cursor-pointer"
                  >
                    <CheckCircle2 size={16} />
                    {isFinalSection ? 'Complete Exam' : 'Finish This Section'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveQuestionIndex((prev) =>
                        Math.min(currentQuestions.length - 1, prev + 1)
                      )
                    }
                    className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 flex items-center gap-1 cursor-pointer"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right Palette: Current Section Question Navigator */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-3xl border-2 border-brand-500 bg-white dark:bg-slate-900 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentSection.title.split(':')[0]} Navigator
                </h4>
                <span className="text-[10px] text-slate-400">
                  {Object.keys(activeSectionAnswers).length} / {currentQuestions.length} answered
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentQuestions.map((q, qIdx) => {
                  const isAns = activeSectionAnswers[q.id] !== undefined;
                  const isFl = flaggedIds[q.id];
                  const isCurrent = activeQuestionIndex === qIdx;

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
                      onClick={() => setActiveQuestionIndex(qIdx)}
                      className={`w-9 h-9 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${pillStyle}`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Progress note */}
              <p className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                Section lock policy: Once submitted or when the timer expires, this section will be
                locked and subsequent sections will unlock in sequence.
              </p>
            </div>
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
  }

  // =========================================================================
  // VIEW 4: EXAMINATION HUB & SET SELECTOR
  // =========================================================================
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-indigo-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-black uppercase tracking-wider">
              Realistic JLPT Examination Simulator
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black">
              Official Blueprints & Timers
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            JLPT Examination & Practice Simulator
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Experience realistic examination conditions with independent section timers, authoritative
            countdown enforcement, sequential section locking, native Japanese listening playback, and
            19/60 sectional hurdle grading across all JLPT levels (N5–N1).
          </p>

          {/* Mode Switcher Toggle */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setExamMode('full_simulation')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                examMode === 'full_simulation'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <ShieldCheck size={15} />
              <span>Full JLPT Simulation</span>
            </button>

            <button
              onClick={() => setExamMode('practice')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                examMode === 'practice'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Compass size={15} />
              <span>Practice Mode</span>
            </button>
          </div>
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
          <Clock size={15} className="text-indigo-500" />
          <span>
            Official Format: {officialBlueprint.totalTimeMinutes}m total ({officialBlueprint.sections.length} Sections)
          </span>
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

                {/* Section Timing Breakdown */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Official Sections:
                  </span>
                  <div className="space-y-1">
                    {test.sections.map((sec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300"
                      >
                        <span className="truncate max-w-[200px]">{sec.title.split(':')[0]}</span>
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          {sec.timeLimitMinutes} min
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Attempt Badge if exists */}
                {bestAttempt && (
                  <div
                    className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                      isPassed
                        ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20'
                    }`}
                  >
                    <span className="font-bold text-slate-600 dark:text-slate-300">
                      Best: {bestAttempt.estimatedScaledScore}/180 pts
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

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => handleInitiateStart(test)}
                  className={`w-full py-3 px-4 rounded-2xl font-black text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                    examMode === 'full_simulation'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                      : 'bg-slate-900 hover:bg-brand-600 dark:bg-white dark:hover:bg-brand-500 text-white dark:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>
                    {examMode === 'full_simulation'
                      ? 'Start Official Simulation'
                      : bestAttempt
                      ? 'Retake Practice Set'
                      : 'Start Practice Set'}
                  </span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pre-Exam Official Briefing Modal (for Full JLPT Simulation) */}
      {showBriefingModal && pendingTestToStart && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                <ShieldCheck size={26} />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-black uppercase">
                  Full JLPT Simulation Rules
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {pendingTestToStart.title}
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                You are about to launch a strict simulation adhering to official JLPT examination
                protocols:
              </p>
              <ul className="space-y-2 list-disc list-inside bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <li>
                  <strong>Authoritative Section Timers:</strong> Each section runs on a locked timer.
                  Refreshing the browser or switching tabs will not reset the countdown.
                </li>
                <li>
                  <strong>Sequential Section Locking:</strong> When time expires or when you submit a
                  section, it is permanently locked and cannot be edited.
                </li>
                <li>
                  <strong>Examination Privacy:</strong> Correct answers, explanations, and listening
                  dialogue transcripts are suppressed during the test.
                </li>
                <li>
                  <strong>Official Hurdle Scoring:</strong> Results evaluate both total score and the
                  mandatory 19/60 sectional hurdle.
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBriefingModal(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => startExamDirect(pendingTestToStart, 'full_simulation')}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md shadow-rose-500/20 cursor-pointer"
              >
                Start Official Examination
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

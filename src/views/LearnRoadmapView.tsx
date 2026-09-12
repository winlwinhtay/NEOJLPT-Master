import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  CheckCircle2,
  Lock,
  Play,
  Layers,
  BookOpen,
  Headphones,
  Award,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Check,
  Volume2,
  Calendar,
  Clock,
  Target,
  Sliders,
  HelpCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Flame,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { useI18n } from '../i18n/I18nContext';
import { LESSON_ROADMAP, JLPT_LEVELS } from '../data/jlptLevels';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { GRAMMAR_DATA } from '../data/grammarData';
import { KANJI_DATA } from '../data/kanjiData';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { AudioButton } from '../components/common/AudioButton';
import { LessonDetail, JLPTLevel } from '../types';
import { StudyPlan, DailyStudyPlan, DailyStudyTask } from '../types/studyPlan';
import { StudyPlannerService } from '../services/studyPlannerService';
import { StorageService } from '../services/storageService';
import { StudyPlanSetupModal } from '../components/planner/StudyPlanSetupModal';
import { DiagnosticPlacementModal } from '../components/planner/DiagnosticPlacementModal';
import { DailyStudySessionModal } from '../components/planner/DailyStudySessionModal';

export const LearnRoadmapView: React.FC = () => {
  const { activeLevel, setActiveLevel, selectedLessonId, setSelectedLessonId, setActiveView } = useApp();
  const { profile, completedLessons, completeLesson } = useUser();
  const { srsItems } = useSRS();
  const { t } = useI18n();

  // Study Plan State
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(() => StorageService.loadStudyPlan());
  const [setupModalOpen, setSetupModalOpen] = useState(false);
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);

  // Lesson Detail View States
  const [activeTab, setActiveTab] = useState<'explanation' | 'vocab' | 'grammar' | 'quiz'>('explanation');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Ensure study plan matches active level or initialize default if needed
  useEffect(() => {
    if (!studyPlan) {
      // Auto initialize standard default plan for active level if first time
      const initial = StudyPlannerService.createStudyPlan({
        currentLevel: activeLevel === 'N5' ? 'beginner' : (activeLevel === 'N4' ? 'N5' : (activeLevel === 'N3' ? 'N4' : (activeLevel === 'N2' ? 'N3' : 'N2'))),
        targetLevel: activeLevel,
        daysPerWeek: 5,
        selectedDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
        dailyMinutes: profile.dailyGoalMinutes || 60,
        intensity: 'balanced',
      });
      setStudyPlan(initial);
    }
  }, [studyPlan, activeLevel, profile.dailyGoalMinutes]);

  // Compute daily package
  const dailyPackage: DailyStudyPlan = useMemo(() => {
    if (!studyPlan) {
      return {
        date: new Date().toISOString().split('T')[0],
        dayOfWeek: 'mon',
        allocatedMinutes: 60,
        isRestDay: false,
        tasks: [],
        completed: false,
        completedMinutes: 0,
        xpEarned: 0,
      };
    }
    return StudyPlannerService.generateTodayPackage(studyPlan, srsItems, completedLessons);
  }, [studyPlan, srsItems, completedLessons]);

  // Compute real-time readiness
  const readiness = useMemo(() => {
    if (!studyPlan) return null;
    return StudyPlannerService.calculateReadiness(studyPlan, completedLessons, srsItems);
  }, [studyPlan, completedLessons, srsItems]);

  const units = LESSON_ROADMAP[activeLevel] || [];

  // Find active lesson if selected
  let currentLesson: LessonDetail | null = null;
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (lesson.id === selectedLessonId) {
        currentLesson = lesson;
        break;
      }
    }
  }

  // If a lesson is currently active in view, render LessonDetail view
  if (currentLesson) {
    const vocabList = VOCABULARY_DATA.filter((v) => currentLesson!.vocabIds.includes(v.id));
    const grammarList = GRAMMAR_DATA.filter((g) => currentLesson!.grammarIds.includes(g.id));
    const kanjiList = KANJI_DATA.filter((k) => currentLesson!.kanjiIds.includes(k.id));
    const quizQuestions = PRACTICE_QUESTIONS.filter((q) => currentLesson!.practiceQuestionIds.includes(q.id));
    const isCompleted = completedLessons.includes(currentLesson.id);

    const handleQuizSelect = (qId: string, optIdx: number) => {
      if (quizSubmitted) return;
      setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    };

    const handleFinishQuiz = () => {
      setQuizSubmitted(true);
      completeLesson(currentLesson!.id, currentLesson!.xpReward || 50);
    };

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
        {/* Top Back Navigation & Title */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedLessonId(null);
              setQuizSubmitted(false);
              setQuizAnswers({});
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Study Plan
          </button>

          {isCompleted && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 size={14} /> Lesson Completed (+{currentLesson.xpReward} XP)
            </span>
          )}
        </div>

        {/* Lesson Header Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            {activeLevel} • Lesson {currentLesson.lessonNumber}
          </span>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {currentLesson.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            <strong>Goal:</strong> {currentLesson.objective}
          </p>
        </div>

        {/* Tabs for Lesson Study */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'explanation', label: 'Explanation', count: null },
            { id: 'vocab', label: 'Vocabulary', count: vocabList.length },
            { id: 'grammar', label: 'Grammar', count: grammarList.length },
            { id: 'quiz', label: 'Review Quiz', count: quizQuestions.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label} {tab.count !== null && `(${tab.count})`}
            </button>
          ))}
        </div>

        {/* Tab 1: Explanation */}
        {activeTab === 'explanation' && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Lesson Overview</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentLesson.explanation}
            </p>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveTab('vocab')}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Next: Vocabulary <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Vocabulary */}
        {activeTab === 'vocab' && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Vocabulary Targets ({vocabList.length} words)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vocabList.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-japanese font-bold text-base text-slate-900 dark:text-white">
                        {v.word}
                      </span>
                      <span className="text-xs text-slate-400 font-japanese">{v.hiragana}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{v.meaning}</p>
                  </div>
                  <AudioButton text={v.word} size="sm" />
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setActiveTab('explanation')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Back: Overview
              </button>
              <button
                onClick={() => setActiveTab('grammar')}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Next: Grammar <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Grammar */}
        {activeTab === 'grammar' && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Grammar Targets ({grammarList.length} Patterns)
            </h3>
            {grammarList.map((g) => (
              <div
                key={g.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-japanese font-black text-lg text-brand-600 dark:text-brand-400">
                      {g.pattern}
                    </h4>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                      {g.meaning}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-indigo-950 dark:text-indigo-200">
                  {g.structure}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {g.explanation}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Examples:
                  </span>
                  {g.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-japanese font-bold text-slate-900 dark:text-white">
                          {ex.jp}
                        </p>
                        <p className="text-slate-400 text-[11px]">{ex.reading}</p>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">{ex.en}</p>
                      </div>
                      <AudioButton text={ex.jp} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setActiveTab('vocab')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Back: Vocabulary
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Next: Take Quiz <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Review Quiz */}
        {activeTab === 'quiz' && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Lesson Review Quiz ({quizQuestions.length} Questions)
              </h3>
              <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                <Sparkles size={14} /> +{currentLesson.xpReward} XP Reward
              </span>
            </div>

            <div className="space-y-6">
              {quizQuestions.map((q, qIndex) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {qIndex + 1}. {q.promptJp}
                      </h4>
                      {q.audioText && <AudioButton text={q.audioText} size="sm" />}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;
                        let btnStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200';

                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold';
                          } else if (isThisSelected && !isCorrect) {
                            btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                          }
                        } else if (isThisSelected) {
                          btnStyle = 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold shadow-sm';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleQuizSelect(q.id, optIdx)}
                            className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle} cursor-pointer`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white">Explanation:</div>
                        <p className="text-slate-600 dark:text-slate-300">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={handleFinishQuiz}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={18} /> Submit & Complete Lesson
              </button>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  Great job! You earned {currentLesson.xpReward} XP!
                </div>
                <button
                  onClick={() => setSelectedLessonId(null)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                >
                  Return to Study Plan
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Calculate days left to exam if date provided
  let daysLeftToExam: number | null = null;
  if (studyPlan?.targetExamDate) {
    const examMs = new Date(studyPlan.targetExamDate).getTime();
    const nowMs = Date.now();
    daysLeftToExam = Math.max(0, Math.ceil((examMs - nowMs) / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* 1. TOP HEADER & ACTION CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-black tracking-wide uppercase">
              Adaptive Study Planner
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
              {studyPlan?.currentLevel || 'Beginner'} ➔ {activeLevel}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
            {activeLevel} Master Study Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Time-aware JLPT path calibrated for your schedule: {studyPlan?.dailyMinutes || 60} min/day,{' '}
            {studyPlan?.daysPerWeek || 5} days/week.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setDiagnosticOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-slate-700 dark:text-slate-300 font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            <HelpCircle size={15} /> Placement Test
          </button>

          <button
            type="button"
            onClick={() => setSetupModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all cursor-pointer"
          >
            <Sliders size={15} /> Adjust My Plan
          </button>
        </div>
      </div>

      {/* 2. GOAL & PROGRESS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Goal Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Exam Target
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-black">
              JLPT {activeLevel}
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {daysLeftToExam !== null ? (
                <>
                  {daysLeftToExam} <span className="text-sm font-semibold text-slate-400">Days Left</span>
                </>
              ) : (
                <>
                  ~{studyPlan?.estimatedWeeks || 18} <span className="text-sm font-semibold text-slate-400">Weeks</span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {studyPlan?.targetExamDate
                ? `Exam Session: ${studyPlan.targetExamDate}`
                : `Estimated Finish: ${studyPlan?.estimatedCompletionDate || '18 Weeks'}`}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Pacing:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
              {studyPlan?.intensity || 'Balanced'} Intensity
            </span>
          </div>
        </div>

        {/* Schedule & Capacity Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Study Schedule
            </span>
            <Clock size={16} className="text-brand-500" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {((studyPlan?.totalWeeklyMinutes || 300) / 60).toFixed(1)}{' '}
              <span className="text-sm font-semibold text-slate-400">Hrs / Wk</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {studyPlan?.dailyMinutes || 60} min/day • {studyPlan?.daysPerWeek || 5} study days
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Active Days:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 uppercase text-[10px]">
              {(studyPlan?.selectedDays || ['mon', 'tue', 'wed', 'thu', 'fri']).join(', ')}
            </span>
          </div>
        </div>

        {/* Overall Completion Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Readiness Score
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-black">
              {readiness?.overall || 35}%
            </span>
          </div>
          <div className="space-y-2">
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${readiness?.overall || 35}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {readiness?.recommendedFocus || 'Strengthen Vocabulary & Kanji Retention'}
            </p>
          </div>
          <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Mock Test Readiness:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {readiness?.mockTestReadiness || 25}%
            </span>
          </div>
        </div>
      </div>

      {/* 3. PROMINENT "TODAY'S PLAN" (THE MAIN CTA) */}
      <div className="bg-gradient-to-br from-white via-slate-50 to-brand-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-brand-950/20 p-6 sm:p-8 rounded-3xl border-2 border-brand-200 dark:border-brand-900/60 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/20">
                <Zap size={18} />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Today's Recommended Study Package
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {!dailyPackage.isRestDay
                ? `${dailyPackage.allocatedMinutes} minutes total • Rotated according to optimal cognitive retention`
                : 'Today is a scheduled Rest & Consolidation Day.'}
            </p>
          </div>

          {!dailyPackage.isRestDay && (
            <button
              type="button"
              onClick={() => setSessionModalOpen(true)}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-rose-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 transition-all flex items-center justify-center gap-3 shrink-0 cursor-pointer"
            >
              <Play size={20} className="fill-white ml-0.5" /> START TODAY'S PLAN
            </button>
          )}
        </div>

        {/* Task Checklist Cards */}
        {!dailyPackage.isRestDay && dailyPackage.tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {dailyPackage.tasks.map((task, idx) => {
              const isDone = task.completed;
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {task.title}
                      </span>
                    </div>
                    {task.subtitle && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 pl-7">
                        {task.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold block">
                      {task.durationMinutes}m
                    </span>
                    {isDone && (
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center justify-end gap-0.5 mt-1">
                        <Check size={12} /> Done
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <span className="text-2xl">☕</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Rest Day — No mandatory tasks scheduled today
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Giving your brain time to assimilate memories is essential for language mastery. You can still do optional review below.
            </p>
          </div>
        )}
      </div>

      {/* 4. READINESS BREAKDOWN BARS */}
      {readiness && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                JLPT {activeLevel} Readiness Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dynamic accuracy indicators derived from practice, SRS retention, and lesson completion
              </p>
            </div>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
              <TrendingUp size={14} /> Overall: {readiness.overall}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Vocabulary', score: readiness.vocabulary, color: 'bg-brand-500' },
              { label: 'Kanji', score: readiness.kanji, color: 'bg-indigo-500' },
              { label: 'Grammar', score: readiness.grammar, color: 'bg-purple-500' },
              { label: 'Reading', score: readiness.reading, color: 'bg-emerald-500' },
              { label: 'Listening', score: readiness.listening, color: 'bg-amber-500' },
            ].map((cat) => (
              <div
                key={cat.label}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2"
              >
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-300">{cat.label}</span>
                  <span className="text-slate-900 dark:text-white">{cat.score}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} transition-all duration-300`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PHASES ROADMAP (PHASE 1 TO 5) */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Phased Curriculum Architecture
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            5-Phase Progressive Mastery Plan
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Structured progression avoiding cognitive overload as your exam date approaches
          </p>
        </div>

        <div className="space-y-3">
          {(studyPlan?.phases || []).map((phase, idx) => {
            return (
              <div
                key={phase.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  phase.isCurrent
                    ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                      phase.isCurrent
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    P{idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {phase.title}
                      </h4>
                      {phase.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-[10px] font-black uppercase">
                          Active Phase
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {phase.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 text-xs font-bold text-slate-400">
                  Weeks {phase.startWeek}–{phase.endWeek}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. FULL CURRICULUM UNITS & LESSONS TREE (PRESERVED UNDERNEATH) */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Detailed Unit Library
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {activeLevel} Curriculum Progression Tree
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse and access individual lesson units, vocab targets, and quizzes directly.
          </p>
        </div>

        <div className="space-y-6">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 text-xs font-black">
                    Unit {unit.unitNumber}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{unit.description}</p>
                </div>
              </div>

              {/* Lessons within unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unit.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                        isCompleted
                          ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500 hover:shadow-md'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-slate-400">
                            Lesson {lesson.lessonNumber}
                          </span>
                          {isCompleted ? (
                            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                              <Check size={14} />
                            </span>
                          ) : (
                            <span className="w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center text-xs font-bold">
                              ▶
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-brand-500 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {lesson.objective}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                        <span>+{lesson.xpReward} XP</span>
                        <span className="text-brand-500 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                          Start <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <StudyPlanSetupModal
        isOpen={setupModalOpen}
        onClose={() => setSetupModalOpen(false)}
        onPlanCreated={(newPlan) => setStudyPlan(newPlan)}
        initialTargetLevel={activeLevel}
      />

      <DiagnosticPlacementModal
        isOpen={diagnosticOpen}
        onClose={() => setDiagnosticOpen(false)}
        onApplyLevel={(recommendedLvl) => {
          if (recommendedLvl !== 'beginner') {
            setActiveLevel(recommendedLvl);
          }
          setSetupModalOpen(true);
        }}
      />

      <DailyStudySessionModal
        isOpen={sessionModalOpen}
        onClose={() => setSessionModalOpen(false)}
        dailyPlan={dailyPackage}
        onTaskCompleted={(taskId, xp, mins) => {
          if (studyPlan) {
            const nextCompleted = Array.from(new Set([...studyPlan.completedTaskIds, taskId]));
            const updatedPlan = { ...studyPlan, completedTaskIds: nextCompleted };
            setStudyPlan(updatedPlan);
            StorageService.saveStudyPlan(updatedPlan);
          }
        }}
      />
    </div>
  );
};

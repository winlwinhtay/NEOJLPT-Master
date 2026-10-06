import React from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Target,
  Brain,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { useActiveLearning } from '../context/ActiveLearningContext';
import { useApp } from '../context/AppContext';
import { ActiveSkillType, LearningPlanItem } from '../types/activeLearning';

export const ActiveLearningView: React.FC = () => {
  const {
    dailyPlan,
    loading,
    refreshPlan,
    startTodaySession,
    startItemSession,
    setStudyDuration,
    learnerProfile,
    detectedConfusions,
  } = useActiveLearning();
  const { activeLevel } = useApp();

  const skills: ActiveSkillType[] = [
    'vocabulary',
    'kanji',
    'grammar',
    'reading',
    'listening',
    'speaking',
    'writing',
  ];

  if (!dailyPlan) {
    return (
      <div className="p-8 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        Generating personalized active learning plan...
      </div>
    );
  }

  const completedCount = dailyPlan.items.filter((i) => i.status === 'completed').length;
  const progressPercent = Math.round(
    (dailyPlan.completedMinutes / Math.max(1, dailyPlan.estimatedMinutes)) * 100
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-400" />
                Adaptive Learning Engine
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-medium text-slate-300">JLPT {activeLevel} Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              AI-Powered Active Learning System
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Dynamically sequences validated curriculum items based on your retention rate, recent mistakes,
              skill weaknesses, and target exam date.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refreshPlan(true)}
              disabled={loading}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-colors"
            >
              <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Recalculate Plan
            </button>

            <button
              onClick={startTodaySession}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-400 hover:to-indigo-500 text-sm font-black text-white shadow-lg shadow-brand-500/25 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Today&apos;s Plan
            </button>
          </div>
        </div>
      </div>

      {/* 2. Grid: Daily Plan on Left + Skill Diagnostics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plan Settings Bar */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-500" />
                Study Duration: {dailyPlan.estimatedMinutes} Minutes
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pacing adapted to your chosen daily study commitment.
              </p>
            </div>

            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
              {([30, 60, 90, 120] as const).map((mins) => (
                <button
                  key={mins}
                  onClick={() => setStudyDuration(mins)}
                  className={`px-3 py-1.5 rounded-xl transition-colors ${
                    dailyPlan.estimatedMinutes === mins
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Progress Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Today&apos;s Progress: {completedCount} / {dailyPlan.items.length} items completed
              </span>
              <span className="font-bold text-brand-600 dark:text-brand-400">
                {dailyPlan.completedMinutes} / {dailyPlan.estimatedMinutes} min ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, progressPercent)}%` }}
              />
            </div>
          </div>

          {/* Detected Confusion Alert */}
          {detectedConfusions.length > 0 && (
            <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                Detected Linguistic Confusion: {detectedConfusions[0].title}
              </div>
              <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                {detectedConfusions[0].differenceExplanation}
              </p>
            </div>
          )}

          {/* Plan Sequence Items */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-500" />
              Lesson Sequence
            </h3>

            {dailyPlan.items.map((item: LearningPlanItem, idx: number) => {
              const isCompleted = item.status === 'completed';

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-3xl border transition-all ${
                    isCompleted
                      ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 opacity-75'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-brand-50 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-sm font-bold truncate ${
                              isCompleted
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {item.minutes} min
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 capitalize">
                            {item.skill}
                          </span>
                        </div>
                        {item.subtitle && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                          {item.reason}
                        </p>
                      </div>
                    </div>

                    {!isCompleted && (
                      <button
                        onClick={() => startItemSession(item.id)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm shrink-0 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Start
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Skill Diagnostics & Pedagogical Engine */}
        <div className="space-y-6">
          {/* Skill Mastery Profile Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-500" />
              Skill Proficiency Radar
            </h3>

            <div className="space-y-3">
              {skills.map((skill) => {
                const score = learnerProfile.skillScores[skill] || 60;
                const isWeak = score < 60;

                return (
                  <div key={skill} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="capitalize font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        {skill}
                        {isWeak && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300">
                            Priority
                          </span>
                        )}
                      </span>
                      <span className="font-bold text-slate-500 dark:text-slate-400">{score}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWeak
                            ? 'bg-rose-500'
                            : score >= 80
                            ? 'bg-emerald-500'
                            : 'bg-indigo-500'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Pedagogical Principles Card */}
          <div className="p-6 rounded-3xl bg-indigo-950/20 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 space-y-3">
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <Brain className="w-4 h-4 text-brand-500" />
              Adaptive Principles
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">•</span>
                <span>
                  <strong>Curriculum Authenticity:</strong> Every item is linked to genuine JLPT N5–N1 validated data.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">•</span>
                <span>
                  <strong>Active Retrieval:</strong> Questions require recall and production rather than passive reading.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">•</span>
                <span>
                  <strong>Spaced Repetition:</strong> Automatically queues reviews at 1, 3, 7, 14, and 30-day intervals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 font-bold">•</span>
                <span>
                  <strong>Error-Driven Remediation:</strong> Confusions like は vs が or に vs で trigger specialized comparison units.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

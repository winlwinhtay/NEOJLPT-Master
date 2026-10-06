import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Brain,
  Zap,
  Target,
  ShieldCheck,
} from 'lucide-react';
import { useActiveLearning } from '../../context/ActiveLearningContext';
import { useApp } from '../../context/AppContext';
import { ActiveSkillType, LearningPlanItem } from '../../types/activeLearning';

export const ActiveLearningCard: React.FC = () => {
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
  const { activeLevel, setActiveView } = useApp();

  const [expandedReasonId, setExpandedReasonId] = useState<string | null>(null);

  if (loading && !dailyPlan) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-10 w-full bg-slate-100 dark:bg-slate-800/60 rounded-2xl" />
        <div className="h-24 w-full bg-slate-100 dark:bg-slate-800/40 rounded-2xl" />
      </div>
    );
  }

  if (!dailyPlan) return null;

  const completedCount = dailyPlan.items.filter((i) => i.status === 'completed').length;
  const progressPercent = Math.round(
    (dailyPlan.completedMinutes / Math.max(1, dailyPlan.estimatedMinutes)) * 100
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/90 via-slate-900 to-slate-950 text-white p-6 sm:p-7 shadow-xl border border-indigo-500/20 transition-all">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-10 w-48 h-48 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/20 border border-brand-400/30 flex items-center justify-center text-brand-300">
              <Sparkles className="w-5 h-5 text-brand-400 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-1">
                  AI Active Learning System
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
                  {dailyPlan.source === 'gemini_ai' ? '✨ Gemini AI Powered' : '⚡ Adaptive Engine'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Today&apos;s Plan — {dailyPlan.estimatedMinutes} Minutes
              </h2>
            </div>
          </div>

          {/* Action buttons & duration selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Duration pill buttons */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-bold">
              {([30, 60, 90, 120] as const).map((mins) => (
                <button
                  key={mins}
                  onClick={() => setStudyDuration(mins)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    dailyPlan.estimatedMinutes === mins
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>

            <button
              onClick={() => refreshPlan(true)}
              title="Recalculate plan with latest performance data"
              disabled={loading}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Priority Focus Badges & Exam Alert */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            Priority Focus:
          </span>
          {dailyPlan.focus.map((skill) => (
            <span
              key={skill}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 capitalize"
            >
              {skill}
            </span>
          ))}

          {dailyPlan.examModeActive && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-200 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Final Exam Review Mode ({dailyPlan.daysToExam} days left)
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">
              Progress: {completedCount} of {dailyPlan.items.length} items completed
            </span>
            <span className="font-bold text-brand-300">
              {dailyPlan.completedMinutes} / {dailyPlan.estimatedMinutes} min ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Detected Confusion Notice if any */}
        {detectedConfusions.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-amber-300">
                Linguistic Confusion Detected: {detectedConfusions[0].title}
              </p>
              <p className="text-slate-300">
                You made recent mistakes on this contrast. The engine automatically scheduled a targeted contrast review today.
              </p>
            </div>
          </div>
        )}

        {/* Today's Sequence Items List */}
        <div className="space-y-2">
          {dailyPlan.items.map((item: LearningPlanItem, idx: number) => {
            const isCompleted = item.status === 'completed';
            const isExpanded = expandedReasonId === item.id;

            return (
              <div
                key={item.id}
                className={`group rounded-2xl p-3.5 transition-all border ${
                  isCompleted
                    ? 'bg-slate-950/30 border-slate-800/50 opacity-70'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => startItemSession(item.id)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-indigo-500/20 text-indigo-300 group-hover:bg-brand-500 group-hover:text-white'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-bold truncate ${
                            isCompleted ? 'line-through text-slate-400' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                          {item.minutes} min
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 capitalize">
                          {item.skill}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* "Why am I learning this?" toggle button */}
                    <button
                      onClick={() => setExpandedReasonId(isExpanded ? null : item.id)}
                      title="Why am I learning this?"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-300 hover:bg-slate-700/50 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>

                    {!isCompleted && (
                      <button
                        onClick={() => startItemSession(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1 shadow-sm transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Start
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded "Why am I learning this?" explanation banner */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs space-y-1.5 text-indigo-200 bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/20 animate-fade-in">
                    <div className="flex items-center gap-1 font-bold text-brand-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Pedagogical Rationale (Why this lesson?):
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item.reason}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>Priority Weight: {item.priority}/100</span>
                      <span>•</span>
                      <span>Content ID: {item.contentId}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Big CTA Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Brain className="w-4 h-4 text-brand-400" />
            <span>Learns continuously from your accuracy, errors, and retrieval speed.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('active-learning')}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              Full Diagnostics
            </button>

            <button
              onClick={startTodaySession}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-400 hover:to-indigo-500 text-sm font-black text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              {completedCount === 0
                ? "Start Today's Plan"
                : completedCount >= dailyPlan.items.length
                ? 'Review Completed Plan'
                : 'Continue Today&apos;s Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

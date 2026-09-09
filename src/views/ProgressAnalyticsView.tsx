import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Flame,
  Award,
  Layers,
  PenTool,
  BookOpen,
  FileText,
  Headphones,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { ProgressBar } from '../components/common/ProgressBar';

export const ProgressAnalyticsView: React.FC = () => {
  const { activeLevel, setActiveView } = useApp();
  const { profile, todayLog, completedLessons } = useUser();
  const { srsItems, getCountsByStatus } = useSRS();

  const counts = getCountsByStatus(activeLevel);

  const weeklyStudyHours = [
    { day: 'Mon', minutes: 25 },
    { day: 'Tue', minutes: 40 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 20 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 60 },
    { day: 'Sun', minutes: todayLog.minutesSpent },
  ];

  const maxMinutes = Math.max(...weeklyStudyHours.map((w) => w.minutes), 60);

  const skills = [
    { name: 'Vocabulary', score: 82, icon: <Layers size={18} className="text-rose-500" /> },
    { name: 'Kanji Characters', score: 88, icon: <PenTool size={18} className="text-indigo-500" /> },
    { name: 'Grammar Structures', score: 64, icon: <BookOpen size={18} className="text-emerald-500" /> },
    { name: 'Reading Comprehension', score: 76, icon: <FileText size={18} className="text-amber-500" /> },
    { name: 'Listening Comprehension', score: 52, icon: <Headphones size={18} className="text-purple-500" /> },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          Learning Analytics & Retention
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Progress & Mastery Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics of your daily study time, spaced repetition retention, and skill radar.
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Learning Streak</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Flame size={24} className="text-orange-500" /> {profile.streakDays} Days
          </div>
          <p className="text-[11px] text-slate-500">Active everyday this week</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Total XP</span>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <Award size={24} /> {profile.xp.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Level {profile.level} Scholar</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Lessons Finished</span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {completedLessons.length}
          </div>
          <p className="text-[11px] text-slate-500">{activeLevel} Roadmap Units</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Mastered Items</span>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {counts.mastered}
          </div>
          <p className="text-[11px] text-slate-500">Long-term memory</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Study Time Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Weekly Study Time (Minutes)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Daily learning distribution</p>
            </div>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
              Total: 255 mins
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-8 pb-2">
            {weeklyStudyHours.map((w, idx) => {
              const heightPct = Math.round((w.minutes / maxMinutes) * 100);
              const isToday = idx === 6;

              return (
                <div key={w.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-400">{w.minutes}m</span>
                  <div
                    className={`w-full max-w-[36px] rounded-2xl transition-all duration-500 ${
                      isToday
                        ? 'bg-brand-500 shadow-md shadow-brand-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'
                    }`}
                    style={{ height: `${Math.max(12, heightPct)}%` }}
                  />
                  <span
                    className={`text-xs font-bold ${
                      isToday ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500'
                    }`}
                  >
                    {w.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill Accuracy Diagnostics (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              JLPT Skill Accuracy Rating
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Performance across test sections
            </p>
          </div>

          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <span>{s.name}</span>
                  </div>
                  <span
                    className={
                      s.score >= 80
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : s.score >= 60
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }
                  >
                    {s.score}%
                  </span>
                </div>
                <ProgressBar
                  value={s.score}
                  size="sm"
                  color={
                    s.score >= 80 ? 'bg-emerald-500' : s.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }
                />
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs space-y-1">
            <span className="font-bold text-amber-900 dark:text-amber-300 block">
              Auto Recommended Session:
            </span>
            <p className="text-amber-800 dark:text-amber-200">
              "Practice N5 listening for 15 minutes to increase listening accuracy."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

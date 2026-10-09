import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  BookOpen,
  Headphones,
  Mic,
  BrainCircuit,
  CheckCircle2,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { AdminService, AdminLearningAnalytics } from '../../services/adminService';

export const AdminLearningAnalyticsPanel: React.FC = () => {
  const [data, setData] = useState<AdminLearningAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getLearningAnalytics();
      setData(res);
    } catch (e) {
      console.warn('Failed to load learning analytics:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const totalLearners = data?.totalLearners || 1;
  const levelDistribution = data?.levelDistribution || { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };
  const srsStages = data?.srsStages || { apprentice: 0, guru: 0, master: 0, enlightened: 0 };
  const totalSrs =
    srsStages.apprentice + srsStages.guru + srsStages.master + srsStages.enlightened || 1;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-blue-500" size={22} />
            <span>Learning Analytics & Curriculum Engagement</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Aggregate study progress, JLPT target level distribution, and Spaced Repetition (SRS) retention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchAnalytics}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Analytics</span>
          </button>
        </div>
      </div>

      {/* Aggregate KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Lessons Finished</span>
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {(data?.totalLessonsCompleted ?? 0).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Grammar & reading units</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Practice Quizzes</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {(data?.totalPracticeQuestions ?? 0).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Questions answered</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Speaking Minutes</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600">
              <Mic size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {(data?.totalSpeakingMinutes ?? 0).toLocaleString()} min
          </div>
          <div className="text-xs text-slate-400 mt-1">Recorded oral practice</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SRS Flashcards</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600">
              <BrainCircuit size={18} />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {(data?.totalSrsItemsTracked ?? 0).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">In active review cycles</div>
        </div>
      </div>

      {/* Level Distribution & SRS Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JLPT Target Level Distribution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Layers size={16} className="text-brand-500" />
              <span>Target Level Distribution</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{totalLearners} Learners</span>
          </div>

          <div className="space-y-3">
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => {
              const count = levelDistribution[lvl] || 0;
              const pct = Math.round((count / totalLearners) * 100);
              return (
                <div key={lvl} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">JLPT {lvl}</span>
                    <span className="font-mono text-slate-500">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        lvl === 'N5'
                          ? 'bg-blue-500'
                          : lvl === 'N4'
                          ? 'bg-emerald-500'
                          : lvl === 'N3'
                          ? 'bg-amber-500'
                          : lvl === 'N2'
                          ? 'bg-purple-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.max(pct, count > 0 ? 3 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SRS Retention Stages */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <BrainCircuit size={16} className="text-purple-500" />
              <span>SRS Retention & Mastery Stages</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{totalSrs} Active Items</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 space-y-1">
              <span className="font-bold uppercase tracking-wider text-pink-500 text-[10px]">
                Apprentice (見習い)
              </span>
              <div className="text-xl font-black text-pink-600 dark:text-pink-400">
                {srsStages.apprentice.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500">Initial learning phase (1-4d intervals)</div>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <span className="font-bold uppercase tracking-wider text-purple-500 text-[10px]">
                Guru (達人)
              </span>
              <div className="text-xl font-black text-purple-600 dark:text-purple-400">
                {srsStages.guru.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500">Solid recall memory (1-2w intervals)</div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <span className="font-bold uppercase tracking-wider text-blue-500 text-[10px]">
                Master (師範)
              </span>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400">
                {srsStages.master.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500">Long-term retention (1mo intervals)</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="font-bold uppercase tracking-wider text-emerald-500 text-[10px]">
                Enlightened (開眼)
              </span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {srsStages.enlightened.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500">Permanent fluency (4mo+ intervals)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  Play,
  Flame,
  Clock,
  Zap,
  Layers,
  PenTool,
  BookOpen,
  FileText,
  Headphones,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { useI18n } from '../i18n/I18nContext';
import { JLPT_LEVELS, LESSON_ROADMAP } from '../data/jlptLevels';
import { ProgressRing, ProgressBar } from '../components/common/ProgressBar';
import { RecommendationService } from '../services/recommendationService';
import { StorageService } from '../services/storageService';

export const DashboardView: React.FC = () => {
  const { activeLevel, setActiveView, setLevelSelectorOpen, navigateToLesson } = useApp();
  const { profile, todayLog, todayProgressPercentage, completedLessons } = useUser();
  const { srsItems, getCountsByStatus } = useSRS();
  const { t } = useI18n();

  const levelInfo = JLPT_LEVELS[activeLevel];
  const roadmapUnits = LESSON_ROADMAP[activeLevel] || [];

  // Find next unfinished lesson
  let nextLesson = null;
  for (const unit of roadmapUnits) {
    for (const lesson of unit.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        nextLesson = lesson;
        break;
      }
    }
    if (nextLesson) break;
  }
  if (!nextLesson && roadmapUnits.length > 0 && roadmapUnits[0].lessons.length > 0) {
    nextLesson = roadmapUnits[0].lessons[0];
  }

  // Category accuracy metrics
  const accuracyMetrics = {
    vocabulary: 82,
    kanji: 88,
    grammar: 64,
    reading: 76,
    listening: 52,
  };

  const recommendations = RecommendationService.generateRecommendations(
    profile,
    srsItems,
    accuracyMetrics,
    nextLesson ? nextLesson.title : undefined
  );

  const statusCounts = getCountsByStatus(activeLevel);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* 1. Top Hero Greeting & Level Status */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                JLPT Preparation Platform
              </span>
              <span className="text-slate-500">•</span>
              <button
                onClick={() => setLevelSelectorOpen(true)}
                className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1 underline underline-offset-2"
              >
                Change Level ({activeLevel})
              </button>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-sans">
              {t('dashboard.welcome', 'Welcome back')}, {profile.name} 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Targeting <strong className="text-white">{activeLevel} ({levelInfo.title})</strong>.
              You are making steady progress toward exam mastery!
            </p>
          </div>

          {/* Prominent Continue Learning Button */}
          {nextLesson && (
            <button
              onClick={() => navigateToLesson(nextLesson.id)}
              className="group relative inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-rose-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 transition-all shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                <Play size={20} className="fill-white ml-0.5" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-rose-100 uppercase tracking-wider block">
                  {t('dashboard.continueLearning', 'Continue Learning')}
                </span>
                <span className="text-sm sm:text-base truncate max-w-[200px] block">
                  {nextLesson.title}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* 2. Today's Goal Ring & Real-Time Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Today's Goal Completion Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
                <Sparkles size={18} />
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t('dashboard.todaysGoal', "Today's Study Goal")}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Complete your daily quota across vocab, kanji, and grammar to maintain your streak.
            </p>

            {/* Individual Quota Progress Bars */}
            <div className="space-y-2 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  <span>Vocabulary ({todayLog.vocabCount}/{profile.dailyGoalVocab})</span>
                  <span>{Math.round((todayLog.vocabCount / profile.dailyGoalVocab) * 100)}%</span>
                </div>
                <ProgressBar value={todayLog.vocabCount} max={profile.dailyGoalVocab} size="sm" color="bg-brand-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  <span>Kanji ({todayLog.kanjiCount}/{profile.dailyGoalKanji})</span>
                  <span>{Math.round((todayLog.kanjiCount / profile.dailyGoalKanji) * 100)}%</span>
                </div>
                <ProgressBar value={todayLog.kanjiCount} max={profile.dailyGoalKanji} size="sm" color="bg-indigo-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  <span>Grammar ({todayLog.grammarCount}/{profile.dailyGoalGrammar})</span>
                  <span>{Math.round((todayLog.grammarCount / profile.dailyGoalGrammar) * 100)}%</span>
                </div>
                <ProgressBar value={todayLog.grammarCount} max={profile.dailyGoalGrammar} size="sm" color="bg-emerald-500" />
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center">
            <ProgressRing
              percentage={todayProgressPercentage}
              size={130}
              strokeWidth={12}
              color="#e11d48"
              subLabel="Goal Completed"
            />
          </div>
        </div>

        {/* Daily Streak & Study Time Stats */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
              <Flame size={22} className="animate-pulse" />
            </span>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
              Streak
            </span>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black text-slate-900 dark:text-white">
              {profile.streakDays} <span className="text-base font-normal text-slate-500">Days</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Top 15% consistent learners this week!
            </p>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <Clock size={14} />
            <span>Today: {todayLog.minutesSpent} mins active</span>
          </div>
        </div>

        {/* Total XP & Level Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Zap size={22} />
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Level {profile.level}
            </span>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black text-slate-900 dark:text-white">
              {profile.xp.toLocaleString()} <span className="text-base font-normal text-slate-500">XP</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Next level in {Math.round((profile.level * 40) ** 1.5 - profile.xp)} XP
            </p>
          </div>
          <ProgressBar value={profile.xp % 200} max={200} size="sm" color="bg-amber-500" />
        </div>
      </div>

      {/* 3. Skill Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-brand-500" /> JLPT Skill Breakdown ({activeLevel})
          </h3>
          <span className="text-xs text-slate-400">Continuous mastery estimation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Vocabulary Card */}
          <div
            onClick={() => setActiveView('vocabulary')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
              <Layers size={20} />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Vocabulary</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                {statusCounts.mastered + statusCounts.review} / {levelInfo.targetVocab}
              </div>
            </div>
            <ProgressBar value={statusCounts.mastered + statusCounts.review} max={levelInfo.targetVocab} size="sm" color="bg-rose-500" />
          </div>

          {/* Kanji Card */}
          <div
            onClick={() => setActiveView('kanji')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
              <PenTool size={20} />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kanji Characters</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                14 / {levelInfo.targetKanji}
              </div>
            </div>
            <ProgressBar value={14} max={levelInfo.targetKanji} size="sm" color="bg-indigo-500" />
          </div>

          {/* Grammar Card */}
          <div
            onClick={() => setActiveView('grammar')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Grammar</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                8 / {levelInfo.targetGrammar}
              </div>
            </div>
            <ProgressBar value={8} max={levelInfo.targetGrammar} size="sm" color="bg-emerald-500" />
          </div>

          {/* Reading Card */}
          <div
            onClick={() => setActiveView('reading')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Reading Accuracy</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                {accuracyMetrics.reading}%
              </div>
            </div>
            <ProgressBar value={accuracyMetrics.reading} size="sm" color="bg-amber-500" />
          </div>

          {/* Listening Card */}
          <div
            onClick={() => setActiveView('listening')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:shadow-md cursor-pointer transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
              <Headphones size={20} />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Listening Accuracy</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                {accuracyMetrics.listening}%
              </div>
            </div>
            <ProgressBar value={accuracyMetrics.listening} size="sm" color="bg-purple-500" />
          </div>
        </div>
      </div>

      {/* 4. Intelligent Recommendations & Weak Focus Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-500" />
              {t('dashboard.recommendedLessons', 'Recommended For You')}
            </h3>
            <span className="text-xs text-slate-400">AI Adaptive Diagnosis</span>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setActiveView(rec.actionView as any)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/80 hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      rec.priority === 'high'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                        : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600'
                    }`}
                  >
                    {rec.type === 'vocab_review' ? (
                      <Layers size={20} />
                    ) : rec.type === 'weak_area' ? (
                      <AlertTriangle size={20} />
                    ) : (
                      <BookOpen size={20} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {rec.title}
                      </h4>
                      {rec.priority === 'high' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                          Priority
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {rec.subtitle}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 italic">{rec.reason}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                    ~{rec.estimatedMinutes} mins
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center text-slate-400 transition-all">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus & Weak Areas */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <AlertTriangle size={18} />
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t('dashboard.weakAreas', 'Your Focus & Weak Areas')}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Targeted drills based on your past quiz and mock test performance.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <div className="flex justify-between text-xs font-bold mb-1 text-slate-800 dark:text-slate-200">
                  <span>Listening Dialogues</span>
                  <span className="text-rose-500 font-semibold">{accuracyMetrics.listening}% (Needs work)</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Try listening at 0.75x speed with Japanese transcripts enabled.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <div className="flex justify-between text-xs font-bold mb-1 text-slate-800 dark:text-slate-200">
                  <span>Complex Sentence Particles</span>
                  <span className="text-amber-500 font-semibold">{accuracyMetrics.grammar}%</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Practice 〜なければならない vs 〜なくてもいい distinction.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('practice')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
          >
            Start Weak Area Practice <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

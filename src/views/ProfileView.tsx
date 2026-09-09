import React, { useState } from 'react';
import {
  User,
  Crown,
  Award,
  Flame,
  Zap,
  Target,
  Sparkles,
  CheckCircle2,
  Lock,
  Save,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { JLPTLevel } from '../types';

export const ProfileView: React.FC = () => {
  const { setUpgradeModalOpen } = useApp();
  const { profile, updateProfile } = useUser();
  const { t } = useI18n();

  const [name, setName] = useState(profile.name);
  const [targetLevel, setTargetLevel] = useState<JLPTLevel>(profile.targetLevel);
  const [learningGoal, setLearningGoal] = useState(profile.learningGoal);
  const [dailyVocab, setDailyVocab] = useState(profile.dailyGoalVocab);
  const [dailyKanji, setDailyKanji] = useState(profile.dailyGoalKanji);
  const [dailyGrammar, setDailyGrammar] = useState(profile.dailyGoalGrammar);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const badges = [
    { id: 'b-1', title: '7-Day Streak', desc: 'Study 7 consecutive days', icon: '🔥', unlocked: true },
    { id: 'b-2', title: 'First 50 Words', desc: 'Master 50 Japanese words', icon: '📖', unlocked: true },
    { id: 'b-3', title: 'Kanji Apprentice', desc: 'Draw 20 Kanji characters', icon: '✍️', unlocked: true },
    { id: 'b-4', title: 'Listening Champion', desc: 'Score 90%+ on listening exam', icon: '🎧', unlocked: false },
    { id: 'b-5', title: 'N5 Mock Master', desc: 'Pass full N5 mock examination', icon: '🏆', unlocked: false },
    { id: 'b-6', title: 'Conversationalist', desc: 'Complete 10 AI dialog sessions', icon: '💬', unlocked: true },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      targetLevel,
      learningGoal,
      dailyGoalVocab: dailyVocab,
      dailyGoalKanji: dailyKanji,
      dailyGoalGrammar: dailyGrammar,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const avatars = ['⛩️', '🍣', '🌸', '🍵', '🏯', '🗻', '🍙', '🎌'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          Account & Learning Plan
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Learner Profile & Goals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your target JLPT level, daily quotas, and review your unlocked achievements.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* User Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-24 h-24 rounded-3xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-5xl shrink-0 shadow-inner">
              {profile.avatar}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{profile.name}</h2>
                {profile.isPremium ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1">
                    <Crown size={12} /> PRO PASS
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setUpgradeModalOpen(true)}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    Free Tier (Upgrade)
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Level {profile.level} Scholar • {profile.xp.toLocaleString()} XP •{' '}
                {profile.streakDays}-Day Learning Streak
              </p>

              {/* Avatar Selector */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <span className="text-xs font-semibold text-slate-400 mr-1">Choose Avatar:</span>
                {avatars.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => updateProfile({ avatar: av })}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-base transition-transform ${
                      profile.avatar === av
                        ? 'bg-brand-500 text-white scale-110 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 hover:scale-105'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                Target JLPT Level
              </label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value as JLPTLevel)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500"
              >
                <option value="N5">N5 - Beginner</option>
                <option value="N4">N4 - Elementary</option>
                <option value="N3">N3 - Intermediate</option>
                <option value="N2">N2 - Pre-Advanced</option>
                <option value="N1">N1 - Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                Primary Learning Goal
              </label>
              <select
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-500"
              >
                <option value="pass_jlpt">Pass JLPT Examination</option>
                <option value="travel">Travel & Tourism in Japan</option>
                <option value="work">Work / Employment in Japan</option>
                <option value="study">Study at Japanese University</option>
                <option value="conversation">Daily Life Conversation</option>
                <option value="business">Business Japanese</option>
              </select>
            </div>
          </div>
        </div>

        {/* Daily Quota Customizer */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Daily Study Quotas & Targets
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize how many items you aim to complete each day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Vocabulary Words</span>
                <span className="text-brand-600 dark:text-brand-400">{dailyVocab} words/day</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={dailyVocab}
                onChange={(e) => setDailyVocab(Number(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Kanji Characters</span>
                <span className="text-indigo-600 dark:text-indigo-400">{dailyKanji} kanji/day</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={dailyKanji}
                onChange={(e) => setDailyKanji(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Grammar Lessons</span>
                <span className="text-emerald-600 dark:text-emerald-400">{dailyGrammar} lessons/day</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={dailyGrammar}
                onChange={(e) => setDailyGrammar(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={16} /> Profile & Goals successfully updated!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </form>

      {/* Gamification Achievements Showcase */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Achievement Badges & Milestones
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unlock badges as you hit key study milestones.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-500">
            {badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
                b.unlocked
                  ? 'border-amber-300 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 opacity-50'
              }`}
            >
              <div className="text-3xl shrink-0">{b.icon}</div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                  {b.title}
                  {!b.unlocked && <Lock size={12} className="text-slate-400" />}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

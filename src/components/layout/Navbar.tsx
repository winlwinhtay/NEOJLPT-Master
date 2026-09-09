import React, { useState } from 'react';
import {
  Search,
  Flame,
  Zap,
  Bell,
  Sun,
  Moon,
  Globe,
  Sparkles,
  ChevronDown,
  Menu,
  Crown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';
import { JLPT_LEVELS } from '../../data/jlptLevels';
import { SupportedLanguage } from '../../types/i18n';

export const Navbar: React.FC = () => {
  const {
    activeLevel,
    setLevelSelectorOpen,
    setSearchModalOpen,
    setAiTutorOpen,
    setNotificationDrawerOpen,
    setMobileMenuOpen,
    setUpgradeModalOpen,
    setAuthModalOpen,
    setActiveView,
  } = useApp();

  const { profile, updateProfile } = useUser();
  const { language, setLanguage, supportedLanguages, t } = useI18n();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const levelInfo = JLPT_LEVELS[activeLevel];

  const handleThemeChange = (theme: 'light' | 'dark' | 'sakura' | 'bamboo') => {
    updateProfile({ theme });
    setThemeMenuOpen(false);
  };

  const handleLanguageSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand & Level Switcher */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu size={22} />
          </button>

          {/* App Logo */}
          <div
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <span className="font-black font-japanese text-lg">日</span>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 dark:text-white tracking-tight text-lg">
                  JLPT<span className="text-brand-500">Master</span>
                </span>
                {profile.isPremium && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                    <Crown size={10} /> PRO
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-medium">日本語能力試験対策</p>
            </div>
          </div>

          {/* Level Switcher Pill Button */}
          <button
            type="button"
            onClick={() => setLevelSelectorOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all hover:opacity-90 ${levelInfo.badgeColor}`}
          >
            <span>{activeLevel}</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Center: Search Trigger (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-xs transition-all"
          >
            <div className="flex items-center gap-2">
              <Search size={16} />
              <span>{t('common.search', 'Search words, kanji, grammar...')}</span>
            </div>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-[10px] font-mono text-slate-500 dark:text-slate-300">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Stats, AI Tutor, Theme, Language & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div
            title="Daily Streak"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-200 dark:border-orange-900/50"
          >
            <Flame size={16} className="text-orange-500 animate-pulse" />
            <span>{profile.streakDays}</span>
          </div>

          {/* XP & Level */}
          <div
            title={`Level ${profile.level} (${profile.xp} XP)`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-900/50"
          >
            <Zap size={15} className="text-amber-500" />
            <span>Lv.{profile.level}</span>
          </div>

          {/* AI Tutor Assistant Trigger */}
          <button
            type="button"
            onClick={() => setAiTutorOpen(true)}
            title="AI Japanese Tutor"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-sm shadow-indigo-500/20 hover:from-indigo-600 hover:to-purple-700 transition-all"
          >
            <Sparkles size={14} className="animate-spin-slow" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Multilingual Language Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              title="Interface Language"
            >
              <Globe size={18} />
              <span className="text-xs uppercase font-bold">{language}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-fade-in custom-scrollbar">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-100 dark:border-slate-800/80">
                  {t('settings.language')} ({supportedLanguages.length})
                </div>
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                      language === lang.code
                        ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50/60 dark:bg-brand-950/30'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </span>
                    {language === lang.code && <span className="text-xs text-brand-600 dark:text-brand-400 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Theme Settings"
            >
              {profile.theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {themeMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-fade-in">
                <button
                  onClick={() => handleThemeChange('light')}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Sun size={14} /> Light
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Moon size={14} /> Dark
                </button>
                <button
                  onClick={() => handleThemeChange('sakura')}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                >
                  🌸 Sakura
                </button>
                <button
                  onClick={() => handleThemeChange('bamboo')}
                  className="w-full text-left px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center gap-2"
                >
                  🎋 Bamboo
                </button>
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <button
            type="button"
            onClick={() => setNotificationDrawerOpen(true)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Study Reminders"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* Profile Avatar / Sign In */}
          {profile.name === 'Guest Learner' ? (
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Sign In</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveView('profile')}
              title={`Logged in as ${profile.name}`}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-lg hover:border-brand-500 transition-all overflow-hidden"
            >
              {profile.avatar}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

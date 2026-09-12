import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Layers,
  PenTool,
  BookOpen,
  FileText,
  Headphones,
  CheckSquare,
  Award,
  Bot,
  Mic,
  BarChart3,
  BookA,
  User,
  Settings,
  ShieldAlert,
  Briefcase,
  Sparkles,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n/I18nContext';
import { useUser } from '../../context/UserContext';
import { useSRS } from '../../context/SRSContext';
import { ViewType } from '../../types';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, activeLevel, mobileMenuOpen, setMobileMenuOpen, setUpgradeModalOpen } =
    useApp();
  const { profile } = useUser();
  const { t } = useI18n();
  const { getDueTodayCount } = useSRS();

  const dueVocab = getDueTodayCount(activeLevel);

  const mainNavItems: { id: ViewType; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: t('nav.dashboard', 'Dashboard'), icon: <LayoutDashboard size={20} /> },
    { id: 'learn', label: t('nav.learn', 'Learn Roadmap'), icon: <Compass size={20} /> },
    {
      id: 'vocabulary',
      label: t('nav.vocabulary', 'Vocabulary'),
      icon: <Layers size={20} />,
      badge: dueVocab > 0 ? `${dueVocab}` : undefined,
    },
    { id: 'kanji', label: t('nav.kanji', 'Kanji'), icon: <PenTool size={20} /> },
    { id: 'grammar', label: t('nav.grammar', 'Grammar'), icon: <BookOpen size={20} /> },
    { id: 'reading', label: t('nav.reading', 'Reading'), icon: <FileText size={20} /> },
    { id: 'listening', label: t('nav.listening', 'Listening'), icon: <Headphones size={20} /> },
    { id: 'practice', label: t('nav.practice', 'Practice'), icon: <CheckSquare size={20} /> },
    { id: 'mock-test', label: t('nav.mockTest', 'Mock Test'), icon: <Award size={20} /> },
    {
      id: 'business',
      label: t('nav.business', 'Business Japanese'),
      icon: <Briefcase size={20} />,
      badge: 'Pro',
    },
    { id: 'ai-conversation', label: t('nav.aiConversation', 'AI Conversation'), icon: <Bot size={20} /> },
    { id: 'speaking', label: t('nav.speaking', 'Speaking Practice'), icon: <Mic size={20} /> },
    { id: 'progress', label: t('nav.progress', 'Progress Analytics'), icon: <BarChart3 size={20} /> },
    { id: 'dictionary', label: t('nav.dictionary', 'Dictionary'), icon: <BookA size={20} /> },
  ];

  const systemNavItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: t('nav.profile', 'Profile'), icon: <User size={20} /> },
    { id: 'settings', label: t('nav.settings', 'Settings'), icon: <Settings size={20} /> },
    { id: 'admin', label: t('nav.admin', 'Admin Studio'), icon: <ShieldAlert size={20} /> },
  ];

  const handleSelectView = (view: ViewType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between py-4 px-3 overflow-y-auto">
      <div className="space-y-6">
        {/* Mobile Header Close Button */}
        <div className="flex lg:hidden items-center justify-between px-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-white">Navigation</span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Study Navigation Group */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Study Modules
          </div>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-brand-600'
                          : 'bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* System & Tools Navigation Group */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            System & Tools
          </div>
          <nav className="space-y-1">
            {systemNavItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Premium Card */}
      {!profile.isPremium && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/20 text-center">
          <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-sm mb-2">
            <Sparkles size={16} />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
            Unlock N5–N1 Unlimited
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            Full mock tests, AI speech tutor, and SRS memory intervals.
          </p>
          <button
            type="button"
            onClick={() => setUpgradeModalOpen(true)}
            className="w-full py-2 px-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            Upgrade to Pro
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)]">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-slate-900 shadow-2xl h-full z-10 animate-slide-right">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};

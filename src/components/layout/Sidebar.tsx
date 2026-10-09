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
  Crown,
  Shield,
  X,
  Keyboard,
  CreditCard,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n/I18nContext';
import { useUser } from '../../context/UserContext';
import { useSRS } from '../../context/SRSContext';
import { ViewType } from '../../types';
import { isSuperAdminEmail } from '../../services/entitlementService';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    activeLevel,
    mobileMenuOpen,
    setMobileMenuOpen,
    setUpgradeModalOpen,
    setAuthModalOpen,
    openLoginView,
  } = useApp();
  const { profile, entitlements, isGuest, logout } = useUser();
  const { t } = useI18n();
  const { getDueTodayCount } = useSRS();

  const dueVocab = getDueTodayCount(activeLevel);

  const mainNavItems: { id: ViewType; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: t('nav.dashboard', 'Dashboard'), icon: <LayoutDashboard size={20} /> },
    {
      id: 'active-learning',
      label: 'AI Active Learning',
      icon: <Sparkles size={20} />,
      badge: 'AI',
    },
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
    {
      id: 'typing-practice',
      label: 'Typing Practice (入力練習)',
      icon: <Keyboard size={20} />,
      badge: 'New',
    },
    { id: 'progress', label: t('nav.progress', 'Progress Analytics'), icon: <BarChart3 size={20} /> },
    { id: 'dictionary', label: t('nav.dictionary', 'Dictionary'), icon: <BookA size={20} /> },
  ];

  const systemNavItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'login', label: isGuest ? 'Sign In / Plans' : 'Account & Plans', icon: <CreditCard size={20} /> },
    { id: 'profile', label: t('nav.profile', 'Profile'), icon: <User size={20} /> },
    { id: 'settings', label: t('nav.settings', 'Settings'), icon: <Settings size={20} /> },
    ...(!isGuest && isSuperAdminEmail(profile?.email)
      ? [{ id: 'admin' as ViewType, label: 'Admin Console', icon: <ShieldAlert size={20} /> }]
      : []),
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

        {/* Top Account & Pricing Quick Bar */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-brand-50/80 via-indigo-50/50 to-purple-50/80 dark:from-slate-800/80 dark:via-indigo-950/30 dark:to-slate-800/80 border border-brand-200/60 dark:border-slate-700/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              {isGuest ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Free Guest Mode (ログイン不要)</span>
                </>
              ) : (
                <>
                  <Sparkles size={12} className="text-amber-500" />
                  <span className="truncate max-w-[140px] font-mono">{profile.email}</span>
                </>
              )}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {isGuest ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    openLoginView('auth');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-brand-600 dark:text-brand-300 font-bold text-xs border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogIn size={14} />
                  <span>Log In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openLoginView('plans');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Crown size={14} />
                  <span>Plans (料金)</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    openLoginView('plans');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Crown size={14} />
                  <span>Plans (料金)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-rose-900/50 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Sign out of account"
                >
                  <LogOut size={14} />
                  <span>Log Out</span>
                </button>
              </>
            )}
          </div>
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

            {!isGuest && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
              >
                <LogOut size={20} />
                <span>Log Out (ログアウト)</span>
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Bottom Membership & Conversion Card */}
      {isGuest ? (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-brand-500/10 border border-indigo-500/20 text-center">
          <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-sm mb-2">
            <Sparkles size={16} />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
            Guest Session Active
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            Save your progress & sync across devices with a free account.
          </p>
          <button
            type="button"
            onClick={() => setActiveView('login')}
            className="w-full py-2 px-3 bg-gradient-to-r from-brand-500 to-indigo-600 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Save Progress / View Plans
          </button>
        </div>
      ) : entitlements.accountType === 'ADMIN' ? (
        <div className="mt-6 p-3.5 rounded-2xl bg-purple-500/10 dark:bg-purple-950/30 border border-purple-500/20 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 text-[11px] font-bold mb-1.5 border border-purple-500/30">
            <Shield size={12} /> Administrator Access
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-300 font-medium">
            Full Unrestricted System Access
          </p>
          <button
            type="button"
            onClick={() => {
              logout();
              setMobileMenuOpen(false);
            }}
            className="mt-2.5 w-full py-1.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            <span>Log Out (ログアウト)</span>
          </button>
        </div>
      ) : entitlements.subscriptionPlan === 'FREE' ? (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/20 text-center">
          <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-sm mb-2">
            <Crown size={16} />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
            Unlock N5–N1 Unlimited
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            Full mock tests, AI speech tutor, and SRS memory intervals.
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => {
                openLoginView('plans');
                setMobileMenuOpen(false);
              }}
              className="py-1.5 px-2 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Plans
            </button>
            <button
              type="button"
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="py-1.5 px-2 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold mb-1.5 border border-amber-500/20">
            <Crown size={12} /> {entitlements.subscriptionPlan} Scholar Pass
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            100% Ad-Free • Complete Access
          </p>
          <button
            type="button"
            onClick={() => {
              logout();
              setMobileMenuOpen(false);
            }}
            className="mt-2.5 w-full py-1.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            <span>Log Out (ログアウト)</span>
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

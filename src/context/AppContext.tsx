import React, { createContext, useContext, useState } from 'react';
import { JLPTLevel, ViewType } from '../types';

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  activeLevel: JLPTLevel;
  setActiveLevel: (level: JLPTLevel) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  aiTutorOpen: boolean;
  setAiTutorOpen: (open: boolean) => void;
  levelSelectorOpen: boolean;
  setLevelSelectorOpen: (open: boolean) => void;
  upgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  notificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedGrammarId: string | null;
  setSelectedGrammarId: (id: string | null) => void;
  selectedKanjiId: string | null;
  setSelectedKanjiId: (id: string | null) => void;
  selectedVocabId: string | null;
  setSelectedVocabId: (id: string | null) => void;
  navigateToLesson: (lessonId: string) => void;
  loginInitialTab: 'auth' | 'plans';
  setLoginInitialTab: (tab: 'auth' | 'plans') => void;
  openLoginView: (tab?: 'auth' | 'plans') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const VALID_VIEWS: ViewType[] = [
  'dashboard', 'learn', 'vocabulary', 'kanji', 'grammar', 'reading', 'listening',
  'practice', 'mock-test', 'business', 'active-learning', 'ai-conversation',
  'speaking', 'progress', 'dictionary', 'profile', 'settings', 'admin', 'typing-practice', 'login'
];

const getInitialView = (): ViewType => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    const viewParam = search.get('view')?.toLowerCase();

    if (hash === 'login' || hash === 'plans' || path === '/login' || path === '/plans' || viewParam === 'login' || viewParam === 'plans') {
      return 'login';
    }
    if (VALID_VIEWS.includes(hash as ViewType)) {
      return hash as ViewType;
    }
  }
  return 'dashboard';
};

const getInitialLoginTab = (): 'auth' | 'plans' => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    if (hash.includes('plan') || path.includes('plan') || search.get('tab') === 'plans' || search.get('view') === 'plans') {
      return 'plans';
    }
  }
  return 'auth';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveViewState] = useState<ViewType>(getInitialView);
  const [loginInitialTab, setLoginInitialTab] = useState<'auth' | 'plans'>(getInitialLoginTab);
  const [activeLevel, setActiveLevelState] = useState<JLPTLevel>(() => {
    const saved = localStorage.getItem('jlpt_active_level');
    return (saved as JLPTLevel) || 'N5';
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [levelSelectorOpen, setLevelSelectorOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedGrammarId, setSelectedGrammarId] = useState<string | null>(null);
  const [selectedKanjiId, setSelectedKanjiId] = useState<string | null>(null);
  const [selectedVocabId, setSelectedVocabId] = useState<string | null>(null);

  // Sync hash changes (back/forward or external links)
  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
      if (hash === 'plans') {
        setLoginInitialTab('plans');
        setActiveViewState('login');
      } else if (hash === 'login') {
        setLoginInitialTab('auth');
        setActiveViewState('login');
      } else if (VALID_VIEWS.includes(hash as ViewType)) {
        setActiveViewState(hash as ViewType);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setActiveView = (view: ViewType) => {
    setActiveViewState(view);
    if (typeof window !== 'undefined') {
      try {
        window.location.hash = `#${view}`;
      } catch (_) {}
    }
  };

  const openLoginView = (tab: 'auth' | 'plans' = 'auth') => {
    setLoginInitialTab(tab);
    setActiveViewState('login');
    if (typeof window !== 'undefined') {
      try {
        window.location.hash = tab === 'plans' ? '#plans' : '#login';
      } catch (_) {}
    }
  };

  const setActiveLevel = (level: JLPTLevel) => {
    setActiveLevelState(level);
    localStorage.setItem('jlpt_active_level', level);
  };

  const navigateToLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActiveView('learn');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        activeLevel,
        setActiveLevel,
        searchModalOpen,
        setSearchModalOpen,
        aiTutorOpen,
        setAiTutorOpen,
        levelSelectorOpen,
        setLevelSelectorOpen,
        upgradeModalOpen,
        setUpgradeModalOpen,
        authModalOpen,
        setAuthModalOpen,
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        selectedLessonId,
        setSelectedLessonId,
        selectedGrammarId,
        setSelectedGrammarId,
        selectedKanjiId,
        setSelectedKanjiId,
        selectedVocabId,
        setSelectedVocabId,
        navigateToLesson,
        loginInitialTab,
        setLoginInitialTab,
        openLoginView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

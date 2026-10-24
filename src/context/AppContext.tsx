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
  selectedReadingId: string | null;
  setSelectedReadingId: (id: string | null) => void;
  selectedListeningId: string | null;
  setSelectedListeningId: (id: string | null) => void;
  isExamSimulating: boolean;
  setIsExamSimulating: (simulating: boolean) => void;
  isDistractionFree: boolean;
  exitLessonMode: () => void;
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

const parseHashState = () => {
  if (typeof window === 'undefined') {
    return {
      view: 'dashboard' as ViewType,
      id: null as string | null,
      session: null as string | null,
    };
  }
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [viewPart, queryPart] = raw.split('?');
  const lowerView = viewPart.toLowerCase();
  const searchParams = new URLSearchParams(queryPart || '');
  const id = searchParams.get('id') || searchParams.get('lesson') || null;
  const session = searchParams.get('session') || null;

  return {
    view: VALID_VIEWS.includes(lowerView as ViewType) ? (lowerView as ViewType) : ('dashboard' as ViewType),
    id,
    session,
  };
};

const getInitialView = (): ViewType => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    const viewParam = search.get('view')?.toLowerCase();

    if (hash === 'login' || hash === 'plans' || path === '/login' || path === '/plans' || viewParam === 'login' || viewParam === 'plans') {
      return 'login';
    }
    const parsed = parseHashState();
    if (VALID_VIEWS.includes(parsed.view)) {
      return parsed.view;
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

  // Lesson Identification States
  const [selectedLessonId, setSelectedLessonIdState] = useState<string | null>(() => {
    const p = parseHashState();
    return p.view === 'learn' ? p.id : null;
  });
  const [selectedGrammarId, setSelectedGrammarIdState] = useState<string | null>(() => {
    const p = parseHashState();
    return p.view === 'grammar' ? p.id : null;
  });
  const [selectedKanjiId, setSelectedKanjiIdState] = useState<string | null>(() => {
    const p = parseHashState();
    return p.view === 'kanji' ? p.id : null;
  });
  const [selectedVocabId, setSelectedVocabIdState] = useState<string | null>(() => {
    const p = parseHashState();
    return p.view === 'vocabulary' ? p.id : null;
  });
  const [selectedReadingId, setSelectedReadingIdState] = useState<string | null>(() => {
    const p = parseHashState();
    return p.view === 'reading' ? p.id : null;
  });
  const [selectedListeningId, setSelectedListeningIdState] = useState<string | null>(() => {
    const p = parseHashState();
    return p.view === 'listening' ? p.id : null;
  });
  const [isExamSimulating, setIsExamSimulatingState] = useState<boolean>(() => {
    const p = parseHashState();
    return p.view === 'mock-test' && p.session === 'active';
  });

  // Calculate whether Distraction-Free Lesson Mode is active
  const isDistractionFree = Boolean(
    (activeView === 'learn' && selectedLessonId) ||
    (activeView === 'kanji' && selectedKanjiId) ||
    (activeView === 'grammar' && selectedGrammarId) ||
    (activeView === 'vocabulary' && selectedVocabId) ||
    (activeView === 'reading' && selectedReadingId) ||
    (activeView === 'listening' && selectedListeningId) ||
    (activeView === 'mock-test' && isExamSimulating)
  );

  // Sync hash changes (Browser Back / Forward / Bookmarks)
  React.useEffect(() => {
    const onHashChange = () => {
      const raw = window.location.hash.replace(/^#\/?/, '');
      const [viewPart, queryPart] = raw.split('?');
      const lowerView = viewPart.toLowerCase();
      const searchParams = new URLSearchParams(queryPart || '');
      const id = searchParams.get('id') || searchParams.get('lesson') || null;

      if (lowerView === 'plans') {
        setLoginInitialTab('plans');
        setActiveViewState('login');
      } else if (lowerView === 'login') {
        setLoginInitialTab('auth');
        setActiveViewState('login');
      } else if (VALID_VIEWS.includes(lowerView as ViewType)) {
        setActiveViewState(lowerView as ViewType);
      }

      // Synchronize individual lesson states with URL hash parameters
      if (lowerView === 'kanji') setSelectedKanjiIdState(id);
      if (lowerView === 'grammar') setSelectedGrammarIdState(id);
      if (lowerView === 'vocabulary') setSelectedVocabIdState(id);
      if (lowerView === 'reading') setSelectedReadingIdState(id);
      if (lowerView === 'listening') setSelectedListeningIdState(id);
      if (lowerView === 'learn') setSelectedLessonIdState(id);
      if (lowerView === 'mock-test') setIsExamSimulatingState(searchParams.get('session') === 'active');
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

  const setSelectedLessonId = (id: string | null) => {
    setSelectedLessonIdState(id);
    if (typeof window !== 'undefined') {
      try {
        if (id) {
          window.location.hash = `#learn?lesson=${encodeURIComponent(id)}`;
        } else if (window.location.hash.startsWith('#learn')) {
          window.location.hash = '#learn';
        }
      } catch (_) {}
    }
  };

  const setSelectedGrammarId = (id: string | null) => {
    setSelectedGrammarIdState(id);
    if (typeof window !== 'undefined') {
      try {
        if (id) {
          window.location.hash = `#grammar?id=${encodeURIComponent(id)}`;
        } else if (window.location.hash.startsWith('#grammar')) {
          window.location.hash = '#grammar';
        }
      } catch (_) {}
    }
  };

  const setSelectedKanjiId = (id: string | null) => {
    setSelectedKanjiIdState(id);
    if (typeof window !== 'undefined') {
      try {
        if (id) {
          window.location.hash = `#kanji?id=${encodeURIComponent(id)}`;
        } else if (window.location.hash.startsWith('#kanji')) {
          window.location.hash = '#kanji';
        }
      } catch (_) {}
    }
  };

  const setSelectedVocabId = (id: string | null) => {
    setSelectedVocabIdState(id);
    if (typeof window !== 'undefined') {
      try {
        if (id) {
          window.location.hash = `#vocabulary?id=${encodeURIComponent(id)}`;
        } else if (window.location.hash.startsWith('#vocabulary')) {
          window.location.hash = '#vocabulary';
        }
      } catch (_) {}
    }
  };

  const setSelectedReadingId = (id: string | null) => {
    setSelectedReadingIdState(id);
    if (typeof window !== 'undefined') {
      try {
        if (id) {
          window.location.hash = `#reading?id=${encodeURIComponent(id)}`;
        } else if (window.location.hash.startsWith('#reading')) {
          window.location.hash = '#reading';
        }
      } catch (_) {}
    }
  };

  const setSelectedListeningId = (id: string | null) => {
    setSelectedListeningIdState(id);
    if (typeof window !== 'undefined') {
      try {
        if (id) {
          window.location.hash = `#listening?id=${encodeURIComponent(id)}`;
        } else if (window.location.hash.startsWith('#listening')) {
          window.location.hash = '#listening';
        }
      } catch (_) {}
    }
  };

  const setIsExamSimulating = (simulating: boolean) => {
    setIsExamSimulatingState(simulating);
    if (typeof window !== 'undefined') {
      try {
        if (simulating) {
          window.location.hash = '#mock-test?session=active';
        } else if (window.location.hash.startsWith('#mock-test')) {
          window.location.hash = '#mock-test';
        }
      } catch (_) {}
    }
  };

  const exitLessonMode = () => {
    setSelectedLessonIdState(null);
    setSelectedGrammarIdState(null);
    setSelectedKanjiIdState(null);
    setSelectedVocabIdState(null);
    setSelectedReadingIdState(null);
    setSelectedListeningIdState(null);
    setIsExamSimulatingState(false);
    if (typeof window !== 'undefined') {
      try {
        window.location.hash = `#${activeView}`;
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
        selectedReadingId,
        setSelectedReadingId,
        selectedListeningId,
        setSelectedListeningId,
        isExamSimulating,
        setIsExamSimulating,
        isDistractionFree,
        exitLessonMode,
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

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
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

import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { GlobalSearch } from './components/layout/GlobalSearch';
import { LevelSelectorModal } from './components/layout/LevelSelectorModal';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { AuthModal } from './components/layout/AuthModal';
import { UpgradeModal } from './components/common/UpgradeModal';
import { AITutorModal } from './components/ai/AITutorModal';

// Views
import { DashboardView } from './views/DashboardView';
import { LearnRoadmapView } from './views/LearnRoadmapView';
import { VocabularyView } from './views/VocabularyView';
import { KanjiView } from './views/KanjiView';
import { GrammarView } from './views/GrammarView';
import { ReadingView } from './views/ReadingView';
import { ListeningView } from './views/ListeningView';
import { PracticeView } from './views/PracticeView';
import { MockTestView } from './views/MockTestView';
import { AIConversationView } from './views/AIConversationView';
import { SpeakingPracticeView } from './views/SpeakingPracticeView';
import { ProgressAnalyticsView } from './views/ProgressAnalyticsView';
import { DictionaryView } from './views/DictionaryView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { AdminView } from './views/AdminView';

export const App: React.FC = () => {
  const { activeView } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'learn':
        return <LearnRoadmapView />;
      case 'vocabulary':
        return <VocabularyView />;
      case 'kanji':
        return <KanjiView />;
      case 'grammar':
        return <GrammarView />;
      case 'reading':
        return <ReadingView />;
      case 'listening':
        return <ListeningView />;
      case 'practice':
        return <PracticeView />;
      case 'mock-test':
        return <MockTestView />;
      case 'ai-conversation':
        return <AIConversationView />;
      case 'speaking':
        return <SpeakingPracticeView />;
      case 'progress':
        return <ProgressAnalyticsView />;
      case 'dictionary':
        return <DictionaryView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'admin':
        return <AdminView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Body with Sidebar and Active View */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 lg:pb-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-x-hidden">{renderActiveView()}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Modals & Drawers */}
      <GlobalSearch />
      <LevelSelectorModal />
      <NotificationDrawer />
      <AuthModal />
      <UpgradeModal />
      <AITutorModal />
    </div>
  );
};

export default App;

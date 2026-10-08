import React, { useState, useEffect } from 'react';
import { BibleProvider, useBible } from './context/BibleContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { SplashAnimation } from './components/SplashAnimation';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ReadingSettingsDrawer } from './components/ReadingSettingsDrawer';

import { HomeView } from './views/HomeView';
import { BooksView } from './views/BooksView';
import { ReaderView } from './views/ReaderView';
import { SearchView } from './views/SearchView';
import { SavedView } from './views/SavedView';
import { PlansView } from './views/PlansView';
import { SettingsView } from './views/SettingsView';
import { AdminImportView } from './views/AdminImportView';
import { QuizView } from './views/QuizView';
import { TopicsView } from './views/TopicsView';

const MainLayout: React.FC = () => {
  const { activeTab } = useBible();
  const [isReadingSettingsOpen, setIsReadingSettingsOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'bible':
        return <BooksView />;
      case 'reader':
        return <ReaderView />;
      case 'topics':
        return <TopicsView />;
      case 'search':
        return <SearchView />;
      case 'saved':
        return <SavedView />;
      case 'plans':
        return <PlansView />;
      case 'quiz':
        return <QuizView />;
      case 'settings':
        return <SettingsView />;
      case 'admin':
        return <AdminImportView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121316] text-[#EDE8DF]">
      {/* Top Header */}
      <Header onOpenSettingsDrawer={() => setIsReadingSettingsOpen(true)} />

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Left Sidebar */}
        <Sidebar />

        {/* Center Viewport */}
        <main className="flex-1 w-full min-w-0">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Thumb Navigation */}
      <BottomNav />

      {/* Floating Offline Connectivity Indicator */}
      <OfflineIndicator />

      {/* Global Reading Settings Drawer */}
      <ReadingSettingsDrawer
        isOpen={isReadingSettingsOpen}
        onClose={() => setIsReadingSettingsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Check if splash was already shown in current session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('svs_splash_seen');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('svs_splash_seen', 'true');
    setShowSplash(false);
  };

  return (
    <BibleProvider>
      {showSplash && <SplashAnimation onComplete={handleSplashComplete} />}
      <MainLayout />
    </BibleProvider>
  );
}

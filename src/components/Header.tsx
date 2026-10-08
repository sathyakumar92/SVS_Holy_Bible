import React from 'react';
import { useBible } from '../context/BibleContext';
import { Search, Settings, SlidersHorizontal, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenSettingsDrawer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettingsDrawer }) => {
  const {
    currentLanguage,
    setLanguage,
    currentVersionId,
    activeTab,
    setActiveTab,
  } = useBible();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#121316]/90 backdrop-blur-md border-b border-[#242731]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          {/* SVS Bible Open Book Vector Icon */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#1C1F27] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#D4AF37] transition-colors">
            <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              <line x1="12" y1="7" x2="12" y2="15" stroke="#C5A059" strokeWidth="1.5" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-[#EDE8DF] group-hover:text-white transition-colors">
                SVS BIBLE
              </span>
              <span className="text-[10px] font-mono tracking-tighter uppercase px-1.5 py-0.5 rounded bg-[#202430] text-[#C5A059] border border-[#2F3444]">
                {currentVersionId === 'en-kjv' ? 'KJV' : 'TAM'}
              </span>
            </div>
          </div>
        </button>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector: English | தமிழ் (Mandatory Section 3) */}
          <div className="flex items-center bg-[#1B1D25] p-0.5 rounded-lg border border-[#2B2E3A] text-xs shadow-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                currentLanguage === 'en'
                  ? 'bg-[#D4AF37] text-[#121316] font-semibold shadow-xs'
                  : 'text-[#A9A397] hover:text-[#EDE8DF]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-1 rounded-md font-tamil transition-all ${
                currentLanguage === 'ta'
                  ? 'bg-[#D4AF37] text-[#121316] font-semibold shadow-xs'
                  : 'text-[#A9A397] hover:text-[#EDE8DF]'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Quick Reader / Books Button on desktop */}
          <button
            onClick={() => setActiveTab('bible')}
            title="Browse Books"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              activeTab === 'bible'
                ? 'bg-[#232733] text-[#EDE8DF] border-[#C5A059]/40'
                : 'border-transparent text-[#A9A397] hover:text-[#EDE8DF] hover:bg-[#1C1F27]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Books</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setActiveTab('search')}
            title="Search Scripture"
            className={`p-2 rounded-lg border transition-colors ${
              activeTab === 'search'
                ? 'bg-[#232733] text-[#D4AF37] border-[#C5A059]/40'
                : 'border-transparent text-[#A9A397] hover:text-[#EDE8DF] hover:bg-[#1C1F27]'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Reading Settings Drawer Trigger (if on reader) */}
          {activeTab === 'reader' && onOpenSettingsDrawer && (
            <button
              onClick={onOpenSettingsDrawer}
              title="Reading Settings (Font & Display)"
              className="p-2 rounded-lg text-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/30 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          {/* General App Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            title="Settings"
            className={`p-1.5 sm:p-2 rounded-lg border transition-colors ${
              activeTab === 'settings'
                ? 'bg-[#232733] text-[#D4AF37] border-[#C5A059]/40'
                : 'border-transparent text-[#A9A397] hover:text-[#EDE8DF] hover:bg-[#1C1F27]'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

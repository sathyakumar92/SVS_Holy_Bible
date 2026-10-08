import React from 'react';
import { useBible } from '../context/BibleContext';
import { Home, BookOpen, Search, Bookmark, Settings, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentLanguage, activeTab, setActiveTab } = useBible();

  const navItems = [
    { id: 'home', label: currentLanguage === 'ta' ? 'முகப்பு' : 'Home', icon: Home },
    { id: 'bible', label: currentLanguage === 'ta' ? 'வேதாகமம்' : 'Bible', icon: BookOpen },
    { id: 'topics', label: currentLanguage === 'ta' ? 'தலைப்புகள்' : 'Topics', icon: Sparkles },
    { id: 'search', label: currentLanguage === 'ta' ? 'தேடல்' : 'Search', icon: Search },
    { id: 'saved', label: currentLanguage === 'ta' ? 'சேமிப்பு' : 'Saved', icon: Bookmark },
    { id: 'settings', label: currentLanguage === 'ta' ? 'அமைப்புகள்' : 'Settings', icon: Settings },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121316]/95 backdrop-blur-lg border-t border-[#242731] safe-bottom">
      <div className="flex items-center justify-around h-15">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id || (item.id === 'bible' && activeTab === 'reader');

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 gap-1 transition-all active:scale-95 ${
                isActive ? 'text-[#D4AF37]' : 'text-[#878278] hover:text-[#EDE8DF]'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

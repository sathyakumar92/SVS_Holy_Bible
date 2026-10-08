import React from 'react';
import { useBible } from '../context/BibleContext';
import { VerseOfTheDay } from '../components/VerseOfTheDay';
import {
  BookOpen,
  Search,
  Bookmark,
  FileText,
  Heart,
  ArrowRight,
  Clock,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    currentLanguage,
    continueReadingLocation,
    goToScripture,
    setActiveTab,
    overallProgressPercent,
    otProgressPercent,
    ntProgressPercent,
    history,
  } = useBible();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24 md:pb-12">
      {/* Hero Continue Reading Card (Section 13 & 14) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1F28] via-[#171920] to-[#121316] border border-[#C5A059]/35 p-6 sm:p-7 shadow-xl">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
              Continue Reading
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#EDE8DF]">
              {continueReadingLocation.bookName} {continueReadingLocation.chapterNumber}
            </h2>
            <p className="text-xs text-[#A9A397]">
              {currentLanguage === 'ta'
                ? 'உங்கள் முந்தைய வாசிப்புப் பகுதியிலிருந்து தொடருங்கள்'
                : 'Pick up right where you left off in your reading journey'}
            </p>
          </div>

          <button
            onClick={() =>
              goToScripture(
                continueReadingLocation.bookId,
                continueReadingLocation.chapterNumber,
                continueReadingLocation.verseNumber
              )
            }
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-semibold text-sm shadow-lg transition-all active:scale-95 group shrink-0"
          >
            <span>{currentLanguage === 'ta' ? 'தொடர்ந்து வாசிக்க' : 'Continue Reading'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Quick Access Grid (Section 13) */}
      <section>
        <h3 className="text-xs font-semibold text-[#8E897F] uppercase tracking-wider mb-3">
          Quick Access
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
          {[
            {
              label: currentLanguage === 'ta' ? 'பழைய ஏற்பாடு' : 'Old Testament',
              icon: BookOpen,
              action: () => setActiveTab('bible'),
            },
            {
              label: currentLanguage === 'ta' ? 'புதிய ஏற்பாடு' : 'New Testament',
              icon: BookOpen,
              action: () => setActiveTab('bible'),
            },
            {
              label: currentLanguage === 'ta' ? 'வேதாகம தலைப்புகள்' : 'Bible Topics',
              icon: Sparkles,
              action: () => setActiveTab('topics'),
            },
            {
              label: currentLanguage === 'ta' ? 'வேதாகமத் தேடல்' : 'Search Bible',
              icon: Search,
              action: () => setActiveTab('search'),
            },
            {
              label: currentLanguage === 'ta' ? 'வினாடி வினா' : 'Scripture Quiz',
              icon: HelpCircle,
              action: () => setActiveTab('quiz'),
            },
            {
              label: currentLanguage === 'ta' ? 'புத்தகக்குறிகள்' : 'Bookmarks',
              icon: Bookmark,
              action: () => setActiveTab('saved'),
            },
            {
              label: currentLanguage === 'ta' ? 'குறிப்புகள்' : 'Notes',
              icon: FileText,
              action: () => setActiveTab('saved'),
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#181B22] border border-[#272B38] hover:border-[#C5A059]/40 hover:bg-[#1F232D] text-[#EDE8DF] transition-all group active:scale-95"
              >
                <div className="w-8 h-8 rounded-lg bg-[#222633] group-hover:bg-[#C5A059]/20 flex items-center justify-center text-[#D4AF37] mb-2 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-center line-clamp-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Bible Topics & Smart Search Spotlight */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1C202B] via-[#171A23] to-[#121316] border border-[#D4AF37]/35 p-5 sm:p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                {currentLanguage === 'ta' ? 'வேதாகம தலைப்பு ஆய்வு' : 'Bible Topics & Smart Search'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-cinzel text-[#EDE8DF]">
              {currentLanguage === 'ta' ? 'விசுவாசம், ஜெபம், அன்பு, சமாதானம்...' : 'Faith, Prayer, Love, Peace, Grace...'}
            </h3>
            <p className="text-xs text-[#A9A397] max-w-xl leading-relaxed">
              {currentLanguage === 'ta'
                ? '40+ ஆழமான வேதாகம தலைப்புகள், சரிபார்க்கப்பட்ட வேத வசனங்கள், கதாபாத்திரங்கள் மற்றும் நடைமுறை பயன்பாடுகள்.'
                : 'Intelligent bilingual search across 40+ rich Bible topics with verified authentic KJV & Tamil scripture, and character studies.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('topics')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-bold text-xs shadow-md transition-all active:scale-95 group shrink-0"
          >
            <span>{currentLanguage === 'ta' ? 'தலைப்புகளை ஆராய்க' : 'Explore Bible Topics'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Verse of the Day Component */}
      <VerseOfTheDay />

      {/* Reading Progress Overview (Section 24) */}
      <section className="rounded-2xl bg-[#181A22] border border-[#2B2F3D] p-5 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-xs font-semibold text-[#8E897F] uppercase tracking-wider">
              {currentLanguage === 'ta' ? 'வாசிப்பு முன்னேற்றம்' : 'Reading Progress'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-[#D4AF37]">{overallProgressPercent}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-[#242733] overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#C5A059] to-[#E5C158] transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(2, overallProgressPercent)}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-[#14161C] border border-[#262935]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#A9A397]">
                {currentLanguage === 'ta' ? 'பழைய ஏற்பாடு' : 'Old Testament'}
              </span>
              <span className="font-mono text-[#EDE8DF]">{otProgressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#242733] overflow-hidden">
              <div
                className="h-full bg-[#C5A059] transition-all"
                style={{ width: `${otProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#14161C] border border-[#262935]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#A9A397]">
                {currentLanguage === 'ta' ? 'புதிய ஏற்பாடு' : 'New Testament'}
              </span>
              <span className="font-mono text-[#EDE8DF]">{ntProgressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#242733] overflow-hidden">
              <div
                className="h-full bg-[#C5A059] transition-all"
                style={{ width: `${ntProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent History (Section 13) */}
      {history.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-[#8E897F] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'ta' ? 'சமீபத்திய வாசிப்பு' : 'Recent Reading'}</span>
            </h3>
          </div>
          <div className="space-y-2">
            {history.slice(0, 4).map((h) => (
              <button
                key={h.id}
                onClick={() => goToScripture(h.bookId, h.chapterNumber, h.verseNumber)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#181B22] border border-[#272B38] hover:border-[#C5A059]/40 text-left transition active:scale-98"
              >
                <div>
                  <span className="text-xs font-semibold text-[#EDE8DF]">
                    {h.bookName} {h.chapterNumber}
                  </span>
                  <span className="block text-[11px] text-[#7C776E]">
                    {new Date(h.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8E897F]" />
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

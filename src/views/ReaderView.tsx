import React, { useEffect, useState, useRef } from 'react';
import { useBible } from '../context/BibleContext';
import { BibleService } from '../services/bibleService';
import { Chapter, Verse } from '../types/bible';
import { getBookMeta, getBookName } from '../data/canonicalBooks';
import { ChapterSelectorModal } from '../components/ChapterSelectorModal';
import { ReadingSettingsDrawer } from '../components/ReadingSettingsDrawer';
import { VerseActionSheet } from '../components/VerseActionSheet';
import { NoteModal } from '../components/NoteModal';
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Bookmark,
  Heart,
  FileText,
  CheckCircle2,
  AlertCircle,
  Database,
} from 'lucide-react';

export const ReaderView: React.FC = () => {
  const {
    currentLanguage,
    currentVersionId,
    currentBookId,
    currentChapterNumber,
    currentVerseNumber,
    nextChapter,
    prevChapter,
    goToScripture,
    readingSettings,
    setActiveTab,
    isVerseBookmarked,
    isVerseFavorite,
    getVerseHighlight,
    getVerseNote,
    markChapterRead,
  } = useBible();

  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [isLoadingChapter, setIsLoadingChapter] = useState(true);
  const [isChapterSelectorOpen, setIsChapterSelectorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Verse action sheet & note modal state
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const verseRefs = useRef<Record<number, HTMLElement | null>>({});

  const bookMeta = getBookMeta(currentBookId);
  const bookName = getBookName(currentBookId, currentLanguage);

  // Load chapter text from BibleService (Bundled + IndexedDB custom)
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingChapter(true);

    BibleService.getChapter(currentVersionId, currentBookId, currentChapterNumber).then(
      (data) => {
        if (!isCancelled) {
          setChapterData(data);
          setIsLoadingChapter(false);

          // Mark chapter as read in reading progress when opened
          if (data && data.verses.length > 0) {
            markChapterRead(currentBookId, currentChapterNumber);
          }
        }
      }
    );

    return () => {
      isCancelled = true;
    };
  }, [currentVersionId, currentBookId, currentChapterNumber, markChapterRead]);

  // Scroll to verse if currentVerseNumber is provided
  useEffect(() => {
    if (currentVerseNumber && verseRefs.current[currentVerseNumber]) {
      setTimeout(() => {
        verseRefs.current[currentVerseNumber]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 300);
    }
  }, [currentVerseNumber, chapterData]);

  // Reading width container style
  const getWidthClass = () => {
    switch (readingSettings.readingWidth) {
      case 'narrow':
        return 'max-w-xl';
      case 'wide':
        return 'max-w-4xl';
      default:
        return 'max-w-2xl';
    }
  };

  // Exact Line height value for both English & Tamil
  const getLineHeightValue = () => {
    if (currentLanguage === 'ta') {
      switch (readingSettings.lineHeight) {
        case 'compact':
          return 1.6;
        case 'spacious':
          return 2.5;
        case 'comfortable':
        default:
          return 2.05;
      }
    } else {
      switch (readingSettings.lineHeight) {
        case 'compact':
          return 1.45;
        case 'spacious':
          return 2.3;
        case 'comfortable':
        default:
          return 1.85;
      }
    }
  };

  // Font family
  const getFontFamilyClass = () => {
    if (currentLanguage === 'ta') {
      return readingSettings.fontFamily === 'serif' ? 'font-tamil-serif' : 'font-tamil';
    }
    return readingSettings.fontFamily === 'serif' ? 'font-serif-reading' : 'font-sans';
  };

  const handleVerseClick = (verse: Verse) => {
    setSelectedVerse(verse);
    setIsActionSheetOpen(true);
  };

  // Color mapper for highlights
  const getHighlightBg = (color: string) => {
    switch (color) {
      case 'gold':
        return 'bg-[#D4AF37]/20 border-l-2 border-[#D4AF37] pl-2 -ml-2 rounded-r';
      case 'amber':
        return 'bg-amber-500/20 border-l-2 border-amber-500 pl-2 -ml-2 rounded-r';
      case 'emerald':
        return 'bg-emerald-500/20 border-l-2 border-emerald-500 pl-2 -ml-2 rounded-r';
      case 'sky':
        return 'bg-sky-500/20 border-l-2 border-sky-500 pl-2 -ml-2 rounded-r';
      case 'rose':
        return 'bg-rose-500/20 border-l-2 border-rose-500 pl-2 -ml-2 rounded-r';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16 flex flex-col">
      {/* Sticky Reader Bar with Book/Chapter Navigation */}
      <div className="sticky top-14 sm:top-16 z-20 bg-[#121316]/95 backdrop-blur-md border-b border-[#242732] px-3.5 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Back to Books */}
          <button
            onClick={() => setActiveTab('bible')}
            className="flex items-center gap-1 text-xs text-[#A9A397] hover:text-[#EDE8DF] py-1 px-1.5 rounded-lg hover:bg-[#1C1F28] transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Books</span>
          </button>

          {/* Center Book & Chapter Selector Button (Clickable!) */}
          <button
            onClick={() => setIsChapterSelectorOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1C1F28] hover:bg-[#252936] border border-[#2B2F3D] text-[#EDE8DF] transition active:scale-95 shadow-xs"
          >
            <span className="font-semibold text-sm sm:text-base">
              {bookName} {currentChapterNumber}
            </span>
            <span className="text-[10px] text-[#D4AF37] bg-[#272B38] px-1.5 py-0.5 rounded">
              ▼
            </span>
          </button>

          {/* Quick Font / Reading Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5 text-xs text-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/30 py-1.5 px-2.5 rounded-lg transition"
            title="Reading Settings"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="text-xs font-mono font-medium">{readingSettings.fontSize}px</span>
          </button>
        </div>
      </div>

      {/* Main Scripture Text Container */}
      <main className={`flex-1 w-full mx-auto px-5 sm:px-6 py-8 ${getWidthClass()}`}>
        {/* Chapter Title Header */}
        <div className="text-center mb-6 pb-5 border-b border-[#252834]">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37]">
            {bookMeta?.testament === 'OT'
              ? currentLanguage === 'ta' ? 'பழைய ஏற்பாடு' : 'Old Testament'
              : currentLanguage === 'ta' ? 'புதிய ஏற்பாடு' : 'New Testament'}
          </span>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold mt-1 text-[#EDE8DF]">
            {bookName}
          </h1>
          <p className="text-xs text-[#8C877D] mt-1 font-mono">
            {currentLanguage === 'ta' ? `அதிகாரம் ${currentChapterNumber}` : `Chapter ${currentChapterNumber}`}
          </p>
        </div>

        {/* Loading State */}
        {isLoadingChapter && (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-[#8C877D]">
              {currentLanguage === 'ta' ? 'வேத வசனங்கள் ஏற்றப்படுகின்றன...' : 'Loading Scripture...'}
            </p>
          </div>
        )}

        {/* Missing / Unavailable Chapter Notification (Section 44 & 57) */}
        {!isLoadingChapter && (!chapterData || chapterData.verses.length === 0) && (
          <div className="my-10 p-6 rounded-2xl bg-[#1A1C24] border border-[#3A2F25] text-center space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#EDE8DF]">
                {currentLanguage === 'ta'
                  ? 'இந்த அதிகாரம் கிடைக்கவில்லை'
                  : 'This chapter is unavailable in the selected Bible dataset'}
              </h3>
              <p className="text-xs text-[#A9A397] max-w-md mx-auto mt-1 leading-relaxed">
                {currentLanguage === 'ta'
                  ? 'தேர்ந்தெடுக்கப்பட்ட வேதாகமத் தரவுத்தொகுப்பில் இந்த அதிகாரம் இன்னும் இறக்குமதி செய்யப்படவில்லை. அதிகாரப்பூர்வ வேதாகம தரவுத்தொகுப்பை இறக்குமதி செய்ய தரவு சரிபார்ப்பு கருவியைப் பயன்படுத்தவும்.'
                  : 'According to SVS Bible Scripture integrity principles, Bible verses are never artificially generated. Please import an authorized dataset using the Admin / Dataset Validator.'}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('admin')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-semibold text-xs rounded-xl shadow transition"
            >
              <Database className="w-4 h-4" />
              <span>Open Dataset Validator & Importer</span>
            </button>
          </div>
        )}

        {/* Scripture Reading Area */}
        {!isLoadingChapter && chapterData && chapterData.verses.length > 0 && (
          readingSettings.continuousReading ? (
            /* Continuous Paragraph Mode */
            <div
              className={`p-5 sm:p-6 rounded-2xl bg-[#161822] border border-[#252834] text-[#EDE8DF] ${getFontFamilyClass()}`}
              style={{
                fontSize: `${readingSettings.fontSize}px`,
                lineHeight: getLineHeightValue(),
              }}
            >
              {chapterData.verses.map((verse) => {
                const highlightColor = getVerseHighlight(currentBookId, currentChapterNumber, verse.verseNumber);
                const isTargetVerse = currentVerseNumber === verse.verseNumber;

                return (
                  <span
                    key={verse.verseNumber}
                    ref={(el) => {
                      verseRefs.current[verse.verseNumber] = el;
                    }}
                    onClick={() => handleVerseClick(verse)}
                    className={`cursor-pointer transition-colors px-1 py-0.5 rounded inline select-text ${
                      highlightColor ? getHighlightBg(highlightColor) : ''
                    } ${isTargetVerse ? 'bg-[#D4AF37]/20 underline decoration-[#D4AF37]' : ''} hover:bg-[#252834]`}
                  >
                    {readingSettings.showVerseNumbers && (
                      <sup className="font-mono text-[10px] font-bold text-[#C5A059] mr-1 select-none">
                        {verse.verseNumber}
                      </sup>
                    )}
                    <span>{verse.text} </span>
                  </span>
                );
              })}
            </div>
          ) : (
            /* Verse-by-verse Scripture Cards */
            <div
              className={`space-y-4 text-[#EDE8DF] ${getFontFamilyClass()}`}
              style={{
                fontSize: `${readingSettings.fontSize}px`,
                lineHeight: getLineHeightValue(),
              }}
            >
              {chapterData.verses.map((verse) => {
                const highlightColor = getVerseHighlight(currentBookId, currentChapterNumber, verse.verseNumber);
                const isBookmarked = isVerseBookmarked(currentBookId, currentChapterNumber, verse.verseNumber);
                const isFav = isVerseFavorite(currentBookId, currentChapterNumber, verse.verseNumber);
                const note = getVerseNote(currentBookId, currentChapterNumber, verse.verseNumber);
                const isTargetVerse = currentVerseNumber === verse.verseNumber;

                return (
                  <div
                    key={verse.verseNumber}
                    ref={(el) => {
                      verseRefs.current[verse.verseNumber] = el;
                    }}
                    onClick={() => handleVerseClick(verse)}
                    className={`group relative p-2.5 rounded-xl transition-all cursor-pointer hover:bg-[#1B1E27] active:scale-[0.99] select-text ${
                      highlightColor ? getHighlightBg(highlightColor) : ''
                    } ${isTargetVerse ? 'ring-2 ring-[#D4AF37] bg-[#D4AF37]/10' : ''}`}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Verse Number */}
                      {readingSettings.showVerseNumbers && (
                        <span className="select-none font-mono text-[11px] font-bold text-[#C5A059] opacity-75 shrink-0 pt-1 group-hover:opacity-100">
                          {verse.verseNumber}
                        </span>
                      )}

                      {/* Exact Scripture Verse Text */}
                      <div className="flex-1">
                        <span className="text-[#EDE8DF]">{verse.text}</span>

                        {/* User Annotation Badges (Bookmarks, Notes, Favorites) */}
                        {(isBookmarked || isFav || note) && (
                          <span className="inline-flex items-center gap-1.5 ml-2 align-middle">
                            {isBookmarked && (
                              <Bookmark className="w-3.5 h-3.5 text-[#D4AF37] fill-current inline" />
                            )}
                            {isFav && (
                              <Heart className="w-3.5 h-3.5 text-rose-400 fill-current inline" />
                            )}
                            {note && (
                              <span
                                title={`Note: ${note.noteText}`}
                                className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-[#C5A059]/20 text-[#D4AF37] border border-[#C5A059]/30"
                              >
                                <FileText className="w-2.5 h-2.5" />
                                <span>Note</span>
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* Chapter Bottom Navigation (Section 23) */}
        {!isLoadingChapter && chapterData && chapterData.verses.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[#252834] flex items-center justify-between gap-3">
            <button
              onClick={prevChapter}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181A22] hover:bg-[#202430] border border-[#2B2F3D] text-xs font-semibold text-[#EDE8DF] transition active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentLanguage === 'ta' ? 'முந்தைய அதிகாரம்' : 'Previous Chapter'}</span>
            </button>

            <button
              onClick={nextChapter}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-xs font-semibold text-[#121316] shadow-md transition active:scale-95"
            >
              <span>{currentLanguage === 'ta' ? 'அடுத்த அதிகாரம்' : 'Next Chapter'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Chapter Selector Modal */}
      <ChapterSelectorModal
        isOpen={isChapterSelectorOpen}
        onClose={() => setIsChapterSelectorOpen(false)}
      />

      {/* Reading Settings Drawer */}
      <ReadingSettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Verse Action Sheet (Section 9) */}
      {selectedVerse && (
        <VerseActionSheet
          isOpen={isActionSheetOpen}
          onClose={() => setIsActionSheetOpen(false)}
          bookId={currentBookId}
          bookName={bookName}
          chapterNumber={currentChapterNumber}
          verseNumber={selectedVerse.verseNumber}
          verseText={selectedVerse.text}
          onOpenNote={() => setIsNoteModalOpen(true)}
        />
      )}

      {/* Note Editor Modal */}
      {selectedVerse && (
        <NoteModal
          isOpen={isNoteModalOpen}
          onClose={() => setIsNoteModalOpen(false)}
          bookId={currentBookId}
          bookName={bookName}
          chapterNumber={currentChapterNumber}
          verseNumber={selectedVerse.verseNumber}
          verseText={selectedVerse.text}
        />
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useBible } from '../context/BibleContext';
import { BibleService } from '../services/bibleService';
import { ShareVerseModal } from './ShareVerseModal';
import {
  Sparkles,
  Shuffle,
  BookOpen,
  Bookmark,
  Heart,
  Copy,
  Share2,
  Check,
} from 'lucide-react';

interface VerseData {
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
}

export const VerseOfTheDay: React.FC = () => {
  const {
    currentLanguage,
    currentVersionId,
    goToScripture,
    isVerseBookmarked,
    addBookmark,
    removeBookmark,
    isVerseFavorite,
    toggleFavorite,
  } = useBible();

  const [verse, setVerse] = useState<VerseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Initial load
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    BibleService.getDailyVerse(currentVersionId, currentLanguage).then((res) => {
      if (isMounted) {
        setVerse(res);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currentVersionId, currentLanguage]);

  // Fetch another random inspiring verse
  const handleFetchRandomVerse = async () => {
    setIsShuffling(true);
    setIsLoading(true);

    const res = await BibleService.getRandomInspiringVerse(
      currentVersionId,
      currentLanguage,
      verse
        ? {
            bookId: verse.bookId,
            chapterNumber: verse.chapterNumber,
            verseNumber: verse.verseNumber,
          }
        : undefined
    );

    if (res) {
      setVerse(res);
    }
    setIsLoading(false);
    setTimeout(() => setIsShuffling(false), 500);
  };

  // Quick 1-tap Copy
  const handleQuickCopy = async () => {
    if (!verse) return;
    const textToCopy = `“${verse.text}”\n— ${verse.bookName} ${verse.chapterNumber}:${verse.verseNumber} (SVS Bible)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Trigger Share (opens Share Modal with Web Share API and Clipboard options)
  const handleOpenShare = () => {
    if (!verse) return;
    setIsShareModalOpen(true);
  };

  const isBookmarked = verse
    ? isVerseBookmarked(verse.bookId, verse.chapterNumber, verse.verseNumber)
    : false;

  const isFav = verse
    ? isVerseFavorite(verse.bookId, verse.chapterNumber, verse.verseNumber)
    : false;

  const handleBookmarkToggle = async () => {
    if (!verse) return;
    const id = `${currentVersionId}_${verse.bookId}_${verse.chapterNumber}_${verse.verseNumber}`;
    if (isBookmarked) {
      await removeBookmark(id);
    } else {
      await addBookmark(
        verse.bookId,
        verse.chapterNumber,
        verse.verseNumber,
        verse.text
      );
    }
  };

  const handleFavoriteToggle = async () => {
    if (!verse) return;
    await toggleFavorite(
      verse.bookId,
      verse.chapterNumber,
      verse.verseNumber,
      verse.text
    );
  };

  if (!verse && !isLoading) return null;

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1F28] via-[#171920] to-[#121316] border border-[#C5A059]/40 p-5 sm:p-7 shadow-xl">
        {/* Decorative Golden Aura Glow */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-[#252834]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#D4AF37]">
                {currentLanguage === 'ta' ? 'இன்றைய வேத வசனம்' : 'Verse of the Day'}
              </span>
            </div>
          </div>

          {/* Shuffle / Random Button */}
          <button
            onClick={handleFetchRandomVerse}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222530] hover:bg-[#2C3040] text-xs font-medium text-[#EDE8DF] border border-[#2F3444] transition active:scale-95 disabled:opacity-50"
            title={currentLanguage === 'ta' ? 'மற்றொரு வசனத்தைப் பெற' : 'Inspire with another verse'}
          >
            <Shuffle className={`w-3.5 h-3.5 text-[#D4AF37] ${isShuffling ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {currentLanguage === 'ta' ? 'மற்றொரு வசனம்' : 'New Verse'}
            </span>
          </button>
        </div>

        {/* Verse Content */}
        <div className="relative z-10 py-5">
          {isLoading ? (
            <div className="py-6 flex flex-col items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
              <span className="text-xs text-[#8C877D]">
                {currentLanguage === 'ta' ? 'வசனம் ஏற்றப்படுகிறது...' : 'Loading Scripture...'}
              </span>
            </div>
          ) : verse ? (
            <div className="space-y-3">
              {/* Quotation typography */}
              <blockquote
                className={`text-base sm:text-xl leading-relaxed text-[#EDE8DF] font-serif-reading transition-opacity duration-300 ${
                  currentLanguage === 'ta' ? 'font-tamil' : ''
                }`}
              >
                “{verse.text}”
              </blockquote>

              {/* Scripture Reference Tag */}
              <div className="pt-1 flex items-center gap-2">
                <span className="font-semibold text-sm sm:text-base text-[#D4AF37] font-cinzel tracking-wide">
                  {verse.bookName} {verse.chapterNumber}:{verse.verseNumber}
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#222530] text-[#A9A397] border border-[#2F3444]">
                  {currentVersionId === 'en-kjv' ? 'KJV' : 'TAM'}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Card Action Bar */}
        {verse && !isLoading && (
          <div className="relative z-10 pt-3.5 border-t border-[#252834] flex flex-wrap items-center justify-between gap-2.5">
            {/* Read in Context Link */}
            <button
              onClick={() =>
                goToScripture(
                  verse.bookId,
                  verse.chapterNumber,
                  verse.verseNumber
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold transition active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'ta' ? 'முழு அதிகாரத்தை வாசிக்க' : 'Read Chapter'}</span>
            </button>

            {/* Quick Actions (Bookmark, Favorite, Copy, Share) */}
            <div className="flex items-center gap-1.5 ml-auto">
              {/* Bookmark */}
              <button
                onClick={handleBookmarkToggle}
                className={`p-2 rounded-lg border transition active:scale-95 ${
                  isBookmarked
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40'
                    : 'bg-[#181A22] text-[#A9A397] border-[#2B2F3D] hover:text-[#EDE8DF]'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Verse'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Favorite */}
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-lg border transition active:scale-95 ${
                  isFav
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-[#181A22] text-[#A9A397] border-[#2B2F3D] hover:text-[#EDE8DF]'
                }`}
                title={isFav ? 'Remove Favorite' : 'Favorite Verse'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
              </button>

              {/* Quick Copy */}
              <button
                onClick={handleQuickCopy}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#181A22] hover:bg-[#222530] text-[#A9A397] hover:text-[#EDE8DF] border border-[#2B2F3D] text-xs font-medium transition active:scale-95"
                title="Copy Verse Text"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>

              {/* Share Feature (Triggers Web Share API / Share Modal) */}
              <button
                onClick={handleOpenShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] text-xs font-semibold shadow transition active:scale-95"
                title="Share Verse"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Share Verse Modal Dialog */}
      {verse && (
        <ShareVerseModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          verse={verse}
          language={currentLanguage}
        />
      )}
    </>
  );
};

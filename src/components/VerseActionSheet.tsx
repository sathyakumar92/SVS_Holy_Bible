import React, { useState } from 'react';
import { useBible } from '../context/BibleContext';
import { HighlightColor } from '../types/bible';
import {
  Bookmark,
  Heart,
  FileText,
  Copy,
  Share2,
  X,
  Check,
} from 'lucide-react';

interface VerseActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  onOpenNote: () => void;
}

export const VerseActionSheet: React.FC<VerseActionSheetProps> = ({
  isOpen,
  onClose,
  bookId,
  bookName,
  chapterNumber,
  verseNumber,
  verseText,
  onOpenNote,
}) => {
  const {
    isVerseBookmarked,
    addBookmark,
    removeBookmark,
    isVerseFavorite,
    toggleFavorite,
    getVerseHighlight,
    setVerseHighlight,
    removeVerseHighlight,
    currentVersionId,
  } = useBible();

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  if (!isOpen) return null;

  const isBookmarked = isVerseBookmarked(bookId, chapterNumber, verseNumber);
  const isFav = isVerseFavorite(bookId, chapterNumber, verseNumber);
  const currentHighlight = getVerseHighlight(bookId, chapterNumber, verseNumber);

  const colors: { id: HighlightColor; hex: string; name: string }[] = [
    { id: 'gold', hex: '#E5C158', name: 'Gold' },
    { id: 'amber', hex: '#F59E0B', name: 'Amber' },
    { id: 'emerald', hex: '#10B981', name: 'Emerald' },
    { id: 'sky', hex: '#38BDF8', name: 'Sky' },
    { id: 'rose', hex: '#F43F5E', name: 'Rose' },
  ];

  const handleCopy = async () => {
    // Section 21: Exactly reference and exact text
    const textToCopy = `${bookName} ${chapterNumber}:${verseNumber}\n${verseText}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    // Section 22: Native Web Share API with SVS Bible branding
    const shareData = {
      title: `${bookName} ${chapterNumber}:${verseNumber} · SVS Bible`,
      text: `“${verseText}”\n— ${bookName} ${chapterNumber}:${verseNumber} (SVS Bible)`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: Copy to clipboard
      await handleCopy();
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleBookmarkToggle = async () => {
    if (isBookmarked) {
      const id = `${currentVersionId}_${bookId}_${chapterNumber}_${verseNumber}`;
      await removeBookmark(id);
    } else {
      await addBookmark(bookId, chapterNumber, verseNumber, verseText);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-[#1A1C22] border-t sm:border border-[#2E3340] p-5 shadow-2xl text-[#EDE8DF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Reference */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252834]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-[#D4AF37]">
              {bookName} {chapterNumber}:{verseNumber}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#A9A397] hover:text-[#EDE8DF] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verse preview */}
        <p className="mt-3 text-xs text-[#A9A397] italic line-clamp-3 leading-relaxed">
          "{verseText}"
        </p>

        {/* Highlight Colors (Section 18) */}
        <div className="mt-4 pt-3 border-t border-[#252834]">
          <label className="text-[11px] font-semibold text-[#8C877D] uppercase tracking-wider block mb-2">
            Highlight Color
          </label>
          <div className="flex items-center gap-3">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() =>
                  currentHighlight === c.id
                    ? removeVerseHighlight(bookId, chapterNumber, verseNumber)
                    : setVerseHighlight(bookId, chapterNumber, verseNumber, c.id, verseText)
                }
                style={{ backgroundColor: c.hex }}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                  currentHighlight === c.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1A1C22]' : 'opacity-85 hover:opacity-100'
                }`}
                title={c.name}
              >
                {currentHighlight === c.id && <Check className="w-3.5 h-3.5 text-black" />}
              </button>
            ))}

            {currentHighlight && (
              <button
                onClick={() => removeVerseHighlight(bookId, chapterNumber, verseNumber)}
                className="px-2 py-1 text-[11px] text-[#A9A397] hover:text-white rounded bg-[#252835] transition"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Primary Actions Grid */}
        <div className="mt-5 grid grid-cols-4 gap-2 pt-3 border-t border-[#252834]">
          {/* Bookmark */}
          <button
            onClick={handleBookmarkToggle}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-xs transition active:scale-95 ${
              isBookmarked
                ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                : 'bg-[#15171D] text-[#A9A397] hover:text-[#EDE8DF]'
            }`}
          >
            <Bookmark className={`w-4 h-4 mb-1 ${isBookmarked ? 'fill-current' : ''}`} />
            <span className="text-[10px]">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(bookId, chapterNumber, verseNumber, verseText)}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-xs transition active:scale-95 ${
              isFav
                ? 'bg-rose-500/20 text-rose-400'
                : 'bg-[#15171D] text-[#A9A397] hover:text-[#EDE8DF]'
            }`}
          >
            <Heart className={`w-4 h-4 mb-1 ${isFav ? 'fill-current' : ''}`} />
            <span className="text-[10px]">{isFav ? 'Favorited' : 'Favorite'}</span>
          </button>

          {/* Add Note */}
          <button
            onClick={() => {
              onClose();
              onOpenNote();
            }}
            className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-xs bg-[#15171D] text-[#A9A397] hover:text-[#EDE8DF] transition active:scale-95"
          >
            <FileText className="w-4 h-4 mb-1 text-[#C5A059]" />
            <span className="text-[10px]">Add Note</span>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-xs bg-[#15171D] text-[#A9A397] hover:text-[#EDE8DF] transition active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mb-1 text-emerald-400" />
                <span className="text-[10px] text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Share Button (Section 22) */}
        <div className="mt-3">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#232734] hover:bg-[#2C3142] text-xs font-semibold text-[#EDE8DF] transition active:scale-95"
          >
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <span>{shared ? 'Verse Shared / Copied!' : 'Share Verse'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

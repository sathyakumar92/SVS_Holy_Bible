import React, { useState } from 'react';
import { useBible } from '../context/BibleContext';
import {
  Bookmark,
  Highlighter,
  FileText,
  Heart,
  Trash2,
  ArrowRight,
  Search,
} from 'lucide-react';

export const SavedView: React.FC = () => {
  const {
    bookmarks,
    removeBookmark,
    highlights,
    removeVerseHighlight,
    notes,
    deleteNote,
    favorites,
    toggleFavorite,
    goToScripture,
    currentLanguage,
  } = useBible();

  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'highlights' | 'notes' | 'favorites'>('bookmarks');
  const [searchTerm, setSearchTerm] = useState('');

  const filterItems = <T extends { verseText?: string; noteText?: string; bookName?: string }>(items: T[]) => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        (item.verseText && item.verseText.toLowerCase().includes(term)) ||
        (item.noteText && item.noteText.toLowerCase().includes(term)) ||
        (item.bookName && item.bookName.toLowerCase().includes(term))
    );
  };

  const getHighlightColorBg = (color: string) => {
    switch (color) {
      case 'gold': return 'bg-[#D4AF37]';
      case 'amber': return 'bg-amber-500';
      case 'emerald': return 'bg-emerald-500';
      case 'sky': return 'bg-sky-500';
      case 'rose': return 'bg-rose-500';
      default: return 'bg-[#D4AF37]';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[#EDE8DF]">
          {currentLanguage === 'ta' ? 'சேமிக்கப்பட்டவை' : 'Saved Items'}
        </h2>
        <p className="text-xs text-[#A9A397]">
          {currentLanguage === 'ta'
            ? 'புத்தகக்குறிகள், வண்ணக் கோடுகள், குறிப்புகள் மற்றும் விருப்பமான வசனங்கள்'
            : 'Personal bookmarks, color highlights, study notes, and favorite verses'}
        </p>
      </div>

      {/* Segmented Sub Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#161820] border border-[#272B38] mb-5 text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('bookmarks')}
          className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'bookmarks'
              ? 'bg-[#D4AF37] text-[#121316] font-semibold'
              : 'text-[#A9A397] hover:text-[#EDE8DF]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Bookmarks</span>
          <span className="font-mono text-[10px]">({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('highlights')}
          className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'highlights'
              ? 'bg-[#D4AF37] text-[#121316] font-semibold'
              : 'text-[#A9A397] hover:text-[#EDE8DF]'
          }`}
        >
          <Highlighter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Highlights</span>
          <span className="font-mono text-[10px]">({highlights.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('notes')}
          className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'notes'
              ? 'bg-[#D4AF37] text-[#121316] font-semibold'
              : 'text-[#A9A397] hover:text-[#EDE8DF]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Notes</span>
          <span className="font-mono text-[10px]">({notes.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'favorites'
              ? 'bg-[#D4AF37] text-[#121316] font-semibold'
              : 'text-[#A9A397] hover:text-[#EDE8DF]'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Favorites</span>
          <span className="font-mono text-[10px]">({favorites.length})</span>
        </button>
      </div>

      {/* Filter inside saved items */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C877D]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter saved items..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#161820] border border-[#272B38] text-xs text-[#EDE8DF] placeholder-[#6E6A62] focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Bookmarks List */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-3">
          {filterItems(bookmarks).map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-xl bg-[#181B22] border border-[#272B38] hover:border-[#C5A059]/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-xs text-[#D4AF37]">
                  {b.bookName} {b.chapterNumber}:{b.verseNumber}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToScripture(b.bookId, b.chapterNumber, b.verseNumber)}
                    className="p-1.5 text-xs text-[#A9A397] hover:text-[#EDE8DF] flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeBookmark(b.id)}
                    className="p-1.5 text-xs text-rose-400 hover:text-rose-300"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#EDE8DF] italic leading-relaxed line-clamp-2">
                "{b.verseText}"
              </p>
            </div>
          ))}

          {bookmarks.length === 0 && (
            <div className="py-16 text-center text-[#8C877D] text-xs">
              No bookmarks saved yet. Tap any verse while reading to bookmark it.
            </div>
          )}
        </div>
      )}

      {/* Highlights List */}
      {activeSubTab === 'highlights' && (
        <div className="space-y-3">
          {filterItems(highlights).map((h) => (
            <div
              key={h.id}
              className="p-4 rounded-xl bg-[#181B22] border border-[#272B38] hover:border-[#C5A059]/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getHighlightColorBg(h.color)}`} />
                  <span className="font-semibold text-xs text-[#D4AF37]">
                    {h.bookName} {h.chapterNumber}:{h.verseNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToScripture(h.bookId, h.chapterNumber, h.verseNumber)}
                    className="p-1.5 text-xs text-[#A9A397] hover:text-[#EDE8DF] flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeVerseHighlight(h.bookId, h.chapterNumber, h.verseNumber)}
                    className="p-1.5 text-xs text-rose-400 hover:text-rose-300"
                    title="Remove Highlight"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#EDE8DF] italic leading-relaxed line-clamp-2">
                "{h.verseText}"
              </p>
            </div>
          ))}

          {highlights.length === 0 && (
            <div className="py-16 text-center text-[#8C877D] text-xs">
              No highlights yet. Tap any verse while reading and select a color.
            </div>
          )}
        </div>
      )}

      {/* Notes List */}
      {activeSubTab === 'notes' && (
        <div className="space-y-3">
          {filterItems(notes).map((n) => (
            <div
              key={n.id}
              className="p-4 rounded-xl bg-[#181B22] border border-[#272B38] hover:border-[#C5A059]/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-xs text-[#D4AF37]">
                  {n.bookName} {n.chapterNumber}:{n.verseNumber}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToScripture(n.bookId, n.chapterNumber, n.verseNumber)}
                    className="p-1.5 text-xs text-[#A9A397] hover:text-[#EDE8DF] flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => deleteNote(n.id)}
                    className="p-1.5 text-xs text-rose-400 hover:text-rose-300"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <div className="p-2.5 rounded-lg bg-[#14161C] border border-[#252834] mb-2 text-xs text-[#EDE8DF] whitespace-pre-wrap">
                {n.noteText}
              </div>

              <p className="text-[11px] text-[#8C877D] italic line-clamp-1">
                Verse: "{n.verseText}"
              </p>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="py-16 text-center text-[#8C877D] text-xs">
              No study notes yet. Tap any verse to write personal reflections.
            </div>
          )}
        </div>
      )}

      {/* Favorites List */}
      {activeSubTab === 'favorites' && (
        <div className="space-y-3">
          {filterItems(favorites).map((f) => (
            <div
              key={f.id}
              className="p-4 rounded-xl bg-[#181B22] border border-[#272B38] hover:border-[#C5A059]/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-xs text-rose-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{f.bookName} {f.chapterNumber}:{f.verseNumber}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToScripture(f.bookId, f.chapterNumber, f.verseNumber)}
                    className="p-1.5 text-xs text-[#A9A397] hover:text-[#EDE8DF] flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(f.bookId, f.chapterNumber, f.verseNumber, f.verseText)}
                    className="p-1.5 text-xs text-rose-400 hover:text-rose-300"
                    title="Remove Favorite"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#EDE8DF] italic leading-relaxed line-clamp-2">
                "{f.verseText}"
              </p>
            </div>
          ))}

          {favorites.length === 0 && (
            <div className="py-16 text-center text-[#8C877D] text-xs">
              No favorite verses marked yet. Tap any verse to favorite it.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

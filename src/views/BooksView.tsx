import React, { useState } from 'react';
import { useBible } from '../context/BibleContext';
import {
  OLD_TESTAMENT_BOOKS,
  NEW_TESTAMENT_BOOKS,
  CANONICAL_BOOKS,
} from '../data/canonicalBooks';
import { ChapterSelectorModal } from '../components/ChapterSelectorModal';
import { BookOpen, Search } from 'lucide-react';

export const BooksView: React.FC = () => {
  const { currentLanguage, getBookProgress } = useBible();
  const [selectedTestament, setSelectedTestament] = useState<'ALL' | 'OT' | 'NT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalBookId, setActiveModalBookId] = useState<string | null>(null);

  const filterBooks = (books: typeof CANONICAL_BOOKS) => {
    if (!searchQuery.trim()) return books;
    const q = searchQuery.toLowerCase().trim();
    return books.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.tamilName.toLowerCase().includes(q) ||
        b.abbreviation.en.toLowerCase().includes(q) ||
        b.abbreviation.ta.toLowerCase().includes(q)
    );
  };

  const otFiltered = filterBooks(OLD_TESTAMENT_BOOKS);
  const ntFiltered = filterBooks(NEW_TESTAMENT_BOOKS);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[#EDE8DF]">
            {currentLanguage === 'ta' ? 'வேதாகம புத்தகங்கள்' : 'Bible Books'}
          </h2>
          <p className="text-xs text-[#A9A397]">
            {currentLanguage === 'ta'
              ? '66 அதிகாரப்பூர்வ வரலாற்றுப் புத்தகங்கள்'
              : '66 Canonical Books of the Protestant Old & New Testaments'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-[#171920] p-1 rounded-xl border border-[#272B38] self-start sm:self-auto text-xs">
          <button
            onClick={() => setSelectedTestament('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              selectedTestament === 'ALL'
                ? 'bg-[#D4AF37] text-[#121316] font-semibold'
                : 'text-[#A9A397] hover:text-[#EDE8DF]'
            }`}
          >
            {currentLanguage === 'ta' ? 'அனைத்தும் (66)' : 'All (66)'}
          </button>
          <button
            onClick={() => setSelectedTestament('OT')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              selectedTestament === 'OT'
                ? 'bg-[#D4AF37] text-[#121316] font-semibold'
                : 'text-[#A9A397] hover:text-[#EDE8DF]'
            }`}
          >
            {currentLanguage === 'ta' ? 'பழைய ஏற்பாடு (39)' : 'Old Testament (39)'}
          </button>
          <button
            onClick={() => setSelectedTestament('NT')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              selectedTestament === 'NT'
                ? 'bg-[#D4AF37] text-[#121316] font-semibold'
                : 'text-[#A9A397] hover:text-[#EDE8DF]'
            }`}
          >
            {currentLanguage === 'ta' ? 'புதிய ஏற்பாடு (27)' : 'New Testament (27)'}
          </button>
        </div>
      </div>

      {/* Quick Search in books */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C877D]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            currentLanguage === 'ta'
              ? 'புத்தகத்தின் பெயரைத் தேடுக (எ.கா: ஆதியாகமம், யோவான்)...'
              : 'Filter book name (e.g. Genesis, Psalms, John)...'
          }
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161820] border border-[#282B38] text-xs sm:text-sm text-[#EDE8DF] placeholder-[#6E6A62] focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Old Testament Section (Section 5) */}
      {(selectedTestament === 'ALL' || selectedTestament === 'OT') && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-[#252835]">
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-semibold text-sm tracking-wide text-[#D4AF37] uppercase">
              {currentLanguage === 'ta' ? '📖 பழைய ஏற்பாடு (Old Testament)' : '📖 Old Testament'}
            </h3>
            <span className="text-xs text-[#8C877D] ml-auto">
              {otFiltered.length} {currentLanguage === 'ta' ? 'புத்தகங்கள்' : 'books'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {otFiltered.map((book) => {
              const progressPercent = getBookProgress(book.bookId);
              const displayName = currentLanguage === 'ta' ? book.tamilName : book.name;
              const subName = currentLanguage === 'ta' ? book.name : book.tamilName;

              return (
                <button
                  key={book.bookId}
                  onClick={() => setActiveModalBookId(book.bookId)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#181A22] border border-[#262A37] hover:border-[#C5A059]/40 hover:bg-[#1E212B] text-left transition-all active:scale-98 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#212430] group-hover:bg-[#C5A059]/20 font-mono text-xs font-semibold text-[#D4AF37] flex items-center justify-center shrink-0">
                      {book.order}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#EDE8DF] group-hover:text-white">
                        {displayName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#8C877D]">
                        <span>{subName}</span>
                        <span>·</span>
                        <span>
                          {book.totalChapters} {currentLanguage === 'ta' ? 'அதிகாரங்கள்' : 'chs'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {progressPercent > 0 && (
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-[#D4AF37]">{progressPercent}%</span>
                      <div className="w-10 h-1 bg-[#232733] rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-[#D4AF37]"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* New Testament Section (Section 5) */}
      {(selectedTestament === 'ALL' || selectedTestament === 'NT') && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-[#252835]">
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-semibold text-sm tracking-wide text-[#D4AF37] uppercase">
              {currentLanguage === 'ta' ? '📖 புதிய ஏற்பாடு (New Testament)' : '📖 New Testament'}
            </h3>
            <span className="text-xs text-[#8C877D] ml-auto">
              {ntFiltered.length} {currentLanguage === 'ta' ? 'புத்தகங்கள்' : 'books'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {ntFiltered.map((book) => {
              const progressPercent = getBookProgress(book.bookId);
              const displayName = currentLanguage === 'ta' ? book.tamilName : book.name;
              const subName = currentLanguage === 'ta' ? book.name : book.tamilName;

              return (
                <button
                  key={book.bookId}
                  onClick={() => setActiveModalBookId(book.bookId)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#181A22] border border-[#262A37] hover:border-[#C5A059]/40 hover:bg-[#1E212B] text-left transition-all active:scale-98 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#212430] group-hover:bg-[#C5A059]/20 font-mono text-xs font-semibold text-[#D4AF37] flex items-center justify-center shrink-0">
                      {book.order}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#EDE8DF] group-hover:text-white">
                        {displayName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#8C877D]">
                        <span>{subName}</span>
                        <span>·</span>
                        <span>
                          {book.totalChapters} {currentLanguage === 'ta' ? 'அதிகாரங்கள்' : 'chs'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {progressPercent > 0 && (
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-[#D4AF37]">{progressPercent}%</span>
                      <div className="w-10 h-1 bg-[#232733] rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-[#D4AF37]"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Chapter Selector Modal */}
      {activeModalBookId && (
        <ChapterSelectorModal
          isOpen={true}
          onClose={() => setActiveModalBookId(null)}
          targetBookId={activeModalBookId}
        />
      )}
    </div>
  );
};

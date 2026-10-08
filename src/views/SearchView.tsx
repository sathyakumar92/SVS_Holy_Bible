import React, { useState, useEffect } from 'react';
import { useBible } from '../context/BibleContext';
import { BibleService } from '../services/bibleService';
import { SearchResult } from '../types/bible';
import { Search, Filter, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export const SearchView: React.FC = () => {
  const {
    currentLanguage,
    currentVersionId,
    currentBookId,
    goToScripture,
    setActiveTab,
  } = useBible();

  const [query, setQuery] = useState('');
  const [filterTestament, setFilterTestament] = useState<'ALL' | 'OT' | 'NT'>('ALL');
  const [onlyCurrentBook, setOnlyCurrentBook] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await BibleService.searchScripture(currentVersionId, currentLanguage, query, {
        filterTestament,
        filterBookId: onlyCurrentBook ? currentBookId : undefined,
        limit: 50,
      });
      setResults(res);
      setIsSearching(false);
      setHasSearched(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [query, filterTestament, onlyCurrentBook, currentVersionId, currentLanguage, currentBookId]);

  // Highlight matched term in text snippet
  const renderHighlightedText = (text: string, queryStr: string) => {
    if (!queryStr.trim()) return text;
    const parts = text.split(new RegExp(`(${queryStr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === queryStr.toLowerCase() ? (
        <mark key={i} className="bg-[#D4AF37]/35 text-[#FFFBE6] px-1 rounded font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const sampleSearches = currentLanguage === 'ta'
    ? ['அன்பு', 'வெளிச்சம்', 'யோவான் 3:16', 'சங்கீதம் 23', 'சமாதானம்', 'விசுவாசம்']
    : ['love', 'light', 'John 3:16', 'Psalms 23', 'peace', 'faith'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      {/* Title */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[#EDE8DF]">
            {currentLanguage === 'ta' ? 'வேதாகமத் தேடல்' : 'Bible Search'}
          </h2>
          <p className="text-xs text-[#A9A397]">
            {currentLanguage === 'ta'
              ? 'சொல், சொற்றொடர் அல்லது வேத வசன மேற்கோள் மூலம் தேடுக'
              : 'Search Scripture by word, phrase, or reference (e.g. John 3:16)'}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('topics')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1B1E28] hover:bg-[#252A38] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{currentLanguage === 'ta' ? 'வேதாகம தலைப்புத் தேடல்' : 'Search Bible Topics'}</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            currentLanguage === 'ta'
              ? 'தேட வேண்டியதை உள்ளிடுக (எ.கா: "அன்பு", "யோவான் 3:16")...'
              : 'Type words or reference (e.g. "love", "God is love", "John 3:16")...'
          }
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#181B22] border border-[#2B2F3D] text-sm text-[#EDE8DF] placeholder-[#6E6A62] focus:outline-none focus:border-[#D4AF37] shadow-inner"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#A9A397] hover:text-[#EDE8DF] px-2 py-0.5 rounded bg-[#252834]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search Filters (Section 16) */}
      <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
        <span className="text-[#8C877D] flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filters:
        </span>

        {/* Scope tabs */}
        <div className="flex items-center bg-[#181A22] p-0.5 rounded-lg border border-[#262A36]">
          {(['ALL', 'OT', 'NT'] as const).map((scope) => (
            <button
              key={scope}
              onClick={() => setFilterTestament(scope)}
              className={`px-2.5 py-1 rounded-md transition ${
                filterTestament === scope
                  ? 'bg-[#D4AF37] text-[#121316] font-semibold'
                  : 'text-[#A9A397] hover:text-[#EDE8DF]'
              }`}
            >
              {scope === 'ALL'
                ? currentLanguage === 'ta' ? 'அனைத்தும்' : 'All Bible'
                : scope === 'OT'
                ? currentLanguage === 'ta' ? 'பழைய ஏற்பாடு' : 'Old Testament'
                : currentLanguage === 'ta' ? 'புதிய ஏற்பாடு' : 'New Testament'}
            </button>
          ))}
        </div>

        {/* Current Book toggle */}
        <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181A22] border border-[#262A36] text-[#A9A397] cursor-pointer hover:text-[#EDE8DF]">
          <input
            type="checkbox"
            checked={onlyCurrentBook}
            onChange={(e) => setOnlyCurrentBook(e.target.checked)}
            className="w-3.5 h-3.5 accent-[#D4AF37] rounded"
          />
          <span>Only current book ({currentBookId})</span>
        </label>
      </div>

      {/* Quick Search Chips if empty query */}
      {!query && (
        <div className="p-5 rounded-2xl bg-[#161820] border border-[#262A36] mb-6">
          <span className="text-xs font-semibold text-[#8C877D] uppercase tracking-wider block mb-2.5">
            Suggested Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleSearches.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-3 py-1.5 rounded-xl bg-[#20232E] hover:bg-[#2A2E3D] border border-[#2D3242] text-xs text-[#EDE8DF] transition active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Header */}
      {hasSearched && (
        <div className="flex items-center justify-between pb-3 border-b border-[#252834] mb-4 text-xs text-[#8C877D]">
          <span>
            {isSearching ? (
              'Searching verified Scripture...'
            ) : (
              <>
                Found <strong className="text-[#D4AF37] font-mono">{results.length}</strong> matching verse{results.length === 1 ? '' : 's'}
              </>
            )}
          </span>
        </div>
      )}

      {/* Results List */}
      <div className="space-y-3">
        {results.map((res, index) => (
          <div
            key={`${res.bookId}_${res.chapterNumber}_${res.verseNumber}_${index}`}
            onClick={() => goToScripture(res.bookId, res.chapterNumber, res.verseNumber)}
            className="p-4 rounded-2xl bg-[#181B22] border border-[#262A36] hover:border-[#C5A059]/40 hover:bg-[#1E222C] transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs text-[#D4AF37]">
                {res.bookName} {res.chapterNumber}:{res.verseNumber}
              </span>
              <span className="text-xs text-[#8C877D] group-hover:text-[#EDE8DF] flex items-center gap-1 transition">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            <p
              className={`text-sm text-[#EDE8DF] leading-relaxed ${
                currentLanguage === 'ta' ? 'font-tamil' : ''
              }`}
            >
              {renderHighlightedText(res.text, query)}
            </p>
          </div>
        ))}

        {hasSearched && !isSearching && results.length === 0 && (
          <div className="py-16 text-center text-[#8C877D] space-y-2">
            <p className="text-sm">No matching verses found for "{query}".</p>
            <p className="text-xs text-[#6B665E]">
              Try searching for a different keyword or reference like "John 3:16" or "சங்கீதம் 23".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

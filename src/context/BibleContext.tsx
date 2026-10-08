import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  Bookmark,
  Favorite,
  Highlight,
  HighlightColor,
  Language,
  Note,
  ReadingHistoryItem,
  ReadingSettings,
} from '../types/bible';
import { CANONICAL_BOOKS, OLD_TESTAMENT_BOOKS, NEW_TESTAMENT_BOOKS, getBookMeta, getBookName } from '../data/canonicalBooks';
import { BibleService } from '../services/bibleService';
import {
  dbBookmarks,
  dbFavorites,
  dbHighlights,
  dbHistory,
  dbNotes,
  dbProgress,
  dbSettings,
  StoredBookProgress,
} from '../services/db';

interface BibleContextType {
  // Version & Language
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  currentVersionId: string;
  setVersionId: (id: string) => void;

  // Navigation State
  activeTab: 'home' | 'bible' | 'search' | 'saved' | 'settings' | 'reader' | 'plans' | 'admin' | 'quiz' | 'topics';
  setActiveTab: (tab: 'home' | 'bible' | 'search' | 'saved' | 'settings' | 'reader' | 'plans' | 'admin' | 'quiz' | 'topics') => void;
  currentBookId: string;
  currentChapterNumber: number;
  currentVerseNumber: number | null;
  setCurrentVerseNumber: (v: number | null) => void;
  goToScripture: (bookId: string, chapterNumber: number, verseNumber?: number) => void;
  nextChapter: () => void;
  prevChapter: () => void;

  // Reading Settings
  readingSettings: ReadingSettings;
  updateReadingSettings: (settings: Partial<ReadingSettings>) => void;

  // User Annotations (Separate from Scripture!)
  bookmarks: Bookmark[];
  addBookmark: (bookId: string, chapter: number, verse: number, verseText: string) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  isVerseBookmarked: (bookId: string, chapter: number, verse: number) => boolean;

  highlights: Highlight[];
  setVerseHighlight: (bookId: string, chapter: number, verse: number, color: HighlightColor, verseText: string) => Promise<void>;
  removeVerseHighlight: (bookId: string, chapter: number, verse: number) => Promise<void>;
  getVerseHighlight: (bookId: string, chapter: number, verse: number) => HighlightColor | null;

  notes: Note[];
  saveNote: (bookId: string, chapterNumber: number, verseNumber: number, noteText: string, verseText: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getVerseNote: (bookId: string, chapter: number, verse: number) => Note | undefined;

  favorites: Favorite[];
  toggleFavorite: (bookId: string, chapter: number, verse: number, verseText: string) => Promise<boolean>;
  isVerseFavorite: (bookId: string, chapter: number, verse: number) => boolean;

  history: ReadingHistoryItem[];
  clearHistory: () => Promise<void>;

  // Progress
  progress: StoredBookProgress[];
  markChapterRead: (bookId: string, chapterNumber: number) => Promise<void>;
  resetReadingProgress: () => Promise<void>;
  getBookProgress: (bookId: string) => number;
  overallProgressPercent: number;
  otProgressPercent: number;
  ntProgressPercent: number;

  // Continue Reading
  continueReadingLocation: {
    versionId: string;
    language: Language;
    bookId: string;
    bookName: string;
    chapterNumber: number;
    verseNumber?: number;
  };

  // State loading
  isLoading: boolean;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 18,
  lineHeight: 'comfortable',
  readingWidth: 'standard',
  theme: 'dark',
  fontFamily: 'sans',
  showVerseNumbers: true,
  continuousReading: false,
};

const BibleContext = createContext<BibleContextType | undefined>(undefined);

export const BibleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<Language>('en');
  const [currentVersionId, setCurrentVersionIdState] = useState<string>('en-kjv');
  const [activeTab, setActiveTab] = useState<'home' | 'bible' | 'search' | 'saved' | 'settings' | 'reader' | 'plans' | 'admin' | 'quiz' | 'topics'>('home');
  const [currentBookId, setCurrentBookId] = useState<string>('JHN');
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number>(3);
  const [currentVerseNumber, setCurrentVerseNumber] = useState<number | null>(null);

  const [readingSettings, setReadingSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);
  const [progress, setProgress] = useState<StoredBookProgress[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize data from IndexedDB
  useEffect(() => {
    async function init() {
      try {
        const [
          savedSettings,
          savedBookmarks,
          savedHighlights,
          savedNotes,
          savedFavorites,
          savedHistory,
          savedProgress,
          lastLoc,
        ] = await Promise.all([
          dbSettings.get<ReadingSettings>('readingSettings', DEFAULT_SETTINGS),
          dbBookmarks.getAll(),
          dbHighlights.getAll(),
          dbNotes.getAll(),
          dbFavorites.getAll(),
          dbHistory.getAll(),
          dbProgress.getAll(),
          dbSettings.get<{
            versionId: string;
            language: Language;
            bookId: string;
            chapterNumber: number;
          }>('lastLocation', {
            versionId: 'en-kjv',
            language: 'en',
            bookId: 'JHN',
            chapterNumber: 3,
          }),
        ]);

        if (savedSettings) setReadingSettings(savedSettings);
        setBookmarks(savedBookmarks);
        setHighlights(savedHighlights);
        setNotes(savedNotes);
        setFavorites(savedFavorites);
        setHistory(savedHistory);
        setProgress(savedProgress);

        if (lastLoc) {
          setCurrentLanguageState(lastLoc.language || 'en');
          setCurrentVersionIdState(lastLoc.versionId || 'en-kjv');
          setCurrentBookId(lastLoc.bookId || 'JHN');
          setCurrentChapterNumber(lastLoc.chapterNumber || 3);
        }
      } catch (err) {
        console.warn('Error loading initial data from IndexedDB:', err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  // Update theme class on root html / body
  useEffect(() => {
    const applyTheme = () => {
      const isDark =
        readingSettings.theme === 'dark' ||
        (readingSettings.theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('theme-light');
      }
    };

    applyTheme();

    if (readingSettings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [readingSettings.theme]);

  // Persist last location to IndexedDB whenever book/chapter/version/language changes
  useEffect(() => {
    if (!isLoading) {
      dbSettings.set('lastLocation', {
        versionId: currentVersionId,
        language: currentLanguage,
        bookId: currentBookId,
        chapterNumber: currentChapterNumber,
      });
    }
  }, [currentVersionId, currentLanguage, currentBookId, currentChapterNumber, isLoading]);

  // Language switcher that preserves current Book & Chapter
  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguageState(lang);
    const targetVer = BibleService.getVersionForLanguage(lang);
    setCurrentVersionIdState(targetVer);
  }, []);

  const setVersionId = useCallback((versionId: string) => {
    setCurrentVersionIdState(versionId);
    const meta = BibleService.getVersionMeta(versionId);
    if (meta) {
      setCurrentLanguageState(meta.language);
    }
  }, []);

  // Navigation handlers
  const goToScripture = useCallback(
    (bookId: string, chapterNumber: number, verseNumber?: number) => {
      setCurrentBookId(bookId.toUpperCase());
      setCurrentChapterNumber(chapterNumber);
      setCurrentVerseNumber(verseNumber ?? null);
      setActiveTab('reader');

      // Record in history
      const histItem: ReadingHistoryItem = {
        id: `${Date.now()}_${bookId}_${chapterNumber}`,
        versionId: currentVersionId,
        language: currentLanguage,
        bookId,
        bookName: getBookName(bookId, currentLanguage),
        chapterNumber,
        verseNumber,
        timestamp: Date.now(),
      };
      dbHistory.add(histItem).then(() => {
        setHistory((prev) => [histItem, ...prev.filter((h) => h.bookId !== bookId || h.chapterNumber !== chapterNumber)].slice(0, 50));
      });
    },
    [currentVersionId, currentLanguage]
  );

  const nextChapter = useCallback(() => {
    const meta = getBookMeta(currentBookId);
    if (!meta) return;

    if (currentChapterNumber < meta.totalChapters) {
      goToScripture(currentBookId, currentChapterNumber + 1);
    } else {
      // Go to next canonical book chapter 1
      const nextBook = CANONICAL_BOOKS.find((b) => b.order === meta.order + 1);
      if (nextBook) {
        goToScripture(nextBook.bookId, 1);
      }
    }
  }, [currentBookId, currentChapterNumber, goToScripture]);

  const prevChapter = useCallback(() => {
    const meta = getBookMeta(currentBookId);
    if (!meta) return;

    if (currentChapterNumber > 1) {
      goToScripture(currentBookId, currentChapterNumber - 1);
    } else {
      // Go to previous canonical book's last chapter
      const prevBook = CANONICAL_BOOKS.find((b) => b.order === meta.order - 1);
      if (prevBook) {
        goToScripture(prevBook.bookId, prevBook.totalChapters);
      }
    }
  }, [currentBookId, currentChapterNumber, goToScripture]);

  // Settings
  const updateReadingSettings = useCallback((newSettings: Partial<ReadingSettings>) => {
    setReadingSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      dbSettings.set('readingSettings', updated);
      return updated;
    });
  }, []);

  // Bookmarks
  const addBookmark = useCallback(
    async (bookId: string, chapter: number, verse: number, verseText: string) => {
      const id = `${currentVersionId}_${bookId}_${chapter}_${verse}`;
      const item: Bookmark = {
        id,
        versionId: currentVersionId,
        language: currentLanguage,
        bookId,
        bookName: getBookName(bookId, currentLanguage),
        chapterNumber: chapter,
        verseNumber: verse,
        verseText,
        createdAt: Date.now(),
      };
      await dbBookmarks.add(item);
      setBookmarks((prev) => [...prev.filter((b) => b.id !== id), item]);
    },
    [currentVersionId, currentLanguage]
  );

  const removeBookmark = useCallback(async (id: string) => {
    await dbBookmarks.remove(id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const isVerseBookmarked = useCallback(
    (bookId: string, chapter: number, verse: number) => {
      const id = `${currentVersionId}_${bookId}_${chapter}_${verse}`;
      return bookmarks.some((b) => b.id === id);
    },
    [currentVersionId, bookmarks]
  );

  // Highlights
  const setVerseHighlight = useCallback(
    async (
      bookId: string,
      chapter: number,
      verse: number,
      color: HighlightColor,
      verseText: string
    ) => {
      const id = `${currentVersionId}_${bookId}_${chapter}_${verse}`;
      const item: Highlight = {
        id,
        versionId: currentVersionId,
        language: currentLanguage,
        bookId,
        bookName: getBookName(bookId, currentLanguage),
        chapterNumber: chapter,
        verseNumber: verse,
        verseText,
        color,
        createdAt: Date.now(),
      };
      await dbHighlights.add(item);
      setHighlights((prev) => [...prev.filter((h) => h.id !== id), item]);
    },
    [currentVersionId, currentLanguage]
  );

  const removeVerseHighlight = useCallback(
    async (bookId: string, chapter: number, verse: number) => {
      const id = `${currentVersionId}_${bookId}_${chapter}_${verse}`;
      await dbHighlights.remove(id);
      setHighlights((prev) => prev.filter((h) => h.id !== id));
    },
    [currentVersionId]
  );

  const getVerseHighlight = useCallback(
    (bookId: string, chapter: number, verse: number): HighlightColor | null => {
      const id = `${currentVersionId}_${bookId}_${chapter}_${verse}`;
      const found = highlights.find((h) => h.id === id);
      return found ? found.color : null;
    },
    [currentVersionId, highlights]
  );

  // Notes
  const saveNote = useCallback(
    async (
      bookId: string,
      chapterNumber: number,
      verseNumber: number,
      noteText: string,
      verseText: string
    ) => {
      const id = `${currentVersionId}_${bookId}_${chapterNumber}_${verseNumber}`;
      const existing = notes.find((n) => n.id === id);
      const noteItem: Note = {
        id,
        versionId: currentVersionId,
        language: currentLanguage,
        bookId,
        bookName: getBookName(bookId, currentLanguage),
        chapterNumber,
        verseNumber,
        verseText,
        noteText,
        createdAt: existing ? existing.createdAt : Date.now(),
        updatedAt: Date.now(),
      };
      await dbNotes.save(noteItem);
      setNotes((prev) => [...prev.filter((n) => n.id !== id), noteItem]);
    },
    [currentVersionId, currentLanguage, notes]
  );

  const deleteNote = useCallback(async (id: string) => {
    await dbNotes.delete(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getVerseNote = useCallback(
    (bookId: string, chapter: number, verse: number) => {
      const id = `${currentVersionId}_${bookId}_${chapter}_${verse}`;
      return notes.find((n) => n.id === id);
    },
    [currentVersionId, notes]
  );

  // Favorites
  const toggleFavorite = useCallback(
    async (bookId: string, chapter: number, verse: number, verseText: string) => {
      const id = `${currentVersionId}_${bookId}_${chapter}_${verse}`;
      const exists = favorites.some((f) => f.id === id);
      if (exists) {
        await dbFavorites.remove(id);
        setFavorites((prev) => prev.filter((f) => f.id !== id));
        return false;
      } else {
        const item: Favorite = {
          id,
          versionId: currentVersionId,
          language: currentLanguage,
          bookId,
          bookName: getBookName(bookId, currentLanguage),
          chapterNumber: chapter,
          verseNumber: verse,
          verseText,
          createdAt: Date.now(),
        };
        await dbFavorites.add(item);
        setFavorites((prev) => [...prev, item]);
        return true;
      }
    },
    [currentVersionId, currentLanguage, favorites]
  );

  const isVerseFavorite = useCallback(
    (bookId: string, chapter: number, verse: number) => {
      const id = `${currentVersionId}_${bookId}_${chapter}_${verse}`;
      return favorites.some((f) => f.id === id);
    },
    [currentVersionId, favorites]
  );

  // History
  const clearHistory = useCallback(async () => {
    await dbHistory.clear();
    setHistory([]);
  }, []);

  // Reading progress
  const markChapterRead = useCallback(async (bookId: string, chapterNumber: number) => {
    await dbProgress.markChapterRead(bookId, chapterNumber);
    setProgress((prev) => {
      const found = prev.find((p) => p.bookId === bookId);
      if (found) {
        if (!found.readChapters.includes(chapterNumber)) {
          return prev.map((p) =>
            p.bookId === bookId
              ? { ...p, readChapters: [...p.readChapters, chapterNumber] }
              : p
          );
        }
        return prev;
      } else {
        return [...prev, { bookId, readChapters: [chapterNumber] }];
      }
    });
  }, []);

  const resetReadingProgress = useCallback(async () => {
    await dbProgress.reset();
    setProgress([]);
  }, []);

  const getBookProgress = useCallback(
    (bookId: string): number => {
      const meta = getBookMeta(bookId);
      if (!meta || meta.totalChapters === 0) return 0;
      const found = progress.find((p) => p.bookId === bookId);
      if (!found) return 0;
      return Math.min(100, Math.round((found.readChapters.length / meta.totalChapters) * 100));
    },
    [progress]
  );

  // Overall Bible, OT, NT progress
  const { overallProgressPercent, otProgressPercent, ntProgressPercent } = useMemo(() => {
    const totalBibleChapters = 1189; // 929 OT + 260 NT
    const totalOTChapters = 929;
    const totalNTChapters = 260;

    let totalRead = 0;
    let otRead = 0;
    let ntRead = 0;

    for (const p of progress) {
      const meta = getBookMeta(p.bookId);
      if (meta) {
        const count = p.readChapters.length;
        totalRead += count;
        if (meta.testament === 'OT') {
          otRead += count;
        } else {
          ntRead += count;
        }
      }
    }

    return {
      overallProgressPercent: Math.min(100, Math.round((totalRead / totalBibleChapters) * 100)),
      otProgressPercent: Math.min(100, Math.round((otRead / totalOTChapters) * 100)),
      ntProgressPercent: Math.min(100, Math.round((ntRead / totalNTChapters) * 100)),
    };
  }, [progress]);

  const continueReadingLocation = useMemo(
    () => ({
      versionId: currentVersionId,
      language: currentLanguage,
      bookId: currentBookId,
      bookName: getBookName(currentBookId, currentLanguage),
      chapterNumber: currentChapterNumber,
      verseNumber: currentVerseNumber || undefined,
    }),
    [currentVersionId, currentLanguage, currentBookId, currentChapterNumber, currentVerseNumber]
  );

  return (
    <BibleContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        currentVersionId,
        setVersionId,
        activeTab,
        setActiveTab,
        currentBookId,
        currentChapterNumber,
        currentVerseNumber,
        setCurrentVerseNumber,
        goToScripture,
        nextChapter,
        prevChapter,
        readingSettings,
        updateReadingSettings,
        bookmarks,
        addBookmark,
        removeBookmark,
        isVerseBookmarked,
        highlights,
        setVerseHighlight,
        removeVerseHighlight,
        getVerseHighlight,
        notes,
        saveNote,
        deleteNote,
        getVerseNote,
        favorites,
        toggleFavorite,
        isVerseFavorite,
        history,
        clearHistory,
        progress,
        markChapterRead,
        resetReadingProgress,
        getBookProgress,
        overallProgressPercent,
        otProgressPercent,
        ntProgressPercent,
        continueReadingLocation,
        isLoading,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
};

export const useBible = () => {
  const context = useContext(BibleContext);
  if (!context) {
    throw new Error('useBible must be used within a BibleProvider');
  }
  return context;
};

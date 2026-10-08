export type Testament = 'OT' | 'NT';
export type Language = 'en' | 'ta';

export interface BibleVersionMeta {
  versionId: string;
  name: string;
  language: Language;
  abbreviation: string;
  copyright: string;
  license: string;
  publisher: string;
  source: string;
  description?: string;
}

export interface CanonicalBookMeta {
  bookId: string;
  name: string;
  tamilName: string;
  testament: Testament;
  order: number;
  totalChapters: number;
  abbreviation: {
    en: string;
    ta: string;
  };
}

export interface Verse {
  verseNumber: number;
  text: string;
}

export interface Chapter {
  chapterNumber: number;
  verses: Verse[];
}

export interface BibleBook {
  bookId: string;
  name: string;
  localizedName: string;
  testament: Testament;
  order: number;
  chapters: Chapter[];
}

export interface BibleVersion extends BibleVersionMeta {
  books: BibleBook[];
}

export interface Bookmark {
  id: string;
  versionId: string;
  language: Language;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  createdAt: number;
}

export type HighlightColor = 'gold' | 'amber' | 'emerald' | 'sky' | 'rose';

export interface Highlight {
  id: string; // bookId_chapter_verse
  versionId: string;
  language: Language;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  color: HighlightColor;
  createdAt: number;
}

export interface Note {
  id: string;
  versionId: string;
  language: Language;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  noteText: string;
  createdAt: number;
  updatedAt: number;
}

export interface Favorite {
  id: string;
  versionId: string;
  language: Language;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  createdAt: number;
}

export interface ReadingHistoryItem {
  id: string;
  versionId: string;
  language: Language;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber?: number;
  timestamp: number;
}

export interface ReadingSettings {
  fontSize: number; // in pixels: 14, 16, 18, 20, 24, 28
  lineHeight: 'compact' | 'comfortable' | 'spacious';
  readingWidth: 'narrow' | 'standard' | 'wide';
  theme: 'dark' | 'light' | 'system';
  fontFamily: 'sans' | 'serif';
  showVerseNumbers: boolean;
  continuousReading: boolean;
}

export interface SearchResult {
  versionId: string;
  language: Language;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
  matchIndex?: number;
  matchLength?: number;
}

export interface ReadingPlanDay {
  day: number;
  title: string;
  readings: {
    bookId: string;
    bookName: string;
    chapterNumber: number;
  }[];
}

export interface ReadingPlan {
  id: string;
  title: string;
  tamilTitle: string;
  description: string;
  tamilDescription: string;
  durationDays: number;
  days: ReadingPlanDay[];
}

export interface UserPlanProgress {
  planId: string;
  startedAt: number;
  completedDays: number[];
  isPaused: boolean;
}

export interface UnifiedVerse {
  reference: string; // e.g. "GEN-001-001"
  bookId: string;
  testament: Testament;
  chapterNumber: number;
  verseNumber: number;
  englishText: string;
  tamilText: string;
}

export type QuizDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface QuizQuestion {
  id: string;
  difficulty: QuizDifficulty;
  testament: Testament;
  question: {
    en: string;
    ta: string;
  };
  options: {
    en: string[];
    ta: string[];
  };
  correctAnswerIndex: number; // 0, 1, 2, or 3
  reference: string; // e.g. "Genesis 1:1"
  tamilReference: string; // e.g. "ஆதியாகமம் 1:1"
  explanation: {
    en: string;
    ta: string;
  };
}

export interface ComprehensiveAuditReport {
  englishKjvStatus: 'PASSED' | 'FAILED';
  tamilBibleStatus: 'PASSED' | 'FAILED';
  oldTestamentStatus: '39/39 books ✓';
  newTestamentStatus: '27/27 books ✓';
  totalBooks: number;
  missingChapters: number;
  missingVerses: number;
  duplicateVerses: number;
  emptyVerses: number;
  spellingErrorsFixed: {
    item: string;
    original: string;
    corrected: string;
    reference: string;
  }[];
  quizQuestionsChecked: number;
  incorrectQuizQuestionsFixed: number;
  bibleReferencesChecked: number;
  searchStatus: 'PASSED' | 'FAILED';
  languageSwitchingStatus: 'PASSED' | 'FAILED';
  overallValidationStatus: 'PASSED' | 'FAILED';
  timestamp: number;
}

export interface ValidationCheck {

  name: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
}

export interface ValidationReport {
  isValid: boolean;
  versionId: string;
  name: string;
  language: string;
  totalBooks: number;
  totalChapters: number;
  totalVerses: number;
  checks: ValidationCheck[];
  errors: string[];
  warnings: string[];
}

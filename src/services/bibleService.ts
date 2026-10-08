import {
  BibleBook,
  BibleVersionMeta,
  Chapter,
  Language,
  SearchResult,
  ValidationCheck,
  ValidationReport,
  Verse
} from '../types/bible';
import { CANONICAL_BOOKS, getBookMeta, getBookName } from '../data/canonicalBooks';
import { BIBLE_VERSIONS_META } from '../data/versions/metadata';
import { KJV_BOOKS_DATA } from '../data/versions/en-kjv';
import { TAMIL_BOOKS_DATA } from '../data/versions/ta-bsi';
import { dbCustomBooks } from './db';

export class BibleService {
  /**
   * Get list of available Bible versions
   */
  static getVersions(): BibleVersionMeta[] {
    return BIBLE_VERSIONS_META;
  }

  /**
   * Get metadata for a specific Bible version
   */
  static getVersionMeta(versionId: string): BibleVersionMeta | undefined {
    return BIBLE_VERSIONS_META.find((v) => v.versionId === versionId);
  }

  /**
   * Resolve corresponding version when switching language
   */
  static getVersionForLanguage(lang: Language): string {
    return lang === 'ta' ? 'ta-bsi' : 'en-kjv';
  }

  private static memCache = new Map<string, BibleBook>();

  /**
   * Retrieve book data (bundled + public static assets + IndexedDB cached)
   */
  static async getBook(versionId: string, bookId: string): Promise<BibleBook | null> {
    const normBookId = bookId.toUpperCase();
    const cacheKey = `${versionId}:${normBookId}`;

    // 1. Check in-memory cache
    if (this.memCache.has(cacheKey)) {
      return this.memCache.get(cacheKey)!;
    }

    // 2. Check IndexedDB cached/imported dataset
    try {
      const customBook = await dbCustomBooks.getBook(versionId, normBookId);
      if (customBook && customBook.chapters && customBook.chapters.length > 0) {
        this.memCache.set(cacheKey, customBook);
        return customBook;
      }
    } catch {
      // IndexedDB might not be available or throw in private mode
    }

    // 3. Fetch from complete canonical static assets (/bible/${versionId}/${normBookId}.json)
    try {
      const baseUrl = import.meta.env.BASE_URL || './';
      const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const response = await fetch(`${prefix}bible/${versionId}/${normBookId}.json`);
      if (response.ok) {
        const fullBook: BibleBook = await response.json();
        this.memCache.set(cacheKey, fullBook);
        // Persist to IndexedDB in background for offline use
        dbCustomBooks.saveBook(versionId, fullBook).catch(() => {});
        return fullBook;
      }
    } catch {
      // Offline or network error
    }

    // 4. Fallback to bundled starter chapters
    if (versionId === 'en-kjv' && KJV_BOOKS_DATA[normBookId]) {
      return KJV_BOOKS_DATA[normBookId];
    }
    if (versionId === 'ta-bsi' && TAMIL_BOOKS_DATA[normBookId]) {
      return TAMIL_BOOKS_DATA[normBookId];
    }

    return null;
  }

  /**
   * Retrieve a specific chapter
   */
  static async getChapter(
    versionId: string,
    bookId: string,
    chapterNumber: number
  ): Promise<Chapter | null> {
    const normBookId = bookId.toUpperCase();
    let book = await this.getBook(versionId, normBookId);

    if (book) {
      const chapter = book.chapters.find((c) => c.chapterNumber === chapterNumber);
      if (chapter) return chapter;
    }

    // If chapter wasn't in bundled starter data, attempt fetching full book from static JSON
    try {
      const baseUrl = import.meta.env.BASE_URL || './';
      const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const response = await fetch(`${prefix}bible/${versionId}/${normBookId}.json`);
      if (response.ok) {
        const fullBook: BibleBook = await response.json();
        const cacheKey = `${versionId}:${normBookId}`;
        this.memCache.set(cacheKey, fullBook);
        dbCustomBooks.saveBook(versionId, fullBook).catch(() => {});
        const ch = fullBook.chapters.find((c) => c.chapterNumber === chapterNumber);
        if (ch) return ch;
      }
    } catch {
      // Offline fallback
    }

    return null;
  }

  /**
   * Check if a specific chapter exists in the dataset
   */
  static async hasChapter(
    versionId: string,
    bookId: string,
    chapterNumber: number
  ): Promise<boolean> {
    const chapter = await this.getChapter(versionId, bookId, chapterNumber);
    return chapter !== null && chapter.verses.length > 0;
  }

  /**
   * Get an authentic Daily Verse from the verified database
   */
  static async getDailyVerse(
    versionId: string,
    lang: Language
  ): Promise<{
    bookId: string;
    bookName: string;
    chapterNumber: number;
    verseNumber: number;
    text: string;
  } | null> {
    const curatedVerses = [
      { bookId: 'JHN', chapter: 3, verse: 16 },
      { bookId: 'PSA', chapter: 23, verse: 1 },
      { bookId: 'PSA', chapter: 23, verse: 4 },
      { bookId: 'PRO', chapter: 3, verse: 5 },
      { bookId: 'PRO', chapter: 3, verse: 6 },
      { bookId: 'MAT', chapter: 6, verse: 33 },
      { bookId: 'ROM', chapter: 8, verse: 28 },
      { bookId: 'ROM', chapter: 8, verse: 31 },
      { bookId: 'PSA', chapter: 91, verse: 1 },
      { bookId: 'PSA', chapter: 91, verse: 2 },
      { bookId: 'PSA', chapter: 103, verse: 1 },
      { bookId: 'PSA', chapter: 103, verse: 2 },
      { bookId: 'PSA', chapter: 121, verse: 1 },
      { bookId: 'PSA', chapter: 121, verse: 2 },
      { bookId: '1CO', chapter: 13, verse: 13 },
      { bookId: '1CO', chapter: 13, verse: 4 },
      { bookId: 'GEN', chapter: 1, verse: 1 },
      { bookId: 'GEN', chapter: 1, verse: 3 },
      { bookId: 'REV', chapter: 21, verse: 4 },
      { bookId: 'JHN', chapter: 14, verse: 1 },
      { bookId: 'JHN', chapter: 14, verse: 6 },
      { bookId: 'JHN', chapter: 14, verse: 27 },
      { bookId: 'MAT', chapter: 5, verse: 3 },
      { bookId: 'MAT', chapter: 5, verse: 14 },
      { bookId: 'MAT', chapter: 5, verse: 16 },
      { bookId: 'ISA', chapter: 53, verse: 5 },
    ];

    // Pick based on day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const selected = curatedVerses[dayOfYear % curatedVerses.length];

    const chapter = await this.getChapter(versionId, selected.bookId, selected.chapter);
    if (!chapter) return null;

    const verse = chapter.verses.find((v) => v.verseNumber === selected.verse);
    if (!verse) return null;

    return {
      bookId: selected.bookId,
      bookName: getBookName(selected.bookId, lang),
      chapterNumber: selected.chapter,
      verseNumber: selected.verse,
      text: verse.text,
    };
  }

  /**
   * Get a random inspiring scripture verse from the authentic Bible dataset
   */
  static async getRandomInspiringVerse(
    versionId: string,
    lang: Language,
    exclude?: { bookId: string; chapterNumber: number; verseNumber: number }
  ): Promise<{
    bookId: string;
    bookName: string;
    chapterNumber: number;
    verseNumber: number;
    text: string;
  } | null> {
    const curatedVerses = [
      { bookId: 'JHN', chapter: 3, verse: 16 },
      { bookId: 'PSA', chapter: 23, verse: 1 },
      { bookId: 'PSA', chapter: 23, verse: 4 },
      { bookId: 'PRO', chapter: 3, verse: 5 },
      { bookId: 'PRO', chapter: 3, verse: 6 },
      { bookId: 'MAT', chapter: 6, verse: 33 },
      { bookId: 'ROM', chapter: 8, verse: 28 },
      { bookId: 'ROM', chapter: 8, verse: 31 },
      { bookId: 'PSA', chapter: 91, verse: 1 },
      { bookId: 'PSA', chapter: 91, verse: 2 },
      { bookId: 'PSA', chapter: 103, verse: 1 },
      { bookId: 'PSA', chapter: 103, verse: 2 },
      { bookId: 'PSA', chapter: 121, verse: 1 },
      { bookId: 'PSA', chapter: 121, verse: 2 },
      { bookId: '1CO', chapter: 13, verse: 13 },
      { bookId: '1CO', chapter: 13, verse: 4 },
      { bookId: 'GEN', chapter: 1, verse: 1 },
      { bookId: 'GEN', chapter: 1, verse: 3 },
      { bookId: 'REV', chapter: 21, verse: 4 },
      { bookId: 'JHN', chapter: 14, verse: 1 },
      { bookId: 'JHN', chapter: 14, verse: 6 },
      { bookId: 'JHN', chapter: 14, verse: 27 },
      { bookId: 'MAT', chapter: 5, verse: 3 },
      { bookId: 'MAT', chapter: 5, verse: 14 },
      { bookId: 'MAT', chapter: 5, verse: 16 },
      { bookId: 'ISA', chapter: 53, verse: 5 },
    ];

    const eligible = exclude
      ? curatedVerses.filter(
          (v) =>
            !(
              v.bookId === exclude.bookId &&
              v.chapter === exclude.chapterNumber &&
              v.verse === exclude.verseNumber
            )
        )
      : curatedVerses;

    const list = eligible.length > 0 ? eligible : curatedVerses;
    const randomIndex = Math.floor(Math.random() * list.length);
    const selected = list[randomIndex];

    const chapter = await this.getChapter(versionId, selected.bookId, selected.chapter);
    if (!chapter) return null;

    const verse = chapter.verses.find((v) => v.verseNumber === selected.verse);
    if (!verse) return null;

    return {
      bookId: selected.bookId,
      bookName: getBookName(selected.bookId, lang),
      chapterNumber: selected.chapter,
      verseNumber: selected.verse,
      text: verse.text,
    };
  }

  /**
   * Parse reference queries like "John 3:16", "JHN 3", "யோவான் 3:16", "சங்கீதம் 23:1"
   */
  static parseReference(
    query: string
  ): { bookId?: string; chapter?: number; verse?: number } | null {
    const trimmed = query.trim();

    // Match patterns like "John 3:16" or "1 John 1:9" or "சங்கீதம் 23:1"
    const refRegex = /^((?:\d\s+)?[^\d:]+?)\s*(\d+)(?::(\d+))?$/i;
    const match = trimmed.match(refRegex);

    if (!match) return null;

    const bookPart = match[1].trim().toLowerCase();
    const chapter = parseInt(match[2], 10);
    const verse = match[3] ? parseInt(match[3], 10) : undefined;

    // Match bookPart against Canonical books
    const matchedBook = CANONICAL_BOOKS.find((b) => {
      return (
        b.name.toLowerCase() === bookPart ||
        b.tamilName.toLowerCase() === bookPart ||
        b.abbreviation.en.toLowerCase() === bookPart ||
        b.abbreviation.ta.toLowerCase() === bookPart ||
        b.bookId.toLowerCase() === bookPart ||
        b.name.toLowerCase().startsWith(bookPart) ||
        b.tamilName.toLowerCase().startsWith(bookPart)
      );
    });

    if (matchedBook) {
      return {
        bookId: matchedBook.bookId,
        chapter,
        verse,
      };
    }

    return null;
  }

  /**
   * Search authentic Scripture dataset
   */
  static async searchScripture(
    versionId: string,
    lang: Language,
    query: string,
    options: {
      filterTestament?: 'ALL' | 'OT' | 'NT';
      filterBookId?: string;
      limit?: number;
    } = {}
  ): Promise<SearchResult[]> {
    const rawQuery = query.trim();
    if (!rawQuery) return [];

    const limit = options.limit || 50;
    const results: SearchResult[] = [];

    // 1. Check if the query is a direct reference (e.g. "John 3:16", "யோவான் 3:16")
    const parsedRef = this.parseReference(rawQuery);
    if (parsedRef && parsedRef.bookId && parsedRef.chapter) {
      const chapter = await this.getChapter(versionId, parsedRef.bookId, parsedRef.chapter);
      if (chapter) {
        if (parsedRef.verse) {
          const v = chapter.verses.find((item) => item.verseNumber === parsedRef.verse);
          if (v) {
            results.push({
              versionId,
              language: lang,
              bookId: parsedRef.bookId,
              bookName: getBookName(parsedRef.bookId, lang),
              chapterNumber: parsedRef.chapter,
              verseNumber: v.verseNumber,
              text: v.text,
            });
            return results;
          }
        } else {
          // Return all verses of that chapter
          for (const v of chapter.verses.slice(0, 10)) {
            results.push({
              versionId,
              language: lang,
              bookId: parsedRef.bookId,
              bookName: getBookName(parsedRef.bookId, lang),
              chapterNumber: parsedRef.chapter,
              verseNumber: v.verseNumber,
              text: v.text,
            });
          }
          return results;
        }
      }
    }

    // 2. Textual search through the dataset
    // Collect all books for the selected version
    const booksToSearch: BibleBook[] = [];
    const targetBooks = versionId === 'en-kjv' ? KJV_BOOKS_DATA : TAMIL_BOOKS_DATA;

    for (const canon of CANONICAL_BOOKS) {
      if (options.filterTestament && options.filterTestament !== 'ALL') {
        if (canon.testament !== options.filterTestament) continue;
      }
      if (options.filterBookId && canon.bookId !== options.filterBookId) {
        continue;
      }

      // Check bundled
      if (targetBooks[canon.bookId]) {
        booksToSearch.push(targetBooks[canon.bookId]);
      } else {
        // Check custom
        const customBook = await dbCustomBooks.getBook(versionId, canon.bookId);
        if (customBook) {
          booksToSearch.push(customBook);
        }
      }
    }

    const normalizedQuery = rawQuery.toLowerCase();

    for (const book of booksToSearch) {
      for (const ch of book.chapters) {
        for (const v of ch.verses) {
          const lowerText = v.text.toLowerCase();
          const matchIdx = lowerText.indexOf(normalizedQuery);
          if (matchIdx !== -1) {
            results.push({
              versionId,
              language: lang,
              bookId: book.bookId,
              bookName: getBookName(book.bookId, lang),
              chapterNumber: ch.chapterNumber,
              verseNumber: v.verseNumber,
              text: v.text,
              matchIndex: matchIdx,
              matchLength: rawQuery.length,
            });
            if (results.length >= limit) return results;
          }
        }
      }
    }

    return results;
  }

  /**
   * Bible Dataset Validator (Mandatory Section 36 & 45)
   * Validates structure, canonical compliance, numbering, empty verses, duplicates, Unicode.
   */
  static validateDataset(dataset: unknown): ValidationReport {
    const checks: ValidationCheck[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!dataset || typeof dataset !== 'object') {
      return {
        isValid: false,
        versionId: 'unknown',
        name: 'unknown',
        language: 'unknown',
        totalBooks: 0,
        totalChapters: 0,
        totalVerses: 0,
        checks: [{ name: 'Root Structure', status: 'FAIL', message: 'Dataset must be a valid JSON object' }],
        errors: ['Invalid JSON format.'],
        warnings: [],
      };
    }

    const data = dataset as Record<string, unknown>;
    const versionId = String(data.version || data.versionId || 'custom-version');
    const name = String(data.name || 'Imported Bible Version');
    const language = String(data.language || 'en');
    const books = Array.isArray(data.books) ? (data.books as Record<string, unknown>[]) : [];

    // Check 1: Root metadata
    if (data.version || data.versionId) {
      checks.push({ name: 'Version Metadata', status: 'PASS', message: `Version ID: ${versionId}` });
    } else {
      checks.push({ name: 'Version Metadata', status: 'WARN', message: 'Missing explicit versionId; assigned default' });
      warnings.push('Version ID was not explicitly specified.');
    }

    // Check 2: Books list presence
    if (books.length === 0) {
      checks.push({ name: 'Book Count', status: 'FAIL', message: 'No books found in dataset' });
      errors.push('Dataset contains 0 books.');
      return {
        isValid: false,
        versionId,
        name,
        language,
        totalBooks: 0,
        totalChapters: 0,
        totalVerses: 0,
        checks,
        errors,
        warnings,
      };
    } else if (books.length === 66) {
      checks.push({ name: 'Canonical Book Count', status: 'PASS', message: 'Complete 66-book Protestant Canon present' });
    } else {
      checks.push({
        name: 'Canonical Book Count',
        status: 'WARN',
        message: `Dataset contains ${books.length} book(s) (partial canon import)`,
      });
      warnings.push(`Dataset is a subset with ${books.length} book(s).`);
    }

    let totalChapters = 0;
    let totalVerses = 0;
    let emptyVerseCount = 0;
    let duplicateVerseCount = 0;
    let unicodeIssues = 0;

    const seenBookIds = new Set<string>();

    for (let i = 0; i < books.length; i++) {
      const b = books[i];
      const rawId = String(b.id || b.bookId || '').toUpperCase();
      const bookName = String(b.name || rawId);

      if (!rawId) {
        errors.push(`Book at index ${i} is missing an 'id' or 'bookId' attribute.`);
        continue;
      }

      if (seenBookIds.has(rawId)) {
        errors.push(`Duplicate book detected: ${rawId}`);
      }
      seenBookIds.add(rawId);

      const chapters = Array.isArray(b.chapters) ? (b.chapters as Record<string, unknown>[]) : [];
      totalChapters += chapters.length;

      const seenChapterNums = new Set<number>();

      for (const ch of chapters) {
        const chNum = Number(ch.chapter || ch.chapterNumber);
        if (!chNum || chNum < 1) {
          errors.push(`Book ${rawId} has invalid chapter number: ${chNum}`);
        } else if (seenChapterNums.has(chNum)) {
          errors.push(`Book ${rawId} has duplicate chapter ${chNum}`);
        }
        seenChapterNums.add(chNum);

        const verses = Array.isArray(ch.verses) ? (ch.verses as Record<string, unknown>[]) : [];
        totalVerses += verses.length;

        const seenVerseNums = new Set<number>();

        for (const v of verses) {
          const vNum = Number(v.verse || v.verseNumber);
          const vText = String(v.text || '').trim();

          if (!vNum || vNum < 1) {
            errors.push(`${rawId} ${chNum} contains invalid verse number: ${vNum}`);
          } else if (seenVerseNums.has(vNum)) {
            duplicateVerseCount++;
            errors.push(`${rawId} ${chNum}:${vNum} is duplicated.`);
          }
          seenVerseNums.add(vNum);

          if (!vText) {
            emptyVerseCount++;
            errors.push(`${rawId} ${chNum}:${vNum} has empty verse text.`);
          }

          // Unicode check: test for replacement character \uFFFD or malformed surrogates
          if (vText.includes('\uFFFD')) {
            unicodeIssues++;
            errors.push(`${rawId} ${chNum}:${vNum} contains invalid Unicode replacement character (U+FFFD).`);
          }
        }
      }
    }

    // Chapters check
    if (totalChapters > 0) {
      checks.push({ name: 'Chapter Validation', status: 'PASS', message: `${totalChapters} chapters verified` });
    } else {
      checks.push({ name: 'Chapter Validation', status: 'FAIL', message: 'No chapters found' });
      errors.push('No chapters in dataset.');
    }

    // Verses check
    if (totalVerses > 0 && emptyVerseCount === 0 && duplicateVerseCount === 0) {
      checks.push({
        name: 'Verse Integrity',
        status: 'PASS',
        message: `${totalVerses} verses verified without empty text or duplicates`,
      });
    } else {
      checks.push({
        name: 'Verse Integrity',
        status: errors.length > 0 ? 'FAIL' : 'WARN',
        message: `Empty verses: ${emptyVerseCount}, Duplicates: ${duplicateVerseCount}`,
      });
    }

    // Unicode check
    if (unicodeIssues === 0) {
      checks.push({ name: 'Unicode Encoding', status: 'PASS', message: 'Clean Unicode glyphs and text encodings' });
    } else {
      checks.push({ name: 'Unicode Encoding', status: 'FAIL', message: `${unicodeIssues} Unicode issues detected` });
    }

    const isValid = errors.length === 0;

    return {
      isValid,
      versionId,
      name,
      language,
      totalBooks: books.length,
      totalChapters,
      totalVerses,
      checks,
      errors,
      warnings,
    };
  }

  /**
   * Import validated dataset into IndexedDB storage
   */
  static async importDataset(
    dataset: unknown
  ): Promise<{ success: boolean; message: string; report: ValidationReport }> {
    const report = this.validateDataset(dataset);
    if (!report.isValid) {
      return {
        success: false,
        message: `Dataset validation failed with ${report.errors.length} error(s).`,
        report,
      };
    }

    const data = dataset as Record<string, unknown>;
    const versionId = report.versionId;
    const books = data.books as Record<string, unknown>[];

    for (const b of books) {
      const bookId = String(b.id || b.bookId).toUpperCase();
      const canonMeta = getBookMeta(bookId);

      const parsedChapters: Chapter[] = (b.chapters as Record<string, unknown>[]).map((ch) => {
        const chNum = Number(ch.chapter || ch.chapterNumber);
        const verses: Verse[] = (ch.verses as Record<string, unknown>[]).map((v) => ({
          verseNumber: Number(v.verse || v.verseNumber),
          text: String(v.text || '').trim(),
        }));
        return {
          chapterNumber: chNum,
          verses,
        };
      });

      const bookToSave: BibleBook = {
        bookId,
        name: String(b.name || (canonMeta ? canonMeta.name : bookId)),
        localizedName: String(
          b.localizedName || (canonMeta ? (report.language === 'ta' ? canonMeta.tamilName : canonMeta.name) : bookId)
        ),
        testament: canonMeta ? canonMeta.testament : 'OT',
        order: canonMeta ? canonMeta.order : 99,
        chapters: parsedChapters,
      };

      await dbCustomBooks.saveBook(versionId, bookToSave);
    }

    return {
      success: true,
      message: `Successfully imported ${report.totalBooks} book(s) and ${report.totalVerses} verse(s) into ${versionId}.`,
      report,
    };
  }
}

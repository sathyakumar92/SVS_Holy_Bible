import {
  Bookmark,
  Highlight,
  Note,
  Favorite,
  ReadingHistoryItem,
  ReadingSettings,
  UserPlanProgress,
  BibleBook
} from '../types/bible';

const DB_NAME = 'svs_bible_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('bookmarks')) {
        const store = db.createObjectStore('bookmarks', { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('bookId', 'bookId', { unique: false });
      }

      if (!db.objectStoreNames.contains('highlights')) {
        const store = db.createObjectStore('highlights', { keyPath: 'id' });
        store.createIndex('bookId', 'bookId', { unique: false });
      }

      if (!db.objectStoreNames.contains('notes')) {
        const store = db.createObjectStore('notes', { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('bookId', 'bookId', { unique: false });
      }

      if (!db.objectStoreNames.contains('favorites')) {
        const store = db.createObjectStore('favorites', { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }

      if (!db.objectStoreNames.contains('history')) {
        const store = db.createObjectStore('history', { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }

      if (!db.objectStoreNames.contains('readingProgress')) {
        db.createObjectStore('readingProgress', { keyPath: 'bookId' });
      }

      if (!db.objectStoreNames.contains('planProgress')) {
        db.createObjectStore('planProgress', { keyPath: 'planId' });
      }

      if (!db.objectStoreNames.contains('customBooks')) {
        // key format: `${versionId}_${bookId}`
        db.createObjectStore('customBooks', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

  return dbPromise;
}

// Generic transaction helpers
async function getAllFromStore<T>(storeName: string): Promise<T[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function putToStore<T>(storeName: string, item: T): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.put(item);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function deleteFromStore(storeName: string, key: IDBValidKey): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Bookmarks API
export const dbBookmarks = {
  getAll: () => getAllFromStore<Bookmark>('bookmarks'),
  add: (bookmark: Bookmark) => putToStore('bookmarks', bookmark),
  remove: (id: string) => deleteFromStore('bookmarks', id),
};

// Highlights API
export const dbHighlights = {
  getAll: () => getAllFromStore<Highlight>('highlights'),
  add: (highlight: Highlight) => putToStore('highlights', highlight),
  remove: (id: string) => deleteFromStore('highlights', id),
};

// Notes API
export const dbNotes = {
  getAll: () => getAllFromStore<Note>('notes'),
  save: (note: Note) => putToStore('notes', note),
  delete: (id: string) => deleteFromStore('notes', id),
};

// Favorites API
export const dbFavorites = {
  getAll: () => getAllFromStore<Favorite>('favorites'),
  add: (fav: Favorite) => putToStore('favorites', fav),
  remove: (id: string) => deleteFromStore('favorites', id),
};

// History API
export const dbHistory = {
  getAll: async (): Promise<ReadingHistoryItem[]> => {
    const items = await getAllFromStore<ReadingHistoryItem>('history');
    return items.sort((a, b) => b.timestamp - a.timestamp).slice(0, 50);
  },
  add: (item: ReadingHistoryItem) => putToStore('history', item),
  clear: async () => {
    const db = await getDB();
    const tx = db.transaction('history', 'readwrite');
    tx.objectStore('history').clear();
  },
};

// Reading Progress API
export interface StoredBookProgress {
  bookId: string;
  readChapters: number[];
}

export const dbProgress = {
  getAll: () => getAllFromStore<StoredBookProgress>('readingProgress'),
  markChapterRead: async (bookId: string, chapter: number) => {
    const db = await getDB();
    const tx = db.transaction('readingProgress', 'readwrite');
    const store = tx.objectStore('readingProgress');
    const getReq = store.get(bookId);

    getReq.onsuccess = () => {
      const current: StoredBookProgress = getReq.result || { bookId, readChapters: [] };
      if (!current.readChapters.includes(chapter)) {
        current.readChapters.push(chapter);
        store.put(current);
      }
    };
  },
  reset: async () => {
    const db = await getDB();
    const tx = db.transaction('readingProgress', 'readwrite');
    tx.objectStore('readingProgress').clear();
  },
};

// Plan Progress API
export const dbPlans = {
  getAll: () => getAllFromStore<UserPlanProgress>('planProgress'),
  save: (progress: UserPlanProgress) => putToStore('planProgress', progress),
};

// Custom / Imported Bible Books API
export interface CustomStoredBook {
  id: string; // `${versionId}_${bookId}`
  versionId: string;
  bookId: string;
  data: BibleBook;
}

export const dbCustomBooks = {
  getBook: async (versionId: string, bookId: string): Promise<BibleBook | null> => {
    try {
      const db = await getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('customBooks', 'readonly');
        const req = tx.objectStore('customBooks').get(`${versionId}_${bookId}`);
        req.onsuccess = () => {
          resolve(req.result ? req.result.data : null);
        };
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  },
  saveBook: async (versionId: string, book: BibleBook) => {
    await putToStore<CustomStoredBook>('customBooks', {
      id: `${versionId}_${book.bookId}`,
      versionId,
      bookId: book.bookId,
      data: book,
    });
  },
  getAllForVersion: async (versionId: string): Promise<BibleBook[]> => {
    const all = await getAllFromStore<CustomStoredBook>('customBooks');
    return all.filter((item) => item.versionId === versionId).map((item) => item.data);
  },
  clearVersion: async (versionId: string) => {
    const all = await getAllFromStore<CustomStoredBook>('customBooks');
    for (const item of all) {
      if (item.versionId === versionId) {
        await deleteFromStore('customBooks', item.id);
      }
    }
  },
};

// Settings & Last Position Storage
export const dbSettings = {
  get: async <T>(key: string, defaultValue: T): Promise<T> => {
    try {
      const db = await getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('settings', 'readonly');
        const req = tx.objectStore('settings').get(key);
        req.onsuccess = () => {
          if (req.result && req.result.value !== undefined) {
            resolve(req.result.value);
          } else {
            resolve(defaultValue);
          }
        };
        req.onerror = () => resolve(defaultValue);
      });
    } catch {
      return defaultValue;
    }
  },
  set: async <T>(key: string, value: T): Promise<void> => {
    try {
      await putToStore('settings', { key, value });
    } catch (e) {
      console.warn('Failed to save setting to IndexedDB:', e);
    }
  },
};

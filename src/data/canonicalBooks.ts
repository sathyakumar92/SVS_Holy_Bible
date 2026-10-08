import { CanonicalBookMeta } from '../types/bible';

export const CANONICAL_BOOKS: CanonicalBookMeta[] = [
  // OLD TESTAMENT (39 Books)
  { bookId: 'GEN', name: 'Genesis', tamilName: 'ஆதியாகமம்', testament: 'OT', order: 1, totalChapters: 50, abbreviation: { en: 'Gen', ta: 'ஆதி' } },
  { bookId: 'EXO', name: 'Exodus', tamilName: 'யாத்திராகமம்', testament: 'OT', order: 2, totalChapters: 40, abbreviation: { en: 'Exo', ta: 'யாத்' } },
  { bookId: 'LEV', name: 'Leviticus', tamilName: 'லேவியராகமம்', testament: 'OT', order: 3, totalChapters: 27, abbreviation: { en: 'Lev', ta: 'லேவி' } },
  { bookId: 'NUM', name: 'Numbers', tamilName: 'எண்ணாகமம்', testament: 'OT', order: 4, totalChapters: 36, abbreviation: { en: 'Num', ta: 'எண்' } },
  { bookId: 'DEU', name: 'Deuteronomy', tamilName: 'உபாகமம்', testament: 'OT', order: 5, totalChapters: 34, abbreviation: { en: 'Deu', ta: 'உபா' } },
  { bookId: 'JOS', name: 'Joshua', tamilName: 'யோசுவா', testament: 'OT', order: 6, totalChapters: 24, abbreviation: { en: 'Jos', ta: 'யோசு' } },
  { bookId: 'JDG', name: 'Judges', tamilName: 'நியாயாதிபதிகள்', testament: 'OT', order: 7, totalChapters: 21, abbreviation: { en: 'Jdg', ta: 'நியா' } },
  { bookId: 'RUT', name: 'Ruth', tamilName: 'ரூத்', testament: 'OT', order: 8, totalChapters: 4, abbreviation: { en: 'Rut', ta: 'ரூத்' } },
  { bookId: '1SA', name: '1 Samuel', tamilName: '1 சாமுவேல்', testament: 'OT', order: 9, totalChapters: 31, abbreviation: { en: '1Sam', ta: '1சாமு' } },
  { bookId: '2SA', name: '2 Samuel', tamilName: '2 சாமுவேல்', testament: 'OT', order: 10, totalChapters: 24, abbreviation: { en: '2Sam', ta: '2சாமு' } },
  { bookId: '1KI', name: '1 Kings', tamilName: '1 இராஜாக்கள்', testament: 'OT', order: 11, totalChapters: 22, abbreviation: { en: '1Kgs', ta: '1இரா' } },
  { bookId: '2KI', name: '2 Kings', tamilName: '2 இராஜாக்கள்', testament: 'OT', order: 12, totalChapters: 25, abbreviation: { en: '2Kgs', ta: '2இரா' } },
  { bookId: '1CH', name: '1 Chronicles', tamilName: '1 நாளாகமம்', testament: 'OT', order: 13, totalChapters: 29, abbreviation: { en: '1Chr', ta: '1நாளா' } },
  { bookId: '2CH', name: '2 Chronicles', tamilName: '2 நாளாகமம்', testament: 'OT', order: 14, totalChapters: 36, abbreviation: { en: '2Chr', ta: '2நாளா' } },
  { bookId: 'EZR', name: 'Ezra', tamilName: 'எஸ்றா', testament: 'OT', order: 15, totalChapters: 10, abbreviation: { en: 'Ezr', ta: 'எஸ்றா' } },
  { bookId: 'NEH', name: 'Nehemiah', tamilName: 'நெகேமியா', testament: 'OT', order: 16, totalChapters: 13, abbreviation: { en: 'Neh', ta: 'நெகே' } },
  { bookId: 'EST', name: 'Esther', tamilName: 'எஸ்தர்', testament: 'OT', order: 17, totalChapters: 10, abbreviation: { en: 'Est', ta: 'எஸ்த' } },
  { bookId: 'JOB', name: 'Job', tamilName: 'யோபு', testament: 'OT', order: 18, totalChapters: 42, abbreviation: { en: 'Job', ta: 'யோபு' } },
  { bookId: 'PSA', name: 'Psalms', tamilName: 'சங்கீதம்', testament: 'OT', order: 19, totalChapters: 150, abbreviation: { en: 'Psa', ta: 'சங்' } },
  { bookId: 'PRO', name: 'Proverbs', tamilName: 'நீதிமொழிகள்', testament: 'OT', order: 20, totalChapters: 31, abbreviation: { en: 'Pro', ta: 'நீதி' } },
  { bookId: 'ECC', name: 'Ecclesiastes', tamilName: 'பிரசங்கி', testament: 'OT', order: 21, totalChapters: 12, abbreviation: { en: 'Ecc', ta: 'பிரச' } },
  { bookId: 'SNG', name: 'Song of Solomon', tamilName: 'உன்னதப்பாட்டு', testament: 'OT', order: 22, totalChapters: 8, abbreviation: { en: 'Song', ta: 'உன்' } },
  { bookId: 'ISA', name: 'Isaiah', tamilName: 'ஏசாயா', testament: 'OT', order: 23, totalChapters: 66, abbreviation: { en: 'Isa', ta: 'ஏசா' } },
  { bookId: 'JER', name: 'Jeremiah', tamilName: 'எரேமியா', testament: 'OT', order: 24, totalChapters: 52, abbreviation: { en: 'Jer', ta: 'எரே' } },
  { bookId: 'LAM', name: 'Lamentations', tamilName: 'புலம்பல்', testament: 'OT', order: 25, totalChapters: 5, abbreviation: { en: 'Lam', ta: 'புல' } },
  { bookId: 'EZK', name: 'Ezekiel', tamilName: 'எசேக்கியேல்', testament: 'OT', order: 26, totalChapters: 48, abbreviation: { en: 'Ezk', ta: 'எசேக்' } },
  { bookId: 'DAN', name: 'Daniel', tamilName: 'தானியேல்', testament: 'OT', order: 27, totalChapters: 12, abbreviation: { en: 'Dan', ta: 'தானி' } },
  { bookId: 'HOS', name: 'Hosea', tamilName: 'ஓசியா', testament: 'OT', order: 28, totalChapters: 14, abbreviation: { en: 'Hos', ta: 'ஓசி' } },
  { bookId: 'JOL', name: 'Joel', tamilName: 'யோவேல்', testament: 'OT', order: 29, totalChapters: 3, abbreviation: { en: 'Jol', ta: 'யோவே' } },
  { bookId: 'AMO', name: 'Amos', tamilName: 'ஆமோஸ்', testament: 'OT', order: 30, totalChapters: 9, abbreviation: { en: 'Amo', ta: 'ஆமோ' } },
  { bookId: 'OBA', name: 'Obadiah', tamilName: 'ஒபதியா', testament: 'OT', order: 31, totalChapters: 1, abbreviation: { en: 'Oba', ta: 'ஒப' } },
  { bookId: 'JON', name: 'Jonah', tamilName: 'யோனா', testament: 'OT', order: 32, totalChapters: 4, abbreviation: { en: 'Jon', ta: 'யோனா' } },
  { bookId: 'MIC', name: 'Micah', tamilName: 'மீகா', testament: 'OT', order: 33, totalChapters: 7, abbreviation: { en: 'Mic', ta: 'மீகா' } },
  { bookId: 'NAM', name: 'Nahum', tamilName: 'நாகூம்', testament: 'OT', order: 34, totalChapters: 3, abbreviation: { en: 'Nah', ta: 'நாகூ' } },
  { bookId: 'HAB', name: 'Habakkuk', tamilName: 'ஆபகூக்', testament: 'OT', order: 35, totalChapters: 3, abbreviation: { en: 'Hab', ta: 'ஆப' } },
  { bookId: 'ZEP', name: 'Zephaniah', tamilName: 'செப்பனியா', testament: 'OT', order: 36, totalChapters: 3, abbreviation: { en: 'Zep', ta: 'செப்ப' } },
  { bookId: 'HAG', name: 'Haggai', tamilName: 'ஆகாய்', testament: 'OT', order: 37, totalChapters: 2, abbreviation: { en: 'Hag', ta: 'ஆகாய்' } },
  { bookId: 'ZEC', name: 'Zechariah', tamilName: 'சகரியா', testament: 'OT', order: 38, totalChapters: 14, abbreviation: { en: 'Zec', ta: 'சக' } },
  { bookId: 'MAL', name: 'Malachi', tamilName: 'மல்கியா', testament: 'OT', order: 39, totalChapters: 4, abbreviation: { en: 'Mal', ta: 'மல்' } },

  // NEW TESTAMENT (27 Books)
  { bookId: 'MAT', name: 'Matthew', tamilName: 'மத்தேயு', testament: 'NT', order: 40, totalChapters: 28, abbreviation: { en: 'Matt', ta: 'மத்' } },
  { bookId: 'MRK', name: 'Mark', tamilName: 'மாற்கு', testament: 'NT', order: 41, totalChapters: 16, abbreviation: { en: 'Mark', ta: 'மாற்' } },
  { bookId: 'LUK', name: 'Luke', tamilName: 'லூக்கா', testament: 'NT', order: 42, totalChapters: 24, abbreviation: { en: 'Luke', ta: 'லூக்' } },
  { bookId: 'JHN', name: 'John', tamilName: 'யோவான்', testament: 'NT', order: 43, totalChapters: 21, abbreviation: { en: 'John', ta: 'யோவா' } },
  { bookId: 'ACT', name: 'Acts', tamilName: 'அப்போஸ்தலர்', testament: 'NT', order: 44, totalChapters: 28, abbreviation: { en: 'Acts', ta: 'அப்' } },
  { bookId: 'ROM', name: 'Romans', tamilName: 'ரோமர்', testament: 'NT', order: 45, totalChapters: 16, abbreviation: { en: 'Rom', ta: 'ரோம' } },
  { bookId: '1CO', name: '1 Corinthians', tamilName: '1 கொரிந்தியர்', testament: 'NT', order: 46, totalChapters: 16, abbreviation: { en: '1Cor', ta: '1கொரி' } },
  { bookId: '2CO', name: '2 Corinthians', tamilName: '2 கொரிந்தியர்', testament: 'NT', order: 47, totalChapters: 13, abbreviation: { en: '2Cor', ta: '2கொரி' } },
  { bookId: 'GAL', name: 'Galatians', tamilName: 'கலாத்தியர்', testament: 'NT', order: 48, totalChapters: 6, abbreviation: { en: 'Gal', ta: 'கலா' } },
  { bookId: 'EPH', name: 'Ephesians', tamilName: 'எபேசியர்', testament: 'NT', order: 49, totalChapters: 6, abbreviation: { en: 'Eph', ta: 'எபே' } },
  { bookId: 'PHP', name: 'Philippians', tamilName: 'பிலிப்பியர்', testament: 'NT', order: 50, totalChapters: 4, abbreviation: { en: 'Phil', ta: 'பிலிப்' } },
  { bookId: 'COL', name: 'Colossians', tamilName: 'கொலோசெயர்', testament: 'NT', order: 51, totalChapters: 4, abbreviation: { en: 'Col', ta: 'கொலோ' } },
  { bookId: '1TH', name: '1 Thessalonians', tamilName: '1 தெசலோனிக்கேயர்', testament: 'NT', order: 52, totalChapters: 5, abbreviation: { en: '1Thess', ta: '1தெச' } },
  { bookId: '2TH', name: '2 Thessalonians', tamilName: '2 தெசலோனிக்கேயர்', testament: 'NT', order: 53, totalChapters: 3, abbreviation: { en: '2Thess', ta: '2தெச' } },
  { bookId: '1TI', name: '1 Timothy', tamilName: '1 தீமோத்தேயு', testament: 'NT', order: 54, totalChapters: 6, abbreviation: { en: '1Tim', ta: '1தீமோ' } },
  { bookId: '2TI', name: '2 Timothy', tamilName: '2 தீமோத்தேயு', testament: 'NT', order: 55, totalChapters: 4, abbreviation: { en: '2Tim', ta: '2தீமோ' } },
  { bookId: 'TIT', name: 'Titus', tamilName: 'தீத்து', testament: 'NT', order: 56, totalChapters: 3, abbreviation: { en: 'Tit', ta: 'தீத்து' } },
  { bookId: 'PHM', name: 'Philemon', tamilName: 'பிலேமோன்', testament: 'NT', order: 57, totalChapters: 1, abbreviation: { en: 'Phlm', ta: 'பிலே' } },
  { bookId: 'HEB', name: 'Hebrews', tamilName: 'எபிரெயர்', testament: 'NT', order: 58, totalChapters: 13, abbreviation: { en: 'Heb', ta: 'எபி' } },
  { bookId: 'JAS', name: 'James', tamilName: 'யாக்கோபு', testament: 'NT', order: 59, totalChapters: 5, abbreviation: { en: 'Jas', ta: 'யாக்' } },
  { bookId: '1PE', name: '1 Peter', tamilName: '1 பேதுரு', testament: 'NT', order: 60, totalChapters: 5, abbreviation: { en: '1Pet', ta: '1பேது' } },
  { bookId: '2PE', name: '2 Peter', tamilName: '2 பேதுரு', testament: 'NT', order: 61, totalChapters: 3, abbreviation: { en: '2Pet', ta: '2பேது' } },
  { bookId: '1JN', name: '1 John', tamilName: '1 யோவான்', testament: 'NT', order: 62, totalChapters: 5, abbreviation: { en: '1Jn', ta: '1யோவா' } },
  { bookId: '2JN', name: '2 John', tamilName: '2 யோவான்', testament: 'NT', order: 63, totalChapters: 1, abbreviation: { en: '2Jn', ta: '2யோவா' } },
  { bookId: '3JN', name: '3 John', tamilName: '3 யோவான்', testament: 'NT', order: 64, totalChapters: 1, abbreviation: { en: '3Jn', ta: '3யோவா' } },
  { bookId: 'JUD', name: 'Jude', tamilName: 'யூதா', testament: 'NT', order: 65, totalChapters: 1, abbreviation: { en: 'Jude', ta: 'யூதா' } },
  { bookId: 'REV', name: 'Revelation', tamilName: 'வெளிப்படுத்தின விசேஷம்', testament: 'NT', order: 66, totalChapters: 22, abbreviation: { en: 'Rev', ta: 'வெளி' } },
];

export const OLD_TESTAMENT_BOOKS = CANONICAL_BOOKS.filter(b => b.testament === 'OT');
export const NEW_TESTAMENT_BOOKS = CANONICAL_BOOKS.filter(b => b.testament === 'NT');

export const getBookMeta = (bookId: string): CanonicalBookMeta | undefined => {
  const normalized = bookId.toUpperCase();
  return CANONICAL_BOOKS.find(b => b.bookId === normalized);
};

export const getBookName = (bookId: string, lang: 'en' | 'ta'): string => {
  const meta = getBookMeta(bookId);
  if (!meta) return bookId;
  return lang === 'ta' ? meta.tamilName : meta.name;
};

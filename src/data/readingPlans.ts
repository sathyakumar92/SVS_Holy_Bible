import { ReadingPlan } from '../types/bible';

export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'gospels-30',
    title: 'The Gospels in 30 Days',
    tamilTitle: '30 நாட்களில் நற்செய்தி நூல்கள்',
    description: 'Walk with Jesus through Matthew, Mark, Luke, and John.',
    tamilDescription: 'மத்தேயு, மாற்கு, லூக்கா, யோவான் மூலம் இயேசுவின் வாழ்க்கையை வாசியுங்கள்.',
    durationDays: 30,
    days: [
      { day: 1, title: 'The Genealogies and Birth of Jesus', readings: [{ bookId: 'MAT', bookName: 'Matthew', chapterNumber: 1 }] },
      { day: 2, title: 'The Sermon on the Mount: Blessings', readings: [{ bookId: 'MAT', bookName: 'Matthew', chapterNumber: 5 }] },
      { day: 3, title: 'The Lord\'s Prayer & Seeking First God', readings: [{ bookId: 'MAT', bookName: 'Matthew', chapterNumber: 6 }] },
      { day: 4, title: 'Ask, Seek, Knock', readings: [{ bookId: 'MAT', bookName: 'Matthew', chapterNumber: 7 }] },
      { day: 5, title: 'In the Beginning was the Word', readings: [{ bookId: 'JHN', bookName: 'John', chapterNumber: 1 }] },
      { day: 6, title: 'Born Again & God\'s Great Love', readings: [{ bookId: 'JHN', bookName: 'John', chapterNumber: 3 }] },
      { day: 7, title: 'The Way, the Truth, and the Life', readings: [{ bookId: 'JHN', bookName: 'John', chapterNumber: 14 }] },
      { day: 8, title: 'The True Vine', readings: [{ bookId: 'JHN', bookName: 'John', chapterNumber: 15 }] },
    ],
  },
  {
    id: 'psalms-peace',
    title: 'Psalms of Comfort & Peace',
    tamilTitle: 'ஆறுதலும் அமைதியும் தரும் சங்கீதங்கள்',
    description: 'Timeless prayers of trust, protection, and gratitude in God.',
    tamilDescription: 'தேவனின் பாதுகாப்பு, நன்மைகள் மற்றும் ஆசீர்வாதங்களை போற்றும் பாடல்கள்.',
    durationDays: 14,
    days: [
      { day: 1, title: 'The Lord is My Shepherd', readings: [{ bookId: 'PSA', bookName: 'Psalms', chapterNumber: 23 }] },
      { day: 2, title: 'Under the Shadow of the Almighty', readings: [{ bookId: 'PSA', bookName: 'Psalms', chapterNumber: 91 }] },
      { day: 3, title: 'Bless the Lord, O My Soul', readings: [{ bookId: 'PSA', bookName: 'Psalms', chapterNumber: 103 }] },
      { day: 4, title: 'My Help Comes from the Lord', readings: [{ bookId: 'PSA', bookName: 'Psalms', chapterNumber: 121 }] },
      { day: 5, title: 'Trust in the Lord with All Thine Heart', readings: [{ bookId: 'PRO', bookName: 'Proverbs', chapterNumber: 3 }] },
    ],
  },
  {
    id: 'nt-foundations',
    title: 'New Testament Foundations',
    tamilTitle: 'புதிய ஏற்பாட்டின் அடிப்படைகள்',
    description: 'Foundations of Christian faith: Grace, Love, and Eternal Hope.',
    tamilDescription: 'கிறிஸ்தவ விசுவாசத்தின் அடித்தளங்கள்: கிருபை, அன்பு மற்றும் நித்திய ஜீவன்.',
    durationDays: 21,
    days: [
      { day: 1, title: 'Life in the Spirit', readings: [{ bookId: 'ROM', bookName: 'Romans', chapterNumber: 8 }] },
      { day: 2, title: 'The Greatest Gift: Love', readings: [{ bookId: '1CO', bookName: '1 Corinthians', chapterNumber: 13 }] },
      { day: 3, title: 'All Things New', readings: [{ bookId: 'REV', bookName: 'Revelation', chapterNumber: 21 }] },
      { day: 4, title: 'The River of Life and Final Blessing', readings: [{ bookId: 'REV', bookName: 'Revelation', chapterNumber: 22 }] },
    ],
  },
];

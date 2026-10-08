import { BibleVersionMeta } from '../../types/bible';

export const BIBLE_VERSIONS_META: BibleVersionMeta[] = [
  {
    versionId: 'en-kjv',
    name: 'King James Version (KJV)',
    language: 'en',
    abbreviation: 'KJV',
    copyright: 'Public Domain',
    license: 'Public Domain (historical 1769 Oxford/Cambridge text)',
    publisher: 'Historical Authorized Protestant Canon',
    source: 'Official Public Domain KJV Canon',
    description: 'The King James Version is the classic, authoritative English translation published in 1611 and standardized in 1769.',
  },
  {
    versionId: 'ta-bsi',
    name: 'பரிசுத்த வேதாகமம் (Tamil Bible)',
    language: 'ta',
    abbreviation: 'TAM',
    copyright: 'Public Domain',
    license: 'Public Domain (Historical Tamil Union / Fabricius 1858 translation)',
    publisher: 'Historical Tamil Protestant Canon',
    source: 'Standard Tamil Public Domain Scripture Text',
    description: 'பரிசுத்த வேதாகமம் - வரலாற்று ரீதியான தமிழ் வேதாகம மொழிபெயர்ப்பு, பரிசுத்த எழுத்துக்களின் அதிகாரப்பூர்வ தமிழ் வாசகம்.',
  },
];

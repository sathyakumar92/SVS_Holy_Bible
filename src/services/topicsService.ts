import { BibleTopic, TopicCategoryId, TopicCategoryMeta } from '../types/topics';
import { BIBLE_TOPICS, TOPIC_CATEGORIES } from '../data/topicsData';
import { Language } from '../types/bible';
import { BibleService } from './bibleService';

// Cross-language concept aliases mapping
const CONCEPT_SYNONYMS: Record<string, string[]> = {
  faith: [
    'faith', 'trust', 'believe', 'believing', 'confidence', 'assurance', 'fidelity', 'unseen',
    'விசுவாசம்', 'நம்பிக்கை', 'விசுவாசி', 'விசுவாசித்தல்', 'பக்தி', 'சார்ந்திருத்தல்'
  ],
  prayer: [
    'prayer', 'pray', 'praying', 'intercession', 'petition', 'supplication', 'crying out', 'kneeling', 'communion',
    'ஜெபம்', 'பிரார்த்தனை', 'விண்ணப்பம்', 'மன்றாட்டு', 'கூப்பிடுதல்', 'பரிந்துபேசுதல்', 'அழுது ஜெபித்தல்'
  ],
  love: [
    'love', 'loving', 'agape', 'charity', 'compassion', 'kindness', 'mercy', 'unconditional',
    'அன்பு', 'அன்புகூருதல்', 'இரக்கம்', 'தயவு', 'சிநேகம்', 'பாசம்', 'தேவ அன்பு'
  ],
  forgiveness: [
    'forgiveness', 'forgive', 'forgiving', 'pardon', 'reconciliation', 'remission', 'debt', 'cleansing',
    'மன்னிப்பு', 'மன்னித்தல்', 'குற்றநிவாரணம்', 'பாவமன்னிப்பு', 'ஒப்புரவாகுதல்'
  ],
  salvation: [
    'salvation', 'saved', 'save', 'redeemed', 'redemption', 'born again', 'justification', 'deliverance', 'atonement',
    'இரட்சிப்பு', 'மீட்பு', 'மறுபிறப்பு', 'இரட்சகர்', 'பாவ நிவாரணம்', 'நீதிமானாக்கப்படுதல்', 'விடுதலை'
  ],
  grace: [
    'grace', 'unmerited favor', 'mercy', 'gift', 'charis', 'freely', 'throne of grace',
    'கிருபை', 'இலவச ஈவு', 'இரக்கம்', 'தேவ கிருபை', 'கிருபாசனம்', 'தயை'
  ],
  holy_spirit: [
    'holy spirit', 'holy ghost', 'spirit', 'comforter', 'counselor', 'paraclete', 'anointing', 'pentecost',
    'பரிசுத்த ஆவியானவர்', 'பரிசுத்த ஆவி', 'தேற்றரவாளன்', 'சத்திய ஆவி', 'அபிஷேகம்', 'ஆவியின் கனி'
  ],
  jesus_christ: [
    'jesus', 'christ', 'jesus christ', 'messiah', 'son of god', 'savior', 'lord', 'lamb of god', 'king of kings', 'yeshua',
    'இயேசு', 'கிறிஸ்து', 'இயேசு கிறிஸ்து', 'மேசியா', 'தேவகுமாரன்', 'இரட்சகர்', 'ஆண்டவர்', 'ராஜா'
  ],
  god: [
    'god', 'lord', 'yahweh', 'jehovah', 'creator', 'almighty', 'father', 'sovereign', 'heavenly father',
    'தேவன்', 'கடவுள்', 'கர்த்தர்', 'யேகோவா', 'சிருஷ்டிகர்', 'சர்வவல்லவர்', 'பிதா', 'பரமபிதா'
  ],
  heaven: [
    'heaven', 'paradise', 'new jerusalem', 'eternal home', 'glory', 'mansions', 'celestial',
    'பரலோகம்', 'பரதீசு', 'புதிய எருசலேம்', 'நித்திய வீடு', 'மகிமை', 'ஜீவ நதி'
  ],
  hell: [
    'hell', 'lake of fire', 'gehenna', 'eternal punishment', 'hades', 'judgment', 'damnation', 'wrath',
    'நரகம்', 'அக்கினி கடல்', 'பாதாளம்', 'நித்திய ஆக்கினை', 'நியாயத்தீர்ப்பு', 'அக்கினி சூளை'
  ],
  angels: [
    'angels', 'angel', 'archangel', 'michael', 'gabriel', 'cherubim', 'seraphim', 'host of heaven',
    'தேவதூதர்கள்', 'தேவதூதன்', 'தூதர்கள்', 'மீகாவேல்', 'கேபிரியேல்', 'சேராபீன்கள்', 'கேரூபீன்கள்'
  ],
  healing: [
    'healing', 'healed', 'heal', 'cure', 'physician', 'restoration', 'stripes', 'jehovah rapha', 'sickness', 'disease',
    'சுகம்', 'குணமாக்குதல்', 'வியாதி', 'பிணி', 'யேகோவா ரஃபா', 'தழும்புகள்', 'ஆரோக்கியம்'
  ],
  wisdom: [
    'wisdom', 'wise', 'understanding', 'discernment', 'knowledge', 'prudence', 'fear of the lord',
    'ஞானம்', 'புத்தி', 'விவேகம்', 'தேவ பயம்', 'அறிவு', 'ஆலோசனை'
  ],
  hope: [
    'hope', 'hoping', 'confident expectation', 'anchor', 'blessed hope', 'living hope',
    'நம்பிக்கை', 'ஜீவனுள்ள நம்பிக்கை', 'ஆத்துமாவின் நங்கூரம்', 'பாக்கியமுள்ள நம்பிக்கை'
  ],
  peace: [
    'peace', 'shalom', 'tranquility', 'serenity', 'rest', 'peace of god', 'calmness', 'prince of peace',
    'சமாதானம்', 'ஷலோம்', 'அமைதி', 'ஆறுதல்', 'சமாதான பிரபு', 'மன அமைதி'
  ],
  fear: [
    'fear', 'fear not', 'afraid', 'terror', 'anxiety', 'fear of the lord', 'dread', 'reverence', 'courage',
    'பயம்', 'பயப்படாதே', 'தேவ பயம்', 'பயபக்தி', 'திகில்', 'தைரியம்', 'நடுக்கம்', 'கலக்கம்'
  ],
  fasting: [
    'fasting', 'fast', 'fasted', 'hunger', 'abstinence', 'humbling the soul',
    'உபவாசம்', 'உபவாசித்தல்', 'பட்டினி', 'ஜெபமும் உபவாசமும்', 'தேவ சமூகம்'
  ],
  worship: [
    'worship', 'adoration', 'spirit and truth', 'bow down', 'glory', 'reverence', 'living sacrifice',
    'ஆராதனை', 'பணிந்துகொள்ளுதல்', 'ஆவியோடும் உண்மையோடும்', 'மகிமை', 'ஜீவபலி'
  ],
  praise: [
    'praise', 'thanksgiving', 'thankful', 'hallelujah', 'hosanna', 'singing', 'magnify', 'exalt',
    'துதி', 'ஸ்தோத்திரம்', 'அல்லேலூயா', 'நன்றியறிதல்', 'போற்றுதல்', 'பாடிப் புகழுதல்'
  ],
  repentance: [
    'repentance', 'repent', 'repenting', 'turning to god', 'contrite', 'confession', 'sorry',
    'மனந்திரும்புதல்', 'பாவ அறிக்கை', 'நொறுங்குண்ட இருதயம்', 'பாவத்தை விட்டு விலகுதல்', 'திரும்புதல்'
  ],
  baptism: [
    'baptism', 'baptize', 'baptized', 'water baptism', 'immersion', 'great commission',
    'ஞானஸ்நானம்', 'தண்ணீர் ஞானஸ்நானம்', 'முழுக்கு', 'மறுபிறப்பு'
  ],
  obedience: [
    'obedience', 'obey', 'obeying', 'commandments', 'keep his word', 'submissive', 'hearken',
    'கீழ்ப்படிதல்', 'கற்பனைகளைக் கைக்கொள்ளுதல்', 'வார்த்தையைக் கேட்டல்', 'அடங்குதல்', 'தேவ சித்தம்'
  ],
  temptation: [
    'temptation', 'tempted', 'enticement', 'flesh', 'armor of god', 'snare', 'lust', 'devil',
    'சோதனை', 'சோதிக்கப்படுதல்', 'மாம்ச இச்சை', 'பிசாசின் தந்திரங்கள்', 'ஜெயம்'
  ],
  sin: [
    'sin', 'sins', 'sinner', 'iniquity', 'transgression', 'unrighteousness', 'wages of sin', 'fall',
    'பாவம்', 'பாவங்கள்', 'அக்கிரமம்', 'அநீதி', 'மீறுதல்', 'பாவத்தின் சம்பளம்'
  ],
  eternal_life: [
    'eternal life', 'everlasting life', 'immortality', 'life in christ', 'inheritance', 'forever',
    'நித்திய ஜீவன்', 'முடிவில்லா வாழ்வு', 'சாகாமை', 'கிறிஸ்துவுக்குள் ஜீவன்', 'பரலோக சுதந்திரம்'
  ],
  second_coming: [
    'second coming', 'return of christ', 'rapture', 'parousia', 'clouds of heaven', 'maranatha',
    'இரண்டாம் வருகை', 'கிறிஸ்துவின் மறுவருகை', 'எக்காள சத்தம்', 'மறுரூபமாதல்', 'மேகங்கள்மேல் வருவார்'
  ],
  resurrection: [
    'resurrection', 'risen', 'rose again', 'empty tomb', 'firstfruits', 'glorified body', 'easter',
    'உயிர்த்தெழுதல்', 'வெற்றிகரமான உயிர்த்தெழுதல்', 'முதற்பலன்', 'வெற்று கல்லறை', 'மரணத்தின் கூர்'
  ],
  prophecy: [
    'prophecy', 'prophet', 'prophesy', 'end times', 'eschatology', 'signs of the times', 'revelation',
    'தீர்க்கதரிசனம்', 'தீர்க்கதரிசி', 'கடைசி நாட்கள்', 'யுக முடிவு', 'காலத்தின் அடையாளங்கள்'
  ],
  spiritual_gifts: [
    'spiritual gifts', 'gifts of the spirit', 'charismata', 'tongues', 'healing gift', 'prophecy gift',
    'ஆவிக்குரிய வரங்கள்', 'வரங்கள்', 'சபையைக் கட்டுதல்', 'போதித்தல்', 'அந்நிய பாஷை'
  ],
  christian_life: [
    'christian life', 'discipleship', 'disciple', 'follow me', 'take up cross', 'abide',
    'கிறிஸ்தவ வாழ்க்கை', 'சீஷத்துவம்', 'சீஷன்', 'என்னைப் பின்பற்று', 'சிலுவை சுமத்தல்'
  ],
  family: [
    'family', 'marriage', 'husband', 'wife', 'children', 'parents', 'covenant', 'home',
    'குடும்பம்', 'திருமணம்', 'கணவன்', 'மனைவி', 'பிள்ளைகள்', 'பெற்றோர்', 'இல்லறம்'
  ],
  suffering: [
    'suffering', 'trials', 'tribulation', 'affliction', 'persecution', 'sorrow', 'grief', 'pain',
    'பாடுகள்', 'உபத்திரவங்கள்', 'துன்பங்கள்', 'துக்கம்', 'சோதனைகள்', 'நெருக்கங்கள்', 'சகிப்புத்தன்மை'
  ],
  protection: [
    'protection', 'strength', 'refuge', 'fortress', 'shield', 'deliverer', 'stronghold', 'shadow',
    'பாதுகாப்பு', 'பெலன்', 'அடைக்கலம்', 'கோட்டை', 'கேடகம்', 'இரட்சகர்', 'பலம்'
  ],
  joy: [
    'joy', 'rejoice', 'gladness', 'rejoicing', 'joy of the lord', 'delight',
    'மகிழ்ச்சி', 'சந்தோஷம்', 'ஆனந்தம்', 'களிப்பு', 'கர்த்தருக்குள் களிகூருதல்', 'பேரின்பம்'
  ],
  patience: [
    'patience', 'longsuffering', 'endurance', 'waiting on god', 'perseverance', 'steadfast',
    'பொறுமை', 'நீடிய சாந்தம்', 'காத்திருத்தல்', 'சகிப்புத்தன்மை'
  ],
  humility: [
    'humility', 'humble', 'meekness', 'pride', 'lowliness', 'servant', 'servanthood',
    'தாழ்மை', 'மனத்தாழ்மை', 'சாந்தம்', 'பெருமையின்மை', 'பணிவு', 'ஊழியன்'
  ],
  generosity: [
    'giving', 'generosity', 'tithe', 'offerings', 'cheerful giver', 'stewardship', 'poor', 'money',
    'கொடுத்தல்', 'தாராள குணம்', 'தசமபாகம்', 'காணிக்கை', 'உற்சாகமாய் கொடுத்தல்', 'ஏழைகளுக்கு இரங்குதல்'
  ],
  holiness: [
    'holiness', 'holy', 'sanctification', 'purity', 'clean', 'consecration', 'set apart',
    'பரிசுத்தம்', 'பரிசுத்தமாக்கப்படுதல்', 'சுத்திகரிப்பு', 'தூய்மை', 'பரிசுத்தர்', 'அர்ப்பணிப்பு'
  ],
  truth: [
    'truth', 'verity', 'word of truth', 'liberty', 'infallible', 'sound doctrine', 'true',
    'சத்தியம்', 'உண்மை', 'சத்திய வசனம்', 'சத்திய ஆவி', 'விடுதலை', 'சுவிசேஷ சத்தியம்'
  ],
  armor_of_god: [
    'armor of god', 'spiritual warfare', 'belt of truth', 'shield of faith', 'sword of the spirit', 'helmet',
    'சர்வாயுதவர்க்கம்', 'ஆவிக்குரிய யுத்தம்', 'விசுவாசக் கேடகம்', 'இரட்சிப்பின் தலைச்சீரா', 'ஆவியின் பட்டயம்'
  ]
};

export interface TopicSearchResult {
  topic: BibleTopic;
  relevanceScore: number;
  matchedField: 'title' | 'keyword' | 'synonym' | 'verse' | 'character' | 'event' | 'content';
  matchedSnippet?: string;
}

export class TopicsService {
  /**
   * Return all curated categories
   */
  static getCategories(): TopicCategoryMeta[] {
    return TOPIC_CATEGORIES;
  }

  /**
   * Return all topics
   */
  static getAllTopics(): BibleTopic[] {
    return BIBLE_TOPICS;
  }

  /**
   * Get topic by exact ID
   */
  static getTopicById(id: string): BibleTopic | undefined {
    return BIBLE_TOPICS.find((t) => t.id === id);
  }

  /**
   * Get topics by category
   */
  static getTopicsByCategory(categoryId: TopicCategoryId): BibleTopic[] {
    return BIBLE_TOPICS.filter((t) => t.category === categoryId);
  }

  /**
   * SMART SEARCH ENGINE:
   * 1. Understands English and Tamil inputs seamlessly
   * 2. Handles cross-language queries (e.g. searching 'Faith' in Tamil mode or 'ஜெபம்' in English mode)
   * 3. Explores concept synonyms, characters, events, and verse text
   * 4. Ranks results by semantic relevance
   */
  static searchTopics(query: string, currentLang: Language): TopicSearchResult[] {
    const rawTrimmed = query.trim().toLowerCase();
    if (!rawTrimmed) {
      return BIBLE_TOPICS.map((topic) => ({
        topic,
        relevanceScore: 1,
        matchedField: 'title',
      }));
    }

    const results: TopicSearchResult[] = [];

    // Check each topic
    for (const topic of BIBLE_TOPICS) {
      let score = 0;
      let matchedField: TopicSearchResult['matchedField'] = 'title';
      let matchedSnippet: string | undefined = undefined;

      const titleEn = topic.titleEn.toLowerCase();
      const titleTa = topic.titleTa.toLowerCase();
      const subtitleEn = topic.subtitleEn.toLowerCase();
      const subtitleTa = topic.subtitleTa.toLowerCase();

      // 1. Exact title match (Highest priority)
      if (titleEn === rawTrimmed || titleTa === rawTrimmed) {
        score += 100;
        matchedField = 'title';
        matchedSnippet = currentLang === 'ta' ? topic.titleTa : topic.titleEn;
      } else if (titleEn.startsWith(rawTrimmed) || titleTa.startsWith(rawTrimmed)) {
        score += 80;
        matchedField = 'title';
        matchedSnippet = currentLang === 'ta' ? topic.titleTa : topic.titleEn;
      } else if (titleEn.includes(rawTrimmed) || titleTa.includes(rawTrimmed)) {
        score += 65;
        matchedField = 'title';
      }

      // 2. Concept Synonyms Cross-Language Matching
      const synonyms = CONCEPT_SYNONYMS[topic.id] || [];
      for (const syn of synonyms) {
        const s = syn.toLowerCase();
        if (s === rawTrimmed) {
          score += 90;
          matchedField = 'synonym';
          matchedSnippet = syn;
          break;
        } else if (s.includes(rawTrimmed) || rawTrimmed.includes(s)) {
          score += 45;
          if (!matchedSnippet) {
            matchedField = 'synonym';
            matchedSnippet = syn;
          }
        }
      }

      // 3. Keywords match
      const allKeywords = [...topic.keywordsEn, ...topic.keywordsTa].map((k) => k.toLowerCase());
      for (const kw of allKeywords) {
        if (kw === rawTrimmed) {
          score += 70;
          if (score < 80) matchedField = 'keyword';
          matchedSnippet = kw;
          break;
        } else if (kw.includes(rawTrimmed)) {
          score += 35;
          if (!matchedSnippet) matchedSnippet = kw;
        }
      }

      // 4. Subtitle and meaning match
      if (subtitleEn.includes(rawTrimmed) || subtitleTa.includes(rawTrimmed)) {
        score += 30;
        if (!matchedSnippet) {
          matchedField = 'content';
          matchedSnippet = currentLang === 'ta' ? topic.subtitleTa : topic.subtitleEn;
        }
      }

      const meaningEn = topic.meaningEn.toLowerCase();
      const meaningTa = topic.meaningTa.toLowerCase();
      if (meaningEn.includes(rawTrimmed) || meaningTa.includes(rawTrimmed)) {
        score += 25;
        if (!matchedSnippet) {
          matchedField = 'content';
          matchedSnippet = currentLang === 'ta' ? topic.meaningTa : topic.meaningEn;
        }
      }

      // 5. Bible Characters associated
      for (const char of topic.characters) {
        const charEn = char.nameEn.toLowerCase();
        const charTa = char.nameTa.toLowerCase();
        if (charEn.includes(rawTrimmed) || charTa.includes(rawTrimmed)) {
          score += 55;
          matchedField = 'character';
          matchedSnippet = `${currentLang === 'ta' ? char.nameTa : char.nameEn} (${char.ref})`;
          break;
        }
      }

      // 6. Biblical Events associated
      for (const ev of topic.events) {
        const evEn = ev.titleEn.toLowerCase();
        const evTa = ev.titleTa.toLowerCase();
        if (evEn.includes(rawTrimmed) || evTa.includes(rawTrimmed)) {
          score += 50;
          matchedField = 'event';
          matchedSnippet = currentLang === 'ta' ? ev.titleTa : ev.titleEn;
          break;
        }
      }

      // 7. Key Bible Verses text search
      for (const verse of topic.keyVerses) {
        const vEn = verse.textEn.toLowerCase();
        const vTa = verse.textTa.toLowerCase();
        const refEn = `${verse.bookNameEn} ${verse.chapterNumber}:${verse.verseNumber}`.toLowerCase();
        const refTa = `${verse.bookNameTa} ${verse.chapterNumber}:${verse.verseNumber}`.toLowerCase();

        if (refEn.includes(rawTrimmed) || refTa.includes(rawTrimmed)) {
          score += 60;
          matchedField = 'verse';
          matchedSnippet = currentLang === 'ta' ? `${verse.bookNameTa} ${verse.chapterNumber}:${verse.verseNumber}` : `${verse.bookNameEn} ${verse.chapterNumber}:${verse.verseNumber}`;
          break;
        } else if (vEn.includes(rawTrimmed) || vTa.includes(rawTrimmed)) {
          score += 30;
          matchedField = 'verse';
          matchedSnippet = currentLang === 'ta' ? verse.textTa : verse.textEn;
          break;
        }
      }

      if (score > 0) {
        results.push({
          topic,
          relevanceScore: score,
          matchedField,
          matchedSnippet,
        });
      }
    }

    // Sort descending by relevance score
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    return results;
  }

  /**
   * Return popular trending topics for instant exploration
   */
  static getTrendingTopics(): BibleTopic[] {
    const popularIds = ['faith', 'prayer', 'love', 'salvation', 'grace', 'peace', 'healing', 'hope'];
    return BIBLE_TOPICS.filter((t) => popularIds.includes(t.id));
  }

  /**
   * Get related topics for a given topic
   */
  static getRelatedTopics(topic: BibleTopic): BibleTopic[] {
    return topic.relatedTopicIds
      .map((id) => this.getTopicById(id))
      .filter((t): t is BibleTopic => t !== undefined);
  }
}

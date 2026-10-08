import { Language } from './bible';

export type TopicCategoryId =
  | 'core_doctrines'
  | 'christian_living'
  | 'peace_and_comfort'
  | 'god_and_christ'
  | 'holy_spirit'
  | 'bible_characters'
  | 'spiritual_growth'
  | 'family_and_relationships'
  | 'prophecy_and_eternity'
  | 'worship_and_prayer';

export interface TopicVerseReference {
  bookId: string;
  bookNameEn: string;
  bookNameTa: string;
  chapterNumber: number;
  verseNumber: number;
  endVerseNumber?: number;
  textEn: string;
  textTa: string;
  significanceEn?: string;
  significanceTa?: string;
}

export interface BibleCharacterLink {
  nameEn: string;
  nameTa: string;
  roleEn: string;
  roleTa: string;
  descEn: string;
  descTa: string;
  ref: string;
  bookId: string;
  chapterNumber?: number;
  verseNumber?: number;
  ch?: number;
  v?: number;
  descriptionEn?: string;
  descriptionTa?: string;
  reference?: string;
}

export interface TopicEventLink {
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  ref: string;
  bookId: string;
  chapterNumber?: number;
  verseNumber?: number;
  ch?: number;
  v?: number;
  descriptionEn?: string;
  descriptionTa?: string;
  reference?: string;
}

export interface BibleTopic {
  id: string; // e.g. 'faith', 'prayer', 'love'
  category: TopicCategoryId;
  titleEn: string;
  titleTa: string;
  subtitleEn: string;
  subtitleTa: string;
  keywordsEn: string[];
  keywordsTa: string[];
  meaningEn: string;
  meaningTa: string;
  oldTestamentEn: string;
  oldTestamentTa: string;
  newTestamentEn: string;
  newTestamentTa: string;
  practicalApplicationEn: string;
  practicalApplicationTa: string;
  keyVerses: TopicVerseReference[];
  characters: BibleCharacterLink[];
  events: TopicEventLink[];
  relatedTopicIds: string[];
}

export interface TopicCategoryMeta {
  id: TopicCategoryId;
  labelEn: string;
  labelTa: string;
  descriptionEn: string;
  descriptionTa: string;
  iconName: string;
}

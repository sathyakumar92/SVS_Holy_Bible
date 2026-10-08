import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useBible } from '../context/BibleContext';
import { TopicsService, TopicSearchResult } from '../services/topicsService';
import { BibleTopic, TopicCategoryId, TopicVerseReference } from '../types/topics';
import {
  Search,
  Sparkles,
  BookOpen,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Flame,
  ShieldCheck,
  Heart,
  Sun,
  Crown,
  Wind,
  TrendingUp,
  Users,
  Compass,
  Tag,
  Languages,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  core_doctrines: ShieldCheck,
  worship_and_prayer: Flame,
  christian_living: Heart,
  peace_and_comfort: Sun,
  god_and_christ: Crown,
  holy_spirit: Wind,
  prophecy_and_eternity: Sparkles,
  spiritual_growth: TrendingUp,
  family_and_relationships: Users,
};

export const TopicsView: React.FC = () => {
  const { currentLanguage, goToScripture } = useBible();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<BibleTopic | null>(null);

  // Language override for the topic view (defaults to current active Bible language)
  const [topicLang, setTopicLang] = useState<'en' | 'ta'>(currentLanguage);

  // Sync topicLang when global Bible language changes
  useEffect(() => {
    setTopicLang(currentLanguage);
  }, [currentLanguage]);

  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [savedTopicIds, setSavedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('svs_saved_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = TopicsService.getCategories();

  // Search results
  const searchResults = useMemo(() => {
    let results: TopicSearchResult[] = [];

    if (searchQuery.trim()) {
      results = TopicsService.searchTopics(searchQuery, topicLang);
    } else {
      const allTopics = TopicsService.getAllTopics();
      results = allTopics.map((topic) => ({
        topic,
        relevanceScore: 1,
        matchedField: 'title',
      }));
    }

    if (selectedCategoryId !== 'all') {
      results = results.filter((r) => r.topic.category === selectedCategoryId);
    }

    return results;
  }, [searchQuery, selectedCategoryId, topicLang]);

  // Handle saving/bookmarking topic
  const toggleSaveTopic = (topicId: string) => {
    setSavedTopicIds((prev) => {
      const updated = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      try {
        localStorage.setItem('svs_saved_topics', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Copy full topic study
  const handleCopyStudy = () => {
    if (!selectedTopic) return;
    const isTa = topicLang === 'ta';
    const text = `📖 ${isTa ? selectedTopic.titleTa : selectedTopic.titleEn} - SVS Bible Study
${isTa ? selectedTopic.subtitleTa : selectedTopic.subtitleEn}

${isTa ? 'விளக்கம்:' : 'Biblical Meaning:'}
${isTa ? selectedTopic.meaningTa : selectedTopic.meaningEn}

${isTa ? 'பழைய ஏற்பாட்டில்:' : 'Old Testament Perspective:'}
${isTa ? selectedTopic.oldTestamentTa : selectedTopic.oldTestamentEn}

${isTa ? 'புதிய ஏற்பாட்டில்:' : 'New Testament Perspective:'}
${isTa ? selectedTopic.newTestamentTa : selectedTopic.newTestamentEn}

${isTa ? 'முக்கிய வசனங்கள்:' : 'Key Scripture Verses:'}
${selectedTopic.keyVerses
  .map(
    (v) =>
      `• ${isTa ? v.bookNameTa : v.bookNameEn} ${v.chapterNumber}:${v.verseNumber} - "${isTa ? v.textTa : v.textEn}"`
  )
  .join('\n')}

${isTa ? 'நடைமுறை வாழ்க்கைக்கு:' : 'Practical Life Application:'}
${isTa ? selectedTopic.practicalApplicationTa : selectedTopic.practicalApplicationEn}
`;

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  // Quick suggestions list
  const quickSuggestions = [
    { en: 'Faith', ta: 'விசுவாசம்', id: 'faith' },
    { en: 'Prayer', ta: 'ஜெபம்', id: 'prayer' },
    { en: 'Love', ta: 'அன்பு', id: 'love' },
    { en: 'Forgiveness', ta: 'மன்னிப்பு', id: 'forgiveness' },
    { en: 'Salvation', ta: 'இரட்சிப்பு', id: 'salvation' },
    { en: 'Grace', ta: 'கிருபை', id: 'grace' },
    { en: 'Holy Spirit', ta: 'பரிசுத்த ஆவியானவர்', id: 'holy_spirit' },
    { en: 'Peace', ta: 'சமாதானம்', id: 'peace' },
    { en: 'Healing', ta: 'சுகம்', id: 'healing' },
    { en: 'Hope', ta: 'நம்பிக்கை', id: 'hope' },
    { en: 'Armor of God', ta: 'சர்வாயுதவர்க்கம்', id: 'armor_of_god' },
    { en: 'Wisdom', ta: 'ஞானம்', id: 'wisdom' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-16 space-y-6">
      {/* If viewing topic detail */}
      {selectedTopic ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top action bar */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setSelectedTopic(null);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#191C24] hover:bg-[#232734] text-[#A9A397] hover:text-[#EDE8DF] text-xs font-semibold border border-[#272B38] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{topicLang === 'ta' ? 'அனைத்து தலைப்புகள்' : 'All Topics'}</span>
            </button>

            <div className="flex items-center gap-2">
              {/* Language Switcher for Topic */}
              <button
                onClick={() => setTopicLang((prev) => (prev === 'ta' ? 'en' : 'ta'))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B1E28] hover:bg-[#252A38] text-xs font-semibold text-[#D4AF37] border border-[#C5A059]/30 transition-all"
                title="Toggle Language"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{topicLang === 'ta' ? 'In English' : 'தமிழில்'}</span>
              </button>

              {/* Bookmark topic */}
              <button
                onClick={() => toggleSaveTopic(selectedTopic.id)}
                className={`p-2 rounded-lg border transition-all ${
                  savedTopicIds.includes(selectedTopic.id)
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#191C24] border-[#272B38] text-[#8C877D] hover:text-[#EDE8DF]'
                }`}
                title={savedTopicIds.includes(selectedTopic.id) ? 'Saved' : 'Save Topic'}
              >
                {savedTopicIds.includes(selectedTopic.id) ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>

              {/* Copy study */}
              <button
                onClick={handleCopyStudy}
                className="p-2 rounded-lg bg-[#191C24] border border-[#272B38] text-[#8C877D] hover:text-[#EDE8DF] transition-all"
                title="Copy Topic Study"
              >
                {copiedSuccess ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Hero Topic Header Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1F28] via-[#171922] to-[#121316] border border-[#D4AF37]/35 p-6 sm:p-8 shadow-xl">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-wider">
                  {topicLang === 'ta' ? 'வேதாகம தலைப்பு ஆய்வு' : 'Bible Topic Study'}
                </span>
                <span className="text-xs text-[#8E897F]">•</span>
                <span className="text-xs text-[#A9A397]">
                  {selectedTopic.keyVerses.length} {topicLang === 'ta' ? 'வசனங்கள்' : 'Verses'}
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-cinzel text-[#EDE8DF] tracking-tight">
                  {topicLang === 'ta' ? selectedTopic.titleTa : selectedTopic.titleEn}
                </h1>
                <p className="text-sm sm:text-base text-[#D4AF37] font-medium mt-1">
                  {topicLang === 'ta' ? selectedTopic.titleEn : selectedTopic.titleTa}
                </p>
                <p className="text-sm text-[#A9A397] mt-2 leading-relaxed max-w-2xl">
                  {topicLang === 'ta' ? selectedTopic.subtitleTa : selectedTopic.subtitleEn}
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Biblical Meaning & Overview */}
          <section className="p-6 rounded-2xl bg-[#181A22] border border-[#272B38] space-y-3">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
              <h2 className="text-base font-bold text-[#EDE8DF]">
                {topicLang === 'ta' ? 'வேதாகம அர்த்தம் & விளக்கம்' : 'Biblical Meaning & Overview'}
              </h2>
            </div>
            <p className="text-sm text-[#EDE8DF] leading-relaxed">
              {topicLang === 'ta' ? selectedTopic.meaningTa : selectedTopic.meaningEn}
            </p>
          </section>

          {/* Section 2: Old & New Testament Perspectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#161820] border border-[#272B38] space-y-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#252834] text-[#C5A059] uppercase tracking-wider inline-block">
                {topicLang === 'ta' ? 'பழைய ஏற்பாட்டில்' : 'Old Testament Perspective'}
              </span>
              <p className="text-xs sm:text-sm text-[#A9A397] leading-relaxed">
                {topicLang === 'ta' ? selectedTopic.oldTestamentTa : selectedTopic.oldTestamentEn}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#161820] border border-[#272B38] space-y-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#252834] text-[#C5A059] uppercase tracking-wider inline-block">
                {topicLang === 'ta' ? 'புதிய ஏற்பாட்டில்' : 'New Testament Perspective'}
              </span>
              <p className="text-xs sm:text-sm text-[#A9A397] leading-relaxed">
                {topicLang === 'ta' ? selectedTopic.newTestamentTa : selectedTopic.newTestamentEn}
              </p>
            </div>
          </div>

          {/* Section 3: Key Bible Verses with Scripture Reader Jump */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#EDE8DF] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {topicLang === 'ta' ? 'முக்கிய வேதாகம வசனங்கள்' : 'Key Scripture Verses'}
                </span>
              </h2>
              <span className="text-xs text-[#8E897F]">
                {selectedTopic.keyVerses.length} {topicLang === 'ta' ? 'வசனங்கள்' : 'verses'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {selectedTopic.keyVerses.map((verse, idx) => (
                <div
                  key={`${verse.bookId}-${verse.chapterNumber}-${verse.verseNumber}-${idx}`}
                  className="p-5 rounded-2xl bg-[#181A22] border border-[#272B38] hover:border-[#D4AF37]/50 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#242734] text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-bold text-[#D4AF37] font-cinzel">
                        {topicLang === 'ta'
                          ? `${verse.bookNameTa} ${verse.chapterNumber}:${verse.verseNumber}`
                          : `${verse.bookNameEn} ${verse.chapterNumber}:${verse.verseNumber}`}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        goToScripture(verse.bookId, verse.chapterNumber, verse.verseNumber)
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222532] hover:bg-[#D4AF37] text-[#A9A397] hover:text-[#121316] text-xs font-semibold transition-all shrink-0"
                    >
                      <span>{topicLang === 'ta' ? 'வேதாகமத்தில் வாசிக்க' : 'Read in Context'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Verse Text */}
                  <blockquote className="text-sm sm:text-base text-[#EDE8DF] italic font-serif leading-relaxed border-l-2 border-[#D4AF37]/40 pl-3">
                    “{topicLang === 'ta' ? verse.textTa : verse.textEn}”
                  </blockquote>

                  {/* Significance note */}
                  {(verse.significanceEn || verse.significanceTa) && (
                    <p className="text-xs text-[#8E897F] pt-1">
                      💡 {topicLang === 'ta' ? verse.significanceTa : verse.significanceEn}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Biblical Characters & Examples */}
          {selectedTopic.characters && selectedTopic.characters.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold text-[#EDE8DF] uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {topicLang === 'ta'
                    ? 'மாதிரியாக வாழ்ந்த வேதாகம மனிதர்கள்'
                    : 'People Who Demonstrated This'}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedTopic.characters.map((char, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#161820] border border-[#272B38] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#EDE8DF]">
                        {topicLang === 'ta' ? char.nameTa : char.nameEn}
                      </h3>
                      <button
                        onClick={() => goToScripture(char.bookId, char.chapterNumber ?? 1, char.verseNumber ?? 1)}
                        className="text-[11px] text-[#D4AF37] hover:underline font-mono"
                      >
                        {char.ref}
                      </button>
                    </div>
                    <span className="text-[11px] text-[#D4AF37] font-medium block">
                      {topicLang === 'ta' ? char.roleTa : char.roleEn}
                    </span>
                    <p className="text-xs text-[#A9A397] leading-relaxed">
                      {topicLang === 'ta' ? char.descTa : char.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 5: Key Biblical Events */}
          {selectedTopic.events && selectedTopic.events.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold text-[#EDE8DF] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {topicLang === 'ta' ? 'தொடர்புடைய வேதாகம நிகழ்வுகள்' : 'Related Bible Events'}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedTopic.events.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#161820] border border-[#272B38] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#EDE8DF]">
                        {topicLang === 'ta' ? ev.titleTa : ev.titleEn}
                      </h3>
                      <button
                        onClick={() => goToScripture(ev.bookId, ev.chapterNumber ?? 1, ev.verseNumber ?? 1)}
                        className="text-[11px] text-[#D4AF37] hover:underline font-mono"
                      >
                        {ev.ref}
                      </button>
                    </div>
                    <p className="text-xs text-[#A9A397] leading-relaxed">
                      {topicLang === 'ta' ? ev.descTa : ev.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 6: Practical Christian Application */}
          <section className="p-6 rounded-2xl bg-gradient-to-r from-[#1B1E28] to-[#161822] border border-[#C5A059]/30 space-y-2">
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              <span>
                {topicLang === 'ta' ? 'நடைமுறை வாழ்க்கைக்கு எடுத்துக்கொள்ள' : 'Practical Christian Takeaway'}
              </span>
            </span>
            <p className="text-sm text-[#EDE8DF] leading-relaxed">
              {topicLang === 'ta'
                ? selectedTopic.practicalApplicationTa
                : selectedTopic.practicalApplicationEn}
            </p>
          </section>

          {/* Section 7: Related Topics */}
          {selectedTopic.relatedTopicIds && selectedTopic.relatedTopicIds.length > 0 && (
            <section className="pt-2 space-y-3">
              <h2 className="text-xs font-semibold text-[#8E897F] uppercase tracking-wider">
                {topicLang === 'ta' ? 'தொடர்புடைய பிற தலைப்புகள்' : 'Related Bible Topics'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedTopic.relatedTopicIds.map((relId) => {
                  const relTopic = TopicsService.getTopicById(relId);
                  if (!relTopic) return null;
                  return (
                    <button
                      key={relId}
                      onClick={() => {
                        setSelectedTopic(relTopic);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#191C24] hover:bg-[#252834] border border-[#272B38] text-xs font-semibold text-[#EDE8DF] hover:text-[#D4AF37] transition-all flex items-center gap-1.5"
                    >
                      <Tag className="w-3 h-3 text-[#D4AF37]" />
                      <span>{topicLang === 'ta' ? relTopic.titleTa : relTopic.titleEn}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* ================= LIST & SEARCH VIEW ================= */
        <div className="space-y-6">
          {/* Header Title */}
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <h1 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-[#EDE8DF]">
                {topicLang === 'ta' ? 'வேதாகம தலைப்புகள்' : 'Bible Topics'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#A9A397] mt-1">
              {topicLang === 'ta'
                ? 'ஆழமான வேதாகம தலைப்புகள், சரிபார்க்கப்பட்ட வசனங்கள், கதாபாத்திரங்கள் மற்றும் நடைமுறை ஆலோசனைகள்'
                : 'Explore foundational Scripture topics, verified verses, biblical characters, and timeless truth'}
            </p>
          </div>

          {/* Prominent Smart Search Bar */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#D4AF37] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  topicLang === 'ta'
                    ? 'வேதாகம தலைப்புகளைத் தேடுங்கள்... (எ.கா: விசுவாசம், ஜெபம், அன்பு, சமாதானம்)'
                    : 'Search Bible Topics... (e.g. Faith, Prayer, Love, Peace, Grace, Healing)'
                }
                className="w-full pl-12 pr-10 py-3.5 bg-[#181A22] border border-[#2C3040] focus:border-[#D4AF37] rounded-2xl text-sm text-[#EDE8DF] placeholder-[#7C776E] outline-none shadow-lg transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs text-[#8E897F] hover:text-[#EDE8DF] bg-[#222532] px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Cross-language hint note */}
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-[#7E7A71]">
              <span>
                {topicLang === 'ta'
                  ? '💡 ஆங்கிலம் அல்லது தமிழில் எந்த வேதாகம தலைப்பையும் தேடலாம்'
                  : '💡 Smart cross-language search supports English & Tamil concepts'}
              </span>
              <span>
                {searchResults.length} {topicLang === 'ta' ? 'முடிவுகள்' : 'topics found'}
              </span>
            </div>
          </div>

          {/* Quick Concept Tags */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8E897F]">
              {topicLang === 'ta' ? 'பிரபலமான தலைப்புகள்' : 'Trending Topics'}
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const topic = TopicsService.getTopicById(item.id);
                    if (topic) setSelectedTopic(topic);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#161820] hover:bg-[#222532] border border-[#252834] hover:border-[#D4AF37]/50 text-xs text-[#EDE8DF] font-medium transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{topicLang === 'ta' ? item.ta : item.en}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
            <button
              onClick={() => setSelectedCategoryId('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategoryId === 'all'
                  ? 'bg-[#D4AF37] text-[#121316] shadow-md font-bold'
                  : 'bg-[#181A22] text-[#8E897F] hover:text-[#EDE8DF] border border-[#272B38]'
              }`}
            >
              {topicLang === 'ta' ? 'அனைத்து தலைப்புகள்' : 'All Topics'}
            </button>

            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
              const isActive = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37] font-semibold'
                      : 'bg-[#181A22] text-[#8E897F] hover:text-[#EDE8DF] border-[#272B38]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{topicLang === 'ta' ? cat.labelTa : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Topics Grid */}
          {searchResults.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-[#161820] border border-[#252834] space-y-3">
              <Search className="w-10 h-10 text-[#8E897F] mx-auto opacity-50" />
              <h3 className="text-base font-bold text-[#EDE8DF]">
                {topicLang === 'ta' ? 'தலைப்புகள் எதுவும் கிடைக்கவில்லை' : 'No Topics Found'}
              </h3>
              <p className="text-xs text-[#8E897F] max-w-sm mx-auto">
                {topicLang === 'ta'
                  ? 'வேறு சொற்களைப் பயன்படுத்தி தேடவும் அல்லது கீழே உள்ள பிரபலமான தலைப்புகளைத் தேர்ந்தெடுக்கவும்'
                  : 'Try searching with different terms like "Faith", "Prayer", "Peace", or "Love"'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategoryId('all');
                }}
                className="px-4 py-2 bg-[#D4AF37] text-[#121316] text-xs font-bold rounded-xl"
              >
                {topicLang === 'ta' ? 'அனைத்தையும் காட்டு' : 'Reset Search'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map(({ topic, matchedSnippet }) => {
                const isSaved = savedTopicIds.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-5 rounded-2xl bg-[#181A22] hover:bg-[#1D202B] border border-[#272B38] hover:border-[#D4AF37]/50 cursor-pointer transition-all hover:-translate-y-0.5 group space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#252834] text-[#C5A059] uppercase tracking-wider">
                          {topic.keyVerses.length} {topicLang === 'ta' ? 'வசனங்கள்' : 'Verses'}
                        </span>

                        {isSaved && (
                          <BookmarkCheck className="w-4 h-4 text-[#D4AF37]" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold font-cinzel text-[#EDE8DF] group-hover:text-[#D4AF37] transition-colors">
                          {topicLang === 'ta' ? topic.titleTa : topic.titleEn}
                        </h3>
                        <span className="text-xs text-[#8E897F] block">
                          {topicLang === 'ta' ? topic.titleEn : topic.titleTa}
                        </span>
                      </div>

                      <p className="text-xs text-[#A9A397] line-clamp-2 leading-relaxed">
                        {topicLang === 'ta' ? topic.subtitleTa : topic.subtitleEn}
                      </p>

                      {matchedSnippet && searchQuery.trim() && (
                        <div className="text-[11px] text-[#D4AF37] bg-[#222534] px-2 py-1 rounded truncate">
                          🎯 {matchedSnippet}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#232632] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                      <span>{topicLang === 'ta' ? 'விளக்கம் & வசனங்கள்' : 'Explore Topic'}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

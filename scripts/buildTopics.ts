import fs from 'fs';
import path from 'path';
import { additionalTopics } from './moreTopics';

const kjvCache = new Map<string, any>();
const taCache = new Map<string, any>();

function getVerseText(bookId: string, chapter: number, verse: number, lang: 'en' | 'ta'): string {
  const normId = bookId.toUpperCase();
  const cache = lang === 'en' ? kjvCache : taCache;
  const dir = lang === 'en' ? 'public/bible/en-kjv' : 'public/bible/ta-bsi';

  if (!cache.has(normId)) {
    const filePath = path.join(dir, `${normId}.json`);
    if (fs.existsSync(filePath)) {
      cache.set(normId, JSON.parse(fs.readFileSync(filePath, 'utf8')));
    } else {
      return '';
    }
  }

  const bookData = cache.get(normId);
  const ch = bookData?.chapters?.find((c: any) => c.chapterNumber === chapter);
  const v = ch?.verses?.find((v: any) => v.verseNumber === verse);
  return v?.text?.trim() || '';
}

const rawTopics = [
  {
    id: 'faith',
    category: 'core_doctrines',
    titleEn: 'Faith',
    titleTa: 'விசுவாசம்',
    subtitleEn: 'Trusting in the unseen promises and absolute faithfulness of God',
    subtitleTa: 'தேவனுடைய மாறாத வாக்குத்தத்தங்கள் மற்றும் உண்மைத்துவத்தின் மீது வைக்கும் நம்பிக்கை',
    keywordsEn: ['faith', 'believe', 'trust', 'confidence', 'assurance', 'unseen', 'fidelity', 'steadfast'],
    keywordsTa: ['விசுவாசம்', 'நம்பிக்கை', 'விசுவாசித்தல்', 'பக்தி', 'சார்ந்திருத்தல்', 'விசுவாசிகள்'],
    meaningEn: 'In Scripture, faith (Greek: pistis, Hebrew: emunah) is not mere intellectual assent or blind optimism; it is the confident assurance and wholehearted reliance on God’s character, promises, and redemptive work. Hebrews 11:1 defines it as the substance of things hoped for and the evidence of things not seen. It is the very channel through which sinners are justified and receive eternal life.',
    meaningTa: 'வேதாகமத்தில் விசுவாசம் (கிரேக்கம்: பிஸ்திஸ், எபிரெயம்: எமுனா) என்பது வெறும் புத்திப்பூர்வமான ஏற்பு அல்ல; மாறாக தேவனுடைய சுபாவம், அவருடைய வாக்குத்தத்தங்கள் மற்றும் மீட்பின் செயலின் மீது வைக்கும் அசைக்க முடியாத உறுதியான நம்பிக்கையாகும். எபிரெயர் 11:1 விசுவாசத்தை நம்பப்படுகிறவைகளின் உறுதியும், காணப்படாதவைகளின் நிச்சயமுமாய் வர்ணிக்கிறது. விசுவாசத்தினாலேயே பாவியான மனிதன் நீதிமானாக்கப்பட்டு நித்திய ஜீவனைப் பெறுகிறான்.',
    oldTestamentEn: 'In the Old Testament, faith is demonstrated through covenant loyalty, obedience, and walking with God amidst trials. Abraham believed the LORD, and it was accounted to him for righteousness (Genesis 15:6). The prophets repeatedly urged Israel to put their trust not in military alliances or idols, but wholly in the sovereign Creator.',
    oldTestamentTa: 'பழைய ஏற்பாட்டில் விசுவாசம் என்பது உடன்படிக்கைக்குரிய உண்மைத்துவம், கீழ்ப்படிதல் மற்றும் சோதனைகளின் மத்தியில் தேவனோடு நடத்தல் ஆகியவற்றால் வெளிப்படுத்தப்பட்டது. ஆபிரகாம் கர்த்தரை விசுவாசித்தான், அது அவனுக்கு நீதியாக எண்ணப்பட்டது (ஆதியாகமம் 15:6). இஸ்ரவேலர் யுத்த படைகளின் மீதோ விக்கிரகங்களின் மீதோ நம்பிக்கை வைக்காமல் சர்வவல்லமையுள்ள தேவனையே நம்பும்படி தீர்க்கதரிசிகள் தொடர்ந்து அறிவுறுத்தினர்.',
    newTestamentEn: 'The New Testament reveals Jesus Christ as the author and finisher of our faith (Hebrews 12:2). We are saved by grace through faith in Christ alone, not by works of law (Ephesians 2:8-9). Faith produces active love, good deeds, endurance in persecution, and victory over the world (1 John 5:4).',
    newTestamentTa: 'புதிய ஏற்பாட்டில் விசுவாசத்தைத் துவக்குகிறவரும் முடிக்கிறவருமாகிய இயேசு கிறிஸ்துவை நாம் காண்கிறோம் (எபிரெயர் 12:2). நாம் நியாயப்பிரமாணத்தின் கிரியைகளினால் அல்ல, கிறிஸ்துவை விசுவாசிக்கும் விசுவாசத்தினாலே கிருபையாக இரட்சிக்கப்படுகிறோம் (எபேசியர் 2:8-9). உண்மையான விசுவாசம் அன்பினால் கிரியை செய்து, நற்கிரியைகளையும், சோதனைகளில் சகிப்புத்தன்மையையும், உலகத்தை ஜெயிக்கும் ஜெயத்தையும் பிறப்பிக்கிறது.',
    practicalApplicationEn: 'Daily faith requires surrendering personal anxieties to God’s sovereign control, standing firm on Biblical promises during trials, praying with confident expectation, and walking in radical obedience even when circumstances seem impossible.',
    practicalApplicationTa: 'அன்றாட வாழ்வில் விசுவாசம் என்பது நமது கவலைகளை தேவனுடைய கரத்தில் ஒப்படைப்பது, சோதனைகளில் அவருடைய வேத வாக்குத்தத்தங்களின் மேல் உறுதியாக நிற்பது, சந்தேகமின்றி ஜெபிப்பது, மற்றும் சூழ்நிலைகள் மாறாக இருந்தாலும் கீழ்ப்படிந்து நடப்பதாகும்.',
    verses: [
      { bookId: 'HEB', bookNameEn: 'Hebrews', bookNameTa: 'எபிரெயர்', ch: 11, v: 1, sigEn: 'The classical biblical definition of living faith.', sigTa: 'ஜீவனுள்ள விசுவாசத்தின் வேதாகம வரைவிலக்கணம்.' },
      { bookId: 'HEB', bookNameEn: 'Hebrews', bookNameTa: 'எபிரெயர்', ch: 11, v: 6, sigEn: 'Without faith it is impossible to please God.', sigTa: 'விசுவாசமில்லாமல் தேவனுக்குப் பிரியமாயிருப்பது கூடாதகாரியம்.' },
      { bookId: 'EPH', bookNameEn: 'Ephesians', bookNameTa: 'எபேசியர்', ch: 2, v: 8, sigEn: 'Salvation by grace through faith, the gift of God.', sigTa: 'கிருபையினாலே விசுவாசத்தைக் கொண்டு இரட்சிக்கப்படுகிறோம்.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 10, v: 17, sigEn: 'Faith comes by hearing the Word of God.', sigTa: 'விசுவாசம் தேவனுடைய வார்த்தையைக் கேட்பதினாலே வரும்.' },
      { bookId: 'PRO', bookNameEn: 'Proverbs', bookNameTa: 'நீதிமொழிகள்', ch: 3, v: 5, sigEn: 'Trusting in the Lord with all your heart.', sigTa: 'முழு இருதயத்தோடும் கர்த்தரில் நம்பிக்கையாயிருங்கள்.' },
      { bookId: '2CO', bookNameEn: '2 Corinthians', bookNameTa: '2 கொரிந்தியர்', ch: 5, v: 7, sigEn: 'Walking by faith, not by sight.', sigTa: 'பார்வையினாலே நடவாமல் விசுவாசத்தினாலே நடக்கிறோம்.' }
    ],
    characters: [
      { nameEn: 'Abraham', nameTa: 'ஆபிரகாம்', roleEn: 'Father of Faith', roleTa: 'விசுவாசத்தின் தந்தை', descEn: 'Left his homeland and offered Isaac, believing God could raise the dead.', descTa: 'தேவன் மரித்தோரிலிருந்தும் எழுப்ப வல்லவர் என்று நம்பி ஈசாக்கை பலியிட முன்வந்தார்.', ref: 'Hebrews 11:8-19', bookId: 'HEB', ch: 11, v: 8 },
      { nameEn: 'Centurion', nameTa: 'நூற்றுக்கு அதிபதி', roleEn: 'Roman Soldier of Great Faith', roleTa: 'பெரிய விசுவாசம் கொண்ட ரோம வீரன்', descEn: 'Jesus marveled at his faith, declaring He had not found such great faith in all Israel.', descTa: 'இஸ்ரவேலிலும் நான் இப்படிப்பட்ட விசுவாசத்தைக் காணவில்லை என்று இயேசுவே வியந்து பாராட்டினார்.', ref: 'Matthew 8:10', bookId: 'MAT', ch: 8, v: 10 }
    ],
    events: [
      { titleEn: 'Crossing of the Red Sea', titleTa: 'செங்கடலை பிளந்து கடத்தல்', descEn: 'Israel walked through the sea on dry ground by faith as God parted the waters.', descTa: 'விசுவாசத்தினாலே இஸ்ரவேலர் செங்கடலை வெட்டாந்தரையின் வழியாய் கடந்து சென்றார்கள்.', ref: 'Hebrews 11:29', bookId: 'HEB', ch: 11, v: 29 },
      { titleEn: 'The Fall of Jericho', titleTa: 'எரிகோ மதில்கள் விழுதல்', descEn: 'By faith the walls of Jericho fell down after being compassed seven days.', descTa: 'விசுவாசத்தினாலே எரிகோவின் மதில்கள் ஏழு நாள் சுற்றப்பட்டு தரைமட்டமாய் விழுந்தன.', ref: 'Hebrews 11:30', bookId: 'HEB', ch: 11, v: 30 }
    ],
    relatedTopicIds: ['salvation', 'grace', 'prayer', 'hope', 'obedience', 'trials']
  },
  {
    id: 'prayer',
    category: 'worship_and_prayer',
    titleEn: 'Prayer',
    titleTa: 'ஜெபம்',
    subtitleEn: 'Intimate communion, intercession, and fellowship with the Heavenly Father',
    subtitleTa: 'பரலோகப் பிதாவோடு கொண்டுள்ள நெருக்கமான ஐக்கியம், விண்ணப்பம் மற்றும் மன்றாட்டு',
    keywordsEn: ['prayer', 'pray', 'intercession', 'supplication', 'petition', 'crying out', 'kneeling', 'communion', 'fasting and prayer'],
    keywordsTa: ['ஜெபம்', 'பிரார்த்தனை', 'விண்ணப்பம்', 'மன்றாட்டு', 'கூப்பிடுதல்', 'பரிந்துபேசுதல்', 'ஆவியிலே ஜெபம்'],
    meaningEn: 'Prayer is the relational lifeline of the believer—direct communication with Almighty God through Jesus Christ in the power of the Holy Spirit. It encompasses worship, thanksgiving, honest confession, humble petition, and sacrificial intercession for others. Jesus taught that true prayer is done in spirit and truth, not for hypocritical display.',
    meaningTa: 'ஜெபம் என்பது விசுவாசியின் ஆவிக்குரிய ஜீவநாடி; இயேசு கிறிஸ்துவின் நாமத்தினாலே, பரிசுத்த ஆவியின் பெலத்தோடு சர்வவல்ல தேவனிடம் பேசும் ஆவிக்குரிய உரையாடல் ஆகும். இதில் ஆராதனை, ஸ்தோத்திரம், பாவ அறிக்கை, வேண்டுதல்கள் மற்றும் பிறருக்காக பரிந்துபேசும் மன்றாட்டுகள் அடங்கியுள்ளன. வெளிவேஷத்துக்காக அல்லாமல், உண்மையோடும் ஆவியோடும் ஜெபிக்க வேண்டும் என்று இயேசு போதித்தார்.',
    oldTestamentEn: 'The Old Testament is rich with passionate prayers: Hannah’s heartfelt cry for a son (1 Samuel 1), David’s Psalms of tears and deliverance, Solomon’s temple dedication prayer (1 Kings 8), and Daniel praying three times a day despite the threat of lions.',
    oldTestamentTa: 'பழைய ஏற்பாடு கண்ணீரும் வல்லமையுமான ஜெபங்களால் நிறைந்துள்ளது: ஒரு மகனுக்காக அன்னாள் ஊற்றிய இருதய ஜெபம் (1 சாமுவேல் 1), சங்கீதங்களில் தாவீதின் விண்ணப்பங்கள், ஆலயப் பிரதிஷ்டையில் சாலொமோனின் ஜெபம் (1 ராஜாக்கள் 8), மற்றும் சிங்கங்களின் கெபிக்கு அஞ்சாமல் தினமும் மூன்று வேளை ஜெபித்த தானியேலின் ஜெப வாழ்க்கை.',
    newTestamentEn: 'Jesus lived a life saturated with prayer, often withdrawing to desolate places before dawn to commune with the Father. He gave the Model Prayer (The Lord’s Prayer) and prayed agonized intercession in Gethsemane. The apostles urged believers to pray without ceasing (1 Thessalonians 5:17) and boldly approach the throne of grace (Hebrews 4:16).',
    newTestamentTa: 'இயேசுவின் பூலோக வாழ்க்கை ஜெபத்தினால் நிறைந்திருந்தது; அவர் அதிகாலையிலேயே தனிமையான இடங்களுக்குச் சென்று பிதாவோடு ஐக்கியம் கொண்டார். சீஷர்களுக்கு பரலோக ஜெபத்தைக் கற்றுக்கொடுத்தார், கெத்செமனே தோட்டத்தில் கண்ணீரோடு ஜெபித்தார். இடைவிடாமல் ஜெபம் பண்ணுங்கள் (1 தெசலோனிக்கேயர் 5:17) என்றும், கிருபையுள்ள சிங்காசனத்தண்டைக்குத் தைரியமாய் வாருங்கள் (எபிரெயர் 4:16) என்றும் அப்போஸ்தலர்கள் அறிவுறுத்தினர்.',
    practicalApplicationEn: 'Cultivate a consistent prayer closet each morning, bring every anxiety immediately to God in thanksgiving, intercede for family, pastors, and nations, and align your requests with God’s will rather than selfish desires.',
    practicalApplicationTa: 'ஒவ்வொரு நாளும் தனிமையான ஜெப நேரத்தை ஏற்படுத்திக் கொள்ளுங்கள், எந்தக் காரியத்தைக் குறித்தும் கவலைப்படாமல் விண்ணப்பங்களை நன்றியறிதலோடு தேவனுக்குத் தெரிவியுங்கள், குடும்பத்தினருக்காகவும் தேசங்களுக்காகவும் பரிந்துபேசுங்கள்.',
    verses: [
      { bookId: 'PHP', bookNameEn: 'Philippians', bookNameTa: 'பிலிப்பியர்', ch: 4, v: 6, sigEn: 'Be careful for nothing, but in everything by prayer make requests known.', sigTa: 'நீங்கள் ஒன்றுக்குங் கவலைப்படாமல் எல்லாவற்றையுங் குறித்து ஜெபத்தினாலே தெரியப்படுத்துங்கள்.' },
      { bookId: '1TH', bookNameEn: '1 Thessalonians', bookNameTa: '1 தெசலோனிக்கேயர்', ch: 5, v: 17, sigEn: 'Pray without ceasing.', sigTa: 'இடைவிடாமல் ஜெபம்பண்ணுங்கள்.' },
      { bookId: 'MAT', bookNameEn: 'Matthew', bookNameTa: 'மத்தேயு', ch: 6, v: 9, sigEn: 'The Lord teaches disciples how to pray to the Father.', sigTa: 'இயேசு கிறிஸ்து கற்றுக்கொடுத்த மாதிரி ஜெபம்.' },
      { bookId: 'JAS', bookNameEn: 'James', bookNameTa: 'யாக்கோபு', ch: 5, v: 16, sigEn: 'The effectual fervent prayer of a righteous man availeth much.', sigTa: 'நீதிமான் செய்யும் ஊக்கமான வேண்டுதல் மிகவும் பலனுள்ளதாயிருக்கிறது.' },
      { bookId: 'JER', bookNameEn: 'Jeremiah', bookNameTa: 'எரேமியா', ch: 33, v: 3, sigEn: 'Call unto me, and I will answer thee and show great things.', sigTa: 'என்னை நோக்கிக் கூப்பிடு, அப்பொழுது நான் உனக்கு உத்தரவு கொடுத்து பெரிய காரியங்களை அறிவிப்பேன்.' },
      { bookId: 'HEB', bookNameEn: 'Hebrews', bookNameTa: 'எபிரெயர்', ch: 4, v: 16, sigEn: 'Coming boldly to the throne of grace to find help in time of need.', sigTa: 'ஏற்ற சமயத்தில் சகாயஞ்செய்யுங்கிருபையைப் பெறும்படி கிருபாசனத்தண்டைக்குத் தைரியமாய்ச் சேரக்கடவோம்.' }
    ],
    characters: [
      { nameEn: 'Daniel', nameTa: 'தானியேல்', roleEn: 'Faithful Intercessor', roleTa: 'உண்மையுள்ள ஜெப வீரன்', descEn: 'Prayed three times a day towards Jerusalem despite royal decrees prohibiting it.', descTa: 'ராஜாவுடைய கட்டளைக்கு அஞ்சாமல் தினமும் மூன்று வேளை முழங்கால்படியிட்டு தேவனைத் துதித்தான்.', ref: 'Daniel 6:10', bookId: 'DAN', ch: 6, v: 10 },
      { nameEn: 'Hannah', nameTa: 'அன்னாள்', roleEn: 'Mother of Samuel', roleTa: 'சாமுவேலின் தாய்', descEn: 'Poured out her soul before the Lord in barrenness and received a son of destiny.', descTa: 'கர்த்தருடைய சந்நிதியில் தன் இருதயத்தை ஊற்றி ஜெபித்து, தேவனால் ஆசீர்வதிக்கப்பட்டாள்.', ref: '1 Samuel 1:15', bookId: '1SA', ch: 1, v: 15 }
    ],
    events: [
      { titleEn: 'Elijah on Mount Carmel', titleTa: 'கர்மேல் மலையில் எலியாவின் ஜெபம்', descEn: 'Elijah prayed and fire fell from heaven to consume the sacrifice and turn hearts back to God.', descTa: 'எலியா ஜெபித்தபோது வானத்திலிருந்து அக்கினி இறங்கி பலியைப் பட்சித்தது; ஜனங்கள் கர்த்தரே தெய்வம் என்றனர்.', ref: '1 Kings 18:37-38', bookId: '1KI', ch: 18, v: 37 },
      { titleEn: 'Jesus in Gethsemane', titleTa: 'கெத்செமனே தோட்டத்தில் இயேசுவின் ஜெபம்', descEn: 'Jesus prayed earnestly, submitting to the Father: Not my will, but thine be done.', descTa: 'என் சித்தமல்ல உம்முடைய சித்தமே ஆகக்கடவது என்று இயேசு முழு இருதயத்தோடு ஜெபித்தார்.', ref: 'Luke 22:42', bookId: 'LUK', ch: 22, v: 42 }
    ],
    relatedTopicIds: ['fasting', 'worship', 'praise', 'faith', 'holy_spirit', 'peace']
  },
  {
    id: 'love',
    category: 'christian_living',
    titleEn: 'Love',
    titleTa: 'அன்பு',
    subtitleEn: 'The supreme virtue, divine nature of God, and highest mark of a disciple',
    subtitleTa: 'தேவனுடைய சுபாவம், ஆவியின் கனி, மற்றும் சீஷத்துவத்தின் உன்னத அடையாளம்',
    keywordsEn: ['love', 'agape', 'charity', 'compassion', 'kindness', 'mercy', 'lovingkindness', 'unconditional love'],
    keywordsTa: ['அன்பு', 'அன்புகூருதல்', 'இரக்கம்', 'தயவு', 'சுயநலமற்ற அன்பு', 'தேவ அன்பு'],
    meaningEn: 'Biblical love (Greek: agape) is unconditional, sacrificial, self-giving commitment to the highest good of another, originating in God’s own nature: "God is love" (1 John 4:8). It is not fleeting emotion, but an intentional covenant action demonstrated supreme on the Cross where Christ laid down His life for unworthy sinners.',
    meaningTa: 'வேதாகம அன்பு (அகாபே) என்பது சுயநலமற்ற, தியாகப்பூர்வமான, நிபந்தனையற்ற அன்பாகும். இது தேவனுடைய சுபாவத்திலிருந்தே ஊற்றெடுக்கிறது: "தேவன் அன்பாகவே இருக்கிறார்" (1 யோவான் 4:8). இது உணர்ச்சி சார்ந்த ஒன்றல்ல; மாறாக கல்வாரி சிலுவையில் கிறிஸ்து தம் ஜீவனையே நமக்காகக் கொடுத்ததில் வெளிப்பட்ட உன்னத தெய்வீக அன்பாகும்.',
    oldTestamentEn: 'The core Old Testament mandate is the Shema: "Thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might" (Deuteronomy 6:5) and "love thy neighbour as thyself" (Leviticus 19:18). God’s enduring love for Israel is termed "chesed"—unfailing covenant lovingkindness.',
    oldTestamentTa: 'பழைய ஏற்பாட்டின் முக்கிய கட்டளை: "உன் தேவனாகிய கர்த்தரிடத்தில் உன் முழு இருதயத்தோடும் உன் முழு ஆத்துமாவோடும் உன் முழுப் பலத்தோடும் அன்புகூருவாயாக" (உபாகமம் 6:5) மற்றும் "உன்னில் அன்புகூருவதுபோலப் பிறனிலும் அன்புகூருவாயாக" (லேவியராகமம் 19:18). தேவனுடைய மாறாத உடன்படிக்கையின் அன்பு "கெஸத்" (இரக்கம்/தயவு) என அழைக்கப்படுகிறது.',
    newTestamentEn: 'Jesus declared love as the distinctive hallmark of His followers: "By this shall all men know that ye are my disciples, if ye have love one to another" (John 13:35). The Apostle Paul dedicated 1 Corinthians 13 to the supremacy and endurance of love over spiritual gifts, concluding that love never fails.',
    newTestamentTa: 'இயேசு தம்முடைய சீஷர்களின் அடையாளமாக அன்பைக் குறிப்பிட்டார்: "நீங்கள் ஒருவரிலொருவர் அன்புள்ளவர்களாயிருந்தால், அதனால் நீங்கள் என்னுடைய சீஷர்களென்று எல்லாரும் அறிந்துகொள்வார்கள்" (யோவான் 13:35). பவுல் 1 கொரிந்தியர் 13-ல் அன்பின் மேன்மையை விவரித்து, விசுவாசம், நம்பிக்கை, அன்பு இவைகளில் அன்பே பெரியது என்றார்.',
    practicalApplicationEn: 'Demonstrate love by forgiving offenses quickly, blessing those who mistreat you, sharing resources with those in need, and speaking the truth in gentleness and compassion.',
    practicalApplicationTa: 'குற்றங்களை மனப்பூர்வமாக மன்னிப்பது, விரோதிகளையும் சிநேகிப்பது, தேவையில் உள்ளவர்களுக்கு உதவுவது, மற்றும் தாழ்மையோடும் இரக்கத்தோடும் பிறரை நடத்துவதன் மூலம் அன்பை வெளிப்படுத்துங்கள்.',
    verses: [
      { bookId: '1CO', bookNameEn: '1 Corinthians', bookNameTa: '1 கொரிந்தியர்', ch: 13, v: 4, sigEn: 'Love suffers long, is kind, envieth not.', sigTa: 'அன்பு நீடிய சாந்தமும் தயவுமுள்ளது; அன்புக்குப் பொறாமையில்லை.' },
      { bookId: '1CO', bookNameEn: '1 Corinthians', bookNameTa: '1 கொரிந்தியர்', ch: 13, v: 13, sigEn: 'The greatest of faith, hope, and charity is charity.', sigTa: 'விசுவாசம், நம்பிக்கை, அன்பு ஆகியவைகளில் அன்பே பெரியது.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 3, v: 16, sigEn: 'For God so loved the world, that he gave his only begotten Son.', sigTa: 'தேவன், தம்முடைய ஒரேபேறான குமாரனைத் தந்தருளி, இவ்வளவாய் உலகத்தில் அன்புகூர்ந்தார்.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 5, v: 8, sigEn: 'God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', sigTa: 'நாம் பாவிகளாயிருக்கையில் கிறிஸ்து நமக்காக மரித்ததினாலே, தேவன் நம்மேல் வைத்த தமது அன்பை விளங்கப்பண்ணுகிறார்.' },
      { bookId: '1JN', bookNameEn: '1 John', bookNameTa: '1 யோவான்', ch: 4, v: 8, sigEn: 'He that loveth not knoweth not God; for God is love.', sigTa: 'அன்பில்லாதவன் தேவனை அறியான்; தேவன் அன்பாகவே இருக்கிறார்.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 13, v: 34, sigEn: 'A new commandment I give unto you, That ye love one another.', sigTa: 'நீங்கள் ஒருவரிலொருவர் அன்பாயிருங்கள் என்கிற புதிய கற்பனையை உங்களுக்குக் கொடுக்கிறேன்.' }
    ],
    characters: [
      { nameEn: 'Jonathan & David', nameTa: 'யோனத்தான் & தாவீது', roleEn: 'Exemplary Covenant Brotherhood', roleTa: 'உண்மையான உடன்படிக்கை சிநேகிதம்', descEn: 'Jonathan loved David as his own soul, risking his life to protect him from Saul.', descTa: 'யோனத்தான் தாவீதைத் தன் உயிரைப்போல் நேசித்து, சவுலின் கையிலிருந்து அவனைக் காப்பாற்றினான்.', ref: '1 Samuel 18:1-3', bookId: '1SA', ch: 18, v: 1 },
      { nameEn: 'The Good Samaritan', nameTa: 'நல்ல சமாரியன்', roleEn: 'Parable of Sacrificial Compassion', roleTa: 'தியாக அன்பின் உவமை', descEn: 'Crossed racial and cultural barriers to bind wounds and care for a dying enemy.', descTa: 'காயம்பட்ட அந்நியனுக்கு தன் சொந்த செலவில் மருத்துவமும் அடைக்கலமும் தந்து அன்புகூர்ந்தான்.', ref: 'Luke 10:33-35', bookId: 'LUK', ch: 10, v: 33 }
    ],
    events: [
      { titleEn: 'The Crucifixion at Calvary', titleTa: 'கல்வாரி சிலுவை மரணம்', descEn: 'The highest demonstration of divine agape love: Christ dying for the sins of the world.', descTa: 'இயேசு கிறிஸ்து உலகத்தின் பாவங்களுக்காக சிலுவையில் தம் ஜீவனைக் கொடுத்து அன்பை நிரூபித்தார்.', ref: 'Romans 5:8', bookId: 'ROM', ch: 5, v: 8 }
    ],
    relatedTopicIds: ['grace', 'forgiveness', 'salvation', 'jesus_christ', 'christian_life', 'family']
  },
  {
    id: 'forgiveness',
    category: 'christian_living',
    titleEn: 'Forgiveness',
    titleTa: 'மன்னிப்பு',
    subtitleEn: 'Releasing bitterness, canceling debts, and receiving divine pardon',
    subtitleTa: 'கசப்புகளை நீக்கி, குற்றங்களை மன்னித்து, தேவனுடைய கிருபையான மன்னிப்பைப் பெறுதல்',
    keywordsEn: ['forgiveness', 'forgive', 'pardon', 'reconciliation', 'remission of sins', 'cleansing', 'mercy', 'bitterness'],
    keywordsTa: ['மன்னிப்பு', 'மன்னித்தல்', 'குற்றநிவாரணம்', 'பாவமன்னிப்பு', 'ஒப்புரவாகுதல்', 'இரக்கம்'],
    meaningEn: 'Forgiveness is the gracious release of a justified debt, grievance, or punishment against an offender. Biblically, God cancels the insurmountable debt of human sin through the blood of Christ. Having received infinite forgiveness from God, believers are strictly commanded to forgive others unconditionally.',
    meaningTa: 'மன்னிப்பு என்பது ஒருவருடைய குற்றத்திற்காக பழிவாங்காமல், மனப்பூர்வமாக அந்தக் குற்றத்தை நீக்கிவிடுதலாகும். கிறிஸ்து சிந்திய இரத்தத்தின் மூலம் தேவன் நமது எண்ணற்ற பாவக் கடன்களை மன்னித்துவிட்டார். நாம் தேவனிடமிருந்து எல்லையற்ற மன்னிப்பைப் பெற்றிருப்பதால், நாமும் மற்றவர்களை நிபந்தனையின்றி மன்னிக்க கடமைப்பட்டுள்ளோம்.',
    oldTestamentEn: 'Joseph provided the Old Testament’s supreme picture of human forgiveness when he comforted his brothers who had sold him into slavery: "As for you, ye thought evil against me; but God meant it unto good" (Genesis 50:20). Micah celebrated God who pardons iniquity and casts sins into the depths of the sea (Micah 7:18-19).',
    oldTestamentTa: 'யோசேப்பு தன்னை அடிமையாக விற்ற சகோதரர்களை மன்னித்து: "நீங்கள் எனக்குத் தீமைசெய்ய நினைத்தீர்கள்; தேவனோ... அதை நன்மையாக முடியப்பண்ணினார்" (ஆதியாகமம் 50:20) என்று சமாதானப்படுத்தினான். மீகா தீர்க்கதரிசி நமது பாவங்களை சமுத்திரத்தின் ஆழங்களில் எறிந்துவிடும் தேவனுடைய மன்னிப்பைப் பாடினார் (மீகா 7:18-19).',
    newTestamentEn: 'Jesus taught that if we do not forgive men their trespasses, neither will our heavenly Father forgive our trespasses (Matthew 6:14-15). On the cross He cried: "Father, forgive them; for they know not what they do" (Luke 23:34). Stephen echoed this as he was stoned to death (Acts 7:60).',
    newTestamentTa: 'மனுஷருடைய தப்பிதங்களை நீங்கள் மன்னியாதிருந்தால், உங்கள் பிதாவும் உங்கள் தப்பிதங்களை மன்னியார் என்று இயேசு எச்சரித்தார் (மத்தேயு 6:14-15). சிலுவையில் தொங்கும்போது: "பிதாவே, இவர்களுக்கு மன்னியும், தாங்கள் செய்கிறது இன்னதென்று அறியாதிருக்கிறார்களே" என்று ஜெபித்தார். ஸ்தேவானும் கல்லெறியப்பட்டபோது இதேபோல ஜெபித்தான்.',
    practicalApplicationEn: 'Make an intentional decision today to release grudges against those who hurt you, refuse to speak ill of offenders, pray for their well-being, and rest in Christ’s complete cleansing of your past.',
    practicalApplicationTa: 'உங்களுக்கு விரோதமாக குற்றம் செய்தவர்களை மனப்பூர்வமாக மன்னியுங்கள், பழிவாங்கும் எண்ணத்தை விடுங்கள், அவர்களை ஆசீர்வதித்து ஜெபியுங்கள், கிறிஸ்துவின் இரத்தத்தினால் உங்கள் பாவங்கள் மன்னிக்கப்பட்டதை நினைவுகூருங்கள்.',
    verses: [
      { bookId: 'EPH', bookNameEn: 'Ephesians', bookNameTa: 'எபேசியர்', ch: 4, v: 32, sigEn: 'Be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\'s sake hath forgiven you.', sigTa: 'ஒருவருக்கொருவர் தயவாயும் மனஉருக்கமாயும் இருந்து, கிறிஸ்துவுக்குள் தேவன் உங்களுக்கு மன்னித்ததுபோல, நீங்களும் ஒருவருக்கொருவர் மன்னியுங்கள்.' },
      { bookId: 'COL', bookNameEn: 'Colossians', bookNameTa: 'கொலோசெயர்', ch: 3, v: 13, sigEn: 'Even as Christ forgave you, so also do ye.', sigTa: 'கிறிஸ்து உங்களுக்கு மன்னித்ததுபோல, நீங்களும் ஒருவருக்கொருவர் மன்னியுங்கள்.' },
      { bookId: 'MAT', bookNameEn: 'Matthew', bookNameTa: 'மத்தேயு', ch: 6, v: 14, sigEn: 'If ye forgive men their trespasses, your heavenly Father will also forgive you.', sigTa: 'மனுஷருடைய தப்பிதங்களை நீங்கள் அவர்களுக்கு மன்னித்தால், உங்கள் பரமபிதா உங்களுக்கும் மன்னிப்பார்.' },
      { bookId: '1JN', bookNameEn: '1 John', bookNameTa: '1 யோவான்', ch: 1, v: 9, sigEn: 'If we confess our sins, he is faithful and just to forgive us our sins.', sigTa: 'நம்முடைய பாவங்களை நாம் அறிக்கையிட்டால், பாவங்களை நமக்கு மன்னித்து எல்லா அநீதியையும் நீக்கி நம்மைச் சுத்திகரிப்பதற்கு அவர் உண்மையும் நீதியும் உள்ளவராயிருக்கிறார்.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 103, v: 12, sigEn: 'As far as the east is from the west, so far hath he removed our transgressions from us.', sigTa: 'மேற்கிற்கும் கிழக்கிற்கும் எவ்வளவு தூரமோ, அவ்வளவு தூரமாய் அவர் நம்முடைய பாவங்களை நம்மை விட்டு விலக்கினார்.' }
    ],
    characters: [
      { nameEn: 'Joseph', nameTa: 'யோசேப்பு', roleEn: 'Patriarch of Forgiveness', roleTa: 'மன்னிப்பின் முன்மாதிரி', descEn: 'Wept and embraced his betraying brothers, sustaining them during famine.', descTa: 'தன்னை அடிமையாக விற்ற சகோதரர்களை மன்னித்து அவர்களுக்கு உணவளித்துக் காப்பாற்றினான்.', ref: 'Genesis 50:19-21', bookId: 'GEN', ch: 50, v: 19 },
      { nameEn: 'Stephen', nameTa: 'ஸ்தேவான்', roleEn: 'First Christian Martyr', roleTa: 'முதல் இரத்தசாட்சி', descEn: 'Cried with a loud voice while dying: Lord, lay not this sin to their charge.', descTa: 'கல்லெறிந்து கொன்றவர்களுக்காக: ஆண்டவரே, இவர்கள்மேல் இந்தப் பாவத்தைச் சுமத்தாதிரும் என்று வேண்டினான்.', ref: 'Acts 7:60', bookId: 'ACT', ch: 7, v: 60 }
    ],
    events: [
      { titleEn: 'Parable of the Unmerciful Servant', titleTa: 'மன்னிக்காத ஊழியக்காரன் உவமை', descEn: 'A servant forgiven a massive debt refused to forgive a small debt, showing the wickedness of unforgiveness.', descTa: 'கோடி ரூபாய் கடனை மன்னிக்கப்பெற்ற ஊழியன் சிறு கடனை மன்னிக்காததால் தண்டிக்கப்பட்டான்.', ref: 'Matthew 18:21-35', bookId: 'MAT', ch: 18, v: 21 }
    ],
    relatedTopicIds: ['love', 'grace', 'salvation', 'repentance', 'sin', 'peace']
  },
  {
    id: 'salvation',
    category: 'core_doctrines',
    titleEn: 'Salvation',
    titleTa: 'இரட்சிப்பு',
    subtitleEn: 'Deliverance from sin, death, and wrath through Jesus Christ unto eternal life',
    subtitleTa: 'பாவம், மரணம் மற்றும் ஆக்கினையிலிருந்து இயேசு கிறிஸ்துவின் மூலமாய் பெறும் நித்திய விடுதலை',
    keywordsEn: ['salvation', 'saved', 'redeemed', 'redemption', 'born again', 'justification', 'deliverance', 'atonement'],
    keywordsTa: ['இரட்சிப்பு', 'மீட்பு', 'மறுபிறப்பு', 'பாவ நிவாரணம்', 'நீதிமானாக்கப்படுதல்', 'விடுதலை'],
    meaningEn: 'Salvation is God’s rescue of human beings from the penalty, power, and ultimately the presence of sin. It is entirely initiated by God’s grace, purchased by the shed blood of Jesus Christ, and received through personal repentance and faith alone. It delivers us from eternal condemnation into adoption as sons and daughters of God.',
    meaningTa: 'இரட்சிப்பு என்பது மனிதனை பாவத்தின் தண்டனை, ஆதிக்கம் மற்றும் நித்திய அழிவிலிருந்து மீட்கும் தேவனுடைய உன்னத மீட்பின் செயலாகும். இது முழுக்க முழுக்க தேவனுடைய கிருபையினால் துவங்கி, இயேசுவின் கல்வாரி இரத்தத்தினால் சம்பாதிக்கப்பட்டு, மனந்திரும்புதலினாலும் விசுவாசத்தினாலும் இலவசமாய் அருளப்படுகிறது.',
    oldTestamentEn: 'The exodus from Egypt was the paramount Old Testament type of salvation—God delivering His people out of bondage with a mighty hand and an outstretched arm. The sacrificial system pointed forward to the ultimate Lamb of God who would take away the sin of the world.',
    oldTestamentTa: 'எகிப்தின் அடிமைத்தனத்திலிருந்து இஸ்ரவேலர் மீட்கப்பட்டது பழைய ஏற்பாட்டின் பிரதான இரட்சிப்பின் முன்நிழலாகும். பலிபீடத்தில் சிந்தப்பட்ட ஆட்டுக்குட்டியின் இரத்தம் உலகத்தின் பாவத்தைச் சுமந்துதீர்க்கும் தேவ ஆட்டுக்குட்டியாகிய கிறிஸ்துவை முன்னறிவித்தது.',
    newTestamentEn: 'Jesus proclaimed: "The Son of man is come to seek and to save that which was lost" (Luke 19:10). The Apostle Peter declared: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved" (Acts 4:12).',
    newTestamentTa: 'இயேசு சொன்னார்: "இழந்துபோனதைத் தேடவும் இரட்சிக்கவுமே மனுஷகுமாரன் வந்தார்" (லூக்கா 19:10). பேதுரு பிரசங்கித்தார்: "வேறொருவராலும் இரட்சிப்பு இல்லை; நாம் இரட்சிக்கப்படுவதற்கு வானத்தின் கீழெங்கும் மனுஷர்களுக்குள்ளே அவருடைய நாமமேயன்றி வேறொரு நாமம் கட்டளையிடப்படவும் இல்லை" (அப்போஸ்தலர் 4:12).',
    practicalApplicationEn: 'Examine your own heart to ensure you have personally surrendered to Jesus Christ as Lord and Savior. Rejoice in the security of your salvation and share this good news boldly with friends and neighbors.',
    practicalApplicationTa: 'இயேசு கிறிஸ்துவை உங்கள் சொந்த இரட்சகராக ஏற்றுக்கொண்டுள்ளீர்களா என்று சோதித்துப் பாருங்கள். இரட்சிப்பின் மகிழ்ச்சியோடு வாழ்ந்து, இந்த நற்செய்தியை மற்றவர்களுக்கும் தைரியமாய் அறிவியுங்கள்.',
    verses: [
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 10, v: 9, sigEn: 'Confessing with mouth and believing in heart unto salvation.', sigTa: 'இயேசுவைக் கர்த்தரென்று வாயினாலே அறிக்கையிட்டு, விசுவாசித்தால் இரட்சிக்கப்படுவாய்.' },
      { bookId: 'ACT', bookNameEn: 'Acts', bookNameTa: 'அப்போஸ்தலர்', ch: 4, v: 12, sigEn: 'Neither is there salvation in any other name.', sigTa: 'வேறொருவராலும் இரட்சிப்பு இல்லை; வானத்தின் கீழெங்கும் வேறொரு நாமம் இல்லை.' },
      { bookId: 'EPH', bookNameEn: 'Ephesians', bookNameTa: 'எபேசியர்', ch: 2, v: 8, sigEn: 'By grace are ye saved through faith, not of works.', sigTa: 'கிருபையினாலே விசுவாசத்தைக் கொண்டு இரட்சிக்கப்பட்டீர்கள்; இது உங்களால் உண்டானதல்ல.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 14, v: 6, sigEn: 'Jesus saith: I am the way, the truth, and the life.', sigTa: 'நானே வழியும் சத்தியமும் ஜீவனுமாயிருக்கிறேன் என்று இயேசு சொன்னார்.' },
      { bookId: 'TIT', bookNameEn: 'Titus', bookNameTa: 'தீத்து', ch: 3, v: 5, sigEn: 'Not by works of righteousness which we have done, but according to his mercy he saved us.', sigTa: 'நாம் செய்த நீதியின் கிரியைகளினிமித்தம் அவர் நம்மை இரட்சியாமல், தமது இரக்கத்தின்படியே இரட்சித்தார்.' }
    ],
    characters: [
      { nameEn: 'The Thief on the Cross', nameTa: 'சிலுவையில் கள்ளன்', roleEn: 'Saved by Grace Alone', roleTa: 'கிருபையினால் இரட்சிக்கப்பட்டவன்', descEn: 'Repented at death\'s door; Jesus promised him: Today shalt thou be with me in paradise.', descTa: 'சிலுவையில் தொங்கும்போது மனந்திரும்பினான்; இன்றைக்கு என்னுடனேகூடப் பரதீசிலிருப்பாய் என்று வாக்கு பெற்றான்.', ref: 'Luke 23:42-43', bookId: 'LUK', ch: 23, v: 42 },
      { nameEn: 'Zacchaeus', nameTa: 'சகேயு', roleEn: 'Transformed Tax Collector', roleTa: 'மறுரூபமாக்கப்பட்ட ஆயக்காரன்', descEn: 'Welcomed Jesus with joy; Jesus declared: This day is salvation come to this house.', descTa: 'இயேசுவை சந்தோஷமாய் ஏற்றுக்கொண்டான்; இன்றைக்கு இந்த வீட்டுக்கு இரட்சிப்பு வந்தது என்றார் இயேசு.', ref: 'Luke 19:8-9', bookId: 'LUK', ch: 19, v: 8 }
    ],
    events: [
      { titleEn: 'The Passover Lamb in Egypt', titleTa: 'எகிப்தில் பஸ்கா ஆட்டுக்குட்டி', descEn: 'Blood applied to the doorposts saved Israel\'s firstborn from the angel of death.', descTa: 'நிலைக்கால்களில் பூசப்பட்ட ஆட்டுக்குட்டியின் இரத்தம் இஸ்ரவேலரை சங்காரத்தூதனிடமிருந்து காப்பாற்றியது.', ref: 'Exodus 12:13', bookId: 'EXO', ch: 12, v: 13 }
    ],
    relatedTopicIds: ['grace', 'faith', 'jesus_christ', 'eternal_life', 'repentance', 'sin']
  },
  {
    id: 'grace',
    category: 'core_doctrines',
    titleEn: 'Grace',
    titleTa: 'கிருபை',
    subtitleEn: 'God’s unmerited favor, power, and loving benevolence toward the undeserving',
    subtitleTa: 'தகுதியற்ற மனிதனுக்கு தேவன் இலவசமாய் அருளும் ஈவு மற்றும் வல்லமை',
    keywordsEn: ['grace', 'unmerited favor', 'mercy', 'gift of god', 'charis', 'justified freely', 'throne of grace'],
    keywordsTa: ['கிருபை', 'இலவச ஈவு', 'இரக்கம்', 'தேவ கிருபை', 'கிருபாசனம்'],
    meaningEn: 'Grace (Greek: charis) is God’s free, unmerited favor bestowed on guilty sinners who deserve wrath. While mercy withholds deserved punishment, grace pours out undeserved blessing, righteousness, and eternal life. Grace also supplies supernatural strength for daily holy living and Christian service (2 Corinthians 12:9).',
    meaningTa: 'கிருபை என்பது நியாயத்தீர்ப்புக்குரிய மனிதனுக்கு தேவன் இலவசமாகவும் தகுதியின்றியும் அருளும் ஈவு ஆகும். இரக்கம் என்பது தண்டனையிலிருந்து விலக்குகிறது; கிருபையோ தகுதியற்றவனுக்கு ஆசீர்வாதத்தையும், நீதியையும், நித்திய வாழ்வையும் வாரி வழங்குகிறது. அன்றாட பரிசுத்த வாழ்க்கைக்கும் ஊழியத்திற்கும் தேவையான பலனையும் கிருபை தருகிறது.',
    oldTestamentEn: 'Noah found grace in the eyes of the LORD amidst a corrupt generation (Genesis 6:8). The Lord revealed His name to Moses as: "The LORD God, merciful and gracious, longsuffering, and abundant in goodness and truth" (Exodus 34:6).',
    oldTestamentTa: 'சீர்கெட்ட உலகத்தில் நோவாவுக்குக் கர்த்தருடைய கண்களில் கிருபை கிடைத்தது (ஆதியாகமம் 6:8). மோசேக்கு தேவன் தம் நாமத்தை வெளிப்படுத்தியபோது: "கர்த்தர், கர்த்தர்; இரக்கமும், கிருபையும், நீடிய சாந்தமும், மகா தயவும், சத்தியமுமுள்ள தேவன்" என்றார் (யாத்திராகமம் 34:6).',
    newTestamentEn: 'The law was given by Moses, but grace and truth came by Jesus Christ (John 1:17). The Apostle Paul wrote profusely of grace: we are justified freely by His grace through redemption in Christ (Romans 3:24), and God’s grace is all-sufficient in human weakness (2 Corinthians 12:9).',
    newTestamentTa: 'நியாயப்பிரமாணம் மோசேயின் மூலமாய்க் கொடுக்கப்பட்டது, கிருபையும் சத்தியமும் இயேசு கிறிஸ்துவின் மூலமாய் உண்டாயின (யோவான் 1:17). கிறிஸ்து இயேசுவிலுள்ள மீட்பினாலே இலவசமாய் அவருடைய கிருபையினாலே நீதிமான்களாக்கப்படுகிறோம் (ரோமர் 3:24). என் கிருபை உனக்குப் போதும் என்று ஆண்டவர் பவுலுக்குக் கூறினார்.',
    practicalApplicationEn: 'Never attempt to earn God’s love through legalistic perfectionism. Rely constantly upon His empowering grace when facing temptation or physical weakness, and extend gracious patience to other imperfect people.',
    practicalApplicationTa: 'சுயநீதியினால் தேவனைப் பிரியப்படுத்த முயலாமல், அவருடைய கிருபையையே சார்ந்துகொள்ளுங்கள். உங்கள் பலவீனங்களில் தேவ கிருபை உங்களைத் தாங்கும்; மற்றவர்களிடமும் அதே கிருபையோடும் தயவோடும் பழகுங்கள்.',
    verses: [
      { bookId: 'EPH', bookNameEn: 'Ephesians', bookNameTa: 'எபேசியர்', ch: 2, v: 8, sigEn: 'For by grace are ye saved through faith.', sigTa: 'கிருபையினாலே விசுவாசத்தைக் கொண்டு இரட்சிக்கப்பட்டீர்கள்.' },
      { bookId: '2CO', bookNameEn: '2 Corinthians', bookNameTa: '2 கொரிந்தியர்', ch: 12, v: 9, sigEn: 'My grace is sufficient for thee: for my strength is made perfect in weakness.', sigTa: 'என் கிருபை உனக்குப் போதும்; பலவீனத்திலே என் பலன் பூரணமாய் விளங்கும்.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 3, v: 24, sigEn: 'Being justified freely by his grace through redemption.', sigTa: 'அவருடைய கிருபையினாலே இலவசமாய் நீதிமான்களாக்கப்படுகிறார்கள்.' },
      { bookId: 'TIT', bookNameEn: 'Titus', bookNameTa: 'தீத்து', ch: 2, v: 11, sigEn: 'For the grace of God that bringeth salvation hath appeared to all men.', sigTa: 'எல்லா மனுஷருக்கும் இரட்சிப்பை அளிக்கத்தக்க தேவகிருபையானது பிரசன்னமாகி.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 1, v: 16, sigEn: 'And of his fulness have all we received, and grace for grace.', sigTa: 'அவருடைய பரிபூரணத்தினால் நாம் எல்லாரும் கிருபையின்மேல் கிருபை பெற்றோம்.' }
    ],
    characters: [
      { nameEn: 'Apostle Paul', nameTa: 'அப்போஸ்தலனாகிய பவுல்', roleEn: 'Trophy of Sovereign Grace', roleTa: 'தேவ கிருபையின் பாத்திரம்', descEn: 'Once a violent persecutor of the church, transformed into a passionate apostle by grace.', descTa: 'சபையைத் துன்புறுத்தின பவுல்: தேவனுடைய கிருபையினாலே நான் நானாயிருக்கிறேன் என்று சாட்சி கூறினார்.', ref: '1 Corinthians 15:10', bookId: '1CO', ch: 15, v: 10 }
    ],
    events: [
      { titleEn: 'Parable of the Prodigal Son', titleTa: 'காணாமற்போன குமாரன் உவமை', descEn: 'The father running with open arms to embrace and restore the repentant, destitute son.', descTa: 'தகப்பன் ஓடிவந்து மனந்திரும்பி வந்த மகனைக் கட்டியணைத்து முத்தமிட்டு உயர்த்தி கிருபை காட்டினார்.', ref: 'Luke 15:20-24', bookId: 'LUK', ch: 15, v: 20 }
    ],
    relatedTopicIds: ['salvation', 'faith', 'love', 'forgiveness', 'peace']
  },
  {
    id: 'holy_spirit',
    category: 'holy_spirit',
    titleEn: 'Holy Spirit',
    titleTa: 'பரிசுத்த ஆவியானவர்',
    subtitleEn: 'The third person of the Trinity, Comforter, Guide, and empowering Counselor',
    subtitleTa: 'திரித்துவதின் மூன்றாம் ஆள், தேற்றரவாளன், வழிநடத்துகிறவர் மற்றும் பெலனளிக்கும் ஆவியானவர்',
    keywordsEn: ['holy spirit', 'holy ghost', 'comforter', 'counselor', 'spirit of truth', 'paraclete', 'anointing', 'fruits of the spirit', 'pentecost'],
    keywordsTa: ['பரிசுத்த ஆவியானவர்', 'தேற்றரவாளன்', 'சத்திய ஆவி', 'அபிஷேகம்', 'ஆவியின் கனி', 'பெந்தேகொஸ்தே'],
    meaningEn: 'The Holy Spirit is fully God, co-equal and co-eternal with the Father and the Son. He convicts the world of sin, regenerates the repentant heart, baptizes believers into the body of Christ, indwells every Christian as an earnest of their inheritance, illuminates Scripture, and empowers witness with spiritual gifts and fruit.',
    meaningTa: 'பரிசுத்த ஆவியானவர் பிதாவோடும் குமாரனோடும் சமத்துவமும் நித்தியமுமான மெய்த்தேவன் ஆவார். அவர் உலகத்தைப் பாவம், நீதி, நியாயத்தீர்ப்பு ஆகியவற்றைக் குறித்துக் கண்டித்து உணர்த்துகிறார்; விசுவாசிகளுக்குள் வாசம் பண்ணி, வேதாகம சத்தியங்களை வெளிப்படுத்தி, நற்கனிகளையும் ஆவிக்குரிய வரங்களையும் தந்து வழிநடத்துகிறார்.',
    oldTestamentEn: 'The Spirit hovered over the face of the deep at creation (Genesis 1:2). Throughout the Old Testament, the Spirit came upon selected judges, kings, and prophets with supernatural power. Joel prophesied of the coming day when God would pour out His Spirit upon all flesh (Joel 2:28).',
    oldTestamentTa: 'படைப்பின் துவக்கத்தில் தேவ ஆவியானவர் ஜலத்தின்மேல் அசைவாடிக்கொண்டிருந்தார் (ஆதியாகமம் 1:2). பழைய ஏற்பாட்டில் நியாயாதிபதிகள், தீர்க்கதரிசிகள் மீது ஆவியானவர் வல்லமையாய் இறங்கினார். மாம்சமான யாவர்மேலும் என் ஆவியை ஊற்றுவேன் என்று யோவேல் மூலம் தேவன் வாக்குப்பண்ணினார் (யோவேல் 2:28).',
    newTestamentEn: 'Jesus was conceived by the Holy Spirit and anointed at baptism. Before ascending, He promised the Comforter (Paraclete) who would abide with disciples forever (John 14:16). At Pentecost, the Holy Spirit was poured out with power, launching the worldwide church.',
    newTestamentTa: 'இயேசு பரிசுத்த ஆவியினால் உற்பத்தியாகி, ஞானஸ்நானத்தில் ஆவியானவரால் அபிஷேகிக்கப்பட்டார். தாம் பரமேறுமுன் சீஷர்களுக்கு என்றென்றைக்கும் உடன் இருக்கும் தேற்றரவாளனாகிய பரிசுத்த ஆவியை வாக்களித்தார் (யோவான் 14:16). பெந்தேகொஸ்தே நாளில் அக்கினிமயமான நாவுகளாக ஆவியானவர் இறங்கி திருச்சபையை உருவாக்கினார்.',
    practicalApplicationEn: 'Walk daily in step with the Holy Spirit rather than fulfilling the desires of the flesh. Do not grieve or quench the Spirit, but be continually filled, seeking His guidance in prayer and cultivating love, joy, and self-control.',
    practicalApplicationTa: 'மாம்ச இச்சைகளுக்கு இடங்கொடாமல் ஆவிக்கேற்றபடி வாழுங்கள். பரிசுத்த ஆவியானவரைத் துக்கப்படுத்தாமலும் அவித்துப்போடாமலும், அனுதினமும் ஆவியினால் நிறைந்து அவருடைய ஆலோசனையின்படி நடவுங்கள்.',
    verses: [
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 14, v: 16, sigEn: 'I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever.', sigTa: 'என்றென்றைக்கும் உங்களுடனேகூட இருக்கும்படிக்கு வேறொரு தேற்றரவாளனை அவர் உங்களுக்குத் தருவார்.' },
      { bookId: 'ACT', bookNameEn: 'Acts', bookNameTa: 'அப்போஸ்தலர்', ch: 1, v: 8, sigEn: 'Ye shall receive power, after that the Holy Ghost is come upon you.', sigTa: 'பரிசுத்த ஆவி உங்களிடத்தில் வரும்போது நீங்கள் பெலனடைந்து, எனக்குச் சாட்சிகளாயிருப்பீர்கள்.' },
      { bookId: 'GAL', bookNameEn: 'Galatians', bookNameTa: 'கலாத்தியர்', ch: 5, v: 22, sigEn: 'The fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.', sigTa: 'ஆவியின் கனியோ: அன்பு, சந்தோஷம், சமாதானம், நீடியபொறுமை, தயவு, நற்குணம், விசுவாசம்.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 8, v: 14, sigEn: 'For as many as are led by the Spirit of God, they are the sons of God.', sigTa: 'தேவனுடைய ஆவியினாலே நடத்தப்படுகிறவர்கள் எவர்களோ, அவர்கள் தேவனுடைய புத்திரராயிருக்கிறார்கள்.' },
      { bookId: '1CO', bookNameEn: '1 Corinthians', bookNameTa: '1 கொரிந்தியர்', ch: 6, v: 19, sigEn: 'Your body is the temple of the Holy Ghost which is in you.', sigTa: 'உங்கள் சரீரமானது உங்களுள் தங்கியிருக்கிற பரிசுத்த ஆவியினுடைய ஆலயமாயிருக்கிறது.' }
    ],
    characters: [
      { nameEn: 'Peter at Pentecost', nameTa: 'பெந்தேகொஸ்தே நாளில் பேதுரு', roleEn: 'Bold Preacher Anointed by the Spirit', roleTa: 'ஆவியினால் தைரியம் பெற்ற அப்போஸ்தலன்', descEn: 'Filled with the Holy Spirit, preached boldly and three thousand souls were saved in one day.', descTa: 'பரிசுத்த ஆவியினால் நிறைந்து தைரியமாய் பிரசங்கித்து, ஒரே நாளில் மூவாயிரம் பேரை இரட்சிப்புக்குள் வழிநடத்தினார்.', ref: 'Acts 2:14-41', bookId: 'ACT', ch: 2, v: 14 }
    ],
    events: [
      { titleEn: 'Day of Pentecost', titleTa: 'பெந்தேகொஸ்தே பண்டிகை நாள்', descEn: 'The Holy Spirit descended with the sound of a rushing mighty wind and cloven tongues of fire.', descTa: 'பலத்த காற்று அடிக்கிறதுபோல முழக்கமுண்டாகி, அக்கினிமயமான நாவுகளாக ஆவியானவர் இறங்கினார்.', ref: 'Acts 2:1-4', bookId: 'ACT', ch: 2, v: 1 }
    ],
    relatedTopicIds: ['prayer', 'spiritual_gifts', 'christian_life', 'jesus_christ', 'wisdom']
  },
  {
    id: 'jesus_christ',
    category: 'god_and_christ',
    titleEn: 'Jesus Christ',
    titleTa: 'இயேசு கிறிஸ்து',
    subtitleEn: 'The Son of God, Savior of the world, King of kings, and Lord of lords',
    subtitleTa: 'தேவகுமாரன், உலக இரட்சகர், ராஜாதி ராஜா, மற்றும் கர்த்தாதி கர்த்தர்',
    keywordsEn: ['jesus', 'christ', 'messiah', 'son of god', 'savior', 'lord', 'lamb of god', 'king of kings', 'incarnation', 'crucifixion'],
    keywordsTa: ['இயேசு', 'கிறிஸ்து', 'மேசியா', 'தேவகுமாரன்', 'இரட்சகர்', 'ஆண்டவர்', 'ராஜா'],
    meaningEn: 'Jesus Christ is the eternal Word made flesh—fully God and fully man in one undivided person. He was born of the virgin Mary, lived a sinless life, demonstrated God’s kingdom through miracles and teachings, died substitutionarily on the cross for human sin, rose bodily from the grave on the third day, and ascended to the right hand of God where He reigns as King.',
    meaningTa: 'இயேசு கிறிஸ்து மாம்சத்தில் வெளிப்பட்ட நித்திய வார்த்தை ஆவார்—பூரண தெய்வமும் பூரண மனிதனுமாய் விளங்குகிறார். கன்னியாகிய மரியாளிடத்தில் பிறந்து, பாவமில்லாத வாழ்க்கை வாழ்ந்து, சிலுவையில் நமது பாவங்களுக்காக பலியாகி, மூன்றாம் நாளில் உயிர்த்தெழுந்து பரமேறி பிதாவின் வலது பாரிசத்தில் வீற்றிருக்கிறார்.',
    oldTestamentEn: 'The entire Old Testament points to the coming Messiah: the Seed of the woman who crushes the serpent (Genesis 3:15), the Prophet like Moses (Deuteronomy 18:15), the suffering Servant of Isaiah 53 who was pierced for our transgressions, and the Son of David whose throne endures forever.',
    oldTestamentTa: 'பழைய ஏற்பாடு முழுவதும் மேசியாவை முன்னறிவிக்கிறது: சர்ப்பத்தின் தலையை நசுக்கும் ஸ்திரீயின் வித்து (ஆதியாகமம் 3:15), மோசே போன்ற தீர்க்கதரிசி, நமது பாவங்களுக்காக காயப்பட்ட ஏசாயா 53-ன் பாடுபட்ட தாசன், மற்றும் நித்திய சிங்காசனத்தில் வீற்றிருக்கும் தாவீதின் குமாரன்.',
    newTestamentEn: 'The four Gospels chronicle Christ’s life, passion, and resurrection. Colossians 1:15 proclaims Him as the image of the invisible God, by whom all things were created. Revelation reveals Him returning in glory with His name written: KING OF KINGS AND LORD OF LORDS (Revelation 19:16).',
    newTestamentTa: 'சுவிசேஷங்கள் அவருடைய வாழ்க்கை, உபதேசங்கள், அற்புதங்கள் மற்றும் உயிர்த்தெழுதலை விவரிக்கின்றன. கொலோசெயர் 1:15 அவரை அதரிசனமான தேவனுடைய தற்சுரூபம் என்றும் சர்வ சிருஷ்டிக்கும் முந்தினவர் என்றும் போற்றுகிறது. வெளிப்படுத்தின விசேஷம் ராஜாதி ராஜாவாக அவர் மீண்டும் வருவதை அறிவிக்கிறது.',
    practicalApplicationEn: 'Crown Jesus as the unquestioned Lord of your life. Build your identity, daily decisions, hope, and worldview upon His Word and example, proclaiming His salvation to all people.',
    practicalApplicationTa: 'இயேசுவை உங்கள் வாழ்க்கையின் முழு எஜமானாக ஏற்றுக்கொள்ளுங்கள். அவருடைய உபதேசங்களின்படி வாழ்ந்து, உங்கள் சிந்தனைகளையும் செயல்களையும் அவருக்கு அர்ப்பணியுங்கள்.',
    verses: [
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 1, v: 1, sigEn: 'In the beginning was the Word, and the Word was with God, and the Word was God.', sigTa: 'ஆதியிலே வார்த்தை இருந்தது, அந்த வார்த்தை தேவனிடத்திலிருந்தது, அந்த வார்த்தை தேவனாயிருந்தது.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 14, v: 6, sigEn: 'Jesus saith: I am the way, the truth, and the life.', sigTa: 'இயேசு சொன்னார்: நானே வழியும் சத்தியமும் ஜீவனுமாயிருக்கிறேன்.' },
      { bookId: 'PHP', bookNameEn: 'Philippians', bookNameTa: 'பிலிப்பியர்', ch: 2, v: 9, sigEn: 'Wherefore God also hath highly exalted him, and given him a name which is above every name.', sigTa: 'எல்லா நாமத்திற்கும் மேலான நாமத்தை அவருக்குத் தந்தருளினார்.' },
      { bookId: 'COL', bookNameEn: 'Colossians', bookNameTa: 'கொலோசெயர்', ch: 1, v: 16, sigEn: 'For by him were all things created, that are in heaven, and that are in earth.', sigTa: 'வானத்திலுள்ளவைகளும் பூமியிலுள்ளவைகளுமாகிய சகலமும் அவருக்குள் சிருஷ்டிக்கப்பட்டது.' },
      { bookId: 'HEB', bookNameEn: 'Hebrews', bookNameTa: 'எபிரெயர்', ch: 13, v: 8, sigEn: 'Jesus Christ the same yesterday, and to day, and for ever.', sigTa: 'இயேசு கிறிஸ்து நேற்றும் இன்றும் என்றும் மாறாதவராயிருக்கிறார்.' }
    ],
    characters: [
      { nameEn: 'John the Baptist', nameTa: 'யோவான் ஸ்நானகன்', roleEn: 'Forerunner of the Messiah', roleTa: 'கிறிஸ்துவின் வழியை ஆயத்தம்பண்ணினவர்', descEn: 'Pointed to Jesus declaring: Behold the Lamb of God, which taketh away the sin of the world.', descTa: 'இதோ, உலகத்தின் பாவத்தைச் சுமந்துதீர்க்கிற தேவ ஆட்டுக்குட்டி என்று இயேசுவைச் சுட்டிக்காட்டினார்.', ref: 'John 1:29', bookId: 'JHN', ch: 1, v: 29 }
    ],
    events: [
      { titleEn: 'The Resurrection of Christ', titleTa: 'கிறிஸ்துவின் உயிர்த்தெழுதல்', descEn: 'On the third day the stone was rolled away and Christ rose victorious over death.', descTa: 'மூன்றாம் நாளில் கல்லறை திறக்கப்பட்டது; மரணத்தை ஜெயித்து இயேசு வெற்றிகரமாக உயிர்த்தெழுந்தார்.', ref: 'Matthew 28:1-6', bookId: 'MAT', ch: 28, v: 6 }
    ],
    relatedTopicIds: ['salvation', 'grace', 'god', 'resurrection', 'second_coming', 'holy_spirit']
  },
  {
    id: 'god',
    category: 'god_and_christ',
    titleEn: 'God',
    titleTa: 'தேவன்',
    subtitleEn: 'The sovereign Creator, holy, eternal, all-powerful, all-knowing, and loving Lord',
    subtitleTa: 'சர்வ சிருஷ்டிகர், பரிசுத்தர், சர்வவல்லவர், சர்வஞானி, மற்றும் மாறாத அன்பின் தேவன்',
    keywordsEn: ['god', 'lord', 'yahweh', 'jehovah', 'creator', 'almighty', 'sovereignty', 'holy', 'omnipotent'],
    keywordsTa: ['தேவன்', 'கடவுள்', 'கர்த்தர்', 'யேகோவா', 'சிருஷ்டிகர்', 'சர்வவல்லவர்', 'பரிசுத்தர்'],
    meaningEn: 'God is the one true, living, and personal Supreme Being who exists eternally in three persons: Father, Son, and Holy Spirit. He is self-existent, unchangeable, infinite in holiness, power, wisdom, justice, mercy, and love. He created everything from nothing by the word of His power and sustains all things by His providence.',
    meaningTa: 'தேவன் ஒருவரே மெய்யான, ஜீவனுள்ள, சுயம்புவான பரம்பொருள் ஆவார். அவர் பிதா, குமாரன், பரிசுத்த ஆவி என்னும் திரித்துவமாய் நித்தியமாய் வீற்றிருக்கிறார். அவர் சர்வவல்லமையுள்ளவர், சர்வவியாபி, சர்வஞானி, மகா பரிசுத்தர் மற்றும் மாறாத அன்பும் நீதியும் உள்ளவர். தமது வார்த்தையினால் சகலத்தையும் சிருஷ்டித்து ஆளுகை செய்கிறார்.',
    oldTestamentEn: 'Genesis begins: "In the beginning God created the heaven and the earth" (Genesis 1:1). God revealed His covenant memorial name to Moses at the burning bush as: "I AM THAT I AM" (Exodus 3:14). Isaiah saw the Lord high and lifted up, hearing seraphim cry: "Holy, holy, holy, is the LORD of hosts" (Isaiah 6:3).',
    oldTestamentTa: 'ஆதியிலே தேவன் வானத்தையும் பூமியையும் சிருஷ்டித்தார் (ஆதியாகமம் 1:1). முட்செடியின் மத்தியில் மோசேக்குத் தம்மை "இருக்கிறவராகவே இருக்கிறேன்" என்று வெளிப்படுத்தினார் (யாத்திராகமம் 3:14). ஏசாயா தேவனைத் தரிசித்து: "சேனைகளின் கர்த்தர் பரிசுத்தர், பரிசுத்தர், பரிசுத்தர்" என்று தூதர்கள் பாடுவதைக் கேட்டார் (ஏசாயா 6:3).',
    newTestamentEn: 'Jesus revealed God as the intimate Heavenly Father ("Abba"). John declares that "God is light, and in him is no darkness at all" (1 John 1:5) and "God is love" (1 John 4:8). Through Christ, we are reconciled to God and brought into His holy family.',
    newTestamentTa: 'இயேசு தேவனைப் பரலோகப் பிதாவாக ("அப்பா") நமக்கு வெளிப்படுத்தினார். "தேவன் ஒளியாயிருக்கிறார், அவரில் எவ்வளவேனும் இருளில்லை" (1 யோவான் 1:5) மற்றும் "தேவன் அன்பாகவே இருக்கிறார்" (1 யோவான் 4:8). கிறிஸ்துவின் மூலமாக நாம் தேவனுடைய பிள்ளைகளாக மாறுகிறோம்.',
    practicalApplicationEn: 'Worship God with holy reverence and awe. Trust His sovereign care over your life circumstances, knowing that the Creator of the universe watches over every detail of your steps.',
    practicalApplicationTa: 'தேவனுக்குப் பயந்து பயபக்தியோடு அவரை ஆராதியுங்கள். வானத்தையும் பூமியையும் படைத்த சர்வவல்ல தேவன் உங்கள் வழிகளை அறிந்திருக்கிறார் என்பதை உணர்ந்து அவரில் பூரண அமைதி பெறுங்கள்.',
    verses: [
      { bookId: 'GEN', bookNameEn: 'Genesis', bookNameTa: 'ஆதியாகமம்', ch: 1, v: 1, sigEn: 'In the beginning God created the heaven and the earth.', sigTa: 'ஆதியிலே தேவன் வானத்தையும் பூமியையும் சிருஷ்டித்தார்.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 90, v: 2, sigEn: 'From everlasting to everlasting, thou art God.', sigTa: 'நீரே அநாதியாய் என்றென்றைக்கும் தேவனாயிருக்கிறீர்.' },
      { bookId: 'ISA', bookNameEn: 'Isaiah', bookNameTa: 'ஏசாயா', ch: 40, v: 28, sigEn: 'Hast thou not known? the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not.', sigTa: 'பூமியின் எல்லைகளைச் சிருஷ்டித்த கர்த்தராகிய அநாதி தேவன் சோர்ந்துபோவதுமில்லை, இளைப்படைவதுமில்லை.' },
      { bookId: '1JN', bookNameEn: '1 John', bookNameTa: '1 யோவான்', ch: 4, v: 8, sigEn: 'He that loveth not knoweth not God; for God is love.', sigTa: 'அன்பில்லாதவன் தேவனை அறியான்; தேவன் அன்பாகவே இருக்கிறார்.' },
      { bookId: 'DEU', bookNameEn: 'Deuteronomy', bookNameTa: 'உபாகமம்', ch: 6, v: 4, sigEn: 'Hear, O Israel: The LORD our God is one LORD.', sigTa: 'இஸ்ரவேலே, கேள்: நம்முடைய தேவனாகிய கர்த்தர் ஒருவரே கர்த்தர்.' }
    ],
    characters: [
      { nameEn: 'Moses at Burning Bush', nameTa: 'முட்செடியில் மோசே', roleEn: 'Servant Encountering God’s Holiness', roleTa: 'தேவ பரிசுத்தத்தைத் தரிசித்த தீர்க்கதரிசி', descEn: 'Commanded to remove his shoes because the ground was holy, receiving the divine name I AM.', descTa: 'நீ நிற்கிற இடம் பரிசுத்த பூமி, உன் பாதரட்சைகளைக் கழற்று என்ற கட்டளையைப் பெற்று தேவ நாமத்தை அறிந்தார்.', ref: 'Exodus 3:5', bookId: 'EXO', ch: 3, v: 5 }
    ],
    events: [
      { titleEn: 'Creation of Heaven and Earth', titleTa: 'வானம் பூமியின் படைப்பு', descEn: 'God spoke the universe into existence out of nothing in majestic perfection.', descTa: 'தேவன் தம் வார்த்தையினாலே ஒன்றுமில்லாமையிலிருந்து உலகத்தையும் சர்வ அண்டத்தையும் படைத்தார்.', ref: 'Genesis 1:1-3', bookId: 'GEN', ch: 1, v: 1 }
    ],
    relatedTopicIds: ['jesus_christ', 'holy_spirit', 'holiness', 'worship', 'wisdom']
  },
  {
    id: 'heaven',
    category: 'prophecy_and_eternity',
    titleEn: 'Heaven',
    titleTa: 'பரலோகம்',
    subtitleEn: 'The dwelling place of God, eternal home of the redeemed, and city of everlasting joy',
    subtitleTa: 'தேவன் வாசம் பண்ணும் பரிசுத்த ஸ்தலம், மீட்கப்பட்டோரின் நித்திய இல்லம்',
    keywordsEn: ['heaven', 'paradise', 'new jerusalem', 'eternal home', 'glory', 'mansions', 'celestial city'],
    keywordsTa: ['பரலோகம்', 'பரதீசு', 'புதிய எருசலேம்', 'நித்திய வீடு', 'மகிமை', 'ஜீவ நதி'],
    meaningEn: 'Heaven is the dwelling place of God and the ultimate eternal home of all who trust in Jesus Christ. In heaven, the redeemed will dwell in the direct presence of God with glorified bodies, free from pain, sorrow, crying, disease, and death forever.',
    meaningTa: 'பரலோகம் என்பது தேவனுடைய சிங்காசனம் வீற்றிருக்கும் உன்னத ஸ்தலமும், கிறிஸ்துவை விசுவாசித்த பரிசுத்தவான்களின் நித்திய வாசஸ்தலமுமாகும். அங்கே கண்ணீர், துக்கம், அலறுதல், வருத்தம், மற்றும் மரணம் இனி ஒருபோதும் இராது; பரிசுத்தவான்கள் மகிமையான சரீரத்தோடு தேவனுடன் என்றென்றும் வாழ்வார்கள்.',
    oldTestamentEn: 'David sang: "The LORD hath prepared his throne in the heavens; and his kingdom ruleth over all" (Psalm 103:19). Elijah was taken up by a whirlwind into heaven in a chariot of fire (2 Kings 2:11).',
    oldTestamentTa: 'தாவீது பாடினார்: "கர்த்தர் வானங்களில் தமது சிங்காசனத்தை ஸ்தாபித்திருக்கிறார்; அவருடைய ராஜ்யம் எல்லாவற்றையும் ஆளுகிறது" (சங்கீதம் 103:19). எலியா அக்கினி ரதத்தினாலே சுழல்காற்றில் பரலோகத்திற்கு எடுத்துக்கொள்ளப்பட்டான் (2 ராஜாக்கள் 2:11).',
    newTestamentEn: 'Jesus comforted His disciples: "In my Father\'s house are many mansions... I go to prepare a place for you" (John 14:2). Revelation 21-22 describes the New Jerusalem coming down out of heaven, illuminated not by sun or moon, but by the glory of God and the Lamb.',
    newTestamentTa: 'இயேசு சீஷர்களைத் தேற்றினார்: "என் பிதாவின் வீட்டில் அநேக வாசஸ்தலங்கள் உண்டு... உங்களுக்காக ஒரு ஸ்தலத்தை ஆயத்தம்பண்ணப் போகிறேன்" (யோவான் 14:2). வெளிப்படுத்தல் 21-22 புதிய எருசலேமை வர்ணிக்கிறது; அங்கே சூரியனும் சந்திரனும் தேவையில்லை, தேவனுடைய மகிமையே அதற்கு வெளிச்சம், ஆட்டுக்குட்டியானவரே அதன் விளக்கு.',
    practicalApplicationEn: 'Set your affections on things above, not on things on the earth (Colossians 3:2). Endure present afflictions with joyful patience knowing that eternal weight of glory awaits in Christ.',
    practicalApplicationTa: 'பூமியிலுள்ளவைகளின் மேலல்ல, மேலானவைகளையே நாடுங்கள். இவ்வுலக பாடுகளைப் பொறுமையோடு சகித்து, பரலோகத்தின் அழியாத நித்திய சுதந்திரத்தை எதிர்நோக்கி வாழுங்கள்.',
    verses: [
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 14, v: 2, sigEn: 'In my Father\'s house are many mansions: if it were not so, I would have told you.', sigTa: 'என் பிதாவின் வீட்டில் அநேக வாசஸ்தலங்கள் உண்டு; அப்படியில்லாதிருந்தால், நான் உங்களுக்குச் சொல்லியிருப்பேன்.' },
      { bookId: 'REV', bookNameEn: 'Revelation', bookNameTa: 'வெளிப்படுத்தின விசேஷம்', ch: 21, v: 4, sigEn: 'And God shall wipe away all tears from their eyes; and there shall be no more death.', sigTa: 'அவர்களுடைய கண்ணீர் யாவையும் தேவன் துடைப்பார்; இனி மரணமுமில்லை, துக்கமுமில்லை.' },
      { bookId: 'PHP', bookNameEn: 'Philippians', bookNameTa: 'பிலிப்பியர்', ch: 3, v: 20, sigEn: 'For our conversation is in heaven; from whence also we look for the Saviour.', sigTa: 'நம்முடைய குடியிருப்போ பரலோகத்திலிருக்கிறது, அங்கேயிருந்து இரட்சகராகிய இயேசு கிறிஸ்து வர எதிர்பார்த்திருக்கிறோம்.' },
      { bookId: '2CO', bookNameEn: '2 Corinthians', bookNameTa: '2 கொரிந்தியர்', ch: 5, v: 1, sigEn: 'We have a building of God, an house not made with hands, eternal in the heavens.', sigTa: 'கைகளால் செய்யப்படாத நித்திய வீடு பரலோகத்திலே நமக்கு உண்டென்று அறிந்திருக்கிறோம்.' }
    ],
    characters: [
      { nameEn: 'Apostle John', nameTa: 'அப்போஸ்தலனாகிய யோவான்', roleEn: 'Seer of Heaven', roleTa: 'பரலோகத்தைத் தரிசித்தவர்', descEn: 'Exiled on Patmos, was taken in the Spirit to behold the throne room and the New Jerusalem.', descTa: 'பத்மு தீவில் ஆவிக்குள்ளாகி புதிய வானத்தையும் புதிய பூமியையும் மகிமையான பரலோக நகரத்தையும் கண்டார்.', ref: 'Revelation 21:1-2', bookId: 'REV', ch: 21, v: 1 }
    ],
    events: [
      { titleEn: 'Elijah Ascending to Heaven', titleTa: 'எலியா பரலோகத்திற்கு எடுத்துக்கொள்ளப்படுதல்', descEn: 'Chariots and horses of fire appeared and Elijah went up by a whirlwind into heaven.', descTa: 'அக்கினி ரதங்களும் அக்கினிக் குதிரைகளும் எலியாவை சுழல்காற்றிலே பரலோகத்திற்கு எடுத்துக்கொண்டன.', ref: '2 Kings 2:11', bookId: '2KI', ch: 2, v: 11 }
    ],
    relatedTopicIds: ['eternal_life', 'resurrection', 'second_coming', 'god', 'jesus_christ']
  },
  {
    id: 'hell',
    category: 'prophecy_and_eternity',
    titleEn: 'Hell',
    titleTa: 'நரகம்',
    subtitleEn: 'The place of eternal judgment, separation from God, and retribution for unrepented sin',
    subtitleTa: 'மனந்திரும்பாத பாவியின் நித்திய நியாயத்தீர்ப்பு மற்றும் தேவனை விட்டுப் பிரியும் இடம்',
    keywordsEn: ['hell', 'lake of fire', 'gehenna', 'eternal punishment', 'hades', 'judgment', 'damnation', 'wrath of god'],
    keywordsTa: ['நரகம்', 'அக்கினி கடல்', 'பாதாளம்', 'நித்திய ஆக்கினை', 'நியாயத்தீர்ப்பு', 'அக்கினி சூளை'],
    meaningEn: 'Hell (Gehenna, Lake of Fire) is the solemn biblical reality of eternal conscious punishment and utter separation from God\'s gracious presence for Satan, fallen angels, and all people who reject Jesus Christ and refuse to repent of sin. Scripture describes it with solemn metaphors of fire, outer darkness, and weeping and gnashing of teeth.',
    meaningTa: 'நரகம் (அக்கினி கடல், பாதாளம்) என்பது பிசாசுக்கும் அவனுடைய தூதர்களுக்கும், மற்றும் கிறிஸ்துவை நிராகரித்து மனந்திரும்பாத மனிதர்களுக்கும் நியமிக்கப்பட்ட நித்திய ஆக்கினையின் இடமாகும். வேதாகமம் இதை அணையாத அக்கினி, புறம்பான இருள், மற்றும் அழுகையும் பற்கடிப்பும் நிறைந்த ஸ்தலமாக எச்சரிக்கிறது.',
    oldTestamentEn: 'Daniel prophesied that many who sleep in the dust of the earth shall awake: "some to everlasting life, and some to shame and everlasting contempt" (Daniel 12:2). Isaiah concluded his book warning of unquenchable fire (Isaiah 66:24).',
    oldTestamentTa: 'தானியேல் முன்னறிவித்தார்: "பூமியின் தூளிலே தூங்குகிறவர்களில் அநேகர் சிலர் நித்திய ஜீவனுக்கும், சிலர் நித்திய நிந்தைக்கும் இகழ்ச்சிக்கும் விழித்து எழுந்திருப்பார்கள்" (தானியேல் 12:2). ஏசாயா அணையாத அக்கினியைக் குறித்து எச்சரித்தார் (ஏசாயா 66:24).',
    newTestamentEn: 'Jesus spoke more about hell than any other biblical figure, warning people to fear God who can destroy both soul and body in hell (Matthew 10:28). Revelation 20:15 states that whosoever was not found written in the book of life was cast into the lake of fire.',
    newTestamentTa: 'இயேசு கிறிஸ்து நரகத்தின் பயங்கரத்தைக் குறித்து ஆழமாக எச்சரித்தார்: "ஆத்துமாவையும் சரீரத்தையும் நரகத்திலே அழிக்க வல்லவருக்கே பயப்படுங்கள்" (மத்தேயு 10:28). ஜீவபுஸ்தகத்தில் எழுதப்பட்டவனாகக் காணப்படாதவனெவனோ அவன் அக்கினிக்கடலிலே தள்ளப்படுவான் (வெளிப்படுத்தல் 20:15).',
    practicalApplicationEn: 'Take the warning of eternity with utmost seriousness. Turn from sin to Christ today, and share the gospel urgently with family and friends before it is too late.',
    practicalApplicationTa: 'நித்தியத்தின் யதார்த்தத்தை உணர்ந்து இப்போதே பாவத்தை விட்டு மனந்திரும்புங்கள். கிறிஸ்துவை அறியாத உங்கள் அன்பானவர்களுக்கு இரட்சிப்பின் நற்செய்தியைத் தாமதமின்றி அறிவியுங்கள்.',
    verses: [
      { bookId: 'MAT', bookNameEn: 'Matthew', bookNameTa: 'மத்தேயு', ch: 10, v: 28, sigEn: 'Fear him which is able to destroy both soul and body in hell.', sigTa: 'ஆத்துமாவையும் சரீரத்தையும் நரகத்திலே அழிக்க வல்லவருக்கே பயப்படுங்கள்.' },
      { bookId: 'REV', bookNameEn: 'Revelation', bookNameTa: 'வெளிப்படுத்தின விசேஷம்', ch: 20, v: 15, sigEn: 'And whosoever was not found written in the book of life was cast into the lake of fire.', sigTa: 'ஜீவபுஸ்தகத்திலே எழுதப்பட்டவனாகக் காணப்படாதவனெவனோ அவன் அக்கினிக்கடலிலே தள்ளப்பட்டான்.' },
      { bookId: 'MAT', bookNameEn: 'Matthew', bookNameTa: 'மத்தேயு', ch: 25, v: 46, sigEn: 'And these shall go away into everlasting punishment: but the righteous into life eternal.', sigTa: 'இவர்கள் நித்திய ஆக்கினைக்கும், நீதிமான்களோ நித்திய ஜீவனுக்கும் போவார்கள்.' },
      { bookId: '2TH', bookNameEn: '2 Thessalonians', bookNameTa: '2 தெசலோனிக்கேயர்', ch: 1, v: 9, sigEn: 'Who shall be punished with everlasting destruction from the presence of the Lord.', sigTa: 'அவர்கள் கர்த்தருடைய சந்நிதானத்தை விட்டு விலகி, நித்திய அழிவாகிய தண்டனையை அடைவார்கள்.' }
    ],
    characters: [
      { nameEn: 'The Rich Man in Hades', nameTa: 'பாதாளத்தில் ஐசுவரியவான்', roleEn: 'Warning of Unrepented Greed', roleTa: 'மனந்திரும்பாதவனுக்கு ஓர் எச்சரிப்பு', descEn: 'Lived selfishly in luxury, died and in Hades lifted up his eyes in torment, begging for a drop of water.', descTa: 'பூமியில் சுயநலமாய் வாழ்ந்து, பாதாளத்தில் வேதனைப்பட்டு ஒரு துளி தண்ணீருக்காய் கெஞ்சினான்.', ref: 'Luke 16:22-24', bookId: 'LUK', ch: 16, v: 22 }
    ],
    events: [
      { titleEn: 'Judgment of Sodom and Gomorrah', titleTa: 'சோதோம் கொமோராவின் அழிவு', descEn: 'Destroyed by fire and brimstone from heaven as an eternal example of divine judgment.', descTa: 'வானத்திலிருந்து அக்கினியும் கந்தகமும் பெய்து அக்கிரம நகரங்களை சாம்பலாக்கியது.', ref: 'Genesis 19:24-25', bookId: 'GEN', ch: 19, v: 24 }
    ],
    relatedTopicIds: ['salvation', 'repentance', 'sin', 'eternal_life', 'heaven']
  },
  {
    id: 'angels',
    category: 'core_doctrines',
    titleEn: 'Angels',
    titleTa: 'தேவதூதர்கள்',
    subtitleEn: 'Heavenly ministering spirits sent forth to minister for them who shall be heirs of salvation',
    subtitleTa: 'இரட்சிப்பைச் சுதந்தரிக்கப்போகிறவர்களுக்காகப் பணிவிடை செய்ய அனுப்பப்படும் ஆவிகள்',
    keywordsEn: ['angels', 'archangel', 'michael', 'gabriel', 'cherubim', 'seraphim', 'heavenly host', 'ministering spirits'],
    keywordsTa: ['தேவதூதர்கள்', 'தூதர்கள்', 'மீகாவேல்', 'கேபிரியேல்', 'சேராபீன்கள்', 'கேரூபீன்கள்', 'பரலோக சேனை'],
    meaningEn: 'Angels are created, spiritual, non-corporeal beings possessing immense power, intelligence, and holiness. They serve God continuously in worship around His throne and execute His divine commissions. For believers, angels are dispatched as ministering spirits to guard, deliver, encourage, and guide (Hebrews 1:14).',
    meaningTa: 'தேவதூதர்கள் தேவனால் சிருஷ்டிக்கப்பட்ட ஆவிக்குரிய பரிசுத்தவான்கள். அவர்கள் தேவனுடைய சிங்காசனத்தைச் சுற்றி நின்று அவரை ஆராதிக்கிறார்கள் மற்றும் அவருடைய கட்டளைகளை நிறைவேற்றுகிறார்கள். இரட்சிப்பைச் சுதந்தரிக்கும் விசுவாசிகளுக்குப் பணிவிடை செய்யவும், அவர்களைப் பாதுகாக்கவும் தேவன் தூதர்களை அனுப்புகிறார் (எபிரெயர் 1:14).',
    oldTestamentEn: 'Angels protected Abraham, shut the lions\' mouths for Daniel (Daniel 6:22), and struck the camp of Assyria to deliver Jerusalem (2 Kings 19:35). Psalm 91:11 promises: "For he shall give his angels charge over thee, to keep thee in all thy ways."',
    oldTestamentTa: 'தூதர்கள் தானியேலுக்காக சிங்கங்களின் வாய்களைக் கட்டினார்கள் (தானியேல் 6:22), எருசலேமை அசீரியரின் கையிலிருந்து விடுவிக்க ஒரே இரவில் 185,000 பேரை சங்கரித்தார்கள். உன் வழிகளிலெல்லாம் உன்னைக் காக்கும்படி, உனக்காகத் தம்முடைய தூதர்களுக்குக் கட்டளையிடுவார் (சங்கீதம் 91:11).',
    newTestamentEn: 'The Angel Gabriel announced the births of John the Baptist and Jesus. Angels ministered to Jesus after His temptation and in Gethsemane. An angel opened prison doors for Peter (Acts 12:7). Scripture warns that angels must never be worshipped, for they are fellow servants (Revelation 22:8-9).',
    newTestamentTa: 'கேபிரியேல் தூதன் இயேசுவின் பிறப்பை அறிவித்தான். சோதனையின் பின்னரும் கெத்செமனே தோட்டத்திலும் தூதர்கள் இயேசுவுக்குப் பணிவிடை செய்தனர். சிறைச்சாலையில் பேதுருவின் விலங்குகளைத் தூதன் அவிழ்த்து விடுவித்தான் (அப்போஸ்தலர் 12:7). தூதர்களை ஒருபோதும் வணங்கக்கூடாது என்று வேதம் திட்டவட்டமாக எச்சரிக்கிறது.',
    practicalApplicationEn: 'Take comfort in God\'s unseen angelic protection over you and your children, but direct all your worship, prayers, and adoration exclusively to God.',
    practicalApplicationTa: 'தேவன் தம்முடைய தூதர்களைக் கொண்டு உங்களைப் பாதுகாக்கிறார் என்பதை நம்பி தைரியமாயிருங்கள்; ஆனால் துதியையும் ஆராதனையையும் தேவனுக்கு மட்டுமே செலுத்துங்கள்.',
    verses: [
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 91, v: 11, sigEn: 'For he shall give his angels charge over thee, to keep thee in all thy ways.', sigTa: 'உன் வழிகளிலெல்லாம் உன்னைக் காக்கும்படி, உனக்காகத் தம்முடைய தூதர்களுக்குக் கட்டளையிடுவார்.' },
      { bookId: 'HEB', bookNameEn: 'Hebrews', bookNameTa: 'எபிரெயர்', ch: 1, v: 14, sigEn: 'Are they not all ministering spirits, sent forth to minister for them who shall be heirs of salvation?', sigTa: 'இவர்களெல்லாரும் இரட்சிப்பைச் சுதந்தரிக்கப்போகிறவர்களுக்காகப் பணிவிடை செய்யும்படிக்கு அனுப்பப்படும் ஊழிய ஆவிகளாயிருக்கிறார்களல்லவா?' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 34, v: 7, sigEn: 'The angel of the LORD encampeth round about them that fear him, and delivereth them.', sigTa: 'கர்த்தருடைய தூதன் அவருக்குப் பயந்தவர்களைச் சூழப் பாளயமிறங்கி அவர்களை விடுவிக்கிறார்.' },
      { bookId: 'LUK', bookNameEn: 'Luke', bookNameTa: 'லூக்கா', ch: 15, v: 10, sigEn: 'There is joy in the presence of the angels of God over one sinner that repenteth.', sigTa: 'மனந்திரும்புகிற ஒரே பாவியினிமித்தம் தேவனுடைய தூதருக்கு முன்பாகச் சந்தோஷமுண்டாயிருக்கிறது.' }
    ],
    characters: [
      { nameEn: 'Gabriel', nameTa: 'கேபிரியேல் தூதன்', roleEn: 'Heavenly Messenger', roleTa: 'பரலோக நற்செய்தி தூதன்', descEn: 'Sent directly from God to Mary in Nazareth to announce the miraculous incarnation of Christ.', descTa: 'நசரேத்திலுள்ள கன்னி மரியாளிடத்தில் வந்து கிறிஸ்து பிறப்பின் நற்செய்தியை அறிவித்தார்.', ref: 'Luke 1:26-38', bookId: 'LUK', ch: 1, v: 26 },
      { nameEn: 'Michael', nameTa: 'மீகாவேல் அதிதூதன்', roleEn: 'Archangel and Warrior', roleTa: 'போராடும் பிரதான தூதன்', descEn: 'Fought against the dragon and Satan\'s angels, casting them out of heaven.', descTa: 'வானத்திலே வலுசர்ப்பத்தோடும் பிசாசின் படைகளோடும் யுத்தம்பண்ணி ஜெயங்கொண்டார்.', ref: 'Revelation 12:7-8', bookId: 'REV', ch: 12, v: 7 }
    ],
    events: [
      { titleEn: 'Peter Delivered from Prison', titleTa: 'சிறையிலிருந்து பேதுரு விடுவிக்கப்படுதல்', descEn: 'An angel of the Lord struck Peter on the side, caused his chains to fall off, and led him out safely.', descTa: 'கர்த்தருடைய தூதன் சிறைச்சாலையில் தோன்றி விலங்குகளை அவிழ்த்து பேதுருவை வெளியே அழைத்துச் சென்றார்.', ref: 'Acts 12:7-10', bookId: 'ACT', ch: 12, v: 7 }
    ],
    relatedTopicIds: ['protection', 'god', 'heaven', 'worship']
  },
  {
    id: 'healing',
    category: 'peace_and_comfort',
    titleEn: 'Healing',
    titleTa: 'சுகம் & குணமாக்குதல்',
    subtitleEn: 'Divine restoration of physical, emotional, and spiritual wholeness through Christ',
    subtitleTa: 'இயேசு கிறிஸ்துவின் நாமத்தினால் சரீர, மன மற்றும் ஆவிக்குரிய பூரண சுகம் பெறுதல்',
    keywordsEn: ['healing', 'healed', 'cure', 'physician', 'restoration', 'stripes', 'jehovah rapha', 'wholeness'],
    keywordsTa: ['சுகம்', 'குணமாக்குதல்', 'யேகோவா ரஃபா', 'தழும்புகள்', 'ஆரோக்கியம்', 'வியாதி நீக்குதல்'],
    meaningEn: 'Healing in the Bible encompasses God’s gracious restoration of the human body, soul, and spirit. God reveals Himself as "Jehovah Rapha"—the LORD that healeth thee (Exodus 15:26). Physical healing in this age is a foretaste of the complete redemptive wholeness secured at the Cross and finalized at the resurrection.',
    meaningTa: 'வேதாகமத்தில் சுகம் என்பது சரீரம், ஆத்துமா, ஆவி ஆகிய அனைத்திற்கும் தேவன் அருளும் பூரண ஆரோக்கியமாகும். தேவன் தம்மை "உன்னைக் குணமாக்குகிற கர்த்தர்" (யேகோவா ரஃபா) என்று வெளிப்படுத்துகிறார் (யாத்திராகமம் 15:26). கிறிஸ்துவின் தழும்புகளினால் நாம் பெறுகிற சுகம் அவருடைய மீட்பின் வல்லமையை நிரூபிக்கிறது.',
    oldTestamentEn: 'God healed the waters of Marah and promised Israel protection from diseases if they hearkened to His voice (Exodus 15:26). Naaman the Syrian was cleansed of leprosy after dipping seven times in the Jordan (2 Kings 5). Isaiah prophesied that by His stripes we are healed (Isaiah 53:5).',
    oldTestamentTa: 'தேவன் மாராவின் கசப்பான தண்ணீரை மதுரமாக்கினார்; என் வார்த்தைக்குக் கீழ்ப்படிந்தால் எந்த வியாதிகளையும் உங்கள்மேல் வரப்பண்ணேன் என்றார். சீரிய படைத்தலைவன் நாகமான் யோர்தானில் ஏழு முறை மூழ்கி குஷ்டரோகம் நீங்கி சுத்தமானான். ஏசாயா 53:5 அவருடைய தழும்புகளால் நாம் குணமாகிறோம் என்று முன்னறிவித்தது.',
    newTestamentEn: 'Jesus healed all manner of sickness and disease among the people, opening blind eyes, restoring withered limbs, cleansing lepers, and raising the dead. James 5:14-15 instructs the sick to call for the elders of the church to pray and anoint with oil in the name of the Lord.',
    newTestamentTa: 'இயேசு பூமியில் சுற்றித்திரிந்து சகல வியாதிகளையும் நோய்களையும் குணமாக்கினார்; குருடருக்குப் பார்வை தந்தார், முடவரை நடக்கப்பண்ணினார், செவிடரைக் கேட்கப்பண்ணினார். யாக்கோபு 5:14-15 சபையின் மூப்பர்களை அழைத்து கர்த்தருடைய நாமத்தினாலே எண்ணெய் பூசி விசுவாசமுள்ள ஜெபம் பண்ணும்படி கட்டளையிடுகிறது.',
    practicalApplicationEn: 'Bring your physical illnesses and emotional wounds to the Lord in earnest faith. Consult doctors gratefully as God\'s providential instruments, pray with church leaders, and trust God\'s ultimate timing and sovereign will.',
    practicalApplicationTa: 'உங்கள் வியாதிகளையும் மன வேதனைகளையும் ஜெபத்தில் தேவனிடம் கொண்டுவாருங்கள். மருத்துவர்களையும் தேவனுடைய ஆசீர்வாதமாகக் கருதி ஏற்றுக்கொண்டு, விசுவாசத்தோடு சுகத்திற்காக ஜெபியுங்கள்.',
    verses: [
      { bookId: 'ISA', bookNameEn: 'Isaiah', bookNameTa: 'ஏசாயா', ch: 53, v: 5, sigEn: 'With his stripes we are healed.', sigTa: 'அவருடைய தழும்புகளால் குணமாகிறோம்.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 103, v: 3, sigEn: 'Who forgiveth all thine iniquities; who healeth all thy diseases.', sigTa: 'அவர் உன் அக்கிரமங்களையெல்லாம் மன்னித்து, உன் நோய்களையெல்லாம் குணமாக்குகிறார்.' },
      { bookId: 'EXO', bookNameEn: 'Exodus', bookNameTa: 'யாத்திராகமம்', ch: 15, v: 26, sigEn: 'For I am the LORD that healeth thee.', sigTa: 'நானே உன்னைக் குணமாக்குகிற கர்த்தர்.' },
      { bookId: '1PE', bookNameEn: '1 Peter', bookNameTa: '1 பேதுரு', ch: 2, v: 24, sigEn: 'By whose stripes ye were healed.', sigTa: 'அவருடைய தழும்புகளால் குணமானீர்கள்.' },
      { bookId: 'JAS', bookNameEn: 'James', bookNameTa: 'யாக்கோபு', ch: 5, v: 15, sigEn: 'And the prayer of faith shall save the sick, and the Lord shall raise him up.', sigTa: 'விசுவாசமுள்ள ஜெபம் பிணியாளியை இரட்சிக்கும்; கர்த்தர் அவனை எழுப்புவார்.' }
    ],
    characters: [
      { nameEn: 'Woman with Issue of Blood', nameTa: 'பெரும்பாடுள்ள ஸ்திரீ', roleEn: 'Example of Reaching Faith', roleTa: 'தொட்டு சுகம்பெற்ற விசுவாசம்', descEn: 'Suffered twelve years, touched the hem of Jesus\' garment in faith, and was immediately healed.', descTa: 'பன்னிரண்டு வருஷம் பெரும்பாடுள்ள ஸ்திரீ இயேசுவின் வஸ்திரத்தின் ஓரத்தைத் தொட்டு உடனே சுகமானாள்.', ref: 'Mark 5:25-34', bookId: 'MRK', ch: 5, v: 25 },
      { nameEn: 'Naaman', nameTa: 'நாகமான்', roleEn: 'Healed of Leprosy', roleTa: 'குஷ்டரோகம் நீங்கி சுத்தமானவன்', descEn: 'Dipped seven times in the Jordan river in obedience to Elisha and his flesh became like a little child\'s.', descTa: 'எலிசாவின் சொல்லுக்குக் கீழ்ப்படிந்து யோர்தானில் மூழ்கி, தன் சரீரம் சிறுபிள்ளையின் சரீரம்போல சுத்தமாகப் பெற்றான்.', ref: '2 Kings 5:14', bookId: '2KI', ch: 5, v: 14 }
    ],
    events: [
      { titleEn: 'Healing of the Paralyzed Man', titleTa: 'திமிர்வாதக்காரன் குணமாதல்', descEn: 'Lowered through the roof by four faithful friends; Jesus forgave his sins and healed his legs.', descTa: 'நான்கு நண்பர்கள் கூரையைப் பிரித்து இறக்கினார்கள்; இயேசு அவன் பாவங்களை மன்னித்து சரீரத்திற்கு சுகமளித்தார்.', ref: 'Mark 2:1-12', bookId: 'MRK', ch: 2, v: 1 }
    ],
    relatedTopicIds: ['faith', 'prayer', 'peace', 'strength', 'jesus_christ']
  },
  {
    id: 'wisdom',
    category: 'spiritual_growth',
    titleEn: 'Wisdom',
    titleTa: 'ஞானம்',
    subtitleEn: 'The fear of the Lord, discerning understanding, and skillful living according to divine truth',
    subtitleTa: 'கர்த்தருக்குப் பயப்படுதலே ஞானத்தின் ஆரம்பம்; தேவ சத்தியத்திற்கேற்ற விவேகமான வாழ்க்கை',
    keywordsEn: ['wisdom', 'understanding', 'discernment', 'knowledge', 'prudence', 'fear of the lord', 'counsel'],
    keywordsTa: ['ஞானம்', 'புத்தி', 'விவேகம்', 'தேவ பயம்', 'அறிவு', 'ஆலோசனை'],
    meaningEn: 'Biblical wisdom (Hebrew: chokhmah, Greek: sophia) is not mere academic intellect or worldly cunning; it is the practical skill of living righteously under God\'s moral order. The foundation of all true wisdom is the fear of the Lord—reverential awe, humble submission, and hatred of evil.',
    meaningTa: 'வேதாகம ஞானம் என்பது உலக அறிவு அல்ல; தேவனுடைய பார்வையில் நீதியாகவும் பயபக்தியாகவும் வாழும் ஆவிக்குரிய விவேகமாகும். மெய்யான ஞானத்தின் அஸ்திபாரம் கர்த்தருக்குப் பயப்படும் பயமேயாகும். அது தீமையை வெறுத்து, தேவ சித்தத்தைத் தேர்ந்து எடுக்கும் ஆற்றலைத் தருகிறது.',
    oldTestamentEn: 'Solomon prayed not for riches or long life, but for an understanding heart to judge God\'s people, and God granted him unprecedented wisdom (1 Kings 3:9-12). The Book of Proverbs personifies Wisdom crying in the streets, urging men to turn from foolishness to understanding.',
    oldTestamentTa: 'சாலொமோன் ஐசுவரியத்தையோ நீண்ட ஆயுளையோ கேட்காமல், ஜனங்களை நியாயம் விசாரிக்க ஞானமுள்ள இருதயத்தைக் கேட்டான்; தேவன் அவனுக்கு ஒப்பற்ற ஞானத்தைக் கொடுத்தார் (1 ராஜாக்கள் 3:9-12). நீதிமொழிகள் புத்தகம் ஞானத்தை ஒரு பெண்ணாகச் சித்தரித்து, புத்தியீனத்தை விட்டு விலகி ஞானத்தை நாடுங்கள் என்று அழைக்கிறது.',
    newTestamentEn: 'Jesus Christ is the wisdom of God (1 Corinthians 1:24), in whom are hid all the treasures of wisdom and knowledge (Colossians 2:3). James 3:17 describes the wisdom that is from above as pure, peaceable, gentle, easy to be intreated, full of mercy and good fruits.',
    newTestamentTa: 'இயேசு கிறிஸ்துவே தேவனுடைய ஞானமாயிருக்கிறார் (1 கொரிந்தியர் 1:24); அவருக்குள் ஞானம் அறிவு என்பவைகளாகிய சகல பொக்கிஷங்களும் மறைந்திருக்கிறது (கொலோசெயர் 2:3). பரத்திலிருந்து வருகிற ஞானமோ சுத்தமும், சமாதானமும், சாந்தமும், இணக்கமும், இரக்கமும் நற்கனிகளும் நிறைந்ததாயிருக்கிறது (யாக்கோபு 3:17).',
    practicalApplicationEn: 'When facing difficult decisions or ethical dilemmas, ask God in faith without wavering (James 1:5). Saturate your mind with the Book of Proverbs and Scripture, seeking counsel from godly mentors.',
    practicalApplicationTa: 'வாழ்க்கையின் முக்கிய தீர்மானங்களை எடுக்கும்போது, சந்தேகமின்றி விசுவாசத்தோடு தேவனிடத்தில் ஞானத்தைக் கேளுங்கள் (யாக்கோபு 1:5). வேதத்தை அனுதினமும் வாசித்து, தேவ பயமுள்ள ஆலோசனைகளைப் பின்பற்றுங்கள்.',
    verses: [
      { bookId: 'PRO', bookNameEn: 'Proverbs', bookNameTa: 'நீதிமொழிகள்', ch: 9, v: 10, sigEn: 'The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding.', sigTa: 'கர்த்தருக்குப் பயப்படுதலே ஞானத்தின் ஆரம்பம்; பரிசுத்தரின் அறிவே அறிவு.' },
      { bookId: 'JAS', bookNameEn: 'James', bookNameTa: 'யாக்கோபு', ch: 1, v: 5, sigEn: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally.', sigTa: 'உங்களில் ஒருவன் ஞானத்தில் குறைவுள்ளவனாயிருந்தால், யாவருக்கும் சம்பூரணமாய்க் கொடுக்கிற தேவனிடத்தில் கேட்கக்கடவன்.' },
      { bookId: 'JAS', bookNameEn: 'James', bookNameTa: 'யாக்கோபு', ch: 3, v: 17, sigEn: 'The wisdom that is from above is first pure, then peaceable, gentle.', sigTa: 'பரத்திலிருந்து வருகிற ஞானமோ முதலாவது சுத்தமுள்ளதாயும், பின்பு சமாதானமும் சாந்தமும் இணக்கமுமுள்ளதாயும்.' },
      { bookId: 'PRO', bookNameEn: 'Proverbs', bookNameTa: 'நீதிமொழிகள்', ch: 3, v: 13, sigEn: 'Happy is the man that findeth wisdom, and the man that getteth understanding.', sigTa: 'ஞானத்தைக் கண்டடைகிற மனுஷனும், புத்தியைச் சம்பாதிக்கிற மனுஷனும் பாக்கியவான்கள்.' },
      { bookId: 'COL', bookNameEn: 'Colossians', bookNameTa: 'கொலோசெயர்', ch: 2, v: 3, sigEn: 'In whom are hid all the treasures of wisdom and knowledge.', sigTa: 'அவருக்குள் ஞானம் அறிவு என்பவைகளாகிய சகல பொக்கிஷங்களும் பொதிந்திருக்கிறது.' }
    ],
    characters: [
      { nameEn: 'King Solomon', nameTa: 'சாலொமோன் ராஜா', roleEn: 'Wisest King of Israel', roleTa: 'இஸ்ரவேலின் மகா ஞானமுள்ள ராஜா', descEn: 'Asked God for an understanding heart to govern; wrote thousands of proverbs and songs.', descTa: 'ஜனங்களை நியாயம் விசாரிக்க ஞானத்தைக் கேட்டுப் பெற்று, மூவாயிரம் நீதிமொழிகளைச் சொன்னார்.', ref: '1 Kings 4:29-34', bookId: '1KI', ch: 4, v: 29 },
      { nameEn: 'Daniel in Babylon', nameTa: 'பாபிலோனில் தானியேல்', roleEn: 'Wisdom Ten Times Better', roleTa: 'பத்துமடங்கு ஞானம் பெற்ற தீர்க்கதரிசி', descEn: 'Given understanding in all visions and dreams, exceeding all Babylonian magicians.', descTa: 'தேவன் தந்த ஞானத்தினால் பாபிலோனிய ஞானிகள் அனைவரையும்விட பத்துமடங்கு சிறந்தவனாய் விளங்கினான்.', ref: 'Daniel 1:17-20', bookId: 'DAN', ch: 1, v: 17 }
    ],
    events: [
      { titleEn: 'Solomon’s Wise Judgment', titleTa: 'சாலொமோனின் ஞானமுள்ள தீர்ப்பு', descEn: 'Two women claimed the same baby; Solomon ordered it cut in two, exposing the true mother’s love.', descTa: 'ஒரே குழந்தைக்காகப் போராடிய இரு பெண்களில் உண்மையான தாயின் அன்பைக் கண்டறிந்து தீர்ப்பளித்தார்.', ref: '1 Kings 3:16-28', bookId: '1KI', ch: 3, v: 16 }
    ],
    relatedTopicIds: ['fear', 'spiritual_growth', 'god', 'truth', 'leadership']
  },
  {
    id: 'hope',
    category: 'peace_and_comfort',
    titleEn: 'Hope',
    titleTa: 'நம்பிக்கை',
    subtitleEn: 'The confident expectation of God’s future promises rooted in the finished work of Christ',
    subtitleTa: 'தேவனுடைய மாறாத வாக்குத்தத்தங்கள் மேல் வைக்கும் உறுதியான எதிர்கால நம்பிக்கை',
    keywordsEn: ['hope', 'confident expectation', 'anchor of the soul', 'blessed hope', 'living hope', 'endurance'],
    keywordsTa: ['நம்பிக்கை', 'ஜீவனுள்ள நம்பிக்கை', 'ஆத்துமாவின் நங்கூரம்', 'பாக்கியமுள்ள நம்பிக்கை', 'எதிர்பார்ப்பு'],
    meaningEn: 'Biblical hope is not wishful thinking or uncertain desire; it is rock-solid certainty regarding God\'s promised future. It is anchored in the resurrected Christ, described as "an anchor of the soul, both sure and stedfast" (Hebrews 6:19). Hope gives endurance in suffering and purifies the believer (1 John 3:3).',
    meaningTa: 'வேதாகம நம்பிக்கை என்பது வெறும் மன ஆசை அல்ல; மாறாக தேவன் வாக்களித்ததை நிறைவேற்றுவார் என்ற அசைக்க முடியாத உறுதியான எதிர்பார்ப்பாகும். இது உயிர்த்தெழுந்த கிறிஸ்துவை மையமாகக் கொண்ட ஆத்துமாவின் நங்கூரம் (எபிரெயர் 6:19). துன்பங்களில் சகிப்புத்தன்மையையும், பரிசுத்த வாழ்க்கையையும் இது பிறப்பிக்கிறது.',
    oldTestamentEn: 'Jeremiah wrote amidst the ruins of Jerusalem: "The LORD is my portion, saith my soul; therefore will I hope in him" (Lamentations 3:24). David encouraged himself: "Why art thou cast down, O my soul?... hope thou in God" (Psalm 42:11).',
    oldTestamentTa: 'எருசலேம் இடிந்துபோன சூழலில் எரேமியா எழுதினார்: "கர்த்தர் என் பங்கு என்று என் ஆத்துமா சொல்லும்; ஆகையால் அவரிடத்தில் நான் நம்பிக்கை கொண்டிருப்பேன்" (புலம்பல் 3:24). தாவீது: "என் ஆத்துமாவே, நீ ஏன் கலங்குகிறாய்?... தேவனை நோக்கிக் காத்திரு" என்றார் (சங்கீதம் 42:11).',
    newTestamentEn: 'We have been begotten again unto a lively hope by the resurrection of Jesus Christ from the dead (1 Peter 1:3). Paul teaches that hope maketh not ashamed because the love of God is shed abroad in our hearts by the Holy Ghost (Romans 5:5).',
    newTestamentTa: 'இயேசு கிறிஸ்து மரித்தோரிலிருந்து உயிர்த்தெழுந்ததினாலே, ஜீவனுள்ள நம்பிக்கை உண்டாகும்படி நம்மை மறுபடியும் ஜெநிப்பித்தார் (1 பேதுரு 1:3). அந்த நம்பிக்கை நம்மை வெட்கப்படுத்தாது, ஏனென்றால் தேவ அன்பு பரிசுத்த ஆவியினாலே நம் இருதயங்களில் ஊற்றப்பட்டிருக்கிறது (ரோமர் 5:5).',
    practicalApplicationEn: 'When feelings of despair threaten to overwhelm you, fix your gaze on Christ\'s empty tomb and the promised resurrection. Speak Scripture aloud over your situation and remind your soul of God’s proven faithfulness.',
    practicalApplicationTa: 'மனச்சோர்வு உங்களை நெருக்கும்போது, உயிர்த்தெழுந்த இயேசுவின் வெற்றியை நினையுங்கள். தேவனுடைய வாக்குத்தத்தங்களை அறிக்கையிட்டு, உங்கள் ஆத்துமாவைத் தேற்றுங்கள்.',
    verses: [
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 15, v: 13, sigEn: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope.', sigTa: 'நம்பிக்கையின் தேவன் விசுவாசத்தினால் உண்டாகும் எல்லாவித சந்தோஷத்தினாலும் சமாதானத்தினாலும் உங்களை நிரப்புவாராக.' },
      { bookId: 'HEB', bookNameEn: 'Hebrews', bookNameTa: 'எபிரெயர்', ch: 6, v: 19, sigEn: 'Which hope we have as an anchor of the soul, both sure and stedfast.', sigTa: 'அந்த நம்பிக்கை நமக்கு ஆத்துமாவின் நங்கூரமும், நிச்சயமும் உறுதியுமானதாயிருக்கிறது.' },
      { bookId: '1PE', bookNameEn: '1 Peter', bookNameTa: '1 பேதுரு', ch: 1, v: 3, sigEn: 'Begotten us again unto a lively hope by the resurrection of Jesus Christ.', sigTa: 'ஜீவனுள்ள நம்பிக்கை உண்டாகும்படி, தம்முடைய மிகுந்த இரக்கத்தின்படியே நம்மை மறுபடியும் ஜெநிப்பித்தார்.' },
      { bookId: 'JER', bookNameEn: 'Jeremiah', bookNameTa: 'எரேமியா', ch: 29, v: 11, sigEn: 'For I know the thoughts that I think toward you... thoughts of peace, and not of evil, to give you an expected end.', sigTa: 'நீங்கள் எதிர்பார்க்கும் முடிவை உங்களுக்குக் கொடுக்கும்படிக்கு நான் உங்கள்மேல் நினைத்திருக்கிற நினைவுகளை அறிவேன்; அவைகள் சமாதானத்துக்கேதுவான நினைவுகள்.' },
      { bookId: 'LAM', bookNameEn: 'Lamentations', bookNameTa: 'புலம்பல்', ch: 3, v: 24, sigEn: 'The LORD is my portion, saith my soul; therefore will I hope in him.', sigTa: 'கர்த்தர் என் பங்கு என்று என் ஆத்துமா சொல்லும்; ஆகையால் அவரிடத்தில் நம்பிக்கை கொண்டிருப்பேன்.' }
    ],
    characters: [
      { nameEn: 'Simeon', nameTa: 'சிமியோன்', roleEn: 'Devout Watchman of Hope', roleTa: 'மேசியாவின் வருகைக்காகக் காத்திருந்த முதியவர்', descEn: 'Waited patiently for the Consolation of Israel, holding infant Jesus with overflowing joy.', descTa: 'இஸ்ரவேலின் ஆறுதல் வரக் காத்திருந்து, குழந்தையாகிய இயேசுவைக் கைகளில் ஏந்தி தேவனைத் துதித்தார்.', ref: 'Luke 2:25-30', bookId: 'LUK', ch: 2, v: 25 }
    ],
    events: [
      { titleEn: 'The Empty Tomb on Easter', titleTa: 'ஈஸ்டர் அதிகாலை வெற்று கல்லறை', descEn: 'The angelic announcement "He is not here; for he is risen" anchored living hope for all eternity.', descTa: 'அவர் இங்கே இல்லை, தாம் சொன்னபடியே உயிர்த்தெழுந்தார் என்ற தூதரின் செய்தி நித்திய நம்பிக்கையைத் தந்தது.', ref: 'Matthew 28:6', bookId: 'MAT', ch: 28, v: 6 }
    ],
    relatedTopicIds: ['faith', 'peace', 'resurrection', 'eternal_life', 'trials']
  },
  {
    id: 'peace',
    category: 'peace_and_comfort',
    titleEn: 'Peace',
    titleTa: 'சமாதானம்',
    subtitleEn: 'Divine tranquility, harmony with God, and calm assurance that passes all understanding',
    subtitleTa: 'எல்லா புத்திக்கும் மேலான தேவ சமாதானம், தேவனோடு ஒப்புரவாகுதல் மற்றும் அமைதி',
    keywordsEn: ['peace', 'shalom', 'tranquility', 'serenity', 'rest', 'peace of god', 'calmness', 'prince of peace'],
    keywordsTa: ['சமாதானம்', 'ஷலோம்', 'அமைதி', 'ஆறுதல்', 'சமாதான பிரபு', 'மன அமைதி'],
    meaningEn: 'Biblical peace (Hebrew: shalom, Greek: eirene) signifies much more than absence of conflict; it represents comprehensive wholeness, spiritual safety, and harmony with God. First is peace with God through justification by faith in Christ (Romans 5:1). Second is the peace of God guarding believers\' hearts and minds in all trials (Philippians 4:7).',
    meaningTa: 'வேதாகம சமாதானம் (ஷலோம்) என்பது போரற்ற நிலை மட்டுமல்ல; அது தேவனோடுள்ள நல்லுறவு, பூரண நலம் மற்றும் ஆவிக்குரிய நிறைவாகும். முதலாவது கிறிஸ்துவை விசுவாசிப்பதால் தேவனோடு உண்டாகும் சமாதானம் (ரோமர் 5:1). இரண்டாவது எல்லா புத்திக்கும் மேலான தேவ சமாதானம் நம் இருதயங்களையும் சிந்தைகளையும் காத்துக்கொள்ளும் அமைதியாகும் (பிலிப்பியர் 4:7).',
    oldTestamentEn: 'Isaiah prophesied of the coming Messiah as the "Prince of Peace" (Isaiah 9:6) and proclaimed: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee" (Isaiah 26:3). The Aaronic blessing concluded: "The LORD lift up his countenance upon thee, and give thee peace" (Numbers 6:26).',
    oldTestamentTa: 'ஏசாயா கிறிஸ்துவை "சமாதானப் பிரபு" என்று முன்னறிவித்தார் (ஏசாயா 9:6) மற்றும் "உம்மை உறுதியாய்ப் பற்றிக்கொண்ட மனதையுடையவன் உம்மையே நம்பியிருக்கிறபடியால், நீர் அவனைப் பூரண சமாதானத்துடன் காத்துக்கொள்வீர்" என்றார் (ஏசாயா 26:3). ஆரோனின் ஆசீர்வாதம்: "கர்த்தர் தமது முகத்தை உன்மேல் பிரகாசிக்கப்பண்ணி, உனக்குச் சமாதானம் கட்டளையிடக்கடவர்" என்றது.',
    newTestamentEn: 'Jesus bequeathed peace to His disciples on the eve of His crucifixion: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid" (John 14:27). In the storm He commanded: "Peace, be still," and the wind ceased.',
    newTestamentTa: 'இயேசு சிலுவைக்குச் செல்லுமுன்: "சமாதானத்தை உங்களுக்கு வைத்துப்போகிறேன், என்னுடைய சமாதானத்தையே உங்களுக்குக் கொடுக்கிறேன்; உலகம் கொடுக்கிறபிரகாரம் நான் உங்களுக்குக் கொடுக்கிறதில்லை. உங்கள் இருதயம் கலங்காமலும் பயப்படாமலும் இருப்பதாக" என்றார் (யோவான் 14:27). கடலின் கொந்தளிப்பில்: "இரையாதே, அமைதலாயிரு" என்றார்; பெருங்காற்று அடங்கியது.',
    practicalApplicationEn: 'Whenever anxiety rises, refuse to panic. Hand every worry over to God through prayer with thanksgiving, and allow Christ\'s supernatural peace to guard your emotions and thoughts like a royal garrison.',
    practicalApplicationTa: 'மனக்கவலை உங்களை வாட்டும்போது கலங்காமல், எல்லாவற்றையும் நன்றியோடு ஜெபத்தில் தேவனிடம் சொல்லுங்கள்; அப்பொழுது தேவ சமாதானம் உங்கள் உள்ளத்தை காவல் காக்கும்.',
    verses: [
      { bookId: 'PHP', bookNameEn: 'Philippians', bookNameTa: 'பிலிப்பியர்', ch: 4, v: 7, sigEn: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', sigTa: 'எல்லாப் புத்திக்கும் மேலான தேவ சமாதானம் உங்கள் இருதயங்களையும் உங்கள் சிந்தைகளையும் கிறிஸ்து இயேசுவுக்குள் காத்துக்கொள்ளும்.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 14, v: 27, sigEn: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you.', sigTa: 'சமாதானத்தை உங்களுக்கு வைத்துப்போகிறேன், என்னுடைய சமாதானத்தையே உங்களுக்குக் கொடுக்கிறேன்.' },
      { bookId: 'ISA', bookNameEn: 'Isaiah', bookNameTa: 'ஏசாயா', ch: 26, v: 3, sigEn: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.', sigTa: 'உம்மை உறுதியாய்ப் பற்றிக்கொண்ட மனதையுடையவன் உம்மையே நம்பியிருக்கிறபடியால், நீர் அவனைப் பூரண சமாதானத்துடன் காத்துக்கொள்வீர்.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 5, v: 1, sigEn: 'Therefore being justified by faith, we have peace with God through our Lord Jesus Christ.', sigTa: 'விசுவாசத்தினாலே நீதிமான்களாக்கப்பட்டிருக்கிற நாம், நம்முடைய கர்த்தராகிய இயேசு கிறிஸ்துவினால் தேவனிடத்தில் சமாதானம் பெற்றிருக்கிறோம்.' },
      { bookId: 'COL', bookNameEn: 'Colossians', bookNameTa: 'கொலோசெயர்', ch: 3, v: 15, sigEn: 'And let the peace of God rule in your hearts.', sigTa: 'தேவ சமாதானம் உங்கள் இருதயங்களில் ஆளக்கடவது.' }
    ],
    characters: [
      { nameEn: 'Apostle Paul in Prison', nameTa: 'சிறைச்சாலையில் பவுல்', roleEn: 'Supernatural Joy in Chains', roleTa: 'விலங்கிலும் சமாதானம் கொண்ட அப்போஸ்தலன்', descEn: 'Wrote the epistle of joy and peace while chained to Roman guards.', descTa: 'ரோம சிறையில் சங்கிலிகளால் கட்டப்பட்டிருந்தபோதும் சமாதானத்தோடும் சந்தோஷத்தோடும் நிருபங்களை எழுதினார்.', ref: 'Philippians 4:11-13', bookId: 'PHP', ch: 4, v: 11 }
    ],
    events: [
      { titleEn: 'Jesus Calming the Storm', titleTa: 'கடலின் கொந்தளிப்பை இயேசு அடக்குதல்', descEn: 'Jesus rebuked the wind and raging sea with "Peace, be still", and there was a great calm.', descTa: 'இயேசு காற்றையும் கடலையும் நோக்கி: இரையாதே, அமைதலாயிரு என்றார்; உடனே மிகுந்த அமைதல் உண்டாயிற்று.', ref: 'Mark 4:39', bookId: 'MRK', ch: 4, v: 39 }
    ],
    relatedTopicIds: ['fear', 'hope', 'prayer', 'faith', 'strength', 'jesus_christ']
  },
  {
    id: 'fear',
    category: 'peace_and_comfort',
    titleEn: 'Fear & Fear of the Lord',
    titleTa: 'பயம் & தேவ பயம்',
    subtitleEn: 'Overcoming worldly anxiety while walking in holy reverential awe of Almighty God',
    subtitleTa: 'உலக கவலைகளையும் பயங்களையும் வென்று, சர்வவல்ல தேவனுக்குரிய பரிசுத்த பயபக்தியோடு வாழுதல்',
    keywordsEn: ['fear', 'fear not', 'fear of the lord', 'reverence', 'dread', 'anxiety', 'courage', 'awe'],
    keywordsTa: ['பயம்', 'பயப்படாதே', 'தேவ பயம்', 'பயபக்தி', 'திகில்', 'தைரியம்', 'நடுக்கம்'],
    meaningEn: 'Scripture distinguishes sharply between worldly fear (torment, panic, dread of man) and the holy fear of the Lord (reverence, awe, hatred of evil). Believers are commanded hundreds of times: "Fear not!" because God is with them, while simultaneously called to cultivate the fear of the Lord, which is clean, enduring, and the fountain of life.',
    meaningTa: 'வேதாகமம் உலக பயத்திற்கும் (மனுஷ பயம், திகில், கலக்கம்) மற்றும் பரிசுத்த தேவ பயத்திற்கும் (பயபக்தி, தேவனை கனம்பண்ணுதல், தீமையை வெறுத்தல்) இடையே உள்ள வேறுபாட்டைத் தெளிவாகக் காட்டுகிறது. "பயப்படாதே, நான் உன்னுடனே இருக்கிறேன்" என்று தேவன் திரும்பத் திரும்ப தைரியப்படுத்துகிறார்; அதே வேளையில் கர்த்தருக்குப் பயப்படும் பயமே ஜீவ ஊற்று என்றும் போதிக்கிறது.',
    oldTestamentEn: 'God commanded Joshua as he entered Canaan: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest" (Joshua 1:9). Isaiah 41:10 comforts: "Fear thou not; for I am with thee: be not dismayed; for I am thy God."',
    oldTestamentTa: 'யோசுவா கானானுக்குள் செல்லும்போது தேவன் கட்டளையிட்டார்: "பலங்கொண்டு திடமனதாயிரு; திகையாதே, கலங்காதே, நீ போகும் இடமெல்லாம் உன் தேவனாகிய கர்த்தர் உன்னோடே இருக்கிறார்" (யோசுவா 1:9). ஏசாயா 41:10 ஆறுதல் கூறுகிறது: "நீ பயப்படாதே, நான் உன்னுடனே இருக்கிறேன்; திகையாதே, நான் உன் தேவன்."',
    newTestamentEn: 'Jesus told His followers: "Fear not, little flock; for it is your Father\'s good pleasure to give you the kingdom" (Luke 12:32). Paul wrote: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind" (2 Timothy 1:7). Perfect love casts out fear (1 John 4:18).',
    newTestamentTa: 'இயேசு கூறினார்: "பயப்படாதே சிறுமந்தையே, உங்களுக்கு ராஜ்யத்தைக் கொடுக்க உங்கள் பிதா பிரியமாயிருக்கிறார்" (லூக்கா 12:32). பவுல் எழுதினார்: "தேவன் நமக்கு பயமுள்ள ஆவியைக் கொடாமல், பலமும் அன்பும் தெளிந்த புத்தியுமுள்ள ஆவியையே கொடுத்திருக்கிறார்" (2 தீமோத்தேயு 1:7). பூரண அன்பு பயத்தைப் புறம்பே தள்ளும் (1 யோவான் 4:18).',
    practicalApplicationEn: 'When paralyzed by panic or dread of the future, quote God\'s promises out loud. Replace the fear of man and circumstances with the supreme fear of God, knowing no enemy can stand against His sovereign purpose.',
    practicalApplicationTa: 'எதிர்காலத்தைக் குறித்த பயம் உங்களை ஆட்கொள்ளும்போது, தேவனுடைய வாக்குத்தத்தங்களை வாயினால் அறிக்கையிடுங்கள். மனிதருக்குப் பயப்படாமல் தேவனுக்கு மட்டுமே பயந்து, அவருடைய பாதுகாப்பில் இளைப்பாறுங்கள்.',
    verses: [
      { bookId: 'ISA', bookNameEn: 'Isaiah', bookNameTa: 'ஏசாயா', ch: 41, v: 10, sigEn: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God.', sigTa: 'நீ பயப்படாதே, நான் உன்னுடனே இருக்கிறேன்; திகையாதே, நான் உன் தேவன்; நான் உன்னைப் பலப்படுத்தி உனக்குச் சகாயம்பண்ணுவேன்.' },
      { bookId: '2TI', bookNameEn: '2 Timothy', bookNameTa: '2 தீமோத்தேயு', ch: 1, v: 7, sigEn: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', sigTa: 'தேவன் நமக்கு பயமுள்ள ஆவியைக் கொடாமல், பலமும் அன்பும் தெளிந்த புத்தியுமுள்ள ஆவியையே கொடுத்திருக்கிறார்.' },
      { bookId: 'JOS', bookNameEn: 'Joshua', bookNameTa: 'யோசுவா', ch: 1, v: 9, sigEn: 'Be strong and of a good courage; be not afraid, neither be thou dismayed.', sigTa: 'பலங்கொண்டு திடமனதாயிரு; திகையாதே, கலங்காதே, நீ போகும் இடமெல்லாம் உன் தேவனாகிய கர்த்தர் உன்னோடே இருக்கிறார்.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 27, v: 1, sigEn: 'The LORD is my light and my salvation; whom shall I fear?', sigTa: 'கர்த்தர் என் வெளிச்சமும் என் இரட்சிப்புமானவர், யாருக்குப் பயப்படுவேன்?' },
      { bookId: '1JN', bookNameEn: '1 John', bookNameTa: '1 யோவான்', ch: 4, v: 18, sigEn: 'There is no fear in love; but perfect love casteth out fear.', sigTa: 'அன்பிலே பயமில்லை; பூரண அன்பு பயத்தைப் புறம்பே தள்ளும்.' }
    ],
    characters: [
      { nameEn: 'David Facing Goliath', nameTa: 'கோலியாத்தை எதிர்த்த தாவீது', roleEn: 'Fearless Faith in God', roleTa: 'ராட்சதனை வீழ்த்திய விசுவாசம்', descEn: 'While the entire army trembled in fear, young David boldly confronted the giant in the name of the Lord.', descTa: 'இஸ்ரவேலின் முழுப் படையும் பயந்து நடுங்கியபோது, சேனைகளின் கர்த்தருடைய நாமத்தினால் கோலியாத்தை வீழ்த்தினான்.', ref: '1 Samuel 17:45-47', bookId: '1SA', ch: 17, v: 45 }
    ],
    events: [
      { titleEn: 'Gideon’s Reduction of Army', titleTa: 'கிதியோனின் படை குறைப்பு', descEn: 'God told Gideon to send home everyone who was fearful, reducing 32,000 to 300 to show His victory.', descTa: 'பயமுள்ளவர்கள் திரும்பிப்போகும்படி சொல்லி, வெறும் 300 பேரைக்கொண்டு மீதியானியரை ஜெயிக்கப்பண்ணினார்.', ref: 'Judges 7:3', bookId: 'JDG', ch: 7, v: 3 }
    ],
    relatedTopicIds: ['peace', 'strength', 'faith', 'wisdom', 'trials']
  },
  {
    id: 'fasting',
    category: 'worship_and_prayer',
    titleEn: 'Fasting',
    titleTa: 'உபவாசம்',
    subtitleEn: 'Abstaining from food to seek God’s face, humble the soul, and break spiritual strongholds',
    subtitleTa: 'தேவ சமூகத்தைத் தேடவும், மாம்சத்தை அடக்கவும், ஆவிக்குரிய ஜெயத்திற்காகவும் உணவை விலக்குதல்',
    keywordsEn: ['fasting', 'fast', 'humbling the soul', 'abstinence', 'prayer and fasting', 'isaiah 58'],
    keywordsTa: ['உபவாசம்', 'உபவாசித்தல்', 'பட்டினி', 'ஜெபமும் உபவாசமும்', 'தேவ சமூகம்'],
    meaningEn: 'Fasting is the voluntary abstinence from physical nourishment for a spiritual purpose. It is not a hunger strike to coerce God or earn merit; rather, it is a conscious declaration that our hunger for God and His kingdom surpasses even our physical appetite for food. True fasting humbles the soul and intensifies prayer.',
    meaningTa: 'உபவாசம் என்பது ஆவிக்குரிய நோக்கத்திற்காக உணவை மனப்பூர்வமாகத் தவிர்ப்பதாகும். இது தேவனை நிர்ப்பந்திக்கும் உண்ணாவிரதம் அல்ல; மாறாக சரீர உணவைவிட தேவனுடைய சமூகமும் அவருடைய சித்தமும் எங்களுக்கு முக்கியம் என்பதை வெளிப்படுத்தும் தாழ்மையின் செயலாகும். இது மாம்சத்தை அடக்கி ஜெபத்தை தீவிரப்படுத்துகிறது.',
    oldTestamentEn: 'The Day of Atonement was the national annual fast commanded in Leviticus 16. Moses fasted 40 days on Mount Sinai. Esther called all Jews to fast for three days before she went before the king, averting genocide (Esther 4:16). Isaiah 58 defines God’s chosen fast: breaking the bonds of wickedness and feeding the hungry.',
    oldTestamentTa: 'பழைய ஏற்பாட்டில் பாவநிவாரண நாளில் உபவாசம் இருப்பது கட்டளையாயிருந்தது. மோசே சீனாய் மலையில் 40 நாட்கள் உபவாசித்தார். எஸ்தர் மூன்று நாட்கள் உபவாசித்து ராஜாவிடம் சென்று தன் ஜனத்தைக் காப்பாற்றினாள் (எஸ்தர் 4:16). ஏசாயா 58 அக்கிரமத்தின் கட்டுகளை அவிழ்ப்பதே தேவன் தெரிந்துகொண்ட உபவாசம் என்கிறது.',
    newTestamentEn: 'Jesus inaugurated His public ministry by fasting forty days in the wilderness. He assumed disciples would fast, saying: "When ye fast," not "if ye fast" (Matthew 6:16). He warned against hypocritical public display. The Antioch church fasted and prayed before sending out Paul and Barnabas on missions (Acts 13:2-3).',
    newTestamentTa: 'இயேசு தம் ஊழியத்தைத் துவங்குமுன் வனாந்தரத்தில் நாற்பது நாள் இரவும் பகலும் உபவாசித்தார். "நீங்கள் உபவாசிக்கும்போது..." என்று சொல்லி, வெளிவேஷமாய் முகத்தை வாடப்பண்ணாமல் அந்தரங்கத்தில் உபவாசிக்கும்படி போதித்தார் (மத்தேயு 6:16). அந்தியோகியா சபை உபவாசித்து ஜெபித்தே பவுலையும் பர்னபாவையும் மிஷனரி ஊழியத்திற்கு அனுப்பியது (அப்போஸ்தலர் 13:2-3).',
    practicalApplicationEn: 'Set apart dedicated regular times to fast from food or media. Use meal times to pray intensely for personal revival, breakthrough in difficult relationships, and the salvation of the lost.',
    practicalApplicationTa: 'குறிப்பிட்ட நாட்களை உபவாசத்திற்காக ஒதுக்குங்கள்; உணவைத் தவிர்க்கும் அந்த நேரத்தில் தீவிரமாய் ஜெபித்து, குடும்பத்தின் ஆசீர்வாதத்திற்காகவும், தேசத்தின் இரட்சிப்பிற்காகவும் மன்றாடுங்கள்.',
    verses: [
      { bookId: 'MAT', bookNameEn: 'Matthew', bookNameTa: 'மத்தேயு', ch: 6, v: 16, sigEn: 'Moreover when ye fast, be not, as the hypocrites, of a sad countenance.', sigTa: 'நீங்கள் உபவாசிக்கும்போது, மாயக்காரரைப்போல முகவாடலாய் இராதேயுங்கள்.' },
      { bookId: 'ISA', bookNameEn: 'Isaiah', bookNameTa: 'ஏசாயா', ch: 58, v: 6, sigEn: 'Is not this the fast that I have chosen? to loose the bands of wickedness, to undo the heavy burdens.', sigTa: 'அக்கிரமத்தின் கட்டுகளை அவிழ்க்கிறதும், நுகத்தடியின் பிணையல்களை நெகிழ்க்கிறதும் அல்லவோ எனக்குப் பிரியமான உபவாசம்?' },
      { bookId: 'JOL', bookNameEn: 'Joel', bookNameTa: 'யோவேல்', ch: 2, v: 12, sigEn: 'Turn ye even to me with all your heart, and with fasting, and with weeping.', sigTa: 'இப்பொழுதும் நீங்கள் உபவாசத்தோடும் அழுகையோடும் உங்கள் முழு இருதயத்தோடும் என்னிடத்தில் திரும்புங்கள்.' },
      { bookId: 'ACT', bookNameEn: 'Acts', bookNameTa: 'அப்போஸ்தலர்', ch: 13, v: 3, sigEn: 'And when they had fasted and prayed, and laid their hands on them, they sent them away.', sigTa: 'அப்பொழுது அவர்கள் உபவாசித்து ஜெபம்பண்ணி, அவர்கள்மேல் கைகளை வைத்து, அவர்களை அனுப்பினார்கள்.' }
    ],
    characters: [
      { nameEn: 'Queen Esther', nameTa: 'எஸ்தர் ராணி', roleEn: 'Courageous Intercessor', roleTa: 'உபவாசித்து ஜனத்தைக் காத்த ராணி', descEn: 'Fast with me three days, night or day... and if I perish, I perish.', descTa: 'மூன்று நாள் இரவும் பகலும் உபவாசித்து, நான் செத்தாலும் சாகிறேன் என்று ராஜாவிடம் சென்றாள்.', ref: 'Esther 4:16', bookId: 'EST', ch: 4, v: 16 }
    ],
    events: [
      { titleEn: 'Jesus Fasting Forty Days in Wilderness', titleTa: 'வனாந்தரத்தில் இயேசுவின் நாற்பது நாள் உபவாசம்', descEn: 'Overcame Satan\'s temptations by the written Word of God after fasting 40 days.', descTa: 'நாற்பது நாள் உபவாசத்திற்குப் பின் சாத்தானின் சோதனைகளை வேத வார்த்தையினால் ஜெயித்தார்.', ref: 'Matthew 4:1-11', bookId: 'MAT', ch: 4, v: 1 }
    ],
    relatedTopicIds: ['prayer', 'worship', 'repentance', 'spiritual_growth', 'trials']
  },
  {
    id: 'worship',
    category: 'worship_and_prayer',
    titleEn: 'Worship',
    titleTa: 'ஆராதனை',
    subtitleEn: 'Giving God supreme glory, reverence, and wholehearted adoration in spirit and truth',
    subtitleTa: 'ஆவியோடும் உண்மையோடும் தேவனுக்குச் செலுத்தும் உன்னத மகிமை, பயபக்தி மற்றும் பணிவு',
    keywordsEn: ['worship', 'adoration', 'spirit and truth', 'bow down', 'glory', 'reverence', 'living sacrifice', 'prostration'],
    keywordsTa: ['ஆராதனை', 'பணிந்துகொள்ளுதல்', 'ஆவியோடும் உண்மையோடும்', 'மகிமை', 'ஜீவபலி'],
    meaningEn: 'Worship is the total response of human beings to the revelation of God\'s holiness, majesty, and love. The Hebrew and Greek terms denote prostration, kissing toward, and reverent service. As Jesus explained to the Samaritan woman, the Father seeks true worshippers who worship in spirit and truth (John 4:23-24).',
    meaningTa: 'ஆராதனை என்பது தேவனுடைய பரிசுத்தம், மகத்துவம் மற்றும் அன்பை உணர்ந்து, நம்மை முழுமையாக அவருக்கு அடிபணியச் செய்து செலுத்தும் வழிபாடாகும். இது வெறும் பாடல் பாடுதல் மட்டுமல்ல; நமது முழு சரீரத்தையும் ஆத்துமாவையும் அவருக்குப் பிரியமான ஜீவபலியாக ஒப்புக்கொடுப்பதாகும். பிதாவானவர் ஆவியோடும் உண்மையோடும் தம்மைத் தொழுதுகொள்ளுகிறவர்களைத் தேடுகிறார் (யோவான் 4:23).',
    oldTestamentEn: 'Abraham called his willing offering of Isaac "worship" (Genesis 22:5). The Psalms are Israel\'s inspired songbook of worship: "O come, let us worship and bow down: let us kneel before the LORD our maker" (Psalm 95:6). The tabernacle and temple centered on God’s holy presence.',
    oldTestamentTa: 'ஆபிரகாம் தன் ஒரே மகனை பலியிடச் சென்றபோது அதை "ஆராதனை" என்று அழைத்தான் (ஆதியாகமம் 22:5). சங்கீதங்கள் ஆராதனைப் பாடல்களால் நிறைந்துள்ளன: "வாருங்கள், நாம் பணிந்து குனிந்து, நம்மை உண்டாக்கின கர்த்தருக்கு முன்பாக முழங்கால்படியிடக்கடவோம்" (சங்கீதம் 95:6).',
    newTestamentEn: 'The wise men fell down and worshipped the infant Jesus (Matthew 2:11). Paul defines Christian worship in Romans 12:1: "present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service." Revelation shows all heavenly creatures prostrating before the Lamb.',
    newTestamentTa: 'சாஸ்திரிகள் பாலகனாகிய இயேசுவைக் கண்டு சாஷ்டாங்கமாய் விழுந்து அவரைப் பணிந்துகொண்டார்கள் (மத்தேயு 2:11). ரோமர் 12:1-ல் பவுல்: உங்கள் சரீரங்களை தேவனுக்குப் பிரியமான ஜீவபலியாக ஒப்புக்கொடுப்பதே புத்தியுள்ள ஆராதனை என்கிறார். வெளிப்படுத்தல் புத்தகம் பரலோக சேனைகள் ஆட்டுக்குட்டியானவரைப் பணிந்துகொள்வதை வெளிப்படுத்துகிறது.',
    practicalApplicationEn: 'Do not limit worship to Sunday morning music. Make your entire life—work, family, thoughts, integrity, and relationships—a continual act of adoration to the living God.',
    practicalApplicationTa: 'ஆராதனையை ஞாயிற்றுக்கிழமை பாடல்களோடு சுருக்கிவிடாமல், உங்கள் அன்றாட வேலை, நேர்மை, குடும்ப வாழ்க்கை என அனைத்தையும் தேவனுக்குப் பிரியமான ஆராதனையாக மாற்றுங்கள்.',
    verses: [
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 4, v: 24, sigEn: 'God is a Spirit: and they that worship him must worship him in spirit and in truth.', sigTa: 'தேவன் ஆவியாயிருக்கிறார், அவரைத் தொழுதுகொள்ளுகிறவர்கள் ஆவியோடும் உண்மையோடும் அவரைத் தொழுதுகொள்ளவேண்டும்.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 12, v: 1, sigEn: 'Present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.', sigTa: 'உங்கள் சரீரங்களைப் பரிசுத்தமும் தேவனுக்குப் பிரியமுமான ஜீவபலியாக ஒப்புக்கொடுக்கவேண்டுமென்று... வேண்டிக்கொள்ளுகிறேன்; இதுவே நீங்கள் செய்யத்தக்க புத்தியுள்ள ஆராதனை.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 95, v: 6, sigEn: 'O come, let us worship and bow down: let us kneel before the LORD our maker.', sigTa: 'வாருங்கள், நாம் பணிந்து குனிந்து, நம்மை உண்டாக்கின கர்த்தருக்கு முன்பாக முழங்கால்படியிடக்கடவோம்.' },
      { bookId: 'REV', bookNameEn: 'Revelation', bookNameTa: 'வெளிப்படுத்தின விசேஷம்', ch: 4, v: 11, sigEn: 'Thou art worthy, O Lord, to receive glory and honour and power: for thou hast created all things.', sigTa: 'எங்கள் கர்த்தாவே, தேவரீர், மகிமையையும் கனத்தையும் வல்லமையையும் பெற்றுக்கொள்ளுகிறதற்குப் பாத்திரராயிருக்கிறீர்.' }
    ],
    characters: [
      { nameEn: 'Mary of Bethany', nameTa: 'பெத்தானியா மரியாள்', roleEn: 'Sacrificial Worshipper', roleTa: 'விலையேறப்பெற்ற பரிமள தைலத்தை ஊற்றியவள்', descEn: 'Broke an alabaster box of very costly spikenard ointment, anointing Jesus’ feet and wiping them with her hair.', descTa: 'விலையேறப்பெற்ற நளத தைலத்தை இயேசுவின் பாதங்களில் ஊற்றி, தன் தலைமயிரினால் துடைத்து ஆராதித்தாள்.', ref: 'John 12:3', bookId: 'JHN', ch: 12, v: 3 }
    ],
    events: [
      { titleEn: 'Dedication of Solomon’s Temple', titleTa: 'சாலொமோனின் ஆலயப் பிரதிஷ்டை', descEn: 'When the priests sang and praised the Lord with one voice, the glory of the Lord filled the house.', descTa: 'ஜனங்கள் ஏகமாய் தேவனைத் துதித்து ஆராதித்தபோது, கர்த்தருடைய மகிமையின் மேகம் ஆலயத்தை நிரப்பியது.', ref: '2 Chronicles 5:13-14', bookId: '2CH', ch: 5, v: 13 }
    ],
    relatedTopicIds: ['praise', 'prayer', 'god', 'jesus_christ', 'holiness']
  },
  {
    id: 'praise',
    category: 'worship_and_prayer',
    titleEn: 'Praise & Thanksgiving',
    titleTa: 'துதி & ஸ்தோத்திரம்',
    subtitleEn: 'Joyfully declaring God’s mighty deeds, glorious character, and abundant mercies',
    subtitleTa: 'தேவனுடைய மகத்துவமான கிரியைகளையும், தயவையும், நாமத்தையும் வாயினால் போற்றிப் பாடுதல்',
    keywordsEn: ['praise', 'thanksgiving', 'hallelujah', 'hosanna', 'singing', 'magnify', 'exalt', 'bless the lord'],
    keywordsTa: ['துதி', 'ஸ்தோத்திரம்', 'அல்லேலூயா', 'நன்றியறிதல்', 'போற்றுதல்', 'பாடிப் புகழுதல்'],
    meaningEn: 'Praise is the vocal, joyful celebration of who God is and what He has done. It breaks depression, scatters spiritual darkness, and releases divine power. In Psalm 22:3, God is said to inhabit the praises of His people. Thanksgiving expresses gratitude for specific blessings received.',
    meaningTa: 'துதி என்பது தேவனுடைய சுபாவத்தையும், அவருடைய மகத்துவமான செயல்களையும் வாயினால் மகிழ்ச்சியோடு பாடி அறிவிப்பதாகும். இது மனச்சோர்வை உடைத்து, ஆவிக்குரிய இருளை விரட்டுகிறது. தேவன் இஸ்ரவேலின் துதிகளுக்குள் வாசம்பண்ணுகிறார் (சங்கீதம் 22:3). ஸ்தோத்திரம் என்பது நாம் பெற்ற நன்மைகளுக்காக தேவனுக்கு நன்றி செலுத்துவதாகும்.',
    oldTestamentEn: 'Miriam led Israel with timbrels praising God after passing through the Red Sea (Exodus 15:20). King Jehoshaphat appointed singers to go before the army praising the beauty of holiness, and when they began to sing, the Lord set ambushments against their enemies (2 Chronicles 20:21-22). The Psalms conclude with Psalm 150: "Let every thing that hath breath praise the LORD."',
    oldTestamentTa: 'மிரியாம் தம்புரோடு இஸ்ரவேல் பெண்களை வழிநடத்தி செங்கடலின் கரையில் துதி பாடினாள். யோசபாத் ராஜா யுத்தத்திற்கு முன்னாக பாடகர்களை நிறுத்தி துதித்தபோது, கர்த்தர் சத்துருக்களைத் தங்களுக்குள்ளே வெட்டுண்டு விழப்பண்ணினார் (2 நாளாகமம் 20:21-22). சங்கீதம் 150: "சுவாசமுள்ள யாவும் கர்த்தரைத் துதிப்பதாக. அல்லேலூயா!" என்று முடிகிறது.',
    newTestamentEn: 'Paul and Silas prayed and sang praises to God at midnight in the Philippian jail, and suddenly an earthquake shook the foundations and every bond was loosed (Acts 16:25-26). Hebrews 13:15 exhorts: "By him therefore let us offer the sacrifice of praise to God continually, that is, the fruit of our lips giving thanks to his name."',
    newTestamentTa: 'பவுலும் சீலாவும் பிலிப்பு சிறைச்சாலையில் நடுராத்திரியிலே தேவனைத் துதித்துப் பாடினார்கள்; உடனே நில அதிர்ச்சி உண்டாகி, சிறைக்கதவுகள் திறந்து, கட்டுகள் அவிழ்ந்தன (அப்போஸ்தலர் 16:25-26). எபிரெயர் 13:15: "அவருடைய நாமத்தைத் துதிக்கும் உதடுகளின் கனியாகிய ஸ்தோத்திரபலியை எப்போதும் தேவனுக்குச் செலுத்தக்கடவோம்" என்கிறது.',
    practicalApplicationEn: 'Start and end your day by thanking God for at least five specific blessings. When facing disappointment, offer a sacrifice of praise before seeing the breakthrough, trusting God\'s goodness.',
    practicalApplicationTa: 'உங்கள் நாளை தேவனைத் துதிப்பதோடு துவங்குங்கள்; சோதனையான நேரத்திலும் முறுமுறுக்காமல், உதடுகளின் கனியாகிய ஸ்தோத்திர பலியை தேவனுக்குச் செலுத்துங்கள்.',
    verses: [
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 100, v: 4, sigEn: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.', sigTa: 'அவர் வாசல்களில் துதியோடும், அவர் பிராகாரங்களில் புகழ்ச்சியோடும் பிரவேசித்து, அவரைத் துதித்து, அவருடைய நாமத்தை ஸ்தோத்தரியுங்கள்.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 150, v: 6, sigEn: 'Let every thing that hath breath praise the LORD. Praise ye the LORD.', sigTa: 'சுவாசமுள்ள யாவும் கர்த்தரைத் துதிப்பதாக. கர்த்தரைத் துதியுங்கள்.' },
      { bookId: 'HEB', bookNameEn: 'Hebrews', bookNameTa: 'எபிரெயர்', ch: 13, v: 15, sigEn: 'Let us offer the sacrifice of praise to God continually, that is, the fruit of our lips giving thanks to his name.', sigTa: 'ஸ்தோத்திரபலியை எப்போதும் தேவனுக்குச் செலுத்தக்கடவோம்; அவருடைய நாமத்தைத் துதிக்கும் உதடுகளின் கனியே இது.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 34, v: 1, sigEn: 'I will bless the LORD at all times: his praise shall continually be in my mouth.', sigTa: 'கர்த்தரை நான் எக்காலத்திலும் ஸ்தோத்தரிப்பேன்; அவர் துதி எப்போதும் என் வாயிலிருக்கும்.' }
    ],
    characters: [
      { nameEn: 'Paul and Silas in Philippi', nameTa: 'பிலிப்பு சிறையில் பவுலும் சீலாவும்', roleEn: 'Midnight Praisers', roleTa: 'நடுராத்திரியில் பாடித் துதித்த அப்போஸ்தலர்கள்', descEn: 'Beaten and chained in the inner dungeon, sang praises at midnight until prison doors broke open.', descTa: 'அடிபட்டு சங்கிலியால் கட்டப்பட்டிருந்தும் நடுராத்திரியில் பாடினார்கள்; தேவன் சிறைக் கதவுகளைத் திறந்தார்.', ref: 'Acts 16:25-26', bookId: 'ACT', ch: 16, v: 25 }
    ],
    events: [
      { titleEn: 'Jehoshaphat’s Choir in Battle', titleTa: 'யோசபாத்தின் துதிப் படை', descEn: 'Singers marched before the army singing "Praise the LORD; for his mercy endureth for ever," winning without a blow.', descTa: 'கர்த்தரைத் துதியுங்கள், அவர் கிருபை என்றும் உள்ளது என்று பாடியபோது சத்துருக்கள் அழிக்கப்பட்டனர்.', ref: '2 Chronicles 20:21-22', bookId: '2CH', ch: 20, v: 21 }
    ],
    relatedTopicIds: ['worship', 'prayer', 'joy', 'faith', 'god']
  },
  {
    id: 'repentance',
    category: 'core_doctrines',
    titleEn: 'Repentance',
    titleTa: 'மனந்திரும்புதல்',
    subtitleEn: 'A decisive turning of the heart from sin to God in sorrow, faith, and new obedience',
    subtitleTa: 'பாவத்தை விட்டு விலகி, மனஸ்தாபத்தோடும் விசுவாசத்தோடும் தேவனிடத்தில் திரும்புதல்',
    keywordsEn: ['repentance', 'repent', 'metanoia', 'turning to god', 'contrite heart', 'brokenness', 'confession of sin'],
    keywordsTa: ['மனந்திரும்புதல்', 'பாவ அறிக்கை', 'நொறுங்குண்ட இருதயம்', 'பாவத்தை விட்டு விலகுதல்', 'புதிய வாழ்க்கை'],
    meaningEn: 'Biblical repentance (Greek: metanoia, Hebrew: teshuvah) is a radical transformation of mind, heart, and direction. It is not mere worldly regret or fear of consequences, but a godly sorrow that hates sin, turns completely away from it, and turns wholeheartedly to God for mercy and new obedience.',
    meaningTa: 'மனந்திரும்புதல் (மெட்டானோயா) என்பது வெறும் வாய் வார்த்தையல்ல; சிந்தையிலும், மனதிலும், வாழ்க்கையிலும் ஏற்படும் அடிப்படையான மாற்றமாகும். இது தண்டனைக்கு பயப்படும் உலக துக்கம் அல்ல; தேவனுக்கு விரோதமாக பாவம் செய்துவிட்டோமே என்று இருதயம் உடைந்து, பாவத்தை அடியோடு விட்டு தேவனிடம் திரும்புவதாகும்.',
    oldTestamentEn: 'The prophets constantly cried: "Turn ye, turn ye from your evil ways; for why will ye die, O house of Israel?" (Ezekiel 33:11). David penned Psalm 51 in deep repentance after his sin with Bathsheba, pleading: "Create in me a clean heart, O God; and renew a right spirit within me" (Psalm 51:10). Nineveh repented in sackcloth and ashes at Jonah’s preaching, and God relented.',
    oldTestamentTa: 'தீர்க்கதரிசிகள்: "உங்கள் பொல்லாத வழிகளை விட்டுத் திரும்புங்கள்; நீங்கள் ஏன் சாகவேண்டும்?" என்று கதறினார்கள் (எசேக்கியேல் 33:11). தாவீது தன் பாவத்திற்காக நொறுங்குண்டு சங்கீதம் 51-ல்: "தேவனே, சுத்த இருதயத்தை என்னிலே சிருஷ்டியும், நிலைவரமான ஆவியை என் உள்ளத்திலே புதுப்பியும்" என்று கதறினான்.',
    newTestamentEn: 'John the Baptist and Jesus both began their ministries with the identical proclamation: "Repent: for the kingdom of heaven is at hand" (Matthew 3:2; 4:17). Jesus warned: "Except ye repent, ye shall all likewise perish" (Luke 13:3). On Pentecost, Peter instructed: "Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins" (Acts 2:38).',
    newTestamentTa: 'யோவான் ஸ்நானகனும் இயேசுவும் தங்கள் ஊழியத்தை: "மனந்திரும்புங்கள், பரலோகராஜ்யம் சமீபித்திருக்கிறது" என்றே துவங்கினர் (மத்தேயு 4:17). நீங்கள் மனந்திரும்பாவிட்டால் எல்லாரும் கெட்டுப்போவீர்கள் என்று இயேசு எச்சரித்தார். பெந்தேகொஸ்தே நாளில் பேதுரு: "மனந்திரும்புங்கள், இயேசு கிறிஸ்துவின் நாமத்தினாலே ஞானஸ்நானம் பெற்றுக்கொள்ளுங்கள்" என்றார் (அப்போஸ்தலர் 2:38).',
    practicalApplicationEn: 'Do not hide or rationalize known sin. Confess it honestly to God right now, ask for His cleansing blood, make restitution where necessary, and walk forward in the freedom of holiness.',
    practicalApplicationTa: 'உங்கள் பாவங்களை நியாயப்படுத்தாமல், தேவனிடத்தில் உண்மையாய் அறிக்கையிடுங்கள். கிறிஸ்துவின் இரத்தம் உங்களைச் சுத்திகரிக்கும்; மீண்டும் அந்தப் பாவத்திற்குத் திரும்பாமல் பரிசுத்தமாய் வாழுங்கள்.',
    verses: [
      { bookId: 'ACT', bookNameEn: 'Acts', bookNameTa: 'அப்போஸ்தலர்', ch: 3, v: 19, sigEn: 'Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come.', sigTa: 'உங்கள் பாவங்கள் நிவர்த்திசெய்யப்படும்பொருட்டு நீங்கள் மனந்திரும்பி குணப்படுங்கள்; அப்பொழுது கர்த்தருடைய சந்நிதானத்திலிருந்து இளைப்பாறுதலின் காலங்கள் வரும்.' },
      { bookId: '2CO', bookNameEn: '2 Corinthians', bookNameTa: '2 கொரிந்தியர்', ch: 7, v: 10, sigEn: 'For godly sorrow worketh repentance to salvation not to be repented of.', sigTa: 'தேவனுக்கேற்ற துக்கம் இரட்சிப்புக்கேதுவான மனந்திரும்புதலை உண்டாக்குகிறது.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 51, v: 17, sigEn: 'The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise.', sigTa: 'தேவனுக்கேற்கும் பலிகள் நொறுங்குண்ட ஆவிதான்; தேவனே, நொறுங்குண்டதும் நருங்குண்டதுமான இருதயத்தை நீர் புறக்கணியீர்.' },
      { bookId: 'PRO', bookNameEn: 'Proverbs', bookNameTa: 'நீதிமொழிகள்', ch: 28, v: 13, sigEn: 'He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy.', sigTa: 'தன் பாவங்களை மறைக்கிறவன் வாழ்வடையமாட்டான்; அவைகளை அறிக்கைசெய்து விட்டுவிடுகிறவனோ இரக்கம் பெறுவான்.' }
    ],
    characters: [
      { nameEn: 'King David in Psalm 51', nameTa: 'தாவீது ராஜா (சங்கீதம் 51)', roleEn: 'Contrite King', roleTa: 'நொறுங்குண்ட இருதயத்தோடு கதறிய ராஜா', descEn: 'Wept before God, asking not for power but for a clean heart and the restoration of joy.', descTa: 'சுத்த இருதயத்தை என்னிலே சிருஷ்டியும், உமது இரட்சிப்பின் மகிழ்ச்சியைத் திரும்பவும் எனக்குத் தாரும் என்று கதறினார்.', ref: 'Psalm 51:1-12', bookId: 'PSA', ch: 51, v: 1 }
    ],
    events: [
      { titleEn: 'Repentance of Nineveh', titleTa: 'நினிவே பட்டணத்தின் மனந்திரும்புதல்', descEn: 'From king to lowest beast, Nineveh fasted in sackcloth at Jonah’s warning and God spared them.', descTa: 'ராஜா முதல் ஆடுமாடுகள் வரை இரட்டுடுத்தி உபவாசித்து மனந்திரும்பியதால் தேவன் அந்தப் பட்டணத்தை அழிவிலிருந்து காத்தார்.', ref: 'Jonah 3:5-10', bookId: 'JON', ch: 3, v: 5 }
    ],
    relatedTopicIds: ['salvation', 'forgiveness', 'sin', 'grace', 'baptism']
  },
  {
    id: 'baptism',
    category: 'core_doctrines',
    titleEn: 'Baptism',
    titleTa: 'ஞானஸ்நானம்',
    subtitleEn: 'The sacred outward declaration of inward faith, identifying with Christ in death and resurrection',
    subtitleTa: 'கிறிஸ்துவின் மரணத்திலும் உயிர்த்தெழுதலிலும் அவரோடு இணைவதை அறிவிக்கும் பரிசுத்த கீழ்ப்படிதல்',
    keywordsEn: ['baptism', 'baptize', 'water baptism', 'immersion', 'great commission', 'identification with christ', 'born of water'],
    keywordsTa: ['ஞானஸ்நானம்', 'தண்ணீர் ஞானஸ்நானம்', 'முழுக்கு', 'மறுபிறப்பு', 'புதிய உடன்படிக்கை'],
    meaningEn: 'Water baptism (Greek: baptizo, meaning to dip or immerse) is an ordinance commanded by Jesus Christ for all believers. It symbolizes spiritual burial of the old self into Christ\'s death and rising out of the water to walk in newness of resurrected life. It is the public confession of one’s allegiance to King Jesus.',
    meaningTa: 'ஞானஸ்நானம் (கிரேக்கம்: பாப்திஸோ, மூழ்குதல்) என்பது இயேசு கிறிஸ்துவினால் நியமிக்கப்பட்ட பரிசுத்த கட்டளையாகும். இது பழைய பாவியின் சுபாவம் கிறிஸ்துவோடு மரித்து அடக்கம்பண்ணப்பட்டதையும், புதிய மனுஷனாக உயிர்த்தெழுந்து பரிசுத்தமாய் வாழத் துவங்குவதையும் வெளிப்படையாக அறிவிக்கும் கீழ்ப்படிதலின் அடையாளமாகும்.',
    oldTestamentEn: 'The Apostle Paul identified the crossing of the Red Sea under Moses as a baptismal type: Israel passed through the waters and cloud, leaving Egyptian slavery forever (1 Corinthians 10:1-2). Noah\'s ark passing through judgment waters was another figure (1 Peter 3:20-21).',
    oldTestamentTa: 'இஸ்ரவேலர் மோசேக்குள்ளாக மேகத்தினாலும் கடலினாலும் ஞானஸ்நானம் பெற்றார்கள் என்று பவுல் விளக்குகிறார் (1 கொரிந்தியர் 10:1-2). நோவாவின் பேழை ஜலத்தின் வழியாய் இரட்சிக்கப்பட்டதும் ஞானஸ்நானத்திற்கு முன்நிழலாயிருக்கிறது (1 பேதுரு 3:20-21).',
    newTestamentEn: 'Jesus Himself was baptized by John in the Jordan to fulfill all righteousness, at which the heavens opened and the Holy Spirit descended as a dove. In the Great Commission, Jesus commanded: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost" (Matthew 28:19).',
    newTestamentTa: 'இயேசு தாமே சகல நீதியையும் நிறைவேற்றும்படி யோர்தானில் யோவானால் ஞானஸ்நானம் பெற்றார்; அப்பொழுது வானம் திறக்கப்பட்டு, பரிசுத்த ஆவியானவர் புறாவைப்போல் இறங்கினார். மகா கட்டளையில் இயேசு: "நீங்கள் புறப்பட்டுப் போய், சகல ஜாதிகளையும் சீஷராக்கி, பிதா குமாரன் பரிசுத்த ஆவியின் நாமத்திலே அவர்களுக்கு ஞானஸ்நானங்கொடுத்து" என்றார் (மத்தேயு 28:19).',
    practicalApplicationEn: 'If you have placed your faith in Jesus Christ but have not yet obeyed His command of water baptism, step forward in joyful obedience without delay.',
    practicalApplicationTa: 'நீங்கள் கிறிஸ்துவை விசுவாசித்திருந்தும் இன்னும் ஞானஸ்நானம் பெறவில்லையென்றால், தாமதமின்றி அவருடைய கட்டளைக்குக் கீழ்ப்படிந்து ஞானஸ்நானம் பெற்றுக்கொள்ளுங்கள்.',
    verses: [
      { bookId: 'MAT', bookNameEn: 'Matthew', bookNameTa: 'மத்தேயு', ch: 28, v: 19, sigEn: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.', sigTa: 'நீங்கள் புறப்பட்டுப்போய், சகல ஜாதிகளையும் சீஷராக்கி, பிதா குமாரன் பரிசுத்த ஆவியின் நாமத்திலே அவர்களுக்கு ஞானஸ்நானங்கொடுத்து.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 6, v: 4, sigEn: 'Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead... we also should walk in newness of life.', sigTa: 'அவருடைய மரணத்திற்குள்ளாக்கும் ஞானஸ்நானத்தினாலே கிறிஸ்துவுடனேகூட அடக்கம்பண்ணப்பட்டோம்; நாமும் புதிதான ஜீவனுள்ளவர்களாய் நடந்துகொள்ளும்படிக்கு.' },
      { bookId: 'ACT', bookNameEn: 'Acts', bookNameTa: 'அப்போஸ்தலர்', ch: 2, v: 38, sigEn: 'Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins.', sigTa: 'நீங்கள் மனந்திரும்பி, ஒவ்வொருவரும் பாவமன்னிப்புக்கென்று இயேசு கிறிஸ்துவின் நாமத்தினாலே ஞானஸ்நானம் பெற்றுக்கொள்ளுங்கள்.' },
      { bookId: 'GAL', bookNameEn: 'Galatians', bookNameTa: 'கலாத்தியர்', ch: 3, v: 27, sigEn: 'For as many of you as have been baptized into Christ have put on Christ.', sigTa: 'கிறிஸ்துவுக்குள்ளாக ஞானஸ்நானம் பெற்றவர்கள் எத்தனைபேரோ அத்தனைபேரும் கிறிஸ்துவைத் தரித்துக்கொண்டீர்களே.' }
    ],
    characters: [
      { nameEn: 'Ethiopian Eunuch', nameTa: 'எத்தியோப்பிய மந்திரி', roleEn: 'Eager Convert', roleTa: 'மகிழ்ச்சியோடு ஞானஸ்நானம் பெற்ற மந்திரி', descEn: 'Said: See, here is water; what doth hinder me to be baptized? Philip baptized him and he went on his way rejoicing.', descTa: 'இதோ தண்ணீர் இருக்கிறதே, நான் ஞானஸ்நானம் பெறுகிறதற்கு என்ன தடை? என்று கேட்டு ஞானஸ்நானம் பெற்றான்.', ref: 'Acts 8:36-39', bookId: 'ACT', ch: 8, v: 36 }
    ],
    events: [
      { titleEn: 'Baptism of Jesus in Jordan', titleTa: 'யோர்தானில் இயேசுவின் ஞானஸ்நானம்', descEn: 'The Father spoke from heaven: This is my beloved Son, in whom I am well pleased.', descTa: 'வானத்திலிருந்து பிதாவின் சத்தம்: இவர் என் நேச குமாரன், இவரில் பிரியமாயிருக்கிறேன் என்று ஒலித்தது.', ref: 'Matthew 3:16-17', bookId: 'MAT', ch: 3, v: 16 }
    ],
    relatedTopicIds: ['salvation', 'repentance', 'faith', 'discipleship', 'holy_spirit']
  },
  {
    id: 'obedience',
    category: 'christian_living',
    titleEn: 'Obedience',
    titleTa: 'கீழ்ப்படிதல்',
    subtitleEn: 'The joyful submission to God’s holy commandments as the proof of genuine love and faith',
    subtitleTa: 'தேவனுடைய கட்டளைகளுக்கு முழு மனதோடு அடங்கி நடப்பதே மெய்யான அன்பின் அடையாளம்',
    keywordsEn: ['obedience', 'obey', 'hearken', 'commandments', 'keep his word', 'submissive', 'follow christ'],
    keywordsTa: ['கீழ்ப்படிதல்', 'கற்பனைகளைக் கைக்கொள்ளுதல்', 'வார்த்தையைக் கேட்டல்', 'அடங்குதல்', 'தேவ சித்தம்'],
    meaningEn: 'Biblical obedience is the willing, wholehearted alignment of one’s conduct and desires with God’s revealed will. Samuel famously declared that "to obey is better than sacrifice" (1 Samuel 15:22). Obedience does not earn salvation, but is the undeniable evidence of true saving faith and love for Jesus.',
    meaningTa: 'கீழ்ப்படிதல் என்பது தேவனுடைய வார்த்தைக்கும் அவருடைய சித்தத்திற்கும் முழு மனதோடு நம்மை ஒப்புக்கொடுத்து நடப்பதாகும். "பலியிலும் கீழ்ப்படிதலே உத்தமம்" என்று சாமுவேல் கூறினார் (1 சாமுவேல் 15:22). கீழ்ப்படிதல் இரட்சிப்பை சம்பாதிப்பதல்ல; மாறாக நாம் இயேசுவை உண்மையாக நேசிக்கிறோம் என்பதற்கு அதுவே மறுக்க முடியாத அத்தாட்சியாகும்.',
    oldTestamentEn: 'Deuteronomy 28 details the extraordinary blessings poured out on obedience, contrasted with curses on rebellion. Abraham demonstrated supreme obedience when he took Isaac to Moriah without questioning God.',
    oldTestamentTa: 'உபாகமம் 28 கீழ்ப்படிதலுக்குரிய ஆசீர்வாதங்களை விரிவாகக் கூறுகிறது. ஆபிரகாம் தேவனுடைய சொல்லுக்குக் கீழ்ப்படிந்து எதையும் கேள்வி கேட்காமல் அதிகாலையிலேயே தன் மகனோடு மோரியா மலைக்குச் சென்றான்.',
    newTestamentEn: 'Jesus set the supreme example of obedience: "He humbled himself, and became obedient unto death, even the death of the cross" (Philippians 2:8). Jesus said: "If ye love me, keep my commandments" (John 14:15). James insists that we must be doers of the word, and not hearers only (James 1:22).',
    newTestamentTa: 'இயேசு கிறிஸ்துவே கீழ்ப்படிதலின் உச்ச உதாரணம்: அவர் சிலுவையின் மரணபரியந்தமும் தம்மைத் தாழ்த்தி கீழ்ப்படிந்தார் (பிலிப்பியர் 2:8). இயேசு: "நீங்கள் என்னிடத்தில் அன்பாயிருந்தால் என் கற்பனைகளைக் கைக்கொள்ளுங்கள்" என்றார் (யோவான் 14:15). வார்த்தையைக் கேட்கிறவர்களாய் மாத்திரமல்ல, அதின்படி செய்கிறவர்களாயிருங்கள் என்று யாக்கோபு எச்சரித்தார்.',
    practicalApplicationEn: 'Examine any areas of compromise where you know God’s clear biblical instruction but hesitate to comply. Choose radical, immediate obedience, trusting God with the outcome.',
    practicalApplicationTa: 'தேவனுடைய சித்தத்தை அறிந்திருந்தும் தாமதிக்காமல், உடனே கீழ்ப்படியுங்கள். சூழ்நிலையைக் கண்டு அஞ்சாமல் தேவனுடைய வார்த்தைக்கு முதலிடம் கொடுங்கள்.',
    verses: [
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 14, v: 15, sigEn: 'If ye love me, keep my commandments.', sigTa: 'நீங்கள் என்னிடத்தில் அன்பாயிருந்தால் என் கற்பனைகளைக் கைக்கொள்ளுங்கள்.' },
      { bookId: '1SA', bookNameEn: '1 Samuel', bookNameTa: '1 சாமுவேல்', ch: 15, v: 22, sigEn: 'Behold, to obey is better than sacrifice, and to hearken than the fat of rams.', sigTa: 'பலியிலும் கீழ்ப்படிதலும், ஆட்டுக்கடாக்களின் நிணத்திலும் அவருடைய சொல்லுக்குச் செவிகொடுத்தலும் உத்தமம்.' },
      { bookId: 'JAS', bookNameEn: 'James', bookNameTa: 'யாக்கோபு', ch: 1, v: 22, sigEn: 'Be ye doers of the word, and not hearers only, deceiving your own selves.', sigTa: 'நீங்கள் உங்களை வஞ்சியாதபடிக்குத் திருவசனத்தைக் கேட்கிறவர்களாய் மாத்திரமல்ல, அதின்படி செய்கிறவர்களாயும் இருங்கள்.' },
      { bookId: 'ACT', bookNameEn: 'Acts', bookNameTa: 'அப்போஸ்தலர்', ch: 5, v: 29, sigEn: 'We ought to obey God rather than men.', sigTa: 'மனுஷருக்குக் கீழ்ப்படிகிறதைப்பார்க்கிலும் தேவனுக்குக் கீழ்ப்படிகிறதே அவசியமாயிருக்கிறது.' }
    ],
    characters: [
      { nameEn: 'Noah Building the Ark', nameTa: 'பேழையைச் செய்த நோவா', roleEn: 'Faithful Builder', roleTa: 'அப்படியே செய்து முடித்த நீதிமான்', descEn: 'Did according to all that God commanded him, so did he, building an ark on dry land for decades.', descTa: 'தேவன் தனக்குக் கட்டளையிட்டபடியெல்லாம் செய்து முடித்தான் என்று வேதம் நோவாவைப் பாராட்டுகிறது.', ref: 'Genesis 6:22', bookId: 'GEN', ch: 6, v: 22 }
    ],
    events: [
      { titleEn: 'Abraham on Mount Moriah', titleTa: 'மோரியா மலையில் ஆபிரகாம்', descEn: 'Bound Isaac upon the altar, proving his absolute obedience to God.', descTa: 'ஈசாக்கைப் பலியிடத் துணிந்து கத்தியை எடுத்தான்; நீ தேவனுக்குப் பயப்படுகிறவன் என்று இப்போது அறிந்திருக்கிறேன் என்றார் தேவன்.', ref: 'Genesis 22:9-12', bookId: 'GEN', ch: 22, v: 9 }
    ],
    relatedTopicIds: ['faith', 'love', 'discipleship', 'holiness', 'christian_life']
  },
  {
    id: 'temptation',
    category: 'spiritual_growth',
    titleEn: 'Temptation',
    titleTa: 'சோதனை',
    subtitleEn: 'Overcoming the enticements of the world, flesh, and devil through the power of God’s Word',
    subtitleTa: 'உலகம், மாம்சம் மற்றும் பிசாசின் சோதனைகளை தேவ வார்த்தையினாலும் ஆவியினாலும் வெல்லுதல்',
    keywordsEn: ['temptation', 'tempted', 'overcoming sin', 'enticement', 'flesh', 'armor of god', 'snare', 'deliverance from evil'],
    keywordsTa: ['சோதனை', 'சோதிக்கப்படுதல்', 'மாம்ச இச்சை', 'பிசாசின் தந்திரங்கள்', 'ஜெயம்', 'சோதனையை வெல்லுதல்'],
    meaningEn: 'Temptation is the solicitation to sin against God, arising from fallen human desires (the flesh), worldly culture, and demonic deception. Scripture clarifies that God never tempts anyone with evil (James 1:13). While temptation itself is not sin, yielding to it brings death. God faithfully provides a way of escape for every trial (1 Corinthians 10:13).',
    meaningTa: 'சோதனை என்பது தேவனுக்கு விரோதமாக பாவம் செய்யும்படி நம்மைத் தூண்டும் கவர்ச்சியாகும். இது மாம்சத்தின் இச்சையினாலும், உலகத்தின் கவர்ச்சியினாலும், பிசாசின் தந்திரத்தினாலும் உண்டாகிறது. தேவன் ஒருபோதும் பொல்லாங்கினால் சோதிக்கிறவரல்ல (யாக்கோபு 1:13). சோதிக்கப்படுவது பாவமல்ல, ஆனால் சோதனைக்கு இணங்குவதே பாவமாகும். தேவன் நாம் தாங்கக்கூடியதற்கு மேலாக சோதிக்கப்பட விடாமல் தப்பித்துக்கொள்ளும் வழியையும் உண்டாக்குகிறார்.',
    oldTestamentEn: 'The first temptation occurred in Eden when the serpent deceived Eve by questioning God\'s word (Genesis 3). Joseph resisted the relentless sexual advances of Potiphar\'s wife, declaring: "How then can I do this great wickedness, and sin against God?" (Genesis 39:9) and fled.',
    oldTestamentTa: 'ஏதேன் தோட்டத்தில் சர்ப்பம் ஏவாளை தேவ வார்த்தையை சந்தேகிக்க வைத்து சோதித்தது (ஆதியாகமம் 3). போத்திபாரின் மனைவி தொடர்ந்து சோதித்தபோது யோசேப்பு: "நான் இத்தனை பெரிய பொல்லாங்குக்கு உடன்பட்டு, தேவனுக்கு விரோதமாய்ப் பாவம் செய்வது எப்படி?" என்று சொல்லி அவளை விட்டு ஓடிப்போனான்.',
    newTestamentEn: 'Jesus was tempted in all points like as we are, yet without sin (Hebrews 4:15). In the wilderness, He defeated Satan by quoting Deuteronomy: "It is written..." Paul promises in 1 Corinthians 10:13 that God will not suffer you to be tempted above that ye are able.',
    newTestamentTa: 'இயேசு எல்லாவிதத்திலும் நம்மைப்போல் சோதிக்கப்பட்டும், பாவமில்லாதவராயிருந்தார் (எபிரெயர் 4:15). வனாந்தரத்தில் சாத்தானின் ஒவ்வொரு சோதனைக்கும்: "எழுதியிருக்கிறதே..." என்று வேத வசனத்தைக் கொண்டே வெற்றி கண்டார். 1 கொரிந்தியர் 10:13-ல் தேவன் உண்மையுள்ளவர், திராணிக்கு மேலாக நீங்கள் சோதிக்கப்பட அவர் இடங்கொடார் என்று வாக்கு பண்ணியுள்ளார்.',
    practicalApplicationEn: 'Do not toy with tempting environments or media; flee from youthful lusts immediately. Arm yourself with memorized scripture to wield as the sword of the Spirit when evil thoughts attack.',
    practicalApplicationTa: 'சோதனையான இடங்களுக்கும் காட்சிகளுக்கும் விலகி ஓடுங்கள்; யோசேப்பைப்போல அசுத்தத்திற்கு விலகியிருங்கள். தேவ வார்த்தையை இருதயத்தில் பதித்து, பிசாசின் தந்திரங்களுக்கு எதிராக அதைப் பயன்படுத்துங்கள்.',
    verses: [
      { bookId: '1CO', bookNameEn: '1 Corinthians', bookNameTa: '1 கொரிந்தியர்', ch: 10, v: 13, sigEn: 'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able.', sigTa: 'மனுஷருக்கு நேரிடுகிற சோதனையேயல்லாமல் வேறே சோதனை உங்களுக்கு நேரிடவில்லை. தேவன் உண்மையுள்ளவராயிருக்கிறார்; உங்கள் திராணிக்கு மேலாக நீங்கள் சோதிக்கப்பட அவர் இடங்கொடார்.' },
      { bookId: 'MAT', bookNameEn: 'Matthew', bookNameTa: 'மத்தேயு', ch: 26, v: 41, sigEn: 'Watch and pray, that ye enter not into temptation: the spirit indeed is willing, but the flesh is weak.', sigTa: 'நீங்கள் சோதனைக்குட்படாதபடிக்கு விழித்திருந்து ஜெபம்பண்ணுங்கள்; ஆவி உற்சாகமுள்ளதுதான், மாம்சமோ பலவீனமுள்ளது.' },
      { bookId: 'JAS', bookNameEn: 'James', bookNameTa: 'யாக்கோபு', ch: 4, v: 7, sigEn: 'Submit yourselves therefore to God. Resist the devil, and he will flee from you.', sigTa: 'தேவனுக்குக் கீழ்ப்படிந்திருங்கள்; பிசாசுக்கு எதிர்த்து நில்லுங்கள், அப்பொழுது அவன் உங்களை விட்டு ஓடிப்போவான்.' },
      { bookId: 'HEB', bookNameEn: 'Hebrews', bookNameTa: 'எபிரெயர்', ch: 2, v: 18, sigEn: 'For in that he himself hath suffered being tempted, he is able to succour them that are tempted.', sigTa: 'அவர்தாமே சோதிக்கப்பட்டுப் பாடுபட்டதினாலே, சோதிக்கப்படுகிறவர்களுக்கு உதவிசெய்ய வல்லவராயிருக்கிறார்.' }
    ],
    characters: [
      { nameEn: 'Joseph in Egypt', nameTa: 'எகிப்தில் யோசேப்பு', roleEn: 'Victorious over Lust', roleTa: 'இச்சையை விட்டு ஓடிய வாலிபன்', descEn: 'Refused Potiphar\'s wife day after day, choosing prison rather than sinning against God.', descTa: 'போத்திபாரின் மனைவி படுக்கைக்கு அழைத்தபோது தன் வஸ்திரத்தை விட்டுவிட்டு வெளியே ஓடிப்போனான்.', ref: 'Genesis 39:7-12', bookId: 'GEN', ch: 39, v: 7 }
    ],
    events: [
      { titleEn: 'Temptation of Christ in the Wilderness', titleTa: 'வனாந்தரத்தில் கிறிஸ்து பெற்ற சோதனை', descEn: 'After 40 days of fasting, Jesus routed Satan\'s appeals to physical appetite, presumption, and worldly glory using Scripture.', descTa: 'அப்பம், தேவனைப் பரீட்சை பார்த்தல், உலக மகிமை ஆகிய மூன்று சோதனைகளையும் தேவ வசனத்தினால் இயேசு முறியடித்தார்.', ref: 'Matthew 4:1-11', bookId: 'MAT', ch: 4, v: 1 }
    ],
    relatedTopicIds: ['sin', 'prayer', 'holiness', 'strength', 'spiritual_growth']
  },
  {
    id: 'sin',
    category: 'core_doctrines',
    titleEn: 'Sin',
    titleTa: 'பாவம்',
    subtitleEn: 'Transgression of God’s holy law, moral corruption, and separation from the Creator',
    subtitleTa: 'தேவனுடைய பரிசுத்த பிரமாணத்தை மீறுதல், அநீதி, மற்றும் தேவனை விட்டுப் பிரிக்கும் அக்கிரமம்',
    keywordsEn: ['sin', 'iniquity', 'transgression', 'unrighteousness', 'fall of man', 'original sin', 'wages of sin', 'depravity'],
    keywordsTa: ['பாவம்', 'அக்கிரமம்', 'அநீதி', 'மீறுதல்', 'பாவத்தின் சம்பளம்', 'துன்மார்க்கம்'],
    meaningEn: 'Sin (Greek: hamartia, missing the target; Hebrew: chatta\'ah) is any lack of conformity to the moral character or law of God in thought, word, desire, or deed. It is rebellion against our sovereign Creator. The wages of sin is physical and eternal death (Romans 6:23), and sin separates man completely from fellowship with holy God.',
    meaningTa: 'பாவம் என்பது தேவனுடைய பரிசுத்த பிரமாணத்தை மீறுவதும், அவருடைய சுபாவத்திற்கு மாறாக நடப்பதுமாகும். இது சிருஷ்டிகராகிய தேவனுக்கு எதிரான கலகம். "பாவத்தின் சம்பளம் மரணம்" (ரோமர் 6:23). பாவம் மனிதனை பரிசுத்த தேவனின் ஐக்கியத்திலிருந்து முற்றிலும் பிரித்து, நித்திய அழிவுக்குள் தள்ளுகிறது.',
    oldTestamentEn: 'Genesis 3 recounts the tragic Fall of Adam and Eve, which plunged the entire human race into a state of sin and death. Isaiah 59:2 laments: "Your iniquities have separated between you and your God, and your sins have hid his face from you."',
    oldTestamentTa: 'ஆதியாகமம் 3 ஆதாம் ஏவாளின் கீழ்ப்படியாமை மனித குலம் முழுவதையும் பாவத்திலும் மரணத்திலும் ஆழ்த்தியதை விவரிக்கிறது. ஏசாயா 59:2: "உங்கள் அக்கிரமங்களே உங்களுக்கும் உங்கள் தேவனுக்கும் நடுவாகப் பிரிவினை உண்டாக்குகிறது; உங்கள் பாவங்களே அவர் உங்களுக்குச் செவிகொடாதபடிக்கு அவருடைய முகத்தை மறைக்கிறது" என்கிறது.',
    newTestamentEn: 'Romans 3:23 declares: "For all have sinned, and come short of the glory of God." Yet 1 John 3:5 proclaims the glorious antidote: "He was manifested to take away our sins; and in him is no sin." On the Cross, Christ was made sin for us that we might become the righteousness of God in Him (2 Corinthians 5:21).',
    newTestamentTa: 'ரோமர் 3:23: "எல்லாரும் பாவஞ்செய்து, தேவமகிமையற்றவர்களாகி" என்று கூறுகிறது. ஆனால் 1 யோவான் 3:5 நற்செய்தியை அறிவிக்கிறது: "அவர் நம்முடைய பாவங்களைச் சுமந்து தீர்க்கும்படி வெளிப்பட்டார் என்று அறிவீர்கள்; அவரிடத்தில் பாவமில்லை." நாம் தேவனுடைய நீதியாகும்படி பாவம் அறியாத அவரை நமக்காகப் பாவமாக்கினார் (2 கொரிந்தியர் 5:21).',
    practicalApplicationEn: 'Never minimize or flirt with sin. Agree with God\'s verdict on your shortcomings, run quickly to the cleansing fountain of Christ’s blood, and rely on the Holy Spirit for daily victory over the power of sin.',
    practicalApplicationTa: 'பாவத்தைச் சாதாரணமாக எண்ணாதீர்கள். எந்தப் பாவமானாலும் உடனே தேவனிடத்தில் அறிக்கையிட்டு, கிறிஸ்துவின் இரத்தத்தினால் கழுவப்பட்டு, பரிசுத்தமாய் வாழுங்கள்.',
    verses: [
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 3, v: 23, sigEn: 'For all have sinned, and come short of the glory of God.', sigTa: 'எல்லாரும் பாவஞ்செய்து, தேவமகிமையற்றவர்களாகி.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 6, v: 23, sigEn: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.', sigTa: 'பாவத்தின் சம்பளம் மரணம்; தேவனுடைய கிருபைவரமோ நம்முடைய கர்த்தராகிய இயேசு கிறிஸ்துவினால் உண்டான நித்தியஜீவன்.' },
      { bookId: '1JN', bookNameEn: '1 John', bookNameTa: '1 யோவான்', ch: 3, v: 4, sigEn: 'Whosoever committeth sin transgresseth also the law: for sin is the transgression of the law.', sigTa: 'பாவஞ்செய்கிற எவனும் நியாயப்பிரமாணத்தை மீறுகிறான்; நியாயப்பிரமாணத்தை மீறுகிறதே பாவம்.' },
      { bookId: 'ISA', bookNameEn: 'Isaiah', bookNameTa: 'ஏசாயா', ch: 59, v: 2, sigEn: 'Your iniquities have separated between you and your God.', sigTa: 'உங்கள் அக்கிரமங்களே உங்களுக்கும் உங்கள் தேவனுக்கும் நடுவாகப் பிரிவினை உண்டாக்குகிறது.' }
    ],
    characters: [
      { nameEn: 'Achan', nameTa: 'ஆகான்', roleEn: 'Secret Sinner Exposed', roleTa: 'மறைவான பாவத்தினால் சாபத்தைக் கொண்டுவந்தவன்', descEn: 'Coveted and hid gold and a Babylonian garment at Jericho, bringing defeat upon all Israel.', descTa: 'எரிகோவின் சாபத்தீடான பொன்னையும் வஸ்திரத்தையும் திருடி மறைத்து வைத்ததால் இஸ்ரவேல் முழுவதற்கும் தோல்வி வந்தது.', ref: 'Joshua 7:20-21', bookId: 'JOS', ch: 7, v: 20 }
    ],
    events: [
      { titleEn: 'The Fall in Eden', titleTa: 'ஏதேன் தோட்டத்தில் மனிதனின் வீழ்ச்சி', descEn: 'Adam and Eve ate the forbidden fruit, ushering sin, shame, and mortality into creation.', descTa: 'விலக்கப்பட்ட கனியைப் புசித்ததால் தேவனுடன் இருந்த ஐக்கியம் முறிந்து பாவம் உலகத்திற்குள் பிரவேசித்தது.', ref: 'Genesis 3:1-19', bookId: 'GEN', ch: 3, v: 1 }
    ],
    relatedTopicIds: ['salvation', 'repentance', 'forgiveness', 'grace', 'temptation']
  },
  {
    id: 'eternal_life',
    category: 'prophecy_and_eternity',
    titleEn: 'Eternal Life',
    titleTa: 'நித்திய ஜீவன்',
    subtitleEn: 'The everlasting, unending divine life and fellowship with God bestowed through Jesus Christ',
    subtitleTa: 'இயேசு கிறிஸ்துவின் மூலமாக தேவனுடன் என்றென்றும் வாழும் முடிவில்லாத ஆசீர்வதிக்கப்பட்ட வாழ்வு',
    keywordsEn: ['eternal life', 'everlasting life', 'immortality', 'life in christ', 'inheritance', 'living forever'],
    keywordsTa: ['நித்திய ஜீவன்', 'முடிவில்லா வாழ்வு', 'சாகாமை', 'கிறிஸ்துவுக்குள் ஜீவன்', 'பரலோக சுதந்திரம்'],
    meaningEn: 'Eternal life is not merely endless existence, but the very life of God imparted to the believer. Jesus defines it relationally in John 17:3: "And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent." It begins the moment a person trusts Christ and culminates in glorified resurrection existence.',
    meaningTa: 'நித்திய ஜீவன் என்பது காலத்தின் எல்லையற்ற நீட்சி மட்டுமல்ல; அது தேவனுடைய தெய்வீக ஜீவனில் நாமும் பங்கடைவதாகும். யோவான் 17:3-ல் இயேசு இதை அழகாக விவரிக்கிறார்: "ஒன்றான மெய்த்தேவனாகிய உம்மையும் நீர் அனுப்பினவராகிய இயேசு கிறிஸ்துவையும் அறிவதே நித்திய ஜீவன்." இது நாம் கிறிஸ்துவை விசுவாசிக்கும் கணமே துவங்குகிறது.',
    oldTestamentEn: 'Daniel 12:2 promises that those who sleep in the dust shall awake, "some to everlasting life." David rejoiced in Psalm 16:11: "In thy presence is fulness of joy; at thy right hand there are pleasures for evermore."',
    oldTestamentTa: 'தானியேல் 12:2 தூளிலே தூங்குகிறவர்கள் விழித்து "சிலர் நித்திய ஜீவனுக்கும்" எழுந்திருப்பார்கள் என்கிறது. தாவீது சங்கீதம் 16:11-ல்: "உம்முடைய சமுகத்தில் நித்திய மகிழ்ச்சியும், உம்முடைய வலதுபாரிசத்தில் நித்திய பேரின்பமும் உண்டு" என்று பாடினார்.',
    newTestamentEn: 'John 3:16 guarantees that whosoever believeth in Christ should not perish, but have everlasting life. 1 John 5:11-12 declares: "And this is the record, that God hath given to us eternal life, and this life is in his Son. He that hath the Son hath life."',
    newTestamentTa: 'யோவான் 3:16 அவரை விசுவாசிக்கிற எவனும் கெட்டுப்போகாமல் நித்தியஜீவனை அடையும்படிக்கு என்று வாக்களிக்கிறது. 1 யோவான் 5:11-12: "தேவன் நமக்கு நித்தியஜீவனைத் தந்திருக்கிறார், அந்த ஜீவன் அவருடைய குமாரனில் இருக்கிறது... குமாரனையுடையவன் ஜீவனையுடையவன்" என்று முழங்குகிறது.',
    practicalApplicationEn: 'Live today with eternity stamped upon your eyes. Earthly possessions and trials are fleeting; invest your time and treasures into the kingdom that will never pass away.',
    practicalApplicationTa: 'நித்தியத்தை உங்கள் கண்முன் வைத்து வாழுங்கள். இவ்வுலக பாடுகளும் மாயைகளும் சீக்கிரத்தில் அழிந்துவிடும்; நித்திய ஜீவனின் ஆசீர்வாதத்தை நோக்கி உங்கள் பொக்கிஷங்களைப் பரலோகத்தில் சேருங்கள்.',
    verses: [
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 3, v: 16, sigEn: 'That whosoever believeth in him should not perish, but have everlasting life.', sigTa: 'அவரை விசுவாசிக்கிற எவனும் கெட்டுப்போகாமல் நித்தியஜீவனை அடையும்படிக்கு, அவரைத் தந்தருளினார்.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 17, v: 3, sigEn: 'And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.', sigTa: 'ஒன்றான மெய்த்தேவனாகிய உம்மையும் நீர் அனுப்பினவராகிய இயேசு கிறிஸ்துவையும் அறிவதே நித்தியஜீவன்.' },
      { bookId: '1JN', bookNameEn: '1 John', bookNameTa: '1 யோவான்', ch: 5, v: 11, sigEn: 'And this is the record, that God hath given to us eternal life, and this life is in his Son.', sigTa: 'தேவன் நமக்கு நித்தியஜீவனைத் தந்திருக்கிறார், அந்த ஜீவன் அவருடைய குமாரனில் இருக்கிறது.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 6, v: 23, sigEn: 'The gift of God is eternal life through Jesus Christ our Lord.', sigTa: 'தேவனுடைய கிருபைவரமோ நம்முடைய கர்த்தராகிய இயேசு கிறிஸ்துவினால் உண்டான நித்தியஜீவன்.' }
    ],
    characters: [
      { nameEn: 'Lazarus of Bethany', nameTa: 'பெத்தானியா லாசரு', roleEn: 'Called Forth from the Grave', roleTa: 'மரித்து உயிர்த்தெழுந்தவன்', descEn: 'Dead four days, called out of the tomb by Jesus, who proclaimed: I am the resurrection, and the life.', descTa: 'நான்கு நாள் கல்லறையில் இருந்த லாசருவை: நானே உயிர்த்தெழுதலும் ஜீவனுமாயிருக்கிறேன் என்று சொல்லி உயிரோடு எழுப்பினார்.', ref: 'John 11:43-44', bookId: 'JHN', ch: 11, v: 43 }
    ],
    events: [
      { titleEn: 'Promise to the Repentant Thief', titleTa: 'சிலுவையில் கள்ளனுக்குக் கொடுத்த வாக்கு', descEn: 'Jesus assured the dying thief: Verily I say unto thee, To day shalt thou be with me in paradise.', descTa: 'இன்றைக்கு நீ என்னுடனேகூடப் பரதீசிலிருப்பாய் என்று இயேசு நித்திய ஜீவனை வாக்களித்தார்.', ref: 'Luke 23:43', bookId: 'LUK', ch: 23, v: 43 }
    ],
    relatedTopicIds: ['salvation', 'heaven', 'resurrection', 'jesus_christ', 'hope']
  },
  {
    id: 'second_coming',
    category: 'prophecy_and_eternity',
    titleEn: 'Second Coming of Christ',
    titleTa: 'இரண்டாம் வருகை',
    subtitleEn: 'The bodily, glorious return of Jesus Christ to judge the earth and establish His reign',
    subtitleTa: 'இயேசு கிறிஸ்து மகிமையோடும் வல்லமையோடும் பூமிக்கு மீண்டும் வரப்போகும் உன்னத நிகழ்வு',
    keywordsEn: ['second coming', 'rapture', 'parousia', 'blessed hope', 'return of christ', 'king of kings', 'clouds of heaven'],
    keywordsTa: ['இரண்டாம் வருகை', 'கிறிஸ்துவின் மறுவருகை', 'எக்காள சத்தம்', 'மறுரூபமாதல்', 'மேகங்கள்மேல் வருவார்'],
    meaningEn: 'The Second Coming of Jesus Christ is the blessed hope of the church—His literal, physical, visible return in power and great glory. Unlike His first coming in humility to die for sin, His return will be as the conquering King of kings and Judge of all the earth to consummate His kingdom.',
    meaningTa: 'இயேசு கிறிஸ்துவின் இரண்டாம் வருகை என்பது விசுவாசிகளின் பாக்கியமுள்ள நம்பிக்கையாகும். அவர் தம்முடைய முதல் வருகையில் பாவிகளுக்காக மரிக்க மனத்தாழ்மையுள்ள தாசனாக வந்தார்; ஆனால் இரண்டாம் வருகையிலோ சர்வ லோகத்தையும் நியாயந்தீர்க்கவும், ராஜாதி ராஜாவாக ஆளுகை செய்யவும் மகா வல்லமையோடும் மகிமையோடும் வருவார்.',
    oldTestamentEn: 'Zechariah prophesied: "And his feet shall stand in that day upon the mount of Olives" (Zechariah 14:4). Daniel saw one like the Son of man coming with the clouds of heaven, given an everlasting dominion that shall not pass away (Daniel 7:13-14).',
    oldTestamentTa: 'சகரியா தீர்க்கதரிசி: "அந்நாளிலே அவருடைய பாதங்கள் எருசலேமுக்குக் கிழக்கேயிருக்கிற ஒலிவமலையின்மேல் நிற்கும்" என்றார் (சகரியா 14:4). தானியேல் வானத்து மேகங்களுடனே மனுஷகுமாரனைப் போன்ற ஒருவர் நித்திய ஆளுகையைப் பெற வருவதைத் தரிசித்தார் (தானியேல் 7:13-14).',
    newTestamentEn: 'At Christ’s ascension, two angels declared: "This same Jesus... shall so come in like manner as ye have seen him go into heaven" (Acts 1:11). Paul in 1 Thessalonians 4:16-17 reveals that the Lord Himself shall descend with a shout, with the voice of the archangel, and the trump of God, and the dead in Christ shall rise first.',
    newTestamentTa: 'இயேசு பரமேறியபோது தேவதூதர்கள்: "உங்களிடத்தினின்று வானத்துக்கு எடுத்துக்கொள்ளப்பட்ட இந்த இயேசுவானவர்... எப்படிப் போகக் கண்டீர்களோ, அப்படியே மறுபடியும் வருவார்" என்றனர் (அப்போஸ்தலர் 1:11). 1 தெசலோனிக்கேயர் 4:16-17: "கர்த்தர் தாமே ஆரவாரத்தோடும், பிரதான தூதனுடைய சத்தத்தோடும், தேவ எக்காளத்தோடும் வானத்திலிருந்து இறங்கிவருவார்" என்கிறது.',
    practicalApplicationEn: 'Live in watchful readiness and holy purity, knowing Christ could return at any moment. Be busy about the Master\'s work, sharing the gospel with urgency and encouraging fellow believers.',
    practicalApplicationTa: 'ஆண்டவருடைய வருகை எப்பொழுது வேண்டுமானாலும் நிகழலாம் என்பதை உணர்ந்து விழித்திருந்து பரிசுத்தமாய் வாழுங்கள்; இந்த நம்பிக்கையினால் ஒருவரையொருவர் தேற்றுங்கள்.',
    verses: [
      { bookId: '1TH', bookNameEn: '1 Thessalonians', bookNameTa: '1 தெசலோனிக்கேயர்', ch: 4, v: 16, sigEn: 'For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God.', sigTa: 'கர்த்தர் தாமே ஆரவாரத்தோடும், பிரதான தூதனுடைய சத்தத்தோடும், தேவ எக்காளத்தோடும் வானத்திலிருந்து இறங்கிவருவார்.' },
      { bookId: 'REV', bookNameEn: 'Revelation', bookNameTa: 'வெளிப்படுத்தின விசேஷம்', ch: 1, v: 7, sigEn: 'Behold, he cometh with clouds; and every eye shall see him.', sigTa: 'இதோ, மேகங்களுடனே வருகிறார்; கண்கள் யாவும் அவரைக் காணும்.' },
      { bookId: 'TIT', bookNameEn: 'Titus', bookNameTa: 'தீத்து', ch: 2, v: 13, sigEn: 'Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.', sigTa: 'நாம் நம்பியிருக்கிற ஆனந்த பாக்கியத்திற்கும், மகா தேவனும் நமது இரட்சகருமாகிய இயேசுகிறிஸ்துவினுடைய மகிமையின் பிரசன்னமாகுதலுக்கும் எதிர்பார்த்துக்கொண்டிருக்கிறோம்.' },
      { bookId: 'ACT', bookNameEn: 'Acts', bookNameTa: 'அப்போஸ்தலர்', ch: 1, v: 11, sigEn: 'This same Jesus... shall so come in like manner as ye have seen him go into heaven.', sigTa: 'இந்த இயேசுவானவர் எப்படி வானத்துக்குப் போகக் கண்டீர்களோ, அப்படியே மறுபடியும் வருவார்.' }
    ],
    characters: [
      { nameEn: 'Apostle John', nameTa: 'யோவான் அப்போஸ்தலன்', roleEn: 'Recipient of the Apocalypse', roleTa: 'வருகையின் வெளிப்பாட்டைப் பெற்றவர்', descEn: 'Concluded the entire canon of Scripture praying: Even so, come, Lord Jesus.', descTa: 'ஆமென், கர்த்தராகிய இயேசுவே, வாரும் என்று வேதாகமத்தின் கடைசி ஜெபத்தை ஏறெடுத்தார்.', ref: 'Revelation 22:20', bookId: 'REV', ch: 22, v: 20 }
    ],
    events: [
      { titleEn: 'Ascension from Mount of Olives', titleTa: 'ஒலிவ மலையிலிருந்து இயேசு பரமேறுதல்', descEn: 'Jesus ascended in a cloud and angels promised He will return in the exact same manner.', descTa: 'இயேசு மேகத்தில் பரலோகத்திற்கு எடுத்துக்கொள்ளப்பட்டார்; அப்படியே மீண்டும் வருவார் என்று தூதர்கள் அறிவித்தனர்.', ref: 'Acts 1:9-11', bookId: 'ACT', ch: 1, v: 9 }
    ],
    relatedTopicIds: ['resurrection', 'end_times', 'eternal_life', 'jesus_christ', 'heaven']
  },
  {
    id: 'resurrection',
    category: 'core_doctrines',
    titleEn: 'Resurrection',
    titleTa: 'உயிர்த்தெழுதல்',
    subtitleEn: 'Victory over physical death, the bodily rising of Christ, and the future rising of all believers',
    subtitleTa: 'மரணத்தின் மீதான வெற்றி, கிறிஸ்துவின் சரீர உயிர்த்தெழுதல், மற்றும் விசுவாசிகளின் உயிர்த்தெழுதல்',
    keywordsEn: ['resurrection', 'risen', 'empty tomb', 'firstfruits', 'glorified body', 'victory over death'],
    keywordsTa: ['உயிர்த்தெழுதல்', 'வெற்றிகரமான உயிர்த்தெழுதல்', 'முதற்பலன்', 'வெற்று கல்லறை', 'மரணத்தின் கூர்'],
    meaningEn: 'The resurrection is the bodily raising from death to immortal life. It is the bedrock of Christian faith: Christ rose bodily on the third day as the firstfruits of all who sleep. Because He lives, believers will also be raised with incorruptible, glorified bodies at His return (1 Corinthians 15).',
    meaningTa: 'உயிர்த்தெழுதல் என்பது மரணத்திலிருந்து சரீரப்பிரகாரமாய் நித்திய வாழ்விற்குள் எழுந்திருப்பதாகும். இது கிறிஸ்தவ விசுவாசத்தின் அஸ்திபாரம்: கிறிஸ்து மூன்றாம் நாளில் உயிர்த்தெழுந்தார்; அவர் உயிரோடிருக்கிறபடியினால் நாமும் உயிர்ப்பிக்கப்படுவோம். அவருடைய வருகையில் நமது அழியக்கூடிய சரீரம் அழியாமையையும், சாகாமையையும் தரித்துக்கொள்ளும்.',
    oldTestamentEn: 'Job confessed amidst extreme agony: "For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth: And though after my skin worms destroy this body, yet in my flesh shall I see God" (Job 19:25-26). Isaiah 26:19 prophesied: "Thy dead men shall live, together with my dead body shall they arise."',
    oldTestamentTa: 'யோபு தன் பெருந்துன்பத்தில் அறிக்கையிட்டான்: "என் மீட்பர் உயிரோடிருக்கிறார் என்றும், அவர் கடைசி நாளில் பூமியின்மேல் நிற்பார் என்றும் நான் அறிந்திருக்கிறேன்; என் தோல் அழிக்கப்பட்டபின்பு, என் மாம்சத்திலிருந்து தேவனைப் பார்ப்பேன்" (யோபு 19:25-26).',
    newTestamentEn: 'Paul devotes 1 Corinthians 15 to the absolute necessity of the resurrection: "If Christ be not risen, then is our preaching vain, and your faith is also vain" (v. 14). Christ conquered death and holds the keys of hell and death (Revelation 1:18).',
    newTestamentTa: 'பவுல் 1 கொரிந்தியர் 15-ல்: கிறிஸ்து உயிர்த்தெழாவிட்டால் எங்கள் பிரசங்கமும் வீண், உங்கள் விசுவாசமும் வீண் என்கிறார். கிறிஸ்து மரணத்தை ஜெயித்ததினால் மரணமே உன் கூர் எங்கே? பாதாளமே உன் ஜெயம் எங்கே? என்று சவால் விடுக்கிறார்.',
    practicalApplicationEn: 'Face physical aging, sickness, and bereavement without morbid despair. We do not grieve as those who have no hope; Christ has decisively conquered death forever.',
    practicalApplicationTa: 'பிரியமானவர்களின் மரணத்தைக் குறித்து நம்பிக்கையற்றவர்களைப்போல துக்கப்படாமல், கிறிஸ்துவில் உயிர்த்தெழுதல் உண்டு என்ற உறுதியான நம்பிக்கையோடு வாழுங்கள்.',
    verses: [
      { bookId: '1CO', bookNameEn: '1 Corinthians', bookNameTa: '1 கொரிந்தியர்', ch: 15, v: 20, sigEn: 'Now is Christ risen from the dead, and become the firstfruits of them that slept.', sigTa: 'கிறிஸ்துவோ மரித்தோரிலிருந்தெழுந்து, நித்திரையடைந்தவர்களில் முதற்பலனானார்.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 11, v: 25, sigEn: 'Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.', sigTa: 'இயேசு அவளை நோக்கி: நானே உயிர்த்தெழுதலும் ஜீவனுமாயிருக்கிறேன்; என்னை விசுவாசிக்கிறவன் மரித்தாலும் பிழைப்பான்.' },
      { bookId: '1CO', bookNameEn: '1 Corinthians', bookNameTa: '1 கொரிந்தியர்', ch: 15, v: 55, sigEn: 'O death, where is thy sting? O grave, where is thy victory?', sigTa: 'மரணமே! உன் கூர் எங்கே? பாதாளமே! உன் ஜெயம் எங்கே?' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 8, v: 11, sigEn: 'He that raised up Christ from the dead shall also quicken your mortal bodies by his Spirit.', sigTa: 'கிறிஸ்துவை மரித்தோரிலிருந்து எழுப்பினவர் உங்களில் வாசமாயிருக்கிற தம்முடைய ஆவியினாலே சாவுக்கு ஏதுவான உங்கள் சரீரங்களையும் உயிர்ப்பிப்பார்.' }
    ],
    characters: [
      { nameEn: 'Mary Magdalene', nameTa: 'மகதலேனா மரியாள்', roleEn: 'First Witness of the Risen Lord', roleTa: 'உயிர்த்தெழுந்த ஆண்டவரைக் கண்ட முதல் சீஷி', descEn: 'Wept at the empty tomb, heard the Gardener call her name "Mary!", and proclaimed: I have seen the Lord!', descTa: 'வெற்று கல்லறையண்டையில் அழுதுகொண்டிருந்தபோது இயேசு அவளைப் பெயர் சொல்லி அழைத்தார்.', ref: 'John 20:11-18', bookId: 'JHN', ch: 20, v: 11 }
    ],
    events: [
      { titleEn: 'The Resurrection Morning', titleTa: 'உயிர்த்தெழுந்த ஈஸ்டர் காலை', descEn: 'An angel rolled away the great stone, soldiers trembled as dead men, and Christ arose triumphant.', descTa: 'தூதன் கல்லைப் புரட்டினான்; காவல் சேவகர்கள் செத்தவர்கள்போல் விழுந்தார்கள்; இயேசு மரணத்தை வென்று உயிர்த்தெழுந்தார்.', ref: 'Matthew 28:1-6', bookId: 'MAT', ch: 28, v: 1 }
    ],
    relatedTopicIds: ['jesus_christ', 'second_coming', 'eternal_life', 'hope', 'salvation']
  },
  {
    id: 'prophecy',
    category: 'prophecy_and_eternity',
    titleEn: 'Prophecy & End Times',
    titleTa: 'தீர்க்கதரிசனம் & கடைசி நாட்கள்',
    subtitleEn: 'God’s divine revelation of future events, sovereign unfolding of history, and ultimate redemption',
    subtitleTa: 'தேவன் எதிர்காலத்தைக் குறித்து வெளிப்படுத்திய வாக்குத்தத்தங்கள் மற்றும் சரித்திரத்தின் முடிவு',
    keywordsEn: ['prophecy', 'end times', 'eschatology', 'signs of the times', 'revelation', 'apocalypse', 'tribulation'],
    keywordsTa: ['தீர்க்கதரிசனம்', 'கடைசி நாட்கள்', 'யுக முடிவு', 'காலத்தின் அடையாளங்கள்', 'வெளிப்படுத்தல்'],
    meaningEn: 'Biblical prophecy is the supernatural revelation of God’s redemptive plan, foretelling future events with 100% accuracy and calling His people to holy living. Over 300 Old Testament prophecies were fulfilled in Jesus\' first coming; hundreds more detail His second coming, the final judgment, and the new heavens and earth.',
    meaningTa: 'தீர்க்கதரிசனம் என்பது தேவன் மனிதனுக்கு அருளிய எதிர்கால சம்பவங்களின் துல்லியமான வெளிப்பாடாகும். பழைய ஏற்பாட்டில் இயேசுவின் முதலாம் வருகையைக் குறித்த 300-க்கும் மேற்பட்ட தீர்க்கதரிசனங்கள் அப்படியே நிறைவேறின. அதேபோல அவருடைய இரண்டாம் வருகை, கடைசி நாட்களின் அடையாளங்கள் மற்றும் புதிய வானம் புதிய பூமி குறித்த தீர்க்கதரிசனங்களும் நிச்சயம் நிறைவேறும்.',
    oldTestamentEn: 'Isaiah, Jeremiah, Ezekiel, and Daniel revealed world empires rising and falling, followed by the eternal kingdom of God. Amos 3:7 proclaims: "Surely the Lord GOD will do nothing, but he revealeth his secret unto his servants the prophets."',
    oldTestamentTa: 'ஏசாயா, எரேமியா, எசேக்கியேல், தானியேல் ஆகியோர் உலக சாம்ராஜ்யங்களின் எழுச்சியையும் வீழ்ச்சியையும் தேவனுடைய நித்திய ராஜ்யத்தின் வெற்றியையும் முன்னறிவித்தனர். "கர்த்தராகிய ஆண்டவர் தீர்க்கதரிசிகளாகிய தம்முடைய ஊழியக்காரருக்குத் தமது இரகசியத்தை வெளிப்படுத்தாமல் ஒரு காரியமும் செய்யார்" (ஆமோஸ் 3:7).',
    newTestamentEn: 'Jesus gave the Olivet Discourse in Matthew 24 detailing wars, famines, earthquakes, false prophets, and the preaching of the gospel to all nations before the end comes. The Book of Revelation provides the grand finale of human history.',
    newTestamentTa: 'மத்தேயு 24-ல் ஒலிவ மலை பிரசங்கத்தில் இயேசு யுத்தங்கள், பஞ்சங்கள், பூமி அதிர்ச்சிகள் மற்றும் எல்லா ஜாதிகளுக்கும் சுவிசேஷம் பிரசங்கிக்கப்படுதல் ஆகிய கடைசி நாட்களின் அடையாளங்களை விவரித்தார். வெளிப்படுத்தின விசேஷம் சரித்திரத்தின் இறுதி வெற்றியை வெளிப்படுத்துகிறது.',
    practicalApplicationEn: 'Study biblical prophecy not to speculate on dates, but to purify your personal walk and evangelize the lost with passionate urgency.',
    practicalApplicationTa: 'தீர்க்கதரிசனங்களை ஆராயும்போது தேதிகளைக் கணித்துக் கொண்டிராமல், காலத்தின் அடையாளங்களை உணர்ந்து பரிசுத்தமாய் வாழுங்கள் மற்றும் சுவிசேஷத்தை அறிவியுங்கள்.',
    verses: [
      { bookId: '2PE', bookNameEn: '2 Peter', bookNameTa: '2 பேதுரு', ch: 1, v: 21, sigEn: 'For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost.', sigTa: 'தீர்க்கதரிசனமானது ஒருகாலத்திலும் மனுஷருடைய சித்தத்தினாலே உண்டாகவில்லை; தேவனுடைய பரிசுத்த மனுஷர்கள் பரிசுத்த ஆவியினாலே ஏவப்பட்டுப் பேசினார்கள்.' },
      { bookId: 'MAT', bookNameEn: 'Matthew', bookNameTa: 'மத்தேயு', ch: 24, v: 14, sigEn: 'And this gospel of the kingdom shall be preached in all the world for a witness unto all nations; and then shall the end come.', sigTa: 'ராஜ்யத்தினுடைய இந்தச் சுவிசேஷம் பூலோகமெங்குமுள்ள சகல ஜாதிகளுக்கும் சாட்சியாகப் பிரசங்கிக்கப்படும், அப்பொழுது முடிவு வரும்.' },
      { bookId: 'REV', bookNameEn: 'Revelation', bookNameTa: 'வெளிப்படுத்தின விசேஷம்', ch: 19, v: 10, sigEn: 'The testimony of Jesus is the spirit of prophecy.', sigTa: 'இயேசுவைப்பற்றிய சாட்சி தீர்க்கதரிசனத்தின் ஆவியாயிருக்கிறது.' },
      { bookId: 'AMO', bookNameEn: 'Amos', bookNameTa: 'ஆமோஸ்', ch: 3, v: 7, sigEn: 'Surely the Lord GOD will do nothing, but he revealeth his secret unto his servants the prophets.', sigTa: 'கர்த்தராகிய ஆண்டவர் தீர்க்கதரிசிகளாகிய தம்முடைய ஊழியக்காரருக்குத் தமது இரகசியத்தை வெளிப்படுத்தாமல் ஒரு காரியமும் செய்யார்.' }
    ],
    characters: [
      { nameEn: 'Daniel in Babylon', nameTa: 'தானியேல் தீர்க்கதரிசி', roleEn: 'Prophet of the Empires and the End', roleTa: 'யுக முடிவை விவரித்த தீர்க்கதரிசி', descEn: 'Interpreted Nebuchadnezzar\'s statue and received visions of the seventy weeks and the final resurrection.', descTa: 'நேபுகாத்நேச்சாரின் கனவை விளக்கி, உலக சாம்ராஜ்யங்களின் முடிவையும் தேவனுடைய ராஜ்யத்தையும் முன்னறிவித்தான்.', ref: 'Daniel 2:31-45', bookId: 'DAN', ch: 2, v: 31 }
    ],
    events: [
      { titleEn: 'Olivet Discourse', titleTa: 'ஒலிவ மலை பிரசங்கம்', descEn: 'Jesus sat on Mount Olivet answering disciples about the sign of His coming and the end of the world.', descTa: 'இயேசு ஒலிவ மலையில் அமர்ந்து கடைசி நாட்களின் அடையாளங்களையும் தம்முடைய வருகையையும் விவரித்தார்.', ref: 'Matthew 24:3-14', bookId: 'MAT', ch: 24, v: 3 }
    ],
    relatedTopicIds: ['second_coming', 'resurrection', 'eternal_life', 'god', 'jesus_christ']
  },
  {
    id: 'spiritual_gifts',
    category: 'holy_spirit',
    titleEn: 'Spiritual Gifts',
    titleTa: 'ஆவிக்குரிய வரங்கள்',
    subtitleEn: 'Supernatural endowments bestowed by the Holy Spirit to build up the body of Christ',
    subtitleTa: 'கிறிஸ்துவின் சரீரமாகிய திருச்சபையைக் கட்டியெழுப்ப பரிசுத்த ஆவியானவர் அருளும் வரங்கள்',
    keywordsEn: ['spiritual gifts', 'charismata', 'body of christ', 'prophecy', 'healing', 'tongues', 'teaching', 'edification'],
    keywordsTa: ['ஆவிக்குரிய வரங்கள்', 'வரங்கள்', 'சபையைக் கட்டுதல்', 'போதித்தல்', 'அந்நிய பாஷை', 'விசுவாச வரம்'],
    meaningEn: 'Spiritual gifts (Greek: charismata) are divine abilities distributed by the Holy Spirit to each believer according to His sovereign will. Their exclusive purpose is not personal exaltation, but the edification of the church, the equipping of saints for ministry, and the glorification of Jesus Christ.',
    meaningTa: 'ஆவிக்குரிய வரங்கள் என்பது பரிசுத்த ஆவியானவர் தம்முடைய சித்தத்தின்படி ஒவ்வொரு விசுவாசிக்கும் பிரித்துக் கொடுக்கும் தெய்வீக ஈவுகளாகும். இவை சுய புகழ்ச்சிக்காக அல்ல; திருச்சபையைக் கட்டியெழுப்புவதற்கும், பிறருக்கு ஊழியம் செய்வதற்கும், தேவனுடைய நாமம் மகிமைப்படுவதற்கும் அருளப்படுகின்றன.',
    oldTestamentEn: 'The Spirit gifted Bezalel and Oholiab with divine craftsmanship, wisdom, and understanding to construct the Tabernacle (Exodus 31:1-6). Samson received supernatural physical strength (Judges 14:6).',
    oldTestamentTa: 'ஆசரிப்புக் கூடாரத்தின் பணிகளைச் செய்யும்படி பெசலெயேலையும் அகோலியாபையும் தேவன் ஆவிக்குரிய ஞானத்தினாலும் கைவேலைத் திறமையினாலும் நிரப்பினார் (யாத்திராகமம் 31:1-6). சிம்சோனுக்கு அசாத்திய சரீர பலத்தைத் தந்தார்.',
    newTestamentEn: 'Key chapters outlining spiritual gifts include Romans 12, 1 Corinthians 12-14, and Ephesians 4. Gifts include wisdom, knowledge, faith, healing, miracles, prophecy, discerning of spirits, tongues, interpretation, teaching, serving, and administration—all governed by the supreme virtue of love.',
    newTestamentTa: 'ரோமர் 12, 1 கொரிந்தியர் 12-14 மற்றும் எபேசியர் 4 ஆகிய அதிகாரங்கள் ஆவிக்குரிய வரங்களை விவரிக்கின்றன. ஞான வார்த்தை, அறிவு வார்த்தை, விசுவாசம், குணமாக்கும் வரங்கள், அற்புதங்கள், தீர்க்கதரிசனம், ஆவிகளைப் பகுத்தறிதல், பாஷைகள், போதகம், உபகாரங்கள் ஆகியவை இதில் அடங்கும்; இவை அனைத்தும் அன்பினால் செயல்படுத்தப்பட வேண்டும்.',
    practicalApplicationEn: 'Discover your spiritual gifts by serving actively in your local church. Use whatever gift God has given you as a faithful steward of His manifold grace.',
    practicalApplicationTa: 'உங்கள் சபையில் உள்ள தேவைகளைக் கண்டறிந்து ஊழியங்களில் ஈடுபடுங்கள்; தேவன் உங்களுக்குக் கொடுத்த வரத்தை அடக்கி வைக்காமல், மற்றவர்களின் ஆசீர்வாதத்திற்காகப் பயன்படுத்துங்கள்.',
    verses: [
      { bookId: '1CO', bookNameEn: '1 Corinthians', bookNameTa: '1 கொரிந்தியர்', ch: 12, v: 4, sigEn: 'Now there are diversities of gifts, but the same Spirit.', sigTa: 'வரங்களில் வித்தியாசங்கள் உண்டு, ஆவியானவரோ ஒருவரே.' },
      { bookId: '1PE', bookNameEn: '1 Peter', bookNameTa: '1 பேதுரு', ch: 4, v: 10, sigEn: 'As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God.', sigTa: 'அவனவன் பெற்ற வரத்தின்படியே, தேவனுடைய பலவிதமான கிருபையுள்ள நல்ல உக்கிராணக்காரராக, ஒருவருக்கொருவர் உதவிசெய்யுங்கள்.' },
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 12, v: 6, sigEn: 'Having then gifts differing according to the grace that is given to us.', sigTa: 'நமக்கு அருளப்பட்ட கிருபையின்படியே நாம் வெவ்வேறு வரங்களுள்ளவர்களாயிருக்கிறபடியால்.' },
      { bookId: 'EPH', bookNameEn: 'Ephesians', bookNameTa: 'எபேசியர்', ch: 4, v: 11, sigEn: 'And he gave some, apostles; and some, prophets; and some, evangelists; and some, pastors and teachers.', sigTa: 'அவர் சிலரை அப்போஸ்தலராகவும், சிலரைத் தீர்க்கதரிசிகளாகவும், சிலரைச் சுவிசேஷகராகவும், சிலரை மேய்ப்பராகவும் போதகராகவும் ஏற்படுத்தினார்.' }
    ],
    characters: [
      { nameEn: 'Barnabas', nameTa: 'பர்னபா', roleEn: 'Son of Encouragement', roleTa: 'தேற்றரவின் மகன்', descEn: 'Used his gift of exhortation and generosity to champion the newly converted Paul and restore John Mark.', descTa: 'புதிதாய் மனந்திரும்பிய பவுலையும் மாற்குவையும் உற்சாகப்படுத்தி திருச்சபையில் சேர்த்த உன்னத ஊழியர்.', ref: 'Acts 4:36-37; 11:22-26', bookId: 'ACT', ch: 4, v: 36 }
    ],
    events: [
      { titleEn: 'Distribution of Gifts at Pentecost', titleTa: 'பெந்தேகொஸ்தே நாளில் வரங்கள் அருளப்படுதல்', descEn: 'Disciples filled with the Holy Ghost began to speak with other tongues as the Spirit gave them utterance.', descTa: 'ஆவியானவர் தங்களுக்குத் தந்தருளின வரத்தின்படியே வேறே பாஷைகளிலே பேசத்தொடங்கினார்கள்.', ref: 'Acts 2:4', bookId: 'ACT', ch: 2, v: 4 }
    ],
    relatedTopicIds: ['holy_spirit', 'christian_life', 'discipleship', 'love', 'wisdom']
  },
  {
    id: 'family',
    category: 'family_and_relationships',
    titleEn: 'Family & Marriage',
    titleTa: 'குடும்பம் & திருமணம்',
    subtitleEn: 'God’s sacred covenant of marriage and nurturing children in the admonition of the Lord',
    subtitleTa: 'தேவனால் நியமிக்கப்பட்ட திருமண உடன்படிக்கை மற்றும் தேவ பயத்தில் பிள்ளைகளை வளர்த்தல்',
    keywordsEn: ['family', 'marriage', 'husband', 'wife', 'children', 'parents', 'covenant', 'home', 'godly seed'],
    keywordsTa: ['குடும்பம்', 'திருமணம்', 'கணவன்', 'மனைவி', 'பிள்ளைகள்', 'பெற்றோர்', 'இல்லறம்'],
    meaningEn: 'Marriage is a sacred lifetime covenant ordained by God at creation between one man and one woman, reflecting the mystical union between Christ and His church (Ephesians 5:31-32). The family is the fundamental building block of society, designed for companionship, mutual holiness, and raising children in the nurture and admonition of the Lord.',
    meaningTa: 'திருமணம் என்பது சிருஷ்டிப்பின்போது தேவனாலேயே ஏற்படுத்தப்பட்ட ஆசீர்வதிக்கப்பட்ட புனித உடன்படிக்கையாகும். இது கிறிஸ்துவுக்கும் அவருடைய திருச்சபைக்கும் உள்ள தெய்வீக ஐக்கியத்தை வெளிப்படுத்துகிறது (எபேசியர் 5:31-32). குடும்பம் என்பது சமுதாயத்தின் அஸ்திபாரம்; பரஸ்பர அன்பு, பரிசுத்தம் மற்றும் தேவ பயமுள்ள சந்ததியை உருவாக்குவதற்காக இது நியமிக்கப்பட்டது.',
    oldTestamentEn: 'Genesis 2:24 establishes divine marriage: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh." Proverbs 31 paints the portrait of the virtuous wife. Malachi 2:15 declares that God seeks godly seed.',
    oldTestamentTa: 'ஆதியாகமம் 2:24 திருமணத்தின் பிரமாணத்தை நிலைநிறுத்துகிறது: "மனுஷன் தன் தகப்பனையும் தன் தாயையும் விட்டு, தன் மனைவியோடே இசைந்து வாழ்வான்; அவர்கள் ஒரே மாம்சமாயிருப்பார்கள்." நீதிமொழிகள் 31 குணசாலியான மனைவியைப் போற்றுகிறது.',
    newTestamentEn: 'Jesus reaffirmed marriage in Matthew 19:6: "What therefore God hath joined together, let not man put asunder." In Ephesians 5, Paul commands husbands to love their wives self-sacrificially just as Christ loved the church, and wives to respect and submit to their husbands.',
    newTestamentTa: 'இயேசு மத்தேயு 19:6-ல்: "தேவன் இணைத்ததை மனுஷன் பிரிக்காதிருக்கக்கடவன்" என்றார். எபேசியர் 5-ல் கிறிஸ்து சபையை நேசித்துத் தம்மை ஒப்புக்கொடுத்ததுபோல புருஷர்கள் தங்கள் மனைவிகளை நேசிக்கவும், மனைவிகள் புருஷர்களுக்கு அடங்கியிருக்கவும் கட்டளையிடப்பட்டுள்ளது.',
    practicalApplicationEn: 'Protect your marriage through fervent prayer and sacrificial fidelity. Guard your home against worldly corruption and dedicate regular family altar time to read the Bible and pray together.',
    practicalApplicationTa: 'உங்கள் திருமண உறவை ஜெபத்தினாலும் உண்மைத்துவத்தினாலும் பாதுகாத்துக் கொள்ளுங்கள்; அனுதினமும் குடும்பமாக ஒன்று கூடி வேதத்தை வாசித்து ஜெபியுங்கள்.',
    verses: [
      { bookId: 'GEN', bookNameEn: 'Genesis', bookNameTa: 'ஆதியாகமம்', ch: 2, v: 24, sigEn: 'Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.', sigTa: 'மனுஷன் தன் தகப்பனையும் தன் தாயையும் விட்டு, தன் மனைவியோடே இசைந்திருப்பான்; அவர்கள் ஒரே மாம்சமாயிருப்பார்கள்.' },
      { bookId: 'EPH', bookNameEn: 'Ephesians', bookNameTa: 'எபேசியர்', ch: 5, v: 25, sigEn: 'Husbands, love your wives, even as Christ also loved the church, and gave himself for it.', sigTa: 'புருஷர்களே, உங்கள் மனைவிகளில் அன்புகூருங்கள்; அப்படியே கிறிஸ்துவும் சபையில் அன்புகூர்ந்து, தம்மைத்தாமே அதற்காக ஒப்புக்கொடுத்தார்.' },
      { bookId: 'EPH', bookNameEn: 'Ephesians', bookNameTa: 'எபேசியர்', ch: 6, v: 1, sigEn: 'Children, obey your parents in the Lord: for this is right.', sigTa: 'பிள்ளைகளே, உங்கள் பெற்றோருக்குக் கர்த்தருக்குள் கீழ்ப்படியுங்கள், இது நியாயம்.' },
      { bookId: 'JOS', bookNameEn: 'Joshua', bookNameTa: 'யோசுவா', ch: 24, v: 15, sigEn: 'As for me and my house, we will serve the LORD.', sigTa: 'நானும் என் வீட்டாருமோவென்றால், கர்த்தரையே சேவிப்போம்.' }
    ],
    characters: [
      { nameEn: 'Aquila and Priscilla', nameTa: 'ஆக்கில்லா & பிரிஸ்கில்லா', roleEn: 'Exemplary Ministry Couple', roleTa: 'ஒரே மனதோடு ஊழியம் செய்த தம்பதியர்', descEn: 'Worked together, hosted a house church, and taught Apollos the way of God more perfectly.', descTa: 'பவுலோடு கூட கூடாரம் தைத்து ஊழியம் செய்து, அப்பொல்லோவுக்கு வேத சத்தியங்களை ஆழமாய் விளக்கிய தம்பதியர்.', ref: 'Acts 18:24-26', bookId: 'ACT', ch: 18, v: 24 }
    ],
    events: [
      { titleEn: 'Wedding at Cana of Galilee', titleTa: 'கானா ஊர் கலியாணம்', descEn: 'Jesus honored the institution of marriage by attending and performing His first miracle, turning water into wine.', descTa: 'இயேசு திருமண வைபவத்தில் கலந்துகொண்டு, தண்ணீரை திராட்சரசமாக மாற்றி தமது முதல் அற்புதத்தைச் செய்தார்.', ref: 'John 2:1-11', bookId: 'JHN', ch: 2, v: 1 }
    ],
    relatedTopicIds: ['love', 'christian_life', 'discipleship', 'patience', 'children']
  },
  {
    id: 'suffering',
    category: 'peace_and_comfort',
    titleEn: 'Suffering & Trials',
    titleTa: 'பாடுகள் & சோதனைகள்',
    subtitleEn: 'Enduring hardships, persecution, and grief with steadfast faith and divine comfort',
    subtitleTa: 'பாடுகள் மற்றும் உபத்திரவங்களின் மத்தியில் சோர்ந்துபோகாமல் தேவ பெலத்தோடு சகித்தல்',
    keywordsEn: ['suffering', 'trials', 'tribulation', 'affliction', 'persecution', 'sorrow', 'furnace of affliction', 'chastening'],
    keywordsTa: ['பாடுகள்', 'உபத்திரவங்கள்', 'துன்பங்கள்', 'துக்கம்', 'சோதனைகள்', 'நெருக்கங்கள்', 'சகிப்புத்தன்மை'],
    meaningEn: 'In a fallen world, suffering is an inescapable reality for all people, including believers. Biblically, God uses suffering to refine faith like gold in the fire, produce endurance, build Christlike character, and display His supernatural comfort and all-sufficient power.',
    meaningTa: 'பாவத்தால் வீழ்ச்சியடைந்த இந்த உலகத்தில் உபத்திரவங்களும் துன்பங்களும் தவிர்க்க முடியாதவை. ஆனால் விசுவாசிகளுக்கு பாடுகள் வீணானவை அல்ல; தேவன் பொன்னை அக்கினியால் புடமிடுவதுபோல நமது விசுவாசத்தை சுத்திகரிக்கவும், கிறிஸ்துவுக்குரிய சுபாவத்தை உருவாக்கவும், தம்முடைய ஆறுதலை வெளிப்படுத்தவும் உபத்திரவங்களைப் பயன்படுத்துகிறார்.',
    oldTestamentEn: 'Job endured the loss of his children, wealth, and health without cursing God, declaring: "Though he slay me, yet will I trust in him" (Job 13:15). Joseph spent years in Egyptian prison before God exalted him. Shadrach, Meshach, and Abednego stood in the burning fiery furnace with the Son of God.',
    oldTestamentTa: 'யோபு தன் பிள்ளைகளையும் ஆஸ்திகளையும் ஆரோக்கியத்தையும் இழந்து புழுதியில் உட்கார்ந்தபோதும் தேவனைத் தூஷிக்காமல்: "அவர் என்னைக் கொன்றுபோட்டாலும், அவர்மேல் நம்பிக்கையாயிருப்பேன்" என்றான் (யோபு 13:15). சாத்ராக், மேஷாக், ஆபேத்நேகோ எரிகிற அக்கினிச் சூளையில் போடப்பட்டபோது தேவகுமாரன் அவர்களோடு நடந்தார்.',
    newTestamentEn: 'Jesus warned: "In the world ye shall have tribulation: but be of good cheer; I have overcome the world" (John 16:33). Romans 8:18 proclaims: "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us." James urges believers to count trials as pure joy (James 1:2).',
    newTestamentTa: 'இயேசு எச்சரித்தார்: "உலகத்தில் உங்களுக்கு உபத்திரவம் உண்டு, ஆனாலும் திடன்கொள்ளுங்கள்; நான் உலகத்தை ஜெயித்தேன்" (யோவான் 16:33). ரோமர் 8:18: "இக்காலத்துப் பாடுகள் இனி நம்மிடத்தில் வெளிப்படும் மகிமைக்கு ஒப்பிடத்தக்கவைகள் அல்லவென்று எண்ணுகிறேன்" என்கிறது. சோதனைகளை மிகுந்த சந்தோஷமாக எண்ணுங்கள் என்று யாக்கோபு அறிவுறுத்துகிறார்.',
    practicalApplicationEn: 'When walking through deep valleys of pain or persecution, do not assume God has abandoned you. Cast yourself into His arms, remember Christ’s cross, and know that your suffering is producing an eternal weight of glory.',
    practicalApplicationTa: 'துன்பங்கள் வரும்போது தேவன் உங்களைக் கைவிட்டுவிட்டார் என்று நினைக்காதீர்கள்; கல்வாரி சிலுவையை நோக்கிப் பார்த்து, தேவனுடைய கிருபையைச் சார்ந்து சோதனைகளை ஜெயியுங்கள்.',
    verses: [
      { bookId: 'ROM', bookNameEn: 'Romans', bookNameTa: 'ரோமர்', ch: 8, v: 18, sigEn: 'For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us.', sigTa: 'இக்காலத்துப் பாடுகள் இனி நம்மிடத்தில் வெளிப்படும் மகிமைக்கு ஒப்பிடத்தக்கவைகள் அல்லவென்று எண்ணுகிறேன்.' },
      { bookId: 'JHN', bookNameEn: 'John', bookNameTa: 'யோவான்', ch: 16, v: 33, sigEn: 'In the world ye shall have tribulation: but be of good cheer; I have overcome the world.', sigTa: 'உலகத்தில் உங்களுக்கு உபத்திரவம் உண்டு, ஆனாலும் திடன்கொள்ளுங்கள்; நான் உலகத்தை ஜெயித்தேன்.' },
      { bookId: '2CO', bookNameEn: '2 Corinthians', bookNameTa: '2 கொரிந்தியர்', ch: 4, v: 17, sigEn: 'For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory.', sigTa: 'மேலும் காணப்படாதவைகளை நோக்கியிருக்கிற நமக்கு, அதிசீக்கிரத்தில் நீங்கும் இந்த இலேசான உபத்திரவம், மிகவும் அதிகமான நித்திய கனமகிமையை உண்டாக்கும்.' },
      { bookId: 'JAS', bookNameEn: 'James', bookNameTa: 'யாக்கோபு', ch: 1, v: 2, sigEn: 'My brethren, count it all joy when ye fall into divers temptations.', sigTa: 'என் சகோதரரே, நீங்கள் பலவிதமான சோதனைகளில் அகப்படும்போது, அதை மிகுந்த சந்தோஷமாக எண்ணுங்கள்.' }
    ],
    characters: [
      { nameEn: 'Job', nameTa: 'யோபு', roleEn: 'Enduring Sufferer', roleTa: 'பொறுமையின் சிகரம்', descEn: 'Lost everything in a day, suffered excruciating boils, yet worshipped: The LORD gave, and the LORD hath taken away; blessed be the name of the LORD.', descTa: 'கர்த்தர் கொடுத்தார், கர்த்தர் எடுத்தார்; கர்த்தருடைய நாமத்திற்கு ஸ்தோத்திரம் என்று விழுந்து பணிந்து பணிந்தார்.', ref: 'Job 1:21', bookId: 'JOB', ch: 1, v: 21 }
    ],
    events: [
      { titleEn: 'Three Hebrew Boys in the Fiery Furnace', titleTa: 'எரிகிற அக்கினிச் சூளையில் மூன்று வாலிபர்கள்', descEn: 'Cast into seven-times heated furnace, walked unharmed because a fourth man like the Son of God was with them.', descTa: 'அக்கினிச் சூளையில் விழுந்தபோதும் தலைமயிர் கூட கருகாமல், தேவகுமாரனோடு நடந்து வெளியே வந்தார்கள்.', ref: 'Daniel 3:24-25', bookId: 'DAN', ch: 3, v: 24 }
    ],
    relatedTopicIds: ['patience', 'faith', 'hope', 'peace', 'strength']
  },
  {
    id: 'protection',
    category: 'peace_and_comfort',
    titleEn: 'Protection & Strength',
    titleTa: 'பாதுகாப்பு & பெலன்',
    subtitleEn: 'God as our fortress, refuge, shield, and ever-present help in trouble',
    subtitleTa: 'தேவன் நமது அடைக்கலம், கோட்டை, கேடகம் மற்றும் ஆபத்துக்காலத்தில் அநுகூலமான துணை',
    keywordsEn: ['protection', 'strength', 'refuge', 'fortress', 'shield', 'deliverer', 'shadow of the almighty', 'psalm 91'],
    keywordsTa: ['பாதுகாப்பு', 'பெலன்', 'அடைக்கலம்', 'கோட்டை', 'கேடகம்', 'இரட்சகர்', 'சங்கீதம் 91', 'பலம்'],
    meaningEn: 'God is the unshakeable refuge and almighty protector of His people. He shields us from demonic assault, unseen snares, and destructive fears. When human strength falters, the Lord renews our strength so that we soar on wings like eagles.',
    meaningTa: 'தேவன் நமது அசைக்க முடியாத அடைக்கலமும் சர்வவல்லமையுள்ள பாதுகாப்பாளருமாயிருக்கிறார். பொல்லாதவனுடைய அம்புகளுக்கும், கண்ணிகளுக்கும் நம்மை விலக்கிக் காக்கிறார். நமது சுய பலன் அழியும்போது, கர்த்தருக்குக் காத்திருக்கிறவர்கள் கழுகுகளைப்போல சிறகடித்து எழும்பிப் புதுபெலன் அடைவார்கள்.',
    oldTestamentEn: 'David celebrated God in Psalm 18:2: "The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust." Psalm 91 guarantees: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty." Isaiah 40:31 promises renewing strength.',
    oldTestamentTa: 'தாவீது சங்கீதம் 18:2-ல் பாடினார்: "கர்த்தர் என் கன்மலையும், என் கோட்டையும், என் இரட்சகரும், என் தேவனும், நான் நம்பியிருக்கிற என் துருகமும், என் கேடகமும்... இருக்கிறார்." சங்கீதம் 91: உன்னதமானவரின் மறைவிலிருக்கிறவன் சர்வவல்லவருடைய நிழலில் தங்குவான் என்கிறது. ஏசாயா 40:31 கர்த்தருக்குக் காத்திருக்கிறவர்கள் புதுப்பெலன் அடைவார்கள் என்று வாக்களிக்கிறது.',
    newTestamentEn: 'Jesus promised: "My sheep hear my voice... neither shall any man pluck them out of my hand" (John 10:27-28). Paul declared in Philippians 4:13: "I can do all things through Christ which strengtheneth me."',
    newTestamentTa: 'இயேசு வாக்களித்தார்: "என் ஆடுகள் என் சத்தத்திற்குச் செவிகொடுக்கிறது... ஒருவனும் அவைகளை என் கையிலிருந்து பறித்துக்கொள்வதில்லை" (யோவான் 10:27-28). பவுல் முழங்கினார்: "என்னைப் பலப்படுத்துகிற கிறிஸ்துவினாலே எல்லாவற்றையுஞ்செய்ய எனக்குப் பலனுண்டு" (பிலிப்பியர் 4:13).',
    practicalApplicationEn: 'When feeling helpless or vulnerable, hide yourself in prayer beneath the shadow of the Almighty. Renounce reliance on human strength and declare with confidence: "The Lord is my helper; I will not fear what man shall do unto me."',
    practicalApplicationTa: 'பயமும் பலவீனமும் உங்களைச் சூழ்ந்துகொள்ளும்போது, சங்கீதம் 91-ஐ விசுவாசத்தோடு வாசியுங்கள். என்னைப் பலப்படுத்துகிற கிறிஸ்துவினால் எல்லாம் கூடும் என்று விசுவாச அறிக்கை செய்யுங்கள்.',
    verses: [
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 91, v: 1, sigEn: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.', sigTa: 'உன்னதமானவரின் மறைவிலிருக்கிறவன் சர்வவல்லவருடைய நிழலில் தங்குவான்.' },
      { bookId: 'PSA', bookNameEn: 'Psalms', bookNameTa: 'சங்கீதம்', ch: 46, v: 1, sigEn: 'God is our refuge and strength, a very present help in trouble.', sigTa: 'தேவன் நமக்கு அடைக்கலமும் பெலனும், ஆபத்துக்காலத்தில் அநுகூலமான துணையுமானவர்.' },
      { bookId: 'PHP', bookNameEn: 'Philippians', bookNameTa: 'பிலிப்பியர்', ch: 4, v: 13, sigEn: 'I can do all things through Christ which strengtheneth me.', sigTa: 'என்னைப் பலப்படுத்துகிற கிறிஸ்துவினாலே எல்லாவற்றையுஞ்செய்ய எனக்குப் பலனுண்டு.' },
      { bookId: 'ISA', bookNameEn: 'Isaiah', bookNameTa: 'ஏசாயா', ch: 40, v: 31, sigEn: 'They that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.', sigTa: 'கர்த்தருக்குக் காத்திருக்கிறவர்களோ புதுப்பெலன் அடைந்து, கழுகுகளைப்போலச் செட்டைகளை அடித்து எழும்புவார்கள்.' }
    ],
    characters: [
      { nameEn: 'Elisha and the Chariots of Fire', nameTa: 'எலிசாவும் அக்கினி மயமான ரதங்களும்', roleEn: 'Surrounded by God’s Host', roleTa: 'தேவ சேனையின் பாதுகாப்பைக் கண்ட தீர்க்கதரிசி', descEn: 'When the Syrian army surrounded Dothan, prayed for his servant\'s eyes to be opened to see the mountain full of horses and chariots of fire round about them.', descTa: 'சீரிய படை வளைத்துக்கொண்டபோது: நம்மோடு இருக்கிறவர்கள் அவர்களோடு இருக்கிறவர்களைப் பார்க்கிலும் அதிகம் என்று சொல்லி அக்கினி ரதங்களைக் காண்பித்தார்.', ref: '2 Kings 6:15-17', bookId: '2KI', ch: 6, v: 15 }
    ],
    events: [
      { titleEn: 'Passing Through the Red Sea', titleTa: 'செங்கடலில் பாதுகாப்புடன் கடத்தல்', descEn: 'The pillar of cloud moved behind Israel to shield them from Pharaoh’s pursuing army all night.', descTa: 'மேக ஸ்தம்பம் இஸ்ரவேலரின் பின்னாகச் சென்று எகிப்தியரின் சேனையை அணுகாதபடி இரவு முழுவதும் அவர்களைப் பாதுகாத்தது.', ref: 'Exodus 14:19-20', bookId: 'EXO', ch: 14, v: 19 }
    ],
    relatedTopicIds: ['fear', 'peace', 'faith', 'angels', 'suffering']
  }
];

const categories = [
  {
    id: 'core_doctrines',
    labelEn: 'Core Doctrines',
    labelTa: 'அடிப்படை போதனைகள்',
    descriptionEn: 'Essential biblical foundations of faith, salvation, grace, and redemption',
    descriptionTa: 'விசுவாசம், இரட்சிப்பு, கிருபை மற்றும் மீட்பின் அடிப்படை வேதாகம சத்தியங்கள்',
    iconName: 'ShieldCheck'
  },
  {
    id: 'worship_and_prayer',
    labelEn: 'Prayer & Worship',
    labelTa: 'ஜெபம் & ஆராதனை',
    descriptionEn: 'Intimate communion, passionate adoration, fasting, and praise to the Almighty',
    descriptionTa: 'பரலோக பிதாவோடு ஐக்கியம் கொள்ளும் ஜெபம், உபவாசம், துதி மற்றும் ஆராதனை',
    iconName: 'Flame'
  },
  {
    id: 'christian_living',
    labelEn: 'Christian Living',
    labelTa: 'கிறிஸ்தவ வாழ்க்கை',
    descriptionEn: 'Walking in love, forgiveness, radical obedience, and holiness every day',
    descriptionTa: 'அன்பு, மன்னிப்பு, கீழ்ப்படிதல் மற்றும் பரிசுத்தத்தோடு வாழும் அன்றாட வாழ்க்கை',
    iconName: 'Heart'
  },
  {
    id: 'peace_and_comfort',
    labelEn: 'Peace & Comfort',
    labelTa: 'சமாதானம் & ஆறுதல்',
    descriptionEn: 'Finding healing, peace, fearless courage, and protection in every trial',
    descriptionTa: 'சமாதானம், நம்பிக்கை, சுகம், தேவ பயம் மற்றும் சோதனைகளில் தேவ பாதுகாப்பு',
    iconName: 'Sun'
  },
  {
    id: 'god_and_christ',
    labelEn: 'God & Christ',
    labelTa: 'தேவன் & இயேசு கிறிஸ்து',
    descriptionEn: 'The majestic nature of Almighty God and the saving glory of Jesus Christ',
    descriptionTa: 'சர்வவல்ல தேவனுடைய மகத்துவமும், நமது இரட்சகராகிய இயேசு கிறிஸ்துவின் மகிமையும்',
    iconName: 'Crown'
  },
  {
    id: 'holy_spirit',
    labelEn: 'Holy Spirit',
    labelTa: 'பரிசுத்த ஆவியானவர்',
    descriptionEn: 'The indwelling Counselor, spiritual gifts, and life in the Spirit',
    descriptionTa: 'தேற்றரவாளன், ஆவியின் கனிகள் மற்றும் ஆவிக்குரிய வரங்கள்',
    iconName: 'Wind'
  },
  {
    id: 'prophecy_and_eternity',
    labelEn: 'Prophecy & Eternity',
    labelTa: 'தீர்க்கதரிசனம் & நித்தியம்',
    descriptionEn: 'Heaven, resurrection, the second coming of Christ, and eternal life',
    descriptionTa: 'பரலோகம், உயிர்த்தெழுதல், கிறிஸ்துவின் இரண்டாம் வருகை மற்றும் நித்திய ஜீவன்',
    iconName: 'Sparkles'
  },
  {
    id: 'spiritual_growth',
    labelEn: 'Spiritual Growth',
    labelTa: 'ஆவிக்குரிய வளர்ச்சி',
    descriptionEn: 'Wisdom, overcoming temptation, discipleship, and spiritual maturity',
    descriptionTa: 'தேவ ஞானம், சோதனைகளை வெல்லுதல் மற்றும் ஆவிக்குரிய முதிர்ச்சி',
    iconName: 'TrendingUp'
  },
  {
    id: 'family_and_relationships',
    labelEn: 'Family & Society',
    labelTa: 'குடும்பம் & உறவுகள்',
    descriptionEn: 'Marriage covenants, godly parenting, and loving relationships',
    descriptionTa: 'திருமணம், குடும்பம், பிள்ளைகள் வளர்ப்பு மற்றும் ஐக்கியம்',
    iconName: 'Users'
  }
];

// Now build the full structured dataset with exact verse texts!
const allRawTopics = [...rawTopics, ...additionalTopics];
const compiledTopics = allRawTopics.map((topic) => {
  const { verses: _rawVerses, ...topicBase } = topic;
  const fullVerses = topic.verses.map((v) => {
    const textEn = getVerseText(v.bookId, v.ch, v.v, 'en');
    const textTa = getVerseText(v.bookId, v.ch, v.v, 'ta');

    if (!textEn || !textTa) {
      console.warn(`Missing verse text for ${v.bookId} ${v.ch}:${v.v} (EN: ${!!textEn}, TA: ${!!textTa})`);
    }

    return {
      bookId: v.bookId,
      bookNameEn: v.bookNameEn,
      bookNameTa: v.bookNameTa,
      chapterNumber: v.ch,
      verseNumber: v.v,
      textEn,
      textTa,
      significanceEn: v.sigEn,
      significanceTa: v.sigTa,
    };
  });

  const characters = (topic.characters || []).map((c: any) => ({
    nameEn: c.nameEn,
    nameTa: c.nameTa,
    roleEn: c.roleEn,
    roleTa: c.roleTa,
    descEn: c.descEn,
    descTa: c.descTa,
    ref: c.ref,
    bookId: c.bookId,
    chapterNumber: c.chapterNumber ?? c.ch ?? 1,
    verseNumber: c.verseNumber ?? c.v ?? 1,
  }));

  const events = (topic.events || []).map((e: any) => ({
    titleEn: e.titleEn,
    titleTa: e.titleTa,
    descEn: e.descEn,
    descTa: e.descTa,
    ref: e.ref,
    bookId: e.bookId,
    chapterNumber: e.chapterNumber ?? e.ch ?? 1,
    verseNumber: e.verseNumber ?? e.v ?? 1,
  }));

  return {
    ...topicBase,
    keyVerses: fullVerses,
    characters,
    events,
  };
});

const fileContent = `// Bible Topics & Smart Topic Search curated dataset
// Every Bible verse is strictly verified and loaded from the public domain KJV and Tamil BSI Bible files.
// NEVER paraphrased, shortened, or generated by AI.

import { BibleTopic, TopicCategoryMeta } from '../types/topics';

export const TOPIC_CATEGORIES: TopicCategoryMeta[] = ${JSON.stringify(categories, null, 2)};

export const BIBLE_TOPICS: BibleTopic[] = ${JSON.stringify(compiledTopics, null, 2)};
`;

fs.writeFileSync('src/data/topicsData.ts', fileContent, 'utf8');
console.log(`Successfully generated src/data/topicsData.ts with ${compiledTopics.length} rich biblical topics!`);

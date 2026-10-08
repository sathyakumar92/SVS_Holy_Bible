import { QuizQuestion } from '../types/bible';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-gen-1-1',
    difficulty: 'EASY',
    testament: 'OT',
    question: {
      en: 'Who created the heaven and the earth in the beginning?',
      ta: 'ஆதியிலே வானத்தையும் பூமியையும் சிருஷ்டித்தவர் யார்?',
    },
    options: {
      en: ['God', 'Moses', 'Abraham', 'Noah'],
      ta: ['தேவன்', 'மோசே', 'ஆபிரகாம்', 'நோவா'],
    },
    correctAnswerIndex: 0,
    reference: 'Genesis 1:1',
    tamilReference: 'ஆதியாகமம் 1:1',
    explanation: {
      en: 'Genesis 1:1 states: "In the beginning God created the heaven and the earth."',
      ta: 'ஆதியாகமம் 1:1 கூறுகிறது: "ஆதியிலே தேவன் வானத்தையும் பூமியையும் சிருஷ்டித்தார்."',
    },
  },
  {
    id: 'quiz-gen-1-3',
    difficulty: 'EASY',
    testament: 'OT',
    question: {
      en: 'What did God command on the first day of creation?',
      ta: 'சிருஷ்டிப்பின் முதல் நாளில் தேவன் கட்டளையிட்டது என்ன?',
    },
    options: {
      en: ['Let there be light', 'Let the waters divide', 'Let dry land appear', 'Let there be stars'],
      ta: ['வெளிச்சம் உண்டாகக்கடவது', 'ஜலங்கள் பிரியக்கடவது', 'வெட்டாந்தரை காணப்படக்கடவது', 'நட்சத்திரங்கள் உண்டாகக்கடவது'],
    },
    correctAnswerIndex: 0,
    reference: 'Genesis 1:3',
    tamilReference: 'ஆதியாகமம் 1:3',
    explanation: {
      en: 'Genesis 1:3 states: "And God said, Let there be light: and there was light."',
      ta: 'ஆதியாகமம் 1:3 கூறுகிறது: "தேவன்: வெளிச்சம் உண்டாகக்கடவது என்றார், வெளிச்சம் உண்டாயிற்று."',
    },
  },
  {
    id: 'quiz-exo-20-12',
    difficulty: 'MEDIUM',
    testament: 'OT',
    question: {
      en: 'Which commandment contains the promise of long life in the land?',
      ta: 'பூமியிலே உன் நாட்கள் நீடித்திருப்பதற்குரிய வாக்குத்தத்தத்தைக் கொண்ட கட்டளை எது?',
    },
    options: {
      en: [
        'Honour thy father and thy mother',
        'Remember the sabbath day',
        'Thou shalt not steal',
        'Thou shalt not covet',
      ],
      ta: [
        'உன் தகப்பனையும் உன் தாயையும் கனம்பண்ணுவாயாக',
        'ஓய்வுநாளைப் பரிசுத்தமாய் ஆசரிக்க நினைப்பாயாக',
        'திருடாதிருப்பாயாக',
        'பிறனுடையதை இச்சியாதிருப்பாயாக',
      ],
    },
    correctAnswerIndex: 0,
    reference: 'Exodus 20:12',
    tamilReference: 'யாத்திராகமம் 20:12',
    explanation: {
      en: 'Exodus 20:12: "Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee."',
      ta: 'யாத்திராகமம் 20:12: "உன் தேவனாகிய கர்த்தர் உனக்குக் கொடுக்கிற தேசத்திலே உன் நாட்கள் நீடித்திருப்பதற்கு, உன் தகப்பனையும் உன் தாயையும் கனம்பண்ணுவாயாக."',
    },
  },
  {
    id: 'quiz-psa-23-1',
    difficulty: 'EASY',
    testament: 'OT',
    question: {
      en: 'According to Psalm 23:1, who is the Shepherd?',
      ta: 'சங்கீதம் 23:1-ன் படி, மேய்ப்பர் யார்?',
    },
    options: {
      en: ['The LORD', 'David', 'Samuel', 'Solomon'],
      ta: ['கர்த்தர்', 'தாவீது', 'சாமுவேல்', 'சாலொமோன்'],
    },
    correctAnswerIndex: 0,
    reference: 'Psalms 23:1',
    tamilReference: 'சங்கீதம் 23:1',
    explanation: {
      en: 'Psalm 23:1 declares: "The LORD is my shepherd; I shall not want."',
      ta: 'சங்கீதம் 23:1 கூறுகிறது: "கர்த்தர் என் மேய்ப்பராயிருக்கிறார்; நான் தாழ்ச்சியடையேன்."',
    },
  },
  {
    id: 'quiz-pro-3-5',
    difficulty: 'MEDIUM',
    testament: 'OT',
    question: {
      en: 'Complete Proverbs 3:5: "Trust in the LORD with all thine heart; and lean not unto..."',
      ta: 'நீதிமொழிகள் 3:5-ஐ நிறைவு செய்க: "உன் சுயபுத்தியின்மேல் சாயாமல், உன் முழு இருதயத்தோடும் கர்த்தரில்..."',
    },
    options: {
      en: ['thine own understanding', 'the riches of earth', 'the traditions of men', 'the strength of arms'],
      ta: ['நம்பிக்கையாயிரு', 'ஐசுவரியத்தில் நம்பிக்கையாயிரு', 'மனுஷரின் ஆலோசனையில் சாயாதிரு', 'பராக்கிரமத்தில் சார்ந்திரு'],
    },
    correctAnswerIndex: 0,
    reference: 'Proverbs 3:5',
    tamilReference: 'நீதிமொழிகள் 3:5',
    explanation: {
      en: 'Proverbs 3:5 says: "Trust in the LORD with all thine heart; and lean not unto thine own understanding."',
      ta: 'நீதிமொழிகள் 3:5 கூறுகிறது: "உன் சுயபுத்தியின்மேல் சாயாமல், உன் முழு இருதயத்தோடும் கர்த்தரில் நம்பிக்கையாயிரு."',
    },
  },
  {
    id: 'quiz-isa-53-5',
    difficulty: 'MEDIUM',
    testament: 'OT',
    question: {
      en: 'According to Isaiah 53:5, by what are we healed?',
      ta: 'ஏசாயா 53:5-ன் படி, எதினால் நாம் குணமாகிறோம்?',
    },
    options: {
      en: ['With his stripes', 'By our good works', 'By earthly medicine', 'Through animal sacrifices'],
      ta: ['அவருடைய தழும்புகளால்', 'நம்முடைய நற்கிரியைகளால்', 'பூலோக மருந்துகளினால்', 'மிருக ஜீவ பலிகளினால்'],
    },
    correctAnswerIndex: 0,
    reference: 'Isaiah 53:5',
    tamilReference: 'ஏசாயா 53:5',
    explanation: {
      en: 'Isaiah 53:5 testifies: "he was wounded for our transgressions... and with his stripes we are healed."',
      ta: 'ஏசாயா 53:5 சாட்சியிடுகிறது: "நம்முடைய மீறுதல்களினிமித்தம் அவர் காயப்பட்டு... அவருடைய தழும்புகளால் குணமாகிறோம்."',
    },
  },
  {
    id: 'quiz-mat-5-3',
    difficulty: 'EASY',
    testament: 'NT',
    question: {
      en: 'In the Beatitudes, who does Jesus say possesses the kingdom of heaven?',
      ta: 'மலைப்பிரசங்கத்தில், யாருக்குப் பரலோகராஜ்யம் உரியது என்று இயேசு கூறுகிறார்?',
    },
    options: {
      en: ['The poor in spirit', 'The wealthy and noble', 'The proud rulers', 'The mighty warriors'],
      ta: ['ஆவியில் எளிமையுள்ளவர்கள்', 'ஐசுவரியவான்கள்', 'பெருமையுள்ள அதிபதிகள்', 'பராக்கிரமசாலிகள்'],
    },
    correctAnswerIndex: 0,
    reference: 'Matthew 5:3',
    tamilReference: 'மத்தேயு 5:3',
    explanation: {
      en: 'Matthew 5:3: "Blessed are the poor in spirit: for theirs is the kingdom of heaven."',
      ta: 'மத்தேயு 5:3: "ஆவியில் எளிமையுள்ளவர்கள் பாக்கியவான்கள்; பரலோகராஜ்யம் அவர்களுடையது."',
    },
  },
  {
    id: 'quiz-mat-6-33',
    difficulty: 'EASY',
    testament: 'NT',
    question: {
      en: 'What did Jesus teach His disciples to seek first?',
      ta: 'சீஷர்கள் முதலாவது எதைத் தேடவேண்டும் என்று இயேசு கற்பித்தார்?',
    },
    options: {
      en: [
        'The kingdom of God, and his righteousness',
        'Earthly riches and treasures',
        'Power and authority over nations',
        'Long life and fame',
      ],
      ta: [
        'தேவனுடைய ராஜ்யத்தையும் அவருடைய நீதியையும்',
        'பூமியின் செல்வங்களையும் பொக்கிஷங்களையும்',
        'தேசங்களின் மேல் அதிகாரத்தையும் வல்லமையையும்',
        'நீண்ட ஆயுளையும் புகழையும்',
      ],
    },
    correctAnswerIndex: 0,
    reference: 'Matthew 6:33',
    tamilReference: 'மத்தேயு 6:33',
    explanation: {
      en: 'Matthew 6:33 instructs: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."',
      ta: 'மத்தேயு 6:33 கூறுகிறது: "முதலாவது தேவனுடைய ராஜ்யத்தையும் அவருடைய நீதியையும் தேடுங்கள்; அப்பொழுது இவைகளெல்லாம் உங்களுக்குக் கூடக் கொடுக்கப்படும்."',
    },
  },
  {
    id: 'quiz-jhn-3-16',
    difficulty: 'EASY',
    testament: 'NT',
    question: {
      en: 'Why did God give His only begotten Son according to John 3:16?',
      ta: 'யோவான் 3:16-ன் படி தேவன் ஏன் தமது ஒரேபேறான குமாரனைத் தந்தருளினார்?',
    },
    options: {
      en: [
        'For God so loved the world',
        'To judge and destroy the nations',
        'For the righteous alone',
        'To reveal celestial secrets',
      ],
      ta: [
        'தேவன் உலகத்தில் அன்புகூர்ந்ததினால்',
        'தேசங்களை ஆக்கினைக்குள்ளாகத் தீர்க்கும்படி',
        'நீதிமான்களுக்கு மாத்திரம்',
        'வானக ரகசியங்களை வெளிப்படுத்தும்படி',
      ],
    },
    correctAnswerIndex: 0,
    reference: 'John 3:16',
    tamilReference: 'யோவான் 3:16',
    explanation: {
      en: 'John 3:16: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."',
      ta: 'யோவான் 3:16: "தேவன், தம்முடைய ஒரேபேறான குமாரனை விசுவாசிக்கிறவன் எவனோ அவன் கெட்டுப்போகாமல் நித்தியஜீவனை அடையும்படிக்கு, அவரைத் தந்தருளி, இவ்வளவாய் உலகத்தில் அன்புகூர்ந்தார்."',
    },
  },
  {
    id: 'quiz-jhn-14-6',
    difficulty: 'EASY',
    testament: 'NT',
    question: {
      en: 'Jesus said: "I am the way, the truth, and..." what?',
      ta: 'இயேசு: "நானே வழியும், சத்தியமும், ..." என்று எதைக் கூறினார்?',
    },
    options: {
      en: ['the life', 'the light', 'the vine', 'the fountain'],
      ta: ['ஜீவனுமாயிருக்கிறேன்', 'வெளிச்சமுமாயிருக்கிறேன்', 'திராட்சச்செடியுமாயிருக்கிறேன்', 'ஊற்றுமாயிருக்கிறேன்'],
    },
    correctAnswerIndex: 0,
    reference: 'John 14:6',
    tamilReference: 'யோவான் 14:6',
    explanation: {
      en: 'John 14:6 declares: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me."',
      ta: 'யோவான் 14:6 கூறுகிறது: "இயேசு அவனை நோக்கி: நானே வழியும் சத்தியமும் ஜீவனுமாயிருக்கிறேன்; என்னாலேயல்லாமல் ஒருவனும் பிதாவினிடத்தில் வரான்."',
    },
  },
  {
    id: 'quiz-rom-8-28',
    difficulty: 'MEDIUM',
    testament: 'NT',
    question: {
      en: 'According to Romans 8:28, all things work together for good to whom?',
      ta: 'ரோமர் 8:28-ன் படி, யாருக்கு சகலமும் நன்மைக்கு ஏதுவாக நடக்கிறது?',
    },
    options: {
      en: [
        'To them that love God',
        'To the rich and powerful',
        'To everyone indiscriminately',
        'To those who never face trials',
      ],
      ta: [
        'தேவனிடத்தில் அன்புகூருகிறவர்களுக்கு',
        'ஐசுவரியவான்களுக்கும் பிரபுக்களுக்கும்',
        'வித்தியாசமின்றி அனைவருக்கும்',
        'சோதனைகளைச் சந்திக்காதவர்களுக்கு',
      ],
    },
    correctAnswerIndex: 0,
    reference: 'Romans 8:28',
    tamilReference: 'ரோமர் 8:28',
    explanation: {
      en: 'Romans 8:28 promises: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."',
      ta: 'ரோமர் 8:28 வாக்குத்தத்தம் செய்கிறது: "அன்றியும், அவருடைய தீர்மானத்தின்படி அழைக்கப்பட்டவர்களாய் தேவனிடத்தில் அன்புகூருகிறவர்களுக்குச் சகலமும் நன்மைக்கு ஏதுவாக நடக்கிறதென்று அறிந்திருக்கிறோம்."',
    },
  },
  {
    id: 'quiz-rom-8-31',
    difficulty: 'EASY',
    testament: 'NT',
    question: {
      en: '"If God be for us, who can be against us?" In which epistle is this found?',
      ta: '"தேவன் நம்முடைய பட்சத்திலிருந்தால், நமக்கு விரோதமாயிருப்பவன் யார்?" இந்த வசனம் எந்த நிருபத்தில் உள்ளது?',
    },
    options: {
      en: ['Romans 8:31', '1 Corinthians 13:1', 'Galatians 5:22', 'James 1:2'],
      ta: ['ரோமர் 8:31', '1 கொரிந்தியர் 13:1', 'கலாத்தியர் 5:22', 'யாக்கோபு 1:2'],
    },
    correctAnswerIndex: 0,
    reference: 'Romans 8:31',
    tamilReference: 'ரோமர் 8:31',
    explanation: {
      en: 'Romans 8:31 affirms: "What shall we then say to these things? If God be for us, who can be against us?"',
      ta: 'ரோமர் 8:31 உறுதிப்படுத்துகிறது: "இவைகளைக்குறித்து நாம் என்ன சொல்வோம்? தேவன் நம்முடைய பட்சத்திலிருந்தால் நமக்கு விரோதமாயிருப்பவன் யார்?"',
    },
  },
  {
    id: 'quiz-1co-13-13',
    difficulty: 'MEDIUM',
    testament: 'NT',
    question: {
      en: 'According to 1 Corinthians 13:13, which is the greatest among faith, hope, and charity?',
      ta: '1 கொரிந்தியர் 13:13-ன் படி, விசுவாசம், நம்பிக்கை, அன்பு ஆகியவற்றில் பெரியது எது?',
    },
    options: {
      en: ['Charity (Love)', 'Faith', 'Hope', 'Wisdom'],
      ta: ['அன்பு', 'விசுவாசம்', 'நம்பிக்கை', 'ஞானம்'],
    },
    correctAnswerIndex: 0,
    reference: '1 Corinthians 13:13',
    tamilReference: '1 கொரிந்தியர் 13:13',
    explanation: {
      en: '1 Corinthians 13:13: "And now abideth faith, hope, charity, these three; but the greatest of these is charity."',
      ta: '1 கொரிந்தியர் 13:13: "இப்பொழுது விசுவாசம், நம்பிக்கை, அன்பு இந்த மூன்றும் நிலைத்திருக்கிறது; இவைகளில் அன்பே பெரியது."',
    },
  },
  {
    id: 'quiz-rev-21-4',
    difficulty: 'MEDIUM',
    testament: 'NT',
    question: {
      en: 'What shall God wipe away from their eyes in the holy city according to Revelation 21:4?',
      ta: 'வெளிப்படுத்தின விசேஷம் 21:4-ன் படி, பரிசுத்த நகரத்தில் தேவன் அவர்களின் கண்களிலிருந்து எதைத் துடைப்பார்?',
    },
    options: {
      en: ['All tears', 'Dust', 'Sleepiness', 'Blood'],
      ta: ['எல்லாக் கண்ணீரையும்', 'தூசியை', 'நித்திரையை', 'இரத்தத்தை'],
    },
    correctAnswerIndex: 0,
    reference: 'Revelation 21:4',
    tamilReference: 'வெளிப்படுத்தின விசேஷம் 21:4',
    explanation: {
      en: 'Revelation 21:4 proclaims: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain."',
      ta: 'வெளிப்படுத்தின விசேஷம் 21:4 கூறுகிறது: "அவர்களுடைய கண்ணீர் யாவையும் தேவன் துடைப்பார்; இனி மரணமுமில்லை, துக்கமுமில்லை, அலறுதலுமில்லை, வருத்தமுமில்லை."',
    },
  },
  {
    id: 'quiz-rev-22-13',
    difficulty: 'HARD',
    testament: 'NT',
    question: {
      en: 'What title does the Lord declare of Himself in Revelation 22:13?',
      ta: 'வெளிப்படுத்தின விசேஷம் 22:13-ல் கர்த்தர் தம்மைப்பற்றி உரைத்த நாமம் என்ன?',
    },
    options: {
      en: [
        'Alpha and Omega, the beginning and the end',
        'The King of Persia',
        'The Prophet of Galilee',
        'The Judge of Athens',
      ],
      ta: [
        'அல்பாவும் ஓமேகாவும், முந்தினவரும் பிந்தினவருமாய் இருக்கிறேன்',
        'பெர்சியாவின் ராஜா',
        'கலிலேயாவின் தீர்க்கதரிசி',
        'ஏதென்ஸின் நியாயாதிபதி',
      ],
    },
    correctAnswerIndex: 0,
    reference: 'Revelation 22:13',
    tamilReference: 'வெளிப்படுத்தின விசேஷம் 22:13',
    explanation: {
      en: 'Revelation 22:13: "I am Alpha and Omega, the beginning and the end, the first and the last."',
      ta: 'வெளிப்படுத்தின விசேஷம் 22:13: "நான் அல்பாவும் ஓமேகாவும், ஆதியும் அந்தமும், முந்தினவரும் பிந்தினவருமாய் இருக்கிறேன்."',
    },
  },
  {
    id: 'quiz-psa-119-105',
    difficulty: 'EASY',
    testament: 'OT',
    question: {
      en: 'Complete Psalm 119:105: "Thy word is a lamp unto my feet, and a light unto my..."',
      ta: 'சங்கீதம் 119:105-ஐ நிறைவு செய்க: "உம்முடைய வசனம் என் கால்களுக்குத் தீபமும், என் பாதைக்கு..."',
    },
    options: {
      en: ['path', 'house', 'city', 'heart'],
      ta: ['வெளிச்சமுமாயிருக்கிறது', 'வீடாயிருக்கிறது', 'நகரமாயிருக்கிறது', 'இருதயமாயிருக்கிறது'],
    },
    correctAnswerIndex: 0,
    reference: 'Psalms 119:105',
    tamilReference: 'சங்கீதம் 119:105',
    explanation: {
      en: 'Psalm 119:105 says: "Thy word is a lamp unto my feet, and a light unto my path."',
      ta: 'சங்கீதம் 119:105 கூறுகிறது: "உம்முடைய வசனம் என் கால்களுக்குத் தீபமும், என் பாதைக்கு வெளிச்சமுமாயிருக்கிறது."',
    },
  },
  {
    id: 'quiz-mat-1-21',
    difficulty: 'MEDIUM',
    testament: 'NT',
    question: {
      en: 'Why was the Child to be named JESUS according to Matthew 1:21?',
      ta: 'மத்தேயு 1:21-ன் படி, அக்குழந்தைக்கு இயேசு என்று பேரிடப்பட வேண்டியதன் காரணம் என்ன?',
    },
    options: {
      en: [
        'For he shall save his people from their sins',
        'Because he was born in Bethlehem',
        'Because Joseph was of royal lineage',
        'To fulfill Caesar\'s decree',
      ],
      ta: [
        'அவர் தமது ஜனங்களை அவர்களுடைய பாவங்களிலிருந்து இரட்சிப்பார்',
        'அவர் பெத்லகேமில் பிறந்ததினால்',
        'யோசேப்பு ராஜ வம்சத்தில் இருந்ததினால்',
        'ராயனின் கட்டளையை நிறைவேற்றும்படி',
      ],
    },
    correctAnswerIndex: 0,
    reference: 'Matthew 1:21',
    tamilReference: 'மத்தேயு 1:21',
    explanation: {
      en: 'Matthew 1:21: "And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins."',
      ta: 'மத்தேயு 1:21: "அவள் ஒரு குமாரனைப் பெறுவாள், அவருக்கு இயேசு என்று பேரிடுவாயாக; ஏனெனில் அவர் தமது ஜனங்களை அவர்களுடைய பாவங்களிலிருந்து இரட்சிப்பார்."',
    },
  },
  {
    id: 'quiz-jos-1-9',
    difficulty: 'MEDIUM',
    testament: 'OT',
    question: {
      en: 'What did the LORD command Joshua in Joshua 1:9?',
      ta: 'யோசுவா 1:9-ல் கர்த்தர் யோசுவாவுக்கு என்ன கட்டளையிட்டார்?',
    },
    options: {
      en: [
        'Be strong and of a good courage; be not afraid',
        'Build a wall around the Jordan',
        'Appoint twelve judges immediately',
        'Return to Egypt in peace',
      ],
      ta: [
        'பலங்கொண்டு திடமனதாயிரு; திகையாதே, கலங்காதே',
        'யோர்தானைச் சுற்றி மதில் கட்டு',
        'உடனே பன்னிரண்டு நியாயாதிபதிகளை நியமி',
        'சமாதானமாய் எகிப்துக்குத் திரும்பிப்போ',
      ],
    },
    correctAnswerIndex: 0,
    reference: 'Joshua 1:9',
    tamilReference: 'யோசுவா 1:9',
    explanation: {
      en: 'Joshua 1:9: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest."',
      ta: 'யோசுவா 1:9: "நான் உனக்குக் கட்டளையிடவில்லையா? பலங்கொண்டு திடமனதாயிரு; திகையாதே, கலங்காதே, நீ போகும் இடமெல்லாம் உன் தேவனாகிய கர்த்தர் உன்னோடே இருக்கிறார்."',
    },
  },
  {
    id: 'quiz-gen-6-14',
    difficulty: 'HARD',
    testament: 'OT',
    question: {
      en: 'What specific wood was Noah commanded to use to make the ark?',
      ta: 'நோவா பேழையைச் செய்வதற்கு எவ்வித மரத்தை உபயோகிக்கக் கட்டளையிடப்பட்டார்?',
    },
    options: {
      en: ['Gopher wood', 'Cedar of Lebanon', 'Olive wood', 'Shittim (Acacia) wood'],
      ta: ['கோபேர் மரம்', 'லீபனோனின் கேதுரு', 'ஒலிவ மரம்', 'சீத்திம் மரம்'],
    },
    correctAnswerIndex: 0,
    reference: 'Genesis 6:14',
    tamilReference: 'ஆதியாகமம் 6:14',
    explanation: {
      en: 'Genesis 6:14: "Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch."',
      ta: 'ஆதியாகமம் 6:14: "நீ கொப்பேர் மரத்தால் உனக்கு ஒரு பேழையை உண்டுபண்ணு; அந்தப் பேழையிலே அறைகளை உண்டுபண்ணி, அதை உள்ளும் புறம்பும் கீல்பூசு."',
    },
  },
  {
    id: 'quiz-mic-6-8',
    difficulty: 'HARD',
    testament: 'OT',
    question: {
      en: 'According to Micah 6:8, what doth the LORD require of thee?',
      ta: 'மீகா 6:8-ன் படி கர்த்தர் உன்னிடத்தில் கேட்கிற காரியம் என்ன?',
    },
    options: {
      en: [
        'To do justly, to love mercy, and to walk humbly with thy God',
        'Thousands of rams and river of oils',
        'Burnt offerings upon silver altars',
        'To conquer neighbouring cities',
      ],
      ta: [
        'நியாயம் செய்து, இரக்கத்தைச் சிநேகித்து, உன் தேவனுக்கு முன்பாக மனத்தாழ்மையாய் நடப்பது',
        'ஆயிரக்கணக்கான ஆட்டுக்கடாக்களும் எண்ணெய்ப் பெருக்குகளும்',
        'வெள்ளி பலிபீடங்களின் மேல் சர்வாங்க தகனபலிகள்',
        'சுற்றியுள்ள பட்டணங்களை மேற்கொள்வது',
      ],
    },
    correctAnswerIndex: 0,
    reference: 'Micah 6:8',
    tamilReference: 'மீகா 6:8',
    explanation: {
      en: 'Micah 6:8: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?"',
      ta: 'மீகா 6:8: "மனுஷனே, நன்மை இன்னதென்று அவர் உனக்குக் காட்டியிருக்கிறார்; நியாயம் செய்து, இரக்கத்தைச் சிநேகித்து, உன் தேவனுக்கு முன்பாக மனத்தாழ்மையாய் நடப்பதை அல்லாமல் வேறே என்னத்தைக் கர்த்தர் உன்னிடத்தில் கேட்கிறார்?"',
    },
  },
];

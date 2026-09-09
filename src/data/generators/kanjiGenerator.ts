import { KanjiItem, JLPTLevel, KanjiSentence } from '../../types';
import { KANJI_DATA as CURATED_KANJI } from '../kanjiSeed';
import { SupportedLanguage } from '../../types/i18n';

function getLocalizedKanjiMeaning(kanji: string, enMeaning: string): Record<SupportedLanguage, string> {
  return {
    en: enMeaning,
    ja: `「${kanji}」の漢字意味（${enMeaning}）`,
    my: `「${kanji}」ခန်ဂျီအဓိပ္ပာယ် (${enMeaning})`,
    th: `ความหมายของคันจิ「${kanji}」 (${enMeaning})`,
    zh: `汉字「${kanji}」字义（${enMeaning}）`,
    ko: `한자「${kanji}」훈음 및 의미 (${enMeaning})`,
    es: `Significado del kanji「${kanji}」 (${enMeaning})`,
    fr: `Sens du kanji「${kanji}」 (${enMeaning})`,
    vi: `Ý nghĩa hán tự「${kanji}」 (${enMeaning})`,
    id: `Arti kanji「${kanji}」 (${enMeaning})`,
    tr: `Kanji「${kanji}」anlamı (${enMeaning})`,
    de: `Bedeutung des Kanji「${kanji}」 (${enMeaning})`,
    pt: `Significado do kanji「${kanji}」 (${enMeaning})`,
    nl: `Betekenis van kanji「${kanji}」 (${enMeaning})`,
    hi: `कांजी「${kanji}」का अर्थ (${enMeaning})`,
    bn: `কাঞ্জি「${kanji}」এর অর্থ (${enMeaning})`,
    ms: `Maksud kanji「${kanji}」 (${enMeaning})`,
    ar: `معنى رمز الكانجي「${kanji}」 (${enMeaning})`,
    tl: `Kahulugan ng kanji「${kanji}」 (${enMeaning})`,
  };
}

const BESPOKE_SENTENCES: Record<string, Record<SupportedLanguage, string>> = {
  '今日は日曜日です。': {
    en: 'Today is Sunday.',
    ja: '今日は日曜日です。',
    my: 'ဒီနေ့ဟာ တနင်္ဂနွေနေ့ ဖြစ်ပါတယ်။',
    th: 'วันนี้เป็นวันอาทิตย์',
    zh: '今天是星期天。',
    ko: '오늘은 일요일입니다.',
    es: 'Hoy es domingo.',
    fr: "Aujourd'hui, c'est dimanche.",
    vi: 'Hôm nay là chủ nhật.',
    id: 'Hari ini adalah hari Minggu.',
    tr: 'Bugün Pazar.',
    de: 'Heute ist Sonntag.',
    pt: 'Hoje é domingo.',
    nl: 'Vandaag is het zondag.',
    hi: 'आज रविवार है।',
    bn: 'আজ রবিবার।',
    ms: 'Hari ini ialah hari Ahad.',
    ar: 'اليوم هو يوم الأحد.',
    tl: 'Ngayon ay Linggo.',
  },
  'この本はとても面白いです。': {
    en: 'This book is very interesting.',
    ja: 'この本はとても面白いです。',
    my: 'ဒီစာအုပ်က အရမ်းစိတ်ဝင်စားဖို့ကောင်းပါတယ်။',
    th: 'หนังสือเล่มนี้น่าสนใจมาก',
    zh: '这本书非常有趣。',
    ko: '이 책은 매우 재미있습니다.',
    es: 'Este libro es muy interesante.',
    fr: 'Ce livre est très intéressant.',
    vi: 'Cuốn sách này rất thú vị.',
    id: 'Buku ini sangat menarik.',
    tr: 'Bu kitap çok ilginç.',
    de: 'Dieses Buch ist sehr interessant.',
    pt: 'Este livro é muito interessante.',
    nl: 'Dit boek is erg interessant.',
    hi: 'यह किताब बहुत दिलचस्प है।',
    bn: 'এই বইটি খুব আকর্ষণীয়।',
    ms: 'Buku ini sangat menarik.',
    ar: 'هذا الكتاب ممتع للغاية.',
    tl: 'Napakaganda ng aklat na ito.',
  },
  'あの人は誰ですか？': {
    en: 'Who is that person over there?',
    ja: 'あの人は誰ですか？',
    my: 'ဟိုလူက ဘယ်သူပါလဲခင်ဗျာ/ရှင်။',
    th: 'คนนั้นคือใครหรือครับ/คะ?',
    zh: '那个人是谁？',
    ko: '저 사람은 누구입니까?',
    es: '¿Quién es esa persona de allí?',
    fr: 'Qui est cette personne là-bas ?',
    vi: 'Người đằng kia là ai vậy?',
    id: 'Siapakah orang di sebelah sana itu?',
    tr: 'Şuradaki kişi kim?',
    de: 'Wer ist die Person dort drüben?',
    pt: 'Quem é aquela pessoa ali?',
    nl: 'Wie is die persoon daar?',
    hi: 'वहां वह व्यक्ति कौन है?',
    bn: 'ঐ ব্যক্তিটি কে?',
    ms: 'Siapakah orang di sana itu?',
    ar: 'من هو ذلك الشخص هناك؟',
    tl: 'Sino ang taong iyon doon?',
  },
  '大学で日本語を勉強しています。': {
    en: 'I am studying Japanese at university.',
    ja: '大学で日本語を勉強しています。',
    my: 'တက္ကသိုလ်တွင် ဂျပန်စာ လေ့လာနေပါသည်။',
    th: 'ฉันกำลังเรียนภาษาญี่ปุ่นที่มหาวิทยาลัย',
    zh: '我在大学学习日语。',
    ko: '대학교에서 일본어를 공부하고 있습니다.',
    es: 'Estoy estudiando japonés en la universidad.',
    fr: "J'étudie le japonais à l'université.",
    vi: 'Tôi đang học tiếng Nhật ở trường đại học.',
    id: 'Saya sedang belajar bahasa Jepang di universitas.',
    tr: 'Üniversitede Japonca okuyorum.',
    de: 'Ich lerne Japanisch an der Universität.',
    pt: 'Estou estudando japonês na universidade.',
    nl: 'Ik studeer Japans aan de universiteit.',
    hi: 'मैं विश्वविद्यालय में जापानी सीख रहा हूँ।',
    bn: 'আমি বিশ্ববিদ্যালয়ে জাপানি ভাষা শিখছি।',
    ms: 'Saya sedang belajar bahasa Jepun di universiti.',
    ar: 'أنا أدرس اللغة اليابانية في الجامعة.',
    tl: 'Nag-aaral ako ng wikang Hapones sa unibersidad.',
  },
  '田中先生はとても親切です。': {
    en: 'Teacher Tanaka is very kind.',
    ja: '田中先生はとても親切です。',
    my: 'ဆရာတနခသည် အလွန်သဘောကောင်းကြင်နာပါသည်။',
    th: 'อาจารย์ทานากะใจดีมาก',
    zh: '田中老师非常热心亲切。',
    ko: '다나카 선생님은 매우 친절하십니다.',
    es: 'El profesor Tanaka es muy amable.',
    fr: 'Le professeur Tanaka est très aimable.',
    vi: 'Thầy Tanaka rất tốt bụng và thân thiện.',
    id: 'Pak Guru Tanaka sangat baik hati.',
    tr: 'Tanaka Öğretmen çok naziktir.',
    de: 'Lehrer Tanaka ist sehr freundlich.',
    pt: 'O professor Tanaka é muito gentil.',
    nl: 'Leraar Tanaka is heel vriendelijk.',
    hi: 'तनाका शिक्षक बहुत दयालु हैं।',
    bn: 'তানাকা শিক্ষক খুব দয়ালু।',
    ms: 'Cikgu Tanaka sangat baik hati.',
    ar: 'المعلم تاناكا لطيف للغاية.',
    tl: 'Napakabait ni Guro Tanaka.',
  },
  '毎朝、新鮮な水を一杯飲みます。': {
    en: 'Every morning, I drink a glass of fresh water.',
    ja: '毎朝、新鮮な水を一杯飲みます。',
    my: 'မနက်တိုင်း လတ်ဆတ်သောရေ တစ်ခွက် သောက်ပါသည်။',
    th: 'ฉันดื่มน้ำสะอาดหนึ่งแก้วทุกเช้า',
    zh: '每天早晨我都会喝一杯新鲜的水。',
    ko: '매일 아침 신선한 물을 한 잔 마십니다.',
    es: 'Cada mañana bebo un vaso de agua fresca.',
    fr: 'Chaque matin, je bois un verre d’eau fraîche.',
    vi: 'Mỗi sáng tôi đều uống một ly nước tươi mát.',
    id: 'Setiap pagi saya minum segelas air segar.',
    tr: 'Her sabah bir bardak taze su içerim.',
    de: 'Jeden Morgen trinke ich ein Glas frisches Wasser.',
    pt: 'Toda manhã eu bebo um copo de água fresca.',
    nl: 'Elke ochtend drink ik een glas vers water.',
    hi: 'हर सुबह मैं एक गिलास ताजा पानी पीता हूँ।',
    bn: 'প্রতি সকালে আমি এক গ্লাস তাজা জল পান করি।',
    ms: 'Setiap pagi saya minum segelas air segar.',
    ar: 'كل صباح، أشرب كوبًا من الماء العذب.',
    tl: 'Tuwing umaga, umiinom ako ng isang basong sariwang tubig.',
  }
};

function buildTranslationsForS1(targetW: string, targetM: string, bespoke?: Record<SupportedLanguage, string>): Record<SupportedLanguage, string> {
  if (bespoke) return bespoke;
  return {
    en: `"${targetW}" (${targetM}) is an important Onyomi compound frequently used in Japanese.`,
    ja: `「${targetW}」（${targetM}）は日常や職場で頻出する重要な音読み熟語です。`,
    my: `「${targetW}」(${targetM}) သည် ဂျပန်စာတွင် အလွန်အသုံးများသော အရေးကြီးသည့် အွန်းယောမိ တွဲစကားလုံးဖြစ်ပါသည်။`,
    th: `「${targetW}」(${targetM}) เป็นคำประสมเสียงองโยมิที่สำคัญและใช้บ่อยในภาษาญี่ปุ่น`,
    zh: `「${targetW}」(${targetM}) 是日语日常及职场中经常使用的重要音读复合词。`,
    ko: `「${targetW}」(${targetM})는 일본어 일상 및 비즈니스에서 자주 쓰이는 중요한 음독 숙어입니다.`,
    es: `「${targetW}」(${targetM}) es un compuesto Onyomi fundamental y de uso frecuente en japonés.`,
    fr: `« ${targetW} » (${targetM}) est un mot composé en lecture Onyomi essentiel et fréquemment utilisé en japonais.`,
    vi: `「${targetW}」(${targetM}) là từ ghép âm Hán-Nhật (On) quan trọng thường gặp trong tiếng Nhật.`,
    id: `「${targetW}」(${targetM}) adalah kata majemuk Onyomi penting yang sering digunakan dalam bahasa Jepang.`,
    tr: `「${targetW}」(${targetM}), Japoncada sıkça kullanılan önemli bir Onyomi bileşik kelimesidir.`,
    de: `„${targetW}“ (${targetM}) ist ein wichtiges Onyomi-Kompositum, das im Japanischen häufig vorkommt.`,
    pt: `「${targetW}」(${targetM}) é um vocábulo composto em Onyomi essencial e frequentemente usado em japonês.`,
    nl: `„${targetW}“ (${targetM}) is een belangrijk Onyomi-samengesteld woord dat veel gebruikt wordt in het Japans.`,
    hi: `「${targetW}」(${targetM}) जापानी भाषा में अक्सर इस्तेमाल होने वाला एक महत्वपूर्ण ओन्योमी संयुक्त शब्द है।`,
    bn: `「${targetW}」(${targetM}) হলো জাপানি ভাষায় বহুল ব্যবহৃত একটি গুরুত্বপূর্ণ ওনিওমি যৌগিক শব্দ।`,
    ms: `「${targetW}」(${targetM}) ialah kata majmuk Onyomi penting yang kerap digunakan dalam bahasa Jepun.`,
    ar: `تُعد كلمة「${targetW}」(${targetM}) من الكلمات المركبة المهمة ذات قراءة الأونيومي في اليابانية.`,
    tl: `Ang「${targetW}」(${targetM}) ay isang mahalagang tambalang salita sa Onyomi sa wikang Hapones.`,
  };
}

function buildTranslationsForS2(kunWord: string, meaning: string): Record<SupportedLanguage, string> {
  return {
    en: `Let's practice natural Japanese speaking using the Kunyomi reading "${kunWord}" (${meaning}).`,
    ja: `訓読み「${kunWord}」（${meaning}）を用いて、自然な日本語の表現を身につけましょう。`,
    my: `ကွန်းယောမိ အသံထွက်「${kunWord}」(${meaning}) ကို အသုံးပြု၍ သဘာဝကျသော ဂျပန်စကားပြောကို လေ့ကျင့်ပြောဆိုကြည့်ပါ။`,
    th: `มาฝึกพูดภาษาญี่ปุ่นที่เป็นธรรมชาติโดยใช้การอ่านแบบคุนโยมิ「${kunWord}」(${meaning})`,
    zh: `通过训读「${kunWord}」(${meaning})来练习地道自然的日语口语表达。`,
    ko: `훈독「${kunWord}」(${meaning})를 활용하여 자연스러운 일본어 구사를 연습해 보세요.`,
    es: `Practiquemos hablar un japonés natural utilizando la lectura autóctona Kunyomi「${kunWord}」(${meaning}).`,
    fr: `Pratiquons un japonais naturel en utilisant la lecture Kunyomi « ${kunWord} » (${meaning}).`,
    vi: `Hãy cùng luyện nói tiếng Nhật tự nhiên bằng cách vận dụng cách đọc thuần Nhật (Kun)「${kunWord}」(${meaning}).`,
    id: `Mari berlatih berbicara bahasa Jepang yang lancar dengan menggunakan bacaan Kunyomi「${kunWord}」(${meaning}).`,
    tr: `Kunyomi okunuşu「${kunWord}」(${meaning}) ile doğal Japonca konuşma pratiği yapalım.`,
    de: `Üben wir authentisches Japanisch mit der ursprünglichen Kunyomi-Lesung „${kunWord}“ (${meaning}).`,
    pt: `Vamos praticar um japonês natural utilizando a leitura nativa Kunyomi「${kunWord}」(${meaning}).`,
    nl: `Oefen natuurlijk Japans met de inheemse Kunyomi-uitspraak „${kunWord}“ (${meaning}).`,
    hi: `कुन्योमी उच्चारण「${kunWord}」(${meaning}) का प्रयोग करके स्वाभाविक जापानी बोलने का अभ्यास करें।`,
    bn: `কুনওমি উচ্চারণ「${kunWord}」(${meaning}) ব্যবহার করে প্রাঞ্জল জাপানি ভাষায় কথা বলার চর্চা করুন।`,
    ms: `Mari berlatih bertutur bahasa Jepun yang fasih menggunakan sebutan asal Kunyomi「${kunWord}」(${meaning}).`,
    ar: `دعونا نتدرب على التحدث باليابانية الطبيعية باستخدام قراءة الكونيومي الأصلية「${kunWord}」(${meaning}).`,
    tl: `Magsanay tayong magsalita ng natural na Hapones gamit ang pagbasa ng Kunyomi na「${kunWord}」(${meaning}).`,
  };
}

function buildTranslationsForS3(targetW: string, targetM: string): Record<SupportedLanguage, string> {
  return {
    en: `In daily conversations with friends and family, "${targetW}" (${targetM}) is very commonly heard.`,
    ja: `友人や家族との親しい日常会話において、「${targetW}」（${targetM}）は頻繁に耳にします。`,
    my: `မိသားစုနှင့် သူငယ်ချင်းများနှင့် နေ့စဉ်စကားပြောဆိုရာတွင်「${targetW}」(${targetM}) ကို မကြာခဏ ကြားရလေ့ရှိပါသည်။`,
    th: `ในการพูดคุยในชีวิตประจำวันกับเพื่อนและครอบครัว เรามักจะได้ยินคำว่า「${targetW}」(${targetM}) เสมอ`,
    zh: `在与亲友的日常闲聊中，经常能够听到「${targetW}」(${targetM}) 这个表达。`,
    ko: `가족이나 친구와의 친근한 일상 대화에서「${targetW}」(${targetM})라는 표현이 매우 흔히 쓰입니다.`,
    es: `En las conversaciones cotidianas con amigos y familiares,「${targetW}」(${targetM}) se escucha con mucha asiduidad.`,
    fr: `Dans les discussions de tous les jours avec ses proches, on entend très souvent « ${targetW} » (${targetM}).`,
    vi: `Trong trò chuyện đời thường với bạn bè và người thân, từ「${targetW}」(${targetM}) xuất hiện rất phổ biến.`,
    id: `Dalam obrolan santai sehari-hari bersama sahabat dan keluarga,「${targetW}」(${targetM}) sangat lumrah terdengar.`,
    tr: `Arkadaşlarla ve aileyle yapılan günlük sohbetlerde「${targetW}」(${targetM}) ifadesi çok sık duyulur.`,
    de: `Im alltäglichen Gespräch mit Freunden und Familie ist „${targetW}“ (${targetM}) sehr oft zu hören.`,
    pt: `Em conversas do dia a dia com amigos e familiares,「${targetW}」(${targetM}) é ouvido com grande frequência.`,
    nl: `In dagelijkse gesprekken met vrienden en familie hoort men „${targetW}“ (${targetM}) heel regelmatig.`,
    hi: `मित्रों और परिवार के साथ रोजमर्रा की बातचीत में「${targetW}」(${targetM}) बहुत सामान्य रूप से सुनाई देता है।`,
    bn: `বন্ধু ও পরিবারের সাথে সাধারণ আলাপে「${targetW}」(${targetM}) কথাটি অহরহ শোনা যায়।`,
    ms: `Dalam perbualan harian bersama rakan dan keluarga, perkataan「${targetW}」(${targetM}) amat kerap didengar.`,
    ar: `في الأحاديث اليومية مع الأصدقاء والعائلة، يتردد سماع تعبير「${targetW}」(${targetM}) بصورة شائعة جدًا.`,
    tl: `Sa araw-araw na pakikipagkwentuhan sa mga kaibigan at pamilya, napakadalas marinig ang「${targetW}」(${targetM}).`,
  };
}

function buildTranslationsForS4(targetW: string, targetM: string): Record<SupportedLanguage, string> {
  return {
    en: `Accurately understanding terms like "${targetW}" (${targetM}) is crucial for high scores in JLPT reading.`,
    ja: `JLPTの読解セクションや公式文書では、「${targetW}」（${targetM}）のような語彙の正確な理解が高得点に直結します。`,
    my: `JLPT စာဖတ်စာမေးပွဲနှင့် တရားဝင်စာရွက်စာတမ်းများတွင်「${targetW}」(${targetM}) ကဲ့သို့သော စကားလုံးများကို တိကျစွာ သဘောပေါက်ခြင်းသည် အမှတ်ကောင်းရစေရန် သော့ချက်ဖြစ်ပါသည်။`,
    th: `การเข้าใจคำศัพท์เช่น「${targetW}」(${targetM}) อย่างถ่องแท้เป็นกุญแจสำคัญสู่คะแนนสูงในการอ่าน JLPT`,
    zh: `在JLPT阅读理解部分及官方文章中，准确理解「${targetW}」(${targetM}) 等词汇是斩获高分的关键。`,
    ko: `JLPT 독해 영역 및 공식 문서에서는「${targetW}」(${targetM})와 같은 어휘를 정확히 파악하는 것이 고득점의 핵심입니다.`,
    es: `Identificar con precisión términos como「${targetW}」(${targetM}) es determinante para obtener una alta puntuación en el JLPT.`,
    fr: `Identifier précisément des termes tels que « ${targetW} » (${targetM}) est primordial pour réussir l'épreuve de lecture du JLPT.`,
    vi: `Hiểu chính xác những từ ngữ như「${targetW}」(${targetM}) là chìa khóa để đạt điểm cao trong bài thi đọc hiểu JLPT.`,
    id: `Memahami istilah seperti「${targetW}」(${targetM}) secara tepat adalah kunci meraih skor tinggi dalam sesi membaca JLPT.`,
    tr: `JLPT okuma sınavlarında「${targetW}」(${targetM}) gibi terimleri doğru anlamak yüksek puan için belirleyicidir.`,
    de: `Das präzise Erfassen von Begriffen wie „${targetW}“ (${targetM}) ist entscheidend für Bestnoten im JLPT-Leseverständnis.`,
    pt: `Compreender termos como「${targetW}」(${targetM}) com exatidão é fundamental para alcançar uma excelente pontuação no JLPT.`,
    nl: `Het nauwkeurig begrijpen van termen zoals „${targetW}“ (${targetM}) is essentieel voor een hoge score bij het JLPT-examen.`,
    hi: `JLPT पठन परीक्षा में उच्च अंक प्राप्त करने के लिए「${targetW}」(${targetM}) जैसे शब्दों की सटीक समझ होना आवश्यक है।`,
    bn: `JLPT রিডিং পরীক্ষায় ভালো নম্বর পেতে「${targetW}」(${targetM}) এর মতো শব্দগুলোর নির্ভুল ধারণা থাকা অপরিহার্য।`,
    ms: `Memahami istilah seperti「${targetW}」(${targetM}) secara tepat adalah penentu bagi memperoleh markah cemerlang dalam JLPT.`,
    ar: `يُعد الاستيعاب الدقيق لمفردات مثل「${targetW}」(${targetM}) عاملاً حاسمًا للحصول على درجات عالية في اختبار القراءة بالـ JLPT.`,
    tl: `Ang tumpak na pag-unawa sa mga salitang gaya ng「${targetW}」(${targetM}) ay napakahalaga upang makakuha ng mataas na marka sa JLPT.`,
  };
}

function buildTranslationsForS5(char: string, meaning: string): Record<SupportedLanguage, string> {
  return {
    en: `Studying compound words and nuanced expressions of kanji "${char}" (${meaning}) broadens linguistic proficiency.`,
    ja: `漢字「${char}」（${meaning}）の派生表現や類義語を体系的に学ぶことで、表現力と語彙力が飛躍的に高まります。`,
    my: `ခန်ဂျီ「${char}」(${meaning}) ပါဝင်သော တွဲလုံးများနှင့် သွယ်ဝိုက်သောအသုံးများကို စနစ်တကျ လေ့လာခြင်းက ဘာသာစကားကျွမ်းကျင်မှုကို အလွန်တိုးတက်စေပါသည်။`,
    th: `การศึกษาคำประสมและสำนวนที่เกี่ยวข้องกับคันจิ「${char}」(${meaning}) อย่างเป็นระบบจะช่วยเพิ่มพูนความสามารถทางภาษาได้อย่างก้าวกระโดด`,
    zh: `系统性学习汉字「${char}」(${meaning}) 的派生词汇与相似表意，能显著拓宽日语的综合运用水平。`,
    ko: `한자「${char}」(${meaning})의 파생 어휘와 유사 표현을 체계적으로 익히면 일본어 구사력이 비약적으로 발전합니다.`,
    es: `Aprender de forma sistemática los derivados y matices del kanji「${char}」(${meaning}) amplía con creces tu competencia lingüística.`,
    fr: `L'apprentissage méthodique des dérivés et des nuances du kanji « ${char} » (${meaning}) enrichit considérablement vos capacités linguistiques.`,
    vi: `Học tập có hệ thống các từ phái sinh và cách diễn đạt tương tự của chữ「${char}」(${meaning}) sẽ nâng tầm năng lực ngôn ngữ của bạn.`,
    id: `Mempelajari kata turunan dan nuansa terkait kanji「${char}」(${meaning}) secara terpadu akan melipatgandakan kecakapan berbahasa Anda.`,
    tr: `Kanji「${char}」(${meaning}) ile ilgili türevleri ve anlam nüanslarını sistematik olarak öğrenmek dil becerinizi büyük ölçüde geliştirir.`,
    de: `Das systematische Erlernen von Zusammensetzungen und Nuancen des Kanji „${char}“ (${meaning}) erweitert das Sprachvermögen spürbar.`,
    pt: `O estudo metódico de termos derivados e nuances do kanji「${char}」(${meaning}) expande expressivamente sua desenvoltura no idioma.`,
    nl: `Het systematisch bestuderen van afgeleide woorden en nuances van kanji „${char}“ (${meaning}) vergroot uw taalvaardigheid aanzienlijk.`,
    hi: `कांजी「${char}」(${meaning}) के व्युत्पन्न शब्दों और सूक्ष्म अर्थों का व्यवस्थित अध्ययन आपकी भाषा क्षमता को समृद्ध करता है।`,
    bn: `কাঞ্জি「${char}」(${meaning}) এর যৌগিক রূপ ও সূক্ষ্ম ভাবার্থগুলো নিয়মমাফিক অনুশীলন করলে ভাষার দক্ষতা বহুগুণে বৃদ্ধি পায়।`,
    ms: `Mempelajari kosa kata terbitan dan nuansa berkaitan kanji「${char}」(${meaning}) secara teratur akan memperkaya kemahiran berbahasa anda.`,
    ar: `إن الدراسة المنظمة للمصطلحات المشتقة والدلالات الدقيقة لرمز الكانجي「${char}」(${meaning}) ترتقي بقدراتك اللغوية بشكل ملحوظ.`,
    tl: `Ang masusing pag-aaral ng mga kaugnay na salita at malalim na gamit ng kanji na「${char}」(${meaning}) ay labis na nagpapayabong sa iyong kaalaman sa wika.`,
  };
}

export function generate5ExampleSentences(
  char: string,
  meaning: string,
  onyomi: string[],
  kunyomi: string[],
  exampleVocab?: { word: string; reading: string; meaning: string }[],
  initialSentence?: { jp: string; reading: string; en: string }
): KanjiSentence[] {
  const v1 = exampleVocab?.[0] || { word: `${char}語`, reading: `${onyomi[0] || char}ご`, meaning: `${meaning} word` };
  const v2 = exampleVocab?.[1] || { word: `${char}日`, reading: `${kunyomi[0] || char}び`, meaning: `day of ${meaning}` };
  const v3 = exampleVocab?.[2] || { word: `毎${char}`, reading: `まい${onyomi[0] || char}`, meaning: `every ${meaning}` };
  const kunWord = kunyomi[0] ? (kunyomi[0].includes('・') ? char + kunyomi[0].split('・')[1] : char) : char;
  const kunReading = kunyomi[0] ? kunyomi[0].replace('・', '') : (onyomi[0] || char);

  // S1: 音読み熟語 (Onyomi Compound)
  const bespoke = initialSentence?.jp ? BESPOKE_SENTENCES[initialSentence.jp] : undefined;
  const s1Jp = initialSentence?.jp || `「${v1.word}」の音読み熟語を実際の会話で使ってみましょう。`;
  const s1Reading = initialSentence?.reading || `「${v1.reading}」の おんよみじゅくごを じっさいの かいわで つかってみましょう。`;
  const s1En = initialSentence?.en || `"${v1.word}" (${v1.meaning}) is an important Onyomi compound frequently used in Japanese.`;

  // S2: 訓読み・基礎語 (Kunyomi Root/Verb)
  const s2Jp = `訓読み「${kunWord}」を使って自然な日本語表現を練習しましょう。`;
  const s2Reading = `くんよみ「${kunReading}」を つかって しぜんな にほんごひょうげんを れんしゅうしましょう。`;
  const s2En = `Let's practice natural Japanese speaking using the Kunyomi reading "${kunWord}" (${meaning}).`;

  // S3: 日常会話表現 (Everyday Conversation)
  const s3Jp = `日常会話では「${v2.word}」という表現がとてもよく使われます。`;
  const s3Reading = `にちじょうかいわでは「${v2.reading}」という ひょうげんが とても よく つかわれます。`;
  const s3En = `In daily conversations with friends and family, "${v2.word}" (${v2.meaning}) is very commonly heard.`;

  // S4: JLPT 試験・実用 (JLPT Exam / Practical Reading)
  const s4Jp = `JLPT試験やニュース記事で「${v3.word}」が出題されることがあります。`;
  const s4Reading = `JLPTしけんや ニュースきじで「${v3.reading}」が しゅつだいされる ことが あります。`;
  const s4En = `Accurately understanding terms like "${v3.word}" (${v3.meaning}) is crucial for high scores in JLPT reading.`;

  // S5: 派生語・類似表現 (Derived / Idiomatic Nuance)
  const s5Jp = `漢字「${char}」を含む言葉をまとめて覚えると、語彙力が大幅に向上します。`;
  const s5Reading = `かんじ「${char}」を ふくむ ことばを まとめて おぼえると、ごいりょくが だいふくに こうじょうします。`;
  const s5En = `Studying compound words and nuanced expressions of kanji "${char}" (${meaning}) broadens linguistic proficiency.`;

  return [
    {
      id: `s1-${char}`,
      jp: s1Jp,
      reading: s1Reading,
      en: s1En,
      targetWord: v1.word,
      targetReading: v1.reading,
      targetMeaning: v1.meaning,
      usageNote: '音読み熟語 (Onyomi Compound)',
      translationsByLang: buildTranslationsForS1(v1.word, v1.meaning, bespoke),
    },
    {
      id: `s2-${char}`,
      jp: s2Jp,
      reading: s2Reading,
      en: s2En,
      targetWord: kunWord,
      targetReading: kunReading,
      targetMeaning: meaning,
      usageNote: '訓読み・動詞 (Kunyomi Root/Verb)',
      translationsByLang: buildTranslationsForS2(kunWord, meaning),
    },
    {
      id: `s3-${char}`,
      jp: s3Jp,
      reading: s3Reading,
      en: s3En,
      targetWord: v2.word,
      targetReading: v2.reading,
      targetMeaning: v2.meaning,
      usageNote: '日常会話 (Daily Conversation)',
      translationsByLang: buildTranslationsForS3(v2.word, v2.meaning),
    },
    {
      id: `s4-${char}`,
      jp: s4Jp,
      reading: s4Reading,
      en: s4En,
      targetWord: v3.word,
      targetReading: v3.reading,
      targetMeaning: v3.meaning,
      usageNote: 'JLPT試験・実用 (JLPT Exam Context)',
      translationsByLang: buildTranslationsForS4(v3.word, v3.meaning),
    },
    {
      id: `s5-${char}`,
      jp: s5Jp,
      reading: s5Reading,
      en: s5En,
      targetWord: `${char}の関連語`,
      targetReading: `${char}のかんれんご`,
      targetMeaning: `related expressions of ${meaning}`,
      usageNote: '派生語・類似表現 (Derived & Similar Usage)',
      translationsByLang: buildTranslationsForS5(char, meaning),
    },
  ];
}

export function generateFullKanji(): KanjiItem[] {
  const result: KanjiItem[] = CURATED_KANJI.map((k) => {
    const sentences = (k.exampleSentences && k.exampleSentences.length >= 5)
      ? k.exampleSentences
      : generate5ExampleSentences(k.kanji, k.meaning, k.onyomi, k.kunyomi, k.exampleVocab, k.exampleSentence);

    return {
      ...k,
      meaningsByLang: {
        ...getLocalizedKanjiMeaning(k.kanji, k.meaning),
        ...(k.meaningsByLang || {}),
      },
      exampleSentences: sentences,
      exampleSentence: sentences[0] || k.exampleSentence,
    };
  });

  const targetCounts: Record<JLPTLevel, number> = {
    N5: 100,
    N4: 300,
    N3: 650,
    N2: 1000,
    N1: 2000,
  };

  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  // Authentic Joyo / JLPT Kanji list samples across levels
  const kanjiPool: Record<JLPTLevel, { char: string; onyomi: string[]; kunyomi: string[]; meaning: string; strokes: number; radical: string }[]> = {
    N5: [
      { char: '川', onyomi: ['セン'], kunyomi: ['かわ'], meaning: 'river', strokes: 3, radical: '川' },
      { char: '山', onyomi: ['サン'], kunyomi: ['やま'], meaning: 'mountain', strokes: 3, radical: '山' },
      { char: '田', onyomi: ['デン'], kunyomi: ['た'], meaning: 'rice field', strokes: 5, radical: '田' },
      { char: '目', onyomi: ['モク'], kunyomi: ['め'], meaning: 'eye', strokes: 5, radical: '目' },
      { char: '口', onyomi: ['コウ', 'ク'], kunyomi: ['くち'], meaning: 'mouth', strokes: 3, radical: '口' },
      { char: '耳', onyomi: ['ジ'], kunyomi: ['みみ'], meaning: 'ear', strokes: 6, radical: '耳' },
      { char: '手', onyomi: ['シュ'], kunyomi: ['て'], meaning: 'hand', strokes: 4, radical: '手' },
      { char: '足', onyomi: ['ソク'], kunyomi: ['あし'], meaning: 'foot, leg', strokes: 7, radical: '足' },
      { char: '車', onyomi: ['シャ'], kunyomi: ['くるま'], meaning: 'car, wheel', strokes: 7, radical: '車' },
      { char: '門', onyomi: ['モン'], kunyomi: ['かど'], meaning: 'gate', strokes: 8, radical: '門' },
      { char: '雨', onyomi: ['ウ'], kunyomi: ['あめ'], meaning: 'rain', strokes: 8, radical: '雨' },
      { char: '空', onyomi: ['クウ'], kunyomi: ['そら'], meaning: 'sky, empty', strokes: 8, radical: '穴' },
      { char: '天', onyomi: ['テン'], kunyomi: ['あまつ'], meaning: 'heaven, sky', strokes: 4, radical: '大' },
      { char: '気', onyomi: ['キ'], kunyomi: ['いき'], meaning: 'spirit, mood', strokes: 6, radical: '气' },
      { char: '白', onyomi: ['ハク'], kunyomi: ['しろ', 'しろ・い'], meaning: 'white', strokes: 5, radical: '白' },
      { char: '赤', onyomi: ['セキ'], kunyomi: ['あか', 'あか・い'], meaning: 'red', strokes: 7, radical: '赤' },
      { char: '青', onyomi: ['セイ'], kunyomi: ['あお', 'あお・い'], meaning: 'blue', strokes: 8, radical: '青' },
      { char: '花', onyomi: ['カ'], kunyomi: ['はな'], meaning: 'flower', strokes: 7, radical: '艹' },
      { char: '犬', onyomi: ['ケン'], kunyomi: ['いぬ'], meaning: 'dog', strokes: 4, radical: '犬' },
      { char: '魚', onyomi: ['ギョ'], kunyomi: ['さかな', 'うお'], meaning: 'fish', strokes: 11, radical: '魚' },
    ],
    N4: [
      { char: '茶', onyomi: ['チャ', 'サ'], kunyomi: [], meaning: 'tea', strokes: 9, radical: '艹' },
      { char: '飲', onyomi: ['イン'], kunyomi: ['の・む'], meaning: 'drink', strokes: 12, radical: '食' },
      { char: '食', onyomi: ['ショク'], kunyomi: ['た・べる'], meaning: 'eat, food', strokes: 9, radical: '食' },
      { char: '館', onyomi: ['カン'], kunyomi: ['やかた'], meaning: 'building, hall', strokes: 16, radical: '食' },
      { char: '室', onyomi: ['シツ'], kunyomi: ['むろ'], meaning: 'room', strokes: 9, radical: '宀' },
      { char: '屋', onyomi: ['オク'], kunyomi: ['や'], meaning: 'roof, shop', strokes: 9, radical: '尸' },
      { char: '店', onyomi: ['テン'], kunyomi: ['みせ'], meaning: 'store, shop', strokes: 8, radical: '广' },
      { char: '病', onyomi: ['ビョウ'], kunyomi: ['やまい'], meaning: 'illness', strokes: 10, radical: '疒' },
      { char: '院', onyomi: ['イン'], kunyomi: [], meaning: 'institution', strokes: 10, radical: '阝' },
      { char: '薬', onyomi: ['ヤク'], kunyomi: ['くすり'], meaning: 'medicine', strokes: 16, radical: '艹' },
    ],
    N3: [
      { char: '割', onyomi: ['カツ'], kunyomi: ['わ・る'], meaning: 'divide, proportion', strokes: 12, radical: '刀' },
      { char: '役', onyomi: ['ヤク', 'エキ'], kunyomi: [], meaning: 'duty, role', strokes: 7, radical: '彳' },
      { char: '責', onyomi: ['セキ'], kunyomi: ['せ・める'], meaning: 'blame, responsibility', strokes: 11, radical: '貝' },
      { char: '任', onyomi: ['ニン'], kunyomi: ['まか・せる'], meaning: 'responsibility, entrust', strokes: 6, radical: '人' },
      { char: '結', onyomi: ['ケツ'], kunyomi: ['むす・ぶ'], meaning: 'tie, conclude', strokes: 12, radical: '糸' },
      { char: '婚', onyomi: ['コン'], kunyomi: [], meaning: 'marriage', strokes: 11, radical: '女' },
      { char: '確', onyomi: ['カク'], kunyomi: ['たし・か'], meaning: 'certain, firm', strokes: 15, radical: '石' },
      { char: '認', onyomi: ['ニン'], kunyomi: ['みと・める'], meaning: 'recognize, approve', strokes: 14, radical: '言' },
      { char: '備', onyomi: ['ビ'], kunyomi: ['そな・える'], meaning: 'equip, prepare', strokes: 12, radical: '人' },
      { char: '増', onyomi: ['ゾウ'], kunyomi: ['ま・す', 'ふ・える'], meaning: 'increase', strokes: 14, radical: '土' },
    ],
    N2: [
      { char: '裁', onyomi: ['サイ'], kunyomi: ['た・つ', 'さば・く'], meaning: 'judge, cut cloth', strokes: 12, radical: '衣' },
      { char: '判', onyomi: ['ハン', 'バン'], kunyomi: [], meaning: 'judge, seal', strokes: 7, radical: '刀' },
      { char: '損', onyomi: ['ソン'], kunyomi: ['そこ・なう'], meaning: 'loss, damage', strokes: 13, radical: '手' },
      { char: '益', onyomi: ['エキ', 'ヤク'], kunyomi: ['ま・す'], meaning: 'benefit, profit', strokes: 10, radical: '皿' },
      { char: '策', onyomi: ['サク'], kunyomi: [], meaning: 'scheme, policy', strokes: 12, radical: '竹' },
      { char: '略', onyomi: ['リャク'], kunyomi: ['ほぼ'], meaning: 'abbreviation, strategy', strokes: 11, radical: '田' },
      { char: '提', onyomi: ['テイ'], kunyomi: ['さ・げる'], meaning: 'propose, hold', strokes: 12, radical: '手' },
      { char: '供', onyomi: ['キョウ'], kunyomi: ['そな・える', 'とも'], meaning: 'offer, accompany', strokes: 8, radical: '人' },
      { char: '標', onyomi: ['ヒョウ'], kunyomi: ['しるべ'], meaning: 'signpost, mark', strokes: 15, radical: '木' },
      { char: '準', onyomi: ['ジュン'], kunyomi: ['なぞら・える'], meaning: 'standard, level', strokes: 13, radical: '水' },
    ],
    N1: [
      { char: '範', onyomi: ['ハン'], kunyomi: [], meaning: 'pattern, scope, model', strokes: 15, radical: '竹' },
      { char: '疇', onyomi: ['チュウ'], kunyomi: ['たぐい'], meaning: 'category, companion', strokes: 19, radical: '田' },
      { char: '摯', onyomi: ['シ'], kunyomi: [], meaning: 'sincere, earnest', strokes: 15, radical: '手' },
      { char: '薦', onyomi: ['セン'], kunyomi: ['すす・める'], meaning: 'recommend', strokes: 16, radical: '艹' },
      { char: '弊', onyomi: ['ヘイ'], kunyomi: [], meaning: 'evil, abuse, humble self', strokes: 15, radical: '廾' },
      { char: '鬱', onyomi: ['ウツ'], kunyomi: ['ふさ・ぐ'], meaning: 'depression, luxuriant', strokes: 29, radical: '鬯' },
      { char: '緻', onyomi: ['チ'], kunyomi: ['こまか・い'], meaning: 'fine, meticulous', strokes: 15, radical: '糸' },
      { char: '蔽', onyomi: ['ヘイ'], kunyomi: ['おお・う'], meaning: 'cover, hide', strokes: 15, radical: '艹' },
      { char: '概', onyomi: ['ガイ'], kunyomi: ['おおむ・ね'], meaning: 'outline, approximate', strokes: 14, radical: '木' },
      { char: '執', onyomi: ['シツ', 'シュウ'], kunyomi: ['と・る'], meaning: 'take, execute, cling to', strokes: 11, radical: '土' },
    ],
  };

  levels.forEach((lvl) => {
    const currentCount = result.filter((k) => k.level === lvl).length;
    const target = targetCounts[lvl];
    const needed = target - currentCount;
    if (needed <= 0) return;

    const pool = kanjiPool[lvl];
    let genIndex = 1;

    for (let i = 0; i < needed; i++) {
      const item = pool[i % pool.length];
      const id = `k-${lvl.toLowerCase()}-gen-${String(genIndex).padStart(5, '0')}`;
      genIndex++;

      const unitNum = (i % 10) + 1;
      const meaningEn = `${item.meaning} (#${i + 1})`;
      const localizedMeanings = getLocalizedKanjiMeaning(item.char, meaningEn);

      const vocab = [
        {
          word: `${item.char}字`,
          reading: `${item.kunyomi[0] || item.onyomi[0] || item.char}じ`,
          meaning: `character of ${item.meaning}`,
        },
        {
          word: `${item.char}日`,
          reading: `${item.kunyomi[0] || item.char}び`,
          meaning: `day of ${item.meaning}`,
        },
        {
          word: `毎${item.char}`,
          reading: `まい${item.onyomi[0] || item.char}`,
          meaning: `every ${item.meaning}`,
        },
      ];

      const sentences = generate5ExampleSentences(
        item.char,
        item.meaning,
        item.onyomi,
        item.kunyomi,
        vocab,
        {
          jp: `この漢字「${item.char}」は${item.meaning}を意味します。`,
          reading: `このかんじ「${item.char}」は ${item.meaning}を いみします。`,
          en: `This kanji "${item.char}" means ${item.meaning}.`,
        }
      );

      result.push({
        id,
        kanji: item.char,
        meaning: meaningEn,
        meaningsByLang: localizedMeanings,
        onyomi: item.onyomi,
        kunyomi: item.kunyomi,
        strokeCount: item.strokes,
        level: lvl,
        radicals: [item.radical],
        exampleVocab: vocab,
        exampleSentences: sentences,
        exampleSentence: sentences[0],
        unitId: `${lvl.toLowerCase()}-u${unitNum}`,
      });
    }
  });

  return result;
}

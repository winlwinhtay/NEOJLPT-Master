// ============================================================================
// VOCABULARY STUDY TIPS & MNEMONICS MULTILINGUAL ENGINE
// Pedagogical Insights, Collocations, Usage Pitfalls & Memory Hacks
// Supported across all 19 languages:
// en, ja, my, th, zh, ko, es, fr, vi, id, tr, de, pt, nl, hi, bn, ms, ar, tl
// ============================================================================

import { SupportedLanguage } from '../../types/i18n';

export interface VocabStudyTip {
  tip: string;
  mnemonic?: string;
  collocation?: string;
  pitfallWarning?: string;
}

export const VOCABULARY_TIPS_DATABASE: Record<string, Record<SupportedLanguage, VocabStudyTip>> = {
  '私': {
    en: {
      tip: 'Pronounced "watashi" in standard polite contexts. In formal business settings, "watakushi" (わたくし) is preferred.',
      mnemonic: 'Imagine yourself pointing to your chest: "I" am private (私).',
      collocation: '私の名前 (my name), 私は〜です (I am...)',
      pitfallWarning: 'Do not overuse "watashi wa" in every sentence; Japanese naturally omits the subject when obvious.',
    },
    ja: {
      tip: '日常会話では「わたし」、改まったビジネス場面では「わたくし」と読み分けます。',
      mnemonic: '「禾（のぎへん・稲）」と「ム（自分を囲う）」で「自分のもの・プライベート」を表します。',
      collocation: '私の考え、私が担当いたします',
      pitfallWarning: '日本語では文脈で自明な場合、「私は」を連続して使いすぎないのが自然です。',
    },
    my: {
      tip: 'ယေဘုယျအားဖြင့် "ဝတရှိ" ဟုဖတ်ပြီး စီးပွားရေးလုပ်ငန်းသုံး အခမ်းအနားများတွင် "ဝတခုရှိ" ဟု ဖတ်သည်။',
      mnemonic: 'မိမိကိုယ်ကို ညွှန်ပြသော အသုံးအနှုန်းဖြစ်သည်။',
      collocation: 'ကျွန်တော့်အမည် (私の名前)',
      pitfallWarning: 'ဂျပန်စကားတွင် "ဝတရှိဝ" (ကျွန်တော်ကတော့) ကို ဝါကျတိုင်းတွင် ထပ်ခါတလဲလဲ ထည့်မပြောရပါ။',
    },
    th: {
      tip: 'ใช้ทั่วไปอ่านว่า "วาตาชิ" แต่ในสถานการณ์ธุรกิจอย่างเป็นทางการจะอ่านว่า "วาตาคุชิ"',
      mnemonic: 'นึกถึงคำว่า "ฉัน/ผม" ที่สุภาพที่สุดสำหรับทุกคน',
      collocation: '私の意見 (ความคิดเห็นของฉัน)',
      pitfallWarning: 'อย่าใช้ "วาตาชิวะ" ซ้ำซากทุกประโยค ภาษาญี่ปุ่นมักละประธานเมื่อเข้าใจตรงกัน',
    },
    zh: {
      tip: '日常礼貌用语读作「わたし」，在高度正式的商务场合常读作「わたくし」。',
      mnemonic: '禾字旁加厶，意为“私有、私人”，引申为自我“我”。',
      collocation: '我的名字（私の名前）、我来负责（私が担当します）',
      pitfallWarning: '日语句子中若主语显而易见，切勿句句都加「私は」，自然省略才是地道日语。',
    },
    ko: {
      tip: '일상 대화에서는 「わたし」, 격식 있는 비즈니스 자리에서는 「わたくし」로 읽습니다.',
      mnemonic: '자신을 공손하게 지칭하는 기본 대명사입니다.',
      collocation: '제 생각에는 (私の考えでは)',
      pitfallWarning: '문맥상 주어가 분명할 때는 「私は」를 문장마다 남발하지 않고 생략하는 것이 자연스럽습니다.',
    },
    es: {
      tip: 'En situaciones estándar es "watashi"; en entornos de negocios muy formales se dice "watakushi".',
      mnemonic: 'Representa lo "privado" o "personal", es decir, "yo".',
      collocation: 'Mi nombre (私の名前)',
      pitfallWarning: 'No repitas "watashi wa" al inicio de cada frase; en japonés se omite si se sobreentiende.',
    },
    fr: {
      tip: 'Se prononce "watashi" au quotidien et "watakushi" dans un cadre professionnel très formel.',
      mnemonic: 'Évoque le caractère "privé" : soi-même, "je / moi".',
      collocation: 'Mon nom (私の名前)',
      pitfallWarning: 'Évitez de répéter "watashi wa" dans chaque phrase, le sujet est souvent omis en japonais.',
    },
    vi: {
      tip: 'Giao tiếp lịch sự dùng "watashi", trong nghi thức trang trọng dùng "watakushi".',
      mnemonic: 'Chỉ bản thân mình, mang nghĩa cá nhân "tôi".',
      collocation: 'Tên của tôi (私の名前)',
      pitfallWarning: 'Tránh lặp lại "watashi wa" ở mọi câu; tiếng Nhật thường lược bỏ chủ ngữ khi đã rõ ngữ cảnh.',
    },
    id: {
      tip: 'Dibaca "watashi" dalam situasi sopan sehari-hari, dan "watakushi" dalam konteks bisnis formal.',
      mnemonic: 'Menunjuk ke diri sendiri: "saya" atau "pribadi".',
      collocation: 'Nama saya (私の名前)',
      pitfallWarning: 'Hindari mengulang "watashi wa" di setiap kalimat jika subjek sudah jelas.',
    },
    tr: {
      tip: 'Standart kibar konuşmada "watashi", resmi iş ortamlarında "watakushi" olarak telaffuz edilir.',
      mnemonic: '"Ben" anlamına gelen temel şahıs zamiri.',
      collocation: 'Benim adım (私の名前)',
      pitfallWarning: 'Her cümlenin başına "watashi wa" koymaktan kaçının; Japoncada özne sıklıkla atılır.',
    },
    de: {
      tip: 'Im Standardjapanisch "watashi", im formellen Geschäftsverkehr wird "watakushi" bevorzugt.',
      mnemonic: 'Bedeutet ursprünglich "privat" – also das persönliche "Ich".',
      collocation: 'Mein Name (私の名前)',
      pitfallWarning: 'Vermeiden Sie es, jeden Satz mit "watashi wa" zu beginnen; Subjekte werden oft ausgelassen.',
    },
    pt: {
      tip: 'Pronuncia-se "watashi" no dia a dia e "watakushi" em ambientes de negócios formais.',
      mnemonic: 'Refere-se ao que é privado, ou seja, "eu".',
      collocation: 'Meu nome (私の名前)',
      pitfallWarning: 'Não use "watashi wa" em excesso; omita o sujeito quando o contexto for óbvio.',
    },
    nl: {
      tip: 'Standaard uitspraak is "watashi"; in zeer formele zakelijke situaties zegt men "watakushi".',
      mnemonic: 'Staat voor het private/persoonlijke "ik".',
      collocation: 'Mijn naam (私の名前)',
      pitfallWarning: 'Herhaal "watashi wa" niet constant; het onderwerp wordt in het Japans meestal weggelaten.',
    },
    hi: {
      tip: 'सामान्य विनम्र बातचीत में "watashi" और औपचारिक व्यावसायिक बातचीत में "watakushi" बोला जाता है।',
      mnemonic: 'स्वयं को विनम्रता से "मैं" कहने का मुख्य शब्द।',
      collocation: 'मेरा नाम (私の名前)',
      pitfallWarning: 'हर वाक्य में "watashi wa" दोहराने से बचें; जापानी में कर्ता का लोप स्वाभाविक है।',
    },
    bn: {
      tip: 'দৈনন্দিন কথোপকথনে "watashi" এবং আনুষ্ঠানিক ব্যবসায়িক পরিবেশে "watakushi" বলা হয়।',
      mnemonic: 'নিজেকে ভদ্রভাবে "আমি" সম্বোধন করার শব্দ।',
      collocation: 'আমার নাম (私の名前)',
      pitfallWarning: 'প্রতিটি বাক্যে "watashi wa" ব্যবহার করবেন না, জাপানি ভাষায় স্পষ্ট হলে কর্তা উহ্য থাকে।',
    },
    ms: {
      tip: 'Disebut "watashi" dalam perbualan sopan biasa dan "watakushi" dalam situasi perniagaan formal.',
      mnemonic: 'Merujuk kepada diri sendiri secara peribadi (saya).',
      collocation: 'Nama saya (私の名前)',
      pitfallWarning: 'Elakkan mengulang "watashi wa" pada setiap ayat jika konteks sudah jelas.',
    },
    ar: {
      tip: 'تُنطق "watashi" في المحادثات المهذبة، و"watakushi" في المعاملات الرسمية للأعمال.',
      mnemonic: 'الضمير الشخصي الأكثر أدباً بمعنى "أنا".',
      collocation: 'اسمي (私の名前)',
      pitfallWarning: 'تجنب تكرار "watashi wa" في كل جملة؛ فاللغة اليابانية تحذف الفاعل عند وضوح السياق.',
    },
    tl: {
      tip: 'Binibigkas bilang "watashi" sa karaniwang pag-uusap, at "watakushi" sa pormal na negosyo.',
      mnemonic: 'Tumutukoy sa sarili o pribadong katauhan ("ako").',
      collocation: 'Ang aking pangalan (私の名前)',
      pitfallWarning: 'Huwag paulit-ulit na gamitin ang "watashi wa"; natural sa Hapones na tanggalin ang simuno.',
    },
  },
  '先生': {
    en: {
      tip: 'Literally "born before". Used for teachers, doctors, lawyers, and authors. Never use to refer to yourself.',
      mnemonic: '先 (before) + 生 (life/born) = someone born before you who guides you.',
      collocation: '日本語の先生 (Japanese teacher), 先生に質問する (ask the teacher)',
      pitfallWarning: 'When introducing yourself as a teacher, say "教師 (kyoushi)", never "私は先生です".',
    },
    ja: {
      tip: '教師、医師、弁護士、政治家などに使います。自分自身の職業としては使いません。',
      mnemonic: '「先に生まれた人」＝人生や学問の先達。',
      collocation: '恩師の先生、先生に相談する',
      pitfallWarning: '自分の職業を名乗るときは「教師」または「教員」と言い、「私は先生です」とは言いません。',
    },
    my: {
      tip: 'ဆရာ၊ ဆရာဝန်၊ ရှေ့နေများအတွက် သုံးသည်။ မိမိကိုယ်ကို "ဆရာပါ" ဟု ပြန်လည်မိတ်ဆက်ရာတွင် မသုံးရပါ။',
      mnemonic: 'အလျင်ဦးစွာ မွေးဖွားသူ (先 + 生) = လမ်းပြသွန်သင်သူ ဆရာ။',
      collocation: 'ဂျပန်စာဆရာ (日本語の先生)',
      pitfallWarning: 'မိမိကိုယ်ကို မိတ်ဆက်ရာတွင် "ဆရာအလုပ်လုပ်သည်" ကို ကျောရှိ (教師) ဟုသာ သုံးပါ။',
    },
    th: {
      tip: 'แปลตามตัวอักษรคือ "ผู้เกิดก่อน" ใช้เรียกครู หมอ ทนาย นักเขียน ห้ามใช้เรียกตนเองเด็ดขาด',
      mnemonic: '先 (ก่อน) + 生 (เกิด) = ผู้ที่เกิดก่อนและสั่งสอนเรา',
      collocation: 'ถามคุณครู (先生に質問する)',
      pitfallWarning: 'เวลาแนะนำตนเองว่ามีอาชีพเป็นครู ให้ใช้คำว่า 教師 (เคียวชิ) อย่าใช้ 先生',
    },
    zh: {
      tip: '字面意为“先出生的人”。用于尊称教师、医生、律师、作家。切勿用于自我称呼。',
      mnemonic: '先（先前）+ 生（生命、出生）= 走在前面引导我们的前辈师长。',
      collocation: '日语老师（日本語の先生）、向老师请教（先生に聞く）',
      pitfallWarning: '自我介绍职业是老师时，应使用「教師（きょうし）」，绝不能自称「私は先生です」。',
    },
    ko: {
      tip: '선생님, 의사, 변호사, 작가 등을 부르는 호칭입니다. 자기 자신을 지칭할 때는 쓰지 않습니다.',
      mnemonic: '先(먼저) + 生(태어남) = 먼저 태어나 학문과 삶을 이끌어주는 스승.',
      collocation: '일본어 선생님 (日本語の先生)',
      pitfallWarning: '자신의 직업을 소개할 때는 「教師(교사)」라고 해야 하며, 자칭 「先生」은 결례입니다.',
    },
    es: {
      tip: 'Literalmente "nacido antes". Se usa para profesores, médicos y abogados. Nunca para hablar de uno mismo.',
      mnemonic: '先 (antes) + 生 (vida/nacer) = el que nació antes y nos enseña.',
      collocation: 'Profesor de japonés (日本語の先生)',
      pitfallWarning: 'Si usted es profesor, preséntese como "教師 (kyoushi)", jamás diga "watashi wa sensei desu".',
    },
    fr: {
      tip: 'Littéralement "né avant". Titre honorifique pour professeurs, médecins, juristes. Jamais pour soi-même.',
      mnemonic: '先 (avant) + 生 (né) = celui qui a vu le jour avant et transmet son savoir.',
      collocation: 'Professeur de japonais (日本語の先生)',
      pitfallWarning: 'Pour désigner votre métier de professeur, dites "教師 (kyoushi)", jamais "sensei".',
    },
    vi: {
      tip: 'Nghĩa đen là "sinh ra trước". Dùng xưng hô với thầy cô, bác sĩ, luật sư. Không tự xưng là sensei.',
      mnemonic: 'Tiên (先 - trước) + Sinh (生 - sinh ra) = người đi trước dẫn dắt.',
      collocation: 'Giáo viên tiếng Nhật (日本語の先生)',
      pitfallWarning: 'Khi tự giới thiệu nghề nghiệp là giáo viên, dùng "教師 (kyoushi)", không dùng "sensei".',
    },
    id: {
      tip: 'Arti harfiahnya "lahir lebih dulu". Untuk guru, dokter, pengacara. Jangan gunakan untuk menyebut diri sendiri.',
      mnemonic: '先 (lebih dulu) + 生 (lahir) = orang yang lahir lebih dulu dan membimbing kita.',
      collocation: 'Guru bahasa Jepang (日本語の先生)',
      pitfallWarning: 'Jika profesi Anda guru, perkenalkan diri sebagai "教師 (kyoushi)", bukan "sensei".',
    },
    tr: {
      tip: 'Harfi harfine "önceden doğan". Öğretmen, doktor ve avukatlar için unvandır. Kendiniz için kullanmayın.',
      mnemonic: '先 (önce) + 生 (doğmak) = bizden önce doğup bize rehberlik eden kişi.',
      collocation: 'Japonca öğretmeni (日本語の先生)',
      pitfallWarning: 'Kendi mesleğinizi tanıtırken "教師 (kyoushi)" deyin, asla "sensei" demeyin.',
    },
    de: {
      tip: 'Wörtlich "zuerst geboren". Höflicher Titel für Lehrer, Ärzte, Juristen. Niemals für sich selbst gebrauchen.',
      mnemonic: '先 (zuvor) + 生 (geboren) = derjenige, der vor einem da war und Wissen weitergibt.',
      collocation: 'Japanischlehrer (日本語の先生)',
      pitfallWarning: 'Nennen Sie Ihren Beruf als Lehrer immer "教師 (kyoushi)", nicht "sensei".',
    },
    pt: {
      tip: 'Literalmente "nascido antes". Título para professores, médicos e advogados. Nunca use para si mesmo.',
      mnemonic: '先 (antes) + 生 (nascer) = aquele que nasceu antes e nos guia.',
      collocation: 'Professor de japonês (日本語の先生)',
      pitfallWarning: 'Ao se apresentar como professor, use "教師 (kyoushi)", nunca "sensei".',
    },
    nl: {
      tip: 'Letterlijk "eerder geboren". Eretitel voor leraren, artsen en advocaten. Nooit voor uzelf gebruiken.',
      mnemonic: '先 (eerder) + 生 (geboren) = de meester die voor u geboren is.',
      collocation: 'Leraar Japans (日本語の先生)',
      pitfallWarning: 'Stel uzelf als leraar voor als "教師 (kyoushi)", nooit als "sensei".',
    },
    hi: {
      tip: 'शाब्दिक अर्थ "पहले जन्मा"। शिक्षकों, डॉक्टरों और वकीलों हेतु प्रयुक्त। स्वयं के लिए कभी प्रयोग न करें।',
      mnemonic: '先 (पहले) + 生 (जन्म) = जो हमसे पहले जन्मा और हमें ज्ञान देता है।',
      collocation: 'जापानी के शिक्षक (日本語の先生)',
      pitfallWarning: 'यदि आप शिक्षक हैं तो परिचय में "教師 (kyoushi)" कहें, "sensei" नहीं।',
    },
    bn: {
      tip: 'আক্ষরিক অর্থে "পূর্বে জন্ম নেওয়া"। শিক্ষক, চিকিৎসক ও আইনজীবীদের সম্মানসূচক পদবী। নিজের বেলায় বলা যাবে না।',
      mnemonic: '先 (পূর্বে) + 生 (জন্ম) = যিনি আগে জন্মে জ্ঞান দান করেন।',
      collocation: 'জাপানি ভাষার শিক্ষক (日本語の先生)',
      pitfallWarning: 'নিজের পেশা শিক্ষক হলে বলুন "教師 (kyoushi)", কখনো "sensei" বলবেন না।',
    },
    ms: {
      tip: 'Secara harfiah "lahir terdahulu". Gelaran hormat untuk guru, doktor dan peguam. Jangan rujuk diri sendiri.',
      mnemonic: '先 (terdahulu) + 生 (lahir) = insan yang membimbing kita.',
      collocation: 'Guru bahasa Jepun (日本語の先生)',
      pitfallWarning: 'Bila memperkenalkan profesion anda, gunakan "教師 (kyoushi)", bukan "sensei".',
    },
    ar: {
      tip: 'حرفياً "من وُلد قبلاً". لقب احترام للمعلمين والأطباء والمحامين. إياك واستخدامه لوصف نفسك.',
      mnemonic: '先 (سابقاً) + 生 (مولود) = من سبقنا بالولادة والعلم ليرشدنا.',
      collocation: 'معلم اللغة اليابانية (日本語の先生)',
      pitfallWarning: 'إذا كنت معلماً وتريد تقديم نفسك، استخدم "教師 (kyoushi)" ولا تقل sensei.',
    },
    tl: {
      tip: 'Nangangahulugang "unang ipinanganak". Gamitin sa guro, doktor, at abogado. Huwag gamitin sa sarili.',
      mnemonic: '先 (bago) + 生 (ipinanganak) = ang nauna sa atin at nagtuturo ng kaalaman.',
      collocation: 'Guro sa wikang Hapones (日本語の先生)',
      pitfallWarning: 'Kung ikaw ay guro, magpakilala gamit ang "教師 (kyoushi)", huwag "sensei".',
    },
  },
};

// ----------------------------------------------------------------------------
// General Multilingual Tip Generator for Any Vocabulary Word
// ----------------------------------------------------------------------------
export function getVocabularyStudyTip(word: string, meaning: string, pos: string, lang: SupportedLanguage): VocabStudyTip {
  if (VOCABULARY_TIPS_DATABASE[word] && VOCABULARY_TIPS_DATABASE[word][lang]) {
    return VOCABULARY_TIPS_DATABASE[word][lang];
  }

  const enTip = `Pay attention to the natural collocations of "${word}". Review with pitch accent and practice in full sentences.`;
  const enMnemonic = `Associate "${word}" with its primary meaning "${meaning}".`;
  const enCollocation = `〜を${word}する / ${word}の...`;
  const enPitfall = `Be careful with transitive vs. intransitive verb pairs and register appropriateness.`;

  switch (lang) {
    case 'ja':
      return {
        tip: `「${word}」の品詞（${pos}）と共起表現（コロケーション）を意識して文脈で覚えましょう。`,
        mnemonic: `漢字の構成要素と本来の意味「${meaning}」をイメージと結びつけます。`,
        collocation: `〜を${word}する / ${word}の...`,
        pitfallWarning: `自動詞・他動詞の使い分けや敬語レベルとの兼ね合いに注意してください。`,
      };
    case 'my':
      return {
        tip: `「${word}」ဝေါဟာရ၏ အသုံးအနှုန်းနှင့် တွဲဖက်စကားလုံးများကို ဝါကျအပြည့်အစုံဖြင့် မှတ်သားပါ။`,
        mnemonic: `အဓိပ္ပာယ် "${meaning}" နှင့် ရုပ်ပုံဖော်၍ မှတ်ဉာဏ်တွင် စွဲမြဲစေပါ။`,
        collocation: `〜ကို ${word}သည်`,
        pitfallWarning: `အကူကြိယာနှင့် ကံပုဒ်/ကတ္တားပုဒ် အထားအသိုကို သတိပြုပါ။`,
      };
    case 'th':
      return {
        tip: `จดจำคำว่า「${word}」ผ่านประโยคตัวอย่างและคำที่ใช้คู่กันบ่อย เพื่อความเป็นธรรมชาติ`,
        mnemonic: `เชื่อมโยงความหมาย "${meaning}" เข้ากับภาพจำหรือสถานการณ์จริง`,
        collocation: `〜を${word}する`,
        pitfallWarning: `ระวังความแตกต่างระหว่างอกรรมกริยาและสกรรมกริยา`,
      };
    case 'zh':
      return {
        tip: `学习「${word}」时，建议结合固定搭配与例句一同记忆，掌握其地道用法。`,
        mnemonic: `将字形与核心含义“${meaning}”在脑海中建立生动的情境联想。`,
        collocation: `〜を${word}する / ${word}の...`,
        pitfallWarning: `注意自动词与他动词的配对区分，以及词汇的书面语与口语色彩。`,
      };
    case 'ko':
      return {
        tip: `「${word}」은(는) 단독 암기보다 자주 쓰이는 연어(Collocation) 및 예문과 함께 익히는 것이 효과적입니다.`,
        mnemonic: `핵심 의미인 "${meaning}"과 관련 상황을 연상하여 기억하세요.`,
        collocation: `〜을/를 ${word}하다`,
        pitfallWarning: `자·타동사 구분과 격식체/구어체 뉘앙스 차이에 유의하세요.`,
      };
    case 'es':
      return {
        tip: `Aprenda "${word}" memorizando sus colocaciones naturales y practicando en oraciones completas.`,
        mnemonic: `Vincule la palabra con su significado principal "${meaning}" mediante una imagen mental.`,
        collocation: `〜を${word}する / de ${word}`,
        pitfallWarning: `Preste atención a la distinción entre verbos transitivos e intransitivos.`,
      };
    case 'fr':
      return {
        tip: `Apprenez "${word}" en contexte avec ses collocations habituelles pour un usage fluide.`,
        mnemonic: `Associez le mot à son sens clé "${meaning}" avec une image mentale vivante.`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Attention à la distinction transitif / intransitif et au niveau de politesse.`,
      };
    case 'vi':
      return {
        tip: `Ghi nhớ từ「${word}」kèm theo các cụm từ đi liền (collocation) để nói và viết tự nhiên.`,
        mnemonic: `Liên tưởng chữ viết với ý nghĩa "${meaning}" qua tình huống thực tế.`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Cần phân biệt rõ tha động từ và tự động từ khi dùng từ này.`,
      };
    case 'id':
      return {
        tip: `Pelajari kata "${word}" bersama kolokasi alaminya dalam kalimat lengkap.`,
        mnemonic: `Hubungkan kata ini dengan makna intinya "${meaning}" secara visual.`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Perhatikan perbedaan antara verba transitif dan intransitif.`,
      };
    case 'tr':
      return {
        tip: `"${word}" kelimesini doğal bağlamındaki kalıplaşmış ifadelerle birlikte öğrenin.`,
        mnemonic: `Kelimeyi temel anlamı "${meaning}" ile zihninizde eşleştirin.`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Geçişli ve geçişsiz fiil ayrımlarına dikkat ediniz.`,
      };
    case 'de':
      return {
        tip: `Lernen Sie "${word}" stets zusammen mit typischen Kollokationen und ganzen Beispielsätzen.`,
        mnemonic: `Verknüpfen Sie das Wort bildlich mit der Grundbedeutung "${meaning}".`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Achten Sie auf transitive vs. intransitive Paare und die Stilebene.`,
      };
    case 'pt':
      return {
        tip: `Memorize "${word}" junto com suas combinações comuns em frases completas.`,
        mnemonic: `Associe a palavra ao seu significado central "${meaning}".`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Atenção à diferença entre verbos transitivos e intransitivos.`,
      };
    case 'nl':
      return {
        tip: `Leer "${word}" in combinatie met vaste uitdrukkingen in volledige voorbeeldzinnen.`,
        mnemonic: `Koppel het woord aan de betekenis "${meaning}" met een visuele herinnering.`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Let op het onderscheid tussen overgankelijke en onovergankelijke werkwoorden.`,
      };
    case 'hi':
      return {
        tip: `"${word}" को हमेशा पूरे वाक्य और स्वाभाविक संयोजन के साथ सीखें।`,
        mnemonic: `इस शब्द को इसके मुख्य अर्थ "${meaning}" के साथ जोड़कर याद रखें।`,
        collocation: `〜を${word}する`,
        pitfallWarning: `सकर्मक और अकर्मक क्रियाओं के अंतर का विशेष ध्यान रखें।`,
      };
    case 'bn':
      return {
        tip: `"${word}" শব্দটি সর্বদা সম্পূর্ণ বাক্য ও স্বাভাবিক বাক্যাংশের সাথে মুখস্থ করুন।`,
        mnemonic: `শব্দটিকে এর মূল অর্থ "${meaning}" এর সাথে মনে রাখার চেষ্টা করুন।`,
        collocation: `〜を${word}する`,
        pitfallWarning: `সকর্মক ও অকর্মক ক্রিয়ার পার্থক্যে সতর্ক থাকুন।`,
      };
    case 'ms':
      return {
        tip: `Pelajari perkataan "${word}" bersama ungkapan lazimnya dalam ayat yang lengkap.`,
        mnemonic: `Kaitkan perkataan ini dengan maksud utamanya "${meaning}".`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Berhati-hati dengan perbezaan kata kerja transitif dan tak transitif.`,
      };
    case 'ar':
      return {
        tip: `احرص على تعلم "${word}" ضمن تراكيب الجمل الشائعة لضمان التحدث بطبيعية.`,
        mnemonic: `اربط الكلمة في مخيلتك بمعناها الأساسي "${meaning}".`,
        collocation: `〜を${word}する`,
        pitfallWarning: `انتبه للفرق بين الأفعال اللازمة والمتعدية ومستوى الأدب المناسب.`,
      };
    case 'tl':
      return {
        tip: `Isaulo ang salitang "${word}" kasama ang mga karaniwang pares nito sa buong pangungusap.`,
        mnemonic: `Iugnay ang salita sa pangunahing kahulugan nitong "${meaning}".`,
        collocation: `〜を${word}する`,
        pitfallWarning: `Mag-ingat sa pagkakaiba ng transitive at intransitive na pandiwa.`,
      };
    default:
      return {
        tip: enTip,
        mnemonic: enMnemonic,
        collocation: enCollocation,
        pitfallWarning: enPitfall,
      };
  }
}

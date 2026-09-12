// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) MULTILINGUAL TRANSLATION ENGINE
// Comprehensive Translations Across All 19 Supported Languages:
// en, ja, my, th, zh, ko, es, fr, vi, id, tr, de, pt, nl, hi, bn, ms, ar, tl
// ============================================================================

import { SupportedLanguage } from '../../types/i18n';

// ----------------------------------------------------------------------------
// 1. Business Course Levels & Core Headings
// ----------------------------------------------------------------------------
export const BUSINESS_COURSE_LEVEL_I18N: Record<string, Record<SupportedLanguage, { title: string; desc: string }>> = {
  foundation: {
    en: { title: 'Business Japanese Foundation', desc: 'Company hierarchy, professional greetings, phone basics, and simple emails (N4–N3).' },
    ja: { title: 'ビジネス日本語・基礎コース', desc: '会社組織、挨拶、電話応対の基本、社内連絡メールの基礎を学ぶ（N4〜N3相当）。' },
    my: { title: 'အခြေခံ စီးပွားရေးလုပ်ငန်းသုံး ဂျပန်စာ', desc: 'ကုမ္ပဏီဖွဲ့စည်းပုံ၊ နှုတ်ခွန်းဆက်စကားများ၊ ဖုန်းပြောဆိုခြင်းနှင့် အီးမေးလ်အခြေခံများ (N4–N3)။' },
    th: { title: 'ภาษาญี่ปุ่นธุรกิจระดับพื้นฐาน', desc: 'โครงสร้างบริษัท การทักทายอย่างมืออาชีพ พื้นฐานโทรศัพท์และอีเมล (N4–N3)' },
    zh: { title: '商务日语·基础课程', desc: '学习公司组织架构、职业问候、电话对应基础与内部邮件撰写（相当于N4-N3）。' },
    ko: { title: '비즈니스 일본어 기초 코스', desc: '회사 조직도, 비즈니스 인사, 전화 응대 기초 및 사내 메일 기본 (N4~N3 상당).' },
    es: { title: 'Japonés de Negocios Básico', desc: 'Jerarquía empresarial, saludos profesionales, teléfono y correos básicos (N4–N3).' },
    fr: { title: 'Japonais des Affaires - Niveau Débutant', desc: 'Hiérarchie d\'entreprise, salutations professionnelles, téléphone et e-mails simples (N4–N3).' },
    vi: { title: 'Tiếng Nhật Thương Mại Cơ Bản', desc: 'Cơ cấu công ty, chào hỏi chuẩn mực, cơ bản nghe điện thoại và email nội bộ (N4–N3).' },
    id: { title: 'Bahasa Jepang Bisnis Dasar', desc: 'Hierarki perusahaan, salam profesional, dasar telepon, dan email sederhana (N4–N3).' },
    tr: { title: 'Temel İş Japoncası', desc: 'Şirket hiyerarşisi, profesyonel selamlaşma, telefon temelleri ve basit e-postalar (N4–N3).' },
    de: { title: 'Geschäftsjapanisch Grundlagen', desc: 'Unternehmenshierarchie, professionelle Begrüßungen, Telefonie und E-Mails (N4–N3).' },
    pt: { title: 'Japonês para Negócios Básico', desc: 'Hierarquia empresarial, saudações profissionais, telefone e e-mails básicos (N4–N3).' },
    nl: { title: 'Zakelijk Japans Basis', desc: 'Bedrijfshiërarchie, professionele begroetingen, telefoneren en e-mails (N4–N3).' },
    hi: { title: 'बुनियादी व्यावसायिक जापानी', desc: 'कंपनी संरचना, पेशेवर अभिवादन, फ़ोन शिष्टाचार और आंतरिक ईमेल (N4–N3)।' },
    bn: { title: 'মৌলিক ব্যবসায়িক জাপানি', desc: 'কোম্পানি কাঠামো, পেশাদার অভিবাদন, টেলিফোন এবং ইমেলের প্রাথমিক বিষয় (N4–N3)।' },
    ms: { title: 'Bahasa Jepun Perniagaan Asas', desc: 'Hierarki syarikat, ucapan salam profesional, panggilan telefon dan e-mel (N4–N3).' },
    ar: { title: 'اليابانية للأعمال - المستوى الأساسي', desc: 'الهيكل الإداري للشركات، التحيات المهنية، آداب الهاتف ورسائل البريد (N4–N3).' },
    tl: { title: 'Pundasyon sa Negosyong Hapones', desc: 'Istruktura ng kumpanya, propesyonal na pagbati, telepono at simpleng email (N4–N3).' },
  },
  intermediate: {
    en: { title: 'Business Japanese Intermediate', desc: 'Hou-Ren-Sou, reception etiquette, scheduling appointments, and business dining (N3–N2).' },
    ja: { title: 'ビジネス日本語・中級コース', desc: '報連相の実践、来客対応、日程調整、会食マナーを習得（N3〜N2相当）。' },
    my: { title: 'အလယ်အလတ် စီးပွားရေးလုပ်ငန်းသုံး ဂျပန်စာ', desc: 'ဟိုးရန်းဆို (သတင်းပို့/ဆက်သွယ်/တိုင်ပင်)၊ ဧည့်သည်ကြိုဆိုမှု၊ ရက်ချိန်းညှိနှိုင်းခြင်း (N3–N2)။' },
    th: { title: 'ภาษาญี่ปุ่นธุรกิจระดับกลาง', desc: 'การรายงาน-ประสานงาน-ปรึกษา (โฮเรนโซ) การต้อนรับลูกค้า และการนัดหมาย (N3–N2)' },
    zh: { title: '商务日语·中级课程', desc: '掌握报联相、来客接待礼仪、商务日程调整与商务宴请礼仪（相当于N3-N2）。' },
    ko: { title: '비즈니스 일본어 중급 코스', desc: '호렌소(보고·연락·상담) 실천, 내방객 응대, 일정 조율 및 회식 매너 (N3~N2 상당).' },
    es: { title: 'Japonés de Negocios Intermedio', desc: 'Práctica de Hou-Ren-Sou, atención a clientes, ajuste de agendas y etiqueta en cenas (N3–N2).' },
    fr: { title: 'Japonais des Affaires Intermédiaire', desc: 'Pratique du Hou-Ren-Sou, accueil des clients, planification et repas d\'affaires (N3–N2).' },
    vi: { title: 'Tiếng Nhật Thương Mại Trung Cấp', desc: 'Thực hành Hou-Ren-Sou, tiếp khách, sắp xếp lịch hẹn và quy tắc ăn uống xã giao (N3–N2).' },
    id: { title: 'Bahasa Jepang Bisnis Menengah', desc: 'Praktik Hou-Ren-Sou, penyambutan tamu, penjadwalan janji, dan etiket makan bisnis (N3–N2).' },
    tr: { title: 'Orta Düzey İş Japoncası', desc: 'Hou-Ren-Sou iletişimi, misafir karşılama, randevu planlama ve iş yemekleri (N3–N2).' },
    de: { title: 'Geschäftsjapanisch Mittelstufe', desc: 'Hou-Ren-Sou-Kommunikation, Kundenempfang, Terminplanung und Geschäftsessen (N3–N2).' },
    pt: { title: 'Japonês para Negócios Intermediário', desc: 'Prática de Hou-Ren-Sou, recepção de clientes, agendamento de reuniões e jantares (N3–N2).' },
    nl: { title: 'Zakelijk Japans Middenniveau', desc: 'Hou-Ren-Sou-praktijk, gastenontvangst, planning en zakelijke diners (N3–N2).' },
    hi: { title: 'मध्यम व्यावसायिक जापानी', desc: 'हो-रेन-सो (रिपोर्ट-संपर्क-परामर्श), ग्राहक स्वागत, बैठक निर्धारण (N3–N2)।' },
    bn: { title: 'মধ্যবর্তী ব্যবসায়িক জাপানি', desc: 'হো-রেন-সো পদ্ধতি, গ্রাহক অভ্যর্থনা, মিটিং শিডিউলিং ও ভোজন শিষ্টাচার (N3–N2)।' },
    ms: { title: 'Bahasa Jepun Perniagaan Pertengahan', desc: 'Amalan Hou-Ren-Sou, menyambut tetamu, penjadualan temu janji dan etika makan (N3–N2).' },
    ar: { title: 'اليابانية للأعمال - المستوى المتوسط', desc: 'تطبيق مبدأ هو-رين-سو، استقبال العملاء، تنظيم المواعيد وآداب مآدب العمل (N3–N2).' },
    tl: { title: 'Panggitnang Negosyong Hapones', desc: 'Pagsasanay sa Hou-Ren-Sou, pagtanggap ng bisita, pag-iskedyul, at etika sa kainan (N3–N2).' },
  },
  upper_intermediate: {
    en: { title: 'Upper-Intermediate Business Japanese', desc: 'Commercial negotiations, complaint handling, project reviews, and Nemawashi (N2).' },
    ja: { title: 'ビジネス日本語・上級コース', desc: '商談・交渉、クレーム対応、プロジェクト進捗レビュー、根回しの技術（N2相当）。' },
    my: { title: 'အဆင့်မြင့် စီးပွားရေးလုပ်ငန်းသုံး ဂျပန်စာ', desc: 'ဈေးနှုန်းဆွေးနွေးညှိနှိုင်းမှု၊ ကွန်ပPlainText ဖြေရှင်းမှု၊ နေမဝါရှီ နည်းဗျူဟာများ (N2)။' },
    th: { title: 'ภาษาญี่ปุ่นธุรกิจระดับสูง', desc: 'การเจรจาต่อรองทางการค้า การรับมือข้อร้องเรียน และการสร้างฉันทามติ (เนะมะวะชิ) (N2)' },
    zh: { title: '商务日语·高级课程', desc: '商务谈判与磋商、客户投诉应对、项目进度评审及事前沟通（根回）（相当于N2）。' },
    ko: { title: '비즈니스 일본어 고급 코스', desc: '상담 및 교섭, 클레임 대응, 프로젝트 진척 리뷰, 네마와시(사전 정지) 기술 (N2 상당).' },
    es: { title: 'Japonés de Negocios Avanzado', desc: 'Negociaciones comerciales, manejo de quejas, seguimiento de proyectos y Nemawashi (N2).' },
    fr: { title: 'Japonais des Affaires Avancé', desc: 'Négociations commerciales, gestion des réclamations, revues de projet et Nemawashi (N2).' },
    vi: { title: 'Tiếng Nhật Thương Mại Cao Cấp', desc: 'Đàm phán thương mại, xử lý khiếu nại khách hàng, đánh giá dự án và Nemawashi (N2).' },
    id: { title: 'Bahasa Jepang Bisnis Tingkat Lanjut', desc: 'Negosiasi komersial, penanganan keluhan, peninjauan proyek, dan Nemawashi (N2).' },
    tr: { title: 'İleri Düzey İş Japoncası', desc: 'Ticari müzakereler, şikayet yönetimi, proje değerlendirmeleri ve Nemawashi (N2).' },
    de: { title: 'Geschäftsjapanisch Oberstufe', desc: 'Verhandlungen, Reklamationsmanagement, Projektprüfungen und Nemawashi (N2).' },
    pt: { title: 'Japonês para Negócios Avançado', desc: 'Negociações comerciais, tratamento de reclamações, revisão de projetos e Nemawashi (N2).' },
    nl: { title: 'Zakelijk Japans Gevorderd', desc: 'Onderhandelingen, klachtenafhandeling, projectevaluaties en Nemawashi (N2).' },
    hi: { title: 'उच्च-मध्यम व्यावसायिक जापानी', desc: 'व्यावसायिक वार्ता, शिकायत निवारण, परियोजना समीक्षा और नेमावाशी (N2)।' },
    bn: { title: 'উচ্চ-মধ্যবর্তী ব্যবসায়িক জাপানি', desc: 'বাণিজ্যিক দরকষাকষি, অভিযোগ সমাধান, প্রকল্প পর্যালোচনা এবং নেমাওয়াশি (N2)।' },
    ms: { title: 'Bahasa Jepun Perniagaan Lanjutan', desc: 'Rundingan komersial, pengendalian aduan pelanggan dan Nemawashi (N2).' },
    ar: { title: 'اليابانية للأعمال - المستوى المتقدم', desc: 'المفاوضات التجارية، التعامل مع شكاوى العملاء، إدارة المشاريع والنيماواشي (N2).' },
    tl: { title: 'Mataas na Panggitnang Negosyong Hapones', desc: 'Negosasyon sa negosyo, paghawak ng reklamo, at pamamaraang Nemawashi (N2).' },
  },
  professional: {
    en: { title: 'Professional Business Japanese', desc: 'Executive presentations, crisis communication, press statements, and cross-border diplomacy (N2–N1).' },
    ja: { title: '超上級・エグゼクティブビジネス日本語', desc: '役員向けプレゼンテーション、危機管理広報、記者会見、国際提携交渉（N2〜N1相当）。' },
    my: { title: 'ကျွမ်းကျင်အဆင့် စီးပွားရေးလုပ်ငန်းသုံး ဂျပန်စာ', desc: 'အမှုဆောင်အဆင့် ရှင်းလင်းတင်ပြမှု၊ အကျပ်အတည်းဆက်သွယ်ရေး၊ သတင်းထုတ်ပြန်ချက်များ (N2–N1)။' },
    th: { title: 'ภาษาญี่ปุ่นธุรกิจระดับมืออาชีพ', desc: 'การนำเสนอระดับผู้บริหาร การสื่อสารในภาวะวิกฤต และการแถลงข่าว (N2–N1)' },
    zh: { title: '商务日语·专业精英课程', desc: '面向高管的企划汇报、危机公关、新闻发言与跨国企业合作谈判（相当于N2-N1）。' },
    ko: { title: '전문가/임원급 비즈니스 일본어', desc: '임원 보고 프레젠테이션, 위기 관리 홍보, 기자회견 및 국제 제휴 협상 (N2~N1 상당).' },
    es: { title: 'Japonés de Negocios Profesional', desc: 'Presentaciones ejecutivas, comunicación de crisis, comunicados de prensa y alianzas (N2–N1).' },
    fr: { title: 'Japonais des Affaires Professionnel', desc: 'Présentations exécutives, communication de crise, relations presse et partenariats (N2–N1).' },
    vi: { title: 'Tiếng Nhật Thương Mại Chuyên Nghiệp', desc: 'Thuyết trình ban giám đốc, xử lý khủng hoảng truyền thông, thông cáo báo chí (N2–N1).' },
    id: { title: 'Bahasa Jepang Bisnis Profesional', desc: 'Presentasi eksekutif, komunikasi krisis, pernyataan pers, dan kemitraan global (N2–N1).' },
    tr: { title: 'Profesyonel İş Japoncası', desc: 'Yönetici sunumları, kriz iletişimi, basın açıklamaları ve küresel ortaklıklar (N2–N1).' },
    de: { title: 'Professionelles Geschäftsjapanisch', desc: 'Vorstandspräsentationen, Krisenkommunikation, Presseerklärungen und Partnerschaften (N2–N1).' },
    pt: { title: 'Japonês para Negócios Profissional', desc: 'Apresentações executivas, comunicação de crise, comunicados à imprensa e parcerias (N2–N1).' },
    nl: { title: 'Professioneel Zakelijk Japans', desc: 'Directiepresentaties, crisiscommunicatie, persberichten en internationale partnerschappen (N2–N1).' },
    hi: { title: 'पेशेवर व्यावसायिक जापानी', desc: 'कार्यकारी प्रस्तुतियाँ, संकटकालीन संचार, प्रेस विज्ञप्ति और वैश्विक सहयोग (N2–N1)।' },
    bn: { title: 'পেশাদার ব্যবসায়িক জাপানি', desc: 'নির্বাহী উপস্থাপনা, সংকটকালীন যোগাযোগ, প্রেস বিজ্ঞপ্তি এবং বৈশ্বিক চুক্তি (N2–N1)।' },
    ms: { title: 'Bahasa Jepun Perniagaan Profesional', desc: 'Pembentangan eksekutif, komunikasi krisis, siaran akhbar dan diplomasi perniagaan (N2–N1).' },
    ar: { title: 'اليابانية للأعمال - المستوى الاحترافي والتنفيذي', desc: 'العروض التقديمية للإدارة العليا، إدارة الأزمات، البيانات الصحفية والتحالفات الدولية (N2–N1).' },
    tl: { title: 'Propesyonal na Negosyong Hapones', desc: 'Pang-ehekutibong presentasyon, komunikasyon sa krisis, at press statement (N2–N1).' },
  },
  career_track: {
    en: { title: 'Job Hunting & Career Preparation Track', desc: 'Japanese resume (履歴書), Entry Sheet (ES) strategies, STAR interview questions, and room etiquette (N3–N1).' },
    ja: { title: '就活・キャリア特化コース', desc: '履歴書・職務経歴書、エントリーシート（ガクチカ・志望動機）、入退室マナー、面接回答術（N3〜N1相当）。' },
    my: { title: 'အလုပ်အကိုင်ရှာဖွေရေးနှင့် အင်တာဗျူးပြင်ဆင်မှု', desc: 'ဂျပန်ကိုယ်ရေးရာဇဝင် (ရီရဲခိရှို)၊ အင်ထရီရှီး (ES) ရေးသားနည်း၊ အင်တာဗျူးဖြေဆိုနည်း (N3–N1)။' },
    th: { title: 'หลักสูตรเตรียมพร้อมการหางานและสัมภาษณ์งาน', desc: 'การเขียนเรซูเม่ญี่ปุ่น (ริเรกิโช) กลยุทธ์ Entry Sheet และมารยาทการสัมภาษณ์งาน (N3–N1)' },
    zh: { title: '就活·求职与职业发展特化课程', desc: '日文简历书、职务经历书、Entry Sheet（学修经历·动机）、入退室礼仪与面试通关技巧（相当于N3-N1）。' },
    ko: { title: '취업 활동(슈카츠) 및 커리어 대비 코스', desc: '이력서·직무경력서, 엔트리 시트(ES) 작성법, 입퇴실 매너, 빈출 면접 질문 대비 (N3~N1 상당).' },
    es: { title: 'Pista de Búsqueda de Empleo y Carrera', desc: 'Currículum japonés (Rirekisho), Entry Sheet (ES), etiqueta en sala y preguntas de entrevista (N3–N1).' },
    fr: { title: 'Parcours Préparation à l\'Emploi et Carrière', desc: 'CV japonais (Rirekisho), Entry Sheet (ES), étiquette d\'entretien et technique STAR (N3–N1).' },
    vi: { title: 'Khóa Chuẩn Bị Xin Việc & Phỏng Vấn (Shukatsu)', desc: 'Viết sơ yếu lý lịch (Rirekisho), Entry Sheet (ES), quy tắc vào/ra phòng phỏng vấn (N3–N1).' },
    id: { title: 'Jalur Persiapan Karir & Mencari Kerja', desc: 'Resume Jepang (Rirekisho), strategi Entry Sheet (ES), tata krama wawancara kerja (N3–N1).' },
    tr: { title: 'İş Arama ve Kariyer Hazırlık Parkuru', desc: 'Japonca özgeçmiş (Rirekisho), Entry Sheet stratejileri, mülakat teknikleri ve oda görgüsü (N3–N1).' },
    de: { title: 'Bewerbung und Karrierevorbereitung', desc: 'Japanischer Lebenslauf (Rirekisho), Entry Sheet (ES), Vorstellungsgespräche und Benimmregeln (N3–N1).' },
    pt: { title: 'Trilha de Carreira e Busca de Emprego', desc: 'Currículo japonês (Rirekisho), Entry Sheet (ES), etiqueta de sala e entrevistas de emprego (N3–N1).' },
    nl: { title: 'Sollicitatie- en Carrièrepad', desc: 'Japans cv (Rirekisho), Entry Sheet (ES), sollicitatiegesprekken en etiquette (N3–N1).' },
    hi: { title: 'नौकरी खोज और करियर तैयारी ट्रैक', desc: 'जापानी बायोडाटा (रिरेकिशो), एंट्री शीट, साक्षात्कार तकनीक और शिष्टाचार (N3–N1)।' },
    bn: { title: 'চাকরি সন্ধান ও ক্যারিয়ার প্রস্তুতি', desc: 'জাপানি জীবনবৃত্তান্ত (রিরেকিশো), এন্ট্রি শিট কৌশল, ইন্টারভিউ প্রশ্ন ও রুমের শিষ্টাচার (N3–N1)।' },
    ms: { title: 'Laluan Kerjaya & Pencarian Kerja', desc: 'Resume Jepun (Rirekisho), strategi Entry Sheet (ES), adab bilik temu duga (N3–N1).' },
    ar: { title: 'مسار التوظيف والاستعداد الوظيفي', desc: 'السيرة الذاتية اليابانية (ريريكيشو)، استراتيجيات استمارة التقديم، آداب المقابلات (N3–N1).' },
    tl: { title: 'Paghahanda sa Trabaho at Karera', desc: 'Resume na Hapones (Rirekisho), Entry Sheet (ES), at etiketa sa panayam sa trabaho (N3–N1).' },
  },
};

// ----------------------------------------------------------------------------
// 2. Navigation & Studio Tab Translations
// ----------------------------------------------------------------------------
export const BUSINESS_STUDIO_TABS_I18N: Record<string, Record<SupportedLanguage, string>> = {
  curriculum: {
    en: 'Curriculum',
    ja: 'カリキュラム',
    my: 'သင်ရိုးညွှန်းတမ်း',
    th: 'หลักสูตร',
    zh: '课程大纲',
    ko: '커리큘럼',
    es: 'Currículo',
    fr: 'Programme',
    vi: 'Chương trình',
    id: 'Kurikulum',
    tr: 'Müfredat',
    de: 'Lehrplan',
    pt: 'Currículo',
    nl: 'Curriculum',
    hi: 'पाठ्यक्रम',
    bn: 'পাঠ্যক্রম',
    ms: 'Kurikulum',
    ar: 'المنهاج',
    tl: 'Kurikulum',
  },
  keigo: {
    en: 'Keigo Studio',
    ja: '敬語スタジオ',
    my: 'ယဉ်ကျေးမှုသုံးစကား စတူဒီယို',
    th: 'สตูดิโอเคโกะ (คำสุภาพ)',
    zh: '敬语工作室',
    ko: '경어 스튜디오',
    es: 'Estudio de Keigo',
    fr: 'Studio de Keigo',
    vi: 'Xưởng Kính ngữ Keigo',
    id: 'Studio Keigo',
    tr: 'Keigo Stüdyosu',
    de: 'Keigo-Studio',
    pt: 'Estúdio de Keigo',
    nl: 'Keigo Studio',
    hi: 'केइगो (विनम्र भाषा) स्टूडियो',
    bn: 'কেইগো (নম্র ভাষা) স্টুডিও',
    ms: 'Studio Keigo',
    ar: 'استوديو لغة الاحترام (كيغو)',
    tl: 'Keigo Studio',
  },
  email: {
    en: 'Business Email',
    ja: 'ビジネスメール',
    my: 'စီးပွားရေး အီးမေးလ်',
    th: 'อีเมลธุรกิจ',
    zh: '商务邮件',
    ko: '비즈니스 메일',
    es: 'Correo de Negocios',
    fr: 'E-mails Professionnels',
    vi: 'Email Thương mại',
    id: 'Email Bisnis',
    tr: 'İş E-postası',
    de: 'Geschäfts-E-Mail',
    pt: 'E-mail Comercial',
    nl: 'Zakelijke E-mail',
    hi: 'व्यावसायिक ईमेल',
    bn: 'ব্যবসায়িক ইমেল',
    ms: 'E-mel Perniagaan',
    ar: 'البريد الإلكتروني للأعمال',
    tl: 'Email sa Negosyo',
  },
  scenarios: {
    en: 'Workplace Scenarios',
    ja: '職場シミュレーター',
    my: 'လုပ်ငန်းခွင် အခြေအနေသရုပ်ပြ',
    th: 'สถานการณ์จำลองที่ทำงาน',
    zh: '职场情境演练',
    ko: '직장 시나리오',
    es: 'Escenarios Laborales',
    fr: 'Scénarios Professionnels',
    vi: 'Tình huống Công sở',
    id: 'Skenario Tempat Kerja',
    tr: 'İş Yeri Senaryoları',
    de: 'Arbeitsplatzszenarien',
    pt: 'Cenários de Trabalho',
    nl: 'Werkplekscenario\'s',
    hi: 'कार्यस्थल परिदृश्य',
    bn: 'কর্মক্ষেত্র পরিস্থিতি',
    ms: 'Senario Tempat Kerja',
    ar: 'سيناريوهات مكان العمل',
    tl: 'Mga Sitwasyon sa Trabaho',
  },
  culture: {
    en: 'Culture & Etiquette',
    ja: 'ビジネスマナー',
    my: 'ယဉ်ကျေးမှုနှင့် ကျင့်ဝတ်',
    th: 'วัฒนธรรมและมารยาท',
    zh: '商务礼仪与文化',
    ko: '비즈니스 매너/문화',
    es: 'Cultura y Etiqueta',
    fr: 'Culture et Étiquette',
    vi: 'Văn hóa & Nghi thức',
    id: 'Budaya & Etiket',
    tr: 'Kültür ve Görgü Kuralları',
    de: 'Kultur & Etikette',
    pt: 'Cultura e Etiqueta',
    nl: 'Cultuur & Etiquette',
    hi: 'संस्कृति और शिष्टाचार',
    bn: 'সংস্কৃতি ও শিষ্টাচার',
    ms: 'Budaya & Etika',
    ar: 'الثقافة وآداب العمل',
    tl: 'Kultura at Etiketa',
  },
  interview: {
    en: 'Job Interview & ES',
    ja: '面接・エントリーシート',
    my: 'အင်တာဗျူးနှင့် ES',
    th: 'สัมภาษณ์งานและ ES',
    zh: '面试与报名表（ES）',
    ko: '면접 및 엔트리시트',
    es: 'Entrevista y ES',
    fr: 'Entretien & ES',
    vi: 'Phỏng vấn & ES',
    id: 'Wawancara Kerja & ES',
    tr: 'İş Mülakatı ve ES',
    de: 'Vorstellungsgespräch & ES',
    pt: 'Entrevista de Emprego & ES',
    nl: 'Sollicitatiegesprek & ES',
    hi: 'साक्षात्कार और ईएस',
    bn: 'চাকরির ইন্টারভিউ ও ইএস',
    ms: 'Temu Duga & ES',
    ar: 'مقابلات العمل واستمارة التقديم',
    tl: 'Panayam sa Trabaho at ES',
  },
  vocabulary: {
    en: 'Business Vocabulary',
    ja: 'ビジネス用語集',
    my: 'စီးပွားရေး ဝေါဟာရများ',
    th: 'คำศัพท์ธุรกิจ',
    zh: '商务词汇库',
    ko: '비즈니스 어휘',
    es: 'Vocabulario de Negocios',
    fr: 'Vocabulaire des Affaires',
    vi: 'Từ vựng Thương mại',
    id: 'Kosakata Bisnis',
    tr: 'İş Kelime Dağarcığı',
    de: 'Geschäftswortschatz',
    pt: 'Vocabulário Comercial',
    nl: 'Zakelijke Woordenschat',
    hi: 'व्यावसायिक शब्दावली',
    bn: 'ব্যবসায়িক শব্দভাণ্ডার',
    ms: 'Kosa Kata Perniagaan',
    ar: 'مفردات الأعمال',
    tl: 'Bokabularyo sa Negosyo',
  },
  exam: {
    en: 'Certification Exam',
    ja: '修了認定試験',
    my: 'အောင်လက်မှတ် စာမေးပွဲ',
    th: 'ข้อสอบรับรองผล',
    zh: '结业认证考试',
    ko: '수료 인증 시험',
    es: 'Examen de Certificación',
    fr: 'Examen de Certification',
    vi: 'Kỳ thi Chứng chỉ',
    id: 'Ujian Sertifikasi',
    tr: 'Sertifika Sınavı',
    de: 'Zertifizierungsprüfung',
    pt: 'Exame de Certificação',
    nl: 'Certificeringsexamen',
    hi: 'प्रमाणन परीक्षा',
    bn: 'সনদপত্র পরীক্ষা',
    ms: 'Peperiksaan Pensijilan',
    ar: 'امتحان الشهادة',
    tl: 'Pagsusulit sa Sertipikasyon',
  },
};

// ----------------------------------------------------------------------------
// 3. Keigo Actor Rules & Verbs Multilingual Translations
// ----------------------------------------------------------------------------
export const KEIGO_VERB_TRANSLATIONS: Record<string, Record<SupportedLanguage, { meaning: string; actorRule: string }>> = {
  'k-iku-kuru': {
    en: {
      meaning: 'to go / to come',
      actorRule: 'Use Sonkeigo (いらっしゃる・お越しになる) for superiors/clients. Use Kenjougo (参る・伺う) for yourself and in-group members.',
    },
    ja: {
      meaning: '行く・来る',
      actorRule: '相手（お客様・上司）の動作なら「いらっしゃる・お越しになる」。自分・自社の動作なら「参る・伺う」。',
    },
    my: {
      meaning: 'သွားသည် / လာသည်',
      actorRule: 'ဧည့်သည် သို့မဟုတ် အထက်လူကြီးအတွက် ဆိုပါက Sonkeigo (いらっしゃる・お越しになる) ကိုသုံးပါ။ မိမိကိုယ်တိုင် သို့မဟုတ် မိမိကုမ္ပဏီသားများအတွက် Kenjougo (参る・伺う) ကို သုံးပါ။',
    },
    th: {
      meaning: 'ไป / มา',
      actorRule: 'หากเป็นการกระทำของลูกค้า/หัวหน้า ให้ใช้ Sonkeigo (いらっしゃる・お越しになる) หากเป็นการกระทำของตนเอง/คนในบริษัทตนเอง ให้ใช้ Kenjougo (参る・伺う)',
    },
    zh: {
      meaning: '去 / 来',
      actorRule: '对方（客户、领导）的行为使用尊敬语（いらっしゃる・お越しになる）；自己或己方公司的行为使用谦让语（参る・伺う）。',
    },
    ko: {
      meaning: '가다 / 오다',
      actorRule: '상대방(고객·상사)의 행동에는 존경어(いらっしゃる·お越しになる)를, 자신·자사 직원의 행동에는 겸양어(参る·伺う)를 사용합니다.',
    },
    es: {
      meaning: 'ir / venir',
      actorRule: 'Para clientes/jefes use Sonkeigo (いらっしゃる・お越しになる). Para usted o su empresa use Kenjougo (参る・伺う).',
    },
    fr: {
      meaning: 'aller / venir',
      actorRule: 'Pour les clients/supérieurs, utilisez Sonkeigo (いらっしゃる・お越しになる). Pour vous ou vos collègues, utilisez Kenjougo (参る・伺う).',
    },
    vi: {
      meaning: 'đi / đến',
      actorRule: 'Hành động của khách hàng/cấp trên dùng Sonkeigo (いらっしゃる・お越しになる). Hành động của bản thân/công ty mình dùng Kenjougo (参る・伺う).',
    },
    id: {
      meaning: 'pergi / datang',
      actorRule: 'Gunakan Sonkeigo (いらっしゃる・お越しになる) untuk atasan/klien. Gunakan Kenjougo (参る・伺う) untuk diri sendiri dan rekan internal.',
    },
    tr: {
      meaning: 'gitmek / gelmek',
      actorRule: 'Müşteriler veya üstler için Sonkeigo (いらっしゃる・お越しになる); kendiniz ve şirket içi çalışma arkadaşlarınız için Kenjougo (参る・伺う) kullanın.',
    },
    de: {
      meaning: 'gehen / kommen',
      actorRule: 'Verwenden Sie Sonkeigo (いらっしゃる・お越しになる) für Vorgesetzte/Kunden. Verwenden Sie Kenjougo (参る・伺う) für sich selbst und interne Mitarbeiter.',
    },
    pt: {
      meaning: 'ir / vir',
      actorRule: 'Use Sonkeigo (いらっしゃる・お越しになる) para clientes/superiores. Use Kenjougo (参る・伺う) para você e pessoas da sua própria empresa.',
    },
    nl: {
      meaning: 'gaan / komen',
      actorRule: 'Gebruik Sonkeigo (いらっしゃる・お越しになる) voor klanten/superieuren. Gebruik Kenjougo (参る・伺う) voor uzelf en collega\'s.',
    },
    hi: {
      meaning: 'जाना / आना',
      actorRule: 'वरिष्ठों/ग्राहकों के लिए सोनकेइगो (いらっしゃる・お越しになる) और अपने लिए केनजौगो (参る・伺う) का उपयोग करें।',
    },
    bn: {
      meaning: 'যাওয়া / আসা',
      actorRule: 'ঊর্ধ্বতন বা গ্রাহকের জন্য সোনকেইগো (いらっしゃる・お越しになる) এবং নিজের কাজের জন্য কেনজৌগো (参る・伺う) ব্যবহার করুন।',
    },
    ms: {
      meaning: 'pergi / datang',
      actorRule: 'Gunakan Sonkeigo (いらっしゃる・お越しになる) untuk pihak atasan/pelanggan. Gunakan Kenjougo (参る・伺う) untuk tindakan diri sendiri atau syarikat sendiri.',
    },
    ar: {
      meaning: 'الذهاب / القدوم',
      actorRule: 'استخدم سونكيغو (いらっしゃる・お越しになる) لأفعال العملاء والرؤساء، وكينجوغو (参る・伺う) لأفعالك وأفعال شركتك.',
    },
    tl: {
      meaning: 'pumunta / dumating',
      actorRule: 'Gamitin ang Sonkeigo (いらっしゃる・お越しになる) para sa boss/kliyente. Gamitin ang Kenjougo (参る・伺う) para sa sarili at sariling kumpanya.',
    },
  },
  'k-iru': {
    en: {
      meaning: 'to be / to exist (animate)',
      actorRule: 'When client/boss is present: いらっしゃる / おいでになる. When yourself/colleague is present: おる.',
    },
    ja: {
      meaning: 'いる',
      actorRule: '相手の存在は「いらっしゃる・おいでになる」。自分・自社の存在は「おります」。',
    },
    my: {
      meaning: 'ရှိသည် (သက်ရှိ)',
      actorRule: 'ဧည့်သည်/အထက်လူကြီး ရှိနေခြင်းအတွက် いらっしゃる ကိုသုံးပါ။ မိမိ သို့မဟုတ် မိမိအဖွဲ့သား ရှိနေခြင်းအတွက် おります ကိုသုံးပါ။',
    },
    th: {
      meaning: 'อยู่ (สิ่งมีชีวิต)',
      actorRule: 'การอยู่ของลูกค้า/หัวหน้าใช้ いらっしゃる / おいでになる การอยู่ของตนเองใช้ おります',
    },
    zh: {
      meaning: '在（有生命）',
      actorRule: '对方在场用尊敬语「いらっしゃる・おいでになる」；自己在场用谦让语「おります」。',
    },
    ko: {
      meaning: '있다 (생물)',
      actorRule: '상대방의 소재는 존경어 「いらっしゃる」, 자신·자사 직원의 소재는 겸양어 「おります」를 사용합니다.',
    },
    es: {
      meaning: 'estar (animado)',
      actorRule: 'Para clientes/jefes use いらっしゃる. Para usted o miembros de su empresa use おります.',
    },
    fr: {
      meaning: 'être / se trouver',
      actorRule: 'Pour les clients/supérieurs utilisez いらっしゃる. Pour vous-même ou votre entreprise utilisez おります.',
    },
    vi: {
      meaning: 'ở / có mặt (người)',
      actorRule: 'Khách hàng/cấp trên dùng いらっしゃる. Bản thân/nội bộ công ty dùng おります.',
    },
    id: {
      meaning: 'ada (bernyawa)',
      actorRule: 'Gunakan いらっしゃる untuk klien/atasan. Gunakan おります untuk diri sendiri atau rekan kantor.',
    },
    tr: {
      meaning: 'bulunmak / olmak',
      actorRule: 'Üstler/müşteriler için いらっしゃる, kendiniz için おります kullanın.',
    },
    de: {
      meaning: 'anwesend sein',
      actorRule: 'Kunden/Vorgesetzte: いらっしゃる. Eigene Person/Mitarbeiter: おります.',
    },
    pt: {
      meaning: 'estar presente',
      actorRule: 'Para clientes/chefes use いらっしゃる. Para você ou colegas use おります.',
    },
    nl: {
      meaning: 'aanwezig zijn',
      actorRule: 'Klanten/superieuren: いらっしゃる. Uzelf/eigen bedrijf: おります.',
    },
    hi: {
      meaning: 'उपस्थित होना',
      actorRule: 'ग्राहक या बॉस के लिए いらっしゃる और अपने लिए おります का प्रयोग करें।',
    },
    bn: {
      meaning: 'উপস্থিত থাকা',
      actorRule: 'গ্রাহক বা বসের জন্য いらっしゃる এবং নিজের জন্য おります ব্যবহার করুন।',
    },
    ms: {
      meaning: 'berada / ada',
      actorRule: 'Untuk pelanggan/atasan gunakan いらっしゃる. Untuk diri sendiri gunakan おります.',
    },
    ar: {
      meaning: 'التواجد / الوجود',
      actorRule: 'للعملاء والرؤساء: いらっしゃる. لنفسك وزملائك: おります.',
    },
    tl: {
      meaning: 'naroroon / narito',
      actorRule: 'Kliyente/boss: いらっしゃる. Sarili/kumpanya: おります.',
    },
  },
};

// ----------------------------------------------------------------------------
// 4. Cushion Words (クッション言葉) Multilingual Dictionary
// ----------------------------------------------------------------------------
export const CUSHION_WORDS_I18N: Record<string, Record<SupportedLanguage, { meaning: string; usage: string }>> = {
  '恐れ入りますが': {
    en: { meaning: 'Excuse me for imposing / I am terribly sorry to trouble you', usage: 'Before requesting an action or asking for someone\'s time.' },
    ja: { meaning: '恐れ入りますが', usage: '相手にお願いやお手数をおかけする前のクッション言葉。' },
    my: { meaning: 'အားနာပါသော်လည်း / အားစိုက်ရစေသည့်အတွက် ခွင့်လွှတ်ပါ', usage: 'တစ်ဖက်သားအား အကူအညီတောင်းခံရာတွင် သုံးသည်။' },
    th: { meaning: 'ขออภัยที่ต้องรบกวน', usage: 'ใช้กล่าวก่อนขอความช่วยเหลือหรือขอเวลารบกวนอีกฝ่าย' },
    zh: { meaning: '实在不好意思冒昧打扰 / 劳驾', usage: '在向对方提出请求或拜托事情前使用的缓冲语。' },
    ko: { meaning: '송구스럽습니다만 / 죄송하지만', usage: '상대방에게 부탁을 하거나 수고를 끼칠 때 쓰는 완충 표현.' },
    es: { meaning: 'Disculpe la molestia, pero...', usage: 'Se usa antes de pedir un favor o solicitar el tiempo de alguien.' },
    fr: { meaning: 'Je suis navré de vous déranger, mais...', usage: 'Utilisé avant de solliciter quelqu\'un ou de demander un service.' },
    vi: { meaning: 'Thật áy náy làm phiền nhưng...', usage: 'Dùng đệm trước khi nhờ vả hoặc làm mất thời gian của đối phương.' },
    id: { meaning: 'Mohon maaf merepotkan, namun...', usage: 'Digunakan sebelum meminta bantuan atau merepotkan orang lain.' },
    tr: { meaning: 'Zahmet veriyorum ama...', usage: 'Bir ricada bulunmadan önce kullanılan nezaket ifadesi.' },
    de: { meaning: 'Verzeihen Sie die Störung, aber...', usage: 'Wird verwendet, bevor man um einen Gefallen oder Zeit bittet.' },
    pt: { meaning: 'Peço desculpas pelo incômodo, mas...', usage: 'Usado antes de fazer um pedido ou solicitar o tempo de alguém.' },
    nl: { meaning: 'Neemt u mij niet kwalijk, maar...', usage: 'Gebruikt voor het vragen van een gunst of tijd.' },
    hi: { meaning: 'कष्ट देने के लिए क्षमा चाहता हूँ, लेकिन...', usage: 'किसी से अनुरोध करने या उनका समय लेने से पहले प्रयोग करें।' },
    bn: { meaning: 'বিরক্ত করার জন্য দুঃখিত, তবে...', usage: 'কোনো অনুরোধ করার পূর্বে ব্যবহৃত অত্যন্ত নম্র বাক্য।' },
    ms: { meaning: 'Maafkan saya kerana menyusahkan, tetapi...', usage: 'Digunakan sebelum meminta pertolongan atau meluangkan masa.' },
    ar: { meaning: 'أعتذر بشدة عن الإزعاج، ولكن...', usage: 'تُقال قبل تقديم طلب أو إشغال وقت الطرف الآخر.' },
    tl: { meaning: 'Ipagpaumanhin po ang abala, ngunit...', usage: 'Ginagamit bago humingi ng pabor o magtanong.' },
  },
  '差し支えなければ': {
    en: { meaning: 'If it is not an inconvenience / If you do not mind', usage: 'When asking for personal info, scheduling, or alternative options.' },
    ja: { meaning: '差し支えなければ', usage: '相手の都合を配慮し、無理強いしない姿勢を示すとき。' },
    my: { meaning: 'အဆင်ပြေမည်ဆိုပါက / ကိစ္စမရှိဘူးဆိုရင်', usage: 'တစ်ဖက်လူအား ဖိအားမပေးဘဲ ဆန္ဒအရ အကူအညီတောင်းရာတွင် သုံးသည်။' },
    th: { meaning: 'หากไม่เป็นการขัดข้อง / สะดวก', usage: 'ใช้แสดงความเกรงใจ ไม่บีบบังคับอีกฝ่าย' },
    zh: { meaning: '方便的话 / 如果不介意的话', usage: '询问日程、个人信息或提出替代方案时不勉强对方的表达。' },
    ko: { meaning: '괜찮으시다면 / 지장이 없으시다면', usage: '상대방의 사정을 배려하며 부담을 주지 않을 때 사용.' },
    es: { meaning: 'Si no es una molestia / Si no tiene inconveniente', usage: 'Para pedir información o proponer opciones sin presionar.' },
    fr: { meaning: 'Si cela ne vous dérange pas / Si cela vous convient', usage: 'Pour faire une demande sans imposer de contrainte.' },
    vi: { meaning: 'Nếu không phiền / Nếu tiện cho quý vị', usage: 'Thể hiện sự tôn trọng, không ép buộc đối phương.' },
    id: { meaning: 'Jika berkenan / Jika tidak keberatan', usage: 'Menunjukkan kesopanan tanpa memaksa pihak lain.' },
    tr: { meaning: 'Bir sakıncası yoksa / Uygunsa', usage: 'Karşı tarafı zorlamadan kibarca ricada bulunurken.' },
    de: { meaning: 'Wenn es Ihnen keine Umstände bereitet...', usage: 'Um unverbindlich und höflich nachzufragen.' },
    pt: { meaning: 'Se não for incômodo / Se não houver problema', usage: 'Para solicitar algo sem pressionar a outra parte.' },
    nl: { meaning: 'Als het u schikt / Als u er geen bezwaar tegen heeft', usage: 'Om beleefd en zonder druk iets voor te stellen.' },
    hi: { meaning: 'यदि आपको कोई आपत्ति न हो...', usage: 'बिना किसी दबाव के विनम्रता से पूछने हेतु।' },
    bn: { meaning: 'যদি কোনো অসুবিধা না থাকে...', usage: 'কাউকে চাপ না দিয়ে বিনয়ের সাথে জিজ্ঞেস করার সময়।' },
    ms: { meaning: 'Jika tiada halangan / Sekiranya tidak keberatan', usage: 'Menunjukkan rasa hormat tanpa memaksa.' },
    ar: { meaning: 'إذا لم يكن هناك مانع / إذا كان ذلك يناسبك', usage: 'تُستخدم للطلب بلطف دون فرض أي ضغط على الطرف الآخر.' },
    tl: { meaning: 'Kung ayos lang po sa inyo / Kung walang sagabal', usage: 'Nagpapakita ng paggalang nang walang pamimilit.' },
  },
};

// ----------------------------------------------------------------------------
// 5. Workplace Culture Guides Multilingual Summaries
// ----------------------------------------------------------------------------
export const CULTURE_GUIDES_I18N: Record<string, Record<SupportedLanguage, { title: string; summary: string; coreRule: string }>> = {
  'cg-hourensou': {
    en: {
      title: 'The Golden Rule of Japanese Business: Hou-Ren-Sou',
      summary: 'Hou-Ren-Sou stands for 報告 (Report), 連絡 (Inform), and 相談 (Consult). It prevents isolated work silos.',
      coreRule: 'Bad news must be reported first (Bad News First). When consulting, always propose your own hypothesis first.',
    },
    ja: {
      title: '報連相（ほうれんそう）の徹底',
      summary: '日本の組織運営の基本骨格。「報告」「連絡」「相談」の3つを徹底し、業務のブラックボックス化を防ぎます。',
      coreRule: '悪い報告ほど迅速に伝える「バッドニュース・ファースト」。相談時は「自分なりの仮説や解決策」を添えて尋ねる。',
    },
    my: {
      title: 'ဂျပန်စီးပွားရေး၏ အခြေခံစည်းမျဉ်း- ဟိုးရန်းဆို (Hou-Ren-Sou)',
      summary: 'သတင်းပို့ခြင်း (ဟိုးခိုခု)၊ ဆက်သွယ်အသိပေးခြင်း (ရန်းရခု)၊ တိုင်ပင်ဆွေးနွေးခြင်း (ဆိုဒန်း) ၃ ရပ်ကို ဆိုလိုသည်။',
      coreRule: 'မကောင်းသောသတင်းကို အရင်ဆုံးတင်ပြပါ (Bad News First)။ အကြံတောင်းရာတွင် မိမိ၏ ယူဆချက်/ဖြေရှင်းနည်းကို အရင်တင်ပြပါ။',
    },
    th: {
      title: 'กฎเหล็กของธุรกิจญี่ปุ่น: โฮเรนโซ (Hou-Ren-Sou)',
      summary: 'ประกอบด้วย รายงาน (โฮโคคุ) ติดต่อสื่อสาร (เร็นราคุ) และปรึกษาหารือ (โซดัน)',
      coreRule: 'ข่าวร้ายต้องรายงานก่อนเสมอ (Bad News First) และเวลาปรึกษาต้องเตรียมข้อเสนอของตนเองไปด้วย',
    },
    zh: {
      title: '日本职场黄金法则：报联相（Hou-Ren-Sou）',
      summary: '由“报告（Hōkoku）”、“联络（Renraku）”、“商谈（Sōdan）”构成，是日本企业团队协作的基石。',
      coreRule: '坏消息要第一时间汇报（Bad News First）；寻求商量咨询时，必须先提出自己的思考方案。',
    },
    ko: {
      title: '일본 비즈니스의 황금률: 호렌소 (보고·연락·상담)',
      summary: '보고(報告), 연락(連絡), 상담(相談)의 머리글자를 딴 일본 조직 소통의 절대적인 원칙입니다.',
      coreRule: '나쁜 소식일수록 가장 먼저 보고할 것(Bad News First). 상담 시에는 반드시 자신의 해결 가설을 제시할 것.',
    },
    es: {
      title: 'La Regla de Oro del Negocio Japonés: Hou-Ren-Sou',
      summary: 'Representa Informar (Hokoku), Comunicar (Renraku) y Consultar (Sodan) para evitar silos laborales.',
      coreRule: 'Las malas noticias deben comunicarse primero. Al consultar, presente siempre su propia propuesta primero.',
    },
    fr: {
      title: 'La Règle d\'Or des Entreprises Japonaises : Hou-Ren-Sou',
      summary: 'Repose sur Rapporter (Hokoku), Informer (Renraku) et Consulter (Sodan).',
      coreRule: 'Les mauvaises nouvelles sont prioritaires. Lors d\'une consultation, proposez toujours votre propre hypothèse.',
    },
    vi: {
      title: 'Quy Tắc Vàng Trong Doanh Nghiệp Nhật: Hou-Ren-Sou',
      summary: 'Gồm Báo cáo (Hokoku), Liên lạc (Renraku) và Thảo luận (Sodan), nền tảng vận hành tập thể.',
      coreRule: 'Tin xấu phải báo cáo đầu tiên (Bad News First). Khi hỏi ý kiến, luôn đưa ra giải pháp đề xuất của bản thân.',
    },
    id: {
      title: 'Aturan Emas Bisnis Jepang: Hou-Ren-Sou',
      summary: 'Singkatan dari Melapor (Hokoku), Menginformasikan (Renraku), dan Berkonsultasi (Sodan).',
      coreRule: 'Kabar buruk harus dilaporkan paling awal. Saat berkonsultasi, selalu bawa usulan solusi Anda sendiri.',
    },
    tr: {
      title: 'Japon İş Dünyasının Altın Kuralı: Hou-Ren-Sou',
      summary: 'Raporlama (Hokoku), Bilgilendirme (Renraku) ve Danışma (Sodan) aşamalarından oluşur.',
      coreRule: 'Kötü haberler ilk önce bildirilmelidir. Fikir alırken mutlaka kendi çözüm önerinizi de sunun.',
    },
    de: {
      title: 'Die goldene Regel japanischer Unternehmen: Hou-Ren-Sou',
      summary: 'Bedeutet Berichten (Hokoku), Informieren (Renraku) und Beraten (Sodan).',
      coreRule: 'Schlechte Nachrichten werden zuerst gemeldet. Bringen Sie beim Beraten immer eigene Lösungsvorschläge mit.',
    },
    pt: {
      title: 'A Regra de Ouro dos Negócios Japoneses: Hou-Ren-Sou',
      summary: 'Composto por Relatar (Hokoku), Comunicar (Renraku) e Consultar (Sodan).',
      coreRule: 'Má notícia deve ser informada primeiro. Ao consultar, apresente sempre sua própria hipótese de solução.',
    },
    nl: {
      title: 'De Gouden Regel van Zakelijk Japan: Hou-Ren-Sou',
      summary: 'Staat voor Rapporteren (Hokoku), Informeren (Renraku) en Overleggen (Sodan).',
      coreRule: 'Slecht nieuws moet eerst gemeld worden. Kom bij overleg altijd met een eigen voorstel.',
    },
    hi: {
      title: 'जापानी व्यापार का स्वर्णिम नियम: हो-रेन-सो',
      summary: 'यह रिपोर्ट (होकोकु), संपर्क (रेनराकु) और परामर्श (सोदान) का आधार स्तंभ है।',
      coreRule: 'बुरी खबर सबसे पहले बताएं (Bad News First)। सलाह लेते समय अपना समाधान भी अवश्य रखें।',
    },
    bn: {
      title: 'জাপানি ব্যবসার সুবর্ণ নিয়ম: হো-রেন-সো',
      summary: 'রিপোর্ট (হোকোকু), যোগাযোগ (রেনরাকু) এবং পরামর্শ (সোদান) নিয়ে গঠিত কাঠামো।',
      coreRule: 'খারাপ সংবাদ সবার আগে জানানো উচিত। পরামর্শ চাওয়ার সময় নিজের সম্ভাব্য সমাধানও উপস্থাপন করুন।',
    },
    ms: {
      title: 'Peraturan Emas Perniagaan Jepun: Hou-Ren-Sou',
      summary: 'Bermaksud Melapor (Hokoku), Menghubungi (Renraku) dan Berbincang (Sodan).',
      coreRule: 'Berita buruk perlu dilaporkan dahulu. Bawa cadangan penyelesaian sendiri semasa meminta nasihat.',
    },
    ar: {
      title: 'القاعدة الذهبية في بيئة العمل اليابانية: هو-رين-سو',
      summary: 'قائمة على التقرير (هوكوكو)، التواصل (رينراكو)، والاستشارة (سودان) لضمان التنسيق التام.',
      coreRule: 'الأخبار غير السارة تُنقل أولاً دائماً. وعند الاستشارة، قدّم مقترحك وحلك الشخصي أولاً.',
    },
    tl: {
      title: 'Gintong Patakaran sa Negosyong Hapones: Hou-Ren-Sou',
      summary: 'Binuo ng Pag-ulat (Hokoku), Pag-abiso (Renraku), at Pagsangguni (Sodan).',
      coreRule: 'Iulat agad ang masamang balita. Kapag sumasangguni, laging magdala ng sariling mungkahi.',
    },
  },
  'cg-seating': {
    en: {
      title: 'Spatial Hierarchy Rules: Kamiza & Shimoza (席次)',
      summary: 'Kamiza (上座) is the seat of highest honor, while Shimoza (下座) is the humble seat closest to the door.',
      coreRule: 'In conference rooms, the seat deepest from the entrance is Kamiza. In taxis, behind the driver is Kamiza.',
    },
    ja: {
      title: '席次（上座と下座）の完全ルール',
      summary: '目上やお客様を敬う日本の空間マナー。最も心地よい奥の席が「上座（かみざ）」、出入口に近い席が「下座（しもざ）」です。',
      coreRule: '会議室では「出入口から最も遠い席」が最上座。タクシーでは「運転手の真後ろ」が最上座、助手席が下座。',
    },
    my: {
      title: 'ထိုင်ခုံနေရာ သတ်မှတ်ချက် စည်းမျဉ်းများ (ခါမိဇ နှင့် ရှိမိုဇ)',
      summary: 'အထက်လူကြီး/ဧည့်သည်အတွက် အမြင့်မြတ်ဆုံးနေရာကို ခါမိဇ ဟုခေါ်ပြီး တံခါးဝနှင့် အနီးဆုံးနေရာကို ရှိမိုဇ ဟုခေါ်သည်။',
      coreRule: 'အစည်းအဝေးခန်းတွင် တံခါးနှင့် အဝေးဆုံး အတွင်းဘက်နေရာသည် ခါမိဇ ဖြစ်သည်။ တက္ကစီတွင် ယာဉ်မောင်းနောက် တည့်တည့်နေရာသည် ခါမိဇ ဖြစ်သည်။',
    },
    th: {
      title: 'กฎลำดับที่นั่งตามลำดับชั้น: คามิซะ และ ชิโมซะ (席次)',
      summary: 'คามิซะ (ที่นั่งเกียรติยศ) สำหรับแขก/หัวหน้า และ ชิโมซะ (ที่นั่งผู้น้อย) ใกล้ประตู',
      coreRule: 'ห้องประชุม: ที่นั่งลึกสุดจากประตูคือคามิซะ รถแท็กซี่: เบาะหลังคนขับคือคามิซะ',
    },
    zh: {
      title: '座次完全规则：上座与下座（席次）',
      summary: '日本职场敬重长者与客户的空间礼仪。最舒适深处的座位为“上座”，靠近出入口的座位为“下座”。',
      coreRule: '会议室中“离门最远的深处座位”为最上座；出租车中“司机正后方”为最上座，副驾驶为最下座。',
    },
    ko: {
      title: '좌석 배치(카미자·시모자)의 절대 규칙',
      summary: '상사나 고객을 예우하는 공간 매너. 가장 안쪽 편안한 자리가 상석(카미자), 출입문 쪽이 말석(시모자).',
      coreRule: '회의실에서는 출입문에서 가장 먼 안쪽이 상석. 택시에서는 운전기사 바로 뒷자리가 최상석.',
    },
    es: {
      title: 'Reglas de Jerarquía Espacial: Kamiza y Shimoza',
      summary: 'Kamiza es el asiento de honor (al fondo) y Shimoza es el asiento humilde más cercano a la puerta.',
      coreRule: 'En salas de reuniones, el asiento más alejado de la puerta es Kamiza. En taxis, detrás del conductor es Kamiza.',
    },
    fr: {
      title: 'Hiérarchie Spatiale : Kamiza et Shimoza (Disposition des Sièges)',
      summary: 'Kamiza est la place d\'honneur (au fond) et Shimoza la place humble (près de la porte).',
      coreRule: 'En salle de réunion, la place la plus éloignée de la porte est Kamiza. En taxi, derrière le chauffeur.',
    },
    vi: {
      title: 'Quy Tắc Vị Trí Ngồi: Kamiza & Shimoza (席次)',
      summary: 'Kamiza là ghế danh dự trong cùng, Shimoza là ghế thấp hơn gần cửa ra vào.',
      coreRule: 'Phòng họp: vị trí xa cửa nhất là Kamiza. Taxi: ghế ngay sau tài xế là vị trí danh dự nhất.',
    },
    id: {
      title: 'Aturan Posisi Duduk: Kamiza & Shimoza',
      summary: 'Kamiza adalah tempat duduk kehormatan terjauh dari pintu, Shimoza adalah tempat dekat pintu.',
      coreRule: 'Di ruang rapat, kursi paling jauh dari pintu adalah Kamiza. Di taksi, di belakang sopir adalah Kamiza.',
    },
    tr: {
      title: 'Mekansal Hiyerarşi: Kamiza ve Shimoza Oturma Düzeni',
      summary: 'Kamiza onur koltuğudur (içeride), Shimoza kapıya en yakın mütevazı koltuktur.',
      coreRule: 'Toplantı odasında kapıdan en uzak koltuk Kamiza\'dır. Takside şoförün arkası Kamiza\'dır.',
    },
    de: {
      title: 'Sitzordnungshierarchie: Kamiza und Shimoza',
      summary: 'Kamiza ist der Ehrenplatz (am weitesten von der Tür), Shimoza ist der Platz an der Tür.',
      coreRule: 'Im Konferenzraum ist der Platz am weitesten von der Tür Kamiza. Im Taxi sitzt der Ehrengast hinter dem Fahrer.',
    },
    pt: {
      title: 'Hierarquia de Assentos: Kamiza e Shimoza',
      summary: 'Kamiza é o assento de honra (ao fundo), Shimoza é o assento mais próximo da porta.',
      coreRule: 'Em salas de reunião, o assento mais distante da porta é Kamiza. Em táxis, atrás do motorista.',
    },
    nl: {
      title: 'Zitplaatshiërarchie: Kamiza en Shimoza',
      summary: 'Kamiza is de ereplaats (het verst van de deur), Shimoza is de plaats dichtbij de deur.',
      coreRule: 'Vergaderruimte: verst van de deur is Kamiza. Taxi: achter de chauffeur is Kamiza.',
    },
    hi: {
      title: 'बैठने का शिष्टाचार: कामीज़ा और शिमोज़ा',
      summary: 'कामीज़ा सम्माननीय सीट है (दरवाजे से दूर), और शिमोज़ा दरवाजे के पास वाली सामान्य सीट है।',
      coreRule: 'मीटिंग रूम में दरवाजे से सबसे दूर वाली सीट कामीज़ा होती है। टैक्सी में ड्राइवर के पीछे वाली सीट कामीज़ा है।',
    },
    bn: {
      title: 'আসন বিন্যাস পদ্ধতি: কামিজা ও শিমোজা',
      summary: 'কামিজা হলো সম্মানজনক আসন (দরজা থেকে দূরে), এবং শিমোজা হলো দরজার নিকটের আসন।',
      coreRule: 'মিটিং রুমে দরজা থেকে সবচেয়ে দূরবর্তী আসনটি কামিজা। ট্যাক্সিতে চালকের পেছনের আসনটি কামিজা।',
    },
    ms: {
      title: 'Peraturan Susunan Tempat Duduk: Kamiza & Shimoza',
      summary: 'Kamiza ialah tempat duduk kehormat (jauh dari pintu), Shimoza tempat duduk berhampiran pintu.',
      coreRule: 'Bilik mesyuarat: paling jauh dari pintu ialah Kamiza. Teksi: belakang pemandu ialah Kamiza.',
    },
    ar: {
      title: 'قواعد ترتيب الجلوس: كاميزا وشيموزا',
      summary: 'كاميزا هو مقعد الشرف الأعمق بعيداً عن الباب، وشيموزا هو المقعد المتواضع بجوار الباب.',
      coreRule: 'في غرف الاجتماعات، المقعد الأبعد عن الباب هو كاميزا. وفي سيارة الأجرة، المقعد خلف السائق مباشرة.',
    },
    tl: {
      title: 'Tuntunin sa Pag-upo: Kamiza at Shimoza',
      summary: 'Kamiza ang pwesto ng karangalan (malayo sa pinto), Shimoza ang malapit sa pintuan.',
      coreRule: 'Sa silid-pulungan, ang pinakamalayo sa pinto ay Kamiza. Sa taxi, ang likod ng driver ay Kamiza.',
    },
  },
};

// ----------------------------------------------------------------------------
// 6. Generic Localized Retrieval Functions
// ----------------------------------------------------------------------------
export function getBusinessCourseText(level: string, lang: SupportedLanguage) {
  const item = BUSINESS_COURSE_LEVEL_I18N[level];
  if (item && item[lang]) return item[lang];
  return item ? item.en : { title: level, desc: '' };
}

export function getBusinessTabName(tabKey: string, lang: SupportedLanguage): string {
  const item = BUSINESS_STUDIO_TABS_I18N[tabKey];
  if (item && item[lang]) return item[lang];
  return item ? item.en : tabKey;
}

export function getKeigoVerbTranslation(verbId: string, lang: SupportedLanguage) {
  const item = KEIGO_VERB_TRANSLATIONS[verbId];
  if (item && item[lang]) return item[lang];
  return item ? item.en : null;
}

export function getCushionWordTranslation(phrase: string, lang: SupportedLanguage) {
  const item = CUSHION_WORDS_I18N[phrase];
  if (item && item[lang]) return item[lang];
  return item ? item.en : null;
}

export function getCultureGuideTranslation(guideId: string, lang: SupportedLanguage) {
  const item = CULTURE_GUIDES_I18N[guideId];
  if (item && item[lang]) return item[lang];
  return item ? item.en : null;
}

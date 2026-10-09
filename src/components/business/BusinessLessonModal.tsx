// ============================================================================
// BUSINESS JAPANESE LESSON STUDY MODAL (ビジネス日本語 レッスン学習モーダル)
// Complete Interactive Lesson Runner with Dialogue Audio, Vocab, Grammar,
// Real-world Etiquette Quizzes & In-App Japanese Keyboard Typing Practice
// Full Multilingual Support Across All 19 Supported Languages
// ============================================================================

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  BookOpen,
  Volume2,
  MessageSquare,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock,
  ShieldCheck,
  HelpCircle,
  Lightbulb,
  ExternalLink,
  Check,
  AlertCircle,
  Keyboard,
  RotateCcw,
  Eye,
  EyeOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SessionPersistenceService } from '../../session/persistence/SessionPersistenceService';
import { adaptBusinessLessonQuizItem } from '../../session/adapters/businessAdapter';
import { BusinessLesson } from '../../types/business';
import {
  getBusinessLessonDetail,
  BusinessLessonDetail,
  BusinessLessonDialogueLine,
  BusinessLessonVocabItem,
  BusinessLessonGrammarItem,
  BusinessLessonQuizItem,
} from '../../data/business/businessLessonDetailData';
import { AudioButton } from '../common/AudioButton';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';
import { useJapaneseKeyboard } from '../../context/JapaneseKeyboardContext';
import { TranslationToggleButton } from '../common/TranslationToggleButton';
import { SupportedLanguage } from '../../types/i18n';
import { getLocalizedBusinessLesson } from '../../data/translations/businessCurriculumI18n';
import {
  getLocalizedScenarioLine,
  getLocalizedBusinessVocabMeaning,
} from '../../data/translations/businessContentI18n';
import {
  translateExampleSentence,
  getLocalizedGrammarContent,
} from '../../data/translations/multilingualEngine';

interface BusinessLessonModalProps {
  lesson: BusinessLesson | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onSelectNextLesson?: () => void;
  onSelectPrevLesson?: () => void;
  hasNextLesson?: boolean;
  hasPrevLesson?: boolean;
  onOpenStudioTab?: (tabId: string) => void;
}

// ----------------------------------------------------------------------------
// Comprehensive 19-Language UI Dictionary for Modal Chrome & Interactive Tools
// ----------------------------------------------------------------------------
const MODAL_I18N: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  // Tabs
  tabOverview: {
    en: '📖 Overview & Rules',
    ja: '📖 概要・ルール',
    my: '📖 အကျဉ်းချုပ်/စည်းမျဉ်း',
    th: '📖 สรุปและกฎ',
    zh: '📖 概要与准则',
    ko: '📖 개요 및 룰',
    es: '📖 Resumen y Reglas',
    fr: '📖 Aperçu & Règles',
    vi: '📖 Tổng quan & Quy tắc',
    id: '📖 Ringkasan & Aturan',
    de: '📖 Übersicht & Regeln',
    pt: '📖 Visão Geral e Regras',
    tr: '📖 Genel Bakış ve Kurallar',
    nl: '📖 Overzicht & Regels',
    hi: '📖 अवलोकन और नियम',
    bn: '📖 সারসংক্ষেপ ও নিয়ম',
    ms: '📖 Gambaran Keseluruhan & Peraturan',
    ar: '📖 نظرة عامة وقواعد',
    tl: '📖 Pangkalahatang-ideya at Panuntunan',
  },
  tabDialogue: {
    en: '💬 Dialogue',
    ja: '💬 実践対話',
    my: '💬 စကားပြောခန်း',
    th: '💬 บทสนทนาจริง',
    zh: '💬 职场实战会话',
    ko: '💬 실전 대화',
    es: '💬 Diálogo',
    fr: '💬 Dialogue',
    vi: '💬 Hội thoại thực tế',
    id: '💬 Dialog Praktis',
    de: '💬 Praxidialog',
    pt: '💬 Diálogo Prático',
    tr: '💬 Pratik Diyalog',
    nl: '💬 Dialoog',
    hi: '💬 संवाद',
    bn: '💬 কথোপকথন',
    ms: '💬 Dialog',
    ar: '💬 الحوار',
    tl: '💬 Diyalogo',
  },
  tabVocab: {
    en: '🔤 Vocabulary',
    ja: '🔤 重要語彙',
    my: '🔤 အဓိကဝေါဟာရ',
    th: '🔤 คำศัพท์สำคัญ',
    zh: '🔤 核心商务词汇',
    ko: '🔤 핵심 어휘',
    es: '🔤 Vocabulario',
    fr: '🔤 Vocabulaire',
    vi: '🔤 Từ vựng cốt lõi',
    id: '🔤 Kosakata Penting',
    de: '🔤 Kernwortschatz',
    pt: '🔤 Vocabulário',
    tr: '🔤 Kelime Bilgisi',
    nl: '🔤 Woordenschat',
    hi: '🔤 शब्दावली',
    bn: '🔤 শব্দভাণ্ডার',
    ms: '🔤 Kosa Kata',
    ar: '🔤 المفردات',
    tl: '🔤 Bokabularyo',
  },
  tabGrammar: {
    en: '📐 Grammar & Keigo',
    ja: '📐 敬語・文型',
    my: '📐 သဒ္ဒါ/ယဉ်ကျေးစကား',
    th: '📐 ไวยากรณ์และเคโกะ',
    zh: '📐 敬语与重点句型',
    ko: '📐 경어 및 문형',
    es: '📐 Gramática y Keigo',
    fr: '📐 Grammaire & Keigo',
    vi: '📐 Ngữ pháp & Kính ngữ',
    id: '📐 Tata Bahasa & Keigo',
    de: '📐 Grammatik & Keigo',
    pt: '📐 Gramática e Keigo',
    tr: '📐 Dilbilgisi ve Keigo',
    nl: '📐 Grammatica & Keigo',
    hi: '📐 व्याकरण और केइगो',
    bn: '📐 ব্যাকরণ ও কেইগো',
    ms: '📐 Tatabahasa & Keigo',
    ar: '📐 القواعد ولغة الاحترام',
    tl: '📐 Balarila at Keigo',
  },
  tabQuiz: {
    en: '🎯 Quiz',
    ja: '🎯 確認テスト',
    my: '🎯 စစ်ဆေးမှု မေးခွန်း',
    th: '🎯 แบบทดสอบ',
    zh: '🎯 随堂测验',
    ko: '🎯 확인 테스트',
    es: '🎯 Cuestionario',
    fr: '🎯 Test de validation',
    vi: '🎯 Trắc nghiệm kiểm tra',
    id: '🎯 Kuis Pemahaman',
    de: '🎯 Verständnistest',
    pt: '🎯 Questionário',
    tr: '🎯 Test',
    nl: '🎯 Quiz',
    hi: '🎯 प्रश्नोत्तरी',
    bn: '🎯 কুইজ',
    ms: '🎯 Kuiz',
    ar: '🎯 اختبار قصير',
    tl: '🎯 Pagsusulit',
  },
  tabTyping: {
    en: '⌨️ Typing Practice',
    ja: '⌨️ タイピング練習',
    my: '⌨️ လက်ကွက်လေ့ကျင့်ခန်း',
    th: '⌨️ ฝึกพิมพ์ดีด',
    zh: '⌨️ 日文打字练习',
    ko: '⌨️ 타이핑 연습',
    es: '⌨️ Práctica de teclado',
    fr: '⌨️ Entraînement à la frappe',
    vi: '⌨️ Luyện gõ tiếng Nhật',
    id: '⌨️ Latihan Mengetik',
    de: '⌨️ Tipp-Übung',
    pt: '⌨️ Prática de Digitação',
    tr: '⌨️ Yazma Pratiği',
    nl: '⌨️ Typoefening',
    hi: '⌨️ टाइपिंग अभ्यास',
    bn: '⌨️ টাইপিং অনুশীলন',
    ms: '⌨️ Latihan Menaip',
    ar: '⌨️ تدريب الكتابة',
    tl: '⌨️ Pagsasanay sa Pag-type',
  },

  // Buttons & Labels
  lessonNum: {
    en: 'Lesson',
    ja: '第',
    my: 'သင်ခန်းစာ',
    th: 'บทเรียนที่',
    zh: '第',
    ko: '레슨',
    es: 'Lección',
    fr: 'Leçon',
    vi: 'Bài học',
    id: 'Pelajaran',
    de: 'Lektion',
    pt: 'Lição',
    tr: 'Ders',
    nl: 'Les',
    hi: 'पाठ',
    bn: 'পাঠ',
    ms: 'Pelajaran',
    ar: 'الدرس',
    tl: 'Aralin',
  },
  mins: {
    en: 'mins',
    ja: '分',
    my: 'မိနစ်',
    th: 'นาที',
    zh: '分钟',
    ko: '분',
    es: 'min',
    fr: 'min',
    vi: 'phút',
    id: 'menit',
    de: 'Min.',
    pt: 'min',
    tr: 'dk',
    nl: 'min',
    hi: 'मिनट',
    bn: 'মিনিট',
    ms: 'minit',
    ar: 'دقائق',
    tl: 'min',
  },
  markDone: {
    en: 'Mark Done (+50 XP)',
    ja: '完了にする (+50 XP)',
    my: 'ပြီးမြောက်ကြောင်း မှတ်သားမည် (+50 XP)',
    th: 'บันทึกว่าสำเร็จ (+50 XP)',
    zh: '标记完成 (+50 XP)',
    ko: '완료 체크 (+50 XP)',
    es: 'Marcar completada (+50 XP)',
    fr: 'Marquer terminé (+50 XP)',
    vi: 'Đánh dấu hoàn thành (+50 XP)',
    id: 'Tandai Selesai (+50 XP)',
    de: 'Als erledigt markieren (+50 XP)',
    pt: 'Marcar como concluído (+50 XP)',
    tr: 'Tamamlandı Olarak İşaretle (+50 XP)',
    nl: 'Markeer als voltooid (+50 XP)',
    hi: 'पूर्ण चिह्नित करें (+50 XP)',
    bn: 'সম্পন্ন চিহ্নিত করুন (+50 XP)',
    ms: 'Tandakan Selesai (+50 XP)',
    ar: 'تحديد كمكتمل (+50 نقطة)',
    tl: 'Markahan bilang Tapos (+50 XP)',
  },
  completed: {
    en: 'Completed ✓',
    ja: '完了 ✓',
    my: 'ပြီးမြောက်ပြီး ✓',
    th: 'สำเร็จแล้ว ✓',
    zh: '已完成 ✓',
    ko: '완료됨 ✓',
    es: 'Completada ✓',
    fr: 'Terminé ✓',
    vi: 'Đã hoàn thành ✓',
    id: 'Selesai ✓',
    de: 'Abgeschlossen ✓',
    pt: 'Concluído ✓',
    tr: 'Tamamlandı ✓',
    nl: 'Voltooid ✓',
    hi: 'पूर्ण ✓',
    bn: 'সম্পন্ন ✓',
    ms: 'Selesai ✓',
    ar: 'مكتمل ✓',
    tl: 'Tapos na ✓',
  },
  prevLesson: {
    en: 'Prev Lesson',
    ja: '前のレッスン',
    my: 'ယခင်သင်ခန်းစာ',
    th: 'บทเรียนก่อนหน้า',
    zh: '上一课',
    ko: '이전 레슨',
    es: 'Lección anterior',
    fr: 'Leçon précédente',
    vi: 'Bài trước',
    id: 'Pelajaran Sebelumnya',
    de: 'Vorherige Lektion',
    pt: 'Lição Anterior',
    tr: 'Önceki Ders',
    nl: 'Vorige les',
    hi: 'पिछला पाठ',
    bn: 'পূর্ববর্তী পাঠ',
    ms: 'Pelajaran Sebelum',
    ar: 'الدرس السابق',
    tl: 'Nakaraang Aralin',
  },
  nextLesson: {
    en: 'Next Lesson',
    ja: '次のレッスン',
    my: 'နောက်သင်ခန်းစာ',
    th: 'บทเรียนถัดไป',
    zh: '下一课',
    ko: '다음 레슨',
    es: 'Siguiente lección',
    fr: 'Leçon suivante',
    vi: 'Bài tiếp theo',
    id: 'Pelajaran Berikutnya',
    de: 'Nächste Lektion',
    pt: 'Próxima Lição',
    tr: 'Sonraki Ders',
    nl: 'Volgende les',
    hi: 'अगला पाठ',
    bn: 'পরবর্তী পাঠ',
    ms: 'Pelajaran Seterusnya',
    ar: 'الدرس التالي',
    tl: 'Susunod na Aralin',
  },
  scenarioContext: {
    en: 'Corporate Scenario & Context',
    ja: 'ビジネス場面と背景',
    my: 'လုပ်ငန်းခွင် အခြေအနေနှင့် နောက်ခံ (Context)',
    th: 'บริบทและสถานการณ์ในที่ทำงาน',
    zh: '职场情境与背景解析',
    ko: '비즈니스 상황 및 맥락',
    es: 'Escenario y contexto corporativo',
    fr: 'Contexte et scénario d\'entreprise',
    vi: 'Bối cảnh & Tình huống công việc',
    id: 'Skenario & Konteks Korporat',
    de: 'Unternehmensszenario und Kontext',
    pt: 'Cenário Corporativo e Contexto',
    tr: 'Kurumsal Senaryo ve Bağlam',
    nl: 'Bedrijfsscenario & Context',
    hi: 'कॉर्पोरेट परिदृश्य और संदर्भ',
    bn: 'কর্পোরেট দৃশ্যপট ও প্রেক্ষাপট',
    ms: 'Senario & Konteks Korporat',
    ar: 'سيناريو العمل وسياقه',
    tl: 'Sitwasyon at Konteksto sa Trabaho',
  },
  environment: {
    en: 'Environment:',
    ja: '職場環境:',
    my: 'လုပ်ငန်းခွင် ဝန်းကျင်:',
    th: 'สภาพแวดล้อม:',
    zh: '工作场景:',
    ko: '근무 환경:',
    es: 'Entorno:',
    fr: 'Environnement :',
    vi: 'Môi trường:',
    id: 'Lingkungan:',
    de: 'Umfeld:',
    pt: 'Ambiente:',
    tr: 'Ortam:',
    nl: 'Omgeving:',
    hi: 'परिवेश:',
    bn: 'পরিবেশ:',
    ms: 'Persekitaran:',
    ar: 'بيئة العمل:',
    tl: 'Kapaligiran:',
  },
  keyEtiquetteRules: {
    en: 'Key Professional Etiquette Rules',
    ja: '遵守すべき重要ビジネスマナー',
    my: 'လိုက်နာရမည့် အဓိက ကျင့်ဝတ်စည်းမျဉ်းများ',
    th: 'กฎมารยาททางธุรกิจที่สำคัญ',
    zh: '核心职业礼仪规范',
    ko: '핵심 프로 비즈니스 매너 수칙',
    es: 'Reglas clave de etiqueta profesional',
    fr: 'Règles clés d\'étiquette professionnelle',
    vi: 'Quy tắc ứng xử chuyên nghiệp',
    id: 'Aturan Utama Etiket Profesional',
    de: 'Wichtige Benimmregeln im Geschäftsleben',
    pt: 'Regras Essenciais de Etiqueta Profissional',
    tr: 'Önemli Profesyonel Görgü Kuralları',
    nl: 'Belangrijke zakelijke etiquetteregels',
    hi: 'प्रमुख पेशेवर शिष्टाचार नियम',
    bn: 'মূল পেশাদার শিষ্টাচার নিয়ম',
    ms: 'Peraturan Etika Profesional Utama',
    ar: 'القواعد الأساسية لآداب العمل',
    tl: 'Pangunahing Panuntunan sa Propesyonal na Etiketa',
  },
  culturalInsight: {
    en: 'Workplace Cultural Insight (商習慣)',
    ja: '日本のビジネス商習慣・マナー解説',
    my: 'ဂျပန်လုပ်ငန်းခွင် ယဉ်ကျေးမှုဆိုင်ရာ သိကောင်းစရာ (商習慣)',
    th: 'เกร็ดวัฒนธรรมองค์กรและธรรมเนียมปฏิบัติ (商習慣)',
    zh: '日本职场文化与商业习惯（商習慣）',
    ko: '일본 비즈니스 문화 및 상관습(商習慣)',
    es: 'Perspectiva cultural de negocios (商習慣)',
    fr: 'Aperçu de la culture d\'entreprise japonaise (商習慣)',
    vi: 'Hiểu biết văn hóa công sở Nhật Bản (商習慣)',
    id: 'Wawasan Budaya Kerja Jepang (商習慣)',
    de: 'Einblicke in die japanische Geschäftskultur (商習慣)',
    pt: 'Insight Cultural de Negócios (商習慣)',
    tr: 'Japon İş Kültürü İpuçları (商習慣)',
    nl: 'Inzicht in de Japanse zakencultuur (商習慣)',
    hi: 'जापानी कार्यस्थल सांस्कृतिक अंतर्दृष्टि (商習慣)',
    bn: 'জাপানি কর্মক্ষেত্রের সাংস্কৃতিক জ্ঞান (商習慣)',
    ms: 'Pandangan Budaya Kerja Jepun (商習慣)',
    ar: 'لمحة عن ثقافة العمل وعاداته في اليابان (商習慣)',
    tl: 'Kabatiran sa Kulturang Pangnegosyo ng Hapon (商習慣)',
  },
  dialogueIntro: {
    en: 'Listen to the native voice audio and analyze the speech patterns line by line.',
    ja: 'ネイティブ音声を聴き、表現パターンを1行ずつ確認しましょう。',
    my: 'ဂျပန်ဇာတိ အသံထွက်ကို နားထောင်ပြီး စကားပြောပုံစံများကို တစ်ကြောင်းချင်း လေ့လာပါ။',
    th: 'ฟังเสียงเจ้าของภาษาและวิเคราะห์รูปแบบประโยคทีละบรรทัด',
    zh: '聆听原声发音，逐行分析掌握地道职场表达模式。',
    ko: '원어민 음성을 듣고 표현 패턴을 한 줄씩 분석해 보세요.',
    es: 'Escuche el audio nativo y analice los patrones de expresión línea por línea.',
    fr: 'Écoutez l\'audio natif et analysez les structures d\'expression ligne par ligne.',
    vi: 'Lắng nghe giọng bản xứ và phân tích từng mẫu câu hội thoại.',
    id: 'Dengarkan audio penutur asli dan analisis pola kalimat baris demi baris.',
    de: 'Hören Sie sich das muttersprachliche Audio an und analysieren Sie die Sprachmuster.',
    pt: 'Ouça o áudio nativo e analise os padrões de fala linha por linha.',
    tr: 'Anadili Japonca olanların sesini dinleyin ve ifadeleri satır satır inceleyin.',
    nl: 'Luister naar de audio en analyseer de uitdrukkingen regel voor regel.',
    hi: 'मूल आवाज सुनें और वाक्य संरचना का विश्लेषण करें।',
    bn: 'নেটিভ ভয়েস শুনুন এবং প্রতিটি লাইনের বাক্যধারা বিশ্লেষণ করুন।',
    ms: 'Dengar audio penutur jati dan analisis corak pertuturan baris demi baris.',
    ar: 'استمع إلى التسجيل الصوتي وحلل أنماط التعبير سطراً بسطر.',
    tl: 'Makinig sa boses ng katutubong tagapagsalita at suriin ang bawat linya.',
  },
  dialogueTurns: {
    en: 'dialogue turns',
    ja: 'ターン',
    my: 'ကြောင်း',
    th: 'บทสนทนา',
    zh: '轮会话',
    ko: '턴 대화',
    es: 'turnos de diálogo',
    fr: 'échanges',
    vi: 'lượt thoại',
    id: 'putaran dialog',
    de: 'Dialogzeilen',
    pt: 'turnos de diálogo',
    tr: 'diyalog satırı',
    nl: 'dialoogregels',
    hi: 'संवाद पंक्तियाँ',
    bn: 'সংলাপ লাইন',
    ms: 'giliran dialog',
    ar: 'سطور حوارية',
    tl: 'linya ng diyalogo',
  },
  immersionNotice: {
    en: 'Translation hidden for immersion',
    ja: '没入学習のため翻訳を非表示にしています',
    my: 'လေ့ကျင့်မှုအတွက် ဘာသာပြန်ကို ဖျောက်ထားပါသည်',
    th: 'ซ่อนคำแปลเพื่อการฝึกฝนอย่างเป็นธรรมชาติ',
    zh: '已隐藏翻译以进行沉浸式语言训练',
    ko: '몰입도 높은 훈련을 위해 번역을 숨겼습니다',
    es: 'Traducción oculta para mayor inmersión',
    fr: 'Traduction masquée pour immersion',
    vi: 'Đã ẩn bản dịch để luyện tập phản xạ',
    id: 'Terjemahan disembunyikan untuk imersi',
    de: 'Übersetzung für Immersion ausgeblendet',
    pt: 'Tradução oculta para imersão',
    tr: 'Pratik için çeviri gizlendi',
    nl: 'Vertaling verborgen voor immersie',
    hi: 'अभ्यास के लिए अनुवाद छुपाया गया है',
    bn: 'অনুশীলনের জন্য অনুবাদ লুকানো আছে',
    ms: 'Terjemahan disembunyikan untuk latihan',
    ar: 'تم إخفاء الترجمة لتعزيز الاستيعاب المباشر',
    tl: 'Nakatago ang salin para sa pagsasanay',
  },
  peekTranslation: {
    en: 'Peek Translation',
    ja: '翻訳を表示',
    my: 'ဘာသာပြန် ကြည့်ရှုမည်',
    th: 'ดูคำแปล',
    zh: '查看翻译',
    ko: '번역 보기',
    es: 'Ver traducción',
    fr: 'Afficher la traduction',
    vi: 'Xem bản dịch',
    id: 'Lihat Terjemahan',
    de: 'Übersetzung ansehen',
    pt: 'Ver tradução',
    tr: 'Çeviriyi Gör',
    nl: 'Toon vertaling',
    hi: 'अनुवाद देखें',
    bn: 'অনুবাদ দেখুন',
    ms: 'Lihat Terjemahan',
    ar: 'عرض الترجمة',
    tl: 'Tingnan ang Salin',
  },
  revealMeaning: {
    en: 'Reveal Meaning (Active Recall)',
    ja: '意味を表示（能動的想起）',
    my: 'အဓိပ္ပာယ် ကြည့်ရှုမည် (Active Recall)',
    th: 'เปิดดูความหมาย (Active Recall)',
    zh: '揭示释义（主动回忆）',
    ko: '의미 확인 (능동적 회상)',
    es: 'Revelar significado',
    fr: 'Révéler le sens',
    vi: 'Xem nghĩa từ (Active Recall)',
    id: 'Buka Arti (Active Recall)',
    de: 'Bedeutung aufdecken',
    pt: 'Revelar significado',
    tr: 'Anlamı Göster',
    nl: 'Betekenis onthullen',
    hi: 'अर्थ देखें',
    bn: 'অর্থ দেখুন',
    ms: 'Papar Maksud',
    ar: 'كشف المعنى',
    tl: 'Ipakita ang Kahulugan',
  },
  revealGrammar: {
    en: 'Reveal Grammar Meaning',
    ja: '文法解説を表示',
    my: 'သဒ္ဒါအဓိပ္ပာယ် ကြည့်ရှုမည်',
    th: 'ดูความหมายไวยากรณ์',
    zh: '查看语法释义',
    ko: '문법 의미 확인',
    es: 'Revelar gramática',
    fr: 'Révéler la grammaire',
    vi: 'Xem nghĩa ngữ pháp',
    id: 'Lihat Tata Bahasa',
    de: 'Grammatik aufdecken',
    pt: 'Ver gramática',
    tr: 'Dilbilgisini Göster',
    nl: 'Grammatica tonen',
    hi: 'व्याकरण देखें',
    bn: 'ব্যাকরণ দেখুন',
    ms: 'Papar Tatabahasa',
    ar: 'كشف شرح القاعدة',
    tl: 'Ipakita ang Balarila',
  },
  structure: {
    en: 'Structure:',
    ja: '接続:',
    my: 'ဖွဲ့စည်းပုံ:',
    th: 'โครงสร้าง:',
    zh: '接续形式:',
    ko: '접속 형태:',
    es: 'Estructura:',
    fr: 'Structure :',
    vi: 'Cấu trúc:',
    id: 'Struktur:',
    de: 'Struktur:',
    pt: 'Estrutura:',
    tr: 'Yapı:',
    nl: 'Structuur:',
    hi: 'संरचना:',
    bn: 'গঠন:',
    ms: 'Struktur:',
    ar: 'التركيب:',
    tl: 'Estruktura:',
  },
  rule: {
    en: 'Rule:',
    ja: '用法ルール:',
    my: 'အသုံးပြုပုံ စည်းမျဉ်း:',
    th: 'กฎการใช้:',
    zh: '用法规范:',
    ko: '용법 규칙:',
    es: 'Regla:',
    fr: 'Règle :',
    vi: 'Quy tắc:',
    id: 'Aturan:',
    de: 'Regel:',
    pt: 'Regra:',
    tr: 'Kural:',
    nl: 'Regel:',
    hi: 'नियम:',
    bn: 'নিয়ম:',
    ms: 'Peraturan:',
    ar: 'القاعدة:',
    tl: 'Panuntunan:',
  },
  avoid: {
    en: '❌ Avoid:',
    ja: '❌ 避けるべき表現:',
    my: '❌ ရှောင်ကြဉ်ရန်:',
    th: '❌ ควรหลีกเลี่ยง:',
    zh: '❌ 规避失礼用法:',
    ko: '❌ 피해야 할 표현:',
    es: '❌ Evitar:',
    fr: '❌ À éviter :',
    vi: '❌ Nên tránh:',
    id: '❌ Hindari:',
    de: '❌ Vermeiden:',
    pt: '❌ Evitar:',
    tr: '❌ Kaçının:',
    nl: '❌ Vermijden:',
    hi: '❌ बचें:',
    bn: '❌ বর্জন করুন:',
    ms: '❌ Elakkan:',
    ar: '❌ تجنب:',
    tl: '❌ Iwasan:',
  },
  use: {
    en: '✓ Use:',
    ja: '✓ 推奨ビジネス表現:',
    my: '✓ သုံးစွဲရန်:',
    th: '✓ ควรใช้:',
    zh: '✓ 正式职业表达:',
    ko: '✓ 권장 비즈니스 표현:',
    es: '✓ Usar:',
    fr: '✓ À utiliser :',
    vi: '✓ Nên dùng:',
    id: '✓ Gunakan:',
    de: '✓ Verwenden:',
    pt: '✓ Usar:',
    tr: '✓ Kullanın:',
    nl: '✓ Gebruiken:',
    hi: '✓ उपयोग करें:',
    bn: '✓ ব্যবহার করুন:',
    ms: '✓ Gunakan:',
    ar: '✓ استخدم:',
    tl: '✓ Gamitin:',
  },
  examples: {
    en: 'Authentic Examples:',
    ja: '実践例文:',
    my: 'လက်တွေ့ ဥပမာ ဝါကျများ:',
    th: 'ตัวอย่างประโยคจริง:',
    zh: '实战例句:',
    ko: '실전 예문:',
    es: 'Ejemplos auténticos:',
    fr: 'Exemples concrets :',
    vi: 'Ví dụ thực tế:',
    id: 'Contoh Nyata:',
    de: 'Praxisbeispiele:',
    pt: 'Exemplos Práticos:',
    tr: 'Örnek Cümleler:',
    nl: 'Voorbeelden:',
    hi: 'प्रामाणिक उदाहरण:',
    bn: 'বাস্তব উদাহরণ:',
    ms: 'Contoh Sebenar:',
    ar: 'أمثلة عملية:',
    tl: 'Mga Halimbawa:',
  },
  quizHeader: {
    en: 'Workplace Comprehension Check',
    ja: '職場理解度テスト',
    my: 'လုပ်ငန်းခွင် နားလည်သဘောပေါက်မှု စစ်ဆေးခြင်း',
    th: 'แบบทดสอบความเข้าใจในที่ทำงาน',
    zh: '职场理解度测评',
    ko: '직장 실무 이해도 테스트',
    es: 'Evaluación de comprensión laboral',
    fr: 'Test de compréhension professionnelle',
    vi: 'Kiểm tra mức độ hiểu bài',
    id: 'Uji Pemahaman Tempat Kerja',
    de: 'Verständnistest für den Arbeitsplatz',
    pt: 'Teste de Compreensão no Trabalho',
    tr: 'İş Yeri Anlama Testi',
    nl: 'Begripstoets werkvloer',
    hi: 'कार्यस्थल समझ परीक्षण',
    bn: 'কর্মক্ষেত্রের বোঝাপড়া পরীক্ষা',
    ms: 'Ujian Pemahaman Tempat Kerja',
    ar: 'اختبار الفهم المهني',
    tl: 'Pagsusuri sa Pag-unawa sa Trabaho',
  },
  retakeQuiz: {
    en: 'Retake Quiz',
    ja: 'もう一度挑戦',
    my: 'ပြန်လည်ဖြေဆိုမည်',
    th: 'ทำแบบทดสอบอีกครั้ง',
    zh: '重新答题',
    ko: '다시 풀기',
    es: 'Repetir cuestionario',
    fr: 'Recommencer le test',
    vi: 'Làm lại bài kiểm tra',
    id: 'Ulangi Kuis',
    de: 'Test wiederholen',
    pt: 'Repetir Quiz',
    tr: 'Testi Tekrarla',
    nl: 'Quiz opnieuw doen',
    hi: 'पुनः प्रयास करें',
    bn: 'আবার কুইজ দিন',
    ms: 'Ulang Kuiz',
    ar: 'إعادة الاختبار',
    tl: 'Ulitin ang Pagsusulit',
  },
  submitAnswers: {
    en: 'Submit Answers & Check Etiquette',
    ja: '解答を送信して確認',
    my: 'အဖြေများစစ်ဆေးမည်',
    th: 'ส่งคำตอบและตรวจผล',
    zh: '提交答案并查看解析',
    ko: '답안 제출 및 매너 확인',
    es: 'Enviar respuestas y revisar',
    fr: 'Soumettre et vérifier',
    vi: 'Nộp bài và kiểm tra',
    id: 'Kirim Jawaban & Periksa',
    de: 'Antworten prüfen',
    pt: 'Enviar Respostas',
    tr: 'Cevapları Gönder',
    nl: 'Antwoorden controleren',
    hi: 'उत्तर सबमिट करें',
    bn: 'উত্তর জমা দিন',
    ms: 'Hantar Jawapan',
    ar: 'إرسال الإجابات والتصحيح',
    tl: 'Isumite ang mga Sagot',
  },
  correct: {
    en: '✓ Correct!',
    ja: '✓ 正解！',
    my: '✓ မှန်ကန်ပါသည်!',
    th: '✓ ถูกต้อง!',
    zh: '✓ 回答正确！',
    ko: '✓ 정답입니다!',
    es: '✓ ¡Correcto!',
    fr: '✓ Correct !',
    vi: '✓ Chính xác!',
    id: '✓ Benar!',
    de: '✓ Richtig!',
    pt: '✓ Correto!',
    tr: '✓ Doğru!',
    nl: '✓ Juist!',
    hi: '✓ सही!',
    bn: '✓ সঠিক!',
    ms: '✓ Betul!',
    ar: '✓ صحيح!',
    tl: '✓ Tama!',
  },
  incorrect: {
    en: '❌ Incorrect',
    ja: '❌ 不正解',
    my: '❌ မှားယွင်းပါသည်',
    th: '❌ ยังไม่ถูกต้อง',
    zh: '❌ 回答错误',
    ko: '❌ 오답입니다',
    es: '❌ Incorrecto',
    fr: '❌ Incorrect',
    vi: '❌ Chưa chính xác',
    id: '❌ Kurang tepat',
    de: '❌ Falsch',
    pt: '❌ Incorreto',
    tr: '❌ Yanlış',
    nl: '❌ Onjuist',
    hi: '❌ गलत',
    bn: '❌ ভুল',
    ms: '❌ Salah',
    ar: '❌ غير صحيح',
    tl: '❌ Mali',
  },
  typingInstruction: {
    en: 'Type the phrase above (use physical keyboard or virtual keyboard):',
    ja: '上記のフレーズを入力してください（キーボードまたは仮想キーボード）:',
    my: 'အထက်ပါ စကားစုကို ရိုက်ထည့်ပါ (Keyboard သို့မဟုတ် Virtual Keyboard သုံးနိုင်ပါသည်):',
    th: 'พิมพ์วลีด้านบน (ใช้แป้นพิมพ์จริงหรือแป้นพิมพ์เสมือน):',
    zh: '请输入上方短语（支持实体键盘或应用内日文虚拟键盘）：',
    ko: '위 문장을 입력하세요 (실물 키보드 또는 가상 키보드 지원):',
    es: 'Escriba la frase de arriba (use teclado físico o virtual):',
    fr: 'Saisissez la phrase ci-dessus (clavier physique ou virtuel) :',
    vi: 'Nhập cụม từ phía trên (dùng bàn phím máy tính hoặc bàn phím ảo):',
    id: 'Ketik frasa di atas (gunakan papan ketik fisik atau virtual):',
    de: 'Geben Sie den obigen Satz ein (Tastatur oder virtuelle Tastatur):',
    pt: 'Digite a frase acima (use teclado físico ou virtual):',
    tr: 'Yukarıdaki ifadeyi yazın (fiziksel veya sanal klavye kullanın):',
    nl: 'Typ de bovenstaande zin (fysiek of virtueel toetsenbord):',
    hi: 'ऊपर दिए गए वाक्यांश को टाइप करें:',
    bn: 'উপরের বাক্যাংশটি টাইপ করুন:',
    ms: 'Taip frasa di atas (papan kekunci fizikal atau maya):',
    ar: 'اكتب العبارة أعلاه (باستخدام لوحة المفاتيح الفعلية أو الافتراضية):',
    tl: 'I-type ang parirala sa itaas:',
  },
  japaneseKeyboard: {
    en: '⌨ Japanese Keyboard',
    ja: '⌨ 日本語キーボード',
    my: '⌨ ဂျပန်ကီးဘုတ်',
    th: '⌨ แป้นพิมพ์ภาษาญี่ปุ่น',
    zh: '⌨ 日文虚拟键盘',
    ko: '⌨ 일본어 키보드',
    es: '⌨ Teclado japonés',
    fr: '⌨ Clavier japonais',
    vi: '⌨ Bàn phím tiếng Nhật',
    id: '⌨ Papan Ketik Jepang',
    de: '⌨ Japanische Tastatur',
    pt: '⌨ Teclado Japonês',
    tr: '⌨ Japonca Klavye',
    nl: '⌨ Japans toetsenbord',
    hi: '⌨ जापानी कीबोर्ड',
    bn: '⌨ জাপানি কিবোর্ড',
    ms: '⌨ Papan Kekunci Jepun',
    ar: '⌨ لوحة مفاتيح يابانية',
    tl: '⌨ Keyboard na Hapones',
  },
  typingMatched: {
    en: 'Matched!',
    ja: '正解！',
    my: 'မှန်ကန်ပါသည်!',
    th: 'ถูกต้อง!',
    zh: '匹配成功！',
    ko: '일치합니다!',
    es: '¡Coincide!',
    fr: 'Parfait !',
    vi: 'Chính xác!',
    id: 'Cocok!',
    de: 'Treffer!',
    pt: 'Correto!',
    tr: 'Eşleşti!',
    nl: 'Overeenkomst!',
    hi: 'सटीक!',
    bn: 'মিলেছে!',
    ms: 'Padan!',
    ar: 'تطابق ممتاز!',
    tl: 'Tumugma!',
  },
  typingReward: {
    en: '🎉 Great typing! You earned +15 XP for practicing authentic Japanese typing!',
    ja: '🎉 正確に入力できました！日本語タイピング練習で +15 XP を獲得しました！',
    my: '🎉 အလွန်ကောင်းမွန်ပါသည်! ဂျပန်စာရိုက်နှိပ်လေ့ကျင့်မှုအတွက် +15 XP ရရှိပါသည်!',
    th: '🎉 พิมพ์ได้ยอดเยี่ยมมาก! คุณได้รับ +15 XP จากการฝึกพิมพ์ภาษาญี่ปุ่นแท้!',
    zh: '🎉 输入完全正确！完成地道日文打字练习，获得 +15 XP 奖励！',
    ko: '🎉 훌륭합니다! 일본어 타이핑 연습으로 +15 XP를 획득하셨습니다!',
    es: '🎉 ¡Excelente mecanografía! ¡Ganaste +15 XP por practicar escritura en japonés!',
    fr: '🎉 Bravo ! Vous avez gagné +15 XP pour votre pratique de la frappe en japonais !',
    vi: '🎉 Gõ rất chuẩn! Bạn nhận được +15 XP khi luyện gõ tiếng Nhật thực tế!',
    id: '🎉 Ketikan hebat! Anda mendapatkan +15 XP untuk latihan mengetik bahasa Jepang!',
    de: '🎉 Sehr gut getippt! Sie haben +15 XP für das Üben der japanischen Tastatur erhalten!',
    pt: '🎉 Ótima digitação! Você ganhou +15 XP por praticar digitação em japonês!',
    tr: '🎉 Harika yazım! Japonca yazma pratiği için +15 XP kazandınız!',
    nl: '🎉 Goed getypt! Je hebt +15 XP verdiend met de Japanse typoefening!',
    hi: '🎉 शानदार टाइपिंग! आपने प्रामाणिक जापानी टाइपिंग के लिए +15 XP अर्जित किए!',
    bn: '🎉 চমৎকার টাইপিং! জাপানি টাইপিং অনুশীলনের জন্য আপনি +15 XP পেয়েছেন!',
    ms: '🎉 Taipan yang hebat! Anda memperoleh +15 XP untuk latihan menaip bahasa Jepun!',
    ar: '🎉 كتابة ممتازة! لقد ربحت +15 نقطة خبرة لممارستك الكتابة باللغة اليابانية!',
    tl: '🎉 Magaling! Nakakuha ka ng +15 XP sa pagsasanay sa pag-type ng Hapones!',
  },
  nextPhrase: {
    en: 'Next Phrase',
    ja: '次のフレーズ',
    my: 'နောက်စကားစု',
    th: 'วลีถัดไป',
    zh: '下一句',
    ko: '다음 문장',
    es: 'Siguiente frase',
    fr: 'Phrase suivante',
    vi: 'Cụm từ tiếp theo',
    id: 'Frasa Berikutnya',
    de: 'Nächste Phrase',
    pt: 'Próxima Frase',
    tr: 'Sonraki İfade',
    nl: 'Volgende zin',
    hi: 'अगला वाक्यांश',
    bn: 'পরবর্তী বাক্য',
    ms: 'Frasa Seterusnya',
    ar: 'العبارة التالية',
    tl: 'Susunod na Parirala',
  },
};

const getModalText = (key: keyof typeof MODAL_I18N, lang: SupportedLanguage): string => {
  return MODAL_I18N[key]?.[lang] || MODAL_I18N[key]?.en || '';
};

// ----------------------------------------------------------------------------
// Localized Content Retrieval Resolvers
// ----------------------------------------------------------------------------
function getDialogueLineTranslation(line: BusinessLessonDialogueLine, lang: SupportedLanguage): string {
  if (lang === 'ja') return line.japanese;
  if (lang === 'en') return line.english;
  if (lang === 'my' && line.myanmar) return line.myanmar;

  const scenario = getLocalizedScenarioLine(line.id, lang, '');
  if (scenario) return scenario;

  const translated = translateExampleSentence(line.japanese, line.english, lang);
  if (translated && translated !== line.english) return translated;

  return line.english;
}

function getVocabMeaningTranslation(v: BusinessLessonVocabItem, lang: SupportedLanguage): string {
  if (lang === 'ja') return v.reading || v.word;
  if (lang === 'en') return v.meaningEn;
  if (lang === 'my' && v.meaningMy) return v.meaningMy;

  const match = getLocalizedBusinessVocabMeaning(v.word, '', lang);
  if (match) return match;

  const translated = translateExampleSentence(v.word, v.meaningEn, lang);
  if (translated && translated !== v.meaningEn) return translated;

  return v.meaningEn;
}

export const BusinessLessonModal: React.FC<BusinessLessonModalProps> = ({
  lesson,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
  onSelectNextLesson,
  onSelectPrevLesson,
  hasNextLesson,
  hasPrevLesson,
  onOpenStudioTab,
}) => {
  const { profile, addXP, logActivity } = useUser();
  const { language } = useI18n();
  const activeLang = ((profile.translationLanguage || language || 'en') as SupportedLanguage);
  const { openKeyboard, registerActiveInput } = useJapaneseKeyboard();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'dialogue' | 'vocab' | 'grammar' | 'quiz' | 'typing'
  >('overview');

  // Translation Reveal Overrides (when translation is turned off)
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Quiz State
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Typing practice state
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const typingInputRef = useRef<HTMLInputElement>(null);

  // Reset tab and states when lesson changes
  useEffect(() => {
    setActiveTab('overview');
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
    setActivePhraseIndex(0);
    setTypedInput('');
  }, [lesson?.id]);

  // Register typing input to Japanese Virtual Keyboard
  useEffect(() => {
    if (activeTab === 'typing' && typingInputRef.current) {
      registerActiveInput(typingInputRef.current);
    }
  }, [activeTab, registerActiveInput]);

  if (!isOpen || !lesson) return null;

  const detail: BusinessLessonDetail = getBusinessLessonDetail(lesson);
  const currentPhrase = detail.typingPracticePhrases[activePhraseIndex] || {
    phraseJp: '承知いたしました。',
    reading: 'しょうちいたしました。',
    meaningEn: 'Understood.',
  };

  const isTypingExactMatch =
    typedInput.trim() === currentPhrase.phraseJp ||
    typedInput.trim() === currentPhrase.reading ||
    typedInput.trim() === currentPhrase.phraseJp.replace(/[。、]/g, '');

  const handleCompleteLessonWithReward = () => {
    if (!isCompleted) {
      onToggleComplete(lesson.id);
      addXP(50, `Completed Business Lesson: ${lesson.titleJp}`);
      logActivity('practice', 2);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}
    } else {
      onToggleComplete(lesson.id);
    }
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckQuiz = () => {
    if (quizSubmitted) return;
    setQuizSubmitted(true);

    let allCorrect = true;
    detail.quiz.forEach((q) => {
      const isCor = selectedQuizAnswers[q.id] === q.correctAnswer;
      if (!isCor) {
        allCorrect = false;
        SessionPersistenceService.recordMistake(
          adaptBusinessLessonQuizItem(q),
          selectedQuizAnswers[q.id] !== undefined ? q.options[selectedQuizAnswers[q.id]] : '(No answer)',
          q.options[q.correctAnswer] || String(q.correctAnswer)
        );
      }
    });

    if (allCorrect && detail.quiz.length > 0) {
      addXP(25, 'Perfect Business Etiquette Quiz Score!');
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch (e) {}
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
  };

  const localizedLesson = getLocalizedBusinessLesson(lesson, activeLang);

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: getModalText('tabOverview', activeLang), icon: <BookOpen size={15} /> },
    { id: 'dialogue', label: getModalText('tabDialogue', activeLang), icon: <MessageSquare size={15} /> },
    { id: 'vocab', label: getModalText('tabVocab', activeLang), icon: <Award size={15} /> },
    { id: 'grammar', label: getModalText('tabGrammar', activeLang), icon: <ShieldCheck size={15} /> },
    { id: 'quiz', label: getModalText('tabQuiz', activeLang), icon: <HelpCircle size={15} /> },
    { id: 'typing', label: getModalText('tabTyping', activeLang), icon: <Keyboard size={15} /> },
  ];

  const langBadge = activeLang.toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[94vh] sm:h-auto sm:max-h-[92vh]">
        {/* ================================================================= */}
        {/* HEADER BAR */}
        {/* ================================================================= */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between gap-2.5 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-sm ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {isCompleted ? <CheckCircle2 size={18} className="sm:w-[22px] sm:h-[22px]" /> : `L${lesson.lessonNumber}`}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase truncate max-w-[110px] sm:max-w-none">
                  {getModalText('lessonNum', activeLang)} {lesson.lessonNumber}
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-[9px] sm:text-[10px] font-bold font-mono shrink-0">
                  JLPT {lesson.prerequisiteJpLevel}
                </span>
                <span className="text-slate-400 text-xs hidden xs:inline">•</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 hidden xs:flex items-center gap-1 shrink-0">
                  <Clock size={11} /> {lesson.estimatedMinutes} {getModalText('mins', activeLang)}
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white truncate font-japanese">
                {lesson.titleJp}
              </h2>
              <p className={`text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                {localizedLesson?.title || lesson.titleEn}
                {activeLang !== 'en' && activeLang !== 'ja' && lesson.titleEn ? ` (${lesson.titleEn})` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <TranslationToggleButton size="sm" />

            <button
              type="button"
              onClick={handleCompleteLessonWithReward}
              className={`hidden sm:flex px-3 py-1.5 rounded-xl text-xs font-bold transition-all items-center gap-1.5 cursor-pointer shadow-sm ${
                isCompleted
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>{isCompleted ? getModalText('completed', activeLang) : getModalText('markDone', activeLang)}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* TABS NAVIGATION */}
        {/* ================================================================= */}
        <div className="px-3 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none shrink-0">
          {tabs.map((tab) => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* TAB BODY (SCROLLABLE) */}
        {/* ================================================================= */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-6">
          {/* TAB 1: OVERVIEW & RULES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Situation Briefing Card */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 dark:text-indigo-300">
                    {getModalText('scenarioContext', activeLang)}
                  </span>
                  <AudioButton text={lesson.titleJp} size="sm" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-japanese">
                  {lesson.titleJp}
                </h3>
                <p className={`text-xs text-slate-700 dark:text-slate-300 leading-relaxed ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                  {localizedLesson?.scenarioOverview || detail.scenarioOverview}
                </p>
                <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-indigo-100/80 dark:border-indigo-900/40">
                  🏢 <strong>{getModalText('environment', activeLang)}</strong>{' '}
                  <span className={activeLang === 'my' ? 'font-myanmar' : ''}>
                    {localizedLesson?.officeContext || detail.officeContext}
                  </span>
                </div>
              </div>

              {/* 3 Golden Etiquette Rules */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>{getModalText('keyEtiquetteRules', activeLang)}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(localizedLesson?.etiquetteRules && localizedLesson.etiquetteRules.length > 0
                    ? localizedLesson.etiquetteRules
                    : detail.etiquetteRules
                  ).map((rule, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 ${activeLang === 'my' ? 'font-myanmar' : ''}`}
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Insight Callout */}
              {(localizedLesson?.culturalNote || lesson.culturalNote) && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1 text-xs">
                  <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <Lightbulb size={16} />
                    <span>{getModalText('culturalInsight', activeLang)}</span>
                  </div>
                  <p className={`text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                    {localizedLesson?.culturalNote || lesson.culturalNote}
                  </p>
                </div>
              )}

              {/* Studio Shortcut Banner */}
              {detail.studioShortcut && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                      Studio Practice
                    </span>
                    <p className="text-xs font-semibold text-white">
                      Practice this lesson interactively with our specialized tools!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenStudioTab && detail.studioShortcut) {
                        onClose();
                        onOpenStudioTab(detail.studioShortcut.tabId);
                      }
                    }}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <span>{detail.studioShortcut.buttonText}</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WORKPLACE DIALOGUE */}
          {activeTab === 'dialogue' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className={`text-xs text-slate-500 dark:text-slate-400 ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                  {getModalText('dialogueIntro', activeLang)}
                </span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {detail.dialogue.length} {getModalText('dialogueTurns', activeLang)}
                </span>
              </div>

              <div className="space-y-4">
                {detail.dialogue.map((line) => {
                  const translatedLine = getDialogueLineTranslation(line, activeLang);

                  return (
                    <div
                      key={line.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2.5 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold shrink-0">
                            {line.speaker}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono truncate">
                            {line.speakerRole}
                          </span>
                        </div>
                        <AudioButton text={line.japanese} size="sm" className="shrink-0" />
                      </div>

                      <div className="space-y-1">
                        <p className="font-japanese text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                          {line.japanese}
                        </p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-japanese">
                          {line.reading}
                        </p>
                      </div>

                      {profile.showTranslation !== false || revealedItems[line.id] ? (
                        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/50 space-y-1 text-xs">
                          {/* Primary Active Language Translation */}
                          {activeLang !== 'ja' && (
                            <p className={`text-slate-800 dark:text-slate-200 font-medium ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                              <span className="font-bold text-[10px] uppercase text-emerald-600 dark:text-emerald-400 mr-1.5">
                                {langBadge}
                              </span>
                              {translatedLine}
                            </p>
                          )}

                          {/* Secondary English Reference (if user chose another language) */}
                          {activeLang !== 'en' && activeLang !== 'ja' && line.english && (
                            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                              <span className="font-bold text-[10px] uppercase text-indigo-500 mr-1.5">EN</span>
                              {line.english}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="pt-1.5 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 italic">
                            {getModalText('immersionNotice', activeLang)}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleReveal(line.id)}
                            className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            <Eye size={12} />
                            <span>{getModalText('peekTranslation', activeLang)}</span>
                          </button>
                        </div>
                      )}

                      {line.note && (
                        <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-1.5 border border-amber-200/60 dark:border-amber-900/40">
                          <Lightbulb size={13} className="shrink-0 mt-0.5" />
                          <span>{line.note}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: KEY VOCABULARY */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {detail.vocabulary.map((v, idx) => {
                  const meaning = getVocabMeaningTranslation(v, activeLang);

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-lg font-black font-japanese text-slate-900 dark:text-white block">
                            {v.word}
                          </span>
                          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-japanese font-semibold">
                            {v.reading}
                          </span>
                        </div>
                        <AudioButton text={v.word} size="sm" />
                      </div>

                      <div className="text-xs space-y-1">
                        {profile.showTranslation !== false || revealedItems[`vocab-${idx}`] ? (
                          <>
                            {activeLang !== 'ja' && (
                              <p className={`font-bold text-slate-800 dark:text-slate-200 ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                                <span className="font-bold text-[10px] uppercase text-emerald-600 dark:text-emerald-400 mr-1.5">
                                  {langBadge}
                                </span>
                                {meaning}
                              </p>
                            )}

                            {activeLang !== 'en' && activeLang !== 'ja' && v.meaningEn && (
                              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                                <span className="font-bold text-[10px] uppercase text-indigo-500 mr-1.5">EN</span>
                                {v.meaningEn}
                              </p>
                            )}

                            <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                              💡 {v.nuance}
                            </p>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleReveal(`vocab-${idx}`)}
                            className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline cursor-pointer py-1"
                          >
                            <Eye size={12} />
                            <span>{getModalText('revealMeaning', activeLang)}</span>
                          </button>
                        )}
                      </div>

                      {v.exampleSentence && (
                        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between gap-2 text-xs font-japanese text-slate-700 dark:text-slate-300">
                          <span className="flex-1 min-w-0">{v.exampleSentence}</span>
                          <AudioButton text={v.exampleSentence} size="sm" className="shrink-0" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: KEIGO & GRAMMAR PATTERNS */}
          {activeTab === 'grammar' && (
            <div className="space-y-6">
              {detail.grammar.map((g, idx) => {
                const localizedGrammar = getLocalizedGrammarContent(g.pattern, g.meaningEn, g.usageRule);
                const meaning = localizedGrammar.meaningsByLang[activeLang] || (activeLang === 'my' && g.meaningMy ? g.meaningMy : g.meaningEn);
                const explanation = localizedGrammar.explanationsByLang[activeLang] || g.usageRule;

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-slate-900 dark:text-white font-japanese">
                        {g.pattern}
                      </span>
                      <AudioButton text={g.pattern} size="sm" />
                    </div>

                    <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 text-xs font-mono font-bold text-indigo-800 dark:text-indigo-300">
                      {getModalText('structure', activeLang)} {g.structure}
                    </div>

                    <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                      {profile.showTranslation !== false || revealedItems[`grammar-${idx}`] ? (
                        <>
                          <p className={activeLang === 'my' ? 'font-myanmar' : ''}>
                            <strong>{langBadge}:</strong> {meaning}
                          </p>
                          {activeLang !== 'en' && activeLang !== 'ja' && g.meaningEn && (
                            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                              <strong>EN:</strong> {g.meaningEn}
                            </p>
                          )}
                          <p className={`text-[11px] text-slate-600 dark:text-slate-400 ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                            <strong>{getModalText('rule', activeLang)}</strong> {explanation}
                          </p>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleReveal(`grammar-${idx}`)}
                          className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline cursor-pointer py-1"
                        >
                          <Eye size={12} />
                          <span>{getModalText('revealGrammar', activeLang)}</span>
                        </button>
                      )}
                    </div>

                    {g.comparison && (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5 text-xs">
                        <span className="font-bold text-amber-800 dark:text-amber-300 block text-[11px] uppercase">
                          ⚠️ Common Etiquette Pitfall
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg text-rose-800 dark:text-rose-300">
                            <span className="font-bold block">{getModalText('avoid', activeLang)}</span>
                            {g.comparison.incorrectOrRude}
                          </div>
                          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-emerald-800 dark:text-emerald-300">
                            <span className="font-bold block">{getModalText('use', activeLang)}</span>
                            {g.comparison.correctBusiness}
                          </div>
                        </div>
                        <p className={`text-[11px] text-slate-600 dark:text-slate-400 pt-1 ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                          {g.comparison.reason}
                        </p>
                      </div>
                    )}

                    {/* Examples */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold uppercase text-slate-400 block">
                        {getModalText('examples', activeLang)}
                      </span>
                      {g.examples.map((ex, eIdx) => {
                        const exTrans = activeLang === 'my' && ex.myanmar ? ex.myanmar : translateExampleSentence(ex.japanese, ex.english, activeLang);

                        return (
                          <div
                            key={eIdx}
                            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                          >
                            <div className="space-y-1 flex-1 min-w-0">
                              <p className="font-japanese font-bold text-slate-900 dark:text-white">
                                {ex.japanese}
                              </p>
                              <p className="text-[11px] text-slate-400 font-japanese">{ex.reading}</p>
                              {activeLang !== 'ja' && (
                                <p className={`text-slate-800 dark:text-slate-200 ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                                  <span className="font-bold text-[10px] uppercase text-emerald-600 dark:text-emerald-400 mr-1">
                                    {langBadge}:
                                  </span>
                                  {exTrans}
                                </p>
                              )}
                              {activeLang !== 'en' && activeLang !== 'ja' && ex.english && (
                                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                                  <span className="font-bold text-[10px] uppercase text-indigo-500 mr-1">EN:</span>
                                  {ex.english}
                                </p>
                              )}
                            </div>
                            <AudioButton text={ex.japanese} size="sm" className="shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 5: PRACTICE QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {getModalText('quizHeader', activeLang)} ({detail.quiz.length})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Test your understanding of in-group rules, proper cushion phrases, and business honorifics.
                  </p>
                </div>
                {quizSubmitted && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>{getModalText('retakeQuiz', activeLang)}</span>
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {detail.quiz.map((q, qIdx) => {
                  const selected = selectedQuizAnswers[q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = selected === q.correctAnswer;
                  const prompt = activeLang === 'my' && q.promptMy ? q.promptMy : q.promptEn;
                  const explanation = activeLang === 'my' && q.explanationMy ? q.explanationMy : q.explanation;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white font-japanese">
                          {qIdx + 1}. {q.promptJp}
                        </h4>
                        <AudioButton text={q.promptJp} size="sm" />
                      </div>
                      <p className={`text-xs text-slate-500 dark:text-slate-400 ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                        {prompt}
                        {activeLang !== 'en' && activeLang !== 'ja' && q.promptEn && prompt !== q.promptEn ? ` (${q.promptEn})` : ''}
                      </p>

                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isThisSelected = selected === optIdx;

                          let btnStyle =
                            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

                          if (quizSubmitted) {
                            if (optIdx === q.correctAnswer) {
                              btnStyle =
                                'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                            } else if (isThisSelected && !isCorrect) {
                              btnStyle =
                                'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                            }
                          } else if (isThisSelected) {
                            btnStyle =
                              'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`p-3 rounded-xl border text-left text-xs font-japanese transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctAnswer && (
                                <Check size={16} className="text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div
                          className={`p-3 rounded-xl text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40'
                              : 'bg-rose-50/80 dark:bg-rose-950/30 text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40'
                          } ${activeLang === 'my' ? 'font-myanmar' : ''}`}
                        >
                          <span className="font-bold block mb-0.5">
                            {isCorrect ? getModalText('correct', activeLang) : getModalText('incorrect', activeLang)}
                          </span>
                          {explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCheckQuiz}
                    disabled={Object.keys(selectedQuizAnswers).length === 0}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {getModalText('submitAnswers', activeLang)}
                  </button>
                </div>
              ) : (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>{getModalText('retakeQuiz', activeLang)}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: IN-APP JAPANESE KEYBOARD TYPING PRACTICE */}
          {activeTab === 'typing' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300">
                    {getModalText('tabTyping', activeLang)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {detail.typingPracticePhrases.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActivePhraseIndex(idx);
                          setTypedInput('');
                        }}
                        className={`w-6 h-6 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          activePhraseIndex === idx
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-lg sm:text-2xl font-black font-japanese text-slate-900 dark:text-white block">
                      {currentPhrase.phraseJp}
                    </span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-japanese font-semibold">
                      {currentPhrase.reading}
                    </span>
                    <p className={`text-xs text-slate-500 mt-1 ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                      {activeLang === 'my' && currentPhrase.meaningMy
                        ? currentPhrase.meaningMy
                        : translateExampleSentence(currentPhrase.phraseJp, currentPhrase.meaningEn, activeLang)}
                      {activeLang !== 'en' && activeLang !== 'ja' && currentPhrase.meaningEn ? ` (${currentPhrase.meaningEn})` : ''}
                    </p>
                  </div>
                  <AudioButton text={currentPhrase.phraseJp} size="md" className="shrink-0" />
                </div>

                {/* Typing Input with Virtual Keyboard Trigger */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {getModalText('typingInstruction', activeLang)}
                    </label>
                    <button
                      type="button"
                      onClick={() => openKeyboard()}
                      className="px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Keyboard size={14} />
                      <span>{getModalText('japaneseKeyboard', activeLang)}</span>
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      ref={typingInputRef}
                      type="text"
                      value={typedInput}
                      onChange={(e) => setTypedInput(e.target.value)}
                      placeholder="ここに入力してください (Type here)..."
                      className={`w-full px-4 py-3 text-base rounded-xl font-japanese border outline-none transition-all ${
                        isTypingExactMatch
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-100'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-indigo-500'
                      }`}
                    />

                    {isTypingExactMatch && (
                      <span className="absolute right-3 top-3 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs animate-bounce">
                        <Check size={13} />
                        <span>{getModalText('typingMatched', activeLang)}</span>
                      </span>
                    )}
                  </div>
                </div>

                {isTypingExactMatch && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200 animate-fade-in">
                    <span className={activeLang === 'my' ? 'font-myanmar' : ''}>
                      {getModalText('typingReward', activeLang)}
                    </span>
                    {activePhraseIndex + 1 < detail.typingPracticePhrases.length && (
                      <button
                        type="button"
                        onClick={() => {
                          setActivePhraseIndex((prev) => prev + 1);
                          setTypedInput('');
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <span>{getModalText('nextPhrase', activeLang)}</span>
                        <ChevronRight size={13} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* FOOTER BAR (NAVIGATION & COMPLETION) */}
        {/* ================================================================= */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/80 backdrop-blur-xs flex items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={onSelectPrevLesson}
            disabled={!hasPrevLesson}
            title={getModalText('prevLesson', activeLang)}
            className="px-2.5 sm:px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <ChevronLeft size={16} className="shrink-0" />
            <span className="hidden xs:inline">{getModalText('prevLesson', activeLang)}</span>
          </button>

          <button
            type="button"
            onClick={handleCompleteLessonWithReward}
            className={`flex-1 min-w-0 max-w-sm mx-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink ${
              isCompleted
                ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'
            }`}
          >
            <CheckCircle2 size={16} className="shrink-0" />
            <span className={`truncate text-center ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
              {isCompleted
                ? `${getModalText('completed', activeLang)} (+50 XP)`
                : `${getModalText('markDone', activeLang)}`}
            </span>
          </button>

          <button
            type="button"
            onClick={onSelectNextLesson}
            disabled={!hasNextLesson}
            title={getModalText('nextLesson', activeLang)}
            className="px-2.5 sm:px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <span className="hidden xs:inline">{getModalText('nextLesson', activeLang)}</span>
            <ChevronRight size={16} className="shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

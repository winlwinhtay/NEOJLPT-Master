// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) UNIT CARD COMPONENT
// Collapsible Unit Accordion with Lessons, Objectives & Cultural Notes
// Full Multilingual Support Across All 19 Supported Languages
// ============================================================================

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Languages,
  Eye,
  EyeOff,
} from 'lucide-react';
import { BusinessUnit, BusinessLesson } from '../../types/business';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';
import { SupportedLanguage } from '../../types/i18n';
import {
  getLocalizedBusinessUnit,
  getLocalizedBusinessLesson,
} from '../../data/translations/businessCurriculumI18n';
import { TranslationToggleButton } from '../common/TranslationToggleButton';

interface BusinessUnitCardProps {
  unit: BusinessUnit;
  completedLessonIds: string[];
  onToggleCompleteLesson: (lessonId: string) => void;
  onSelectPractice?: (lesson: BusinessLesson) => void;
}

const CARD_I18N: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  completed: {
    en: 'Completed',
    ja: '完了',
    my: 'ပြီးစီးပြီး',
    th: 'สำเร็จแล้ว',
    zh: '已完成',
    ko: '완료됨',
    es: 'Completado',
    fr: 'Terminé',
    vi: 'Đã hoàn thành',
    id: 'Selesai',
    de: 'Abgeschlossen',
    pt: 'Concluído',
    tr: 'Tamamlandı',
    nl: 'Voltooid',
    hi: 'पूर्ण',
    bn: 'সম্পন্ন',
    ms: 'Selesai',
    ar: 'مكتمل',
    tl: 'Nakumpleto',
  },
  studyLesson: {
    en: 'Study Lesson (学習)',
    ja: 'レッスン学習 (学習)',
    my: 'သင်ခန်းစာလေ့လာရန် (学習)',
    th: 'เริ่มเรียนบทเรียน (学習)',
    zh: '进入学习 (学習)',
    ko: '레슨 학습 (学習)',
    es: 'Estudiar lección (学習)',
    fr: 'Étudier la leçon (学習)',
    vi: 'Học bài (学習)',
    id: 'Mulai Belajar (学習)',
    de: 'Lektion lernen (学習)',
    pt: 'Estudar lição (学習)',
    tr: 'Dersi Çalış (学習)',
    nl: 'Les bestuderen (学習)',
    hi: 'पाठ सीखें (学習)',
    bn: 'পাঠ শিখুন (学習)',
    ms: 'Belajar Pelajaran (学習)',
    ar: 'بدء الدرس (学習)',
    tl: 'Pag-aralan ang Aralin (学習)',
  },
  learningOutcomes: {
    en: 'Learning Outcomes:',
    ja: '到達目標:',
    my: 'သင်ယူမှု ရလဒ်များ (Learning Outcomes):',
    th: 'ผลลัพธ์การเรียนรู้:',
    zh: '学习目标与成效:',
    ko: '학습 목표:',
    es: 'Resultados del aprendizaje:',
    fr: 'Objectifs d\'apprentissage :',
    vi: 'Mục tiêu bài học:',
    id: 'Target Pembelajaran:',
    de: 'Lernziele:',
    pt: 'Objetivos de Aprendizagem:',
    tr: 'Öğrenme Çıktıları:',
    nl: 'Leerdoelen:',
    hi: 'सीखने के परिणाम:',
    bn: 'শেখার ফলাফল:',
    ms: 'Hasil Pembelajaran:',
    ar: 'مخرجات التعلم:',
    tl: 'Mga Layunin sa Pagkatuto:',
  },
  culturalInsight: {
    en: 'Cultural Insight:',
    ja: 'ビジネスマナー解説:',
    my: 'လုပ်ငန်းခွင် ယဉ်ကျေးမှု (Cultural Insight):',
    th: 'เกร็ดวัฒนธรรมองค์กร:',
    zh: '职场文化与商业习惯:',
    ko: '비즈니스 매너 인사이트:',
    es: 'Perspectiva cultural:',
    fr: 'Aperçu culturel :',
    vi: 'Hiểu biết văn hóa công sở:',
    id: 'Wawasan Budaya Kerja:',
    de: 'Kulturelle Einblicke:',
    pt: 'Insight Cultural:',
    tr: 'İş Kültürü İpucu:',
    nl: 'Cultureel inzicht:',
    hi: 'सांस्कृतिक दृष्टिकोण:',
    bn: 'সাংস্কৃতিক দৃষ্টিভঙ্গি:',
    ms: 'Pandangan Budaya:',
    ar: 'لمحة ثقافية مهنية:',
    tl: 'Kabatirang Pangkultura:',
  },
  translationHidden: {
    en: 'Translation hidden',
    ja: '翻訳非表示',
    my: 'ဘာသာပြန် ပိတ်ထားသည်',
    th: 'ซ่อนคำแปล',
    zh: '翻译已隐藏',
    ko: '번역 숨김',
    es: 'Traducción oculta',
    fr: 'Traduction masquée',
    vi: 'Đã ẩn bản dịch',
    id: 'Terjemahan disembunyikan',
    de: 'Übersetzung ausgeblendet',
    pt: 'Tradução oculta',
    tr: 'Çeviri gizlendi',
    nl: 'Vertaling verborgen',
    hi: 'अनुवाद छुपाया गया',
    bn: 'অনুবাদ লুকানো',
    ms: 'Terjemahan disembunyikan',
    ar: 'الترجمة مخفية',
    tl: 'Nakatago ang salin',
  },
};

const getCardText = (key: keyof typeof CARD_I18N, lang: SupportedLanguage): string => {
  return CARD_I18N[key]?.[lang] || CARD_I18N[key]?.en || '';
};

export const BusinessUnitCard: React.FC<BusinessUnitCardProps> = ({
  unit,
  completedLessonIds,
  onToggleCompleteLesson,
  onSelectPractice,
}) => {
  const { profile } = useUser();
  const { language } = useI18n();
  const activeLang = ((profile.translationLanguage || language || 'en') as SupportedLanguage);
  const showTranslation = profile.showTranslation !== false;

  const [isExpanded, setIsExpanded] = useState(true);

  const completedInUnit = unit.lessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;
  const isUnitCompleted =
    unit.lessons.length > 0 && completedInUnit === unit.lessons.length;

  const localizedUnit = getLocalizedBusinessUnit(unit, activeLang);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
      {/* Unit Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm font-mono shrink-0 shadow-sm ${
              isUnitCompleted
                ? 'bg-emerald-500 text-white'
                : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50'
            }`}
          >
            {isUnitCompleted ? <CheckCircle2 size={20} className="sm:w-[22px] sm:h-[22px]" /> : `U${unit.unitNumber}`}
          </div>

          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Unit {unit.unitNumber}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {completedInUnit}/{unit.lessons.length} {getCardText('completed', activeLang)}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-japanese truncate">
              {unit.titleJp}
            </h3>
            {showTranslation ? (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className={`font-semibold text-slate-700 dark:text-slate-300 ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                  {localizedUnit.title}
                </span>
                {activeLang !== 'en' && activeLang !== 'ja' && unit.titleEn && (
                  <span className="text-slate-400">({unit.titleEn})</span>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 italic">
                {getCardText('translationHidden', activeLang)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expanded Lessons List */}
      {isExpanded && (
        <div className="px-5 pb-6 sm:px-6 space-y-4 border-t border-slate-100 dark:border-slate-800/80 pt-4">
          {showTranslation && (
            <p className={`text-xs text-slate-600 dark:text-slate-300 leading-relaxed ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
              {localizedUnit.description}
            </p>
          )}

          <div className="space-y-3">
            {unit.lessons.map((lesson) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              const localizedLesson = getLocalizedBusinessLesson(lesson, activeLang);

              return (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    isCompleted
                      ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => onToggleCompleteLesson(lesson.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 mt-0.5 cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                        }`}
                        title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {isCompleted && <CheckCircle2 size={16} />}
                      </button>

                      <div
                        onClick={() => onSelectPractice && onSelectPractice(lesson)}
                        className="cursor-pointer group flex-1 min-w-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                            Lesson {lesson.lessonNumber}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                            {lesson.prerequisiteJpLevel}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold font-japanese text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                          {lesson.titleJp}
                        </h4>
                        {showTranslation && (
                          <div className={`text-xs text-slate-600 dark:text-slate-400 truncate ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                            {localizedLesson.title}
                            {activeLang !== 'en' && activeLang !== 'ja' && lesson.titleEn && (
                              <span className="text-[11px] text-slate-400 ml-1.5 font-normal">
                                ({lesson.titleEn})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 self-stretch sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50 dark:border-slate-700/40">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
                        <Clock size={12} />
                        <span>{lesson.estimatedMinutes}m</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => onSelectPractice && onSelectPractice(lesson)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-indigo-200 dark:shadow-none transition-all cursor-pointer"
                      >
                        <BookOpen size={13} />
                        <span>{getCardText('studyLesson', activeLang)}</span>
                      </button>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  {localizedLesson.learningObjectives && localizedLesson.learningObjectives.length > 0 && showTranslation && (
                    <div className="pl-2 sm:pl-9 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {getCardText('learningOutcomes', activeLang)}
                      </span>
                      <ul className={`text-xs text-slate-600 dark:text-slate-300 space-y-0.5 list-disc list-inside ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                        {localizedLesson.learningObjectives.map((obj, oIdx) => (
                          <li key={oIdx}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Vocabulary Pills */}
                  {lesson.keyVocabulary && lesson.keyVocabulary.length > 0 && (
                    <div className="pl-2 sm:pl-9 flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Vocab:</span>
                      {lesson.keyVocabulary.map((vocab, vIdx) => (
                        <span
                          key={vIdx}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-japanese font-semibold text-slate-800 dark:text-slate-200"
                        >
                          {vocab}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Cultural Note */}
                  {localizedLesson.culturalNote && showTranslation && (
                    <div className={`ml-0 sm:ml-9 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                      💡 <strong>{getCardText('culturalInsight', activeLang)}</strong>{' '}
                      {localizedLesson.culturalNote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

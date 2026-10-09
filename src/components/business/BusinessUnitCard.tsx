// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) UNIT CARD COMPONENT
// Collapsible Unit Accordion with Lessons, Objectives & Cultural Notes
// Full Multilingual Support (Myanmar & English)
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

export const BusinessUnitCard: React.FC<BusinessUnitCardProps> = ({
  unit,
  completedLessonIds,
  onToggleCompleteLesson,
  onSelectPractice,
}) => {
  const { profile } = useUser();
  const { language } = useI18n();
  const activeLang = profile.translationLanguage || language || 'en';
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
        className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm font-mono shrink-0 shadow-sm ${
              isUnitCompleted
                ? 'bg-emerald-500 text-white'
                : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50'
            }`}
          >
            {isUnitCompleted ? <CheckCircle2 size={22} /> : `U${unit.unitNumber}`}
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Unit {unit.unitNumber}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {completedInUnit}/{unit.lessons.length} {activeLang === 'my' ? 'ပြီးစီးပြီး' : 'Completed'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-japanese">
              {unit.titleJp}
            </h3>
            {showTranslation ? (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 font-myanmar">
                  {localizedUnit.title}
                </span>
                {activeLang === 'my' && unit.titleEn && (
                  <span className="text-slate-400">({unit.titleEn})</span>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 italic">
                {activeLang === 'my' ? 'ဘာသာပြန် ပိတ်ထားသည်' : 'Translation hidden'}
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
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-myanmar">
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
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
                        className="cursor-pointer group flex-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                            Lesson {lesson.lessonNumber}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                            {lesson.prerequisiteJpLevel}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold font-japanese text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {lesson.titleJp}
                        </h4>
                        {showTranslation && (
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-myanmar">
                            {localizedLesson.title}
                            {activeLang === 'my' && lesson.titleEn && (
                              <span className="text-[11px] text-slate-400 ml-1.5 font-normal">
                                ({lesson.titleEn})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
                        <Clock size={12} />
                        <span>{lesson.estimatedMinutes}m</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => onSelectPractice && onSelectPractice(lesson)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-indigo-200 dark:shadow-none transition-all cursor-pointer font-myanmar"
                      >
                        <BookOpen size={13} />
                        <span>{activeLang === 'my' ? 'သင်ခန်းစာလေ့လာရန် (学習)' : 'Study Lesson (学習)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  {localizedLesson.learningObjectives && localizedLesson.learningObjectives.length > 0 && showTranslation && (
                    <div className="pl-9 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-myanmar">
                        {activeLang === 'my' ? 'သင်ယူမှု ရလဒ်များ (Learning Outcomes):' : 'Learning Outcomes:'}
                      </span>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5 list-disc list-inside font-myanmar">
                        {localizedLesson.learningObjectives.map((obj, oIdx) => (
                          <li key={oIdx}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Vocabulary Pills */}
                  {lesson.keyVocabulary && lesson.keyVocabulary.length > 0 && (
                    <div className="pl-9 flex items-center gap-1.5 flex-wrap pt-1">
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
                    <div className="ml-9 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-myanmar">
                      💡 <strong>{activeLang === 'my' ? 'လုပ်ငန်းခွင် ယဉ်ကျေးမှု (Cultural Insight):' : 'Cultural Insight:'}</strong>{' '}
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

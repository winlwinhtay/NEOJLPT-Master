import React, { useState } from 'react';
import {
  FileText,
  Eye,
  EyeOff,
  Languages,
  Volume2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { READING_DATA } from '../data/readingData';
import { RubyText } from '../components/common/RubyText';
import { AudioButton } from '../components/common/AudioButton';
import { ReadingLesson } from '../types';

export const ReadingView: React.FC = () => {
  const { activeLevel } = useApp();
  const { profile, logActivity } = useUser();
  const { t } = useI18n();

  const levelReadings = READING_DATA.filter((r) => r.level === activeLevel);
  const [selectedReading, setSelectedReading] = useState<ReadingLesson>(
    levelReadings[0] || READING_DATA[0]
  );

  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    logActivity('reading', 1);
  };

  const handleNextPassage = (passage: ReadingLesson) => {
    setSelectedReading(passage);
    setUserAnswers({});
    setIsSubmitted(false);
    setShowTranslation(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {t('reading.badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {activeLevel} {t('reading.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('reading.subtitle')}
          </p>
        </div>

        {/* Passage Selector Dropdown / Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {levelReadings.map((r) => (
            <button
              key={r.id}
              onClick={() => handleNextPassage(r)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedReading.id === r.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Reading Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Topic: {selectedReading.topic.replace('_', ' ')} • {selectedReading.length}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {selectedReading.title} ({selectedReading.titleEn})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Furigana Toggle */}
            <button
              type="button"
              onClick={() => setShowFurigana(!showFurigana)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                showFurigana
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {showFurigana ? <Eye size={14} /> : <EyeOff size={14} />}
              {t('reading.toggleFurigana')}: {showFurigana ? 'ON' : 'OFF'}
            </button>

            {/* Translation Toggle */}
            <button
              type="button"
              onClick={() => setShowTranslation(!showTranslation)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                showTranslation
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Languages size={14} />
              {t('reading.toggleTranslation')}: {showTranslation ? 'ON' : 'OFF'}
            </button>

            {/* Audio narration */}
            {selectedReading.audioScript && (
              <AudioButton text={selectedReading.audioScript} size="md" />
            )}
          </div>
        </div>

        {/* Japanese Passage Box */}
        <div className="p-6 rounded-2xl bg-amber-50/20 dark:bg-slate-950 border border-amber-100 dark:border-slate-800">
          <div className="font-japanese text-lg sm:text-xl text-slate-900 dark:text-slate-100 leading-loose whitespace-pre-line">
            <RubyText text={selectedReading.passage} forceFurigana={showFurigana} />
          </div>

          {/* Translation reveal */}
          {showTranslation && (
            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-fade-in">
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] block mb-1">
                {t('common.translation')}:
              </span>
              {selectedReading.translationEn}
            </div>
          )}
        </div>

        {/* Vocabulary Hints */}
        {selectedReading.vocabularyList && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} /> {t('reading.vocabHints')}:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedReading.vocabularyList.map((v, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2"
                >
                  <span className="font-bold font-japanese text-slate-900 dark:text-white">
                    {v.word}
                  </span>
                  <span className="text-slate-400 font-japanese text-[11px]">({v.reading})</span>
                  <span className="text-slate-600 dark:text-slate-300">— {v.meaning}</span>
                  <AudioButton text={v.word} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comprehension Questions */}
        <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('reading.questions')} ({selectedReading.questions.length})
          </h3>

          <div className="space-y-6">
            {selectedReading.questions.map((q, idx) => {
              const selected = userAnswers[q.id];
              const isCorrect = selected === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
                >
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {idx + 1}. {q.questionJp}
                  </h4>
                  {q.questionEn && (
                    <p className="text-xs text-slate-400 italic">{q.questionEn}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selected === optIdx;
                      let btnStyle =
                        'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200';

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle =
                            'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold';
                        } else if (isThisSelected && !isCorrect) {
                          btnStyle =
                            'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                        }
                      } else if (isThisSelected) {
                        btnStyle =
                          'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold shadow-sm';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">{t('common.explanation')}:</div>
                      <p className="text-slate-600 dark:text-slate-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length < selectedReading.questions.length}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all"
            >
              {t('common.submit')}
            </button>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 size={20} className="text-emerald-500" />
                Reading practice recorded! +30 XP
              </div>
              <button
                onClick={() => {
                  setShowTranslation(true);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                View Full Translation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

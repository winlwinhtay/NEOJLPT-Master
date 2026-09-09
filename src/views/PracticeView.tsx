import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Bookmark,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { AudioButton } from '../components/common/AudioButton';
import { StorageService } from '../services/storageService';
import { PracticeQuestion } from '../types/practice';

export const PracticeView: React.FC = () => {
  const { activeLevel } = useApp();
  const { logActivity, addXP } = useUser();
  const { t, language } = useI18n();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // User input states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [orderedTokens, setOrderedTokens] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreStats, setScoreStats] = useState({ correct: 0, total: 0 });

  const questions = useMemo(() => {
    return PRACTICE_QUESTIONS.filter((q) => {
      if (q.level !== activeLevel) return false;
      if (activeCategory !== 'all' && q.category !== activeCategory) return false;
      return true;
    });
  }, [activeLevel, activeCategory]);

  const currentQ: PracticeQuestion | undefined = questions[currentIndex] || questions[0];

  const handleFilterCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setOrderedTokens([]);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleSelectToken = (tokenIndex: number) => {
    if (isAnswered) return;
    if (!orderedTokens.includes(tokenIndex)) {
      setOrderedTokens((prev) => [...prev, tokenIndex]);
    }
  };

  const handleRemoveToken = (position: number) => {
    if (isAnswered) return;
    setOrderedTokens((prev) => prev.filter((_, idx) => idx !== position));
  };

  const handleCheckAnswer = () => {
    if (!currentQ || isAnswered) return;
    setIsAnswered(true);

    let isCorrect = false;
    if (currentQ.type === 'sentence_order') {
      const correctArr = currentQ.correctAnswer as number[];
      isCorrect = JSON.stringify(orderedTokens) === JSON.stringify(correctArr);
    } else {
      isCorrect = selectedOption === currentQ.correctAnswer;
    }

    setScoreStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      addXP(15, 'Correct Practice Answer');
    } else {
      // Save to recent mistakes
      StorageService.addMistake({
        id: currentQ.id,
        question: currentQ.promptJp,
        yourAnswer:
          currentQ.type === 'sentence_order'
            ? orderedTokens.map((i) => currentQ.options[i]).join(' ')
            : currentQ.options[selectedOption || 0] || '',
        correctAnswer:
          currentQ.type === 'sentence_order'
            ? (currentQ.correctAnswer as number[]).map((i) => currentQ.options[i]).join(' ')
            : currentQ.options[currentQ.correctAnswer as number] || '',
        explanation: currentQ.explanation,
        category: currentQ.category,
      });
    }

    logActivity('practice', 1);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setOrderedTokens([]);
    setIsAnswered(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>No practice questions found for {activeLevel}.</p>
      </div>
    );
  }

  const isSentenceOrder = currentQ.type === 'sentence_order';
  const isCorrect = isSentenceOrder
    ? JSON.stringify(orderedTokens) === JSON.stringify(currentQ.correctAnswer)
    : selectedOption === currentQ.correctAnswer;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            {t('practice.badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {activeLevel} {t('practice.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Question {currentIndex + 1} of {questions.length} • {t('dashboard.practiceAccuracy')}:{' '}
            {scoreStats.total > 0
              ? `${Math.round((scoreStats.correct / scoreStats.total) * 100)}%`
              : '—'}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'vocabulary', 'kanji', 'grammar', 'reading', 'sentence_order'] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => handleFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 capitalize ${
                  activeCategory === cat
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat === 'all' ? t('common.all') : cat.replace('_', ' ')}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Question Header & Category */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-black uppercase">
            {currentQ.category}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Question {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Prompt */}
        <div className="space-y-2">
          <div className="text-xl sm:text-2xl font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
            {currentQ.promptJp}
          </div>
          {currentQ.promptEn && (
            <div className="text-xs text-slate-500 dark:text-slate-400 italic">
              {currentQ.promptEn}
            </div>
          )}
        </div>

        {/* Sentence Order Interactive Tokens */}
        {isSentenceOrder ? (
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 min-h-[64px] flex flex-wrap items-center gap-2">
              {orderedTokens.length === 0 && (
                <span className="text-xs text-slate-400 italic">
                  {t('practice.orderSentencePrompt')}
                </span>
              )}
              {orderedTokens.map((optIdx, pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => handleRemoveToken(pos)}
                  disabled={isAnswered}
                  className="px-3.5 py-2 rounded-xl bg-brand-500 text-white font-japanese font-bold text-sm shadow-sm flex items-center gap-1.5 group"
                >
                  <span>{currentQ.options[optIdx]}</span>
                  {!isAnswered && (
                    <span className="text-xs opacity-70 group-hover:opacity-100">✕</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = orderedTokens.includes(optIdx);
                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isSelected || isAnswered}
                    onClick={() => handleSelectToken(optIdx)}
                    className={`px-4 py-2.5 rounded-2xl border text-sm font-japanese font-bold transition-all ${
                      isSelected
                        ? 'opacity-30 border-dashed border-slate-300 dark:border-slate-700 bg-transparent'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-brand-500 hover:scale-105 shadow-sm'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Multiple Choice Options */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              let style =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-500';

              if (isAnswered) {
                if (optIdx === currentQ.correctAnswer) {
                  style =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  style =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold';
                }
              } else if (isSelected) {
                style =
                  'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold shadow-sm';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all ${style}`}
                >
                  <span className="font-bold mr-2 text-slate-400">{optIdx + 1}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Detailed Explanation revealed after answering */}
        {isAnswered && (
          <div
            className={`p-5 rounded-2xl border text-xs space-y-2 animate-fade-in ${
              isCorrect
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-500" /> {t('common.correct')} (+15 XP)
                </>
              ) : (
                <>
                  <AlertCircle size={18} className="text-rose-500" /> {t('common.incorrect')}
                </>
              )}
            </div>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              <strong>{t('common.explanation')}:</strong> {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        {!isAnswered ? (
          <button
            type="button"
            onClick={handleCheckAnswer}
            disabled={
              isSentenceOrder
                ? orderedTokens.length !== currentQ.options.length
                : selectedOption === null
            }
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition-all"
          >
            {t('practice.checkAnswer')}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {t('practice.nextQuestion')} <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

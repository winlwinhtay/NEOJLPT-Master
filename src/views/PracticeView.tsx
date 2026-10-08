import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Flag,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSRS } from '../context/SRSContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { ReportIssueModal } from '../components/common/ReportIssueModal';
import { TranslationToggleButton } from '../components/common/TranslationToggleButton';
import { PracticeQuestion } from '../types/practice';
import { adaptPracticeQuestions } from '../session/adapters/practiceAdapter';
import { useLearningSession } from '../session/hooks/useLearningSession';
import { SessionResultModal } from '../session/components/SessionResultModal';

export const PracticeView: React.FC = () => {
  const { activeLevel } = useApp();
  const { rateItem } = useSRS();
  const { profile } = useUser();
  const { t } = useI18n();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [srsAdded, setSrsAdded] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  // Filter raw practice questions based on activeLevel and activeCategory
  const rawQuestions = useMemo(() => {
    return PRACTICE_QUESTIONS.filter((q) => {
      if (q.level !== activeLevel) return false;
      if (activeCategory !== 'all' && q.category !== activeCategory) return false;
      return true;
    });
  }, [activeLevel, activeCategory]);

  // Convert to normalized SessionQuestion[]
  const sessionQuestions = useMemo(() => {
    return adaptPracticeQuestions(rawQuestions);
  }, [rawQuestions]);

  // Initialize Shared Session Engine
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    isAnswered,
    isCompleted,
    isSubmitting,
    isAdvancing,
    selectedAnswer,
    currentAnswerRecord,
    correctCount,
    answeredCount,
    accuracyPercentage,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    restartSession,
    result,
  } = useLearningSession({
    sessionId: `practice-${activeLevel}-${activeCategory}`,
    mode: 'practice',
    questions: sessionQuestions,
    instantFeedback: true,
    xpPerCorrect: 15,
    completionBonusXP: 30,
    activityCategory: 'practice',
  });

  const handleFilterCategory = (cat: string) => {
    setActiveCategory(cat);
    setSrsAdded(false);
  };

  const handleAddToSRS = () => {
    if (!currentQuestion) return;
    const cat = currentQuestion.category;
    const itemType = cat === 'kanji' ? 'kanji' : cat === 'grammar' ? 'grammar' : 'vocab';
    rateItem(currentQuestion.id, itemType, currentQuestion.level || activeLevel, 'again');
    setSrsAdded(true);
  };

  const isSentenceOrder = currentQuestion.type === 'sentence_order';
  const orderedTokens: number[] = Array.isArray(selectedAnswer) ? selectedAnswer : [];

  const handleSelectToken = (tokenIndex: number) => {
    if (isAnswered) return;
    if (!orderedTokens.includes(tokenIndex)) {
      selectAnswer([...orderedTokens, tokenIndex]);
    }
  };

  const handleRemoveToken = (position: number) => {
    if (isAnswered) return;
    selectAnswer(orderedTokens.filter((_, idx) => idx !== position));
  };

  const isCorrect = currentAnswerRecord ? currentAnswerRecord.isCorrect : false;

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
            Question {currentIndex + 1} of {totalQuestions} • {t('dashboard.practiceAccuracy')}:{' '}
            {answeredCount > 0 ? `${accuracyPercentage}% (${correctCount}/${answeredCount})` : '—'}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'vocabulary', 'kanji', 'grammar', 'particle_drill', 'keigo_simulator', 'reading', 'sentence_order'] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => handleFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 capitalize cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat === 'all'
                  ? t('common.all')
                  : cat === 'particle_drill'
                  ? '⚡ Particle Drill'
                  : cat === 'keigo_simulator'
                  ? '⛩️ Keigo Simulator'
                  : cat.replace('_', ' ')}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Question Header & Category */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-black uppercase">
              {(currentQuestion.category || 'Practice').replace('_', ' ')}
            </span>
            {currentQuestion.metadata?.relatedGrammarId && (
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold flex items-center gap-1">
                <Sparkles size={10} /> {currentQuestion.metadata.relatedGrammarId}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <TranslationToggleButton size="sm" />
            <button
              type="button"
              onClick={() => setIsReporting(true)}
              className="text-xs font-semibold text-slate-400 hover:text-amber-500 flex items-center gap-1 transition-colors cursor-pointer"
              title="Report question mistake or suggestion"
            >
              <Flag size={13} />
              <span>Report</span>
            </button>
            <span className="text-xs text-slate-400 font-medium">
              Question {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Prompt */}
        <div className="space-y-2">
          <div className="text-xl sm:text-2xl font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
            {currentQuestion.prompt}
          </div>
          {profile.showTranslation !== false && currentQuestion.promptSub && (
            <div className="text-xs text-slate-500 dark:text-slate-400 italic">
              {currentQuestion.promptSub}
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
                  className="px-3.5 py-2 rounded-xl bg-brand-500 text-white font-japanese font-bold text-sm shadow-sm flex items-center gap-1.5 group cursor-pointer disabled:cursor-default"
                >
                  <span>{currentQuestion.options[optIdx]}</span>
                  {!isAnswered && (
                    <span className="text-xs opacity-70 group-hover:opacity-100">✕</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = orderedTokens.includes(optIdx);
                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isSelected || isAnswered}
                    onClick={() => handleSelectToken(optIdx)}
                    className={`px-4 py-2.5 rounded-2xl border text-sm font-japanese font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'opacity-30 border-dashed border-slate-300 dark:border-slate-700 bg-transparent cursor-default'
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
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              let style =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-500';

              if (isAnswered) {
                if (optIdx === currentQuestion.correctAnswer) {
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
                  disabled={isAnswered || isSubmitting}
                  onClick={() => selectAnswer(optIdx)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all cursor-pointer disabled:cursor-default ${style}`}
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
              <strong>{t('common.explanation')}:</strong> {currentQuestion.explanation}
            </p>

            {!isCorrect && (
              <div className="pt-2">
                <button
                  type="button"
                  disabled={srsAdded}
                  onClick={handleAddToSRS}
                  className="px-3.5 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/60 dark:hover:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <Layers size={14} />
                  {srsAdded ? '✅ Added to Daily SRS Review!' : 'Add Question to Daily SRS Practice'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progression Action Buttons */}
        {!isAnswered ? (
          <button
            type="button"
            onClick={submitAnswer}
            disabled={
              isSubmitting ||
              (isSentenceOrder
                ? orderedTokens.length !== currentQuestion.options.length
                : selectedAnswer === null)
            }
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Evaluating...' : t('practice.checkAnswer')}
          </button>
        ) : (
          <button
            type="button"
            onClick={nextQuestion}
            disabled={isAdvancing}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {currentIndex >= totalQuestions - 1 ? (
              <>Finish Session & View Results <ArrowRight size={18} /></>
            ) : (
              <>{t('practice.nextQuestion')} <ArrowRight size={18} /></>
            )}
          </button>
        )}
      </div>

      {/* Session Result Modal */}
      <SessionResultModal
        isOpen={isCompleted}
        result={result}
        onRetry={() => {
          restartSession();
          setSrsAdded(false);
        }}
        onClose={() => {
          restartSession();
          setSrsAdded(false);
        }}
        title={`${activeLevel} Practice Session Complete`}
      />

      {isReporting && currentQuestion && (
        <ReportIssueModal
          isOpen={isReporting}
          onClose={() => setIsReporting(false)}
          contentId={currentQuestion.id}
          module="questions"
          level={currentQuestion.level || activeLevel}
          currentText={currentQuestion.prompt}
        />
      )}
    </div>
  );
};

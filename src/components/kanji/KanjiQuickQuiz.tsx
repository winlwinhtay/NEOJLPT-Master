import React, { useMemo } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { KanjiItem } from '../../types';
import { KanjiQuizQuestion } from '../../types/kanjiStroke';
import { adaptKanjiQuizQuestions } from '../../session/adapters/kanjiAdapter';
import { useLearningSession } from '../../session/hooks/useLearningSession';

interface KanjiQuickQuizProps {
  kanji: KanjiItem;
  onQuizComplete?: (scorePercentage: number) => void;
  onClose?: () => void;
}

export const KanjiQuickQuiz: React.FC<KanjiQuickQuizProps> = ({
  kanji,
  onQuizComplete,
  onClose,
}) => {
  // Deterministically generate 5 authentic non-AI quiz questions from the Kanji's data
  const rawQuestions: KanjiQuizQuestion[] = useMemo(() => {
    const vocab = kanji.exampleVocab?.[0] || {
      word: `${kanji.kanji}字`,
      reading: 'じ',
      meaning: kanji.meaning,
    };
    const vocab2 = kanji.exampleVocab?.[1] || vocab;
    const stroke = kanji.strokeCount;

    return [
      // 1. Meaning
      {
        id: `q-meaning-${kanji.id}`,
        type: 'meaning',
        question: `What is the primary English meaning of 「${kanji.kanji}」?`,
        options: [
          kanji.meaning,
          'to travel / journey',
          'heavy / important',
          'to buy / purchase',
        ],
        correctAnswer: 0,
        explanation: `「${kanji.kanji}」primarily carries the meaning "${kanji.meaning}".`,
      },
      // 2. Reading
      {
        id: `q-reading-${kanji.id}`,
        type: 'reading',
        question: `How is the compound word 「${vocab.word}」read?`,
        options: [
          vocab.reading,
          `${vocab.reading.slice(0, 1)}ゃ`,
          `${vocab.reading}り`,
          'むかし',
        ],
        correctAnswer: 0,
        explanation: `「${vocab.word}」is read as "${vocab.reading}" (${vocab.meaning}).`,
      },
      // 3. Recognition
      {
        id: `q-recog-${kanji.id}`,
        type: 'recognition',
        question: `Which Kanji represents "${kanji.meaning}"?`,
        options: [kanji.kanji, '木', '金', '話'],
        correctAnswer: 0,
        explanation: `「${kanji.kanji}」is the character corresponding to "${kanji.meaning}".`,
      },
      // 4. Stroke Count
      {
        id: `q-strokes-${kanji.id}`,
        type: 'strokeCount',
        question: `How many strokes does 「${kanji.kanji}」have?`,
        options: [
          `${stroke} strokes`,
          `${Math.max(1, stroke - 2)} strokes`,
          `${stroke + 1} strokes`,
          `${stroke + 3} strokes`,
        ],
        correctAnswer: 0,
        explanation: `According to standard Joyo Kanji stroke guidelines, 「${kanji.kanji}」consists of exactly ${stroke} strokes.`,
      },
      // 5. Vocabulary Usage
      {
        id: `q-vocab-${kanji.id}`,
        type: 'vocabulary',
        question: `What is the meaning of the vocabulary word 「${vocab2.word}」?`,
        options: [
          vocab2.meaning,
          'convenient / handy',
          'difficult / painful',
          'cheap / peaceful',
        ],
        correctAnswer: 0,
        explanation: `「${vocab2.word}」(${vocab2.reading}) means "${vocab2.meaning}".`,
      },
    ];
  }, [kanji]);

  const sessionQuestions = useMemo(() => {
    return adaptKanjiQuizQuestions(rawQuestions);
  }, [rawQuestions]);

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
    accuracyPercentage,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    restartSession,
    result,
  } = useLearningSession({
    sessionId: `kanji-${kanji.id}`,
    mode: 'mastery',
    questions: sessionQuestions,
    instantFeedback: true,
    autoSubmitOnSelect: false,
    xpPerCorrect: 15,
    completionBonusXP: 25,
    activityCategory: 'kanji',
    onComplete: (res) => {
      onQuizComplete?.(res.accuracyPercentage);
    },
  });

  const handleSelectOption = (idx: number) => {
    if (isAnswered || isSubmitting) return;
    selectAnswer(idx);
    submitAnswer();
  };

  const isPassed = accuracyPercentage >= 80;

  return (
    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <HelpCircle size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {kanji.kanji} Quick Mastery Quiz
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              5 questions testing meaning, reading, strokes, and context
            </p>
          </div>
        </div>

        {!isCompleted && (
          <span className="text-xs font-bold text-slate-400">
            {currentIndex + 1} of {totalQuestions}
          </span>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-4 animate-fade-in">
          {/* Question Text */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[10px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-1">
              Question {currentIndex + 1}
            </span>
            <div className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQuestion.prompt}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              const isCorrectAnswer = optIdx === currentQuestion.correctAnswer;

              let btnStyle =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-brand-500';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold';
                } else if (isSelected && !currentAnswerRecord?.isCorrect) {
                  btnStyle =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isAnswered || isSubmitting}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <span>
                    <span className="font-bold mr-2 text-slate-400">{optIdx + 1}.</span>
                    {opt}
                  </span>
                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 ml-1" />
                  )}
                  {isAnswered && isSelected && !currentAnswerRecord?.isCorrect && (
                    <XCircle size={16} className="text-rose-500 shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-2 animate-fade-in">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-brand-500" />
                Explanation:
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
              <div className="pt-2 text-right">
                <button
                  type="button"
                  disabled={isAdvancing}
                  onClick={nextQuestion}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <span>{currentIndex + 1 < totalQuestions ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center py-4 space-y-5 animate-fade-in">
          <div
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg ${
              isPassed
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/20'
                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 shadow-amber-500/20'
            }`}
          >
            <Award size={32} />
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Lesson Quiz Result
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Score: {accuracyPercentage}% ({correctCount}/{totalQuestions} Correct)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              {isPassed
                ? `Great job! You have demonstrated solid recognition and stroke accuracy for 「${kanji.kanji}」.`
                : `Keep practicing! Review the stroke order and readings, then retake the quiz.`}
            </p>
          </div>

          {/* Spaced Review Schedule Recommendation */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left space-y-2 max-w-sm mx-auto text-xs">
            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
              Spaced Repetition Schedule:
            </span>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
              <span>Next Review:</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">
                {isPassed ? '3 Days (Day 3 Stage)' : 'Tomorrow (Day 1 Stage)'}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={restartSession}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Retry Quiz</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Done with Lesson
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

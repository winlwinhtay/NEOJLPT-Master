import React, { useState, useMemo } from 'react';
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
import confetti from 'canvas-confetti';

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
  const questions: KanjiQuizQuestion[] = useMemo(() => {
    const vocab = kanji.exampleVocab?.[0] || {
      word: `${kanji.kanji}字`,
      reading: 'じ',
      meaning: kanji.meaning,
    };
    const vocab2 = kanji.exampleVocab?.[1] || vocab;

    const primaryReading = kanji.onyomi?.[0] || kanji.kunyomi?.[0] || '';
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const userChoice = currentQ ? selectedAnswers[currentQ.id] : undefined;

  const handleSelectOption = (idx: number) => {
    if (userChoice !== undefined) return;
    const nextAnswers = { ...selectedAnswers, [currentQ.id]: idx };
    setSelectedAnswers(nextAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      const correctCount = questions.filter(
        (q) => selectedAnswers[q.id] === q.correctAnswer
      ).length;
      const scorePct = Math.round((correctCount / totalQuestions) * 100);
      if (scorePct >= 80) {
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        } catch (e) {}
      }
      onQuizComplete?.(scorePct);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  // Calculate final score
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= 80;

  return (
    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <HelpCircle size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Quick Mastery Quiz: 「{kanji.kanji}」
            </h4>
            <p className="text-[11px] text-slate-400">
              5 Questions • Test your reading, meaning, recognition, and stroke count
            </p>
          </div>
        </div>

        {!isFinished && (
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
            {currentIndex + 1} of {totalQuestions}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-5">
          {/* Question Card */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Question {currentIndex + 1}: {currentQ.type.toUpperCase()}
            </span>
            <h5 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h5>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = userChoice === optIdx;
              const isCorrect = optIdx === currentQ.correctAnswer;
              let btnStyle =
                'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-brand-400';

              if (userChoice !== undefined) {
                if (isCorrect) {
                  btnStyle =
                    'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle =
                    'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800 dark:text-rose-300';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={userChoice !== undefined}
                  className={`p-3.5 rounded-2xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span>{option}</span>
                  {userChoice !== undefined && isCorrect && (
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  )}
                  {userChoice !== undefined && isSelected && !isCorrect && (
                    <XCircle size={16} className="text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {showExplanation && (
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-2 animate-fade-in">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-brand-500" />
                Explanation:
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all inline-flex items-center gap-1 cursor-pointer"
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
              Score: {scorePercent}% ({correctCount}/{totalQuestions} Correct)
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
              onClick={handleRestart}
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

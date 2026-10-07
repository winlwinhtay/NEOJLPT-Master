// ============================================================================
// KANJI CONFUSION STUDIO (漢字混同対策スタジオ)
// Side-by-Side Visual Discrimination, Radical Role Breakdown & Contextual Quiz
// ============================================================================

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Volume2,
  Eye,
  Layers,
  Lightbulb,
} from 'lucide-react';
import {
  KANJI_CONFUSION_PAIRS,
  KanjiConfusionPair,
} from '../../data/kanjiConfusionData';
import { AudioButton } from '../common/AudioButton';
import confetti from 'canvas-confetti';

export const KanjiConfusionStudio: React.FC = () => {
  const [selectedPairId, setSelectedPairId] = useState<string>(
    KANJI_CONFUSION_PAIRS[0].id
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const pair: KanjiConfusionPair =
    KANJI_CONFUSION_PAIRS.find((p) => p.id === selectedPairId) ||
    KANJI_CONFUSION_PAIRS[0];

  const handleSelectOption = (questionId: string, optionIdx: number, correctIdx: number) => {
    if (quizAnswers[questionId] !== undefined) return;

    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));

    if (optionIdx === correctIdx) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setShowExplanation({});
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
              Error-Based Learning
            </span>
            <span className="text-xs text-slate-400">• Visual & Semantic Contrast</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>似ている漢字の徹底比較 (Kanji Confusion Studio)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Master the subtle radical and stroke proportions that separate commonly confused Kanji pairs in the JLPT.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetQuiz}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <RotateCcw size={13} />
          <span>Reset Practice</span>
        </button>
      </div>

      {/* Confusion Pair Selector Carousel / Pills */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Select Confusion Pair ({KANJI_CONFUSION_PAIRS.length} Pairs)
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {KANJI_CONFUSION_PAIRS.map((p) => {
            const isSelected = p.id === pair.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedPairId(p.id);
                  handleResetQuiz();
                }}
                className={`px-3.5 py-2 rounded-2xl border text-left shrink-0 transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20 scale-102'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-400'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-japanese font-black text-base">{p.kanjiA}</span>
                  <span className={`text-xs ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>vs</span>
                  <span className="font-japanese font-black text-base">{p.kanjiB}</span>
                  <span
                    className={`ml-1.5 px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {p.level}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Character A Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-brand-200 dark:border-brand-900/40 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 flex items-center justify-center font-japanese text-5xl font-black text-brand-600 dark:text-brand-400 shadow-inner">
                {pair.kanjiA}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500">
                  Target Character A
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {pair.meaningA}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  音: <span className="font-semibold text-slate-700 dark:text-slate-300">{pair.onyomiA.join(', ')}</span> • 訓: <span className="font-semibold text-slate-700 dark:text-slate-300">{pair.kunyomiA.join(', ')}</span>
                </div>
              </div>
            </div>
            <AudioButton text={pair.kanjiA} />
          </div>

          {/* Radical & Etymology */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
              <span className="px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-japanese text-sm">
                {pair.radicalA.symbol}
              </span>
              <span>{pair.radicalA.name}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {pair.radicalA.role}
            </p>
          </div>

          {/* Useful Vocabulary */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Core Vocabulary with 「{pair.kanjiA}」
            </span>
            <div className="grid grid-cols-2 gap-2">
              {pair.vocabA.map((v, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="font-japanese font-bold text-xs text-slate-900 dark:text-white block">
                      {v.word}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{v.reading}</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-1">
                      {v.meaning}
                    </span>
                  </div>
                  <AudioButton text={v.word} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Character B Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-indigo-200 dark:border-indigo-900/40 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center font-japanese text-5xl font-black text-indigo-600 dark:text-indigo-400 shadow-inner">
                {pair.kanjiB}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                  Target Character B
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {pair.meaningB}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  音: <span className="font-semibold text-slate-700 dark:text-slate-300">{pair.onyomiB.join(', ')}</span> • 訓: <span className="font-semibold text-slate-700 dark:text-slate-300">{pair.kunyomiB.join(', ')}</span>
                </div>
              </div>
            </div>
            <AudioButton text={pair.kanjiB} />
          </div>

          {/* Radical & Etymology */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
              <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-japanese text-sm">
                {pair.radicalB.symbol}
              </span>
              <span>{pair.radicalB.name}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {pair.radicalB.role}
            </p>
          </div>

          {/* Useful Vocabulary */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Core Vocabulary with 「{pair.kanjiB}」
            </span>
            <div className="grid grid-cols-2 gap-2">
              {pair.vocabB.map((v, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="font-japanese font-bold text-xs text-slate-900 dark:text-white block">
                      {v.word}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{v.reading}</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-1">
                      {v.meaning}
                    </span>
                  </div>
                  <AudioButton text={v.word} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Linguistic Distinction Breakdown */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-brand-500/5 to-indigo-500/10 border border-amber-500/20 space-y-3">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
          <Lightbulb size={16} />
          <span>How to Never Confuse Them Again (見分け方の極意)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
          {pair.visualDifference}
        </p>
        <div className="pt-2 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div>
            <strong>Memory Mnemonic:</strong> {pair.etymologyOrMnemonic}
          </div>
        </div>
      </div>

      {/* Interactive Discrimination Quiz */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen size={18} className="text-brand-500" />
            <span>Target Discrimination Exercises (文脈テスト)</span>
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {Object.keys(quizAnswers).length} / {pair.practiceQuestions.length} Answered
          </span>
        </div>

        <div className="space-y-4">
          {pair.practiceQuestions.map((q, qIdx) => {
            const userAnswer = quizAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Question {qIdx + 1}
                  </span>
                  {isAnswered && (
                    <span
                      className={`text-xs font-bold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 size={14} /> 正解 (Correct!)
                        </>
                      ) : (
                        <>
                          <XCircle size={14} /> 不正解 (Incorrect)
                        </>
                      )}
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-japanese font-bold text-slate-900 dark:text-white">
                  {q.sentence}
                </p>

                {/* Option Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isRightOption = optIdx === q.correctIndex;

                    let btnStyle =
                      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-500';

                    if (isAnswered) {
                      if (isRightOption) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-sm';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500 text-white border-rose-500';
                      } else {
                        btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                        className={`p-3 rounded-xl border-2 font-japanese text-lg font-black transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 animate-fade-in flex items-start gap-2">
                    <HelpCircle size={15} className="text-brand-500 shrink-0 mt-0.5" />
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

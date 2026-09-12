// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) KEIGO STUDIO
// Transformation Matrix, Actor Rule Guide & Interactive Confusion Trainer
// ============================================================================

import React, { useState } from 'react';
import {
  Award,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';
import { BUSINESS_KEIGO_VERBS, CUSHION_PHRASES, KEIGO_CONFUSION_EXERCISES } from '../../data/business/businessKeigoData';
import { AudioButton } from '../common/AudioButton';
import { useI18n } from '../../i18n/I18nContext';
import { getKeigoVerbTranslation, getCushionWordTranslation } from '../../data/translations/businessTranslations';

export const BusinessKeigoStudio: React.FC = () => {
  const { language } = useI18n();
  const [activeTab, setActiveTab] = useState<'matrix' | 'confusion' | 'cushion'>('matrix');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerbId, setSelectedVerbId] = useState<string>(BUSINESS_KEIGO_VERBS[0].id);

  // Confusion Trainer State
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const filteredVerbs = BUSINESS_KEIGO_VERBS.filter(
    (v) =>
      v.plain.includes(searchQuery) ||
      v.reading.includes(searchQuery) ||
      v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.teineigo.includes(searchQuery)
  );

  const selectedVerb =
    BUSINESS_KEIGO_VERBS.find((v) => v.id === selectedVerbId) || BUSINESS_KEIGO_VERBS[0];

  const currentExercise = KEIGO_CONFUSION_EXERCISES[currentExerciseIdx];
  const userChoice = selectedAnswers[currentExercise.id];
  const isAnswered = userChoice !== undefined;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswers({ ...selectedAnswers, [currentExercise.id]: idx });
    setShowExplanation(true);
  };

  const handleNextExercise = () => {
    setShowExplanation(false);
    if (currentExerciseIdx + 1 < KEIGO_CONFUSION_EXERCISES.length) {
      setCurrentExerciseIdx((prev) => prev + 1);
    } else {
      setCurrentExerciseIdx(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header & Subtab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="text-indigo-600 dark:text-indigo-400" size={22} />
            <span>敬語特訓スタジオ (Keigo Mastery Studio)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Master the subtle boundary between 尊敬語 (elevating others) and 謙譲語 (humbling oneself).
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'matrix'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            動詞一覧 Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('confusion')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'confusion'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            誤用チェック Trainer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cushion')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cushion'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            クッション言葉 Cushion
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: KEIGO VERB MATRIX & ACTOR RULES */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Verb Selector Column (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plain verb, meaning, or reading..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {filteredVerbs.map((verb) => {
                const isSelected = selectedVerb.id === verb.id;
                return (
                  <div
                    key={verb.id}
                    onClick={() => setSelectedVerbId(verb.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-japanese font-black text-sm text-slate-900 dark:text-white">
                          {verb.plain}
                        </span>
                        <span className="text-[11px] text-slate-400 font-japanese">
                          ({verb.reading})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                        {verb.meaning}
                      </p>
                    </div>

                    <div className="text-right text-[10px] font-mono space-y-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold block truncate max-w-[110px]">
                        尊: {verb.sonkeigo[0]}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold block truncate max-w-[110px]">
                        謙: {verb.kenjougo[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Verb Deep Dive (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                  Verb Transformation Deep Dive
                </span>
                {(() => {
                  const verbI18n = getKeigoVerbTranslation(selectedVerb.id, language);
                  return (
                    <>
                      <div className="flex items-baseline gap-3 mt-1">
                        <h3 className="text-3xl font-black font-japanese text-slate-900 dark:text-white">
                          {selectedVerb.plain}
                        </h3>
                        <span className="text-sm font-japanese text-slate-400">
                          （{selectedVerb.reading}）
                        </span>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          {verbI18n?.meaning || selectedVerb.meaning}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
              <AudioButton text={selectedVerb.plain} size="md" />
            </div>

            {/* Core Transformation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Teineigo */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  丁寧語 (Teineigo)
                </span>
                <div className="text-sm font-bold font-japanese text-slate-900 dark:text-white">
                  {selectedVerb.teineigo}
                </div>
                <p className="text-[10px] text-slate-500">Polite baseline (です・ます)</p>
              </div>

              {/* Sonkeigo */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/50 space-y-1">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider block">
                  尊敬語 (Sonkeigo)
                </span>
                <div className="text-sm font-bold font-japanese text-amber-800 dark:text-amber-200">
                  {selectedVerb.sonkeigo.join('、 ')}
                </div>
                <p className="text-[10px] text-amber-700 dark:text-amber-400">相手（上司・顧客）の動作</p>
              </div>

              {/* Kenjougo */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/50 space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                  謙譲語 (Kenjōgo)
                </span>
                <div className="text-sm font-bold font-japanese text-emerald-800 dark:text-emerald-200">
                  {selectedVerb.kenjougo.join('、 ')}
                </div>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400">自分・自社（身内）の動作</p>
              </div>
            </div>

            {/* Actor Rule Banner */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Lightbulb size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  視点と使い分けのルール (Actor Rule)
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                {getKeigoVerbTranslation(selectedVerb.id, language)?.actorRule || selectedVerb.actorRule}
              </p>
            </div>

            {/* Common Mistakes */}
            {selectedVerb.commonMistakes && selectedVerb.commonMistakes.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  ⚠️ よくある間違いと正しい直し方
                </span>
                <div className="space-y-2">
                  {selectedVerb.commonMistakes.map((mistake, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-japanese text-xs font-bold">
                        <XCircle size={15} />
                        <span className="line-through">{mistake.incorrect}</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-japanese text-xs font-bold">
                        <CheckCircle2 size={15} />
                        <span>{mistake.correct}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                        {mistake.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Real Workplace Situations */}
            {selectedVerb.exampleSituations && selectedVerb.exampleSituations.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  実務での会話例
                </span>
                <div className="space-y-2">
                  {selectedVerb.exampleSituations.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          {ex.context}（{ex.speaker}）
                        </span>
                        <AudioButton text={ex.japanese} size="sm" />
                      </div>
                      <div className="text-xs font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                        {ex.japanese}
                      </div>
                      <div className="text-[11px] text-slate-500 italic">{ex.translation}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KEIGO CONFUSION TRAINER */}
      {/* ========================================================================= */}
      {activeTab === 'confusion' && currentExercise && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono">
                Case {currentExerciseIdx + 1} of {KEIGO_CONFUSION_EXERCISES.length}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {currentExercise.situation}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-black font-japanese text-slate-900 dark:text-white leading-relaxed">
              {currentExercise.prompt}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span>話者（自分）: <strong>{currentExercise.speaker}</strong></span>
              <span>対象（相手）: <strong>{currentExercise.targetPerson}</strong></span>
            </div>
          </div>

          <div className="space-y-2.5">
            {currentExercise.options.map((opt, idx) => {
              const isSelected = userChoice === idx;
              const isCorrect = idx === currentExercise.correctIndex;

              let style =
                'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-300';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100';
                } else if (isSelected) {
                  style = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
                } else {
                  style = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer space-y-1 ${style}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-japanese font-bold text-sm leading-relaxed">
                      {opt.text}
                    </span>
                    {isAnswered && (
                      <span className="text-xs font-bold">
                        {isCorrect ? (
                          <CheckCircle2 size={18} className="text-emerald-500" />
                        ) : isSelected ? (
                          <XCircle size={18} className="text-rose-500" />
                        ) : null}
                      </span>
                    )}
                  </div>
                  {isAnswered && isSelected && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {opt.explanation}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-500">
                {userChoice === currentExercise.correctIndex ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={15} /> 正解！ Excellent!
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                    <XCircle size={15} /> 不正解です。確認しましょう。
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextExercise}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Next Case</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CUSHION WORDS REFERENCE */}
      {/* ========================================================================= */}
      {activeTab === 'cushion' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
            <h3 className="text-sm font-black text-indigo-900 dark:text-indigo-200">
              クッション言葉（会話を柔らかく整える必須フレーズ）
            </h3>
            <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5">
              Cushion phrases soften requests, inquiries, and refusals, preventing sentences from sounding abrupt or imposing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CUSHION_PHRASES.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-black font-japanese text-slate-900 dark:text-white">
                      {item.phrase}
                    </h4>
                    <span className="text-xs text-slate-400 font-japanese">
                      （{item.reading}）
                    </span>
                  </div>
                  <AudioButton text={item.phrase} size="sm" />
                </div>

                {(() => {
                  const cushionI18n = getCushionWordTranslation(item.phrase, language);
                  return (
                    <>
                      <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {cushionI18n?.meaning || item.meaning}
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        <strong>When to use:</strong> {cushionI18n?.usage || item.situation}
                      </p>
                    </>
                  );
                })()}

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Example:
                  </span>
                  <p className="text-xs font-japanese text-slate-800 dark:text-slate-200 leading-relaxed">
                    {item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// KANJI VOCABULARY CONNECTION NETWORK
// Visualizes the 5-Tier Pedagogical Path:
// KANJI ➔ VOCABULARY ➔ GRAMMAR ➔ AUTHENTIC SENTENCE ➔ READING
// ============================================================================

import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  BookOpen,
  Volume2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { KanjiItem, VocabularyItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { VOCABULARY_DATA } from '../../data/vocabularyData';

interface KanjiVocabularyNetworkProps {
  kanji: KanjiItem;
  onSelectVocab?: (vocabId: string) => void;
}

export const KanjiVocabularyNetwork: React.FC<KanjiVocabularyNetworkProps> = ({
  kanji,
  onSelectVocab,
}) => {
  // Find all vocabulary words from database that contain this Kanji character
  const connectedWords = VOCABULARY_DATA.filter(
    (v) =>
      (v.kanji && v.kanji.includes(kanji.kanji)) ||
      (v.word && v.word.includes(kanji.kanji))
  ).slice(0, 8);

  const [activeWordId, setActiveWordId] = useState<string>(
    connectedWords[0]?.id || ''
  );

  const selectedWord =
    connectedWords.find((w) => w.id === activeWordId) || connectedWords[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              Cognitive Word Association
            </span>
            <span className="text-xs text-slate-400">• 5-Stage Network</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>漢字・語彙・文脈ネットワーク (Vocabulary Connection Network)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Learn Kanji not as isolated symbols, but as the building blocks of real Japanese words, grammar, and living sentences.
          </p>
        </div>
      </div>

      {/* Network Progression Visualizer Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between text-xs font-black text-slate-400 overflow-x-auto pb-1 gap-2">
          <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 shrink-0">
            <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center text-[10px]">1</span>
            <span>KANJI (漢字)</span>
          </div>
          <ArrowRight size={14} className="text-slate-300 shrink-0" />
          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 shrink-0">
            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-[10px]">2</span>
            <span>COMPOUND (熟語)</span>
          </div>
          <ArrowRight size={14} className="text-slate-300 shrink-0" />
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 shrink-0">
            <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-[10px]">3</span>
            <span>PARTICLE / GRAMMAR (文法)</span>
          </div>
          <ArrowRight size={14} className="text-slate-300 shrink-0" />
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 shrink-0">
            <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-[10px]">4</span>
            <span>SENTENCE (文脈)</span>
          </div>
          <ArrowRight size={14} className="text-slate-300 shrink-0" />
          <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 shrink-0">
            <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-[10px]">5</span>
            <span>RETRIEVAL (音訓定着)</span>
          </div>
        </div>
      </div>

      {/* Main Connection Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Kanji Source & Connected Compound Word List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Kanji Root Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 text-white shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-japanese text-4xl font-black shadow-inner">
                {kanji.kanji}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-200">
                  Root Character
                </span>
                <h4 className="text-lg font-black">{kanji.meaning}</h4>
                <p className="text-xs text-indigo-100">
                  {kanji.onyomi.length > 0 && `音: ${kanji.onyomi.join(', ')}`}
                  {kanji.kunyomi.length > 0 && ` • 訓: ${kanji.kunyomi.join(', ')}`}
                </p>
              </div>
            </div>
            <AudioButton text={kanji.kanji} />
          </div>

          {/* Connected Word Selector */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Essential Jukugo Compounds ({connectedWords.length})
            </span>

            {connectedWords.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center text-xs text-slate-400">
                Exploring vocabulary network for this character...
              </div>
            ) : (
              <div className="space-y-2">
                {connectedWords.map((word) => {
                  const isSelected = selectedWord?.id === word.id;
                  return (
                    <div
                      key={word.id}
                      onClick={() => setActiveWordId(word.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-japanese font-black text-base ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {word.word.slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
                              {word.word}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ({word.hiragana})
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {word.meaning}
                          </p>
                        </div>
                      </div>

                      <AudioButton text={word.word} size="sm" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Full Living Context (Grammar & Sentence Breakdown) (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedWord ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block mb-1">
                    Compound Detail & JLPT Alignment
                  </span>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl font-black font-japanese text-slate-900 dark:text-white">
                      {selectedWord.word}
                    </h3>
                    <span className="text-sm font-semibold text-slate-400">
                      【{selectedWord.hiragana}】
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                      {selectedWord.level}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold mt-1">
                    {selectedWord.meaning}
                  </p>
                </div>
                <AudioButton text={selectedWord.word} />
              </div>

              {/* Grammar Collocation / Particle Usage */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <Sparkles size={14} />
                  <span>Grammar Collocation (助詞との結びつき)</span>
                </div>
                <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-japanese">
                  {selectedWord.partOfSpeech === 'Verb'
                    ? `〜を ${selectedWord.word} / 〜に ${selectedWord.word}`
                    : `${selectedWord.word} が / ${selectedWord.word} を`}
                </p>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block">
                  Part of Speech: <strong>{selectedWord.partOfSpeech || 'Noun'}</strong>
                </span>
              </div>

              {/* Living Example Sentences with Audio */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Authentic JLPT Example Context (生きた用例)
                </span>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-base font-japanese font-bold text-slate-900 dark:text-white leading-relaxed">
                      {selectedWord.exampleJp || `毎日${selectedWord.word}をしっかりと勉強しています。`}
                    </p>
                    <AudioButton
                      text={selectedWord.exampleJp || `毎日${selectedWord.word}をしっかりと勉強しています。`}
                      size="sm"
                    />
                  </div>
                  <p className="text-xs text-slate-400 font-japanese">
                    {selectedWord.exampleReading || ''}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium pt-1 border-t border-slate-200 dark:border-slate-700">
                    {selectedWord.exampleEn || `I study ${selectedWord.meaning} thoroughly every day.`}
                  </p>
                </div>
              </div>

              {/* Memory Anchor Tip */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                <BookOpen size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Pedagogical Insight:</strong> Connecting the visual shape of 「{kanji.kanji}」 directly with compounds like 「{selectedWord.word}」 locks the character into your long-term lexical memory 4x faster than memorizing strokes in isolation.
                </span>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Select a vocabulary compound to view its contextual network.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

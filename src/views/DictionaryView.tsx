import React, { useState, useMemo } from 'react';
import {
  BookA,
  Search,
  Volume2,
  Sparkles,
  Layers,
  PenTool,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/I18nContext';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { KANJI_DATA } from '../data/kanjiData';
import { GRAMMAR_DATA } from '../data/grammarData';
import { AudioButton } from '../components/common/AudioButton';
import { RubyText } from '../components/common/RubyText';

export const DictionaryView: React.FC = () => {
  const { setSelectedKanjiId, setSelectedGrammarId, setActiveView } = useApp();
  const { t, language } = useI18n();

  const [query, setQuery] = useState('勉強');

  // Search matches
  const matchVocab = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();
    return (
      VOCABULARY_DATA.find(
        (v) =>
          v.word.toLowerCase() === q ||
          v.hiragana.toLowerCase() === q ||
          v.meaning.toLowerCase().includes(q)
      ) ||
      VOCABULARY_DATA.find(
        (v) =>
          v.word.toLowerCase().includes(q) ||
          v.hiragana.toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q)
      ) ||
      VOCABULARY_DATA[0]
    );
  }, [query]);

  const kanjiBreakdown = useMemo(() => {
    if (!matchVocab?.kanji) return [];
    const characters = matchVocab.kanji.split('');
    return KANJI_DATA.filter((k) => characters.includes(k.kanji));
  }, [matchVocab]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          Integrated Japanese Reference
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Japanese Dictionary & Kanji Breakdown
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Look up vocabulary, examine constituent Kanji stroke counts and radicals, and hear audio.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-3.5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in Japanese (Kanji/Hiragana) or English meaning..."
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-base text-slate-900 dark:text-white outline-none focus:border-brand-500 shadow-sm"
        />
      </div>

      {/* Dictionary Card Output */}
      {matchVocab && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Top Word Display */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold">
                  {matchVocab.level}
                </span>
                <span className="text-xs text-slate-400">{matchVocab.partOfSpeech}</span>
              </div>
              <h2 className="text-4xl font-black font-japanese text-slate-900 dark:text-white tracking-tight">
                {matchVocab.word}
              </h2>
              <div className="text-sm font-japanese text-slate-400 mt-0.5">
                {matchVocab.hiragana} • <span className="font-mono">{matchVocab.romaji}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AudioButton text={matchVocab.word} size="lg" showLabel />
            </div>
          </div>

          {/* Meaning Section */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Primary Meaning
            </span>
            <div className="text-xl font-bold text-brand-600 dark:text-brand-400">
              {matchVocab.meaningsByLang?.[language] || matchVocab.meaning}
            </div>
          </div>

          {/* Example Sentence */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Example Sentence in Context
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-japanese font-bold text-base text-slate-900 dark:text-white">
                {matchVocab.exampleJp}
              </div>
              <div className="font-japanese text-xs text-slate-400">
                {matchVocab.exampleReading}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 pt-1">
                {matchVocab.exampleByLang?.[language] || matchVocab.exampleEn}
              </div>
            </div>
          </div>

          {/* Constituent Kanji Breakdown */}
          {kanjiBreakdown.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <PenTool size={14} className="text-indigo-500" /> Kanji Breakdown in this Word
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {kanjiBreakdown.map((k) => (
                  <div
                    key={k.id}
                    onClick={() => {
                      setSelectedKanjiId(k.id);
                      setActiveView('kanji');
                    }}
                    className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-500 cursor-pointer transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-kanji font-black text-2xl flex items-center justify-center shadow-sm">
                        {k.kanji}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {k.meaning}
                        </div>
                        <div className="text-xs text-slate-400 font-japanese">
                          音: {k.onyomi.join(', ')} • 訓: {k.kunyomi.join(', ')}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-indigo-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Scale,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/I18nContext';
import { GRAMMAR_DATA } from '../data/grammarData';
import { AudioButton } from '../components/common/AudioButton';
import { GrammarItem } from '../types';
import { translateExampleSentence } from '../data/translations/multilingualEngine';

export const GrammarView: React.FC = () => {
  const { activeLevel, selectedGrammarId, setSelectedGrammarId } = useApp();
  const { t, language } = useI18n();

  const [searchQuery, setSearchQuery] = useState('');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const [revealedExamples, setRevealedExamples] = useState<Record<number, boolean>>({});

  const toggleExampleReveal = (idx: number) => {
    setRevealedExamples((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Active grammar item
  const [activeGrammar, setActiveGrammar] = useState<GrammarItem | null>(() => {
    if (selectedGrammarId) {
      const match = GRAMMAR_DATA.find((g) => g.id === selectedGrammarId);
      if (match) return match;
    }
    return GRAMMAR_DATA.find((g) => g.level === activeLevel) || GRAMMAR_DATA[0];
  });

  const levelGrammarList = useMemo(() => {
    return GRAMMAR_DATA.filter((g) => {
      if (g.level !== activeLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          g.pattern.toLowerCase().includes(q) ||
          g.meaning.toLowerCase().includes(q) ||
          g.structure.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [activeLevel, searchQuery]);

  const [grammarPage, setGrammarPage] = useState(1);
  const GRAMMAR_PAGE_SIZE = 30;
  const totalGrammarPages = Math.ceil(levelGrammarList.length / GRAMMAR_PAGE_SIZE) || 1;
  const paginatedGrammarList = useMemo(() => {
    const start = (grammarPage - 1) * GRAMMAR_PAGE_SIZE;
    return levelGrammarList.slice(start, start + GRAMMAR_PAGE_SIZE);
  }, [levelGrammarList, grammarPage, GRAMMAR_PAGE_SIZE]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-bold tracking-wide uppercase">
              {t('grammar.badge')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
              {activeLevel}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            {t('grammar.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t('grammar.subtitle')}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-sm cursor-pointer ${
              comparisonMode
                ? 'bg-brand-500 text-white border-brand-600 shadow-brand-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <Scale size={16} />
            <span>{t('grammar.compareMode')}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`${t('common.search')} (${activeLevel} grammar rules, e.g. 〜てはいけない, わけだ, permission)...`}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
        />
      </div>

      {/* Comparison Drawer (if open) */}
      {comparisonMode && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/40 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-pink-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Scale size={20} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                {t('grammar.comparePatterns')} (Obligation vs Permission)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('grammar.subtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Pair */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 space-y-3 shadow-sm">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
                Pattern A (Obligation / Must)
              </span>
              <h4 className="text-xl font-black font-japanese text-slate-900 dark:text-white">
                〜なければならない
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Meaning: Must do / Have to do (No other choice)
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-japanese">
                明日、早く起きなければなりません。
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-sans mt-0.5 font-medium">
                  {translateExampleSentence('明日、早く起きなければなりません。', 'I must wake up early tomorrow.', language)}
                </span>
              </div>
            </div>

            {/* Right Pair */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 space-y-3 shadow-sm">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                Pattern B (Permission / Optional)
              </span>
              <h4 className="text-xl font-black font-japanese text-slate-900 dark:text-white">
                〜なくてもいい
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Meaning: Do not have to do (Optional)
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-japanese">
                明日は来なくてもいいです。
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-sans mt-0.5 font-medium">
                  {translateExampleSentence('明日は来なくてもいいです。', 'You do not have to come tomorrow.', language)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Grammar Detail (7 cols) */}
        {activeGrammar && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    {activeGrammar.level}
                  </span>
                  <span className="text-xs text-slate-400 capitalize">
                    {t(`grammar.${activeGrammar.formalLevel}Register`) || `${activeGrammar.formalLevel} Register`}
                  </span>
                </div>
                <h2 className="text-3xl font-black font-japanese text-brand-600 dark:text-brand-400 mt-2">
                  {activeGrammar.pattern}
                </h2>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {activeGrammar.meaningsByLang?.[language] || activeGrammar.meaning}
                </p>
              </div>
            </div>

            {/* Structure Breakdown Card */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                {t('grammar.formula')}
              </span>
              <div className="font-mono text-sm font-bold text-indigo-950 dark:text-indigo-200">
                {activeGrammar.structure}
              </div>
            </div>

            {/* In-depth Explanation */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t('grammar.explanation')}
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeGrammar.explanationsByLang?.[language] || activeGrammar.explanation}
              </p>
            </div>

            {/* Example Sentences */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t('grammar.examples')}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setShowTranslations(!showTranslations);
                    setRevealedExamples({});
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  {showTranslations ? <EyeOff size={13} /> : <Eye size={13} />}
                  {showTranslations
                    ? t('listening.hideTranslation') || 'Hide Translations'
                    : t('listening.showTranslation') || 'Show Translations'}
                </button>
              </div>

              <div className="space-y-2.5">
                {activeGrammar.examples.map((ex, idx) => {
                  const isVisible = showTranslations || !!revealedExamples[idx];
                  const translationText =
                    ex.translationsByLang?.[language] ||
                    translateExampleSentence(ex.jp, ex.en, language);

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-4 transition-all"
                    >
                      <div className="flex-1">
                        <p className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
                          {ex.jp}
                        </p>
                        <p className="font-japanese text-xs text-slate-400 mt-0.5">
                          {ex.reading}
                        </p>

                        {isVisible ? (
                          <div className="flex items-center justify-between gap-2 mt-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/50">
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                              {translationText}
                            </p>
                            <button
                              type="button"
                              onClick={() => toggleExampleReveal(idx)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer"
                              title="Toggle translation"
                            >
                              <EyeOff size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleExampleReveal(idx)}
                            className="mt-1.5 flex items-center gap-1 text-[11px] text-brand-600 dark:text-brand-400 hover:underline font-semibold cursor-pointer"
                          >
                            <Eye size={11} /> {t('vocab.tapToReveal') || 'Tap to reveal translation'}
                          </button>
                        )}
                      </div>
                      <AudioButton text={ex.jp} size="sm" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Common Mistakes */}
            {activeGrammar.commonMistakes && activeGrammar.commonMistakes.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle size={14} /> {t('grammar.commonMistakes')}
                </span>
                <ul className="text-xs text-amber-900 dark:text-amber-200 space-y-1 list-disc list-inside">
                  {activeGrammar.commonMistakes.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Right: Grammar Pattern List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {activeLevel} {t('grammar.index')} ({levelGrammarList.length})
          </h3>

          <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
            {paginatedGrammarList.map((g) => {
              const isSelected = activeGrammar?.id === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setActiveGrammar(g)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-base font-bold font-japanese text-slate-900 dark:text-white">
                      {g.pattern}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {g.meaningsByLang?.[language] || g.meaning}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Grammar Pagination Toolbar */}
          {totalGrammarPages > 1 && (
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Page {grammarPage} of {totalGrammarPages}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={grammarPage <= 1}
                  onClick={() => setGrammarPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={grammarPage >= totalGrammarPages}
                  onClick={() => setGrammarPage((p) => Math.min(totalGrammarPages, p + 1))}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

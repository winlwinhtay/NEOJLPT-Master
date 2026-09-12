import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  Star,
  Check,
  RotateCw,
  XCircle,
  Sparkles,
  Volume2,
  Filter,
  ArrowRight,
  ArrowLeft,
  Flag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSRS } from '../context/SRSContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { AudioButton } from '../components/common/AudioButton';
import { RubyText } from '../components/common/RubyText';
import { ReportIssueModal } from '../components/common/ReportIssueModal';
import { SRSRating } from '../services/srsService';
import { MasteryStatus, VocabularyItem } from '../types';
import { getVocabularyStudyTip } from '../data/translations/vocabTipsTranslations';

export const VocabularyView: React.FC = () => {
  const { activeLevel } = useApp();
  const { srsItems, rateItem, toggleFavorite, getItemProgress } = useSRS();
  const { logActivity, profile } = useUser();
  const { t, language } = useI18n();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'due' | 'learning' | 'review' | 'mastered' | 'favorite'>('all');
  const [viewMode, setViewMode] = useState<'flashcards' | 'list'>('flashcards');

  // Flashcard mode state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reportingVocab, setReportingVocab] = useState<VocabularyItem | null>(null);

  // List mode pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 50;

  // Filter words by active level, query, and SRS status
  const filteredVocab = useMemo(() => {
    return VOCABULARY_DATA.filter((v) => {
      if (v.level !== activeLevel) return false;

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          v.word.toLowerCase().includes(q) ||
          v.hiragana.toLowerCase().includes(q) ||
          v.romaji.toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q);
        if (!match) return false;
      }

      // SRS Filter
      const progress = getItemProgress(v.id);
      const now = new Date().toISOString();

      if (activeFilter === 'due') {
        return progress && progress.status !== 'new' && progress.dueDate <= now;
      }
      if (activeFilter === 'learning') {
        return progress && progress.status === 'learning';
      }
      if (activeFilter === 'review') {
        return progress && progress.status === 'review';
      }
      if (activeFilter === 'mastered') {
        return progress && progress.status === 'mastered';
      }
      if (activeFilter === 'favorite') {
        return progress && progress.isFavorite;
      }

      return true;
    });
  }, [activeLevel, searchQuery, activeFilter, getItemProgress]);

  const totalPages = Math.ceil(filteredVocab.length / PAGE_SIZE) || 1;
  const paginatedVocab = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredVocab.slice(start, start + PAGE_SIZE);
  }, [filteredVocab, currentPage, PAGE_SIZE]);

  const currentWord = filteredVocab[currentCardIndex];

  const handleRating = (rating: SRSRating) => {
    if (!currentWord) return;
    rateItem(currentWord.id, 'vocab', currentWord.level, rating);
    logActivity('vocab', 1);

    // Flip back and move to next card
    setIsFlipped(false);
    if (currentCardIndex < filteredVocab.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const currentProgress = currentWord ? getItemProgress(currentWord.id) : undefined;
  const isFav = Boolean(currentProgress?.isFavorite);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            {t('vocab.badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {activeLevel} {t('vocab.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('vocab.subtitle')}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setViewMode('flashcards')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'flashcards'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t('vocab.flashcardMode')}
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t('vocab.listMode')} ({filteredVocab.length})
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* SRS Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => {
              setActiveFilter('all');
              setCurrentCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'all'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {t('vocab.allWords')}
          </button>
          <button
            onClick={() => {
              setActiveFilter('due');
              setCurrentCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'due'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            ⏰ {t('vocab.dueToday')}
          </button>
          <button
            onClick={() => {
              setActiveFilter('learning');
              setCurrentCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'learning'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            🌱 {t('vocab.learning')}
          </button>
          <button
            onClick={() => {
              setActiveFilter('mastered');
              setCurrentCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'mastered'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            🏆 {t('vocab.mastered')}
          </button>
          <button
            onClick={() => {
              setActiveFilter('favorite');
              setCurrentCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'favorite'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            ⭐ {t('vocab.favorites')}
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search')}
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* View Mode 1: Interactive 3D Flashcard Deck */}
      {viewMode === 'flashcards' && (
        <div className="space-y-6">
          {filteredVocab.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center text-slate-400 space-y-3">
              <Layers size={36} className="mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No vocabulary cards in this filter</p>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-brand-500 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Flashcard Box */}
              <div className="relative w-full max-w-xl mx-auto min-h-[340px] perspective-1000">
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`w-full h-full min-h-[340px] bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-800 shadow-xl cursor-pointer flex flex-col justify-between transition-all duration-300 transform hover:border-brand-500/80 select-none ${
                    isFlipped ? 'bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950' : ''
                  }`}
                >
                  {/* Top Card Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-black">
                        {currentWord.level}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {currentCardIndex + 1} / {filteredVocab.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setReportingVocab(currentWord)}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        title="Report mistake or suggestion"
                      >
                        <Flag size={16} />
                      </button>
                      <button
                        onClick={() => toggleFavorite(currentWord.id, 'vocab', currentWord.level)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isFav
                            ? 'bg-amber-50 text-amber-500 border-amber-300'
                            : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:text-amber-500'
                        }`}
                        title="Bookmark favorite"
                      >
                        <Star size={16} className={isFav ? 'fill-amber-500' : ''} />
                      </button>
                      <AudioButton text={currentWord.word} size="md" />
                    </div>
                  </div>

                  {/* Card Main Body */}
                  <div className="text-center my-auto py-6 space-y-3">
                    {!isFlipped ? (
                      /* FRONT SIDE */
                      <div>
                        <div className="text-5xl sm:text-6xl font-black font-japanese text-slate-900 dark:text-white tracking-tight mb-2">
                          {currentWord.word}
                        </div>
                        <div className="text-lg font-japanese text-slate-400 font-medium">
                          {currentWord.hiragana}
                        </div>
                        {currentWord.pitchAccent && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                            <span>Pitch:</span>
                            <span className="text-indigo-600 dark:text-indigo-400">{currentWord.pitchAccent.pattern}</span>
                          </div>
                        )}
                        <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                          <RotateCw size={12} /> {t('vocab.flipCard')}
                        </p>
                      </div>
                    ) : (
                      /* BACK SIDE */
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <div className="text-2xl font-black text-brand-600 dark:text-brand-400">
                            {currentWord.meaningsByLang?.[language] || currentWord.meaning}
                          </div>
                          <div className="text-xs font-mono text-slate-400 mt-1 flex items-center justify-center gap-2">
                            <span>[{currentWord.romaji}]</span>
                            <span>•</span>
                            <span>{currentWord.partOfSpeech}</span>
                            {currentWord.pitchAccent && (
                              <>
                                <span>•</span>
                                <span className="text-indigo-500 font-bold">{currentWord.pitchAccent.pattern}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Collocations */}
                        {currentWord.collocations && currentWord.collocations.length > 0 && (
                          <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-left space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block">
                              Collocations & Usage:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {currentWord.collocations.map((c, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1 font-japanese"
                                >
                                  <strong>{c.phrase}</strong>
                                  <span className="text-[10px] text-slate-400">({c.reading})</span>
                                  <span className="text-[10px] text-slate-500">— {c.meaning}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Example Sentence Box */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left space-y-1">
                          <div className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
                            {currentWord.exampleJp}
                          </div>
                          <div className="font-japanese text-xs text-slate-400">
                            {currentWord.exampleReading}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-300 pt-1">
                            {currentWord.exampleByLang?.[language] || currentWord.exampleEn}
                          </div>
                        </div>

                        {/* Localized Pedagogical Study Tip, Mnemonic & Pitfall Alert across all 19 languages */}
                        {(() => {
                          const tipData = getVocabularyStudyTip(
                            currentWord.word,
                            currentWord.meaningsByLang?.[language] || currentWord.meaning,
                            currentWord.partOfSpeech,
                            language
                          );
                          return (
                            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-left space-y-1.5">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                                <Sparkles size={12} />
                                <span>{t('vocab.tips') || 'Study Tip & Mnemonic'}</span>
                              </div>
                              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                                {tipData.tip}
                              </p>
                              {tipData.mnemonic && (
                                <p className="text-[11px] text-amber-800 dark:text-amber-300/90 italic">
                                  💡 {tipData.mnemonic}
                                </p>
                              )}
                              {tipData.pitfallWarning && (
                                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                                  ⚠️ {tipData.pitfallWarning}
                                </p>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Bottom Indicator */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="capitalize">
                      Status: <strong>{currentProgress?.status ? t(`vocab.${currentProgress.status}`) || currentProgress.status : t('vocab.again')}</strong>
                    </span>
                    <span className="text-[11px]">
                      {currentProgress?.interval ? `${currentProgress.interval} days` : t('vocab.dueToday')}
                    </span>
                  </div>
                </div>
              </div>

              {/* SRS Rating Action Buttons */}
              <div className="max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleRating('again')}
                  className="py-3 px-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold transition-all text-center flex flex-col items-center gap-1 shadow-sm"
                >
                  <span className="text-sm">❌ {t('vocab.again')}</span>
                  <span className="text-[10px] font-normal text-rose-500">{t('vocab.dueToday')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRating('hard')}
                  className="py-3 px-3 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 text-xs font-bold transition-all text-center flex flex-col items-center gap-1 shadow-sm"
                >
                  <span className="text-sm">🔄 {t('vocab.hard')}</span>
                  <span className="text-[10px] font-normal text-amber-500">3 Days</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRating('good')}
                  className="py-3 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 text-xs font-bold transition-all text-center flex flex-col items-center gap-1 shadow-sm"
                >
                  <span className="text-sm">✅ {t('vocab.good')}</span>
                  <span className="text-[10px] font-normal text-emerald-500">7 Days</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRating('easy')}
                  className="py-3 px-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 text-xs font-bold transition-all text-center flex flex-col items-center gap-1 shadow-sm"
                >
                  <span className="text-sm">🌟 {t('vocab.easy')}</span>
                  <span className="text-[10px] font-normal text-indigo-500">21+ Days</span>
                </button>
              </div>

              {/* Navigation pagination buttons */}
              <div className="flex items-center justify-between max-w-xl mx-auto pt-2">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : filteredVocab.length - 1));
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft size={16} /> Previous
                </button>

                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex((prev) => (prev < filteredVocab.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  Next Card <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* View Mode 2: Structured Word Table / List */}
      {viewMode === 'list' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedVocab.map((v, idx) => {
              const prog = getItemProgress(v.id);
              const isF = Boolean(prog?.isFavorite);
              const globalIndex = (currentPage - 1) * PAGE_SIZE + idx + 1;

              return (
                <div
                  key={v.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 text-center text-xs font-bold text-slate-400 pt-1">
                      #{globalIndex}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-japanese text-slate-900 dark:text-white">
                          {v.word}
                        </span>
                        <span className="text-xs text-slate-400 font-japanese">{v.hiragana}</span>
                        <span className="text-[11px] font-mono text-slate-400">[{v.romaji}]</span>
                        {v.pitchAccent && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {v.pitchAccent.pattern}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
                        {v.meaningsByLang?.[language] || v.meaning}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {v.exampleJp} — {v.exampleByLang?.[language] || v.exampleEn}
                      </div>
                      {(() => {
                        const tipData = getVocabularyStudyTip(
                          v.word,
                          v.meaningsByLang?.[language] || v.meaning,
                          v.partOfSpeech,
                          language
                        );
                        return (
                          <div className="text-[11px] text-amber-700 dark:text-amber-400/90 mt-1 flex items-center gap-1.5">
                            <span className="font-bold">💡 Tip:</span>
                            <span>{tipData.tip}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setReportingVocab(v)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Report mistake or suggestion"
                    >
                      <Flag size={14} />
                    </button>
                    <button
                      onClick={() => toggleFavorite(v.id, 'vocab', v.level)}
                      className={`p-2 rounded-xl transition-colors ${
                        isF ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'
                      }`}
                    >
                      <Star size={16} className={isF ? 'fill-amber-500' : ''} />
                    </button>
                    <AudioButton text={v.word} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Toolbar */}
          {totalPages > 1 && (
            <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Showing {Math.min(filteredVocab.length, (currentPage - 1) * PAGE_SIZE + 1)}–
                {Math.min(filteredVocab.length, currentPage * PAGE_SIZE)} of {filteredVocab.length} words
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Previous
                </button>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {reportingVocab && (
        <ReportIssueModal
          isOpen={Boolean(reportingVocab)}
          onClose={() => setReportingVocab(null)}
          contentId={reportingVocab.id}
          module="vocabulary"
          level={reportingVocab.level}
          currentText={`${reportingVocab.word} (${reportingVocab.hiragana}) - ${reportingVocab.meaning}`}
        />
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  PenTool,
  Search,
  Star,
  Sparkles,
  BookOpen,
  Volume2,
  Filter,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { useI18n } from '../i18n/I18nContext';
import { KANJI_DATA } from '../data/kanjiData';
import { KanjiCanvas } from '../components/kanji/KanjiCanvas';
import { AudioButton } from '../components/common/AudioButton';
import { KanjiItem } from '../types';

export const KanjiView: React.FC = () => {
  const { activeLevel, selectedKanjiId, setSelectedKanjiId } = useApp();
  const { logActivity } = useUser();
  const { srsItems, toggleFavorite, getItemProgress } = useSRS();
  const { t, language } = useI18n();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStrokeFilter, setSelectedStrokeFilter] = useState<number | null>(null);

  // Active Kanji for interactive practice
  const [activeKanji, setActiveKanji] = useState<KanjiItem | null>(() => {
    if (selectedKanjiId) {
      const match = KANJI_DATA.find((k) => k.id === selectedKanjiId);
      if (match) return match;
    }
    return KANJI_DATA.find((k) => k.level === activeLevel) || KANJI_DATA[0];
  });

  const levelKanjiList = useMemo(() => {
    return KANJI_DATA.filter((k) => {
      if (k.level !== activeLevel) return false;
      if (selectedStrokeFilter && k.strokeCount !== selectedStrokeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          k.kanji.toLowerCase().includes(q) ||
          k.meaning.toLowerCase().includes(q) ||
          k.onyomi.some((o) => o.toLowerCase().includes(q)) ||
          k.kunyomi.some((u) => u.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [activeLevel, selectedStrokeFilter, searchQuery]);

  const [kanjiPage, setKanjiPage] = useState(1);
  const KANJI_PAGE_SIZE = 48;
  const totalKanjiPages = Math.ceil(levelKanjiList.length / KANJI_PAGE_SIZE) || 1;
  const paginatedKanjiList = useMemo(() => {
    const start = (kanjiPage - 1) * KANJI_PAGE_SIZE;
    return levelKanjiList.slice(start, start + KANJI_PAGE_SIZE);
  }, [levelKanjiList, kanjiPage, KANJI_PAGE_SIZE]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {t('kanji.badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {activeLevel} {t('kanji.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('kanji.subtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('kanji.searchPlaceholder')}
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Main Studio Grid: Left Detail & Writing Canvas, Right Kanji Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Kanji Detail & Interactive Drawing Canvas (7 cols) */}
        {activeKanji && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Header / Big Character */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-kanji text-6xl font-black flex items-center justify-center shadow-inner border border-indigo-100 dark:border-indigo-900/50">
                  {activeKanji.kanji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                      {activeKanji.level}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {activeKanji.strokeCount} {t('kanji.strokes')}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {activeKanji.meaningsByLang?.[language] || activeKanji.meaning}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t('kanji.radicals')}: {activeKanji.radicals.join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AudioButton text={activeKanji.kanji} size="md" />
              </div>
            </div>

            {/* Readings Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t('kanji.onyomi')}
                </span>
                <div className="text-sm font-bold font-japanese text-indigo-600 dark:text-indigo-400">
                  {activeKanji.onyomi.join('、 ') || '—'}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {activeKanji.romajiOnyomi?.join(', ')}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t('kanji.kunyomi')}
                </span>
                <div className="text-sm font-bold font-japanese text-emerald-600 dark:text-emerald-400">
                  {activeKanji.kunyomi.join('、 ') || '—'}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {activeKanji.romajiKunyomi?.join(', ')}
                </div>
              </div>
            </div>

            {/* Interactive Canvas */}
            <div className="pt-2">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('kanji.canvasTitle')}
                </span>
                <p className="text-[11px] text-slate-400">
                  {t('kanji.subtitle')}
                </p>
              </div>
              <KanjiCanvas
                key={activeKanji.id}
                kanji={activeKanji}
                onPracticeComplete={() => logActivity('kanji', 1)}
              />
            </div>

            {/* Example Vocabulary Compounds */}
            {activeKanji.exampleVocab && activeKanji.exampleVocab.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t('kanji.compounds')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeKanji.exampleVocab.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold font-japanese text-slate-900 dark:text-white text-sm">
                            {item.word}
                          </span>
                          <span className="text-xs font-japanese text-slate-400">
                            {item.reading}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          {item.meaning}
                        </p>
                      </div>
                      <AudioButton text={item.word} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right: Kanji Grid Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {activeLevel} {t('kanji.index')} ({levelKanjiList.length})
            </h3>
            {selectedStrokeFilter && (
              <button
                onClick={() => setSelectedStrokeFilter(null)}
                className="text-xs text-brand-500 hover:underline"
              >
                {t('common.filter')}
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3 max-h-[650px] overflow-y-auto pr-1">
            {paginatedKanjiList.map((k) => {
              const isSelected = activeKanji?.id === k.id;
              return (
                <div
                  key={k.id}
                  onClick={() => setActiveKanji(k)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center space-y-1 group ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-3xl font-kanji font-black text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                    {k.kanji}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                    {k.meaningsByLang?.[language] || k.meaning}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {k.strokeCount} {t('kanji.strokes')}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kanji Pagination Toolbar */}
          {totalKanjiPages > 1 && (
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Page {kanjiPage} of {totalKanjiPages}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={kanjiPage <= 1}
                  onClick={() => setKanjiPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={kanjiPage >= totalKanjiPages}
                  onClick={() => setKanjiPage((p) => Math.min(totalKanjiPages, p + 1))}
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

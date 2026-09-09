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
  EyeOff,
  CheckCircle2,
  Layers,
  Info,
  X,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { useI18n } from '../i18n/I18nContext';
import { KANJI_DATA } from '../data/kanjiData';
import { RADICALS_DATA, CORE_69_RADICALS, ALL_240_RADICALS } from '../data/radicalsData';
import { KanjiCanvas } from '../components/kanji/KanjiCanvas';
import { AudioButton } from '../components/common/AudioButton';
import { generate5ExampleSentences } from '../data/generators/kanjiGenerator';
import { KanjiItem, RadicalItem, RadicalPosition } from '../types';

export const KanjiView: React.FC = () => {
  const { activeLevel, selectedKanjiId, setSelectedKanjiId } = useApp();
  const { logActivity } = useUser();
  const { srsItems, toggleFavorite, getItemProgress } = useSRS();
  const { t, language } = useI18n();

  // Subcategory tabs: 'kanji' (Kanji Studio) vs 'radicals' (Radicals Studio)
  const [activeTab, setActiveTab] = useState<'kanji' | 'radicals'>('kanji');

  // Search & Filter for Kanji
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

  // 5 Sentences Studio UI state
  const [showAllTranslations, setShowAllTranslations] = useState(true);
  const [showFurigana, setShowFurigana] = useState(true);
  const [hiddenSentenceIndices, setHiddenSentenceIndices] = useState<Set<number>>(new Set());

  const toggleSentenceCard = (idx: number) => {
    setHiddenSentenceIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  // Guaranteed 5 sample sentences with full 19-language offline translations
  const displaySentences = useMemo(() => {
    if (!activeKanji) return [];
    if (activeKanji.exampleSentences && activeKanji.exampleSentences.length >= 5) {
      return activeKanji.exampleSentences.slice(0, 5);
    }
    return generate5ExampleSentences(
      activeKanji.kanji,
      activeKanji.meaning,
      activeKanji.onyomi || [],
      activeKanji.kunyomi || [],
      activeKanji.exampleVocab || [],
      activeKanji.exampleSentence
    );
  }, [activeKanji]);

  // Radicals Studio state
  const [radicalMode, setRadicalMode] = useState<'core69' | 'all240'>('core69');
  const [radicalPositionFilter, setRadicalPositionFilter] = useState<RadicalPosition | 'all'>('all');
  const [radicalStrokeFilter, setRadicalStrokeFilter] = useState<number | null>(null);
  const [radicalSearch, setRadicalSearch] = useState('');
  const [selectedRadicalModal, setSelectedRadicalModal] = useState<RadicalItem | null>(null);
  const [radicalPage, setRadicalPage] = useState(1);
  const RADICAL_PAGE_SIZE = 36;

  // Filtered Kanji List
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

  // Filtered Radicals List
  const filteredRadicalsList = useMemo(() => {
    const baseList = radicalMode === 'core69' ? CORE_69_RADICALS : ALL_240_RADICALS;
    return baseList.filter((r) => {
      if (radicalPositionFilter !== 'all' && r.position !== radicalPositionFilter) return false;
      if (radicalStrokeFilter && r.strokeCount !== radicalStrokeFilter) return false;
      if (radicalSearch.trim()) {
        const q = radicalSearch.toLowerCase();
        const translatedMeaning = r.meaningsByLang[language] || r.meaningEn;
        const match =
          r.radical.toLowerCase().includes(q) ||
          r.nameJp.toLowerCase().includes(q) ||
          r.nameRomaji.toLowerCase().includes(q) ||
          r.meaningEn.toLowerCase().includes(q) ||
          translatedMeaning.toLowerCase().includes(q) ||
          r.exampleKanji.some((char) => char.includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [radicalMode, radicalPositionFilter, radicalStrokeFilter, radicalSearch, language]);

  const totalRadicalPages = Math.ceil(filteredRadicalsList.length / RADICAL_PAGE_SIZE) || 1;
  const paginatedRadicalsList = useMemo(() => {
    const start = (radicalPage - 1) * RADICAL_PAGE_SIZE;
    return filteredRadicalsList.slice(start, start + RADICAL_PAGE_SIZE);
  }, [filteredRadicalsList, radicalPage, RADICAL_PAGE_SIZE]);

  // Jump from Radical to Kanji Study Studio
  const handleSelectKanjiFromRadical = (char: string) => {
    const match = KANJI_DATA.find((k) => k.kanji === char);
    if (match) {
      setActiveKanji(match);
      setSelectedKanjiId(match.id);
    } else {
      // Fallback create minimal active item
      const fallback: KanjiItem = {
        id: `k-direct-${char}`,
        kanji: char,
        meaning: `Kanji ${char}`,
        onyomi: [],
        kunyomi: [],
        strokeCount: 5,
        level: activeLevel,
        radicals: [],
        exampleVocab: [],
        exampleSentences: [],
      };
      setActiveKanji(fallback);
    }
    setSelectedRadicalModal(null);
    setActiveTab('kanji');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const positions: Array<{ id: RadicalPosition | 'all'; labelEn: string; labelJp: string }> = [
    { id: 'all', labelEn: 'All Positions', labelJp: 'すべて' },
    { id: 'hen', labelEn: 'Hen (Left)', labelJp: '偏（へん・左）' },
    { id: 'tsukuri', labelEn: 'Tsukuri (Right)', labelJp: '旁（つくり・右）' },
    { id: 'kanmuri', labelEn: 'Kanmuri (Top)', labelJp: '冠（かんむり・上）' },
    { id: 'ashi', labelEn: 'Ashi (Bottom)', labelJp: '脚（あし・下）' },
    { id: 'kamae', labelEn: 'Kamae (Enclosure)', labelJp: '構（かまえ・囲み）' },
    { id: 'tare', labelEn: 'Tare (Hanging)', labelJp: '垂（たれ・垂れ）' },
    { id: 'nyou', labelEn: 'Nyou (Encircling)', labelJp: '繞（にょう・左下）' },
    { id: 'independent', labelEn: 'Independent', labelJp: '独（独立・単体）' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header & Sub-category Tab Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {t('kanji.badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 mt-1">
            <span>{activeTab === 'kanji' ? `${activeLevel} ${t('kanji.title')}` : t('kanji.tabRadicals', 'Radicals Studio (部首)')}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {activeTab === 'kanji'
              ? t('kanji.subtitle')
              : 'Master the building blocks of Japanese characters: Important 69 core radicals and all 240 comprehensive radicals.'}
          </p>
        </div>

        {/* Subcategory Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('kanji')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'kanji'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <PenTool size={16} />
            <span>{t('kanji.tabKanji', 'Kanji Studio')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('radicals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'radicals'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles size={16} />
            <span>{t('kanji.tabRadicals', 'Radicals (部首)')}</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold">
              240
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: KANJI STUDY (Drawing canvas, readings, compounds & 5 sample sentences) */}
      {/* ========================================================================= */}
      {activeTab === 'kanji' && (
        <div className="space-y-8 animate-fade-in">
          {/* Top Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('kanji.searchPlaceholder')}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>
            {selectedStrokeFilter && (
              <button
                onClick={() => setSelectedStrokeFilter(null)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Clear stroke filter ({selectedStrokeFilter})
              </button>
            )}
          </div>

          {/* Main Studio Grid: Left Detail & Writing Canvas, Right Kanji Browser */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Active Kanji Detail, Canvas & 5 Sample Sentences (7 cols) */}
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
                        {t('kanji.radicals')}: {activeKanji.radicals.join(', ') || '—'}
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
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between gap-2 border border-slate-100 dark:border-slate-800"
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

                {/* ========================================================== */}
                {/* 5 SAMPLE SENTENCES STUDIO (Usage, Nuance, 19 Langs Offline) */}
                {/* ========================================================== */}
                <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                          <BookOpen size={16} />
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {t('kanji.sentencesTitle', '5 Sample Sentences & Practical Usage')}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t('kanji.sentencesSubtitle', 'Master authentic context, compound vocabulary, and Onyomi/Kunyomi usage.')}
                      </p>
                    </div>

                    {/* Toolbar: Global Show/Hide Translation & Furigana */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowFurigana(!showFurigana)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          showFurigana
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                            : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {t('kanji.showFurigana', 'Furigana')}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowAllTranslations(!showAllTranslations)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm shadow-indigo-200 dark:shadow-none"
                      >
                        {showAllTranslations ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span>
                          {showAllTranslations
                            ? t('kanji.hideTranslation', 'Hide Translations')
                            : t('kanji.showTranslation', 'Show Translations')}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 5 Sentences Cards List */}
                  <div className="space-y-3">
                    {displaySentences.map((sentence, idx) => {
                      const isCardHidden = !showAllTranslations || hiddenSentenceIndices.has(idx);
                      const translatedText =
                        sentence.translationsByLang?.[language] ||
                        sentence.translationsByLang?.['en'] ||
                        sentence.en;

                      return (
                        <div
                          key={sentence.id || idx}
                          className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all space-y-2.5"
                        >
                          {/* Sentence Header Meta */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              {sentence.usageNote && (
                                <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold">
                                  {sentence.usageNote}
                                </span>
                              )}
                              {sentence.targetWord && (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold font-japanese">
                                  【{sentence.targetWord}】
                                  {sentence.targetReading && (
                                    <span className="text-[10px] font-normal opacity-80">
                                      （{sentence.targetReading}）
                                    </span>
                                  )}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1">
                              <AudioButton text={sentence.jp} size="sm" />
                              <button
                                type="button"
                                onClick={() => toggleSentenceCard(idx)}
                                title={isCardHidden ? t('kanji.showTranslation') : t('kanji.hideTranslation')}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
                              >
                                {isCardHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                            </div>
                          </div>

                          {/* Japanese Sentence + Furigana */}
                          <div className="space-y-0.5">
                            {showFurigana && sentence.reading && (
                              <div className="text-xs font-japanese font-medium text-indigo-600 dark:text-indigo-400 tracking-wide pl-0.5">
                                {sentence.reading}
                              </div>
                            )}
                            <div className="text-sm sm:text-base font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                              {sentence.jp}
                            </div>
                          </div>

                          {/* Translation Box (All 19 languages offline) */}
                          {!isCardHidden ? (
                            <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 animate-fade-in flex items-start justify-between gap-2">
                              <p className="leading-relaxed">{translatedText}</p>
                              <span className="text-[9px] uppercase font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded shrink-0">
                                {language}
                              </span>
                            </div>
                          ) : (
                            <div
                              onClick={() => toggleSentenceCard(idx)}
                              className="text-[11px] text-slate-400 dark:text-slate-500 italic cursor-pointer hover:text-indigo-500 flex items-center gap-1 py-0.5"
                            >
                              <Eye size={12} />
                              <span>Tap to reveal translation ({language.toUpperCase()})</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                    className="text-xs text-indigo-500 hover:underline"
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
      )}

      {/* ========================================================================= */}
      {/* TAB 2: RADICALS STUDIO (Important 69 & All 240 Radicals Explorer) */}
      {/* ========================================================================= */}
      {activeTab === 'radicals' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Header: 69 vs 240 Mode Switcher, Search & Filters */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Dual Mode Switcher: 69 Core vs 240 Total */}
              <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setRadicalMode('core69');
                    setRadicalPage(1);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    radicalMode === 'core69'
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-200 dark:shadow-none'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Star size={16} className={radicalMode === 'core69' ? 'fill-current' : ''} />
                  <span>{t('kanji.radicalsImportant69', '⭐ Important 69 Radicals')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRadicalMode('all240');
                    setRadicalPage(1);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    radicalMode === 'all240'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers size={16} />
                  <span>{t('kanji.radicalsAll240', '📚 All 240 Radicals')}</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={radicalSearch}
                  onChange={(e) => {
                    setRadicalSearch(e.target.value);
                    setRadicalPage(1);
                  }}
                  placeholder="Search radical glyph, name, meaning..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Position Filter Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {t('kanji.radicalsPosition', 'Position / Configuration')}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {positions.map((pos) => {
                  const isSelected = radicalPositionFilter === pos.id;
                  return (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => {
                        setRadicalPositionFilter(pos.id);
                        setRadicalPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      <span>{pos.labelJp}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stroke Count Selector Pills */}
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                  Strokes:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setRadicalStrokeFilter(null);
                    setRadicalPage(1);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                    radicalStrokeFilter === null
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  All
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setRadicalStrokeFilter(radicalStrokeFilter === s ? null : s);
                      setRadicalPage(1);
                    }}
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                      radicalStrokeFilter === s
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-900 dark:text-white">{filteredRadicalsList.length}</strong> radicals
                {radicalMode === 'core69' ? ' (Core 69 JLPT Essentials)' : ' (Complete 240)'}
              </div>
            </div>
          </div>

          {/* Radicals Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedRadicalsList.map((item) => {
              const translatedMeaning = item.meaningsByLang[language] || item.meaningEn;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:shadow-md space-y-3 group cursor-pointer relative"
                  onClick={() => setSelectedRadicalModal(item)}
                >
                  {/* Top Bar: Kangxi # and Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      #{item.kangxiNumber}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {item.isCore69 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[10px] font-bold flex items-center gap-1">
                          <Star size={10} className="fill-current" />
                          <span>Core 69</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                        {item.positionNameJp}
                      </span>
                    </div>
                  </div>

                  {/* Big Radical Character & Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-kanji text-4xl font-black flex items-center justify-center border border-indigo-100 dark:border-indigo-900/40 group-hover:scale-105 transition-transform shadow-inner">
                      {item.radical}
                    </div>
                    <div>
                      <div className="text-base font-black font-japanese text-slate-900 dark:text-white">
                        {item.nameJp}
                      </div>
                      <div className="text-xs text-indigo-500 font-mono font-semibold">
                        {item.nameRomaji}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.strokeCount} {t('kanji.strokes')}
                      </div>
                    </div>
                  </div>

                  {/* Meaning in User's Current Language (All 19 offline) */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {translatedMeaning}
                    </div>
                    <div className="text-[10px] text-slate-400 italic">
                      {item.meaningEn}
                    </div>
                  </div>

                  {/* Sample Kanji Pills */}
                  {item.exampleKanji && item.exampleKanji.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Example Kanji:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.exampleKanji.slice(0, 6).map((char) => (
                          <button
                            key={char}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectKanjiFromRadical(char);
                            }}
                            title={`Study Kanji ${char} in Studio`}
                            className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-800 dark:text-slate-200 text-sm font-kanji font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 transition-colors"
                          >
                            {char}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Radicals Pagination */}
          {totalRadicalPages > 1 && (
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Page {radicalPage} of {totalRadicalPages} ({filteredRadicalsList.length} radicals)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={radicalPage <= 1}
                  onClick={() => setRadicalPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={radicalPage >= totalRadicalPages}
                  onClick={() => setRadicalPage((p) => Math.min(totalRadicalPages, p + 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* RADICAL DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedRadicalModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedRadicalModal(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedRadicalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Top Display */}
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="w-24 h-24 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-kanji text-6xl font-black flex items-center justify-center border border-indigo-100 dark:border-indigo-900/60 shadow-inner">
                {selectedRadicalModal.radical}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Kangxi #{selectedRadicalModal.kangxiNumber}
                  </span>
                  {selectedRadicalModal.isCore69 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1">
                      <Star size={12} className="fill-current" />
                      <span>Important 69</span>
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-japanese">
                  {selectedRadicalModal.nameJp}
                </h3>
                <div className="text-sm font-mono text-indigo-600 dark:text-indigo-400">
                  {selectedRadicalModal.nameRomaji}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Position (配置)
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {selectedRadicalModal.positionNameJp} ({selectedRadicalModal.position})
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Stroke Count (画数)
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {selectedRadicalModal.strokeCount} strokes
                </div>
              </div>
            </div>

            {/* Meaning in active language (19-lang matrix) */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Meaning ({language.toUpperCase()}):
              </span>
              <div className="text-base font-bold text-slate-900 dark:text-white">
                {selectedRadicalModal.meaningsByLang[language] || selectedRadicalModal.meaningEn}
              </div>
              <div className="text-xs text-slate-500">
                English: {selectedRadicalModal.meaningEn}
              </div>
            </div>

            {/* Example Kanji Characters with direct Study Button */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                {t('kanji.exampleKanji', 'Example Kanji Characters')} ({selectedRadicalModal.exampleKanji.length})
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {selectedRadicalModal.exampleKanji.map((char) => (
                  <button
                    key={char}
                    type="button"
                    onClick={() => handleSelectKanjiFromRadical(char)}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 transition-all flex flex-col items-center justify-center gap-1 group shadow-sm"
                  >
                    <span className="text-2xl font-kanji font-black group-hover:scale-110 transition-transform">
                      {char}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 group-hover:text-white/90">
                      Study ➔
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

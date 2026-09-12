import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Layers, PenTool, BookOpen, ChevronRight, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VOCABULARY_DATA } from '../../data/vocabularyData';
import { KANJI_DATA } from '../../data/kanjiData';
import { GRAMMAR_DATA } from '../../data/grammarData';
import { BUSINESS_VOCABULARY } from '../../data/business/businessVocabularyData';
import { AudioButton } from '../common/AudioButton';

export const GlobalSearch: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, setActiveView, setSelectedGrammarId, setSelectedKanjiId } =
    useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchModalOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return { vocab: [], kanji: [], grammar: [], business: [] };
    const q = query.toLowerCase().trim();

    const vocab = VOCABULARY_DATA.filter(
      (v) =>
        v.word.toLowerCase().includes(q) ||
        v.hiragana.toLowerCase().includes(q) ||
        v.romaji.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q)
    ).slice(0, 5);

    const kanji = KANJI_DATA.filter(
      (k) =>
        k.kanji.toLowerCase().includes(q) ||
        k.meaning.toLowerCase().includes(q) ||
        k.onyomi.some((o) => o.toLowerCase().includes(q)) ||
        k.kunyomi.some((u) => u.toLowerCase().includes(q))
    ).slice(0, 5);

    const grammar = GRAMMAR_DATA.filter(
      (g) =>
        g.pattern.toLowerCase().includes(q) ||
        g.meaning.toLowerCase().includes(q) ||
        g.structure.toLowerCase().includes(q)
    ).slice(0, 5);

    const business = BUSINESS_VOCABULARY.filter(
      (b) =>
        b.word.toLowerCase().includes(q) ||
        b.reading.toLowerCase().includes(q) ||
        b.meaningEn.toLowerCase().includes(q) ||
        b.businessDomain.toLowerCase().includes(q)
    ).slice(0, 5);

    return { vocab, kanji, grammar, business };
  }, [query]);

  if (!searchModalOpen) return null;

  const hasResults =
    searchResults.vocab.length > 0 ||
    searchResults.kanji.length > 0 ||
    searchResults.grammar.length > 0 ||
    searchResults.business.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setSearchModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search size={20} className="text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Japanese words, Kanji, grammar, meanings..."
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-1"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="px-2 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Search Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm">Type any Kanji, Hiragana, English meaning, or grammar pattern.</p>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">日 (Kanji)</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">学生 (Vocab)</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">なければならない (Grammar)</span>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching with English meaning or Hiragana.</p>
            </div>
          ) : (
            <>
              {/* Vocabulary Results */}
              {searchResults.vocab.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <Layers size={14} /> Vocabulary ({searchResults.vocab.length})
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.vocab.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => {
                          setActiveView('vocabulary');
                          setSearchModalOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center text-base">
                            {v.kanji || v.hiragana[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white">{v.word}</span>
                              <span className="text-xs text-slate-400">{v.hiragana}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                                {v.level}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{v.meaning}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <AudioButton text={v.word} size="sm" />
                          <ChevronRight size={16} className="text-slate-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kanji Results */}
              {searchResults.kanji.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <PenTool size={14} /> Kanji ({searchResults.kanji.length})
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.kanji.map((k) => (
                      <div
                        key={k.id}
                        onClick={() => {
                          setSelectedKanjiId(k.id);
                          setActiveView('kanji');
                          setSearchModalOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold font-kanji flex items-center justify-center text-xl">
                            {k.kanji}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white">{k.kanji}</span>
                              <span className="text-xs text-slate-400">{k.onyomi.join(', ')}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold">
                                {k.level} • {k.strokeCount} strokes
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{k.meaning}</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Results */}
              {searchResults.grammar.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <BookOpen size={14} /> Grammar ({searchResults.grammar.length})
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.grammar.map((g) => (
                      <div
                        key={g.id}
                        onClick={() => {
                          setSelectedGrammarId(g.id);
                          setActiveView('grammar');
                          setSearchModalOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-brand-600 dark:text-brand-400">{g.pattern}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                              {g.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{g.meaning}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{g.structure}</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Business Japanese Results */}
              {searchResults.business.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <Briefcase size={14} /> Business Japanese ({searchResults.business.length})
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.business.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          setActiveView('business');
                          setSearchModalOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-sm">
                            {b.word.slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white">{b.word}</span>
                              <span className="text-xs text-slate-400">{b.reading}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold uppercase">
                                {b.businessDomain}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{b.meaningEn}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <AudioButton text={b.word} size="sm" />
                          <ChevronRight size={16} className="text-slate-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

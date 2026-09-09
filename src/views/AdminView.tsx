import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Plus,
  Edit2,
  Trash2,
  Layers,
  PenTool,
  BookOpen,
  FileText,
  Award,
  Search,
  CheckCircle2,
  X,
  Save,
} from 'lucide-react';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { KANJI_DATA } from '../data/kanjiData';
import { GRAMMAR_DATA } from '../data/grammarData';
import { READING_DATA } from '../data/readingData';
import { JLPTLevel, VocabularyItem } from '../types';

export const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'kanji' | 'grammar' | 'reading' | 'reports'>('vocab');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel | 'ALL'>('ALL');

  // Local state copy for vocabulary
  const [vocabList, setVocabList] = useState(VOCABULARY_DATA);

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Partial<VocabularyItem> | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const [adminPage, setAdminPage] = useState(1);
  const ADMIN_PAGE_SIZE = 50;

  const filteredVocab = useMemo(() => {
    return vocabList.filter((v) => {
      if (selectedLevel !== 'ALL' && v.level !== selectedLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          v.word.toLowerCase().includes(q) ||
          v.hiragana.toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [vocabList, selectedLevel, searchQuery]);

  const totalAdminPages = Math.ceil(filteredVocab.length / ADMIN_PAGE_SIZE) || 1;
  const paginatedAdminVocab = useMemo(() => {
    const start = (adminPage - 1) * ADMIN_PAGE_SIZE;
    return filteredVocab.slice(start, start + ADMIN_PAGE_SIZE);
  }, [filteredVocab, adminPage, ADMIN_PAGE_SIZE]);

  const handleDeleteVocab = (id: string) => {
    if (confirm('Are you sure you want to delete this vocabulary item?')) {
      setVocabList((prev) => prev.filter((v) => v.id !== id));
      showToast('Vocabulary item deleted successfully.');
    }
  };

  const handleSaveVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem?.word || !editItem?.hiragana || !editItem?.meaning) {
      alert('Please fill in word, hiragana, and meaning.');
      return;
    }

    if (editItem.id) {
      // Edit existing
      setVocabList((prev) =>
        prev.map((v) => (v.id === editItem.id ? ({ ...v, ...editItem } as VocabularyItem) : v))
      );
      showToast(`Updated vocabulary: ${editItem.word}`);
    } else {
      // Create new
      const newItem: VocabularyItem = {
        id: 'v-custom-' + Date.now(),
        word: editItem.word,
        kanji: editItem.kanji || editItem.word,
        hiragana: editItem.hiragana,
        romaji: editItem.romaji || '',
        meaning: editItem.meaning,
        partOfSpeech: editItem.partOfSpeech || 'Noun',
        level: editItem.level || 'N5',
        difficulty: 1,
        exampleJp: editItem.exampleJp || `${editItem.word}です。`,
        exampleReading: editItem.exampleReading || editItem.hiragana,
        exampleEn: editItem.exampleEn || editItem.meaning,
        tags: ['custom'],
      };
      setVocabList((prev) => [newItem, ...prev]);
      showToast(`Created new vocabulary: ${newItem.word}`);
    }

    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert size={14} /> Curriculum Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Admin Studio & Content Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create, edit, search, and manage JLPT educational datasets across all N5–N1 levels.
          </p>
        </div>

        <button
          onClick={() => {
            setEditItem({ level: 'N5', partOfSpeech: 'Noun' });
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Plus size={16} /> Add New Vocabulary
        </button>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} /> {toastMsg}
        </div>
      )}

      {/* Dataset Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Vocabulary Items</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {vocabList.length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Kanji Characters</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {KANJI_DATA.length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Grammar Patterns</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {GRAMMAR_DATA.length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Reading Passages</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {READING_DATA.length}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedLevel === lvl
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search content..."
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold">
              <tr>
                <th className="p-4">Word / Kanji</th>
                <th className="p-4">Reading</th>
                <th className="p-4">Meaning</th>
                <th className="p-4">Level</th>
                <th className="p-4">Part of Speech</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedAdminVocab.map((item: VocabularyItem) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-4 font-bold font-japanese text-sm text-slate-900 dark:text-white">
                    {item.word}
                  </td>
                  <td className="p-4 font-japanese text-slate-600 dark:text-slate-300">
                    {item.hiragana}
                  </td>
                  <td className="p-4 font-semibold text-brand-600 dark:text-brand-400">
                    {item.meaning}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">
                      {item.level}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{item.partOfSpeech}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditItem(item);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteVocab(item.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Admin Pagination Toolbar */}
        {totalAdminPages > 1 && (
          <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Showing {Math.min(filteredVocab.length, (adminPage - 1) * ADMIN_PAGE_SIZE + 1)}–
              {Math.min(filteredVocab.length, adminPage * ADMIN_PAGE_SIZE)} of {filteredVocab.length} items
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={adminPage <= 1}
                onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Previous
              </button>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Page {adminPage} of {totalAdminPages}
              </span>
              <button
                type="button"
                disabled={adminPage >= totalAdminPages}
                onClick={() => setAdminPage((p) => Math.min(totalAdminPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 p-6 sm:p-8 space-y-6 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {editItem?.id ? 'Edit Vocabulary Item' : 'Create New Vocabulary Item'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveVocab} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Word (Kanji / Kana) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editItem?.word || ''}
                    onChange={(e) => setEditItem((prev) => ({ ...prev, word: e.target.value }))}
                    placeholder="e.g. 友達"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Hiragana Reading *
                  </label>
                  <input
                    type="text"
                    required
                    value={editItem?.hiragana || ''}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, hiragana: e.target.value }))
                    }
                    placeholder="e.g. ともだち"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    English Meaning *
                  </label>
                  <input
                    type="text"
                    required
                    value={editItem?.meaning || ''}
                    onChange={(e) => setEditItem((prev) => ({ ...prev, meaning: e.target.value }))}
                    placeholder="e.g. friend"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    JLPT Level
                  </label>
                  <select
                    value={editItem?.level || 'N5'}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, level: e.target.value as JLPTLevel }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
                  >
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Example Japanese Sentence
                </label>
                <input
                  type="text"
                  value={editItem?.exampleJp || ''}
                  onChange={(e) => setEditItem((prev) => ({ ...prev, exampleJp: e.target.value }))}
                  placeholder="e.g. 友達とカフェへ行きました。"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save size={16} /> Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

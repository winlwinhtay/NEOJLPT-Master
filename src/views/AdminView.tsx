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
  Search,
  CheckCircle2,
  X,
  Save,
  Sliders,
  RotateCcw,
  Target,
  Calendar,
  Sparkles,
  TrendingUp,
  Download,
  Upload,
  Clock,
} from 'lucide-react';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { KANJI_DATA } from '../data/kanjiData';
import { GRAMMAR_DATA } from '../data/grammarData';
import { READING_DATA } from '../data/readingData';
import { JLPTLevel, VocabularyItem, KanjiItem, GrammarItem, ReadingLesson } from '../types';
import { CurriculumPlannerConfig } from '../types/studyPlan';
import { StudyPlannerService, DEFAULT_CURRICULUM_CONFIG } from '../services/studyPlannerService';
import { StorageService } from '../services/storageService';

type AdminTab = 'vocab' | 'kanji' | 'grammar' | 'reading' | 'planner' | 'review';


export interface JapaneseReviewItem {
  id: string;
  level: JLPTLevel;
  module: 'Vocabulary' | 'Grammar' | 'Kanji' | 'Reading' | 'Speaking';
  category: 'Incorrect Grammar' | 'Level Classification' | 'Naturalness' | 'Translation' | 'Typographical';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  contentId: string;
  title: string;
  originalText: string;
  originalMeaning: string;
  originalExample?: string;
  proposedCorrection: string;
  proposedExample?: string;
  issueDescription: string;
  reviewerNotes: string;
  status: 'pending' | 'approved' | 'rejected' | 'verified';
}

const INITIAL_REVIEW_QUEUE: JapaneseReviewItem[] = [
  {
    id: 'REV-001',
    level: 'N5',
    module: 'Vocabulary',
    category: 'Naturalness',
    severity: 'HIGH',
    contentId: 'v-n5-gen-00042',
    title: 'Synthetic Prefix Compound: 超食べる',
    originalText: '超食べる (ちょうたべる)',
    originalMeaning: 'to eat (Pattern #42)',
    originalExample: '超食べるを用いた実用的な日本語例文です。',
    proposedCorrection: '食べる (たべる) — Retain standard verb; purge synthetic compound prefix.',
    proposedExample: '毎日、朝ごはんをしっかり食べます。',
    issueDescription: 'Procedural generator synthesized unnatural compound by prefixing 超 to 食べる with template meaning.',
    reviewerNotes: 'Verified non-standard Japanese. Recommended for removal.',
    status: 'pending',
  },
  {
    id: 'REV-002',
    level: 'N4',
    module: 'Grammar',
    category: 'Level Classification',
    severity: 'MEDIUM',
    contentId: 'g-n5-034',
    title: 'Cross-Level Placement: 〜すぎる (Excess)',
    originalText: '〜すぎる (Verb stem / Adj stem + すぎる)',
    originalMeaning: 'Too much / excessive',
    originalExample: '昨日はお酒を飲みすぎました。',
    proposedCorrection: 'Keep in N5 as basic Te/Stem form; cross-reference in N4 Compound Verb unit.',
    proposedExample: 'この部屋は狭すぎます。',
    issueDescription: 'JLPT prep curricula vary between late N5 and early N4 for 〜すぎる. Requires level taxonomy consensus.',
    reviewerNotes: 'Approved as dual-level foundational grammar.',
    status: 'verified',
  },
  {
    id: 'REV-003',
    level: 'N1',
    module: 'Grammar',
    category: 'Incorrect Grammar',
    severity: 'CRITICAL',
    contentId: 'g-n1-003',
    title: 'Formation Restriction: 〜まじき',
    originalText: 'Noun + まじき / Verb [any form] + まじき',
    originalMeaning: 'Must not do / Unforgivable for someone in that role',
    originalExample: 'プロとして言うまじき言葉だ。',
    proposedCorrection: 'Strict formation: Noun + にあるまじき OR Verb [辞書形] + まじき (Strictly dictionary form; never past/negative).',
    proposedExample: '指導者にあるまじき暴言だ。',
    issueDescription: 'Explanation was missing the strict restriction requiring either にあるまじき or Verb dictionary form.',
    reviewerNotes: 'Corrected formation formula in canonical dataset.',
    status: 'approved',
  },
  {
    id: 'REV-004',
    level: 'N2',
    module: 'Vocabulary',
    category: 'Translation',
    severity: 'MEDIUM',
    contentId: 'v-n2-001',
    title: 'Contextual Definition Nuance: 把握 (はあく)',
    originalText: '把握 (はあく)',
    originalMeaning: 'grasp',
    originalExample: '現状を把握する。',
    proposedCorrection: 'Grasp / Comprehend / Understand fully (Clarify mental comprehension, not physical grip).',
    proposedExample: '事態の全容を正確に把握する必要があります。',
    issueDescription: 'English definition "grasp" can mislead students into physical gripping rather than abstract mental understanding.',
    reviewerNotes: 'Added contextual clarification.',
    status: 'pending',
  },
  {
    id: 'REV-005',
    level: 'N3',
    module: 'Speaking',
    category: 'Typographical',
    severity: 'LOW',
    contentId: 'spk-n3-01',
    title: 'Punctuation & Furigana Tokenization: 先約がありまして',
    originalText: 'あいにく 先約がありまして、参加できそうに ありません。',
    originalMeaning: 'Unfortunately I have a previous engagement...',
    originalExample: 'あいにく先約がありまして...',
    proposedCorrection: 'Standardize furigana spacing without half-width Latin spacing in Japanese script.',
    proposedExample: 'あいにく先約がありまして、参加できそうにありません。',
    issueDescription: 'Half-width spaces accidentally separated Japanese speech tokens.',
    reviewerNotes: 'Applied standard Japanese punctuation.',
    status: 'pending',
  },
];

export const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('vocab');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel | 'ALL'>('ALL');

  // Local state copy for vocabulary
  const [vocabList, setVocabList] = useState(VOCABULARY_DATA);

  // Add / Edit Modal state for Vocab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Partial<VocabularyItem> | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  // Human Review Queue State
  const [reviewQueue, setReviewQueue] = useState<JapaneseReviewItem[]>(() => {
    const stored = StorageService.loadReviewItems<JapaneseReviewItem>();
    const ids = new Set(stored.map((s) => s.id));
    const merged = [...stored, ...INITIAL_REVIEW_QUEUE.filter((i) => !ids.has(i.id))];
    return merged;
  });
  const [reviewFilterCategory, setReviewFilterCategory] = useState<string>('ALL');
  const [reviewFilterStatus, setReviewFilterStatus] = useState<string>('ALL');

  const filteredReviewQueue = useMemo(() => {
    return reviewQueue.filter((item) => {
      if (reviewFilterCategory !== 'ALL' && item.category !== reviewFilterCategory) return false;
      if (reviewFilterStatus !== 'ALL' && item.status !== reviewFilterStatus) return false;
      if (selectedLevel !== 'ALL' && item.level !== selectedLevel) return false;
      return true;
    });
  }, [reviewQueue, reviewFilterCategory, reviewFilterStatus, selectedLevel]);

  const handleUpdateReviewStatus = (id: string, newStatus: JapaneseReviewItem['status']) => {
    setReviewQueue((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
      StorageService.saveReviewItems(updated);
      return updated;
    });
    showToast(`Review item ${id} marked as ${newStatus.toUpperCase()}.`);
  };

  const handleUpdateReviewNotes = (id: string, notes: string) => {
    setReviewQueue((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, reviewerNotes: notes } : item));
      StorageService.saveReviewItems(updated);
      return updated;
    });
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(reviewQueue, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jlpt-review-queue-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported review queue as JSON.');
  };

  const handleExportCSV = () => {
    const headers = ['id', 'level', 'module', 'category', 'severity', 'title', 'status', 'reviewerNotes'];
    const rows = reviewQueue.map((item) => [
      item.id,
      item.level,
      item.module,
      item.category,
      item.severity,
      `"${(item.title || '').replace(/"/g, '""')}"`,
      item.status,
      `"${(item.reviewerNotes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jlpt-review-queue-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported review queue as CSV.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          const map = new Map<string, JapaneseReviewItem>();
          reviewQueue.forEach((item) => map.set(item.id, item));
          imported.forEach((item) => {
            if (item.id) map.set(item.id, item);
          });
          const merged = Array.from(map.values());
          setReviewQueue(merged);
          StorageService.saveReviewItems(merged);
          showToast(`Imported and merged ${imported.length} review items.`);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };


  // Study Planner Config State
  const [plannerConfig, setPlannerConfig] = useState<CurriculumPlannerConfig>(() =>
    StudyPlannerService.getConfig()
  );

  // Simulator test inputs
  const [simCurrentLevel, setSimCurrentLevel] = useState<JLPTLevel | 'beginner'>('N5');
  const [simTargetLevel, setSimTargetLevel] = useState<JLPTLevel>('N3');
  const [simDaysPerWeek, setSimDaysPerWeek] = useState<number>(5);
  const [simDailyMinutes, setSimDailyMinutes] = useState<number>(45);
  const [simIntensity, setSimIntensity] = useState<'relaxed' | 'balanced' | 'intensive'>('balanced');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const [adminPage, setAdminPage] = useState(1);
  const ADMIN_PAGE_SIZE = 40;

  // Filtered Vocab
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

  // Filtered Kanji
  const filteredKanji = useMemo(() => {
    return KANJI_DATA.filter((k) => {
      if (selectedLevel !== 'ALL' && k.level !== selectedLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          k.kanji.includes(q) ||
          k.meaning.toLowerCase().includes(q) ||
          k.onyomi.some((o) => o.toLowerCase().includes(q)) ||
          k.kunyomi.some((ku) => ku.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedLevel, searchQuery]);

  // Filtered Grammar
  const filteredGrammar = useMemo(() => {
    return GRAMMAR_DATA.filter((g) => {
      if (selectedLevel !== 'ALL' && g.level !== selectedLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          g.pattern.toLowerCase().includes(q) ||
          g.meaning.toLowerCase().includes(q) ||
          g.structure.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedLevel, searchQuery]);

  // Filtered Reading
  const filteredReading = useMemo(() => {
    return READING_DATA.filter((r) => {
      if (selectedLevel !== 'ALL' && r.level !== selectedLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.passagePlain.toLowerCase().includes(q) ||
          r.translationEn.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedLevel, searchQuery]);

  // Current active list length for pagination
  const currentListLength = useMemo(() => {
    switch (activeTab) {
      case 'vocab':
        return filteredVocab.length;
      case 'kanji':
        return filteredKanji.length;
      case 'grammar':
        return filteredGrammar.length;
      case 'reading':
        return filteredReading.length;
      default:
        return 0;
    }
  }, [activeTab, filteredVocab.length, filteredKanji.length, filteredGrammar.length, filteredReading.length]);

  const totalAdminPages = Math.ceil(currentListLength / ADMIN_PAGE_SIZE) || 1;

  const paginatedVocab = useMemo(() => {
    const start = (adminPage - 1) * ADMIN_PAGE_SIZE;
    return filteredVocab.slice(start, start + ADMIN_PAGE_SIZE);
  }, [filteredVocab, adminPage]);

  const paginatedKanji = useMemo(() => {
    const start = (adminPage - 1) * ADMIN_PAGE_SIZE;
    return filteredKanji.slice(start, start + ADMIN_PAGE_SIZE);
  }, [filteredKanji, adminPage]);

  const paginatedGrammar = useMemo(() => {
    const start = (adminPage - 1) * ADMIN_PAGE_SIZE;
    return filteredGrammar.slice(start, start + ADMIN_PAGE_SIZE);
  }, [filteredGrammar, adminPage]);

  const paginatedReading = useMemo(() => {
    const start = (adminPage - 1) * ADMIN_PAGE_SIZE;
    return filteredReading.slice(start, start + ADMIN_PAGE_SIZE);
  }, [filteredReading, adminPage]);

  // Reset pagination on tab change or filter
  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setAdminPage(1);
    setSearchQuery('');
  };

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
      setVocabList((prev) =>
        prev.map((v) => (v.id === editItem.id ? ({ ...v, ...editItem } as VocabularyItem) : v))
      );
      showToast(`Updated vocabulary: ${editItem.word}`);
    } else {
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

  // Study Planner Config Actions
  const handleSavePlannerConfig = () => {
    StorageService.saveCurriculumConfig(plannerConfig);
    showToast('Adaptive Planner configuration saved successfully!');
  };

  const handleResetPlannerConfig = () => {
    if (confirm('Reset planner engine configuration to default learning science parameters?')) {
      setPlannerConfig(DEFAULT_CURRICULUM_CONFIG);
      StorageService.saveCurriculumConfig(DEFAULT_CURRICULUM_CONFIG);
      showToast('Planner parameters reset to learning science defaults.');
    }
  };

  // Simulation calculations
  const simCapacity = simDaysPerWeek * (simDailyMinutes / 60);
  const simHours = StudyPlannerService.calculateRequiredHours(
    simCurrentLevel,
    simTargetLevel,
    simIntensity,
    plannerConfig
  );
  const simWeeks = simCapacity > 0 ? Math.ceil(simHours / simCapacity) : 0;
  const simFinishDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + simWeeks * 7);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }, [simWeeks]);

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
            Create, edit, and configure JLPT educational datasets and tuning rules for the Adaptive Study Planner.
          </p>
        </div>

        {activeTab === 'vocab' && (
          <button
            onClick={() => {
              setEditItem({ level: 'N5', partOfSpeech: 'Noun' });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Plus size={16} /> Add New Vocabulary
          </button>
        )}

        {activeTab === 'planner' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetPlannerConfig}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={14} /> Reset Defaults
            </button>
            <button
              onClick={handleSavePlannerConfig}
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save size={16} /> Save Configuration
            </button>
          </div>
        )}
      </div>

      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle2 size={16} /> {toastMsg}
        </div>
      )}

      {/* Dataset Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <button
          onClick={() => handleTabChange('vocab')}
          className={`p-4 sm:p-5 text-left rounded-2xl border transition-all ${
            activeTab === 'vocab'
              ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-300 dark:border-brand-700 shadow-sm ring-2 ring-brand-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Vocabulary</span>
            <Layers size={14} className="text-brand-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {vocabList.length}
          </div>
        </button>

        <button
          onClick={() => handleTabChange('kanji')}
          className={`p-4 sm:p-5 text-left rounded-2xl border transition-all ${
            activeTab === 'kanji'
              ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 shadow-sm ring-2 ring-indigo-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Kanji</span>
            <PenTool size={14} className="text-indigo-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {KANJI_DATA.length}
          </div>
        </button>

        <button
          onClick={() => handleTabChange('grammar')}
          className={`p-4 sm:p-5 text-left rounded-2xl border transition-all ${
            activeTab === 'grammar'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 shadow-sm ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Grammar</span>
            <BookOpen size={14} className="text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {GRAMMAR_DATA.length}
          </div>
        </button>

        <button
          onClick={() => handleTabChange('reading')}
          className={`p-4 sm:p-5 text-left rounded-2xl border transition-all ${
            activeTab === 'reading'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-sm ring-2 ring-amber-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Reading</span>
            <FileText size={14} className="text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {READING_DATA.length}
          </div>
        </button>

        <button
          onClick={() => handleTabChange('planner')}
          className={`p-4 sm:p-5 text-left rounded-2xl border transition-all col-span-2 sm:col-span-1 ${
            activeTab === 'planner'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 shadow-sm ring-2 ring-rose-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Planner Engine</span>
            <Sliders size={14} className="text-rose-500" />
          </div>
          <div className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1">
            <Sparkles size={13} /> Multipliers & Rules
          </div>
        </button>

        <button
          onClick={() => handleTabChange('review')}
          className={`p-4 sm:p-5 text-left rounded-2xl border transition-all col-span-2 sm:col-span-1 ${
            activeTab === 'review'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-sm ring-2 ring-amber-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Review Queue</span>
            <ShieldAlert size={14} className="text-amber-500" />
          </div>
          <div className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
            {reviewQueue.filter(r => r.status === 'pending').length} Needs Review
          </div>
        </button>
      </div>

      {/* TAB CONTENT: STUDY PLANNER ENGINE CONFIG */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          {/* Overview Info Banner */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-rose-500/20 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
                <Sliders size={12} /> Adaptive Sizing Engine
              </span>
              <h2 className="text-lg sm:text-xl font-bold mt-2">
                Curriculum Timing Benchmarks & Learning Science Multipliers
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Adjust baseline study durations, difficulty multipliers, intensity pacing, and phase distributions.
                Changes here immediately recalibrate how daily tasks and completion dates are generated for all learners.
              </p>
            </div>
          </div>

          {/* Section 1: Item Durations */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Clock size={16} className="text-brand-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Item Duration Benchmarks (Minutes per Item)
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Vocab (New)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={plannerConfig.durations.vocabNewMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, vocabNewMinutes: parseFloat(e.target.value) || 2.5 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Vocab (Review / SRS)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    min="0.2"
                    value={plannerConfig.durations.vocabReviewMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, vocabReviewMinutes: parseFloat(e.target.value) || 0.75 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Kanji (New Character)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={plannerConfig.durations.kanjiNewMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, kanjiNewMinutes: parseFloat(e.target.value) || 3.5 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Kanji (SRS Review)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.3"
                    value={plannerConfig.durations.kanjiReviewMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, kanjiReviewMinutes: parseFloat(e.target.value) || 1.0 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Grammar (Basic Lesson)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="2"
                    value={plannerConfig.durations.grammarBasicMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, grammarBasicMinutes: parseFloat(e.target.value) || 5.0 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Grammar (Advanced / Complex)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="3"
                    value={plannerConfig.durations.grammarComplexMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, grammarComplexMinutes: parseFloat(e.target.value) || 8.0 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Reading (Short Passage)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="3"
                    value={plannerConfig.durations.readingShortMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, readingShortMinutes: parseFloat(e.target.value) || 8.0 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Reading (Medium Passage)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="5"
                    value={plannerConfig.durations.readingMediumMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, readingMediumMinutes: parseFloat(e.target.value) || 14.0 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Listening Task
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="3"
                    value={plannerConfig.durations.listeningMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, listeningMinutes: parseFloat(e.target.value) || 8.0 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Practice (Per Question)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={plannerConfig.durations.practicePerQuestionMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, practicePerQuestionMinutes: parseFloat(e.target.value) || 1.5 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Mock Section Buffer
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="5"
                    min="15"
                    value={plannerConfig.durations.mockSectionMinutes}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        durations: { ...prev.durations, mockSectionMinutes: parseFloat(e.target.value) || 30.0 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Level Baseline Target Hours & Phase Weights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level Target Hours */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Target size={16} className="text-indigo-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Baseline Target Study Hours per Level
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Recommended total cumulative study hours based on official Japan Foundation JLPT studies.
              </p>
              <div className="grid grid-cols-5 gap-2">
                {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                  <div key={lvl}>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1 text-center">
                      {lvl}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="10"
                        min="50"
                        value={plannerConfig.levelTargetHours[lvl]}
                        onChange={(e) =>
                          setPlannerConfig((prev) => ({
                            ...prev,
                            levelTargetHours: {
                              ...prev.levelTargetHours,
                              [lvl]: parseInt(e.target.value, 10) || 150,
                            },
                          }))
                        }
                        className="w-full px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-center text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Distribution Weights */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <TrendingUp size={16} className="text-emerald-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Phase Distribution Weights (Ratio of Total Curriculum)
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    1. Foundation
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.05"
                    max="0.5"
                    value={plannerConfig.phaseWeights.foundation}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        phaseWeights: { ...prev.phaseWeights, foundation: parseFloat(e.target.value) || 0.15 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    2. Core Curriculum
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.2"
                    max="0.8"
                    value={plannerConfig.phaseWeights.core_curriculum}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        phaseWeights: { ...prev.phaseWeights, core_curriculum: parseFloat(e.target.value) || 0.45 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    3. Integrated Practice
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.05"
                    max="0.4"
                    value={plannerConfig.phaseWeights.integrated_practice}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        phaseWeights: { ...prev.phaseWeights, integrated_practice: parseFloat(e.target.value) || 0.2 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    4. Exam Prep
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.05"
                    max="0.4"
                    value={plannerConfig.phaseWeights.exam_preparation}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        phaseWeights: { ...prev.phaseWeights, exam_preparation: parseFloat(e.target.value) || 0.15 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    5. Final Review
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="0.2"
                    value={plannerConfig.phaseWeights.final_review}
                    onChange={(e) =>
                      setPlannerConfig((prev) => ({
                        ...prev,
                        phaseWeights: { ...prev.phaseWeights, final_review: parseFloat(e.target.value) || 0.05 },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Live Simulator & Sanity Check */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
              <Calendar size={16} className="text-amber-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Live Formula Simulator & Sanity Check
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test how your duration and multiplier rules translate into weeks, hours, and finish dates for different learner profiles.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Current Level
                </label>
                <select
                  value={simCurrentLevel}
                  onChange={(e) => setSimCurrentLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="beginner">Beginner (0)</option>
                  <option value="N5">N5</option>
                  <option value="N4">N4</option>
                  <option value="N3">N3</option>
                  <option value="N2">N2</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Target Level
                </label>
                <select
                  value={simTargetLevel}
                  onChange={(e) => setSimTargetLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="N5">N5</option>
                  <option value="N4">N4</option>
                  <option value="N3">N3</option>
                  <option value="N2">N2</option>
                  <option value="N1">N1</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Days / Week
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={simDaysPerWeek}
                  onChange={(e) => setSimDaysPerWeek(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Minutes / Day
                </label>
                <input
                  type="number"
                  min="15"
                  max="300"
                  step="5"
                  value={simDailyMinutes}
                  onChange={(e) => setSimDailyMinutes(parseInt(e.target.value, 10) || 30)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Pacing Intensity
                </label>
                <select
                  value={simIntensity}
                  onChange={(e) => setSimIntensity(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="relaxed">Relaxed (Paced)</option>
                  <option value="balanced">Balanced (Standard)</option>
                  <option value="intensive">Intensive (Accelerated)</option>
                </select>
              </div>
            </div>

            {/* Simulation Results Banner */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Commitment</span>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {simCapacity.toFixed(1)} hrs / week
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Sized Hours</span>
                <div className="text-base font-black text-indigo-600 dark:text-indigo-400">
                  {simHours} hours
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Estimated Duration</span>
                <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  {simWeeks} weeks (~{(simWeeks / 4.3).toFixed(1)} months)
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Target Completion Date</span>
                <div className="text-base font-black text-brand-600 dark:text-brand-400">
                  {simFinishDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* TAB CONTENT: JAPANESE CONTENT HUMAN REVIEW QUEUE */}
      {activeTab === 'review' && (
        <div className="space-y-6">
          {/* Overview Banner */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-amber-500/20 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
                <ShieldAlert size={12} /> Expert Pedagogical Review
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                Japanese Content Quality & Pedagogical Review Queue
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Review flagged Japanese linguistic anomalies, unnatural synthetic items, level classification disputes, and nuanced translations.
                Approve verified items, edit proposed corrections, or reject non-standard content before production deployment.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['ALL', 'Incorrect Grammar', 'Level Classification', 'Naturalness', 'Translation', 'Typographical'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setReviewFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    reviewFilterCategory === cat
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'Incorrect Grammar' && '🔴 '}
                  {cat === 'Level Classification' && '🟠 '}
                  {cat === 'Naturalness' && '🟡 '}
                  {cat === 'Translation' && '🟡 '}
                  {cat === 'Typographical' && '🔵 '}
                  {cat}
                </button>
              ))}
            </div>

            {/* Status Filter & Export/Import Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                {['ALL', 'pending', 'approved', 'verified', 'rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setReviewFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      reviewFilterStatus === st
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1" />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  title="Export Queue as JSON"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Download size={14} /> JSON
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  title="Export Queue as CSV"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Download size={14} /> CSV
                </button>
                <label
                  title="Import Decisions from JSON"
                  className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Upload size={14} /> Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Review Cards List */}
          <div className="space-y-4">
            {filteredReviewQueue.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-bold">
                      {item.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-extrabold text-[10px]">
                      {item.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-[10px]">
                      {item.module}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.severity === 'CRITICAL'
                          ? 'bg-rose-500 text-white'
                          : item.severity === 'HIGH'
                          ? 'bg-orange-500 text-white'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {item.severity}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {item.title}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                      item.status === 'verified'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : item.status === 'approved'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : item.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Problem statement */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">Audit Finding: </span>
                  {item.issueDescription}
                </div>

                {/* Before / After Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current Original */}
                  <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1">
                      Current Content
                    </span>
                    <div className="font-japanese font-bold text-base text-slate-900 dark:text-white">
                      {item.originalText}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Meaning: {item.originalMeaning}
                    </p>
                    {item.originalExample && (
                      <p className="text-xs font-japanese text-slate-500 italic">
                        Example: {item.originalExample}
                      </p>
                    )}
                  </div>

                  {/* Proposed Correction */}
                  <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                      Proposed Correction / Remediation
                    </span>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.proposedCorrection}
                    </div>
                    {item.proposedExample && (
                      <p className="text-xs font-japanese text-slate-700 dark:text-slate-300">
                        New Example: {item.proposedExample}
                      </p>
                    )}
                  </div>
                </div>

                {/* Reviewer Note Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    Expert Reviewer Notes & Action Rationale
                  </label>
                  <input
                    type="text"
                    value={item.reviewerNotes}
                    onChange={(e) => handleUpdateReviewNotes(item.id, e.target.value)}
                    placeholder="Enter Japanese language expert notes..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
                  />
                </div>

                {/* Action Toolbar */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleUpdateReviewStatus(item.id, 'rejected')}
                    className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-50 transition-all"
                  >
                    Reject Item
                  </button>
                  <button
                    onClick={() => handleUpdateReviewStatus(item.id, 'approved')}
                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Approve Fix
                  </button>
                  <button
                    onClick={() => handleUpdateReviewStatus(item.id, 'verified')}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 size={14} /> Mark Verified
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: DATASET MANAGEMENT (VOCAB / KANJI / GRAMMAR / READING) */}
      {activeTab !== 'planner' && activeTab !== 'review' && (
        <>
          {/* Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Level Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setAdminPage(1);
                  }}
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setAdminPage(1);
                }}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {activeTab === 'vocab' && (
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
                    {paginatedVocab.map((item: VocabularyItem) => (
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
              )}

              {activeTab === 'kanji' && (
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold">
                    <tr>
                      <th className="p-4">Kanji</th>
                      <th className="p-4">Meaning</th>
                      <th className="p-4">Onyomi</th>
                      <th className="p-4">Kunyomi</th>
                      <th className="p-4">Level</th>
                      <th className="p-4">Strokes</th>
                      <th className="p-4">Radicals</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {paginatedKanji.map((k: KanjiItem) => (
                      <tr
                        key={k.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-4 font-black font-japanese text-xl text-indigo-600 dark:text-indigo-400">
                          {k.kanji}
                        </td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                          {k.meaning}
                        </td>
                        <td className="p-4 font-japanese text-slate-600 dark:text-slate-300">
                          {k.onyomi.join(', ') || '—'}
                        </td>
                        <td className="p-4 font-japanese text-slate-600 dark:text-slate-300">
                          {k.kunyomi.join(', ') || '—'}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">
                            {k.level}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{k.strokeCount} strokes</td>
                        <td className="p-4 font-japanese text-slate-600 dark:text-slate-300">
                          {k.radicals?.join(', ') || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'grammar' && (
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold">
                    <tr>
                      <th className="p-4">Pattern</th>
                      <th className="p-4">Meaning</th>
                      <th className="p-4">Structure</th>
                      <th className="p-4">Level</th>
                      <th className="p-4">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {paginatedGrammar.map((g: GrammarItem) => (
                      <tr
                        key={g.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-4 font-bold font-japanese text-sm text-emerald-600 dark:text-emerald-400">
                          {g.pattern}
                        </td>
                        <td className="p-4 font-medium text-slate-900 dark:text-white max-w-xs">
                          {g.meaning}
                        </td>
                        <td className="p-4 font-japanese text-slate-500 max-w-xs truncate">
                          {g.structure || '—'}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">
                            {g.level}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">
                          {g.examples?.length || 0} sentences
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'reading' && (
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold">
                    <tr>
                      <th className="p-4">Passage Title</th>
                      <th className="p-4">Level</th>
                      <th className="p-4">Length</th>
                      <th className="p-4">Questions</th>
                      <th className="p-4">Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {paginatedReading.map((r: ReadingLesson) => (
                      <tr
                        key={r.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-4 font-bold text-amber-600 dark:text-amber-400">
                          {r.title}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">
                            {r.level}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">
                          {r.length}
                        </td>
                        <td className="p-4 text-slate-500">
                          {r.questions?.length || 0} questions
                        </td>
                        <td className="p-4 font-japanese text-slate-600 dark:text-slate-300 max-w-sm truncate">
                          {r.passagePlain.slice(0, 70)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Controls */}
            {totalAdminPages > 1 && (
              <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Showing {Math.min(currentListLength, (adminPage - 1) * ADMIN_PAGE_SIZE + 1)}–
                  {Math.min(currentListLength, adminPage * ADMIN_PAGE_SIZE)} of {currentListLength} items
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={adminPage <= 1}
                    onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
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
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add / Edit Modal for Vocab */}
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
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
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

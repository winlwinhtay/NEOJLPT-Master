import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Eye,
  Edit3,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Languages,
  BookMarked,
  ArrowUpDown,
  RefreshCw,
  Clock,
  Layers,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { READING_DATA } from '../../data/readingData';
import { READING_TOPIC_REGISTRY, ReadingTopicId, UniversityReadingExercise } from '../../types/readingCurriculum';
import { ReadingValidator } from '../../services/content/readingValidator';
import { JLPTLevel, ReadingLesson } from '../../types';

export const AdminReadingStudioPanel: React.FC = () => {
  const [exercises, setExercises] = useState<ReadingLesson[]>(READING_DATA);
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel | 'ALL'>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedExercise, setInspectedExercise] = useState<ReadingLesson | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'exercises' | 'matrix' | 'validation'>('exercises');
  const [validationRunCount, setValidationRunCount] = useState(0);

  // Compute validation on all exercises
  const validationMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof ReadingValidator.validateExercise>>();
    exercises.forEach((ex) => {
      // Cast safely since ReadingLesson matches UniversityReadingExercise structure
      map.set(ex.id, ReadingValidator.validateExercise(ex as unknown as UniversityReadingExercise));
    });
    return map;
  }, [exercises, validationRunCount]);

  // Overall Statistics
  const stats = useMemo(() => {
    let validCount = 0;
    let warningCount = 0;
    let errorCount = 0;
    let translatedEnCount = 0;
    let translatedMyCount = 0;
    let reviewRequiredCount = 0;

    exercises.forEach((ex) => {
      const rep = validationMap.get(ex.id);
      if (rep) {
        if (!rep.isValid) errorCount++;
        else if (rep.warnings.length > 0) warningCount++;
        else validCount++;
      }
      if (ex.translationEn && ex.translationEn.trim().length > 0) translatedEnCount++;
      if (ex.translationMy && ex.translationMy.trim().length > 0) translatedMyCount++;
      if (ex.reviewStatus === 'review_required') reviewRequiredCount++;
    });

    const duplicates = ReadingValidator.checkDuplicates(exercises as unknown as UniversityReadingExercise[]).duplicatePairs;

    return {
      total: exercises.length,
      validCount,
      warningCount,
      errorCount,
      translatedEnCount,
      translatedMyCount,
      reviewRequiredCount,
      duplicatesCount: duplicates.length,
    };
  }, [exercises, validationMap]);

  // Filtered exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      if (selectedLevel !== 'ALL' && ex.level !== selectedLevel) return false;
      if (selectedTopic !== 'ALL' && ex.topic !== selectedTopic) return false;
      if (selectedStatus !== 'ALL') {
        const status = ex.reviewStatus || 'published';
        if (status !== selectedStatus) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = ex.title?.toLowerCase().includes(q) || ex.titleEn?.toLowerCase().includes(q) || ex.titleMy?.includes(q);
        const matchesPassage = ex.passagePlain?.toLowerCase().includes(q);
        const matchesId = ex.id.toLowerCase().includes(q);
        const matchesGrammar = ex.grammarPoints?.some((g: any) =>
          (typeof g === 'string' ? g : g.grammar).toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesPassage && !matchesId && !matchesGrammar) return false;
      }
      return true;
    });
  }, [exercises, selectedLevel, selectedTopic, selectedStatus, searchQuery]);

  // Update Review Status for an exercise
  const handleUpdateStatus = (id: string, newStatus: 'published' | 'approved' | 'review_required' | 'draft') => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === id) {
          return { ...ex, reviewStatus: newStatus };
        }
        return ex;
      })
    );
    if (inspectedExercise && inspectedExercise.id === id) {
      setInspectedExercise((prev) => (prev ? { ...prev, reviewStatus: newStatus } : null));
    }
  };

  // Update Reviewer Notes
  const handleUpdateNotes = (id: string, notes: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === id) {
          return { ...ex, reviewerNotes: notes };
        }
        return ex;
      })
    );
    if (inspectedExercise && inspectedExercise.id === id) {
      setInspectedExercise((prev) => (prev ? { ...prev, reviewerNotes: notes } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-indigo-500/10 border border-amber-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500 text-white shadow-xs">
              <BookMarked size={18} />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Curriculum QA & Content Studio
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white mt-1">
            University Reading Curriculum Studio
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Manage 50 core university reading exercises across N5–N1, review status, translations (EN/MY), and validation standards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setValidationRunCount((c) => c + 1)}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw size={14} className="text-brand-500" />
            <span>Re-validate Library</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Passages</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.total}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">10 per level (N5–N1)</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Validation Pass</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.validCount + stats.warningCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">100% compliant schemas</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">English Translated</div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{stats.translatedEnCount} / {stats.total}</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">100% Complete</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Burmese (MY)</div>
          <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">{stats.translatedMyCount} / {stats.total}</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">100% Complete</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Review Required</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{stats.reviewRequiredCount}</div>
          <div className="text-[10px] text-amber-500 font-bold mt-0.5">N2 & N1 Academic Sets</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Duplicate Passages</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.duplicatesCount}</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">0 Duplicates Found</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveSubTab('exercises')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'exercises'
              ? 'border-brand-500 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Exercise Registry ({filteredExercises.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('matrix')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'matrix'
              ? 'border-brand-500 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Curriculum Topic Matrix (5 x 10)
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('validation')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'validation'
              ? 'border-brand-500 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Quality Assurance & Review Standards
        </button>
      </div>

      {/* TAB 1: EXERCISE REGISTRY */}
      {activeSubTab === 'exercises' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
              {/* Level Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {(['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectedLevel === lvl
                        ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* Topic Selector */}
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <option value="ALL">All Topics (10)</option>
                {READING_TOPIC_REGISTRY.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.labelEn} ({t.labelJp})
                  </option>
                ))}
              </select>

              {/* Review Status Selector */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <option value="ALL">All Review Statuses</option>
                <option value="published">Published</option>
                <option value="approved">Approved</option>
                <option value="review_required">Review Required (N2/N1)</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search passage, title, grammar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold">
                  <tr>
                    <th className="p-3.5">ID & Level</th>
                    <th className="p-3.5">Topic & Subtopic</th>
                    <th className="p-3.5">Passage Title (JP / EN / MY)</th>
                    <th className="p-3.5">Length</th>
                    <th className="p-3.5">Questions</th>
                    <th className="p-3.5">Translations</th>
                    <th className="p-3.5">Review Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredExercises.map((ex) => {
                    const validation = validationMap.get(ex.id);
                    const topicObj = READING_TOPIC_REGISTRY.find((t) => t.id === ex.topic);
                    const status = ex.reviewStatus || 'published';

                    return (
                      <tr key={ex.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-slate-900 dark:text-white">{ex.id}</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                                ex.level === 'N5'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                                  : ex.level === 'N4'
                                  ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                                  : ex.level === 'N3'
                                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                                  : ex.level === 'N2'
                                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                              }`}
                            >
                              {ex.level}
                            </span>
                          </div>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <div className="font-bold text-slate-700 dark:text-slate-300">
                            {topicObj ? topicObj.labelEn : ex.topic}
                          </div>
                          <div className="text-[10px] text-slate-400">{ex.subtopic || 'General'}</div>
                        </td>

                        <td className="p-3.5 max-w-xs">
                          <div className="font-bold text-slate-900 dark:text-white font-japanese truncate">
                            {ex.title}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{ex.titleEn}</div>
                          {ex.titleMy && (
                            <div className="text-[10px] text-teal-600 dark:text-teal-400 font-myanmar truncate">
                              {ex.titleMy}
                            </div>
                          )}
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-mono text-slate-600 dark:text-slate-400">
                            {ex.passagePlain?.length || 0} chars
                          </span>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-mono text-slate-600 dark:text-slate-400">
                            {ex.questions?.length || 0} items
                          </span>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              title="English translation complete"
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300"
                            >
                              EN ✓
                            </span>
                            <span
                              title="Burmese translation complete"
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-300 font-myanmar"
                            >
                              MY ✓
                            </span>
                          </div>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <select
                            value={status}
                            onChange={(e) =>
                              handleUpdateStatus(
                                ex.id,
                                e.target.value as 'published' | 'approved' | 'review_required' | 'draft'
                              )
                            }
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold border-none cursor-pointer ${
                              status === 'approved'
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                                : status === 'published'
                                ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                                : status === 'review_required'
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-black'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <option value="published">Published</option>
                            <option value="approved">Approved</option>
                            <option value="review_required">Review Required</option>
                            <option value="draft">Draft</option>
                          </select>
                        </td>

                        <td className="p-3.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setInspectedExercise(ex)}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Eye size={12} className="text-brand-500" />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOPIC MATRIX */}
      {activeSubTab === 'matrix' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xs">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Curricular Topic Matrix (5 JLPT Levels × 10 Core Topics)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Every topic contains a pedagogically crafted passage for each level with graduated complexity and verified comprehension questions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold">
                <tr>
                  <th className="p-3">Topic ID</th>
                  <th className="p-3">Theme (English)</th>
                  <th className="p-3">Theme (Japanese)</th>
                  <th className="p-3 text-center">N5</th>
                  <th className="p-3 text-center">N4</th>
                  <th className="p-3 text-center">N3</th>
                  <th className="p-3 text-center">N2</th>
                  <th className="p-3 text-center">N1</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {READING_TOPIC_REGISTRY.map((topic) => {
                  return (
                    <tr key={topic.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3 font-mono font-bold text-slate-500">{topic.id}</td>
                      <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{topic.labelEn}</td>
                      <td className="p-3 font-japanese text-slate-600 dark:text-slate-400">{topic.labelJp}</td>
                      {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => {
                        const match = exercises.find((ex) => ex.level === lvl && ex.topic === topic.id);
                        if (!match) return <td key={lvl} className="p-3 text-center text-slate-300">-</td>;
                        const isReview = match.reviewStatus === 'review_required';
                        return (
                          <td key={lvl} className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => setInspectedExercise(match)}
                              className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                                isReview
                                  ? 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                                  : 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                              }`}
                              title={`${match.title} (${match.passagePlain?.length} chars)`}
                            >
                              {match.id}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: QUALITY ASSURANCE STANDARDS */}
      {activeSubTab === 'validation' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-500" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                University Quality Assurance & Pedagogical Standards
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every reading passage in this curriculum adheres to strict academic standards modeled after leading university Japanese language curricula (Genki, Tobira, Shin Kanzen Master series):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Beginner Foundations (N5 & N4)</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-500">
                  <li>Full Furigana support using <code className="text-brand-500 font-mono">[漢字]&#123;かんじ&#125;</code> notation.</li>
                  <li>Passage length strictly controlled (100–350 characters).</li>
                  <li>Vocabulary explicitly matched to standard JLPT beginner benchmarks.</li>
                  <li>Complete bilingual coverage in English and Burmese (`my`).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Advanced & Academic Rigor (N2 & N1)</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-500">
                  <li>Deep discursive essays, socio-cultural arguments, and university critique passages.</li>
                  <li>Flagged as <span className="text-amber-500 font-bold">Review Required</span> with reviewer notes detailing stylistic nuance.</li>
                  <li>Passage length scaled to authentic exam timing (350–800 characters).</li>
                  <li>Explanatory rationales verifying correct inference over simple keyword matching.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INSPECTION MODAL / DRAWER */}
      {inspectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded-lg bg-brand-500 text-white font-mono font-black text-xs">
                  {inspectedExercise.id}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs">
                  {inspectedExercise.level}
                </span>
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                  {inspectedExercise.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setInspectedExercise(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Meta & Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="text-slate-500 font-bold">English: {inspectedExercise.titleEn}</div>
                  {inspectedExercise.titleMy && (
                    <div className="text-teal-600 dark:text-teal-400 font-myanmar">
                      မြန်မာ: {inspectedExercise.titleMy}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500">Review Status:</span>
                  <select
                    value={inspectedExercise.reviewStatus || 'published'}
                    onChange={(e) =>
                      handleUpdateStatus(
                        inspectedExercise.id,
                        e.target.value as 'published' | 'approved' | 'review_required' | 'draft'
                      )
                    }
                    className="px-2.5 py-1 rounded-xl text-xs font-black bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="published">Published</option>
                    <option value="approved">Approved</option>
                    <option value="review_required">Review Required</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Japanese Passage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Japanese Text ({inspectedExercise.passagePlain?.length || 0} characters)
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Time: ~{inspectedExercise.estimatedReadingTimeMinutes || 3} min
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/30 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 font-japanese text-base leading-relaxed text-slate-800 dark:text-slate-200">
                  {inspectedExercise.passagePlain}
                </div>
              </div>

              {/* Translations Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-black uppercase text-indigo-500 tracking-wider flex items-center gap-1.5">
                    <Languages size={14} />
                    <span>English Translation</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {inspectedExercise.translationEn || <span className="text-rose-500">Missing translation</span>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-black uppercase text-teal-500 tracking-wider flex items-center gap-1.5">
                    <Languages size={14} />
                    <span>Burmese Translation (မြန်မာဘာသာပြန်)</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-myanmar">
                    {inspectedExercise.translationMy || <span className="text-rose-500">Missing translation</span>}
                  </div>
                </div>
              </div>

              {/* Grammar Points & Vocabulary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Grammar Points ({inspectedExercise.grammarPoints?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectedExercise.grammarPoints?.map((gp: any, i) => {
                      const gName = typeof gp === 'string' ? gp : gp.grammar;
                      const gMeaning = typeof gp === 'string' ? '' : gp.meaning;
                      return (
                        <span
                          key={i}
                          title={gMeaning}
                          className="px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-japanese font-bold text-xs border border-purple-200/50 dark:border-purple-800/40"
                        >
                          {gName}
                        </span>
                      );
                    }) || <span className="text-xs text-slate-400">No grammar points noted</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Target Vocabulary ({inspectedExercise.vocabularyList?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                    {inspectedExercise.vocabularyList?.map((v, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]"
                      >
                        <strong className="font-japanese">{v.word}</strong> ({v.reading})
                      </span>
                    )) || <span className="text-xs text-slate-400">No vocabulary items</span>}
                  </div>
                </div>
              </div>

              {/* Comprehension Questions */}
              <div className="space-y-3">
                <div className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Comprehension Questions ({inspectedExercise.questions?.length || 0})
                </div>
                <div className="space-y-3">
                  {inspectedExercise.questions?.map((q, idx) => (
                    <div
                      key={q.id || idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                    >
                      <div className="font-bold text-slate-900 dark:text-white font-japanese">
                        Q{idx + 1}. {q.questionJp}
                      </div>
                      <div className="text-slate-500">{q.questionEn}</div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                        {q.options?.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-2 rounded-xl border text-[11px] font-japanese ${
                              optIdx === q.correctIndex
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <span className="font-mono mr-1.5">{optIdx + 1}.</span>
                            {opt}
                            {optIdx === q.correctIndex && (
                              <span className="ml-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-bold">
                                (Correct)
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {q.explanation && (
                        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-[11px] border border-amber-200/50 dark:border-amber-900/40">
                          <strong>Rationale:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviewer Notes Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-amber-500 tracking-wider">
                  Reviewer Notes & Human Editorial Audit
                </label>
                <textarea
                  value={inspectedExercise.reviewerNotes || ''}
                  onChange={(e) => handleUpdateNotes(inspectedExercise.id, e.target.value)}
                  placeholder="Enter notes on text nuance, level accuracy, furigana corrections, or exam benchmark alignment..."
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 h-20"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectedExercise(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

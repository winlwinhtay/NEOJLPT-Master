import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Calendar,
  Check,
} from 'lucide-react';
import { JLPTLevel } from '../../types';
import { ReadingService } from '../../services/content/readingService';
import { READING_TOPIC_REGISTRY } from '../../types/readingCurriculum';

interface ReadingProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLevel: JLPTLevel;
}

export const ReadingProgressModal: React.FC<ReadingProgressModalProps> = ({
  isOpen,
  onClose,
  activeLevel,
}) => {
  const [selectedLevelTab, setSelectedLevelTab] = useState<JLPTLevel>(activeLevel || 'N5');

  if (!isOpen) return null;

  const stats = ReadingService.getReadingStats();
  const progressList = ReadingService.getReadingProgressList();
  const completedIds = ReadingService.getCompletedExerciseIds();
  const levelExercises = ReadingService.getReadingsByLevel(selectedLevelTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/30 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Award size={18} />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                Reading Mastery & Progress Dashboard
              </h2>
              <p className="text-xs text-amber-200/80">
                စာဖတ်စွမ်းရည် လေ့ကျင့်မှု မှတ်တမ်းနှင့် တိုးတက်မှုများ
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Overall Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-center">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Completed Passages</span>
            <span className="text-xl font-black text-amber-600 dark:text-amber-400">
              {stats.totalCompleted} / 50
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Average Accuracy</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.averageScore}%
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Core Library</span>
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">50 Exercises</span>
          </div>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex items-center gap-1.5 px-4 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevelTab(lvl)}
              className={`pb-2.5 px-3 font-bold border-b-2 transition-colors cursor-pointer ${
                selectedLevelTab === lvl
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {lvl} ({stats.byLevel[lvl].completed}/{stats.byLevel[lvl].total})
            </button>
          ))}
        </div>

        {/* Exercise Checklist */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
          <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1">
            <span>Exercises in {selectedLevelTab} (10 Curricular Topics):</span>
            <span>
              {stats.byLevel[selectedLevelTab].completed} of {levelExercises.length} completed
            </span>
          </div>

          <div className="space-y-2">
            {levelExercises.map((ex) => {
              const isDone = completedIds.has(ex.id);
              const progressRec = progressList.find((p) => p.exerciseId === ex.id);
              const topicMeta = READING_TOPIC_REGISTRY.find((t) => t.id === ex.topic);

              return (
                <div
                  key={ex.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                      : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isDone ? <Check size={14} /> : ex.id.split('-').pop()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-japanese font-bold text-sm text-slate-900 dark:text-white truncate">
                          {ex.title}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          ({ex.titleEn})
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{topicMeta?.icon} {topicMeta?.labelEn || ex.topic}</span>
                        <span>•</span>
                        <span>{ex.questions.length} Questions</span>
                        <span>•</span>
                        <span>~{ex.estimatedReadingTimeMinutes || 4} mins</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isDone && progressRec && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                        Score: {progressRec.score}%
                      </span>
                    )}
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                        ex.reviewStatus === 'published'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}
                    >
                      {ex.reviewStatus || 'verified'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

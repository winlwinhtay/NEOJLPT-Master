import React from 'react';
import { X, Check, BookOpen, Layers, PenTool, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUser } from '../../context/UserContext';
import { JLPT_LEVELS } from '../../data/jlptLevels';
import { JLPTLevel } from '../../types';

export const LevelSelectorModal: React.FC = () => {
  const { levelSelectorOpen, setLevelSelectorOpen, activeLevel, setActiveLevel } = useApp();
  const { updateProfile } = useUser();

  if (!levelSelectorOpen) return null;

  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const handleSelect = (level: JLPTLevel) => {
    setActiveLevel(level);
    updateProfile({ targetLevel: level, currentLevel: level });
    setLevelSelectorOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setLevelSelectorOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Select Your JLPT Study Level
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Each level adjusts vocabulary, grammar, reading passages, and mock exams.
            </p>
          </div>
          <button
            onClick={() => setLevelSelectorOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Level List */}
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          {levels.map((lvl) => {
            const info = JLPT_LEVELS[lvl];
            const isSelected = activeLevel === lvl;

            return (
              <div
                key={lvl}
                onClick={() => handleSelect(lvl)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 ${info.badgeColor}`}
                  >
                    {lvl}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {info.title}
                      </h4>
                      <span className="text-xs font-japanese text-slate-500 dark:text-slate-400">
                        {info.nameJp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {info.description}
                    </p>

                    {/* Stats Tags */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Layers size={13} className="text-brand-500" /> ~{info.targetVocab} Vocab
                      </span>
                      <span className="flex items-center gap-1">
                        <PenTool size={13} className="text-indigo-500" /> ~{info.targetKanji} Kanji
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={13} className="text-emerald-500" /> ~{info.targetGrammar} Grammar
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-amber-500" /> {info.examDurationMinutes} min exam
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center">
                      <Check size={18} />
                    </div>
                  ) : (
                    <button className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                      Select
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

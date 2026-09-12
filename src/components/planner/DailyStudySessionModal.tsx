import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Volume2,
  Award,
  Clock,
  RotateCcw,
  Check,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DailyStudyPlan, DailyStudyTask } from '../../types/studyPlan';
import { AudioButton } from '../common/AudioButton';
import { useUser } from '../../context/UserContext';
import { useSRS } from '../../context/SRSContext';

interface DailyStudySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyPlan: DailyStudyPlan;
  onTaskCompleted: (taskId: string, xp: number, minutes: number) => void;
}

export const DailyStudySessionModal: React.FC<DailyStudySessionModalProps> = ({
  isOpen,
  onClose,
  dailyPlan,
  onTaskCompleted,
}) => {
  const { addXP, logActivity } = useUser();
  const { rateItem } = useSRS();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showVocabBack, setShowVocabBack] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [totalSessionMinutes, setTotalSessionMinutes] = useState(0);
  const [totalSessionXP, setTotalSessionXP] = useState(0);

  if (!isOpen) return null;

  const tasks = dailyPlan.tasks || [];
  const currentTask: DailyStudyTask | undefined = tasks[currentTaskIndex];
  const totalTasks = tasks.length;

  const handleNextTask = () => {
    if (!currentTask) return;

    const xp = 35;
    const dur = currentTask.durationMinutes;

    addXP(xp, `Completed task: ${currentTask.title}`);
    onTaskCompleted(currentTask.id, xp, dur);
    setTotalSessionMinutes((prev) => prev + dur);
    setTotalSessionXP((prev) => prev + xp);

    // Log to UserContext activity
    if (currentTask.type.includes('vocab')) logActivity('vocab', 5);
    else if (currentTask.type === 'kanji') logActivity('kanji', 3);
    else if (currentTask.type === 'grammar') logActivity('grammar', 1);
    else if (currentTask.type === 'reading') logActivity('reading', 1);
    else if (currentTask.type === 'listening') logActivity('listening', 1);
    else logActivity('practice', 5);

    setShowVocabBack(false);

    if (currentTaskIndex + 1 < totalTasks) {
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <Zap size={16} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Guided Study Session
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {!sessionCompleted
                  ? `Task ${currentTaskIndex + 1} of ${totalTasks} • ${currentTask?.durationMinutes || 10} minutes`
                  : 'Session Complete 🎉'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Task Content Runner */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!sessionCompleted && currentTask ? (
            <div className="space-y-6 animate-fade-in">
              {/* Task Title Banner */}
              <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 block">
                    {currentTask.type.replace('_', ' ')} • {currentTask.durationMinutes} min
                  </span>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    {currentTask.title}
                  </h2>
                  {currentTask.subtitle && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {currentTask.subtitle}
                    </p>
                  )}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-bold shrink-0">
                  +35 XP
                </span>
              </div>

              {/* Dynamic Task Content Card */}
              {currentTask.contentData ? (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-4">
                  {/* Grammar content */}
                  {currentTask.type === 'grammar' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Structure Formula
                        </span>
                        <div className="font-mono text-xs font-bold text-indigo-900 dark:text-indigo-200">
                          {currentTask.contentData.structure}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Grammatical Explanation
                        </span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {currentTask.contentData.explanation}
                        </p>
                      </div>

                      {currentTask.contentData.examples && currentTask.contentData.examples.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Example Sentences:
                          </span>
                          {currentTask.contentData.examples.slice(0, 2).map((ex: any, idx: number) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 text-xs"
                            >
                              <div>
                                <p className="font-japanese font-bold text-slate-900 dark:text-white">
                                  {ex.jp}
                                </p>
                                <p className="text-slate-400 text-[11px]">{ex.reading}</p>
                                <p className="text-slate-600 dark:text-slate-300 mt-1">{ex.en}</p>
                              </div>
                              <AudioButton text={ex.jp} size="sm" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Kanji content */}
                  {currentTask.type === 'kanji' && (
                    <div className="space-y-4 text-center">
                      <div className="text-6xl font-black font-japanese text-brand-600 dark:text-brand-400 py-2">
                        {currentTask.contentData.kanji}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-left text-xs">
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          <span className="text-[10px] text-slate-400 font-bold block">Onyomi:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {currentTask.contentData.onyomi?.join(', ') || '-'}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          <span className="text-[10px] text-slate-400 font-bold block">Kunyomi:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {currentTask.contentData.kunyomi?.join(', ') || '-'}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left text-xs">
                        <span className="text-[10px] text-slate-400 font-bold block">Meaning:</span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {currentTask.contentData.meaning}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Reading content */}
                  {currentTask.type === 'reading' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 leading-relaxed font-japanese">
                        {currentTask.contentData.passagePlain || currentTask.contentData.passage}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        {currentTask.contentData.translationEn}
                      </p>
                    </div>
                  )}

                  {/* Listening content */}
                  {currentTask.type === 'listening' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">
                          Situation: {currentTask.contentData.situation}
                        </span>
                        <div className="space-y-2">
                          {(currentTask.contentData.dialogue || []).map((line: any, idx: number) => (
                            <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                              <div>
                                <strong className="text-slate-700 dark:text-slate-300">
                                  {line.speaker}:
                                </strong>{' '}
                                <span className="font-japanese text-slate-900 dark:text-white">
                                  {line.text}
                                </span>
                                <p className="text-[11px] text-slate-400">{line.translationEn}</p>
                              </div>
                              <AudioButton text={line.text} size="sm" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback Flashcard Review Style */
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-200 dark:border-slate-700 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {currentTask.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                      Review high-yield patterns and consolidate error retention.
                    </p>
                  </div>
                  {!showVocabBack ? (
                    <button
                      type="button"
                      onClick={() => setShowVocabBack(true)}
                      className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      Show Study Content
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 animate-fade-in">
                      Active recall complete! Proceeding will mark this task finished.
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleNextTask}
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {currentTaskIndex + 1 < totalTasks ? (
                  <>
                    Mark Task Complete & Next <ChevronRight size={18} />
                  </>
                ) : (
                  <>
                    Finish Today's Study Session <Check size={18} />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Session Completed Screen */
            <div className="py-6 text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
                <Award size={40} />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Daily Goal Accomplished
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Today's Plan Complete! 🎉
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                  Fantastic discipline! You successfully finished all scheduled tasks for today.
                </p>
              </div>

              {/* Stats Card */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Time Studied
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {totalSessionMinutes || dailyPlan.allocatedMinutes} min
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    XP Earned
                  </span>
                  <span className="text-lg font-black text-amber-500">
                    +{totalSessionXP || totalTasks * 35} XP
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">
                    Tasks Done
                  </span>
                  <span className="text-lg font-black text-emerald-500">
                    {totalTasks} / {totalTasks}
                  </span>
                </div>
              </div>

              {/* Tomorrow Preview */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-left text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-bold">
                  <Sparkles size={14} /> Tomorrow's Pacing Preview:
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Next scheduled session will focus on Kanji mastery, Contextual Reading, and Dialogue Listening.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                Return to Study Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

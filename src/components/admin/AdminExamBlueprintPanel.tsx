import React, { useState, useMemo } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Headphones,
  BookOpen,
  FileText,
  Sliders,
  Settings,
  Info,
} from 'lucide-react';
import { JLPTLevel } from '../../types/practice';
import {
  OFFICIAL_JLPT_BLUEPRINTS,
  getOfficialBlueprint,
  calculateQuestionBankReadiness,
} from '../../data/examBlueprints';
import { ALL_MOCK_TESTS, getMockTestsByLevel } from '../../data/mockTests';

export const AdminExamBlueprintPanel: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('N5');
  const [simulationSettings, setSimulationSettings] = useState({
    strictListeningSinglePlay: true,
    requireHurdle19: true,
    autoSubmitOnExpiry: true,
    allowPracticePause: true,
  });

  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const blueprint = useMemo(() => getOfficialBlueprint(selectedLevel), [selectedLevel]);
  const mockTests = useMemo(() => getMockTestsByLevel(selectedLevel), [selectedLevel]);

  // Aggregate all questions for this level to evaluate readiness
  const availableQuestions = useMemo(() => {
    const list: any[] = [];
    mockTests.forEach((t) => {
      t.sections.forEach((s) => {
        list.push(...s.questions);
      });
    });
    return list;
  }, [mockTests]);

  const readinessList = useMemo(() => {
    return calculateQuestionBankReadiness(selectedLevel, availableQuestions);
  }, [selectedLevel, availableQuestions]);

  const allSectionsReady = readinessList.every((r) => r.isComplete);

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-indigo-900/50 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-black uppercase">
                Examination Architecture
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black">
                Official Guideline Standards
              </span>
            </div>
            <h2 className="text-2xl font-black">Official Examination Blueprints & Readiness</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Inspect and configure level-specific examination section structures, target item counts,
              authoritative time limits, and content readiness for the Realistic JLPT Simulator.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[140px]">
            <span className="text-[10px] font-bold uppercase text-slate-300">Total Sets</span>
            <div className="text-2xl font-black">{Object.keys(ALL_MOCK_TESTS).length} Sets</div>
            <span className="text-[10px] text-emerald-300 font-bold">5 Sets per Level</span>
          </div>
        </div>
      </div>

      {/* Level Selector Pills */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
          <span>Blueprint Version:</span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
            {blueprint.version}
          </span>
        </div>
      </div>

      {/* Blueprint Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-black">{blueprint.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{blueprint.description}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Total Time</span>
              <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                {blueprint.totalTimeMinutes} min
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Passing Score</span>
              <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {blueprint.passingScore} / 180
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Section Hurdle</span>
              <div className="text-base font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                {blueprint.sectionalHurdle} / 60
              </div>
            </div>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blueprint.sections.map((sec, idx) => {
            const readiness = readinessList.find((r) => r.sectionId === sec.sectionId);

            return (
              <div
                key={sec.sectionId}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black">
                      Section {idx + 1}
                    </span>
                    <span className="font-mono text-slate-400 font-bold flex items-center gap-1">
                      <Clock size={12} /> {sec.timeLimitMinutes} mins
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">{sec.title}</h4>
                    <div className="text-xs font-japanese text-slate-500 dark:text-slate-400 mt-0.5">
                      {sec.titleJp}
                    </div>
                  </div>

                  {/* Question Types Distribution */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Official Item Blueprint:
                    </span>
                    <div className="space-y-1">
                      {sec.questionTypes.map((qt, qIdx) => (
                        <div
                          key={qIdx}
                          className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300"
                        >
                          <span className="truncate max-w-[200px]">{qt.labelEn}</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            ~{qt.targetCount} Qs
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Readiness Progress */}
                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Bank Pool vs Target:</span>
                    <span
                      className={
                        readiness?.isComplete
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }
                    >
                      {readiness?.availableCount || 0} / {sec.targetQuestionCount} Qs (
                      {readiness?.readinessPercentage || 0}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        readiness?.isComplete ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, readiness?.readinessPercentage || 0)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulator Engine Configuration */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Settings size={20} className="text-brand-600" />
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Examination Engine Rules & Policies
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <input
              type="checkbox"
              checked={simulationSettings.strictListeningSinglePlay}
              onChange={(e) =>
                setSimulationSettings((prev) => ({
                  ...prev,
                  strictListeningSinglePlay: e.target.checked,
                }))
              }
              className="mt-1 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                Single Playback in Full Simulation Mode
              </span>
              <span className="text-slate-500">
                In strict exam mode, listening audio plays once without repeated rewinding, adhering to
                official test room conditions. Practice mode allows unlimited replays.
              </span>
            </div>
          </label>

          <label className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <input
              type="checkbox"
              checked={simulationSettings.requireHurdle19}
              onChange={(e) =>
                setSimulationSettings((prev) => ({
                  ...prev,
                  requireHurdle19: e.target.checked,
                }))
              }
              className="mt-1 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                Enforce Official 19/60 Sectional Hurdle
              </span>
              <span className="text-slate-500">
                Failing to achieve at least 19 points in any section results in an overall fail, even if the
                total scaled score passes the threshold.
              </span>
            </div>
          </label>

          <label className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <input
              type="checkbox"
              checked={simulationSettings.autoSubmitOnExpiry}
              onChange={(e) =>
                setSimulationSettings((prev) => ({
                  ...prev,
                  autoSubmitOnExpiry: e.target.checked,
                }))
              }
              className="mt-1 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                Automatic Section Lock & Submission on Timeout
              </span>
              <span className="text-slate-500">
                Timers run against persistent deadline timestamps. When the deadline expires, the section is
                instantly locked and submitted.
              </span>
            </div>
          </label>

          <label className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <input
              type="checkbox"
              checked={simulationSettings.allowPracticePause}
              onChange={(e) =>
                setSimulationSettings((prev) => ({
                  ...prev,
                  allowPracticePause: e.target.checked,
                }))
              }
              className="mt-1 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                Allow Pause and Explanations in Practice Mode
              </span>
              <span className="text-slate-500">
                Learners can pause and review grammar and vocabulary explanations in Practice Mode without
                strict exam timer pressure.
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

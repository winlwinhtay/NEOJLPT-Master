// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) SCENARIO PLAYER
// Turn-by-Turn Roleplay Simulator with Native Audio & Politeness Feedback
// ============================================================================

import React, { useState } from 'react';
import {
  MessageSquare,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { BUSINESS_SCENARIOS } from '../../data/business/businessScenarioData';
import { AudioButton } from '../common/AudioButton';
import { useI18n } from '../../i18n/I18nContext';
import { getLocalizedScenarioLine } from '../../data/translations/businessContentI18n';

export const BusinessScenarioPlayer: React.FC = () => {
  const { language } = useI18n();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    BUSINESS_SCENARIOS[0].id
  );
  const [selectedChoices, setSelectedChoices] = useState<Record<string, number>>({});

  const scenario =
    BUSINESS_SCENARIOS.find((s) => s.id === selectedScenarioId) || BUSINESS_SCENARIOS[0];

  const handleSelectChoice = (lineId: string, choiceIdx: number) => {
    setSelectedChoices({ ...selectedChoices, [lineId]: choiceIdx });
  };

  const handleReset = () => {
    setSelectedChoices({});
  };

  return (
    <div className="space-y-6">
      {/* Scenario Header & Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="text-indigo-600 dark:text-indigo-400" size={22} />
            <span>ビジネス会話・シミュレーター (Workplace Scenarios)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive real-world scenarios: Phone calls, Hou-Ren-Sou, complaints, and job interviews.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset Dialogue</span>
        </button>
      </div>

      {/* Scenario List Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {BUSINESS_SCENARIOS.map((sc) => {
          const isSelected = sc.id === scenario.id;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setSelectedChoices({});
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              {sc.titleJp}
            </button>
          );
        })}
      </div>

      {/* Main Scenario Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Situation Briefing Card */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-200/60 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
              Situation Briefing
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
              {scenario.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {scenario.situation}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-indigo-100/80 dark:border-indigo-900/40 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Objective:</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {scenario.objective}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Cultural Key:</span>
              <span className="text-indigo-700 dark:text-indigo-300 font-medium">
                {scenario.culturalTip}
              </span>
            </div>
          </div>
        </div>

        {/* Turn-by-Turn Dialogue Stream */}
        <div className="space-y-4 pt-2">
          {scenario.dialogue.map((line) => {
            const userTurnAnswer = selectedChoices[line.id];
            const isAnswered = userTurnAnswer !== undefined;

            return (
              <div
                key={line.id}
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 transition-all ${
                  line.isUserTurn
                    ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {/* Speaker Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        line.isUserTurn
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {line.speaker}
                    </span>
                    <span className="text-[11px] text-slate-400">({line.speakerRole})</span>
                  </div>

                  <AudioButton text={line.japanese} size="sm" />
                </div>

                {/* Japanese Sentence */}
                <div className="text-sm sm:text-base font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                  {line.japanese}
                </div>
                <div className="text-xs text-slate-500 italic">
                  {getLocalizedScenarioLine(line.id, language, line.english)}
                </div>

                {/* Nuance Note */}
                {line.nuanceExplanation && (
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                    <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{line.nuanceExplanation}</span>
                  </div>
                )}

                {/* User Interactive Response Choice */}
                {line.isUserTurn && line.userOptions && (
                  <div className="space-y-2 pt-2 border-t border-indigo-100 dark:border-indigo-900/40">
                    <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                      Choose Your Response (返答を選択):
                    </span>
                    <div className="space-y-2">
                      {line.userOptions.map((opt, oIdx) => {
                        const isChosen = userTurnAnswer === oIdx;
                        let optStyle =
                          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300';
                        if (isAnswered) {
                          if (opt.isOptimal) {
                            optStyle =
                              'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100';
                          } else if (isChosen) {
                            optStyle =
                              'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100';
                          } else {
                            optStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={isAnswered}
                            onClick={() => handleSelectChoice(line.id, oIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${optStyle}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-japanese font-bold text-xs text-slate-900 dark:text-white leading-relaxed">
                                {opt.text}
                              </span>
                              {isAnswered && (
                                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-white dark:bg-slate-800">
                                  {opt.politenessScore}% Politeness
                                </span>
                              )}
                            </div>
                            {isAnswered && isChosen && (
                              <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-1 leading-relaxed">
                                {opt.feedback}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

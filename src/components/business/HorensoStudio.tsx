// ============================================================================
// HORENSO & WORKPLACE STUDIO (報連相・電話・会議・交渉スタジオ)
// Structured Reporting, Telephone Roleplay, Meeting Consensus & Negotiation
// ============================================================================

import React, { useState } from 'react';
import {
  MessageSquare,
  PhoneCall,
  Users2,
  TrendingUp,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { WORKPLACE_SCRIPTS_DATA, WorkplaceDialogueItem } from '../../data/business/horensoTelephoneMeetingData';
import { AudioButton } from '../common/AudioButton';
import { TranslationToggleButton } from '../common/TranslationToggleButton';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';

export const HorensoStudio: React.FC = () => {
  const { profile } = useUser();
  const { language } = useI18n();
  const isTransOn = profile.showTranslation !== false;
  const activeLang = profile.translationLanguage || language || 'en';

  const [selectedCategory, setSelectedCategory] = useState<'horenso' | 'telephone' | 'meeting' | 'negotiation'>('horenso');
  const [selectedScriptId, setSelectedScriptId] = useState<string>(
    WORKPLACE_SCRIPTS_DATA.find((s) => s.category === 'horenso')?.id || WORKPLACE_SCRIPTS_DATA[0].id
  );

  const activeScripts = WORKPLACE_SCRIPTS_DATA.filter((s) => s.category === selectedCategory);
  const activeScript: WorkplaceDialogueItem =
    WORKPLACE_SCRIPTS_DATA.find((s) => s.id === selectedScriptId) || activeScripts[0] || WORKPLACE_SCRIPTS_DATA[0];

  const handleSelectCategory = (cat: typeof selectedCategory) => {
    setSelectedCategory(cat);
    const firstInCat = WORKPLACE_SCRIPTS_DATA.find((s) => s.category === cat);
    if (firstInCat) {
      setSelectedScriptId(firstInCat.id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none">
              <MessageSquare size={20} />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              報連相・電話・会議・交渉スタジオ (Workplace Dialogue Studio)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master authentic corporate Japanese dialogue: Conclusion-first HORENSO, taking phone messages, meeting facilitation, and commercial negotiation.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => handleSelectCategory('horenso')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'horenso'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>報連相 (Horenso)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectCategory('telephone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'telephone'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <PhoneCall size={13} />
            <span>電話対応 (Phone)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectCategory('meeting')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'meeting'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Users2 size={13} />
            <span>会議発言 (Meeting)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectCategory('negotiation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'negotiation'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <TrendingUp size={13} />
            <span>交渉・調整 (Negotiation)</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Script Selector & Golden Rules (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Workplace Scenarios ({activeScripts.length})
          </span>

          <div className="space-y-2">
            {activeScripts.map((sc) => {
              const isSelected = sc.id === activeScript.id;
              return (
                <div
                  key={sc.id}
                  onClick={() => setSelectedScriptId(sc.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <h4 className="text-xs font-bold font-japanese text-slate-900 dark:text-white">
                    {sc.titleJp}
                  </h4>
                  {isTransOn ? (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {activeLang === 'my' && sc.titleMy ? sc.titleMy : sc.titleEn}
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">Translation OFF</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Golden Business Rule Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Lightbulb size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                絶対遵守！ビジネスマナールール
              </h4>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-japanese">
              {activeScript.keyRule}
            </p>
            {isTransOn && (
              <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed pt-1.5 border-t border-amber-200/60 dark:border-amber-900/40">
                {activeLang === 'my' && activeScript.keyRuleMy ? activeScript.keyRuleMy : activeScript.keyRule}
              </p>
            )}
          </div>

          {/* Essential Key Phrases Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              必修フレーズ (Essential Phrases)
            </span>
            <div className="space-y-2">
              {activeScript.essentialPhrases.map((phrase, pIdx) => (
                <div
                  key={pIdx}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-japanese text-indigo-700 dark:text-indigo-300">
                      {phrase.phrase}
                    </span>
                    <AudioButton text={phrase.phrase} size="sm" />
                  </div>
                  {isTransOn ? (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {activeLang === 'my' && phrase.meaningMy ? phrase.meaningMy : phrase.meaning}
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">Translation hidden</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Turn-by-Turn Dialogue Script Player (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                  Dialogue Simulator
                </span>
                <h3 className="text-base sm:text-lg font-black font-japanese text-slate-900 dark:text-white">
                  {activeScript.titleJp}
                </h3>
              </div>
              <div className="flex items-center gap-2 max-w-md text-right">
                <TranslationToggleButton size="sm" />
                {isTransOn && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 italic text-left sm:text-right">
                    {activeLang === 'my' && activeScript.situationMy ? activeScript.situationMy : activeScript.situation}
                  </span>
                )}
              </div>
            </div>

            {/* Turn-by-Turn Script Bubble Timeline */}
            <div className="space-y-4">
              {activeScript.dialogueLines.map((line, idx) => {
                const isYou = line.speakerRole === 'you';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2 transition-all ${
                      isYou
                        ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/50 ml-0 sm:ml-6'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 mr-0 sm:mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isYou
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {line.speaker}
                        </span>
                      </div>

                      <AudioButton text={line.japanese} size="sm" />
                    </div>

                    <p className="text-xs sm:text-sm font-bold font-japanese text-slate-900 dark:text-white leading-relaxed">
                      {line.japanese}
                    </p>

                    {isTransOn ? (
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeLang === 'my' && line.myanmar ? line.myanmar : line.english}
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">
                        Translation hidden (Trans OFF)
                      </p>
                    )}

                    {line.keyLearningPoint && (
                      <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
                        💡 <span className="font-bold">重要解説:</span>{' '}
                        {isTransOn && activeLang === 'my' && line.keyLearningPointMy
                          ? line.keyLearningPointMy
                          : line.keyLearningPoint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

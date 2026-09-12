// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) WORKPLACE CULTURE GUIDE
// Illustrated Etiquette, Seating Arrangements (席次), Meishi & Hou-Ren-Sou
// ============================================================================

import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Users,
  Compass,
  FileCheck,
  HeartHandshake,
  Lightbulb,
} from 'lucide-react';
import { BUSINESS_CULTURE_GUIDES } from '../../data/business/businessCultureData';
import { useI18n } from '../../i18n/I18nContext';
import { getCultureGuideTranslation } from '../../data/translations/businessTranslations';

export const BusinessCultureGuide: React.FC = () => {
  const { language } = useI18n();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    BUSINESS_CULTURE_GUIDES[0].id
  );

  const topic =
    BUSINESS_CULTURE_GUIDES.find((t) => t.id === selectedTopicId) ||
    BUSINESS_CULTURE_GUIDES[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="text-indigo-600 dark:text-indigo-400" size={22} />
          <span>日本のビジネスマナーと企業文化 (Workplace Culture & Etiquette)</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Understand core tendencies and cultural protocols: Seating arrangements, business card exchange, Hou-Ren-Sou, and consensus building.
        </p>
      </div>

      {/* Topic Switcher Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {BUSINESS_CULTURE_GUIDES.map((item) => {
          const isSelected = item.id === topic.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedTopicId(item.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              {item.titleJp}
            </button>
          );
        })}
      </div>

      {/* Selected Topic Content */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">
            {topic.category}
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {topic.titleJp}
          </h3>
          {(() => {
            const guideI18n = getCultureGuideTranslation(topic.id, language);
            return (
              <>
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {guideI18n?.title || topic.titleEn}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {guideI18n?.summary || topic.summary}
                </p>
              </>
            );
          })()}
        </div>

        {/* Core Rule Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 space-y-1">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <Lightbulb size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">
              鉄則 (The Core Rule)
            </span>
          </div>
          <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-semibold pl-6">
            {getCultureGuideTranslation(topic.id, language)?.coreRule || topic.coreRule}
          </p>
        </div>

        {/* Seating Arrangement Diagram Visual if seating topic */}
        {topic.id === 'cg-seating' && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
              📊 会議室の席次ダイアグラム (Conference Room Layout)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  部屋の奥（窓側・絵画側）
                </span>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  【上座 #1】
                </div>
                <p className="text-[11px] text-slate-500">
                  最も目上のお客様・メインゲストが着席
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  中央の席
                </span>
                <div className="text-2xl font-black text-slate-700 dark:text-slate-300">
                  【第2・第3席】
                </div>
                <p className="text-[11px] text-slate-500">
                  同行者や中間管理職が着席
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                  出入口ドアのすぐそば
                </span>
                <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
                  【下座 #4】
                </div>
                <p className="text-[11px] text-slate-500">
                  ホスト側の最年少・担当者が着席（ドア開閉・案内を担当）
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Sections (Dos and Don'ts) */}
        <div className="space-y-5">
          {topic.detailedGuidelines.map((guideline, gIdx) => (
            <div
              key={gIdx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3"
            >
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {guideline.heading}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {guideline.explanation}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                {/* DOs */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>やるべきこと (DO)</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {guideline.dos.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DONTs */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <XCircle size={15} />
                    <span>やってはいけないこと (DON'T)</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {guideline.donts.map((item, dnIdx) => (
                      <li key={dnIdx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Trend Note */}
        {topic.modernTrendNote && (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            💡 <strong>現代の傾向:</strong> {topic.modernTrendNote}
          </div>
        )}
      </div>
    </div>
  );
};

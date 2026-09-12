// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) HEADER COMPONENT
// Level Navigator, Career Goal Button & Progress Metrics
// ============================================================================

import React from 'react';
import {
  Briefcase,
  Target,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { BusinessCourseLevel, BusinessGoal } from '../../types/business';
import { BUSINESS_COURSES } from '../../data/business/businessCurriculumData';
import { useI18n } from '../../i18n/I18nContext';
import { getBusinessCourseText } from '../../data/translations/businessTranslations';

interface BusinessHeaderProps {
  activeLevel: BusinessCourseLevel;
  onSelectLevel: (level: BusinessCourseLevel) => void;
  selectedGoal?: BusinessGoal;
  onOpenGoalModal: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  hasCertificate: boolean;
  onOpenCertificate: () => void;
}

export const BusinessHeader: React.FC<BusinessHeaderProps> = ({
  activeLevel,
  onSelectLevel,
  selectedGoal,
  onOpenGoalModal,
  completedLessonsCount,
  totalLessonsCount,
  hasCertificate,
  onOpenCertificate,
}) => {
  const { language } = useI18n();
  const currentCourse = BUSINESS_COURSES[activeLevel];
  const courseI18n = getBusinessCourseText(activeLevel, language);

  const levels: { id: BusinessCourseLevel; label: string; sub: string; jlpt: string }[] = [
    { id: 'foundation', label: '基礎 Foundation', sub: 'Workplace Basics', jlpt: 'N4–N3' },
    { id: 'intermediate', label: '中級 Intermediate', sub: 'Keigo & Meetings', jlpt: 'N3–N2' },
    { id: 'upper_intermediate', label: '上級 Upper-Inter', sub: 'Negotiations', jlpt: 'N2' },
    { id: 'professional', label: 'プロ Professional', sub: 'Executive / Nemawashi', jlpt: 'N2–N1' },
    { id: 'career_track', label: '就活 Career Track', sub: 'Resume & Interview', jlpt: 'N3–N1' },
  ];

  const goalLabels: Record<BusinessGoal, string> = {
    work_in_japan: 'Work in Japan (日本で就職)',
    japanese_university: 'Japanese University (大学・大学院)',
    internship: 'Internship (インターン)',
    job_interview: 'Job Interview (面接対策)',
    office_communication: 'Office Communication (職場会話)',
    customer_service: 'Customer Service (接客・対応)',
    japanese_company: 'Japanese Company (日系企業)',
    business_travel: 'Business Travel (出張・商談)',
    management: 'Management (マネジメント)',
    sales: 'Sales (営業・商談)',
    hr_admin: 'HR / Administration (人事・総務)',
    finance: 'Finance & Accounting (財務・経理)',
    it_engineering: 'IT / Engineering (IT・開発)',
    general_business: 'General Business (全般)',
  };

  const progressPct =
    totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase size={13} />
                <span>Business Japanese / ビジネス日本語</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Prerequisite: {currentCourse.recommendedJlpt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{courseI18n.title || currentCourse.nameJp}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {courseI18n.desc || currentCourse.description}
            </p>
          </div>

          {/* Goal & Certificate Action Area */}
          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 shrink-0">
            {/* Goal Pill Button */}
            <button
              type="button"
              onClick={onOpenGoalModal}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center justify-between gap-3 transition-all cursor-pointer backdrop-blur"
            >
              <div className="flex items-center gap-2">
                <Target size={15} className="text-amber-400" />
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Career Goal
                  </span>
                  <span className="text-xs font-bold text-white">
                    {selectedGoal ? goalLabels[selectedGoal] : 'Select Career Goal ➔'}
                  </span>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </button>

            {/* Certificate Status Button */}
            {hasCertificate ? (
              <button
                type="button"
                onClick={onOpenCertificate}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Award size={16} className="fill-slate-950" />
                <span>View Certificate of Completion</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-medium">
                <GraduationCap size={14} className="text-indigo-400" />
                <span>Pass Final Exam (≥80%) for Certificate</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar inside Hero */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Course Progress:</span>
            <div className="w-48 sm:w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-bold font-mono text-white">
              {completedLessonsCount}/{totalLessonsCount} ({progressPct}%)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>100% Offline University-Style Curriculum</span>
          </div>
        </div>
      </div>

      {/* Course Level Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {levels.map((lvl) => {
          const isSelected = activeLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              type="button"
              onClick={() => onSelectLevel(lvl.id)}
              className={`flex-1 min-w-[170px] p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-indigo-600 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-xs font-black ${
                    isSelected
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {lvl.label}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                  {lvl.jlpt}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{lvl.sub}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

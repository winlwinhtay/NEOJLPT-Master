// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) GOAL SELECTION MODAL
// Personalized Career & Study Objective Selector
// ============================================================================

import React from 'react';
import { X, Target, Check, Briefcase, GraduationCap, Building2, Code, TrendingUp, Users, HeartHandshake } from 'lucide-react';
import { BusinessGoal } from '../../types/business';

interface BusinessGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGoal?: BusinessGoal;
  onSelectGoal: (goal: BusinessGoal) => void;
}

export const BusinessGoalModal: React.FC<BusinessGoalModalProps> = ({
  isOpen,
  onClose,
  selectedGoal,
  onSelectGoal,
}) => {
  if (!isOpen) return null;

  const goals: {
    id: BusinessGoal;
    titleJp: string;
    titleEn: string;
    desc: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'work_in_japan',
      titleJp: '日本国内での就職・転職',
      titleEn: 'Work in Japan (Career / Full-time)',
      desc: 'Targeted for long-term corporate life, business etiquette, and office communication.',
      icon: <Building2 size={20} className="text-indigo-500" />,
    },
    {
      id: 'job_interview',
      titleJp: '採用面接・選考対策',
      titleEn: 'Job Interview & Entry Sheet (ES)',
      desc: 'Master motivation (志望動機), self-PR, resume writing, and interview etiquette.',
      icon: <Briefcase size={20} className="text-emerald-500" />,
    },
    {
      id: 'it_engineering',
      titleJp: 'IT・ソフトウェア開発業務',
      titleEn: 'IT & Software Engineering',
      desc: 'Sprint meetings, bug reports, specification reviews, and tech communication.',
      icon: <Code size={20} className="text-cyan-500" />,
    },
    {
      id: 'japanese_university',
      titleJp: '日本の大学・大学院進学',
      titleEn: 'Japanese University / Graduate School',
      desc: 'Professor communication, seminar etiquette, and transition to job hunting.',
      icon: <GraduationCap size={20} className="text-purple-500" />,
    },
    {
      id: 'internship',
      titleJp: '日系企業でのインターンシップ',
      titleEn: 'Internship at Japanese Company',
      desc: 'First impressions, daily tasks, Hou-Ren-Sou, and practical telephone basics.',
      icon: <Users size={20} className="text-amber-500" />,
    },
    {
      id: 'office_communication',
      titleJp: '社内コミュニケーション・報連相',
      titleEn: 'Office Communication & Hou-Ren-Sou',
      desc: 'Reporting progress, polite requests, apologies, and internal alignment.',
      icon: <TrendingUp size={20} className="text-blue-500" />,
    },
    {
      id: 'customer_service',
      titleJp: '接客・カスタマーサポート',
      titleEn: 'Customer Service & Client Support',
      desc: 'High-politeness honorifics, resolving customer complaints, and courteous service.',
      icon: <HeartHandshake size={20} className="text-rose-500" />,
    },
    {
      id: 'general_business',
      titleJp: 'ビジネス日本語全般の総合習得',
      titleEn: 'Comprehensive General Business',
      desc: 'Complete all-around mastery of Keigo, email, telephone, meetings, and culture.',
      icon: <Target size={20} className="text-slate-500" />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Target size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Goal Customization</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            ビジネス日本語の目標を選択
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your primary professional objective to personalize recommended lessons and scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <div
                key={goal.id}
                onClick={() => {
                  onSelectGoal(goal.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 relative group ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {goal.icon}
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                      <Check size={14} />
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {goal.titleJp}
                  </h3>
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {goal.titleEn}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

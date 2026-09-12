import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  Target,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  X,
  Sliders,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { JLPTLevel } from '../../types';
import { Weekday, StudyIntensity, StudyPlan } from '../../types/studyPlan';
import { StudyPlannerService } from '../../services/studyPlannerService';
import { DiagnosticPlacementModal } from './DiagnosticPlacementModal';

interface StudyPlanSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanCreated: (plan: StudyPlan) => void;
  initialTargetLevel?: JLPTLevel;
}

const WEEKDAYS: { key: Weekday; label: string; short: string }[] = [
  { key: 'mon', label: 'Monday', short: 'Mon' },
  { key: 'tue', label: 'Tuesday', short: 'Tue' },
  { key: 'wed', label: 'Wednesday', short: 'Wed' },
  { key: 'thu', label: 'Thursday', short: 'Thu' },
  { key: 'fri', label: 'Friday', short: 'Fri' },
  { key: 'sat', label: 'Saturday', short: 'Sat' },
  { key: 'sun', label: 'Sunday', short: 'Sun' },
];

export const StudyPlanSetupModal: React.FC<StudyPlanSetupModalProps> = ({
  isOpen,
  onClose,
  onPlanCreated,
  initialTargetLevel = 'N5',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [currentLevel, setCurrentLevel] = useState<JLPTLevel | 'beginner'>('beginner');
  const [targetLevel, setTargetLevel] = useState<JLPTLevel>(initialTargetLevel);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [selectedDays, setSelectedDays] = useState<Weekday[]>(['mon', 'tue', 'wed', 'thu', 'fri']);
  const [dailyMinutes, setDailyMinutes] = useState<number>(60);
  const [useFlexibleTime, setUseFlexibleTime] = useState<boolean>(false);
  const [customDayMinutes, setCustomDayMinutes] = useState<Partial<Record<Weekday, number>>>({
    mon: 60,
    tue: 45,
    wed: 60,
    thu: 45,
    fri: 60,
    sat: 30,
    sun: 0,
  });
  const [intensity, setIntensity] = useState<StudyIntensity>('balanced');
  const [hasExamDate, setHasExamDate] = useState<boolean>(false);
  const [targetExamDate, setTargetExamDate] = useState<string>('2026-12-06');
  const [diagnosticOpen, setDiagnosticOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleDay = (day: Weekday) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        const next = selectedDays.filter((d) => d !== day);
        setSelectedDays(next);
        setDaysPerWeek(next.length);
      }
    } else {
      const next = [...selectedDays, day];
      setSelectedDays(next);
      setDaysPerWeek(next.length);
    }
  };

  const handleCustomDayChange = (day: Weekday, minutes: number) => {
    setCustomDayMinutes((prev) => ({ ...prev, [day]: Math.max(0, minutes) }));
  };

  // Weekly capacity preview
  const weeklyCapacityMinutes = useFlexibleTime
    ? Object.values(customDayMinutes).reduce((acc, m) => acc + (m || 0), 0)
    : daysPerWeek * dailyMinutes;
  const weeklyHours = (weeklyCapacityMinutes / 60).toFixed(1);

  // Real-time estimate
  const estimatedHours = StudyPlannerService.calculateRequiredHours(
    currentLevel,
    targetLevel,
    intensity
  );
  const estimatedWeeks = StudyPlannerService.calculateEstimatedWeeks(
    estimatedHours,
    weeklyCapacityMinutes
  );

  const handleGeneratePlan = () => {
    const plan = StudyPlannerService.createStudyPlan({
      currentLevel,
      targetLevel,
      daysPerWeek,
      selectedDays,
      dailyMinutes,
      customDayMinutes: useFlexibleTime ? customDayMinutes : undefined,
      intensity,
      targetExamDate: hasExamDate ? targetExamDate : undefined,
    });
    onPlanCreated(plan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Personalized JLPT Study Plan Setup
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Step {step} of 6 • Based on your real schedule & cognitive pacing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wizard Steps Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Step 1: Current Level */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  What is your current Japanese ability?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  We use this baseline to prevent repeating material you already know.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'beginner', title: 'Beginner / Zero', desc: 'No prior Japanese knowledge' },
                  { id: 'N5', title: 'JLPT N5', desc: 'Basic vocabulary & kana' },
                  { id: 'N4', title: 'JLPT N4', desc: 'Everyday conversations' },
                  { id: 'N3', title: 'JLPT N3', desc: 'Bridge to intermediate' },
                  { id: 'N2', title: 'JLPT N2', desc: 'Pre-advanced / business' },
                  { id: 'N1', title: 'JLPT N1', desc: 'Near native proficiency' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentLevel(item.id as any)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      currentLevel === item.id
                        ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                      {currentLevel === item.id && (
                        <CheckCircle2 size={16} className="text-brand-500" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* Not sure button */}
              <div className="pt-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                    Not sure about your current level?
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDiagnosticOpen(true)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Take 5-Min Test
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Target Level */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Which JLPT level are you preparing for?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  The planner builds your exact milestone requirements toward this target.
                </p>
              </div>

              <div className="space-y-2.5">
                {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => {
                  const isSelected = targetLevel === lvl;
                  const isSameAsCurrent = currentLevel === lvl;

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setTargetLevel(lvl)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-black flex items-center justify-center text-sm">
                          {lvl}
                        </span>
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white block">
                            JLPT {lvl} Target Mastery
                          </span>
                          {isSameAsCurrent && (
                            <span className="text-[11px] text-brand-600 dark:text-brand-400 font-medium">
                              ★ Recommended: Target-Level Mastery & Full Mock Test Prep
                            </span>
                          )}
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 size={18} className="text-brand-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Available Study Days */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Which days can you study each week?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select your active days. Unselected days become scheduled Rest & Assimilation days.
                </p>
              </div>

              {/* Day count quick buttons */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setDaysPerWeek(num);
                      const days: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].slice(0, num) as Weekday[];
                      setSelectedDays(days);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      daysPerWeek === num
                        ? 'bg-brand-500 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {num}d
                  </button>
                ))}
              </div>

              {/* Day selection checkboxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {WEEKDAYS.map(({ key, label }) => {
                  const isChecked = selectedDays.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleDay(key)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-slate-900 dark:text-white font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{label}</span>
                        {isChecked && <CheckCircle2 size={14} className="text-brand-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Study Time per Day & Flexible Schedule */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  How much time can you study per day?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Consistent daily pacing yields 4x higher retention than cramming.
                </p>
              </div>

              {!useFlexibleTime ? (
                /* Preset Buttons */
                <div className="grid grid-cols-3 gap-2.5">
                  {[15, 30, 45, 60, 90, 120].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDailyMinutes(mins)}
                      className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        dailyMinutes === mins
                          ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-black shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-base font-bold block">{mins}m</span>
                      <span className="text-[10px] text-slate-400">
                        {mins >= 60 ? `${mins / 60} hr${mins > 60 ? 's' : ''}` : 'Quick session'}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                /* Flexible Per-Day Inputs */
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {WEEKDAYS.map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step={15}
                          min={0}
                          max={300}
                          value={customDayMinutes[key] ?? 0}
                          onChange={(e) => handleCustomDayChange(key, parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center"
                        />
                        <span className="text-xs text-slate-400">min</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Flexible Time Toggle */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Different availability on different days?
                </span>
                <button
                  type="button"
                  onClick={() => setUseFlexibleTime(!useFlexibleTime)}
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 underline cursor-pointer"
                >
                  {useFlexibleTime ? 'Use Standard Daily Time' : 'Set Custom Minutes Per Day'}
                </button>
              </div>

              {/* Weekly Capacity Badge */}
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    Weekly Study Capacity:
                  </span>
                </div>
                <span className="text-xs font-black text-indigo-700 dark:text-indigo-300">
                  {weeklyHours} hrs / week ({weeklyCapacityMinutes} min)
                </span>
              </div>
            </div>
          )}

          {/* Step 5: Study Intensity */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Choose your study intensity
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Controls the ratio of new content acquisition vs consolidation reviews.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'relaxed',
                    title: 'Relaxed (Spaced & Gentle)',
                    desc: 'Lower daily workload with high review buffer. Ideal for busy professionals.',
                    badge: '40% Review',
                  },
                  {
                    id: 'balanced',
                    title: 'Balanced (Recommended)',
                    desc: 'Optimal balance of daily new concepts, spaced repetition, and practice.',
                    badge: 'Recommended',
                  },
                  {
                    id: 'intensive',
                    title: 'Intensive (Exam Sprint)',
                    desc: 'Higher volume of new grammar/vocab and frequent simulated mock exams.',
                    badge: 'High Velocity',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIntensity(item.id as StudyIntensity)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      intensity === item.id
                        ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Target Exam Date & Final Plan Overview */}
          {step === 6 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Target Exam Date & Projection
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Set a concrete exam deadline or let the engine calculate your finish date.
                </p>
              </div>

              {/* Exam Date Choice */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHasExamDate(false)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    !hasExamDate
                      ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold block text-slate-900 dark:text-white">
                    No fixed exam date
                  </span>
                  <span className="text-[11px] text-slate-500">Calculate natural completion</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasExamDate(true)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    hasExamDate
                      ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold block text-slate-900 dark:text-white">
                    I have an exam date
                  </span>
                  <span className="text-[11px] text-slate-500">Select official JLPT session</span>
                </button>
              </div>

              {hasExamDate && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Choose official exam session date:
                  </label>
                  <input
                    type="date"
                    value={targetExamDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setTargetExamDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-bold"
                  />
                </div>
              )}

              {/* Projection Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-500/10 via-indigo-500/10 to-purple-500/10 border border-brand-200 dark:border-brand-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider">
                    Calculated Projection
                  </span>
                  <span className="text-xs font-black text-slate-900 dark:text-white">
                    ~{estimatedWeeks} Weeks ({estimatedHours} hrs total)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Based on <strong>{weeklyHours} hrs/week</strong> and <strong>{intensity}</strong>{' '}
                  intensity, your complete curriculum is estimated to complete in approximately{' '}
                  <strong>{estimatedWeeks} weeks</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as any)}
              className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Continue <ChevronRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGeneratePlan}
              className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Build My Study Plan <Sparkles size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Embedded Diagnostic Modal */}
      <DiagnosticPlacementModal
        isOpen={diagnosticOpen}
        onClose={() => setDiagnosticOpen(false)}
        onApplyLevel={(lvl) => {
          setCurrentLevel(lvl);
        }}
      />
    </div>
  );
};

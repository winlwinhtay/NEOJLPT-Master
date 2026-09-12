// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) MAIN VIEW
// Complete University-Course-Style Business Japanese Module
// ============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import {
  Briefcase,
  Layers,
  Award,
  Mail,
  PhoneCall,
  Shield,
  Users2,
  BookA,
  Search,
  CheckCircle2,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { BusinessCourseLevel, BusinessGoal, BusinessCertificateRecord } from '../types/business';
import { BUSINESS_COURSES, INDUSTRY_TRACKS } from '../data/business/businessCurriculumData';
import { BUSINESS_VOCABULARY } from '../data/business/businessVocabularyData';
import { BusinessHeader } from '../components/business/BusinessHeader';
import { BusinessGoalModal } from '../components/business/BusinessGoalModal';
import { BusinessUnitCard } from '../components/business/BusinessUnitCard';
import { BusinessKeigoStudio } from '../components/business/BusinessKeigoStudio';
import { BusinessEmailStudio } from '../components/business/BusinessEmailStudio';
import { BusinessScenarioPlayer } from '../components/business/BusinessScenarioPlayer';
import { BusinessCultureGuide } from '../components/business/BusinessCultureGuide';
import { BusinessInterviewStudio } from '../components/business/BusinessInterviewStudio';
import { BusinessFinalExam } from '../components/business/BusinessFinalExam';
import { BusinessCertificateModal } from '../components/business/BusinessCertificateModal';
import { AudioButton } from '../components/common/AudioButton';
import { getBusinessTabName } from '../data/translations/businessTranslations';
import { getLocalizedBusinessVocabMeaning } from '../data/translations/businessContentI18n';
import { getVocabularyStudyTip } from '../data/translations/vocabTipsTranslations';

export const BusinessJapaneseView: React.FC = () => {
  const { logActivity, profile } = useUser();
  const { t, language } = useI18n();

  // Navigation state
  const [activeCourseLevel, setActiveCourseLevel] = useState<BusinessCourseLevel>('foundation');
  const [activeStudioTab, setActiveStudioTab] = useState<
    'curriculum' | 'keigo' | 'email' | 'scenarios' | 'culture' | 'interview' | 'vocabulary' | 'exam'
  >('curriculum');

  // Goal & Certificate Modal State
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<BusinessGoal>(() => {
    const saved = localStorage.getItem('jlpt_business_goal');
    return (saved as BusinessGoal) || 'work_in_japan';
  });

  // Completed Lessons Persistence
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jlpt_business_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Certificate Persistence
  const [certificateRecord, setCertificateRecord] = useState<BusinessCertificateRecord | null>(
    () => {
      try {
        const saved = localStorage.getItem('jlpt_business_certificate');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        return null;
      }
    }
  );

  // Vocabulary Glossary Search & Domain Filter
  const [vocabSearch, setVocabSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  // Handle Goal Change
  const handleSelectGoal = (goal: BusinessGoal) => {
    setSelectedGoal(goal);
    localStorage.setItem('jlpt_business_goal', goal);

    // Auto-align level if career/interview
    if (goal === 'job_interview') {
      setActiveCourseLevel('career_track');
    }
  };

  // Toggle Lesson Completion
  const handleToggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      let next: string[];
      if (prev.includes(lessonId)) {
        next = prev.filter((id) => id !== lessonId);
      } else {
        next = [...prev, lessonId];
        logActivity('practice', 1);
      }
      localStorage.setItem('jlpt_business_completed_lessons', JSON.stringify(next));
      return next;
    });
  };

  // Handle Exam Passed
  const handleExamPassed = (record: BusinessCertificateRecord) => {
    setCertificateRecord(record);
    localStorage.setItem('jlpt_business_certificate', JSON.stringify(record));
    logActivity('practice', 3);
  };

  const currentCourse = BUSINESS_COURSES[activeCourseLevel];

  // Total lessons in active track
  const totalLessonsInLevel = useMemo(() => {
    return currentCourse.units.reduce((acc, u) => acc + u.lessons.length, 0);
  }, [currentCourse]);

  const completedInLevel = useMemo(() => {
    const levelLessonIds = new Set(
      currentCourse.units.flatMap((u) => u.lessons.map((l) => l.id))
    );
    return completedLessonIds.filter((id) => levelLessonIds.has(id)).length;
  }, [currentCourse, completedLessonIds]);

  // Filtered Vocabulary Glossary
  const filteredVocab = useMemo(() => {
    return BUSINESS_VOCABULARY.filter((v) => {
      if (selectedDomain !== 'all' && v.businessDomain !== selectedDomain) return false;
      if (vocabSearch.trim()) {
        const q = vocabSearch.toLowerCase();
        return (
          v.word.toLowerCase().includes(q) ||
          v.reading.toLowerCase().includes(q) ||
          v.meaningEn.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [vocabSearch, selectedDomain]);

  const studioTabs: {
    id: typeof activeStudioTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'curriculum', label: getBusinessTabName('curriculum', language), icon: <Layers size={16} /> },
    { id: 'keigo', label: getBusinessTabName('keigo', language), icon: <Award size={16} /> },
    { id: 'email', label: getBusinessTabName('email', language), icon: <Mail size={16} /> },
    { id: 'scenarios', label: getBusinessTabName('scenarios', language), icon: <PhoneCall size={16} /> },
    { id: 'culture', label: getBusinessTabName('culture', language), icon: <Shield size={16} /> },
    { id: 'interview', label: getBusinessTabName('interview', language), icon: <Users2 size={16} /> },
    { id: 'vocabulary', label: getBusinessTabName('vocabulary', language), icon: <BookA size={16} /> },
    { id: 'exam', label: getBusinessTabName('exam', language), icon: <GraduationCap size={16} /> },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header & Level Bar */}
      <BusinessHeader
        activeLevel={activeCourseLevel}
        onSelectLevel={setActiveCourseLevel}
        selectedGoal={selectedGoal}
        onOpenGoalModal={() => setGoalModalOpen(true)}
        completedLessonsCount={completedInLevel}
        totalLessonsCount={totalLessonsInLevel}
        hasCertificate={Boolean(certificateRecord)}
        onOpenCertificate={() => setCertificateModalOpen(true)}
      />

      {/* Primary Studio Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm scrollbar-none">
        {studioTabs.map((tab) => {
          const isSelected = activeStudioTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStudioTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CURRICULUM ROADMAP UNITS */}
      {/* ========================================================================= */}
      {activeStudioTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {currentCourse.units.map((unit) => (
              <BusinessUnitCard
                key={unit.id}
                unit={unit}
                completedLessonIds={completedLessonIds}
                onToggleCompleteLesson={handleToggleLessonComplete}
              />
            ))}
          </div>

          {/* Industry Tracks Preview Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 space-y-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold font-mono uppercase text-indigo-400">
                Industry-Specific Tracks (業界別特化コース)
              </span>
              <h3 className="text-xl font-black">
                専門業界別の実践語彙とビジネス商習慣
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Deepen your domain competence with specialized terminology across IT, Finance, Manufacturing, Sales, and Hospitality.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {INDUSTRY_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1 backdrop-blur"
                >
                  <span className="text-xs font-bold text-white block truncate">
                    {track.nameJp}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {track.nameEn}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                    {track.termsCount} terms
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KEIGO MASTERY STUDIO */}
      {/* ========================================================================= */}
      {activeStudioTab === 'keigo' && <BusinessKeigoStudio />}

      {/* ========================================================================= */}
      {/* TAB 3: BUSINESS EMAIL STUDIO */}
      {/* ========================================================================= */}
      {activeStudioTab === 'email' && <BusinessEmailStudio />}

      {/* ========================================================================= */}
      {/* TAB 4: WORKPLACE SCENARIOS & TELEPHONE */}
      {/* ========================================================================= */}
      {activeStudioTab === 'scenarios' && <BusinessScenarioPlayer />}

      {/* ========================================================================= */}
      {/* TAB 5: WORKPLACE CULTURE & ETIQUETTE */}
      {/* ========================================================================= */}
      {activeStudioTab === 'culture' && <BusinessCultureGuide />}

      {/* ========================================================================= */}
      {/* TAB 6: JOB INTERVIEW & CAREER PREPARATION */}
      {/* ========================================================================= */}
      {activeStudioTab === 'interview' && <BusinessInterviewStudio />}

      {/* ========================================================================= */}
      {/* TAB 7: BUSINESS VOCABULARY GLOSSARY */}
      {/* ========================================================================= */}
      {activeStudioTab === 'vocabulary' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                placeholder="Search business term, reading, or meaning..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-indigo-500"
              />
            </div>

            {/* Domain Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['all', 'organization', 'courtesy', 'meetings', 'operations', 'sales', 'hr'].map(
                (domain) => {
                  const isSelected = selectedDomain === domain;
                  return (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => setSelectedDomain(domain)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold uppercase transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      {domain}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Vocabulary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVocab.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-indigo-300 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xl font-black font-japanese text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.word}
                      </h4>
                      <span className="text-xs font-japanese text-slate-400">
                        （{item.reading}）
                      </span>
                    </div>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {getLocalizedBusinessVocabMeaning(item.word, item.meaningEn, language)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                      {item.jlptEquivalent}
                    </span>
                    <AudioButton text={item.word} size="sm" />
                  </div>
                </div>

                {/* Collocations */}
                {item.collocations && item.collocations.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Common Business Phrases:
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.collocations.map((col, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-japanese font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example Sentence */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
                  <div className="text-xs font-japanese text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {item.exampleJp}
                  </div>
                  <div className="text-[11px] text-slate-400 italic leading-snug">
                    {item.exampleEn}
                  </div>
                </div>

                {/* Localized Vocabulary Tip */}
                {(() => {
                  const tipData = getVocabularyStudyTip(
                    item.word,
                    getLocalizedBusinessVocabMeaning(item.word, item.meaningEn, language),
                    item.partOfSpeech,
                    language
                  );
                  return (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400/90 leading-snug">
                      <span className="font-bold">💡 Tip: </span>
                      <span>{tipData.tip}</span>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: FINAL CERTIFICATION EXAM */}
      {/* ========================================================================= */}
      {activeStudioTab === 'exam' && (
        <BusinessFinalExam
          level={activeCourseLevel}
          studentName={profile?.name || 'Learner'}
          onExamPassed={handleExamPassed}
          onOpenCertificate={() => setCertificateModalOpen(true)}
        />
      )}

      {/* Goal Customization Modal */}
      <BusinessGoalModal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        selectedGoal={selectedGoal}
        onSelectGoal={handleSelectGoal}
      />

      {/* Certificate Modal */}
      {certificateRecord && (
        <BusinessCertificateModal
          isOpen={certificateModalOpen}
          onClose={() => setCertificateModalOpen(false)}
          certificate={certificateRecord}
        />
      )}
    </div>
  );
};

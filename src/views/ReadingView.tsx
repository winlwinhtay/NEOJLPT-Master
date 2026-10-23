import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Eye,
  EyeOff,
  Languages,
  Volume2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  BookOpen,
  Award,
  Filter,
  Check,
  Search,
  ListOrdered,
  HelpCircle,
  Bookmark,
  Share2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { ContentService } from '../services/content';
import { RubyText } from '../components/common/RubyText';
import { AudioButton } from '../components/common/AudioButton';
import { TranslationToggleButton } from '../components/common/TranslationToggleButton';
import { JLPTLevel, ReadingLesson } from '../types';
import { SupportedLanguage } from '../types/i18n';
import { SessionPersistenceService } from '../session/persistence/SessionPersistenceService';
import { getLocalizedReadingPassage } from '../data/translations/mediaContentI18n';
import {
  UniversityReadingExercise,
  ReadingTopicId,
  READING_TOPIC_REGISTRY,
} from '../types/readingCurriculum';
import { ReadingService } from '../services/content/readingService';
import { AIReadingGeneratorModal } from '../components/reading/AIReadingGeneratorModal';
import { ReadingProgressModal } from '../components/reading/ReadingProgressModal';
import { AIAccessGateModal } from '../components/auth/AIAccessGateModal';
import { isUserEligibleForLiveAI } from '../services/entitlementService';

export const ReadingView: React.FC = () => {
  const { activeLevel, setActiveLevel } = useApp();
  const { profile, entitlements, logActivity, addXP } = useUser();
  const { t, language } = useI18n();
  const activeLang = (profile.translationLanguage || language || 'en') as SupportedLanguage;

  const isProOrAdmin = isUserEligibleForLiveAI(profile, entitlements);
  const [isAiGateOpen, setIsAiGateOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  // Filter States
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get readings for current active level and topic
  const allLevelReadings = useMemo(() => {
    return ReadingService.getReadingsByLevel(activeLevel);
  }, [activeLevel]);

  const filteredReadings = useMemo(() => {
    return allLevelReadings.filter((r) => {
      if (selectedTopic !== 'all' && r.topic !== selectedTopic) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.titleEn.toLowerCase().includes(q) ||
          (r.titleMy && r.titleMy.toLowerCase().includes(q)) ||
          r.passagePlain.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allLevelReadings, selectedTopic, searchQuery]);

  const [selectedReading, setSelectedReading] = useState<UniversityReadingExercise>(() => {
    return (
      filteredReadings[0] ||
      allLevelReadings[0] ||
      (ReadingService.getReadingsByLevel('N5')[0] as unknown as UniversityReadingExercise)
    );
  });

  // Whenever level changes, reset to the first available exercise
  useEffect(() => {
    const list = ReadingService.getReadingsByLevel(activeLevel);
    if (list.length > 0 && !list.some((r) => r.id === selectedReading.id)) {
      setSelectedReading(list[0]);
      setUserAnswers({});
      setIsSubmitted(false);
    }
  }, [activeLevel]);

  // Display & Mode States
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(() => profile.showTranslation !== false);
  const [readingMode, setReadingMode] = useState<'continuous' | 'sentence'>('continuous');
  const [activeTab, setActiveTab] = useState<'passage' | 'vocab' | 'grammar'>('passage');

  // Exercise Question States
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedExerciseIds, setCompletedExerciseIds] = useState<Set<string>>(() =>
    ReadingService.getCompletedExerciseIds()
  );

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let correctCount = 0;
    selectedReading.questions.forEach((q) => {
      const userChoice = userAnswers[q.id];
      if (userChoice === q.correctIndex) {
        correctCount++;
      } else {
        SessionPersistenceService.recordMistake(
          {
            id: q.id,
            type: 'reading',
            prompt: q.questionJp,
            options: q.options,
            correctAnswer: q.correctIndex,
            explanation: q.explanation,
            category: 'reading',
            level: selectedReading.level,
          },
          userChoice !== undefined ? q.options[userChoice] : '(No answer)',
          q.options[q.correctIndex] || String(q.correctIndex)
        );
      }
    });

    const totalQuestions = selectedReading.questions.length;
    const scorePct = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Record reading progress record
    ReadingService.saveReadingProgress({
      id: `prog-${selectedReading.id}-${Date.now()}`,
      userId: profile.id,
      exerciseId: selectedReading.id,
      level: selectedReading.level,
      score: scorePct,
      totalQuestions,
      correctAnswersCount: correctCount,
      completedAt: new Date().toISOString(),
      timeSpentSeconds: 180,
      userAnswers,
    });

    setCompletedExerciseIds(ReadingService.getCompletedExerciseIds());

    if (correctCount > 0) {
      addXP(correctCount * 20, 'University reading practice score');
    }
    logActivity('reading', 1);
  };

  const handleSelectPassage = (passage: UniversityReadingExercise) => {
    setSelectedReading(passage);
    setUserAnswers({});
    setIsSubmitted(false);
    setShowTranslation(profile.showTranslation !== false);
  };

  // Split passage into sentences for sentence-by-sentence reading mode
  const sentences = useMemo(() => {
    return selectedReading.passage
      .split(/(?<=。|\n)/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }, [selectedReading.passage]);

  const currentTopicMeta = READING_TOPIC_REGISTRY.find((t) => t.id === selectedReading.topic);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-5 sm:space-y-6 animate-fade-in text-xs sm:text-sm">
      {/* 1. Header with Controls & Level Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen size={13} />
              <span>University Reading Library (読解ライブラリ)</span>
            </span>
            <span className="px-2 py-0.2 rounded-md text-[10px] font-black bg-amber-500 text-white">
              50 Core Exercises
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {activeLevel} {t('reading.title')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Intensive & extensive reading curriculum inspired by Japanese university language programs
          </p>
        </div>

        {/* Level Switcher Strip & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Level Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setActiveLevel(lvl)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  activeLevel === lvl
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Progress Modal Button */}
          <button
            type="button"
            onClick={() => setIsProgressModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:border-amber-500 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            title="View completed exercises and performance"
          >
            <Award size={14} className="text-amber-500" />
            <span className="hidden sm:inline">Progress</span>
          </button>

          {/* AI Generator Button */}
          <button
            type="button"
            onClick={() => {
              if (isProOrAdmin) {
                setIsGeneratorOpen(true);
              } else {
                setIsAiGateOpen(true);
              }
            }}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-rose-500 hover:opacity-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Generate custom reading exercises with AI"
          >
            <Sparkles size={14} />
            <span>AI Generate</span>
          </button>
        </div>
      </div>

      {/* 2. Topic Filter Strip */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedTopic('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              selectedTopic === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
            }`}
          >
            All Topics ({allLevelReadings.length})
          </button>

          {READING_TOPIC_REGISTRY.map((tMeta) => {
            const countInLevel = allLevelReadings.filter((r) => r.topic === tMeta.id).length;
            const isSelected = selectedTopic === tMeta.id;

            return (
              <button
                key={tMeta.id}
                type="button"
                onClick={() => setSelectedTopic(tMeta.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <span>{tMeta.icon}</span>
                <span>{tMeta.labelEn}</span>
                {countInLevel > 0 && <span className="opacity-70 text-[10px]">({countInLevel})</span>}
              </button>
            );
          })}
        </div>

        {/* Passage Selection Carousel / List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {filteredReadings.map((r, idx) => {
            const isCompleted = completedExerciseIds.has(r.id);
            const isSelected = selectedReading.id === r.id;

            return (
              <button
                key={r.id}
                onClick={() => handleSelectPassage(r)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm scale-[1.01]'
                    : isCompleted
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                {isCompleted && (
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-white text-amber-600' : 'bg-emerald-500 text-white'
                    }`}
                  >
                    <Check size={10} strokeWidth={3} />
                  </span>
                )}
                <span className="font-japanese truncate max-w-[140px] sm:max-w-[180px]">
                  {r.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Reading Card & Workspace */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Toolbar & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <span>{currentTopicMeta?.icon}</span>
                <span>{currentTopicMeta?.labelEn || selectedReading.topic}</span>
              </span>
              <span>•</span>
              <span className="text-slate-400 uppercase font-semibold text-[11px]">
                {selectedReading.length} • ~{selectedReading.estimatedReadingTimeMinutes || 4} mins
              </span>
              {selectedReading.reviewStatus && (
                <span
                  className={`px-2 py-0.2 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                    selectedReading.reviewStatus === 'published'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  {selectedReading.reviewStatus}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-japanese text-slate-900 dark:text-white mt-1">
              {selectedReading.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {activeLang === 'my' && selectedReading.titleMy
                ? selectedReading.titleMy
                : selectedReading.titleEn}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Reading Mode Toggle (Continuous vs Sentence-by-sentence) */}
            <button
              type="button"
              onClick={() =>
                setReadingMode(readingMode === 'continuous' ? 'sentence' : 'continuous')
              }
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 border border-slate-200 dark:border-slate-700"
              title="Toggle full passage vs sentence-by-sentence reading"
            >
              <ListOrdered size={14} />
              <span className="hidden sm:inline">
                {readingMode === 'continuous' ? 'Sentence View' : 'Full Passage'}
              </span>
            </button>

            {/* Furigana Toggle */}
            <button
              type="button"
              onClick={() => setShowFurigana(!showFurigana)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                showFurigana
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {showFurigana ? <Eye size={14} /> : <EyeOff size={14} />}
              <span>Furigana: {showFurigana ? 'ON' : 'OFF'}</span>
            </button>

            {/* Translation Toggle */}
            <TranslationToggleButton
              size="sm"
              showTranslation={showTranslation}
              onToggle={(enabled) => setShowTranslation(enabled)}
            />

            {/* Audio narration */}
            {selectedReading.audioScript && (
              <AudioButton text={selectedReading.audioScript} size="md" />
            )}
          </div>
        </div>

        {/* Tab switch for Passage / Vocabulary / Grammar */}
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('passage')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'passage'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen size={14} />
            <span>Passage (本文)</span>
          </button>

          {selectedReading.vocabularyList && selectedReading.vocabularyList.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('vocab')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'vocab'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>Vocabulary ({selectedReading.vocabularyList.length})</span>
            </button>
          )}

          {selectedReading.grammarPoints && selectedReading.grammarPoints.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('grammar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'grammar'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>Grammar Points ({selectedReading.grammarPoints.length})</span>
            </button>
          )}
        </div>

        {/* 4. Tab Contents */}
        {activeTab === 'passage' && (
          <div className="p-6 rounded-2xl bg-amber-50/20 dark:bg-slate-950 border border-amber-100 dark:border-slate-800 space-y-4">
            {readingMode === 'continuous' ? (
              <div className="font-japanese text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-loose whitespace-pre-line">
                <RubyText text={selectedReading.passage} forceFurigana={showFurigana} />
              </div>
            ) : (
              <div className="space-y-3 font-japanese text-base leading-loose">
                {sentences.map((sent, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">
                      {idx + 1}
                    </span>
                    <div className="flex-1 text-slate-900 dark:text-slate-100">
                      <RubyText text={sent} forceFurigana={showFurigana} />
                    </div>
                    <AudioButton text={sent.replace(/\[(.+?)\]\{.+?\}/g, '$1')} size="sm" />
                  </div>
                ))}
              </div>
            )}

            {/* Translation reveal */}
            {showTranslation && (
              <div className="mt-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-fade-in space-y-2">
                <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] block mb-1">
                  {t('common.translation')} ({activeLang.toUpperCase()}):
                </span>
                <p className={`whitespace-pre-line leading-relaxed ${activeLang === 'my' ? 'font-myanmar' : ''}`}>
                  {activeLang === 'my' && selectedReading.translationMy
                    ? selectedReading.translationMy
                    : getLocalizedReadingPassage(
                        selectedReading.id,
                        activeLang,
                        selectedReading.translationEn
                      )}
                </p>
                {activeLang !== 'en' && activeLang !== 'ja' && selectedReading.translationEn && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400 whitespace-pre-line leading-relaxed">
                    <span className="font-bold text-[10px] uppercase text-slate-400 block mb-0.5">
                      EN (Reference):
                    </span>
                    {selectedReading.translationEn}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Vocabulary List with Meaning in EN & MY */}
        {activeTab === 'vocab' && selectedReading.vocabularyList && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {selectedReading.vocabularyList.map((v, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-japanese font-bold text-base text-purple-700 dark:text-purple-300">
                        {v.word}
                      </span>
                      <span className="text-xs text-slate-400 font-japanese">({v.reading})</span>
                    </div>
                    <AudioButton text={v.word} size="sm" />
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-200">
                    <span className="font-semibold text-slate-900 dark:text-white">Meaning: </span>
                    <span>{v.meaning}</span>
                  </p>
                  {v.meaningMy && (
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold font-myanmar">
                      🇲🇲 {v.meaningMy}
                    </p>
                  )}
                  {v.example && (
                    <p className="text-[11px] font-japanese text-slate-500 dark:text-slate-400 italic">
                      "{v.example}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Grammar Points Explanation */}
        {activeTab === 'grammar' && selectedReading.grammarPoints && (
          <div className="space-y-3">
            <div className="space-y-2.5">
              {selectedReading.grammarPoints.map((gp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-rose-600 text-white font-japanese">
                      {gp.grammar}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {gp.meaning}
                    </span>
                  </div>

                  {gp.meaningMy && (
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold font-myanmar">
                      🇲🇲 {gp.meaningMy}
                    </p>
                  )}

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {gp.explanation}
                  </p>

                  {gp.exampleJp && (
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-200/60 dark:border-rose-900/40 text-xs font-japanese font-medium text-slate-800 dark:text-slate-200">
                      <span className="text-slate-400 mr-1.5 font-bold">例文:</span>
                      <span>{gp.exampleJp}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Comprehension Questions Section */}
        <div className="space-y-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle size={17} className="text-amber-500" />
              <span>
                {t('reading.questions')} ({selectedReading.questions.length})
              </span>
            </h3>
            <span className="text-xs text-slate-400">
              Select one correct answer for each question
            </span>
          </div>

          <div className="space-y-4">
            {selectedReading.questions.map((q, idx) => {
              const selected = userAnswers[q.id];
              const isCorrect = selected === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-700/60 space-y-3"
                >
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-japanese leading-relaxed">
                    {idx + 1}. {q.questionJp}
                  </h4>
                  {q.questionEn && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                      {q.questionEn}
                    </p>
                  )}
                  {activeLang === 'my' && q.questionMy && (
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold font-myanmar">
                      🇲🇲 {q.questionMy}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selected === optIdx;
                      let btnStyle =
                        'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-400';

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle =
                            'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold';
                        } else if (isThisSelected && !isCorrect) {
                          btnStyle =
                            'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                        }
                      } else if (isThisSelected) {
                        btnStyle =
                          'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold shadow-xs';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-xs text-left transition-all font-japanese cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-bold mr-2 text-slate-400">{optIdx + 1}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Explanation on Submission */}
                  {isSubmitted && (
                    <div className="mt-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 animate-fade-in">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        <span>{t('common.explanation')}:</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>
                      {activeLang === 'my' && q.explanationMy && (
                        <p className="text-emerald-800 dark:text-emerald-300 font-semibold font-myanmar leading-relaxed">
                          🇲🇲 {q.explanationMy}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length < selectedReading.questions.length}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              {t('common.submit')}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <span>
                    Practice submitted: {
                      selectedReading.questions.filter((q) => userAnswers[q.id] === q.correctIndex)
                        .length
                    } of {selectedReading.questions.length} correct
                  </span>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setUserAnswers({});
                      setIsSubmitted(false);
                      setShowTranslation(false);
                    }}
                    className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw size={14} /> Retry
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTranslation((prev) => !prev)}
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    {showTranslation ? 'Hide Translation' : 'View Translation'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextIdx =
                        (allLevelReadings.findIndex((r) => r.id === selectedReading.id) + 1) %
                        allLevelReadings.length;
                      handleSelectPassage(allLevelReadings[nextIdx]);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                  >
                    Next Passage
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Reading Generator Modal */}
      <AIReadingGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        defaultLevel={activeLevel}
        onGenerated={(newExercise) => {
          setSelectedReading(newExercise);
          setUserAnswers({});
          setIsSubmitted(false);
        }}
      />

      {/* Reading Progress Modal */}
      <ReadingProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        activeLevel={activeLevel}
      />

      {/* PRO Access Gate Modal */}
      <AIAccessGateModal isOpen={isAiGateOpen} onClose={() => setIsAiGateOpen(false)} />
    </div>
  );
};

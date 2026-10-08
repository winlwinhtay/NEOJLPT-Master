// ============================================================================
// BUSINESS JAPANESE LESSON STUDY MODAL (ビジネス日本語 レッスン学習モーダル)
// Complete Interactive Lesson Runner with Dialogue Audio, Vocab, Grammar,
// Real-world Etiquette Quizzes & In-App Japanese Keyboard Typing Practice
// ============================================================================

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  BookOpen,
  Volume2,
  MessageSquare,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock,
  ShieldCheck,
  HelpCircle,
  Lightbulb,
  ExternalLink,
  Check,
  AlertCircle,
  Keyboard,
  RotateCcw,
  Eye,
  EyeOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SessionPersistenceService } from '../../session/persistence/SessionPersistenceService';
import { adaptBusinessLessonQuizItem } from '../../session/adapters/businessAdapter';
import { BusinessLesson } from '../../types/business';
import {
  getBusinessLessonDetail,
  BusinessLessonDetail,
} from '../../data/business/businessLessonDetailData';
import { AudioButton } from '../common/AudioButton';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';
import { useJapaneseKeyboard } from '../../context/JapaneseKeyboardContext';
import { TranslationToggleButton } from '../common/TranslationToggleButton';

interface BusinessLessonModalProps {
  lesson: BusinessLesson | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onSelectNextLesson?: () => void;
  onSelectPrevLesson?: () => void;
  hasNextLesson?: boolean;
  hasPrevLesson?: boolean;
  onOpenStudioTab?: (tabId: string) => void;
}

export const BusinessLessonModal: React.FC<BusinessLessonModalProps> = ({
  lesson,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete,
  onSelectNextLesson,
  onSelectPrevLesson,
  hasNextLesson,
  hasPrevLesson,
  onOpenStudioTab,
}) => {
  const { profile, addXP, logActivity } = useUser();
  const { language } = useI18n();
  const activeLang = profile.translationLanguage || language || 'en';
  const { openKeyboard, registerActiveInput } = useJapaneseKeyboard();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'dialogue' | 'vocab' | 'grammar' | 'quiz' | 'typing'
  >('overview');

  // Translation Reveal Overrides (when translation is turned off)
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Quiz State
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Typing practice state
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const typingInputRef = useRef<HTMLInputElement>(null);

  // Reset tab and states when lesson changes
  useEffect(() => {
    setActiveTab('overview');
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
    setActivePhraseIndex(0);
    setTypedInput('');
  }, [lesson?.id]);

  // Register typing input to Japanese Virtual Keyboard
  useEffect(() => {
    if (activeTab === 'typing' && typingInputRef.current) {
      registerActiveInput(typingInputRef.current);
    }
  }, [activeTab, registerActiveInput]);

  if (!isOpen || !lesson) return null;

  const detail: BusinessLessonDetail = getBusinessLessonDetail(lesson);
  const currentPhrase = detail.typingPracticePhrases[activePhraseIndex] || {
    phraseJp: '承知いたしました。',
    reading: 'しょうちいたしました。',
    meaningEn: 'Understood.',
  };

  const isTypingExactMatch =
    typedInput.trim() === currentPhrase.phraseJp ||
    typedInput.trim() === currentPhrase.reading ||
    typedInput.trim() === currentPhrase.phraseJp.replace(/[。、]/g, '');

  const handleCompleteLessonWithReward = () => {
    if (!isCompleted) {
      onToggleComplete(lesson.id);
      addXP(50, `Completed Business Lesson: ${lesson.titleJp}`);
      logActivity('practice', 2);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}
    } else {
      onToggleComplete(lesson.id);
    }
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckQuiz = () => {
    if (quizSubmitted) return;
    setQuizSubmitted(true);

    let allCorrect = true;
    detail.quiz.forEach((q) => {
      const isCor = selectedQuizAnswers[q.id] === q.correctAnswer;
      if (!isCor) {
        allCorrect = false;
        SessionPersistenceService.recordMistake(
          adaptBusinessLessonQuizItem(q),
          selectedQuizAnswers[q.id] !== undefined ? q.options[selectedQuizAnswers[q.id]] : '(No answer)',
          q.options[q.correctAnswer] || String(q.correctAnswer)
        );
      }
    });

    if (allCorrect && detail.quiz.length > 0) {
      addXP(25, 'Perfect Business Etiquette Quiz Score!');
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch (e) {}
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
  };

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: '📖 概要・ルール', icon: <BookOpen size={15} /> },
    { id: 'dialogue', label: '💬 実践対話', icon: <MessageSquare size={15} /> },
    { id: 'vocab', label: '🔤 重要語彙', icon: <Award size={15} /> },
    { id: 'grammar', label: '📐 敬語・文型', icon: <ShieldCheck size={15} /> },
    { id: 'quiz', label: '🎯 確認テスト', icon: <HelpCircle size={15} /> },
    { id: 'typing', label: '⌨️ タイピング練習', icon: <Keyboard size={15} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* ================================================================= */}
        {/* HEADER BAR */}
        {/* ================================================================= */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {isCompleted ? <CheckCircle2 size={22} /> : `L${lesson.lessonNumber}`}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                  Lesson {lesson.lessonNumber}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold font-mono">
                  JLPT {lesson.prerequisiteJpLevel}
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {lesson.estimatedMinutes} mins
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate font-japanese">
                {lesson.titleJp}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {lesson.titleEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <TranslationToggleButton size="sm" />

            <button
              type="button"
              onClick={handleCompleteLessonWithReward}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                isCompleted
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Done (+50 XP)'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* TABS NAVIGATION */}
        {/* ================================================================= */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* TAB BODY (SCROLLABLE) */}
        {/* ================================================================= */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW & RULES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Situation Briefing Card */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 dark:text-indigo-300">
                    Corporate Scenario & Context
                  </span>
                  <AudioButton text={lesson.titleJp} size="sm" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-japanese">
                  {lesson.titleJp}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {detail.scenarioOverview}
                </p>
                <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-indigo-100/80 dark:border-indigo-900/40">
                  🏢 <strong>Environment:</strong> {detail.officeContext}
                </div>
              </div>

              {/* 3 Golden Etiquette Rules */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Key Professional Etiquette Rules</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detail.etiquetteRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Insight Callout */}
              {lesson.culturalNote && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1 text-xs">
                  <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <Lightbulb size={16} />
                    <span>Workplace Cultural Insight (商習慣)</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                    {lesson.culturalNote}
                  </p>
                </div>
              )}

              {/* Studio Shortcut Banner */}
              {detail.studioShortcut && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                      Dedicated Studio Practice
                    </span>
                    <p className="text-xs font-semibold text-white">
                      Practice this lesson interactively with our specialized tools!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenStudioTab && detail.studioShortcut) {
                        onClose();
                        onOpenStudioTab(detail.studioShortcut.tabId);
                      }
                    }}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <span>{detail.studioShortcut.buttonText}</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WORKPLACE DIALOGUE */}
          {activeTab === 'dialogue' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Listen to the native voice audio and analyze the speech patterns line by line.
                </span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {detail.dialogue.length} dialogue turns
                </span>
              </div>

              <div className="space-y-4">
                {detail.dialogue.map((line) => (
                  <div
                    key={line.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2.5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                          {line.speaker}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {line.speakerRole}
                        </span>
                      </div>
                      <AudioButton text={line.japanese} size="sm" />
                    </div>

                    <div className="space-y-1">
                      <p className="font-japanese text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                        {line.japanese}
                      </p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-japanese">
                        {line.reading}
                      </p>
                    </div>

                    {profile.showTranslation !== false || revealedItems[line.id] ? (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/50 space-y-1 text-xs">
                        {activeLang === 'my' && line.myanmar ? (
                          <p className="text-slate-800 dark:text-slate-200 font-medium">
                            <span className="font-bold text-[10px] uppercase text-emerald-600 dark:text-emerald-400 mr-1.5">MY</span>
                            {line.myanmar}
                          </p>
                        ) : null}
                        {line.english && (
                          <p className={activeLang === 'my' && line.myanmar ? 'text-slate-500 dark:text-slate-400' : 'text-slate-700 dark:text-slate-300 font-medium'}>
                            <span className="font-bold text-[10px] uppercase text-indigo-500 mr-1.5">EN</span>
                            {line.english}
                          </p>
                        )}
                        {activeLang !== 'my' && line.myanmar && (
                          <p className="text-slate-500 dark:text-slate-400">
                            <span className="font-bold text-[10px] uppercase text-emerald-600 dark:text-emerald-400 mr-1.5">MY</span>
                            {line.myanmar}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="pt-1.5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 italic">Translation hidden for immersion</span>
                        <button
                          type="button"
                          onClick={() => toggleReveal(line.id)}
                          className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          <Eye size={12} />
                          <span>Peek Translation</span>
                        </button>
                      </div>
                    )}

                    {line.note && (
                      <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-1.5 border border-amber-200/60 dark:border-amber-900/40">
                        <Lightbulb size={13} className="shrink-0 mt-0.5" />
                        <span>{line.note}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: KEY VOCABULARY */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {detail.vocabulary.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-lg font-black font-japanese text-slate-900 dark:text-white block">
                          {v.word}
                        </span>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-japanese font-semibold">
                          {v.reading}
                        </span>
                      </div>
                      <AudioButton text={v.word} size="sm" />
                    </div>

                    <div className="text-xs space-y-1">
                      {profile.showTranslation !== false || revealedItems[`vocab-${idx}`] ? (
                        <>
                          {activeLang === 'my' && v.meaningMy ? (
                            <>
                              <p className="font-bold text-slate-800 dark:text-slate-200">
                                {v.meaningMy}
                              </p>
                              {v.meaningEn && (
                                <p className="text-slate-500 dark:text-slate-400">{v.meaningEn}</p>
                              )}
                            </>
                          ) : (
                            <>
                              <p className="font-bold text-slate-800 dark:text-slate-200">
                                {v.meaningEn}
                              </p>
                              {v.meaningMy && (
                                <p className="text-slate-500 dark:text-slate-400">{v.meaningMy}</p>
                              )}
                            </>
                          )}
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                            💡 {v.nuance}
                          </p>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleReveal(`vocab-${idx}`)}
                          className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline cursor-pointer py-1"
                        >
                          <Eye size={12} />
                          <span>Reveal Meaning (Active Recall)</span>
                        </button>
                      )}
                    </div>

                    {v.exampleSentence && (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-xs font-japanese text-slate-700 dark:text-slate-300">
                        <span>{v.exampleSentence}</span>
                        <AudioButton text={v.exampleSentence} size="sm" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: KEIGO & GRAMMAR PATTERNS */}
          {activeTab === 'grammar' && (
            <div className="space-y-6">
              {detail.grammar.map((g, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900 dark:text-white font-japanese">
                      {g.pattern}
                    </span>
                    <AudioButton text={g.pattern} size="sm" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 text-xs font-mono font-bold text-indigo-800 dark:text-indigo-300">
                    Structure: {g.structure}
                  </div>

                  <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                    {profile.showTranslation !== false || revealedItems[`grammar-${idx}`] ? (
                      <>
                        {activeLang === 'my' && g.meaningMy ? (
                          <>
                            <p>
                              <strong>အဓိပ္ပာယ်:</strong> {g.meaningMy}
                            </p>
                            {g.meaningEn && (
                              <p className="text-slate-500 dark:text-slate-400">
                                <strong>EN:</strong> {g.meaningEn}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <p>
                              <strong>Meaning:</strong> {g.meaningEn}
                            </p>
                            {g.meaningMy && (
                              <p className="text-slate-500 dark:text-slate-400">
                                <strong>MY:</strong> {g.meaningMy}
                              </p>
                            )}
                          </>
                        )}
                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                          Rule: {g.usageRule}
                        </p>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleReveal(`grammar-${idx}`)}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline cursor-pointer py-1"
                      >
                        <Eye size={12} />
                        <span>Reveal Grammar Meaning</span>
                      </button>
                    )}
                  </div>

                  {g.comparison && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5 text-xs">
                      <span className="font-bold text-amber-800 dark:text-amber-300 block text-[11px] uppercase">
                        ⚠️ Common Etiquette Pitfall
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg text-rose-800 dark:text-rose-300">
                          <span className="font-bold block">❌ Avoid:</span>
                          {g.comparison.incorrectOrRude}
                        </div>
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-emerald-800 dark:text-emerald-300">
                          <span className="font-bold block">✓ Use:</span>
                          {g.comparison.correctBusiness}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                        {g.comparison.reason}
                      </p>
                    </div>
                  )}

                  {/* Examples */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">
                      Authentic Examples:
                    </span>
                    {g.examples.map((ex, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <p className="font-japanese font-bold text-slate-900 dark:text-white">
                            {ex.japanese}
                          </p>
                          <p className="text-[11px] text-slate-400 font-japanese">{ex.reading}</p>
                          <p className="text-slate-600 dark:text-slate-300">{ex.english}</p>
                        </div>
                        <AudioButton text={ex.japanese} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: PRACTICE QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Workplace Comprehension Check ({detail.quiz.length} Questions)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Test your understanding of in-group rules, proper cushion phrases, and business honorifics.
                  </p>
                </div>
                {quizSubmitted && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Retake Quiz</span>
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {detail.quiz.map((q, qIdx) => {
                  const selected = selectedQuizAnswers[q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = selected === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white font-japanese">
                          {qIdx + 1}. {q.promptJp}
                        </h4>
                        <AudioButton text={q.promptJp} size="sm" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{q.promptEn}</p>

                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isThisSelected = selected === optIdx;

                          let btnStyle =
                            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

                          if (quizSubmitted) {
                            if (optIdx === q.correctAnswer) {
                              btnStyle =
                                'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                            } else if (isThisSelected && !isCorrect) {
                              btnStyle =
                                'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                            }
                          } else if (isThisSelected) {
                            btnStyle =
                              'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`p-3 rounded-xl border text-left text-xs font-japanese transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctAnswer && (
                                <Check size={16} className="text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div
                          className={`p-3 rounded-xl text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40'
                              : 'bg-rose-50/80 dark:bg-rose-950/30 text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40'
                          }`}
                        >
                          <span className="font-bold block mb-0.5">
                            {isCorrect ? '✓ Correct!' : '❌ Incorrect'}
                          </span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCheckQuiz}
                    disabled={Object.keys(selectedQuizAnswers).length === 0}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    Submit Answers & Check Etiquette
                  </button>
                </div>
              ) : (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: IN-APP JAPANESE KEYBOARD TYPING PRACTICE */}
          {activeTab === 'typing' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300">
                    Practice Typing Japanese Business Phrases
                  </span>
                  <div className="flex items-center gap-1.5">
                    {detail.typingPracticePhrases.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActivePhraseIndex(idx);
                          setTypedInput('');
                        }}
                        className={`w-6 h-6 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          activePhraseIndex === idx
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xl sm:text-2xl font-black font-japanese text-slate-900 dark:text-white block">
                      {currentPhrase.phraseJp}
                    </span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-japanese font-semibold">
                      {currentPhrase.reading}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{currentPhrase.meaningEn}</p>
                  </div>
                  <AudioButton text={currentPhrase.phraseJp} size="md" />
                </div>

                {/* Typing Input with Virtual Keyboard Trigger */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Type the phrase above (use physical keyboard or virtual keyboard):
                    </label>
                    <button
                      type="button"
                      onClick={() => openKeyboard()}
                      className="px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Keyboard size={14} />
                      <span>⌨ 日本語キーボード</span>
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      ref={typingInputRef}
                      type="text"
                      value={typedInput}
                      onChange={(e) => setTypedInput(e.target.value)}
                      placeholder="ここに入力してください (Type here)..."
                      className={`w-full px-4 py-3 text-base rounded-xl font-japanese border outline-none transition-all ${
                        isTypingExactMatch
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-100'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-indigo-500'
                      }`}
                    />

                    {isTypingExactMatch && (
                      <span className="absolute right-3 top-3 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs animate-bounce">
                        <Check size={13} />
                        <span>正解！ (Matched)</span>
                      </span>
                    )}
                  </div>
                </div>

                {isTypingExactMatch && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200 animate-fade-in">
                    <span>
                      🎉 Great typing! You earned +15 XP for practicing authentic Japanese typing!
                    </span>
                    {activePhraseIndex + 1 < detail.typingPracticePhrases.length && (
                      <button
                        type="button"
                        onClick={() => {
                          setActivePhraseIndex((prev) => prev + 1);
                          setTypedInput('');
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <span>Next Phrase</span>
                        <ChevronRight size={13} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* FOOTER BAR (NAVIGATION & COMPLETION) */}
        {/* ================================================================= */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onSelectPrevLesson}
            disabled={!hasPrevLesson}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            <span>Prev Lesson</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCompleteLessonWithReward}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                isCompleted
                  ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'
              }`}
            >
              <CheckCircle2 size={16} />
              <span>{isCompleted ? 'Completed ✓ (+50 XP)' : 'Mark Lesson Complete (+50 XP)'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onSelectNextLesson}
            disabled={!hasNextLesson}
            className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Next Lesson</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

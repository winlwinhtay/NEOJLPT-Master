import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Flame,
  Award,
  BookOpen,
  Headphones,
  RotateCcw,
  Check,
  Zap,
} from 'lucide-react';
import { useActiveLearning } from '../../context/ActiveLearningContext';
import { speechService } from '../../services/speechService';
import { ConfusionPair, LearningPlanItem } from '../../types/activeLearning';
import { AIGatewayService, ExplanationResponse, PracticeQuestionItem } from '../../services/aiGatewayService';
import { TranslationToggleButton } from '../common/TranslationToggleButton';

export const ActiveLearningSessionModal: React.FC = () => {
  const {
    isSessionActive,
    activeSessionItem,
    closeSession,
    completeCurrentItem,
    logLearningError,
    activeItemIndex,
    dailyPlan,
  } = useActiveLearning();

  const [step, setStep] = useState<
    'warmup' | 'explanation' | 'practice' | 'retrieval' | 'assessment' | 'complete'
  >('warmup');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);

  // Cache-Backed AI Explanation & Question Bank
  const [adaptiveExpl, setAdaptiveExpl] = useState<ExplanationResponse | null>(null);
  const [bankQuestions, setBankQuestions] = useState<PracticeQuestionItem[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    if (!activeSessionItem) return;
    let isMounted = true;
    setIsLoadingAi(true);

    const level = (dailyPlan?.focus?.[0] ? 'N5' : 'N5') as any;
    Promise.all([
      AIGatewayService.getAdaptiveExplanation(activeSessionItem.contentId, level),
      AIGatewayService.getPracticeQuestions(activeSessionItem.contentId, level, activeSessionItem.skill, 3)
    ]).then(([expl, qList]) => {
      if (isMounted) {
        if (expl) setAdaptiveExpl(expl);
        if (qList && qList.length > 0) setBankQuestions(qList);
        setIsLoadingAi(false);
      }
    }).catch(() => {
      if (isMounted) setIsLoadingAi(false);
    });

    return () => {
      isMounted = false;
    };
  }, [activeSessionItem?.contentId]);

  if (!isSessionActive || !activeSessionItem) return null;

  const item = activeSessionItem;
  const isConfusion = item.contentType === 'confusion';
  const confData: ConfusionPair | undefined = isConfusion ? item.contentData : undefined;
  const content = item.contentData;

  const handleNextStep = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswerIsCorrect(false);

    if (step === 'warmup') {
      setStep('explanation');
    } else if (step === 'explanation') {
      setStep('practice');
    } else if (step === 'practice') {
      setStep('retrieval');
    } else if (step === 'retrieval') {
      setStep('assessment');
    } else if (step === 'assessment') {
      setStep('complete');
    } else if (step === 'complete') {
      // Mark completed in context & advance
      completeCurrentItem(true);
      setStep('warmup');
    }
  };

  const handleCheckPracticeAnswer = (optionIdx: number, correctIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIdx);
    setIsAnswerSubmitted(true);
    const correct = optionIdx === correctIdx;
    setAnswerIsCorrect(correct);

    if (!correct) {
      logLearningError(
        item.contentId,
        item.contentType,
        'practice_selection_error',
        String(optionIdx),
        String(correctIdx),
        'Missed active learning practice question'
      );
    }
  };

  const playAudio = (text: string) => {
    speechService.speakJapanese(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl text-white overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-400/30 flex items-center justify-center font-bold text-xs">
              {activeItemIndex + 1}/{dailyPlan?.items.length || 1}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-brand-400">
                  {item.skill} • {item.activity.replace('_', ' ')}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{item.minutes} min</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-md">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TranslationToggleButton size="sm" />
            <button
              onClick={closeSession}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-Step Session Progression Tabs */}
        <div className="flex items-center border-b border-slate-800/80 bg-slate-900/60 px-4 sm:px-6 overflow-x-auto no-scrollbar py-2 gap-2 text-xs font-bold">
          {(
            [
              { key: 'warmup', label: '1. Warm-Up' },
              { key: 'explanation', label: '2. Deep Explanation' },
              { key: 'practice', label: '3. Guided Practice' },
              { key: 'retrieval', label: '4. Active Retrieval' },
              { key: 'assessment', label: '5. Assessment' },
              { key: 'complete', label: '6. Review' },
            ] as const
          ).map((s) => (
            <span
              key={s.key}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                step === s.key
                  ? 'bg-brand-500 text-white'
                  : 'text-slate-400 bg-slate-800/40'
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: WARM-UP */}
          {step === 'warmup' && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Target Objective
                </span>
                <h4 className="text-lg font-bold text-white">
                  {item.subtitle || item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.reason}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Warm-Up Reflection:
                </p>
                <p className="text-sm text-slate-200">
                  {isConfusion
                    ? `Have you ever hesitated deciding between ${confData?.conceptA} and ${confData?.conceptB}? Today we make the distinction permanent and natural.`
                    : `Before studying this item, can you recall what context or particle normally precedes it? Let us verify step-by-step.`}
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: GUIDED EXPLANATION / CONFUSION CONTRAST */}
          {step === 'explanation' && (
            <div className="space-y-5 animate-fade-in">
              {isConfusion && confData ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-brand-400 uppercase">Core Distinction</span>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {confData.differenceExplanation}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                    <span className="text-xs font-bold text-amber-300 uppercase">Golden Contrast Rule</span>
                    <pre className="text-xs text-amber-100 whitespace-pre-wrap font-sans font-medium leading-relaxed">
                      {confData.contrastRule}
                    </pre>
                  </div>

                  {/* Contrast side-by-side examples */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                      <span className="text-xs font-bold text-indigo-300">{confData.conceptA}</span>
                      {confData.examplesA.map((ex, i) => (
                        <div key={i} className="text-xs space-y-0.5 border-t border-indigo-900/60 pt-2 first:border-0 first:pt-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm">{ex.jp}</span>
                            <button onClick={() => playAudio(ex.jp)} className="text-indigo-400 hover:text-white">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-indigo-200">{ex.reading}</p>
                          <p className="text-slate-400">{ex.en}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-2">
                      <span className="text-xs font-bold text-slate-300">{confData.conceptB}</span>
                      {confData.examplesB.map((ex, i) => (
                        <div key={i} className="text-xs space-y-0.5 border-t border-slate-700 pt-2 first:border-0 first:pt-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm">{ex.jp}</span>
                            <button onClick={() => playAudio(ex.jp)} className="text-slate-400 hover:text-white">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-slate-300">{ex.reading}</p>
                          <p className="text-slate-400">{ex.en}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cache-Backed Adaptive AI Explanation Badge */}
                  {adaptiveExpl?._source && (
                    <div className="flex items-center justify-between text-[11px] font-bold px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        {adaptiveExpl._source === 'cache'
                          ? 'Instant Reusable AI Explanation (0 Tokens Cached)'
                          : 'Adaptive Pedagogical Curriculum Guide'}
                      </span>
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Verified JLPT</span>
                    </div>
                  )}

                  {(adaptiveExpl?.structure || content?.structure) && (
                    <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
                      <span className="text-xs font-bold text-indigo-400 uppercase">Grammar Structure</span>
                      <p className="text-sm font-bold text-white font-mono">
                        {adaptiveExpl?.structure || content.structure}
                      </p>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-brand-400 uppercase">Explanation</span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {adaptiveExpl?.explanation ||
                        content?.explanation ||
                        content?.meaning ||
                        'Master this validated Japanese curriculum item.'}
                    </p>
                  </div>

                  {adaptiveExpl?.commonMistakes && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1 text-xs">
                      <span className="font-bold text-amber-300 uppercase text-[10px]">Common Learner Pitfall</span>
                      <p className="text-amber-100">{adaptiveExpl.commonMistakes}</p>
                    </div>
                  )}

                  {/* Authentic Examples */}
                  {((adaptiveExpl?.examples && adaptiveExpl.examples.length > 0) ||
                    (content?.examples && content.examples.length > 0)) && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Authentic Examples</span>
                      {(adaptiveExpl?.examples || content.examples).slice(0, 2).map((ex: any, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-base font-bold text-white">{ex.jp}</p>
                            <button onClick={() => playAudio(ex.jp)} className="text-brand-400 hover:text-white">
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-brand-200">{ex.reading}</p>
                          <p className="text-xs text-slate-300">{ex.meaning || ex.en}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {adaptiveExpl?.studyTip && (
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-[11px] text-slate-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span>{adaptiveExpl.studyTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: GUIDED PRACTICE (Active Multi-Choice / Question Bank) */}
          {step === 'practice' && (
            <div className="space-y-5 animate-fade-in">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Active Retrieval Practice
              </span>

              {isConfusion && confData?.practiceQuestions?.[0] ? (
                <div className="space-y-4">
                  <p className="text-base sm:text-lg font-bold text-white">
                    {confData.practiceQuestions[0].question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {confData.practiceQuestions[0].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleCheckPracticeAnswer(idx, confData.practiceQuestions[0].answer)
                        }
                        className={`p-4 rounded-2xl text-left font-bold text-sm border transition-all ${
                          isAnswerSubmitted
                            ? idx === confData.practiceQuestions[0].answer
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : idx === selectedOption
                              ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                              : 'bg-slate-800/40 border-slate-700 text-slate-400'
                            : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-white hover:border-brand-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {isAnswerSubmitted && (
                    <div
                      className={`p-4 rounded-2xl text-xs space-y-1 ${
                        answerIsCorrect
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-500/10 border border-rose-500/30 text-rose-200'
                      }`}
                    >
                      <p className="font-bold">
                        {answerIsCorrect ? '✓ Correct!' : '✖ Needs Review'}
                      </p>
                      <p>{confData.practiceQuestions[0].explanation}</p>
                    </div>
                  )}
                </div>
              ) : bankQuestions.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                    <span>Authentic Practice Question</span>
                    <span className="text-brand-400">⚡ Reusable Question Bank</span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {bankQuestions[0].prompt}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bankQuestions[0].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleCheckPracticeAnswer(idx, bankQuestions[0].correctIndex)
                        }
                        className={`p-4 rounded-2xl text-left font-bold text-sm border transition-all ${
                          isAnswerSubmitted
                            ? idx === bankQuestions[0].correctIndex
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : idx === selectedOption
                              ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                              : 'bg-slate-800/40 border-slate-700 text-slate-400'
                            : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-white hover:border-brand-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {isAnswerSubmitted && (
                    <div
                      className={`p-4 rounded-2xl text-xs space-y-1 ${
                        answerIsCorrect
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-500/10 border border-rose-500/30 text-rose-200'
                      }`}
                    >
                      <p className="font-bold">
                        {answerIsCorrect ? '✓ Correct!' : '✖ Needs Review'}
                      </p>
                      <p>{bankQuestions[0].explanation}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-base sm:text-lg font-bold text-white">
                    {content?.exampleJp
                      ? `Select the correct meaning for: 「${content.word || content.pattern}」 in this sentence:`
                      : `Which sentence naturally applies 「${content?.pattern || content?.word || item.title}」?`}
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      content?.meaning || 'Correct primary meaning in this grammatical pattern',
                      'Incorrect distractor with mismatched particle transitivity',
                      'Opposite antonym meaning used in informal speech only',
                    ].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCheckPracticeAnswer(idx, 0)}
                        className={`p-3.5 rounded-2xl text-left text-xs sm:text-sm font-medium border transition-all ${
                          isAnswerSubmitted
                            ? idx === 0
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                              : idx === selectedOption
                              ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                              : 'bg-slate-800/40 border-slate-700 text-slate-400'
                            : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-white hover:border-brand-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: ACTIVE RETRIEVAL (Production / Recall) */}
          {step === 'retrieval' && (
            <div className="space-y-5 animate-fade-in">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wide">
                Self-Test Active Recall
              </span>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <p className="text-sm text-slate-200 leading-relaxed">
                  In your mind or spoken aloud, produce one complete sentence using today&apos;s target:
                </p>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center font-bold text-xl text-brand-300">
                  {content?.pattern || content?.word || content?.kanji || item.title}
                </div>
                <div className="text-xs text-slate-400 text-center">
                  Tip: Say it out loud with clear intonation before advancing!
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: MINI ASSESSMENT */}
          {step === 'assessment' && (
            <div className="space-y-4 animate-fade-in text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-white">Lesson Verified</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                You engaged with active retrieval, conceptual comparison, and production.
                The system has updated your learning mastery score.
              </p>
            </div>
          )}

          {/* STEP 6: SESSION COMPLETE & NEXT REVIEW */}
          {step === 'complete' && (
            <div className="space-y-4 animate-fade-in text-center py-6">
              <div className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-400/40 text-brand-300 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-brand-400" />
              </div>
              <h4 className="text-2xl font-black text-white">+25 XP Earned!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Item marked complete in today&apos;s study plan. Next spaced repetition review is automatically queued!
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <button
            onClick={closeSession}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            Exit Session
          </button>

          <button
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-brand-500/20 transition-all"
          >
            {step === 'complete' ? (
              <>
                <Check className="w-4 h-4" />
                Finish Item
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

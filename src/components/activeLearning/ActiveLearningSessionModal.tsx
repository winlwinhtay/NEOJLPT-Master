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
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';
import { SupportedLanguage } from '../../types/i18n';
import { speechService } from '../../services/speechService';
import { ConfusionPair, LearningPlanItem } from '../../types/activeLearning';
import { AIGatewayService, ExplanationResponse, PracticeQuestionItem } from '../../services/aiGatewayService';
import { TranslationToggleButton } from '../common/TranslationToggleButton';
import { translateExampleSentence } from '../../data/translations/multilingualEngine';
import { CANONICAL_GRAMMAR } from '../../data/canonicalGrammarData';
import { VOCABULARY_DATA } from '../../data/vocabularySeed';
import { KANJI_DATA } from '../../data/kanjiSeed';

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

  const { profile } = useUser();
  const { language } = useI18n();
  const activeLang = ((profile.translationLanguage || language || 'en') as SupportedLanguage);
  const isTransOn = profile.showTranslation !== false;

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
    // CRITICAL: Immediately clear stale explanation/questions so previous items don't leak into new items!
    setAdaptiveExpl(null);
    setBankQuestions([]);

    const cleanPat = (activeSessionItem.title || '').replace(/^Grammar:\s*/i, '').replace(/^Grammar Focus:\s*/i, '').trim();
    const resolvedG = (activeSessionItem.contentType === 'grammar' || activeSessionItem.skill === 'grammar')
      ? CANONICAL_GRAMMAR.find((g) => g.id === activeSessionItem.contentId || g.pattern === activeSessionItem.contentId || g.pattern === activeSessionItem.contentData?.pattern || g.pattern === cleanPat)
      : null;
    const level = (resolvedG?.level || activeSessionItem.contentData?.level || dailyPlan?.focus?.[0] || 'N5') as any;

    Promise.all([
      AIGatewayService.getAdaptiveExplanation(activeSessionItem.contentId, level, activeLang),
      AIGatewayService.getPracticeQuestions(activeSessionItem.contentId, level, activeSessionItem.skill, 3, activeLang)
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
  }, [activeSessionItem?.contentId, activeLang]);

  if (!isSessionActive || !activeSessionItem) return null;

  // Dynamically resolve canonical item to bridge any gap with stored data
  const item = activeSessionItem;
  const isConfusion = item.contentType === 'confusion';
  const confData: ConfusionPair | undefined = isConfusion ? item.contentData : undefined;

  const cleanPattern = (item.title || '').replace(/^Grammar:\s*/i, '').replace(/^Grammar Focus:\s*/i, '').trim();
  const canonicalGrammar = (item.contentType === 'grammar' || item.skill === 'grammar')
    ? (CANONICAL_GRAMMAR.find((g) => g.id === item.contentId || g.pattern === item.contentId || g.pattern === item.contentData?.pattern || g.pattern === cleanPattern) || (item.contentData as any))
    : null;
  const cleanWord = (item.title || '').replace(/^Vocab:\s*/i, '').replace(/^Vocab Study:\s*/i, '').trim();
  const canonicalVocab = (item.contentType === 'vocab' || item.skill === 'vocabulary')
    ? (VOCABULARY_DATA.find((v) => v.id === item.contentId || v.word === item.contentId || v.word === item.contentData?.word || v.word === cleanWord) || (item.contentData as any))
    : null;
  const cleanKanji = (item.title || '').replace(/^Kanji:\s*/i, '').replace(/^Kanji Study:\s*/i, '').trim();
  const canonicalKanji = (item.contentType === 'kanji' || item.skill === 'kanji')
    ? (KANJI_DATA.find((k) => k.id === item.contentId || k.kanji === item.contentId || k.kanji === item.contentData?.kanji || k.kanji === cleanKanji) || (item.contentData as any))
    : null;

  const content = canonicalGrammar || canonicalVocab || canonicalKanji || item.contentData;

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
        <div className="flex items-center justify-between p-3.5 sm:p-6 border-b border-slate-800 bg-slate-950/40 gap-2.5 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <span className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-400/30 flex items-center justify-center font-bold text-xs shrink-0">
              {activeItemIndex + 1}/{dailyPlan?.items.length || 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs uppercase font-bold text-brand-400 truncate">
                  {item.skill} • {item.activity.replace('_', ' ')}
                </span>
                <span className="text-slate-600 hidden xs:inline">•</span>
                <span className="text-xs text-slate-400 shrink-0 hidden xs:inline">{item.minutes} min</span>
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-white truncate">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <TranslationToggleButton size="sm" />
            <button
              onClick={closeSession}
              aria-label="Close session"
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
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
                  {isTransOn && activeLang === 'my' ? 'ဦးတည်ချက် ရည်မှန်းချက်' : 'Target Objective'}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {isTransOn && canonicalGrammar?.meaningsByLang?.[activeLang]
                    ? `${canonicalGrammar.pattern} (${canonicalGrammar.meaningsByLang[activeLang]})`
                    : isTransOn && canonicalVocab?.meaningsByLang?.[activeLang]
                    ? `${canonicalVocab.word} (${canonicalVocab.meaningsByLang[activeLang]})`
                    : isTransOn && canonicalKanji?.meaningsByLang?.[activeLang]
                    ? `${canonicalKanji.kanji} (${canonicalKanji.meaningsByLang[activeLang]})`
                    : (item.subtitle || item.title)}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isTransOn && activeLang === 'my'
                    ? 'အခြေခံသဘောတရားနှင့် ဝါကျတည်ဆောက်ပုံကို တိကျစွာ လေ့လာမှတ်သားပါ။'
                    : item.reason}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  {isTransOn && activeLang === 'my' ? 'နွေးထွေးမှု ပြန်လည်ဆင်ခြင်ခြင်း:' : 'Warm-Up Reflection:'}
                </p>
                <p className="text-sm text-slate-200">
                  {isConfusion
                    ? (isTransOn && activeLang === 'my'
                        ? `${confData?.conceptA} နှင့် ${confData?.conceptB} ကြား မည်သည့်အရာကို သုံးရမည်မှန်း တွေဝေဖူးပါသလား? ယနေ့တွင် ဤခွဲခြားမှုကို သဘာဝကျကျ အပြီးတိုင် ကျွမ်းကျင်အောင် လုပ်ဆောင်ပါမည်။`
                        : `Have you ever hesitated deciding between ${confData?.conceptA} and ${confData?.conceptB}? Today we make the distinction permanent and natural.`)
                    : (isTransOn && activeLang === 'my'
                        ? 'ဤသဒ္ဒါပုံစံရှေ့တွင် မည်သည့်ကြိယာပုံစံ (သို့မဟုတ်) particle ကပ်လေ့ရှိသည်ကို မှတ်မိပါသလား? အဆင့်ဆင့် စစ်ဆေးလေ့လာကြပါစို့။'
                        : `Before studying this item, can you recall what context or particle normally precedes it? Let us verify step-by-step.`)}
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
                    <span className="text-xs font-bold text-brand-400 uppercase">
                      {isTransOn && activeLang === 'my' ? 'အဓိက ကွဲပြားချက် (Core Distinction)' : 'Core Distinction'}
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {confData.differenceExplanation}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                    <span className="text-xs font-bold text-amber-300 uppercase">
                      {isTransOn && activeLang === 'my' ? 'ရွှေရောင် ခွဲခြားမှတ်သားမှု စည်းမျဉ်း' : 'Golden Contrast Rule'}
                    </span>
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
                            <span className="font-bold text-white text-sm font-japanese">{ex.jp}</span>
                            <button onClick={() => playAudio(ex.jp)} className="text-indigo-400 hover:text-white cursor-pointer">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-indigo-200 font-japanese">{ex.reading}</p>
                          {isTransOn ? (
                            <p className="text-slate-300">
                              {translateExampleSentence(ex.jp, ex.en, activeLang)}
                            </p>
                          ) : (
                            <span className="text-[10px] text-slate-500 italic block">Translation hidden</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-2">
                      <span className="text-xs font-bold text-slate-300">{confData.conceptB}</span>
                      {confData.examplesB.map((ex, i) => (
                        <div key={i} className="text-xs space-y-0.5 border-t border-slate-700 pt-2 first:border-0 first:pt-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm font-japanese">{ex.jp}</span>
                            <button onClick={() => playAudio(ex.jp)} className="text-slate-400 hover:text-white cursor-pointer">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-slate-300 font-japanese">{ex.reading}</p>
                          {isTransOn ? (
                            <p className="text-slate-300">
                              {translateExampleSentence(ex.jp, ex.en, activeLang)}
                            </p>
                          ) : (
                            <span className="text-[10px] text-slate-500 italic block">Translation hidden</span>
                          )}
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

                  {(canonicalGrammar?.structure || adaptiveExpl?.structure || content?.structure) && (
                    <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
                      <span className="text-xs font-bold text-indigo-400 uppercase">
                        {isTransOn && activeLang === 'my' ? 'သဒ္ဒါတည်ဆောက်ပုံ (Structure)' : 'Grammar Structure'}
                      </span>
                      <p className="text-sm font-bold text-white font-mono">
                        {canonicalGrammar?.structure || adaptiveExpl?.structure || content.structure}
                      </p>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-brand-400 uppercase">
                      {isTransOn && activeLang === 'my' ? 'ရှင်းလင်းချက် (Explanation)' : 'Explanation'}
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {isTransOn
                        ? (canonicalGrammar?.explanationsByLang?.[activeLang] ||
                           canonicalGrammar?.meaning ||
                           adaptiveExpl?.explanation ||
                           content?.explanation ||
                           content?.meaning ||
                           'Master this validated Japanese curriculum item.')
                        : (adaptiveExpl?.explanation ||
                           content?.explanation ||
                           content?.meaning ||
                           'Master this validated Japanese curriculum item.')}
                    </p>
                  </div>

                  {adaptiveExpl?.commonMistakes && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1 text-xs">
                      <span className="font-bold text-amber-300 uppercase text-[10px]">
                        {isTransOn && activeLang === 'my' ? 'သတိပြုရန် အမှားများ (Pitfall)' : 'Common Learner Pitfall'}
                      </span>
                      <p className="text-amber-100">{adaptiveExpl.commonMistakes}</p>
                    </div>
                  )}

                  {/* Authentic Examples */}
                  {((canonicalGrammar?.examples && canonicalGrammar.examples.length > 0) ||
                    (adaptiveExpl?.examples && adaptiveExpl.examples.length > 0) ||
                    (content?.examples && content.examples.length > 0)) && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        {isTransOn && activeLang === 'my' ? 'စံပြ ဝါကျလေ့လာရန် (Authentic Examples)' : 'Authentic Examples'}
                      </span>
                      {(canonicalGrammar?.examples || adaptiveExpl?.examples || content.examples).slice(0, 2).map((ex: any, idx: number) => {
                        const translatedMeaning = isTransOn
                          ? (ex.translationsByLang?.[activeLang] ||
                             translateExampleSentence(ex.jp, ex.meaning || ex.en, activeLang))
                          : null;
                        return (
                          <div key={idx} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-base font-bold text-white font-japanese">{ex.jp}</p>
                              <button onClick={() => playAudio(ex.jp)} className="text-brand-400 hover:text-white cursor-pointer">
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-brand-200 font-japanese">{ex.reading}</p>
                            {isTransOn ? (
                              <p className="text-xs text-slate-300">{translatedMeaning || ex.meaning || ex.en}</p>
                            ) : (
                              <span className="text-[10px] text-slate-500 italic block">Translation hidden (Trans OFF)</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(adaptiveExpl?.studyTip || (isTransOn && activeLang === 'my' ? 'မှတ်ဉာဏ်ထဲတွင် စွဲမြဲသွားစေရန် ၃ ရက်ဆက်တိုက် နေ့စဉ် ပြန်လှန်လေ့ကျင့်ပါ။' : 'Review daily for 3 days to cement pattern recognition.')) && (
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-[11px] text-slate-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span>{adaptiveExpl?.studyTip || (isTransOn && activeLang === 'my' ? 'မှတ်ဉာဏ်ထဲတွင် စွဲမြဲသွားစေရန် ၃ ရက်ဆက်တိုက် နေ့စဉ် ပြန်လှန်လေ့ကျင့်ပါ။' : 'Review daily for 3 days to cement pattern recognition.')}</span>
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
                {isTransOn && activeLang === 'my' ? 'အပြန်အလှန် လေ့ကျင့်ခန်း' : 'Active Retrieval Practice'}
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
                        {answerIsCorrect
                          ? (isTransOn && activeLang === 'my' ? '✓ မှန်ကန်ပါသည်!' : '✓ Correct!')
                          : (isTransOn && activeLang === 'my' ? '✖ ပြန်လည်လေ့လာရန် လိုအပ်သည်' : '✖ Needs Review')}
                      </p>
                      <p>{confData.practiceQuestions[0].explanation}</p>
                    </div>
                  )}
                </div>
              ) : bankQuestions.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                    <span>{isTransOn && activeLang === 'my' ? 'စံပြ လေ့ကျင့်ခန်း မေးခွန်း' : 'Authentic Practice Question'}</span>
                    <span className="text-brand-400">{isTransOn && activeLang === 'my' ? '⚡ ပြန်လည်အသုံးပြုနိုင်သော မေးခွန်းဘဏ်' : '⚡ Reusable Question Bank'}</span>
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
                        {answerIsCorrect
                          ? (isTransOn && activeLang === 'my' ? '✓ မှန်ကန်ပါသည်!' : '✓ Correct!')
                          : (isTransOn && activeLang === 'my' ? '✖ ပြန်လည်လေ့လာရန် လိုအပ်သည်' : '✖ Needs Review')}
                      </p>
                      <p>{bankQuestions[0].explanation}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-base sm:text-lg font-bold text-white">
                    {content?.exampleJp
                      ? (isTransOn && activeLang === 'my'
                          ? `အောက်ပါဝါကျရှိ 「${content.word || content.pattern}」 ၏ မှန်ကန်သောအဓိပ္ပာယ်ကို ရွေးချယ်ပါ:`
                          : `Select the correct meaning for: 「${content.word || content.pattern}」 in this sentence:`)
                      : (isTransOn && activeLang === 'my'
                          ? `「${canonicalGrammar?.pattern || content?.pattern || content?.word || item.title}」 ကို သဘာဝကျကျ အသုံးပြုထားသော ဝါကျကို ရွေးချယ်ပါ:`
                          : `Which sentence naturally applies 「${content?.pattern || content?.word || item.title}」?`)}
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      isTransOn && canonicalGrammar?.meaningsByLang?.[activeLang]
                        ? canonicalGrammar.meaningsByLang[activeLang]
                        : isTransOn && canonicalVocab?.meaningsByLang?.[activeLang]
                        ? canonicalVocab.meaningsByLang[activeLang]
                        : content?.meaning || 'Correct primary meaning in this grammatical pattern',
                      isTransOn && activeLang === 'my'
                        ? 'အဓိပ္ပာယ်မတူညီသော အခြားစကားစု'
                        : 'Incorrect distractor with mismatched particle transitivity',
                      isTransOn && activeLang === 'my'
                        ? 'ဆန့်ကျင်ဘက် အဓိပ္ပာယ် (တရားဝင်မဟုတ်သော စကားပြော)'
                        : 'Opposite antonym meaning used in informal speech only',
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
                {isTransOn && activeLang === 'my' ? 'မိမိကိုယ်ကို ပြန်လည်စမ်းသပ် မှတ်ဉာဏ်ဖော်ထုတ်ခြင်း' : 'Self-Test Active Recall'}
              </span>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <p className="text-sm text-slate-200 leading-relaxed">
                  {isTransOn && activeLang === 'my'
                    ? 'ယနေ့ လေ့လာခဲ့သော သင်ခန်းစာကို အသုံးပြု၍ ဝါကျတစ်ကြောင်းကို စိတ်ထဲတွင် (သို့မဟုတ်) အသံထွက်၍ ရွတ်ဆိုကြည့်ပါ:'
                    : "In your mind or spoken aloud, produce one complete sentence using today's target:"}
                </p>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center font-bold text-xl text-brand-300 font-japanese">
                  {canonicalGrammar?.pattern || content?.pattern || content?.word || content?.kanji || item.title}
                </div>
                <div className="text-xs text-slate-400 text-center">
                  {isTransOn && activeLang === 'my'
                    ? 'အကြံပြုချက်: နောက်တစ်ဆင့်သို့ မသွားမီ ရှင်းလင်းပြတ်သားစွာ အသံထွက်၍ ရွတ်ဆိုလေ့ကျင့်ပါ!'
                    : 'Tip: Say it out loud with clear intonation before advancing!'}
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
              <h4 className="text-xl font-black text-white">
                {isTransOn && activeLang === 'my' ? 'သင်ခန်းစာ စစ်ဆေးပြီးပါပြီ' : 'Lesson Verified'}
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {isTransOn && activeLang === 'my'
                  ? 'သင်သည် အပြန်အလှန်မှတ်ဉာဏ်လေ့ကျင့်မှု၊ သဘောတရားခွဲခြားမှုနှင့် ဝါကျထုတ်လုပ်ခြင်းတို့ကို ပြီးမြောက်ခဲ့သည်။ သင်၏ သင်ယူမှု အဆင့်အတန်းရမှတ်ကို မှတ်တမ်းတင်ပြီးပါပြီ။'
                  : 'You engaged with active retrieval, conceptual comparison, and production. The system has updated your learning mastery score.'}
              </p>
            </div>
          )}

          {/* STEP 6: SESSION COMPLETE & NEXT REVIEW */}
          {step === 'complete' && (
            <div className="space-y-4 animate-fade-in text-center py-6">
              <div className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-400/40 text-brand-300 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-brand-400" />
              </div>
              <h4 className="text-2xl font-black text-white">
                {isTransOn && activeLang === 'my' ? '+25 XP ရရှိခဲ့ပါသည်!' : '+25 XP Earned!'}
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                {isTransOn && activeLang === 'my'
                  ? 'ယနေ့ လေ့လာမှုအစီအစဉ်တွင် ပြီးမြောက်ကြောင်း မှတ်တမ်းတင်ပြီးပါပြီ။ Spaced Repetition ပြန်လှန်လေ့ကျင့်ရန် အလိုအလျောက် စီစဉ်ထားပါသည်။'
                  : "Item marked complete in today's study plan. Next spaced repetition review is automatically queued!"}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <button
            onClick={closeSession}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isTransOn && activeLang === 'my' ? 'သင်ခန်းစာမှ ထွက်ရန်' : 'Exit Session'}
          </button>

          <button
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-brand-500/20 transition-all cursor-pointer"
          >
            {step === 'complete' ? (
              <>
                <Check className="w-4 h-4" />
                {isTransOn && activeLang === 'my' ? 'ပြီးဆုံးပါပြီ' : 'Finish Item'}
              </>
            ) : (
              <>
                {isTransOn && activeLang === 'my' ? 'နောက်တစ်ဆင့်' : 'Next Step'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

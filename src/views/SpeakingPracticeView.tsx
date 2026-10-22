import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Keyboard,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { speechService, RecognitionSessionHandle } from '../services/speechService';
import { AudioButton } from '../components/common/AudioButton';
import { JapaneseInput } from '../components/keyboard/JapaneseInput';
import { SpeakingAttemptResult } from '../types/ai';
import { JLPTLevel } from '../types';
import { SPEAKING_EXERCISES } from '../data/speakingData';
import { InteractiveSpeakingStudio } from '../components/speaking/InteractiveSpeakingStudio';
import { AIService } from '../services/aiService';
import { isUserEligibleForLiveAI } from '../services/entitlementService';

export const SpeakingPracticeView: React.FC = () => {
  const { activeLevel } = useApp();
  const { profile, entitlements, logActivity, addXP } = useUser();
  const isEligible = isUserEligibleForLiveAI(profile, entitlements);

  const getInitialTab = (): 'interactive' | 'drills' => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('drill')) return 'drills';
      if (hash.includes('interactive') || hash.includes('yuki') || hash.includes('chat')) return 'interactive';
      const search = new URLSearchParams(window.location.search);
      const tabParam = search.get('tab');
      if (tabParam === 'drills' || tabParam === 'interactive') return tabParam;
      const saved = localStorage.getItem('jlpt_speaking_active_tab');
      if (saved === 'interactive' || saved === 'drills') return saved;
    }
    return 'interactive';
  };

  const [activeStudioTab, setActiveStudioTab] = useState<'interactive' | 'drills'>(getInitialTab);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('drill')) {
        setActiveStudioTab('drills');
      } else if (hash.includes('interactive') || hash.includes('yuki')) {
        setActiveStudioTab('interactive');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: 'interactive' | 'drills') => {
    setActiveStudioTab(tab);
    try {
      localStorage.setItem('jlpt_speaking_active_tab', tab);
      if (typeof window !== 'undefined') {
        window.location.hash = tab === 'drills' ? '#drills' : '#interactive';
      }
    } catch {}
  };
  const [selectedSpeakingLevel, setSelectedSpeakingLevel] = useState<JLPTLevel>(activeLevel || 'N5');

  const exercises = useMemo(() => {
    const list = SPEAKING_EXERCISES.filter((e) => e.level === selectedSpeakingLevel);
    return list.length > 0 ? list : SPEAKING_EXERCISES;
  }, [selectedSpeakingLevel]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState<'voice' | 'typing'>('voice');
  const [typedInput, setTypedInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<SpeakingAttemptResult | null>(null);

  const currentEx = exercises[currentIndex] || exercises[0];

  const handleEvaluateInput = (inputText: string) => {
    evaluateSpeech(inputText);
  };

  const recognitionRef = useRef<RecognitionSessionHandle | null>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, []);

  const handleStartRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsRecording(false);
      return;
    }

    setResult(null);
    setTranscript('');
    setIsRecording(true);

    const session = speechService.createContinuousRecognitionSession({
      lang: 'ja-JP',
      continuous: true,
      maxDurationSeconds: 30,
      silenceTimeoutMs: 3500, // 3.5 seconds silence buffer so pauses don't cut off speech
      onInterim: (_interim: string, full: string) => {
        setTranscript(full);
      },
      onFinalResult: (finalText: string) => {
        setIsRecording(false);
        const trimmed = finalText.trim();
        if (trimmed) {
          setTranscript(trimmed);
          evaluateSpeech(trimmed);
        }
      },
      onError: (err: any) => {
        console.error(err);
        setIsRecording(false);
      },
      onEnd: () => {
        setIsRecording(false);
      },
    });

    recognitionRef.current = session;

    if (session.isSupported) {
      session.start();
    } else {
      // Fallback simulation for browsers with blocked mic
      setTimeout(() => {
        const simulated = currentEx.japaneseText;
        setTranscript(simulated);
        setIsRecording(false);
        evaluateSpeech(simulated);
      }, 2000);
    }
  };

  const evaluateSpeech = async (spoken: string) => {
    setIsEvaluating(true);
    try {
      if (isEligible) {
        // Live Gemini AI Evaluation via Supabase Gateway
        const aiEval = await AIService.evaluateSpokenSentence(
          spoken,
          currentEx.japaneseText,
          selectedSpeakingLevel
        );
        setResult({
          transcript: spoken,
          confidenceScore: aiEval.score,
          status: aiEval.score >= 80 ? 'excellent' : aiEval.score >= 60 ? 'good' : 'needs_work',
          pronunciationFeedback: aiEval.feedback,
          naturalAlternative: aiEval.betterAlternative,
          isAiEvaluated: aiEval.isAiEvaluated,
        });

        if (aiEval.score >= 60) {
          addXP(25, 'AI Verified Speaking Drill');
          logActivity('practice', 1);
        }
      } else {
        const evalResult = speechService.evaluatePronunciation(spoken, currentEx.japaneseText);
        setResult({
          transcript: spoken,
          confidenceScore: evalResult.score,
          status: evalResult.status,
          pronunciationFeedback: evalResult.feedback,
          naturalAlternative:
            evalResult.score >= 80 ? undefined : `Try saying clearly: 「${currentEx.japaneseText}」`,
          isAiEvaluated: false,
        });

        if (evalResult.score >= 60) {
          addXP(20, 'Speaking Drill Completed');
          logActivity('practice', 1);
        }
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    setResult(null);
    setTranscript('');
    setTypedInput('');
    setCurrentIndex((prev) => (prev < exercises.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-3 sm:space-y-6 pb-24 lg:pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <span className="text-[11px] sm:text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Mic size={13} /> AI Spoken Japanese & Oral Communication
            </span>
            {isEligible ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {profile.role === 'admin' || profile.account_type === 'ADMIN' ? '👑 Admin Live Access' : '⭐ PRO Live Access'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                🔒 PRO Live Speaking
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
            AI စကားပြောလေ့ကျင့်ခန်း (Speaking Studio)
          </h1>
        </div>
      </div>

      {/* Prominent 2-Option Mode Switcher Cards (Interactive Voice vs Pronunciation Drills) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
        {/* Option 1: Interactive AI Speaking (Yuki) */}
        <button
          type="button"
          onClick={() => handleTabChange('interactive')}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3 relative ${
            activeStudioTab === 'interactive'
              ? 'bg-gradient-to-r from-rose-500 to-brand-600 text-white shadow-md ring-2 ring-rose-400/40'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl shrink-0 ${
              activeStudioTab === 'interactive' ? 'bg-white/20 text-white' : 'bg-rose-50 dark:bg-rose-950/60 text-rose-500'
            }`}
          >
            🌸
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xs sm:text-sm truncate">
                1. AI အပြန်အလှန် စကားပြော
              </span>
              {activeStudioTab === 'interactive' && (
                <span className="px-1.5 py-0.2 rounded-full bg-white/25 text-[9px] font-extrabold uppercase shrink-0">
                  ✓ Active
                </span>
              )}
            </div>
            <p
              className={`text-[11px] truncate mt-0.5 ${
                activeStudioTab === 'interactive' ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Yuki နှင့် လူတစ်ယောက်လို အပြန်အလှန်ပြောဆိုရန်
            </p>
          </div>
        </button>

        {/* Option 2: Speaking Drills */}
        <button
          type="button"
          onClick={() => handleTabChange('drills')}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3 relative ${
            activeStudioTab === 'drills'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl shrink-0 ${
              activeStudioTab === 'drills' ? 'bg-white/20 text-white' : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500'
            }`}
          >
            🎙️
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xs sm:text-sm truncate">
                2. အသံထွက် ဝါကျလေ့ကျင့်ခန်း
              </span>
              {activeStudioTab === 'drills' && (
                <span className="px-1.5 py-0.2 rounded-full bg-white/25 text-[9px] font-extrabold uppercase shrink-0">
                  ✓ Active
                </span>
              )}
            </div>
            <p
              className={`text-[11px] truncate mt-0.5 ${
                activeStudioTab === 'drills' ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              ဝါကျများ နားထောင်ပြီး အသံထွက်တိကျမှု စစ်ဆေးရန်
            </p>
          </div>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE AI VOICE CONVERSATION */}
      {activeStudioTab === 'interactive' && (
        <InteractiveSpeakingStudio onSwitchToDrills={() => handleTabChange('drills')} />
      )}

      {/* TAB 2: PRONUNCIATION & SHADOWING DRILLS */}
      {activeStudioTab === 'drills' && (
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Quick Banner to jump back to Interactive AI Yuki */}
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 dark:from-rose-950/40 dark:via-pink-950/30 dark:to-amber-950/30 border border-rose-200 dark:border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl shrink-0">🌸</span>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-rose-950 dark:text-rose-200">
                  AI မိတ်ဆွေ Yuki နှင့် လူတစ်ယောက်လို အပြန်အလှန် စကားပြောလိုပါသလား?
                </h4>
                <p className="text-[11px] text-rose-700 dark:text-rose-300">
                  အပြန်အလှန် စကားပြောခန်း (Interactive AI Voice) သို့ အချိန်မရွေး ပြောင်းလဲလေ့ကျင့်နိုင်ပါသည်။
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleTabChange('interactive')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-brand-600 hover:opacity-95 text-white font-bold text-xs shrink-0 shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            >
              <span>🌸 Yuki နှင့် အပြန်အလှန်ပြောမည်</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Non-JLPT Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 shadow-sm">
            <ShieldCheck size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-extrabold">Curriculum Note: </span>
              The official JLPT is a written and listening examination without an oral speaking section.
              These pronunciation and pitch drills develop active recall and speaking confidence.
            </div>
          </div>

          {/* Level Selection Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedSpeakingLevel(lvl);
                  setCurrentIndex(0);
                  setResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedSpeakingLevel === lvl
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                {lvl} Speaking Drills
              </button>
            ))}
          </div>

          {/* Main Speaking Studio Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-8">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase">
            Topic: {currentEx.topic}
          </span>
          <div className="text-3xl sm:text-4xl font-black font-japanese text-slate-900 dark:text-white tracking-tight">
            {currentEx.japaneseText}
          </div>
          <div className="text-sm font-japanese text-slate-400 font-medium">
            {currentEx.readingText}
          </div>
          <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">
            "{currentEx.englishMeaning}"
          </div>
        </div>

        {/* Listen native button */}
        <div className="flex justify-center">
          <AudioButton text={currentEx.japaneseText} size="lg" showLabel />
        </div>

        {/* Syllable Breakdown */}
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
          {currentEx.breakdown.map((tok, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-center"
            >
              <div className="font-japanese font-bold text-slate-900 dark:text-white">
                {tok.token}
              </div>
              <div className="text-[10px] text-slate-400">{tok.role}</div>
            </div>
          ))}
        </div>

        {/* Practice Mode Selector */}
        <div className="flex justify-center pt-2">
          <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                setPracticeMode('voice');
                setResult(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                practiceMode === 'voice'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Mic size={14} />
              <span>音声認識 (Voice)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPracticeMode('typing');
                setResult(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                practiceMode === 'typing'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Keyboard size={14} />
              <span>タイピング確認 (Typing Check)</span>
            </button>
          </div>
        </div>

        {/* Voice Mode: Microphone Recording Button */}
        {practiceMode === 'voice' && (
          <div className="pt-2 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleStartRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/50 scale-110'
                  : 'bg-gradient-to-tr from-brand-600 to-rose-500 hover:scale-105 text-white shadow-brand-500/30'
              }`}
            >
              {isRecording ? <MicOff size={36} /> : <Mic size={36} />}
            </button>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isRecording ? 'Listening... speak clearly now' : 'Click to Speak into Microphone'}
            </span>
          </div>
        )}

        {/* Typing Mode: In-App Japanese Input */}
        {practiceMode === 'typing' && (
          <div className="max-w-xl mx-auto w-full space-y-3 pt-2">
            <JapaneseInput
              value={typedInput}
              onChange={setTypedInput}
              onSubmit={() => typedInput.trim() && handleEvaluateInput(typedInput)}
              placeholder="例文を日本語で入力してください (Type the sentence in Japanese)..."
              inputClassName="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-japanese outline-none focus:border-rose-500"
            />
            <button
              type="button"
              onClick={() => typedInput.trim() && handleEvaluateInput(typedInput)}
              disabled={!typedInput.trim()}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-brand-600 hover:opacity-95 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>入力した日本語を採点する (Check Spelling & Sentence)</span>
            </button>
          </div>
        )}

        {/* Evaluating State Loader */}
        {isEvaluating && (
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs flex items-center justify-center gap-2 max-w-xl mx-auto animate-pulse">
            <Sparkles size={16} className="animate-spin text-indigo-500" />
            <span className="font-bold">Gemini Cloud AI is evaluating your pronunciation & pitch...</span>
          </div>
        )}

        {/* Speech / Typing Recognition Result */}
        {result && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-4 max-w-xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  {practiceMode === 'voice' ? 'Pronunciation Evaluation:' : 'Spelling Evaluation:'}
                </span>
                {result.isAiEvaluated && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    <Sparkles size={10} className="text-indigo-500" /> Live Gemini AI
                  </span>
                )}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                  result.confidenceScore >= 80
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : result.confidenceScore >= 60
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {result.confidenceScore}% Accuracy
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs font-japanese font-bold text-slate-900 dark:text-white">
              {practiceMode === 'voice' ? 'Heard:' : 'Entered:'} "{result.transcript}"
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {result.pronunciationFeedback}
            </p>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              Next Speaking Sentence <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</div>
  );
};

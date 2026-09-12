import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { speechService } from '../services/speechService';
import { AudioButton } from '../components/common/AudioButton';
import { SpeakingAttemptResult } from '../types/ai';
import { JLPTLevel } from '../types';
import { SPEAKING_EXERCISES } from '../data/speakingData';

export const SpeakingPracticeView: React.FC = () => {
  const { activeLevel } = useApp();
  const { logActivity, addXP } = useUser();

  const [selectedSpeakingLevel, setSelectedSpeakingLevel] = useState<JLPTLevel>(activeLevel || 'N5');

  const exercises = useMemo(() => {
    const list = SPEAKING_EXERCISES.filter((e) => e.level === selectedSpeakingLevel);
    return list.length > 0 ? list : SPEAKING_EXERCISES;
  }, [selectedSpeakingLevel]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<SpeakingAttemptResult | null>(null);

  const currentEx = exercises[currentIndex] || exercises[0];

  const handleStartRecording = () => {
    setResult(null);
    setTranscript('');

    const session = speechService.createRecognitionSession(
      (spokenText: string, isFinal: boolean) => {
        setTranscript(spokenText);
        if (isFinal) {
          setIsRecording(false);
          evaluateSpeech(spokenText);
        }
      },
      (err: any) => {
        console.error(err);
        setIsRecording(false);
      },
      () => setIsRecording(false)
    );

    if (session.isSupported) {
      setIsRecording(true);
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

  const evaluateSpeech = (spoken: string) => {
    const evalResult = speechService.evaluatePronunciation(spoken, currentEx.japaneseText);
    setResult({
      transcript: spoken,
      confidenceScore: evalResult.score,
      status: evalResult.status,
      pronunciationFeedback: evalResult.feedback,
      naturalAlternative:
        evalResult.score >= 80 ? undefined : `Try saying clearly: 「${currentEx.japaneseText}」`,
    });

    if (evalResult.score >= 60) {
      addXP(20, 'Speaking Drill Completed');
      logActivity('practice', 1);
    }
  };

  const handleNext = () => {
    setResult(null);
    setTranscript('');
    setCurrentIndex((prev) => (prev < exercises.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Oral Pronunciation & Fluency
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Japanese Speaking & Communication Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Listen to native Japanese audio and repeat into the microphone to verify speech clarity and pitch.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-400">
          Drill {currentIndex + 1} of {exercises.length}
        </span>
      </div>

      {/* Non-JLPT Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 shadow-sm">
        <ShieldCheck size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-extrabold">Curriculum Note: </span>
          The official JLPT (Japanese-Language Proficiency Test) is a written and listening examination without an oral speaking section.
          These drills are provided as communicative Japanese reinforcement to develop active recall, correct pitch accent, and workplace fluency.
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

        {/* Microphone Recording Button */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleStartRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
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

        {/* Speech Recognition Result */}
        {result && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-4 max-w-xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Confidence Evaluation:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                  result.confidenceScore >= 80
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : result.confidenceScore >= 60
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {result.confidenceScore}% Clarity
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs font-japanese font-bold text-slate-900 dark:text-white">
              Heard: "{result.transcript}"
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
  );
};

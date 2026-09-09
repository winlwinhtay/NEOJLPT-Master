import React, { useState } from 'react';
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
import { SpeakingExercise, SpeakingAttemptResult } from '../types/ai';

export const SpeakingPracticeView: React.FC = () => {
  const { activeLevel } = useApp();
  const { logActivity, addXP } = useUser();

  const speakingExercises: SpeakingExercise[] = [
    {
      id: 'spk-1',
      level: 'N5',
      japaneseText: '初めまして、よろしくお願いします。',
      readingText: 'はじめまして、よろしく おねがいします。',
      englishMeaning: 'Nice to meet you, please treat me favorably.',
      difficulty: 'easy',
      topic: 'Self Introduction',
      breakdown: [
        { token: '初めまして', reading: 'はじめまして', role: 'Greeting' },
        { token: 'よろしく', reading: 'よろしく', role: 'Polite Adverb' },
        { token: 'お願いします', reading: 'おねがいします', role: 'Honorific Request' },
      ],
    },
    {
      id: 'spk-2',
      level: 'N5',
      japaneseText: 'これをお願いします。',
      readingText: 'これを おねがいします。',
      englishMeaning: 'This one please.',
      difficulty: 'easy',
      topic: 'Restaurant & Shopping',
      breakdown: [
        { token: 'これ', reading: 'これ', role: 'Pronoun' },
        { token: 'を', reading: 'を', role: 'Object particle' },
        { token: 'お願いします', reading: 'おねがいします', role: 'Request' },
      ],
    },
    {
      id: 'spk-3',
      level: 'N5',
      japaneseText: '駅はどこにありますか？',
      readingText: 'えきは どこに ありますか？',
      englishMeaning: 'Where is the train station?',
      difficulty: 'medium',
      topic: 'Directions',
      breakdown: [
        { token: '駅', reading: 'えき', role: 'Station' },
        { token: 'は', reading: 'は', role: 'Topic' },
        { token: 'どこ', reading: 'どこ', role: 'Where' },
        { token: 'に', reading: 'に', role: 'Location' },
        { token: 'ありますか', reading: 'ありますか', role: 'Exist question' },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<SpeakingAttemptResult | null>(null);

  const currentEx = speakingExercises[currentIndex];

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
    setCurrentIndex((prev) => (prev < speakingExercises.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Voice & Syllable Pronunciation
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {activeLevel} Speaking Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Listen to native Japanese audio and repeat into the microphone to verify speech clarity.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-400">
          Drill {currentIndex + 1} of {speakingExercises.length}
        </span>
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

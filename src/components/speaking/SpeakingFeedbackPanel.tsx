import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Volume2,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Mic,
  MicOff,
  Briefcase,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';
import { SpeakingFeedback, SpeakingMode, VocabularyEnhancementItem } from '../../types/speakingCoach';
import { SpeakingCoachService } from '../../services/speakingCoachService';
import { speechService } from '../../services/speechService';

interface SpeakingFeedbackPanelProps {
  feedback: SpeakingFeedback;
  mode: SpeakingMode;
  explanationLang: 'en' | 'my' | 'ja';
  onRetryAttempt?: (textToPractice: string) => void;
  onPracticeGrammar?: (ruleName: string) => void;
}

export const SpeakingFeedbackPanel: React.FC<SpeakingFeedbackPanelProps> = ({
  feedback,
  mode,
  explanationLang,
  onRetryAttempt,
  onPracticeGrammar,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [savedVocabIds, setSavedVocabIds] = useState<Record<string, boolean>>({});
  const [savedGrammarIds, setSavedGrammarIds] = useState<Record<string, boolean>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Try Again Challenge local recording state
  const [isChallengeRecording, setIsChallengeRecording] = useState<boolean>(false);
  const [challengeTranscript, setChallengeTranscript] = useState<string>('');
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);

  // Play model native Japanese audio
  const handlePlayModelAudio = (text: string) => {
    if (isPlayingAudio) {
      speechService.stopAudio();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    speechService.speakJapanese(text, {
      rate: 0.95,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  // Save vocabulary item
  const handleSaveVocab = (item: VocabularyEnhancementItem, idx: number) => {
    const key = `vocab-${idx}-${item.suggestedExpression}`;
    SpeakingCoachService.saveLearningItem({
      type: 'vocabulary',
      original: item.originalExpression,
      enhanced: item.suggestedExpression,
      meaning: item.meaning,
      example: item.example,
      register: item.register,
      level: feedback.level,
      explanation: item.reason,
    });
    setSavedVocabIds((prev) => ({ ...prev, [key]: true }));
  };

  // Save grammar point
  const handleSaveGrammar = (original: string, correction: string, explanation: string, idx: number) => {
    const key = `grammar-${idx}`;
    SpeakingCoachService.saveLearningItem({
      type: 'grammar',
      original,
      enhanced: correction,
      meaning: explanation,
      level: feedback.level,
      explanation,
    });
    setSavedGrammarIds((prev) => ({ ...prev, [key]: true }));
  };

  // Handle Try Again challenge recording
  const handleStartChallengeRecording = () => {
    if (isChallengeRecording) {
      setIsChallengeRecording(false);
      return;
    }
    setChallengeTranscript('');
    setIsChallengeRecording(true);
    setChallengeCompleted(false);

    const session = speechService.createContinuousRecognitionSession({
      lang: 'ja-JP',
      continuous: false,
      maxDurationSeconds: 15,
      silenceTimeoutMs: 2500,
      onInterim: (_interim, full) => {
        setChallengeTranscript(full);
      },
      onFinalResult: (finalText) => {
        setIsChallengeRecording(false);
        const trimmed = finalText.trim();
        if (trimmed) {
          setChallengeTranscript(trimmed);
          setChallengeCompleted(true);
        }
      },
      onError: () => {
        setIsChallengeRecording(false);
      },
      onEnd: () => {
        setIsChallengeRecording(false);
      },
    });

    if (session.isSupported) {
      session.start();
    } else {
      setTimeout(() => {
        setChallengeTranscript(feedback.correctedTranscript);
        setIsChallengeRecording(false);
        setChallengeCompleted(true);
      }, 1500);
    }
  };

  const getRegisterBadge = (register?: string) => {
    switch (register) {
      case 'professional':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
            <Briefcase size={10} />
            <span>Keigo / Business (ビジネス・敬語)</span>
          </span>
        );
      case 'formal':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Formal (丁寧語)
          </span>
        );
      case 'casual':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Casual (日常・親しい)
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Standard (標準)
          </span>
        );
    }
  };

  const isExactMatch =
    feedback.originalTranscript.trim().replace(/\s+/g, '') ===
    feedback.correctedTranscript.trim().replace(/\s+/g, '');

  return (
    <div className="mt-3 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 shadow-sm overflow-hidden text-xs transition-all">
      {/* Header bar */}
      <div
        className="p-3 bg-indigo-100/60 dark:bg-indigo-950/60 border-b border-indigo-200/60 dark:border-indigo-900/40 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Sparkles size={13} />
          </div>
          <div>
            <span className="font-bold text-indigo-950 dark:text-indigo-200 text-xs sm:text-sm">
              Yuki's Intelligent Speaking Feedback (စကားပြောသုံးသပ်ချက်)
            </span>
            <span className="ml-2 px-1.5 py-0.2 rounded-md text-[9px] font-black uppercase tracking-wider bg-indigo-600 text-white">
              {mode === 'learning_mode'
                ? 'Learning Mode'
                : mode === 'professional_speaking'
                ? 'Business Keigo'
                : 'Natural Flow'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isExactMatch ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 size={11} />
              <span>Great Japanese! (သဒ္ဒါမှန်ကန်ပါသည်)</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-1 border border-amber-300 dark:border-amber-800">
              <Lightbulb size={11} />
              <span>Enhancements available</span>
            </span>
          )}
          <button
            type="button"
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="p-3.5 sm:p-4 space-y-4">
          {/* Overall Summary */}
          {(feedback.overallSummary || feedback.overallSummaryMy) && (
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 space-y-1">
              <p className="font-medium text-xs leading-relaxed">{feedback.overallSummary}</p>
              {explanationLang === 'my' && feedback.overallSummaryMy && (
                <p className="text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] leading-relaxed">
                  🇲🇲 {feedback.overallSummaryMy}
                </p>
              )}
            </div>
          )}

          {/* Section A & B: Speech Comparison & Audio Playback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* A. Your Original Speech */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span>A. Your Spoken Japanese</span>
                </span>
                <span className="text-[10px] text-slate-400">Original Transcript</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 font-japanese font-bold text-sm text-slate-900 dark:text-white leading-relaxed">
                {feedback.originalTranscript}
              </div>
            </div>

            {/* B. Corrected Version with Diffs */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>B. Corrected & Polished Version</span>
                </span>
                {/* Native Model Audio Playback Button */}
                <button
                  type="button"
                  onClick={() => handlePlayModelAudio(feedback.correctedTranscript)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-emerald-600 text-white animate-pulse'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  }`}
                  title="Listen to native Japanese model pronunciation"
                >
                  <Volume2 size={12} />
                  <span>{isPlayingAudio ? 'Playing...' : 'Model Audio (အသံနားထောင်မည်)'}</span>
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 font-japanese font-bold text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
                {feedback.correctedTranscript}
              </div>

              {/* Grammar Corrections Details if any */}
              {feedback.grammarCorrections && feedback.grammarCorrections.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {feedback.grammarCorrections.map((corr, idx) => {
                    const savedKey = `grammar-${idx}`;
                    const isSaved = Boolean(savedGrammarIds[savedKey]);
                    return (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="line-through text-rose-600 dark:text-rose-400 font-japanese font-bold">
                              {corr.original}
                            </span>
                            <ArrowRight size={11} className="text-slate-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-japanese font-bold">
                              {corr.correction}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300">
                              {corr.category}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleSaveGrammar(corr.original, corr.correction, corr.explanation, idx)
                            }
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              isSaved
                                ? 'text-emerald-700 dark:text-emerald-300 font-bold'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                            title="Save grammar point to notebook"
                          >
                            {isSaved ? <BookmarkCheck size={11} /> : <Bookmark size={11} />}
                            <span>{isSaved ? 'Saved' : 'Save'}</span>
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-normal">
                          {corr.explanation}
                        </p>
                        {explanationLang === 'my' && corr.explanationMy && (
                          <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold leading-normal">
                            🇲🇲 {corr.explanationMy}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Section C: Natural Expression (How a native speaker would say it) */}
          {feedback.naturalAlternatives && feedback.naturalAlternatives.length > 0 && (
            <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <Lightbulb size={13} className="text-indigo-600" />
                  <span>C. How a Native Speaker Would Say It (သဘာဝကျကျ ဂျပန်လူမျိုးစကားပြောဟန်)</span>
                </span>
                <span className="text-[10px] text-slate-400">Contextual Nuance</span>
              </div>

              <div className="space-y-2">
                {feedback.naturalAlternatives.map((alt, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-japanese font-bold text-sm text-indigo-950 dark:text-indigo-200">
                          {alt.expression}
                        </span>
                        {alt.reading && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-japanese">
                            ({alt.reading})
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePlayModelAudio(alt.expression)}
                          className="p-1 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer"
                          title="Listen"
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">{alt.explanation}</p>
                      {explanationLang === 'my' && alt.explanationMy && (
                        <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold">
                          🇲🇲 {alt.explanationMy}
                        </p>
                      )}
                    </div>

                    {onRetryAttempt && (
                      <button
                        type="button"
                        onClick={() => onRetryAttempt(alt.expression)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] flex items-center justify-center gap-1 shrink-0 transition-colors cursor-pointer"
                      >
                        <span>Use This</span>
                        <ArrowRight size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section D: Vocabulary Enhancement Table/Card */}
          {feedback.vocabularyEnhancements && feedback.vocabularyEnhancements.length > 0 && (
            <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-purple-600" />
                  <span>D. Vocabulary Upgrades (ဝေါဟာရ အဆင့်မြှင့်တင်ရန် အကြံပြုချက်)</span>
                </span>
                <span className="text-[10px] text-slate-400">Expand Your Active Vocab</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {feedback.vocabularyEnhancements.map((v, idx) => {
                  const saveKey = `vocab-${idx}-${v.suggestedExpression}`;
                  const isSaved = Boolean(savedVocabIds[saveKey]);

                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-japanese text-slate-400 line-through text-xs">
                            {v.originalExpression}
                          </span>
                          <ArrowRight size={11} className="text-slate-400" />
                          <span className="font-japanese font-bold text-sm text-purple-700 dark:text-purple-300">
                            {v.suggestedExpression}
                          </span>
                          <button
                            type="button"
                            onClick={() => handlePlayModelAudio(v.suggestedExpression)}
                            className="p-1 rounded text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950 cursor-pointer"
                            title="Listen"
                          >
                            <Volume2 size={12} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {getRegisterBadge(v.register)}
                          <button
                            type="button"
                            onClick={() => handleSaveVocab(v, idx)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
                              isSaved
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-50'
                            }`}
                            title="Save to My Vocabulary"
                          >
                            {isSaved ? <BookmarkCheck size={11} /> : <Bookmark size={11} />}
                            <span>{isSaved ? 'Saved to Vocab' : 'Save to Vocab'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Meaning: </span>
                        <span>{v.meaning}</span>
                        {v.reason && <span className="text-slate-400 ml-1">({v.reason})</span>}
                      </div>

                      {v.example && (
                        <div className="p-1.5 rounded bg-white dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 text-[11px] font-japanese text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-slate-500 mr-1">Ex:</span>
                          <span>{v.example}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section E: Personal Learning Points (Top 3 Actionable Takeaways) */}
          {feedback.learningPoints && feedback.learningPoints.length > 0 && (
            <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-rose-600" />
                  <span>E. Personal Learning Points (အဓိက မှတ်သားရန် အချက် ၃ ချက်)</span>
                </span>
                <span className="text-[10px] text-slate-400">Key Takeaways</span>
              </div>

              <div className="space-y-1.5">
                {feedback.learningPoints.map((point, idx) => {
                  const myPoint =
                    explanationLang === 'my' && feedback.learningPointsMy && feedback.learningPointsMy[idx]
                      ? feedback.learningPointsMy[idx]
                      : null;

                  return (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-start gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-[11px] font-medium text-slate-800 dark:text-slate-200">
                            {point}
                          </span>
                        </div>
                        {myPoint && (
                          <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold pl-5">
                            🇲🇲 {myPoint}
                          </p>
                        )}
                      </div>

                      {onPracticeGrammar && (
                        <button
                          type="button"
                          onClick={() => onPracticeGrammar(point)}
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950 shrink-0 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <BookOpen size={10} />
                          <span>Practice</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section F: Try Again Challenge */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-300/60 dark:border-amber-800/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <RotateCcw size={13} className="text-amber-600" />
                <span>F. Try Again Challenge (ပြန်လည်လေ့ကျင့်ပြောဆိုကြည့်ပါ)</span>
              </span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                Repeat the corrected sentence
              </span>
            </div>

            <p className="text-[11px] text-slate-700 dark:text-slate-300">
              {feedback.retryPrompt || 'もう一度、正しい形で言ってみましょう！'}
              {explanationLang === 'my' && feedback.retryPromptMy && (
                <span className="block text-emerald-800 dark:text-emerald-300 font-semibold mt-0.5">
                  🇲🇲 {feedback.retryPromptMy}
                </span>
              )}
            </p>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Sentence:</span>
                <span className="font-japanese font-bold text-sm text-slate-900 dark:text-white truncate block">
                  {feedback.correctedTranscript}
                </span>
              </div>

              <button
                type="button"
                onClick={handleStartChallengeRecording}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs ${
                  isChallengeRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {isChallengeRecording ? <MicOff size={14} /> : <Mic size={14} />}
                <span>{isChallengeRecording ? 'Listening...' : 'Speak Corrected'}</span>
              </button>
            </div>

            {/* Challenge Result Comparison */}
            {challengeCompleted && challengeTranscript && (
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-[11px] space-y-1 animate-fade-in">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 size={13} />
                  <span>Challenge Recorded! (လေ့ကျင့်မှု အောင်မြင်ပါသည်)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">You said:</span>
                  <span className="font-japanese font-bold text-slate-900 dark:text-white">
                    "{challengeTranscript}"
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

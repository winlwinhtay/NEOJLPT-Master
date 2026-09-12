import React, { useState } from 'react';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { LISTENING_DATA } from '../data/listeningData';
import { speechService } from '../services/speechService';
import { ListeningLesson } from '../types';

export const ListeningView: React.FC = () => {
  const { activeLevel } = useApp();
  const { logActivity } = useUser();
  const { t } = useI18n();

  const levelListeningList = LISTENING_DATA.filter((l) => l.level === activeLevel);
  const [selectedLesson, setSelectedLesson] = useState<ListeningLesson>(
    levelListeningList[0] || LISTENING_DATA[0]
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isLooping, setIsLooping] = useState(false);
  const isLoopingRef = React.useRef(false);
  isLoopingRef.current = isLooping;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const playAudioSequence = async () => {
    setIsPlaying(true);
    const fullAudioText = selectedLesson.dialogue
      .map((d) => `${d.speaker}：${d.text}`)
      .join('。 ');

    await speechService.speakJapanese(fullAudioText, {
      rate: playbackSpeed,
      onEnd: () => {
        if (isLoopingRef.current) {
          setTimeout(() => {
            if (isLoopingRef.current) playAudioSequence();
          }, 800);
        } else {
          setIsPlaying(false);
        }
      },
      onError: () => setIsPlaying(false),
    });
  };

  // Play full dialogue sequentially
  const handlePlayDialogue = async () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }
    await playAudioSequence();
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    setIsAnswered(true);
    setShowTranscript(true); // Automatically reveal transcript after answering
    logActivity('listening', 1);
  };

  const handleNextLesson = (lesson: ListeningLesson) => {
    speechService.stop();
    setIsPlaying(false);
    setSelectedLesson(lesson);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowTranscript(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            {t('listening.badge')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {activeLevel} {t('listening.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('listening.subtitle')}
          </p>
        </div>

        {/* Lesson Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {levelListeningList.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNextLesson(l)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedLesson.id === l.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {l.title}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Player Studio Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Situation Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              {t('listening.situation')}
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {selectedLesson.situation}
            </h2>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold capitalize">
            {selectedLesson.questionType.replace('_', ' ')}
          </span>
        </div>

        {/* Audio Visualizer & Controls Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white text-center space-y-6 shadow-inner">
          <div className="flex items-center justify-center gap-3">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50 animate-pulse'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Headphones size={32} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black">{selectedLesson.title}</h3>
            <p className="text-xs text-purple-200 mt-1">
              {t('listening.subtitle')}
            </p>
          </div>

          {/* Audio Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePlayDialogue}
              className="px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-white" />}
              {isPlaying ? 'Pause' : t('common.listen')}
            </button>

            {/* Speed Selector */}
            <div className="inline-flex p-1 bg-white/10 rounded-2xl backdrop-blur-sm">
              {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    playbackSpeed === speed
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Repeat Loop Toggle */}
            <button
              type="button"
              onClick={() => setIsLooping(!isLooping)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isLooping
                  ? 'bg-purple-400 text-slate-950 font-black shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
              title={isLooping ? 'Repeat Dialogue: ON' : 'Repeat Dialogue: OFF'}
            >
              <RotateCcw size={14} className={isLooping ? 'animate-spin-slow' : ''} />
              <span>{isLooping ? 'Loop ON' : 'Loop'}</span>
            </button>
          </div>
        </div>

        {/* Transcript Box (Revealed only after submission or explicit user request) */}
        {showTranscript ? (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-4 animate-fade-in">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {t('listening.dialogue')}:
            </span>
            <div className="space-y-3">
              {selectedLesson.dialogue.map((line, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-purple-600 dark:text-purple-400">
                      {line.speaker}:
                    </span>
                    <span className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
                      {line.text}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-japanese pl-2">{line.reading}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 pl-2">{line.translationEn}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <button
              onClick={() => setShowTranscript(true)}
              className="text-xs text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold flex items-center justify-center gap-1 mx-auto"
            >
              <Eye size={14} /> {t('listening.showTranscript')}
            </button>
          </div>
        )}

        {/* Listening Question & Options */}
        <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {selectedLesson.questionJp}
            </h3>
            {selectedLesson.questionEn && (
              <p className="text-xs text-slate-400 italic">{selectedLesson.questionEn}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedLesson.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === selectedLesson.correctIndex;
              let btnStyle =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                }
              } else if (isSelected) {
                btnStyle =
                  'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-bold shadow-sm';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all ${btnStyle}`}
                >
                  <span className="font-bold mr-2 text-slate-400">{optIdx + 1}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1 animate-fade-in">
              <div className="font-bold text-slate-900 dark:text-white">{t('common.explanation')}:</div>
              <p className="text-slate-600 dark:text-slate-300">{selectedLesson.explanation}</p>
            </div>
          )}

          {/* Submit / Finish */}
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-lg shadow-purple-600/25 transition-all"
            >
              {t('common.submit')}
            </button>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 size={20} className="text-emerald-500" />
                Listening exercise complete! +25 XP
              </div>
              <button
                onClick={() => {
                  const nextIdx = (levelListeningList.findIndex((l) => l.id === selectedLesson.id) + 1) % levelListeningList.length;
                  handleNextLesson(levelListeningList[nextIdx]);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Next Listening Drill
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Hash,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { KanjiStrokeData, StrokePathInfo } from '../../types/kanjiStroke';

interface StrokeOrderPlayerProps {
  strokeData?: KanjiStrokeData;
  kanjiChar: string;
  size?: number;
  onStrokeComplete?: (strokeIndex: number) => void;
  onAllStrokesComplete?: () => void;
}

export const StrokeOrderPlayer: React.FC<StrokeOrderPlayerProps> = ({
  strokeData,
  kanjiChar,
  size = 280,
  onStrokeComplete,
  onAllStrokesComplete,
}) => {
  // Master display state: Clean Kanji vs Stroke Order Studio
  const [showStrokeOrder, setShowStrokeOrder] = useState(true);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0); // 0 to strokeCount
  const [speed, setSpeed] = useState<0.5 | 1.0 | 1.8>(1.0); // Slow, Normal, Fast
  const [showNumbers, setShowNumbers] = useState(true);
  const [showDirections, setShowDirections] = useState(true);

  const strokes = strokeData?.strokes || [];
  const totalStrokes = strokes.length;

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Milliseconds per stroke based on playback speed
  const speedInterval = speed === 0.5 ? 1800 : speed === 1.0 ? 1000 : 550;

  // Auto-advance strokes during animated playback
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentStrokeIndex((prev) => {
        if (prev >= totalStrokes) {
          setIsPlaying(false);
          onAllStrokesComplete?.();
          return totalStrokes;
        }
        const next = prev + 1;
        onStrokeComplete?.(next);
        if (next >= totalStrokes) {
          setIsPlaying(false);
          onAllStrokesComplete?.();
        }
        return next;
      });
    }, speedInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalStrokes, speedInterval, onStrokeComplete, onAllStrokesComplete]);

  // Reset playback when character changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentStrokeIndex(totalStrokes > 0 ? totalStrokes : 0);
  }, [kanjiChar, totalStrokes]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStrokeIndex >= totalStrokes) {
        setCurrentStrokeIndex(1);
      }
      setIsPlaying(true);
    }
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setCurrentStrokeIndex(0);
    setTimeout(() => {
      setCurrentStrokeIndex(1);
      setIsPlaying(true);
    }, 150);
  };

  const handlePrevStroke = () => {
    setIsPlaying(false);
    setCurrentStrokeIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextStroke = () => {
    setIsPlaying(false);
    setCurrentStrokeIndex((prev) => Math.min(totalStrokes, prev + 1));
  };

  const activeStroke: StrokePathInfo | undefined = strokes[currentStrokeIndex - 1];

  return (
    <div className="flex flex-col items-center select-none">
      {/* Top Controls: Clean Kanji Toggle */}
      <div className="flex items-center justify-between w-full max-w-sm mb-3">
        <button
          type="button"
          onClick={() => setShowStrokeOrder(!showStrokeOrder)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            showStrokeOrder
              ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-800 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-slate-700'
          }`}
        >
          {showStrokeOrder ? <Eye size={14} /> : <EyeOff size={14} />}
          <span>{showStrokeOrder ? 'Stroke Order' : 'Clean Kanji'}</span>
        </button>

        {showStrokeOrder && totalStrokes > 0 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowNumbers(!showNumbers)}
              className={`p-1.5 rounded-lg text-xs font-semibold border transition-all ${
                showNumbers
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
              title={showNumbers ? 'Hide Stroke Numbers' : 'Show Stroke Numbers'}
            >
              <Hash size={14} />
            </button>
            <button
              type="button"
              onClick={() => setShowDirections(!showDirections)}
              className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all ${
                showDirections
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
              title={showDirections ? 'Hide Direction Arrows' : 'Show Direction Arrows'}
            >
              ➔
            </button>
          </div>
        )}
      </div>

      {/* Main Square Grid Canvas */}
      <div
        className="relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm p-4 overflow-hidden"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Traditional Japanese Calligraphy Guidelines */}
        <svg
          className="absolute inset-0 pointer-events-none w-full h-full"
          viewBox="0 0 109 109"
        >
          {/* Dashed Crosshair */}
          <line
            x1="54.5"
            y1="0"
            x2="54.5"
            y2="109"
            stroke="#cbd5e1"
            strokeWidth="0.75"
            strokeDasharray="2,2"
            className="dark:stroke-slate-700"
          />
          <line
            x1="0"
            y1="54.5"
            x2="109"
            y2="54.5"
            stroke="#cbd5e1"
            strokeWidth="0.75"
            strokeDasharray="2,2"
            className="dark:stroke-slate-700"
          />

          {/* Dashed Diagonals */}
          <line
            x1="0"
            y1="0"
            x2="109"
            y2="109"
            stroke="#e2e8f0"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            className="dark:stroke-slate-800"
          />
          <line
            x1="109"
            y1="0"
            x2="0"
            y2="109"
            stroke="#e2e8f0"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            className="dark:stroke-slate-800"
          />
        </svg>

        {/* Clean Kanji Mode */}
        {!showStrokeOrder && (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[120px] font-black font-japanese text-slate-900 dark:text-white leading-none select-none animate-fade-in">
              {kanjiChar}
            </span>
          </div>
        )}

        {/* Stroke Order SVG Animation Display */}
        {showStrokeOrder && (
          <svg
            className="relative w-full h-full"
            viewBox={strokeData?.viewBox || '0 0 109 109'}
          >
            {/* Background Faint Full Kanji for Visual Context */}
            {strokes.map((stroke, idx) => (
              <path
                key={`faint-${idx}`}
                d={stroke.d}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-100 dark:text-slate-800/80"
              />
            ))}

            {/* Completed Prior Strokes */}
            {strokes.slice(0, currentStrokeIndex).map((stroke, idx) => {
              const isCurrent = idx === currentStrokeIndex - 1;
              return (
                <path
                  key={`stroke-${idx}`}
                  d={stroke.d}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={isCurrent ? '4.5' : '4'}
                  className={
                    isCurrent
                      ? 'stroke-brand-500 dark:stroke-brand-400 drop-shadow-sm transition-all duration-300'
                      : 'stroke-slate-800 dark:stroke-slate-100 transition-all duration-200'
                  }
                />
              );
            })}

            {/* Active Stroke Start Point & Direction Indicator */}
            {showDirections && activeStroke && currentStrokeIndex > 0 && (
              <g className="animate-fade-in pointer-events-none">
                {/* Green Pulsing Starting Dot */}
                <circle
                  cx={activeStroke.startX}
                  cy={activeStroke.startY}
                  r="3"
                  fill="#10b981"
                  className="animate-ping opacity-75"
                />
                <circle
                  cx={activeStroke.startX}
                  cy={activeStroke.startY}
                  r="2.2"
                  fill="#059669"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />
              </g>
            )}

            {/* Stroke Number Badges */}
            {showNumbers &&
              strokes.slice(0, Math.max(1, currentStrokeIndex)).map((stroke, idx) => {
                const isCurrent = idx === currentStrokeIndex - 1;
                return (
                  <g
                    key={`num-${idx}`}
                    className="pointer-events-none transition-all duration-200"
                  >
                    <circle
                      cx={stroke.numberX}
                      cy={stroke.numberY}
                      r="3.8"
                      fill={isCurrent ? '#e11d48' : '#64748b'}
                      className="transition-colors duration-200"
                    />
                    <text
                      x={stroke.numberX}
                      y={stroke.numberY + 1.2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#ffffff"
                      fontSize="4.2"
                      fontWeight="bold"
                    >
                      {stroke.order}
                    </text>
                  </g>
                );
              })}
          </svg>
        )}

        {/* Floating Active Stroke Pill */}
        {showStrokeOrder && activeStroke && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-slate-900/80 dark:bg-slate-800/90 text-white rounded-xl text-[11px] font-bold backdrop-blur-xs flex items-center gap-1.5 shadow-md">
            <span>Stroke {activeStroke.order}/{totalStrokes}</span>
            <span className="text-emerald-400 font-extrabold">{activeStroke.direction}</span>
            {activeStroke.type && (
              <span className="text-slate-400 text-[10px]">({activeStroke.type})</span>
            )}
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      {showStrokeOrder && (
        <div className="w-full max-w-sm mt-4 space-y-3">
          {/* Main Action Buttons: Play/Pause, Replay, Prev, Next */}
          <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            {/* Previous Stroke */}
            <button
              type="button"
              onClick={handlePrevStroke}
              disabled={currentStrokeIndex <= 1}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-all cursor-pointer"
              title="Previous Stroke"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Play / Pause Toggle */}
            <button
              type="button"
              onClick={handlePlayPause}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-black shadow-md shadow-brand-500/20 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-white" />}
              <span>{isPlaying ? 'Pause' : currentStrokeIndex >= totalStrokes ? 'Play Again' : 'Play'}</span>
            </button>

            {/* Next Stroke */}
            <button
              type="button"
              onClick={handleNextStroke}
              disabled={currentStrokeIndex >= totalStrokes}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-all cursor-pointer"
              title="Next Stroke"
            >
              <ChevronRight size={18} />
            </button>

            {/* Replay */}
            <button
              type="button"
              onClick={handleReplay}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
              title="Restart from Stroke 1"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Speed Selector & Step Indicator */}
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-slate-400">
              {currentStrokeIndex === 0
                ? 'Ready to play'
                : `Stroke ${currentStrokeIndex} of ${totalStrokes}`}
            </span>

            {/* Speed Pills */}
            <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {[
                { label: '0.5x', val: 0.5 },
                { label: '1.0x', val: 1.0 },
                { label: '1.8x', val: 1.8 },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSpeed(s.val as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    speed === s.val
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* KanjiVG Legal Attribution */}
          <div className="text-center pt-1">
            <span className="text-[10px] text-slate-400 font-medium">
              Verified stroke data © KanjiVG by Ulrich Apel (CC BY-SA 3.0)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

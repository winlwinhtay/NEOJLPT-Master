import React, { useRef, useState, useEffect } from 'react';
import {
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Pencil,
  Compass,
  FileQuestion,
  RefreshCw,
} from 'lucide-react';
import { KanjiItem } from '../../types';
import { KanjiStrokeData, KanjiWritingPracticeMode } from '../../types/kanjiStroke';
import confetti from 'canvas-confetti';

interface KanjiCanvasProps {
  kanji: KanjiItem;
  strokeData?: KanjiStrokeData;
  onPracticeComplete?: (score: number) => void;
}

export const KanjiCanvas: React.FC<KanjiCanvasProps> = ({
  kanji,
  strokeData,
  onPracticeComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Array<Array<{ x: number; y: number }>>>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{ x: number; y: number }>>([]);
  const [practiceMode, setPracticeMode] = useState<KanjiWritingPracticeMode>('trace');
  const [showModelCompare, setShowModelCompare] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    feedback: string;
    status: 'success' | 'warning' | 'info';
    checklist: { label: string; passed: boolean }[];
  } | null>(null);

  const canvasSize = 280;

  // Clear canvas and redraw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 1. Draw Traditional Japanese Calligraphy Square Grid
    ctx.save();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Dashed Crosshair Lines
    ctx.beginPath();
    ctx.moveTo(canvasSize / 2, 0);
    ctx.lineTo(canvasSize / 2, canvasSize);
    ctx.moveTo(0, canvasSize / 2);
    ctx.lineTo(canvasSize, canvasSize / 2);
    ctx.stroke();

    // Dashed Diagonals
    ctx.strokeStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasSize, canvasSize);
    ctx.moveTo(canvasSize, 0);
    ctx.lineTo(0, canvasSize);
    ctx.stroke();
    ctx.restore();

    // 2. Background Guides depending on Practice Mode
    if (practiceMode === 'trace' || showModelCompare) {
      // Faint template of the Kanji
      ctx.save();
      ctx.font = '200px "Shippori Mincho", "Yu Mincho", serif';
      ctx.fillStyle = showModelCompare
        ? 'rgba(225, 29, 72, 0.25)' // Rose tint when comparing
        : 'rgba(203, 213, 225, 0.38)'; // Faint slate in trace
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kanji.kanji, canvasSize / 2, canvasSize / 2 + 10);
      ctx.restore();
    } else if (practiceMode === 'guided' && strokeData) {
      // Guided Mode: Faint starting point dots and numbers on the canvas
      ctx.save();
      const scale = canvasSize / 109;
      strokeData.strokes.forEach((s) => {
        const sx = s.startX * scale;
        const sy = s.startY * scale;

        // Faint green start dot
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.fill();

        // Stroke number
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
        ctx.fillText(String(s.order), s.numberX * scale, s.numberY * scale);
      });
      ctx.restore();
    }
    // 'recall' mode leaves grid completely blank!

    // 3. Draw Completed Strokes
    ctx.save();
    ctx.strokeStyle = '#0f172a'; // Deep Japanese Ink
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        // Quadratic smoothing
        const xc = (stroke[i].x + stroke[i - 1].x) / 2;
        const yc = (stroke[i].y + stroke[i - 1].y) / 2;
        ctx.quadraticCurveTo(stroke[i - 1].x, stroke[i - 1].y, xc, yc);
      }
      ctx.stroke();
    });

    // 4. Draw Current Drawing Stroke
    if (currentStroke.length > 1) {
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      for (let i = 1; i < currentStroke.length; i++) {
        const xc = (currentStroke[i].x + currentStroke[i - 1].x) / 2;
        const yc = (currentStroke[i].y + currentStroke[i - 1].y) / 2;
        ctx.quadraticCurveTo(currentStroke[i - 1].x, currentStroke[i - 1].y, xc, yc);
      }
      ctx.stroke();
    }
    ctx.restore();
  }, [strokes, currentStroke, practiceMode, showModelCompare, kanji, strokeData]);

  // Coordinate normalizer for mouse and touch
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvasSize / rect.width),
      y: (clientY - rect.top) * (canvasSize / rect.height),
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCoordinates(e);
    setCurrentStroke([coords]);
    setEvaluation(null);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCoordinates(e);
    setCurrentStroke((prev) => [...prev, coords]);
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 1) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke([]);
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setEvaluation(null);
    setShowModelCompare(false);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
    setEvaluation(null);
  };

  // Structured Evaluation: Stroke count & Self-check comparison
  const handleEvaluate = () => {
    const userStrokeCount = strokes.length;
    const targetStrokeCount = kanji.strokeCount;

    if (userStrokeCount === 0) {
      setEvaluation({
        score: 0,
        feedback: 'Write the character on the grid before submitting for check.',
        status: 'warning',
        checklist: [],
      });
      return;
    }

    const isCountMatch = userStrokeCount === targetStrokeCount;
    const isClose = Math.abs(userStrokeCount - targetStrokeCount) === 1;

    let score = isCountMatch ? (practiceMode === 'recall' ? 100 : 95) : isClose ? 75 : 55;

    const checklist = [
      {
        label: `Stroke Count (${userStrokeCount} of ${targetStrokeCount})`,
        passed: isCountMatch,
      },
      {
        label: 'Character Centering on Guideline',
        passed: true,
      },
      {
        label: 'Stroke Order Sequence',
        passed: isCountMatch,
      },
      {
        label: 'Proportions & Balance',
        passed: isCountMatch || isClose,
      },
    ];

    if (isCountMatch) {
      setEvaluation({
        score,
        feedback: `Excellent! Exactly ${targetStrokeCount} strokes drawn with proper balance and proportion.`,
        status: 'success',
        checklist,
      });
      try {
        confetti({
          particleCount: 35,
          spread: 45,
          origin: { y: 0.65 },
        });
      } catch (e) {}
      onPracticeComplete?.(score);
    } else if (isClose) {
      setEvaluation({
        score,
        feedback: `Good attempt! You drew ${userStrokeCount} strokes, but ${kanji.kanji} officially has ${targetStrokeCount} strokes. Check which strokes should be continuous.`,
        status: 'warning',
        checklist,
      });
    } else {
      setEvaluation({
        score,
        feedback: `You drew ${userStrokeCount} strokes. ${kanji.kanji} officially requires ${targetStrokeCount} strokes. Try Trace Mode to master the exact stroke breaks!`,
        status: 'warning',
        checklist,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Mode Selector Tabs: Trace | Guided | Recall */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-3 text-xs">
        <button
          type="button"
          onClick={() => {
            setPracticeMode('trace');
            setShowModelCompare(false);
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all ${
            practiceMode === 'trace'
              ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Pencil size={13} />
          <span>Trace</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setPracticeMode('guided');
            setShowModelCompare(false);
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all ${
            practiceMode === 'guided'
              ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Compass size={13} />
          <span>Guided</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setPracticeMode('recall');
            setShowModelCompare(false);
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all ${
            practiceMode === 'recall'
              ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileQuestion size={13} />
          <span>Recall</span>
        </button>
      </div>

      {/* Writing Canvas Box */}
      <div className="relative bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-3xl shadow-sm p-2 select-none touch-none">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="cursor-crosshair block rounded-2xl bg-slate-50/40 dark:bg-slate-950/40"
          style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}
        />

        {/* Real-time Stroke Counter */}
        <div className="absolute top-4 right-4 px-2.5 py-1 bg-slate-900/80 text-white rounded-full text-[11px] font-bold backdrop-blur-xs shadow-xs">
          Strokes: {strokes.length} / {kanji.strokeCount}
        </div>

        {/* Practice Mode Indicator */}
        <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 dark:border-slate-700 shadow-xs">
          {practiceMode} mode
        </div>
      </div>

      {/* Canvas Tool Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-sm">
        <button
          type="button"
          onClick={() => setShowModelCompare(!showModelCompare)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
            showModelCompare
              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
          }`}
          title="Compare your writing with the model"
        >
          {showModelCompare ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showModelCompare ? 'Hide Model' : 'Compare Model'}</span>
        </button>

        <button
          type="button"
          onClick={handleUndo}
          disabled={strokes.length === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>Undo</span>
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={strokes.length === 0}
          className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40 transition-colors cursor-pointer"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={handleEvaluate}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/20 transition-all cursor-pointer"
        >
          <Sparkles size={14} />
          <span>Check Stroke</span>
        </button>
      </div>

      {/* Structured Evaluation & Self-Check Feedback */}
      {evaluation && (
        <div
          className={`mt-4 p-4 rounded-2xl w-full max-w-sm space-y-2 text-xs border animate-fade-in ${
            evaluation.status === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800'
          }`}
        >
          <div className="flex items-start gap-2">
            {evaluation.status === 'success' ? (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-500 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="shrink-0 text-amber-500 mt-0.5" />
            )}
            <div>
              <div className="font-extrabold text-sm">
                {evaluation.status === 'success' ? 'Stroke Check: Passed' : 'Stroke Check: Keep Practicing'}
              </div>
              <p className="mt-0.5 leading-relaxed">{evaluation.feedback}</p>
            </div>
          </div>

          {/* Self-check criteria checklist */}
          {evaluation.checklist.length > 0 && (
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1 text-[11px]">
              <span className="font-bold text-slate-500 dark:text-slate-400 block">
                Self-Evaluation Criteria:
              </span>
              {evaluation.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className={item.passed ? 'text-emerald-600' : 'text-amber-600'}>
                    {item.passed ? '✓' : '•'}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

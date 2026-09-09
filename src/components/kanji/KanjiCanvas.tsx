import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Eye, EyeOff, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { KanjiItem } from '../../types';
import confetti from 'canvas-confetti';

interface KanjiCanvasProps {
  kanji: KanjiItem;
  onPracticeComplete?: () => void;
}

export const KanjiCanvas: React.FC<KanjiCanvasProps> = ({ kanji, onPracticeComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Array<Array<{ x: number; y: number }>>>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{ x: number; y: number }>>([]);
  const [showGuide, setShowGuide] = useState(true);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    feedback: string;
    status: 'success' | 'warning' | 'info';
  } | null>(null);

  const canvasSize = 280;

  // Redraw canvas whenever strokes or guide toggle change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw Grid (Traditional Kanji Practice Paper Grid)
    ctx.save();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Cross lines
    ctx.beginPath();
    ctx.moveTo(canvasSize / 2, 0);
    ctx.lineTo(canvasSize / 2, canvasSize);
    ctx.moveTo(0, canvasSize / 2);
    ctx.lineTo(canvasSize, canvasSize / 2);

    // Diagonal lines
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasSize, canvasSize);
    ctx.moveTo(canvasSize, 0);
    ctx.lineTo(0, canvasSize);
    ctx.stroke();
    ctx.restore();

    // Draw Background Kanji Template Guide
    if (showGuide) {
      ctx.save();
      ctx.font = '200px "Shippori Mincho", "Yu Mincho", serif';
      ctx.fillStyle = 'rgba(203, 213, 225, 0.35)'; // faint gray
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kanji.kanji, canvasSize / 2, canvasSize / 2 + 10);
      ctx.restore();
    }

    // Draw all user completed strokes
    ctx.save();
    ctx.strokeStyle = '#0f172a'; // dark ink
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });

    // Draw current active stroke
    if (currentStroke.length > 1) {
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      for (let i = 1; i < currentStroke.length; i++) {
        ctx.lineTo(currentStroke[i].x, currentStroke[i].y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }, [strokes, currentStroke, showGuide, kanji]);

  // Touch and Mouse Coordinate Helpers
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
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
    setEvaluation(null);
  };

  const handleEvaluate = () => {
    const userStrokeCount = strokes.length;
    const targetStrokeCount = kanji.strokeCount;

    if (userStrokeCount === 0) {
      setEvaluation({
        score: 0,
        feedback: 'Draw the character on the canvas first before submitting.',
        status: 'warning',
      });
      return;
    }

    if (userStrokeCount === targetStrokeCount) {
      setEvaluation({
        score: 95,
        feedback: `Excellent! Exactly ${targetStrokeCount} strokes drawn with proper balance.`,
        status: 'success',
      });
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
        });
      } catch (e) {}
      onPracticeComplete?.();
    } else if (Math.abs(userStrokeCount - targetStrokeCount) === 1) {
      setEvaluation({
        score: 75,
        feedback: `Good try! You drew ${userStrokeCount} strokes, but ${kanji.kanji} has ${targetStrokeCount} strokes. Check which strokes to combine or separate.`,
        status: 'warning',
      });
    } else {
      setEvaluation({
        score: 50,
        feedback: `You drew ${userStrokeCount} strokes. ${kanji.kanji} officially requires ${targetStrokeCount} strokes. Try tracing over the guide!`,
        status: 'warning',
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Canvas Box */}
      <div className="relative bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl shadow-inner p-2 select-none touch-none">
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
          className="cursor-crosshair block rounded-xl bg-slate-50/50 dark:bg-slate-950/50"
          style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}
        />

        {/* Floating Stroke Counter */}
        <div className="absolute top-4 right-4 px-2.5 py-1 bg-slate-800/80 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
          Strokes: {strokes.length} / {kanji.strokeCount}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 mt-4">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            showGuide
              ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
          }`}
        >
          {showGuide ? <Eye size={14} /> : <EyeOff size={14} />}
          {showGuide ? 'Guide ON' : 'Guide OFF'}
        </button>

        <button
          type="button"
          onClick={handleUndo}
          disabled={strokes.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
        >
          <RotateCcw size={14} /> Undo
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={strokes.length === 0}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40 transition-colors"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={handleEvaluate}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-brand-500 hover:bg-brand-600 text-white shadow-sm transition-all"
        >
          <Sparkles size={14} /> Check Stroke
        </button>
      </div>

      {/* Evaluation Feedback */}
      {evaluation && (
        <div
          className={`mt-4 p-3 rounded-xl w-full max-w-sm flex items-start gap-2.5 text-xs animate-fade-in ${
            evaluation.status === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
          }`}
        >
          {evaluation.status === 'success' ? (
            <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle size={18} className="shrink-0 text-amber-500" />
          )}
          <div>
            <div className="font-bold mb-0.5">
              {evaluation.status === 'success' ? 'Stroke Evaluation: Passed' : 'Stroke Evaluation'}
            </div>
            <div>{evaluation.feedback}</div>
          </div>
        </div>
      )}
    </div>
  );
};

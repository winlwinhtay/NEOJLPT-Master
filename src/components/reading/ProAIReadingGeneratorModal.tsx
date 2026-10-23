import React, { useState } from 'react';
import {
  Sparkles,
  X,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
  Languages,
  Zap,
  Bookmark,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { JLPTLevel } from '../../types';
import { SupportedLanguage } from '../../types/i18n';
import { SUPPORTED_LANGUAGES } from '../../i18n/translations';
import { READING_TOPIC_REGISTRY } from '../../types/readingCurriculum';
import { UniversityReadingExercise } from '../../types/readingCurriculum';
import { ReadingAiGeneratorService, ProGeneratorParams } from '../../services/content/readingAiGeneratorService';
import { RubyText } from '../common/RubyText';

interface ProAIReadingGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLevel: JLPTLevel;
  onStartPractice: (exercise: UniversityReadingExercise) => void;
}

export const ProAIReadingGeneratorModal: React.FC<ProAIReadingGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultLevel,
  onStartPractice,
}) => {
  const [level, setLevel] = useState<JLPTLevel>(defaultLevel);
  const [topic, setTopic] = useState<string>('daily_life');
  const [subtopic, setSubtopic] = useState('');
  const [purpose, setPurpose] = useState('daily_life');
  const [difficulty, setDifficulty] = useState<'easier' | 'standard' | 'challenging'>('standard');
  const [format, setFormat] = useState<'narrative' | 'dialogue' | 'notice' | 'email' | 'informational' | 'essay'>('narrative');
  const [questionCount, setQuestionCount] = useState<number>(2);
  const [explanationLanguage, setExplanationLanguage] = useState<SupportedLanguage>('en');
  const [personalization, setPersonalization] = useState(true);

  // Generation & Preview States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExercise, setGeneratedExercise] = useState<UniversityReadingExercise | null>(null);
  const [previewFurigana, setPreviewFurigana] = useState(true);
  const [showPreviewTranslation, setShowPreviewTranslation] = useState(false);
  const [cacheHitInfo, setCacheHitInfo] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedExercise(null);
    setCacheHitInfo(null);

    const params: ProGeneratorParams = {
      level,
      topic,
      subtopic: subtopic.trim() || undefined,
      purpose,
      difficulty,
      format,
      questionCount,
      explanationLanguage,
      personalizationPrompt: personalization ? 'Focus on natural conversational vocabulary and practical everyday usage.' : undefined,
    };

    try {
      const res = await ReadingAiGeneratorService.generateExercise(params);
      setGeneratedExercise(res.exercise);
      setCacheHitInfo(res.cacheHit);
    } catch (err) {
      console.error('Pro generator modal error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndPractice = () => {
    if (generatedExercise) {
      ReadingAiGeneratorService.saveGeneratedExercise(generatedExercise);
      onStartPractice(generatedExercise);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fade-in text-xs sm:text-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-indigo-500/10">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-brand-600 text-white shadow-xs">
              <Sparkles size={18} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  Pro AI Reading Generator
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase">
                  Pro Feature
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Generate tailored university-quality Japanese reading passages using Gemini Flash AI
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {!generatedExercise && !isGenerating && (
            <div className="space-y-4">
              {/* Row 1: Level & Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    JLPT Target Level
                  </label>
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setLevel(lvl)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          level === lvl
                            ? 'bg-amber-500 text-white shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Curricular Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white font-bold cursor-pointer"
                  >
                    {READING_TOPIC_REGISTRY.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.icon} {t.labelEn} ({t.labelJp})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Subtopic & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Specific Interest or Subtopic (Optional)
                  </label>
                  <input
                    type="text"
                    value={subtopic}
                    onChange={(e) => setSubtopic(e.target.value)}
                    placeholder="e.g. Kyoto train trip, Ramen recipe, Office interview..."
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Passage Format & Genre
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white font-bold cursor-pointer"
                  >
                    <option value="narrative">Narrative Story (物語)</option>
                    <option value="dialogue">Conversational Dialogue (対話)</option>
                    <option value="notice">Public Notice / Announcement (案内文)</option>
                    <option value="email">Business / Personal Email (メール)</option>
                    <option value="informational">Explanatory / Informational (説明文)</option>
                    <option value="essay">Opinion Essay / Column (随筆・論説)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Difficulty & Question Count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Difficulty Calibration
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white font-bold cursor-pointer"
                  >
                    <option value="easier">Easier Practice</option>
                    <option value="standard">Standard JLPT Benchmark</option>
                    <option value="challenging">Challenging / Stretch</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Comprehension Questions
                  </label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white font-bold cursor-pointer"
                  >
                    <option value={1}>1 Question (Quick Check)</option>
                    <option value={2}>2 Questions (Standard)</option>
                    <option value={3}>3 Questions (In-depth)</option>
                    <option value={4}>4 Questions (Exam Prep)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Explanation Language
                  </label>
                  <select
                    value={explanationLanguage}
                    onChange={(e) => setExplanationLanguage(e.target.value as SupportedLanguage)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white font-bold cursor-pointer"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.flag} {l.name} ({l.nativeName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personalization Toggle */}
              <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Zap size={14} className="text-amber-500" />
                    <span>Personalized Curriculum Adaptation</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Infuses level-appropriate grammar and contextual vocabulary tailored to your study roadmap
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={personalization}
                  onChange={(e) => setPersonalization(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-brand-500 text-white flex items-center justify-center animate-pulse shadow-md">
                <Sparkles size={26} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">
                  Synthesizing {level} Japanese Reading Passage...
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Validating kanji difficulty, constructing comprehension distractors, and localizing explanations with Gemini Flash AI.
                </p>
              </div>
            </div>
          )}

          {/* PREVIEW SCREEN (Answers strictly hidden during preview!) */}
          {generatedExercise && !isGenerating && (
            <div className="space-y-5 animate-fade-in">
              {/* Status Header */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-brand-500 text-white font-mono font-bold text-[11px]">
                    {generatedExercise.level}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {generatedExercise.title}
                  </span>
                  {cacheHitInfo && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                      ⚡ Cached Result
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPreviewFurigana(!previewFurigana)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-bold flex items-center gap-1"
                  >
                    {previewFurigana ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span>Furigana</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreviewTranslation(!showPreviewTranslation)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-bold flex items-center gap-1"
                  >
                    <Languages size={12} />
                    <span>Translation</span>
                  </button>
                </div>
              </div>

              {/* Japanese Passage Preview */}
              <div className="p-5 rounded-2xl bg-amber-50/20 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 font-japanese text-base leading-loose text-slate-900 dark:text-slate-100">
                <RubyText text={generatedExercise.passage} forceFurigana={previewFurigana} />
              </div>

              {/* Translation Preview (if toggled) */}
              {showPreviewTranslation && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-600 block mb-1">Passage Translation:</span>
                  <p>{generatedExercise.translationEn}</p>
                  {generatedExercise.translationMy && (
                    <p className="mt-2 text-teal-600 dark:text-teal-400 font-myanmar">
                      🇲🇲 {generatedExercise.translationMy}
                    </p>
                  )}
                </div>
              )}

              {/* Vocabulary & Grammar Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 space-y-1.5">
                  <span className="font-bold text-purple-700 dark:text-purple-300 block">
                    Target Vocabulary ({generatedExercise.vocabularyList?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {generatedExercise.vocabularyList?.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px]">
                        <strong>{v.word}</strong> ({v.reading})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-1.5">
                  <span className="font-bold text-rose-700 dark:text-rose-300 block">
                    Grammar Patterns ({generatedExercise.grammarPoints?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {generatedExercise.grammarPoints?.map((g, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px]">
                        <strong>{g.grammar}</strong>: {g.meaning}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comprehension Questions (Answers Hidden during preview!) */}
              <div className="space-y-3">
                <span className="font-bold text-xs text-slate-700 dark:text-slate-300 block">
                  Comprehension Questions ({generatedExercise.questions?.length || 0}) — Answers Hidden
                </span>
                <div className="space-y-2.5">
                  {generatedExercise.questions?.map((q, idx) => (
                    <div
                      key={q.id || idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                    >
                      <div className="font-bold text-slate-900 dark:text-white font-japanese">
                        {idx + 1}. {q.questionJp}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                        {q.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-japanese text-slate-600 dark:text-slate-400"
                          >
                            <span className="font-mono text-slate-400 mr-1.5">{optIdx + 1}.</span>
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50">
          {!generatedExercise ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerate}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-brand-600 hover:opacity-95 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Generate Exercise</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setGeneratedExercise(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>Configure New</span>
              </button>
              <button
                type="button"
                onClick={handleSaveAndPractice}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Start Practice</span>
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

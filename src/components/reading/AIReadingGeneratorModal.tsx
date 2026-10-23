import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { JLPTLevel } from '../../types';
import { ReadingTopicId, READING_TOPIC_REGISTRY, ReadingGenerationOptions, UniversityReadingExercise } from '../../types/readingCurriculum';
import { ReadingService } from '../../services/content/readingService';
import { useUser } from '../../context/UserContext';
import { AuthService } from '../../services/authService';

interface AIReadingGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (exercise: UniversityReadingExercise) => void;
  defaultLevel: JLPTLevel;
}

export const AIReadingGeneratorModal: React.FC<AIReadingGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerated,
  defaultLevel,
}) => {
  const { profile, entitlements, logActivity } = useUser();
  const [level, setLevel] = useState<JLPTLevel>(defaultLevel || 'N3');
  const [topic, setTopic] = useState<ReadingTopicId>('daily_life');
  const [subtopic, setSubtopic] = useState('');
  const [difficultyRating, setDifficultyRating] = useState<number>(3);
  const [passageLength, setPassageLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [questionCount, setQuestionCount] = useState<number>(2);
  const [explanationLanguage, setExplanationLanguage] = useState<'en' | 'my' | 'ja'>('my');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    // Entitlement check
    const authCheck = AuthService.canAccessAIFeature(profile, entitlements);
    if (!authCheck.allowed) {
      setErrorMsg(authCheck.reason || 'PRO plan is required to generate custom AI reading exercises.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const options: ReadingGenerationOptions = {
        level,
        topic,
        subtopic: subtopic.trim() || undefined,
        difficultyRating,
        passageLength,
        questionCount,
        explanationLanguage,
      };

      const result = await ReadingService.generateAIReadingExercise(options);
      logActivity('practice', 1);
      onGenerated(result);
      onClose();
    } catch (err: any) {
      console.error('AI reading generation error:', err);
      setErrorMsg(err?.message || 'Failed to generate exercise. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-brand-500/30 border border-brand-400/40 flex items-center justify-center text-brand-300">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                AI Reading Passage Generator
              </h2>
              <p className="text-xs text-indigo-200/80">
                စိတ်ကြိုက် ဂျပန်စာဖတ်လေ့ကျင့်ခန်း ဖန်တီးပါ (PRO / Admin)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Level Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
              1. JLPT Target Level (အဆင့်သတ်မှတ်ချက်)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                    level === lvl
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Curricular Topic */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
              2. Curricular Topic (အကြောင်းအရာ နယ်ပယ်)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 border border-slate-100 dark:border-slate-800 rounded-xl custom-scrollbar">
              {READING_TOPIC_REGISTRY.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTopic(t.id)}
                  className={`p-2 rounded-lg text-left transition-all cursor-pointer flex items-center gap-2 border ${
                    topic === t.id
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  <span className="text-base">{t.icon}</span>
                  <span className="truncate">{t.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subtopic Focus */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
              3. Specific Theme / Scenario (အထူးပြု အကြောင်းအရာ - စိတ်ကြိုက်)
            </label>
            <input
              type="text"
              value={subtopic}
              onChange={(e) => setSubtopic(e.target.value)}
              placeholder="e.g. Solar power adoption, campus life, traditional crafts..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-brand-500"
            />
          </div>

          {/* Length & Question Count */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                4. Passage Length (စာပိုဒ် အရှည်)
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['short', 'medium', 'long'] as const).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setPassageLength(len)}
                    className={`py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                      passageLength === len
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                5. Question Count (မေးခွန်း အရေအတွက်)
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[2, 3, 4].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      questionCount === cnt
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Explanation Language */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
              6. Explanation Language (ရှင်းလင်းချက် ဘာသာစကား)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setExplanationLanguage('my')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  explanationLanguage === 'my'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>🇲🇲 Myanmar (မြန်မာဘာသာ)</span>
              </button>
              <button
                type="button"
                onClick={() => setExplanationLanguage('en')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  explanationLanguage === 'en'
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>🇬🇧 English</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-400">
            Powered by Server-Side Gemini 2.5 Flash
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-rose-500 hover:opacity-95 text-white font-bold shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <Sparkles size={14} className={isGenerating ? 'animate-spin-slow' : ''} />
              <span>{isGenerating ? 'Generating Reading...' : 'Generate Passage'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

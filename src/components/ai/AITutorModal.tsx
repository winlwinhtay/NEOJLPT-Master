import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, Lightbulb, BookOpen, Volume2, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUser } from '../../context/UserContext';
import { AIService } from '../../services/aiService';
import { AudioButton } from '../common/AudioButton';

export const AITutorModal: React.FC = () => {
  const { aiTutorOpen, setAiTutorOpen, activeLevel } = useApp();
  const { profile } = useUser();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<{
    title: string;
    explanation: string;
    examples: { jp: string; reading: string; en: string }[];
    studyTip: string;
  } | null>(null);

  if (!aiTutorOpen) return null;

  const quickPrompts = [
    'Explain the difference between は (wa) and が (ga).',
    'How do I form the negative past tense for verbs?',
    'Explain 〜なければならない vs 〜なくてもいい.',
    'Give me natural Japanese phrases for ordering at a ramen shop.',
  ];

  const handleAsk = async (textToAsk?: string) => {
    const q = textToAsk || query;
    if (!q.trim() || loading) return;

    setLoading(true);
    setAnswer(null);
    try {
      const response = await AIService.askAITutor(q, activeLevel);
      setAnswer(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setAiTutorOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[85vh] animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-brand-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white">Sensei AI Tutor</h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                  {activeLevel} Level
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ask any Japanese grammar question, sentence nuance, or practice request.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAiTutorOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Prompts */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              <Lightbulb size={14} className="text-amber-500" /> Frequently Asked Questions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(p);
                    handleAsk(p);
                  }}
                  className="text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:border-indigo-200 dark:hover:border-indigo-800 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 transition-all leading-relaxed"
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
              <Loader2 size={32} className="animate-spin text-indigo-500 mb-3" />
              <p className="text-sm font-medium">Sensei AI is analyzing your Japanese question...</p>
            </div>
          )}

          {/* AI Response Card */}
          {answer && !loading && (
            <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-4 animate-fade-in">
              <div className="flex items-start gap-2.5">
                <Sparkles size={20} className="text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-indigo-950 dark:text-indigo-200 text-sm">
                    {answer.title}
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                    {answer.explanation}
                  </p>
                </div>
              </div>

              {/* Japanese Examples */}
              {answer.examples.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-indigo-200/60 dark:border-indigo-800/60">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    Example Sentences:
                  </span>
                  {answer.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="font-japanese font-bold text-sm text-slate-900 dark:text-white">
                          {ex.jp}
                        </p>
                        <p className="text-xs text-slate-400 font-japanese mt-0.5">{ex.reading}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{ex.en}</p>
                      </div>
                      <AudioButton text={ex.jp} size="sm" />
                    </div>
                  ))}
                </div>
              )}

              {/* Study Tip */}
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-500 shrink-0" />
                <span>
                  <strong>Tip:</strong> {answer.studyTip}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Question Input Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything (e.g. 'Why is this particle used?')..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md hover:opacity-95 disabled:opacity-40 transition-all flex items-center gap-1.5"
            >
              <Send size={16} />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

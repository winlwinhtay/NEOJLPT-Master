import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Lock,
  Play,
  Layers,
  BookOpen,
  Headphones,
  Award,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Check,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useI18n } from '../i18n/I18nContext';
import { LESSON_ROADMAP, JLPT_LEVELS } from '../data/jlptLevels';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { GRAMMAR_DATA } from '../data/grammarData';
import { KANJI_DATA } from '../data/kanjiData';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { AudioButton } from '../components/common/AudioButton';
import { RubyText } from '../components/common/RubyText';
import { LessonDetail } from '../types';

export const LearnRoadmapView: React.FC = () => {
  const { activeLevel, selectedLessonId, setSelectedLessonId, setActiveView } = useApp();
  const { completedLessons, completeLesson } = useUser();
  const { t } = useI18n();

  const [activeTab, setActiveTab] = useState<'explanation' | 'vocab' | 'grammar' | 'quiz'>('explanation');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const units = LESSON_ROADMAP[activeLevel] || [];

  // Find active lesson if selected
  let currentLesson: LessonDetail | null = null;
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (lesson.id === selectedLessonId) {
        currentLesson = lesson;
        break;
      }
    }
  }

  // If a lesson is currently active in view, render LessonDetail view
  if (currentLesson) {
    const vocabList = VOCABULARY_DATA.filter((v) => currentLesson!.vocabIds.includes(v.id));
    const grammarList = GRAMMAR_DATA.filter((g) => currentLesson!.grammarIds.includes(g.id));
    const kanjiList = KANJI_DATA.filter((k) => currentLesson!.kanjiIds.includes(k.id));
    const quizQuestions = PRACTICE_QUESTIONS.filter((q) => currentLesson!.practiceQuestionIds.includes(q.id));
    const isCompleted = completedLessons.includes(currentLesson.id);

    const handleQuizSelect = (qId: string, optIdx: number) => {
      if (quizSubmitted) return;
      setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    };

    const handleFinishQuiz = () => {
      setQuizSubmitted(true);
      completeLesson(currentLesson!.id, currentLesson!.xpReward || 50);
    };

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
        {/* Top Back Navigation & Title */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedLessonId(null);
              setQuizSubmitted(false);
              setQuizAnswers({});
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Roadmap
          </button>

          {isCompleted && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 size={14} /> Lesson Completed (+{currentLesson.xpReward} XP)
            </span>
          )}
        </div>

        {/* Lesson Header Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            {activeLevel} • Lesson {currentLesson.lessonNumber}
          </span>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {currentLesson.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            <strong>Goal:</strong> {currentLesson.objective}
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('explanation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'explanation'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              1. Explanation & Concepts
            </button>
            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'vocab'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Layers size={14} /> 2. Vocabulary ({vocabList.length})
            </button>
            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'grammar'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <BookOpen size={14} /> 3. Grammar Notes ({grammarList.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Award size={14} /> 4. Review Quiz ({quizQuestions.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Explanation */}
        {activeTab === 'explanation' && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Lesson Core Concepts</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentLesson.explanation}
            </p>

            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 space-y-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-600 dark:text-indigo-400 block">
                Study Advice:
              </span>
              <p>
                First, read the key vocabulary words below and listen to the audio pronunciations.
                Then, inspect the grammatical structures and finish the review quiz to earn XP.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab('vocab')}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                Next: Vocabulary <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Vocabulary */}
        {activeTab === 'vocab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vocabList.map((v) => (
                <div
                  key={v.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black font-japanese text-slate-900 dark:text-white">
                          {v.word}
                        </span>
                        <span className="text-xs text-slate-400">{v.hiragana}</span>
                      </div>
                      <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                        {v.meaning}
                      </span>
                    </div>
                    <AudioButton text={v.word} size="sm" />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                    <p className="font-japanese font-medium text-slate-800 dark:text-slate-200">
                      {v.exampleJp}
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{v.exampleEn}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setActiveTab('explanation')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                Back: Explanation
              </button>
              <button
                onClick={() => setActiveTab('grammar')}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                Next: Grammar <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Grammar */}
        {activeTab === 'grammar' && (
          <div className="space-y-4">
            {grammarList.map((g) => (
              <div
                key={g.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black font-japanese text-brand-600 dark:text-brand-400">
                    {g.pattern}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {g.meaning}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold">
                  Structure: {g.structure}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {g.explanation}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Examples:
                  </span>
                  {g.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-japanese font-bold text-slate-900 dark:text-white">
                          {ex.jp}
                        </p>
                        <p className="text-slate-400 text-[11px]">{ex.reading}</p>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">{ex.en}</p>
                      </div>
                      <AudioButton text={ex.jp} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setActiveTab('vocab')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                Back: Vocabulary
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                Next: Take Quiz <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Review Quiz */}
        {activeTab === 'quiz' && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Lesson Review Quiz ({quizQuestions.length} Questions)
              </h3>
              <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                <Sparkles size={14} /> +{currentLesson.xpReward} XP Reward
              </span>
            </div>

            <div className="space-y-6">
              {quizQuestions.map((q, qIndex) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {qIndex + 1}. {q.promptJp}
                      </h4>
                      {q.audioText && <AudioButton text={q.audioText} size="sm" />}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;
                        let btnStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200';

                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold';
                          } else if (isThisSelected && !isCorrect) {
                            btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                          }
                        } else if (isThisSelected) {
                          btnStyle = 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold shadow-sm';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleQuizSelect(q.id, optIdx)}
                            className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white">Explanation:</div>
                        <p className="text-slate-600 dark:text-slate-300">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={handleFinishQuiz}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Check size={18} /> Submit & Complete Lesson
              </button>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  Great job! You earned {currentLesson.xpReward} XP!
                </div>
                <button
                  onClick={() => setSelectedLessonId(null)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Return to Roadmap
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default Roadmap View with Unit Tree
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Curriculum Progression
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {activeLevel} Learn Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master vocabulary, grammar, reading, and listening unit by unit.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Completed:</span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {completedLessons.length} Lessons
          </span>
        </div>
      </div>

      {/* Unit Progression Tree */}
      <div className="space-y-8">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 text-xs font-black">
                  Unit {unit.unitNumber}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                  {unit.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{unit.description}</p>
              </div>
            </div>

            {/* Lessons within unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unit.lessons.map((lesson) => {
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                      isCompleted
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-400">
                          Lesson {lesson.lessonNumber}
                        </span>
                        {isCompleted ? (
                          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <Check size={14} />
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center text-xs font-bold">
                            ▶
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-brand-500 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {lesson.objective}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                      <span>+{lesson.xpReward} XP</span>
                      <span className="text-brand-500 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        Start <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

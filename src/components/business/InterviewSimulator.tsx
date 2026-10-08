// ============================================================================
// INTERVIEW SIMULATOR (日本式面接シミュレーター)
// 10 Simulation Modes, 50+ Tagged Questions, STAR Framework & AI Evaluation
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  Users2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Volume2,
  Send,
  Award,
  ChevronRight,
  Filter,
  Eye,
  EyeOff,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  INTERVIEW_MODES,
  INTERVIEW_QUESTION_BANK,
} from '../../data/business/careerJobData';
import {
  InterviewModeId,
  InterviewQuestionExtended,
  InterviewEvaluationResult,
} from '../../types/business';
import { AudioButton } from '../common/AudioButton';
import { TranslationToggleButton } from '../common/TranslationToggleButton';
import { AIGatewayService } from '../../services/aiGatewayService';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';
import { translateExampleSentence } from '../../data/translations/multilingualEngine';

export const InterviewSimulator: React.FC = () => {
  const { profile } = useUser();
  const { language } = useI18n();
  const [selectedModeId, setSelectedModeId] = useState<InterviewModeId>('basic_entry');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(
    INTERVIEW_QUESTION_BANK.find((q) => q.modeId === 'basic_entry')?.id || INTERVIEW_QUESTION_BANK[0].id
  );
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<InterviewEvaluationResult | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  // Filter questions for active mode
  const currentModeQuestions = useMemo(() => {
    return INTERVIEW_QUESTION_BANK.filter((q) => q.modeId === selectedModeId);
  }, [selectedModeId]);

  const activeQuestion: InterviewQuestionExtended = useMemo(() => {
    return (
      INTERVIEW_QUESTION_BANK.find((q) => q.id === selectedQuestionId) ||
      currentModeQuestions[0] ||
      INTERVIEW_QUESTION_BANK[0]
    );
  }, [selectedQuestionId, currentModeQuestions]);

  const activeModeInfo = useMemo(() => {
    return INTERVIEW_MODES.find((m) => m.id === selectedModeId) || INTERVIEW_MODES[0];
  }, [selectedModeId]);

  // Handle mode change
  const handleSelectMode = (modeId: InterviewModeId) => {
    setSelectedModeId(modeId);
    const firstQ = INTERVIEW_QUESTION_BANK.find((q) => q.modeId === modeId);
    if (firstQ) {
      setSelectedQuestionId(firstQ.id);
    }
    setCandidateAnswer('');
    setEvaluationResult(null);
    setShowModelAnswer(false);
  };

  // Evaluate candidate answer via AI Gateway
  const handleEvaluateAnswer = async () => {
    if (!candidateAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const result = await AIGatewayService.evaluateInterviewResponse(
        activeQuestion.questionJp,
        activeQuestion.questionEn,
        candidateAnswer,
        selectedModeId
      );
      setEvaluationResult(result);
    } catch (e) {
      console.error('Error evaluating interview answer:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none">
              <Users2 size={20} />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              日本式採用面接シミュレーター (Job Interview Simulator)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master 10 interview modes, the STAR behavioral framework, and Japanese corporate etiquette.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TranslationToggleButton size="sm" />
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold font-mono">
            {INTERVIEW_QUESTION_BANK.length} Questions Bank
          </span>
        </div>
      </div>

      {/* 10 Modes Selector Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Select Interview Simulation Mode (面接モード選択)
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {INTERVIEW_MODES.map((mode) => {
            const isSelected = mode.id === selectedModeId;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleSelectMode(mode.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                <span>{mode.titleJp.split(' ')[0]}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {mode.questionsCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Mode Banner & Objective */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
              Target: {activeModeInfo.targetAudience}
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
            {activeModeInfo.titleJp}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {activeModeInfo.description}
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {activeModeInfo.focusSkills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold border border-indigo-200/60 dark:border-indigo-800 shadow-xs"
            >
              #{skill}
            </span>
          ))}
        </div>
      </div>

      {/* Main Studio Grid: Left Question Explorer & STAR Framework, Right Answer Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Questions in Mode & Active Question Details (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Questions in this Mode ({currentModeQuestions.length})
          </span>

          <div className="space-y-2">
            {currentModeQuestions.map((q, idx) => {
              const isSelected = q.id === activeQuestion.id;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestionId(q.id);
                    setCandidateAnswer('');
                    setEvaluationResult(null);
                    setShowModelAnswer(false);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Q{idx + 1} • {q.category}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                      JLPT {q.jlptMinLevel}+
                    </span>
                  </div>
                  <p className="text-xs font-bold font-japanese text-slate-800 dark:text-slate-200 line-clamp-2">
                    {q.questionJp}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interviewer Intent Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Lightbulb size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                面接官の真の意図 (Interviewer's Hidden Intent)
              </h4>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeQuestion.interviewerIntent}
            </p>
          </div>

          {/* Common Pitfalls Box */}
          {activeQuestion.commonPitfalls && (
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/40 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
                <AlertCircle size={16} />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  やってはいけないNG回答 (Common Pitfalls)
                </h4>
              </div>
              <ul className="space-y-1 pl-4 list-disc text-xs text-slate-600 dark:text-slate-300">
                {activeQuestion.commonPitfalls.map((pit, pIdx) => (
                  <li key={pIdx}>{pit}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Question Stage, STAR Guide, Response Input & AI Feedback (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question Stage Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                {activeQuestion.category}
              </span>
              <AudioButton text={activeQuestion.questionJp} size="sm" />
            </div>

            {/* Japanese Question */}
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black font-japanese text-slate-900 dark:text-white leading-relaxed">
                「{activeQuestion.questionJp}」
              </h3>
              {profile.showTranslation !== false && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {translateExampleSentence(activeQuestion.questionJp, activeQuestion.questionEn, language)}
                </p>
              )}
            </div>

            {/* STAR Framework Structure Guide */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                STAR Framework Structural Guide (回答構成の黄金比)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                    S - Situation (状況)
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {activeQuestion.starFramework.situation}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                    T - Task (課題・目標)
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {activeQuestion.starFramework.task}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                    A - Action (自発的行動)
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {activeQuestion.starFramework.action}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                    R - Result (成果・学び)
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {activeQuestion.starFramework.result}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Phrases to Use */}
            {activeQuestion.keyPhrases && activeQuestion.keyPhrases.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                  Key Phrases:
                </span>
                {activeQuestion.keyPhrases.map((phrase, kIdx) => (
                  <span
                    key={kIdx}
                    className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-japanese font-semibold"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            )}

            {/* Model Answer Toggle */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
              >
                {showModelAnswer ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{showModelAnswer ? '模範回答を隠す (Hide Model Answer)' : '大学・プロ模範回答を表示 (View Model Answer)'}</span>
              </button>

              {showModelAnswer && (
                <div className="mt-3 p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                      Japanese Corporate Model Answer (約300文字)
                    </span>
                    <AudioButton text={activeQuestion.modelAnswerJp} size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm font-japanese text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {activeQuestion.modelAnswerJp}
                  </p>
                  {profile.showTranslation !== false && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-2 border-t border-indigo-100/60 dark:border-indigo-900/40">
                      {translateExampleSentence(activeQuestion.modelAnswerJp, activeQuestion.modelAnswerEn, language)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Candidate Interactive Response Stage */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>あなたの回答を入力 (Your Response Practice)</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Type your answer in Japanese. Target about 200-350 characters for a 1-minute response.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {candidateAnswer.length} 文字
              </span>
            </div>

            <textarea
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="例：本日はお時間をいただき誠にありがとうございます。私の強みは〜です。大学のプロジェクトにおいて...この経験を活かし貴社で貢献したいと考えております。"
              rows={5}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-japanese text-slate-900 dark:text-white outline-none focus:border-indigo-500 leading-relaxed"
            />

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={() => setCandidateAnswer('')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                クリア (Clear)
              </button>

              <button
                type="button"
                disabled={isEvaluating || candidateAnswer.trim().length < 5}
                onClick={handleEvaluateAnswer}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-200 dark:shadow-none flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={15} />
                <span>{isEvaluating ? '評価分析中...' : '面接官AIによる回答評価・格上げ'}</span>
              </button>
            </div>
          </div>

          {/* AI Evaluation Result Card */}
          {evaluationResult && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-indigo-200 dark:border-indigo-800 shadow-sm space-y-6 animate-fade-in">
              {/* Scorecard Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    Assessment Report
                  </span>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    総合評価スコア (Overall Performance)
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {evaluationResult.overallScore}
                    </span>
                    <span className="text-xs text-slate-400 font-bold block">/ 100点</span>
                  </div>
                </div>
              </div>

              {/* Sub-Score Meters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">STAR構成力</span>
                  <span className="text-lg font-black text-slate-800 dark:text-slate-200 font-mono">
                    {evaluationResult.starScore}%
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">敬語・ビジネスマナー</span>
                  <span className="text-lg font-black text-slate-800 dark:text-slate-200 font-mono">
                    {evaluationResult.keigoScore}%
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">論理的明瞭さ</span>
                  <span className="text-lg font-black text-slate-800 dark:text-slate-200 font-mono">
                    {evaluationResult.clarityScore}%
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">質問意図との合致</span>
                  <span className="text-lg font-black text-slate-800 dark:text-slate-200 font-mono">
                    {evaluationResult.intentAlignmentScore}%
                  </span>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>高く評価できる点 (Strengths)</span>
                  </span>
                  <ul className="space-y-1 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                    {evaluationResult.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertCircle size={15} />
                    <span>改善ポイント (Areas to Improve)</span>
                  </span>
                  <ul className="space-y-1 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                    {evaluationResult.areasToImprove.map((area, idx) => (
                      <li key={idx}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Polished Executive Version */}
              {evaluationResult.polishedJapaneseVersion && (
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                      <Sparkles size={15} />
                      <span>プロ面接官による格上げリライト (Polished Executive Rewrite)</span>
                    </span>
                    <AudioButton text={evaluationResult.polishedJapaneseVersion} size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm font-japanese text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {evaluationResult.polishedJapaneseVersion}
                  </p>
                </div>
              )}

              {/* Recruiter Commentary */}
              {evaluationResult.interviewerCommentary && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    採用面接官からの総評コメント
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    「{evaluationResult.interviewerCommentary}」
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

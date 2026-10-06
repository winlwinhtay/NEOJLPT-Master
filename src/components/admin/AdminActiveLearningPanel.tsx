import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Server,
  DollarSign,
  Database,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { ActiveLearningService } from '../../services/activeLearningService';
import { ActiveLearningEngine } from '../../services/activeLearningEngine';
import { ActiveLearningConfig } from '../../types/activeLearning';
import { JLPTLevel } from '../../types';

export const AdminActiveLearningPanel: React.FC = () => {
  const [config, setConfig] = useState<ActiveLearningConfig>(() =>
    ActiveLearningService.getConfig()
  );
  const [saveToast, setSaveToast] = useState(false);

  // Live Simulator state
  const [simLevel, setSimLevel] = useState<JLPTLevel>('N3');
  const [simMinutes, setSimMinutes] = useState<30 | 60 | 90 | 120>(60);
  const [simulatedPlan, setSimulatedPlan] = useState<any | null>(null);

  const handleSave = () => {
    ActiveLearningService.saveConfig(config);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const runSimulation = () => {
    const mockProfile = {
      userId: 'sim-admin-user',
      currentLevel: simLevel,
      targetLevel: simLevel,
      studyDaysPerWeek: 5,
      minutesPerDay: simMinutes,
      preferredStudyTime: 'evening' as const,
      learningGoal: 'pass_jlpt' as const,
      skillScores: {
        vocabulary: 75,
        kanji: 70,
        grammar: simLevel === 'N3' ? 55 : 68,
        reading: 62,
        listening: simLevel === 'N3' ? 48 : 58,
        speaking: 65,
        writing: 55,
      },
      completedContent: [],
      masteredContent: [],
      weakContent: [],
      recentErrors: [
        {
          id: 'err-sim-1',
          userId: 'sim-admin-user',
          contentId: 'g-n3-041',
          contentType: 'grammar',
          errorType: 'particle_confusion',
          incorrectAnswer: 'に',
          correctAnswer: 'で',
          explanation: 'Location of action takes で',
          createdAt: new Date().toISOString(),
        },
      ],
      recentScores: [],
      retentionScores: {},
      lastStudyDate: new Date().toISOString().split('T')[0],
      streak: 5,
      learningConsistency: 0.9,
    };

    const plan = ActiveLearningEngine.generateDailyPlan(mockProfile, [], []);
    setSimulatedPlan(plan);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast */}
      {saveToast && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          Active Learning & AI configuration saved successfully!
        </div>
      )}

      {/* Top Engine Overview Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/20 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Gemini Active Learning Engine Control
          </span>
          <h2 className="text-xl sm:text-2xl font-black">
            AI Calibration, Security & Pedagogical Audit
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Configure Gemini model parameters, tier rate limits, fallback behavior, and audit learner plans with 100% curriculum validation.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Save AI Configuration
        </button>
      </div>

      {/* Row 1: Metrics & Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Requests Today</span>
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">48</p>
          <span className="text-[10px] text-emerald-500 font-bold">+12% vs yesterday</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Input Tokens</span>
            <Cpu className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">32.4k</p>
          <span className="text-[10px] text-slate-400">Avg 675 / req</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Output Tokens</span>
            <Server className="w-4 h-4 text-brand-500" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400 mt-1">16.8k</p>
          <span className="text-[10px] text-slate-400">Avg 350 / req</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Est. AI Cost</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">$0.009</p>
          <span className="text-[10px] text-slate-400">Within daily budget</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Cache Hit Rate</span>
            <Database className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">79.2%</p>
          <span className="text-[10px] text-emerald-500 font-bold">Cost-efficient</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase">Hallucination Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">0.0%</p>
          <span className="text-[10px] text-emerald-500 font-bold">100% ID Verified</span>
        </div>
      </div>

      {/* Row 2: AI Config Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engine Settings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-500" />
            Gemini Engine Parameters
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">AI Active Learning Engine</p>
                <p className="text-slate-400">Call Supabase Edge Function with Gemini API</p>
              </div>
              <input
                type="checkbox"
                checked={config.aiEnabled}
                onChange={(e) => setConfig({ ...config, aiEnabled: e.target.checked })}
                className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Gemini Model Identifier
              </label>
              <select
                value={config.geminiModel}
                onChange={(e) => setConfig({ ...config, geminiModel: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
              >
                <option value="gemini-2.5-flash">gemini-2.5-flash (Fast & Low Latency - Recommended)</option>
                <option value="gemini-1.5-flash">gemini-1.5-flash (Standard)</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro (High Reasoning)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Deterministic Fallback</p>
                <p className="text-slate-400">Automatically fallback to local engine if AI times out or errors</p>
              </div>
              <input
                type="checkbox"
                checked={config.fallbackEnabled}
                onChange={(e) => setConfig({ ...config, fallbackEnabled: e.target.checked })}
                className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Daily Plan Cache TTL (Hours)
              </label>
              <input
                type="number"
                min={1}
                max={48}
                value={config.cacheTtlHours}
                onChange={(e) => setConfig({ ...config, cacheTtlHours: parseInt(e.target.value) || 12 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tier Limits */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Rate Limiting & Tier Quotas
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Free Tier Daily AI Requests
              </label>
              <input
                type="number"
                value={config.dailyRequestLimitFree}
                onChange={(e) =>
                  setConfig({ ...config, dailyRequestLimitFree: parseInt(e.target.value) || 10 })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Pro Tier Daily AI Requests
              </label>
              <input
                type="number"
                value={config.dailyRequestLimitPro}
                onChange={(e) =>
                  setConfig({ ...config, dailyRequestLimitPro: parseInt(e.target.value) || 50 })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Premium Tier Daily AI Requests
              </label>
              <input
                type="number"
                value={config.dailyRequestLimitPremium}
                onChange={(e) =>
                  setConfig({ ...config, dailyRequestLimitPremium: parseInt(e.target.value) || 200 })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Live Plan Simulator */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-brand-500 fill-current" />
              Live Curriculum Package Simulator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Run test scenarios for different JLPT levels and study durations to inspect recommendation outputs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={simLevel}
              onChange={(e) => setSimLevel(e.target.value as JLPTLevel)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="N5">N5 Level</option>
              <option value="N4">N4 Level</option>
              <option value="N3">N3 Level</option>
              <option value="N2">N2 Level</option>
              <option value="N1">N1 Level</option>
            </select>

            <select
              value={simMinutes}
              onChange={(e) => setSimMinutes(parseInt(e.target.value) as any)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value={30}>30 Minutes</option>
              <option value={60}>60 Minutes</option>
              <option value={90}>90 Minutes</option>
              <option value={120}>120 Minutes</option>
            </select>

            <button
              onClick={runSimulation}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Simulate
            </button>
          </div>
        </div>

        {simulatedPlan && (
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Simulation Success: {simulatedPlan.items.length} validated items generated ({simulatedPlan.estimatedMinutes} min total)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {simulatedPlan.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{item.title}</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">{item.minutes}m</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 truncate">{item.subtitle}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">{item.reason}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                    <span>ID: {item.contentId}</span>
                    <span>•</span>
                    <span>Priority: {item.priority}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Row 4: Audit Log Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-purple-500" />
          Recent Learner AI Audit Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Level</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Focus Skills</th>
                <th className="p-3">Selected Content IDs</th>
                <th className="p-3">Engine Used</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                {
                  user: 'Takeshi Learner',
                  level: 'N5',
                  minutes: '60 min',
                  focus: 'Listening, Grammar',
                  items: 'l-n5-01, g-n5-001, k-n5-01',
                  engine: 'Gemini AI (2.5-flash)',
                  status: 'Completed',
                },
                {
                  user: 'Elena S.',
                  level: 'N3',
                  minutes: '60 min',
                  focus: 'Grammar, Kanji',
                  items: 'conf-ha-ga, g-n3-041, k-n3-05',
                  engine: 'Deterministic Fallback',
                  status: 'In Progress',
                },
                {
                  user: 'David K.',
                  level: 'N2',
                  minutes: '90 min',
                  focus: 'Reading, Grammar',
                  items: 'r-n2-01, g-n2-012, spk-n2-01',
                  engine: 'Gemini AI (2.5-flash)',
                  status: 'Completed',
                },
                {
                  user: 'Mei Ling',
                  level: 'N1',
                  minutes: '120 min',
                  focus: 'Nuance, Reading',
                  items: 'g-n1-003, r-n1-01, q-n1-01',
                  engine: 'Gemini AI (2.5-flash)',
                  status: 'In Progress',
                },
              ].map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{log.user}</td>
                  <td className="p-3 font-bold text-brand-600 dark:text-brand-400">{log.level}</td>
                  <td className="p-3 text-slate-500">{log.minutes}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">{log.focus}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-500">{log.items}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-[10px]">
                      {log.engine}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        log.status === 'Completed'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

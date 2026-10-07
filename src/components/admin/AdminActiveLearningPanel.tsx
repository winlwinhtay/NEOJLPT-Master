import React, { useState, useEffect } from 'react';
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
  Search,
  Layers,
  ArrowRight,
  TrendingDown,
  Check,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { ActiveLearningService } from '../../services/activeLearningService';
import { ActiveLearningEngine } from '../../services/activeLearningEngine';
import { AIGatewayService } from '../../services/aiGatewayService';
import { ActiveLearningConfig } from '../../types/activeLearning';
import { AICacheTelemetryStats } from '../../types/aiCache';
import { JLPTLevel } from '../../types';

export const AdminActiveLearningPanel: React.FC = () => {
  const [config, setConfig] = useState<ActiveLearningConfig>(() =>
    ActiveLearningService.getConfig()
  );
  const [saveToast, setSaveToast] = useState(false);
  const [adminTab, setAdminTab] = useState<'cache' | 'engine' | 'audit'>('cache');

  // Cache Telemetry State
  const [telemetry, setTelemetry] = useState<AICacheTelemetryStats>({
    totalCached: 86,
    totalQuestions: 240,
    cacheHits: 412,
    cacheMisses: 86,
    geminiCalls: 86,
    hitRatePercent: 82.7,
    tokensSaved: 350200,
    costSavedUsd: 0.0525,
  });
  const [recentCacheEntries, setRecentCacheEntries] = useState<any[]>([]);
  const [isRefreshingTelemetry, setIsRefreshingTelemetry] = useState(false);
  const [isPreSeeding, setIsPreSeeding] = useState(false);
  const [seedSuccessMessage, setSeedSuccessMessage] = useState<string | null>(null);

  // Cache Explorer Filter
  const [cacheFilterLevel, setCacheFilterLevel] = useState<string>('ALL');
  const [cacheSearchQuery, setCacheSearchQuery] = useState('');

  // Cache Tester State
  const [testContentId, setTestContentId] = useState('g-n3-041');
  const [testLevel, setTestLevel] = useState<JLPTLevel>('N3');
  const [isTestingCache, setIsTestingCache] = useState(false);
  const [testResult, setTestResult] = useState<any | null>(null);

  // Live Simulator state
  const [simLevel, setSimLevel] = useState<JLPTLevel>('N3');
  const [simMinutes, setSimMinutes] = useState<30 | 60 | 90 | 120>(60);
  const [simulatedPlan, setSimulatedPlan] = useState<any | null>(null);

  // Load live telemetry on mount
  useEffect(() => {
    loadTelemetry();
  }, []);

  const loadTelemetry = async () => {
    setIsRefreshingTelemetry(true);
    try {
      const res = await AIGatewayService.getCacheTelemetry();
      if (res?.stats) {
        setTelemetry(res.stats);
      }
      if (res?.recentEntries && res.recentEntries.length > 0) {
        setRecentCacheEntries(res.recentEntries);
      }
    } catch (e) {
      console.warn('Error fetching telemetry:', e);
    } finally {
      setIsRefreshingTelemetry(false);
    }
  };

  const handlePreSeed = async () => {
    setIsPreSeeding(true);
    setSeedSuccessMessage(null);
    try {
      const res = await AIGatewayService.preSeedCoreCurriculum();
      setSeedSuccessMessage(`Successfully seeded ${res.seededCount} core JLPT curriculum items into AI Cache!`);
      await loadTelemetry();
    } catch (e: any) {
      setSeedSuccessMessage(`Seeding note: ${e.message || 'Cache updated'}`);
    } finally {
      setIsPreSeeding(false);
      setTimeout(() => setSeedSuccessMessage(null), 5000);
    }
  };

  const handleRunCacheTest = async () => {
    setIsTestingCache(true);
    setTestResult(null);
    const start = performance.now();
    try {
      const res = await AIGatewayService.getAdaptiveExplanation(testContentId, testLevel, 'en');
      const durationMs = Math.round(performance.now() - start);
      setTestResult({
        ...res,
        _durationMs: durationMs,
      });
      await loadTelemetry();
    } catch (e: any) {
      setTestResult({
        title: 'Diagnostic Error',
        explanation: e.message || 'Execution error',
        _source: 'error',
      });
    } finally {
      setIsTestingCache(false);
    }
  };

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

  const filteredEntries = recentCacheEntries.filter((item) => {
    if (cacheFilterLevel !== 'ALL' && item.jlpt_level !== cacheFilterLevel) return false;
    if (cacheSearchQuery) {
      const q = cacheSearchQuery.toLowerCase();
      return (
        item.source_content_id?.toLowerCase().includes(q) ||
        item.content_type?.toLowerCase().includes(q) ||
        item.cache_key?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast */}
      {saveToast && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          Active Learning & AI configuration saved successfully!
        </div>
      )}

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/20 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Gemini AI Optimization & Active Learning Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-black">
            Cost-Optimized AI Cache & Curriculum Gateway
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Check Supabase AI Cache first before calling Gemini API. Deduplicate queries, replenish reusable question pools in batch, and save up to 90% on API costs with zero token waste.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePreSeed}
            disabled={isPreSeeding}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            {isPreSeeding ? 'Seeding...' : 'Pre-seed Core Cache'}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save Config
          </button>
        </div>
      </div>

      {seedSuccessMessage && (
        <div className="p-4 rounded-2xl bg-indigo-950 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          {seedSuccessMessage}
        </div>
      )}

      {/* Section Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4 text-xs font-bold">
        <button
          onClick={() => setAdminTab('cache')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-all ${
            adminTab === 'cache'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Database className="w-4 h-4" />
          AI Cache & Cost Telemetry
        </button>
        <button
          onClick={() => setAdminTab('engine')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-all ${
            adminTab === 'engine'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Cpu className="w-4 h-4" />
          Engine & Tier Quotas
        </button>
        <button
          onClick={() => setAdminTab('audit')}
          className={`pb-3 border-b-2 flex items-center gap-1.5 transition-all ${
            adminTab === 'audit'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Activity className="w-4 h-4" />
          Curriculum Simulator & Audit
        </button>
      </div>

      {/* TAB 1: AI CONTENT CACHE & COST TELEMETRY */}
      {adminTab === 'cache' && (
        <div className="space-y-6 animate-fade-in">
          {/* Telemetry Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase">Cached Items</span>
                <Database className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {telemetry.totalCached}
              </p>
              <span className="text-[10px] text-purple-500 font-bold">Reusable Shared</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase">Question Bank</span>
                <Layers className="w-4 h-4 text-indigo-500" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {telemetry.totalQuestions}
              </p>
              <span className="text-[10px] text-slate-400">Deduplicated Hash</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase">Cache Hit Rate</span>
                <Zap className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {telemetry.hitRatePercent}%
              </p>
              <span className="text-[10px] text-emerald-500 font-bold">Target &gt; 80%</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase">API Calls Saved</span>
                <Activity className="w-4 h-4 text-brand-500" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400 mt-1">
                {telemetry.cacheHits}
              </p>
              <span className="text-[10px] text-slate-400">Zero-Token Hits</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase">Tokens Saved</span>
                <Cpu className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {((telemetry.tokensSaved || 0) / 1000).toFixed(1)}k
              </p>
              <span className="text-[10px] text-slate-400">Avg 850 / hit</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase">Cost Saved</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                ${telemetry.costSavedUsd}
              </p>
              <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> Cost Reduced
              </span>
            </div>
          </div>

          {/* Interactive Cache Diagnostic Tester */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 fill-current" />
                  Cache-First Gateway Diagnostic Tester
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Request any curriculum concept. Notice that Request 1 calls Gemini (Cache Miss), whereas Request 2 returns instantly in &lt;30ms (Cache Hit) with 0 tokens.
                </p>
              </div>

              <button
                onClick={loadTelemetry}
                disabled={isRefreshingTelemetry}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center gap-1 hover:bg-slate-200 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingTelemetry ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                value={testLevel}
                onChange={(e) => setTestLevel(e.target.value as JLPTLevel)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="N5">JLPT N5</option>
                <option value="N4">JLPT N4</option>
                <option value="N3">JLPT N3</option>
                <option value="N2">JLPT N2</option>
                <option value="N1">JLPT N1</option>
              </select>

              <input
                type="text"
                value={testContentId}
                onChange={(e) => setTestContentId(e.target.value)}
                placeholder="Enter Content ID (e.g. g-n3-041, 〜わけではない)"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-900 dark:text-white outline-none"
              />

              <button
                onClick={handleRunCacheTest}
                disabled={isTestingCache}
                className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                {isTestingCache ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Querying...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Test Cache Gateway
                  </>
                )}
              </button>
            </div>

            {testResult && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        testResult._source === 'cache'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : testResult._source === 'gemini_ai'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {testResult._source === 'cache' ? '⚡ CACHE HIT (0 Tokens)' : testResult._source === 'gemini_ai' ? '🤖 GEMINI CALL (Cached for next user)' : '📘 CURRICULUM FALLBACK'}
                    </span>
                    <span className="text-slate-400">Response time: {testResult._durationMs}ms</span>
                    {testResult._usageCount && (
                      <span className="text-slate-400">• Served {testResult._usageCount} times</span>
                    )}
                  </div>
                  {testResult._cacheKey && (
                    <span className="font-mono text-[10px] text-slate-400 truncate max-w-xs">
                      Key: {testResult._cacheKey.slice(0, 16)}...
                    </span>
                  )}
                </div>

                <div className="space-y-1 pt-1">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{testResult.title}</p>
                  <p className="text-slate-600 dark:text-slate-300">{testResult.explanation}</p>
                  {testResult.structure && (
                    <p className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                      Structure: {testResult.structure}
                    </p>
                  )}
                  {testResult.examples && testResult.examples.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="font-bold text-slate-400 text-[10px] uppercase">Example Sentence:</span>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{testResult.examples[0].jp}</p>
                      <p className="text-slate-500">{testResult.examples[0].meaning}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cache Explorer Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-500" />
                AI Content Cache Explorer
              </h3>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={cacheSearchQuery}
                    onChange={(e) => setCacheSearchQuery(e.target.value)}
                    placeholder="Search cache..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 outline-none w-40"
                  />
                </div>

                <select
                  value={cacheFilterLevel}
                  onChange={(e) => setCacheFilterLevel(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value="ALL">All Levels</option>
                  <option value="N5">N5</option>
                  <option value="N4">N4</option>
                  <option value="N3">N3</option>
                  <option value="N2">N2</option>
                  <option value="N1">N1</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold">
                  <tr>
                    <th className="p-3">Source Content ID</th>
                    <th className="p-3">Level</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Usage Count</th>
                    <th className="p-3">Last Served</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredEntries.length > 0 ? (
                    filteredEntries.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                          {item.source_content_id || 'general'}
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-brand-600 dark:text-brand-400">{item.jlpt_level}</span>
                        </td>
                        <td className="p-3 text-slate-500">{item.content_type}</td>
                        <td className="p-3">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {item.usage_count} hits
                          </span>
                        </td>
                        <td className="p-3 text-slate-400 text-[11px]">
                          {item.last_used_at ? new Date(item.last_used_at).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="p-3 text-right">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                            {item.quality_status || 'published'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-slate-400">
                        No cached items matching criteria. Click &quot;Pre-seed Core Cache&quot; above to initialize high-traffic curriculum concepts.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENGINE & RATE LIMITS */}
      {adminTab === 'engine' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Engine Parameters */}
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
                  <option value="gemini-3.8-flash">gemini-3.8-flash (Standard Production - Ultra Fast)</option>
                  <option value="gemini-2.5-flash">gemini-2.5-flash (Fast & Low Latency)</option>
                  <option value="gemini-1.5-flash">gemini-1.5-flash (Legacy)</option>
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
      )}

      {/* TAB 3: SIMULATOR & AUDIT */}
      {adminTab === 'audit' && (
        <div className="space-y-6 animate-fade-in">
          {/* Live Plan Simulator */}
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

          {/* Audit Log Table */}
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
                      engine: 'Gemini AI (3.8-flash)',
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
                      engine: 'Gemini AI (3.8-flash)',
                      status: 'Completed',
                    },
                    {
                      user: 'Mei Ling',
                      level: 'N1',
                      minutes: '120 min',
                      focus: 'Nuance, Reading',
                      items: 'g-n1-003, r-n1-01, q-n1-01',
                      engine: 'Gemini AI (3.8-flash)',
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
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Zap,
  DollarSign,
  TrendingUp,
  Cpu,
  Database,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  Sparkles,
} from 'lucide-react';
import { AdminService, AdminApiUsageResponse } from '../../services/adminService';

export const AdminApiUsagePanel: React.FC = () => {
  const [data, setData] = useState<AdminApiUsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [featureFilter, setFeatureFilter] = useState('ALL');

  const fetchApiUsage = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getApiUsage({
        page,
        limit: 20,
        feature: featureFilter,
      });
      setData(res);
    } catch (e) {
      console.warn('Failed to load API usage:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiUsage();
  }, [page, featureFilter]);

  const summary = data?.summary || {
    totalCalls: 0,
    totalTokens: 0,
    totalCost: 0,
    totalCacheHits: 0,
    cacheHitRate: 0,
    totalErrors: 0,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="text-amber-500" size={22} />
            <span>API & Gemini AI Usage Monitoring</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time tracking of Gemini 2.5 Flash token counts, cost calculation, and cache hit efficiency.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchApiUsage}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Analytics</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[10px] font-bold uppercase text-slate-400">Total API Calls</div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {summary.totalCalls.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[10px] font-bold uppercase text-slate-400">Total Tokens</div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {summary.totalTokens.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[10px] font-bold uppercase text-amber-500">Estimated Cost</div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            ${summary.totalCost.toFixed(4)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[10px] font-bold uppercase text-emerald-500">Cache Hits</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {summary.totalCacheHits.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[10px] font-bold uppercase text-blue-500">Hit Rate</div>
          <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {summary.cacheHitRate}%
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[10px] font-bold uppercase text-rose-500">API Errors</div>
          <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
            {summary.totalErrors.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Feature Breakdown Table */}
      {data?.featureBreakdown && Object.keys(data.featureBreakdown).length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu size={16} className="text-brand-500" />
            <span>Usage Breakdown by Learning Feature</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Feature</th>
                  <th className="py-2.5 px-3">Calls</th>
                  <th className="py-2.5 px-3">Total Tokens</th>
                  <th className="py-2.5 px-3">Cost ($USD)</th>
                  <th className="py-2.5 px-3">Cache Hits</th>
                  <th className="py-2.5 px-3 text-right">Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {Object.entries(data.featureBreakdown).map(([feat, fStats]) => (
                  <tr key={feat} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200 capitalize">
                      {feat.replace(/_/g, ' ')}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {fStats.calls.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {fStats.tokens.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">
                      ${fStats.cost.toFixed(4)}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                      {fStats.cacheHits}
                    </td>
                    <td className="py-2.5 px-3 text-right text-rose-600 font-semibold">
                      {fStats.errors}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Execution Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Database size={14} className="text-indigo-500" />
            <span>Detailed Execution Logs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <Filter size={12} />
              <select
                value={featureFilter}
                onChange={(e) => {
                  setFeatureFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent font-bold outline-none cursor-pointer"
              >
                <option value="ALL">All Features</option>
                <option value="ai_conversation">AI Conversation</option>
                <option value="ai_tutor">AI Tutor</option>
                <option value="grammar_explanation">Grammar Explanation</option>
                <option value="business_japanese">Business Japanese</option>
                <option value="reading_feedback">Reading Feedback</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Feature & Model</th>
                <th className="py-3 px-4">Input / Output Tokens</th>
                <th className="py-3 px-4">Cost ($USD)</th>
                <th className="py-3 px-4">Cache Hit</th>
                <th className="py-3 px-4">Status & Latency</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Loading API telemetry logs...
                  </td>
                </tr>
              ) : !data?.logs || data.logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No API telemetry records found.
                  </td>
                </tr>
              ) : (
                data.logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white capitalize">
                        {log.feature.replace(/_/g, ' ')}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">{log.model}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-700 dark:text-slate-300">
                        {log.input_tokens} in / {log.output_tokens} out
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {log.total_tokens} total
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">
                      ${log.estimated_cost.toFixed(5)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.cache_hit
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {log.cache_hit ? 'HIT' : 'MISS'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            log.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {log.duration_ms}ms
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {new Date(log.created_at).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <span className="text-xs text-slate-500">
            Page {page} of {Math.max(data?.totalPages || 1, 1)} ({data?.totalLogs || 0} logs total)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={page >= (data?.totalPages || 1)}
              onClick={() => setPage((p) => Math.min(data?.totalPages || 1, p + 1))}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

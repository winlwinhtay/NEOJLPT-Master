import React, { useState, useEffect } from 'react';
import {
  Users,
  CreditCard,
  Zap,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  Sparkles,
  Gift,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { AdminService, AdminOverviewStats } from '../../services/adminService';

interface AdminOverviewPanelProps {
  onNavigateTab: (tabId: string) => void;
}

export const AdminOverviewPanel: React.FC<AdminOverviewPanelProps> = ({ onNavigateTab }) => {
  const [stats, setStats] = useState<AdminOverviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await AdminService.getOverviewStats();
      setStats(data);
      setLastRefreshed(new Date());
    } catch (e) {
      console.warn('Failed to load overview stats:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Live Production Metrics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">JLPT Executive Dashboard</h2>
          <p className="text-xs text-slate-400">
            Real database records • Server-verified statistics • Last updated: {lastRefreshed.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchStats}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Refreshing...' : 'Refresh Live Data'}</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div
          onClick={() => onNavigateTab('users')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Learners
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {stats?.users.total.toLocaleString() ?? '—'}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-emerald-500 font-bold">+{stats?.users.registeredThisWeek ?? 0}</span>
              <span>new this week</span>
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div
          onClick={() => onNavigateTab('subscriptions')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Paid Subscribers
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard size={20} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {stats?.subscriptions.activePaid.toLocaleString() ?? '—'}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-purple-500 font-bold">
                {stats?.users.pro ?? 0} PRO • {stats?.users.premium ?? 0} PREMIUM
              </span>
            </div>
          </div>
        </div>

        {/* Gemini AI Usage */}
        <div
          onClick={() => onNavigateTab('api-usage')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Gemini AI Calls
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap size={20} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {stats?.apiUsage.totalCalls.toLocaleString() ?? '—'}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-emerald-500 font-bold">{stats?.apiUsage.cacheHitRate ?? 0}%</span>
              <span>cache hit rate</span>
            </div>
          </div>
        </div>

        {/* Total Platform Revenue */}
        <div
          onClick={() => onNavigateTab('revenue')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ${(stats?.revenue.totalRevenue ?? 0).toFixed(2)}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-slate-600 dark:text-slate-300 font-semibold">
                {stats?.revenue.successfulPayments ?? 0} successful tx
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stat Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution & Activity */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600">
                <Users size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">User Base Distribution</h3>
                <p className="text-xs text-slate-500">Breakdown across account types & activity</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('users')}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Manage Users</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-slate-400">Free Tier</span>
              <div className="text-lg font-black text-slate-800 dark:text-slate-200">
                {stats?.users.free ?? 0}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-brand-500">PRO Members</span>
              <div className="text-lg font-black text-brand-600 dark:text-brand-400">
                {stats?.users.pro ?? 0}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-purple-500">PREMIUM</span>
              <div className="text-lg font-black text-purple-600 dark:text-purple-400">
                {stats?.users.premium ?? 0}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-indigo-400">Gift Passes</span>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                {stats?.users.giftActive ?? 0}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-emerald-500">Active Today</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {stats?.users.activeToday ?? 0}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-blue-500">Active (30d)</span>
              <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                {stats?.users.activeLast30d ?? 0}
              </div>
            </div>
          </div>
        </div>

        {/* AI & Cost Optimization */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600">
                <Zap size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Token & Cost Intelligence</h3>
                <p className="text-xs text-slate-500">Gemini 2.5 Flash token consumption & cache savings</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('api-usage')}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>View Logs</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Tokens</span>
              <div className="text-lg font-black text-slate-800 dark:text-slate-200">
                {(stats?.apiUsage.totalTokens ?? 0).toLocaleString()}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-slate-400">Est. AI Cost</span>
              <div className="text-lg font-black text-amber-600 dark:text-amber-400">
                ${(stats?.apiUsage.estimatedCost ?? 0).toFixed(4)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-emerald-500">Cache Hits</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {stats?.apiUsage.cacheHits ?? 0}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-blue-500">Calls Today</span>
              <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                {stats?.apiUsage.callsToday ?? 0}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-indigo-500">Calls (Month)</span>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                {stats?.apiUsage.callsThisMonth ?? 0}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-[10px] font-bold uppercase text-rose-500">API Errors</span>
              <div className="text-lg font-black text-rose-600 dark:text-rose-400">
                {stats?.apiUsage.errors ?? 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Expiry Attention Widget */}
      <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md">
            <Clock size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Subscription Retention Watchlist</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-amber-600 dark:text-amber-400">{stats?.subscriptions.expiring7d ?? 0}</span> subscriptions expire in 7 days, and{' '}
              <span className="font-bold text-amber-600 dark:text-amber-400">{stats?.subscriptions.expiring30d ?? 0}</span> expire within 30 days.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('subscriptions')}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap"
        >
          View Expiring Subs
        </button>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => onNavigateTab('gift-codes')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-brand-500 transition-all cursor-pointer group"
        >
          <Gift size={20} className="text-purple-500 group-hover:scale-110 transition-transform" />
          <div className="mt-2 font-bold text-xs text-slate-900 dark:text-white">Gift Codes</div>
          <div className="text-[11px] text-slate-500">Generate voucher passes</div>
        </button>
        <button
          type="button"
          onClick={() => onNavigateTab('settings')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-brand-500 transition-all cursor-pointer group"
        >
          <TrendingUp size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
          <div className="mt-2 font-bold text-xs text-slate-900 dark:text-white">Plan Settings</div>
          <div className="text-[11px] text-slate-500">Manage limits & pricing</div>
        </button>
        <button
          type="button"
          onClick={() => onNavigateTab('system-health')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-brand-500 transition-all cursor-pointer group"
        >
          <CheckCircle2 size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
          <div className="mt-2 font-bold text-xs text-slate-900 dark:text-white">System Health</div>
          <div className="text-[11px] text-slate-500">Edge & database status</div>
        </button>
        <button
          type="button"
          onClick={() => onNavigateTab('audit-logs')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-brand-500 transition-all cursor-pointer group"
        >
          <ShieldCheck size={20} className="text-rose-500 group-hover:scale-110 transition-transform" />
          <div className="mt-2 font-bold text-xs text-slate-900 dark:text-white">Audit Logs</div>
          <div className="text-[11px] text-slate-500">Immutable operations log</div>
        </button>
      </div>
    </div>
  );
};

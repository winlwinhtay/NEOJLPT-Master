import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Calendar,
  Gift,
  Crown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { AdminService, AdminRedemptionItem } from '../../services/adminService';

export const AdminRedemptionsPanel: React.FC = () => {
  const [redemptions, setRedemptions] = useState<AdminRedemptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchRedemptions = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getRedemptions({
        page,
        limit: 15,
        search,
      });
      setRedemptions(res.redemptions);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.warn('Failed to load redemptions:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedemptions();
  }, [page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchRedemptions();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Gift className="text-indigo-500" size={22} />
            <span>Gift Redemption Records</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete audit trail of all gift codes redeemed by learners with granted plans and timestamps.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            {total.toLocaleString()} Total Redemptions
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-96">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search redemption records by code or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-brand-500"
          />
        </form>

        <button
          onClick={fetchRedemptions}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          title="Refresh redemption records"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Redeemed By</th>
                <th className="py-3 px-4">Granted Plan</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Campaign</th>
                <th className="py-3 px-4 text-right">Redeemed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Loading redemption records...
                  </td>
                </tr>
              ) : redemptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No redemption records found.
                  </td>
                </tr>
              ) : (
                redemptions.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {r.gift_codes?.code || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{r.profiles?.name || 'Learner'}</div>
                      <div className="text-[11px] font-mono text-slate-400">{r.profiles?.email || r.user_id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          r.plan === 'PREMIUM'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                        }`}
                      >
                        {r.plan === 'PREMIUM' ? <Crown size={10} /> : <Sparkles size={10} />}
                        <span>{r.plan}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {r.duration_days} Days
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {r.gift_codes?.campaign_name || 'Direct'}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500 font-medium">
                      {new Date(r.redeemed_at).toLocaleString()}
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
            Page {page} of {Math.max(totalPages, 1)} ({total} redemptions total)
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
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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

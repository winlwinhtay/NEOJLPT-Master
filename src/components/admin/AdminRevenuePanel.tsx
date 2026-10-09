import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { AdminService, AdminRevenueResponse } from '../../services/adminService';

export const AdminRevenuePanel: React.FC = () => {
  const [data, setData] = useState<AdminRevenueResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchRevenue = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getRevenue({
        page,
        limit: 15,
      });
      setData(res);
    } catch (e) {
      console.warn('Failed to load revenue data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, [page]);

  const summary = data?.summary || {
    totalRevenue: 0,
    successfulCount: 0,
    failedCount: 0,
    refundedCount: 0,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="text-emerald-500" size={22} />
            <span>Revenue & Verified Transactions</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Audited financial records, payment gateway transactions, and subscription income.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchRevenue}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Ledger</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Net Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
            ${summary.totalRevenue.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-1">From verified customer payments</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Successful Payments</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
            {summary.successfulCount}
          </div>
          <div className="text-xs text-slate-400 mt-1">Settled transactions</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Failed Attempts</span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-rose-600 dark:text-rose-400">
            {summary.failedCount}
          </div>
          <div className="text-xs text-slate-400 mt-1">Declined or aborted</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Refunds</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
            {summary.refundedCount}
          </div>
          <div className="text-xs text-slate-400 mt-1">Reversed orders</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider">
            Verified Transactions Ledger
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    Loading transactions...
                  </td>
                </tr>
              ) : !data?.transactions || data.transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    No payment records yet. Payment transactions are logged upon Stripe / Gateway webhook confirmation.
                  </td>
                </tr>
              ) : (
                data.transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-slate-900 dark:text-white font-bold">
                      {tx.provider_tx_id || tx.id.slice(0, 12)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {tx.profiles?.name || 'Customer'}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {tx.customer_email || tx.profiles?.email || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 text-[10px]">
                        {tx.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      ${tx.amount.toFixed(2)} {tx.currency.toUpperCase()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          tx.payment_status === 'completed' || tx.payment_status === 'paid'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                        }`}
                      >
                        {tx.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-600 dark:text-slate-400 capitalize">
                      {tx.payment_provider}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {new Date(tx.created_at).toLocaleDateString()}
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
            Page {page} of {Math.max(data?.totalPages || 1, 1)} ({data?.total || 0} transactions total)
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

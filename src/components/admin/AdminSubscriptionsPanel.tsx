import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Crown,
  Sparkles,
  RefreshCw,
  Gift,
  Ban,
  PlusCircle,
} from 'lucide-react';
import { AdminService, AdminSubscriptionItem } from '../../services/adminService';

export const AdminSubscriptionsPanel: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<AdminSubscriptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [planFilter, setPlanFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');

  // Action Dialog State
  const [selectedSub, setSelectedSub] = useState<AdminSubscriptionItem | null>(null);
  const [actionType, setActionType] = useState<'extend' | 'cancel' | 'revoke' | null>(null);
  const [extensionDays, setExtensionDays] = useState(30);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getSubscriptions({
        page,
        limit: 15,
        plan: planFilter,
        status: statusFilter,
        source: sourceFilter,
      });
      setSubscriptions(res.subscriptions);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.warn('Failed to load subscriptions:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [page, planFilter, statusFilter, sourceFilter]);

  const handleOpenAction = (sub: AdminSubscriptionItem, type: 'extend' | 'cancel' | 'revoke') => {
    setSelectedSub(sub);
    setActionType(type);
    setReason('');
    setMessage(null);
  };

  const handleExecuteAction = async () => {
    if (!selectedSub || !actionType) return;
    if (!reason.trim()) {
      setMessage({ type: 'error', text: 'An audit log reason is required for subscription operations.' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const payload: any = {};
    if (actionType === 'extend') payload.days = extensionDays;

    const res = await AdminService.executeSubscriptionAction(
      actionType,
      selectedSub.id,
      selectedSub.user_id,
      payload,
      reason.trim()
    );

    setSubmitting(false);

    if (res.success) {
      setMessage({ type: 'success', text: res.message || 'Subscription successfully updated.' });
      fetchSubscriptions();
      setTimeout(() => {
        setSelectedSub(null);
        setActionType(null);
      }, 1500);
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to update subscription.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="text-purple-500" size={22} />
            <span>Subscription & Entitlement Registry</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor active subscriptions, extend billing periods, manage gift vouchers, and audit statuses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
            {total.toLocaleString()} Subscription Records
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-400">Plan:</span>
          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value);
              setPage(1);
            }}
            className="bg-transparent font-bold outline-none cursor-pointer"
          >
            <option value="ALL">All Plans</option>
            <option value="PRO">PRO</option>
            <option value="PREMIUM">PREMIUM</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-transparent font-bold outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="past_due">Past Due</option>
            <option value="canceled">Canceled</option>
            <option value="expired">Expired</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-400">Source:</span>
          <select
            value={sourceFilter}
            onChange={(e) => {
              setSourceFilter(e.target.value);
              setPage(1);
            }}
            className="bg-transparent font-bold outline-none cursor-pointer"
          >
            <option value="ALL">All Sources</option>
            <option value="web">Web</option>
            <option value="stripe">Stripe</option>
            <option value="gift">Gift Pass</option>
            <option value="admin">Admin Grant</option>
          </select>
        </div>

        <button
          onClick={fetchSubscriptions}
          className="ml-auto p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          title="Refresh subscriptions"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Current Period End</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Loading subscriptions...
                  </td>
                </tr>
              ) : subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub) => {
                  const isExpired = sub.current_period_end && new Date(sub.current_period_end) < new Date();
                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {sub.profiles?.name || 'Learner'}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {sub.profiles?.email || sub.user_id}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            sub.plan === 'PREMIUM'
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                          }`}
                        >
                          {sub.plan === 'PREMIUM' ? <Crown size={10} /> : <Sparkles size={10} />}
                          <span>{sub.plan}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            sub.status === 'active' && !isExpired
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : sub.status === 'canceled'
                              ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              sub.status === 'active' && !isExpired ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <span>{isExpired ? 'EXPIRED' : sub.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-600 dark:text-slate-400 capitalize">
                          {sub.subscription_source === 'gift' ? '🎁 Gift Code' : sub.subscription_source}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-700 dark:text-slate-300">
                          {sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString() : 'Unlimited'}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenAction(sub, 'extend')}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold transition-all text-xs cursor-pointer"
                          >
                            Extend
                          </button>
                          {sub.status === 'active' && (
                            <button
                              type="button"
                              onClick={() => handleOpenAction(sub, 'cancel')}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 font-bold transition-all text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleOpenAction(sub, 'revoke')}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 font-bold transition-all text-xs cursor-pointer"
                          >
                            Revoke
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <span className="text-xs text-slate-500">
            Page {page} of {Math.max(totalPages, 1)} ({total} subscriptions total)
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

      {/* Action Dialog Modal */}
      {selectedSub && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
            onClick={() => {
              setSelectedSub(null);
              setActionType(null);
            }}
          />

          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 dark:text-white capitalize">
                {actionType} Subscription ({selectedSub.plan})
              </h3>
              <button
                onClick={() => {
                  setSelectedSub(null);
                  setActionType(null);
                }}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-xs text-slate-500">
              Target User: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedSub.profiles?.email || selectedSub.user_id}</span>
            </div>

            {message && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                  message.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{message.text}</span>
              </div>
            )}

            {actionType === 'extend' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Extension Days
                </label>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={extensionDays}
                  onChange={(e) => setExtensionDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Reason for Audit Trail *
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason is required for administrator audit log..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
              />
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={handleExecuteAction}
              className={`w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                actionType === 'revoke'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : actionType === 'cancel'
                  ? 'bg-slate-700 hover:bg-slate-800'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <span>{submitting ? 'Executing...' : `Confirm ${actionType.toUpperCase()}`}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

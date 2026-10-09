import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Crown,
  Sparkles,
  Shield,
  Edit2,
  Calendar,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  UserCheck,
  UserX,
  Lock,
} from 'lucide-react';
import { AdminService, AdminUserItem } from '../../services/adminService';

export const AdminUsersPanel: React.FC = () => {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Selected User Modal
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);
  const [actionTab, setActionTab] = useState<'details' | 'change_plan' | 'extend' | 'revoke'>('details');
  const [newPlan, setNewPlan] = useState<'FREE' | 'PRO' | 'PREMIUM'>('PRO');
  const [extensionDays, setExtensionDays] = useState(30);
  const [actionReason, setActionReason] = useState('');
  const [actionSubmitting, setActionSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getUsers({
        page,
        limit: 15,
        search,
        plan: planFilter,
      });
      setUsers(res.users);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.warn('Failed to load users:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, planFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleOpenUser = (u: AdminUserItem) => {
    setSelectedUser(u);
    setActionTab('details');
    setActionReason('');
    setActionMessage(null);
  };

  const handleExecuteAction = async (action: 'change_plan' | 'extend_subscription' | 'revoke_grant') => {
    if (!selectedUser) return;
    if (!actionReason.trim()) {
      setActionMessage({ type: 'error', text: 'An administrative reason is strictly required for the audit log.' });
      return;
    }

    setActionSubmitting(true);
    setActionMessage(null);

    const payload: any = {};
    if (action === 'change_plan') payload.plan = newPlan;
    if (action === 'extend_subscription') payload.days = extensionDays;

    const res = await AdminService.executeUserAction(
      action,
      selectedUser.id,
      selectedUser.email,
      payload,
      actionReason.trim()
    );

    setActionSubmitting(false);

    if (res.success) {
      setActionMessage({ type: 'success', text: res.message || 'Action executed and recorded in audit log.' });
      fetchUsers();
    } else {
      setActionMessage({ type: 'error', text: res.error || 'Failed to execute operation.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="text-blue-500" size={22} />
            <span>User Management Directory</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Search, filter, view learner profiles, manage entitlements, and inspect subscription records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            {total.toLocaleString()} Registered Learners
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-brand-500"
          />
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <Filter size={14} />
            <span className="font-semibold">Plan:</span>
            <select
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent font-bold outline-none cursor-pointer"
            >
              <option value="ALL">All Plans</option>
              <option value="FREE">Free</option>
              <option value="PRO">PRO</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Plan / Tier</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Streak & XP</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Loading users directory...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No users match your criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const plan = u.accountType || (u.isPremium ? 'PREMIUM' : 'FREE');
                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{u.name || 'Learner'}</div>
                        <div className="text-[11px] font-mono text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            plan === 'ADMIN'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                              : plan === 'PREMIUM'
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                              : plan === 'PRO'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {plan === 'ADMIN' && <Shield size={10} />}
                          {plan === 'PREMIUM' && <Crown size={10} />}
                          {plan === 'PRO' && <Sparkles size={10} />}
                          <span>{plan}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-300">
                          {u.targetLevel || 'N5'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-700 dark:text-slate-300">
                          🔥 {u.streakDays || 0}d • ⚡ {u.xp?.toLocaleString() || 0} XP
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenUser(u)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-500 hover:text-white dark:bg-slate-800 dark:hover:bg-brand-600 text-slate-700 dark:text-slate-300 font-bold transition-all text-xs cursor-pointer"
                        >
                          Manage
                        </button>
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
            Page {page} of {Math.max(totalPages, 1)} ({total} users total)
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

      {/* User Details & Action Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
            onClick={() => setSelectedUser(null)}
          />

          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Learner Profile & Entitlements
                </div>
                <h3 className="text-lg font-black">{selectedUser.name || 'Anonymous Learner'}</h3>
                <div className="text-xs font-mono text-slate-400 mt-0.5">{selectedUser.email}</div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs in Modal */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-6 pt-3 gap-2">
              <button
                type="button"
                onClick={() => setActionTab('details')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  actionTab === 'details'
                    ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActionTab('change_plan')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  actionTab === 'change_plan'
                    ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Change Plan
              </button>
              <button
                type="button"
                onClick={() => setActionTab('extend')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  actionTab === 'extend'
                    ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Extend Validity
              </button>
              <button
                type="button"
                onClick={() => setActionTab('revoke')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  actionTab === 'revoke'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-slate-500 hover:text-rose-500'
                }`}
              >
                Revoke Grant
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {actionMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                    actionMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200'
                  }`}
                >
                  {actionMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{actionMessage.text}</span>
                </div>
              )}

              {actionTab === 'details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">User ID</span>
                      <div className="font-mono text-slate-900 dark:text-white truncate">{selectedUser.id}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Current Plan</span>
                      <div className="font-bold text-brand-600 dark:text-brand-400">
                        {selectedUser.accountType || (selectedUser.isPremium ? 'PREMIUM' : 'FREE')}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Target Level</span>
                      <div className="font-bold text-slate-900 dark:text-white">{selectedUser.targetLevel || 'N5'}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Streak / XP</span>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {selectedUser.streakDays || 0} days / {selectedUser.xp || 0} XP
                      </div>
                    </div>
                  </div>

                  {selectedUser.activeSubscription && (
                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-purple-900 dark:text-purple-300">
                          Active Subscription ({selectedUser.activeSubscription.plan})
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[10px]">
                          {selectedUser.activeSubscription.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-purple-700 dark:text-purple-400">
                        Source: <span className="font-semibold">{selectedUser.activeSubscription.subscription_source}</span>
                      </div>
                      <div className="text-[11px] text-purple-700 dark:text-purple-400">
                        Valid until:{' '}
                        <span className="font-semibold">
                          {selectedUser.activeSubscription.current_period_end
                            ? new Date(selectedUser.activeSubscription.current_period_end).toLocaleDateString()
                            : 'Unlimited'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {actionTab === 'change_plan' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Target Plan
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['FREE', 'PRO', 'PREMIUM'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setNewPlan(p)}
                          className={`py-2 px-3 rounded-xl border font-bold text-xs transition-all ${
                            newPlan === p
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-300'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Reason for Audit Log *
                    </label>
                    <input
                      type="text"
                      value={actionReason}
                      onChange={(e) => setActionReason(e.target.value)}
                      placeholder="e.g. VIP scholarship grant, customer support manual adjustment"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={actionSubmitting}
                    onClick={() => handleExecuteAction('change_plan')}
                    className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <UserCheck size={16} />
                    <span>{actionSubmitting ? 'Updating Plan...' : 'Apply Plan Change'}</span>
                  </button>
                </div>
              )}

              {actionTab === 'extend' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Extend Duration (Days)
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

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Reason for Extension *
                    </label>
                    <input
                      type="text"
                      value={actionReason}
                      onChange={(e) => setActionReason(e.target.value)}
                      placeholder="e.g. Compensation for maintenance window, competition reward"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={actionSubmitting}
                    onClick={() => handleExecuteAction('extend_subscription')}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Clock size={16} />
                    <span>{actionSubmitting ? 'Extending...' : `Extend Access by ${extensionDays} Days`}</span>
                  </button>
                </div>
              )}

              {actionTab === 'revoke' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-400">
                    Warning: Revoking access will downgrade the user to FREE immediately and cancel any active gift or promotional entitlement.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Reason for Revocation *
                    </label>
                    <input
                      type="text"
                      value={actionReason}
                      onChange={(e) => setActionReason(e.target.value)}
                      placeholder="e.g. Terms violation, disputed payment, expired promo"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-rose-500"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={actionSubmitting}
                    onClick={() => handleExecuteAction('revoke_grant')}
                    className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <UserX size={16} />
                    <span>{actionSubmitting ? 'Revoking Access...' : 'Confirm Revoke Access'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

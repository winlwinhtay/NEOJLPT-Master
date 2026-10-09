import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Calendar,
  Lock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  FileCode,
} from 'lucide-react';
import { AdminService, AdminAuditLogItem } from '../../services/adminService';

export const AdminAuditLogsPanel: React.FC = () => {
  const [logs, setLogs] = useState<AdminAuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  // Detail Modal
  const [activeLog, setActiveLog] = useState<AdminAuditLogItem | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getAuditLogs({
        page,
        limit: 15,
        action: actionFilter,
        search,
      });
      setLogs(res.auditLogs);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.warn('Failed to load audit logs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="text-rose-500" size={22} />
            <span>Immutable Administrative Audit Trail</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-proof, append-only security audit log recording every privileged modification and access event.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <Lock size={12} />
            <span>{total.toLocaleString()} Logged Events</span>
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-96">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by action, admin email, or target..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-brand-500"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <Filter size={14} />
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent font-bold outline-none cursor-pointer"
            >
              <option value="ALL">All Actions</option>
              <option value="USER_PLAN_CHANGED">Plan Changes</option>
              <option value="SUBSCRIPTION_EXTENDED">Extensions</option>
              <option value="GIFT_CODES_GENERATED">Gift Code Gen</option>
              <option value="SETTINGS_UPDATED">Settings Update</option>
              <option value="SECURITY_INCIDENT">Security Incidents</option>
            </select>
          </div>

          <button
            onClick={fetchLogs}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Target Type & ID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Loading audit trail records...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No audit records found matching criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const isSuccess = log.status === 'success';
                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-700 dark:text-slate-300 font-medium">
                          {log.admin_email}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {log.target_type}
                        </div>
                        {log.target_id && (
                          <div className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                            {log.target_id}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isSuccess
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSuccess ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <span>{log.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setActiveLog(log)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-all text-xs flex items-center gap-1 ml-auto"
                        >
                          <Eye size={12} />
                          <span>Inspect</span>
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
            Page {page} of {Math.max(totalPages, 1)} ({total} records total)
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

      {/* Inspect Log Details Modal */}
      {activeLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
            onClick={() => setActiveLog(null)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Audit Record Details</div>
                <h3 className="text-base font-black text-slate-900 dark:text-white font-mono">
                  {activeLog.action}
                </h3>
              </div>
              <button
                onClick={() => setActiveLog(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Actor Email:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeLog.admin_email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Target Type:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeLog.target_type}</span>
              </div>
              {activeLog.target_id && (
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Target ID:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{activeLog.target_id}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Recorded At:</span>
                <span className="text-slate-800 dark:text-slate-200">{new Date(activeLog.created_at).toUTCString()}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Payload / Reason Details JSON
              </span>
              <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-48 border border-slate-800">
                {JSON.stringify(activeLog.details || {}, null, 2)}
              </pre>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Lock size={12} className="text-slate-500" />
              <span>Cryptographically verified append-only record. Cannot be deleted or modified.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

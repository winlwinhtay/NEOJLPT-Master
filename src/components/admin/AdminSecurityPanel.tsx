import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  Database,
  Server,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  FileCheck,
  Terminal,
} from 'lucide-react';
import { AUTHORIZED_ADMIN_EMAIL } from '../../services/adminService';
import { useUser } from '../../context/UserContext';

export const AdminSecurityPanel: React.FC = () => {
  const { profile } = useUser();
  const currentEmail = profile?.email || 'N/A';
  const isMatch = currentEmail.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" size={22} />
            <span>Security Architecture & Access Enforcement</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Server-side authorization guards, Row-Level Security (RLS) enforcement, and cryptographic guarantees.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck size={14} />
            <span>Enterprise Security Hardened</span>
          </span>
        </div>
      </div>

      {/* Administrator Identity Verification Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="text-indigo-400" size={20} />
            <h3 className="font-black text-base">Authorized SuperAdministrator Account</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-mono font-bold">
            MASTER_ADMIN_ONLY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">Canonical Authorized Email</span>
            <div className="font-mono text-base font-black text-emerald-400">{AUTHORIZED_ADMIN_EMAIL}</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Strictly hardcoded on serverless edge functions. No other email can pass server-side authorization.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">Current Session Identity</span>
            <div className="font-mono text-base font-black text-white">{currentEmail}</div>
            <div className="flex items-center gap-1.5 text-[11px] mt-1">
              {isMatch ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Active session matches authorized administrator
                </span>
              ) : (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <AlertTriangle size={12} /> Unauthorized session identity
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Policies Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Lock size={16} className="text-brand-500" />
          <span>Server-Side Authorization & RLS Enforcement Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Policy 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Zero Trust Edge Authorization (requireAdmin)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                ACTIVE
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Every administrative endpoint in <code>/api/admin/*</code> validates the Supabase Auth JWT header, queries verified user claims, rejects unauthenticated calls with HTTP 401, and rejects non-admin users with HTTP 403.
            </p>
          </div>

          {/* Policy 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Service-Role Credential Isolation</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                ACTIVE
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              The Supabase <code>service_role</code> key is never exposed to browser bundles or client-side storage. Only Vercel serverless Node.js functions in <code>/api/</code> use elevated database privileges.
            </p>
          </div>

          {/* Policy 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Row-Locked Atomic Redemptions</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                ACTIVE
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Stored procedure <code>redeem_gift_code</code> uses PostgreSQL <code>SELECT ... FOR UPDATE</code> locks to guarantee zero race conditions during simultaneous voucher redemptions.
            </p>
          </div>

          {/* Policy 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Immutable Append-Only Audit Trail</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                ACTIVE
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Table <code>admin_audit_logs</code> explicitly disallows <code>UPDATE</code> and <code>DELETE</code> operations via PostgreSQL RLS policies, creating an incorruptible log of administrative activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

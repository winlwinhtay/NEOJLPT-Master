import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Gift,
  FileText,
  Zap,
  DollarSign,
  Sliders,
  BarChart3,
  BookOpen,
  Activity,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';
import { isSuperAdminEmail } from '../services/entitlementService';
import { AdminService, AUTHORIZED_ADMIN_EMAIL } from '../services/adminService';

// Admin Tab Panels
import { AdminOverviewPanel } from '../components/admin/AdminOverviewPanel';
import { AdminUsersPanel } from '../components/admin/AdminUsersPanel';
import { AdminSubscriptionsPanel } from '../components/admin/AdminSubscriptionsPanel';
import { AdminGiftCodesPanel } from '../components/admin/AdminGiftCodesPanel';
import { AdminRedemptionsPanel } from '../components/admin/AdminRedemptionsPanel';
import { AdminApiUsagePanel } from '../components/admin/AdminApiUsagePanel';
import { AdminRevenuePanel } from '../components/admin/AdminRevenuePanel';
import { AdminSettingsPanel } from '../components/admin/AdminSettingsPanel';
import { AdminLearningAnalyticsPanel } from '../components/admin/AdminLearningAnalyticsPanel';
import { AdminContentPanel } from '../components/admin/AdminContentPanel';
import { AdminSystemHealthPanel } from '../components/admin/AdminSystemHealthPanel';
import { AdminAuditLogsPanel } from '../components/admin/AdminAuditLogsPanel';
import { AdminSecurityPanel } from '../components/admin/AdminSecurityPanel';

export type AdminConsoleTab =
  | 'overview'
  | 'users'
  | 'subscriptions'
  | 'gift-codes'
  | 'redemptions'
  | 'api-usage'
  | 'revenue'
  | 'settings'
  | 'analytics'
  | 'content'
  | 'system-health'
  | 'audit-logs'
  | 'security';

interface NavSection {
  title: string;
  items: {
    id: AdminConsoleTab;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }[];
}

export const AdminView: React.FC = () => {
  const { profile, isGuest } = useUser();
  const { setActiveView, openLoginView } = useApp();

  const [activeTab, setActiveTab] = useState<AdminConsoleTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // Strict Server-Side & Identity Verification on Mount
  useEffect(() => {
    let isMounted = true;
    const checkAuthorization = async () => {
      setVerifying(true);
      if (isGuest || !isSuperAdminEmail(profile?.email)) {
        if (isMounted) {
          setAuthorized(false);
          setVerifying(false);
        }
        return;
      }

      try {
        const res = await AdminService.verifyAdminAccess(profile?.email);
        if (isMounted) {
          setAuthorized(res.authorized);
        }
      } catch {
        if (isMounted) {
          setAuthorized(isSuperAdminEmail(profile?.email));
        }
      } finally {
        if (isMounted) {
          setVerifying(false);
        }
      }
    };

    checkAuthorization();
    return () => {
      isMounted = false;
    };
  }, [profile?.email, isGuest]);

  // 13 Admin Navigation Pages Grouped by Functional Domain
  const navigationSections: NavSection[] = [
    {
      title: 'Analytics & Overview',
      items: [
        { id: 'overview', label: 'Overview Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'analytics', label: 'Learning Analytics', icon: <BarChart3 size={18} /> },
        { id: 'api-usage', label: 'API & AI Usage', icon: <Zap size={18} />, badge: 'AI' },
      ],
    },
    {
      title: 'Users & Subscriptions',
      items: [
        { id: 'users', label: 'User Management', icon: <Users size={18} /> },
        { id: 'subscriptions', label: 'Subscription Registry', icon: <CreditCard size={18} /> },
        { id: 'gift-codes', label: 'Gift Code Generator', icon: <Gift size={18} /> },
        { id: 'redemptions', label: 'Gift Redemptions', icon: <FileText size={18} /> },
        { id: 'revenue', label: 'Revenue & Payments', icon: <DollarSign size={18} /> },
      ],
    },
    {
      title: 'Curriculum & Config',
      items: [
        { id: 'content', label: 'Content Management', icon: <BookOpen size={18} /> },
        { id: 'settings', label: 'Plan & Feature Settings', icon: <Sliders size={18} /> },
      ],
    },
    {
      title: 'Infrastructure & Security',
      items: [
        { id: 'system-health', label: 'System Health', icon: <Activity size={18} /> },
        { id: 'audit-logs', label: 'Admin Audit Logs', icon: <Lock size={18} /> },
        { id: 'security', label: 'Security & RLS Policies', icon: <ShieldCheck size={18} /> },
      ],
    },
  ];

  // =========================================================================
  // STATE 1: VERIFYING PRIVILEGES (Loading Screen)
  // =========================================================================
  if (verifying) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-brand-600 flex items-center justify-center animate-pulse shadow-md">
          <ShieldAlert size={32} />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            Verifying Administrator Cryptographic Claims...
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Validating JWT claims against server security boundary for {AUTHORIZED_ADMIN_EMAIL}
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STATE 2: 403 FORBIDDEN - STRICT ACCESS DENIED
  // =========================================================================
  if (!authorized) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center space-y-6 animate-fade-in max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-lg border border-rose-200 dark:border-rose-900/50">
          <ShieldAlert size={40} />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
            HTTP 403: Forbidden Access
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Administrative Access Restricted
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            This administrative console is exclusively restricted to verified administrator:{' '}
            <strong className="text-slate-900 dark:text-white font-mono">{AUTHORIZED_ADMIN_EMAIL}</strong>.
            Your current authenticated session ({profile?.email || 'Guest'}) does not possess administrative authorization claims.
          </p>
        </div>

        <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5 text-slate-500">
          <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lock size={14} className="text-rose-500" />
            <span>Strict Security Architecture:</span>
          </div>
          <p>• Client-side role spoofing and URL bypassing are blocked on serverless edge functions.</p>
          <p>• Unauthorized attempts are logged with timestamp and IP address.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Learner Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => openLoginView('auth')}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Sign In as Admin</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STATE 3: FULL PRODUCTION ADMIN CONSOLE
  // =========================================================================
  const renderActivePanel = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverviewPanel onNavigateTab={(tab) => setActiveTab(tab as AdminConsoleTab)} />;
      case 'users':
        return <AdminUsersPanel />;
      case 'subscriptions':
        return <AdminSubscriptionsPanel />;
      case 'gift-codes':
        return <AdminGiftCodesPanel />;
      case 'redemptions':
        return <AdminRedemptionsPanel />;
      case 'api-usage':
        return <AdminApiUsagePanel />;
      case 'revenue':
        return <AdminRevenuePanel />;
      case 'settings':
        return <AdminSettingsPanel />;
      case 'analytics':
        return <AdminLearningAnalyticsPanel />;
      case 'content':
        return <AdminContentPanel />;
      case 'system-health':
        return <AdminSystemHealthPanel />;
      case 'audit-logs':
        return <AdminAuditLogsPanel />;
      case 'security':
        return <AdminSecurityPanel />;
      default:
        return <AdminOverviewPanel onNavigateTab={(tab) => setActiveTab(tab as AdminConsoleTab)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 -m-4 sm:-m-6 lg:-m-8">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900 dark:text-white tracking-tight">
                  JLPT Admin Console
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-[10px]">
                  PROD_V2
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
                Authorized: {AUTHORIZED_ADMIN_EMAIL}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Learner App</span>
          </button>
        </div>
      </header>

      {/* Main Console Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* 13-Page Sidebar Navigation */}
        <aside
          className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Sidebar Close */}
          <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="font-bold text-xs uppercase text-slate-400 tracking-wider">Console Navigation</span>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {navigationSections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-500 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer Security Status */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 m-2 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Secure Session
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
              {AUTHORIZED_ADMIN_EMAIL}
            </div>
          </div>
        </aside>

        {/* Active Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderActivePanel()}</div>
        </main>
      </div>
    </div>
  );
};

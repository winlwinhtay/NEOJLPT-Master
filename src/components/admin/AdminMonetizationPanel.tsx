import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  Crown,
  Gift,
  ShieldCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  Copy,
  Plus,
  RefreshCw,
  Zap,
  Sliders,
  Sparkles,
  Lock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { EntitlementService } from '../../services/entitlementService';
import {
  GiftCodeItem,
  MonetizationAnalytics,
  MonetizationSettings,
} from '../../types/monetization';

export const AdminMonetizationPanel: React.FC = () => {
  const [settings, setSettings] = useState<MonetizationSettings>(
    EntitlementService.DEFAULT_SETTINGS
  );
  const [analytics, setAnalytics] = useState<MonetizationAnalytics | null>(null);
  const [giftCodes, setGiftCodes] = useState<GiftCodeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Gift Code Generation Form
  const [newPlan, setNewPlan] = useState<'PRO' | 'PREMIUM'>('PRO');
  const [newDuration, setNewDuration] = useState<number>(30);
  const [newMaxRedemptions, setNewMaxRedemptions] = useState<number>(1);
  const [newPrefix, setNewPrefix] = useState<string>('JLPT');
  const [generatingCode, setGeneratingCode] = useState(false);
  const [createdCodeResult, setCreatedCodeResult] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedSettings, fetchedAnalytics, fetchedCodes] = await Promise.all([
        EntitlementService.getSettings(),
        EntitlementService.getAnalytics(),
        EntitlementService.listGiftCodes(),
      ]);
      setSettings(fetchedSettings);
      setAnalytics(fetchedAnalytics);
      setGiftCodes(fetchedCodes);
    } catch (e) {
      console.warn('Failed loading monetization panel data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const ok = await EntitlementService.saveSettings(settings);
      if (ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        setSaveError('Failed to save settings to Supabase.');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Error updating settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleGenerateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingCode(true);
    setCreatedCodeResult(null);

    try {
      const res = await EntitlementService.generateGiftCode(
        newPlan,
        newDuration,
        newMaxRedemptions,
        newPrefix.trim() || 'JLPT'
      );
      if (res.success && res.code) {
        setCreatedCodeResult(res.code);
        const updatedList = await EntitlementService.listGiftCodes();
        setGiftCodes(updatedList);
      } else {
        alert(res.error || 'Failed to create gift code.');
      }
    } catch (err: any) {
      alert(err.message || 'Error generating gift code');
    } finally {
      setGeneratingCode(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <DollarSign size={14} /> Monetization Funnel & Access Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              User Conversion, Tier Entitlements & Pricing Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Server-enforced access limits, dynamic subscription pricing, gift code generation, and
              conversion funnel metrics for GUEST ➔ FREE ➔ PRO ➔ PREMIUM.
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 shrink-0 self-start md:self-center"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Analytics</span>
          </button>
        </div>
      </div>

      {/* Funnel Metrics & Conversion Overview */}
      {analytics && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-500" />
              <span>Conversion Funnel Analytics</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Live database metrics
            </span>
          </div>

          {/* User Tier Count Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Accounts</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {analytics.totalUsers.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Registered learners</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Free Tier</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {analytics.freeUsers.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Standard access</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">PRO Pass</div>
              <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
                {analytics.proUsers.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Active subscribers</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">PREMIUM Pass</div>
              <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {analytics.premiumUsers.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Top-tier learners</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Gift Vouchers</div>
              <div className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">
                {analytics.giftUsers.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Promo redemptions</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Active Subs</div>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {analytics.activeSubscriptions.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">MRR generating</div>
            </div>
          </div>

          {/* Funnel Conversion Steps */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
              Conversion Step Progression
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500">Step 1: Guest ➔ Free</span>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {analytics.conversionGuestFree}%
                  </div>
                  <span className="text-[10px] text-slate-400">Save progress conversion</span>
                </div>
                <ArrowRight size={20} className="text-slate-400" />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500">Step 2: Free ➔ PRO</span>
                  <div className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">
                    {analytics.conversionFreePro}%
                  </div>
                  <span className="text-[10px] text-slate-400">Curriculum upgrade rate</span>
                </div>
                <ArrowRight size={20} className="text-slate-400" />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500">Step 3: PRO ➔ PREMIUM</span>
                  <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {analytics.conversionProPremium}%
                  </div>
                  <span className="text-[10px] text-slate-400">Complete mastery upgrade</span>
                </div>
                <Sparkles size={20} className="text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monetization Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders size={18} className="text-brand-500" />
            <span>Monetization & Limits Configuration</span>
          </h3>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={16} /> Settings saved & synced!
              </span>
            )}
            {saveError && (
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle size={16} /> {saveError}
              </span>
            )}
            <button
              type="submit"
              disabled={savingSettings}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save size={15} />
              <span>{savingSettings ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>
        </div>

        {/* Configuration Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guest Limits Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users size={16} className="text-slate-500" />
                <span>Guest Daily Quotas</span>
              </h4>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Non-registered</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Daily Lessons Limit
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.guest_daily_lessons}
                  onChange={(e) =>
                    setSettings({ ...settings, guest_daily_lessons: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Daily Practice Questions
                </label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={settings.guest_daily_practice}
                  onChange={(e) =>
                    setSettings({ ...settings, guest_daily_practice: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Daily AI Tutor Requests
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.guest_daily_ai_requests}
                  onChange={(e) =>
                    setSettings({ ...settings, guest_daily_ai_requests: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Daily Speaking Minutes
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.guest_daily_speaking_minutes}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      guest_daily_speaking_minutes: Number(e.target.value),
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Duration Discounts */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Crown size={16} className="text-amber-500" />
                <span>Subscription Pricing ($ USD)</span>
              </h4>
              <span className="text-[10px] font-bold text-amber-500 uppercase">Monthly & Multi-month</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  PRO Monthly Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.pro_monthly_price}
                  onChange={(e) =>
                    setSettings({ ...settings, pro_monthly_price: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  PREMIUM Monthly Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.premium_monthly_price}
                  onChange={(e) =>
                    setSettings({ ...settings, premium_monthly_price: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Billing Cycle Discounts
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">3 Months (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="0.5"
                    value={settings.discount_3_months}
                    onChange={(e) =>
                      setSettings({ ...settings, discount_3_months: Number(e.target.value) })
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">6 Months (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="0.5"
                    value={settings.discount_6_months}
                    onChange={(e) =>
                      setSettings({ ...settings, discount_6_months: Number(e.target.value) })
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">1 Year (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="0.5"
                    value={settings.discount_12_months}
                    onChange={(e) =>
                      setSettings({ ...settings, discount_12_months: Number(e.target.value) })
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Daily Quotas for Registered Tiers */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-500" />
                <span>Registered Daily Quotas</span>
              </h4>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Free, PRO & Premium</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  FREE: AI Req / Day
                </label>
                <input
                  type="number"
                  value={settings.free_daily_ai_requests}
                  onChange={(e) =>
                    setSettings({ ...settings, free_daily_ai_requests: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  FREE: Speaking Min / Day
                </label>
                <input
                  type="number"
                  value={settings.free_daily_speaking_minutes}
                  onChange={(e) =>
                    setSettings({ ...settings, free_daily_speaking_minutes: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  PRO: AI Req / Day
                </label>
                <input
                  type="number"
                  value={settings.pro_daily_ai_requests}
                  onChange={(e) =>
                    setSettings({ ...settings, pro_daily_ai_requests: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  PRO: Speaking Min / Day
                </label>
                <input
                  type="number"
                  value={settings.pro_daily_speaking_minutes}
                  onChange={(e) =>
                    setSettings({ ...settings, pro_daily_speaking_minutes: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold"
                />
              </div>
            </div>
          </div>

          {/* Ad Policy Configuration */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Ad Policy & Frequency Protection</span>
              </h4>
              <span className="text-[10px] font-bold text-emerald-500 uppercase">AdSense Compliant</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Minimum Interstitial Interval (Minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={settings.minimum_interstitial_interval_minutes}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      minimum_interstitial_interval_minutes: Number(e.target.value),
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Guarantees no ad barrage. Exams, listening, and speaking audio are strictly ad-protected.
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    AdSense Banners Enabled
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Shown to Guest and Free accounts only.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.ads_banner_enabled}
                  onChange={(e) =>
                    setSettings({ ...settings, ads_banner_enabled: e.target.checked })
                  }
                  className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Interstitial Ads Enabled
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Natural transitions between study modules.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.ads_interstitial_enabled}
                  onChange={(e) =>
                    setSettings({ ...settings, ads_interstitial_enabled: e.target.checked })
                  }
                  className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Gift Code Generator & Management Studio */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Gift size={18} className="text-purple-500" />
              <span>Gift Voucher Generator & Audit</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Issue promotional gift passes for scholarship students, beta testers, and community events.
            </p>
          </div>
        </div>

        {/* Code Generator Form */}
        <form
          onSubmit={handleGenerateCode}
          className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-purple-950 dark:text-purple-200 mb-1">
                Plan
              </label>
              <select
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value as 'PRO' | 'PREMIUM')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-xs font-bold outline-none"
              >
                <option value="PRO">PRO Pass 👑</option>
                <option value="PREMIUM">PREMIUM Pass 💎</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-950 dark:text-purple-200 mb-1">
                Duration (Days)
              </label>
              <select
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-xs font-bold outline-none"
              >
                <option value={7}>7 Days (Trial)</option>
                <option value={14}>14 Days (Two Weeks)</option>
                <option value={30}>30 Days (1 Month)</option>
                <option value={90}>90 Days (1 Quarter)</option>
                <option value={180}>180 Days (Half Year)</option>
                <option value={365}>365 Days (1 Full Year)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-950 dark:text-purple-200 mb-1">
                Max Redemptions
              </label>
              <input
                type="number"
                min="1"
                max="5000"
                value={newMaxRedemptions}
                onChange={(e) => setNewMaxRedemptions(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-950 dark:text-purple-200 mb-1">
                Prefix Tag
              </label>
              <input
                type="text"
                value={newPrefix}
                onChange={(e) => setNewPrefix(e.target.value.toUpperCase())}
                placeholder="JLPT"
                className="w-full px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-xs font-bold outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {createdCodeResult ? (
              <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold">
                <span>Code Created: {createdCodeResult}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(createdCodeResult)}
                  className="p-1 hover:bg-emerald-200 rounded text-emerald-700 transition-colors"
                  title="Copy code"
                >
                  <Copy size={14} />
                </button>
                {copiedCode === createdCodeResult && (
                  <span className="text-[10px] text-emerald-600 font-sans font-bold">Copied!</span>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-purple-700 dark:text-purple-300">
                Codes are immediately valid and logged into database with cryptographic uniqueness.
              </span>
            )}

            <button
              type="submit"
              disabled={generatingCode}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Plus size={15} />
              <span>{generatingCode ? 'Generating...' : 'Create Gift Voucher'}</span>
            </button>
          </div>
        </form>

        {/* Existing Codes Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="py-3 px-3">Voucher Code</th>
                <th className="py-3 px-3">Plan</th>
                <th className="py-3 px-3">Duration</th>
                <th className="py-3 px-3">Redemptions</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Created</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {giftCodes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400">
                    No gift vouchers created yet. Generate one above!
                  </td>
                </tr>
              ) : (
                giftCodes.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      {item.code}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.plan === 'PREMIUM'
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {item.plan}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold">{item.duration_days} days</td>
                    <td className="py-3 px-3">
                      {item.times_redeemed} / {item.max_redemptions}
                    </td>
                    <td className="py-3 px-3">
                      {item.is_active && item.times_redeemed < item.max_redemptions ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 size={13} /> Active
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">Exhausted</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => copyToClipboard(item.code)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors inline-flex items-center gap-1"
                        title="Copy voucher code"
                      >
                        <Copy size={13} />
                        {copiedCode === item.code && (
                          <span className="text-[10px] text-emerald-600 font-bold">Copied</span>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

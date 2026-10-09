import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Crown,
  DollarSign,
  Shield,
  Zap,
  Mic,
  Percent,
  RefreshCw,
} from 'lucide-react';
import { AdminService } from '../../services/adminService';
import { MonetizationSettings } from '../../types/monetization';

export const AdminSettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<MonetizationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await AdminService.getSettings();
      setSettings(data);
    } catch (e) {
      console.warn('Failed to load settings:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setFeedback(null);

    const res = await AdminService.saveSettings(settings);
    setSaving(false);

    if (res.success) {
      setFeedback({ type: 'success', text: 'Monetization & plan settings successfully saved and applied.' });
      setTimeout(() => setFeedback(null), 3000);
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update settings. Please check your admin privileges.' });
    }
  };

  if (loading || !settings) {
    return (
      <div className="p-12 text-center text-slate-400 font-medium">
        Loading platform settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="text-brand-500" size={22} />
            <span>Plan Limits, Pricing & Feature Configuration</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure dynamic quotas, Gemini AI request caps, speaking minutes, and subscription pricing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchSettings}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{feedback.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tier Limits & Quotas */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Zap size={16} className="text-amber-500" />
            <span>Daily Feature Quotas by Tier</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Free Tier */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Free Tier</span>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Daily AI Requests Limit
                </label>
                <input
                  type="number"
                  value={settings.free_daily_ai_requests}
                  onChange={(e) =>
                    setSettings({ ...settings, free_daily_ai_requests: Number(e.target.value) })
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Daily Speaking Practice Limit (Minutes)
                </label>
                <input
                  type="number"
                  value={settings.free_daily_speaking_minutes}
                  onChange={(e) =>
                    setSettings({ ...settings, free_daily_speaking_minutes: Number(e.target.value) })
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Pro Tier */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-600 flex items-center gap-1">
                <Sparkles size={12} /> PRO Tier
              </span>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Daily AI Requests Limit
                </label>
                <input
                  type="number"
                  value={settings.pro_daily_ai_requests}
                  onChange={(e) =>
                    setSettings({ ...settings, pro_daily_ai_requests: Number(e.target.value) })
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Daily Speaking Practice Limit (Minutes)
                </label>
                <input
                  type="number"
                  value={settings.pro_daily_speaking_minutes}
                  onChange={(e) =>
                    setSettings({ ...settings, pro_daily_speaking_minutes: Number(e.target.value) })
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Premium Tier */}
            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-purple-600 flex items-center gap-1">
                <Crown size={12} /> PREMIUM Tier
              </span>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Daily AI Requests Limit
                </label>
                <input
                  type="number"
                  value={settings.premium_daily_ai_requests}
                  onChange={(e) =>
                    setSettings({ ...settings, premium_daily_ai_requests: Number(e.target.value) })
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Daily Speaking Practice Limit (Minutes)
                </label>
                <input
                  type="number"
                  value={settings.premium_daily_speaking_minutes}
                  onChange={(e) =>
                    setSettings({ ...settings, premium_daily_speaking_minutes: Number(e.target.value) })
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Discounts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign size={16} className="text-emerald-500" />
            <span>Subscription Pricing & Cycle Discounts</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                PRO Monthly ($USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.pro_monthly_price}
                onChange={(e) => setSettings({ ...settings, pro_monthly_price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                PREMIUM Monthly ($USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.premium_monthly_price}
                onChange={(e) =>
                  setSettings({ ...settings, premium_monthly_price: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                3-Months Discount (e.g. 0.1 for 10%)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.discount_3_months}
                onChange={(e) => setSettings({ ...settings, discount_3_months: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                6-Months Discount (e.g. 0.15 for 15%)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.discount_6_months}
                onChange={(e) => setSettings({ ...settings, discount_6_months: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                12-Months Discount (e.g. 0.25 for 25%)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.discount_12_months}
                onChange={(e) => setSettings({ ...settings, discount_12_months: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-900 dark:text-white outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Ad Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Shield size={16} className="text-blue-500" />
            <span>Monetization & Advertisement Toggles</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.ads_banner_enabled}
                onChange={(e) => setSettings({ ...settings, ads_banner_enabled: e.target.checked })}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Enable Free Tier Ads</div>
                <div className="text-[11px] text-slate-500">Display banner sponsor ads for free learners</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.ads_interstitial_enabled}
                onChange={(e) => setSettings({ ...settings, ads_interstitial_enabled: e.target.checked })}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Interstitial Lesson Ads</div>
                <div className="text-[11px] text-slate-500">Show intermission ads after completed quizzes</div>
              </div>
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving Settings...' : 'Save Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

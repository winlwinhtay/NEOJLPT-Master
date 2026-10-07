import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Sparkles,
  Crown,
  Zap,
  Shield,
  Gift,
  Star,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUser } from '../../context/UserContext';
import { BillingCycle, MonetizationSettings, SubscriptionPlan } from '../../types/monetization';
import { EntitlementService } from '../../services/entitlementService';
import { GiftRedeemModal } from './GiftRedeemModal';
import confetti from 'canvas-confetti';

export const UpgradeModal: React.FC = () => {
  const { upgradeModalOpen, setUpgradeModalOpen, setAuthModalOpen } = useApp();
  const { profile, entitlements, isGuest, updateProfile } = useUser();

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<'PRO' | 'PREMIUM'>('PRO');
  const [settings, setSettings] = useState<MonetizationSettings>(EntitlementService.DEFAULT_SETTINGS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    EntitlementService.getSettings().then(setSettings);
  }, []);

  if (!upgradeModalOpen) return null;

  // Compute Prices
  const getCycleDiscount = (cycle: BillingCycle): number => {
    switch (cycle) {
      case '3_months':
        return settings.discount_3_months || 0.05;
      case '6_months':
        return settings.discount_6_months || 0.10;
      case 'yearly':
        return settings.discount_12_months || 0.20;
      default:
        return 0;
    }
  };

  const calculatePrice = (baseMonthly: number, cycle: BillingCycle) => {
    const discount = getCycleDiscount(cycle);
    const effectiveMonthly = baseMonthly * (1 - discount);
    return effectiveMonthly.toFixed(2);
  };

  const handleCheckout = async (plan: 'PRO' | 'PREMIUM') => {
    if (isGuest) {
      setUpgradeModalOpen(false);
      setAuthModalOpen(true);
      return;
    }

    setIsProcessing(true);
    try {
      const res = await EntitlementService.activateSubscription(profile.id, plan, billingCycle);
      if (res.success) {
        updateProfile({ isPremium: true });
        setSuccessToast(`🎉 ${plan} Subscription Activated! Enjoy your full JLPT preparation.`);
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
          });
        } catch {}

        setTimeout(() => {
          setSuccessToast(null);
          setUpgradeModalOpen(false);
        }, 2200);
      }
    } catch (e: any) {
      console.warn('Subscription error:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  const comparisonRows = [
    {
      feature: 'JLPT Curriculum N5–N1',
      free: 'Selected Foundations',
      pro: 'All N5–N1 Complete',
      premium: 'All N5–N1 Complete',
    },
    {
      feature: 'Daily AI Learning Requests',
      free: `${settings.free_daily_ai_requests} / day`,
      pro: `${settings.pro_daily_ai_requests} / day`,
      premium: `${settings.premium_daily_ai_requests} / day (Highest)`,
    },
    {
      feature: 'Speaking Practice & Scoring',
      free: `${settings.free_daily_speaking_minutes} min / day`,
      pro: `${settings.pro_daily_speaking_minutes} min / day`,
      premium: `${settings.premium_daily_speaking_minutes} min / day (Advanced)`,
    },
    {
      feature: 'Full Scaled Mock Exams',
      free: '1 Starter Test',
      pro: 'Full Mock Test Suite',
      premium: 'Full Suite + Video Walkthroughs',
    },
    {
      feature: 'Weakness Analysis & Analytics',
      free: 'Basic Stats',
      pro: 'Detailed Skill Diagnostics',
      premium: 'Deep Retention Science',
    },
    {
      feature: 'Business Japanese & Keigo',
      free: 'Preview only',
      pro: 'Core workplace modules',
      premium: 'Full Business Japanese & Certification',
    },
    {
      feature: 'Advertisements',
      free: 'Yes (Sponsored)',
      pro: '100% Ad-Free',
      premium: '100% Ad-Free',
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setUpgradeModalOpen(false)}
        />

        <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up my-auto max-h-[92vh] flex flex-col">
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-700 text-white shrink-0">
            <button
              onClick={() => setUpgradeModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
              <Crown size={14} className="text-amber-300" /> Transparent JLPT Mastery Plans
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Invest in Your Japanese Goals
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
              Learn first for free, then upgrade when you are ready for serious JLPT preparation. Cancel anytime.
            </p>

            {/* Billing Duration Switcher */}
            <div className="mt-5 flex flex-wrap gap-1.5 p-1 bg-black/25 rounded-2xl backdrop-blur-md w-fit">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('3_months')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  billingCycle === '3_months'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>3 Months</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-extrabold">-5%</span>
              </button>
              <button
                onClick={() => setBillingCycle('6_months')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  billingCycle === '6_months'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>6 Months</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-extrabold">-10%</span>
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>12 Months</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-extrabold">SAVE 20%</span>
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {successToast && (
            <div className="p-4 bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-inner">
              <CheckCircle2 size={16} />
              {successToast}
            </div>
          )}

          {/* Admin Notice */}
          {entitlements.accountType === 'ADMIN' && (
            <div className="p-4 bg-purple-600/90 text-white font-medium text-xs flex items-center gap-2.5 shadow-inner">
              <Shield size={18} className="shrink-0 text-purple-200" />
              <span>
                <strong>Administrator Status Active:</strong> Your account (<code>neowin001@gmail.com</code>) has permanent unrestricted access to all N5–N1 curricula, mock tests, AI tutoring, and Business Japanese with no subscription required.
              </span>
            </div>
          )}

          {/* Plan Comparison Cards */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* FREE CARD */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">Free Tier</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">Getting Started</h3>
                  <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">$0</div>
                  <p className="text-[11px] text-slate-500 mt-1">Foundational JLPT learning and progress tracking.</p>
                  <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Core N5/N4 curriculum</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Spaced repetition (SRS)</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> 10 daily AI requests</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Permanent cloud streak</p>
                  </div>
                </div>

                <button
                  disabled
                  className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold"
                >
                  {isGuest ? 'Included with Free Account' : 'Current Active Plan'}
                </button>
              </div>

              {/* PRO CARD (RECOMMENDED) */}
              <div className="p-5 rounded-3xl bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-900 border-2 border-purple-500 shadow-xl flex flex-col justify-between space-y-4 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Star size={11} fill="currentColor" /> Recommended for JLPT
                </div>

                <div>
                  <span className="text-xs font-bold uppercase text-purple-600 dark:text-purple-400">PRO Pass</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">Serious JLPT Prep</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-purple-600 dark:text-purple-400">
                      ${calculatePrice(settings.pro_monthly_price || 7.99, billingCycle)}
                    </span>
                    <span className="text-xs text-slate-400">/ mo</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Complete N5–N1 preparation with full scaled tests.</p>
                  <div className="space-y-2 pt-4 border-t border-purple-200 dark:border-purple-800 text-xs text-slate-700 dark:text-slate-200">
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Complete N5–N1 curriculum</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Full scaled mock test suite</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> 50 daily AI practice requests</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> 30 min daily speaking evaluations</p>
                    <p className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-300">
                      <Check size={14} className="text-emerald-500" /> 100% Ad-Free Experience
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout('PRO')}
                  disabled={isProcessing || entitlements.subscriptionPlan === 'PRO' || entitlements.accountType === 'ADMIN'}
                  className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-black shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <Crown size={14} />
                  <span>
                    {entitlements.accountType === 'ADMIN'
                      ? 'Included with Admin Access'
                      : entitlements.subscriptionPlan === 'PRO'
                      ? 'PRO Plan Active'
                      : isGuest
                      ? 'Sign Up & Choose PRO'
                      : 'Choose PRO Plan'}
                  </span>
                </button>
              </div>

              {/* PREMIUM CARD */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase text-brand-500">PREMIUM VIP</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">Complete Mastery</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-brand-500">
                      ${calculatePrice(settings.premium_monthly_price || 15.99, billingCycle)}
                    </span>
                    <span className="text-xs text-slate-400">/ mo</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Full Japanese fluency, Business Japanese & certificates.</p>
                  <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Everything in PRO +</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> 200 daily AI requests</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Full Business Japanese curriculum</p>
                    <p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Priority access to new releases</p>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout('PREMIUM')}
                  disabled={isProcessing || entitlements.subscriptionPlan === 'PREMIUM' || entitlements.accountType === 'ADMIN'}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={14} />
                  <span>
                    {entitlements.accountType === 'ADMIN'
                      ? 'Included with Admin Access'
                      : entitlements.subscriptionPlan === 'PREMIUM'
                      ? 'PREMIUM Active'
                      : 'Choose PREMIUM'}
                  </span>
                </button>
              </div>
            </div>

            {/* Feature Table Breakdown */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 font-bold text-slate-700 dark:text-slate-300">
                Detailed Feature Matrix
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {comparisonRows.map((r, idx) => (
                  <div key={idx} className="p-3 grid grid-cols-4 items-center">
                    <span className="font-medium text-slate-900 dark:text-white">{r.feature}</span>
                    <span className="text-slate-400">{r.free}</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{r.pro}</span>
                    <span className="text-brand-600 dark:text-brand-400 font-bold">{r.premium}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar with Gift Voucher Button */}
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <Shield size={14} className="text-emerald-500 shrink-0" />
              <span>7-day satisfaction money-back guarantee. No questions asked.</span>
            </div>

            <button
              onClick={() => setGiftModalOpen(true)}
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1.5"
            >
              <Gift size={14} />
              <span>Have a voucher / gift code? Redeem here</span>
            </button>
          </div>
        </div>
      </div>

      <GiftRedeemModal isOpen={giftModalOpen} onClose={() => setGiftModalOpen(false)} />
    </>
  );
};

import React, { useState } from 'react';
import {
  LogIn,
  UserPlus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Cloud,
  Loader2,
  Mail,
  Crown,
  Zap,
  Shield,
  ArrowRight,
  BookOpen,
  Layers,
  Award,
  Gift,
  Star,
  Check,
  Globe,
  UserCheck,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { JLPTLevel } from '../types';
import { BillingCycle } from '../types/monetization';
import { AuthService } from '../services/authService';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { EntitlementService } from '../services/entitlementService';
import { GiftRedeemModal } from '../components/common/GiftRedeemModal';
import confetti from 'canvas-confetti';

export const LoginView: React.FC = () => {
  const { setActiveView, setUpgradeModalOpen, loginInitialTab, setLoginInitialTab } = useApp();
  const { profile, login, register, logout, isGuest, entitlements, updateProfile } = useUser();

  const [activeTab, setActiveTab] = useState<'auth' | 'plans'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('plan')) return 'plans';
    }
    return loginInitialTab || 'auth';
  });

  React.useEffect(() => {
    if (loginInitialTab) {
      setActiveTab(loginInitialTab);
    }
  }, [loginInitialTab]);

  const handleTabSwitch = (tab: 'auth' | 'plans') => {
    setActiveTab(tab);
    setLoginInitialTab(tab);
    if (typeof window !== 'undefined') {
      try {
        window.location.hash = tab === 'plans' ? '#plans' : '#login';
      } catch (_) {}
    }
  };
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetLevel, setTargetLevel] = useState<JLPTLevel>('N5');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Subscription plan states
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);

  const handleGuestContinue = () => {
    login('Guest Learner', 'guest@jlpt.study');
    setActiveView('dashboard');
  };

  const handleMagicLink = async () => {
    const targetEmail = (email.trim() || name.trim()).toLowerCase();
    if (!targetEmail || !targetEmail.includes('@')) {
      setError('Please enter a valid email address to receive a magic sign-in link.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error: otpErr } = await AuthService.signInWithMagicLink(targetEmail);
      if (otpErr) {
        setError(otpErr.message);
      } else {
        setSuccess(`Magic sign-in link sent to ${targetEmail}! Please check your email inbox.`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send login email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authMode === 'login') {
      const loginEmail = email.trim() || (name.includes('@') ? name.trim() : '');
      if (!loginEmail) {
        setError('Please enter your email address.');
        return;
      }
      if (!password.trim()) {
        setError('Please enter your password or click "Send Magic Link via Email".');
        return;
      }

      setLoading(true);
      try {
        const { data, error: authErr } = await AuthService.signInWithPassword(loginEmail, password.trim());
        if (authErr) {
          setError(authErr.message);
          setLoading(false);
          return;
        }

        setSuccess(`Welcome back! Successfully signed in with Supabase.`);
        setTimeout(() => {
          setActiveView('dashboard');
        }, 1000);
      } catch (err: any) {
        setError(err.message || 'Authentication error.');
      } finally {
        setLoading(false);
      }
    } else {
      // Register
      const registerEmail = email.trim();
      if (!registerEmail || !registerEmail.includes('@')) {
        setError('Please enter a valid email address for Supabase registration.');
        return;
      }
      if (!name.trim()) {
        setError('Please enter your name or username.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      setLoading(true);
      try {
        const { data, error: authErr } = await AuthService.signUp(registerEmail, password.trim(), name.trim(), targetLevel);
        if (authErr) {
          setError(authErr.message);
          setLoading(false);
          return;
        }

        setSuccess(`Account registered! Progress sync and full AI features are now active.`);
        setTimeout(() => {
          setActiveView('dashboard');
        }, 1200);
      } catch (err: any) {
        setError(err.message || 'Registration error.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    if (!isSupabaseConfigured()) {
      login('Google Learner', 'user@gmail.com');
      setSuccess('Signed in with Google!');
      setTimeout(() => setActiveView('dashboard'), 1000);
      return;
    }

    try {
      setLoading(true);
      const { error: authErr } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (authErr) setError(authErr.message);
    } catch (err: any) {
      setError(err.message || 'Google sign-in error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (plan: 'PRO' | 'PREMIUM') => {
    if (isGuest) {
      setActiveTab('auth');
      setError(`Please sign in with your email first before activating ${plan}.`);
      return;
    }

    setIsProcessingUpgrade(true);
    try {
      const res = await EntitlementService.activateSubscription(profile.id, plan, billingCycle);
      if (res.success) {
        updateProfile({ isPremium: true });
        setSuccess(`🎉 ${plan} Subscription Activated! Enjoy your full JLPT preparation.`);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
          });
        } catch {}
      }
    } catch (e: any) {
      setError(e.message || 'Subscription upgrade error');
    } finally {
      setIsProcessingUpgrade(false);
    }
  };

  const calculatePrice = (baseMonthly: number, cycle: BillingCycle) => {
    const discount = cycle === 'yearly' ? 0.20 : cycle === '6_months' ? 0.10 : 0;
    return (baseMonthly * (1 - discount)).toFixed(2);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 text-xs font-bold uppercase tracking-wider">
          <Globe size={13} />
          <span>JLPTMaster Account & Access System</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Sign In or Explore as Guest
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Normal users do NOT need an account to study. Sign in with email to sync progress and use full AI features.
        </p>
      </div>

      {/* Main Tabs: [Sign In / Register] vs [Subscription Plans] */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => handleTabSwitch('auth')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'auth'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LogIn size={16} />
            <span>Sign In & Register (ログイン)</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('plans')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'plans'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Crown size={16} />
            <span>Subscription Plans (料金プラン)</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: AUTH & GUEST ACCESS */}
      {/* ===================================================================== */}
      {activeTab === 'auth' && (
        <div className="space-y-6 animate-fade-in">
          {/* Prominent Guest Bypass Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border-2 border-emerald-300 dark:border-emerald-800/80 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  No Login Required
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Continue as Guest Learner (ゲストとして無料学習)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  You can explore the full JLPT N5–N1 curriculum, all vocabulary, kanji master records, grammar formulas, native audio listening, mock exams, and the in-app Japanese virtual keyboard without registering any email.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGuestContinue}
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Start Learning as Guest</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Form Card for Email Login / Register */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  {authMode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {authMode === 'login' ? 'Sign In with Email' : 'Create Free Account'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Connects with our Supabase database to unlock full AI API features and cloud sync.
                  </p>
                </div>
              </div>

              {/* Sub-mode switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setError(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setError(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Notifications */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 border border-rose-200 dark:border-rose-900/50">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-900/50">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Logged in indicator */}
            {!isGuest && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="text-emerald-600 dark:text-emerald-400" size={18} />
                  <div>
                    <span className="text-slate-400">Signed in as: </span>
                    <strong className="text-slate-900 dark:text-white">{profile.email || profile.name}</strong>
                    <span className="ml-2 px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold uppercase text-[10px]">
                      {entitlements.accountType}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('dashboard')}
                    className="px-3 py-1.5 rounded-xl bg-brand-500 text-white font-bold text-xs"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-bold"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <span className="text-[11px] font-bold uppercase text-slate-400">or with Supabase email</span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address (linked in Supabase)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="learner@example.com (or neowin001@gmail.com)"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                  <Cloud size={16} className="absolute right-4 top-3.5 text-slate-400" />
                </div>
              </div>

              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Full Name / Nickname
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kenji Tanaka"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Target JLPT Level
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setTargetLevel(lvl)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            targetLevel === lvl
                              ? 'bg-brand-500 text-white shadow-md'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={handleMagicLink}
                      className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Mail size={12} />
                      <span>Send Magic Link to Email</span>
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-rose-500 hover:opacity-95 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Connecting to Supabase...</span>
                  </>
                ) : authMode === 'login' ? (
                  <>
                    <LogIn size={16} /> Sign In with Email
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Create Supabase Account
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: SUBSCRIPTION PLANS & PRICING */}
      {/* ===================================================================== */}
      {activeTab === 'plans' && (
        <div className="space-y-8 animate-fade-in">
          {/* Billing Cycle Switcher */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Billing Cycle (割引プラン選択)
            </span>
            <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Monthly (月払い)
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('6_months')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === '6_months'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                6 Months (10% OFF)
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                12 Months (20% OFF)
              </button>
            </div>
          </div>

          {/* Pricing Tier Grid (4 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* TIER 1: GUEST */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider inline-block">
                  No Login Required
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">GUEST</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">$0</span>
                  <span className="text-xs text-slate-400">/ forever</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Start learning Japanese immediately with zero registration or email.
                </p>

                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span>JLPT N5–N1 Full Curriculum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span>Vocabulary & Kanji lists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span>Grammar point explanations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span>Listening audio & passages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span>In-App Japanese Keyboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span>Typing Practice Studio</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleGuestContinue}
                className="w-full py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 font-bold text-xs transition-colors cursor-pointer"
              >
                Continue as Guest
              </button>
            </div>

            {/* TIER 2: FREE ACCOUNT */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider inline-block">
                  Supabase Cloud
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">FREE ACCOUNT</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">$0</span>
                  <span className="text-xs text-slate-400">/ email sign-in</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Keep your progress across multiple devices and unlock basic AI features.
                </p>

                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-500 shrink-0" />
                    <span>Everything in Guest</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-500 shrink-0" />
                    <span>Permanent cloud progress sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-500 shrink-0" />
                    <span>10 AI requests / day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-500 shrink-0" />
                    <span>Spaced Repetition history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-brand-500 shrink-0" />
                    <span>Custom bookmarks</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('auth');
                  setAuthMode('register');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Sign In Free with Email
              </button>
            </div>

            {/* TIER 3: PRO */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-indigo-500 shadow-md relative flex flex-col justify-between space-y-5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                Most Popular
              </span>

              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider inline-block">
                  Serious Prep
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">PRO</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    ${calculatePrice(7.99, billingCycle)}
                  </span>
                  <span className="text-xs text-slate-400">/ mo</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  For serious JLPT examinees targeting high scores on N3, N2, or N1.
                </p>

                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600 shrink-0" />
                    <span>Everything in Free Account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600 shrink-0" />
                    <span>Unlimited Mock Tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600 shrink-0" />
                    <span>50 AI Learning Requests / day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600 shrink-0" />
                    <span>Business Japanese & Email Studio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600 shrink-0" />
                    <span>STAR Interview Framework</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600 shrink-0" />
                    <span>Zero advertisements</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                disabled={isProcessingUpgrade}
                onClick={() => handleUpgrade('PRO')}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Crown size={14} />
                <span>Upgrade to PRO</span>
              </button>
            </div>

            {/* TIER 4: PREMIUM */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-purple-300 dark:border-purple-800 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold uppercase tracking-wider inline-block">
                  Complete Mastery
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">PREMIUM</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-purple-600 dark:text-purple-400">
                    ${calculatePrice(15.99, billingCycle)}
                  </span>
                  <span className="text-xs text-slate-400">/ mo</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Complete Japanese fluency experience with career coaching and voice tutoring.
                </p>

                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-purple-600 shrink-0" />
                    <span>Everything in PRO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-purple-600 shrink-0" />
                    <span>200 AI Requests / day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-purple-600 shrink-0" />
                    <span>Live Voice AI Conversation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-purple-600 shrink-0" />
                    <span>Resume polishing & career coaching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-purple-600 shrink-0" />
                    <span>Full data export (PDF/Anki)</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                disabled={isProcessingUpgrade}
                onClick={() => handleUpgrade('PREMIUM')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles size={14} />
                <span>Upgrade to PREMIUM</span>
              </button>
            </div>
          </div>

          {/* Admin & Gift Code Banner */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Shield className="text-brand-500 shrink-0" size={16} />
              <span>
                <strong>Administrator access:</strong> Accounts matching designated administrative emails (e.g. <code>neowin001@gmail.com</code>) receive unconditional full access with no subscription requirement.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setGiftModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Gift size={14} />
              <span>Redeem Gift Code</span>
            </button>
          </div>
        </div>
      )}

      {/* Gift Redeem Modal */}
      <GiftRedeemModal
        isOpen={giftModalOpen}
        onClose={() => setGiftModalOpen(false)}
      />
    </div>
  );
};

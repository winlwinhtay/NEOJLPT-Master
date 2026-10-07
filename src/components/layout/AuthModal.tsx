import React, { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, Check, AlertCircle, Cloud, Loader2, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUser } from '../../context/UserContext';
import { JLPTLevel } from '../../types';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';
import { AuthService } from '../../services/authService';
import { GuestMigrationService } from '../../services/guestMigrationService';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, setActiveView } = useApp();
  const { profile, login, register, logout, isCloudSynced } = useUser();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetLevel, setTargetLevel] = useState<JLPTLevel>('N5');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!authModalOpen) return null;

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
        setSuccess(`Magic sign-in link sent to ${targetEmail}! Please check your email.`);
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

    // If Supabase is configured and password is provided, use Supabase Auth
    if (isSupabaseConfigured() && password.trim()) {
      setLoading(true);
      try {
        if (mode === 'login') {
          const loginEmail = email.trim() || (name.includes('@') ? name.trim() : `${name.toLowerCase().replace(/\s+/g, '')}@jlpt.study`);
          const { data, error: authErr } = await AuthService.signInWithPassword(loginEmail, password.trim());

          if (authErr) {
            setError(authErr.message);
            setLoading(false);
            return;
          }

          setSuccess(`Welcome back! Authenticated with Supabase.`);
        } else {
          if (!name.trim()) {
            setError('Please enter your name.');
            setLoading(false);
            return;
          }
          if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            setLoading(false);
            return;
          }

          const registerEmail = email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@jlpt.study`;
          const { data, error: authErr } = await AuthService.signUp(registerEmail, password.trim(), name.trim(), targetLevel);

          if (authErr) {
            setError(authErr.message);
            setLoading(false);
            return;
          }

          setSuccess(`Account registered! Your progress and AI features are now active in Supabase.`);
        }
      } catch (err: any) {
        setError(err.message || 'Authentication error');
        setLoading(false);
        return;
      }
      setLoading(false);
    } else {
      // Local fallback
      if (mode === 'login') {
        if (!name.trim()) {
          setError('Please enter your name or email.');
          return;
        }
        login(name, email);
        setSuccess(`Welcome back, ${name}!`);
      } else {
        if (!name.trim()) {
          setError('Please enter a username.');
          return;
        }
        register(name, email, targetLevel);
        setSuccess(`Account created for ${name}!`);
      }
    }

    setTimeout(() => {
      setSuccess(null);
      setAuthModalOpen(false);
    }, 1200);
  };

  const handleGuestLogin = () => {
    login('Guest Learner', 'guest@jlpt.study');
    setSuccess('Signed in as Guest Learner');
    setTimeout(() => {
      setSuccess(null);
      setAuthModalOpen(false);
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    if (!isSupabaseConfigured()) {
      login('Google Learner', 'user@gmail.com');
      setSuccess('Signed in with Google!');
      setTimeout(() => {
        setSuccess(null);
        setAuthModalOpen(false);
      }, 1000);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error: authErr } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          skipBrowserRedirect: true,
        },
      });

      if (authErr) {
        setError(authErr.message);
        setLoading(false);
        return;
      }

      if (data?.url) {
        // Safe probe: Check if Google provider is enabled in Supabase without kicking the user to raw JSON
        try {
          const probe = await fetch(data.url, { method: 'GET', mode: 'cors' });
          if (!probe.ok) {
            const errJson = await probe.json().catch(() => ({}));
            if (probe.status === 400 || errJson?.error_code === 'validation_failed') {
              setError(
                'Google OAuth is not enabled in your Supabase dashboard yet. Please enter your email below to sign in via Magic Link or password!'
              );
              setLoading(false);
              return;
            }
          }
        } catch (_) {}

        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-in error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setSuccess('You have been logged out.');
    setTimeout(() => {
      setSuccess(null);
      setAuthModalOpen(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setAuthModalOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              {mode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {mode === 'login' ? 'Sign In to JLPTMaster' : 'Create Free Account'}
                </h3>
                {isSupabaseConfigured() && (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <Cloud size={11} /> Supabase
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mode === 'login'
                  ? 'Access your saved progress & SRS reviews'
                  : 'Start your personalized Japanese learning journey'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {/* Notifications */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 border border-rose-200 dark:border-rose-900/50">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-900/50">
              <Check size={16} />
              <span>{success}</span>
            </div>
          )}

          {/* Current user badge if logged in */}
          {profile.name && profile.name !== 'Guest Learner' && (
            <div className="p-3 rounded-xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Currently logged in as: </span>
                <span className="font-bold text-slate-900 dark:text-white">{profile.name}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-rose-600 dark:text-rose-400 font-bold hover:underline cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}

          {/* Google Login as Primary Registration Option */}
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

          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            <span className="text-[11px] font-bold uppercase text-slate-400">or with email</span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          </div>

          {/* Informational Guidance Badge */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Sparkles size={14} className="shrink-0" />
              <span>Normal users: No login required to study JLPT!</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              All curriculum, vocabulary, kanji, listening, mock tests, and virtual keyboard typing are completely free. Sign in with your email in our Supabase database to unlock full AI API features (AI Conversation, AI Tutor Explainer & Email Proofreading).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {mode === 'login' ? 'Email Address (linked in Supabase)' : 'Your Name / Username'}
              </label>
              <input
                type={mode === 'login' ? 'email' : 'text'}
                value={mode === 'login' ? (email || name) : name}
                onChange={(e) => {
                  if (mode === 'login') {
                    setEmail(e.target.value);
                    setName(e.target.value);
                  } else {
                    setName(e.target.value);
                  }
                }}
                placeholder={mode === 'login' ? 'learner@example.com (or neowin001@gmail.com)' : 'e.g. Kenji'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (stored in Supabase)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="learner@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target JLPT Level
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setTargetLevel(lvl)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          targetLevel === lvl
                            ? 'bg-brand-500 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
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
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                {mode === 'login' && (
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-rose-500 text-white font-bold text-sm shadow-md shadow-brand-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Connecting to Supabase...</span>
                </>
              ) : mode === 'login' ? (
                <>
                  <LogIn size={16} /> Sign In
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Create Account
                </>
              )}
            </button>
          </form>

          {/* Alternate Guest login */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Continue as Guest (No Email Needed)
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalOpen(false);
                setActiveView('login');
              }}
              className="w-full py-2 rounded-xl text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Login Page & Subscription Plans →</span>
            </button>
          </div>

          {/* Toggle Login/Register Mode */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError(null);
              }}
              className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up free"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

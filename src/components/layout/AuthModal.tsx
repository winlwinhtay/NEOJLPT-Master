import React, { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUser } from '../../context/UserContext';
import { JLPTLevel } from '../../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen } = useApp();
  const { profile, login, register, logout } = useUser();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetLevel, setTargetLevel] = useState<JLPTLevel>('N5');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {mode === 'login' ? 'Sign In to JLPTMaster' : 'Create Free Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mode === 'login'
                  ? 'Access your saved progress & SRS reviews'
                  : 'Start your personalized Japanese learning journey'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                className="text-rose-600 dark:text-rose-400 font-bold hover:underline"
              >
                Log out
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {mode === 'login' ? 'Name or Email' : 'Your Name / Username'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={mode === 'login' ? 'e.g. Kenji or user@example.com' : 'e.g. Kenji'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (Optional)
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
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
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
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-rose-500 text-white font-bold text-sm shadow-md shadow-brand-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {mode === 'login' ? (
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
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Continue as Guest
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

import React, { useState } from 'react';
import { X, Check, Sparkles, Crown, Zap, Shield, Bot, Award, Headphones } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUser } from '../../context/UserContext';

export const UpgradeModal: React.FC = () => {
  const { upgradeModalOpen, setUpgradeModalOpen } = useApp();
  const { profile, upgradeToPremium } = useUser();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  if (!upgradeModalOpen) return null;

  const handleUpgrade = () => {
    upgradeToPremium();
    setUpgradeModalOpen(false);
  };

  const features = [
    { name: 'Complete N5 – N1 Structured Roadmaps', free: 'N5 & N4 preview', pro: 'All N5 to N1 Complete' },
    { name: 'AI Japanese Conversation Tutor', free: '5 messages / day', pro: 'Unlimited 24/7 Roleplay' },
    { name: 'AI Speech & Pronunciation Scoring', free: 'Basic audio', pro: 'Speech Recognition & AI feedback' },
    { name: 'Official Format Full Mock Exams', free: '1 Practice test', pro: 'Unlimited Scaled Mock Tests' },
    { name: 'Intelligent Spaced Repetition (SRS)', free: 'Basic flashcards', pro: 'Smart SM-2 Memory Optimizer' },
    { name: 'Offline Mode & Downloadable PDFs', free: 'No', pro: 'Full Offline Access' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md animate-fade-in"
        onClick={() => setUpgradeModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up">
        {/* Banner Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-brand-600 via-rose-600 to-indigo-700 text-white">
          <button
            onClick={() => setUpgradeModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-3">
            <Crown size={14} className="text-amber-300" /> JLPT Master Pro Pass
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Accelerate Your Japanese Fluency
          </h2>
          <p className="text-sm text-rose-100 mt-1 max-w-lg">
            Systematic exam preparation for JLPT N5 through N1 with personalized AI tutoring.
          </p>

          {/* Billing Switcher */}
          <div className="mt-6 inline-flex p-1 bg-black/25 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              Monthly ($8.99/mo)
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>Yearly ($4.99/mo)</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[10px]">SAVE 45%</span>
            </button>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[50vh] overflow-y-auto">
          <div className="space-y-3">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs"
              >
                <span className="font-semibold text-slate-900 dark:text-white">{f.name}</span>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-slate-400 hidden sm:inline">{f.free}</span>
                  <span className="font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                    <Check size={14} className="text-emerald-500" /> {f.pro}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Cancel anytime. 7-day money-back guarantee.</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {billingCycle === 'yearly' ? '$59.88 / year (Billed annually)' : '$8.99 / month'}
            </div>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-rose-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            {profile.isPremium ? 'Plan Active (Pro)' : 'Upgrade to Pro Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, Crown, Check, ArrowRight, Shield, Zap } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useApp } from '../../context/AppContext';
import { SubscriptionPlan } from '../../types/monetization';

interface UpgradePromptProps {
  feature?: string;
  triggerFeature?: string;
  requiredPlan?: 'PRO' | 'PREMIUM';
  title?: string;
  description?: string;
  subtitle?: string;
  benefits?: string[];
  compact?: boolean;
  className?: string;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  feature,
  triggerFeature,
  requiredPlan = 'PRO',
  title,
  description,
  subtitle,
  benefits,
  compact = false,
  className = '',
}) => {
  const activeFeature = triggerFeature || feature || 'general';
  const { entitlements, isGuest } = useUser();
  const { setUpgradeModalOpen, setAuthModalOpen } = useApp();

  // If user is Admin or meets/exceeds required plan, do not render prompt
  if (entitlements.accountType === 'ADMIN') return null;
  const userPlan = entitlements.subscriptionPlan;
  if (userPlan === 'PREMIUM') return null;
  if (userPlan === 'PRO' && requiredPlan === 'PRO') return null;

  const defaultTitles: Record<string, string> = {
    speaking: 'Accelerate Your Japanese Speaking Confidence',
    advanced_mock_tests: 'Full Official JLPT Scaled Mock Exams',
    full_grammar: 'Complete N5–N1 Grammar Pattern Catalog',
    learning_path: 'Advanced Adaptive Learning Path & Weakness Analysis',
    business_japanese: 'Business Japanese & Keigo Communication Mastery',
    analytics: 'Deep Learning Science & Error Pattern Analytics',
  };

  const defaultDescriptions: Record<string, string> = {
    speaking: 'Practice with native voice recognition, feedback, and natural phrasing.',
    advanced_mock_tests: 'Simulate the authentic JLPT exam with full timing, scoring, and explanations.',
    full_grammar: 'Access in-depth nuanced explanations, collocations, and comparison charts.',
    learning_path: 'Personalized curriculum sequencing powered by active learning science.',
    business_japanese: 'Master email etiquette, formal meetings, and office communication.',
    analytics: 'Identify your retention curve and eliminate persistent grammar mistakes.',
  };

  const defaultBenefits: Record<string, string[]> = {
    speaking: [
      'Higher daily speaking practice allowance',
      'AI pronunciation and grammar correction',
      'Authentic conversational scenarios',
    ],
    advanced_mock_tests: [
      'Full-length JLPT N5–N1 mock test collection',
      'Official scaled sectional scoring',
      'In-depth error review and explanations',
    ],
    full_grammar: [
      'Complete N5 through N1 grammar rules',
      'Side-by-side nuance comparisons',
      'Authentic sentence examples with audio',
    ],
    business_japanese: [
      'Workplace etiquette & business conversations',
      'Sonkeigo, Kenjougo & Teineigo mastery',
      'Certificate of Business Japanese completion',
    ],
  };

  const effectiveTitle = title || defaultTitles[activeFeature] || 'Unlock Next-Level Learning';
  const effectiveDescription =
    subtitle || description || defaultDescriptions[activeFeature] || 'This feature is part of our comprehensive JLPT preparation package.';
  const effectiveBenefits =
    benefits || defaultBenefits[activeFeature] || [
      '100% curriculum coverage from N5 to N1',
      'Zero ads for distraction-free study',
      'Advanced active learning recommendations',
    ];

  const handleAction = () => {
    if (isGuest) {
      setAuthModalOpen(true);
    } else {
      setUpgradeModalOpen(true);
    }
  };

  if (compact) {
    return (
      <div className={`p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/30 flex items-center justify-between gap-4 text-xs ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
            <Crown size={16} />
          </div>
          <div>
            <p className="font-bold text-white">{effectiveTitle}</p>
            <p className="text-slate-400">{effectiveDescription}</p>
          </div>
        </div>

        <button
          onClick={handleAction}
          className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shrink-0 transition-all flex items-center gap-1 shadow-sm"
        >
          <span>{isGuest ? 'Sign Up Free' : `Unlock with ${requiredPlan}`}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 border border-purple-500/30 text-white shadow-xl space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider">
          <Crown size={14} className="text-amber-300" />
          {requiredPlan === 'PREMIUM' ? 'PREMIUM Feature' : 'PRO Feature'}
        </div>
        <span className="text-[11px] text-slate-400">Cancel anytime • 7-day money-back guarantee</span>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-black">{effectiveTitle}</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{effectiveDescription}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
        {effectiveBenefits.map((b, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2"
          >
            <Check size={14} className="text-emerald-400 shrink-0" />
            <span className="text-slate-200">{b}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={handleAction}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles size={16} />
          <span>{isGuest ? 'Create Free Account to Save Progress' : `Upgrade to ${requiredPlan}`}</span>
          <ArrowRight size={16} />
        </button>

        <span className="text-[11px] text-slate-400">
          {isGuest
            ? 'Free accounts keep permanent streaks and study history.'
            : requiredPlan === 'PRO'
            ? 'Starting at $7.99/mo. Includes complete JLPT curriculum.'
            : 'Complete Japanese mastery with Business Japanese.'}
        </span>
      </div>
    </div>
  );
};

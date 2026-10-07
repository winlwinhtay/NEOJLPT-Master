import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useApp } from '../../context/AppContext';
import { AdService } from '../../services/adService';
import { Sparkles, Shield } from 'lucide-react';

interface AdBannerProps {
  placement?: 'lesson_footer' | 'practice_summary' | 'dashboard' | 'sidebar';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  placement = 'lesson_footer',
  className = '',
}) => {
  const { entitlements } = useUser();
  const { setUpgradeModalOpen } = useApp();

  // PRO, PREMIUM, GIFT, and ADMIN are strictly AD-FREE
  if (!entitlements.adsEnabled) {
    return null;
  }

  useEffect(() => {
    AdService.recordAdImpression('banner');
  }, []);

  return (
    <div
      className={`relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-4 text-center overflow-hidden transition-all ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
        <span>Sponsored Advertisement</span>
        <button
          onClick={() => setUpgradeModalOpen(true)}
          className="text-brand-500 hover:text-brand-600 hover:underline flex items-center gap-1 font-semibold"
        >
          <Sparkles size={11} />
          <span>Remove Ads with PRO</span>
        </button>
      </div>

      {/* Compliant Banner Content Display Container */}
      <div className="py-4 px-2 rounded-xl bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center space-y-1.5 min-h-[90px]">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Shield size={14} className="text-brand-500" />
          <span>Official JLPT Japanese Learning Partner</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm">
          Access specialized grammar books, mock test workbooks, and university exchange programs.
        </p>
        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium">
          AdSense Partner Network
        </span>
      </div>
    </div>
  );
};

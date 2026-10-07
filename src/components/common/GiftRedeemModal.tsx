import React, { useState } from 'react';
import { X, Gift, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { EntitlementService } from '../../services/entitlementService';
import confetti from 'canvas-confetti';

interface GiftRedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftRedeemModal: React.FC<GiftRedeemModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useUser();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{
    plan?: string;
    durationDays?: number;
    expiresAt?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter a gift code.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await EntitlementService.redeemGiftCode(profile.id, code.trim());
      if (res.success) {
        setSuccessResult({
          plan: res.plan,
          durationDays: res.durationDays,
          expiresAt: res.expiresAt,
        });
        updateProfile({ isPremium: true });

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {}
      } else {
        setError(res.error || 'Invalid or expired gift code.');
      }
    } catch (err: any) {
      setError(err.message || 'Error redeeming code. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCode('');
    setError(null);
    setSuccessResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up">
        {/* Banner */}
        <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
            <Gift size={14} className="text-amber-300" /> Gift Pass
          </div>
          <h3 className="text-xl sm:text-2xl font-black">Redeem Gift Subscription</h3>
          <p className="text-xs text-indigo-100 mt-1">
            Enter your promotional or gift voucher code to unlock ad-free learning.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 border border-rose-200 dark:border-rose-900/50">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {successResult ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-base">
                  🎉 {successResult.plan} Pass Activated!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Enjoy {successResult.durationDays} days of complete ad-free JLPT study.
                </p>
                {successResult.expiresAt && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Valid until: {new Date(successResult.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Start Learning Now
              </button>
            </div>
          ) : (
            <form onSubmit={handleRedeem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Voucher / Gift Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. JLPT-PRO-30D-WELCOME"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm tracking-wider outline-none focus:border-purple-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <p>• Gift codes instantly grant full PRO or PREMIUM entitlements.</p>
                <p>• When expired, your account safely returns to FREE without losing progress.</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Validating Code...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Redeem Code</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

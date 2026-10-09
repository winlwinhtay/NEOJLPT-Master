import React, { useState, useEffect } from 'react';
import {
  Gift,
  Plus,
  Copy,
  CheckCircle2,
  AlertCircle,
  Download,
  Filter,
  Sparkles,
  Crown,
  Search,
  RefreshCw,
  Power,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';
import { AdminService, AdminGiftCodeItem } from '../../services/adminService';

export const AdminGiftCodesPanel: React.FC = () => {
  const [giftCodes, setGiftCodes] = useState<AdminGiftCodeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filter
  const [filterPlan, setFilterPlan] = useState('ALL');
  const [filterActive, setFilterActive] = useState('ALL');
  const [search, setSearch] = useState('');

  // Generator Form State
  const [plan, setPlan] = useState<'PRO' | 'PREMIUM'>('PRO');
  const [durationDays, setDurationDays] = useState(30);
  const [maxRedemptions, setMaxRedemptions] = useState(1);
  const [prefix, setPrefix] = useState('JLPT');
  const [batchCount, setBatchCount] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [allowedEmail, setAllowedEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string[] | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchGiftCodes = async () => {
    setLoading(true);
    try {
      const res = await AdminService.getGiftCodes({
        page,
        limit: 15,
        plan: filterPlan,
        status: filterActive,
        search,
      });
      setGiftCodes(res.giftCodes);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.warn('Failed to load gift codes:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGiftCodes();
  }, [page, filterPlan, filterActive]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setErrorMessage(null);
    setGeneratedResult(null);

    try {
      const res = await AdminService.generateGiftCodes({
        plan,
        durationDays,
        maxRedemptions,
        prefix: prefix.trim() || 'JLPT',
        quantity: batchCount,
        campaignName: campaignName.trim() || undefined,
        allowedEmail: allowedEmail.trim() || undefined,
        notes: notes.trim() || undefined,
      });

      if (res.success && res.codes) {
        setGeneratedResult(res.codes);
        fetchGiftCodes();
      } else {
        setErrorMessage(res.error || 'Failed to generate codes.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleCode = async (id: string, currentActive: boolean) => {
    const res = await AdminService.toggleGiftCodeStatus(id, !currentActive);
    if (res.success) {
      fetchGiftCodes();
    } else {
      alert(res.error || 'Failed to toggle gift code status.');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(text);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleCopyAllGenerated = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult.join('\n'));
    setCopyFeedback('all_generated');
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleExportCSV = () => {
    if (giftCodes.length === 0) return;
    const headers = ['Code', 'Plan', 'DurationDays', 'MaxRedemptions', 'TimesRedeemed', 'Active', 'Campaign', 'AllowedEmail', 'CreatedAt'];
    const rows = giftCodes.map((c) => [
      c.code,
      c.plan,
      c.duration_days,
      c.max_redemptions,
      c.times_redeemed,
      c.is_active ? 'YES' : 'NO',
      `"${c.campaign_name || ''}"`,
      `"${c.allowed_email || ''}"`,
      c.created_at,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jlpt-gift-codes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Gift className="text-purple-500" size={22} />
            <span>Cryptographic Gift Code Generator & Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Issue cryptographically secure PRO / PREMIUM passes with atomic concurrency protection.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Generator Studio Form */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-slate-900/40 border border-indigo-500/20 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-amber-400" size={18} />
          <h3 className="font-black text-slate-900 dark:text-white text-sm">
            Generate New Promotional / Scholarship Vouchers
          </h3>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 border border-rose-200">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Plan Selection */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Plan Granted *
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setPlan('PRO')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
                  plan === 'PRO'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Sparkles size={12} />
                <span>PRO</span>
              </button>
              <button
                type="button"
                onClick={() => setPlan('PREMIUM')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
                  plan === 'PREMIUM'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Crown size={12} />
                <span>PREMIUM</span>
              </button>
            </div>
          </div>

          {/* Duration Days */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Validity Duration *
            </label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
            >
              <option value={7}>7 Days (1 Week Trial)</option>
              <option value={14}>14 Days (2 Weeks)</option>
              <option value={30}>30 Days (1 Month)</option>
              <option value={90}>90 Days (3 Months)</option>
              <option value={180}>180 Days (6 Months)</option>
              <option value={365}>365 Days (1 Full Year)</option>
            </select>
          </div>

          {/* Max Redemptions */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Max Redemptions *
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={maxRedemptions}
              onChange={(e) => setMaxRedemptions(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
            />
          </div>

          {/* Batch Count */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Generate Quantity *
            </label>
            <select
              value={batchCount}
              onChange={(e) => setBatchCount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white outline-none focus:border-brand-500"
            >
              <option value={1}>1 Single Code</option>
              <option value={5}>5 Codes Batch</option>
              <option value={10}>10 Codes Batch</option>
              <option value={25}>25 Codes Batch</option>
              <option value={50}>50 Codes Batch</option>
            </select>
          </div>

          {/* Code Prefix */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Code Prefix
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value.toUpperCase())}
              placeholder="e.g. JLPT or PROMO"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500"
            />
          </div>

          {/* Campaign Name */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Campaign Tag (Optional)
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. Summer2026_Scholarship"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-brand-500"
            />
          </div>

          {/* Allowed Email (Restriction) */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Restrict to Email (Optional)
            </label>
            <input
              type="email"
              value={allowedEmail}
              onChange={(e) => setAllowedEmail(e.target.value)}
              placeholder="e.g. student@gmail.com"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-brand-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={generating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles size={14} />
              <span>{generating ? 'Generating Cryptographic Codes...' : `Generate ${batchCount} Code${batchCount > 1 ? 's' : ''}`}</span>
            </button>
          </div>
        </form>

        {/* Generated Result Display */}
        {generatedResult && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 size={16} />
                Successfully Created {generatedResult.length} Gift Code(s)
              </span>
              <button
                type="button"
                onClick={handleCopyAllGenerated}
                className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-1"
              >
                <Copy size={12} />
                <span>{copyFeedback === 'all_generated' ? 'Copied All!' : 'Copy All'}</span>
              </button>
            </div>
            <div className="max-h-32 overflow-y-auto font-mono text-xs text-emerald-900 dark:text-emerald-200 space-y-1 bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg">
              {generatedResult.map((c) => (
                <div key={c} className="flex items-center justify-between py-0.5">
                  <span>{c}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(c)}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-sans font-bold"
                  >
                    {copyFeedback === c ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gift Codes Table Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-400">Plan:</span>
          <select
            value={filterPlan}
            onChange={(e) => {
              setFilterPlan(e.target.value);
              setPage(1);
            }}
            className="bg-transparent font-bold outline-none cursor-pointer"
          >
            <option value="ALL">All Plans</option>
            <option value="PRO">PRO</option>
            <option value="PREMIUM">PREMIUM</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-400">Status:</span>
          <select
            value={filterActive}
            onChange={(e) => {
              setFilterActive(e.target.value);
              setPage(1);
            }}
            className="bg-transparent font-bold outline-none cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        <button
          onClick={fetchGiftCodes}
          className="ml-auto p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          title="Refresh gift codes"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Gift Codes Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Gift Code</th>
                <th className="py-3 px-4">Plan & Validity</th>
                <th className="py-3 px-4">Redemptions</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Campaign / Restricted To</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Toggle Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    Loading gift codes...
                  </td>
                </tr>
              ) : giftCodes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    No gift codes created yet. Generate one above!
                  </td>
                </tr>
              ) : (
                giftCodes.map((code) => {
                  const isFullyRedeemed = code.times_redeemed >= code.max_redemptions;
                  return (
                    <tr
                      key={code.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                            {code.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(code.code)}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            title="Copy code"
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              code.plan === 'PREMIUM'
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                            }`}
                          >
                            {code.plan}
                          </span>
                          <span className="text-slate-500 font-medium">
                            {code.duration_days} days
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            isFullyRedeemed ? 'text-slate-400' : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {code.times_redeemed} / {code.max_redemptions}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            code.is_active && !isFullyRedeemed
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              code.is_active && !isFullyRedeemed ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                          <span>
                            {isFullyRedeemed ? 'REDEEMED' : code.is_active ? 'ACTIVE' : 'DISABLED'}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-600 dark:text-slate-300">
                          {code.campaign_name || 'General'}
                        </div>
                        {code.allowed_email && (
                          <div className="text-[10px] font-mono text-indigo-500">
                            Lock: {code.allowed_email}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(code.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleCode(code.id, code.is_active)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            code.is_active
                              ? 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600'
                              : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600'
                          }`}
                        >
                          {code.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <span className="text-xs text-slate-500">
            Page {page} of {Math.max(totalPages, 1)} ({total} gift codes)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

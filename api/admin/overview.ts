import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_utils/auth';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const supabase = getSupabaseAdmin();

    // 1. Try calling the stored procedure first
    const { data: rpcData, error: rpcError } = await supabase.rpc('get_admin_dashboard_stats');
    if (!rpcError && rpcData) {
      return res.status(200).json(rpcData);
    }

    // 2. Fallback query direct tables if RPC is not yet created
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const [
      profilesRes,
      subscriptionsRes,
      apiLogsRes,
      paymentRes,
      giftCodesRes,
    ] = await Promise.all([
      supabase.from('profiles').select('id, created_at, last_active_date, account_type, role, is_premium'),
      supabase.from('subscriptions').select('id, user_id, plan, status, subscription_source, current_period_end'),
      supabase.from('api_usage_logs').select('id, created_at, cache_hit, total_tokens, input_tokens, output_tokens, estimated_cost, status'),
      supabase.from('payment_transactions').select('id, amount, payment_status, is_refunded'),
      supabase.from('gift_codes').select('id, times_redeemed, max_redemptions'),
    ]);

    const profiles = profilesRes.data || [];
    const subs = subscriptionsRes.data || [];
    const apiLogs = apiLogsRes.data || [];
    const payments = paymentRes.data || [];

    // Calculate User metrics
    const totalUsers = profiles.length;
    const registeredToday = profiles.filter((p) => p.created_at >= todayStart).length;
    const registeredThisWeek = profiles.filter((p) => p.created_at >= sevenDaysAgo).length;
    const registeredThisMonth = profiles.filter((p) => p.created_at >= thirtyDaysAgo).length;
    const freeUsers = profiles.filter((p) => (p.account_type === 'FREE' || !p.account_type) && !p.is_premium).length;
    const proUsers = profiles.filter((p) => p.account_type === 'PRO').length;
    const premiumUsers = profiles.filter((p) => p.account_type === 'PREMIUM' || p.role === 'admin').length;

    // Subscriptions
    const activePaid = subs.filter((s) => s.status === 'active' && s.current_period_end > now.toISOString() && s.subscription_source !== 'gift').length;
    const activeGift = subs.filter((s) => s.status === 'active' && s.current_period_end > now.toISOString() && s.subscription_source === 'gift').length;
    const expiringSoon7d = subs.filter((s) => s.status === 'active' && s.current_period_end > now.toISOString() && s.current_period_end <= in7Days).length;
    const expiringSoon30d = subs.filter((s) => s.status === 'active' && s.current_period_end > now.toISOString() && s.current_period_end <= in30Days).length;
    const expiredSubs = subs.filter((s) => s.status === 'expired' || s.current_period_end <= now.toISOString()).length;

    // API & Gemini
    const totalCalls = apiLogs.length;
    const callsToday = apiLogs.filter((l) => l.created_at >= todayStart).length;
    const callsThisMonth = apiLogs.filter((l) => l.created_at >= thirtyDaysAgo).length;
    const cacheHits = apiLogs.filter((l) => l.cache_hit).length;
    const cacheHitRate = totalCalls > 0 ? Number(((cacheHits / totalCalls) * 100).toFixed(1)) : 0.0;
    const totalTokens = apiLogs.reduce((acc, l) => acc + (Number(l.total_tokens) || 0), 0);
    const inputTokens = apiLogs.reduce((acc, l) => acc + (Number(l.input_tokens) || 0), 0);
    const outputTokens = apiLogs.reduce((acc, l) => acc + (Number(l.output_tokens) || 0), 0);
    const estimatedCost = Number(apiLogs.reduce((acc, l) => acc + (Number(l.estimated_cost) || 0), 0).toFixed(4));
    const errors = apiLogs.filter((l) => l.status === 'error').length;

    // Revenue
    const totalRevenue = Number(payments.filter((p) => p.payment_status === 'succeeded').reduce((acc, p) => acc + (Number(p.amount) || 0), 0).toFixed(2));
    const successfulPayments = payments.filter((p) => p.payment_status === 'succeeded').length;
    const failedPayments = payments.filter((p) => p.payment_status === 'failed').length;
    const refunds = payments.filter((p) => p.payment_status === 'refunded' || p.is_refunded).length;

    return res.status(200).json({
      users: {
        total: totalUsers,
        registeredToday,
        registeredThisWeek,
        registeredThisMonth,
        activeToday: registeredToday,
        activeLast7d: registeredThisWeek,
        activeLast30d: registeredThisMonth,
        free: freeUsers,
        pro: proUsers,
        premium: premiumUsers,
        giftActive: activeGift,
        expiredSubs,
        expiringSoon7d,
        expiringSoon30d,
      },
      subscriptions: {
        activePaid,
        activeGift,
        expiring7d: expiringSoon7d,
        expiring30d: expiringSoon30d,
        expired: expiredSubs,
      },
      apiUsage: {
        totalCalls,
        callsToday,
        callsThisMonth,
        cacheHits,
        cacheHitRate,
        totalTokens,
        inputTokens,
        outputTokens,
        estimatedCost,
        errors,
      },
      revenue: {
        totalRevenue,
        successfulPayments,
        failedPayments,
        refunds,
      },
    });
  } catch (error: any) {
    console.error('admin overview error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to fetch overview metrics' });
  }
}

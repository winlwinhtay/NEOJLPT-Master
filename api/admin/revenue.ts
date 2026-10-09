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
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '25', 10)));
    const plan = (req.query.plan as string) || '';
    const status = (req.query.status as string) || '';

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('payment_transactions')
      .select(
        `
        id,
        user_id,
        subscription_id,
        plan,
        amount,
        currency,
        payment_status,
        payment_provider,
        provider_tx_id,
        customer_email,
        is_refunded,
        created_at,
        profiles:user_id (
          email,
          name
        )
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(from, to);

    if (plan && plan !== 'ALL') query = query.eq('plan', plan);
    if (status && status !== 'ALL') query = query.eq('payment_status', status);

    const { data: txs, count, error } = await query;
    if (error) throw error;

    // Aggregate overall metrics
    const { data: allTxs } = await supabase.from('payment_transactions').select('amount, payment_status, is_refunded');
    const records = allTxs || [];

    const totalRevenue = records
      .filter((r) => r.payment_status === 'succeeded' && !r.is_refunded)
      .reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
    const successfulCount = records.filter((r) => r.payment_status === 'succeeded').length;
    const failedCount = records.filter((r) => r.payment_status === 'failed').length;
    const refundedCount = records.filter((r) => r.payment_status === 'refunded' || r.is_refunded).length;

    return res.status(200).json({
      summary: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        successfulCount,
        failedCount,
        refundedCount,
      },
      transactions: txs || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    console.error('admin revenue error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to fetch revenue records' });
  }
}

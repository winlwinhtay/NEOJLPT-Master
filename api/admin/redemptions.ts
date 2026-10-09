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
    const search = ((req.query.search as string) || '').trim();

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('gift_code_redemptions')
      .select(
        `
        id,
        gift_code_id,
        user_id,
        redeemed_at,
        plan,
        duration_days,
        subscription_id,
        gift_codes:gift_code_id (
          code,
          campaign_name,
          created_by
        ),
        profiles:user_id (
          email,
          name
        )
      `,
        { count: 'exact' }
      )
      .order('redeemed_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    return res.status(200).json({
      redemptions: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    console.error('admin redemptions error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to list redemptions' });
  }
}

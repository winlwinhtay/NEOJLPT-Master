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
    const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '30', 10)));
    const actionFilter = (req.query.action as string) || '';

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('admin_audit_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (actionFilter && actionFilter !== 'ALL') {
      query = query.eq('action', actionFilter);
    }

    const { data, count, error } = await query;
    if (error) throw error;

    return res.status(200).json({
      auditLogs: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    console.error('admin audit logs error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to list audit logs' });
  }
}

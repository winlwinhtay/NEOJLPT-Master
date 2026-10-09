import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_utils/auth';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';
import { recordAuditLog } from '../_utils/audit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const supabase = getSupabaseAdmin();

  // ----------------------------------------------------------
  // GET: List Subscriptions with filters & pagination
  // ----------------------------------------------------------
  if (req.method === 'GET') {
    try {
      const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
      const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '20', 10)));
      const plan = (req.query.plan as string) || '';
      const status = (req.query.status as string) || '';
      const source = (req.query.source as string) || '';
      const expiringInDays = parseInt((req.query.expiringInDays as string) || '', 10);

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from('subscriptions')
        .select(
          `
          id,
          user_id,
          plan,
          status,
          billing_cycle,
          subscription_source,
          current_period_start,
          current_period_end,
          cancel_at_period_end,
          transaction_reference,
          notes,
          created_at,
          profiles:user_id (
            email,
            name
          )
        `,
          { count: 'exact' }
        )
        .order('current_period_end', { ascending: false })
        .range(from, to);

      if (plan && plan !== 'ALL') {
        query = query.eq('plan', plan);
      }
      if (status && status !== 'ALL') {
        query = query.eq('status', status);
      }
      if (source && source !== 'ALL') {
        query = query.eq('subscription_source', source);
      }

      if (!isNaN(expiringInDays) && expiringInDays > 0) {
        const now = new Date().toISOString();
        const targetDate = new Date(Date.now() + expiringInDays * 24 * 60 * 60 * 1000).toISOString();
        query = query.eq('status', 'active').gte('current_period_end', now).lte('current_period_end', targetDate);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      return res.status(200).json({
        subscriptions: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      });
    } catch (error: any) {
      console.error('admin subscriptions error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to list subscriptions' });
    }
  }

  // ----------------------------------------------------------
  // POST: Subscriptions actions (extend, cancel, revoke)
  // ----------------------------------------------------------
  if (req.method === 'POST') {
    const { action, subscriptionId, userId, payload, reason } = req.body || {};

    if (!action || !subscriptionId) {
      return res.status(400).json({ error: 'Missing action or subscriptionId' });
    }

    try {
      const now = new Date().toISOString();

      if (action === 'extend') {
        const days = parseInt(payload?.days || '30', 10);
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('id', subscriptionId)
          .single();

        if (!sub) return res.status(404).json({ error: 'Subscription not found' });

        const baseDate = new Date(sub.current_period_end) > new Date() ? new Date(sub.current_period_end) : new Date();
        const newEnd = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

        await supabase
          .from('subscriptions')
          .update({
            current_period_end: newEnd,
            status: 'active',
            updated_at: now,
            notes: `${sub.notes || ''} [Extended ${days}d by admin: ${reason || 'Manual extension'}]`,
          })
          .eq('id', subscriptionId);

        // Keep profile in sync
        if (sub.user_id) {
          await supabase
            .from('profiles')
            .update({ is_premium: true, account_type: sub.plan, updated_at: now })
            .eq('id', sub.user_id);
        }

        await recordAuditLog({
          adminUserId: admin.userId,
          adminEmail: admin.email,
          action: 'subscription_extended_direct',
          targetType: 'subscription',
          targetId: subscriptionId,
          details: { days, newEnd, reason, userId: sub.user_id },
          status: 'success',
        });

        return res.status(200).json({ success: true, message: `Extended until ${newEnd}` });
      }

      if (action === 'cancel' || action === 'revoke') {
        const newStatus = action === 'cancel' ? 'canceled' : 'revoked';
        await supabase
          .from('subscriptions')
          .update({
            status: newStatus,
            updated_at: now,
            notes: `Status changed to ${newStatus} by admin: ${reason || 'Admin action'}`,
          })
          .eq('id', subscriptionId);

        if (userId) {
          await supabase
            .from('profiles')
            .update({ is_premium: false, account_type: 'FREE', updated_at: now })
            .eq('id', userId);
        }

        await recordAuditLog({
          adminUserId: admin.userId,
          adminEmail: admin.email,
          action: `subscription_${newStatus}`,
          targetType: 'subscription',
          targetId: subscriptionId,
          details: { userId, reason },
          status: 'success',
        });

        return res.status(200).json({ success: true, message: `Subscription marked as ${newStatus}` });
      }

      return res.status(400).json({ error: `Unsupported action: ${action}` });
    } catch (error: any) {
      console.error('admin subscription action error:', error);
      return res.status(500).json({ error: error?.message || 'Operation failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_utils/auth';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';
import { recordAuditLog } from '../_utils/audit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const supabase = getSupabaseAdmin();

  // ----------------------------------------------------------
  // GET: List users with search, filtering & pagination
  // ----------------------------------------------------------
  if (req.method === 'GET') {
    try {
      const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
      const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '20', 10)));
      const search = ((req.query.search as string) || '').trim();
      const planFilter = (req.query.plan as string) || '';
      const statusFilter = (req.query.status as string) || '';

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from('profiles')
        .select(
          `
          id,
          email,
          name,
          account_type,
          role,
          is_premium,
          target_level,
          current_level,
          streak_days,
          xp,
          level,
          last_active_date,
          created_at,
          subscriptions (
            id,
            plan,
            status,
            subscription_source,
            current_period_start,
            current_period_end
          )
        `,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range(from, to);

      if (search) {
        query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%,id.eq.${search}`);
      }

      if (planFilter && planFilter !== 'ALL') {
        query = query.eq('account_type', planFilter);
      }

      const { data, count, error } = await query;

      if (error) throw error;

      const users = (data || []).map((u: any) => {
        const activeSub = (u.subscriptions || []).find(
          (s: any) => s.status === 'active' && new Date(s.current_period_end) > new Date()
        );
        return {
          id: u.id,
          email: u.email || 'N/A',
          name: u.name || 'Anonymous',
          accountType: u.account_type || (u.is_premium ? 'PREMIUM' : 'FREE'),
          role: u.role || 'user',
          isPremium: Boolean(u.is_premium),
          targetLevel: u.target_level || 'N5',
          streakDays: u.streak_days || 0,
          xp: u.xp || 0,
          level: u.level || 1,
          lastActiveDate: u.last_active_date,
          createdAt: u.created_at,
          activeSubscription: activeSub || null,
        };
      });

      return res.status(200).json({
        users,
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      });
    } catch (error: any) {
      console.error('admin users list error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to list users' });
    }
  }

  // ----------------------------------------------------------
  // POST: Execute Administrative User Action
  // ----------------------------------------------------------
  if (req.method === 'POST') {
    const { action, targetUserId, targetUserEmail, payload, reason } = req.body || {};

    if (!action || !targetUserId) {
      return res.status(400).json({ error: 'Missing action or targetUserId parameter' });
    }

    try {
      const now = new Date().toISOString();

      if (action === 'change_plan') {
        const newPlan = payload?.plan; // 'FREE' | 'PRO' | 'PREMIUM'
        if (!['FREE', 'PRO', 'PREMIUM'].includes(newPlan)) {
          return res.status(400).json({ error: 'Invalid plan selected' });
        }

        const isPrem = newPlan === 'PRO' || newPlan === 'PREMIUM';

        await supabase
          .from('profiles')
          .update({
            account_type: newPlan,
            is_premium: isPrem,
            updated_at: now,
          })
          .eq('id', targetUserId);

        // Update active subscription if moving to PRO/PREMIUM
        if (isPrem) {
          const durationDays = payload?.durationDays || 30;
          const endDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

          await supabase.from('subscriptions').insert({
            user_id: targetUserId,
            plan: newPlan,
            status: 'active',
            billing_cycle: 'monthly',
            subscription_source: 'admin_promo',
            current_period_start: now,
            current_period_end: endDate,
            notes: reason || 'Admin plan change',
          });
        }

        await recordAuditLog({
          adminUserId: admin.userId,
          adminEmail: admin.email,
          action: 'user_plan_changed',
          targetType: 'user',
          targetId: targetUserId,
          details: { targetEmail: targetUserEmail, newPlan, reason },
          status: 'success',
        });

        return res.status(200).json({ success: true, message: `User updated to ${newPlan}` });
      }

      if (action === 'extend_subscription') {
        const extensionDays = parseInt(payload?.extensionDays || '30', 10);
        if (isNaN(extensionDays) || extensionDays <= 0) {
          return res.status(400).json({ error: 'Extension days must be a positive number' });
        }

        // Find existing subscription or create one
        const { data: activeSub } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', targetUserId)
          .eq('status', 'active')
          .order('current_period_end', { ascending: false })
          .limit(1)
          .maybeSingle();

        let newEndDate: Date;
        if (activeSub && new Date(activeSub.current_period_end) > new Date()) {
          newEndDate = new Date(
            new Date(activeSub.current_period_end).getTime() + extensionDays * 24 * 60 * 60 * 1000
          );
          await supabase
            .from('subscriptions')
            .update({
              current_period_end: newEndDate.toISOString(),
              updated_at: now,
              notes: `${activeSub.notes || ''} [Extended ${extensionDays}d by admin: ${reason || 'Manual extension'}]`,
            })
            .eq('id', activeSub.id);
        } else {
          newEndDate = new Date(Date.now() + extensionDays * 24 * 60 * 60 * 1000);
          await supabase.from('subscriptions').insert({
            user_id: targetUserId,
            plan: payload?.plan || 'PRO',
            status: 'active',
            billing_cycle: 'monthly',
            subscription_source: 'admin_promo',
            current_period_start: now,
            current_period_end: newEndDate.toISOString(),
            notes: reason || 'Admin subscription extension',
          });

          await supabase
            .from('profiles')
            .update({
              is_premium: true,
              account_type: payload?.plan || 'PRO',
              updated_at: now,
            })
            .eq('id', targetUserId);
        }

        await recordAuditLog({
          adminUserId: admin.userId,
          adminEmail: admin.email,
          action: 'subscription_extended',
          targetType: 'user',
          targetId: targetUserId,
          details: { extensionDays, newEndDate: newEndDate.toISOString(), reason },
          status: 'success',
        });

        return res.status(200).json({
          success: true,
          message: `Subscription extended by ${extensionDays} days until ${newEndDate.toISOString()}`,
        });
      }

      if (action === 'revoke_grant') {
        // Expire active subscriptions
        await supabase
          .from('subscriptions')
          .update({
            status: 'revoked',
            updated_at: now,
            notes: `Revoked by admin: ${reason || 'Administrative action'}`,
          })
          .eq('user_id', targetUserId)
          .eq('status', 'active');

        // Reset profile
        await supabase
          .from('profiles')
          .update({
            account_type: 'FREE',
            is_premium: false,
            updated_at: now,
          })
          .eq('id', targetUserId);

        await recordAuditLog({
          adminUserId: admin.userId,
          adminEmail: admin.email,
          action: 'subscription_revoked',
          targetType: 'user',
          targetId: targetUserId,
          details: { targetEmail: targetUserEmail, reason },
          status: 'success',
        });

        return res.status(200).json({ success: true, message: 'Entitlements revoked and account returned to Free tier.' });
      }

      return res.status(400).json({ error: `Unsupported administrative action: ${action}` });
    } catch (error: any) {
      console.error('admin user action error:', error);
      return res.status(500).json({ error: error?.message || 'Action failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

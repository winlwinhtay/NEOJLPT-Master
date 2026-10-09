import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { requireAdmin } from '../_utils/auth';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';
import { recordAuditLog } from '../_utils/audit';

function generateSecureCode(prefix = 'JLPT'): string {
  // Cryptographically secure random alphanumeric code
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // exclude easily confused chars: 0, 1, I, O
  const randomBytes = crypto.randomBytes(8);
  let randomStr = '';
  for (let i = 0; i < 8; i++) {
    randomStr += chars[randomBytes[i] % chars.length];
  }
  const cleanPrefix = (prefix || 'JLPT').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `${cleanPrefix}-${randomStr.substring(0, 4)}-${randomStr.substring(4, 8)}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const supabase = getSupabaseAdmin();

  // ----------------------------------------------------------
  // GET: List gift codes with filtering & pagination
  // ----------------------------------------------------------
  if (req.method === 'GET') {
    try {
      const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
      const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '25', 10)));
      const search = ((req.query.search as string) || '').trim().toUpperCase();
      const plan = (req.query.plan as string) || '';
      const status = (req.query.status as string) || ''; // 'active' | 'inactive' | 'expired'

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from('gift_codes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (search) {
        query = query.or(`code.ilike.%${search}%,campaign_name.ilike.%${search}%,allowed_email.ilike.%${search}%`);
      }
      if (plan && plan !== 'ALL') {
        query = query.eq('plan', plan);
      }
      if (status === 'active') {
        query = query.eq('is_active', true);
      } else if (status === 'inactive') {
        query = query.eq('is_active', false);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      return res.status(200).json({
        giftCodes: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      });
    } catch (error: any) {
      console.error('admin gift codes error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to list gift codes' });
    }
  }

  // ----------------------------------------------------------
  // POST: Create Single/Batch or Toggle Status
  // ----------------------------------------------------------
  if (req.method === 'POST') {
    const { action, payload } = req.body || {};

    try {
      // 1. Generate Single or Batch Gift Codes
      if (action === 'generate') {
        const {
          plan = 'PRO',
          durationDays = 30,
          maxRedemptions = 1,
          prefix = 'JLPT',
          expiresAt = null,
          allowedEmail = null,
          campaignName = 'General',
          notes = null,
          quantity = 1,
        } = payload || {};

        if (!['PRO', 'PREMIUM'].includes(plan)) {
          return res.status(400).json({ error: 'Plan must be PRO or PREMIUM' });
        }

        const count = Math.min(100, Math.max(1, parseInt(quantity, 10)));
        const duration = Math.max(1, parseInt(durationDays, 10));
        const maxRedeem = Math.max(1, parseInt(maxRedemptions, 10));

        const rowsToInsert = [];
        const generatedCodes = [];

        for (let i = 0; i < count; i++) {
          const code = generateSecureCode(prefix);
          generatedCodes.push(code);
          rowsToInsert.push({
            code,
            plan,
            duration_days: duration,
            max_redemptions: maxRedeem,
            times_redeemed: 0,
            is_active: true,
            expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
            allowed_email: allowedEmail ? allowedEmail.trim().toLowerCase() : null,
            campaign_name: campaignName ? campaignName.trim() : 'General',
            notes: notes || null,
            created_by: admin.email,
          });
        }

        const { data, error } = await supabase.from('gift_codes').insert(rowsToInsert).select();
        if (error) throw error;

        await recordAuditLog({
          adminUserId: admin.userId,
          adminEmail: admin.email,
          action: 'gift_codes_generated',
          targetType: 'gift_code',
          details: {
            plan,
            duration,
            count,
            campaignName,
            allowedEmail,
            generatedCodesCount: generatedCodes.length,
          },
          status: 'success',
        });

        return res.status(200).json({
          success: true,
          message: `Successfully generated ${count} gift code(s).`,
          codes: generatedCodes,
          records: data || [],
        });
      }

      // 2. Toggle Active Status / Revoke Code
      if (action === 'toggle_status') {
        const { codeId, isActive } = payload || {};
        if (!codeId) return res.status(400).json({ error: 'Missing codeId' });

        const { error } = await supabase
          .from('gift_codes')
          .update({ is_active: Boolean(isActive) })
          .eq('id', codeId);

        if (error) throw error;

        await recordAuditLog({
          adminUserId: admin.userId,
          adminEmail: admin.email,
          action: isActive ? 'gift_code_activated' : 'gift_code_deactivated',
          targetType: 'gift_code',
          targetId: codeId,
          status: 'success',
        });

        return res.status(200).json({ success: true, message: `Gift code ${isActive ? 'activated' : 'deactivated'}` });
      }

      return res.status(400).json({ error: `Unsupported action: ${action}` });
    } catch (error: any) {
      console.error('admin gift code operation error:', error);
      return res.status(500).json({ error: error?.message || 'Operation failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

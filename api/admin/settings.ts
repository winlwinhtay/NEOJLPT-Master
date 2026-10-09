import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_utils/auth';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';
import { recordAuditLog } from '../_utils/audit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const supabase = getSupabaseAdmin();

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('monetization_settings')
        .select('*')
        .eq('id', 'global')
        .maybeSingle();

      if (error) throw error;

      return res.status(200).json({
        settings: data || {
          id: 'global',
          guest_daily_lessons: 3,
          guest_daily_practice: 10,
          guest_daily_ai_requests: 3,
          guest_daily_speaking_minutes: 2,
          free_daily_ai_requests: 10,
          free_daily_speaking_minutes: 5,
          pro_daily_ai_requests: 50,
          pro_daily_speaking_minutes: 30,
          premium_daily_ai_requests: 200,
          premium_daily_speaking_minutes: 120,
          pro_monthly_price: 7.99,
          premium_monthly_price: 15.99,
          discount_3_months: 0.05,
          discount_6_months: 0.1,
          discount_12_months: 0.2,
          minimum_interstitial_interval_minutes: 10,
          ads_banner_enabled: true,
          ads_interstitial_enabled: true,
        },
      });
    } catch (error: any) {
      console.error('admin get settings error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to fetch settings' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newSettings = req.body || {};
      const { id, ...cleanSettings } = newSettings;

      const { data, error } = await supabase
        .from('monetization_settings')
        .upsert({
          ...cleanSettings,
          id: 'global',
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      await recordAuditLog({
        adminUserId: admin.userId,
        adminEmail: admin.email,
        action: 'monetization_settings_updated',
        targetType: 'settings',
        targetId: 'global',
        details: cleanSettings,
        status: 'success',
      });

      return res.status(200).json({ success: true, settings: data });
    } catch (error: any) {
      console.error('admin save settings error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to update settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

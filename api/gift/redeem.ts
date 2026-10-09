import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAuthUser } from '../_utils/auth';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authUser = await requireAuthUser(req, res);
  if (!authUser) return;

  const { code } = req.body || {};
  const cleanCode = (code || '').trim().toUpperCase();

  if (!cleanCode) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid gift code.',
      code: 'INVALID_CODE_FORMAT',
    });
  }

  try {
    const supabase = getSupabaseAdmin();

    // Call atomic server-side stored procedure with transaction isolation
    const { data, error } = await supabase.rpc('redeem_gift_code', {
      p_user_id: authUser.userId,
      p_code: cleanCode,
    });

    if (error) {
      console.error('RPC redeem_gift_code error:', error);
      return res.status(400).json({
        success: false,
        error: error.message || 'Gift code could not be redeemed. Please check the code and try again.',
      });
    }

    if (!data?.success) {
      return res.status(400).json({
        success: false,
        error: data?.error || 'Redemption failed. Please try again.',
      });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Gift redemption error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Server error during gift code processing. Please try again later.',
    });
  }
}

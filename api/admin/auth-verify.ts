import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin, AUTHORIZED_ADMIN_EMAIL } from '../_utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  return res.status(200).json({
    authorized: true,
    email: admin.email,
    userId: admin.userId,
    targetAdminEmail: AUTHORIZED_ADMIN_EMAIL,
    verifiedAt: new Date().toISOString(),
  });
}

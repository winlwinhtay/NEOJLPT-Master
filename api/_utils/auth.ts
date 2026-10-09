import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin } from './supabaseAdmin';
import { recordAuditLog } from './audit';

export const AUTHORIZED_ADMIN_EMAIL = 'neowin001@gmail.com';

export interface AuthenticatedAdmin {
  userId: string;
  email: string;
}

/**
 * Validates request authentication and enforces that the caller is exclusively
 * the authorized administrator: neowin001@gmail.com
 *
 * If unauthenticated -> 401 Unauthorized
 * If unauthorized -> 403 Forbidden
 */
export async function requireAdmin(
  req: VercelRequest,
  res: VercelResponse
): Promise<AuthenticatedAdmin | null> {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '';
  const userAgent = (req.headers['user-agent'] as string) || '';

  if (!token) {
    res.status(401).json({
      error: 'Unauthorized: Authentication token is required.',
      code: 'AUTH_REQUIRED',
    });
    return null;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData?.user) {
      res.status(401).json({
        error: 'Unauthorized: Invalid or expired authentication credentials.',
        code: 'INVALID_TOKEN',
      });
      return null;
    }

    const user = authData.user;
    const userEmail = (user.email || '').toLowerCase().trim();

    // STRICT ADMIN VALIDATION: neowin001@gmail.com ONLY
    if (userEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase().trim()) {
      // Record security incident in audit logs
      await recordAuditLog({
        adminUserId: user.id,
        adminEmail: userEmail,
        action: 'unauthorized_admin_access_rejected',
        targetType: 'admin_console',
        targetId: req.url || 'endpoint',
        details: {
          requestedPath: req.url,
          method: req.method,
        },
        ipAddress: clientIp,
        userAgent,
        status: 'failure',
      });

      res.status(403).json({
        error: 'Forbidden: Access is strictly restricted to the authorized administrator.',
        code: 'ADMIN_ACCESS_DENIED',
      });
      return null;
    }

    return {
      userId: user.id,
      email: userEmail,
    };
  } catch (error: any) {
    console.error('requireAdmin error:', error);
    res.status(500).json({
      error: 'Internal authorization error.',
      message: error?.message,
    });
    return null;
  }
}

/**
 * Validates request for any authenticated user (used for gift code redemption, etc.)
 */
export async function requireAuthUser(
  req: VercelRequest,
  res: VercelResponse
): Promise<{ userId: string; email: string } | null> {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token) {
    res.status(401).json({
      error: 'Unauthorized: Sign in required.',
      code: 'AUTH_REQUIRED',
    });
    return null;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData?.user) {
      res.status(401).json({
        error: 'Unauthorized: Invalid authentication session.',
        code: 'INVALID_TOKEN',
      });
      return null;
    }

    return {
      userId: authData.user.id,
      email: (authData.user.email || '').toLowerCase().trim(),
    };
  } catch (error: any) {
    res.status(500).json({
      error: 'Authentication failed.',
      message: error?.message,
    });
    return null;
  }
}

import { getSupabaseAdmin } from './supabaseAdmin';

export interface AuditLogEntry {
  adminUserId: string;
  adminEmail: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  status?: 'success' | 'failure';
}

export async function recordAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from('admin_audit_logs').insert({
      admin_user_id: entry.adminUserId,
      admin_email: entry.adminEmail.toLowerCase().trim(),
      action: entry.action,
      target_type: entry.targetType,
      target_id: entry.targetId || null,
      details: entry.details || {},
      ip_address: entry.ipAddress || null,
      user_agent: entry.userAgent || null,
      status: entry.status || 'success',
    });
  } catch (error) {
    console.error('Failed to write admin audit log:', error);
  }
}

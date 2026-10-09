// ============================================================================
// ADMIN CONSOLE CLIENT SERVICE (管理者コンソール クライアントサービス)
// Communicates with secure /api/admin/ serverless endpoints with Supabase Auth JWT
// Exclusively authorized for: neowin001@gmail.com
// ============================================================================

import { supabase, isSupabaseConfigured } from './supabaseClient';
import { isSuperAdminEmail, ADMIN_EMAILS } from './entitlementService';
import { MonetizationSettings } from '../types/monetization';

export const AUTHORIZED_ADMIN_EMAIL = 'neowin001@gmail.com';

export interface AdminOverviewStats {
  users: {
    total: number;
    registeredToday: number;
    registeredThisWeek: number;
    registeredThisMonth: number;
    activeToday: number;
    activeLast7d: number;
    activeLast30d: number;
    free: number;
    pro: number;
    premium: number;
    giftActive: number;
    expiredSubs: number;
    expiringSoon7d: number;
    expiringSoon30d: number;
  };
  subscriptions: {
    activePaid: number;
    activeGift: number;
    expiring7d: number;
    expiring30d: number;
    expired: number;
  };
  apiUsage: {
    totalCalls: number;
    callsToday: number;
    callsThisMonth: number;
    cacheHits: number;
    cacheHitRate: number;
    totalTokens: number;
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
    errors: number;
  };
  revenue: {
    totalRevenue: number;
    successfulPayments: number;
    failedPayments: number;
    refunds: number;
  };
}

export interface AdminUserItem {
  id: string;
  email: string;
  name: string;
  accountType: 'FREE' | 'PRO' | 'PREMIUM' | 'ADMIN';
  role: string;
  isPremium: boolean;
  targetLevel: string;
  streakDays: number;
  xp: number;
  level: number;
  lastActiveDate?: string;
  createdAt: string;
  activeSubscription?: {
    id: string;
    plan: string;
    status: string;
    subscription_source: string;
    current_period_start: string;
    current_period_end: string;
  } | null;
}

export interface AdminSubscriptionItem {
  id: string;
  user_id: string;
  plan: 'PRO' | 'PREMIUM';
  status: string;
  billing_cycle: string;
  subscription_source: string;
  current_period_start: string;
  current_period_end: string;
  transaction_reference?: string;
  notes?: string;
  created_at: string;
  profiles?: {
    email: string;
    name: string;
  };
}

export interface AdminGiftCodeItem {
  id: string;
  code: string;
  plan: 'PRO' | 'PREMIUM';
  duration_days: number;
  max_redemptions: number;
  times_redeemed: number;
  is_active: boolean;
  expires_at?: string;
  campaign_name?: string;
  allowed_email?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
}

export interface AdminRedemptionItem {
  id: string;
  gift_code_id: string;
  user_id: string;
  redeemed_at: string;
  plan: string;
  duration_days: number;
  subscription_id?: string;
  gift_codes?: {
    code: string;
    campaign_name?: string;
    created_by?: string;
  };
  profiles?: {
    email: string;
    name: string;
  };
}

export interface AdminApiUsageResponse {
  summary: {
    totalCalls: number;
    totalTokens: number;
    totalCost: number;
    totalCacheHits: number;
    cacheHitRate: number;
    totalErrors: number;
  };
  featureBreakdown: Record<
    string,
    { calls: number; tokens: number; cost: number; cacheHits: number; errors: number }
  >;
  logs: Array<{
    id: string;
    user_id?: string;
    feature: string;
    provider: string;
    model: string;
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    estimated_cost: number;
    cache_hit: boolean;
    status: string;
    duration_ms: number;
    created_at: string;
  }>;
  totalLogs: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminRevenueResponse {
  summary: {
    totalRevenue: number;
    successfulCount: number;
    failedCount: number;
    refundedCount: number;
  };
  transactions: Array<{
    id: string;
    user_id: string;
    plan: string;
    amount: number;
    currency: string;
    payment_status: string;
    payment_provider: string;
    provider_tx_id?: string;
    customer_email?: string;
    created_at: string;
    profiles?: {
      email: string;
      name: string;
    };
  }>;
  total: number;
  page: number;
  totalPages: number;
}

export interface AdminAuditLogItem {
  id: string;
  admin_user_id: string;
  admin_email: string;
  action: string;
  target_type: string;
  target_id?: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  status: 'success' | 'failure';
  created_at: string;
}

export interface AdminLearningAnalytics {
  levelDistribution: Record<string, number>;
  totalLearners: number;
  totalLessonsCompleted: number;
  totalPracticeQuestions: number;
  totalSpeakingMinutes: number;
  totalSrsItemsTracked: number;
  srsStages: {
    apprentice: number;
    guru: number;
    master: number;
    enlightened: number;
  };
  dailyTrend: any[];
}

export class AdminService {
  public static readonly ADMIN_EMAIL = AUTHORIZED_ADMIN_EMAIL;

  /**
   * Helper to retrieve Supabase session JWT for server API calls
   */
  private static async getAuthHeaders(): Promise<HeadersInit> {
    if (!isSupabaseConfigured()) {
      return { 'Content-Type': 'application/json' };
    }
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  }

  /**
   * Verify whether the current user is strictly authorized as neowin001@gmail.com
   */
  public static async verifyAdminAccess(currentUserEmail?: string | null): Promise<{
    authorized: boolean;
    email?: string;
    error?: string;
  }> {
    // 1. Client pre-check
    if (!isSuperAdminEmail(currentUserEmail)) {
      return {
        authorized: false,
        error: 'Forbidden: Current account is not authorized as administrator.',
      };
    }

    // 2. Server verification call
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/auth-verify', {
        method: 'GET',
        headers,
      });

      if (res.ok) {
        const data = await res.json();
        return { authorized: Boolean(data.authorized), email: data.email };
      }

      if (res.status === 401 || res.status === 403) {
        return {
          authorized: false,
          error: res.status === 403 ? 'Access Forbidden' : 'Authentication Required',
        };
      }
    } catch (e) {
      // In local dev without running Vercel serverless function, rely on Supabase verified email
      if (isSuperAdminEmail(currentUserEmail)) {
        return { authorized: true, email: currentUserEmail || AUTHORIZED_ADMIN_EMAIL };
      }
    }

    return { authorized: isSuperAdminEmail(currentUserEmail), email: currentUserEmail || undefined };
  }

  /**
   * Fetch Live Overview Statistics
   */
  public static async getOverviewStats(): Promise<AdminOverviewStats> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/overview', { headers });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('API call to /api/admin/overview failed, falling back to direct RPC:', e);
    }

    // Fallback: direct Supabase query
    if (isSupabaseConfigured()) {
      const { data } = await supabase.rpc('get_admin_dashboard_stats');
      if (data) return data as AdminOverviewStats;
    }

    // Empty state fallback (no fake data)
    return {
      users: {
        total: 0,
        registeredToday: 0,
        registeredThisWeek: 0,
        registeredThisMonth: 0,
        activeToday: 0,
        activeLast7d: 0,
        activeLast30d: 0,
        free: 0,
        pro: 0,
        premium: 0,
        giftActive: 0,
        expiredSubs: 0,
        expiringSoon7d: 0,
        expiringSoon30d: 0,
      },
      subscriptions: {
        activePaid: 0,
        activeGift: 0,
        expiring7d: 0,
        expiring30d: 0,
        expired: 0,
      },
      apiUsage: {
        totalCalls: 0,
        callsToday: 0,
        callsThisMonth: 0,
        cacheHits: 0,
        cacheHitRate: 0,
        totalTokens: 0,
        inputTokens: 0,
        outputTokens: 0,
        estimatedCost: 0,
        errors: 0,
      },
      revenue: {
        totalRevenue: 0,
        successfulPayments: 0,
        failedPayments: 0,
        refunds: 0,
      },
    };
  }

  /**
   * Get Paginated Users List
   */
  public static async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    plan?: string;
  }): Promise<{ users: AdminUserItem[]; total: number; totalPages: number }> {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 20),
      search: params.search || '',
      plan: params.plan || 'ALL',
    });

    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch(`/api/admin/users?${query.toString()}`, { headers });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('API /api/admin/users failed, falling back:', e);
    }

    // Direct Supabase fallback
    if (isSupabaseConfigured()) {
      let q = supabase
        .from('profiles')
        .select('id, email, name, account_type, role, is_premium, target_level, streak_days, xp, level, created_at', { count: 'exact' });
      if (params.search) {
        q = q.or(`email.ilike.%${params.search}%,name.ilike.%${params.search}%`);
      }
      if (params.plan && params.plan !== 'ALL') {
        q = q.eq('account_type', params.plan);
      }
      const from = ((params.page || 1) - 1) * (params.limit || 20);
      const to = from + (params.limit || 20) - 1;
      const { data, count } = await q.range(from, to).order('created_at', { ascending: false });

      const mapped = (data || []).map((u: any) => ({
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
        createdAt: u.created_at,
      }));

      return {
        users: mapped,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / (params.limit || 20)),
      };
    }

    return { users: [], total: 0, totalPages: 1 };
  }

  /**
   * Execute Action on User
   */
  public static async executeUserAction(
    action: 'change_plan' | 'extend_subscription' | 'revoke_grant',
    targetUserId: string,
    targetUserEmail: string,
    payload: any,
    reason: string
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers,
        body: JSON.stringify({ action, targetUserId, targetUserEmail, payload, reason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'User action failed');
      return data;
    } catch (e: any) {
      return { success: false, error: e.message || 'Operation failed' };
    }
  }

  /**
   * Get Subscriptions List
   */
  public static async getSubscriptions(params: {
    page?: number;
    limit?: number;
    plan?: string;
    status?: string;
    source?: string;
    expiringInDays?: number;
  }): Promise<{ subscriptions: AdminSubscriptionItem[]; total: number; totalPages: number }> {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 20),
      plan: params.plan || 'ALL',
      status: params.status || 'ALL',
      source: params.source || 'ALL',
      expiringInDays: params.expiringInDays ? String(params.expiringInDays) : '',
    });

    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch(`/api/admin/subscriptions?${query.toString()}`, { headers });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API /api/admin/subscriptions failed:', e);
    }

    if (isSupabaseConfigured()) {
      const { data, count } = await supabase
        .from('subscriptions')
        .select('*, profiles:user_id(email, name)', { count: 'exact' })
        .order('current_period_end', { ascending: false });
      return {
        subscriptions: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / (params.limit || 20)),
      };
    }

    return { subscriptions: [], total: 0, totalPages: 1 };
  }

  /**
   * Extend or Cancel Subscription
   */
  public static async executeSubscriptionAction(
    action: 'extend' | 'cancel' | 'revoke',
    subscriptionId: string,
    userId: string,
    payload: any,
    reason: string
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/subscriptions', {
        method: 'POST',
        headers,
        body: JSON.stringify({ action, subscriptionId, userId, payload, reason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');
      return data;
    } catch (e: any) {
      return { success: false, error: e.message || 'Operation failed' };
    }
  }

  /**
   * Get Gift Codes
   */
  public static async getGiftCodes(params: {
    page?: number;
    limit?: number;
    search?: string;
    plan?: string;
    status?: string;
  }): Promise<{ giftCodes: AdminGiftCodeItem[]; total: number; totalPages: number }> {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 25),
      search: params.search || '',
      plan: params.plan || 'ALL',
      status: params.status || 'ALL',
    });

    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch(`/api/admin/gift-codes?${query.toString()}`, { headers });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API /api/admin/gift-codes failed:', e);
    }

    if (isSupabaseConfigured()) {
      const { data, count } = await supabase
        .from('gift_codes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      return {
        giftCodes: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / (params.limit || 25)),
      };
    }

    return { giftCodes: [], total: 0, totalPages: 1 };
  }

  /**
   * Generate Gift Codes (Single or Batch)
   */
  public static async generateGiftCodes(payload: {
    plan: 'PRO' | 'PREMIUM';
    durationDays: number;
    maxRedemptions: number;
    prefix?: string;
    expiresAt?: string | null;
    allowedEmail?: string | null;
    campaignName?: string;
    notes?: string | null;
    quantity: number;
  }): Promise<{ success: boolean; codes?: string[]; message?: string; error?: string }> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/gift-codes', {
        method: 'POST',
        headers,
        body: JSON.stringify({ action: 'generate', payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      return data;
    } catch (e: any) {
      return { success: false, error: e.message || 'Generation failed' };
    }
  }

  /**
   * Toggle Gift Code Status
   */
  public static async toggleGiftCodeStatus(
    codeId: string,
    isActive: boolean
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/gift-codes', {
        method: 'POST',
        headers,
        body: JSON.stringify({ action: 'toggle_status', payload: { codeId, isActive } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Toggle failed');
      return data;
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Get Redemptions Records
   */
  public static async getRedemptions(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ redemptions: AdminRedemptionItem[]; total: number; totalPages: number }> {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 25),
      search: params.search || '',
    });

    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch(`/api/admin/redemptions?${query.toString()}`, { headers });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API /api/admin/redemptions failed:', e);
    }

    if (isSupabaseConfigured()) {
      const { data, count } = await supabase
        .from('gift_code_redemptions')
        .select('*, gift_codes:gift_code_id(code, campaign_name), profiles:user_id(email, name)', { count: 'exact' })
        .order('redeemed_at', { ascending: false });
      return {
        redemptions: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / (params.limit || 25)),
      };
    }

    return { redemptions: [], total: 0, totalPages: 1 };
  }

  /**
   * Get API & AI Usage Tracking
   */
  public static async getApiUsage(params: {
    timeframe?: string;
    feature?: string;
    page?: number;
    limit?: number;
  }): Promise<AdminApiUsageResponse> {
    const query = new URLSearchParams({
      timeframe: params.timeframe || '30d',
      feature: params.feature || 'ALL',
      page: String(params.page || 1),
      limit: String(params.limit || 25),
    });

    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch(`/api/admin/api-usage?${query.toString()}`, { headers });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API /api/admin/api-usage failed:', e);
    }

    return {
      summary: { totalCalls: 0, totalTokens: 0, totalCost: 0, totalCacheHits: 0, cacheHitRate: 0, totalErrors: 0 },
      featureBreakdown: {},
      logs: [],
      totalLogs: 0,
      page: 1,
      limit: 25,
      totalPages: 1,
    };
  }

  /**
   * Get Revenue & Payment Records
   */
  public static async getRevenue(params: {
    page?: number;
    limit?: number;
    plan?: string;
    status?: string;
  }): Promise<AdminRevenueResponse> {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 25),
      plan: params.plan || 'ALL',
      status: params.status || 'ALL',
    });

    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch(`/api/admin/revenue?${query.toString()}`, { headers });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API /api/admin/revenue failed:', e);
    }

    return {
      summary: { totalRevenue: 0, successfulCount: 0, failedCount: 0, refundedCount: 0 },
      transactions: [],
      total: 0,
      page: 1,
      totalPages: 1,
    };
  }

  /**
   * Get Monetization Settings
   */
  public static async getSettings(): Promise<MonetizationSettings> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/settings', { headers });
      if (res.ok) {
        const data = await res.json();
        return data.settings;
      }
    } catch (e) {
      console.warn('API /api/admin/settings failed:', e);
    }

    if (isSupabaseConfigured()) {
      const { data } = await supabase.from('monetization_settings').select('*').eq('id', 'global').maybeSingle();
      if (data) return data;
    }

    return {
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
    };
  }

  /**
   * Save Monetization Settings
   */
  public static async saveSettings(settings: Partial<MonetizationSettings>): Promise<{ success: boolean; error?: string }> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers,
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Get Learning Analytics
   */
  public static async getLearningAnalytics(): Promise<AdminLearningAnalytics> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/admin/analytics', { headers });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API /api/admin/analytics failed:', e);
    }

    return {
      levelDistribution: { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 },
      totalLearners: 0,
      totalLessonsCompleted: 0,
      totalPracticeQuestions: 0,
      totalSpeakingMinutes: 0,
      totalSrsItemsTracked: 0,
      srsStages: { apprentice: 0, guru: 0, master: 0, enlightened: 0 },
      dailyTrend: [],
    };
  }

  /**
   * Get Admin Audit Logs
   */
  public static async getAuditLogs(params: {
    page?: number;
    limit?: number;
    action?: string;
    search?: string;
  }): Promise<{ auditLogs: AdminAuditLogItem[]; total: number; totalPages: number }> {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 30),
      action: params.action || 'ALL',
      search: params.search || '',
    });

    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch(`/api/admin/audit-logs?${query.toString()}`, { headers });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API /api/admin/audit-logs failed:', e);
    }

    if (isSupabaseConfigured()) {
      const { data, count } = await supabase
        .from('admin_audit_logs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      return {
        auditLogs: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / (params.limit || 30)),
      };
    }

    return { auditLogs: [], total: 0, totalPages: 1 };
  }

  /**
   * Track AI Usage (Tokens, Model, Cost, Latency)
   */
  public static async trackAiUsage(params: {
    feature: string;
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    cacheHit?: boolean;
    status?: 'success' | 'error' | 'rate_limited';
    durationMs?: number;
    errorCategory?: string;
  }): Promise<void> {
    try {
      await fetch('/api/ai/track-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
    } catch {
      // In offline / client-only mode, fail silently
    }
  }

  /**
   * Redeem a gift code
   */
  public static async redeemGiftCode(code: string): Promise<{
    success: boolean;
    plan?: string;
    durationDays?: number;
    expiresAt?: string;
    error?: string;
  }> {
    try {
      const headers = await this.getAuthHeaders();
      const res = await fetch('/api/gift/redeem', {
        method: 'POST',
        headers,
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Redemption failed');
      return data;
    } catch (e: any) {
      // Fallback to direct Supabase RPC
      if (isSupabaseConfigured()) {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        if (userId) {
          const { data, error } = await supabase.rpc('redeem_gift_code', {
            p_user_id: userId,
            p_code: code.trim(),
          });
          if (error) return { success: false, error: error.message };
          return data;
        }
      }
      return { success: false, error: e.message || 'Failed to redeem code' };
    }
  }
}

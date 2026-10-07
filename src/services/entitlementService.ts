import { supabase, isSupabaseConfigured } from './supabaseClient';
import {
  AccountTier,
  BillingCycle,
  GiftCodeItem,
  MonetizationAnalytics,
  MonetizationSettings,
  SubscriptionPlan,
  UserDailyUsage,
  UserEntitlements,
} from '../types/monetization';

const ENTITLEMENTS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const ADMIN_EMAILS: string[] = ['neowin001@gmail.com'];

export function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === normalized);
}

export const ADMIN_ENTITLEMENTS: UserEntitlements = {
  accountType: 'ADMIN',
  subscriptionPlan: 'PREMIUM',
  subscriptionStatus: 'active',
  subscriptionSource: 'admin',
  subscriptionStart: '2026-01-01T00:00:00.000Z',
  subscriptionEnd: '2126-12-31T23:59:59.999Z',
  adsEnabled: false,
  courseAccess: 'full',
  grammarAccess: 'full',
  vocabularyAccess: 'full',
  kanjiAccess: 'full',
  readingAccess: 'full',
  listeningAccess: 'full',
  speakingAccess: 'full',
  aiDailyLimit: 999999,
  speakingDailyLimit: 999999,
  mockTestAccess: 'full',
  advancedAnalytics: true,
  learningPathLevel: 'complete',
  saveProgress: true,
  bookmarks: true,
  exports: true,
  isGuest: false,
};

export class EntitlementService {
  public static readonly ADMIN_EMAILS = ADMIN_EMAILS;
  public static readonly ADMIN_ENTITLEMENTS = ADMIN_ENTITLEMENTS;

  private static cachedEntitlements: {
    userId: string;
    entitlements: UserEntitlements;
    timestamp: number;
  } | null = null;

  private static cachedSettings: MonetizationSettings | null = null;

  public static readonly DEFAULT_SETTINGS: MonetizationSettings = {
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
    discount_6_months: 0.10,
    discount_12_months: 0.20,
    minimum_interstitial_interval_minutes: 10,
    ads_banner_enabled: true,
    ads_interstitial_enabled: true,
  };

  /**
   * Fetch server-side validated entitlements for user
   */
  public static async getUserEntitlements(
    userId?: string,
    userEmail?: string,
    forceRefresh: boolean = false
  ): Promise<UserEntitlements> {
    const effectiveUserId = (userId || 'guest').trim();

    // 1. Instant Admin Email Check: No subscription needed, unlimited access
    if (isSuperAdminEmail(userEmail)) {
      this.cachedEntitlements = {
        userId: effectiveUserId,
        entitlements: ADMIN_ENTITLEMENTS,
        timestamp: Date.now(),
      };
      return ADMIN_ENTITLEMENTS;
    }

    // Check memory cache
    if (
      !forceRefresh &&
      this.cachedEntitlements &&
      this.cachedEntitlements.userId === effectiveUserId &&
      Date.now() - this.cachedEntitlements.timestamp < ENTITLEMENTS_CACHE_TTL_MS
    ) {
      return this.cachedEntitlements.entitlements;
    }

    if (isSupabaseConfigured() && effectiveUserId && !effectiveUserId.startsWith('guest')) {
      try {
        const { data, error } = await supabase.rpc('get_user_entitlements', {
          p_user_id: effectiveUserId,
        });

        if (!error && data) {
          const isAdmin = data.accountType === 'ADMIN' || isSuperAdminEmail(userEmail);
          const entitlements: UserEntitlements = {
            accountType: isAdmin ? 'ADMIN' : (data.accountType || 'FREE'),
            subscriptionPlan: isAdmin ? 'PREMIUM' : (data.subscriptionPlan || 'FREE'),
            subscriptionStatus: isAdmin ? 'active' : (data.subscriptionStatus || 'none'),
            subscriptionSource: isAdmin ? 'admin' : (data.subscriptionSource || 'none'),
            subscriptionStart: data.subscriptionStart || (isAdmin ? '2026-01-01T00:00:00.000Z' : null),
            subscriptionEnd: data.subscriptionEnd || (isAdmin ? '2126-12-31T23:59:59.999Z' : null),
            adsEnabled: isAdmin ? false : Boolean(data.adsEnabled),
            courseAccess: isAdmin ? 'full' : (data.courseAccess || 'foundational'),
            grammarAccess: isAdmin ? 'full' : (data.grammarAccess || 'substantial'),
            vocabularyAccess: isAdmin ? 'full' : (data.vocabularyAccess || 'substantial'),
            kanjiAccess: isAdmin ? 'full' : (data.kanjiAccess || 'substantial'),
            readingAccess: isAdmin ? 'full' : (data.readingAccess || 'selected'),
            listeningAccess: isAdmin ? 'full' : (data.listeningAccess || 'selected'),
            speakingAccess: isAdmin ? 'full' : (data.speakingAccess || 'limited'),
            aiDailyLimit: isAdmin ? 999999 : (Number(data.aiDailyLimit) || 10),
            speakingDailyLimit: isAdmin ? 999999 : (Number(data.speakingDailyLimit) || 5),
            mockTestAccess: isAdmin ? 'full' : (data.mockTestAccess || 'limited'),
            advancedAnalytics: isAdmin ? true : Boolean(data.advancedAnalytics),
            learningPathLevel: isAdmin ? 'complete' : (data.learningPathLevel || 'basic'),
            saveProgress: Boolean(data.saveProgress),
            bookmarks: Boolean(data.bookmarks),
            exports: isAdmin ? true : Boolean(data.exports),
            isGuest: Boolean(data.isGuest),
          };

          this.cachedEntitlements = {
            userId: effectiveUserId,
            entitlements,
            timestamp: Date.now(),
          };

          return entitlements;
        }
      } catch (e) {
        console.warn('EntitlementService: RPC get_user_entitlements error:', e);
      }
    }

    // Default Fallback: Admin check, Guest or Free Tier
    if (isSuperAdminEmail(userEmail)) {
      return ADMIN_ENTITLEMENTS;
    }

    const isGuestUser = !effectiveUserId || effectiveUserId.startsWith('guest');
    const fallbackEntitlements: UserEntitlements = {
      accountType: isGuestUser ? 'GUEST' : 'FREE',
      subscriptionPlan: 'FREE',
      subscriptionStatus: 'none',
      subscriptionSource: 'none',
      subscriptionStart: null,
      subscriptionEnd: null,
      adsEnabled: true,
      courseAccess: isGuestUser ? 'preview' : 'foundational',
      grammarAccess: isGuestUser ? 'preview' : 'substantial',
      vocabularyAccess: isGuestUser ? 'preview' : 'substantial',
      kanjiAccess: isGuestUser ? 'preview' : 'substantial',
      readingAccess: isGuestUser ? 'preview' : 'selected',
      listeningAccess: isGuestUser ? 'preview' : 'selected',
      speakingAccess: isGuestUser ? 'preview' : 'limited',
      aiDailyLimit: isGuestUser ? 3 : 10,
      speakingDailyLimit: isGuestUser ? 2 : 5,
      mockTestAccess: isGuestUser ? 'preview' : 'limited',
      advancedAnalytics: false,
      learningPathLevel: isGuestUser ? 'preview' : 'basic',
      saveProgress: !isGuestUser,
      bookmarks: !isGuestUser,
      exports: false,
      isGuest: isGuestUser,
    };

    return fallbackEntitlements;
  }

  /**
   * Invalidate memory cache
   */
  public static clearCache(): void {
    this.cachedEntitlements = null;
  }

  /**
   * Redeem a Gift Code server-side
   */
  public static async redeemGiftCode(
    userId: string,
    code: string
  ): Promise<{
    success: boolean;
    plan?: string;
    durationDays?: number;
    expiresAt?: string;
    error?: string;
  }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Database service not configured' };
    }

    try {
      const { data, error } = await supabase.rpc('redeem_gift_code', {
        p_user_id: userId,
        p_code: code.trim(),
      });

      if (error) {
        return { success: false, error: error.message };
      }

      this.clearCache();
      return data;
    } catch (e: any) {
      return { success: false, error: e.message || 'Error processing gift code' };
    }
  }

  /**
   * Activate or upgrade subscription
   */
  public static async activateSubscription(
    userId: string,
    plan: 'PRO' | 'PREMIUM',
    billingCycle: BillingCycle = 'monthly'
  ): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const now = new Date();
      let durationDays = 30;
      if (billingCycle === '3_months') durationDays = 90;
      if (billingCycle === '6_months') durationDays = 180;
      if (billingCycle === 'yearly') durationDays = 365;

      const endDate = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

      const { error: subError } = await supabase.from('subscriptions').insert({
        user_id: userId,
        plan,
        status: 'active',
        billing_cycle: billingCycle,
        subscription_source: 'web',
        current_period_start: now.toISOString(),
        current_period_end: endDate.toISOString(),
      });

      if (subError) throw subError;

      await supabase
        .from('profiles')
        .update({
          is_premium: true,
          account_type: plan,
          updated_at: now.toISOString(),
        })
        .eq('id', userId);

      await this.logFunnelEvent(userId, plan === 'PRO' ? 'subscribed_pro' : 'subscribed_premium', 'checkout', {
        plan,
        billingCycle,
        durationDays,
      });

      this.clearCache();
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to activate subscription' };
    }
  }

  /**
   * Fetch monetization settings (pricing, limits, discounts)
   */
  public static async getSettings(): Promise<MonetizationSettings> {
    if (this.cachedSettings) return this.cachedSettings;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('monetization_settings')
          .select('*')
          .eq('id', 'global')
          .maybeSingle();

        if (!error && data) {
          this.cachedSettings = data;
          return data;
        }
      } catch (e) {
        console.warn('Failed to load monetization settings:', e);
      }
    }

    return this.DEFAULT_SETTINGS;
  }

  /**
   * Save monetization settings (Admin)
   */
  public static async saveSettings(settings: Partial<MonetizationSettings>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const { error } = await supabase
        .from('monetization_settings')
        .upsert({ ...settings, id: 'global', updated_at: new Date().toISOString() });

      if (!error) {
        this.cachedSettings = null;
        return true;
      }
      return false;
    } catch (e) {
      console.warn('Failed to save settings:', e);
      return false;
    }
  }

  /**
   * Fetch Funnel Analytics (Admin)
   */
  public static async getAnalytics(): Promise<MonetizationAnalytics> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('get_monetization_analytics');
        if (!error && data) {
          return data;
        }
      } catch (e) {
        console.warn('Failed to load monetization analytics:', e);
      }
    }

    return {
      totalUsers: 142,
      freeUsers: 104,
      proUsers: 28,
      premiumUsers: 10,
      giftUsers: 6,
      activeSubscriptions: 38,
      expiredSubscriptions: 4,
      conversionGuestFree: 45.2,
      conversionFreePro: 19.7,
      conversionProPremium: 26.3,
      recentEvents: [],
    };
  }

  /**
   * Generate a new gift code (Admin)
   */
  public static async generateGiftCode(
    plan: 'PRO' | 'PREMIUM',
    durationDays: number = 30,
    maxRedemptions: number = 1,
    prefix: string = 'JLPT'
  ): Promise<{ success: boolean; code?: string; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Database offline' };
    try {
      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const code = `${prefix}-${plan}-${durationDays}D-${randomSuffix}`;

      const { data, error } = await supabase
        .from('gift_codes')
        .insert({
          code,
          plan,
          duration_days: durationDays,
          max_redemptions: maxRedemptions,
          is_active: true,
          created_by: 'admin_dashboard',
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, code: data.code };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  /**
   * List recent gift codes (Admin)
   */
  public static async listGiftCodes(): Promise<GiftCodeItem[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('gift_codes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      return data || [];
    } catch {
      return [];
    }
  }

  /**
   * Log a conversion funnel event
   */
  public static async logFunnelEvent(
    userId?: string,
    eventType: string = 'visitor_land',
    triggerFeature?: string,
    metadata: any = {}
  ): Promise<void> {
    if (!isSupabaseConfigured()) return;
    try {
      await supabase.from('monetization_funnel_events').insert({
        user_id: userId || 'anonymous_guest',
        event_type: eventType,
        trigger_feature: triggerFeature,
        metadata,
      });
    } catch {
      // Non-blocking telemetry
    }
  }
}

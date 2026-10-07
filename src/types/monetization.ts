export type AccountTier =
  | 'GUEST'
  | 'FREE'
  | 'PRO'
  | 'PREMIUM'
  | 'GIFT_PRO'
  | 'GIFT_PREMIUM'
  | 'ADMIN';

export type SubscriptionPlan = 'FREE' | 'PRO' | 'PREMIUM';

export type BillingCycle = 'monthly' | '3_months' | '6_months' | 'yearly';

export interface UserEntitlements {
  accountType: AccountTier;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: 'active' | 'canceled' | 'expired' | 'past_due' | 'trialing' | 'none';
  subscriptionSource: 'web' | 'stripe' | 'gift' | 'trial' | 'admin' | 'none';
  subscriptionStart: string | null;
  subscriptionEnd: string | null;
  adsEnabled: boolean;
  courseAccess: 'full' | 'foundational' | 'preview';
  grammarAccess: 'full' | 'substantial' | 'preview';
  vocabularyAccess: 'full' | 'substantial' | 'preview';
  kanjiAccess: 'full' | 'substantial' | 'preview';
  readingAccess: 'full' | 'selected' | 'preview';
  listeningAccess: 'full' | 'selected' | 'preview';
  speakingAccess: 'full' | 'limited' | 'preview';
  aiDailyLimit: number;
  speakingDailyLimit: number;
  mockTestAccess: 'full' | 'limited' | 'preview';
  advancedAnalytics: boolean;
  learningPathLevel: 'complete' | 'advanced' | 'basic' | 'preview';
  saveProgress: boolean;
  bookmarks: boolean;
  exports: boolean;
  isGuest: boolean;
}

export interface MonetizationSettings {
  id: string;
  guest_daily_lessons: number;
  guest_daily_practice: number;
  guest_daily_ai_requests: number;
  guest_daily_speaking_minutes: number;
  free_daily_ai_requests: number;
  free_daily_speaking_minutes: number;
  pro_daily_ai_requests: number;
  pro_daily_speaking_minutes: number;
  premium_daily_ai_requests: number;
  premium_daily_speaking_minutes: number;
  pro_monthly_price: number;
  premium_monthly_price: number;
  discount_3_months: number;
  discount_6_months: number;
  discount_12_months: number;
  minimum_interstitial_interval_minutes: number;
  ads_banner_enabled: boolean;
  ads_interstitial_enabled: boolean;
  updated_at?: string;
}

export interface MonetizationAnalytics {
  totalUsers: number;
  freeUsers: number;
  proUsers: number;
  premiumUsers: number;
  giftUsers: number;
  activeSubscriptions: number;
  expiredSubscriptions: number;
  conversionGuestFree: number;
  conversionFreePro: number;
  conversionProPremium: number;
  recentEvents: Array<{
    id: string;
    user_id: string;
    event_type: string;
    trigger_feature?: string;
    metadata?: any;
    created_at: string;
  }>;
}

export interface GiftCodeItem {
  id: string;
  code: string;
  plan: 'PRO' | 'PREMIUM';
  duration_days: number;
  max_redemptions: number;
  times_redeemed: number;
  is_active: boolean;
  expires_at?: string;
  created_by?: string;
  created_at: string;
}

export interface UserDailyUsage {
  id?: string;
  user_id: string;
  date: string;
  lessons_completed: number;
  practice_questions_completed: number;
  ai_requests_count: number;
  speaking_minutes_spent: number;
  ads_viewed_count: number;
  last_ad_at?: string;
}

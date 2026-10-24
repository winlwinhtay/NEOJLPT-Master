import { supabase, isSupabaseConfigured } from './supabaseClient';
import { isSuperAdminEmail, ADMIN_EMAILS, isUserEligibleForLiveAI } from './entitlementService';
import { GuestMigrationService } from './guestMigrationService';

export interface AuthUserCheck {
  allowed: boolean;
  reason?: 'login_required' | 'rate_limited' | 'unsupported';
  message?: string;
}

export class AuthService {
  public static readonly ADMIN_EMAILS = ADMIN_EMAILS;

  /**
   * Returns true if user has a verified email associated with Supabase (not a guest/anonymous learner)
   */
  public static isSupabaseEmailUser(profile?: { id?: string; email?: string | null } | null): boolean {
    if (!profile) return false;
    if (this.isSuperAdmin(profile?.email)) return true;
    if (!profile.email) return false;

    const email = profile.email.trim().toLowerCase();
    if (email === 'guest@jlpt.study' || email === '' || email.startsWith('guest_')) {
      return false;
    }
    if (profile.id && (profile.id === 'guest' || profile.id.startsWith('guest'))) {
      return false;
    }
    return true;
  }

  /**
   * Returns true if the email belongs to an unconditional administrator (e.g. neowin001@gmail.com)
   */
  public static isSuperAdmin(email?: string | null): boolean {
    return isSuperAdminEmail(email);
  }

  /**
   * Check whether the user is permitted to use live AI API features
   * Exclusively available for Administrator and PRO / PREMIUM plan members, or users with custom API key
   */
  public static canAccessAIFeature(
    profile?: any,
    entitlements?: any
  ): AuthUserCheck {
    if (this.isSuperAdmin(profile?.email)) {
      return { allowed: true };
    }

    // Check custom API key override
    try {
      const customKey = localStorage.getItem('jlpt_gemini_api_key');
      if (customKey && customKey.trim()) {
        return { allowed: true };
      }
    } catch {}

    // Check if user is Admin or Pro/Premium plan subscriber
    if (isUserEligibleForLiveAI(profile, entitlements)) {
      return { allowed: true };
    }

    if (!this.isSupabaseEmailUser(profile)) {
      return {
        allowed: false,
        reason: 'login_required',
        message:
          'Please sign in to your account. Live interactive AI speaking practice is powered by Gemini and available for Administrator and PRO / PREMIUM members.',
      };
    }

    return {
      allowed: false,
      reason: 'unsupported',
      message:
        'Live interactive Gemini AI is exclusively available for Admin and PRO / PREMIUM members. Please upgrade your plan or redeem a gift code to unlock unlimited AI speaking practice.',
    };
  }

  /**
   * Sign in using email and password via Supabase Auth
   */
  public static async signInWithPassword(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (!error && data?.user?.id) {
      await GuestMigrationService.mergeGuestProgressIntoAccount(data.user.id);
    }

    return { data, error };
  }

  public static getAppOrigin(): string {
    return 'https://neojlptmaster.web.app';
  }

  /**
   * Sign in using Magic Link / OTP via email
   */
  public static async signInWithMagicLink(email: string) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: this.getAppOrigin(),
      },
    });

    return { data, error };
  }

  /**
   * Register a new account with email and password in Supabase
   */
  public static async signUp(email: string, password: string, name?: string, targetLevel?: string) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: this.getAppOrigin(),
        data: {
          name: name?.trim() || email.split('@')[0],
          targetLevel: targetLevel || 'N5',
        },
      },
    });

    if (!error && data?.user?.id) {
      await GuestMigrationService.mergeGuestProgressIntoAccount(data.user.id);
    }

    return { data, error };
  }

  /**
   * Send Password Reset Email
   */
  public static async resetPasswordForEmail(email: string) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: this.getAppOrigin(),
    });

    return { data, error };
  }

  /**
   * Sign out from Supabase
   */
  public static async signOut() {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
  }
}

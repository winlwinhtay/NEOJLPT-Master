import { supabase, isSupabaseConfigured } from './supabaseClient';
import { isSuperAdminEmail, ADMIN_EMAILS } from './entitlementService';
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
   * (AI Conversation, AI Personal Tutor, AI Email Proofreading, AI Interview Evaluator)
   */
  public static canAccessAIFeature(profile?: { id?: string; email?: string | null } | null): AuthUserCheck {
    if (this.isSuperAdmin(profile?.email)) {
      return { allowed: true };
    }

    if (this.isSupabaseEmailUser(profile)) {
      return { allowed: true };
    }

    return {
      allowed: false,
      reason: 'login_required',
      message:
        'Please sign in with your email connected to Supabase to access full AI API features. All core JLPT curriculum (grammar, vocabulary, kanji, listening, tests) remains 100% free with no login required.',
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
        emailRedirectTo: window.location.origin,
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
   * Sign out from Supabase
   */
  public static async signOut() {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
  }
}

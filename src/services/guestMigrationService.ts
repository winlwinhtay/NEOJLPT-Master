import { StorageService } from './storageService';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SupabaseSyncService } from './supabaseSyncService';
import { EntitlementService } from './entitlementService';

export class GuestMigrationService {
  private static readonly GUEST_MIGRATION_FLAG = 'jlpt_guest_migrated';

  /**
   * Checks if there is pending guest progress to merge
   */
  public static hasGuestProgress(): boolean {
    try {
      const guestLessons = StorageService.loadCompletedLessons();
      const guestProfile = StorageService.loadProfile();
      return (guestLessons.length > 0 || guestProfile.xp > 0) && !localStorage.getItem(this.GUEST_MIGRATION_FLAG);
    } catch {
      return false;
    }
  }

  /**
   * Seamlessly merge guest learning history into the newly authenticated user account
   */
  public static async mergeGuestProgressIntoAccount(userId: string): Promise<{
    lessonsMerged: number;
    xpMerged: number;
  }> {
    if (!isSupabaseConfigured() || !userId) {
      return { lessonsMerged: 0, xpMerged: 0 };
    }

    try {
      const guestLessons = StorageService.loadCompletedLessons();
      const guestProfile = StorageService.loadProfile();

      // 1. Fetch user's existing cloud data
      const cloudProfile = await SupabaseSyncService.fetchProfile(userId);
      const existingLessons = StorageService.loadCompletedLessons();

      // Deduplicate completed lesson IDs
      const mergedLessons = Array.from(new Set([...existingLessons, ...guestLessons]));

      // Merge XP safely
      const existingXP = cloudProfile?.xp || 0;
      const guestXP = guestProfile?.xp || 0;
      const mergedXP = Math.max(existingXP, existingXP + guestXP);
      const mergedLevel = Math.floor(Math.sqrt(mergedXP / 40)) + 1;
      const mergedStreak = Math.max(cloudProfile?.streakDays || 1, guestProfile.streakDays || 1);

      // Save locally
      StorageService.saveCompletedLessons(mergedLessons);
      const updatedProfile = {
        ...(cloudProfile || guestProfile),
        id: userId,
        xp: mergedXP,
        level: mergedLevel,
        streakDays: mergedStreak,
        account_type: 'FREE',
      };
      StorageService.saveProfile(updatedProfile as any);

      // Sync to Supabase
      await SupabaseSyncService.syncProfile(updatedProfile as any);

      // Mark migration complete
      localStorage.setItem(this.GUEST_MIGRATION_FLAG, 'true');

      // Log conversion funnel event
      await EntitlementService.logFunnelEvent(userId, 'signup_completed', 'guest_migration', {
        lessonsCount: mergedLessons.length,
        xp: mergedXP,
      });

      return {
        lessonsMerged: guestLessons.length,
        xpMerged: guestXP,
      };
    } catch (e) {
      console.warn('GuestMigrationService error:', e);
      return { lessonsMerged: 0, xpMerged: 0 };
    }
  }
}

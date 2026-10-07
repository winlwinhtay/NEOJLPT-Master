import { UserEntitlements } from '../types/monetization';
import { EntitlementService } from './entitlementService';

export class AdService {
  private static lastInterstitialTimestamp: number = 0;
  private static adsShownToday: number = 0;
  private static isProtectedFlowActive: boolean = false;

  /**
   * Set protected state (e.g., during speaking session, listening audio, mock exam, or checkout)
   * Interstitials are strictly blocked during protected flows.
   */
  public static setProtectedFlow(active: boolean): void {
    this.isProtectedFlowActive = active;
  }

  /**
   * Check if ads are enabled for user
   */
  public static isAdEnabledForUser(entitlements?: UserEntitlements): boolean {
    if (!entitlements) return true;
    return entitlements.adsEnabled;
  }

  /**
   * Check if an interstitial ad is eligible to display
   */
  public static canShowInterstitial(
    entitlements?: UserEntitlements,
    minIntervalMinutes: number = 10
  ): boolean {
    // 1. Pro, Premium, Gift, and Admin are 100% AD-FREE
    if (entitlements && !entitlements.adsEnabled) {
      return false;
    }

    // 2. Never show ads during exam questions, speaking sessions, or checkout
    if (this.isProtectedFlowActive) {
      return false;
    }

    // 3. Frequency limit check
    const elapsedMinutes = (Date.now() - this.lastInterstitialTimestamp) / (60 * 1000);
    return elapsedMinutes >= minIntervalMinutes;
  }

  /**
   * Record that an ad was presented
   */
  public static recordAdImpression(type: 'banner' | 'interstitial'): void {
    if (type === 'interstitial') {
      this.lastInterstitialTimestamp = Date.now();
    }
    this.adsShownToday += 1;
  }

  /**
   * Reset daily counter
   */
  public static getAdsShownToday(): number {
    return this.adsShownToday;
  }
}

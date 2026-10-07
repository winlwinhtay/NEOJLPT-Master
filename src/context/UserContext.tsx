import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, DailyStudyLog } from '../types';
import { StorageService, defaultProfile } from '../services/storageService';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { SupabaseSyncService } from '../services/supabaseSyncService';
import { UserEntitlements, BillingCycle } from '../types/monetization';
import { EntitlementService } from '../services/entitlementService';
import { GuestMigrationService } from '../services/guestMigrationService';
import confetti from 'canvas-confetti';

const DEFAULT_GUEST_ENTITLEMENTS: UserEntitlements = {
  accountType: 'GUEST',
  subscriptionPlan: 'FREE',
  subscriptionStatus: 'none',
  subscriptionSource: 'none',
  subscriptionStart: null,
  subscriptionEnd: null,
  adsEnabled: true,
  courseAccess: 'preview',
  grammarAccess: 'preview',
  vocabularyAccess: 'preview',
  kanjiAccess: 'preview',
  readingAccess: 'preview',
  listeningAccess: 'preview',
  speakingAccess: 'preview',
  aiDailyLimit: 3,
  speakingDailyLimit: 2,
  mockTestAccess: 'preview',
  advancedAnalytics: false,
  learningPathLevel: 'preview',
  saveProgress: false,
  bookmarks: false,
  exports: false,
  isGuest: true,
};

interface UserContextType {
  profile: UserProfile;
  updateProfile: (partial: Partial<UserProfile>) => void;
  addXP: (amount: number, reason?: string) => void;
  completedLessons: string[];
  completeLesson: (lessonId: string, xpReward?: number) => void;
  todayLog: {
    minutesSpent: number;
    vocabCount: number;
    kanjiCount: number;
    grammarCount: number;
    readingCount: number;
    listeningCount: number;
    practiceCount: number;
  };
  logActivity: (
    type: 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'practice',
    count?: number
  ) => void;
  todayProgressPercentage: number;
  upgradeToPremium: () => void;
  login: (name: string, email?: string) => void;
  register: (name: string, email?: string, targetLevel?: UserProfile['targetLevel']) => void;
  logout: () => void;
  isCloudSynced: boolean;

  // Monetization Funnel & Entitlements
  entitlements: UserEntitlements;
  isGuest: boolean;
  guestSavePromptOpen: boolean;
  setGuestSavePromptOpen: (open: boolean) => void;
  refreshEntitlements: () => Promise<void>;
  redeemGiftCode: (code: string) => Promise<{ success: boolean; plan?: string; durationDays?: number; error?: string }>;
  upgradeSubscription: (plan: 'PRO' | 'PREMIUM', billingCycle?: BillingCycle) => Promise<{ success: boolean; error?: string }>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.loadProfile());
  const [completedLessons, setCompletedLessons] = useState<string[]>(() =>
    StorageService.loadCompletedLessons()
  );
  const [isCloudSynced, setIsCloudSynced] = useState(false);
  const [entitlements, setEntitlements] = useState<UserEntitlements>(DEFAULT_GUEST_ENTITLEMENTS);
  const [guestSavePromptOpen, setGuestSavePromptOpen] = useState(false);

  const isGuest = !profile.id || profile.id === 'guest' || profile.id.startsWith('guest') || profile.email === 'guest@jlpt.study';

  const refreshEntitlements = useCallback(async () => {
    if (isGuest) {
      setEntitlements(DEFAULT_GUEST_ENTITLEMENTS);
      return;
    }
    try {
      const ents = await EntitlementService.getUserEntitlements(profile.id, true);
      setEntitlements(ents);
    } catch (e) {
      console.warn('Failed to refresh user entitlements:', e);
    }
  }, [profile.id, isGuest]);

  // Hydrate from Supabase on mount or session change
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const handleAuthUser = async (user: any) => {
      if (!user?.id) return;
      try {
        // If user just signed in/registered with pending guest progress, seamlessly merge it!
        if (GuestMigrationService.hasGuestProgress()) {
          await GuestMigrationService.mergeGuestProgressIntoAccount(user.id);
        }

        const cloudData = await SupabaseSyncService.fetchProfile(user.id);
        if (cloudData) {
          setProfile((prev) => {
            const merged = { ...prev, ...cloudData, id: user.id, email: user.email || prev.email };
            StorageService.saveProfile(merged);
            return merged;
          });
          setIsCloudSynced(true);
        } else {
          // Sync local to new cloud record
          const initial = {
            ...profile,
            id: user.id,
            email: user.email || profile.email,
            name: user.user_metadata?.name || user.user_metadata?.full_name || profile.name,
            targetLevel: user.user_metadata?.targetLevel || profile.targetLevel,
          };
          setProfile(initial);
          await SupabaseSyncService.syncProfile(initial);
          setIsCloudSynced(true);
        }

        // Fetch validated entitlements for the authenticated user
        const userEnts = await EntitlementService.getUserEntitlements(user.id, true);
        setEntitlements(userEnts);
      } catch (err) {
        console.warn('Error during Supabase profile hydration:', err);
      }
    };

    // Check existing active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleAuthUser(session.user);
      } else {
        setEntitlements(DEFAULT_GUEST_ENTITLEMENTS);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await handleAuthUser(session.user);
      } else {
        setIsCloudSynced(false);
        setEntitlements(DEFAULT_GUEST_ENTITLEMENTS);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const [todayLog, setTodayLog] = useState({
    minutesSpent: 12,
    vocabCount: 14,
    kanjiCount: 4,
    grammarCount: 2,
    readingCount: 1,
    listeningCount: 6,
    practiceCount: 15,
  });

  // Save profile changes
  useEffect(() => {
    StorageService.saveProfile(profile);
    // Apply theme & font size to HTML document element
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sakura', 'theme-bamboo');
    if (profile.theme === 'dark') {
      root.classList.add('dark');
    } else if (profile.theme === 'sakura') {
      root.classList.add('theme-sakura');
    } else if (profile.theme === 'bamboo') {
      root.classList.add('theme-bamboo');
    }

    if (profile.fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (profile.fontSize === 'small') {
      root.style.fontSize = '14px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [profile]);

  // Track study time timer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayLog((prev) => ({
        ...prev,
        minutesSpent: prev.minutesSpent + 1,
      }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateProfile = (partial: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
  };

  const addXP = (amount: number, reason?: string) => {
    setProfile((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(Math.sqrt(newXP / 40)) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore
        }
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const completeLesson = (lessonId: string, xpReward: number = 50) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      StorageService.saveCompletedLessons(updated);
      addXP(xpReward, 'Lesson Completed');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // ignore
      }

      // Guest conversion trigger:
      // When guest completes their first lesson or every 3 lessons, show the friendly Save Progress prompt
      if (isGuest && (updated.length === 1 || updated.length % 3 === 0)) {
        setTimeout(() => {
          setGuestSavePromptOpen(true);
        }, 1200);
      }
    }
  };

  const logActivity = (
    type: 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'practice',
    count: number = 1
  ) => {
    setTodayLog((prev) => {
      const key = `${type}Count` as keyof typeof prev;
      return {
        ...prev,
        [key]: (prev[key] as number) + count,
      };
    });
    addXP(count * 5);
  };

  const upgradeToPremium = () => {
    updateProfile({ isPremium: true });
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // ignore
    }
  };

  const redeemGiftCode = async (code: string) => {
    const res = await EntitlementService.redeemGiftCode(profile.id, code);
    if (res.success) {
      updateProfile({ isPremium: true });
      await refreshEntitlements();
    }
    return res;
  };

  const upgradeSubscription = async (plan: 'PRO' | 'PREMIUM', billingCycle: BillingCycle = 'yearly') => {
    const res = await EntitlementService.activateSubscription(profile.id, plan, billingCycle);
    if (res.success) {
      updateProfile({ isPremium: true });
      await refreshEntitlements();
    }
    return res;
  };

  const login = (name: string, email?: string) => {
    updateProfile({
      name: name.trim() || 'Learner',
      email: email?.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@jlpt.study`,
    });
  };

  const register = (
    name: string,
    email?: string,
    targetLevel: UserProfile['targetLevel'] = 'N5'
  ) => {
    const freshProfile: UserProfile = {
      ...defaultProfile,
      name: name.trim() || 'New Learner',
      email: email?.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@jlpt.study`,
      targetLevel,
      currentLevel: targetLevel,
      xp: 0,
      level: 1,
      streakDays: 1,
    };
    setProfile(freshProfile);
    StorageService.saveProfile(freshProfile);
  };

  const logout = () => {
    if (isSupabaseConfigured()) {
      supabase.auth.signOut().catch(() => {});
    }
    const guest: UserProfile = {
      ...defaultProfile,
      name: 'Guest Learner',
      email: 'guest@jlpt.study',
      xp: 0,
      level: 1,
      streakDays: 1,
    };
    setProfile(guest);
    StorageService.saveProfile(guest);
    setIsCloudSynced(false);
    EntitlementService.clearCache();
    setEntitlements(DEFAULT_GUEST_ENTITLEMENTS);
  };

  // Calculate overall goal completion %
  const vocabGoalPct = Math.min(100, (todayLog.vocabCount / Math.max(1, profile.dailyGoalVocab)) * 100);
  const kanjiGoalPct = Math.min(100, (todayLog.kanjiCount / Math.max(1, profile.dailyGoalKanji)) * 100);
  const grammarGoalPct = Math.min(100, (todayLog.grammarCount / Math.max(1, profile.dailyGoalGrammar)) * 100);
  const readingGoalPct = Math.min(100, (todayLog.readingCount / Math.max(1, profile.dailyGoalReading)) * 100);
  const listeningGoalPct = Math.min(100, (todayLog.listeningCount / Math.max(1, profile.dailyGoalListening)) * 100);

  const todayProgressPercentage = Math.round(
    (vocabGoalPct + kanjiGoalPct + grammarGoalPct + readingGoalPct + listeningGoalPct) / 5
  );

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        addXP,
        completedLessons,
        completeLesson,
        todayLog,
        logActivity,
        todayProgressPercentage,
        upgradeToPremium,
        login,
        register,
        logout,
        isCloudSynced,
        entitlements,
        isGuest,
        guestSavePromptOpen,
        setGuestSavePromptOpen,
        refreshEntitlements,
        redeemGiftCode,
        upgradeSubscription,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

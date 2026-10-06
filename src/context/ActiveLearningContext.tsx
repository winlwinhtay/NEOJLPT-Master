import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ActiveDailyPlan,
  ActiveLearningConfig,
  ActiveSkillType,
  ConfusionPair,
  LearnerActiveProfile,
  LearningPlanItem,
} from '../types/activeLearning';
import { ActiveLearningService } from '../services/activeLearningService';
import { ActiveLearningEngine } from '../services/activeLearningEngine';
import { useUser } from './UserContext';
import { useSRS } from './SRSContext';
import { useApp } from './AppContext';

interface ActiveLearningContextType {
  dailyPlan: ActiveDailyPlan | null;
  learnerProfile: LearnerActiveProfile;
  loading: boolean;
  activeItemIndex: number;
  activeSessionItem: LearningPlanItem | null;
  isSessionActive: boolean;
  detectedConfusions: ConfusionPair[];
  config: ActiveLearningConfig;
  refreshPlan: (forceRefresh?: boolean) => Promise<void>;
  startTodaySession: () => void;
  startItemSession: (itemId: string) => void;
  completeCurrentItem: (correct: boolean) => void;
  closeSession: () => void;
  logLearningError: (
    contentId: string,
    contentType: string,
    errorType: string,
    incorrect: string,
    correct: string,
    explanation?: string
  ) => void;
  setStudyDuration: (minutes: 30 | 60 | 90 | 120) => void;
  updateConfig: (config: Partial<ActiveLearningConfig>) => void;
  recalculateMissedDays: (missedDays: number) => void;
}

const ActiveLearningContext = createContext<ActiveLearningContextType | undefined>(undefined);

export const ActiveLearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, addXP } = useUser();
  const { srsItems } = useSRS();
  const { activeLevel } = useApp();

  const [learnerProfile, setLearnerProfile] = useState<LearnerActiveProfile>(() => {
    return ActiveLearningService.loadLearnerProfile(profile.id, activeLevel);
  });

  const [dailyPlan, setDailyPlan] = useState<ActiveDailyPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [config, setConfigState] = useState<ActiveLearningConfig>(() =>
    ActiveLearningService.getConfig()
  );

  // Sync level changes with learner profile
  useEffect(() => {
    if (learnerProfile.currentLevel !== activeLevel) {
      const updated: LearnerActiveProfile = {
        ...learnerProfile,
        currentLevel: activeLevel,
        targetLevel: activeLevel,
      };
      setLearnerProfile(updated);
      ActiveLearningService.saveLearnerProfile(updated);
    }
  }, [activeLevel]);

  // Load daily plan
  const refreshPlan = useCallback(
    async (forceRefresh: boolean = false) => {
      setLoading(true);
      try {
        const plan = await ActiveLearningService.getDailyPlan(learnerProfile, srsItems, forceRefresh);
        setDailyPlan(plan);
      } catch (e) {
        console.error('Error refreshing active learning plan', e);
      } finally {
        setLoading(false);
      }
    },
    [learnerProfile, srsItems]
  );

  useEffect(() => {
    refreshPlan();
  }, [learnerProfile.currentLevel, learnerProfile.minutesPerDay]);

  // Detected confusions
  const detectedConfusions = ActiveLearningEngine.detectConfusions(
    learnerProfile.recentErrors || [],
    activeLevel
  );

  const startTodaySession = () => {
    if (!dailyPlan || dailyPlan.items.length === 0) return;
    // Find first non-completed item or start from 0
    const firstPendingIndex = dailyPlan.items.findIndex((i) => i.status === 'pending');
    setActiveItemIndex(firstPendingIndex >= 0 ? firstPendingIndex : 0);
    setIsSessionActive(true);
  };

  const startItemSession = (itemId: string) => {
    if (!dailyPlan) return;
    const idx = dailyPlan.items.findIndex((i) => i.id === itemId);
    if (idx >= 0) {
      setActiveItemIndex(idx);
      setIsSessionActive(true);
    }
  };

  const closeSession = () => {
    setIsSessionActive(false);
  };

  const completeCurrentItem = (correct: boolean) => {
    if (!dailyPlan) return;
    const currentItem = dailyPlan.items[activeItemIndex];
    if (!currentItem) return;

    // Update mastery
    ActiveLearningService.updateMastery(
      learnerProfile.userId,
      currentItem.contentId,
      currentItem.contentType === 'confusion' ? 'grammar' : (currentItem.contentType as any),
      correct
    );

    // Mark plan item completed
    const updatedPlan = ActiveLearningService.markItemCompleted(
      dailyPlan.id,
      currentItem.id,
      currentItem.minutes
    );
    if (updatedPlan) {
      setDailyPlan({ ...updatedPlan });
    }

    // Award XP
    const earnedXP = correct ? 25 : 10;
    addXP(earnedXP);

    // Advance to next pending item if available
    const nextIdx = activeItemIndex + 1;
    if (nextIdx < dailyPlan.items.length) {
      setActiveItemIndex(nextIdx);
    } else {
      // Finished all items!
      setIsSessionActive(false);
    }
  };

  const logLearningError = (
    contentId: string,
    contentType: string,
    errorType: string,
    incorrect: string,
    correct: string,
    explanation?: string
  ) => {
    ActiveLearningService.recordError({
      userId: learnerProfile.userId,
      contentId,
      contentType,
      errorType,
      incorrectAnswer: incorrect,
      correctAnswer: correct,
      explanation,
    });
    // Reload profile errors
    const updatedProfile = ActiveLearningService.loadLearnerProfile(learnerProfile.userId, activeLevel);
    setLearnerProfile(updatedProfile);
  };

  const setStudyDuration = (minutes: 30 | 60 | 90 | 120) => {
    const updated: LearnerActiveProfile = {
      ...learnerProfile,
      minutesPerDay: minutes,
    };
    setLearnerProfile(updated);
    ActiveLearningService.saveLearnerProfile(updated);
  };

  const updateConfig = (newConfig: Partial<ActiveLearningConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfigState(updated);
    ActiveLearningService.saveConfig(updated);
  };

  const recalculateMissedDays = (missedDays: number) => {
    if (!dailyPlan) return;
    const adapted = ActiveLearningEngine.handleMissedDayAdaptation(dailyPlan, missedDays);
    setDailyPlan(adapted);
  };

  const activeSessionItem =
    dailyPlan && dailyPlan.items[activeItemIndex] ? dailyPlan.items[activeItemIndex] : null;

  return (
    <ActiveLearningContext.Provider
      value={{
        dailyPlan,
        learnerProfile,
        loading,
        activeItemIndex,
        activeSessionItem,
        isSessionActive,
        detectedConfusions,
        config,
        refreshPlan,
        startTodaySession,
        startItemSession,
        completeCurrentItem,
        closeSession,
        logLearningError,
        setStudyDuration,
        updateConfig,
        recalculateMissedDays,
      }}
    >
      {children}
    </ActiveLearningContext.Provider>
  );
};

export const useActiveLearning = (): ActiveLearningContextType => {
  const context = useContext(ActiveLearningContext);
  if (!context) {
    throw new Error('useActiveLearning must be used within an ActiveLearningProvider');
  }
  return context;
};

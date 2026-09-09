import React, { createContext, useContext, useState, useEffect } from 'react';
import { JLPTLevel, MasteryStatus, UserSRSProgress } from '../types';
import { SRSRating, SRSService } from '../services/srsService';
import { StorageService } from '../services/storageService';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { KANJI_DATA } from '../data/kanjiData';
import { GRAMMAR_DATA } from '../data/grammarData';

interface SRSContextType {
  srsItems: UserSRSProgress[];
  rateItem: (
    itemId: string,
    itemType: 'vocab' | 'kanji' | 'grammar',
    level: JLPTLevel,
    rating: SRSRating
  ) => void;
  toggleFavorite: (itemId: string, itemType: 'vocab' | 'kanji' | 'grammar', level: JLPTLevel) => void;
  getItemProgress: (itemId: string) => UserSRSProgress | undefined;
  getDueTodayCount: (level?: JLPTLevel) => number;
  getCountsByStatus: (level?: JLPTLevel) => Record<MasteryStatus, number>;
  resetSRS: () => void;
}

const SRSContext = createContext<SRSContextType | undefined>(undefined);

export const SRSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [srsItems, setSrsItems] = useState<UserSRSProgress[]>(() => {
    const saved = StorageService.loadSRSProgress();
    if (saved && saved.length > 0) {
      return saved;
    }
    // Initialize sample starter states for N5 items
    const initial: UserSRSProgress[] = [];
    VOCABULARY_DATA.slice(0, 15).forEach((v, idx) => {
      initial.push({
        itemId: v.id,
        itemType: 'vocab',
        level: v.level,
        status: idx < 6 ? 'mastered' : idx < 10 ? 'review' : 'learning',
        interval: idx < 6 ? 30 : idx < 10 ? 7 : 1,
        easeFactor: 2.5,
        repetitionCount: idx < 6 ? 4 : idx < 10 ? 2 : 1,
        dueDate: new Date(Date.now() - (idx % 2 === 0 ? 3600000 : -86400000)).toISOString(),
        lastReviewed: new Date().toISOString(),
        wrongCount: idx === 8 ? 2 : 0,
        correctCount: idx < 6 ? 4 : 2,
        isFavorite: idx === 0 || idx === 3,
      });
    });

    KANJI_DATA.slice(0, 10).forEach((k, idx) => {
      initial.push({
        itemId: k.id,
        itemType: 'kanji',
        level: k.level,
        status: idx < 4 ? 'mastered' : idx < 7 ? 'review' : 'learning',
        interval: idx < 4 ? 25 : 3,
        easeFactor: 2.5,
        repetitionCount: idx < 4 ? 3 : 1,
        dueDate: new Date().toISOString(),
        lastReviewed: new Date().toISOString(),
        wrongCount: 0,
        correctCount: 3,
        isFavorite: idx === 1,
      });
    });

    return initial;
  });

  useEffect(() => {
    StorageService.saveSRSProgress(srsItems);
  }, [srsItems]);

  const getItemProgress = (itemId: string): UserSRSProgress | undefined => {
    return srsItems.find((i) => i.itemId === itemId);
  };

  const rateItem = (
    itemId: string,
    itemType: 'vocab' | 'kanji' | 'grammar',
    level: JLPTLevel,
    rating: SRSRating
  ) => {
    setSrsItems((prev) => {
      const existing = prev.find((i) => i.itemId === itemId);
      const current = existing || SRSService.createInitialProgress(itemId, itemType, level);
      const updated = SRSService.calculateNextReview(current, rating);

      const filtered = prev.filter((i) => i.itemId !== itemId);
      return [...filtered, updated];
    });
  };

  const toggleFavorite = (itemId: string, itemType: 'vocab' | 'kanji' | 'grammar', level: JLPTLevel) => {
    setSrsItems((prev) => {
      const existing = prev.find((i) => i.itemId === itemId);
      if (existing) {
        return prev.map((i) => (i.itemId === itemId ? { ...i, isFavorite: !i.isFavorite } : i));
      } else {
        const fresh = SRSService.createInitialProgress(itemId, itemType, level);
        fresh.isFavorite = true;
        return [...prev, fresh];
      }
    });
  };

  const getDueTodayCount = (level?: JLPTLevel): number => {
    const now = new Date().toISOString();
    return srsItems.filter((i) => (!level || i.level === level) && i.status !== 'new' && i.dueDate <= now)
      .length;
  };

  const getCountsByStatus = (level?: JLPTLevel): Record<MasteryStatus, number> => {
    const counts: Record<MasteryStatus, number> = {
      new: 0,
      learning: 0,
      review: 0,
      mastered: 0,
    };
    srsItems.forEach((item) => {
      if (!level || item.level === level) {
        counts[item.status] = (counts[item.status] || 0) + 1;
      }
    });
    return counts;
  };

  const resetSRS = () => {
    setSrsItems([]);
  };

  return (
    <SRSContext.Provider
      value={{
        srsItems,
        rateItem,
        toggleFavorite,
        getItemProgress,
        getDueTodayCount,
        getCountsByStatus,
        resetSRS,
      }}
    >
      {children}
    </SRSContext.Provider>
  );
};

export const useSRS = () => {
  const context = useContext(SRSContext);
  if (!context) {
    throw new Error('useSRS must be used within an SRSProvider');
  }
  return context;
};

import { JLPTLevel, UserProfile, UserSRSProgress, LessonDetail } from '../types';
import {
  StudyPlan,
  DailyStudyTask,
  DailyStudyPlan,
  StudyPhaseDetail,
  StudyPhaseType,
  StudyTaskType,
  Weekday,
  StudyIntensity,
  CurriculumPlannerConfig,
  JLPTReadinessScore,
  CatchUpStatus,
} from '../types/studyPlan';
import { StorageService } from './storageService';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { KANJI_DATA } from '../data/kanjiData';
import { GRAMMAR_DATA } from '../data/grammarData';
import { READING_DATA } from '../data/readingData';
import { LISTENING_DATA } from '../data/listeningData';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { MOCK_TESTS } from '../data/mockTestData';
import { LESSON_ROADMAP, JLPT_LEVELS } from '../data/jlptLevels';

export const DEFAULT_CURRICULUM_CONFIG: CurriculumPlannerConfig = {
  durations: {
    vocabNewMinutes: 2.5,
    vocabReviewMinutes: 0.75,
    kanjiNewMinutes: 3.5,
    kanjiReviewMinutes: 1.0,
    grammarBasicMinutes: 5.0,
    grammarComplexMinutes: 8.0,
    readingShortMinutes: 8.0,
    readingMediumMinutes: 14.0,
    readingLongMinutes: 20.0,
    listeningMinutes: 8.0,
    practicePerQuestionMinutes: 1.5,
    mockSectionMinutes: 30.0,
    mockFullBufferMinutes: 30.0,
  },
  difficultyMultipliers: {
    1: 1.0,
    2: 1.15,
    3: 1.3,
    4: 1.5,
    5: 1.8,
  },
  intensityMultipliers: {
    relaxed: { workloadMultiplier: 0.85, reviewRatio: 0.4 },
    balanced: { workloadMultiplier: 1.0, reviewRatio: 0.25 },
    intensive: { workloadMultiplier: 1.25, reviewRatio: 0.15 },
  },
  levelTargetHours: {
    N5: 150,
    N4: 200,
    N3: 300,
    N2: 450,
    N1: 600,
  },
  phaseWeights: {
    foundation: 0.15,
    core_curriculum: 0.45,
    integrated_practice: 0.2,
    exam_preparation: 0.15,
    final_review: 0.05,
  },
};

const LEVEL_ORDER: (JLPTLevel | 'beginner')[] = ['beginner', 'N5', 'N4', 'N3', 'N2', 'N1'];

export class StudyPlannerService {
  /**
   * Load current curriculum config, falling back to defaults.
   */
  public static getConfig(): CurriculumPlannerConfig {
    return StorageService.loadCurriculumConfig() || DEFAULT_CURRICULUM_CONFIG;
  }

  /**
   * Calculate total weekly study capacity in minutes.
   */
  public static calculateWeeklyCapacity(
    daysPerWeek: number,
    dailyMinutes: number,
    customDayMinutes?: Partial<Record<Weekday, number>>,
    selectedDays: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri']
  ): number {
    if (customDayMinutes && Object.keys(customDayMinutes).length > 0) {
      return Object.values(customDayMinutes).reduce((acc, min) => acc + (min || 0), 0);
    }
    return daysPerWeek * dailyMinutes;
  }

  /**
   * Calculate the realistic total study hours required to reach target level.
   */
  public static calculateRequiredHours(
    currentLevel: JLPTLevel | 'beginner',
    targetLevel: JLPTLevel,
    intensity: StudyIntensity = 'balanced',
    config: CurriculumPlannerConfig = this.getConfig()
  ): number {
    const currentIdx = LEVEL_ORDER.indexOf(currentLevel);
    const targetIdx = LEVEL_ORDER.indexOf(targetLevel);

    if (currentIdx >= targetIdx) {
      // Learner is already at target level -> target mastery & mock prep
      const baseHours = config.levelTargetHours[targetLevel] * 0.35;
      return Math.round(baseHours);
    }

    let totalHours = 0;
    for (let i = currentIdx + 1; i <= targetIdx; i++) {
      const lvl = LEVEL_ORDER[i] as JLPTLevel;
      totalHours += config.levelTargetHours[lvl] || 200;
    }

    // Apply intensity workload adjustments
    const intensityData = config.intensityMultipliers[intensity] || config.intensityMultipliers.balanced;
    const adjusted = totalHours / intensityData.workloadMultiplier;
    return Math.round(adjusted);
  }

  /**
   * Calculate estimated weeks to completion.
   */
  public static calculateEstimatedWeeks(
    requiredHours: number,
    weeklyCapacityMinutes: number
  ): number {
    if (weeklyCapacityMinutes <= 0) return 52;
    const weeklyHours = weeklyCapacityMinutes / 60;
    const weeks = Math.ceil(requiredHours / weeklyHours);
    return Math.max(2, Math.min(weeks, 150)); // Clamp between 2 weeks and 3 years
  }

  /**
   * Generate Phased Curriculum details (Phase 1 to 5).
   */
  public static generatePhases(
    targetLevel: JLPTLevel,
    totalWeeks: number,
    config: CurriculumPlannerConfig = this.getConfig()
  ): StudyPhaseDetail[] {
    const weights = config.phaseWeights;
    const p1Weeks = Math.max(1, Math.round(totalWeeks * weights.foundation));
    const p2Weeks = Math.max(2, Math.round(totalWeeks * weights.core_curriculum));
    const p3Weeks = Math.max(1, Math.round(totalWeeks * weights.integrated_practice));
    const p4Weeks = Math.max(1, Math.round(totalWeeks * weights.exam_preparation));
    const p5Weeks = Math.max(1, totalWeeks - (p1Weeks + p2Weeks + p3Weeks + p4Weeks));

    const phases: StudyPhaseDetail[] = [
      {
        id: 'phase-1',
        type: 'foundation',
        phaseNumber: 1,
        title: 'Phase 1: Foundation & Core Mechanics',
        description: `Solidify essential ${targetLevel} vocabulary seeds, foundational kana/kanji, and basic sentence construction.`,
        startWeek: 1,
        endWeek: p1Weeks,
        completed: false,
        isCurrent: true,
        percentageProgress: 0,
      },
      {
        id: 'phase-2',
        type: 'core_curriculum',
        phaseNumber: 2,
        title: 'Phase 2: Comprehensive Core Curriculum',
        description: `Deep systematic mastery of all ${targetLevel} grammar points, vocabulary expansion, and reading passages.`,
        startWeek: p1Weeks + 1,
        endWeek: p1Weeks + p2Weeks,
        completed: false,
        isCurrent: false,
        percentageProgress: 0,
      },
      {
        id: 'phase-3',
        type: 'integrated_practice',
        phaseNumber: 3,
        title: 'Phase 3: Integrated Context & Speed',
        description: 'Contextual reading under time pressure, fast native dialogue listening, and nuanced grammar comparison.',
        startWeek: p1Weeks + p2Weeks + 1,
        endWeek: p1Weeks + p2Weeks + p3Weeks,
        completed: false,
        isCurrent: false,
        percentageProgress: 0,
      },
      {
        id: 'phase-4',
        type: 'exam_preparation',
        phaseNumber: 4,
        title: 'Phase 4: Official Simulation & Mock Exams',
        description: `Full-length timed ${targetLevel} simulation exams, detailed diagnostic reviews, and test stamina building.`,
        startWeek: p1Weeks + p2Weeks + p3Weeks + 1,
        endWeek: p1Weeks + p2Weeks + p3Weeks + p4Weeks,
        completed: false,
        isCurrent: false,
        percentageProgress: 0,
      },
      {
        id: 'phase-5',
        type: 'final_review',
        phaseNumber: 5,
        title: 'Phase 5: High-Yield Final Polish',
        description: 'Targeted remediation of past mistakes, high-yield grammar review, and confidence mastery before exam day.',
        startWeek: p1Weeks + p2Weeks + p3Weeks + p4Weeks + 1,
        endWeek: totalWeeks,
        completed: false,
        isCurrent: false,
        percentageProgress: 0,
      },
    ];

    return phases;
  }

  /**
   * Create a new personalized StudyPlan object.
   */
  public static createStudyPlan(params: {
    currentLevel: JLPTLevel | 'beginner';
    targetLevel: JLPTLevel;
    daysPerWeek: number;
    selectedDays: Weekday[];
    dailyMinutes: number;
    customDayMinutes?: Partial<Record<Weekday, number>>;
    intensity: StudyIntensity;
    targetExamDate?: string;
  }): StudyPlan {
    const config = this.getConfig();
    const weeklyCapacity = this.calculateWeeklyCapacity(
      params.daysPerWeek,
      params.dailyMinutes,
      params.customDayMinutes,
      params.selectedDays
    );

    const requiredHours = this.calculateRequiredHours(
      params.currentLevel,
      params.targetLevel,
      params.intensity,
      config
    );

    let estimatedWeeks = this.calculateEstimatedWeeks(requiredHours, weeklyCapacity);

    // If learner specified a target exam date, check weeks remaining
    if (params.targetExamDate) {
      const examTime = new Date(params.targetExamDate).getTime();
      const now = Date.now();
      const diffWeeks = Math.max(2, Math.round((examTime - now) / (1000 * 60 * 60 * 24 * 7)));
      // If exam is closer than calculated, preserve the exam deadline and adjust workload
      estimatedWeeks = diffWeeks;
    }

    const today = new Date();
    const completionDate = new Date(today.getTime() + estimatedWeeks * 7 * 24 * 60 * 60 * 1000);
    const estimatedCompletionDate = completionDate.toISOString().split('T')[0];

    const phases = this.generatePhases(params.targetLevel, estimatedWeeks, config);

    const readiness: JLPTReadinessScore = {
      overall: 12,
      vocabulary: 15,
      kanji: 10,
      grammar: 12,
      reading: 10,
      listening: 10,
      mockTestReadiness: 0,
      recommendedFocus: 'Build initial vocabulary & kanji foundations',
    };

    const catchUp: CatchUpStatus = {
      isBehind: false,
      missedDaysCount: 0,
      missedMinutesCount: 0,
      catchUpMode: 'normal',
      message: "You're on track with your study schedule.",
    };

    const newPlan: StudyPlan = {
      id: `plan-${Date.now()}`,
      currentLevel: params.currentLevel,
      targetLevel: params.targetLevel,
      daysPerWeek: params.daysPerWeek,
      selectedDays: params.selectedDays,
      dailyMinutes: params.dailyMinutes,
      customDayMinutes: params.customDayMinutes,
      totalWeeklyMinutes: weeklyCapacity,
      intensity: params.intensity,
      targetExamDate: params.targetExamDate,
      startDate: today.toISOString().split('T')[0],
      estimatedWeeks,
      estimatedCompletionDate,
      currentPhase: 'foundation',
      phases,
      currentWeek: 1,
      lastActiveDate: today.toISOString().split('T')[0],
      readiness,
      catchUp,
      completedTaskIds: [],
    };

    StorageService.saveStudyPlan(newPlan);
    return newPlan;
  }

  /**
   * Generate "Today's Study Plan" package.
   * Dynamically time-boxes tasks, rotates subjects, and pulls high-priority content.
   */
  public static generateTodayPackage(
    plan: StudyPlan,
    srsItems: UserSRSProgress[] = [],
    completedLessonIds: string[] = [],
    recentMistakes: any[] = []
  ): DailyStudyPlan {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const weekdayMap: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentWeekday = weekdayMap[today.getDay()];

    const isStudyDay = plan.selectedDays.includes(currentWeekday);
    const allocatedMinutes =
      plan.customDayMinutes && plan.customDayMinutes[currentWeekday] !== undefined
        ? plan.customDayMinutes[currentWeekday]!
        : isStudyDay
        ? plan.dailyMinutes
        : 0;

    if (!isStudyDay || allocatedMinutes <= 0) {
      return {
        date: todayStr,
        dayOfWeek: currentWeekday,
        allocatedMinutes: 0,
        isRestDay: true,
        tasks: [],
        completed: false,
        completedMinutes: 0,
        xpEarned: 0,
      };
    }

    // Select subject rotation based on weekday to avoid cognitive fatigue
    const rotationSchedule: Record<Weekday, StudyTaskType[]> = {
      mon: ['vocab_review', 'vocab_new', 'grammar', 'reading'],
      tue: ['kanji', 'grammar', 'listening', 'practice'],
      wed: ['vocab_new', 'reading', 'listening', 'mistake_review'],
      thu: ['kanji', 'grammar', 'reading', 'vocab_review'],
      fri: ['vocab_new', 'listening', 'practice', 'grammar'],
      sat: ['mock_section', 'mistake_review', 'kanji'],
      sun: ['vocab_review', 'reading', 'practice'],
    };

    const rotation = rotationSchedule[currentWeekday] || ['vocab_new', 'grammar', 'reading'];
    const targetLvl = plan.targetLevel;

    // Filter available content
    const levelVocab = VOCABULARY_DATA.filter((v) => v.level === targetLvl);
    const levelKanji = KANJI_DATA.filter((k) => k.level === targetLvl);
    const levelGrammar = GRAMMAR_DATA.filter((g) => g.level === targetLvl);
    const levelReading = READING_DATA.filter((r) => r.level === targetLvl);
    const levelListening = LISTENING_DATA.filter((l) => l.level === targetLvl);
    const levelPractice = PRACTICE_QUESTIONS.filter((q) => q.level === targetLvl);

    // Overdue SRS count
    const nowISO = new Date().toISOString();
    const overdueSRS = srsItems.filter((i) => i.dueDate <= nowISO);

    const tasks: DailyStudyTask[] = [];
    let remainingMinutes = allocatedMinutes;

    // Task 1: Vocabulary Review / SRS (High Priority)
    if (rotation.includes('vocab_review') && remainingMinutes >= 8) {
      const dur = Math.min(12, Math.max(5, Math.round(allocatedMinutes * 0.2)));
      const count = overdueSRS.filter((i) => i.itemType === 'vocab').length || 10;
      tasks.push({
        id: `task-vocab-rev-${todayStr}`,
        type: 'vocab_review',
        title: 'Vocabulary Spaced Review',
        subtitle: `Review ${count} overdue & high-yield flashcards`,
        durationMinutes: dur,
        targetLevel: targetLvl,
        completed: plan.completedTaskIds.includes(`task-vocab-rev-${todayStr}`),
        priorityScore: 90 + (overdueSRS.length > 0 ? 10 : 0),
        difficulty: 2,
      });
      remainingMinutes -= dur;
    }

    // Task 2: Grammar Target Mastery
    if (rotation.includes('grammar') && remainingMinutes >= 12) {
      const dur = Math.min(18, Math.max(10, Math.round(allocatedMinutes * 0.28)));
      // Pick next uncompleted grammar pattern
      const sampleGrammar = levelGrammar[Math.floor(Math.random() * levelGrammar.length)] || levelGrammar[0];
      tasks.push({
        id: `task-grammar-${todayStr}`,
        type: 'grammar',
        title: `Grammar: ${sampleGrammar?.pattern || 'Core Pattern'}`,
        subtitle: sampleGrammar?.meaning || 'Structure & context usage',
        durationMinutes: dur,
        targetId: sampleGrammar?.id,
        targetLevel: targetLvl,
        completed: plan.completedTaskIds.includes(`task-grammar-${todayStr}`),
        priorityScore: 85,
        difficulty: sampleGrammar?.difficulty || 3,
        contentData: sampleGrammar,
      });
      remainingMinutes -= dur;
    }

    // Task 3: Kanji Mastery
    if (rotation.includes('kanji') && remainingMinutes >= 8) {
      const dur = Math.min(10, Math.max(5, Math.round(allocatedMinutes * 0.18)));
      const sampleKanji = levelKanji[Math.floor(Math.random() * levelKanji.length)] || levelKanji[0];
      tasks.push({
        id: `task-kanji-${todayStr}`,
        type: 'kanji',
        title: `Kanji: ${sampleKanji?.kanji || 'Key Kanji'}`,
        subtitle: `${sampleKanji?.meaning || 'Readings & Stroke Order'} (${sampleKanji?.onyomi?.[0] || ''})`,
        durationMinutes: dur,
        targetId: sampleKanji?.id,
        targetLevel: targetLvl,
        completed: plan.completedTaskIds.includes(`task-kanji-${todayStr}`),
        priorityScore: 80,
        difficulty: 2,
        contentData: sampleKanji,
      });
      remainingMinutes -= dur;
    }

    // Task 4: Reading Comprehension
    if (rotation.includes('reading') && remainingMinutes >= 10) {
      const dur = Math.min(15, Math.max(8, Math.round(allocatedMinutes * 0.25)));
      const sampleReading = levelReading[0] || READING_DATA[0];
      tasks.push({
        id: `task-reading-${todayStr}`,
        type: 'reading',
        title: `Reading: ${sampleReading?.title || 'Daily Passage'}`,
        subtitle: `${sampleReading?.topic || 'Comprehension passage'} (${sampleReading?.length || 'short'})`,
        durationMinutes: dur,
        targetId: sampleReading?.id,
        targetLevel: targetLvl,
        completed: plan.completedTaskIds.includes(`task-reading-${todayStr}`),
        priorityScore: 78,
        difficulty: 3,
        contentData: sampleReading,
      });
      remainingMinutes -= dur;
    }

    // Task 5: Listening Audio Practice
    if (rotation.includes('listening') && remainingMinutes >= 8) {
      const dur = Math.min(12, Math.max(8, Math.round(allocatedMinutes * 0.2)));
      const sampleListening = levelListening[0] || LISTENING_DATA[0];
      tasks.push({
        id: `task-listening-${todayStr}`,
        type: 'listening',
        title: `Listening: ${sampleListening?.title || 'Dialogue Comprehension'}`,
        subtitle: sampleListening?.situation || 'Authentic native audio',
        durationMinutes: dur,
        targetId: sampleListening?.id,
        targetLevel: targetLvl,
        completed: plan.completedTaskIds.includes(`task-listening-${todayStr}`),
        priorityScore: 75,
        difficulty: 3,
        contentData: sampleListening,
      });
      remainingMinutes -= dur;
    }

    // Task 6: Mistake Review / High-Yield Practice (to consume remaining minutes)
    if (remainingMinutes >= 5) {
      const dur = remainingMinutes;
      tasks.push({
        id: `task-mistake-${todayStr}`,
        type: 'mistake_review',
        title: 'Error Reflection & Practice',
        subtitle: `Strengthen ${recentMistakes.length || 5} tricky question patterns`,
        durationMinutes: dur,
        targetLevel: targetLvl,
        completed: plan.completedTaskIds.includes(`task-mistake-${todayStr}`),
        priorityScore: 70,
        difficulty: 2,
      });
      remainingMinutes = 0;
    }

    const completedTasks = tasks.filter((t) => t.completed);
    const completedMinutes = completedTasks.reduce((acc, t) => acc + t.durationMinutes, 0);

    return {
      date: todayStr,
      dayOfWeek: currentWeekday,
      allocatedMinutes,
      isRestDay: false,
      tasks,
      completed: tasks.length > 0 && tasks.every((t) => t.completed),
      completedMinutes,
      xpEarned: completedTasks.length * 35,
    };
  }

  /**
   * Recalculate and update JLPT Readiness Score.
   */
  public static calculateReadiness(
    plan: StudyPlan,
    completedLessonIds: string[] = [],
    srsItems: UserSRSProgress[] = [],
    recentMistakes: any[] = []
  ): JLPTReadinessScore {
    const targetLvl = plan.targetLevel;
    const units = LESSON_ROADMAP[targetLvl] || [];
    const totalLessons = units.reduce((acc, u) => acc + u.lessons.length, 0) || 1;
    const completedForLevel = units.reduce((acc, u) => {
      const comp = u.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
      return acc + comp;
    }, 0);

    const lessonRatio = completedForLevel / totalLessons;
    const levelSRS = srsItems.filter((i) => i.level === targetLvl);
    const masteredCount = levelSRS.filter((i) => i.status === 'mastered').length;
    const srsRatio = Math.min(1, masteredCount / (targetLvl === 'N5' ? 80 : targetLvl === 'N4' ? 150 : 250));

    const vocabScore = Math.min(95, Math.round(lessonRatio * 50 + srsRatio * 45 + 10));
    const kanjiScore = Math.min(95, Math.round(lessonRatio * 45 + srsRatio * 45 + 8));
    const grammarScore = Math.min(95, Math.round(lessonRatio * 60 + srsRatio * 30 + 10));
    const readingScore = Math.min(90, Math.round(lessonRatio * 55 + 12));
    const listeningScore = Math.min(90, Math.round(lessonRatio * 50 + 15));

    const overall = Math.round(
      vocabScore * 0.2 +
        kanjiScore * 0.15 +
        grammarScore * 0.25 +
        readingScore * 0.2 +
        listeningScore * 0.2
    );

    const mockReadiness = Math.round(overall * 0.85);

    let focus = 'Vocabulary & Kanji Foundations';
    if (grammarScore < vocabScore && grammarScore < readingScore) {
      focus = 'Focus on Grammar Nuance & Particle Accuracy';
    } else if (readingScore < 65) {
      focus = 'Focus on Timed Reading Passage Comprehension';
    } else if (listeningScore < 65) {
      focus = 'Focus on Listening Dialogue Speed & Question Traps';
    } else if (overall >= 75) {
      focus = 'Full-length Mock Exam Endurance & Timed Section Practice';
    }

    return {
      overall,
      vocabulary: vocabScore,
      kanji: kanjiScore,
      grammar: grammarScore,
      reading: readingScore,
      listening: listeningScore,
      mockTestReadiness: mockReadiness,
      recommendedFocus: focus,
    };
  }

  /**
   * Diagnostic Placement Test Evaluator (10-question rule-based test).
   */
  public static evaluateDiagnosticTest(answers: Record<string, number>, questions: any[]): {
    score: number;
    recommendedLevel: JLPTLevel | 'beginner';
    levelScores: Record<JLPTLevel, { correct: number; total: number }>;
    summary: string;
  } {
    const levelScores: Record<JLPTLevel, { correct: number; total: number }> = {
      N5: { correct: 0, total: 0 },
      N4: { correct: 0, total: 0 },
      N3: { correct: 0, total: 0 },
      N2: { correct: 0, total: 0 },
      N1: { correct: 0, total: 0 },
    };

    let totalCorrect = 0;

    questions.forEach((q) => {
      const lvl = (q.level as JLPTLevel) || 'N5';
      if (levelScores[lvl]) {
        levelScores[lvl].total++;
        if (answers[q.id] === q.correctAnswer) {
          levelScores[lvl].correct++;
          totalCorrect++;
        }
      }
    });

    let recommended: JLPTLevel | 'beginner' = 'beginner';
    let summary = 'Start with the fundamental N5 Japanese curriculum.';

    if (totalCorrect >= 9 && levelScores.N1.correct >= 1) {
      recommended = 'N1';
      summary = 'Excellent proficiency! You have advanced Japanese ability suited for JLPT N1.';
    } else if (totalCorrect >= 7 && levelScores.N2.correct >= 1) {
      recommended = 'N2';
      summary = 'Solid intermediate grasp! You are ready to tackle pre-advanced JLPT N2.';
    } else if (totalCorrect >= 5 && levelScores.N3.correct >= 1) {
      recommended = 'N3';
      summary = 'Good foundational command! Intermediate JLPT N3 is your optimal starting point.';
    } else if (totalCorrect >= 3 && levelScores.N4.correct >= 1) {
      recommended = 'N4';
      summary = 'You have mastered basic concepts. JLPT N4 is recommended for your next step.';
    } else if (totalCorrect >= 1) {
      recommended = 'N5';
      summary = 'Familiar with basic Japanese. Start at JLPT N5 to build strong mastery.';
    }

    return {
      score: totalCorrect,
      recommendedLevel: recommended,
      levelScores,
      summary,
    };
  }
}

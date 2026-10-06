import { JLPTLevel, UserSRSProgress } from '../types';
import {
  ActiveDailyPlan,
  ActiveSkillType,
  ConfusionPair,
  LearnerActiveProfile,
  LearningErrorRecord,
  LearningMasteryRecord,
  LearningPlanItem,
  PlanActivityType,
} from '../types/activeLearning';
import { VOCABULARY_DATA } from '../data/vocabularySeed';
import { KANJI_DATA } from '../data/kanjiSeed';
import { CANONICAL_GRAMMAR } from '../data/canonicalGrammarData';
import { READING_DATA } from '../data/readingData';
import { LISTENING_DATA } from '../data/listeningData';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { SPEAKING_EXERCISES } from '../data/speakingData';
import { CONFUSION_PAIRS_DATA } from '../data/confusionPairsData';

export class ActiveLearningEngine {
  /**
   * Calculate recommendation score for a curriculum item
   * priority = weakness + forgetting_risk + prerequisite_importance + exam_relevance + recent_mistakes + scheduled_review + progression - mastery - repetition
   */
  public static calculateItemPriority(params: {
    skill: ActiveSkillType;
    masteryScore: number; // 0 - 5
    skillProficiency: number; // 0 - 100
    isDueSRS: boolean;
    daysOverdue: number;
    hasRecentMistake: boolean;
    isPrerequisiteForNextUnit: boolean;
    isHighExamFrequency: boolean;
    isCurrentRoadmapTarget: boolean;
    timesPracticedThisWeek: number;
    daysToExam?: number;
  }): { priority: number; reason: string } {
    const {
      skill,
      masteryScore,
      skillProficiency,
      isDueSRS,
      daysOverdue,
      hasRecentMistake,
      isPrerequisiteForNextUnit,
      isHighExamFrequency,
      isCurrentRoadmapTarget,
      timesPracticedThisWeek,
      daysToExam,
    } = params;

    // 1. Weakness component (0 - 50): Learner's skill deficiency
    const weakness = Math.max(0, Math.round((100 - skillProficiency) * 0.5));

    // 2. Forgetting risk component (0 - 50): Higher if due/overdue
    let forgettingRisk = 0;
    if (isDueSRS) {
      forgettingRisk = 30 + Math.min(20, daysOverdue * 4);
    } else if (masteryScore >= 1 && masteryScore <= 3) {
      forgettingRisk = 15;
    }

    // 3. Prerequisite importance (0 - 25)
    const prerequisite = isPrerequisiteForNextUnit ? 25 : 0;

    // 4. Exam relevance (0 - 30) - Scales higher when exam is close
    let examRelevance = isHighExamFrequency ? 20 : 5;
    if (daysToExam !== undefined && daysToExam <= 30) {
      examRelevance += 15;
    }

    // 5. Recent mistakes penalty/boost (+40)
    const mistakeBoost = hasRecentMistake ? 40 : 0;

    // 6. Scheduled review boost (+35)
    const reviewBoost = isDueSRS ? 35 : 0;

    // 7. Curriculum progression (+30)
    const progressionBoost = isCurrentRoadmapTarget ? 30 : 0;

    // 8. Mastery deduction (-15 per mastery level)
    const masteryDeduction = masteryScore * 14;

    // 9. Repetition deduction (-12 per repetition this week)
    const repetitionDeduction = Math.min(36, timesPracticedThisWeek * 12);

    const rawPriority =
      weakness +
      forgettingRisk +
      prerequisite +
      examRelevance +
      mistakeBoost +
      reviewBoost +
      progressionBoost -
      masteryDeduction -
      repetitionDeduction;

    const priority = Math.max(5, Math.min(100, Math.round(rawPriority)));

    // Generate human-friendly pedagogical justification ("Why am I learning this?")
    let reason = `Recommended to advance your ${skill} curriculum path.`;
    if (hasRecentMistake) {
      reason = `Targeted remediation because you made recent mistakes with this ${skill} pattern.`;
    } else if (isDueSRS) {
      reason = `Scheduled review to prevent memory decay (optimal spaced repetition window).`;
    } else if (skillProficiency < 60) {
      reason = `Prioritized because ${skill} is currently your priority growth area (${skillProficiency}%).`;
    } else if (daysToExam !== undefined && daysToExam <= 14) {
      reason = `Essential high-frequency JLPT exam item for your upcoming test.`;
    } else if (isPrerequisiteForNextUnit) {
      reason = `Foundational prerequisite required for upcoming lessons.`;
    }

    return { priority, reason };
  }

  /**
   * Detect recurring confusions from learner's recent mistakes
   */
  public static detectConfusions(
    recentErrors: LearningErrorRecord[],
    level: JLPTLevel
  ): ConfusionPair[] {
    const errorTexts = recentErrors
      .map((e) => `${e.contentId} ${e.errorType} ${e.incorrectAnswer} ${e.correctAnswer} ${e.explanation || ''}`)
      .join(' ')
      .toLowerCase();

    return CONFUSION_PAIRS_DATA.filter((pair) => {
      // Filter by level compatibility
      const levelMatches = pair.level === level || (level === 'N5' && pair.level === 'N5');
      if (!levelMatches && level !== 'N1' && level !== 'N2') return false;

      // Check if any error mentions concept keywords
      const a = pair.conceptA.toLowerCase();
      const b = pair.conceptB.toLowerCase();
      const id = pair.id.toLowerCase();

      if (id === 'conf-ha-ga' && (errorTexts.includes('は') || errorTexts.includes('が') || errorTexts.includes('ha') || errorTexts.includes('ga'))) {
        return true;
      }
      if (id === 'conf-ni-de' && (errorTexts.includes('に') || errorTexts.includes('で') || errorTexts.includes('ni') || errorTexts.includes('de'))) {
        return true;
      }
      if (id === 'conf-kara-node' && (errorTexts.includes('から') || errorTexts.includes('ので') || errorTexts.includes('kara') || errorTexts.includes('node'))) {
        return true;
      }
      if (id === 'conf-sonkeigo-kenjougo' && (errorTexts.includes('尊敬') || errorTexts.includes('謙譲') || errorTexts.includes('keigo'))) {
        return true;
      }
      if (id === 'conf-kanji-mi-matsu' && (errorTexts.includes('未') || errorTexts.includes('末'))) {
        return true;
      }

      return false;
    });
  }

  /**
   * Generate an optimized Daily Study Plan using validated curriculum data
   */
  public static generateDailyPlan(
    profile: LearnerActiveProfile,
    srsProgress: UserSRSProgress[] = [],
    masteryRecords: LearningMasteryRecord[] = []
  ): ActiveDailyPlan {
    const todayStr = new Date().toISOString().split('T')[0];
    const targetMinutes = [30, 60, 90, 120].includes(profile.minutesPerDay)
      ? profile.minutesPerDay
      : 60;
    const level = profile.currentLevel;

    // Check Exam Mode (< 14 days)
    let daysToExam: number | undefined = undefined;
    let examModeActive = false;
    if (profile.examDate) {
      const examTime = new Date(profile.examDate).getTime();
      const nowTime = new Date().getTime();
      daysToExam = Math.ceil((examTime - nowTime) / (1000 * 60 * 60 * 24));
      if (daysToExam > 0 && daysToExam <= 14) {
        examModeActive = true;
      }
    }

    // Determine Skill Focus Order based on skill scores
    const skillProficiencies = profile.skillScores || {
      vocabulary: 80,
      kanji: 75,
      grammar: 65,
      reading: 60,
      listening: 50,
      speaking: 60,
      writing: 55,
    };

    // Sort skills by weakness ascending (lowest score = highest urgency)
    const sortedSkills = (Object.keys(skillProficiencies) as ActiveSkillType[]).sort(
      (a, b) => skillProficiencies[a] - skillProficiencies[b]
    );

    const primaryWeakSkill = sortedSkills[0]; // e.g. listening
    const secondaryWeakSkill = sortedSkills[1]; // e.g. grammar

    // Check for detected confusion pairs
    const detectedConfusions = this.detectConfusions(profile.recentErrors || [], level);

    // Build Time Budget Allocation based on minutes
    const planItems: LearningPlanItem[] = [];
    let allocatedMinutes = 0;
    let itemOrder = 0;

    // -------------------------------------------------------------
    // STEP 1: Warm-up & Review (Spaced Repetition / Error Remediation)
    // -------------------------------------------------------------
    const reviewMinutes = targetMinutes === 30 ? 6 : targetMinutes === 60 ? 10 : targetMinutes === 90 ? 15 : 20;

    // Check due SRS items
    const dueSRS = srsProgress.filter((s) => new Date(s.dueDate) <= new Date());
    const recentErrors = profile.recentErrors || [];

    if (detectedConfusions.length > 0) {
      const conf = detectedConfusions[0];
      planItems.push({
        id: `item-${itemOrder++}`,
        contentId: conf.id,
        contentType: 'confusion',
        skill: 'grammar',
        activity: 'confusion_review',
        minutes: reviewMinutes,
        priority: 95,
        reason: `Targeted remediation: You made errors distinguishing ${conf.title}.`,
        status: 'pending',
        orderIndex: planItems.length,
        title: `Confusion Review: ${conf.title}`,
        subtitle: 'Comparative Analysis & Active Contrast Practice',
        contentData: conf,
      });
      allocatedMinutes += reviewMinutes;
    } else if (recentErrors.length > 0) {
      const err = recentErrors[0];
      planItems.push({
        id: `item-${itemOrder++}`,
        contentId: err.contentId,
        contentType: 'grammar',
        skill: 'grammar',
        activity: 'guided_explanation',
        minutes: reviewMinutes,
        priority: 90,
        reason: `Error Recovery: Re-examining "${err.contentId}" after recent mistake.`,
        status: 'pending',
        orderIndex: planItems.length,
        title: `Mistake Remediation: ${err.contentId}`,
        subtitle: `Reviewing previous answer: "${err.incorrectAnswer}" → Correct: "${err.correctAnswer}"`,
        contentData: err,
      });
      allocatedMinutes += reviewMinutes;
    } else {
      // General Spaced Review
      const vocabCandidates = VOCABULARY_DATA.filter((v) => v.level === level);
      const sampleVocab = vocabCandidates[Math.floor(Math.random() * vocabCandidates.length)] || vocabCandidates[0];
      planItems.push({
        id: `item-${itemOrder++}`,
        contentId: sampleVocab ? sampleVocab.id : 'v-review-default',
        contentType: 'vocab',
        skill: 'vocabulary',
        activity: 'spaced_review',
        minutes: reviewMinutes,
        priority: 85,
        reason: `Scheduled Spaced Repetition: Reinforcing active recall before forgetting occurs.`,
        status: 'pending',
        orderIndex: planItems.length,
        title: `Spaced Review: ${sampleVocab ? sampleVocab.word : 'Vocabulary'}`,
        subtitle: sampleVocab ? `${sampleVocab.hiragana} (${sampleVocab.meaning})` : 'Daily SRS Flashcards',
        contentData: sampleVocab,
      });
      allocatedMinutes += reviewMinutes;
    }

    // -------------------------------------------------------------
    // STEP 2: Core Concept / Weak Skill Focus (e.g. Listening or Grammar)
    // -------------------------------------------------------------
    // If listening is weakest, boost listening. If grammar is weakest, boost grammar.
    if (primaryWeakSkill === 'listening' || skillProficiencies.listening < 60) {
      const listeningMinutes = targetMinutes === 30 ? 12 : targetMinutes === 60 ? 15 : targetMinutes === 90 ? 20 : 25;
      const listeningItems = LISTENING_DATA.filter((l) => l.level === level);
      const listeningItem = listeningItems[0] || LISTENING_DATA[0];

      planItems.push({
        id: `item-${itemOrder++}`,
        contentId: listeningItem ? listeningItem.id : 'l-n5-01',
        contentType: 'listening',
        skill: 'listening',
        activity: 'practice',
        minutes: listeningMinutes,
        priority: 92,
        reason: `Recommended because Listening is currently your priority growth area (${skillProficiencies.listening}%).`,
        status: 'pending',
        orderIndex: planItems.length,
        title: `Listening Drill: ${listeningItem ? listeningItem.title : 'Comprehension'}`,
        subtitle: listeningItem ? `${listeningItem.situation} • ${listeningItem.questionType}` : 'Audio dialogue comprehension',
        contentData: listeningItem,
      });
      allocatedMinutes += listeningMinutes;
    }

    // -------------------------------------------------------------
    // STEP 3: Grammar Concept / Structure
    // -------------------------------------------------------------
    if (allocatedMinutes < targetMinutes) {
      const grammarMinutes = targetMinutes === 30 ? 12 : targetMinutes === 60 ? 15 : targetMinutes === 90 ? 20 : 25;
      const grammarCandidates = CANONICAL_GRAMMAR.filter((g) => g.level === level);
      // Pick first uncompleted grammar item or first in level
      const uncompletedGrammar =
        grammarCandidates.find((g) => !profile.completedContent?.includes(g.id)) ||
        grammarCandidates[0] ||
        CANONICAL_GRAMMAR[0];

      planItems.push({
        id: `item-${itemOrder++}`,
        contentId: uncompletedGrammar ? uncompletedGrammar.id : 'g-n5-001',
        contentType: 'grammar',
        skill: 'grammar',
        activity: level === 'N5' ? 'concept_intro' : 'guided_explanation',
        minutes: Math.min(grammarMinutes, targetMinutes - allocatedMinutes),
        priority: 88,
        reason:
          level === 'N5'
            ? 'Essential N5 foundation: core sentence pattern & particle structure.'
            : level === 'N1'
            ? 'Advanced N1 syntactic distinction: formal written register and nuanced nuance.'
            : 'Core JLPT curriculum progression: Next validated grammar unit.',
        status: 'pending',
        orderIndex: planItems.length,
        title: `Grammar Focus: ${uncompletedGrammar ? uncompletedGrammar.pattern : 'Sentence Pattern'}`,
        subtitle: uncompletedGrammar ? `${uncompletedGrammar.meaning} (${uncompletedGrammar.structure})` : '',
        contentData: uncompletedGrammar,
      });
      allocatedMinutes += Math.min(grammarMinutes, targetMinutes - allocatedMinutes);
    }

    // -------------------------------------------------------------
    // STEP 4: Kanji or Reading Deepening (for 60+ min sessions)
    // -------------------------------------------------------------
    if (allocatedMinutes + 8 <= targetMinutes) {
      const remainingMinutes = targetMinutes - allocatedMinutes;
      const kanjiMinutes = Math.min(remainingMinutes >= 15 ? 12 : remainingMinutes, 15);

      const kanjiCandidates = KANJI_DATA.filter((k) => k.level === level);
      const uncompletedKanji =
        kanjiCandidates.find((k) => !profile.completedContent?.includes(k.id)) ||
        kanjiCandidates[0] ||
        KANJI_DATA[0];

      planItems.push({
        id: `item-${itemOrder++}`,
        contentId: uncompletedKanji ? uncompletedKanji.id : 'k-n5-01',
        contentType: 'kanji',
        skill: 'kanji',
        activity: 'guided_explanation',
        minutes: kanjiMinutes,
        priority: 80,
        reason: `Mastery progression: Stroke order verification and high-frequency reading compounds.`,
        status: 'pending',
        orderIndex: planItems.length,
        title: `Kanji Study: ${uncompletedKanji ? uncompletedKanji.kanji : '漢字'}`,
        subtitle: uncompletedKanji
          ? `${uncompletedKanji.meaning} • On: ${uncompletedKanji.onyomi.join(', ')} • Kun: ${uncompletedKanji.kunyomi.join(', ')}`
          : 'Stroke order & compounds',
        contentData: uncompletedKanji,
      });
      allocatedMinutes += kanjiMinutes;
    }

    // -------------------------------------------------------------
    // STEP 5: Reading or Speaking / Business (for 90+ / 120 min sessions)
    // -------------------------------------------------------------
    if (allocatedMinutes + 8 <= targetMinutes) {
      const remainingMinutes = targetMinutes - allocatedMinutes;
      const readingMinutes = Math.min(remainingMinutes, 15);

      const readingCandidates = READING_DATA.filter((r) => r.level === level);
      const readingItem = readingCandidates[0] || READING_DATA[0];

      if (readingItem) {
        planItems.push({
          id: `item-${itemOrder++}`,
          contentId: readingItem.id,
          contentType: 'reading',
          skill: 'reading',
          activity: 'application',
          minutes: readingMinutes,
          priority: 78,
          reason: `Reading immersion: Synthesizing grammar and vocabulary in authentic passage context.`,
          status: 'pending',
          orderIndex: planItems.length,
          title: `Reading Passage: ${readingItem.title}`,
          subtitle: `${readingItem.titleEn || 'Contextual Reading'} • ${readingItem.length} passage`,
          contentData: readingItem,
        });
        allocatedMinutes += readingMinutes;
      }
    }

    // -------------------------------------------------------------
    // STEP 6: Active Retrieval & Mini Assessment (Concluding Session)
    // -------------------------------------------------------------
    if (allocatedMinutes < targetMinutes || planItems.length < 3) {
      const remainingMinutes = Math.max(5, targetMinutes - allocatedMinutes);
      const practiceQuestions = PRACTICE_QUESTIONS.filter((q) => q.level === level);
      const question = practiceQuestions[0] || PRACTICE_QUESTIONS[0];

      planItems.push({
        id: `item-${itemOrder++}`,
        contentId: question ? question.id : 'q-n5-01',
        contentType: 'practice' as any,
        skill: 'grammar',
        activity: 'mini_assessment',
        minutes: remainingMinutes,
        priority: 95,
        reason: `Active Retrieval Practice: Testing retention immediately before closing today's session.`,
        status: 'pending',
        orderIndex: planItems.length,
        title: `Mini Assessment & Retrieval Drill`,
        subtitle: `Quick 3-question check to consolidate active memory recall.`,
        contentData: question,
      });
      allocatedMinutes += remainingMinutes;
    }

    // Determine focus tags
    const focusSkills = Array.from(new Set(planItems.map((item) => item.skill)));

    return {
      id: `plan-${level.toLowerCase()}-${todayStr}`,
      userId: profile.userId,
      planDate: todayStr,
      estimatedMinutes: targetMinutes,
      focus: focusSkills,
      aiModel: 'deterministic_active_engine_v2',
      isCompleted: false,
      completedMinutes: 0,
      items: planItems,
      examModeActive,
      daysToExam,
      source: 'deterministic_engine',
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Recalculate plan when a day was missed without doubling workload
   */
  public static handleMissedDayAdaptation(
    currentPlan: ActiveDailyPlan,
    missedDays: number
  ): ActiveDailyPlan {
    // Keep total daily minutes strictly bounded (do NOT double workload)
    // Reprioritize: keep high-priority reviews and error remediation, defer enrichment
    const prioritizedItems = [...currentPlan.items].sort((a, b) => b.priority - a.priority);

    let runningMinutes = 0;
    const recalculatedItems: LearningPlanItem[] = [];

    for (const item of prioritizedItems) {
      if (runningMinutes + item.minutes <= currentPlan.estimatedMinutes) {
        recalculatedItems.push({
          ...item,
          orderIndex: recalculatedItems.length,
          reason:
            item.reason +
            ` (Prioritized to keep you on schedule after ${missedDays} missed day${missedDays > 1 ? 's' : ''}).`,
        });
        runningMinutes += item.minutes;
      }
    }

    return {
      ...currentPlan,
      items: recalculatedItems,
      planDate: new Date().toISOString().split('T')[0],
      source: 'deterministic_engine',
      generatedAt: new Date().toISOString(),
    };
  }
}

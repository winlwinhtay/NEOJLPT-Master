export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type ViewType =
  | 'dashboard'
  | 'learn'
  | 'vocabulary'
  | 'kanji'
  | 'grammar'
  | 'reading'
  | 'listening'
  | 'practice'
  | 'mock-test'
  | 'ai-conversation'
  | 'speaking'
  | 'progress'
  | 'dictionary'
  | 'profile'
  | 'settings'
  | 'admin';

export type MasteryStatus = 'new' | 'learning' | 'review' | 'mastered';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  targetLevel: JLPTLevel;
  currentLevel: JLPTLevel;
  dailyGoalMinutes: number;
  dailyGoalVocab: number;
  dailyGoalKanji: number;
  dailyGoalGrammar: number;
  dailyGoalReading: number;
  dailyGoalListening: number;
  nativeLanguage: string;
  learningGoal: 'pass_jlpt' | 'travel' | 'work' | 'study' | 'conversation' | 'business';
  streakDays: number;
  lastActiveDate: string;
  xp: number;
  level: number;
  isPremium: boolean;
  theme: 'light' | 'dark' | 'sakura' | 'bamboo';
  fontSize: 'small' | 'medium' | 'large';
  showFurigana: boolean;
  speechSpeed: number; // 0.75, 1.0, 1.25, 1.5
  audioAutoPlay: boolean;
  soundEffects: boolean;
  notificationsEnabled: boolean;
}

export interface VocabularyItem {
  id: string;
  word: string;
  kanji?: string;
  hiragana: string;
  romaji: string;
  meaning: string;
  meaningsByLang?: Record<string, string>;
  partOfSpeech: string;
  level: JLPTLevel;
  difficulty: 1 | 2 | 3 | 4 | 5;
  exampleJp: string;
  exampleReading: string;
  exampleEn: string;
  exampleByLang?: Record<string, string>;
  audioUrl?: string;
  tags: string[];
  unitId?: string;
  lessonId?: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  meaning: string;
  meaningsByLang?: Record<string, string>;
  onyomi: string[];
  kunyomi: string[];
  romajiOnyomi?: string[];
  romajiKunyomi?: string[];
  strokeCount: number;
  strokeSvgPaths?: string[];
  strokeCoordinates?: number[][][]; // array of strokes, each stroke is [[x1, y1], [x2, y2], ...]
  level: JLPTLevel;
  radicals: string[];
  exampleVocab: {
    word: string;
    reading: string;
    meaning: string;
  }[];
  exampleSentence: {
    jp: string;
    reading: string;
    en: string;
  };
  unitId?: string;
}

export interface GrammarItem {
  id: string;
  pattern: string;
  meaning: string;
  meaningsByLang?: Record<string, string>;
  structure: string;
  explanation: string;
  explanationsByLang?: Record<string, string>;
  level: JLPTLevel;
  difficulty: 1 | 2 | 3 | 4 | 5;
  examples: {
    jp: string;
    reading: string;
    en: string;
    translationsByLang?: Record<string, string>;
    highlight?: string;
  }[];
  similarGrammar?: {
    pattern: string;
    meaning: string;
    difference: string;
  }[];
  contrastingGrammar?: {
    pattern: string;
    meaning: string;
    comparison: string;
  };
  commonMistakes?: string[];
  formalLevel: 'formal' | 'casual' | 'both' | 'humble' | 'honorific' | 'polite' | 'standard' | 'literary';
  unitId?: string;
}

export interface ReadingLesson {
  id: string;
  title: string;
  titleEn: string;
  level: JLPTLevel;
  topic: 'daily_life' | 'school' | 'work' | 'travel' | 'culture' | 'society' | 'technology' | 'environment' | 'news' | 'business' | 'academic';
  length: 'short' | 'medium' | 'long';
  passage: string; // May contain furigana notation e.g. [漢字]{かんじ}
  passagePlain: string;
  translationEn: string;
  vocabularyList: { word: string; reading: string; meaning: string }[];
  audioScript?: string;
  questions: {
    id: string;
    questionJp: string;
    questionEn?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ListeningLesson {
  id: string;
  title: string;
  level: JLPTLevel;
  topic: string;
  situation: string;
  dialogue: {
    speaker: string;
    text: string;
    reading: string;
    translationEn: string;
    audioTimestamp?: number;
  }[];
  questionType: 'main_idea' | 'specific_info' | 'speaker_intention' | 'appropriate_response' | 'situation_id' | 'detail' | 'summary';
  questionJp: string;
  questionEn?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  vocabNotes: { word: string; reading: string; meaning: string }[];
}

export interface LessonUnit {
  id: string;
  level: JLPTLevel;
  unitNumber: number;
  title: string;
  titleEn: string;
  description: string;
  lessons: LessonDetail[];
}

export interface LessonDetail {
  id: string;
  unitId: string;
  lessonNumber: number;
  title: string;
  objective: string;
  explanation: string;
  vocabIds: string[];
  grammarIds: string[];
  kanjiIds: string[];
  practiceQuestionIds: string[];
  listeningId?: string;
  readingId?: string;
  completed: boolean;
  xpReward: number;
}

export interface UserSRSProgress {
  itemId: string;
  itemType: 'vocab' | 'kanji' | 'grammar';
  level: JLPTLevel;
  status: MasteryStatus;
  interval: number; // in days
  easeFactor: number; // default 2.5
  repetitionCount: number;
  dueDate: string; // ISO string
  lastReviewed: string;
  wrongCount: number;
  correctCount: number;
  isFavorite: boolean;
}

export interface DailyStudyLog {
  date: string; // YYYY-MM-DD
  minutesSpent: number;
  vocabCount: number;
  kanjiCount: number;
  grammarCount: number;
  readingCount: number;
  listeningCount: number;
  practiceCount: number;
  xpEarned: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'streak' | 'vocab' | 'kanji' | 'grammar' | 'mock_test' | 'listening' | 'general';
  targetCount: number;
  currentCount: number;
}

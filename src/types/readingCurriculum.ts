import { JLPTLevel } from './index';

export type ReadingTopicId =
  | 'daily_life'
  | 'school'
  | 'culture'
  | 'food'
  | 'travel'
  | 'work'
  | 'technology'
  | 'community'
  | 'environment'
  | 'news';

export interface ReadingTopicMeta {
  id: ReadingTopicId;
  labelEn: string;
  labelJp: string;
  labelMy: string;
  icon: string;
  description: string;
}

export const READING_TOPIC_REGISTRY: ReadingTopicMeta[] = [
  { id: 'daily_life', labelEn: 'Daily Life', labelJp: '日常生活', labelMy: 'နေ့စဉ်ဘဝနှင့် အလေ့အထများ', icon: '🏠', description: 'Personal routines, lifestyle, habits, and everyday situations' },
  { id: 'school', labelEn: 'School & Education', labelJp: '学校・教育', labelMy: 'ကျောင်းနှင့် ပညာရေး', icon: '🏫', description: 'Academic life, campus activities, lectures, and exams' },
  { id: 'culture', labelEn: 'Culture & Traditions', labelJp: '文化・伝統', labelMy: 'ဂျပန်ရိုးရာနှင့် ယဉ်ကျေးမှု', icon: '🎎', description: 'Traditional festivals, arts, manners, and cultural heritage' },
  { id: 'food', labelEn: 'Food & Dining', labelJp: '食文化・料理', labelMy: 'အစားအသောက်နှင့် စားသောက်ဆိုင်', icon: '🍱', description: 'Japanese culinary habits, recipes, dining etiquette, and ingredients' },
  { id: 'travel', labelEn: 'Travel & Transport', labelJp: '旅行・交通', labelMy: 'ခရီးသွားနှင့် သယ်ယူပို့ဆောင်ရေး', icon: '🚄', description: 'Sightseeing, trains, tickets, hotels, and exploring Japan' },
  { id: 'work', labelEn: 'Work & Professional', labelJp: '仕事・ビジネス', labelMy: 'အလုပ်ခွင်နှင့် ရုံးသုံးဆက်သွယ်မှု', icon: '💼', description: 'Workplace communication, emails, meetings, and business culture' },
  { id: 'technology', labelEn: 'Technology & Digital', labelJp: '科学・デジタル', labelMy: 'နည်းပညာနှင့် ဒစ်ဂျစ်တယ်လူ့ဘောင်', icon: '💻', description: 'AI, smart society, digital devices, and internet culture' },
  { id: 'community', labelEn: 'Community & Society', labelJp: '地域社会・交流', labelMy: 'လူမှုအသိုင်းအဝန်းနှင့် ပြဿနာများ', icon: '🤝', description: 'Neighborhood relations, volunteering, demographics, and social welfare' },
  { id: 'environment', labelEn: 'Environment & Nature', labelJp: '環境・サステナビリティ', labelMy: 'သဘာဝပတ်ဝန်းကျင်နှင့် ထိန်းသိမ်းရေး', icon: '🌱', description: 'Ecology, recycling, renewable energy, and climate awareness' },
  { id: 'news', labelEn: 'News & Opinions', labelJp: '時事・コラム', labelMy: 'သတင်း၊ အမြင်နှင့် အချေအတင်ဆွေးနွေးချက်များ', icon: '📰', description: 'Current affairs, editorial opinion columns, and analytical discourse' },
];

export interface ReadingVocabularyItem {
  word: string;
  reading: string;
  meaning: string;
  meaningMy?: string;
  example?: string;
}

export interface ReadingGrammarPoint {
  grammar: string;
  meaning: string;
  meaningMy?: string;
  explanation: string;
  explanationMy?: string;
  exampleJp?: string;
}

export interface ReadingQuestion {
  id: string;
  questionJp: string;
  questionEn?: string;
  questionMy?: string;
  options: string[];
  optionsMy?: string[];
  correctIndex: number;
  explanation: string;
  explanationMy?: string;
  optionExplanations?: string[];
}

export interface UniversityReadingExercise {
  id: string;
  title: string;
  titleEn: string;
  titleMy?: string;
  level: JLPTLevel;
  topic: ReadingTopicId | string;
  subtopic?: string;
  learningObjectives?: string[];
  learningObjectivesMy?: string[];
  difficultyRating?: number; // 1-5
  estimatedReadingTimeMinutes?: number;
  length: 'short' | 'medium' | 'long';
  passage: string; // Ruby annotations: [漢字]{かんじ}
  passagePlain: string;
  translationEn: string;
  translationMy?: string;
  vocabularyList: ReadingVocabularyItem[];
  grammarPoints?: ReadingGrammarPoint[];
  audioScript?: string;
  questions: ReadingQuestion[];
  reviewStatus?: 'published' | 'approved' | 'review_required' | 'draft';
  contentVersion?: string;
  sourceType?: 'curated_university' | 'ai_generated' | 'official_sample';
  reviewerNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReadingProgressRecord {
  id: string;
  userId?: string;
  exerciseId: string;
  level: JLPTLevel;
  score: number; // e.g. 2 out of 2 = 100
  totalQuestions: number;
  correctAnswersCount: number;
  completedAt: string;
  timeSpentSeconds: number;
  userAnswers: Record<string, number>;
}

export interface ReadingGenerationOptions {
  level: JLPTLevel;
  topic: ReadingTopicId;
  subtopic?: string;
  difficultyRating: number; // 1 to 5
  passageLength: 'short' | 'medium' | 'long';
  questionCount: number; // 2 to 4
  explanationLanguage: 'en' | 'my' | 'ja';
  focusGrammarOrVocab?: string;
}

export interface ReadingValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  wordCount: number;
  questionCount: number;
  vocabCount: number;
  grammarCount: number;
  hasFurigana: boolean;
  hasTranslations: boolean;
}

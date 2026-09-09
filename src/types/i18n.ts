export type SupportedLanguage =
  | 'en' // English
  | 'ja' // Japanese
  | 'my' // Burmese / Myanmar
  | 'th' // Thai
  | 'zh' // Chinese Simplified
  | 'ko' // Korean
  | 'es' // Spanish
  | 'fr' // French
  | 'vi' // Vietnamese
  | 'id' // Indonesian
  | 'tr' // Turkish
  | 'de' // German
  | 'pt' // Portuguese
  | 'nl' // Dutch
  | 'hi' // Hindi
  | 'bn' // Bengali (Bangladeshi)
  | 'ms' // Malay (Malaysia)
  | 'ar' // Arabic
  | 'tl'; // Filipino / Tagalog

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export type TranslationKey =
  | 'nav.dashboard'
  | 'nav.learn'
  | 'nav.vocabulary'
  | 'nav.kanji'
  | 'nav.grammar'
  | 'nav.reading'
  | 'nav.listening'
  | 'nav.practice'
  | 'nav.mockTest'
  | 'nav.aiConversation'
  | 'nav.speaking'
  | 'nav.progress'
  | 'nav.dictionary'
  | 'nav.profile'
  | 'nav.settings'
  | 'nav.admin'
  | 'dashboard.welcome'
  | 'dashboard.continueLearning'
  | 'dashboard.todaysGoal'
  | 'dashboard.streak'
  | 'dashboard.studyTime'
  | 'dashboard.vocabLearned'
  | 'dashboard.kanjiLearned'
  | 'dashboard.grammarCompleted'
  | 'dashboard.readingScore'
  | 'dashboard.listeningScore'
  | 'dashboard.practiceAccuracy'
  | 'dashboard.recentMistakes'
  | 'dashboard.recommendedLessons'
  | 'dashboard.weakAreas'
  | 'common.listen'
  | 'common.favorite'
  | 'common.know'
  | 'common.review'
  | 'common.difficult'
  | 'common.mastered'
  | 'common.all'
  | 'common.search'
  | 'common.submit'
  | 'common.next'
  | 'common.previous'
  | 'common.finish'
  | 'common.tryAgain'
  | 'common.explanation'
  | 'common.correct'
  | 'common.incorrect'
  | 'common.level'
  | 'common.filter'
  | 'common.premium'
  | 'common.upgrade'
  | 'common.free'
  | 'common.save'
  | 'common.cancel'
  | 'common.delete'
  | 'common.edit'
  | 'common.create'
  | 'common.actions';

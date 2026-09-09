import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types/i18n';
import { translations, SUPPORTED_LANGUAGES } from './translations';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, defaultText?: string) => string;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('jlpt_app_language');
    if (saved && (translations as any)[saved]) {
      return saved as SupportedLanguage;
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('jlpt_app_language', lang);
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = translations[language] || translations['en'];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = translations['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return defaultText || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

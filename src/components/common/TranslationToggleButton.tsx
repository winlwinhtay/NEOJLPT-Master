// ============================================================================
// TRANSLATION TOGGLE BUTTON (翻訳 ON/OFF 切替ボタン)
// Global & Session-Aware Translation Toggle with User-Selected Language Selector
// ============================================================================

import React, { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check, Eye, EyeOff } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';
import { SupportedLanguage } from '../../types/i18n';

interface TranslationToggleButtonProps {
  // Optional controlled props; if not provided, uses global UserContext & I18nContext
  showTranslation?: boolean;
  onToggle?: (enabled: boolean) => void;
  selectedLanguage?: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
  showLanguageDropdown?: boolean;
  variant?: 'pill' | 'compact' | 'minimal' | 'badge';
  size?: 'sm' | 'md';
  className?: string;
}

export const TranslationToggleButton: React.FC<TranslationToggleButtonProps> = ({
  showTranslation: controlledShow,
  onToggle: controlledOnToggle,
  selectedLanguage: controlledLang,
  onSelectLanguage: controlledOnSelectLang,
  showLanguageDropdown = true,
  variant = 'pill',
  size = 'md',
  className = '',
}) => {
  const { profile, updateProfile } = useUser();
  const { language, setLanguage, supportedLanguages } = useI18n();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine current active state
  const isEnabled =
    controlledShow !== undefined
      ? controlledShow
      : profile.showTranslation !== false;

  const currentLang: SupportedLanguage =
    controlledLang !== undefined
      ? controlledLang
      : (profile.translationLanguage || language || 'en');

  // Handle Outside Click for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = !isEnabled;
    if (controlledOnToggle) {
      controlledOnToggle(nextVal);
    } else {
      updateProfile({ showTranslation: nextVal });
    }
  };

  const handleSelectLang = (langCode: SupportedLanguage, e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledOnSelectLang) {
      controlledOnSelectLang(langCode);
    } else {
      updateProfile({ translationLanguage: langCode });
      setLanguage(langCode);
    }
    setDropdownOpen(false);
  };

  const currentLangObj = supportedLanguages.find((l) => l.code === currentLang) || {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  };

  return (
    <div ref={dropdownRef} className={`relative inline-flex items-center ${className}`}>
      {/* Main Toggle Button */}
      <div
        className={`inline-flex items-center rounded-xl transition-all shadow-2xs ${
          isEnabled
            ? 'bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
            : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
        } ${size === 'sm' ? 'text-[11px]' : 'text-xs'}`}
      >
        <button
          type="button"
          onClick={handleToggle}
          title={`Translation: ${isEnabled ? 'ON' : 'OFF'} (Click to toggle)`}
          className={`flex items-center gap-1.5 font-bold font-mono transition-all cursor-pointer ${
            size === 'sm' ? 'px-2 py-1' : 'px-2.5 py-1.5'
          } ${
            isEnabled
              ? 'hover:text-indigo-900 dark:hover:text-indigo-100'
              : 'hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {isEnabled ? (
            <Eye size={size === 'sm' ? 12 : 14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
          ) : (
            <EyeOff size={size === 'sm' ? 12 : 14} className="text-slate-400 shrink-0" />
          )}
          <span className="font-japanese font-black shrink-0">訳</span>
          {variant !== 'compact' && variant !== 'minimal' && (
            <span className="uppercase tracking-wider hidden sm:inline whitespace-nowrap">
              {isEnabled ? 'Trans ON' : 'Trans OFF'}
            </span>
          )}
        </button>

        {/* Optional Language Selector Pill */}
        {showLanguageDropdown && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
            title={`Select Translation Language (Current: ${currentLangObj.nativeName})`}
            className={`flex items-center gap-1 border-l font-bold transition-colors cursor-pointer shrink-0 ${
              size === 'sm' ? 'px-1.5 py-1' : 'px-2 py-1.5'
            } ${
              isEnabled
                ? 'border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/60'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <span className="shrink-0">{currentLangObj.flag}</span>
            <span className="uppercase font-mono text-[10px]">
              {currentLang.toUpperCase()}
            </span>
            <ChevronDown size={11} className="opacity-70 shrink-0" />
          </button>
        )}
      </div>

      {/* Language Selector Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-slide-up max-h-60 overflow-y-auto">
          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center justify-between">
            <span>Translation Language</span>
            <Languages size={12} />
          </div>

          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={(e) => handleSelectLang(lang.code, e)}
                className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <div>
                    <span className="block">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 block">{lang.name}</span>
                  </div>
                </div>
                {isSelected && <Check size={14} className="text-indigo-600 dark:text-indigo-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

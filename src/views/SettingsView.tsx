import React, { useState } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Volume2,
  Bell,
  Globe,
  Type,
  Eye,
  Trash2,
  CheckCircle2,
  Keyboard,
  LogOut,
  LogIn,
  Crown,
  User,
  Shield,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { useSRS } from '../context/SRSContext';
import { useI18n } from '../i18n/I18nContext';
import { useJapaneseKeyboard } from '../context/JapaneseKeyboardContext';
import { SupportedLanguage } from '../types/i18n';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, isGuest, logout, entitlements } = useUser();
  const { openLoginView } = useApp();
  const { resetSRS } = useSRS();
  const { language, setLanguage, supportedLanguages, t } = useI18n();
  const { settings: keyboardSettings, updateSettings: updateKeyboardSettings, openKeyboard } = useJapaneseKeyboard();

  const [resetConfirm, setResetConfirm] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const showSuccess = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleLanguageChange = (code: SupportedLanguage) => {
    setLanguage(code);
    showSuccess('Interface language updated');
  };

  const handleResetData = () => {
    resetSRS();
    localStorage.clear();
    setResetConfirm(false);
    showSuccess('Progress data has been reset to defaults.');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {t('settings.badge') || 'Preferences & Controls'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          {t('settings.title') || 'App Settings & Accessibility'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('settings.subtitle') || 'Adjust themes, typography, furigana visibility, speech rate, and language.'}
        </p>
      </div>

      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} /> {successToast}
        </div>
      )}

      <div className="space-y-6">
        {/* 1. Interface Language */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <Globe size={20} className="text-brand-500" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t('settings.language')} ({supportedLanguages.length} Languages)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose your native language for offline interface, grammar formulas, and exercise translations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2">
            {supportedLanguages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => handleLanguageChange(l.code)}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  language === l.code
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 shadow-sm font-black'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="text-base">{l.flag}</span>
                  <span className="truncate">{l.nativeName}</span>
                </span>
                {language === l.code && <span className="text-xs text-brand-600 dark:text-brand-400 font-black shrink-0">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Visual Theme & Japanese Aesthetics */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <Sun size={20} className="text-amber-500" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t('settings.theme')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Japanese traditional aesthetic color palettes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => updateProfile({ theme: 'light' })}
              className={`p-4 rounded-2xl border-2 text-xs font-bold text-left transition-all ${
                profile.theme === 'light'
                  ? 'border-brand-500 bg-brand-50/40 text-brand-600 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              ☀️ Clean Light
            </button>
            <button
              onClick={() => updateProfile({ theme: 'dark' })}
              className={`p-4 rounded-2xl border-2 text-xs font-bold text-left transition-all ${
                profile.theme === 'dark'
                  ? 'border-brand-500 bg-slate-800 text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              🌙 Midnight Dark
            </button>
            <button
              onClick={() => updateProfile({ theme: 'sakura' })}
              className={`p-4 rounded-2xl border-2 text-xs font-bold text-left transition-all ${
                profile.theme === 'sakura'
                  ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              🌸 Sakura Blossom
            </button>
            <button
              onClick={() => updateProfile({ theme: 'bamboo' })}
              className={`p-4 rounded-2xl border-2 text-xs font-bold text-left transition-all ${
                profile.theme === 'bamboo'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              🎋 Bamboo Forest
            </button>
          </div>
        </div>

        {/* 3. Typography & Furigana Accessibility */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <Type size={20} className="text-indigo-500" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Japanese Typography & Furigana
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure Japanese character sizes and ruby reading hints
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Font Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateProfile({ fontSize: size })}
                    className={`py-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                      profile.fontSize === size
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-black'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Default Furigana Visibility
              </label>
              <button
                onClick={() => updateProfile({ showFurigana: !profile.showFurigana })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between border transition-colors ${
                  profile.showFurigana
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>Show Hiragana above Kanji</span>
                <span>{profile.showFurigana ? 'Always ON' : 'Off (Clean)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Audio Speech Speed */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <Volume2 size={20} className="text-purple-500" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Native Japanese Voice Speed
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adjust the playback speed of vocabulary and listening dialogues
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2.5 pt-2">
            {[0.75, 1.0, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => updateProfile({ speechSpeed: speed })}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  profile.speechSpeed === speed
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {speed}x {speed === 0.75 ? '(Slow)' : speed === 1.0 ? '(Normal)' : '(Fast)'}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Japanese Virtual Keyboard & In-App Typing Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Keyboard size={20} className="text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Japanese Virtual Keyboard & In-App Typing (日本語入力・仮想キーボード)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Type and convert Japanese offline without installing OS Japanese IMEs or language packs.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={openKeyboard}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>キーボードを開く (Open)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Default Mode */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Default Input Mode (初期入力モード)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['hiragana', 'katakana', 'romaji'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      updateKeyboardSettings({ defaultMode: m });
                      showSuccess(`Default input mode set to ${m}`);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      keyboardSettings.defaultMode === m
                        ? 'bg-indigo-600 text-white shadow-sm font-black'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {m === 'hiragana' ? 'ひらがな' : m === 'katakana' ? 'カタカナ' : 'Romaji'}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyboard Dock Position */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Keyboard Layout Position (配置)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['bottom', 'floating'] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => {
                      updateKeyboardSettings({ keyboardPosition: pos });
                      showSuccess(`Keyboard position: ${pos === 'bottom' ? 'Bottom Dock' : 'Floating Modal'}`);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      keyboardSettings.keyboardPosition === pos
                        ? 'bg-indigo-600 text-white shadow-sm font-black'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {pos === 'bottom' ? 'Bottom Dock' : 'Floating Modal'}
                  </button>
                ))}
              </div>
            </div>

            {/* Romaji Key Sub-Labels */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Romaji Sub-Labels on Keys
                </span>
                <span className="text-[11px] text-slate-400">
                  Shows latin pronunciation below kana keys (e.g. 'ka' below 'か')
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateKeyboardSettings({ showRomaji: !keyboardSettings.showRomaji });
                  showSuccess(`Romaji labels: ${!keyboardSettings.showRomaji ? 'Enabled' : 'Disabled'}`);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  keyboardSettings.showRomaji
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-transparent'
                }`}
              >
                {keyboardSettings.showRomaji ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Kana Learning Hints & Popups */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Kana Learning Vocabulary Hints
                </span>
                <span className="text-[11px] text-slate-400">
                  Educational tooltips showing example words and meanings on key press
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateKeyboardSettings({ showKanaHints: !keyboardSettings.showKanaHints });
                  showSuccess(`Kana hints: ${!keyboardSettings.showKanaHints ? 'Enabled' : 'Disabled'}`);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  keyboardSettings.showKanaHints
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-transparent'
                }`}
              >
                {keyboardSettings.showKanaHints ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Auto Kanji Candidate Selector */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between sm:col-span-2">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Real-time Kanji Candidate Selector (漢字変換候補バー)
                </span>
                <span className="text-[11px] text-slate-400">
                  Suggests Kanji conversions automatically based on JLPT vocabulary as you type kana
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateKeyboardSettings({ autoKanji: !keyboardSettings.autoKanji });
                  showSuccess(`Kanji suggestions: ${!keyboardSettings.autoKanji ? 'Enabled' : 'Disabled'}`);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  keyboardSettings.autoKanji
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-transparent'
                }`}
              >
                {keyboardSettings.autoKanji ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* 6. Account & Authentication Management */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50 flex items-center justify-center text-xl shrink-0">
                {profile.avatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {isGuest ? 'Guest Learner Session (ゲスト学習中)' : (profile.email || profile.name)}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isGuest
                    ? '100% Free offline study. Sign in with a Supabase email to enable cross-device cloud sync and live AI tutors.'
                    : `Active Account • ${entitlements.accountType === 'ADMIN' ? '🛡️ Super Administrator' : entitlements.subscriptionPlan + ' Scholar Pass'}`}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {isGuest ? (
                <>
                  <button
                    type="button"
                    onClick={() => openLoginView('auth')}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-brand-500/20 transition-all cursor-pointer"
                  >
                    <LogIn size={15} />
                    <span>Log In / Sign Up</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openLoginView('plans')}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Crown size={15} />
                    <span>Subscription Plans</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openLoginView('plans')}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Crown size={15} />
                    <span>Subscription Plans (料金)</span>
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-200 dark:border-rose-900/50 cursor-pointer shadow-xs"
                    title="Log out of this account"
                  >
                    <LogOut size={15} />
                    <span>Log Out (ログアウト)</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 7. Danger Zone: Reset Data */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-rose-600 dark:text-rose-400 text-base">
                Reset Learning Progress
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Clear local study history, mistake logs, and SRS intervals.
              </p>
            </div>

            {!resetConfirm ? (
              <button
                type="button"
                onClick={() => setResetConfirm(true)}
                className="px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Reset Data
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setResetConfirm(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
                >
                  Confirm Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

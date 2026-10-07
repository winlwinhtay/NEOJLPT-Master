import React, { useState } from 'react';
import {
  Keyboard,
  X,
  Delete,
  CornerDownLeft,
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  Sliders,
  RotateCcw,
} from 'lucide-react';
import { useJapaneseKeyboard, KeyboardMode } from '../../context/JapaneseKeyboardContext';
import { hiraganaToKatakana } from '../../services/romajiKanaEngine';
import { KANA_EDUCATIONAL_DATA, KanaLearningInfo } from '../../data/kanaEducationalData';

// 50 Sounds Grid (Columns: a, i, u, e, o)
const SEION_GRID = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', '', 'ゆ', '', 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', '', '', '', 'を'],
];

// Dakuon & Handakuon Grid
const DAKUON_GRID = [
  ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
  ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
  ['だ', 'ぢ', 'づ', 'で', 'ど'],
  ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
  ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
];

// Yoon Combination Sounds Grid
const YOON_GRID = [
  ['きゃ', 'きゅ', 'きょ'],
  ['しゃ', 'しゅ', 'しょ'],
  ['ちゃ', 'ちゅ', 'ちょ'],
  ['にゃ', 'にゅ', 'にょ'],
  ['ひゃ', 'ひゅ', 'ひょ'],
  ['みゃ', 'みゅ', 'みょ'],
  ['りゃ', 'りゅ', 'りょ'],
  ['ぎゃ', 'ぎゅ', 'ぎょ'],
  ['じゃ', 'じゅ', 'じょ'],
  ['びゃ', 'びゅ', 'びょ'],
  ['ぴゃ', 'ぴゅ', 'ぴょ'],
];

// Symbols & Punctuation
const SYMBOLS_GRID = [
  ['、', '。', '！', '？', '・'],
  ['ー', '〜', '「', '」', '…'],
  ['（', '）', '【', '】', '『'],
  ['』', '：', '；', '￥', '％'],
  ['1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '0'],
];

// English ABC Keyboard
const ABC_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

export const JapaneseVirtualKeyboard: React.FC = () => {
  const {
    isOpen,
    closeKeyboard,
    mode,
    setMode,
    settings,
    updateSettings,
    insertChar,
    insertCandidate,
    deleteChar,
    clearInput,
    toggleLastCharDakuten,
    candidates,
    activeInputEl,
  } = useJapaneseKeyboard();

  const [subTab, setSubTab] = useState<'seion' | 'dakuon' | 'yoon'>('seion');
  const [activeHint, setActiveHint] = useState<KanaLearningInfo | null>(null);
  const [isShift, setIsShift] = useState(false);

  if (!isOpen || !settings.enabled) return null;

  const handleKeyClick = (char: string) => {
    if (!char) return;
    insertChar(char);
    if (settings.showKanaHints && KANA_EDUCATIONAL_DATA[char]) {
      setActiveHint(KANA_EDUCATIONAL_DATA[char]);
    }
  };

  const handleEnter = () => {
    if (activeInputEl) {
      // Simulate form submit or enter keypress
      activeInputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      const form = activeInputEl.closest('form');
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <div
      role="region"
      aria-label="Japanese Virtual Keyboard"
      className={`fixed z-50 transition-all duration-200 select-none animate-slide-up ${
        settings.keyboardPosition === 'floating'
          ? 'bottom-20 right-4 sm:right-8 max-w-xl w-[95vw] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md'
          : 'bottom-0 left-0 right-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] max-h-[50vh] overflow-y-auto'
      }`}
    >
      {/* 1. Header Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
        {/* Mode Tabs */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMode('hiragana')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              mode === 'hiragana'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
            aria-label="Switch to Hiragana input mode"
          >
            あ ひらがな
          </button>
          <button
            type="button"
            onClick={() => setMode('katakana')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              mode === 'katakana'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
            aria-label="Switch to Katakana input mode"
          >
            ア カタカナ
          </button>
          <button
            type="button"
            onClick={() => setMode('romaji')}
            className={`px-2 py-1 rounded-xl text-xs font-bold transition-all ${
              mode === 'romaji'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
            aria-label="Switch to English Romaji input mode"
          >
            ABC
          </button>
          <button
            type="button"
            onClick={() => setMode('symbols')}
            className={`px-2 py-1 rounded-xl text-xs font-bold transition-all ${
              mode === 'symbols'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
            aria-label="Switch to Symbols and punctuation"
          >
            、。記号
          </button>
        </div>

        {/* Settings & Position Actions */}
        <div className="flex items-center gap-1.5">
          {/* Kana Hint Toggle */}
          <button
            type="button"
            onClick={() => updateSettings({ showKanaHints: !settings.showKanaHints })}
            title={settings.showKanaHints ? 'Kana Learning Hints: ON' : 'Kana Learning Hints: OFF'}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              settings.showKanaHints
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline text-[11px]">Hints</span>
          </button>

          {/* Position Toggle */}
          <button
            type="button"
            onClick={() =>
              updateSettings({
                keyboardPosition: settings.keyboardPosition === 'bottom' ? 'floating' : 'bottom',
              })
            }
            title={
              settings.keyboardPosition === 'bottom'
                ? 'Switch to Floating Window'
                : 'Dock to Bottom'
            }
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {settings.keyboardPosition === 'bottom' ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={closeKeyboard}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            aria-label="Close Japanese Virtual Keyboard"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* 2. Kanji Conversion Candidate Bar */}
      {candidates.length > 0 && (
        <div className="px-3 py-1.5 bg-indigo-50/80 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/40 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles size={12} /> 変換 (Kanji):
          </span>
          <div className="flex items-center gap-1.5">
            {candidates.map((matchGroup) =>
              matchGroup.candidates.map((cand, cIdx) => (
                <button
                  key={`${cand}-${cIdx}`}
                  type="button"
                  onClick={() => insertCandidate(cand, matchGroup.matchedWord)}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-japanese text-xs font-bold shadow-sm hover:bg-indigo-600 hover:text-white border border-indigo-200 dark:border-indigo-800 transition-all shrink-0 cursor-pointer"
                >
                  {cand}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* 3. Educational Kana Hint Card (When Learning Mode is Active) */}
      {settings.showKanaHints && activeHint && (
        <div className="px-4 py-2 bg-amber-50/80 dark:bg-amber-950/30 border-b border-amber-200/50 dark:border-amber-900/30 flex items-center justify-between text-xs animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black font-japanese text-brand-600 dark:text-brand-400">
              {mode === 'katakana' ? activeHint.katakana : activeHint.char}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  /{activeHint.romaji}/
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-japanese font-semibold text-slate-700 dark:text-slate-300">
                  {activeHint.exampleJp}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                "{activeHint.exampleEn}" ({activeHint.exampleRomaji})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveHint(null)}
            className="text-[10px] text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4. Keyboard Body */}
      <div className="p-2 sm:p-3 space-y-2 max-w-2xl mx-auto">
        {/* Hiragana or Katakana Mode View */}
        {(mode === 'hiragana' || mode === 'katakana') && (
          <div className="space-y-2">
            {/* Sub-Tabs: 清音 / 濁音 / 拗音 */}
            <div className="flex items-center justify-between px-1 text-[11px] font-bold">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSubTab('seion')}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    subTab === 'seion'
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-extrabold'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  清音 (Main)
                </button>
                <button
                  type="button"
                  onClick={() => setSubTab('dakuon')}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    subTab === 'dakuon'
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-extrabold'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  濁音・半濁音 (が/ぱ)
                </button>
                <button
                  type="button"
                  onClick={() => setSubTab('yoon')}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    subTab === 'yoon'
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-extrabold'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  拗音 (きゃ/しゃ)
                </button>
              </div>

              {/* Dakuten / Handakuten / Small Toggle Shortcut Key */}
              <button
                type="button"
                onClick={toggleLastCharDakuten}
                title="Toggle Dakuten / Small on last character (゛/ ゜/ 小)"
                className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold hover:bg-indigo-100"
              >
                小 / ゛/ ゜変形
              </button>
            </div>

            {/* SEION GRID (10 columns, 5 rows or transposed) */}
            {subTab === 'seion' && (
              <div className="grid grid-cols-10 gap-1 sm:gap-1.5 font-japanese">
                {/* Columns are right-to-left in Japanese, but rendered left-to-right: a, ka, sa, ta, na, ha, ma, ya, ra, wa */}
                {[0, 1, 2, 3, 4].map((rowIdx) =>
                  SEION_GRID.map((col, colIdx) => {
                    const rawChar = col[rowIdx] || '';
                    const displayChar = mode === 'katakana' ? hiraganaToKatakana(rawChar) : rawChar;
                    const meta = KANA_EDUCATIONAL_DATA[rawChar];

                    if (!rawChar) {
                      return <div key={`${colIdx}-${rowIdx}`} className="h-8 sm:h-9" />;
                    }

                    return (
                      <button
                        key={`${colIdx}-${rowIdx}`}
                        type="button"
                        onClick={() => handleKeyClick(rawChar)}
                        aria-label={`Japanese ${mode} ${rawChar} (${meta?.romaji || ''})`}
                        className="h-8 sm:h-9 rounded-xl bg-slate-100 hover:bg-brand-500 hover:text-white active:scale-95 dark:bg-slate-800/80 dark:hover:bg-brand-600 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base flex flex-col items-center justify-center transition-all shadow-sm focus:ring-2 focus:ring-brand-500"
                      >
                        <span>{displayChar}</span>
                        {settings.showRomaji && meta && (
                          <span className="text-[8px] sm:text-[9px] -mt-1 font-mono text-slate-400 group-hover:text-white/80">
                            {meta.romaji}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            )}

            {/* DAKUON GRID */}
            {subTab === 'dakuon' && (
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 font-japanese max-w-md mx-auto">
                {[0, 1, 2, 3, 4].map((rowIdx) =>
                  DAKUON_GRID.map((col, colIdx) => {
                    const rawChar = col[rowIdx] || '';
                    const displayChar = mode === 'katakana' ? hiraganaToKatakana(rawChar) : rawChar;
                    const meta = KANA_EDUCATIONAL_DATA[rawChar];

                    return (
                      <button
                        key={`dak-${colIdx}-${rowIdx}`}
                        type="button"
                        onClick={() => handleKeyClick(rawChar)}
                        aria-label={`Japanese ${mode} ${rawChar} (${meta?.romaji || ''})`}
                        className="h-9 sm:h-10 rounded-xl bg-slate-100 hover:bg-brand-500 hover:text-white active:scale-95 dark:bg-slate-800/80 dark:hover:bg-brand-600 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base flex flex-col items-center justify-center transition-all shadow-sm focus:ring-2 focus:ring-brand-500"
                      >
                        <span>{displayChar}</span>
                        {settings.showRomaji && meta && (
                          <span className="text-[8px] -mt-1 font-mono text-slate-400">
                            {meta.romaji}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            )}

            {/* YOON COMBINATIONS GRID */}
            {subTab === 'yoon' && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 font-japanese max-w-xl mx-auto">
                {YOON_GRID.flatMap((row) =>
                  row.map((rawChar) => {
                    const displayChar = mode === 'katakana' ? hiraganaToKatakana(rawChar) : rawChar;
                    const meta = KANA_EDUCATIONAL_DATA[rawChar];
                    return (
                      <button
                        key={rawChar}
                        type="button"
                        onClick={() => handleKeyClick(rawChar)}
                        aria-label={`Japanese combination ${rawChar} (${meta?.romaji || ''})`}
                        className="h-9 rounded-xl bg-slate-100 hover:bg-brand-500 hover:text-white active:scale-95 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all shadow-sm"
                      >
                        <span>{displayChar}</span>
                        {meta && (
                          <span className="text-[8px] -mt-1 font-mono text-slate-400">
                            {meta.romaji}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}

        {/* ABC ROMAJI KEYBOARD */}
        {mode === 'romaji' && (
          <div className="space-y-1.5 max-w-lg mx-auto">
            {ABC_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
                {rIdx === 2 && (
                  <button
                    type="button"
                    onClick={() => setIsShift((s) => !s)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isShift
                        ? 'bg-brand-500 text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    ⇧ Shift
                  </button>
                )}
                {row.map((letter) => {
                  const out = isShift ? letter.toUpperCase() : letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => handleKeyClick(out)}
                      className="w-8 sm:w-10 h-9 sm:h-10 rounded-xl bg-slate-100 hover:bg-brand-500 hover:text-white dark:bg-slate-800 text-slate-800 dark:text-white font-mono font-bold text-sm flex items-center justify-center transition-all shadow-sm"
                    >
                      {out}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* SYMBOLS & NUMBERS KEYBOARD */}
        {mode === 'symbols' && (
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 font-japanese max-w-md mx-auto">
            {SYMBOLS_GRID.flat().map((sym, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleKeyClick(sym)}
                className="h-9 sm:h-10 rounded-xl bg-slate-100 hover:bg-brand-500 hover:text-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-sm sm:text-base flex items-center justify-center transition-all shadow-sm"
              >
                {sym}
              </button>
            ))}
          </div>
        )}

        {/* 5. Bottom Action Controls Bar */}
        <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleKeyClick('ー')}
              className="px-3 h-8 sm:h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all flex items-center justify-center"
              title="Katakana Chōonpu Long Vowel mark"
            >
              長音 ー
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('、')}
              className="px-2.5 h-8 sm:h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-200 transition-all"
            >
              、
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('。')}
              className="px-2.5 h-8 sm:h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-200 transition-all"
            >
              。
            </button>
          </div>

          <div className="flex items-center gap-1.5 flex-1 justify-center max-w-xs">
            <button
              type="button"
              onClick={() => handleKeyClick(' ')}
              className="flex-1 h-8 sm:h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1 transition-all"
              aria-label="Insert Space"
            >
              Space 空白
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={deleteChar}
              className="px-3 h-8 sm:h-9 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-rose-500 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95"
              aria-label="Backspace delete character"
            >
              <Delete size={15} />
              <span className="hidden sm:inline">⌫</span>
            </button>

            <button
              type="button"
              onClick={clearInput}
              className="px-2.5 h-8 sm:h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 text-[10px] font-bold"
              title="Clear all text in active input"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleEnter}
              className="px-4 h-8 sm:h-9 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1 transition-all active:scale-95"
              aria-label="Submit or Enter"
            >
              <CornerDownLeft size={14} />
              <span className="hidden sm:inline">確定</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

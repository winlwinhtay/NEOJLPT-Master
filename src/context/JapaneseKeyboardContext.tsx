import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { toggleDakuten, convertRomajiToKana, hiraganaToKatakana } from '../services/romajiKanaEngine';
import { getKanjiCandidates } from '../services/kanjiConversionService';

export type KeyboardMode = 'hiragana' | 'katakana' | 'romaji' | 'symbols';

export interface JapaneseInputSettings {
  enabled: boolean;
  defaultMode: KeyboardMode;
  showRomaji: boolean;
  showKanaHints: boolean;
  autoKanji: boolean;
  keyboardPosition: 'bottom' | 'floating';
  rememberState: boolean;
}

export const DEFAULT_KEYBOARD_SETTINGS: JapaneseInputSettings = {
  enabled: true,
  defaultMode: 'hiragana',
  showRomaji: true,
  showKanaHints: true,
  autoKanji: true,
  keyboardPosition: 'bottom',
  rememberState: true,
};

const STORAGE_KEY_SETTINGS = 'jlpt_japanese_keyboard_settings';
const STORAGE_KEY_STATE = 'jlpt_japanese_keyboard_open_state';

interface JapaneseKeyboardContextType {
  isOpen: boolean;
  openKeyboard: () => void;
  closeKeyboard: () => void;
  toggleKeyboard: () => void;

  mode: KeyboardMode;
  setMode: (mode: KeyboardMode) => void;

  settings: JapaneseInputSettings;
  updateSettings: (partial: Partial<JapaneseInputSettings>) => void;

  // Active targeted input or textarea
  activeInputEl: HTMLInputElement | HTMLTextAreaElement | null;
  registerActiveInput: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;

  // Typing operations
  insertChar: (char: string) => void;
  insertCandidate: (candidate: string, matchedWord: string) => void;
  deleteChar: () => void;
  clearInput: () => void;
  toggleLastCharDakuten: () => void;

  // Real-time Candidate suggestions for active input
  candidates: {
    matchedWord: string;
    startIndex: number;
    endIndex: number;
    candidates: string[];
  }[];
}

const JapaneseKeyboardContext = createContext<JapaneseKeyboardContextType | undefined>(undefined);

export const JapaneseKeyboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<JapaneseInputSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (stored) {
        return { ...DEFAULT_KEYBOARD_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {}
    return DEFAULT_KEYBOARD_SETTINGS;
  });

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (settings.rememberState) {
      try {
        return localStorage.getItem(STORAGE_KEY_STATE) === 'true';
      } catch {}
    }
    return false;
  });

  const [mode, setMode] = useState<KeyboardMode>(settings.defaultMode || 'hiragana');
  const [activeInputEl, setActiveInputEl] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [candidates, setCandidates] = useState<{
    matchedWord: string;
    startIndex: number;
    endIndex: number;
    candidates: string[];
  }[]>([]);

  // Update localStorage when settings change
  const updateSettings = useCallback((partial: Partial<JapaneseInputSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const openKeyboard = useCallback(() => {
    setIsOpen(true);
    if (settings.rememberState) {
      try {
        localStorage.setItem(STORAGE_KEY_STATE, 'true');
      } catch {}
    }
  }, [settings.rememberState]);

  const closeKeyboard = useCallback(() => {
    setIsOpen(false);
    if (settings.rememberState) {
      try {
        localStorage.setItem(STORAGE_KEY_STATE, 'false');
      } catch {}
    }
  }, [settings.rememberState]);

  const toggleKeyboard = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (settings.rememberState) {
        try {
          localStorage.setItem(STORAGE_KEY_STATE, next ? 'true' : 'false');
        } catch {}
      }
      return next;
    });
  }, [settings.rememberState]);

  // Recalculate candidates whenever input value changes
  const updateCandidates = useCallback(
    (text: string, cursorIndex?: number) => {
      if (!settings.autoKanji) {
        setCandidates([]);
        return;
      }
      const matched = getKanjiCandidates(text, cursorIndex);
      setCandidates(matched);
    },
    [settings.autoKanji]
  );

  const registerActiveInput = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      setActiveInputEl(el);
      if (el) {
        updateCandidates(el.value, el.selectionEnd ?? el.value.length);
      } else {
        setCandidates([]);
      }
    },
    [updateCandidates]
  );

  /**
   * Insert character or string at current cursor position
   */
  const insertChar = useCallback(
    (charToInsert: string) => {
      let finalChar = charToInsert;
      if (mode === 'katakana') {
        finalChar = hiraganaToKatakana(charToInsert);
      }

      if (activeInputEl) {
        const input = activeInputEl;
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        const val = input.value;

        const nextVal = val.slice(0, start) + finalChar + val.slice(end);
        input.value = nextVal;

        // Dispatch React synthetic and native change events
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        const newPos = start + finalChar.length;
        input.focus();
        input.setSelectionRange(newPos, newPos);

        updateCandidates(nextVal, newPos);
      }
    },
    [activeInputEl, mode, updateCandidates]
  );

  /**
   * Replace matched kana word with chosen Kanji candidate
   */
  const insertCandidate = useCallback(
    (candidate: string, matchedWord: string) => {
      if (!activeInputEl) return;
      const input = activeInputEl;
      const val = input.value;
      const cursor = input.selectionEnd ?? val.length;

      const beforeCursor = val.slice(0, cursor);
      const afterCursor = val.slice(cursor);

      // Check if suffix matches
      if (beforeCursor.endsWith(matchedWord)) {
        const startOfWord = beforeCursor.length - matchedWord.length;
        const nextVal = beforeCursor.slice(0, startOfWord) + candidate + afterCursor;
        input.value = nextVal;

        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        const newPos = startOfWord + candidate.length;
        input.focus();
        input.setSelectionRange(newPos, newPos);

        updateCandidates(nextVal, newPos);
      }
    },
    [activeInputEl, updateCandidates]
  );

  /**
   * Delete character before cursor (Backspace)
   */
  const deleteChar = useCallback(() => {
    if (!activeInputEl) return;
    const input = activeInputEl;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const val = input.value;

    if (start === end) {
      if (start === 0) return;
      const nextVal = val.slice(0, start - 1) + val.slice(start);
      input.value = nextVal;
      const newPos = start - 1;
      input.focus();
      input.setSelectionRange(newPos, newPos);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      updateCandidates(nextVal, newPos);
    } else {
      const nextVal = val.slice(0, start) + val.slice(end);
      input.value = nextVal;
      input.focus();
      input.setSelectionRange(start, start);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      updateCandidates(nextVal, start);
    }
  }, [activeInputEl, updateCandidates]);

  /**
   * Clear active input field
   */
  const clearInput = useCallback(() => {
    if (!activeInputEl) return;
    activeInputEl.value = '';
    activeInputEl.focus();
    activeInputEl.dispatchEvent(new Event('input', { bubbles: true }));
    activeInputEl.dispatchEvent(new Event('change', { bubbles: true }));
    setCandidates([]);
  }, [activeInputEl]);

  /**
   * Toggle Dakuten / Handakuten / Small kana on the character immediately before cursor
   */
  const toggleLastCharDakuten = useCallback(() => {
    if (!activeInputEl) return;
    const input = activeInputEl;
    const cursor = input.selectionEnd ?? input.value.length;
    if (cursor === 0) return;

    const val = input.value;
    const charToToggle = val[cursor - 1];
    const toggled = toggleDakuten(charToToggle);

    if (toggled !== charToToggle) {
      const nextVal = val.slice(0, cursor - 1) + toggled + val.slice(cursor);
      input.value = nextVal;
      input.focus();
      input.setSelectionRange(cursor, cursor);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      updateCandidates(nextVal, cursor);
    }
  }, [activeInputEl, updateCandidates]);

  return (
    <JapaneseKeyboardContext.Provider
      value={{
        isOpen,
        openKeyboard,
        closeKeyboard,
        toggleKeyboard,
        mode,
        setMode,
        settings,
        updateSettings,
        activeInputEl,
        registerActiveInput,
        insertChar,
        insertCandidate,
        deleteChar,
        clearInput,
        toggleLastCharDakuten,
        candidates,
      }}
    >
      {children}
    </JapaneseKeyboardContext.Provider>
  );
};

export const useJapaneseKeyboard = () => {
  const context = useContext(JapaneseKeyboardContext);
  if (!context) {
    throw new Error('useJapaneseKeyboard must be used within a JapaneseKeyboardProvider');
  }
  return context;
};

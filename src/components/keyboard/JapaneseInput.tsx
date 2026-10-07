import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Keyboard, Sparkles, Check, Globe } from 'lucide-react';
import { useJapaneseKeyboard } from '../../context/JapaneseKeyboardContext';
import { convertRomajiStream } from '../../services/romajiKanaEngine';

export interface JapaneseInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onSubmit?: () => void;
  showKeyboardToggle?: boolean;
  enableRomajiConversion?: boolean;
  id?: string;
  name?: string;
  'aria-label'?: string;
}

export const JapaneseInput: React.FC<JapaneseInputProps> = ({
  value,
  onChange,
  placeholder = '日本語を入力してください (Type Japanese here)...',
  multiline = false,
  rows = 4,
  className = '',
  inputClassName = '',
  disabled = false,
  autoFocus = false,
  onSubmit,
  showKeyboardToggle = true,
  enableRomajiConversion = true,
  id,
  name,
  'aria-label': ariaLabel = 'Japanese text input field',
}) => {
  const {
    isOpen,
    toggleKeyboard,
    openKeyboard,
    registerActiveInput,
    mode,
    setMode,
    settings,
  } = useJapaneseKeyboard();

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [romajiBuffer, setRomajiBuffer] = useState<string>('');
  const [isDirectLatin, setIsDirectLatin] = useState<boolean>(false);

  // Sync active element with keyboard context
  const handleFocus = () => {
    if (inputRef.current) {
      registerActiveInput(inputRef.current);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      registerActiveInput(inputRef.current);
    }
  };

  /**
   * Real-time physical keyboard typing handler (Romaji -> Kana)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // If native IME is composing, let native IME handle it
    if (e.nativeEvent.isComposing) return;

    // Handle Enter key for submit
    if (e.key === 'Enter') {
      if (!multiline || (multiline && (e.ctrlKey || e.metaKey))) {
        if (romajiBuffer) {
          // Flush buffer before submit
          const flushed = value + romajiBuffer;
          onChange(flushed);
          setRomajiBuffer('');
        }
        if (onSubmit) {
          e.preventDefault();
          onSubmit();
          return;
        }
      }
    }

    // If physical Romaji conversion is disabled or direct Latin mode is active, type normally
    if (!enableRomajiConversion || isDirectLatin || mode === 'romaji') {
      return;
    }

    // Intercept letter keystrokes (a-z, hyphens, punctuation)
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const char = e.key;

      // Only convert ASCII letters and common punctuation
      if (/[a-zA-Z\-,.\?!]/.test(char)) {
        e.preventDefault();
        const nextBuffer = romajiBuffer + char;
        const { kana, remainder } = convertRomajiStream(nextBuffer);

        if (kana) {
          const el = inputRef.current;
          const start = el?.selectionStart ?? value.length;
          const end = el?.selectionEnd ?? value.length;
          const nextVal = value.slice(0, start) + kana + value.slice(end);

          onChange(nextVal);
          setRomajiBuffer(remainder);

          // Restore cursor
          requestAnimationFrame(() => {
            if (el) {
              const newPos = start + kana.length;
              el.setSelectionRange(newPos, newPos);
            }
          });
        } else {
          setRomajiBuffer(remainder);
        }
        return;
      }
    }

    // Backspace: clear romaji buffer if pending, else normal backspace
    if (e.key === 'Backspace' && romajiBuffer.length > 0) {
      e.preventDefault();
      setRomajiBuffer((b) => b.slice(0, -1));
      return;
    }
  };

  return (
    <div className={`relative flex flex-col w-full ${className}`}>
      <div className="relative flex items-center w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            autoFocus={autoFocus}
            aria-label={ariaLabel}
            className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-japanese text-sm sm:text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all leading-relaxed resize-y ${
              showKeyboardToggle ? 'pb-12' : ''
            } ${inputClassName}`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={id}
            name={name}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            aria-label={ariaLabel}
            className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-japanese text-sm sm:text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all ${
              showKeyboardToggle ? 'pr-28 sm:pr-36' : ''
            } ${inputClassName}`}
          />
        )}

        {/* Embedded Keyboard Button Toolbar */}
        {showKeyboardToggle && (
          <div
            className={`flex items-center gap-1.5 ${
              multiline
                ? 'absolute bottom-2.5 right-3'
                : 'absolute right-2 top-1/2 -translate-y-1/2'
            }`}
          >
            {/* Live Typing Mode Switcher (かな ⇄ Romaji) */}
            {enableRomajiConversion && (
              <button
                type="button"
                onClick={() => setIsDirectLatin((prev) => !prev)}
                title={
                  isDirectLatin
                    ? 'Direct Latin typing mode. Click to enable in-app Romaji->Kana'
                    : 'In-app Romaji->Kana active. Click to type direct Latin letters'
                }
                className={`px-2 py-1 rounded-xl text-[11px] font-extrabold border transition-all ${
                  isDirectLatin
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                    : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 font-japanese'
                }`}
              >
                {isDirectLatin ? 'ABC' : 'かな'}
              </button>
            )}

            {/* In-App Japanese Keyboard Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (inputRef.current) {
                  registerActiveInput(inputRef.current);
                }
                toggleKeyboard();
              }}
              aria-label="Toggle Japanese Virtual Keyboard"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                isOpen
                  ? 'bg-brand-500 text-white shadow-brand-500/25 ring-2 ring-brand-500/30 font-black'
                  : 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
              }`}
            >
              <Keyboard size={15} />
              <span className="hidden sm:inline font-japanese text-[11px]">日本語</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating In-flight Romaji Buffer preview */}
      {romajiBuffer && (
        <div className="absolute -bottom-6 left-3 px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[11px] font-mono shadow-md animate-fade-in z-20">
          typing: <span className="font-bold underline">{romajiBuffer}</span>
        </div>
      )}
    </div>
  );
};

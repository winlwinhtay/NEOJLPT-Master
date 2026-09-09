import React from 'react';
import { useUser } from '../../context/UserContext';

interface RubyTextProps {
  text: string;
  forceFurigana?: boolean;
  className?: string;
}

export const RubyText: React.FC<RubyTextProps> = ({ text, forceFurigana, className = '' }) => {
  const { profile } = useUser();
  const showFurigana = forceFurigana !== undefined ? forceFurigana : profile.showFurigana;

  // Regex to match [Kanji]{furigana} pattern
  const regex = /\[([^\]]+)\]\{([^}]+)\}/g;

  if (!text) return null;

  // If furigana is turned off, replace [Kanji]{furigana} with just Kanji
  if (!showFurigana) {
    const cleanText = text.replace(regex, '$1');
    return <span className={className}>{cleanText}</span>;
  }

  // Parse into ruby elements
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Add text preceding the match
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const kanji = match[1];
    const furigana = match[2];

    elements.push(
      <ruby key={match.index} className="mx-0.5 inline-block text-center">
        {kanji}
        <rt className="text-[10px] font-normal text-slate-500 dark:text-slate-400 select-none block text-center">
          {furigana}
        </rt>
      </ruby>
    );

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <span className={`inline-block leading-relaxed ${className}`}>{elements}</span>;
};

import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { useUser } from '../../context/UserContext';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { profile } = useUser();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speechService.speakJapanese(text, {
      rate: profile.speechSpeed || 1.0,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const sizeClasses = {
    sm: 'p-1 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      title="Listen to Japanese pronunciation"
      className={`inline-flex items-center justify-center gap-1.5 rounded-full transition-all duration-150 ${
        isPlaying
          ? 'bg-brand-500 text-white shadow-md animate-pulse'
          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
      } ${sizeClasses[size]} ${className}`}
    >
      <Volume2 size={iconSizes[size]} className={isPlaying ? 'animate-bounce' : ''} />
      {showLabel && <span className="font-medium text-xs">Audio</span>}
    </button>
  );
};

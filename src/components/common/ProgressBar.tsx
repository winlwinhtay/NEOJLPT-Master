import React from 'react';

interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  color?: string;
  className?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'bg-brand-500',
  className = '',
  showPercentage = false,
  size = 'md',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full flex items-center gap-3 ${className}`}>
      <div className={`flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`${color} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 min-w-[36px] text-right">
          {percentage}%
        </span>
      )}
    </div>
  );
};

export const ProgressRing: React.FC<{
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  subLabel?: string;
}> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = '#e11d48',
  label,
  subLabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const safePercent = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (safePercent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-800 fill-none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-black text-slate-900 dark:text-white">
          {label !== undefined ? label : `${safePercent}%`}
        </span>
        {subLabel && (
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};

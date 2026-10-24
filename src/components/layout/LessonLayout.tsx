import React from 'react';
import { LessonToolbar, LessonToolbarProps } from './LessonToolbar';

export interface LessonLayoutProps extends LessonToolbarProps {
  children: React.ReactNode;
  maxWidthClass?: string;
}

export const LessonLayout: React.FC<LessonLayoutProps> = ({
  children,
  maxWidthClass = 'max-w-5xl',
  ...toolbarProps
}) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Compact Distraction-Free Toolbar */}
      <LessonToolbar {...toolbarProps} />

      {/* Main Lesson Content - Expanded to available viewport without navigation offsets */}
      <main className="flex-1 w-full overflow-y-auto">
        <div className={`w-full mx-auto p-4 sm:p-6 lg:p-8 ${maxWidthClass} animate-fade-in`}>
          {children}
        </div>
      </main>
    </div>
  );
};

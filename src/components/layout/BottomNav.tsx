import React from 'react';
import { LayoutDashboard, Compass, Layers, CheckSquare, MoreHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n/I18nContext';
import { ViewType } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView, setMobileMenuOpen } = useApp();
  const { t } = useI18n();

  const items: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t('nav.dashboard', 'Dashboard'), icon: <LayoutDashboard size={20} /> },
    { id: 'learn', label: t('nav.learn', 'Learn'), icon: <Compass size={20} /> },
    { id: 'vocabulary', label: t('nav.vocabulary', 'Vocab'), icon: <Layers size={20} /> },
    { id: 'practice', label: t('nav.practice', 'Practice'), icon: <CheckSquare size={20} /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-brand-500 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <span className={isActive ? 'scale-110 transition-transform' : ''}>{item.icon}</span>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}

      {/* More / Menu Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-all"
      >
        <MoreHorizontal size={20} />
        <span className="text-[10px] mt-0.5">More</span>
      </button>
    </div>
  );
};

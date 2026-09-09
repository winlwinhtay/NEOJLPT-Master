import React from 'react';
import { X, Bell, Flame, BookOpen, Layers, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useSRS } from '../../context/SRSContext';
import { useUser } from '../../context/UserContext';

export const NotificationDrawer: React.FC = () => {
  const { notificationDrawerOpen, setNotificationDrawerOpen, setActiveView } = useApp();
  const { profile } = useUser();
  const { getDueTodayCount } = useSRS();

  if (!notificationDrawerOpen) return null;

  const dueCount = getDueTodayCount(profile.currentLevel);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Daily Streak is on Fire! 🔥',
      message: `You have reached a ${profile.streakDays}-day learning streak. Complete today's goal to keep it alive!`,
      time: '1 hour ago',
      icon: <Flame size={18} className="text-orange-500" />,
      actionView: 'dashboard',
    },
    {
      id: 'notif-2',
      title: 'Spaced Repetition Review Ready',
      message: `You have ${dueCount || 8} vocabulary and kanji cards ready for memory consolidation today.`,
      time: '3 hours ago',
      icon: <Layers size={18} className="text-indigo-500" />,
      actionView: 'vocabulary',
    },
    {
      id: 'notif-3',
      title: 'Recommended Grammar Lesson',
      message: 'Improve your particles and conditional expressions with Unit 1 Lesson 2.',
      time: '1 day ago',
      icon: <BookOpen size={18} className="text-emerald-500" />,
      actionView: 'learn',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setNotificationDrawerOpen(false)}
      />

      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl h-full z-10 flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-slide-left">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-brand-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">Study Notifications</h3>
            </div>
            <button
              onClick={() => setNotificationDrawerOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  setActiveView(n.actionView as any);
                  setNotificationDrawerOpen(false);
                }}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-brand-500 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shrink-0 shadow-sm">
                    {n.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-2 block">{n.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => {
              setActiveView('settings');
              setNotificationDrawerOpen(false);
            }}
            className="w-full py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-500 text-center block"
          >
            Manage Notification Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

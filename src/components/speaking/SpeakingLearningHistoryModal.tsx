import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  CheckCircle2,
  Trash2,
  Volume2,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  Briefcase,
  Search,
  Check,
} from 'lucide-react';
import { SavedLearningItem, SpeakingSessionRecord } from '../../types/speakingCoach';
import { SpeakingCoachService } from '../../services/speakingCoachService';
import { speechService } from '../../services/speechService';

interface SpeakingLearningHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  explanationLang: 'en' | 'my' | 'ja';
}

export const SpeakingLearningHistoryModal: React.FC<SpeakingLearningHistoryModalProps> = ({
  isOpen,
  onClose,
  explanationLang,
}) => {
  const [activeTab, setActiveTab] = useState<'saved_items' | 'session_history'>('saved_items');
  const [filterType, setFilterType] = useState<'all' | 'vocabulary' | 'grammar'>('all');
  const [savedItems, setSavedItems] = useState<SavedLearningItem[]>([]);
  const [sessions, setSessions] = useState<SpeakingSessionRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setSavedItems(SpeakingCoachService.loadSavedLearningItems());
    setSessions(SpeakingCoachService.loadSessionHistory());
  };

  const handleToggleKnown = (id: string) => {
    SpeakingCoachService.toggleItemKnown(id);
    loadData();
  };

  const handleRemoveItem = (id: string) => {
    SpeakingCoachService.removeSavedLearningItem(id);
    loadData();
  };

  const handlePlayAudio = (id: string, text: string) => {
    if (playingId === id) {
      speechService.stopAudio();
      setPlayingId(null);
      return;
    }
    setPlayingId(id);
    speechService.speakJapanese(text, {
      rate: 0.95,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  if (!isOpen) return null;

  const filteredItems = savedItems.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.original.toLowerCase().includes(q) ||
      item.enhanced.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      (item.explanation && item.explanation.toLowerCase().includes(q))
    );
  });

  const knownCount = savedItems.filter((i) => i.known).length;
  const learningCount = savedItems.length - knownCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Bookmark size={18} />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                Speaking Learning Notes & Progress
              </h2>
              <p className="text-xs text-indigo-200/80">
                လေ့လာထားသော ဝေါဟာရများနှင့် သဒ္ဒါမှတ်စုများ
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-center">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Saved Notes</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{savedItems.length}</span>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Mastered (တတ်မြောက်)</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{knownCount}</span>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Sessions (လေ့ကျင့်ချိန်)</span>
            <span className="text-lg font-black text-rose-600 dark:text-rose-400">{sessions.length}</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center justify-between px-4 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('saved_items')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'saved_items'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles size={14} />
              <span>Vocabulary & Grammar Notes ({savedItems.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('session_history')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'session_history'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Calendar size={14} />
              <span>Session History ({sessions.length})</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {activeTab === 'saved_items' ? (
            <div className="space-y-3">
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {(['all', 'vocabulary', 'grammar'] as const).map((ft) => (
                    <button
                      key={ft}
                      type="button"
                      onClick={() => setFilterType(ft)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                        filterType === ft
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {ft === 'all' ? 'All' : ft === 'vocabulary' ? 'Vocabulary' : 'Grammar'}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes..."
                    className="w-full sm:w-48 pl-8 pr-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Bookmark size={32} className="mx-auto text-slate-300 dark:text-slate-600 stroke-[1.5]" />
                  <p className="text-xs font-medium">
                    {savedItems.length === 0
                      ? 'No saved learning notes yet. Click "Save to Vocab" or "Save" in any speaking feedback card!'
                      : 'No items match your search filter.'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    စကားပြောခန်းများတွင် လေ့လာလိုသော ဝေါဟာရနှင့် သဒ္ဒါများကို Save ခလုတ်နှိပ်၍ သိမ်းဆည်းနိုင်ပါသည်။
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        item.known
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 opacity-80'
                          : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${
                                item.type === 'vocabulary'
                                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                              }`}
                            >
                              {item.type}
                            </span>
                            <span className="font-japanese font-bold text-base text-slate-900 dark:text-white">
                              {item.enhanced}
                            </span>
                            <button
                              type="button"
                              onClick={() => handlePlayAudio(item.id, item.enhanced)}
                              className="p-1 rounded text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer"
                              title="Listen"
                            >
                              <Volume2 size={13} />
                            </button>
                            <span className="text-[10px] text-slate-400 font-bold">{item.level}</span>
                          </div>

                          <p className="text-xs text-slate-700 dark:text-slate-300">
                            <span className="font-semibold text-slate-900 dark:text-white">Meaning: </span>
                            {item.meaning}
                          </p>

                          {item.example && (
                            <p className="text-[11px] font-japanese text-slate-600 dark:text-slate-400 italic">
                              "{item.example}"
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleKnown(item.id)}
                            className={`p-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 border ${
                              item.known
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                            }`}
                            title={item.known ? 'Mark as learning' : 'Mark as mastered'}
                          >
                            <Check size={12} />
                            <span className="text-[10px] hidden sm:inline">
                              {item.known ? 'Mastered' : 'Learned'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete note"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Calendar size={32} className="mx-auto text-slate-300 dark:text-slate-600 stroke-[1.5]" />
                  <p className="text-xs font-medium">No recorded speaking sessions yet.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {sess.topic}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500 text-white">
                            {sess.level}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                            {sess.mode}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(sess.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Turns: {sess.turnCount} spoken exchanges</span>
                        <span>{sess.feedbacks.length} detailed feedbacks</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

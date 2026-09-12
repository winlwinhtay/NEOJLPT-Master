import React from 'react';
import { BookOpen, X, CheckCircle2, AlertCircle, Sparkles, Compass } from 'lucide-react';

interface KanjiSchoolPrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KanjiSchoolPrinciplesModal: React.FC<KanjiSchoolPrinciplesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const principles = [
    {
      rule: '1. Top to Bottom (上から下へ)',
      desc: 'Strokes placed at the top are drawn before those below.',
      example: '三 (top horizontal, middle horizontal, bottom horizontal)',
    },
    {
      rule: '2. Left to Right (左から右へ)',
      desc: 'Strokes on the left side are written before those on the right.',
      example: '川 (left vertical, center vertical, right vertical)',
    },
    {
      rule: '3. Horizontal Before Vertical (横が先、縦が後)',
      desc: 'When horizontal and vertical strokes intersect, horizontal usually precedes vertical.',
      example: '十 (horizontal stroke first, then downward vertical stroke)',
    },
    {
      rule: '4. Middle Before Symmetrical Sides (中央が先、左右が後)',
      desc: 'When a character has a dominant center vertical with symmetrical sides, center goes first.',
      example: '小 (center vertical hook, left dot, right dot)',
    },
    {
      rule: '5. Outside Before Inside (外側が先、内側が後)',
      desc: 'Enclosing border frames are drawn before their interior contents.',
      example: '月, 同 (surrounding frame drawn before interior cross strokes)',
    },
    {
      rule: '6. Close Enclosures Last (最後に閉じる)',
      desc: 'Bottom horizontal closure stroke is drawn last after all interior components are placed.',
      example: '日, 国, 四 (bottom horizontal stroke seals the enclosure at the end)',
    },
  ];

  const schoolRoutine = [
    { step: '① Look (見る)', desc: '10 seconds examining character shape, balance, and proportions.' },
    { step: '② Say (読む)', desc: 'Pronounce the Onyomi and Kunyomi readings aloud with meanings.' },
    { step: '③ Watch (筆順)', desc: 'Follow the animated stroke order, noting direction and start points.' },
    { step: '④ Write (書く)', desc: 'Practice 3 to 5 times on the calligraphy grid with guidelines.' },
    { step: '⑤ Read (単語)', desc: 'Read real compound words in context rather than isolated readings.' },
    { step: '⑥ Use (文脈)', desc: 'Read authentic example sentences to understand real-world nuance.' },
    { step: '⑦ Recall (想起)', desc: 'Write the character once from memory without looking at the guide.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Compass size={18} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Japanese Kanji Writing Basics & School Method
              </h3>
              <p className="text-[11px] text-slate-400">
                Foundational rules of stroke order & pedagogical study routine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700 dark:text-slate-300">
          {/* Important Educational Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2.5">
            <AlertCircle size={18} className="shrink-0 text-amber-500 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Pedagogical Guideline:</span>
              These principles are general guidelines developed through centuries of calligraphy tradition.
              However, individual Kanji have established stroke orders that should be learned from the
              character itself.
            </div>
          </div>

          {/* Section 1: Writing Principles */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles size={16} className="text-brand-500" />
              6 Core Stroke Order Principles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1"
                >
                  <span className="font-bold text-slate-900 dark:text-white text-xs block">
                    {p.rule}
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    {p.desc}
                  </p>
                  <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold block pt-0.5">
                    e.g. {p.example}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: School-Inspired Daily Routine */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <BookOpen size={16} className="text-indigo-500" />
              Japanese School-Inspired Study Routine
            </h4>
            <div className="space-y-2">
              {schoolRoutine.map((s, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5"
                >
                  <span className="font-black text-slate-900 dark:text-white whitespace-nowrap">
                    {s.step}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 text-right bg-slate-50/50 dark:bg-slate-800/30">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Got it, return to lesson
          </button>
        </div>
      </div>
    </div>
  );
};

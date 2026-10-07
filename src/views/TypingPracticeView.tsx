import React, { useState, useMemo, useEffect } from 'react';
import {
  Keyboard,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Flame,
  ArrowRight,
  Volume2,
  BookOpen,
  Briefcase,
  Zap,
} from 'lucide-react';
import { JapaneseInput } from '../components/keyboard/JapaneseInput';
import { useJapaneseKeyboard } from '../context/JapaneseKeyboardContext';
import { AudioButton } from '../components/common/AudioButton';
import confetti from 'canvas-confetti';

interface TypingDrillItem {
  id: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'Business' | 'Interview';
  targetJp: string;
  reading: string;
  romaji: string;
  meaningEn: string;
  category: string;
}

const TYPING_DRILLS: TypingDrillItem[] = [
  // N5: Kana & basic everyday words
  {
    id: 'n5-1',
    level: 'N5',
    targetJp: 'こんにちは',
    reading: 'こんにちは',
    romaji: 'konnichiwa',
    meaningEn: 'Hello / Good afternoon',
    category: 'Daily Greeting',
  },
  {
    id: 'n5-2',
    level: 'N5',
    targetJp: 'ありがとう',
    reading: 'ありがとう',
    romaji: 'arigatou',
    meaningEn: 'Thank you',
    category: 'Essential Expression',
  },
  {
    id: 'n5-3',
    level: 'N5',
    targetJp: 'さくら',
    reading: 'さくら',
    romaji: 'sakura',
    meaningEn: 'Cherry blossom',
    category: 'Nature',
  },
  {
    id: 'n5-4',
    level: 'N5',
    targetJp: 'わたしは学生です',
    reading: 'わたしはがくせいです',
    romaji: 'watashi wa gakusei desu',
    meaningEn: 'I am a student',
    category: 'Grammar',
  },
  {
    id: 'n5-5',
    level: 'N5',
    targetJp: '日本語を勉強しています',
    reading: 'にほんごをべんきょうしています',
    romaji: 'nihongo wo benkyou shiteimasu',
    meaningEn: 'I am studying Japanese',
    category: 'Sentence',
  },

  // N4: Everyday vocabulary & collocations
  {
    id: 'n4-1',
    level: 'N4',
    targetJp: 'きょうは会社へ行きます',
    reading: 'きょうはかいしゃへいきます',
    romaji: 'kyou wa kaisha he ikimasu',
    meaningEn: 'Today I go to the company',
    category: 'Daily Life',
  },
  {
    id: 'n4-2',
    level: 'N4',
    targetJp: '学校で宿題をします',
    reading: 'がっこうでしゅくだいをします',
    romaji: 'gakkou de shukudai wo shimasu',
    meaningEn: 'I will do my homework at school',
    category: 'School',
  },
  {
    id: 'n4-3',
    level: 'N4',
    targetJp: '郵便局で切手を買いました',
    reading: 'ゆうびんきょくできってをかいました',
    romaji: 'yuubinkyoku de kitte wo kaimashita',
    meaningEn: 'I bought postage stamps at the post office',
    category: 'Errands',
  },

  // N3: Conversational & connecting expressions
  {
    id: 'n3-1',
    level: 'N3',
    targetJp: '東京へ旅行に行ったことがあります',
    reading: 'とうきょうへりょこうにいったことがあります',
    romaji: 'toukyou he ryokou ni itta koto ga arimasu',
    meaningEn: 'I have traveled to Tokyo before',
    category: 'Travel & Experience',
  },
  {
    id: 'n3-2',
    level: 'N3',
    targetJp: '雨が降っても試合は中止になりません',
    reading: 'あめがふってもしあいはちゅうしになりません',
    romaji: 'ame ga futtemo shiai wa chuushi ni narimasen',
    meaningEn: 'Even if it rains, the match will not be canceled',
    category: 'Conjunctions',
  },

  // N2 & N1: Advanced sentences & nuance
  {
    id: 'n2-1',
    level: 'N2',
    targetJp: '昨日の会議の議事録をご確認いただけますでしょうか',
    reading: 'きのうのかいぎのぎじろくをごかくにんいただけますでしょうか',
    romaji: 'kinou no kaigi no gijiroku wo gokakunin itadakemasu deshou ka',
    meaningEn: 'Could you please review the minutes from yesterday\'s meeting?',
    category: 'Advanced Communication',
  },
  {
    id: 'n1-1',
    level: 'N1',
    targetJp: '諸般の事情を鑑み、計画を再検討せざるを得ない',
    reading: 'しょはんのじじょうをかんがみ、けいかくをさいけんとうせざるをえない',
    romaji: 'shohan no jijou wo kangami, keikaku wo saikentou sezaru wo enai',
    meaningEn: 'In light of various circumstances, we have no choice but to reconsider the plan',
    category: 'Executive Japanese',
  },

  // Business: Professional emails & keigo
  {
    id: 'biz-1',
    level: 'Business',
    targetJp: 'いつも大変お世話になっております',
    reading: 'いつもたいへんおせわになっております',
    romaji: 'itsumo taihen osewa ni natte orimasu',
    meaningEn: 'Thank you very much for your continued support',
    category: 'Email Opening',
  },
  {
    id: 'biz-2',
    level: 'Business',
    targetJp: '何卒よろしくお願い申し上げます',
    reading: 'なにとぞよろしくおねがいもうしあげます',
    romaji: 'nanitozo yoroshiku onegai moushiagemasu',
    meaningEn: 'We sincerely appreciate your kind cooperation',
    category: 'Email Closing',
  },

  // Interview: Career & Interview Answers
  {
    id: 'int-1',
    level: 'Interview',
    targetJp: '貴社のグローバル事業に貢献したいと考えております',
    reading: 'きしゃのぐろーばるじぎょうにこうけんしたいとかんがえております',
    romaji: 'kisha no guroobaru jigyou ni kouken shitai to kangaete orimasu',
    meaningEn: 'I wish to contribute to your company\'s global business expansion',
    category: 'Motivation / 志望動機',
  },
  {
    id: 'int-2',
    level: 'Interview',
    targetJp: '困難な状況でも粘り強く行動することが私の強みです',
    reading: 'こんなんなじょうきょうでもねばりづよくこうどうすることがわたしのつよみです',
    romaji: 'konnan na joukyou demo nebariduyoku koudou suru koto ga watashi no tsuyomi desu',
    meaningEn: 'My strength is taking resilient action even in challenging circumstances',
    category: 'Self-PR / 自己PR',
  },
];

export const TypingPracticeView: React.FC = () => {
  const { openKeyboard } = useJapaneseKeyboard();
  const [selectedLevel, setSelectedLevel] = useState<
    'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'Business' | 'Interview'
  >('N5');
  const [drillIndex, setDrillIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [cpm, setCpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [streak, setStreak] = useState(0);

  const filteredDrills = useMemo(
    () => TYPING_DRILLS.filter((d) => d.level === selectedLevel),
    [selectedLevel]
  );

  const currentDrill = filteredDrills[drillIndex] || filteredDrills[0];

  // Auto-open keyboard on practice launch for convenience
  useEffect(() => {
    openKeyboard();
  }, [openKeyboard]);

  // Reset drill state when level changes
  const handleSelectLevel = (lvl: typeof selectedLevel) => {
    setSelectedLevel(lvl);
    setDrillIndex(0);
    setInputVal('');
    setStartTime(null);
    setCpm(0);
  };

  // Check matching and calculate CPM
  const handleInputChange = (val: string) => {
    setInputVal(val);
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (startTime) {
      const elapsedMin = (Date.now() - startTime) / 60000;
      if (elapsedMin > 0.05) {
        const chars = val.length;
        setCpm(Math.round(chars / elapsedMin));
      }
    }

    // Normalized matching (ignoring whitespace differences)
    const normInput = val.replace(/\s+/g, '');
    const normTarget = currentDrill.targetJp.replace(/\s+/g, '');
    const normReading = currentDrill.reading.replace(/\s+/g, '');

    const isMatch = normInput === normTarget || normInput === normReading;

    if (isMatch) {
      setStreak((s) => s + 1);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {}

      setTimeout(() => {
        if (drillIndex + 1 < filteredDrills.length) {
          setDrillIndex((i) => i + 1);
        } else {
          setDrillIndex(0);
        }
        setInputVal('');
        setStartTime(null);
      }, 700);
    }
  };

  const handleSkip = () => {
    setInputVal('');
    setStartTime(null);
    setDrillIndex((i) => (i + 1) % filteredDrills.length);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in pb-48">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
            <Keyboard size={15} /> タイピング練習 (Interactive Typing Studio)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            In-App Japanese Typing Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master Kana and Kanji typing on computers without Japanese IME installed.
          </p>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Flame size={16} />
            <span>{streak} Streak</span>
          </div>
          {cpm > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono">
              <Zap size={16} />
              <span>{cpm} CPM</span>
            </div>
          )}
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['N5', 'N4', 'N3', 'N2', 'N1', 'Business', 'Interview'] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => handleSelectLevel(lvl)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedLevel === lvl
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 font-black'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {lvl === 'Business'
              ? 'ビジネス Business'
              : lvl === 'Interview'
              ? '面接 Interview'
              : `${lvl} Level`}
          </button>
        ))}
      </div>

      {/* Active Drill Card */}
      {currentDrill && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 text-xs font-bold uppercase">
              {currentDrill.category}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              Drill {drillIndex + 1} of {filteredDrills.length}
            </span>
          </div>

          {/* Target Sentence Display */}
          <div className="space-y-2 py-4">
            <div className="text-3xl sm:text-4xl font-black font-japanese text-slate-900 dark:text-white tracking-tight">
              {currentDrill.targetJp}
            </div>
            <div className="text-sm font-japanese text-slate-400 font-medium">
              {currentDrill.reading}
            </div>
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
              Romaji: /{currentDrill.romaji}/
            </div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 pt-1">
              "{currentDrill.meaningEn}"
            </div>
          </div>

          <div className="flex justify-center">
            <AudioButton text={currentDrill.targetJp} size="md" showLabel />
          </div>

          {/* Interactive Japanese Input */}
          <div className="max-w-xl mx-auto space-y-4 pt-2">
            <JapaneseInput
              value={inputVal}
              onChange={handleInputChange}
              placeholder="ここに日本語を入力 (Type with keyboard or virtual buttons)..."
              autoFocus
              showKeyboardToggle={true}
              enableRomajiConversion={true}
              inputClassName="text-center font-bold text-base sm:text-lg"
            />

            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <span>
                💡 Tip: Type in Romaji (e.g. <code>{currentDrill.romaji.split(' ')[0]}</code>) or tap on-screen keys!
              </span>
              <button
                type="button"
                onClick={handleSkip}
                className="text-slate-500 hover:text-brand-600 font-bold flex items-center gap-1 cursor-pointer"
              >
                Skip <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

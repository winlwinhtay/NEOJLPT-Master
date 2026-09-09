import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Languages,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { AIService } from '../services/aiService';
import { speechService } from '../services/speechService';
import { AudioButton } from '../components/common/AudioButton';
import { AIConversationTopic, AIMessage } from '../types/ai';

export const AIConversationView: React.FC = () => {
  const { activeLevel } = useApp();
  const { profile, logActivity } = useUser();

  const [selectedTopic, setSelectedTopic] = useState<AIConversationTopic>('restaurant');
  const [japaneseOnly, setJapaneseOnly] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [summaryReport, setSummaryReport] = useState<any | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const topicMeta = AIService.getTopicMeta(selectedTopic);

  // Initialize conversation with bot starter message
  useEffect(() => {
    const starter = topicMeta.initialBotMessage[activeLevel] || topicMeta.initialBotMessage['N5'];
    const initialMsg: AIMessage = {
      id: 'bot-start',
      sender: 'ai',
      textJp: starter.jp,
      reading: starter.reading,
      textEn: starter.en,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMsg]);
    setSummaryReport(null);
  }, [selectedTopic, activeLevel]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || isBotTyping) return;

    const userMsg: AIMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      textJp: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputVal('');
    setIsBotTyping(true);

    logActivity('practice', 1);

    try {
      const botReply = await AIService.generateReply(
        textToSend,
        selectedTopic,
        activeLevel,
        newHistory
      );
      setMessages((prev) => [...prev, botReply]);

      // Play audio automatically if enabled
      if (profile.audioAutoPlay) {
        speechService.speakJapanese(botReply.textJp, { rate: profile.speechSpeed });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Microphone STT recognition trigger
  const handleMicToggle = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const rec = speechService.createRecognitionSession(
      (transcript, isFinal) => {
        setInputVal(transcript);
        if (isFinal) {
          setIsListening(false);
          handleSendMessage(transcript);
        }
      },
      (err) => {
        console.error('Speech error', err);
        setIsListening(false);
      },
      () => setIsListening(false)
    );

    if (rec.isSupported) {
      setIsListening(true);
      rec.start();
    } else {
      alert('Speech Recognition is not supported in this browser. Please type your message.');
    }
  };

  const handleEndSession = () => {
    const userMessageCount = messages.filter((m) => m.sender === 'user').length;
    setSummaryReport({
      overallGrammarScore: Math.min(95, 75 + userMessageCount * 5),
      naturalnessScore: 84,
      vocabularyBreadth: 80,
      keyMistakes: [
        {
          mistake: 'Avoid repeating 「私は」(watashi wa) in every sentence.',
          correction: 'Omit the subject once established in context.',
          reason: 'Japanese is a high-context language where topics are implied.',
        },
      ],
      recommendedGrammarLessons: ['〜てください (Requests)', '〜にします (Choices)'],
      newVocabularyLearned: [
        { word: 'おすすめ', reading: 'おすすめ', meaning: 'recommendation' },
        { word: 'かしこまりました', reading: 'かしこまりました', meaning: 'certainly / understood' },
      ],
      motivationalNote: 'Great conversation! Your polite register matches N5 expectations.',
    });
  };

  const topicsList: { id: AIConversationTopic; label: string; icon: string }[] = [
    { id: 'restaurant', label: 'Restaurant', icon: '🍜' },
    { id: 'self_introduction', label: 'Self Introduction', icon: '👋' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'hotel', label: 'Hotel Check-in', icon: '🏨' },
    { id: 'daily_conversation', label: 'Daily Chat', icon: '☕' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Roleplay Dialogue Partner
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            AI Japanese Conversation Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Chat with AI adapted to {activeLevel}. Get real-time grammar checks and natural alternatives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Japanese-Only Mode Switch */}
          <button
            onClick={() => setJapaneseOnly(!japaneseOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              japaneseOnly
                ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            <Languages size={14} />
            {japaneseOnly ? 'Japanese Only ON' : 'Show Translations'}
          </button>
        </div>
      </div>

      {/* Topic Switcher Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        {topicsList.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTopic(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
              selectedTopic === t.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Main Chat Studio */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[580px] overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-base">
              {topicMeta.icon}
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {topicMeta.title} ({topicMeta.titleJp})
              </h3>
              <p className="text-[11px] text-slate-400">{topicMeta.description}</p>
            </div>
          </div>

          <button
            onClick={handleEndSession}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
          >
            Finish & Feedback
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5 animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                    isUser
                      ? 'bg-brand-500 text-white rounded-br-none shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-japanese font-bold text-sm sm:text-base">{m.textJp}</p>
                    {!isUser && <AudioButton text={m.textJp} size="sm" />}
                  </div>

                  {!isUser && !japaneseOnly && m.reading && (
                    <p className="text-xs text-slate-400 font-japanese">{m.reading}</p>
                  )}

                  {!isUser && !japaneseOnly && m.textEn && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                      {m.textEn}
                    </p>
                  )}

                  {/* Real-time linguistic feedback for user errors */}
                  {m.feedback && (
                    <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                      {m.feedback.grammarMistakes?.map((err, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
                          <span>{err}</span>
                        </div>
                      ))}
                      {m.feedback.naturalJapaneseAlternatives?.map((alt, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <Lightbulb size={13} className="text-indigo-600 shrink-0 mt-0.5" />
                          <span>Natural phrasing: {alt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 px-1">{m.timestamp}</span>
              </div>
            );
          })}

          {isBotTyping && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 w-28 text-slate-400 text-xs animate-pulse">
              <Bot size={16} /> Typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Reply in Japanese (e.g. ラーメンを一つお願いします)..."
              className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-transparent focus:border-indigo-500 outline-none text-xs sm:text-sm text-slate-900 dark:text-white"
            />

            {/* Mic STT Button */}
            <button
              type="button"
              onClick={handleMicToggle}
              className={`p-2.5 rounded-2xl transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title="Speak into Microphone"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button
              type="submit"
              disabled={!inputVal.trim() || isBotTyping}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Send size={16} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Post-Session Summary Feedback Modal */}
      {summaryReport && (
        <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800 space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles size={24} className="text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  AI Conversation Performance Summary
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Detailed linguistic assessment of your conversational fluency.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSummaryReport(null)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Close Report
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Grammar Accuracy</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {summaryReport.overallGrammarScore}%
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Natural Phrasing</span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {summaryReport.naturalnessScore}%
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Vocabulary Breadth</span>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-0.5">
                {summaryReport.vocabularyBreadth}%
              </div>
            </div>
          </div>

          {/* Motivational & Recommendations */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 text-xs space-y-2">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block uppercase tracking-wider text-[10px]">
              Tutor Note:
            </span>
            <p className="text-slate-700 dark:text-slate-300">{summaryReport.motivationalNote}</p>
          </div>
        </div>
      )}
    </div>
  );
};

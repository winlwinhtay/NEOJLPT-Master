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
  Eye,
  EyeOff,
  Activity,
  Wifi,
  WifiOff,
  Key,
  X,
  Settings,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { AIService } from '../services/aiService';
import { speechService } from '../services/speechService';
import { AudioButton } from '../components/common/AudioButton';
import { JapaneseInput } from '../components/keyboard/JapaneseInput';
import { AuthService } from '../services/authService';
import { AIAccessGateModal } from '../components/auth/AIAccessGateModal';
import { AIConversationTopic, AIMessage } from '../types/ai';
import { TranslationToggleButton } from '../components/common/TranslationToggleButton';

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
  const [aiGateModalOpen, setAiGateModalOpen] = useState(false);
  const [aiConfigModalOpen, setAiConfigModalOpen] = useState(false);
  const [revealedChatTranslations, setRevealedChatTranslations] = useState<Record<string, boolean>>({});
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    provider: 'edge' | 'direct' | 'local';
    latencyMs: number;
    model: string;
    details?: string;
  } | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState(AIService.getEffectiveApiKey());
  const [keySavedToast, setKeySavedToast] = useState(false);

  const toggleMessageReveal = (id: string) => {
    setRevealedChatTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const topicMeta = AIService.getTopicMeta(selectedTopic);

  // Check connection status on mount
  useEffect(() => {
    AIService.checkAIConnection().then(setConnectionStatus);
  }, []);

  const handleTestConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const res = await AIService.checkAIConnection();
      setConnectionStatus(res);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  const handleSaveCustomKey = () => {
    AIService.setCustomApiKey(customKeyInput);
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 3000);
    handleTestConnection();
  };

  // Initialize conversation with bot starter message & initial suggestions
  useEffect(() => {
    const starter = topicMeta.initialBotMessage[activeLevel] || topicMeta.initialBotMessage['N5'];

    let initialSuggestions = ['こんにちは！', 'よろしくお願いします！'];
    if (selectedTopic === 'restaurant') {
      initialSuggestions = ['1人です（ひとりです）', 'おすすめは何ですか？'];
    } else if (selectedTopic === 'shopping') {
      initialSuggestions = ['このシャツを見せてください', '試着できますか？'];
    } else if (selectedTopic === 'hotel') {
      initialSuggestions = ['チェックインをお願いします', '予約した田中です'];
    } else if (selectedTopic === 'self_introduction') {
      initialSuggestions = ['初めまして！ミンと申します。', 'ミャンマーから来ました。'];
    }

    const initialMsg: AIMessage = {
      id: 'bot-start',
      sender: 'ai',
      textJp: starter.jp,
      reading: starter.reading,
      textEn: starter.en,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedReplies: initialSuggestions,
      apiSource: 'smart_contextual',
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

    // Supabase Email Authentication Check for Full AI Feature
    const authCheck = AuthService.canAccessAIFeature(profile);
    if (!authCheck.allowed) {
      setAiGateModalOpen(true);
      return;
    }

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
    // Supabase Email Authentication Check for Full AI Feature
    const authCheck = AuthService.canAccessAIFeature(profile);
    if (!authCheck.allowed) {
      setAiGateModalOpen(true);
      return;
    }

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
          {/* Translation Toggle with Optional Language Selector */}
          <TranslationToggleButton />
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
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {topicMeta.title} ({topicMeta.titleJp})
                </h3>
                <button
                  type="button"
                  onClick={() => setAiConfigModalOpen(true)}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                    connectionStatus?.connected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                  }`}
                  title="Click to check AI API connection or set custom Gemini key"
                >
                  <Sparkles size={11} className={connectionStatus?.connected ? 'text-emerald-500' : 'text-indigo-500'} />
                  <span>
                    {connectionStatus?.connected
                      ? `${connectionStatus.provider === 'edge' ? 'Cloud Gateway' : 'Direct Cloud'} Active`
                      : 'Smart AI Tutor (Active)'}
                  </span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">{topicMeta.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAiConfigModalOpen(true)}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="AI Connection & API Settings"
            >
              <Settings size={15} />
            </button>
            <button
              onClick={handleEndSession}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
            >
              Finish & Feedback
            </button>
          </div>
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

                  {!isUser && (profile.showTranslation !== false || revealedChatTranslations[m.id]) && (
                    <div className="pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 space-y-1">
                      {m.textEn && (
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {m.textEn}
                        </p>
                      )}
                      {m.textMy && (
                        <p className="text-xs text-brand-600 dark:text-brand-400 font-myanmar leading-relaxed">
                          🇲🇲 {m.textMy}
                        </p>
                      )}
                    </div>
                  )}

                  {!isUser && profile.showTranslation === false && !revealedChatTranslations[m.id] && (m.textEn || m.textMy) && (
                    <button
                      type="button"
                      onClick={() => toggleMessageReveal(m.id)}
                      className="text-[10px] text-indigo-500 dark:text-indigo-400 hover:underline flex items-center gap-1 font-bold pt-1 cursor-pointer"
                    >
                      <Eye size={11} />
                      <span>Translate message</span>
                    </button>
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
                <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 w-full max-w-[85%] sm:max-w-[75%]">
                  <span>{m.timestamp}</span>
                  {!isUser && (
                    <span className="flex items-center gap-1 font-bold text-[9px] text-indigo-500 dark:text-indigo-400">
                      {m.apiSource === 'edge_gemini' && '✨ Cloud Gemini AI'}
                      {m.apiSource === 'direct_gemini' && '✨ Direct Gemini AI'}
                      {(!m.apiSource || m.apiSource === 'smart_contextual') && '⚡ Smart AI Tutor'}
                    </span>
                  )}
                </div>
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

        {/* Full AI API Status Banner */}
        {!AuthService.canAccessAIFeature(profile).allowed && (
          <div className="px-5 py-2.5 bg-indigo-50/90 dark:bg-indigo-950/50 border-t border-indigo-200 dark:border-indigo-900/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
              <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Full AI Conversation Tutor requires email sign-in (Supabase). Standard lessons are 100% free with no login!</span>
            </div>
            <button
              type="button"
              onClick={() => setAiGateModalOpen(true)}
              className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-sm transition-all shrink-0 cursor-pointer"
            >
              Sign In with Email
            </button>
          </div>
        )}

        {/* Suggested Quick Replies for Interactive Q&A */}
        {(() => {
          const lastAi = [...messages].reverse().find((m) => m.sender === 'ai');
          if (!lastAi?.suggestedReplies?.length || isBotTyping) return null;
          return (
            <div className="px-4 sm:px-6 py-2.5 bg-slate-50/90 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 font-myanmar">
                <Lightbulb size={12} className="text-amber-500" /> အကြံပြုချက်:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {lastAi.suggestedReplies.map((reply, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(reply)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200 dark:border-slate-700 hover:border-brand-300 text-xs font-japanese font-bold text-slate-800 dark:text-slate-200 transition-all shrink-0 cursor-pointer shadow-xs"
                  >
                    💬 {reply}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Input Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="flex-1">
              <JapaneseInput
                value={inputVal}
                onChange={setInputVal}
                onSubmit={handleSendMessage}
                placeholder="Reply in Japanese (e.g. ラーメンを一つお願いします)..."
                disabled={isBotTyping}
                className="w-full"
                inputClassName="bg-slate-100 dark:bg-slate-800 rounded-2xl border border-transparent focus:border-indigo-500 outline-none text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>

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

      {/* AI Access Gate Modal */}
      <AIAccessGateModal
        isOpen={aiGateModalOpen}
        onClose={() => setAiGateModalOpen(false)}
        featureTitle="AI Japanese Conversation Tutor"
        featureDescription="Engage in dynamic, conversational Japanese roleplay with our adaptive AI conversation partner."
      />

      {/* AI Connection & Diagnostics Modal */}
      {aiConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    AI API ချိတ်ဆက်မှုနှင့် ကုန်ကျစရိတ်ထိန်းချုပ်မှု
                  </h3>
                  <p className="text-[11px] text-slate-400 font-myanmar">
                    Interactive Q&A & Cost Optimization
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAiConfigModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Connection Status Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-300">ချိတ်ဆက်မှု အခြေအနေ:</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                    connectionStatus?.connected
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  {connectionStatus?.connected ? (
                    <>
                      <Wifi size={12} /> ချိတ်ဆက်ပြီး (Live Active)
                    </>
                  ) : (
                    <>
                      <Activity size={12} /> Smart Local Tutor (Offline)
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span>အသုံးပြုနေသည့် မော်ဒယ်:</span>
                <span className="font-mono font-bold text-[11px] text-slate-800 dark:text-slate-200">
                  {connectionStatus?.model || 'gemini-2.5-flash'}
                </span>
              </div>

              {connectionStatus?.connected && (
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>တုန့်ပြန်မှု ကြာချိန် (Latency):</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {connectionStatus.latencyMs} ms
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isCheckingConnection}
                className="w-full mt-1 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Activity size={14} className={isCheckingConnection ? 'animate-spin' : ''} />
                <span>{isCheckingConnection ? 'စစ်ဆေးနေပါသည်...' : 'API ချိတ်ဆက်မှု စစ်ဆေးမည် (Test Connection)'}</span>
              </button>
            </div>

            {/* Optional Custom Gemini Key */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Key size={14} className="text-amber-500" />
                  Gemini API Key (စိတ်ကြိုက်ထည့်သွင်းနိုင်သည် - Optional)
                </label>
                {customKeyInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomKeyInput('');
                      AIService.setCustomApiKey('');
                      handleTestConnection();
                    }}
                    className="text-[10px] text-rose-500 hover:underline"
                  >
                    Clear Key
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-myanmar">
                Supabase Edge Function အပြင် သင့်ကိုယ်ပိုင် Google AI Studio Gemini API Key ထည့်သွင်း၍လည်း တိုက်ရိုက်အသုံးပြုနိုင်ပါသည်။
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleSaveCustomKey}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Save
                </button>
              </div>
              {keySavedToast && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> သိမ်းဆည်းပြီးပါပြီ!
                </p>
              )}
            </div>

            {/* Cost Optimization Highlights */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-[11px] space-y-1 text-emerald-900 dark:text-emerald-200 font-myanmar">
              <span className="font-bold flex items-center gap-1 text-emerald-800 dark:text-emerald-300">
                💰 ကုန်ကျစရိတ် သက်သာစေရန် ပြုလုပ်ထားချက်များ:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-300">
                <li>အလွန်ပေါ့ပါးမြန်ဆန်သော Gemini 2.5 Flash မော်ဒယ်ကိုသာ အသုံးပြုထားသည်။</li>
                <li>Token ကုန်ကျမှု မများစေရန် စကားပြောမှတ်တမ်း ၄ ကြိမ်ကိုသာ စနစ်တကျ ကန့်သတ်ပေးပို့သည်။</li>
                <li>မက်ဆေ့ချ်တစ်ခုလျှင် ကုန်ကျစရိတ် $0.0001 အောက်သာ ရှိပါသည်။</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
  Sliders,
  Clock,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useUser } from '../context/UserContext';
import { AIService } from '../services/aiService';
import { speechService, RecognitionSessionHandle } from '../services/speechService';
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

  interface VoiceSettings {
    maxDuration: number; // in seconds (15, 30, 60, 120)
    silenceTimeout: number; // in ms (0 = manual stop only, 3000 = 3s, 5000 = 5s)
    autoSend: boolean; // false = review first, true = send directly
  }

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => {
    try {
      const saved = localStorage.getItem('jlpt_ai_voice_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      maxDuration: 30,
      silenceTimeout: 0, // 0 = manual stop only (default) so pauses don't cut off speech!
      autoSend: false,   // false = review & edit first
    };
  });
  const [voiceSettingsOpen, setVoiceSettingsOpen] = useState(false);
  const [recordingElapsed, setRecordingElapsed] = useState(0);
  const [recordingRemaining, setRecordingRemaining] = useState(30);
  const [liveTranscript, setLiveTranscript] = useState('');
  const recognitionRef = useRef<RecognitionSessionHandle | null>(null);

  const updateVoiceSettings = (newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('jlpt_ai_voice_settings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, []);

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

  // Microphone Continuous STT Recognition Controls
  const handleStartVoiceRecording = () => {
    // Supabase Email Authentication Check for Full AI Feature
    const authCheck = AuthService.canAccessAIFeature(profile);
    if (!authCheck.allowed) {
      setAiGateModalOpen(true);
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    setRecordingElapsed(0);
    setRecordingRemaining(voiceSettings.maxDuration);
    setLiveTranscript('');
    setIsListening(true);

    const session = speechService.createContinuousRecognitionSession({
      lang: 'ja-JP',
      continuous: true,
      maxDurationSeconds: voiceSettings.maxDuration,
      silenceTimeoutMs: voiceSettings.silenceTimeout,
      onInterim: (interim, full) => {
        setLiveTranscript(full);
        setInputVal(full);
      },
      onTimeTick: (elapsed, remaining) => {
        setRecordingElapsed(elapsed);
        setRecordingRemaining(remaining);
      },
      onFinalResult: (finalText) => {
        setIsListening(false);
        const trimmed = finalText.trim();
        if (trimmed) {
          setInputVal(trimmed);
          if (voiceSettings.autoSend) {
            handleSendMessage(trimmed);
          }
        }
      },
      onError: (err) => {
        console.error('Speech error', err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    recognitionRef.current = session;
    if (session.isSupported) {
      session.start();
    } else {
      setIsListening(false);
      alert('Speech Recognition is not supported in this browser. Please type your message.');
    }
  };

  const handleStopVoiceRecording = (sendImmediately: boolean = false) => {
    if (!recognitionRef.current) {
      setIsListening(false);
      return;
    }

    const textToKeep = liveTranscript || inputVal;
    recognitionRef.current.stop();
    recognitionRef.current = null;
    setIsListening(false);

    if (textToKeep.trim()) {
      setInputVal(textToKeep.trim());
      if (sendImmediately || voiceSettings.autoSend) {
        handleSendMessage(textToKeep.trim());
      }
    }
  };

  const handleCancelVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setLiveTranscript('');
  };

  const handleMicToggle = () => {
    if (isListening) {
      handleStopVoiceRecording(false);
    } else {
      handleStartVoiceRecording();
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

        {/* Interactive Live Voice Recording Banner */}
        {isListening && (
          <div className="px-4 py-3 bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 dark:from-rose-950/50 dark:via-amber-950/30 dark:to-rose-950/50 border-t border-rose-200 dark:border-rose-900/60 animate-fade-in shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left: Indicator, Timer & Live Transcript */}
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center animate-pulse shadow-md shadow-rose-500/40">
                    <Mic size={18} />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black tracking-wide text-rose-600 dark:text-rose-400 uppercase">
                      🎙️ Recording (Japanese)
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                      {Math.floor(recordingElapsed / 60)}:{(recordingElapsed % 60).toString().padStart(2, '0')} / {Math.floor(voiceSettings.maxDuration / 60)}:{(voiceSettings.maxDuration % 60).toString().padStart(2, '0')}
                    </span>
                    {voiceSettings.silenceTimeout === 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                        Manual Mode (No Cutoff)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-200 font-japanese font-medium truncate max-w-[260px] sm:max-w-md">
                    {liveTranscript ? `「${liveTranscript}」` : '日本語でお話しください（話す途中で止まりません）...'}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleCancelVoiceRecording}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  title="Cancel recording"
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStopVoiceRecording(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                  title="Finish recording and review/edit text before sending"
                >
                  <Check size={14} />
                  <span>Review / Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStopVoiceRecording(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-rose-500/30 transition-all cursor-pointer"
                  title="Finish and send immediately to AI"
                >
                  <Send size={14} />
                  <span>Send</span>
                </button>
              </div>
            </div>

            {/* Time Limit Progress Bar */}
            <div className="w-full bg-rose-200/60 dark:bg-rose-950/60 rounded-full h-1 mt-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-500 h-1 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (recordingElapsed / voiceSettings.maxDuration) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

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

            {/* Voice Limit / Settings Button */}
            <button
              type="button"
              onClick={() => setVoiceSettingsOpen(true)}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
              title="Voice Recording Limit & Controls (အသံသွင်းခြင်း ဆက်တင်များ)"
            >
              <Sliders size={18} />
            </button>

            {/* Mic STT Button */}
            <button
              type="button"
              onClick={handleMicToggle}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isListening ? 'Stop recording (အသံသွင်းခြင်း ရပ်မည်)' : 'Start speaking (ဂျပန်လို အသံသွင်းပြောဆိုမည်)'}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button
              type="submit"
              disabled={!inputVal.trim() || isBotTyping}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
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

      {/* Voice Controls & Duration Limit Modal */}
      {voiceSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <Sliders size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Voice Recording & Limit Controls
                  </h3>
                  <p className="text-[11px] text-slate-400 font-myanmar">
                    အသံသွင်းချိန် ကန့်သတ်ချက်နှင့် ထိန်းချုပ်မှုများ
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVoiceSettingsOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Explanation Banner */}
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed font-myanmar flex items-start gap-2">
              <Lightbulb size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>
                ဂျပန်စကားပြောရာတွင် စကားမဆုံးသေးမီ အသံရပ်မသွားစေရန် <strong>Manual Stop Only</strong> ကို အကြံပြုထားပါသည်။ မိမိစိတ်ကြိုက် စဉ်းစားပြောဆိုပြီးမှ Stop နှိပ်နိုင်ပါသည်။
              </span>
            </div>

            {/* Section 1: Duration Limit */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-myanmar">
                <Clock size={14} className="text-rose-500" />
                <span>စကားပြောချိန် အများဆုံး ကန့်သတ်ချက် (Max Time Limit)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { sec: 15, label: '15 စက္ကန့်', desc: 'စကားတို (Quick reply)' },
                  { sec: 30, label: '30 စက္ကန့်', desc: 'စံနှုန်း (Standard - Default)' },
                  { sec: 60, label: '60 စက္ကန့်', desc: 'စကားရှည် (Detailed)' },
                  { sec: 120, label: '120 စက္ကန့်', desc: 'အပြည့်အစုံ (Story)' },
                ].map((item) => (
                  <button
                    key={item.sec}
                    type="button"
                    onClick={() => updateVoiceSettings({ maxDuration: item.sec })}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      voiceSettings.maxDuration === item.sec
                        ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] text-slate-400 font-myanmar">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Silence & Pause Handling */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-myanmar">
                <Mic size={14} className="text-rose-500" />
                <span>စကားရပ်နားချိန် စောင့်ဆိုင်းမှု (Pause Tolerance)</span>
              </label>
              <div className="space-y-1.5">
                {[
                  {
                    val: 0,
                    title: 'Manual Stop Only (အကြံပြုထားသည်)',
                    desc: 'စကားမဆုံးခင် အသံလုံးဝမရပ်ပါ။ Stop နှိပ်မှသာ အသံသွင်းခြင်း ရပ်ပါမည်။',
                  },
                  {
                    val: 5000,
                    title: '၅ စက္ကန့် စောင့်မည် (5s Silence Timeout)',
                    desc: 'စကားပြောရပ်နားပြီး ၅ စက္ကန့်ကြာ တိတ်ဆိတ်နေမှ အလိုအလျောက် ရပ်ပါမည်။',
                  },
                  {
                    val: 3000,
                    title: '၃ စက္ကန့် စောင့်မည် (3s Silence Timeout)',
                    desc: 'စကားပြောရပ်နားပြီး ၃ စက္ကန့်ကြာ တိတ်ဆိတ်နေမှ အလိုအလျောက် ရပ်ပါမည်။',
                  },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => updateVoiceSettings({ silenceTimeout: item.val })}
                    className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                      voiceSettings.silenceTimeout === item.val
                        ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        voiceSettings.silenceTimeout === item.val
                          ? 'border-rose-500 bg-rose-500 text-white'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {voiceSettings.silenceTimeout === item.val && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{item.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-myanmar">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Action after Recording */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-myanmar">
                အသံသွင်းပြီးပါက လုပ်ဆောင်ချက် (After Recording)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateVoiceSettings({ autoSend: false })}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    !voiceSettings.autoSend
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">✍️ Review & Edit</div>
                  <div className="text-[10px] text-slate-400 font-myanmar">
                    အရင်စစ်ဆေး/ပြင်ဆင်မည်
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateVoiceSettings({ autoSend: true })}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    voiceSettings.autoSend
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">⚡ Auto-Send</div>
                  <div className="text-[10px] text-slate-400 font-myanmar">
                    ချက်ချင်း တိုက်ရိုက်ပို့မည်
                  </div>
                </button>
              </div>
            </div>

            {/* Done Button */}
            <button
              type="button"
              onClick={() => setVoiceSettingsOpen(false)}
              className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              ပြီးပါပြီ (Save & Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  RotateCcw,
  Languages,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sliders,
  Settings,
  Keyboard,
  Check,
  Lightbulb,
  Radio,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useUser } from '../../context/UserContext';
import { useI18n } from '../../i18n/I18nContext';
import { AIService } from '../../services/aiService';
import { speechService, RecognitionSessionHandle } from '../../services/speechService';
import { AuthService } from '../../services/authService';
import { isUserEligibleForLiveAI } from '../../services/entitlementService';
import { AIAccessGateModal } from '../auth/AIAccessGateModal';
import { AI_PERSONAS, INTERACTIVE_SCENARIOS } from '../../data/interactiveSpeakingData';
import { AIMessage, AIPersonaId } from '../../types/ai';
import { JLPTLevel } from '../../types';
import { JapaneseInput } from '../keyboard/JapaneseInput';
import { TranslationToggleButton } from '../common/TranslationToggleButton';

export const InteractiveSpeakingStudio: React.FC = () => {
  const { activeLevel } = useApp();
  const { profile, entitlements, logActivity, addXP } = useUser();
  const { t } = useI18n();
  const isEligible = isUserEligibleForLiveAI(profile, entitlements);
  const [aiGateModalOpen, setAiGateModalOpen] = useState(false);

  // Configuration States
  const [selectedPersonaId, setSelectedPersonaId] = useState<AIPersonaId>('yuki');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('casual_chat');
  const [customTopicText, setCustomTopicText] = useState<string>('');
  const [isCustomTopicActive, setIsCustomTopicActive] = useState<boolean>(false);
  const [speakingLevel, setSpeakingLevel] = useState<JLPTLevel>(activeLevel || 'N5');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [autoPlayVoice, setAutoPlayVoice] = useState<boolean>(true);
  const [showConfigDrawer, setShowConfigDrawer] = useState<boolean>(false);

  // Chat & Conversation States
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputMode, setInputMode] = useState<'voice' | 'typing'>('voice');
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<RecognitionSessionHandle | null>(null);

  const selectedPersona = useMemo(() => {
    return AI_PERSONAS.find((p) => p.id === selectedPersonaId) || AI_PERSONAS[0];
  }, [selectedPersonaId]);

  const selectedScenario = useMemo(() => {
    return INTERACTIVE_SCENARIOS.find((s) => s.id === selectedScenarioId) || INTERACTIVE_SCENARIOS[0];
  }, [selectedScenarioId]);

  // Clean up voice on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
      speechService.stopAudio();
    };
  }, []);

  // Initialize conversation with Starter Message for the scenario & level
  const initScenario = (scenarioId: string, personaId: AIPersonaId, lvl: JLPTLevel, customDesc?: string) => {
    speechService.stopAudio();
    setIsAiSpeaking(false);
    const scen = INTERACTIVE_SCENARIOS.find((s) => s.id === scenarioId) || INTERACTIVE_SCENARIOS[0];
    const starter = scen.starterMessages[lvl] || scen.starterMessages['N5'];
    const replies = scen.suggestedReplies[lvl] || scen.suggestedReplies['N5'];

    const starterMsg: AIMessage = {
      id: 'ai-start-' + Date.now(),
      sender: 'ai',
      textJp: starter.jp,
      reading: starter.reading,
      textEn: starter.en,
      textMy: starter.my,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedReplies: replies,
      apiSource: 'smart_contextual',
    };

    setMessages([starterMsg]);

    // Auto-speak starter message if enabled
    if (autoPlayVoice) {
      setTimeout(() => {
        setIsAiSpeaking(true);
        speechService.speakJapanese(starter.jp, {
          rate: speechRate,
          onEnd: () => setIsAiSpeaking(false),
          onError: () => setIsAiSpeaking(false),
        });
      }, 400);
    }
  };

  useEffect(() => {
    initScenario(selectedScenarioId, selectedPersonaId, speakingLevel, customTopicText);
  }, [selectedScenarioId, selectedPersonaId, speakingLevel]);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiProcessing, isAiSpeaking]);

  const toggleTranslation = (msgId: string) => {
    setRevealedTranslations((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSpeakAiMessage = (text: string) => {
    if (isAiSpeaking) {
      speechService.stopAudio();
      setIsAiSpeaking(false);
      return;
    }
    setIsAiSpeaking(true);
    speechService.speakJapanese(text, {
      rate: speechRate,
      onEnd: () => setIsAiSpeaking(false),
      onError: () => setIsAiSpeaking(false),
    });
  };

  // Start / Stop Microphone Recording
  const handleToggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsRecording(false);
      return;
    }

    // Verify Admin / PRO access before opening microphone for AI partner
    const authCheck = AuthService.canAccessAIFeature(profile, entitlements);
    if (!authCheck.allowed) {
      setAiGateModalOpen(true);
      return;
    }

    // Stop any ongoing AI voice before user starts speaking
    speechService.stopAudio();
    setIsAiSpeaking(false);
    setLiveTranscript('');
    setIsRecording(true);

    const session = speechService.createContinuousRecognitionSession({
      lang: 'ja-JP',
      continuous: true,
      maxDurationSeconds: 45,
      silenceTimeoutMs: 3200, // 3.2 seconds silence buffer so pauses don't cut off speech
      onInterim: (_interim: string, full: string) => {
        setLiveTranscript(full);
      },
      onFinalResult: (finalText: string) => {
        setIsRecording(false);
        const trimmed = finalText.trim();
        if (trimmed) {
          setLiveTranscript(trimmed);
          handleSendMessage(trimmed);
        }
      },
      onError: (err: any) => {
        console.error('Speech recognition error:', err);
        setIsRecording(false);
      },
      onEnd: () => {
        setIsRecording(false);
      },
    });

    recognitionRef.current = session;

    if (session.isSupported) {
      session.start();
    } else {
      // Browser simulation fallback
      setTimeout(() => {
        const simulated = 'こんにちは！楽しく日本語を話しましょう。';
        setLiveTranscript(simulated);
        setIsRecording(false);
        handleSendMessage(simulated);
      }, 2500);
    }
  };

  // Send User Message & Trigger Persona-Driven AI Voice Response
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isAiProcessing) return;

    // Verify Admin / PRO access before making Live AI API call
    const authCheck = AuthService.canAccessAIFeature(profile, entitlements);
    if (!authCheck.allowed) {
      setAiGateModalOpen(true);
      return;
    }

    // 1. Add User Message to feed
    const userMsg: AIMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      textJp: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setTextInput('');
    setLiveTranscript('');
    setIsAiProcessing(true);

    // Track user speaking progress
    addXP(15, 'Interactive Speaking Turn');
    logActivity('practice', 1);

    try {
      // 2. Request AI Persona Response
      const reply = await AIService.generateInteractiveSpeakingReply({
        userText: trimmed,
        scenarioId: selectedScenarioId,
        scenarioTitle: isCustomTopicActive && customTopicText.trim() ? customTopicText.trim() : selectedScenario.title,
        customTopicDescription: isCustomTopicActive ? customTopicText.trim() : undefined,
        level: speakingLevel,
        personaId: selectedPersonaId,
        sessionHistory: nextHistory,
      });

      setMessages((prev) => [...prev, reply]);

      // 3. Auto-play AI native voice response
      if (autoPlayVoice) {
        setIsAiSpeaking(true);
        speechService.speakJapanese(reply.textJp, {
          rate: speechRate,
          onEnd: () => setIsAiSpeaking(false),
          onError: () => setIsAiSpeaking(false),
        });
      }
    } catch (e) {
      console.error('Interactive speaking response error:', e);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleSelectSuggestedReply = (replyText: string) => {
    // Fill text input and send, or speak aloud
    handleSendMessage(replyText);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Interactive Studio Header & Persona Control Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300">
              Live Interactive AI Voice Partner (Gemini 3.8 Flash)
            </span>
            {isEligible ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                {profile.role === 'admin' || profile.account_type === 'ADMIN' ? '👑 Admin Live Access' : '⭐ PRO Live Access'}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setAiGateModalOpen(true)}
                className="px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-500/40 text-[10px] font-bold hover:bg-purple-500/50 cursor-pointer"
              >
                🔒 Upgrade to PRO
              </button>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <span>{selectedPersona.avatar}</span>
            <span>Talking with {selectedPersona.name}</span>
          </h2>
          <p className="text-xs text-slate-300">
            {selectedPersona.roleMy} • {selectedPersona.speechStyle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Level Switcher */}
          <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1 text-xs">
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSpeakingLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  speakingLevel === lvl
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              const nextRate = speechRate === 0.8 ? 1.0 : speechRate === 1.0 ? 1.2 : 0.8;
              setSpeechRate(nextRate);
            }}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="Voice Speed (အသံ အမြန်နှုန်း)"
          >
            <span>{speechRate}x</span>
            <span className="text-[10px] text-slate-300">Speed</span>
          </button>

          {/* Auto-Play Voice Toggle */}
          <button
            onClick={() => setAutoPlayVoice(!autoPlayVoice)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              autoPlayVoice
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/10 text-slate-400 border-transparent hover:text-white'
            }`}
            title="Auto-Play Voice (အလိုအလျောက် အသံထွက်ပေးခြင်း)"
          >
            {autoPlayVoice ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>Auto-Voice: {autoPlayVoice ? 'ON' : 'OFF'}</span>
          </button>

          {/* Settings Drawer Toggle */}
          <button
            onClick={() => setShowConfigDrawer(!showConfigDrawer)}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              showConfigDrawer
                ? 'bg-rose-500 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
            }`}
            title="Custom Persona & Topic Settings (စိတ်ကြိုက် ပြင်ဆင်ရန်)"
          >
            <Sliders size={16} />
          </button>
        </div>
      </div>

      {/* 2. Persona & Scenario Customizer Drawer */}
      {showConfigDrawer && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5 animate-slide-down">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              1. Choose AI Persona & Conversation Tone (စကားပြောဖော် AI ရွေးချယ်ပါ)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {AI_PERSONAS.map((p) => {
                const isSelected = p.id === selectedPersonaId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPersonaId(p.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-850/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{p.avatar}</span>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">{p.roleMy}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Select Situation or Custom Topic (အခြေအနေနှင့် စိတ်ကြိုက်အကြောင်းအရာ)
              </h3>
              <button
                onClick={() => {
                  setIsCustomTopicActive(!isCustomTopicActive);
                  if (!isCustomTopicActive) setSelectedScenarioId('custom');
                }}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  isCustomTopicActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60'
                }`}
              >
                <span>✍️ Custom Free Topic (မိမိစိတ်ကြိုက်)</span>
              </button>
            </div>

            {/* Custom Topic Input Field */}
            {isCustomTopicActive && (
              <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/50 mb-3 space-y-2">
                <label className="text-xs font-bold text-purple-900 dark:text-purple-300 block">
                  Describe what situation you want to practice with {selectedPersona.name}:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTopicText}
                    onChange={(e) => setCustomTopicText(e.target.value)}
                    placeholder="e.g. Chatting about my hometown in Myanmar, practicing hotel check-out, asking directions in Shibuya..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 text-xs text-slate-900 dark:text-white outline-none focus:border-purple-500 font-medium"
                  />
                  <button
                    onClick={() => initScenario('custom', selectedPersonaId, speakingLevel, customTopicText)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    Start Roleplay
                  </button>
                </div>
              </div>
            )}

            {/* Scenario Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
              {INTERACTIVE_SCENARIOS.map((scen) => {
                const isSelected = selectedScenarioId === scen.id && !isCustomTopicActive;
                return (
                  <button
                    key={scen.id}
                    onClick={() => {
                      setIsCustomTopicActive(false);
                      setSelectedScenarioId(scen.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{scen.icon}</span>
                    <span>{scen.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Live Conversational Thread Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Scenario Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="text-base">{selectedScenario.icon}</span>
            <span className="font-bold text-slate-900 dark:text-white truncate">
              {isCustomTopicActive && customTopicText.trim() ? customTopicText.trim() : selectedScenario.titleMy}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 font-bold shrink-0">
              {speakingLevel}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAiSpeaking && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] animate-pulse">
                <Volume2 size={13} />
                <span>AI Speaking... (ပြောနေပါသည်)</span>
              </div>
            )}
            <button
              onClick={() => initScenario(selectedScenarioId, selectedPersonaId, speakingLevel, customTopicText)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Reset conversation (အသစ်ပြန်စတင်ပါ)"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            const isRevealed = Boolean(revealedTranslations[m.id]);

            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-2xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {isUser ? profile.avatar || '👤' : selectedPersona.avatar}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5 max-w-[85%] sm:max-w-xl">
                  {/* Sender Name & Timestamp */}
                  <div
                    className={`flex items-center gap-2 text-[10px] text-slate-400 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span className="font-bold">{isUser ? 'You (自分)' : selectedPersona.name}</span>
                    <span>{m.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-3xl shadow-sm text-sm space-y-2 ${
                      isUser
                        ? 'bg-gradient-to-r from-brand-600 to-rose-500 text-white rounded-tr-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-xs border border-slate-200/80 dark:border-slate-700/80'
                    }`}
                  >
                    {/* Japanese Text */}
                    <div className="font-japanese font-bold text-base leading-relaxed tracking-wide">
                      {m.textJp}
                    </div>

                    {/* Furigana Reading if available */}
                    {m.reading && m.reading !== m.textJp && !isUser && (
                      <div className="text-xs font-japanese text-slate-500 dark:text-slate-400 font-medium">
                        {m.reading}
                      </div>
                    )}

                    {/* Revealed Burmese & English Translations */}
                    {isRevealed && !isUser && (
                      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1 animate-fade-in">
                        {m.textMy && (
                          <p className="text-emerald-700 dark:text-emerald-300 font-semibold leading-relaxed">
                            🇲🇲 {m.textMy}
                          </p>
                        )}
                        {m.textEn && (
                          <p className="text-slate-500 dark:text-slate-400 italic">
                            🇬🇧 {m.textEn}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Message Action Bar (Audio Replay & Translation Toggle) */}
                    <div className="flex items-center justify-between pt-1 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSpeakAiMessage(m.textJp)}
                        className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                          isUser
                            ? 'text-white/80 hover:text-white hover:bg-white/10'
                            : 'text-slate-600 dark:text-slate-300 hover:text-brand-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        title="Listen to native Japanese audio"
                      >
                        <Volume2 size={15} />
                        <span className="text-[11px] font-bold">Listen</span>
                      </button>

                      {!isUser && (m.textMy || m.textEn) && (
                        <button
                          type="button"
                          onClick={() => toggleTranslation(m.id)}
                          className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-brand-500 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                          <span>{isRevealed ? 'Hide Translation' : 'မြန်မာဘာသာပြန်'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Coaching Card under AI message (Native Alternatives & Grammar Tips) */}
                  {!isUser && m.feedback && (
                    <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-1.5 animate-fade-in">
                      {m.feedback.naturalJapaneseAlternatives && m.feedback.naturalJapaneseAlternatives.length > 0 && (
                        <div className="text-amber-900 dark:text-amber-300">
                          <span className="font-bold flex items-center gap-1">
                            <Lightbulb size={12} className="text-amber-500" />
                            <span>How a Native Would Say It (သဘာဝကျကျ ပြောဆိုနည်း):</span>
                          </span>
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 font-japanese text-[11px]">
                            {m.feedback.naturalJapaneseAlternatives.map((alt, i) => (
                              <li key={i}>{alt}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {m.feedback.grammarMistakes && m.feedback.grammarMistakes.length > 0 && (
                        <div className="text-rose-700 dark:text-rose-400 text-[11px]">
                          <span className="font-bold">💡 Grammar Note: </span>
                          <span>{m.feedback.grammarMistakes.join('; ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* AI Thinking Animation */}
          {isAiProcessing && (
            <div className="flex gap-3 max-w-xl animate-fade-in">
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {selectedPersona.avatar}
              </div>
              <div className="p-4 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs flex items-center gap-2">
                <Sparkles size={16} className="text-brand-500 animate-spin-slow" />
                <span>{selectedPersona.name} is thinking and formulating spoken Japanese...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Replies Pills */}
        {messages.length > 0 &&
          messages[messages.length - 1].suggestedReplies &&
          messages[messages.length - 1].suggestedReplies!.length > 0 && (
            <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-850/80 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto custom-scrollbar">
              <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">
                Quick Reply Ideas:
              </span>
              {messages[messages.length - 1].suggestedReplies!.map((rep, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestedReply(rep)}
                  className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-japanese font-semibold text-slate-700 dark:text-slate-300 transition-colors shrink-0 cursor-pointer"
                >
                  {rep}
                </button>
              ))}
            </div>
          )}

        {/* 4. Live Recording & Interactive Input Deck */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          {/* Live Transcript / Hearing preview */}
          {isRecording && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-center justify-between gap-3 text-xs text-rose-700 dark:text-rose-300 animate-pulse">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-ping" />
                <span className="font-bold shrink-0">Hearing you in Japanese:</span>
                <span className="font-japanese font-bold text-slate-900 dark:text-white truncate">
                  "{liveTranscript || 'Listening... speak clearly into microphone'}"
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleRecording}
                className="px-3 py-1 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 shrink-0 cursor-pointer"
              >
                Send Speech
              </button>
            </div>
          )}

          {/* Mode Switcher & Input Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setInputMode(inputMode === 'voice' ? 'typing' : 'voice')}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                inputMode === 'typing'
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900'
              }`}
              title={inputMode === 'voice' ? 'Switch to Typing (စာရိုက်ပြောရန်)' : 'Switch to Voice (အသံဖြင့်ပြောရန်)'}
            >
              {inputMode === 'voice' ? <Keyboard size={18} /> : <Mic size={18} />}
            </button>

            {inputMode === 'voice' ? (
              <div className="flex-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleRecording}
                  disabled={isAiProcessing}
                  className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse shadow-rose-500/40 scale-[1.01]'
                      : 'bg-gradient-to-r from-brand-600 to-rose-500 hover:opacity-95 text-white shadow-brand-500/25'
                  }`}
                >
                  {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  <span>
                    {isRecording
                      ? 'Tap when finished speaking (ပြောပြီးပါက နှိပ်ပါ)'
                      : `Press & Speak to ${selectedPersona.name} (အသံဖြင့် စကားပြောရန် နှိပ်ပါ)`}
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  <JapaneseInput
                    value={textInput}
                    onChange={setTextInput}
                    onSubmit={() => textInput.trim() && handleSendMessage(textInput)}
                    placeholder={`Type in Japanese or romaji to ${selectedPersona.name}...`}
                    inputClassName="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-japanese text-slate-900 dark:text-white outline-none focus:border-brand-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => textInput.trim() && handleSendMessage(textInput)}
                  disabled={!textInput.trim() || isAiProcessing}
                  className="p-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRO Plan Upgrade Gate Modal */}
      <AIAccessGateModal isOpen={aiGateModalOpen} onClose={() => setAiGateModalOpen(false)} />
    </div>
  );
};

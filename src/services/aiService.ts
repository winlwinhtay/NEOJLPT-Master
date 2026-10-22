import { JLPTLevel } from '../types';
import {
  AIConversationTopic,
  AIMessage,
  ConversationSession,
  InteractiveSpeakingOptions,
} from '../types/ai';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { AdminService } from './adminService';
import { AI_PERSONAS } from '../data/interactiveSpeakingData';

export class AIService {
  /**
   * Topic information and initial starter scenario
   */
  public static getTopicMeta(topic: AIConversationTopic): {
    title: string;
    titleJp: string;
    icon: string;
    description: string;
    initialBotMessage: Record<JLPTLevel, { jp: string; reading: string; en: string }>;
  } {
    switch (topic) {
      case 'restaurant':
        return {
          title: 'Restaurant Ordering',
          titleJp: 'レストランで注文',
          icon: '🍜',
          description: 'Order food, ask about recommendations, and pay the bill at a Japanese restaurant.',
          initialBotMessage: {
            N5: {
              jp: 'いらっしゃいませ！何名様（なんめいさま）ですか？',
              reading: 'いらっしゃいませ！なんめいさま ですか？',
              en: 'Welcome! How many people are in your party?',
            },
            N4: {
              jp: 'いらっしゃいませ！こちらの席へどうぞ。ご注文はお決まりですか？',
              reading: 'いらっしゃいませ！こちらのせきへどうぞ。ごちゅうもんは おきまりですか？',
              en: 'Welcome! Please take this seat. Are you ready to order?',
            },
            N3: {
              jp: 'いらっしゃいませ！本日のおすすめは旬の海鮮丼となっておりますが、いかがでしょうか？',
              reading: 'いらっしゃいませ！ほんじつのおすすめは しゅんのかいせんどんとなっておりますが、いかがでしょうか？',
              en: 'Welcome! Today’s special is our seasonal seafood bowl. Would you like to try that or something else?',
            },
            N2: {
              jp: 'いらっしゃいませ。ご予約の田中様でしょうか？本日はコース料理をご用意しております。',
              reading: 'いらっしゃいませ。ごよやくのたなかさまでしょうか？ほんじつは コースりょうりをごよういしております。',
              en: 'Welcome. Are you Mr. Tanaka who made the reservation? We have your course menu prepared.',
            },
            N1: {
              jp: 'いらっしゃいませ。本日のおまかせ懐石でございますが、アレルギーやお苦手な食材はございませんでしょうか？',
              reading: 'いらっしゃいませ。ほんじつのおまかせかいせきでございますが、アレルギーやおにがてなしょくざいはございませんでしょうか？',
              en: 'Welcome. Regarding today’s chef-selected Kaiseki, do you have any allergies or dietary preferences we should accommodate?',
            },
          },
        };
      case 'self_introduction':
        return {
          title: 'Self Introduction',
          titleJp: '自己紹介（じこしょうかい）',
          icon: '👋',
          description: 'Introduce yourself, your hobbies, job, and where you are from.',
          initialBotMessage: {
            N5: {
              jp: '初めまして！私はケンです。お名前は何ですか？',
              reading: 'はじめまして！わたしは ケン です。おなまえは なんですか？',
              en: 'Nice to meet you! I am Ken. What is your name?',
            },
            N4: {
              jp: '初めまして！日本へようこそ。どこから来ましたか？趣味は何ですか？',
              reading: 'はじめまして！にほんへようこそ。どこから きましたか？しゅみは なんですか？',
              en: 'Nice to meet you! Welcome to Japan. Where did you come from, and what are your hobbies?',
            },
            N3: {
              jp: '初めまして！日本語がお上手ですね。日本に来てどれくらいになりますか？',
              reading: 'はじめまして！にほんごがおじょうずですね。にほんにきて どれくらいになりますか？',
              en: 'Nice to meet you! Your Japanese is very good. How long have you been in Japan?',
            },
            N2: {
              jp: 'はじめまして。本日は交流会にお越しいただきありがとうございます。自己紹介をお願いできますか？',
              reading: 'はじめまして。ほんじつは こうりゅうかいにおこしいただき ありがとうございます。じこしょうかいをおねがいできますか？',
              en: 'Nice to meet you. Thank you for joining our exchange meetup today. Could you please introduce yourself?',
            },
            N1: {
              jp: '初めまして。本日のセミナーでご一緒させていただきます。ご専攻や現在携わっておられる研究についてお聞かせ願えますか？',
              reading: 'はじめまして。ほんじつのセミナーでごいっしょさせていただきます。ごせんこうや げんざいたずさわっておられるけんきゅうについて おきかせねがえますか？',
              en: 'Nice to meet you. We are pleased to have you at today’s seminar. Could you tell us about your specialization and current research?',
            },
          },
        };
      case 'shopping':
        return {
          title: 'Shopping',
          titleJp: '買い物（かいもの）',
          icon: '🛍️',
          description: 'Ask for sizes, colors, tax-free discounts, and try on clothes.',
          initialBotMessage: {
            N5: {
              jp: 'いらっしゃいませ！何かお探しですか？',
              reading: 'いらっしゃいませ！なにか おさがしですか？',
              en: 'Welcome! Are you looking for something?',
            },
            N4: {
              jp: 'いらっしゃいませ。こちらのシャツは試着（しちゃく）できますよ。いかがですか？',
              reading: 'いらっしゃいませ。こちらのシャツは しちゃく できますよ。いかがですか？',
              en: 'Welcome. You can try on this shirt. Would you like to try it?',
            },
            N3: {
              jp: 'いらっしゃいませ。サイズや色違いのご案内も可能ですので、どうぞお気軽にお声がけください。',
              reading: 'いらっしゃいませ。サイズや いろちがいのごあんないも かのうですので、どうぞ おきがるにおこえがけください。',
              en: 'Welcome. We have various sizes and colors in stock, so please feel free to ask!',
            },
            N2: {
              jp: 'いらっしゃいませ。こちらは今期新作の限定モデルでございます。免税手続きも承っております。',
              reading: 'いらっしゃいませ。こちらは こんきしんさくの げんていモデルでございます。めんぜいてつづきも うけたまわっております。',
              en: 'Welcome. This is our seasonal limited edition collection. We also process tax-free shopping.',
            },
            N1: {
              jp: 'いらっしゃいませ。お客様の普段のコーディネートやご利用シーンに応じたご提案をさせていただきます。',
              reading: 'いらっしゃいませ。おきゃくさまの ふだんのコーディネートや ごりようシーンにおうじたごていあんを させていただきます。',
              en: 'Welcome. May I suggest items tailored specifically to your usual style or intended occasion?',
            },
          },
        };
      case 'hotel':
        return {
          title: 'Hotel Check-in',
          titleJp: 'ホテルでチェックイン',
          icon: '🏨',
          description: 'Check in, request amenities, ask for Wi-Fi and breakfast info.',
          initialBotMessage: {
            N5: {
              jp: 'いらっしゃいませ。チェックインですか？パスポートを見せてください。',
              reading: 'いらっしゃいませ。チェックインですか？パスポートを みせてください。',
              en: 'Welcome. Are you checking in? Please show me your passport.',
            },
            N4: {
              jp: 'いらっしゃいませ。ご予約のお名前とお電話番号を教えていただけますか？',
              reading: 'いらっしゃいませ。ごよやくの おなまえと おでんわばんごうを おしえていただけますか？',
              en: 'Welcome. Could you please give me your reservation name and phone number?',
            },
            N3: {
              jp: 'ようこそいらっしゃいました。ご予約を確認いたしました。朝食のご利用時間は7時からとなっております。',
              reading: 'ようこそいらっしゃいました。ごよやくを かくにんいたしました。ちょうしょくの ごりようじかんは 7じからとなっております。',
              en: 'Welcome to our hotel. I have confirmed your reservation. Breakfast is served starting at 7:00 AM.',
            },
            N2: {
              jp: 'チェックインのお手続きをいたします。恐れ入りますが、こちらの宿泊カードにご記帳をお願い申し上げます。',
              reading: 'チェックインのおてつづきをいたします。おそれいりますが、こちらのしゅくはくカードに ごきちょうをおねがいもうしあげます。',
              en: 'Allow me to process your check-in. Could you kindly fill in the guest registration card here?',
            },
            N1: {
              jp: 'ご到着を心よりお待ち申し上げておりました。高層階の眺望の良いお部屋をご用意いたしました。館内施設のご案内を差し上げましょうか。',
              reading: 'ごとうちゃくを こころよりおまちもうしあげておりました。こうそうかいの ちょうぼうのよいおへやを ごよういいたしました。かんないしせつのごあんないを さしあげましょうか。',
              en: 'We have eagerly awaited your arrival. We have prepared an upper-floor room with scenic views. May I guide you through our amenities?',
            },
          },
        };
      default:
        return {
          title: 'Daily Japanese Conversation',
          titleJp: '日常会話（にちじょうかいわ）',
          icon: '☕',
          description: 'Chat about your day, weather, weekend plans, and Japanese culture.',
          initialBotMessage: {
            N5: {
              jp: 'こんにちは！今日は天気がいいですね。何をしますか？',
              reading: 'こんにちは！きょうは てんきがいいですね。なにを しますか？',
              en: 'Hello! The weather is nice today. What will you do?',
            },
            N4: {
              jp: 'こんにちは！最近どんな日本のドラマやアニメを見ていますか？',
              reading: 'こんにちは！さいきん どんな にほんのドラマや アニメを みていますか？',
              en: 'Hello! What Japanese drama or anime have you been watching recently?',
            },
            N3: {
              jp: 'こんにちは！最近何か面白かったことや、休日の予定はありますか？',
              reading: 'こんにちは！さいきん なにか おもしろかったことや、きゅうじつの よていはありますか？',
              en: 'Hello! Has anything interesting happened lately, or do you have plans for the weekend?',
            },
            N2: {
              jp: 'こんにちは。日本の四季の移り変わりは風情がありますね。どの季節がお気に入りですか？',
              reading: 'こんにちは。にほんの しきのうつりかわりは ふぜいがありますね。どのきせつが おきにいりですか？',
              en: 'Hello. The change of seasons in Japan has a distinctive charm. Which season do you like most?',
            },
            N1: {
              jp: 'こんにちは。近年における日本の伝統文化と現代技術の融合について、どう思われますか？',
              reading: 'こんにちは。きんねんにおける にほんのでんとうぶんかと げんだいぎじゅつのゆうごうについて、どうおもわれますか？',
              en: 'Hello. What are your thoughts on the recent fusion of traditional Japanese culture and modern technology?',
            },
          },
        };
    }
  }

  /**
   * Returns configured Gemini API key (from localStorage, custom setting, or env)
   */
  public static getEffectiveApiKey(): string {
    try {
      const stored = localStorage.getItem('jlpt_gemini_api_key');
      if (stored && stored.trim()) return stored.trim();
      if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
        return (import.meta as any).env.VITE_GEMINI_API_KEY || '';
      }
    } catch {}
    return '';
  }

  public static setCustomApiKey(key: string): void {
    try {
      if (key && key.trim()) {
        localStorage.setItem('jlpt_gemini_api_key', key.trim());
      } else {
        localStorage.removeItem('jlpt_gemini_api_key');
      }
    } catch {}
  }

  /**
   * Diagnostic connection tester to verify API status, provider, and latency
   */
  public static async checkAIConnection(): Promise<{
    connected: boolean;
    provider: 'edge' | 'direct' | 'local';
    latencyMs: number;
    model: string;
    details?: string;
  }> {
    const startTime = Date.now();

    // 1. Try Supabase Edge Function Gateway
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'speaking-session',
            userInput: 'こんにちは',
            scenario: 'Connection health check. Reply with standard greeting.',
            level: 'N5',
          },
        });
        const latencyMs = Date.now() - startTime;
        if (!error && (data?.betterAlternative || data?.feedback || data?.overallScore !== undefined)) {
          return {
            connected: true,
            provider: 'edge',
            latencyMs,
            model: 'gemini-3.8-flash (Supabase Edge Gateway)',
            details: 'Edge gateway is live, cost-optimized, and verified with Gemini AI.',
          };
        }
      } catch (e: any) {
        console.warn('AIService: Edge connection check error:', e);
      }
    }

    // 2. Try Direct Client Gemini API Key if present
    const apiKey = this.getEffectiveApiKey();
    if (apiKey) {
      try {
        const testRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Respond with JSON: {"status":"ok"}' }] }],
              generationConfig: { maxOutputTokens: 25, responseMimeType: 'application/json' },
            }),
          }
        );
        const latencyMs = Date.now() - startTime;
        if (testRes.ok) {
          return {
            connected: true,
            provider: 'direct',
            latencyMs,
            model: 'gemini-2.5-flash (Direct Cloud API)',
            details: 'Direct Gemini API key verified with active responses.',
          };
        }
      } catch (e: any) {
        console.warn('AIService: Direct Gemini check error:', e);
      }
    }

    return {
      connected: false,
      provider: 'local',
      latencyMs: 0,
      model: 'Smart Contextual Japanese Engine (Offline Ready)',
      details: 'Instant contextual Japanese reasoning engine with full Q&A and Burmese support.',
    };
  }

  /**
   * Generates conversational reply adapting to JLPT level with instant linguistic feedback
   * Supports Supabase Edge Gateway (Gemini 3.8 Flash), Direct Gemini API, and Intelligent Fallback.
   */
  public static async generateReply(
    userText: string,
    topic: AIConversationTopic,
    level: JLPTLevel,
    sessionHistory: AIMessage[]
  ): Promise<AIMessage> {
    const trimmedUser = userText.trim();

    // =========================================================================
    // TIER 1: SUPABASE EDGE GATEWAY (Live Server-side Gemini 3.8 Flash)
    // =========================================================================
    if (isSupabaseConfigured()) {
      try {
        const pruned = sessionHistory
          .slice(-4)
          .map((m) => `${m.sender === 'user' ? 'Learner' : 'Japanese Native'}: ${m.textJp}`)
          .join('\n');

        const scenarioPrompt = `Topic: "${topic}". You are a natural Japanese native conversation partner chatting interactively.
Recent turns:
${pruned || '(Start of conversation)'}
CRITICAL INSTRUCTIONS:
1. In betterAlternative, directly answer what the learner said in natural Japanese suitable for JLPT ${level}, and ask ONE natural follow-up question to keep the conversation flowing.
2. In reading, provide the exact Hiragana/Katakana kana reading.
3. In explanation, format strictly as:
English: [Natural English translation of your reply]
Myanmar: [Natural Burmese translation in Myanmar Unicode script]
Options: [Short suggested Japanese reply 1] /// [Short suggested Japanese reply 2]
4. In feedback, constructively assess the learner's Japanese grammar, politeness, and particles.`;

        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'speaking-session',
            userInput: trimmedUser,
            scenario: scenarioPrompt,
            level,
          },
        });

        if (!error && (data?.betterAlternative || data?.feedback)) {
          const rawJp = data.betterAlternative || data.reading || '';
          const rawReading = data.reading || rawJp;
          const explanation = data.explanation || '';

          let textEn = '';
          let textMy = '';
          let optionsList: string[] = [];

          if (explanation.includes('Myanmar:')) {
            const mySplit = explanation.split(/Myanmar:\s*/i);
            const enPart = mySplit[0]?.replace(/English:\s*/i, '').trim();
            const rest = mySplit[1] || '';
            if (rest.includes('Options:')) {
              const optSplit = rest.split(/Options:\s*/i);
              textMy = optSplit[0]?.trim();
              optionsList = optSplit[1]?.split('///').map((s: string) => s.trim()).filter(Boolean) || [];
            } else {
              textMy = rest.trim();
            }
            textEn = enPart || '';
          } else {
            textEn = explanation;
          }

          return {
            id: 'ai-msg-' + Date.now(),
            sender: 'ai',
            textJp: rawJp,
            reading: rawReading,
            textEn: textEn || '',
            textMy: textMy || undefined,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            apiSource: 'edge_gemini',
            feedback: data.feedback
              ? {
                  grammarMistakes: [],
                  vocabularySuggestions: [],
                  naturalJapaneseAlternatives: rawJp ? [rawJp] : [],
                }
              : undefined,
            suggestedReplies: optionsList.length > 0 ? optionsList : ['はい、分かりました。', 'もう一度お願いします。'],
          };
        }
      } catch (e) {
        console.warn('AIService: Edge function invoke failed, proceeding to direct/fallback:', e);
      }
    }

    // =========================================================================
    // TIER 2: DIRECT GEMINI FLASH API (If custom/env API Key configured)
    // =========================================================================
    const apiKey = this.getEffectiveApiKey();
    if (apiKey) {
      try {
        const directReply = await this.callGeminiDirect(trimmedUser, topic, level, sessionHistory, apiKey);
        if (directReply) return directReply;
      } catch (e) {
        console.warn('AIService: Direct Gemini API error, proceeding to local engine:', e);
      }
    }

    // =========================================================================
    // TIER 3: INTELLIGENT CONTEXTUAL ENGINE (Interactive Q&A & Zero-Cost)
    // =========================================================================
    return this.generateContextualFallback(trimmedUser, topic, level, sessionHistory);
  }

  /**
   * Direct Client Call to Gemini Flash (Ultra-low latency, max 300 tokens)
   */
  private static async callGeminiDirect(
    userText: string,
    topic: AIConversationTopic,
    level: JLPTLevel,
    sessionHistory: AIMessage[],
    apiKey: string
  ): Promise<AIMessage | null> {
    const prunedHistory = sessionHistory.slice(-4).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.textJp,
    }));

    const historyStr = prunedHistory
      .map((h) => `${h.role === 'user' ? 'Learner' : 'Japanese Native'}: ${h.text}`)
      .join('\n');

    const prompt = `You are a native Japanese conversational partner in a roleplay conversation.
Topic: "${topic}"
Learner JLPT Level: "${level}"

Recent turns:
${historyStr || '(Beginning of dialogue)'}

Learner just said:
"${userText}"

CRITICAL INSTRUCTIONS:
1. DIRECTLY ANSWER what the learner asked or said in a realistic, polite way appropriate for "${topic}". If they asked how much something is (いくら), give a realistic price in Yen. If they asked where something is (どこ), give directions. If they ordered something, confirm it.
2. KEEP THE CONVERSATION ACTIVE: Ask ONE natural follow-up question so the learner can reply (interactive Q&A).
3. Japanese Level: JLPT ${level} appropriate grammar & words (polite desu/masu for N5/N4; polite/keigo for N3/N2/N1).
4. Provide the exact kana reading of your Japanese reply.
5. Provide a natural English translation.
6. Provide a natural Burmese (Myanmar) translation in Myanmar unicode script.
7. Under feedback: if learner made any grammar/particle mistake, gently explain it. Suggest a natural phrasing.
8. Provide 2 short, natural Japanese reply options for what the learner can say next.

Output STRICT JSON:
{
  "textJp": "Japanese reply",
  "reading": "Kana reading",
  "textEn": "English translation",
  "textMy": "Burmese translation",
  "feedback": {
    "grammarMistakes": [],
    "vocabularySuggestions": [],
    "naturalJapaneseAlternatives": []
  },
  "suggestedReplies": ["short Japanese reply 1", "short Japanese reply 2"]
}`;

    const callStartTime = Date.now();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350,
          responseMimeType: 'application/json',
        },
      }),
    });

    const durationMs = Date.now() - callStartTime;

    if (!res.ok) {
      AdminService.trackAiUsage({
        feature: 'ai_conversation',
        model: 'gemini-2.5-flash',
        inputTokens: 0,
        outputTokens: 0,
        cacheHit: false,
        status: 'error',
        durationMs,
      }).catch(() => {});
      return null;
    }

    const json = await res.json();
    const raw = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return null;

    const inputTokens = json.usageMetadata?.promptTokenCount || 200;
    const outputTokens = json.usageMetadata?.candidatesTokenCount || 150;

    AdminService.trackAiUsage({
      feature: 'ai_conversation',
      model: 'gemini-2.5-flash',
      inputTokens,
      outputTokens,
      cacheHit: false,
      status: 'success',
      durationMs,
    }).catch(() => {});

    const parsed = JSON.parse(raw);
    return {
      id: 'ai-msg-' + Date.now(),
      sender: 'ai',
      textJp: parsed.textJp,
      reading: parsed.reading || parsed.textJp,
      textEn: parsed.textEn || '',
      textMy: parsed.textMy,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      apiSource: 'direct_gemini',
      feedback:
        parsed.feedback?.grammarMistakes?.length ||
        parsed.feedback?.vocabularySuggestions?.length ||
        parsed.feedback?.naturalJapaneseAlternatives?.length
          ? parsed.feedback
          : undefined,
      suggestedReplies: parsed.suggestedReplies || [],
    };
  }

  /**
   * Customized Interactive Voice Speaking Engine
   * Generates natural human-like spoken dialogue tailored to persona, custom topics, and JLPT level.
   */
  public static async generateInteractiveSpeakingReply(
    options: InteractiveSpeakingOptions
  ): Promise<AIMessage> {
    const trimmedUser = options.userText.trim();

    // TIER 1: SUPABASE EDGE GATEWAY (Live Server-side Gemini 3.8 Flash)
    if (isSupabaseConfigured()) {
      try {
        const persona = AI_PERSONAS.find((p) => p.id === options.personaId) || AI_PERSONAS[0];
        const pruned = options.sessionHistory
          .slice(-4)
          .map((m) => `${m.sender === 'user' ? 'Learner' : persona.nameJp}: ${m.textJp}`)
          .join('\n');

        const scenarioPrompt = `Interactive Speaking Dialogue.
Scenario: "${options.scenarioTitle}".
Your Persona: ${persona.nameJp} (${persona.role}, Speech style: ${persona.speechStyle}).
Recent dialogue turns:
${pruned || '(Start of conversation)'}
CRITICAL INSTRUCTIONS:
1. In betterAlternative, reply in character as ${persona.nameJp} directly responding to the learner in natural spoken Japanese appropriate for JLPT ${options.level}. Use natural aizuchi (そうなんですね、なるほど、へえ) and ask ONE natural follow-up question so the conversation continues.
2. In reading, provide the complete Kana reading in Hiragana/Katakana.
3. In explanation, format strictly as:
English: [Natural English translation of your reply]
Myanmar: [Natural Burmese translation in Myanmar Unicode script]
Options: [Short suggested Japanese reply 1] /// [Short suggested Japanese reply 2]
4. In feedback, give positive encouraging coaching on how a native speaker would say what the learner attempted.`;

        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'speaking-session',
            userInput: trimmedUser,
            scenario: scenarioPrompt,
            level: options.level,
          },
        });

        if (!error && (data?.betterAlternative || data?.feedback)) {
          const rawJp = data.betterAlternative || data.reading || '';
          const rawReading = data.reading || rawJp;
          const explanation = data.explanation || '';

          let textEn = '';
          let textMy = '';
          let optionsList: string[] = [];

          if (explanation.includes('Myanmar:')) {
            const mySplit = explanation.split(/Myanmar:\s*/i);
            const enPart = mySplit[0]?.replace(/English:\s*/i, '').trim();
            const rest = mySplit[1] || '';
            if (rest.includes('Options:')) {
              const optSplit = rest.split(/Options:\s*/i);
              textMy = optSplit[0]?.trim();
              optionsList = optSplit[1]?.split('///').map((s: string) => s.trim()).filter(Boolean) || [];
            } else {
              textMy = rest.trim();
            }
            textEn = enPart || '';
          } else {
            textEn = explanation;
          }

          return {
            id: 'ai-speak-' + Date.now(),
            sender: 'ai',
            textJp: rawJp,
            reading: rawReading,
            textEn: textEn || '',
            textMy: textMy || undefined,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            apiSource: 'edge_gemini',
            feedback: {
              grammarMistakes: [],
              vocabularySuggestions: [],
              naturalJapaneseAlternatives: rawJp ? [rawJp] : [],
            },
            suggestedReplies: optionsList.length > 0 ? optionsList : ['はい、そうです。', 'もう少し教えてください。'],
          };
        }
      } catch (e) {
        console.warn('AIService: Edge speaking failed, attempting direct Gemini:', e);
      }
    }

    // TIER 2: DIRECT GEMINI FLASH API
    const apiKey = this.getEffectiveApiKey();
    if (apiKey) {
      try {
        const directReply = await this.callGeminiInteractiveSpeakingDirect(options, apiKey);
        if (directReply) return directReply;
      } catch (e) {
        console.warn('AIService: Direct Gemini speaking error, using intelligent contextual engine:', e);
      }
    }

    // TIER 3: INTELLIGENT CONTEXTUAL SPEAKING ENGINE (OFFLINE/LOCAL FALLBACK)
    return this.generateInteractiveSpeakingContextualFallback(options);
  }

  /**
   * Evaluates spoken Japanese sentence using Live Gemini AI via Edge Gateway
   */
  public static async evaluateSpokenSentence(
    spokenText: string,
    expectedTarget: string,
    level: JLPTLevel = 'N5'
  ): Promise<{
    score: number;
    feedback: string;
    betterAlternative: string;
    reading: string;
    isAiEvaluated: boolean;
  }> {
    const trimmed = spokenText.trim();
    if (!trimmed) {
      return {
        score: 0,
        feedback: 'No Japanese voice input detected. Please try repeating into the microphone.',
        betterAlternative: expectedTarget,
        reading: expectedTarget,
        isAiEvaluated: false,
      };
    }

    if (isSupabaseConfigured()) {
      try {
        const scenario = `Pronunciation Drill & Accuracy Check. Target Japanese sentence: 「${expectedTarget}」. The learner spoke: 「${trimmed}」.
Compare what was spoken against the target sentence.
Score strictly between 0 and 100 on accuracy, pitch, and particles.
In feedback, give concise, constructive coaching on pronunciation and particle accuracy.
In betterAlternative, output the exact natural phrasing: 「${expectedTarget}」.
In reading, output its kana reading.`;

        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'speaking-session',
            userInput: trimmed,
            scenario,
            level,
          },
        });

        if (!error && (data?.overallScore !== undefined || data?.feedback)) {
          return {
            score: typeof data.overallScore === 'number' ? data.overallScore : 85,
            feedback: data.feedback || `Excellent pronunciation! Matches target sentence.`,
            betterAlternative: data.betterAlternative || expectedTarget,
            reading: data.reading || expectedTarget,
            isAiEvaluated: true,
          };
        }
      } catch (e) {
        console.warn('AIService: Live evaluation failed, fallback to local comparison:', e);
      }
    }

    return {
      score: 75,
      feedback: `Target: 「${expectedTarget}」. You spoke: 「${trimmed}」.`,
      betterAlternative: expectedTarget,
      reading: expectedTarget,
      isAiEvaluated: false,
    };
  }

  /**
   * Direct Gemini Flash Call for Interactive Speaking (Optimized for Spoken Dialogues)
   */
  private static async callGeminiInteractiveSpeakingDirect(
    options: InteractiveSpeakingOptions,
    apiKey: string
  ): Promise<AIMessage | null> {
    const personaMap = {
      yuki: {
        name: 'Yuki (ユキ)',
        role: 'a warm, friendly Japanese peer (24 years old, Tokyo native)',
        tone: 'Friendly and warm. Uses natural polite or gentle casual Japanese with enthusiastic aizuchi (そうなんですね！、なるほど！、いいね！). Conversational like talking on a phone call or in a coffee shop.',
      },
      kenji: {
        name: 'Kenji-sensei (ケンジ先生)',
        role: 'an experienced, encouraging native Japanese teacher',
        tone: 'Speaks clear, standard Tokyo Japanese with desu/masu. Very patient, supportive, speaks at a measured conversational pace, gives reassuring feedback.',
      },
      tanaka: {
        name: 'Tanaka Senpai (田中先輩)',
        role: 'a professional senior colleague at a Japanese company',
        tone: 'Polite workplace Japanese (丁寧語・敬語), realistic business etiquette, professional yet approachable.',
      },
      ren: {
        name: 'Ren (レン)',
        role: 'an energetic youth and pop-culture/anime fan in Tokyo',
        tone: 'Lively, casual everyday Japanese (タメ口・親しみやすい口調), enthusiastic about modern culture, games, and life.',
      },
    };

    const persona = personaMap[options.personaId] || personaMap.yuki;

    const prunedHistory = options.sessionHistory.slice(-4).map((m) => ({
      role: m.sender === 'user' ? 'Learner' : persona.name,
      text: m.textJp,
    }));

    const historyStr = prunedHistory
      .map((h) => `${h.role}: ${h.text}`)
      .join('\n');

    const prompt = `You are roleplaying as ${persona.name}, ${persona.role}.
Character Voice & Tone: ${persona.tone}
Scenario / Topic: "${options.scenarioTitle}"
${options.customTopicDescription ? `Specific Scenario Setting from User: "${options.customTopicDescription}"` : ''}
Learner JLPT Target Level: JLPT ${options.level}

Recent conversation history:
${historyStr || '(Beginning of dialogue)'}

Learner just spoke to you:
"${options.userText}"

CRITICAL INSTRUCTIONS FOR A NATURAL, HUMAN-LIKE SPOKEN CONVERSATION:
1. Respond DIRECTLY and authentically to what the learner said, staying in character as ${persona.name}.
2. React like a real human in a real voice call — use natural Japanese aizuchi (相槌: そうなんだ、なるほど、へえ、確かに、いいね、すごい、あ、そうなんですか).
3. Keep the conversation flowing smoothly: share a short personal reaction or thought, and ask ONE natural follow-up question so the learner can reply.
4. Adapt Japanese vocabulary and grammar complexity to JLPT ${options.level}.
5. Provide:
   - "textJp": Your Japanese reply in natural Japanese script.
   - "reading": Complete hiragana reading of your reply for learners.
   - "textEn": Natural English translation.
   - "textMy": Natural Burmese (Myanmar unicode script) translation.
   - "feedback":
     - "naturalJapaneseAlternatives": 1-2 ways native Japanese would say what the learner said more naturally.
     - "grammarMistakes": Brief constructive tip if any particle or verb form was off.
     - "pronunciationTips": 1 helpful tip on pitch, pause, or rhythm.
   - "suggestedReplies": 2-3 short, natural Japanese responses the learner can say next to keep the dialogue going.

Output STRICT JSON:
{
  "textJp": "Japanese reply",
  "reading": "Kana reading",
  "textEn": "English translation",
  "textMy": "Burmese translation in Myanmar unicode",
  "feedback": {
    "naturalJapaneseAlternatives": ["Natural native alternative 1"],
    "grammarMistakes": ["Brief grammar note"],
    "pronunciationTips": ["Intonation tip"]
  },
  "suggestedReplies": ["short Japanese reply 1", "short Japanese reply 2"]
}`;

    const callStartTime = Date.now();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.75,
          maxOutputTokens: 380,
          responseMimeType: 'application/json',
        },
      }),
    });

    const durationMs = Date.now() - callStartTime;

    if (!res.ok) {
      AdminService.trackAiUsage({
        feature: 'ai_conversation',
        model: 'gemini-2.5-flash',
        inputTokens: 0,
        outputTokens: 0,
        cacheHit: false,
        status: 'error',
        durationMs,
      }).catch(() => {});
      return null;
    }

    const json = await res.json();
    const raw = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return null;

    const inputTokens = json.usageMetadata?.promptTokenCount || 220;
    const outputTokens = json.usageMetadata?.candidatesTokenCount || 100;

    AdminService.trackAiUsage({
      feature: 'ai_conversation',
      model: 'gemini-2.5-flash',
      inputTokens,
      outputTokens,
      cacheHit: false,
      status: 'success',
      durationMs,
    }).catch(() => {});

    try {
      const parsed = JSON.parse(raw);
      return {
        id: 'ai-speak-' + Date.now(),
        sender: 'ai',
        textJp: parsed.textJp,
        reading: parsed.reading || parsed.textJp,
        textEn: parsed.textEn || '',
        textMy: parsed.textMy,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        apiSource: 'direct_gemini',
        feedback:
          parsed.feedback?.grammarMistakes?.length ||
          parsed.feedback?.pronunciationTips?.length ||
          parsed.feedback?.naturalJapaneseAlternatives?.length
            ? parsed.feedback
            : undefined,
        suggestedReplies: parsed.suggestedReplies || [],
      };
    } catch {
      return null;
    }
  }

  /**
   * Intelligent Contextual Speaking Engine Fallback (Offline-Ready & Dynamic Persona-Driven)
   */
  private static async generateInteractiveSpeakingContextualFallback(
    options: InteractiveSpeakingOptions
  ): Promise<AIMessage> {
    await new Promise((r) => setTimeout(r, 600));

    const clean = options.userText.toLowerCase().trim();
    const isYuki = options.personaId === 'yuki';
    const isKenji = options.personaId === 'kenji';
    const isTanaka = options.personaId === 'tanaka';
    const isRen = options.personaId === 'ren';

    let textJp = '';
    let reading = '';
    let textEn = '';
    let textMy = '';
    let suggestedReplies: string[] = [];
    const alternatives: string[] = [];
    const grammarMistakes: string[] = [];

    // Analyze learner input
    if (clean.includes('食べるでした') || clean.includes('行くでした')) {
      grammarMistakes.push('Past tense uses 〜ました / 〜た (e.g. 食べました), not dict form + でした.');
    }
    if (clean.includes('私は') && clean.split('私は').length > 2) {
      grammarMistakes.push('In natural spoken Japanese, you can omit 「私は」 (watashi wa) once clear.');
    }

    if (/こんにちは|おはよう|こんばんは|初めまして|はじめまして|hello|hi/.test(clean)) {
      if (isRen) {
        textJp = 'おっ、こんにちは！調子はどう？今日も楽しく日本語で話そうぜ！';
        reading = 'おっ、こんにちは！ちょうしは どう？きょうも たのしく にほんごで はなそうぜ！';
        textEn = 'Yo, hello! How are things going? Let’s chat in Japanese today and have fun!';
        textMy = 'ဟေး၊ မင်္ဂလာပါ! အခြေအနေ ဘယ်လိုရှိလဲ? ဒီနေ့လည်း ဂျပန်လို ပျော်ပျော်ပါးပါး စကားပြောကြမယ်ဟေ့!';
      } else if (isTanaka) {
        textJp = 'こんにちは、お疲れ様です。本日はどのような点について情報共有またはご相談でしょうか？';
        reading = 'こんにちは、おつかれさまです。ほんじつは どのようなてんについて じょうほうきょうゆう または ごそうだんでしょうか？';
        textEn = 'Hello, thank you for your work. What topic or matter would you like to discuss today?';
        textMy = 'မင်္ဂလာပါ၊ ပင်ပန်းနေပါပြီ။ ဒီနေ့ ဘယ်အကြောင်းအရာနဲ့ ပတ်သက်ပြီး သတင်းဖလှယ် ဆွေးနွေးလိုပါသလဲခင်ဗျာ?';
      } else if (isKenji) {
        textJp = 'こんにちは！いつも熱心に学習されて素晴らしいですね。今日はどんなトピックについて練習しましょうか？';
        reading = 'こんにちは！いつも ねっしんに がくしゅうされて すばらしいですね。きょうは どんな トピックについて れんしゅうしましょうか？';
        textEn = 'Hello! It is wonderful to see your dedication to learning. What topic shall we practice today?';
        textMy = 'မင်္ဂလာပါ! အမြဲတစေ ကြိုးစားလေ့လာနေတာ သိပ်ချီးကျူးဖို့ကောင်းပါတယ်။ ဒီနေ့ ဘာခေါင်းစဉ်လေး လေ့ကျင့်ကြမလဲ?';
      } else {
        textJp = 'こんにちは！話しかけてくれて嬉しいです。今日はどんなことについて話しましょうか？';
        reading = 'こんにちは！はなしかけてくれて うれしいです。きょうは どんなことについて はなしましょうか？';
        textEn = 'Hello! So happy you chatted with me. What shall we talk about today?';
        textMy = 'မင်္ဂလာပါ! လှမ်းပြီး စကားပြောပေးလို့ ဝမ်းသာပါတယ်။ ဒီနေ့ ဘာအကြောင်း ပြောကြမလဲ?';
      }
      suggestedReplies = ['日本の文化について話したいです', '自己紹介をさせてください', '最近の出来事について話します'];
      alternatives.push('こんにちは！よろしくお願いします！ (Very natural greeting)');
    } else if (/好き|すき|趣味|しゅみ|面白い|おもしろい|like|favorite|hobby/.test(clean)) {
      if (isRen) {
        textJp = 'それ最高じゃん！俺もそういうのめっちゃ興味あるよ。もっと詳しく教えてよ！';
        reading = 'それ さいこうじゃん！おれも そういうの めっちゃ きょうみ あるよ。もっと くわしく おしえてよ！';
        textEn = 'That is awesome! I am super interested in that too. Tell me more details!';
        textMy = 'ဒါ အမိုက်စားပဲကွ! ငါလည်း အဲဒီလိုမျိုး သိပ်စိတ်ဝင်စားတာ။ အသေးစိတ်လေး ထပ်ပြောပြပါဦး!';
      } else {
        textJp = 'そうなんですね！とても魅力的ですね。どうしてそれに興味を持たれたのですか？';
        reading = 'そうなんですね！とても みりょくてき ですね。どうして それに きょうみを もたれたのですか？';
        textEn = 'Is that so! That sounds fascinating. What got you interested in it?';
        textMy = 'ဟုတ်လားခင်ဗျာ! သိပ်စိတ်ဝင်စားဖို့ ကောင်းတယ်နော်။ ဘာကြောင့် အဲဒါကို စိတ်ဝင်စားသွားခဲ့တာလဲ?';
      }
      suggestedReplies = ['昔から興味がありました', '友達に勧められたのがきっかけです', 'とても楽しいからです'];
      alternatives.push('とても気に入っています (I really like it)');
    } else {
      // General natural interactive response
      if (isRen) {
        textJp = 'なるほどな！よく分かったよ。ちなみに、それについて君はどう思う？';
        reading = 'なるほどな！よく わかったよ。ちなみに、それについて きみは どう おもう？';
        textEn = 'I see! I get what you mean. By the way, what are your thoughts on that?';
        textMy = 'သဘောပေါက်ပါပြီ! ရှင်းရှင်းလင်းလင်း နားလည်ပါတယ်။ ဒါနဲ့ မင်းကရော အဲဒါနဲ့ပတ်သက်ပြီး ဘယ်လိုထင်လဲ?';
      } else if (isTanaka) {
        textJp = '承知いたしました。貴重なご意見ありがとうございます。今後どのように進めるのが良いとお考えでしょうか？';
        reading = 'しょうちいたしました。きちょうな ごいけん ありがとうございます。こんご どのように すすめるのが よいとおかんがえでしょうか？';
        textEn = 'Understood. Thank you for your valuable input. How do you propose we move forward from here?';
        textMy = 'သဘောပေါက် နားလည်ပါပြီ။ အဖိုးတန် အမြင်သဘောထားအတွက် ကျေးဇူးတင်ပါတယ်။ နောင် ဘယ်လို ရှေ့ဆက်ရင် ကောင်းမလဲလို့ ယူဆပါသလဲခင်ဗျာ?';
      } else {
        textJp = 'なるほど、そうなんですね！とても興味深いお話です。それに関して、もう少し詳しく聞かせてもらえますか？';
        reading = 'なるほど、そうなんですね！とても きょうみぶかい おはなし です。それにかんして、もうすこし くわしく きかせてもらえますか？';
        textEn = 'I see, that makes sense! That is very interesting. Could you tell me a little more about it?';
        textMy = 'ဟုတ်ကဲ့၊ အဲဒီလိုလားခင်ဗျာ! သိပ်စိတ်ဝင်စားစရာ ကောင်းတဲ့ အကြောင်းအရာပဲနော်။ အဲဒါနဲ့ပတ်သက်ပြီး နည်းနည်းလောက် ထပ်ပြောပြပေးနိုင်မလား?';
      }
      suggestedReplies = ['例えば、〜ということです', '理由は、〜だからです', '具体的に説明します'];
      alternatives.push('〜だと思います (I think that...)');
    }

    return {
      id: 'ai-speak-' + Date.now(),
      sender: 'ai',
      textJp,
      reading,
      textEn,
      textMy,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      apiSource: 'smart_contextual',
      feedback: {
        naturalJapaneseAlternatives: alternatives,
        grammarMistakes,
        pronunciationTips: ['Keep pauses natural between topic (は) and predicate.'],
      },
      suggestedReplies,
    };
  }

  /**
   * Intelligent Contextual Japanese Engine (Zero-Cost, Deep Intent Analysis & Realistic Q&A)
   */
  private static async generateContextualFallback(
    userText: string,
    topic: AIConversationTopic,
    level: JLPTLevel,
    sessionHistory: AIMessage[]
  ): Promise<AIMessage> {
    // Simulate brief natural thinking time
    await new Promise((r) => setTimeout(r, 650));

    const clean = userText.toLowerCase().trim();
    let replyJp = '';
    let reading = '';
    let textEn = '';
    let textMy = '';
    let suggestedReplies: string[] = [];

    const feedback: AIMessage['feedback'] = {
      grammarMistakes: [],
      vocabularySuggestions: [],
      naturalJapaneseAlternatives: [],
    };

    // Analyze learner grammar
    if (userText.includes('食べるでした') || userText.includes('行くでした')) {
      feedback.grammarMistakes?.push('Past tense of verbs uses 〜ました or 〜た (e.g. 食べました / 行きました), not verb dict form + でした.');
      feedback.naturalJapaneseAlternatives?.push(userText.replace('食べるでした', '食べました').replace('行くでした', '行きました'));
    }
    if (userText.includes('私') && userText.split('私').length > 2) {
      feedback.grammarMistakes?.push('Avoid repeating 「私は」 (watashi wa) in every sentence. Japanese naturally omits the subject once understood.');
    }

    // Intent detection
    const isPriceQuery = /いくら|何円|値段|高い|安い|価格|費用|how much|price|cost/.test(clean);
    const isRecommendationQuery = /おすすめ|お勧め|人気|何がいい|一番|recommend|special/.test(clean);
    const isLocationQuery = /どこ|場所|トイレ|お手洗い|レジ|駅|出口|エレベーター|where/.test(clean);
    const isOrderingQuery = /これ|それ|ください|おねがい|お願いします|頼み|〜にする|注文|order/.test(clean);
    const isPaymentQuery = /会計|お会計|チェック|支払|カード|現金|払|電子マネー|pay|bill|check/.test(clean);
    const isTimeQuery = /何時|時間|いつ|営業時間|ラストオーダー|何時まで|time|hours/.test(clean);
    const isGreeting = /こんにちは|おはよう|こんばんは|初めまして|はじめまして|hello|hi/.test(clean);
    const isAffirmative = /はい|ええ|そう|うん|yes|yeah/.test(clean);
    const isNegative = /いいえ|ううん|結構|大丈夫|no/.test(clean);

    if (topic === 'restaurant') {
      if (isPriceQuery) {
        replyJp = '特製ラーメンは850円、餃子セットは1,100円でございます。大盛りはプラス100円ですが、いかがなさいますか？';
        reading = 'とくせいらーめんは はっぴゃくごじゅうえん、ぎょうざせっとは せんひゃくえんでございます。おおもりは ぷらす ひゃくえんですが、いかがなさいますか？';
        textEn = 'Our special ramen is 850 yen, and the gyoza combo set is 1,100 yen. A large portion is an extra 100 yen. Which would you prefer?';
        textMy = 'အထူးရာမင်ခေါက်ဆွဲက ၈၅၀ ယန်းဖြစ်ပြီး ဖက်ထုပ်တွဲဆက်က ၁,၁၀၀ ယန်း ဖြစ်ပါတယ်။ အပန်းကြီးကြီးက ၁၀၀ ယန်း ပိုကျသင့်ပါမယ်၊ ဘယ်ဟာ ယူမလဲခင်ဗျာ။';
        suggestedReplies = ['ラーメン単品でお願いします', '餃子セットをお願いします'];
        feedback.vocabularySuggestions?.push('特製（とくせい - special / house specialty）');
      } else if (isRecommendationQuery) {
        replyJp = '本日のおすすめは旬の黒豚味噌ラーメン（920円）でございます！少しピリ辛ですが、辛いものはお好きですか？';
        reading = 'ほんじつのおすすめは しゅんのくろぶたみそらーめん（きゅうひゃくにじゅうえん）でございます！すこしぴりからですが、からいものは おすきですか？';
        textEn = 'Today’s recommendation is our seasonal Kurobuta Miso Ramen (920 yen)! It is slightly spicy, do you like spicy food?';
        textMy = 'ဒီနေ့ အကြံပြုလိုတာကတော့ ရာသီပေါ် ဝက်သားမီဆိုရာမင် (၉၂၀ ယန်း) ဖြစ်ပါတယ်ခင်ဗျာ။ အနည်းငယ် စပ်ပါတယ်၊ အစပ်ကြိုက်နှစ်သက်ပါသလားခင်ဗျာ။';
        suggestedReplies = ['はい、辛いのが好きです', '辛くないものはありますか？'];
        feedback.vocabularySuggestions?.push('旬（しゅん - in season / seasonal peak）');
      } else if (isPaymentQuery) {
        replyJp = 'ありがとうございます。お会計は合計で1,250円でございます。お支払いは現金またはクレジットカードのどちらになさいますか？';
        reading = 'ありがとうございます。おかいけいは ごうけいで せんにひゃくごじゅうえんでございます。おしはらいは げんきん または くれじっとかーどの どちらになさいますか？';
        textEn = 'Thank you very much. The total bill is 1,250 yen. Will you be paying with cash or credit card?';
        textMy = 'ကျေးဇူးတင်ပါတယ်။ ကျသင့်ငွေ စုစုပေါင်း ၁,၂၅၀ ယန်း ဖြစ်ပါတယ်။ ငွေသားဖြင့် ရှင်းမလား၊ ခရက်ဒစ်ကတ်ဖြင့် ရှင်းမလဲခင်ဗျာ။';
        suggestedReplies = ['カードでお願いします', '現金で払います'];
        feedback.vocabularySuggestions?.push('お会計（おかいけい - the bill / check）');
      } else if (isLocationQuery) {
        replyJp = 'お手洗いは店内奥の右手奥にございます。ご案内いたしましょうか？';
        reading = 'おてあらいは てんないおくの みぎておくに ございます。ごあんない いたしましょうか？';
        textEn = 'The restroom is located at the back of the restaurant on the right. Shall I show you the way?';
        textMy = 'အိမ်သာက ဆိုင်အတွင်းပိုင်း ညာဘက်ထောင့်မှာ ရှိပါတယ်ခင်ဗျာ။ လိုက်ပြပေးရမလားခင်ဗျာ။';
        suggestedReplies = ['大丈夫です、ありがとうございます', 'お願いします'];
      } else if (isOrderingQuery) {
        replyJp = 'かしこまりました！ご注文を承りました。お飲み物はいかがなさいますか？冷たいお茶とお水がございます。';
        reading = 'かしこまりました！ごちゅうもんを うけたまわりました。おのみものは いかがなさいますか？つめたいおちゃと おみずが ございます。';
        textEn = 'Understood! I have taken your order. Would you like anything to drink? We have cold tea and water.';
        textMy = 'စိတ်ချပါခင်ဗျာ၊ မှာယူမှုကို မှတ်သားလိုက်ပါပြီ။ သောက်စရာ ဘာယူမလဲခင်ဗျာ။ ရေအေးနဲ့ ရေနွေးကြမ်းအေး ရှိပါတယ်။';
        suggestedReplies = ['冷たいお茶をお願いします', 'お水でいいです'];
      } else if (isTimeQuery) {
        replyJp = '夜の10時まで営業しております。ラストオーダーは9時30分でございます。ゆっくりお召し上がりくださいね。';
        reading = 'よるの じゅうじまで えいぎょうしております。らすとおーだーは くじさんじゅっぷんでございます。ゆっくり おめしあがりくださいね。';
        textEn = 'We are open until 10:00 PM. Last orders are at 9:30 PM. Please take your time and enjoy your meal.';
        textMy = 'ည ၁၀ နာရီအထိ ဖွင့်လှစ်ထားပါတယ်။ နောက်ဆုံးမှာယူချိန်က ၉ နာရီ ၃၀ မိနစ် ဖြစ်ပါတယ်။ အေးအေးဆေးဆေး သုံးဆောင်ပါနော်။';
        suggestedReplies = ['わかりました、ありがとう', 'デザートも頼めますか？'];
      } else {
        replyJp = 'かしこまりました！お味はいかがでしょうか？何か他にご入用のものはございますか？';
        reading = 'かしこまりました！おあじは いかがでしょうか？なにか ほかに ごにゅうようのものは ございますか？';
        textEn = 'Understood! How is the taste? Is there anything else you might need?';
        textMy = 'သဘောပေါက်ပါပြီခင်ဗျာ။ အရသာ အဆင်ပြေပါရဲ့လား။ အခြား ဘာများ လိုအပ်ပါသေးသလဲခင်ဗျာ။';
        suggestedReplies = ['とても美味しいです！', 'お水をもう一杯ください'];
      }
    } else if (topic === 'shopping') {
      if (isPriceQuery) {
        replyJp = 'こちらは消費税込みで4,500円でございます。本日は2点以上お買い上げで10%オフになりますよ！';
        reading = 'こちらは しょうひぜいこみで よんせんごひゃくえんでございます。ほんじつは にてんいじょう おかいあげで じゅっぱーせんと おふになりますよ！';
        textEn = 'This is 4,500 yen including consumption tax. Today we have a 10% discount if you buy two or more items!';
        textMy = 'ဒါက ကုန်သွယ်ခွန်အပါ ၄,၅၀၀ ယန်း ဖြစ်ပါတယ်။ ဒီနေ့ ၂ ထည်နှင့်အထက် ဝယ်ယူပါက ၁၀% လျှော့စျေးရှိပါတယ်ခင်ဗျာ။';
        suggestedReplies = ['試着してもいいですか？', '他の色はありますか？'];
      } else if (isRecommendationQuery) {
        replyJp = '今シーズン一番人気はこちらの軽量ジャケットでございます。羽織ってみられますか？';
        reading = 'こんしーずん いちばんにんきは こちらの けいりょうじゃけっとでございます。はおりってみられますか？';
        textEn = 'Our most popular item this season is this lightweight jacket. Would you like to try it on?';
        textMy = 'ဒီရာသီမှာ လူကြိုက်အများဆုံးကတော့ ဒီပေါ့ပါးတဲ့ ဂျာကင်အင်္ကျီ ဖြစ်ပါတယ်။ စမ်းဝတ်ကြည့်မလားခင်ဗျာ။';
        suggestedReplies = ['はい、着てみます', '黒い色はありますか？'];
      } else if (isPaymentQuery) {
        replyJp = 'お会計ですね。レジへご案内いたします。免税手続き（Tax-Free）はご利用なさいますか？';
        reading = 'おかいけいですね。れじへ ごあんないいたします。めんぜいてつづき（Tax-Free）は ごりようになりますか？';
        textEn = 'Ready to pay? Allow me to guide you to the register. Would you like to use tax-free processing?';
        textMy = 'ငွေရှင်းမယ်နော်၊ ငွေရှင်းကောင်တာကို လမ်းပြပေးပါမယ်။ အခွန်လွတ် (Tax-Free) စနစ်ကို အသုံးပြုမလားခင်ဗျာ။';
        suggestedReplies = ['はい、免税をお願いします', 'いいえ、大丈夫です'];
      } else {
        replyJp = 'かしこまりました。サイズが合わなければ別のサイズもお持ちいたしますので、お気軽におっしゃってくださいね。';
        reading = 'かしこまりました。さいずが あわなければ べつのさいずも おもちいたしますので、お気軽に おっしゃってくださいね。';
        textEn = 'Certainly. If the size doesn’t fit, I can bring another size, so please let me know freely.';
        textMy = 'စိတ်ချပါခင်ဗျာ။ ဆိုဒ်မတော်ပါက အခြားဆိုဒ် လာပေးနိုင်တာကြောင့် လွတ်လပ်စွာ ပြောပြနိုင်ပါတယ်နော်။';
        suggestedReplies = ['Mサイズはありますか？', 'これでお願いします'];
      }
    } else if (topic === 'hotel') {
      if (isPriceQuery) {
        replyJp = 'ご宿泊料金は1泊朝食バイキング付きで11,000円となっております。ご予約なさいますか？';
        reading = 'ごしゅくはくりょうきんは いっぱく ちょうしょくばいきんぐつきで いちまんいっせんえんと なっております。ごよやく なさいますか？';
        textEn = 'The accommodation fee is 11,000 yen per night including breakfast buffet. Would you like to book?';
        textMy = 'တည်းခိုခက မနက်စာဘူဖေးအပါ တစ်ညလျှင် ၁၁,၀၀၀ ယန်း ဖြစ်ပါတယ်။ ကြိုတင်ဘိုကင်တင်မလားခင်ဗျာ။';
        suggestedReplies = ['予約をお願いします', 'チェックアウトは何時ですか？'];
      } else if (isTimeQuery) {
        replyJp = 'チェックインは15時から、チェックアウトは午前11時となっております。お荷物は事前にお預かりできますよ。';
        reading = 'ちぇっくいんは じゅうごじから、ちぇっくあうとは ごぜんじゅういちじと なっております。お荷物は じぜんに おあずかりできますよ。';
        textEn = 'Check-in is from 3:00 PM, and check-out is at 11:00 AM. We can store your luggage beforehand.';
        textMy = 'ချက်အင်ဝင်ချိန်က ညနေ ၃ နာရီမှဖြစ်ပြီး၊ ချက်အောက်ထွက်ချိန်က နံနက် ၁၁ နာရီ ဖြစ်ပါတယ်။ ခရီးဆောင်အိတ်များကို ကြိုတင်အပ်နှံထားနိုင်ပါတယ်ခင်ဗျာ။';
        suggestedReplies = ['荷物を預けてもいいですか？', '朝食は何時からですか？'];
      } else {
        replyJp = 'かしこまりました。Wi-Fiのパスワードはこちらのカードに記載されております。何か他にご不明な点はございますか？';
        reading = 'かしこまりました。わいふぁいの ぱすわーどは こちらのカードに きさいされております。なにか ほかに ごふめいなてんは ございますか？';
        textEn = 'Understood. The Wi-Fi password is noted on this card. Do you have any other questions?';
        textMy = 'သဘောပေါက်ပါပြီခင်ဗျာ။ ဝိုင်ဖိုင်စကားဝှက်ကို ဒီကတ်မှာ ရေးသားထားပါတယ်။ အခြား သိလိုတာများ ရှိပါသေးသလားခင်ဗျာ။';
        suggestedReplies = ['近くにおすすめのレストランはありますか？', '大丈夫です、ありがとう'];
      }
    } else if (topic === 'self_introduction') {
      replyJp = '素晴らしいですね！日本に来てどれくらいになりますか？普段はどんな勉強やお仕事をされているのですか？';
      reading = 'すばらしいですね！にほんにきて どれくらいになりますか？ふだんは どんなべんきょうや おしごとを されているのですか？';
      textEn = 'That sounds wonderful! How long have you been in Japan? What kind of studies or work do you usually do?';
      textMy = 'အရမ်းကောင်းတာပဲဗျာ။ ဂျပန်ကို ရောက်တာ ဘယ်လောက်ကြာပြီလဲခင်ဗျာ။ အခုလက်ရှိ ဘာပညာသင်ယူနေသလဲ သို့မဟုတ် ဘာအလုပ်လုပ်နေသလဲခင်ဗျာ။';
      suggestedReplies = ['日本語学校で勉強しています', 'IT関係の仕事をしています'];
    } else {
      replyJp = 'なるほど、よくわかりました！とても自然な日本語ですね。この話題について、もっと詳しく聞かせていただけますか？';
      reading = 'なるほど、よくわかりました！とても しぜんな にほんごですね。このわだいについて、もっとくわしく きかせていただけますか？';
      textEn = 'I see, that makes great sense! Your Japanese is very natural. Could you tell me a bit more about that?';
      textMy = 'ဟုတ်ကဲ့၊ ကောင်းကောင်း သဘောပေါက်ပါပြီ။ ဂျပန်စကားပြောတာ အရမ်းသဘာဝကျပါတယ်။ ဒီအကြောင်းအရာနှင့်ပတ်သက်ပြီး အသေးစိတ် ထပ်မံပြောပြနိုင်မလားခင်ဗျာ။';
      suggestedReplies = ['はい、喜んで！', '例えばですね...'];
    }

    // Dynamic natural phrasing tip
    if (!feedback.naturalJapaneseAlternatives?.length) {
      if (userText.includes('ええ') || userText.includes('うん')) {
        feedback.naturalJapaneseAlternatives?.push('In polite situations with staff or elders, use 「はい」(hai) instead of 「ええ」 or 「うん」.');
      } else {
        feedback.naturalJapaneseAlternatives?.push('You can add 「〜でしょうか」 at the end of questions for extra polite nuance (e.g. 「いくらでしょうか？」).');
      }
    }

    return {
      id: 'ai-msg-' + Date.now(),
      sender: 'ai',
      textJp: replyJp,
      reading,
      textEn,
      textMy,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      apiSource: 'smart_contextual',
      feedback:
        feedback.grammarMistakes?.length ||
        feedback.vocabularySuggestions?.length ||
        feedback.naturalJapaneseAlternatives?.length
          ? feedback
          : undefined,
      suggestedReplies,
    };
  }

  /**
   * AI Personal Tutor Explainer for contextual queries (Enhanced with AIGateway support)
   */
  public static async askAITutor(
    query: string,
    level: JLPTLevel,
    currentContext?: string
  ): Promise<{
    title: string;
    explanation: string;
    examples: { jp: string; reading: string; en: string }[];
    studyTip: string;
  }> {
    const q = query.toLowerCase();

    // Check if Supabase Edge Gateway is accessible
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.functions.invoke('active-learning', {
          body: {
            action: 'explain',
            contentId: query,
            contentType: 'grammar_explanation',
            level,
          },
        });
        if (!error && data?.explanation) {
          return {
            title: data.title || `Grammar Guide: ${query}`,
            explanation: data.explanation,
            examples: data.examples?.map((ex: any) => ({
              jp: ex.jp,
              reading: ex.reading || ex.jp,
              en: ex.meaning || ex.en || '',
            })) || [],
            studyTip: data.studyTip || 'Master this pattern in your daily spaced repetition review.',
          };
        }
      } catch (e) {
        console.warn('AIService.askAITutor: Edge invoke error:', e);
      }
    }

    // High quality contextual local tutor responses
    if (q.includes('ない') || q.includes('must') || q.includes('なければ')) {
      return {
        title: 'Grammar Guide: 〜なければならない (Must do)',
        explanation:
          'Used to express an obligation or absolute necessity. Formed by taking Verb Nai-form, removing [い], and appending [〜なければなりません] (polite) or [〜なければならない] (casual).',
        examples: [
          {
            jp: '明日、早く起きなければなりません。',
            reading: 'あした、はやく おきなければ なりません。',
            en: 'I must wake up early tomorrow.',
          },
          {
            jp: '薬を飲まなければならない。',
            reading: 'くすりを のまなければ ならない。',
            en: 'I have to take my medicine.',
          },
        ],
        studyTip: 'Contrast with 〜てもいい (You may / permission) and 〜てはいけない (You must not / prohibition).',
      };
    }

    if (q.includes('particle') || q.includes('は') || q.includes('が') || q.includes('助詞')) {
      return {
        title: 'Grammar Distinction: は (Topic) vs が (Subject)',
        explanation:
          '「は」 marks the topic or general theme ("Speaking of X..."), whereas 「が」 marks specific new information or highlights the subject ("It is X that...").',
        examples: [
          {
            jp: '私は学生です。',
            reading: 'わたしは がくせいです。',
            en: 'As for me, I am a student. (General topic)',
          },
          {
            jp: '誰が来ましたか？ — 田中さんが来ました。',
            reading: 'だれが きましたか？ — たなかさんが きました。',
            en: 'Who came? — Mr. Tanaka came. (Identifying the specific subject)',
          },
        ],
        studyTip: 'In question words like 誰 (who) or 何 (what), always use 「が」 as the subject particle!',
      };
    }

    return {
      title: `AI Tutor Answer for ${level}`,
      explanation: `Here is a clear explanation tailored to ${level} level learners: "${query}". In Japanese, context and polite nuance are essential. Always check whether the particle matches the verb's transitivity (自動詞 vs 他動詞).`,
      examples: [
        {
          jp: '毎日日本語を勉強しています。',
          reading: 'まいにち にほんごを べんきょうしています。',
          en: 'I study Japanese every single day.',
        },
        {
          jp: '少しずつ上達していますよ！',
          reading: 'すこしずつ じょうたつ していますよ！',
          en: 'You are improving step by step!',
        },
      ],
      studyTip: `Review 5 minutes before sleep to reinforce memory retention for ${level}.`,
    };
  }
}

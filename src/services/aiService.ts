import { JLPTLevel } from '../types';
import { AIConversationTopic, AIMessage, ConversationSession } from '../types/ai';

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
   * Generates conversational reply adapting to JLPT level with instant linguistic feedback
   */
  public static async generateReply(
    userText: string,
    topic: AIConversationTopic,
    level: JLPTLevel,
    sessionHistory: AIMessage[]
  ): Promise<AIMessage> {
    // Simulate brief AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lower = userText.toLowerCase();
    const isGreeting = /こんにちは|はじめまして|おはよう|こんばんは|hi|hello/.test(lower);
    const isOrdering = /ください|おねがい|これ|メニュー|おすすめ|会計|いくら/.test(userText);
    const isLocation = /どこ|駅|トイレ|ホテル|道/.test(userText);

    let replyJp = '';
    let reading = '';
    let textEn = '';
    const feedback: AIMessage['feedback'] = {
      grammarMistakes: [],
      vocabularySuggestions: [],
      naturalJapaneseAlternatives: [],
    };

    // Analyze grammar & provide helpful educational feedback
    if (userText.includes('私') && userText.includes('は') && userText.split('私').length > 2) {
      feedback.grammarMistakes?.push('Avoid repeating 「私は」(watashi wa) too often. In Japanese, subject is usually omitted once context is clear.');
    }

    if (userText.includes('食べるでした') || userText.includes('行くでした')) {
      feedback.grammarMistakes?.push('Past tense of verbs uses 〜ました or 〜た (e.g. 食べました / 行きました), not verb dictionary form + でした.');
      feedback.naturalJapaneseAlternatives?.push(userText.replace('食べるでした', '食べました').replace('行くでした', '行きました'));
    }

    if (topic === 'restaurant') {
      if (isOrdering) {
        if (level === 'N5') {
          replyJp = 'かしこまりました！ラーメンですね。お飲み物は何にしますか？';
          reading = 'かしこまりました！ラーメンですね。おのみものは なににしますか？';
          textEn = 'Certainly! Ramen it is. What would you like to drink?';
          feedback.vocabularySuggestions?.push('〜にします (I will choose ~)');
        } else if (level === 'N4') {
          replyJp = 'ご注文ありがとうございます。大盛り（おおもり）にもできますが、いかがなさいますか？';
          reading = 'ごちゅうもん ありがとうございます。おおもりにも できますが、いかがなさいますか？';
          textEn = 'Thank you for your order. We can make it a large portion if you like. Would you prefer that?';
          feedback.vocabularySuggestions?.push('大盛り（おおもり - large portion）');
        } else {
          replyJp = 'かしこまりました。ただいま調理いたしますので、少々お待ちいただけますでしょうか。';
          reading = 'かしこまりました。ただいま ちょうりいたしますので、しょうしょう おまちいただけますでしょうか。';
          textEn = 'Certainly. We will prepare it right away, so please wait a moment.';
        }
      } else {
        replyJp = '当店一番人気は特製味噌ラーメンでございます！セットに餃子はいかがでしょうか？';
        reading = 'とうてん いちばんにんきは とくせいみそラーメンでございます！セットに ぎょうざはいかがでしょうか？';
        textEn = 'Our most popular dish is our special miso ramen! Would you like a gyoza combo set with that?';
      }
    } else if (topic === 'self_introduction') {
      replyJp = '素敵ですね！日本語を勉強し始めたきっかけは何ですか？アニメや旅行ですか？';
      reading = 'すてきですね！にほんごを べんきょうしはじめた きっかけは なんですか？アニメや りょこうですか？';
      textEn = 'That sounds wonderful! What inspired you to start studying Japanese? Was it anime or travel?';
      feedback.vocabularySuggestions?.push('きっかけ (motive, inspiration, trigger)');
    } else {
      replyJp = 'なるほど、よくわかりました！とても自然な日本語ですね。他に何か質問はありますか？';
      reading = 'なるほど、よくわかりました！とても しぜんな にほんごですね。ほかになにか しつもんはありますか？';
      textEn = 'I see, that makes sense! Your Japanese is very natural. Do you have any other questions?';
    }

    if (!feedback.grammarMistakes?.length && Math.random() > 0.5) {
      feedback.naturalJapaneseAlternatives?.push('You can also say: 「' + userText + '」 with 「〜と思います」 (I think ~) for softer nuance.');
    }

    return {
      id: 'ai-msg-' + Date.now(),
      sender: 'ai',
      textJp: replyJp,
      reading,
      textEn,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedback: feedback.grammarMistakes?.length || feedback.vocabularySuggestions?.length || feedback.naturalJapaneseAlternatives?.length ? feedback : undefined,
    };
  }

  /**
   * AI Personal Tutor Explainer for contextual queries
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
    await new Promise((resolve) => setTimeout(resolve, 600));

    const q = query.toLowerCase();

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

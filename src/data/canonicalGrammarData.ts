// ============================================================================
// CANONICAL JLPT GRAMMAR DATA (N5, N4, N3, N2, N1)
// 100% Genuine, Authenticated, Zero-Duplicate Japanese Language Proficiency Test
// Total: 185 Canonical Grammar Items (N5: 35, N4: 40, N3: 45, N2: 35, N1: 30)
// With Full Multilingual Support & Offline Translations (Burmese, English, Japanese, etc.)
// ============================================================================

import { GrammarItem } from '../types';
import { getLocalizedGrammarContent } from './translations/multilingualEngine';

const RAW_CANONICAL_ITEMS: Omit<GrammarItem, 'meaningsByLang' | 'explanationsByLang'>[] = [
  {
    "id": "g-n5-001",
    "pattern": "〜は〜です",
    "meaning": "A is B (Polite Copula)",
    "structure": "[Noun A] + は + [Noun B] + です",
    "explanation": "Fundamental Japanese sentence structure. は marks the topic and です is the polite copula \"to be\".",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "私は学生です。",
        "reading": "わたしは がくせいです。",
        "en": "I am a student.",
        "highlight": "は〜です",
        "translationsByLang": {
          "en": "I am a student.",
          "ja": "私は学生です。",
          "my": "ကျွန်တော်က ကျောင်းသားဖြစ်ပါတယ်။"
        }
      },
      {
        "jp": "田中さんは日本人です。",
        "reading": "たなかさんは にほんじんです。",
        "en": "Mr. Tanaka is Japanese.",
        "highlight": "は〜です",
        "translationsByLang": {
          "en": "Mr. Tanaka is Japanese.",
          "ja": "田中さんは日本人です。",
          "my": "တနခဆန်က ဂျပန်လူမျိုးဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u1"
  },
  {
    "id": "g-n5-002",
    "pattern": "〜は〜ではありません / じゃありません",
    "meaning": "A is not B (Negative Polite Copula)",
    "structure": "[Noun A] + は + [Noun B] + ではありません / じゃありません",
    "explanation": "Negative form of です. ではありません is formal and written; じゃありません is standard spoken polite.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "私は先生ではありません。",
        "reading": "わたしは せんせいではありません。",
        "en": "I am not a teacher.",
        "highlight": "ではありません",
        "translationsByLang": {
          "en": "I am not a teacher.",
          "ja": "私は先生ではありません。",
          "my": "ကျွန်တော်က ဆရာမဟုတ်ပါဘူး။"
        }
      },
      {
        "jp": "今日は日曜日じゃありません。",
        "reading": "きょうは にちようびじゃありません。",
        "en": "Today is not Sunday.",
        "highlight": "じゃありません",
        "translationsByLang": {
          "en": "Today is not Sunday.",
          "ja": "今日は日曜日じゃありません。",
          "my": "ဒီနေ့က တနင်္ဂနွေနေ့မဟုတ်ပါဘူး။"
        }
      }
    ],
    "unitId": "n5-u1"
  },
  {
    "id": "g-n5-003",
    "pattern": "〜ですか",
    "meaning": "Question particle (Is it ~?)",
    "structure": "[Sentence] + か",
    "explanation": "Placed at the end of a sentence to turn it into a polite question without changing word order.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "これはあなたの本ですか？",
        "reading": "これは あなたの ほんですか？",
        "en": "Is this your book?",
        "highlight": "ですか",
        "translationsByLang": {
          "en": "Is this your book?",
          "ja": "これはあなたの本ですか？",
          "my": "ဒါက မင်းရဲ့စာအုပ်လားခင်ဗျာ။"
        }
      },
      {
        "jp": "お元気ですか？",
        "reading": "おげんきですか？",
        "en": "How are you?",
        "highlight": "ですか",
        "translationsByLang": {
          "en": "How are you?",
          "ja": "お元気ですか？",
          "my": "နေကောင်းပါသလားခင်ဗျာ။"
        }
      }
    ],
    "unitId": "n5-u1"
  },
  {
    "id": "g-n5-004",
    "pattern": "〜の (所属・修飾)",
    "meaning": "Possessive / Modifier particle (of / 's)",
    "structure": "[Noun 1] + の + [Noun 2]",
    "explanation": "Indicates possession, origin, or modifies the second noun with the first noun.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "これは私の傘です。",
        "reading": "これは わたしの かさです。",
        "en": "This is my umbrella.",
        "highlight": "の",
        "translationsByLang": {
          "en": "This is my umbrella.",
          "ja": "これは私の傘です。",
          "my": "ဒါက ကျွန်တော့်ရဲ့ထီးဖြစ်ပါတယ်။"
        }
      },
      {
        "jp": "日本語の先生に会いました。",
        "reading": "にほんごの せんせいに あいました。",
        "en": "I met the Japanese language teacher.",
        "highlight": "の",
        "translationsByLang": {
          "en": "I met the Japanese language teacher.",
          "ja": "日本語の先生に会いました。",
          "my": "ဂျပန်စာဆရာနဲ့ တွေ့ဆုံခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u1"
  },
  {
    "id": "g-n5-005",
    "pattern": "〜も (同類・付加)",
    "meaning": "Also / Too particle",
    "structure": "[Noun] + も",
    "explanation": "Replaces は, が, or を to indicate that the same statement applies to another subject or object.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "私も学生です。",
        "reading": "わたしも がくせいです。",
        "en": "I am also a student.",
        "highlight": "も",
        "translationsByLang": {
          "en": "I am also a student.",
          "ja": "私も学生です。",
          "my": "ကျွန်တော်လည်းပဲ ကျောင်းသားဖြစ်ပါတယ်။"
        }
      },
      {
        "jp": "りんごが好きです。みかんも好きです。",
        "reading": "りんごが すきです。みかんも すきです。",
        "en": "I like apples. I like oranges too.",
        "highlight": "も",
        "translationsByLang": {
          "en": "I like apples. I like oranges too.",
          "ja": "りんごが好きです。みかんも好きです。",
          "my": "ပန်းသီးကြိုက်ပါတယ်။ လိမ္မော်သီးလည်း ကြိုက်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u1"
  },
  {
    "id": "g-n5-006",
    "pattern": "〜を (直接目的語)",
    "meaning": "Direct object particle",
    "structure": "[Noun] + を + [Transitive Verb]",
    "explanation": "Marks the direct object that receives the action of a transitive verb.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "毎朝パンを食べます。",
        "reading": "まいあさ パンを たべます。",
        "en": "I eat bread every morning.",
        "highlight": "を",
        "translationsByLang": {
          "en": "I eat bread every morning.",
          "ja": "毎朝パンを食べます。",
          "my": "မနက်တိုင်း ပေါင်မုန့်စားပါတယ်။"
        }
      },
      {
        "jp": "日本語の新聞を読みます。",
        "reading": "にほんごの しんぶんを よみます。",
        "en": "I read Japanese newspapers.",
        "highlight": "を",
        "translationsByLang": {
          "en": "I read Japanese newspapers.",
          "ja": "日本語の新聞を読みます。",
          "my": "ဂျပန်သတင်းစာကို ဖတ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u2"
  },
  {
    "id": "g-n5-007",
    "pattern": "〜に / 〜へ (方向・目的地)",
    "meaning": "To / Toward (Direction & Destination)",
    "structure": "[Place] + に / へ + 行きます / 来ます / 帰ります",
    "explanation": "Marks the destination or directional goal of movement verbs.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "明日東京へ行きます。",
        "reading": "あした とうきょうへ いきます。",
        "en": "I will go to Tokyo tomorrow.",
        "highlight": "へ",
        "translationsByLang": {
          "en": "I will go to Tokyo tomorrow.",
          "ja": "明日東京へ行きます。",
          "my": "မနက်ဖြန် တိုကျိုကို သွားပါမယ်။"
        }
      },
      {
        "jp": "午後五時に家へ帰ります。",
        "reading": "ごご ごじに うちへ かえります。",
        "en": "I return home at 5:00 PM.",
        "highlight": "へ",
        "translationsByLang": {
          "en": "I return home at 5:00 PM.",
          "ja": "午後五時に家へ帰ります。",
          "my": "ညနေ ၅ နာရီမှာ အိမ်ပြန်ပါမယ်။"
        }
      }
    ],
    "unitId": "n5-u2"
  },
  {
    "id": "g-n5-008",
    "pattern": "〜で (場所・手段)",
    "meaning": "At (Location of action) / By means of",
    "structure": "[Place/Tool] + で + [Verb]",
    "explanation": "Specifies the location where an action takes place, or the vehicle/tool used to perform it.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "図書館で静かに勉強します。",
        "reading": "としょかんで しずかに べんきょうします。",
        "en": "I study quietly at the library.",
        "highlight": "で",
        "translationsByLang": {
          "en": "I study quietly at the library.",
          "ja": "図書館で静かに勉強します。",
          "my": "စာကြည့်တိုက်မှာ တိတ်တိတ်ဆိတ်ဆိတ် စာလေ့လာပါတယ်။"
        }
      },
      {
        "jp": "電車で会社に通っています。",
        "reading": "でんしゃで かいしゃに かよっています。",
        "en": "I commute to work by train.",
        "highlight": "で",
        "translationsByLang": {
          "en": "I commute to work by train.",
          "ja": "電車で会社に通っています。",
          "my": "ရထားဖြင့် ကုမ္ပဏီကို သွားလာအလုပ်လုပ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u2"
  },
  {
    "id": "g-n5-009",
    "pattern": "〜と (一緒・並列)",
    "meaning": "With someone / And (Exhaustive listing)",
    "structure": "[Noun 1] + と + [Noun 2] / [Person] + と + [Verb]",
    "explanation": "Lists nouns exhaustively or indicates the companion with whom an action is performed.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "友達と映画を見に行きました。",
        "reading": "ともだちと えいがを みに いきました。",
        "en": "I went to watch a movie with a friend.",
        "highlight": "と",
        "translationsByLang": {
          "en": "I went to watch a movie with a friend.",
          "ja": "友達と映画を見に行きました。",
          "my": "သူငယ်ချင်းနဲ့အတူ ရုပ်ရှင်သွားကြည့်ခဲ့ပါတယ်။"
        }
      },
      {
        "jp": "机の上にノートとペンがあります。",
        "reading": "つくえの うえに ノートと ペンが あります。",
        "en": "There are notebooks and pens on the desk.",
        "highlight": "と",
        "translationsByLang": {
          "en": "There are notebooks and pens on the desk.",
          "ja": "机の上にノートとペンがあります。",
          "my": "စားပွဲပေါ်မှာ ဗလာစာအုပ်နဲ့ ဘောပင်ရှိပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u2"
  },
  {
    "id": "g-n5-010",
    "pattern": "〜から〜まで",
    "meaning": "From ~ to ~ (Time & Space limits)",
    "structure": "[Time/Place 1] + から + [Time/Place 2] + まで",
    "explanation": "Expresses starting and ending boundaries in time, date, or physical space.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "授業は九時から三時までです。",
        "reading": "じゅぎょうは くじから さんじまでです。",
        "en": "Classes are from 9:00 to 3:00.",
        "highlight": "から〜まで",
        "translationsByLang": {
          "en": "Classes are from 9:00 to 3:00.",
          "ja": "授業は九時から三時までです。",
          "my": "အတန်းက ၉ နာရီမှ ၃ နာရီအထိ ဖြစ်ပါတယ်။"
        }
      },
      {
        "jp": "駅から家まで歩いて十分です。",
        "reading": "えきから うちまで あるいて じゅっぷんです。",
        "en": "It takes 10 minutes on foot from station to home.",
        "highlight": "から〜まで",
        "translationsByLang": {
          "en": "It takes 10 minutes on foot from station to home.",
          "ja": "駅から家まで歩いて十分です。",
          "my": "ဘူတာမှ အိမ်အထိ လမ်းလျှောက်ရင် ၁၀ မိနစ်ကြာပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u2"
  },
  {
    "id": "g-n5-011",
    "pattern": "〜てください",
    "meaning": "Please do (Polite Request)",
    "structure": "[Verb Te-form] + ください",
    "explanation": "Used to make a polite request or ask someone to perform an action.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "ここに名前を書いてください。",
        "reading": "ここに なまえを かいてください。",
        "en": "Please write your name here.",
        "highlight": "書いてください",
        "translationsByLang": {
          "en": "Please write your name here.",
          "ja": "ここに名前を書いてください。",
          "my": "ဒီမှာ နာမည်ရေးပေးပါ။"
        }
      },
      {
        "jp": "ゆっくり話してください。",
        "reading": "ゆっくり はなしてください。",
        "en": "Please speak slowly.",
        "highlight": "話してください",
        "translationsByLang": {
          "en": "Please speak slowly.",
          "ja": "ゆっくり話してください。",
          "my": "ဖြည်းဖြည်းပြောပေးပါ။"
        }
      }
    ],
    "unitId": "n5-u3"
  },
  {
    "id": "g-n5-012",
    "pattern": "〜てはいけません",
    "meaning": "Must not do (Prohibition)",
    "structure": "[Verb Te-form] + はいけません",
    "explanation": "Expresses a strict rule or prohibition: \"You must not do X\".",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "ここでタバコを吸ってはいけません。",
        "reading": "ここで タバコを すってはいけません。",
        "en": "You must not smoke here.",
        "highlight": "吸ってはいけません",
        "translationsByLang": {
          "en": "You must not smoke here.",
          "ja": "ここでタバコを吸ってはいけません。",
          "my": "ဒီနေရာမှာ ဆေးလိပ်မသောက်ရပါ။"
        }
      },
      {
        "jp": "試験中に話してはいけません。",
        "reading": "しけんちゅうに はなしてはいけません。",
        "en": "You must not talk during the exam.",
        "highlight": "話してはいけません",
        "translationsByLang": {
          "en": "You must not talk during the exam.",
          "ja": "試験中に話してはいけません。",
          "my": "စာမေးပွဲဖြေဆိုနေစဉ် စကားမပြောရပါ။"
        }
      }
    ],
    "unitId": "n5-u3"
  },
  {
    "id": "g-n5-013",
    "pattern": "〜てもいいです",
    "meaning": "May do / Allowed to (Permission)",
    "structure": "[Verb Te-form] + もいいです",
    "explanation": "Used to grant or ask for permission to do an action.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "ここに座ってもいいですか？",
        "reading": "ここに すわっても いいですか？",
        "en": "May I sit here?",
        "highlight": "座ってもいいですか",
        "translationsByLang": {
          "en": "May I sit here?",
          "ja": "ここに座ってもいいですか？",
          "my": "ဒီမှာ ထိုင်လို့ရပါသလားခင်ဗျာ။"
        }
      },
      {
        "jp": "写真を撮ってもいいです。",
        "reading": "しゃしんを とっても いいです。",
        "en": "You may take photos.",
        "highlight": "撮ってもいいです",
        "translationsByLang": {
          "en": "You may take photos.",
          "ja": "写真を撮ってもいいです。",
          "my": "ဓာတ်ပုံရိုက်လို့ ရပါသည်ခင်ဗျာ။"
        }
      }
    ],
    "unitId": "n5-u3"
  },
  {
    "id": "g-n5-014",
    "pattern": "〜なければならない",
    "meaning": "Must do / Have to do (Obligation)",
    "structure": "[Verb Nai-stem] + なければならない / ければなりません",
    "explanation": "Expresses an absolute necessity or obligation that cannot be avoided.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "明日、早く起きなければなりません。",
        "reading": "あした、はやく おきなければなりません。",
        "en": "I have to wake up early tomorrow.",
        "highlight": "起きなければなりません",
        "translationsByLang": {
          "en": "I have to wake up early tomorrow.",
          "ja": "明日、早く起きなければなりません。",
          "my": "မနက်ဖြန် စောစောထရပါမယ်။"
        }
      },
      {
        "jp": "薬を毎日飲まなければなりません。",
        "reading": "くすりを まいにち のまなければなりません。",
        "en": "I must take medicine every day.",
        "highlight": "飲まなければなりません",
        "translationsByLang": {
          "en": "I must take medicine every day.",
          "ja": "薬を毎日飲まなければなりません。",
          "my": "ဆေးကို နေ့တိုင်း သောက်ရပါမယ်။"
        }
      }
    ],
    "unitId": "n5-u3"
  },
  {
    "id": "g-n5-015",
    "pattern": "〜なくてもいいです",
    "meaning": "Do not have to do (Lack of Obligation)",
    "structure": "[Verb Nai-stem] + くてもいいです",
    "explanation": "Indicates that an action is not required or optional.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "明日は学校に来なくてもいいです。",
        "reading": "あしたは がっこうに こなくても いいです。",
        "en": "You do not have to come to school tomorrow.",
        "highlight": "来なくてもいいです",
        "translationsByLang": {
          "en": "You do not have to come to school tomorrow.",
          "ja": "明日は学校に来なくてもいいです。",
          "my": "မနက်ဖြန် ကျောင်းမလာလည်း ရပါတယ်။"
        }
      },
      {
        "jp": "靴を脱がなくてもいいです。",
        "reading": "くつを ぬがなくても いいです。",
        "en": "You don’t have to take off your shoes.",
        "highlight": "脱がなくてもいいです",
        "translationsByLang": {
          "en": "You don’t have to take off your shoes.",
          "ja": "靴を脱がなくてもいいです。",
          "my": "ဖိနပ်မချွတ်လည်း ရပါတယ်နော်။"
        }
      }
    ],
    "unitId": "n5-u3"
  },
  {
    "id": "g-n5-016",
    "pattern": "〜たいです / 〜たくないです",
    "meaning": "Want to do / Do not want to (Desire)",
    "structure": "[Verb Masu-stem] + たいです / たくないです",
    "explanation": "Expresses the speaker's direct personal desire to perform an action.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "日本へ旅行に行きたいです。",
        "reading": "にほんへ りょこうに いきたいです。",
        "en": "I want to go on a trip to Japan.",
        "highlight": "行きたいです",
        "translationsByLang": {
          "en": "I want to go on a trip to Japan.",
          "ja": "日本へ旅行に行きたいです。",
          "my": "ဂျပန်နိုင်ငံကို ခရီးသွားချင်ပါတယ်။"
        }
      },
      {
        "jp": "今日は何も食べたくないです。",
        "reading": "きょうは なにも たべたくないです。",
        "en": "I don’t want to eat anything today.",
        "highlight": "食べたくないです",
        "translationsByLang": {
          "en": "I don’t want to eat anything today.",
          "ja": "今日は何も食べたくないです。",
          "my": "ဒီနေ့ ဘာမှမစားချင်ပါဘူး။"
        }
      }
    ],
    "unitId": "n5-u4"
  },
  {
    "id": "g-n5-017",
    "pattern": "〜ています (進行・状態)",
    "meaning": "Is doing (-ing) / Resulting state",
    "structure": "[Verb Te-form] + います",
    "explanation": "Describes an action currently in progress, or an enduring state resulting from a past action.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "今、日本語を勉強しています。",
        "reading": "いま、にほんごを べんきょうしています。",
        "en": "I am studying Japanese right now.",
        "highlight": "勉強しています",
        "translationsByLang": {
          "en": "I am studying Japanese right now.",
          "ja": "今、日本語を勉強しています。",
          "my": "အခု ဂျပန်စာ လေ့လာနေပါတယ်။"
        }
      },
      {
        "jp": "田中さんは結婚しています。",
        "reading": "たなかさんは けっこんしています。",
        "en": "Mr. Tanaka is married (state).",
        "highlight": "結婚しています",
        "translationsByLang": {
          "en": "Mr. Tanaka is married (state).",
          "ja": "田中さんは結婚しています。",
          "my": "တနခဆန်က အိမ်ထောင်ကျပြီးဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u4"
  },
  {
    "id": "g-n5-018",
    "pattern": "〜ましょう / 〜ましょうか",
    "meaning": "Let's do / Shall we? (Invitation & Offer)",
    "structure": "[Verb Masu-stem] + ましょう / ましょうか",
    "explanation": "Proposes an activity to do together, or offers assistance politely.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "一緒にお茶を飲みましょう。",
        "reading": "いっしょに おちゃを のみましょう。",
        "en": "Let’s drink tea together.",
        "highlight": "飲みましょう",
        "translationsByLang": {
          "en": "Let’s drink tea together.",
          "ja": "一緒にお茶を飲みましょう。",
          "my": "အတူတူ လက်ဖက်ရည်သောက်ကြရအောင်။"
        }
      },
      {
        "jp": "荷物を持ちましょうか？",
        "reading": "にもつを もちましょうか？",
        "en": "Shall I carry your luggage?",
        "highlight": "持ちましょうか",
        "translationsByLang": {
          "en": "Shall I carry your luggage?",
          "ja": "荷物を持ちましょうか？",
          "my": "အိတ်ကူသယ်ပေးရမလားခင်ဗျာ။"
        }
      }
    ],
    "unitId": "n5-u4"
  },
  {
    "id": "g-n5-019",
    "pattern": "〜まえに (前に)",
    "meaning": "Before doing",
    "structure": "[Verb Dict-form / Noun + の] + 前に",
    "explanation": "Specifies an action or event that occurs prior to another action.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "寝る前に本を読みます。",
        "reading": "ねる まえに ほんを よみます。",
        "en": "I read books before going to sleep.",
        "highlight": "寝る前に",
        "translationsByLang": {
          "en": "I read books before going to sleep.",
          "ja": "寝る前に本を読みます。",
          "my": "မအိပ်ခင် စာအုပ်ဖတ်ပါတယ်။"
        }
      },
      {
        "jp": "食事の前に手を洗います。",
        "reading": "しょくじの まえに てを あらいます。",
        "en": "I wash my hands before meals.",
        "highlight": "食事の前に",
        "translationsByLang": {
          "en": "I wash my hands before meals.",
          "ja": "食事の前に手を洗います。",
          "my": "ထမင်းမစားခင် လက်ဆေးပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u4"
  },
  {
    "id": "g-n5-020",
    "pattern": "〜あとで (後で)",
    "meaning": "After doing",
    "structure": "[Verb Ta-form / Noun + の] + 後で",
    "explanation": "Specifies an action that takes place after completing another action.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "ご飯を食べた後で散歩します。",
        "reading": "ごはんを たべた あとで さんぽします。",
        "en": "I take a walk after eating a meal.",
        "highlight": "食べた後で",
        "translationsByLang": {
          "en": "I take a walk after eating a meal.",
          "ja": "ご飯を食べた後で散歩します。",
          "my": "ထမင်းစားပြီးနောက် လမ်းလျှောက်ပါတယ်။"
        }
      },
      {
        "jp": "仕事の後で映画を見ました。",
        "reading": "しごとの あとで えいがを みました。",
        "en": "I watched a movie after work.",
        "highlight": "仕事の後で",
        "translationsByLang": {
          "en": "I watched a movie after work.",
          "ja": "仕事の後で映画を見ました。",
          "my": "အလုပ်ပြီးမှ ရုပ်ရှင်ကြည့်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u4"
  },
  {
    "id": "g-n5-021",
    "pattern": "〜から (理由)",
    "meaning": "Because / Since (Reason)",
    "structure": "[Clause Plain/Polite] + から、[Main Clause]",
    "explanation": "Provides the subjective reason or cause for a subsequent conclusion or action.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "雨が降っていますから、傘を持って行きます。",
        "reading": "あめが ふっていますから、かさを もって いきます。",
        "en": "Because it is raining, I will take an umbrella.",
        "highlight": "から",
        "translationsByLang": {
          "en": "Because it is raining, I will take an umbrella.",
          "ja": "雨が降っていますから、傘を持って行きます。",
          "my": "မိုးရွာနေတာမို့လို့ ထီးယူသွားပါမယ်။"
        }
      },
      {
        "jp": "時間がありませんから、タクシーに乗りましょう。",
        "reading": "じかんが ありませんから、タクシーに のりましょう。",
        "en": "Since we have no time, let’s take a taxi.",
        "highlight": "から",
        "translationsByLang": {
          "en": "Since we have no time, let’s take a taxi.",
          "ja": "時間がありませんから、タクシーに乗りましょう。",
          "my": "အချိန်မရှိတော့တာမို့လို့ တက္ကစီစီးကြရအောင်။"
        }
      }
    ],
    "unitId": "n5-u5"
  },
  {
    "id": "g-n5-022",
    "pattern": "〜たり〜たりする",
    "meaning": "Doing things like A and B (Representative actions)",
    "structure": "[Verb 1 Ta-form] + り + [Verb 2 Ta-form] + り + します",
    "explanation": "Lists representative non-exhaustive actions among many activities.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "休日は映画を見たり買い物をしたりします。",
        "reading": "きゅうじつは えいがを みたり かいものを したりします。",
        "en": "On days off, I do things like watch movies and shop.",
        "highlight": "〜たり〜たりします",
        "translationsByLang": {
          "en": "On days off, I do things like watch movies and shop.",
          "ja": "休日は映画を見たり買い物をしたりします。",
          "my": "အားလပ်ရက်မှာ ရုပ်ရှင်ကြည့်လိုက်၊ ဈေးဝယ်လိုက် လုပ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u5"
  },
  {
    "id": "g-n5-023",
    "pattern": "〜ないでください",
    "meaning": "Please do not do (Negative request)",
    "structure": "[Verb Nai-form] + でください",
    "explanation": "Politely requests someone to refrain from an action.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "ここにゴミを捨てないでください。",
        "reading": "ここに ゴミを すてないでください。",
        "en": "Please do not throw trash here.",
        "highlight": "捨てないでください",
        "translationsByLang": {
          "en": "Please do not throw trash here.",
          "ja": "ここにゴミを捨てないでください。",
          "my": "ဒီမှာ အမှိုက်မပစ်ပါနှင့်။"
        }
      }
    ],
    "unitId": "n5-u5"
  },
  {
    "id": "g-n5-024",
    "pattern": "〜より〜のほうが (比較)",
    "meaning": "A is more ~ than B (Comparison)",
    "structure": "[Noun A] + のほうが + [Noun B] + より + [Adj] + です",
    "explanation": "Compares two items and states that A possesses more of a quality than B.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "電車より新幹線のほうが速いです。",
        "reading": "でんしゃより しんかんせんの ほうが はやいです。",
        "en": "The Shinkansen is faster than local trains.",
        "highlight": "〜より〜のほうが",
        "translationsByLang": {
          "en": "The Shinkansen is faster than local trains.",
          "ja": "電車より新幹線のほうが速いです。",
          "my": "ရထားထက် ကျည်ဆန်ရထားက ပိုမြန်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u5"
  },
  {
    "id": "g-n5-025",
    "pattern": "〜の中で〜が一番 (最上級)",
    "meaning": "Among ~, A is the most (Superlative)",
    "structure": "[Group] + の中で + [Noun] + が一番 + [Adj] + です",
    "explanation": "Identifies the supreme or top item among three or more options.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "果物の中でりんごが一番好きです。",
        "reading": "くだものの なかで りんごが いちばん すきです。",
        "en": "Among fruits, I like apples the best.",
        "highlight": "の中で〜が一番",
        "translationsByLang": {
          "en": "Among fruits, I like apples the best.",
          "ja": "果物の中でりんごが一番好きです。",
          "my": "သစ်သီးတွေထဲမှာ ပန်းသီးကို အကြိုက်ဆုံးဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u5"
  },
  {
    "id": "g-n5-026",
    "pattern": "〜つもりです",
    "meaning": "Plan to / Intend to",
    "structure": "[Verb Dict-form / Nai-form] + つもりです",
    "explanation": "States the speaker's definite plan or predetermined intention.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "来年大学に進学するつもりです。",
        "reading": "らいねん だいがくに しんがくする つもりです。",
        "en": "I plan to go on to university next year.",
        "highlight": "進学するつもりです",
        "translationsByLang": {
          "en": "I plan to go on to university next year.",
          "ja": "来年大学に進学するつもりです。",
          "my": "လာမည့်နှစ် တက္ကသိုလ်တက်ရောက်ဖို့ ရည်ရွယ်ထားပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u6"
  },
  {
    "id": "g-n5-027",
    "pattern": "〜ながら",
    "meaning": "While doing (Simultaneous action)",
    "structure": "[Verb Masu-stem] + ながら + [Main Verb]",
    "explanation": "Performs two actions simultaneously, where the second action is primary.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "音楽を聴きながら散歩します。",
        "reading": "おんがくを ききながら さんぽします。",
        "en": "I take a walk while listening to music.",
        "highlight": "聴きながら",
        "translationsByLang": {
          "en": "I take a walk while listening to music.",
          "ja": "音楽を聴きながら散歩します。",
          "my": "သီချင်းနားထောင်ရင်း လမ်းလျှောက်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u6"
  },
  {
    "id": "g-n5-028",
    "pattern": "〜ことがあります",
    "meaning": "There are times when / Occasionally",
    "structure": "[Verb Dict-form / Nai-form] + ことがあります",
    "explanation": "Expresses that a certain action or event occasionally happens.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "たまに朝ご飯を食べないことがあります。",
        "reading": "たまに あさごはんを たべない ことが あります。",
        "en": "Occasionally there are times when I don’t eat breakfast.",
        "highlight": "食べないことがあります",
        "translationsByLang": {
          "en": "Occasionally there are times when I don’t eat breakfast.",
          "ja": "たまに朝ご飯を食べないことがあります。",
          "my": "တစ်ခါတရံ မနက်စာမစားတဲ့ အခါတွေရှိပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u6"
  },
  {
    "id": "g-n5-029",
    "pattern": "〜が好きです / 嫌いです",
    "meaning": "Like / Dislike",
    "structure": "[Noun] + が好きです / 嫌いです",
    "explanation": "Expresses emotional preferences toward items or activities.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "私は日本料理が好きです。",
        "reading": "わたしは にほんりょうりが すきです。",
        "en": "I like Japanese food.",
        "highlight": "が好きです",
        "translationsByLang": {
          "en": "I like Japanese food.",
          "ja": "私は日本料理が好きです。",
          "my": "ကျွန်တော်က ဂျပန်အစားအစာကို ကြိုက်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u6"
  },
  {
    "id": "g-n5-030",
    "pattern": "〜が上手です / 下手です",
    "meaning": "Good at / Bad at",
    "structure": "[Noun] + が上手です / 下手です",
    "explanation": "Describes proficiency or lack of skill in an activity.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "田中さんはテニスが上手です。",
        "reading": "たなかさんは テニスが じょうずです。",
        "en": "Mr. Tanaka is good at tennis.",
        "highlight": "が上手です",
        "translationsByLang": {
          "en": "Mr. Tanaka is good at tennis.",
          "ja": "田中さんはテニスが上手です。",
          "my": "တနခဆန်က တင်းနစ်ကစားတာ တော်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u6"
  },
  {
    "id": "g-n5-031",
    "pattern": "〜があります / います",
    "meaning": "There is / exists (Inanimate & Animate)",
    "structure": "[Place] + に + [Noun] + があります / います",
    "explanation": "Indicates the physical existence or presence of things (あります) or living beings (います).",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "机の上に本があります。",
        "reading": "つくえの うえに ほんが あります。",
        "en": "There is a book on the desk.",
        "highlight": "があります",
        "translationsByLang": {
          "en": "There is a book on the desk.",
          "ja": "机の上に本があります。",
          "my": "စားပွဲပေါ်မှာ စာအုပ်ရှိပါတယ်။"
        }
      },
      {
        "jp": "庭に猫がいます。",
        "reading": "にわに ねこが います。",
        "en": "There is a cat in the garden.",
        "highlight": "がいます",
        "translationsByLang": {
          "en": "There is a cat in the garden.",
          "ja": "庭に猫がいます。",
          "my": "ခြံထဲမှာ ကြောင်ရှိပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u7"
  },
  {
    "id": "g-n5-032",
    "pattern": "〜に (目的: 〜に行く)",
    "meaning": "Go in order to do (Purpose of movement)",
    "structure": "[Verb Masu-stem / Noun] + に + 行きます / 来ます",
    "explanation": "States the specific objective or purpose of a journey or movement.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "デパートへ服を買いに行きます。",
        "reading": "デパートへ ふくを かいに いきます。",
        "en": "I go to the department store to buy clothes.",
        "highlight": "買いに行きます",
        "translationsByLang": {
          "en": "I go to the department store to buy clothes.",
          "ja": "デパートへ服を買いに行きます。",
          "my": "ကုန်တိုက်ကို အဝတ်အစားသွားဝယ်ပါမယ်။"
        }
      }
    ],
    "unitId": "n5-u7"
  },
  {
    "id": "g-n5-033",
    "pattern": "〜でしょう / 〜だろう",
    "meaning": "Probably / Right? (Conjecture)",
    "structure": "[Plain Form] + でしょう / だろう",
    "explanation": "Expresses reasonable probability or seeks confirmation from the listener.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "明日はいい天気になるでしょう。",
        "reading": "あしたは いいてんきに なるでしょう。",
        "en": "It will probably be good weather tomorrow.",
        "highlight": "なるでしょう",
        "translationsByLang": {
          "en": "It will probably be good weather tomorrow.",
          "ja": "明日はいい天気になるでしょう。",
          "my": "မနက်ဖြန် ရာသီဥတု ကောင်းမွန်မည့်ပုံပါပဲ။"
        }
      }
    ],
    "unitId": "n5-u7"
  },
  {
    "id": "g-n5-034",
    "pattern": "〜すぎる",
    "meaning": "Too much / Excessive",
    "structure": "[Verb Stem / Adj Stem] + すぎる / すぎます",
    "explanation": "Indicates that an action or quality exceeds normal or desirable limits.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 2,
    "examples": [
      {
        "jp": "夕べお酒を飲みすぎました。",
        "reading": "ゆうべ おさけを のみすぎました。",
        "en": "I drank too much alcohol last night.",
        "highlight": "飲みすぎました",
        "translationsByLang": {
          "en": "I drank too much alcohol last night.",
          "ja": "夕べお酒を飲みすぎました。",
          "my": "မနေ့ညက အရက်သောက်လွန်းသွားပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u7"
  },
  {
    "id": "g-n5-035",
    "pattern": "〜とおもう (と思う)",
    "meaning": "I think that (Opinion & Supposition)",
    "structure": "[Sentence Plain-form] + と思います",
    "explanation": "Expresses the speaker's personal viewpoint, opinion, or conjecture.",
    "formalLevel": "polite",
    "level": "N5",
    "difficulty": 1,
    "examples": [
      {
        "jp": "明日は雨が降ると思います。",
        "reading": "あしたは あめが ふると おもいます。",
        "en": "I think it will rain tomorrow.",
        "highlight": "降ると思います",
        "translationsByLang": {
          "en": "I think it will rain tomorrow.",
          "ja": "明日は雨が降ると思います。",
          "my": "မနက်ဖြန် မိုးရွာမယ်လို့ ထင်ပါတယ်။"
        }
      }
    ],
    "unitId": "n5-u7"
  },
  {
    "id": "g-n4-001",
    "pattern": "〜はずだ",
    "meaning": "Expected to / Bound to be / Should be",
    "structure": "[Verb/Adj Plain form / Na-adj + な / Noun + の] + はずだ / はずです",
    "explanation": "Expresses a strong objective expectation based on facts, evidence, or schedule.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "彼は今日来るはずです。約束しましたから。",
        "reading": "かれは きょう くるはずです。やくそくしましたから。",
        "en": "He should come today; because he promised.",
        "highlight": "来るはずです",
        "translationsByLang": {
          "en": "He should come today; because he promised.",
          "ja": "彼は今日来るはずです。約束しましたから。",
          "my": "သူ ဒီနေ့ လာမှာဖြစ်ပါတယ်။ ကတိပေးထားလို့ပါ။"
        }
      },
      {
        "jp": "田中さんは昨日東京に戻ったはずだ。",
        "reading": "たなかさんは きのう とうきょうに もどったはずだ。",
        "en": "Mr. Tanaka is expected to have returned to Tokyo yesterday.",
        "highlight": "戻ったはずだ",
        "translationsByLang": {
          "en": "Mr. Tanaka is expected to have returned to Tokyo yesterday.",
          "ja": "田中さんは昨日東京に戻ったはずだ。",
          "my": "တနခဆန် မနေ့က တိုကျိုကို ပြန်ရောက်သင့်ပြီဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u1"
  },
  {
    "id": "g-n4-002",
    "pattern": "〜ことができる / 〜られる (可能形)",
    "meaning": "Can do / Able to do (Potential)",
    "structure": "[Verb Dict-form] + ことができる / [Verb Potential Form]",
    "explanation": "Indicates the capability or permission to perform an action.",
    "formalLevel": "polite",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "日本語の新聞を読むことができます。",
        "reading": "にほんごの しんぶんを よむことが できます。",
        "en": "I can read Japanese newspapers.",
        "highlight": "読むことができます",
        "translationsByLang": {
          "en": "I can read Japanese newspapers.",
          "ja": "日本語の新聞を読むことができます。",
          "my": "ဂျပန်သတင်းစာကို ဖတ်နိုင်ပါတယ်။"
        }
      },
      {
        "jp": "刺身が食べられます。",
        "reading": "さしみが たべられます。",
        "en": "I can eat sashimi.",
        "highlight": "食べられます",
        "translationsByLang": {
          "en": "I can eat sashimi.",
          "ja": "刺身が食べられます。",
          "my": "ငါးစိမ်းဟင်းလျာကို စားနိုင်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u1"
  },
  {
    "id": "g-n4-003",
    "pattern": "〜たことがある",
    "meaning": "Have done before (Past Experience)",
    "structure": "[Verb Ta-form] + ことがある / ことがあります",
    "explanation": "Expresses that the speaker has had the historical experience of doing an action.",
    "formalLevel": "polite",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "富士山に登ったことがあります。",
        "reading": "ふじさんに のぼった ことが あります。",
        "en": "I have climbed Mount Fuji before.",
        "highlight": "登ったことがあります",
        "translationsByLang": {
          "en": "I have climbed Mount Fuji before.",
          "ja": "富士山に登ったことがあります。",
          "my": "ဖူဂျီတောင်ကို တက်ဖူးပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u1"
  },
  {
    "id": "g-n4-004",
    "pattern": "〜やすい / 〜にくい",
    "meaning": "Easy to do / Difficult to do",
    "structure": "[Verb Masu-stem] + やすい / にくい",
    "explanation": "Describes how simple or challenging it is to perform a task.",
    "formalLevel": "polite",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "このペンはとても書きやすいです。",
        "reading": "この ペンは とても かきやすいです。",
        "en": "This pen is very easy to write with.",
        "highlight": "書きやすい",
        "translationsByLang": {
          "en": "This pen is very easy to write with.",
          "ja": "このペンはとても書きやすいです。",
          "my": "ဒီဘောပင်က ရေးရတာ အရမ်းလွယ်ပါတယ်။"
        }
      },
      {
        "jp": "この町は道が狭くて運転しにくいです。",
        "reading": "この まちは みちが せまくて うんてんしにくいです。",
        "en": "The streets in this town are narrow and hard to drive in.",
        "highlight": "運転しにくい",
        "translationsByLang": {
          "en": "The streets in this town are narrow and hard to drive in.",
          "ja": "この町は道が狭くて運転しにくいです。",
          "my": "ဒီမြို့က လမ်းကျဉ်းလို့ ကားမောင်းရခက်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u1"
  },
  {
    "id": "g-n4-005",
    "pattern": "〜てしまう",
    "meaning": "To end up doing / Regret / Complete",
    "structure": "[Verb Te-form] + しまう / しまいました",
    "explanation": "Expresses full completion or an unintended action accompanied by regret.",
    "formalLevel": "polite",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "大切な宿題を家に忘れてしまいました。",
        "reading": "たいせつな しゅくだいを いえに わすれてしまいました。",
        "en": "I accidentally forgot my important homework at home.",
        "highlight": "忘れてしまいました",
        "translationsByLang": {
          "en": "I accidentally forgot my important homework at home.",
          "ja": "大切な宿題を家に忘れてしまいました。",
          "my": "အရေးကြီးတဲ့ အိမ်စာကို အိမ်မှာ မေ့ကျန်ခဲ့ပါပြီ။"
        }
      },
      {
        "jp": "一日でこの本を全部読んでしまいました。",
        "reading": "いちにちで この ほんを ぜんぶ よんでしまいました。",
        "en": "I finished reading this entire book in a single day.",
        "highlight": "読んでしまいました",
        "translationsByLang": {
          "en": "I finished reading this entire book in a single day.",
          "ja": "一日でこの本を全部読んでしまいました。",
          "my": "တစ်ရက်တည်းနဲ့ ဒီစာအုပ်တစ်အုပ်လုံးကို အကုန်ဖတ်ပစ်လိုက်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u1"
  },
  {
    "id": "g-n4-006",
    "pattern": "〜し〜し",
    "meaning": "And what's more / Because and because",
    "structure": "[Plain form] + し、[Plain form] + し",
    "explanation": "Lists multiple reasons, traits, or facts that lead to a natural conclusion.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "この店は美味しいし、値段も安いし、最高です。",
        "reading": "この みせは おいしいし、ねだんも やすいし、さいこうです。",
        "en": "This restaurant is delicious, the prices are cheap, and it’s the best.",
        "highlight": "〜し〜し",
        "translationsByLang": {
          "en": "This restaurant is delicious, the prices are cheap, and it’s the best.",
          "ja": "この店は美味しいし、値段も安いし、最高です。",
          "my": "ဒီဆိုင်က အရသာလည်းရှိ၊ ဈေးလည်းသက်သာလို့ အကောင်းဆုံးပါပဲ။"
        }
      }
    ],
    "unitId": "n4-u2"
  },
  {
    "id": "g-n4-007",
    "pattern": "〜そうだ (様態)",
    "meaning": "Looks like / Appears to be (Visual impression)",
    "structure": "[Verb Masu-stem / Adj stem] + そうだ / そうです",
    "explanation": "Expresses a conjecture or visual impression based on immediate appearance.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "今にも雨が降りそうです。",
        "reading": "いまにも あめが ふりそうです。",
        "en": "It looks like it’s about to rain any minute.",
        "highlight": "降りそう",
        "translationsByLang": {
          "en": "It looks like it’s about to rain any minute.",
          "ja": "今にも雨が降りそうです。",
          "my": "အခုပဲ မိုးရွာချတော့မယ့်ပုံပါပဲ။"
        }
      },
      {
        "jp": "このケーキはとても美味しそうです。",
        "reading": "この ケーキは とても おいしそうです。",
        "en": "This cake looks very delicious.",
        "highlight": "美味しそう",
        "translationsByLang": {
          "en": "This cake looks very delicious.",
          "ja": "このケーキはとても美味しそうです。",
          "my": "ဒီကိတ်မုန့်က အရမ်းအရသာရှိမယ့်ပုံ ပေါက်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u2"
  },
  {
    "id": "g-n4-008",
    "pattern": "〜そうだ (伝聞)",
    "meaning": "I heard that... (Hearsay)",
    "structure": "[Sentence Plain-form] + そうだ / そうです",
    "explanation": "Reports information, news, or hearsay learned from an external source.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "天気予報によると、明日は晴れるそうです。",
        "reading": "てんきよほうに よると、あしたは はれるそうです。",
        "en": "According to the weather forecast, I heard it will be sunny tomorrow.",
        "highlight": "晴れるそうです",
        "translationsByLang": {
          "en": "According to the weather forecast, I heard it will be sunny tomorrow.",
          "ja": "天気予報によると、明日は晴れるそうです。",
          "my": "မိုးလေဝသခန့်မှန်းချက်အရ မနက်ဖြန် သာယာမယ်လို့ ကြားသိရပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u2"
  },
  {
    "id": "g-n4-009",
    "pattern": "〜ようだ",
    "meaning": "Seems like / Appears that (Inference)",
    "structure": "[Plain form / Na-adj + な / Noun + の] + ようだ",
    "explanation": "Expresses an inference based on the speaker’s sensory perception or judgment.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "外は風が強くて寒いようです。",
        "reading": "そとは かぜが つよくて さむいようです。",
        "en": "It seems the wind is strong and cold outside.",
        "highlight": "寒いよう",
        "translationsByLang": {
          "en": "It seems the wind is strong and cold outside.",
          "ja": "外は風が強くて寒いようです。",
          "my": "အပြင်မှာ လေတိုက်ကြမ်းပြီး ချမ်းမယ့်ပုံရပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u2"
  },
  {
    "id": "g-n4-010",
    "pattern": "〜らしい",
    "meaning": "Seems like / Rumored that",
    "structure": "[Plain form / Noun] + らしい",
    "explanation": "Expresses conjecture based on reliable hearsay or typical characteristic behavior.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "田中さんは新しい車を買ったらしいです。",
        "reading": "たなかさんは あたらしい くるまを かったらしいです。",
        "en": "It seems Mr. Tanaka bought a new car.",
        "highlight": "買ったらしい",
        "translationsByLang": {
          "en": "It seems Mr. Tanaka bought a new car.",
          "ja": "田中さんは新しい車を買ったらしいです。",
          "my": "တနခဆန် ကားအသစ်ဝယ်လိုက်တယ်လို့ ကြားရပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u2"
  },
  {
    "id": "g-n4-011",
    "pattern": "〜かもしれない",
    "meaning": "Might / May happen (Possibility)",
    "structure": "[Plain form / Noun / Na-adj stem] + かもしれない",
    "explanation": "Indicates a possibility (around 50% or less) that something may be true.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "午後は雨が降るかもしれません。",
        "reading": "ごごは あめが ふるかもしれません。",
        "en": "It might rain in the afternoon.",
        "highlight": "降るかもしれません",
        "translationsByLang": {
          "en": "It might rain in the afternoon.",
          "ja": "午後は雨が降るかもしれません。",
          "my": "မွန်းလွဲပိုင်းမှာ မိုးရွာကောင်း ရွာနိုင်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u3"
  },
  {
    "id": "g-n4-012",
    "pattern": "〜ために (目的・原因)",
    "meaning": "In order to / Because of",
    "structure": "[Verb Dict-form / Noun + の] + ために",
    "explanation": "Indicates a clear purposeful objective, or an objective cause/reason.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "日本で働くために毎日日本語を勉強します。",
        "reading": "にほんで はたらく ために まいにち にほんごを べんきょうします。",
        "en": "I study Japanese every day in order to work in Japan.",
        "highlight": "働くために",
        "translationsByLang": {
          "en": "I study Japanese every day in order to work in Japan.",
          "ja": "日本で働くために毎日日本語を勉強します。",
          "my": "ဂျပန်မှာ အလုပ်လုပ်ဖို့အတွက် နေ့တိုင်း ဂျပန်စာ လေ့လာပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u3"
  },
  {
    "id": "g-n4-013",
    "pattern": "〜ように (目的)",
    "meaning": "So that / In order that",
    "structure": "[Verb Non-volitional / Nai-form] + ように",
    "explanation": "Indicates a desired target state or result to be achieved.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "風邪を引かないように暖かい服を着ます。",
        "reading": "かぜを ひかない ように あたたかい ふくを きます。",
        "en": "I wear warm clothes so that I don’t catch a cold.",
        "highlight": "引かないように",
        "translationsByLang": {
          "en": "I wear warm clothes so that I don’t catch a cold.",
          "ja": "風邪を引かないように暖かい服を着ます。",
          "my": "အအေးမမိစေရန် အနွေးထည် ဝတ်ဆင်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u3"
  },
  {
    "id": "g-n4-014",
    "pattern": "〜ば (条件形)",
    "meaning": "If / Provided that (Conditional)",
    "structure": "[Verb Ba-form / Adj-form + ければ]",
    "explanation": "Expresses a general, logical, or hypothetical condition.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "安ければ買います。",
        "reading": "やすければ かいます。",
        "en": "If it is cheap, I will buy it.",
        "highlight": "安ければ",
        "translationsByLang": {
          "en": "If it is cheap, I will buy it.",
          "ja": "安ければ買います。",
          "my": "ဈေးပေါရင် ဝယ်ပါမယ်။"
        }
      },
      {
        "jp": "雨が降らなければ公園に行きましょう。",
        "reading": "あめが ふらなければ こうえんに いきましょう。",
        "en": "If it doesn’t rain, let’s go to the park.",
        "highlight": "降らなければ",
        "translationsByLang": {
          "en": "If it doesn’t rain, let’s go to the park.",
          "ja": "雨が降らなければ公園に行きましょう。",
          "my": "မိုးမရွာရင် ပန်းခြံသွားကြရအောင်။"
        }
      }
    ],
    "unitId": "n4-u3"
  },
  {
    "id": "g-n4-015",
    "pattern": "〜たら",
    "meaning": "If / When (Past Conditional)",
    "structure": "[Verb Ta-form / Adj Ta-form] + ら",
    "explanation": "Expresses a condition or temporal trigger: \"once X happens, Y follows\".",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "駅に着いたら電話してください。",
        "reading": "えきに ついたら でんわして ください。",
        "en": "Please call me when you arrive at the station.",
        "highlight": "着いたら",
        "translationsByLang": {
          "en": "Please call me when you arrive at the station.",
          "ja": "駅に着いたら電話してください。",
          "my": "ဘူတာရောက်ရင် ဖုန်းဆက်ပေးပါ။"
        }
      }
    ],
    "unitId": "n4-u3"
  },
  {
    "id": "g-n4-016",
    "pattern": "〜なら",
    "meaning": "If it is the case that / As for",
    "structure": "[Noun / Plain form] + なら",
    "explanation": "Gives advice, opinion, or condition based on context provided by the other person.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "日本料理なら寿司が一番好きです。",
        "reading": "にほんりょうりなら すしが いちばん すきです。",
        "en": "If it’s Japanese food, I like sushi the most.",
        "highlight": "料理なら",
        "translationsByLang": {
          "en": "If it’s Japanese food, I like sushi the most.",
          "ja": "日本料理なら寿司が一番好きです。",
          "my": "ဂျပန်အစားအစာဆိုရင် ဆူရှီကို အကြိုက်ဆုံးပါပဲ။"
        }
      }
    ],
    "unitId": "n4-u4"
  },
  {
    "id": "g-n4-017",
    "pattern": "〜ても / 〜でも",
    "meaning": "Even if / Even though",
    "structure": "[Verb Te-form / Adj Te-form] + も",
    "explanation": "Expresses a concessive condition: an unexpected outcome persists despite the condition.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "雨が降っても試合は中止になりません。",
        "reading": "あめが ふっても しあいは ちゅうしに なりません。",
        "en": "Even if it rains, the game will not be canceled.",
        "highlight": "降っても",
        "translationsByLang": {
          "en": "Even if it rains, the game will not be canceled.",
          "ja": "雨が降っても試合は中止になりません。",
          "my": "မိုးရွာရင်တောင် ပွဲစဉ် ပျက်ပြယ်မည် မဟုတ်ပါ။"
        }
      }
    ],
    "unitId": "n4-u4"
  },
  {
    "id": "g-n4-018",
    "pattern": "〜られる (受身)",
    "meaning": "Passive voice (To be done by)",
    "structure": "[Verb Passive Form]",
    "explanation": "Used when the subject receives an action, often conveying adversity or public events.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "先生に褒められて嬉しかったです。",
        "reading": "せんせいに ほめられて うれしかったです。",
        "en": "I was praised by the teacher and felt happy.",
        "highlight": "褒められて",
        "translationsByLang": {
          "en": "I was praised by the teacher and felt happy.",
          "ja": "先生に褒められて嬉しかったです。",
          "my": "ဆရာ့ရဲ့ ချီးကျူးတာခံရလို့ ဝမ်းသာခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u4"
  },
  {
    "id": "g-n4-019",
    "pattern": "〜させる (使役)",
    "meaning": "Causative voice (Make / Let do)",
    "structure": "[Verb Causative Form]",
    "explanation": "Indicates making or permitting someone to do an action.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 3,
    "examples": [
      {
        "jp": "先生は子供たちに本を読ませました。",
        "reading": "せんせいは こどもたちに ほんを よませました。",
        "en": "The teacher made the children read books.",
        "highlight": "読ませました",
        "translationsByLang": {
          "en": "The teacher made the children read books.",
          "ja": "先生は子供たちに本を読ませました。",
          "my": "ဆရာက ကလေးတွေကို စာအုပ်ဖတ်ခိုင်းခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u4"
  },
  {
    "id": "g-n4-020",
    "pattern": "〜させられる (使役受身)",
    "meaning": "Causative-Passive (Forced to do)",
    "structure": "[Verb Causative-Passive Form]",
    "explanation": "Expresses being forced or compelled to do something against one's own wishes.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 3,
    "examples": [
      {
        "jp": "子供の頃、苦手な野菜を食べさせられました。",
        "reading": "こどもの ころ、にがてな やさいを たべさせられました。",
        "en": "When I was a child, I was forced to eat vegetables I disliked.",
        "highlight": "食べさせられました",
        "translationsByLang": {
          "en": "When I was a child, I was forced to eat vegetables I disliked.",
          "ja": "子供の頃、苦手な野菜を食べさせられました。",
          "my": "ကလေးဘဝတုန်းက မကြိုက်တဲ့ ဟင်းသီးဟင်းရွက်တွေကို အတင်းအကျပ် စားခိုင်းခြင်း ခံခဲ့ရပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u4"
  },
  {
    "id": "g-n4-021",
    "pattern": "〜てあげる / 〜てやる",
    "meaning": "Do a favor for someone",
    "structure": "[Verb Te-form] + あげる",
    "explanation": "Expresses performing a helpful action for another person.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "友達の荷物を持ってあげました。",
        "reading": "ともだちの にもつを もってあげました。",
        "en": "I carried my friend’s luggage for them.",
        "highlight": "持ってあげました",
        "translationsByLang": {
          "en": "I carried my friend’s luggage for them.",
          "ja": "友達の荷物を持ってあげました。",
          "my": "သူငယ်ချင်းရဲ့ အထုပ်ကို ကူသယ်ပေးခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u5"
  },
  {
    "id": "g-n4-022",
    "pattern": "〜てもらう / 〜ていただく",
    "meaning": "Receive a favor of doing",
    "structure": "[Verb Te-form] + もらう / いただく",
    "explanation": "Expresses having an action performed for the speaker by someone else.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "先生に作文を直してもらいました。",
        "reading": "せんせいに さくぶんを なおしてもらいました。",
        "en": "I had my essay corrected by the teacher.",
        "highlight": "直してもらいました",
        "translationsByLang": {
          "en": "I had my essay corrected by the teacher.",
          "ja": "先生に作文を直してもらいました。",
          "my": "ဆရာ့ဆီက အက်ဆေးပြင်ပေးတာကို ခံယူခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u5"
  },
  {
    "id": "g-n4-023",
    "pattern": "〜てくれる / 〜てくださる",
    "meaning": "Someone does a favor for me",
    "structure": "[Verb Te-form] + くれる / くださる",
    "explanation": "Expresses that someone kindly performs an action for the speaker’s benefit.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "友達が駅まで車で送ってくれました。",
        "reading": "ともだちが えきまで くるまで おくってくれました。",
        "en": "My friend kindly drove me to the station.",
        "highlight": "送ってくれました",
        "translationsByLang": {
          "en": "My friend kindly drove me to the station.",
          "ja": "友達が駅まで車で送ってくれました。",
          "my": "သူငယ်ချင်းက ဘူတာအထိ ကားနဲ့ လိုက်ပို့ပေးခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u5"
  },
  {
    "id": "g-n4-024",
    "pattern": "〜ていく / 〜てくる",
    "meaning": "Continue into future / Started up to now",
    "structure": "[Verb Te-form] + いく / くる",
    "explanation": "Describes movement away/toward, or chronological continuation into the future / from the past.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "これからも日本語を勉強していきたいです。",
        "reading": "これからも にほんごを べんきょうして いきたいです。",
        "en": "I want to continue studying Japanese into the future.",
        "highlight": "勉強していきたい",
        "translationsByLang": {
          "en": "I want to continue studying Japanese into the future.",
          "ja": "これからも日本語を勉強していきたいです。",
          "my": "နောင်လည်း ဂျပန်စာကို ဆက်လက်လေ့လာသွားချင်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u5"
  },
  {
    "id": "g-n4-025",
    "pattern": "〜かた (方)",
    "meaning": "How to do / Way of doing",
    "structure": "[Verb Masu-stem] + 方 (かた)",
    "explanation": "Forms a noun describing the manner or procedure of performing an action.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "この漢字の読み方を教えてください。",
        "reading": "この かんじの よみかたを おしえて ください。",
        "en": "Please teach me how to read this kanji.",
        "highlight": "読み方",
        "translationsByLang": {
          "en": "Please teach me how to read this kanji.",
          "ja": "この漢字の読み方を教えてください。",
          "my": "ဒီခန်ဂျီရဲ့ အသံထွက်ဖတ်နည်းကို သင်ပေးပါ။"
        }
      }
    ],
    "unitId": "n4-u5"
  },
  {
    "id": "g-n4-026",
    "pattern": "〜たほうがいい / 〜ないほうがいい",
    "meaning": "Had better do / Had better not (Advice)",
    "structure": "[Verb Ta-form / Nai-form] + ほうがいい",
    "explanation": "Used to give straightforward personal advice or recommendations.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "病院へ行ったほうがいいですよ。",
        "reading": "びょういんへ いった ほうが いいですよ。",
        "en": "You had better go to the hospital.",
        "highlight": "行ったほうがいい",
        "translationsByLang": {
          "en": "You had better go to the hospital.",
          "ja": "病院へ行ったほうがいいですよ。",
          "my": "ဆေးရုံသွားတာ ပိုကောင်းပါတယ်နော်။"
        }
      }
    ],
    "unitId": "n4-u6"
  },
  {
    "id": "g-n4-027",
    "pattern": "〜くなる / 〜になる",
    "meaning": "Become / Change of state",
    "structure": "[I-adj stem] + くなる / [Na-adj/Noun] + になる",
    "explanation": "Describes a natural transition into a new state or condition.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "だんだん暖かくなってきました。",
        "reading": "だんだん あたたかくなって きました。",
        "en": "It has gradually become warmer.",
        "highlight": "暖かくなって",
        "translationsByLang": {
          "en": "It has gradually become warmer.",
          "ja": "だんだん暖かくなってきました。",
          "my": "တဖြည်းဖြည်း နွေးထွေးလာခဲ့ပါပြီ။"
        }
      }
    ],
    "unitId": "n4-u6"
  },
  {
    "id": "g-n4-028",
    "pattern": "〜ようにする",
    "meaning": "Make an effort to / Try to do as habit",
    "structure": "[Verb Dict-form / Nai-form] + ようにする",
    "explanation": "Expresses conscious, repeated effort to build a habit.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "毎日野菜をたくさん食べるようにしています。",
        "reading": "まいにち やさいを たくさん たべる ように しています。",
        "en": "I make an effort to eat plenty of vegetables every day.",
        "highlight": "食べるようにしています",
        "translationsByLang": {
          "en": "I make an effort to eat plenty of vegetables every day.",
          "ja": "毎日野菜をたくさん食べるようにしています。",
          "my": "နေ့တိုင်း ဟင်းသီးဟင်းရွက်တွေ အများကြီးစားဖို့ အလေ့အကျင့်လုပ်နေပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u6"
  },
  {
    "id": "g-n4-029",
    "pattern": "〜ようとする",
    "meaning": "Try to / Be about to do",
    "structure": "[Verb Volitional form] + とする",
    "explanation": "Indicates an attempt or being on the verge of performing an action.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "出かけようとした時、電話が鳴りました。",
        "reading": "でかけようと した とき、でんわが なりました。",
        "en": "Just as I was about to go out, the phone rang.",
        "highlight": "出かけようとした",
        "translationsByLang": {
          "en": "Just as I was about to go out, the phone rang.",
          "ja": "出かけようとした時、電話が鳴りました。",
          "my": "အပြင်ထွက်ခါနီးဆဲဆဲမှာ ဖုန်းမြည်လာခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u6"
  },
  {
    "id": "g-n4-030",
    "pattern": "〜かどうか",
    "meaning": "Whether or not",
    "structure": "[Plain form] + かどうか",
    "explanation": "Embeds an indirect yes/no question into a larger sentence.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "明日雨が降るかどうか分かりません。",
        "reading": "あした あめが ふるかどうか わかりません。",
        "en": "I don’t know whether it will rain tomorrow or not.",
        "highlight": "降るかどうか",
        "translationsByLang": {
          "en": "I don’t know whether it will rain tomorrow or not.",
          "ja": "明日雨が降るかどうか分かりません。",
          "my": "မနက်ဖြန် မိုးရွာမလား မရွာဘူးလား မသိပါဘူး။"
        }
      }
    ],
    "unitId": "n4-u6"
  },
  {
    "id": "g-n4-031",
    "pattern": "〜か (間接疑問)",
    "meaning": "Embedded question (Who/what/where)",
    "structure": "[Question word + Plain form] + か",
    "explanation": "Embeds an interrogative inquiry into a main clause.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "彼がどこに住んでいるか知っていますか？",
        "reading": "かれが どこに すんでいるか しっていますか？",
        "en": "Do you know where he lives?",
        "highlight": "住んでいるか",
        "translationsByLang": {
          "en": "Do you know where he lives?",
          "ja": "彼がどこに住んでいるか知っていますか？",
          "my": "သူ ဘယ်မှာနေလဲ သိပါသလား။"
        }
      }
    ],
    "unitId": "n4-u7"
  },
  {
    "id": "g-n4-032",
    "pattern": "〜てみる",
    "meaning": "Try doing to see what happens",
    "structure": "[Verb Te-form] + みる",
    "explanation": "Indicates performing an experiment or trying an action to discover the outcome.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "日本の納豆を食べてみました。",
        "reading": "にほんの なっとうを たべてみました。",
        "en": "I tried eating Japanese natto.",
        "highlight": "食べてみました",
        "translationsByLang": {
          "en": "I tried eating Japanese natto.",
          "ja": "日本の納豆を食べてみました。",
          "my": "ဂျပန်ပဲပုပ် နတ်တိုးကို စားစမ်းကြည့်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u7"
  },
  {
    "id": "g-n4-033",
    "pattern": "〜ておく",
    "meaning": "Do in advance / Leave in state",
    "structure": "[Verb Te-form] + おく",
    "explanation": "Completes a preparation beforehand, or deliberately maintains a current state.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "旅行の前にホテルを予約しておきます。",
        "reading": "りょこうの まえに ホテルを よやくして おきます。",
        "en": "I will book a hotel in advance before the trip.",
        "highlight": "予約しておきます",
        "translationsByLang": {
          "en": "I will book a hotel in advance before the trip.",
          "ja": "旅行の前にホテルを予約しておきます。",
          "my": "ခရီးမသွားမီ ဟိုတယ်ကို ကြိုတင်ဘိုကင်လုပ်ထားပါမယ်။"
        }
      }
    ],
    "unitId": "n4-u7"
  },
  {
    "id": "g-n4-034",
    "pattern": "〜敬語 (尊敬語: お〜になる)",
    "meaning": "Honorific speech (Respect for other's actions)",
    "structure": "お + [Verb Masu-stem] + になる",
    "explanation": "Expresses high respect when speaking about the actions of superiors or guests.",
    "formalLevel": "formal",
    "level": "N4",
    "difficulty": 3,
    "examples": [
      {
        "jp": "先生はもうお帰りになりました。",
        "reading": "せんせいは もう おかえりに なりました。",
        "en": "The teacher has already returned home.",
        "highlight": "お帰りになりました",
        "translationsByLang": {
          "en": "The teacher has already returned home.",
          "ja": "先生はもうお帰りになりました。",
          "my": "ဆရာ ပြန်ကြွသွားပါပြီ။"
        }
      }
    ],
    "unitId": "n4-u7"
  },
  {
    "id": "g-n4-035",
    "pattern": "〜敬語 (謙譲語: お〜する)",
    "meaning": "Humble speech (Humbling own actions)",
    "structure": "お + [Verb Masu-stem] + する / いたす",
    "explanation": "Humbles the speaker's own action to show respect to the recipient.",
    "formalLevel": "humble",
    "level": "N4",
    "difficulty": 3,
    "examples": [
      {
        "jp": "私が荷物をお持ちします。",
        "reading": "わたしが にもつを おもちします。",
        "en": "I will carry your luggage.",
        "highlight": "お持ちします",
        "translationsByLang": {
          "en": "I will carry your luggage.",
          "ja": "私が荷物をお持ちします。",
          "my": "ကျွန်တော် အထုပ်ကို သယ်ပေးပါရစေခင်ဗျာ။"
        }
      }
    ],
    "unitId": "n4-u7"
  },
  {
    "id": "g-n4-036",
    "pattern": "〜ば〜ほど",
    "meaning": "The more ~, the more ~",
    "structure": "[Verb Ba-form] + [Verb Dict-form] + ほど",
    "explanation": "Indicates that as one condition intensifies, another outcome increases proportionally.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 3,
    "examples": [
      {
        "jp": "日本語は勉強すればするほど面白くなります。",
        "reading": "にほんごは べんきょうすれば するほど おもしろくなります。",
        "en": "The more you study Japanese, the more interesting it becomes.",
        "highlight": "勉強すればするほど",
        "translationsByLang": {
          "en": "The more you study Japanese, the more interesting it becomes.",
          "ja": "日本語は勉強すればするほど面白くなります。",
          "my": "ဂျပန်စာက လေ့လာလေလေ ပိုစိတ်ဝင်စားဖို့ကောင်းလေလေ ဖြစ်လာပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u8"
  },
  {
    "id": "g-n4-037",
    "pattern": "〜がる / 〜がっている",
    "meaning": "Shows signs of / Seems to feel (Third person)",
    "structure": "[Adj Stem] + がる / がっている",
    "explanation": "Describes the observable feelings, desires, or emotions of a third person.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "妹は暗い場所を怖がります。",
        "reading": "いもうとは くらい ばしょを こわがります。",
        "en": "My younger sister acts scared of dark places.",
        "highlight": "怖がります",
        "translationsByLang": {
          "en": "My younger sister acts scared of dark places.",
          "ja": "妹は暗い場所を怖がります。",
          "my": "ညီမလေးက အမှောင်နေရာတွေကို ကြောက်တတ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u8"
  },
  {
    "id": "g-n4-038",
    "pattern": "〜とおもう (意向形+と思う)",
    "meaning": "Thinking of doing (Intention)",
    "structure": "[Verb Volitional form] + と思う",
    "explanation": "Expresses an intention or plan that the speaker is currently considering.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "今週末は家でゆっくり休もうと思います。",
        "reading": "こんしゅうまつは いえで ゆっくり やすもうと おもいます。",
        "en": "I think I will rest quietly at home this weekend.",
        "highlight": "休もうと思います",
        "translationsByLang": {
          "en": "I think I will rest quietly at home this weekend.",
          "ja": "今週末は家でゆっくり休もうと思います。",
          "my": "ဒီတစ်ပတ်ပိတ်ရက်မှာ အိမ်မှာ သက်တောင့်သက်သာ နားဖို့ စိတ်ကူးထားပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u8"
  },
  {
    "id": "g-n4-039",
    "pattern": "〜だけでなく",
    "meaning": "Not only ~ but also",
    "structure": "[Plain form / Noun] + だけでなく",
    "explanation": "Indicates that something applies not only to one item, but extends further.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "英語だけでなく日本語も話せます。",
        "reading": "えいごだけでなく にほんごも はなせます。",
        "en": "I can speak not only English but also Japanese.",
        "highlight": "だけでなく",
        "translationsByLang": {
          "en": "I can speak not only English but also Japanese.",
          "ja": "英語だけでなく日本語も話せます。",
          "my": "အင်္ဂလိပ်စာတင်မကဘဲ ဂျပန်စာလည်း ပြောနိုင်ပါတယ်။"
        }
      }
    ],
    "unitId": "n4-u8"
  },
  {
    "id": "g-n4-040",
    "pattern": "〜までに (期限)",
    "meaning": "By (Time limit / Deadline)",
    "structure": "[Verb Dict-form / Time/Noun] + までに",
    "explanation": "Specifies the deadline or time limit before which an action must be completed.",
    "formalLevel": "standard",
    "level": "N4",
    "difficulty": 2,
    "examples": [
      {
        "jp": "金曜日までにレポートを出してください。",
        "reading": "きんようびまでに レポートを だして ください。",
        "en": "Please submit the report by Friday.",
        "highlight": "までに",
        "translationsByLang": {
          "en": "Please submit the report by Friday.",
          "ja": "金曜日までにレポートを出してください。",
          "my": "သောကြာနေ့ နောက်ဆုံးထားပြီး အစီရင်ခံစာ တင်ပြပေးပါ။"
        }
      },
      {
        "jp": "五時までにここに戻ります。",
        "reading": "ごじまでに ここに もどります。",
        "en": "I will return here by 5 o'clock.",
        "highlight": "までに",
        "translationsByLang": {
          "en": "I will return here by 5 o'clock.",
          "ja": "五時までにここに戻ります。",
          "my": "၅ နာရီမတိုင်မီ ဒီနေရာကို ပြန်လာပါမယ်။"
        }
      }
    ],
    "unitId": "n4-u8"
  },
  {
    "id": "g-n3-001",
    "pattern": "〜はずがない",
    "meaning": "There is no way / Cannot possibly be",
    "structure": "[Plain form / Na-adj + な / Noun + の] + はずがない / はずがありません",
    "explanation": "Expresses strong, reasoned conviction that something is completely impossible or improbable.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "彼がそんな嘘をつくはずがありません。",
        "reading": "かれが そんな うそを つくはずが ありません。",
        "en": "There is no way that he would tell such a lie.",
        "highlight": "はずがありません",
        "translationsByLang": {
          "en": "There is no way that he would tell such a lie.",
          "ja": "彼がそんな嘘をつくはずがありません。",
          "my": "သူ အဲဒီလို လိမ်ညာမှုမျိုး ပြောဖို့ လုံးဝမဖြစ်နိုင်ပါဘူး။"
        }
      },
      {
        "jp": "真面目な田中さんが約束を忘れるはずがない。",
        "reading": "まじめな たなかさんが やくそくを わすれるはずがない。",
        "en": "There is no way diligent Mr. Tanaka would forget a promise.",
        "highlight": "忘れるはずがない",
        "translationsByLang": {
          "en": "There is no way diligent Mr. Tanaka would forget a promise.",
          "ja": "真面目な田中さんが約束を忘れるはずがない。",
          "my": "ရိုးသားကြိုးစားတဲ့ တနခဆန်က ကတိမေ့သွားဖို့ ဘယ်လိုမှ မဖြစ်နိုင်ပါဘူး။"
        }
      }
    ],
    "unitId": "n3-u1"
  },
  {
    "id": "g-n3-002",
    "pattern": "〜はずだった",
    "meaning": "Was supposed to / Expected to have happened",
    "structure": "[Plain form / Na-adj + な / Noun + の] + はずだった",
    "explanation": "Indicates that something was scheduled or expected to happen, but reality turned out differently.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "会議は午後二時に始まるはずだったが、延期された。",
        "reading": "かいぎは ごご にじに はじまるはずだったが、えんきされた。",
        "en": "The meeting was supposed to start at 2:00 PM, but it was postponed.",
        "highlight": "始まるはずだった",
        "translationsByLang": {
          "en": "The meeting was supposed to start at 2:00 PM, but it was postponed.",
          "ja": "会議は午後二時に始まるはずだったが、延期された。",
          "my": "အစည်းအဝေးက နေ့လယ် ၂ နာရီမှာ စတင်ရမှာ ဖြစ်ပေမယ့် ရွှေ့ဆိုင်းလိုက်ပါတယ်။"
        }
      },
      {
        "jp": "昨日荷物が届くはずだったのに、まだ届いていません。",
        "reading": "きのう にもつが とどくはずだったのに、まだ とどいていません。",
        "en": "The parcel was supposed to arrive yesterday, but it hasn't arrived yet.",
        "highlight": "届くはずだった",
        "translationsByLang": {
          "en": "The parcel was supposed to arrive yesterday, but it hasn't arrived yet.",
          "ja": "昨日荷物が届くはずだったのに、まだ届いていません。",
          "my": "မနေ့က ပါဆယ်ရောက်ရမှာဖြစ်ပေမယ့် အခုထိ မရောက်သေးပါဘူး။"
        }
      }
    ],
    "unitId": "n3-u1"
  },
  {
    "id": "g-n3-003",
    "pattern": "〜わけだ",
    "meaning": "That is why / Naturally / No wonder (Logical conclusion)",
    "structure": "[Plain form / Na-adj + な / Noun + な] + わけだ",
    "explanation": "Expresses understanding that a situation is a natural, logical consequence based on given facts.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "東京は家賃が高い。生活費がかかるわけだ。",
        "reading": "とうきょうは やちんが たかい。せいかつひが かかるわけだ。",
        "en": "Rent in Tokyo is high. No wonder living costs are expensive.",
        "highlight": "かかるわけだ",
        "translationsByLang": {
          "en": "Rent in Tokyo is high. No wonder living costs are expensive.",
          "ja": "東京は家賃が高い。生活費がかかるわけだ。",
          "my": "တိုကျိုက အိမ်ငှားခကြီးတယ်၊ ဒါကြောင့်မို့ နေထိုင်စရိတ် ကုန်ကျတာပေါ့။"
        }
      },
      {
        "jp": "彼は日本に十年住んでいる。だから日本語が上手なわけだ。",
        "reading": "かれは にほんに じゅうねん すんでいる。だから にほんごが じょうずなわけだ。",
        "en": "He lived in Japan for 10 years. That is why his Japanese is so fluent.",
        "highlight": "上手なわけだ",
        "translationsByLang": {
          "en": "He lived in Japan for 10 years. That is why his Japanese is so fluent.",
          "ja": "彼は日本に十年住んでいる。だから日本語が上手なわけだ。",
          "my": "သူက ဂျပန်မှာ ၁၀ နှစ်နေခဲ့တယ်၊ ဒါကြောင့် ဂျပန်စာ တော်တာ သဘာဝကျတာပေါ့။"
        }
      }
    ],
    "unitId": "n3-u1"
  },
  {
    "id": "g-n3-004",
    "pattern": "〜わけがない",
    "meaning": "There is no reason why / Definitely impossible",
    "structure": "[Plain form / Na-adj + な / Noun + の] + わけがない",
    "explanation": "Denies a possibility with absolute confidence, emphasizing that logical justification is absent.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "こんな難しい問題、子供に解けるわけがない。",
        "reading": "こんな むずかしい もんだい、こどもに とけるわけがない。",
        "en": "There is no way a child could solve such a difficult problem.",
        "highlight": "解けるわけがない",
        "translationsByLang": {
          "en": "There is no way a child could solve such a difficult problem.",
          "ja": "こんな難しい問題、子供に解けるわけがない。",
          "my": "ဒီလောက်ခက်တဲ့ပုစ္ဆာ ကလေးတစ်ယောက် ဖြေရှင်းနိုင်ဖို့ ဘယ်လိုမှ မဖြစ်နိုင်ပါဘူး။"
        }
      },
      {
        "jp": "あんなに練習したのだから、負けるわけがない。",
        "reading": "あんなに れんしゅうしたのだから、まけるわけがない。",
        "en": "Having practiced that much, there is no way we will lose.",
        "highlight": "負けるわけがない",
        "translationsByLang": {
          "en": "Having practiced that much, there is no way we will lose.",
          "ja": "あんなに練習したのだから、負けるわけがない。",
          "my": "အဲဒီလောက် လေ့ကျင့်ထားတာမို့ ရှုံးနိမ့်ဖို့ အကြောင်းမရှိပါဘူး။"
        }
      }
    ],
    "unitId": "n3-u1"
  },
  {
    "id": "g-n3-005",
    "pattern": "〜わけではない",
    "meaning": "It doesn't mean that / Not necessarily",
    "structure": "[Plain form / Na-adj + な / Noun + な] + わけではない",
    "explanation": "Softens a statement by denying that an extreme or total assumption is necessarily true.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "日本料理が嫌いなわけではありませんが、辛い物が苦手です。",
        "reading": "にほんりょうりが きらいなわけではありませんが、からいものが にがてです。",
        "en": "It is not that I dislike Japanese food, but I am weak with spicy foods.",
        "highlight": "嫌いなわけではありません",
        "translationsByLang": {
          "en": "It is not that I dislike Japanese food, but I am weak with spicy foods.",
          "ja": "日本料理が嫌いなわけではありませんが、辛い物が苦手です。",
          "my": "ဂျပန်အစားအစာ မကြိုက်တာမျိုးတော့ မဟုတ်ပါဘူး၊ စပ်တဲ့အစားအစာ မစားနိုင်တာပါ။"
        }
      },
      {
        "jp": "お金があれば幸せになれるというわけではない。",
        "reading": "おかねが あれば しあわせに なれるという わけではない。",
        "en": "Having money does not necessarily mean one becomes happy.",
        "highlight": "わけではない",
        "translationsByLang": {
          "en": "Having money does not necessarily mean one becomes happy.",
          "ja": "お金があれば幸せになれるというわけではない。",
          "my": "ပိုက်ဆံရှိတိုင်း ပျော်ရွှင်နိုင်မယ်လို့တော့ မဟုတ်ပါဘူး။"
        }
      }
    ],
    "unitId": "n3-u1"
  },
  {
    "id": "g-n3-006",
    "pattern": "〜わけにはいかない",
    "meaning": "Cannot afford to do / Socially or morally impossible",
    "structure": "[Verb Dict-form] + わけにはいかない",
    "explanation": "Expresses that one cannot do something due to social rules, moral obligations, or conscience.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "大切な試験の前だから、風邪を引いて休むわけにはいかない。",
        "reading": "たいせつな しけんの まえだから、かぜを ひいて やすむわけにはいかない。",
        "en": "Because an important exam is coming, I cannot afford to catch a cold and rest.",
        "highlight": "休むわけにはいかない",
        "translationsByLang": {
          "en": "Because an important exam is coming, I cannot afford to catch a cold and rest.",
          "ja": "大切な試験の前だから、風邪を引いて休むわけにはいかない。",
          "my": "အရေးကြီးတဲ့ စာမေးပွဲမတိုင်မီမို့ အအေးမိပြီး အနားယူဖို့ မဖြစ်နိုင်ပါဘူး။"
        }
      },
      {
        "jp": "同僚の秘密を他の人に話すわけにはいきません。",
        "reading": "どうりょうの ひみつを ほかのひとに はなすわけにはいきません。",
        "en": "I cannot talk about my colleague's secret to others.",
        "highlight": "話すわけにはいきません",
        "translationsByLang": {
          "en": "I cannot talk about my colleague's secret to others.",
          "ja": "同僚の秘密を他の人に話すわけにはいきません。",
          "my": "လုပ်ဖော်ကိုင်ဖက်ရဲ့ လျှို့ဝှက်ချက်ကို အခြားသူထံ ပြောပြဖို့ မဖြစ်နိုင်ပါဘူး။"
        }
      }
    ],
    "unitId": "n3-u2"
  },
  {
    "id": "g-n3-007",
    "pattern": "〜に対して (にたいして)",
    "meaning": "In contrast to / Towards / In response to",
    "structure": "[Noun] + に対して / に対する + [Noun]",
    "explanation": "Contrasts two opposing entities, or marks the target towards which an attitude or action is directed.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "兄は活発な性格であるのに対して、弟は物静かだ。",
        "reading": "あには かっぱつな せいかくであるのに たいして、おとうとは ものしずかだ。",
        "en": "In contrast to my elder brother's outgoing personality, my younger brother is quiet.",
        "highlight": "に対して",
        "translationsByLang": {
          "en": "In contrast to my elder brother's outgoing personality, my younger brother is quiet.",
          "ja": "兄は活発な性格であるのに対して、弟は物静かだ。",
          "my": "အစ်ကိုက တက်ကြွတဲ့ စရိုက်ရှိတာနဲ့ ဆန့်ကျင်ပြီး ညီက အေးဆေးတည်ငြိမ်ပါတယ်။"
        }
      },
      {
        "jp": "お客様に対して丁寧な言葉遣いを心がけてください。",
        "reading": "おきゃくさまに たいして ていねいな ことばづかいを こころがけて ください。",
        "en": "Please make sure to use polite language toward customers.",
        "highlight": "お客様に対して",
        "translationsByLang": {
          "en": "Please make sure to use polite language toward customers.",
          "ja": "お客様に対して丁寧な言葉遣いを心がけてください。",
          "my": "ဖောက်သည်များအပေါ် ယဉ်ကျေးတဲ့ အသုံးအနှုန်း သုံးစွဲရန် သတိပြုပေးပါ။"
        }
      }
    ],
    "unitId": "n3-u2"
  },
  {
    "id": "g-n3-008",
    "pattern": "〜において / における",
    "meaning": "At / In / On the occasion of (Formal location/field)",
    "structure": "[Noun (Place/Era/Domain)] + において / における + [Noun]",
    "explanation": "Formal equivalent of で; indicates the setting, era, field of research, or conference context.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "近代文学における夏目漱石の影響について論じる。",
        "reading": "きんだいぶんがくに おける なつめそうせきの えいきょうについて ろんじる。",
        "en": "I will discuss Natsume Soseki's influence in modern literature.",
        "highlight": "における",
        "translationsByLang": {
          "en": "I will discuss Natsume Soseki's influence in modern literature.",
          "ja": "近代文学における夏目漱石の影響について論じる。",
          "my": "ခေတ်သစ်စာပေနယ်ပယ်၌ နဆုမဲ ဆိုဆဲခိ၏ လွှမ်းမိုးမှုအကြောင်း ဆွေးနွေးတင်ပြပါမည်။"
        }
      },
      {
        "jp": "オリンピックは東京において盛大に開催された。",
        "reading": "オリンピックは とうきょうに おいて せいだいに かいさいされた。",
        "en": "The Olympics were magnificently held in Tokyo.",
        "highlight": "東京において",
        "translationsByLang": {
          "en": "The Olympics were magnificently held in Tokyo.",
          "ja": "オリンピックは東京において盛大に開催された。",
          "my": "အိုလံပစ်ပွဲတော်ကို တိုကျိုမြို့၌ ခမ်းနားထည်ဝါစွာ ကျင်းပခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u2"
  },
  {
    "id": "g-n3-009",
    "pattern": "〜に関して / に関する",
    "meaning": "Regarding / Concerning / In relation to",
    "structure": "[Noun] + に関して / に関する + [Noun]",
    "explanation": "Formal expression indicating the topic, subject matter, or domain under discussion.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "地球温暖化の対策に関して新しい条約が結ばれた。",
        "reading": "ちきゅうおんだんかの たいさくに かんして あたらしい じょうやくが むすばれた。",
        "en": "A new treaty was signed regarding global warming countermeasures.",
        "highlight": "対策に関して",
        "translationsByLang": {
          "en": "A new treaty was signed regarding global warming countermeasures.",
          "ja": "地球温暖化の対策に関して新しい条約が結ばれた。",
          "my": "ကမ္ဘာကြီးပူနွေးလာမှု တိုက်ဖျက်ရေးနှင့် ပတ်သက်၍ သဘောတူစာချုပ်သစ် ချုပ်ဆိုခဲ့ပါတယ်။"
        }
      },
      {
        "jp": "この問題に関する詳しい資料をお送りします。",
        "reading": "この もんだいに かんする くわしい しりょうを おおくりします。",
        "en": "I will send you detailed materials concerning this problem.",
        "highlight": "に関する",
        "translationsByLang": {
          "en": "I will send you detailed materials concerning this problem.",
          "ja": "この問題に関する詳しい資料をお送りします。",
          "my": "ဒီပြဿနာနဲ့ ပတ်သက်တဲ့ အသေးစိတ် အချက်အလက်တွေကို ပေးပို့ပါမယ်။"
        }
      }
    ],
    "unitId": "n3-u2"
  },
  {
    "id": "g-n3-010",
    "pattern": "〜について / についての",
    "meaning": "About / On the topic of",
    "structure": "[Noun] + について / についての + [Noun]",
    "explanation": "Identifies the thematic content or subject matter of speaking, writing, thinking, or research.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "日本の伝統文化についてレポートを書きました。",
        "reading": "にほんの でんとうぶんかに ついて レポートを かきました。",
        "en": "I wrote a report about Japanese traditional culture.",
        "highlight": "について",
        "translationsByLang": {
          "en": "I wrote a report about Japanese traditional culture.",
          "ja": "日本の伝統文化についてレポートを書きました。",
          "my": "ဂျပန်ရိုးရာယဉ်ကျေးမှုအကြောင်း အစီရင်ခံစာ ရေးသားခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u2"
  },
  {
    "id": "g-n3-011",
    "pattern": "〜によって / による",
    "meaning": "By means of / Due to / Depending on / By (agent)",
    "structure": "[Noun] + によって / による + [Noun]",
    "explanation": "Expresses cause/reason, means/method, variations depending on context, or agent of passive actions.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "台風によって多くの木が倒れました。",
        "reading": "たいふうに よって おおくの きが たおれました。",
        "en": "Many trees fell down due to the typhoon.",
        "highlight": "台風によって",
        "translationsByLang": {
          "en": "Many trees fell down due to the typhoon.",
          "ja": "台風によって多くの木が倒れました。",
          "my": "တိုင်ဖွန်းမုန်တိုင်းကြောင့် သစ်ပင်များစွာ ပြိုလဲခဲ့ပါတယ်။"
        }
      },
      {
        "jp": "国によって習慣や文化が大きく異なります。",
        "reading": "くにに よって しゅうかんや ぶんかが おおきく ことなります。",
        "en": "Customs and cultures differ greatly depending on the country.",
        "highlight": "国によって",
        "translationsByLang": {
          "en": "Customs and cultures differ greatly depending on the country.",
          "ja": "国によって習慣や文化が大きく異なります。",
          "my": "နိုင်ငံအလိုက် ဓလေ့ထုံးတမ်းနဲ့ ယဉ်ကျေးမှုများ အလွန်ကွဲပြားပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u3"
  },
  {
    "id": "g-n3-012",
    "pattern": "〜に違いない",
    "meaning": "Must be / No doubt that / Surely",
    "structure": "[Plain form / Noun / Na-adj stem] + に違いない",
    "explanation": "Expresses speaker's strong subjective conviction based on indirect evidence or intuition.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "明かりがついている。田中さんはまだ会社にいるに違いない。",
        "reading": "あかりが ついている。たなかさんは まだ かいしゃに いるにちがいない。",
        "en": "The lights are on. Mr. Tanaka must still be at the office.",
        "highlight": "いるに違いない",
        "translationsByLang": {
          "en": "The lights are on. Mr. Tanaka must still be at the office.",
          "ja": "明かりがついている。田中さんはまだ会社にいるに違いない。",
          "my": "မီးလင်းနေတယ်၊ တနခဆန် ကုမ္ပဏီမှာ ရှိနေဆဲဖြစ်ရမယ်။"
        }
      },
      {
        "jp": "あの熱心な努力なら、試験に合格するに違いない。",
        "reading": "あの ねっしんな どりょくなら、しけんに ごうかくするにちがいない。",
        "en": "With that dedicated effort, they will surely pass the exam.",
        "highlight": "合格するに違いない",
        "translationsByLang": {
          "en": "With that dedicated effort, they will surely pass the exam.",
          "ja": "あの熱心な努力なら、試験に合格するに違いない。",
          "my": "ထိုမျှလောက် ကြိုးစားအားထုတ်မှုဆိုလျှင် စာမေးပွဲ သေချာပေါက် အောင်မြင်ရမည်။"
        }
      }
    ],
    "unitId": "n3-u3"
  },
  {
    "id": "g-n3-013",
    "pattern": "〜ばかりか / ばかりでなく",
    "meaning": "Not only ~ but even more so / As well as",
    "structure": "[Plain form / Noun / Na-adj + な] + ばかりか",
    "explanation": "Indicates that something is not limited to one point, but surprisingly extends to a greater degree.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "彼は日本語ばかりか、フランス語も堪能だ。",
        "reading": "かれは にほんごばかりか、フランスごも たんのうだ。",
        "en": "Not only is he proficient in Japanese, but also in French.",
        "highlight": "ばかりか",
        "translationsByLang": {
          "en": "Not only is he proficient in Japanese, but also in French.",
          "ja": "彼は日本語ばかりか、フランス語も堪能だ。",
          "my": "သူက ဂျပန်စာတင်မကဘဲ ပြင်သစ်စာပါ ကျွမ်းကျင်ပါတယ်။"
        }
      },
      {
        "jp": "この部屋は狭いばかりでなく、日当たりも非常に悪い。",
        "reading": "この へやは せまいばかりでなく、ひあたりも ひじょうに わるい。",
        "en": "This room is not only cramped, but sunlight is also very poor.",
        "highlight": "ばかりでなく",
        "translationsByLang": {
          "en": "This room is not only cramped, but sunlight is also very poor.",
          "ja": "この部屋は狭いばかりでなく、日当たりも非常に悪い。",
          "my": "ဒီအခန်းက ကျဉ်းရုံသာမက နေရောင်ခြည်လည်း အရမ်းဆိုးပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u3"
  },
  {
    "id": "g-n3-014",
    "pattern": "〜につれて / にしたがって",
    "meaning": "As ~ progresses, ~ changes proportionally",
    "structure": "[Verb Dict-form / Noun] + につれて / にしたがって",
    "explanation": "Expresses that as one condition changes over time, another condition changes simultaneously in proportion.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "標高が高くなるにつれて気温が下がってくる。",
        "reading": "ひょうこうが たかくなるに つれて きおんが さがってくる。",
        "en": "As altitude increases, the temperature decreases.",
        "highlight": "高くなるにつれて",
        "translationsByLang": {
          "en": "As altitude increases, the temperature decreases.",
          "ja": "標高が高くなるにつれて気温が下がってくる。",
          "my": "အမြင့်ပေ မြင့်လာသည်နှင့်အမျှ အပူချိန် ကျဆင်းလာပါတယ်။"
        }
      },
      {
        "jp": "時代の変化にしたがって、人々の価値観も変わる。",
        "reading": "じだいの へんかに したがって、ひとびとの かちかんも かわる。",
        "en": "In accordance with changing times, people's values also transform.",
        "highlight": "変化にしたがって",
        "translationsByLang": {
          "en": "In accordance with changing times, people's values also transform.",
          "ja": "時代の変化にしたがって、人々の価値観も変わる。",
          "my": "ခေတ်ကာလ ပြောင်းလဲလာသည်နှင့်အမျှ လူတို့၏ တန်ဖိုးထားမှုများလည်း ပြောင်းလဲပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u3"
  },
  {
    "id": "g-n3-015",
    "pattern": "〜とおりに (通りに)",
    "meaning": "Exactly according to / Just as",
    "structure": "[Verb Dict/Ta-form / Noun + の] + とおりに / [Noun] + どおりに",
    "explanation": "Expresses carrying out an action precisely in accordance with a plan, instruction, or model.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "説明書に書いてあるとおりに組み立ててください。",
        "reading": "せつめいしょに かいてあるとおりに くみたてて ください。",
        "en": "Please assemble it exactly as written in the manual.",
        "highlight": "書いてあるとおりに",
        "translationsByLang": {
          "en": "Please assemble it exactly as written in the manual.",
          "ja": "説明書に書いてあるとおりに組み立ててください。",
          "my": "လမ်းညွှန်ချက်တွင် ရေးထားသည့်အတိုင်း အတိအကျ တပ်ဆင်ပေးပါ။"
        }
      },
      {
        "jp": "予定どおりに旅行を出発することができました。",
        "reading": "よていどおりに りょこうを しゅっぱつする ことが できました。",
        "en": "We were able to depart on our trip right according to schedule.",
        "highlight": "予定どおりに",
        "translationsByLang": {
          "en": "We were able to depart on our trip right according to schedule.",
          "ja": "予定どおりに旅行を出発することができました。",
          "my": "အစီအစဉ်အတိုင်း ခရီးကို ထွက်ခွာနိုင်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u3"
  },
  {
    "id": "g-n3-016",
    "pattern": "〜たびに",
    "meaning": "Every time / Whenever",
    "structure": "[Verb Dict-form / Noun + の] + たびに",
    "explanation": "Indicates that whenever a certain action or event occurs, the exact same result always follows.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "この曲を聴くたびに、学生時代の思い出が蘇る。",
        "reading": "この きょくを きくたびに、がくせいじだいの おもいでが よみがえる。",
        "en": "Every time I listen to this song, memories of my school days come back.",
        "highlight": "聴くたびに",
        "translationsByLang": {
          "en": "Every time I listen to this song, memories of my school days come back.",
          "ja": "この曲を聴くたびに、学生時代の思い出が蘇る。",
          "my": "ဒီသီချင်းကို နားထောင်တိုင်း ကျောင်းသားဘဝ အမှတ်တရများ ပြန်လည်ပေါ်ပေါက်လာပါတယ်။"
        }
      },
      {
        "jp": "父は出張のたびに、各地のお土産を買ってきてくれる。",
        "reading": "ちちは しゅっちょうの たびに、かくちの おみやげを かってきて くれる。",
        "en": "Whenever my father goes on a business trip, he buys local souvenirs for us.",
        "highlight": "出張のたびに",
        "translationsByLang": {
          "en": "Whenever my father goes on a business trip, he buys local souvenirs for us.",
          "ja": "父は出張のたびに、各地のお土産を買ってきてくれる。",
          "my": "ဖေဖေက ခရီးထွက်တိုင်း ဒေသထွက် လက်ဆောင်ပစ္စည်းများ ဝယ်လာပေးပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u4"
  },
  {
    "id": "g-n3-017",
    "pattern": "〜を中心に / を中心として",
    "meaning": "Centering around / Focused primarily on",
    "structure": "[Noun] + を中心に / を中心として",
    "explanation": "Designates the core focus, central leader, or pivotal point of an activity or organization.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "若手研究者を中心とした研究チームを結成した。",
        "reading": "わかて けんきゅうしゃを ちゅうしんとした けんきゅう チームを けっせいした。",
        "en": "We formed a research team centered on young researchers.",
        "highlight": "を中心とした",
        "translationsByLang": {
          "en": "We formed a research team centered on young researchers.",
          "ja": "若手研究者を中心とした研究チームを結成した。",
          "my": "လူငယ်သုတေသီများကို အဓိကထားသော သုတေသနအဖွဲ့ ဖွဲ့စည်းခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u4"
  },
  {
    "id": "g-n3-018",
    "pattern": "〜おかげで",
    "meaning": "Thanks to / Fortunately because of",
    "structure": "[Plain form / Na-adj + な / Noun + の] + おかげで",
    "explanation": "Expresses gratitude for an assistance, factor, or circumstance that led to a positive outcome.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "先生のご指導のおかげで、無事にN3に合格できました。",
        "reading": "せんせいの ごしどうの おかげで、ぶじに エヌさんに ごうかくできました。",
        "en": "Thanks to the teacher's guidance, I successfully passed N3.",
        "highlight": "おかげで",
        "translationsByLang": {
          "en": "Thanks to the teacher's guidance, I successfully passed N3.",
          "ja": "先生のご指導のおかげで、無事にN3に合格できました。",
          "my": "ဆရာ့ရဲ့ လမ်းညွှန်မှုကျေးဇူးကြောင့် N3 ကို အောင်မြင်စွာ ဖြေဆိုနိုင်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u4"
  },
  {
    "id": "g-n3-019",
    "pattern": "〜せいで / せいか",
    "meaning": "Because of / Blamed on (Negative consequence)",
    "structure": "[Plain form / Na-adj + な / Noun + の] + せいで",
    "explanation": "Attributes a negative outcome, error, or suffering to an explicit cause or person.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "昨夜夜更かししたせいで、今朝寝坊してしまった。",
        "reading": "ゆうべ よふかしした せいで、けさ ねぼうしてしまった。",
        "en": "Because I stayed up late last night, I overslept this morning.",
        "highlight": "したせいで",
        "translationsByLang": {
          "en": "Because I stayed up late last night, I overslept this morning.",
          "ja": "昨夜夜更かししたせいで、今朝寝坊してしまった。",
          "my": "မနေ့ညက အိပ်ရေးပျက်ခဲ့တဲ့အတွက် ဒီမနက် အိပ်ရာထနောက်ကျသွားပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u4"
  },
  {
    "id": "g-n3-020",
    "pattern": "〜たばかり",
    "meaning": "Just finished doing / Just recently did",
    "structure": "[Verb Ta-form] + ばかり",
    "explanation": "Expresses that an action happened very recently in the speaker's subjective perception.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "さっき昼ご飯を食べたばかりなので、お腹がいっぱいです。",
        "reading": "さっき ひるごはんを たべたばかりなので、おなかが いっぱいです。",
        "en": "I just ate lunch a moment ago, so I am full.",
        "highlight": "食べたばかり",
        "translationsByLang": {
          "en": "I just ate lunch a moment ago, so I am full.",
          "ja": "さっき昼ご飯を食べたばかりなので、お腹がいっぱいです。",
          "my": "ခုနလေးတင် နေ့လယ်စာ စားပြီးခါစမို့ ဗိုက်ပြည့်နေပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u4"
  },
  {
    "id": "g-n3-021",
    "pattern": "〜たところ",
    "meaning": "Just did / When I did X, discovered Y",
    "structure": "[Verb Ta-form] + ところ",
    "explanation": "Expresses that upon taking an action, a new discovery or reaction immediately ensued.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "駅前の観光案内所で尋ねたところ、親切に教えてくれた。",
        "reading": "えきまえの かんこうあんないしょで たずねたところ、しんせつに おしえてくれた。",
        "en": "When I inquired at the tourist center in front of the station, they kindly guided me.",
        "highlight": "尋ねたところ",
        "translationsByLang": {
          "en": "When I inquired at the tourist center in front of the station, they kindly guided me.",
          "ja": "駅前の観光案内所で尋ねたところ、親切に教えてくれた。",
          "my": "ဘူတာရှေ့ ခရီးသွားသတင်းပေးဌာနတွင် မေးမြန်းကြည့်ရာ သဘောကောင်းစွာ ရှင်းပြပေးခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u5"
  },
  {
    "id": "g-n3-022",
    "pattern": "〜ところに / 〜ところへ",
    "meaning": "Right at the moment when / In the midst of",
    "structure": "[Verb Dict/Ta/Te-iru form] + ところに / ところへ",
    "explanation": "Indicates an event or interruption occurring precisely at a temporal juncture or situation.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "出かけようとしていたところに、急なお客さんがやって来た。",
        "reading": "でかけようとしていた ところに、きゅうな おきゃくさんが やってきた。",
        "en": "Right as I was about to leave, an unexpected visitor arrived.",
        "highlight": "ところに",
        "translationsByLang": {
          "en": "Right as I was about to leave, an unexpected visitor arrived.",
          "ja": "出かけようとしていたところに、急なお客さんがやって来た。",
          "my": "အပြင်ထွက်ခါနီးဆဲဆဲ အချိန်တွင် ရုတ်တရက် ဧည့်သည် ရောက်ရှိလာခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u5"
  },
  {
    "id": "g-n3-023",
    "pattern": "〜きる (切る) / きれない",
    "meaning": "To do completely / Cannot finish doing",
    "structure": "[Verb Masu-stem] + 切る / 切れない",
    "explanation": "Emphasizes completing an exhaustive action to the very end, or inability to finish due to scale.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "長いマラソンコースを最後まで走り切りました。",
        "reading": "ながい マラソン コースを さいごまで はしりきりました。",
        "en": "I ran the long marathon course completely to the finish line.",
        "highlight": "走り切りました",
        "translationsByLang": {
          "en": "I ran the long marathon course completely to the finish line.",
          "ja": "長いマラソンコースを最後まで走り切りました。",
          "my": "ရှည်လျားသော မာရသွန်လမ်းကြောင်းကို အဆုံးထိ အပြည့်အဝ ပြေးနိုင်ခဲ့ပါတယ်။"
        }
      },
      {
        "jp": "数え切れないほどの星が夜空に輝いている。",
        "reading": "かぞえきれないほどの ほしが よぞらに かがやいている。",
        "en": "Countless stars are shining in the night sky.",
        "highlight": "数え切れない",
        "translationsByLang": {
          "en": "Countless stars are shining in the night sky.",
          "ja": "数え切れないほどの星が夜空に輝いている。",
          "my": "မရေတွက်နိုင်လောက်အောင် များပြားသော ကြယ်များ ညကောင်းကင်တွင် တောက်ပနေပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u5"
  },
  {
    "id": "g-n3-024",
    "pattern": "〜かけ / かける",
    "meaning": "Halfway done / In the middle of doing",
    "structure": "[Verb Masu-stem] + かけ / かける",
    "explanation": "Indicates that an action was begun but left unfinished, or is on the verge of occurring.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "テーブルの上に飲みかけのコーヒーが置いてある。",
        "reading": "テーブルの うえに のみかけの コーヒーが おいてある。",
        "en": "There is a half-drunk cup of coffee left on the table.",
        "highlight": "飲みかけの",
        "translationsByLang": {
          "en": "There is a half-drunk cup of coffee left on the table.",
          "ja": "テーブルの上に飲みかけのコーヒーが置いてある。",
          "my": "စားပွဲပေါ်တွင် သောက်လက်စ ကော်ဖီခွက် တင်ထားလျက်ရှိပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u5"
  },
  {
    "id": "g-n3-025",
    "pattern": "〜っぱなし",
    "meaning": "Left open / Left unattended in an abnormal state",
    "structure": "[Verb Masu-stem] + っぱなし",
    "explanation": "Criticizes leaving an action or object in an ongoing, negligent state without restoring it.",
    "formalLevel": "casual",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "テレビをつけっぱなしにして寝てしまいました。",
        "reading": "テレビを つけっぱなしにして ねてしまいました。",
        "en": "I fell asleep leaving the television running.",
        "highlight": "つけっぱなし",
        "translationsByLang": {
          "en": "I fell asleep leaving the television running.",
          "ja": "テレビをつけっぱなしにして寝てしまいました。",
          "my": "တီဗီဖွင့်ထားလျက်နဲ့ အိပ်ပျော်သွားခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u5"
  },
  {
    "id": "g-n3-026",
    "pattern": "〜だらけ",
    "meaning": "Full of / Covered with (Unpleasant things)",
    "structure": "[Noun] + だらけ",
    "explanation": "Describes an entity covered with or filled with undesirable items (mud, mistakes, trash).",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "急いで書いたので、この作文は間違いだらけです。",
        "reading": "いそいで かいたので、この さくぶんは まちがいだらけです。",
        "en": "Because I wrote it hastily, this essay is riddled with mistakes.",
        "highlight": "間違いだらけ",
        "translationsByLang": {
          "en": "Because I wrote it hastily, this essay is riddled with mistakes.",
          "ja": "急いで書いたので、この作文は間違いだらけです。",
          "my": "အလျင်စလို ရေးခဲ့တာမို့ ဒီအက်ဆေးက အမှားတွေချည်း ပြည့်နေပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u6"
  },
  {
    "id": "g-n3-027",
    "pattern": "〜ぎみ (気味)",
    "meaning": "A slight touch of / Tendency to feel",
    "structure": "[Verb Masu-stem / Noun] + 気味 (ぎみ)",
    "explanation": "Describes a slight, creeping sensation or tendency towards an unfavorable physical/mental state.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "風邪気味なので、今夜は早く寝ることにします。",
        "reading": "かぜぎみなので、こんやは はやく ねることに します。",
        "en": "Because I have a slight touch of a cold, I will go to bed early tonight.",
        "highlight": "風邪気味",
        "translationsByLang": {
          "en": "Because I have a slight touch of a cold, I will go to bed early tonight.",
          "ja": "風邪気味なので、今夜は早く寝ることにします。",
          "my": "အအေးမိချင်သလို ဖြစ်နေတာမို့ ဒီညတော့ စောစောအိပ်ပါမယ်။"
        }
      }
    ],
    "unitId": "n3-u6"
  },
  {
    "id": "g-n3-028",
    "pattern": "〜がち",
    "meaning": "Prone to / Frequently tends to",
    "structure": "[Verb Masu-stem / Noun] + がち",
    "explanation": "Describes a chronic or recurring habit/tendency that often happens inadvertently.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "冬場は運動不足になりがちなので気をつけましょう。",
        "reading": "ふゆばは うんどうぶそくに なりがちなので きをつけましょう。",
        "en": "In winter we tend to lack exercise, so let's be mindful.",
        "highlight": "なりがち",
        "translationsByLang": {
          "en": "In winter we tend to lack exercise, so let's be mindful.",
          "ja": "冬場は運動不足になりがちなので気をつけましょう。",
          "my": "ဆောင်းရာသီတွင် ကိုယ်လက်လှုပ်ရှားမှု နည်းပါးတတ်သဖြင့် သတိပြုကြပါစို့။"
        }
      }
    ],
    "unitId": "n3-u6"
  },
  {
    "id": "g-n3-029",
    "pattern": "〜っぽい",
    "meaning": "Appearing like / -ish / Prone to being",
    "structure": "[Noun / Verb Masu-stem / Adj stem] + っぽい",
    "explanation": "Conveys that something exudes the feel, tone, or tendency of something else.",
    "formalLevel": "casual",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "彼は子供っぽくて、すぐに怒ってしまいます。",
        "reading": "かれは こどもっぽくて、すぐに おこってしまいます。",
        "en": "He is childish and quickly gets angry.",
        "highlight": "子供っぽくて",
        "translationsByLang": {
          "en": "He is childish and quickly gets angry.",
          "ja": "彼は子供っぽくて、すぐに怒ってしまいます。",
          "my": "သူက ကလေးဆန်ပြီး ချက်ချင်း စိတ်ဆိုးလွယ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u6"
  },
  {
    "id": "g-n3-030",
    "pattern": "〜ふりをする",
    "meaning": "Pretend to / Feign doing",
    "structure": "[Plain form / Na-adj + な / Noun + の] + ふりをする",
    "explanation": "Describes feigning an attitude or acting as though something is true when it is not.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "本当は知っているのに、知らないふりをした。",
        "reading": "ほんとうは しっているのに、しらないふりを した。",
        "en": "Even though I actually knew, I pretended not to know.",
        "highlight": "知らないふりをした",
        "translationsByLang": {
          "en": "Even though I actually knew, I pretended not to know.",
          "ja": "本当は知っているのに、知らないふりをした。",
          "my": "တကယ်တော့ သိနေပါလျက်နဲ့ မသိသလို ဟန်ဆောင်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u6"
  },
  {
    "id": "g-n3-031",
    "pattern": "〜わりに (割に)",
    "meaning": "Considering that / Unexpectedly for",
    "structure": "[Plain form / Na-adj + な / Noun + の] + わりに (は)",
    "explanation": "Expresses that the outcome is surprising or disproportionate considering the premise.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "この料理は値段が安いわりに、とても美味しい。",
        "reading": "この りょうりは ねだんが やすいわりに、とても おいしい。",
        "en": "Considering its cheap price, this dish is surprisingly delicious.",
        "highlight": "安いわりに",
        "translationsByLang": {
          "en": "Considering its cheap price, this dish is surprisingly delicious.",
          "ja": "この料理は値段が安いわりに、とても美味しい。",
          "my": "ဒီဟင်းလျာက ဈေးပေါတာနဲ့ နှိုင်းယှဉ်ရင် မမျှော်လင့်ဘဲ အရမ်းအရသာရှိပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u7"
  },
  {
    "id": "g-n3-032",
    "pattern": "〜くせに",
    "meaning": "Even though / In spite of (Critical & Reproachful)",
    "structure": "[Plain form / Na-adj + な / Noun + の] + くせに",
    "explanation": "Expresses irritation, blame, or contempt that someone fails expectations despite facts.",
    "formalLevel": "casual",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "自分では何もしないくせに、文句ばかり言っている。",
        "reading": "じぶんでは なにも しないくせに、もんくばかり いっている。",
        "en": "Even though he does nothing himself, he does nothing but complain.",
        "highlight": "何もしないくせに",
        "translationsByLang": {
          "en": "Even though he does nothing himself, he does nothing but complain.",
          "ja": "自分では何もしないくせに、文句ばかり言っている。",
          "my": "ကိုယ်တိုင် ဘာမှမလုပ်ဘဲနဲ့ အပြစ်တွေချည်း ပြောနေပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u7"
  },
  {
    "id": "g-n3-033",
    "pattern": "〜たとたん (途端)",
    "meaning": "The very instant that / Right upon doing",
    "structure": "[Verb Ta-form] + とたん (に)",
    "explanation": "Highlights an immediate, unexpected occurrence taking place at the instant of an action.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "窓を開けたとたん、冷たい突風が吹き込んできた。",
        "reading": "まどを あけたとたん、つめたい とっぷうが ふきこんできた。",
        "en": "The very instant I opened the window, a cold gust of wind blew in.",
        "highlight": "開けたとたん",
        "translationsByLang": {
          "en": "The very instant I opened the window, a cold gust of wind blew in.",
          "ja": "窓を開けたとたん、冷たい突風が吹き込んできた。",
          "my": "ပြတင်းပေါက်ဖွင့်လိုက်သည်နှင့် တစ်ပြိုင်နက် အေးစက်သော လေပြင်း ဝှေ့တိုက်လာခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u7"
  },
  {
    "id": "g-n3-034",
    "pattern": "〜た末に (末に)",
    "meaning": "After a long period of / In the end",
    "structure": "[Verb Ta-form / Noun + の] + 末に (すえに)",
    "explanation": "Denotes reaching a definitive conclusion or outcome after prolonged consideration or struggle.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "何度も家族と話し合った末に、留学を決意しました。",
        "reading": "なんども かぞくと はなしあったすえに、りゅうがくを けついしました。",
        "en": "After discussing it repeatedly with my family, I decided to study abroad.",
        "highlight": "話し合った末に",
        "translationsByLang": {
          "en": "After discussing it repeatedly with my family, I decided to study abroad.",
          "ja": "何度も家族と話し合った末に、留学を決意しました。",
          "my": "မိသားစုနှင့် အကြိမ်ကြိမ် ဆွေးနွေးပြီးနောက် နောက်ဆုံးတွင် နိုင်ငံခြားပညာသင်သွားရန် ဆုံးဖြတ်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u7"
  },
  {
    "id": "g-n3-035",
    "pattern": "〜うちに",
    "meaning": "While / Before the situation changes",
    "structure": "[Verb Dict/Nai/Te-iru / Adj / Noun + の] + うちに",
    "explanation": "Urges doing an action while conditions are still favorable, before an irreversible change occurs.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "スープが温かいうちに召し上がってください。",
        "reading": "スープが あたたかいうちに めしあがってください。",
        "en": "Please enjoy the soup while it is still warm.",
        "highlight": "温かいうちに",
        "translationsByLang": {
          "en": "Please enjoy the soup while it is still warm.",
          "ja": "スープが温かいうちに召し上がってください。",
          "my": "ဟင်းချို နွေးနေဆဲ သောက်သုံးပေးပါ။"
        }
      },
      {
        "jp": "明るいうちに山を下りましょう。",
        "reading": "あかるいうちに やまを おりましょう。",
        "en": "Let's climb down the mountain while it is still light.",
        "highlight": "明るいうちに",
        "translationsByLang": {
          "en": "Let's climb down the mountain while it is still light.",
          "ja": "明るいうちに山を下りましょう。",
          "my": "မိုးလင်းနေဆဲ တောင်ပေါ်မှ ဆင်းကြရအောင်။"
        }
      }
    ],
    "unitId": "n3-u7"
  },
  {
    "id": "g-n3-036",
    "pattern": "〜最中に (さいちゅうに)",
    "meaning": "Right in the middle of / In the midst of",
    "structure": "[Verb Te-iru / Noun + の] + 最中に",
    "explanation": "Focuses on an unexpected disruption taking place right in the peak execution of an action.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "重要な会議の最中に、突然停電が起きた。",
        "reading": "じゅうような かいぎの さいちゅうに、とつぜん ていでんが おきた。",
        "en": "Right in the middle of an important conference, a power outage suddenly struck.",
        "highlight": "会議の最中に",
        "translationsByLang": {
          "en": "Right in the middle of an important conference, a power outage suddenly struck.",
          "ja": "重要な会議の最中に、突然停電が起きた。",
          "my": "အရေးကြီးသော အစည်းအဝေး ပြုလုပ်နေဆဲတွင် ရုတ်တရက် မီးပျက်သွားခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u8"
  },
  {
    "id": "g-n3-037",
    "pattern": "〜から〜にかけて",
    "meaning": "From ~ through to ~ (Spanning approximate boundary)",
    "structure": "[Noun (Time/Place)] + から + [Noun] + にかけて",
    "explanation": "Describes a continuous span across time or physical geography without sharp edges.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "今夜から明日の朝にかけて大雪が降る見込みです。",
        "reading": "こんやから あすの あさに かけて おおゆきが ふる みこみです。",
        "en": "Heavy snow is expected spanning from tonight through tomorrow morning.",
        "highlight": "から明日の朝にかけて",
        "translationsByLang": {
          "en": "Heavy snow is expected spanning from tonight through tomorrow morning.",
          "ja": "今夜から明日の朝にかけて大雪が降る見込みです。",
          "my": "ဒီညမှ မနက်ဖြန်မနက်အထိ ဆီးနှင်းများစွာ ကျရောက်မည်ဟု ခန့်မှန်းရပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u8"
  },
  {
    "id": "g-n3-038",
    "pattern": "〜にかけては",
    "meaning": "When it comes to (Excellence in a domain)",
    "structure": "[Noun] + にかけては",
    "explanation": "Highlights supreme confidence, expertise, or unrivaled ability in a specific domain.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "料理の腕前において、彼にかけては誰にも負けない。",
        "reading": "りょうりの うでまえに おいて、かれにかけては だれにも まけない。",
        "en": "When it comes to culinary skill, no one can surpass him.",
        "highlight": "彼にかけては",
        "translationsByLang": {
          "en": "When it comes to culinary skill, no one can surpass him.",
          "ja": "料理の腕前において、彼にかけては誰にも負けない。",
          "my": "ချက်ပြုတ်မှု စွမ်းရည်နှင့် ပတ်သက်လာလျှင် သူ့ကို မည်သူမျှ မယှဉ်နိုင်ပါ။"
        }
      }
    ],
    "unitId": "n3-u8"
  },
  {
    "id": "g-n3-039",
    "pattern": "〜として / としての",
    "meaning": "As / In the role or capacity of",
    "structure": "[Noun] + として / としての + [Noun]",
    "explanation": "Expresses official capacity, status, role, qualifications, or category.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "留学生として日本で工学を学んでいます。",
        "reading": "りゅうがくせいとして にほんで こうがくを まなんでいます。",
        "en": "I am studying engineering in Japan as an international student.",
        "highlight": "留学生として",
        "translationsByLang": {
          "en": "I am studying engineering in Japan as an international student.",
          "ja": "留学生として日本で工学を学んでいます。",
          "my": "နိုင်ငံတကာ ကျောင်းသားတစ်ဦး အနေဖြင့် ဂျပန်နိုင်ငံတွင် အင်ဂျင်နီယာပညာ သင်ယူနေပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u8"
  },
  {
    "id": "g-n3-040",
    "pattern": "〜に反して / 反する",
    "meaning": "Contrary to / In opposition to",
    "structure": "[Noun] + に反して / に反する + [Noun]",
    "explanation": "Indicates that real developments occurred in complete contradiction to predictions, desires, or rules.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "事前の予想に反して、株価は急上昇した。",
        "reading": "じぜんの よそうに はんして、かぶかは きゅうじょうしょうした。",
        "en": "Contrary to previous forecasts, stock prices surged rapidly.",
        "highlight": "予想に反して",
        "translationsByLang": {
          "en": "Contrary to previous forecasts, stock prices surged rapidly.",
          "ja": "事前の予想に反して、株価は急上昇した。",
          "my": "ကြိုတင်ခန့်မှန်းချက်များနှင့် ဆန့်ကျင်ဘက် စတော့ရှယ်ယာဈေးနှုန်းများ အလျင်အမြန် မြင့်တက်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u8"
  },
  {
    "id": "g-n3-041",
    "pattern": "〜に基づいて / 基づく",
    "meaning": "Based upon / Grounded in",
    "structure": "[Noun] + に基づいて / に基づく + [Noun]",
    "explanation": "Indicates taking factual evidence, data, law, or principles as the primary foundation.",
    "formalLevel": "formal",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "綿密なアンケート調査の結果に基づいて方針を策定する。",
        "reading": "めんみつな アンケートちょうさの けっかに もとづいて ほうしんを さくていする。",
        "en": "We formulate our policies based on the findings of a meticulous survey.",
        "highlight": "結果に基づいて",
        "translationsByLang": {
          "en": "We formulate our policies based on the findings of a meticulous survey.",
          "ja": "綿密なアンケート調査の結果に基づいて方針を策定する。",
          "my": "တိကျသော စစ်တမ်းရလဒ်များအပေါ် အခြေခံ၍ မူဝါဒကို ရေးဆွဲပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u9"
  },
  {
    "id": "g-n3-042",
    "pattern": "〜をもとに (元に)",
    "meaning": "Based on / Derived from (Materials/Inspiration)",
    "structure": "[Noun] + をもとに / をもとにして",
    "explanation": "Indicates creating a new creative work, movie, or design drawing inspiration from source material.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "この壮大な映画は実際の歴史事件をもとに制作された。",
        "reading": "この そうだいな えいがは じっさいの れきしじけんを もとに せいさくされた。",
        "en": "This epic movie was produced based upon actual historical events.",
        "highlight": "事件をもとに",
        "translationsByLang": {
          "en": "This epic movie was produced based upon actual historical events.",
          "ja": "この壮大な映画は実際の歴史事件をもとに制作された。",
          "my": "ဒီခမ်းနားတဲ့ ရုပ်ရှင်ကို အမှန်တကယ် သမိုင်းဖြစ်ရပ်ကို အခြေခံပြီး ရိုက်ကူးခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u9"
  },
  {
    "id": "g-n3-043",
    "pattern": "〜反面 (はんめん)",
    "meaning": "On the other hand / Conversely",
    "structure": "[Plain form / Na-adj + な] + 反面",
    "explanation": "Weighs two contrasting aspects or opposing sides of the exact same subject.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "都会暮らしは便利な反面、自然との触れ合いが少ない。",
        "reading": "とかいぐらしは べんりな はんめん、しぜんとの ふれあいが すくない。",
        "en": "While city life is convenient, on the other hand, contact with nature is rare.",
        "highlight": "便利な反面",
        "translationsByLang": {
          "en": "While city life is convenient, on the other hand, contact with nature is rare.",
          "ja": "都会暮らしは便利な反面、自然との触れ合いが少ない。",
          "my": "မြို့ပြနေထိုင်မှုက အဆင်ပြေလွယ်ကူသော်လည်း တစ်ဖက်တွင် သဘာဝတရားနှင့် ထိတွေ့မှု နည်းပါးပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u9"
  },
  {
    "id": "g-n3-044",
    "pattern": "〜一方 (いっぽう)",
    "meaning": "On one hand ~ on the other / Continuously developing",
    "structure": "[Plain form] + 一方で / [Verb Dict-form] + 一方だ",
    "explanation": "Presents two coexisting realities simultaneously, or indicates continuous progression in one direction.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "環境保護を推進する一方で、経済成長も維持しなければならない。",
        "reading": "かんきょうほごを すいしんする いっぽうで、けいざいせいちょうも いじしなければ ならない。",
        "en": "While promoting environmental protection, on the other hand we must maintain economic growth.",
        "highlight": "一方で",
        "translationsByLang": {
          "en": "While promoting environmental protection, on the other hand we must maintain economic growth.",
          "ja": "環境保護を推進する一方で、経済成長も維持しなければならない。",
          "my": "သဘာဝပတ်ဝန်းကျင် ထိန်းသိမ်းရေးကို ဆောင်ရွက်နေသည့် တစ်ပြိုင်နက်တည်း စီးပွားရေး တိုးတက်မှုကိုလည်း ထိန်းသိမ်းရပါမည်။"
        }
      }
    ],
    "unitId": "n3-u9"
  },
  {
    "id": "g-n3-045",
    "pattern": "〜べきだ / べきではない",
    "meaning": "Should / Ought to (Moral duty & Common sense)",
    "structure": "[Verb Dict-form] + べきだ / [する -> すべきだ]",
    "explanation": "Asserts a strong moral, social, or ethical obligation based on universal reason.",
    "formalLevel": "standard",
    "level": "N3",
    "difficulty": 3,
    "examples": [
      {
        "jp": "約束したことはどんな事情があっても守るべきです。",
        "reading": "やくそくした ことは どんな じじょうが あっても まもるべきです。",
        "en": "One ought to keep their promises no matter the circumstances.",
        "highlight": "守るべきです",
        "translationsByLang": {
          "en": "One ought to keep their promises no matter the circumstances.",
          "ja": "約束したことはどんな事情があっても守るべきです。",
          "my": "ကတိပေးထားသော အရာကို မည်သည့်အခြေအနေတွင်မဆို စောင့်ထိန်းသင့်ပါတယ်။"
        }
      }
    ],
    "unitId": "n3-u9"
  },
  {
    "id": "g-n2-001",
    "pattern": "〜に際して / にあたって",
    "meaning": "On the occasion of / Prior to (Formal commencement)",
    "structure": "[Verb Dict-form / Noun] + に際して / にあたって",
    "explanation": "Used at the formal start of a special, monumental, or significant event or endeavor.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "新年度の開始に際して、社長から訓示があった。",
        "reading": "しんねんどの かいしに さいして、しゃちょうから くんじが あった。",
        "en": "On the occasion of the start of the new fiscal year, the president gave an address.",
        "highlight": "開始に際して",
        "translationsByLang": {
          "en": "On the occasion of the start of the new fiscal year, the president gave an address.",
          "ja": "新年度の開始に際して、社長から訓示があった。",
          "my": "နှစ်သစ်စတင်သည့် အခါသမယတွင် ဥက္ကဋ္ဌထံမှ လမ်းညွှန်မိန့်ခွန်း ချမှတ်ခဲ့ပါတယ်။"
        }
      },
      {
        "jp": "新製品の開発にあたって、消費者の声を徹底的に集めた。",
        "reading": "しんせいひんの かいはつに あたって、しょうひしゃの こえを てっていてきに あつめた。",
        "en": "Prior to developing new products, we gathered consumer opinions thoroughly.",
        "highlight": "開発にあたって",
        "translationsByLang": {
          "en": "Prior to developing new products, we gathered consumer opinions thoroughly.",
          "ja": "新製品の開発にあたって、消費者の声を徹底的に集めた。",
          "my": "ထုတ်ကုန်အသစ် ထုတ်လုပ်မှု မစတင်မီ စားသုံးသူများ၏ သဘောထားကို စေ့စပ်စွာ ကောက်ယူခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u1"
  },
  {
    "id": "g-n2-002",
    "pattern": "〜からして",
    "meaning": "Judging even from / Considering just (Representative clue)",
    "structure": "[Noun] + からして",
    "explanation": "Singles out one extreme or basic example to suggest that the whole situation is clearly as perceived.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "彼の横柄な態度からして、私は彼を信用できない。",
        "reading": "かれの おうへいな たいどからして、わたしは かれを しんようできない。",
        "en": "Judging even just from his arrogant attitude, I cannot trust him.",
        "highlight": "態度からして",
        "translationsByLang": {
          "en": "Judging even just from his arrogant attitude, I cannot trust him.",
          "ja": "彼の横柄な態度からして、私は彼を信用できない。",
          "my": "သူ့ရဲ့ မာနထောင်လွှားတဲ့ အမူအရာကို ကြည့်ရုံနှင့်ပင် ကျွန်တော် သူ့ကို မယုံကြည်နိုင်ပါ။"
        }
      },
      {
        "jp": "プロの選手は、基礎的なウォーミングアップからして違う。",
        "reading": "プロの せんしゅは、きそてきな ウォーミングアップからして ちがう。",
        "en": "Professional athletes are different even in just their fundamental warm-ups.",
        "highlight": "ウォーミングアップからして",
        "translationsByLang": {
          "en": "Professional athletes are different even in just their fundamental warm-ups.",
          "ja": "プロの選手は、基礎的なウォーミングアップからして違う。",
          "my": "ပရော်ဖက်ရှင်နယ် ကစားသမားများသည် အခြေခံသွေးပူလေ့ကျင့်ခန်း လုပ်ဆောင်ပုံကအစ ကွဲပြားပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u1"
  },
  {
    "id": "g-n2-003",
    "pattern": "〜つつある",
    "meaning": "In the continuous process of (Gradual ongoing change)",
    "structure": "[Verb Masu-stem] + つつある",
    "explanation": "Expresses that a gradual, ongoing, observable transformation or trend is taking place right now.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "景気は緩やかに回復しつつあると政府は発表した。",
        "reading": "けいきは ゆるやかに かいふくしつつあると せいふは はっぴょうした。",
        "en": "The government announced that the economy is gradually recovering.",
        "highlight": "回復しつつある",
        "translationsByLang": {
          "en": "The government announced that the economy is gradually recovering.",
          "ja": "景気は緩やかに回復しつつあると政府は発表した。",
          "my": "စီးပွားရေးသည် တဖြည်းဖြည်း ပြန်လည်ဦးမော့လာနေပြီဖြစ်ကြောင်း အစိုးရက ကြေညာခဲ့ပါတယ်။"
        }
      },
      {
        "jp": "少子高齢化の影響で、地方の人口は減少しつつある。",
        "reading": "しょうしこうれいかの えいきょうで、ちほうの じんこうは げんしょうしつつある。",
        "en": "Under the impact of low birthrates and aging, regional populations are declining.",
        "highlight": "減少しつつある",
        "translationsByLang": {
          "en": "Under the impact of low birthrates and aging, regional populations are declining.",
          "ja": "少子高齢化の影響で、地方の人口は減少しつつある。",
          "my": "ကလေးမွေးဖွားနှုန်းကျဆင်းခြင်း၏ အကျိုးဆက်ကြောင့် ကျေးလက်ဒေသ လူဦးရေ တဖြည်းဖြည်း လျော့နည်းလာနေပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u1"
  },
  {
    "id": "g-n2-004",
    "pattern": "〜ざるを得ない",
    "meaning": "Cannot help but do / Compelled by circumstances",
    "structure": "[Verb Nai-stem] + ざるを得ない (する -> せざるを得ない)",
    "explanation": "Expresses that one has no choice but to do an action against personal preference due to external pressure.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "これほど明確な証拠があれば、事実を認めざるを得ない。",
        "reading": "これほど めいかくな しょうこが あれば、じじつを みとめざるをえない。",
        "en": "With evidence this clear, one cannot help but acknowledge the facts.",
        "highlight": "認めざるを得ない",
        "translationsByLang": {
          "en": "With evidence this clear, one cannot help but acknowledge the facts.",
          "ja": "これほど明確な証拠があれば、事実を認めざるを得ない。",
          "my": "ဤမျှ ရှင်းလင်းသော သက်သေရှိနေလျှင် အမှန်တရားကို မလွှဲမရှောင်သာ အသိအမှတ်ပြုရပါမည်။"
        }
      },
      {
        "jp": "体調不良のため、本日の出張は延期せざるを得ません。",
        "reading": "たいちょうふりょうの ため、ほんじつの しゅっちょうは えんきせざるをえません。",
        "en": "Due to poor health, I am forced to postpone today's business trip.",
        "highlight": "延期せざるを得ません",
        "translationsByLang": {
          "en": "Due to poor health, I am forced to postpone today's business trip.",
          "ja": "体調不良のため、本日の出張は延期せざるを得ません。",
          "my": "ကျန်းမာရေးချို့ယွင်းမှုကြောင့် ယနေ့ ခရီးစဉ်ကို ရွှေ့ဆိုင်းရန် မဖြစ်မနေ ဆုံးဖြတ်ရပါတော့သည်။"
        }
      }
    ],
    "unitId": "n2-u1"
  },
  {
    "id": "g-n2-005",
    "pattern": "〜にほかならない",
    "meaning": "Nothing other than / None other than (Definitive reason)",
    "structure": "[Noun] + にほかならない",
    "explanation": "Categorically asserts that a specified reason, factor, or essence is the absolute sole explanation.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "プロジェクトの成功は、チーム全員の献身的な努力にほかならない。",
        "reading": "プロジェクトの せいこうは、チーム ぜんいんの けんしんてきな どりょくに ほかならない。",
        "en": "The project's success is nothing other than the devoted effort of every team member.",
        "highlight": "努力にほかならない",
        "translationsByLang": {
          "en": "The project's success is nothing other than the devoted effort of every team member.",
          "ja": "プロジェクトの成功は、チーム全員の献身的な努力にほかならない。",
          "my": "စီမံကိန်း အောင်မြင်ရခြင်းသည် အဖွဲ့သားအားလုံး၏ စေတနာပါသော ကြိုးပမ်းမှုကြောင့်သာ ဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u1"
  },
  {
    "id": "g-n2-006",
    "pattern": "〜に即して (にそくして)",
    "meaning": "In line with / Following facts or rules strictly",
    "structure": "[Noun] + に即して / に即した + [Noun]",
    "explanation": "Indicates acting or making judgments strictly adhering to facts, reality, laws, or traditions.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "実態に即して規則を改正する必要があります。",
        "reading": "じったいに そくして きそくを かいせいする ひつようが あります。",
        "en": "We must revise the regulations in line with current realities.",
        "highlight": "実態に即して",
        "translationsByLang": {
          "en": "We must revise the regulations in line with current realities.",
          "ja": "実態に即して規則を改正する必要があります。",
          "my": "လက်တွေ့အခြေအနေနှင့်အညီ စည်းမျဉ်းများကို ပြင်ဆင်ရန် လိုအပ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u2"
  },
  {
    "id": "g-n2-007",
    "pattern": "〜を踏まえて (をふまえて)",
    "meaning": "Taking into consideration / Grounded in prior lessons",
    "structure": "[Noun] + を踏まえて",
    "explanation": "Indicates basing the next plan or action thoroughly on prior experiences, feedback, or results.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "前回の反省点を踏まえて、新しい企画書を練り直しました。",
        "reading": "ぜんかいの はんせいてんを ふまえて、あたらしい きかくしょを ねりなおしました。",
        "en": "Taking the reflection points from last time into account, we reworked the new proposal.",
        "highlight": "反省点を踏まえて",
        "translationsByLang": {
          "en": "Taking the reflection points from last time into account, we reworked the new proposal.",
          "ja": "前回の反省点を踏まえて、新しい企画書を練り直しました。",
          "my": "ယခင်အကြိမ် အမှားသင်ခန်းစာများကို ထည့်သွင်းစဉ်းစားပြီး စီမံကိန်းအသစ်ကို ပြန်လည်ပြင်ဆင်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u2"
  },
  {
    "id": "g-n2-008",
    "pattern": "〜を問わず (をとわず)",
    "meaning": "Regardless of / Irrespective of conditions",
    "structure": "[Noun] + を問わず",
    "explanation": "Indicates that something applies universally regardless of gender, age, nationality, or season.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "経験の有無を問わず、意欲のある人材を幅広く募集しています。",
        "reading": "けいけんの うむを とわず、いよくの ある じんざいを はばひろく ぼしゅうしています。",
        "en": "Regardless of experience, we are widely recruiting motivated talent.",
        "highlight": "有無を問わず",
        "translationsByLang": {
          "en": "Regardless of experience, we are widely recruiting motivated talent.",
          "ja": "経験の有無を問わず、意欲のある人材を幅広く募集しています。",
          "my": "အတွေ့အကြုံရှိသည်ဖြစ်စေ မရှိသည်ဖြစ်စေ စိတ်အားထက်သန်သော ဝန်ထမ်းများကို ဖိတ်ခေါ်နေပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u2"
  },
  {
    "id": "g-n2-009",
    "pattern": "〜を契機に / を契機として",
    "meaning": "Taking as a turning point / Triggered by",
    "structure": "[Noun] + を契機に / を契機として",
    "explanation": "Marks an event, accident, or milestone as the decisive catalyst for dramatic future changes.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "病気を契機に、生活習慣を抜本的に見直した。",
        "reading": "びょうきを けいきに、せいかつしゅうかんを ばっぽんてきに みなおした。",
        "en": "Triggered by an illness, I drastically overhauled my lifestyle habits.",
        "highlight": "病気を契機に",
        "translationsByLang": {
          "en": "Triggered by an illness, I drastically overhauled my lifestyle habits.",
          "ja": "病気を契機に、生活習慣を抜本的に見直した。",
          "my": "ဖျားနာမှုကို အလှည့်အပြောင်းအဖြစ် ယူပြီး နေထိုင်မှုအလေ့အထကို အခြေခံကျကျ ပြုပြင်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u2"
  },
  {
    "id": "g-n2-010",
    "pattern": "〜を皮切りに (をかわきりに)",
    "meaning": "Starting with and followed successively by",
    "structure": "[Noun] + を皮切りに (して)",
    "explanation": "Indicates the initial action of a series of events that expand or repeat in rapid succession.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "東京公演を皮切りに、全国十か所でツアーが開催される。",
        "reading": "とうきょうこうえんを かわきりに、ぜんこく じゅっかしょで ツアーが かいさいされる。",
        "en": "Starting with the Tokyo performance, a tour will be held across ten locations nationwide.",
        "highlight": "東京公演を皮切りに",
        "translationsByLang": {
          "en": "Starting with the Tokyo performance, a tour will be held across ten locations nationwide.",
          "ja": "東京公演を皮切りに、全国十か所でツアーが開催される。",
          "my": "တိုကျိုဖျော်ဖြေပွဲမှ စတင်၍ တစ်နိုင်ငံလုံး နေရာ ၁၀ ခုတွင် ဖျော်ဖြေရေးခရီးစဉ် ကျင်းပမည် ဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u2"
  },
  {
    "id": "g-n2-011",
    "pattern": "〜をものともせずに",
    "meaning": "In defiance of / Braving extreme hardship",
    "structure": "[Noun] + をものともせずに",
    "explanation": "Praises someone who vigorously overcomes and disregards major physical dangers, criticism, or cold.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "激しい嵐をものともせずに、救助隊は遭難者を捜索した。",
        "reading": "はげしい あらしを ものともせずに、きゅうじょたいは そうなんしゃを そうさくした。",
        "en": "In defiance of the fierce storm, the rescue team searched for the lost mountaineers.",
        "highlight": "嵐をものともせずに",
        "translationsByLang": {
          "en": "In defiance of the fierce storm, the rescue team searched for the lost mountaineers.",
          "ja": "激しい嵐をものともせずに、救助隊は遭難者を捜索した。",
          "my": "ပြင်းထန်သော မုန်တိုင်းကို အမှုမထားဘဲ ကယ်ဆယ်ရေးအဖွဲ့သည် ပျောက်ဆုံးသူများကို ရှာဖွေခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u3"
  },
  {
    "id": "g-n2-012",
    "pattern": "〜を余儀なくされる (をよぎなくされる)",
    "meaning": "Forced to undergo / Compelled by unavoidable crisis",
    "structure": "[Noun] + を余儀なくされる",
    "explanation": "Expresses being compelled into a difficult situation (evacuation, resignation) by outside calamity.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "洪水被害により、多くの住民が避難生活を余儀なくされた。",
        "reading": "こうずいひがいに より、おおくの じゅうみんが ひなんせいかつを よぎなくされた。",
        "en": "Due to flood damages, many residents were forced into evacuation shelters.",
        "highlight": "避難生活を余儀なくされた",
        "translationsByLang": {
          "en": "Due to flood damages, many residents were forced into evacuation shelters.",
          "ja": "洪水被害により、多くの住民が避難生活を余儀なくされた。",
          "my": "ရေဘေးဒဏ်ကြောင့် ပြည်သူများစွာ မလွှဲမရှောင်သာ ကယ်ဆယ်ရေးစခန်းများတွင် နေထိုင်ခဲ့ရပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u3"
  },
  {
    "id": "g-n2-013",
    "pattern": "〜に堪えない / に堪える",
    "meaning": "Unworthy of / Cannot bear to / Worth doing",
    "structure": "[Verb Dict-form / Noun] + に堪えない / に堪える",
    "explanation": "Indicates that something is too vulgar/painful to watch/read, or conversely is deeply deserving of viewing.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "あまりの残虐さに、目を見るに堪えない光景だった。",
        "reading": "あまりの ざんぎゃくさに、めを みるに たえない こうけいだった。",
        "en": "Due to the sheer cruelty, it was a spectacle one could not bear to look at.",
        "highlight": "見るに堪えない",
        "translationsByLang": {
          "en": "Due to the sheer cruelty, it was a spectacle one could not bear to look at.",
          "ja": "あまりの残虐さに、目を見るに堪えない光景だった。",
          "my": "ရက်စက်လွန်းလှသဖြင့် မျက်စိဖြင့် မကြည့်ရက်နိုင်လောက်အောင် ဆိုးရွားသော မြင်ကွင်းဖြစ်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u3"
  },
  {
    "id": "g-n2-014",
    "pattern": "〜に値する (にあたいする)",
    "meaning": "Worthy of / Deserving of praise or respect",
    "structure": "[Verb Dict-form / Noun] + に値する",
    "explanation": "Affirms that a person, achievement, or work has high intrinsic value and truly deserves recognition.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "彼の長年の研究成果は、ノーベル賞に値する素晴らしい業績だ。",
        "reading": "かれの ながねんの けんきゅうせいかは、ノーベルしょうに あたいする すばらしい ぎょうせきだ。",
        "en": "His long years of research results are magnificent achievements worthy of a Nobel Prize.",
        "highlight": "値する",
        "translationsByLang": {
          "en": "His long years of research results are magnificent achievements worthy of a Nobel Prize.",
          "ja": "彼の長年の研究成果は、ノーベル賞に値する素晴らしい業績だ。",
          "my": "သူ့၏ နှစ်ရှည်လများ သုတေသနရလဒ်သည် နိုဘယ်လ်ဆုနှင့် ထိုက်တန်သော စွမ်းဆောင်ရည်ဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u3"
  },
  {
    "id": "g-n2-015",
    "pattern": "〜に相違ない (にそういない)",
    "meaning": "Without a doubt / Certain to be (Formal conviction)",
    "structure": "[Plain form / Noun] + に相違ない",
    "explanation": "Formal, written equivalent of に違いない; expresses unshakeable certainty based on evidence.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "防犯カメラの映像から、犯人はこの人物に相違ない。",
        "reading": "ぼうはんカメラの えいぞうから、はんにんは この じんぶつに そういない。",
        "en": "From the security camera footage, the culprit is without doubt this person.",
        "highlight": "相違ない",
        "translationsByLang": {
          "en": "From the security camera footage, the culprit is without doubt this person.",
          "ja": "防犯カメラの映像から、犯人はこの人物に相違ない。",
          "my": "လုံခြုံရေးကင်မရာမှတ်တမ်းအရ တရားခံသည် ဤလူဖြစ်သည်မှာ သံသယဖြစ်ဖွယ်မရှိပါ။"
        }
      }
    ],
    "unitId": "n2-u3"
  },
  {
    "id": "g-n2-016",
    "pattern": "〜にすぎない",
    "meaning": "Merely / Nothing more than / Just",
    "structure": "[Plain form / Noun] + にすぎない",
    "explanation": "Minimizes the status or scale of something: \"it does not exceed a low, modest boundary\".",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "私は自分の役目を果たしたにすぎません。お礼には及びません。",
        "reading": "わたしは じぶんの やくめを はたしたにすぎません。おれいには およびません。",
        "en": "I have merely fulfilled my duty; no thanks are necessary.",
        "highlight": "果たしたにすぎません",
        "translationsByLang": {
          "en": "I have merely fulfilled my duty; no thanks are necessary.",
          "ja": "私は自分の役目を果たしたにすぎません。お礼には及びません。",
          "my": "ကျွန်ုပ်သည် မိမိ၏ တာဝန်ကို ပြီးမြောက်အောင် ထမ်းဆောင်ခဲ့ရုံမျှသာ ဖြစ်သဖြင့် ကျေးဇူးတင်ရန် မလိုပါ။"
        }
      }
    ],
    "unitId": "n2-u4"
  },
  {
    "id": "g-n2-017",
    "pattern": "〜げ (ありげ / 悲しげ)",
    "meaning": "Giving an aura / Bearing the appearance of",
    "structure": "[Adj stem / Verb stem] + げ",
    "explanation": "Describes an observable atmosphere, facial expression, or emotional state emitted by someone.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "彼女は悲しげな瞳で静かに海を見つめていた。",
        "reading": "かのじょは かなしげな ひとみで しずかに うみを みつめていた。",
        "en": "She was gazing quietly at the ocean with sorrowful eyes.",
        "highlight": "悲しげな",
        "translationsByLang": {
          "en": "She was gazing quietly at the ocean with sorrowful eyes.",
          "ja": "彼女は悲しげな瞳で静かに海を見つめていた。",
          "my": "သူမသည် ဝမ်းနည်းရိပ်သန်းသော မျက်ဝန်းများဖြင့် ပင်လယ်ပြင်ကို တိတ်ဆိတ်စွာ စိုက်ကြည့်နေခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u4"
  },
  {
    "id": "g-n2-018",
    "pattern": "〜つつも",
    "meaning": "Even while / Although doing / Despite knowing",
    "structure": "[Verb Masu-stem] + つつも",
    "explanation": "Expresses internal contradiction between knowing/feeling something and acting opposite to it.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "体に悪いと知りつつも、夜食のラーメンを食べてしまう。",
        "reading": "からだに わるいと しりつつも、やしょくの ラーメンを たべてしまう。",
        "en": "Even while knowing it is bad for health, I end up eating late-night ramen.",
        "highlight": "知りつつも",
        "translationsByLang": {
          "en": "Even while knowing it is bad for health, I end up eating late-night ramen.",
          "ja": "体に悪いと知りつつも、夜食のラーメンを食べてしまう。",
          "my": "ကျန်းမာရေးအတွက် မကောင်းမှန်း သိပါလျက် ညဉ့်နက် ခေါက်ဆွဲကို စားမိသွားပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u4"
  },
  {
    "id": "g-n2-019",
    "pattern": "〜ぬく (抜き)",
    "meaning": "Endure through to the finish / Do thoroughly",
    "structure": "[Verb Masu-stem] + ぬく",
    "explanation": "Highlights fighting through overwhelming hardship, doubt, or strain to complete a task completely.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "苦しい逆境の中で、最後まで信念を貫き抜いた。",
        "reading": "くるしい ぎゃっきょうの なかで、さいごまで しんねんを つらぬきぬいた。",
        "en": "Amidst painful adversity, they carried their convictions through to the very end.",
        "highlight": "貫き抜いた",
        "translationsByLang": {
          "en": "Amidst painful adversity, they carried their convictions through to the very end.",
          "ja": "苦しい逆境の中で、最後まで信念を貫き抜いた。",
          "my": "ဆင်းရဲဒုက္ခများကြားမှ အဆုံးတိုင်အောင် မိမိ၏ ယုံကြည်ချက်ကို ဇွဲဖြင့် ဆုပ်ကိုင်ထားခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u4"
  },
  {
    "id": "g-n2-020",
    "pattern": "〜ずにはいられない",
    "meaning": "Cannot suppress doing / Cannot help but do",
    "structure": "[Verb Nai-stem] + ずにはいられない (する -> せずにはいられない)",
    "explanation": "Conveys an overwhelming emotional impulse that one cannot physically or psychologically restrain.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "あまりの面白さに、大声で笑わずにはいられなかった。",
        "reading": "あまりの おもしろさに、おおごえで わらわずには いられなかった。",
        "en": "Due to the sheer humor, I could not help laughing out loud.",
        "highlight": "笑わずにはいられなかった",
        "translationsByLang": {
          "en": "Due to the sheer humor, I could not help laughing out loud.",
          "ja": "あまりの面白さに、大声で笑わずにはいられなかった。",
          "my": "အလွန်ရယ်စရာကောင်းလွန်းသဖြင့် အသံကျယ်ကျယ်ဖြင့် မရယ်ဘဲ မနေနိုင်ခဲ့ပါ။"
        }
      }
    ],
    "unitId": "n2-u4"
  },
  {
    "id": "g-n2-021",
    "pattern": "〜ないではいられない",
    "meaning": "Cannot help but feel or do (Uncontainable urge)",
    "structure": "[Verb Nai-form] + ではいられない",
    "explanation": "Alternative form expressing irresistible inner impulse driven by circumstance.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "困難に直面している友人を見たら、助けないではいられない。",
        "reading": "こんなんに ちょくめんしている ゆうじんを みたら、たすけないでは いられない。",
        "en": "Seeing a friend facing hardship, I cannot help but offer help.",
        "highlight": "助けないではいられない",
        "translationsByLang": {
          "en": "Seeing a friend facing hardship, I cannot help but offer help.",
          "ja": "困難に直面している友人を見たら、助けないではいられない。",
          "my": "ဒုက္ခကြုံတွေ့နေရသော သူငယ်ချင်းကို တွေ့ရပါက မကူညီဘဲ မနေနိုင်ပါ။"
        }
      }
    ],
    "unitId": "n2-u5"
  },
  {
    "id": "g-n2-022",
    "pattern": "〜かねる",
    "meaning": "Unable to / Hesitant to do (Polite refusal)",
    "structure": "[Verb Masu-stem] + かねる",
    "explanation": "Politely declines a request, expressing that one wishes to help but circumstances prevent it.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "個人情報保護の観点から、そのご質問にはお答えいたしかねます。",
        "reading": "こじんじょうほうほごの かんてんから、その ごしつもんには おこたえいたしかねます。",
        "en": "From the standpoint of privacy protection, we are unable to answer that question.",
        "highlight": "お答えいたしかねます",
        "translationsByLang": {
          "en": "From the standpoint of privacy protection, we are unable to answer that question.",
          "ja": "個人情報保護の観点から、そのご質問にはお答えいたしかねます。",
          "my": "ကိုယ်ရေးအချက်အလက် ကာကွယ်ရေးအရ ထိုမေးခွန်းကို ဖြေကြားပေးရန် ခက်ခဲပါသည်ခင်ဗျာ။"
        }
      }
    ],
    "unitId": "n2-u5"
  },
  {
    "id": "g-n2-023",
    "pattern": "〜かねない",
    "meaning": "Might possibly lead to a grave consequence",
    "structure": "[Verb Masu-stem] + かねない",
    "explanation": "Warns that an ongoing carelessness or risk could readily trigger a dangerous outcome.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "スピードの出しすぎは、重大な事故を引き起こしかねない。",
        "reading": "スピードの だしすぎは、じゅうだいな じこを ひきおこしかねない。",
        "en": "Excessive speeding could easily cause a serious accident.",
        "highlight": "引き起こしかねない",
        "translationsByLang": {
          "en": "Excessive speeding could easily cause a serious accident.",
          "ja": "スピードの出しすぎは、重大な事故を引き起こしかねない。",
          "my": "အရှိန်လွန်မောင်းနှင်ခြင်းသည် ကြီးမားသော ယာဉ်မတော်တဆမှုကို ဖြစ်ပေါ်စေနိုင်ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u5"
  },
  {
    "id": "g-n2-024",
    "pattern": "〜おそれがある (恐れがある)",
    "meaning": "There is a danger or fear that (Risk warning)",
    "structure": "[Verb Dict/Nai-form / Noun + の] + おそれがある",
    "explanation": "Formal news or announcement warning of potential hazards, disease contagion, or collapse.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "台風の接近により、河川が氾濫する恐れがあります。",
        "reading": "たいふうの せっきんに より、かせんが はんらんする おそれが あります。",
        "en": "With the typhoon approaching, there is danger that rivers may overflow.",
        "highlight": "氾濫する恐れがあります",
        "translationsByLang": {
          "en": "With the typhoon approaching, there is danger that rivers may overflow.",
          "ja": "台風の接近により、河川が氾濫する恐れがあります。",
          "my": "တိုင်ဖွန်းမုန်တိုင်း နီးကပ်လာသဖြင့် မြစ်ရေလျှံတက်နိုင်သော အန္တရာယ်ရှိပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u5"
  },
  {
    "id": "g-n2-025",
    "pattern": "〜次第だ / 次第で",
    "meaning": "Depending on / Explaining chronological circumstances",
    "structure": "[Noun] + 次第で / [Verb Plain] + 次第だ",
    "explanation": "States that the result hinges entirely on a condition, or formally clarifies why a step was taken.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "成功するかどうかは、日々の努力次第です。",
        "reading": "せいこうするか どうかは、ひびの どりょくしだいです。",
        "en": "Whether one succeeds or not depends on daily effort.",
        "highlight": "努力次第",
        "translationsByLang": {
          "en": "Whether one succeeds or not depends on daily effort.",
          "ja": "成功するかどうかは、日々の努力次第です。",
          "my": "အောင်မြင်ခြင်း မအောင်မြင်ခြင်းသည် နေ့စဉ် ကြိုးစားအားထုတ်မှုအပေါ် မူတည်ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u5"
  },
  {
    "id": "g-n2-026",
    "pattern": "〜上は (じょうは)",
    "meaning": "Now that / Since it has come to this",
    "structure": "[Verb Plain/Ta-form] + 上は",
    "explanation": "Asserts firm resolve: \"now that this serious step is undertaken, I must fulfill it to the end\".",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "契約を結んだ上は、条項を厳格に遵守する義務がある。",
        "reading": "けいやくを むすんだ うえは、じょうこうを げんかくに じゅんしゅする ぎむが ある。",
        "en": "Now that the contract has been signed, there is a duty to strictly comply with clauses.",
        "highlight": "結んだ上は",
        "translationsByLang": {
          "en": "Now that the contract has been signed, there is a duty to strictly comply with clauses.",
          "ja": "契約を結んだ上は、条項を厳格に遵守する義務がある。",
          "my": "စာချုပ်ချုပ်ဆိုပြီးသည့်နောက် စည်းမျဉ်းများကို တိကျစွာ လိုက်နာရန် တာဝန်ရှိပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u6"
  },
  {
    "id": "g-n2-027",
    "pattern": "〜以上 (いじょうは)",
    "meaning": "Since / Because one has decided / So long as",
    "structure": "[Plain form] + 以上 (は)",
    "explanation": "Emphasizes moral accountability: \"since this premise exists, natural obligations follow\".",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "引き受けた以上、責任を持って最後までやり遂げます。",
        "reading": "ひきうけた いじょう、せきにんを もって さいごまで やりとげます。",
        "en": "Since I accepted the task, I will carry it out responsibly to the end.",
        "highlight": "引き受けた以上",
        "translationsByLang": {
          "en": "Since I accepted the task, I will carry it out responsibly to the end.",
          "ja": "引き受けた以上、責任を持って最後までやり遂げます。",
          "my": "တာဝန်ယူပြီးသည့်နောက် တာဝန်သိစွာဖြင့် အဆုံးထိ ပြီးမြောက်အောင် ဆောင်ရွက်ပါမည်။"
        }
      }
    ],
    "unitId": "n2-u6"
  },
  {
    "id": "g-n2-028",
    "pattern": "〜折に / 折の",
    "meaning": "On the occasion of / At the time of (Polite opportunity)",
    "structure": "[Verb Dict/Ta-form / Noun + の] + 折に",
    "explanation": "Polite, refined expression for \"at the time when\" used in greetings and business letters.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "東京へお越しの折には、ぜひ弊社のオフィスにもお立ち寄りください。",
        "reading": "とうきょうへ おこしの おりには、ぜひ へいしゃの オフィスにも おたちよりください。",
        "en": "When you happen to visit Tokyo, please be sure to stop by our office.",
        "highlight": "お越しの折には",
        "translationsByLang": {
          "en": "When you happen to visit Tokyo, please be sure to stop by our office.",
          "ja": "東京へお越しの折には、ぜひ弊社のオフィスにもお立ち寄りください。",
          "my": "တိုကျိုသို့ ရောက်ရှိလာသည့် အခါသမယတွင် ကျွန်ုပ်တို့၏ ရုံးခန်းသို့ ကြွရောက်တော်မူပါခင်ဗျာ။"
        }
      }
    ],
    "unitId": "n2-u6"
  },
  {
    "id": "g-n2-029",
    "pattern": "〜をかねて",
    "meaning": "Combining two purposes simultaneously",
    "structure": "[Noun] + をかねて",
    "explanation": "States that an action is performed with two separate goals simultaneously in mind.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "健康維持をかねて、毎朝三十分の散歩を日課にしている。",
        "reading": "けんこういじを かねて、まいあさ さんじゅっぷんの さんぽを にっかに している。",
        "en": "To combine with maintaining good health, I make a 30-minute walk my morning routine.",
        "highlight": "健康維持をかねて",
        "translationsByLang": {
          "en": "To combine with maintaining good health, I make a 30-minute walk my morning routine.",
          "ja": "健康維持をかねて、毎朝三十分の散歩を日課にしている。",
          "my": "ကျန်းမာရေး ထိန်းသိမ်းခြင်းနှင့် ပေါင်းစပ်၍ နေ့စဉ် နံနက် မိနစ် ၃၀ လမ်းလျှောက်ခြင်းကို အလေ့အထ ပြုလုပ်ထားပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u6"
  },
  {
    "id": "g-n2-030",
    "pattern": "〜をおいて",
    "meaning": "Setting aside / Other than (Unrivaled praise)",
    "structure": "[Noun] + をおいて〜ない",
    "explanation": "Asserts that no candidate other than this one can perform or suit the role.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "この困難な役目を任せられるリーダーは、彼をおいて他にいない。",
        "reading": "この こんなんな やくめを まかせられる リーダーは、かれをおいて ほかにいない。",
        "en": "As for a leader who can be entrusted with this difficult task, there is no one other than him.",
        "highlight": "彼をおいて",
        "translationsByLang": {
          "en": "As for a leader who can be entrusted with this difficult task, there is no one other than him.",
          "ja": "この困難な役目を任せられるリーダーは、彼をおいて他にいない。",
          "my": "ဤခက်ခဲသော တာဝန်ကို လွှဲအပ်နိုင်မည့် ခေါင်းဆောင်မှာ သူ့မှတစ်ပါး အခြားမရှိပါ။"
        }
      }
    ],
    "unitId": "n2-u6"
  },
  {
    "id": "g-n2-031",
    "pattern": "〜に先駆けて (にさきがけて)",
    "meaning": "Pioneering / Ahead of others in history",
    "structure": "[Noun] + に先駆けて / に先駆けた + [Noun]",
    "explanation": "Indicates being the very first to accomplish something ahead of competitors or eras.",
    "formalLevel": "formal",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "世界に先駆けて、革新的な環境技術の開発に成功した。",
        "reading": "せかいに さきがけて、かくしんてきな かんきょうぎじゅつの かいはつに せいこうした。",
        "en": "Ahead of the rest of the world, they succeeded in developing revolutionary environmental tech.",
        "highlight": "世界に先駆けて",
        "translationsByLang": {
          "en": "Ahead of the rest of the world, they succeeded in developing revolutionary environmental tech.",
          "ja": "世界に先駆けて、革新的な環境技術の開発に成功した。",
          "my": "ကမ္ဘာ့ရှေ့ပြေးဦးဆောင်၍ ဆန်းသစ်သော သဘာဝပတ်ဝန်းကျင်နည်းပညာကို အောင်မြင်စွာ တီထွင်နိုင်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u7"
  },
  {
    "id": "g-n2-032",
    "pattern": "〜に応えて (にこたえて)",
    "meaning": "In response to expectations or demands",
    "structure": "[Noun] + に応えて / に応える + [Noun]",
    "explanation": "Expresses taking actions specifically to satisfy public expectations, requests, or support.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "ファンの熱い声援に応えて、選手たちは見事な逆転勝利を収めた。",
        "reading": "ファンの あつい せいえんに こたえて、せんしゅたちは みごとな ぎゃくてんしょうりを おさめた。",
        "en": "In response to the fervent cheers of fans, the athletes scored a magnificent comeback victory.",
        "highlight": "声援に応えて",
        "translationsByLang": {
          "en": "In response to the fervent cheers of fans, the athletes scored a magnificent comeback victory.",
          "ja": "ファンの熱い声援に応えて、選手たちは見事な逆転勝利を収めた。",
          "my": "ပရိသတ်များ၏ အားပေးထောက်ခံမှုကို တုံ့ပြန်၍ ကစားသမားများသည် အံ့ဖွယ် အနိုင်ရရှိခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u7"
  },
  {
    "id": "g-n2-033",
    "pattern": "〜に沿って (にそって)",
    "meaning": "In accordance with guidelines / Along a course",
    "structure": "[Noun] + に沿って / に沿った + [Noun]",
    "explanation": "Describes adhering precisely to policy guidelines, criteria, manuals, or along rivers/streets.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "作成したマニュアルに沿って正確に作業を進めてください。",
        "reading": "さくせいした マニュアルに そって せいかくに さぎょうを すすめて ください。",
        "en": "Please proceed with the work accurately in accordance with the created manual.",
        "highlight": "マニュアルに沿って",
        "translationsByLang": {
          "en": "Please proceed with the work accurately in accordance with the created manual.",
          "ja": "作成したマニュアルに沿って正確に作業を進めてください。",
          "my": "ပြုစုထားသော လမ်းညွှန်ချက်အတိုင်း အလုပ်ကို တိကျစွာ ဆက်လက်ဆောင်ရွက်ပေးပါ။"
        }
      }
    ],
    "unitId": "n2-u7"
  },
  {
    "id": "g-n2-034",
    "pattern": "〜のももっともだ",
    "meaning": "Completely natural / Justified that",
    "structure": "[Verb Dict-form / Noun + な] + のももっともだ",
    "explanation": "Expresses that anyone in that situation would naturally react or feel that exact same way.",
    "formalLevel": "standard",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "あんな失礼な扱いを受けたら、彼が激怒するのももっともだ。",
        "reading": "あんな しつれいな あつかいを うけたら、かれが げきどするのも もっともだ。",
        "en": "Receiving such rude treatment, it is entirely natural that he became furious.",
        "highlight": "激怒するのももっともだ",
        "translationsByLang": {
          "en": "Receiving such rude treatment, it is entirely natural that he became furious.",
          "ja": "あんな失礼な扱いを受けたら、彼が激怒するのももっともだ。",
          "my": "ထိုမျှ မရိုင်းစိုင်းသော ဆက်ဆံမှုကို ခံရလျှင် သူ အလွန်ဒေါသထွက်ခြင်းမှာ အပြစ်ဆိုဖွယ်မရှိ သဘာဝကျပါတယ်။"
        }
      }
    ],
    "unitId": "n2-u7"
  },
  {
    "id": "g-n2-035",
    "pattern": "〜っこない",
    "meaning": "Definitely cannot / No chance whatsoever",
    "structure": "[Verb Masu-stem] + っこない",
    "explanation": "Emphatically denies that an action is physically or practically possible in conversation.",
    "formalLevel": "casual",
    "level": "N2",
    "difficulty": 4,
    "examples": [
      {
        "jp": "一日でこの膨大な辞書を全部覚えられるっこないよ。",
        "reading": "いちにちで この ぼうだいな じしょを ぜんぶ おぼえられるっこないよ。",
        "en": "There is no way on earth one could memorize this entire massive dictionary in one day!",
        "highlight": "覚えられるっこない",
        "translationsByLang": {
          "en": "There is no way on earth one could memorize this entire massive dictionary in one day!",
          "ja": "一日でこの膨大な辞書を全部覚えられるっこないよ。",
          "my": "တစ်ရက်တည်းဖြင့် ဤကြီးမားသော အဘိဓာန်တစ်ခုလုံးကို အလွတ်မှတ်မိဖို့ ဘယ်လိုမှ မဖြစ်နိုင်ပါဘူး။"
        }
      }
    ],
    "unitId": "n2-u7"
  },
  {
    "id": "g-n1-001",
    "pattern": "〜極まりない / 極まる",
    "meaning": "Extremely / Boundlessly (Absolute peak of state)",
    "structure": "[Na-adj stem / Noun] + 極まりない / 極まる",
    "explanation": "Literary expression indicating that an emotion, danger, or state has reached its absolute utmost limit.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "公衆の面前でのあのような無礼な振る舞いは、不快極まりない。",
        "reading": "こうしゅうの めんぜんでの あのような ぶれいな ふるまいは、ふかいきわまりない。",
        "en": "Such rude behavior in public is extremely unpleasant.",
        "highlight": "不快極まりない",
        "translationsByLang": {
          "en": "Such rude behavior in public is extremely unpleasant.",
          "ja": "公衆の面前でのあのような無礼な振る舞いは、不快極まりない。",
          "my": "လူအများရှေ့တွင် ထိုကဲ့သို့ ရိုင်းပျစွာ ပြုမူခြင်းသည် အလွန်အမင်း စိတ်မသက်မသာ ဖြစ်ဖွယ်ရာ ဖြစ်ပါတယ်။"
        }
      },
      {
        "jp": "命綱なしで高所に登るなど、危険極まる行為だ。",
        "reading": "いのちづな なしで こうしょに のぼるなど、きけんきわまる こういだ。",
        "en": "Climbing to high places without a lifeline is a boundlessly hazardous act.",
        "highlight": "危険極まる",
        "translationsByLang": {
          "en": "Climbing to high places without a lifeline is a boundlessly hazardous act.",
          "ja": "命綱なしで高所に登るなど、危険極まる行為だ。",
          "my": "အသက်ကယ်ကြိုးမပါဘဲ မြင့်မားသောနေရာသို့ တက်ရောက်ခြင်းသည် အတိုင်းအဆမဲ့ အန္တရာယ်ကြီးမားသော လုပ်ရပ်ဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u1"
  },
  {
    "id": "g-n1-002",
    "pattern": "〜にたえない",
    "meaning": "Cannot suppress / Deeply overwhelmed with emotion",
    "structure": "[Noun (Joy/Gratitude/Regret) / Verb Dict] + にたえない",
    "explanation": "Conveys being overcome by intense gratitude, grief, admiration, or being unable to endure hearing.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "皆様の温かいご支援に対し、感謝にたえません。",
        "reading": "みなさまの あたたかい ごしえんに たいし、かんしゃに たえません。",
        "en": "I am deeply and boundlessly grateful for everyone's warm support.",
        "highlight": "感謝にたえません",
        "translationsByLang": {
          "en": "I am deeply and boundlessly grateful for everyone's warm support.",
          "ja": "皆様の温かいご支援に対し、感謝にたえません。",
          "my": "လူကြီးမင်းများ၏ နွေးထွေးသော အားပေးကူညီမှုအတွက် အဆုံးမဲ့ လှိုက်လှဲစွာ ကျေးဇူးတင်ရှိပါတယ်။"
        }
      },
      {
        "jp": "あのような悲惨な事故の知らせは、聞くにたえない。",
        "reading": "あのような ひさんな じこの しらせは、きくに たえない。",
        "en": "News of such a tragic accident is unbearable to listen to.",
        "highlight": "聞くにたえない",
        "translationsByLang": {
          "en": "News of such a tragic accident is unbearable to listen to.",
          "ja": "あのような悲惨な事故の知らせは、聞くにたえない。",
          "my": "ထိုကဲ့သို့ ဝမ်းနည်းဖွယ် ကောင်းသော မတော်တဆမှု သတင်းသည် နားမထောင်ရက်နိုင်လောက်အောင် စိတ်ထိခိုက်ဖွယ် ဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u1"
  },
  {
    "id": "g-n1-003",
    "pattern": "〜まじき",
    "meaning": "Must not / Unforgivable for someone in that position",
    "structure": "[Verb Dict-form] + まじき + [Noun] (する -> すまじき)",
    "explanation": "Stern moral censure stating that an action is totally unacceptable for someone of that noble profession.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "患者の秘密を漏洩するなど、医師としてあるまじき行為だ。",
        "reading": "かんじゃの ひみつを ろうえいするなど、いしとして あるまじき こういだ。",
        "en": "Leaking a patient's confidential information is an unforgivable act for a physician.",
        "highlight": "あるまじき",
        "translationsByLang": {
          "en": "Leaking a patient's confidential information is an unforgivable act for a physician.",
          "ja": "患者の秘密を漏洩するなど、医師としてあるまじき行為だ。",
          "my": "လူနာ၏ လျှို့ဝှက်ချက်ကို ပေါက်ကြားစေခြင်းသည် ဆရာဝန်တစ်ဦးအနေဖြင့် လုံးဝ ခွင့်မလွှတ်နိုင်သော လုပ်ရပ်ဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u1"
  },
  {
    "id": "g-n1-004",
    "pattern": "〜たるもの",
    "meaning": "In the lofty capacity of / As someone who is",
    "structure": "[Noun (Leader/Scholar/Doctor)] + たるもの",
    "explanation": "Demands noble character, moral duty, or high standards expected of someone in a distinguished position.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "一国の指導者たるものは、常に国民の福祉を第一に考えるべきだ。",
        "reading": "いっこくの しどうしゃ たるものは、つねに こくみんの ふくしを だいいちに かんがえるべきだ。",
        "en": "Someone in the capacity of a nation's leader should always place people's welfare first.",
        "highlight": "指導者たるもの",
        "translationsByLang": {
          "en": "Someone in the capacity of a nation's leader should always place people's welfare first.",
          "ja": "一国の指導者たるものは、常に国民の福祉を第一に考えるべきだ。",
          "my": "နိုင်ငံတော်၏ ခေါင်းဆောင်တစ်ဦးအနေဖြင့် ပြည်သူလူထု၏ သာယာဝပြောရေးကို အမြဲ ရှေ့တန်းတင် စဉ်းစားသင့်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u1"
  },
  {
    "id": "g-n1-005",
    "pattern": "〜なりに / なりの",
    "meaning": "In one's own way / Befitting one's level",
    "structure": "[Noun / Plain form] + なりに / なりの + [Noun]",
    "explanation": "Conveys doing one's absolute best or having distinctive qualities within one's unique limitations.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "子供は子供なりに、親の苦労を察して心配している。",
        "reading": "こどもは こどもなりに、おやの くろうを さっして しんぱいしている。",
        "en": "Children, in their own way, sense their parents' hardships and worry.",
        "highlight": "子供なりに",
        "translationsByLang": {
          "en": "Children, in their own way, sense their parents' hardships and worry.",
          "ja": "子供は子供なりに、親の苦労を察して心配している。",
          "my": "ကလေးများသည် ကလေးသဘာဝအလျောက် မိဘများ၏ ဒုက္ခကို ရိပ်စားမိကာ စိုးရိမ်ပူပန်တတ်ကြပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u1"
  },
  {
    "id": "g-n1-006",
    "pattern": "〜であれ〜であれ",
    "meaning": "Whether A or B / In either case regardless",
    "structure": "[Noun 1] + であれ + [Noun 2] + であれ",
    "explanation": "Emphasizes that regardless of whether condition A or B applies, the conclusion remains unchanged.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "理由が何であれ、暴力はいかなる場合も決して許されない。",
        "reading": "りゆうが なんであれ、ぼうりょくは いかなる ばあいも けっして ゆるされない。",
        "en": "Whatever the reason may be, violence is never permitted under any circumstance.",
        "highlight": "何であれ",
        "translationsByLang": {
          "en": "Whatever the reason may be, violence is never permitted under any circumstance.",
          "ja": "理由が何であれ、暴力はいかなる場合も決して許されない。",
          "my": "အကြောင်းရင်း မည်သို့ပင်ဖြစ်စေ အကြမ်းဖက်မှုကို မည်သည့်အခြေအနေတွင်မျှ ခွင့်မပြုနိုင်ပါ။"
        }
      }
    ],
    "unitId": "n1-u2"
  },
  {
    "id": "g-n1-007",
    "pattern": "〜をおいて他にない",
    "meaning": "There is no other than / Exclusively this one",
    "structure": "[Noun] + をおいて他にない",
    "explanation": "Declares supreme exclusivity: this person, company, or solution is uniquely qualified above all others.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "この難事業を成功に導ける人物は、彼をおいて他にない。",
        "reading": "この なんじぎょうを せいこうに みちびける じんぶつは、かれをおいて ほかにない。",
        "en": "As for the person who can lead this difficult undertaking to success, there is none other than him.",
        "highlight": "彼をおいて他にない",
        "translationsByLang": {
          "en": "As for the person who can lead this difficult undertaking to success, there is none other than him.",
          "ja": "この難事業を成功に導ける人物は、彼をおいて他にない。",
          "my": "ဤခက်ခဲသော လုပ်ငန်းကြီးကို အောင်မြင်အောင် ဦးဆောင်နိုင်မည့် ပုဂ္ဂိုလ်မှာ သူ့မှတစ်ပါး အခြားမရှိပါ။"
        }
      }
    ],
    "unitId": "n1-u2"
  },
  {
    "id": "g-n1-008",
    "pattern": "〜ならではの",
    "meaning": "Unique to / Distinctive characteristic of",
    "structure": "[Noun] + ならではの + [Noun] / ならではだ",
    "explanation": "Praises a wonderful charm, atmosphere, or culinary masterpiece that only this entity can provide.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "京都ならではの風情ある街並みを心ゆくまで堪能した。",
        "reading": "きょうと ならではの ふぜいある まちなみを こころゆくまで たんのうした。",
        "en": "I thoroughly enjoyed the charming historic cityscape unique to Kyoto.",
        "highlight": "京都ならではの",
        "translationsByLang": {
          "en": "I thoroughly enjoyed the charming historic cityscape unique to Kyoto.",
          "ja": "京都ならではの風情ある街並みを心ゆくまで堪能した。",
          "my": "ကျိုတိုမြို့၌သာ ခံစားရနိုင်သော သမိုင်းဝင် အလှတရားများကို စိတ်ကြိုက် လည်ပတ်ခံစားခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u2"
  },
  {
    "id": "g-n1-009",
    "pattern": "〜と相まって (とあいまって)",
    "meaning": "Coupled with / In combination with",
    "structure": "[Noun] + と相まって",
    "explanation": "Describes two mutually reinforcing factors combining together to generate a powerful synergistic effect.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "晴天と相まって、紅葉の美しさがより一層引き立っていた。",
        "reading": "せいてんと あいまって、こうようの うつくしさが より いっそう ひきたっていた。",
        "en": "Coupled with the clear skies, the beauty of autumn foliage stood out all the more.",
        "highlight": "と相まって",
        "translationsByLang": {
          "en": "Coupled with the clear skies, the beauty of autumn foliage stood out all the more.",
          "ja": "晴天と相まって、紅葉の美しさがより一層引き立っていた。",
          "my": "ကြည်လင်သော ရာသီဥတုနှင့် ပေါင်းစပ်ကာ သစ်ရွက်နီများ၏ အလှတရားသည် ပိုမို ထင်ရှားပေါ်လွင်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u2"
  },
  {
    "id": "g-n1-010",
    "pattern": "〜を限りに",
    "meaning": "As of / Ending definitively at this date",
    "structure": "[Noun (Time/Date)] + を限りに",
    "explanation": "Solemnly marks the decisive termination of an ongoing enterprise, career, or championship.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "今月末を限りに、三十年間続いた老舗の看板を下ろすことになった。",
        "reading": "こんげつまつを かぎりに、さんじゅうねんかん つづいた しにせの かんばんを おろすことに なった。",
        "en": "As of the end of this month, the historic shop will close after 30 years.",
        "highlight": "今月末を限りに",
        "translationsByLang": {
          "en": "As of the end of this month, the historic shop will close after 30 years.",
          "ja": "今月末を限りに、三十年間続いた老舗の看板を下ろすことになった。",
          "my": "ဒီလကုန်ကို နောက်ဆုံးထား၍ နှစ်ပေါင်း ၃၀ သက်တမ်းရှိ ဆိုင်ဟောင်းကို အပြီးတိုင် ရပ်နားရန် ဆုံးဖြတ်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u2"
  },
  {
    "id": "g-n1-011",
    "pattern": "〜をもって (日時・手段)",
    "meaning": "As of (Time) / By means of (Formal method)",
    "structure": "[Noun] + をもって",
    "explanation": "Formal administrative statement signaling official cessation/commencement, or high sincerity of method.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "本日をもって、本年度の通常業務を終了いたします。",
        "reading": "ほんじつを もって、ほんねんどの つうじょうぎょうむを しゅうりょういたします。",
        "en": "As of today, we conclude standard operations for this fiscal year.",
        "highlight": "本日をもって",
        "translationsByLang": {
          "en": "As of today, we conclude standard operations for this fiscal year.",
          "ja": "本日をもって、本年度の通常業務を終了いたします。",
          "my": "ယနေ့နေ့စွဲဖြင့် ယခုနှစ်အတွက် ပုံမှန်လုပ်ငန်းဆောင်တာများကို ပြီးဆုံးကြောင်း ကြေညာအပ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u3"
  },
  {
    "id": "g-n1-012",
    "pattern": "〜といえども",
    "meaning": "Even though / Even if it be (High-level concession)",
    "structure": "[Noun / Plain form] + といえども",
    "explanation": "Argues that even a master, saint, or genius cannot escape universal natural/moral principles.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "熟練の達人といえども、油断すれば思わぬ失敗をする。",
        "reading": "じゅくれんの たつじん といえども、ゆだんすれば おもわぬ しっぱいを する。",
        "en": "Even a seasoned master will make unexpected mistakes if careless.",
        "highlight": "達人といえども",
        "translationsByLang": {
          "en": "Even a seasoned master will make unexpected mistakes if careless.",
          "ja": "熟練の達人といえども、油断すれば思わぬ失敗をする。",
          "my": "ကျွမ်းကျင်သော ဆရာသမားပင် ဖြစ်လင့်ကစား ပေါ့ဆပါက မမျှော်လင့်သော အမှား ကျူးလွန်မိတတ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u3"
  },
  {
    "id": "g-n1-013",
    "pattern": "〜を禁じ得ない (をきんじえない)",
    "meaning": "Cannot suppress / Cannot help feeling",
    "structure": "[Noun (Emotion)] + を禁じ得ない",
    "explanation": "Literary expression where deep anger, tears, pity, or amazement surge up irresistibly.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "無実の人が処罰されたという不条理な判決に、強い憤りを禁じ得ない。",
        "reading": "むじつの ひとが しょばつされたという ふじょうりな はんけつに、つよい いきどおりを きんじえない。",
        "en": "At the absurd verdict punishing an innocent person, I cannot suppress deep indignation.",
        "highlight": "憤りを禁じ得ない",
        "translationsByLang": {
          "en": "At the absurd verdict punishing an innocent person, I cannot suppress deep indignation.",
          "ja": "無実の人が処罰されたという不条理な判決に、強い憤りを禁じ得ない。",
          "my": "အပြစ်မဲ့သူတစ်ဦး အပြစ်ပေးခံရသော မတရားသည့် စီရင်ချက်အပေါ် ပြင်းထန်သော ဒေါသကို မထိန်းချုပ်နိုင်ခဲ့ပါ။"
        }
      }
    ],
    "unitId": "n1-u3"
  },
  {
    "id": "g-n1-014",
    "pattern": "〜を余儀なくさせる",
    "meaning": "Forces someone to undergo / Leaves no choice",
    "structure": "[Noun] + を余儀なくさせる",
    "explanation": "Causative structure where a crisis, epidemic, or law forces an organization into sudden measures.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "突然の資金難が、経営陣に事業の見直しを余儀なくさせた。",
        "reading": "とつぜんの しきんなんが、けいえいじんに じぎょうの みなおしを よぎなくさせた。",
        "en": "A sudden cash shortfall forced management into overhauling the business.",
        "highlight": "余儀なくさせた",
        "translationsByLang": {
          "en": "A sudden cash shortfall forced management into overhauling the business.",
          "ja": "突然の資金難が、経営陣に事業の見直しを余儀なくさせた。",
          "my": "ရုတ်တရက် ငွေကြေးပြတ်လပ်မှုသည် စီမံခန့်ခွဲသူများအား လုပ်ငန်းပြန်လည်သုံးသပ်ရန် မလွှဲမရှောင်သာ ဖိအားပေးခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u3"
  },
  {
    "id": "g-n1-015",
    "pattern": "〜てやまない",
    "meaning": "Never cease to / Strongly and continuously",
    "structure": "[Verb Te-form] + やまない",
    "explanation": "Expresses permanent, profound, heartfelt prayer, hope, yearning, or affection.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "世界中の紛争が一日も早く終結することを願ってやまない。",
        "reading": "せかいじゅうの ふんそうが いちにちも はやく しゅうけつすることを ねがってやまない。",
        "en": "I never cease to pray that conflicts worldwide will end as soon as possible.",
        "highlight": "願ってやまない",
        "translationsByLang": {
          "en": "I never cease to pray that conflicts worldwide will end as soon as possible.",
          "ja": "世界中の紛争が一日も早く終結することを願ってやまない。",
          "my": "ကမ္ဘာတစ်ဝှမ်း ပဋိပက္ခများ အမြန်ဆုံး အဆုံးသတ်နိုင်ပါစေကြောင်း အစဉ်အမြဲ မေတ္တာပို့သ ဆုတောင်းအပ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u3"
  },
  {
    "id": "g-n1-016",
    "pattern": "〜ごとき / ごとく",
    "meaning": "Like / As if / Such a thing as (Classical comparison)",
    "structure": "[Noun / Verb Plain] + ごとき / ごとく",
    "explanation": "Literary simile expressing swiftness, ferocity, or humble self-deprecation.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "光陰矢のごとし。時間は矢のごとく飛び去る。",
        "reading": "こういん やのごとし。じかんは やの ごとく とびさる。",
        "en": "Time flies like an arrow. Hours fly away swift as an arrow.",
        "highlight": "矢のごとく",
        "translationsByLang": {
          "en": "Time flies like an arrow. Hours fly away swift as an arrow.",
          "ja": "光陰矢のごとし。時間は矢のごとく飛び去る。",
          "my": "အချိန်သည် မြှားကဲ့သို့ လျင်မြန်စွာ ပျံသန်းကုန်လွန်သွားပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u4"
  },
  {
    "id": "g-n1-017",
    "pattern": "〜ずにはおかない",
    "meaning": "Will definitely cause / Bound to result in",
    "structure": "[Verb Nai-stem] + ずにはおかない (する -> せずにはおかない)",
    "explanation": "Asserts that an extraordinary cause will inevitably evoke a profound reaction or transformation.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "彼の魂のこもった熱演は、観客を感動させずにはおかないだろう。",
        "reading": "かれの たましいの こもった ねつえんは、かんきゃくを かんどうさせずには おかないだろう。",
        "en": "His soulful, passionate performance will surely deeply move the audience.",
        "highlight": "感動させずにはおかない",
        "translationsByLang": {
          "en": "His soulful, passionate performance will surely deeply move the audience.",
          "ja": "彼の魂のこもった熱演は、観客を感動させずにはおかないだろう。",
          "my": "သူ၏ နှလုံးသားပါသော အနုပညာဖျော်ဖြေမှုသည် ပရိသတ်ကို မလွဲမသွေ မျက်ရည်ကျစေမည် ဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u4"
  },
  {
    "id": "g-n1-018",
    "pattern": "〜ないではおかない",
    "meaning": "Cannot leave without doing / Bound to settle",
    "structure": "[Verb Nai-form] + ではおかない",
    "explanation": "Affirms absolute resolve that a matter will be resolved or punished without exception.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "あれだけの不正を働いた者は、厳しく処分しないではおかない。",
        "reading": "あれだけの ふせいを はたらいた ものは、きびしく しょぶんしないでは おかない。",
        "en": "Those who committed such grave misconduct will not be left without severe punishment.",
        "highlight": "処分しないではおかない",
        "translationsByLang": {
          "en": "Those who committed such grave misconduct will not be left without severe punishment.",
          "ja": "あれだけの不正を働いた者は、厳しく処分しないではおかない。",
          "my": "ထိုမျှလောက် မသမာမှု ကျူးလွန်သူများကို ပြင်းထန်စွာ အရေးမယူဘဲ မနေနိုင်ပါ။"
        }
      }
    ],
    "unitId": "n1-u4"
  },
  {
    "id": "g-n1-019",
    "pattern": "〜にあって",
    "meaning": "In the situation of / During extraordinary crisis",
    "structure": "[Noun] + にあって",
    "explanation": "Highlights acting with dignity or courage under severe or historic pressures.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "未曾有の大災害の混乱にあって、市民は秩序を守り続けた。",
        "reading": "みぞうの だいさいがいの こんらんに あって、しみんは ちつじょを まもりつづけた。",
        "en": "Amidst the turmoil of an unprecedented disaster, citizens maintained orderly conduct.",
        "highlight": "混乱にあって",
        "translationsByLang": {
          "en": "Amidst the turmoil of an unprecedented disaster, citizens maintained orderly conduct.",
          "ja": "未曾有の大災害の混乱にあって、市民は秩序を守り続けた。",
          "my": "မကြုံစဖူး သဘာဝဘေးအန္တရာယ်ကြီး၏ ရုန်းကန်ရမှုကြားမှ ပြည်သူများသည် စည်းကမ်းကို ထိန်းသိမ်းခဲ့ကြပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u4"
  },
  {
    "id": "g-n1-020",
    "pattern": "〜にかかわる",
    "meaning": "Affecting crucially / Pertaining to life or honor",
    "structure": "[Noun] + にかかわる + [Noun]",
    "explanation": "Indicates that something has a profound, critical bearing on life, safety, reputation, or destiny.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "医療現場のミスは、患者の生命にかかわる重大事だ。",
        "reading": "いりょうげんばの ミスは、かんじゃの せいめいに かかわる じゅうだいじだ。",
        "en": "Mistakes in the medical field are grave matters affecting patients' very lives.",
        "highlight": "生命にかかわる",
        "translationsByLang": {
          "en": "Mistakes in the medical field are grave matters affecting patients' very lives.",
          "ja": "医療現場のミスは、患者の生命にかかわる重大事だ。",
          "my": "ဆေးဘက်ဆိုင်ရာ အမှားအယွင်းသည် လူနာ၏ အသက်ဘေးနှင့် သက်ဆိုင်သော ကြီးမားသည့် ကိစ္စဖြစ်ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u4"
  },
  {
    "id": "g-n1-021",
    "pattern": "〜をよそに",
    "meaning": "Ignoring / Disregarding completely",
    "structure": "[Noun] + をよそに",
    "explanation": "Highlights proceeding stubbornly while totally ignoring family worry, public outcry, or danger.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "周囲の心配をよそに、彼は単身危険な航海へと旅立った。",
        "reading": "しゅういの しんぱいを よそに、かれは たんしん きけんな こうかいへと たびだった。",
        "en": "Ignoring the deep concern of those around him, he set out alone on a perilous voyage.",
        "highlight": "心配をよそに",
        "translationsByLang": {
          "en": "Ignoring the deep concern of those around him, he set out alone on a perilous voyage.",
          "ja": "周囲の心配をよそに、彼は単身危険な航海へと旅立った。",
          "my": "ပတ်ဝန်းကျင်၏ စိုးရိမ်ပူပန်မှုများကို လျစ်လျူရှုကာ သူသည် အန္တရာယ်များသော ပင်လယ်ခရီးစဉ်သို့ တစ်ဦးတည်း ထွက်ခွာခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u5"
  },
  {
    "id": "g-n1-022",
    "pattern": "〜ともなく / ともなしに",
    "meaning": "Involuntarily / Without specific conscious aim",
    "structure": "[Verb Dict-form] + ともなく / ともなしに",
    "explanation": "Describes an action occurring passively or without deliberate intent (gazing, listening casually).",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "見るともなく窓の外を眺めていたら、初雪が舞い降りてきた。",
        "reading": "みるともなく まどの そとを ながめていたら、はつゆきが まいおりてきた。",
        "en": "While idly looking out the window without particular aim, the first snow began dancing down.",
        "highlight": "見るともなく",
        "translationsByLang": {
          "en": "While idly looking out the window without particular aim, the first snow began dancing down.",
          "ja": "見るともなく窓の外を眺めていたら、初雪が舞い降りてきた。",
          "my": "ရည်ရွယ်ချက်မရှိဘဲ ပြတင်းပေါက်အပြင်ကို ငေးကြည့်နေစဉ် ပထမဆုံး နှင်းပွင့်များ ကျဆင်းလာခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u5"
  },
  {
    "id": "g-n1-023",
    "pattern": "〜そばから",
    "meaning": "No sooner than / Repeatedly undone as soon as",
    "structure": "[Verb Dict/Ta-form] + そばから",
    "explanation": "Expresses that as soon as one action is done, it is immediately cancelled out by another.",
    "formalLevel": "standard",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "部屋を片付けるそばから、子供たちがまたおもちゃを散らかす。",
        "reading": "へやを かたづける そばから、こどもたちが また おもちゃを ちらかす。",
        "en": "No sooner do I tidy up the room than the kids scatter toys all over again.",
        "highlight": "片付けるそばから",
        "translationsByLang": {
          "en": "No sooner do I tidy up the room than the kids scatter toys all over again.",
          "ja": "部屋を片付けるそばから、子供たちがまたおもちゃを散らかす。",
          "my": "အခန်းကို ရှင်းလင်းပြီးသည်နှင့် ချက်ချင်းပင် ကလေးများက ကစားစရာများကို ပြန်လည် ဖရိုဖရဲ လုပ်ကြပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u5"
  },
  {
    "id": "g-n1-024",
    "pattern": "〜が早いか",
    "meaning": "The instant that / As soon as (Immediate burst)",
    "structure": "[Verb Dict/Ta-form] + が早いか",
    "explanation": "Portrays a lightning-fast follow-up action initiated the instant the previous action finishes.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "終業のチャイムが鳴るが早いか、生徒たちは教室を飛び出した。",
        "reading": "しゅうぎょうの チャイムが なるがはやいか、せいとたちは きょうしつを とびだした。",
        "en": "The moment the dismissal chime rang, students burst out of the classroom.",
        "highlight": "鳴るが早いか",
        "translationsByLang": {
          "en": "The moment the dismissal chime rang, students burst out of the classroom.",
          "ja": "終業のチャイムが鳴るが早いか、生徒たちは教室を飛び出した。",
          "my": "ကျောင်းဆင်းခေါင်းလောင်း မြည်သည်နှင့် ချက်ချင်းပင် ကျောင်းသားများသည် စာသင်ခန်းထဲမှ ပြေးထွက်သွားကြပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u5"
  },
  {
    "id": "g-n1-025",
    "pattern": "〜や否や (やいなや)",
    "meaning": "The very second that / Barely after",
    "structure": "[Verb Dict-form] + や否や",
    "explanation": "Captures the instantaneous sequence between two rapidly unfolding events.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "飛行機が着陸するや否や、乗客は一斉に荷物を取り始めた。",
        "reading": "ひこうきが ちゃくりくするやいなや、じょうきゃくは いっせいに にもつを とりはじめた。",
        "en": "The very moment the airplane touched down, passengers began retrieving luggage at once.",
        "highlight": "着陸するや否や",
        "translationsByLang": {
          "en": "The very moment the airplane touched down, passengers began retrieving luggage at once.",
          "ja": "飛行機が着陸するや否や、乗客は一斉に荷物を取り始めた。",
          "my": "လေယာဉ်ဆင်းသက်သည်နှင့် တစ်ပြိုင်နက် ခရီးသည်များသည် တစ်ပြိုင်နက်တည်း အထုပ်အပိုးများ စတင်ရယူခဲ့ကြပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u5"
  },
  {
    "id": "g-n1-026",
    "pattern": "〜なり",
    "meaning": "Right after doing / Immediately upon doing",
    "structure": "[Verb Dict-form] + なり",
    "explanation": "Describes a sudden, surprising action taken by a third person immediately upon finishing an act.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "彼は手紙を読むなり、顔色を変えて部屋を飛び出して行った。",
        "reading": "かれは てがみを よむなり、かおいろを かえて へやを とびだして いった。",
        "en": "The instant he read the letter, his face changed color and he dashed out of the room.",
        "highlight": "読むなり",
        "translationsByLang": {
          "en": "The instant he read the letter, his face changed color and he dashed out of the room.",
          "ja": "彼は手紙を読むなり、顔色を変えて部屋を飛び出して行った。",
          "my": "သူသည် စာကို ဖတ်ပြီးသည်နှင့် တစ်ပြိုင်နက် မျက်နှာပျက်ယွင်းကာ အခန်းထဲမှ အလျင်အမြန် ထွက်ပြေးသွားခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u6"
  },
  {
    "id": "g-n1-027",
    "pattern": "〜かたがた",
    "meaning": "While doing A, also take occasion to do B",
    "structure": "[Noun] + かたがた",
    "explanation": "Formal greeting expression where an action doubles as a courtesy visit, congratulations, or gratitude.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "新居への引越のご挨拶かたがた、恩師のお宅をお伺いした。",
        "reading": "しんきょへの ひっこしの ごあいさつかたがた、おんしの おたくを おうかがいした。",
        "en": "Taking the opportunity of moving greetings, I paid a courtesy visit to my mentor's house.",
        "highlight": "ご挨拶かたがた",
        "translationsByLang": {
          "en": "Taking the opportunity of moving greetings, I paid a courtesy visit to my mentor's house.",
          "ja": "新居への引越のご挨拶かたがた、恩師のお宅をお伺いした。",
          "my": "အိမ်အသစ်သို့ ပြောင်းရွှေ့သည့် နှုတ်ခွန်းဆက်ရင်း တစ်ပါတည်း ဆရာ့အိမ်သို့ ဂါရဝပြု သွားရောက်ခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u6"
  },
  {
    "id": "g-n1-028",
    "pattern": "〜いかんだ / いかんによって",
    "meaning": "Depending on / Governed crucially by",
    "structure": "[Noun] + のいかんだ / いかんによって",
    "explanation": "Stresses that a critical consequence or verdict will be decided entirely based on this variable.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "今後の交渉の進展いかんによって、提携の方針を決定する。",
        "reading": "こんごの こうしょうの しんてん いかんに よって、ていけいの ほうしんを けっていする。",
        "en": "Depending on the progress of upcoming negotiations, we will determine partnership policy.",
        "highlight": "進展いかんによって",
        "translationsByLang": {
          "en": "Depending on the progress of upcoming negotiations, we will determine partnership policy.",
          "ja": "今後の交渉の進展いかんによって、提携の方針を決定する。",
          "my": "နောင်လာမည့် ဆွေးနွေးပွဲများ၏ တိုးတက်မှုအပေါ် မူတည်၍ မဟာမိတ်မူဝါဒကို ဆုံးဖြတ်ပါမည်။"
        }
      }
    ],
    "unitId": "n1-u6"
  },
  {
    "id": "g-n1-029",
    "pattern": "〜んばかりに",
    "meaning": "As if on the verge of / As though about to",
    "structure": "[Verb Nai-stem] + んばかりに (する -> せんばかりに)",
    "explanation": "Vividly exaggerates an emotional state or physical posture as if about to burst into action.",
    "formalLevel": "literary",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "彼女は今にも泣き出さんばかりの表情で立ち尽くしていた。",
        "reading": "かのじょは いまにも なきださんばかりの ひょうじょうで たちつくしていた。",
        "en": "She stood motionless with an expression as though on the very verge of weeping.",
        "highlight": "泣き出さんばかり",
        "translationsByLang": {
          "en": "She stood motionless with an expression as though on the very verge of weeping.",
          "ja": "彼女は今にも泣き出さんばかりの表情で立ち尽くしていた。",
          "my": "သူမသည် ယခုပင် မျက်ရည်ကျတော့မည့် မျက်နှာပေးမျိုးဖြင့် ငြိမ်သက်စွာ ရပ်နေခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u6"
  },
  {
    "id": "g-n1-030",
    "pattern": "〜ずくめ",
    "meaning": "Entirely filled with / One good or bad event after another",
    "structure": "[Noun] + ずくめ",
    "explanation": "Conveys a period or entity being completely immersed in one color, good fortune, or continuous bad luck.",
    "formalLevel": "formal",
    "level": "N1",
    "difficulty": 5,
    "examples": [
      {
        "jp": "息子の昇進に孫の誕生と、今年はめでたいことずくめの一年だった。",
        "reading": "むすこの しょうしんに まごの たんじょうと、ことしは めでたいことずくめの いちねんだった。",
        "en": "With my son's promotion and the birth of a grandchild, this year was full of joyous events.",
        "highlight": "ことずくめ",
        "translationsByLang": {
          "en": "With my son's promotion and the birth of a grandchild, this year was full of joyous events.",
          "ja": "息子の昇進に孫の誕生と、今年はめでたいことずくめの一年だった。",
          "my": "သားဖြစ်သူ ရာထူးတိုးခြင်းနှင့် မြေးဦးလေး မွေးဖွားခြင်းတို့ဖြင့် ယခုနှစ်သည် မင်္ဂလာရှိသော သတင်းများချည်း ပြည့်နှက်နေခဲ့ပါတယ်။"
        }
      }
    ],
    "unitId": "n1-u6"
  }
];

const MYANMAR_OVERRIDE_MAP: Record<string, { meaning: string; explanation: string }> = {
  "〜は〜です": {
    "meaning": "A သည် B ဖြစ်ပါသည် (ယဉ်ကျေးသောအဆို)",
    "explanation": "ဂျပန်ဘာသာ၏ အခြေခံဝါကျတည်ဆောက်ပုံဖြစ်သည်။ 「は」(ဝ) သည် အဓိကအကြောင်းအရာကို ပြပြီး 「です」 သည် ဖြစ်ပါသည်ဟု ယဉ်ကျေးစွာ ဖော်ပြသည်။"
  },
  "〜は〜ではありません / じゃありません": {
    "meaning": "A သည် B မဟုတ်ပါ (အငြင်းယဉ်ကျေးအဆို)",
    "explanation": "「です」 ၏ အငြင်းပုံစံဖြစ်သည်။ 「ではありません」 သည် တရားဝင်စာရေးသုံးဖြစ်ပြီး 「じゃありません」 သည် စကားပြောယဉ်ကျေးပုံစံဖြစ်သည်။"
  },
  "〜ですか": {
    "meaning": "...ပါသလား / ...လား (မေးခွန်းပြစကားလုံး)",
    "explanation": "ဝါကျနောက်ဆုံးတွင် 「か」 ထည့်ခြင်းဖြင့် ယဉ်ကျေးသော မေးခွန်းအဖြစ် ပြောင်းလဲပေးသည်။"
  },
  "〜の (所属・修飾)": {
    "meaning": "...၏ / ...မှ (ပိုင်ဆိုင်မှုနှင့် အထူးပြု)",
    "explanation": "ပိုင်ဆိုင်မှု၊ သက်ဆိုင်ရာဌာန သို့မဟုတ် နာမ်တစ်ခုကို နောက်နာမ်တစ်ခုဖြင့် အထူးပြုရာတွင် သုံးသည်။"
  },
  "〜も (同類・付加)": {
    "meaning": "...လည်းပဲ / ...ပါ (ထပ်တူအမျိုးအစားပြ)",
    "explanation": "は၊ が၊ ကို အစားထိုးပြီး အလားတူအခြေအနေဖြစ်ကြောင်း ပြသရာတွင် သုံးသည်။"
  },
  "〜を (直接目的語)": {
    "meaning": "...ကို (တိုက်ရိုက်ကံပုဒ်ပြစကားလုံး)",
    "explanation": "ကံပုဒ်လိုသောကြိယာများ၏ တိုက်ရိုက်သက်ရောက်ရာ နာမ်နောက်တွင် ကပ်သုံးသည်။"
  },
  "〜に / 〜へ (方向・目的地)": {
    "meaning": "...သို့ / ...ဆီသို့ (ဦးတည်ရာနှင့် ဦးတည်ချက်)",
    "explanation": "သွားခြင်း၊ လာခြင်း၊ ပြန်ခြင်း စသည့် ရွေ့လျားကြိယာများ၏ ဦးတည်ရာကို ပြသည်။"
  },
  "〜で (場所・手段)": {
    "meaning": "...တွင် / ...ဖြင့် (ပြုလုပ်ရာနေရာနှင့် နည်းလမ်း)",
    "explanation": "လုပ်ဆောင်ချက်ပြုလုပ်ရာ နေရာ သို့မဟုတ် အသုံးပြုသော ယာဉ်၊ ကိရိယာကို ပြသည်။"
  },
  "〜と (一緒・並列)": {
    "meaning": "...နှင့် / ...နှင့်အတူ (တွဲဖက်နှင့် စုံလင်စွာပြခြင်း)",
    "explanation": "လူတစ်ဦးနှင့်အတူ လုပ်ဆောင်ခြင်း သို့မဟုတ် နာမ်များကို အကုန်အစင်တွဲစပ်ရာတွင် သုံးသည်။"
  },
  "〜から〜まで": {
    "meaning": "...မှ ...အထိ (အချိန်နှင့် နေရာအပိုင်းအခြား)",
    "explanation": "အချိန်၊ ရက်စွဲ သို့မဟုတ် နေရာ၏ အစနှင့် အဆုံးအပိုင်းအခြားကို ဖော်ပြသည်။"
  },
  "〜てください": {
    "meaning": "...ပေးပါ / ...ပါ (ယဉ်ကျေးစွာ တောင်းဆိုခြင်း)",
    "explanation": "ကြိယာ Te-form နောက်တွင် ください တွဲပြီး ယဉ်ကျေးစွာ အကူအညီတောင်းခံရာတွင် သုံးသည်။"
  },
  "〜てはいけません": {
    "meaning": "...မလုပ်ရ / မပြုလုပ်ရပါ (တားမြစ်ချက်)",
    "explanation": "စည်းကမ်းအရ မပြုလုပ်ရသော အရာများကို တင်းကြပ်စွာ တားမြစ်ရာတွင် သုံးသည်။"
  },
  "〜てもいいです": {
    "meaning": "...လုပ်လည်း ရပါသည် (ခွင့်ပြုချက်)",
    "explanation": "တစ်စုံတစ်ခု ပြုလုပ်ရန် ခွင့်ပြုချက်တောင်းခြင်း သို့မဟုတ် ခွင့်ပြုပေးခြင်းတွင် သုံးသည်။"
  },
  "〜なければならない": {
    "meaning": "...လုပ်ရမည် / မလုပ်မဖြစ်လုပ်ရမည် (မဖြစ်မနေတာဝန်)",
    "explanation": "မဖြစ်မနေ လုပ်ဆောင်ရမည့် တာဝန် သို့မဟုတ် လိုအပ်ချက်ကို ဖော်ပြသည်။"
  },
  "〜なくてもいいです": {
    "meaning": "...မလုပ်လည်း ရပါသည် (မလိုအပ်ခြင်း)",
    "explanation": "မဖြစ်မနေ လုပ်ရန်မလိုကြောင်း၊ စိတ်ကြိုက်ရွေးချယ်နိုင်ကြောင်း ဖော်ပြသည်။"
  },
  "〜たいです / 〜たくないです": {
    "meaning": "...ချင်ပါသည် / ...မလုပ်ချင်ပါ (မိမိဆန္ဒပြခြင်း)",
    "explanation": "ပြောသူကိုယ်တိုင် ပြုလုပ်လိုသော သို့မဟုတ် မပြုလုပ်လိုသော ဆန္ဒကို တိုက်ရိုက်ဖော်ပြသည်။"
  },
  "〜ています (進行・状態)": {
    "meaning": "...နေပါသည် (လုပ်ဆောင်ဆဲ သို့မဟုတ် ရလဒ်တည်ရှိမှု)",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု လက်ရှိဖြစ်ပျက်နေခြင်း သို့မဟုတ် လုပ်ဆောင်ပြီးသော အခြေအနေ ဆက်လက်တည်ရှိနေခြင်းကို ပြသည်။"
  },
  "〜ましょう / 〜ましょうか": {
    "meaning": "...ကြရအောင် / ...ပေးရမလား (ဖိတ်ခေါ်ခြင်းနှင့် ကမ်းလှမ်းခြင်း)",
    "explanation": "အတူတကွ ပြုလုပ်ရန် ဖိတ်ခေါ်ခြင်း သို့မဟုတ် မိမိဘက်မှ ကူညီပေးရန် ကမ်းလှမ်းရာတွင် သုံးသည်။"
  },
  "〜まえに (前に)": {
    "meaning": "...မလုပ်မီ / မတိုင်မီ",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု မပြုလုပ်မီ အခြားလုပ်ဆောင်ချက်တစ်ခုကို အရင်လုပ်ကြောင်း ပြသည်။"
  },
  "〜あとで (後で)": {
    "meaning": "...ပြီးနောက် / ပြီးမှ",
    "explanation": "ပထမလုပ်ဆောင်ချက် ပြီးဆုံးသွားပြီးနောက် နောက်လုပ်ဆောင်ချက်တစ်ခု ပြုလုပ်ကြောင်း ပြသည်။"
  },
  "〜から (理由)": {
    "meaning": "...သောကြောင့် / ...မို့လို့ (အကြောင်းပြချက်)",
    "explanation": "အကြောင်းရင်း သို့မဟုတ် အကြောင်းပြချက်ကို ဖော်ပြရာတွင် သုံးသည်။"
  },
  "〜たり〜たりする": {
    "meaning": "...လုပ်လိုက်၊ ...လုပ်လိုက် လုပ်သည် (နမူနာဖော်ပြချက်)",
    "explanation": "လုပ်ဆောင်ချက်များစွာထဲမှ နမူနာအနည်းငယ်ကို ရွေးထုတ်ပြသရာတွင် သုံးသည်။"
  },
  "〜ないでください": {
    "meaning": "...မလုပ်ပါနှင့် (ယဉ်ကျေးစွာ တားမြစ်ခြင်း)",
    "explanation": "တစ်စုံတစ်ခုကို မပြုလုပ်ရန် ယဉ်ကျေးစွာ မေတ္တာရပ်ခံတားမြစ်ရာတွင် သုံးသည်။"
  },
  "〜より〜のほうが (比較)": {
    "meaning": "...ထက် ...က ပို၍ (နှိုင်းယှဉ်ချက်)",
    "explanation": "အရာဝတ္ထုနှစ်ခုကို နှိုင်းယှဉ်ပြီး တစ်ခုက ပို၍ သာလွန်ကြောင်း ဖော်ပြသည်။"
  },
  "〜の中で〜が一番 (最上級)": {
    "meaning": "...များထဲတွင် ...သည် အကောင်းဆုံး / အများဆုံး",
    "explanation": "အုပ်စုတစ်ခု သို့မဟုတ် အရာများထဲတွင် အသာလွန်ဆုံး အဆင့်ကို ဖော်ပြသည်။"
  },
  "〜つもりです": {
    "meaning": "...ရန် ရည်ရွယ်ထားပါသည် (အစီအစဉ်)",
    "explanation": "ပြောသူ၏ ရှေ့လာမည့် အနာဂတ် ရည်ရွယ်ချက် သို့မဟုတ် စီစဉ်ထားမှုကို ဖော်ပြသည်။"
  },
  "〜ながら": {
    "meaning": "...ရင်းနှင့် / ...လုပ်ရင်း (တစ်ပြိုင်နက်လုပ်ဆောင်ချက်)",
    "explanation": "လုပ်ဆောင်ချက်နှစ်ခုကို တစ်ပြိုင်နက်တည်း ပြုလုပ်ရာတွင် သုံးသည်။"
  },
  "〜ことがあります": {
    "meaning": "...ဖူးပါသည် / တစ်ခါတရံ ...တတ်သည်",
    "explanation": "ယခင်က လုပ်ဖူးသော အတွေ့အကြုံ သို့မဟုတ် ရံဖန်ရံခါ ဖြစ်တတ်သောအလေ့ကို ပြသည်။"
  },
  "〜が好きです / 嫌いです": {
    "meaning": "...ကြိုက်ပါသည် / မုန်းပါသည်",
    "explanation": "မိမိ၏ နှစ်သက်မှု သို့မဟုတ် မနှစ်သက်မှုကို ဖော်ပြသည်။"
  },
  "〜が上手です / 下手です": {
    "meaning": "...တော်ပါသည် / ညံ့ပါသည် (ကျွမ်းကျင်မှု)",
    "explanation": "စွမ်းရည် သို့မဟုတ် ကျွမ်းကျင်မှုကို ဖော်ပြရာတွင် သုံးသည်။"
  },
  "〜があります / います": {
    "meaning": "...ရှိပါသည် (သက်မဲ့ / သက်ရှိ)",
    "explanation": "သက်မဲ့အရာဝတ္ထုများအတွက် あります၊ သက်ရှိလူနှင့် တိရစ္ဆာန်များအတွက် います ကို သုံးသည်။"
  },
  "〜に (目的: 〜に行く)": {
    "meaning": "...ရန်အတွက် သွားသည်/လာသည် (ရည်ရွယ်ချက်)",
    "explanation": "သွားရောက်လုပ်ဆောင်မည့် ရည်ရွယ်ချက်ကို ပြသရာတွင် သုံးသည်။"
  },
  "〜でしょう / 〜だろう": {
    "meaning": "...ဖြစ်နိုင်သည် / ...ဖြစ်လိမ့်မည် (ခန့်မှန်းချက်နှင့် သဘောတူညီမှုရယူခြင်း)",
    "explanation": "ဖြစ်နိုင်ခြေရှိသော အခြေအနေကို ခန့်မှန်းဖော်ပြခြင်း သို့မဟုတ် တစ်ဖက်သားထံမှ သဘောတူညီမှု ရယူရာတွင် သုံးသည်။"
  },
  "〜すぎる": {
    "meaning": "...လွန်းသည် / အလွန်အမင်းဖြစ်သည်",
    "explanation": "အတိုင်းအတာတစ်ခုထက် ကျော်လွန်သွားသော အခြေအနေကို ဖော်ပြသည်။"
  },
  "〜とおもう (と思う)": {
    "meaning": "...ဟု ထင်ပါသည် (မိမိအမြင်ယူဆချက်)",
    "explanation": "ပြောသူ၏ ကိုယ်ပိုင်ထင်မြင်ယူဆချက် သို့မဟုတ် တွေးဆမှုကို ဖော်ပြသည်။"
  },
  "〜はずだ": {
    "meaning": "...ဖြစ်သင့်သည် / ဖြစ်ရမည် (ယုတ္တိရှိသောမျှော်လင့်ချက်)",
    "explanation": "ခိုင်လုံသော အထောက်အထားများအပေါ် မူတည်၍ သေချာပေါက် ထိုသို့ဖြစ်လိမ့်မည်ဟု ယူဆရာတွင် သုံးသည်။"
  },
  "〜ことができる / 〜られる (可能形)": {
    "meaning": "...လုပ်နိုင်သည် / စွမ်းဆောင်နိုင်သည် (စွမ်းရည်ပြ)",
    "explanation": "တစ်စုံတစ်ခုကို ပြုလုပ်နိုင်သော စွမ်းရည် သို့မဟုတ် အခြေအနေကို ဖော်ပြသည်။"
  },
  "〜たことがある": {
    "meaning": "...ဖူးပါသည် (အတိတ်အတွေ့အကြုံ)",
    "explanation": "အတိတ်ကာလတွင် ထိုအတွေ့အကြုံရှိဖူးကြောင်း ပြောဆိုရာတွင် သုံးသည်။"
  },
  "〜やすい / 〜にくい": {
    "meaning": "...လုပ်ရလွယ်သည် / ...လုပ်ရခက်သည်",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု ပြုလုပ်ရန် လွယ်ကူမှု သို့မဟုတ် ခက်ခဲမှုကို ဖော်ပြသည်။"
  },
  "〜てしまう": {
    "meaning": "...ပြီးသွားသည် / မတော်တဆဖြစ်သွားသည် (နောင်တနှင့် ပြီးဆုံးမှု)",
    "explanation": "လုပ်ဆောင်ချက် အပြီးအပြတ်ပြီးဆုံးသွားခြင်း သို့မဟုတ် မရည်ရွယ်ဘဲ ဖြစ်သွားသည့်အတွက် စိတ်မကောင်းဖြစ်မှုကို ဖော်ပြသည်။"
  },
  "〜し〜し": {
    "meaning": "...လည်းဖြစ်၊ ...လည်းဖြစ်ပြီး (အကြောင်းပြချက်များ စုပြခြင်း)",
    "explanation": "အကြောင်းပြချက်များ သို့မဟုတ် အရည်အသွေးများစွာကို တစ်ပြိုင်နက် ဖော်ပြသည်။"
  },
  "〜そうだ (様態)": {
    "meaning": "...ပုံရသည် / မည့်ပုံပေါ်သည် (မျက်မြင်အကဲဖြတ်မှု)",
    "explanation": "မျက်စိဖြင့် မြင်တွေ့ရသော အသွင်အပြင်အရ ထိုသို့ဖြစ်တော့မည်ဟု ထင်မြင်ယူဆချက်ကို ပြသည်။"
  },
  "〜そうだ (伝聞)": {
    "meaning": "...ဟု ကြားသိရပါသည် (သတင်းစကားပြန်လည်ပြောကြားခြင်း)",
    "explanation": "အခြားသူများထံမှ သို့မဟုတ် သတင်းများမှ ကြားသိရသော အချက်အလက်ကို ပြန်ပြောပြရာတွင် သုံးသည်။"
  },
  "〜ようだ": {
    "meaning": "...ပုံရသည် / ဖြစ်ဟန်တူသည် (အာရုံခံစားမှုအရ သုံးသပ်ခြင်း)",
    "explanation": "မိမိ၏ အာရုံခံစားချက် သို့မဟုတ် သတင်းအချက်အလက်များအပေါ် အခြေခံ၍ သုံးသပ်ဖော်ပြသည်။"
  },
  "〜らしい": {
    "meaning": "...ပုံရသည် / အမှန်ပင်ဖြစ်ဟန်တူသည်",
    "explanation": "ယုံကြည်စိတ်ချရသော သတင်းများ သို့မဟုတ် ထင်ရှားသော လက္ခဏာများအရ မှန်းဆဖော်ပြသည်။"
  },
  "〜かもしれない": {
    "meaning": "...ဖြစ်ကောင်းဖြစ်နိုင်သည် (ဖြစ်နိုင်ခြေ ၅၀%)",
    "explanation": "တစ်စုံတစ်ခု ဖြစ်ပွားရန် သို့မဟုတ် မှန်ကန်ရန် ဖြစ်နိုင်ခြေ အသင့်အတင့်ရှိကြောင်း ပြသည်။"
  },
  "〜ために (目的・原因)": {
    "meaning": "...အတွက် / ...ကြောင့် (ရည်ရွယ်ချက် သို့မဟုတ် အကြောင်းရင်း)",
    "explanation": "ရည်မှန်းချက်တစ်ခုကို အောင်မြင်ရန်အတွက် သို့မဟုတ် အကြောင်းတရားတစ်ခုကြောင့် ဖြစ်ရသည်ကို ပြသည်။"
  },
  "〜ように (目的)": {
    "meaning": "...နိုင်စေရန် / ...ဖြစ်အောင် (ရည်ရွယ်ချက်)",
    "explanation": "လိုလားအပ်သော အခြေအနေ သို့မဟုတ် ရလဒ်တစ်ခု ရရှိလာစေရန် ရည်ရွယ်ဆောင်ရွက်ရာတွင် သုံးသည်။"
  },
  "〜ば (条件形)": {
    "meaning": "...လျှင် / ...ပါက (အခြေအနေပြဝါကျ)",
    "explanation": "ယေဘုယျကျသော အမှန်တရား သို့မဟုတ် အခြေအနေတစ်ခု ဖြစ်ပေါ်ပါက နောက်ဆက်တွဲရလဒ် ပေါ်ပေါက်မည်ကို ပြသည်။"
  },
  "〜たら": {
    "meaning": "...ပြီးပါက / ...လျှင် (အတိတ်အခြေအနေပြ)",
    "explanation": "အခြေအနေတစ်ခု ပြီးမြောက်သွားပြီးနောက် နောက်တစ်ခုကို ဆက်လက်လုပ်ဆောင်ရာတွင် သုံးသည်။"
  },
  "〜なら": {
    "meaning": "...ဆိုလျှင် / ...နှင့်ပတ်သက်ပြီးဆိုလျှင်",
    "explanation": "တစ်ဖက်သား ပြောကြားသော အကြောင်းအရာကို အခြေခံပြီး အကြံပြုခြင်း သို့မဟုတ် သဘောထားပြောရာတွင် သုံးသည်။"
  },
  "〜ても / 〜でも": {
    "meaning": "...သော်လည်း / ...ရင်တောင်မှ (ဆန့်ကျင်ဘက် အခြေအနေ)",
    "explanation": "ရှေ့က အခြေအနေတစ်ခု ရှိနေသော်လည်း မျှော်လင့်ထားသလို မဖြစ်ဘဲ ဆန့်ကျင်ဘက်ဖြစ်ပေါ်ကြောင်း ပြသည်။"
  },
  "〜られる (受身)": {
    "meaning": "...ခံရသည် (ခံပြကြိယာ)",
    "explanation": "သူတစ်ပါး၏ ပြုလုပ်ခြင်းကို မိမိ သို့မဟုတ် အခြားသူက ခံယူရကြောင်း ပြသည်။"
  },
  "〜させる (使役)": {
    "meaning": "...စေသည် / ...ခိုင်းသည် (ခိုင်းပြကြိယာ)",
    "explanation": "တစ်စုံတစ်ယောက်အား တစ်ခုခုကို ပြုလုပ်စေခြင်း သို့မဟုတ် ခွင့်ပြုပေးခြင်းကို ပြသည်။"
  },
  "〜させられる (使役受身)": {
    "meaning": "...မလွှဲမရှောင်သာ အတင်းလုပ်ရသည် (ခိုင်းခံရခြင်း)",
    "explanation": "မိမိစိတ်ဆန္ဒမပါဘဲ သူတစ်ပါး၏ စေခိုင်းမှုကြောင့် မဖြစ်မနေ လုပ်ဆောင်ရကြောင်း ဖော်ပြသည်။"
  },
  "〜てあげる / 〜てやる": {
    "meaning": "...လုပ်ပေးသည် (သူတစ်ပါးအတွက် ကူညီဆောင်ရွက်ပေးခြင်း)",
    "explanation": "သူတစ်ပါး အဆင်ပြေစေရန်အတွက် မိမိဘက်မှ ကူညီလုပ်ဆောင်ပေးကြောင်း ပြသည်။"
  },
  "〜てもらう / 〜ていただく": {
    "meaning": "...လုပ်ပေးခြင်းခံရသည် / ...အလုပ်ခိုင်းသည်",
    "explanation": "သူတစ်ပါးထံမှ ကူညီဆောင်ရွက်ပေးမှုကို မိမိက လက်ခံရရှိကြောင်း ပြသည်။"
  },
  "〜てくれる / 〜てくださる": {
    "meaning": "...လုပ်ပေးပါသည် (မိမိအတွက် သူတစ်ပါးက စေတနာဖြင့် လုပ်ပေးခြင်း)",
    "explanation": "သူတစ်ပါးက မိမိ၏အကျိုးအတွက် စေတနာဖြင့် ကူညီလုပ်ဆောင်ပေးကြောင်း ဖော်ပြသည်။"
  },
  "〜ていく / 〜てくる": {
    "meaning": "...သွားသည် / ...လာသည် (အချိန်နှင့် ဦးတည်ချက်ပြောင်းလဲမှု)",
    "explanation": "အတိတ်မှ ယခုအထိ သို့မဟုတ် ယခုမှ အနာဂတ်သို့ ပြောင်းလဲတိုးတက်သွားမှုကို ပြသည်။"
  },
  "〜かた (方)": {
    "meaning": "...ပြုလုပ်နည်း / ...နည်းလမ်း",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု ပြုလုပ်ပုံ ပြုလုပ်နည်းလမ်းကို နာမ်အဖြစ် ပြောင်းလဲဖော်ပြသည်။"
  },
  "〜たほうがいい / 〜ないほうがいい": {
    "meaning": "...လုပ်တာ ပိုကောင်းသည် / မလုပ်တာ ပိုကောင်းသည် (အကြံပြုချက်)",
    "explanation": "တစ်ဖက်သားအား ကောင်းမွန်သော အကြံဉာဏ် သို့မဟုတ် သတိပေးချက် ပေးရာတွင် သုံးသည်။"
  },
  "〜くなる / 〜になる": {
    "meaning": "...ဖြစ်လာသည် / ပြောင်းလဲသွားသည်",
    "explanation": "အခြေအနေတစ်ခုမှ အခြားအခြေအနေအသစ်တစ်ခုသို့ သဘာဝအလျောက် ကူးပြောင်းသွားမှုကို ပြသည်။"
  },
  "〜ようにする": {
    "meaning": "...ဖြစ်အောင် ကြိုးစားသည် / အလေ့အထလုပ်သည်",
    "explanation": "အလေ့အကျင့်ကောင်းတစ်ခု ဖြစ်လာစေရန် အသိစိတ်ဖြင့် ကြိုးပမ်းအားထုတ်မှုကို ပြသည်။"
  },
  "〜ようとする": {
    "meaning": "...လုပ်ရန် ကြိုးစားသည် / ...လုပ်ခါနီးဆဲဆဲ",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခုကို ပြုလုပ်ရန် စတင်ကြိုးပမ်းဆဲ သို့မဟုတ် ပြုလုပ်ခါနီး အချိန်ကို ပြသည်။"
  },
  "〜かどうか": {
    "meaning": "...ဟုတ်သလား မဟုတ်ဘူးလား",
    "explanation": "ဝါကျတစ်ခုအတွင်းသို့ ဟုတ်/မဟုတ် မေးခွန်းကို ထည့်သွင်းဖော်ပြရာတွင် သုံးသည်။"
  },
  "〜か (間接疑問)": {
    "meaning": "...မည်သူ/မည်သည့်အရာ စသည်ဖြင့် (သွယ်ဝိုက်မေးခွန်း)",
    "explanation": "မေးခွန်းစကားလုံးပါသော မေးခွန်းကို အခြားဝါကျတစ်ခုနှင့် ချိတ်ဆက်ရာတွင် သုံးသည်။"
  },
  "〜てみる": {
    "meaning": "...စမ်းကြည့်သည် (စမ်းသပ်လုပ်ဆောင်ချက်)",
    "explanation": "မည်သို့ဖြစ်မည်ကို သိရှိရန်အတွက် စမ်းသပ်လုပ်ဆောင်ကြည့်ရာတွင် သုံးသည်။"
  },
  "〜ておく": {
    "meaning": "...ကြိုတင်လုပ်ထားသည် / ထားရှိသည်",
    "explanation": "နောင်လာမည့် အစီအစဉ်အတွက် ကြိုတင်ပြင်ဆင်ခြင်း သို့မဟုတ် မူလအတိုင်း ထားရှိခြင်းကို ပြသည်။"
  },
  "〜敬語 (尊敬語: お〜になる)": {
    "meaning": "...ပြုလုပ်တော်မူသည် (လေးစားသမှုပြ ရိုသေစကား)",
    "explanation": "လူကြီးမိဘ၊ ဆရာသမား သို့မဟုတ် ဧည့်သည်တော်များ၏ လုပ်ဆောင်ချက်ကို အလွန်ရိုသေစွာ ဖော်ပြသည်။"
  },
  "〜敬語 (謙譲語: お〜する)": {
    "meaning": "...ပြုလုပ်ပါရစေ (နှိမ့်ချသမှုပြ ရိုသေစကား)",
    "explanation": "မိမိကိုယ်ကို နှိမ့်ချပြီး တစ်ဖက်သားကို လေးစားကြောင်း ဖော်ပြရာတွင် သုံးသည်။"
  },
  "〜ば〜ほど": {
    "meaning": "...လေလေ ...ဖြစ်လေလေ",
    "explanation": "အခြေအနေတစ်ခု ပိုမိုတိုးတက်လာသည်နှင့်အမျှ အခြားရလဒ်တစ်ခုလည်း လိုက်ပါပြောင်းလဲလာမှုကို ပြသည်။"
  },
  "〜がる / 〜がっている": {
    "meaning": "...ဟန်ပြသည် / ...ခံစားချက်ပြသနေသည် (တတိယလူ၏ ခံစားချက်)",
    "explanation": "အခြားသူတစ်ဦး၏ မျက်မြင်တွေ့ရသော စိတ်ခံစားမှု သို့မဟုတ် လိုအင်ဆန္ဒကို ဖော်ပြသည်။"
  },
  "〜とおもう (意向形+と思う)": {
    "meaning": "...လုပ်မည်ဟု စိတ်ကူးထားပါသည် (ရည်ရွယ်ချက်)",
    "explanation": "မိမိကိုယ်တိုင် ပြုလုပ်ရန် စိတ်ကူးရှိနေကြောင်းကို ဖော်ပြသည်။"
  },
  "〜だけでなく": {
    "meaning": "...တင်မကဘဲ / သာမက",
    "explanation": "တစ်ခုတည်းသာမက အခြားအရာများလည်း ပါဝင်ကြောင်းကို ထပ်လောင်းဖော်ပြသည်။"
  },
  "〜までに (期限)": {
    "meaning": "...မတိုင်မီ နောက်ဆုံးထား၍ (နောက်ဆုံးသတ်မှတ်ချိန်)",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု ပြီးစီးရမည့် နောက်ဆုံးအချိန်အပိုင်းအခြားကို သတ်မှတ်ဖော်ပြသည်။"
  },
  "〜はずがない": {
    "meaning": "လုံးဝမဖြစ်နိုင်ပါ / ဘယ်လိုမှ မဖြစ်နိုင်ပါ (ခိုင်မာစွာငြင်းဆိုချက်)",
    "explanation": "အချက်အလက်များအရ ထိုသို့ဖြစ်ရန် လုံးဝမဖြစ်နိုင်ကြောင်း ခိုင်မာပြတ်သားစွာ ငြင်းဆိုရာတွင် သုံးသည်။"
  },
  "〜はずだった": {
    "meaning": "...ဖြစ်ရမည်ဟု ရည်ရွယ်ခဲ့သော်လည်း (မျှော်လင့်ထားသလို မဖြစ်ခဲ့ခြင်း)",
    "explanation": "အမှန်တကယ်တွင် ထိုသို့ဖြစ်ရမည်ဟု စီစဉ်ထားခဲ့သော်လည်း လက်တွေ့တွင် မဖြစ်မြောက်ခဲ့ကြောင်း ဖော်ပြသည်။"
  },
  "〜わけだ": {
    "meaning": "ဒါကြောင့်မို့လို့ဖြစ်သည် / သဘာဝကျစွာဖြစ်သည် (ယုတ္တိရှိသောကောက်ချက်)",
    "explanation": "အကြောင်းရင်း သို့မဟုတ် အချက်အလက်များအပေါ် အခြေခံ၍ သဘာဝကျစွာ ထိုသို့ဖြစ်ရသည်ဟု သဘောပေါက်နားလည်မှုကို ဖော်ပြသည်။"
  },
  "〜わけがない": {
    "meaning": "အကြောင်းရင်းမရှိပါ / ဘယ်လိုမှ မဖြစ်နိုင်ပါ",
    "explanation": "ယုတ္တိအရ စဉ်းစားလျှင် ထိုသို့ဖြစ်ရန် အကြောင်းမရှိကြောင်း အပြည့်အဝ ယုံကြည်ချက်ဖြင့် ငြင်းဆိုသည်။"
  },
  "〜わけではない": {
    "meaning": "ထိုသို့ချည်းတော့ မဟုတ်ပါ / မဖြစ်မနေ ထိုသို့တော့ မဟုတ်ပါ",
    "explanation": "အလုံးစုံ မှန်ကန်သည်ဟု ယူဆထားခြင်းကို အနည်းငယ်ဖြေလျှော့ပြီး မဖြစ်မနေ ထိုသို့မဟုတ်ကြောင်း ဖော်ပြသည်။"
  },
  "〜わけにはいかない": {
    "meaning": "...လုပ်ဖို့ မဖြစ်နိုင်ပါ (လူမှုရေးနှင့် ကိုယ်ကျင့်တရားအရ မလုပ်သင့်ခြင်း)",
    "explanation": "လူမှုရေးစည်းကမ်း၊ ကိုယ်ကျင့်တရား သို့မဟုတ် တာဝန်အရ ထိုသို့မပြုလုပ်နိုင်ကြောင်း ဖော်ပြသည်။"
  },
  "〜に対して (にたいして)": {
    "meaning": "...နှင့် ဆန့်ကျင်ဘက်အားဖြင့် / ...အပေါ်တွင်",
    "explanation": "အရာနှစ်ခု၏ ဆန့်ကျင်ဘက်လက္ခဏာကို နှိုင်းယှဉ်ပြခြင်း သို့မဟုတ် တစ်စုံတစ်ယောက်အပေါ် သဘောထားကို ပြသည်။"
  },
  "〜において / における": {
    "meaning": "...တွင် / ...၌ (တရားဝင်နေရာ သို့မဟုတ် ကဏ္ဍ)",
    "explanation": "သမိုင်းခေတ်ကာလ၊ ညီလာခံ သို့မဟုတ် သုတေသနနယ်ပယ် စသည့် တရားဝင်အခြေအနေများတွင် နေရာပြရန် သုံးသည်။"
  },
  "〜に関して / に関する": {
    "meaning": "...နှင့် ပတ်သက်၍ / ...နှင့် သက်ဆိုင်သော",
    "explanation": "ဆွေးနွေးပြောဆိုနေသော အဓိက အကြောင်းအရာ သို့မဟုတ် ကိစ္စရပ်ကို တရားဝင်ဖော်ပြသည်။"
  },
  "〜について / についての": {
    "meaning": "...အကြောင်း / ...နှင့် ပတ်သက်ပြီး",
    "explanation": "စာရေးသားခြင်း၊ ပြောဆိုခြင်း သို့မဟုတ် စဉ်းစားတွေးခေါ်ခြင်း၏ အကြောင်းအရာကို ဖော်ပြသည်။"
  },
  "〜によって / による": {
    "meaning": "...အားဖြင့် / ...ကြောင့် / ...အလိုက် ကွဲပြားသည်",
    "explanation": "အကြောင်းရင်း၊ နည်းလမ်း၊ သို့မဟုတ် အခြေအနေအလိုက် ပြောင်းလဲကွဲပြားမှုကို ဖော်ပြသည်။"
  },
  "〜に違いない": {
    "meaning": "...ဖြစ်ရမည် / သေချာပေါက်ဖြစ်သည် (ခိုင်မာသောယုံကြည်ချက်)",
    "explanation": "အထောက်အထားများအပေါ် အခြေခံပြီး ပြောသူ၏ ခိုင်မာသော ယုံကြည်စိတ်ကို ဖော်ပြသည်။"
  },
  "〜ばかりか / ばかりでなく": {
    "meaning": "...တင်မကဘဲ ပို၍ပင် / သာမက",
    "explanation": "တစ်ခုတည်းတွင် ကန့်သတ်မနေဘဲ နောက်ထပ် အံ့အားသင့်ဖွယ် အဆင့်အထိ တိုးချဲ့ဖော်ပြသည်။"
  },
  "〜につれて / にしたがって": {
    "meaning": "...တိုးတက်လာသည်နှင့်အမျှ ...လိုက်ပါပြောင်းလဲသည်",
    "explanation": "အခြေအနေတစ်ခု အချိန်နှင့်အမျှ ပြောင်းလဲလာသည်နှင့်အမျှ နောက်တစ်ခုလည်း အချိုးကျ ပြောင်းလဲလာမှုကို ပြသည်။"
  },
  "〜とおりに (通りに)": {
    "meaning": "...အတိုင်း အတိအကျ / ...ကဲ့သို့ပင်",
    "explanation": "ညွှန်ကြားချက်၊ အစီအစဉ် သို့မဟုတ် နမူနာအတိုင်း တိကျစွာ လိုက်နာဆောင်ရွက်ကြောင်း ဖော်ပြသည်။"
  },
  "〜たびに": {
    "meaning": "...တိုင်း / ...အခါတိုင်း",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု ပြုလုပ်တိုင်း ထိုရလဒ် အမြဲတမ်း ပေါ်ပေါက်လာကြောင်း ဖော်ပြသည်။"
  },
  "〜を中心に / を中心として": {
    "meaning": "...ကို အဓိကထား၍ / ဗဟိုပြု၍",
    "explanation": "အဓိက ဦးဆောင်သူ သို့မဟုတ် အဓိက အာရုံစိုက်ရာ အချက်ကို သတ်မှတ်ဖော်ပြသည်။"
  },
  "〜おかげで": {
    "meaning": "...ကျေးဇူးကြောင့် (ကောင်းမွန်သောရလဒ်)",
    "explanation": "အကူအညီ သို့မဟုတ် အကြောင်းရင်းတစ်ခုကြောင့် ကောင်းမွန်သောရလဒ် ရရှိခဲ့သည့်အတွက် ကျေးဇူးတင်စွာ ဖော်ပြသည်။"
  },
  "〜せいで / せいか": {
    "meaning": "...ကြောင့်မို့လို့ (မကောင်းသောရလဒ်)",
    "explanation": "မကောင်းသော အကျိုးဆက် သို့မဟုတ် အမှားအယွင်းကို အကြောင်းတရားတစ်ခုအပေါ် အပြစ်တင်ဖော်ပြသည်။"
  },
  "〜たばかり": {
    "meaning": "...ပြီးခါစလေးပဲ ရှိသေးသည်",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု ပြီးဆုံးသွားသည်မှာ မကြာသေးမီကပင် ဖြစ်ကြောင်း စိတ်ခံစားမှုဖြင့် ဖော်ပြသည်။"
  },
  "〜たところ": {
    "meaning": "...ကြည့်လိုက်သောအခါ / ...လုပ်လိုက်တော့",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု ပြုလုပ်လိုက်သောအခါ မမျှော်လင့်သော ရလဒ် သို့မဟုတ် အချက်အလက်သစ် သိရှိသွားကြောင်း ပြသည်။"
  },
  "〜ところに / 〜ところへ": {
    "meaning": "...လုပ်နေဆဲဆဲ အချိန်တွင်",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု ပြုလုပ်နေသော အခိုက်အတန့်တွင် မမျှော်လင့်ဘဲ အခြားအရာတစ်ခု ဖြစ်ပေါ်လာမှုကို ပြသည်။"
  },
  "〜きる (切る) / きれない": {
    "meaning": "အပြီးအပြတ်လုပ်သည် / အကုန်မလုပ်နိုင်ပါ",
    "explanation": "အဆုံးအထိ အပြည့်အဝ လုပ်ဆောင်နိုင်ခြင်း သို့မဟုတ် များပြားလွန်းသဖြင့် အကုန်မလုပ်နိုင်ခြင်းကို ပြသည်။"
  },
  "〜かけ / かける": {
    "meaning": "...လုပ်လက်စ / မပြီးသေးသော",
    "explanation": "စတင်ပြုလုပ်ထားသော်လည်း မပြီးဆုံးသေးဘဲ တစ်ဝက်တစ်ပျက် ကျန်ရှိနေမှုကို ပြသည်။"
  },
  "〜っぱなし": {
    "meaning": "...ထားခဲ့သည် (မပြီးပြတ်ဘဲ ပစ်ထားခြင်း)",
    "explanation": "ပုံမှန်အခြေအနေသို့ ပြန်မထားဘဲ မပြီးမပြတ် ပစ်ထားသည့်အတွက် ပြစ်တင်ဝေဖန်ရာတွင် သုံးသည်။"
  },
  "〜だらけ": {
    "meaning": "...တွေချည်းပဲ / ပေပွနေသည် (မလိုလားအပ်သော အရာများ)",
    "explanation": "အမှားများ၊ ရွှံ့များ၊ သို့မဟုတ် အမှိုက်များဖြင့် ပြည့်နှက်နေသောအခြေအနေကို ဖော်ပြသည်။"
  },
  "〜ぎみ (気味)": {
    "meaning": "...နည်းနည်းဖြစ်ချင်သလို / ခံစားရသလို",
    "explanation": "ဖျားချင်သလို သို့မဟုတ် မအီမသာဖြစ်ချင်သလို အနည်းငယ်ခံစားရသော အခြေအနေကို ဖော်ပြသည်။"
  },
  "〜がち": {
    "meaning": "...ဖြစ်တတ်သည် / အလေ့အထရှိသည်",
    "explanation": "မကြာခဏ မရည်ရွယ်ဘဲ ဖြစ်ပေါ်တတ်သော မလိုလားအပ်သည့် အလေ့အထကို ဖော်ပြသည်။"
  },
  "〜っぽい": {
    "meaning": "...ဆန်သည် / ...ဟန်ပေါက်သည်",
    "explanation": "အခြားအရာတစ်ခု၏ သဘောသဘာဝ သို့မဟုတ် အသွင်အပြင် ပါဝင်နေကြောင်း ဖော်ပြသည်။"
  },
  "〜ふりをする": {
    "meaning": "...ဟန်ဆောင်သည်",
    "explanation": "အမှန်တကယ် မဟုတ်ဘဲ ထိုသို့ဖြစ်သယောင် ဟန်ဆောင်ပြုမူမှုကို ဖော်ပြသည်။"
  },
  "〜わりに (割に)": {
    "meaning": "...နှင့် နှိုင်းယှဉ်လျှင် မမျှော်လင့်ဘဲ",
    "explanation": "ပေးထားသော အခြေအနေနှင့် နှိုင်းယှဉ်ပါက မျှော်လင့်ထားသည်ထက် ပို၍ ထူးခြားနေမှုကို ပြသည်။"
  },
  "〜くせに": {
    "meaning": "...လျက်နှင့် / ဖြစ်ပါလျက်နှင့် (အပြစ်တင်ရှုတ်ချသံ)",
    "explanation": "အခြေအနေတစ်ခု ရှိပါလျက်နှင့် သင့်လျော်သလို မပြုမူသည့်အတွက် မကျေမနပ် ဝေဖန်ရာတွင် သုံးသည်။"
  },
  "〜たとたん (途端)": {
    "meaning": "...လိုက်သည်နှင့် တစ်ပြိုင်နက်",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခု ပြုလုပ်လိုက်သည့် ချက်ချင်းအခိုက်အတန့်တွင် မမျှော်လင့်ဘဲ နောက်တစ်ခု ဖြစ်ပေါ်လာမှုကို ပြသည်။"
  },
  "〜た末に (末に)": {
    "meaning": "အကြာကြီး စဉ်းစားပြီးနောက် နောက်ဆုံးတွင်",
    "explanation": "အချိန်အတော်ကြာ ကြိုးစားအားထုတ် သို့မဟုတ် ဆွေးနွေးပြီးနောက် နောက်ဆုံးရလဒ် ထွက်ပေါ်လာမှုကို ပြသည်။"
  },
  "〜うちに": {
    "meaning": "...နေစဉ်အတောအတွင်း / မပြောင်းလဲမီ",
    "explanation": "အခြေအနေ ကောင်းမွန်နေဆဲ အချိန်မကုန်မီ လုပ်ဆောင်သင့်ကြောင်း တိုက်တွန်းရာတွင် သုံးသည်။"
  },
  "〜最中に (さいちゅうに)": {
    "meaning": "...လုပ်နေဆဲ အလယ်ခေါင်တွင်",
    "explanation": "အရေးကြီးသော အလုပ်တစ်ခု ပြုလုပ်နေဆဲ အချိန်တွင် အနှောင့်အယှက် ပေါ်ပေါက်လာမှုကို ဖော်ပြသည်။"
  },
  "〜から〜にかけて": {
    "meaning": "...မှသည် ...တိုင်အောင် (အပိုင်းအခြား)",
    "explanation": "အချိန် သို့မဟုတ် နေရာတစ်လျှောက် အဆက်မပြတ် ဆက်စပ်ဖြစ်ပေါ်နေမှုကို ပြသည်။"
  },
  "〜にかけては": {
    "meaning": "...နှင့် ပတ်သက်လာလျှင် (ထူးချွန်ကျွမ်းကျင်မှု)",
    "explanation": "သတ်မှတ်ထားသော နယ်ပယ်တစ်ခုတွင် မိမိ၏ ထူးချွန်ကျွမ်းကျင်မှုကို အထူးပြုဖော်ပြသည်။"
  },
  "〜として / としての": {
    "meaning": "...အနေဖြင့် / ...အရည်အချင်းဖြင့်",
    "explanation": "တရားဝင်ရာထူး၊ အဆင့်အတန်း သို့မဟုတ် အခန်းကဏ္ဍကို ဖော်ပြရာတွင် သုံးသည်။"
  },
  "〜に反して / 反する": {
    "meaning": "...နှင့် ဆန့်ကျင်ဘက်အားဖြင့်",
    "explanation": "မျှော်လင့်ထားမှု သို့မဟုတ် စည်းမျဉ်းများနှင့် လုံးဝဆန့်ကျင်ဘက် ဖြစ်ပေါ်လာမှုကို ပြသည်။"
  },
  "〜に基づいて / 基づく": {
    "meaning": "...အပေါ် အခြေခံ၍ / အခြေပြု၍",
    "explanation": "ခိုင်လုံသော အချက်အလက်၊ ဥပဒေ သို့မဟုတ် သုတေသနရလဒ်များကို အခြေပြုဆောင်ရွက်ကြောင်း ပြသည်။"
  },
  "〜をもとに (元に)": {
    "meaning": "...ကို အရင်းခံ၍ / မူရင်းထား၍",
    "explanation": "မူရင်းအကြောင်းအရာ သို့မဟုတ် အဖြစ်အပျက်ကို အခြေခံပြီး ဖန်တီးတီထွင်မှုကို ပြသည်။"
  },
  "〜反面 (はんめん)": {
    "meaning": "တစ်ဖက်တွင်မူ ...ဆန့်ကျင်ဘက်အားဖြင့်",
    "explanation": "အရာဝတ္ထုတစ်ခုတည်း၏ ဆန့်ကျင်ဘက် ရှုထောင့်နှစ်ခုကို ချိန်ဆဖော်ပြသည်။"
  },
  "〜一方 (いっぽう)": {
    "meaning": "တစ်ဖက်တွင်မူ / တစ်ပြိုင်နက်တည်းတွင်",
    "explanation": "ဖြစ်ရပ်နှစ်ခု တစ်ပြိုင်နက် ယှဉ်တွဲဖြစ်ပေါ်နေခြင်း သို့မဟုတ် ဦးတည်ရာတစ်ခုတည်းသို့ ဆက်တိုက်ပြောင်းလဲမှုကို ပြသည်။"
  },
  "〜べきだ / べきではない": {
    "meaning": "...သင့်သည် / မလုပ်သင့်ပါ (ကိုယ်ကျင့်တရားအရ ဝတ္တရား)",
    "explanation": "လူမှုကျင့်ဝတ် သို့မဟုတ် သာမန်အသိတရားအရ မဖြစ်မနေ ပြုလုပ်သင့်သည်များကို ဖော်ပြသည်။"
  },
  "〜に際して / にあたって": {
    "meaning": "...အခမ်းအနားတွင် / မစတင်မီ (တရားဝင်စတင်ခြင်း)",
    "explanation": "အရေးကြီးသော အခမ်းအနား သို့မဟုတ် အစီအစဉ်ကြီး စတင်ချိန်တွင် တရားဝင်သုံးသည်။"
  },
  "〜からして": {
    "meaning": "...ကြည့်ရုံနှင့်ပင် (အကဲဖြတ်လက္ခဏာ)",
    "explanation": "သာမန်လက္ခဏာတစ်ခုကို ကြည့်ရုံနှင့်ပင် အလုံးစုံကို ခန့်မှန်းနိုင်ကြောင်း ဖော်ပြသည်။"
  },
  "〜つつある": {
    "meaning": "တဖြည်းဖြည်း ...ပြောင်းလဲနေဆဲဖြစ်သည်",
    "explanation": "မျက်မြင်တွေ့ရသော အပြောင်းအလဲတစ်ခု တဖြည်းဖြည်းချင်း ဆက်လက်ဖြစ်ပေါ်နေဆဲဖြစ်ကြောင်း ပြသည်။"
  },
  "〜ざるを得ない": {
    "meaning": "မဖြစ်မနေ လုပ်ဆောင်ရမည် / မလုပ်ဘဲမနေနိုင်ပါ",
    "explanation": "မိမိဆန္ဒမပါသော်လည်း အခြေအနေအရ မလွှဲမရှောင်သာ လုပ်ရကြောင်း ပြသည်။"
  },
  "〜にほかならない": {
    "meaning": "...မှတစ်ပါး အခြားမဟုတ်ပါ (တစ်ခုတည်းသော အကြောင်းရင်း)",
    "explanation": "သတ်မှတ်ထားသော အချက်သည်သာ တစ်ခုတည်းသော အကြောင်းရင်းအစစ်အမှန်ဖြစ်ကြောင်း အခိုင်အမာပြသည်။"
  },
  "〜に即して (にそくして)": {
    "meaning": "...နှင့်အညီ / လက်တွေ့အချက်အလက်အတိုင်း",
    "explanation": "လက်တွေ့အခြေအနေ သို့မဟုတ် ဥပဒေစည်းမျဉ်းများကို တိကျစွာလိုက်နာကြောင်း ဖော်ပြသည်။"
  },
  "〜を踏まえて (をふまえて)": {
    "meaning": "...အတွေ့အကြုံကို ထည့်သွင်းစဉ်းစား၍",
    "explanation": "ယခင်သင်ခန်းစာ သို့မဟုတ် အကြံပြုချက်များကို အခြေခံပြီး နောက်တစ်ဆင့်ကို တည်ဆောက်သည်။"
  },
  "〜を問わず (をとわず)": {
    "meaning": "...မခွဲခြားဘဲ / အကန့်အသတ်မရှိ",
    "explanation": "အသက်အရွယ်၊ ကျား/မ သို့မဟုတ် နိုင်ငံမရွေး အားလုံးနှင့် သက်ဆိုင်ကြောင်း ပြသည်။"
  },
  "〜を契機に / を契機として": {
    "meaning": "...ကို အခွင့်အလမ်းအဖြစ်ယူ၍ / အလှည့်အပြောင်းအဖြစ်",
    "explanation": "အဖြစ်အပျက်တစ်ခုကို အနာဂတ်ပြောင်းလဲမှုအတွက် အရေးပါသော အလှည့်အပြောင်းအဖြစ် သုံးသည်။"
  },
  "〜を皮切りに (をかわきりに)": {
    "meaning": "...မှ စတင်၍ ဆက်တိုက်ဆိုသလို",
    "explanation": "ပထမဆုံး လုပ်ဆောင်ချက်မှ စတင်ပြီး ဆက်တိုက်တိုးချဲ့ဖြစ်ပေါ်မှုကို ပြသည်။"
  },
  "〜をものともせずに": {
    "meaning": "အခက်အခဲကို အမှုမထားဘဲ / ရဲဝံ့စွာ",
    "explanation": "ကြီးမားသော ဘေးအန္တရာယ် သို့မဟုတ် အခက်အခဲကို ရင်ဆိုင်ကျော်လွှားကြောင်း ချီးကျူးဖော်ပြသည်။"
  },
  "〜を余儀なくされる (をよぎなくされる)": {
    "meaning": "မလွှဲမရှောင်သာ အတင်းအကျပ် ကြုံတွေ့ရသည်",
    "explanation": "သဘာဝဘေး သို့မဟုတ် အကျပ်အတည်းကြောင့် ခက်ခဲသောအခြေအနေသို့ ရောက်ရှိသွားရမှုကို ပြသည်။"
  },
  "〜に堪えない / に堪える": {
    "meaning": "ကြည့်ရက်စရာမရှိပါ / ကြည့်ရှုထိုက်ပါသည်",
    "explanation": "ဆိုးရွားလွန်းသဖြင့် မကြည့်ရက်နိုင်ခြင်း သို့မဟုတ် အလွန်တန်ဖိုးရှိသဖြင့် ကြည့်ရှုထိုက်ကြောင်း ပြသည်။"
  },
  "〜に値する (にあたいする)": {
    "meaning": "...နှင့် ထိုက်တန်ပါသည် / ထိုက်တန်သော",
    "explanation": "ချီးကျူးမှု သို့မဟုတ် ဆုတံဆိပ်နှင့် ထိုက်တန်သော စွမ်းဆောင်ရည်ဖြစ်ကြောင်း အတည်ပြုသည်။"
  },
  "〜に相違ない (にそういない)": {
    "meaning": "သေချာပေါက်ဖြစ်သည် / သံသယဖြစ်ဖွယ်မရှိပါ",
    "explanation": "အထောက်အထားများအရ သံသယဖြစ်ဖွယ်မရှိ မှန်ကန်ကြောင်း တရားဝင်ရေးသားဖော်ပြသည်။"
  },
  "〜にすぎない": {
    "meaning": "...မျှသာဖြစ်သည် / အနည်းငယ်မျှသာ",
    "explanation": "အဆင့်အတန်း သို့မဟုတ် ပမာဏ နိမ့်ကျကြောင်းကို သာမန်မျှသာဖြစ်သည်ဟု ဖော်ပြသည်။"
  },
  "〜げ (ありげ / 悲しげ)": {
    "meaning": "...ဟန်ပန်ပေါက်သော / ...အသွင်အပြင်ရှိသော",
    "explanation": "အခြားသူ၏ မျက်နှာအမူအရာ သို့မဟုတ် စိတ်ခံစားမှု အသွင်အပြင်ကို ဖော်ပြသည်။"
  },
  "〜つつも": {
    "meaning": "သိပါလျက်နှင့် / သော်လည်း",
    "explanation": "မှားယွင်းကြောင်း သိပါလျက် ဆန့်ကျင်ဘက်လုပ်မိသော စိတ်တွင်းပဋိပက္ခကို ဖော်ပြသည်။"
  },
  "〜ぬく (抜き)": {
    "meaning": "အဆုံးအထိ ဇွဲဖြင့် ပြီးမြောက်အောင်လုပ်သည်",
    "explanation": "ကြီးမားသော အခက်အခဲများကို ကျော်ဖြတ်ပြီး အဆုံးထိ အောင်မြင်အောင် လုပ်ဆောင်မှုကို ပြသည်။"
  },
  "〜ずにはいられない": {
    "meaning": "မလုပ်ဘဲ မနေနိုင်ပါ / စိတ်မထိန်းနိုင်ပါ",
    "explanation": "စိတ်တွင်းလှုံ့ဆော်မှု ပြင်းထန်လွန်းသဖြင့် မလုပ်ဘဲ မနေနိုင်သောအခြေအနေကို ဖော်ပြသည်။"
  },
  "〜ないではいられない": {
    "meaning": "မကူညီဘဲ မနေနိုင်ပါ / မခံစားဘဲ မနေနိုင်ပါ",
    "explanation": "အခြေအနေအရ စိတ်မထိန်းနိုင်ဘဲ လုပ်ဆောင်လိုက်ရမှုကို ပြသည်။"
  },
  "〜かねる": {
    "meaning": "...ပြုလုပ်ရန် ခက်ခဲပါသည် (ယဉ်ကျေးစွာ ငြင်းပယ်ခြင်း)",
    "explanation": "ကူညီလိုသော်လည်း အခြေအနေအရ မတတ်သာသဖြင့် ယဉ်ကျေးစွာ ငြင်းပယ်ရာတွင် သုံးသည်။"
  },
  "〜かねない": {
    "meaning": "...ဆိုးကျိုးဖြစ်ပေါ်သွားနိုင်သည်",
    "explanation": "ပေါ့ဆမှုကြောင့် ကြီးမားသောအန္တရာယ် ဖြစ်ပေါ်သွားနိုင်ကြောင်း သတိပေးသည်။"
  },
  "〜おそれがある (恐れがある)": {
    "meaning": "...ဖြစ်ပေါ်နိုင်သော စိုးရိမ်ရသည့် အန္တရာယ်ရှိသည်",
    "explanation": "သဘာဝဘေး သို့မဟုတ် အန္တရာယ်ဖြစ်နိုင်ခြေကို တရားဝင်သတိပေးရာတွင် သုံးသည်။"
  },
  "〜次第だ / 次第で": {
    "meaning": "...အပေါ် မူတည်သည် / ထိုသို့ဖြစ်ရခြင်းအကြောင်းမှာ",
    "explanation": "ရလဒ်သည် အချက်တစ်ခုပေါ် မူတည်ကြောင်း သို့မဟုတ် အကြောင်းရင်းကို ရှင်းပြရာတွင် သုံးသည်။"
  },
  "〜上は (じょうは)": {
    "meaning": "ဤသို့ဖြစ်လာသည့်အထက်ဝယ် / ဆုံးဖြတ်ပြီးမှတော့",
    "explanation": "တာဝန်ယူပြီးသည့်နောက် အဆုံးထိ တာဝန်ကျေရမည်ဟူသော သန္နိဋ္ဌာန်ကို ဖော်ပြသည်။"
  },
  "〜以上 (いじょうは)": {
    "meaning": "လက်ခံပြီးသည့်နောက် / ဤသို့ဖြစ်သည့်အလျောက်",
    "explanation": "ဆုံးဖြတ်ပြီးသည်နှင့် သဘာဝကျသော တာဝန်ဝတ္တရားကို မလွဲမသွေ ဆောင်ရွက်ရမည်ကို ပြသည်။"
  },
  "〜折に / 折の": {
    "meaning": "...အခွင့်ကြုံသည့်အခါ / အခါသမယတွင်",
    "explanation": "စီးပွားရေးနှင့် နှုတ်ခွန်းဆက်ရာတွင် သုံးသော အလွန်ယဉ်ကျေးသည့် အခွင့်အရေးပြစကားဖြစ်သည်။"
  },
  "〜をかねて": {
    "meaning": "ရည်ရွယ်ချက်နှစ်ခုကို တစ်ပြိုင်နက် ပေါင်းစပ်၍",
    "explanation": "လုပ်ဆောင်ချက်တစ်ခုတည်းဖြင့် ရည်မှန်းချက်နှစ်ခုကို တစ်ပြိုင်နက် ဆောင်ရွက်ကြောင်း ပြသည်။"
  },
  "〜をおいて": {
    "meaning": "...မှတစ်ပါး အခြားမရှိပါ (အထူးချီးကျူးခြင်း)",
    "explanation": "ဤပုဂ္ဂိုလ် သို့မဟုတ် ဤနည်းလမ်းမှတစ်ပါး အခြားအစားထိုးစရာမရှိကြောင်း ပြသည်။"
  },
  "〜に先駆けて (にさきがけて)": {
    "meaning": "ရှေ့ပြေးဦးဆောင်၍ / အရင်ဆုံးအောင်မြင်စွာ",
    "explanation": "ကမ္ဘာ သို့မဟုတ် ခေတ်ကာလထက် ဦးစွာ ပထမဆုံး စတင်တီထွင်နိုင်မှုကို ချီးကျူးသည်။"
  },
  "〜に応えて (にこたえて)": {
    "meaning": "မျှော်လင့်ချက် သို့မဟုတ် တောင်းဆိုချက်ကို တုံ့ပြန်၍",
    "explanation": "ပရိသတ် သို့မဟုတ် ပြည်သူလူထု၏ အားပေးထောက်ခံမှုကို ကျေနပ်စေရန် ဆောင်ရွက်သည်။"
  },
  "〜に沿って (にそって)": {
    "meaning": "လမ်းညွှန်ချက်အတိုင်း / စည်းမျဉ်းအတိုင်း",
    "explanation": "မူဝါဒ၊ စံနှုန်း သို့မဟုတ် လမ်းညွှန်ချက်ဘောင်အတိုင်း တိကျစွာ လိုက်နာဆောင်ရွက်သည်။"
  },
  "〜のももっともだ": {
    "meaning": "ထိုသို့ဖြစ်ရသည်မှာ သဘာဝကျပါသည် / အပြစ်ဆိုဖွယ်မရှိပါ",
    "explanation": "ထိုအခြေအနေမျိုးတွင် မည်သူမဆို ထိုကဲ့သို့ ခံစားရမည်မှာ အမှန်ပင်ဖြစ်ကြောင်း ဖော်ပြသည်။"
  },
  "〜っこない": {
    "meaning": "လုံးဝမဖြစ်နိုင်ပါ / လုံးဝမလုပ်နိုင်ပါ",
    "explanation": "စကားပြောတွင် ဘယ်လိုမှ မဖြစ်နိုင်ကြောင်း အခိုင်အမာ ငြင်းဆိုသည်။"
  },
  "〜極まりない / 極まる": {
    "meaning": "အလွန်အမင်း အထွတ်အထိပ်ရောက်သည် / အတိုင်းအဆမဲ့",
    "explanation": "စိတ်ခံစားမှု သို့မဟုတ် အန္တရာယ် အမြင့်ဆုံးအဆင့်သို့ ရောက်ရှိနေမှုကို စာပေဆန်စွာ ဖော်ပြသည်။"
  },
  "〜にたえない": {
    "meaning": "ရင်တွင်းမဆံ့အောင် ခံစားရပါသည် / နားမထောင်ရက်ပါ",
    "explanation": "ကျေးဇူးတင်လွန်းခြင်း သို့မဟုတ် ဝမ်းနည်းလွန်းသဖြင့် စိတ်ထိခိုက်မှုကို ဖော်ပြသည်။"
  },
  "〜まじき": {
    "meaning": "လုံးဝမပြုလုပ်သင့်သော / ခွင့်မလွှတ်နိုင်သော",
    "explanation": "မြင့်မြတ်သော ရာထူးနေရာနှင့် မအပ်စပ်သည့် မဖွယ်မရာ အပြုအမူကို ပြင်းထန်စွာ ပြစ်တင်ရှုတ်ချသည်။"
  },
  "〜たるもの": {
    "meaning": "...ဟူသည်မှာ / ခေါင်းဆောင်တစ်ဦးအနေဖြင့်",
    "explanation": "မြင့်မြတ်သော အဆင့်အတန်းရှိသူတစ်ဦးတွင် ရှိအပ်သော ကိုယ်ကျင့်တရားကို ဖော်ပြသည်။"
  },
  "〜なりに / なりの": {
    "meaning": "မိမိတတ်စွမ်းသမျှ / ကိုယ့်နည်းကိုယ့်ဟန်ဖြင့်",
    "explanation": "မိမိ၏ ကန့်သတ်ချက်များကြားမှ အကောင်းဆုံး ကြိုးပမ်းဆောင်ရွက်မှုကို ပြသည်။"
  },
  "〜であれ〜であれ": {
    "meaning": "...ဖြစ်စေ ...ဖြစ်စေ မည်သို့ပင်ဖြစ်စေ",
    "explanation": "အခြေအနေ မည်သို့ပင်ဖြစ်စေ ရလဒ် သို့မဟုတ် စည်းကမ်း ပြောင်းလဲမှုမရှိကြောင်း ဖော်ပြသည်။"
  },
  "〜をおいて他にない": {
    "meaning": "ဤသူမှတစ်ပါး အခြားမရှိပါ",
    "explanation": "ဤတာဝန်ကို ထမ်းဆောင်နိုင်သူမှာ ဤပုဂ္ဂိုလ်တစ်ဦးတည်းသာ ရှိကြောင်း ပြတ်သားစွာ ဖော်ပြသည်။"
  },
  "〜ならではの": {
    "meaning": "...တွင်သာ တွေ့ရှိနိုင်သော / သီးသန့်ဆွဲဆောင်မှုရှိသော",
    "explanation": "အခြားနေရာတွင် မရနိုင်သော သီးသန့်အလှအပ သို့မဟုတ် အရည်အသွေးကို ချီးကျူးဖော်ပြသည်။"
  },
  "〜と相まって (とあいまって)": {
    "meaning": "...နှင့် ပေါင်းစပ်မိကာ ပိုမိုအားကောင်းလာသည်",
    "explanation": "အချက်နှစ်ခု ပေါင်းစပ်မိပြီး အကျိုးကျေးဇူး ပိုမိုထင်ရှားလာမှုကို ဖော်ပြသည်။"
  },
  "〜を限りに": {
    "meaning": "...ကို နောက်ဆုံးထား၍ အဆုံးသတ်သည်",
    "explanation": "ကာလကြာရှည် လုပ်ဆောင်ခဲ့သောအရာကို ဤအချိန်တွင် အပြီးတိုင် ရပ်နားကြောင်း ကြေညာသည်။"
  },
  "〜をもって (日時・手段)": {
    "meaning": "...နေ့ရက်ဖြင့် / ...နည်းလမ်းဖြင့် (တရားဝင်အဆို)",
    "explanation": "တရားဝင် စတင်ခြင်း သို့မဟုတ် အဆုံးသတ်ခြင်းကို ကြေညာရာတွင် သုံးသည်။"
  },
  "〜といえども": {
    "meaning": "ပညာရှင်ပင်ဖြစ်လင့်ကစား / မည်သူပင်ဖြစ်စေကာမူ",
    "explanation": "မည်မျှပင် ကျွမ်းကျင်သူဖြစ်ပါစေ အမှားနှင့် မကင်းနိုင်ကြောင်း စာပေဆန်စွာ ဖော်ပြသည်။"
  },
  "〜を禁じ得ない (をきんじえない)": {
    "meaning": "မထိန်းချုပ်နိုင်အောင် ခံစားရပါသည်",
    "explanation": "ဒေါသ၊ မျက်ရည် သို့မဟုတ် အံ့သြမှုကို ရင်ထဲတွင် မအောင့်အီးနိုင်တော့ဘဲ ဖော်ပြသည်။"
  },
  "〜を余儀なくさせる": {
    "meaning": "အခြေအနေဆိုးက မလွှဲမရှောင်သာ ဖြစ်စေသည်",
    "explanation": "အကျပ်အတည်း သို့မဟုတ် ပြဿနာက မဖြစ်မနေ အပြောင်းအလဲလုပ်ရန် ဖိအားပေးမှုကို ပြသည်။"
  },
  "〜てやまない": {
    "meaning": "အစဉ်အမြဲ ဆုတောင်းမေတ္တာပို့သနေပါသည်",
    "explanation": "ရင်ထဲမှ နှစ်နှစ်ကာကာ မရပ်မနား ဆုတောင်းဆန္ဒပြုမှုကို စာပေဆန်စွာ ဖော်ပြသည်။"
  },
  "〜ごとき / ごとく": {
    "meaning": "...ကဲ့သို့ပင် လျင်မြန်စွာ / ...ကဲ့သို့သော",
    "explanation": "မြှားကဲ့သို့ လျင်မြန်စွာ ပျံသန်းသွားမှု စသည့် စာပေဆန်သော နှိုင်းယှဉ်ချက်တွင် သုံးသည်။"
  },
  "〜ずにはおかない": {
    "meaning": "ဧကန်မလွဲ ဖြစ်ပေါ်စေရမည်",
    "explanation": "အကြောင်းတရားတစ်ခုက ကြီးမားသော တုံ့ပြန်မှုကို မလွဲမသွေ ဖြစ်ပေါ်စေမည်ဟု အခိုင်အမာဆိုသည်။"
  },
  "〜ないではおかない": {
    "meaning": "အရေးမယူဘဲ မနေပါ / မပြီးမချင်း မနေပါ",
    "explanation": "အပြစ်ရှိသူကို မဖြစ်မနေ အရေးယူမည်ဟူသော ပြတ်သားသည့် ဆုံးဖြတ်ချက်ကို ဖော်ပြသည်။"
  },
  "〜にあって": {
    "meaning": "အကျပ်အတည်း ကာလတွင် / အခြေအနေဆိုးတွင်",
    "explanation": "ဆိုးရွားသော သဘာဝဘေး သို့မဟုတ် အခြေအနေကြားမှ စည်းကမ်းထိန်းသိမ်းမှုကို ဖော်ပြသည်။"
  },
  "〜にかかわる": {
    "meaning": "အသက် သို့မဟုတ် ဂုဏ်သိက္ခာနှင့် သက်ဆိုင်သော",
    "explanation": "လူ့အသက် သို့မဟုတ် ဘဝအတွက် အလွန်အရေးပါသော ကိစ္စရပ်ဖြစ်ကြောင်း ဖော်ပြသည်။"
  },
  "〜をよそに": {
    "meaning": "စိုးရိမ်ပူပန်မှုကို လုံးဝဂရုမစိုက်ဘဲ",
    "explanation": "မိသားစု သို့မဟုတ် ပတ်ဝန်းကျင်၏ စိုးရိမ်မှုကို လျစ်လျူရှုပြီး လုပ်ဆောင်မှုကို ပြသည်။"
  },
  "〜ともなく / ともなしに": {
    "meaning": "ရည်ရွယ်ချက်မရှိဘဲ သာမန်မျှသာ",
    "explanation": "တမင်အာရုံမစိုက်ဘဲ အမှတ်မထင် ကြည့်မိ၊ နားထောင်မိရာမှ တွေ့ရှိမှုကို ပြသည်။"
  },
  "〜そばから": {
    "meaning": "ပြီးသည်နှင့် တစ်ပြိုင်နက် ပြန်လည်ပျက်စီးသွားသည်",
    "explanation": "လုပ်ဆောင်ပြီးသည်နှင့် ချက်ချင်းဆိုသလို အစပျောက်သွားသော အခြေအနေကို ဖော်ပြသည်။"
  },
  "〜が早いか": {
    "meaning": "ပြီးသည်နှင့် ချက်ချင်းဆိုသလို ပြေးထွက်သွားသည်",
    "explanation": "အချက်ပေးသံမြည်သည်နှင့် ချက်ချင်း လျင်မြန်စွာ တုံ့ပြန်လှုပ်ရှားမှုကို ဖော်ပြသည်။"
  },
  "〜や否や (やいなや)": {
    "meaning": "...ပြီးသည်နှင့် ချက်ချင်းပင်",
    "explanation": "လေယာဉ်ဆင်းသက်သည်နှင့် တစ်ပြိုင်နက် ခရီးသည်များ ပစ္စည်းယူကြပုံကဲ့သို့ အလွန်မြန်ဆန်မှုကို ပြသည်။"
  },
  "〜なり": {
    "meaning": "...ပြီးသည်နှင့် မျက်နှာပျက်ကာ ထွက်သွားသည်",
    "explanation": "စာကို ဖတ်ပြီးသည်နှင့် ရုတ်တရက် အမူအရာပြောင်းလဲသွားပုံကို ဖော်ပြသည်။"
  },
  "〜かたがた": {
    "meaning": "နှုတ်ဆက်ရင်းနှင့် အလည်အပတ်သွားရောက်သည်",
    "explanation": "အိမ်ပြောင်းနှုတ်ဆက်ရင်း တစ်ပါတည်း ဆရာ့အိမ်သို့ ဂါရဝပြုသွားရောက်ခြင်းမျိုးတွင် သုံးသည်။"
  },
  "〜いかんだ / いかんによって": {
    "meaning": "...အပေါ်တွင် မူတည်၍ ဆုံးဖြတ်မည်",
    "explanation": "ဆွေးနွေးမှု၏ အောင်မြင်မှုအပေါ် မူတည်၍ မူဝါဒကို ဆုံးဖြတ်မည့်အကြောင်းကို ပြသည်။"
  },
  "〜んばかりに": {
    "meaning": "ငိုချတော့မည့်အလား / ဖြစ်တော့မည့်ဟန်ဖြင့်",
    "explanation": "ယခုပင် ငိုတော့မည့် မျက်နှာပေးမျိုးဖြင့် ရပ်နေပုံကို သရုပ်ဖော်သည်။"
  },
  "〜ずくめ": {
    "meaning": "မင်္ဂလာရှိသော သတင်းများချည်းသာ / ပြည့်နှက်နေသော",
    "explanation": "ရာထူးတိုးခြင်း၊ မြေးဦးရခြင်း စသည့် ကောင်းသောသတင်းများဖြင့် ပြည့်နှက်နေသော နှစ်တစ်နှစ်ကို ဖော်ပြသည်။"
  }
};

export const CANONICAL_GRAMMAR: GrammarItem[] = RAW_CANONICAL_ITEMS.map((item) => {
  const localized = getLocalizedGrammarContent(item.pattern, item.meaning, item.explanation);
  const myOverride = MYANMAR_OVERRIDE_MAP[item.pattern];

  const meaningsByLang = {
    ...localized.meaningsByLang,
    ...(myOverride ? { my: myOverride.meaning } : {}),
  };

  const explanationsByLang = {
    ...localized.explanationsByLang,
    ...(myOverride ? { my: myOverride.explanation } : {}),
  };

  return {
    ...item,
    meaningsByLang,
    explanationsByLang,
  };
});

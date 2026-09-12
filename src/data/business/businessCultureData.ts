// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) WORKPLACE CULTURE & ETIQUETTE
// Definitive Guide to Hou-Ren-Sou, Seating (席次), Meishi Exchange & Nomikai
// ============================================================================

import { BusinessCultureGuideItem } from '../../types/business';

export const BUSINESS_CULTURE_GUIDES: BusinessCultureGuideItem[] = [
  {
    id: 'cg-hourensou',
    category: 'hourensou',
    titleJp: '報連相（ほうれんそう）の徹底',
    titleEn: 'The Golden Rule of Japanese Business: Hou-Ren-Sou',
    summary:
      'Hou-Ren-Sou is the cornerstone of Japanese organizational coordination, standing for 報告 (Report), 連絡 (Inform / Communicate), and 相談 (Consult).',
    coreRule:
      'Never keep your work in a black box. Bad news must be reported first (バッドニュース・ファースト), and consultations must include your own hypothesis.',
    detailedGuidelines: [
      {
        heading: '1. 報告 (Hōkoku — Reporting)',
        explanation: 'Reporting results to the person who gave you the assignment or task.',
        dos: [
          'Report as soon as a task is finished: "〇〇の件、完了いたしましたのでご報告いたします"',
          'For long tasks, provide milestone updates at 30%, 60%, and 90%',
          'Report bad news or delays immediately with factual root causes',
          'Use the PREP method (Conclusion ➔ Reason ➔ Example ➔ Point)',
        ],
        donts: [
          'Do not wait to be asked by your superior ("あの件、どうなった？")',
          'Do not mix personal opinions (所感) with factual data (事実)',
          'Do not conceal minor problems hoping they will fix themselves',
        ],
      },
      {
        heading: '2. 連絡 (Renraku — Informing)',
        explanation: 'Sharing relevant factual updates with colleagues, cross-functional teams, and stakeholders without subjective opinions.',
        dos: [
          'Inform team members promptly of schedule changes, absence, or illness',
          'Ensure everyone who depends on your output is copied (CC) on critical correspondence',
          'Keep messages concise and action-oriented',
        ],
        donts: [
          'Do not assume "someone else will tell them"',
          'Do not delay emergency notifications until the end of the day',
        ],
      },
      {
        heading: '3. 相談 (Sōdan — Consulting)',
        explanation: 'Seeking guidance from superiors or experienced mentors when encountering ambiguities or roadblocks.',
        dos: [
          'Ask before making irreversible assumptions: "1点ご相談よろしいでしょうか"',
          'Always bring your own proposed solution (A案・B案): "私としてはA案が良いと考えておりますが、ご意見をいただけますでしょうか"',
        ],
        donts: [
          'Do not ask "丸投げ" (throwing an open problem at a boss without having thought through any solutions)',
          'Do not wait until a problem explodes to seek help',
        ],
      },
    ],
    modernTrendNote:
      'In modern tech and startup companies, Slack/Teams asynchronous Hou-Ren-Sou has largely replaced traditional verbal reports, but the underlying principle of transparency remains unchanged.',
  },
  {
    id: 'cg-seating',
    category: 'seating',
    titleJp: '席次（上座と下座）の完全ルール',
    titleEn: 'Mastering Kamiza & Shimoza (Seating Hierarchy)',
    summary:
      'In Japanese business etiquette, physical seating positions communicate respect. The seat of honor is called 上座 (Kamiza), while the junior/humble seat is called 下座 (Shimoza).',
    coreRule:
      'The seat furthest from the entrance is almost always Kamiza (上座). The seat closest to the door is Shimoza (下座), occupied by the host or the most junior person.',
    diagramSvgKey: 'seating_rules',
    detailedGuidelines: [
      {
        heading: '会議室・応接室 (Conference & Reception Rooms)',
        explanation: 'Where to seat clients, executives, and team members.',
        dos: [
          'Offer the seat deepest inside the room, furthest from the door, to the client or guest',
          'The host and junior employees sit closest to the entrance door to manage entry, receive documents, and call staff',
          'If the room has a scenic window or famous art piece, the seat facing that view becomes Kamiza regardless of door position',
        ],
        donts: [
          'Do not let a client sit closest to the door',
          'Never sit down in a meeting room before the guest or superior sits',
        ],
      },
      {
        heading: 'タクシー・社用車 (Taxis & Company Cars)',
        explanation: 'Seating rank inside vehicles depends strictly on whether a professional chauffeur or an employee is driving.',
        dos: [
          'Chauffeured Taxi: #1 (Kamiza) is directly behind the driver. #2 is behind front passenger. #3 is middle rear. #4 (Lowest) is front passenger seat (responsible for giving directions and paying the fare).',
          'Company Car (Colleague driving): #1 (Kamiza) is the front passenger seat next to the driver! #2 is rear right, #3 is rear left, #4 is rear middle.',
        ],
        donts: [
          'Do not sit in the front passenger seat of a taxi if you are the client or executive',
          'Do not leave a colleague driver isolated in front like a taxi driver when traveling together',
        ],
      },
      {
        heading: 'エレベーター (Elevators)',
        explanation: 'Operating the elevator buttons is the duty of the junior host.',
        dos: [
          'Junior person enters first, holds the "OPEN" button, and invites guests and superiors inside',
          'Kamiza is the deepest right/left corner away from the door',
          'Junior person exits last after ensuring all guests have safely stepped out',
        ],
        donts: [
          'Do not turn your back completely toward guests inside the elevator',
        ],
      },
    ],
  },
  {
    id: 'cg-meishi',
    category: 'meishi',
    titleJp: '名刺交換（めいしこうかん）の正しい作法',
    titleEn: 'Business Card (Meishi) Exchange Protocol',
    summary:
      'A Japanese business card is treated with profound care as an extension of the person’s professional identity and face.',
    coreRule:
      'Present and receive cards with both hands at chest height. The visitor or lower-ranking party presents their card first and places it slightly lower than the receiving card.',
    detailedGuidelines: [
      {
        heading: '交換の基本手順 (Step-by-Step Protocol)',
        explanation: 'How to present and receive cards smoothly.',
        dos: [
          'Stand up, step around the table (never exchange across the conference table if possible)',
          'Hold card with both hands by the corners, ensuring your fingers do not cover your company logo or name',
          'Say clearly: "株式会社〇〇の[名前]と申します。どうぞよろしくお願い申し上げます"',
          'When receiving, say: "頂戴いたします (Chōdai itashimasu)" and hold it at chest level',
          'Check pronunciation immediately: "〇〇様とお読みすればよろしいでしょうか"',
        ],
        donts: [
          'Never slide a card across a table',
          'Never write on a card in front of the owner',
          'Never fold, bend, or immediately shove a card into your pocket or wallet',
        ],
      },
      {
        heading: '会議中の名刺の並べ方 (Table Arrangement During Meetings)',
        explanation: 'Keeping cards visible throughout the meeting.',
        dos: [
          'Place the card of the highest-ranking client on top of your leather cardholder (名刺入れ)',
          'Place other attendees’ cards on the bare table to the right/below, arranged to match their physical seating order',
          'Put cards away into your cardholder only after the meeting has fully concluded',
        ],
        donts: [
          'Do not fidget with, spin, or play with cards during the meeting',
        ],
      },
    ],
  },
  {
    id: 'cg-nomikai',
    category: 'nomikai',
    titleJp: '日本の飲み会マナーと人間関係',
    titleEn: 'Nomikai (After-Work Drinks) Etiquette & Networking',
    summary:
      'Nomikai serves as a social lubricator (飲みニケーション) where hierarchical stiffness softens, but basic attentiveness and etiquette still matter.',
    coreRule:
      'Be attentive to empty glasses, pour for others before filling your own, and always express gratitude the next morning at the office.',
    detailedGuidelines: [
      {
        heading: '乾杯とお酌のマナー (Toasts & Pouring Drinks)',
        explanation: 'Traditional courtesy during dinner gatherings.',
        dos: [
          'Wait for the official toast (乾杯 - Kanpai) before drinking anything',
          'When clinking glasses with a boss or client, keep the rim of your glass slightly lower than theirs',
          'Pour beer with both hands (label facing upward) when offering a pour (お酌)',
          'Receive drinks holding your glass with both hands',
        ],
        donts: [
          'Do not pour your own drink while ignoring empty glasses of seniors sitting nearby',
          'Never force anyone to drink alcohol (アルハラ / alcohol harassment is strictly prohibited in modern companies)',
        ],
      },
      {
        heading: '翌朝の挨拶 (The Essential Next-Morning Thank You)',
        explanation: 'The most important part of a Japanese company dinner happens the next day.',
        dos: [
          'First thing the next morning, approach superiors who hosted or paid: "昨日はごちそうさまでした。貴重なお話を伺えて大変勉強になりました"',
          'If working remotely, send a brief message via Slack/email before 10:00 AM',
        ],
        donts: [
          'Never forget the next-morning thank-you; failing to mention last night’s dinner makes you appear ungrateful',
        ],
      },
    ],
  },
  {
    id: 'cg-nemawashi',
    category: 'ringi',
    titleJp: '根回し（ねまわし）と稟議（りんぎ）システム',
    titleEn: 'Nemawashi & Ringi: Japanese Consensus Decision-Making',
    summary:
      'Japanese organizations prioritize collective harmony and risk minimization through pre-alignment (根回し) and bottom-up written approvals (稟議書).',
    coreRule:
      'Important meetings in Japanese companies are rarely the place where decisions are born—they are where pre-agreed decisions are formally ratified.',
    detailedGuidelines: [
      {
        heading: '根回しの本質 (The Purpose of Nemawashi)',
        explanation: 'Informally sounding out stakeholders before the formal meeting.',
        dos: [
          'Visit each affected manager individually before presenting proposals to a broad committee',
          'Ask for their input early so they feel ownership: "事前に課長のご意見を伺いたく参りました"',
          'Incorporate their feedback into the draft so they support it during the formal vote',
        ],
        donts: [
          'Do not surprise executives or cross-department leaders in public meetings',
        ],
      },
      {
        heading: '稟議書（りんぎしょ）の作成 (The Ringi Approval Flow)',
        explanation: 'Circulating formal proposals for corporate sign-offs.',
        dos: [
          'Clearly outline problem background, estimated budget, expected ROI, and risk analysis',
          'Follow the designated chain of command without skipping immediate managers',
        ],
        donts: [
          'Do not request executive sign-off without previous stakeholder buy-in',
        ],
      },
    ],
  },
];

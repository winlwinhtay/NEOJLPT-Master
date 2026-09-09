import { ReadingLesson } from '../types';

export const READING_DATA: ReadingLesson[] = [
  // ==========================================
  // --- N5 READING ---
  // ==========================================
  {
    id: 'r-n5-01',
    title: '田中さんの一日',
    titleEn: "Mr. Tanaka's Daily Routine",
    level: 'N5',
    topic: 'daily_life',
    length: 'short',
    passage: `[田中]{たなか}さんは[毎朝]{まいあさ}６[時]{じ}に[起]{お}きます。
[顔]{かお}を[洗]{あら}ってから、パンと[卵]{たまご}を[食]{た}べます。
そして、コーヒーを[飲]{の}みます。[朝]{あさ}７[時]{じ}[半]{はん}に[電車]{でんしゃ}で[会社]{かいしゃ}へ[行]{い}きます。
[会社]{かいしゃ}は８[時]{じ}から５[時]{じ}までです。
[夜]{よる}は[家]{いえ}で[本]{ほん}を[読]{よ}んだり、テレビを[見]{み}たりします。
１１[時]{じ}に[寝]{ね}ます。`,
    passagePlain: `田中さんは毎朝６時に起きます。
顔を洗ってから、パンと卵を食べます。
そして、コーヒーを飲みます。朝７時半に電車で会社へ行きます。
会社は８時から５時までです。
夜は家で本を読んだり、テレビを見たりします。
１１時に寝ます。`,
    translationEn: `Mr. Tanaka wakes up at 6:00 every morning.
After washing his face, he eats bread and eggs.
Then, he drinks coffee. At 7:30 in the morning, he goes to his company by train.
Work is from 8:00 to 5:00.
In the evening, he reads books and watches TV at home.
He goes to bed at 11:00.`,
    vocabularyList: [
      { word: '毎朝', reading: 'まいあさ', meaning: 'every morning' },
      { word: '洗う', reading: 'あらう', meaning: 'to wash' },
      { word: '会社', reading: 'かいしゃ', meaning: 'company, office' },
      { word: '寝る', reading: 'ねる', meaning: 'to go to bed, sleep' },
    ],
    audioScript: '田中さんは毎朝６時に起きます。顔を洗ってから、パンと卵を食べます。そして、コーヒーを飲みます。朝７時半に電車で会社へ行きます。会社は８時から５時までです。夜は家で本を読んだり、テレビを見たりします。１１時に寝ます。',
    questions: [
      {
        id: 'rq-n5-01-1',
        questionJp: '田中さんは朝ご飯に何を食べますか？',
        questionEn: 'What does Mr. Tanaka eat for breakfast?',
        options: ['ご飯と魚', 'パンと卵', 'ラーメン', '何も食べない'],
        correctIndex: 1,
        explanation: 'The passage explicitly states: 「パンと卵を食べます」(He eats bread and eggs).',
      },
      {
        id: 'rq-n5-01-2',
        questionJp: '田中さんはどうやって会社へ行きますか？',
        questionEn: 'How does Mr. Tanaka go to the company?',
        options: ['バスで', '歩いて', '電車で', '車で'],
        correctIndex: 2,
        explanation: 'The passage says: 「電車で会社へ行きます」(He goes to the company by train).',
      },
    ],
  },

  // ==========================================
  // --- N4 READING ---
  // ==========================================
  {
    id: 'r-n4-01',
    title: '日本のゴミの分別ルール',
    titleEn: 'Garbage Sorting Rules in Japan',
    level: 'N4',
    topic: 'daily_life',
    length: 'medium',
    passage: `[日本]{にほん}では、ゴミの[出]{だ}し[方]{かた}に[決]{き}まりがあります。
[燃]{も}えるゴミ、[燃]{も}えないゴミ、[資源]{しげん}ゴミ（ペットボトルや[缶]{かん}）に[分]{わ}けなければなりません。
[曜日]{ようび}によって[出]{だ}せるゴミの[種類]{しゅるい}が[違]{ちが}います。
たとえば、[月曜日]{げつようび}と[木曜日]{もくようび}は[燃]{も}えるゴミの[日]{ひ}です。
ルールを[守]{まも}らないと、ゴミを[回収]{かいしゅう}してもらえないことがあります。`,
    passagePlain: `日本では、ゴミの出し方に決まりがあります。
燃えるゴミ、燃えないゴミ、資源ゴミ（ペットボトルや缶）に分けなければなりません。
曜日によって出せるゴミの種類が違います。
たとえば、月曜日と木曜日は燃えるゴミの日です。
ルールを守らないと、ゴミを回収してもらえないことがあります。`,
    translationEn: `In Japan, there are strict rules for taking out garbage.
You must separate it into burnable trash, non-burnable trash, and recyclable resources (plastic bottles and cans).
The type of garbage you can take out differs depending on the day of the week.
For example, Monday and Thursday are burnable trash days.
If you do not follow the rules, your garbage may not be collected.`,
    vocabularyList: [
      { word: '分別', reading: 'ぶんべつ', meaning: 'sorting, separation' },
      { word: '燃えるゴミ', reading: 'もえるごみ', meaning: 'burnable trash' },
      { word: '資源', reading: 'しげん', meaning: 'resources' },
      { word: '回収', reading: 'かいしゅう', meaning: 'collection' },
    ],
    audioScript: '日本では、ゴミの出し方に決まりがあります。燃えるゴミ、燃えないゴミ、資源ゴミに分けなければなりません。曜日によって出せるゴミの種類が違います。ルールを守らないと、ゴミを回収してもらえないことがあります。',
    questions: [
      {
        id: 'rq-n4-01-1',
        questionJp: '文章の内容と合っているものはどれですか？',
        questionEn: 'Which statement matches the content of the passage?',
        options: [
          '毎日どんなゴミでも出せる',
          '曜日によって出せるゴミの種類が異なる',
          'ゴミは分別しなくてもよい',
          '資源ゴミは燃えるゴミと一緒に出す',
        ],
        correctIndex: 1,
        explanation: '「曜日によって出せるゴミの種類が違います」(The type of garbage differs depending on the day of the week).',
      },
    ],
  },

  // ==========================================
  // --- N3 READING ---
  // ==========================================
  {
    id: 'r-n3-01',
    title: '食品ロスを減らす取り組み',
    titleEn: 'Efforts to Reduce Food Waste',
    level: 'N3',
    topic: 'society',
    length: 'medium',
    passage: `まだ[食]{た}べられるのに[捨]{す}てられてしまう[食品]{しょくひん}を「[食品]{しょくひん}ロス」と[呼]{よ}びます。
[世界中]{せかいじゅう}で[毎年]{まいとし}[膨大]{ぼうだい}な[量]{りょう}の[食料]{しょくりょう}が[廃棄]{はいき}されており、[環境]{かんきょう}への[負荷]{ふか}も[懸念]{けねん}されています。
[最近]{さいきん}では、スーパーで[賞味期限]{しょうみきげん}が[近]{ちか}い[商品]{しょうひん}を[優先的]{ゆうせんてき}に[買]{か}う「てまえどり」の[運動]{うんどう}が[広]{ひろ}まっています。
[一人一人]{ひとりひとり}の小さな[意識]{いしき}の[変革]{へんかく}が、[大]{おお}きな[成果]{せいか}につながるわけです。`,
    passagePlain: `まだ食べられるのに捨てられてしまう食品を「食品ロス」と呼びます。
世界中で毎年膨大な量の食料が廃棄されており、環境への負荷も懸念されています。
最近では、スーパーで賞味期限が近い商品を優先的に買う「てまえどり」の運動が広まっています。
一人一人の小さな意識の変革が、大きな成果につながるわけです。`,
    translationEn: `Food that is discarded even though it is still edible is called "food loss" (food waste).
Huge quantities of food are disposed of worldwide every year, raising concerns about the burden on the environment.
Recently, a movement called "Temaedori," in which shoppers prioritize buying items near their expiration date at supermarkets, is spreading.
Small shifts in individual awareness naturally lead to major results.`,
    vocabularyList: [
      { word: '食品ロス', reading: 'しょくひんロス', meaning: 'food waste / loss' },
      { word: '廃棄', reading: 'はいき', meaning: 'disposal, discarding' },
      { word: '賞味期限', reading: 'しょうみきげん', meaning: 'best-before date' },
      { word: '変革', reading: 'へんかく', meaning: 'transformation, reform' },
    ],
    audioScript: 'まだ食べられるのに捨てられてしまう食品を食品ロスと呼びます。世界中で毎年膨大な量の食料が廃棄されており、環境への負荷も懸念されています。最近では賞味期限が近い商品を優先的に買う運動が広まっています。',
    questions: [
      {
        id: 'rq-n3-01-1',
        questionJp: '「てまえどり」とはどのような行動ですか？',
        questionEn: 'What action does "Temaedori" refer to?',
        options: [
          '賞味期限が近い手前の商品を優先して買うこと',
          '一番奥にある新しい商品だけを選ぶこと',
          '賞味期限が切れた食品を捨てること',
          '安売りされている商品だけをまとめ買いすること',
        ],
        correctIndex: 0,
        explanation: '「賞味期限が近い商品を優先的に買う『てまえどり』の運動」 describes taking items displayed at the front with closer expiration dates.',
      },
    ],
  },

  // ==========================================
  // --- N2 READING ---
  // ==========================================
  {
    id: 'r-n2-01',
    title: '働き方の多様化とリモートワークの課題',
    titleEn: 'Diversification of Workstyles & Challenges of Remote Work',
    level: 'N2',
    topic: 'business',
    length: 'long',
    passage: `IT[技術]{ぎじゅつ}の[進展]{しんてん}に[伴]{ともな}い、[在宅勤務]{ざいたくきんむ}をはじめとする[柔軟]{じゅうなん}な[働]{はたら}き[方]{かた}が[急速]{きゅうそく}に[普及]{ふきゅう}した。
[通勤]{つうきん}のストレスが[軽減]{けいげん}され、[業務]{ぎょうむ}の[効率化]{こうりつか}が[図]{はか}れる[一方]{いっぽう}で、[対面]{たいめん}による[偶発的]{ぐうはつてき}なコミュニケーションの[減少]{げんしょう}が[指摘]{してき}されている。
[組織]{そしき}における[一体感]{いったいかん}の[希薄化]{きはくか}を[防]{ふせ}ぐためには、単にデジタルツールを[導入]{どうにゅう}するだけでなく、[実情]{じつじょう}に[即]{そく}した[制度設計]{せいどせっけい}と[心理的]{しんりてき}[安全性]{あんぜんせい}の[確保]{かくほ}が[不可欠]{ふかけつ}である。`,
    passagePlain: `IT技術の進展に伴い、在宅勤務をはじめとする柔軟な働き方が急速に普及した。
通勤のストレスが軽減され、業務の効率化が図れる一方で、対面による偶発的なコミュニケーションの減少が指摘されている。
組織における一体感の希薄化を防ぐためには、単にデジタルツールを導入するだけでなく、実情に即した制度設計と心理的安全性の確保が不可欠である。`,
    translationEn: `With advances in IT technology, flexible working styles such as telecommuting have spread rapidly.
While commute stress is alleviated and operational efficiency is achieved, a decrease in serendipitous face-to-face communication has been pointed out.
To prevent the dilution of solidarity within organizations, it is indispensable not only to introduce digital tools, but also to establish institutional designs tailored to actual circumstances and ensure psychological safety.`,
    vocabularyList: [
      { word: '在宅勤務', reading: 'ざいたくきんむ', meaning: 'working from home' },
      { word: '偶発的', reading: 'ぐうはつてき', meaning: 'serendipitous, accidental' },
      { word: '希薄化', reading: 'きはくか', meaning: 'dilution, weakening' },
      { word: '心理的安全性', reading: 'しんりてきあんぜんせい', meaning: 'psychological safety' },
    ],
    audioScript: 'IT技術の進展に伴い、在宅勤務をはじめとする柔軟な働き方が急速に普及した。通勤ストレスが軽減される一方で、対面コミュニケーションの減少が指摘されている。実情に即した制度設計が不可欠である。',
    questions: [
      {
        id: 'rq-n2-01-1',
        questionJp: '筆者がリモートワークにおいて不可欠だと主張しているものはどれですか？',
        questionEn: 'What does the author argue is indispensable in remote work?',
        options: [
          '実情に即した制度設計と心理的安全性の確保',
          '完全なオフィス出社への回帰',
          'すべての対面業務の廃止',
          'デジタルツールの使用制限',
        ],
        correctIndex: 0,
        explanation: '「実情に即した制度設計と心理的安全性の確保が不可欠である」 directly states the core thesis.',
      },
    ],
  },

  // ==========================================
  // --- N1 READING ---
  // ==========================================
  {
    id: 'r-n1-01',
    title: '人工知能の発展と人間の創造性',
    titleEn: 'The Evolution of Artificial Intelligence and Human Creativity',
    level: 'N1',
    topic: 'academic',
    length: 'long',
    passage: `[生成]{せいせい}AIが[高度]{こうど}な[論理的]{ろんりてき}[推論]{すいろん}や[芸術的]{げいじゅつてき}[模倣]{もほう}を[可能]{かのう}にする[現代]{げんだい}において、「[人間]{にんげん}[特有]{とくゆう}の[知性]{ちせい}とは[何]{なに}か」という[根源的]{こんげんてき}な[問]{と}いが[再燃]{さいねん}している。
AIは[過去]{かこ}の[膨大]{ぼうだい}なデータを[網羅]{もうら}し[最適解]{さいてきかい}を[導出]{どうしゅつ}する[点]{てん}において[人間]{にんげん}を[凌駕]{りょうが}し[得]{う}るが、[既存]{きぞん}の[枠組み]{わくぐみ}そのものを[疑]{うたが}い、[矛盾]{むじゅん}や[不合理]{ふごうり}の[中]{なか}から[新規]{しんき}な[価値]{かち}を[創出]{そうしゅつ}する[営]{いとな}みは、[生]{なま}身の[身体性]{しんたいせい}と[情動]{じょうどう}を[持]{も}つ[人間]{にんげん}ならではの[領域]{りょういき}である。`,
    passagePlain: `生成AIが高度な論理的推論や芸術的模倣を可能にする現代において、「人間特有の知性とは何か」という根源的な問いが再燃している。
AIは過去の膨大なデータを網羅し最適解を導出する点において人間を凌駕し得るが、既存の枠組みそのものを疑い、矛盾や不合理の中から新規な価値を創出する営みは、生身の身体性と情動を持つ人間ならではの領域である。`,
    translationEn: `In modern times where generative AI enables sophisticated logical reasoning and artistic imitation, the fundamental question of "what constitutes unique human intelligence" has reignited.
While AI may surpass humans in comprehensively encompassing vast historical data to derive optimal solutions, the endeavor of questioning existing frameworks themselves and generating novel value out of contradictions and irrationality remains a domain unique to humans who possess biological embodiment and emotions.`,
    vocabularyList: [
      { word: '推論', reading: 'すいろん', meaning: 'inference, reasoning' },
      { word: '模倣', reading: 'もほう', meaning: 'imitation, emulation' },
      { word: '網羅', reading: 'もうら', meaning: 'comprehensive coverage' },
      { word: '凌駕', reading: 'りょうが', meaning: 'surpassing, outdoing' },
      { word: '身体性', reading: 'しんたいせい', meaning: 'embodiment' },
    ],
    audioScript: '生成AIが高度な推論を可能にする現代において、人間特有の知性とは何かという問いが再燃している。矛盾や不合理の中から新規な価値を創出する営みは、人間ならではの領域である。',
    questions: [
      {
        id: 'rq-n1-01-1',
        questionJp: '筆者によると、人間ならではの創造性の本質とは何か？',
        questionEn: 'According to the author, what is the essence of uniquely human creativity?',
        options: [
          '既存の枠組みを疑い、矛盾や不合理から新たな価値を創出すること',
          '膨大な過去データを最も速く計算して最適解を出すこと',
          '論理的な推論を完璧に模倣すること',
          '感情を排除して客観的なデータのみで判断すること',
        ],
        correctIndex: 0,
        explanation: '「既存の枠組みそのものを疑い、矛盾や不合理の中から新規な価値を創出する営みは、生身の身体性と情動を持つ人間ならではの領域である」.',
      },
    ],
  },
];

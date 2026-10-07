export interface KanaLearningInfo {
  char: string;
  katakana: string;
  romaji: string;
  exampleJp: string;
  exampleRomaji: string;
  exampleEn: string;
  group: 'vowel' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w' | 'g' | 'z' | 'd' | 'b' | 'p' | 'combo';
}

export const KANA_EDUCATIONAL_DATA: Record<string, KanaLearningInfo> = {
  あ: { char: 'あ', katakana: 'ア', romaji: 'a', exampleJp: 'あさ (朝)', exampleRomaji: 'asa', exampleEn: 'morning', group: 'vowel' },
  い: { char: 'い', katakana: 'イ', romaji: 'i', exampleJp: 'いぬ (犬)', exampleRomaji: 'inu', exampleEn: 'dog', group: 'vowel' },
  う: { char: 'う', katakana: 'ウ', romaji: 'u', exampleJp: 'うみ (海)', exampleRomaji: 'umi', exampleEn: 'sea / ocean', group: 'vowel' },
  え: { char: 'え', katakana: 'エ', romaji: 'e', exampleJp: 'えき (駅)', exampleRomaji: 'eki', exampleEn: 'train station', group: 'vowel' },
  お: { char: 'お', katakana: 'オ', romaji: 'o', exampleJp: 'お茶 (おちゃ)', exampleRomaji: 'ocha', exampleEn: 'green tea', group: 'vowel' },

  か: { char: 'か', katakana: 'カ', romaji: 'ka', exampleJp: 'かさ (傘)', exampleRomaji: 'kasa', exampleEn: 'umbrella', group: 'k' },
  き: { char: 'き', katakana: 'キ', romaji: 'ki', exampleJp: 'き (木)', exampleRomaji: 'ki', exampleEn: 'tree / wood', group: 'k' },
  く: { char: 'く', katakana: 'ク', romaji: 'ku', exampleJp: 'くるま (車)', exampleRomaji: 'kuruma', exampleEn: 'car', group: 'k' },
  け: { char: 'け', katakana: 'ケ', romaji: 'ke', exampleJp: 'けさ (今朝)', exampleRomaji: 'kesa', exampleEn: 'this morning', group: 'k' },
  こ: { char: 'こ', katakana: 'コ', romaji: 'ko', exampleJp: 'こども (子供)', exampleRomaji: 'kodomo', exampleEn: 'child', group: 'k' },

  さ: { char: 'さ', katakana: 'サ', romaji: 'sa', exampleJp: 'さくら (桜)', exampleRomaji: 'sakura', exampleEn: 'cherry blossom', group: 's' },
  し: { char: 'し', katakana: 'シ', romaji: 'shi', exampleJp: 'しごと (仕事)', exampleRomaji: 'shigoto', exampleEn: 'work / job', group: 's' },
  す: { char: 'す', katakana: 'ス', romaji: 'su', exampleJp: 'すし (寿司)', exampleRomaji: 'sushi', exampleEn: 'sushi', group: 's' },
  せ: { char: 'せ', katakana: 'セ', romaji: 'se', exampleJp: 'せんせい (先生)', exampleRomaji: 'sensei', exampleEn: 'teacher', group: 's' },
  そ: { char: 'そ', katakana: 'ソ', romaji: 'so', exampleJp: 'そら (空)', exampleRomaji: 'sora', exampleEn: 'sky', group: 's' },

  た: { char: 'た', katakana: 'タ', romaji: 'ta', exampleJp: 'たまご (卵)', exampleRomaji: 'tamago', exampleEn: 'egg', group: 't' },
  ち: { char: 'ち', katakana: 'チ', romaji: 'chi', exampleJp: 'ちず (地図)', exampleRomaji: 'chizu', exampleEn: 'map', group: 't' },
  つ: { char: 'つ', katakana: 'ツ', romaji: 'tsu', exampleJp: 'つくえ (机)', exampleRomaji: 'tsukue', exampleEn: 'desk', group: 't' },
  て: { char: 'て', katakana: 'テ', romaji: 'te', exampleJp: 'てがみ (手紙)', exampleRomaji: 'tegami', exampleEn: 'letter', group: 't' },
  と: { char: 'と', katakana: 'ト', romaji: 'to', exampleJp: 'ともだち (友達)', exampleRomaji: 'tomodachi', exampleEn: 'friend', group: 't' },

  な: { char: 'な', katakana: 'ナ', romaji: 'na', exampleJp: 'なつ (夏)', exampleRomaji: 'natsu', exampleEn: 'summer', group: 'n' },
  に: { char: 'に', katakana: 'ニ', romaji: 'ni', exampleJp: 'にほん (日本)', exampleRomaji: 'nihon', exampleEn: 'Japan', group: 'n' },
  ぬ: { char: 'ぬ', katakana: 'ヌ', romaji: 'nu', exampleJp: 'ぬいぐるみ', exampleRomaji: 'nuigurumi', exampleEn: 'stuffed animal', group: 'n' },
  ね: { char: 'ね', katakana: 'ネ', romaji: 'ne', exampleJp: 'ねこ (猫)', exampleRomaji: 'neko', exampleEn: 'cat', group: 'n' },
  の: { char: 'の', katakana: 'ノ', romaji: 'no', exampleJp: 'のみもの (飲み物)', exampleRomaji: 'nomimono', exampleEn: 'beverage / drink', group: 'n' },

  は: { char: 'は', katakana: 'ハ', romaji: 'ha', exampleJp: 'はな (花)', exampleRomaji: 'hana', exampleEn: 'flower', group: 'h' },
  ひ: { char: 'ひ', katakana: 'ヒ', romaji: 'hi', exampleJp: 'ひこうき (飛行機)', exampleRomaji: 'hikouki', exampleEn: 'airplane', group: 'h' },
  ふ: { char: 'ふ', katakana: 'フ', romaji: 'fu', exampleJp: 'ふね (船)', exampleRomaji: 'fune', exampleEn: 'boat / ship', group: 'h' },
  へ: { char: 'へ', katakana: 'ヘ', romaji: 'he', exampleJp: 'へや (部屋)', exampleRomaji: 'heya', exampleEn: 'room', group: 'h' },
  ほ: { char: 'ほ', katakana: 'ホ', romaji: 'ho', exampleJp: 'ほん (本)', exampleRomaji: 'hon', exampleEn: 'book', group: 'h' },

  ま: { char: 'ま', katakana: 'マ', romaji: 'ma', exampleJp: 'まち (町)', exampleRomaji: 'machi', exampleEn: 'town / city', group: 'm' },
  み: { char: 'み', katakana: 'ミ', romaji: 'mi', exampleJp: 'みず (水)', exampleRomaji: 'mizu', exampleEn: 'water', group: 'm' },
  む: { char: 'む', katakana: 'ム', romaji: 'mu', exampleJp: 'むし (虫)', exampleRomaji: 'mushi', exampleEn: 'insect', group: 'm' },
  め: { char: 'め', katakana: 'メ', romaji: 'me', exampleJp: 'めがね (眼鏡)', exampleRomaji: 'megane', exampleEn: 'glasses', group: 'm' },
  も: { char: 'も', katakana: 'モ', romaji: 'mo', exampleJp: 'もり (森)', exampleRomaji: 'mori', exampleEn: 'forest', group: 'm' },

  や: { char: 'や', katakana: 'ヤ', romaji: 'ya', exampleJp: 'やま (山)', exampleRomaji: 'yama', exampleEn: 'mountain', group: 'y' },
  ゆ: { char: 'ゆ', katakana: 'ユ', romaji: 'yu', exampleJp: 'ゆき (雪)', exampleRomaji: 'yuki', exampleEn: 'snow', group: 'y' },
  よ: { char: 'よ', katakana: 'ヨ', romaji: 'yo', exampleJp: 'よる (夜)', exampleRomaji: 'yoru', exampleEn: 'night', group: 'y' },

  ら: { char: 'ら', katakana: 'ラ', romaji: 'ra', exampleJp: 'らいしゅう (来週)', exampleRomaji: 'raishuu', exampleEn: 'next week', group: 'r' },
  り: { char: 'り', katakana: 'リ', romaji: 'ri', exampleJp: 'りんご (林檎)', exampleRomaji: 'ringo', exampleEn: 'apple', group: 'r' },
  る: { char: 'る', katakana: 'ル', romaji: 'ru', exampleJp: 'るす (留守)', exampleRomaji: 'rusu', exampleEn: 'absence from home', group: 'r' },
  れ: { char: 'れ', katakana: 'レ', romaji: 're', exampleJp: 'れいぞうこ (冷蔵庫)', exampleRomaji: 'reizouko', exampleEn: 'refrigerator', group: 'r' },
  ろ: { char: 'ろ', katakana: 'ロ', romaji: 'ro', exampleJp: 'ろうそく (蝋燭)', exampleRomaji: 'rousoku', exampleEn: 'candle', group: 'r' },

  わ: { char: 'わ', katakana: 'ワ', romaji: 'wa', exampleJp: 'わたし (私)', exampleRomaji: 'watashi', exampleEn: 'I / myself', group: 'w' },
  を: { char: 'を', katakana: 'ヲ', romaji: 'wo', exampleJp: '本を読む (ほんをよむ)', exampleRomaji: 'hon wo yomu', exampleEn: 'read a book (object marker)', group: 'w' },
  ん: { char: 'ん', katakana: 'ン', romaji: 'n', exampleJp: 'にほん (日本)', exampleRomaji: 'nihon', exampleEn: 'Japan', group: 'w' },

  // Dakuten
  が: { char: 'が', katakana: 'ガ', romaji: 'ga', exampleJp: 'がっこう (学校)', exampleRomaji: 'gakkou', exampleEn: 'school', group: 'g' },
  ぎ: { char: 'ぎ', katakana: 'ギ', romaji: 'gi', exampleJp: 'ぎんこう (銀行)', exampleRomaji: 'ginkou', exampleEn: 'bank', group: 'g' },
  ぐ: { char: 'ぐ', katakana: 'グ', romaji: 'gu', exampleJp: 'ぐらい', exampleRomaji: 'gurai', exampleEn: 'approximately', group: 'g' },
  げ: { char: 'げ', katakana: 'ゲ', romaji: 'ge', exampleJp: 'げんき (元気)', exampleRomaji: 'genki', exampleEn: 'healthy / well', group: 'g' },
  ご: { char: 'ご', katakana: 'ゴ', romaji: 'go', exampleJp: 'ごはん (ご飯)', exampleRomaji: 'gohan', exampleEn: 'meal / rice', group: 'g' },

  ざ: { char: 'ざ', katakana: 'ザ', romaji: 'za', exampleJp: 'ざっし (雑誌)', exampleRomaji: 'zasshi', exampleEn: 'magazine', group: 'z' },
  じ: { char: 'じ', katakana: 'ジ', romaji: 'ji', exampleJp: 'じかん (時間)', exampleRomaji: 'jikan', exampleEn: 'time', group: 'z' },
  ず: { char: 'ず', katakana: 'ズ', romaji: 'zu', exampleJp: 'ずっと', exampleRomaji: 'zutto', exampleEn: 'all the time / by far', group: 'z' },
  ぜ: { char: 'ぜ', katakana: 'ゼ', romaji: 'ze', exampleJp: 'ぜんぶ (全部)', exampleRomaji: 'zenbu', exampleEn: 'all / whole', group: 'z' },
  ぞ: { char: 'ぞ', katakana: 'ゾ', romaji: 'zo', exampleJp: 'ぞう (象)', exampleRomaji: 'zou', exampleEn: 'elephant', group: 'z' },

  だ: { char: 'だ', katakana: 'ダ', romaji: 'da', exampleJp: 'だいがく (大学)', exampleRomaji: 'daigaku', exampleEn: 'university', group: 'd' },
  ぢ: { char: 'ぢ', katakana: 'ヂ', romaji: 'ji/di', exampleJp: 'はなぢ (鼻血)', exampleRomaji: 'hanaji', exampleEn: 'nosebleed', group: 'd' },
  づ: { char: 'づ', katakana: 'ヅ', romaji: 'zu/du', exampleJp: 'つづく (続く)', exampleRomaji: 'tsuzuku', exampleEn: 'to continue', group: 'd' },
  で: { char: 'で', katakana: 'デ', romaji: 'de', exampleJp: 'でんしゃ (電車)', exampleRomaji: 'densha', exampleEn: 'train', group: 'd' },
  ど: { char: 'ど', katakana: 'ド', romaji: 'do', exampleJp: 'どこ (何処)', exampleRomaji: 'doko', exampleEn: 'where', group: 'd' },

  ば: { char: 'ば', katakana: 'バ', romaji: 'ba', exampleJp: 'ばんごう (番号)', exampleRomaji: 'bangou', exampleEn: 'number', group: 'b' },
  び: { char: 'び', katakana: 'ビ', romaji: 'bi', exampleJp: 'びょういん (病院)', exampleRomaji: 'byouin', exampleEn: 'hospital', group: 'b' },
  ぶ: { char: 'ぶ', katakana: 'ブ', romaji: 'bu', exampleJp: 'ぶんしょう (文章)', exampleRomaji: 'bunshou', exampleEn: 'sentence / text', group: 'b' },
  べ: { char: 'べ', katakana: 'ベ', romaji: 'be', exampleJp: 'べんきょう (勉強)', exampleRomaji: 'benkyou', exampleEn: 'study', group: 'b' },
  ぼ: { char: 'ぼ', katakana: 'ボ', romaji: 'bo', exampleJp: 'ぼうし (帽子)', exampleRomaji: 'boushi', exampleEn: 'hat / cap', group: 'b' },

  ぱ: { char: 'ぱ', katakana: 'パ', romaji: 'pa', exampleJp: 'パン', exampleRomaji: 'pan', exampleEn: 'bread', group: 'p' },
  ぴ: { char: 'ぴ', katakana: 'ピ', romaji: 'pi', exampleJp: 'ピアノ', exampleRomaji: 'piano', exampleEn: 'piano', group: 'p' },
  ぷ: { char: 'ぷ', katakana: 'プ', romaji: 'pu', exampleJp: 'プール', exampleRomaji: 'puuru', exampleEn: 'swimming pool', group: 'p' },
  ぺ: { char: 'ぺ', katakana: 'ペ', romaji: 'pe', exampleJp: 'ペン', exampleRomaji: 'pen', exampleEn: 'pen', group: 'p' },
  ぽ: { char: 'ぽ', katakana: 'ポ', romaji: 'po', exampleJp: 'ポスト', exampleRomaji: 'posuto', exampleEn: 'mailbox', group: 'p' },

  きゃ: { char: 'きゃ', katakana: 'キャ', romaji: 'kya', exampleJp: 'きゃく (客)', exampleRomaji: 'kyaku', exampleEn: 'guest / customer', group: 'combo' },
  きゅ: { char: 'きゅ', katakana: 'キュ', romaji: 'kyu', exampleJp: 'きゅうり (胡瓜)', exampleRomaji: 'kyuuri', exampleEn: 'cucumber', group: 'combo' },
  きょ: { char: 'きょ', katakana: 'キョ', romaji: 'kyo', exampleJp: 'きょう (今日)', exampleRomaji: 'kyou', exampleEn: 'today', group: 'combo' },
  しゃ: { char: 'しゃ', katakana: 'シャ', romaji: 'sha', exampleJp: 'しゃしん (写真)', exampleRomaji: 'shashin', exampleEn: 'photo', group: 'combo' },
  しゅ: { char: 'しゅ', katakana: 'シュ', romaji: 'shu', exampleJp: 'しゅみ (趣味)', exampleRomaji: 'shumi', exampleEn: 'hobby', group: 'combo' },
  しょ: { char: 'しょ', katakana: 'ショ', romaji: 'sho', exampleJp: 'しょくどう (食堂)', exampleRomaji: 'shokudou', exampleEn: 'cafeteria', group: 'combo' },
  ちゃ: { char: 'ちゃ', katakana: 'チャ', romaji: 'cha', exampleJp: 'お茶 (おちゃ)', exampleRomaji: 'ocha', exampleEn: 'tea', group: 'combo' },
  ちゅ: { char: 'ちゅ', katakana: 'チュ', romaji: 'chu', exampleJp: 'ちゅうしゃじょう (駐車場)', exampleRomaji: 'chuushajou', exampleEn: 'parking lot', group: 'combo' },
  ちょ: { char: 'ちょ', katakana: 'チョ', romaji: 'cho', exampleJp: 'ちょっと', exampleRomaji: 'chotto', exampleEn: 'a little bit', group: 'combo' },
  にゃ: { char: 'にゃ', katakana: 'ニャ', romaji: 'nya', exampleJp: 'にゃーにゃー (鳴き声)', exampleRomaji: 'nyaanyaa', exampleEn: 'cat meowing sound', group: 'combo' },
  にゅ: { char: 'にゅ', katakana: 'ニュ', romaji: 'nyu', exampleJp: 'ぎゅうにゅう (牛乳)', exampleRomaji: 'gyuunyuu', exampleEn: 'milk', group: 'combo' },
  にょ: { char: 'にょ', katakana: 'ニョ', romaji: 'nyo', exampleJp: 'にょうぼう (女房)', exampleRomaji: 'nyoubou', exampleEn: 'wife', group: 'combo' },
  ひゃ: { char: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', exampleJp: 'ひゃく (百)', exampleRomaji: 'hyaku', exampleEn: 'one hundred', group: 'combo' },
  ひゅ: { char: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', exampleJp: 'ひゅうひゅう', exampleRomaji: 'hyuuhyuu', exampleEn: 'sound of whistling wind', group: 'combo' },
  ひょ: { char: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', exampleJp: 'ひょうげん (表現)', exampleRomaji: 'hyougen', exampleEn: 'expression', group: 'combo' },
  みゃ: { char: 'みゃ', katakana: 'ミャ', romaji: 'mya', exampleJp: 'みゃく (脈)', exampleRomaji: 'myaku', exampleEn: 'pulse', group: 'combo' },
  みゅ: { char: 'みゅ', katakana: 'ミュ', romaji: 'myu', exampleJp: 'ミュージアム', exampleRomaji: 'myuujiamu', exampleEn: 'museum', group: 'combo' },
  みょ: { char: 'みょ', katakana: 'ミョ', romaji: 'myo', exampleJp: 'みょうじ (名字)', exampleRomaji: 'myouji', exampleEn: 'family surname', group: 'combo' },
  りゃ: { char: 'りゃ', katakana: 'リャ', romaji: 'rya', exampleJp: 'りゃくす (略す)', exampleRomaji: 'ryakusu', exampleEn: 'to abbreviate', group: 'combo' },
  りゅ: { char: 'りゅ', katakana: 'リュ', romaji: 'ryu', exampleJp: 'りゅうがくせい (留学生)', exampleRomaji: 'ryuugakusei', exampleEn: 'international student', group: 'combo' },
  りょ: { char: 'りょ', katakana: 'リョ', romaji: 'ryo', exampleJp: 'りょこう (旅行)', exampleRomaji: 'ryokou', exampleEn: 'travel / trip', group: 'combo' },
  ぎゃ: { char: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', exampleJp: 'ギャップ', exampleRomaji: 'gyappu', exampleEn: 'gap', group: 'combo' },
  ぎゅ: { char: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', exampleJp: 'ぎゅうにく (牛肉)', exampleRomaji: 'gyuuniku', exampleEn: 'beef', group: 'combo' },
  ぎょ: { char: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', exampleJp: 'ぎょうざ (餃子)', exampleRomaji: 'gyouza', exampleEn: 'dumpling / gyoza', group: 'combo' },
  じゃ: { char: 'じゃ', katakana: 'ジャ', romaji: 'ja', exampleJp: 'じゃあ、また', exampleRomaji: 'jaa, mata', exampleEn: 'well then, see you', group: 'combo' },
  じゅ: { char: 'じゅ', katakana: 'ジュ', romaji: 'ju', exampleJp: 'じゅぎょう (授業)', exampleRomaji: 'jugyou', exampleEn: 'class / lesson', group: 'combo' },
  じょ: { char: 'じょ', katakana: 'ジョ', romaji: 'jo', exampleJp: 'じょせい (女性)', exampleRomaji: 'josei', exampleEn: 'woman / female', group: 'combo' },
  びゃ: { char: 'びゃ', katakana: 'ビャ', romaji: 'bya', exampleJp: 'さんびゃく (三百)', exampleRomaji: 'sanbyaku', exampleEn: 'three hundred', group: 'combo' },
  びゅ: { char: 'びゅ', katakana: 'ビュ', romaji: 'byu', exampleJp: 'ビュッフェ', exampleRomaji: 'byuffe', exampleEn: 'buffet', group: 'combo' },
  びょ: { char: 'びょ', katakana: 'ビョ', romaji: 'byo', exampleJp: 'びょういん (病院)', exampleRomaji: 'byouin', exampleEn: 'hospital', group: 'combo' },
  ぴゃ: { char: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', exampleJp: 'ろっぴゃく (六百)', exampleRomaji: 'roppyaku', exampleEn: 'six hundred', group: 'combo' },
  ぴゅ: { char: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', exampleJp: 'ピューマ', exampleRomaji: 'pyuuma', exampleEn: 'puma', group: 'combo' },
  ぴょ: { char: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', exampleJp: 'ぴょんぴょん', exampleRomaji: 'pyonpyon', exampleEn: 'hopping / bouncing', group: 'combo' },
};

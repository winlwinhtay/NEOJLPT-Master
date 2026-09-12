import { SupportedLanguage } from '../../types/i18n';

export const GRAMMAR_MULTILINGUAL_MAP: Record<string, Partial<Record<SupportedLanguage, { meaning: string; explanation: string }>>> = {
  '〜は〜です': {
    en: { meaning: 'A is B (Polite Copula)', explanation: 'The fundamental sentence structure in Japanese. は marks the topic and です is the polite copula "to be".' },
    ja: { meaning: 'AはBである（丁寧な断定）', explanation: '日本語の基本文型。「は」は主題を表し、「です」は丁寧な断定を表します。' },
    my: { meaning: 'A သည် B ဖြစ်ပါသည် (ယဉ်ကျေးသောအဆို)', explanation: 'ဂျပန်ဘာသာ၏ အခြေခံဝါကျတည်ဆောက်ပုံဖြစ်သည်။ 「は」(ဝ) သည် အဓိကအကြောင်းအရာကို ပြပြီး 「です」 သည် ဖြစ်ပါသည်ဟု ယဉ်ကျေးစွာ ဖော်ပြသည်။' },
    th: { meaning: 'A คือ/เป็น B (รูปสุภาพ)', explanation: 'โครงสร้างประโยคพื้นฐานของภาษาญี่ปุ่น 「は」ชี้หัวข้อเรื่อง และ 「です」เป็นคำลงท้ายสุภาพแปลว่า เป็น/คือ' },
    zh: { meaning: 'A是B（礼貌断定）', explanation: '日语最基础的句型。「は」提示句子主题，「です」表示礼貌的断定“是”。' },
    ko: { meaning: 'A는 B입니다 (정중한 단정)', explanation: '일본어의 기본 문형입니다. 「は」(와)는 주제를 나타내고, 「です」는 정중한 단정("~입니다")을 나타냅니다.' },
    es: { meaning: 'A es B (Cópula Cortés)', explanation: 'Estructura básica en japonés. は marca el tema y です es la cópula cortés "ser".' },
    fr: { meaning: 'A est B (Copule Polie)', explanation: 'Structure fondamentale en japonais. は marque le thème et です est la copule polie signifiant "être".' },
    vi: { meaning: 'A là B (Khẳng định lịch sự)', explanation: 'Cấu trúc câu cơ bản nhất trong tiếng Nhật. は biểu thị chủ đề và です là vị ngữ khẳng định lịch sự.' },
    id: { meaning: 'A adalah B (Kopula Sopan)', explanation: 'Struktur kalimat paling mendasar dalam bahasa Jepang. は menandai topik dan です adalah kopula sopan "adalah".' },
    tr: { meaning: "A, B'dir (Kibar Yüklem)", explanation: 'Japoncadaki temel cümle yapısıdır. 「は」 konuyu belirtir ve 「です」 kibar "olmak" ekidir.' },
    de: { meaning: 'A ist B (Höfliche Kopula)', explanation: 'Die grundlegende Satzstruktur im Japanischen. は markiert das Thema und です ist die höfliche Kopula "sein".' },
    pt: { meaning: 'A é B (Cópula Polida)', explanation: 'A estrutura básica de frase em japonês. は marca o tópico e です é a cópula polida "ser".' },
    nl: { meaning: 'A is B (Beleefde Koppelwerkwoord)', explanation: 'De fundamentele zinsstructuur in het Japans. は markeert het onderwerp en です is het beleefde koppelwerkwoord "zijn".' },
    hi: { meaning: 'A, B है (विनम्र संयोजक)', explanation: 'जापानी भाषा में मूल वाक्य संरचना। は विषय को दर्शाता है और です विनम्र क्रिया "है" है।' },
    bn: { meaning: 'A হলো B (ভদ্র সংযোজক)', explanation: 'জাপানি ভাষার মূল বাক্য গঠন। は মূল বিষয়কে নির্দেশ করে এবং です হলো ভদ্র "হওয়া" ক্রিয়া।' },
    ms: { meaning: 'A ialah B (Kopula Sopan)', explanation: 'Struktur ayat asas dalam bahasa Jepun. は menandakan topik dan です ialah kopula sopan "ialah/adalah".' },
    ar: { meaning: 'A هو B (رابطة مهذبة)', explanation: 'التركيب الأساسي للجملة في اللغة اليابانية. は تحدد موضوع الجملة و です هي رابطة الكينونة المهذبة.' },
    tl: { meaning: 'Ang A ay B (Magalang na Pang-ugnay)', explanation: 'Ang pangunahing estruktura ng pangungusap sa Hapones. は ang nagmamarka ng paksa at ang です ay magalang na "ay".' },
  },
  '〜わけだ': {
    en: { meaning: 'That is why / Naturally / No wonder (Logical Conclusion)', explanation: 'Expresses that a situation is a natural, logical result based on facts or reasons.' },
    ja: { meaning: '〜というわけだ（当然の帰結・納得）', explanation: '理由や事実に基づき、当然そうなるという納得や論理的結論を表します。' },
    my: { meaning: 'ဒါကြောင့်မို့လို့ဖြစ်သည် / သဘာဝကျစွာဖြစ်သည် (ယုတ္တိရှိသောကောက်ချက်)', explanation: 'အကြောင်းရင်း သို့မဟုတ် အချက်အလက်များအပေါ် အခြေခံ၍ သဘာဝကျစွာ ထိုသို့ဖြစ်ရသည်ဟု သဘောပေါက်နားလည်မှုကို ဖော်ပြသည်။' },
    th: { meaning: 'มิน่าล่ะถึงเป็นอย่างนั้น / ก็สมควรแล้ว (ข้อสรุปเชิงตรรกะ)', explanation: 'แสดงถึงความเข้าใจอย่างมีเหตุผลว่าทำไมผลลัพธ์จึงออกมาเป็นเช่นนั้น' },
    zh: { meaning: '原来如此 / 难怪 / 必然是这样（逻辑推论）', explanation: '基于事实或前因，得出“必然会是这种结果”的理解与逻辑推论。' },
    ko: { meaning: '그러니 당연하다 / 어쩐지 그렇더라 (논리적 귀결)', explanation: '이유나 사실에 근거하여 당연히 그런 결과가 됨을 납득했을 때 사용합니다.' },
    es: { meaning: 'Con razón / Es natural que (Conclusión Lógica)', explanation: 'Expresa que una situación es una consequence lógica y natural basada en hechos.' },
    fr: { meaning: "C'est pourquoi / Pas étonnant que (Conclusion Logique)", explanation: "Exprime qu'une situation est le résultat logique et naturel d'une raison donnée." },
    vi: { meaning: 'Thảo nào / Đương nhiên là như vậy (Kết luận logic)', explanation: 'Biểu thị sự thấu hiểu rằng một kết quả là đương nhiên dựa trên lý do đã biết.' },
    id: { meaning: 'Pantas saja / Wajar saja (Kesimpulan Logis)', explanation: 'Menyatakan bahwa suatu situasi adalah hasil yang wajar dan logis berdasarkan alasan.' },
    tr: { meaning: 'Demek bu yüzden / Boşuna değil (Mantıksal Sonuç)', explanation: 'Gerçeklere veya nedenlere dayanarak bir durumun doğal ve mantıklı sonucunu ifade eder.' },
    de: { meaning: 'Kein Wunder, dass / Daher also (Logische Schlussfolgerung)', explanation: 'Drückt aus, dass eine Situation ein logisches und natürliches Ergebnis von Tatsachen ist.' },
    pt: { meaning: 'É por isso / Não é à toa que (Conclusão Lógica)', explanation: 'Expressa que uma situação é uma consequência natural e lógica baseada em fatos.' },
    nl: { meaning: 'Geen wonder dat / Daarom dus (Logische Conclusie)', explanation: 'Drukt uit dat een situatie een natuurlijk en logisch gevolg is van feiten.' },
    hi: { meaning: 'तभी तो / स्वाभाविक रूप से (तार्किक निष्कर्ष)', explanation: 'तथ्यों के आधार पर यह स्वाभाविक निष्कर्ष दर्शाता है कि ऐसा क्यों हुआ।' },
    bn: { meaning: 'তাই তো / স্বাভাবিকভাবেই এমন (যৌক্তিক সিদ্ধান্ত)', explanation: 'বাস্তব তথ্যের ওপর ভিত্তি করে স্বাভাবিক পরিণতি উপলব্ধি করা বোঝায়।' },
    ms: { meaning: 'Patutlah / Tidak hairanlah (Kesimpulan Logik)', explanation: 'Menyatakan bahawa sesuatu keadaan adalah hasil logik dan wajar berdasarkan fakta.' },
    ar: { meaning: 'لهذا السبب / لا عجب أن... (استنتاج منطقي)', explanation: 'يعبر عن فهم أن النتيجة طبيعية ومنطقية تمامًا بناءً على الأسباب.' },
    tl: { meaning: 'Kaya naman pala / Natural lang (Lohikal na Konklusyon)', explanation: 'Nagpapahayag na ang isang sitwasyon ay natural at lohikal na resulta batay sa mga dahilan.' },
  },
  '〜はずだ': {
    en: { meaning: 'Expected to / Bound to be (Logical Expectation)', explanation: 'Expresses a strong expectation based on objective evidence or logic.' },
    ja: { meaning: '〜はずである（客観的根拠に基づく確信）', explanation: '客観的な根拠や予定に基づいて、当然そうなるはずだという強い確信を表します。' },
    my: { meaning: '... ဖြစ်သင့်သည် / ဖြစ်ရမည် (ယုတ္တိရှိသောမျှော်လင့်ချက်)', explanation: 'ခိုင်လုံသော အထောက်အထားများအပေါ် မူတည်၍ သေချာပေါက် ထိုသို့ဖြစ်လိမ့်မည်ဟု ယူဆရာတွင် သုံးသည်။' },
    th: { meaning: 'น่าจะ... / ควรจะ...เป็นแน่ (ความคาดหมายตามหลักเหตุผล)', explanation: 'แสดงความมั่นใจอย่างมีเหตุผลว่าสิ่งนั้นต้องเกิดขึ้นอย่างแน่นอน' },
    zh: { meaning: '理应 / 应当 / 按理说（确信推测）', explanation: '基于客观依据或常理，表示非常有把握的推断“按理应当如此”。' },
    ko: { meaning: '~할 터이다 / ~임에 틀림없다 (논리적 확신)', explanation: '객관적인 근거나 약속에 비추어 당연히 그럴 것이라는 강한 확신을 나타냅니다.' },
    es: { meaning: 'Se espera que / Debería ser (Expectativa Lógica)', explanation: 'Expresa una fuerte expectativa basada en razones u evidencias objetivas.' },
    fr: { meaning: 'Devrait être / Censé faire (Attente Logique)', explanation: 'Exprime une forte attente fondée sur des faits objectifs ou la logique.' },
    vi: { meaning: 'Chắc chắn là / Đáng lẽ phải (Kỳ vọng logic)', explanation: 'Biểu thị sự chắc chắn có căn cứ rằng điều gì đó sẽ diễn ra theo lẽ tự nhiên.' },
    id: { meaning: 'Seharusnya / Pasti (Ekspektasi Logis)', explanation: 'Menyatakan keyakinan kuat bahwa sesuatu pasti terjadi berdasarkan bukti logis.' },
    tr: { meaning: 'Olması gerekir / Beklenir (Mantıksal Beklenti)', explanation: 'Nesnel kanıtlara dayanarak kesin bir beklentiyi ifade eder.' },
    de: { meaning: 'Müsste eigentlich / Sollte so sein (Erwartung)', explanation: 'Drückt eine feste Erwartung basierend auf objektiven Beweisen oder Logik aus.' },
    pt: { meaning: 'Deveria ser / Espera-se que (Expectativa Lógica)', explanation: 'Expressa uma forte expectativa baseada em evidências lógicas.' },
    nl: { meaning: 'Zou moeten zijn (Logische Verwachting)', explanation: 'Drukt een sterke verwachting uit op basis van objectief bewijs of logica.' },
    hi: { meaning: 'होना चाहिए / अवश्य होगा (तार्किक अपेक्षा)', explanation: 'तथ्यों या तर्क के आधार पर पक्की उम्मीद को दर्शाता है।' },
    bn: { meaning: 'হওয়ার কথা / নিশ্চয়ই হবে (যৌক্তিক প্রত্যাশা)', explanation: 'প্রমাণের ভিত্তিতে দৃঢ় প্রত্যাশা প্রকাশ করে।' },
    ms: { meaning: 'Sepatutnya / Pasti (Jangkaan Logik)', explanation: 'Menyatakan jangkaan kukuh berdasarkan bukti objektif atau logik.' },
    ar: { meaning: 'من المفترض أن... (توقع منطقي مؤكد)', explanation: 'يعبر عن توقع قوي ومؤكد مبني على أدلة موضوعية أو منطقية.' },
    tl: { meaning: 'Dapat ay / Inaasahang mangyari (Lohikal na Inaasahan)', explanation: 'Nagpapahayag ng matibay na inaasahan batay sa lohika o ebidensya.' },
  },
  '〜なければならない': {
    en: { meaning: 'Must do / Have to (Obligation)', explanation: 'Expresses an absolute obligation, necessity, or duty that cannot be avoided.' },
    ja: { meaning: '〜しなければならない（義務・必要性）', explanation: '避けることのできない義務、必然的な規則や責任を表します。' },
    my: { meaning: '... လုပ်ကိုလုပ်ရမည် (မဖြစ်မနေ လုပ်ဆောင်ရမည့်တာဝန်)', explanation: 'မလုပ်မဖြစ် မလွဲမသွေ ဆောင်ရွက်ရမည့် တာဝန် သို့မဟုတ် စည်းမျဉ်းကို ပြသည်။' },
    th: { meaning: 'ต้อง... (หน้าที่/ความจำเป็น)', explanation: 'แสดงถึงหน้าที่หรือความจำเป็นอย่างยิ่งที่ไม่อาจหลีกเลี่ยงได้' },
    zh: { meaning: '必须 / 一定要（义务与必要）', explanation: '表示不可推卸的责任、义务或客观上非做不可的必要性。' },
    ko: { meaning: '~해야만 한다 (의무·필요성)', explanation: '피할 수 없는 절대적인 의무나 사회적 규칙, 당연한 당위성을 나타냅니다.' },
    es: { meaning: 'Tener que / Deber (Obligación)', explanation: 'Expresa una obligación o necesidad absoluta que no se puede evitar.' },
    fr: { meaning: 'Devoir / Il faut (Obligation)', explanation: 'Exprime une obligation inévitable, une nécessité ou un devoir strict.' },
    vi: { meaning: 'Phải / Bắt buộc phải (Nghĩa vụ)', explanation: 'Biểu thị nghĩa vụ hoặc sự cần thiết tuyệt đối không thể tránh khỏi.' },
    id: { meaning: 'Harus / Wajib (Kewajiban)', explanation: 'Menyatakan kewajiban atau keharusan mutlak yang tidak bisa dihindari.' },
    tr: { meaning: '-mek zorunda olmak (Zorunluluk)', explanation: 'Kaçınılmaz bir zorunluluğu, görevi veya kuralı ifade eder.' },
    de: { meaning: 'Müssen (Verpflichtung)', explanation: 'Drückt eine unvermeidliche Pflicht, Notwendigkeit oder Regel aus.' },
    pt: { meaning: 'Ter que / Dever (Obrigação)', explanation: 'Expressa uma obrigação ou necessidade absoluta inescapável.' },
    nl: { meaning: 'Moeten (Verplichting)', explanation: 'Drukt een absolute verplichting, noodzaak of regel uit.' },
    hi: { meaning: 'करना ही होगा / अनिवार्य है (कर्तव्य)', explanation: 'एक अनिवार्य दायित्व या आवश्यकता को दर्शाता है जिसे टाला नहीं जा सकता।' },
    bn: { meaning: 'করতেই হবে / বাধ্যবাধকতা (কর্তব্য)', explanation: 'অনিবার্য দায়িত্ব বা নিয়ম বোঝাতে ব্যবহৃত হয় যা এড়ানো যায় না।' },
    ms: { meaning: 'Mesti / Perlu (Kewajipan)', explanation: 'Menyatakan kewajipan atau keperluan mutlak yang mesti dipatuhi.' },
    ar: { meaning: 'يجب أن / لا بد من (إلزام وضرورة)', explanation: 'يعبر عن واجب حتمي أو ضرورة ملحة لا مفر منها.' },
    tl: { meaning: 'Kailangang gawin / Nararapat (Tungkulin)', explanation: 'Nagpapahayag ng obligasyon o pangangailangang hindi maiiwasan.' },
  },
  '〜てはいけない': {
    en: { meaning: 'Must not do (Strict Prohibition)', explanation: 'Expresses a strict ban, rule, or moral prohibition against an action.' },
    ja: { meaning: '〜してはいけない（禁止・不許可）', explanation: '規則やモラルにより、その行為を行うことが禁じられていることを表します。' },
    my: { meaning: '... မလုပ်ရ / မပြုလုပ်ရ (တင်းကျပ်သောတားမြစ်ချက်)', explanation: 'စည်းမျဉ်း သို့မဟုတ် ကျင့်ဝတ်အရ ထိုလုပ်ရပ်ကို မပြုလုပ်ရန် တားမြစ်သည်။' },
    th: { meaning: 'ห้าม...เด็ดขาด (ข้อห้ามอย่างเป็นทางการ)', explanation: 'แสดงถึงกฎระเบียบหรือข้อห้ามอย่างเด็ดขาดที่ไม่อนุญาตให้กระทำ' },
    zh: { meaning: '不可以 / 禁止（严令禁止）', explanation: '依据规章制度或道德准则，严格禁止做出该行为。' },
    ko: { meaning: '~해서는 안 된다 (엄격한 금지)', explanation: '규칙이나 도덕적 이유로 해당 행위를 엄격히 금지할 때 사용합니다.' },
    es: { meaning: 'No se debe / Prohibido (Prohibición estricta)', explanation: 'Expresa una prohibición formal o moral de realizar una acción.' },
    fr: { meaning: 'Il ne faut pas / Interdit de (Interdiction stricte)', explanation: 'Exprime une interdiction formelle ou morale d\'accomplir un acte.' },
    vi: { meaning: 'Không được phép / Cấm (Cấm đoán nghiêm ngặt)', explanation: 'Biểu thị quy định cấm thực hiện hành vi do quy tắc hoặc đạo đức.' },
    id: { meaning: 'Tidak boleh / Dilarang (Larangan tegas)', explanation: 'Menyatakan larangan tegas berdasarkan aturan atau moral.' },
    tr: { meaning: '-memeli / Yasak (Kesin Yasak)', explanation: 'Bir kurala veya ahlaki ilkeye dayanarak kesin bir yasağı ifade eder.' },
    de: { meaning: 'Darf nicht / Verboten (Striktes Verbot)', explanation: 'Drückt ein striktes formelles oder moralisches Verbot einer Handlung aus.' },
    pt: { meaning: 'Não deve / Proibido (Proibição estrita)', explanation: 'Expressa uma proibição formal de praticar uma determinada ação.' },
    nl: { meaning: 'Mag niet / Verboden (Strikt Verbod)', explanation: 'Drukt een strikt verbod of regel uit tegen een bepaalde handeling.' },
    hi: { meaning: 'नहीं करना चाहिए / वर्जित है (सख्त मनाही)', explanation: 'नियम या नैतिकता के आधार पर किसी कार्य पर सख्त रोक दर्शाता है।' },
    bn: { meaning: 'করা যাবে না / নিষিদ্ধ (কঠোর নিষেধাজ্ঞা)', explanation: 'নিয়ম বা নৈতিকতার ভিত্তিতে কোনো কাজের ওপর কঠোর নিষেধাজ্ঞা বোঝায়।' },
    ms: { meaning: 'Tidak boleh / Dilarang (Larangan ketat)', explanation: 'Menyatakan larangan tegas berdasarkan peraturan yang ditetapkan.' },
    ar: { meaning: 'ممنوع / لا يجوز القيام به (تحريم قاطع)', explanation: 'يعبر عن نهي وحظر صارم بناءً على القوانين أو الأعراف.' },
    tl: { meaning: 'Bawal gawin / Hindi dapat (Mahigpit na Pagbabawal)', explanation: 'Nagpapahayag ng mahigpit na pagbabawal batay sa patakaran.' },
  },
  '〜てもいい': {
    en: { meaning: 'May do / Allowed to (Permission)', explanation: 'Expresses granting or asking for permission to perform an action.' },
    ja: { meaning: '〜してもよい（許可・容認）', explanation: 'その行為を行っても差し支えないという許可や容認を表します。' },
    my: { meaning: '... လုပ်လို့ရသည် / ပြုလုပ်နိုင်သည် (ခွင့်ပြုချက်)', explanation: 'ထိုလုပ်ရပ်ကို လုပ်ဆောင်ခွင့်ရှိကြောင်း သို့မဟုတ် ခွင့်တောင်းရာတွင် သုံးသည်။' },
    th: { meaning: 'ทำ...ได้ / อนุญาตให้ทำได้ (การอนุญาต)', explanation: 'แสดงถึงการอนุญาตหรือยินยอมให้กระทำสิ่งใดสิ่งหนึ่งได้' },
    zh: { meaning: '可以 / 允许（许可与容许）', explanation: '表示许可对方做出某种行为，或向对方请求许可。' },
    ko: { meaning: '~해도 좋다 / ~해도 된다 (허가)', explanation: '해당 행동을 해도 괜찮다는 허가나 용인을 나타냅니다.' },
    es: { meaning: 'Se puede / Permitido (Permiso)', explanation: 'Expresa la concesión o solicitud de permiso para realizar una acción.' },
    fr: { meaning: 'Peut / Il est permis de (Permission)', explanation: 'Indique qu\'une action est autorisée ou demande la permission.' },
    vi: { meaning: 'Được phép / Có thể làm (Sự cho phép)', explanation: 'Biểu thị sự đồng ý, cho phép thực hiện một hành động.' },
    id: { meaning: 'Boleh / Diizinkan (Izin)', explanation: 'Menyatakan pemberian izin untuk melakukan suatu tindakan.' },
    tr: { meaning: '-ebilir / İzinli (İzin)', explanation: 'Bir eylemi gerçekleştirmeye izin verildiğini veya izin istendiğini ifade eder.' },
    de: { meaning: 'Dürfen / Erlaubt sein (Erlaubnis)', explanation: 'Drückt die Erlaubnis aus, eine bestimmte Handlung durchzuführen.' },
    pt: { meaning: 'Pode fazer / Permitido (Permissão)', explanation: 'Expressa permissão para realizar determinada ação.' },
    nl: { meaning: 'Mag / Toegestaan (Toestemming)', explanation: 'Drukt uit dat men toestemming heeft om iets te doen.' },
    hi: { meaning: 'कर सकते हैं / अनुमति है (इजाज़त)', explanation: 'किसी कार्य को करने की अनुमति देने या मांगने हेतु प्रयोग होता है।' },
    bn: { meaning: 'করতে পারেন / অনুমতি আছে (অনুমোদন)', explanation: 'কোনো কাজ করার অনুমতি প্রদান বা চাওয়ার ক্ষেত্রে ব্যবহৃত হয়।' },
    ms: { meaning: 'Boleh / Dibenarkan (Kebenaran)', explanation: 'Menyatakan pemberian kebenaran untuk melakukan sesuatu perbuatan.' },
    ar: { meaning: 'يجوز / مسموح به (إذن وسماح)', explanation: 'يعبر عن منح الإذن أو التسامح في القيام بفعل معين.' },
    tl: { meaning: 'Maaaring gawin / Pwede (Pahintulot)', explanation: 'Nagpapahayag ng pagpapahintulot na gawin ang isang bagay.' },
  },
  '〜たことがある': {
    en: { meaning: 'Have done before (Past Experience)', explanation: 'Expresses having had the experience of doing something in the past.' },
    ja: { meaning: '〜したことがある（過去の経験）', explanation: '過去にその行為や出来事を経験した事実があることを表します。' },
    my: { meaning: '... ဖူးသည် (အတိတ်အတွေ့အကြုံ)', explanation: 'အတိတ်ကာလတွင် ထိုအရာကို ပြုလုပ်ခဲ့ဖူးသော အတွေ့အကြုံရှိကြောင်း ပြသည်။' },
    th: { meaning: 'เคย... (ประสบการณ์ในอดีต)', explanation: 'แสดงถึงการเคยมีประสบการณ์ทำสิ่งนั้นมาก่อนในอดีต' },
    zh: { meaning: '曾经做过（过去经历）', explanation: '表示在过去的某个时期拥有做过某事的经验或经历。' },
    ko: { meaning: '~한 적이 있다 (과거의 경험)', explanation: '과거에 그 행동을 해 본 경험이 있음을 나타냅니다.' },
    es: { meaning: 'Haber hecho alguna vez (Experiencia pasada)', explanation: 'Expresa haber tenido la experiencia de hacer algo en el pasado.' },
    fr: { meaning: 'Avoir déjà fait (Expérience passée)', explanation: 'Exprime le fait d\'avoir déjà vécu ou accompli une action par le passé.' },
    vi: { meaning: 'Đã từng làm (Kinh nghiệm quá khứ)', explanation: 'Biểu thị việc đã từng có trải nghiệm làm điều gì đó trong quá khứ.' },
    id: { meaning: 'Pernah melakukan (Pengalaman masa lalu)', explanation: 'Menyatakan bahwa seseorang memiliki pengalaman melakukan sesuatu di masa lalu.' },
    tr: { meaning: '-miş olmak / Daha önce yapmak (Geçmiş Deneyim)', explanation: 'Geçmişte bir eylemi gerçekleştirmiş olma deneyimini ifade eder.' },
    de: { meaning: 'Schon einmal getan haben (Vergangene Erfahrung)', explanation: 'Drückt aus, dass man in der Vergangenheit eine bestimmte Erfahrung gemacht hat.' },
    pt: { meaning: 'Já ter feito (Experiência passada)', explanation: 'Expressa ter tido a experiência de fazer algo no passado.' },
    nl: { meaning: 'Ooit gedaan hebben (Vroegere Ervaring)', explanation: 'Drukt uit dat men in het verleden de ervaring heeft opgedaan iets te doen.' },
    hi: { meaning: 'कभी किया है (अतीत का अनुभव)', explanation: 'अतीत में किसी कार्य को करने के अनुभव को व्यक्त करता है।' },
    bn: { meaning: 'কখনো করেছি (অতীত অভিজ্ঞতা)', explanation: 'অতীতে কোনো কাজ করার অভিজ্ঞতা ছিল তা প্রকাশ করে।' },
    ms: { meaning: 'Pernah melakukan (Pengalaman lampau)', explanation: 'Menyatakan pengalaman pernah melakukan sesuatu pada masa lalu.' },
    ar: { meaning: 'سبق لي أن فعلت... (تجربة سابقة)', explanation: 'يعبر عن امتلاك خبرة وتجربة سابقة في القيام بفعل ما في الماضي.' },
    tl: { meaning: 'Naranasan nang gawin (Nakaraang Karanasan)', explanation: 'Nagpapahayag na nagawa o naranasan na ang isang bagay noon.' },
  },
};


export const EXAMPLE_SENTENCE_MULTILINGUAL_MAP: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  '東京は家賃が高い。生活費がかかるわけだ。': {
    en: 'Rent is expensive in Tokyo. No wonder living expenses are so high.',
    ja: '東京は家賃が高い。生活費が高くなるのも当然だ。',
    my: 'တိုကျိုမှာ အိမ်လခက ဈေးကြီးတယ်။ ဒါကြောင့် နေထိုင်စရိတ်တွေ ကုန်ကျတာပေါ့။',
    th: 'โตเกียวค่าเช่าบ้านแพง มิน่าล่ะค่าครองชีพถึงได้สูง',
    zh: '东京房租很贵。难怪生活费那么高。',
    ko: '도쿄는 집세가 비싸다. 생활비가 많이 드는 법이다.',
    es: 'El alquiler es caro en Tokio. Con razón los gastos de manutención son tan altos.',
    fr: 'Le loyer est cher à Tokyo. Pas étonnant que le coût de la vie soit si élevé.',
    vi: 'Tiền thuê nhà ở Tokyo rất đắt. Thảo nào chi phí sinh hoạt lại cao như vậy.',
    id: 'Sewa rumah di Tokyo mahal. Pantas saja biaya hidup sangat tinggi.',
    tr: "Tokyo'da kiralar pahalı. Yaşam masraflarının bu kadar yüksek olmasına şaşmamalı.",
    de: 'Die Miete in Tokio ist teuer. Kein Wunder, dass die Lebenshaltungskosten so hoch sind.',
    pt: 'O aluguel é caro em Tóquio. Não é à toa que o custo de vida é tão alto.',
    nl: 'De huur in Tokio is duur. Geen wonder dat de kosten van levensonderhoud zo hoog zijn.',
    hi: 'टोक्यो में किराया बहुत महंगा है। कोई आश्चर्य नहीं कि रहने का खर्च इतना अधिक है।',
    bn: 'টোকিওতে বাড়িভাড়া খুব বেশি। তাই জীবনযাত্রার ব্যয় এত বেশি হওয়া স্বাভাবিক।',
    ms: 'Sewa rumah di Tokyo sangat mahal. Patutlah kos sara hidup begitu tinggi.',
    ar: 'الإيجار مرتفع في طوكيو. لا عجب أن تكاليف المعيشة باهظة للغاية.',
    tl: 'Mahal ang upa sa Tokyo. Kaya naman pala napakataas ng gastusin sa pamumuhay.',
  },
  '彼は日本に10年も住んでいるから、日本語が上手なわけだ。': {
    en: 'He has lived in Japan for 10 years, so naturally his Japanese is good.',
    ja: '彼は日本に10年も住んでいるので、日本語が上手なのも当然だ。',
    my: 'သူက ဂျပန်မှာ ၁၀ နှစ်တောင် နေခဲ့တာမို့ ဂျပန်စာတော်တာ သဘာဝကျတာပေါ့။',
    th: 'เขาอาศัยอยู่ในญี่ปุ่นมาตั้ง 10 ปี มิน่าล่ะถึงพูดภาษาญี่ปุ่นเก่ง',
    zh: '他在日本住了整整10年，难怪日语这么好。',
    ko: '그는 일본에 10년이나 살았으니, 일본어를 잘하는 것이 당연하다.',
    es: 'Ha vivido en Japón durante 10 años, así que es natural que su japonés sea bueno.',
    fr: 'Il vit au Japon depuis 10 ans, il est donc naturel que son japonais soit bon.',
    vi: 'Anh ấy sống ở Nhật tận 10 năm rồi, thảo nào tiếng Nhật giỏi thế.',
    id: 'Dia sudah tinggal di Jepang selama 10 tahun, pantas saja bahasa Jepangnya lancar.',
    tr: "10 yıldır Japonya'da yaşıyor, bu yüzden Japoncasının iyi olması çok doğal.",
    de: 'Er lebt seit 10 Jahren in Japan, daher ist es logisch, dass sein Japanisch so gut ist.',
    pt: 'Ele mora no Japão há 10 anos, então é natural que seu japonês seja tão bom.',
    nl: 'Hij woont al 10 jaar in Japan, dus het is logisch dat zijn Japans zo goed is.',
    hi: 'वह 10 साल से जापान में रह रहा है, इसलिए स्वाभाविक है कि उसकी जापानी इतनी अच्छी है।',
    bn: 'সে জাপানে ১০ বছর ধরে বাস করছে, তাই তার জাপানি ভাষা ভালো হওয়াটাই স্বাভাবিক।',
    ms: 'Dia telah tinggal di Jepun selama 10 tahun, jadi wajarlah bahasa Jepunnya sangat fasih.',
    ar: 'لقد عاش في اليابان لمدة 10 سنوات، لذا فمن الطبيعي أن تكون لغته اليابانية ممتازة.',
    tl: 'Nakatira siya sa Japan nang 10 taon, kaya natural lang na magaling siyang mag-Hapon.',
  },
  '明日、早く起きなければなりません。': {
    en: 'I must wake up early tomorrow.',
    ja: '明日、早く起きなければなりません。',
    my: 'မနက်ဖြန် စောစောထရမည်။',
    th: 'พรุ่งนี้ต้องตื่นแต่เช้า',
    zh: '明天必须早起。',
    ko: '내일 일찍 일어나야 합니다.',
    es: 'Mañana tengo que levantarme temprano.',
    fr: 'Je dois me lever tôt demain.',
    vi: 'Ngày mai tôi phải dậy sớm.',
    id: 'Besok saya harus bangun pagi.',
    tr: 'Yarın erken kalkmam gerekiyor.',
    de: 'Ich muss morgen früh aufstehen.',
    pt: 'Amanhã tenho que acordar cedo.',
    nl: 'Ik moet morgen vroeg opstaan.',
    hi: 'मुझे कल सुबह जल्दी उठना होगा।',
    bn: 'আমাকে কাল সকালে তাড়াতাড়ি উঠতে হবে।',
    ms: 'Esok saya mesti bangun awal.',
    ar: 'يجب أن أستيقظ مبكرًا غدًا.',
    tl: 'Kailangan kong gumising nang maaga bukas.',
  },
  '明日は来なくてもいいです。': {
    en: 'You do not have to come tomorrow.',
    ja: '明日は来なくてもいいです。',
    my: 'မနက်ဖြန် မလာလည်း ရပါတယ်။',
    th: 'พรุ่งนี้ไม่จำเป็นต้องมาก็ได้',
    zh: '明天不来也可以。',
    ko: '내일은 오지 않아도 됩니다.',
    es: 'No tienes que venir mañana.',
    fr: "Vous n'avez pas besoin de venir demain.",
    vi: 'Ngày mai không cần đến cũng được.',
    id: 'Besok tidak datang juga tidak apa-apa.',
    tr: 'Yarın gelmeseniz de olur.',
    de: 'Sie müssen morgen nicht kommen.',
    pt: 'Você não precisa vir amanhã.',
    nl: 'Je hoeft morgen niet te komen.',
    hi: 'आपको कल आने की आवश्यकता नहीं है।',
    bn: 'আগামীকাল না আসলেও চলবে।',
    ms: 'Esok tidak perlu datang pun tak apa.',
    ar: 'لا داعي للمجيء غدًا.',
    tl: 'Hindi mo kailangang pumunta bukas.',
  },
};

export function translateExampleSentence(jp: string, en: string, lang: SupportedLanguage): string {
  if (lang === 'en') return en;
  if (lang === 'ja') return jp;
  const cleanJp = jp.trim();
  if (EXAMPLE_SENTENCE_MULTILINGUAL_MAP[cleanJp] && EXAMPLE_SENTENCE_MULTILINGUAL_MAP[cleanJp][lang]) {
    return EXAMPLE_SENTENCE_MULTILINGUAL_MAP[cleanJp][lang]!;
  }
  return en;
}

export function getLocalizedGrammarContent(pattern: string, enMeaning: string, enExplanation: string): {
  meaningsByLang: Record<SupportedLanguage, string>;
  explanationsByLang: Record<SupportedLanguage, string>;
} {
  const match = GRAMMAR_MULTILINGUAL_MAP[pattern];
  const allLangs: SupportedLanguage[] = [
    'en', 'ja', 'my', 'th', 'zh', 'ko', 'es', 'fr', 'vi', 'id',
    'tr', 'de', 'pt', 'nl', 'hi', 'bn', 'ms', 'ar', 'tl'
  ];

  const meaningsByLang = {} as Record<SupportedLanguage, string>;
  const explanationsByLang = {} as Record<SupportedLanguage, string>;

  allLangs.forEach((lang) => {
    if (match && match[lang]) {
      meaningsByLang[lang] = match[lang]!.meaning;
      explanationsByLang[lang] = match[lang]!.explanation;
    } else {
      switch (lang) {
        case 'en':
          meaningsByLang[lang] = enMeaning;
          explanationsByLang[lang] = enExplanation;
          break;
        case 'ja':
          meaningsByLang[lang] = '【' + pattern + '】の意味・用法（' + enMeaning + '）';
          explanationsByLang[lang] = '【' + pattern + '】はJLPT試験で頻出の重要文法項目です。接続と文脈上のニュアンスに注意して学習しましょう。';
          break;
        case 'my':
          meaningsByLang[lang] = pattern + ' သဒ္ဒါအဓိပ္ပာယ် (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】သည် JLPT စာမေးပွဲတွင် အလွန်အရေးပါသော သဒ္ဒါပုံစံဖြစ်သည်။ ဝါကျဆက်စပ်မှုနှင့် အသုံးအနှုန်းသဘောသဘာဝကို သေချာလေ့လာပါ။';
          break;
        case 'th':
          meaningsByLang[lang] = 'ความหมายของ ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】เป็นไวยากรณ์สำคัญที่ออกสอบบ่อยใน JLPT ควรสังเกตการเชื่อมคำและบริบทการใช้งานอย่างละเอียด';
          break;
        case 'zh':
          meaningsByLang[lang] = pattern + ' 的语法意义（' + enMeaning + '）';
          explanationsByLang[lang] = '【' + pattern + '】是JLPT考试中高频出现的重点语法。请特别注意句型接续与前后语境的细微语感。';
          break;
        case 'ko':
          meaningsByLang[lang] = pattern + ' 문법 의미 (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】은 JLPT 시험에 자주 출제되는 핵심 문법입니다. 문장 접속 형태와 문맥에 따른 뉘앙스에 주의하여 학습하세요。';
          break;
        case 'es':
          meaningsByLang[lang] = 'Significado de ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】es una estructura clave de JLPT. Preste atención a las conexiones gramaticales y los matices del contexto.';
          break;
        case 'fr':
          meaningsByLang[lang] = 'Sens de ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】est une structure essentielle pour le JLPT. Veillez aux règles de connexion et aux nuances contextuelles.';
          break;
        case 'vi':
          meaningsByLang[lang] = 'Ý nghĩa ngữ pháp ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】là điểm ngữ pháp trọng tâm trong kỳ thi JLPT. Hãy chú ý cách kết hợp từ và sắc thái ngữ cảnh.';
          break;
        case 'id':
          meaningsByLang[lang] = 'Arti tata bahasa ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】adalah pola tata bahasa penting dalam ujian JLPT. Perhatikan konjugasi dan nuansa konteksnya.';
          break;
        case 'tr':
          meaningsByLang[lang] = pattern + ' Gramer Anlamı (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】JLPT sınavında sıkça çıkan önemli bir gramer yapısıdır. Bağlantı kurallarına ve bağlamdaki nüanslara dikkat ediniz.';
          break;
        case 'de':
          meaningsByLang[lang] = 'Bedeutung von ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】ist ein wichtiges Grammatikmuster für den JLPT. Achten Sie auf die Anschlussformen und kontextuellen Nuancen.';
          break;
        case 'pt':
          meaningsByLang[lang] = 'Significado de ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】é uma estrutura essencial para o JLPT. Preste atenção às conexões gramaticais e ao contexto.';
          break;
        case 'nl':
          meaningsByLang[lang] = 'Betekenis van ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】is een belangrijk grammaticapatroon voor het JLPT-examen. Let op de verbindingsregels en contextuele nuances.';
          break;
        case 'hi':
          meaningsByLang[lang] = pattern + ' का अर्थ (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】जेएलपीटी परीक्षा के लिए महत्वपूर्ण व्याकरण बिंदु है। इसके संयोजन और संदर्भ पर ध्यान दें।';
          break;
        case 'bn':
          meaningsByLang[lang] = pattern + ' এর ব্যাকরণগত অর্থ (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】জেএলপিটি পরীক্ষার জন্য একটি গুরুত্বপূর্ণ ব্যাকরণ কাঠামো। এর সংযোগ এবং অর্থ সাবধানে বুঝুন।';
          break;
        case 'ms':
          meaningsByLang[lang] = 'Maksud tatabahasa ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】adalah pola tatabahasa penting untuk peperiksaan JLPT. Perhatikan sambungan ayat dan konteksnya.';
          break;
        case 'ar':
          meaningsByLang[lang] = 'معنى القاعدة ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】قاعدة مهمة جدًا في اختبار JLPT. يرجى الانتباه لطريقة الربط والدلالات في سياق الجملة.';
          break;
        case 'tl':
          meaningsByLang[lang] = 'Kahulugan ng ' + pattern + ' (' + enMeaning + ')';
          explanationsByLang[lang] = '【' + pattern + '】ay isang mahalagang padron ng balarila sa JLPT. Bigyang-pansin ang wastong pagkakabit at konteksto.';
          break;
        default:
          (meaningsByLang as Record<string, string>)[lang] = enMeaning;
          (explanationsByLang as Record<string, string>)[lang] = enExplanation;
      }
    }
  });

  return { meaningsByLang, explanationsByLang };
}

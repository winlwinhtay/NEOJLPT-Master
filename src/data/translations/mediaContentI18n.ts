// ============================================================================
// MEDIA CONTENT (READING & LISTENING) MULTILINGUAL I18N DATA
// Complete Translations for All Reading Passages & Listening Audio Dialogues
// Across Supported Languages: en, ja, my, th, zh, ko, es, fr, vi, id, de, etc.
// ============================================================================

import { SupportedLanguage } from '../../types/i18n';

// ----------------------------------------------------------------------------
// 1. Reading Passages Translations (8 Canonical JLPT Passages N5 -> N1)
// ----------------------------------------------------------------------------
export const READING_PASSAGES_I18N: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  // N5: 田中さんの一日 (Mr. Tanaka's Daily Routine)
  'r-n5-01': {
    en: `Mr. Tanaka wakes up at 6:00 every morning.
After washing his face, he eats bread and eggs.
Then, he drinks coffee. At 7:30 in the morning, he goes to his company by train.
Work is from 8:00 to 5:00.
In the evening, he reads books and watches TV at home.
He goes to bed at 11:00.`,
    ja: `田中さんは毎朝６時に起きます。
顔を洗ってから、パンと卵を食べます。
そして、コーヒーを飲みます。朝７時半に電車で会社へ行きます。
会社は８時から５時までです。
夜は家で本を読んだり、テレビを見たりします。
１１時に寝ます。`,
    my: `မစ္စတာတာနာခါသည် နေ့စဉ်မနက် ၆ နာရီတွင် အိပ်ရာထပါသည်။
မျက်နှာသစ်ပြီးနောက် ပေါင်မုန့်နှင့် ကြက်ဥကို စားပါသည်။
ထို့နောက် ကော်ဖီသောက်ပါသည်။ မနက် ၇ နာရီခွဲတွင် ရထားဖြင့် ကုမ္ပဏီသို့ သွားပါသည်။
ကုမ္ပဏီအလုပ်ချိန်သည် မနက် ၈ နာရီမှ ညနေ ၅ နာရီအထိ ဖြစ်ပါသည်။
ညဘက်တွင် အိမ်၌ စာအုပ်ဖတ်ခြင်း၊ တီဗွီကြည့်ခြင်းများ ပြုလုပ်ပါသည်။
ည ၁၁ နာရီတွင် အိပ်ရာဝင်ပါသည်။`,
    th: `คุณทานากะตื่นนอนเวลา 6:00 น. ทุกเช้า
หลังจากล้างหน้า เขารับประทานขนมปังและไข่
จากนั้น ดื่มกาแฟ เวลา 7:30 น. ในตอนเช้า เขาเดินทางไปทำงานโดยรถไฟ
เวลาทำงานคือตั้งแต่ 8:00 น. ถึง 17:00 น.
ในตอนเย็น เขาอ่านหนังสือและดูทีวีที่บ้าน
เขาเข้านอนเวลา 23:00 น.`,
    zh: `田中先生每天早晨6点起床。
洗完脸后，他吃面包和鸡蛋。
然后喝咖啡。早上7点半乘电车去公司。
工作时间是从早上8点到下午5点。
晚上在家看看书、看看电视。
11点就寝睡觉。`,
    ko: `다나카 씨는 매일 아침 6시에 일어납니다.
세수를 한 후 빵과 달걀을 먹습니다.
그리고 커피를 마십니다. 아침 7시 반에 전철로 회사에 갑니다.
회사는 8시부터 5시까지입니다.
저녁에는 집에서 책을 읽거나 텔레비전을 봅니다.
11시에 잠자리에 듭니다.`,
    es: `El señor Tanaka se despierta a las 6:00 todas las mañanas.
Después de lavarse la cara, come pan y huevos.
Luego toma café. A las 7:30 de la mañana, va a su empresa en tren.
El horario de trabajo es de 8:00 a 17:00.
Por la noche lee libros y ve la televisión en casa.
Se acuesta a las 23:00.`,
    fr: `M. Tanaka se réveille tous les matins à 6h00.
Après s'être lavé le visage, il mange du pain et des œufs.
Ensuite, il boit du café. À 7h30 du matin, il se rend à son entreprise en train.
Le travail a lieu de 8h00 à 17h00.
Le soir, il lit des livres et regarde la télévision chez lui.
Il se couche à 23h00.`,
    vi: `Anh Tanaka thức dậy lúc 6 giờ mỗi buổi sáng.
Sau khi rửa mặt, anh ăn bánh mì và trứng.
Sau đó, anh uống cà phê. Vào lúc 7 giờ 30 phút sáng, anh đi tàu điện đến công ty.
Giờ làm việc ở công ty là từ 8 giờ đến 17 giờ.
Buổi tối anh ở nhà đọc sách và xem ti vi.
Anh đi ngủ lúc 23 giờ.`,
    id: `Pak Tanaka bangun pukul 06.00 setiap pagi.
Setelah mencuci muka, dia makan roti dan telur.
Kemudian, dia minum kopi. Pada pukul 07.30 pagi, dia pergi ke kantor dengan kereta.
Jam kerja dari pukul 08.00 hingga 17.00.
Di malam hari, dia membaca buku dan menonton TV di rumah.
Dia tidur pada pukul 23.00.`,
    de: `Herr Tanaka steht jeden Morgen um 6:00 Uhr auf.
Nachdem er sich das Gesicht gewaschen hat, isst er Brot und Eier.
Danach trinkt er Kaffee. Um 7:30 Uhr morgens fährt er mit dem Zug zur Arbeit.
Die Arbeitszeit ist von 8:00 bis 17:00 Uhr.
Abends liest er zu Hause Bücher und sieht fern.
Um 23:00 Uhr geht er schlafen.`,
    pt: `O Sr. Tanaka acorda às 6h todas as manhãs.
Depois de lavar o rosto, come pão e ovos.
Em seguida, bebe café. Às 7h30 da manhã, vai para a empresa de trem.
O trabalho é das 8h às 17h.
À noite lê livros e assiste televisão em casa.
Vai para a cama às 23h.`,
  },

  // N4: 京都への週末旅行 (My Weekend Trip to Kyoto)
  'r-n4-01': {
    en: `Last weekend, I went on a trip to Kyoto with friends.
We departed from Tokyo by Shinkansen early Saturday morning.
Kyoto in autumn had beautiful autumn foliage, and Kiyomizu-dera temple was crowded with many tourists.
At noon, we ate delicious Yudofu (boiled tofu).
On Sunday, we took a stroll through the bamboo grove in Arashiyama.
Because the weather was great, we were able to take lots of photos.
I definitely want to visit Kyoto again next year.`,
    ja: `先週末、友達と一緒に京都へ旅行に行きました。
土曜日の朝早く東京から新幹線で出発しました。
秋の京都は紅葉がとても綺麗で、清水寺にはたくさんの観光客がいました。
お昼には美味しい湯豆腐を食べました。
日曜日は嵐山の竹林の道を散歩しました。
天気が良かったので、綺麗な写真がたくさん撮れました。
来年もぜひまた京都に行きたいです。`,
    my: `ပြီးခဲ့သည့် သီတင်းပတ်ကုန်က သူငယ်ချင်းများနှင့်အတူ ကျိုတိုသို့ ခရီးသွားခဲ့ပါသည်။
စနေနေ့မနက် အစောကြီးတွင် တိုကျိုမှ ကျည်ဆန်ရထား (Shinkansen) ဖြင့် စတင်ထွက်ခွာခဲ့သည်။
ဆောင်းဦးရာသီ ကျိုတိုသည် သစ်ရွက်နီရောင်စုံများ အလွန်လှပပြီး ခိယောမိဇု ဘုရားကျောင်းတွင် ခရီးသွားဧည့်သည်များစွာ စည်ကားနေခဲ့သည်။
နေ့လယ်တွင် အရသာရှိသော ယုဒိုဖု (တို့ဟူးပြုတ်) ကို စားသုံးခဲ့သည်။
တနင်္ဂနွေနေ့တွင် အရရှိယာမ ဝါးတောလမ်းတစ်လျှောက် လမ်းလျှောက် အပန်းဖြေခဲ့သည်။
ရာသီဥတု သာယာကောင်းမွန်သောကြောင့် လှပသောဓာတ်ပုံများစွာ ရိုက်ကူးနိုင်ခဲ့ပါသည်။
နောက်နှစ်တွင်လည်း ကျိုတိုသို့ မဖြစ်မနေ ထပ်မံသွားရောက်လည်ပတ်လိုပါသည်။`,
    th: `สุดสัปดาห์ที่แล้ว ฉันได้ไปเที่ยวเกียวโตกับเพื่อนๆ
เราออกเดินทางจากโตเกียวด้วยชินคันเซ็นแต่เช้าตรู่ของวันเสาร์
เกียวโตในฤดูใบไม้ร่วงมีใบไม้เปลี่ยนสีที่งดงามมาก และวัดคิโยมิซุเดระก็คลาคล่ำไปด้วยนักท่องเที่ยวมากมาย
มื้อเที่ยงเราได้รับประทานยูโดฟุ (เต้าหู้ต้ม) แสนอร่อย
วันอาทิตย์เราไปเดินเล่นตามทางเดินป่าไผ่อาราชิยามะ
เนื่องจากอากาศดีมาก จึงสามารถถ่ายรูปสวยๆ ได้มากมาย
ปีหน้าฉันอยากไปเที่ยวเกียวโตอีกอย่างแน่นอน`,
    zh: `上周末我和朋友一起去京都旅行。
周六清晨从东京乘坐新干线出发。
秋天的京都红叶美不胜收，清水寺挤满了众多观光游客。
中午品尝了美味的汤豆腐。
周日我们在岚山的竹林小径漫步散步。
因为天气晴朗，拍了许多绝美照片。
明年我一定还想再去京都游览。`,
    ko: `지난 주말 친구와 함께 교토로 여행을 다녀왔습니다.
토요일 이른 아침 도쿄에서 신칸센을 타고 출발했습니다.
가을의 교토는 단풍이 매우 아름다웠고, 기요미즈데라에는 수많은 관광객이 있었습니다.
점심에는 맛있는 유도후(온두부)를 먹었습니다.
일요일에는 아라시야마의 대나무 숲길을 산책했습니다.
날씨가 맑아서 멋진 사진을 많이 찍을 수 있었습니다.
내년에도 꼭 다시 교토에 가고 싶습니다.`,
    es: `El fin de semana pasado fui de viaje a Kioto con amigos.
Salimos temprano el sábado por la mañana desde Tokio en Shinkansen.
El otoño en Kioto tenía un follaje otoñal hermoso y Kiyomizu-dera estaba lleno de turistas.
Al mediodía comimos delicioso Yudofu (tofu hervido).
El domingo paseamos por el bosque de bambú de Arashiyama.
Como el clima estuvo excelente, pudimos tomar muchísimas fotos.
Sin duda quiero volver a visitar Kioto el próximo año.`,
    fr: `Le week-end dernier, je suis parti en voyage à Kyoto avec des amis.
Nous sommes partis de Tokyo tôt le samedi matin en Shinkansen.
Kyoto en automne offrait de magnifiques couleurs d'automne et le temple Kiyomizu-dera était bondé de touristes.
À midi, nous avons dégusté un délicieux Yudofu (tofu bouilli).
Le dimanche, nous nous sommes promenés dans la bambouseraie d'Arashiyama.
Comme il faisait très beau, nous avons pu prendre de superbes photos.
J'aimerais absolument retourner à Kyoto l'année prochaine.`,
    vi: `Cuối tuần trước, tôi đã đi du lịch Kyoto cùng với những người bạn.
Chúng tôi khởi hành từ Tokyo bằng tàu Shinkansen từ sáng sớm thứ Bảy.
Kyoto vào mùa thu có lá đỏ tuyệt đẹp và chùa Kiyomizu-dera đông nghịt khách du lịch.
Buổi trưa chúng tôi đã thưởng thức món đậu phụ luộc Yudofu thơm ngon.
Chủ nhật, chúng tôi đi dạo qua con đường rừng trúc ở Arashiyama.
Vì thời tiết rất đẹp nên chúng tôi đã chụp được rất nhiều bức ảnh tuyệt vời.
Năm sau tôi nhất định muốn quay lại Kyoto một lần nữa.`,
    id: `Akhir pekan lalu, saya melakukan perjalanan ke Kyoto bersama teman-teman.
Kami berangkat dari Tokyo dengan Shinkansen pada Sabtu pagi-pagi sekali.
Kyoto di musim gugur memiliki dedaunan musim gugur yang indah, dan kuil Kiyomizu-dera dipenuhi banyak wisatawan.
Siang harinya kami menikmati Yudofu (tahu rebus) yang lezat.
Pada hari Minggu, kami berjalan-jalan di hutan bambu Arashiyama.
Karena cuaca sangat cerah, kami dapat mengambil banyak foto yang bagus.
Tahun depan saya pasti ingin berkunjung ke Kyoto lagi.`,
  },

  // N3: 日本のコンビニ文化 (The Culture of Convenience Stores in Japan)
  'r-n3-01': {
    en: `Japanese convenience stores (Konbini) are far more than mere retail shops; they have become an indispensable social infrastructure in modern daily life.
Operating 24 hours a day, 365 days a year, they offer not only food and daily essentials, but also ATM banking, utility bill payments, parcel delivery, and public document printing.
In recent years, responding to environmental issues and labor shortages, advancements in self-checkout terminals and energy-saving measures have accelerated.
Furthermore, during major natural disasters, they play an essential role as disaster-relief centers supplying food and drinking water.
Their ability to evolve continuously alongside societal transformations is the core secret behind Japanese convenience stores' enduring trust.`,
    ja: `日本のコンビニエンスストア（コンビニ）は、単なる小売店の枠を超え、現代生活において不可欠な社会インフラとなっています。
年中無休・24時間営業で、食品や日用品の提供だけでなく、ATMの利用、公共料金の支払い、宅配便の発送・受取、行政証明書の発行まで行えます。
近年では、環境問題や人手不足に対応するため、セルフレジの導入や省エネ設備の普及が進んでいます。
さらに、大規模災害時には救援物資や飲料水を提供する防災拠点としての役割も担っています。
時代の変化に柔軟に対応しながら進化し続ける点こそが、日本のコンビニが広く信頼される理由です。`,
    my: `ဂျပန်နိုင်ငံရှိ ကွန်ဗီးနီးယန့်စတိုးများ (Konbini) သည် သာမန်အရောင်းဆိုင်များထက် ကျော်လွန်၍ ခေတ်သစ်လူနေမှုဘဝတွင် မရှိမဖြစ်လိုအပ်သော လူမှုအခြေခံအဆောက်အအုံ ဖြစ်လာခဲ့သည်။
တစ်နှစ်ပတ်လုံး ၂၄ နာရီပတ်လုံး ဖွင့်လှစ်ပြီး အစားအစာနှင့် လူသုံးကုန်ပစ္စည်းများသာမက ATM ငွေထုတ်ခြင်း၊ အများသုံးအခွန်ဘေလ်များ ပေးဆောင်ခြင်း၊ ပါဆယ်ပို့ခြင်းနှင့် အစိုးရတရားဝင်စာရွက်စာတမ်းများ ထုတ်ယူခြင်းတို့ကို ဆောင်ရွက်နိုင်သည်။
မကြာသေးမီနှစ်များအတွင်း သဘာဝပတ်ဝန်းကျင်ဆိုင်ရာပြဿနာများနှင့် လုပ်သားရှားပါးမှုကို ဖြေရှင်းရန်အတွက် Self-checkout စက်များနှင့် စွမ်းအင်ချွေတာရေးနည်းပညာများ အရှိန်အဟုန်ဖြင့် တိုးတက်လာခဲ့သည်။
ထို့အပြင် သဘာဝဘေးအန္တရာယ်ကြီးများ ကျရောက်ချိန်တွင် ကယ်ဆယ်ရေးရိက္ခာနှင့် သောက်သုံးရေ ထောက်ပံ့ပေးသည့် ကယ်ဆယ်ရေးစခန်းအဖြစ် အရေးပါသော အခန်းကဏ္ဍမှ ပါဝင်သည်။
ခေတ်ကာလပြောင်းလဲမှုများနှင့်အညီ အမြဲမပြတ် ဆန်းသစ်တီထွင်တိုးတက်နိုင်စွမ်းရှိခြင်းသည် ဂျပန်ကွန်ဗီးနီးယန့်စတိုးများ ယုံကြည်စိတ်ချရမှုရရှိသည့် လျှို့ဝှက်ချက်ဖြစ်ပါသည်။`,
    th: `ร้านสะดวกซื้อของญี่ปุ่น (คอนบินิ) เป็นมากกว่าร้านค้าปลีกธรรมดา แต่ได้กลายเป็นโครงสร้างพื้นฐานทางสังคมที่ขาดไม่ได้ในชีวิตประจำวันยุคใหม่
ด้วยการเปิดทำการตลอด 24 ชั่วโมง 365 วันต่อปี ไม่เพียงแต่จำหน่ายอาหารและของใช้จำเป็น แต่ยังให้บริการตู้ ATM ชำระบิลค่าสาธารณูปโภค ส่งพัสดุ และพิมพ์เอกสารราชการ
ในช่วงไม่กี่ปีที่ผ่านมา เพื่อรับมือกับปัญหาสิ่งแวดล้อมและการขาดแคลนแรงงาน จึงมีการนำเครื่องคิดเงินอัตโนมัติและมาตรการประหยัดพลังงานมาใช้อย่างรวดเร็ว
นอกจากนี้ ยามเกิดภัยพิบัติทางธรรมชาติครั้งใหญ่ ร้านสะดวกซื้อยังมีบทบาทสำคัญในฐานะศูนย์บรรเทาสาธารณภัยที่จัดหาอาหารและน้ำดื่ม
ความสามารถในการปรับตัวและพัฒนาอย่างต่อเนื่องควบคู่ไปกับการเปลี่ยนแปลงของสังคมคือหัวใจสำคัญที่ทำให้ร้านสะดวกซื้อญี่ปุ่นได้รับความไว้วางใจอย่างสูง`,
    zh: `日本的便利店（Konbini）早已超越了普通零售店的范畴，成为现代日常生活中不可或缺的社会基础设施。
全年无休、24小时全天候营业，不仅提供便当食品与日常用品，还能办理ATM金融业务、代缴公共事业费、快递代收代发以及打印政府行政证明。
近年来，为应对环保与劳动力短缺挑战，自助结账终端普及与节能设施改造全面加速。
不仅如此，在发生重大自然灾害时，便利店还作为防灾救援据点，向居民提供应急食品与饮用水。
能够紧密贴合时代变迁不断进化，正是日本便利店深受大众信赖的根本原因。`,
    ko: `일본의 편의점(콘비니)은 단순한 소매점의 범주를 넘어 현대 일상생활에 필수적인 사회 인프라로 자리 잡았습니다.
연중무휴 24시간 영업으로 식품 및 일용품 판매뿐 아니라 ATM 이용, 공과금 납부, 택배 발송 및 행정 서류 출력까지 제공합니다.
최근에는 환경 문제와 인력 부족에 대응하여 셀프 계산대 도입과 에너지 절약 설비 보급이 빠르게 진행되고 있습니다.
나아가 대규모 재해 발생 시에는 구호 물자와 식수를 공급하는 방재 거점으로서의 역할도 톡톡히 수행합니다.
시대의 변화에 발맞추어 끊임없이 진화하는 유연성이야말로 일본 편의점이 굳건한 신뢰를 얻는 비결입니다.`,
    es: `Las tiendas de conveniencia japonesas (Konbini) son mucho más que simples tiendas minoristas; se han convertido en una infraestructura social indispensable en la vida cotidiana moderna.
Abiertas las 24 horas del día, los 365 días del año, ofrecen no solo alimentos y artículos de primera necesidad, sino también cajeros automáticos, pago de facturas de servicios, entrega de paquetes e impresión de certificados oficiales.
En los últimos años, frente a los problemas ambientales y la escasez de mano de obra, se ha acelerado la adopción de cajas de autoservicio y tecnologías de ahorro energético.
Además, durante desastres naturales mayores, cumplen una función vital como centros de apoyo comunitario suministrando agua potable y alimentos de emergencia.
Su capacidad para evolucionar constantemente junto con los cambios sociales es el secreto detrás de la confianza perdurable en los Konbini japoneses.`,
    fr: `Les supérettes japonaises (Konbini) dépassent largement le simple cadre de commerce de détail ; elles sont devenues une infrastructure sociale indispensable au quotidien.
Ouvertes 24h/24 et 365 jours par an, elles proposent des repas et des produits de première nécessité, mais aussi des distributeurs de billets, le paiement des factures, l'envoi de colis et l'impression de documents administratifs.
Ces dernières années, pour faire face aux défis écologiques et au manque de main-d'œuvre, les caisses automatiques et les équipements économes en énergie se sont rapidement développés.
De plus, lors de catastrophes naturelles majeures, elles servent de centres de secours d'urgence fournissant eau et vivres.
Cette capacité d'évolution constante en harmonie avec la société explique la confiance durable accordée aux Konbini japonais.`,
    vi: `Các cửa hàng tiện lợi Nhật Bản (Konbini) vượt xa khỏi phạm vi một cửa hàng bán lẻ thông thường; chúng đã trở thành cơ sở hạ tầng xã hội không thể thiếu trong cuộc sống hiện đại.
Mở cửa 24/7 suốt 365 ngày một năm, không chỉ cung cấp thực phẩm và đồ dùng thiết yếu, nơi đây còn hỗ trợ rút tiền ATM, thanh toán hóa đơn công cộng, gửi chuyển phát bưu kiện và in ấn giấy tờ hành chính.
Những năm gần đây, nhằm ứng phó với vấn đề môi trường và thiếu hụt nhân lực, việc áp dụng máy thanh toán tự động và các giải pháp tiết kiệm năng lượng đang được đẩy mạnh.
Hơn nữa, khi xảy ra thiên tai quy mô lớn, cửa hàng tiện lợi còn đóng vai trò là cứ điểm phòng chống thiên tai, cung cấp đồ cứu trợ và nước uống.
Khả năng không ngừng đổi mới linh hoạt theo sự biến đổi của thời đại chính là lý do các Konbini Nhật Bản nhận được sự tin cậy vững chắc.`,
    id: `Minimarket Jepang (Konbini) jauh melampaui toko ritel biasa; toko-toko ini telah menjadi infrastruktur sosial yang tak tergantikan dalam kehidupan modern.
Buka 24 jam sehari, 365 hari setahun, konbini tidak hanya menyediakan makanan dan kebutuhan sehari-hari, tetapi juga transaksi ATM, pembayaran tagihan bulanan, pengiriman paket, dan pencetakan dokumen resmi.
Dalam beberapa tahun terakhir, untuk menjawab tantangan lingkungan dan kekurangan tenaga kerja, adopsi mesin kasir mandiri dan teknologi hemat energi berkembang pesat.
Selain itu, ketika terjadi bencana alam besar, konbini berfungsi sebagai pos bantuan bencana yang mendistribusikan makanan darurat dan air bersih.
Kemampuan untuk terus berkembang selaras dengan transformasi zaman adalah kunci di balik tingginya kepercayaan masyarakat terhadap konbini Jepang.`,
  },

  // N3: テレワークと現代の働き方 (Telework and Modern Workstyle)
  'r-n3-02': {
    en: `In recent years, the spread of telework has brought massive changes to the working styles of Japanese companies.
With the introduction of online meeting tools and cloud services, it has become possible to handle business without coming to the office.
Consequently, benefits such as reduced commuting strain and improved work-life balance have been highlighted.
On the other hand, new challenges have emerged, such as the difficulty of informal communication among team members and evaluation standards for remote performance.
To build a sustainable workstyle, finding a well-balanced hybrid system between remote work and office attendance is becoming crucial.`,
    ja: `近年、テレワークの普及により、日本企業の働き方に大きな変化が生じています。
オンライン会議ツールやクラウドサービスの導入によって、出社しなくても業務を進めることが可能になりました。
その結果、通勤の負担軽減やワークライフバランスの改善といった利点が注目されています。
その一方で、社員同士の気軽なコミュニケーション不足や、遠隔での勤務評価の難しさといった新たな課題も浮かび上がっています。
持続可能な働き方を築くためには、在宅勤務とオフィス出社のバランスを見極めたハイブリッドな仕組みが求められています。`,
    my: `မကြာသေးမီနှစ်များအတွင်း အိမ်မှအဝေးရောက်အလုပ်လုပ်ခြင်း (Telework) ကျယ်ပြန့်လာခြင်းသည် ဂျပန်ကုမ္ပဏီများ၏ လုပ်ငန်းခွင်ပုံစံကို ကြီးမားစွာ ပြောင်းလဲစေခဲ့သည်။
အွန်လိုင်းအစည်းအဝေးသုံးကိရိယာများနှင့် Cloud စနစ်များကို အသုံးပြုလာနိုင်ခြင်းကြောင့် ရုံးသို့လူကိုယ်တိုင် သွားရောက်စရာမလိုဘဲ အလုပ်ကိစ္စများကို ပြီးမြောက်အောင် လုပ်ဆောင်နိုင်လာခဲ့သည်။
ယင်းကြောင့် နေ့စဉ်ရုံးသွားရုံးပြန် ဒုက္ခများ သက်သာလာခြင်းနှင့် အလုပ်နှင့်မိသားစုဘဝ မျှတကောင်းမွန်လာခြင်းစသည့် အကျိုးကျေးဇူးများကို မြင်တွေ့ရသည်။
အခြားတစ်ဖက်တွင်မူ လုပ်ဖော်ကိုင်ဖက်များအကြား ပေါ့ပေါ့ပါးပါး စကားပြောဆက်သွယ်မှု လျော့နည်းလာခြင်းနှင့် အဝေးရောက်လုပ်ငန်းစွမ်းဆောင်ရည် အကဲဖြတ်မှု ခက်ခဲခြင်းစသည့် စိန်ခေါ်မှုအသစ်များလည်း ပေါ်ပေါက်လာသည်။
ရေရှည်တည်တံ့သော လုပ်ငန်းခွင်စနစ်ကို တည်ဆောက်နိုင်ရန်အတွက် အိမ်မှလုပ်ကိုင်ခြင်းနှင့် ရုံးတက်လုပ်ကိုင်ခြင်းတို့ကို ဟန်ချက်ညီညီ ပေါင်းစပ်ထားသည့် Hybrid စနစ်ကို ပိုမိုလိုအပ်လာနေပါသည်။`,
    th: `ในช่วงไม่กี่ปีที่ผ่านมา การแพร่หลายของการทำงานทางไกล (Telework) ได้สร้างความเปลี่ยนแปลงอย่างใหญ่หลวงต่อรูปแบบการทำงานในบริษัทญี่ปุ่น
การนำเครื่องมือประชุมออนไลน์และบริการคลาวด์มาใช้ ทำให้สามารถปฏิบัติงานได้โดยไม่จำเป็นต้องเดินทางเข้าออฟฟิศ
ส่งผลให้เกิดข้อดีเด่นชัด เช่น การลดภาระในการเดินทาง และการยกระดับสมดุลชีวิตกับการทำงาน (Work-Life Balance)
ในทางกลับกัน ความท้าทายใหม่ๆ ก็ปรากฏขึ้น เช่น ความยากในการสื่อสารอย่างไม่เป็นทางการระหว่างเพื่อนร่วมงาน และเกณฑ์การประเมินผลงานระยะไกล
การจะสร้างรูปแบบการทำงานที่ยั่งยืน การหาระบบลูกผสม (Hybrid) ที่สมดุลระหว่างการทำงานที่บ้านกับการเข้าสำนักงานจึงกลายเป็นสิ่งสำคัญอย่างยิ่ง`,
    zh: `近年来，远程办公（Telework）的普及给日本企业的工作模式带来了巨大变革。
通过引入在线视频会议系统和云计算协作平台，员工无需每天通勤到公司即可顺利推进业务。
由此带来的减轻通勤负担、改善工作与生活平衡等优势备受瞩目。
然而，这也引发了团队成员间轻松日常交流匮乏、远程绩效考评标准确立困难等一系列新挑战。
为了构建可持续的健康办公模式，如何在居家办公与到岗办公之间寻求最佳平衡的混合工作制（Hybrid）显得愈发关键。`,
    ko: `최근 텔레워크의 보급으로 일본 기업의 근무 형태에 큰 변화가 나타나고 있습니다.
화상 회의 툴과 클라우드 서비스 도입으로 출근하지 않고도 원활하게 업무를 수행할 수 있게 되었습니다.
그 결과 출퇴근 피로 감소와 워라밸(Work-Life Balance) 개선이라는 긍정적인 이점이 주목받고 있습니다.
반면 팀원 간 캐주얼한 소통 부족, 원격 근무에 대한 공정한 성과 평가의 어려움 등 새로운 과제도 대두되었습니다.
지속 가능한 근무 환경을 구축하기 위해 재택근무와 오피스 출근의 균형을 맞춘 하이브리드 근무 방식이 중요해지고 있습니다.`,
    es: `En los últimos años, la expansión del teletrabajo ha transformado enormemente la cultura laboral de las empresas japonesas.
Gracias a las herramientas de videoconferencia y los servicios en la nube, ahora es posible realizar tareas empresariales sin necesidad de desplazarse a la oficina.
Como resultado, destacan ventajas como la reducción del estrés del transporte diario y la mejora del equilibrio entre trabajo y vida personal.
Por otra parte, han surgido nuevos desafíos, como la falta de comunicación informal entre compañeros y la dificultad de evaluar el rendimiento a distancia.
Para construir un modelo de trabajo sostenible, resulta esencial encontrar un equilibrio adecuado mediante esquemas híbridos entre el hogar y la oficina.`,
    fr: `Ces dernières années, la démocratisation du télétravail a profondément transformé l'organisation du travail au sein des entreprises japonaises.
Grâce aux outils de visioconférence et aux plateformes cloud, il est désormais possible de mener à bien ses missions sans se rendre physiquement au bureau.
En conséquence, des avantages tels que l'allègement de la fatigue liée aux transports et un meilleur équilibre de vie sont soulignés.
Cependant, de nouveaux défis sont apparus, notamment le manque d'échanges informels entre collègues et la difficulté d'évaluation des performances à distance.
Pour pérenniser ces méthodes de travail, la recherche d'un équilibre harmonieux au travers d'un système hybride devient primordiale.`,
    vi: `Những năm gần đây, sự phổ biến của làm việc từ xa (Telework) đã mang lại những thay đổi sâu rộng trong phương thức làm việc của các doanh nghiệp Nhật Bản.
Nhờ việc áp dụng các công cụ họp trực tuyến và nền tảng điện toán đám mây, nhân viên có thể giải quyết công việc mà không cần đến công ty.
Nhờ đó, những lợi ích như giảm bớt gánh nặng di chuyển và cải thiện cân bằng giữa công việc và cuộc sống đã được ghi nhận rõ rệt.
Tuy nhiên, cũng xuất hiện những thách thức mới như việc thiếu hụt giao tiếp thân mật giữa đồng nghiệp và khó khăn trong đánh giá hiệu suất từ xa.
Để xây dựng môi trường làm việc bền vững, việc thiết lập mô hình kết hợp (Hybrid) cân đối giữa làm việc tại nhà và lên văn phòng đang trở nên vô cùng quan trọng.`,
    id: `Dalam beberapa tahun terakhir, meluasnya sistem telework telah membawa perubahan besar pada gaya kerja di perusahaan Jepang.
Dengan penerapan alat rapat daring dan layanan cloud, pekerjaan kini dapat diselesaikan tanpa harus datang ke kantor.
Akibatnya, manfaat seperti berkurangnya kelelahan perjalanan kerja dan meningkatnya keseimbangan hidup-kerja menjadi sorotan utama.
Di sisi lain, muncul tantangan baru seperti berkurangnya komunikasi kasual antar rekan kerja dan sulitnya penilaian kinerja jarak jauh.
Untuk menciptakan gaya kerja yang berkelanjutan, penerapan sistem kerja hybrid yang seimbang antara bekerja dari rumah dan kantor menjadi sangat esensial.`,
  },

  // N2: 日本社会における環境技術 (Environmental Technology in Japanese Society)
  'r-n2-01': {
    en: `Japanese environmental technology has achieved remarkable advances, catalyzed by past experiences overcoming pollution and energy crises.
Particularly in fields such as energy-saving industrial machinery, solar power generation, and automotive hybrid drivetrains, Japanese corporations have demonstrated leadership in the global market.
Furthermore, as initiatives toward a circular economy and carbon neutrality gather momentum, breakthrough developments in plastic recycling and hydrogen energy utilization are accelerating.
Looking ahead, balancing technological innovation with economic viability to resolve global environmental challenges remains a pivotal agenda.`,
    ja: `公害克服やオイルショックの経験を契機として、日本の環境技術は目覚ましい進化を遂げてきました。
特に省エネ型産業機器や太陽光発電、自動車のハイブリッド駆動技術などの分野において、日本企業は世界市場を牽引してきました。
さらに、循環型社会の構築やカーボンニュートラルに向けた取り組みが加速する中、プラスチックのリサイクルや水素エネルギーの利活用といった先端技術の開発が進んでいます。
今後は、技術革新と経済的合理性を両立させながら、地球規模の環境課題にいかに貢献していくかが重要な命題となっています。`,
    my: `အတိတ်ကာလ ညစ်ညမ်းမှုဘေးများကို ကျော်လွှားခဲ့ရသည့် အတွေ့အကြုံများနှင့် စွမ်းအင်အကျပ်အတည်းများကြောင့် ဂျပန်နိုင်ငံ၏ သဘာဝပတ်ဝန်းကျင်ဆိုင်ရာ နည်းပညာများသည် အံ့မခန်း တိုးတက်လာခဲ့သည်။
အထူးသဖြင့် စွမ်းအင်ချွေတာသော စက်မှုစက်ယန္တရားများ၊ နေရောင်ခြည်စွမ်းအင်သုံး လျှပ်စစ်ထုတ်လုပ်ခြင်းနှင့် မော်တော်ကား Hybrid စနစ်များတွင် ဂျပန်ကုမ္ပဏီများသည် ကမ္ဘာ့ဈေးကွက်ကို ဦးဆောင်နိုင်ခဲ့သည်။
ထို့အပြင် သယံဇာတ ပြန်လည်အသုံးချသော စက်ဝိုင်းစီးပွားရေး (Circular Economy) နှင့် ကာဗွန်ကင်းစင်ရေး (Carbon Neutral) လှုပ်ရှားမှုများ အရှိန်ရလာသည်နှင့်အမျှ ပလတ်စတစ်ပြန်လည်အသုံးချမှုနှင့် ဟိုက်ဒရိုဂျင်စွမ်းအင် အသုံးချမှုနည်းပညာများ လျင်မြန်စွာ ထွက်ပေါ်လာနေသည်။
အနာဂတ်တွင် နည်းပညာဆန်းသစ်တီထွင်မှုနှင့် စီးပွားရေးအရ တွက်ခြေကိုက်မှုကို ဟန်ချက်ညီစေကာ တစ်ကမ္ဘာလုံးဆိုင်ရာ သဘာဝပတ်ဝန်းကျင် စိန်ခေါ်မှုများကို ဖြေရှင်းနိုင်ရေးသည် အဓိက အရေးပါသော ရည်မှန်းချက် ဖြစ်ပါသည်။`,
    th: `เทคโนโลยีสิ่งแวดล้อมของญี่ปุ่นได้ก้าวหน้าอย่างโดดเด่น โดยได้รับแรงผลักดันจากประสบการณ์ในการเอาชนะปัญหามลพิษและวิกฤตพลังงานในอดีต
โดยเฉพาะในด้านเครื่องจักรอุตสาหกรรมประหยัดพลังงาน พลังงานแสงอาทิตย์ และเทคโนโลยีไฮบริดในยานยนต์ บริษัทญี่ปุ่นได้แสดงบทบาทผู้นำในตลาดโลก
นอกจากนี้ ขณะที่ความพยายามสู่ระบบเศรษฐกิจหมุนเวียนและความเป็นกลางทางคาร์บอนกำลังเร่งตัวขึ้น การรีไซเคิลพลาสติกและการใช้พลังงานไฮโดรเจนก็มีความก้าวหน้าอย่างรวดเร็ว
ในอนาคต การสร้างความสมดุลระหว่างนวัตกรรมทางเทคโนโลยีกับความเป็นไปได้ทางเศรษฐกิจเพื่อแก้ไขปัญหาสิ่งแวดล้อมระดับโลกยังคงเป็นภารกิจที่สำคัญอย่างยิ่ง`,
    zh: `汲取了战后克服环境公害与石油危机的宝贵经验，日本的环境技术取得了举世瞩目的长足进步。
特别是在高能效工业装备、太阳能发电应用以及汽车油电混合动力技术等领域，日本企业长期处于全球领跑地位。
随着构建循环型社会与实现碳中和目标的呼声日益高涨，废弃塑料物理化学再生与氢能全产业链应用等前沿技术的突破日新月异。
今后，如何在兼顾技术创新与商业可行性的同时，为解决全球性气候与环境挑战提供切实方案，是一项至关重要的核心课题。`,
    ko: `과거 공해 극복과 오일쇼크의 경험을 발판 삼아 일본의 친환경 기술은 눈부신 발전을 이룩해 왔습니다.
특히 에너지 절약형 산업 기계, 태양광 발전 시스템, 자동차의 하이브리드 구동 기술 분야에서 일본 기업들은 글로벌 시장을 선도해 왔습니다.
나아가 순환 경제 구축과 탄소 중립을 향한 노력이 가속화됨에 따라 플라스틱 재활용과 수소 에너지 활용 등 최첨단 기술 개발이 활발히 진행되고 있습니다.
향후에는 기술 혁신과 경제적 타당성을 동시에 확보하면서 지구촌 환경 과제 해결에 어떻게 기여할 것인가가 중대한 과제로 떠오르고 있습니다.`,
    es: `La tecnología ambiental japonesa ha experimentado un avance extraordinario, impulsada por las experiencias de superación de la contaminación y las crisis energéticas pasadas.
Especialmente en maquinaria industrial de bajo consumo, energía solar y sistemas de propulsión híbrida para automóviles, las empresas japonesas han liderado el mercado mundial.
Además, con el impulso hacia la economía circular y la neutralidad de carbono, se acelera el desarrollo de tecnologías avanzadas en reciclaje de plásticos y uso del hidrógeno.
Hacia el futuro, lograr el equilibrio entre la innovación tecnológica y la viabilidad económica para resolver los desafíos ambientales del planeta constituye un objetivo prioritario.`,
    fr: `Portée par l'expérience du dépassement des crises de pollution et des chocs pétroliers, la technologie environnementale japonaise a accompli des progrès remarquables.
C'est notamment dans les équipements industriels économes en énergie, l'énergie solaire et les motorisations hybrides automobiles que les entreprises japonaises se sont imposées sur le marché mondial.
Par ailleurs, avec l'accélération de l'économie circulaire et de la neutralité carbone, le recyclage des plastiques et l'hydrogène connaissent des développements prometteurs.
Désormais, concilier rupture technologique et rentabilité économique pour répondre aux défis environnementaux planétaires demeure un enjeu fondamental.`,
    vi: `Bắt nguồn từ kinh nghiệm vượt qua ô nhiễm và các cuộc khủng hoảng năng lượng trong quá khứ, công nghệ môi trường của Nhật Bản đã có những bước tiến vượt bậc.
Đặc biệt trong các lĩnh vực máy móc công nghiệp tiết kiệm năng lượng, điện mặt trời và động cơ hybrid trên ô tô, các doanh nghiệp Nhật Bản đã dẫn đầu thị trường toàn cầu.
Hơn nữa, khi các sáng kiến hướng tới kinh tế tuần hoàn và trung hòa carbon ngày càng mạnh mẽ, sự phát triển trong tái chế nhựa và năng lượng hydro đang diễn ra nhanh chóng.
Trong tương lai, việc cân bằng giữa đổi mới công nghệ và tính khả thi về kinh tế để đóng góp giải quyết các vấn đề môi trường toàn cầu vẫn là bài toán trọng yếu.`,
    id: `Teknologi lingkungan Jepang telah mencapai kemajuan yang luar biasa berkat pengalaman masa lalu dalam mengatasi polusi dan krisis energi.
Khususnya di bidang mesin industri hemat energi, tenaga surya, dan teknologi hibrida otomotif, perusahaan-perusahaan Jepang telah memimpin pasar global.
Selain itu, seiring dengan percepatan inisiatif ekonomi sirkular dan netralitas karbon, terobosan dalam daur ulang plastik dan pemanfaatan energi hidrogen terus meningkat.
Ke depan, menyeimbangkan inovasi teknologi dengan kelayakan ekonomi demi menjawab tantangan lingkungan global tetap menjadi agenda yang sangat penting.`,
  },

  // N1: 終身雇用の変化とキャリアの未来 (The Shift in Lifetime Employment and Future Career)
  'r-n1-01': {
    en: `The traditional Japanese employment model, represented by lifetime employment and seniority-based promotion, has reached a profound turning point amid rapid digitalization and accelerating globalization.
In an era where retaining workers within a single company throughout their lives is no longer realistic, the value of individuals taking proactive ownership of their career autonomy has surged.
Rather than company-dependent career paths, individuals are now challenged to articulate their own skill sets, constantly engage in reskilling, and proactively create value across diverse workplace environments.`,
    ja: `終身雇用や年功序列に代表される従来の日本型雇用モデルは、デジタル化やグローバル化の急速な進展に伴い、大きな転換点を迎えています。
一企業が社員の生涯を保障することが困難となった現代においては、個々人が自律的にキャリアを切り拓く主体性が強く求められるようになりました。
企業依存から脱却し、自らの市場価値を客観的に見つめ直し、絶えざるリスキリングを通じて新たな価値を創出し続ける姿勢こそが、これからの時代を生き抜く鍵となります。`,
    my: `တစ်သက်တာအလုပ်အကိုင် အာမခံချက်နှင့် အကြီးအကဲဖြစ်မှုအလိုက် ရာထူးတိုးပေးသည့် သမားရိုးကျ ဂျပန်လုပ်ငန်းခွင်စနစ်သည် ဒစ်ဂျစ်တယ်နည်းပညာ တိုးတက်လာခြင်းနှင့် ကမ္ဘာလုံးဆိုင်ရာ အပြောင်းအလဲများကြောင့် အရေးကြီးသော အလှည့်အပြောင်းတစ်ခုသို့ ရောက်ရှိလာခဲ့သည်။
ကုမ္ပဏီတစ်ခုတည်းက ဝန်ထမ်းတစ်ဦး၏ ဘဝတစ်ခုလုံးကို တာဝန်ယူပေးရန် မဖြစ်နိုင်တော့သည့် ယနေ့ခေတ်တွင် တစ်ဦးချင်းစီက မိမိတို့၏ အသက်မွေးဝမ်းကျောင်းလမ်းကြောင်းကို ကိုယ်တိုင်ကြိုးပမ်းတည်ဆောက်ရမည့် ကိုယ်ပိုင်ဆုံးဖြတ်ခွင့်မှာ အလွန်တန်ဖိုးမြင့်တက်လာခဲ့သည်။
ကုမ္ပဏီအပေါ် မှီခိုနေမည့်အစား မိမိ၏ ကျွမ်းကျင်မှုများကို အမြဲမပြတ် အဆင့်မြှင့်တင်ခြင်း (Reskilling) နှင့် မတူကွဲပြားသော ပတ်ဝန်းကျင်များတွင် တန်ဖိုးဖန်တီးနိုင်စွမ်း ရှိစေခြင်းသည် အနာဂတ်အတွက် အဓိကသော့ချက် ဖြစ်ပါသည်။`,
    th: `รูปแบบการจ้างงานแบบดั้งเดิมของญี่ปุ่น เช่น การจ้างงานตลอดชีพและการเลื่อนตำแหน่งตามอาวุโส ได้เดินทางมาถึงจุดเปลี่ยนครั้งสำคัญท่ามกลางการเปลี่ยนผ่านสู่ดิจิทัลและโลกาภิวัตน์
ในยุคที่บริษัทเดี่ยวไม่สามารถรับประกันความมั่นคงตลอดชีวิตให้แก่พนักงานได้อีกต่อไป ความสำคัญของการเป็นเจ้าของเส้นทางอาชีพด้วยตนเองจึงพุ่งสูงขึ้นอย่างที่ไม่เคยมีมาก่อน
แทนที่จะพึ่งพาองค์กรแต่เพียงฝ่ายเดียว บุคคลจำเป็นต้องประเมินมูลค่าตนเองในตลาดงาน หมั่นยกระดับทักษะ (Reskilling) อย่างต่อเนื่อง และสร้างคุณค่าใหม่ๆ ในสภาพแวดล้อมที่หลากหลาย`,
    zh: `以终身雇佣和年功序列制为代表的传统日本型雇佣体系，在数字化浪潮与全球化竞争的双重推动下，正经历着深刻的结构性转折。
在单一企业难以全权保障员工终身生计的当下，个人主动构建自主职业发展蓝图的能力变得空前关键。
摆脱对企业的绝对依附，客观看待自身的市场竞争力，通过终身持续技能重塑（Reskilling）在多变环境中创造不可替代的职业价值，正是决胜未来的生存之道。`,
    ko: `종신 고용과 연공서열로 대표되던 전통적인 일본형 고용 모델은 급격한 디지털화와 글로벌 경쟁 심화 속에서 중대한 전환점을 맞이하고 있습니다.
단일 기업이 개인의 평생을 보장하기 어려워진 오늘날, 개개인이 주도적으로 커리어를 개척해 나가는 자율성의 가치가 그 어느 때보다 부각되고 있습니다.
기업에 대한 일방적 의존에서 벗어나 자신의 시장 가치를 객관화하고, 끊임없는 리스킬링(Reskilling)을 통해 새로운 가치를 창출하는 역량이야말로 미래 커리어의 핵심입니다.`,
    es: `El modelo tradicional de empleo japonés, caracterizado por el empleo de por vida y el ascenso por antigüedad, ha llegado a un punto de inflexión decisivo debido a la digitalización y la globalización.
En una época donde ya no es viable que una sola empresa garantice el sustento de por vida, el valor de que cada persona asuma activamente el liderazgo de su trayectoria profesional se ha multiplicado.
Lejos de depender exclusivamente de la empresa, el reto actual radica en redefinir el propio valor en el mercado laboral y reinventarse continuamente a través del reskilling.`,
    fr: `Le modèle traditionnel de l'emploi japonais, fondé sur l'emploi à vie et la promotion à l'ancienneté, connaît un tournant décisif sous l'effet conjugué de la transition numérique et de la mondialisation.
À une époque où une entreprise ne peut plus garantir la carrière complète d'un salarié, la capacité de chacun à prendre en main son autonomie professionnelle est devenue indispensable.
Plutôt que d'attendre passivement de l'entreprise, il est désormais crucial d'évaluer sa propre valeur marchande et de s'engager dans une montée en compétences continue (reskilling).`,
    vi: `Mô hình tuyển dụng truyền thống kiểu Nhật Bản, đặc trưng bởi chế độ làm việc trọn đời và thăng tiến theo thâm niên, đang bước vào giai đoạn chuyển biến sâu sắc trước làn sóng số hóa và toàn cầu hóa.
Trong thời đại mà một công ty không còn có thể đảm bảo trọn đời cho nhân viên, việc mỗi cá nhân chủ động xây dựng và làm chủ sự nghiệp của mình ngày càng trở nên cấp thiết.
Thay vì lệ thuộc hoàn toàn vào doanh nghiệp, thách thức hiện nay đòi hỏi mỗi người phải liên tục nâng cao kỹ năng (reskilling) để thích ứng và tạo ra giá trị mới trong mọi môi trường.`,
    id: `Model ketenagakerjaan tradisional Jepang yang dicirikan oleh sistem kerja seumur hidup dan senioritas kini berada pada titik balik besar di tengah pesatnya digitalisasi dan globalisasi.
Di era ketika satu perusahaan tidak lagi dapat menjamin masa depan karyawannya selamanya, pentingnya mengambil inisiatif mandiri dalam merancang karier pribadi meningkat tajam.
Alih-alih bergantung sepenuhnya pada perusahaan, setiap individu kini dituntut untuk terus mengasah keterampilan (reskilling) dan secara aktif menciptakan nilai di lingkungan kerja yang dinamis.`,
  },
};

// ----------------------------------------------------------------------------
// 2. Listening Dialogue Line Translations (6 Canonical JLPT Lessons N5 -> N1)
// ----------------------------------------------------------------------------
export const LISTENING_LESSONS_I18N: Record<
  string,
  {
    situationByLang: Partial<Record<SupportedLanguage, string>>;
    linesByLang: Partial<Record<SupportedLanguage, string[]>>;
  }
> = {
  // N5: 駅への道順 (Station Directions)
  'l-n5-01': {
    situationByLang: {
      en: 'A person asks a police officer for directions to the station.',
      ja: '交番で警察官に駅への行き方を尋ねています。',
      my: 'ရဲစခန်းတွင် ရဲအရာရှိထံ ဘူတာရုံသို့ သွားရာလမ်းကို မေးမြန်းနေပါသည်။',
      th: 'กำลังถามทางไปสถานีรถไฟกับเจ้าหน้าที่ตำรวจที่ป้อมตำรวจ',
      zh: '在交警岗亭向警察问路去车站。',
      ko: '파출소에서 경찰관에게 역으로 가는 길을 묻고 있습니다.',
      es: 'Una persona le pide indicaciones a un oficial de policía para llegar a la estación.',
      fr: 'Une personne demande son chemin vers la gare à un policier.',
      vi: 'Một người đang hỏi đường đến nhà ga tại bốt cảnh sát.',
      id: 'Seseorang menanyakan arah ke stasiun kepada polisi di pos polisi.',
    },
    linesByLang: {
      en: [
        'Excuse me, where is the station, please?',
        'Go straight along this street, and turn right at the corner with the convenience store.',
        'Is it far?',
        'No, it takes about 5 minutes on foot.',
        'I see. Thank you very much.',
      ],
      my: [
        'အားနာပေမယ့် ခင်ဗျာ၊ ဘူတာရုံက ဘယ်နားမှာပါလဲခင်ဗျာ။',
        'ဒီလမ်းအတိုင်း တည့်တည့်သွားပြီး ကွန်ဗီးနီးယန့်စတိုးရှိတဲ့ ထောင့်ကနေ ညာဘက်ကို ကွေ့လိုက်ပါ။',
        'အဝေးကြီး လမ်းလျှောက်ရပါသလား ခင်ဗျာ။',
        'မဟုတ်ပါဘူး၊ ခြေလျင်လျှောက်ရင် ၅ မိနစ်လောက်ပဲ ကြာပါတယ်။',
        'ဟုတ်ကဲ့ သဘောပေါက်ပါပြီ။ ကျေးဇူးအများကြီးတင်ပါတယ်ခင်ဗျာ။',
      ],
      th: [
        'ขอโทษนะครับ ไม่ทราบว่าสถานีรถไฟไปทางไหนครับ',
        'เดินตรงไปตามถนนสายนี้ แล้วเลี้ยวขวาตรงหัวมุมที่มีร้านสะดวกซื้อครับ',
        'ไกลไหมครับ',
        'ไม่ไกลครับ เดินไปประมาณ 5 นาทีก็ถึงครับ',
        'เข้าใจแล้วครับ ขอบพระคุณมากครับ',
      ],
      zh: [
        '不好意思，请问车站在哪里？',
        '沿着这条街一直往前走，在有便利店的拐角右转。',
        '路程很远吗？',
        '不远，步行大约5分钟就到了。',
        '明白了，非常感谢您。',
      ],
      ko: [
        '실례합니다만, 역은 어디에 있습니까?',
        '이 길을 곧장 가셔서 편의점이 있는 모퉁이에서 우회전하세요.',
        '멉니까?',
        '아니요, 걸어서 5분 정도 걸립니다.',
        '그렇군요. 대단히 감사합니다.',
      ],
      es: [
        'Disculpe, ¿dónde queda la estación, por favor?',
        'Siga recto por esta calle y gire a la derecha en la esquina donde está la tienda de conveniencia.',
        '¿Está lejos?',
        'No, se tarda unos 5 minutos a pie.',
        'Entiendo. Muchísimas gracias.',
      ],
      fr: [
        'Excusez-moi, où se trouve la gare, s\'il vous plaît ?',
        'Allez tout droit dans cette rue, puis tournez à droite au coin de la supérette.',
        'C\'est loin ?',
        'Non, il faut environ 5 minutes à pied.',
        'D\'accord. Merci beaucoup.',
      ],
      vi: [
        'Xin lỗi, làm ơn cho tôi hỏi nhà ga ở đâu ạ?',
        'Anh cứ đi thẳng con đường này, rồi rẽ phải ở góc có cửa hàng tiện lợi nhé.',
        'Có xa không ạ?',
        'Không, đi bộ chỉ mất khoảng 5 phút thôi.',
        'Tôi hiểu rồi. Cảm ơn anh rất nhiều.',
      ],
      id: [
        'Permisi, di manakah letak stasiun?',
        'Jalan lurus terus di jalan ini, lalu belok kanan di tikungan minimarket.',
        'Apakah jauh?',
        'Tidak, hanya sekitar 5 menit dengan berjalan kaki.',
        'Baiklah, saya paham. Terima kasih banyak.',
      ],
    },
  },

  // N4: 電車の車内アナウンス (Train Announcement)
  'l-n4-01': {
    situationByLang: {
      en: 'An announcement inside a train approaching an transfer station.',
      ja: '乗換駅に近づく電車の車内アナウンスを聞いています。',
      my: 'ရထားလိုင်းပြောင်းရမည့် ဘူတာသို့ ချဉ်းကပ်လာချိန် ရထားတွင်းကြေညာချက်ကို နားထောင်နေပါသည်။',
      th: 'ประกาศภายในขบวนรถไฟขณะกำลังเข้าเทียบชานชาลาสถานีเปลี่ยนขบวน',
      zh: '列车接近换乘车站时的车厢广播。',
      ko: '환승역에 접근하는 전철 내 방송을 듣고 있습니다.',
      es: 'Anuncio dentro de un tren que se aproxima a una estación de transferencia.',
      fr: 'Annonce à bord d\'un train à l\'approche d\'une station de correspondance.',
      vi: 'Thông báo trên tàu khi sắp đến ga chuyển tuyến.',
      id: 'Pengumuman di dalam kereta saat mendekati stasiun transit.',
    },
    linesByLang: {
      en: [
        'Soon we will arrive at Shinjuku, Shinjuku. The doors on the left side will open.',
        'Passengers transferring to the JR Yamanote Line and subway, please change trains at this station.',
        'Please be careful not to leave any belongings behind.',
      ],
      my: [
        'မကြာမီ ရှင်းဂျုခု ဘူတာသို့ ဆိုက်ရောက်ပါတော့မည်။ ဘယ်ဘက်တံခါးများ ပွင့်ပါမည်။',
        'ဂျေအာရ် ယာမာနိုသဲ ရထားလိုင်းနှင့် မြေအောက်ရထားလိုင်းများသို့ ပြောင်းစီးမည့် ခရီးသည်များ ဤဘူတာတွင် လဲလှယ်စီးနင်းနိုင်ပါသည်။',
        'ခရီးဆောင်ပစ္စည်းများ ကျန်မနေခဲ့စေရန် ကျေးဇူးပြု၍ ဂရုပြုပေးကြပါခင်ဗျာ။',
      ],
      th: [
        'อีกสักครู่จะถึงสถานีชินจูกุ ชินจูกุ ประตูด้านซ้ายจะเปิดออกครับ',
        'ผู้โดยสารที่จะเปลี่ยนขบวนไปยังสาย JR ยามาโนเตะและรถไฟใต้ดิน กรุณาเปลี่ยนขบวนที่สถานีนี้ครับ',
        'โปรดระมัดระวังอย่าวางสัมภาระลืมทิ้งไว้ครับ',
      ],
      zh: [
        '列车即将到达新宿站，新宿站。左侧车门将会开启。',
        '换乘JR山手线及地下铁路线的乘客，请在本站换乘。',
        '请注意随身物品，切勿遗落物品。',
      ],
      ko: [
        '곧 신주쿠, 신주쿠역에 도착합니다. 왼쪽 문이 열립니다.',
        'JR 야마노테선 및 지하철로 환승하실 승객께서는 이번 역에서 갈아타시기 바랍니다.',
        '두고 내리는 물건이 없도록 주의해 주시기 바랍니다.',
      ],
      es: [
        'Pronto llegaremos a Shinjuku, Shinjuku. Se abrirán las puertas del lado izquierdo.',
        'Los pasajeros que hagan transbordo a la línea JR Yamanote y al metro, por favor cambien de tren en esta estación.',
        'Por favor, asegúrense de no olvidar ninguna pertenencia a bordo.',
      ],
      fr: [
        'Nous arriverons bientôt à Shinjuku, Shinjuku. Les portes s\'ouvriront du côté gauche.',
        'Les voyageurs en correspondance pour la ligne JR Yamanote et le métro sont priés de changer de train ici.',
        'Veillez à ne rien oublier à bord de la rame.',
      ],
      vi: [
        'Đoàn tàu sắp cập ga Shinjuku, Shinjuku. Cửa bên trái sẽ mở.',
        'Hành khách chuyển sang tuyến JR Yamanote và tàu điện ngầm vui lòng đổi tàu tại ga này.',
        'Xin quý khách lưu ý không để quên hành lý trên tàu.',
      ],
      id: [
        'Sesaat lagi kita akan tiba di Shinjuku, Shinjuku. Pintu sebelah kiri akan terbuka.',
        'Bagi penumpang yang berpindah ke Jalur JR Yamanote dan kereta bawah tanah, silakan transit di stasiun ini.',
        'Mohon berhati-hati agar barang bawaan Anda tidak tertinggal.',
      ],
    },
  },

  // N3: オフィスでのアポイント調整 (Office Appointment Scheduling)
  'l-n3-01': {
    situationByLang: {
      en: 'Two business professionals arrange a meeting schedule over the telephone.',
      ja: '電話で面談の日程を調整しています。',
      my: 'တယ်လီဖုန်းဖြင့် တွေ့ဆုံဆွေးနွေးမည့် ရက်ချိန်းကို ညှိနှိုင်းစီစဉ်နေပါသည်။',
      th: 'กำลังประสานงานนัดหมายวันเวลาในการประชุมทางโทรศัพท์',
      zh: '在电话中协调商务面谈的日程安排。',
      ko: '전화로 비즈니스 미팅 일정을 조율하고 있습니다.',
      es: 'Dos profesionales coordinan por teléfono el horario de una reunión de negocios.',
      fr: 'Deux professionnels organisent par téléphone la date d\'une réunion d\'affaires.',
      vi: 'Hai đối tác đang trao đổi qua điện thoại để sắp xếp lịch hẹn làm việc.',
      id: 'Dua profesional menyelaraskan jadwal pertemuan bisnis melalui telepon.',
    },
    linesByLang: {
      en: [
        'Thank you for always doing business with us. Regarding next week\'s meeting, how does Tuesday the 15th at 2:00 PM suit you?',
        'Thank you for calling. Regrettably, I have another meeting until 3:00 PM that day. Would 3:30 PM be acceptable?',
        'Certainly, 3:30 PM works perfectly. We will visit your office then.',
        'Understood. We look forward to seeing you at 3:30 PM on Tuesday the 15th. Thank you.',
      ],
      my: [
        'အမြဲတမ်း အားပေးကူညီမှုအတွက် ကျေးဇူးတင်ရှိပါသည်။ လာမည့်အပတ် အစည်းအဝေးနှင့်ပတ်သက်၍ ၁၅ ရက် အင်္ဂါနေ့ မွန်းလွဲ ၂ နာရီ အဆင်ပြေပါသလား ခင်ဗျာ။',
        'ဆက်သွယ်ပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။ စိတ်မကောင်းစွာဖြင့် ထိုနေ့ ညနေ ၃ နာရီအထိ ကျွန်တော့်မှာ အခြားအစည်းအဝေးရှိနေလို့ပါ။ ညနေ ၃ နာရီခွဲဆိုရင် အဆင်ပြေနိုင်မလား ခင်ဗျာ။',
        'ဟုတ်ကဲ့ပါ၊ ညနေ ၃ နာရီခွဲ အဆင်ပြေပါသည်ခင်ဗျာ။ ထိုအချိန်တွင် လူကြီးမင်းတို့ရုံးသို့ လာရောက်တွေ့ဆုံပါမည်။',
        'နားလည်လက်ခံပါပြီ။ ၁၅ ရက် အင်္ဂါနေ့ ညနေ ၃ နာရီခွဲတွင် တွေ့ဆုံရန် စောင့်မျှော်နေပါမည်။ ကျေးဇူးတင်ပါသည်ခင်ဗျာ။',
      ],
      th: [
        'ขอบพระคุณที่อุดหนุนเสมอมาครับ เกี่ยวกับการประชุมสัปดาห์หน้า วันอังคารที่ 15 เวลา 14:00 น. พอจะสะดวกไหมครับ',
        'ขอบคุณที่ติดต่อมาครับ บังเอิญวันนั้นผมติดประชุมถึง 15:00 น. พอดี หากเป็นเวลา 15:30 น. จะสะดวกไหมครับ',
        'ได้แน่นอนครับ 15:30 น. เหมาะสมอย่างยิ่งครับ ทางเราจะเดินทางไปพบที่สำนักงานของท่านครับ',
        'รับทราบครับ ยินดีต้อนรับในวันอังคารที่ 15 เวลา 15:30 น. ครับ ขอบพระคุณครับ',
      ],
      zh: [
        '一直以来承蒙关照。关于下周的洽谈会议，请问15日星期二下午2点您方便吗？',
        '感谢您的联络。实在不好意思，当天我开会直到下午3点。如果是下午3点半可以吗？',
        '好的，3点半完全没问题。届时我们将拜访贵公司。',
        '好的，明白。那么期待15日星期二下午3点半与您会面。多谢。',
      ],
      ko: [
        '늘 신세 지고 있습니다. 다음 주 미팅 건입니다만, 15일 화요일 오후 2시는 어떠십니까?',
        '연락 감사드립니다. 공교롭게도 그날은 15시까지 다른 회의가 있어서요. 15시 반이라면 괜찮으실까요?',
        '네, 15시 반 좋습니다. 그 시간에 찾아뵙겠습니다.',
        '알겠습니다. 그럼 15일 화요일 15시 반에 뵙겠습니다. 감사합니다.',
      ],
      es: [
        'Muchas gracias por su preferencia. Respecto a la reunión de la próxima semana, ¿le vendría bien el martes 15 a las 14:00?',
        'Gracias por llamar. Lamentablemente tengo otra reunión hasta las 15:00. ¿Le parecería bien a las 15:30?',
        'Por supuesto, a las 15:30 está perfecto. Visitaremos su oficina en ese horario.',
        'Entendido. Le esperamos el martes 15 a las 15:30. Muchas gracias.',
      ],
      fr: [
        'Merci beaucoup pour votre fidèle collaboration. Concernant notre réunion de la semaine prochaine, le mardi 15 à 14h00 vous conviendrait-il ?',
        'Merci pour votre appel. Malheureusement, j\'ai une autre réunion jusqu\'à 15h00. Est-ce que 15h30 conviendrait ?',
        'Absolument, 15h30 convient parfaitement. Nous nous rendrons à vos bureaux à cette heure-là.',
        'C\'est bien noté. Au plaisir de vous voir le mardi 15 à 15h30. Merci.',
      ],
      vi: [
        'Cảm ơn quý công ty đã luôn hợp tác. Về buổi gặp mặt tuần tới, thứ Ba ngày 15 lúc 14 giờ có tiện cho anh không ạ?',
        'Cảm ơn anh đã gọi. Rất tiếc là hôm đó tôi bận họp đến 15 giờ. Nếu chuyển sang 15 giờ 30 phút thì có được không ạ?',
        'Dạ hoàn toàn được, 15 giờ 30 phút rất thuận tiện ạ. Chúng tôi sẽ đến văn phòng anh vào giờ đó.',
        'Vâng tôi đã rõ. Hẹn gặp anh vào 15 giờ 30 phút thứ Ba ngày 15 nhé. Xin cảm ơn anh.',
      ],
      id: [
        'Terima kasih atas kerja samanya selalu. Mengenai rapat minggu depan, apakah Selasa tanggal 15 pukul 14.00 cocok untuk Anda?',
        'Terima kasih telah menghubungi. Mohon maaf, saya ada rapat lain hingga pukul 15.00. Apakah pukul 15.30 bisa?',
        'Tentu saja, pukul 15.30 sangat cocok. Kami akan mengunjungi kantor Anda pada jam tersebut.',
        'Baik, dipahami. Kami menantikan kehadiran Anda pada hari Selasa tanggal 15 pukul 15.30. Terima kasih.',
      ],
    },
  },
};

// ----------------------------------------------------------------------------
// 3. Retrieval Helper Functions
// ----------------------------------------------------------------------------
export function getLocalizedReadingPassage(
  passageId: string,
  lang: SupportedLanguage,
  defaultEn: string
): string {
  if (lang === 'en') return defaultEn;
  const match = READING_PASSAGES_I18N[passageId];
  if (match && match[lang]) {
    return match[lang]!;
  }
  return defaultEn;
}

export function getLocalizedListeningSituation(
  lessonId: string,
  lang: SupportedLanguage,
  defaultText: string
): string {
  if (lang === 'en') return defaultText;
  const match = LISTENING_LESSONS_I18N[lessonId];
  if (match && match.situationByLang && match.situationByLang[lang]) {
    return match.situationByLang[lang]!;
  }
  return defaultText;
}

export function getLocalizedListeningLine(
  lessonId: string,
  lineIndex: number,
  lang: SupportedLanguage,
  defaultEn: string
): string {
  if (lang === 'en') return defaultEn;
  const match = LISTENING_LESSONS_I18N[lessonId];
  if (
    match &&
    match.linesByLang &&
    match.linesByLang[lang] &&
    match.linesByLang[lang]![lineIndex]
  ) {
    return match.linesByLang[lang]![lineIndex];
  }
  return defaultEn;
}

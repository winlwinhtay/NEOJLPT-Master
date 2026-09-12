// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) CONTENT LOCALIZATION ENGINE
// Complete Translations for Lessons, Dialogue Turns, Emails, Culture & Exam
// Across all 19 supported languages:
// en, ja, my, th, zh, ko, es, fr, vi, id, tr, de, pt, nl, hi, bn, ms, ar, tl
// ============================================================================

import { SupportedLanguage } from '../../types/i18n';
import { BusinessQuizQuestion } from '../../types/business';

// ----------------------------------------------------------------------------
// 1. Dialogue Line Translations (Scenarios & Phone Simulator)
// ----------------------------------------------------------------------------
export const SCENARIO_LINE_I18N: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  // Scenario 1: Phone call
  'd1-1': {
    en: 'Hello, this is Sasaki from Yamato Corp. Is Manager Sato in, please?',
    ja: 'お世話になっております。大和商事の佐々木と申しますが、佐藤部長はいらっしゃいますでしょうか。',
    my: 'မင်္ဂလာပါ၊ ရာမတို ကုန်သွယ်ရေးမှ ဆဆခိ ဖြစ်ပါတယ်။ မန်နေဂျာ ဆာတို ရှိပါသလား ခင်ဗျာ။',
    th: 'สวัสดีครับ ผมซาซากิจากบริษัทยามะโตะโชจิ ไม่ทราบว่าผู้จัดการซาโต้สะดวกรับสายไหมครับ',
    zh: '您好，承蒙关照。我是大和商事的佐佐木，请问佐藤部长在吗？',
    ko: '안녕하십니까. 늘 신세 지고 있습니다. 야마토 상사의 사사키입니다만, 사토 부장님 계십니까?',
    es: 'Hola, habla Sasaki de Yamato Corp. ¿Se encuentra el gerente Sato, por favor?',
    fr: 'Bonjour, ici M. Sasaki de Yamato Corp. Le directeur Sato est-il disponible, s\'il vous plaît ?',
    vi: 'Xin chào quý công ty. Tôi là Sasaki bên Yamato Corp, xin hỏi có trưởng phòng Sato ở đó không ạ?',
    id: 'Halo, saya Sasaki dari Yamato Corp. Apakah Manajer Sato ada di tempat?',
    tr: 'Merhaba, Yamato Corp\'tan Sasaki. Acaba Müdür Sato orada mı?',
    de: 'Guten Tag, hier ist Sasaki von Yamato Corp. Ist Abteilungsleiter Sato zu sprechen, bitte?',
    pt: 'Olá, aqui é Sasaki da Yamato Corp. O gerente Sato está, por favor?',
    nl: 'Goedendag, dit is Sasaki van Yamato Corp. Is manager Sato aanwezig, alstublieft?',
    hi: 'नमस्ते, मैं यामातो कॉर्प से सासाकी बोल रहा हूँ। क्या प्रबंधक सातो जी उपस्थित हैं?',
    bn: 'নমস্কার, আমি ইয়ামাতো কর্প থেকে সাসাকি বলছি। ম্যানেজার সাতো কি উপস্থিত আছেন?',
    ms: 'Helo, ini Sasaki dari Yamato Corp. Boleh saya bercakap dengan Pengurus Sato?',
    ar: 'مرحباً، أنا ساساكي من شركة ياماتو. هل المدير ساتو موجود من فضلك؟',
    tl: 'Magandang araw, ito po si Sasaki mula sa Yamato Corp. Nariyan po ba si Manager Sato?',
  },
  'd1-2': {
    en: 'Mr. Sasaki of Yamato Corp, thank you very much for always doing business with us. Regrettably, Sato is currently in another meeting and will be away from his desk until around 3:00 PM.',
    ja: '大和商事の佐々木様ですね。いつも大変お世話になっております。あいにく佐藤は、ただいま別の会議に入っておりまして、15時頃まで席を外しております。',
    my: 'ရာမတို ကုန်သွယ်ရေးမှ မစ္စတာ ဆဆခိ ခင်ဗျား။ အမြဲအားပေးကူညီမှုအတွက် ကျေးဇူးတင်ပါတယ်။ စိတ်မကောင်းစွာဖြင့် ဆာတိုသည် အစည်းအဝေးတက်နေပါသဖြင့် ညနေ ၃ နာရီခန့်အထိ ခုံတွင် မရှိပါခင်ဗျာ။',
    th: 'คุณซาซากิแห่งยามะโตะโชจิ ขอบพระคุณที่อุดหนุนเสมอมาครับ พอดีซาโต้ติดประชุมอยู่ คาดว่าจะกลับมาที่โต๊ะประมาณ 15:00 น. ครับ',
    zh: '原来是大和商事的佐佐木先生。一直以来承蒙关照。十分不巧，佐藤目前正在开会，预计要到15点左右返回座位。',
    ko: '야마토 상사의 사사키 님이시군요. 늘 각별히 감사드립니다. 공교롭게도 사토는 현재 다른 회의에 들어가 있어 15시경까지 자리를 비우고 있습니다.',
    es: 'Señor Sasaki de Yamato Corp, muchas gracias por su preferencia. Lamentablemente, Sato está en una reunión y estará fuera de su puesto hasta las 3:00 PM.',
    fr: 'M. Sasaki de Yamato Corp, merci beaucoup pour votre fidélité. Malheureusement, Sato est en réunion et sera absent de son bureau jusqu\'à 15h00 environ.',
    vi: 'Dạ anh Sasaki bên Yamato Corp, cảm ơn anh đã luôn ủng hộ công ty chúng tôi. Thật tiếc là Sato đang bận cuộc họp khác, đến khoảng 15 giờ mới về chỗ ạ.',
    id: 'Bapak Sasaki dari Yamato Corp, terima kasih atas kerja samanya selalu. Mohon maaf, Sato saat ini sedang rapat lain dan tidak di meja sampai sekitar pukul 15:00.',
    tr: 'Yamato Corp\'tan Bay Sasaki, ilginiz için çok teşekkür ederiz. Maalesef Sato şu anda başka bir toplantıda ve saat 15:00 civarına kadar masasında olmayacak.',
    de: 'Herr Sasaki von Yamato Corp, vielen Dank für die gute Zusammenarbeit. Leider ist Sato derzeit in einer Besprechung und bis etwa 15:00 Uhr abwesend.',
    pt: 'Sr. Sasaki da Yamato Corp, muito obrigado pela parceria de sempre. Infelizmente Sato está em uma reunião e estará fora da mesa até cerca de 15:00.',
    nl: 'Meneer Sasaki van Yamato Corp, hartelijk dank voor de samenwerking. Helaas zit Sato momenteel in vergadering tot ongeveer 15:00 uur.',
    hi: 'यामातो कॉर्प के सासाकी जी, निरंतर सहयोग के लिए धन्यवाद। दुर्भाग्य से सातो जी अभी एक मीटिंग में हैं और दोपहर 3:00 बजे तक सीट पर नहीं होंगे।',
    bn: 'ইয়ামাতো কর্পের মিস্টার সাসাকি, আপনার সহযোগিতার জন্য ধন্যবাদ। দুঃখজনকভাবে সাতো এখন মিটিংয়ে আছেন এবং বিকেল ৩টা পর্যন্ত টেবিলে থাকবেন না।',
    ms: 'Encik Sasaki dari Yamato Corp, terima kasih banyak atas kerjasama berterusan. Harap maaf, Sato sedang bermesyuarat hingga kira-kira jam 3:00 petang.',
    ar: 'السيد ساساكي من شركة ياماتو، نشكركم دائماً على حسن تعاونكم. للأسف ساتو في اجتماع حالياً ولن يكون في مكتبه حتى الساعة الثالثة عصراً تقريباً.',
    tl: 'Ginoong Sasaki ng Yamato Corp, maraming salamat po sa inyong patuloy na pagtangkilik. Ikinalulungkot ko po, kasalukuyang nasa pulong si Sato hanggang bandang 3:00 PM.',
  },
  'd1-3': {
    en: 'I see. When he returns, could you please have him call me back? It is not an emergency.',
    ja: 'そうですか。では、戻られましたら、私宛てに折り返しお電話をいただけますでしょうか。至急の件ではございません。',
    my: 'ဟုတ်ကဲ့ပါ။ ဒါဆိုရင် သူပြန်ရောက်တဲ့အခါ ကျွန်တော့်ဆီ ဖုန်းပြန်ခေါ်ပေးဖို့ ပြောပေးနိုင်မလားခင်ဗျာ။ အရေးပေါ်ကိစ္စတော့ မဟုတ်ပါဘူး။',
    th: 'อย่างนั้นหรือครับ ถ้าเขากลับมาแล้ว รบกวนโทรกลับหาผมได้ไหมครับ ไม่ใช่เรื่องด่วนครับ',
    zh: '这样啊。那么等他回来后，能否麻烦他给我回个电话？并不是紧急的事情。',
    ko: '그렇군요. 그럼 돌아오시면 저에게 전화 한 통 부탁드려도 될까요? 급한 용건은 아닙니다.',
    es: 'Ya veo. Cuando regrese, ¿podría pedirle que me devuelva la llamada? No es urgente.',
    fr: 'Je vois. À son retour, pourriez-vous lui demander de me rappeler ? Ce n\'est pas urgent.',
    vi: 'Tôi hiểu rồi. Khi nào anh ấy quay lại, nhờ anh ấy gọi lại cho tôi nhé. Việc không gấp đâu ạ.',
    id: 'Begitu ya. Kalau sudah kembali, bisakah minta beliau menelepon saya kembali? Tidak mendesak kok.',
    tr: 'Anladım. Döndüğünde beni geri aramasını rica edebilir miyim? Acil bir konu değil.',
    de: 'Verstehe. Könnten Sie ihn bitte bitten, mich zurückzurufen, wenn er zurück ist? Es ist nicht dringend.',
    pt: 'Entendo. Quando ele retornar, você poderia pedir para me retornar a ligação? Não é urgente.',
    nl: 'Ik begrijp het. Zou u hem willen vragen mij terug te bellen zodra hij terug is? Het is niet dringend.',
    hi: 'समझ गया। जब वे वापस आएं, तो क्या आप उनसे मुझे कॉल बैक करने के लिए कह सकते हैं? कोई ज़रूरी बात नहीं है।',
    bn: 'বুঝেছি। তিনি ফিরলে কি দয়া করে আমাকে ফিরতি কল করতে বলবেন? খুব জরুরি কিছু নয়।',
    ms: 'Baiklah. Apabila dia kembali, bolehkah minta dia menghubungi saya semula? Perkara ini tidak mendesak.',
    ar: 'فهمت. عندما يعود، هل يمكنك إخباره بإعادة الاتصال بي؟ الموضوع ليس عاجلاً.',
    tl: 'Naiintindihan ko po. Pagbalik po niya, maaari po ba siyang tumawag muli sa akin? Hindi naman po apurahan.',
  },
  'd1-4': {
    en: 'Understood. When Sato returns, I will convey that you requested a callback. Just to be sure, may I verify your telephone number?',
    ja: 'かしこまりました。佐藤が戻り次第、佐々木様へ折り返しお電話を差し上げるよう申し伝えます。念のため、お電話番号をお伺いしてもよろしいでしょうか。',
    my: 'စိတ်ချပါခင်ဗျာ။ ဆာတို ပြန်ရောက်သည်နှင့် မစ္စတာ ဆဆခိထံ ဖုန်းပြန်ခေါ်ရန် သေချာပြောပြပါမည်။ သေချာစေရန်အတွက် ဖုန်းနံပါတ်လေး မေးမြန်းပါရစေခင်ဗျာ။',
    th: 'รับทราบครับ เมื่อซาโต้กลับมาแล้ว ผมจะแจ้งให้โทรกลับหาคุณซาซากิทันทีครับ เพื่อความแน่นอน ขออนุญาตทวนหมายเลขโทรศัพท์ได้ไหมครับ',
    zh: '好的，明白了。佐藤一回来，我就转告他给佐佐木先生回电。为防万一，可以请教一下您的电话号码吗？',
    ko: '알겠습니다. 사토가 돌아오는 대로 사사키 님께 답신 전화를 드리도록 전하겠습니다. 만약을 위해 전화번호를 여쭤봐도 되겠습니까?',
    es: 'Entendido. En cuanto regrese Sato, le comunicaré que le devuelva la llamada. Por si acaso, ¿podría confirmarme su número de teléfono?',
    fr: 'C\'est bien noté. Dès le retour de Sato, je lui transmettrai de vous rappeler. Pour confirmation, puis-je avoir votre numéro de téléphone ?',
    vi: 'Dạ vâng tôi hiểu rồi. Ngay khi Sato về, tôi sẽ nhắn anh ấy gọi lại cho anh Sasaki ngay. Để chắc chắn, xin phép được hỏi lại số điện thoại của anh được không ạ?',
    id: 'Baik, dimengerti. Begitu Sato kembali, saya akan sampaikan agar beliau menelepon kembali. Untuk memastikan, bolehkah saya mencatat nomor telepon Anda?',
    tr: 'Anlaşıldı. Sato döner dönmez sizi aramasını ileteceğim. Teyit etmek adına telefon numaranızı alabilir miyim?',
    de: 'Sehr wohl. Sobald Sato zurück ist, werde ich ihm ausrichten, Sie zurückzurufen. Dürfte ich zur Sicherheit Ihre Rufnummer notieren?',
    pt: 'Com certeza. Assim que Sato retornar, direi para ele retornar a ligação. Por precaução, posso confirmar seu número de telefone?',
    nl: 'Begrepen. Zodra Sato terug is, geef ik door dat hij u moet terugbellen. Mag ik voor de zekerheid uw telefoonnummer noteren?',
    hi: 'समझ गया। जैसे ही सातो जी वापस आएंगे, मैं उन्हें कॉल बैक करने का संदेश दे दूंगा। पुष्टि हेतु, क्या मैं आपका फ़ोन नंबर जान सकता हूँ?',
    bn: 'নিশ্চয়ই। সাতো ফিরলেই আপনাকে কল করতে বলে দেব। নিশ্চিত হওয়ার জন্য কি আপনার ফোন নম্বরটি জানতে পারি?',
    ms: 'Faham. Sebaik sahaja Sato kembali, saya akan sampaikan pesanan untuk menghubungi anda semula. Bolehkah saya sahkan nombor telefon anda?',
    ar: 'علم. بمجرد عودة ساتو، سأبلغه بإعادة الاتصال بحضرتك. وللتأكيد، هل تسمح لي بتدوين رقم هاتفك؟',
    tl: 'Naiintindihan ko po. Pagbalik na pagbalik po ni Sato, sasabihin ko pong tawagan kayo. Para po sigurado, maaari ko po bang makuha ang inyong numero ng telepono?',
  },

  // Scenario 2: Hou-Ren-Sou delay report
  'd2-1': {
    en: 'Section Chief Yamamoto, do you have a brief moment now? I have an urgent report and consultation regarding the payment system revision scheduled for this Friday.',
    ja: '山本課長、今少々お時間よろしいでしょうか。今週金曜日に予定しております決済システム改修の件で、ご報告とご相談がございます。',
    my: 'ဌာနမှူး ယာမာမိုတို ခင်ဗျား၊ အချိန်ခေတ္တလောက် ရနိုင်မလားခင်ဗျာ။ ဒီသောကြာနေ့ စီစဉ်ထားတဲ့ ငွေပေးချေမှုစနစ် ပြင်ဆင်မှုနဲ့ပတ်သက်ပြီး အစီရင်ခံ တိုင်ပင်စရာ ရှိလို့ပါခင်ဗျာ။',
    th: 'หัวหน้ายามาโมโตะครับ พอจะมีเวลาสักครู่ไหมครับ มีเรื่องรายงานและปรึกษาด่วนเกี่ยวกับการปรับปรุงระบบชำระเงินในวันศุกร์นี้ครับ',
    zh: '山本课长，请问您现在方便抽空一下吗？关于预定本周五进行的支付系统更新项目，我有紧急进展需要向您汇报和请示。',
    ko: '야마모토 과장님, 지금 잠시 시간 괜찮으십니까? 이번 주 금요일 예정된 결제 시스템 개수 건으로 긴급 보고 및 상담드릴 말씀이 있습니다.',
    es: 'Jefe Yamamoto, ¿tendría un momento? Tengo un informe y una consulta urgente sobre la actualización del sistema de pagos prevista para este viernes.',
    fr: 'Chef de section Yamamoto, auriez-vous un instant ? J\'ai un rapport et une consultation urgents concernant la mise à jour du système de paiement prévue ce vendredi.',
    vi: 'Trưởng nhóm Yamamoto ơi, anh có tiện chút thời gian không ạ? Em có việc báo cáo và xin ý kiến gấp về dự án cập nhật hệ thống thanh toán thứ Sáu này.',
    id: 'Kepala Seksi Yamamoto, apakah ada waktu sebentar? Saya ingin melaporkan dan berkonsultasi mengenai pembaruan sistem pembayaran hari Jumat ini.',
    tr: 'Kısım Müdürü Yamamoto, kısa bir vaktiniz var mı acaba? Cuma günü planlanan ödeme sistemi revizyonu hakkında acil bir rapor ve danışma konum var.',
    de: 'Herr Abteilungsleiter Yamamoto, hätten Sie kurz Zeit? Ich hätte einen dringenden Bericht und ein Beratungsanliegen zum Zahlungssystem-Update am Freitag.',
    pt: 'Chefe Yamamoto, teria um instante? Tenho um relatório urgente e uma consulta sobre a atualização do sistema de pagamentos prevista para sexta-feira.',
    nl: 'Afdelingshoofd Yamamoto, heeft u even tijd? Ik heb een dringend rapport en een vraag over de update van het betalingssysteem van deze vrijdag.',
    hi: 'यामामोतो प्रमुख जी, क्या आपके पास थोड़ा समय है? इस शुक्रवार को निर्धारित भुगतान प्रणाली संशोधन के संबंध में एक रिपोर्ट और परामर्श है।',
    bn: 'ইয়ামামোতো প্রধান সাহেব, আপনার কি কিছুটা সময় হবে? এই শুক্রবারের পেমেন্ট সিস্টেম পরিবর্তনের বিষয়ে জরুরি রিপোর্ট ও পরামর্শ আছে।',
    ms: 'Ketua Seksyen Yamamoto, adakah anda mempunyai masa sekejap? Saya ada laporan kecemasan dan ingin berunding tentang sistem pembayaran hari Jumaat ini.',
    ar: 'رئيس القسم ياماموتو، هل لديك بضع دقائق؟ لدي تقرير عاجل واستشارة بخصوص تعديل نظام الدفع المقرر يوم الجمعة هذا.',
    tl: 'Section Chief Yamamoto, may kaunti po ba kayong oras? Mayroon po akong agarang ulat at pagsangguni tungkol sa payment system project sa Biyernes.',
  },
  'd2-2': {
    en: 'Yes, what is it? Did some trouble occur?',
    ja: 'うん、どうした？何かトラブルでもあったか？',
    my: 'အင်း၊ ဘာဖြစ်လို့လဲ။ ပြဿနာတစ်ခုခု ကြုံလို့လား။',
    th: 'อืม มีอะไรหรือ มีปัญหาอะไรเกิดขึ้นหรือเปล่า',
    zh: '嗯，怎么了？出什么故障或者突发情况了吗？',
    ko: '응, 무슨 일이야? 무슨 문제라도 생겼나?',
    es: 'Sí, ¿qué ocurre? ¿Hubo algún problema?',
    fr: 'Oui, qu\'y a-t-il ? Un incident s\'est produit ?',
    vi: 'Ừ, có chuyện gì vậy em? Có trục trặc gì xảy ra à?',
    id: 'Ya, ada apa? Apakah ada masalah?',
    tr: 'Evet, ne oldu? Bir sorun mu çıktı?',
    de: 'Ja, was gibt es? Gibt es Probleme?',
    pt: 'Sim, o que houve? Ocorreu algum problema?',
    nl: 'Ja, wat is er aan de hand? Is er een probleem ontstaan?',
    hi: 'हाँ, क्या हुआ? क्या कोई समस्या आ गई?',
    bn: 'হ্যাঁ, কি হয়েছে? কোনো সমস্যা দেখা দিয়েছে?',
    ms: 'Ya, ada apa? Adakah apa-apa masalah berlaku?',
    ar: 'نعم، ما الأمر؟ هل حدثت مشكلة ما؟',
    tl: 'Oo, ano iyon? May naging aberya ba?',
  },
  'd2-3': {
    en: 'To state the conclusion first, delivery on Friday is anticipated to be delayed by two business days. The cause is a specification bug in the third-party API, which requires additional days for fix and testing. As my proposed recovery plan, I would like to reschedule delivery to next Tuesday morning and notify the client today. What are your thoughts on this?',
    ja: '結論から申し上げますと、金曜日の納品が2営業日遅延する見込みです。外部APIの仕様不具合が原因で、修正とテストに追加入り日数を要します。私としては、来週火曜日の午前納品にリスケジュールし、本日中にクライアントへご連絡したく存じますが、いかがでしょうか。',
    my: 'နိဂုံးချုပ်ကို အရင်တင်ပြရလျှင် သောကြာနေ့ ပစ္စည်းအပ်နှံမှုသည် ၂ ရက်ခန့် နောက်ကျမည့်အခြေအနေ ရှိပါသည်။ ပြင်ပ API အမှားကြောင့် ပြင်ဆင်စမ်းသပ်ရန် ရက်ထပ်လိုပါသည်။ ကျွန်တော့်အစီအစဉ်အရ လာမည့်အင်္ဂါနေ့မနက်သို့ ပြောင်းလဲပြီး ယနေ့အတွင်း ဝယ်သူထံ အကြောင်းကြားလိုပါသည် ခင်ဗျာ။',
    th: 'ขออนุญาตเรียนสรุปก่อนว่า การส่งมอบในวันศุกร์น่าจะล่าช้าไป 2 วันทำการครับ สาเหตุเกิดจากบั๊กของ API ภายนอก ทำให้ต้องใช้เวลาแก้และทดสอบเพิ่ม แผนฟื้นฟูของผมคือเลื่อนไปส่งเช้าวันอังคารหน้าและแจ้งลูกค้าภายในวันนี้ หัวหน้ามีความเห็นอย่างไรครับ',
    zh: '首先向您汇报结论：原定周五的交付预计需要顺延2个工作日。原因是外部API存在规范缺陷，排查和测试需要追加工时。我的应急挽回方案是将交付时间调整至下周二上午，并在今天之内主动通知客户。请问您意下如何？',
    ko: '결론부터 말씀드리자면, 금요일 납품이 영업일 기준 2일 정도 지연될 것으로 예상됩니다. 외부 API 사양 결함이 원인이며 수정 및 테스트에 추가 일수가 필요합니다. 대책으로는 다음 주 화요일 오전 납품으로 일정을 재조정하고 오늘 중 클라이언트에게 연락드리고자 하는데 어떻게 생각하십니까?',
    es: 'Para adelantar la conclusión, se prevé que la entrega del viernes se retrase dos días hábiles. La causa es un fallo en la API externa que requiere pruebas adicionales. Como plan de recuperación, propongo reprogramar para el martes por la mañana e informar al cliente hoy mismo. ¿Qué le parece?',
    fr: 'Pour commencer par la conclusion, la livraison de vendredi sera retardée de 2 jours ouvrés. La cause est un bug dans l\'API tierce nécessitant des tests supplémentaires. Comme plan de rattrapage, je propose de reprogrammer à mardi matin et de prévenir le client aujourd\'hui. Qu\'en pensez-vous ?',
    vi: 'Em xin phép báo cáo kết luận trước: tiến độ bàn giao thứ Sáu dự kiến trễ 2 ngày làm việc ạ. Nguyên nhân do lỗi từ API bên thứ ba nên cần thêm thời gian sửa và kiểm thử. Phương án khắc phục của em là dời sang sáng thứ Ba tuần sau và chủ động báo khách hàng trong hôm nay, anh thấy thế nào ạ?',
    id: 'Langsung pada kesimpulannya, pengiriman hari Jumat diperkirakan tertunda 2 hari kerja. Penyebabnya adalah bug pada API eksternal yang butuh pengujian tambahan. Rencana saya adalah menjadwalkan ulang ke Selasa pagi dan menghubungi klien hari ini. Bagaimana menurut Anda?',
    tr: 'Öncelikle sonucu arz edeyim: Cuma günkü teslimatın 2 iş günü gecikmesi öngörülüyor. Sebep harici API hatası olup ek test süresi gerektiriyor. Telafi planı olarak salı sabahına erteleyip müşteriye bugün bilgi vermeyi öneriyorum. Siz ne dersiniz?',
    de: 'Um das Fazit vorwegzunehmen: Die Lieferung am Freitag wird sich voraussichtlich um 2 Werktage verzögern. Ursache ist ein Bug in der externen API. Als Lösung schlage ich vor, auf Dienstagmorgen umzuterminieren und den Kunden heute zu informieren. Wie beurteilen Sie das?',
    pt: 'Indo direto à conclusão, a entrega de sexta-feira deve atrasar 2 dias úteis devido a um bug na API externa. Como plano de contingência, proponho reagendar para terça-feira de manhã e avisar o cliente hoje. O que o senhor acha?',
    nl: 'Om met de conclusie te beginnen: de oplevering van vrijdag zal vermoedelijk 2 werkdagen vertraging oplopen door een bug in de externe API. Mijn herstelplan is om te verzetten naar dinsdagochtend en de klant vandaag in te lichten. Wat vindt u daarvan?',
    hi: 'निष्कर्ष पहले बताते हुए, शुक्रवार की डिलीवरी में 2 कार्यदिवसों की देरी होने की संभावना है। इसका कारण बाहरी एपीआई की खराबी है। समाधान के रूप में मैं इसे अगले मंगलवार सुबह तक पुनर्निर्धारित करने और आज ही ग्राहक को सूचित करने का प्रस्ताव करता हूँ। आपका क्या विचार है?',
    bn: 'প্রথমে মূল বিষয়টি জানাচ্ছি, শুক্রবারের ডেলিভারি ২ কর্মদিবস বিলম্বিত হতে পারে। বহিরাগত এপিআই ত্রুটির কারণে অতিরিক্ত টেস্ট প্রয়োজন। সমাধানের জন্য আমি আগামী মঙ্গলবার সকালে ডেলিভারি পুনঃনির্ধারণ এবং আজই ক্লায়েন্টকে জানানোর প্রস্তাব করছি। এ বিষয়ে আপনার অভিমত কী?',
    ms: 'Menyatakan kesimpulan dahulu, penghantaran hari Jumaat dijangka lewat 2 hari bekerja kerana pepijat API pihak ketiga. Sebagai pelan pemulihan, saya cadangkan jadualkan semula ke pagi Selasa depan dan maklumkan kepada pelanggan hari ini. Apa pandangan encik?',
    ar: 'للبدء بالخلاصة أولاً، من المتوقع تأخر تسليم الجمعة لمدة يومي عمل بسبب خلل في واجهة برمجة التطبيقات الخارجية. كخطة إنقاذ بديلة، أقترح إعادة الجدولة لصباح الثلاثاء القادم وإبلاغ العميل اليوم. ما هو رأي حضرتك؟',
    tl: 'Unahin ko na po ang konklusyon: ang paghahatid sa Biyernes ay inaasahang maaantala ng 2 araw dahil sa bug sa external API. Bilang recovery plan, nais ko pong ilipat sa Martes ng umaga at abisuhan ang kliyente ngayong araw. Ano po ang inyong payo?',
  },

  // Scenario 3: Customer Complaint
  'd3-1': {
    en: 'What is the meaning of this! I was just informed that the brochures for tomorrow\'s exhibition have not arrived yet. Visitors start arriving first thing tomorrow morning—how can we possibly have no materials!',
    ja: 'どういうことですか！明日の展示会で使うパンフレットがまだ届いていないと連絡がありました。明日の朝一番から来場者が来るのに、資料がないなんてあり得ないでしょう！',
    my: 'ဒါ ဘာသဘောလဲဗျာ။ မနက်ဖြန် ကုန်စည်ပြပွဲမှာ သုံးမယ့် လက်ကမ်းစာစောင်တွေ မရောက်သေးဘူးလို့ အခုပဲ အကြောင်းကြားလာတယ်။ မနက်ဖြန် မနက်စောစော ဧည့်သည်တွေ လာတော့မှာကို စာရွက်စာတမ်း မရှိဘူးဆိုတာ ဘယ်လိုမှ မဖြစ်သင့်ဘူး။',
    th: 'นี่มันหมายความว่ายังไงครับ! เพิ่งได้รับแจ้งว่าโบรชัวร์สำหรับงานแสดงสินค้าพรุ่งนี้ยังส่งมาไม่ถึง ผู้เข้าชมจะเริ่มมาตั้งแต่เช้าตรู่ จะไม่มีเอกสารแจกได้อย่างไรกัน!',
    zh: '这是怎么回事！我刚接到通知说，明天展会上要用的宣传册到现在还没送到。明天一早客户就要入场了，展台上没有资料成何体统！',
    ko: '도대체 어떻게 된 일입니까! 내일 전시회에서 쓸 팜플렛이 아직 도착하지 않았다는 연락을 받았습니다. 내일 아침 일찍부터 참관객이 오는데 자료가 없다니 말도 안 됩니다!',
    es: '¡Qué significa esto! Me acaban de informar que los folletos para la feria de mañana aún no han llegado. Los visitantes llegan a primera hora, ¡no podemos estar sin material!',
    fr: 'Qu\'est-ce que cela signifie ! On vient de me prévenir que les brochures pour le salon de demain ne sont pas arrivées. Les visiteurs arrivent dès la première heure, c\'est inadmissible !',
    vi: 'Thế này là thế nào hả các anh! Tôi vừa nhận được tin tờ rơi quảng cáo cho hội chợ triển lãm ngày mai vẫn chưa tới nơi. Sáng mai khách bắt đầu vào xem rồi, không có tài liệu là không thể chấp nhận được!',
    id: 'Apa maksudnya ini! Saya baru dikabari bahwa brosur untuk pameran besok belum sampai. Pengunjung sudah mulai datang besok pagi, masa tidak ada materi promosi!',
    tr: 'Bu ne demek oluyor! Yarınki fuarda kullanılacak broşürlerin henüz gelmediği bildirildi. Yarın sabah erkenden ziyaretçiler gelecek, materyalsiz kalmamız kabul edilemez!',
    de: 'Was hat das zu bedeuten! Mir wurde gerade mitgeteilt, dass die Broschüren für die morgige Messe noch nicht da sind. Morgen früh kommen die ersten Besucher – ohne Unterlagen geht das gar nicht!',
    pt: 'O que significa isso! Acabo de ser informado de que os panfletos para a feira de amanhã ainda não chegaram. Os visitantes chegam logo cedo, é inaceitável ficarmos sem material!',
    nl: 'Wat moet dit voorstellen! Ik hoor net dat de brochures voor de beurs van morgen nog niet binnen zijn. Morgenochtend vroeg komen de eerste bezoekers al, we kunnen toch niet zonder materiaal staan!',
    hi: 'इसका क्या मतलब है! मुझे अभी बताया गया कि कल की प्रदर्शनी के ब्रोशर अभी तक नहीं पहुंचे हैं। कल सुबह सबसे पहले आगंतुक आने वाले हैं, बिना सामग्री के कैसे काम चलेगा!',
    bn: 'এর মানে কী! আমাকে এইমাত্র জানানো হলো যে আগামীকালের প্রদর্শনীর ব্রোশিওর এখনও এসে পৌঁছায়নি। কাল সকালে দর্শনার্থীরা আসবেন, সেখানে কোনো কাগজপত্র না থাকা অসম্ভব!',
    ms: 'Apa maknanya semua ini! Saya baru sahaja dimaklumkan bahawa risalah untuk pameran esok belum sampai. Pengunjung akan tiba awal pagi esok, mana boleh tiada bahan promosi!',
    ar: 'ما معنى هذا الكلام! تم إبلاغي للتو بأن الكتيبات الخاصة بمعرض الغد لم تصل بعد. سيبدأ الزوار في التوافد في الصباح الباكر، فكيف يمكن ألا تتوفر لدينا أية مطبوعات!',
    tl: 'Ano po ang ibig sabihin nito! Kaaabisuhan lang po sa akin na hindi pa dumarating ang mga brochure para sa exhibition bukas. Maagang darating ang mga bisita, paano tayo mawawalan ng materyales!',
  },
  'd3-2': {
    en: 'Director Kawamura, at such a critically important moment right before tomorrow\'s major exhibition, I sincerely and deeply apologize for causing you tremendous anxiety and trouble.',
    ja: '川村部長、明日の大切な展示会を控えた極めて重要な時期に、多大なるご心配とご迷惑をおかけし、心より深くお詫び申し上げます。',
    my: 'ဒါရိုက်တာ ခါဝါမူရာ ခင်ဗျား၊ မနက်ဖြန် ကျင်းပမည့် အလွန်အရေးကြီးသော ပြပွဲမတိုင်မီ ယခုကဲ့သို့ စိုးရိမ်ပူပန်မှုနှင့် အခက်အခဲများစွာ ဖြစ်ပေါ်စေခဲ့သည့်အတွက် စိတ်နှလုံးထဲမှ အထူးပင် တောင်းပန်အပ်ပါသည် ခင်ဗျာ။',
    th: 'ผู้อำนวยการคาวามุระครับ ในช่วงเวลาสำคัญยิ่งก่อนงานแสดงสินค้าในวันพรุ่งนี้ ผมต้องกราบขออภัยเป็นอย่างสูงจากใจจริงที่สร้างความกังวลและความเดือดร้อนให้อย่างยิ่งครับ',
    zh: '川村部长，在明天如此重大的展会前夕的关键时刻，给您添了如此大的担忧与麻烦，我谨代表团队向您致以最深切的诚挚歉意。',
    ko: '카와무라 부장님, 내일의 중요한 전시회를 앞둔 이 중차대한 시점에 지대한 걱정과 심려를 끼쳐드려 진심으로 고개 숙여 사과드립니다.',
    es: 'Director Kawamura, en un momento tan crucial justo antes de la importante feria de mañana, le pido sincera y profundamente disculpas por causarle tanta preocupación y molestias.',
    fr: 'Directeur Kawamura, à un moment aussi crucial juste avant le grand salon de demain, je vous présente mes excuses les plus sincères et les plus profondes pour l\'inquiétude causée.',
    vi: 'Thưa giám đốc Kawamura, ngay trước thời điểm hội chợ triển lãm quan trọng ngày mai mà lại khiến quý vị phải lo lắng và phiền lòng lớn như vậy, em xin chân thành gửi lời xin lỗi sâu sắc nhất ạ.',
    id: 'Direktur Kawamura, di momen yang sangat krusial menjelang pameran besar besok, saya dengan tulus dan mendalam memohon maaf atas kekhawatiran dan ketidaknyamanan besar ini.',
    tr: 'Direktör Kawamura, yarınki büyük fuarın hemen öncesindeki bu çok kritik süreçte bu denli endişe ve aksaklığa yol açtığımız için en içten özürlerimi sunarım.',
    de: 'Herr Direktor Kawamura, in diesem so entscheidenden Moment kurz vor der wichtigen Messe morgen möchte ich mich aufrichtig und in aller Form für die großen Unannehmlichkeiten entschuldigen.',
    pt: 'Diretor Kawamura, num momento tão crucial às vésperas da importante feira de amanhã, peço sinceras e profundas desculpas por causar tamanha preocupação e transtorno.',
    nl: 'Directeur Kawamura, op zo\'n cruciaal moment vlak voor de belangrijke beurs van morgen bied ik mijn oprechte excuses aan voor de enorme bezorgdheid en overlast.',
    hi: 'निदेशक कावामुरा जी, कल की महत्वपूर्ण प्रदर्शनी से ठीक पहले इतने नाजुक समय में आपको हुई भारी चिंता और असुविधा के लिए मैं दिल से क्षमा मांगता हूँ।',
    bn: 'পরিচালক কাওয়ামুরা সাহেব, আগামীকালের গুরুত্বপূর্ণ প্রদর্শনীর ঠিক পূর্বে এই সংকটজনক সময়ে আপনাকে এই উদ্বেগের মধ্যে ফেলার জন্য আমি আন্তরিকভাবে ক্ষমা প্রার্থনা করছি।',
    ms: 'Pengarah Kawamura, pada saat yang begitu genting menjelang pameran penting esok, saya memohon maaf setulus hati atas kebimbangan dan kesulitan besar yang timbul.',
    ar: 'المدير كاوامورا، في مثل هذا التوقيت الحاسم قبيل المعرض الهام غداً، أتقدم باعتذاري الصادق والعميق لحضرتكم عن التسبب في هذا القلق البالغ والمتاعب الكبيرة.',
    tl: 'Director Kawamura, sa napakahalagang sandali bago ang malaking exhibition bukas, taos-puso po akong humihingi ng tawad sa matinding pag-aalala at abalang naidulot nito.',
  },
};

// ----------------------------------------------------------------------------
// 2. Email Studio Key Phrase Translations
// ----------------------------------------------------------------------------
export const EMAIL_KEYPHRASE_I18N: Record<string, Partial<Record<SupportedLanguage, { meaning: string; usage: string }>>> = {
  'お時間を頂戴できないでしょうか': {
    en: { meaning: 'Could you please spare some of your precious time?', usage: 'A refined humble request for scheduling appointments.' },
    ja: { meaning: 'お時間を頂戴できないでしょうか', usage: '相手に面談や会議の時間を依頼する極めて丁寧な謙譲表現。' },
    my: { meaning: 'အချိန် အနည်းငယ်လောက် ပေးနိုင်ပါမည်လား ခင်ဗျာ', usage: 'ရက်ချိန်းတောင်းခံရာတွင် သုံးသော အလွန်ယဉ်ကျေးသည့် အသုံးအနှုန်း။' },
    th: { meaning: 'จะกรุณาสละเวลาสักเล็กน้อยได้หรือไม่ครับ', usage: 'สำนวนขอเวลาแบบถ่อมตนขั้นสูงสำหรับการนัดหมาย' },
    zh: { meaning: '能否占用您宝贵的时间？', usage: '在请求对方安排会议或面谈时间时的极其礼貌谦逊表达。' },
    ko: { meaning: '시간을 내어주실 수 있으시겠습니까?', usage: '상대방에게 미팅이나 면담 일정을 정중하게 요청하는 겸양 표현.' },
    es: { meaning: '¿Podría concederme unos minutos de su valioso tiempo?', usage: 'Petición humilde y muy formal para concertar citas.' },
    fr: { meaning: 'Pourriez-vous m\'accorder un peu de votre précieux temps ?', usage: 'Formule humble et raffinée pour demander un rendez-vous.' },
    vi: { meaning: 'Quý vị có thể bớt chút thời gian quý báu được không ạ?', usage: 'Cách diễn đạt khiêm nhường rất trang trọng khi xin lịch hẹn.' },
    id: { meaning: 'Bisakah Anda meluangkan sedikit waktu yang berharga?', usage: 'Permintaan rendah hati yang sangat sopan untuk mengatur janji temu.' },
    tr: { meaning: 'Acaba değerli vaktinizden ayırabilir misiniz?', usage: 'Randevu talep ederken kullanılan çok nazik ve alçakgönüllü bir ifade.' },
    de: { meaning: 'Dürfte ich um etwas von Ihrer geschätzten Zeit bitten?', usage: 'Eine sehr höfliche, bescheidene Bitte um einen Termin.' },
    pt: { meaning: 'Poderia me conceder um pouco do seu tempo?', usage: 'Um pedido humilde e refinado para agendar reuniões.' },
    nl: { meaning: 'Zou u wat van uw kostbare tijd kunnen vrijmaken?', usage: 'Een zeer beleefd en bescheiden verzoek voor een afspraak.' },
    hi: { meaning: 'क्या आप अपना कुछ कीमती समय दे सकते हैं?', usage: 'मुलाकात का समय मांगने हेतु अत्यंत विनम्र और शिष्ट अनुरोध।' },
    bn: { meaning: 'আপনি কি আপনার কিছু মূল্যবান সময় দিতে পারেন?', usage: 'মিটিংয়ের জন্য সময় চাওয়ার অত্যন্ত বিনয়ী বাক্য।' },
    ms: { meaning: 'Bolehkah anda meluangkan sedikit masa yang berharga?', usage: 'Permintaan rendah diri yang sangat sopan untuk temu janji.' },
    ar: { meaning: 'هل يمكنكم التفضل بمنحي بعضاً من وقتكم الثمين؟', usage: 'طلب في غاية اللباقة والتواضع لترتيب موعد اجتماع.' },
    tl: { meaning: 'Maaari po ba kayong maglaan ng kaunti sa inyong mahalagang oras?', usage: 'Isang magalang na kahilingan para sa pag-iskedyul ng pagpupulong.' },
  },
  'ご都合のよろしい時間帯': {
    en: { meaning: 'A time window that is convenient for you', usage: 'Honorific inquiry showing deference to the recipient\'s schedule.' },
    ja: { meaning: 'ご都合のよろしい時間帯', usage: '相手のスケジュールを最優先に尊重する尊敬表現。' },
    my: { meaning: 'သင့်အတွက် အဆင်ပြေစေမည့် အချိန်အပိုင်းအခြား', usage: 'တစ်ဖက်လူ၏ အချိန်ဇယားကို လေးစားကြောင်းပြသသည့် အသုံး။' },
    th: { meaning: 'ช่วงเวลาที่คุณสะดวก', usage: 'สำนวนยกย่องที่ให้เกียรติตารางเวลาของอีกฝ่ายเป็นหลัก' },
    zh: { meaning: '您方便的时间段', usage: '将对方的时间安排放在最优先考量的敬意表达。' },
    ko: { meaning: '형편이 편하신 시간대', usage: '상대방의 일정을 최우선으로 배려하는 존경 표현.' },
    es: { meaning: 'El horario que le sea más conveniente', usage: 'Expresión de cortesía que da prioridad a la agenda del destinatario.' },
    fr: { meaning: 'Le créneau horaire qui vous conviendrait le mieux', usage: 'Formule de respect privilégiant l\'agenda de votre interlocuteur.' },
    vi: { meaning: 'Khoảng thời gian thuận tiện nhất cho quý vị', usage: 'Kính ngữ thể hiện sự ưu tiên tối đa lịch trình của đối tác.' },
    id: { meaning: 'Rentang waktu yang nyaman bagi Anda', usage: 'Ungkapan hormat yang mengutamakan jadwal penerima.' },
    tr: { meaning: 'Sizin için uygun olan zaman dilimi', usage: 'Muhatabın takvimine öncelik veren saygılı bir ifade.' },
    de: { meaning: 'Ein für Sie günstiges Zeitfenster', usage: 'Höfliche Wendung, die den Terminplan des Empfängers priorisiert.' },
    pt: { meaning: 'O horário que for mais conveniente para você', usage: 'Expressão de respeito que prioriza a agenda da outra parte.' },
    nl: { meaning: 'Een tijdslot dat u het beste uitkomt', usage: 'Beleefde uitdrukking die rekening houdt met de agenda van de ontvanger.' },
    hi: { meaning: 'वह समय जो आपके लिए सुविधाजनक हो', usage: 'प्राप्तकर्ता की समय-सारणी का सम्मान करने वाला आदरसूचक प्रयोग।' },
    bn: { meaning: 'আপনার সুবিধাজনক সময়ের তালিকা', usage: 'অন্যের সময়সূচিকে সর্বোচ্চ সম্মান প্রদর্শনের ভাষা।' },
    ms: { meaning: 'Masa yang sesuai dan mudah untuk pihak anda', usage: 'Ungkapan hormat yang mengutamakan jadual penerima.' },
    ar: { meaning: 'الوقت الأنسب والأكثر ملاءمة لجدولكم', usage: 'تعبير تشريفي يضع مواعيد الطرف الآخر في المقام الأول.' },
    tl: { meaning: 'Oras na maginhawa at angkop para sa inyo', usage: 'Magalang na pagpapahalaga sa oras ng kausap.' },
  },
};

// ----------------------------------------------------------------------------
// 3. Final Certification Exam Multilingual Translations
// ----------------------------------------------------------------------------
export const EXAM_QUESTION_I18N: Record<string, Partial<Record<SupportedLanguage, { question: string; explanation: string }>>> = {
  'fe-k-1': {
    en: {
      question: 'Which sentence is appropriate to tell a colleague that the client company\'s president is currently going to the meeting room?',
      explanation: 'Because the client company president is an external VIP performing the action, the honorific (Sonkeigo) "いらっしゃる" must be used. "参る" and "伺う" are humble verbs reserved for the speaker\'s in-group.',
    },
    ja: {
      question: '取引先の社長が「今から会議室に行く」と話しているのを聞いた際、同僚にその行動を伝える言葉として正しいものはどれですか？',
      explanation: '社外の大切なお客様（社長）の動作を高めるため、尊敬語の最高表現である「いらっしゃる（いらっしゃいます）」を用います。「参る」や「伺う」は謙譲語のため相手の動作に使えません。',
    },
    my: {
      question: 'ဖောက်သည်ကုမ္ပဏီ ဥက္ကဋ္ဌသည် ယခု အစည်းအဝေးခန်းသို့ သွားနေကြောင်း လုပ်ဖော်ကိုင်ဖက်ထံ ပြောပြရာတွင် မည်သည့်ဝါကျက အမှန်ကန်ဆုံး ဖြစ်သနည်း။',
      explanation: 'ပြင်ပဖောက်သည် (ဥက္ကဋ္ဌ) ၏ လုပ်ဆောင်ချက်ဖြစ်သဖြင့် အမြင့်ဆုံး ရိုသေစကား Sonkeigo ဖြစ်သော "いらっしゃる" ကို သုံးရမည်။ "参る" နှင့် "伺う" သည် မိမိဘက်သားများအတွက် နှိမ့်ချသော စကားဖြစ်သည်။',
    },
    th: {
      question: 'เมื่อต้องการบอกเพื่อนร่วมงานว่าประธานของบริษัทลูกค้ากำลังจะไปที่ห้องประชุม ควรใช้ประโยคใดจึงจะถูกต้องตามหลักมารยาท?',
      explanation: 'เนื่องจากเป็นการกระทำของประธานบริษัทลูกค้า (บุคคลภายนอกคนสำคัญ) จึงต้องใช้คำยกย่อง (Sonkeigo) คือ "いらっしゃる" ส่วน "参る" และ "伺う" เป็นคำถ่อมตนสำหรับฝ่ายตนเอง',
    },
    zh: {
      question: '听到客户公司的社长说“我现在去会议室”后，向本公司同事传达这一行动时，下列哪句日语表达最为恰当？',
      explanation: '客户社长是外部贵宾，提升其动作必须使用最高尊敬语「いらっしゃる」。「参る」和「伺う」属于谦让语，仅用于己方人员。',
    },
    ko: {
      question: '거래처 사장님이 "지금부터 회의실로 간다"고 하셨을 때, 동료에게 그 행동을 전달하는 올바른 경어 표현은 무엇입니까?',
      explanation: '사외 VIP 고객(사장)의 행동을 높여야 하므로 최고 존경어인 「いらっしゃる」를 사용해야 합니다. 「参る」나 「伺う」는 겸양어이므로 상대방의 행동에 쓸 수 없습니다.',
    },
    es: {
      question: '¿Qué frase es adecuada para informar a un colega que el presidente de la empresa cliente se dirige a la sala de reuniones?',
      explanation: 'Al ser una acción de un cliente externo de alto rango, debe emplearse el honorífico (Sonkeigo) "いらっしゃる". "参る" y "伺う" son verbos humildes reservados para el grupo propio.',
    },
    fr: {
      question: 'Quelle phrase convient pour informer un collègue que le président de l\'entreprise cliente se rend en salle de réunion ?',
      explanation: 'Le président client étant un VIP externe, on utilise la forme honorifique (Sonkeigo) "いらっしゃる". "参る" et "伺う" sont réservés au groupe intérieur (humble).',
    },
    vi: {
      question: 'Khi muốn thông báo với đồng nghiệp rằng giám đốc công ty đối tác đang đi tới phòng họp, câu nào sau đây là chuẩn mực nhất?',
      explanation: 'Hành động của giám đốc đối tác cần tôn kính tối đa bằng Tôn kính ngữ (Sonkeigo) "いらっしゃる". "参る" và "伺う" là Khiêm nhường ngữ chỉ dùng cho bản thân/nội bộ.',
    },
    id: {
      question: 'Kalimat manakah yang tepat untuk memberi tahu rekan kerja bahwa presiden perusahaan klien sedang menuju ke ruang rapat?',
      explanation: 'Karena presiden klien adalah pihak luar, harus menggunakan bentuk Sonkeigo "いらっしゃる". "参る" dan "伺う" adalah Kenjougo untuk pihak sendiri.',
    },
    tr: {
      question: 'Müşteri şirketin başkanının toplantı odasına gittiğini bir iş arkadaşına aktarırken hangi ifade uygundur?',
      explanation: 'Müşteri şirket başkanı harici bir VIP olduğu için saygı ifadesi (Sonkeigo) olan "いらっしゃる" kullanılmalıdır. "参る" ve "伺う" mütevazı fiillerdir.',
    },
    de: {
      question: 'Welcher Satz ist angemessen, um einem Kollegen mitzuteilen, dass der Präsident des Kundenunternehmens zum Besprechungsraum geht?',
      explanation: 'Da es sich um die Handlung eines externen VIPs handelt, muss die Höflichkeitsform (Sonkeigo) "いらっしゃる" gewählt werden. "参る" und "伺う" sind bescheidene Verben.',
    },
    pt: {
      question: 'Qual frase é adequada para informar a um colega que o presidente da empresa cliente está se dirigindo à sala de reuniões?',
      explanation: 'Para a ação do presidente cliente (VIP externo), deve-se usar o honorífico (Sonkeigo) "いらっしゃる". "参る" e "伺う" são verbos humildes para o próprio grupo.',
    },
    nl: {
      question: 'Welke zin is juist om aan een collega door te geven dat de directeur van de klant naar de vergaderruimte loopt?',
      explanation: 'Omdat het om een externe VIP gaat, moet de respectvolle vorm (Sonkeigo) "いらっしゃる" worden gebruikt. "参る" en "伺う" zijn bescheiden vormen.',
    },
    hi: {
      question: 'सहकर्मी को यह बताने के लिए कौन सा वाक्य उपयुक्त है कि ग्राहक कंपनी के अध्यक्ष मीटिंग रूम की ओर जा रहे हैं?',
      explanation: 'ग्राहक कंपनी के अध्यक्ष बाहरी सम्मानित व्यक्ति हैं, इसलिए आदरसूचक (सोनकेइगो) "いらっしゃる" का प्रयोग किया जाता है। "参る" और "伺う" विनम्र क्रियाएँ हैं।',
    },
    bn: {
      question: 'গ্রাহক কোম্পানির প্রেসিডেন্ট মিটিং রুমে যাচ্ছেন—সহকর্মীকে এ কথা জানাতে কোন বাক্যটি সবচেয়ে উপযুক্ত?',
      explanation: 'গ্রাহক কোম্পানির প্রেসিডেন্ট বহিরাগত ভিআইপি হওয়ায় সম্মানসূচক (Sonkeigo) "いらっしゃる" ব্যবহার করতে হবে। "参る" ও "伺う" হলো বিনম্র ক্রিয়া।',
    },
    ms: {
      question: 'Ayat manakah yang paling sesuai untuk memaklumkan kepada rakan sekerja bahawa presiden syarikat pelanggan sedang menuju ke bilik mesyuarat?',
      explanation: 'Kerana presiden pelanggan ialah VIP luar, ungkapan hormat (Sonkeigo) "いらっしゃる" mesti digunakan. "参る" dan "伺う" adalah kata kerja rendah diri.',
    },
    ar: {
      question: 'أي جملة هي الأنسب لإخبار زميلك في العمل بأن رئيس الشركة العميلة يتجه حالياً إلى غرفة الاجتماعات؟',
      explanation: 'نظراً لأن رئيس الشركة العميلة شخصية هامة خارجية، يجب استخدام صيغة التعظيم والتشريف (Sonkeigo) "いらっしゃる". أما "参る" و"伺う" فهما للمتكلم وجماعته.',
    },
    tl: {
      question: 'Aling pangungusap ang angkop upang sabihin sa kasamahan na ang presidente ng kumpanya ng kliyente ay papunta sa conference room?',
      explanation: 'Dahil ang presidente ng kliyente ay panlabas na VIP, dapat gamitin ang Sonkeigo na "いらっしゃる". Ang "参る" at "伺う" ay para lamang sa sariling grupo.',
    },
  },
  'fe-k-2': {
    en: {
      question: 'Which response is considered improper etiquette when receiving instructions from your direct manager (Section Chief)?',
      explanation: '"了解しました (Ryōkai shimashita)" implies granting permission from a position of authority and is inappropriate toward superiors. Use "かしこまりました" or "承知いたしました".',
    },
    ja: {
      question: '上司（課長）から指示を受けた際の返事として、ビジネスマナー上不適切なものはどれですか？',
      explanation: '「了解しました」は同僚や目下の者に対して使う言葉であり、上司や取引先に使うのは失礼にあたります。目上には「かしこまりました」や「承知いたしました」を使います。',
    },
    my: {
      question: 'မိမိ၏ တိုက်ရိုက်အထက်လူကြီး (ဌာနမှူး) ထံမှ ညွှန်ကြားချက်လက်ခံရာတွင် စီးပွားရေးလုပ်ငန်းသုံး ကျင့်ဝတ်အရ မသုံးသင့်သော စကားမှာ အဘယ်နည်း။',
      explanation: '"了解しました (လျောခိုင်ရှိမရှိတ)" သည် အဆင့်တူ သို့မဟုတ် အောက်လက်ငယ်သားများအတွက်သာ ဖြစ်ပြီး အထက်လူကြီးထံ မသုံးသင့်ပါ။ "かしこまりました" သို့မဟုတ် "承知いたしました" ကို သုံးရမည်။',
    },
    th: {
      question: 'เมื่อได้รับคำสั่งจากหัวหน้าโดยตรง ข้อใดถือเป็นคำตอบรับที่ไม่เหมาะสมตามมารยาทธุรกิจญี่ปุ่น?',
      explanation: '"了解しました (เรียวไคชิมาชิตะ)" แฝงนัยการอนุญาตจากผู้มีอำนาจ จึงไม่สุภาพต่อหัวหน้า ควรใช้ "かしこまりました" หรือ "承知いたしました"',
    },
    zh: {
      question: '接受直接上司（课长）的工作指示时，在商务礼仪上被视为失礼的回答是哪一项？',
      explanation: '「了解しました」带有上级批准下级的语感，对领导使用十分失礼。对上司或客户应使用「かしこまりました」或「承知いたしました」。',
    },
    ko: {
      question: '직속 상사(과장)로부터 업무 지시를 받았을 때의 대답으로, 비즈니스 매너상 부적절한 것은 무엇입니까?',
      explanation: '「了解しました(료카이시마시타)」는 동료나 부하 직원에게 쓰는 표현이며 상사에게는 결례입니다. 상사에게는 「かしこまりました」나 「承知いたしました」를 씁니다.',
    },
    es: {
      question: '¿Qué respuesta se considera de mala educación al recibir instrucciones de su jefe directo?',
      explanation: '"了解しました" denota aprobación desde una posición superior y no debe usarse hacia jefes. Debe usarse "かしこまりました" o "承知いたしました".',
    },
    fr: {
      question: 'Quelle réponse est considérée comme inappropriée lors de la réception d\'instructions de votre supérieur direct ?',
      explanation: '"了解しました" implique une validation venant d\'un supérieur et est impoli envers sa hiérarchie. Utilisez "かしこまりました" ou "承知いたしました".',
    },
    vi: {
      question: 'Khi nhận chỉ thị từ cấp trên trực tiếp (trưởng nhóm), câu trả lời nào sau đây bị coi là thất lễ trong quy tắc ứng xử thương mại?',
      explanation: '"了解しました" mang sắc thái cho phép của người bề trên, không được dùng với cấp trên. Cần dùng "かしこまりました" hoặc "承知いたしました".',
    },
    id: {
      question: 'Tanggapan manakah yang dianggap tidak sopan saat menerima instruksi dari atasan langsung Anda?',
      explanation: '"了解しました" memberi kesan memberi izin dari posisi atasan, tidak boleh kepada atasan. Gunakan "かしこまりました" atau "承知いたしました".',
    },
    tr: {
      question: 'Doğrudan amirinizden talimat alırken iş görgüsü açısından hangisi uygunsuz bir yanıttır?',
      explanation: '"了解しました" yetkili konumdan onay verme iması taşır, üstlere karşı kabadır. Bunun yerine "かしこまりました" veya "承知いたしました" kullanılmalıdır.',
    },
    de: {
      question: 'Welche Antwort gilt als unhöflich, wenn Sie Anweisungen von Ihrem direkten Vorgesetzten erhalten?',
      explanation: '"了解しました" impliziert die Genehmigung aus übergeordneter Position. Gegenüber Vorgesetzten verwendet man "かしこまりました" oder "承知いたしました".',
    },
    pt: {
      question: 'Qual resposta é considerada inadequada ao receber instruções do seu chefe direto?',
      explanation: '"了解しました" soa como condescendência de quem tem autoridade e é desrespeitoso com superiores. Use "かしこまりました" ou "承知いたしました".',
    },
    nl: {
      question: 'Welk antwoord wordt als ongepast beschouwd bij het aannemen van instructies van uw direct leidinggevende?',
      explanation: '"了解しました" impliceert toestemming geven en is ongepast tegenover meerderen. Gebruik "かしこまりました" of "承知いたしました".',
    },
    hi: {
      question: 'अपने प्रत्यक्ष प्रबंधक से निर्देश प्राप्त करते समय कौन सा उत्तर अनुचित शिष्टाचार माना जाता है?',
      explanation: '"了解しました" अधिकार की स्थिति से सहमति का संकेत देता है और वरिष्ठों के लिए अनुचित है। "かしこまりました" का उपयोग करें।',
    },
    bn: {
      question: 'নিজের সরাসরি বসের কাছ থেকে নির্দেশ নেওয়ার সময় কোন জবাবটি শিষ্টাচারবহির্ভূত বলে গণ্য হয়?',
      explanation: '"了解しました" সাধারণত সমকক্ষ বা অধস্তনদের ক্ষেত্রে ব্যবহৃত হয়। বসের ক্ষেত্রে "かしこまりました" ব্যবহার করতে হবে।',
    },
    ms: {
      question: 'Jawapan manakah yang dianggap tidak bersopan apabila menerima arahan daripada pengurus langsung anda?',
      explanation: '"了解しました" membawa nada memberi izin daripada kedudukan atasan. Kepada ketua, gunakan "かしこまりました" atau "承知いたしました".',
    },
    ar: {
      question: 'أي رد يعتبر غير لائق في آداب العمل عند تلقي تعليمات من مديرك المباشر في العمل؟',
      explanation: '"了解しました" توحي بالموافقة من منطلق سلطة أعلى وتعد غير لائقة أمام الرؤساء. يجب قول "かしこまりました" أو "承知いたしました".',
    },
    tl: {
      question: 'Aling sagot ang itinuturing na hindi angkop sa etiketa kapag tumatanggap ng tagubilin mula sa inyong agarang pinuno?',
      explanation: 'Ang "了解しました" ay nagpapahiwatig ng pahintulot mula sa mas mataas na posisyon. Sa nakatataas, gamitin ang "かしこまりました" o "承知いたしました".',
    },
  },
  'fe-v-2': {
    en: {
      question: 'What is the Japanese business practice of informally sounding out stakeholders and building consensus before a formal meeting?',
      explanation: '"根回し (Nemawashi)" is the practice of laying quiet groundwork and building consensus among stakeholders prior to formal decision-making meetings.',
    },
    ja: {
      question: 'プロジェクトの進捗において、事前に重要人物や関係部署と非公式に合意形成を図る日本の商習慣を何と呼びますか？',
      explanation: '会議の前に非公式に関係者の意見を聞き、根回しをしておくことで、本番の意思決定を円滑に進める日本独特の商習慣です。',
    },
    my: {
      question: 'တရားဝင် အစည်းအဝေးမတိုင်မီ သက်ဆိုင်သူများနှင့် ကြိုတင်အလွတ်သဘော ညှိနှိုင်းသဘောတူညီမှု ရယူသည့် ဂျပန်လုပ်ငန်းခွင်ဓလေ့ကို မည်သို့ခေါ်သနည်း။',
      explanation: '"根回し (နေမဝါရှီ)" သည် ဆုံးဖြတ်ချက်များ အဆင်ပြေချောမွေ့စေရန် ကြိုတင်ပြင်ဆင် ညှိနှိုင်းမှုပြုလုပ်သည့် ဂျပန်ထူးခြားသော ဓလေ့တစ်ခုဖြစ်သည်။',
    },
    th: {
      question: 'ธรรมเนียมธุรกิจญี่ปุ่นในการพูดคุยอย่างไม่เป็นทางการล่วงหน้าเพื่อสร้างฉันทามติก่อนการประชุมจริงเรียกว่าอะไร?',
      explanation: '"根回し (เนะมะวะชิ)" คือการปูทางและประสานงานล่วงหน้าเพื่อให้การตัดสินใจในที่ประชุมจริงดำเนินไปได้อย่างราบรื่น',
    },
    zh: {
      question: '在项目推进过程中，于正式会议前与关键人物或相关部门进行非正式沟通以达成共识的日本商习惯称作什么？',
      explanation: '「根回し（Nemawashi，事前提调/打招呼）」是开会前私下征求各方意见并统一立场的独特日本商习惯。',
    },
    ko: {
      question: '공식 회의 전에 중요한 인물이나 유관 부서와 비공식적으로 사전 교감하여 합의를 형성하는 일본의 비즈니스 관행을 무엇이라고 합니까?',
      explanation: '「根回し (네마와시)」는 본 회의에서의 원활한 의사결정을 위해 사전에 의견을 조율해 두는 일본 특유의 관행입니다.',
    },
    es: {
      question: '¿Cómo se llama la práctica empresarial japonesa de sondear informalmente a los interesados y crear consenso antes de una reunión oficial?',
      explanation: '"根回し (Nemawashi)" es la práctica de preparar el terreno y lograr consenso informal antes de las reuniones formales.',
    },
    fr: {
      question: 'Comment appelle-t-on la pratique consistant à consulter informellement les parties prenantes avant une réunion officielle en entreprise japonaise ?',
      explanation: '"根回し (Nemawashi)" est l\'art de préparer le terrain et de forger le consensus avant les réunions décisives.',
    },
    vi: {
      question: 'Tập quán kinh doanh của Nhật Bản về việc trao đổi không chính thức trước cuộc họp để đạt được sự đồng thuận gọi là gì?',
      explanation: '"根回し (Nemawashi)" là việc vận động hành lang, trao đổi ngầm trước để cuộc họp chính thức diễn ra suôn sẻ.',
    },
    id: {
      question: 'Apakah nama kebiasaan bisnis Jepang dalam membangun konsensus secara informal sebelum rapat resmi?',
      explanation: '"根回し (Nemawashi)" adalah praktik melobi dan membangun kesepakatan informal sebelum rapat pengambil keputusan.',
    },
    tr: {
      question: 'Resmi bir toplantıdan önce paydaşlarla gayriresmi mutabakat sağlama uygulamasına Japon iş kültüründe ne ad verilir?',
      explanation: '"根回し (Nemawashi)", karar alma toplantılarından önce zemin hazırlama ve uzlaşı inşa etme sanatıdır.',
    },
    de: {
      question: 'Wie heißt die japanische Geschäftspraxis, im Vorfeld einer offiziellen Besprechung informell Konsens herzustellen?',
      explanation: '"根回し (Nemawashi)" bezeichnet die informelle Vorabstimmung mit Beteiligten zur reibungslosen Beschlussfassung.',
    },
    pt: {
      question: 'Qual é o nome da prática empresarial japonesa de consultar informalmente as partes interessadas para construir consenso antes de uma reunião formal?',
      explanation: '"根回し (Nemawashi)" é o hábito de preparar o terreno e harmonizar opiniões antes da tomada de decisão oficial.',
    },
    nl: {
      question: 'Hoe heet de Japanse gewoonte om voorafgaand aan een officiële vergadering informeel consensus op te bouwen?',
      explanation: '"根回し (Nemawashi)" is het informeel voorbereiden van besluitvorming door vooraf afstemming te zoeken.',
    },
    hi: {
      question: 'औपचारिक बैठक से पहले हितधारकों से अनौपचारिक रूप से सहमति बनाने की जापानी व्यापारिक प्रथा को क्या कहा जाता है?',
      explanation: '"根回し (नेमावाशी)" औपचारिक बैठकों से पहले अनौपचारिक रूप से सहमति तैयार करने की जापानी प्रथा है।',
    },
    bn: {
      question: 'আনুষ্ঠানিক মিটিংয়ের আগে স্টেকহোল্ডারদের সাথে অনানুষ্ঠানিকভাবে মতৈক্য তৈরি করার জাপানি ব্যবসায়িক রীতিকে কী বলা হয়?',
      explanation: '"根回し (নেমাওয়াশি)" হলো আনুষ্ঠানিক সিদ্ধান্তের আগে শান্তভাবে অভ্যন্তরীণ সম্মতি গড়ে তোলার পদ্ধতি।',
    },
    ms: {
      question: 'Apakah amalan perniagaan Jepun yang mendapatkan persetujuan secara tidak rasmi sebelum mesyuarat rasmi?',
      explanation: '"根回し (Nemawashi)" ialah tindakan merundingkan persetujuan awal sebelum mesyuarat pembuat keputusan.',
    },
    ar: {
      question: 'ما هو المسمى الذي يطلق على ممارسة بناء التوافق بشكل غير رسمي مع الأطراف المعنية قبل الاجتماع الرسمي في اليابان؟',
      explanation: '"根回し (نيماواشي)" هي عادة التمهيد الهادئ والتوافق المسبق بين المسؤولين قبل اتخاذ القرار في الاجتماع الرسمي.',
    },
    tl: {
      question: 'Ano ang tawag sa gawi sa negosyong Hapones ng pagbuo ng impormal na kasunduan bago ang pormal na pagpupulong?',
      explanation: 'Ang "根回し (Nemawashi)" ay ang lihim o impormal na paghahanda at pakikipag-ugnayan upang maging maayos ang pinal na desisyon.',
    },
  },
};

// ----------------------------------------------------------------------------
// 4. Business Vocabulary Multilingual Dictionary
// ----------------------------------------------------------------------------
export const BUSINESS_VOCAB_I18N: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  '役職': {
    en: 'official job title / managerial post',
    ja: '役職（やくしょく）',
    my: 'ရာထူး / တာဝန်အဆင့်',
    th: 'ตำแหน่งหน้าที่ / ตำแหน่งบริหาร',
    zh: '职务 / 官职 / 管理岗位',
    ko: '직책 / 관리직 직함',
    es: 'cargo oficial / puesto directivo',
    fr: 'poste / fonction de direction',
    vi: 'chức vụ / vị trí quản lý',
    id: 'jabatan resmi / posisi manajerial',
    tr: 'resmi unvan / yöneticilik görevi',
    de: 'Dienststellung / Leitungsposition',
    pt: 'cargo oficial / função de gestão',
    nl: 'officiële functie / leidinggevende post',
    hi: 'आधिकारिक पद / प्रबंधकीय पद',
    bn: 'দাপ্তরিক পদবী / ব্যবস্থাপনা পদ',
    ms: 'jawatan rasmi / pos pengurusan',
    ar: 'المنصب الإداري / الرتبة الوظيفية',
    tl: 'opisyal na posisyon / tungkuling pampamahalaan',
  },
  '部署': {
    en: 'department / division',
    ja: '部署（ぶしょ）',
    my: 'ဌာနခွဲ / အဖွဲ့အစည်းကဏ္ဍ',
    th: 'แผนก / ฝ่ายงาน',
    zh: '部门 / 科室',
    ko: '부서 / 부서 부문',
    es: 'departamento / división',
    fr: 'département / service',
    vi: 'phòng ban / bộ phận',
    id: 'departemen / divisi',
    tr: 'departman / bölüm',
    de: 'Abteilung / Geschäftsbereich',
    pt: 'departamento / setor',
    nl: 'afdeling / divisie',
    hi: 'विभाग / प्रभाग',
    bn: 'বিভাগ / শাখা',
    ms: 'jabatan / bahagian',
    ar: 'القسم / الإدارة',
    tl: 'kagawaran / dibisyon',
  },
  '直属': {
    en: 'direct / immediate (supervisor/subordinate)',
    ja: '直属（ちょくぞく）',
    my: 'တိုက်ရိုက်ကွပ်ကဲသော (အထက်လူကြီး/လက်အောက်ငယ်သား)',
    th: 'โดยตรง (หัวหน้าสายตรง/ลูกน้องสายตรง)',
    zh: '直属（主管/下属）',
    ko: '직속 (상사/부하)',
    es: 'directo / inmediato (superior/subordinado)',
    fr: 'direct / immédiat (supérieur/subordonné)',
    vi: 'trực thuộc / trực tiếp (cấp trên/cấp dưới)',
    id: 'langsung (atasan/bawahan langsung)',
    tr: 'doğrudan / bağlı (amir/ast)',
    de: 'direkt (unterstellt / Vorgesetzter)',
    pt: 'direto / imediato (superior/subordinado)',
    nl: 'direct / onmiddellijk (leidinggevende/ondergeschikte)',
    hi: 'प्रत्यक्ष (अधिकारी/अधीनस्थ)',
    bn: 'সরাসরি (উর্ধ্বতন/অধস্তন)',
    ms: 'langsung (penyelia/pekerja bawahan terus)',
    ar: 'المباشر (الرئيس/المرؤوس المباشر)',
    tl: 'agarang (namumuno/nasasakupan)',
  },
  '同僚': {
    en: 'colleague / co-worker (same rank)',
    ja: '同僚（どうりょう）',
    my: 'လုပ်ဖော်ကိုင်ဖက် (အဆင့်တူ)',
    th: 'เพื่อนร่วมงาน (ระดับเดียวกัน)',
    zh: '同事 / 同僚',
    ko: '동료 (동급 직급)',
    es: 'colega / compañero de trabajo',
    fr: 'collègue de travail',
    vi: 'đồng nghiệp (cùng cấp)',
    id: 'rekan kerja (setara)',
    tr: 'meslektaş / iş arkadaşı',
    de: 'Kollege / Arbeitskollege',
    pt: 'colega de trabalho',
    nl: 'collega (van gelijke rang)',
    hi: 'सहकर्मी (समान पद)',
    bn: 'সহকর্মী (সমপর্যায়ের)',
    ms: 'rakan sekerja (peringkat sama)',
    ar: 'زميل العمل',
    tl: 'kasamahan sa trabaho',
  },
  '根回し': {
    en: 'behind-the-scenes consensus building',
    ja: '根回し（ねまわし）',
    my: 'ကြိုတင်ညှိနှိုင်း သဘောတူညီမှုရယူခြင်း',
    th: 'การสร้างฉันทามติล่วงหน้าอย่างไม่เป็นทางการ',
    zh: '事前协商 / 预先沟通达成共识',
    ko: '사전 정지 작업 / 물밑 조율',
    es: 'búsqueda previa de consenso informal',
    fr: 'recherche préalable de consensus',
    vi: 'thương lượng ngầm / tạo đồng thuận trước',
    id: 'lobi awal untuk konsensus',
    tr: 'önceden uzlaşı sağlama / zemin hazırlama',
    de: 'informelle Vorabstimmung / Konsensbildung',
    pt: 'busca prévia de consenso informal',
    nl: 'informele voorbereiding van consensus',
    hi: 'अनौपचारिक रूप से पूर्व सहमति बनाना',
    bn: 'অনানুষ্ঠানিক প্রাথমিক মতৈক্য গড়ে তোলা',
    ms: 'pembinaan konsensus di sebalik tabir',
    ar: 'التمهيد المسبق وبناء التوافق في الكواليس',
    tl: 'pagbuo ng impormal na kasunduan bago ang pulong',
  },
  '報連相': {
    en: 'Hou-Ren-Sou (Report, Communicate, Consult)',
    ja: '報連相（ほうれんそう）',
    my: 'ဟိုးရန်းဆို (သတင်းပို့ခြင်း၊ ဆက်သွယ်ခြင်း၊ တိုင်ပင်ခြင်း)',
    th: 'การรายงาน การติดต่อประสานงาน และการปรึกษาหารือ',
    zh: '报联相（汇报、联络、商量）',
    ko: '호렌소 (보고·연락·상담)',
    es: 'Hou-Ren-Sou (Informar, Comunicar, Consultar)',
    fr: 'Hou-Ren-Sou (Rapporter, Communiquer, Consulter)',
    vi: 'Hou-Ren-Sou (Báo cáo, Liên lạc, Thảo luận)',
    id: 'Hou-Ren-Sou (Lapor, Komunikasi, Konsultasi)',
    tr: 'Hou-Ren-Sou (Rapor Et, İletişim Kur, Danış)',
    de: 'Hou-Ren-Sou (Berichten, Informieren, Beraten)',
    pt: 'Hou-Ren-Sou (Reportar, Comunicar, Consultar)',
    nl: 'Hou-Ren-Sou (Rapporteren, Communiceren, Overleggen)',
    hi: 'हो-रेन-सो (रिपोर्ट, संपर्क, परामर्श)',
    bn: 'হো-রেন-সো (প্রতিবেদন, যোগাযোগ, পরামর্শ)',
    ms: 'Hou-Ren-Sou (Lapor, Hubungi, Rujuk)',
    ar: 'هو-رين-سو (التقرير، التواصل، الاستشارة)',
    tl: 'Hou-Ren-Sou (Mag-ulat, Makipag-ugnayan, Sumangguni)',
  },
  '弊社': {
    en: 'our company (humble term used to clients)',
    ja: '弊社（へいしゃ）',
    my: 'ကျွန်ုပ်တို့ကုမ္ပဏီ (နှိမ့်ချသုံးစကား)',
    th: 'บริษัทของพวกเรา (คำถ่อมตนที่ใช้กับลูกค้า)',
    zh: '敝公司 / 我司（对客户的谦称）',
    ko: '저희 회사 / 당사 (고객에게 쓰는 겸양어)',
    es: 'nuestra empresa (término humilde ante clientes)',
    fr: 'notre société (terme humble face aux clients)',
    vi: 'công ty chúng tôi (khiêm từ dùng với khách hàng)',
    id: 'perusahaan kami (bentuk rendah hati ke klien)',
    tr: 'şirketimiz (müşterilere karşı mütevazı terim)',
    de: 'unsere Firma (bescheidener Begriff für Kunden)',
    pt: 'nossa empresa (termo humilde para clientes)',
    nl: 'ons bedrijf (bescheiden term voor klanten)',
    hi: 'हमारी कंपनी (ग्राहकों के समक्ष विनम्र शब्द)',
    bn: 'আমাদের কোম্পানি (গ্রাহকদের সাথে বিনম্র শব্দ)',
    ms: 'syarikat kami (istilah rendah diri kepada pelanggan)',
    ar: 'شركتنا (صيغة متواضعة تستخدم أمام العملاء)',
    tl: 'aming kumpanya (mapagkumbabang tawag sa harap ng kliyente)',
  },
  '御社': {
    en: 'your company (spoken honorific term for client)',
    ja: '御社（おんしゃ）',
    my: 'လူကြီးမင်းတို့၏ ကုမ္ပဏီ (စကားပြောသုံး ရိုသေစကား)',
    th: 'บริษัทของท่าน (คำยกย่องในภาษาพูดสำหรับลูกค้า)',
    zh: '贵司 / 贵公司（口语尊称）',
    ko: '귀사 (구어체 존칭)',
    es: 'su estimada empresa (término honorífico oral)',
    fr: 'votre entreprise (forme honorifique orale)',
    vi: 'quý công ty (khẩu ngữ tôn kính đối tác)',
    id: 'perusahaan Anda (istilah lisan yang terhormat)',
    tr: 'şirketiniz (müşteri için saygı terimi)',
    de: 'Ihr geschätztes Unternehmen (mündliche Höflichkeitsform)',
    pt: 'sua estimada empresa (termo honorífico falado)',
    nl: 'uw geachte bedrijf (mondelinge beleefdheidsvorm)',
    hi: 'आपकी कंपनी (सम्मानजनक मौखिक शब्द)',
    bn: 'আপনার কোম্পানি (কথ্য সম্মানজনক ভাষা)',
    ms: 'syarikat pihak tuan (istilah hormat lisan)',
    ar: 'شركتكم الموقرة (صيغة تشريفية شفهية للعميل)',
    tl: 'inyong kagalang-galang na kumpanya (magalang na salita)',
  },
};

// ----------------------------------------------------------------------------
// 5. Generic Localized Retrieval Helpers
// ----------------------------------------------------------------------------
export function getLocalizedScenarioLine(lineId: string, lang: SupportedLanguage, defaultText: string): string {
  if (lang === 'en') return defaultText;
  const match = SCENARIO_LINE_I18N[lineId];
  if (match && match[lang]) return match[lang]!;
  return defaultText;
}

export function getLocalizedEmailKeyphrase(
  phrase: string,
  lang: SupportedLanguage,
  defaultMeaning: string,
  defaultUsage: string
) {
  if (lang === 'en') return { meaning: defaultMeaning, usage: defaultUsage };
  const match = EMAIL_KEYPHRASE_I18N[phrase];
  if (match && match[lang]) return match[lang]!;
  return { meaning: defaultMeaning, usage: defaultUsage };
}

export function getLocalizedExamQuestion(
  q: BusinessQuizQuestion,
  lang: SupportedLanguage
): { questionText: string; explanationText: string } {
  const match = EXAM_QUESTION_I18N[q.id];
  if (match && match[lang]) {
    return {
      questionText: match[lang]!.question,
      explanationText: match[lang]!.explanation,
    };
  }
  return {
    questionText: lang === 'ja' ? q.questionJp : q.questionEn,
    explanationText: lang === 'ja' ? q.explanationJp : q.explanationEn,
  };
}

export function getLocalizedBusinessVocabMeaning(
  word: string,
  defaultMeaning: string,
  lang: SupportedLanguage
): string {
  if (lang === 'en') return defaultMeaning;
  const match = BUSINESS_VOCAB_I18N[word];
  if (match && match[lang]) return match[lang]!;
  return defaultMeaning;
}

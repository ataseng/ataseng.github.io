import React, { useMemo } from 'react'
import "./DailyAyah.css";
import ayah_corner from "../../assets/images/ayah_corner.svg";

const AYAH_LIST = [
    {
        key: "94:5",
        surah: "İnşirah (94)",
        textAr: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
        textTr: "Şüphesiz güçlükle beraber bir kolaylık vardır.",
    },
    {
        key: "3:200",
        surah: "Âl-i İmran (3)",
        textAr: "يَٓا اَيُّهَا الَّذ۪ينَ اٰمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللّٰهَ لَعَلَّكُمْ تُفْلِحُونَ",
        textTr: "Ey İman Edenler! Sabredin ve zorluklara karşı dirençli olun. Sürekli duyarlı olun. Allah'a karşı takva sahibi olun. Umulur ki kurtuluşa erenlerden olursunuz.",
    },
    {
        key: "94:6",
        surah: "İnşirah (94)",
        textAr: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        textTr: "Gerçekten, güçlükle beraber bir kolaylık daha vardır.",
    },
    {
        key: "112:1-2",
        surah: "İhlâs (112)",
        textAr: "قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ",
        textTr: "De ki: O, Allah birdir. Allah Samed'dir (her şey O'na muhtaç, O hiçbir şeye muhtaç değildir).",
    },
    {
        key: "40:51",
        surah: "Mü'min (40)",
        textAr: "اِنَّا لَنَنْصُرُ رُسُلَنَا وَالَّذ۪ينَ اٰمَنُوا فِي الْحَيٰوةِ الدُّنْيَا وَيَوْمَ يَقُومُ الْاَشْهَادُۙ",
        textTr: "Biz, Resullerimize ve iman edenlere dünya hayatında ve tanıkların tanıklık edecekleri günde kesinlikle yardım ederiz.",
    },
    {
        key: "19:96",
        surah: "Meryem (19)",
        textAr: "اِنَّ الَّذ۪ينَ اٰمَنُوا وَعَمِلُوا الصَّالِحَاتِ سَيَجْعَلُ لَهُمُ الرَّحْمٰنُ وُداًّ",
        textTr: "İman edip de iyi davranışlarda bulunanlara gelince, onlar için çok merhametli olan Allah, (gönüllerde) bir sevgi yaratacaktır.",
    },
    {
        key: "112:3-4",
        surah: "İhlâs (112)",
        textAr: "لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        textTr: "Doğurmamış ve doğurulmamıştır. O'nun hiçbir dengi yoktur.",
    },
    {
        key: "17:9",
        surah: "İsra (17)",
        textAr: "اِنَّ هٰذَا الْقُرْاٰنَ يَهْد۪ي لِلَّت۪ي هِيَ اَقْوَمُ وَيُبَشِّرُ الْمُؤْمِن۪ينَ الَّذ۪ينَ يَعْمَلُونَ الصَّالِحَاتِ اَنَّ لَهُمْ اَجْراً كَب۪يراًۙ",
        textTr: "Şüphesiz ki bu Kur’an en doğru yola iletir; iyi davranışlarda bulunan müminlere, kendileri için büyük bir mükâfat olduğunu müjdeler.",
    },
    {
        key: "9:129",
        surah: "Tevbe (9)",
        textAr: "فَاِنْ تَوَلَّوْا فَقُلْ حَسْبِيَ اللّٰهُۘ لَٓا اِلٰهَ اِلَّا هُوَۜ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظ۪يمِ",
        textTr: "Eğer yüz çevirirlerse de ki: 'Allah bana yeter. O'ndan başka ilah yoktur. Ben O'na tevekkül ettim. O, Büyük Arş'ın Rabb'idir.'",
    },
    {
        key: "6:17",
        surah: "En'am (6)",
        textAr: "وَاِنْ يَمْسَسْكَ اللّٰهُ بِضُرٍّ فَلَا كَاشِفَ لَهُٓ اِلَّا هُوَۜ وَاِنْ يَمْسَسْكَ بِخَيْرٍ فَهُوَ عَلٰى كُلِّ شَيْءٍ قَد۪يرٌ",
        textTr: "Eğer Allah, sana bir sıkıntı verirse onu Kendi'sinden başka giderecek yoktur. Ve eğer sana bir iyilik verirse kuşkusuz Her Şeye Kadir Olan O'dur.",
    },
    
];


// Europe/Istanbul için gün numarası (1–366) hesaplayıcı
function dayOfYearInTZ(tz) {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(now);


    const y = Number(parts.find((p) => p.type === "year")?.value);
    const m = Number(parts.find((p) => p.type === "month")?.value);
    const d = Number(parts.find((p) => p.type === "day")?.value);

    // Yerel (İstanbul) gün başlangıcıyla bir Date üretip yılın kaçıncı günü olduğuna bakıyoruz
    const localDate = new Date(Date.UTC(y, m - 1, d));
    const startOfYear = new Date(Date.UTC(y, 0, 1));
    const diff = Number(localDate) - Number(startOfYear);
    const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1; // 1..366
    return { year: y, day };
}


// Günlük deterministik seçim — yıl ve gün bazlı, listedeki eleman sayısına göre döner
function pickIndexForToday(listLen, tz = "Europe/Istanbul") {
    const { year, day } = dayOfYearInTZ(tz);
    const seed = year * 1000 + day; // kaba bir seed
    const idx = seed % listLen;
    return idx;
}

const DailyAyah = () => {

    const todayIndex = useMemo(() => pickIndexForToday(AYAH_LIST.length), []);
    const ayah = AYAH_LIST[1];

    return (
        <div className={"daily-ayah-card"}>
            <img className='corner top-right-corner' src={ayah_corner} alt="" />
            <img className='corner bottom-left-corner' src={ayah_corner} alt="" />
            <div>
                Günün Ayeti
            </div>

            <div>{ayah.surah} — {ayah.key}</div>

            <div>
                {ayah.textAr}
            </div>

            {ayah.textTr && (
                <div>{ayah.textTr}</div>
            )}
        </div>
    )
}

export default DailyAyah
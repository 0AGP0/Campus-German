// Kurs slug'ından seviye ve tip çıkarma helper fonksiyonları
import { coursePricing, getCoursePricing, getCourseDates } from '../data/coursePricing';

export type CourseLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1';
export type CourseType = 'intensive' | 'online' | 'seasonal' | 'exam' | 'corporate' | 'other';

export interface CoursePricingInfo {
  level: CourseLevel | null;
  type: CourseType;
  hasPricing: boolean;
}

/**
 * Kurs slug'ından seviye ve tip bilgisini çıkarır
 */
export function extractCourseInfo(slug: string): CoursePricingInfo {
  const slugLower = slug.toLowerCase();
  
  // Seviye kontrolü
  let level: CourseLevel | null = null;
  // Önce tam eşleşmeleri kontrol et (örn: haftalik-a1-a2, haftalik-b1-c1)
  if (slugLower.includes('a1-a2') || slugLower.includes('a1a2')) {
    level = 'a1'; // A1-A2 için A1 kategorisini kullan (haftalık fiyatlar için)
  } else if (slugLower.includes('b1-c1') || slugLower.includes('b1c1') || slugLower.includes('b1-b2-c1') || slugLower.includes('b1b2c1')) {
    level = 'b1'; // B1-B2-C1 için B1 kategorisini kullan (haftalık fiyatlar için)
  } else if (slugLower.includes('-a1') || slugLower.includes('a1-') || slugLower.endsWith('-a1')) {
    level = 'a1';
  } else if (slugLower.includes('-a2') || slugLower.includes('a2-') || slugLower.endsWith('-a2')) {
    level = 'a2';
  } else if (slugLower.includes('-b1') || slugLower.includes('b1-') || slugLower.endsWith('-b1')) {
    level = 'b1';
  } else if (slugLower.includes('-b2') || slugLower.includes('b2-') || slugLower.endsWith('-b2')) {
    level = 'b2';
  } else if (slugLower.includes('-c1') || slugLower.includes('c1-') || slugLower.endsWith('-c1')) {
    level = 'c1';
  }
  
  // Tip kontrolü
  let type: CourseType = 'other';
  let hasPricing = false;
  
  // Önce online kontrolü yap (çünkü online-yogun-a1 gibi slug'lar olabilir)
  // online- ile başlayan veya online- içeren ama yogun- ile başlamayan slug'lar online'dır
  // online-sinav-hazirlik için özel kontrol
  if (slugLower === 'online-sinav-hazirlik') {
    type = 'online';
    hasPricing = true; // Online sınav hazırlık için fiyat göster
  } else if (slugLower.startsWith('online-') || (slugLower.includes('online-') && !slugLower.startsWith('yogun-'))) {
    type = 'online';
    hasPricing = level !== null;
  } else if (slugLower === 'studienkolleg') {
    type = 'intensive';
    hasPricing = level !== null;
  } else if (slugLower.startsWith('yogun-') || slugLower.startsWith('intensiv-') || (slugLower.includes('yogun-') && !slugLower.includes('online-')) || (slugLower.includes('intensiv-') && !slugLower.includes('online-'))) {
    type = 'intensive';
    hasPricing = level !== null;
  } else if (
    slugLower.includes('haftalik-')
  ) {
    type = 'seasonal';
    hasPricing = level !== null; // Haftalık kurslar için seviye varsa fiyat göster
  } else if (
    slugLower.includes('yaz-okulu') ||
    slugLower.includes('aksam-') ||
    slugLower.includes('donemsel')
  ) {
    type = 'seasonal';
    hasPricing = false; // Diğer dönemsel kurslar için farklı fiyatlandırma olabilir
  } else if (
    slugLower.includes('goethe-') ||
    slugLower.includes('telc-') ||
    slugLower.includes('testdaf-') ||
    slugLower.includes('dsh-') ||
    (slugLower.includes('sinav-') && !slugLower.includes('online-'))
  ) {
    type = 'exam';
    hasPricing = level !== null || slugLower.includes('testdaf') || slugLower.includes('dsh');
  } else if (
    slugLower.includes('firma-') ||
    slugLower.includes('bildungszeit') ||
    slugLower.includes('daad-') ||
    slugLower.includes('erasmus-') ||
    slugLower.includes('meslek-') ||
    slugLower.includes('career-') ||
    slugLower.includes('tip-') ||
    slugLower.includes('fsp-') ||
    slugLower.includes('muhendislik-') ||
    slugLower.includes('ekonomi-')
  ) {
    type = 'corporate';
    hasPricing = false; // Kurumsal kurslar için özel fiyatlandırma
  }
  
  return { level, type, hasPricing };
}

/**
 * Kurs için fiyat bilgilerini getirir
 */
export function getCoursePricingData(lang: 'tr' | 'de' | 'en' | 'es', slug: string) {
  const info = extractCourseInfo(slug);
  const slugLower = slug.toLowerCase();
  
  // İspanyolca için Almanca verilerini kullan
  const pricingLang = lang === 'es' ? 'de' : lang;
  
  // online-sinav-hazirlik için level kontrolünü atla
  if (!info.hasPricing || (!info.level && slugLower !== 'online-sinav-hazirlik')) {
    return null;
  }
  
  if (info.type === 'intensive') {
    return {
      pricing: getCoursePricing(pricingLang, 'intensive', info.level),
      dates: getCourseDates(pricingLang, info.level),
      schedule: coursePricing[pricingLang].schedule,
      holidays: coursePricing[pricingLang].holidays,
      weeklyPricing: coursePricing[pricingLang].weeklyPricing,
      visaInfo: coursePricing[pricingLang].visaInfo,
      lessonInfo: coursePricing[pricingLang].lessonInfo,
      onlineNote: coursePricing[pricingLang].onlineNote,
    };
  } else if (info.type === 'online') {
    // Online sınav hazırlık kursu için özel fiyatlandırma
    let pricing = null;
    
    if (slugLower === 'online-sinav-hazirlik') {
      // Online Goethe/TELC sınav hazırlık için ortalama fiyat (tüm seviyeler için)
      // Kullanıcı seviye seçebilir, bu yüzden genel bir fiyat gösteriyoruz
      pricing = {
        fullCourse: "990€", // Ortalama fiyat (B1 seviyesi baz alınarak)
        lessons: "20+ 4 ders",
        duration: "8-12 hafta",
      };
    } else {
      pricing = getCoursePricing(pricingLang, 'online', info.level);
    }
    
    // Online sınav hazırlık için tüm seviyeler için tarihleri göster
    let dates = null;
    if (slugLower === 'online-sinav-hazirlik') {
      // Tüm seviyeler için tarihleri birleştir
      const allDates: string[] = [];
      const levels: CourseLevel[] = ['a1', 'a2', 'b1', 'b2', 'c1'];
      levels.forEach(level => {
        const levelDates = getCourseDates(pricingLang, level);
        if (levelDates) {
          Object.values(levelDates).flat().forEach(date => {
            if (!allDates.includes(date)) {
              allDates.push(date);
            }
          });
        }
      });
      // Tarihleri sırala ve grupla
      dates = {
        all: allDates.sort()
      };
    } else {
      dates = info.level ? getCourseDates(pricingLang, info.level) : null;
    }
    
    return {
      pricing: pricing,
      dates: dates,
      schedule: coursePricing[pricingLang].schedule,
      holidays: coursePricing[pricingLang].holidays,
      weeklyPricing: coursePricing[pricingLang].weeklyPricing,
      visaInfo: coursePricing[pricingLang].visaInfo,
      lessonInfo: coursePricing[pricingLang].lessonInfo,
      onlineNote: coursePricing[pricingLang].onlineNote,
      isExamPrep: slugLower === 'online-sinav-hazirlik', // Online sınav hazırlık olduğunu belirt
    };
  } else if (info.type === 'seasonal' && info.hasPricing && info.level) {
    // Haftalık kurslar için sadece haftalık fiyatları göster
    return {
      pricing: null, // Haftalık kurslar için tam kurs fiyatı yok
      dates: null, // Haftalık kurslar için sabit tarih yok
      schedule: coursePricing[pricingLang].schedule,
      holidays: coursePricing[pricingLang].holidays,
      weeklyPricing: coursePricing[pricingLang].weeklyPricing,
      visaInfo: coursePricing[pricingLang].visaInfo,
      lessonInfo: coursePricing[pricingLang].lessonInfo,
      onlineNote: coursePricing[pricingLang].onlineNote,
      isWeeklyOnly: true, // Sadece haftalık fiyatlar gösterilecek
    };
  } else if (info.type === 'exam' && info.hasPricing) {
    // Sınav hazırlık kursları için fiyat bilgileri
    const slugLower = slug.toLowerCase();
    let examPricing = null;
    
    // TestDaF/DSH kontrolü
    if (slugLower.includes('testdaf') || slugLower.includes('dsh')) {
      examPricing = {
        fullCourse: coursePricing[pricingLang].examPrep.testdafDsh.fullCourse,
        lessons: coursePricing[pricingLang].examPrep.testdafDsh.lessons,
        duration: coursePricing[pricingLang].examPrep.testdafDsh.duration,
      };
    } else if (slugLower.includes('goethe') || slugLower.includes('telc')) {
      // Goethe/TELC sınavları için seviye bazlı fiyat
      if (info.level && coursePricing[pricingLang].examPrep.goetheTelc[info.level]) {
        examPricing = {
          fullCourse: coursePricing[pricingLang].examPrep.goetheTelc[info.level].fullCourse,
          lessons: coursePricing[pricingLang].examPrep.goetheTelc[info.level].lessons,
          duration: coursePricing[pricingLang].examPrep.goetheTelc[info.level].duration,
        };
      }
    }
    
    // Eğer fiyat bilgisi bulunamadıysa null döndür
    if (!examPricing) {
      return null;
    }
    
    return {
      pricing: examPricing,
      dates: info.level ? getCourseDates(pricingLang, info.level) : null, // Sınav hazırlık kursları da normal tarihleri kullanabilir
      schedule: coursePricing[pricingLang].schedule,
      holidays: coursePricing[pricingLang].holidays,
      weeklyPricing: null, // Sınav hazırlık kursları için haftalık fiyat yok
      visaInfo: null, // Sınav hazırlık kursları için vize bilgisi yok
      lessonInfo: coursePricing[pricingLang].lessonInfo,
      onlineNote: null,
      isExamPrep: true, // Sınav hazırlık kursu olduğunu belirt
    };
  }
  
  return null;
}

/**
 * Kurs için haftalık fiyat kategorisini belirler (A1-A2 veya B1-B2-C1)
 */
export function getWeeklyPricingCategory(level: CourseLevel | null): 'a1a2' | 'b1b2c1' | null {
  if (!level) return null;
  
  if (level === 'a1' || level === 'a2') {
    return 'a1a2';
  } else if (level === 'b1' || level === 'b2' || level === 'c1') {
    return 'b1b2c1';
  }
  
  return null;
}

/** Verilen yılda, aynı ay içindeki en yakın Pazartesi gününü döndürür. ddmm "gg.aa" formatında. */
export function getNearestMondayDdmm(ddmm: string, year: number): string {
  if (!ddmm || !ddmm.includes('.')) return ddmm;
  const parts = ddmm.trim().split('.');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  if (isNaN(day) || isNaN(month) || month < 1 || month > 12) return ddmm;
  const date = new Date(year, month - 1, day);
  const weekday = date.getDay(); // 0 Pazar, 1 Pazartesi, ...
  if (weekday === 1) return ddmm;
  const lastDay = new Date(year, month, 0).getDate();
  const daysToPrevMonday = weekday === 0 ? 6 : weekday - 1;
  const daysToNextMonday = weekday === 0 ? 1 : 8 - weekday;
  const prevMonday = day - daysToPrevMonday;
  const nextMonday = day + daysToNextMonday;
  let mondayDay: number;
  if (prevMonday >= 1 && nextMonday <= lastDay) {
    mondayDay = day - prevMonday <= nextMonday - day ? prevMonday : nextMonday;
  } else if (prevMonday >= 1) {
    mondayDay = prevMonday;
  } else {
    mondayDay = nextMonday;
  }
  const d = String(mondayDay).padStart(2, '0');
  const m = String(month).padStart(2, '0');
  return `${d}.${m}`;
}

/** DD.MM formatındaki kurs tarihini "2 Mart" gibi dile göre metne çevirir */
const MONTH_NAMES: Record<string, Record<number, string>> = {
  tr: { 1: 'Ocak', 2: 'Şubat', 3: 'Mart', 4: 'Nisan', 5: 'Mayıs', 6: 'Haziran', 7: 'Temmuz', 8: 'Ağustos', 9: 'Eylül', 10: 'Ekim', 11: 'Kasım', 12: 'Aralık' },
  de: { 1: 'Januar', 2: 'Februar', 3: 'März', 4: 'April', 5: 'Mai', 6: 'Juni', 7: 'Juli', 8: 'August', 9: 'September', 10: 'Oktober', 11: 'November', 12: 'Dezember' },
  en: { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' },
  es: { 1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre' },
};export function formatCourseDate(ddmm: string, lang: 'tr' | 'de' | 'en' | 'es'): string {
  if (!ddmm || !ddmm.includes('.')) return ddmm;
  const parts = ddmm.trim().split('.');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  if (isNaN(day) || isNaN(month) || month < 1 || month > 12) return ddmm;
  const monthName = MONTH_NAMES[lang]?.[month] || MONTH_NAMES.en[month];
  if (lang === 'en') return `${monthName} ${day}`;
  if (lang === 'de') return `${day}. ${monthName}`;
  return `${day} ${monthName}`;
}

/** Verilen ayın ilk Pazartesi’si (ay: 1–12). */
export function getFirstMondayOfMonth(year: number, month: number): Date {
  const d = new Date(year, month - 1, 1);
  const day = d.getDay();
  const add = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  d.setDate(1 + add);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Bugünden itibaren önümüzdeki `monthsAhead` adet başlangıç tarihi
 * (her ayın ilk Pazartesi’si; geçmiş Pazartesiler atlanır, yıl sınırı yok).
 * value = "dd.mm.yyyy", iso = "yyyy-mm-dd", label dile göre.
 */
export function getFirstMondayStartDateOptions(
  lang: 'tr' | 'de' | 'en' | 'es',
  monthsAhead = 10,
): { value: string; label: string; iso: string }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();
  const out: { value: string; label: string; iso: string }[] = [];
  const limit = Math.max(1, Math.min(24, monthsAhead | 0));

  // Bu ayın ilk Pazartesi’si geçmiş olabilir → atlanır; yine de `limit` adet toplanır.
  for (let i = 0; out.length < limit && i < limit + 12; i += 1) {
    const cursor = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const year = cursor.getFullYear();
    const month = cursor.getMonth() + 1;
    const d = getFirstMondayOfMonth(year, month);
    if (d.getTime() < todayMs) continue;
    const day = d.getDate();
    const dd = String(day).padStart(2, '0');
    const mm = String(month).padStart(2, '0');
    const value = `${dd}.${mm}.${year}`;
    const iso = `${year}-${mm}-${dd}`;
    const monthName = MONTH_NAMES[lang]?.[month] || MONTH_NAMES.en[month];
    const label =
      lang === 'en'
        ? `${monthName} ${day}, ${year}`
        : lang === 'de'
          ? `${day}. ${monthName} ${year}`
          : `${day} ${monthName} ${year}`;
    out.push({ value, label, iso });
  }
  return out;
}

/** Tarihi Pazartesi’ye çeker (geçmişe / ileriye en yakını). */
export function snapToNearestMonday(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 Paz, 1 Pzt
  if (day === 1) return d;
  const toPrev = day === 0 ? 6 : day - 1;
  const toNext = day === 0 ? 1 : 8 - day;
  if (toNext < toPrev) d.setDate(d.getDate() + toNext);
  else d.setDate(d.getDate() - toPrev);
  return d;
}

/** Tarihi en yakın Cuma’ya çeker. */
export function snapToNearestFriday(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 5 = Cuma
  if (day === 5) return d;
  const toPrev = (day - 5 + 7) % 7;
  const toNext = (5 - day + 7) % 7;
  if (toNext === 0) return d;
  if (toNext <= toPrev) d.setDate(d.getDate() + toNext);
  else d.setDate(d.getDate() - toPrev);
  return d;
}

/**
 * Kurs süresi: ilk Pazartesi → son Cuma.
 * N hafta = N adet Pzt–Cum; bitiş = start + (N−1)×7 + 4 gün.
 * Sonuç Cuma değilse (veya N haftayı aşıyorsa) en yakın Cuma’ya çekilir.
 */
export function getCourseEndFriday(startMonday: Date, weeks: number): Date {
  const w = Math.max(1, Math.round(weeks) || 1);
  const start = snapToNearestMonday(startMonday);
  const ideal = new Date(start);
  ideal.setDate(ideal.getDate() + (w - 1) * 7 + 4);
  const end = snapToNearestFriday(ideal);
  // 8 haftayı aşmasın: start’tan (w*7) gün sonrası Cuma’dan ileriye gitmesin
  const maxEnd = new Date(start);
  maxEnd.setDate(maxEnd.getDate() + w * 7);
  if (end.getTime() > maxEnd.getTime()) {
    return snapToNearestFriday(maxEnd);
  }
  return end;
}

/** Bir kursun Cuma bitişinden sonraki kursun Pazartesi başlangıcı. */
export function getNextCourseMonday(endFriday: Date): Date {
  const d = new Date(endFriday);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const add = day === 5 ? 3 : day === 6 ? 2 : day === 0 ? 1 : (8 - day);
  d.setDate(d.getDate() + add);
  return snapToNearestMonday(d);
}

export function formatCourseDayMonth(date: Date, lang: 'tr' | 'de' | 'en' | 'es'): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const monthName = MONTH_NAMES[lang]?.[month] || MONTH_NAMES.en[month];
  if (lang === 'en') return `${monthName} ${day}`;
  if (lang === 'de') return `${day}. ${monthName}`;
  return `${day} ${monthName}`;
}

export function formatCourseDateRange(start: Date, end: Date, lang: 'tr' | 'de' | 'en' | 'es'): string {
  return `${formatCourseDayMonth(start, lang)} → ${formatCourseDayMonth(end, lang)}`;
}

export function parseDdMmYyyy(value: string): Date | null {
  const m = String(value || '').trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);
  const year = parseInt(m[3], 10);
  if (!day || !month || !year) return null;
  const d = new Date(year, month - 1, day);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toDdMmYyyy(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${date.getFullYear()}`;
}

/** Tüm kurs başlangıç tarihlerini dile göre "2 Mart" formatında döndürür */
export function getFormattedStartDates(lang: 'tr' | 'de' | 'en' | 'es') {
  const pricingLang = lang === 'es' ? 'de' : lang;
  const raw = coursePricing[pricingLang].startDates;
  const format = (arr: string[]) => arr.map((d) => formatCourseDate(d, lang));
  return {
    a1: { a1_1: format(raw.a1.a1_1), a1_2: format(raw.a1.a1_2) },
    a2: { a2_1: format(raw.a2.a2_1), a2_2: format(raw.a2.a2_2) },
    b1: { b1_1: format(raw.b1.b1_1), b1_2: format(raw.b1.b1_2) },
    b2: { b2_1: format(raw.b2.b2_1), b2_2: format(raw.b2.b2_2) },
    c1: { c1_1: format(raw.c1.c1_1), c1_2: format(raw.c1.c1_2) },
  };
}

/** Kayıt açılış tarihleri: Seviye ayrımı olmadan, kronolojik sırada "2 Mart" formatında liste. Kurslara kayıt bu tarihlerde açılır. */
export function getSimpleCourseStartDates(lang: 'tr' | 'de' | 'en' | 'es'): string[] {
  const pricingLang = lang === 'es' ? 'de' : lang;
  const raw = coursePricing[pricingLang].startDates;
  const allRaw = [...raw.a1.a1_1, ...raw.a1.a1_2];
  const unique = [...new Set(allRaw)];
  const sortKey = (ddmm: string) => {
    const [d, m] = ddmm.split('.').map(Number);
    return m * 100 + d;
  };
  unique.sort((a, b) => sortKey(a) - sortKey(b));
  return unique.map((d) => formatCourseDate(d, lang));
}

/** Kayıt tarihleri: value = "dd.mm", label = "Mart 2026" (sadece ay-yıl, gün yok). Aynı ay birden fazla tarih olsa bile tek seçenek. */
export function getStartDateOptionsMonthYear(lang: 'tr' | 'de' | 'en' | 'es', year = 2026): { value: string; label: string }[] {
  const pricingLang = lang === 'es' ? 'de' : lang;
  const raw = coursePricing[pricingLang].startDates;
  const allRaw = [...raw.a1.a1_1, ...raw.a1.a1_2];
  const unique = [...new Set(allRaw)];
  unique.sort((a, b) => {
    const [d1, m1] = a.split('.').map(Number);
    const [d2, m2] = b.split('.').map(Number);
    return (m1 * 100 + d1) - (m2 * 100 + d2);
  });
  const monthNames = (MONTH_NAMES[lang] || MONTH_NAMES.en) as Record<number, string>;
  const byMonth = new Map<number, string>();
  for (const ddmm of unique) {
    const month = parseInt(ddmm.split('.')[1], 10);
    if (!byMonth.has(month)) byMonth.set(month, ddmm);
  }
  return Array.from(byMonth.entries())
    .sort(([a], [b]) => a - b)
    .map(([month, value]) => ({
      value,
      label: `${monthNames[month]} ${year}`,
    }));
}

/** Kayıt tarihleri: value = "dd.mm", label = "2 Mart 2026" formatında seçenekler (form dropdown için). */
export function getStartDateOptions(lang: 'tr' | 'de' | 'en' | 'es', year = 2026): { value: string; label: string }[] {
  const formatted = getSimpleCourseStartDates(lang);
  const pricingLang = lang === 'es' ? 'de' : lang;
  const raw = coursePricing[pricingLang].startDates;
  const allRaw = [...raw.a1.a1_1, ...raw.a1.a1_2];
  const unique = [...new Set(allRaw)];
  unique.sort((a, b) => {
    const [d1, m1] = a.split('.').map(Number);
    const [d2, m2] = b.split('.').map(Number);
    return (m1 * 100 + d1) - (m2 * 100 + d2);
  });
  return unique.map((ddmm) => ({
    value: ddmm,
    label: (formatCourseDate(ddmm, lang)) + ' ' + year,
  }));
}

/** Online yoğun kurs seviye fiyatları (8 haftalık program). */
export const ONLINE_LEVEL_PRICES = {
  a1: 300,
  a2: 350,
} as const;

export function getOnlineLevelPriceNum(level: string): number {
  const key = level.toLowerCase() as keyof typeof ONLINE_LEVEL_PRICES;
  return ONLINE_LEVEL_PRICES[key] ?? 0;
}

export function formatOnlineLevelPrice(level: string): string {
  const n = getOnlineLevelPriceNum(level);
  return n > 0 ? `${n}€` : '';
}

/** Tüm kurslarda gösterilen tek/sabit indirim fiyatı (üstü çizili eski → indirimli). */
export const PROMO_PRICE = {
  original: 990,
  discounted: 890,
  percent: 10,
  originalText: '990€',
  discountedText: '890€',
};

/** "%10 indirim" etiketini dile göre döndürür. */
export function getPromoDiscountBadge(lang: 'tr' | 'de' | 'en' | 'es'): string {
  const labels: Record<'tr' | 'de' | 'en' | 'es', string> = {
    tr: `%${PROMO_PRICE.percent} indirim`,
    de: `${PROMO_PRICE.percent}% Rabatt`,
    en: `${PROMO_PRICE.percent}% off`,
    es: `${PROMO_PRICE.percent}% de descuento`,
  };
  return labels[lang] ?? labels.en;
}

/** Bir kursun (kart için) somut fiyat gösterip göstermediğini belirler. */
export function courseShowsPrice(lang: 'tr' | 'de' | 'en' | 'es', slug: string): boolean {
  if (getCourseCardPerWeekPrice(lang, slug)) return true;
  const data = getCoursePricingData(lang, slug);
  if (data?.pricing?.fullCourse) return true;
  if (data?.isWeeklyOnly && data?.weeklyPricing) return true;
  return false;
}

/** Kurs kartı: Almanya vizesine uygun etiketi */
export const VISA_ELIGIBLE_LABEL: Record<'tr' | 'de' | 'en' | 'es', string> = {
  tr: 'Almanya vizesine uygun',
  de: 'Für deutsche Visumanträge geeignet',
  en: 'Eligible for Germany visa',
  es: 'Apto para visado en Alemania',
};

/** Yoğun yüz yüze / sınav hazırlık gibi vize amaçlı programlar için kart etiketi gösterilir. */
export function isVisaEligibleCourse(slug: string): boolean {
  const s = slug.toLowerCase().replace(/\.(md|de|en|es)$/i, '');
  if (s.startsWith('online-') || s.includes('/online-')) return false;
  if (
    s.includes('yaz-okulu') ||
    s.includes('sommerschule') ||
    s.includes('lise-yaz') ||
    s.includes('gymnasium-sommer') ||
    s.includes('universite-yaz') ||
    s.includes('highschool-summer') ||
    s.includes('university-summer') ||
    s.includes('escuela-verano')
  ) {
    return false;
  }

  const info = extractCourseInfo(slug);
  if (info.type === 'online') return false;
  if (info.type === 'intensive' || info.type === 'exam') return true;
  if (info.type === 'seasonal' && s.includes('haftalik')) return true;

  return false;
}

/** Kart ve detay sayfalarında ders saati yerine kullanılacak ibare: haftalık ders yükü rozeti. */
export const LESSONS_UP_TO_200: Record<'tr' | 'de' | 'en' | 'es', string> = {
  tr: 'Haftada 20 saat',
  de: '20 Std./Woche',
  en: '20 hours/week',
  es: '20 horas/semana',
};

export interface CourseCardDisplayBadges {
  /** Üst satır — toplam ders saati veya program tipi */
  highlight: string;
  /** Özellik rozeti: haftalık yük */
  weekly: string;
  /** Özellik rozeti: kurs süresi */
  duration: string;
}

const CARD_DISPLAY_BADGE_COPY = {
  tr: {
    weekly20: '20 saat/hafta',
    weekly16: '16 saat/hafta',
    duration8: '8 hafta',
    highlight200: '200 ders saati',
    highlightOnline: 'Akşam sınıfları',
    durationFlexible: 'Esnek süre',
  },
  de: {
    weekly20: '20 Std./Wo.',
    weekly16: '16 Std./Wo.',
    duration8: '8 Wochen',
    highlight200: '200 UStd.',
    highlightOnline: 'Abendkurse',
    durationFlexible: 'Flexibel',
  },
  en: {
    weekly20: '20 h/week',
    weekly16: '16 h/week',
    duration8: '8 weeks',
    highlight200: '200 lesson hrs',
    highlightOnline: 'Evening classes',
    durationFlexible: 'Flexible',
  },
  es: {
    weekly20: '20 h/sem.',
    weekly16: '16 h/sem.',
    duration8: '8 semanas',
    highlight200: '200 h de clase',
    highlightOnline: 'Clases vespertinas',
    durationFlexible: 'Flexible',
  },
} as const;

/** Ana sayfa kurs kartı: üst vurgu + haftalık/süre rozetleri */
export function getCourseCardDisplayBadges(
  lang: 'tr' | 'de' | 'en' | 'es',
  slug: string,
): CourseCardDisplayBadges | null {
  const info = extractCourseInfo(slug);
  const c = CARD_DISPLAY_BADGE_COPY[lang] ?? CARD_DISPLAY_BADGE_COPY.en;
  const s = slug.toLowerCase();

  if (info.type === 'online') {
    return {
      highlight: c.highlightOnline,
      weekly: c.weekly16,
      duration: c.duration8,
    };
  }

  if (info.type === 'intensive' || info.type === 'exam') {
    return {
      highlight: c.highlight200,
      weekly: c.weekly20,
      duration: c.duration8,
    };
  }

  if (info.type === 'seasonal' && s.includes('haftalik')) {
    return {
      highlight: c.highlight200,
      weekly: c.weekly20,
      duration: c.durationFlexible,
    };
  }

  return null;
}

/** Yoğun/online kurs kartlarında gösterilecek haftalık fiyat metni. Hep Intensive (110€) olarak gösterilir. */
export function getCourseCardPerWeekPrice(lang: 'tr' | 'de' | 'en' | 'es', slug: string): string | null {
  const info = extractCourseInfo(slug);
  if (info.type !== 'intensive' && info.type !== 'online') return null;
  const slugLower = slug.toLowerCase();
  if (slugLower === 'online-sinav-hazirlik') return null;
  const perWeekEuro = 110;
  const t: Record<string, string> = {
    tr: `ab ${perWeekEuro}€/hafta`,
    de: `ab ${perWeekEuro}€/Woche`,
    en: `from ${perWeekEuro}€/week`,
    es: `desde ${perWeekEuro}€/semana`,
  };
  return t[lang] ?? t.en;
}

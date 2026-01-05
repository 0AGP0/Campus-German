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
  } else if (slugLower === 'university-pathway' || slugLower === 'universite-hazirlik') {
    type = 'intensive';
    hasPricing = level !== null;
  } else if (slugLower.startsWith('yogun-') || (slugLower.includes('yogun-') && !slugLower.includes('online-'))) {
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
export function getCoursePricingData(lang: 'tr' | 'de', slug: string) {
  const info = extractCourseInfo(slug);
  const slugLower = slug.toLowerCase();
  
  // online-sinav-hazirlik için level kontrolünü atla
  if (!info.hasPricing || (!info.level && slugLower !== 'online-sinav-hazirlik')) {
    return null;
  }
  
  if (info.type === 'intensive') {
    return {
      pricing: getCoursePricing(lang, 'intensive', info.level),
      dates: getCourseDates(lang, info.level),
      schedule: coursePricing[lang].schedule,
      holidays: coursePricing[lang].holidays,
      weeklyPricing: coursePricing[lang].weeklyPricing,
      visaInfo: coursePricing[lang].visaInfo,
      lessonInfo: coursePricing[lang].lessonInfo,
      onlineNote: coursePricing[lang].onlineNote,
    };
  } else if (info.type === 'online') {
    // Online sınav hazırlık kursu için özel fiyatlandırma
    let pricing = null;
    
    if (slugLower === 'online-sinav-hazirlik') {
      // Online Goethe/TELC sınav hazırlık için ortalama fiyat (tüm seviyeler için)
      // Kullanıcı seviye seçebilir, bu yüzden genel bir fiyat gösteriyoruz
      pricing = {
        fullCourse: "990€", // Ortalama fiyat (B1 seviyesi baz alınarak)
        lessons: "160-200 ders",
        duration: "8-12 hafta",
      };
    } else {
      pricing = getCoursePricing(lang, 'online', info.level);
    }
    
    // Online sınav hazırlık için tüm seviyeler için tarihleri göster
    let dates = null;
    if (slugLower === 'online-sinav-hazirlik') {
      // Tüm seviyeler için tarihleri birleştir
      const allDates: string[] = [];
      const levels: CourseLevel[] = ['a1', 'a2', 'b1', 'b2', 'c1'];
      levels.forEach(level => {
        const levelDates = getCourseDates(lang, level);
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
      dates = info.level ? getCourseDates(lang, info.level) : null;
    }
    
    return {
      pricing: pricing,
      dates: dates,
      schedule: coursePricing[lang].schedule,
      holidays: coursePricing[lang].holidays,
      weeklyPricing: coursePricing[lang].weeklyPricing,
      visaInfo: coursePricing[lang].visaInfo,
      lessonInfo: coursePricing[lang].lessonInfo,
      onlineNote: coursePricing[lang].onlineNote,
      isExamPrep: slugLower === 'online-sinav-hazirlik', // Online sınav hazırlık olduğunu belirt
    };
  } else if (info.type === 'seasonal' && info.hasPricing && info.level) {
    // Haftalık kurslar için sadece haftalık fiyatları göster
    return {
      pricing: null, // Haftalık kurslar için tam kurs fiyatı yok
      dates: null, // Haftalık kurslar için sabit tarih yok
      schedule: coursePricing[lang].schedule,
      holidays: coursePricing[lang].holidays,
      weeklyPricing: coursePricing[lang].weeklyPricing,
      visaInfo: coursePricing[lang].visaInfo,
      lessonInfo: coursePricing[lang].lessonInfo,
      onlineNote: coursePricing[lang].onlineNote,
      isWeeklyOnly: true, // Sadece haftalık fiyatlar gösterilecek
    };
  } else if (info.type === 'exam' && info.hasPricing) {
    // Sınav hazırlık kursları için fiyat bilgileri
    const slugLower = slug.toLowerCase();
    let examPricing = null;
    
    // TestDaF/DSH kontrolü
    if (slugLower.includes('testdaf') || slugLower.includes('dsh')) {
      examPricing = {
        fullCourse: coursePricing[lang].examPrep.testdafDsh.fullCourse,
        lessons: coursePricing[lang].examPrep.testdafDsh.lessons,
        duration: coursePricing[lang].examPrep.testdafDsh.duration,
      };
    } else if (slugLower.includes('goethe') || slugLower.includes('telc')) {
      // Goethe/TELC sınavları için seviye bazlı fiyat
      if (info.level && coursePricing[lang].examPrep.goetheTelc[info.level]) {
        examPricing = {
          fullCourse: coursePricing[lang].examPrep.goetheTelc[info.level].fullCourse,
          lessons: coursePricing[lang].examPrep.goetheTelc[info.level].lessons,
          duration: coursePricing[lang].examPrep.goetheTelc[info.level].duration,
        };
      }
    }
    
    // Eğer fiyat bilgisi bulunamadıysa null döndür
    if (!examPricing) {
      return null;
    }
    
    return {
      pricing: examPricing,
      dates: info.level ? getCourseDates(lang, info.level) : null, // Sınav hazırlık kursları da normal tarihleri kullanabilir
      schedule: coursePricing[lang].schedule,
      holidays: coursePricing[lang].holidays,
      weeklyPricing: null, // Sınav hazırlık kursları için haftalık fiyat yok
      visaInfo: null, // Sınav hazırlık kursları için vize bilgisi yok
      lessonInfo: coursePricing[lang].lessonInfo,
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


/**
 * Path Helpers - Dil bazlı path mapping fonksiyonları
 * 
 * Bu dosya Header.astro'daki sectionMapping ile uyumlu çalışır.
 * Tüm dil bazlı path'ler buradan yönetilir.
 */

export type SupportedLang = 'tr' | 'de' | 'en' | 'es';

/**
 * Dil bazlı section path'lerini döndürür
 * Header.astro'daki sectionMapping ile uyumlu
 */
export function getSectionPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'kurslar',
    de: 'kurse',
    en: 'courses',
    es: 'cursos'
  };
  return mapping[lang] || 'courses';
}

/**
 * Dil bazlı booking/rezervasyon path'ini döndürür
 */
export function getBookingPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'buchung',
    de: 'buchung',
    en: 'booking',
    es: 'reservar'
  };
  return mapping[lang] || 'booking';
}

/**
 * Dil bazlı contact/iletişim path'ini döndürür
 */
export function getContactPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'iletisim',
    de: 'kontakt',
    en: 'contact',
    es: 'contacto'
  };
  return mapping[lang] || 'contact';
}

/**
 * Dil bazlı about/hakkımızda path'ini döndürür
 */
export function getAboutPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'hakkimizda',
    de: 'ueber-uns',
    en: 'about-us',
    es: 'sobre-nosotros'
  };
  return mapping[lang] || 'about-us';
}

/**
 * Dil bazlı advantages/avantajlar path'ini döndürür
 */
export function getAdvantagesPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'avantajlarimiz',
    de: 'unsere-vorteile',
    en: 'our-advantages',
    es: 'nuestras-ventajas'
  };
  return mapping[lang] || 'our-advantages';
}

/**
 * Dil bazlı services/hizmetler path'ini döndürür
 */
export function getServicesPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'sunduklarimiz',
    de: 'unsere-dienstleistungen',
    en: 'our-services',
    es: 'nuestros-servicios'
  };
  return mapping[lang] || 'our-services';
}

/**
 * Dil bazlı success stories/başarı hikayeleri path'ini döndürür
 */
export function getSuccessStoriesPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'basari-hikayeleri',
    de: 'erfolgsgeschichten',
    en: 'success-stories',
    es: 'historias-exito'
  };
  return mapping[lang] || 'success-stories';
}

/** Dil bazlı ücretsiz deneme / free trial path'ini döndürür */
export function getTrialPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'ucretsiz-deneme',
    de: 'kostenlose-probestunde',
    en: 'free-trial',
    es: 'clase-prueba-gratis',
  };
  return mapping[lang] || 'free-trial';
}

/** Dil bazlı partner/eğitmen başvuru path'ini döndürür */
export function getPartnerApplicationPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'partner-egitmen-basvuru',
    de: 'partner-lehrkraft-bewerbung',
    en: 'partner-teacher-application',
    es: 'solicitud-socio-profesor',
  };
  return mapping[lang] || 'partner-teacher-application';
}

/** Dil bazlı fiyatlar & tarihler path'ini döndürür */
export function getPricesDatesPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'fiyatlar-tarihler',
    de: 'preise-termine',
    en: 'prices-dates',
    es: 'precios-fechas',
  };
  return mapping[lang] || 'prices-dates';
}

/** Yasal sayfa slug'ları (Datenschutz / Gizlilik) */
export function getDatenschutzPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'gizlilik-politikasi',
    de: 'datenschutz',
    en: 'privacy-policy',
    es: 'politica-privacidad'
  };
  return mapping[lang] || 'privacy-policy';
}

/** Yasal sayfa slug'ları (Impressum / Yasal Uyarı) */
export function getImpressumPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'yasal-uyari',
    de: 'impressum',
    en: 'imprint',
    es: 'aviso-legal'
  };
  return mapping[lang] || 'imprint';
}

/** Yasal sayfa slug'ları (Informationsauskunft / Bilgi Talebi) */
export function getInformationsauskunftPath(lang: SupportedLang): string {
  const mapping: Record<SupportedLang, string> = {
    tr: 'bilgi-talebi',
    de: 'informationsauskunft',
    en: 'information-request',
    es: 'solicitud-informacion'
  };
  return mapping[lang] || 'information-request';
}

/**
 * legalSlug'dan sayfa tipini döndürür (datenschutz | impressum | informationsauskunft)
 */
export function getLegalPageType(legalSlug: string): 'datenschutz' | 'impressum' | 'informationsauskunft' | null {
  const slugs = {
    datenschutz: ['gizlilik-politikasi', 'datenschutz', 'privacy-policy', 'politica-privacidad'],
    impressum: ['yasal-uyari', 'impressum', 'imprint', 'aviso-legal'],
    informationsauskunft: ['bilgi-talebi', 'informationsauskunft', 'information-request', 'solicitud-informacion'],
  };
  for (const [type, list] of Object.entries(slugs))
    if (list.includes(legalSlug)) return type as 'datenschutz' | 'impressum' | 'informationsauskunft';
  return null;
}

/**
 * Kurs slug'ından dil uzantısını temizler
 * Örnek: "intensiv-a1.de" -> "intensiv-a1"
 */
export function cleanSlug(slug: string): string {
  let clean = slug;
  
  // Tire ile biten uzantıları kaldır (bildungszeit-de -> bildungszeit)
  if (clean.endsWith('-de')) {
    clean = clean.replace(/-de$/, '');
  } else if (clean.endsWith('-tr')) {
    clean = clean.replace(/-tr$/, '');
  } else if (clean.endsWith('-en')) {
    clean = clean.replace(/-en$/, '');
  } else if (clean.endsWith('-es')) {
    clean = clean.replace(/-es$/, '');
  }
  // Tire olmadan biten uzantıları kaldır (bildungszeitde -> bildungszeit)
  else if (clean.endsWith('de') && clean.length > 2) {
    clean = clean.replace(/de$/, '');
  } else if (clean.endsWith('tr') && clean.length > 2) {
    clean = clean.replace(/tr$/, '');
  } else if (clean.endsWith('en') && clean.length > 2) {
    clean = clean.replace(/en$/, '');
  } else if (clean.endsWith('es') && clean.length > 2) {
    clean = clean.replace(/es$/, '');
  }
  
  return clean;
}

/**
 * Genel bakış sayfalarının slug'larını kontrol eder
 */
export function isOverviewPage(slug: string): boolean {
  const overviewSlugs = [
    'intensiv-deutsch',
    'yogun-deutsch',
    'intensive-german',
    'aleman-intensivo',
    'saisonal-uebersicht',
    'seasonal-overview',
    'resumen-estacional',
    'donemsel-kurslar-genel-bakis',
    'online-uebersicht',
    'online-overview',
    'resumen-online',
    'online-kurslar-genel-bakis',
    'pruefungsvorbereitung-uebersicht',
    'exam-preparation-overview',
    'resumen-preparacion-examenes',
    'sinav-hazirlik-genel-bakis',
    'intensiv-studentenvisum'
  ];
  
  return overviewSlugs.includes(cleanSlug(slug));
}

/**
 * Desteklenen dilleri döndürür
 */
export function getSupportedLangs(): SupportedLang[] {
  return ['tr', 'de', 'en', 'es'];
}

/**
 * Dil kodunun geçerli olup olmadığını kontrol eder
 */
export function isValidLang(lang: string): lang is SupportedLang {
  return ['tr', 'de', 'en', 'es'].includes(lang);
}

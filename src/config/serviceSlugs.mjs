/**
 * Konaklama hizmet URL'leri — tek kaynak (slug + path + legacy redirect).
 * pathHelpers, astro.config ve içerik sayfaları buradan türetir.
 */

/** @typedef {'tr' | 'de' | 'en' | 'es'} Lang */

/** @type {Record<Lang, string>} */
export const SERVICES_SECTION = {
  tr: 'sunduklarimiz',
  de: 'unsere-dienstleistungen',
  en: 'our-services',
  es: 'nuestros-servicios',
};

/** Geçici konaklama hizmet sayfası (markdown içerik) */
/** @type {Record<Lang, string>} */
export const ACCOMMODATION_SLUG = {
  tr: 'konaklama',
  de: 'unterkunft',
  en: 'accommodation',
  es: 'alojamiento',
};

/** WG rehberi */
/** @type {Record<Lang, string>} */
export const WG_GUIDE_SLUG = {
  tr: 'wg-konaklama-bremen',
  de: 'wg-unterkunft-bremen',
  en: 'wg-accommodation-bremen',
  es: 'wg-alojamiento-bremen',
};

/**
 * Eski ilan listesi (explorer) slug'ı.
 * TR'de kanonik sayfa zaten `konaklama`; DE/EN/ES'te ayrı explorer URL'i vardı.
 */
export const LEGACY_ACCOMMODATION_EXPLORER_SLUG = 'konaklama';

/** @param {Lang} lang */
export function getAccommodationSlug(lang) {
  return ACCOMMODATION_SLUG[lang] ?? ACCOMMODATION_SLUG.en;
}

/** @param {Lang} lang */
export function getWgGuideSlug(lang) {
  return WG_GUIDE_SLUG[lang] ?? WG_GUIDE_SLUG.en;
}

/** @param {Lang} lang */
export function getAccommodationPath(lang) {
  const section = SERVICES_SECTION[lang] ?? SERVICES_SECTION.en;
  return `/${lang}/${section}/${getAccommodationSlug(lang)}/`;
}

/** @param {Lang} lang */
export function getWgGuidePath(lang) {
  const section = SERVICES_SECTION[lang] ?? SERVICES_SECTION.en;
  return `/${lang}/${section}/${getWgGuideSlug(lang)}/`;
}

/**
 * Astro static redirect haritası: eski explorer URL → geçici konaklama hizmet sayfası.
 * TR hariç (orada `konaklama` zaten kanonik slug).
 * @returns {Record<string, string>}
 */
export function getLegacyAccommodationExplorerRedirects() {
  /** @type {Record<string, string>} */
  const redirects = {};
  for (const lang of /** @type {const} */ (['de', 'en', 'es'])) {
    const section = SERVICES_SECTION[lang];
    const from = `/${lang}/${section}/${LEGACY_ACCOMMODATION_EXPLORER_SLUG}`;
    const to = getAccommodationPath(lang);
    redirects[from] = to;
    redirects[`${from}/`] = to;
  }
  return redirects;
}

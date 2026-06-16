import { extractCourseInfo } from './coursePricingHelper';
import { getBookingPath, type SupportedLang } from './pathHelpers';

export type BookingProgram = 'intensive' | 'short-term' | 'online' | 'youth-camp';

export interface BookingPrefill {
  program: BookingProgram;
  courses?: string[];
  weeks?: number;
}

function normalizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/\.(md|de|en|es)$/i, '');
}

/**
 * Kurs slug'ından booking formu için program ve kurs seçimini çıkarır.
 */
export function getBookingPrefillFromSlug(slug: string): BookingPrefill {
  const s = normalizeSlug(slug);
  const info = extractCourseInfo(slug);

  if (
    s.includes('yaz-okulu') ||
    s.includes('sommerschule') ||
    s.includes('gymnasium-sommer') ||
    s.includes('universite-yaz') ||
    s.includes('lise-yaz')
  ) {
    let camp: string | undefined;
    if (s.includes('berlin') || s.includes('universite')) camp = 'berlin-camp';
    else if (s.includes('muenster') || s.includes('münster') || s.includes('lise') || s.includes('gymnasium')) {
      camp = 'muenster-camp';
    } else if (s.includes('bremen')) camp = 'bremen-camp';
    return { program: 'youth-camp', courses: camp ? [camp] : undefined };
  }

  if (
    info.type === 'seasonal' ||
    s.includes('haftalik') ||
    s.includes('donemsel') ||
    s.includes('saisonal') ||
    s.includes('short-term')
  ) {
    return { program: 'short-term' };
  }

  if (s.includes('online-uebersicht') || s === 'online-almanca' || s === 'online-deutsch') {
    return { program: 'online' };
  }

  if (info.type === 'online' || s.startsWith('online-')) {
    if (info.level === 'a1' || info.level === 'a2') {
      return { program: 'online', courses: [info.level] };
    }
    return { program: 'online' };
  }

  if (s.includes('goethe-telc-c1') || s.includes('telc-c1')) {
    return { program: 'intensive', courses: ['telc-c1-prep'] };
  }

  if (info.type === 'exam') {
    if (info.level) return { program: 'intensive', courses: [info.level] };
    return { program: 'intensive' };
  }

  if (s.includes('pruefungsvorbereitung') || s.includes('sinav-hazirlik')) {
    return { program: 'intensive' };
  }

  if (s.includes('intensiv-deutsch') || s.includes('yogun-almanca') || s.includes('intensive-german')) {
    return { program: 'intensive' };
  }

  if (info.type === 'intensive' && info.level) {
    return { program: 'intensive', courses: [info.level] };
  }

  if (info.level) {
    return { program: 'intensive', courses: [info.level] };
  }

  return { program: 'intensive' };
}

export function buildBookingUrl(lang: SupportedLang, slug: string): string {
  const prefill = getBookingPrefillFromSlug(slug);
  const base = `/${lang}/${getBookingPath(lang)}`;
  const params = new URLSearchParams();
  params.set('program', prefill.program);
  if (prefill.courses?.length) {
    params.set('courses', prefill.courses.join(','));
  }
  if (prefill.weeks) {
    params.set('weeks', String(prefill.weeks));
  }
  return `${base}?${params.toString()}`;
}

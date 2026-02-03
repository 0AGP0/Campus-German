/**
 * Broşür listesi: sayfa üzerinde seçilebilir ve form sonrası indirilebilir.
 * Görsel: kapak/önizleme (public/images/ altına koyun), pdf: indirme dosyası (public/ altına koyun).
 */
export type BrochureItem = {
  id: string;
  title: Record<'tr' | 'de' | 'en' | 'es', string>;
  image: string;
  pdf: string;
};

export const brochures: BrochureItem[] = [
  {
    id: 'genel',
    title: {
      tr: 'Campus German Genel Broşür',
      de: 'Campus German Allgemeine Broschüre',
      en: 'Campus German General Brochure',
      es: 'Folleto General Campus German',
    },
    image: '/images/brosur-genel.jpg',
    pdf: '/Campus_German_Brosur.pdf',
  },
  {
    id: 'yogun',
    title: {
      tr: 'Yoğun Almanca Kursları',
      de: 'Intensiv-Deutschkurse',
      en: 'Intensive German Courses',
      es: 'Cursos Intensivos de Alemán',
    },
    image: '/images/brosur-yogun.jpg',
    pdf: '/brochures/intensivkurse.pdf',
  },
  {
    id: 'online',
    title: {
      tr: 'Online Almanca Kursları',
      de: 'Online-Deutschkurse',
      en: 'Online German Courses',
      es: 'Cursos de Alemán Online',
    },
    image: '/images/brosur-online.jpg',
    pdf: '/brochures/online-kurse.pdf',
  },
];

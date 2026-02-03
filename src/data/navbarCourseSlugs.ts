/**
 * Navbar'da görünen kurs slug'ları (dil bazlı).
 * Ana sayfa kurs filtresinde sadece bu listedeki kurslar gösterilir.
 */
export const navbarCourseSlugsByLang: Record<string, string[]> = {
  tr: [
    'yogun-deutsch', 'yogun-a1', 'yogun-a2', 'yogun-b1', 'yogun-b2', 'yogun-c1',
    'studienkolleg-hazirlik', 'donemsel-kurslar-genel-bakis', 'lise-yaz-okulu', 'universite-yaz-okulu', 'yaz-okulu',
    'haftalik-a1-a2', 'haftalik-b1-c1', 'standart-aksam',
    'online-kurslar-genel-bakis', 'online-yogun-a1', 'online-yogun-a2', 'online-yogun-b1', 'online-yogun-b2', 'online-yogun-c1',
    'sinav-hazirlik-genel-bakis', 'goethe-telc-a1', 'goethe-telc-a2', 'goethe-telc-b1', 'goethe-telc-b2', 'goethe-telc-c1', 'testdaf-dsh', 'testdaf-hazirlik', 'telc-hazirlik',
    'kurumsal-kurs', 'bildungszeit', 'daad-bursiyerleri', 'erasmus-ogretmenler', 'erasmus-ogrencileri', 'meslek-kariyer', 'is-almancasi', 'kariyer-yolu', 'saglik-tip', 'doktor-almancasi', 'fsp-hazirlik', 'muhendislik-teknik', 'is-yonetim',
  ],
  de: [
    'intensiv-deutsch', 'intensiv-a1', 'intensiv-a2', 'intensiv-b1', 'intensiv-b2', 'intensiv-c1',
    'studienkolleg', 'saisonal-uebersicht', 'gymnasium-sommerschule', 'universitaet-sommerschule', 'sommerschule',
    'woechentlich-a1-a2', 'woechentlich-b1-c1', 'standard-abend',
    'online-uebersicht', 'online-intensiv-a1', 'online-intensiv-a2', 'online-intensiv-b1', 'online-intensiv-b2', 'online-intensiv-c1',
    'pruefungsvorbereitung-uebersicht', 'goethe-telc-a1', 'goethe-telc-a2', 'goethe-telc-b1', 'goethe-telc-b2', 'goethe-telc-c1', 'testdaf-dsh', 'testdaf-vorbereitung', 'telc-vorbereitung',
    'firmenkurs', 'bildungszeit', 'daad-stipendiaten', 'erasmus-lehrer', 'erasmus-studenten', 'beruf-karriere', 'wirtschaftsdeutsch', 'karrierepfad', 'medizin-gesundheit', 'medizin-deutsch', 'fsp-vorbereitung', 'ingenieurwesen-technik', 'wirtschaft-management',
  ],
  en: [
    'intensive-german', 'intensive-a1', 'intensive-a2', 'intensive-b1', 'intensive-b2', 'intensive-c1',
    'studienkolleg-prep', 'seasonal-overview', 'highschool-summer-school', 'university-summer-school', 'summer-school',
    'weekly-a1-a2', 'weekly-b1-c1', 'standard-evening',
    'online-overview', 'online-intensive-a1', 'online-intensive-a2', 'online-intensive-b1', 'online-intensive-b2', 'online-intensive-c1',
    'exam-preparation-overview', 'goethe-telc-a1', 'goethe-telc-a2', 'goethe-telc-b1', 'goethe-telc-b2', 'goethe-telc-c1', 'testdaf-dsh', 'testdaf-preparation', 'telc-preparation',
    'corporate-course', 'bildungszeit', 'daad-scholars', 'erasmus-teachers', 'erasmus-students', 'career-courses', 'business-german', 'career-pathway', 'health-medicine', 'medical-german', 'fsp-preparation', 'engineering-technology', 'business-management',
  ],
  es: [
    'aleman-intensivo', 'intensivo-a1', 'intensivo-a2', 'intensivo-b1', 'intensivo-b2', 'intensivo-c1',
    'preparacion-studienkolleg', 'resumen-estacional', 'escuela-verano-secundaria', 'escuela-verano-universidad', 'escuela-verano',
    'semanal-a1-a2', 'semanal-b1-c1', 'nocturno-estandar',
    'resumen-online', 'intensivo-online-a1', 'intensivo-online-a2', 'intensivo-online-b1', 'intensivo-online-b2', 'intensivo-online-c1',
    'resumen-preparacion-examenes', 'goethe-telc-a1', 'goethe-telc-a2', 'goethe-telc-b1', 'goethe-telc-b2', 'goethe-telc-c1', 'testdaf-dsh', 'preparacion-testdaf', 'preparacion-telc',
    'curso-empresarial', 'bildungszeit', 'becarios-daad', 'profesores-erasmus', 'estudiantes-erasmus', 'cursos-carrera', 'aleman-empresarial', 'trayectoria-carrera', 'medicina-salud', 'aleman-medico', 'preparacion-fsp', 'ingenieria-tecnologia', 'economia-gestion',
  ],
};

export function getNavbarCourseSlugs(lang: string): Set<string> {
  const slugs = navbarCourseSlugsByLang[lang] ?? navbarCourseSlugsByLang.de;
  return new Set(slugs);
}

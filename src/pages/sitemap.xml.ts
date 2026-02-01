import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { cleanSlug, getSectionPath, getAboutPath, getServicesPath, getAdvantagesPath, getContactPath, getBookingPath } from '../utils/pathHelpers';

const siteUrl = 'https://campusgerman.com';

// Tüm statik sayfaları topla
async function getAllPages(): Promise<string[]> {
  const pages: string[] = [];
  const langs = ['tr', 'de', 'en', 'es'] as const;

  // Ana sayfalar
  pages.push(`${siteUrl}/`);
  for (const lang of langs) {
    pages.push(`${siteUrl}/${lang}/`);
  }

  // Kurslar
  const allKurslar = await getCollection('kurslar');
  for (const lang of langs) {
    const sectionPath = getSectionPath(lang);
    pages.push(`${siteUrl}/${lang}/${sectionPath}/`);
    
    // Kurs overview sayfaları
    pages.push(`${siteUrl}/${lang}/${sectionPath}/intensiv-deutsch/`);
    pages.push(`${siteUrl}/${lang}/${sectionPath}/online-uebersicht/`);
    pages.push(`${siteUrl}/${lang}/${sectionPath}/pruefungsvorbereitung-uebersicht/`);
    pages.push(`${siteUrl}/${lang}/${sectionPath}/saisonal-uebersicht/`);
    
    // Her dil için kursları ekle
    const kurslarByLang = allKurslar.filter(kurs => kurs.data.lang === lang);
    for (const kurs of kurslarByLang) {
      const finalSlug = kurs.data.customSlug ?? cleanSlug(kurs.slug);
      // Silinmiş sayfaları atla
      if (finalSlug === 'intensiv-studentenvisum' || finalSlug === 'universitaetsvorbereitung') continue;
      pages.push(`${siteUrl}/${lang}/${sectionPath}/${finalSlug}/`);
    }
  }

  // Hakkımızda sayfaları
  const allUeberUns = await getCollection('ueber-uns');
  for (const lang of langs) {
    const aboutPath = getAboutPath(lang);
    pages.push(`${siteUrl}/${lang}/${aboutPath}/`);
    
    const pagesByLang = allUeberUns.filter(page => page.data.lang === lang);
    for (const page of pagesByLang) {
      const finalSlug = page.data.customSlug ?? cleanSlug(page.slug);
      pages.push(`${siteUrl}/${lang}/${aboutPath}/${finalSlug}/`);
    }
  }

  // Hizmetler sayfaları
  const allServices = await getCollection('unsere-dienstleistungen');
  for (const lang of langs) {
    const servicesPath = getServicesPath(lang);
    pages.push(`${siteUrl}/${lang}/${servicesPath}/`);
    
    const servicesByLang = allServices.filter(service => service.data.lang === lang);
    for (const service of servicesByLang) {
      const finalSlug = service.data.customSlug ?? cleanSlug(service.slug);
      pages.push(`${siteUrl}/${lang}/${servicesPath}/${finalSlug}/`);
    }
  }

  // Avantajlar sayfaları
  const allAdvantages = await getCollection('unsere-vorteile');
  for (const lang of langs) {
    const advantagesPath = getAdvantagesPath(lang);
    pages.push(`${siteUrl}/${lang}/${advantagesPath}/`);
    
    const advantagesByLang = allAdvantages.filter(advantage => advantage.data.lang === lang);
    for (const advantage of advantagesByLang) {
      const finalSlug = advantage.data.customSlug ?? cleanSlug(advantage.slug);
      pages.push(`${siteUrl}/${lang}/${advantagesPath}/${finalSlug}/`);
    }
  }

  // İletişim sayfaları
  for (const lang of langs) {
    const contactPath = getContactPath(lang);
    pages.push(`${siteUrl}/${lang}/${contactPath}/`);
  }

  // Rezervasyon sayfaları
  for (const lang of langs) {
    const bookingPath = getBookingPath(lang);
    pages.push(`${siteUrl}/${lang}/${bookingPath}/`);
  }

  // Fiyatlar ve Tarihler (tüm dillerde aynı slug)
  for (const lang of langs) {
    pages.push(`${siteUrl}/${lang}/fiyatlar-tarihler/`);
  }

  // Başarı hikayeleri
  pages.push(`${siteUrl}/tr/basari-hikayeleri/`);
  pages.push(`${siteUrl}/de/erfolgsgeschichten/`);
  pages.push(`${siteUrl}/en/success-stories/`);
  pages.push(`${siteUrl}/es/historias-exito/`);

  // Diğer sayfalar (tr için hakkimizda, de için ueber-uns zaten yukarıdaki döngüde ekleniyor; yanlış tr/ueber-uns eklenmemeli)
  pages.push(`${siteUrl}/tr/ucretsiz-deneme/`);
  pages.push(`${siteUrl}/de/ucretsiz-deneme/`);
  pages.push(`${siteUrl}/en/ucretsiz-deneme/`);
  pages.push(`${siteUrl}/es/ucretsiz-deneme/`);
  pages.push(`${siteUrl}/tr/partner-egitmen-basvuru/`);
  pages.push(`${siteUrl}/de/partner-egitmen-basvuru/`);
  pages.push(`${siteUrl}/en/partner-egitmen-basvuru/`);
  pages.push(`${siteUrl}/es/partner-egitmen-basvuru/`);
  pages.push(`${siteUrl}/tr/lehrkraefte/`);
  pages.push(`${siteUrl}/de/lehrkraefte/`);

  return pages.sort();
}

export const GET: APIRoute = async () => {
  const pages = await getAllPages();
  // Tarihi düzelt - bugünün tarihi (2025)
  const lastmod = '2025-01-25';

  // Tüm sayfaları URL bazında grupla (dil versiyonları için)
  const pageMap = new Map<string, string[]>();
  for (const url of pages) {
    const pathWithoutLang = url.replace(siteUrl, '').replace(/^\/(tr|de|en|es)/, '');
    if (!pageMap.has(pathWithoutLang)) {
      pageMap.set(pathWithoutLang, []);
    }
    pageMap.get(pathWithoutLang)!.push(url);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Array.from(pageMap.entries()).map(([pathWithoutLang, urls]) => {
  return urls.map(url => {
    const allLangVersions = [
      { lang: 'de', url: `${siteUrl}/de${pathWithoutLang}` },
      { lang: 'tr', url: `${siteUrl}/tr${pathWithoutLang}` },
      { lang: 'en', url: `${siteUrl}/en${pathWithoutLang}` },
      { lang: 'es', url: `${siteUrl}/es${pathWithoutLang}` },
    ].filter(h => urls.includes(h.url));
    const xDefaultUrl = urls.find(u => u.startsWith(siteUrl + '/de')) ?? urls[0];

    const priority = pathWithoutLang === '/' ? '1.0' : '0.7';
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    return `  <url>
    <loc>${esc(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
${allLangVersions.map(h => `    <xhtml:link rel="alternate" hreflang="${h.lang}" href="${esc(h.url)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(xDefaultUrl)}" />
  </url>`;
  }).join('\n');
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

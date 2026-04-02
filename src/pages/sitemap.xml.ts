/**
 * Tek dosya sitemap – Google'ın tek istekte okuyabilmesi için zincir yok (sitemap index yok).
 * Build zamanında statik sitemap.xml üretir; GSC "getirilemedi/okunamadı" sorununu hedefler.
 *
 * GSC için kritik: XML UTF-8 (BOM yok), tüm değerler entity-escape, Content-Type doğru.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  cleanSlug,
  getSectionPath,
  getAboutPath,
  getServicesPath,
  getAdvantagesPath,
  getContactPath,
  getBookingPath,
  getPricesDatesPath,
  getTrialPath,
  getPartnerApplicationPath,
} from '../utils/pathHelpers';

const siteUrl = 'https://campusgerman.com';
const lastmod = '2025-02-07';

/** XML entity escape – sitemaps.org + Google gereksinimi; tek tırnak da escape edilir */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function getAllUrls(): Promise<string[]> {
  const urls: string[] = [];
  const langs = ['tr', 'de', 'en', 'es'] as const;

  urls.push(`${siteUrl}/`);
  for (const lang of langs) {
    urls.push(`${siteUrl}/${lang}/`);
  }

  const allKurslar = await getCollection('kurslar');
  for (const lang of langs) {
    const sectionPath = getSectionPath(lang);
    urls.push(`${siteUrl}/${lang}/${sectionPath}/`);
    urls.push(`${siteUrl}/${lang}/${sectionPath}/intensiv-deutsch/`);
    urls.push(`${siteUrl}/${lang}/${sectionPath}/online-uebersicht/`);
    urls.push(`${siteUrl}/${lang}/${sectionPath}/pruefungsvorbereitung-uebersicht/`);
    urls.push(`${siteUrl}/${lang}/${sectionPath}/saisonal-uebersicht/`);
    const kurslarByLang = allKurslar.filter((k) => k.data.lang === lang);
    for (const kurs of kurslarByLang) {
      const finalSlug = kurs.data.customSlug ?? cleanSlug(kurs.slug);
      if (finalSlug === 'intensiv-studentenvisum' || finalSlug === 'universitaetsvorbereitung') continue;
      urls.push(`${siteUrl}/${lang}/${sectionPath}/${finalSlug}/`);
    }
  }

  const allUeberUns = await getCollection('ueber-uns');
  for (const lang of langs) {
    const aboutPath = getAboutPath(lang);
    urls.push(`${siteUrl}/${lang}/${aboutPath}/`);
    const pagesByLang = allUeberUns.filter((p) => p.data.lang === lang);
    for (const page of pagesByLang) {
      const finalSlug = page.data.customSlug ?? cleanSlug(page.slug);
      urls.push(`${siteUrl}/${lang}/${aboutPath}/${finalSlug}/`);
    }
  }

  const allServices = await getCollection('unsere-dienstleistungen');
  for (const lang of langs) {
    const servicesPath = getServicesPath(lang);
    urls.push(`${siteUrl}/${lang}/${servicesPath}/`);
    const byLang = allServices.filter((s) => s.data.lang === lang);
    for (const s of byLang) {
      const finalSlug = s.data.customSlug ?? cleanSlug(s.slug);
      urls.push(`${siteUrl}/${lang}/${servicesPath}/${finalSlug}/`);
    }
  }

  const allAdvantages = await getCollection('unsere-vorteile');
  for (const lang of langs) {
    const advantagesPath = getAdvantagesPath(lang);
    urls.push(`${siteUrl}/${lang}/${advantagesPath}/`);
    const byLang = allAdvantages.filter((a) => a.data.lang === lang);
    for (const a of byLang) {
      const finalSlug = a.data.customSlug ?? cleanSlug(a.slug);
      urls.push(`${siteUrl}/${lang}/${advantagesPath}/${finalSlug}/`);
    }
  }

  for (const lang of langs) {
    urls.push(`${siteUrl}/${lang}/${getContactPath(lang)}/`);
    urls.push(`${siteUrl}/${lang}/${getBookingPath(lang)}/`);
    urls.push(`${siteUrl}/${lang}/${getPricesDatesPath(lang)}/`);
  }

  urls.push(`${siteUrl}/tr/basari-hikayeleri/`);
  urls.push(`${siteUrl}/de/erfolgsgeschichten/`);
  urls.push(`${siteUrl}/en/success-stories/`);
  urls.push(`${siteUrl}/es/historias-exito/`);

  for (const lang of langs) {
    urls.push(`${siteUrl}/${lang}/${getTrialPath(lang)}/`);
    urls.push(`${siteUrl}/${lang}/${getPartnerApplicationPath(lang)}/`);
    urls.push(`${siteUrl}/${lang}/lehrkraefte/`);
  }

  return [...new Set(urls)].sort();
}

export const GET: APIRoute = async () => {
  const urls = await getAllUrls();
  const urlEntries = urls
    .map((url) => {
      const priority = url === `${siteUrl}/` || url.endsWith('/de/') ? '1.0' : '0.7';
      return `  <url>
    <loc>${esc(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;

  const body = new TextEncoder().encode(xml);

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

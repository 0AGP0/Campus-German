# Sitemap – Vercel'de yayınlanır (ücretsiz)

Bu klasör campusgerman.com sitemap dosyasını Vercel'de barındırmak için. **Git / repository gerekmez.**

## İlk kurulum (bir kez)

1. https://vercel.com ücretsiz hesap aç.
2. Proje kökünde: `npm run build` → `npm run sitemap:copy`
3. Bu klasöre gir: `cd sitemap-vercel`
4. `npx vercel --prod` yaz. İlk seferde tarayıcıda giriş ister; giriş yap.
5. "Set up and deploy?" → **Y** → "Which scope?" → hesabını seç → "Link to existing project?" → **N** → "Project name?" → örn. `campusgerman-sitemap` yaz. (Repository sormaz; klasörden yükler.)
6. Biten deployment’ın URL’sini not et (örn. https://campusgerman-sitemap.vercel.app).

## Ana sitede (campusgerman.com)

- **robots.txt** (Hostinger): Sitemap satırını şununla değiştir:  
  `Sitemap: https://SENIN-VERCEL-URL.vercel.app/sitemap.xml`
- **GSC** → Sitemaps → Yeni site haritası ekle: aynı URL (`.../sitemap.xml`).

## Site güncellediğinde

Proje kökünde:
```bash
npm run build
npm run sitemap:copy
cd sitemap-vercel && npx vercel --prod
```

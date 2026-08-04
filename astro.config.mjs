import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { bookingPayProxyDev } from './scripts/booking-pay-proxy-dev.mjs';

// https://astro.build/config
// Sitemap: resmi @astrojs/sitemap (sitemap-index.xml) — GSC farklı URL ile denemek için
export default defineConfig({
  site: 'https://campusgerman.com',
  output: 'static',
  build: {
    inlineStylesheets: 'never'
  },
  vite: {
    plugins: [bookingPayProxyDev()],
  },
  integrations: [sitemap()],
  redirects: {
    '/tr/gizlilik-politikasi': '/datenschutz/',
    '/tr/gizlilik-politikasi/': '/datenschutz/',
    '/de/datenschutz': '/datenschutz/',
    '/de/datenschutz/': '/datenschutz/',
    '/en/privacy-policy': '/datenschutz/',
    '/en/privacy-policy/': '/datenschutz/',
    '/es/politica-privacidad': '/datenschutz/',
    '/es/politica-privacidad/': '/datenschutz/',
    '/tr/genel-hukum-ve-kosullar': '/agb/',
    '/tr/genel-hukum-ve-kosullar/': '/agb/',
    '/de/agb': '/agb/',
    '/de/agb/': '/agb/',
    '/en/terms-and-conditions': '/agb/',
    '/en/terms-and-conditions/': '/agb/',
    '/es/terminos-y-condiciones': '/agb/',
    '/es/terminos-y-condiciones/': '/agb/',
    '/tr/yasal-uyari': '/impressum/',
    '/tr/yasal-uyari/': '/impressum/',
    '/de/impressum': '/impressum/',
    '/de/impressum/': '/impressum/',
    '/en/imprint': '/impressum/',
    '/en/imprint/': '/impressum/',
    '/es/aviso-legal': '/impressum/',
    '/es/aviso-legal/': '/impressum/',
  },
});







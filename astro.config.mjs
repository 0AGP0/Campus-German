import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Sitemap: resmi @astrojs/sitemap (sitemap-index.xml) — GSC farklı URL ile denemek için
export default defineConfig({
  site: 'https://campusgerman.com',
  output: 'static',
  build: {
    inlineStylesheets: 'never'
  },
  integrations: [sitemap()],
});







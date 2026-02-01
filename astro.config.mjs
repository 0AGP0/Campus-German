import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://campusgerman.com',
  output: 'static',
  build: {
    inlineStylesheets: 'never'
  },
  integrations: [],
});







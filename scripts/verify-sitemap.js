import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, '..', 'dist', 'sitemap-index.xml');
const fallbackPath = join(__dirname, '..', 'dist', 'sitemap.xml');

if (!existsSync(indexPath) && !existsSync(fallbackPath)) {
  console.error('HATA: dist/sitemap-index.xml veya dist/sitemap.xml bulunamadi.');
  process.exit(1);
}
console.log('OK: sitemap mevcut (sitemap-index.xml veya sitemap.xml).');

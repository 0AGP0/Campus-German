/**
 * dist/ içindeki tüm sitemap*.xml dosyalarını sitemap-vercel/ klasörüne kopyalar.
 * Bu klasör Vercel'de (ücretsiz) yayınlanır; GSC ve robots.txt o URL'yi kullanır.
 */
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const outDir = join(root, 'sitemap-vercel');

if (!existsSync(distDir)) {
  console.error('HATA: Önce npm run build çalıştırın.');
  process.exit(1);
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// Tek dosya: sitemap.xml (içinde tüm URL'ler; index kullanmıyoruz, böylece Vercel URL'si tek)
const file = 'sitemap.xml';
const src = join(distDir, file);
if (!existsSync(src)) {
  console.error('HATA: dist/sitemap.xml yok. Önce npm run build çalıştırın.');
  process.exit(1);
}
copyFileSync(src, join(outDir, file));
console.log('Kopyalandı: sitemap.xml');
console.log('Yayınlamak için: cd sitemap-vercel && npx vercel --prod');

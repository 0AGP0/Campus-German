/**
 * Eski explorer redirect klasörlerini dist'ten siler (Astro HTML redirect kalıntısı).
 * TR sunduklarimiz/konaklama dokunulmaz — kanonik geçici konaklama sayfası.
 */
import { rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..', 'dist');
const legacyDirs = [
  'de/unsere-dienstleistungen/konaklama',
  'en/our-services/konaklama',
  'es/nuestros-servicios/konaklama',
];

for (const rel of legacyDirs) {
  const abs = join(root, rel);
  if (!existsSync(abs)) continue;
  rmSync(abs, { recursive: true, force: true });
  console.log('dist temizlendi:', rel);
}

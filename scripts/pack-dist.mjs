#!/usr/bin/env node
/**
 * dist/ içeriğini public_html'e tek seferde yüklemek için zip oluşturur.
 * Hostinger File Manager: zip'i public_html'e at → Extract
 */
import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const zipName = 'campusgerman-public_html.zip';
const zipPath = join(root, zipName);

if (existsSync(zipPath)) rmSync(zipPath);

execSync('npm run build:hostinger', { cwd: root, stdio: 'inherit' });
execSync(`zip -r "${zipPath}" .`, { cwd: join(root, 'dist'), stdio: 'inherit' });

console.log('');
console.log('Hazır:', zipPath);
console.log('Hostinger → public_html → Upload → Extract (içindeki dosyalar köke çıksın)');

#!/usr/bin/env bash
# Hostinger FTP: yalnızca değişen dosyaları yükler (ilk tam sync uzun sürer, sonrakiler hızlı).
# Kullanım:
#   FTP_PASS='sifren' npm run deploy:ftp
# veya interaktif şifre:
#   npm run deploy:ftp
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

FTP_HOST="${FTP_HOST:-89.117.103.59}"
FTP_USER="${FTP_USER:-u847149369.campusgerman.com}"
DIST="$ROOT/dist"

npm run build:hostinger

LFTP_CMD="set ssl:verify-certificate no; set ftp:ssl-allow yes; set net:max-retries 2; lcd \"$DIST\"; mirror -R --only-newer --parallel=4 --verbose .; bye"

if [[ -n "${FTP_PASS:-}" ]]; then
  lftp -e "$LFTP_CMD" -u "$FTP_USER,$FTP_PASS" "ftp://$FTP_HOST"
else
  lftp -e "$LFTP_CMD" -u "$FTP_USER" "ftp://$FTP_HOST"
fi

echo "FTP deploy tamam."

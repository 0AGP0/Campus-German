#!/usr/bin/env bash
# SSH erişimin varsa tek komutla public_html sync.
# Kullanım:
#   DEPLOY_TARGET='kullanici@sunucu:~/domains/campusgerman.com/public_html/' ./scripts/deploy-rsync.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -z "${DEPLOY_TARGET:-}" ]]; then
  echo "DEPLOY_TARGET tanımlı değil."
  echo "Örnek:"
  echo "  DEPLOY_TARGET='u123@ftp.campusgerman.com:~/public_html/' ./scripts/deploy-rsync.sh"
  exit 1
fi

npm run build:hostinger

rsync -avz --delete \
  --exclude 'data/config.php' \
  --exclude 'data/private-documents-proxy.config.php' \
  --exclude 'data/booking-pay-proxy.config.php' \
  "$ROOT/dist/" "$DEPLOY_TARGET"

echo "Deploy tamam: $DEPLOY_TARGET"

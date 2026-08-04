/**
 * Astro/Vite dev: /booking-pay-proxy.php için PHP yerine Make → Stripe proxy.
 * production'da Hostinger PHP kullanılır; bu sadece npm run dev.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function readPublishableKey() {
  const candidates = [
    path.join(root, 'public/data/booking-pay-proxy.config.php'),
    path.join(root, 'public/data/booking-pay-proxy.config.example.php'),
  ];
  for (const file of candidates) {
    try {
      const text = fs.readFileSync(file, 'utf8');
      const m = text.match(/['"]stripe_publishable_key['"]\s*=>\s*['"]([^'"]+)['"]/);
      if (m?.[1]) return m[1].trim();
    } catch (_) {}
  }
  return (process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY || '').trim();
}

function readMakeWebhook() {
  const candidates = [
    path.join(root, 'public/data/booking-pay-proxy.config.php'),
    path.join(root, 'public/data/booking-pay-proxy.config.example.php'),
  ];
  for (const file of candidates) {
    try {
      const text = fs.readFileSync(file, 'utf8');
      const m = text.match(/['"]make_webhook_url['"]\s*=>\s*['"]([^'"]+)['"]/);
      if (m?.[1]) return m[1].trim();
    } catch (_) {}
  }
  return 'https://hook.eu2.make.com/40s1h4a3wra21aszpa9y9erfsfooso47';
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

export function bookingPayProxyDev() {
  return {
    name: 'booking-pay-proxy-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/booking-pay-proxy.php')) return next();

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('X-Robots-Tag', 'noindex, nofollow');

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        try {
          const raw = await readBody(req);
          if (!raw.trim()) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Boş istek gövdesi' }));
            return;
          }

          let payload;
          try {
            payload = JSON.parse(raw);
          } catch (_) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Geçersiz JSON' }));
            return;
          }

          const paymentChoice = String(payload?.paymentChoice || '');
          if (paymentChoice !== 'pay_now' && paymentChoice !== 'reservation') {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'paymentChoice pay_now veya reservation olmalı' }));
            return;
          }

          const target = readMakeWebhook();
          let publishableKey = readPublishableKey();

          const upstream = await fetch(target, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'manual',
          });

          const location = upstream.headers.get('location') || '';
          const bodyText = await upstream.text();
          let json = null;
          try {
            json = bodyText ? JSON.parse(bodyText) : null;
          } catch (_) {}

          let checkoutUrl = location;
          let clientSecret = '';

          if (json && typeof json === 'object') {
            if (!checkoutUrl) {
              checkoutUrl = String(json.checkoutUrl || json.checkout_url || '');
            }
            clientSecret = String(json.clientSecret || json.client_secret || '');
            if (!publishableKey) {
              publishableKey = String(json.publishableKey || json.publishable_key || '').trim();
            }
          }

          if (clientSecret.startsWith('cs_')) {
            const out = { ok: true, mode: 'embedded', clientSecret };
            if (publishableKey) out.publishableKey = publishableKey;
            res.statusCode = 200;
            res.end(JSON.stringify(out));
            return;
          }

          if (checkoutUrl.includes('checkout.stripe.com')) {
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, mode: 'hosted', checkoutUrl }));
            return;
          }

          res.statusCode = 502;
          res.end(JSON.stringify({
            error: 'Stripe clientSecret veya checkout URL alınamadı',
            upstreamStatus: upstream.status,
            detail: bodyText.slice(0, 300),
            hint: 'Make webhook yanıtı clientSecret dönmeli. Düz "Accepted" veya ok:true yetmez. Router’da paymentChoice=pay_now VE reservation kolları Webhook response ile clientSecret vermeli.',
          }));
        } catch (err) {
          res.statusCode = 502;
          res.end(JSON.stringify({
            error: 'Make webhook erişilemedi',
            detail: err instanceof Error ? err.message : String(err),
          }));
        }
      });
    },
  };
}

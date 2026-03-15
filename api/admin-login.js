const crypto = require('crypto');

const COOKIE_NAME = 'admin_session';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 gün

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function createSession(secret) {
  const payload = JSON.stringify({ exp: Date.now() + COOKIE_MAX_AGE * 1000 });
  const encoded = Buffer.from(payload).toString('base64url');
  return encoded + '.' + sign(encoded, secret);
}

function verifySession(cookieVal, secret) {
  if (!cookieVal || !secret) return false;
  const [encoded, sig] = cookieVal.split('.');
  if (!encoded || !sig || sig !== sign(encoded, secret)) return false;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString());
    return payload.exp && payload.exp > Date.now();
  } catch {
    return false;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    res.status(500).json({ ok: false, error: 'Sunucu yapılandırması eksik' });
    return;
  }
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    res.status(400).json({ ok: false, error: 'Geçersiz istek' });
    return;
  }
  const user = process.env.ADMIN_USER || '';
  const pass = process.env.ADMIN_PASSWORD || '';
  if (!user || !pass || body.username !== user || body.password !== pass) {
    res.status(401).json({ ok: false, error: 'Kullanıcı adı veya şifre hatalı' });
    return;
  }
  const token = createSession(secret);
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}; Secure`);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ ok: true });
};

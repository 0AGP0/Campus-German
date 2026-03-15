const crypto = require('crypto');

const COOKIE_NAME = 'admin_session';

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
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

function getSessionCookie(req) {
  const raw = req.headers.cookie || '';
  const match = raw.split(';').map(s => s.trim()).find(s => s.startsWith(COOKIE_NAME + '='));
  return match ? match.slice(COOKIE_NAME.length + 1) : null;
}

function requireAuth(req, res) {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  const cookie = getSessionCookie(req);
  if (!secret || !cookie || !verifySession(cookie, secret)) {
    res.status(401).json({ error: 'Oturum gerekli' });
    return false;
  }
  return true;
}

module.exports = { requireAuth, getSessionCookie };
module.exports.COOKIE_NAME = COOKIE_NAME;

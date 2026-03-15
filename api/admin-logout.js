const { COOKIE_NAME } = require('./lib-auth.js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ ok: true });
};

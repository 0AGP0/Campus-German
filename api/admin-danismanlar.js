const { requireAuth } = require('./lib-auth.js');

const GITHUB_API = 'https://api.github.com';
const CONTENT_DIR = 'src/content/danismanlar';

function getRepo() {
  const repo = process.env.GITHUB_REPO || '';
  const [owner, name] = repo.split('/');
  return { owner: owner?.trim(), name: name?.trim() };
}

async function gh(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN yok');
  const { owner, name } = getRepo();
  if (!owner || !name) throw new Error('GITHUB_REPO yok (owner/repo)');
  const url = `${GITHUB_API}/repos/${owner}/${name}/contents/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `GitHub ${res.status}`);
  }
  return res.json();
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  const yaml = match[1];
  const body = match[2].trim();
  const data = {};
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*["']?([^"'\n]*)["']?$/);
    if (m) data[m[1]] = m[2].trim();
  }
  return { data, body };
}

function buildMd(data, body) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(data)) {
    if (v != null && v !== '') lines.push(`${k}: "${String(v).replace(/"/g, '\\"')}"`);
  }
  lines.push('---', '');
  lines.push(body || '');
  return lines.join('\n');
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (!requireAuth(req, res)) return;

  if (req.method === 'GET') {
    try {
      const list = await gh(CONTENT_DIR);
      if (!Array.isArray(list)) {
        res.status(200).json([]);
        return;
      }
      const mdFiles = list.filter(f => f.name.endsWith('.md'));
      const out = [];
      for (const f of mdFiles) {
        const file = await gh(`${CONTENT_DIR}/${f.name}`);
        const raw = Buffer.from(file.content, 'base64').toString('utf8');
        const { data, body } = parseFrontmatter(raw);
        out.push({
          slug: f.name.replace(/\.md$/, ''),
          name: data.name || '',
          title: data.title || '',
          email: data.email || '',
          whatsapp: data.whatsapp || '',
          photo: data.photo || '',
          body: body || '',
        });
      }
      res.status(200).json(out);
    } catch (e) {
      res.status(500).json({ error: e.message || 'Liste alınamadı' });
    }
    return;
  }

  if (req.method === 'POST') {
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      res.status(400).json({ error: 'Geçersiz JSON' });
      return;
    }
    const slug = (body.slug || '').replace(/[^a-z0-9-]/gi, '') || 'danisman';
    const filename = `${slug}.md`;
    const data = {
      name: body.name || '',
      title: body.title || '',
      email: body.email || '',
      whatsapp: (body.whatsapp || '').replace(/\D/g, ''),
      photo: body.photo || '',
    };
    const mdBody = body.body || '';
    const content = buildMd(data, mdBody);
    const contentB64 = Buffer.from(content, 'utf8').toString('base64');

    try {
      const path = `${CONTENT_DIR}/${filename}`;
      let sha;
      try {
        const existing = await gh(path);
        sha = existing.sha;
      } catch {
        sha = null;
      }
      await gh(path, {
        method: 'PUT',
        body: JSON.stringify({
          message: sha ? `Güncelle: ${filename}` : `Ekle: ${filename}`,
          content: contentB64,
          sha: sha || undefined,
        }),
      });
      res.status(200).json({ ok: true, slug });
    } catch (e) {
      res.status(500).json({ error: e.message || 'Kayıt yazılamadı' });
    }
    return;
  }

  if (req.method === 'DELETE') {
    const slug = (req.query?.slug || '').replace(/[^a-z0-9-]/gi, '');
    if (!slug) {
      res.status(400).json({ error: 'slug gerekli' });
      return;
    }
    try {
      const path = `${CONTENT_DIR}/${slug}.md`;
      const file = await gh(path);
      await gh(path, {
        method: 'DELETE',
        body: JSON.stringify({ message: `Sil: ${slug}.md`, sha: file.sha }),
      });
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message || 'Silinemedi' });
    }
    return;
  }

  res.status(405).end();
};

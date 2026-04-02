/**
 * Kurs frontmatter CTA href'lerini kök /booking ve /reservar yerine dil önekli /{lang}/buchung yapar.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/kurslar');
let n = 0;

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.md')) continue;
  const fp = path.join(dir, f);
  let s = fs.readFileSync(fp, 'utf8');
  const orig = s;

  if (f.endsWith('.es.md')) {
    s = s.replace(/href:\s*"\/reservar"/g, 'href: "/es/buchung"');
  } else if (f.endsWith('.en.md')) {
    s = s.replace(/href:\s*"\/booking"/g, 'href: "/en/buchung"');
  } else if (f.endsWith('.de.md')) {
    s = s.replace(/href:\s*"\/booking"/g, 'href: "/de/buchung"');
  } else if (/^[^.]+\.md$/.test(f)) {
    s = s.replace(/href:\s*"\/booking"/g, 'href: "/tr/buchung"');
  }

  if (s !== orig) {
    fs.writeFileSync(fp, s);
    n++;
  }
}

console.log('Updated', n, 'files');

<?php
$dataDir = __DIR__ . '/data';
$danismanDir = $dataDir . '/danismanlar';
$slug = isset($_GET['slug']) ? preg_replace('/[^a-z0-9-]/', '', strtolower((string)$_GET['slug'])) : '';

// Rezerve slug'lar (site dil/panel yolları) danışman sayfasına gitmesin
$reserved = ['de', 'tr', 'en', 'es', 'admin', 'kurse', 'courses', 'cursos', 'kurslar', 'kontakt', 'contact', 'iletisim', 'contacto', 'buchung', 'impressum', 'datenschutz', 'legal', 'sitemap', 'robots', 'index'];
if ($slug === '' || in_array($slug, $reserved, true) || !is_file($danismanDir . '/' . $slug . '.md')) {
    header('Location: /de/');
    exit;
}

$raw = file_get_contents($danismanDir . '/' . $slug . '.md');
if (!preg_match('/^---\s*\n(.*?)\n---\s*\n(.*)$/s', $raw, $m)) {
    header('Location: /de/');
    exit;
}
$data = [];
foreach (preg_split('/\r?\n/', trim($m[1])) as $line) {
    if (preg_match('/^(\w+):\s*["\']?(.*?)["\']?\s*$/', trim($line), $mm))
        $data[$mm[1]] = trim($mm[2], '"\' ');
}
$body = trim($m[2]);
$name = htmlspecialchars($data['name'] ?? '');
$title = htmlspecialchars($data['title'] ?? '');
$email = htmlspecialchars($data['email'] ?? '');
$whatsapp = preg_replace('/\D/', '', $data['whatsapp'] ?? '');
$photo = trim($data['photo'] ?? '');
$location = trim($data['location'] ?? '');
$waHref = 'https://wa.me/' . $whatsapp;
$mailHref = 'mailto:' . $email;
$bioHtml = $body !== '' ? '<p class="text-slate-600 leading-relaxed mt-6">' . nl2br(htmlspecialchars($body)) . '</p>' : '';

header('Content-Type: text/html; charset=utf-8');
?><!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo $name; ?> – Campus German</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: { primary: '#0cc0df', 'primary-dark': '#0aa5c0' },
          fontFamily: { display: ['Public Sans', 'sans-serif'] }
        }
      }
    }
  </script>
  <style>.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24}</style>
</head>
<body class="bg-[#F8FAFC] font-display text-slate-800 antialiased min-h-screen flex items-center justify-center p-4 md:p-6">
  <div class="max-w-xl w-full bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
    <div class="relative h-40 bg-[#0cc0df]">
      <div class="absolute -bottom-16 left-1/2 -translate-x-1/2">
        <?php if ($photo !== ''): ?>
        <div class="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl bg-slate-200">
          <img alt="" class="w-full h-full object-cover" src="<?php echo htmlspecialchars($photo); ?>">
        </div>
        <?php else: ?>
        <div class="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl bg-[rgba(12,192,223,0.25)] flex items-center justify-center">
          <span class="material-symbols-outlined text-5xl text-[#0cc0df]">person</span>
        </div>
        <?php endif; ?>
      </div>
    </div>
    <div class="pt-20 pb-10 px-6 md:px-8 text-center">
      <h1 class="text-2xl md:text-3xl font-black text-slate-800 tracking-tight"><?php echo $name; ?></h1>
      <p class="text-[#0cc0df] font-bold uppercase tracking-widest text-xs mt-1"><?php echo $title; ?></p>
      <?php echo $bioHtml; ?>
      <div class="mt-8 space-y-3">
        <a href="<?php echo htmlspecialchars($waHref); ?>" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-3 w-full py-4 bg-slate-50 hover:bg-[rgba(12,192,223,0.08)] text-slate-700 rounded-2xl transition-all border border-slate-100">
          <svg class="w-6 h-6 text-[#0cc0df]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span class="font-semibold text-sm">WhatsApp</span>
        </a>
        <a href="<?php echo htmlspecialchars($mailHref); ?>" class="flex items-center justify-center gap-3 w-full py-4 bg-slate-50 hover:bg-[rgba(12,192,223,0.08)] text-slate-700 rounded-2xl transition-all border border-slate-100">
          <span class="material-symbols-outlined text-[#0cc0df]">mail</span>
          <span class="font-semibold text-sm"><?php echo $email; ?></span>
        </a>
        <?php if ($location !== ''): ?>
        <div class="flex items-center justify-center gap-3 w-full py-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span class="material-symbols-outlined text-[#0cc0df]">location_on</span>
          <span class="font-semibold text-sm text-slate-700"><?php echo htmlspecialchars($location); ?></span>
        </div>
        <?php endif; ?>
      </div>
    </div>
    <div class="bg-slate-50 py-5 text-center border-t border-slate-100">
      <a href="/de/" class="inline-block">
        <img src="/German_logo.webp" alt="Campus German" class="h-8 w-auto mx-auto object-contain opacity-90 hover:opacity-100 transition-opacity">
      </a>
      <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Campus German</p>
    </div>
  </div>
</body>
</html>

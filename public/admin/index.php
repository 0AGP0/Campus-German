<?php
session_start();
$dataDir = dirname(__DIR__) . '/data';
$configFile = $dataDir . '/config.php';
$danismanDir = $dataDir . '/danismanlar';

if (!is_dir($danismanDir)) {
    mkdir($danismanDir, 0755, true);
}

function loadConfig($path) {
    if (!file_exists($path)) return null;
    $c = include $path;
    return is_array($c) ? $c : null;
}

function parseMd($path) {
    if (!is_file($path)) return ['data' => [], 'body' => ''];
    $raw = file_get_contents($path);
    if (!preg_match('/^---\s*\n(.*?)\n---\s*\n(.*)$/s', $raw, $m)) return ['data' => [], 'body' => $raw];
    $data = [];
    foreach (preg_split('/\r?\n/', trim($m[1])) as $line) {
        if (preg_match('/^(\w+):\s*["\']?(.*?)["\']?\s*$/', trim($line), $mm))
            $data[$mm[1]] = trim($mm[2], '"\' ');
    }
    return ['data' => $data, 'body' => trim($m[2])];
}

function buildMd($data, $body) {
    $lines = ['---'];
    foreach ($data as $k => $v) {
        if ($v !== '' && $v !== null)
            $lines[] = $k . ': "' . str_replace(['\\', '"'], ['\\\\', '\\"'], $v) . '"';
    }
    $lines[] = '---';
    $lines[] = '';
    $lines[] = $body;
    return implode("\n", $lines);
}

$config = loadConfig($configFile);
$loggedIn = !empty($_SESSION['admin']);

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: ' . (dirname($_SERVER['SCRIPT_NAME']) ?: '/admin') . '/');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $user = trim((string)($_POST['username'] ?? ''));
    $pass = (string)($_POST['password'] ?? '');
    if ($config && $user !== '' && $user === $config['user'] && $pass === $config['pass']) {
        $_SESSION['admin'] = true;
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit;
    }
    $loginError = 'Kullanıcı adı veya şifre hatalı.';
}

if ($loggedIn && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_danisman'])) {
    $slug = preg_replace('/[^a-z0-9-]/', '', strtolower(trim((string)($_POST['slug'] ?? 'danisman'))));
    if ($slug === '') $slug = 'danisman';
    $data = [
        'name' => trim((string)($_POST['name'] ?? '')),
        'title' => trim((string)($_POST['title'] ?? '')),
        'email' => trim((string)($_POST['email'] ?? '')),
        'whatsapp' => preg_replace('/\D/', '', (string)($_POST['whatsapp'] ?? '')),
        'photo' => trim((string)($_POST['photo'] ?? '')),
        'location' => trim((string)($_POST['location'] ?? '')),
    ];
    $body = trim((string)($_POST['body'] ?? ''));
    $path = $danismanDir . '/' . $slug . '.md';
    file_put_contents($path, buildMd($data, $body));
    header('Location: ' . $_SERVER['REQUEST_URI'] . '?saved=1');
    exit;
}

if ($loggedIn && isset($_GET['delete'])) {
    $slug = preg_replace('/[^a-z0-9-]/', '', (string)$_GET['delete']);
    if ($slug !== '' && is_file($danismanDir . '/' . $slug . '.md')) {
        unlink($danismanDir . '/' . $slug . '.md');
    }
    header('Location: ' . preg_replace('/&?delete=[^&]*/', '', $_SERVER['REQUEST_URI']));
    exit;
}

$list = [];
if (is_dir($danismanDir)) {
    foreach (glob($danismanDir . '/*.md') as $f) {
        $slug = basename($f, '.md');
        $list[$slug] = parseMd($f);
    }
}
ksort($list);

if (!$config) {
    header('Content-Type: text/html; charset=utf-8');
    ?>
<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Kurulum – Campus German Admin</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<script>tailwind.config={theme:{extend:{colors:{primary:'#0cc0df'},fontFamily:{display:['Public Sans']}}}}</script>
</head>
<body class="bg-slate-100 min-h-screen flex items-center justify-center p-6 font-display">
<div class="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
<h1 class="text-xl font-bold text-slate-800 mb-4">Admin panel kurulumu</h1>
<p class="text-slate-600 text-sm mb-4"><strong>data/config.php</strong> dosyası yok. Şunları yapın:</p>
<ol class="list-decimal list-inside text-sm text-slate-600 space-y-2">
<li>Sunucuda <code class="bg-slate-100 px-1 rounded">data/config.example.php</code> dosyasını <code class="bg-slate-100 px-1 rounded">config.php</code> olarak kopyalayın.</li>
<li>İçinde <code class="bg-slate-100 px-1 rounded">user</code> ve <code class="bg-slate-100 px-1 rounded">pass</code> değerlerini kendi giriş bilgilerinizle değiştirin.</li>
<li>Bu sayfayı yenileyin.</li>
</ol>
</div>
</body></html>
<?php
    exit;
}

if (!$loggedIn) {
    header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Giriş – Campus German Admin</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <script>tailwind.config={theme:{extend:{colors:{primary:'#0cc0df'},fontFamily:{display:['Public Sans']}}}}</script>
</head>
<body class="bg-[#F1F5F9] min-h-screen flex items-center justify-center p-6 font-display">
  <div class="w-full max-w-md">
    <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
      <div class="flex items-center gap-3 mb-6">
        <img src="/German_logo.webp" alt="Campus German" class="w-12 h-12 object-contain">
        <div>
          <p class="text-[#0cc0df] text-xs font-bold uppercase tracking-widest">Campus German</p>
          <h1 class="text-xl font-bold text-slate-800">Admin girişi</h1>
        </div>
      </div>
      <form method="post">
        <input type="hidden" name="login" value="1">
        <div class="mb-4">
          <label class="block text-sm font-semibold text-slate-600 mb-1">Kullanıcı adı</label>
          <input type="text" name="username" required autocomplete="username" placeholder="Kullanıcı adınız" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] focus:border-[#0cc0df] outline-none transition-all">
        </div>
        <div class="mb-5">
          <label class="block text-sm font-semibold text-slate-600 mb-1">Şifre</label>
          <input type="password" name="password" required autocomplete="current-password" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] focus:border-[#0cc0df] outline-none transition-all">
        </div>
        <button type="submit" class="w-full py-3.5 rounded-xl bg-[#0cc0df] hover:bg-[#0aa5c0] text-white font-semibold shadow-lg transition-all">Giriş yap</button>
      </form>
      <?php if (!empty($loginError)) echo '<p class="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">' . htmlspecialchars($loginError) . '</p>'; ?>
    </div>
  </div>
</body>
</html>
<?php
    exit;
}

$editSlug = isset($_GET['edit']) ? preg_replace('/[^a-z0-9-]/', '', (string)$_GET['edit']) : null;
$edit = $editSlug && isset($list[$editSlug]) ? $list[$editSlug] : null;
$baseUrl = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') ?: '/admin';
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Danışmanlar – Campus German Admin</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
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
<body class="bg-[#F1F5F9] font-display text-slate-800 min-h-screen">
  <div class="flex flex-col md:flex-row min-h-screen overflow-hidden">
    <aside class="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex-shrink-0">
      <div class="p-6 flex items-center gap-3">
        <img src="/German_logo.webp" alt="Campus German" class="w-10 h-10 object-contain">
        <div>
          <h1 class="text-lg font-bold leading-tight text-slate-800">Admin Paneli</h1>
          <p class="text-xs text-slate-500">Campus German</p>
        </div>
      </div>
      <nav class="px-4 space-y-1 pb-4">
        <a href="<?php echo htmlspecialchars($baseUrl); ?>" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[rgba(12,192,223,0.12)] text-[#0cc0df] font-semibold">
          <span class="material-symbols-outlined text-xl">group</span>
          <span class="text-sm">Danışmanlar</span>
        </a>
      </nav>
      <div class="p-4 border-t border-slate-200">
        <a href="#form" id="btnYeniDanisman" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0cc0df] py-3 text-sm font-bold text-white shadow-lg hover:bg-[#0aa5c0] transition-all">
          <span class="material-symbols-outlined text-lg">add</span>
          <span>Yeni Danışman Ekle</span>
        </a>
      </div>
    </aside>
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header class="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
        <h2 class="text-lg md:text-xl font-bold text-slate-800">Danışman Yönetimi</h2>
        <a href="?logout=1" class="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors">
          <span class="material-symbols-outlined text-xl">logout</span>
          <span>Çıkış</span>
        </a>
      </header>
      <div class="flex-1 overflow-y-auto p-4 md:p-8">
        <?php if (!empty($_GET['saved'])): ?>
        <div class="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          Kaydedildi. Kartvizit sayfası güncellendi.
        </div>
        <?php endif; ?>
        <section id="form" class="form-section bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8 <?php echo $edit ? '' : 'hidden'; ?>">
          <div class="p-6 border-b border-slate-200">
            <h3 class="text-lg font-bold text-slate-800"><?php echo $edit ? 'Danışmanı düzenle' : 'Yeni danışman ekle'; ?></h3>
          </div>
          <form method="post" class="p-6 space-y-4">
            <input type="hidden" name="save_danisman" value="1">
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1">URL slug</label>
              <input type="text" name="slug" id="slugInput" value="<?php echo $edit ? htmlspecialchars($editSlug) : ''; ?>" placeholder="akif" pattern="[a-z0-9-]+" required <?php echo $edit ? 'readonly' : ''; ?> class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] focus:border-[#0cc0df] outline-none <?php echo $edit ? 'bg-slate-50' : ''; ?>">
              <p class="mt-1 text-xs text-slate-500">Sayfa: campusgerman.com/<strong id="slugPreview" class="text-[#0cc0df]"><?php echo $edit ? htmlspecialchars($editSlug) : '…'; ?></strong></p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-600 mb-1">Ad Soyad</label>
                <input type="text" name="name" value="<?php echo $edit ? htmlspecialchars($edit['data']['name'] ?? '') : ''; ?>" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] outline-none">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-600 mb-1">Ünvan</label>
                <input type="text" name="title" value="<?php echo $edit ? htmlspecialchars($edit['data']['title'] ?? '') : ''; ?>" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] outline-none">
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-600 mb-1">E-posta</label>
                <input type="email" name="email" value="<?php echo $edit ? htmlspecialchars($edit['data']['email'] ?? '') : ''; ?>" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] outline-none">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-600 mb-1">WhatsApp (sadece rakam)</label>
                <input type="text" name="whatsapp" value="<?php echo $edit ? htmlspecialchars($edit['data']['whatsapp'] ?? '') : ''; ?>" placeholder="4915203823792" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] outline-none">
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1">Konum <span class="font-normal text-slate-400">(isteğe bağlı)</span></label>
              <input type="text" name="location" value="<?php echo $edit ? htmlspecialchars($edit['data']['location'] ?? '') : ''; ?>" placeholder="Örn. Bremen, Almanya" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1">Fotoğraf URL <span class="font-normal text-slate-400">(isteğe bağlı)</span></label>
              <input type="text" name="photo" value="<?php echo $edit ? htmlspecialchars($edit['data']['photo'] ?? '') : ''; ?>" placeholder="/images/danismanlar/foto.jpg" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-600 mb-1">Kısa metin <span class="font-normal text-slate-400">(isteğe bağlı)</span></label>
              <textarea name="body" placeholder="Danışman hakkında birkaç cümle..." rows="3" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[rgba(12,192,223,0.3)] outline-none resize-y"><?php echo $edit ? htmlspecialchars($edit['body'] ?? '') : ''; ?></textarea>
            </div>
            <div class="flex flex-wrap gap-3 pt-2">
              <button type="submit" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0cc0df] hover:bg-[#0aa5c0] text-white font-semibold shadow-lg transition-all">
                <span class="material-symbols-outlined text-lg">save</span>
                <?php echo $edit ? 'Güncelle' : 'Kaydet'; ?>
              </button>
              <?php if ($edit): ?>
              <a href="<?php echo htmlspecialchars($baseUrl); ?>" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                İptal / Listeye dön
              </a>
              <?php endif; ?>
            </div>
          </form>
        </section>
        <section id="listSection" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden <?php echo $edit ? 'hidden' : ''; ?>">
          <div class="p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-4">
            <h3 class="text-lg font-bold text-slate-800">Danışman Listesi</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-slate-50">
                <tr>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">İsim / E-posta</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ünvan</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Sayfa</th>
                  <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Aksiyonlar</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <?php
                if (empty($list)) {
                  echo '<tr><td colspan="4" class="px-6 py-12 text-center text-slate-500">Henüz danışman yok. &quot;Yeni Danışman Ekle&quot; ile ekleyin.</td></tr>';
                } else {
                  foreach ($list as $s => $d) {
                    $dn = htmlspecialchars($d['data']['name'] ?? $s);
                    $de = htmlspecialchars($d['data']['email'] ?? '');
                    $dt = htmlspecialchars($d['data']['title'] ?? '');
                    echo '<tr class="hover:bg-slate-50/50 transition-colors">';
                    echo '<td class="px-6 py-4"><div><p class="font-semibold text-sm text-slate-800">' . $dn . '</p><p class="text-xs text-slate-500">' . $de . '</p></div></td>';
                    echo '<td class="px-6 py-4"><span class="text-sm font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">' . $dt . '</span></td>';
                    echo '<td class="px-6 py-4 text-sm text-slate-500">/' . htmlspecialchars($s) . '</td>';
                    echo '<td class="px-6 py-4 text-right"><div class="flex items-center justify-end gap-1">';
                    echo '<a href="?edit=' . urlencode($s) . '#form" class="p-2 text-slate-400 hover:text-[#0cc0df] transition-colors rounded-lg hover:bg-[rgba(12,192,223,0.1)]" title="Düzenle"><span class="material-symbols-outlined text-[20px]">edit</span></a>';
                    echo '<a href="?delete=' . urlencode($s) . '" onclick="return confirm(\'Silmek istediğinize emin misiniz?\')" class="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50" title="Sil"><span class="material-symbols-outlined text-[20px]">delete</span></a>';
                    echo '</div></td></tr>';
                  }
                }
                ?>
              </tbody>
            </table>
          </div>
          <?php if (!empty($list)): ?>
          <div class="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <p>Toplam <?php echo count($list); ?> danışman</p>
          </div>
          <?php endif; ?>
        </section>
      </div>
    </main>
  </div>
  <script>
    (function(){
      var i=document.getElementById('slugInput'), p=document.getElementById('slugPreview');
      if(i&&p&&!i.readOnly) i.addEventListener('input',function(){ p.textContent=this.value||'…'; });
      var formSection=document.getElementById('form');
      var btnYeni=document.getElementById('btnYeniDanisman');
      var listSection=document.getElementById('listSection');
      function showForm(){ if(formSection){ formSection.classList.remove('hidden'); if(listSection) listSection.classList.add('hidden'); formSection.scrollIntoView({behavior:'smooth',block:'start'}); } }
      if(btnYeni) btnYeni.addEventListener('click',function(e){ e.preventDefault(); showForm(); });
      if(window.location.hash==='#form') showForm();
      if(formSection&&formSection.classList.contains('hidden')&&listSection) listSection.classList.remove('hidden');
    })();
  </script>
</body>
</html>

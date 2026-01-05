# 🎓 CampusGerman - Astro Website

Modern, hızlı ve SEO-optimized Almanca dil kursu websitesi.

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build

# Build'i önizle
npm run preview
```

## 📂 Proje Yapısı

```
campusgerman-astro/
├── src/
│   ├── components/      # Reusable components (Header, Footer, Modal)
│   ├── content/         # Content collections (Kurslar, Hizmetler, vb.)
│   ├── data/           # Data files (coursePricing.ts)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── styles/         # CSS files
│   └── utils/          # Utility functions
├── public/             # Static assets
└── dist/              # Build output (gitignore'da)
```

## 🌐 Özellikler

- ✅ Multi-language support (TR/DE)
- ✅ Static Site Generation (SSG)
- ✅ SEO optimized
- ✅ Responsive design
- ✅ Form submissions (Make.com webhook)
- ✅ Custom success/error modals
- ✅ German URL structure

## 📝 Teknolojiler

- **Astro** - Static site generator
- **TypeScript** - Type safety
- **Content Collections** - Markdown content management

## 🔧 Geliştirme

### Yeni Sayfa Ekleme
Sayfalar `src/pages/` klasörüne eklenir. Astro otomatik olarak routing yapar.

### İçerik Düzenleme
İçerikler `src/content/` klasöründeki markdown dosyalarında tutulur.

### Stil Değişiklikleri
Global stiller: `src/styles/global.css`  
Sayfa özel stiller: `src/styles/pages/`

## 🚢 Deployment

Build edilmiş dosyalar `dist/` klasöründe oluşur. Bu klasörü public HTML klasörüne yükleyin.

```bash
npm run build
# dist/ klasöründeki dosyaları public HTML'e yükleyin
```

## 📄 Lisans

Private project - CampusGerman

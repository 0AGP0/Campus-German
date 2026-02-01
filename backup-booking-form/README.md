# Booking Form – Yedek (Backup)

Bu klasör, **booking form** yeniden düzenlenmeden önce alınan yedekleri içerir.

## Dosyalar

| Dosya | Orijinal konum | Açıklama |
|-------|----------------|----------|
| `buchung.astro.backup` | `src/pages/[lang]/buchung.astro` | Rezervasyon sayfası (4 adımlı form: Kurs, Ek Hizmetler, Kişisel Bilgiler, Onay) |
| `buchung.css.backup` | `src/styles/pages/buchung.css` | Rezervasyon sayfası stilleri |

## Yedek tarihi

Yedek, yeni booking form yapısına geçmeden hemen önce alındı.

## Geri yükleme

Eski yapıyı geri getirmek için:

1. `buchung.astro.backup` → `src/pages/[lang]/buchung.astro` olarak kopyalayın.
2. `buchung.css.backup` → `src/styles/pages/buchung.css` olarak kopyalayın.

Örnek (PowerShell, proje kökünden):

```powershell
Copy-Item -LiteralPath "backup-booking-form\buchung.astro.backup" -Destination "src\pages\[lang]\buchung.astro"
Copy-Item "backup-booking-form\buchung.css.backup" -Destination "src\styles\pages\buchung.css"
```

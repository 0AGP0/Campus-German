# Kurs Rezervasyonu Sayfası İçeriği

## Sayfa Bilgileri
- **Sayfa Adı:** Kurs Rezervasyonu
- **Dosya Yolu:** `src/pages/[lang]/buchung.astro`
- **Dil:** Türkçe

---

## Hero Bölümü

### Başlık
Kurs Rezervasyonu

### Açıklama
CampusGerman ile Almanya'da eğitiminizi planlayın. Adım adım rehberlik ile rezervasyonunuzu tamamlayın.

---

## Form Adımları

### Adım 1: Kurs
**Başlık:** Kurs Bilgileri
**Açıklama:** Almanca kurs detaylarınızı belirleyin

**Form Alanları:**
- **Okul:** Okul seçiniz (Bremen, Online, Hybrid)
- **Kurs Tipi:** Kurs tipi seçiniz
  - Yoğun Kurs
  - Üniversite Hazırlık Programı
  - Sınav Hazırlığı
  - Haftalık Yoğun Almanca Kursu
- **Süre (Hafta):** Süre seçiniz (4, 8, 12, 16, 24 hafta)
- **Başlamak istediğin seviye:** Seviye seçiniz (A1.1, A1.2, A2.1, A2.2, B1.1, B1.2, B2.1, B2.2, C1.1, C1.2)
- **Başlamak istediğin tarih:** Önce seviye seçiniz (Seviye seçtikten sonra tarihler görünecektir)

**Devam Bilgisi:**
Seçtiğiniz seviyeden sonra eğitiminize devam etmek ister misiniz? Uygun bir üst seviyedeki kursları birlikte planlayabiliriz.

**Devam Etmek İstediğin Diğer Seviyeler:** (Checkbox listesi)

---

### Adım 2: Ek Hizmetler
**Başlık:** Ek Hizmetler
**Açıklama:** İsteğe bağlı hizmetleri seçiniz

**Havaalanı Transferi:**
- Bremen Havaalanı → Bremen Merkez İstasyonu (100 €)
- Bremen Merkez İstasyonu → Bremen Havaalanı (100 €)

**Vize Destek Belgeleri:**
- Vize Davet Mektubu (+50 €)

**Konaklama:**
- Geldiğinizde konaklama yerine ihtiyacınız var mı? (Evet/Hayır)

**Konaklama Detayları (Evet seçilirse):**
- **Konaklama Türü:**
  - Tek Kişilik Oda (Einzelzimmer)
  - Paylaşımlı Oda (Doppelzimmer)
  - Sadece Konaklama Yol Haritası
- **Süre:** Süre seçiniz (1 Ay, 2 Ay)

**Bilgilendirme:**
Dil kursu kaydı tamamlandıktan sonra Konaklama kaydı ve ödeme tamamlanacaktır. Kurstan başlangıç tarihinden 1 gün önceki iş günü konut teslimi yapılacaktır.

---

### Adım 3: Kişisel Bilgiler
**Başlık:** Kişisel Bilgiler
**Açıklama:** Kişisel bilgilerinizi giriniz

**Form Alanları:**
- **Ad:** Adınızı giriniz
- **Soyad:** Soyadınızı giriniz
- **Cinsiyet:** Kadın / Erkek
- **Doğum Tarihi:** (Tarih seçici)
- **Uyruk:** Uyruğunuzu giriniz
- **Pasaport Numarası:** Pasaport numaranızı giriniz
- **Almanca Seviyesi:** Seviye seçiniz
  - Hiç Bilmiyorum
  - A1, A2, B1, B2, C1, C2
- **Acil Durum Kişisi:** Ad Soyad
- **Acil Durum E-posta:** e-posta@example.com
- **Acil Durum Telefon:** +90 XXX XXX XX XX

---

### Adım 4: Onay ve Gönderim
**Başlık:** Onay ve Gönderim
**Açıklama:** Bilgilerinizi kontrol edin ve onaylayın

**Rezervasyon Özeti:**
- Kurs Bilgileri
- Konaklama Bilgileri (varsa)
- Fiyat Detayları

**Onay Kutuları:**
- Genel Hüküm ve Koşullar'ı okudum ve kabul ediyorum *
- Kişisel Verilerin Korunması hakkındaki bilgilendirmeyi okudum ve kabul ediyorum *

**Butonlar:**
- Geri
- Rezervasyonu Tamamla

---

## Fiyat Hesaplaması

**Başlık:** Fiyat Hesaplaması
**Açıklama:** Anlık fiyat güncellemesi

**Kurs Ücretleri:**
- Kayıt ücreti: 50 €
- Kurs tipi: (Seçime göre)
- Süre: (Seçime göre)

**Konaklama Ücretleri (varsa):**
- Konaklama tipi: (Seçime göre)

**Ek Hizmetler (varsa):**
- Havaalanı Transferi: 100 €
- Vize Destek Belgeleri: 50 €

**Toplam:** (Otomatik hesaplanır)

**Önemli Notlar:**
Fiyatlar tahminidir. Sezon, şehir ve özel durumlar için ek ücretler uygulanabilir.

---

## Notlar
- Bu sayfa içeriği `src/pages/[lang]/buchung.astro` dosyasından çıkarılmıştır.
- Bu bir form sayfasıdır, içerik yazıcı form alanlarının etiketlerini ve açıklamalarını düzenleyebilir.
- Form mantığı ve işlevselliği değiştirilmemelidir.


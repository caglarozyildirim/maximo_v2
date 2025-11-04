# HURDA (Asset Retirement) - HIZLI REFERANS GUİDI

## ÖZET
- **Modül Adı:** Asset Retirement (Hurda) - Screen 25 AR
- **Toplam Form Alanı:** ~70 alan
- **Zorunlu Alan Sayısı:** ~45 alan
- **Opsiyonel Alan Sayısı:** ~25 alan
- **Approval Seviyesi:** 4 (Maliyet Merkezi, Teknik Şef, Bakım Müdürü, Muhasebe)

---

## 1. EN ÖNEMLİ ALANLAR (Critical Fields)

| Alan Adı | İngilizce | Tip | Zorunlu | Not |
|----------|-----------|-----|---------|-----|
| SAP Varlık No | SAP asset number | Text | Evet | SAP'ten Otomatik |
| Hurda Yöntemi | Retirement Method | Dropdown | Evet | Selling/Scrapping/Donation |
| Maliyet Merkezi | Cost Center | Lookup | Evet | SAP Entegre |
| Hurda Nedeni | Reason | Textarea | Evet | Açıklama Gerekli |
| Satış Fiyatı | Selling Prize | Currency | Koşullu | Sadece Selling seçilirse |
| Fatura Formu | Invoice Request form filled | Checkbox | Koşullu | Satış yönteminde gerekli |

---

## 2. DROPDOWN SEÇENEKLERİ (Select Options)

### Hurda Yöntemi (Retirement Method)
```
1. Selling (Satış)
2. Scrapping (Hurdaya Ayırma)
3. Donation (Bağış)
4. Write-off (Silinme)
```

### Durum (Status)
```
- Waiting (Beklemede)
- In Progress (İşlemde)
- Approved (Onaylandı)
- Rejected (Reddedildi)
- Completed (Tamamlandı)
```

### Mali Onay Seçenekleri
```
- Approve (Onay)
- Reject (Reddet)
- Reevaluate (Yeniden Değerlendir)
```

---

## 3. ZORUNLU ONAYLAR (Required Approvals)

```
Adım 1: İstek Oluştur
  ↓
Adım 2: Maliyet Merkezi Sorumlusu Onayı
  - Alan: Approval from cost center responsible (Checkbox)
  - Tarih: Approval from cost center responsible date time (Datetime)
  ↓
Adım 3: Teknik Şef (SL-Engineer) Onayı
  - Alan: Approval from SL-Engineer (Checkbox)
  - Koşul: Bakım varlık ID varsa
  ↓
Adım 4: Bakım Müdürü Onayı
  - Alan: Approval of Maintenance manager (Checkbox)
  ↓
Adım 5: Mali/Muhasebe Onayı
  - Alan: Asset Retirement Accounting Approval (Checkbox)
  - Seçenek: Approve / Reject / Reevaluate
  - Reevaluate: Tarih + Açıklama gerekir
  ↓
Adım 6: Fiziksel Hurda Onayı
  - Alan: Physical Retirement approval (Checkbox)
  - Not: "Not yet Required" (Gelecek)
  ↓
Adım 7: Rapor Yazdır
  - Screen: Asset Retirement Printout (Screen 26)
```

---

## 4. SAP ENTEGRE ALANLAR (Auto-Filled from SAP)

### Varlık Bilgileri
- SAP Varlık Numarası (SAP asset number)
- SAP Varlık Adı (SAP asset title)
- Üretici Adı (Producer name)
- Üretici Modeli (Producer model name)
- Üretici Seri Numarası (Producer serial number)

### Mali Bilgiler - IFRS
- IFRS Amortisman Anahtarı (IFRS Depreciation key)
- IFRS Faydalı Ömrü (IFRS Useful life)
- IFRS Aktifleştirme Tarihi (IFRS Capitalization date)
- IFRS Para Birimi (IFRS Currency) - örn: EUR
- IFRS Cari APC (IFRS Current APC)
- IFRS Birikmiş Amortisman (IFRS Accumulated depreciation)
- IFRS Cari Defter Değeri (IFRS Current booking Value)

### Mali Bilgiler - Yerel Standart
- Yerel Amortisman Anahtarı (Local Depreciation key)
- Yerel Faydalı Ömrü (Local Useful life)
- Yerel Para Birimi (Local Currency)
- Yerel Cari APC (Local Current APC)
- Yerel Birikmiş Amortisman (Local Accumulated depreciation)
- Yerel Cari Defter Değeri (Local Current booking value)

### Maliyet Merkezi Bilgileri
- Maliyet Merkezi (Cost Center)
- Sınıf (Class)
- PSP Unsuru (PSP Element)

---

## 5. KOŞULLı GÖRÜNÜRLÜK (Conditional Visibility)

### Satış Yöntemi Seçilirse
```
IF Retirement Method = "Selling" THEN
  - Satış Fiyatı (Selling Prize) - SHOW & REQUIRED
  - Fatura Formu (Invoice Request form filled) - SHOW & REQUIRED
  - Para Birimi (EUR, USD, etc.) - SHOW & REQUIRED
```

### Bakım Varlık ID Varsa
```
IF Maintenance asset ID EXISTS THEN
  - Teknik Şef Onayı (SL-Engineer Approval) - SHOW & REQUIRED
```

### Muhasebe Onayında "Reevaluate" Seçilirse
```
IF Accounting Approval = "Reevaluate" THEN
  - Yeniden Değerlendirme Tarihi (Reevaluation date) - SHOW & REQUIRED
  - Yeniden Değerlendirme Açıklaması (Reevaluation Explanation) - SHOW & REQUIRED
```

---

## 6. KULLANıCI BİLGİ ALANLAR (User Info Fields)

| Alan | İngilizce | Otomatik Doldur | Format |
|------|-----------|-----------------|--------|
| İstek Oluşturan | Request created by user info | Evet | **23 - Yasin Taşdelen - FIPC |
| İstek Yapan | Requestor user info | Evet/Manuel | **23 - [Name] - [Dept] |
| Maliyet Merkezi Sorumlusu | Cost Center Asset Responsible info | Evet | **23 - Yasin Taşdelen - FIPC |
| Maliyet Merkezi Onaylayan | Cost Center responsible info | Evet | **23 - Yasin Taşdelen - FIPC |
| Teknik Şef Onaylayan | SL-Engineer Approver | Manuel | **23 - [Name] - [Dept] |
| Bakım Müdürü Onaylayan | Maintenance manager Approver | Manuel | **23 - [Name] - [Dept] |
| Mali Onaylayan | Accounting Approver | Manuel | **23 - Yasin Taşdelen - FIPC |
| Fiziksel Hurda Onaylayan | Physical Retirement Approver | Manuel | **23 - Yasin Taşdelen - FIPC |

---

## 7. TARİH/ZAMAN ALANLAR (Date/Time Fields)

| Alan | Format | Otomatik | Not |
|------|--------|----------|-----|
| SAP Veri Alış Tarihi | YYYY-MM-DD HH:MM:SS | Evet | Read-only |
| İstek Oluşturma Tarihi | YYYY-MM-DD HH:MM:SS | Evet | Read-only |
| Maliyet Merkezi Onay Tarihi | YYYY-MM-DD HH:MM:SS | Evet | Onay sırasında |
| Teknik Şef Onay Tarihi | YYYY-MM-DD HH:MM:SS | Evet | Onay sırasında |
| Bakım Müdürü Onay Tarihi | YYYY-MM-DD HH:MM:SS | Evet | Onay sırasında |
| Mali Onay Tarihi | YYYY-MM-DD HH:MM:SS | Evet | Onay sırasında |
| Fiziksel Hurda Onay Tarihi | YYYY-MM-DD HH:MM:SS | Evet | Onay sırasında |
| Yeniden Değerlendirme Tarihi | YYYY-MM-DD | Manuel | Koşullu |

---

## 8. PARA BİRİMİ VE FINANSAL ALANLAR

### Para Birimleri (Currencies)
- EUR (Avro)
- USD (ABD Doları)
- TRY (Türk Lirası)
- (SAP'ten dinamik olarak yüklenebilir)

### Finansal Alanlar (Read-Only from SAP)
- IFRS Current Booking Value (IFRS Cari Defter Değeri)
- IFRS APC (IFRS Cari Maliyet Fiyatı)
- IFRS Accumulated Depreciation (IFRS Birikmiş Amortisman)
- Local Current Booking Value (Yerel Cari Defter Değeri)
- Local APC (Yerel Cari Maliyet Fiyatı)
- Local Accumulated Depreciation (Yerel Birikmiş Amortisman)

### Giriş Alanları (User Input)
- Selling Prize (Satış Fiyatı) - Sadece Selling yönteminde

---

## 9. BELGELENDİRME (Documentation)

### Dokümantasyon Alanı
- **Alan:** Documents (Belgeler Bölümü)
- **Tip:** Attachment Grid / Tablo
- **Sütunlar:**
  - ID: Belge ID'si
  - Type: Belge türü (PDF, DOC, DOCX, etc.)
  - Title: Belge başlığı
  - Creation Date time: Oluşturma tarihi

### Belge Ekleme
- **Alan:** Add Document (Belge Ekle Butonu)
- **Fonksiyon:** Belgeler ekleme
- **Desteklenen:** PDF, DOCX, XLSX, JPG, PNG, vb.

---

## 10. HATA KONTROLÜ VE DOĞRULAMA (Validation Rules)

### Zorunlu Alan Kontrolleri
```
IF Retirement Method boş THEN Hata: "Hurda Yöntemi seçilmelidir"
IF Reason boş THEN Hata: "Nedeni açıklamalısınız"
IF Retirement Method = "Selling" AND Selling Prize boş THEN Hata: "Satış Fiyatı zorunludur"
IF Retirement Method = "Selling" AND Invoice form NOT checked THEN Hata: "Fatura formu işaretlenmelidir"
```

### Mali Validasyon
```
IF Selling Prize < 0 THEN Hata: "Satış Fiyatı negatif olamaz"
IF Reevaluation date < Today THEN Hata: "Yeniden değerlendirme tarihi gelecekte olmalı"
```

### Workflow Validasyon
```
IF Status = "Waiting" THEN Onay Bekle
IF Status = "Approved" THEN Yazdırmaya Aç
IF Status = "Rejected" THEN İstek Reddedildi, İşlem Durdur
```

---

## 11. EKRAN YAPISI (Screen Layout)

### Ekran 25 AR - Hurda Talebini Oluştur
```
┌─────────────────────────────────────────────────────────────┐
│ ASSET RETIREMENT REQUEST FORM                               │
│ Status: [Waiting] │ Request ID: [Auto]                     │
├──────────────────────────┬──────────────────────────────────┤
│ BASIC INFORMATION        │ RETIREMENT METHOD                │
│ SAP Asset Number: [____] │ Method: [Dropdown: Selling] ▼    │
│ SAP Asset Title: [____]  │ Selling Price: [100000] EUR      │
│ Maintenance Asset: [____]│ Invoice Form: [X]                │
│ Producer: [__________]   │                                  │
│                          │                                  │
├──────────────────────────┴──────────────────────────────────┤
│ REASON FOR RETIREMENT                                       │
│ [_____________________________________________________]      │
│                                                              │
├────────────────────────────────────────────────────────────┤
│ APPROVALS SECTION                                          │
│ Step 2: Cost Center Approval  [ ] Date: [____] By: [____] │
│ Step 3: Engineer Approval     [ ] Date: [____] By: [____] │
│ Step 4: Manager Approval      [ ] Date: [____] By: [____] │
│ Step 5: Accounting Approval   [ ] Date: [____] By: [____] │
│ Step 6: Physical Retirement   [ ] Date: [____] By: [____] │
│                                                              │
├────────────────────────────────────────────────────────────┤
│ [Save] [Submit] [Print] [Cancel]                           │
└────────────────────────────────────────────────────────────┘
```

---

## 12. İŞ AKIŞI KONTROL LİSTESİ (Workflow Checklist)

- [ ] İstek Oluştur ve tüm zorunlu alanları doldur
- [ ] Hurda yöntemini seç (Selling/Scrapping/Donation)
- [ ] Nedeni açıkla (Reason)
- [ ] Gerekli belgeleri yükle (Fatura formu eğer Satış ise)
- [ ] İşleme gönder (Submit)
- [ ] Maliyet Merkezi Sorumlusu Onayını Bekle
- [ ] Teknik Şef Onayını Bekle (eğer bakım varlığı varsa)
- [ ] Bakım Müdürü Onayını Bekle
- [ ] Mali Onayı Bekle
  - [ ] Onay veya
  - [ ] Yeniden Değerlendirme Tarihi + Açıklama
- [ ] Fiziksel Hurda Onayını Bekle
- [ ] Rapor Yazdır (Print)
- [ ] Kapatma İşlemini Tamamla

---

## 13. ÖZEL NOTLAR (Special Notes)

1. **SAP Entegrasyonu:** Çoğu varlık bilgisi otomatik olarak SAP'ten gelir, manuel olarak değiştirilmez.

2. **Fiziksel Hurda Onayı:** Şu an "Not yet Required" konumundadır, gelecekte etkinleştirilecektir.

3. **Yeniden Değerlendirme:** Muhasebe onay aşamasında talep edilebilir, bu durumda tarih ve açıklama zorunludur.

4. **Satış Yöntemi:** Seçilirse, satış fiyatı ve fatura formu kaydı zorunlu olur.

5. **Maliyet Merkezi:** Varlığın hangi maliyet merkezine ait olduğu önemlidir, onay rotasını belirler.

---

## 14. DOSYA KAYNAKLARI

- Detaylı Rapor: `/ASSET_RETIREMENT_FORM_FIELDS.md`
- JSON Veriler: `/complete_requirements.json`
- Gereksinimler: `/COMPREHENSIVE_REQUIREMENTS_REPORT.json`

---

**Son Güncelleme:** 2025-11-04  
**Versiyon:** 1.0

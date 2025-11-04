# ASSET RETIREMENT (HURDA) - FORM ALANLAR VE GEREKSINIMLER RAPORU

## MUHASEBE TARIHİ
**Hazırlama Tarihi:** 2025-11-04  
**Kaynak:** Desktop/new/ klasöründeki dokümantasyon ve JSON gereksinim dosyaları

---

## 1. HURDA OLUŞTURMA FORMU (Asset Retirement Form - Screen 25 AR)

### 1.1 TEMEL VARLıK BİLGİSİ (Basic Asset Information)

#### **SAP Entegrasyonu - Zorunlu Alanlar**
- **SAP Varlık Numarası** (SAP asset number)
  - Tip: Text / Number
  - Zorunlu: Evet (1)
  - Kapsamı: Tüm ekranlarda (Oluşturma, Onay, Yazdırma)
  - SAP'ten otomatik doldurulur

- **SAP Varlık Adı** (SAP asset title)
  - Tip: Text
  - Zorunlu: Evet (1)
  - Kapsamı: Tüm ekranlarda
  - SAP'ten otomatik doldurulur

- **Bakım Varlık ID** (Maintenance asset ID)
  - Tip: Text / Number
  - Zorunlu: Evet (1)
  - Kapsamı: Tüm ekranlarda
  - Sistem tarafından otomatik oluşturulur

- **Bakım Varlık Adı** (Maintenance asset title)
  - Tip: Text
  - Zorunlu: Evet (1)
  - Kapsamı: Tüm ekranlarda
  - SAP'ten otomatik doldurulur

#### **Varlık Detayları - Zorunlu Alanlar**
- **Üretici Modeli Adı** (Producer model name)
  - Tip: Text
  - Zorunlu: Evet (1)
  - Kapsamı: Tüm ekranlarda

- **Üretici Adı** (Producer name)
  - Tip: Text
  - Zorunlu: Evet (1)
  - Kapsamı: Tüm ekranlarda

- **Üretici Seri Numarası** (Producer serial number)
  - Tip: Text
  - Zorunlu: Evet (1)
  - Kapsamı: Tüm ekranlarda

#### **Eski Numara Bilgileri - Opsiyonel**
- **Eski SAP Numarası** (Old asset number)
  - Tip: Text
  - Zorunlu: Hayır
  - Yapılandırma: Varsayılan aşama

- **Varlık Açıklaması** (Asset explanation)
  - Tip: Text/Textarea
  - Zorunlu: Hayır
  - Opsiyonel Alan

---

### 1.2 MUHASEBE / FINANSAL BİLGİSİ (Accounting Information)

#### **IFRS Standartları Uyarınca - Bilgi Alanları**
- **IFRS Amortisman Anahtarı** (IFRS Depreciation key)
  - Tip: Text
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik

- **IFRS Faydalı Ömrü** (IFRS Useful life)
  - Tip: Number
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik

- **IFRS Aktifleştirme Tarihi** (IFRS Capitalization date)
  - Tip: Date
  - Zorunlu: Evet (1)
  - Formatt: YYYY-MM-DD
  - SAP Entegrasyon: Otomatik

- **IFRS Para Birimi** (IFRS Currency)
  - Tip: Select/Dropdown
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Örnek: EUR

- **IFRS Cari Maliyet Fiyatı (APC)** (IFRS Current APC)
  - Tip: Number / Currency
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Hesap Okur Yazara Yalnızca Okunabilir

- **IFRS Birikmiş Amortisman** (IFRS Accumulated depreciation)
  - Tip: Number / Currency
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Hesap Okur Yazara Yalnızca Okunabilir

- **IFRS Cari Defter Değeri** (IFRS Current booking Value)
  - Tip: Number / Currency
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Hesap Okur Yazara Yalnızca Okunabilir

#### **Yerel Standartlar Uyarınca - Bilgi Alanları**
- **Yerel Amortisman Anahtarı** (Local Depreciation key)
  - Tip: Text
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik

- **Yerel Faydalı Ömrü** (Local Useful life)
  - Tip: Number
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik

- **Yerel Para Birimi** (Local Currency)
  - Tip: Select/Dropdown
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik

- **Yerel Cari APC** (Local Current APC)
  - Tip: Number / Currency
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Yalnızca Okunabilir

- **Yerel Birikmiş Amortisman** (Local Accumulated depreciation)
  - Tip: Number / Currency
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Yalnızca Okunabilir

- **Yerel Cari Defter Değeri** (Local Current booking value)
  - Tip: Number / Currency
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Yalnızca Okunabilir

---

### 1.3 MALİYET MERKEZİ BİLGİSİ (Cost Center Information)

- **Maliyet Merkezi** (Cost Center)
  - Tip: Select/Dropdown - Lookup
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Görüntüleme: Ekran 25 (Detay görünümü)

- **Maliyet Merkezi Başlığı** (Cost Center Title)
  - Tip: Text
  - Zorunlu: Hayır
  - Otomatik Doldurulur: Maliyet Merkezi seçilince
  - SAP Entegrasyon: Otomatik

- **Sınıf** (Class)
  - Tip: Select/Dropdown
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik

- **PSP Unsuru** (PSP – Element)
  - Tip: Text/Select
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik

---

### 1.4 HURDA YÖNTEMİ BİLGİSİ (Retirement Method Information)

#### **Hurda Yöntemi - Zorunlu Alan**
- **Hurda Yöntemi** (Retirement Method)
  - Tip: Select / Radio Button
  - Zorunlu: Evet (1)
  - **Dropdown Seçenekleri:**
    - "Selling" (Satış)
    - "Scrapping" (Hurdaya Ayırma)
    - "Donation" (Bağış) - İhtiyaç durumunda
    - "Write-off" (Silinme/İptal) - İhtiyaç durumunda

#### **Satış Yöntemi Seçildiğinde - Koşullu Alanlar**
- **Satış Fiyatı** (Selling Prize)
  - Tip: Number / Currency
  - Zorunlu: Evet (Eğer Retirement Method = "Selling")
  - Örnek Değer: 100000
  - Para Birimi: EUR
  - **Koşul (Conditional):** "Only visible if 'Retirement method' Selling is selected"

- **Fatura İsteme Formu Dolduruldu** (Invoice Request form filled)
  - Tip: Checkbox / Boolean
  - Zorunlu: Evet (Eğer Retirement Method = "Selling")
  - **Koşul (Conditional):** "Only visible if 'Retirement method' Selling is selected"
  - İşaretle: X (Onay)

---

### 1.5 İŞLEM BİLGİSİ (Process Information)

- **İstek ID'si** (Request Id)
  - Tip: Auto-generated ID
  - Zorunlu: Evet
  - Sistem Tarafından: Otomatik oluşturulur
  - Dıştaki Ekranda (Screen 25): Görüntülenir

- **Durum** (Status)
  - Tip: Select/Dropdown (Read-only)
  - Zorunlu: Evet
  - **Durum Seçenekleri:**
    - "Waiting" (Beklemede)
    - "In Progress" (İşlemde)
    - "Approved" (Onaylandı)
    - "Rejected" (Reddedildi)
    - "Completed" (Tamamlandı)
  - Örnek: "Waiting"

- **Hurda Nedeni** (Reason)
  - Tip: Text / Textarea
  - Zorunlu: Evet (1)
  - Minimum Boyut: Anlamlı açıklama
  - Örnek: "Lorem ipsum dolor sit amet consectetur adipiscing elit..."

- **SAP Veri Alış Tarihi/Saati** (SAP data received date time)
  - Tip: Datetime
  - Zorunlu: Evet (1)
  - Format: YYYY-MM-DD HH:MM:SS
  - SAP Entegrasyon: Otomatik
  - Yalnızca Okunabilir

- **İstek Oluşturma Tarihi/Saati** (Request creation date time)
  - Tip: Datetime
  - Zorunlu: Evet (1)
  - Format: YYYY-MM-DD HH:MM:SS
  - Sistem Tarafından: Otomatik
  - Yalnızca Okunabilir

---

### 1.6 KULLANICI / AYJıLIK BİLGİSİ (User Information)

- **İstek Oluşturan** (Request created by user info)
  - Tip: User Lookup
  - Zorunlu: Evet (1)
  - Otomatik Doldurulur: Oturum açan kullanıcı
  - Format: **[UserID] - [Name] - [Department]**
  - Örnek: **23 - Yasin Taşdelen - FIPC

- **Adına Oluşturan** (Created by on behalf to user info)
  - Tip: User Lookup
  - Zorunlu: Hayır
  - Opsiyonel: Kullanıcı başkası adına talep oluşturabilirse

- **Adına Oluşturuldu** (Request created by on behalf of user info)
  - Tip: User Lookup
  - Zorunlu: Hayır
  - Opsiyonel: Kullanıcı başkası adına talep oluşturabilirse

- **Atanan Kişi** (Assigned to user info)
  - Tip: User Lookup
  - Zorunlu: Hayır
  - Atanma işlemi sırasında doldurulur

- **İstek Yapan Kişi** (Requestor user info)
  - Tip: User Lookup
  - Zorunlu: Evet (1)
  - Otomatik veya Manuel Doldurulur

- **Maliyet Merkezi Sorumlusu Bilgileri** (Cost Center Asset Responsible info)
  - Tip: User Lookup
  - Zorunlu: Evet (1)
  - SAP Entegrasyon: Otomatik
  - Varsayılan Onaylayıcı

---

## 2. HURDA ONAY SÜRECİ (Asset Retirement Approval Process)

### 2.1 ONAY AKIŞI (Approval Flow)

```
1. Hurda Talebini Oluştur
   ↓
2. Maliyet Merkezi Sorumlusu Onayı
   ↓
3. Teknik Şef (SL-Engineer) Onayı
   ↓
4. Bakım Müdürü Onayı
   ↓
5. Muhasebe/Mali Kurallar Onayı
   ├─ Onay
   └─ Yeniden Değerlendirme (Reevaluate)
   ↓
6. Fiziksel Hurda Onayı
   ↓
7. Hurda Raporu Yazdırma
```

### 2.2 ONAY ALANLAR (Approval Fields)

#### **Adım 2: Maliyet Merkezi Sorumlusu Onayı (Cost Center Responsible Approval)**

- **Maliyet Merkezi Sorumlusu Onayı** (Approval from cost center responsible)
  - Tip: Checkbox / Boolean
  - Zorunlu: Evet (Adım 2)
  - Durum: 1 = Onaylandı

- **Onay Tarihi/Saati** (Approval from cost center responsible date time)
  - Tip: Datetime
  - Zorunlu: Evet (Onaylandığında)
  - Sistem Tarafından: Otomatik kaydedilir
  - Format: YYYY-MM-DD HH:MM:SS

- **Onaylayan Kişi Bilgileri** (Cost Center responsible info)
  - Tip: User Lookup
  - Zorunlu: Evet
  - Format: **[UserID] - [Name] - [Department]**
  - Örnek: **23 - Yasin Taşdelen - FIPC

#### **Adım 3: Teknik Şef Onayı (SL-Engineer Approval)**

- **Teknik Şeften Onay** (Approval from SL-Engineer)
  - Tip: Checkbox / Boolean
  - Zorunlu: Evet (Adım 3)
  - Durum: 1 = Onaylandı

- **Onay Tarihi/Saati** (Approval from SL-Engineer date time)
  - Tip: Datetime
  - Zorunlu: Evet (Onaylandığında)
  - Sistem Tarafından: Otomatik kaydedilir

- **Onaylayan Kişi Bilgileri** (Approval from SL-Engineer user info)
  - Tip: User Lookup
  - Zorunlu: Evet
  - **Not:** "Will be visible if asset has maintenance asset Id"
  - Format: **[UserID] - [Name] - [Department]**

#### **Adım 4: Bakım Müdürü Onayı (Maintenance Manager Approval)**

- **Bakım Müdürü Onayı** (Approval of Maintenance manager)
  - Tip: Checkbox / Boolean
  - Zorunlu: Evet (Adım 4)
  - Durum: 1 = Onaylandı

- **Onay Tarihi/Saati** (Approval of Maintenance manager date time)
  - Tip: Datetime
  - Zorunlu: Evet (Onaylandığında)
  - Sistem Tarafından: Otomatik kaydedilir

- **Onaylayan Kişi Bilgileri** (Approval of Maintenance manager user info)
  - Tip: User Lookup
  - Zorunlu: Evet
  - Format: **[UserID] - [Name] - [Department]**

#### **Adım 5: Mali/Muhasebe Onayı (Accounting Approval)**

- **Mali Onay Tipi** (Approval Type)
  - Tip: Hidden/System Field
  - Değer: "Accounting Approval"

- **Muhasebe Onayı** (Asset Retirement Accounting Approval)
  - Tip: Checkbox / Boolean
  - Zorunlu: Evet (Adım 5a)
  - Durum: 1 = Onaylandı

- **Mali Onay Tarihi/Saati** (Asset Retirement Accounting Approval date time)
  - Tip: Datetime
  - Zorunlu: Evet (Onaylandığında)
  - Format: YYYY-MM-DD HH:MM:SS

- **Mali Onaylayan Bilgileri** (Asset Retirement Accounting Approval user info)
  - Tip: User Lookup
  - Zorunlu: Evet
  - Format: **[UserID] - [Name] - [Department]**
  - Onaylayıcı: **23 - Yasin Taşdelen - FIPC

- **Yeniden Değerlendirme Tarihi** (Reevaluation date)
  - Tip: Date
  - Zorunlu: Hayır
  - **Koşul:** Sadece "Reevaluate" seçeneği seçilirse
  - Format: YYYY-MM-DD
  - Örnek: 2025-09-15

- **Yeniden Değerlendirme Tarihi Ayarlayanlar** (Reevaluation date set by user info)
  - Tip: User Lookup
  - Zorunlu: Hayır
  - **Koşul:** Yeniden Değerlendirme Tarihi ayarlandığında
  - Format: **[UserID] - [Name] - [Department]**

- **Yeniden Değerlendirme Açıklaması** (Reevaluation Explanation)
  - Tip: Textarea
  - Zorunlu: Hayır
  - **Koşul:** "Reevaluate" seçeneği seçilirse
  - Minimum Boyut: Anlamlı açıklama
  - Örnek: "Lorem ipsum dolor sit amet consectetur adipiscing elit..."

**Mali Onay Seçenekleri (Approval Type - Accounting):**
- ✓ Onay (Approve)
- ✗ Reddet (Reject)
- ⏱ Yeniden Değerlendir (Reevaluate)

#### **Adım 6: Fiziksel Hurda Onayı (Physical Retirement Approval)**

- **Fiziksel Hurda Onayı** (Physical Retirement approval)
  - Tip: Checkbox / Boolean
  - Zorunlu: Evet (Adım 6)
  - Durum: 1 = Onaylandı

- **Fiziksel Hurda Onay Tarihi/Saati** (Physical Retirement approval date time)
  - Tip: Datetime
  - Zorunlu: Evet (Onaylandığında)
  - Format: YYYY-MM-DD HH:MM:SS
  - **Not:** "Not yet Required"

- **Fiziksel Hurda Onaylayan Bilgileri** (Physical Retirement approval user info)
  - Tip: User Lookup
  - Zorunlu: Evet
  - Format: **[UserID] - [Name] - [Department]**
  - Onaylayıcı: **23 - Yasin Taşdelen - FIPC

- **Onay Tipi** (Approval Type - Physical Retirement)
  - Tip: Hidden/System Field
  - Değer: "Physical Retirement"

---

## 3. BELGELER VE EKLER (Documents & Attachments)

### 3.1 Dokümantasyon Alanları

- **Belge Grubu ID** (Attachment group Id)
  - Tip: System ID
  - Zorunlu: Evet (1)
  - Otomatik Oluşturulur: Talep oluşturulduğunda

- **Belgeler Bölümü** (Documents)
  - Tip: Document/Attachment Grid
  - Zorunlu: Hayır (ancak Satış yöntemi için gerekliyse, fatura formu)
  - Sütunlar:
    - ID: Document identifier
    - Type: Belge türü
    - Title: Belge başlığı
    - Creation Date time: Oluşturma tarihi
  - **Tooltip:** "Attachment added by user info"

- **Belge Ekleme** (Add Document)
  - Tip: Button / Action
  - Fonksiyon: Yeni belge yükle
  - Desteklenen Formatlar: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, etc.

---

## 4. HURDA RAPORU YAZDIRMA (Asset Retirement Printout)

### 4.1 Yazdırılacak Bilgiler (Screen 26 ARP)

- **Hurda Yöntemi** (Retirement Method)
  - Varsayılan: Selling
  - Format: Yazdırma sayfasında görüntülenir

- **Satış Fiyatı** (Selling Prize)
  - Varsayılan: 100000 EUR
  - Format: Yazdırma sayfasında görüntülenir

- **Fiziksel Hurda Onayı Durumu**
  - Format: "Approval by **23 Yasin Taşdelen - FIPC not yet required"
  - Not: Onay durumu yazdırılır

---

## 5. HURDA LİSTESİ (Asset Retirement List - Screen 26 & 27)

- **Hurda Varlıkları Listesi** (List of retired assets)
  - Tip: Data Grid / Table
  - Zorunlu: Evet (Rapor Fonksiyonu)
  - Sütunlar: Tüm önemli alanlar görüntülenir
  - Filtreleme: Durum, Tarih Aralığı, vs.

---

## 6. BUSINESS KURALLAR (Business Rules)

### 6.1 Veri Entegrasyonu Kuralları
- **SAP Entegrasyon:** "SAP integration for Asset retirement information"
  - Varlık bilgileri SAP'ten otomatik alınır
  - Mali bilgiler SAP'ten otomatik alınır
  - Gerçek zamanlı senkronizasyon

- **Bakım Varlık Desteği:** "There is no need to keep asset information of the outside of the maintenance asset. Just retirement process is enough."
  - Bakım varlığı olmayan varlıklar işlenir
  - Bakım varlığı olan varlıklar ayrıca kontrol edilir

### 6.2 Mali Kurallar
- **IFRS ve Yerel Standart Uyumluluğu:** Aynı anda iki standar takip edilir
- **Amortisman Hesaplaması:** SAP'te hesaplandı, yazdırılır
- **Muhasebe Onayı:** Mali kurallar dahilinde onay zorunlu

### 6.3 Onay Kuralları
- **Zorunlu Onaylar:** 4 seviye onay (Cost Center, Engineer, Manager, Accounting)
- **Yeniden Değerlendirme:** Muhasebe Onayında reevaluate seçeneği varsa tarih ve açıklama girilir
- **Fiziksel Hurda Onayı:** "Not yet Required" - Gelecekte aktif olacak

### 6.4 Koşullu Görünürlük
- **Satış Fiyatı ve Fatura Formu:** Sadece "Selling" yöntemi seçilirse görüntülenir
- **Teknik Şef Onayı:** Sadece bakım varlık ID'si varsa görüntülenir
- **Reevaluation Alanları:** Sadece Muhasebe Onay aşamasında "Reevaluate" seçilirse

---

## 7. EKRAN HARİTASI (Screen Mapping)

| Screen | Kod | Ad | Kullanım |
|--------|-----|----|-|
| 25 AR | 25 | Asset Retirement | Hurda Talep Oluşturma (Tek Varlık) |
| 25 | 25 | Asset Retirement List View | Hurda Talebi Liste Görünümü + Detaylar |
| 26 ARP | 26 | Asset Retirement Printout | Hurda Talep Yazdırması |
| 27 | 27 | Asset Retirement List | Hurda Varlıkları Listesi (Rapor) |

---

## 8. ALAN TIPI ÖZETİ (Field Types Summary)

| Tip | Örnekler | Sayı |
|-----|----------|------|
| Text | SAP Varlık Adı, Üretici Adı, etc. | ~15 |
| Number/Currency | Satış Fiyatı, APC, Birikmiş Amortisman | ~8 |
| Date/Datetime | Tarihi Alanlar, Onay Tarihleri | ~12 |
| Select/Dropdown | Hurda Yöntemi, Sınıf, Para Birimi | ~5 |
| Checkbox/Boolean | Onay Alanları, Fatura Formu İşareti | ~5 |
| User Lookup | Onaylayıcılar, İstek Yapan, vs. | ~8 |
| Textarea | Nedeni, Reevaluation Açıklaması | ~2 |
| System ID | İstek ID, Belge Grubu ID | ~2 |
| Attachment | Dokümantasyon Grid | ~1 |

---

## 9. DEĞİŞKEN VE BAĞIMLILIKLAR (Dependencies)

```
Hurda Yöntemi = "Selling"
├─ Satış Fiyatı (Zorunlu)
├─ Para Birimi (Zorunlu)
└─ Fatura Formu (Zorunlu)

Bakım Varlık ID varsa
└─ Teknik Şef Onayı (Zorunlu)

Muhasebe Onayı = "Reevaluate"
├─ Yeniden Değerlendirme Tarihi (Zorunlu)
├─ Yeniden Değerlendirme Açıklaması (Zorunlu)
└─ Yeniden Değerlendirme Yapan (Otomatik)

İstek Tamamlanırsa
└─ Hurda Raporu Yazdırma (Kullanılabilir)
```

---

## 10. DOSYA KAYNAKLARI

- **/Users/caglarozyildirim/Desktop/new/Asset Retirement Printout.docx**
- **/Users/caglarozyildirim/Desktop/new/Data Structure.xlsx**
- **/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/COMPREHENSIVE_REQUIREMENTS_REPORT.json**
- **/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/detailed_requirements_complete.json**
- **/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/complete_requirements.json**


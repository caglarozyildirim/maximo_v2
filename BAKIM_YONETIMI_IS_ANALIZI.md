# BAKIM YÖNETİMİ UYGULAMASI İŞ ANALİZİ DOKÜMAN

## Döküman Bilgileri

**Proje Adı:** Bakım Yönetimi Sistemi (Maintenance Management Application)
**Analiz Tarihi:** 31 Ekim 2025
**Versiyon:** 1.0
**Hazırlayan:** Claude AI
**Amaç:** bakim-yonetim-app ve Desktop/new dokümanları arasındaki farkların tespit edilmesi ve eksik modüllerin belirlenmesi

---

## 1. GENEL BAKIŞ

Bu doküman, mevcut **bakim-yonetim-app** HTML uygulaması ile **Desktop/new** klasöründeki gereksinim dokümanları (Requirement Analysis, Screen Designs, Data Structure, Workflows, Use Cases) arasındaki farkları detaylı olarak analiz eder.

### 1.1. Karşılaştırılan Kaynaklar

| Kaynak | Konum | İçerik |
|--------|-------|--------|
| Mevcut Uygulama | bakim-yonetim-app/ | 15 HTML sayfası, CSS, JavaScript |
| Gereksinim Analizi | Desktop/new/Maintenance Management Application Requirement Analysis (Version1).docx | 1781 paragraf, 6 tablo |
| Ekran Tasarımları | Desktop/new/Screen Designs.xlsx | 47 sayfa, detaylı ekran tasarımları |
| Veri Yapıları | Desktop/new/Data Structure.xlsx | 39 sayfa, tablo tanımlamaları |
| İş Akışları | Desktop/new/Workflows/ | 7 adet VSDX dosyası |
| Use Case'ler | Desktop/new/Use Cases/ | Use case dokümanları |

---

## 2. MEVCUT UYGULAMA ANALİZİ

### 2.1. Mevcut HTML Sayfaları (15 Adet)

#### 2.1.1. Ana Sayfa
- **Dosya:** `index.html`
- **Açıklama:** Dashboard, istatistikler, grafikler, son aktiviteler

#### 2.1.2. İş Talebi Modülü (3 Sayfa) ✅
- `job-request-create.html` - Yeni iş talebi oluşturma
- `job-requests.html` - İş talepleri listesi
- `job-request-detail.html` - İş talebi detayı

#### 2.1.3. Varlık Yönetimi Modülü (3 Sayfa) ✅
- `asset-create.html` - Yeni varlık ekleme
- `assets.html` - Varlık listesi
- `asset-detail.html` - Varlık detayı

#### 2.1.4. Bakım Yönetimi Modülü (5 Sayfa) ✅
- `maintenance-create.html` - Bakım planı oluşturma
- `maintenance.html` - Bakım listesi
- `maintenance-detail.html` - Bakım detayı
- `maintenance-visit.html` - Bakım ziyareti
- `periodic-maintenance.html` - Periyodik bakım

#### 2.1.5. Olay Yönetimi Modülü (3 Sayfa) ✅
- `incident-create.html` - Olay bildirimi
- `incidents.html` - Olay listesi
- `incident-detail.html` - Olay detayı

#### 2.1.6. Raporlar Modülü (1 Sayfa) ✅
- `reports.html` - Raporlar sayfası

### 2.2. Mevcut Uygulamanın Özellikleri

✅ **Var Olan Özellikler:**
- Modern, responsive tasarım
- Dashboard ile genel durum görüntüleme
- Chart.js ile grafiksel raporlama
- Durum bazlı filtreleme
- Arama ve filtreleme fonksiyonları
- Modal dialog'lar
- Türkçe dil desteği
- Corporate (MAN) tasarım renkleri

---

## 3. DESKTOP/NEW DOKÜMANLARI ANALİZİ

### 3.1. Gereksinim Analizinde Belirtilen Modüller (10 Adet)

| # | Modül | Türkçe İsim | Durum |
|---|-------|-------------|-------|
| 1 | Job Request | İş Talebi | ✅ Mevcut (3/3 sayfa) |
| 2 | Asset Management | Varlık Yönetimi | ✅ Mevcut (3/3 sayfa) |
| 3 | Asset Assignment | Varlık Zimmeti | ❌ Eksik (0/3 sayfa) |
| 4 | Asset Retirement | Varlık Hurdaya Çıkarma | ❌ Eksik (0/3 sayfa) |
| 5 | Maintenance Management | Bakım Yönetimi | ✅ Mevcut (4/4 sayfa) |
| 6 | Periodic Maintenance | Periyodik Bakım | ⚠️ Kısmi (1/2 sayfa) |
| 7 | Incident Management | Olay Yönetimi | ✅ Mevcut (3/2 sayfa) |
| 8 | Cost Center Change | Masraf Merkezi Değişikliği | ❌ Eksik (0/2 sayfa) |
| 9 | Asset Groups | Varlık Grupları | ❌ Eksik (0/1 sayfa) |
| 10 | Reports | Raporlar | ⚠️ Kısmi (1/? sayfa) |

### 3.2. İş Akışları (Workflows)

Desktop/new/Workflows klasöründe 7 iş akışı tanımlanmış:

| # | İş Akışı | İlgili Modül | Durum |
|---|----------|--------------|-------|
| 1 | Work Flow of Job Request | İş Talebi | ❌ HTML'de yok |
| 2 | Work Flow of Asset Entry | Varlık Girişi | ❌ HTML'de yok |
| 3 | Work flow of asset assigment | Varlık Zimmeti | ❌ Modül yok |
| 4 | Work Flow Asset Retirement | Varlık Hurdaya Çıkarma | ❌ Modül yok |
| 5 | Work Flow of Maintenance | Bakım Yönetimi | ❌ HTML'de yok |
| 6 | Workflow of Incident Notification | Olay Bildirimi | ❌ HTML'de yok |
| 7 | Work Flow Cost Center Change | Masraf Merkezi Değişikliği | ❌ Modül yok |

**Not:** Hiçbir iş akışı mevcut HTML sayfalarında görsel olarak gösterilmiyor.

### 3.3. Veri Yapıları (Data Structures)

Desktop/new/Data Structure.xlsx dosyasında 39 farklı veri yapısı tanımlanmış. Ana tablolar:

| Tablo Adı | Alan Sayısı | Açıklama |
|-----------|-------------|----------|
| Job Req. | 35 | İş talebi bilgileri |
| Asset | 29 | Varlık bilgileri |
| Assigment | 25 | Varlık zimmet bilgileri |
| M. Req. | 23 | Bakım gereksinimleri |
| M. Duty | 21 | Bakım görevleri |
| Incident | 31 | Olay bilgileri |
| Asset Retirement | 32 | Varlık hurdaya çıkarma |
| Cost Center Change | 6 | Masraf merkezi değişikliği |
| User | 5 | Kullanıcı bilgileri |
| Department | - | Departman bilgileri |

---

## 4. FARKLAR ANALİZİ

### 4.1. Eksik Modüller ve Sayfalar

#### 4.1.1. ❌ Varlık Zimmeti (Asset Assignment) - TAM EKSİK

**Beklenen Sayfalar:**
- Asset Assignment Form (Varlık Zimmet Formu)
- Asset Assignment List (Zimmet Listesi)
- Asset Assignment Printout (Zimmet Yazdırma)

**İş Akışı:** Work flow of asset assigment.vsdx

**Veri Yapısı:** Assigment tablosu (25 alan)
- Request Id
- Asset Id
- Current holder user
- Current holder first manager
- Requested User Id
- Change Reason explanation
- Approval status
- vb.

**İş İhtiyacı:**
Varlıkların çalışanlara zimmetlenmesi, zimmet değişiklikleri, zimmet onay süreçleri ve zimmet formlarının yazdırılması kritik bir ihtiyaç.

---

#### 4.1.2. ❌ Varlık Hurdaya Çıkarma (Asset Retirement) - TAM EKSİK

**Beklenen Sayfalar:**
- Asset Retirement Form (Hurdaya Çıkarma Formu)
- Asset Retirement List (Hurdaya Çıkarma Listesi)
- Asset Retirement Printout (Hurdaya Çıkarma Yazdırma)

**İş Akışı:** Work Flow Asset Retirement.vsdx

**Veri Yapısı:** Asset Retirement tablosu (32 alan)
- Request Id
- Asset Id
- Retirement reason
- Retirement date
- Approval status
- Book value
- Scrap value
- vb.

**Desktop/new'de Özel Doküman:**
- Asset Retirement Printout.docx (45.3 KB)
- Asset Assignment Form.docx (32.7 KB)

**İş İhtiyacı:**
Kullanımdan kaldırılan veya eskiyen varlıkların sistemden çıkarılması, muhasebe kayıtlarının güncellenmesi ve onay süreçlerinin yönetimi.

---

#### 4.1.3. ❌ Masraf Merkezi Değişikliği (Cost Center Change) - TAM EKSİK

**Beklenen Sayfalar:**
- Cost Center Change Form (Masraf Merkezi Değişiklik Formu)
- Cost Center Change List (Değişiklik Listesi)

**İş Akışı:** Work Flow Cost Center Change.vsdx

**Veri Yapısı:** Cost Center Change tablosu (6 alan)

**İş İhtiyacı:**
Varlıkların masraf merkezleri arasında transfer edilmesi ve bu transferlerin muhasebe sistemine yansıtılması.

---

#### 4.1.4. ❌ Varlık Grupları (Asset Groups) - TAM EKSİK

**Beklenen Sayfalar:**
- Asset Group List (Varlık Grubu Listesi)
- Asset Group Management (Varlık Grubu Yönetimi)

**Veri Yapıları:**
- Asset Group header (6 alan)
- Asset Group item (8 alan)

**İş İhtiyacı:**
Varlıkların gruplar halinde yönetilmesi, toplu bakım planlaması, grup bazlı raporlama.

---

### 4.2. Eksik veya Yetersiz Özellikler

#### 4.2.1. ❌ İş Akışı Gösterimleri

**Durum:** Mevcut HTML sayfalarında hiçbir iş akışı gösterimi yok.

**Beklenen:**
- Her modülde ilgili iş akışının görsel gösterimi
- Mevcut süreç adımının vurgulanması
- Geçmiş adımların ve gelecek adımların gösterimi
- Approval (Onay) süreçlerinin net gösterimi

**Örnek İş Akışları:**
1. Job Request: Talep → Teknik Onay → İş Onayı → Planlama → Uygulama → Tamamlama
2. Asset Entry: Talep → Onay → Kayıt → Aktivasyon
3. Maintenance: Planlama → Onay → Atama → Uygulama → Tamamlama → Kapama

---

#### 4.2.2. ⚠️ Periyodik Bakım Modülü - KISMİ

**Mevcut:** periodic-maintenance.html (1 sayfa)

**Eksik:**
- Periodic Maintenance Requirement List (Periyodik Bakım Gereksinim Listesi)
- Otomatik bakım görevi oluşturma arayüzü
- Periyod tanımlama (günlük, haftalık, aylık, yıllık)
- Bakım şablonları

**Veri Yapısı:** M. Req. tablosu
- Period indicator (Day, Week, Month, Year)
- Period value
- Starting date
- Auto-generate tasks

---

#### 4.2.3. ⚠️ Raporlar Modülü - KISMİ

**Mevcut:** reports.html (basit sayfa)

**Screen Designs.xlsx'te belirtilen raporlar:**
Desktop/new dokümanlarında rapor ekranları henüz tasarlanmadığı belirtiliyor:
> "Reports or lists pages haven't designed yet. So you will see them empty."

**Beklenen Raporlar (gereksinim analizi dokümanına göre):**
- Varlık durumu raporları
- Bakım geçmişi raporları
- Maliyet raporları
- Zimmet raporları
- Olaylar raporu
- Periyodik bakım raporları

---

#### 4.2.4. ❌ Kullanıcı Yönetimi ve Yetkilendirme

**Eksik:**
- User Management sayfaları
- User Group Management
- Authorization Group Management
- Department Management
- User-Department Assignment

**Veri Yapıları (Data Structure.xlsx):**
- User (5 alan)
- Department
- User Department assignment
- User Group
- Auth. Group
- Auth. (Authorization)

**Locations and user groups.xlsx:** Desktop/new'de mevcut ancak HTML'de yok.

---

#### 4.2.5. ❌ Doküman Yönetimi

**Eksik:**
- Dokümane ekleme/görüntüleme
- Doküman grupları
- Doküman tipleri

**Veri Yapıları:**
- Document Group
- Document
- Document Types

---

#### 4.2.6. ❌ Yorum (Comment) Sistemi

**Eksik:**
- İş taleplerine yorum ekleme
- Varlıklara not ekleme
- Bakım görevlerine açıklama ekleme

**Veri Yapısı:** Comment tablosu

---

#### 4.2.7. ❌ "On Behalf" (Vekalet) Özelliği

**Eksik:**
- Başka bir kullanıcı adına işlem yapma
- Vekalet kayıtları

**Veri Yapıları:**
- on behalf
- on behalf log

---

### 4.3. Dil ve Terminoloji Farkları

#### 4.3.1. Desktop/new Dokümanları: İngilizce
- Job Request
- Asset Management
- Asset Assignment (Embezzlement)
- Maintenance
- Incident

#### 4.3.2. Mevcut HTML: Türkçe
- İş Talebi
- Varlık Yönetimi
- Varlık Zimmeti
- Bakım Yönetimi
- Olay Yönetimi

**Sonuç:** Türkçeleştirme başarılı şekilde yapılmış. ✅

---

## 5. VERİ YAPISI ANALİZİ

### 5.1. Ana Veri Tabloları Karşılaştırması

| Tablo | Desktop/new Alan Sayısı | HTML Kullanımı | Durum |
|-------|-------------------------|----------------|-------|
| Job Request | 35 | ✅ Kullanılıyor | Eksik alanlar olabilir |
| Asset | 29 | ✅ Kullanılıyor | Eksik alanlar olabilir |
| Assignment | 25 | ❌ Modül yok | Tamamen eksik |
| Maintenance Req. | 23 | ✅ Kullanılıyor | Kontrol edilmeli |
| Maintenance Duty | 21 | ✅ Kullanılıyor | Kontrol edilmeli |
| Maintenance Task | 11 | ⚠️ Kısmi | Detay eksik olabilir |
| Visit | 6 | ✅ Var | OK |
| Incident | 31 | ✅ Kullanılıyor | Eksik alanlar olabilir |
| Asset Retirement | 32 | ❌ Modül yok | Tamamen eksik |
| Cost Center Change | 6 | ❌ Modül yok | Tamamen eksik |

### 5.2. Önemli Eksik Alanlar (Tahmin)

Mevcut HTML'lerde eksik olabilecek kritik alanlar:

**Job Request:**
- Business Approval, Technical Approval alanları
- Cost, Cost Currency
- Planned Start/End dates
- Priority, Status fields

**Asset:**
- SAP integration fields (SAP Id, SAP Title)
- Book value, acquisition cost
- Depreciation information
- Location details
- Workstation information

**Incident:**
- Severity, Impact
- Resolution time
- Root cause analysis

---

## 6. İŞ AKIŞLARI (WORKFLOWS) DETAYI

### 6.1. İş Akışı Gereksinimleri

Desktop/new/Workflows klasöründe 7 iş akışı bulunuyor. Bu akışların HTML sayfalarında **görsel olarak gösterilmesi** gerekiyor.

### 6.2. Workflow Gösterim Önerileri

Her modülün detay sayfasında:

```
[Talep Oluşturuldu] → [Teknik Onay] → [İş Onayı] → [Planlama] → [Uygulama] → [Tamamlandı]
      (✓)                  (•)           ( )          ( )           ( )           ( )
```

- **✓**: Tamamlanmış adım (yeşil)
- **•**: Mevcut adım (mavi)
- **( )**: Bekleyen adım (gri)
- **✗**: Reddedilen adım (kırmızı)

---

## 7. ÖNCELİKLENDİRİLMİŞ EKLEMELER

### 7.1. Yüksek Öncelik (Kritik) 🔴

#### 7.1.1. Varlık Zimmeti Modülü
**Neden Kritik:**
- Varlık takibi için zorunlu
- Sorumluluk yönetimi
- Yasal gereklilik (zimmet formları)

**Sayfalar:**
1. `asset-assignment-create.html` - Zimmet oluşturma
2. `asset-assignments.html` - Zimmet listesi
3. `asset-assignment-detail.html` - Zimmet detayı
4. `asset-assignment-print.html` - Zimmet formu yazdırma

**İş Akışı:**
- Zimmet talebi → Mevcut zimmetli onayı → Yönetici onayı → Zimmet aktarımı

#### 7.1.2. Varlık Hurdaya Çıkarma Modülü
**Neden Kritik:**
- Muhasebe entegrasyonu
- Envanter doğruluğu
- Yasal gereklilik

**Sayfalar:**
1. `asset-retirement-create.html` - Hurdaya çıkarma talebi
2. `asset-retirements.html` - Hurdaya çıkarma listesi
3. `asset-retirement-detail.html` - Hurdaya çıkarma detayı
4. `asset-retirement-print.html` - Hurdaya çıkarma formu

**İş Akışı:**
- Talep → Teknik onay → Muhasebe onayı → İşlem → Tamamlama

#### 7.1.3. İş Akışı Gösterimleri
**Neden Kritik:**
- Kullanıcı deneyimi
- Süreç şeffaflığı
- Onay durumu takibi

**Eklenmeli:**
- Her detay sayfasında workflow gösterimi
- Status timeline component
- Approval button ve history

---

### 7.2. Orta Öncelik 🟡

#### 7.2.1. Masraf Merkezi Değişikliği
**Sayfalar:**
1. `cost-center-change-create.html`
2. `cost-center-changes.html`
3. `cost-center-change-detail.html`

#### 7.2.2. Varlık Grupları Yönetimi
**Sayfalar:**
1. `asset-groups.html`
2. `asset-group-detail.html`

#### 7.2.3. Periyodik Bakım İyileştirmeleri
**Eklemeler:**
- Periyodik bakım gereksinimleri listesi
- Otomatik görev oluşturma
- Bakım şablonları

#### 7.2.4. Kullanıcı ve Yetki Yönetimi
**Sayfalar:**
1. `users.html`
2. `user-detail.html`
3. `departments.html`
4. `user-groups.html`
5. `authorization-groups.html`

---

### 7.3. Düşük Öncelik 🟢

#### 7.3.1. Doküman Yönetimi
- Doküman ekleme/görüntüleme
- Doküman grupları

#### 7.3.2. Yorum Sistemi
- Kayıtlara yorum ekleme

#### 7.3.3. Vekalet (On Behalf) Özelliği
- Başkası adına işlem yapma

#### 7.3.4. Çoklu Dil Desteği
**Mevcut:** Türkçe
**Eklenebilir:** İngilizce, Almanca (MAN'ın merkezi Almanya)

**Veri Yapısı:** Language support tablosu mevcut

---

## 8. TEKNİK ÖNERİLER

### 8.1. Frontend İyileştirmeleri

#### 8.1.1. Workflow Component Ekle
```javascript
// workflow-component.js
class WorkflowTimeline {
  constructor(steps, currentStep) {
    this.steps = steps;
    this.currentStep = currentStep;
  }

  render() {
    // Timeline render logic
  }
}
```

#### 8.1.2. Form Validation İyileştir
- Desktop/new veri yapılarındaki alan tiplerini ve uzunlukları kontrol et
- Required/Optional field'leri doğru işaretle

#### 8.1.3. SAP Entegrasyon Alanları
- SAP Id, SAP Title alanlarını ekle
- SAP'den veri çekme mekanizması (API placeholder)

### 8.2. Backend Gereksinimleri

#### 8.2.1. Veritabanı Şeması
- Desktop/new Data Structure.xlsx'i baz alarak tam şema oluştur
- 39 tablo için migration scriptleri

#### 8.2.2. API Endpoint'leri
Eksik modüller için:
- `/api/assignments` - CRUD
- `/api/retirements` - CRUD
- `/api/cost-center-changes` - CRUD
- `/api/asset-groups` - CRUD
- `/api/users` - CRUD
- `/api/workflows/{id}/status` - Workflow status

#### 8.2.3. Onay Mekanizması
- Approval engine implementasyonu
- Email bildirimleri
- Approval history tracking

---

## 9. SONUÇ VE ÖNERİLER

### 9.1. Genel Değerlendirme

**✅ Güçlü Yönler:**
- Modern ve kullanıcı dostu arayüz
- Temel modüller (Job Request, Asset, Maintenance, Incident) mevcut
- Türkçe dil desteği başarılı
- Dashboard ve grafiksel raporlama

**❌ Eksiklikler:**
- 4 kritik modül tamamen eksik (Assignment, Retirement, Cost Center, Groups)
- İş akışı gösterimleri yok
- Kullanıcı ve yetki yönetimi eksik
- Doküman yönetimi yok

**⚠️ İyileştirme Gereken Alanlar:**
- Periyodik bakım modülü
- Raporlama modülü
- Veri yapılarında eksik alanlar

### 9.2. Tahmini Tamamlanma Oranı

| Kategori | Tamamlanma | Açıklama |
|----------|------------|----------|
| Temel Modüller | %50 | 5/10 modül mevcut |
| Sayfa Sayısı | %45 | 15/33 beklenen sayfa |
| İş Akışları | %0 | Hiçbir workflow gösterimi yok |
| Veri Yapıları | %40-50 | Eksik alanlar mevcut |
| **GENEL** | **%40-45** | Orta düzey tamamlanma |

### 9.3. Önerilen Uygulama Planı

#### Faz 1 (2-3 Hafta): Kritik Eksiklikler
1. Varlık Zimmeti modülü (3 sayfa + workflow)
2. Varlık Hurdaya Çıkarma modülü (4 sayfa + workflow)
3. Tüm sayfalara workflow gösterimi ekle

#### Faz 2 (2 Hafta): Orta Öncelik
4. Masraf Merkezi Değişikliği modülü
5. Varlık Grupları modülü
6. Periyodik Bakım iyileştirmeleri
7. Kullanıcı ve yetki yönetimi

#### Faz 3 (1-2 Hafta): Düşük Öncelik
8. Doküman yönetimi
9. Yorum sistemi
10. Vekalet özelliği
11. Gelişmiş raporlama

#### Faz 4 (1 Hafta): Finalizasyon
12. Veri yapılarını tam olarak Desktop/new'e göre düzenle
13. SAP entegrasyon hazırlıkları
14. Test ve iyileştirmeler

**Toplam Tahmini Süre:** 6-8 Hafta

---

## 10. DETAYLI SAYFA LİSTESİ

### 10.1. Mevcut Sayfalar (15) ✅

| # | Sayfa | Modül | Durum |
|---|-------|-------|-------|
| 1 | index.html | Dashboard | ✅ |
| 2 | job-request-create.html | İş Talebi | ✅ |
| 3 | job-requests.html | İş Talebi | ✅ |
| 4 | job-request-detail.html | İş Talebi | ✅ |
| 5 | asset-create.html | Varlık Yönetimi | ✅ |
| 6 | assets.html | Varlık Yönetimi | ✅ |
| 7 | asset-detail.html | Varlık Yönetimi | ✅ |
| 8 | maintenance-create.html | Bakım Yönetimi | ✅ |
| 9 | maintenance.html | Bakım Yönetimi | ✅ |
| 10 | maintenance-detail.html | Bakım Yönetimi | ✅ |
| 11 | maintenance-visit.html | Bakım Yönetimi | ✅ |
| 12 | periodic-maintenance.html | Periyodik Bakım | ✅ |
| 13 | incident-create.html | Olay Yönetimi | ✅ |
| 14 | incidents.html | Olay Yönetimi | ✅ |
| 15 | incident-detail.html | Olay Yönetimi | ✅ |

### 10.2. Eksik Sayfalar (18+) ❌

| # | Sayfa | Modül | Öncelik |
|---|-------|-------|---------|
| 16 | asset-assignment-create.html | Varlık Zimmeti | 🔴 Yüksek |
| 17 | asset-assignments.html | Varlık Zimmeti | 🔴 Yüksek |
| 18 | asset-assignment-detail.html | Varlık Zimmeti | 🔴 Yüksek |
| 19 | asset-assignment-print.html | Varlık Zimmeti | 🔴 Yüksek |
| 20 | asset-retirement-create.html | Varlık Hurdaya Çıkarma | 🔴 Yüksek |
| 21 | asset-retirements.html | Varlık Hurdaya Çıkarma | 🔴 Yüksek |
| 22 | asset-retirement-detail.html | Varlık Hurdaya Çıkarma | 🔴 Yüksek |
| 23 | asset-retirement-print.html | Varlık Hurdaya Çıkarma | 🔴 Yüksek |
| 24 | cost-center-change-create.html | Masraf Merkezi | 🟡 Orta |
| 25 | cost-center-changes.html | Masraf Merkezi | 🟡 Orta |
| 26 | cost-center-change-detail.html | Masraf Merkezi | 🟡 Orta |
| 27 | asset-groups.html | Varlık Grupları | 🟡 Orta |
| 28 | asset-group-detail.html | Varlık Grupları | 🟡 Orta |
| 29 | users.html | Kullanıcı Yönetimi | 🟡 Orta |
| 30 | user-detail.html | Kullanıcı Yönetimi | 🟡 Orta |
| 31 | departments.html | Kullanıcı Yönetimi | 🟡 Orta |
| 32 | user-groups.html | Kullanıcı Yönetimi | 🟡 Orta |
| 33 | authorization-groups.html | Kullanıcı Yönetimi | 🟡 Orta |

---

## 11. EKLER

### 11.1. Desktop/new Klasör Yapısı
```
Desktop/new/
├── Maintenance Management Application Requirement Analysis (Version1).docx (616.2 KB)
├── Screen Designs.xlsx (266.4 KB)
├── Data Structure.xlsx (157.2 KB)
├── Locations and user groups.xlsx (15.8 KB)
├── Asset Assignment Form.docx (32.7 KB)
├── Asset Retirement Printout.docx (44.3 KB)
├── Workflows/
│   ├── Work Flow Cost Center Change.vsdx
│   ├── Work Flow of Maintenance.vsdx
│   ├── Work Flow of Job Request.vsdx
│   ├── Work Flow of Asset Entry.vsdx
│   ├── Workflow of Incident Notification.vsdx
│   ├── Work Flow Asset Retirement.vsdx
│   └── Work flow of asset assigment.vsdx
└── Use Cases/
    ├── 1.a. Create Job Request.docx
    ├── Use Case Template.docx
    ├── Use Case Template.dotx
    └── Activities x Use Cases.xlsx
```

### 11.2. bakim-yonetim-app Klasör Yapısı
```
bakim-yonetim-app/
├── index.html
├── css/
│   └── style-corporate.css
├── js/
│   ├── data.js
│   └── main-updated.js
└── pages/
    ├── asset-create.html
    ├── asset-detail.html
    ├── assets.html
    ├── incident-create.html
    ├── incident-detail.html
    ├── incidents.html
    ├── job-request-create.html
    ├── job-request-detail.html
    ├── job-requests.html
    ├── maintenance-create.html
    ├── maintenance-detail.html
    ├── maintenance-visit.html
    ├── maintenance.html
    ├── periodic-maintenance.html
    └── reports.html
```

---

## DÖKÜMAN SONU

**Hazırlayan:** Claude AI
**Tarih:** 31 Ekim 2025
**Versiyon:** 1.0

---

## İletişim

Sorularınız için:
- **Proje Yöneticisi:** [İsim]
- **Teknik Lead:** [İsim]
- **Business Analyst:** Yasin Tasdelen (Desktop/new dokümanlarında belirtilmiş)
# MAN TÜRKİYE - BAKIM YÖNETİMİ UYGULAMASI
## MÜŞTERİ GEREKSİNİMLERİ - TÜRKÇE ÖZET

**Doküman Versiyonu:** 1.0
**Tarih:** 10 Ekim 2025
**Kaynak Dokümanlar:**
- Maintenance Management Application Requirement Analysis (draft).docx
- Data Structure.xlsx (37 sheet)
- Screen Designs.xlsx
- Use Cases klasörü (7 workflow diyagramı)

---

## 📋 İÇİNDEKİLER

1. [Proje Özeti](#1-proje-özeti)
2. [İş Talepleri Modülü](#2-iş-talepleri-modülü-job-request)
3. [Varlık Girişi Modülü](#3-varlık-girişi-modülü-asset-entry)
4. [Varlık Zimmet Modülü](#4-varlık-zimmet-modülü-asset-assignment)
5. [Bakım Yönetimi Modülü](#5-bakım-yönetimi-modülü-maintenance-management)
6. [Olay Yönetimi Modülü](#6-olay-yönetimi-modülü-incident-management)
7. [Maliyet Merkezi Değişikliği](#7-maliyet-merkezi-değişikliği-cost-center-change)
8. [Varlık Emekliliği](#8-varlık-emekliliği-asset-retirement)
9. [Teknik Gereksinimler](#9-teknik-gereksinimler)
10. [Sistem Gereksinimleri](#10-sistem-gereksinimleri)

---

## 1. PROJE ÖZETİ

### 🎯 Proje Amacı

MAN Türkiye bakım departmanı şu anda tüm operasyonlarını **Maximo** uygulaması üzerinden yürütmektedir. IT departmanı, lisans maliyetlerini düşürmek ve destek kabiliyetlerini geliştirmek amacıyla çalışan uygulamaları ortak bir teknolojiye taşıma çabası içindedir.

**Neden Değişim Gerekiyor?**
- Maximo'nun artan lisans ve bakım maliyetleri
- Mevcut DIVA projesi 2027'ye kadar tamamlanmayacak (gecikme riski var)
- 2 yıllık geçiş dönemi için ara çözüm gerekiyor

### 🎯 Proje Hedefleri

1. **Minimum Maliyet**: Geliştirme maliyetlerini mümkün olduğunca düşük tutmak
2. **2 Yıllık Çözüm**: DIVA projesi devreye girene kadar kullanılacak
3. **Süreç Takibi**: Tüm süreçleri ve sorumlulukları izlemek
4. **Kayıt Tutma**: Hassas kararlar ve bilgiler için kayıt (onaylar ve maliyetler)

### 📊 Kapsam (Scope)

Maximo uygulamasında bakım departmanı ve ilgili departmanlar tarafından kullanılan **TÜM** fonksiyonlar:

- ✅ İş Talepleri (Job Request)
- ✅ Varlık Yönetimi (Asset Management)
  - Varlık Girişi (Asset Entry)
  - Varlık Zimmet (Asset Assignment)
- ✅ Bakım Yönetimi (Maintenance Management)
  - Düzenli Bakım (Regular Maintenance)
  - Toplu Bakım (Mass Maintenance)
- ✅ Olay Yönetimi (Incident Management)
- ✅ Maliyet Merkezi Değişikliği (Cost Center Change)
- ✅ Varlık Emekliliği (Asset Retirement)
- ✅ Raporlar (Reports)

### 👥 İlgili Departmanlar

- **Bakım Departmanı** (ana kullanıcı)
- **Maliyet Kontrolü** (Cost Controlling)
- **Muhasebe** (Accounting)
- **Lojistik** (Logistics)
- **Depo** (Warehouse)

### ⚠️ Kapsam Dışı (Out of Scope)

Bazı fonksiyonlar basitlik ve maliyet azaltma için kapsam dışı bırakılacak. (Detaylar süreç detaylarında belirtilmiş)

---

## 2. İŞ TALEPLERİ MODÜLÜ (Job Request)

### 🎯 Amaç

Bakım ve onarım taleplerini toplamak, onay sürecini yönetmek ve tüm süreci takip etmek.

### 📋 Ana Hedefler

1. ✅ Talepleri toplamak
2. ✅ Onay sürecini yönetmek
3. ✅ Çözüm sürecini yönetmek
4. ✅ Kullanılan dolaylı malzemeleri kaydetmek
5. ✅ Raporlar

### 🔄 Ana Süreçler

#### 1. Talep Toplama (Collect the Request)

**Talep Oluşturma:**
- Talep ID (otomatik)
- Talep Başlığı
- Talep Açıklaması
- Varlık ID
- Varlık SAP ID
- Varlık SAP Başlığı
- Lokasyon (Ana lokasyon, Alt lokasyon 1, Alt lokasyon 2)
- Talep Sahibi
- Oluşturma Tarihi
- **Öncelik** (Priority):
  - Acil (Urgent) – Üretim durdu
  - Yüksek (High) – Üretim yavaşladı
  - Normal – Üretim yavaşlama olasılığı
  - Düşük (Low) – Kısmi verimlilik kaybı veya risk
- **Talep Nedeni** (Request Reason):
  - İSG (OHS - Occupational Health & Safety)
  - Enerji Tasarrufu
  - Çevre
  - Süreç İyileştirme
  - Yatırım
  - Yenileme

**Detay Ekleme:**
- Açıklama
- Ek dosyalar (attachments)
- Maliyet hesaplama

#### 2. Onay Süreci Yönetimi (Manage Approval Process)

**Onay Seviyeleri:**

1. **SL veya Mühendis Teknik Onayı**
   - Teknik uygunluk değerlendirmesi
   - Çözüm önerisi

2. **İş Müdürü Talep Onayı**
   - İş gereksiniminin doğruluğu
   - İş önceliği

3. **İş Müdürü Maliyet Onayı**
   - Maliyet bütçe uygunluğu
   - Harcama yetkisi
   - En düşük maliyet onaylayıcı: GL (Group Leader)

4. **Çözüm Onayı**
   - Yapılan işin tamamlanma onayı

**Reddetme:**
- Red nedeni (zorunlu)
- Reddeden kullanıcı
- Red tarihi
- Admin tarafından red iptal edilebilir (log tutulur)

#### 3. Çözüm Süreci Yönetimi (Manage Solution Process)

**Sorumluluk Devri:**
- SL-Mühendis kullanıcısı sorumluluğu üstlenir
- Çözüm sorumlusu ataması
- Durum takibi

**Durumlar (Statuses):**
- Oluşturuldu (Created)
- Onay Bekliyor (Pending Approval)
- Teknik Onay (Technical Approved)
- İş Onayı (Business Approved)
- Maliyet Onayı (Cost Approved)
- Çözüm Sorumlusu Atandı (Assigned to Solution)
- Çözümde (In Solution)
- Tamamlandı (Completed)
- Reddedildi (Rejected)
- İptal Edildi (Cancelled)

### 📊 İş Akışı (Workflow)

```
1. Kullanıcı Talep Oluşturur
   ↓
2. Yöneticisi Kontrol ve Onay
   ↓
3. SL/Mühendis Teknik Onay
   ↓
4. Maliyet Hesaplama
   ↓
5. Maliyet Onayı (GL/Manager)
   ↓
6. Çözüm Sorumlusu Atama
   ↓
7. Çözüm Uygulama
   ↓
8. Çözüm Onayı
   ↓
9. Kapatma
```

### 🔐 Yetkilendirme

- **Tüm kullanıcılar** iş talebi oluşturabilir
- Kullanıcılar sadece **kendi oluşturdukları** talepleri görebilir
- **Yöneticiler** kendi ve personellerinin taleplerini görebilir
- **Çözüm sorumluları** tüm talepleri görebilir
- **PKI kart** ile onay (elektronik imza)
- Ortak kullanıcı hesapları olabilir (departman kullanıcıları)

### 📈 Raporlar

1. Talep listesi (tüm alanlarla)
2. Aylık kapatılan talep sayısı
3. Aylık açılan talep sayısı
4. Durumlarda bekleme süreleri

### 📝 İş Kuralları

- İlk onay, talebi oluşturan kişinin yöneticisi tarafından yapılır
- Çözüm sorumlusu bakım mühendisi veya SL tarafından her zaman değiştirilebilir
- Onaylayan kullanıcılar pozisyon değişikliği nedeniyle farklı olabilir (geçmiş kayıt tutulmalı)
- Admin her zaman talebi iptal edebilir
- Oluşturan kişi, yöneticisi tarafından güncelleme yapılmamışsa iptal edebilir
- **"Current Assignee"** alanı otomatik doldurulur (işlem bekleyen kişi)

---

## 3. VARLIK GİRİŞİ MODÜLÜ (Asset Entry)

### 🎯 Amaç

Yeni varlıkların sisteme kaydedilmesi ve SAP ile entegrasyonu.

### 📋 Ana İşlevler

1. ✅ SAP'den varlık bilgisi çekme
2. ✅ Manuel varlık girişi
3. ✅ Varlık onay süreci
4. ✅ SAP'e geri gönderme

### 🔄 Veri Alanları

**Temel Bilgiler:**
- Varlık ID (otomatik)
- Varlık Başlığı
- Varlık Açıklaması
- **Varlık Tipi** (Asset Type):
  - El aletleri (Hand tools)
  - Elektrik aletleri (Electric tools)
  - Basınçlı hava aletleri (Pressurized air tools)
  - Pnömatik aletler (Pneumatic tools)
  - Hidrolik aletler (Hydraulic tools)
  - Ofis ekipmanları (Office equipment)
  - Taşıt (Vehicle)

**SAP Entegrasyonu:**
- SAP Varlık Numarası
- SAP Varlık Başlığı
- Maliyet Merkezi (SAP'den gelir)

**Lokasyon:**
- Ana Lokasyon
- Alt Lokasyon 1
- Alt Lokasyon 2

**Üretici Bilgileri:**
- Üretici Firma Adı
- Model
- Seri Numarası

**Durum:**
- Onay Bekliyor (Pending Approval)
- Aktif (Active)
- Pasif (Inactive)
- Hurda (Scrapped)
- Reddedildi (Rejected)

### 🔄 İş Akışı

```
1. SAP'den Varlık Çek VEYA Manuel Giriş
   ↓
2. Bakım Müdürü Onayı
   ↓
3. Aktif Duruma Geçiş
   ↓
4. SAP'e Durum Güncelleme
```

### 📝 İş Kuralları

- SAP'den çekilen varlıklar **salt okunur** (read-only)
- Manuel girilen varlıklar düzenlenebilir
- Onaylanmadan SAP'e gönderilmez
- Reddedilen varlıklar SAP'e gönderilmez
- Her varlığın benzersiz bir ID'si olmalı

### 🔐 Yetkilendirme

- **Bakım personeli** varlık oluşturabilir
- **Bakım müdürü** onaylayabilir
- **Admin** tüm işlemleri yapabilir

---

## 4. VARLIK ZİMMET MODÜLÜ (Asset Assignment)

### 🎯 Amaç

Varlıkların personele zimmetlenmesi, transferi ve takibi.

### 📋 Ana İşlevler

1. ✅ Varlık zimmetleme
2. ✅ Zimmet transferi
3. ✅ Zimmet iade
4. ✅ Zimmet geçmişi

### 🔄 Veri Alanları

**Zimmet Bilgileri:**
- Zimmet ID
- Varlık ID
- Zimmetli Kişi (Personnel)
- Zimmet Tarihi
- Zimmet Veren (Assigner)
- Zimmet Durumu:
  - Aktif (Active)
  - Transfer Edildi (Transferred)
  - İade Edildi (Returned)
  - Kayıp (Lost)

**Transfer Bilgileri:**
- Önceki Zimmetli
- Yeni Zimmetli
- Transfer Tarihi
- Transfer Nedeni
- Onaylayan

### 🔄 İş Akışı

**Zimmetleme:**
```
1. Varlık Seçimi
   ↓
2. Personel Seçimi
   ↓
3. Zimmet Formu Doldurma
   ↓
4. Bakım Müdürü Onayı
   ↓
5. PKI ile İmzalama (Personel ve Yönetici)
   ↓
6. Zimmet Tamamlama
```

**Transfer:**
```
1. Mevcut Zimmetli'den İade
   ↓
2. Yeni Personel Seçimi
   ↓
3. Transfer Onayı
   ↓
4. PKI İmza (Her iki taraf)
   ↓
5. Transfer Tamamlama
```

### 📝 İş Kuralları

- Her varlık sadece **bir kişiye** zimmetli olabilir
- Transfer için **her iki tarafın da** onayı gerekir
- Kayıp durumunda araştırma süreci başlatılır
- Zimmet geçmişi **silinmez**, log tutulur
- **Basılabilir form** olmalı (Asset Assignment Form.docx)

### 📄 Belgeler

- **Zimmet Formu**: İki taraflı imzalı
- **Transfer Formu**: Üç taraflı imzalı (eski, yeni, onaylayan)
- **İade Formu**: İade eden ve onaylayan imzası

### 🔐 Yetkilendirme

- **Bakım personeli** zimmet oluşturabilir
- **Zimmetli kişi** kendi zimmet bilgilerini görebilir
- **Yöneticiler** ekiplerinin zimmetlerini görebilir
- **Bakım müdürü** onaylayabilir

---

## 5. BAKIM YÖNETİMİ MODÜLÜ (Maintenance Management)

### 🎯 Amaç

Düzenli ve toplu bakım süreçlerinin planlanması, yürütülmesi ve takibi.

### 📋 Bakım Tipleri

1. **Periyodik Bakım** (Time-based)
   - Zamana bağlı (örn: her 3 ayda bir)
   - Otomatik oluşturulur

2. **Ölçüm Bazlı Bakım** (Measurement-based)
   - Sayaç/sensör bazlı (örn: 10.000 km'de bir)
   - Eşik değere ulaşınca tetiklenir

3. **Önleyici Bakım** (Preventive)
   - Arıza öncesi bakım
   - Risk analizi bazlı

4. **Düzeltici Bakım** (Corrective)
   - Arıza sonrası bakım
   - Olay yönetimiyle bağlantılı

5. **Toplu Bakım** (Mass Maintenance)
   - Birden fazla varlık için aynı bakım
   - Grup bazlı planlama

### 🔄 Ana Süreçler

#### 1. Bakım Gereksinimi (Maintenance Requirement)

**Gereksinim Oluşturma:**
- Gereksinim ID
- Gereksinim Başlığı
- Bakım Tipi
- Varlık ID / Varlık Grubu ID
- Periyot (gün/hafta/ay)
- Görev Listesi (Task List)
- Planlanan Süre
- Gerekli Ekip

**Görev Listesi (Task List):**
- Görev ID
- Görev Adı
- Görev Açıklaması
- Tahmini Süre
- Gerekli Yetkinlik
- Gerekli Ekipman/Malzeme
- Kontrol Soruları (Check items)

#### 2. Bakım Görevi (Maintenance Duty)

**Görev Oluşturma:**
- Görev ID (otomatik)
- Görev Başlığı
- Planlanan Bakım Tarihi
- Varlık ID
- Lokasyon
- Görev Listesi ID
- Atanan Bakım Sorumlusu
- **Durum**:
  - Planlandı (Planned)
  - Aktif (Active)
  - Atandı (Assigned)
  - Devam Ediyor (In Progress)
  - Tamamlandı (Done)
  - İptal Edildi (Cancelled)

**Ziyaret (Visit):**
- Ziyaret Başlangıç Tarihi/Saati
- Ziyaret Bitiş Tarihi/Saati
- Ziyaret Durumu
- Ziyaret Notu

**Görev Tamamlama:**
- Tamamlanan görev sayısı
- Toplam görev sayısı
- İlerleme yüzdesi
- Tamamlama notu

#### 3. Malzeme Tüketimi

- Kullanılan Malzeme ID
- Malzeme Adı
- Miktar
- Birim
- Maliyet Merkezi
- Kullanım Tarihi

### 🔄 İş Akışı

**Düzenli Bakım:**
```
1. Bakım Gereksinimi Tanımlama
   ↓
2. Periyodik Görev Oluşturma (Otomatik)
   ↓
3. Bakım Müdürü Onayı
   ↓
4. Teknisyen Atama
   ↓
5. Malzeme/Ekip Planlama
   ↓
6. Bakım Yapılması
   ↓
7. Görev Tamamlama
   ↓
8. Onay ve Kapanış
```

**Toplu Bakım:**
```
1. Varlık Grubu Seçimi
   ↓
2. Bakım Planı Oluşturma
   ↓
3. Çoklu Görev Oluşturma (Her varlık için)
   ↓
4. Onay Süreci
   ↓
5. Ekip Atama
   ↓
6. Paralel Yürütme
   ↓
7. Toplu Tamamlama
```

### 📊 Varlık Grupları

**Grup Tanımlama:**
- Grup ID
- Grup Adı
- Grup Açıklaması
- Varlık Tipi
- Lokasyon

**Grup Öğeleri:**
- Varlık ID
- Varlık Adı
- Ekleme Tarihi

### 📝 İş Kuralları

- Periyodik bakımlar **otomatik oluşturulur**
- Bakım görevleri **30 gün öncesinden** görülebilir
- Gecikmiş bakımlar **kırmızı** işaretlenir
- Toplu bakımda **en az 2 varlık** olmalı
- Malzeme tüketimi **gerçek zamanlı** kaydedilir
- Tamamlanmamış görevler **raporda** görünür

### 📈 Raporlar

1. Bakım takvimi (Maintenance calendar)
2. Tamamlanan bakımlar (Completed maintenance)
3. Gecikmiş bakımlar (Overdue maintenance)
4. Malzeme tüketimi (Material consumption)
5. Teknisyen performansı (Technician performance)
6. Varlık başına bakım maliyeti

### 🔐 Yetkilendirme

- **Bakım Planlayıcı**: Bakım gereksinimleri oluşturur
- **Bakım Müdürü**: Onaylar, atar
- **Teknisyen**: Görevleri tamamlar
- **Admin**: Tüm işlemler

---

## 6. OLAY YÖNETİMİ MODÜLÜ (Incident Management)

### 🎯 Amaç

Arızalar, güvenlik olayları ve acil durumları yönetmek, SLA (Service Level Agreement) takibi yapmak.

### 📋 Olay Tipleri

1. **Ekipman Arızası** (Equipment Failure) - En yaygın
2. **Güvenlik Olayı** (EHS - Environment, Health, Safety)
3. **Kalite Sorunu** (Quality Issue)
4. **Çevre Olayı** (Environmental Incident)

### 🔄 Aciliyet Seviyeleri ve SLA

| Öncelik | Açıklama | SLA Müdahale | SLA Çözüm |
|---------|----------|--------------|-----------|
| **Kritik** | Üretim durdu | 15 dakika | 2 saat |
| **Yüksek** | Üretim etkilendi | 30 dakika | 4 saat |
| **Orta** | Performans düştü | 2 saat | 8 saat |
| **Düşük** | Küçük etki | 4 saat | 24 saat |

### 🔄 Veri Alanları

**Olay Bilgileri:**
- Olay ID (otomatik: INC-YYYY-NNN)
- Olay Başlığı
- Olay Açıklaması
- **Olay Tipi**
- **Öncelik** (Priority)
- **Durum** (Status):
  - Bildirilen (Reported)
  - Onaylandı (Confirmed)
  - Müdahale Ediliyor (In Progress)
  - Çözüldü (Resolved)
  - Kapatıldı (Closed)
  - Reddedildi (Rejected)

**Lokasyon ve Varlık:**
- Lokasyon
- Alt Lokasyon
- Varlık ID (opsiyonel)
- Varlık SAP ID

**Kişiler:**
- Bildiren (Reporter)
- Bildirim Tarihi/Saati
- Atanan Kişi (Assigned To)
- Çözüm Sahibi (Solution Owner)

**Çözüm Bilgileri:**
- Çözüm Açıklaması
- Kök Neden (Root Cause)
- Alınan Önlemler
- Çözüm Tarihi/Saati
- Çözüm Onaylayan

**SLA Takibi:**
- Hedef Müdahale Zamanı
- Gerçek Müdahale Zamanı
- Hedef Çözüm Zamanı
- Gerçek Çözüm Zamanı
- SLA Durumu (Başarılı/Başarısız)

### 🔄 İş Akışı

```
1. Olay Bildirimi
   ↓
2. Öncelik ve SLA Belirleme (Otomatik)
   ↓
3. Bakım Müdürü Onayı
   ↓
4. Teknisyen/Ekip Atama
   ↓
5. Müdahale Başlatma (SLA takibi)
   ↓
6. Kök Neden Analizi
   ↓
7. Çözüm Uygulama
   ↓
8. Çözüm Onayı
   ↓
9. Kapatma
```

### ⚠️ SLA Uyarıları

**Uyarı Seviyeleri:**
- 🟢 **Yeşil**: SLA'nın %50'si kaldı
- 🟡 **Sarı**: SLA'nın %20'si kaldı
- 🔴 **Kırmızı**: SLA aşıldı

**Bildirimler:**
- E-posta bildirimi
- Sistem bildirimi
- SMS (Kritik olaylar için)
- Dashboard uyarısı

### 📝 İş Kuralları

- **Kritik olaylar** otomatik olarak yöneticilere bildirilir
- SLA hesaplaması **7/24** iş saati bazlı
- Tatil ve hafta sonu **dahil edilmez** (opsiyonel)
- Çözüm **bildirici tarafından onaylanmalı**
- Kapatma **yönetici onayı** gerektirir
- Her olay için **iş talebi** otomatik oluşturulabilir

### 📈 Raporlar

1. Olay listesi (tüm filtreler)
2. SLA performansı (başarı/başarısızlık oranı)
3. Olay tipi bazında istatistik
4. Öncelik dağılımı
5. Ortalama çözüm süresi
6. Teknisyen performansı
7. Varlık bazında olay sayısı
8. Kök neden analizi raporu

### 🔐 Yetkilendirme

- **Tüm kullanıcılar** olay bildirebilir
- **Bakım Personeli** olayları görebilir ve müdahale edebilir
- **Bakım Müdürü** onaylar ve atar
- **Bildirici** çözümü onaylar
- **Admin** tüm işlemleri yapabilir

---

## 7. MALİYET MERKEZİ DEĞİŞİKLİĞİ (Cost Center Change)

### 🎯 Amaç

Varlıkların maliyet merkezi değişikliklerini yönetmek ve SAP ile senkronize etmek.

### 📋 Ana İşlevler

1. ✅ Maliyet merkezi değişikliği talebi
2. ✅ Onay süreci
3. ✅ SAP entegrasyonu
4. ✅ Değişiklik geçmişi

### 🔄 Veri Alanları

- Değişiklik ID
- Varlık ID
- Eski Maliyet Merkezi
- Yeni Maliyet Merkezi
- Değişiklik Nedeni
- Talep Eden
- Talep Tarihi
- Onaylayan (Finans)
- Onay Tarihi
- SAP Durum Kodu
- Durum (Beklemede/Onaylandı/Reddedildi/SAP'e Gönderildi)

### 🔄 İş Akışı

```
1. Değişiklik Talebi Oluşturma
   ↓
2. Eski Maliyet Merkezi Sorumlusu Onayı
   ↓
3. Yeni Maliyet Merkezi Sorumlusu Onayı
   ↓
4. Finans Departmanı Onayı
   ↓
5. SAP'e Gönderme
   ↓
6. SAP Onay Bekleme
   ↓
7. Tamamlama
```

### 📝 İş Kuralları

- **Her iki maliyet merkezi sorumlusunun** onayı gerekir
- **Finans departmanı** son onayı verir
- SAP'e gönderme **otomatik**
- SAP onayı başarısız olursa **geri alınır**
- Değişiklik geçmişi **silinmez**

---

## 8. VARLIK EMEKLİLİĞİ (Asset Retirement)

### 🎯 Amaç

Kullanım ömrünü tamamlayan varlıkların sistemden çıkartılması ve SAP ile senkronizasyonu.

### 📋 Emeklilik Tipleri

1. **Hurda** (Scrap) - Kullanım ömrü doldu
2. **Satış** (Sale) - Başka firmaya satıldı
3. **Bağış** (Donation) - Bağışlandı
4. **Transfer** (Transfer) - Başka lokasyona transfer

### 🔄 Veri Alanları

**Temel Bilgiler:**
- Emeklilik ID
- Varlık ID
- Emeklilik Tipi
- Emeklilik Nedeni
- Emeklilik Tarihi
- Talep Eden
- Defter Değeri (Book Value)

**Hurda/Satış İçin:**
- Hurda/Satış Değeri
- Alıcı Firma (Satış için)
- Fatura Bilgileri

**Transfer İçin:**
- Hedef Lokasyon
- Hedef Maliyet Merkezi
- Kabul Eden

**Onaylar:**
- Bakım Müdürü Onayı
- Finans Onayı
- GM Onayı (belirli değerin üzerinde)
- SAP Onay Durumu

### 🔄 İş Akışı

```
1. Emeklilik Talebi Oluşturma
   ↓
2. Bakım Müdürü Onayı
   ↓
3. Finans Departmanı Değer Tespiti
   ↓
4. Finans Onayı
   ↓
5. GM Onayı (Gerekirse)
   ↓
6. SAP'e Gönderme
   ↓
7. Fiziksel İşlem (Hurda/Satış/Transfer)
   ↓
8. Tamamlama ve Kapanış
```

### 📝 İş Kuralları

- **Zimmetli varlıklar** emekli edilemez (önce iade gerekir)
- **Aktif bakım planı** olan varlıklar emekli edilemez
- Belirli değerin üzerinde **GM onayı** gerekir
- **Basılabilir form** olmalı (Asset Retirement Printout.docx)
- SAP'e gönderim **finans onayından sonra**
- Emeklilik sonrası varlık **arşive** taşınır (silinmez)

### 📈 Raporlar

1. Emekli edilen varlıklar listesi
2. Emeklilik tipi bazında istatistik
3. Defter değeri vs gerçekleşen değer
4. Yıllık emeklilik raporu

---

## 9. TEKNİK GEREKSİNİMLER

### 💻 Teknoloji Tercihleri

#### Frontend
- **React** veya **Angular** (Modern SPA framework)
- **Responsive Design** (Mobil uyumlu)
- **PWA** (Progressive Web App) desteği

#### Backend
- **.NET Core** veya **Java Spring Boot**
- **RESTful API** mimarisi
- **Microservices** veya **Monolithic** (proje büyüklüğüne göre)

#### Database
- **Microsoft SQL Server** (MAN Türkiye standardı)
- **PostgreSQL** (alternatif)

#### SAP Entegrasyonu
- **SAP RFC** (Remote Function Call)
- **SAP OData** Services
- **BAPI** (Business API) kullanımı

### 🔒 Güvenlik

- **HTTPS** zorunlu
- **PKI Kartı** entegrasyonu (e-imza)
- **Active Directory** entegrasyonu (SSO)
- **Role-based access control (RBAC)**
- **Audit log** (Tüm işlemler loglanmalı)
- **Data encryption** (Rest ve Transit)

### 🔄 SAP Entegrasyon Noktaları

| Alan | SAP Tablo/Alan | Yön | Açıklama |
|------|----------------|-----|----------|
| **Lokasyon** | WERKS | SAP → Uygulama | Plant/Lokasyon listesi |
| **Varlık** | ANLA, ANLC | SAP ↔ Uygulama | Varlık master data |
| **Maliyet Merkezi** | CSKS | SAP → Uygulama | Cost center listesi |
| **Personel** | PA0001 | SAP → Uygulama | Personel bilgileri |
| **İş Emri** | AFKO, AUFK | Uygulama → SAP | Work order oluşturma |
| **Malzeme** | MARA, MARC | SAP → Uygulama | Malzeme bilgileri |

---

## 10. SİSTEM GEREKSİNİMLERİ

### ⚙️ Operasyonel Gereksinimler

**Çalışma Saatleri:**
- 7/24 erişilebilir olmalı
- Planlı bakım: Cumartesi 02:00-06:00

**Kullanıcı Sayısı:**
- Eşzamanlı kullanıcı: ~50-100
- Toplam kullanıcı: ~300-500

**Uptime:**
- Hedef: %99.5 (yıllık ~43 saat downtime)

### 🔒 Güvenlik Gereksinimleri

- **Rol Bazlı Yetkilendirme** (RBAC)
- **PKI Kartı Entegrasyonu** (Onaylar için)
- **Active Directory** senkronizasyonu
- **Audit Trail** (Tüm işlemler loglanmalı)
- **Password Policy**:
  - Minimum 8 karakter
  - Büyük/küçük harf, rakam, özel karakter
  - 90 günde bir değişim
- **Session Timeout**: 30 dakika

### 📊 Performans Gereksinimleri

| İşlem | Hedef Süre |
|-------|-----------|
| Sayfa Yükleme | < 2 saniye |
| Liste Görüntüleme | < 1 saniye |
| Arama Sonuçları | < 3 saniye |
| Rapor Oluşturma | < 10 saniye |
| SAP Entegrasyon | < 5 saniye |

### 💾 Yedekleme (Backup)

**Yedekleme Stratejisi:**
- **Tam Yedek**: Günlük (02:00)
- **Artımsal Yedek**: 6 saatte bir
- **Saklama Süresi**:
  - Günlük yedekler: 30 gün
  - Haftalık yedekler: 3 ay
  - Aylık yedekler: 1 yıl

**Disaster Recovery:**
- **RPO** (Recovery Point Objective): 4 saat
- **RTO** (Recovery Time Objective): 8 saat
- **Geo-redundant** storage

### 🔗 Entegrasyon Gereksinimleri

**SAP Entegrasyonu:**
- **Protokol**: RFC, OData, BAPI
- **Sıklık**: Real-time ve batch
- **Hata Yönetimi**: Retry mechanism (3 deneme)

**Active Directory:**
- **LDAP** bağlantısı
- **SSO** (Single Sign-On) desteği

**E-posta:**
- **SMTP** sunucusu entegrasyonu
- **Bildirimler** için e-posta gönderimi

### 🖥️ Hosting Gereksinimleri

**Sunucu:**
- **On-premise** (MAN Türkiye veri merkezi)
- **Alternatif**: Azure/AWS (Türkiye bölgesi)

**Altyapı:**
- **Web Server**: IIS veya Nginx
- **Application Server**: .NET Core veya Java
- **Database Server**: SQL Server 2019+
- **Load Balancer**: Yüksek erişim için

### 🌐 İnternet Bağlantısı

- **Minimum Bant Genişliği**: 10 Mbps
- **Önerilen**: 100 Mbps
- **VPN** desteği (Uzaktan erişim için)

### 📝 Kod Standartları

- **Versiyon Kontrolü**: Git (Azure DevOps/GitHub)
- **Code Review**: Zorunlu (Pull request approval)
- **Unit Test Coverage**: Minimum %70
- **Code Documentation**: Inline comments, API docs
- **Naming Convention**: Microsoft/Oracle standartları

### 🌍 Dil Desteği

- **Türkçe**: Ana dil (varsayılan)
- **İngilizce**: İkinci dil
- **Çoklu dil desteği** (i18n)

### 🛠️ Destek ve Bakım

**Destek Seviyeleri:**
- **L1 Support**: Kullanıcı desteği (5x9 çalışma saatleri)
- **L2 Support**: Teknik destek (7x24)
- **L3 Support**: Geliştirme desteği (5x9)

**SLA:**
- **Kritik**: 1 saat yanıt, 4 saat çözüm
- **Yüksek**: 4 saat yanıt, 8 saat çözüm
- **Orta**: 8 saat yanıt, 24 saat çözüm
- **Düşük**: 24 saat yanıt, 72 saat çözüm

### 💾 Database

**Tablo Sayısı (Tahmini):**
- Ana tablolar: ~20
- Lookup tablolar: ~15
- Log/Audit tablolar: ~10
- **Toplam**: ~45 tablo

**Veri Büyümesi:**
- Yıllık: ~100 GB
- 2 yıl: ~200 GB

---

## 📊 PROJE ZAMANLAMA

### Tahmini Süre

| Faz | Süre |
|-----|------|
| **Analiz ve Tasarım** | 4 hafta |
| **Backend Development** | 8 hafta |
| **Frontend Development** | 8 hafta |
| **SAP Entegrasyon** | 4 hafta |
| **Test ve QA** | 4 hafta |
| **Deployment ve Eğitim** | 2 hafta |
| **TOPLAM** | **~6 ay** |

### Aşamalar

1. **Faz 1: MVP (Minimum Viable Product)** - 3 ay
   - İş Talepleri
   - Varlık Girişi
   - Basit Bakım

2. **Faz 2: Tam Özellikler** - 2 ay
   - Olay Yönetimi
   - Toplu Bakım
   - Raporlar

3. **Faz 3: İyileştirmeler** - 1 ay
   - Performans optimizasyonu
   - Kullanıcı geri bildirimleri
   - Ek özellikler

---

## 👥 İLETİŞİM KİŞİLERİ

(Bu bilgiler orijinal dokümanda belirtilmiştir)

---

## 📚 REFERANS BELGELER

### Müşteri Tarafından Sağlanan Dokümanlar

1. **Maintenance Management Application Requirement Analysis (draft).docx**
   - Ana gereksinim analizi
   - 1,776 paragraf, detaylı açıklamalar

2. **Data Structure.xlsx**
   - 37 sheet
   - Tüm veri yapıları ve field definitions
   - SAP mapping bilgileri

3. **Screen Designs.xlsx**
   - Tüm ekran tasarımları
   - UI/UX detayları

4. **Use Cases/**
   - 1.a. Create Job Request.docx
   - Activities x Use Cases.xlsx

5. **Workflows/**
   - Work Flow of Job Request.vsdx
   - Work Flow of Asset Entry.vsdx
   - Work flow of asset assignment.vsdx
   - Work Flow of Maintenance.vsdx
   - Workflow of Incident Notification.vsdx
   - Work Flow Cost Center Change.vsdx
   - Work Flow Asset Retirement.vsdx

6. **Forms/**
   - Asset Assignment Form.docx
   - Asset Retirement Printout.docx

7. **Overall Status.xlsx**
   - Proje durum takibi

---

## ✅ SONUÇ VE ÖNERİLER

### Proje Özeti

MAN Türkiye, mevcut Maximo sisteminden 2 yıllık bir geçiş çözümü olarak yeni bir bakım yönetimi uygulaması geliştirmeyi hedefliyor. Proje **7 ana modül** içeriyor:

1. ✅ **İş Talepleri** - Talep yönetimi ve çok seviyeli onay
2. ✅ **Varlık Yönetimi** - Varlık girişi, zimmet, SAP entegrasyonu
3. ✅ **Bakım Yönetimi** - Periyodik ve toplu bakım
4. ✅ **Olay Yönetimi** - SLA takipli acil müdahale
5. ✅ **Maliyet Merkezi** - Maliyet merkezi değişiklikleri
6. ✅ **Varlık Emekliliği** - Varlık çıkış süreçleri
7. ✅ **Raporlama** - Kapsamlı raporlar

### Kritik Başarı Faktörleri

1. **SAP Entegrasyonu**: En kritik nokta, kesintisiz çalışmalı
2. **PKI Kart Entegrasyonu**: Onaylar için zorunlu
3. **Kullanıcı Deneyimi**: Maximo'dan kolay geçiş için kullanıcı dostu arayüz
4. **Performans**: 300-500 kullanıcı için optimize edilmeli
5. **Yedekleme ve Disaster Recovery**: Veri kaybı kabul edilemez

### Riskler ve Öneriler

| Risk | Olasılık | Etki | Öneri |
|------|----------|------|-------|
| SAP entegrasyon sorunları | Yüksek | Yüksek | Erken SAP testleri, dedicated SAP uzmanı |
| Kullanıcı benimseme | Orta | Yüksek | Kapsamlı eğitim, pilot uygulama |
| Performans sorunları | Orta | Orta | Load testing, optimize database |
| Gereksinim değişiklikleri | Yüksek | Orta | Agile yaklaşım, sprint review |
| DIVA projesi gecikmesi | Orta | Düşük | 2 yıl sonrası için genişletme planı |

### Önerilen Yaklaşım

1. **Agile/Scrum Metodolojisi**
   - 2 haftalık sprint'ler
   - Düzenli demo'lar
   - Müşteri feedback'i

2. **Fazlı Yaklaşım**
   - MVP ile hızlı başlangıç (3 ay)
   - Iterative geliştirme
   - Kullanıcı geri bildirimlerine göre iyileştirme

3. **Pilot Uygulama**
   - Tek lokasyon/departman ile başlama
   - Sorunları erken tespit
   - Aşamalı rollout

4. **Değişim Yönetimi**
   - Kullanıcı eğitimleri
   - Süper kullanıcılar
   - Dokümantasyon

### Maliyet Tahmini

*(Bu kısım teknik detaylara ve kaynak planlamasına bağlı olarak değişkenlik gösterebilir)*

**Geliştirme Ekibi Önerisi:**
- 1 x Proje Yöneticisi
- 1 x Solution Architect
- 2 x Backend Developer (.NET/Java)
- 2 x Frontend Developer (React/Angular)
- 1 x SAP Integration Specialist
- 1 x Database Administrator
- 1 x QA Engineer
- 1 x DevOps Engineer

**Süre:** 6 ay (MVP + Tam özellikler + Test)

---

## 📞 SONRAKI ADIMLAR

### Müşteri ile Görüşülecek Konular

1. ✅ **Teknoloji Seçimi**
   - .NET mi, Java mı?
   - React mi, Angular mı?

2. ✅ **Hosting**
   - On-premise mi, cloud mu?
   - Altyapı hazır mı?

3. ✅ **SAP Erişim**
   - SAP test ortamı?
   - SAP yetkileri?
   - SAP dokümantasyonu?

4. ✅ **PKI Kart**
   - Mevcut altyapı?
   - Test kartları?

5. ✅ **Pilot Lokasyon**
   - Hangi lokasyon/departman?
   - Kaç kullanıcı?

6. ✅ **Maximo Geçiş**
   - Veri migration planı?
   - Paralel çalışma süresi?

### Başlamadan Önce Hazırlanması Gerekenler

1. **Ortam Hazırlıkları**
   - Development environment
   - Test environment
   - SAP sandbox

2. **Erişimler**
   - SAP kullanıcıları
   - Database erişimleri
   - Active Directory test hesapları

3. **Dokümantasyon**
   - SAP BAPI dokümantasyonu
   - Mevcut Maximo ekran görüntüleri
   - Örnek veriler

---

**✅ DOKÜMANTASYON TAMAMLANDI**

Bu özet, müşterinin paylaştığı İngilizce gereksinimlerin Türkçe olarak detaylı bir özetidir. Tüm modüller, süreçler, teknik gereksinimler ve öneriler dahil edilmiştir.

**Hazırlayan**: Claude (AI Assistant)
**Tarih**: 10 Ekim 2025
**Durum**: Müşteri ile görüşme için hazır ✅

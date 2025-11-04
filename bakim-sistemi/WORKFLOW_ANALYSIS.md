# İş Akışı Analizi - Eksik Özellikler Raporu

## Yönetici Özeti
Bu doküman, Visio diyagramlarındaki iş akışı gereksinimlerini mevcut HTML uygulaması ile karşılaştırarak eksik özellikleri ve fonksiyon açıklarını tespit etmektedir.

---

## 1. İŞ TALEBİ MODÜLÜ - is-talepleri-*.html

### İş Akışı Gereksinimleri:
- **11 farklı durum**: Yeni, İş Onayı, SL veya Mühendis Devralması, Teknik Onay, Maliyet Hesaplama, İş Maliyeti Onayı, Çözüm Sorumlusu Ataması, Uygulama, Çözüm Onayı, Tamamlandı, Reddedildi, İptal Edildi
- **Onay Zinciri**: Yönetici Onayı → Maliyet Hesaplama → İş Yöneticisi Onayı → Çözüm Sorumlusu Atama → Uygulama → Çözüm Onayı
- **Roller**: Talep Eden, Yönetici, İş Yöneticisi, SL/Mühendis, Uygulayıcı

### Mevcut HTML Uygulaması:
- ✅ Temel form (is-talepleri-ekle.html)
- ✅ Filtreli liste görünümü (is-talepleri-liste.html)
- ✅ Detay sayfası (is-talepleri-detay.html)
- ✅ Durum gösterimi: Açık, İşlemde, Beklemede, Tamamlandı

### ❌ EKSİK ÖZELLİKLER:
1. **Onay İş Akışı** - Yönetici onay adımı yok
2. **Maliyet Hesaplama** - Maliyet hesaplama bölümü veya iş yöneticisi onayı yok
3. **Teknik Kontrol** - SL/Mühendis tarafından teknik onay yok
4. **Çözüm Sorumlusu Ataması** - Çözüm sorumlusu atama fonksiyonu yok
5. **Uygulama Takibi** - Uygulama adımı takibi yok
6. **Çözüm Onayı** - Çözüm onay iş akışı yok
7. **Durum Yönetimi** - 7+ iş akışı durumu eksik (sadece 4 genel durum var)
8. **Red İşlemleri** - Red nedeni girişi veya red iş akışı yok
9. **İptal Etme** - İptal fonksiyonu yok
10. **Rol Bazlı Görünümler** - Yönetici, İş Yöneticisi, SL/Mühendis, Uygulayıcı için farklı görünümler yok

---

## 2. BAKIM İŞLERİ MODÜLÜ - bakim-isleri-*.html

### İş Akışı Gereksinimleri:
- **7 durum**: Planlandı (>1 ay), Aktif (<1 ay), Atandı, Devam Ediyor, Onay İstendi, Reddedildi, Tamamlandı
- **Bakım Tipleri**:
  - Ölçümlü bakım (ölçüm verileri ile)
  - Toplu bakım (varlık listeleri ile)
  - Görev bazlı bakım
- **Ziyaret Yönetimi**: Ziyaret oluşturma, tamamlanan görevleri işaretleme, başlangıç/bitiş tarih-saati ekleme
- **Malzeme Takibi**: Kullanılan malzeme ve miktarları girme
- **Ölçüm**: Ölçümlü bakım için ölçüm değerleri girme
- **Onay**: Red nedeni girişi ile SL/Mühendis onayı

### Mevcut HTML Uygulaması:
- ✅ Temel form (bakim-isleri-ekle.html)
- ✅ Liste görünümü (bakim-isleri-liste.html)
- ✅ Durum gösterimi: Tamamlandı, Devam Ediyor, Planlandı

### ❌ EKSİK ÖZELLİKLER:
1. **Ölçümlü Bakım** - Ölçüm veri alanları veya kilometre taşı takibi yok
2. **Toplu Bakım** - Toplu bakım için varlık listesi oluşturma yok
3. **Görev Yönetimi** - Görev listesi oluşturma, atama veya takip yok
4. **Ziyaret Sistemi** - Ziyaret oluşturma, başlangıç/bitiş tarih-saat takibi yok
5. **Malzeme Tüketimi** - Malzeme girişi fonksiyonu yok
6. **Ölçüm Girişi** - Ölçümlü bakım için ölçüm değeri girişi yok
7. **Otomatik Görev Oluşturma** - Otomatik görev listesi oluşturma yok
8. **Onay İş Akışı** - SL/Mühendis onay süreci yok
9. **Red İşlemleri** - Red nedeni girişi yok
10. **Durum İş Akışı** - Detaylı durum geçişleri eksik (gereken 7'ye karşı sadece 3 durum var)

---

## 3. ZİMMET MODÜLÜ - zimmet-*.html

### İş Akışı Gereksinimleri:
- **Onay Zinciri**:
  1. Mevcut zimmet sahibinin birinci yönetici onayı
  2. Yeni zimmet sahibinin yönetici onayı
  3. Mevcut zimmet sahibi onayı
  4. Yeni zimmet sahibi onayı
- **4 Onay Adımı** - Her adımda red edilebilir
- **Değişim Zamanı** takibi

### Mevcut HTML Uygulaması:
- ✅ Temel form (zimmet-ekle.html)
- ✅ Liste görünümü (zimmet-liste.html)
- ✅ Durum gösterimi: Aktif, İade Edildi

### ❌ EKSİK ÖZELLİKLER:
1. **4 Adımlı Onay Zinciri** - Onay iş akışı uygulaması yok
2. **Mevcut Sahibin Yönetici Onayı** - Eksik
3. **Yeni Sahibin Yönetici Onayı** - Eksik
4. **Mevcut Sahibin Onayı** - Eksik
5. **Yeni Sahibin Onayı** - Eksik
6. **Değişim Zamanı Takibi** - Değişim zamanı alanı veya takibi yok
7. **Herhangi Bir Adımda Red** - Red işleme yok
8. **Onay Durumu Takibi** - Bekleyen onay durumları eksik

---

## 4. VARLIK KAYIT MODÜLÜ - varliklar-*.html

### İş Akışı Gereksinimleri:
- **3 Adımlı Süreç**:
  1. Varlık Bilgisi Girişi (temel varlık verisi)
  2. SAP Varlık Numarası Girişi (SAP ile entegrasyon)
  3. Destek Dokümanı Girişi (doküman ekleme)
- Her adımda **Kaydet ve Çağır** iş akışı

### Mevcut HTML Uygulaması:
- ✅ Temel form (varliklar-ekle.html)
- ✅ Liste görünümü (varliklar-liste.html)
- ✅ Detay sayfası (varliklar-detay.html)
- ✅ Durum gösterimi: Aktif, Bakımda, Pasif, Hurda

### ❌ EKSİK ÖZELLİKLER:
1. **3 Adımlı Giriş Süreci** - Tüm veriler tek formda giriliyor, çok adımlı değil
2. **SAP Entegrasyonu** - SAP varlık numarası giriş adımı yok
3. **Doküman Yönetimi** - Destek dokümanı girişi fonksiyonu yok
4. **Adım Adım İş Akışı** - Adımlar arası kaydet/çağır iş akışı yok
5. **QR Kod Üretimi** - Varlıklar için QR kod üretimi yok

---

## 5. HURDA İŞLEMLERİ MODÜLÜ - hurda-*.html

### İş Akışı Gereksinimleri:
- **10 durum**:
  1. Masraf Merkezi Sorumlusu Onayı
  2. SL-Mühendis Onayı
  3. Bakım Müdürü Onayı
  4. Muhasebe Onayı
  5. Yeniden Değerlendirme Tarihi Bekleniyor
  6. Muhasebenin Yeniden Değerlendirmesi
  7. Fiziksel Hurdaya Çıkarma
  8. Tamamlandı
  9. Reddedildi
  10. İptal Edildi
- **4 Seviyeli Onay Zinciri**:
  - Masraf Merkezi Sorumlusu
  - SL/Mühendis
  - Bakım Müdürü
  - Muhasebe
- **Hurdaya Çıkarma Yöntemleri**:
  - Fiziksel hurdaya çıkarma
  - Yeniden değerlendirme (bekleme süresi ile)
- Muhasebe onayından sonra **SAP İşlemleri**

### Mevcut HTML Uygulaması:
- ✅ Temel form (hurda-ekle.html)
- ✅ Liste görünümü (hurda-liste.html)
- ✅ Durum gösterimi: Onaylandı, Beklemede, Reddedildi

### ❌ EKSİK ÖZELLİKLER:
1. **4 Seviyeli Onay Zinciri** - Çok seviyeli onay iş akışı yok
2. **Masraf Merkezi Sorumlusu Onayı** - Eksik
3. **SL/Mühendis Onayı** - Eksik
4. **Bakım Müdürü Onayı** - Eksik
5. **Muhasebe Onayı** - Eksik
6. **Hurdaya Çıkarma Yöntemi Seçimi** - Fiziksel hurdaya çıkarma ve yeniden değerlendirme arasında seçim yok
7. **Yeniden Değerlendirme İş Akışı** - Yeniden değerlendirme tarihi bekleme ve yeniden onay süreci yok
8. **Fiziksel Hurdaya Çıkarma Süreci** - Fiziksel hurdaya çıkarma işlemlerinin takibi yok
9. **SAP Entegrasyonu** - SAP'de hurdaya çıkarma için muhasebe işlemleri yok
10. **Durum Takibi** - 7+ iş akışı durumu eksik (sadece 3 genel durum var)

---

## 6. MASRAF MERKEZİ DEĞİŞİKLİĞİ MODÜLÜ - masraf-*.html

### İş Akışı Gereksinimleri:
- **4 durum**:
  1. Onaylar Bekleniyor
  2. SAP'de Değişiklikler
  3. Tamamlandı
  4. Reddedildi
- **3 Seviyeli Onay**:
  1. Yeni masraf merkezi varlık sorumlusu onayı
  2. Mevcut masraf merkezi sorumlusu onayı
  3. Mevcut masraf merkezi müdürü onayı
- **Tümü Onaylandı → SAP Değişikliği → Tamamlandı**
- **Biri Reddedildi → Süreç Reddedildi**
- Masraf merkezi değişiklikleri için **SAP Entegrasyonu**

### Mevcut HTML Uygulaması:
- ✅ Temel form (masraf-ekle.html)
- ✅ Liste görünümü (masraf-liste.html)
- ✅ Durum gösterimi: Onaylandı, Beklemede, Reddedildi

### ❌ EKSİK ÖZELLİKLER:
1. **3 Seviyeli Onay İş Akışı** - Onay zinciri uygulaması yok
2. **Yeni Masraf Merkezi Varlık Sorumlusu Onayı** - Eksik
3. **Mevcut Masraf Merkezi Sorumlusu Onayı** - Eksik
4. **Mevcut Masraf Merkezi Müdürü Onayı** - Eksik
5. **SAP Entegrasyonu** - "SAP'de Değişiklikler" adımı yok
6. **Hepsi-ya-da-Hiçbiri Onay Mantığı** - Bir red tüm süreci reddetmeli
7. **Durum İş Akışı** - "Onaylar Bekleniyor" ve "SAP'de Değişiklikler" durumları eksik

---

## 7. ❌ OLAY BİLDİRİMİ MODÜLÜ - **TAMAMEN EKSİK**

### İş Akışı Gereksinimleri:
- **8 durum**: Yeni, Atandı, Dış Kaynak Hizmeti, Onay, SL-TL Tarafından Reddedildi, Müşteri Tarafından Reddedildi, Tamamlandı, İptal Edildi
- **Tam İş Akışı**:
  1. Olay oluştur
  2. Detayları gir
  3. Çözüm sorumlusuna ata
  4. Çözümü uygula
  5. Tüketilen malzemeleri gir
  6. SL-TL onayı
  7. Talep eden onayı
  8. Talebi kapat
- **Dış Kaynak Hizmeti Süreci**
- **Varlık Teslim Alımı Takibi** (kimin aldığı)
- **İkili Onay**: SL-TL + Talep Eden

### Mevcut HTML Uygulaması:
- ❌ **DOSYA YOK** - Bu modülün tamamı eksik

### ❌ EKSİK MODÜL - TÜM ÖZELLİKLER:
1. **Olay Listesi Sayfası** - Oluşturulmamış
2. **Olay Oluşturma Formu** - Oluşturulmamış
3. **Olay Detay Sayfası** - Oluşturulmamış
4. **Çözüm Sorumlusuna Atama** - Uygulanmamış
5. **Çözüm Uygulama Takibi** - Uygulanmamış
6. **Malzeme Tüketimi Girişi** - Uygulanmamış
7. **SL-TL Onay İş Akışı** - Uygulanmamış
8. **Talep Eden Onayı** - Uygulanmamış
9. **Dış Kaynak Hizmeti Süreci** - Uygulanmamış
10. **Varlık Teslim Alımı Takibi** - Uygulanmamış
11. **İkili Onay Sistemi** - Uygulanmamış
12. **8 Durum İş Akışı** - Uygulanmamış

---

## KRİTİK BOŞLUKLARIN ÖZETİ

### Yüksek Öncelikli Eksik Özellikler (Tüm Modüllerde):

1. **Çok Seviyeli Onay İş Akışları** - Hiçbir yerde onay zincirleri uygulanmamış
2. **Rol Bazlı Erişim Kontrolü** - Farklı roller için farklı görünüm/aksiyonlar yok
3. **Durum İş Akışı Yönetimi** - Basitleştirilmiş durumlar (3-4) vs gereken (modül başına 7-11)
4. **SAP Entegrasyon Noktaları** - Hiçbir yerde SAP entegrasyonu yok
5. **Doküman Yönetimi** - Doküman ekleme/yönetim yok
6. **Red İşlemleri** - Red nedeni girişi veya iş akışı yok
7. **Malzeme Takibi** - Malzeme tüketimi takibi yok
8. **Bildirim Sistemi** - Onaylar, atamalar vb. için bildirimler yok

### Tamamen Eksik Modül:
- **Olay Bildirimi (Incident Notification)** - %0 uygulanmış

### Uygulama Tamamlanma Oranları:
- İş Talebi: ~%30 (temel CRUD var, onay iş akışı eksik)
- Bakım İşleri: ~%25 (temel CRUD var, görev/ziyaret/ölçüm sistemleri eksik)
- Zimmet: ~%20 (temel CRUD var, 4 adımlı onay eksik)
- Varlık Kayıt: ~%40 (temel CRUD var, çok adımlı süreç eksik)
- Hurda: ~%20 (temel CRUD var, 4 seviyeli onay zinciri eksik)
- Masraf Merkezi: ~%25 (temel CRUD var, 3 seviyeli onay + SAP eksik)
- Olay Bildirimi: ~%0 (tamamen eksik)

**Genel Uygulama: ~%23 tamamlanmış**

---

## ÖNERİLER

### Faz 1 - Kritik Temel:
1. Onay iş akışı motoru uygula (tüm modüllerde tekrar kullanılabilir)
2. Rol bazlı erişim kontrol sistemi ekle
3. Bildirim sistemi uygula
4. Olay Bildirimi (Incident Notification) modülünü oluştur

### Faz 2 - Modül İyileştirmeleri:
1. Her modüle çok seviyeli onay zincirlerini ekle
2. Detaylı durum iş akışlarını uygula (modül başına 7-11 durum)
3. Neden girişi ile red işlemlerini ekle
4. Malzeme takip sistemini uygula

### Faz 3 - Gelişmiş Özellikler:
1. SAP entegrasyon noktaları
2. Doküman yönetim sistemi
3. Bakım İşleri için görev yönetimi
4. Bakım İşleri için ziyaret takibi
5. Ölçümlü bakım sistemi

### Faz 4 - İyileştirmeler:
1. E-posta bildirimleri
2. Bekleyen onaylar için dashboard widget'ları
3. Raporlama ve analitik
4. Mobil uyumluluk optimizasyonu

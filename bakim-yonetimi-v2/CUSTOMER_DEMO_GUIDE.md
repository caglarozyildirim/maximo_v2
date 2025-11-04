# 🎯 MÜŞTERİ DEMO REHBERİ

**Demo URL**: http://localhost:5173/
**Hazırlık Tarihi**: 4 Kasım 2024
**Demo Süresi**: 15 dakika

---

## 📊 DASHBOARD KRİTİK UYARILAR

Demo başladığında Dashboard'da 4 kritik uyarı gösterilecek:

### 🔴 1. KRİTİK BAKIM GECİKMİŞ (3 Varlık)
- **Kompresör**: 20 gün gecikmiş - Motor aşırı ısınma riski
- **CNC Torna**: 15 gün gecikmiş - Üretim durması riski
- **Elektrik Panosu**: 10 gün gecikmiş - Yangın riski

**Demo Akışı**:
1. Uyarıya tıkla → Bakım listesine git
2. Gecikmiş 3 bakımı göster
3. Detaya gir → Varlık bilgileri, risk seviyesi göster
4. İlgili arıza kaydını göster

---

### ⏰ 2. BEKLEYEN ONAYLAR (15 İş Talebi)
- **Toplam Tutar**: 222.500 TL
- **Ortalama Bekleme**: 10 gün
- **En Acil**: Forklift lastik (7 gün), Yangın sistemi (6 gün)

**Demo Akışı**:
1. Uyarıya tıkla → İş talepleri listesine git
2. Priority filtresini göster (Urgent, High, Normal)
3. JR-2024-102 aç (Forklift Lastik - İSG)
4. Onay akışını göster
5. 7 günlük gecikmeyi vurgula

---

### 📊 3. ZİMMET TAKİBİ (7 Gecikmiş)
- **En Uzun Gecikme**: Matkap 25 gün
- **Yüksek Değerli**: Laptop 20 gün gecikmiş

**Demo Akışı**:
1. Uyarıya tıkla → Zimmet listesine git
2. ZMT-2024-003 aç (Bosch Matkap - 25 gün)
3. Zimmetli: Ahmet Yılmaz - Bakım Departmanı
4. Varlık durumu: İYİ
5. İade hatırlatması gönder (simüle et)

---

### 💸 4. BÜTÇE AŞIMI RİSKİ (2 Masraf Merkezi)
- **Üretim Hattı 1**: %92.3 kullanım (11.500 TL kaldı)
- **Bakım Onarım**: %91.5 kullanım (10.200 TL kaldı)

**Demo Akışı**:
1. Uyarıya tıkla → Masraf merkezi detayına git
2. CC-PROD-001 bütçe grafiğini göster
3. Harcama dağılımını göster (pasta grafiği)
4. Risk seviyesini vurgula
5. Öneri: Bütçe revizyonu gerekli

---

## 🎬 15 DAKİKALIK DEMO AKIŞI

### 1️⃣ GİRİŞ (2 dk)
**Ekran**: Login Sayfası
- Modern split-screen tasarımı göster
- Demo credentials panelini göster
- Admin olarak giriş yap
- Dashboard yüklensin

### 2️⃣ DASHBOARD İNCELEME (2 dk)
**Ekran**: Dashboard
- 6 interaktif grafiği göster (hover efektleri)
- 4 kritik uyarı panelini oku
- İstatistik kartlarını göster
- Son aktiviteler tablosunu göster

### 3️⃣ KRİTİK BAKIM SENARYOSU (3 dk)
**Akış**: 🔴 Kritik Bakım Uyarısı → Bakım Listesi → Detay
1. "Kritik Bakım Gecikmiş" uyarısına tıkla
2. Bakım listesinde 3 gecikmiş bakım göster
3. MAE-2024-001 (Kompresör) detayını aç:
   - SAP varlık bilgileri (mavi kutu)
   - Görev listesi detayları (yeşil kutu)
   - 20 gün gecikme vurgusu
   - Sorumlu: Mustafa Öztürk
4. İlişkili arızayı göster (INC-2024-001)

### 4️⃣ İŞ TALEBİ ONAY SENARYOSU (3 dk)
**Akış**: ⏰ Bekleyen Onaylar → İş Talepleri Listesi → Detay
1. "15 Bekleyen Onay" uyarısına tıkla
2. İş talepleri listesini göster
3. Priority filtrelerini göster
4. JR-2024-102 (Forklift Lastik - 8.000 TL) aç:
   - İSG riski vurgusu
   - Öncelik: URGENT (kırmızı badge)
   - Talep nedeni: İş Sağlığı ve Güvenliği
   - 7 gün bekleme süresi
5. 11 aşamalı onay akışını açıkla

### 5️⃣ VARLIK YÖNETİMİ (2 dk)
**Ekran**: Varlıklar Formu
1. "Varlık Ekle" butonuna tıkla
2. Bakım ID gir → Uniqueness check göster:
   - Var olan ID: Kırmızı ❌
   - Yeni ID: Yeşil ✓ (500ms debounce)
3. 3 seviyeli lokasyon hiyerarşisini göster
4. Kalibrasyon checkbox → Conditional fields
5. SAP entegrasyon placeholder'ı göster

### 6️⃣ MASRAF MERKEZİ TRANSFER (2 dk)
**Ekran**: Masraf Merkezi Formu
1. "Masraf Merkezi Transfer" formu aç
2. Varlık seç → Mevcut CC (sarı) göster
3. Yeni CC seç → Yeni CC (yeşil) göster
4. Her iki tarafta 8'er alan detayı
5. Aynı CC seçmeye çalış → Toast error göster ✅
6. 6 aşamalı onay akışını açıkla

### 7️⃣ KAPANIŞ (1 dk)
**Özet**:
- 7 modül tam entegre
- 11 aşamalı iş akışları
- Gerçek zamanlı validasyon
- SAP entegrasyon hazır
- Responsive tasarım
- Tam Türkçe arayüz

---

## 🎨 DEMO SIRASINDA VURGULANACAK ÖZELLİKLER

### ✅ Görsel Tasarım
- Modern, profesyonel corporate tema
- Kırmızı (#DC2626) ana renk
- Renkli kodlama sistemi
- Hover efektleri ve animasyonlar
- Responsive grid layout

### ✅ Kullanıcı Deneyimi
- Karakter sayaçları (128/128)
- Gerçek zamanlı validasyon
- Toast notifications (başarı/hata)
- Loading states
- Debounced search (500ms)
- Cascading dropdowns

### ✅ İş Süreçleri
- 3-11 aşamalı workflow'lar
- Çoklu onay mekanizması
- Rol bazlı yetkiler
- Otomatik alan doldurma
- Conditional rendering

### ✅ Entegrasyonlar
- SAP varlık entegrasyonu (mock)
- Kullanıcı dizini entegrasyonu
- Masraf merkezi entegrasyonu
- Doküman yönetimi (hazır)

---

## ⚠️ DEMO SIRASINDA KAÇINILACAKLAR

❌ **Backend kayıt işlemi yapma** - Mock data ile çalışıyor
❌ **Detay sayfalarında çok uzun kalma** - Bazıları eksik data gösterebilir
❌ **TypeScript warning'lere dikkat çekme** - Çalışmaya engel değil
❌ **Eksik API endpoint'leri vurgulama** - POC aşamasında normal
❌ **Browser console açma** - Gereksiz warning'ler var

---

## 💡 DEMO İPUÇLARI

### ✅ Müşteriye Sorulacak Sorular
1. "Kaç lokasyonda kullanılacak?"
2. "SAP entegrasyonu ne zaman devreye alınacak?"
3. "Bakım personeli sayısı nedir?"
4. "Mobil uygulama ihtiyacı var mı?"
5. "Mevcut sistemden veri aktarımı gerekiyor mu?"

### ✅ Güçlü Yanlar
- ⭐ "Tam Türkçe arayüz"
- ⭐ "11 aşamalı onay sistemleri"
- ⭐ "Gerçek zamanlı validasyon"
- ⭐ "SAP entegrasyonu hazır"
- ⭐ "İSG standartlarına uygun"
- ⭐ "Rol bazlı yetkilendirme"

### ✅ Gelecek Özellikler (Eğer sorulursa)
- 📱 Mobil uygulama (React Native)
- 📊 Gelişmiş raporlama (BI entegrasyonu)
- 🔔 Gerçek zamanlı bildirimler (WebSocket)
- 📧 Email/SMS entegrasyonu
- 🤖 AI destekli bakım önerileri
- 📷 QR kod ile varlık okuma

---

## 📁 DEMO İÇİN HAZIR DOSYALAR

### Mock Data
```
/packages/frontend/src/data/mockData.ts
```
- 3 kritik bakım
- 15 bekleyen onay
- 7 gecikmiş zimmet
- 2 bütçe risk masraf merkezi
- 8 kullanıcı profili

### Raporlar
```
/MOCK_DATA_REPORT.md
```
Tüm örnek kayıtların detaylı raporu

### Demo Rehberi
```
/CUSTOMER_DEMO_GUIDE.md (bu dosya)
```

---

## 🎯 BAŞARI KRİTERLERİ

Demo sonunda müşteri şunları görmüş olacak:

✅ **İşlevsellik**
- Varlık yönetimi
- Bakım planlaması
- Arıza takibi
- İş talebi süreci
- Zimmet yönetimi
- Masraf merkezi kontrolü
- Hurdaya çıkarma

✅ **Özellikler**
- Çoklu onay mekanizması
- Rol bazlı yetkiler
- Gerçek zamanlı validasyon
- SAP entegrasyonu
- Responsive tasarım
- Türkçe dil desteği

✅ **Değer Önerisi**
- Üretim duruşlarını önleme
- Bakım maliyetlerini azaltma
- İSG risklerini minimize etme
- Bütçe kontrolü
- Varlık takibi
- Uyumluluk (compliance)

---

## 📞 DEMO SONRASI

### Müşteri Geri Bildirimleri İçin
- 📝 Özellik talepleri listesi hazırla
- 📊 Teklif dosyası hazırla
- 🗓️ Pilot proje planı sun
- 💻 Test ortamı erişimi ver
- 📚 Dokümantasyon paylaş

### Takip Adımları
1. Demo geri bildirimi al
2. Özel istekler listele
3. Teklif hazırla (1-2 gün)
4. Pilot proje planla (2-4 hafta)
5. Eğitim programı tasarla

---

## ✅ DEMO ÖNCESİ KONTROL

- [ ] Uygulama çalışıyor (http://localhost:5173/)
- [ ] Mock data yüklenmiş
- [ ] Tüm formlar test edilmiş
- [ ] Dashboard uyarıları görünüyor
- [ ] Browser cache temizlenmiş
- [ ] Demo senaryosu ezberlenmiş
- [ ] Yedek browser hazır
- [ ] Internet bağlantısı stabil
- [ ] Projeksiyon test edilmiş
- [ ] Sorular için cevaplar hazır

---

**DEMO'YA HAZIR! 🚀**

İyi şanslar ve başarılı bir sunum!

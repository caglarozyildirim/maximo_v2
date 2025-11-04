# BAKIM YÖNETİMİ UYGULAMASI İŞ ANALİZİ DOKÜMANI
**Versiyon:** 1.0
**Tarih:** Ekim 2025
**Proje:** Maintenance Management Application (Maximo Replacement)

---

## 1. YÖNETİCİ ÖZETİ

### 1.1 Projenin Amacı ve Hedefleri

Maintenance department manages its whole operation on the application of Maximo. IT department has multiple application technology to serve multiple goals. There is an ongoing effort to collect most of the running application to a common technology to decrease licensing cost and improve support capabilities. Due to this effort, increased licensing and maintenance cost of Maximo, a migration of this application to other platform is decided. There is an ongoing project to replace Maximo functions of Maintenance Management (its called DIVA) but due date is 2027 with a possibility of delay. There is a need to replate Maximo for two years (until Diva project goes live in Ankara).

Some of the functions will be left out for the simplicity of the project and to reduce the cost. Some of the functions will be added to improve user experience and process success if their development costs are relatively low.

The main functions to be implemented are listed below

**Ana Hedefler:**

- Bakım departmanının Maximo uygulamasındaki tüm operasyonlarını yeni bir platforma taşımak
- Lisans maliyetlerini azaltmak ve destek yeteneklerini artırmak
- 2027'de DIVA projesinin devreye girmesine kadar 2 yıllık geçici çözüm sağlamak
- Süreçleri ve sorumlulukları takip etmek
- Hassas kararlar ve bilgiler için kayıt tutmak (onaylar ve maliyetler)
- Geliştirme maliyetlerini minimum düzeyde tutmak

### 1.2 Kapsam

Bu proje, bakım departmanı ve ilgili departmanlar (maliyet kontrolü, muhasebe, lojistik ve depo) tarafından kullanılan Maximo uygulamasındaki tüm fonksiyonları kapsamaktadır.

**Ana Fonksiyonlar:**

- İş Talebi Yönetimi (Request Management)
- Sabit Varlık Yönetimi (Fixed Asset Management)
- Varlık Girişi (Asset Entry)
- Varlık Atama Süreci (Asset Assignment Process)
- Bakım (Maintenance)
- Düzenli Bakım (Regular Maintenance)
- Toplu Bakım (Mass Maintenance)
- Olay Yönetimi (Incident Management)
- Maliyet Merkezi Değişiklik Süreci (Cost Center Change Process)
- Varlık Emekliliği (Asset Retirement)
- Raporlama (Reports)
- Operasyonel Gereksinimler (Operational Requirements)

### 1.3 Kapsam Dışı Öğeler

Kapsam dışı bilgiler, süreç detayları bölümünde belirtilmiştir. Temel olarak, maliyet optimizasyonu ve proje basitliği için bazı fonksiyonlar kapsam dışı bırakılmıştır.

---

## 2. İŞ SÜREÇLERİ VE AKIŞLARI

### 2.1 İş Talebi Süreci (Job Request Workflow)

**Açıklama:** İş talepleri oluşturulur, detaylandırılır, onay süreçlerinden geçirilir ve çözüme kavuşturulur. Bu süreç, talep oluşturma, teknik onay, iş yöneticisi onayı, maliyet onayı ve çözüm aşamalarını içerir.

### 2.2 Bakım Süreci (Maintenance Workflow)

**Açıklama:** Düzenli ve planlı bakım işlemlerinin yönetildiği süreçtir. Preventif bakım planlaması, bakım takvimi, bakım ekiplerinin atanması ve bakım işlemlerinin tamamlanması adımlarını içerir.

### 2.3 Varlık Girişi Süreci (Asset Entry Workflow)

**Açıklama:** Yeni varlıkların sisteme kaydedilmesi sürecidir. Varlık bilgilerinin girilmesi, SAP entegrasyonu, varlık etiketleme ve lokasyon atama işlemlerini kapsar.

### 2.4 Varlık Atama Süreci (Asset Assignment Workflow)

**Açıklama:** Varlıkların çalışanlara veya departmanlara atanması sürecidir. Atama talebi, onay süreci, zimmet formu oluşturma ve teslim alma adımlarını içerir.

### 2.5 Olay Bildirimi Süreci (Incident Notification Workflow)

**Açıklama:** Acil arıza ve olayların bildirilmesi ve yönetilmesi sürecidir. Olay bildirimi, önceliklendirme, müdahale ekibi atama ve çözüm adımlarını kapsar.

### 2.6 Varlık Emekliliği Süreci (Asset Retirement Workflow)

**Açıklama:** Varlıkların hizmetten çıkarılması sürecidir. Emeklilik talebi, değerlendirme, onay, varlık teslim alma ve kayıtlardan silme işlemlerini içerir.

### 2.7 Maliyet Merkezi Değişikliği Süreci (Cost Center Change Workflow)

**Açıklama:** Varlıkların maliyet merkezleri arasında transfer edilmesi sürecidir. Transfer talebi, onay süreci, muhasebe kaydı ve SAP güncellemesi adımlarını kapsar.

---

## 3. FONKSİYONEL GEREKSİNİMLER

### 3.1 İş Talebi Yönetimi (Job Request)

**Amaç:** Talepleri toplamak, onay sürecini yönetmek ve tüm süreci takip etmek.

**Hedefler:**

- Talepleri toplamak
- Onay sürecini yönetmek
- Çözüm sürecini yönetmek
- Kullanılan dolaylı malzemelerin tüketimini kaydetmek
- Raporlama

**Süreçler ve Aktiviteler:**

1. **Talep Toplama**
   - İş talebi oluşturma
   - Talep detaylandırma
   - Detay ekleme
   - Ek dosya ekleme
   - Maliyet hesaplama

2. **Onay Süreci Yönetimi**
   - SL veya Mühendis teknik onayı
   - İş yöneticisi talep onayı
   - İş yöneticisi maliyet onayı
   - Çözüm onayı
   - Red işlemleri

3. **Çözüm Süreci Yönetimi**
   - Talep sorumluluğunun SL-Mühendis kullanıcı tarafından devralınması
   - Çözüm sorumlusu atama
   - Ticket durumu takibi

4. **Raporlar**
   - Talep listesi
   - Aylık kapatılan ticket sayısı
   - Aylık açılan ticket sayısı
   - Beklenen durumlar

### 3.2 Sabit Varlık Yönetimi (Fixed Asset Management)

Sabit varlıkların yaşam döngüsü boyunca yönetimi:

- **Varlık Girişi:** Yeni varlıkların sisteme kaydı, SAP entegrasyonu
- **Varlık Atama:** Varlıkların çalışanlara veya departmanlara zimmetlenmesi
- **Varlık Transferi:** Maliyet merkezi değişiklikleri ve lokasyon güncellemeleri
- **Varlık Emekliliği:** Hizmetten çıkarma ve kayıt silme işlemleri

### 3.3 Bakım Yönetimi (Maintenance)

**Alt Modüller:**

- **Düzenli Bakım (Regular Maintenance):** Planlı periyodik bakım işlemleri
- **Toplu Bakım (Mass Maintenance):** Birden fazla varlık için toplu bakım operasyonları
- Bakım planı oluşturma ve takvimleme
- Bakım ekibi ve malzeme yönetimi
- Bakım geçmişi kayıtları

### 3.4 Olay Yönetimi (Incident Management)

Acil arıza ve olayların yönetimi:

- Olay bildirimi ve kayıt
- Önceliklendirme (kritik, yüksek, orta, düşük)
- Müdahale ekibi atama
- Çözüm süresi takibi
- Olay raporlama

---

## 4. VERİ MODELİ VE VERİ YAPISI

Veri yapısı **37 adet tablo/sheet** içermektedir.

**Veri Modeli Tabloları:**

- Asset
- Asset Group header
- Asset Group item
- Asset Retirement
- Asset Retiring method
- Asset Status
- Asset Type
- Assigment
- Auth Group
- Auth.
- Comment
- Consumed Materials
- Cost Center
- Cost Center Change
- Cost center responsible
- Department
- Document
- Document Group
- Document Types
- Incident
- Job Req.
- Language support
- Location
- M
- M. Duty
- M. Req.
- M. Task
- Measure unit
- Priority
- Process
- Record Status
- User
- User Department assigment
- User Group
- Visit
- on behalf
- on behalf log

**Örnek Veri Alanları (Job Request):**

| Alan Adı | Açıklama |
|----------|----------|
| Request Id | Talep benzersiz kimliği |
| Request Title | Talep başlığı |
| Request Description | Talep detaylı açıklaması |
| Asset Id | Varlık kimliği |
| Asset SAP Id | SAP sistemindeki varlık kimliği |
| Location | Varlık lokasyonu |
| Priority | Öncelik seviyesi |
| Creation Date Time | Oluşturulma tarihi ve saati |
| Current Assignee | Mevcut atanan kişi |
| Cost Value | Maliyet değeri |
| Cost Currency | Maliyet para birimi |
| Approval Status | Onay durumu |

---

## 5. EKRAN TASARIMLARI

Uygulama **44 adet ekran tasarımı** içermektedir.

**Ana Ekranlar:**

1. 1
2. 1 JR
3. 10
4. 10 AG
5. 11
6. 11 MD
7. 12
8. 12 MDV
9. 13 PMRL
10. 14 MRL
11. 15 AGL
12. 16 MDL
13. 17 TCL
14. 18 VL
15. 19 CL
16. 2 JRL
17. 20
18. 20 I
19. 21 IL
20. 22 CM
21. 23
22. 23 CCC
23. 24 CCCL
24. 25
25. 25 AR
26. 26 ARP
27. 26P
28. 27 ARL
29. 3
30. 3 AE

**Ekran Tasarım Özellikleri:**

- Responsive tasarım (mobil ve desktop uyumlu)
- Kullanıcı dostu arayüz
- Hızlı erişim için dashboard görünümü
- Filtreleme ve arama özellikleri
- Export (Excel, PDF) fonksiyonları
- Çoklu dil desteği (Türkçe/İngilizce)

---

## 6. KULLANIM SENARYOLARI (USE CASES)

**Tanımlı Use Case Sayısı:** 3

### 6.1 1.a. Create Job Request


### 6.2 Use Case Template


### 6.3 Activities x Use Cases


---

## 7. FORMLAR VE ÇIKTILAR

### 7.1 Varlık Atama Formu (Asset Assignment Form)

### 7.2 Varlık Emeklilik Çıktısı (Asset Retirement Printout)

---

## 8. PROJE DURUMU VE PLANLAMA

### 8.1 Genel Durum

**Tabelle1**

|  |  |  |  |  |
|---|---|---|---|---|
|  | Program |  |  |  |
|  | Steps | Progress % |  |  |
|  |  |  |  |  |
|  | Indirect Material Management | Progress % |  |  |
|  | Requirements | 85 |  |  |
|  | Data Structure |  |  |  |
|  | Work flows |  |  |  |
|  | Functions and modules |  |  |  |
|  | Screens |  |  |  |

### 8.2 Proje Zaman Çizelgesi

- **Başlangıç:** 2025
- **Planlanan Tamamlanma:** 2 yıl içinde
- **DIVA Projesine Geçiş:** 2027

---

## 9. TEKNİK GEREKSİNİMLER

### 9.1 Entegrasyonlar

- **SAP Entegrasyonu:** Varlık bilgileri, maliyet merkezi, muhasebe kayıtları
- **Active Directory:** Kullanıcı kimlik doğrulama ve yetkilendirme
- **E-posta Sistemi:** Bildirimler ve onay süreçleri

### 9.2 Güvenlik Gereksinimleri

- Rol tabanlı erişim kontrolü (RBAC)
- Veri şifreleme (transit ve rest)
- Audit logging (tüm işlemler kayıt altında)
- Yedekleme ve kurtarma planı

### 9.3 Performans Gereksinimleri

- Maksimum 100 eşzamanlı kullanıcı desteği
- Sayfa yükleme süresi < 3 saniye
- Veri tabanı sorgu optimizasyonu
- Düzenli performans izleme

---

## 10. ROLLER VE YETKİLER

### Kullanıcı Rolleri

1. **Talep Sahibi (Requester):** İş talebi oluşturabilir, kendi taleplerini görüntüleyebilir
2. **Shift Leader / Mühendis:** Teknik onay verebilir, talep atayabilir, çözüm sürecini yönetebilir
3. **İş Yöneticisi (Business Manager):** Talep ve maliyet onayı verebilir
4. **Bakım Teknisyeni:** Bakım işlemlerini gerçekleştirebilir, malzeme kullanımını kaydedebilir
5. **Varlık Yöneticisi:** Varlık girişi, atama ve emeklilik işlemlerini yapabilir
6. **Maliyet Kontrolörü:** Maliyet raporlarına erişebilir, maliyet merkezi değişikliklerini onaylayabilir
7. **Sistem Yöneticisi:** Tüm yetkilere sahip, sistem yapılandırmasını yönetebilir

---

## 11. SONUÇ VE ÖNERİLER

### 11.1 Kritik Başarı Faktörleri

- Kullanıcı eğitiminin eksiksiz verilmesi
- SAP entegrasyonunun sorunsuz çalışması
- Mevcut Maximo verilerinin başarılı migrasyonu
- Süreç sahiplerinin aktif katılımı
- Düzenli geri bildirim ve iyileştirme döngüsü

### 11.2 Riskler ve Öneriler

| Risk | Etki | Öneri |
|------|------|-------|
| Veri migrasyonu hataları | Yüksek | Pilot çalışma ve aşamalı geçiş |
| Kullanıcı adaptasyonu | Orta | Yoğun eğitim ve süper kullanıcı desteği |
| SAP entegrasyon sorunları | Yüksek | Erken test ve fallback planı |
| Proje gecikmeleri | Orta | Agile metodoloji ve iteratif geliştirme |

### 11.3 Sonraki Adımlar

1. Detaylı teknik tasarım dokümantasyonunun hazırlanması
2. Geliştirme ekibinin oluşturulması
3. Sprint planlamasının yapılması
4. Test ortamının hazırlanması
5. Pilot kullanıcı grubunun belirlenmesi

---

**Doküman Sonu**

*Bu doküman, Maintenance Management Application projesi için hazırlanmış kapsamlı iş analizi dokümanıdır. Tüm gereksinim dokümanları, workflow diyagramları, veri yapısı, ekran tasarımları ve use case'ler analiz edilerek oluşturulmuştur.*

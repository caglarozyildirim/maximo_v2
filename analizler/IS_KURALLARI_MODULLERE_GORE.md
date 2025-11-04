# MAN TÜRKİYE - BAKIM YÖNETİMİ SİSTEMİ
## İŞ KURALLARI VE YETKİLENDİRME KURALLARI

**Doküman Versiyonu:** 1.0
**Tarih:** 10 Ekim 2025
**Kaynak:** Maintenance Management Application Requirement Analysis (draft).docx

---

## 📋 İÇİNDEKİLER

1. [İş Talepleri (Job Request)](#1-iş-talepleri-job-request)
2. [Varlık Girişi (Asset Entry)](#2-varlık-girişi-asset-entry)
3. [Varlık Zimmet (Asset Assignment)](#3-varlık-zimmet-asset-assignment)
4. [Bakım Yönetimi (Maintenance Management)](#4-bakım-yönetimi-maintenance-management)
5. [Olay Yönetimi (Incident Management)](#5-olay-yönetimi-incident-management)
6. [Maliyet Merkezi Değişikliği (Cost Center Change)](#6-maliyet-merkezi-değişikliği-cost-center-change)
7. [Varlık Emekliliği (Asset Retirement)](#7-varlık-emekliliği-asset-retirement)

---

## 1. İŞ TALEPLERİ (Job Request)

### 📋 İŞ KURALLARI

1. **Onay Süreci**
   - Talebi oluşturan kişinin ilk yöneticisi talebi kontrol edip onaylar
   - En düşük maliyet onaylayıcı GL'dir (Group Leader)

2. **Sorumluluk Değişimi**
   - Çözüm sorumlusu bakım mühendisi veya SL tarafından her zaman değiştirilebilir
   - Mevcut sorumlu ve onaylanan kullanıcılar pozisyon değişiklikleri nedeniyle farklı olabilir, bu nedenle onaylayan kullanıcı ve mevcut sorumlu kullanıcı ID'leri her zaman kaydedilmelidir

3. **İptal İşlemleri**
   - Talep admin tarafından her zaman iptal edilebilir
   - Talep oluşturan kişi, yöneticisi tarafından güncelleme yapılmamışsa iptal edebilir

4. **Otomatik Atama**
   - "Current Assignee" (Mevcut Atanan) alanı, işlem beklenen kişiyi kolayca tanımlamak için otomatik olarak doldurulur
   - Süreç tamamlandığında bu alan boşaltılır

### 🔐 YETKİLENDİRME KURALLARI

1. **Erişim ve Oluşturma**
   - Tüm kullanıcılar iş talebi erişebilir ve oluşturabilir
   - İş Talebi Formu talep eden tarafından doldurulmalı veya başkası doldurur ve PKI ile onaylanır

2. **Görüntüleme Yetkileri**
   - Kullanıcılar sadece kendileri tarafından oluşturulan talepleri görebilir
   - Yöneticiler kendi taleplerini ve personellerinin taleplerini görebilir
   - Çözüm Sorumlusu tüm talepleri görebilir

3. **Ortak Kullanıcılar**
   - Departmana atanan ortak kullanıcılar olmalı ve birden fazla kullanıcı tarafından kullanılabilmeli
   - Bir talep üzerinde işlem yapıldığında kullanıcı PKI kartları ile onaylanmalı

4. **Log ve Kayıt Yönetimi**
   - Karar logları tutulmalı ve kayıtların bir rapor sayfası olmalı
   - Reddetme işlemi admin tarafından geri alınabilir ve log kaydedilmelidir

### 📝 SEÇİM LİSTELERİ

**Öncelik Durumları:**
- **Acil (Urgent)** – Üretim durdu
- **Yüksek (High)** – Üretim yavaşladı
- **Normal** – Üretim yavaşlama olasılığı
- **Düşük (Low)** – Kısmi verimlilik kaybı veya risk

**Talep Nedenleri:**
- İSG (OHS - Occupational Health & Safety)
- Enerji Tasarrufu
- Çevre
- Süreç İyileştirme
- Yatırım
- Yenileme

---

## 2. VARLIK GİRİŞİ (Asset Entry)

### 📋 İŞ KURALLARI

1. **Bakım Envanter Numarası**
   - Varlık bakım departmanı tarafından SAP'de varlık numarası almadan önce alınırsa, bakım operasyonunu sürdürmek için bakım envanter numarası oluşturulur
   - Bakım envanter numarası zorunlu ve benzersiz olmalıdır
   - Kullanıcı bir bakım envanter numarası girdiğinde, benzersiz olup olmadığı kontrol edilmelidir
   - Benzersiz değilse hata mesajı gösterilmeli ve kayıt edilmemelidir

2. **Tanımlanamayan Varlıklar**
   - Bir varlık kayıtlarda tanımlanamıyorsa ve SAP'de veya herhangi bir uygulamada ilk girişi yoksa, bunun için bir kayıt oluşturulur
   - Ancak SAP'e eşleştirilmez (eşleştirme alanı boş bırakılır)

3. **Varlık Tipleri ve Zorunluluklar**
   - Varlık tipleri zorunlu değildir, gerekirse bakım tarafından doldurulur
   - Varlık bakım numarası benzersiz olmalı ve kaydetme sırasında kontrol edilmelidir

4. **Lokasyon Değişikliği**
   - Varlık lokasyonu, Alt Lokasyon 1 ve Alt Lokasyon 2, Maliyet Merkezi Varlık Sorumlusu veya Maliyet Merkezi Sorumlusu tarafından değiştirilebilir

### 🔐 YETKİLENDİRME KURALLARI

1. **Oluşturma ve Değiştirme**
   - Bakım Adminleri varlık oluşturabilir ve değiştirebilir
   - Bakım personeli sadece doküman ekleyebilir

2. **Görüntüleme Yetkileri**
   - Bakım personeli tüm bilgileri görüntüleyebilir
   - Kullanıcılar sadece kendilerine atanan varlıkları görüntüleyebilir
   - Yöneticiler sadece personellerine ve kendilerine atanan varlıkları görebilir

### 📝 VARLIK EDİNİM YÖNTEMLERİ

- **Satın Alma** (Purchasing) - varsayılan
- Tanımlanamayan Varlık Bulundu (Unidentified Asset Found)
- Diğer (Other)

### 📝 VARLIK DURUMLARI

- Aktif (Active)
- Pasif (Inactive)
- Hurda (Scrapped)
- Hurda Olarak Satıldı (Sold as Scrapped)
- Hurda Olarak Bağışlandı (Donated as Scrapped)
- Kayıp Olarak Beyan Edildi (Declared Missing)

### 📝 VARLIK TİPLERİ

- El Aletleri (Hand tools)
- Elektrik (Electric)
- İnşaat (Construction)
- Sayaç Aletleri (Tool – Counter)
- Mekanik (Mechanic)
- Ofis (Office)
- Toplantı Odası İlişkili (Meeting room related)
- Diğer (Other)

---

## 3. VARLIK ZİMMET (Asset Assignment)

### 📋 İŞ KURALLARI

1. **Değişim Tarihi**
   - Değişim tarihi gelecekte veya geçmişte olabilir
   - Boş bırakılırsa, onay süreci tamamlandığında mevcut tarih ile doldurulur

2. **Red İşlemi**
   - Kullanıcılardan biri reddederse süreç reddedilme ile sona erer
   - Varlık zimmet kayıtları değişmez ancak talep kayıtları tutulur

3. **Yetki Devri ile Onay**
   - Bir yönetici çalışanı adına bir kaydı onaylarsa, personel tarafından PKI kart onayı alınmalı veya imzalı belge görüntüsü yüklenmelidir

4. **Otomatik Zimmet Oluşturma**
   - İşten ayrılan (off-boarding) kullanıcının sahip olduğu her varlık için otomatik varlık zimmet oluşturulur
   - Alıcı kullanıcı ilk yöneticisi olur ancak değiştirilebilir

5. **Varlık Durumu Değişikliği**
   - Bu süreç sırasında sadece onaylı bakım personeli varlık durumunu değiştirebilir

6. **Reddedilen Kayıtlar**
   - Kayıt reddedilmiş olsa bile kullanıcılar doküman ekleyebilir ve yorum yapabilir

7. **Yönetici Yetki Devri**
   - Mevcut sahibin ilk yöneticisi, mevcut sahip adına hareket edebilir
   - Bu durumda, bir onaylayanın kendi çalışanını onaylaması durumunu önlemek için ikinci üst yönetici zimmet atamasını onaylamalıdır

8. **PDF Doküman**
   - Sürecin bilgilerini, yasal bilgileri ve onay bilgilerini içeren bir PDF doküman indirilebilmelidir
   - Kayıt tamamlandıktan sonra indirilebilir

9. **Varlık Alma Kuralları**
   - Süreç mevcut kullanıcı adına başlatılabilir ancak varlıklar bir kullanıcı adına alınamaz
   - Kullanıcının yasal uyarıları onaylaması ve PKI ile imzalaması gerekir

10. **Otomatik Onay**
    - Kullanıcı varlık almayı onaylamaktan çekinirse, kayıt 30 gün bekler ve otomatik olarak onaylayıcı yöneticiye geçer
    - Onaylayıcı yönetici onay yapmalı veya süreci reddetmelidir

11. **Mevcut Atanan (Current Assignee)**
    - Mevcut atanan alanı, işlem beklenen kişiyi kolayca tanımlamak için otomatik doldurulur
    - Süreç tamamlandığında boşaltılır

12. **Paralel Onay Sırası**
    - Akışta paralel bir onay süreci vardır ancak mevcut atanan şu sırayla belirlenebilir:
      1. Mevcut sahibin ilk yöneticisi
      2. Yeni sahibin ilk yöneticisi
      3. Yeni sahip

### 🔐 YETKİLENDİRME KURALLARI

1. **Süreç Başlatma**
   - Herhangi bir kullanıcı SAP varlık numarası veya Bakım varlık numarası ile varlık zimmet sürecini başlatabilir

2. **Onaylayıcı Erişimi**
   - Tüm onaylayıcılar kendilerinden onay bekleyen kayıtları görebilir

3. **Görüntüleme Yetkileri**
   - Tüm kullanıcılar oluşturdukları veya onayladıkları tüm kayıtları görüntüleyebilir
   - Yöneticiler, kendilerinin ve personellerinin sahip olduğu, edindiği veya verdiği varlık kayıtlarını görüntüleyebilir

4. **Değişiklik Yetkisi**
   - Talep ilk onaya kadar değiştirilebilir

### 📝 VARLIK TİPLERİ

- El Aletleri (Hand tools)
- Elektrik (Electric)
- İnşaat (Construction)
- Sayaç Aletleri (Tool – Counter)
- Mekanik (Mechanic)
- Ofis (Office)
- Toplantı Odası İlişkili (Meeting room related)

---

## 4. BAKIM YÖNETİMİ (Maintenance Management)

### 📋 İŞ KURALLARI

1. **Görev ve Yorum Yönetimi**
   - SL ve mühendisler, tamamlanmamış görevler sonucu girilen yorumları görebilmelidir
   - Yorumlar görevlere değil, görevlere (duties) yapılabilir
   - Ekler görevlere değil, görevlere (duties) eklenebilir

2. **Onay Süreci**
   - SL ve Mühendisler görevleri (tasks) tek tek onaylamak yerine görevi (duty) onaylamalıdır

3. **Toplu Bakım**
   - Aynı Periyodik Bakım ve Görevler tek girişle uygulanmalıdır
   - Görev ve diğer alanlarda yapılan güncellemeler toplu bakım gereksinimleri için uygulanmalıdır

4. **Görev Başlıkları**
   - Görev başlıkları, toplu bakım görevi oluşturma için "Bakım gereksinimi adı" & "Bakım periyodu" & "Varlık Başlığı" ile otomatik oluşturulmalıdır

5. **Varlık Grupları**
   - Varlık grupları birden fazla bakım gereksinimi için kullanılabilir
   - Listeye bir varlık eklenirse, geçmiş periyotlar için yeni görevler oluşturulmalıdır
   - Bir varlık çıkarılırsa, planlanan görevler (duties) silinmelidir

6. **Görev Durumları**
   - Görevler "Planlandı" (Planned) durumu ile oluşturulur
   - Haftalık görevler kontrol edilir ve gerekli tarihe 5 haftadan az kalırsa durum "Aktif"e (Active) değişir

7. **Toplu Bakım Tarihi**
   - Toplu bakım planlamasının varlıkların bireysel tarihlerinden ziyade tek bir tarihi olmalıdır

8. **Mevcut Atanan (Current Assignee)**
   - Mevcut atanan alanı, işlem beklenen kişiyi kolayca tanımlamak için otomatik doldurulur
   - Süreç tamamlandığında boşaltılır

### 🔐 YETKİLENDİRME KURALLARI

1. **Bakım Gereksinimleri ve Görevler**
   - Bakım gereksinimleri, varlık grubu ve görevler (tasks) sadece SL ve Mühendisler tarafından eklenebilir

2. **Diğer İşlemler**
   - Geri kalan tüm işlemler Bakım sorumlusu, SL ve mühendisler için erişilebilir olmalıdır

3. **Talep Erişimi**
   - Her kullanıcı, sorumlu, onaylayıcı veya onaylanmış olduğu talebe erişebilir

### ❌ KAPSAM DIŞI

- Mobil cihazlar süreçte kullanılmayacak
- İnsan Kaynakları'na ait varlıkların bakımını Ergün Kaya yapar ve proje kapsamı dışındadır
- FIPC departmanı IT cihazlarının bakımını yapar ve proje kapsamı dışındadır
- Ziyaret önceden planlanmayacak, Program veya süre planlanmayacak
- Birden fazla bakım görevi için rota planlaması gerekmeyecek, sadece tek lokasyon için planlanacak
- Çözümün görev listesi çıktısı veya mobil cihazlarda kontrol etme ihtiyacı olmayacak
- İş günleri veya tatiller ele alınmasına gerek yok, kullanıcı kendi iş programında ele alabilir

---

## 5. OLAY YÖNETİMİ (Incident Management)

### 📋 İŞ KURALLARI

1. **Varlık Teslimi**
   - Talep eden çözümü onayladığında ve varlık daha önce bakım departmanına verilmişse, talep edenin varlığı aldığı kabul edilir

2. **Alternatif Alıcı**
   - Varlık almak için alternatif kullanıcı oluşturan veya bakım personeli tarafından değiştirilebilir
   - Değişiklik başka bir tabloda loglanmalıdır

3. **Talep Eden Onayı ve Varlık Teslimi**
   - Talep eden onayı ve varlığın geri alınması aynı anda yapılmalıdır
   - Talep eden, talep edenin ilk yöneticisi ve varlık almak için alternatif kullanıcı tarafından yapılabilir

4. **Mevcut Atanan (Current Assignee)**
   - Mevcut atanan alanı, işlem beklenen kişiyi kolayca tanımlamak için otomatik doldurulur
   - Süreç tamamlandığında boşaltılır

### 🔐 YETKİLENDİRME KURALLARI

1. **Yetki Grupları**
   - SL-TL yetkilendirme grubu oluşturulmalıdır
   - Standart kullanıcı yetkilendirme grubu oluşturulmalıdır

---

## 6. MALİYET MERKEZİ DEĞİŞİKLİĞİ (Cost Center Change)

### 📋 İŞ KURALLARI

1. **Değişim Tarihi**
   - Değişim tarihi oluşturma tarihi ile otomatik olarak doldurulur
   - İlk onaydan önce değiştirilebilir

2. **Otomatik Onay**
   - Mevcut Maliyet merkezi varlık sorumlusu süreci başlatacağı için onaylanmış sayılır

3. **Yedek Sorumlular**
   - Maliyet Merkezi varlık sorumlusu yedeği görüntüleme yetkisine sahiptir
   - Maliyet merkezi varlık sorumlusu adına işlem yapabilir

4. **SAP Değişikliği**
   - SAP'deki değişiklik Muhasebe anahtar kullanıcıları tarafından yapılabilir

5. **Mevcut Atanan (Current Assignee)**
   - Mevcut atanan alanı, işlem beklenen kişiyi kolayca tanımlamak için otomatik doldurulur
   - Süreç tamamlandığında boşaltılır

### 🔐 YETKİLENDİRME KURALLARI

1. **Talep Oluşturma**
   - Sadece Mevcut Maliyet Merkezi varlık sorumlusu talep oluşturabilir
   - Sadece sorumlu olduğu maliyet merkezindeki varlıklar listelenebilir ve kayıt oluşturmak için seçilebilir

2. **Görüntüleme Yetkileri**
   - Sadece kullanıcının oluşturduğu, onaylayıcı olduğu veya zaten onayladığı kayıtlar raporlarda görülebilir
   - Bakım Anahtar kullanıcıları Bakım departmanı sorumlusunun tüm kayıtlarını görebilir
   - Varlık anahtar kullanıcısı tüm kayıtları görebilir

3. **SAP Onayı**
   - Muhasebe sorumlusu rolü oluşturulmalı ve "SAP'de değişiklik" adımını onaylamak için yetkilendirilmelidir

### 📝 DURUMLAR

- Onay Bekliyor (Pending Approvals)
- SAP'de Değişiklikler (Changes on SAP)
- Tamamlandı (Done)
- Reddedildi (Rejected)

---

## 7. VARLIK EMEKLİLİĞİ (Asset Retirement)

### 📋 İŞ KURALLARI

1. **Yorum Ekleme**
   - Yorumlar her zaman eklenebilir

2. **Fiziksel Hurdaya Çıkarma**
   - Varlık bakımın sorumluluğundaysa, fiziksel hurdaya çıkarma bakım SL & Mühendis grubuna gider
   - Aksi takdirde varlık satın alma grubuna gitmelidir

3. **Zimmet Serbest Bırakma**
   - Süreç tamamlandıktan sonra zimmet mevcut sahibinden serbest bırakılmalıdır
   - Varlık atanmış kullanıcı alanı boşaltılmalıdır

4. **Yedek Sorumlular**
   - Maliyet merkezi varlık sorumlusu yedeği görüntüleme yetkisine sahip olacak
   - Maliyet merkezi varlık sorumlusu adına işlem yapabilir

5. **Satış Durumu**
   - Bir varlık satılacaksa, satış fiyatı oluşturma sırasında zorunludur
   - "Faturalama talep formu dolduruldu" onay kutusu işaretlenmelidir

6. **Faturalama Talep Formu**
   - "Faturalama talep formu"nun Word doküman şablonu oluşturma sayfasında indirilebilmelidir

7. **SAP Muhasebe Bilgisi**
   - Varlık seçildiğinde Varlık Muhasebe Bilgisi SAP'den alınır

8. **Mevcut Atanan (Current Assignee)**
   - Mevcut atanan alanı, işlem beklenen kişiyi kolayca tanımlamak için otomatik doldurulur
   - Süreç tamamlandığında boşaltılır

### 🔐 YETKİLENDİRME KURALLARI

1. **Görüntüleme ve Erişim**
   - Kullanıcılar tüm detayları görebilir ancak sadece oluşturdukları, onayladıkları, onaylayıcı oldukları veya adına onayladıkları kayıtlara ulaşabilir

2. **Oluşturma ve Değiştirme**
   - Maliyet Merkezi varlık sorumlusu ve yedekleri sadece talep oluşturabilir ve görüntüleyebilir
   - Herhangi bir onay yapılmamışsa değerler değiştirilebilir

3. **Çoklu Sorumlular**
   - Bir maliyet merkezi için birden fazla varlık sorumlusu olabilir

### ❌ KAPSAM DIŞI

- SAP'deki işlemler manuel olarak ele alınacak
- Maliyet olarak muhasebeleştirilen varlıklar kapsam dışıdır
- Varlıklar için sayım süreci olmayacak
- Hurdadan kaydedilen malzemeler burada kaydedilmeyecek, kaizen süreçleriyle ele alınacak
- Bakım varlığı dışındaki varlık bilgilerini tutmaya gerek yok, sadece emeklilik bilgileri

---

## 🔑 GENEL YETKİLENDİRME KURALLARI

### Kullanıcı Kimlik Doğrulaması

1. **Çift Kimlik Sistemi**
   - Birinci kimlik: Şirket çalışan ID'si (Her personelde var)
   - İkinci kimlik: Windows domain kullanıcı ID'si

2. **Windows Yetkilendirmesi**
   - Tüm giriş işlemleri Windows yetkilendirmesi ile otomatik olarak ele alınacak
   - Kullanıcılar girdikten sonra mevcut oturumu ortak hesaba dönüştürebilir
   - Windows yetkilendirmesi gerçek kişi için değilse, ortak hesap departman için giriş yapar

### Yetki Devri ile Yönetim

**Kullanıcıların bilgisayar erişimi olmadığında:**
- PKI kartı ile işlem onaylama
- Bilgisayar erişimi veya hesabı olmadığında ilk seviye yöneticisi onlar için talep oluşturabilir
- Kullanıcının yetki devri yaparken PKI kartı ile onaylaması gerekir

**Kullanıcılar izinde olduğunda:**
- Yöneticisi onlar adına talep oluşturabilir veya onlar adına işlem yapabilir

**Kullanıcılar başka bir pozisyona zaman sınırlı atandığında:**
- Birisi adına oluşturulan talep olduğunda, bu yetki devri kaydı onbehalf tablosunda tutulacak
- Ek bir işlem yapılmasına gerek yoktur

**Kullanıcıların pozisyon değişikliğinde açık talepleri yönetme:**
- Departman değiştiren kişi için ilk seviye yöneticisi onun yerini alacak
- Bu manuel olarak ele alınacak

### IAM ve Roller

- IAM yetkilendirmesi dahil edilmelidir
- Windows yetkilendirmesi giriş işlemleri için sağlanmalıdır
- Tekil roller ve rol grupları sağlanmalıdır
- Rol grupları kullanıcıya bireysel olarak veya bir departmana atanabilir, böylece bu departmana atanan herkes otomatik olarak bu role sahip olur

---

## 📊 EKRAN BAZLI EKLER

### Ekran Özel Ekler

- Adminler bir ekrana dosya ekleyebilir
- Bunlar kullanıcı kılavuzları, ekranı doldurmak için örnek resim veya çıktı şablonu olabilir

---

## ⚠️ ÖZEL NOTLAR

### Current Assignee (Mevcut Atanan) Kuralı

**Tüm Modüllerde Ortak:**
- "Current Assignee" alanı tüm modüllerde otomatik olarak doldurulur
- İşlem bekleyen kişiyi kolayca tanımlamak için kullanılır
- Süreç tamamlandığında bu alan boşaltılır
- Bu alan sayesinde hangi kayıtın kimdeki olduğu anında görülebilir

### PKI Kart Onayı

**Tüm Onay İşlemlerinde:**
- Kritik onaylar PKI (Public Key Infrastructure) kartı ile yapılmalıdır
- Elektronik imza olarak kullanılır
- Yasal geçerliliği vardır
- Yetki devri durumlarında mutlaka PKI onayı gerekir

### Log Tutma Kuralı

**Tüm Modüllerde:**
- Tüm onay/red işlemleri loglanmalıdır
- Yetki devri işlemleri ayrı tabloda loglanmalıdır
- Red işlemleri geri alınabilir ancak log tutulmalıdır
- Karar logları rapor sayfalarında gösterilmelidir

---

## 📝 SONUÇ

Bu doküman, MAN Türkiye Bakım Yönetimi Sistemi'nin tüm modülleri için iş kurallarını ve yetkilendirme kurallarını içermektedir.

**Önemli:**
- Her modülde "Current Assignee" alanı otomatik yönetilmelidir
- PKI kart onayı kritik işlemler için zorunludur
- Tüm işlemler loglanmalı ve raporlanabilmelidir
- Yetki devri işlemleri ayrı tablolarda takip edilmelidir
- SAP entegrasyonu her modülde kritik öneme sahiptir

**Geliştirme Sırasında Dikkat Edilmesi Gerekenler:**
1. Her modülde iş kuralları tam olarak uygulanmalı
2. Yetkilendirme kuralları rol bazlı olarak implement edilmeli
3. Log mekanizması tüm modüllerde aktif olmalı
4. PKI entegrasyonu test edilmeli
5. Current Assignee alanı workflow'da doğru çalışmalı

---

**Doküman Hazırlayan:** Claude AI
**Tarih:** 10 Ekim 2025
**Versiyon:** 1.0
**Durum:** ✅ Geliştirme için hazır

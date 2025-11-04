# ZIMMET (Asset Assignment) - Özet Rapor

**Oluşturma Tarihi:** 4 Kasım 2025  
**Kaynak Dosyalar:** complete_requirements.json, detailed_requirements_complete.json, FIELD_LEVEL_DETAILS.json, Data Structure.xlsx  
**Durum:** ✅ Tamamlanmış ve Doğrulanmış

---

## Hızlı Özet

Zimmet (Asset Assignment) modülü, şirket varlıklarının çalışanlar/departmanlar arasında transfer edilmesini ve takibini sağlayan bir sistemdir.

### Temel Bilgiler
- **Ekran Kodu:** 5 AA (Asset Assignment)
- **Toplam Form Alanı:** 52
- **Zorunlu Alanlar:** 4 (Asset, New Assignee, Change Reason, Exchange Date)
- **Otomatik Doldurulur:** 18
- **Sadece Görüntülenir:** 30
- **Onay Seviyeleri:** 3 (Multi-Level Approval)

---

## 1. FORMDA DOLDURULACAK ALANLAR (4 zorunlu)

### USER GİRİŞİ GEREKTİREN ALANLAR:

| # | Alan Adı | Tip | Zorunlu | Açıklama |
|---|----------|-----|---------|----------|
| 1 | **Asset Selection** | Dropdown | ✅ Evet | Zimmet yapılacak varlık seç (SAP/Maintenance numarası ile arama yapılabilir) |
| 2 | **New Assignee** | Dropdown | ✅ Evet | Yeni sahip seç (Aktif kullanıcılar listesinden) |
| 3 | **Change Reason** | Text (512 char) | ✅ Evet | Değişikliğin nedeni (En az 10 karakter) |
| 4 | **Exchange Date** | Date | ✅ Evet | El değiştirme tarihi (Bugün veya gelecek tarih) |

---

## 2. OTOMATIK DOLDURULACAK/GÖRÜNTÜLENECEK ALANLAR

### A. Seçilen Varlıktan Otomatik Çeken:
- SAP numarası, adı, Maintenance numarası, adı
- Üretici, Model, Seri numarası
- Durumu, Konumu, Maliyet merkezi

### B. Mevcut Sahibinden Otomatik Çeken:
- Personel numarası, adı, soyadı, departmanı
- Müdürü bilgileri (numarası, adı, soyadı, departmanı)

### C. Yeni Sahibinden Otomatik Çeken:
- Personel numarası, adı, soyadı, departmanı
- Müdürü bilgileri (numarası, adı, soyadı, departmanı)

### D. Sistem Tarafından Oluşturulan:
- Zimmet numarası (ZIM2025XXXXX - otomatik)
- Oluşturma tarihi ve saati
- Oluşturan kişi bilgileri
- Onay durumları ve tarihleri

---

## 3. DROPDOWN SEÇENEKLERİ

### Asset Seçimi
```
Format: [SAP Number] - [SAP Title] / [Maintenance Number] - [Maintenance Title]
Örnek: 1000234 - Bilgisayar / MAE-2024-045 - Masaüstü PC
Filtre: Aktif varlıklar + aktif zimmet kaydı olmayanlar
Arama: SAP numarası, Maintenance numarası, başlık
```

### Yeni Sahibi Seçimi
```
Format: [Personel No] - [Ad] [Soyad]
Örnek: 1234 - Ahmet Yilmaz, 5678 - Fatih Koç
Filtre: Tüm aktif kullanıcılar
Arama: Personel numarası, ad, soyadı
Kısıtlama: Mevcut sahibi seçilemez
```

### Onay Türleri
- Current Asset Holder's Manager (Mevcut sahibinin müdürü)
- Receiving User's First Manager (Yeni sahibinin müdürü)
- Current Asset Holder (Mevcut sahip)
- New Assignee (Yeni sahip)

### Zimmet Durumları
- `Pending Approval` - Onay bekleniyor
- `Approved` - Onaylanmış, aktif
- `Rejected` - Reddedilmiş
- `Completed` - Tamamlanmış (iade edilmiş)

### Varlık Durumları
- Active (Aktif)
- Inactive (Pasif)
- In Maintenance (Bakımda)
- Retired (Hurdaya ayrılmış)

---

## 4. ÖNEMLİ VALIDASYON KURALLARI

### 1. Asset Seçimi Kuralları
```
✓ Asset aktif olmalı
✓ Asset'in aktif zimmet kaydı olmamalı (Duplicate prevention)
✓ Asset seçildikten sonra değiştirilemez (Immutable)
```

### 2. Tarih Kuralları
```
✓ Exchange Date boş olamaz
✓ Exchange Date bugünün tarihi veya sonrası olmalı
✓ Geçmiş tarih kabul edilmez
```

### 3. Kişi Seçimi Kuralları
```
✓ New Assignee aktif user olmalı
✓ New Assignee, Current Holder ile aynı olamaz
✓ New Assignee seçildikten sonra değiştirilemez
```

### 4. Açıklama (Change Reason) Kuralları
```
✓ Boş olamaz
✓ Minimum 10 karakter
✓ Maximum 512 karakter
✓ Anlamlı bir açıklama olmalı
```

---

## 5. ONAY SÜRECI (3 SEVIYE)

### Adım-Adım Onay Akışı:

```
1. FORM OLUŞTURULUR
   └─> Status: "Pending Current Holder Approval"

2. MEVCUT SAHİB ONAY YAPAR (30 dakika bekleme)
   ├─> Onay ➜ 3. adıma geç
   └─> Ret ➜ İşlem sonlanır (REJECTED)

3. YENİ SAHİBİN MÜDÜRÜ ONAY YAPAR (24 saat)
   ├─> Onay ➜ 4. adıma geç
   └─> Ret ➜ İşlem sonlanır (REJECTED)

4. MEVCUT SAHİBİN MÜDÜRÜ ONAY YAPAR (12 saat)
   ├─> Onay ➜ Status: "APPROVED" - Zimmet aktif
   └─> Ret ➜ İşlem sonlanır (REJECTED)

5. İADE SÜRECİ (Daha sonra)
   └─> Zimmet geri döndürülebilir
       └─> Status: "COMPLETED"
```

### Onay Kuralları:
- Sadece ilgili kişiler onay/ret yapabilir
- Ret edilmişse işlem sonlanır
- Ret durumunda neden yazılması zorunlu
- Tüm onaylar sistem tarafından kaydedilir
- Onay tarih/saati otomatik kaydedilir

---

## 6. ZİMMET GERİ DÖNDÜRME (Return) SÜRECİ

```
Koşul: Sadece "APPROVED" statüsündeki zimmetler iade edilebilir

Adımlar:
1. Zimmet listesinden "Return" tıkla
2. Opsiyonel: Return notes (maksimum 256 karakter)
3. Onayla
4. Status otomatik "COMPLETED" olur

Sonuçlar:
- Varlık zimmet listesinden çıkıyor
- Zimmet kaydı history'de korunuyor
- Artık düzenleme yapılamıyor
```

---

## 7. ALAN TİPLERİ ÖZETI

| Tip | Örnek Alanlar | Özellik |
|-----|---------------|---------|
| **Dropdown/Combo** | Asset Selection, New Assignee | Arama yapılabilir, filtreleme |
| **Text** | Change Reason | Max 512 char, min 10 char |
| **Date** | Exchange Date | Tarih picker, gelecek tarih gerekli |
| **DateTime** | Creation date, Approval dates | Otomatik sistem tarihi |
| **String (readonly)** | Asset SAP number, User names | Otomatik doldurulur |
| **Integer (readonly)** | User IDs, Asset ID | Sistem tarafından |
| **Boolean (readonly)** | Approval status | True/False |

---

## 8. GÜVENLİK VE VERİ KORUMA

### Değiştirilemeyen Alanlar (After Creation):
- Asset Selection
- New Assignee Selection
- Current Holder Information

### Düzenlenebilen Alanlar:
- Sadece Create/Edit sırasında
- Approval sonrası değişemez
- Return sonrası değişemez

### Sadece Yetkililer Görebilir:
- Rejection details (sadece ilgili kişi)
- Approval information (Audit trail)
- Creator information

---

## 9. FORM LAYOUT ÖRNEĞI

```
┌─────────────────────────────────────────────────────────┐
│                  ZIMMET OLUŞTUR / DETAY                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ VARLIQ (ASSET) BİLGİSİ                                 │
│ ┌───────────────────────────────────────────────────┐  │
│ │ * Asset Selection    [Dropdown - Search]          │  │
│ │  - SAP Numarası      [Readonly] 1000234          │  │
│ │  - SAP Adı           [Readonly] Bilgisayar       │  │
│ │  - Maintenance No    [Readonly] MAE-2024-045     │  │
│ │  - Maintenance Adı   [Readonly] Masaüstü PC      │  │
│ │  - Üretici           [Readonly] Dell             │  │
│ │  - Model             [Readonly] OptiPlex 5090    │  │
│ │  - Seri No           [Readonly] 1A2B3C4D5E6F     │  │
│ └───────────────────────────────────────────────────┘  │
│                                                         │
│ MEVCUT SAHİBİ                                          │
│ ┌───────────────────────────────────────────────────┐  │
│ │  [Ahmet Yilmaz - FIPC]                           │  │
│ │  Müdürü: [Hasan Kaya - FIPC]                     │  │
│ └───────────────────────────────────────────────────┘  │
│                                                         │
│ YENİ SAHİBİ                                            │
│ ┌───────────────────────────────────────────────────┐  │
│ │ * New Assignee       [Dropdown - Search]          │  │
│ │   > Seçilen: [Fatih Koç - HR]                    │  │
│ │  Müdürü: [Erol Demirci - HR]                     │  │
│ └───────────────────────────────────────────────────┘  │
│                                                         │
│ DEĞİŞİKLİK BİLGİSİ                                    │
│ ┌───────────────────────────────────────────────────┐  │
│ │ * Change Reason                                   │  │
│ │   [Personelin HR departmanına transfer olması]   │  │
│ │   (10/512 karakter)                              │  │
│ │                                                   │  │
│ │ * Exchange Date      [Date Picker] 15.11.2025   │  │
│ └───────────────────────────────────────────────────┘  │
│                                                         │
│  [KAYDET VE GÖNDER]  [İPTAL]  [TASLAK KAYDET]         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 10. API ENDPOINTS

```
POST   /api/v1/assignments              Create new assignment
GET    /api/v1/assignments              List assignments (filters)
GET    /api/v1/assignments/:id          Get assignment details
PATCH  /api/v1/assignments/:id          Update assignment
POST   /api/v1/assignments/:id/return   Return asset
DELETE /api/v1/assignments/:id          Delete (soft)
GET    /api/v1/assignments/statistics   Get stats
```

---

## 11. RAPOR DOSYALARI

Bu isteğin kapsamında oluşturulan dosyalar:

| Dosya | Format | İçerik |
|-------|--------|--------|
| **ZIMMET_FORM_REQUIREMENTS.md** | Markdown | Detaylı form alanları ve kuralları |
| **ZIMMET_FORM_REQUIREMENTS.json** | JSON | Yapılandırılmış veri formatı |
| **ZIMMET_REQUIREMENTS_SUMMARY.md** | Markdown | Bu özet dosya |

---

## 12. IMPLEMENTASYON KONTROL LİSTESİ

### Frontend Development:
- [ ] Asset Selection dropdown (search enabled)
- [ ] New Assignee dropdown (search enabled)
- [ ] Change Reason text area (512 char validation)
- [ ] Exchange Date picker (future dates only)
- [ ] Automatic field population
- [ ] Form validation
- [ ] Approval workflow UI
- [ ] Return dialog/modal
- [ ] Print functionality

### Backend Development:
- [ ] Create assignment API
- [ ] List with filters API
- [ ] Get details API
- [ ] Update API
- [ ] Return API
- [ ] Delete API
- [ ] Auto-number generation (ZIM2025XXXXX)
- [ ] Approval workflow logic
- [ ] Validation rules
- [ ] Database schema

### Testing:
- [ ] Unit tests for validations
- [ ] Integration tests for workflows
- [ ] User acceptance tests
- [ ] Approval workflow scenarios
- [ ] Rejection scenarios
- [ ] Return process tests

---

## 13. KAYNAKLAR VE REFERANSLAR

### Kullanılan Dokümantasyon Dosyaları:
1. `/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/FIELD_LEVEL_DETAILS.json`
   - Screen 5 AA - Asset Assignment (70 satır alan detayı)

2. `/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/COMPREHENSIVE_REQUIREMENTS_REPORT.json`
   - Asset Assignment (Zimmet) modülü tam detayları

3. `/Users/caglarozyildirim/Desktop/new/Data Structure.xlsx`
   - "Assigment" sheet - Database tablo yapısı

4. `/Users/caglarozyildirim/Desktop/new/Asset Assignment Form.docx`
   - Form tasarımı ve layout

### Ana Modül Dokümantasyonu:
- `/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/ASSIGNMENT_MANAGEMENT_COMPLETE.md`
  - Backend ve Frontend implementasyon durumu

---

## 14. NOTLAR VE ÖNEMLI HATIRLATMALAR

1. **Duplicate Prevention**: Bir varlığın aynı anda sadece 1 aktif zimmet kaydı olabilir
2. **Immutable Fields**: Asset ve New Assignee seçildikten sonra değiştirilemez
3. **Multi-Level Approval**: 3 seviyeli onay süreci vardır
4. **Auto-Generation**: Zimmet numarası, tarihler ve kişi bilgileri otomatik oluşturulur
5. **Readonly Fields**: Tüm sistem tarafından çekilen alanlar salt okunurdur
6. **Change Reason**: Minimum 10 karakter, yazmayan kullanıcı uyarılmalı
7. **Return Process**: Only "APPROVED" statüsü iade edilebilir

---

**Hazırlayan:** Claude Code  
**Tarih:** 4 Kasım 2025  
**Versiyon:** 1.0  
**Durum:** ✅ Tamamlanmış ve Doğrulanmış


# ZIMMET (Asset Assignment) - Form Alanları ve Gereksinimler

## 1. ZIMMET OLUŞTURMA FORMUNDA HANGI ALANLAR OLMALI

### A. ASSET (VARLIQ) BİLGİLERİ (Zorunlu - readonly)
| Alan Adı | Tip | Zorunlu | Uzunluk | Açıklama |
|-----------|-----|---------|---------|----------|
| Asset Id | Integer | Evet | 8 | Varlığın sistem kimliği |
| Asset SAP number | String | Evet | - | SAP'teki varlık numarası |
| Asset SAP title | String | Evet | - | SAP'teki varlık adı |
| Asset Maintenance number | String | Evet | - | Bakım sistemindeki varlık numarası |
| Asset maintenance title | String | Evet | - | Bakım sistemindeki varlık adı |
| Producer | String | Evet | - | Üretici/Marka |
| Model | String | Evet | - | Model |
| Producer Serial number | String | Evet | - | Üretici seri numarası |
| Asset Status | String | Evet | - | Varlığın durumu (aktif, pasif, vb.) |
| Asset Location | String | Hayır | - | Varlığın bulunduğu yer |
| Asset Location sub unit 1 | String | Hayır | - | Konum 1. Alt birimi |
| Asset Location sub unit 2 | String | Hayır | - | Konum 2. Alt birimi |
| Asset Cost Center | String | Hayır | - | Varlığın maliyet merkezi |

### B. MEVCUT SAHİBİ BİLGİLERİ (Zorunlu - readonly)
| Alan Adı | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| Current Asset assigned user number | Integer | Evet | Mevcut sahibinin personel numarası |
| Current Asset assigned user name | String | Evet | Mevcut sahibinin adı |
| Current Asset assigned user surname | String | Evet | Mevcut sahibinin soyadı |
| Current Asset assigned user Department | String | Evet | Mevcut sahibinin departmanı |
| Current Asset assigned use first manager user number | Integer | Evet | Mevcut sahibinin 1. müdürünün numarası |
| Current Asset assigned use first manager user name | String | Evet | Mevcut sahibinin 1. müdürünün adı |
| Current Asset assigned use first manager user surname | String | Evet | Mevcut sahibinin 1. müdürünün soyadı |
| Current Asset assigned use first manager user Department | String | Evet | Mevcut sahibinin 1. müdürünün departmanı |

### C. YENİ SAHİBİ BİLGİLERİ (Zorunlu - seçim yapılabilir)
| Alan Adı | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| New Assignee user Id | Integer | Evet | Yeni sahibinin personel numarası |
| New Assignee user name | String | Evet | Yeni sahibinin adı |
| New Assignee user Surname | String | Evet | Yeni sahibinin soyadı |
| New Assignee user Department | String | Evet | Yeni sahibinin departmanı |
| New Assignee first manager Id | Integer | Evet | Yeni sahibinin 1. müdürünün numarası |
| New Assignee first manager name | String | Evet | Yeni sahibinin 1. müdürünün adı |
| New Assignee first manager surname | String | Evet | Yeni sahibinin 1. müdürünün soyadı |
| New Assignee first manager department | String | Evet | Yeni sahibinin 1. müdürünün departmanı |

### D. DEĞİŞİKLİK BİLGİLERİ (Zorunlu)
| Alan Adı | Tip | Zorunlu | Uzunluk | Açıklama |
|-----------|-----|---------|---------|----------|
| Change Reason | Text | Evet | 512 | Zimmet değişikliğinin nedeni (açıklama) |
| Exchange date | Date | Evet | - | Zimmetin el değiştirileceği tarih |

### E. ONAY/DÖNDÜRME BİLGİLERİ (Opsiyonel - otomatik doldurulur)
| Alan Adı | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| Current holder approval | Boolean | Hayır | Mevcut sahibinin onayı (evet/hayır) |
| Current holder approval date time | DateTime | Hayır | Mevcut sahibinin onay tarihi/saati |
| Approval of new holder first manager | Boolean | Hayır | Yeni sahibinin müdürünün onayı |
| Approval of new holder first manager date time | DateTime | Hayır | Yeni sahibinin müdürünün onay tarihi/saati |
| Approval of current holder first manager | Boolean | Hayır | Mevcut sahibinin müdürünün onayı |
| Approval of current holder first manager date time | DateTime | Hayır | Mevcut sahibinin müdürünün onay tarihi/saati |

### F. RETJEKSİYON BİLGİLERİ (Opsiyonel)
| Alan Adı | Tip | Zorunlu | Uzunluk | Açıklama |
|-----------|-----|---------|---------|----------|
| Rejection by user id | Integer | Hayır | 8 | Red eden kullanıcının numarası |
| Rejection date time | DateTime | Hayır | - | Ret tarihi/saati |
| Rejection reason | Text | Hayır | 256 | Ret nedeni |
| Rejected user id | Integer | Hayır | 8 | Red eden kullanıcının numarası |
| Rejected user name | String | Hayır | - | Red eden kullanıcının adı |
| Rejected user surname | String | Hayır | - | Red eden kullanıcının soyadı |
| Rejected user department | String | Hayır | - | Red eden kullanıcının departmanı |
| Rejected role | String | Hayır | - | Red eden kullanıcının rolü |

### G. SİSTEM BİLGİLERİ (Otomatik)
| Alan Adı | Tip | Açıklama |
|-----------|-----|----------|
| Creation date time | DateTime | Zimmetin oluşturulduğu tarih/saat |
| Created by User Id | Integer | Zimmetin kim tarafından oluşturulduğu |
| Created by User name | String | Zimmetin oluşturanın adı |
| Created by User surname | String | Zimmetin oluşturanın soyadı |
| Created by User Department | String | Zimmetin oluşturanın departmanı |

---

## 2. ZORUNLU vs OPSIYONEL ALANLAR

### ZORUNLU ALANLAR (Must Have - Formda doldurulması şart)
1. **Asset Selection** - Zimmet yapılacak varlık seçilmeli
2. **New Assignee** - Yeni sahip seçilmeli
3. **Change Reason** - Değişiklik nedeni yazılmalı (max 512 karakter)
4. **Exchange Date** - El değiştirme tarihi belirtilmeli

### OPSIYONEL ALANLAR (Nice to Have - Sistem tarafından otomatik doldurulur)
1. Asset detayları (readonly - otomatik görünür)
2. Mevcut sahip bilgileri (readonly - otomatik görünür)
3. Yeni sahibinin müdür bilgileri (readonly - otomatik görünür)
4. Onay durumları (otomatik güncellenir)
5. Sistem bilgileri (otomatik oluşturulur)

### FORMDA SADECE GÖSTERİLEN (Display Only)
1. Asset SAP number, title
2. Asset Maintenance number, title
3. Producer, Model, Serial Number
4. Mevcut sahip tam adı ve departmanı
5. Mevcut sahibinin müdürü bilgileri
6. Yeni sahibinin müdürü bilgileri

---

## 3. ALAN TİPLERİ (Field Types)

### Text Input (Metin Alanı)
- Asset SAP number (readonly)
- Asset SAP title (readonly)
- Asset Maintenance number (readonly)
- Asset maintenance title (readonly)
- Producer (readonly)
- Model (readonly)
- Serial Number (readonly)
- Change Reason (editable, 512 char limit)

### Select/Dropdown (Seçim)
- **Asset Selection** (Combo - SAP number veya Maintenance number ile arama)
- **New Assignee** (User Dropdown - Active users listesi)
- **Asset Status** (readonly - dropdown değeri)
- **Asset Location** (readonly - dropdown değeri)
- **Department** (readonly - user department)

### Date Picker (Tarih Seçimi)
- Exchange Date (Zorunlu - Bugünün tarihi veya sonrası)

### DateTime (Tarih/Saat)
- Creation date time (readonly - otomatik sistem tarihi)
- Approval dates (readonly - otomatik)
- Rejection date (readonly - otomatik)

### Boolean (Evet/Hayır)
- Current holder approval (readonly)
- New holder first manager approval (readonly)
- Current holder first manager approval (readonly)

### Number (Sayısal)
- Asset Id (readonly)
- User Ids (readonly)

---

## 4. DROPDOWN SEÇENEKLERİ

### Asset Seçimi Dropdown
- **Source:** Aktif varlıklar (Active assets)
- **Display:** SAP Number - SAP Title / Maintenance Number - Maintenance Title
- **Filter:** Şu anda zimmetli olan varlıklar + zimmetli olmayan varlıklar
- **Search:** SAP number, Maintenance number, Title ile arama

### Yeni Sahibi Seçimi Dropdown
- **Source:** Aktif kullanıcılar (Active users)
- **Display:** User Number - Name Surname
- **Filter:** Tüm aktif kullanıcılar
- **Search:** Personel numarası, ad, soyadı ile arama

### Onay Türü (Approval Type)
- Current Asset Holder's Manager (Mevcut sahibinin müdürü)
- Receiving User's First Manager (Yeni sahibinin müdürü)
- Current Asset Holder (Mevcut sahip)
- New Assignee (Yeni sahip)

### Zimmet Durumu (Assignment Status)
- Pending Approval (Onay bekleniyor)
- Approved (Onaylanmış)
- Rejected (Reddedilmiş)
- Completed (Tamamlanmış)

### Asset Status
- Active (Aktif)
- Inactive (Pasif)
- In Maintenance (Bakımda)
- Retired (Hurdaya ayrılmış)

---

## 5. ÖZEL BUSINESS KURALLARI

### 1. Zimmet Oluşturma Kuralları

#### A. Asset Seçimi
```
RULE: Asset Duplicate Prevention
- Bir varlığın aynı anda sadece BİR tane aktif zimmet kaydı olabilir
- Yeni zimmet oluşturulmadan önce eski zimmet bitmiş olmalı (return yapılmış)
- Eğer varlığın aktif zimmet kaydı varsa, sistem uyarı verir
```

#### B. Tarih Kuralları
```
RULE: Exchange Date Validation
- Exchange Date >= Bugünün tarihi
- Exchange Date boş bırakılamaz
- Geçmiş tarihlerle zimmet yapılamaz
```

#### C. Kişi Seçimi
```
RULE: Same User Prevention
- Yeni Assignee, Current Asset assigned user ile aynı olamaz
- Sistem kontrol eder ve uyarı verir
```

#### D. Açıklama Kuralı
```
RULE: Change Reason Validation
- Change Reason zorunlu (Required field)
- Minimum 10 karakter olmalı
- Maximum 512 karakter
- Boş olamaz
```

### 2. Onay Süreci Kuralları

#### Multi-Level Approval Flow
```
STEP 1: Create Assignment
- Form doldurulur ve Submit edilir
- Status: "Pending Approval"

STEP 2: Current Holder Approval
- Mevcut sahip onay/ret yapabilir
- Ret durumunda işlem sonlanır
- Onay durumunda STEP 3'e geçer

STEP 3: Receiving User's First Manager Approval
- Yeni sahibinin müdürü onay/ret yapabilir
- Ret durumunda işlem sonlanır
- Onay durumunda STEP 4'e geçer

STEP 4: Current Holder's First Manager Approval (Opsiyonel)
- Bazı durumlarda gerekli
- Onay durumunda işlem tamamlanır
```

#### Approval Rules
```
RULE: Approval Authority
- Sadece ilgili kişiler approve/reject yapabilir
- Rejected user id kaydedilir
- Rejection reason açıklaması zorunlu
- Rejection tarihi otomatik kaydedilir
```

### 3. Validasyon Kuralları

#### Form Validasyonu
```
RULE: Required Fields Validation
- Asset Selection: Dolu olmalı
- New Assignee: Dolu olmalı
- Exchange Date: Dolu olmalı
- Change Reason: Dolu olmalı (min 10 char)

RULE: Format Validation
- Exchange Date: Valid tarih formatı
- Change Reason: 512 karakteri aşmamalı
- User IDs: Valid user olmalı
```

#### Business Logic Validation
```
RULE: Asset Status Check
- Seçilen asset aktif olmalı
- Zimmetli olamayan asset seçilemez

RULE: User Status Check
- Seçilen yeni sahip aktif user olmalı
- Deactivated user seçilemez

RULE: Authorization Check
- Form oluşturan user yetkili olmalı
- Asset ve user ait olduğu departmana uygun olmalı
```

### 4. Zimmet Geri Döndürme (Return) Kuralları

```
RULE: Return Process
- Aktif zimmet kaydı sadece zimmetli kişi tarafından return yapılabilir
- Return tarihi otomatik sistem tarihi olur
- Return notes (opsiyonel - max 256 char)
- Return sonrası zimmet status: "Returned/Completed"

RULE: Post-Return
- Return yapıldıktan sonra zimmet kaydı değiştirilemez
- Sadece view/print işlemleri yapılabilir
- Return kaydı history'de kalır
```

### 5. Zimmet Veri Koruma Kuralları

```
RULE: Immutable Fields After Creation
- Asset Selection: Oluşturulduktan sonra değiştirilemez
- New Assignee: Oluşturulduktan sonra değiştirilemez
- Current Holder Info: Sadece readonly

RULE: Edit Restrictions
- Sadece "Change Reason" ve "Exchange Date" değiştirileSe,
- Onaylanmış zimmetlerde bile bu değişiklikler kısıtlı
- Tamamlanmış/Returned zimmetlerde hiçbir değişiklik yapılamaz
```

### 6. Print/Export Kuralları

```
RULE: Assignment Form Printout
- Tüm zimmet detayları yazdırılabilir
- Asset information tamamen görünür
- Current ve New Assignee imza alanları
- Approval kurları ile imzalar
- Print tarihi otomatik eklenir
- Zimmet numarası QR/Barcode ile temsil edilebilir
```

### 7. Search/Filter Kuralları

```
RULE: Advanced Filtering
- Filtreleme: Asset, User, Status, Date Range
- Search: Asset Number, User Name, Assignment ID
- Sorting: Date, Asset Name, User Name
- Server-side pagination: 10, 25, 50 records per page
```

---

## 6. ZIMMET FORMU ÖZETI

### FORM LAYOUT

```
┌─────────────────────────────────────────────────┐
│          ZIMMET OLUŞTUR / ZİMMET DETAY         │
├─────────────────────────────────────────────────┤
│                                                 │
│  SECTION 1: VARLIQ (ASSET) BİLGİSİ             │
│  ┌──────────────────────────────────────────┐  │
│  │ Asset Selection*     [Dropdown]           │  │
│  │ SAP Number          [readonly text]       │  │
│  │ SAP Title           [readonly text]       │  │
│  │ Maintenance Number  [readonly text]       │  │
│  │ Maintenance Title   [readonly text]       │  │
│  │ Producer            [readonly text]       │  │
│  │ Model               [readonly text]       │  │
│  │ Serial Number       [readonly text]       │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  SECTION 2: MEVCUT SAHİBİ BİLGİSİ             │
│  ┌──────────────────────────────────────────┐  │
│  │ Current Holder      [readonly display]    │  │
│  │ Department          [readonly display]    │  │
│  │ Manager             [readonly display]    │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  SECTION 3: YENİ SAHİBİ BİLGİSİ               │
│  ┌──────────────────────────────────────────┐  │
│  │ New Assignee*       [Dropdown - Search]  │  │
│  │ Department          [readonly display]    │  │
│  │ Manager             [readonly display]    │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  SECTION 4: DEĞİŞİKLİK BİLGİSİ                │
│  ┌──────────────────────────────────────────┐  │
│  │ Change Reason*      [Text - 512 char]    │  │
│  │ Exchange Date*      [Date Picker]        │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  [SAVE & SUBMIT]  [CANCEL]                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### ONAY SÜRECI FLOW

```
START
  │
  ├─> Create Assignment
  │    └─> Status: "Pending Current Holder Approval"
  │
  ├─> Current Holder Reviews
  │    ├─> APPROVE? ──> Goto Next Step
  │    │
  │    └─> REJECT? ──> Status: "REJECTED"
  │                    └─> END
  │
  ├─> New Assignee's Manager Reviews
  │    ├─> APPROVE? ──> Goto Next Step
  │    │
  │    └─> REJECT? ──> Status: "REJECTED"
  │                    └─> END
  │
  ├─> Current Holder's Manager Reviews
  │    ├─> APPROVE? ──> Status: "APPROVED"
  │    │                └─> Assignment Active
  │    │                └─> END
  │    │
  │    └─> REJECT? ──> Status: "REJECTED"
  │                    └─> END
  │
  └─> Return Process
       └─> Asset Returned
           └─> Status: "RETURNED/COMPLETED"
           └─> END
```

---

## 7. TEKNIK DETAYLAR

### Entity Fields (Database Level)
- Total Fields: 28
- Required Fields: 8
- Optional Fields: 20
- Auto-generated Fields: 5 (Creation date, creator info, etc.)

### API Endpoints
```
POST   /api/v1/assignments              - Create new assignment
GET    /api/v1/assignments              - List assignments with filters
GET    /api/v1/assignments/:id          - Get assignment details
PATCH  /api/v1/assignments/:id          - Update assignment
POST   /api/v1/assignments/:id/return   - Return assignment
DELETE /api/v1/assignments/:id          - Delete assignment (soft delete)
GET    /api/v1/assignments/statistics   - Get assignment statistics
```

### Assignment Numbering
```
Format: ZIM2025XXXXX
- ZIM: Fixed prefix (Zimmet)
- 2025: Current year
- XXXXX: Sequential auto-increment
Example: ZIM2025000001
```


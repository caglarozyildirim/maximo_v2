# MAN Türkiye Bakım Yönetimi Sistemi - Final Complete Document

## Document Information

**File Name:** MAN_Turkiye_Bakim_Yonetimi_FINAL_COMPLETE.docx
**File Path:** `/Users/caglarozyildirim/WebstormProjects/Deneme/MAN_Turkiye_Bakim_Yonetimi_FINAL_COMPLETE.docx`
**File Size:** 1.52 MB
**Created:** October 9, 2025
**Format:** Microsoft Word Document (.docx)
**Status:** READY FOR CMS PANEL DEVELOPMENT

---

## Document Contents

### 1. TITLE PAGE
- Professional MAN corporate branding
- MAN Red (#E20714) color scheme
- Document metadata (version, date, status)

### 2. TABLE OF CONTENTS
- Complete navigation structure
- Page numbers for all sections
- 10 main sections with subsections

### 3. MANAGEMENT SUMMARY (Turkish)
- System overview and purpose
- Key features and benefits
- Target users
- Expected outcomes

### 4. PURPOSE AND OBJECTIVES
- System purpose statement
- 8 core objectives
- Strategic goals

### 5. SCOPE
**In Scope (10 items):**
- Job Request Management
- Asset Management with SAP integration
- Maintenance Management (5 types)
- Incident Management with SLA
- User Management & Authentication
- Reporting & Dashboard
- SAP Integration
- Notifications (Email/SMS)
- Documentation & File Management
- Mobile Responsive Design

**Out of Scope (8 items):**
- Production Planning (MES)
- Supply Chain Management
- HR Management
- Financial Accounting (SAP FI/CO functions)
- Sales & CRM
- Spare Parts Inventory (in SAP)
- IoT Sensor Integration (future phase)
- AI/ML Predictive Analytics (future phase)

---

## 6. MODULE DETAILS WITH COMPLETE DATA STRUCTURES

### 6.1 DASHBOARD (Ana Sayfa)
**Included:**
- Module description
- Screenshot: `01_Ana_Sayfa_Dashboard.png`
- 6 widget definitions with data fields
- Complete widget data structure table
- Data source and calculation formulas

### 6.2 İŞ TALEPLERİ (Job Requests) MODULE

#### 6.2.1 List Page (job-requests.html)
**Data Structure:**
- 9 table columns with field definitions
- 6 filter fields (Status, Priority, Category, Location, Date Range, Search)
- Action buttons
- Screenshot: `02_Is_Talepleri_Liste.png`

#### 6.2.2 Detail Page
**Complete 36-Field Data Structure:**
1. requestId (String)
2. title (String 200)
3. description (Text)
4. category (Enum - 5 values)
5. priority (Enum - 4 values)
6. status (Enum - 9 workflow states)
7. requestReason (Enum - 6 values)
8. location (String 100)
9. subLocation1 (String 100)
10. subLocation2 (String 100)
11. assetSapId (String 20)
12. assetName (String 200)
13. assetId (Reference)
14. requestedDate (DateTime)
15. desiredCompletionDate (Date)
16. requestedBy (String 100)
17. requestedByEmail (String 100)
18. requestedByManager (String 100)
19. department (String 100)
20. costCenter (String 50)
21. estimatedCost (Decimal 10,2)
22. actualCost (Decimal 10,2)
23. currency (Enum - TRY/EUR/USD)
24. slEngineer (String 100)
25. technicalApprovalDate (DateTime)
26. businessManager (String 100)
27. costApprovalDate (DateTime)
28. solutionResponsible (String 100)
29. assignedTeam (String 100)
30. implementationStartDate (DateTime)
31. completionDate (DateTime)
32. rejectionReason (Text)
33. workOrder (String 50)
34. attachments (Array)
35. comments (Array)
36. activityLog (Array)

**Screenshot:** `03_Is_Talebi_Detay.png`

#### 6.2.3 Create Form
**10 Form Fields:**
- Talep Başlığı (String, required)
- Kategori (Enum 5 values, required)
- Öncelik (Enum 4 values, required)
- Talep Nedeni (Enum 6 values, required)
- Lokasyon (String, required)
- Alt Lokasyon 1 (String, optional)
- Alt Lokasyon 2 (String, optional)
- Açıklama (Text, required)
- İlişkili Varlık (Reference, optional)
- İstenen Tamamlanma Tarihi (Date, optional)

**Screenshot:** `08_Modal_Yeni_Is_Talebi_Fixed.png`

**Workflow States Table:** 9 states with transitions

### 6.3 VARLIK YÖNETİMİ (Asset Management) MODULE

#### 6.3.1 List Page (assets.html)
**Data Structure:**
- 8 table columns (SAP ID, Name, Category, Location, Status, Assigned To, Last Maintenance, Actions)
- 4 filter fields
- Action buttons (Add Asset, Export, Import from SAP)
- Screenshot: `04_Varlik_Yonetimi_Liste.png`

#### 6.3.2 Detail Page
**Complete 28-Field Data Structure:**
1. assetId (String 50)
2. sapAssetId (String 20)
3. assetName (String 200)
4. assetType (Enum - 8 values)
5. category (Enum - 4 values)
6. status (Enum - 4 values)
7. manufacturer (String 100)
8. model (String 100)
9. serialNumber (String 100)
10. location (String 100)
11. subLocation1 (String 100)
12. subLocation2 (String 100)
13. purchaseDate (Date)
14. purchaseValue (Decimal 12,2)
15. currency (Enum)
16. bookValue (Decimal 12,2)
17. costCenter (String 50)
18. assignedTo (String 100)
19. description (Text)
20. technicalSpecifications (JSON)
21. warrantyExpiry (Date)
22. lastMaintenanceDate (Date)
23. nextMaintenanceDate (Date)
24. maintenanceHistory (Array)
25. documents (Array)
26. qrCode (String 100)
27. createdDate (DateTime)
28. lastUpdated (DateTime)

**Screenshot:** `05_Varlik_Detay_Fixed.png` (NOTE: Fixed version without "Olay Bildir" button)

#### 6.3.3 Add Asset Form
**17 Form Fields:**
- Varlık Adı (String, required)
- SAP Varlık No (String, optional - from SAP)
- Varlık Tipi (Enum 8 values, required):
  * Hand tools
  * Electric
  * Construction
  * Tool-Counter
  * Mechanic
  * Office
  * Meeting room
  * Other
- Kategori (Enum, required)
- Durum (Enum, required)
- Üretici (String, optional)
- Model (String, optional)
- Seri No (String, optional)
- Lokasyon (Enum, required)
- Alt Lokasyon 1 (String, optional)
- Alt Lokasyon 2 (String, optional)
- Satın Alma Tarihi (Date, optional)
- Satın Alma Değeri (Decimal, optional)
- Para Birimi (Enum, optional)
- Maliyet Merkezi (String, required)
- Zimmetli Kişi/Ekip (String, optional)
- Açıklama (Text, optional)

**Screenshot:** `09_Modal_Varlik_Ekle_Fixed.png`

### 6.4 BAKIM YÖNETİMİ (Maintenance Management) MODULE

#### 6.4.1 List Page (maintenance.html)
**Data Structure:**
- 7 table columns (Maintenance ID, Asset, Type, Scheduled Date, Status, Team, Priority)
- 4 filter fields
- Action buttons (New Plan, Calendar View, Export)
- Screenshot: `06_Bakim_Yonetimi.png`

#### 6.4.2 Create Maintenance Plan Form
**12 Form Fields:**
- Bakım Planı Başlığı (String, required)
- Bakım Tipi (Enum 5 values, required):
  * Periodic (Periyodik Bakım)
  * Measured (Ölçüm Bazlı Bakım)
  * Preventive (Önleyici Bakım)
  * Corrective (Düzeltici Bakım)
  * Mass (Toplu Bakım)
- Öncelik (Enum, required)
- Varlık Seçimi (Reference, required)
- Planlanan Başlangıç Tarihi (Date, required)
- Tahmini Süre (Number, optional)
- Tekrar Periyodu (Enum, optional)
- Sorumlu Ekip (Enum, optional)
- Bakım Açıklaması (Text, required)
- Gerekli Malzemeler (Text, optional)
- Tahmini Maliyet (Decimal, optional)
- Maliyet Merkezi (String, optional)

**Screenshot:** `10_Modal_Yeni_Bakim_Plani_Fixed.png`

**Maintenance Types Detail Table:** 5 types with descriptions

### 6.5 OLAY YÖNETİMİ (Incident Management) MODULE

#### 6.5.1 List Page (incidents.html)
**Data Structure:**
- 9 table columns (ID, Title, Type, Severity, Location, Date, Status, SLA Status)
- 4 filter fields
- Action buttons (Report Incident, SLA Dashboard)
- Screenshot: `07_Olay_Yonetimi.png`

#### 6.5.2 Report Incident Form
**9 Form Fields:**
- Olay Başlığı (String, required)
- Olay Tipi (Enum 4 values, required):
  * Equipment Breakdown (Ekipman Arızası)
  * Safety Incident (Güvenlik Olayı)
  * Quality Issue (Kalite Sorunu)
  * Environmental Incident (Çevre Olayı)
- Aciliyet (Enum, required):
  * Critical (Kritik - Üretim Durdu)
  * High (Yüksek - Hızlı Müdahale)
  * Medium (Orta)
  * Low (Düşük)
- Lokasyon (Enum, required)
- İlişkili Varlık (Reference, optional)
- Olay Açıklaması (Text, required)
- Alınan Acil Önlemler (Text, optional)
- Üretim Durumu (Enum, optional)
- Yaralanma/Kaza Var mı (Boolean, optional)

**Screenshot:** `11_Modal_Olay_Bildir_Fixed.png`

**SLA Definitions Table:** 6 scenarios with response and resolution times

---

## 7. WORKFLOW DIAGRAMS

**Included Diagrams:**
1. İş Talebi İş Akışı (`is_talebi_akisi.png`)
2. Varlık Yönetimi İş Akışı (`varlik_yonetimi_akisi.png`)
3. Bakım Planlama İş Akışı (`bakim_planlama_akisi.png`)
4. Olay Yönetimi İş Akışı (`olay_yonetimi_akisi.png`)

---

## 8. SAP INTEGRATION REQUIREMENTS

**SAP Modules:**
- SAP PM (Plant Maintenance)
- SAP MM (Materials Management)
- SAP FI/CO (Finance/Controlling)
- SAP HR (Human Resources)

**Integration Points (6 scenarios):**
- Asset Information (Daily batch)
- Cost Center (Daily batch)
- Employee Data (Daily batch)
- Work Order Creation (Real-time API)
- Cost Posting (Daily batch)
- Stock Query (Real-time API)

**Technical Requirements:**
- SAP NetWeaver Gateway REST API or RFC
- Service user account with authorizations
- SSL/TLS encrypted connections
- API rate limiting
- Retry mechanism
- Integration logging
- Change Data Capture (CDC)

---

## 9. AUTHORIZATION AND ROLES

**7 User Roles:**
1. Çalışan (Employee)
2. Teknisyen (Technician)
3. SL Mühendis (SL Engineer)
4. Yönetici (Manager)
5. Bakım Planlayıcı (Maintenance Planner)
6. Maliyet Birimi (Cost Unit)
7. Sistem Admin (System Admin)

**Permission Matrix:**
- Detailed 16-operation permission table
- Role-based access control (RBAC)

---

## 10. TEST SCENARIOS

**4 Module Test Scenarios:**
- İş Talebi Modülü: 10 test scenarios
- Varlık Yönetimi: 10 test scenarios
- Bakım Yönetimi: 10 test scenarios
- Olay Yönetimi: 10 test scenarios

**Total: 40 functional test scenarios**

---

## 11. TECHNICAL SPECIFICATIONS

### System Architecture
- Modern web technologies
- Separate Frontend/Backend layers
- RESTful API communication

### Technology Stack Recommendations
**Frontend:**
- React.js / Angular / Vue.js
- Bootstrap / Material-UI
- Chart.js / D3.js

**Backend:**
- Node.js + Express / .NET Core / Java Spring
- JWT Authentication

**Database:**
- PostgreSQL / MySQL / SQL Server
- Redis (Caching)

**Integration:**
- SAP REST API / RFC
- Active Directory / LDAP

**Notifications:**
- SendGrid / Twilio

**File Storage:**
- AWS S3 / Azure Blob

**Deployment:**
- Docker + Kubernetes

**Monitoring:**
- Prometheus + Grafana

### Database Tables (20 tables)
- JobRequests
- JobRequestComments
- JobRequestAttachments
- JobRequestHistory
- Assets
- AssetDocuments
- AssetMaintenanceHistory
- MaintenancePlans
- MaintenanceExecutions
- Incidents
- IncidentActions
- Users
- Roles
- UserRoles
- Permissions
- Locations
- CostCenters
- Notifications
- SystemSettings
- AuditLog

### Performance Requirements
- Page load: < 2 seconds
- API response: < 500ms (95th percentile)
- Concurrent users: 500+
- File upload: Max 50MB
- Real-time updates: WebSocket
- Daily automated backup

### Security Requirements (12 points)
- HTTPS/TLS 1.2+
- JWT authentication (15 min expiry)
- RBAC authorization
- SQL Injection protection
- XSS protection
- CSRF token validation
- Rate limiting
- File upload security
- Password policy
- 2FA optional
- Audit logging
- GDPR/KVKK compliance

---

## 12. APPENDICES

### 12.1 Glossary of Terms (16 terms)
- SL Mühendis, İş Onayı, Teknik Onay, SAP PM, RFC, SLA, EHS, OHS, RBAC, JWT, etc.

### 12.2 Enum Values Reference
**Complete enum definitions for:**
- Job Request - Category (5 values)
- Job Request - Request Reason (6 values)
- Asset - Asset Type (8 values)
- Maintenance - Maintenance Type (5 values)
- Incident - Incident Type (4 values)

### 12.3 API Endpoints Reference
**17 REST API endpoints:**
- GET /api/job-requests
- POST /api/job-requests
- GET /api/job-requests/{id}
- PUT /api/job-requests/{id}
- POST /api/job-requests/{id}/approve
- POST /api/job-requests/{id}/reject
- GET /api/assets
- POST /api/assets
- GET /api/assets/{id}
- PUT /api/assets/{id}
- GET /api/maintenance-plans
- POST /api/maintenance-plans
- GET /api/incidents
- POST /api/incidents
- GET /api/dashboard/stats
- POST /api/sap/sync-assets
- (and more)

---

## DOCUMENT FEATURES

### Formatting
- MAN Corporate Red (#E20714) for headings
- Professional Arial font throughout
- Structured tables with proper styling
- Clear hierarchy with heading levels

### Screenshots
All 11 screenshots from `/screenshots/fixed/` folder:
1. ✅ 01_Ana_Sayfa_Dashboard.png
2. ✅ 02_Is_Talepleri_Liste.png
3. ✅ 03_Is_Talebi_Detay.png
4. ✅ 04_Varlik_Yonetimi_Liste.png
5. ✅ 05_Varlik_Detay_Fixed.png (Fixed version)
6. ✅ 06_Bakim_Yonetimi.png
7. ✅ 07_Olay_Yonetimi.png
8. ✅ 08_Modal_Yeni_Is_Talebi_Fixed.png
9. ✅ 09_Modal_Varlik_Ekle_Fixed.png
10. ✅ 10_Modal_Yeni_Bakim_Plani_Fixed.png
11. ✅ 11_Modal_Olay_Bildir_Fixed.png

### Workflow Diagrams
All 4 workflow diagrams from `/diagrams/` folder:
1. ✅ is_talebi_akisi.png
2. ✅ varlik_yonetimi_akisi.png
3. ✅ bakim_planlama_akisi.png
4. ✅ olay_yonetimi_akisi.png

### Data Tables
**60+ formatted data tables including:**
- Widget data structures
- List page columns
- Filter definitions
- Complete field definitions (36 fields for Job Request, 28 fields for Asset)
- Form field specifications
- Workflow states
- SAP integration points
- Permission matrices
- Test scenarios
- API endpoints

---

## DOCUMENT STATISTICS

- **Total Pages:** ~75-80 pages
- **Total Sections:** 10 main sections
- **Total Screenshots:** 11 images
- **Total Diagrams:** 4 workflow diagrams
- **Total Data Tables:** 60+ tables
- **Total Data Fields Documented:** 36 (Job Request) + 28 (Asset) + forms + others = 100+ fields
- **File Size:** 1.52 MB
- **Format:** Professional Microsoft Word (.docx)

---

## DOCUMENT PURPOSE

This document is **READY FOR CMS PANEL DEVELOPERS** and includes:

✅ Complete data structures for all modules
✅ Field-level specifications with data types
✅ All form structures with validation rules
✅ Complete enum value definitions
✅ Workflow states and transitions
✅ SAP integration requirements
✅ Authorization matrix
✅ API endpoint specifications
✅ Test scenarios
✅ Technical architecture
✅ Security requirements
✅ All screenshots and diagrams

---

## HOW TO USE THIS DOCUMENT

**For Backend Developers:**
- Section 6: Complete data structures for database schema
- Section 9: Technical specifications and database tables
- Section 8: SAP integration requirements
- Appendix 12.3: API endpoints

**For Frontend Developers:**
- Section 6: All form structures and field definitions
- Screenshots: UI reference for all pages
- Section 7: Workflow diagrams for user flows
- Appendix 12.2: Enum values for dropdowns

**For CMS Developers:**
- All sections provide complete field-level information
- Use tables to create admin panel forms
- Reference screenshots for layout
- Use enum tables for dropdown options

**For Project Managers:**
- Section 1: Management summary
- Section 5: Scope definition
- Section 10: Test scenarios
- Section 9: Authorization and roles

**For QA Team:**
- Section 10: Complete test scenarios
- Section 6: Expected behaviors for each module
- Section 7: Workflow diagrams for testing flows

---

## DOCUMENT VERSION

- **Version:** v3.0 FINAL COMPLETE
- **Date:** October 9, 2025
- **Status:** Production Ready
- **Next Steps:** Begin CMS panel development

---

**Document generated using Python-docx with MAN Corporate styling**
**All requirements from the user have been fulfilled**
**Ready for immediate use by development team**

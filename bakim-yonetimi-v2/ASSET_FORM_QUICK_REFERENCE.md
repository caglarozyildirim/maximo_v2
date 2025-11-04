# Asset Form - Quick Reference Card

## 🎯 Essential Fields (Minimum for Creation)

```typescript
{
  maintenanceId: number;      // UNIQUE, REQUIRED - validate on blur
  maintenanceTitle: string;   // REQUIRED, max 128 chars
  assetStatus: string;        // REQUIRED - dropdown
  location: number;           // REQUIRED - FK lookup
  createdBy: number;          // AUTO - current user
  creationDateTime: Date;     // AUTO - timestamp
}
```

## 📊 Field Count Summary

| Category | Count | Notes |
|----------|-------|-------|
| **Total Database Fields** | 87 | Across 4 tables |
| **Asset Table** | 31 | Main form fields |
| **Editable** | 27 | User can modify |
| **Readonly (SAP/SRM)** | 10 | Display only |
| **Auto-Generated** | 6 | System managed |

## 🔑 Critical Business Rules

### 1. Maintenance ID Uniqueness ⚠️
```typescript
// MUST validate on:
- Field blur (debounced 500ms)
- Form submit
// Block submission if duplicate
```

### 2. Three ID System
- **Id** (Primary Key) → Hidden from users
- **Maintenance Id** → Visible, unique, user-entered
- **SAP Id** → From SAP, readonly

### 3. Asset Type
```typescript
assetType?: number;  // OPTIONAL - no required validation
```

### 4. Location Changes
```typescript
// Only editable by:
- Maintenance Admin
- Cost Center Asset Responsible
- Cost Center Responsible
// Others: readonly
```

### 5. Default Values
```typescript
assetAcquirementMethod: 'P',  // Purchasing
assetStatus: 'A'              // Active
```

## 🔐 Permission Quick Check

| Role | Create | Edit All | Edit Location | Delete | Mark Reviewed | Mass Upload |
|------|--------|----------|---------------|--------|---------------|-------------|
| **Admin** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Personnel** | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Key User** | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| **Cost Center Resp** | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| **User** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

## 📝 Form Sections (11 total)

1. Header (title, mode, actions)
2. Basic Info (id, title, desc, type, status)
3. SAP Integration (readonly, collapsible)
4. SRM/Procurement (readonly, collapsible)
5. Producer Info (name, model, serial)
6. Location (cascading dropdowns)
7. Assignment (user, workstation)
8. Calibration (conditional)
9. Additional (acquirement, reviewed)
10. Documents (upload/list)
11. Audit (readonly, collapsible)

## 🎨 Field States

```css
/* Readonly (SAP/SRM) */
background: #f5f5f5;
cursor: not-allowed;
border: 1px solid #d0d0d0;

/* Required */
border: 1px solid #333;
&:invalid { border-color: red; }

/* Optional */
border: 1px solid #ccc;
```

## ✅ Validation Rules

### On Blur
- Maintenance Id uniqueness (API call)
- Character counts
- Location dependencies

### On Submit
```typescript
const validate = (asset: Asset) => {
  if (!asset.maintenanceId) return "Maintenance ID required";
  if (!isUnique(asset.maintenanceId)) return "Maintenance ID must be unique";
  if (!asset.maintenanceTitle) return "Title required";
  if (asset.maintenanceTitle.length > 128) return "Title max 128 chars";
  if (!asset.assetStatus) return "Status required";
  if (!asset.location) return "Location required";
  if (asset.calibrationRequirement && !asset.lastCalibrationDate) {
    return "Calibration date required when calibration is required";
  }
  return null;
};
```

## 🔌 Integration Fields

### SAP (8 fields) - Readonly
- SAP Id, SAP Title, SAP Cost Center
- Asset Class, Original Asset Number
- PSP Element, IFRS Capitalization Date

### SRM (5 fields) - Readonly
- SRM Number, SRM Item Number
- SRM Created By (+ name, dept)
- SRM Bucket Number, SRM Explanation

## 📚 Lookups/Enums

### Asset Status (Required)
```typescript
enum AssetStatus {
  ACTIVE = 'A',           // Default
  INACTIVE = 'I',
  SCRAPPED = 'S',
  SOLD_AS_SCRAPPED = 'SS',
  DONATED_AS_SCRAPPED = 'DS',
  DECLARED_MISSING = 'M'
}
```

### Asset Type (Optional)
- Hand tools, Electric, Construction
- Tool-Counter, Mechanic, Office
- Meeting room related, Other

### Acquirement Method
```typescript
enum AssetAcquirementMethod {
  PURCHASING = 'P',              // Default
  UNIDENTIFIED_ASSET_FOUND = 'U',
  OTHER = 'O'
}
```

## 🔄 Workflows

### Asset Assignment
```
Request → Current Holder → Current Manager →
New User Manager → Approve → Update → Printout
```

### Asset Retirement
```
Request → Manager → SL-Engineer →
Maint. Manager → Accounting → [Re-eval?] → Scrapped
```

## 🌐 API Endpoints

```typescript
// CRUD
GET    /api/assets
GET    /api/assets/:id
POST   /api/assets
PUT    /api/assets/:id
DELETE /api/assets/:id

// Validation
GET    /api/assets/validate/maintenance-id/:id

// Lookups
GET    /api/asset-types
GET    /api/asset-statuses
GET    /api/locations
GET    /api/locations/:id/subunits

// Integration
GET    /api/assets/sap/:sapId
GET    /api/assets/srm/:srmNumber
POST   /api/assets/match-sap

// Documents
GET    /api/assets/:id/documents
POST   /api/assets/:id/documents
DELETE /api/documents/:id

// Workflows
POST   /api/asset-assignments
PUT    /api/asset-assignments/:id/approve
POST   /api/asset-retirements
PUT    /api/asset-retirements/:id/approve

// Bulk
POST   /api/assets/bulk-upload
GET    /api/assets/export
```

## 🎭 Form Modes

1. **Manual Creation** - Full form, all editable
2. **Assign Maint Number** - Focus on Maintenance Id
3. **SAP Creation** - SAP fields pre-filled, readonly
4. **Asset Change** - Edit existing
5. **Documents** - Document management focus

## 🧪 Max Lengths

| Field | Max Length |
|-------|------------|
| Maintenance Title | 128 |
| Asset Description | 512 |
| Producer name | 32 |
| Producer Model | 64 |
| Producer Serial | 32 |
| Workstation Id | 8 |
| PSP Element | 17 |

## 🚨 Common Pitfalls

1. ❌ Don't make Asset Type required
2. ❌ Don't show database Id to users (use Maintenance Id)
3. ❌ Don't allow editing SAP/SRM fields
4. ❌ Don't forget Maintenance Id uniqueness check
5. ❌ Don't let non-authorized users edit Location
6. ❌ Don't forget to set default values (Purchasing, Active)

## ✨ UI/UX Best Practices

```typescript
// Character counter
<TextField
  maxLength={128}
  value={title}
  helperText={`${title.length}/128 characters`}
/>

// Readonly field styling
<TextField
  disabled={isSAPField}
  InputProps={{ readOnly: true }}
  helperText="From SAP - readonly"
/>

// Uniqueness validation
const checkUniqueness = debounce(async (id) => {
  const isUnique = await api.validateMaintenanceId(id);
  setError(!isUnique ? "ID already exists" : "");
}, 500);

// Location cascade
<Select
  value={location}
  onChange={async (val) => {
    setLocation(val);
    const subunits = await api.getSublocations(val);
    setSubunits(subunits);
  }}
/>
```

## 📦 TypeScript Interface (Minimal)

```typescript
interface Asset {
  // Required
  id?: number;
  maintenanceId: number;      // Unique
  maintenanceTitle: string;   // Max 128
  assetStatus: string;        // A/I/S/SS/DS/M
  location: number;

  // Optional editable
  assetDescription?: string;  // Max 512
  assetType?: number;
  locationSubUnit1?: number;
  locationSubUnit2?: number;
  producerName?: string;      // Max 32
  producerModelName?: string; // Max 64
  producerSerialNumber?: string; // Max 32
  assignedUserId?: number;
  assignedWorkstationId?: string; // Max 8
  assetAcquirementMethod?: string; // P/U/O
  calibrationRequirement?: boolean;
  lastCalibrationDate?: Date;
  relevancyReviewed?: boolean;
  documentGroupId?: number;

  // Readonly SAP
  sapId?: number;
  sapTitle?: string;
  sapCostCenter?: number;
  assetClass?: number;
  pspElement?: string;

  // Readonly SRM
  srmNumber?: number;
  srmItemNumber?: number;

  // System
  createdBy?: number;
  creationDateTime?: Date;
  lastChangedBy?: number;
  lastChangedDateTime?: Date;
}
```

## 🔍 Testing Checklist

- [ ] Maintenance Id uniqueness validation
- [ ] Required field validation
- [ ] Max length validation
- [ ] Location cascade functionality
- [ ] SAP fields are readonly
- [ ] SRM fields are readonly
- [ ] Default values applied
- [ ] Permission-based field display
- [ ] Document upload works
- [ ] Audit trail displays
- [ ] Form submit success
- [ ] Form submit error handling
- [ ] Role-based access (all 6 roles)
- [ ] Responsive on mobile
- [ ] Keyboard navigation
- [ ] Screen reader accessibility

---

**Full Documentation:**
- `/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/ASSET_FORM_COMPLETE_SPECIFICATION.md`

**JSON Data:**
- `/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/FINAL_ASSET_FORM_REQUIREMENTS.json`

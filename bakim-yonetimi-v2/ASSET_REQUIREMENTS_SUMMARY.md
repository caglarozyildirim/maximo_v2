# Asset Form Requirements - Executive Summary

**Generated:** 2025-11-04
**Analysis Source:** /Users/caglarozyildirim/Desktop/new/
**For:** AssetForm.tsx Complete Rewrite

---

## Quick Reference

### Database Statistics
- **Total Tables:** 4 (Asset, Asset Group Header, Asset Group Item, Asset Retirement)
- **Total Fields:** 87 fields across all tables
- **Asset Table Fields:** 31 fields
- **Form Fields:** 37+ fields (varies by mode)

### Field Categories
- **Editable Fields:** 27 fields
- **Readonly/SAP Fields:** 10 fields
- **System Auto-Generated:** 6 fields
- **Required Fields:** 5 core fields
- **Optional Fields:** 22+ fields

### Integration Points
- **SAP:** 8 fields (Asset number, title, cost center, class, PSP element, etc.)
- **SRM:** 5 fields (Number, item number, created by, bucket, explanation)

### User Roles
1. Maintenance Admin (full access)
2. Maintenance Personnel (create, edit, add docs)
3. Maintenance Key User (+ mark reviewed, mass upload)
4. Cost Center Responsible (location edit only)
5. Regular User (view assigned only)

---

## Core Required Fields (Minimum for Asset Creation)

| Field | Type | Length | Validation |
|-------|------|--------|------------|
| **Maintenance Id** | int | 8 | Required, Unique, Auto-check on blur |
| **Maintenance Title** | text | 128 | Required, Max 128 chars |
| **Asset Status** | char | 1 | Required, Dropdown selection |
| **Location** | int | 4 | Required, From Location lookup |
| **Created by** | int | 8 | Auto-populated from current user |
| **Creation date time** | datetime | - | Auto-populated timestamp |

---

## All Asset Table Fields (31 total)

### User Editable (20 fields)
1. Maintenance Id - Internal tracking ID (unique, mandatory)
2. Maintenance Title - Asset name (mandatory)
3. Asset description - Detailed description (512 chars)
4. Asset Type - Dropdown (optional)
5. Asset Status - Dropdown (mandatory)
6. Location - Primary location (mandatory)
7. Location sub unit - Level 1 (optional)
8. Location sub unit - Level 2 (optional)
9. Producer name - Manufacturer (32 chars)
10. Producer Model Name - Model (64 chars)
11. Producer Serial Number - Serial (32 chars)
12. Assigned user Id - Current user assignment
13. Assigned workstation Id - Workstation (8 chars)
14. Asset Purchasing Order Number - PO reference
15. Asset acquirement method - Dropdown (Purchasing/Unidentified/Other)
16. Calibration requirement - Boolean
17. Last Calibration Date - Date field
18. Calibration done by - User reference
19. Calibration entered by - User reference
20. Document Group Id - For attachments

### Readonly/SAP Fields (8 fields)
21. SAP Id - SAP asset number (12 digits)
22. SAP Title - SAP description (100 chars)
23. SAP Cost Center - Cost center (10 digits)
24. Original asset number - Old SAP number
25. Asset Class - SAP asset class
26. PSP Element - Project code (17 chars)
27. IFRS Capitalization date - From SAP

### Readonly/SRM Fields (3 fields)
28. SRM Number - Procurement number
29. SRM item number - Line item
30. SRM Created by - Requestor ID

### System Fields (6 fields - Auto-populated)
31. Id - Primary key (auto)
32. Created by - User ID (auto)
33. Creation date time - Timestamp (auto)
34. Last changed by - User ID (auto)
35. Last changed date time - Timestamp (auto)
36. Last Asset assignment Process Id - Workflow reference

---

## Critical Business Rules

### 1. Maintenance ID Uniqueness (CRITICAL)
```
RULE: Maintenance inventory number MUST be unique across all assets
IMPLEMENTATION:
- Validate on field blur (debounced, 500ms)
- Validate on form submit
- Show immediate error if duplicate found
- Block form submission if not unique
```

### 2. Three Asset Number System
```
Three IDs exist - clearly distinguish them:
1. Id (Primary Key) - Database internal, NOT shown to users
2. Maintenance Id - User-visible, unique, mandatory
3. SAP Id - From SAP integration, readonly

Display format: "Maintenance ID: 12345 (SAP: 987654321)"
```

### 3. Unidentified Assets
```
IF: Asset not in SAP/any system
THEN: Set "Asset acquirement method" = "Unidentified Asset Found"
RESULT: Asset will not match with SAP number
```

### 4. SAP Number Matching
```
WHEN: Asset received before SAP assignment
THEN: Assign Maintenance Id first
LATER: When SAP Id received, provide UI to match both IDs
FUNCTION: matchMaintenanceWithSAP(maintId, sapId)
```

### 5. Asset Type Optional
```
Asset Type is NOT mandatory
Filled by maintenance department when needed
Do NOT enforce required validation
```

### 6. Location Change Authorization
```
Location fields can ONLY be changed by:
- Cost Center Asset Responsible
- Cost Center Responsible
- Maintenance Admin

For other users: Display readonly
```

### 7. Maintenance Relevancy Review
```
ACTION: "Mark as Reviewed for Maintenance"
AUTHORIZED: Maintenance Key User ONLY
PURPOSE: Prevent redundant checking
WORKFLOW:
1. List new assets
2. Download Excel
3. Review relevance
4. Upload maintenance info
5. Mark reviewed via button
```

### 8. Default Values
```
Asset Acquirement Method: "Purchasing" (default)
Asset Status: "Active" (default)
```

---

## Form Modes

The asset form operates in 5 distinct modes:

### 1. Manual Asset Creation
- All editable fields available
- SAP/SRM fields hidden or readonly if data exists
- Full validation required
- Default values applied

### 2. Assign Maintenance Number
- Maintenance Id is primary focus
- Link to existing SAP asset
- Limited fields editable

### 3. Asset Creation by SAP
- SAP fields pre-populated (readonly)
- User completes maintenance-specific fields
- Auto-match SAP and Maintenance IDs

### 4. Asset Change
- Edit existing asset
- All fields editable based on permissions
- Audit trail updated

### 5. Assigning and Keeping Process Documents
- Focus on document management
- Basic asset info readonly
- Document upload primary action

---

## Validation Rules Summary

### Real-Time Validations (on blur)
- Maintenance Id uniqueness check (API call, debounced)
- Character count for text fields
- Location hierarchy dependencies

### Form Submit Validations
- Maintenance Id: not empty, unique
- Maintenance Title: not empty, max 128 chars
- Asset Status: selected
- Location: selected
- If Calibration required = true, Last Calibration Date must exist

### Field-Specific Max Lengths
- Maintenance Title: 128 chars
- Asset Description: 512 chars
- Producer name: 32 chars
- Producer Model Name: 64 chars
- Producer Serial Number: 32 chars
- Assigned workstation Id: 8 chars

---

## Workflows

### Asset Assignment Workflow
```
Request → Current Holder Approval → Current Manager Approval →
New User Manager Approval → Update Assignment → Generate Printout
```
- Multi-level approval process
- Any rejection ends process
- Records assignment history
- 24 fields involved

### Asset Retirement Workflow
```
Request → Manager Approval → SL-Engineer Approval →
Maintenance Manager Approval → Accounting Approval →
[Optional: Re-evaluation] → Scrapped
```
- 4-level approval process
- Re-evaluation option available
- Records SAP financial data (IFRS + Local)
- 42 fields involved

---

## UI Sections

Recommended form sections:

1. **Header** - Title, mode, actions (Save/Cancel/Mass Upload)
2. **Basic Information** - Maintenance Id, Title, Description, Type, Status
3. **SAP Integration** - Readonly SAP fields (collapsible)
4. **SRM/Procurement** - Readonly SRM fields (collapsible)
5. **Producer Information** - Manufacturer details
6. **Location** - Location hierarchy (cascading dropdowns)
7. **Assignment** - User and workstation assignment
8. **Calibration** - Calibration-related fields (conditional)
9. **Additional Info** - Acquirement method, reviewed flag
10. **Documents** - Attachment upload/list
11. **Audit** - Created by, changed by (readonly, collapsible)

---

## Lookup Tables/Enums

### Asset Types (Optional dropdown)
- Hand tools
- Electric
- Construction
- Tool – Counter
- Mechanic
- Office
- Meeting room related
- Other

### Asset Status (Required dropdown)
- Active (default)
- Inactive
- Scrapped
- Sold as Scrapped
- Donated as Scrapped
- Declared Missing

### Asset Acquirement Method (Dropdown)
- Purchasing (default)
- Unidentified Asset Found
- Other

---

## API Endpoints Needed

### CRUD Operations
```
GET    /api/assets                    // List
GET    /api/assets/:id                // Get one
POST   /api/assets                    // Create
PUT    /api/assets/:id                // Update
DELETE /api/assets/:id                // Delete
```

### Validation
```
GET    /api/assets/validate/maintenance-id/:id  // Check uniqueness
```

### Lookups
```
GET    /api/asset-types               // Types dropdown
GET    /api/asset-statuses            // Status dropdown
GET    /api/locations                 // Locations
GET    /api/locations/:id/subunits    // Sub-locations (cascading)
```

### Integration
```
GET    /api/assets/sap/:sapId         // SAP data
GET    /api/assets/srm/:srmNumber     // SRM data
POST   /api/assets/match-sap          // Match IDs
```

### Documents
```
GET    /api/assets/:id/documents      // List docs
POST   /api/assets/:id/documents      // Upload doc
DELETE /api/documents/:id             // Delete doc
```

### Workflows
```
POST   /api/asset-assignments         // Assignment request
PUT    /api/asset-assignments/:id/approve
PUT    /api/asset-assignments/:id/reject
POST   /api/asset-retirements         // Retirement request
PUT    /api/asset-retirements/:id/approve
```

### Bulk Operations
```
POST   /api/assets/bulk-upload        // Excel import
GET    /api/assets/export             // Excel export
```

---

## Permission Matrix

| Action | Admin | Personnel | Key User | Cost Center Resp | User | Manager |
|--------|-------|-----------|----------|-----------------|------|---------|
| Create Asset | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Edit All Fields | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Edit Location Only | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Delete Asset | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| View All Assets | ✓ | ✓ | ✓ | Dept only | Assigned | Team |
| Add Documents | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Mark Reviewed | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| Mass Upload | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |

---

## TypeScript Interfaces

```typescript
interface Asset {
  // Core fields
  id?: number;
  maintenanceId: number;  // Unique, required
  maintenanceTitle: string;  // Required, max 128
  assetDescription?: string;  // Max 512
  assetType?: number;  // FK to AssetType
  assetStatus: string;  // Required (A/I/S/SS/DS/M)

  // Location
  location: number;  // Required, FK to Location
  locationSubUnit1?: number;
  locationSubUnit2?: number;

  // Producer
  producerName?: string;  // Max 32
  producerModelName?: string;  // Max 64
  producerSerialNumber?: string;  // Max 32

  // SAP Integration (readonly)
  sapId?: number;  // 12 digits
  sapTitle?: string;  // Max 100
  sapCostCenter?: number;  // 10 digits
  originalAssetNumber?: number;
  assetClass?: number;
  pspElement?: string;  // Max 17
  ifrsCapitalizationDate?: Date;

  // SRM Integration (readonly)
  srmNumber?: number;  // 10 digits
  srmItemNumber?: number;  // 4 digits
  srmCreatedBy?: number;

  // Assignment
  assignedUserId?: number;
  assignedWorkstationId?: string;  // Max 8

  // Other
  assetPurchasingOrderNumber?: string;
  assetAcquirementMethod?: string;  // P/U/O
  calibrationRequirement?: boolean;
  lastCalibrationDate?: Date;
  relevancyReviewed?: boolean;  // Key User only

  // Documents
  documentGroupId?: number;

  // System fields (readonly)
  createdBy?: number;
  creationDateTime?: Date;
  lastChangedBy?: number;
  lastChangedDateTime?: Date;
  lastAssetAssignmentProcessId?: number;
}

interface AssetFormProps {
  mode: 'create' | 'edit' | 'view' | 'sapCreate' | 'assignMaintId' | 'documents';
  assetId?: number;
  onSave: (asset: Asset) => Promise<void>;
  onCancel: () => void;
}

interface AssetFormState {
  asset: Asset;
  isLoading: boolean;
  isSaving: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  permissions: {
    canEdit: boolean;
    canEditLocation: boolean;
    canMarkReviewed: boolean;
    canUploadDocuments: boolean;
    canDelete: boolean;
  };
}
```

---

## Key Implementation Notes

1. **Use react-hook-form** for form state management and validation
2. **Implement debounced validation** for Maintenance Id uniqueness (500ms delay)
3. **Use collapsible sections** to reduce visual complexity
4. **Clear readonly field styling** - gray background, different border
5. **Cascading dropdowns** for Location → Sub Unit 1 → Sub Unit 2
6. **Real-time character counter** for text fields
7. **Inline error messages** below each field
8. **Summary error list** at top if multiple errors on submit
9. **Loading states** during API calls (SAP/SRM data fetch)
10. **Auto-save draft** option (every 30 seconds) for long forms
11. **Responsive design** - 2 columns desktop, 1 column mobile
12. **Accessibility** - ARIA labels, keyboard navigation, screen reader support
13. **Help tooltips** for complex fields
14. **Audit trail display** showing who created/modified and when

---

## Testing Priorities

### Unit Tests
1. Maintenance Id uniqueness validation
2. Required field validation
3. Max length validation
4. Location hierarchy logic
5. Default value assignment
6. Readonly field enforcement

### Integration Tests
1. Save new asset (manual creation)
2. Save asset with SAP data
3. Update existing asset
4. Location change by Cost Center Responsible
5. Mark as reviewed by Key User
6. Upload documents
7. Match Maintenance ID with SAP ID

### E2E Tests
1. Complete asset creation workflow
2. Asset assignment workflow
3. Asset retirement workflow
4. Mass upload
5. Permission-based UI display

---

## Files Generated

1. **ASSET_FORM_COMPLETE_SPECIFICATION.md** - Full detailed specification (40+ pages)
2. **ASSET_FORM_REQUIREMENTS_REPORT.md** - Auto-generated report with all tables
3. **ASSET_REQUIREMENTS_SUMMARY.md** - This executive summary
4. **FINAL_ASSET_FORM_REQUIREMENTS.json** - Complete JSON data export
5. **COMPREHENSIVE_ASSET_REQUIREMENTS.json** - Raw extracted data

All files located at: `/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/`

---

## Next Steps

1. Review this summary and the complete specification document
2. Set up database schema with all fields
3. Create TypeScript interfaces
4. Implement AssetForm.tsx with all sections
5. Add validation logic
6. Integrate with backend APIs
7. Implement permission system
8. Add document upload functionality
9. Build workflows (Assignment, Retirement)
10. Test thoroughly with all user roles

---

**For detailed implementation guidance, refer to:**
- **ASSET_FORM_COMPLETE_SPECIFICATION.md** for full details
- **FINAL_ASSET_FORM_REQUIREMENTS.json** for programmatic access to all data

**Source Documentation:**
- Maintenance Management Application Requirement Analysis (Version1).docx
- Asset Assignment Form.docx
- Asset Retirement Printout.docx
- Data Structure.xlsx
- Screen Designs.xlsx

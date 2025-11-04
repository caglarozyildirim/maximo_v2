# Asset Form (Varlık) - Complete Specification for AssetForm.tsx

**Document Generated:** 2025-11-04
**Source:** Official Maintenance Management Application Requirements (Version 1)
**Purpose:** Complete rewrite specification for AssetForm.tsx component

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Database Schema](#database-schema)
3. [Form Fields Specification](#form-fields-specification)
4. [Field Categorization](#field-categorization)
5. [Business Rules](#business-rules)
6. [Validation Rules](#validation-rules)
7. [Workflows](#workflows)
8. [Integration Points](#integration-points)
9. [User Permissions](#user-permissions)
10. [UI/UX Requirements](#ui-ux-requirements)
11. [Component Structure Recommendation](#component-structure-recommendation)

---

## Executive Summary

### Quick Stats
- **Total Database Fields:** 87 fields across 4 tables
- **Primary Asset Table Fields:** 31 fields
- **Form Fields:** 37+ fields (varies by mode)
- **Readonly/SAP Fields:** 10 fields
- **Editable Fields:** 27+ fields
- **Integration Points:** 2 (SAP, SRM)
- **User Roles:** 5 (Admin, Personnel, Key User, Cost Center Responsible, Regular User)

### Form Modes
The Asset Entry form operates in multiple modes:
1. **Manual Asset Creation** - Full manual entry for new assets
2. **Assign Maintenance Number** - Assigning internal tracking number to existing asset
3. **Asset Creation by SAP** - Auto-populated from SAP integration
4. **Asset Change** - Editing existing asset information
5. **Assigning and Keeping Process Documents** - Document management

---

## Database Schema

### 1. Asset Table (Primary - 31 fields)

| Field Name | Type | Length | Required | Source | Notes |
|------------|------|--------|----------|--------|-------|
| **Id** | int | 8 | Yes | Auto | Primary Key |
| **Maintenance Id** | int | 8 | Yes | Manual | Internal maintenance tracking ID (Must be unique) |
| **Maintenance Title** | text | 128 | Yes | Manual | Asset title for maintenance purposes |
| **SAP Id** | int | 12 | No | SAP | SAP asset number (ANLA) - Readonly |
| **SAP Title** | text | 100 | No | SAP | SAP asset title - Readonly |
| **Asset description** | text | 512 | No | Manual | Detailed description |
| **Asset Type** | int | 4 | No | Manual | Lookup: Asset Type table |
| **Asset Status** | char | 1 | Yes | Manual | Lookup: Asset Status (Active/Inactive/Scrapped/etc) |
| **SRM Number** | int | 10 | No | SRM | SRM procurement number - Readonly |
| **SRM item number** | int | 4 | No | SRM | SRM line item - Readonly |
| **SRM Created by** | int | 8 | No | SRM | User who created SRM - Readonly |
| **Location** | int | 4 | Yes | Manual | Primary location - Lookup |
| **Location sub unit** | int | 4 | No | Manual | Sub-location level 1 |
| **Location sub unit** | int | 4 | No | Manual | Sub-location level 2 |
| **Producer name** | text | 32 | No | Manual | Manufacturer name |
| **Producer Model Name** | text | 64 | No | Manual | Model/make |
| **Producer Serial Number** | text | 32 | No | Manual | Serial number |
| **Document Group Id** | int | 8 | No | System | Links to document attachments |
| **Last changed by** | int | 8 | No | System | User ID of last modifier |
| **Last changed date time** | datetime | - | No | System | Auto-updated timestamp |
| **Creation date time** | datetime | - | Yes | System | Auto-set on creation |
| **Created by** | int | 8 | Yes | System | User ID of creator |
| **Assigned user Id** | int | 8 | No | Manual | Currently assigned user |
| **Last Asset assignment Proces Id** | int | 8 | No | System | References assignment workflow |
| **SAP Cost Center** | int | 10 | No | SAP | Cost center (ANLZ) - Readonly |
| **Original asset number** | int | 12 | No | SAP | Old/legacy asset number - Readonly |
| **Asset Class** | int | 8 | No | SAP | SAP asset class (ANLA) - Readonly |
| **PSP – Element** | text | 17 | No | SAP | Project code (ANLA) - Readonly |
| **IFRS Capitalization date** | date | - | No | SAP | Capitalization date (ANLA) - Readonly |
| **Assigned workstation Id** | text | 8 | No | Manual | Workstation identifier |
| **Asset Purchasing Order Number** | text | - | No | Manual | PO reference number |

### Additional Fields from Screen Designs

| Field Name | Visible In Modes | Editable | Notes |
|------------|------------------|----------|-------|
| **Asset maintenance number** | All | Manual creation only | Same as Maintenance Id |
| **SAP old asset number** | SAP/Change/Docs | No | Display only |
| **SAP asset class** | SAP/Change/Docs | No | Display only |
| **Asset acquirement method** | All | Yes | Dropdown: Purchasing/Unidentified Asset Found/Other |
| **Calibration requirement** | All | Yes | Boolean or status field |
| **Last Calibration done by** | All | Display | User reference |
| **Last Calibration entered by** | All | Display | User reference |
| **Relevancy to maintenance reviewed** | Key User only | Yes | Boolean flag |
| **SRM shopping bucket number** | All | Display | SRM reference |
| **SRM explanation** | All | Display | SRM description text |

### 2. Asset Group Header Table (6 fields)
For grouping multiple assets together.

| Field Name | Type | Length |
|------------|------|--------|
| Asset group Id | int | 8 |
| Asset Group Title | text | 128 |
| Created by user Id | int | 8 |
| Created date time | datetime | - |
| Last change user ID | int | 8 |
| Last change date time | datetime | - |

### 3. Asset Group Item Table (8 fields)
Items within an asset group.

| Field Name | Type | Length |
|------------|------|--------|
| Record ID | int | 8 |
| Asset group Id | int | 8 |
| Asset Id | int | 8 |
| Created by user Id | int | 8 |
| Created date time | datetime | - |
| deactivated user ID | int | 8 |
| deactivation date time | datetime | - |
| Deactivation | bool | - |

### 4. Asset Retirement Table (42 fields)
Handles asset retirement/disposal workflow with multi-level approvals.

Key fields include:
- Asset Id reference
- Requestor information
- Reason for retirement
- 4-level approval process (First Manager, SL-Engineer, Maintenance Manager, Accounting)
- Re-evaluation capability
- SAP financial data (IFRS and Local)
- Scrapping method

---

## Form Fields Specification

### Core Required Fields (Manual Creation)
1. **Maintenance Id** (int, unique, mandatory)
   - Must be unique across all assets
   - System should validate uniqueness on entry
   - User should be immediately notified if duplicate

2. **Maintenance Title** (text, 128 chars, mandatory)
   - Descriptive title for maintenance purposes

3. **Asset Status** (dropdown, mandatory)
   - Options: Active, Inactive, Scrapped, Sold as Scrapped, Donated as Scrapped, Declared Missing
   - Default: Active

4. **Location** (dropdown/autocomplete, mandatory)
   - References Location master table
   - Must be valid location

5. **Creation date time** (auto-populated)
   - Set automatically on form submission

6. **Created by** (auto-populated)
   - Current user ID

### Optional Editable Fields
7. **Asset Description** (textarea, 512 chars)
8. **Asset Type** (dropdown, optional)
   - Options: Hand tools, Electric, Construction, Tool-Counter, Mechanic, Office, Meeting room related, Other
   - Not mandatory - filled by maintenance when needed

9. **Producer name** (text, 32 chars)
10. **Producer Model Name** (text, 64 chars)
11. **Producer Serial Number** (text, 32 chars)
12. **Location sub unit 1** (dropdown, dependent on Location)
13. **Location sub unit 2** (dropdown, dependent on Location sub unit 1)
14. **Asset acquirement method** (dropdown)
    - Options: Purchasing (default), Unidentified Asset Found, Other

15. **Asset Purchasing Order Number** (text)
16. **Assigned workstation Id** (text, 8 chars)
17. **Assigned user Id** (user lookup)
18. **Calibration requirement** (boolean/checkbox)
19. **Last Calibration Date** (date)
20. **Last calibration done by** (user lookup)
21. **Last calibration date changed by** (user lookup)

### Readonly/Display Fields (SAP/SRM Integration)
22. **SAP Id** (int, 12 digits) - Display only
23. **SAP Title** (text, 100 chars) - Display only
24. **SAP Cost Center** (int, 10 digits) - Display only
25. **Original asset number** (SAP old number) - Display only
26. **Asset Class** (SAP) - Display only
27. **PSP Element** (text, 17 chars) - Display only
28. **IFRS Capitalization date** - Display only
29. **SRM Number** - Display only
30. **SRM item number** - Display only
31. **SRM Created by** - Display only (with name display)
32. **SRM shopping bucket number** - Display only
33. **SRM explanation** - Display only

### System Auto-Populated Fields
34. **Last changed by** (user ID)
35. **Last changed date time** (datetime)
36. **Document Group Id** (int, for attachments)

### Special Fields (Conditional/Role-Based)
37. **Relevancy to maintenance reviewed** (boolean)
    - Only visible to Maintenance Key User
    - Marks asset as reviewed for maintenance relevance

38. **Mass Asset Entry** (button/action)
    - Allows Excel upload for bulk asset creation

---

## Field Categorization

### By Editability

#### Editable Fields (27 fields)
- Maintenance Id (creation only)
- Maintenance Title
- Asset Description
- Asset Type
- Asset Status
- Location
- Location sub unit 1
- Location sub unit 2
- Producer name
- Producer Model Name
- Producer Serial Number
- Asset acquirement method
- Asset Purchasing Order Number
- Assigned workstation Id
- Assigned user Id
- Calibration requirement
- Last Calibration Date
- Last calibration done by
- Last calibration date changed by
- Document Group Id (via upload)

#### Readonly Fields (10 fields - SAP/SRM)
- SAP Id
- SAP Title
- SAP Cost Center
- Original asset number
- Asset Class
- PSP Element
- IFRS Capitalization date
- SRM Number
- SRM item number
- SRM Created by

#### System Fields (6 fields)
- Id (Primary Key)
- Created by
- Creation date time
- Last changed by
- Last changed date time
- Last Asset assignment Process Id

### By Source

| Source | Count | Fields |
|--------|-------|--------|
| **User Input** | 20+ | All editable fields |
| **SAP Integration** | 8 | SAP Id, SAP Title, Cost Center, Asset Class, PSP Element, IFRS date, Original number |
| **SRM Integration** | 5 | SRM Number, SRM item, SRM Created by, SRM bucket, SRM explanation |
| **System Generated** | 6 | Id, Created by, Creation datetime, Last changed by, Last changed datetime |

---

## Business Rules

### 1. Asset Creation Rules

1. **Maintenance Inventory Number Uniqueness**
   - Maintenance inventory number MUST be mandatory and unique
   - When a user enters a maintenance inventory number, system MUST check uniqueness
   - If duplicate found, user MUST be informed immediately
   - Validation happens on field blur and on form submission

2. **Asset Numbering System**
   - Three types of asset numbers exist:
     - Primary Key (Id) - internal database ID (not shown to users)
     - Maintenance Inventory Number (Maintenance Id) - user-visible, unique
     - SAP Asset Number (SAP Id) - from SAP when available
   - To avoid confusion, clearly label each number type

3. **Unidentified Asset Handling**
   - If asset cannot be identified in SAP or any system
   - Create record with "Unidentified Asset Found" as acquisition method
   - This asset will NOT match with an SAP asset number

4. **SAP Number Matching**
   - Assets received by maintenance before SAP assignment get maintenance number
   - When SAP asset number received, both numbers must be matched in records
   - Provide interface to match Maintenance ID with SAP ID

5. **Asset Type Optional**
   - Asset types are NOT mandatory
   - Filled by maintenance department when needed
   - Do not enforce required validation

### 2. Location Change Rules

6. **Location Update Authorization**
   - Asset location, Sublocation 1, and Sublocation 2 CAN be changed by:
     - Cost Center Asset Responsible
     - Cost Center Responsible
   - Other users cannot modify location fields

### 3. Maintenance Relevancy Review

7. **Marking Assets for Review**
   - Action performed ONLY by Maintenance Key User
   - Workflow:
     1. Key user lists all new added assets
     2. Downloads list as Excel
     3. Reviews asset titles for maintenance relevance
     4. Selects relevant records
     5. Adds maintenance information
     6. Fits information to Excel upload template
     7. Uploads maintenance information
     8. Marks reviewed assets using "Reviewed" button
   - Purpose: Prevent future redundant checking

### 4. Default Values

8. **Asset Acquisition Method Default**
   - Default value: "Purchasing"
   - Options: Purchasing, Unidentified Asset Found, Other

9. **Asset Status Default**
   - Default value: "Active"
   - Options: Active, Inactive, Scrapped, Sold as Scrapped, Donated as Scrapped, Declared Missing

### 5. Field Dependencies

10. **Location Hierarchy**
    - Location sub unit 1 depends on Location selection
    - Location sub unit 2 depends on Location sub unit 1 selection
    - Implement cascading dropdowns

11. **SAP Field Visibility**
    - SAP fields only visible when:
      - Mode is "Asset creation by SAP"
      - Mode is "Asset change" AND asset has SAP Id
      - Mode is "Assigning and keeping Process Documents"

---

## Validation Rules

### Form-Level Validations

1. **On Submit Validations**
   - Maintenance Id is not empty
   - Maintenance Id is unique (server-side check)
   - Maintenance Title is not empty (max 128 chars)
   - Asset Status is selected
   - Location is selected
   - If Calibration requirement is true, Last Calibration Date must exist

2. **Field-Level Validations**

| Field | Validation | Error Message |
|-------|------------|---------------|
| Maintenance Id | Required, Unique, Numeric | "Maintenance ID is required and must be unique" |
| Maintenance Title | Required, Max 128 chars | "Maintenance Title is required (max 128 characters)" |
| Asset Description | Max 512 chars | "Description cannot exceed 512 characters" |
| Producer name | Max 32 chars | "Producer name cannot exceed 32 characters" |
| Producer Model Name | Max 64 chars | "Model name cannot exceed 64 characters" |
| Producer Serial Number | Max 32 chars | "Serial number cannot exceed 32 characters" |
| Location | Required | "Location is required" |
| Asset Status | Required | "Asset Status is required" |
| Assigned workstation Id | Max 8 chars | "Workstation ID cannot exceed 8 characters" |

3. **Real-Time Validations**
   - Maintenance Id uniqueness check on blur (debounced)
   - Character count display for text fields
   - Location dependency validation (subunit requires parent)

---

## Workflows

### 1. Asset Entry Workflow

```
User Initiates Asset Creation
    ↓
Select Mode (Manual/SAP/Assignment/Change/Documents)
    ↓
Fill Required Fields
    ↓
System Validates Inputs
    ↓
[If Invalid] → Show Errors → Allow Correction
    ↓
[If Valid] → Save to Database
    ↓
Generate Maintenance Id (if not provided)
    ↓
Update Audit Fields (Created by, Created date)
    ↓
[If Documents] → Allow Document Upload
    ↓
Success Notification
```

### 2. Asset Assignment Workflow

```
User Requests Asset Assignment
    ↓
System Validates Asset Availability
    ↓
Approval from Current Asset Holder (if assigned)
    ↓
Approval from Current Holder's First Manager
    ↓
Approval from New Assignee's First Manager
    ↓
[Any Rejection] → Record Rejection Reason → End Process
    ↓
[All Approved] → Update Asset.Assigned user Id
    ↓
Create Asset Assignment Record
    ↓
Generate Assignment Printout
    ↓
Update Asset History
```

Fields in Assignment Process:
- Asset SAP number, SAP title
- Asset Maintenance number, Maintenance Title
- Current assigned user (with manager info)
- New assignee user (with manager info)
- Change reason
- Exchange date
- Location info
- Cost Center
- Asset status

### 3. Asset Retirement Workflow

Multi-level approval process:

```
User Initiates Retirement Request
    ↓
Enter Retirement Reason
    ↓
Level 1: Requestor's First Manager Approval
    ↓
Level 2: SL-Engineer Approval
    ↓
Level 3: Maintenance Manager Approval
    ↓
Level 4: Accounting Approval
    ↓
[Option: Re-evaluation Decision]
    ↓
Select Scrapping Method
    ↓
Update Asset Status to "Scrapped"
    ↓
Record SAP Financial Data (IFRS/Local)
    ↓
Generate Retirement Printout
```

Fields in Retirement:
- Request Id
- SAP asset number, title
- Maintenance asset ID, title
- Producer info (name, model, serial)
- Cost Center
- Old Asset Number
- Reason (text, 512 chars)
- Approval timestamps and IDs for each level
- Re-evaluation explanation (if applicable)
- Scrapping method
- SAP financial data (IFRS Capitalization date, Depreciation keys, Currency, APC, Accumulated depreciation, Booking value - both IFRS and Local)

---

## Integration Points

### 1. SAP Integration

**Purpose:** Synchronize asset data from SAP system

**SAP Fields (Readonly in Form):**
- SAP Id (ANLA - Asset number)
- SAP Title (ANLA - Asset description)
- SAP Cost Center (ANLZ - Cost center)
- Asset Class (ANLA - Asset class)
- PSP Element (ANLA - Project code)
- IFRS Capitalization date (ANLA)
- Original asset number (Old asset number)

**Integration Flow:**
1. SAP creates/updates asset
2. Webhook/batch job triggers in maintenance app
3. System creates or updates Asset record with SAP data
4. If Maintenance Id exists, match records
5. If no match, create new record with SAP data
6. All SAP fields marked as readonly in UI

**For Retirement:**
- IFRS Depreciation key
- IFRS Useful life
- IFRS Currency
- IFRS Current APC
- IFRS Accumulated depreciation
- IFRS Current booking Value
- Local Depreciation key
- Local Useful life
- Local Currency
- Local Current APC
- Local Accumulated depreciation
- Local Current booking value

### 2. SRM Integration

**Purpose:** Import procurement/purchasing data

**SRM Fields (Readonly in Form):**
- SRM Number (Shopping basket/requisition number)
- SRM item number (Line item in requisition)
- SRM Created by (Requestor user ID)
- SRM shopping bucket number
- SRM explanation (Description)
- SRM Created By name, surname, department (derived)

**Integration Flow:**
1. Asset purchased through SRM
2. SRM data imported to maintenance app
3. Pre-populate SRM fields in Asset form
4. User completes remaining fields
5. SRM fields remain readonly

---

## User Permissions

### Role-Based Access Control

| Role | Create | Edit | Delete | View | Special Permissions |
|------|--------|------|--------|------|---------------------|
| **Maintenance Admin** | ✓ | ✓ | ✓ | All | Full access to all assets |
| **Maintenance Personnel** | ✓ | ✓ Limited | ✗ | All | Can add documents, cannot delete |
| **Maintenance Key User** | ✓ | ✓ | ✗ | All | Can mark "Relevancy reviewed", Mass upload |
| **Cost Center Asset Responsible** | ✗ | Location only | ✗ | Department | Can change Location, Subunit 1, Subunit 2 |
| **Cost Center Responsible** | ✗ | Location only | ✗ | Department | Can change Location, Subunit 1, Subunit 2 |
| **Regular User** | ✗ | ✗ | ✗ | Assigned only | Can only view assets assigned to them |
| **Manager** | ✗ | ✗ | ✗ | Team | Can view assets assigned to their team members |

### Specific Permission Rules

1. **Asset Creation**
   - Maintenance Admin: All modes
   - Maintenance Personnel: All modes
   - Maintenance Key User: All modes + Mass upload

2. **Asset Editing**
   - Maintenance Admin: All fields
   - Maintenance Personnel: All except deletion
   - Cost Center Responsible: Location fields only (Location, Location sub unit 1, Location sub unit 2)

3. **Document Management**
   - Maintenance Admin: Upload, Download, Delete
   - Maintenance Personnel: Upload, Download
   - Others: Download only (if have view access)

4. **Special Actions**
   - "Mark as Reviewed for Maintenance": Maintenance Key User only
   - "Mass Asset Entry": Maintenance Key User, Maintenance Admin only
   - Asset Assignment: Maintenance Admin, Maintenance Personnel
   - Asset Retirement: Maintenance Admin only (initiate), Multi-level approval

5. **View Access**
   - Regular User: Only assets where Assigned user Id = current user
   - Manager: Assets where Assigned user Id = team member
   - Cost Center: Assets in their cost center
   - Maintenance: All assets

---

## UI/UX Requirements

### Form Layout

**Recommended Sections:**

1. **Header Section**
   - Form title: "Asset Entry"
   - Mode selector (if applicable)
   - Save button (primary action)
   - Cancel button
   - Mass Upload button (if Key User)

2. **Basic Information Section**
   ```
   [Maintenance Id*]  [Maintenance Title*]
   [Asset Description (multiline)]
   [Asset Type ▼]     [Asset Status* ▼]
   ```

3. **SAP Integration Section** (Collapsible, readonly)
   ```
   📋 SAP Information (Readonly)
   [SAP Asset Number]  [SAP Asset Title]
   [SAP Cost Center]   [Asset Class]
   [PSP Element]       [Original Asset Number]
   [IFRS Capitalization Date]
   ```

4. **SRM/Procurement Section** (Collapsible, readonly)
   ```
   🛒 SRM/Procurement Information (Readonly)
   [SRM Number]        [SRM Item Number]
   [SRM Bucket Number] [SRM Explanation]
   [Created By: Name, Department]
   ```

5. **Producer Information Section**
   ```
   🏭 Manufacturer/Producer Details
   [Producer Name]     [Model Name]
   [Serial Number]     [Purchasing Order Number]
   ```

6. **Location Section**
   ```
   📍 Location Information
   [Location* ▼]
   [Location Sub Unit 1 ▼]
   [Location Sub Unit 2 ▼]
   [Cost Center] (readonly if from SAP)
   ```

7. **Assignment Section**
   ```
   👤 Assignment
   [Assigned User 🔍]
   [Assigned Workstation]
   ```

8. **Calibration Section** (if applicable)
   ```
   🔧 Calibration
   [☐ Calibration Required]
   [Last Calibration Date]
   [Calibration Done By]
   [Calibration Entered By]
   ```

9. **Additional Information Section**
   ```
   [Asset Acquirement Method ▼] (default: Purchasing)
   [☐ Relevancy to Maintenance Reviewed] (Key User only)
   ```

10. **Documents Section**
    ```
    📎 Attachments
    [Document Group Id] (auto-generated)
    [Upload Documents] button
    List of attached documents:
    - Maintenance manuals
    - Scrapping manual
    - Other documents
    ```

11. **Audit Section** (readonly, collapsible)
    ```
    ℹ️ Record Information
    Created By: [User Name]  on [Date Time]
    Last Changed By: [User Name]  on [Date Time]
    ```

### Form Behavior

1. **Conditional Field Display**
   - SAP section: Show only if SAP Id exists OR mode is "SAP Creation"
   - SRM section: Show only if SRM Number exists
   - Calibration section: Expand if Calibration Required is checked
   - Relevancy checkbox: Show only to Maintenance Key Users

2. **Field States**
   - Readonly fields: Gray background, no cursor change, tooltip "Imported from [SAP/SRM]"
   - Required fields: Red asterisk (*), border turns red if empty on submit
   - Optional fields: No asterisk, normal styling

3. **Validation Feedback**
   - Real-time validation on blur for Maintenance Id uniqueness
   - Character counter for text fields (Description, Producer fields)
   - Inline error messages below fields
   - Summary error list at top of form if multiple errors

4. **User Assistance**
   - Tooltips for all fields explaining purpose
   - Placeholder text with examples
   - Help icon linking to documentation
   - Auto-save draft (optional, every 30 seconds)

5. **Responsive Design**
   - Two-column layout on desktop
   - Single-column on mobile/tablet
   - Collapsible sections to reduce scroll
   - Sticky header with Save/Cancel buttons

---

## Component Structure Recommendation

### React Component Architecture

```typescript
// AssetForm.tsx - Main container
interface AssetFormProps {
  mode: 'create' | 'edit' | 'view' | 'sapCreate' | 'assignMaintId' | 'documents';
  assetId?: number;
  onSave: (asset: Asset) => Promise<void>;
  onCancel: () => void;
}

// Subcomponents
- AssetFormHeader.tsx (title, mode, actions)
- BasicInformationSection.tsx (maintenance id, title, description, type, status)
- SAPIntegrationSection.tsx (readonly SAP fields)
- SRMProcurementSection.tsx (readonly SRM fields)
- ProducerInformationSection.tsx (manufacturer details)
- LocationSection.tsx (location hierarchy with cascading dropdowns)
- AssignmentSection.tsx (user assignment, workstation)
- CalibrationSection.tsx (calibration fields)
- AdditionalInformationSection.tsx (acquirement method, reviewed flag)
- DocumentsSection.tsx (attachment upload/list)
- AuditSection.tsx (created by, changed by info)

// Hooks
- useAssetForm.ts (form state management)
- useAssetValidation.ts (validation logic)
- usePermissions.ts (role-based access control)
- useSAPIntegration.ts (SAP data handling)
- useSRMIntegration.ts (SRM data handling)

// Utilities
- assetValidators.ts (field validation functions)
- assetHelpers.ts (helper functions)
- assetConstants.ts (dropdowns, enums, lookups)
```

### State Management

```typescript
interface AssetFormState {
  // Form data
  asset: Asset;

  // UI state
  mode: AssetFormMode;
  isLoading: boolean;
  isSaving: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;

  // Lookups
  assetTypes: AssetType[];
  assetStatuses: AssetStatus[];
  locations: Location[];

  // Permissions
  canEdit: boolean;
  canEditLocation: boolean;
  canMarkReviewed: boolean;
  canUploadDocuments: boolean;

  // Integration data
  sapData?: SAPAssetData;
  srmData?: SRMAssetData;
}
```

### Key Functions

```typescript
// Validation
validateMaintenanceId(id: number): Promise<ValidationResult>
validateRequiredFields(asset: Asset): ValidationResult
validateFieldLength(field: string, maxLength: number): boolean

// Data handling
fetchAsset(id: number): Promise<Asset>
saveAsset(asset: Asset): Promise<Asset>
checkMaintenanceIdUniqueness(id: number): Promise<boolean>

// Integration
fetchSAPData(sapId: number): Promise<SAPAssetData>
fetchSRMData(srmNumber: number): Promise<SRMAssetData>
matchMaintenanceWithSAP(maintId: number, sapId: number): Promise<void>

// Permissions
canUserEdit(userId: number, assetId: number): boolean
canUserChangeLocation(userId: number): boolean
canUserMarkReviewed(userId: number): boolean

// Location hierarchy
fetchSubLocations(parentId: number): Promise<Location[]>
```

---

## Asset Types Enumeration

```typescript
enum AssetType {
  HAND_TOOLS = 1,
  ELECTRIC = 2,
  CONSTRUCTION = 3,
  TOOL_COUNTER = 4,
  MECHANIC = 5,
  OFFICE = 6,
  MEETING_ROOM = 7,
  OTHER = 8
}
```

## Asset Status Enumeration

```typescript
enum AssetStatus {
  ACTIVE = 'A',
  INACTIVE = 'I',
  SCRAPPED = 'S',
  SOLD_AS_SCRAPPED = 'SS',
  DONATED_AS_SCRAPPED = 'DS',
  DECLARED_MISSING = 'M'
}
```

## Asset Acquirement Method

```typescript
enum AssetAcquirementMethod {
  PURCHASING = 'P',
  UNIDENTIFIED_ASSET_FOUND = 'U',
  OTHER = 'O'
}
```

---

## Testing Checklist

### Unit Tests
- [ ] Maintenance Id uniqueness validation
- [ ] Required field validation
- [ ] Field length validation
- [ ] Location hierarchy dependencies
- [ ] Default value assignment
- [ ] SAP field readonly enforcement
- [ ] SRM field readonly enforcement

### Integration Tests
- [ ] Save new asset (manual creation)
- [ ] Save asset with SAP data
- [ ] Save asset with SRM data
- [ ] Update existing asset
- [ ] Location change by Cost Center Responsible
- [ ] Mark as reviewed by Key User
- [ ] Upload documents
- [ ] Match Maintenance ID with SAP ID

### Permission Tests
- [ ] Admin can create/edit/delete
- [ ] Personnel can create/edit but not delete
- [ ] Key User can mark reviewed
- [ ] Cost Center can only change location
- [ ] Regular user can only view assigned assets
- [ ] Manager can view team assets

### Workflow Tests
- [ ] Asset Assignment workflow (multi-approval)
- [ ] Asset Retirement workflow (4-level approval)
- [ ] Asset creation from SAP trigger
- [ ] Mass upload by Key User

---

## API Endpoints Required

```typescript
// Asset CRUD
GET    /api/assets                    // List assets
GET    /api/assets/:id                // Get single asset
POST   /api/assets                    // Create asset
PUT    /api/assets/:id                // Update asset
DELETE /api/assets/:id                // Delete asset

// Validation
GET    /api/assets/validate/maintenance-id/:id  // Check uniqueness

// Lookups
GET    /api/asset-types               // Get asset types
GET    /api/asset-statuses            // Get asset statuses
GET    /api/locations                 // Get locations
GET    /api/locations/:id/subunits    // Get sub-locations

// Integration
GET    /api/assets/sap/:sapId         // Get SAP data
GET    /api/assets/srm/:srmNumber     // Get SRM data
POST   /api/assets/match-sap          // Match maintenance ID with SAP ID

// Documents
GET    /api/assets/:id/documents      // Get asset documents
POST   /api/assets/:id/documents      // Upload document
DELETE /api/documents/:id             // Delete document

// Workflows
POST   /api/asset-assignments         // Create assignment request
PUT    /api/asset-assignments/:id/approve   // Approve assignment
PUT    /api/asset-assignments/:id/reject    // Reject assignment
POST   /api/asset-retirements         // Create retirement request
PUT    /api/asset-retirements/:id/approve   // Approve retirement
PUT    /api/asset-retirements/:id/reevaluate // Re-evaluate retirement

// Bulk operations
POST   /api/assets/bulk-upload        // Mass upload via Excel
GET    /api/assets/export             // Export to Excel

// Permissions
GET    /api/assets/:id/permissions    // Get user permissions for asset
```

---

## Database Queries Required

```sql
-- Check maintenance ID uniqueness
SELECT COUNT(*) FROM Asset WHERE Maintenance_Id = ?

-- Get asset with full details
SELECT a.*, l.Name as LocationName, u.Name as AssignedUserName, ...
FROM Asset a
LEFT JOIN Location l ON a.Location = l.Id
LEFT JOIN User u ON a.Assigned_user_Id = u.Id
WHERE a.Id = ?

-- Get assets for user (based on role)
-- For regular user: only assigned
SELECT * FROM Asset WHERE Assigned_user_Id = ?

-- For manager: team assets
SELECT a.* FROM Asset a
INNER JOIN User u ON a.Assigned_user_Id = u.Id
WHERE u.Manager_Id = ?

-- For cost center: department assets
SELECT * FROM Asset WHERE SAP_Cost_Center = ?

-- Get unreviewed assets (for key user)
SELECT * FROM Asset
WHERE Relevancy_to_maintenance_reviewed IS NULL OR Relevancy_to_maintenance_reviewed = FALSE

-- Match SAP and Maintenance IDs
UPDATE Asset SET SAP_Id = ? WHERE Maintenance_Id = ?
```

---

## Summary for Development

### Immediate Priorities

1. **Database Schema Implementation**
   - Create/verify Asset table with all 31 fields
   - Create/verify Asset Group Header, Asset Group Item, Asset Retirement tables
   - Create Asset Type, Asset Status lookup tables
   - Add indexes on Maintenance_Id (unique), SAP_Id, SRM_Number

2. **Form Component Structure**
   - Create main AssetForm.tsx with mode support
   - Implement all 11 sections as subcomponents
   - Set up form state management (React Hook Form or similar)

3. **Validation Implementation**
   - Maintenance Id uniqueness check (debounced API call)
   - Required field validation
   - Length validation for text fields
   - Location hierarchy validation

4. **Integration Points**
   - SAP data fetch and display (readonly)
   - SRM data fetch and display (readonly)
   - Document upload/management

5. **Permission System**
   - Implement role-based access control
   - Field-level permissions (location edit for Cost Center)
   - Action-level permissions (mark reviewed for Key User)

6. **Workflows**
   - Asset Assignment workflow
   - Asset Retirement workflow with approvals

### Fields by Priority

**Priority 1 (MVP - Minimum Viable Product):**
- Id, Maintenance Id, Maintenance Title, Asset Status, Location
- Created by, Creation date time
- Basic validations

**Priority 2 (Core Features):**
- Asset Description, Asset Type
- Producer name, Model Name, Serial Number
- Location sub units
- SAP fields (readonly display)
- SRM fields (readonly display)
- Asset acquirement method

**Priority 3 (Extended Features):**
- Document management
- Calibration fields
- Assigned user, workstation
- Cost Center (if not from SAP)
- Relevancy review flag
- Audit fields display

**Priority 4 (Advanced Features):**
- Asset Assignment workflow
- Asset Retirement workflow
- Mass upload
- SAP-Maintenance ID matching
- Advanced reporting

---

## Notes for AssetForm.tsx Rewrite

1. **Use TypeScript** for type safety with all fields
2. **Implement proper form validation** with react-hook-form or similar
3. **Use collapsible sections** to manage form complexity
4. **Clear visual distinction** between readonly and editable fields
5. **Real-time validation** for critical fields (Maintenance Id uniqueness)
6. **Loading states** during API calls (SAP/SRM data fetch)
7. **Error handling** with user-friendly messages
8. **Responsive design** for mobile/tablet usage
9. **Accessibility** (ARIA labels, keyboard navigation)
10. **Auto-save** consideration for long forms
11. **Audit trail** display for transparency
12. **Help/documentation** links for complex fields
13. **Role-based UI** showing/hiding elements based on permissions

---

**End of Document**

This specification provides all necessary information to completely rewrite the AssetForm.tsx component according to official requirements.

# Incident Form (Arıza Bildirimi) - Complete Analysis Summary

## Document Index

The following files have been generated from your analysis:

1. **INCIDENT_FORM_REQUIREMENTS_SUMMARY.md** - High-level overview with workflow stages and business rules
2. **INCIDENT_FORM_COMPREHENSIVE_REQUIREMENTS.json** - Complete detailed requirements in JSON format
3. **INCIDENT_FORM_TYPESCRIPT_GUIDE.md** - TypeScript implementation guide with code examples
4. **INCIDENT_FORM_COMPLETE_ANALYSIS.json** - Raw field-level analysis
5. **INCIDENT_FORM_FINAL_REPORT.json** - Structured report with categorized fields

## Quick Reference

### Key Metrics
- **Total Fields**: 60
- **Editable Fields**: 60
- **Read-Only/Display Fields**: Multiple auto-populated fields (SAP titles, user info, timestamps)
- **Workflow Stages**: 11 distinct stages
- **Approval Stages**: 2 (SL-TL Approval + Requestor Approval)
- **User Roles**: 5 roles with specific permissions

### Core Workflow Stages

1. **Create Incident** - Requestor enters incident details, asset, location (30 fields)
2. **Hand Over to Maintenance** - Asset transferred to maintenance team (5 fields)
3. **Assign Solution Responsible** - SL-TL assigns solution owner (4 fields)
4. **Send to Outsource** - Optional: Send asset to external service (6 fields)
5. **Enter Delay Reason** - Optional: Document delays (3 fields)
6. **Solution Entered** - Solution provider documents resolution (7 fields)
7. **Materials Entered** - Record consumed materials (5 fields)
8. **Manual Approval** - Standard two-stage approval flow
9. **Fast-Track Approval** - Skip SL-TL approval option
10. **Rejection** - Handle rejected incidents
11. **Final Approval** - Manager approval required

### Field Categories

1. **Basic Information** (2 fields)
   - Incident Title
   - Incident Description

2. **Asset Information** (4 fields)
   - SAP Asset number/title OR
   - Maintenance Asset number/title

3. **Location Information** (2 fields)
   - Location (required)
   - Location sub-unit (optional)

4. **Creator Information** (5 fields - auto-filled)
   - User ID, Name, Surname, Department
   - Creation timestamp

5. **Maintenance Responsible** (8 fields)
   - Asset received by user details
   - Alternative user to receive asset

6. **Solution Responsible** (4 fields)
   - Responsible SL-TL user details

7. **Outsource Service** (6 fields)
   - Service explanation
   - Sent by user details
   - Send timestamp

8. **Delay Information** (3 fields)
   - Delay reason
   - Declared by user
   - Timestamp

9. **Solution Information** (7 fields)
   - Solution explanation
   - Solution provided flag
   - Provider details
   - Timestamp

10. **Material Consumption** (5 fields per item)
    - Process type/ID
    - Material
    - Quantity
    - Unit of measure

11. **Documents/Attachments** (5 fields per document)
    - Group ID, Document ID
    - Title, Description, Link

12. **Comments** (unlimited)
    - Comment thread with timestamps

13. **Approvals** (4 fields per approval)
    - Approval type
    - Approver details
    - Status and timestamp

### Critical Business Rules

1. **Asset Selection**: Must select either SAP Asset OR Maintenance Asset (at least one required)
2. **Location Required**: Location and sub-unit hierarchy must be valid
3. **Sequential Workflow**: Incidents progress through stages in order, cannot skip required stages
4. **Dual Approval**: Standard flow requires both SL-TL and Requestor Manager approval
5. **Fast-Track Option**: Can skip SL-TL approval but Requestor approval still required
6. **Solution Required**: Solution explanation mandatory before approval stage
7. **Rejection Handling**: Either approver can reject with mandatory reason
8. **Audit Trail**: All actions tracked with user ID, name, department, and timestamp
9. **Optional Stages**: Outsource, Delay, and Materials are optional workflow branches
10. **Comments Allowed**: Any user can add comments at any stage

### User Roles and Permissions

#### 1. Incident Creator (Requestor)
**Can:**
- Create new incident
- Enter title, description, asset, location
- Attach documents
- Specify alternative user to receive asset
- View own incidents
- Add comments

**Cannot:**
- Assign maintenance or solution responsible
- Approve or reject
- Modify after submission

#### 2. Maintenance Responsible
**Can:**
- Receive and acknowledge asset
- Record receipt timestamp
- Add comments
- View assigned incidents

**Cannot:**
- Assign solution responsible
- Provide solution
- Approve

#### 3. SL-TL (Section Leader / Team Leader)
**Can:**
- Assign solution responsible
- Send asset to outsource service
- Declare delays with reason
- Approve solutions (SL-TL Approval stage)
- Reject with reason
- View team incidents

**Cannot:**
- Perform final approval (that's manager's role)

#### 4. Solution Responsible (Engineer/Technician)
**Can:**
- Provide solution and explanation
- Record consumed materials
- Add comments

**Cannot:**
- Approve incident
- Assign to others

#### 5. Requestor's Manager / Alternative Approver
**Can:**
- Final approval (Requestor Approval stage)
- View team incidents
- Reject with reason

**Cannot:**
- Modify solution details

### Integration Points

1. **SAP Integration** - Read-only access to asset master data
2. **Internal Asset DB** - Maintenance asset lookup
3. **User Directory** (AD/LDAP) - User information lookup
4. **Location Master** - Hierarchical location data
5. **Material Master** - Material catalog with UOM
6. **Document Management** - Document storage and retrieval

### Status Flow

```
Draft → Waiting → Assigned to Maintenance → Solution in Progress
  ↓
[Optional: Sent to Outsource]
  ↓
[Optional: Delayed]
  ↓
Solution Provided → Pending SL-TL Approval → Pending Requestor Approval
  ↓                           ↓                        ↓
Approved                   Rejected                 Rejected
  ↓
Closed
```

### Special Features

1. **Comment Thread**: Conversational timeline with user attribution
2. **Multiple Materials**: Support for multiple material line items
3. **Multiple Documents**: Attach multiple files with metadata
4. **Approval Timeline**: Visual timeline showing both approval stages
5. **Rejection Tracking**: Detailed rejection information with history
6. **Alternative Approver**: Flexible approval routing for manager unavailability

### Validation Requirements

#### Required Fields (Create Stage)
- Incident Title (max 128 chars)
- Incident Description (max 400 chars)
- Asset (SAP OR Maintenance, at least one)
- Location

#### Conditional Required Fields
- **Maintenance Stage**: Received by user
- **Solution Stage**: Responsible SL-TL user
- **Outsource Stage**: Service explanation, sent by user
- **Delay Stage**: Delay reason
- **Solution Stage**: Solution explanation
- **Materials Stage**: Material, quantity, UOM (per item)
- **Rejection**: Rejection reason

#### Field Constraints
- Incident ID: Auto-generated, 8 digits
- Text fields: Various max lengths (128-400 chars)
- Numeric fields: Positive numbers only
- Date/time fields: Auto-captured on action
- Quantity: Must be > 0

### Implementation Checklist

- [ ] Define TypeScript interfaces for all entities
- [ ] Create workflow state machine
- [ ] Implement role-based permission checks
- [ ] Build validation logic (client + server)
- [ ] Create form sections with conditional rendering
- [ ] Implement auto-save for drafts
- [ ] Build comment thread component
- [ ] Build material consumption table
- [ ] Build document attachment manager
- [ ] Build approval timeline component
- [ ] Implement SAP asset lookup
- [ ] Implement maintenance asset lookup
- [ ] Implement user directory lookup
- [ ] Implement location hierarchy selector
- [ ] Implement material lookup
- [ ] Create API endpoints for all operations
- [ ] Add audit logging
- [ ] Write unit tests for validators
- [ ] Write integration tests for API
- [ ] Write E2E tests for workflows
- [ ] Test all role-based scenarios
- [ ] Test approval/rejection flows
- [ ] Add accessibility features
- [ ] Optimize performance for large datasets

### API Endpoints Required

```
POST   /api/incidents                    # Create incident
GET    /api/incidents/:id                # Get incident
PUT    /api/incidents/:id                # Update incident
POST   /api/incidents/:id/submit         # Submit for processing
POST   /api/incidents/:id/approve        # Approve
POST   /api/incidents/:id/reject         # Reject
POST   /api/incidents/:id/comments       # Add comment
POST   /api/incidents/:id/documents      # Upload document

GET    /api/assets/sap/search            # Search SAP assets
GET    /api/assets/maintenance/search    # Search maintenance assets
GET    /api/users/search                 # Search users
GET    /api/locations                    # Get locations
GET    /api/locations/:id/subunits       # Get sub-units
GET    /api/materials/search             # Search materials
```

## Next Steps

1. Review the TypeScript implementation guide (INCIDENT_FORM_TYPESCRIPT_GUIDE.md)
2. Set up the component structure as outlined
3. Implement type definitions first
4. Build form sections incrementally
5. Test each workflow stage thoroughly
6. Implement approval logic last

## Files Location

All analysis files are located at:
```
/Users/caglarozyildirim/WebstormProjects/Deneme/bakim-yonetimi-v2/
```

Key files:
- INCIDENT_FORM_REQUIREMENTS_SUMMARY.md
- INCIDENT_FORM_COMPREHENSIVE_REQUIREMENTS.json
- INCIDENT_FORM_TYPESCRIPT_GUIDE.md
- INCIDENT_ANALYSIS_SUMMARY.md (this file)

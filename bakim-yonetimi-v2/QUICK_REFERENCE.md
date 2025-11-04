# Quick Reference Guide
## Where to Find What You Need

---

## 🎯 Quick Lookup

### "I need to understand the whole system"
→ **REQUIREMENTS_SUMMARY.md** (19 KB)
- Start here!
- Complete overview
- All modules explained
- Implementation plan

### "I need to implement Job Request module"
→ **COMPREHENSIVE_REQUIREMENTS_REPORT.json**
- Navigate to: `modules["Job Request (İş Talepleri)"]`
- Contains: screens, entities, workflows, rules

### "I need database field definitions"
→ **FIELD_LEVEL_DETAILS.json**
- Navigate to: `entities["Job Req."]["fields"]`
- Contains: field name, type, length for all 460+ fields

### "I need to create the Job Request screen"
→ **COMPREHENSIVE_REQUIREMENTS_REPORT.json**
- Navigate to: `modules["Job Request (İş Talepleri)"]["screens"]`
- Contains: all fields, buttons, grids, validations

### "I need all business rules"
→ **COMPREHENSIVE_REQUIREMENTS_REPORT.json**
- Navigate to: `modules[*]["business_rules"]`
- 31 rules across all modules

### "I need to understand a workflow"
→ **COMPREHENSIVE_REQUIREMENTS_REPORT.json**
- Navigate to: `modules[*]["workflows"]`
- 7 workflows with file references

---

## 📊 By Entity/Table

### Job Request (İş Talepleri)
**Database Fields:**
```
FIELD_LEVEL_DETAILS.json → entities["Job Req."]["fields"]
```
37 fields including:
- Request Id (integer, 8)
- Request Title (text, 128)
- Request Description (text, 1024)
- Asset Id, Cost, Approvals, etc.

**Screens:**
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Job Request (İş Talepleri)"]["screens"]
```
3 screens:
- 1 JR - Job Request Entry
- 1 - Job Request Alternative
- 2 JRL - Job Request List

**Workflow:**
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Job Request (İş Talepleri)"]["workflows"]
```
Work Flow of Job Request.vsdx

---

### Asset (Varlık)
**Database Fields:**
```
FIELD_LEVEL_DETAILS.json → entities["Asset"]["fields"]
```
33 fields including:
- Id, Maintenance Id, SAP Id
- Asset Type, Status, Location
- Cost Center, Assignment info, etc.

**Screens:**
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Asset Management (Varlık Yönetimi)"]["screens"]
```
5 screens:
- 3 AE - Asset Entry
- 3 - Asset Entry Alternative
- 4 AL - Asset List
- 10 AG - Asset Group
- 10 - Asset Group Alternative

---

### Assignment (Zimmet)
**Database Fields:**
```
FIELD_LEVEL_DETAILS.json → entities["Assigment"]["fields"]
```
28 fields for asset assignments

**Screens:**
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Asset Assignment (Zimmet)"]["screens"]
```
4 screens including printouts

---

### Incident (Olay Bildirimi)
**Database Fields:**
```
FIELD_LEVEL_DETAILS.json → entities["Incident"]["fields"]
```
34 fields for incident tracking

**Screens:**
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Incident Management (Olay Bildirimi)"]["screens"]
```
3 screens for incident management

---

### Maintenance Duty (Bakım Görevi)
**Database Fields:**
```
FIELD_LEVEL_DETAILS.json → entities["M. Duty"]["fields"]
```
23 fields plus related entities (Task, Visit, Materials)

**Screens:**
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Maintenance Duty (Bakım Görevi)"]["screens"]
```
4 screens for maintenance execution

---

### Asset Retirement (Hurda)
**Database Fields:**
```
FIELD_LEVEL_DETAILS.json → entities["Asset Retirement"]["fields"]
```
44 fields (most complex entity)

**Screens:**
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Asset Retirement (Hurda)"]["screens"]
```
4 screens including printouts

---

### Cost Center Change (Masraf Merkezi)
**Database Fields:**
```
FIELD_LEVEL_DETAILS.json → entities["Cost Center Change"]["fields"]
```
8 fields for cost center transfers

**Screens:**
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Cost Center Change (Masraf Merkezi Değişikliği)"]["screens"]
```
3 screens for cost center workflow

---

## 🔍 By Information Type

### All Database Tables
```
FIELD_LEVEL_DETAILS.json → entities
```
39 entities with complete field definitions

### All Screens
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules[*]["screens"]
```
43 screens across 11 modules

### All Workflows
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules[*]["workflows"]
```
7 workflows:
1. Job Request
2. Asset Entry
3. Asset Assignment
4. Maintenance
5. Incident Notification
6. Cost Center Change
7. Asset Retirement

### All Business Rules
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Common Features"]["business_rules"]
```
31 business rules

### All Validations
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → modules["Common Features"]["validations"]
```
38 validations

### User Roles & Permissions
```
COMPREHENSIVE_REQUIREMENTS_REPORT.json → user_roles
COMPREHENSIVE_REQUIREMENTS_REPORT.json → permissions
```

---

## 💻 For Developers

### Creating Database Schema
**Use:** `FIELD_LEVEL_DETAILS.json`

Example for Job Request:
```javascript
const jobReqFields = json.entities["Job Req."].fields;
// Generate CREATE TABLE statement
jobReqFields.forEach(field => {
  console.log(`${field["Field name"]} ${field.Type}(${field.Length})`);
});
```

### Creating API Endpoints
**Use:** `COMPREHENSIVE_REQUIREMENTS_REPORT.json`

Example:
```javascript
const module = json.modules["Job Request (İş Talepleri)"];
// Create CRUD endpoints for each entity
module.entities.forEach(entity => {
  // GET, POST, PUT, DELETE endpoints
});
```

### Creating UI Forms
**Use:** `COMPREHENSIVE_REQUIREMENTS_REPORT.json` → screens

Example for Job Request Entry:
```javascript
const screen = json.modules["Job Request (İş Talepleri)"]
  .screens.find(s => s.screen_name === "1 JR");

console.log(`Fields: ${screen.fields.length}`);
console.log(`Buttons: ${screen.buttons.length}`);
console.log(`Grids: ${screen.grids.length}`);
```

### Implementing Validations
**Use:** `COMPREHENSIVE_REQUIREMENTS_REPORT.json` → validations

Example:
```javascript
const validations = json.modules["Common Features"].validations;
validations.forEach(v => {
  // Create validation rule
  console.log(v.validation);
});
```

### Implementing Business Rules
**Use:** `COMPREHENSIVE_REQUIREMENTS_REPORT.json` → business_rules

Example:
```javascript
const rules = json.modules["Common Features"].business_rules;
rules.forEach(rule => {
  // Implement rule logic
  console.log(rule.rule);
});
```

---

## 📱 Screen Reference

### Login & Navigation
- **Log-in** - Authentication screen
- **User Menu Visual** - Visual menu
- **User Menu Functional** - Functional menu
- **View User Info** - User profile

### Job Request Screens
- **Screen 1 JR** - Job Request Entry (89 elements, 23 fields, 17 buttons)
- **Screen 1** - Alternative view (61 elements, 7 fields, 14 buttons)
- **Screen 2 JRL** - List view (86 elements, 17 fields, 8 buttons, 1 grid)

### Asset Screens
- **Screen 3 AE** - Asset Entry (41 elements, 16 fields)
- **Screen 3** - Alternative view
- **Screen 4 AL** - Asset List (49 elements, 9 fields, 2 grids)
- **Screen 10 AG** - Asset Group (47 elements, 9 fields, 5 buttons, 3 grids)
- **Screen 10** - Alternative view

### Assignment Screens
- **Screen 5 AA** - Asset Assignment (70 elements, 17 fields, 19 buttons)
- **Screen 5** - Alternative view
- **Screen 6 AAL** - Assignment List (68 elements, 11 fields, 8 buttons, 2 grids)
- **Screen 7 AAP** - Assignment Printout (69 elements, 13 fields, 12 buttons)
- **Screen 7P** - Alternative printout

### Maintenance Screens
- **Screen 8 PMR** - Preventive Maintenance (50 elements, 15 fields, 5 buttons, 6 grids)
- **Screen 8** - Alternative view
- **Screen 9 MR** - Maintenance Request
- **Screen 11 MD** - Maintenance Duty (76 elements, 27 fields, 10 buttons, 2 grids)
- **Screen 11** - Alternative view
- **Screen 12 MDV** - Maintenance Visit (58 elements, 23 fields, 2 buttons, 3 grids)
- **Screen 12** - Alternative view

### Incident Screens
- **Screen 20 I** - Incident Entry (82 elements, 22 fields, 11 buttons)
- **Screen 20** - Alternative view
- **Screen 21 IL** - Incident List

### Cost Center Screens
- **Screen 23 CCC** - Cost Center Change (57 elements, 12 fields, 14 buttons)
- **Screen 23** - Alternative view
- **Screen 24 CCCL** - Cost Center Change List

### Retirement Screens
- **Screen 25 AR** - Asset Retirement (80 elements, 24 fields, 13 buttons)
- **Screen 25** - Alternative view
- **Screen 26 ARP** - Retirement Printout (55 elements, 8 fields, 4 buttons)
- **Screen 26P** - Alternative printout
- **Screen 27 ARL** - Retirement List

### List Screens
- **Screen 13 PMRL** - Preventive Maintenance List
- **Screen 14 MRL** - Maintenance Request List
- **Screen 15 AGL** - Asset Group List
- **Screen 16 MDL** - Maintenance Duty List
- **Screen 17 TCL** - Total Cost List
- **Screen 18 VL** - Visit List
- **Screen 19 CL** - Comment List
- **Screen 22 CM** - Comment Management

---

## 🗄️ Database Entity Reference

### Transaction Tables (12)
1. **M** - Master/Main (24 fields)
2. **Job Req.** - Job Request (37 fields)
3. **Asset** - Assets (33 fields)
4. **Assigment** - Asset Assignment (28 fields)
5. **M. Req.** - Maintenance Request (25 fields)
6. **M. Duty** - Maintenance Duty (23 fields)
7. **M. Task** - Maintenance Task (13 fields)
8. **Visit** - Maintenance Visit (8 fields)
9. **Consumed Materials** - Materials (8 fields)
10. **Incident** - Incident (34 fields)
11. **Cost Center Change** - Cost Center Transfer (8 fields)
12. **Asset Retirement** - Asset Disposal (44 fields)

### Master Data Tables (10)
13. **Asset Group header** (8 fields)
14. **Asset Group item** (10 fields)
15. **Asset Type** (7 fields)
16. **Asset Status** (2 fields)
17. **Asset Class Description** (20 fields)
18. **Asset Retiring method** (3 fields)
19. **Priority** (7 fields)
20. **Measure unit** (3 fields)
21. **Process** (15 fields)
22. **Record Status** (2 fields)

### Organization Tables (8)
23. **User** (7 fields)
24. **User Group** (9 fields)
25. **Department** (6 fields)
26. **User Department assigment** (12 fields)
27. **Cost Center** (4 fields)
28. **Cost center responsible** (8 fields)
29. **Location** (11 fields)
30. **Workstation list** (8 fields)

### Security Tables (4)
31. **Auth.** - Authorization (11 fields)
32. **Auth Group** (10 fields)
33. **on behalf** (7 fields)
34. **on behalf log** (9 fields)

### Support Tables (5)
35. **Document** (11 fields)
36. **Document Group** (4 fields)
37. **Document Types** (5 fields)
38. **Comment** (8 fields)
39. **Language support** (3 fields)

---

## 🔄 Workflow Reference

All workflows are Visio diagrams (.vsdx) located at:
```
/Users/caglarozyildirim/Desktop/new/Workflows/
```

1. **Work Flow of Job Request.vsdx** - Job request approval workflow
2. **Work Flow of Asset Entry.vsdx** - Asset registration workflow
3. **Work flow of asset assigment.vsdx** - Assignment approval workflow
4. **Work Flow of Maintenance.vsdx** - Maintenance execution workflow
5. **Workflow of Incident Notification.vsdx** - Incident workflow (4.2 MB - most detailed)
6. **Work Flow Cost Center Change.vsdx** - Cost center transfer workflow
7. **Work Flow Asset Retirement.vsdx** - Asset disposal workflow

---

## 📋 Common Tasks

### Task: Create Job Request Table
**File:** `FIELD_LEVEL_DETAILS.json`
**Path:** `entities["Job Req."]["fields"]`
**Fields:** 37 fields defined

### Task: Implement Job Request Entry Screen
**File:** `COMPREHENSIVE_REQUIREMENTS_REPORT.json`
**Path:** `modules["Job Request (İş Talepleri)"]["screens"][0]`
**Elements:** 89 elements, 23 fields, 17 buttons

### Task: Add Job Request Validation
**File:** `COMPREHENSIVE_REQUIREMENTS_REPORT.json`
**Path:** `modules["Common Features"]["validations"]`
**Count:** 38 validations

### Task: Implement Approval Workflow
**File:** `COMPREHENSIVE_REQUIREMENTS_REPORT.json`
**Path:** `modules["Job Request (İş Talepleri)"]["workflows"]`
**Workflow:** Work Flow of Job Request.vsdx

### Task: Create User Management
**File:** `FIELD_LEVEL_DETAILS.json`
**Path:** `entities["User"]["fields"]`
**Related Tables:** User, User Group, Department, User Department assignment

### Task: Implement Document Management
**File:** `FIELD_LEVEL_DETAILS.json`
**Path:** `entities["Document"]["fields"]`
**Related Tables:** Document, Document Group, Document Types

---

## 🎓 Learning Path

### Day 1: Understanding
1. Read **README_REQUIREMENTS.md** (this file)
2. Read **REQUIREMENTS_SUMMARY.md**
3. Browse **COMPREHENSIVE_REQUIREMENTS_REPORT.json** structure

### Day 2: Database
1. Open **FIELD_LEVEL_DETAILS.json**
2. Review all 39 entities
3. Identify relationships
4. Create ERD diagram

### Day 3: Screens
1. Open **COMPREHENSIVE_REQUIREMENTS_REPORT.json**
2. Review all 43 screens
3. Identify common patterns
4. Create UI wireframes

### Day 4: Business Logic
1. Review all business rules
2. Review all validations
3. Study workflow files
4. Document business processes

### Day 5: Planning
1. Create implementation plan
2. Estimate effort
3. Prioritize features
4. Create sprint backlog

---

## 💡 Pro Tips

### Tip 1: Use JSON Viewers
Install a JSON viewer extension in your browser or IDE:
- Chrome: JSON Viewer
- VS Code: JSON Tools
- Online: jsoneditoronline.org

### Tip 2: Search Effectively
Use `Ctrl+F` (or `Cmd+F`) to search within JSON files:
- Search for field names
- Search for screen names
- Search for module names

### Tip 3: Extract Specific Data
Use `jq` command-line tool:
```bash
# Get all entity names
jq '.entities | keys' FIELD_LEVEL_DETAILS.json

# Get Job Request fields
jq '.entities["Job Req."].fields' FIELD_LEVEL_DETAILS.json

# Count total fields
jq '[.entities[].field_count] | add' FIELD_LEVEL_DETAILS.json
```

### Tip 4: Generate Code
Write scripts to generate:
- SQL CREATE TABLE statements
- Entity classes
- API controllers
- Form components
- Validation rules

### Tip 5: Version Control
Commit these JSON files to version control:
- Track requirement changes
- Share with team
- Reference in commits

---

## 📞 Need Help?

### Can't find something?
1. Check **REQUIREMENTS_SUMMARY.md** index
2. Search in **COMPREHENSIVE_REQUIREMENTS_REPORT.json**
3. Look in **detailed_requirements_complete.json**
4. Refer to original documentation

### Need more detail?
1. Original docs at: `/Users/caglarozyildirim/Desktop/new/`
2. All extraction scripts available
3. Can re-run extraction with modifications

### Want to modify?
1. Edit extraction scripts
2. Re-run extraction
3. Regenerate JSON files
4. Update this documentation

---

## ✅ Checklist

Before starting implementation:
- [ ] Read REQUIREMENTS_SUMMARY.md
- [ ] Review COMPREHENSIVE_REQUIREMENTS_REPORT.json structure
- [ ] Understand all 11 modules
- [ ] Review database schema (39 entities)
- [ ] Review all 43 screens
- [ ] Review 7 workflows
- [ ] Understand business rules
- [ ] Understand validations
- [ ] Set up development environment
- [ ] Create project structure
- [ ] Start Phase 1

---

## 📊 File Size Reference

```
REQUIREMENTS_SUMMARY.md            19 KB    Human-readable summary
FIELD_LEVEL_DETAILS.json          2.0 MB    All field definitions
COMPREHENSIVE_REQUIREMENTS_REPORT.json 4.2 MB    Complete organized requirements
detailed_requirements_complete.json    3.8 MB    Raw detailed extraction
complete_requirements.json             1.2 MB    Initial extraction
README_REQUIREMENTS.md                 40 KB    This documentation
QUICK_REFERENCE.md                     15 KB    This quick reference
```

**Total: 11.4 MB of structured requirements data**

---

*Last Updated: November 3, 2025*
*Version: 1.0*
*Status: Complete*

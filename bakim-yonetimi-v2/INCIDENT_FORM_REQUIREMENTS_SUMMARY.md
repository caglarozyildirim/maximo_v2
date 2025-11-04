# Incident Form (Arıza Bildirimi) - Requirements Summary

## Executive Summary
- **Total Fields**: 60
- **Editable Fields**: 60
- **Read-Only Fields**: 0
- **Workflow Stages**: 12
- **Approval Stages**: 2

## Description
The Incident Form manages the complete lifecycle of equipment/asset incidents from creation through resolution, including maintenance assignment, outsource service management, solution tracking, and dual-stage approval process.

## Workflow Stages

### Stage 1: a. Create incident
**Description**: Initial incident creation by the requestor

**Key Actions**:
- Enter incident details (title, description)
- Select affected asset (SAP or Maintenance asset)
- Specify location
- Attach documents if needed
- Assign alternative user to receive asset (optional)

**Editable Fields**: 30

### Stage 2: a. Handing over the asset to a maintenance responsible
**Description**: Asset is handed over to maintenance team member

**Key Actions**:
- Record who received the asset
- Capture receipt date/time
- Update asset custody information

**Editable Fields**: 5

### Stage 3: b. Assignment to a solution responsible by one of SL-TL group
**Description**: Section Leader or Team Leader assigns solution responsibility

**Key Actions**:
- Assign responsible SL-TL member
- Transfer incident ownership to solution team

**Editable Fields**: 4

### Stage 4: c. Sending asset to an outsource service
**Description**: Asset sent to external service provider (optional)

**Key Actions**:
- Document outsource service details
- Record who sent the asset
- Capture send date/time and explanation

**Editable Fields**: 6

### Stage 5: d. Enter delay reason
**Description**: Document any delays in resolution (optional)

**Key Actions**:
- Enter delay reason/explanation
- Record who declared the delay
- Capture delay entry timestamp

**Editable Fields**: 3

### Stage 6: e. Solution explanation entered
**Description**: Solution provider documents the resolution

**Key Actions**:
- Enter solution explanation
- Confirm solution provided
- Record solution provider details and timestamp

**Editable Fields**: 7

### Stage 7: f. Consumed materials and quantities entered
**Description**: Record materials used in the repair/solution

**Key Actions**:
- Enter process type and ID
- List consumed materials
- Specify quantities and units of measure

**Editable Fields**: 5

### Stage 8: i. Manual approval
**Description**: Standard approval process (all stages complete)

**Key Actions**:
- SL-TL reviews and approves/rejects
- Requestor's manager reviews and approves/rejects

**Editable Fields**: 0

### Stage 9: ii. manual approval without solution approval from SL & TL
**Description**: Fast-track approval skipping SL-TL review

**Key Actions**:
- Direct approval by requestor's manager

**Editable Fields**: 0

### Stage 10: iii. Rejection
**Description**: Incident rejected during approval

**Key Actions**:
- Enter rejection reason
- Record who rejected
- Specify which approval stage was rejected

**Editable Fields**: 0

### Stage 11: j. Solution approval from creator first manager or alternative approver
**Description**: Final approval by requestor's manager

**Key Actions**:
- Manager reviews complete incident
- Approve or reject with reason

**Editable Fields**: 0

## Approval Workflow

The incident requires dual-stage approval:

### SL - TL Approval
- **Role**: SL-TL (Solution Responsible)
- **Required**: Yes (for standard flow)
- **Can Skip**: Yes (using fast-track approval ii)
- **Actions**: Approve, Reject
- **Rejection Impact**: Incident returns for rework

### Requestor Approval
- **Role**: Creator's First Manager / Alternative Approver
- **Required**: Yes
- **Can Skip**: No
- **Actions**: Approve, Reject
- **Rejection Impact**: Incident rejected, may need to be recreated or revised

## Field Categories

### Basic Information
- Incident Title
- Incident description

### Asset Information
- SAP Asset number
- SAP Asset title
- Maintenance asset number
- Maintenance asset title

### Location Information
- Location
- Location sub unit

### Creator Information
- Created By User ID
- Creating user Id
- Creating user name
- Creation user surname
- Creating user department

### Maintenance Responsible
- Alternative user to receive asset User Id
- Alternative user to receive asset User Name
- Alternative user to receive asset User Surname
- Alternative user to receive asset User info
- Asset recived by User Id
- Asset recived by User name
- Asset recived by User Surname
- Asset recived by User Department

### Solution Responsible
- Responsible SL-TL User Id
- Responsible SL-TL User Name
- Responsible SL-TL User Surname
- Responsible SL-TL Department

### Outsource Service
- Outsource service explanation
- Outsource service sent date time
- Outsource service sent by user Id
- Outsource service sent by user name
- Outsource service sent by user surname
- Outsource service sent by user department

### Delay Information
- Delay reason
- Delay entered by user Id
- Delay reason entering date time

### Solution Information
- Solution Explanation
- Solution Provided
- Solution Provided date time
- Solution Provided by User Id
- Solution Provided by User Name
- Solution Provided by User Surname
- Solution Provided by User Department

### Material Consumption
- Process type
- Process Id
- Material
- Unit of Measure
- Quantity

### Document/Attachment
- Document Group Id
- Document Id
- Document Title
- Document Description
- Document Link

### Comments
- Comments

### System Fields
- Creation date time
- Creation date time
- Status
- Current assignee user Id
- Current assignee user Name
- Current assignee user Surname
- Current assignee user Department

## Key Business Rules

### Asset Selection
- **Rule**: User must select either a SAP Asset or a Maintenance Asset
- **Validation**: At least one asset must be specified

### Location Required
- **Rule**: Location and location sub-unit are required
- **Validation**: Location hierarchy must be valid

### Alternative User
- **Rule**: Alternative user to receive asset is optional but recommended
- **Validation**: If specified, must be valid user from system

### Workflow Progression
- **Rule**: Incidents progress through stages sequentially
- **Validation**: Cannot skip required stages

### Outsource Optional
- **Rule**: Sending to outsource service is optional
- **Validation**: If used, explanation and sender must be recorded

### Delay Optional
- **Rule**: Delay reason entry is optional
- **Validation**: If entered, reason and declarer must be recorded

### Solution Required
- **Rule**: Solution explanation must be provided before approval
- **Validation**: Solution fields must be completed

### Materials Optional
- **Rule**: Material consumption entry is optional
- **Validation**: If entered, material, quantity, and UOM required

### Dual Approval
- **Rule**: Standard flow requires both SL-TL and Requestor approval
- **Validation**: Both approval stages must be completed

### Fast Track Approval
- **Rule**: Can skip SL-TL approval in fast-track mode
- **Validation**: Requestor approval still required

### Rejection Handling
- **Rule**: Either approval can reject with reason
- **Validation**: Rejection reason mandatory, rejected approval type must be specified

### Comments System
- **Rule**: Comments can be added at any stage
- **Validation**: Free text, supports conversation thread

### Document Attachments
- **Rule**: Documents can be attached to incident
- **Validation**: Document group, ID, title, description, and link

### Audit Trail
- **Rule**: System tracks all user actions with timestamps
- **Validation**: User ID, name, surname, department, and datetime recorded for each action

## User Roles

### Incident Creator (Requestor)
**Permissions**:
- Create new incident
- View own incidents
- Add comments
- Specify alternative user to receive asset

**Cannot**:
- Assign solution responsible
- Approve incident
- Close incident

### Maintenance Responsible
**Permissions**:
- Receive asset
- View assigned incidents
- Add comments
- Record receipt

**Cannot**:
- Assign solution
- Provide solution
- Approve

### SL-TL (Section Leader / Team Leader)
**Permissions**:
- Assign solution responsible
- Send to outsource service
- Enter delay reason
- View team incidents
- Approve solutions (SL-TL Approval)
- Reject with reason

**Cannot**:
- Perform final approval (that's for manager)

### Solution Responsible (Engineer/Technician)
**Permissions**:
- Provide solution
- Enter solution explanation
- Record consumed materials
- Add comments

**Cannot**:
- Approve incident
- Assign to others

### Requestor's Manager / Alternative Approver
**Permissions**:
- Final approval (Requestor Approval)
- View incidents from their team
- Reject with reason

**Cannot**:
- Modify solution details


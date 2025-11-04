# Bakım Yönetimi Sistemi - Proje Mimarisi

## 🎯 Proje Hedefi
Full production-ready, enterprise-grade bakım yönetimi sistemi (ITSM).

## 🏗️ Teknoloji Yığını

### Frontend
- **Framework**: React 18 + TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **UI Framework**: Material-UI (MUI) v5
- **Form Management**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **API Documentation**: Swagger/OpenAPI
- **File Upload**: Multer

### DevOps & Tools
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Docker**: Docker Compose for development
- **Git**: Git hooks with Husky

## 📁 Proje Yapısı

```
bakim-yonetimi/
├── packages/
│   ├── frontend/                 # React Frontend
│   │   ├── src/
│   │   │   ├── app/              # App setup, store, routes
│   │   │   ├── features/         # Feature-based modules
│   │   │   │   ├── auth/
│   │   │   │   ├── is-talepleri/
│   │   │   │   ├── bakim-isleri/
│   │   │   │   ├── varliklar/
│   │   │   │   ├── zimmet/
│   │   │   │   ├── hurda/
│   │   │   │   ├── masraf/
│   │   │   │   ├── olay-bildirimi/
│   │   │   │   └── dashboard/
│   │   │   ├── components/       # Shared components
│   │   │   │   ├── ui/           # Button, Card, Input, etc.
│   │   │   │   ├── layout/       # Navbar, Sidebar, etc.
│   │   │   │   └── workflow/     # Workflow components
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── services/         # API services
│   │   │   ├── types/            # TypeScript types
│   │   │   └── utils/            # Utility functions
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── backend/                  # Node.js Backend
│       ├── src/
│       │   ├── modules/          # Feature modules
│       │   │   ├── auth/
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── auth.routes.ts
│       │   │   │   └── dto/
│       │   │   ├── is-talepleri/
│       │   │   ├── bakim-isleri/
│       │   │   ├── varliklar/
│       │   │   ├── zimmet/
│       │   │   ├── hurda/
│       │   │   ├── masraf/
│       │   │   ├── olay-bildirimi/
│       │   │   └── workflow/     # Workflow engine
│       │   ├── common/           # Shared utilities
│       │   │   ├── middleware/
│       │   │   ├── guards/
│       │   │   ├── decorators/
│       │   │   ├── filters/
│       │   │   └── utils/
│       │   ├── config/           # Configuration
│       │   ├── database/         # Prisma client
│       │   └── app.ts            # App entry point
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       ├── tests/
│       ├── package.json
│       └── tsconfig.json
│
├── docker-compose.yml            # Docker services
├── package.json                  # Root package.json
└── README.md
```

## 🗄️ Database Schema (PostgreSQL + Prisma)

### Core Tables

#### 1. Users & Roles
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  password     String
  firstName    String
  lastName     String
  role         Role     @relation(fields: [roleId], references: [id])
  roleId       String
  department   String?
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Role {
  id          String       @id @default(cuid())
  name        String       @unique // "Admin", "Manager", "Engineer", "User"
  permissions Permission[]
  users       User[]
}

model Permission {
  id     String @id @default(cuid())
  name   String @unique // "job_request.create", "job_request.approve"
  roles  Role[]
}
```

#### 2. İş Talepleri (Job Requests)
```prisma
model JobRequest {
  id                String               @id @default(cuid())
  requestNumber     String               @unique // "IT-2025-001"
  title             String
  description       String
  asset             Asset?               @relation(fields: [assetId], references: [id])
  assetId           String?
  priority          Priority             @default(MEDIUM)
  status            JobRequestStatus     @default(NEW)
  currentStep       String               // Current workflow step
  costEstimate      Decimal?
  department        String

  // Workflow tracking
  requestedBy       User                 @relation("RequestedBy", fields: [requestedById], references: [id])
  requestedById     String
  assignedTo        User?                @relation("AssignedTo", fields: [assignedToId], references: [id])
  assignedToId      String?

  // Approval chain
  approvals         Approval[]
  workflowHistory   WorkflowHistory[]

  // Attachments
  attachments       Attachment[]

  createdAt         DateTime             @default(now())
  updatedAt         DateTime             @updatedAt
  completedAt       DateTime?
}

enum JobRequestStatus {
  NEW
  MANAGER_APPROVAL
  SL_ENGINEER_TAKEOVER
  TECHNICAL_APPROVAL
  COST_CALCULATION
  BUSINESS_COST_APPROVAL
  SOLUTION_ASSIGNMENT
  IMPLEMENTATION
  SOLUTION_APPROVAL
  DONE
  REJECTED
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

#### 3. Workflow Engine
```prisma
model WorkflowDefinition {
  id          String              @id @default(cuid())
  name        String              // "job_request_workflow"
  module      String              // "job_request", "maintenance", etc.
  version     Int                 @default(1)
  steps       WorkflowStep[]
  isActive    Boolean             @default(true)
  createdAt   DateTime            @default(now())
}

model WorkflowStep {
  id                  String                @id @default(cuid())
  workflow            WorkflowDefinition    @relation(fields: [workflowId], references: [id])
  workflowId          String
  stepNumber          Int
  name                String                // "manager_approval"
  type                WorkflowStepType      // APPROVAL, TASK, NOTIFICATION
  assigneeRole        String?               // Role that can execute this step
  nextStepOnApprove   String?
  nextStepOnReject    String?
  isOptional          Boolean               @default(false)
}

enum WorkflowStepType {
  APPROVAL
  TASK
  NOTIFICATION
  DECISION
  INTEGRATION
}

model WorkflowHistory {
  id            String      @id @default(cuid())
  entityType    String      // "job_request", "maintenance", etc.
  entityId      String
  jobRequest    JobRequest? @relation(fields: [jobRequestId], references: [id])
  jobRequestId  String?
  stepName      String
  action        String      // "approved", "rejected", "completed"
  comment       String?
  actor         User        @relation(fields: [actorId], references: [id])
  actorId       String
  createdAt     DateTime    @default(now())
}

model Approval {
  id            String          @id @default(cuid())
  jobRequest    JobRequest?     @relation(fields: [jobRequestId], references: [id])
  jobRequestId  String?
  stepName      String
  status        ApprovalStatus  @default(PENDING)
  approver      User            @relation(fields: [approverId], references: [id])
  approverId    String
  comment       String?
  approvedAt    DateTime?
  createdAt     DateTime        @default(now())
}

enum ApprovalStatus {
  PENDING
  APPROVED
  REJECTED
}
```

#### 4. Varlıklar (Assets)
```prisma
model Asset {
  id              String        @id @default(cuid())
  assetNumber     String        @unique // "VLK-001"
  name            String
  category        String
  manufacturer    String?
  model           String?
  serialNumber    String?
  sapNumber       String?
  qrCode          String?       @unique
  location        String
  costCenter      String
  status          AssetStatus   @default(ACTIVE)
  purchaseDate    DateTime?
  purchasePrice   Decimal?

  // Relations
  jobRequests     JobRequest[]
  maintenanceJobs MaintenanceJob[]
  assignments     AssetAssignment[]
  retirements     AssetRetirement[]
  documents       Document[]

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum AssetStatus {
  ACTIVE
  MAINTENANCE
  INACTIVE
  RETIRED
}
```

#### 5. Bakım İşleri (Maintenance)
```prisma
model MaintenanceJob {
  id                String                @id @default(cuid())
  jobNumber         String                @unique
  type              MaintenanceType
  asset             Asset                 @relation(fields: [assetId], references: [id])
  assetId           String
  title             String
  description       String
  status            MaintenanceStatus     @default(PLANNED)
  scheduledDate     DateTime
  completedDate     DateTime?

  // Task management
  tasks             MaintenanceTask[]
  visits            MaintenanceVisit[]

  // Material tracking
  materials         MaterialConsumption[]

  // Metered maintenance
  isMetered         Boolean               @default(false)
  meterReading      Decimal?
  meterThreshold    Decimal?

  // Assignment
  assignedTo        User?                 @relation(fields: [assignedToId], references: [id])
  assignedToId      String?

  approvals         Approval[]
  createdAt         DateTime              @default(now())
  updatedAt         DateTime              @updatedAt
}

enum MaintenanceType {
  PREVENTIVE
  CORRECTIVE
  PREDICTIVE
  METERED
}

enum MaintenanceStatus {
  PLANNED
  ACTIVE
  ASSIGNED
  IN_PROGRESS
  APPROVAL_REQUESTED
  REJECTED
  DONE
  CANCELLED
}

model MaintenanceTask {
  id              String          @id @default(cuid())
  job             MaintenanceJob  @relation(fields: [jobId], references: [id])
  jobId           String
  title           String
  isCompleted     Boolean         @default(false)
  completedAt     DateTime?
  note            String?
}

model MaintenanceVisit {
  id              String          @id @default(cuid())
  job             MaintenanceJob  @relation(fields: [jobId], references: [id])
  jobId           String
  startDateTime   DateTime
  endDateTime     DateTime?
  technician      User            @relation(fields: [technicianId], references: [id])
  technicianId    String
  notes           String?
}

model MaterialConsumption {
  id              String          @id @default(cuid())
  job             MaintenanceJob  @relation(fields: [jobId], references: [id])
  jobId           String
  materialName    String
  quantity        Decimal
  unit            String
  cost            Decimal?
}
```

#### 6. Zimmet (Asset Assignment)
```prisma
model AssetAssignment {
  id                      String                  @id @default(cuid())
  assignmentNumber        String                  @unique
  asset                   Asset                   @relation(fields: [assetId], references: [id])
  assetId                 String
  currentHolder           User                    @relation("CurrentHolder", fields: [currentHolderId], references: [id])
  currentHolderId         String
  newHolder               User                    @relation("NewHolder", fields: [newHolderId], references: [id])
  newHolderId             String
  changeTime              DateTime
  status                  AssignmentStatus        @default(PENDING)

  // 4-step approval
  approvals               AssignmentApproval[]

  createdAt               DateTime                @default(now())
  updatedAt               DateTime                @updatedAt
  completedAt             DateTime?
}

enum AssignmentStatus {
  PENDING
  CURRENT_MANAGER_APPROVAL
  NEW_MANAGER_APPROVAL
  CURRENT_HOLDER_APPROVAL
  NEW_HOLDER_APPROVAL
  ACTIVE
  RETURNED
  REJECTED
}

model AssignmentApproval {
  id                String              @id @default(cuid())
  assignment        AssetAssignment     @relation(fields: [assignmentId], references: [id])
  assignmentId      String
  step              String              // "current_manager", "new_manager", etc.
  approver          User                @relation(fields: [approverId], references: [id])
  approverId        String
  status            ApprovalStatus      @default(PENDING)
  comment           String?
  approvedAt        DateTime?
}
```

#### 7. Hurda (Asset Retirement)
```prisma
model AssetRetirement {
  id                      String              @id @default(cuid())
  retirementNumber        String              @unique
  asset                   Asset               @relation(fields: [assetId], references: [id])
  assetId                 String
  reason                  String
  retirementMethod        RetirementMethod?
  reevaluationDate        DateTime?
  status                  RetirementStatus    @default(PENDING)

  // 4-level approval chain
  approvals               RetirementApproval[]

  createdBy               User                @relation(fields: [createdById], references: [id])
  createdById             String
  createdAt               DateTime            @default(now())
  updatedAt               DateTime            @updatedAt
  completedAt             DateTime?
}

enum RetirementMethod {
  PHYSICAL_SCRAPPING
  REEVALUATION
}

enum RetirementStatus {
  PENDING
  COST_CENTER_APPROVAL
  SL_ENGINEER_APPROVAL
  MAINTENANCE_MANAGER_APPROVAL
  ACCOUNTING_APPROVAL
  WAITING_REEVALUATION
  REEVALUATION
  PHYSICAL_SCRAPPING
  DONE
  REJECTED
  CANCELLED
}

model RetirementApproval {
  id              String          @id @default(cuid())
  retirement      AssetRetirement @relation(fields: [retirementId], references: [id])
  retirementId    String
  level           String          // "cost_center", "sl_engineer", "maintenance_manager", "accounting"
  approver        User            @relation(fields: [approverId], references: [id])
  approverId      String
  status          ApprovalStatus  @default(PENDING)
  comment         String?
  approvedAt      DateTime?
}
```

#### 8. Masraf Merkezi (Cost Center Change)
```prisma
model CostCenterChange {
  id                      String                  @id @default(cuid())
  changeNumber            String                  @unique
  asset                   Asset                   @relation(fields: [assetId], references: [id])
  assetId                 String
  currentCostCenter       String
  newCostCenter           String
  reason                  String
  status                  CostCenterStatus        @default(PENDING)

  // 3-level approval
  approvals               CostCenterApproval[]

  createdBy               User                    @relation(fields: [createdById], references: [id])
  createdById             String
  createdAt               DateTime                @default(now())
  updatedAt               DateTime                @updatedAt
  completedAt             DateTime?
}

enum CostCenterStatus {
  PENDING
  NEW_RESPONSIBLE_APPROVAL
  CURRENT_RESPONSIBLE_APPROVAL
  CURRENT_DIRECTOR_APPROVAL
  SAP_CHANGES
  DONE
  REJECTED
}

model CostCenterApproval {
  id              String              @id @default(cuid())
  change          CostCenterChange    @relation(fields: [changeId], references: [id])
  changeId        String
  level           String              // "new_responsible", "current_responsible", "current_director"
  approver        User                @relation(fields: [approverId], references: [id])
  approverId      String
  status          ApprovalStatus      @default(PENDING)
  comment         String?
  approvedAt      DateTime?
}
```

#### 9. Olay Bildirimi (Incident Notification)
```prisma
model Incident {
  id                    String            @id @default(cuid())
  incidentNumber        String            @unique
  title                 String
  description           String
  asset                 Asset?            @relation(fields: [assetId], references: [id])
  assetId               String?
  status                IncidentStatus    @default(NEW)
  priority              Priority          @default(MEDIUM)

  // Assignment
  reporter              User              @relation("Reporter", fields: [reporterId], references: [id])
  reporterId            String
  assignedTo            User?             @relation("AssignedTo", fields: [assignedToId], references: [id])
  assignedToId          String?

  // Solution
  solution              String?
  materials             IncidentMaterial[]

  // Outsource
  requiresOutsource     Boolean           @default(false)
  outsourceService      String?

  // Asset receipt
  assetReceivedBy       User?             @relation("AssetReceiver", fields: [assetReceivedById], references: [id])
  assetReceivedById     String?
  receiptInfo           String?

  // Dual approval
  approvals             IncidentApproval[]

  createdAt             DateTime          @default(now())
  updatedAt             DateTime          @updatedAt
  closedAt              DateTime?
}

enum IncidentStatus {
  NEW
  ASSIGNED
  OUTSOURCE_SERVICE
  APPROVAL
  REJECTED_BY_SL_TL
  REJECTED_BY_CUSTOMER
  DONE
  CANCELLED
}

model IncidentMaterial {
  id              String    @id @default(cuid())
  incident        Incident  @relation(fields: [incidentId], references: [id])
  incidentId      String
  materialName    String
  quantity        Decimal
  unit            String
  cost            Decimal?
}

model IncidentApproval {
  id              String          @id @default(cuid())
  incident        Incident        @relation(fields: [incidentId], references: [id])
  incidentId      String
  approverType    String          // "sl_tl", "customer"
  approver        User            @relation(fields: [approverId], references: [id])
  approverId      String
  status          ApprovalStatus  @default(PENDING)
  comment         String?
  approvedAt      DateTime?
}
```

#### 10. Common Tables
```prisma
model Attachment {
  id              String        @id @default(cuid())
  fileName        String
  originalName    String
  mimeType        String
  size            Int
  path            String

  // Polymorphic relation
  entityType      String        // "job_request", "maintenance", etc.
  entityId        String
  jobRequest      JobRequest?   @relation(fields: [jobRequestId], references: [id])
  jobRequestId    String?

  uploadedBy      User          @relation(fields: [uploadedById], references: [id])
  uploadedById    String
  createdAt       DateTime      @default(now())
}

model Document {
  id              String    @id @default(cuid())
  asset           Asset     @relation(fields: [assetId], references: [id])
  assetId         String
  documentType    String    // "manual", "warranty", "certificate"
  fileName        String
  filePath        String
  uploadedBy      User      @relation(fields: [uploadedById], references: [id])
  uploadedById    String
  createdAt       DateTime  @default(now())
}

model Notification {
  id              String    @id @default(cuid())
  user            User      @relation(fields: [userId], references: [id])
  userId          String
  title           String
  message         String
  type            String    // "approval_request", "status_change", etc.
  entityType      String
  entityId        String
  isRead          Boolean   @default(false)
  createdAt       DateTime  @default(now())
}

model AuditLog {
  id              String    @id @default(cuid())
  user            User?     @relation(fields: [userId], references: [id])
  userId          String?
  action          String    // "create", "update", "delete", "approve"
  entityType      String
  entityId        String
  changes         Json?
  ipAddress       String?
  userAgent       String?
  createdAt       DateTime  @default(now())
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  iat: number;
  exp: number;
}
```

### Role-Based Access Control (RBAC)
```typescript
// Permission examples
const permissions = [
  'job_request.create',
  'job_request.view',
  'job_request.edit',
  'job_request.delete',
  'job_request.approve',
  'maintenance.create',
  'maintenance.approve',
  // ... etc
];

// Roles
const roles = {
  ADMIN: ['*'], // All permissions
  MANAGER: ['*.view', '*.approve', 'job_request.*'],
  ENGINEER: ['*.view', '*.edit', 'maintenance.*', 'incident.*'],
  USER: ['job_request.create', 'job_request.view', '*.view']
};
```

## 🔄 Workflow Engine Design

### Workflow Configuration Example
```typescript
const jobRequestWorkflow: WorkflowConfig = {
  name: 'job_request_workflow',
  initialStatus: 'NEW',
  steps: [
    {
      name: 'manager_approval',
      type: 'approval',
      assigneeRole: 'MANAGER',
      onApprove: 'cost_calculation',
      onReject: 'REJECTED'
    },
    {
      name: 'cost_calculation',
      type: 'task',
      assigneeRole: 'ENGINEER',
      nextStep: 'business_approval'
    },
    {
      name: 'business_approval',
      type: 'approval',
      assigneeRole: 'BUSINESS_MANAGER',
      onApprove: 'solution_assignment',
      onReject: 'REJECTED'
    },
    // ... more steps
  ]
};
```

## 📡 API Structure

### REST API Endpoints

```
# Authentication
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
GET    /api/v1/auth/me

# İş Talepleri
GET    /api/v1/job-requests
POST   /api/v1/job-requests
GET    /api/v1/job-requests/:id
PUT    /api/v1/job-requests/:id
DELETE /api/v1/job-requests/:id
POST   /api/v1/job-requests/:id/approve
POST   /api/v1/job-requests/:id/reject
POST   /api/v1/job-requests/:id/assign
GET    /api/v1/job-requests/:id/history
GET    /api/v1/job-requests/:id/approvals

# Bakım İşleri
GET    /api/v1/maintenance
POST   /api/v1/maintenance
GET    /api/v1/maintenance/:id
PUT    /api/v1/maintenance/:id
DELETE /api/v1/maintenance/:id
POST   /api/v1/maintenance/:id/tasks
POST   /api/v1/maintenance/:id/visits
POST   /api/v1/maintenance/:id/materials

# Varlıklar
GET    /api/v1/assets
POST   /api/v1/assets
GET    /api/v1/assets/:id
PUT    /api/v1/assets/:id
DELETE /api/v1/assets/:id
GET    /api/v1/assets/:id/history
POST   /api/v1/assets/:id/qr-code

# ... similar patterns for other modules
```

## 🎨 Frontend Architecture

### State Management
```typescript
// Redux store structure
{
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean
  },
  jobRequests: {
    list: JobRequest[],
    current: JobRequest | null,
    loading: boolean,
    error: string | null
  },
  // ... other slices
}
```

### Component Structure
```typescript
// Feature-based structure
features/
  is-talepleri/
    components/
      JobRequestList.tsx
      JobRequestDetail.tsx
      JobRequestForm.tsx
      ApprovalDialog.tsx
    hooks/
      useJobRequests.ts
      useApproval.ts
    services/
      jobRequestApi.ts
    types/
      jobRequest.types.ts
    jobRequestSlice.ts
```

## 🚀 Deployment

### Development
```bash
docker-compose up -d
pnpm install
pnpm dev
```

### Production
```bash
docker build -t bakim-yonetimi-backend ./packages/backend
docker build -t bakim-yonetimi-frontend ./packages/frontend
```

## 📝 Sonraki Adımlar

1. ✅ Proje mimarisi tasarlandı
2. ⏳ Klasör yapısını oluştur
3. ⏳ Backend kurulumu (Express + TypeScript)
4. ⏳ Database schema (Prisma)
5. ⏳ Authentication & RBAC
6. ⏳ Workflow engine
7. ⏳ Frontend setup (React + TypeScript)
8. ⏳ Module implementation (7 modules)
9. ⏳ Testing
10. ⏳ Documentation

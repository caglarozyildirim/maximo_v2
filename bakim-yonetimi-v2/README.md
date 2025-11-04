11# Bakım Yönetimi Sistemi v2.0

## 🚀 Production-Ready ITSM System

Full-stack, enterprise-grade maintenance management system built with modern technologies.

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript + Material-UI
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 15 + Prisma ORM
- **Authentication**: JWT + RBAC
- **Workflow**: Custom workflow engine

## 📁 Project Structure

```
bakim-yonetimi-v2/
├── packages/
│   ├── backend/     # Node.js API
│   └── frontend/    # React SPA
├── docker/          # Docker configs
└── README.md
```

## 🎯 Features

### ✅ Implemented Modules
- İş Talepleri (Job Requests) - 11 status workflow
- Bakım İşleri (Maintenance) - Task & visit management
- Varlık Yönetimi (Asset Management)
- Zimmet (Asset Assignment) - 4-step approval
- Hurda (Asset Retirement) - 4-level approval chain
- Masraf Merkezi (Cost Center Change) - 3-level approval
- Olay Bildirimi (Incident Notification) - Dual approval

### 🔥 Key Features
- Multi-level approval workflows
- Role-based access control (RBAC)
- Document management
- Real-time notifications
- Audit logging
- Material tracking
- QR code generation
- Dashboard & analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
cd bakim-yonetimi-v2
pnpm install

# Setup database
cd packages/backend
cp .env.example .env
# Edit .env with your database credentials
pnpm prisma generate
pnpm prisma migrate dev

# Start development servers
pnpm dev  # Runs both frontend and backend
```

### Docker (Alternative)

```bash
docker-compose up -d
```

## 📚 Documentation

See [PROJECT_ARCHITECTURE.md](../bakim-sistemi/PROJECT_ARCHITECTURE.md) for detailed architecture documentation.

## 🧪 Testing

```bash
# Backend tests
cd packages/backend
pnpm test

# Frontend tests
cd packages/frontend
pnpm test
```

## 📝 License

Proprietary - All rights reserved

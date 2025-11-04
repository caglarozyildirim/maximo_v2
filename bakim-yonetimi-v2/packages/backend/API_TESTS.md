# Backend API Test Guide

## 🚀 Başlatma

```bash
cd packages/backend

# Dependencies yükle
npm install

# Database migration çalıştır
npx prisma migrate dev

# Seed data ekle
npx prisma db seed

# Server başlat
npm run dev
```

Server: http://localhost:3000

---

## 🔐 Authentication API

### 1. Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "admin@example.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Get Current User
```bash
GET /api/v1/auth/me
Authorization: Bearer {token}
```

### 3. Logout
```bash
POST /api/v1/auth/logout
Authorization: Bearer {token}
```

---

## 📋 Job Requests API

**Not:** Tüm endpoint'ler `Authorization: Bearer {token}` header'ı gerektirir.

### 1. Create Job Request
```bash
POST /api/v1/job-requests
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Elektrik Arızası - Şase Hattı",
  "description": "3. şase hattında elektrik kesintisi var. Acil müdahale gerekiyor.",
  "requestType": "CORRECTIVE",
  "priority": "HIGH",
  "departmentId": 1,
  "locationId": 1,
  "assetId": 5,
  "costCenterId": 1,
  "requestedStartDate": "2025-11-04T08:00:00Z",
  "estimatedHours": 4,
  "notes": "Üretim durdu, acil"
}
```

### 2. Get All Job Requests (with filters)
```bash
GET /api/v1/job-requests?page=1&limit=10&status=PENDING&priority=HIGH
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `search` - Title veya description'da arama
- `status` - PENDING, MANAGER_APPROVAL, ENGINEER_TAKEOVER, vb.
- `priority` - LOW, MEDIUM, HIGH, URGENT
- `departmentId` - Departman ID
- `locationId` - Lokasyon ID
- `assignedToId` - Atanan kullanıcı ID
- `requestedById` - Talep eden kullanıcı ID
- `startDate` - Başlangıç tarihi (YYYY-MM-DD)
- `endDate` - Bitiş tarihi (YYYY-MM-DD)
- `sortBy` - Sıralama alanı (default: createdAt)
- `sortOrder` - asc veya desc (default: desc)

### 3. Get Single Job Request
```bash
GET /api/v1/job-requests/{id}
Authorization: Bearer {token}
```

### 4. Update Job Request
```bash
PATCH /api/v1/job-requests/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Elektrik Arızası - Şase Hattı (Güncellendi)",
  "priority": "URGENT",
  "notes": "Müşteri baskısı var"
}
```

### 5. Delete Job Request
```bash
DELETE /api/v1/job-requests/{id}
Authorization: Bearer {token}
```

### 6. Get Statistics
```bash
GET /api/v1/job-requests/statistics?departmentId=1
Authorization: Bearer {token}
```

**Response:**
```json
{
  "total": 150,
  "byStatus": {
    "pending": 25,
    "inProgress": 80,
    "completed": 40,
    "rejected": 5
  },
  "byPriority": {
    "LOW": 30,
    "MEDIUM": 70,
    "HIGH": 40,
    "URGENT": 10
  },
  "byType": {
    "CORRECTIVE": 80,
    "PREVENTIVE": 50,
    "PROJECT": 20
  }
}
```

---

## 🔄 Workflow API

### 7. Submit for Approval
```bash
POST /api/v1/job-requests/{id}/submit
Authorization: Bearer {token}
```

**Not:** Status PENDING ise MANAGER_APPROVAL'a geçer.

### 8. Approve Job Request
```bash
POST /api/v1/job-requests/{id}/approve
Authorization: Bearer {token}
Content-Type: application/json

{
  "comment": "Onaylandı. Mühendis atansın."
}
```

**Status Transitions:**
- `MANAGER_APPROVAL` → `ENGINEER_TAKEOVER`
- `TECHNICAL_APPROVAL` → `COST_CALCULATION`
- `BUSINESS_APPROVAL` → `SOLUTION_ASSIGNMENT`
- `SOLUTION_APPROVAL` → `COMPLETED`

### 9. Reject Job Request
```bash
POST /api/v1/job-requests/{id}/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "comment": "Bütçe yetersiz. Reddedildi."
}
```

**Not:** Comment zorunludur.

### 10. Cancel Job Request
```bash
POST /api/v1/job-requests/{id}/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Artık gerekmiyor"
}
```

---

## 📝 Example Test Scenarios

### Senaryo 1: Yeni İş Talebi Oluştur ve Onayla

1. **Login**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

2. **Create Job Request**
```bash
curl -X POST http://localhost:3000/api/v1/job-requests \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Arızası",
    "description": "Test için oluşturuldu",
    "priority": "MEDIUM",
    "departmentId": 1
  }'
```

3. **Submit for Approval**
```bash
curl -X POST http://localhost:3000/api/v1/job-requests/1/submit \
  -H "Authorization: Bearer YOUR_TOKEN"
```

4. **Approve**
```bash
curl -X POST http://localhost:3000/api/v1/job-requests/1/approve \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"comment": "Onaylandı"}'
```

### Senaryo 2: İş Taleplerini Filtrele

```bash
curl "http://localhost:3000/api/v1/job-requests?status=PENDING&priority=HIGH&page=1&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Senaryo 3: İstatistikleri Getir

```bash
curl http://localhost:3000/api/v1/job-requests/statistics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔍 Testing with Postman

### Import Collection

Postman'a aşağıdaki environment'ı ekleyin:

```json
{
  "name": "Bakim Yonetimi - Local",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000",
      "enabled": true
    },
    {
      "key": "token",
      "value": "",
      "enabled": true
    }
  ]
}
```

### Pre-request Script for Authorization

Collection seviyesinde:

```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

---

## 🐛 Debugging

### Check Logs
```bash
# Backend logs
tail -f packages/backend/logs/app.log

# Database queries
# .env dosyasına ekleyin:
DEBUG=prisma:query
```

### Database GUI
```bash
npx prisma studio
```

http://localhost:5555 adresinden database'i görsel olarak inceleyebilirsiniz.

---

## ✅ Expected Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no token or invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 📊 Sample Data

Seed data ile oluşturulan kullanıcılar:

1. **Admin User**
   - Email: admin@example.com
   - Password: password123
   - Role: ADMIN

2. **Manager User**
   - Email: manager@example.com
   - Password: password123
   - Role: MANAGER

3. **Engineer User**
   - Email: engineer@example.com
   - Password: password123
   - Role: ENGINEER

---

## 🎯 Next Steps

1. ✅ Backend API tamamlandı
2. ⏭️ Frontend sayfaları (Dashboard, Lists, Forms)
3. ⏭️ Diğer modüller (Asset, Assignment, Maintenance)
4. ⏭️ Real-time notifications (Socket.io)
5. ⏭️ File upload & document management
6. ⏭️ Reporting & analytics
7. ⏭️ Mobile responsive improvements

---

**Last Updated:** November 3, 2025
**Version:** 1.0.0

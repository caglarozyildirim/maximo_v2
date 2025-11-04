import { PrismaClient, AssetStatusType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ========================================
  // 1. DEPARTMENTS
  // ========================================
  console.log('📦 Creating departments...');

  const departments = await Promise.all([
    prisma.department.upsert({
      where: { departmentCode: 'PROD' },
      update: {},
      create: {
        departmentCode: 'PROD',
        departmentName: 'Üretim',
        description: 'Üretim departmanı',
        isActive: true,
      },
    }),
    prisma.department.upsert({
      where: { departmentCode: 'MAINT' },
      update: {},
      create: {
        departmentCode: 'MAINT',
        departmentName: 'Bakım Onarım',
        description: 'Bakım ve onarım departmanı',
        isActive: true,
      },
    }),
    prisma.department.upsert({
      where: { departmentCode: 'QC' },
      update: {},
      create: {
        departmentCode: 'QC',
        departmentName: 'Kalite Kontrol',
        description: 'Kalite kontrol departmanı',
        isActive: true,
      },
    }),
    prisma.department.upsert({
      where: { departmentCode: 'IT' },
      update: {},
      create: {
        departmentCode: 'IT',
        departmentName: 'Bilgi İşlem',
        description: 'Bilgi işlem departmanı',
        isActive: true,
      },
    }),
    prisma.department.upsert({
      where: { departmentCode: 'HR' },
      update: {},
      create: {
        departmentCode: 'HR',
        departmentName: 'İnsan Kaynakları',
        description: 'İnsan kaynakları departmanı',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${departments.length} departments`);

  // ========================================
  // 2. LOCATIONS
  // ========================================
  console.log('📍 Creating locations...');

  const locations = await Promise.all([
    prisma.location.upsert({
      where: { locationCode: 'FAB-01' },
      update: {},
      create: {
        locationCode: 'FAB-01',
        locationName: 'Ana Fabrika',
        address: 'Organize Sanayi Bölgesi, 1. Cadde No:10',
        city: 'İstanbul',
        country: 'Türkiye',
        isActive: true,
      },
    }),
    prisma.location.upsert({
      where: { locationCode: 'FAB-02' },
      update: {},
      create: {
        locationCode: 'FAB-02',
        locationName: 'Yan Fabrika',
        address: 'Organize Sanayi Bölgesi, 2. Cadde No:25',
        city: 'İstanbul',
        country: 'Türkiye',
        isActive: true,
      },
    }),
    prisma.location.upsert({
      where: { locationCode: 'DEPO-01' },
      update: {},
      create: {
        locationCode: 'DEPO-01',
        locationName: 'Merkez Depo',
        address: 'Merkez Mah. Depo Sok. No:5',
        city: 'Kocaeli',
        country: 'Türkiye',
        isActive: true,
      },
    }),
    prisma.location.upsert({
      where: { locationCode: 'DEPO-02' },
      update: {},
      create: {
        locationCode: 'DEPO-02',
        locationName: 'Bölgesel Depo',
        address: 'Sanayi Mah. Lojistik Cad. No:15',
        city: 'Bursa',
        country: 'Türkiye',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${locations.length} locations`);

  // ========================================
  // 3. COST CENTERS
  // ========================================
  console.log('💰 Creating cost centers...');

  const costCenters = await Promise.all([
    prisma.costCenter.upsert({
      where: { costCenterCode: '1000' },
      update: {},
      create: {
        costCenterCode: '1000',
        costCenterName: 'Üretim',
        description: 'Üretim masraf merkezi',
        budget: 5000000,
        budgetYear: 2025,
        isActive: true,
      },
    }),
    prisma.costCenter.upsert({
      where: { costCenterCode: '2000' },
      update: {},
      create: {
        costCenterCode: '2000',
        costCenterName: 'Bakım Onarım',
        description: 'Bakım onarım masraf merkezi',
        budget: 2000000,
        budgetYear: 2025,
        isActive: true,
      },
    }),
    prisma.costCenter.upsert({
      where: { costCenterCode: '3000' },
      update: {},
      create: {
        costCenterCode: '3000',
        costCenterName: 'Kalite',
        description: 'Kalite kontrol masraf merkezi',
        budget: 1000000,
        budgetYear: 2025,
        isActive: true,
      },
    }),
    prisma.costCenter.upsert({
      where: { costCenterCode: '4000' },
      update: {},
      create: {
        costCenterCode: '4000',
        costCenterName: 'Yönetim',
        description: 'Yönetim masraf merkezi',
        budget: 3000000,
        budgetYear: 2025,
        isActive: true,
      },
    }),
    prisma.costCenter.upsert({
      where: { costCenterCode: '5000' },
      update: {},
      create: {
        costCenterCode: '5000',
        costCenterName: 'AR-GE',
        description: 'Araştırma ve geliştirme masraf merkezi',
        budget: 4000000,
        budgetYear: 2025,
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${costCenters.length} cost centers`);

  // ========================================
  // 4. USERS
  // ========================================
  console.log('👥 Creating users...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@bakim.com',
        passwordHash: hashedPassword,
        firstName: 'Sistem',
        lastName: 'Yöneticisi',
        fullName: 'Sistem Yöneticisi',
        phoneNumber: '+90 555 100 1000',
        employeeNumber: 'EMP001',
        jobTitle: 'Sistem Yöneticisi',
        isActive: true,
        emailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { username: 'ahmet.yilmaz' },
      update: {},
      create: {
        username: 'ahmet.yilmaz',
        email: 'ahmet.yilmaz@bakim.com',
        passwordHash: hashedPassword,
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        fullName: 'Ahmet Yılmaz',
        phoneNumber: '+90 555 100 2000',
        mobileNumber: '+90 532 100 2000',
        employeeNumber: 'EMP002',
        jobTitle: 'Bakım Müdürü',
        primaryDepartmentId: departments[1].id,
        isActive: true,
        emailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { username: 'ayse.demir' },
      update: {},
      create: {
        username: 'ayse.demir',
        email: 'ayse.demir@bakim.com',
        passwordHash: hashedPassword,
        firstName: 'Ayşe',
        lastName: 'Demir',
        fullName: 'Ayşe Demir',
        phoneNumber: '+90 555 100 3000',
        mobileNumber: '+90 532 100 3000',
        employeeNumber: 'EMP003',
        jobTitle: 'Bakım Mühendisi',
        primaryDepartmentId: departments[1].id,
        isActive: true,
        emailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { username: 'mehmet.kaya' },
      update: {},
      create: {
        username: 'mehmet.kaya',
        email: 'mehmet.kaya@bakim.com',
        passwordHash: hashedPassword,
        firstName: 'Mehmet',
        lastName: 'Kaya',
        fullName: 'Mehmet Kaya',
        phoneNumber: '+90 555 100 4000',
        mobileNumber: '+90 532 100 4000',
        employeeNumber: 'EMP004',
        jobTitle: 'Teknisyen',
        primaryDepartmentId: departments[1].id,
        isActive: true,
        emailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { username: 'fatma.sahin' },
      update: {},
      create: {
        username: 'fatma.sahin',
        email: 'fatma.sahin@bakim.com',
        passwordHash: hashedPassword,
        firstName: 'Fatma',
        lastName: 'Şahin',
        fullName: 'Fatma Şahin',
        phoneNumber: '+90 555 100 5000',
        mobileNumber: '+90 532 100 5000',
        employeeNumber: 'EMP005',
        jobTitle: 'Kalite Kontrol Uzmanı',
        primaryDepartmentId: departments[2].id,
        isActive: true,
        emailVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { username: 'ali.ozturk' },
      update: {},
      create: {
        username: 'ali.ozturk',
        email: 'ali.ozturk@bakim.com',
        passwordHash: hashedPassword,
        firstName: 'Ali',
        lastName: 'Öztürk',
        fullName: 'Ali Öztürk',
        phoneNumber: '+90 555 100 6000',
        mobileNumber: '+90 532 100 6000',
        employeeNumber: 'EMP006',
        jobTitle: 'Üretim Şefi',
        primaryDepartmentId: departments[0].id,
        isActive: true,
        emailVerified: true,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // ========================================
  // 5. ASSET TYPES
  // ========================================
  console.log('🏷️ Creating asset types...');

  const assetTypes = await Promise.all([
    prisma.assetType.upsert({
      where: { typeCode: 'MACH' },
      update: {},
      create: {
        typeCode: 'MACH',
        typeName: 'Makine',
        description: 'Üretim makineleri',
        isActive: true,
      },
    }),
    prisma.assetType.upsert({
      where: { typeCode: 'COMP' },
      update: {},
      create: {
        typeCode: 'COMP',
        typeName: 'Bilgisayar',
        description: 'Bilgisayar ve donanımlar',
        isActive: true,
      },
    }),
    prisma.assetType.upsert({
      where: { typeCode: 'VEH' },
      update: {},
      create: {
        typeCode: 'VEH',
        typeName: 'Araç',
        description: 'Motorlu araçlar',
        isActive: true,
      },
    }),
    prisma.assetType.upsert({
      where: { typeCode: 'FURN' },
      update: {},
      create: {
        typeCode: 'FURN',
        typeName: 'Mobilya',
        description: 'Ofis mobilyaları',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${assetTypes.length} asset types`);

  // ========================================
  // 6. ASSET STATUSES
  // ========================================
  console.log('📊 Creating asset statuses...');

  const assetStatuses = await Promise.all([
    prisma.assetStatus.upsert({
      where: { statusCode: 'ACTIVE' },
      update: {},
      create: {
        statusCode: 'ACTIVE',
        statusName: 'Aktif',
        statusType: AssetStatusType.ACTIVE,
        description: 'Aktif kullanımda',
        isActive: true,
      },
    }),
    prisma.assetStatus.upsert({
      where: { statusCode: 'MAINT' },
      update: {},
      create: {
        statusCode: 'MAINT',
        statusName: 'Bakımda',
        statusType: AssetStatusType.MAINTENANCE,
        description: 'Bakım yapılıyor',
        isActive: true,
      },
    }),
    prisma.assetStatus.upsert({
      where: { statusCode: 'RETIRED' },
      update: {},
      create: {
        statusCode: 'RETIRED',
        statusName: 'Hurda',
        statusType: AssetStatusType.RETIRED,
        description: 'Hurdaya çıkarılmış',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${assetStatuses.length} asset statuses`);

  // ========================================
  // 7. RETIRING METHODS
  // ========================================
  console.log('♻️ Creating retiring methods...');

  const retiringMethods = await Promise.all([
    prisma.assetRetiringMethod.upsert({
      where: { methodCode: 'SALE' },
      update: {},
      create: {
        methodCode: 'SALE',
        methodName: 'Satış',
        description: 'Varlık satışı',
        isActive: true,
      },
    }),
    prisma.assetRetiringMethod.upsert({
      where: { methodCode: 'DISPOSE' },
      update: {},
      create: {
        methodCode: 'DISPOSE',
        methodName: 'İmha',
        description: 'Varlık imhası',
        isActive: true,
      },
    }),
    prisma.assetRetiringMethod.upsert({
      where: { methodCode: 'DONATE' },
      update: {},
      create: {
        methodCode: 'DONATE',
        methodName: 'Bağış',
        description: 'Varlık bağışı',
        isActive: true,
      },
    }),
    prisma.assetRetiringMethod.upsert({
      where: { methodCode: 'RECYCLE' },
      update: {},
      create: {
        methodCode: 'RECYCLE',
        methodName: 'Geri Dönüşüm',
        description: 'Geri dönüşüm',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${retiringMethods.length} retiring methods`);

  // ========================================
  // 8. ASSETS
  // ========================================
  console.log('🏭 Creating assets...');

  const assets = await Promise.all([
    prisma.asset.upsert({
      where: { assetNumber: 'AST202500001' },
      update: {},
      create: {
        assetNumber: 'AST202500001',
        assetName: 'CNC Torna Makinesi',
        description: 'Yüksek hassasiyetli CNC torna makinesi',
        serialNumber: 'CNC-2024-001',
        assetTypeId: assetTypes[0].id,
        assetStatusId: assetStatuses[0].id,
        purchaseDate: new Date('2024-01-15'),
        purchasePrice: 500000,
        locationId: locations[0].id,
        departmentId: departments[0].id,
        costCenterId: costCenters[0].id,
        warrantyStartDate: new Date('2024-01-15'),
        warrantyEndDate: new Date('2027-01-15'),
        manufacturer: 'DMG MORI',
        model: 'NLX 2500',
      },
    }),
    prisma.asset.upsert({
      where: { assetNumber: 'AST202500002' },
      update: {},
      create: {
        assetNumber: 'AST202500002',
        assetName: 'Dell Precision Workstation',
        description: 'İş istasyonu bilgisayar',
        serialNumber: 'DELL-WS-2024-002',
        assetTypeId: assetTypes[1].id,
        assetStatusId: assetStatuses[0].id,
        purchaseDate: new Date('2024-03-20'),
        purchasePrice: 45000,
        locationId: locations[0].id,
        departmentId: departments[3].id,
        costCenterId: costCenters[3].id,
        warrantyStartDate: new Date('2024-03-20'),
        warrantyEndDate: new Date('2027-03-20'),
        manufacturer: 'Dell',
        model: 'Precision 5820',
      },
    }),
    prisma.asset.upsert({
      where: { assetNumber: 'AST202500003' },
      update: {},
      create: {
        assetNumber: 'AST202500003',
        assetName: 'Toyota Forklift',
        description: '3 tonluk elektrikli forklift',
        serialNumber: 'TOY-FRK-2024-003',
        assetTypeId: assetTypes[2].id,
        assetStatusId: assetStatuses[1].id,
        purchaseDate: new Date('2024-02-10'),
        purchasePrice: 350000,
        locationId: locations[2].id,
        departmentId: departments[0].id,
        costCenterId: costCenters[0].id,
        warrantyStartDate: new Date('2024-02-10'),
        warrantyEndDate: new Date('2026-02-10'),
        manufacturer: 'Toyota',
        model: '8FD30',
      },
    }),
    prisma.asset.upsert({
      where: { assetNumber: 'AST202500004' },
      update: {},
      create: {
        assetNumber: 'AST202500004',
        assetName: 'Ofis Masası Premium',
        description: 'Ahşap ofis masası, ayarlanabilir yükseklik',
        serialNumber: 'DESK-PRE-2024-004',
        assetTypeId: assetTypes[3].id,
        assetStatusId: assetStatuses[0].id,
        purchaseDate: new Date('2024-04-05'),
        purchasePrice: 8500,
        locationId: locations[0].id,
        departmentId: departments[4].id,
        manufacturer: 'Koleksiyon',
        model: 'Executive Plus',
      },
    }),
    prisma.asset.upsert({
      where: { assetNumber: 'AST202500005' },
      update: {},
      create: {
        assetNumber: 'AST202500005',
        assetName: 'Hidrolik Pres Makinesi',
        description: '200 ton kapasiteli hidrolik pres',
        serialNumber: 'HYD-PRE-2020-005',
        assetTypeId: assetTypes[0].id,
        assetStatusId: assetStatuses[2].id,
        purchaseDate: new Date('2020-06-15'),
        purchasePrice: 800000,
        locationId: locations[1].id,
        departmentId: departments[0].id,
        costCenterId: costCenters[0].id,
        warrantyStartDate: new Date('2020-06-15'),
        warrantyEndDate: new Date('2023-06-15'),
        manufacturer: 'Hydraulic Systems',
        model: 'HS-200T',
      },
    }),
  ]);

  console.log(`✅ Created ${assets.length} assets`);

  // ========================================
  // 9. JOB REQUESTS
  // ========================================
  console.log('📋 Creating job requests...');

  const jobRequests = await Promise.all([
    prisma.jobRequest.create({
      data: {
        requestNumber: 'JR-2025-001',
        title: 'CNC Makine Titreşim Sorunu',
        requestDate: new Date('2025-01-10'),
        asset: { connect: { id: assets[0].id } },
        requester: { connect: { id: users[1].id } },
        priority: 'HIGH',
        description: 'CNC makinesinde titreşim sorunu var, acil bakım gerekiyor',
        status: 'PENDING',
        department: { connect: { id: departments[0].id } },
        location: { connect: { id: locations[0].id } },
      },
    }),
    prisma.jobRequest.create({
      data: {
        requestNumber: 'JR-2025-002',
        title: 'Forklift Periyodik Bakım',
        requestDate: new Date('2025-01-15'),
        asset: { connect: { id: assets[2].id } },
        requester: { connect: { id: users[5].id } },
        priority: 'MEDIUM',
        description: 'Forklift periyodik bakım zamanı geldi',
        status: 'IN_PROGRESS',
        department: { connect: { id: departments[0].id } },
        location: { connect: { id: locations[2].id } },
        assignee: { connect: { id: users[3].id } },
      },
    }),
    prisma.jobRequest.create({
      data: {
        requestNumber: 'JR-2025-003',
        title: 'Bilgisayar Bakım ve Güncelleme',
        requestDate: new Date('2025-01-05'),
        asset: { connect: { id: assets[1].id } },
        requester: { connect: { id: users[4].id } },
        priority: 'LOW',
        description: 'Bilgisayar temizliği ve yazılım güncellemesi',
        status: 'COMPLETED',
        department: { connect: { id: departments[3].id } },
        location: { connect: { id: locations[0].id } },
        assignee: { connect: { id: users[2].id } },
        completionDate: new Date('2025-01-08'),
      },
    }),
  ]);

  console.log(`✅ Created ${jobRequests.length} job requests`);

  // ========================================
  // 10. ASSIGNMENTS
  // ========================================
  console.log('📝 Creating assignments...');

  const assignments = await Promise.all([
    prisma.assignment.create({
      data: {
        assignmentNumber: 'ASGN-2025-001',
        title: 'Dell Workstation Zimmet',
        asset: { connect: { id: assets[1].id } },
        assignee: { connect: { id: users[2].id } },
        assigner: { connect: { id: users[0].id } },
        assignedDate: new Date('2024-03-25'),
        notes: 'Günlük kullanım için zimmetlendi',
      },
    }),
    prisma.assignment.create({
      data: {
        assignmentNumber: 'ASGN-2025-002',
        title: 'Ofis Masası Zimmet',
        asset: { connect: { id: assets[3].id } },
        assignee: { connect: { id: users[4].id } },
        assigner: { connect: { id: users[0].id } },
        assignedDate: new Date('2024-04-10'),
        notes: 'Ofis kullanımı için zimmetlendi',
      },
    }),
    prisma.assignment.create({
      data: {
        assignmentNumber: 'ASGN-2025-003',
        title: 'CNC Makine Zimmet',
        asset: { connect: { id: assets[0].id } },
        assignee: { connect: { id: users[5].id } },
        assigner: { connect: { id: users[1].id } },
        assignedDate: new Date('2024-01-20'),
        notes: 'Üretim için operatöre zimmetlendi',
      },
    }),
    prisma.assignment.create({
      data: {
        assignmentNumber: 'ASGN-2024-100',
        title: 'Forklift Zimmet (İade Edildi)',
        asset: { connect: { id: assets[2].id } },
        assignee: { connect: { id: users[3].id } },
        assigner: { connect: { id: users[1].id } },
        assignedDate: new Date('2024-02-15'),
        acceptedDate: new Date('2024-02-16'),
        completionDate: new Date('2024-12-20'),
        notes: 'Depo operasyonları için zimmetlendi, iade edildi',
      },
    }),
  ]);

  console.log(`✅ Created ${assignments.length} assignments`);

  // ========================================
  // 11. RETIREMENTS
  // ========================================
  console.log('♻️ Creating asset retirements...');

  const retirements = await Promise.all([
    prisma.assetRetirement.create({
      data: {
        retirementNumber: 'RET-2025-001',
        asset: { connect: { id: assets[4].id } },
        retiringMethod: { connect: { id: retiringMethods[0].id } },
        retirementDate: new Date('2025-01-10'),
        retirementReason: 'Makine ömrünü tamamladı, yeni teknoloji ile değiştirilecek',
        bookValue: 200000,
        salvageValue: 50000,
        disposalCost: 5000,
        gainLoss: -155000,
        buyerName: 'Metal Geri Dönüşüm A.Ş.',
        buyerContact: '+90 555 200 3000',
        salePrice: 50000,
        saleDate: new Date('2025-01-15'),
        disposalLocation: 'Ana Fabrika - Yan Bina',
        disposalMethod: 'Satış yoluyla elden çıkarma',
        notes: 'Satış işlemi tamamlandı, ödeme alındı',
      },
    }),
  ]);

  console.log(`✅ Created ${retirements.length} retirements`);

  // ========================================
  // 12. COST CENTER CHANGES
  // ========================================
  console.log('💸 Creating cost center changes...');

  const costCenterChanges = await Promise.all([
    prisma.costCenterChange.create({
      data: {
        oldCostCenter: { connect: { id: costCenters[1].id } },
        newCostCenter: { connect: { id: costCenters[0].id } },
        changeDate: new Date('2025-01-05'),
        effectiveDate: new Date('2025-02-01'),
        changeReason: 'Forklift bakım departmanından üretim departmanına transfer edildi',
        changer: { connect: { id: users[1].id } },
        approver: { connect: { id: users[0].id } },
        approvalDate: new Date('2025-01-06'),
        referenceType: 'ASSET',
        referenceId: assets[2].id,
      },
    }),
  ]);

  console.log(`✅ Created ${costCenterChanges.length} cost center changes`);

  // ========================================
  // 13. INCIDENTS
  // ========================================
  console.log('⚠️ Creating incidents...');

  const incidents = await Promise.all([
    prisma.incident.create({
      data: {
        incidentNumber: 'INC-2025-001',
        asset: { connect: { id: assets[0].id } },
        incidentDate: new Date('2025-01-08'),
        reportedByUser: { connect: { id: users[5].id } },
        incidentType: 'BREAKDOWN',
        severity: 'HIGH',
        description: 'CNC makinesinde ani duruş, kontrol panelinde hata kodu',
        immediateAction: 'Makine durduruldu, güvenlik prosedürleri uygulandı',
        status: 'OPEN',
        department: { connect: { id: departments[0].id } },
        location: { connect: { id: locations[0].id } },
      },
    }),
    prisma.incident.create({
      data: {
        incidentNumber: 'INC-2025-002',
        asset: { connect: { id: assets[2].id } },
        incidentDate: new Date('2024-12-15'),
        reportedByUser: { connect: { id: users[3].id } },
        incidentType: 'DAMAGE',
        severity: 'MEDIUM',
        description: 'Forklift çatalında hafif hasar tespit edildi',
        immediateAction: 'Forklift kullanımdan çıkarıldı',
        rootCause: 'Operatör hatası',
        correctiveAction: 'Çatal değiştirildi, operatöre eğitim verildi',
        status: 'RESOLVED',
        resolvedAt: new Date('2024-12-20'),
        department: { connect: { id: departments[0].id } },
        location: { connect: { id: locations[2].id } },
      },
    }),
  ]);

  console.log(`✅ Created ${incidents.length} incidents`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${departments.length} Departments`);
  console.log(`   - ${locations.length} Locations`);
  console.log(`   - ${costCenters.length} Cost Centers`);
  console.log(`   - ${users.length} Users (password: password123)`);
  console.log(`   - ${assetTypes.length} Asset Types`);
  console.log(`   - ${assetStatuses.length} Asset Statuses`);
  console.log(`   - ${retiringMethods.length} Retiring Methods`);
  console.log(`   - ${assets.length} Assets`);
  console.log(`   - ${jobRequests.length} Job Requests`);
  console.log(`   - ${assignments.length} Assignments`);
  console.log(`   - ${retirements.length} Retirements`);
  console.log(`   - ${costCenterChanges.length} Cost Center Changes`);
  console.log(`   - ${incidents.length} Incidents`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

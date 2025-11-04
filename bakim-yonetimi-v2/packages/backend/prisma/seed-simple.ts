import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test department
  const department = await prisma.department.upsert({
    where: { departmentCode: 'IT' },
    update: {},
    create: {
      departmentCode: 'IT',
      departmentName: 'Information Technology',
      description: 'IT Department',
      isActive: true,
    },
  });

  console.log('✅ Department created');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      passwordHash: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      fullName: 'Admin User',
      primaryDepartmentId: department.id,
      phoneNumber: '+90 555 111 2233',
      isActive: true,
    },
  });

  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      username: 'manager',
      email: 'manager@example.com',
      passwordHash: hashedPassword,
      firstName: 'Manager',
      lastName: 'User',
      fullName: 'Manager User',
      primaryDepartmentId: department.id,
      phoneNumber: '+90 555 222 3344',
      isActive: true,
    },
  });

  const engineerUser = await prisma.user.upsert({
    where: { email: 'engineer@example.com' },
    update: {},
    create: {
      username: 'engineer',
      email: 'engineer@example.com',
      passwordHash: hashedPassword,
      firstName: 'Engineer',
      lastName: 'User',
      fullName: 'Engineer User',
      primaryDepartmentId: department.id,
      phoneNumber: '+90 555 333 4455',
      isActive: true,
    },
  });

  console.log('✅ Users created');
  console.log('\n📧 Demo Users:');
  console.log('  Admin:    admin@example.com / password123');
  console.log('  Manager:  manager@example.com / password123');
  console.log('  Engineer: engineer@example.com / password123\n');

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
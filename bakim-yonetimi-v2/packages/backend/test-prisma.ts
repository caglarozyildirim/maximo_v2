import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  console.log('Available models:');
  console.log(Object.keys(prisma));
  await prisma.$disconnect();
}

test();

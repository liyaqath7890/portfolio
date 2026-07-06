import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log(`Admin user created: ${email}`);
  } else {
    console.log('Admin user already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

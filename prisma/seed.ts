import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { permissions } from './seedData';

const prisma = new PrismaClient();

//Default users while creating a new DB
const seedData = async () => {
  console.log('Seeding data...');

  // admin user role seed
  await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin', description: 'System Administrator' },
  });

  // normal user role seed
  await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: { name: 'User', description: 'Normal User' },
  });

  console.log('Roles Seeded...');

  // permissions seed
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        entity_action: {
          entity: permission.entity,
          action: permission.action,
        },
      },
      update: {},
      create: permission,
    });
  }
  console.log('Permissions Seeded...');

  // admin user seed
  const hashedPassword = await bcrypt.hash(
    process.env.DEFAULT_ADMIN_PASSWORD!,
    10,
  );

  const adminUser = await prisma.user.upsert({
    where: {
      email: process.env.DEFAULT_ADMIN_EMAIL!,
    },
    update: {},
    create: {
      name: process.env.DEFAULT_ADMIN_NAME!,
      email: process.env.DEFAULT_ADMIN_EMAIL!,
      phone: process.env.DEFAULT_ADMIN_PHONE!,
      password: hashedPassword,
      isAdmin: true,
    },
  });
  console.log('Admin User Seeded...');

  // assign role to the admin user
  const adminRole = await prisma.role.findUnique({
    where: {
      name: 'Admin',
    },
  });

  if (!adminRole) {
    throw new Error('Admin role not found');
  }

  // use foreign key of user & role in userRole table
  // userId_roleId - Prisma generated this column automatically
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  const allPermissions = await prisma.permission.findMany();

  // assign all the permission to the Admin User
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }
  console.log('Role Permission Seeded...');
};

seedData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

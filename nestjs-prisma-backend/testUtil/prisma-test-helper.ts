import { PrismaClient, Prisma } from '@prisma/client';

const IGNORE_TRUNCATE_TABLES = ['_prisma_migrations'];

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export const truncateAllTable = async () => {
  const result: { tablename: string }[] =
    await prisma.$queryRaw`SELECT tablename FROM pg_tables where schemaname = 'public'`;

  for (const { tablename } of result) {
    if (!IGNORE_TRUNCATE_TABLES.includes(tablename)) {
      try {
        await prisma.$queryRawUnsafe(
            `TRUNCATE TABLE "public"."${tablename}" CASCADE`
        )
      } catch(e) {
        console.error(e)
      }
    }
  }
};
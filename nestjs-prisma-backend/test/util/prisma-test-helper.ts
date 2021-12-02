import { PrismaClient, Prisma } from '@prisma/client';

const IGNORE_TRUNCATE_TABLES = ['_prisma_migrations'];

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

export const truncateAllTable = async (): Promise<void> => {
  const prismaClient = new PrismaClient();

  const queryResult: { tablename: string }[] =
    await prismaClient.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = 'public';`;

  const truncateTables = queryResult
    .map((result) => result.tablename)
    .filter((tablename) => !IGNORE_TRUNCATE_TABLES.includes(tablename));

  for (const tableName of truncateTables) {
    console.log(
      Prisma.sql`TRUNCATE TABLE \"public\".${tableName} RESTART IDENTITY CASCADE`,
    );
    await prismaClient.$queryRaw(
        Prisma.sql`TRUNCATE TABLE \"public\"."${tableName}" RESTART IDENTITY CASCADE`)
  }
};
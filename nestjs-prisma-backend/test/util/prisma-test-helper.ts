import { PrismaClient, Prisma } from '@prisma/client';


const IGNORE_TRUNCATE_TABLES = ['_prisma_migrations'];

export const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

export const truncateAllTable = async (): Promise<void> => {
  const queryResult: { tablename: string }[] =
    await prismaClient.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = "public";`;

  const truncateTables = queryResult
    .map((result) => result.tablename)
    .filter((tablename) => !IGNORE_TRUNCATE_TABLES.includes(tablename));

  for (const tableName of truncateTables) {
    try {
      await prismaClient.$queryRaw`TRUNCATE TABLE "public"."${tableName}" CASCADE;`
    } catch(e) {
      console.error(e)
    }
  }
};
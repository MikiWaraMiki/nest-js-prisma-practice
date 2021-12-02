import * as util from 'util';
import { PrismaClient, Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec);

const IGNORE_TRUNCATE_TABLES = ['_prisma_migrations'];

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

export const cleanupDatabase = async (): Promise<void> => {
  await exec('npx prisma migrate reset --force');
};

export const setupDatabase = async (): Promise<void> => {
  await exec('npx prisma migrate dev --preview-feature');
};

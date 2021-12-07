/*
  Warnings:

  - You are about to drop the column `tenant_id` on the `UserAuthInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAuthInfo" DROP CONSTRAINT "UserAuthInfo_tenant_id_fkey";

-- AlterTable
ALTER TABLE "UserAuthInfo" DROP COLUMN "tenant_id";

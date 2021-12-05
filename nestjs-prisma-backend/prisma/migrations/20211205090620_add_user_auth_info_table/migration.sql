/*
  Warnings:

  - The primary key for the `TenantAuthInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TenantAuthInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TenantAuthInfo" DROP CONSTRAINT "TenantAuthInfo_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "UserAuthInfo" (
    "user_id" CHAR(26) NOT NULL,
    "auth0_user_id" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAuthInfo_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthInfo_auth0_user_id_key" ON "UserAuthInfo"("auth0_user_id");

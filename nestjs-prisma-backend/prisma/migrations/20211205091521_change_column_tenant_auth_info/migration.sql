/*
  Warnings:

  - Added the required column `tenant_id` to the `UserAuthInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAuthInfo" ADD COLUMN     "tenant_id" CHAR(26) NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAuthInfo" ADD CONSTRAINT "UserAuthInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAuthInfo" ADD CONSTRAINT "UserAuthInfo_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,user_id]` on the table `UserInTenant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserInTenant_tenant_id_user_id_key" ON "UserInTenant"("tenant_id", "user_id");

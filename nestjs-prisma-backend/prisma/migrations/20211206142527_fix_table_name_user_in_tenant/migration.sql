/*
  Warnings:

  - You are about to drop the `UserInTenant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserInTenant" DROP CONSTRAINT "UserInTenant_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "UserInTenant" DROP CONSTRAINT "UserInTenant_user_id_fkey";

-- DropTable
DROP TABLE "UserInTenant";

-- CreateTable
CREATE TABLE "UserJoinedTenant" (
    "id" SERIAL NOT NULL,
    "user_id" CHAR(26) NOT NULL,
    "tenant_id" CHAR(26) NOT NULL,

    CONSTRAINT "UserJoinedTenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserJoinedTenant_tenant_id_user_id_key" ON "UserJoinedTenant"("tenant_id", "user_id");

-- AddForeignKey
ALTER TABLE "UserJoinedTenant" ADD CONSTRAINT "UserJoinedTenant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJoinedTenant" ADD CONSTRAINT "UserJoinedTenant_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `UserAuth0Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAuth0Account" DROP CONSTRAINT "UserAuth0Account_user_id_fkey";

-- DropTable
DROP TABLE "UserAuth0Account";

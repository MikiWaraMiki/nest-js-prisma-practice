/*
  Warnings:

  - Added the required column `userProfileUser_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userProfileUser_id" CHAR(26) NOT NULL;

-- CreateTable
CREATE TABLE "UserProfile" (
    "user_id" CHAR(26) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("userProfileUser_id") REFERENCES "UserProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

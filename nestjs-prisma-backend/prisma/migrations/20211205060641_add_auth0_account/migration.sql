-- CreateTable
CREATE TABLE "UserAuth0Account" (
    "auth0_uuid" CHAR(24) NOT NULL,
    "user_id" CHAR(26) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAuth0Account_pkey" PRIMARY KEY ("auth0_uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth0Account_user_id_key" ON "UserAuth0Account"("user_id");

-- AddForeignKey
ALTER TABLE "UserAuth0Account" ADD CONSTRAINT "UserAuth0Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "TenantAuthInfo" (
    "id" SERIAL NOT NULL,
    "tenant_id" CHAR(26) NOT NULL,
    "tenant_auth0_id" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantAuthInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantAuthInfo_tenant_auth0_id_tenant_id_key" ON "TenantAuthInfo"("tenant_auth0_id", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "TenantAuthInfo_tenant_id_key" ON "TenantAuthInfo"("tenant_id");

-- AddForeignKey
ALTER TABLE "TenantAuthInfo" ADD CONSTRAINT "TenantAuthInfo_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { PrismaClient } from "@prisma/client";
import { ulid } from "ulid";

const prisma = new PrismaClient()

async function main () {
  const tenant = await prisma.tenant.create({
    data: {
      id: ulid(),
      name: 'active-tenant-1',
      status: 'active',
      createdAt: new Date()
    }
  })

  const tenantAuthInfo = await prisma.tenantAuthInfo.create({
    data: {
      tenant_auth0_id: 'org_XNv4e6BU2KPZ3nzh',
      tenant_id: tenant.id,
      created_at: new Date()
    }
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect
  })

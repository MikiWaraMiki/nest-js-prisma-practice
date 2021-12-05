import { Injectable } from "@nestjs/common";
import { PrismaClient, Tenant as TenantRecord } from "@prisma/client";
import { Tenant } from "src/domain/tenant/tenant";
import { TenantId } from "src/domain/tenant/tenant-id";
import { TenantName } from "src/domain/tenant/tenant-name";
import { TenantRepository } from "src/domain/tenant/tenant-repository";
import { TenantStatus } from "src/domain/tenant/tenant-status";


@Injectable()
export class TenantPrismaRepository implements TenantRepository {
  constructor(private prisma: PrismaClient){}

  async save(tenant: Tenant): Promise<void> {
    const data = {
      id: tenant.tenantId.value,
      name: tenant.tenantName.value,
      status: tenant.tenantStatus.value
    }

    await this.prisma.tenant.upsert({
      where: {
        id: tenant.tenantId.value
      },
      update: data,
      create: {
        ...data,
        createdAt: new Date()
      }
    })
  }

  async findByTenantId(tenantId: TenantId): Promise<Tenant | undefined> {
    const record = await this.prisma.tenant.findUnique({
      where: {
        id: tenantId.value
      }
    })

    if(!record) return undefined

    return this.convertToModelFromRecord(record)
  }

  private convertToModelFromRecord(record: TenantRecord): Tenant {
    return Tenant.reConstructor(
      TenantId.reConstructor(record.id),
      new TenantName(record.name),
      new TenantStatus(record.status)
    )
  }
}

import { Injectable } from "@nestjs/common";
import {
  PrismaClient,
  TenantAuthInfo as TenantAuthInfoRecord
} from "@prisma/client";
import { TenantAuthInfo } from "src/domain/tenant-auth-info/tenant-auth-info";
import { TenantAuthInfoRepository } from "src/domain/tenant-auth-info/tenant-auth-info-repository";
import { TenantAuth0ID } from "src/domain/tenant-auth-info/tenant-auth0-id";
import { TenantId } from "src/domain/tenant/tenant-id";

@Injectable()
export class TenantAuthInfoPrismaRepository implements TenantAuthInfoRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async save(tenantAuthInfo: TenantAuthInfo): Promise<void> {
    const data: TenantAuthInfoRecord = {
      tenant_id: tenantAuthInfo.tenantId.value,
      tenant_auth0_id: tenantAuthInfo.tenantAuth0ID.value,
      created_at: new Date()
    }

    await this.prisma.tenantAuthInfo.create({
      data: data
    })
  }

  async findByAuth0Id(tenantAuth0ID: TenantAuth0ID): Promise<TenantAuthInfo> {
    const record = await this.prisma.tenantAuthInfo.findFirst({
      where: {
        tenant_auth0_id: tenantAuth0ID.value
      }
    })

    if (!record) return undefined

    return this.convertToEntity(record)
  }

  private convertToEntity(record: TenantAuthInfoRecord): TenantAuthInfo {
    return new TenantAuthInfo(
      TenantId.reConstructor(record.tenant_id),
      new TenantAuth0ID(record.tenant_auth0_id)
    )
  }

}

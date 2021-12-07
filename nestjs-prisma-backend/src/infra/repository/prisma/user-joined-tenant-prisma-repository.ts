import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient, UserJoinedTenant, UserJoinedTenant as UserJoinedTenantRecord } from "@prisma/client";
import { request } from "express";
import { TenantId } from "src/domain/tenant/tenant-id";
import { UserJoinedTenantList } from "src/domain/user-joined-tenant/user-joined-tenant-list";
import { UserJoinedTenantRepository } from "src/domain/user-joined-tenant/user-joined-tenant-repository";
import { UserId } from "src/domain/user/UserID";
import { PrismaService } from "./prisma-service";

@Injectable()
export class UserJoinedTenantPrismaRepository implements UserJoinedTenantRepository {

  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaClient
  ) {}

  async findByUserId(userID: UserId): Promise<UserJoinedTenantList> {
    const result = await this.prisma.userJoinedTenant.findMany({
      where: {
        user_id: userID.value
      }
    })

    if(!result || result.length < 1) return UserJoinedTenantList.reConstructor([])

    const tenantIdList: TenantId[] = result.map((record) => TenantId.reConstructor(record.tenant_id))

    return UserJoinedTenantList.reConstructor(tenantIdList)
  }

  async add(userId: UserId, tenantId: TenantId): Promise<void> {
    await this.prisma.userJoinedTenant.create({
      data: {
        user_id: userId.value,
        tenant_id: tenantId.value
      }
    })
  }

  async delete(userId: UserId, tenantId: TenantId): Promise<void> {
    await this.prisma.userJoinedTenant.deleteMany({
      where: {
        user_id: userId.value,
        tenant_id: tenantId.value
      }
    })
  }
}

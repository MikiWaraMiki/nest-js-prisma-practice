import { PrismaClient, UserAuthInfo as UserAuthInfoRecord } from ".prisma/client";
import { TenantId } from "src/domain/tenant/tenant-id";
import { UserAuthInfo } from "src/domain/user-auth-info/user-auth-info";
import { UserAuthInfoRepository } from "src/domain/user-auth-info/user-auth-info-repository";
import { UserId } from "src/domain/user/UserID";

export class UserAuthInfoPrismaRepository implements UserAuthInfoRepository {
  constructor(
    private prisma: PrismaClient
  ){}

  async findByAuth0UUID(auth0UUID: string): Promise<UserAuthInfo | undefined> {
    const result = await this.prisma.userAuthInfo.findUnique({
      where: {
        auth0_user_id: auth0UUID
      }
    })

    if(!result) return undefined

    return this.mapToEntity(result)
  }

  private mapToEntity(record: UserAuthInfoRecord): UserAuthInfo {
    return new UserAuthInfo(
      UserId.reConstructor(record.user_id),
      record.auth0_user_id,
      TenantId.reConstructor(record.tenant_id)
    )
  }
}

import { DomainException } from "../shared/exception/DomainException";
import { TenantId } from "../tenant/tenant-id";
import { UserId } from "../user/UserID";

/**
 * ユーザー所属テナント
 */
export class UserJoinedTenantList {

  private constructor(
    private joinedTenantIdList: TenantId[]
  ) {}

  join(tenantId: TenantId) {
    if(this.isJoin(tenantId)) {
      throw new DomainException("すでに所属しているテナントです")
    }

    this.joinedTenantIdList = [...this.joinedTenantIdList, tenantId]
  }

  withdrawal(tenantId: TenantId) {
    if(!this.isJoin(tenantId)) {
      throw new DomainException("所属していないテナントから退会することはできません")
    }

    this.joinedTenantIdList = this.joinedTenantIdList.filter(
      id => tenantId.value != id.value
    )
  }

  isJoin(tenantId: TenantId): boolean {
    return this.joinedTenantIdList.some(
      id => tenantId.value === id.value
    )
  }

  static create(): UserJoinedTenantList {
    return new UserJoinedTenantList([])
  }

  static reConstructor(tenantIdList: TenantId[]): UserJoinedTenantList {
    return new UserJoinedTenantList(
      tenantIdList
    )
  }
}

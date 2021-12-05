import { DomainException } from "../shared/exception/DomainException";
import { TenantId } from "../tenant/tenant-id";
import { UserId } from "../user/UserID";

export class UserAuthInfo {
  constructor(
    readonly userId: UserId,
    readonly auth0UUID: string,
    readonly tenantId: TenantId
  ) {
    if(!auth0UUID)
      throw new DomainException("Auth0のUUIDが必要です")
  }
}

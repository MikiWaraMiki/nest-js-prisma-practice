import { TenantId } from "../tenant/tenant-id";
import { UserId } from "../user/UserID";
import { UserJoinedTenantList } from "./user-joined-tenant-list";

export interface UserJoinedTenantRepository {
  findByUserId(userID: UserId): Promise<UserJoinedTenantList>
  add(userId: UserId, tenantId: TenantId): Promise<void>
  delete(userId: UserId, tenantId: TenantId): Promise<void>
}

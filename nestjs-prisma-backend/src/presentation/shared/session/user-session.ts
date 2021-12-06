import { TenantId } from "src/domain/tenant/tenant-id";
import { UserId } from "src/domain/user/UserID";

export interface UserSession {
  userId?: UserId,
  tenantId?: TenantId
}

import { TenantAuthInfo } from "./tenant-auth-info";
import { TenantAuth0ID } from "./tenant-auth0-id";

export interface TenantAuthInfoRepository {
  save(tenantAuthInfo: TenantAuthInfo): Promise<void>
  findByAuth0Id(tenantAuth0ID: TenantAuth0ID): Promise<TenantAuthInfo>
}

import { Tenant } from "./tenant";
import { TenantId } from "./tenant-id";

export interface TenantRepository {
  save(tenant: Tenant): Promise<void>
  findByTenantId(tenantId: TenantId): Promise<Tenant | undefined>
}

import { TenantName } from "src/domain/tenant/tenant-name";
import { Tenant } from "./tenant";
import { TenantId } from "./tenant-id";

export interface TenantRepository {
  save(tenant: Tenant): Promise<void>
  findByTenantId(tenantId: TenantId): Promise<Tenant | undefined>
  findByTenantName(tenantName: TenantName): Promise<Tenant | undefined>
}

import { Tenant } from "src/domain/tenant/tenant";
import { TenantId } from "src/domain/tenant/tenant-id";
import { TenantName } from "src/domain/tenant/tenant-name";
import { TenantStatus, TENANT_STUTUS_VARIATION } from "src/domain/tenant/tenant-status";

export class TestTenantFactory {
  create(
    tenantId: TenantId = TenantId.create(),
    tenantName: TenantName = new TenantName('hogehoge'),
    tenantStatus: TenantStatus = new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)
  ): Tenant {
    return Tenant.reConstructor(
      tenantId,
      tenantName,
      tenantStatus
    )
  }
}

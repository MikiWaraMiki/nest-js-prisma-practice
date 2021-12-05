import { Tenant } from 'src/domain/tenant/tenant';
import { TenantId } from 'src/domain/tenant/tenant-id';
import { TenantName } from 'src/domain/tenant/tenant-name';
import { TenantRepository } from 'src/domain/tenant/tenant-repository';
import { TenantStatus, TENANT_STUTUS_VARIATION } from 'src/domain/tenant/tenant-status';
import { TestTenantFactory } from './test-tenant-factory';

export class TenantDataCreator {
  private testTenantFactory = new TestTenantFactory()

  constructor(
    private tenantRepository: TenantRepository
  ) {

  }

  async create(
    {
      tenantId = TenantId.create(),
      tenantName = new TenantName('hogehoge'),
      tenantStatus = new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)
    } : { tenantId?: TenantId, tenantName?: TenantName, tenantStatus?: TenantStatus }
  ): Promise<Tenant> {
    const tenant = this.testTenantFactory.create(
      tenantId,
      tenantName,
      tenantStatus
    )

    await this.tenantRepository.save(tenant)

    return tenant
  }
}

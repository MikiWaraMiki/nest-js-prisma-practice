import { DomainException } from "../shared/exception/DomainException"
import { TenantId } from "./tenant-id"
import { TenantName } from "./tenant-name"
import { TenantStatus, TENANT_STUTUS_VARIATION } from "./tenant-status"

export class Tenant {
  private constructor(
    readonly tenantId: TenantId,
    readonly tenantName: TenantName,
    readonly tenantStatus: TenantStatus
  ) {}

  activated(): Tenant {
    return this.changeTenantStatus(
      new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)
    )
  }

  endOfContract(): Tenant {
    return this.changeTenantStatus(
      new TenantStatus(TENANT_STUTUS_VARIATION.END_OF_CONTRACT)
    )
  }

  private changeTenantStatus(targetTenantStatus: TenantStatus): Tenant {
    if(!this.tenantStatus.canTransit(targetTenantStatus))
    throw new DomainException(
      `${this.tenantStatus.value}から${targetTenantStatus.value}にステータス変更することはできません`
    )

    return Tenant.reConstructor(
      this.tenantId,
      this.tenantName,
      targetTenantStatus
    )
  }

  static create(tenantName: TenantName): Tenant {
    const tenantId = TenantId.create()
    const tenantStatus = new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY)

    return new Tenant(
      tenantId,
      tenantName,
      tenantStatus
    )
  }

  static reConstructor(
    tenantId: TenantId,
    tenantName: TenantName,
    tenantStatus: TenantStatus
  ): Tenant {
    return new Tenant(
      tenantId,
      tenantName,
      tenantStatus
    )
  }
}

import { DomainException } from "src/domain/shared/exception/DomainException"
import { ulid } from "ulid"
import { Tenant } from "../tenant"
import { TenantId } from "../tenant-id"
import { TenantName } from "../tenant-name"
import { TenantStatus, TENANT_STUTUS_VARIATION } from "../tenant-status"

describe('Tenantクラスのテスト', () => {
  describe('createメソッドのテスト', () => {
    it('ステータスがin_readyの状態でTenantインスタンスが生成されること', () => {
      const name = new TenantName("sampled")
      const tenant = Tenant.create(name)

      expect(tenant.tenantStatus).toEqual(new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY))
      expect(tenant.tenantName).toEqual(name)
      expect(tenant.tenantId).not.toBeNull()
    })
  })

  describe('activatedメソッドのテスト', () => {
    it('変更前のステータスがin_readyの場合は、ステータスがactiveに変更されること', () => {
      const tenant = Tenant.create(new TenantName("sampled"))

      const activatedTenant = tenant.activated()

      expect(activatedTenant.tenantStatus).toEqual(
        new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)
      )
    })

    test.each([
      new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE),
      new TenantStatus(TENANT_STUTUS_VARIATION.END_OF_CONTRACT)
    ])('変更前のステータスがin_ready以外の場合は、DomainExceptionが発生すること', (status) => {
      const tenant = Tenant.reConstructor(
        TenantId.create(),
        new TenantName('sampled'),
        status
      )

      const target = () => {
        tenant.activated()
      }

      expect(target).toThrow(DomainException)
      expect(target).toThrow(`${status.value}からactiveにステータス変更することはできません`)
    })
  })

  describe('endOfContractメソッドのテスト', () => {
    it('変更前のステータスがactiveの場合は、ステータスがendOfContractに変更されること', () => {
      const tenant = Tenant.reConstructor(
        TenantId.create(),
        new TenantName('sampled'),
        new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)
      )

      const endOfContractTenant = tenant.endOfContract()

      expect(endOfContractTenant.tenantStatus).toEqual(
        new TenantStatus(TENANT_STUTUS_VARIATION.END_OF_CONTRACT)
      )
    })

    it('すでにend_of_contractの場合は、DomainExceptionが発生すること', () => {
      const tenant = Tenant.reConstructor(
        TenantId.create(),
        new TenantName('sampled'),
        new TenantStatus(TENANT_STUTUS_VARIATION.END_OF_CONTRACT)
      )

      const target = () => {
        tenant.endOfContract()
      }

      expect(target).toThrow(DomainException)
    })
  })
})

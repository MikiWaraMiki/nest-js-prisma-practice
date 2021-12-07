import { DomainException } from "src/domain/shared/exception/DomainException"
import { TenantId } from "src/domain/tenant/tenant-id"
import { UserJoinedTenantList } from "../user-joined-tenant-list"

describe('UserJoinedTenatList', () => {
  describe('joinのテスト', () => {
    it('すでに所属しているテナントの場合はDomainExceptionが発生すること', () => {
      const userjoinedTenantList = UserJoinedTenantList.create()

      const tenantId = TenantId.create()

      userjoinedTenantList.join(tenantId)

      const target = () => {
        userjoinedTenantList.join(tenantId)
      }

      expect(target).toThrow(DomainException)
      expect(target).toThrow('すでに所属しているテナントです')
    })

    it('所属していないテナントの場合は、所属テナントに追加されること', () => {
      const userjoinedTenantList = UserJoinedTenantList.create()

      const tenantId = TenantId.create()

      userjoinedTenantList.join(tenantId)

      const newAddTenantId = TenantId.create()
      userjoinedTenantList.join(newAddTenantId)

      expect(userjoinedTenantList.isJoin(newAddTenantId)).toBeTruthy
    })
  })

  describe('withdrawalのテスト', () => {
    it('所属していないテナントから退会する場合はDomainExceptionが発生すること', () => {
      const userjoinedTenantList = UserJoinedTenantList.create()

      const tenantId = TenantId.create()

      const target = () => {
        userjoinedTenantList.withdrawal(tenantId)
      }

      expect(target).toThrow(DomainException)
      expect(target).toThrow('所属していないテナントから退会することはできません')
    })

    it('所属しているテナントから退会することができること', () => {
      const userjoinedTenantList = UserJoinedTenantList.create()

      const tenantId = TenantId.create()

      userjoinedTenantList.join(tenantId)

      userjoinedTenantList.withdrawal(tenantId)

      expect(userjoinedTenantList.isJoin(tenantId)).toBeFalsy
    })
  })
})

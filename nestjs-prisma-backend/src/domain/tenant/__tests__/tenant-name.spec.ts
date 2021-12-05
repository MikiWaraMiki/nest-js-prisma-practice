import { DomainException } from "src/domain/shared/exception/DomainException"
import { TenantName } from "../tenant-name"

describe('TenantNameクラスのテスト', () => {
  describe('不変条件のテスト', () => {
    it('テナント名が入力されていない場合はDomainExceptionが発生すること', () => {
      const target = () => {
        new TenantName('')
      }

      expect(target).toThrow(DomainException)
      expect(target).toThrow('テナント名が入力されていません')
    })

    it('テナント名が257文字以上で入力されている場合はDomainExceptionが発生すること', () => {
      const target = () => {
        new TenantName('a'.repeat(257))
      }

      expect(target).toThrow(DomainException)
      expect(target).toThrow('テナント名が256文字以内で入力してください')
    })

    it('テナント名が256文字以内で登録されている場合はエラーが発生しないこと', () => {
      const value = 'a'.repeat(256)
      const tenantName = new TenantName(value)

      expect(tenantName.value).toEqual(value)
    })
  })
})

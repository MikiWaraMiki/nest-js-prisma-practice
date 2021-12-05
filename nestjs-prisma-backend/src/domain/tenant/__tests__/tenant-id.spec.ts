import { DomainException } from "src/domain/shared/exception/DomainException"
import { ulid } from "ulid"
import { TenantId } from "../tenant-id"

describe("TenantID Test", () => {
  describe("不変条件テスト", () => {
    it('IDが空の場合はDomainExceptionが発生すること', () => {
      const target = () => {
        TenantId.reConstructor('')
      }

      expect(target).toThrow(DomainException)
      expect(target).toThrow('テナントIDが入力されていません')
    })

    it('IDが26文字でない場合はDomainExceptionが発生すること', () => {
      const target = () => {
        TenantId.reConstructor('a'.repeat(25))
      }

      expect(target).toThrow(DomainException)
      expect(target).toThrow('テナントIDの文字数が正しくありません')
    })

    it('IDが26文字の場合はエラーが発生しないこと', () => {
      const id = ulid()
      const tenantId = TenantId.reConstructor(id)

      expect(tenantId.value).toEqual(id)
    })
  })

  describe("createテスト", () => {
    it('TenantIDが生成されること', () => {
      const tenantId = TenantId.create()

      expect(tenantId.value.length).toEqual(26)
    })
  })
})

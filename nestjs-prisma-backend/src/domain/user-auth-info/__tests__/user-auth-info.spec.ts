import { assert } from "console"
import { DomainException } from "src/domain/shared/exception/DomainException"
import { UserId } from "src/domain/user/UserID"
import { UserAuthInfo } from "../user-auth-info"

describe('UserAuthInfoクラスのテスト', () => {
  describe('不変条件のテスト', () => {
    it('auth0UUIDが空の場合はDomainExceptionが発生すること', () => {
      const target = () => {
        new UserAuthInfo(
          UserId.create(),
          ''
        )
      }

      expect(target).toThrow(DomainException)
      expect(target).toThrow('Auth0のUUIDが必要です')
    })
  })
})

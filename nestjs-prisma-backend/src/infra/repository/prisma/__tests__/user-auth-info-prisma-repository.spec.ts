import { userInfo } from "os"
import { UserAuthInfo } from "src/domain/user-auth-info/user-auth-info"
import { prisma, truncateAllTable } from "testUtil/prisma-test-helper"
import { UserDataCreator } from "testUtil/user/user-data-creator"
import { UserAuthInfoPrismaRepository } from "../user-auth-info-prisma-repository"
import { UserPrismaRepository } from "../user-prisma-repository"

describe('UserAuthInfoPrismaRepositoryのテスト', () => {
  let userAuthInfoPrismaRepository: UserAuthInfoPrismaRepository
  let userDataCreator: UserDataCreator

  beforeAll(() => {
    userAuthInfoPrismaRepository = new UserAuthInfoPrismaRepository(
      prisma
    )
    userDataCreator = new UserDataCreator(
      new UserPrismaRepository(prisma)
    )
  })

  beforeEach(async () => {
    await truncateAllTable()
  })

  afterAll(async () => {
    await truncateAllTable()

    await prisma.$disconnect
  })

  describe('saveメソッドのテスト', () => {
    it('データが登録されてAuth0のUUIDで検索ができること', async () => {
      const user = await userDataCreator.create({})

      const auth0UUID = 'auth0:aaaaaaaaaaa'
      const userAuthInfo = new UserAuthInfo(
        user.userId,
        auth0UUID
      )

      await userAuthInfoPrismaRepository.save(userAuthInfo)

      const result = await userAuthInfoPrismaRepository.findByAuth0UUID(auth0UUID)

      expect(result.auth0UUID).toEqual(auth0UUID)
      expect(result.userId.value).toEqual(user.userId.value)
    })
  })

  describe('findByAuth0UUIDのテスト', () => {
    it('データが登録されている場合はUserAuthInfoを取得できること', async () => {
      const user = await userDataCreator.create({})
      const auth0UUID = 'auth0:aaaaaaaaaaa'
      const userAuthInfo = new UserAuthInfo(
        user.userId,
        auth0UUID
      )

      await userAuthInfoPrismaRepository.save(userAuthInfo)

      const result = await userAuthInfoPrismaRepository.findByAuth0UUID(auth0UUID)

      expect(result.auth0UUID).toEqual(auth0UUID)
      expect(result.userId.value).toEqual(user.userId.value)
    })

    it('データが存在しない場合は、undefinedを返すこと', async () => {
      const user = await userDataCreator.create({})
      const auth0UUID = 'auth0:aaaaaaaaaaa'
      const userAuthInfo = new UserAuthInfo(
        user.userId,
        auth0UUID
      )

      const result = await userAuthInfoPrismaRepository.findByAuth0UUID(auth0UUID)

      expect(result).toBeUndefined
    })
  })
})

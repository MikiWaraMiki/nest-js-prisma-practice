import { prisma, truncateAllTable } from "testUtil/prisma-test-helper"
import { TenantDataCreator } from "testUtil/tenant/tenant-data-creator"
import { UserDataCreator } from "testUtil/user/user-data-creator"
import { TenantPrismaRepository } from "../tenant-prisma-repository"
import { UserJoinedTenantPrismaRepository } from "../user-joined-tenant-prisma-repository"
import { UserPrismaRepository } from "../user-prisma-repository"

describe('UserJoinedTenantPrismaRepositoryのテスト', () => {
  let userJoinedTenantPrismaRepository: UserJoinedTenantPrismaRepository
  let tenantDataCreator: TenantDataCreator
  let userDataCreator: UserDataCreator

  beforeAll(() => {
    tenantDataCreator = new TenantDataCreator(
      new TenantPrismaRepository(prisma)
    )
    userDataCreator = new UserDataCreator(
      new UserPrismaRepository(prisma)
    )
    userJoinedTenantPrismaRepository = new UserJoinedTenantPrismaRepository(prisma)
  })

  beforeEach(async () => {
    await truncateAllTable()
  })

  afterAll(async () => {
    await truncateAllTable()
    await prisma.$disconnect
  })

  describe('findByUserIdのテスト', () => {
    it('登録されているテナントの一覧を取得できること', async () => {
      const tenant = await tenantDataCreator.create({})
      const user  = await userDataCreator.create({})

      await userJoinedTenantPrismaRepository.add(user.userId, tenant.tenantId)

      const result = await userJoinedTenantPrismaRepository.findByUserId(user.userId)

      expect(result.isJoin(tenant.tenantId)).toBeTruthy
    })
  })

  // NOTE: findByUserIdのテストで担保できているためテストコードは実装しない
  describe('addのテスト', () => {

  })

  describe('deleteのテスト', () => {
    it('登録されているテナントのレコードが削除されていること', async () => {
      const tenant = await tenantDataCreator.create({})
      const user  = await userDataCreator.create({})

      await userJoinedTenantPrismaRepository.add(user.userId, tenant.tenantId)

      await userJoinedTenantPrismaRepository.delete(user.userId, tenant.tenantId)

      const result = await userJoinedTenantPrismaRepository.findByUserId(user.userId)

      expect(result.isJoin(tenant.tenantId)).toBeFalsy
    })
  })
})

import { TenantId } from "src/domain/tenant/tenant-id";
import { TenantStatus, TENANT_STUTUS_VARIATION } from "src/domain/tenant/tenant-status";
import { prisma, truncateAllTable } from "testUtil/prisma-test-helper";
import { TenantDataCreator } from "testUtil/tenant/tenant-data-creator";
import { TestTenantFactory } from "testUtil/tenant/test-tenant-factory";
import { TenantPrismaRepository } from "../tenant-prisma-repository";

describe('TenantPrismaRepositoryクラスのテスト', () => {
  let tenantRepository: TenantPrismaRepository;
  let tenantDataCreator: TenantDataCreator
  beforeAll(async () => {
    tenantRepository = new TenantPrismaRepository(prisma);
    tenantDataCreator = new TenantDataCreator(tenantRepository)
  });

  beforeEach(async () => {
    await truncateAllTable();
  }, 10000);

  afterAll(async () => {
    await truncateAllTable();
    await prisma.$disconnect();
  });

  describe('saveメソッドのテスト', () => {
    it('新規レコードが登録できること', async () => {
      const tenant = new TestTenantFactory().create()

      await tenantRepository.save(tenant)

      const result = await tenantRepository.findByTenantId(tenant.tenantId)

      expect(result.tenantId).toEqual(tenant.tenantId)
      expect(result.tenantName).toEqual(tenant.tenantName)
      expect(result.tenantStatus).toEqual(tenant.tenantStatus)
    })

    it('レコードの更新ができること', async () => {
      const tenant = await tenantDataCreator.create(
        {tenantStatus: new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY) }
      )

      const activatedTenant = tenant.activated()

      await tenantRepository.save(activatedTenant)

      const result = await tenantRepository.findByTenantId(tenant.tenantId)

      expect(result.tenantId).toEqual(tenant.tenantId)
      expect(result.tenantName).toEqual(tenant.tenantName)
      expect(result.tenantStatus).toEqual(activatedTenant.tenantStatus)
    })
  })

  describe('findByTenantIdメソッドのテスト', () => {
    it('レコードが存在する場合は、Tenantオブジェクトを返すこと', async () => {
      const tenant = await tenantDataCreator.create({})

      const result = await tenantRepository.findByTenantId(tenant.tenantId)

      expect(result.tenantId).toEqual(tenant.tenantId)
      expect(result.tenantName).toEqual(tenant.tenantName)
      expect(result.tenantStatus).toEqual(tenant.tenantStatus)
    })

    it('レコードが存在しない場合は、undefinedを返すこと', async () => {
      const tenantId = TenantId.create()

      const result = await tenantRepository.findByTenantId(tenantId)

      expect(result).toBeUndefined
    })
  })
})

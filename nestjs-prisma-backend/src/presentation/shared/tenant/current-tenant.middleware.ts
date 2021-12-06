import { Inject, Injectable, InternalServerErrorException, NestMiddleware } from "@nestjs/common";
import { Tenant } from "src/domain/tenant/tenant";
import { TenantName } from "src/domain/tenant/tenant-name";
import { TenantRepository } from "src/domain/tenant/tenant-repository";
import { TenantPrismaRepository } from "src/infra/repository/prisma/tenant-prisma-repository";

@Injectable()
export class CurrentTenantMiddleware implements NestMiddleware {
  constructor(
    @Inject(TenantPrismaRepository)
    private readonly tenantRepository: TenantRepository
  ) {}

  async use(req: Request & { currentTenant: Tenant}, _: Response, next: () => void): Promise<void> {
    const domain = req.headers['host']

    const tenant = await this.tenantRepository.findByTenantName(new TenantName(domain))

    if (!tenant) {
      throw new InternalServerErrorException(`${domain} is not created yet`)
    }

    req.currentTenant = tenant
    next()
  }
}

import { CanActivate, ExecutionContext, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TenantName } from "src/domain/tenant/tenant-name";
import { TenantRepository } from "src/domain/tenant/tenant-repository";
import { TenantPrismaRepository } from "src/infra/repository/prisma/tenant-prisma-repository";

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    @Inject(TenantPrismaRepository)
    private readonly tenantRepository: TenantRepository
  ) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const currentTenant = request.currentTenant

    if (!currentTenant) {
      throw new InternalServerErrorException('currentTenant is not setted')
    }

    const auth0UserUUID = request.user.sub

    return true
  }

}

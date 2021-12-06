import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { TenantRepository } from "src/domain/tenant/tenant-repository";
import { TenantPrismaRepository } from "src/infra/repository/prisma/tenant-prisma-repository";

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    @Inject(TenantPrismaRepository)
    private readonly tenantRepository: TenantRepository
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    console.log(request)

    return true
  }
}

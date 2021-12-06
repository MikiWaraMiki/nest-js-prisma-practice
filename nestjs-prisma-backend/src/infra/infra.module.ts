import { Module } from "@nestjs/common";
import { PrismaService } from "./repository/prisma/prisma-service";
import { TenantPrismaRepository } from "./repository/prisma/tenant-prisma-repository";

@Module({
  providers: [
    PrismaService,
    TenantPrismaRepository
  ],
  exports: [
    TenantPrismaRepository
  ]
})
export class InfraModule {}

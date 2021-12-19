import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import { TenantId } from "src/domain/tenant/tenant-id";
import { TenantRepository } from "src/domain/tenant/tenant-repository";
import { TenantPrismaRepository } from "src/infra/repository/prisma/tenant-prisma-repository";

interface TestCommandOptions {
  count?: number
}

@Command({ name: 'test', description: 'test command'})
export class TestCommand implements CommandRunner {
  constructor(
    private readonly tenantRepository: TenantPrismaRepository
  ) {}

  async run(
    passedParam: string[],
    options?: TestCommandOptions
  ): Promise<void> {
    try {
      const result = await this.tenantRepository.findByTenantId(
        TenantId.reConstructor('01FP4YN9QC83PBK3A90P8ZYV18')
      )

      console.log(result)
    } catch(e) {
      console.error(e)
    }
  }

  @Option({
    flags: '-cnt, --count [number]',
    description: 'repeat number'
  })
  parseNumber(val: string): number{
    return Number(val)
  }
}

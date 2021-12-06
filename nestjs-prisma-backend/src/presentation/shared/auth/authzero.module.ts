import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/infra/repository/prisma/prisma-service';
import { TenantPrismaRepository } from 'src/infra/repository/prisma/tenant-prisma-repository';
import { SignUpJwtStrategy } from 'src/presentation/shared/auth/signup-jwt-strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  providers: [SignUpJwtStrategy],
  exports: [PassportModule]
})
export class NestJsAuthZeroModule {
}

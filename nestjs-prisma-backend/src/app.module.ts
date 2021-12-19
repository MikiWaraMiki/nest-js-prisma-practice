import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './infra/infra.module';
import { SignupController } from './presentation/api/auth/signup-controller';
import { TestCommand } from './presentation/batch/test/test.batch';
import { NestJsAuthZeroModule } from './presentation/shared/auth/jwt/authzero.module';
import { CurrentTenantMiddleware } from './presentation/shared/tenant/current-tenant.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development',
        '.env'
      ]
    }),
    InfraModule,
    NestJsAuthZeroModule
  ],
  controllers: [
    SignupController
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CurrentTenantMiddleware).forRoutes("*")
  }
}

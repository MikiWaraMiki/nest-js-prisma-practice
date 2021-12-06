import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './infra/infra.module';
import { SignupController } from './presentation/api/auth/signup-controller';
import { NestJsAuthZeroModule } from './presentation/shared/auth/jwt/authzero.module';

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
export class AppModule {}

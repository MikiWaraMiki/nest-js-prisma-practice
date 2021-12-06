import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SignupController } from './presentation/api/auth/signup-controller';
import { NestJsAuthZeroModule } from './presentation/shared/auth/authzero.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development',
        '.env'
      ]
    }),
    NestJsAuthZeroModule
  ],
  controllers: [
    SignupController
  ],
})
export class AppModule {}

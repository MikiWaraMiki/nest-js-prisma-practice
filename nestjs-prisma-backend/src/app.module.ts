import { Module } from '@nestjs/common';
import { SignupController } from './presentation/api/auth/signup-controller';
import { NestJsAuthZeroSessionProvider } from './presentation/shared/session/authzero.module';

@Module({
  imports: [NestJsAuthZeroSessionProvider],
  controllers: [
    SignupController
  ],
})
export class AppModule {}

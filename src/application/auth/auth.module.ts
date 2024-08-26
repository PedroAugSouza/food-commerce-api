import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './register/register-user.use-case';
import { RegisterUserController } from './register/register-user.controller';

@Module({
  providers: [RegisterUserUseCase],
  controllers: [RegisterUserController],
})
export class AuthModule {}

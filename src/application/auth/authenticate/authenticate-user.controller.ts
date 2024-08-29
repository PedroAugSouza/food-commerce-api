import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { InputAuthenticateUserDTO } from 'src/domain/use-cases/users/authenticate/authenticate-user.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { UserNotFoundError } from 'src/infrastructure/errors/users/user-not-found.error';
import { PasswordDoesNotMatchError } from 'src/infrastructure/errors/users/password-does-not-match.error';

@Controller('login')
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}
  @Post()
  async handle(@Body() body: InputAuthenticateUserDTO) {
    const result = await this.authenticateUserUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError) throw result.value;

    if (result.value instanceof UnexpectedError) throw result.value;

    if (result.value instanceof UserNotFoundError) throw result.value;

    if (result.value instanceof PasswordDoesNotMatchError) throw result.value;

    return result.value;
  }
}

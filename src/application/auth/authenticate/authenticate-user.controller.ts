import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { InputAuthenticateUserDTO } from 'src/domain/use-cases/users/authenticate/authenticate-user.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { UserNotFoundError } from 'src/infrastructure/errors/users/user-not-found.error';
import { PasswordDoesNotMatchError } from 'src/infrastructure/errors/users/password-does-not-match.error';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('login')
@ApiTags('Login')
@ApiResponse({
  status: '4XX',
  content: {
    'application/json': {
      schema: {
        properties: {
          reason: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
  },
})
@ApiResponse({
  status: 200,
  content: {
    'application/json': {
      schema: {
        properties: {
          access_token: {
            type: 'string',
          },
        },
      },
    },
  },
})
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}
  @Post()
  async handle(@Body() body: InputAuthenticateUserDTO) {
    const result = await this.authenticateUserUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof UserNotFoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    if (result.value instanceof PasswordDoesNotMatchError)
      throw new HttpException(result.value, HttpStatus.UNAUTHORIZED);

    return result.value;
  }
}

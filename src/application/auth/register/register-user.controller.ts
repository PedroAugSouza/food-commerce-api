import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterUserUseCase } from './register-user.use-case';
import { InputRegisterUserDTO } from 'src/domain/use-cases/users/register/register-user.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { UserAlreadyExist } from 'src/infrastructure/errors/users/user-already-exist.error';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/domain/errors/shared/error.interface';

@Controller('register')
@ApiTags('Register')
export class RegisterUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  @ApiResponse({
    status: '4XX',
    type: IError,
  })
  @ApiResponse({ status: 201, description: 'User registred' })
  async handle(@Body() body: InputRegisterUserDTO) {
    const result = await this.registerUserUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof UserAlreadyExist)
      return new HttpException(result.value, HttpStatus.CONFLICT);

    return result.value;
  }
}

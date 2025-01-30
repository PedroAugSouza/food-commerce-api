import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { User } from 'src/domain/entities/user.entiity';
import { IUsersRepository } from 'src/domain/repositories/users.repository';
import {
  InputRegisterUserDTO,
  OutputRegisterUserDTO,
} from 'src/domain/use-cases/users/register/register-user.dto';
import { IRegisterUserUseCase } from 'src/domain/use-cases/users/register/register-user.use-case';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { UserAlreadyExist } from 'src/infrastructure/errors/users/user-already-exist.error';
import { Left, Right } from 'src/infrastructure/utils/either/either';

@Injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}
  async execute(input: InputRegisterUserDTO): Promise<OutputRegisterUserDTO> {
    try {
      if (!input.email) return new Left(new MissingParamError('email'));

      const alreadyUser = await this.usersRepository.findByEmail(input.email);

      if (alreadyUser) return new Left(new UserAlreadyExist(input.email));

      if (!input.password) return new Left(new MissingParamError('password'));

      if (!input.username) return new Left(new MissingParamError('username'));

      if (!input.role) return new Left(new MissingParamError('Role'));

      const user = new User({
        ...input,
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      await this.usersRepository.save(user);

      return new Right(undefined);
    } catch (error) {
      return new Left(new UnexpectedError(error));
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { IUsersRepository } from 'src/domain/repositories/users.repository';
import {
  InputAuthenticateUserDTO,
  OutputAutheticateUserDTO,
} from 'src/domain/use-cases/users/authenticate/authenticate-user.dto';
import { IAuthenticateUserUseCase } from 'src/domain/use-cases/users/authenticate/authenticate-user.use-case';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { PasswordDoesNotMatchError } from 'src/infrastructure/errors/users/password-does-not-match.error';
import { UserNotFoundError } from 'src/infrastructure/errors/users/user-not-found.error';
import { Left, Right } from 'src/infrastructure/utils/either/either';

@Injectable()
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(
    input: InputAuthenticateUserDTO,
  ): Promise<OutputAutheticateUserDTO> {
    try {
      if (!input.email) return new Left(new MissingParamError('email'));

      const alreadyUser = await this.usersRepository.findByEmail(input.email);

      if (!alreadyUser) return new Left(new UserNotFoundError(input.email));

      if (!input.password) return new Left(new MissingParamError('password'));

      if (input.password !== alreadyUser.password)
        return new Left(new PasswordDoesNotMatchError());

      const payload = {
        sub: alreadyUser.uuid,
        username: alreadyUser.username,
        email: alreadyUser.email,
        role: alreadyUser.role,
      };

      return new Right({
        access_token: await this.jwtService.signAsync(payload),
      });
    } catch (error) {
      return new Left(new UnexpectedError(error));
    }
  }
}

import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateUserUseCase } from 'src/application/auth/authenticate/authenticate-user.use-case';
import { SECRET } from 'src/domain/constants/jwt-contstants';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { User } from 'src/domain/entities/user.entiity';
import { IUsersRepository } from 'src/domain/repositories/users.repository';
import { RolesUserValueObject } from 'src/domain/value-objects/roles-user.value-object';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { PasswordDoesNotMatchError } from 'src/infrastructure/errors/users/password-does-not-match.error';
import { UserNotFoundError } from 'src/infrastructure/errors/users/user-not-found.error';
import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';
import { describe, beforeAll, it, expect } from 'vitest';

describe('authenticate user', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepository: IUsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        InMemoryRepositoriesModule,
        JwtModule.register({
          global: true,
          secret: SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthenticateUserUseCase],
    }).compile();

    authenticateUserUseCase = module.get<AuthenticateUserUseCase>(
      AuthenticateUserUseCase,
    );

    usersRepository = module.get<IUsersRepository>(USERS_REPOSITORY);

    const user = new User({
      username: 'already user',
      email: 'user@example.com',
      password: 'correct',
      role: RolesUserValueObject.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersRepository.save(user);
  });

  it(`should be able to a authenticate a user`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'user@example.com',
      password: 'correct',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf('object');
  });

  it(`shouldn't be able to a authenticate a user if password incorrect`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'user@example.com',
      password: 'incorrect',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(PasswordDoesNotMatchError);
  });
  it(`shouldn't be able to a authenticate a user not exist`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'user-not-exist@example.com',
      password: 'incorrect',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(UserNotFoundError);
  });

  it(`shouldn't be able to a authenticate a user if param 'password' is missing`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'user@example.com',
      password: '',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to a authenticate a user if param 'email' is missing`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: '',
      password: 'correct',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
});

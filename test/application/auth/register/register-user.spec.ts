import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from 'src/application/auth/register/register-user.use-case';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { User } from 'src/domain/entities/user.entiity';
import { IUsersRepository } from 'src/domain/repositories/users.repository';
import { RolesUserValueObject } from 'src/domain/value-objects/roles-user.value-object';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UserAlreadyExist } from 'src/infrastructure/errors/users/user-already-exist.error';

import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';
import { beforeAll, describe, it, expect } from 'vitest';

describe('create a new product', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let usersRepository: IUsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [RegisterUserUseCase],
    }).compile();

    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);

    usersRepository = module.get<IUsersRepository>(USERS_REPOSITORY);

    const user = new User({
      username: 'already user',
      email: 'user@example.com',
      password: 'password',
      role: RolesUserValueObject.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersRepository.save(user);
  });

  it(`should be able to a register new user`, async () => {
    const result = await registerUserUseCase.execute({
      email: 'exaple@aa.com',
      password: 'pass123',
      role: RolesUserValueObject.COMMOM,
      username: 'username 123',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeUndefined();
  });
  it(`should be able to a register new user if user already exist`, async () => {
    const result = await registerUserUseCase.execute({
      email: 'user@example.com', // email exist
      password: 'pass123',
      role: RolesUserValueObject.COMMOM,
      username: 'username 123',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(UserAlreadyExist);
  });

  it(`shouldn't be able to a register new user if email is missing`, async () => {
    const result = await registerUserUseCase.execute({
      email: '',
      password: 'pass123',
      role: RolesUserValueObject.COMMOM,
      username: 'username 123',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to a register new user if password is missing`, async () => {
    const result = await registerUserUseCase.execute({
      email: 'example@aa.com',
      password: '',
      role: RolesUserValueObject.COMMOM,
      username: 'username 123',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to a register new user if username is missing`, async () => {
    const result = await registerUserUseCase.execute({
      email: 'example@aa.com',
      password: 'pass123',
      role: RolesUserValueObject.COMMOM,
      username: '',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
});

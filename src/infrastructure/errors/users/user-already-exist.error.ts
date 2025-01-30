import { IError } from 'src/domain/errors/shared/error.interface';

export class UserAlreadyExist implements IError {
  readonly reason: string = '[user already exist]';
  readonly message: string;
  constructor(email: string) {
    this.message = `the user with email '${email}' already exist`;
  }
}

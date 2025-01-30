import { IError } from 'src/domain/errors/shared/error.interface';

export class UserNotFoundError implements IError {
  readonly reason: string = '[user not found]';
  readonly message: string;

  constructor(email: string) {
    this.message = `the user with email '${email}' not found`;
  }
}

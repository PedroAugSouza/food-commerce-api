import { IError } from 'src/domain/errors/shared/error.interface';

export class PasswordDoesNotMatchError implements IError {
  readonly reason: string = '[password does not match]';
  readonly message: string = 'password does not match';
}

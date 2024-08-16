import { IError } from 'src/domain/errors/shared/error.interface';

export class UnexpectedError implements IError {
  readonly reason: string = '[Unexpected Error]:';
  readonly message: string = 'An unexpected error occurred';

  constructor(message: unknown) {
    console.error(message);
  }
}

import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { PasswordDoesNotMatchError } from 'src/infrastructure/errors/users/password-does-not-match.error';
import { UserNotFoundError } from 'src/infrastructure/errors/users/user-not-found.error';
import { Either } from 'src/infrastructure/utils/either/either';

export interface InputAuthenticateUserDTO {
  email: string;
  password: string;
}

export type OutputAutheticateUserDTO = Either<
  | UnexpectedError
  | MissingParamError
  | PasswordDoesNotMatchError
  | UserNotFoundError,
  {
    access_token: string;
  }
>;

import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { PasswordDoesNotMatchError } from 'src/infrastructure/errors/users/password-does-not-match.error';
import { UserNotFoundError } from 'src/infrastructure/errors/users/user-not-found.error';
import { Either } from 'src/infrastructure/utils/either/either';

@ApiSchema({ name: 'InputAuthenticateUserDTO' })
export class InputAuthenticateUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
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

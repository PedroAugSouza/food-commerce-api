import { RolesUserValueObject } from 'src/domain/value-objects/roles-user.value-object';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { UserAlreadyExist } from 'src/infrastructure/errors/users/user-already-exist.error';
import { Either } from 'src/infrastructure/utils/either/either';

export interface InputRegisterUserDTO {
  email: string;
  username: string;
  password: string;
  role: RolesUserValueObject;
}
export type OutputRegisterUserDTO = Either<
  UnexpectedError | MissingParamError | UserAlreadyExist,
  void
>;

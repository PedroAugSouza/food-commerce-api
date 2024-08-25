import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Either } from 'src/infrastructure/utils/either/either';

export interface InputDeleteProductDTO {
  uuid: string;
}

export type OutputDeleteProductDTO = Either<
  UnexpectedError | MissingParamError | ProductNotFound,
  void
>;

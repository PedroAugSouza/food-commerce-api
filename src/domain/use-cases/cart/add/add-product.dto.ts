import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Either } from 'src/infrastructure/utils/either/either';

export interface InputAddProductDTO {
  productsUuid: string;
  amountProducts: number;
  cartUuid: string;
}

export type OutputAddProductDTO = Either<
  UnexpectedError | MissingParamError,
  void
>;

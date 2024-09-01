import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Either } from 'src/infrastructure/utils/either/either';

export interface InputChangeAmountProductDTO {
  productUuid: string;
  cartUuid: string;
  amountProducts: number;
}

export type OutputChangeAmountProductDTO = Either<
  UnexpectedError | MissingParamError | ProductNotFound,
  void
>;

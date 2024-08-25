import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Either } from 'src/infrastructure/utils/either/either';

export interface InputUpdateProductDTO {
  uuid: string;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: CategoryProductValueObject;
  createdAt?: Date;
  updatedAt?: Date;
}
export type OutputUpdateProductDTO = Either<
  UnexpectedError | MissingParamError | ProductNotFound,
  void
>;

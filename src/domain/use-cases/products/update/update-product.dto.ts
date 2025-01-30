import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Either } from 'src/infrastructure/utils/either/either';

@ApiSchema({ name: 'InputUpdateProductDTO' })
export class InputUpdateProductDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  price?: string;

  @ApiProperty({ nullable: true })
  description?: string;

  @ApiProperty({ nullable: true })
  image?: string;
  @ApiProperty({ nullable: true })
  category?: CategoryProductValueObject;

  createdAt?: Date;
  updatedAt?: Date;
}
export type OutputUpdateProductDTO = Either<
  UnexpectedError | MissingParamError | ProductNotFound,
  void
>;

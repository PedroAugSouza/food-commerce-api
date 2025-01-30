import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Either } from 'src/infrastructure/utils/either/either';

@ApiSchema({ name: 'InputCreactProductDTO' })
export class InputCreateProductDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @ApiProperty({ enum: ['DRINK', 'FOOD', 'COMBO'] })
  category: CategoryProductValueObject;

  createdAt: Date;

  updatedAt: Date;
}

export type OutputCreateProductDTO = Either<
  MissingParamError | UnexpectedError,
  void
>;

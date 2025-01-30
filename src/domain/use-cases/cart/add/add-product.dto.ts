import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Either } from 'src/infrastructure/utils/either/either';

@ApiSchema({ name: 'InputAddProductDTO' })
export class InputAddProductDTO {
  @ApiProperty()
  productsUuid: string;

  @ApiProperty()
  amountProducts: number;

  @ApiProperty()
  cartUuid: string;
}

export type OutputAddProductDTO = Either<
  UnexpectedError | MissingParamError,
  void
>;

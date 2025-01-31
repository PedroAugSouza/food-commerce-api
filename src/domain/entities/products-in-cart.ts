import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ProductsInCart {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  amountProducts: number;

  @ApiProperty()
  productUuid: string;

  @ApiProperty()
  cartUuid: string;

  constructor(props: Omit<ProductsInCart, 'uuid'>, uuid?: string) {
    Object.assign(this, props);
    if (!uuid) {
      this.uuid = randomUUID();
    }
    this.uuid = uuid;
  }
}

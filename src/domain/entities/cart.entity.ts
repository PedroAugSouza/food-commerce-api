import { randomUUID } from 'crypto';
import { ProductsInCart } from './products-in-cart';
import { ApiProperty } from '@nestjs/swagger';

export class Cart {
  @ApiProperty()
  uuid: string;

  @ApiProperty({ isArray: true, type: ProductsInCart })
  productsInCart: ProductsInCart[] | [];

  @ApiProperty()
  userUuid: string;

  @ApiProperty()
  totalValue: number;

  constructor(props: Omit<Cart, 'uuid'>, uuid?: string) {
    Object.assign(this, props);
    if (!uuid) {
      this.uuid = randomUUID();
      return;
    }
    this.uuid = uuid;
  }
}

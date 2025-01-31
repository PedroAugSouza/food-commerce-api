import { randomUUID } from 'crypto';
import { CategoryProductValueObject } from '../value-objects/category-product.value-object';
import { ProductsInCart } from './products-in-cart';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amountAvailable?: number = 0;

  @ApiProperty()
  image: string;

  @ApiProperty()
  category: CategoryProductValueObject;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: ProductsInCart })
  productsInCart?: ProductsInCart[];

  constructor(props: Omit<Product, 'uuid'>, uuid?: string) {
    Object.assign(this, props);

    if (!uuid) {
      this.uuid = randomUUID();
      return;
    }
    this.uuid = uuid;
  }
}

import { randomUUID } from 'crypto';
import { CategoryProductValueObject } from '../value-objects/category-product.value-object';
import { ProductsInCart } from './products-in-cart';

export class Product {
  uuid: string;
  name: string;
  price: string;
  description: string;
  amountAvailable?: number = 0;
  image: string;
  category: CategoryProductValueObject;
  createdAt: Date;
  updatedAt: Date;
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

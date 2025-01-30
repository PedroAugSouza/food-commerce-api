import { randomUUID } from 'crypto';
import { ProductsInCart } from './products-in-cart';

export class Cart {
  uuid: string;
  productsInCart: ProductsInCart[] | [];
  userUuid: string;
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

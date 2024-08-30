import { randomUUID } from 'crypto';

export class ProductsInCart {
  uuid: string;
  amountProducts: number;
  productUuid: string;
  cartUuid: string;

  constructor(props: Omit<ProductsInCart, 'uuid'>, uuid?: string) {
    Object.assign(this, props);
    if (!uuid) {
      this.uuid = randomUUID();
    }
    this.uuid = uuid;
  }
}

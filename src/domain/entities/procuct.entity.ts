import { randomUUID } from 'crypto';
import { CategoryProductValueObject } from '../value-objects/category-product.value-object';

export class Product {
  uuid: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: CategoryProductValueObject;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Omit<Product, 'uuid'>, uuid?: string) {
    Object.assign(this, props);

    if (!uuid) {
      this.uuid = randomUUID();
    }
  }
}

import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';

export class InputFilterProductDTO {
  category?: CategoryProductValueObject;
  price?: 'asc' | 'desc';
}

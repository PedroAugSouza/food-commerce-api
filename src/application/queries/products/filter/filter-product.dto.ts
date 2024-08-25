import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';

export interface InputFilterProductDTO {
  category?: CategoryProductValueObject;
  price?: 'asc' | 'desc';
}

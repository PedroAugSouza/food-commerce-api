import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { OmitType } from '@nestjs/swagger';
import { Product } from 'src/domain/entities/product.entity';

export class InputFilterProductDTO {
  category?: CategoryProductValueObject;
  price?: 'asc' | 'desc';
}

export class OutputFilterProductsDTO extends OmitType(Product, [
  'createdAt',
  'updatedAt',
  'amountAvailable',
  'productsInCart',
] as const) {}

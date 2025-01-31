import { OmitType } from '@nestjs/swagger';
import { Product } from 'src/domain/entities/product.entity';

export class OutputGetProductDTO extends OmitType(Product, [
  'createdAt',
  'updatedAt',
  'productsInCart',
  'amountAvailable',
] as const) {}

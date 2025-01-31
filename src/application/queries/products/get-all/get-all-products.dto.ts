import { OmitType } from '@nestjs/swagger';
import { Product } from 'src/domain/entities/product.entity';

export class OutputGetAllProductsDTO extends OmitType(Product, [
  'createdAt',
  'updatedAt',
  'amountAvailable',
  'productsInCart',
] as const) {}

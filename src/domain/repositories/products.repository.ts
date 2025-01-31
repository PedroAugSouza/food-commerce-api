import { Product } from '../entities/product.entity';

export interface IProductsRepository {
  save(product: Product): Promise<void> | void;
  findByUuid(uuid: string): Promise<Product | null> | null | Product;
  update(product: Product): Promise<void> | void;
  delete(uuid: string): Promise<void> | void;
}

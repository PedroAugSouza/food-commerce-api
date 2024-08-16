import { Product } from 'src/domain/entities/procuct.entity';
import { IProductsRepository } from 'src/domain/repositories/products.repository';

export class InMemoryProductsRepository implements IProductsRepository {
  private readonly products: Map<string, Product> = new Map();

  save(product: Product): void {
    this.products.set(product.uuid, product);
  }
  findByUuid(uuid: string): null | Product {
    const product = this.products.get(uuid);
    if (!product) return null;
    return new Product(product);
  }
  update(product: Product): void {
    this.products.set(product.uuid, product);
  }
  delete(uuid: string): void {
    this.products.delete(uuid);
  }
}

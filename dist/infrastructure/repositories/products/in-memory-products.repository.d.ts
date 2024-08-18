import { Product } from 'src/domain/entities/procuct.entity';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
export declare class InMemoryProductsRepository implements IProductsRepository {
    private readonly products;
    save(product: Product): void;
    findByUuid(uuid: string): null | Product;
    update(product: Product): void;
    delete(uuid: string): void;
}

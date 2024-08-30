import { Cart } from 'src/domain/entities/cart.entity';
import { ProductsInCart } from 'src/domain/entities/products-in-cart';
import { ICartRepository } from 'src/domain/repositories/cart.repository';

export class InMemoryCartRepository implements ICartRepository {
  private readonly productInCart: Map<string, ProductsInCart> = new Map();

  add(productUuid: string, amountProducts: number, cartUuid: string): void {
    const productInCartEntity = new ProductsInCart({
      amountProducts,
      cartUuid,
      productUuid,
    });

    this.productInCart.set(productInCartEntity.uuid, productInCartEntity);
  }
  update(input: Cart): void {
    throw new Error('Method not implemented.' + input);
  }
}

import { Cart } from '@prisma/client';
import { ProductsInCart } from 'src/domain/entities/products-in-cart';
import { ICartRepository } from 'src/domain/repositories/cart.repository';

export class InMemoryCartRepository implements ICartRepository {
  private readonly productInCart: Map<string, ProductsInCart> = new Map();
  private readonly carts: Map<string, Cart> = new Map();

  add(productUuid: string, amountProducts: number, cartUuid: string): void {
    const productInCart = new ProductsInCart({
      amountProducts,
      cartUuid,
      productUuid,
    });

    this.productInCart.set(productInCart.uuid, productInCart);
  }

  create(input: Cart): void {
    this.carts.set(input.uuid, input);
  }

  changeAmountProduct(
    productUuid: string,
    cartUuid: string,
    amount: number,
  ): void {
    const productInCart = new ProductsInCart({
      amountProducts: amount,
      cartUuid,
      productUuid,
    });
    this.productInCart.set(productInCart.uuid, productInCart);
  }

  remove(productUuid: string, cartUuid: string): Promise<void> | void {
    const productInCart = Array.from(this.productInCart.values()).filter(
      (item) => item.cartUuid === cartUuid && item.productUuid === productUuid,
    )[0];
    this.productInCart.delete(productInCart.uuid);
  }
}

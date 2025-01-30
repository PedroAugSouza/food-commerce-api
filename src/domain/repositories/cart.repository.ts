import { Cart } from '@prisma/client';

export interface ICartRepository {
  create(input: Cart): Promise<void> | void;
  add(
    productUuid: string,
    amountProducts: number,
    cartUuid: string,
  ): Promise<void> | void;
  changeAmountProduct(
    productUuid: string,
    cartUuid: string,
    amount: number,
  ): Promise<void> | void;
  remove(productUuid: string, cartUuid: string): Promise<void> | void;
}

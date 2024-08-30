import { Cart } from '../entities/cart.entity';

export interface ICartRepository {
  add(
    productUuid: string,
    amountProducts: number,
    uuid: string,
  ): Promise<void> | void;
  update(input: Cart): Promise<void> | void;
}

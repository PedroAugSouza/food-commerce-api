import { Cart } from '../entities/cart.entity';

export interface CartsRepository {
  add(productUuid: string, amountProducts: number): Promise<void> | void;
  update(input: Cart): Promise<void> | void;
}

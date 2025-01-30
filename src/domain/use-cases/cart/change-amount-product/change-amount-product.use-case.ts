import {
  InputChangeAmountProductDTO,
  OutputChangeAmountProductDTO,
} from './change-amount-product.dto';

export interface IChangeAmountProductUseCase {
  execute(
    input: InputChangeAmountProductDTO,
  ): Promise<OutputChangeAmountProductDTO>;
}

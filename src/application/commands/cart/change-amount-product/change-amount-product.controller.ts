import { Body, Controller, Patch } from '@nestjs/common';
import { ChangeAmountProductUseCase } from './change-amount-product.use-case';
import { InputChangeAmountProductDTO } from 'src/domain/use-cases/cart/change-amount-product/change-amount-product.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';

@Controller('cart')
export class ChangeAmountProductController {
  constructor(
    private readonly changeAmountProductUseCase: ChangeAmountProductUseCase,
  ) {}
  @Patch('/update')
  async handle(@Body() body: InputChangeAmountProductDTO) {
    const result = await this.changeAmountProductUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError) throw result.value;

    if (result.value instanceof UnexpectedError) throw result.value;

    if (result.value instanceof ProductNotFound) throw result.value;

    return result.value;
  }
}

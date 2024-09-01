import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { RemoveProductUseCase } from './remove-product.use-case';
import { InputRemoveProductDTO } from 'src/domain/use-cases/cart/remove-product/remove-product.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cart')
export class RemoveProductController {
  constructor(private readonly removeProductUseCase: RemoveProductUseCase) {}

  @Delete('/remove')
  async handle(@Body() body: InputRemoveProductDTO) {
    const result = await this.removeProductUseCase.execute({
      ...body,
    });

    if (result.value instanceof MissingParamError) throw result.value;

    if (result.value instanceof UnexpectedError) throw result.value;

    if (result.value instanceof ProductNotFound) throw result.value;

    return result.value;
  }
}

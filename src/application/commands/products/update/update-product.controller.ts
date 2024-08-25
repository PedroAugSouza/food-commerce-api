import { Body, Controller, Patch } from '@nestjs/common';
import { UpdateProductUseCase } from './update-product.use-case';
import { InputUpdateProductDTO } from 'src/domain/use-cases/products/update/update-product.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';

@Controller('product')
export class UpdateProductController {
  constructor(private readonly udpateProductUseCase: UpdateProductUseCase) {}

  @Patch()
  async handle(@Body() body: InputUpdateProductDTO) {
    const result = await this.udpateProductUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError) throw result.value;

    if (result.value instanceof ProductNotFound) throw result.value;

    if (result.value instanceof UnexpectedError) throw result.value;

    return result.value;
  }
}

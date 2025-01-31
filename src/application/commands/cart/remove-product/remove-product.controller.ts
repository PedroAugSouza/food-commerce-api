import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RemoveProductUseCase } from './remove-product.use-case';
import { InputRemoveProductDTO } from 'src/domain/use-cases/cart/remove-product/remove-product.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IError } from 'src/domain/errors/shared/error.interface';

@UseGuards(AuthGuard)
@Controller('cart')
@ApiTags('Remove product of the cart')
@ApiBearerAuth()
@ApiResponse({
  status: '4XX',
  type: IError,
})
@ApiOkResponse({ description: 'Product removed of the cart' })
export class RemoveProductController {
  constructor(private readonly removeProductUseCase: RemoveProductUseCase) {}

  @Delete('/remove')
  async handle(@Body() body: InputRemoveProductDTO) {
    const result = await this.removeProductUseCase.execute({
      ...body,
    });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof ProductNotFound)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    return result.value;
  }
}

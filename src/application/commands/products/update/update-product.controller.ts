import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateProductUseCase } from './update-product.use-case';
import { InputUpdateProductDTO } from 'src/domain/use-cases/products/update/update-product.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/domain/errors/shared/error.interface';

@UseGuards(AuthGuard)
@Controller('product')
@ApiTags('Update a product')
@ApiBearerAuth()
export class UpdateProductController {
  constructor(private readonly udpateProductUseCase: UpdateProductUseCase) {}

  @Patch()
  @ApiResponse({ status: 201, description: 'Product updated' })
  @ApiResponse({
    status: '4XX',
    type: IError,
  })
  async handle(@Body() body: InputUpdateProductDTO) {
    const result = await this.udpateProductUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof ProductNotFound)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    return result.value;
  }
}

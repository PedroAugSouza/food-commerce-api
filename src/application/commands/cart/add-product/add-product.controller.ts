import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddProductUseCase } from './add-product.use-case';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { InputAddProductDTO } from 'src/domain/use-cases/cart/add/add-product.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('cart')
@ApiTags('Add product in cart')
@ApiBearerAuth()
@ApiResponse({
  status: '4XX',
  content: {
    'application/json': {
      schema: {
        properties: {
          reason: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
  },
})
@ApiCreatedResponse({ description: 'Product added in cart' })
export class AddProductController {
  constructor(private readonly addProductUseCase: AddProductUseCase) {}

  @Post()
  async handle(@Body() body: InputAddProductDTO) {
    const result = await this.addProductUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    return result.value;
  }
}

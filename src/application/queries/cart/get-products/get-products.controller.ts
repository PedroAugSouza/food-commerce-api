import { Controller, Get, Param } from '@nestjs/common';
import { GetProductsService } from './get-products.service';

@Controller('cart')
export class GetProductsController {
  constructor(private readonly getProductsService: GetProductsService) {}

  @Get('/:userUuid')
  async handle(@Param('userUuid') userUuid: string) {
    const result = await this.getProductsService.execute({ userUuid });
    return result;
  }
}

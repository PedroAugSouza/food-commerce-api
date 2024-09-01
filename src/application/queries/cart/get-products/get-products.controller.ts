import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetProductsService } from './get-products.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cart')
export class GetProductsController {
  constructor(private readonly getProductsService: GetProductsService) {}

  @Get('/:userUuid')
  async handle(@Param('userUuid') userUuid: string) {
    const result = await this.getProductsService.execute({ userUuid });
    return result;
  }
}

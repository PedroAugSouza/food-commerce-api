import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetProductsService } from './get-products.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { OutputGetProducts } from './get-products.dto';

@UseGuards(AuthGuard)
@Controller('cart')
@ApiBearerAuth()
export class GetProductsController {
  constructor(private readonly getProductsService: GetProductsService) {}

  @Get('/:userUuid')
  @ApiResponse({
    status: 200,
    type: OutputGetProducts,
  })
  async handle(@Param('userUuid') userUuid: string) {
    const result = await this.getProductsService.execute({ userUuid });
    return result;
  }
}

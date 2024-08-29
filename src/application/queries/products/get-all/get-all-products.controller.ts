import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetAllProductsService } from './get-all-products.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class GetAllProductsController {
  constructor(private readonly getAllProductsService: GetAllProductsService) {}

  @Get()
  async handle() {
    const result = await this.getAllProductsService.execute();
    return result;
  }
}

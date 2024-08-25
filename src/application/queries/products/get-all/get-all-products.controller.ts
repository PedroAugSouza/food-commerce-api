import { Controller, Get } from '@nestjs/common';
import { GetAllProductsService } from './get-all-products.service';

@Controller('products')
export class GetAllProductsController {
  constructor(private readonly getAllProductsService: GetAllProductsService) {}

  @Get()
  async handle() {
    const result = await this.getAllProductsService.execute();
    return result;
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { GetProductService } from './get-product.service';

@Controller('product')
export class GetProductController {
  constructor(private readonly getProductService: GetProductService) {}
  @Get('/:uuid')
  async handle(@Param('uuid') uuid: string) {
    const result = await this.getProductService.execute(uuid);
    return result;
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetProductService } from './get-product.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { OutputGetProductDTO } from './get-product.dto';

@UseGuards(AuthGuard)
@Controller('product')
@ApiBearerAuth()
@ApiResponse({
  description: 'Product FIded',
  type: OutputGetProductDTO,
})
export class GetProductController {
  constructor(private readonly getProductService: GetProductService) {}
  @Get('/:uuid')
  async handle(@Param('uuid') uuid: string) {
    const result = await this.getProductService.execute(uuid);
    return result;
  }
}

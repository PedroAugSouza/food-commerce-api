import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetAllProductsService } from './get-all-products.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { OutputGetAllProductsDTO } from './get-all-products.dto';

@UseGuards(AuthGuard)
@Controller('products')
@ApiBearerAuth()
@ApiResponse({
  type: OutputGetAllProductsDTO,
  isArray: true,
})
export class GetAllProductsController {
  constructor(private readonly getAllProductsService: GetAllProductsService) {}

  @Get()
  async handle() {
    const result = await this.getAllProductsService.execute();
    return result;
  }
}

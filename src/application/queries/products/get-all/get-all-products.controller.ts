import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetAllProductsService } from './get-all-products.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { OutputGetAllProductsDTO } from './get-all-products.dto';

@UseGuards(AuthGuard)
@Controller('products')
@ApiBearerAuth()
export class GetAllProductsController {
  constructor(private readonly getAllProductsService: GetAllProductsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: OutputGetAllProductsDTO,
    isArray: true,
  })
  async handle() {
    const result = await this.getAllProductsService.execute();
    return result;
  }
}

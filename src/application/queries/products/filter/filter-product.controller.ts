import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { FilterProductService } from './filter.product.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { OutputFilterProductsDTO } from './filter-product.dto';

@UseGuards(AuthGuard)
@Controller('products')
@ApiBearerAuth()
export class FilterProductController {
  constructor(private readonly filterProductService: FilterProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: OutputFilterProductsDTO,
    isArray: true,
  })
  async handle(
    @Query('price') price?: 'asc' | 'desc',
    @Query('category') category?: CategoryProductValueObject,
  ) {
    const result = await this.filterProductService.execute({
      category,
      price,
    });
    return result;
  }
}

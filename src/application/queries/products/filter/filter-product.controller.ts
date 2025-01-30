import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { FilterProductService } from './filter.product.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('products')
@ApiBearerAuth()
@ApiResponse({
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: {
          properties: {
            category: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            image: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            price: {
              type: 'string',
            },
            uuid: {
              type: 'string',
            },
          },
        },
      },
    },
  },
})
export class FilterProductController {
  constructor(private readonly filterProductService: FilterProductService) {}

  @Get()
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

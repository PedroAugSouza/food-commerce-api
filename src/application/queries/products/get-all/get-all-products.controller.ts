import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetAllProductsService } from './get-all-products.service';
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
export class GetAllProductsController {
  constructor(private readonly getAllProductsService: GetAllProductsService) {}

  @Get()
  async handle() {
    const result = await this.getAllProductsService.execute();
    return result;
  }
}

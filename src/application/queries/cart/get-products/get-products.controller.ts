import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetProductsService } from './get-products.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('cart')
@ApiBearerAuth()
@ApiResponse({
  content: {
    'application/json': {
      schema: {
        properties: {
          totalValue: {
            type: 'number',
          },
          productsInChart: {
            type: 'object',

            properties: {
              amountProducts: {
                type: 'number',
              },
              products: {
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
        },
      },
    },
  },
})
export class GetProductsController {
  constructor(private readonly getProductsService: GetProductsService) {}

  @Get('/:userUuid')
  async handle(@Param('userUuid') userUuid: string) {
    const result = await this.getProductsService.execute({ userUuid });
    return result;
  }
}

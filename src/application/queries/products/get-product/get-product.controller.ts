import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetProductService } from './get-product.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('product')
@ApiBearerAuth()
@ApiResponse({
  content: {
    'application/json': {
      schema: {
        allOf: [
          {
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
        ],
      },
    },
  },
})
export class GetProductController {
  constructor(private readonly getProductService: GetProductService) {}
  @Get('/:uuid')
  async handle(@Param('uuid') uuid: string) {
    const result = await this.getProductService.execute(uuid);
    return result;
  }
}

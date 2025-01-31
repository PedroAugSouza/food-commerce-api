import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Cart } from 'src/domain/entities/cart.entity';

export interface InputGetProductsDTO {
  userUuid: string;
}

export class OutputGetProducts extends OmitType(Cart, ['userUuid', 'uuid']) {}

export class Output {
  @ApiProperty()
  totalValue: number;

  @ApiProperty({
    type: 'object',
    properties: {
      amountProducts: {
        type: 'number',
      },
      products: {
        isArray: true,
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
  })
  productsInChart: object;
}

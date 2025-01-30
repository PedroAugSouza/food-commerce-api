import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/infrastructure/prisma/prisma.service';
import { InputGetProductsDTO } from './get-products.dto';

@Injectable()
export class GetProductsService {
  constructor(private readonly prisma: PrismaClientService) {}

  async execute(input: InputGetProductsDTO) {
    const query = await this.prisma.cart.findFirst({
      where: {
        userUuid: input.userUuid,
      },
      select: {
        totalValue: true,
        productsInCart: {
          select: {
            amountProducts: true,
            Product: {
              select: {
                category: true,
                description: true,
                image: true,
                name: true,
                price: true,
                uuid: true,
              },
            },
          },
        },
      },
    });

    return query;
  }
}

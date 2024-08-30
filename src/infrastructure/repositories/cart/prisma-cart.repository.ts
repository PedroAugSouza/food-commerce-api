import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Cart } from 'src/domain/entities/cart.entity';
import { ICartRepository } from 'src/domain/repositories/cart.repository';
import { PrismaClientService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaCartRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async add(
    productUuid: string,
    amountProducts: number,
    cartUuid: string,
  ): Promise<void> {
    await this.prisma.productsInCart.create({
      data: {
        amountProducts,
        uuid: randomUUID(),
        Cart: {
          connect: {
            uuid: cartUuid,
          },
        },
        Product: {
          connect: {
            uuid: productUuid,
          },
        },
      },
    });
  }
  async update(input: Cart): Promise<void> {
    await this.prisma.cart.update({
      where: {
        uuid: input.uuid,
      },
      data: {
        totalValue: input.totalValue,
        userUuid: input.userUuid,
        uuid: input.uuid,
      },
    });
  }
}

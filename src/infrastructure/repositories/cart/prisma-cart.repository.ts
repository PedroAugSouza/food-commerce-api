import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { randomUUID } from 'crypto';

import { ICartRepository } from 'src/domain/repositories/cart.repository';
import { PrismaClientService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaCartRepository implements ICartRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async create(input: Cart): Promise<void> {
    this.prisma.cart.create({
      data: {
        ...input,
      },
    });
  }

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

  async changeAmountProduct(
    productUuid: string,
    cartUuid: string,
    amount: number,
  ): Promise<void> {
    const productInCart = await this.prisma.productsInCart.findFirst({
      where: {
        cartUuid,
        productUuid,
      },
    });
    await this.prisma.productsInCart.update({
      where: {
        uuid: productInCart.uuid,
      },
      data: {
        amountProducts: amount,
      },
    });
  }

  async remove(productUuid: string, cartUuid: string): Promise<void> {
    const productInCart = await this.prisma.productsInCart.findFirst({
      where: {
        cartUuid,
        productUuid,
      },
    });

    await this.prisma.productsInCart.delete({
      where: {
        uuid: productInCart.uuid,
      },
    });
  }
}

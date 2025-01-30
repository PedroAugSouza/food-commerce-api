import { Injectable } from '@nestjs/common';
import { Product } from 'src/domain/entities/procuct.entity';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { PrismaClientService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaProductsRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async save(product: Product): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { productsInCart, ...productItems } = product;
    await this.prisma.product.create({
      data: {
        ...productItems,
      },
    });
  }
  async findByUuid(uuid: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        uuid,
      },
    });
    if (product)
      return new Product({
        ...product,
        category: product.category as CategoryProductValueObject,
      });
    return null;
  }
  async update(product: Product): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { productsInCart, ...productItems } = product;
    await this.prisma.product.update({
      where: {
        uuid: product.uuid,
      },
      data: {
        ...productItems,
      },
    });
  }
  async delete(uuid: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        uuid,
      },
    });
  }
}

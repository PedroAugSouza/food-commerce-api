import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class GetAllProductsService {
  constructor(private readonly prisma: PrismaClientService) {}

  async execute() {
    const products = await this.prisma.product.findMany({
      select: {
        category: true,
        description: true,
        image: true,
        name: true,
        price: true,
        uuid: true,
      },
    });

    return products;
  }
}

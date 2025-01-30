import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class GetProductService {
  constructor(private readonly prisma: PrismaClientService) {}

  async execute(uuid: string) {
    const query = this.prisma.product.findFirst({
      where: {
        uuid,
      },
      select: {
        category: true,
        description: true,
        image: true,
        name: true,
        price: true,
        uuid: true,
      },
    });
    return query;
  }
}

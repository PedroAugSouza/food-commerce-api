import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/infrastructure/prisma/prisma.service';
import { InputFilterProductDTO } from './filter-product.dto';
import { FilterProductBuilder } from 'src/infrastructure/builders/products/filter-product.builder';

@Injectable()
export class FilterProductService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly filterProductsBuilder: FilterProductBuilder,
  ) {}

  async execute(input: InputFilterProductDTO) {
    this.filterProductsBuilder.buildCategory(input.category);
    this.filterProductsBuilder.buildPrice(input.price);
    this.filterProductsBuilder.build();

    const products = await this.prisma.product.findMany({
      select: {
        category: true,
        description: true,
        image: true,
        name: true,
        price: true,
        uuid: true,
      },
      ...this.filterProductsBuilder.result,
    });
    return products;
  }
}

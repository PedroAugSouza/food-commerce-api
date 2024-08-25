import { Module } from '@nestjs/common';
import { GetImageProductController } from './get-image/get-product-image.controller';
import { GetAllProductsService } from './get-all/get-all-products.service';
import { GetAllProductsController } from './get-all/get-all-products.controller';
import { FilterProductBuilder } from 'src/infrastructure/builders/products/filter-product.builder';
import { FilterProductService } from './filter/filter.product.service';
import { FilterProductController } from './filter/filter-product.controller';

@Module({
  providers: [
    GetAllProductsService,
    FilterProductService,
    FilterProductBuilder,
  ],
  controllers: [
    GetImageProductController,
    GetAllProductsController,
    FilterProductController,
  ],
})
export class ProductsQueriesModule {}

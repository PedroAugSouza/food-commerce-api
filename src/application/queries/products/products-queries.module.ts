import { Module } from '@nestjs/common';
import { GetImageProductController } from './get-image/get-product-image.controller';
import { GetAllProductsService } from './get-all/get-all-products.service';
import { GetAllProductsController } from './get-all/get-all-products.controller';
import { FilterProductBuilder } from 'src/infrastructure/builders/products/filter-product.builder';
import { FilterProductService } from './filter/filter.product.service';
import { FilterProductController } from './filter/filter-product.controller';
import { GetProductService } from './get-product/get-product.service';
import { GetProductController } from './get-product/get-product.controller';

@Module({
  providers: [
    GetAllProductsService,
    FilterProductService,
    FilterProductBuilder,
    GetProductService,
  ],
  controllers: [
    GetImageProductController,
    GetAllProductsController,
    FilterProductController,
    GetProductController,
  ],
})
export class ProductsQueriesModule {}

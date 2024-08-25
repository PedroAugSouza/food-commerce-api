import { Module } from '@nestjs/common';
import { GetImageProductController } from './get-image/get-product-image.controller';
import { GetAllProductsService } from './get-all/get-all-products.service';
import { GetAllProductsController } from './get-all/get-all-products.controller';

@Module({
  providers: [GetAllProductsService],
  controllers: [GetImageProductController, GetAllProductsController],
})
export class ProductsQueriesModule {}

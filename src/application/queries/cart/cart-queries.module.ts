import { Module } from '@nestjs/common';
import { GetProductsService } from './get-products/get-products.service';
import { GetProductsController } from './get-products/get-products.controller';

@Module({
  providers: [GetProductsService],
  controllers: [GetProductsController],
})
export class CartQueriesModule {}

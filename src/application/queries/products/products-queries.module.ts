import { Module } from '@nestjs/common';
import { GetImageProductController } from './get-image/get-product-image.controller';

@Module({
  controllers: [GetImageProductController],
})
export class ProductsQueriesModule {}

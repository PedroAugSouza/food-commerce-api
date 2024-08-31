import { Module } from '@nestjs/common';
import { AddProductUseCase } from './add-product/add-product.use-case';
import { AddProductController } from './add-product/add-product.controller';

@Module({
  providers: [AddProductUseCase],
  controllers: [AddProductController],
})
export class CartCommandsModule {}

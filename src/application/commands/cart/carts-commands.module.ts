import { Module } from '@nestjs/common';
import { AddProductUseCase } from './add-product/add-product.use-case';
import { AddProductController } from './add-product/add-product.controller';
import { RemoveProductUseCase } from './remove-product/remove-product.use-case';
import { RemoveProductController } from './remove-product/remove-product.controller';

@Module({
  providers: [AddProductUseCase, RemoveProductUseCase],
  controllers: [AddProductController, RemoveProductController],
})
export class CartCommandsModule {}

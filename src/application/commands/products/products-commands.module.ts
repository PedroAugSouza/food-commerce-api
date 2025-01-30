import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './create/create-product.use-case';
import { CreateProductController } from './create/create-product.controller';
import { UpdateProductController } from './update/update-product.controller';
import { UpdateProductUseCase } from './update/update-product.use-case';

@Module({
  providers: [CreateProductUseCase, UpdateProductUseCase],
  controllers: [CreateProductController, UpdateProductController],
})
export class ProductsCommandsModule {}

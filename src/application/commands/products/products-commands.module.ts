import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './create/create-product.use-case';
import { CreateProductController } from './create/create-product.controller';

@Module({
  providers: [CreateProductUseCase],
  controllers: [CreateProductController],
})
export class ProductsCommandsModule {}

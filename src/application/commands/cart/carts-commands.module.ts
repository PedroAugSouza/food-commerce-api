import { Module } from '@nestjs/common';
import { AddProductUseCase } from './add-product/add-product.use-case';
import { AddProductController } from './add-product/add-product.controller';
import { RemoveProductUseCase } from './remove-product/remove-product.use-case';
import { RemoveProductController } from './remove-product/remove-product.controller';
import { ChangeAmountProductUseCase } from './change-amount-product/change-amount-product.use-case';
import { ChangeAmountProductController } from './change-amount-product/change-amount-product.controller';

@Module({
  providers: [
    AddProductUseCase,
    RemoveProductUseCase,
    ChangeAmountProductUseCase,
  ],
  controllers: [
    AddProductController,
    RemoveProductController,
    ChangeAmountProductController,
  ],
})
export class CartCommandsModule {}

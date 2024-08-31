import { Module } from '@nestjs/common';
import { ProductsCommandsModule } from './products/products-commands.module';
import { CartCommandsModule } from './cart/carts-commands.module';

@Module({
  imports: [ProductsCommandsModule, CartCommandsModule],
})
export class CommandsModule {}

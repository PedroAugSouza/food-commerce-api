import { Module } from '@nestjs/common';
import { ProductsCommandsModule } from './products/products-commands.module';

@Module({
  imports: [ProductsCommandsModule],
})
export class CommandsModule {}

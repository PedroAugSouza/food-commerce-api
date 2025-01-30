import { Module } from '@nestjs/common';
import { ProductsQueriesModule } from './products/products-queries.module';
import { CartQueriesModule } from './cart/cart-queries.module';

@Module({
  imports: [ProductsQueriesModule, CartQueriesModule],
})
export class QueriesModule {}

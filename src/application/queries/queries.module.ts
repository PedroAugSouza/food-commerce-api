import { Module } from '@nestjs/common';
import { ProductsQueriesModule } from './products/products-queries.module';

@Module({
  imports: [ProductsQueriesModule],
})
export class QueriesModule {}

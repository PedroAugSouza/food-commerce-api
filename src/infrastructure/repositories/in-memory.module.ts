import { Global, Module } from '@nestjs/common';
import { PRODUCTS_REPOSITORY } from 'src/domain/di.repositories';
import { InMemoryProductsRepository } from './products/in-memory-products.repository';

@Global()
@Module({
  providers: [
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: InMemoryProductsRepository,
    },
  ],
  exports: [PRODUCTS_REPOSITORY],
})
export class InMemoryRepositoriesModule {}

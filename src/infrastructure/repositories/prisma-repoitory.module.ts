import { Global, Module } from '@nestjs/common';
import { PrismaProductsRepository } from './products/prima-products.repository';
import { PRODUCTS_REPOSITORY } from 'src/domain/di/repositories';

@Global()
@Module({
  providers: [
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: PrismaProductsRepository,
    },
  ],
  exports: [PRODUCTS_REPOSITORY],
})
export class PrismaRepositoriesModule {}

import { Global, Module } from '@nestjs/common';
import {
  PRODUCTS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/domain/di/repositories';
import { InMemoryProductsRepository } from './products/in-memory-products.repository';
import { InMemoryUsersRepository } from './user/in-memory-users.repository';

@Global()
@Module({
  providers: [
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: InMemoryProductsRepository,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: InMemoryUsersRepository,
    },
  ],
  exports: [PRODUCTS_REPOSITORY, USERS_REPOSITORY],
})
export class InMemoryRepositoriesModule {}

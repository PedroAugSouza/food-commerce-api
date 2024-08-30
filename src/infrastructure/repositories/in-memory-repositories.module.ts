import { Global, Module } from '@nestjs/common';
import {
  CART_REPOSITORY,
  PRODUCTS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/domain/di/repositories';
import { InMemoryProductsRepository } from './products/in-memory-products.repository';
import { InMemoryUsersRepository } from './user/in-memory-users.repository';
import { InMemoryCartRepository } from './cart/in-memory-cart.repository';

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
    {
      provide: CART_REPOSITORY,
      useClass: InMemoryCartRepository,
    },
  ],
  exports: [PRODUCTS_REPOSITORY, USERS_REPOSITORY, CART_REPOSITORY],
})
export class InMemoryRepositoriesModule {}

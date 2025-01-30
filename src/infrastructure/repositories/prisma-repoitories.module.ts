import { Global, Module } from '@nestjs/common';
import { PrismaProductsRepository } from './products/prima-products.repository';
import {
  CART_REPOSITORY,
  PRODUCTS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/domain/di/repositories';
import { PrismaUsersRepository } from './user/prisma-users.repository';
import { PrismaCartRepository } from './cart/prisma-cart.repository';

@Global()
@Module({
  providers: [
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: PrismaProductsRepository,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
    {
      provide: CART_REPOSITORY,
      useClass: PrismaCartRepository,
    },
  ],
  exports: [PRODUCTS_REPOSITORY, USERS_REPOSITORY, CART_REPOSITORY],
})
export class PrismaRepositoriesModule {}

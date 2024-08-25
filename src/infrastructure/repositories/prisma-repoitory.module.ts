import { Global, Module } from '@nestjs/common';
import { PrismaProductsRepository } from './products/prima-products.repository';
import {
  PRODUCTS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/domain/di/repositories';
import { PrismaUsersRepository } from './user/prisma-users.repository';

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
  ],
  exports: [PRODUCTS_REPOSITORY, USERS_REPOSITORY],
})
export class PrismaRepositoriesModule {}

import { Inject, Injectable } from '@nestjs/common';
import {
  CART_REPOSITORY,
  PRODUCTS_REPOSITORY,
} from 'src/domain/di/repositories';
import { ICartRepository } from 'src/domain/repositories/cart.repository';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
import {
  InputRemoveProductDTO,
  OutputRemoveProductDTO,
} from 'src/domain/use-cases/cart/remove-product/remove-product.dto';
import { IRemoveProductUseCase } from 'src/domain/use-cases/cart/remove-product/remove-product.use-case';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Left, Right } from 'src/infrastructure/utils/either/either';

@Injectable()
export class RemoveProductUseCase implements IRemoveProductUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: ICartRepository,
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(input: InputRemoveProductDTO): Promise<OutputRemoveProductDTO> {
    try {
      if (!input.productUuid)
        return new Left(new MissingParamError('product uuid'));

      const alreadyProduct = await this.productsRepository.findByUuid(
        input.productUuid,
      );
      if (!alreadyProduct)
        return new Left(new ProductNotFound(input.productUuid));

      if (!input.cartUuid) return new Left(new MissingParamError('cart uuid'));

      await this.cartRepository.remove(input.productUuid, input.cartUuid);

      return new Right(undefined);
    } catch (error) {
      return new Left(new UnexpectedError(error));
    }
  }
}

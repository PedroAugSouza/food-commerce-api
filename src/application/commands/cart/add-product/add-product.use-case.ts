import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY } from 'src/domain/di/repositories';
import { ICartRepository } from 'src/domain/repositories/cart.repository';
import { IAddProductUseCase } from 'src/domain/use-cases/cart/add/add-prdcuct.use-case';
import {
  InputAddProductDTO,
  OutputAddProductDTO,
} from 'src/domain/use-cases/cart/add/add-product.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Left, Right } from 'src/infrastructure/utils/either/either';

@Injectable()
export class AddProductUseCase implements IAddProductUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: ICartRepository,
  ) {}

  async execute(input: InputAddProductDTO): Promise<OutputAddProductDTO> {
    try {
      if (input.amountProducts === null)
        return new Left(new MissingParamError('amount products'));

      if (!input.productsUuid)
        return new Left(new MissingParamError('product uuid'));

      if (!input.cartUuid) return new Left(new MissingParamError('cart uuid'));

      await this.cartRepository.add(
        input.productsUuid,
        input.amountProducts,
        input.cartUuid,
      );

      return new Right(undefined);
    } catch (error) {
      return new Left(new UnexpectedError(error));
    }
  }
}

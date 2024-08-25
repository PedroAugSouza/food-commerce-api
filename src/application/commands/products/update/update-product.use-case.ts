import { Inject, Injectable } from '@nestjs/common';
import { PRODUCTS_REPOSITORY } from 'src/domain/di/repositories';
import { Product } from 'src/domain/entities/procuct.entity';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
import {
  InputUpdateProductDTO,
  OutputUpdateProductDTO,
} from 'src/domain/use-cases/products/update/update-product.dto';
import { IUpdateProductUseCase } from 'src/domain/use-cases/products/update/update-product.use-case';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Left, Right } from 'src/infrastructure/utils/either/either';

@Injectable()
export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    try {
      if (!input.uuid) return new Left(new MissingParamError('uuid'));

      const product = await this.productsRepository.findByUuid(input.uuid);

      if (!product) return new Left(new ProductNotFound(input.uuid));

      const newProduct = new Product(
        {
          ...input,
          ...product,
        },
        input.uuid,
      );

      await this.productsRepository.update(newProduct);

      return new Right(undefined);
    } catch (error) {
      return new Left(new UnexpectedError(error));
    }
  }
}

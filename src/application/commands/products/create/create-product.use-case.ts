import { Inject, Injectable } from '@nestjs/common';
import { PRODUCTS_REPOSITORY } from 'src/domain/di/repositories';
import { Product } from 'src/domain/entities/procuct.entity';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
import { ICreateProductUseCase } from 'src/domain/use-cases/products/create/create-product.use-case';
import {
  InputCreateProductDTO,
  OutputCreateProductDTO,
} from 'src/domain/use-cases/products/create/create-products.dto';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { Left, Right } from 'src/infrastructure/utils/either/either';

@Injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: IProductsRepository,
  ) {}
  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    try {
      if (!input.name) return new Left(new MissingParamError('Name'));

      if (!input.price) return new Left(new MissingParamError('Price'));

      if (!input.category) return new Left(new MissingParamError('Category'));

      if (!input.image) return new Left(new MissingParamError('Image'));

      if (!input.description)
        return new Left(new MissingParamError('Description'));

      const product = new Product({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await this.productsRepository.save(product);

      return new Right(undefined);
    } catch (error) {
      return new Left(new UnexpectedError(error));
    }
  }
}

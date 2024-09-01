import { Test, TestingModule } from '@nestjs/testing';
import { productDummy } from '__test__dummy/mocks/mocks.entities';
import { UpdateProductUseCase } from 'src/application/commands/products/update/update-product.use-case';
import { PRODUCTS_REPOSITORY } from 'src/domain/di/repositories';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';
import { beforeAll, describe, expect, it } from 'vitest';

describe('update a product', () => {
  let productsRepository: IProductsRepository;
  let updateProductUseCase: UpdateProductUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [UpdateProductUseCase],
    }).compile();

    updateProductUseCase =
      module.get<UpdateProductUseCase>(UpdateProductUseCase);

    productsRepository = module.get<IProductsRepository>(PRODUCTS_REPOSITORY);

    await productsRepository.save(productDummy);
  });

  it('should be able to a update a product', async () => {
    const result = await updateProductUseCase.execute({
      uuid: productDummy.uuid,
      name: 'toddynho',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeUndefined();
  });

  it(`shouldn't be able to update a new product if uuid is missing`, async () => {
    const result = await updateProductUseCase.execute({
      uuid: '',
      name: 'toddynho',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to update a new product if product not exist`, async () => {
    const result = await updateProductUseCase.execute({
      uuid: 'product not exist',
      name: 'toddynho',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(ProductNotFound);
  });
});

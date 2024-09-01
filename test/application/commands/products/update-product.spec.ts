import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductUseCase } from 'src/application/commands/products/update/update-product.use-case';
import { PRODUCTS_REPOSITORY } from 'src/domain/di/repositories';
import { Product } from 'src/domain/entities/procuct.entity';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';
import { beforeAll, describe, expect, it } from 'vitest';

describe('update a product', () => {
  let productsRepository: IProductsRepository;
  let updateProductUseCase: UpdateProductUseCase;

  const uuidMock = 'uuid-mock';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [UpdateProductUseCase],
    }).compile();

    updateProductUseCase =
      module.get<UpdateProductUseCase>(UpdateProductUseCase);

    productsRepository = module.get<IProductsRepository>(PRODUCTS_REPOSITORY);

    await productsRepository.save(
      new Product(
        {
          category: CategoryProductValueObject.DRINK,
          createdAt: new Date(),
          description: 'coca cola espumante',
          image: 'image',
          name: 'coca-cola',
          price: 1200,
          updatedAt: new Date(),
        },
        uuidMock,
      ),
    );
  });

  it('should be able to a update a product', async () => {
    const result = await updateProductUseCase.execute({
      uuid: uuidMock,
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

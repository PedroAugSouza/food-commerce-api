import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCase } from 'src/application/commands/products/create/create-product.use-case';
import { Product } from 'src/domain/entities/procuct.entity';
import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';
import { beforeAll, describe, it, expect } from 'vitest';

describe('create a new product', () => {
  let createProductUseCase: CreateProductUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [CreateProductUseCase],
    }).compile();

    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  it('should be able create a new product', async () => {
    const result = await createProductUseCase.execute(
      new Product({
        name: 'Product 1',
        price: '10',
        category: CategoryProductValueObject.DRINK,
        image: 'Image 1',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    expect(result.isRight()).toBeTruthy();
  });
  it(`shouldn't be able create a new product without name `, async () => {
    const result = await createProductUseCase.execute(
      new Product({
        name: '',
        price: '10',
        category: CategoryProductValueObject.DRINK,
        image: 'Image 1',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    expect(result.isRight()).toBeFalsy();
  });
  it(`shouldn't be able create a new product without price `, async () => {
    const result = await createProductUseCase.execute(
      new Product({
        name: 'name',
        price: null,
        category: CategoryProductValueObject.DRINK,
        image: 'Image 1',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    expect(result.isRight()).toBeFalsy();
  });
  it(`shouldn't be able create a new product without category `, async () => {
    const result = await createProductUseCase.execute(
      new Product({
        name: 'name',
        price: '10',
        category: null,
        image: 'Image 1',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    expect(result.isRight()).toBeFalsy();
  });
  it(`shouldn't be able create a new product without image `, async () => {
    const result = await createProductUseCase.execute(
      new Product({
        name: 'name',
        price: '10',
        category: CategoryProductValueObject.DRINK,
        image: '',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    expect(result.isRight()).toBeFalsy();
  });
  it(`shouldn't be able create a new product without description `, async () => {
    const result = await createProductUseCase.execute(
      new Product({
        name: 'name',
        price: '10',
        category: CategoryProductValueObject.DRINK,
        image: 'Image 1',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    expect(result.isRight()).toBeFalsy();
  });
});

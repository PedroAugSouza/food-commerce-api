import { Test, TestingModule } from '@nestjs/testing';
import { AddProductUseCase } from 'src/application/commands/cart/add-product/add-product.use-case';
import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';
import { describe, expect, beforeAll, it } from 'vitest';

describe('add product in cart', () => {
  let addProductUseCase: AddProductUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [AddProductUseCase],
    }).compile();

    addProductUseCase = module.get<AddProductUseCase>(AddProductUseCase);
  });

  it(`should be able to add a product in cart`, async () => {
    const result = await addProductUseCase.execute({
      amountProducts: 2,
      productsUuid: 'product-uuid',
      cartUuid: 'cart-uuid',
    });

    expect(result.isRight()).toBeTruthy();
  });

  it(`shouldn;t be able to add a product in cart if amountProduct is missing`, async () => {
    const result = await addProductUseCase.execute({
      amountProducts: null,
      productsUuid: 'product-uuid',
      cartUuid: 'cart-uuid',
    });

    expect(result.isRight()).toBeFalsy();
  });

  it(`shouldn't be able to add a product in cart if products uuid is missing`, async () => {
    const result = await addProductUseCase.execute({
      amountProducts: 2,
      productsUuid: '',
      cartUuid: 'cart-uuid',
    });

    expect(result.isRight()).toBeFalsy();
  });

  it(`shouldn't be able to add a product in cart if cart uuid is missing`, async () => {
    const result = await addProductUseCase.execute({
      amountProducts: 2,
      productsUuid: 'product-uuid',
      cartUuid: '',
    });

    expect(result.isRight()).toBeFalsy();
  });
});

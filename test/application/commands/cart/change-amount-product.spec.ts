import { TestingModule, Test } from '@nestjs/testing';
import {
  cartDummy,
  productsInCartDummy,
  productDummy,
} from '__test__dummy/mocks/mocks.entities';
import { ChangeAmountProductUseCase } from 'src/application/commands/cart/change-amount-product/change-amount-product.use-case';
import {
  PRODUCTS_REPOSITORY,
  CART_REPOSITORY,
} from 'src/domain/di/repositories';
import { ICartRepository } from 'src/domain/repositories/cart.repository';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';
import { describe, beforeAll, it, expect } from 'vitest';

describe('change amount of products in cart', () => {
  let changeAmountProductUseCase: ChangeAmountProductUseCase;
  let productsRepository: IProductsRepository;
  let cartRepository: ICartRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [ChangeAmountProductUseCase],
    }).compile();

    changeAmountProductUseCase = module.get<ChangeAmountProductUseCase>(
      ChangeAmountProductUseCase,
    );

    productsRepository = module.get<IProductsRepository>(PRODUCTS_REPOSITORY);

    cartRepository = module.get<ICartRepository>(CART_REPOSITORY);

    cartRepository.create(cartDummy);

    cartRepository.add(
      productsInCartDummy.productUuid,
      productsInCartDummy.amountProducts,
      productsInCartDummy.cartUuid,
    );

    productsRepository.save(productDummy);
  });

  it(`should be able to change amount of products in the cart`, async () => {
    const result = await changeAmountProductUseCase.execute({
      cartUuid: cartDummy.uuid,
      productUuid: productDummy.uuid,
      amountProducts: 4,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeUndefined();
  });

  it(`shouldn't be able to change amount of products in the cart if the param 'cart uuid' is missing`, async () => {
    const result = await changeAmountProductUseCase.execute({
      cartUuid: '',
      productUuid: productDummy.uuid,
      amountProducts: 4,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to change amount of products in the cart if the param 'product uuid' is missing`, async () => {
    const result = await changeAmountProductUseCase.execute({
      cartUuid: cartDummy.uuid,
      productUuid: '',
      amountProducts: 4,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to change amount of products in the cart if the param 'amount product' is missing`, async () => {
    const result = await changeAmountProductUseCase.execute({
      cartUuid: cartDummy.uuid,
      productUuid: productDummy.uuid,
      amountProducts: null,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to change amount of products in the cart if the product not found`, async () => {
    const result = await changeAmountProductUseCase.execute({
      cartUuid: cartDummy.uuid,
      productUuid: 'wrong uuid',
      amountProducts: 4,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(ProductNotFound);
  });
});

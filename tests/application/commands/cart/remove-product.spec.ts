import { TestingModule, Test } from '@nestjs/testing';
import {
  cartDummy,
  productDummy,
  productsInCartDummy,
} from '__test__dummy/mocks/mocks.entities';
import { RemoveProductUseCase } from 'src/application/commands/cart/remove-product/remove-product.use-case';
import {
  CART_REPOSITORY,
  PRODUCTS_REPOSITORY,
} from 'src/domain/di/repositories';
import { ICartRepository } from 'src/domain/repositories/cart.repository';
import { IProductsRepository } from 'src/domain/repositories/products.repository';
import { ProductNotFound } from 'src/infrastructure/errors/products/not-found.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { InMemoryRepositoriesModule } from 'src/infrastructure/repositories/in-memory-repositories.module';
import { describe, beforeAll, it, expect } from 'vitest';

describe('remove product in cart', () => {
  let removeProductUseCase: RemoveProductUseCase;
  let productsRepository: IProductsRepository;
  let cartRepository: ICartRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [RemoveProductUseCase],
    }).compile();

    removeProductUseCase =
      module.get<RemoveProductUseCase>(RemoveProductUseCase);

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

  it(`should be able to a remove a product of the cart`, async () => {
    const result = await removeProductUseCase.execute({
      cartUuid: cartDummy.uuid,
      productUuid: productDummy.uuid,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeUndefined();
  });

  it(`shouldn't be able to remove a product if the param 'cartUuid' is missing`, async () => {
    const result = await removeProductUseCase.execute({
      cartUuid: '',
      productUuid: productDummy.uuid,
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able to remove a product if the param 'productUuid' is missing`, async () => {
    const result = await removeProductUseCase.execute({
      cartUuid: cartDummy.uuid,
      productUuid: '',
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to remove a product if the product not exist`, async () => {
    const result = await removeProductUseCase.execute({
      cartUuid: cartDummy.uuid,
      productUuid: 'product not exists',
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(ProductNotFound);
  });
});

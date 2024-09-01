import { CategoryProductValueObject } from 'src/domain/value-objects/category-product.value-object';
import { FilterProductBuilder } from 'src/infrastructure/builders/products/filter-product.builder';
import { describe, it, expect } from 'vitest';

describe('build filters for product', () => {
  it('should be able to generate filter by price and category', () => {
    const filter = new FilterProductBuilder();
    filter.buildCategory(CategoryProductValueObject.DRINK);
    filter.buildPrice('asc');
    filter.build();

    expect(filter.result).toStrictEqual({
      where: {
        category: 'DRINK',
      },
      orderBy: {
        price: 'asc',
      },
    });
  });

  it('should be able to generate filter only price ', () => {
    const filter = new FilterProductBuilder();

    filter.buildPrice('asc');
    filter.build();

    expect(filter.result).toStrictEqual({
      where: {
        category: undefined,
      },
      orderBy: {
        price: 'asc',
      },
    });
  });

  it('should be able to generate filter only category', () => {
    const filter = new FilterProductBuilder();
    filter.buildCategory(CategoryProductValueObject.DRINK);

    filter.build();

    expect(filter.result).toStrictEqual({
      where: {
        category: 'DRINK',
      },
    });
  });
});
